import mongoose from 'mongoose'

const threatIntelSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
    required: true
  },
  source: {
    type: String,
    required: true,
    trim: true
  },
  sourceUrl: {
    type: String,
    trim: true
  },
  publishedAt: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }],
  iocs: [{
    type: {
      type: String,
      enum: ['ip', 'domain', 'hash', 'url', 'email']
    },
    value: String,
    indicator: String,
    confidence: {
      type: Number,
      min: 0,
      max: 100,
      default: 50
    }
  }],
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  category: {
    type: String,
    enum: ['malware', 'phishing', 'ransomware', 'apt', 'zero-day', 'vulnerability', 'other'],
    default: 'other'
  }
}, {
  timestamps: true
})

// Indexes for better query performance
threatIntelSchema.index({ severity: 1, publishedAt: -1 })
threatIntelSchema.index({ source: 1 })
threatIntelSchema.index({ tags: 1 })
threatIntelSchema.index({ 'iocs.value': 1 })
threatIntelSchema.index({ isActive: 1, publishedAt: -1 })

const ThreatIntel = mongoose.models.ThreatIntel || mongoose.model('ThreatIntel', threatIntelSchema)

export default ThreatIntel
