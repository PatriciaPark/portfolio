#!/bin/bash
set -e

# 1) 워크트리로 gh-pages 브랜치 준비 (최초 1회)
if [ ! -d "../gh-pages" ]; then
  git worktree add ../gh-pages gh-pages
fi

# 2) 프로젝트 빌드
echo "📦 Building..."
npm run build

# 3) gh-pages 워크트리 디렉토리에 복사
echo "📂 Copying build to gh-pages worktree..."
rm -rf ../gh-pages/*
cp -r build/* ../gh-pages/

# 4) gh-pages 워크트리로 이동하여 커밋 & 푸시
pushd ../gh-pages
git add .
# 변경사항이 있을 때만 커밋
if ! git diff --cached --quiet; then
  git commit -m "🚀 deploy latest build"
fi
git push origin gh-pages --force
popd

echo "✅ Deployment complete! Site updated at https://patriciapark.github.io/portfolio/"