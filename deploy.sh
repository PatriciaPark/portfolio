#!/bin/bash
set -e

# 1. main 브랜치 체크
if [[ $(git branch --show-current) != "main" ]]; then
  echo "⚠️ STOP: Run this script from main branch."
  exit 1
fi

echo "📦 Building project..."
npm run build

# 2. build 백업
TEMP_DIR=$(mktemp -d)
cp -r build/* "$TEMP_DIR"

# 3. gh-pages로 전환 & 파일 정리
git switch gh-pages || git checkout -b gh-pages
git rm -rf .  # 트래킹된 파일만 삭제

# 4. 백업한 빌드 복사
cp -r "$TEMP_DIR"/* .
rm -rf "$TEMP_DIR"

# 5. 커밋 & 푸시 (변경 있을 때만)
git add .
git diff --exit-code || git commit -m "🚀 deploy latest build"
git push origin gh-pages --force

# 6. main으로 복귀
git switch main
echo "✅ Deployment complete! https://patriciapark.github.io/portfolio/"