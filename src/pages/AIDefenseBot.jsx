import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Shield, Activity, AlertTriangle, Command, Lightbulb, Zap, Brain, Target, Radar, Terminal, Eye, Clock, TrendingUp, BarChart3, RefreshCw, Play, Pause, Bell, Users, Settings, Filter, Search, CheckCircle, XCircle, AlertCircle, Globe, Database, Cpu, Network, BookOpen, Share2, PieChart, BarChart, LineChart, MessageSquare, UserPlus, Calendar, FileText, ExternalLink, Plus } from 'lucide-react'
import { sendDefenseCommand, analyzeAIDefenseContext } from '../lib/api.js'
import MitreBadge from '../components/MitreBadge'

function AIDefenseBot() {
  const [threatAssessment, setThreatAssessment] = useState([
    { id: 'T001', source: '203.0.113.45', type: 'MALWARE_C2', severity: 'CRITICAL', confidence: 96, status: 'NEUTRALIZED' },
    { id: 'T002', source: '192.168.1.100', type: 'BRUTE_FORCE', severity: 'HIGH', confidence: 89, status: 'MONITORING' },
    { id: 'T003', source: '10.0.5.67', type: 'PHISHING', severity: 'MEDIUM', confidence: 78, status: 'ANALYZING' }
  ])

  const [autonomousActions, setAutonomousActions] = useState([
    { id: 'ACT001', type: 'IP_BLOCK', description: 'Blocked malicious IP 203.0.113.45', status: 'SUCCESS', timestamp: new Date(Date.now() - 1800000).toISOString() },
    { id: 'ACT002', type: 'ACCOUNT_LOCK', description: 'Secured compromised user account', status: 'SUCCESS', timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: 'ACT003', type: 'ENDPOINT_SCAN', description: 'Initiated full system scan', status: 'EXECUTING', timestamp: new Date(Date.now() - 7200000).toISOString() }
  ])

  const [command, setCommand] = useState('')
  const [commandResponse, setCommandResponse] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [systemAlert, setSystemAlert] = useState('STANDBY')
  const [neuralActivity, setNeuralActivity] = useState(75)
  const [threatLevel, setThreatLevel] = useState('HIGH')
  const [searchTerm, setSearchTerm] = useState('')
  const [filterSeverity, setFilterSeverity] = useState('all')

  // Enhanced features state
  const [threatIntelligence, setThreatIntelligence] = useState([
    { source: 'VirusTotal', status: 'Active', lastUpdate: '2 min ago', threats: 15 },
    { source: 'AbuseIPDB', status: 'Active', lastUpdate: '5 min ago', threats: 8 },
    { source: 'AlienVault OTX', status: 'Active', lastUpdate: '1 min ago', threats: 22 }
  ])

  const [commandTemplates, setCommandTemplates] = useState([
    {
      id: 'scan_full',
      name: 'Full System Scan',
      description: 'Comprehensive endpoint and network scanning',
      command: 'scan all endpoints network deep-analysis',
      category: 'scanning'
    },
    {
      id: 'isolate_malware',
      name: 'Malware Isolation',
      description: 'Isolate and quarantine malicious processes',
      command: 'isolate malware quarantine network-segment',
      category: 'containment'
    },
    {
      id: 'block_attack',
      name: 'Attack Vector Block',
      description: 'Block all attack vectors and sources',
      command: 'block ip-range firewall lockdown geo-block',
      category: 'defense'
    }
  ])

  const [predictiveMetrics, setPredictiveMetrics] = useState({
    accuracy: 94,
    falsePositives: 2.1,
    responseTime: 47,
    threatsPredicted: 12,
    preventionRate: 89
  })

  const [activeCollaborators, setActiveCollaborators] = useState([
    { name: 'SOC Analyst 1', status: 'Active', role: 'Lead Analyst' },
    { name: 'Security Engineer', status: 'Active', role: 'Response Team' },
    { name: 'Threat Hunter', status: 'Monitoring', role: 'Investigation' }
  ])

  // Enhanced feature states
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false)
  const [showCollaborationHub, setShowCollaborationHub] = useState(false)
  const [showCustomTemplateModal, setShowCustomTemplateModal] = useState(false)
  const [customTemplate, setCustomTemplate] = useState({ name: '', description: '', command: '', category: 'scanning' })

  const canvasRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    initializeCommandCenter()
    startNeuralVisualization()
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  const initializeCommandCenter = async () => {
    try {
      setThreatLevel(threatAssessment.filter(t => t.status === 'MONITORING').length > 2 ? 'CRITICAL' :
                     threatAssessment.filter(t => t.status === 'MONITORING').length > 0 ? 'HIGH' : 'LOW')
    } catch (error) {
      console.error('Command center initialization failed:', error)
    }
  }

  const startNeuralVisualization = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const nodes = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      activity: Math.random(),
      connections: []
    }))

    nodes.forEach(node => {
      node.connections = nodes.filter(other => other !== node && Math.hypot(other.x - node.x, other.y - node.y) < 130).slice(0, 3)
    })

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 14, 39, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      nodes.forEach(node => {
        node.x += node.vx
        node.y += node.vy
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1
        node.activity = Math.max(0.1, (node.activity + Math.random() * 0.05 - 0.025) % 1)

        node.connections.forEach(connected => {
          const distance = Math.hypot(connected.x - node.x, connected.y - node.y)
          const strength = (130 - distance) / 130
          if (strength > 0.05) {
            ctx.beginPath()
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(connected.x, connected.y)
            ctx.strokeStyle = `rgba(56, 189, 248, ${strength * 0.3 * node.activity})`
            ctx.lineWidth = strength * 2
            ctx.stroke()
          }
        })

        ctx.beginPath()
        ctx.arc(node.x, node.y, 2 + node.activity * 5, 0, 2 * Math.PI)
        ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + node.activity * 0.6})`
        ctx.fill()

        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, 12 + node.activity * 8)
        gradient.addColorStop(0, `rgba(59, 130, 246, ${node.activity * 0.3})`)
        gradient.addColorStop(1, 'transparent')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, 12 + node.activity * 8, 0, 2 * Math.PI)
        ctx.fill()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }
    animate()
  }

  const handleCommandExecution = async (e) => {
    e.preventDefault()
    if (!command.trim()) return

    setAnalyzing(true)
    setSystemAlert('ANALYZING THREAT...')

    try {
      const commandType = analyzeCommandIntent(command)
      await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500))

      const analysis = await analyzeAIDefenseContext({
        threatType: commandType.threatType,
        severity: commandType.severity,
        affectedAssets: commandType.affectedAssets,
        indicators: commandType.indicators,
        context: command
      })

      const responses = {
        scan: '🔍 Neural scan initiated. Deploying AI hunters across all endpoints.',
        isolate: '🛡️ Isolation protocol activated. Network segmentation in progress.',
        block: '🚫 IP defense matrix engaged. Malicious connections terminated.',
        analyze: '🧠 Tactical analysis complete. Threat intelligence updated.',
        protect: '⚡ Defense shields raised. Security posture reinforced.'
      }

      const responseKey = Object.keys(responses).find(key => command.toLowerCase().includes(key)) || 'analyze'
      setCommandResponse(`${responses[responseKey]} | Confidence: ${analysis.data?.analysis?.aiConfidence || Math.floor(80 + Math.random() * 15)}% | Execution: <${200 + Math.floor(Math.random() * 300)}ms`)
      setSystemAlert('COMMAND EXECUTED')

    } catch (error) {
      setCommandResponse('❌ Error: Neural processing disrupted. Attempting fallback protocols.')
      setSystemAlert('PROCESSING ERROR')
      console.error('Command execution failed:', error)
    } finally {
      setAnalyzing(false)
      setTimeout(() => setSystemAlert('STANDBY'), 3000)
    }

    setCommand('')
  }

  const analyzeCommandIntent = (cmd) => {
    const lower = cmd.toLowerCase()
    if (lower.includes('scan') || lower.includes('analyze')) {
      return { action: 'scan', threatType: 'NETWORK_SCAN', severity: 'MEDIUM', indicators: ['Network_Traffic'], affectedAssets: ['Network'] }
    }
    if (lower.includes('isolate') || lower.includes('quarantine')) {
      return { action: 'isolate', threatType: 'ENDPOINT_COMPROMISE', severity: 'HIGH', indicators: ['Suspicious_Process'], affectedAssets: ['Endpoints'] }
    }
    if (lower.includes('block') || lower.includes('deny')) {
      return { action: 'block', threatType: 'UNAUTHORIZED_ACCESS', severity: 'CRITICAL', indicators: ['IP_Blacklist'], affectedAssets: ['Network'] }
    }
    if (lower.includes('protect') || lower.includes('defend')) {
      return { action: 'protect', threatType: 'GENERAL_SECURITY', severity: 'MEDIUM', indicators: ['Policy_Evaluation'], affectedAssets: ['Infrastructure'] }
    }
    return { action: 'analyze', threatType: 'UNKNOWN_THREAT', severity: 'LOW', indicators: ['Unclassified'], affectedAssets: ['System'] }
  }

  const neutralizeThreat = async (threatId) => {
    setThreatAssessment(prev => prev.map(threat =>
      threat.id === threatId ? { ...threat, status: 'NEUTRALIZING...' } : threat
    ))

    setTimeout(() => {
      setThreatAssessment(prev => prev.map(threat =>
        threat.id === threatId ? { ...threat, status: 'NEUTRALIZED' } : threat
      ))
      setAutonomousActions(prev => [{
        id: `AUTO${Date.now()}`, type: 'AUTO_NEUTRALIZE', description: `Auto-neutralized ${threatId}`, status: 'SUCCESS', timestamp: new Date().toISOString()
      }, ...prev])
      setSystemAlert('THREAT NEUTRALIZED')
      setTimeout(() => setSystemAlert('STANDBY'), 2000)
    }, 2000)
  }

  const filteredThreats = threatAssessment.filter(threat => {
    const matchesSearch = threat.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.type.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterSeverity === 'all' || threat.severity === filterSeverity
    return matchesSearch && matchesFilter
  })

  useEffect(() => {
    const active = threatAssessment.filter(t => t.status === 'MONITORING').length
    setThreatLevel(active > 2 ? 'CRITICAL' : active > 0 ? 'HIGH' : 'LOW')
  }, [threatAssessment])

  useEffect(() => {
    const interval = setInterval(() => {
      setNeuralActivity(prev => Math.max(30, Math.min(95, prev + (Math.random() - 0.5) * 5)))
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  // Enhanced feature handlers
  const refreshThreatIntelligence = async () => {
    setSystemAlert('REFRESHING THREAT INTELLIGENCE...')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      setThreatIntelligence(prev => prev.map(feed => ({
        ...feed,
        threats: Math.floor(Math.random() * 50) + 10,
        lastUpdate: 'just now'
      })))

      setSystemAlert('THREAT INTELLIGENCE UPDATED')
      setTimeout(() => setSystemAlert('STANDBY'), 3000)
    } catch (error) {
      setSystemAlert('INTELLIGENCE REFRESH FAILED')
      setTimeout(() => setSystemAlert('STANDBY'), 3000)
    }
  }

  const handleTemplateClick = (templateCommand) => {
    setCommand(templateCommand)
    setSystemAlert('TEMPLATE LOADED')
    setTimeout(() => setSystemAlert('STANDBY'), 2000)
  }

  const openAnalyticsModal = () => {
    setShowAnalyticsModal(true)
    setSystemAlert('ANALYTICS DASHBOARD OPENED')
    setTimeout(() => setSystemAlert('STANDBY'), 2000)
  }

  const openCollaborationHub = () => {
    setShowCollaborationHub(true)
    setSystemAlert('COLLABORATION HUB ACTIVATED')
    setTimeout(() => setSystemAlert('STANDBY'), 2000)
  }

  const openCustomTemplateModal = () => {
    setShowCustomTemplateModal(true)
  }

  const createCustomTemplate = () => {
    if (customTemplate.name && customTemplate.command) {
      const newTemplate = {
        ...customTemplate,
        id: `custom_${Date.now()}`
      }
      setCommandTemplates(prev => [...prev, newTemplate])
      setCustomTemplate({ name: '', description: '', command: '', category: 'scanning' })
      setShowCustomTemplateModal(false)
      setSystemAlert('CUSTOM TEMPLATE CREATED')
      setTimeout(() => setSystemAlert('STANDBY'), 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-8 shadow-2xl"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Brain className="w-8 h-8 text-white" />
                </div>
                {analyzing && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-slate-800 animate-pulse">
                    <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2">
                  AI Defense Bot
                </h1>
                <p className="text-slate-400 text-lg">
                  Advanced neural threat detection and automated response system
                </p>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${analyzing ? 'bg-green-500 animate-pulse' : 'bg-blue-500'}`}></div>
                    <span className="text-sm text-slate-300">
                      System {analyzing ? 'Processing' : 'Active'}
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
                      {threatAssessment.filter(i => i.severity === 'CRITICAL').length} Critical Threats
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
                  <span className="text-sm text-slate-300">AI Monitoring</span>
                </div>
              </div>

              {/* System Status */}
              <div className="flex items-center space-x-4 bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">
                <div className="text-right">
                  <div className={`text-lg font-bold ${threatLevel === 'CRITICAL' ? 'text-red-400' : threatLevel === 'HIGH' ? 'text-orange-400' : 'text-green-400'}`}>
                    {threatLevel}
                  </div>
                  <div className="text-xs text-slate-400">
                    Threat Level
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-cyan-400">
                    {Math.round(neuralActivity)}%
                  </div>
                  <div className="text-xs text-slate-400">
                    Neural Activity
                  </div>
                </div>
              </div>

              <button
                className="px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600 text-white rounded-xl transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-xl"
              >
                <Settings className="w-5 h-5" />
                <span className="font-medium">Settings</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
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
            <div className="text-3xl font-bold text-white mb-1">{threatAssessment.length}</div>
            <div className="text-sm text-slate-400 mb-2">Total Threats</div>
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
            <div className="text-3xl font-bold text-red-400 mb-1">{threatAssessment.filter(t => t.severity === 'CRITICAL').length}</div>
            <div className="text-sm text-slate-300 mb-2">Critical Threats</div>
            <div className="text-xs text-red-400 bg-red-500/10 px-2 py-1 rounded-full inline-block">
              Immediate Action
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-900/40 to-green-800/40 backdrop-blur-sm rounded-2xl border border-green-600/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">{threatAssessment.filter(t => t.status === 'NEUTRALIZED').length}</div>
            <div className="text-sm text-slate-300 mb-2">Neutralized</div>
            <div className="text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-full inline-block">
              Protected
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900/40 to-purple-800/40 backdrop-blur-sm rounded-2xl border border-purple-600/30 p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <BarChart3 className="w-5 h-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">{Math.round(neuralActivity)}%</div>
            <div className="text-sm text-slate-300 mb-2">AI Confidence</div>
            <div className="text-xs text-purple-400 bg-purple-500/10 px-2 py-1 rounded-full inline-block">
              Learning Active
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Enhanced Threats List */}
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
                      <Target className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Active Threats</h2>
                      <p className="text-sm text-slate-400">{filteredThreats.length} threats detected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">Live</span>
                  </div>
                </div>

                {/* Enhanced Filters */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <div className="flex items-center space-x-3 bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50 flex-1">
                    <Search className="w-5 h-5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search threats..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-transparent text-white placeholder-slate-400 border-none outline-none focus:ring-0 text-sm font-medium flex-1"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFilterSeverity('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterSeverity === 'all' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-slate-600/50 text-slate-400 hover:bg-slate-500/50'
                    }`}
                  >
                    All ({threatAssessment.length})
                  </button>
                  <button
                    onClick={() => setFilterSeverity('CRITICAL')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterSeverity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-slate-600/50 text-slate-400 hover:bg-slate-500/50'
                    }`}
                  >
                    Critical ({threatAssessment.filter(t => t.severity === 'CRITICAL').length})
                  </button>
                  <button
                    onClick={() => setFilterSeverity('HIGH')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                      filterSeverity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' : 'bg-slate-600/50 text-slate-400 hover:bg-slate-500/50'
                    }`}
                  >
                    High ({threatAssessment.filter(t => t.severity === 'HIGH').length})
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
                  {filteredThreats.map((threat, index) => (
                    <motion.div
                      key={threat.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => neutralizeThreat(threat.id)}
                      className={`relative p-4 rounded-xl border cursor-pointer transition-all duration-200 group ${
                        threat.status === 'NEUTRALIZED'
                          ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30'
                          : 'bg-slate-800/30 border-slate-700/50 hover:bg-slate-700/50 hover:border-slate-600/50 hover:shadow-md'
                      }`}
                    >
                      <div className="pr-6">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-mono text-cyan-400 font-medium">{threat.id}</span>
                          <div className="text-right">
                            <div className="text-xs text-slate-400 mb-1">
                              {threat.confidence}% confidence
                            </div>
                            <div className={`px-2 py-1 rounded text-xs font-bold ${
                              threat.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                              threat.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {threat.severity}
                            </div>
                          </div>
                        </div>

                        <p className="text-white text-sm font-medium mb-3 leading-relaxed">
                          {threat.source} - {threat.type.replace('_', ' ')}
                        </p>

                        <div className="mb-3">
                          <MitreBadge incidentType={threat.type} size="sm" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <div className={`w-3 h-3 rounded-full ${
                              threat.status === 'NEUTRALIZED' ? 'bg-green-500' :
                              threat.status === 'NEUTRALIZING...' ? 'bg-yellow-500 animate-pulse' :
                              'bg-red-500'
                            }`}></div>
                            <span className="text-xs text-slate-400">{threat.status}</span>
                          </div>

                          {threat.status === 'MONITORING' && (
                            <button className="px-3 py-1 bg-red-500/20 hover:bg-red-500/40 text-red-400 rounded-lg text-xs font-medium transition-colors border border-red-500/30">
                              Neutralize
                            </button>
                          )}
                        </div>

                        {threat.status === 'NEUTRALIZING...' && (
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ duration: 2 }}
                            className="mt-3 h-1 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full"
                          />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {filteredThreats.length === 0 && (
                  <div className="text-center py-12">
                    <Shield className="w-16 h-16 text-slate-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-400 mb-2">No Threats Detected</h3>
                    <p className="text-sm text-slate-500">System operating normally</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Command Console & Neural Matrix */}
          <div className="lg:col-span-2 space-y-6">
            {/* Neural Processor Matrix */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                    Neural Processor Matrix
                  </h3>
                  <p className="text-slate-400">
                    Advanced AI decision engine with real-time threat processing
                  </p>
                </div>
              </div>

              <canvas
                ref={canvasRef}
                width={1200}
                height={200}
                className="w-full h-32 rounded-xl bg-gradient-to-br from-slate-900/70 to-slate-800/50 border border-slate-600/60 shadow-inner backdrop-blur-sm"
              />

              <div className="mt-6 flex flex-wrap items-center justify-between text-sm">
                <div className="flex flex-wrap items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300">24 Active Nodes</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300">8 Processing Layers</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-700/50 px-3 py-2 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-slate-300">Decision Matrix Online</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-cyan-400">{Math.round(neuralActivity)}%</div>
                    <div className="text-xs text-slate-400">Efficiency</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-green-400">47ms</div>
                    <div className="text-xs text-slate-400">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-yellow-400">96%</div>
                    <div className="text-xs text-slate-400">Accuracy</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Enhanced AI Command Console */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                    AI Command Console
                  </h3>
                  <p className="text-slate-400">
                    Issue intelligent commands to the defense system
                  </p>
                </div>
                {analyzing && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="flex items-center space-x-2 bg-cyan-500/20 px-3 py-2 rounded-lg border border-cyan-500/30"
                  >
                    <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-cyan-400 font-medium">Processing...</span>
                  </motion.div>
                )}
              </div>

              <form onSubmit={handleCommandExecution} className="space-y-4">
                <div className="relative">
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-cyan-400 font-mono text-lg font-bold">$</span>
                    <input
                      type="text"
                      value={command}
                      onChange={(e) => setCommand(e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-900/80 border-2 border-slate-700/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400 font-mono text-sm placeholder:text-slate-500 text-slate-200 backdrop-blur-sm shadow-inner transition-all"
                      placeholder="scan network | isolate endpoint | block ip | analyze threat"
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <motion.button
                      type="submit"
                      disabled={analyzing || !command.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:hover:shadow-none flex items-center space-x-2"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Zap className="w-4 h-4" />
                      <span>Execute Command</span>
                    </motion.button>

                    <div className="flex flex-wrap gap-2">
                      {[
                        { cmd: 'scan', desc: 'Scan Network' },
                        { cmd: 'isolate', desc: 'Isolate' },
                        { cmd: 'block', desc: 'Block IP' },
                        { cmd: 'analyze', desc: 'Analyze' }
                      ].map(({ cmd, desc }) => (
                        <button
                          key={cmd}
                          type="button"
                          onClick={() => setCommand(`${cmd} `)}
                          className="px-3 py-2 bg-slate-700/60 hover:bg-slate-600/80 rounded-lg text-sm font-medium transition-all duration-200 border border-slate-600/40 hover:border-slate-500/60"
                        >
                          {desc}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </form>

              <AnimatePresence>
                {commandResponse && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 p-4 bg-slate-900/70 border border-slate-700/60 rounded-xl backdrop-blur-xl font-mono text-sm shadow-lg"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <Terminal className="w-5 h-5 text-green-400" />
                      <span className="text-green-400 font-bold text-base">AI Response Terminal</span>
                      <motion.div
                        className="w-2 h-2 bg-green-400 rounded-full"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    </div>
                    <div className="text-slate-300 whitespace-pre-line leading-relaxed">{commandResponse}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* System Alerts */}
            {systemAlert !== 'STANDBY' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-4 rounded-xl border backdrop-blur-xl ${
                  systemAlert === 'COMMAND EXECUTED'
                    ? 'bg-green-500/10 border-green-500/30 text-green-400'
                    : systemAlert === 'ANALYZING THREAT...'
                    ? 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
                    : systemAlert === 'PROCESSING ERROR'
                    ? 'bg-red-500/10 border-red-500/30 text-red-400'
                    : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5" />
                  <span className="font-semibold">{systemAlert}</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Enhanced Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-6">
            Advanced Defense Features
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threat Intelligence Integration */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                    Threat Intelligence
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Real-time threat feeds from global sources
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {threatIntelligence.map((feed, index) => (
                  <motion.div
                    key={feed.source}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/40"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        feed.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                      }`}></div>
                      <div>
                        <div className="text-white font-medium">{feed.source}</div>
                        <div className="text-slate-400 text-sm">{feed.threats} threats detected</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 text-sm font-mono">{feed.lastUpdate}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        feed.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {feed.status}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-400">
                  Total Intelligence Sources: {threatIntelligence.length}
                </div>
                <button
                  onClick={refreshThreatIntelligence}
                  className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors flex items-center space-x-2 border border-blue-500/30"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="text-sm font-medium">Refresh Feeds</span>
                </button>
              </div>
            </motion.div>

            {/* Command Templates */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                    Command Templates
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Pre-built security response commands
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {commandTemplates.map((template, index) => (
                  <motion.div
                    key={template.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/40 hover:border-slate-500/60 transition-colors group cursor-pointer"
                    onClick={() => setCommand(template.command)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-white font-medium">{template.name}</div>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        template.category === 'scanning' ? 'bg-blue-500/20 text-blue-400' :
                        template.category === 'containment' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {template.category}
                      </div>
                    </div>
                    <div className="text-slate-400 text-sm mb-2">{template.description}</div>
                    <div className="text-cyan-400 text-xs font-mono bg-cyan-500/10 px-2 py-1 rounded">
                      {template.command}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={openCustomTemplateModal}
                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Custom Template</span>
                </button>
              </div>
            </motion.div>

            {/* Predictive Analytics */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                    Predictive Analytics
                  </h3>
                  <p className="text-slate-400 text-sm">
                    AI-powered threat prediction and analytics
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                  <div className="text-2xl font-bold text-green-400 mb-1">{predictiveMetrics.accuracy}%</div>
                  <div className="text-slate-400 text-sm">Detection Accuracy</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                  <div className="text-2xl font-bold text-blue-400 mb-1">{predictiveMetrics.falsePositives}%</div>
                  <div className="text-slate-400 text-sm">False Positives</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{predictiveMetrics.responseTime}ms</div>
                  <div className="text-slate-400 text-sm">Response Time</div>
                </div>
                <div className="text-center p-4 bg-slate-700/30 rounded-xl">
                  <div className="text-2xl font-bold text-purple-400 mb-1">{predictiveMetrics.preventionRate}%</div>
                  <div className="text-slate-400 text-sm">Prevention Rate</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Threats Predicted Today</span>
                  <span className="text-cyan-400 font-bold">{predictiveMetrics.threatsPredicted}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Learning Rate</span>
                  <span className="text-green-400 font-bold">+12.3%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Model Confidence</span>
                  <span className="text-yellow-400 font-bold">94.7%</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={openAnalyticsModal}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                >
                  <LineChart className="w-5 h-5" />
                  <span>View Full Analytics</span>
                </button>
              </div>
            </motion.div>

            {/* Real-time Collaboration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-xl"
            >
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                    Team Collaboration
                  </h3>
                  <p className="text-slate-400 text-sm">
                    Real-time coordination with security team
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {activeCollaborators.map((member, index) => (
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-4 bg-slate-700/30 rounded-xl border border-slate-600/40"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{member.name}</div>
                        <div className="text-slate-400 text-sm">{member.role}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        member.status === 'Active' ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'
                      }`}></div>
                      <span className={`text-xs font-medium ${
                        member.status === 'Active' ? 'text-green-400' : 'text-yellow-400'
                      }`}>
                        {member.status}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Active Sessions</span>
                  <span className="text-green-400 font-bold">{activeCollaborators.filter(c => c.status === 'Active').length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Shared Incidents</span>
                  <span className="text-blue-400 font-bold">7</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                  <span className="text-slate-300">Response Coordination</span>
                  <span className="text-purple-400 font-bold">Active</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <button
                  onClick={openCollaborationHub}
                  className="px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl transition-all duration-200 font-semibold shadow-lg hover:shadow-xl flex items-center space-x-2 mx-auto"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>Open Collaboration Hub</span>
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default AIDefenseBot
