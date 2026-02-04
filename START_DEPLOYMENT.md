# 🚀 START DEPLOYMENT - Follow These Steps

## ⚡ **Deploy to Vercel in 5 Minutes**

I've prepared everything for you. Just follow these steps:

---

## **STEP 1: Login to Vercel** (30 seconds)

Open PowerShell and run:

```powershell
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
vercel login
```

**What happens:**
- Browser opens automatically
- Login to Vercel (or sign up - it's free)
- Authorize the CLI
- You're done!

---

## **STEP 2: Deploy Frontend** (2 minutes)

After login, run:

```powershell
vercel --prod
```

**What happens:**
- Vercel uploads your built frontend
- Deploys it to a URL like: `https://sentinel-ai-dashboard-xyz.vercel.app`
- You'll see the URL in the terminal
- **Copy this URL!** You'll need it for backend

---

## **STEP 3: Deploy Backend to Render** (5 minutes)

Your backend needs to be on Render (better for Node.js than Vercel):

### **Quick Steps:**

1. **Go to:** https://render.com
2. **Sign up** (free) - Use GitHub login
3. **Click:** "New" → "Web Service"
4. **Connect GitHub** → Select your repository
5. **Configure:**
   ```
   Name: sentinelai-backend
   Root Directory: backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```
6. **Add Environment Variables:**
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=your-random-secret-here-min-32-chars
   MONGO_URI=mongodb://localhost:27017/sentinelai
   FRONTEND_URL=https://your-vercel-url.vercel.app
   CORS_ORIGIN=https://your-vercel-url.vercel.app
   ```
   *(Replace `your-vercel-url` with the URL from Step 2)*

7. **Click:** "Create Web Service"
8. **Wait 5-10 minutes** for deployment
9. **Copy backend URL** (e.g., `https://sentinelai-backend.onrender.com`)

---

## **STEP 4: Connect Frontend to Backend** (1 minute)

1. **Go to:** https://vercel.com/dashboard
2. **Click** your project
3. **Settings** → **Environment Variables**
4. **Add:**
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.onrender.com/api`
   - Environments: Production, Preview, Development
5. **Save**
6. **Redeploy** (Vercel auto-redeploys when you save env vars)

---

## **STEP 5: Update Backend CORS** (1 minute)

1. **Go to:** Render Dashboard
2. **Click** your backend service
3. **Environment** tab
4. **Update:**
   - `FRONTEND_URL` = your Vercel URL
   - `CORS_ORIGIN` = your Vercel URL
5. **Save** (auto-redeploys)

---

## ✅ **DONE!**

Your app is now live:
- **Frontend:** `https://your-app.vercel.app`
- **Backend:** `https://your-backend.onrender.com`

---

## 🆘 **Need Help?**

### **Vercel Login Issues:**
```powershell
vercel logout
vercel login
```

### **Build Errors:**
- Make sure `npm run build` works locally first
- Fix any errors shown

### **Backend Not Connecting:**
- Check `VITE_API_URL` in Vercel matches your backend URL
- Check backend CORS allows your Vercel domain
- Check backend is running (visit `/api/health`)

---

## 📝 **Quick Command Reference**

```powershell
# 1. Login
vercel login

# 2. Deploy frontend
vercel --prod

# 3. Check status
vercel ls

# 4. View logs
vercel logs
```

---

## 🎯 **Start Here:**

**Just run these 2 commands:**

```powershell
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai"
vercel login
vercel --prod
```

That's it! 🚀
