#!/bin/bash

echo "🚀 Deploying SafetySnap to Vercel..."

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "📝 Logging in to Vercel..."
vercel login

# Set environment variables
echo "🔧 Setting environment variables..."
vercel env add MONGODB_URI production
vercel env add PORT production
vercel env add NODE_ENV production

# Deploy to production
echo "🚀 Deploying to production..."
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app is now live!"
