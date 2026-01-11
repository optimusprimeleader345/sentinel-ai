import express from 'express'
import { scanURLController } from '../controllers/urlController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// URL scanning endpoint - matches user's specification
router.post('/scan', optionalAuth, scanURLController)

export default router
