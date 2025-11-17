import express from 'express'
import { checkEmail, getBreaches } from '../controllers/darkwebController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/check', optionalAuth, checkEmail)
router.get('/breaches', optionalAuth, getBreaches)

export default router

