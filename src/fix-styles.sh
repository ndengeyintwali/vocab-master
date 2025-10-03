#!/bin/bash

echo "🔧 Fixing VocabMaster styling issues..."

# Remove node_modules and lock files
echo "📦 Cleaning dependencies..."
rm -rf node_modules
rm -f package-lock.json
rm -f yarn.lock

# Reinstall dependencies
echo "⬇️ Reinstalling dependencies..."
npm install

# Clear any cached data
echo "🧹 Clearing cache..."
npm run dev -- --force

echo "✅ Style fix complete! Try running 'npm run dev' now."