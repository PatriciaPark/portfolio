#!/bin/bash
set -e

# 0. Stash any work in progress
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "💾 Stashing tracked changes..."
  git stash push -m "deploy-temp"   # *no* -u, so node_modules stays OUT of the stash
  STASHED=true
fi

# 1. Only from main
if [[ $(git branch --show-current) != "main" ]]; then
  echo "⚠️  Please run from main branch."
  $STASHED && git stash pop
  exit 1
fi

# 2. Build
echo "📦 Building..."
npm run build

# 3. Back up build
TEMP_DIR=$(mktemp -d)
cp -r build/* "$TEMP_DIR"

# 4. Switch to gh-pages (force any dirty worktree)
git switch gh-pages --force || git checkout -b gh-pages

# 5. Clean out only tracked files
git rm -rf .

# 6. Clean untracked but leave ignored (no -x)
git clean -fd

# 7. Copy in new build
cp -r "$TEMP_DIR"/* .
rm -rf "$TEMP_DIR"

# 8. Commit & push
git add .
# Only commit if there’s actually something changed
if ! git diff --cached --quiet ; then
  git commit -m "🚀 deploy latest build"
fi
git push origin gh-pages --force

# 9. Always switch back to main, even if something above died
git switch -f main || true

# 10. Restore your WIP if we stashed it
if [ "$STASHED" = true ]; then
  echo "💾 Restoring your tracked changes..."
  git stash pop
fi

echo "✅ Deployed! Your site is live at https://patriciapark.github.io/portfolio/"