#!/bin/sh
set -eu
cd /workspace

# App (preview contract: 0.0.0.0:8080)
if ! curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  npm run dev >>/tmp/app-startup.log 2>&1 &
  # Wait briefly for Vite to come up
  i=0
  while [ "$i" -lt 30 ]; do
    if curl -sf -o /dev/null --max-time 1 http://127.0.0.1:8080/; then
      break
    fi
    i=$((i + 1))
    sleep 0.5
  done
fi

# Public share tunnel (best-effort) — write URL to /tmp/share-url.txt
if ! pgrep -f "cloudflared tunnel --url" >/dev/null 2>&1; then
  if [ -x /tmp/cloudflared ]; then
    CF=/tmp/cloudflared
  elif command -v cloudflared >/dev/null 2>&1; then
    CF=$(command -v cloudflared)
  else
    CF=""
  fi
  if [ -n "$CF" ]; then
    "$CF" tunnel --url http://127.0.0.1:8080 >>/tmp/cf-tunnel.log 2>&1 &
    # scrape URL when ready
    (
      i=0
      while [ "$i" -lt 40 ]; do
        if grep -Eo 'https://[a-zA-Z0-9.-]+\.trycloudflare\.com' /tmp/cf-tunnel.log 2>/dev/null | tail -1 > /tmp/share-url.txt; then
          if [ -s /tmp/share-url.txt ]; then
            break
          fi
        fi
        i=$((i + 1))
        sleep 0.5
      done
    ) &
  fi
fi

exit 0
