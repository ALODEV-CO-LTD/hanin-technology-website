#!/usr/bin/env bash
# Cai dat MOT LAN: tu do moi lan `git push` len GitHub, server tu build va cap nhat (khong can chay deploy.sh).
# Chay tu thu muc goc du an, tren MAY BAN:
#   bash deploy/setup-auto-deploy.sh git@github.com:TEN/REPO.git
#
# Can: da tao repo (nen de Private) tren GitHub; may ban da ssh duoc vao GitHub (de push) va vao `khanh-dev`.
set -euo pipefail

REPO_URL="${1:-https://github.com/trancongthangvn/hanin-technology-website.git}"
BRANCH="${BRANCH:-master}"
TARGET_HOST="${TARGET_HOST:-khanh-dev}"
# Kho cong khai (https) thi server clone khong can khoa; kho rieng tu (git@...) thi can them khoa deploy.
PUBLIC_REPO=0; case "$REPO_URL" in https://*) PUBLIC_REPO=1;; esac

echo "==> [1/5] Dat remote git va day code len GitHub..."
if git remote get-url origin >/dev/null 2>&1; then git remote set-url origin "$REPO_URL"; else git remote add origin "$REPO_URL"; fi
git push -u origin "$BRANCH" || echo "(Bo qua loi push: co the code da len GitHub roi hoac may nay chua co quyen ghi.)"

if [ "$PUBLIC_REPO" = "0" ]; then
echo "==> [2/5] Tao khoa deploy (chi doc) tren container..."
ssh "$TARGET_HOST" bash <<'REMOTE_KEY'
set -e
mkdir -p /root/.ssh && chmod 700 /root/.ssh
[ -f /root/.ssh/hanin_deploy ] || ssh-keygen -t ed25519 -N '' -C 'hanin-autodeploy' -f /root/.ssh/hanin_deploy >/dev/null
echo ""
echo "----- KHOA CONG KHAI (copy toan bo dong duoi) -----"
cat /root/.ssh/hanin_deploy.pub
echo "---------------------------------------------------"
REMOTE_KEY
echo ""
echo "Vao GitHub: repo > Settings > Deploy keys > Add deploy key"
echo "Dat Title 'hanin-server', dan khoa o tren, KHONG tick 'Allow write access', roi Add key."
read -r -p "Da them xong thi nhan Enter de tiep tuc... " _
fi

echo "==> [3/5] Cai git/rsync, clone code tren container, chuyen sang kieu release..."
ssh "$TARGET_HOST" REPO_URL="$REPO_URL" BRANCH="$BRANCH" bash <<'REMOTE_CLONE'
set -e
export DEBIAN_FRONTEND=noninteractive
command -v git >/dev/null || { apt-get update; apt-get install -y git; }
command -v rsync >/dev/null || { apt-get update; apt-get install -y rsync; }
mkdir -p /root/.ssh && chmod 700 /root/.ssh
touch /root/.ssh/config /root/.ssh/known_hosts
[ -f /root/.ssh/hanin_deploy ] && ! grep -q 'hanin_deploy' /root/.ssh/config && cat >> /root/.ssh/config <<'CFG'

Host github.com
  IdentityFile /root/.ssh/hanin_deploy
  IdentitiesOnly yes
CFG
chmod 600 /root/.ssh/config
ssh-keyscan -t ed25519,rsa github.com >> /root/.ssh/known_hosts 2>/dev/null
mkdir -p /opt/hanin-releases
if [ -d /opt/hanin-website ] && [ ! -L /opt/hanin-website ]; then
  mv /opt/hanin-website /opt/hanin-releases/legacy-$(date +%Y%m%d%H%M%S)
  ln -sfn "$(ls -1dt /opt/hanin-releases/legacy-* | head -1)" /opt/hanin-website
fi
if [ ! -d /opt/hanin-src/.git ]; then git clone --branch "$BRANCH" "$REPO_URL" /opt/hanin-src; fi
cd /opt/hanin-src && git remote set-url origin "$REPO_URL"
install -m 755 /opt/hanin-src/deploy/server-update.sh /usr/local/bin/hanin-autodeploy
REMOTE_CLONE

echo "==> [4/5] Cai dat bo hen gio (moi phut kiem tra commit moi)..."
ssh "$TARGET_HOST" BRANCH="$BRANCH" bash <<'REMOTE_TIMER'
set -e
cat > /etc/systemd/system/hanin-autodeploy.service <<UNIT
[Unit]
Description=HANIN tu dong cap nhat website tu git
After=network-online.target

[Service]
Type=oneshot
Environment=BRANCH=$BRANCH
ExecStart=/usr/local/bin/hanin-autodeploy
TimeoutStartSec=1800
UNIT
cat > /etc/systemd/system/hanin-autodeploy.timer <<'UNIT'
[Unit]
Description=Kiem tra ban cap nhat HANIN moi phut

[Timer]
OnBootSec=60
OnUnitActiveSec=60
AccuracySec=5s

[Install]
WantedBy=timers.target
UNIT
systemctl daemon-reload
systemctl enable --now hanin-autodeploy.timer
REMOTE_TIMER

echo "==> [5/5] Chay cap nhat dau tien..."
ssh "$TARGET_HOST" 'FORCE=1 BRANCH='"$BRANCH"' /usr/local/bin/hanin-autodeploy; tail -n 5 /var/log/hanin-autodeploy.log'

echo ""
echo "Xong. Tu nay chi can: git add -A && git commit -m '...' && git push"
echo "Server tu cap nhat trong khoang 1-3 phut. Xem nhat ky: ssh $TARGET_HOST 'tail -f /var/log/hanin-autodeploy.log'"
echo "Dieu chinh du lieu CMS van lam trong trang quan tri nhu cu (khong anh huong boi cap nhat)."
