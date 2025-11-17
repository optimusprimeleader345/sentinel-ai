import { useState } from 'react'
import { motion } from 'framer-motion'
import { Scan, Mail, Globe, Loader } from 'lucide-react'
import Button from './Button'

function ScannerWidget() {
  const [scanning, setScanning] = useState(false)
  const [scanType, setScanType] = useState('url')

  const handleScan = () => {
    setScanning(true)
    setTimeout(() => {
      setScanning(false)
    }, 2000)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-6 border border-slate-700/50 shadow-glow"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Scan className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-bold text-white">URL & Email Scanner</h3>
      </div>

      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setScanType('url')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            scanType === 'url'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Globe className="w-4 h-4 inline mr-2" />
          URL
        </button>
        <button
          onClick={() => setScanType('email')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            scanType === 'email'
              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
              : 'bg-slate-800 text-slate-400 border border-slate-700'
          }`}
        >
          <Mail className="w-4 h-4 inline mr-2" />
          Email
        </button>
      </div>

      <div className="space-y-3">
        <input
          type={scanType === 'email' ? 'email' : 'url'}
          placeholder={scanType === 'email' ? 'Enter email address...' : 'Enter URL...'}
          className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <Button
          onClick={handleScan}
          disabled={scanning}
          className="w-full"
        >
          {scanning ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Scan className="w-4 h-4 mr-2" />
              Scan Now
            </>
          )}
        </Button>
      </div>
    </motion.div>
  )
}

export default ScannerWidget

