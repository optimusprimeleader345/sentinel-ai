import express from 'express'
import { scanURL, scanEmail, scanFile, getReputation, explainScan, getScanHistory } from '../controllers/scanController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/url', optionalAuth, scanURL)
router.post('/email', optionalAuth, scanEmail)
router.post('/file', optionalAuth, scanFile)
router.get('/reputation', optionalAuth, getReputation)
router.post('/explain', optionalAuth, explainScan)
router.get('/history', optionalAuth, getScanHistory)

export default router
