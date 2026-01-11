import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const AnimatedNotification = ({ notifications = [], onClose, show = true }) => {
  return (
    <AnimatePresence>
      {show && notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.slice(0, 3).map((notification, index) => (
            <motion.div
              key={notification.id || index}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: index * 0.1
              }}
              className={`min-w-[320px] max-w-md p-4 rounded-lg border shadow-lg bg-slate-900/95 backdrop-blur-sm border-slate-700/50 ${notification.color ? `bg-gradient-to-r ${notification.color}` : ''}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {notification.icon || (
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      🔔
                    </motion.div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <motion.h4
                    className="text-sm font-semibold text-white leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {notification.title}
                  </motion.h4>
                  <motion.p
                    className="text-xs text-slate-300 mt-1 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {notification.description}
                  </motion.p>
                  <motion.div
                    className="mt-2 text-xs text-slate-400"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {notification.timestamp || 'Just now'}
                  </motion.div>
                </div>
                <button
                  onClick={() => onClose && onClose(notification.id)}
                  className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <motion.span
                    className="text-xs leading-none"
                    whileHover={{ scale: 1.2 }}
                  >
                    ×
                  </motion.span>
                </button>
              </div>

              {/* Animated progress bar */}
              <motion.div
                className="mt-3 bg-slate-700/30 rounded-full h-1 overflow-hidden"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 5, ease: "linear" }}
                style={{ transformOrigin: "right" }}
              >
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

export default AnimatedNotification
