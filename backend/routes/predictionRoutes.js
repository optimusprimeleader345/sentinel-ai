import express from 'express'
import {
  getPredictiveAnalysis,
  getAssetPrediction,
  getPredictionMetrics,
  trainModel,
  getPredictionAlerts,
  getPredictionInsights
} from '../controllers/predictionController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// AI-Powered Predictive Breach Detection routes
router.get('/analyze', optionalAuth, getPredictiveAnalysis)
router.get('/asset/:assetId', optionalAuth, getAssetPrediction)
router.get('/metrics', optionalAuth, getPredictionMetrics)
router.post('/train', optionalAuth, trainModel)
router.get('/alerts', optionalAuth, getPredictionAlerts)
router.get('/insights/:assetId', optionalAuth, getPredictionInsights)

export default router
