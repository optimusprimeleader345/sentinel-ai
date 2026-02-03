# Environment Variables Setup

## Required Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```bash
# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5174

# Database
MONGO_URI=mongodb://localhost:27017/sentinelai
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/sentinelai?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_minimum_32_characters
JWT_EXPIRE=7d

# AI Services
OPENAI_API_KEY=your_openai_api_key_here
# Get your key from: https://platform.openai.com/api-keys

# Threat Intelligence APIs
# HaveIBeenPwned API (Free tier available)
HIBP_API_KEY=your_hibp_api_key_here
# Get your key from: https://haveibeenpwned.com/API/Key

# AlienVault OTX (Free, but API key recommended)
ALIENVAULT_API_KEY=your_alienvault_api_key_here
OTX_API_KEY=your_otx_api_key_here
# Get your key from: https://otx.alienvault.com/api

# AbuseIPDB (Free tier: 1,000 requests/day)
ABUSEIPDB_API_KEY=your_abuseipdb_api_key_here
# Get your key from: https://www.abuseipdb.com/pricing

# VirusTotal (Free tier: 4 requests/minute)
VIRUSTOTAL_API_KEY=your_virustotal_api_key_here
# Get your key from: https://www.virustotal.com/gui/join-us

# Shodan (Paid service)
SHODAN_API_KEY=your_shodan_api_key_here
# Get your key from: https://account.shodan.io/

# MISP (Optional - if you have a MISP instance)
MISP_API_KEY=your_misp_api_key_here
MISP_URL=https://your-misp-instance.com

# CORS Configuration
CORS_ORIGIN=http://localhost:5174
```

## Important Notes

1. **The backend works without these API keys** - it will use mock data as fallback
2. **For production, configure at least:**
   - `OPENAI_API_KEY` (for AI features)
   - `HIBP_API_KEY` (for dark web monitoring)
   - `MONGO_URI` (for data persistence)
   - `JWT_SECRET` (for authentication - use a strong random string)

3. **Generate a secure JWT_SECRET:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. **API Key Priorities:**
   - **Essential**: `OPENAI_API_KEY`, `HIBP_API_KEY`, `MONGO_URI`
   - **Recommended**: `ABUSEIPDB_API_KEY`, `VIRUSTOTAL_API_KEY`
   - **Optional**: `SHODAN_API_KEY`, `ALIENVAULT_API_KEY`, `MISP_API_KEY`

## Quick Start

1. Copy this template to `backend/.env`
2. Fill in at least the essential API keys
3. Restart the backend server

The system will automatically fall back to mock data for any missing API keys.
