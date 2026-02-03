import mongoose from 'mongoose'

const organizationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  domain: {
    type: String,
    trim: true,
    lowercase: true
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'starter', 'professional', 'enterprise', 'custom'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'suspended', 'cancelled', 'trial'],
      default: 'trial'
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: Date,
    maxUsers: {
      type: Number,
      default: 5
    },
    features: [{
      type: String,
      enum: [
        'threat-intelligence',
        'ai-analysis',
        'dark-web-monitoring',
        'incident-response',
        'compliance-reporting',
        'advanced-analytics',
        'api-access',
        'custom-integrations'
      ]
    }]
  },
  settings: {
    timezone: {
      type: String,
      default: 'UTC'
    },
    locale: {
      type: String,
      default: 'en-US'
    },
    notifications: {
      email: { type: Boolean, default: true },
      sms: { type: Boolean, default: false },
      webhook: { type: Boolean, default: false }
    },
    dataRetention: {
      type: Number,
      default: 90
    }
  },
  billing: {
    contactEmail: String,
    contactName: String,
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String
    },
    taxId: String
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
})

// Indexes
organizationSchema.index({ slug: 1 })
organizationSchema.index({ domain: 1 })
organizationSchema.index({ 'subscription.status': 1 })
organizationSchema.index({ isActive: 1 })
organizationSchema.index({ createdAt: -1 })

// Virtual for user count
organizationSchema.virtual('userCount', {
  ref: 'User',
  localField: '_id',
  foreignField: 'organization',
  count: true
})

// Methods
organizationSchema.methods.isSubscriptionActive = function() {
  if (!this.isActive) return false
  if (this.subscription.status !== 'active' && this.subscription.status !== 'trial') return false
  if (this.subscription.endDate && this.subscription.endDate < new Date()) {
    return false
  }
  return true
}

organizationSchema.methods.hasFeature = function(feature) {
  if (this.subscription.plan === 'enterprise' || this.subscription.plan === 'custom') {
    return true
  }
  return this.subscription.features.includes(feature)
}

// Pre-save middleware to generate slug
organizationSchema.pre('save', async function(next) {
  if (this.isModified('name') && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }
  next()
})

export default mongoose.model('Organization', organizationSchema)
