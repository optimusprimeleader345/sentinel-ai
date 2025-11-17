import express from 'express'
import { getIntelFeed, getIntelSummary, getMalwareTrends, getTechniques } from '../controllers/intelController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/feed', optionalAuth, getIntelFeed)
router.get('/summary', optionalAuth, getIntelSummary)
router.get('/malware-trends', optionalAuth, getMalwareTrends)
router.get('/techniques', optionalAuth, getTechniques)

export default router

