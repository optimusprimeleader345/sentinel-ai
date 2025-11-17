import { motion } from 'framer-motion'
import { Shield, Bug, MailWarning, Settings, CheckCircle2 } from 'lucide-react'
import { aiAgentActivities } from '../data/mock'

const iconMap = {
  shield: Shield,
  virus: Bug,
  'mail-warning': MailWarning,
  settings: Settings,
}

function AIStatusCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-6 border border-purple-500/20 shadow-glow backdrop-blur-sm"
    >
      {/* Inner glow ring */}
      <div className="absolute inset-0 rounded-xl ring-1 ring-purple-500/20" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Autonomous AI Agent</h3>
          <div className="flex items-center space-x-2 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-green-400">Active</span>
          </div>
        </div>

        <p className="text-slate-300 mb-6 text-sm">
          Our AI agent continuously monitors and protects your systems in real-time, 
          automatically responding to threats and maintaining optimal security posture.
        </p>

        <div className="space-y-3">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Recent Activity
          </p>
          {aiAgentActivities.map((activity, index) => {
            const Icon = iconMap[activity.icon] || Shield
            return (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/30 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.details}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{activity.timestamp}</span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default AIStatusCard

