import express from 'express'
import { getMetrics, getMetricsJSON, getHealthMetrics } from '../controllers/metricsController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// Prometheus metrics endpoint (no auth required for Prometheus scraping)
router.get('/', getMetrics)

// JSON metrics endpoint (for debugging, requires auth)
router.get('/json', authMiddleware, getHealthMetrics)

// Health metrics summary (requires auth)
router.get('/health', authMiddleware, getHealthMetrics)

export default router
