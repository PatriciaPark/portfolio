#!/bin/bash

echo "📦 Building project..."
npm run build

echo "📂 Saving current directory path..."
ORIGIN_DIR=$(pwd)

echo "🌍 Switching to gh-pages branch..."
git switch gh-pages || git checkout -b gh-pages

echo "🧹 Cleaning old files..."
rm -rf *

echo "📂 Copying build output..."
cp -r "$ORIGIN_DIR/build/"* .

echo "📝 Committing changes..."
git add .
git commit -m "🚀 deploy latest build"

echo "☁️ Pushing to origin gh-pages..."
git push origin gh-pages --force

echo "✅ Deployment complete! Check your site at:"
echo "https://patriciapark.github.io/portfolio/"