#!/bin/bash
set -e
pkill -f vite 2>/dev/null || true
sleep 1
npm run dev -- --port 5180 &
VITE_PID=$!
for i in $(seq 1 40); do
  if curl -s -o /dev/null -w "%{http_code}" http://localhost:5180/ 2>/dev/null | grep -q 200; then
    break
  fi
  sleep 1
done
node tmp/next-test.mjs
RV=$?
pkill -f vite 2>/dev/null || true
rm -f tmp/next-test.mjs tmp/run-next-test.sh
exit $RV
