import { motion } from 'framer-motion'

function Card({ children, className = '', hover = false }) {
  const baseClasses = 'bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-glow p-6'
  
  if (hover) {
    return (
      <motion.div
        className={`${baseClasses} ${className}`}
        whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={`${baseClasses} ${className}`}>
      {children}
    </div>
  )
}

export default Card
