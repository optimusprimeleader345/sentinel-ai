import mongoose from 'mongoose'

const scanSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: [
      'vulnerability',
      'port',
      'web',
      'network',
      'compliance',
      'phishing',
      'deepfake',
      'behavior',
      'threat-hunt',
      'performance'
    ],
    required: true
  },
  status: {
    type: String,
    enum: [
      'scheduled',
      'running',
      'completed',
      'failed',
      'cancelled',
      'paused'
    ],
    default: 'scheduled'
  },
  target: {
    type: {
      type: String,
      enum: ['ip', 'range', 'domain', 'url', 'user', 'group'],
      required: true
    },
    value: {
      type: String,
      required: true
    }
  },
  scanner: {
    name: String,
    version: String,
    engine: {
      type: String,
      enum: ['nmap', 'nessus', 'openvas', 'owasp-zap', 'nuclei', 'metasploit', 'custom']
    },
    configuration: mongoose.Schema.Types.Mixed
  },
  schedule: {
    enabled: {
      type: Boolean,
      default: false
    },
    cronExpression: String,
    nextRun: Date,
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  progress: {
    current: {
      type: Number,
      default: 0
    },
    total: {
      type: Number,
      default: 0
    },
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    message: String,
    eta: Date
  },
  results: {
    summary: {
      high: { type: Number, default: 0 },
      medium: { type: Number, default: 0 },
      low: { type: Number, default: 0 },
      info: { type: Number, default: 0 },
      total: { type: Number, default: 0 }
    },
    findings: [{
      type: {
        type: String,
        enum: ['vulnerability', 'port', 'service', 'anomaly', 'compliance-issue', 'threat']
      },
      severity: {
        type: String,
        enum: ['critical', 'high', 'medium', 'low', 'info'],
        default: 'info'
      },
      confidence: {
        type: Number,
        min: 0,
        max: 100,
        default: 50
      },
      title: String,
      description: String,
      cve: [String],
      cwe: String,
      cvss: {
        score: Number,
        vector: String,
        severity: String
      },
      location: String,
      evidence: String,
      remediation: String,
      references: [String],
      tags: [String],
      metadata: mongoose.Schema.Types.Mixed
    }],
    rawData: mongoose.Schema.Types.Mixed
  },
  configuration: {
    ports: String, // e.g., "1-1024,3389"
    timing: {
      type: String,
      enum: ['paranoid', 'sneaky', 'polite', 'normal', 'aggressive', 'insane'],
      default: 'normal'
    },
    maxHosts: Number,
    maxRate: Number,
    timeout: Number,
    stealth: Boolean,
    versionDetection: Boolean,
    osDetection: Boolean,
    scriptScanning: Boolean,
    serviceDiscovery: Boolean,
    aggressiveScan: Boolean
  },
  duration: Number, // in milliseconds
  startedAt: Date,
  completedAt: Date,
  errorMessage: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  organization: String,
  tags: [String],
  logs: [{
    timestamp: {
      type: Date,
      default: Date.now
    },
    level: {
      type: String,
      enum: ['info', 'warn', 'error', 'debug'],
      default: 'info'
    },
    message: String,
    metadata: mongoose.Schema.Types.Mixed
  }]
}, {
  timestamps: true
})

// Indexes for performance
scanSchema.index({ 'target.value': 1 })
scanSchema.index({ type: 1 })
scanSchema.index({ status: 1 })
scanSchema.index({ createdBy: 1 })
scanSchema.index({ createdAt: -1 })
scanSchema.index({ 'results.summary.high': -1 })
scanSchema.index({ 'progress.percentage': 1 })

// Virtual for duration calculation
scanSchema.virtual('calculatedDuration').get(function() {
  if (this.startedAt && this.completedAt) {
    return this.completedAt - this.startedAt
  }
  if (this.startedAt && !this.completedAt) {
    return Date.now() - this.startedAt
  }
  return 0
})

// Virtual for active status
scanSchema.virtual('isActive').get(function() {
  return ['running', 'scheduled'].includes(this.status)
})

// Static method to find active scans
scanSchema.statics.findActive = function() {
  return this.find({
    status: { $in: ['running', 'scheduled'] }
  }).sort({ createdAt: -1 })
}

// Instance method to update progress
scanSchema.methods.updateProgress = function(current, total, message = '') {
  this.progress.current = current
  this.progress.total = total || this.progress.total
  this.progress.percentage = total > 0 ? Math.round((current / total) * 100) : 0
  this.progress.message = message

  // Estimate completion time
  if (current > 0 && this.startedAt) {
    const elapsed = Date.now() - this.startedAt
    const estimated = (elapsed / current) * total
    this.progress.eta = new Date(Date.now() + (estimated - elapsed))
  }

  return this.save()
}

// Instance method to add findings
scanSchema.methods.addFinding = function(finding) {
  this.results.findings.push(finding)

  // Update summary
  this.results.summary[finding.severity] += 1
  this.results.summary.total += 1

  return this.save()
}

export default mongoose.model('Scan', scanSchema)
