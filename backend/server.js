import express from 'express'
import http from 'http'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './config/db.js'
import wsService from './config/websocket.js'

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
import securityControlRoutes from './routes/securityControlRoutes.js'
import threatPrioritizationRoutes from './routes/threatPrioritizationRoutes.js'
import riskScoringRoutes from './routes/riskScoringRoutes.js'
import complianceDriftRoutes from './routes/complianceDriftRoutes.js'
import socLoadBalancerRoutes from './routes/socLoadBalancerRoutes.js'
import executiveBriefRoutes from './routes/executiveBriefRoutes.js'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || true, // Allow all origins in development
  credentials: true,
}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to MongoDB (optional - works without DB)
connectDB()

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'SentinelAI Backend API is running',
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api/auth', authRoutes)
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
app.use('/api/security-control', securityControlRoutes)  // Super Admin Security Control System
app.use('/api/v1/superadmin/threat-prioritization', threatPrioritizationRoutes)  // AI Threat Prioritization Engine
app.use('/api/v1/superadmin/risk-scoring', riskScoringRoutes)  // Organization Risk Scoring Engine
app.use('/api/v1/superadmin/compliance-drift', complianceDriftRoutes)  // AI Compliance Drift Detection
app.use('/api/v1/superadmin/soc-load-balancer', socLoadBalancerRoutes)  // Autonomous SOC Load Balancer
app.use('/api/v1/superadmin/executive-brief', executiveBriefRoutes)  // AI Executive Brief Generator
app.use('/behavior', behaviorRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    message: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

// Create HTTP server for socket.io integration
const server = http.createServer(app)

// Initialize WebSocket service
wsService.initialize(server)

// Start server
server.listen(PORT, () => {
  console.log(`🚀 SentinelAI Backend Server running on port ${PORT}`)
  console.log(`📡 API available at http://localhost:${PORT}/api`)
  console.log(`🔌 WebSocket available at ws://localhost:${PORT}`)
  console.log(`💚 Health check: http://localhost:${PORT}/api/health`)
})
