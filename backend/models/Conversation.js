import mongoose from 'mongoose'

const conversationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  messages: [{
    role: {
      type: String,
      enum: ['user', 'assistant', 'system'],
      required: true
    },
    content: {
      type: String,
      required: true
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {}
    }
  }],
  title: {
    type: String,
    trim: true
  },
  context: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastMessageAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
})

// Indexes
conversationSchema.index({ userId: 1, lastMessageAt: -1 })
conversationSchema.index({ isActive: 1 })

const Conversation = mongoose.models.Conversation || mongoose.model('Conversation', conversationSchema)

export default Conversation
