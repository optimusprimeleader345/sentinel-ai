import express from 'express'
import { getChatMessages, sendMessage } from '../controllers/chatController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/chat', optionalAuth, getChatMessages)
router.post('/chat', optionalAuth, sendMessage)

export default router
