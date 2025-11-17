import mongoose from 'mongoose'

const ticketSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['open', 'in_progress', 'resolved', 'closed'],
    default: 'open',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  responses: [{
    message: String,
    from: {
      type: String,
      enum: ['user', 'support'],
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

ticketSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

const Ticket = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema)

export default Ticket

