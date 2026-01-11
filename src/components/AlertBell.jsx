import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, BellRing } from 'lucide-react'
import { useAlerts } from '../contexts/AlertContext'

const AlertBell = () => {
  const { unreadCount, togglePanel, isPanelOpen } = useAlerts()
  const [isAnimating, setIsAnimating] = useState(false)

  // Animate bell when new alerts arrive
  useEffect(() => {
    if (unreadCount > 0) {
      setIsAnimating(true)
      const timer = setTimeout(() => setIsAnimating(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [unreadCount])

  return (
    <motion.button
      onClick={togglePanel}
      className={`relative p-2 rounded-lg transition-all duration-200 ${
        isPanelOpen
          ? 'bg-cyan-600/20 border border-cyan-400/50 text-cyan-400'
          : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Bell Icon */}
      <motion.div
        animate={isAnimating ? {
          rotate: [0, -10, 10, -10, 0],
          scale: [1, 1.1, 1]
        } : {}}
        transition={{
          duration: 0.6,
          ease: "easeInOut"
        }}
      >
        {unreadCount > 0 ? (
          <BellRing className="w-5 h-5" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
      </motion.div>

      {/* Unread Badge */}
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 25 }}
            className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center"
          >
            <motion.span
              key={unreadCount}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-xs font-bold text-white leading-none"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulsing indicator for critical alerts */}
      {unreadCount > 0 && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-red-500/50"
          animate={{
            opacity: [0, 1, 0],
            scale: [1, 1.05, 1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}
    </motion.button>
  )
}

export default AlertBell
