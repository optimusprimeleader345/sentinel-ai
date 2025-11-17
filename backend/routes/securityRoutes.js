import express from 'express'
import { getSecurityScore } from '../controllers/securityController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/score', optionalAuth, getSecurityScore)

export default router

