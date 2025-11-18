import express from 'express'
import {
  createTicket, getTickets, getFAQ, getAISupport,
  createSupportTicket, getSupportTickets, getTicketDetails, replyTicket,
  getSupportAssistant, getSupportStats
} from '../controllers/supportController.js'
import { authMiddleware, optionalAuth } from '../middleware/authMiddleware.js'
import chatRoutes from './chatRoutes.js'

const router = express.Router()

router.use('/chat', chatRoutes)

// ===== EXISTING ROUTES =====
router.post('/ticket', authMiddleware, createTicket)
router.get('/ticket', authMiddleware, getTickets)
router.get('/faq', optionalAuth, getFAQ)
router.post('/ai', optionalAuth, getAISupport)

// ===== NEW ROUTES FOR COMPLETE CUSTOMER SUPPORT SYSTEM =====
router.post('/tickets', createSupportTicket)              // POST /api/support/tickets
router.get('/tickets', getSupportTickets)                 // GET /api/support/tickets
router.get('/tickets/:id', getTicketDetails)              // GET /api/support/tickets/:id
router.post('/tickets/:id/reply', replyTicket)            // POST /api/support/tickets/:id/reply
router.post('/assistant', getSupportAssistant)            // POST /api/support/assistant
router.get('/stats', getSupportStats)                     // GET /api/support/stats

export default router
