# SentinelAI Deployment Guide

> Complete deployment instructions for production-ready SentinelAI platform

## Overview

SentinelAI supports multiple deployment strategies for both development and production environments. This guide covers frontend deployment on Vercel and backend deployment on various cloud platforms with PM2 for process management.

## Deployment Prerequisites

### System Requirements
- **Frontend**: Node.js 18.x, npm/yarn
- **Backend**: Node.js 18.x, MongoDB (optional), PM2
- **Domain**: Custom domain with SSL certificate (recommended)
- **SSL**: HTTPS enforcement for production

### Service Accounts
- **Vercel Account**: Frontend deployment
- **MongoDB Atlas**: Production database (optional)
- **OpenAI API**: AI functionality (optional)
- **Cloud Provider**: Render, Railway, or VPS for backend

## Frontend Deployment (Vercel)

### Automated Vercel Deployment

#### Method 1: Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   vercel login
   ```

2. **Deploy from Project Root**
   ```bash
   cd /path/to/sentinel-ai

   # Initial deployment
   vercel --prod

   # Follow the interactive prompts:
   # - Link to existing project or create new
   # - Set project name: sentinelai-frontend
   # - Configure build settings automatically
   ```

3. **Vercel Configuration**
   Create `vercel.json` in project root:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "functions": {
       "src/pages/api/*.js": {
         "runtime": "nodejs18.x"
       }
     },
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/api/$1"
       },
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ],
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

#### Method 2: GitHub Integration (CI/CD)

1. **Connect GitHub Repository**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Connect your GitHub account
   - Select the sentinel-ai repository

2. **Configure Build Settings**
   ```
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   Node Version: 18.x
   ```

3. **Environment Variables**
   Set in Vercel dashboard or via CLI:
   ```bash
   vercel env add VITE_API_URL
   vercel env add VITE_APP_TITLE
   vercel env add VITE_APP_VERSION
   ```

### Manual Frontend Build

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with production values

# Build for production
npm run build

# Preview build locally
npm run preview
```

### Vercel Environment Configuration

#### Production Environment Variables
```bash
# Set via Vercel CLI or dashboard
vercel env add VITE_API_URL production
# Value: https://your-backend-api.com

vercel env add VITE_APP_TITLE production
# Value: SentinelAI Dashboard

vercel env add VITE_APP_VERSION production
# Value: 1.0.0
```

#### Custom Domain Setup
```bash
# Add custom domain to Vercel
vercel domains add sentinelai.yourdomain.com

# Configure DNS (add CNAME record pointing to cname.vercel-dns.com)

# Enable SSL (automatic with Vercel)
```

## Backend Deployment

### Option 1: Render.com Deployment

#### Step 1: Prepare Backend for Render

1. **Create `render.yaml` Configuration**
   ```yaml
   services:
     - type: web
       name: sentinelai-backend
       runtime: node
       buildCommand: npm install
       startCommand: npm run start
       envVars:
         - key: NODE_ENV
           value: production
         - key: PORT
           value: 10000
         - key: JWT_SECRET
           generateValue: true
         - key: MONGO_URI
           sync: false
         - key: OPENAI_API_KEY
           sync: false
   ```

2. **Update package.json Scripts**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "dev": "node --watch server.js"
     }
   }
   ```

#### Step 2: Deploy to Render

1. **Connect Repository**
   - Go to [render.com](https://render.com)
   - Create new Web Service
   - Connect GitHub repository
   - Select sentinel-ai/backend directory

2. **Configure Service**
   ```
   Name: sentinelai-backend
   Runtime: Node
   Build Command: npm install
   Start Command: npm start
   Instance Type: Starter (Free) or Standard
   ```

3. **Environment Variables**
   ```
   NODE_ENV=production
   PORT=10000
   JWT_SECRET=<generate-secure-random-string>
   MONGO_URI=<your-mongodb-atlas-connection-string>
   OPENAI_API_KEY=<your-openai-key>
   FRONTEND_URL=https://your-vercel-domain.com
   CORS_ORIGIN=https://your-vercel-domain.com
   ```

4. **Deploy**
   - Render will build and deploy automatically
   - Check logs for any errors
   - Get the service URL (e.g., `https://sentinelai-backend.onrender.com`)

### Option 2: Railway.app Deployment

#### Railway CLI Deployment

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   railway login
   ```

2. **Deploy Backend**
   ```bash
   cd backend

   # Initialize Railway project
   railway init

   # Set environment variables
   railway variables set NODE_ENV=production
   railway variables set PORT=3000
   railway variables set JWT_SECRET=your-secure-secret
   railway variables set MONGO_URI=your-mongodb-uri
   railway variables set OPENAI_API_KEY=your-openai-key

   # Deploy
   railway deploy
   ```

3. **Connect to Frontend**
   - Get Railway service URL
   - Set `VITE_API_URL` in Vercel to Railway URL

#### Railway Dashboard Deployment

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub
   - Select repository and backend directory

2. **Configure Environment**
   - Add environment variables in dashboard
   - Configure build and start commands

### Option 3: Local Server with PM2

#### Production Setup with PM2

1. **Install PM2 Globally**
   ```bash
   npm install -g pm2
   ```

2. **Configure Production Environment**
   ```bash
   cd backend

   # Create production environment file
   cp .env.example .env.production
   nano .env.production  # Edit with production values
   ```

3. **PM2 Ecosystem Configuration**
   Create `ecosystem.config.js`:
   ```javascript
   module.exports = {
     apps: [
       {
         name: 'sentinelai-backend',
         script: 'server.js',
         instances: 'max',
         exec_mode: 'cluster',
         env: {
           NODE_ENV: 'production',
           PORT: 5000
         },
         env_production: {
           NODE_ENV: 'production',
           PORT: 5000
         },
         error_file: './logs/err.log',
         out_file: './logs/out.log',
         log_file: './logs/combined.log',
         time: true
       }
     ]
   }
   ```

4. **Start Production Server**
   ```bash
   # Install production dependencies only
   npm ci --only=production

   # Start with PM2
   pm2 start ecosystem.config.js --env production

   # Save PM2 configuration
   pm2 save

   # Set up auto-start on server boot
   pm2 startup
   ```

5. **NGINX Reverse Proxy (Recommended)**
   Create `/etc/nginx/sites-available/sentinelai-backend`:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

### Option 4: Docker Deployment

#### Docker Configuration

1. **Create Dockerfile (Backend)**
   ```dockerfile
   FROM node:18-alpine

   WORKDIR /app

   # Copy package files
   COPY package*.json ./

   # Install production dependencies only
   RUN npm ci --only=production

   # Copy source code
   COPY . .

   # Create non-root user
   RUN addgroup -g 1001 -S nodejs
   RUN adduser -S sentinelai -u 1001

   # Change ownership
   RUN chown -R sentinelai:nodejs /app

   USER sentinelai

   EXPOSE 5000

   CMD ["npm", "start"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'

   services:
     sentinelai-backend:
       build: .
       ports:
         - "5000:5000"
       environment:
         - NODE_ENV=production
         - PORT=5000
         - JWT_SECRET=your-secret
         - MONGO_URI=your-mongo-uri
       volumes:
         - ./logs:/app/logs
       restart: unless-stopped

     mongodb:
       image: mongo:6
       ports:
         - "27017:27017"
       volumes:
         - mongodb_data:/data/db
       restart: unless-stopped

   volumes:
     mongodb_data:
   ```

3. **Deploy with Docker**
   ```bash
   # Build and run
   docker-compose up -d --build

   # View logs
   docker-compose logs -f
   ```

## Environment Variables Reference

### Frontend Environment Variables (.env)

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | `https://api.sentinelai.com` | Yes |
| `VITE_APP_TITLE` | Application title | `SentinelAI Dashboard` | No |
| `VITE_APP_VERSION` | Application version | `1.0.0` | No |

### Backend Environment Variables

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | `production` | Yes |
| `PORT` | Server port | `5000` | Yes |
| `JWT_SECRET` | JWT signing secret | `your-256-bit-secret` | Yes |
| `JWT_EXPIRE` | JWT expiration time | `7d` | No |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/db` | No |
| `OPENAI_API_KEY` | OpenAI API key | `sk-...` | No |
| `FRONTEND_URL` | Frontend application URL | `https://sentinelai.com` | Yes |
| `CORS_ORIGIN` | CORS allowed origins | `https://sentinelai.com` | Yes |

## SSL/TLS Configuration

### Production HTTPS Setup

#### Vercel (Automatic)
- SSL certificates are automatically provisioned by Vercel
- Custom domains get Let's Encrypt certificates
- No additional configuration required

#### Backend SSL (NGINX)

1. **Obtain SSL Certificate**
   ```bash
   # Using Let's Encrypt with Certbot
   sudo apt install certbot
   sudo certbot --nginx -d yourdomain.com
   ```

2. **SSL-Enabled NGINX Config**
   ```nginx
   server {
       listen 443 ssl http2;
       server_name yourdomain.com;

       ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
       ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

       ssl_protocols TLSv1.2 TLSv1.3;
       ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
       ssl_prefer_server_ciphers off;

       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }

   server {
       listen 80;
       server_name yourdomain.com;
       return 301 https://$server_name$request_uri;
   }
   ```

## Database Setup

### MongoDB Atlas (Cloud)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/atlas](https://mongodb.com/atlas)
   - Create free/ paid cluster

2. **Whitelist IP Addresses**
   - Add your server IPs and development IPs
   - For local development: `0.0.0.0/0` (less secure)

3. **Create Database User**
   - Go to Database Access
   - Create user with read/write permissions

4. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

### Local MongoDB Setup

```bash
# Install MongoDB
sudo apt install mongodb

# Start MongoDB service
sudo systemctl start mongodb

# Enable auto-start
sudo systemctl enable mongodb

# Create database
mongo
> use sentinelai
> db.createUser({user: "sentinelai", pwd: "password", roles: ["readWrite"]})
```

## Monitoring & Maintenance

### PM2 Monitoring

```bash
# Monitor processes
pm2 monit

# View logs
pm2 logs sentinelai-backend

# Restart service
pm2 restart sentinelai-backend

# Check status
pm2 status
```

### Log Management

```bash
# Log rotation (optional)
pm2 install pm2-logrotate

# Configure log rotation
pm2 set pm2-logrotate:max_size 10M
pm2 set pm2-logrotate:retain 7
```

### Health Checks

Backend includes built-in health check endpoint:
```bash
curl https://your-api-domain.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "SentinelAI Backend API is running",
  "timestamp": "2025-11-18T11:00:00.000Z"
}
```

## Backup & Recovery

### Database Backup

```bash
# MongoDB backup
mongodump --db sentinelai --out /path/to/backup

# MongoDB restore
mongorestore --db sentinelai /path/to/backup/sentinelai
```

### Application Backup

```bash
# Backup environment and configuration
tar -czf sentinelai-backup.tar.gz \
  backend/.env.production \
  ecosystem.config.js \
  /etc/nginx/sites-available/sentinelai-backend
```

## Troubleshooting

### Common Deployment Issues

**Port Conflicts**
```bash
# Check what's using port 5000
sudo lsof -i :5000
sudo netstat -tulpn | grep :5000

# Kill process if needed
sudo kill -9 <PID>
```

**Memory Issues**
```bash
# Check memory usage
pm2 monit
free -h

# Adjust PM2 configuration for lower memory usage
# In ecosystem.config.js:
# max_memory_restart: '300M'
```

**Database Connection Issues**
```bash
# Test MongoDB connection
mongosh "your-connection-string"

# Check MongoDB logs
tail -f /var/log/mongodb/mongod.log
```

**SSL Certificate Issues**
```bash
# Test SSL configuration
openssl s_client -connect yourdomain.com:443 -servername yourdomain.com

# Renew Let's Encrypt certificates
sudo certbot renew
```

## Performance Optimization

### Frontend Optimization

1. **Enable Brotli Compression in Vercel**
   - Automatic with Vercel

2. **Image Optimization**
   - Use WebP format and lazy loading
   - Implement CDN caching

### Backend Optimization

1. **Enable Gzip Compression**
   ```javascript
   const compression = require('compression');
   app.use(compression());
   ```

2. **Database Indexing**
   ```javascript
   // Add indexes to frequently queried fields
   db.collection.createIndex({ "field": 1 });
   ```

3. **Caching Layer**
   ```bash
   # Install Redis (optional)
   npm install redis
   ```

## Security Checklist

### Pre-Deployment Checklist

- [ ] Environment variables set securely
- [ ] JWT secrets generated (256-bit minimum)
- [ ] Database credentials configured
- [ ] SSL certificates installed and valid
- [ ] Firewall rules configured
- [ ] API rate limiting enabled
- [ ] CORS properly configured
- [ ] Security headers applied

### Post-Deployment Checklist

- [ ] Health check endpoint responding
- [ ] Frontend loading correctly
- [ ] API endpoints accessible
- [ ] Database connections working
- [ ] SSL certificate valid
- [ ] Error logging functional
- [ ] Monitoring alerts configured

---

## Support & Maintenance

### Update Deployment

```bash
# Pull latest changes
git pull origin main

# Install dependencies
npm install

# Build frontend
npm run build

# Restart services
pm2 restart all

# Check status
pm2 status
```

### Emergency Rollback

```bash
# Quick rollback to previous version
git reset --hard HEAD~1
npm install
pm2 restart all
```

### Contact & Support

- **Documentation**: Check docs/ folder for detailed guides
- **GitHub Issues**: Report bugs and issues
- **Security Issues**: Responsible disclosure only (security@sentinelai.com)

---

**Deployment completed successfully!** 🎉

*Your SentinelAI platform is now ready for production use.*
