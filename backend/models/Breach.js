import mongoose from 'mongoose'

const breachSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  breachName: {
    type: String,
    required: true,
    trim: true
  },
  breachDate: {
    type: Date
  },
  leakedData: [{
    type: String,
    enum: ['email', 'password', 'username', 'phone', 'address', 'credit_card', 'ssn', 'ip_address', 'other']
  }],
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  source: {
    type: String,
    default: 'HaveIBeenPwned'
  },
  checkedAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    index: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  recordCount: {
    type: Number,
    default: 0
  },
  description: {
    type: String
  }
}, {
  timestamps: true
})

// Indexes
breachSchema.index({ email: 1, breachName: 1 })
breachSchema.index({ userId: 1, checkedAt: -1 })
breachSchema.index({ severity: 1 })

const Breach = mongoose.models.Breach || mongoose.model('Breach', breachSchema)

export default Breach
