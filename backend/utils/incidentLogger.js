import Incident from '../models/Incident.js'

/**
 * Global Incident Logger
 * Centralized logging utility for security incidents across all scanners
 */

/**
 * Enhanced Enterprise Incident Logger
 * Advanced incident management with workflow, SLA tracking, and correlation
 */

/**
 * Log a security incident with full enterprise features
 * @param {Object} incidentData
 * @param {string} incidentData.type - Incident type enum
 * @param {string} incidentData.severity - CRITICAL, HIGH, MEDIUM, LOW, INFO
 * @param {string} incidentData.message - Human-readable incident message
 * @param {string} incidentData.description - Detailed incident description
 * @param {Object} incidentData.details - Additional context
 * @param {string} incidentData.source - System/component that detected the incident
 * @param {Object} incidentData.threatDetails - Technical threat details
 * @param {string} incidentData.actionSuggested - Recommended action
 * @param {Array} incidentData.affectedAssets - Assets affected by incident
 * @param {string} incidentData.businessImpact - Business impact level
 * @param {string} incidentData.rootCause - Identified root cause
 * @param {Array} incidentData.tags - Categorization tags
 * @param {Number} incidentData.confidence - Detection confidence (0-100)
 * @param {Object} userId - User ID associated with incident (ObjectId)
 */
export async function logIncident({
  type,
  severity = 'MEDIUM',
  message,
  description = '',
  details = {},
  source = 'system_scanner',
  threatDetails = {},
  actionSuggested = '',
  affectedAssets = [],
  businessImpact = 'LOW',
  rootCause = '',
  tags = [],
  confidence = 90,
  userId = null,
  campaignId = null,
  campaignName = null
}) {
  try {
    // Generate unique incident ID with timestamp and entropy
    const timestamp = Date.now().toString(36)
    const entropy = Math.random().toString(36).substr(2, 5).toUpperCase()
    const incidentId = `INC-${timestamp}-${entropy}`

    // Auto-assign SLA times based on severity
    const slaTimes = {
      'CRITICAL': { response: 5, resolution: 15 },
      'HIGH': { response: 15, resolution: 60 },
      'MEDIUM': { response: 30, resolution: 120 },
      'LOW': { response: 120, resolution: 480 },
      'INFO': { response: 1440, resolution: 2880 } // 24h response, 48h resolution
    }

    // Auto-assign to security team based on severity
    const teamAssignment = {
      'CRITICAL': 'LEVEL3',
      'HIGH': 'LEVEL2',
      'MEDIUM': 'LEVEL1',
      'LOW': 'SOC',
      'INFO': 'SOC'
    }

    // Create comprehensive incident document
    const incidentData = {
      id: incidentId,
      type,
      severity,
      message,
      description,
      details,
      source,
      threatDetails,
      actionSuggested,
      affectedAssets,
      businessImpact,
      tags,
      confidence,
      campaignId,
      campaignName,
      statusHistory: [{
        status: 'INITIAL',
        timestamp: new Date(),
        user: userId,
        notes: `Incident created by ${source}`
      }],

      // SLA Configuration
      sla: {
        responseTimeMinutes: slaTimes[severity]?.response || 60,
        resolutionTimeMinutes: slaTimes[severity]?.resolution || 120,
        breached: false
      },

      // Auto-assignment based on severity
      assignedTeam: teamAssignment[severity] || 'SOC',

      // Legacy compatibility
      resolved: false,
      userId, // Deprecated, use assignee instead

      // Root cause if provided
      ...(rootCause && { rootCause })
    }

    const incident = new Incident(incidentData)

    // Save to database
    await incident.save()

    console.log(`🚨 Enterprise Incident Logged: ${severity}[${incident.priority}] ${type} - ${message}`)
    console.log(`   ↳ SLA: ${incident.sla.responseTimeMinutes}m response, ${incident.sla.resolutionTimeMinutes}m resolution`)
    console.log(`   ↳ Assignee: ${incident.assignedTeam} team, Confidence: ${confidence}%`)

    // Trigger automated actions for critical incidents
    if (severity === 'CRITICAL') {
      await triggerAutomatedActions(incident)
    }

    return incident

  } catch (error) {
    console.error('❌ Enterprise Incident Logging Failed:', error.message)
    return null
  }
}

/**
 * Trigger automated containment actions for critical incidents
 */
async function triggerAutomatedActions(incident) {
  try {
    console.log(`🤖 Triggering automated actions for CRITICAL incident: ${incident.id}`)

    // Example automated actions
    const actions = []

    switch (incident.type) {
      case 'malware':
        actions.push({
          action: 'Isolate affected system from network',
          result: 'Automated isolation initiated',
          automated: true
        })
        break

      case 'phishing':
        actions.push({
          action: 'Deploy anti-phishing signatures',
          result: 'Global signature deployment initiated',
          automated: true
        })
        break

      case 'malicious_url':
        actions.push({
          action: 'Block malicious URL globally',
          result: 'URL block rules deployed',
          automated: true
        })
        break

      default:
        actions.push({
          action: 'Escalate to Level 3 team',
          result: 'Priority escalation initiated',
          automated: true
        })
    }

    // Update incident with containment actions
    await Incident.findOneAndUpdate(
      { id: incident.id },
      {
        $set: { status: 'CONTAINED' },
        $push: {
          statusHistory: {
            status: 'CONTAINED',
            timestamp: new Date(),
            notes: 'Automated containment actions executed'
          },
          containmentActions: { $each: actions }
        }
      }
    )

  } catch (error) {
    console.error('❌ Failed to trigger automated actions:', error.message)
  }
}

/**
 * Update incident status (for resolution tracking)
 */
export async function resolveIncident(incidentId) {
  try {
    const incident = await Incident.findOneAndUpdate(
      { id: incidentId },
      { resolved: true },
      { new: true }
    )
    return incident
  } catch (error) {
    console.error('Failed to resolve incident:', error.message)
    return null
  }
}

/**
 * Get recent incidents for dashboard polling
 */
export async function getRecentIncidents(limit = 50) {
  try {
    const incidents = await Incident.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate('userId', 'username email')
    return incidents
  } catch (error) {
    console.error('Failed to fetch recent incidents:', error.message)
    return []
  }
}

/**
 * Get unresolved high-priority incidents
 */
export async function getUnresolvedIncidents() {
  try {
    const incidents = await Incident.find({
      resolved: false,
      severity: { $in: ['HIGH', 'MEDIUM'] }
    })
      .sort({ createdAt: -1 })
      .populate('userId', 'username email')
    return incidents
  } catch (error) {
    console.error('Failed to fetch unresolved incidents:', error.message)
    return []
  }
}

/**
 * Update incident status with workflow tracking
 */
export async function updateIncidentStatus(incidentId, status, userId = null, notes = '') {
  try {
    const statusHistoryEntry = {
      status,
      timestamp: new Date(),
      user: userId,
      notes: notes || `Status changed to ${status}`
    }

    const incident = await Incident.findOneAndUpdate(
      { id: incidentId },
      {
        $set: { status, updatedAt: new Date() },
        $push: { statusHistory: statusHistoryEntry }
      },
      { new: true }
    ).populate(['assignee', 'userId'])

    // Calculate SLA metrics if incident is being resolved
    if (status === 'RESOLVED' || status === 'CLOSED') {
      const resolvedTime = new Date()
      const totalTimeMinutes = Math.floor((resolvedTime - incident.createdAt) / (1000 * 60))

      await Incident.findOneAndUpdate(
        { id: incidentId },
        {
          'sla.actualResolutionTimeMinutes': totalTimeMinutes,
          resolved: true
        }
      )
    }

    return incident
  } catch (error) {
    console.error('Failed to update incident status:', error.message)
    return null
  }
}

/**
 * Assign incident to user/team
 */
export async function assignIncident(incidentId, assigneeId, assignedTeam, userId = null, notes = '') {
  try {
    const assignmentHistory = {
      status: 'ASSIGNED',
      timestamp: new Date(),
      user: userId,
      notes: notes || `Assigned to ${assignedTeam} team`
    }

    const incident = await Incident.findOneAndUpdate(
      { id: incidentId },
      {
        $set: {
          assignee: assigneeId,
          assignedTeam,
          updatedAt: new Date()
        },
        $push: { statusHistory: assignmentHistory }
      },
      { new: true }
    ).populate(['assignee', 'userId'])

    return incident
  } catch (error) {
    console.error('Failed to assign incident:', error.message)
    return null
  }
}

/**
 * Escalate incident with reasoning
 */
export async function escalateIncident(incidentId, escalationReason, userId = null) {
  try {
    const escalationTimestamp = new Date()
    const escalationNotes = `Incident escalated: ${escalationReason}`

    const incident = await Incident.findOneAndUpdate(
      { id: incidentId },
      {
        $set: {
          escalatedAt: escalationTimestamp,
          escalationReason,
          assignedTeam: 'LEVEL3', // Escalate to highest level
          updatedAt: new Date()
        },
        $push: {
          statusHistory: {
            status: 'ESCALATED',
            timestamp: escalationTimestamp,
            user: userId,
            notes: escalationNotes
          }
        }
      },
      { new: false } // Get old version to return escalation info
    )

    // Send escalation notification (simulated)
    console.log(`🚩 INCIDENT ESCALATION: ${incident.id} - ${escalationReason}`)
    console.log(`   ↳ Escalated to LEVEL3 team at ${escalationTimestamp.toISOString()}`)

    // Return updated incident
    return await Incident.findOne({ id: incidentId }).populate(['assignee', 'userId'])
  } catch (error) {
    console.error('Failed to escalate incident:', error.message)
    return null
  }
}

/**
 * Add investigation notes to incident
 */
export async function addInvestigation(incidentId, userId, action, notes = '', evidence = {}) {
  try {
    const investigationEntry = {
      user: userId,
      timestamp: new Date(),
      action,
      notes,
      evidence
    }

    const incident = await Incident.findOneAndUpdate(
      { id: incidentId },
      {
        $push: { investigations: investigationEntry },
        $set: { updatedAt: new Date() }
      },
      { new: true }
    ).populate(['assignee', 'userId'])

    return incident
  } catch (error) {
    console.error('Failed to add investigation:', error.message)
    return null
  }
}

/**
 * Correlate incidents (group related events)
 */
export async function correlateIncidents(primaryIncidentId, relatedIncidentIds, correlationType = 'related', userId = null) {
  try {
    const correlationData = {
      primary: primaryIncidentId,
      related: relatedIncidentIds,
      type: correlationType,
      correlatedBy: userId,
      correlatedAt: new Date()
    }

    // Update primary incident
    await Incident.findOneAndUpdate(
      { id: primaryIncidentId },
      {
        $set: { updatedAt: new Date() },
        $push: {
          relatedIncidents: relatedIncidentIds.map(id => ({
            incidentId: id,
            relationType: correlationType
          }))
        }
      }
    )

    // Update related incidents
    for (const relatedId of relatedIncidentIds) {
      await Incident.findOneAndUpdate(
        { id: relatedId },
        {
          $set: { updatedAt: new Date() },
          $push: {
            relatedIncidents: {
              incidentId: primaryIncidentId,
              relationType: correlationType === 'parent' ? 'child' : correlationType === 'child' ? 'parent' : correlationType
            }
          }
        }
      )
    }

    return correlationData
  } catch (error) {
    console.error('Failed to correlate incidents:', error.message)
    return null
  }
}

/**
 * Get incidents with advanced filtering
 */
export async function getIncidentsWithFilters({
  status = null,
  severity = null,
  type = null,
  assignee = null,
  assignedTeam = null,
  slaStatus = null,
  limit = 50,
  sortBy = 'createdAt',
  sortOrder = -1,
  tags = [],
  source = null
} = {}) {
  try {
    const query = {}

    // Build dynamic query based on filters
    if (status && status !== 'ALL') query.status = status
    if (severity && severity !== 'ALL') query.severity = severity
    if (type && type !== 'ALL') query.type = type
    if (assignee) query.assignee = assignee
    if (assignedTeam && assignedTeam !== 'ALL') query.assignedTeam = assignedTeam
    if (source) query.source = source
    if (tags.length > 0) query.tags = { $in: tags }

    // SLA status filter
    if (slaStatus && slaStatus !== 'ALL') {
      query['sla.breached'] = slaStatus === 'BREACHED'
    }

    const incidents = await Incident.find(query)
      .sort({ [sortBy]: sortOrder })
      .limit(limit)
      .populate(['assignee', 'userId'])
      .lean()

    return incidents
  } catch (error) {
    console.error('Failed to fetch incidents with filters:', error.message)
    return []
  }
}

/**
 * Get incident analytics and metrics
 */
export async function getIncidentAnalytics(startDate = null, endDate = null) {
  try {
    const dateFilter = startDate && endDate ? {
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) }
    } : {}

    const [
      totalIncidents,
      resolvedIncidents,
      activeIncidents,
      severityBreakdown,
      typeBreakdown,
      slaMetrics,
      responseMetrics
    ] = await Promise.all([
      Incident.countDocuments(dateFilter),
      Incident.countDocuments({ ...dateFilter, status: { $in: ['RESOLVED', 'CLOSED'] } }),
      Incident.countDocuments({ ...dateFilter, status: { $nin: ['RESOLVED', 'CLOSED'] } }),
      Incident.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$severity', count: { $sum: 1 } } }
      ]),
      Incident.aggregate([
        { $match: dateFilter },
        { $group: { _id: '$type', count: { $sum: 1 } } }
      ]),
      Incident.aggregate([
        { $match: { ...dateFilter, status: { $in: ['RESOLVED', 'CLOSED'] } } },
        {
          $group: {
            _id: null,
            avgMTTR: { $avg: '$sla.actualResolutionTimeMinutes' },
            breachedCount: { $sum: { $cond: ['$sla.breached', 1, 0] } }
          }
        }
      ]),
      Incident.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: '$assignedTeam',
            incidentCount: { $sum: 1 },
            avgResolutionTime: { $avg: '$sla.actualResolutionTimeMinutes' }
          }
        }
      ])
    ])

    return {
      summary: {
        total: totalIncidents,
        resolved: resolvedIncidents,
        active: activeIncidents,
        resolutionRate: totalIncidents > 0 ? Math.round((resolvedIncidents / totalIncidents) * 100) : 0
      },
      severityBreakdown,
      typeBreakdown,
      slaMetrics: slaMetrics[0] || {},
      responseMetrics,
      generatedAt: new Date().toISOString()
    }
  } catch (error) {
    console.error('Failed to get incident analytics:', error.message)
    return {}
  }
}

/**
 * Close incident with lessons learned
 */
export async function closeIncident(incidentId, rootCause = '', lessonsLearned = '', userId = null) {
  return await updateIncidentStatus(
    incidentId,
    'CLOSED',
    userId,
    `Closed with root cause: ${rootCause}. Lessons learned: ${lessonsLearned}`
  ).then(async (incident) => {
    if (incident) {
      await Incident.findOneAndUpdate(
        { id: incidentId },
        {
          $set: {
            rootCause,
            lessonsLearned,
            'sla.breached': incident.slaStatus === 'BREACHED',
            updatedAt: new Date()
          }
        },
        { new: true }
      )
    }
    return incident
  })
}

export default {
  logIncident,
  resolveIncident,
  updateIncidentStatus,
  assignIncident,
  escalateIncident,
  addInvestigation,
  correlateIncidents,
  getRecentIncidents,
  getUnresolvedIncidents,
  getIncidentsWithFilters,
  getIncidentAnalytics,
  closeIncident
}
