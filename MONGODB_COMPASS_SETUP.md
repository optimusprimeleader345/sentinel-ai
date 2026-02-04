# 🔍 MongoDB Compass Connection Guide

## How to Connect MongoDB Compass to Your Database

### Step 1: Download MongoDB Compass
1. Go to: https://www.mongodb.com/products/compass
2. Download MongoDB Compass (free)
3. Install it on your Windows PC

### Step 2: Connect to Your Database

1. **Open MongoDB Compass**

2. **Connection String:**
   ```
   mongodb://localhost:27017
   ```
   
   Or use the full connection string:
   ```
   mongodb://localhost:27017/sentinelai
   ```

3. **Click "Connect"**

4. **Select Database:**
   - In the left sidebar, click on **"sentinelai"** database
   - You'll see all your collections:
     - `users` - 5 users
     - `organizations` - 3 organizations
     - `threats` - 4 threats
     - `incidents` - 3 incidents
     - `scans` - 3 scans
     - `conversations` - 1 conversation

### Step 3: Browse Your Data

1. **Click on any collection** (e.g., `users`)
2. **View documents** - You'll see all the mock data
3. **Filter/Search** - Use the filter bar at the top
4. **Edit documents** - Click on any document to edit

### Quick Connection Steps:
```
1. Open MongoDB Compass
2. Paste: mongodb://localhost:27017
3. Click "Connect"
4. Click "sentinelai" database
5. Browse collections!
```

---

## 📊 What Data You Have Now

### Users (5):
- **admin@acme.com** / Admin123! (Super Admin)
- **analyst@acme.com** / Analyst123! (Analyst)
- **manager@techstart.io** / Manager123! (Manager)
- **user@techstart.io** / User123! (User)
- **security@globalsec.com** / Security123! (Admin)

### Organizations (3):
- Acme Corporation (Enterprise plan)
- TechStart Inc (Professional plan)
- Global Security Solutions (Starter plan)

### Threats (4):
- Malware threat (High severity)
- Phishing campaign (Medium severity)
- DDoS attack (Critical severity)
- Data breach (Critical severity)

### Incidents (3):
- INC-001: Malware incident
- INC-002: Phishing incident
- INC-003: DDoS incident

### Scans (3):
- Weekly Vulnerability Scan (completed)
- Network Port Scan (running)
- Web Application Security Scan (completed)

---

## 🔄 Re-seed Database

If you want to reset and add fresh mock data:

```powershell
cd "C:\Users\ROHIT\OneDrive\Desktop\sentinel ai\backend"
node seed-db.js
```

This will:
- Clear all existing data
- Add fresh mock data
- Show you all the created records

---

## ✅ You're All Set!

Your MongoDB database now has:
- ✅ Mock data for testing
- ✅ Multiple users with different roles
- ✅ Organizations with subscriptions
- ✅ Security threats and incidents
- ✅ Scan records

You can now:
- View data in MongoDB Compass
- Test your API endpoints
- Develop your frontend with real data
