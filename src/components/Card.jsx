import { motion } from 'framer-motion'

function Card({ children, className = '', hover = false }) {
  const baseClasses = 'bg-white rounded-xl border border-slate-200 shadow-soft p-6'
  
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
