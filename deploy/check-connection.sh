#!/usr/bin/env bash
# Chay script nay TREN MAY BAN (khong phai qua Claude) de kiem tra ket noi
# toi container qua jump host, va lay IP public cua container.
set -euo pipefail

SSH_KEY="$HOME/.ssh/pvs_ed25519"
JUMP_HOSTS="root@10.5.100.31,root@10.5.100.5"
TARGET_HOST="root@10.5.100.17"

echo "==> Dang ket noi qua pve3 (10.5.100.31) -> pve5 (10.5.100.5) -> container (10.5.100.17)..."
ssh -i "$SSH_KEY" -J "$JUMP_HOSTS" -o StrictHostKeyChecking=accept-new "$TARGET_HOST" bash <<'REMOTE'
set -e
echo "OK - da vao duoc container: $(hostname)"
echo "OS: $(cat /etc/os-release | grep PRETTY_NAME)"
echo ""
echo "IP public cua container (theo ifconfig.me):"
curl -s ifconfig.me || echo "(khong lay duoc - container co the khong co internet ra ngoai truc tiep, can kiem tra NAT/port-forward tren pve)"
echo ""
REMOTE
