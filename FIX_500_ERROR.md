# 🔧 Fix 500 Internal Server Error

## What I Fixed

1. ✅ Created `api/index.js` entry point for Vercel
2. ✅ Updated `vercel.json` to use correct build source
3. ✅ Added root endpoint to server
4. ✅ Proper module exports for serverless functions

---

## 🚀 Deploy Fixed Backend - Step by Step

### Step 1: Commit Changes

```bash
cd c:\Users\Hp\Desktop\project\server

git add .
git commit -m "Fix 500 error - Add Vercel serverless support"
git push origin main
```

### Step 2: Wait for Auto-Deploy

Vercel will automatically detect and redeploy (2-3 minutes)

### Step 3: Check Deployment

Go to your Vercel dashboard and wait for:
- 🟡 Building... → 🟢 Ready

---

## ✅ Test Your Backend

After deployment, test these URLs:

### 1. Root Endpoint
```
https://your-backend.vercel.app/
```
Should return JSON with API info

### 2. Health Check
```
https://your-backend.vercel.app/api/health
```
Should return: `{"status":"OK","message":"SafetySnap API is running"}`

---

## 🐛 If Still Getting 500 Error

### Check Function Logs:

1. Go to Vercel Dashboard
2. Click your backend project
3. Click latest deployment
4. Scroll to **"Function Logs"** or **"Runtime Logs"**
5. Look for the actual error message

### Common Issues & Solutions:

#### Issue 1: MongoDB Connection Failed
**Error:** `MongoServerError` or connection timeout

**Solution:**
1. Go to MongoDB Atlas
2. Network Access → Add IP: `0.0.0.0/0`
3. Database Access → Check user has read/write permissions

#### Issue 2: Missing Environment Variables
**Error:** `MONGODB_URI is not defined`

**Solution:**
1. Vercel Dashboard → Your Project → Settings
2. Environment Variables
3. Add all required variables:
   - `MONGODB_URI`
   - `PORT` = 5000
   - `NODE_ENV` = production

#### Issue 3: Module Not Found
**Error:** `Cannot find module './routes/upload'`

**Solution:** Make sure all files are pushed to GitHub:
```bash
cd c:\Users\Hp\Desktop\project\server
git status
git add .
git commit -m "Add missing files"
git push origin main
```

---

## 📋 Verify Environment Variables

Make sure these are set in Vercel:

| Variable | Value | Status |
|----------|-------|--------|
| MONGODB_URI | `mongodb+srv://...` | ✅ Required |
| PORT | `5000` | ✅ Required |
| NODE_ENV | `production` | ✅ Required |
| FRONTEND_URL | (add after frontend deployed) | ⏳ Optional now |

---

## 🔄 Manual Redeploy (If Needed)

1. Vercel Dashboard → Your Backend Project
2. Deployments tab
3. Click "..." on latest deployment
4. Click "Redeploy"
5. **Uncheck** "Use existing Build Cache"
6. Click "Redeploy"

---

## 📊 Expected Response

### Root (/)
```json
{
  "message": "SafetySnap Backend API",
  "version": "1.0.0",
  "status": "running",
  "endpoints": {
    "health": "/api/health",
    "upload": "/api/upload",
    "analyses": "/api/analyses"
  }
}
```

### Health (/api/health)
```json
{
  "status": "OK",
  "message": "SafetySnap API is running"
}
```

---

## 🎯 Next Steps After Backend Works

1. ✅ Backend is live and responding
2. Copy your backend URL
3. Update frontend `.env`:
   ```
   REACT_APP_API_URL=https://your-backend.vercel.app
   ```
4. Deploy frontend
5. Add frontend URL to backend CORS

---

## 📞 Still Having Issues?

Share these details:
1. Backend URL
2. Error message from Function Logs
3. Screenshot of error

---

**Status:** Ready to redeploy with fixes! 🚀
