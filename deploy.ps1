# SentinelAI Deployment Script
# This script will deploy your frontend to Vercel

Write-Host "🚀 Starting SentinelAI Deployment to Vercel..." -ForegroundColor Cyan
Write-Host ""

# Check if Vercel CLI is installed
$vercelInstalled = Get-Command vercel -ErrorAction SilentlyContinue
if (-not $vercelInstalled) {
    Write-Host "❌ Vercel CLI not found. Installing..." -ForegroundColor Yellow
    npm install -g vercel
}

# Navigate to project root
Set-Location "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"

# Check if logged in to Vercel
Write-Host "📋 Checking Vercel login status..." -ForegroundColor Cyan
$loginCheck = vercel whoami 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Not logged in to Vercel. Please login:" -ForegroundColor Yellow
    Write-Host "   Run: vercel login" -ForegroundColor White
    Write-Host ""
    Write-Host "   This will open a browser for authentication." -ForegroundColor Gray
    Write-Host ""
    $login = Read-Host "Press Enter to login now (or Ctrl+C to cancel)"
    vercel login
}

Write-Host ""
Write-Host "✅ Logged in to Vercel!" -ForegroundColor Green
Write-Host ""

# Build frontend first
Write-Host "🔨 Building frontend..." -ForegroundColor Cyan
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build successful!" -ForegroundColor Green
Write-Host ""

# Deploy to Vercel
Write-Host "🚀 Deploying to Vercel..." -ForegroundColor Cyan
Write-Host "   (This may take a few minutes)" -ForegroundColor Gray
Write-Host ""

vercel --prod --yes

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Deployment successful!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📝 Next Steps:" -ForegroundColor Cyan
    Write-Host "   1. Copy your Vercel deployment URL" -ForegroundColor White
    Write-Host "   2. Deploy backend to Render/Railway (see DEPLOYMENT_INSTRUCTIONS.md)" -ForegroundColor White
    Write-Host "   3. Update VITE_API_URL in Vercel dashboard with backend URL" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "❌ Deployment failed. Check errors above." -ForegroundColor Red
}
