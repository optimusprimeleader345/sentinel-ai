import express from 'express'
import { getCourses, getTips, submitQuiz } from '../controllers/educationController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/courses', optionalAuth, getCourses)
router.get('/tips', optionalAuth, getTips)
router.post('/quiz', optionalAuth, submitQuiz)

export default router

