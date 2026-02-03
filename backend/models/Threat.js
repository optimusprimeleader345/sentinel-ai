import mongoose from 'mongoose'

const threatSchema = new mongoose.Schema({
  indicator: {
    type: {
      type: String,
      enum: ['ip', 'domain', 'url', 'hash', 'email', 'signature', 'ioc'],
      required: true
    },
    value: {
      type: String,
      required: true,
      trim: true
    }
  },
  type: {
    type: String,
    enum: [
      'malware',
      'phishing',
      'ddos',
      'ransomware',
      'data-breach',
      'insider-threat',
      'zero-day',
      'apt',
      'supply-chain',
      'web-attack'
    ],
    required: true
  },
  severity: {
    type: String,
    enum: ['critical', 'high', 'medium', 'low', 'info'],
    default: 'medium'
  },
  confidence: {
    type: Number,
    min: 0,
    max: 100,
    default: 50
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'false-positive', 'mitigated'],
    default: 'active'
  },
  source: {
    type: String,
    enum: ['internal', 'external', 'otx', 'abuse.ch', 'mitre', 'virus-total', 'malware-bazaar', 'threat-exchange', 'manual'],
    required: true
  },
  sourceId: String, // External system ID

  metadata: {
    description: String,
    attackVector: String,
    targetedEntity: String,
    attribution: String,
    campaign: String,
    technique: {
      mitreTactic: String,
      mitreTechnique: String,
      mitreId: String
    }
  },

  intelligence: {
    firstSeen: Date,
    lastSeen: Date,
    frequency: {
      type: Number,
      default: 0
    },
    riskScore: {
      type: Number,
      min: 0,
      max: 100,
      default: 0
    },
    cvss: {
      score: Number,
      vector: String,
      severity: String
    },
    tags: [String],
    references: [{
      url: String,
      title: String,
      source: String
    }]
  },

  attribution: {
    country: String,
    organization: String,
    operator: String,
    confidence: Number
  },

  detection: {
    method: String,
    signature: String,
    engine: String,
    sensor: String
  },

  response: {
    actionTaken: {
      type: String,
      enum: ['none', 'logged', 'blocked', 'contained', 'quarantined', 'removed'],
      default: 'none'
    },
    automated: {
      type: Boolean,
      default: false
    },
    playbook: String,
    ticketId: String
  },

  context: {
    affectedSystems: [{
      hostname: String,
      ip: String,
      department: String,
      impact: String
    }],
    collateralDamage: String,
    affectedUsers: Number,
    financialImpact: Number
  },

  lifecycle: {
    discovered: Date,
    verified: Date,
    mitigated: Date,
    closed: Date
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false, // Optional for backward compatibility
    index: true
  },
  notes: [{
    author: String,
    content: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }]
}, {
  timestamps: true
})

// Indexes for performance
threatSchema.index({ 'indicator.value': 1 })
threatSchema.index({ 'indicator.type': 1 })
threatSchema.index({ type: 1 })
threatSchema.index({ severity: -1 })
threatSchema.index({ status: 1 })
threatSchema.index({ source: 1 })
threatSchema.index({ confidence: -1 })
threatSchema.index({ 'intelligence.riskScore': -1 })
threatSchema.index({ organization: 1 }) // Organization index
threatSchema.index({ createdAt: -1 })
threatSchema.index({ organization: 1, status: 1 }) // Compound index

// Virtual for activity status
threatSchema.virtual('isActive').get(function() {
  return this.status === 'active'
})

// Virtual for days since last seen
threatSchema.virtual('daysSinceLastSeen').get(function() {
  if (!this.intelligence.lastSeen) return null
  return Math.floor((Date.now() - this.intelligence.lastSeen) / (1000 * 60 * 60 * 24))
})

// Static method to find active threats
threatSchema.statics.findActive = function() {
  return this.find({ status: 'active' }).sort({ 'intelligence.riskScore': -1 })
}

// Static method to find high-risk threats
threatSchema.statics.findHighRisk = function() {
  return this.find({
    status: 'active',
    $or: [
      { severity: 'critical' },
      { severity: 'high' },
      { 'intelligence.riskScore': { $gte: 80 } }
    ]
  }).sort({ 'intelligence.riskScore': -1 })
}

// Instance method to update intelligence
threatSchema.methods.updateIntelligence = function(newData) {
  const now = new Date()

  if (!this.intelligence.firstSeen) {
    this.intelligence.firstSeen = now
  }

  this.intelligence.lastSeen = now
  this.intelligence.frequency += 1

  if (newData.riskScore) {
    this.intelligence.riskScore = newData.riskScore
  }

  if (newData.tags) {
    this.intelligence.tags = [...new Set([...this.intelligence.tags, ...newData.tags])]
  }

  return this.save()
}

// Instance method to mitigate threat
threatSchema.methods.mitigate = function(action, automated = false) {
  this.response.actionTaken = action
  this.response.automated = automated
  this.response.mitigated = new Date()
  this.status = 'mitigated'

  return this.save()
}

export default mongoose.model('Threat', threatSchema)
