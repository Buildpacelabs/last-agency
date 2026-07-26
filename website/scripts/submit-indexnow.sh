#!/usr/bin/env bash
# Push every URL in the sitemap to IndexNow.
#
# IndexNow notifies Bing, Yandex, Seznam and Naver within minutes instead of
# waiting on a crawl. Google does not participate — Google discovery is handled
# by the sitemap and Search Console. Bing still matters here because Copilot
# answers are built on the Bing index, and AI citation is something we sell.
#
# Run it after any deploy that adds or materially changes pages:
#     ./scripts/submit-indexnow.sh
#
# Re-submitting unchanged URLs is pointless and looks like spam. Only run this
# when something actually shipped.

set -euo pipefail

HOST="lastagencyhere.com"
KEY="ecf2a1301f4c9dee808c9cbc1a970931"
KEY_LOCATION="https://${HOST}/${KEY}.txt"
CLAUDE_SEO="${HOME}/.claude/skills/seo/bin/claude-seo"
TMP="$(mktemp -t indexnow-urls)"
trap 'rm -f "$TMP"' EXIT

echo "==> Verifying key file is published"
if ! curl -sf "$KEY_LOCATION" | grep -q "$KEY"; then
  echo "ERROR: $KEY_LOCATION does not serve the key. Deploy first." >&2
  exit 1
fi

echo "==> Collecting URLs from the sitemap"
curl -sf "https://${HOST}/sitemap.xml" \
  | grep -oE '<loc>[^<]+</loc>' \
  | sed -e 's|<loc>||' -e 's|</loc>||' \
  > "$TMP"

COUNT=$(wc -l < "$TMP" | tr -d ' ')
echo "    $COUNT URLs"

if [ "$COUNT" -eq 0 ]; then
  echo "ERROR: sitemap returned no URLs." >&2
  exit 1
fi

echo "==> Submitting to IndexNow"
"$CLAUDE_SEO" run indexnow_submit.py \
  --host "$HOST" \
  --key "$KEY" \
  --key-location "$KEY_LOCATION" \
  --urls-file "$TMP" \
  --json
