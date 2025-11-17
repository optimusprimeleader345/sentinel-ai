import { motion } from 'framer-motion'
import { Globe } from 'lucide-react'

function ThreatMapPlaceholder() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-6 border border-slate-700/50 shadow-glow h-64 flex items-center justify-center overflow-hidden"
    >
      {/* Animated background dots */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-bold text-white mb-2">Global Threat Map</h3>
        <p className="text-sm text-slate-400">Real-time threat visualization</p>
      </div>
    </motion.div>
  )
}

export default ThreatMapPlaceholder

