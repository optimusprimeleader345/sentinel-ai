import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { vaultAPI } from '../lib/api.js'

function SecureVault() {
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
      </div>
    </div>
  )
}

export default SecureVault
