import express from 'express'
import { addVaultItem, getAllVaultItems, deleteVaultItem, updateVaultItem } from '../controllers/vaultController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/add', authMiddleware, addVaultItem)
router.get('/all', authMiddleware, getAllVaultItems)
router.delete('/:id', authMiddleware, deleteVaultItem)
router.put('/:id', authMiddleware, updateVaultItem)

export default router

