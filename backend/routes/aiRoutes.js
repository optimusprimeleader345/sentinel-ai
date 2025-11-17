import express from 'express'
import { analyze, botChat, simulateAction } from '../controllers/aiController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/analyze', optionalAuth, analyze)
router.post('/bot', optionalAuth, botChat)
router.post('/actions/simulate', optionalAuth, simulateAction)

export default router

