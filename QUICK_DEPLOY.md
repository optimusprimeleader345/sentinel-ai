# ⚡ Quick Deploy to Vercel - Step by Step

## 🎯 **Deploy Your Frontend in 5 Minutes**

### **Step 1: Login to Vercel** (First time only)

Open PowerShell and run:

```powershell
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
vercel login
```

This will:
- Open your browser
- Ask you to login/signup to Vercel
- Authorize the CLI

---

### **Step 2: Deploy Frontend**

After login, run:

```powershell
# Build and deploy
npm run build
vercel --prod
```

**OR** use the automated script:

```powershell
.\deploy.ps1
```

---

### **Step 3: Set Environment Variable**

After deployment, Vercel will give you a URL like:
`https://sentinel-ai-dashboard.vercel.app`

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com/api` (you'll get this after deploying backend)
   - **Environment**: Production, Preview, Development (select all)
5. Click **Save**
6. Redeploy (Vercel will auto-redeploy)

---

## 🔧 **Backend Deployment (Required)**

Your backend needs to be deployed separately. Choose one:

### **Option A: Render (Recommended - Free Tier)**

1. Go to https://render.com
2. Sign up (free)
3. **New** → **Web Service**
4. Connect GitHub → Select your repo
5. Configure:
   ```
   Name: sentinelai-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```
6. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=<generate-random-string>
   MONGO_URI=<your-mongodb-uri>
   FRONTEND_URL=https://your-vercel-app.vercel.app
   CORS_ORIGIN=https://your-vercel-app.vercel.app
   ```
7. Click **Create Web Service**
8. Wait 5-10 minutes for deployment
9. Copy your backend URL (e.g., `https://sentinelai-backend.onrender.com`)

### **Option B: Railway (Alternative)**

1. Go to https://railway.app
2. Sign up with GitHub
3. **New Project** → **Deploy from GitHub**
4. Select repository
5. Add Service → Select `backend` folder
6. Add same environment variables as Render
7. Deploy automatically starts

---

## 🔗 **Connect Frontend to Backend**

After backend is deployed:

1. **Get your backend URL** (e.g., `https://sentinelai-backend.onrender.com`)
2. **Update Vercel environment variable:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Update `VITE_API_URL` to: `https://sentinelai-backend.onrender.com/api`
3. **Update backend CORS:**
   - Go to Render/Railway Dashboard
   - Update `FRONTEND_URL` and `CORS_ORIGIN` to your Vercel URL
4. **Redeploy both** (usually auto-redeploys)

---

## ✅ **You're Done!**

Your app will be live at:
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`

---

## 🆘 **Troubleshooting**

### **Build Fails:**
- Check `npm run build` works locally
- Fix any errors shown

### **Vercel Login Issues:**
- Try: `vercel logout` then `vercel login` again
- Or use GitHub OAuth in browser

### **Backend Not Connecting:**
- Check `VITE_API_URL` is set correctly in Vercel
- Check backend CORS allows your Vercel domain
- Check backend is running (visit backend URL/health)

---

## 📝 **Quick Commands Reference**

```powershell
# Login to Vercel
vercel login

# Deploy frontend
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
npm run build
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs
```
