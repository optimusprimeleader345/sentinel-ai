import express from 'express'
import { getSystemHealth, updateSystemHealth, getSystemProcesses } from '../controllers/systemController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/health', optionalAuth, getSystemHealth)
router.post('/health', optionalAuth, updateSystemHealth)
router.get('/processes', optionalAuth, getSystemProcesses)

export default router
