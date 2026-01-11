import mongoose from 'mongoose'

const governmentAgencySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['federal', 'state', 'local', 'military', 'intelligence'],
    required: true
  },
  classification: {
    type: String,
    enum: ['unclassified', 'confidential', 'secret', 'top-secret', 'ts-sci'],
    default: 'unclassified'
  },
  jurisdiction: {
    country: { type: String, default: 'USA' },
    state: String,
    region: String
  },
  parentAgency: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GovernmentAgency'
  },
  childAgencies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GovernmentAgency'
  }],
  securityClearance: {
    level: {
      type: String,
      enum: ['none', 'confidential', 'secret', 'top-secret', 'ts-sci', 'q-clearance'],
      default: 'none'
    },
    grantedBy: String,
    grantDate: Date,
    reviewDate: Date
  },
  contactInfo: {
    primaryContact: String,
    email: String,
    phone: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    }
  },
  capabilities: [{
    type: String,
    enum: [
      'threat-intelligence',
      'incident-response',
      'vulnerability-assessment',
      'compliance-monitoring',
      'critical-infrastructure',
      'law-enforcement',
      'intelligence-collection',
      'cyber-operations',
      'quantum-defense',
      'emergency-response'
    ]
  }],
  operationalStatus: {
    type: String,
    enum: ['active', 'standby', 'deactivated', 'emergency'],
    default: 'active'
  },
  threatLevel: {
    current: {
      type: String,
      enum: ['low', 'moderate', 'high', 'critical', 'emergency'],
      default: 'low'
    },
    lastUpdated: Date,
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  resources: {
    personnel: {
      cyberSecurity: { type: Number, default: 0 },
      analysts: { type: Number, default: 0 },
      operators: { type: Number, default: 0 },
      leadership: { type: Number, default: 0 }
    },
    budget: {
      annual: Number,
      cyberSecurity: Number,
      lastUpdated: Date
    },
    systems: {
      siem: Boolean,
      edr: Boolean,
      firewall: Boolean,
      ids: Boolean,
      quantumSafe: Boolean
    }
  },
  compliance: {
    fisma: {
      level: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
      lastAssessment: Date,
      nextAssessment: Date
    },
    fedramp: {
      authorized: Boolean,
      level: { type: String, enum: ['low', 'moderate', 'high'], default: 'low' },
      lastAudit: Date
    },
    nist: {
      framework: String,
      compliance: Number,
      lastReview: Date
    }
  },
  integrations: {
    dhs: Boolean,
    cisa: Boolean,
    nsa: Boolean,
    dod: Boolean,
    fbi: Boolean,
    treasury: Boolean
  },
  emergencyProtocols: {
    cyberEmergency: {
      activated: Boolean,
      level: { type: String, enum: ['1', '2', '3', '4', '5'], default: '1' },
      activatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      activatedAt: Date
    },
    presidentialAlert: Boolean,
    nationalEmergency: Boolean
  },
  auditLogs: [{
    action: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    timestamp: { type: Date, default: Date.now },
    details: mongoose.Schema.Types.Mixed,
    classification: {
      type: String,
      enum: ['unclassified', 'confidential', 'secret', 'top-secret'],
      default: 'unclassified'
    }
  }]
}, {
  timestamps: true
})

// Indexes for performance
governmentAgencySchema.index({ name: 1 })
governmentAgencySchema.index({ code: 1 })
governmentAgencySchema.index({ type: 1 })
governmentAgencySchema.index({ 'jurisdiction.state': 1 })
governmentAgencySchema.index({ 'securityClearance.level': 1 })
governmentAgencySchema.index({ operationalStatus: 1 })

// Virtual for full jurisdiction string
governmentAgencySchema.virtual('fullJurisdiction').get(function() {
  const parts = []
  if (this.jurisdiction.state) parts.push(this.jurisdiction.state)
  if (this.jurisdiction.region) parts.push(this.jurisdiction.region)
  if (this.jurisdiction.country) parts.push(this.jurisdiction.country)
  return parts.join(', ')
})

// Method to activate emergency protocol
governmentAgencySchema.methods.activateEmergency = function(level, userId) {
  this.emergencyProtocols.cyberEmergency = {
    activated: true,
    level: level,
    activatedBy: userId,
    activatedAt: new Date()
  }
  this.operationalStatus = 'emergency'

  // Log the activation
  this.auditLogs.push({
    action: 'EMERGENCY_ACTIVATED',
    performedBy: userId,
    details: { level: level, timestamp: new Date() },
    classification: 'top-secret'
  })

  return this.save()
}

// Method to deactivate emergency protocol
governmentAgencySchema.methods.deactivateEmergency = function(userId) {
  this.emergencyProtocols.cyberEmergency = {
    activated: false,
    level: '1',
    activatedBy: userId,
    activatedAt: new Date()
  }
  this.operationalStatus = 'active'

  // Log the deactivation
  this.auditLogs.push({
    action: 'EMERGENCY_DEACTIVATED',
    performedBy: userId,
    details: { timestamp: new Date() },
    classification: 'secret'
  })

  return this.save()
}

export default mongoose.model('GovernmentAgency', governmentAgencySchema)
