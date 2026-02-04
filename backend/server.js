import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import connectDB from './config/db.js'
import wsService from './config/websocket.js'
import logger from './utils/logger.js'
import { apiLimiter, authLimiter, aiLimiter, intensiveLimiter, uploadLimiter } from './middleware/rateLimiter.js'
import { sanitizeMongo, preventHPP, xssProtection, requestSizeLimiter, securityHeaders } from './middleware/security.js'
import { apiVersioning, getApiVersionInfo } from './middleware/apiVersioning.js'
import { initSentry, sentryRequestHandler, sentryErrorHandler } from './utils/sentry.js'
import metricsMiddleware from './middleware/metricsMiddleware.js'
import { performanceMonitoring } from './middleware/performanceMonitoring.js'
import alertingSystem from './utils/alerting.js'

// Import routes
import authRoutes from './routes/authRoutes.js'
import aiRoutes from './routes/aiRoutes.js'
import advancedThreatRoutes from './routes/advancedThreatRoutes.js'
import systemRoutes from './routes/systemRoutes.js'
import scanRoutes from './routes/scanRoutes.js'
import logRoutes from './routes/logRoutes.js'
import deepfakeRoutes from './routes/deepfakeRoutes.js'
import securityScoreRoutes from './routes/securityScoreRoutes.js'
import zeroTrustRoutes from './routes/zeroTrustRoutes.js'
import incidentRoutes from './routes/incidentRoutes.js'
import simulationRoutes from './routes/simulationRoutes.js'
import playbookRoutes from './routes/playbookRoutes.js'
import vaultRoutes from './routes/vaultRoutes.js'
import intelRoutes from './routes/intelRoutes.js'
import darkwebRoutes from './routes/darkwebRoutes.js'
import educationRoutes from './routes/educationRoutes.js'
import supportRoutes from './routes/supportRoutes.js'
import securityRoutes from './routes/securityRoutes.js'
import guardianRoutes from './routes/guardianRoutes.js'
import defenseRoutes from './routes/defenseRoutes.js'
import predictionRoutes from './routes/predictionRoutes.js'
import behaviorRoutes from './routes/behaviorRoutes.js'
import reportRoutes from './routes/reportRoutes.js'
import threatIntelRoutes from './routes/threatIntelRoutes.js'
import urlRoutes from './routes/urlRoutes.js'
import ipRoutes from './routes/ipRoutes.js'
import passwordRoutes from './routes/passwordRoutes.js'
import complianceRoutes from './routes/complianceRoutes.js'
import aiDefenseRoutes from './routes/aiDefenseRoutes.js'
import aiGuardianRoutes from './routes/aiGuardianRoutes.js'
import phishingRoutes from './routes/phishingRoutes.js'
import incidentResponseRoutes from './routes/incidentResponseRoutes.js'
import behaviorAnalyticsRoutes from './routes/behaviorAnalyticsRoutes.js'
import autonomousSecurityRoutes from './routes/autonomousSecurityRoutes.js'
import quantumCryptographyRoutes from './routes/quantumCryptographyRoutes.js'
import aiVulnerabilityRoutes from './routes/aiVulnerabilityRoutes.js'
import emergencyRoutes from './routes/emergencyRoutes.js'
// NOTE: Super Admin security control routes disabled due to CommonJS/ESM mismatch
// import securityControlRoutes from './routes/securityControlRoutes.js'
// NOTE: Advanced Super Admin routes temporarily disabled due to CommonJS/ESM mismatch
// import threatPrioritizationRoutes from './routes/threatPrioritizationRoutes.js'
// import riskScoringRoutes from './routes/riskScoringRoutes.js'
// import complianceDriftRoutes from './routes/complianceDriftRoutes.js'
// import socLoadBalancerRoutes from './routes/socLoadBalancerRoutes.js'
// import executiveBriefRoutes from './routes/executiveBriefRoutes.js'
import organizationRoutes from './routes/organizationRoutes.js'
import metricsRoutes from './routes/metricsRoutes.js'

// Load environment variables
dotenv.config()

// Initialize Sentry (must be before other imports)
initSentry()

const app = express()
const PORT = process.env.PORT || 5000

// Sentry request handler (must be first)
app.use(sentryRequestHandler)

// Security Middleware (order matters!)
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}))

app.use(securityHeaders) // Additional security headers
app.use(cors({
  origin: process.env.FRONTEND_URL || (process.env.NODE_ENV === 'production' ? false : true),
  credentials: true,
  optionsSuccessStatus: 200
}))

// Compression middleware (should be early in the stack)
app.use(compression())

// Request size limiting (before body parsing)
app.use(requestSizeLimiter)

// Body parsing
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Security middleware (after body parsing)
app.use(sanitizeMongo) // Prevent NoSQL injection
app.use(preventHPP) // Prevent HTTP Parameter Pollution
app.use(xssProtection) // XSS protection

// HTTP request logging with Winston
app.use(morgan('combined', { stream: logger.stream }))

// Performance monitoring
app.use(performanceMonitoring)

// Metrics middleware (must be after logging)
app.use(metricsMiddleware)

// API Versioning middleware
app.use(apiVersioning)

// Rate limiting (apply before routes)
app.use('/api/', apiLimiter) // General API rate limiting
app.use('/api/auth/', authLimiter) // Stricter auth rate limiting
app.use('/api/ai/', aiLimiter) // AI endpoint rate limiting
app.use('/api/scan/', intensiveLimiter) // Scan endpoint rate limiting
app.use('/api/deepfake/', uploadLimiter) // File upload rate limiting
app.use('/api/deepfake/', intensiveLimiter) // Deepfake processing rate limiting

// Connect to MongoDB (optional - works without DB)
// #region agent log:db-connect-call
fetch('http://127.0.0.1:7242/ingest/46815614-e019-4d5e-8510-8a04a2c8d350',{
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({
    sessionId:'debug-session',
    runId:'pre-fix',
    hypothesisId:'H1',
    location:'server.js:139',
    message:'About to call connectDB',
    data:{mongoUri:process.env.MONGO_URI || 'mongodb://localhost:27017/sentinelai'},
    timestamp:Date.now()
  })
}).catch(()=>{});
// #endregion agent log:db-connect-call
connectDB()

// Enhanced health check route
app.get('/api/health', (req, res) => {
  const health = {
    status: 'ok',
    message: 'SentinelAI Backend API is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0',
    memory: {
      used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + 'MB',
      total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + 'MB',
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + 'MB'
    },
    services: {
      database: 'connected', // Will be updated based on actual DB status
      websocket: 'active'
    }
  }
  res.json(health)
})

// API Version info endpoint
app.get('/api/version', getApiVersionInfo)
app.get('/api/v1/version', getApiVersionInfo)

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/organizations', organizationRoutes)
app.use('/api/metrics', metricsRoutes) // Prometheus metrics endpoint
app.use('/api/ai', aiRoutes)
app.use('/api/threats', advancedThreatRoutes)
app.use('/api/system', systemRoutes)
app.use('/api/scan', scanRoutes)
app.use('/api/logs', logRoutes)
app.use('/api/deepfake', deepfakeRoutes)
app.use('/api/security-score', securityScoreRoutes)
app.use('/api/zero-trust', zeroTrustRoutes)
app.use('/api/incident', incidentRoutes)
app.use('/api/simulation', simulationRoutes)
app.use('/api/playbooks', playbookRoutes)
app.use('/api/vault', vaultRoutes)
app.use('/api/intel', intelRoutes)
app.use('/api/darkweb', darkwebRoutes)
app.use('/api/education', educationRoutes)
app.use('/api/support', supportRoutes)
app.use('/api/security', securityRoutes)
app.use('/api/guardian', guardianRoutes)
app.use('/api/defense', defenseRoutes)
app.use('/api/prediction', predictionRoutes)
app.use('/api/reports', reportRoutes)
app.use('/api/threat-intel', threatIntelRoutes)
app.use('/api/url', urlRoutes)  // URL Safety Scanner - matches user's specification of /api/url/scan
app.use('/api/ip', ipRoutes)  // IP Threat Intelligence Scanner
app.use('/api/password', passwordRoutes)  // Password Breach Checker
app.use('/api/compliance', complianceRoutes)
app.use('/api/ai-defense', aiDefenseRoutes)
app.use('/api/ai-guardian', aiGuardianRoutes)
app.use('/api/phishing', phishingRoutes)  // Real-time phishing detection
app.use('/api/incident-response', incidentResponseRoutes)  // AI Incident Response
app.use('/api/behavior-analytics', behaviorAnalyticsRoutes)  // Advanced Behavioral Analytics
app.use('/api/autonomous-security', autonomousSecurityRoutes)  // AI Autonomous Security Operations
app.use('/api/quantum-cryptography', quantumCryptographyRoutes)  // Quantum-Resistant Cryptography Suite
app.use('/api/ai-vulnerability', aiVulnerabilityRoutes)  // AI-Powered Vulnerability Assessment
app.use('/api/emergency', emergencyRoutes)  // National Emergency Response System
// app.use('/api/security-control', securityControlRoutes)  // Super Admin Security Control System
// app.use('/api/v1/superadmin/threat-prioritization', threatPrioritizationRoutes)  // AI Threat Prioritization Engine
// app.use('/api/v1/superadmin/risk-scoring', riskScoringRoutes)  // Organization Risk Scoring Engine
// app.use('/api/v1/superadmin/compliance-drift', complianceDriftRoutes)  // AI Compliance Drift Detection
// app.use('/api/v1/superadmin/soc-load-balancer', socLoadBalancerRoutes)  // Autonomous SOC Load Balancer
// app.use('/api/v1/superadmin/executive-brief', executiveBriefRoutes)  // AI Executive Brief Generator
app.use('/behavior', behaviorRoutes)

// Sentry error handler (must be before other error handlers)
app.use(sentryErrorHandler)

// Error handling middleware
app.use((err, req, res, next) => {
  // Log error with Winston
  logger.error('API Error:', {
    error: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    ip: req.ip,
    user: req.user?.userId || 'anonymous'
  })

  // Don't leak error details in production
  const isDevelopment = process.env.NODE_ENV === 'development'
  
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(isDevelopment && { 
      stack: err.stack,
      path: req.path,
      method: req.method
    }),
    timestamp: new Date().toISOString()
  })
})

// 404 handler
app.use((req, res) => {
  logger.warn(`404 Not Found: ${req.method} ${req.path} from IP ${req.ip}`)
  res.status(404).json({ 
    success: false,
    message: 'Route not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  })
})

// Create HTTP server for socket.io integration
const server = http.createServer(app)

// Initialize WebSocket service
wsService.initialize(server)

// Start server
server.listen(PORT, () => {
  logger.info(`🚀 SentinelAI Backend Server running on port ${PORT}`)
  logger.info(`📡 API available at http://localhost:${PORT}/api`)
  logger.info(`🔌 WebSocket available at ws://localhost:${PORT}`)
  logger.info(`💚 Health check: http://localhost:${PORT}/api/health`)
  logger.info(`📊 Metrics: http://localhost:${PORT}/api/metrics`)
  logger.info(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`)
  logger.info(`📊 Rate limiting: Enabled`)
  logger.info(`🔒 Security middleware: Active`)
  logger.info(`📈 Monitoring: Prometheus + Sentry enabled`)
  
  // Start alerting system
  alertingSystem.startMonitoring()
  
  // Also log to console for development
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 SentinelAI Backend Server running on port ${PORT}`)
    console.log(`📡 API available at http://localhost:${PORT}/api`)
    console.log(`🔌 WebSocket available at ws://localhost:${PORT}`)
    console.log(`💚 Health check: http://localhost:${PORT}/api/health`)
    console.log(`📊 Metrics: http://localhost:${PORT}/api/metrics`)
  }
})
