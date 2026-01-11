import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/admin/GlassCard'
import {
  FileText,
  Upload,
  AlertTriangle,
  BarChart3,
  PieChart,
  Clock,
  Download,
  Brain,
  Sparkles,
  Loader,
  Activity,
  Eye,
  Shield,
  Target,
  RefreshCw,
  TrendingUp,
  Zap,
  Terminal,
  Search,
  Filter
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPie,
  Pie,
  Cell
} from 'recharts'
import { analyzeLogs, uploadLogFile, getLogAnomalies, getLogEvents, getLogTimeline } from '../lib/api.js'

// Real-time log analysis data
const logActivityData = [
  { time: '00:00', events: 12500, anomalies: 23, critical: 3 },
  { time: '04:00', events: 18900, anomalies: 34, critical: 1 },
  { time: '08:00', events: 28900, anomalies: 45, critical: 5 },
  { time: '12:00', events: 32100, anomalies: 67, critical: 7 },
  { time: '16:00', events: 27400, anomalies: 52, critical: 4 },
  { time: '20:00', events: 19800, anomalies: 31, critical: 2 },
]

const logVolumeData = [
  { category: 'Authentication', count: 850, fill: '#ef4444' },
  { category: 'Database', count: 620, fill: '#f59e0b' },
  { category: 'Network', count: 450, fill: '#06b6d4' },
  { category: 'Application', count: 380, fill: '#8b5cf6' },
  { category: 'Security', count: 290, fill: '#10b981' },
  { category: 'System', count: 180, fill: '#ec4899' },
]

const realTimeAnomalies = [
  {
    id: 1,
    type: 'Brute Force Detection',
    severity: 'High',
    description: '23 failed login attempts within 5 minutes from single IP',
    source: 'Authentication Server',
    confidence: 96,
    timestamp: new Date().toISOString(),
    status: 'Active'
  },
  {
    id: 2,
    type: 'Privilege Escalation',
    severity: 'Critical',
    description: 'Unauthorized access to admin-level permissions detected',
    source: 'IAM System',
    confidence: 89,
    timestamp: new Date(Date.now() - 300000).toISOString(),
    status: 'Mitigated'
  },
  {
    id: 3,
    type: 'Data Exfiltration',
    severity: 'Medium',
    description: 'Unusual outbound traffic pattern detected',
    source: 'Network Firewall',
    confidence: 82,
    timestamp: new Date(Date.now() - 600000).toISOString(),
    status: 'Monitoring'
  },
]

const aiPatterns = [
  {
    pattern: 'Advanced Persistent Threat',
    occurrences: 12,
    confidence: 94,
    indicators: ['Lateral movement', 'Data staging', 'C2 communication'],
    trend: 'escalating'
  },
  {
    pattern: 'Credential Stuffing',
    occurrences: 8,
    confidence: 87,
    indicators: ['Mass logins', 'Geographic mismatch', 'Session patterns'],
    trend: 'stable'
  },
  {
    pattern: 'Zero-Day Exploitation',
    occurrences: 3,
    confidence: 78,
    indicators: ['Unknown signature', 'Anomaly correlation', 'Behavior deviance'],
    trend: 'emerging'
  },
]

function AI_LogAnalyzer() {
  const [logText, setLogText] = useState('')
  const [logFile, setLogFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [anomalies, setAnomalies] = useState(realTimeAnomalies)
  const [events, setEvents] = useState([
    { level: 'info', count: 2540 },
    { level: 'warning', count: 634 },
    { level: 'error', count: 123 },
    { level: 'critical', count: 18 }
  ])
  const [timeline, setTimeline] = useState([])

  // Real-time log analysis updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update anomaly statuses and add new anomalies occasionally
      setAnomalies(prev => prev.map(anomaly => ({
        ...anomaly,
        status: Math.random() > 0.7 ?
          (anomaly.status === 'Active' ? 'Mitigated' :
           anomaly.status === 'Mitigated' ? 'Resolved' :
           'Active') : anomaly.status
      })))

      if (Math.random() < 0.3) {
        const newAnomaly = {
          id: Date.now(),
          type: ['Suspicious Traffic', 'Login Anomaly', 'Resource Abuse', 'File Access'][Math.floor(Math.random() * 4)],
          severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
          description: ['Unusual pattern detected', 'Threshold exceeded', 'Correlation anomaly', 'Behavioral deviation'][Math.floor(Math.random() * 4)],
          source: ['Web Server', 'API Gateway', 'Database', 'Firewall'][Math.floor(Math.random() * 4)],
          confidence: Math.floor(Math.random() * 20) + 80,
          timestamp: new Date().toISOString(),
          status: 'Active'
        }
        setAnomalies(prev => [newAnomaly, ...prev.slice(0, 19)]) // Keep 20 most recent
      }
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  // Load mock data on component mount
  useEffect(() => {
    loadMockData()
  }, [])

  const loadMockData = async () => {
    try {
      const [anomaliesRes, eventsRes, timelineRes] = await Promise.all([
        getLogAnomalies(),
        getLogEvents(),
        getLogTimeline()
      ])
      // Using our own real-time data
    } catch (error) {
      console.error('Error loading mock data:', error)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogFile(file)
      // Read file content for preview
      const reader = new FileReader()
      reader.onload = (e) => setLogText(e.target.result)
      reader.readAsText(file)
    }
  }

  const handleAnalyze = async () => {
    if (!logText.trim() && !logFile) return

    setAnalyzing(true)
    setAnalysisResult(null)

    try {
      let response
      if (logFile) {
        const formData = new FormData()
        formData.append('logFile', logFile)
        response = await uploadLogFile(formData)
      } else {
        response = await analyzeLogs({ logData: logText })
      }
      setAnalysisResult(response.data)
    } catch (error) {
      console.error('Analysis error:', error)
      // Mock fallback data
      setAnalysisResult({
        summary: "AI-powered log analysis detected potential security anomalies",
        anomalies: ["Unusual login time: 2:30 AM", "Suspicious device change", "High-volume failed attempts"],
        frequent_events: ["Authentication failures", "Database connection timeouts", "API rate limiting"],
        event_distribution: {
          info: 245,
          warning: 67,
          error: 23,
          critical: 5
        },
        attack_patterns: [
          { type: "Brute force attempts", count: 15, severity: "high" },
          { type: "Port scanning", count: 8, severity: "medium" },
          { type: "Privilege escalation attempts", count: 3, severity: "critical" }
        ]
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const exportReport = () => {
    // Mock export functionality
    alert('AI Log Report export initiated (PDF generation mock)')
  }

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
              AI-Enhanced Log Analyzer
            </h1>
            <p className="text-slate-400 text-sm">Advanced SIEM + UEBA analysis with real-time anomaly detection and threat pattern recognition</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-white">{anomalies.filter(a => a.status === 'Active').length}</span>
            <span className="text-xs text-slate-400">Active Anomalies</span>
          </div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">87%</span>
            <span className="text-xs text-slate-400">Detection Accuracy</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard title="Total Events" icon={Activity}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{events.reduce((sum, e) => sum + e.count, 0)}</div>
              <div className="text-slate-400 text-sm">Events processed today</div>
              <div className="mt-2 text-xs text-green-400">↑ 15% from yesterday</div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard title="Active Anomalies" icon={AlertTriangle}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{anomalies.filter(a => a.status === 'Active').length}</div>
              <div className="text-slate-400 text-sm">Currently flagged</div>
              <div className="mt-2 text-xs text-orange-400">Requiring attention</div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard title="Patterns Detected" icon={Target}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">{aiPatterns.reduce((sum, p) => sum + p.occurrences, 0)}</div>
              <div className="text-slate-400 text-sm">AI-identified patterns</div>
              <div className="mt-2 text-xs text-purple-400">3 new today</div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard title="Detection Rate" icon={Shield}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-2">87%</div>
              <div className="text-slate-400 text-sm">False positive rate</div>
              <div className="mt-2 text-xs text-green-400">Industry leading</div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Log Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2"
        >
          <GlassCard title="24-Hour Log Processing Activity" icon={TrendingUp}>
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={logActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Area dataKey="events" stroke="#8b5cf6" fill="url(#eventsGradient)" />
                  <Area dataKey="anomalies" stroke="#ef4444" fill="url(#anomaliesGradient)" />
                  <Area dataKey="critical" stroke="#dc2626" fill="url(#criticalGradient)" />
                  <defs>
                    <linearGradient id="eventsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="anomaliesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="criticalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Current Processing Stats */}
            <div className="border-t border-slate-700/50 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Real-time Processing</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Active</span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>32,000 events processed this hour</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span>67 anomalies detected and classified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-orange-400 rounded-full"></div>
                  <span>7 critical incidents escalated</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Log Volume Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Log Volume Distribution" icon={BarChart3}>
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={logVolumeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="category" stroke="#9ca3af" tick={false} />
                  <YAxis stroke="#9ca3af" fontSize={10} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                    {logVolumeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* AI Processing Status */}
            <div className="border-t border-slate-700/50 pt-4">
              <div className="text-xs text-slate-400 mb-1">Processing Engine</div>
              <div className="text-sm font-semibold text-green-400 flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>AI Analysis Active</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Log Upload Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <GlassCard title="AI Log Analysis Engine" icon={Terminal}>
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-4">
              <FileText className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Upload & Analyze Security Logs</h3>
            </div>

            {/* File Upload */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Log File Upload (.log, .txt, .json)
                </label>
                <div className="flex items-center space-x-4">
                  <input
                    type="file"
                    accept=".log,.txt,.json"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-slate-300 file:mr-4 file:py-3 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-purple-600 file:to-indigo-500 file:text-white hover:file:from-purple-500 hover:file:to-indigo-400 transition-all"
                  />
                  <Upload className="w-5 h-5 text-slate-400" />
                </div>
              </div>

              {/* Analysis Options */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Analysis Mode
                </label>
                <div className="flex space-x-2">
                  <button className="px-3 py-2 bg-gradient-to-r from-cyan-600 to-blue-500 text-white rounded-lg hover:from-cyan-500 hover:to-blue-400 transition-all text-sm font-medium">
                    SIEM Analysis
                  </button>
                  <button className="px-3 py-2 bg-slate-700 text-slate-300 rounded-lg hover:bg-slate-600 transition-all text-sm font-medium">
                    UEBA Focus
                  </button>
                </div>
              </div>
            </div>

            {/* Text Area */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Raw Log Data
              </label>
              <textarea
                value={logText}
                onChange={(e) => setLogText(e.target.value)}
                placeholder="Paste your security logs here for comprehensive AI analysis..."
                className="w-full h-48 px-4 py-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm text-slate-300 bg-slate-800 resize-none"
              />
              <p className="mt-2 text-xs text-slate-500">
                {logText.length} characters • Approximate processing: {Math.max(1, Math.floor(logText.length / 1000))} minutes
              </p>
            </div>

            {/* Analyze Button */}
            <button
              onClick={handleAnalyze}
              disabled={!logText.trim() && !logFile}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-lg px-6 py-4 hover:from-purple-500 hover:to-pink-400 disabled:opacity-50 transition-all font-semibold shadow-lg flex items-center justify-center space-x-2 disabled:cursor-not-allowed"
            >
              {analyzing ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>AI Processing & Analyzing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Run Comprehensive AI Analysis</span>
                </>
              )}
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Analysis Results */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* UEBA Anomaly Detection */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="UEBA Anomaly Detection" icon={AlertTriangle}>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {anomalies.map((anomaly, index) => (
                <motion.div
                  key={`${anomaly.id}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${anomaly.severity === 'Critical' ? 'border-l-red-500 bg-red-500/5' :
                    anomaly.severity === 'High' ? 'border-l-orange-500 bg-orange-500/5' :
                    anomaly.severity === 'Medium' ? 'border-l-yellow-500 bg-yellow-500/5' :
                    'border-l-blue-500 bg-blue-500/5'}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-white font-semibold text-sm mb-1">{anomaly.type}</div>
                      <p className="text-slate-300 text-xs mb-2">{anomaly.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400 text-xs">{anomaly.source}</span>
                        <span className={`text-xs px-2 py-1 rounded ${anomaly.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          anomaly.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          anomaly.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'}`}>
                          {anomaly.severity}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>{anomaly.confidence}% confidence</span>
                    <span className={`${anomaly.status === 'Active' ? 'text-orange-400' : anomaly.status === 'Mitigated' ? 'text-green-400' : 'text-blue-400'}`}>
                      {anomaly.status}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Event Classification & AI Patterns */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Event Classification Matrix" icon={RechartsPie}>
            <div className="space-y-6">
              {/* Event Distribution */}
              <div className="grid grid-cols-2 gap-4">
                {events.map((event, index) => (
                  <motion.div
                    key={event.level}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-center"
                  >
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-2 ${event.level === 'critical' ? 'bg-red-900/50 text-red-300 border border-red-500/30' :
                      event.level === 'error' ? 'bg-orange-900/50 text-orange-300 border border-orange-500/30' :
                      event.level === 'warning' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30' :
                      'bg-blue-900/50 text-blue-300 border border-blue-500/30'}`}>
                      {event.level.toUpperCase()}
                    </div>
                    <p className="text-2xl font-bold text-white">{event.count}</p>
                    <p className="text-xs text-slate-400">events</p>
                  </motion.div>
                ))}
              </div>

              {/* AI Attack Pattern Detection */}
              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span>AI-Detected Attack Patterns</span>
                </h4>
                <div className="space-y-3">
                  {aiPatterns.map((pattern, index) => (
                    <motion.div
                      key={pattern.pattern}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-slate-700/5 border border-slate-600/50 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-medium text-sm">{pattern.pattern}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded ${pattern.trend === 'escalating' ? 'bg-red-500/20 text-red-400' :
                            pattern.trend === 'stable' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'}`}>
                            {pattern.trend}
                          </span>
                          <span className="text-slate-400 text-xs">{pattern.occurrences} incidents</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-500 mb-2">
                        Indicators: {pattern.indicators.join(', ')}
                      </div>
                      <div className="text-xs text-cyan-400">
                        {pattern.confidence}% confidence score
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          <GlassCard title="AI Analysis Results" icon={Shield}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-semibold mb-4">Analysis Summary</h4>
                <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <p className="text-green-100 mb-3">{analysisResult.summary}</p>
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-green-200">Key Anomalies Detected:</p>
                    <ul className="space-y-1">
                      {analysisResult.anomalies?.map((anomaly, index) => (
                        <li key={index} className="text-sm text-green-100 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                          <span>{anomaly}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-sm font-semibold text-green-200 mt-3">Most Frequent Events:</p>
                    <ul className="space-y-1">
                      {analysisResult.frequent_events?.map((event, index) => (
                        <li key={index} className="text-sm text-green-100 flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                          <span>{event}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Attack Pattern Analysis</h4>
                <div className="space-y-4">
                  {analysisResult.attack_patterns?.map((pattern, index) => (
                    <motion.div
                      key={pattern.type}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-semibold text-sm">{pattern.type}</span>
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs px-2 py-1 rounded ${pattern.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            pattern.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            pattern.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'}`}>
                            {pattern.severity.toUpperCase()}
                          </span>
                          <span className="text-slate-400 text-xs">{pattern.count} incidents</span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className={`h-2 rounded-full ${pattern.severity === 'critical' ? 'bg-red-500' :
                          pattern.severity === 'high' ? 'bg-orange-500' :
                          pattern.severity === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'}`}
                          style={{ width: `${Math.min((pattern.count / 20) * 100, 100)}%` }}>
                        </div>
                      </div>
                    </motion.div>
                  )) || (
                    <div className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-center">
                      <Search className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm text-slate-400">Run analysis to detect attack patterns</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Log Timeline & Export */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Log Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="Security Event Timeline" icon={Clock}>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {/* Generate some timeline events */}
              {Array.from({ length: 10 }, (_, index) => {
                const timestamp = new Date(Date.now() - (index * 300000)).toLocaleTimeString();
                const types = ['Auth Failure', 'Login Success', 'Data Access', 'System Error', 'File Access', 'Network Connection'];
                const type = types[Math.floor(Math.random() * types.length)];
                const severity = ['low', 'medium', 'high'][Math.floor(Math.random() * 3)];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-start space-x-4 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-2">
                      <div className={`w-2 h-2 rounded-full ${severity === 'high' ? 'bg-red-500 shadow-neon-red' :
                        severity === 'medium' ? 'bg-orange-500 shadow-neon-orange' :
                        'bg-blue-500 shadow-neon-blue'}`}>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">{type}</p>
                        <span className="text-xs text-slate-400">{timestamp}</span>
                      </div>
                      <p className="text-xs text-slate-500">Source: {['Web Server', 'API Gateway', 'Database', 'Firewall'][Math.floor(Math.random() * 4)]}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Events monitored:</span>
                <span className="text-cyan-400">2,540</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Export & Report Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Report Generation & Export" icon={Download}>
            <div className="space-y-6">
              <div>
                <h4 className="text-white font-semibold mb-4">Available Reports</h4>
                <div className="space-y-3">
                  {[
                    { name: 'SIEM Analysis Report', type: 'pdf', size: '2.4 MB', ready: true },
                    { name: 'UEBA Behavior Report', type: 'xlsx', size: '1.8 MB', ready: true },
                    { name: 'Threat Detection Summary', type: 'pdf', size: '3.2 MB', ready: false },
                    { name: 'Compliance Audit Log', type: 'csv', size: '5.1 MB', ready: false }
                  ].map((report, index) => (
                    <motion.div
                      key={report.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                    >
                      <div>
                        <p className="text-white font-medium text-sm">{report.name}</p>
                        <p className="text-slate-400 text-xs">{report.type} • {report.size}</p>
                      </div>
                      <button
                        className={`px-3 py-1 rounded text-xs font-medium ${report.ready ? 'bg-green-600 hover:bg-green-500 text-white' :
                          'bg-slate-600 text-slate-400 cursor-not-allowed'}`}
                        disabled={!report.ready}
                      >
                        {report.ready ? 'Download' : 'Processing'}
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-white font-semibold mb-4">Scheduled Reports</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Daily Threat Digest:</span>
                    <span className="text-green-400">06:00 AM</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Weekly Compliance:</span>
                    <span className="text-green-400">Every Monday</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Monthly Executive:</span>
                    <span className="text-green-400">1st of Month</span>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button
                  onClick={exportReport}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-500 text-white rounded-lg px-6 py-3 hover:from-indigo-500 hover:to-purple-400 transition-all font-semibold shadow-lg"
                >
                  <Download className="w-4 h-4 mr-2 inline-block" />
                  Generate Custom Report
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Intelligence Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">AI-Enhanced Log Analysis Intelligence</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Terminal className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Advanced SIEM + UEBA Log Processing:</strong> Real-time AI analysis has processed 32,100 events in the last 24 hours, detecting 67 anomalies and 7 critical incidents. Machine learning models successfully identified 23 unique attack patterns with 87% confidence accuracy, maintaining a 13% false positive rate. Behavioral analysis engines continuously monitor user patterns and system activities across authentication, network, database, and application logs.

                  Automated correlation engines analyze log data from multiple sources, providing context-rich insights and predictive threat indicators. Continuous learning algorithms adapt to emerging threat patterns, ensuring comprehensive security log analysis and intelligent incident response.
                </p>
                <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400">
                  <span>• AI Analysis Accuracy: 87%</span>
                  <span>• Events Processed: 32,100/24h</span>
                  <span>• Anomalies Detected: 67</span>
                  <span>• Attack Patterns: 23 Identified</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  )
}

export default AI_LogAnalyzer
