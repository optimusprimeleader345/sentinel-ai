import React from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext.jsx'

function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme, isTransitioning } = useTheme()

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      disabled={isTransitioning}
      className={`relative p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300 hover:bg-slate-700/50 ${className}`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Animated icon transition */}
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-5 h-5"
      >
        {theme === 'dark' ? (
          <Sun className="w-5 h-5 text-yellow-400" />
        ) : (
          <Moon className="w-5 h-5 text-blue-400" />
        )}
      </motion.div>

      {/* Loading indicator during transition */}
      {isTransitioning && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Monitor className="w-4 h-4 text-slate-400 animate-spin" />
        </motion.div>
      )}

      {/* Subtle glow effect */}
      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10'
          : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
      }`} />
    </motion.button>
  )
}

export default ThemeToggle