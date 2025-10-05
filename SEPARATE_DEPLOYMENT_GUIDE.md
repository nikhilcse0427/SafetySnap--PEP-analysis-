# 🚀 Separate Backend & Frontend Deployment Guide

## 📋 Overview
1. Deploy Backend → Get Backend URL
2. Update Frontend with Backend URL
3. Deploy Frontend

---

# PART 1: Deploy Backend API

## Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Login to your account
3. Click **"Network Access"** (left sidebar)
4. Click **"Add IP Address"**
5. Select **"Allow Access from Anywhere"**
6. Enter: `0.0.0.0/0`
7. Click **"Confirm"**

✅ Done!

---

## Step 2: Create Backend Repository on GitHub

### Option A: Create Separate Backend Repo (Recommended)

```bash
# Navigate to server folder
cd c:\Users\Hp\Desktop\project\server

# Initialize git
git init

# Add files
git add .

# Commit
git commit -m "SafetySnap Backend API"

# Create new repo on GitHub named "safetysnap-backend"
# Then push:
git remote add origin https://github.com/YOUR_USERNAME/safetysnap-backend.git
git branch -M main
git push -u origin main
```

### Option B: Use Existing Repo with Server Folder

Skip this if you want to deploy from the server folder of your existing repo.

---

## Step 3: Deploy Backend to Vercel

### Using Vercel Dashboard:

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **"safetysnap-backend"** (or your main repo)
4. Configure:
   - **Project Name:** `safetysnap-backend`
   - **Framework Preset:** Other
   - **Root Directory:** `server` (if using main repo) or `./` (if separate repo)
   - **Build Command:** Leave empty or `npm install`
   - **Output Directory:** Leave empty
   - **Install Command:** `npm install`

5. Click **"Environment Variables"** and add:

   | Name | Value |
   |------|-------|
   | `MONGODB_URI` | `mongodb+srv://nikhilverma0427_db_user:uQdMrinnxvvC2tvT@cluster0.vypxu2f.mongodb.net/SafetySnap` |
   | `PORT` | `5000` |
   | `NODE_ENV` | `production` |

6. Click **"Deploy"**

---

## Step 4: Get Backend URL

After deployment succeeds:

1. You'll see your backend URL like:
   ```
   https://safetysnap-backend.vercel.app
   ```

2. **COPY THIS URL** - You'll need it for frontend!

3. Test it by visiting:
   ```
   https://safetysnap-backend.vercel.app/api/health
   ```
   Should return: `{"status":"OK","message":"SafetySnap API is running"}`

✅ Backend is live!

---

# PART 2: Deploy Frontend

## Step 5: Update Frontend with Backend URL

### Create .env file in client folder:

```bash
cd c:\Users\Hp\Desktop\project\client
```

Create a file named `.env` with:
```
REACT_APP_API_URL=https://safetysnap-backend.vercel.app
```

**Replace with YOUR actual backend URL!**

---

## Step 6: Test Locally (Optional)

```bash
# In client folder
npm start
```

Test if frontend connects to your live backend.

---

## Step 7: Create Frontend Repository

### Option A: Separate Frontend Repo

```bash
cd c:\Users\Hp\Desktop\project\client

git init
git add .
git commit -m "SafetySnap Frontend"

# Create new repo on GitHub named "safetysnap-frontend"
git remote add origin https://github.com/YOUR_USERNAME/safetysnap-frontend.git
git branch -M main
git push -u origin main
```

### Option B: Use Existing Repo

Push updated code to your existing repo:

```bash
cd c:\Users\Hp\Desktop\project

git add .
git commit -m "Update frontend with backend URL"
git push origin main
```

---

## Step 8: Deploy Frontend to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select **"safetysnap-frontend"** (or main repo)
4. Configure:
   - **Project Name:** `safetysnap-frontend`
   - **Framework Preset:** Create React App
   - **Root Directory:** `client` (if using main repo) or `./` (if separate repo)
   - **Build Command:** `npm run build`
   - **Output Directory:** `build`
   - **Install Command:** `npm install`

5. Click **"Environment Variables"** and add:

   | Name | Value |
   |------|-------|
   | `REACT_APP_API_URL` | `https://safetysnap-backend.vercel.app` |

   **Use YOUR actual backend URL!**

6. Click **"Deploy"**

---

## Step 9: Update Backend CORS

After frontend is deployed, you'll get a frontend URL like:
```
https://safetysnap-frontend.vercel.app
```

### Update Backend Environment Variables:

1. Go to your **backend project** in Vercel
2. Settings → Environment Variables
3. Add new variable:
   - Name: `FRONTEND_URL`
   - Value: `https://safetysnap-frontend.vercel.app`

4. Go to Deployments tab
5. Click **"Redeploy"** on latest deployment

---

## Step 10: Test Your Live App! 🎉

1. Open your frontend URL:
   ```
   https://safetysnap-frontend.vercel.app
   ```

2. Test all features:
   - ✅ Select domain
   - ✅ Upload image
   - ✅ See PPE detection results
   - ✅ Check dashboard

---

# 🎯 Quick Reference

## Backend URL:
```
https://safetysnap-backend.vercel.app
```

## Frontend URL:
```
https://safetysnap-frontend.vercel.app
```

## Environment Variables:

**Backend:**
- `MONGODB_URI` = Your MongoDB connection string
- `PORT` = 5000
- `NODE_ENV` = production
- `FRONTEND_URL` = Your frontend URL

**Frontend:**
- `REACT_APP_API_URL` = Your backend URL

---

# 🐛 Troubleshooting

## CORS Errors
- Make sure `FRONTEND_URL` is set in backend
- Redeploy backend after adding frontend URL

## API Not Working
- Check backend URL is correct in frontend `.env`
- Test backend health endpoint
- Check Vercel function logs

## Images Not Loading
- Vercel has read-only filesystem
- Images uploaded won't persist
- Consider using Cloudinary for production

---

# ✅ Success Checklist

- [ ] MongoDB Atlas IP whitelist set to 0.0.0.0/0
- [ ] Backend deployed and health check works
- [ ] Backend URL copied
- [ ] Frontend `.env` has correct backend URL
- [ ] Frontend deployed successfully
- [ ] Backend has frontend URL in CORS
- [ ] All features work on live site

---

**Your app is now live with separate backend and frontend! 🚀**
