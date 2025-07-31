Write-Host "🔧 Running auto-fix for Dividend Calculator..." -ForegroundColor Cyan

# Fix linting issues
Write-Host "📝 Fixing ESLint issues..." -ForegroundColor Yellow
npm run lint:fix

# Format code
Write-Host "🎨 Formatting code with Prettier..." -ForegroundColor Yellow
npm run format

# Type check
Write-Host "🔍 Running TypeScript checks..." -ForegroundColor Yellow
npm run type-check

# Test build
Write-Host "🏗️ Testing build..." -ForegroundColor Yellow
npm run build

Write-Host "✅ Auto-fix complete!" -ForegroundColor Green
