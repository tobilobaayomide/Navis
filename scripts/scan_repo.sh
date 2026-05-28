#!/usr/bin/env bash
set -euo pipefail
echo "Repo scan started: $(date)"
echo "----------------------------------------"

echo "1) Git status (including ignored):"
git status --ignored --short | sed -n '1,200p' || true
echo ""

echo "2) Top 40 largest files in working tree (human readable):"
if command -v gdu >/dev/null 2>&1; then
  gdu -ah . | sort -hr | head -n 40
else
  du -ah . 2>/dev/null | sort -hr | head -n 40
fi
echo ""

echo "3) Top 40 largest git objects in history (may take time):"
if git rev-parse --git-dir >/dev/null 2>&1; then
  git rev-list --objects --all \
    | git cat-file --batch-check='%(objecttype) %(objectname) %(objectsize) %(rest)' \
    | sed -n 's/^blob //p' \
    | sort -n -k2 \
    | tail -n 40 \
    | awk '{print $3, $4}' || true
else
  echo "  (not a git repository; skipping git-history scan)"
fi
echo ""

echo "4) Duplicate files (requires fdupes):"
if command -v fdupes >/dev/null 2>&1; then
  fdupes -r . | sed -n '1,200p'
else
  echo "  (install fdupes: brew install fdupes) — skipping duplicate scan"
fi
echo ""

echo "5) Unused deps (depcheck):"
if command -v npx >/dev/null 2>&1; then
  npx depcheck --json 2>/dev/null || true
else
  echo "  (npm/npx not found) — skipping depcheck"
fi
echo ""

echo "6) Unused TS exports (ts-prune):"
if command -v npx >/dev/null 2>&1; then
  npx ts-prune --tsconfig ./tsconfig.json || true
else
  echo "  (npm/npx not found) — skipping ts-prune"
fi
echo ""

echo "7) TODO/FIXME occurrences:"
grep -RIn --exclude-dir=.git "TODO\\|FIXME" 2>/dev/null | sed -n '1,200p' || true
echo ""

echo "Scan complete: $(date)"
