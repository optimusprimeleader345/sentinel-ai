import mongoose from 'mongoose'

const systemHealthSchema = new mongoose.Schema({
  cpu: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  memory: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  disk: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  network: {
    type: Number,
    min: 0,
    max: 100,
    required: true,
  },
  uptime: {
    type: String,
    default: '99.8%',
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const SystemHealth = mongoose.models.SystemHealth || mongoose.model('SystemHealth', systemHealthSchema)

export default SystemHealth

