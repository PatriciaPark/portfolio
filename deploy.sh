#!/bin/bash
set -e

# 1. main 브랜치에서만 실행
if [[ $(git branch --show-current) != "main" ]]; then
  echo "⚠️ Run this from main branch."
  exit 1
fi

echo "📦 Building project..."
npm run build

# 2. 빌드 백업
TEMP_DIR=$(mktemp -d)
cp -r build/* "$TEMP_DIR"

# 3. gh-pages로 전환
git switch gh-pages || git checkout -b gh-pages

# 4. 트래킹된 파일만 삭제
git rm -rf .

# 5. 언트래킹 파일(예: node_modules)까지 깨끗하게 청소
git clean -fdx

# 6. 백업해 둔 빌드 복사
cp -r "$TEMP_DIR"/* .
rm -rf "$TEMP_DIR"

# 7. 커밋 & 푸시 (변경 있을 때만)
git add .
git diff --exit-code || git commit -m "🚀 deploy latest build"
git push origin gh-pages --force

# 8. main으로 복귀
git switch main

echo "✅ Deployed! Your site is live at https://patriciapark.github.io/portfolio/"