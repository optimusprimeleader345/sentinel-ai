import express from 'express'
import { requireSuperAdmin } from '../middleware/governmentAuth.js'
import {
  getTopNationalThreats,
  getThreatAnalysis,
  getThreatInsights,
  correlateIncident,
  getNationalPosture
} from '../controllers/aiThreatPrioritizationController.js'

const router = express.Router()

// All routes require superadmin access
router.use(requireSuperAdmin)

// Get top 5 national risk threats
router.get('/top-threats', getTopNationalThreats)

// Get detailed analysis for specific threat
router.get('/threat/:threatId', getThreatAnalysis)

// Get AI-powered threat insights and predictions
router.get('/insights', getThreatInsights)

// Correlate new incident with national threats
router.post('/correlate', correlateIncident)

// Get national cyber posture summary
router.get('/national-posture', getNationalPosture)

export default router
