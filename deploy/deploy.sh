#!/usr/bin/env bash
# Deploy HANIN website len container Proxmox "Khanh-dev" (10.5.100.17).
# Chay script nay TREN MAY BAN (khong phai qua Claude), tu thu muc goc du an:
#   bash deploy/deploy.sh
#
# Yeu cau truoc khi chay:
#   1. Da cau hinh ~/.ssh/config voi Host "khanh-dev" (IdentityFile pvs_ed25519,
#      ProxyJump qua hanin-pve1/hanin-pve5) va da test `ssh khanh-dev` thanh cong.

set -euo pipefail

TARGET_HOST="khanh-dev"
DOMAIN="hanin.maxmin.vn"
REMOTE_DIR="/opt/hanin-website"
APP_PORT="3000"

echo "==> [1/6] Kiem tra ket noi toi container..."
ssh "$TARGET_HOST" "echo OK - da ket noi toi \$(hostname)"

echo "==> [2/6] Cai dat curl, Node.js 22, nginx, certbot tren container (neu chua co)..."
ssh "$TARGET_HOST" bash <<'REMOTE_SETUP'
set -e
export DEBIAN_FRONTEND=noninteractive
if ! command -v curl >/dev/null 2>&1; then
  apt-get update
  apt-get install -y curl ca-certificates
fi
if ! command -v node >/dev/null 2>&1 || ! command -v npm >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi
if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi
if ! command -v nginx >/dev/null 2>&1; then
  apt-get update
  apt-get install -y nginx certbot python3-certbot-nginx
fi
mkdir -p /opt/hanin-website
REMOTE_SETUP

echo "==> [3/6] Dong bo code len container (rsync, loai tru node_modules/.next/.git)..."
rsync -az --delete \
  --exclude 'node_modules' \
  --exclude '.next' \
  --exclude '.git' \
  --exclude 'deploy' \
  ./ "$TARGET_HOST:$REMOTE_DIR/"

echo "==> [4/6] Cai dependencies va build tren container..."
ssh "$TARGET_HOST" bash <<REMOTE_BUILD
set -e
cd $REMOTE_DIR
npm ci
SWC_NATIVE_BINDING_CACHE=/tmp/swc-cache npm run build
REMOTE_BUILD

echo "==> [5/6] Khoi dong / restart app bang pm2..."
ssh "$TARGET_HOST" bash <<REMOTE_START
set -e
cd $REMOTE_DIR
pm2 delete hanin-website 2>/dev/null || true
PORT=$APP_PORT SWC_NATIVE_BINDING_CACHE=/tmp/swc-cache pm2 start npm --name hanin-website -- run start
pm2 save
REMOTE_START

echo "==> [6/6] Cau hinh nginx reverse proxy cho domain $DOMAIN..."
ssh "$TARGET_HOST" bash <<REMOTE_NGINX
set -e
cat > /etc/nginx/sites-available/hanin-website <<'NGINX_CONF'
server {
    listen 80;
    server_name $DOMAIN;

    location / {
        proxy_pass http://127.0.0.1:$APP_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
    }
}
NGINX_CONF
ln -sf /etc/nginx/sites-available/hanin-website /etc/nginx/sites-enabled/hanin-website
nginx -t
systemctl reload nginx
REMOTE_NGINX

echo ""
echo "Da deploy xong. App dang chay noi bo tren container o cong $APP_PORT (qua pm2)."
echo "Nginx dang reverse-proxy $DOMAIN -> 127.0.0.1:$APP_PORT."
echo ""
echo "BUOC CON THIEU (ban tu lam):"
echo "  1. Tro DNS: A record '$DOMAIN' -> IP PUBLIC cua container/server nay (tren Cloudflare dashboard hoac API, dung token MOI ban da tao lai)."
echo "  2. Sau khi DNS tro dung va da propagate, chay xin SSL:"
echo "     ssh $TARGET_HOST 'certbot --nginx -d $DOMAIN'"
