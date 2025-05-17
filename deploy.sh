#!/bin/bash
set -eu

# 0. 임시 디렉토리와 정리 트랩 설정
TEMP_DIR=$(mktemp -d)
trap "rm -rf $TEMP_DIR" EXIT

# 1. WIP(작업 중) 스태시 (untracked 포함)
STASHED=false
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "💾 Stashing tracked & untracked changes..."
  git stash push -u -m "deploy-temp"
  STASHED=true
fi

# 2. main 브랜치 확인
if [[ $(git branch --show-current) != "main" ]]; then
  echo "⚠️ Please run from main branch."
  $STASHED && git stash pop
  exit 1
fi

# 3. 빌드
echo "📦 Building..."
npm run build

# 4. 빌드 결과 백업
cp -r build/* "$TEMP_DIR"

# 5. gh-pages 브랜치 전환 (강제 or 생성)
git switch gh-pages --force || git checkout -b gh-pages || true

# 6. 트래킹된 파일 삭제
git rm -rf .

# 7. 언트래킹된(그러나 ignored 아닌) 파일 삭제
git clean -fd

# 8. 새 빌드 복사
cp -r "$TEMP_DIR"/* .
# (trap 으로 TEMP_DIR 자동 삭제)

# 9. 커밋 및 푸시
git add .
if ! git diff --cached --quiet; then
  git commit -m "🚀 deploy latest build"
fi
git push origin gh-pages --force

# 10. main 복귀
git switch -f main || true

# 11. 스태시 복원
if [ "$STASHED" = true ]; then
  echo "💾 Restoring your tracked changes..."
  git stash pop
fi

echo "✅ Deployment complete! Your site is live at https://patriciapark.github.io/portfolio/"