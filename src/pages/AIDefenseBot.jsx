import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bot, Shield, Activity, AlertTriangle, Command, Lightbulb } from 'lucide-react'
import { aiAPI } from '../lib/api.js'
import { getDefenseStatus, getDefenseActions, getActiveThreats, getDefenseRecommendations, sendDefenseCommand } from '../lib/api.js'

function AIDefenseBot() {
  const [status, setStatus] = useState({})
  const [actions, setActions] = useState([])
  const [threats, setThreats] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [command, setCommand] = useState('')
  const [commandResponse, setCommandResponse] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, actionsRes, threatsRes, recsRes] = await Promise.all([
          getDefenseStatus(),
          getDefenseActions(),
          getActiveThreats(),
          getDefenseRecommendations()
        ])
        setStatus(statusRes.data)
        setActions(actionsRes.data)
        setThreats(threatsRes.data)
        setRecommendations(recsRes.data)
      } catch (error) {
        console.error('Error fetching defense data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleCommandSubmit = async (e) => {
    e.preventDefault()
    if (!command.trim()) return

    try {
      const response = await sendDefenseCommand({ prompt: command })
      setCommandResponse(response.data.reply)
      if (response.data.actionTaken) {
        // Refresh data
        const [statusRes, actionsRes, threatsRes] = await Promise.all([
          getDefenseStatus(),
          getDefenseActions(),
          getActiveThreats()
        ])
        setStatus(statusRes.data)
        setActions(actionsRes.data)
        setThreats(threatsRes.data)
      }
    } catch (error) {
      setCommandResponse('Error processing command')
    }
    setCommand('')
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Bot className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">AI Defense Bot</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">AI-powered autonomous defense system</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <div className="space-y-8">
            {/* Real-Time Security Status Panel */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Real-Time Security Status
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-sm text-slate-400">System Status</div>
                  <div className={`text-lg font-bold ${status.systemStatus === 'Protected' ? 'text-green-400' : 'text-red-400'}`}>
                    {status.systemStatus || 'Offline'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400">Firewall</div>
                  <div className={`text-lg font-bold ${status.firewall === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                    {status.firewall || 'Inactive'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400">Intrusion Detection</div>
                  <div className={`text-lg font-bold ${status.intrusionDetection === 'Online' ? 'text-green-400' : 'text-red-400'}`}>
                    {status.intrusionDetection || 'Offline'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400">Anomaly Detection</div>
                  <div className={`text-lg font-bold ${status.anomalyDetection === 'Monitoring' ? 'text-green-400' : 'text-red-400'}`}>
                    {status.anomalyDetection || 'Offline'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400">Last Action</div>
                  <div className="text-sm text-slate-300">
                    {status.lastAutonomousAction ? new Date(status.lastAutonomousAction).toLocaleTimeString() : 'N/A'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Autonomous Action Log */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Autonomous Action Log
                </h2>
              </div>
              <div className="max-h-64 overflow-y-auto space-y-3">
                {actions.map((action, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex justify-between items-start p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <div>
                      <div className="text-sm text-slate-300">{action.actionType}</div>
                      <div className="text-xs text-slate-500">{action.description}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-xs px-2 py-1 rounded ${action.severity === 'High' ? 'bg-red-500/20 text-red-400' : action.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                        {action.severity}
                      </div>
                      <div className="text-xs text-slate-500">
                        {new Date(action.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Active Threat Interceptor */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Active Threat Interceptor
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left p-2 text-slate-400">IP</th>
                      <th className="text-left p-2 text-slate-400">Type</th>
                      <th className="text-left p-2 text-slate-400">Confidence</th>
                      <th className="text-left p-2 text-slate-400">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50">
                    {threats.map((threat, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.05 }}
                        className="hover:bg-slate-800/30"
                      >
                        <td className="p-2 text-slate-300">{threat.ip}</td>
                        <td className="p-2 text-slate-300">{threat.type}</td>
                        <td className="p-2">
                          <div className="flex items-center space-x-2">
                            <div className="w-12 bg-slate-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                                style={{ width: `${threat.confidence}%` }}
                              ></div>
                            </div>
                            <span className="text-slate-300">{threat.confidence}%</span>
                          </div>
                        </td>
                        <td className="p-2">
                          <span
                            className={`px-2 py-1 rounded text-xs ${
                              threat.status === 'Neutralized'
                                ? 'bg-green-500/20 text-green-400'
                                : threat.status === 'Tracking'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : threat.status === 'Escalated'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-blue-500/20 text-blue-400'
                            }`}
                          >
                            {threat.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* AI Command Console */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Command className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AI Command Console
                </h2>
              </div>
              <form onSubmit={handleCommandSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Ask the AI Defense Bot</label>
                  <input
                    type="text"
                    value={command}
                    onChange={(e) => setCommand(e.target.value)}
                    placeholder="e.g., Scan for threats, Isolate suspicious process, Explain last attack..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors text-white font-medium"
                >
                  Send Command
                </button>
              </form>
              {commandResponse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                >
                  <p className="text-slate-300">{commandResponse}</p>
                </motion.div>
              )}
            </motion.div>

            {/* AI Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Lightbulb className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AI Recommendations
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendations.map((rec, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                  >
                    <p className="text-slate-300 text-sm">{rec}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIDefenseBot
