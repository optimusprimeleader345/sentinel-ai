import mongoose from 'mongoose'

const incidentSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['malware', 'phishing', 'malicious_url', 'malicious_ip', 'password_breach', 'deepfake', 'browser_threat', 'dDOS', 'data_breach', 'compliance_violation'],
  },
  severity: {
    type: String,
    required: true,
    enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW', 'INFO'],
  },
  priority: {
    type: String,
    enum: ['P0', 'P1', 'P2', 'P3', 'P4'],
    default: function() {
      // Auto-set priority based on severity
      const severityPriority = { 'CRITICAL': 'P0', 'HIGH': 'P1', 'MEDIUM': 'P2', 'LOW': 'P3', 'INFO': 'P4' }
      return severityPriority[this.severity] || 'P4'
    }
  },
  status: {
    type: String,
    required: true,
    enum: ['INITIAL', 'INVESTIGATING', 'CONTAINED', 'RESOLVED', 'CLOSED'],
    default: 'INITIAL'
  },
  message: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxlength: 2000,
  },
  details: {
    type: mongoose.Schema.Types.Mixed,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  source: {
    type: String,
    default: 'system',
  },
  threatDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  actionSuggested: {
    type: String,
  },
  resolved: {
    type: Boolean,
    default: false,
  },

  // Incident Lifecycle Tracking
  statusHistory: [{
    status: {
      type: String,
      enum: ['INITIAL', 'INVESTIGATING', 'CONTAINED', 'RESOLVED', 'CLOSED']
    },
    timestamp: { type: Date, default: Date.now },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    notes: String
  }],

  // Assignment & Workflow
  assignee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  assignedTeam: {
    type: String,
    enum: ['SOC', 'LEVEL1', 'LEVEL2', 'LEVEL3', 'MANAGEMENT'],
  },
  escalatedAt: Date,
  escalationReason: String,

  // SLA & Response Time Tracking
  sla: {
    responseTimeMinutes: { type: Number, default: 15 }, // Expected response time based on severity
    resolutionTimeMinutes: { type: Number, default: 60 },
    breached: { type: Boolean, default: false },
    actualResponseTimeMinutes: Number,
    actualResolutionTimeMinutes: Number,
  },

  // Impact Assessment
  affectedAssets: [{
    assetId: String,
    assetName: String,
    assetType: {
      type: String,
      enum: ['server', 'workstation', 'network_device', 'application', 'user_account', 'email_account']
    },
    criticality: {
      type: String,
      enum: ['CRITICAL', 'HIGH', 'MEDIUM', 'LOW']
    }
  }],
  businessImpact: {
    type: String,
    enum: ['HIGH', 'MEDIUM', 'LOW', 'NONE'],
    default: 'LOW'
  },
  financialImpact: {
    estimate: Number,
    currency: { type: String, default: 'USD' },
    notes: String
  },

  // Investigation & Analysis
  investigations: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    timestamp: { type: Date, default: Date.now },
    action: String,
    notes: String,
    evidence: mongoose.Schema.Types.Mixed
  }],
  rootCause: String,
  lessonsLearned: String,

  // Automatic Actions Taken
  containmentActions: [{
    action: String,
    timestamp: { type: Date, default: Date.now },
    result: String,
    automated: { type: Boolean, default: false }
  }],

  // Communication
  notificationsSent: [{
    type: { type: String, enum: ['email', 'slack', 'sms', 'webhook'] },
    recipient: String,
    sentAt: { type: Date, default: Date.now },
    subject: String,
    success: { type: Boolean, default: true }
  }],

  // Relationships & Correlation
  relatedIncidents: [{
    incidentId: String,
    relationType: {
      type: String,
      enum: ['duplicate', 'related', 'parent', 'child']
    }
  }],
  campaignId: String,
  campaignName: String,

  // Metadata
  tags: [String],
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 90
  },

  // Legacy fields (deprecated)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

// Auto-update updatedAt on save
incidentSchema.pre('save', function(next) {
  this.updatedAt = new Date()
  next()
})

// Virtual for time-to-detect (if we have detection time)
incidentSchema.virtual('timeToDetectMinutes').get(function() {
  if (this.createdAt) {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60))
  }
  return 0
})

// Virtual for current SLA status
incidentSchema.virtual('slaStatus').get(function() {
  if (this.status === 'RESOLVED' || this.status === 'CLOSED') {
    return this.sla.breached ? 'BREACHED' : 'MET'
  }

  const timeElapsed = Date.now() - this.createdAt
  const responseDeadline = this.sla.responseTimeMinutes * 60 * 1000
  const resolutionDeadline = this.sla.resolutionTimeMinutes * 60 * 1000

  if (timeElapsed > resolutionDeadline) {
    return this.sla.breached ? 'BREACHED' : 'BREACHED'
  } else if (timeElapsed > responseDeadline) {
    return 'AT_RISK'
  } else {
    return 'ON_TRACK'
  }
})

// Index for performance
incidentSchema.index({ status: 1, severity: 1, createdAt: -1 })
incidentSchema.index({ assignee: 1, status: 1 })
incidentSchema.index({ type: 1, severity: 1 })

// Virtual for mean time
incidentSchema.methods.getMTTR = function() {
  // Mean Time To Resolution calculation (simplified)
  return this.actualResolutionTimeMinutes || 0
}

const Incident = mongoose.models.Incident || mongoose.model('Incident', incidentSchema)

export default Incident
