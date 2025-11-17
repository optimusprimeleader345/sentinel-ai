import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Clock } from 'lucide-react'

function HeroHeader() {
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date()
    return now.toLocaleTimeString('en-US', { hour12: false })
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative w-full bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-cyan-900/30 rounded-2xl p-8 border border-purple-500/20 shadow-glow overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10" />
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 animate-pulse-slow" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex-1">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3 mb-2"
          >
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold neon-text">Cyber Defense Center</h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-slate-300 text-lg"
          >
            Real-time threat monitoring and AI-powered protection
          </motion.p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <p className="text-xs text-slate-400 mb-1">Last Scan</p>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span className="text-lg font-mono text-cyan-400">{currentTime}</span>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl shadow-neon-green flex items-center space-x-2"
          >
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
            <span>AI Active</span>
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default HeroHeader

