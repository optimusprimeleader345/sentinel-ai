import mongoose from 'mongoose'

const logSchema = new mongoose.Schema({
  level: {
    type: String,
    enum: ['error', 'warn', 'info', 'debug'],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    default: 'system',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
  },
})

const Log = mongoose.models.Log || mongoose.model('Log', logSchema)

export default Log

