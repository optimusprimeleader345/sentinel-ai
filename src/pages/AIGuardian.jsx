import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Shield,
  AlertTriangle,
  Eye,
  Zap,
  MessageSquare,
  Target,
  Settings,
  RefreshCw,
  Download,
  Calendar,
  Monitor,
  BarChart3,
  CheckCircle,
  AlertCircle,
  Activity,
  Cpu,
  Network,
  HardDrive,
  TrendingUp,
  Bell,
  Sparkles,
  Atom
} from 'lucide-react'
import PersonalAIAssistant from '../components/PersonalAIAssistant'
import { askAIGuardian } from '../lib/api.js'

const AIGuardian = () => {
  const [selectedTab, setSelectedTab] = useState('overview')
  const [chatQuery, setChatQuery] = useState('')
  const [chatResponse, setChatResponse] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock data for demonstration
  const [guardianData] = useState({
    score: 94,
    alerts: [
      { id: 1, type: 'threat', message: 'Suspicious login detected', severity: 'high', time: '2 min ago' },
      { id: 2, type: 'anomaly', message: 'Unusual network traffic', severity: 'medium', time: '5 min ago' },
      { id: 3, type: 'info', message: 'System scan completed', severity: 'low', time: '10 min ago' }
    ],
    insights: [
      { title: 'AI Confidence', value: '98.7%', trend: 'up' },
      { title: 'Threat Detection', value: '23/hr', trend: 'stable' },
      { title: 'Response Time', value: '1.2s', trend: 'down' }
    ],
    devices: [
      { name: 'Workstation-001', status: 'secure', lastSeen: '2 min ago' },
      { name: 'Server-Prod', status: 'warning', lastSeen: '1 min ago' },
      { name: 'Laptop-Mobile', status: 'secure', lastSeen: '5 min ago' }
    ],
    metrics: {
      accuracy: 98.7,
      latency: 23,
      throughput: 1500
    }
  })

  const handleChatSubmit = async (e) => {
    e.preventDefault()
    if (!chatQuery.trim()) return

    setLoading(true)
    try {
      const response = await askAIGuardian({ prompt: chatQuery })
      setChatResponse(response.data?.reply || 'AI Guardian response received')
    } catch (error) {
      setChatResponse('Unable to process query. Please try again.')
    } finally {
      setLoading(false)
    }
    setChatQuery('')
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'devices', label: 'Devices', icon: Monitor },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900 text-white relative overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="fixed inset-0 opacity-20">
        {/* Animated Grid Lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.8, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}

        {/* Neon Glow Orbs */}
        <motion.div
          className="absolute top-20 left-20 w-32 h-32 bg-cyan-500/20 rounded-full blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-24 h-24 bg-purple-500/20 rounded-full blur-xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 p-6 border-b border-cyan-500/30 bg-black/20 backdrop-blur-sm"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg shadow-cyan-500/25">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <motion.div
                className="absolute inset-0 bg-cyan-400 rounded-xl"
                animate={{
                  opacity: [0, 0.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                }}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Cyber AI Guardian
              </h1>
              <p className="text-cyan-300/80 text-sm">Neural Network Security Platform</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
              <motion.div
                className={`w-2 h-2 rounded-full ${guardianData.score >= 90 ? 'bg-green-400' : guardianData.score >= 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-cyan-300 text-sm font-medium">Score: {guardianData.score}</span>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-cyan-300 hover:text-white hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-20 bg-black/30 backdrop-blur-sm border-b border-cyan-500/20 shadow-lg">
        <div className="flex overflow-x-auto px-6 py-3 scrollbar-hide">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <motion.button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 mx-1 rounded-lg text-sm font-medium whitespace-nowrap transition-all min-w-max ${
                  selectedTab === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-lg shadow-cyan-500/25'
                    : 'text-cyan-400/70 hover:text-cyan-300 hover:bg-cyan-500/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </motion.button>
            )
          })}
        </div>
      </div>



      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div>
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* AI Score Card */}
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-8 shadow-2xl"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
                      <Shield className="w-8 h-8 text-cyan-400" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">AI Security Score</h2>
                      <p className="text-cyan-300/70">Neural network protection status</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {guardianData.score}
                    </div>
                    <div className="text-cyan-300/70 text-sm">Overall Rating</div>
                  </div>
                </div>

                {/* Score Circle */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="rgba(6, 182, 212, 0.2)"
                        strokeWidth="3"
                      />
                      <motion.path
                        d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                        fill="none"
                        stroke="url(#cyber-gradient)"
                        strokeWidth="3"
                        strokeDasharray={`${guardianData.score}, 100`}
                        initial={{ strokeDasharray: "0, 100" }}
                        animate={{ strokeDasharray: `${guardianData.score}, 100` }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                      <defs>
                        <linearGradient id="cyber-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#06b6d4" />
                          <stop offset="50%" stopColor="#3b82f6" />
                          <stop offset="100%" stopColor="#8b5cf6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-cyan-300">{guardianData.score}%</span>
                    </div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {guardianData.insights.map((insight, index) => (
                    <motion.div
                      key={insight.title}
                      className="text-center p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      <div className="text-2xl font-bold text-cyan-300 mb-1">{insight.value}</div>
                      <div className="text-cyan-400/70 text-sm mb-2">{insight.title}</div>
                      <div className={`text-xs ${insight.trend === 'up' ? 'text-green-400' : insight.trend === 'down' ? 'text-red-400' : 'text-blue-400'}`}>
                        {insight.trend === 'up' ? '↗ Increasing' : insight.trend === 'down' ? '↘ Decreasing' : '→ Stable'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Recent Alerts */}
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-red-500/20 rounded-lg border border-red-400/30">
                      <Bell className="w-6 h-6 text-red-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Recent Alerts</h2>
                  </div>
                  <span className="text-cyan-300/70 text-sm">{guardianData.alerts.length} active</span>
                </div>

                <div className="space-y-3">
                  {guardianData.alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.severity === 'high' ? 'bg-red-400' :
                          alert.severity === 'medium' ? 'bg-yellow-400' : 'bg-blue-400'
                        }`} />
                        <div>
                          <div className="text-white font-medium">{alert.message}</div>
                          <div className="text-cyan-300/70 text-sm">{alert.time}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                        alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        {alert.severity.toUpperCase()}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* Security Tab */}
          {selectedTab === 'security' && (
            <motion.div
              key="security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                      <CheckCircle className="w-6 h-6 text-green-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Security Status</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span className="text-green-300">Firewall</span>
                      <span className="text-green-400 font-medium">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-500/10 rounded-lg">
                      <span className="text-green-300">Antivirus</span>
                      <span className="text-green-400 font-medium">ENABLED</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-500/10 rounded-lg">
                      <span className="text-yellow-300">Updates</span>
                      <span className="text-yellow-400 font-medium">PENDING</span>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-3 bg-purple-500/20 rounded-lg border border-purple-400/30">
                      <Atom className="w-6 h-6 text-purple-400" />
                    </div>
                    <h2 className="text-xl font-bold text-white">AI Protection</h2>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span className="text-purple-300">Neural Defense</span>
                      <span className="text-purple-400 font-medium">98.7%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span className="text-purple-300">Anomaly Detection</span>
                      <span className="text-purple-400 font-medium">ACTIVE</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-500/10 rounded-lg">
                      <span className="text-purple-300">Threat Learning</span>
                      <span className="text-purple-400 font-medium">ONLINE</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Analytics Tab */}
          {selectedTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-4 bg-blue-500/20 rounded-lg w-fit mx-auto mb-4">
                    <Cpu className="w-8 h-8 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{guardianData.metrics.accuracy}%</div>
                  <div className="text-blue-300/70">AI Accuracy</div>
                </motion.div>

                <motion.div
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-4 bg-green-500/20 rounded-lg w-fit mx-auto mb-4">
                    <Zap className="w-8 h-8 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">{guardianData.metrics.latency}ms</div>
                  <div className="text-green-300/70">Response Time</div>
                </motion.div>

                <motion.div
                  className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="p-4 bg-purple-500/20 rounded-lg w-fit mx-auto mb-4">
                    <Network className="w-8 h-8 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{guardianData.metrics.throughput}</div>
                  <div className="text-purple-300/70">Throughput</div>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Devices Tab */}
          {selectedTab === 'devices' && (
            <motion.div
              key="devices"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {guardianData.devices.map((device, index) => (
                  <motion.div
                    key={device.name}
                    className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
                          <Monitor className="w-5 h-5 text-cyan-400" />
                        </div>
                        <span className="text-white font-medium">{device.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        device.status === 'secure' ? 'bg-green-500/20 text-green-400' :
                        device.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {device.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="text-cyan-300/70 text-sm">
                      Last seen: {device.lastSeen}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Settings Tab */}
          {selectedTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-2xl"
            >
              <motion.div
                className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 shadow-2xl"
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-cyan-500/20 rounded-lg border border-cyan-400/30">
                    <Settings className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h2 className="text-xl font-bold text-white">System Settings</h2>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium mb-1">Real-time Monitoring</h4>
                      <p className="text-cyan-300/70 text-sm">Continuous threat detection</p>
                    </div>
                    <div className="w-12 h-6 bg-cyan-500/20 rounded-full relative">
                      <div className="w-6 h-6 bg-cyan-400 rounded-full absolute right-0 top-0"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium mb-1">AI Auto-Response</h4>
                      <p className="text-cyan-300/70 text-sm">Automated threat mitigation</p>
                    </div>
                    <div className="w-12 h-6 bg-green-500/20 rounded-full relative">
                      <div className="w-6 h-6 bg-green-400 rounded-full absolute right-0 top-0"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                    <div>
                      <h4 className="text-white font-medium mb-1">Export Reports</h4>
                      <p className="text-cyan-300/70 text-sm">Generate security reports</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg text-white font-medium hover:from-cyan-600 hover:to-blue-600 transition-all">
                      Export
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Original AI Chat Assistant */}
      <PersonalAIAssistant />
    </div>
  )
}

export default AIGuardian
