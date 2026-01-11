import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, AlertTriangle, ExternalLink, Clock } from 'lucide-react'
import { useAlerts } from '../contexts/AlertContext'
import { useNavigate } from 'react-router-dom'

const AlertToast = () => {
  const { activeToast, dismissToast } = useAlerts()
  const navigate = useNavigate()

  // Auto dismiss after 5 seconds
  useEffect(() => {
    if (activeToast) {
      const timer = setTimeout(() => {
        dismissToast()
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [activeToast, dismissToast])

  if (!activeToast) return null

  const handleViewDetails = () => {
    dismissToast()
    // Navigate to alerts page or specific alert
    navigate('/alerts')
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diff = now - alertTime
    const minutes = Math.floor(diff / (1000 * 60))

    return `${minutes}m ago`
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="fixed bottom-6 right-6 z-50 max-w-sm"
      >
        <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-2xl border border-red-500/50 overflow-hidden">
          {/* Header with glow effect */}
          <div className="relative p-4 bg-red-600/20 border-b border-red-500/30">
            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 bg-red-500/20"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.02, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <div className="relative flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
                >
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </motion.div>
                <div>
                  <h4 className="font-bold text-white text-sm">CRITICAL ALERT</h4>
                  <p className="text-red-200 text-xs">{activeToast.type} Threat Detected</p>
                </div>
              </div>
              <button
                onClick={dismissToast}
                className="p-1 text-red-200 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <h5 className="font-semibold text-white text-sm mb-2">{activeToast.title}</h5>
            <p className="text-red-100 text-xs leading-relaxed mb-3">{activeToast.description}</p>

            <div className="flex items-center justify-between text-xs text-red-200 mb-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>{formatTimestamp(activeToast.timestamp)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>Impact:</span>
                <span className="font-bold text-red-300">{activeToast.scoreImpact}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-2">
              <button
                onClick={handleViewDetails}
                className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-medium rounded-lg transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
                <span>View Details</span>
              </button>
              <button
                onClick={dismissToast}
                className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-medium rounded-lg transition-colors"
              >
                Dismiss
              </button>
            </div>

            {/* Auto-dismiss indicator */}
            <div className="mt-3">
              <div className="w-full bg-red-500/20 rounded-full h-1">
                <motion.div
                  className="h-1 bg-red-400 rounded-full"
                  initial={{ width: '100%' }}
                  animate={{ width: '0%' }}
                  transition={{ duration: 5, ease: 'linear' }}
                />
              </div>
              <p className="text-xs text-red-300 mt-1 text-center">Auto-dismissing in 5s</p>
            </div>
          </div>

          {/* Animated border glow */}
          <motion.div
            className="absolute inset-0 border-2 border-red-400/50 rounded-xl"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.02, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default AlertToast
