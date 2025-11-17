import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'

function CyberError({ message, onRetry }) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (onRetry && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (onRetry && countdown === 0) {
      onRetry()
    }
  }, [countdown, onRetry])

  const handleRetry = () => {
    setCountdown(5)
    if (onRetry) onRetry()
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-[#080e2b]/70 backdrop-blur-xl rounded-xl p-8 border border-purple-500/30 shadow-[0_0_25px_rgba(168,85,247,0.25)] max-w-2xl w-full"
      >
        {/* Error Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, duration: 0.6, type: 'spring', stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="p-4 bg-red-500/20 rounded-full border border-red-500/30">
            <ShieldAlert className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent"
        >
          System Health Check Failed
        </motion.h1>

        {/* Subtitle/Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-slate-300 text-center mb-6 leading-relaxed"
        >
          {message || 'An unexpected error occurred while rendering this component. This could be due to a temporary API connection issue or data processing error.'}
        </motion.p>

        {/* Retry Button with Countdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex justify-center items-center space-x-4"
        >
          <button
            onClick={handleRetry}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-fuchsia-500 hover:opacity-80 transition-opacity rounded-lg font-semibold text-white shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
          >
            {countdown > 0 ? `Retrying in ${countdown}...` : 'Retry Now'}
          </button>

          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg font-medium text-slate-300 transition-colors"
          >
            Reload Page
          </button>
        </motion.div>

        {/* Pulsing Error Indicator */}
        <motion.div
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-8 text-center"
        >
          <div className="inline-flex items-center space-x-2 text-slate-400 text-sm">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span>System monitoring active</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default CyberError
