import express from 'express'
import { getCourses, getTips, getTopics, getLessons, getVideos, getQuiz, getProgress, submitQuiz } from '../controllers/educationController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/courses', optionalAuth, getCourses)
router.get('/tips', optionalAuth, getTips)
router.get('/topics', optionalAuth, getTopics)
router.get('/lessons/:id', optionalAuth, getLessons)
router.get('/videos', optionalAuth, getVideos)
router.get('/quiz/:id', optionalAuth, getQuiz)
router.get('/progress', optionalAuth, getProgress)
router.post('/submit', optionalAuth, submitQuiz)

export default router
