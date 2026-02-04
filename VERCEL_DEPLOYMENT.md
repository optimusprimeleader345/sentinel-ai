# 🚀 Vercel Deployment - Complete Guide

## ✅ **Your Frontend is Ready to Deploy!**

Build completed successfully! Now deploy to Vercel:

---

## **Quick Deploy (3 Steps)**

### **Step 1: Login to Vercel**

```powershell
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
vercel login
```

This will:
- Open your browser
- Ask you to login/signup to Vercel (free)
- Authorize the CLI

---

### **Step 2: Deploy**

After login, run:

```powershell
vercel --prod
```

**OR** use the automated script:

```powershell
.\deploy.ps1
```

---

### **Step 3: Set Environment Variable**

After deployment:

1. Vercel will give you a URL like: `https://sentinel-ai-dashboard.vercel.app`
2. Go to https://vercel.com/dashboard
3. Click your project → **Settings** → **Environment Variables**
4. Add:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.com/api` (after backend deployment)
   - **Environments**: Production, Preview, Development
5. **Save** and redeploy

---

## 🔧 **Backend Deployment (Required Next)**

Your backend needs to be on Render or Railway. See `DEPLOYMENT_INSTRUCTIONS.md` for details.

**Quick Backend Deploy to Render:**

1. Go to https://render.com
2. **New** → **Web Service**
3. Connect GitHub → Select repo
4. Configure:
   - Root Directory: `backend`
   - Build: `npm install`
   - Start: `npm start`
5. Add environment variables (see DEPLOYMENT_INSTRUCTIONS.md)
6. Deploy!

---

## ✅ **After Both Deployments**

1. **Get backend URL** (e.g., `https://sentinelai-backend.onrender.com`)
2. **Update Vercel** `VITE_API_URL` = `https://sentinelai-backend.onrender.com/api`
3. **Update backend** `FRONTEND_URL` and `CORS_ORIGIN` = your Vercel URL
4. **Done!** Your app is live! 🎉

---

## 📝 **Files Created for You**

- ✅ `vercel.json` - Frontend deployment config
- ✅ `.vercelignore` - Files to exclude
- ✅ `deploy.ps1` - Automated deployment script
- ✅ `QUICK_DEPLOY.md` - Step-by-step guide
- ✅ `DEPLOYMENT_INSTRUCTIONS.md` - Complete instructions

---

## 🎯 **Next Action**

**Run this command to deploy:**

```powershell
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
vercel login
vercel --prod
```

That's it! Your frontend will be live on Vercel! 🚀
