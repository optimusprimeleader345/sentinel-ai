import express from 'express'
import {
  getPredictionSummary,
  getPredictionAttackTypes,
  getPredictionRisks,
  getPredictionInsights,
  getPredictionHeatmap,
  getPredictionExplanation
} from '../controllers/predictionController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Prediction routes
router.get('/summary', optionalAuth, getPredictionSummary)
router.get('/attack-types', optionalAuth, getPredictionAttackTypes)
router.get('/risks', optionalAuth, getPredictionRisks)
router.get('/insights', optionalAuth, getPredictionInsights)
router.get('/heatmap', optionalAuth, getPredictionHeatmap)
router.get('/explain', optionalAuth, getPredictionExplanation)

export default router
