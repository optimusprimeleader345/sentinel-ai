import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Zap,
  AlertTriangle,
  Activity,
  Database,
  Brain,
  MessageSquare,
  BarChart3,
  Target,
  PlayCircle,
  Pause,
  Square,
  RotateCcw,
  Download,
  Settings,
  Cpu,
  HardDrive,
  Wifi,
  TrendingUp,
  Eye,
  Network,
  Globe,
  Layers,
  Hexagon,
  Radar,
  Timer,
  Gauge,
  Monitor,
  Server,
  Users,
  Lock,
  Unlock,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  ArrowRight,
  ArrowDown,
  ChevronRight,
  FastForward,
  Rewind,
  SkipForward,
  SkipBack,
  Play,
  Volume2,
  VolumeX,
  Mail,
  Upload,
  FileText as File,
  AlertCircle
} from 'lucide-react'

// Import simulation components
import ScenarioSelector from '../components/simulation/ScenarioSelector.jsx'
import SimulationTimeline from '../components/simulation/SimulationTimeline.jsx'
import SimulationControls from '../components/simulation/SimulationControls.jsx'

// Import services
import simulationEngine from '../services/simulationEngine.js'
import siemEngine from '../services/siemEngine.js'
import responseEngine from '../services/responseEngine.js'
import { generateSOCResponse } from '../utils/socAssistant.js'

function AdvancedAttackSimulation() {
  const [selectedScenario, setSelectedScenario] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [simulationSpeed, setSimulationSpeed] = useState(1)
  const [simulationState, setSimulationState] = useState({
    eventsGenerated: 0,
    alertsTriggered: 0,
    incidentsCreated: 0,
    responsesExecuted: 0,
    timeline: [],
    activeResponses: []
  })
  const [timeline, setTimeline] = useState([])
  const [systemMetrics, setSystemMetrics] = useState({
    cpu: 0,
    memory: 0,
    network: 0,
    alerts: 0,
    responseTime: 0
  })
  const [systemStatus, setSystemStatus] = useState({
    siem: 'ready',
    response: 'ready',
    ai: 'ready',
    audit: 'ready'
  })
  const [attackChain, setAttackChain] = useState([])
  const [showExport, setShowExport] = useState(false)

  // Update simulation state periodically
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        const state = simulationEngine.getSimulationState()
        setSimulationState(state)
        setTimeline(state.timeline || [])

        // Update system metrics
        setSystemMetrics({
          cpu: Math.floor(Math.random() * 40 + 30),
          memory: Math.floor(Math.random() * 50 + 20),
          network: Math.floor(Math.random() * 60 + 15),
          alerts: state.alertsTriggered,
          responseTime: Math.floor(Math.random() * 200 + 50)
        })
      }, 500 / simulationSpeed)
      return () => clearInterval(interval)
    }
  }, [isRunning, simulationSpeed])

  // Handle simulation start
  const handleStartSimulation = useCallback(async () => {
    if (!selectedScenario) return

    try {
      setIsRunning(true)
      setSystemStatus({
        siem: 'active',
        response: 'active',
        ai: 'active',
        audit: 'active'
      })

      // Initialize attack chain
      setAttackChain(getAttackChain(selectedScenario))

      await simulationEngine.runScenario(selectedScenario)

      setIsRunning(false)
      setSystemStatus({
        siem: 'ready',
        response: 'ready',
        ai: 'ready',
        audit: 'ready'
      })

    } catch (error) {
      console.error('Simulation error:', error)
      setIsRunning(false)
      setSystemStatus({
        siem: 'error',
        response: 'error',
        ai: 'error',
        audit: 'error'
      })
    }
  }, [selectedScenario])

  // Handle simulation stop
  const handleStopSimulation = useCallback(() => {
    simulationEngine.stopSimulation()
    setIsRunning(false)
    setSystemStatus({
      siem: 'ready',
      response: 'ready',
      ai: 'ready',
      audit: 'ready'
    })
  }, [])

  // Handle simulation reset
  const handleResetSimulation = useCallback(() => {
    if (isRunning) return

    simulationEngine.resetState()
    setSimulationState({
      eventsGenerated: 0,
      alertsTriggered: 0,
      incidentsCreated: 0,
      responsesExecuted: 0,
      timeline: [],
      activeResponses: []
    })
    setTimeline([])
    setAttackChain([])
    setSelectedScenario('')
    setSystemMetrics({
      cpu: 0,
      memory: 0,
      network: 0,
      alerts: 0,
      responseTime: 0
    })
  }, [isRunning])

  // Get attack chain for visualization
  const getAttackChain = (scenario) => {
    const chains = {
      phishing: [
        { id: 1, name: 'Initial Recon', status: 'pending', icon: Eye },
        { id: 2, name: 'Email Delivery', status: 'pending', icon: Mail },
        { id: 3, name: 'Credential Theft', status: 'pending', icon: Shield },
        { id: 4, name: 'Account Takeover', status: 'pending', icon: Lock }
      ],
      malware: [
        { id: 1, name: 'Malicious Upload', status: 'pending', icon: Upload },
        { id: 2, name: 'File Execution', status: 'pending', icon: Play },
        { id: 3, name: 'Command & Control', status: 'pending', icon: Network },
        { id: 4, name: 'Data Exfiltration', status: 'pending', icon: Download }
      ],
      compromise: [
        { id: 1, name: 'Brute Force', status: 'pending', icon: Target },
        { id: 2, name: 'Suspicious Access', status: 'pending', icon: AlertTriangle },
        { id: 3, name: 'Privilege Escalation', status: 'pending', icon: TrendingUp },
        { id: 4, name: 'Data Breach', status: 'pending', icon: AlertCircle }
      ],
      multistage: [
        { id: 1, name: 'Initial Phishing', status: 'pending', icon: Mail },
        { id: 2, name: 'Credential Harvest', status: 'pending', icon: Shield },
        { id: 3, name: 'Malware Delivery', status: 'pending', icon: File },
        { id: 4, name: 'Execution', status: 'pending', icon: Play },
        { id: 5, name: 'C2 Beaconing', status: 'pending', icon: Wifi },
        { id: 6, name: 'Lateral Movement', status: 'pending', icon: ArrowRight }
      ]
    }
    return chains[scenario] || []
  }

  // Get max stages for progress calculation
  const getMaxStages = (scenario) => {
    const stageMap = {
      phishing: 4,
      malware: 4,
      compromise: 4,
      multistage: 6
    }
    return stageMap[scenario] || 0
  }

  // Export simulation data
  const handleExport = useCallback(() => {
    const exportData = {
      scenario: selectedScenario,
      timestamp: new Date().toISOString(),
      duration: timeline.length > 0 ? new Date(timeline[timeline.length - 1].timestamp) - new Date(timeline[0].timestamp) : 0,
      metrics: simulationState,
      timeline: timeline,
      systemMetrics: systemMetrics,
      attackChain: attackChain
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `simulation-${selectedScenario}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    setShowExport(false)
  }, [selectedScenario, simulationState, timeline, systemMetrics, attackChain])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/10 to-slate-900 text-white overflow-hidden relative">
      {/* Enhanced Background */}
      <div className="absolute inset-0">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="advanced-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="50" height="50" fill="none" stroke="url(#advanced-gradient)" strokeWidth="0.5" opacity="0.3" />
                <circle cx="25" cy="25" r="0.5" fill="#06b6d4" opacity="0.8">
                  <animate attributeName="opacity" values="0.8;0.3;0.8" dur="4s" repeatCount="indefinite" />
                </circle>
              </pattern>
              <linearGradient id="advanced-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#advanced-grid)" />
          </svg>
        </div>

        {/* Floating Data Nodes */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={`data-${i}`}
            className="absolute rounded-full border border-cyan-400/20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() * 8 + 2,
              height: Math.random() * 8 + 2,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        {/* Elite SOC Command Center Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border-b border-slate-700/50"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="relative p-3 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-xl border border-purple-400/40"
                >
                  <Shield className="w-8 h-8 text-purple-400" />
                  <div className="absolute inset-0 rounded-xl border border-purple-400/20 animate-pulse" />
                </motion.div>

                <div>
                  <h1 className="text-4xl font-black bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
                    ADVANCED ATTACK SIMULATION
                  </h1>
                  <p className="text-sm text-slate-400 font-mono tracking-wide">
                    ELITE SOC TRAINING • REAL-TIME THREAT SIMULATION • AI-POWERED DEFENSE VALIDATION
                  </p>
                </div>
              </div>

              {/* Live Status Indicators */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-slate-500'}`} />
                  <span className="text-xs font-semibold text-slate-300">
                    {isRunning ? 'LIVE SIMULATION' : 'SYSTEM READY'}
                  </span>
                </div>

                {simulationState.eventsGenerated > 0 && (
                  <div className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full">
                    <span className="text-xs font-mono text-cyan-400">
                      {simulationState.eventsGenerated} EVENTS PROCESSED
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Control Panel - Single Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
          >
            {/* Scenario Selector - Left */}
            <div className="lg:col-span-1">
              <ScenarioSelector
                selectedScenario={selectedScenario}
                onScenarioSelect={setSelectedScenario}
                disabled={isRunning}
              />
            </div>

            {/* Controls & Metrics - Right */}
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Simulation Controls */}
              <SimulationControls
                isRunning={isRunning}
                selectedScenario={selectedScenario}
                onStart={handleStartSimulation}
                onStop={handleStopSimulation}
                onReset={handleResetSimulation}
                simulationState={simulationState}
                disabled={false}
              />

              {/* System Metrics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Gauge className="w-5 h-5 text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">System Metrics</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${isRunning ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`} />
                    <span className="text-xs text-slate-400">{isRunning ? 'ACTIVE' : 'IDLE'}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Cpu className="w-3 h-3" />
                        <span>CPU</span>
                      </span>
                      <span className="text-xs text-cyan-400 font-mono">{systemMetrics.cpu}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${systemMetrics.cpu}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <HardDrive className="w-3 h-3" />
                        <span>Memory</span>
                      </span>
                      <span className="text-xs text-green-400 font-mono">{systemMetrics.memory}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <motion.div
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${systemMetrics.memory}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400 flex items-center space-x-1">
                        <Wifi className="w-3 h-3" />
                        <span>Network</span>
                      </span>
                      <span className="text-xs text-purple-400 font-mono">{systemMetrics.network}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${systemMetrics.network}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-700/50">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-400">Response Time</span>
                      <span className="text-xs text-yellow-400 font-mono">{systemMetrics.responseTime}ms</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Main Dashboard - Two Column Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Attack Timeline - Left */}
            <div className="xl:col-span-1">
              <SimulationTimeline
                timeline={timeline}
                isRunning={isRunning}
                currentStage={timeline.length}
                maxStages={getMaxStages(selectedScenario)}
              />
            </div>

            {/* Attack Chain & Analytics - Right */}
            <div className="xl:col-span-1 space-y-6">
              {/* Attack Chain Visualization */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Network className="w-5 h-5 text-purple-400" />
                    <h3 className="text-lg font-bold text-white">Attack Chain Flow</h3>
                  </div>
                  {selectedScenario && (
                    <div className="text-xs text-slate-400 bg-slate-800/50 px-2 py-1 rounded">
                      {timeline.length}/{getMaxStages(selectedScenario)} stages
                    </div>
                  )}
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {attackChain.map((stage, index) => {
                    const Icon = stage.icon
                    const isActive = timeline.length > index
                    const isCurrent = timeline.length === index + 1 && isRunning

                    return (
                      <motion.div
                        key={stage.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`relative flex items-center space-x-3 p-3 rounded-lg border transition-all ${
                          isActive
                            ? 'bg-green-500/10 border-green-500/30 text-green-300'
                            : isCurrent
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-300'
                            : 'bg-slate-800/50 border-slate-700/50 text-slate-400'
                        }`}
                      >
                        {/* Status Icon */}
                        <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
                          isActive ? 'bg-green-500/20' :
                          isCurrent ? 'bg-cyan-500/20' :
                          'bg-slate-700/50'
                        }`}>
                          {isActive ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : isCurrent ? (
                            <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Icon className="w-4 h-4 text-slate-500" />
                          )}
                        </div>

                        {/* Stage Info */}
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-semibold truncate">{stage.name}</div>
                          <div className="text-xs opacity-70">
                            {isActive ? 'Completed' : isCurrent ? 'In Progress' : 'Pending'}
                          </div>
                        </div>

                        {/* Progress Indicator */}
                        {index < attackChain.length - 1 && (
                          <div className={`w-1 h-6 rounded-full ${
                            isActive ? 'bg-green-500/50' : 'bg-slate-600'
                          }`} />
                        )}
                      </motion.div>
                    )
                  })}
                </div>

                {selectedScenario && (
                  <div className="mt-4 pt-3 border-t border-slate-700/50">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(timeline.length / getMaxStages(selectedScenario)) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Advanced Analytics Dashboard */}
          <AnimatePresence>
            {simulationState.eventsGenerated > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                {/* Performance Analytics */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5 text-cyan-400" />
                    <span>Performance Analytics</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Detection Rate</span>
                        <span className="text-green-400 font-semibold">94.7%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.7%' }} />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">Response Time</span>
                        <span className="text-cyan-400 font-semibold">45ms</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '85%' }} />
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-400">False Positives</span>
                        <span className="text-yellow-400 font-semibold">2.1%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '2.1%' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* AI SOC Assistant Analysis */}
                <motion.div
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <span>AI SOC Analysis</span>
                  </h3>

                  <div className="space-y-4">
                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-sm font-semibold text-cyan-400 mb-2">Attack Classification</div>
                      <div className="text-sm text-slate-300">
                        {selectedScenario === 'phishing' && 'Credential Theft Campaign'}
                        {selectedScenario === 'malware' && 'Malware Infection Chain'}
                        {selectedScenario === 'compromise' && 'Account Compromise Attack'}
                        {selectedScenario === 'multistage' && 'Advanced Persistent Threat'}
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-sm font-semibold text-green-400 mb-2">MITRE ATT&CK Mapping</div>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                          T1566
                        </span>
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                          T1059
                        </span>
                        <span className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                          T1078
                        </span>
                      </div>
                    </div>

                    <div className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="text-sm font-semibold text-yellow-400 mb-2">AI Confidence</div>
                      <div className="text-2xl font-bold text-yellow-400">96.8%</div>
                    </div>
                  </div>
                </motion.div>

                {/* Export & Actions */}
                <motion.div
                  className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                >
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-2">
                    <Download className="w-5 h-5 text-green-400" />
                    <span>Export & Actions</span>
                  </h3>

                  <div className="space-y-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleExport}
                      className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Simulation Data</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowExport(!showExport)}
                      className="w-full flex items-center justify-center space-x-2 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Advanced Options</span>
                    </motion.button>

                    {/* Speed Controls */}
                    <div className="pt-4 border-t border-slate-700/50">
                      <div className="text-sm font-semibold text-white mb-3">Simulation Speed</div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setSimulationSpeed(Math.max(0.25, simulationSpeed - 0.25))}
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                          disabled={isRunning}
                        >
                          <Rewind className="w-4 h-4" />
                        </button>

                        <div className="flex-1 text-center">
                          <span className="text-sm font-mono text-cyan-400">{simulationSpeed}x</span>
                        </div>

                        <button
                          onClick={() => setSimulationSpeed(Math.min(4, simulationSpeed + 0.25))}
                          className="p-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
                          disabled={isRunning}
                        >
                          <FastForward className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Safety & Compliance Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="flex items-start space-x-4">
                <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-yellow-400 mb-2">Simulation Safety</h3>
                  <div className="text-sm text-yellow-300 space-y-1">
                    <p>• <strong>Complete Isolation:</strong> All simulation data contained within test environment</p>
                    <p>• <strong>No Production Impact:</strong> Events never affect live systems or data</p>
                    <p>• <strong>Automatic Cleanup:</strong> All simulation artifacts removed on reset</p>
                    <p>• <strong>Educational Only:</strong> Designed for professional security training</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-xl">
              <div className="flex items-start space-x-4">
                <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-green-400 mb-2">Professional Features</h3>
                  <div className="text-sm text-green-300 space-y-1">
                    <p>• <strong>Real-time Integration:</strong> Authentic SIEM and response engine testing</p>
                    <p>• <strong>AI-Powered Analysis:</strong> SOC Assistant provides live threat intelligence</p>
                    <p>• <strong>Enterprise-grade:</strong> Military and corporate security standards</p>
                    <p>• <strong>Comprehensive Audit:</strong> Complete action trail for compliance</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedAttackSimulation
