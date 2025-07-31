#!/bin/bash

echo "🔧 Running auto-fix for Dividend Calculator..."

# Fix linting issues
echo "📝 Fixing ESLint issues..."
npm run lint:fix

# Format code
echo "🎨 Formatting code with Prettier..."
npm run format

# Type check
echo "🔍 Running TypeScript checks..."
npm run type-check

# Test build
echo "🏗️ Testing build..."
npm run build

echo "✅ Auto-fix complete!"
