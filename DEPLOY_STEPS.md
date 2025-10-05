# 🚀 Quick Deployment Steps

## ✅ Prerequisites Done
- MongoDB Atlas IP whitelist: 0.0.0.0/0
- Code updated with environment variables
- Ready to deploy!

---

# PART 1: Deploy Backend (5 Minutes)

## Step 1: Push Server Code to GitHub

```bash
cd c:\Users\Hp\Desktop\project\server

git init
git add .
git commit -m "SafetySnap Backend API"
```

**Now create a new repo on GitHub:**
1. Go to https://github.com/new
2. Name: `safetysnap-backend`
3. Click "Create repository"
4. Copy the commands shown, or run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/safetysnap-backend.git
git branch -M main
git push -u origin main
```

---

## Step 2: Deploy Backend on Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `safetysnap-backend`
4. Configure:
   - Project Name: `safetysnap-backend`
   - Framework: Other
   - Root Directory: `./`
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

5. Add Environment Variables:
   ```
   MONGODB_URI = mongodb+srv://nikhilverma0427_db_user:uQdMrinnxvvC2tvT@cluster0.vypxu2f.mongodb.net/SafetySnap
   PORT = 5000
   NODE_ENV = production
   ```

6. Click **"Deploy"**

7. Wait 2-3 minutes

8. **COPY YOUR BACKEND URL!**
   Example: `https://safetysnap-backend.vercel.app`

---

# PART 2: Deploy Frontend (5 Minutes)

## Step 3: Create Frontend .env File

```bash
cd c:\Users\Hp\Desktop\project\client
```

Create a file named `.env` with this content:
```
REACT_APP_API_URL=https://safetysnap-backend.vercel.app
```

**⚠️ IMPORTANT: Replace with YOUR actual backend URL from Step 2!**

---

## Step 4: Push Frontend Code to GitHub

```bash
cd c:\Users\Hp\Desktop\project\client

git init
git add .
git commit -m "SafetySnap Frontend"
```

**Create another new repo on GitHub:**
1. Go to https://github.com/new
2. Name: `safetysnap-frontend`
3. Click "Create repository"
4. Run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/safetysnap-frontend.git
git branch -M main
git push -u origin main
```

---

## Step 5: Deploy Frontend on Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select `safetysnap-frontend`
4. Configure:
   - Project Name: `safetysnap-frontend`
   - Framework: Create React App
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `build`

5. Add Environment Variable:
   ```
   REACT_APP_API_URL = https://safetysnap-backend.vercel.app
   ```
   **Use YOUR backend URL!**

6. Click **"Deploy"**

7. Wait 2-3 minutes

8. **COPY YOUR FRONTEND URL!**
   Example: `https://safetysnap-frontend.vercel.app`

---

## Step 6: Update Backend CORS

1. Go to your **backend project** in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   ```
   FRONTEND_URL = https://safetysnap-frontend.vercel.app
   ```
   **Use YOUR frontend URL from Step 5!**

4. Go to "Deployments" tab
5. Click "..." on latest deployment
6. Click "Redeploy"

---

# 🎉 DONE! Test Your App

Open your frontend URL:
```
https://safetysnap-frontend.vercel.app
```

Test:
- ✅ Select domain (Construction, Lab, etc.)
- ✅ Upload image
- ✅ See PPE detection results
- ✅ Check dashboard

---

# 📝 Summary

**Backend URL:** `https://safetysnap-backend.vercel.app`
**Frontend URL:** `https://safetysnap-frontend.vercel.app`

**Backend Environment Variables:**
- MONGODB_URI
- PORT
- NODE_ENV
- FRONTEND_URL

**Frontend Environment Variables:**
- REACT_APP_API_URL

---

# 🐛 Troubleshooting

**CORS Error?**
- Make sure FRONTEND_URL is set in backend
- Redeploy backend

**API Not Working?**
- Check REACT_APP_API_URL in frontend
- Test backend: `https://your-backend.vercel.app/api/health`

**Build Failed?**
- Check build logs in Vercel
- Make sure all dependencies are in package.json

---

**Your app is now live! 🚀**
