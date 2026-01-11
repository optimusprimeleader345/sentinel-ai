// Enterprise Incident Response Controller
// Advanced incident management with workflow, SLA tracking, and correlation

import Incident from '../models/Incident.js'
import {
  getRecentIncidents,
  getUnresolvedIncidents,
  resolveIncident,
  updateIncidentStatus,
  assignIncident,
  escalateIncident,
  addInvestigation,
  correlateIncidents,
  getIncidentsWithFilters,
  getIncidentAnalytics,
  closeIncident
} from '../utils/incidentLogger.js'

/**
 * Get recent incidents for dashboard
 */
export const getRecentIncidentsController = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 50
    const incidents = await getRecentIncidents(limit)
    res.json(incidents)
  } catch (error) {
    console.error('Error fetching recent incidents:', error)
    res.status(500).json({ message: 'Failed to fetch incidents' })
  }
}

/**
 * Get unresolved incidents
 */
export const getUnresolvedIncidentsController = async (req, res) => {
  try {
    const incidents = await getUnresolvedIncidents()
    res.json(incidents)
  } catch (error) {
    console.error('Error fetching unresolved incidents:', error)
    res.status(500).json({ message: 'Failed to fetch unresolved incidents' })
  }
}

/**
 * Update incident status with workflow tracking
 */
export const updateIncidentStatusController = async (req, res) => {
  try {
    const { incidentId } = req.params
    const { status, notes } = req.body
    const userId = req.user?.id

    const incident = await updateIncidentStatus(incidentId, status, userId, notes)

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }

    res.json({
      success: true,
      incident,
      statusHistory: incident.statusHistory[incident.statusHistory.length - 1]
    })
  } catch (error) {
    console.error('Error updating incident status:', error)
    res.status(500).json({ message: 'Failed to update incident status' })
  }
}

/**
 * Assign incident to user/team
 */
export const assignIncidentController = async (req, res) => {
  try {
    const { incidentId } = req.params
    const { assigneeId, assignedTeam, notes } = req.body
    const userId = req.user?.id

    const incident = await assignIncident(incidentId, assigneeId, assignedTeam, userId, notes)

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }

    res.json({
      success: true,
      incident,
      message: `Incident assigned to ${assignedTeam} team`
    })
  } catch (error) {
    console.error('Error assigning incident:', error)
    res.status(500).json({ message: 'Failed to assign incident' })
  }
}

/**
 * Escalate incident
 */
export const escalateIncidentController = async (req, res) => {
  try {
    const { incidentId } = req.params
    const { escalationReason } = req.body
    const userId = req.user?.id

    const incident = await escalateIncident(incidentId, escalationReason, userId)

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }

    res.json({
      success: true,
      incident,
      message: 'Incident escalated to Level 3 team'
    })
  } catch (error) {
    console.error('Error escalating incident:', error)
    res.status(500).json({ message: 'Failed to escalate incident' })
  }
}

/**
 * Add investigation notes
 */
export const addInvestigationController = async (req, res) => {
  try {
    const { incidentId } = req.params
    const { action, notes, evidence } = req.body
    const userId = req.user?.id

    const incident = await addInvestigation(incidentId, userId, action, notes, evidence)

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }

    res.json({
      success: true,
      incident,
      investigation: incident.investigations[incident.investigations.length - 1]
    })
  } catch (error) {
    console.error('Error adding investigation:', error)
    res.status(500).json({ message: 'Failed to add investigation' })
  }
}

/**
 * Correlate incidents
 */
export const correlateIncidentsController = async (req, res) => {
  try {
    const { primaryIncidentId } = req.params
    const { relatedIncidentIds, correlationType } = req.body
    const userId = req.user?.id

    const correlation = await correlateIncidents(primaryIncidentId, relatedIncidentIds, correlationType, userId)

    res.json({
      success: true,
      correlation,
      message: `${relatedIncidentIds.length} incidents correlated`
    })
  } catch (error) {
    console.error('Error correlating incidents:', error)
    res.status(500).json({ message: 'Failed to correlate incidents' })
  }
}

/**
 * Resolve an incident (legacy)
 */
export const resolveIncidentController = async (req, res) => {
  try {
    const { incidentId } = req.params
    const incident = await resolveIncident(incidentId)

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }

    res.json(incident)
  } catch (error) {
    console.error('Error resolving incident:', error)
    res.status(500).json({ message: 'Failed to resolve incident' })
  }
}

/**
 * Close incident with root cause and lessons learned
 */
export const closeIncidentController = async (req, res) => {
  try {
    const { incidentId } = req.params
    const { rootCause, lessonsLearned } = req.body
    const userId = req.user?.id

    const incident = await closeIncident(incidentId, rootCause, lessonsLearned, userId)

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }

    res.json({
      success: true,
      incident,
      message: 'Incident closed successfully'
    })
  } catch (error) {
    console.error('Error closing incident:', error)
    res.status(500).json({ message: 'Failed to close incident' })
  }
}

/**
 * Get incident summary stats (enhanced)
 */
export const getSummaryController = async (req, res) => {
  try {
    const incidents = await getRecentIncidents(1000)

    const summary = {
      total: incidents.length,
      active: incidents.filter(i => !i.resolved).length,
      resolved: incidents.filter(i => i.resolved).length,
      critical: incidents.filter(i => i.severity === 'CRITICAL').length,
      high: incidents.filter(i => i.severity === 'HIGH').length,
      medium: incidents.filter(i => i.severity === 'MEDIUM').length,
      low: incidents.filter(i => i.severity === 'LOW').length,
      info: incidents.filter(i => i.severity === 'INFO').length,

      // SLA metrics
      slaBreached: incidents.filter(i => i.sla?.breached).length,
      avgMTTR: incidents.filter(i => i.sla?.actualResolutionTimeMinutes)
        .reduce((sum, i) => sum + i.sla.actualResolutionTimeMinutes, 0) /
        incidents.filter(i => i.sla?.actualResolutionTimeMinutes).length || 0,

      // Team distribution
      byTeam: {
        LEVEL3: incidents.filter(i => i.assignedTeam === 'LEVEL3').length,
        LEVEL2: incidents.filter(i => i.assignedTeam === 'LEVEL2').length,
        LEVEL1: incidents.filter(i => i.assignedTeam === 'LEVEL1').length,
        SOC: incidents.filter(i => i.assignedTeam === 'SOC').length
      },

      lastUpdated: new Date().toISOString()
    }

    res.json(summary)
  } catch (error) {
    console.error('Error getting incident summary:', error)
    res.status(500).json({ message: 'Failed to get incident summary' })
  }
}

/**
 * Get incidents by type
 */
export const getIncidentsByType = async (req, res) => {
  try {
    const { type } = req.params
    const incidents = await getRecentIncidents(100)
    const filteredIncidents = incidents.filter(i => i.type === type)
    res.json(filteredIncidents)
  } catch (error) {
    console.error('Error getting incidents by type:', error)
    res.status(500).json({ message: 'Failed to get incidents by type' })
  }
}

/**
 * Get incidents with advanced filtering
 */
export const getIncidentsWithFiltersController = async (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      severity: req.query.severity,
      type: req.query.type,
      assignee: req.query.assignee,
      assignedTeam: req.query.assignedTeam,
      slaStatus: req.query.slaStatus,
      limit: parseInt(req.query.limit) || 50,
      sortBy: req.query.sortBy || 'createdAt',
      sortOrder: parseInt(req.query.sortOrder) || -1,
      tags: req.query.tags ? req.query.tags.split(',') : [],
      source: req.query.source
    }

    const incidents = await getIncidentsWithFilters(filters)
    res.json({ incidents, filters })
  } catch (error) {
    console.error('Error getting filtered incidents:', error)
    res.status(500).json({ message: 'Failed to get filtered incidents' })
  }
}

/**
 * Get incident analytics and metrics
 */
export const getIncidentAnalyticsController = async (req, res) => {
  try {
    const { startDate, endDate } = req.query

    const analytics = await getIncidentAnalytics(startDate, endDate)
    res.json(analytics)
  } catch (error) {
    console.error('Error getting incident analytics:', error)
    res.status(500).json({ message: 'Failed to get incident analytics' })
  }
}

/**
 * Get single incident by ID
 */
export const getIncidentByIdController = async (req, res) => {
  try {
    const { incidentId } = req.params

    const incident = await Incident.findOne({ id: incidentId })
      .populate('assignee', 'username email')
      .populate('userId', 'username email')
      .populate('statusHistory.user', 'username email')
      .populate('investigations.user', 'username email')

    if (!incident) {
      return res.status(404).json({ message: 'Incident not found' })
    }

    res.json(incident)
  } catch (error) {
    console.error('Error getting incident by ID:', error)
    res.status(500).json({ message: 'Failed to get incident' })
  }
}

/**
 * Test endpoint to create a sample incident for demonstration
 */
export const createTestIncidentController = async (req, res) => {
  try {
    const { logIncident } = await import('../utils/incidentLogger.js')

    // Create a realistic test incident
    const incident = await logIncident({
      type: 'malware',
      severity: 'HIGH',
      message: 'Malicious file detected in email attachment',
      description: 'Employee received a malicious executable disguised as a PDF document. The file was detected by the mail security gateway and quarantined.',
      details: {
        fileName: 'invoice_january.pdf.exe',
        fileSize: '2.3MB',
        sender: 'supplier@example.com',
        recipient: 'john.doe@company.com',
        detectionMethod: 'signature-based',
        hash: 'sha256:abc123...'
      },
      source: 'email_gateway',
      threatDetails: {
        malwareFamily: 'Emotet',
        confidence: 95,
        cveIds: ['CVE-2024-1234']
      },
      actionSuggested: 'Quarantine the email, notify the user, scan endpoint for infection, update security policies.',
      affectedAssets: [{
        assetId: 'WS-001234',
        assetName: 'Windows Workstation JD-01',
        assetType: 'workstation',
        criticality: 'HIGH'
      }],
      businessImpact: 'HIGH',
      userId: null,
      confidence: 95
    })

    if (incident) {
      console.log(`🧪 Test incident created: ${incident.id}`)
      res.json({
        success: true,
        message: 'Test incident created successfully',
        incident: {
          id: incident.id,
          type: incident.type,
          severity: incident.severity,
          message: incident.message,
          status: incident.status,
          priority: incident.priority
        }
      })
    } else {
      res.status(500).json({ message: 'Failed to create test incident' })
    }
  } catch (error) {
    console.error('Error creating test incident:', error)
    res.status(500).json({ message: error.message })
  }
}
