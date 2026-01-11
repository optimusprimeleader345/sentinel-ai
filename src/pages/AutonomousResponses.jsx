import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  AlertTriangle,
  Activity,
  Settings,
  ToggleLeft,
  ToggleRight,
  Eye,
  EyeOff,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  BarChart3,
  Filter,
  RefreshCw,
  Play,
  Pause,
  Bell,
  Users,
  Target,
  AlertCircle
} from 'lucide-react'
import Card from '../components/Card'
import SeverityBadge from '../components/SeverityBadge'
import ResponseDecision from '../components/response/ResponseDecision'
import AutoActionLog from '../components/response/AutoActionLog'
import MitreBadge from '../components/MitreBadge'
import { useAuth } from '../contexts/AuthContext'
import responseEngine from '../services/responseEngine'

function AutonomousResponses() {
  const { user } = useAuth()
  const [incidents, setIncidents] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [autoResponseEnabled, setAutoResponseEnabled] = useState(true)
  const [loading, setLoading] = useState(true)
  const [showSettings, setShowSettings] = useState(false)

  // Mock incident data for demonstration
  const mockIncidents = [
    {
      id: 'INC-001',
      type: 'malware',
      severity: 'CRITICAL',
      asset: '192.168.1.100',
      description: 'Ransomware detected on critical server',
      riskScore: 95,
      timestamp: new Date(Date.now() - 300000).toISOString() // 5 minutes ago
    },
    {
      id: 'INC-002',
      type: 'phishing',
      severity: 'HIGH',
      asset: 'user@company.com',
      description: 'Suspicious email with malicious attachment',
      riskScore: 78,
      timestamp: new Date(Date.now() - 600000).toISOString() // 10 minutes ago
    },
    {
      id: 'INC-003',
      type: 'unauthorized_access',
      severity: 'MEDIUM',
      asset: 'database-server-01',
      description: 'Multiple failed login attempts',
      riskScore: 45,
      timestamp: new Date(Date.now() - 900000).toISOString() // 15 minutes ago
    },
    {
      id: 'INC-004',
      type: 'suspicious_traffic',
      severity: 'LOW',
      asset: 'web-server-02',
      description: 'Unusual network traffic pattern detected',
      riskScore: 12,
      timestamp: new Date(Date.now() - 1200000).toISOString() // 20 minutes ago
    }
  ]

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIncidents(mockIncidents)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleAutoResponseToggle = () => {
    const newState = !autoResponseEnabled
    setAutoResponseEnabled(newState)
    responseEngine.toggleAutoResponse(newState)
  }

  const handleActionExecuted = (result) => {
    console.log('Action executed:', result)
    // Could trigger notifications or updates here
  }

  const handleOverride = (incident) => {
    // Admin override functionality
    alert(`Admin override initiated for incident ${incident.id}`)
  }

  const getSeverityStats = () => {
    const stats = incidents.reduce((acc, inc) => {
      acc[inc.severity] = (acc[inc.severity] || 0) + 1
      return acc
    }, {})
    return stats
  }

  const severityStats = getSeverityStats()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p>Loading autonomous response system...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-8 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                {autoResponseEnabled && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  Autonomous Response Engine
                </h1>
                <p className="text-slate-400 text-lg">
                  AI-powered automated threat response & incident management
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${autoResponseEnabled ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm text-slate-300">
                      System {autoResponseEnabled ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-300">
                      Last updated: {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm text-cyan-400">
                      {incidents.filter(i => i.severity === 'CRITICAL').length} Critical Incidents
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              {/* Status Indicators */}
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                  <Bell className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-slate-300">Alerts Active</span>
                </div>
                <div className="flex items-center space-x-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                  <Target className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-slate-300">Monitoring</span>
                </div>
              </div>

              {/* Auto-Response Toggle */}
              {user?.role === 'admin' && (
                <div className="flex items-center space-x-4 bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <span className="text-sm font-medium text-slate-300">
                      Auto-Response
                    </span>
                    <button
                      onClick={handleAutoResponseToggle}
                      className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ${
                        autoResponseEnabled
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 shadow-lg shadow-green-500/25'
                          : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${
                          autoResponseEnabled ? 'translate-x-8' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold ${autoResponseEnabled ? 'text-green-400' : 'text-red-400'}`}>
                      {autoResponseEnabled ? 'ENABLED' : 'DISABLED'}
                    </div>
                    <div className="text-xs text-slate-400">
                      {autoResponseEnabled ? 'Active Response' : 'Manual Only'}
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Warning Banner */}
        {autoResponseEnabled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4"
          >
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              <div className="flex-1">
                <h3 className="text-yellow-400 font-semibold">Autonomous Response Active</h3>
                <p className="text-yellow-200 text-sm">
                  Critical severity incidents will be automatically mitigated. High severity requires approval.
                </p>
              </div>
              <button
                onClick={() => setAutoResponseEnabled(false)}
                className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-black rounded text-sm font-medium"
              >
                Disable
              </button>
            </div>
          </motion.div>
        )}

        {/* Enhanced Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">{incidents.length}</div>
            <div className="text-sm text-slate-400 mb-2">Total Incidents</div>
            <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full inline-block">
              Active Monitoring
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/40 to-red-800/40 backdrop-blur-sm rounded-2xl border border-red-600/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <Zap className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-red-400 mb-1">{severityStats.CRITICAL || 0}</div>
            <div className="text-sm text-slate-300 mb-2">Critical (Auto)</div>
            <div className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full inline-block">
              Immediate Response
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-900/40 to-orange-800/40 backdrop-blur-sm rounded-2xl border border-orange-600/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <Clock className="w-5 h-5 text-orange-400" />
            </div>
            <div className="text-3xl font-bold text-orange-400 mb-1">{severityStats.HIGH || 0}</div>
            <div className="text-sm text-slate-300 mb-2">High (Approval)</div>
            <div className="text-xs text-orange-400 bg-orange-500/10 px-2 py-1 rounded-full inline-block">
              Requires Review
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/40 backdrop-blur-sm rounded-2xl border border-blue-600/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <Eye className="w-5 h-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-blue-400 mb-1">{severityStats.MEDIUM || 0}</div>
            <div className="text-sm text-slate-300 mb-2">Medium (Review)</div>
            <div className="text-xs text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full inline-block">
              Monitor Only
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Incidents List */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 shadow-xl"
            >
              <div className="p-6 border-b border-slate-600/30">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Active Incidents</h2>
                      <p className="text-sm text-slate-400">{incidents.length} incidents detected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>

                {/* Quick Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <button className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-medium hover:bg-red-500/30 transition-colors">
                    Critical ({severityStats.CRITICAL || 0})
                  </button>
                  <button className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-xs font-medium hover:bg-orange-500/30 transition-colors">
                    High ({severityStats.HIGH || 0})
                  </button>
                  <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-xs font-medium hover:bg-blue-500/30 transition-colors">
                    Medium ({severityStats.MEDIUM || 0})
                  </button>
                  <button className="px-3 py-1 bg-slate-600/50 text-slate-400 rounded-lg text-xs font-medium hover:bg-slate-500/50 transition-colors">
                    All
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                  {incidents.map((incident, index) => (
                    <motion.div
                      key={incident.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => setSelectedIncident(incident)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${
                        selectedIncident?.id === incident.id
                          ? 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/50 shadow-lg shadow-blue-500/10'
                          : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 hover:shadow-md'
                      }`}
                    >
                      {/* Status Indicator */}
                      <div className={`absolute top-3 right-3 w-3 h-3 rounded-full border-2 border-slate-800 ${
                        incident.severity === 'CRITICAL' ? 'bg-red-500 animate-pulse' :
                        incident.severity === 'HIGH' ? 'bg-orange-500' :
                        incident.severity === 'MEDIUM' ? 'bg-blue-500' : 'bg-green-500'
                      }`}></div>

                      <div className="pr-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-mono text-cyan-400 font-medium">{incident.id}</span>
                          <div className="text-right">
                            <div className="text-xs text-slate-400 mb-1">
                              {new Date(incident.timestamp).toLocaleTimeString()}
                            </div>
                            <SeverityBadge severity={incident.severity} />
                          </div>
                        </div>

                        <p className="text-white text-sm font-medium mb-2 leading-relaxed">
                          {incident.description}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <span className="text-xs text-slate-400">{incident.asset}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <BarChart3 className="w-3 h-3 text-slate-500" />
                            <span className="text-xs text-slate-500">{incident.riskScore}%</span>
                          </div>
                        </div>

                        {/* Hover Actions */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-end pr-4">
                          <div className="flex space-x-2">
                            <button className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center transition-colors">
                              <Eye className="w-4 h-4 text-blue-400" />
                            </button>
                            <button className="w-8 h-8 bg-green-500/20 hover:bg-green-500/40 rounded-lg flex items-center justify-center transition-colors">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {incidents.length === 0 && (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">No Active Incidents</h3>
                    <p className="text-sm text-slate-500">All systems operating normally</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Response Panel */}
          <div className="lg:col-span-2 space-y-6">
            {selectedIncident ? (
              <>
                <ResponseDecision
                  incident={selectedIncident}
                  onActionExecuted={handleActionExecuted}
                  onOverride={handleOverride}
                />
                <AutoActionLog />
              </>
            ) : (
              <Card>
                <div className="p-12 text-center">
                  <Shield className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Select an Incident</h3>
                  <p className="text-slate-400">
                    Choose an incident from the list to view response decisions and execute actions.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && user?.role === 'admin' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">System Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Auto-Response Engine</h4>
                      <p className="text-slate-400 text-sm">Enable/disable automatic threat response</p>
                    </div>
                    <button
                      onClick={handleAutoResponseToggle}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        autoResponseEnabled ? 'bg-green-600' : 'bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          autoResponseEnabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">Critical Auto-Execution</h4>
                      <p className="text-slate-400 text-sm">Automatically execute actions for critical incidents</p>
                    </div>
                    <div className="text-green-400 font-medium">Enabled</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white font-medium">High Severity Approval</h4>
                      <p className="text-slate-400 text-sm">Require analyst/admin approval for high severity</p>
                    </div>
                    <div className="text-orange-400 font-medium">Required</div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default AutonomousResponses
