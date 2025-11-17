# SentinelAI - Cyber Threat Intelligence Dashboard

A comprehensive cybersecurity dashboard with AI-powered threat detection, analysis, and protection features.

## 🚀 Quick Start

### Frontend Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs on: `http://localhost:5174`

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see backend/.env.example)
# Then start the server
npm run dev
```

Backend runs on: `http://localhost:5000`

## 📁 Project Structure

```
sentinel-ai/
├── backend/              # Express.js backend API
│   ├── config/           # Database configuration
│   ├── controllers/     # Route controllers
│   ├── middleware/      # Auth & other middleware
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── utils/           # Utility functions
│   └── server.js        # Server entry point
├── src/                 # React frontend
│   ├── components/     # React components
│   ├── layouts/        # Layout components
│   ├── lib/           # API client & utilities
│   ├── pages/         # Page components
│   └── data/          # Mock data
└── package.json
```

## ✨ Features

### Frontend
- 🎨 Modern, dark-themed UI with neon gradients
- 📊 Real-time dashboard with KPIs
- 🤖 AI-powered threat analysis
- 🔍 URL & Email scanning
- 🎭 Deepfake detection
- 🔐 Secure password vault
- 📈 Threat intelligence feed
- 🌐 Dark web monitoring
- 📚 Cybersecurity education
- 🎫 Support ticket system

### Backend
- 🔐 JWT Authentication
- 🗄️ MongoDB integration (optional)
- 🤖 OpenAI integration (optional)
- 🔒 AES-256 encryption for vault
- 📁 File upload support
- 📝 Comprehensive API endpoints
- 🛡️ Error handling & validation

## 🔧 Configuration

### Backend Environment Variables

Create `backend/.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/sentinelai
JWT_SECRET=your_secret_key
OPENAI_API_KEY=your_openai_key
FRONTEND_URL=http://localhost:5174
```

### Frontend Environment Variables

Create `.env` in root (optional):

```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Documentation

See `backend/README.md` for complete API documentation.

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Framer Motion
- Recharts
- Axios
- Lucide React

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- Bcrypt
- OpenAI API
- Multer

## 📝 Notes

- Backend works **without MongoDB** (uses mocked data)
- OpenAI API is **optional** (mock responses provided)
- All features are functional with mock data
- Authentication is optional for most routes

## 🐛 Troubleshooting

### Blank Screen
- Check browser console for errors
- Verify backend is running on port 5000
- Check CORS settings in backend

### API Errors
- Ensure backend server is running
- Check API URL in frontend `.env`
- Verify CORS configuration

### MongoDB Connection
- MongoDB is optional - backend works without it
- If using MongoDB, ensure it's running
- Check `MONGO_URI` in `.env`

## 📄 License

MIT

