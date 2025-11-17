import express from 'express'
import { scanURL, scanEmail, getScanHistory } from '../controllers/scanController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/url', optionalAuth, scanURL)
router.post('/email', optionalAuth, scanEmail)
router.get('/history', optionalAuth, getScanHistory)

export default router

