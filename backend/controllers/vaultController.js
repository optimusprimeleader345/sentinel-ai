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

