import mongoose from 'mongoose'

const threatSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium',
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved'],
    default: 'open',
  },
  source: {
    type: String,
    required: true,
  },
  ipAddress: String,
  detectedAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: Date,
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Threat = mongoose.models.Threat || mongoose.model('Threat', threatSchema)

export default Threat

