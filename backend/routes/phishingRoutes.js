import express from 'express'
import { detectPhishingController, getPhishingStats, testPhishingDetection } from '../controllers/phishingController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Main phishing detection endpoint (as specified: /api/phishing/detect)
router.post('/detect', optionalAuth, detectPhishingController)

// Get phishing detection statistics (admin/analytics)
router.get('/stats', optionalAuth, getPhishingStats)

// Test endpoint with sample phishing data (development/testing)
router.post('/test', optionalAuth, testPhishingDetection)

export default router
