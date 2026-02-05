# Render Deployment Guide for SentinelAI Backend

## Overview
This guide will help you deploy your SentinelAI backend on Render with the correct configuration.

## Prerequisites
- [x] MongoDB database (local or cloud-based like MongoDB Atlas)
- [x] Render account
- [x] GitHub repository connected to Render

## Step 1: Prepare Environment Variables

### Required Environment Variables
Set these in your Render dashboard under **Environment Variables**:

```bash
# Basic Configuration
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secret-jwt-key-here
MONGO_URI=your-mongodb-connection-string

# Frontend Integration
FRONTEND_URL=https://your-vercel-app.vercel.app
CORS_ORIGIN=https://your-vercel-app.vercel.app

# Optional AI Features
OPENAI_API_KEY=your-openai-api-key-here
```

### Optional Security Features
```bash
# IP Threat Intelligence
ABUSE_IPDB_KEY=your-abuseipdb-api-key-here
IPQUALITYSCORE_KEY=your-ipqualityscore-api-key-here

# Email & URL Security
EMAIL_SCANNER_API_KEY=your-email-scanner-api-key-here
URL_SCANNER_API_KEY=your-url-scanner-api-key-here

# Deepfake Detection
DEEPFAKE_API_KEY=your-deepfake-api-key-here
```

## Step 2: Create Render Service

### Option A: Using render.yaml (Recommended)
Your `backend/render.yaml` is already configured. Render will automatically detect and use this file.

### Option B: Manual Setup
1. Go to Render Dashboard
2. Click **New +** → **Web Service**
3. Connect your GitHub repository: `optimusprimeleader345/sentinel-ai`
4. Configure settings:
   - **Service Name**: `sentinelai-backend`
   - **Root Directory**: `backend`
   - **Runtime**: Node.js
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## Step 3: Configure Environment Variables in Render

In your Render service settings:

1. Go to **Environment** → **Environment Variables**
2. Add the required variables listed above
3. For sensitive data (like JWT_SECRET), use **Generate Value** option
4. For external API keys, set **Sync** to **false** (manual entry required)

## Step 4: Database Setup

### Option A: MongoDB Atlas (Recommended for Production)
1. Create a free MongoDB Atlas cluster
2. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/sentinelai?retryWrites=true&w=majority`
3. Set `MONGO_URI` environment variable in Render

### Option B: Render Database (Alternative)
1. In Render Dashboard, create a new **PostgreSQL** or **MongoDB** database
2. Use the connection string provided by Render
3. Set `MONGO_URI` environment variable

## Step 5: Deploy

1. Go to **Deploys** section in your Render service
2. Click **Deploy Latest Commit**
3. Monitor the deployment logs for any errors

## Step 6: Verify Deployment

Once deployed:

1. Check the service status in Render Dashboard
2. Visit your backend URL (e.g., `https://sentinelai-backend.onrender.com`)
3. Test basic endpoints:
   - `GET /api/health` - Health check
   - `GET /api/auth/test` - Authentication test

## Step 7: Connect Frontend to Backend

Update your frontend environment variables:

```bash
# In your Vercel frontend deployment
VITE_API_URL=https://sentinelai-backend.onrender.com
```

## Troubleshooting

### Common Issues

1. **Deployment Fails**
   - Check environment variables are set correctly
   - Verify MongoDB connection string
   - Check deployment logs in Render

2. **Database Connection Errors**
   - Ensure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
   - Verify database credentials
   - Check if database is running

3. **CORS Errors**
   - Ensure `FRONTEND_URL` and `CORS_ORIGIN` match your Vercel app URL
   - Check if frontend is using HTTPS

4. **JWT Authentication Issues**
   - Verify `JWT_SECRET` is set and consistent
   - Check token expiration settings

### Health Check Endpoints

Test these endpoints after deployment:

```bash
# Health check
curl https://sentinelai-backend.onrender.com/api/health

# Database connection
curl https://sentinelai-backend.onrender.com/api/auth/test

# API status
curl https://sentinelai-backend.onrender.com/api/status
```

## Security Best Practices

1. **Use Strong Secrets**
   - Generate cryptographically secure JWT secrets
   - Use environment-specific secrets

2. **Enable HTTPS**
   - Render automatically provides HTTPS
   - Ensure frontend uses HTTPS URLs

3. **Monitor Logs**
   - Check Render logs regularly
   - Set up alerting for critical errors

4. **Database Security**
   - Use strong database passwords
   - Enable database authentication
   - Restrict IP access where possible

## Performance Optimization

1. **Enable Caching**
   - Use Redis for session storage
   - Implement API response caching

2. **Monitor Resource Usage**
   - Check CPU and memory usage in Render
   - Scale resources as needed

3. **Optimize Database Queries**
   - Use indexes for frequently queried fields
   - Implement query optimization

## Support

If you encounter issues:

1. Check the deployment logs in Render Dashboard
2. Verify all environment variables are set
3. Test database connectivity
4. Review the application logs for specific error messages

## Next Steps

After successful deployment:

1. Update your frontend to point to the new backend URL
2. Test all API endpoints
3. Set up monitoring and alerting
4. Consider implementing CI/CD for automated deployments

## Contact

For additional support:
- Check the Render documentation: https://render.com/docs
- Review the SentinelAI backend documentation
- Monitor deployment logs for specific error messages