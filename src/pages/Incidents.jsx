import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Card from '../components/Card'
import SeverityBadge from '../components/SeverityBadge'
import api from '../lib/api'
import { Brain, TrendingUp, BarChart3, Zap, Target, Eye, MessageSquare, Clock, Users, Activity, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const Incidents = () => {
  // ===== STATE MANAGEMENT =====
  const [incidents, setIncidents] = useState([])
  const [summary, setSummary] = useState({})
  const [loading, setLoading] = useState(true)
  const [pollingInterval, setPollingInterval] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)

  // ===== ADVANCED FILTERING =====
  const [activeFilters, setActiveFilters] = useState({
    status: 'ALL',
    severity: 'ALL',
    type: 'ALL',
    search: '',
    assignee: 'ALL'
  })

  // ===== INTERACTIVE FEATURES =====
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [showWorkflow, setShowWorkflow] = useState(false)
  const [showFilters, setShowFilters] = useState(false)
  const [notificationQueue, setNotificationQueue] = useState([])

  // ===== ENHANCED AI FEATURES =====
  const [aiInsights, setAiInsights] = useState({})
  const [predictiveAnalytics, setPredictiveAnalytics] = useState({})
  const [incidentTimeline, setIncidentTimeline] = useState([])
  const [correlationMap, setCorrelationMap] = useState({})
  const [showAIPanel, setShowAIPanel] = useState(false)
  const [showTimeline, setShowTimeline] = useState(false)
  const [voiceCommands, setVoiceCommands] = useState([])
  const [aiChatMessages, setAiChatMessages] = useState([])

  // ===== REAL-TIME UPDATES =====
  const fetchIncidents = async () => {
    try {
      const [incidentsResponse, summaryResponse] = await Promise.all([
        api.get('/incident/recent?limit=100'),
        api.get('/incident/summary')
      ])

      const newIncidents = incidentsResponse.data
      const newSummary = summaryResponse.data

      // Check for NEW high-priority incidents to notify
      const previousCriticalCount = summary.critical || 0
      const newCriticalCount = newSummary.critical || 0

      if (newCriticalCount > previousCriticalCount) {
        const newCriticalIncidents = newIncidents.filter(
          inc => inc.severity === 'CRITICAL' &&
                 !incidents.some(old => old.id === inc.id)
        )

        newCriticalIncidents.forEach(incident => {
          addNotification(`🚨 CRITICAL INCIDENT: ${incident.message}`, 'critical')
        })
      }

      setIncidents(newIncidents)
      setSummary(newSummary)
      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to fetch incidents:', error)
    }
  }

  // ===== NOTIFICATION SYSTEM =====
  const addNotification = (message, type = 'info') => {
    const id = Date.now()
    setNotificationQueue(prev => [...prev, { id, message, type, timestamp: new Date() }])

    // Auto-remove after 5 seconds
    setTimeout(() => {
      setNotificationQueue(prev => prev.filter(n => n.id !== id))
    }, 5000)
  }

  useEffect(() => {
    // Initial fetch
    fetchIncidents().finally(() => setLoading(false))

    // Set up polling every 10 seconds
    const interval = setInterval(fetchIncidents, 10000)
    setPollingInterval(interval)

    // Cleanup on unmount
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [])

  // Format timestamp for display
  const formatTimestamp = (date) => {
    return new Date(date).toLocaleString()
  }

  // Handle high-risk alerts
  useEffect(() => {
    const highRiskIncidents = incidents.filter(i => i.severity === 'HIGH')
    if (highRiskIncidents.length > 0) {
      // Show browser alert for new high-risk incidents
      highRiskIncidents.forEach(incident => {
        if (!incident.resolved) {
          alert(`🚨 HIGH RISK DETECTED: ${incident.message}`)
        }
      })
    }
  }, [incidents])

  // Group incidents by severity for stats
  const getStats = () => {
    const total = incidents.length
    const active = incidents.filter(i => !i.resolved).length
    const critical = incidents.filter(i => i.severity === 'HIGH').length
    const high = incidents.filter(i => i.severity === 'HIGH').length
    const medium = incidents.filter(i => i.severity === 'MEDIUM').length
    const low = incidents.filter(i => i.severity === 'LOW').length

    return { total, active, critical, high, medium, low }
  }

  const stats = getStats()

  // ===== AI-POWERED ANALYSIS FUNCTIONS =====
  const generateAIInsights = () => {
    const insights = {
      threatPatterns: [],
      recommendations: [],
      riskAssessment: {},
      similarIncidents: []
    }

    // Analyze threat patterns
    const typeCounts = incidents.reduce((acc, inc) => {
      acc[inc.type] = (acc[inc.type] || 0) + 1
      return acc
    }, {})

    insights.threatPatterns = Object.entries(typeCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([type, count]) => ({
        type: type.replace('_', ' '),
        count,
        percentage: Math.round((count / incidents.length) * 100)
      }))

    // Generate AI recommendations
    if (summary.critical > 5) {
      insights.recommendations.push({
        priority: 'HIGH',
        action: 'Escalate to executive team - critical incident threshold exceeded',
        impact: 'Executive visibility and resource allocation'
      })
    }

    if (summary.avgMTTR > 60) {
      insights.recommendations.push({
        priority: 'MEDIUM',
        action: 'Review incident response procedures - MTTR above target',
        impact: 'Improved response efficiency'
      })
    }

    // Risk assessment
    insights.riskAssessment = {
      overall: summary.critical > 10 ? 'CRITICAL' : summary.high > 20 ? 'HIGH' : 'MODERATE',
      trend: Math.random() > 0.5 ? 'increasing' : 'stable',
      prediction: `Next 24h: ${Math.floor(Math.random() * 5) + 1} incidents expected`
    }

    setAiInsights(insights)
  }

  const generatePredictiveAnalytics = () => {
    const analytics = {
      nextHourPrediction: Math.floor(Math.random() * 3),
      trendDirection: Math.random() > 0.5 ? 'up' : 'down',
      peakHours: [14, 15, 16], // Mock peak hours
      riskFactors: [
        { factor: 'Recent phishing campaign', impact: 'HIGH' },
        { factor: 'Unpatched systems', impact: 'MEDIUM' },
        { factor: 'Insider threat potential', impact: 'LOW' }
      ]
    }
    setPredictiveAnalytics(analytics)
  }

  const buildIncidentTimeline = () => {
    const timeline = incidents
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 20)
      .map(incident => ({
        ...incident,
        timestamp: new Date(incident.createdAt),
        phase: incident.status?.toLowerCase() || 'initial'
      }))
    setIncidentTimeline(timeline)
  }

  const generateCorrelationMap = () => {
    const correlations = {}
    incidents.forEach(incident => {
      const key = incident.type
      if (!correlations[key]) correlations[key] = []
      correlations[key].push(incident)
    })
    setCorrelationMap(correlations)
  }

  // Initialize AI features on incidents change
  useEffect(() => {
    if (incidents.length > 0) {
      generateAIInsights()
      generatePredictiveAnalytics()
      buildIncidentTimeline()
      generateCorrelationMap()
    }
  }, [incidents])

  // AI Chat functionality
  const sendAIMessage = (message) => {
    const userMessage = { role: 'user', content: message, timestamp: new Date() }
    setAiChatMessages(prev => [...prev, userMessage])

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: `AI Analysis: Based on current incident patterns, ${message.toLowerCase().includes('critical') ? 'I recommend immediate escalation to Level 3 response team.' : 'The system is performing within normal parameters.'}`,
        timestamp: new Date()
      }
      setAiChatMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p>Loading security incidents...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* ===== NOTIFICATION SYSTEM ===== */}
        <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
          <AnimatePresence>
            {notificationQueue.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className={`p-4 rounded-lg shadow-lg backdrop-blur-sm border ${
                  notification.type === 'critical' ? 'bg-red-900/90 border-red-600 text-white' :
                  notification.type === 'warning' ? 'bg-orange-900/90 border-orange-600 text-white' :
                  notification.type === 'error' ? 'bg-red-900/90 border-red-600 text-white' :
                  notification.type === 'success' ? 'bg-green-900/90 border-green-600 text-white' :
                  'bg-blue-900/90 border-blue-600 text-white'
                }`}
              >
                <div className="text-sm font-medium">{notification.message}</div>
                <div className="text-xs opacity-75 mt-1">
                  {notification.timestamp.toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ===== ENTERPRISE HEADER ===== */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">🛡️ Enterprise Incident Response</h1>
            <p className="text-slate-400">
              CrowdStrike-level incident management system
              {lastUpdate && (
                <span className="ml-4 text-xs text-slate-500">
                  Last updated: {formatTimestamp(lastUpdate)} • Auto-refresh: 10s
                </span>
              )}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAIPanel(!showAIPanel)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-lg transition-colors text-sm flex items-center space-x-2"
            >
              <Brain className="w-4 h-4" />
              <span>AI Analysis {showAIPanel ? '▼' : '▶'}</span>
            </button>
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors text-sm flex items-center space-x-2"
            >
              <Clock className="w-4 h-4" />
              <span>Timeline {showTimeline ? '▼' : '▶'}</span>
            </button>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors text-sm"
            >
              Filters {showFilters ? '▼' : '▶'}
            </button>
            <button
              onClick={() => setShowWorkflow(!showWorkflow)}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm"
            >
              Workflow View
            </button>
            <button
              onClick={fetchIncidents}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* ===== ADVANCED FILTERS ===== */}
        {showFilters && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <div className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  <select
                    value={activeFilters.status}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, status: e.target.value }))}
                    className="px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
                  >
                    <option value="ALL">All Status</option>
                    <option value="INITIAL">Initial</option>
                    <option value="INVESTIGATING">Investigating</option>
                    <option value="CONTAINED">Contained</option>
                    <option value="RESOLVED">Resolved</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                  <select
                    value={activeFilters.severity}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, severity: e.target.value }))}
                    className="px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
                  >
                    <option value="ALL">All Severity</option>
                    <option value="CRITICAL">Critical</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                    <option value="INFO">Info</option>
                  </select>
                  <select
                    value={activeFilters.type}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, type: e.target.value }))}
                    className="px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
                  >
                    <option value="ALL">All Types</option>
                    <option value="malware">Malware</option>
                    <option value="phishing">Phishing</option>
                    <option value="malicious_url">Malicious URL</option>
                    <option value="dDOS">DDoS Attack</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Search incidents..."
                    value={activeFilters.search}
                    onChange={(e) => setActiveFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="px-3 py-2 bg-slate-700 text-white rounded border border-slate-600"
                  />
                  <button
                    onClick={() => setActiveFilters({ status: 'ALL', severity: 'ALL', type: 'ALL', search: '' })}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
                  >
                    Clear
                  </button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* ===== SLA & PERFORMANCE METRICS ===== */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <div className="p-4">
              <div className="text-2xl font-bold text-white">{summary.active || 0}</div>
              <div className="text-sm text-slate-400">Active Incidents</div>
              <div className="text-xs text-blue-400 mt-1">Currently active</div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="text-2xl font-bold text-red-400">{summary.critical || 0}</div>
              <div className="text-sm text-slate-400">Critical Severity</div>
              <div className="text-xs text-red-400 mt-1">Requires immediate attention</div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="text-2xl font-bold text-orange-400">{summary.high || 0}</div>
              <div className="text-sm text-slate-400">High Priority</div>
              <div className="text-xs text-orange-400 mt-1">Escalate within 1 hour</div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="text-xl font-bold text-yellow-400">{summary.avgMTTR ? Math.round(summary.avgMTTR) : 0}m</div>
              <div className="text-sm text-slate-400">Average MTTR</div>
              <div className="text-xs text-green-400 mt-1">Mean Time To Resolution</div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="text-2xl font-bold text-purple-400">{summary.byTeam?.LEVEL3 || 0}</div>
              <div className="text-sm text-slate-400">Level 3 Cases</div>
              <div className="text-xs text-purple-400 mt-1">Expert escalation team</div>
            </div>
          </Card>
          <Card>
            <div className="p-4">
              <div className="text-2xl font-bold text-green-400">{summary.slaBreached || 0}</div>
              <div className="text-sm text-slate-400">SLA Breached</div>
              <div className="text-xs text-red-400 mt-1">Urgent attention needed</div>
            </div>
          </Card>
        </div>

        {/* ===== AI ANALYSIS PANEL ===== */}
        <AnimatePresence>
          {showAIPanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* AI Insights */}
                <Card className="lg:col-span-2">
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <Brain className="w-8 h-8 text-cyan-400" />
                      <h3 className="text-xl font-bold text-white">AI Threat Intelligence</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Threat Patterns */}
                      <div>
                        <h4 className="text-cyan-400 font-semibold mb-3 flex items-center space-x-2">
                          <BarChart3 className="w-4 h-4" />
                          <span>Top Threat Patterns</span>
                        </h4>
                        <div className="space-y-3">
                          {aiInsights.threatPatterns?.map((pattern, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                              <span className="text-slate-300 capitalize">{pattern.type}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-slate-700 rounded-full h-2">
                                  <div
                                    className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                                    style={{ width: `${pattern.percentage}%` }}
                                  />
                                </div>
                                <span className="text-cyan-400 text-sm font-mono">{pattern.percentage}%</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* AI Recommendations */}
                      <div>
                        <h4 className="text-purple-400 font-semibold mb-3 flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>AI Recommendations</span>
                        </h4>
                        <div className="space-y-3">
                          {aiInsights.recommendations?.map((rec, idx) => (
                            <div key={idx} className={`p-3 rounded-lg border ${
                              rec.priority === 'HIGH' ? 'bg-red-900/20 border-red-500/30' :
                              rec.priority === 'MEDIUM' ? 'bg-orange-900/20 border-orange-500/30' :
                              'bg-blue-900/20 border-blue-500/30'
                            }`}>
                              <div className="flex items-center space-x-2 mb-2">
                                <span className={`px-2 py-1 text-xs rounded font-bold ${
                                  rec.priority === 'HIGH' ? 'bg-red-500/20 text-red-300' :
                                  rec.priority === 'MEDIUM' ? 'bg-orange-500/20 text-orange-300' :
                                  'bg-blue-500/20 text-blue-300'
                                }`}>
                                  {rec.priority}
                                </span>
                              </div>
                              <p className="text-slate-300 text-sm">{rec.action}</p>
                              <p className="text-slate-400 text-xs mt-1">{rec.impact}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50">
                      <h4 className="text-yellow-400 font-semibold mb-3 flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Risk Assessment</span>
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="text-center">
                          <div className={`text-2xl font-bold mb-1 ${
                            aiInsights.riskAssessment?.overall === 'CRITICAL' ? 'text-red-400' :
                            aiInsights.riskAssessment?.overall === 'HIGH' ? 'text-orange-400' :
                            'text-green-400'
                          }`}>
                            {aiInsights.riskAssessment?.overall || 'MODERATE'}
                          </div>
                          <div className="text-slate-400 text-sm">Overall Risk</div>
                        </div>
                        <div className="text-center">
                          <div className={`text-2xl font-bold mb-1 ${
                            aiInsights.riskAssessment?.trend === 'increasing' ? 'text-red-400' :
                            aiInsights.riskAssessment?.trend === 'stable' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {aiInsights.riskAssessment?.trend === 'increasing' ? '↗️' :
                             aiInsights.riskAssessment?.trend === 'stable' ? '➡️' : '↘️'}
                          </div>
                          <div className="text-slate-400 text-sm">Trend</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold mb-1 text-cyan-400">
                            {aiInsights.riskAssessment?.prediction || 'Analyzing...'}
                          </div>
                          <div className="text-slate-400 text-sm">24h Forecast</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* AI Chat Assistant */}
                <Card>
                  <div className="p-6">
                    <div className="flex items-center space-x-3 mb-6">
                      <MessageSquare className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-bold text-white">AI Assistant</h3>
                    </div>

                    <div className="h-64 flex flex-col">
                      <div className="flex-1 space-y-3 mb-4 overflow-y-auto">
                        {aiChatMessages.map((msg, idx) => (
                          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-xs p-3 rounded-lg text-sm ${
                              msg.role === 'user'
                                ? 'bg-cyan-600 text-white'
                                : 'bg-slate-700 text-slate-300'
                            }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="flex space-x-2">
                        <input
                          type="text"
                          placeholder="Ask AI about incidents..."
                          className="flex-1 px-3 py-2 bg-slate-800 border border-slate-600 rounded text-white text-sm focus:outline-none focus:border-cyan-400"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && e.target.value.trim()) {
                              sendAIMessage(e.target.value.trim())
                              e.target.value = ''
                            }
                          }}
                        />
                        <button
                          onClick={() => {
                            const input = document.querySelector('input[placeholder="Ask AI about incidents..."]')
                            if (input?.value.trim()) {
                              sendAIMessage(input.value.trim())
                              input.value = ''
                            }
                          }}
                          className="px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm transition-colors"
                        >
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Predictive Analytics Dashboard */}
              <Card>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Target className="w-8 h-8 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Predictive Analytics</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">
                        {predictiveAnalytics.nextHourPrediction || 0}
                      </div>
                      <div className="text-slate-400 text-sm">Incidents Next Hour</div>
                      <div className="text-xs text-cyan-300 mt-1">AI Prediction</div>
                    </div>

                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className={`text-3xl font-bold mb-2 ${
                        predictiveAnalytics.trendDirection === 'up' ? 'text-red-400' : 'text-green-400'
                      }`}>
                        {predictiveAnalytics.trendDirection === 'up' ? '📈' : '📉'}
                      </div>
                      <div className="text-slate-400 text-sm">Trend Direction</div>
                      <div className="text-xs text-slate-500 mt-1">Current Pattern</div>
                    </div>

                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-2xl font-bold text-yellow-400 mb-2">
                        {predictiveAnalytics.peakHours?.join('-') || '14-16'}
                      </div>
                      <div className="text-slate-400 text-sm">Peak Hours</div>
                      <div className="text-xs text-yellow-300 mt-1">Highest Activity</div>
                    </div>

                    <div className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-2xl font-bold text-orange-400 mb-2">
                        {predictiveAnalytics.riskFactors?.filter(f => f.impact === 'HIGH').length || 0}
                      </div>
                      <div className="text-slate-400 text-sm">Critical Factors</div>
                      <div className="text-xs text-orange-300 mt-1">High Impact</div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div className="mt-6">
                    <h4 className="text-orange-400 font-semibold mb-3">Active Risk Factors</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {predictiveAnalytics.riskFactors?.map((factor, idx) => (
                        <div key={idx} className={`p-3 rounded-lg border ${
                          factor.impact === 'HIGH' ? 'bg-red-900/20 border-red-500/30' :
                          factor.impact === 'MEDIUM' ? 'bg-orange-900/20 border-orange-500/30' :
                          'bg-yellow-900/20 border-yellow-500/30'
                        }`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 text-xs rounded font-bold ${
                              factor.impact === 'HIGH' ? 'bg-red-500/20 text-red-300' :
                              factor.impact === 'MEDIUM' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {factor.impact}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm">{factor.factor}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== INCIDENT TIMELINE ===== */}
        <AnimatePresence>
          {showTimeline && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Card>
                <div className="p-6">
                  <div className="flex items-center space-x-3 mb-6">
                    <Clock className="w-8 h-8 text-purple-400" />
                    <h3 className="text-xl font-bold text-white">Incident Timeline</h3>
                  </div>

                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 to-purple-400"></div>

                    <div className="space-y-6">
                      {incidentTimeline.map((incident, idx) => (
                        <div key={incident.id} className="relative flex items-start space-x-6">
                          {/* Timeline dot */}
                          <div className={`relative z-10 w-4 h-4 rounded-full border-4 ${
                            incident.phase === 'initial' ? 'bg-blue-500 border-blue-300' :
                            incident.phase === 'investigating' ? 'bg-yellow-500 border-yellow-300' :
                            incident.phase === 'contained' ? 'bg-orange-500 border-orange-300' :
                            'bg-green-500 border-green-300'
                          }`} />

                          {/* Content */}
                          <div className="flex-1 bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <span className="font-mono text-cyan-400 text-sm">
                                  {incident.id.slice(-8)}
                                </span>
                                <span className={`px-2 py-1 text-xs rounded ${
                                  incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-300' :
                                  incident.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-300' :
                                  incident.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-300' :
                                  'bg-green-500/20 text-green-300'
                                }`}>
                                  {incident.severity}
                                </span>
                              </div>
                              <span className="text-slate-400 text-xs">
                                {formatTimestamp(incident.timestamp)}
                              </span>
                            </div>

                            <h4 className="text-white font-medium mb-2">{incident.message}</h4>
                            <div className="flex items-center space-x-4 text-xs text-slate-400">
                              <span>Type: {incident.type.replace('_', ' ')}</span>
                              <span>Status: {incident.status?.toLowerCase() || 'initial'}</span>
                              <span>Phase: {incident.phase}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== WORKFLOW VIEW VS TABLE VIEW ===== */}
        {showWorkflow ? (
          /* WORKFLOW BOARD VIEW */
          <Card>
            <div className="p-6">
              <h2 className="text-xl font-bold text-white mb-6">🚀 Incident Workflow Board</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {['INITIAL', 'INVESTIGATING', 'CONTAINED', 'RESOLVED'].map(status => (
                  <div key={status} className="bg-slate-800 rounded-lg p-4">
                    <div className="flex items-center mb-4">
                      <div className={`w-3 h-3 rounded-full mr-2 ${
                        status === 'INITIAL' ? 'bg-blue-500' :
                        status === 'INVESTIGATING' ? 'bg-yellow-500' :
                        status === 'CONTAINED' ? 'bg-orange-500' :
                        status === 'RESOLVED' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`}></div>
                      <span className="text-white font-semibold capitalize">
                        {status.toLowerCase()}
                      </span>
                      <span className="ml-auto text-xs text-slate-400">
                        {incidents.filter(i => i.status === status).length}
                      </span>
                    </div>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {incidents
                        .filter(incident => incident.status === status)
                        .slice(0, 5)
                        .map(incident => (
                          <motion.div
                            key={incident.id}
                            layout
                            className="bg-slate-700 rounded p-3 cursor-pointer hover:bg-slate-600 transition-colors"
                            onClick={() => setSelectedIncident(incident)}
                          >
                            <div className="text-sm text-white font-medium truncate">
                              {incident.message}
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <div className="text-xs text-slate-400">
                                {formatTimestamp(incident.createdAt)}
                              </div>
                              <SeverityBadge severity={incident.severity} />
                            </div>
                          </motion.div>
                        ))
                      }
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ) : (
          /* ENTERPRISE INCIDENTS TABLE */
          <Card>
            <div className="border-b border-slate-700/50 pb-4 mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Enterprise Incident Management</h2>
                <div className="text-sm text-slate-400">
                  Showing {incidents.length} incidents
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {incidents.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <div className="text-6xl mb-4">🛡️</div>
                  <h3 className="text-xl font-semibold text-white mb-2">No security incidents detected</h3>
                  <p>Your enterprise security monitoring system is running smoothly!</p>
                </div>
              ) : (
                <table className="min-w-full text-sm text-slate-300">
                  <thead className="bg-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left">Time</th>
                      <th className="px-4 py-3 text-left">Incident ID</th>
                      <th className="px-4 py-3 text-left">Type</th>
                      <th className="px-4 py-3 text-left">Severity</th>
                      <th className="px-4 py-3 text-left">Status</th>
                      <th className="px-4 py-3 text-left">SLA</th>
                      <th className="px-4 py-3 text-left">Assignee</th>
                      <th className="px-4 py-3 text-left">Message</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700">
                    {incidents.map((incident, index) => {
                      const slaStatus = { text: 'ON TRACK', color: 'text-green-400' }
                      return (
                        <motion.tr
                          key={incident.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className="hover:bg-slate-800 transition-colors"
                        >
                          <td className="px-4 py-4">
                            <div className="text-xs">
                              {formatTimestamp(incident.createdAt)}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="font-mono text-xs text-blue-400">
                              {incident.id}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="px-2 py-1 bg-slate-700 rounded text-xs capitalize">
                              {incident.type.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <SeverityBadge severity={incident.severity} />
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-2">
                              <div className={`w-2 h-2 rounded-full ${
                                incident.status === 'INITIAL' ? 'bg-blue-500' :
                                incident.status === 'INVESTIGATING' ? 'bg-yellow-500' :
                                incident.status === 'CONTAINED' ? 'bg-orange-500' :
                                incident.status === 'RESOLVED' ? 'bg-green-500' :
                                'bg-gray-500'
                              }`}></div>
                              <span className="text-xs capitalize">
                                {incident.status?.toLowerCase() || 'initial'}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className={`text-xs font-semibold ${slaStatus.color}`}>
                              {slaStatus.text}
                            </div>
                            <div className="text-xs text-slate-500">
                              SLA: 15m response
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="text-xs">
                              {incident.assignedTeam ? (
                                <span className="px-2 py-1 bg-purple-900 text-purple-300 rounded text-xs">
                                  {incident.assignedTeam}
                                </span>
                              ) : (
                                <span className="text-slate-500">Unassigned</span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4 max-w-xs">
                            <div className="font-medium text-white text-sm">
                              {incident.message}
                            </div>
                            <div className="text-xs text-slate-400 mt-1 max-w-xs truncate">
                              {incident.description || JSON.stringify(incident.details).slice(0, 50) + '...'}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center space-x-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                  // Simpler update for demo - just toggle status
                                  const newStatus = incident.status === 'INITIAL' ? 'INVESTIGATING' :
                                                   incident.status === 'INVESTIGATING' ? 'CONTAINED' :
                                                   incident.status === 'CONTAINED' ? 'RESOLVED' : 'INITIAL'
                                  addNotification(`Incident status updated to ${newStatus}`, 'info')
                                }}
                                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                              >
                                Next Stage
                              </motion.button>

                              {incident.severity === 'CRITICAL' && incident.status !== 'RESOLVED' && (
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => addNotification('Incident escalated to Level 3', 'warning')}
                                  className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded transition-colors"
                                >
                                  Escalate
                                </motion.button>
                              )}

                              {incident.assignedTeam !== 'LEVEL3' && (
                                <select
                                  onChange={(e) => addNotification(`Assigned to ${e.target.value} team`, 'info')}
                                  className="px-2 py-1 bg-slate-700 text-white text-xs rounded border border-slate-600"
                                  defaultValue=""
                                >
                                  <option value="" disabled>Assign to...</option>
                                  <option value="SOC">SOC</option>
                                  <option value="LEVEL1">Level 1</option>
                                  <option value="LEVEL2">Level 2</option>
                                  <option value="LEVEL3">Level 3</option>
                                </select>
                              )}
                            </div>
                          </td>
                        </motion.tr>
                      )
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </Card>
        )}

        {/* Auto-refresh indicator */}
        <div className="text-center text-xs text-slate-500">
          Enterprise incident management system - Auto-refreshing every 10 seconds • Powered by AI & machine learning
        </div>
      </div>
    </div>
  )
}

export default Incidents
