import GovernmentAgency from '../models/GovernmentAgency.js'
import User from '../models/User.js'

// National Emergency Response Orchestration Engine
// Handles government-grade emergency declarations and response coordination

class EmergencyResponseEngine {
  constructor() {
    this.activeEmergencies = new Map()
    this.emergencyLevels = {
      1: { name: 'Minor Incident', color: 'yellow', response: 'Monitor' },
      2: { name: 'Significant Incident', color: 'orange', response: 'Heightened Awareness' },
      3: { name: 'Major Incident', color: 'red', response: 'Coordinated Response' },
      4: { name: 'Critical Incident', color: 'red', response: 'Full Emergency Response' },
      5: { name: 'National Emergency', color: 'red', response: 'Presidential Declaration' }
    }

    this.responseProtocols = {
      'cyber-attack': {
        agencies: ['NSA', 'CISA', 'DHS', 'FBI', 'DoD'],
        actions: ['Activate CERT teams', 'Isolate networks', 'Notify Congress', 'Deploy countermeasures'],
        duration: '72 hours'
      },
      'nation-state': {
        agencies: ['NSA', 'CIA', 'DoD', 'State', 'Treasury'],
        actions: ['Activate intelligence sharing', 'Economic sanctions', 'Military readiness', 'Diplomatic channels'],
        duration: 'Indefinite'
      },
      'infrastructure': {
        agencies: ['DHS', 'DOE', 'DOT', 'DOD'],
        actions: ['Sector coordination', 'Backup systems activation', 'Public communication', 'Resource allocation'],
        duration: 'Until restored'
      },
      'terrorism': {
        agencies: ['FBI', 'DHS', 'DoD', 'State'],
        actions: ['Threat assessment', 'Public alerts', 'Law enforcement deployment', 'Intelligence surge'],
        duration: '30 days'
      }
    }
  }

  // Declare national emergency
  async declareEmergency(emergencyData, userId) {
    const {
      type,
      level,
      description,
      affectedSystems,
      location,
      classification = 'top-secret'
    } = emergencyData

    // Validate emergency level
    if (!this.emergencyLevels[level]) {
      throw new Error(`Invalid emergency level: ${level}`)
    }

    // Create emergency record
    const emergency = {
      id: `EMERGENCY-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      type,
      level,
      description,
      affectedSystems: affectedSystems || [],
      location: location || 'National',
      classification,
      declaredBy: userId,
      declaredAt: new Date(),
      status: 'ACTIVE',
      protocols: this.responseProtocols[type] || {},
      notifications: [],
      actions: [],
      coordination: {
        agencies: [],
        status: 'Initiating'
      }
    }

    // Store active emergency
    this.activeEmergencies.set(emergency.id, emergency)

    // Activate agency emergency protocols
    await this.activateAgencyProtocols(emergency, userId)

    // Log emergency declaration
    console.log(`🚨 NATIONAL EMERGENCY DECLARED: ${emergency.type} - Level ${emergency.level}`)
    console.log(`Classification: ${emergency.classification}`)
    console.log(`Declared by: ${userId} at ${emergency.declaredAt.toISOString()}`)

    return emergency
  }

  // Activate emergency protocols across agencies
  async activateAgencyProtocols(emergency, userId) {
    try {
      // Get all relevant agencies
      const relevantAgencies = await this.getRelevantAgencies(emergency.type)

      for (const agency of relevantAgencies) {
        try {
          // Activate emergency protocol for this agency
          await agency.activateEmergency(emergency.level, userId)

          // Record notification
          emergency.notifications.push({
            agency: agency._id,
            agencyName: agency.name,
            status: 'SENT',
            timestamp: new Date(),
            method: 'SYSTEM'
          })

          // Add to coordination list
          emergency.coordination.agencies.push({
            id: agency._id,
            name: agency.name,
            status: 'NOTIFIED',
            responseRequired: true
          })

        } catch (error) {
          console.error(`Failed to activate emergency for agency ${agency.name}:`, error)

          emergency.notifications.push({
            agency: agency._id,
            agencyName: agency.name,
            status: 'FAILED',
            timestamp: new Date(),
            error: error.message
          })
        }
      }

      emergency.coordination.status = 'Notifications Sent'
      this.activeEmergencies.set(emergency.id, emergency)

    } catch (error) {
      console.error('Error activating agency protocols:', error)
      throw error
    }
  }

  // Get agencies relevant to emergency type
  async getRelevantAgencies(emergencyType) {
    const protocol = this.responseProtocols[emergencyType]
    if (!protocol) return []

    // Find agencies by code or type
    const agencies = []

    for (const agencyCode of protocol.agencies) {
      try {
        const agency = await GovernmentAgency.findOne({ code: agencyCode })
        if (agency) agencies.push(agency)
      } catch (error) {
        console.error(`Error finding agency ${agencyCode}:`, error)
      }
    }

    // Also include federal agencies that have relevant capabilities
    const federalAgencies = await GovernmentAgency.find({
      type: 'federal',
      operationalStatus: { $ne: 'deactivated' }
    })

    for (const agency of federalAgencies) {
      if (agency.capabilities && agency.capabilities.includes(this.getCapabilityForEmergency(emergencyType))) {
        if (!agencies.find(a => a._id.equals(agency._id))) {
          agencies.push(agency)
        }
      }
    }

    return agencies
  }

  // Get capability type for emergency
  getCapabilityForEmergency(emergencyType) {
    const capabilityMap = {
      'cyber-attack': 'incident-response',
      'nation-state': 'intelligence-collection',
      'infrastructure': 'critical-infrastructure',
      'terrorism': 'law-enforcement'
    }
    return capabilityMap[emergencyType] || 'emergency-response'
  }

  // Execute emergency response action
  async executeEmergencyAction(emergencyId, actionData, userId) {
    const emergency = this.activeEmergencies.get(emergencyId)
    if (!emergency) {
      throw new Error('Emergency not found')
    }

    const action = {
      id: `ACTION-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      type: actionData.type,
      description: actionData.description,
      target: actionData.target,
      executedBy: userId,
      executedAt: new Date(),
      status: 'EXECUTING',
      classification: actionData.classification || emergency.classification
    }

    // Execute the action based on type
    try {
      await this.executeAction(action, emergency)

      action.status = 'COMPLETED'
      action.completedAt = new Date()

      console.log(`✅ Emergency action executed: ${action.type} - ${action.description}`)

    } catch (error) {
      action.status = 'FAILED'
      action.error = error.message
      action.failedAt = new Date()

      console.error(`❌ Emergency action failed: ${action.type} - ${error.message}`)
    }

    // Record the action
    emergency.actions.push(action)
    this.activeEmergencies.set(emergencyId, emergency)

    return action
  }

  // Execute specific action types
  async executeAction(action, emergency) {
    switch (action.type) {
      case 'NOTIFY_AGENCY':
        await this.notifyAgency(action.target, emergency)
        break
      case 'ACTIVATE_PROTOCOL':
        await this.activateProtocol(action.target, emergency)
        break
      case 'LOCK_SYSTEM':
        await this.lockSystem(action.target, emergency)
        break
      case 'DEPLOY_RESPONSE':
        await this.deployResponse(action.target, emergency)
        break
      case 'PRESIDENTIAL_ALERT':
        await this.sendPresidentialAlert(emergency)
        break
      default:
        throw new Error(`Unknown action type: ${action.type}`)
    }
  }

  // Notify specific agency
  async notifyAgency(agencyId, emergency) {
    const agency = await GovernmentAgency.findById(agencyId)
    if (!agency) throw new Error('Agency not found')

    // In production, this would send actual notifications
    console.log(`📢 Notifying agency ${agency.name} of emergency ${emergency.id}`)

    // Update coordination status
    const coordIndex = emergency.coordination.agencies.findIndex(a => a.id.equals(agencyId))
    if (coordIndex >= 0) {
      emergency.coordination.agencies[coordIndex].status = 'NOTIFIED'
      emergency.coordination.agencies[coordIndex].notifiedAt = new Date()
    }
  }

  // Activate specific protocol
  async activateProtocol(protocolName, emergency) {
    console.log(`🚀 Activating protocol: ${protocolName} for emergency ${emergency.id}`)

    // Protocol-specific activation logic would go here
    // This could include activating backup systems, deploying teams, etc.
  }

  // Lock down system
  async lockSystem(systemId, emergency) {
    console.log(`🔒 Locking down system: ${systemId} due to emergency ${emergency.id}`)

    // In production, this would interface with actual system lockdown procedures
    // Could include network isolation, account lockdowns, etc.
  }

  // Deploy response team
  async deployResponse(responseType, emergency) {
    console.log(`🚁 Deploying ${responseType} response for emergency ${emergency.id}`)

    // Could deploy CERT teams, military cyber units, etc.
  }

  // Send presidential alert
  async sendPresidentialAlert(emergency) {
    console.log(`🏛️ SENDING PRESIDENTIAL ALERT for emergency ${emergency.id}`)

    // In production, this would interface with the Emergency Alert System
    // and presidential communication channels

    emergency.presidentialAlertSent = true
    emergency.presidentialAlertTime = new Date()
  }

  // De-escalate emergency
  async deescalateEmergency(emergencyId, userId) {
    const emergency = this.activeEmergencies.get(emergencyId)
    if (!emergency) {
      throw new Error('Emergency not found')
    }

    // Deactivate agency protocols
    await this.deactivateAgencyProtocols(emergency, userId)

    // Update emergency status
    emergency.status = 'DE-ESCALATED'
    emergency.deescalatedBy = userId
    emergency.deescalatedAt = new Date()

    // Remove from active emergencies
    this.activeEmergencies.delete(emergencyId)

    console.log(`⬇️ Emergency de-escalated: ${emergency.id}`)

    return emergency
  }

  // Deactivate emergency protocols
  async deactivateAgencyProtocols(emergency, userId) {
    for (const agencyCoord of emergency.coordination.agencies) {
      try {
        const agency = await GovernmentAgency.findById(agencyCoord.id)
        if (agency) {
          await agency.deactivateEmergency(userId)
          agencyCoord.status = 'DEACTIVATED'
          agencyCoord.deactivatedAt = new Date()
        }
      } catch (error) {
        console.error(`Failed to deactivate emergency for agency ${agencyCoord.name}:`, error)
      }
    }
  }

  // Get active emergencies
  getActiveEmergencies(userClearance = 'top-secret') {
    const emergencies = Array.from(this.activeEmergencies.values())

    // Filter based on clearance
    const clearanceLevels = {
      'none': 0, 'confidential': 1, 'secret': 2,
      'top-secret': 3, 'ts-sci': 4, 'q-clearance': 5
    }

    const userLevel = clearanceLevels[userClearance] || 0

    return emergencies.filter(emergency => {
      const emergencyLevel = clearanceLevels[emergency.classification] || 5
      return userLevel >= emergencyLevel
    })
  }

  // Get emergency statistics
  getEmergencyStats() {
    const emergencies = Array.from(this.activeEmergencies.values())

    return {
      totalActive: emergencies.length,
      byLevel: emergencies.reduce((acc, emergency) => {
        acc[emergency.level] = (acc[emergency.level] || 0) + 1
        return acc
      }, {}),
      byType: emergencies.reduce((acc, emergency) => {
        acc[emergency.type] = (acc[emergency.type] || 0) + 1
        return acc
      }, {}),
      agenciesCoordinated: emergencies.reduce((acc, emergency) => {
        return acc + emergency.coordination.agencies.length
      }, 0)
    }
  }

  // Clear old emergencies (for maintenance)
  clearOldEmergencies(maxAgeHours = 168) { // 7 days default
    const maxAge = maxAgeHours * 60 * 60 * 1000 // Convert to milliseconds
    const cutoffTime = Date.now() - maxAge

    for (const [id, emergency] of this.activeEmergencies) {
      if (emergency.declaredAt.getTime() < cutoffTime) {
        this.activeEmergencies.delete(id)
      }
    }
  }
}

export default new EmergencyResponseEngine()
