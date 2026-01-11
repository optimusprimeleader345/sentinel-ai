import express from 'express'
import {
  verifyGovernmentToken,
  requirePermission,
  requireClearance,
  requireEmergencyAccess,
  requireNationalEmergency,
  logGovernmentOperation
} from '../middleware/governmentAuth.js'
import {
  declareEmergency,
  executeEmergencyAction,
  getActiveEmergencies,
  getEmergencyDetails,
  deescalateEmergency,
  getEmergencyStats,
  getEmergencyIntelligence,
  notifyAgency,
  activatePresidentialAlert,
  getAgencyEmergencyStatus,
  updateEmergencyProtocols
} from '../controllers/emergencyController.js'

const router = express.Router()

// All emergency routes require government authentication
router.use(verifyGovernmentToken)

// Get active emergencies (filtered by clearance)
router.get('/',
  requireClearance('secret'),
  logGovernmentOperation('VIEW_EMERGENCIES', 'secret'),
  getActiveEmergencies
)

// Get emergency statistics
router.get('/stats',
  requireClearance('secret'),
  logGovernmentOperation('VIEW_EMERGENCY_STATS', 'secret'),
  getEmergencyStats
)

// Declare national emergency (superadmin only)
router.post('/declare',
  requireNationalEmergency,
  logGovernmentOperation('DECLARE_EMERGENCY', 'top-secret'),
  declareEmergency
)

// Get emergency intelligence for specific type
router.get('/intelligence',
  requireClearance('secret'),
  logGovernmentOperation('VIEW_EMERGENCY_INTEL', 'secret'),
  getEmergencyIntelligence
)

// Emergency-specific routes
router.get('/:emergencyId',
  requireClearance('secret'),
  logGovernmentOperation('VIEW_EMERGENCY_DETAILS', 'secret'),
  getEmergencyDetails
)

// Execute emergency action
router.post('/:emergencyId/actions',
  requireEmergencyAccess,
  logGovernmentOperation('EXECUTE_EMERGENCY_ACTION', 'top-secret'),
  executeEmergencyAction
)

// Update emergency protocols
router.put('/:emergencyId/protocols',
  requireEmergencyAccess,
  logGovernmentOperation('UPDATE_EMERGENCY_PROTOCOLS', 'top-secret'),
  updateEmergencyProtocols
)

// De-escalate emergency
router.put('/:emergencyId/deescalate',
  requireNationalEmergency,
  logGovernmentOperation('DEESCALATE_EMERGENCY', 'top-secret'),
  deescalateEmergency
)

// Notify specific agency
router.post('/:emergencyId/notify/:agencyId',
  requireEmergencyAccess,
  logGovernmentOperation('NOTIFY_AGENCY', 'secret'),
  notifyAgency
)

// Activate presidential alert (superadmin only)
router.post('/:emergencyId/presidential-alert',
  requireNationalEmergency,
  logGovernmentOperation('ACTIVATE_PRESIDENTIAL_ALERT', 'top-secret'),
  activatePresidentialAlert
)

// Get agency emergency status
router.get('/agency/:agencyId/status',
  requireClearance('secret'),
  logGovernmentOperation('VIEW_AGENCY_EMERGENCY_STATUS', 'secret'),
  getAgencyEmergencyStatus
)

export default router
