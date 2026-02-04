# 🚀 Deployment Instructions - Vercel

## Frontend Deployment (Vercel)

Your frontend is ready to deploy to Vercel. Follow these steps:

### Option 1: Deploy via Vercel CLI (Recommended)

```powershell
# 1. Login to Vercel
vercel login

# 2. Deploy (from project root)
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
vercel

# 3. Set environment variable (after first deploy)
vercel env add VITE_API_URL production
# Enter your backend URL when prompted (e.g., https://your-backend.onrender.com/api)

# 4. Deploy to production
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard

1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "Add New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Add Environment Variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com/api` (you'll get this after deploying backend)
7. Click "Deploy"

---

## Backend Deployment (Render/Railway)

Since Vercel is optimized for frontend, deploy your backend to **Render** or **Railway**:

### Option A: Render (Recommended)

1. Go to https://render.com
2. Sign up/Login
3. Click "New" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `sentinelai-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=<generate-random-32-char-string>
   MONGO_URI=<your-mongodb-atlas-uri>
   FRONTEND_URL=https://your-vercel-app.vercel.app
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
7. Click "Create Web Service"
8. Wait for deployment (5-10 minutes)
9. Copy your backend URL (e.g., `https://sentinelai-backend.onrender.com`)

### Option B: Railway

1. Go to https://railway.app
2. Sign up/Login with GitHub
3. Click "New Project" → "Deploy from GitHub"
4. Select your repository
5. Add Service → Select `backend` folder
6. Add Environment Variables (same as Render)
7. Deploy automatically starts

---

## After Deployment

1. **Update Frontend Environment Variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `VITE_API_URL` with your backend URL: `https://your-backend.onrender.com/api`

2. **Update Backend CORS:**
   - Go to Render/Railway Dashboard
   - Update `FRONTEND_URL` and `CORS_ORIGIN` with your Vercel URL

3. **Redeploy Both:**
   - Frontend: Vercel auto-redeploys when you update env vars
   - Backend: Trigger redeploy in Render/Railway

---

## Quick Deploy Commands

```powershell
# Frontend to Vercel
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
vercel login
vercel --prod
```

---

## MongoDB Atlas Setup (Optional but Recommended)

For production, use MongoDB Atlas (free tier available):

1. Go to https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Add to backend environment variables as `MONGO_URI`

---

## Your Deployment URLs

After deployment, you'll have:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com` (or railway.app)
