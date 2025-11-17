import express from 'express'
import { getThreats, createThreat, updateThreat, deleteThreat, getGlobalThreats, lookupIOC } from '../controllers/threatController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'

const router = express.Router()

// Existing routes
router.get('/', optionalAuth, getThreats)
router.get('/global', optionalAuth, getGlobalThreats)
router.post('/', optionalAuth, createThreat)
router.put('/:id', optionalAuth, updateThreat)
router.delete('/:id', optionalAuth, deleteThreat)

// New routes for Threat Overview feature
router.get('/overview', optionalAuth, getThreats) // reusing getThreats for overview data
router.get('/lookup', optionalAuth, lookupIOC)

export default router
