import express from 'express'
import { createTicket, getTickets, getFAQ, getAISupport } from '../controllers/supportController.js'
import { authMiddleware, optionalAuth } from '../middleware/authMiddleware.js'
import chatRoutes from './chatRoutes.js'

const router = express.Router()

router.use('/chat', chatRoutes)
router.post('/ticket', authMiddleware, createTicket)
router.get('/ticket', authMiddleware, getTickets)
router.get('/faq', optionalAuth, getFAQ)
router.post('/ai', optionalAuth, getAISupport)

export default router
