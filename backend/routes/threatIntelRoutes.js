import express from 'express'
import {
  checkIndicator,
  bulkCheckIndicators,
  getRecentThreats,
  searchThreats,
  getFeedStatus,
  testFeedConnectivity,
  getThreatStatistics,
  getIndicatorReport
} from '../controllers/threatIntelController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Single indicator threat intelligence check
router.post('/check', optionalAuth, checkIndicator)

// Bulk indicators threat intelligence check
router.post('/bulk-check', optionalAuth, bulkCheckIndicators)

// Get recent threats from database
router.get('/recent', optionalAuth, getRecentThreats)

// Search threats by indicator or metadata
router.get('/search', optionalAuth, searchThreats)

// Get threat intelligence feed status
router.get('/status', optionalAuth, getFeedStatus)

// Test connectivity to threat intelligence feeds
router.get('/connectivity', optionalAuth, testFeedConnectivity)

// Get threat statistics and trends
router.get('/stats', optionalAuth, getThreatStatistics)

// Get detailed report for a specific indicator
router.get('/report/:indicator', optionalAuth, getIndicatorReport)

export default router
