#!/bin/bash

# ✅ 1. main 브랜치에서만 실행
if [[ $(git branch --show-current) != "main" ]]; then
  echo "⚠️ STOP: Must run this script from main branch."
  exit 1
fi

echo "📦 Building project..."
npm run build

# ✅ 2. 임시 디렉토리에 빌드 백업
echo "📁 Copying build/ to temp folder..."
TEMP_DIR=$(mktemp -d)
cp -r build/* "$TEMP_DIR"

echo "🌍 Switching to gh-pages branch..."
git switch gh-pages || git checkout -b gh-pages

echo "🧹 Cleaning old files..."
rm -rf *

# ✅ 3. 백업한 빌드 복사
echo "📂 Copying from temp to current folder..."
cp -r "$TEMP_DIR"/* .

# ✅ 4. Git 작업
echo "📝 Committing changes..."
git add .
git commit -m "🚀 deploy latest build"
git push origin gh-pages --force

echo "✅ Deployment complete! Check your site at:"
echo "https://patriciapark.github.io/portfolio/"