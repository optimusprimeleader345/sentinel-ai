import express from 'express'
import {
  scanURL,
  scanEmail,
  scanFile,
  getReputation,
  explainScan,
  getScanHistory,
  startVulnerabilityScan,
  getScanResults,
  getActiveScans,
  cancelScan
} from '../controllers/scanController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Legacy scan routes
router.post('/url', optionalAuth, scanURL)
router.post('/email', optionalAuth, scanEmail)
router.post('/file', optionalAuth, scanFile)
router.get('/reputation', optionalAuth, getReputation)
router.post('/explain', optionalAuth, explainScan)
router.get('/history', optionalAuth, getScanHistory)

// Real-time WebSocket-enabled vulnerability scanning routes
router.post('/vulnerability', optionalAuth, startVulnerabilityScan)
router.get('/results/:scanId', optionalAuth, getScanResults)
router.get('/active', optionalAuth, getActiveScans)
router.post('/cancel/:scanId', optionalAuth, cancelScan)

export default router
