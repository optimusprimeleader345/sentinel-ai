import VaultItem from '../models/VaultItem.js'
import { encrypt, decrypt } from '../utils/encrypt.js'

export const addVaultItem = async (req, res) => {
  try {
    const { title, username, password, url, notes, category } = req.body
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    if (!title || !password) {
      return res.status(400).json({ message: 'Title and password are required' })
    }

    // Encrypt password
    const encryptedPassword = encrypt(password)

    const vaultItem = await VaultItem.create({
      title,
      username,
      password: encryptedPassword,
      url,
      notes,
      category: category || 'general',
      userId,
    })

    res.status(201).json({
      id: vaultItem._id,
      title: vaultItem.title,
      username: vaultItem.username,
      url: vaultItem.url,
      notes: vaultItem.notes,
      category: vaultItem.category,
      createdAt: vaultItem.createdAt,
    })
  } catch (error) {
    console.error('Add vault item error:', error)
    res.status(500).json({ message: 'Server error adding vault item' })
  }
}

export const getAllVaultItems = async (req, res) => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const items = await VaultItem.find({ userId }).sort({ createdAt: -1 })

    // Decrypt passwords for display (in real app, only decrypt when needed)
    const decryptedItems = items.map(item => ({
      id: item._id,
      title: item.title,
      username: item.username,
      password: decrypt(item.password), // Decrypt for client
      url: item.url,
      notes: item.notes,
      category: item.category,
      createdAt: item.createdAt,
    }))

    res.json(decryptedItems)
  } catch (error) {
    console.error('Get vault items error:', error)
    res.status(500).json({ message: 'Server error fetching vault items' })
  }
}

export const deleteVaultItem = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const item = await VaultItem.findOne({ _id: id, userId })
    if (!item) {
      return res.status(404).json({ message: 'Vault item not found' })
    }

    await VaultItem.findByIdAndDelete(id)

    res.json({ message: 'Vault item deleted successfully' })
  } catch (error) {
    console.error('Delete vault item error:', error)
    res.status(500).json({ message: 'Server error deleting vault item' })
  }
}

export const updateVaultItem = async (req, res) => {
  try {
    const { id } = req.params
    const { title, username, password, url, notes, category } = req.body
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const item = await VaultItem.findOne({ _id: id, userId })
    if (!item) {
      return res.status(404).json({ message: 'Vault item not found' })
    }

    const updates = {}
    if (title) updates.title = title
    if (username !== undefined) updates.username = username
    if (password) updates.password = encrypt(password)
    if (url !== undefined) updates.url = url
    if (notes !== undefined) updates.notes = notes
    if (category) updates.category = category

    const updatedItem = await VaultItem.findByIdAndUpdate(id, updates, { new: true })

    res.json({
      id: updatedItem._id,
      title: updatedItem.title,
      username: updatedItem.username,
      password: decrypt(updatedItem.password),
      url: updatedItem.url,
      notes: updatedItem.notes,
      category: updatedItem.category,
      updatedAt: updatedItem.updatedAt,
    })
  } catch (error) {
    console.error('Update vault item error:', error)
    res.status(500).json({ message: 'Server error updating vault item' })
  }
}

// ===== NEW MOCK VAULT SYSTEM =====

// Mock data for the enhanced vault system
let mockVaultItems = []
let isVaultUnlocked = false
let mockActivityLog = []

// Master password unlock (mock validation)
export const unlockVault = async (req, res) => {
  try {
    const { password } = req.body

    // Mock validation - accept any password for demo
    if (password && password.length > 0) {
      isVaultUnlocked = true
      // Log activity
      mockActivityLog.push({
        id: Date.now(),
        action: 'vault_unlock',
        timestamp: new Date().toISOString(),
        details: 'Vault accessed'
      })
      res.json({ success: true })
    } else {
      res.status(401).json({ success: false, message: 'Invalid password' })
    }
  } catch (error) {
    console.error('Unlock vault error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Add new vault item
export const addVaultItemMock = async (req, res) => {
  try {
    if (!isVaultUnlocked) {
      return res.status(403).json({ message: 'Vault not unlocked' })
    }

    const { type, title, value, tags = [] } = req.body

    if (!type || !title || !value) {
      return res.status(400).json({ message: 'Type, title, and value are required' })
    }

    // Mock AES encryption - just base64 encode for demo
    const mockEncryptedValue = Buffer.from(value).toString('base64')

    const newItem = {
      id: Date.now().toString(),
      type, // 'Password', 'Notes', 'API Key', 'Credit Card', 'Other'
      title,
      value: mockEncryptedValue, // Store encrypted
      tags,
      lastUpdated: new Date().toISOString(),
      createdAt: new Date().toISOString()
    }

    mockVaultItems.push(newItem)

    // Log activity
    mockActivityLog.push({
      id: Date.now(),
      action: 'item_added',
      timestamp: new Date().toISOString(),
      details: `${title} added`,
      itemId: newItem.id
    })

    res.status(201).json({
      id: newItem.id,
      type: newItem.type,
      title: newItem.title,
      tags: newItem.tags,
      lastUpdated: newItem.lastUpdated
    })
  } catch (error) {
    console.error('Add vault item mock error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get vault list
export const getVaultList = async (req, res) => {
  try {
    if (!isVaultUnlocked) {
      return res.status(403).json({ message: 'Vault not unlocked' })
    }

    // Return items without decrypted values (only metadata)
    const itemsList = mockVaultItems.map(item => ({
      id: item.id,
      type: item.type,
      title: item.title,
      tags: item.tags,
      lastUpdated: item.lastUpdated
    }))

    res.json(itemsList)
  } catch (error) {
    console.error('Get vault list error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Decrypt vault item
export const decryptVaultItem = async (req, res) => {
  try {
    if (!isVaultUnlocked) {
      return res.status(403).json({ message: 'Vault not unlocked' })
    }

    const { id } = req.body

    const item = mockVaultItems.find(item => item.id === id)
    if (!item) {
      return res.status(404).json({ message: 'Item not found' })
    }

    // Mock AES decryption - base64 decode for demo
    const decryptedValue = Buffer.from(item.value, 'base64').toString()

    // Log activity
    mockActivityLog.push({
      id: Date.now(),
      action: 'item_decrypted',
      timestamp: new Date().toISOString(),
      details: `${item.title} decrypted`,
      itemId: item.id
    })

    res.json({
      id: item.id,
      type: item.type,
      title: item.title,
      value: decryptedValue,
      tags: item.tags,
      lastUpdated: item.lastUpdated
    })
  } catch (error) {
    console.error('Decrypt vault item error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Search vault items
export const searchVault = async (req, res) => {
  try {
    if (!isVaultUnlocked) {
      return res.status(403).json({ message: 'Vault not unlocked' })
    }

    const { query } = req.query

    if (!query) {
      const allItems = mockVaultItems.map(item => ({
        id: item.id,
        type: item.type,
        title: item.title,
        tags: item.tags,
        lastUpdated: item.lastUpdated
      }))
      return res.json(allItems)
    }

    const filteredItems = mockVaultItems
      .filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.type.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      .map(item => ({
        id: item.id,
        type: item.type,
        title: item.title,
        tags: item.tags,
        lastUpdated: item.lastUpdated
      }))

    res.json(filteredItems)
  } catch (error) {
    console.error('Search vault error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Filter vault items
export const filterVault = async (req, res) => {
  try {
    if (!isVaultUnlocked) {
      return res.status(403).json({ message: 'Vault not unlocked' })
    }

    const { type } = req.query

    if (!type) {
      const allItems = mockVaultItems.map(item => ({
        id: item.id,
        type: item.type,
        title: item.title,
        tags: item.tags,
        lastUpdated: item.lastUpdated
      }))
      return res.json(allItems)
    }

    const filteredItems = mockVaultItems
      .filter(item => item.type.toLowerCase() === type.toLowerCase())
      .map(item => ({
        id: item.id,
        type: item.type,
        title: item.title,
        tags: item.tags,
        lastUpdated: item.lastUpdated
      }))

    res.json(filteredItems)
  } catch (error) {
    console.error('Filter vault error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Get vault history
export const getVaultHistory = async (req, res) => {
  try {
    if (!isVaultUnlocked) {
      return res.status(403).json({ message: 'Vault not unlocked' })
    }

    res.json(mockActivityLog)
  } catch (error) {
    console.error('Get vault history error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

// Delete vault item
export const deleteVaultItemMock = async (req, res) => {
  try {
    if (!isVaultUnlocked) {
      return res.status(403).json({ message: 'Vault not unlocked' })
    }

    const { id } = req.params
    const itemIndex = mockVaultItems.findIndex(item => item.id === id)

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Item not found' })
    }

    const deletedItem = mockVaultItems.splice(itemIndex, 1)[0]

    // Log activity
    mockActivityLog.push({
      id: Date.now(),
      action: 'item_deleted',
      timestamp: new Date().toISOString(),
      details: `${deletedItem.title} deleted`,
      itemId: deletedItem.id
    })

    res.json({ message: 'Item deleted successfully' })
  } catch (error) {
    console.error('Delete vault item mock error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
