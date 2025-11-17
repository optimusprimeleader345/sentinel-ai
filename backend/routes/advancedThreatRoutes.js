import express from 'express'
import { getDarkWebIntel, getThreatCorrelation, classifyThreat } from '../controllers/advancedThreatController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Existing routes from threatRoutes.js
import threatRoutes from './threatRoutes.js'
router.use(threatRoutes)

// New advanced routes
router.get('/darkweb', optionalAuth, getDarkWebIntel)
router.get('/correlation', optionalAuth, getThreatCorrelation)
router.post('/classify', optionalAuth, classifyThreat)

export default router
