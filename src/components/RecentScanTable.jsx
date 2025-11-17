import { motion } from 'framer-motion'
import { CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import { recentScans } from '../data/mock'

const statusIcons = {
  safe: CheckCircle2,
  threat: AlertCircle,
  blocked: XCircle,
}

const statusColors = {
  safe: 'text-green-400',
  threat: 'text-red-400',
  blocked: 'text-yellow-400',
}

function RecentScanTable() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-6 border border-slate-700/50 shadow-glow"
    >
      <h3 className="text-lg font-bold text-white mb-4">Recent Scan History</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Type</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Target</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Status</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-slate-400">Time</th>
            </tr>
          </thead>
          <tbody>
            {recentScans.map((scan) => {
              const StatusIcon = statusIcons[scan.status]
              return (
                <tr key={scan.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-4 text-sm text-slate-300">{scan.type}</td>
                  <td className="py-3 px-4 text-sm text-white font-mono">{scan.target}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <StatusIcon className={`w-4 h-4 ${statusColors[scan.status]}`} />
                      <span className={`text-sm capitalize ${statusColors[scan.status]}`}>
                        {scan.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-400">{scan.timestamp}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

export default RecentScanTable

