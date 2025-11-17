import express from 'express'
import { getLogs, createLog } from '../controllers/logController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/', optionalAuth, getLogs)
router.post('/', optionalAuth, createLog)

export default router

