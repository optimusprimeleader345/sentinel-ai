import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, Shield, AlertTriangle, Eye, HardDrive, Zap, MessageSquare } from 'lucide-react'
import { guardianAPI } from '../lib/api.js'
import {
  getGuardianScore,
  getGuardianAnomalies,
  getGuardianPrivacyScan,
  getGuardianDeviceSecurity,
  getGuardianRecommendations,
  askAIGuardian
} from '../lib/api.js'

function AIGuardian() {
  const [score, setScore] = useState({})
  const [anomalies, setAnomalies] = useState([])
  const [privacyScan, setPrivacyScan] = useState([])
  const [deviceSecurity, setDeviceSecurity] = useState({})
  const [recommendations, setRecommendations] = useState([])
  const [chatQuery, setChatQuery] = useState('')
  const [chatResponse, setChatResponse] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, anomaliesRes, privacyRes, deviceRes, recsRes] = await Promise.all([
          getGuardianScore(),
          getGuardianAnomalies(),
          getGuardianPrivacyScan(),
          getGuardianDeviceSecurity(),
          getGuardianRecommendations()
        ])
        setScore(scoreRes.data)
        setAnomalies(anomaliesRes.data)
        setPrivacyScan(privacyRes.data)
        setDeviceSecurity(deviceRes.data)
        setRecommendations(recsRes.data)
      } catch (error) {
        console.error('Error fetching guardian data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatQuery.trim()) return

    try {
      const response = await askAIGuardian({ prompt: chatQuery })
      setChatResponse(response.data.reply)
    } catch (error) {
      setChatResponse('Error processing query')
    }
    setChatQuery('')
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Brain className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">AI Guardian</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Advanced AI protection and monitoring</p>

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
            {/* Guardian Security Score */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Guardian Security Score
                </h2>
              </div>
              <div className="text-center">
                <div className="relative inline-block">
                  <svg className="w-32 h-32" viewBox="0 0 36 36">
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="rgba(203, 213, 225, 0.2)"
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${score.overall || 0}, 100`}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      {score.overall || 0}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
                  {score.categories && Object.entries(score.categories).map(([key, value], index) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-sm text-slate-400 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                      </div>
                      <div className={`text-lg font-bold ${value.score >= 90 ? 'text-green-400' : value.score >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {value.score}
                      </div>
                      <div className="text-xs text-slate-500">{value.status}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Account & Device Anomalies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Account & Device Anomalies
                </h2>
              </div>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {anomalies.map((anomaly, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex justify-between items-start p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span className={`px-2 py-1 rounded text-xs ${
                          anomaly.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                          anomaly.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {anomaly.severity}
                        </span>
                        <span className="text-xs text-slate-500 uppercase">{anomaly.category}</span>
                      </div>
                      <div className="text-sm text-slate-300">{anomaly.description}</div>
                    </div>
                    <div className="text-xs text-slate-500">
                      {new Date(anomaly.timestamp).toLocaleTimeString()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Privacy Leak Scan Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Privacy Leak Scan Results
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {privacyScan.map((scan, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-slate-300 font-medium">{scan.type}</div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        scan.status === 'Found' ? 'bg-red-500/20 text-red-400' :
                        scan.status === 'Clean' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {scan.status}
                      </span>
                    </div>
                    <div className="text-sm text-slate-400 mb-1">
                      Risk: <span className={`font-medium ${
                        scan.risk === 'High' ? 'text-red-400' :
                        scan.risk === 'Medium' ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>{scan.risk}</span>
                    </div>
                    <div className="text-xs text-slate-500">{scan.details}</div>
                    {scan.count > 0 && (
                      <div className="text-xs text-slate-500 mt-1">Incidents: {scan.count}</div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Device Security Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <HardDrive className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Device Security Overview
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">OS Protection Status</div>
                  <div className={`text-lg font-bold ${deviceSecurity.osProtectionStatus === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                    {deviceSecurity.osProtectionStatus || 'Inactive'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Antivirus</div>
                  <div className={`text-lg font-bold ${deviceSecurity.antivirus === 'Enabled' ? 'text-green-400' : 'text-red-400'}`}>
                    {deviceSecurity.antivirus || 'Disabled'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">Firewall</div>
                  <div className={`text-lg font-bold ${deviceSecurity.firewall === 'Enabled' ? 'text-green-400' : 'text-red-400'}`}>
                    {deviceSecurity.firewall || 'Disabled'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">File Integrity Monitoring</div>
                  <div className={`text-lg font-bold ${deviceSecurity.fileIntegrityMonitoring === 'OK' ? 'text-green-400' : 'text-red-400'}`}>
                    {deviceSecurity.fileIntegrityMonitoring || 'Warning'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-slate-400 mb-2">USB Intrusion Protection</div>
                  <div className={`text-lg font-bold ${deviceSecurity.usbIntrusionProtection === 'Enabled' ? 'text-green-400' : 'text-red-400'}`}>
                    {deviceSecurity.usbIntrusionProtection || 'Disabled'}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* AI Guardian Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AI Guardian Recommendations
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            {/* AI Chat Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)]"
            >
              <div className="flex items-center space-x-3 mb-4">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Security Chat Assistant
                </h2>
              </div>
              <form onSubmit={handleChatSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Ask the AI Guardian</label>
                  <input
                    type="text"
                    value={chatQuery}
                    onChange={(e) => setChatQuery(e.target.value)}
                    placeholder="e.g., How can I secure my device?, Am I exposed on the dark web?, Explain the last anomaly..."
                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-lg focus:outline-none focus:border-cyan-500 text-slate-300"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors text-white font-medium"
                >
                  Ask Guardian
                </button>
              </form>
              {chatResponse && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20"
                >
                  <p className="text-slate-300">{chatResponse}</p>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default AIGuardian
