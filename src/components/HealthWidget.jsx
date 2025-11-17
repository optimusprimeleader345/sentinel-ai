import { motion } from 'framer-motion'

const colorConfig = {
  cyan: {
    text: 'text-cyan-400',
    gradient: 'from-cyan-500 to-cyan-400',
  },
  green: {
    text: 'text-green-400',
    gradient: 'from-green-500 to-green-400',
  },
  yellow: {
    text: 'text-yellow-400',
    gradient: 'from-yellow-500 to-yellow-400',
  },
  purple: {
    text: 'text-purple-400',
    gradient: 'from-purple-500 to-purple-400',
  },
}

function HealthWidget({ label, value, icon: Icon, color = 'cyan' }) {
  const colors = colorConfig[color] || colorConfig.cyan

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-4 border border-slate-700/50"
    >
      <div className="flex items-center justify-between mb-3">
        <Icon className={`w-5 h-5 ${colors.text}`} />
        <span className="text-2xl font-bold text-white">{value}%</span>
      </div>
      <p className="text-xs text-slate-400">{label}</p>
      <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1 }}
          className={`h-1.5 bg-gradient-to-r ${colors.gradient} rounded-full`}
        />
      </div>
    </motion.div>
  )
}

export default HealthWidget
