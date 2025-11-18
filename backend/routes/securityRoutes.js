import express from 'express'
import {
  getSecurityScore,
  getSecurityBreakdown,
  getRiskFactors,
  getRecommendations,
  getSecurityHistory
} from '../controllers/securityController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/score', optionalAuth, getSecurityScore)
router.get('/breakdown', optionalAuth, getSecurityBreakdown)
router.get('/risk-factors', optionalAuth, getRiskFactors)
router.get('/recommendations', optionalAuth, getRecommendations)
router.get('/history', optionalAuth, getSecurityHistory)

export default router
