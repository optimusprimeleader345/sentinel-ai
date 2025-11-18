import express from 'express'
import {
  addVaultItem,
  getAllVaultItems,
  deleteVaultItem,
  updateVaultItem,
  unlockVault,
  addVaultItemMock,
  getVaultList,
  decryptVaultItem,
  searchVault,
  filterVault,
  getVaultHistory,
  deleteVaultItemMock
} from '../controllers/vaultController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

// ===== NEW MOCK VAULT SYSTEM ROUTES =====
// (Primary vault system for this implementation)
// Master password unlock system
router.post('/unlock', (req, res, next) => {
  console.log('DEBUG: Unlock route called with body:', req.body)
  unlockVault(req, res, next)
})

// Vault item management
router.post('/add', addVaultItemMock)
router.get('/list', getVaultList)
router.post('/decrypt', decryptVaultItem)
router.get('/search', searchVault)
router.get('/filter', filterVault)
router.get('/history', getVaultHistory)
router.delete('/:id', deleteVaultItemMock)

// ===== LEGACY VAULT ROUTES (database-based) =====
// TODO: These may conflict - kept for backwards compatibility
// router.post('/db/add', authMiddleware, addVaultItem)
// router.get('/db/all', authMiddleware, getAllVaultItems)
// router.delete('/db/:id', authMiddleware, deleteVaultItem)
// router.put('/db/:id', authMiddleware, updateVaultItem)

export default router
