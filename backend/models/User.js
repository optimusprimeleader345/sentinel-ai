import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'analyst', 'admin', 'manager', 'superadmin'],
    default: 'user'
  },
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization',
    required: false, // Optional for backward compatibility
    index: true
  },
  organizationRole: {
    type: String,
    enum: ['owner', 'admin', 'member', 'viewer'],
    default: 'member'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date
  },
  loginAttempts: {
    type: Number,
    default: 0
  },
  lockUntil: {
    type: Date
  },
  permissions: [{
    type: String,
    enum: [
      'read:scans',
      'write:scans',
      'read:threats',
      'write:threats',
      'read:incidents',
      'write:incidents',
      'read:reports',
      'write:reports',
      'admin:users',
      'admin:system'
    ]
  }],
  preferences: {
    theme: {
      type: String,
      enum: ['light', 'dark', 'system'],
      default: 'dark'
    },
    notifications: {
      email: { type: Boolean, default: true },
      browser: { type: Boolean, default: true },
      alerts: { type: Boolean, default: true }
    },
    timezone: {
      type: String,
      default: 'UTC'
    }
  },
  apiKey: {
    type: String,
    unique: true,
    sparse: true
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false
  },
  twoFactorSecret: {
    type: String,
    select: false
  },
  profile: {
    avatar: String,
    bio: String,
    phone: String,
    location: String,
    company: String,
    jobTitle: String
  }
}, {
  timestamps: true
})

// Virtual for full name
userSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`
})

// Virtual for account lock status
userSchema.virtual('isLocked').get(function() {
  return !!(this.lockUntil && this.lockUntil > Date.now())
})

// Index for performance
userSchema.index({ email: 1 })
userSchema.index({ username: 1 })
userSchema.index({ role: 1 })
userSchema.index({ organization: 1 }) // Organization index
userSchema.index({ createdAt: -1 })
userSchema.index({ organization: 1, email: 1 }) // Compound index for org-specific queries

// Pre-save middleware for password hashing
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next()

  try {
    const salt = await bcrypt.genSalt(12)
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (error) {
    next(error)
  }
})

// Instance methods
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.incLoginAttempts = function() {
  if (this.lockUntil && this.lockUntil < Date.now()) {
    this.loginAttempts = 1
    this.lockUntil = undefined
  } else {
    this.loginAttempts += 1
  }

  if (this.loginAttempts >= 5) {
    this.lockUntil = Date.now() + 2 * 60 * 60 * 1000 // 2 hours
  }
}

userSchema.methods.resetLoginAttempts = function() {
  this.loginAttempts = 0
  this.lockUntil = undefined
}

// Method to generate API key
userSchema.methods.generateApiKey = function() {
  this.apiKey = require('crypto').randomBytes(32).toString('hex')
}

export default mongoose.model('User', userSchema)
