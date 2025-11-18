import express from 'express'
import { getThreats, createThreat, updateThreat, deleteThreat, getGlobalThreats, lookupIOC, getHeatmap, getSeverityStats, getTrends, getThreatFeed, getMitreMatrix, getCorrelationEngine } from '../controllers/threatController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Existing routes
router.get('/', optionalAuth, getThreats)
router.get('/global', optionalAuth, getGlobalThreats)
router.post('/', optionalAuth, createThreat)
router.put('/:id', optionalAuth, updateThreat)
router.delete('/:id', optionalAuth, deleteThreat)

// Threat Intelligence Center routes
router.get('/overview', optionalAuth, getThreats)
router.get('/heatmap', optionalAuth, getHeatmap)
router.get('/severity-stats', optionalAuth, getSeverityStats)
router.get('/trends', optionalAuth, getTrends)
router.get('/lookup', optionalAuth, lookupIOC)
router.get('/feed', optionalAuth, getThreatFeed)
router.get('/mitre', optionalAuth, getMitreMatrix)
router.get('/correlation', optionalAuth, getCorrelationEngine)

export default router
