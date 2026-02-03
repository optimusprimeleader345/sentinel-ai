import express from 'express'
import { getThreats, createThreat, updateThreat, deleteThreat, getGlobalThreats, lookupIOC, getHeatmap, getSeverityStats, getTrends, getThreatFeed, getMitreMatrix, getCorrelationEngine } from '../controllers/threatController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'
import { attachOrganization } from '../middleware/tenantIsolation.js'

const router = express.Router()

// Existing routes (with organization isolation)
router.get('/', optionalAuth, attachOrganization, getThreats)
router.get('/global', optionalAuth, getGlobalThreats) // Global threats don't need org isolation
router.post('/', optionalAuth, attachOrganization, createThreat)
router.put('/:id', optionalAuth, attachOrganization, updateThreat)
router.delete('/:id', optionalAuth, attachOrganization, deleteThreat)

// Threat Intelligence Center routes
router.get('/overview', optionalAuth, attachOrganization, getThreats)
router.get('/heatmap', optionalAuth, getHeatmap) // Global data
router.get('/severity-stats', optionalAuth, attachOrganization, getSeverityStats)
router.get('/trends', optionalAuth, attachOrganization, getTrends)
router.get('/lookup', optionalAuth, attachOrganization, lookupIOC)
router.get('/feed', optionalAuth, attachOrganization, getThreatFeed)
router.get('/mitre', optionalAuth, getMitreMatrix) // Global MITRE data
router.get('/correlation', optionalAuth, attachOrganization, getCorrelationEngine)

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
