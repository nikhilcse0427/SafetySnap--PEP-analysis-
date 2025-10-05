@echo off
echo 🚀 Deploying SafetySnap to Vercel...

REM Check if vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Vercel CLI not found. Installing...
    npm install -g vercel
)

REM Login to Vercel
echo 📝 Logging in to Vercel...
vercel login

REM Deploy to production
echo 🚀 Deploying to production...
vercel --prod

echo ✅ Deployment complete!
echo 🌐 Your app is now live!
pause
