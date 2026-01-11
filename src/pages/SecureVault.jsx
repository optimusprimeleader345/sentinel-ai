import { motion } from 'framer-motion'
import { Lock, Eye, EyeOff, Plus, Search, Filter, Clock, Trash2, Key, FileText, CreditCard, Settings, RefreshCw, Download, Upload, Share2, AlertTriangle, Shield, User } from 'lucide-react'
import { useState, useEffect } from 'react'
import PasswordStrengthMeter from '../components/PasswordStrengthMeter.jsx'
import PasswordGenerator from '../components/PasswordGenerator.jsx'
import VaultImportExport from '../components/VaultImportExport.jsx'
import VaultSecurityDashboard from '../components/VaultSecurityDashboard.jsx'
import {
  unlockVault,
  addVaultItem,
  getVaultItems,
  decryptVaultItem,
  searchVault,
  filterVault,
  getVaultHistory,
  deleteVaultItemNew
} from '../lib/api.js'

function SecureVault() {
  // State management
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [masterPassword, setMasterPassword] = useState('')
  const [vaultItems, setVaultItems] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState('All')
  const [activityLog, setActivityLog] = useState([])
  const [decryptedValues, setDecryptedValues] = useState({})
  const [showAddModal, setShowAddModal] = useState(false)
  const [loading, setLoading] = useState(false)

  // New Item Form State
  const [newItem, setNewItem] = useState({
    type: 'Password',
    title: '',
    value: '',
    tags: ''
  })

  // Type icons
  const getTypeIcon = (type) => {
    switch (type) {
      case 'Password': return <Key className="w-5 h-5" />
      case 'Notes': return <FileText className="w-5 h-5" />
      case 'API Key': return <Settings className="w-5 h-5" />
      case 'Credit Card': return <CreditCard className="w-5 h-5" />
      default: return <Lock className="w-5 h-5" />
    }
  }

  // Initialize with some sample data on mount
  useEffect(() => {
    if (isUnlocked) {
      loadVaultItems()
      loadActivityLog()
    }
  }, [isUnlocked])

  const handleUnlock = async () => {
    if (!masterPassword.trim()) {
      alert('Please enter a master password')
      return
    }

    setLoading(true)
    try {
      console.log('Attempting to unlock vault with password:', masterPassword)
      const result = await unlockVault({ password: masterPassword.trim() })
      console.log('Unlock response:', result.data)

      if (result.data.success) {
        setIsUnlocked(true)
        console.log('Vault unlocked successfully')
      } else {
        alert('Unlock failed: ' + (result.data.message || 'Unknown error'))
      }
    } catch (error) {
      console.error('Unlock failed:', error)
      alert('Unlock failed: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const loadVaultItems = async () => {
    try {
      setLoading(true)
      const result = await getVaultItems()
      setVaultItems(result.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to load vault items:', error)
      setLoading(false)
    }
  }

  const loadActivityLog = async () => {
    try {
      const result = await getVaultHistory()
      setActivityLog(result.data)
    } catch (error) {
      console.error('Failed to load activity log:', error)
    }
  }

  const handleDecrypt = async (itemId) => {
    try {
      const result = await decryptVaultItem({ id: itemId })
      setDecryptedValues({
        ...decryptedValues,
        [itemId]: result.data
      })
    } catch (error) {
      console.error('Failed to decrypt item:', error)
    }
  }

  const handleSearch = async (query) => {
    try {
      setLoading(true)
      const result = query ? await searchVault(query) : await getVaultItems()
      setVaultItems(result.data)
      setLoading(false)
    } catch (error) {
      console.error('Search failed:', error)
      setLoading(false)
    }
  }

  const handleFilter = async (type) => {
    try {
      setLoading(true)
      const result = type !== 'All' ? await filterVault(type) : await getVaultItems()
      setVaultItems(result.data)
      setLoading(false)
    } catch (error) {
      console.error('Filter failed:', error)
      setLoading(false)
    }
  }

  const handleAddItem = async () => {
    try {
      await addVaultItem({
        type: newItem.type,
        title: newItem.title,
        value: newItem.value,
        tags: newItem.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      })
      setShowAddModal(false)
      setNewItem({ type: 'Password', title: '', value: '', tags: '' })
      // Reload items to show the new one
      await loadVaultItems()
      await loadActivityLog()
    } catch (error) {
      console.error('Failed to add item:', error)
    }
  }

  const handleDeleteItem = async (itemId) => {
    try {
      await deleteVaultItemNew(itemId)
      // Reload items
      await loadVaultItems()
      await loadActivityLog()
    } catch (error) {
      console.error('Failed to delete item:', error)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Lock className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Secure Vault</h1>
        </motion.div>
        <p className="text-slate-400">Encrypted password and credential storage</p>

        {/* Master Password Unlock Section */}
        {!isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-slate-200">Master Password</h2>
            </div>
            <div className="flex space-x-4">
              <input
                type="password"
                placeholder="Enter master password to unlock vault"
                value={masterPassword}
                onChange={(e) => setMasterPassword(e.target.value)}
                className="flex-1 bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <button
                onClick={handleUnlock}
                disabled={loading}
                className="bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 px-6 py-2 rounded-lg text-white font-medium transition-colors"
              >
                {loading ? 'Unlocking...' : 'Unlock Vault'}
              </button>
            </div>
          </motion.div>
        )}

        {/* Vault Content (only shown when unlocked) */}
        {isUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 space-y-6"
          >
            {/* Controls Section */}
            <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="flex-1 min-w-64 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search vault items..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      handleSearch(e.target.value)
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                {/* Filter Dropdown */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-5 h-5 text-slate-400" />
                  <select
                    value={filterType}
                    onChange={(e) => {
                      setFilterType(e.target.value)
                      handleFilter(e.target.value)
                    }}
                    className="bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="All">All Types</option>
                    <option value="Password">Passwords</option>
                    <option value="Notes">Notes</option>
                    <option value="API Key">API Keys</option>
                    <option value="Credit Card">Credit Cards</option>
                  </select>

                  {/* Add Item Button */}
                  <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white font-medium flex items-center space-x-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Item</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Vault Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vaultItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-4 hover:border-cyan-400/50 transition-colors"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(item.type)}
                      <span className="font-medium text-slate-200">{item.type}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleDecrypt(item.id)}
                        className="text-slate-400 hover:text-cyan-400 transition-colors"
                        title="View/Decrypt"
                      >
                        {decryptedValues[item.id] ?
                          <EyeOff className="w-4 h-4" /> :
                          <Eye className="w-4 h-4" />
                        }
                      </button>
                      <button
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-slate-400 hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="font-semibold text-slate-200 mb-2">{item.title}</h3>

                  {/* Value Display */}
                  <div className="mb-3">
                    {decryptedValues[item.id] ? (
                      <p className="text-cyan-400 bg-slate-800/50 p-2 rounded font-mono text-sm break-all">
                        {decryptedValues[item.id].value}
                      </p>
                    ) : (
                      <div className="text-slate-500 bg-slate-800/30 p-2 rounded font-mono text-sm">
                        •••••••••••• (Encrypted)
                      </div>
                    )}
                  </div>

                  {/* Meta Info */}
                  <div className="text-xs text-slate-400 space-y-1">
                    <div>Last Updated: {new Date(item.lastUpdated).toLocaleDateString()}</div>
                    {item.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Security Dashboard */}
            <VaultSecurityDashboard
              vaultItems={vaultItems}
              activityLog={activityLog}
            />

            {/* Activity Log Section */}
            <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-slate-200">Activity Log</h2>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {activityLog.map((activity) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between py-2 px-3 bg-slate-800/30 rounded-lg"
                  >
                    <div className="flex-1">
                      <span className="text-slate-300 text-sm">{activity.details}</span>
                      {activity.itemId && (
                        <span className="text-slate-500 text-xs ml-2">ID: {activity.itemId}</span>
                      )}
                    </div>
                    <div className="text-slate-500 text-xs">
                      {new Date(activity.timestamp).toLocaleString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Add Item Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-[#0f172a]/90 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6 w-full max-w-md"
            >
              <h3 className="text-xl font-bold text-slate-200 mb-4 flex items-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>Add Vault Item</span>
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  >
                    <option value="Password">Password</option>
                    <option value="Notes">Notes</option>
                    <option value="API Key">API Key</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Title</label>
                  <input
                    type="text"
                    placeholder="Item title"
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Value {newItem.type === 'Password' && <span className="text-cyan-400">(Password)</span>}
                  </label>
                  {newItem.type === 'Password' ? (
                    <div className="space-y-3">
                      <textarea
                        placeholder="Enter password manually or generate one below"
                        value={newItem.value}
                        onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                        rows={3}
                        className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                      />
                      
                      {/* Password Strength Meter */}
                      <div className="mt-2">
                        <PasswordStrengthMeter 
                          password={newItem.value}
                          onStrengthChange={(score, feedback) => {
                            // You can store the strength score if needed
                            console.log('Password strength:', score, feedback)
                          }}
                        />
                      </div>
                      
                      {/* Password Generator */}
                      <div className="mt-3 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
                        <div className="flex items-center space-x-2 mb-2">
                          <RefreshCw className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm font-medium text-slate-300">Generate Secure Password</span>
                        </div>
                        <PasswordGenerator 
                          onPasswordGenerated={(password) => {
                            setNewItem({ ...newItem, value: password })
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <textarea
                      placeholder="Item value (notes, API key, etc.)"
                      value={newItem.value}
                      onChange={(e) => setNewItem({ ...newItem, value: e.target.value })}
                      rows={4}
                      className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Tags (comma separated)</label>
                  <input
                    type="text"
                    placeholder="work, personal, etc."
                    value={newItem.tags}
                    onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddItem}
                  className="bg-cyan-600 hover:bg-cyan-700 px-6 py-2 rounded-lg text-white font-medium transition-colors"
                >
                  Add Item
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SecureVault
