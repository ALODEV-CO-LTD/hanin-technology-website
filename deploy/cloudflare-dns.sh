#!/usr/bin/env bash
# Tao/cap nhat DNS A record cho hanin.maxmin.vn tro ve IP public cua container.
# Chay script nay TREN MAY BAN (khong phai qua Claude).
#
# Cach dung:
#   export CF_API_TOKEN="ghp_hoac_cf_token_cua_ban"   # KHONG dan token vao chat voi Claude
#   export PUBLIC_IP="1.2.3.4"                         # IP public cua container/server
#   bash deploy/cloudflare-dns.sh
#
# Neu chua biet PUBLIC_IP, lay bang cach SSH vao container roi chay:
#   ssh khanh-dev curl -s ifconfig.me

set -euo pipefail

ZONE_NAME="maxmin.vn"
RECORD_NAME="hanin.maxmin.vn"

: "${CF_API_TOKEN:?Chua set bien CF_API_TOKEN. Chay: export CF_API_TOKEN=... truoc khi goi script nay}"
: "${PUBLIC_IP:?Chua set bien PUBLIC_IP. Chay: export PUBLIC_IP=... truoc khi goi script nay}"

echo "==> [1/3] Tim Zone ID cho $ZONE_NAME..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$ZONE_NAME" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['result'][0]['id'] if d.get('result') else '')")

if [ -z "$ZONE_ID" ]; then
  echo "LOI: Khong tim thay zone '$ZONE_NAME'. Kiem tra lai token co quyen truy cap zone nay khong."
  exit 1
fi
echo "Zone ID: $ZONE_ID"

echo "==> [2/3] Kiem tra record '$RECORD_NAME' da ton tai chua..."
EXISTING_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records?name=$RECORD_NAME&type=A" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['result'][0]['id'] if d.get('result') else '')")

echo "==> [3/3] Tao/cap nhat A record $RECORD_NAME -> $PUBLIC_IP ..."
if [ -n "$EXISTING_ID" ]; then
  curl -s -X PUT "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$EXISTING_ID" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"A\",\"name\":\"$RECORD_NAME\",\"content\":\"$PUBLIC_IP\",\"ttl\":300,\"proxied\":false}" \
    | python3 -m json.tool
else
  curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
    -H "Authorization: Bearer $CF_API_TOKEN" \
    -H "Content-Type: application/json" \
    --data "{\"type\":\"A\",\"name\":\"$RECORD_NAME\",\"content\":\"$PUBLIC_IP\",\"ttl\":300,\"proxied\":false}" \
    | python3 -m json.tool
fi

echo ""
echo "Xong. Kiem tra lan truyen DNS bang: dig +short $RECORD_NAME"
echo "Sau khi DNS tro dung (co the mat vai phut), chay xin SSL:"
echo "  ssh khanh-dev 'certbot --nginx -d $RECORD_NAME'"
