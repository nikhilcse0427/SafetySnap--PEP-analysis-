# SafetySnap - Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Prerequisites
- GitHub account
- Vercel account (free tier works)
- MongoDB Atlas database (already configured)

---

## Step-by-Step Deployment

### 1. **Prepare the Repository**

First, initialize Git and push to GitHub:

```bash
cd c:\Users\Hp\Desktop\project

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - SafetySnap PPE Detection App"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/safetysnap.git
git branch -M main
git push -u origin main
```

---

### 2. **Deploy to Vercel**

#### Option A: Using Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **safetysnap**
   - In which directory is your code located? **./**
   - Want to override settings? **N**

5. **Set Environment Variables:**
   ```bash
   vercel env add MONGODB_URI
   ```
   Paste: `mongodb+srv://nikhilverma0427_db_user:uQdMrinnxvvC2tvT@cluster0.vypxu2f.mongodb.net/SafetySnap`

   ```bash
   vercel env add PORT
   ```
   Enter: `5000`

6. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

#### Option B: Using Vercel Dashboard

1. **Go to [vercel.com](https://vercel.com)**

2. **Click "Add New Project"**

3. **Import your GitHub repository**

4. **Configure Project:**
   - Framework Preset: **Other**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `client/build`

5. **Add Environment Variables:**
   - Click "Environment Variables"
   - Add:
     - `MONGODB_URI` = `mongodb+srv://nikhilverma0427_db_user:uQdMrinnxvvC2tvT@cluster0.vypxu2f.mongodb.net/SafetySnap`
     - `PORT` = `5000`
     - `NODE_ENV` = `production`

6. **Click "Deploy"**

---

### 3. **Update Client Configuration**

After deployment, update the API endpoint in your client:

**File: `client/package.json`**

Remove or update the proxy:
```json
{
  "proxy": "https://your-app-name.vercel.app"
}
```

Or update API calls to use environment variables:

**File: `client/src/config.js`** (create this file):
```javascript
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

Then update axios calls:
```javascript
import { API_URL } from './config';

axios.post(`${API_URL}/api/upload`, formData);
```

---

### 4. **Add Build Script**

Update `package.json` to include a build script:

```json
{
  "scripts": {
    "server": "nodemon server/server.js",
    "client": "npm start --prefix client",
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "build": "cd client && npm install && npm run build",
    "start": "node server/server.js"
  }
}
```

---

### 5. **Configure CORS**

Update `server/server.js` to allow Vercel domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://your-app-name.vercel.app'
  ],
  credentials: true
}));
```

---

## 🔧 Important Configuration

### MongoDB Atlas Whitelist
1. Go to MongoDB Atlas Dashboard
2. Network Access → IP Whitelist
3. Click "Add IP Address"
4. Select "Allow Access from Anywhere" (0.0.0.0/0)
5. Click "Confirm"

### File Upload on Vercel
⚠️ **Note:** Vercel has a read-only filesystem. For production, you need to:

**Option 1: Use Cloud Storage (Recommended)**
- AWS S3
- Cloudinary
- Google Cloud Storage

**Option 2: Use Vercel Blob Storage**
```bash
npm install @vercel/blob
```

---

## 📝 Environment Variables Checklist

Make sure these are set in Vercel:

- ✅ `MONGODB_URI`
- ✅ `PORT`
- ✅ `NODE_ENV`

---

## 🌐 Custom Domain (Optional)

1. Go to your Vercel project
2. Settings → Domains
3. Add your custom domain
4. Follow DNS configuration instructions

---

## 🐛 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node version compatibility

### API Not Working
- Check CORS configuration
- Verify environment variables are set
- Check API routes in `vercel.json`

### Database Connection Issues
- Verify MongoDB Atlas IP whitelist
- Check connection string format
- Ensure database user has correct permissions

### Image Upload Issues
- Implement cloud storage solution
- Vercel filesystem is read-only in production

---

## 📊 Post-Deployment

After successful deployment:

1. **Test all features:**
   - Domain selection
   - Image upload
   - PPE detection
   - Dashboard statistics

2. **Monitor:**
   - Check Vercel Analytics
   - Monitor MongoDB Atlas metrics
   - Review error logs

3. **Optimize:**
   - Enable caching
   - Optimize images
   - Minify assets

---

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Vercel CLI](https://vercel.com/docs/cli)

---

## 📞 Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review MongoDB Atlas logs
3. Check browser console for errors
4. Verify all environment variables

---

**Your app will be live at:** `https://your-app-name.vercel.app`

Good luck with your deployment! 🚀
