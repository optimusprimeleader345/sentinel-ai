import mongoose from 'mongoose'

const scanSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['url', 'email', 'file'],
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['safe', 'threat', 'blocked', 'suspicious'],
    default: 'safe',
  },
  riskScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
  analysis: {
    type: String,
  },
  scannedAt: {
    type: Date,
    default: Date.now,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Scan = mongoose.models.Scan || mongoose.model('Scan', scanSchema)

export default Scan

