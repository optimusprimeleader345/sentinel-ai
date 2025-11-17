import { motion } from 'framer-motion'
import { AlertTriangle, ShieldCheck, Brain, TrendingUp } from 'lucide-react'

const iconMap = {
  'alert-triangle': AlertTriangle,
  'shield-check': ShieldCheck,
  'brain': Brain,
}

const colorConfig = {
  red: {
    text: 'text-red-400',
    bg: 'bg-red-500/20',
    border: 'border-red-500/30',
    gradient: 'from-red-500/10',
  },
  green: {
    text: 'text-green-400',
    bg: 'bg-green-500/20',
    border: 'border-green-500/30',
    gradient: 'from-green-500/10',
  },
  yellow: {
    text: 'text-yellow-400',
    bg: 'bg-yellow-500/20',
    border: 'border-yellow-500/30',
    gradient: 'from-yellow-500/10',
  },
  purple: {
    text: 'text-purple-400',
    bg: 'bg-purple-500/20',
    border: 'border-purple-500/30',
    gradient: 'from-purple-500/10',
  },
}

function KPIStatCard({ title, value, label, subtext, growth, badge, icon, color, gradient, index }) {
  const Icon = iconMap[icon]
  const colors = colorConfig[color] || colorConfig.purple

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className={`relative bg-gradient-to-br ${gradient} rounded-xl p-6 border border-slate-700/50 backdrop-blur-sm overflow-hidden`}
    >
      {/* Background glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} to-transparent`} />
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          {Icon && (
            <div className={`p-2 ${colors.bg} rounded-lg`}>
              <Icon className={`w-6 h-6 ${colors.text}`} />
            </div>
          )}
          {growth && (
            <div className="flex items-center space-x-1 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">{growth}</span>
            </div>
          )}
        </div>

        {value && (
          <div className="mb-2">
            <p className="text-3xl font-bold text-white mb-1">{value}</p>
            {label && <p className="text-sm text-slate-400">{label}</p>}
            {subtext && <p className="text-xs text-slate-500 mt-1">{subtext}</p>}
          </div>
        )}

        {badge && (
          <div>
            <span className={`inline-block px-3 py-1 ${colors.bg} border ${colors.border} rounded-full text-sm font-semibold ${colors.text}`}>
              {badge}
            </span>
            {subtext && <p className="text-xs text-slate-400 mt-2">{subtext}</p>}
          </div>
        )}

        <p className="text-sm text-slate-300 mt-2">{title}</p>
      </div>
    </motion.div>
  )
}

export default KPIStatCard
