# SentinelAI - Complete Setup Guide

## ✅ Backend Setup Complete

All backend files have been created:
- ✅ 8 Models (User, Threat, Scan, Log, SystemHealth, VaultItem, EducationCourse, Ticket)
- ✅ 14 Controllers (auth, ai, threat, system, scan, log, deepfake, vault, intel, darkweb, education, support, security, guardian)
- ✅ 14 Route files
- ✅ Middleware (auth, optionalAuth)
- ✅ Utilities (encryption)
- ✅ Server configuration
- ✅ Dependencies installed

## 🚀 Running the Application

### Step 1: Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on: `http://localhost:5000`

**Note:** Backend works without MongoDB. If MongoDB is not available, it uses mocked data automatically.

### Step 2: Start Frontend

In a new terminal:

```bash
npm run dev
```

Frontend will run on: `http://localhost:5174`

## 📡 API Integration Example

The frontend API client is already set up in `src/lib/api.js`. Here's how to use it:

### Example: Fetching Threats

```javascript
import { threatAPI } from '../lib/api'

// In your component
const fetchThreats = async () => {
  try {
    const response = await threatAPI.getThreats()
    console.log(response.data)
  } catch (error) {
    console.error('Error fetching threats:', error)
  }
}
```

### Example: Scanning URL

```javascript
import { scanAPI } from '../lib/api'

const scanUrl = async (url) => {
  try {
    const response = await scanAPI.scanURL({ url })
    console.log('Scan result:', response.data)
  } catch (error) {
    console.error('Scan error:', error)
  }
}
```

### Example: Authentication

```javascript
import { authAPI } from '../lib/api'

// Login
const login = async (email, password) => {
  try {
    const response = await authAPI.login({ email, password })
    localStorage.setItem('token', response.data.token)
  } catch (error) {
    console.error('Login error:', error)
  }
}
```

## 🔑 Available API Endpoints

### Authentication
- `POST /api/auth/register` - Register
- `POST /api/auth/login` - Login
- `GET /api/auth/profile` - Get profile (protected)

### AI Services
- `POST /api/ai/analyze` - AI analysis
- `POST /api/ai/bot` - AI bot chat
- `POST /api/ai/actions/simulate` - Simulate actions

### Threats
- `GET /api/threats` - Get threats
- `GET /api/threats/global` - Global threat intel
- `POST /api/threats` - Create threat
- `PUT /api/threats/:id` - Update threat
- `DELETE /api/threats/:id` - Delete threat

### System
- `GET /api/system/health` - System health

### Scans
- `POST /api/scan/url` - Scan URL
- `POST /api/scan/email` - Scan email
- `GET /api/scan/history` - Scan history

### Logs
- `GET /api/logs` - Get logs
- `POST /api/logs` - Create log

### Deepfake
- `POST /api/deepfake/analyze` - Analyze file

### Vault
- `POST /api/vault/add` - Add item (protected)
- `GET /api/vault/all` - Get all (protected)
- `DELETE /api/vault/:id` - Delete (protected)
- `PUT /api/vault/:id` - Update (protected)

### Intel
- `GET /api/intel/feed` - Threat feed
- `GET /api/intel/summary` - Summary
- `GET /api/intel/malware-trends` - Trends
- `GET /api/intel/techniques` - Techniques

### Dark Web
- `GET /api/darkweb/check?email=` - Check email
- `GET /api/darkweb/breaches` - Get breaches

### Education
- `GET /api/education/courses` - Courses
- `GET /api/education/tips` - Tips
- `POST /api/education/quiz` - Submit quiz

### Support
- `POST /api/support/ticket` - Create ticket (protected)
- `GET /api/support/ticket` - Get tickets (protected)
- `GET /api/support/faq` - FAQ
- `POST /api/support/ai` - AI support

### Security
- `GET /api/security/score` - Security score

### Guardian
- `GET /api/guardian/report` - Guardian report

## 🔒 Authentication

Most endpoints work without authentication (optional auth). Protected endpoints require:

```javascript
// Token is automatically added by axios interceptor
// Just ensure token is in localStorage:
localStorage.setItem('token', 'your-jwt-token')
```

## 📝 Next Steps

1. **Update Frontend Pages**: Replace mock data with API calls
2. **Add Error Handling**: Implement proper error messages
3. **Add Loading States**: Show loading indicators during API calls
4. **Add Toast Notifications**: Use react-hot-toast for user feedback

## 🐛 Troubleshooting

### Backend won't start
- Check if port 5000 is available
- Verify all dependencies are installed: `cd backend && npm install`

### CORS errors
- Ensure `FRONTEND_URL` in backend `.env` matches frontend URL
- Default: `http://localhost:5174`

### API calls fail
- Verify backend is running on port 5000
- Check browser console for errors
- Verify API URL in `src/lib/api.js`

### MongoDB connection errors
- MongoDB is optional - backend works without it
- If using MongoDB, ensure it's running
- Check `MONGO_URI` in `.env`

## ✨ Features Status

✅ All backend endpoints implemented
✅ Mock data fallback for all endpoints
✅ Authentication system
✅ File upload support
✅ Encryption utilities
✅ Error handling
✅ CORS configured
✅ Frontend API client ready

## 📚 Documentation

- Backend API: See `backend/README.md`
- Frontend: See main `README.md`

