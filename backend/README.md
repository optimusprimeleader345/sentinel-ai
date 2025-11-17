# SentinelAI Backend API

Backend server for the SentinelAI Cyber Defense Platform.

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sentinelai
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
FRONTEND_URL=http://localhost:5174
```

**Note:** The backend works without MongoDB. If MongoDB is not available, it will use mocked data automatically.

### 3. Run the Server

**Development mode:**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)

### AI Services
- `POST /api/ai/analyze` - Analyze logs/text with AI
- `POST /api/ai/bot` - Chat with AI Defense Bot
- `POST /api/ai/actions/simulate` - Simulate AI actions

### Threats
- `GET /api/threats` - Get all threats
- `GET /api/threats/global` - Get global threat intelligence
- `POST /api/threats` - Create threat
- `PUT /api/threats/:id` - Update threat
- `DELETE /api/threats/:id` - Delete threat

### System
- `GET /api/system/health` - Get system health metrics

### Scans
- `POST /api/scan/url` - Scan URL
- `POST /api/scan/email` - Scan email
- `GET /api/scan/history` - Get scan history

### Logs
- `GET /api/logs` - Get system logs
- `POST /api/logs` - Create log entry

### Deepfake Detection
- `POST /api/deepfake/analyze` - Analyze image/video for deepfakes

### Vault (Password Manager)
- `POST /api/vault/add` - Add vault item (protected)
- `GET /api/vault/all` - Get all vault items (protected)
- `DELETE /api/vault/:id` - Delete vault item (protected)
- `PUT /api/vault/:id` - Update vault item (protected)

### Threat Intelligence
- `GET /api/intel/feed` - Get threat intelligence feed
- `GET /api/intel/summary` - Get intel summary
- `GET /api/intel/malware-trends` - Get malware trends
- `GET /api/intel/techniques` - Get attack techniques

### Dark Web Monitor
- `GET /api/darkweb/check?email=` - Check email in breaches
- `GET /api/darkweb/breaches` - Get all breaches

### Education
- `GET /api/education/courses` - Get courses
- `GET /api/education/tips` - Get daily tip
- `POST /api/education/quiz` - Submit quiz

### Support
- `POST /api/support/ticket` - Create support ticket (protected)
- `GET /api/support/ticket` - Get user tickets (protected)
- `GET /api/support/faq` - Get FAQ
- `POST /api/support/ai` - Get AI support

### Security Score
- `GET /api/security/score` - Get security score

### AI Guardian
- `GET /api/guardian/report` - Get guardian report

## Features

- ✅ JWT Authentication
- ✅ Password Encryption (bcrypt)
- ✅ Vault Encryption (AES-256)
- ✅ File Upload (Multer)
- ✅ OpenAI Integration (optional)
- ✅ MongoDB Integration (optional - works without DB)
- ✅ Mock Data Fallback
- ✅ CORS Enabled
- ✅ Error Handling
- ✅ Request Logging (Morgan)

## Notes

- The backend works **without MongoDB** - it will use mocked data
- OpenAI API is **optional** - mock responses are provided
- All routes support optional authentication (works with or without token)
- Protected routes require valid JWT token in Authorization header

