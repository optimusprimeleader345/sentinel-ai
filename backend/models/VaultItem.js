import mongoose from 'mongoose'

const vaultItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
    required: true, // Encrypted
  },
  url: String,
  notes: String,
  category: {
    type: String,
    default: 'general',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

vaultItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now()
  next()
})

const VaultItem = mongoose.models.VaultItem || mongoose.model('VaultItem', vaultItemSchema)

export default VaultItem

