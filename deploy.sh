#!/bin/bash
set -e

# 0. 로컬 변경사항 있으면 자동 stash
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "💾 Stashing local changes..."
  git stash push -u -m "deploy-temp"
  STASHED=true
fi

# 1. main 브랜치에서만 실행
if [[ $(git branch --show-current) != "main" ]]; then
  echo "⚠️ Run this from main branch."
  # pop stash if we stashed
  $STASHED && git stash pop || true
  exit 1
fi

echo "📦 Building project..."
npm run build

# 2. 빌드 결과 백업
TEMP_DIR=$(mktemp -d)
cp -r build/* "$TEMP_DIR"

# 3. gh-pages로 전환 (새 브랜치 생성 포함)
git switch gh-pages || git checkout -b gh-pages

# 4. 트래킹된 파일만 삭제
git rm -rf .

# 5. git will not touch ignored dirs like node_modules
git clean -fd

# 6. 백업해 둔 build 복사
cp -r "$TEMP_DIR"/* .
rm -rf "$TEMP_DIR"

# 7. 커밋 & 푸시 (변경 있을 때만)
git add .
git diff --exit-code || git commit -m "🚀 deploy latest build"
git push origin gh-pages --force

# 8. main으로 복귀
git switch main

# 9. 숨겨둔 변경사항 되돌리기
if [ "$STASHED" = true ]; then
  echo "💾 Restoring your local changes..."
  git stash pop
fi

echo "✅ Deployed! Your site is live at https://patriciapark.github.io/portfolio/"