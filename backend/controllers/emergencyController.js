import EmergencyResponseEngine from '../utils/emergencyResponseEngine.js'
import NationalThreatIntelService from '../utils/nationalThreatIntelService.js'
import GovernmentAgency from '../models/GovernmentAgency.js'
import User from '../models/User.js'

// Emergency Response Controller
// Handles government-grade emergency operations and coordination

export const declareEmergency = async (req, res) => {
  try {
    const userId = req.user._id
    const emergencyData = req.body

    // Validate required fields
    if (!emergencyData.type || !emergencyData.level || !emergencyData.description) {
      return res.status(400).json({
        success: false,
        msg: 'Missing required fields: type, level, description'
      })
    }

    // Validate emergency level
    if (![1, 2, 3, 4, 5].includes(emergencyData.level)) {
      return res.status(400).json({
        success: false,
        msg: 'Invalid emergency level. Must be 1-5'
      })
    }

    // Declare emergency using the engine
    const emergency = await EmergencyResponseEngine.declareEmergency(emergencyData, userId)

    // Log the declaration in government audit trail
    const user = await User.findById(userId)
    console.log(`🚨 EMERGENCY DECLARED: ${emergency.type} Level ${emergency.level} by ${user.email}`)

    res.status(201).json({
      success: true,
      msg: 'National emergency declared successfully',
      data: {
        emergencyId: emergency.id,
        type: emergency.type,
        level: emergency.level,
        agenciesNotified: emergency.coordination.agencies.length,
        status: emergency.status
      }
    })

  } catch (error) {
    console.error('Error declaring emergency:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to declare emergency',
      error: error.message
    })
  }
}

export const executeEmergencyAction = async (req, res) => {
  try {
    const { emergencyId } = req.params
    const actionData = req.body
    const userId = req.user._id

    // Validate action data
    if (!actionData.type || !actionData.description) {
      return res.status(400).json({
        success: false,
        msg: 'Missing required fields: type, description'
      })
    }

    // Execute action
    const action = await EmergencyResponseEngine.executeEmergencyAction(emergencyId, actionData, userId)

    res.json({
      success: true,
      msg: 'Emergency action executed successfully',
      data: action
    })

  } catch (error) {
    console.error('Error executing emergency action:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to execute emergency action',
      error: error.message
    })
  }
}

export const getActiveEmergencies = async (req, res) => {
  try {
    const userClearance = req.userClearance || 'top-secret'
    const emergencies = EmergencyResponseEngine.getActiveEmergencies(userClearance)

    res.json({
      success: true,
      data: emergencies,
      count: emergencies.length
    })

  } catch (error) {
    console.error('Error getting active emergencies:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to retrieve active emergencies',
      error: error.message
    })
  }
}

export const getEmergencyDetails = async (req, res) => {
  try {
    const { emergencyId } = req.params
    const userClearance = req.userClearance || 'top-secret'

    const emergencies = EmergencyResponseEngine.getActiveEmergencies(userClearance)
    const emergency = emergencies.find(e => e.id === emergencyId)

    if (!emergency) {
      return res.status(404).json({
        success: false,
        msg: 'Emergency not found or insufficient clearance'
      })
    }

    // Get detailed agency information
    const detailedAgencies = []
    for (const agencyCoord of emergency.coordination.agencies) {
      try {
        const agency = await GovernmentAgency.findById(agencyCoord.id).select('name code type operationalStatus')
        if (agency) {
          detailedAgencies.push({
            ...agencyCoord,
            details: agency
          })
        }
      } catch (error) {
        console.error(`Error fetching agency ${agencyCoord.id}:`, error)
      }
    }

    const emergencyDetails = {
      ...emergency,
      coordination: {
        ...emergency.coordination,
        agencies: detailedAgencies
      }
    }

    res.json({
      success: true,
      data: emergencyDetails
    })

  } catch (error) {
    console.error('Error getting emergency details:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to retrieve emergency details',
      error: error.message
    })
  }
}

export const deescalateEmergency = async (req, res) => {
  try {
    const { emergencyId } = req.params
    const userId = req.user._id

    // De-escalate emergency
    const emergency = await EmergencyResponseEngine.deescalateEmergency(emergencyId, userId)

    res.json({
      success: true,
      msg: 'Emergency de-escalated successfully',
      data: {
        emergencyId: emergency.id,
        status: emergency.status,
        deescalatedAt: emergency.deescalatedAt
      }
    })

  } catch (error) {
    console.error('Error de-escalating emergency:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to de-escalate emergency',
      error: error.message
    })
  }
}

export const getEmergencyStats = async (req, res) => {
  try {
    const stats = EmergencyResponseEngine.getEmergencyStats()

    res.json({
      success: true,
      data: stats
    })

  } catch (error) {
    console.error('Error getting emergency stats:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to retrieve emergency statistics',
      error: error.message
    })
  }
}

export const getEmergencyIntelligence = async (req, res) => {
  try {
    const { emergencyType, location } = req.query
    const userClearance = req.userClearance || 'top-secret'

    // Get emergency-relevant intelligence
    const intel = await NationalThreatIntelService.getEmergencyThreatIntel(emergencyType, location)

    // Filter based on user clearance
    const filteredThreats = intel.threats.filter(threat => {
      const clearanceLevels = {
        'none': 0, 'confidential': 1, 'secret': 2,
        'top-secret': 3, 'ts-sci': 4, 'q-clearance': 5
      }
      const userLevel = clearanceLevels[userClearance] || 0
      const threatLevel = clearanceLevels[threat.classification] || 5
      return userLevel >= threatLevel
    })

    res.json({
      success: true,
      data: {
        ...intel,
        threats: filteredThreats,
        totalFilteredThreats: filteredThreats.length
      }
    })

  } catch (error) {
    console.error('Error getting emergency intelligence:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to retrieve emergency intelligence',
      error: error.message
    })
  }
}

export const notifyAgency = async (req, res) => {
  try {
    const { agencyId } = req.params
    const { emergencyId, message } = req.body
    const userId = req.user._id

    // Find the agency
    const agency = await GovernmentAgency.findById(agencyId)
    if (!agency) {
      return res.status(404).json({
        success: false,
        msg: 'Agency not found'
      })
    }

    // Get the emergency
    const emergencies = EmergencyResponseEngine.getActiveEmergencies('q-clearance')
    const emergency = emergencies.find(e => e.id === emergencyId)

    if (!emergency) {
      return res.status(404).json({
        success: false,
        msg: 'Emergency not found'
      })
    }

    // Execute notification action
    const action = await EmergencyResponseEngine.executeEmergencyAction(emergencyId, {
      type: 'NOTIFY_AGENCY',
      description: `Notified agency ${agency.name}: ${message || 'Emergency notification'}`,
      target: agencyId,
      classification: emergency.classification
    }, userId)

    res.json({
      success: true,
      msg: 'Agency notified successfully',
      data: {
        agency: agency.name,
        action: action
      }
    })

  } catch (error) {
    console.error('Error notifying agency:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to notify agency',
      error: error.message
    })
  }
}

export const activatePresidentialAlert = async (req, res) => {
  try {
    const { emergencyId } = req.params
    const { message } = req.body
    const userId = req.user._id

    // Verify user has presidential alert authority (superadmin only)
    if (req.user.role !== 'superadmin') {
      return res.status(403).json({
        success: false,
        msg: 'Presidential alert authority required'
      })
    }

    // Execute presidential alert
    const action = await EmergencyResponseEngine.executeEmergencyAction(emergencyId, {
      type: 'PRESIDENTIAL_ALERT',
      description: `Presidential Alert: ${message || 'National emergency declared'}`,
      target: 'NATIONAL_EMERGENCY_SYSTEM',
      classification: 'top-secret'
    }, userId)

    // Log presidential alert
    console.log(`🏛️ PRESIDENTIAL ALERT ACTIVATED by ${req.user.email} for emergency ${emergencyId}`)

    res.json({
      success: true,
      msg: 'Presidential alert activated successfully',
      data: {
        alertTime: new Date().toISOString(),
        action: action
      }
    })

  } catch (error) {
    console.error('Error activating presidential alert:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to activate presidential alert',
      error: error.message
    })
  }
}

export const getAgencyEmergencyStatus = async (req, res) => {
  try {
    const { agencyId } = req.params

    // Find agency
    const agency = await GovernmentAgency.findById(agencyId)
    if (!agency) {
      return res.status(404).json({
        success: false,
        msg: 'Agency not found'
      })
    }

    // Get emergency status
    const emergencyStatus = {
      operationalStatus: agency.operationalStatus,
      emergencyActive: agency.operationalStatus === 'emergency',
      emergencyLevel: agency.emergencyProtocols?.cyberEmergency?.level || null,
      emergencyActivated: agency.emergencyProtocols?.cyberEmergency?.activated || false,
      emergencyActivatedAt: agency.emergencyProtocols?.cyberEmergency?.activatedAt || null,
      threatLevel: agency.threatLevel?.current || 'low'
    }

    res.json({
      success: true,
      data: {
        agency: {
          name: agency.name,
          code: agency.code,
          type: agency.type
        },
        emergencyStatus: emergencyStatus
      }
    })

  } catch (error) {
    console.error('Error getting agency emergency status:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to retrieve agency emergency status',
      error: error.message
    })
  }
}

export const updateEmergencyProtocols = async (req, res) => {
  try {
    const { emergencyId } = req.params
    const updates = req.body
    const userId = req.user._id

    // Get the emergency
    const emergencies = EmergencyResponseEngine.getActiveEmergencies('q-clearance')
    const emergency = emergencies.find(e => e.id === emergencyId)

    if (!emergency) {
      return res.status(404).json({
        success: false,
        msg: 'Emergency not found'
      })
    }

    // Apply updates (this would be more sophisticated in production)
    if (updates.coordination) {
      emergency.coordination = { ...emergency.coordination, ...updates.coordination }
    }

    console.log(`📝 Emergency protocols updated for ${emergencyId} by ${req.user.email}`)

    res.json({
      success: true,
      msg: 'Emergency protocols updated successfully',
      data: {
        emergencyId: emergency.id,
        updates: updates
      }
    })

  } catch (error) {
    console.error('Error updating emergency protocols:', error)
    res.status(500).json({
      success: false,
      msg: 'Failed to update emergency protocols',
      error: error.message
    })
  }
}
