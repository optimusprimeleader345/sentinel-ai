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

// Global Threat Map - Real-time aggregated threats
router.get('/aggregate', async (req, res) => {
  try {
    const { aggregateThreats } = await import('../utils/threatIntelService.js')
    const threats = await aggregateThreats()

    res.json({
      success: true,
      data: threats,
      count: threats.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Aggregate threats error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to aggregate threats',
      message: error.message
    })
  }
})

export default router
