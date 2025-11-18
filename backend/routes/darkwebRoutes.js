import express from 'express'
import {
  checkEmail,
  getBreaches,
  searchLeaks,
  getCredentials,
  getMarketplace,
  getRansomware,
  getPastes,
  getScore,
  getBreachesExact,
  getExposedCredentials,
  getWarnings
} from '../controllers/darkwebController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/check', optionalAuth, checkEmail)
router.get('/breaches', optionalAuth, getBreaches)
router.get('/search', optionalAuth, searchLeaks)
router.get('/credentials', optionalAuth, getCredentials)
router.get('/market', optionalAuth, getMarketplace)
router.get('/ransomware', optionalAuth, getRansomware)
router.get('/pastes', optionalAuth, getPastes)
router.get('/score', optionalAuth, getScore)

// New exact specification routes
router.get('/breaches-exact', optionalAuth, getBreachesExact)
router.get('/exposed-credentials', optionalAuth, getExposedCredentials)
router.get('/warnings', optionalAuth, getWarnings)

export default router
