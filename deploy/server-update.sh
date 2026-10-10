#!/usr/bin/env bash
# Chay TREN CONTAINER (systemd timer moi phut): neu nhanh git co commit moi thi build ban moi
# vao thu muc release rieng, doi lien ket /opt/hanin-website sang ban moi, khoi dong lai pm2.
# Build loi hoac ban moi khong len thi tu giu / quay ve ban cu. Du lieu CMS nam ngoai code (DATA_DIR).
set -uo pipefail

SRC="${SRC:-/opt/hanin-src}"
RELEASES="${RELEASES:-/opt/hanin-releases}"
CURRENT="${CURRENT:-/opt/hanin-website}"
DATA_DIR="${DATA_DIR:-/var/lib/hanin-website}"
BRANCH="${BRANCH:-master}"
PORT="${PORT:-3000}"
LOG="${LOG:-/var/log/hanin-autodeploy.log}"
KEEP=3

log() { echo "[$(date '+%F %T')] $*" | tee -a "$LOG"; }

exec 9>/var/lock/hanin-autodeploy.lock
flock -n 9 || exit 0

cd "$SRC" || { log "Khong thay $SRC"; exit 1; }
git fetch --quiet origin "$BRANCH" || { log "git fetch loi"; exit 1; }
REMOTE_SHA="$(git rev-parse "origin/$BRANCH")"
CUR_SHA="$(cat "$RELEASES/.current-sha" 2>/dev/null || true)"
if [ "$REMOTE_SHA" = "$CUR_SHA" ] && [ "${FORCE:-0}" != "1" ]; then exit 0; fi

log "Co commit moi ${REMOTE_SHA:0:7} (dang chay ${CUR_SHA:0:7}). Bat dau build..."
git reset --hard --quiet "origin/$BRANCH"
# Tu cap nhat chinh script nay (ap dung tu lan chay sau).
if ! cmp -s deploy/server-update.sh /usr/local/bin/hanin-autodeploy; then
  install -m 755 deploy/server-update.sh /usr/local/bin/hanin-autodeploy
fi

REL="$RELEASES/$(date +%Y%m%d-%H%M%S)-${REMOTE_SHA:0:7}"
PREV="$(readlink -f "$CURRENT" 2>/dev/null || true)"
fail() { log "THAT BAI: $1. Giu nguyen ban dang chay."; rm -rf "$REL"; exit 1; }

mkdir -p "$REL"
rsync -a --delete --exclude '.git' --exclude 'deploy' --exclude 'data' --exclude '.env*' "$SRC/" "$REL/" || fail "rsync"
cd "$REL"
npm ci --no-audit --no-fund >>"$LOG" 2>&1 || fail "npm ci"
DATA_DIR="$DATA_DIR" npm run db:seed >>"$LOG" 2>&1 || fail "db:seed"
DATA_DIR="$DATA_DIR" npm run db:client-logos >>"$LOG" 2>&1 || fail "db:client-logos"
DATA_DIR="$DATA_DIR" SWC_NATIVE_BINDING_CACHE=/tmp/swc-cache npm run build >>"$LOG" 2>&1 || fail "build"

# Giữ lại ảnh đã tối ưu (/_next/image) của bản trước: khoá bộ nhớ đệm theo URL ảnh + kích thước + chất lượng, không phụ thuộc
# bản build, nên không cần tối ưu lại từ đầu sau mỗi lần deploy (khách đầu tiên sau deploy không phải chờ).
if [ -n "$PREV" ] && [ -d "$PREV/.next/cache/images" ]; then
  mkdir -p "$REL/.next/cache" && cp -a "$PREV/.next/cache/images" "$REL/.next/cache/" 2>/dev/null || true
fi

# Doi sang ban moi (nguyen tu), khoi dong lai pm2.
ln -sfn "$REL" "$CURRENT.new" && mv -T "$CURRENT.new" "$CURRENT"
start_app() {
  pm2 delete hanin-website >/dev/null 2>&1 || true
  PORT="$PORT" DATA_DIR="$DATA_DIR" SWC_NATIVE_BINDING_CACHE=/tmp/swc-cache pm2 start npm --name hanin-website --cwd "$CURRENT" -- run start >>"$LOG" 2>&1
  pm2 save >/dev/null 2>&1 || true
}
start_app

ok=0
for _ in $(seq 1 30); do
  sleep 1
  if [ "$(curl -s -o /dev/null -m 5 -w '%{http_code}' "http://127.0.0.1:$PORT/")" = "200" ]; then ok=1; break; fi
done
if [ "$ok" != "1" ]; then
  log "Ban moi khong len duoc. Quay ve ban cu: ${PREV:-khong co}"
  if [ -n "$PREV" ] && [ -d "$PREV" ]; then ln -sfn "$PREV" "$CURRENT.new" && mv -T "$CURRENT.new" "$CURRENT"; start_app; fi
  rm -rf "$REL"
  exit 1
fi

echo "$REMOTE_SHA" > "$RELEASES/.current-sha"
log "Da deploy ${REMOTE_SHA:0:7} -> $REL"
# Giu lai $KEEP ban gan nhat, xoa ban cu hon.
ls -1dt "$RELEASES"/*/ 2>/dev/null | tail -n +$((KEEP + 1)) | xargs -r rm -rf
