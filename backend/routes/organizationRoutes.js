import express from 'express'
import {
  createOrganization,
  getMyOrganization,
  updateOrganization,
  getOrganizationMembers,
  getOrganizationStats
} from '../controllers/organizationController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'
import { attachOrganization, requireOrganization, requireOrganizationRole } from '../middleware/tenantIsolation.js'

const router = express.Router()

// Create organization
router.post('/', authMiddleware, createOrganization)

// Get my organization
router.get('/me', authMiddleware, attachOrganization, getMyOrganization)

// Update organization (requires owner/admin)
router.put('/me', authMiddleware, attachOrganization, requireOrganization, requireOrganizationRole('owner', 'admin'), updateOrganization)

// Get organization members
router.get('/me/members', authMiddleware, attachOrganization, requireOrganization, getOrganizationMembers)

// Get organization statistics
router.get('/me/stats', authMiddleware, attachOrganization, requireOrganization, getOrganizationStats)

export default router
