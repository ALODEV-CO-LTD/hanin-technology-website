#!/bin/bash
# Build vào .next-new rồi hoán đổi sang .next: server cũ vẫn phục vụ bản cũ đủ file trong lúc build,
# chỉ lệch vài giây khi hoán đổi + khởi động lại (khác với build thẳng vào .next làm trang mất CSS cả phút).
set -e
cd "$(dirname "$0")/.."
export SWC_NATIVE_BINDING_CACHE="${SWC_NATIVE_BINDING_CACHE:-/private/tmp/claude-502/swc-cache}"
rm -rf .next-new
NEXT_DIST_DIR=.next-new node_modules/.bin/next build
rm -rf .next-old
[ -d .next ] && mv .next .next-old
mv .next-new .next
touch /private/tmp/claude-502/hanin/reload
sleep 8
rm -rf .next-old
echo "Đã hoán đổi build và khởi động lại server."
