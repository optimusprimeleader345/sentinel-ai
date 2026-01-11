// AI-Powered Autonomous Security Operations (SOAR) Component
// Self-learning, self-healing cybersecurity platform with autonomous decision-making

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  Zap,
  Shield,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Target,
  RefreshCw,
  Play,
  Pause,
  Settings,
  BarChart3,
  Cpu,
  Network,
  Lock,
  Eye,
  MessageSquare
} from 'lucide-react'
import GlassCard from './admin/GlassCard'
import Button from './Button'
import { autonomousSecurityAPI } from '../lib/api.js'

const AIAutonomousSecurity = () => {
  const [status, setStatus] = useState(null)
  const [decisions, setDecisions] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [learning, setLearning] = useState(null)
  const [health, setHealth] = useState(null)
  const [loading, setLoading] = useState(true)
  const [autonomyLevel, setAutonomyLevel] = useState('MEDIUM')
  const [activeTab, setActiveTab] = useState('overview')

  // Load autonomous security data
  const loadData = async () => {
    try {
      const [statusRes, decisionsRes, metricsRes, learningRes, healthRes] = await Promise.all([
        autonomousSecurityAPI.getStatus(),
        autonomousSecurityAPI.getDecisions(),
        autonomousSecurityAPI.getMetrics(),
        autonomousSecurityAPI.getLearning(),
        autonomousSecurityAPI.health()
      ])

      if (statusRes.success) setStatus(statusRes.status)
      if (decisionsRes.success) setDecisions(decisionsRes.data.slice(0, 10))
      if (metricsRes.success) setMetrics(metricsRes.data)
      if (learningRes.success) setLearning(learningRes.data)
      if (healthRes.success) setHealth(healthRes.health)

    } catch (error) {
      console.error('Error loading autonomous security data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()

    // Refresh data every 30 seconds
    const interval = setInterval(loadData, 30000)
    return () => clearInterval(interval)
  }, [])

  // Update autonomy level
  const updateAutonomyLevel = async (level) => {
    try {
      const result = await autonomousSecurityAPI.updateAutonomyLevel({ level })
      if (result.success) {
        setAutonomyLevel(level)
        loadData() // Refresh status
      }
    } catch (error) {
      console.error('Error updating autonomy level:', error)
    }
  }

  // Simulate autonomous response
  const simulateResponse = async (scenario) => {
    try {
      const result = await autonomousSecurityAPI.simulate({ scenario })
      if (result.success) {
        console.log('Simulation result:', result.simulation)
        // Could show toast notification here
      }
    } catch (error) {
      console.error('Error running simulation:', error)
    }
  }

  // Status indicators
  const StatusIndicator = ({ status, label }) => (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${
        status === 'OPERATIONAL' || status === 'HEALTHY' || status === 'ACTIVE'
          ? 'bg-green-400 animate-pulse'
          : status === 'WARNING' || status === 'DEGRADED'
          ? 'bg-yellow-400'
          : 'bg-red-400'
      }`} />
      <span className="text-sm font-medium">{label}</span>
      <span className={`text-xs px-2 py-1 rounded ${
        status === 'OPERATIONAL' || status === 'HEALTHY' || status === 'ACTIVE'
          ? 'bg-green-500/20 text-green-400'
          : status === 'WARNING' || status === 'DEGRADED'
          ? 'bg-yellow-500/20 text-yellow-400'
          : 'bg-red-500/20 text-red-400'
      }`}>
        {status}
      </span>
    </div>
  )

  // Decision confidence meter
  const ConfidenceMeter = ({ confidence, size = 'sm' }) => {
    const height = size === 'lg' ? 'h-4' : 'h-2'
    const textSize = size === 'lg' ? 'text-lg font-bold' : 'text-sm'

    return (
      <div className="space-y-1">
        <div className="flex justify-between items-center">
          <span className={`${textSize} text-cyan-400`}>{confidence}%</span>
          <span className="text-xs text-slate-400">Confidence</span>
        </div>
        <div className={`w-full bg-slate-700 rounded-full ${height}`}>
          <div
            className={`h-full rounded-full transition-all duration-1000 ${
              confidence >= 80 ? 'bg-gradient-to-r from-green-500 to-green-400' :
              confidence >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
              'bg-gradient-to-r from-red-500 to-red-400'
            }`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-center">
          <Brain className="w-16 h-16 text-cyan-400 animate-pulse mx-auto mb-4" />
          <div className="text-white text-xl">Initializing Autonomous Security Operations...</div>
          <div className="text-slate-400 text-sm mt-2">Loading AI decision engines and self-healing systems</div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            AI Autonomous Security Operations
          </h1>
          <p className="text-slate-400">Self-learning, self-healing cybersecurity platform with autonomous decision-making</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-bold text-white">
              {status?.decisionEngine?.decisionsMade || 0}
            </span>
            <span className="text-xs text-slate-400">Decisions</span>
          </div>
          <Button onClick={loadData} size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* System Status */}
      {status && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <GlassCard className="text-center">
            <StatusIndicator
              status={status.decisionEngine.active ? 'OPERATIONAL' : 'INACTIVE'}
              label="Decision Engine"
            />
            <div className="mt-3 text-2xl font-bold text-cyan-400">
              {status.decisionEngine.decisionsMade}
            </div>
            <div className="text-xs text-slate-400">Decisions Made</div>
          </GlassCard>

          <GlassCard className="text-center">
            <StatusIndicator
              status={status.selfHealing.active ? 'OPERATIONAL' : 'INACTIVE'}
              label="Self-Healing"
            />
            <div className="mt-3 text-2xl font-bold text-green-400">
              {status.selfHealing.healingAttempts}
            </div>
            <div className="text-xs text-slate-400">Healing Actions</div>
          </GlassCard>

          <GlassCard className="text-center">
            <StatusIndicator
              status={status.learningDatabase.totalDecisions > 0 ? 'ACTIVE' : 'INACTIVE'}
              label="Learning System"
            />
            <div className="mt-3 text-2xl font-bold text-purple-400">
              {status.learningDatabase.totalDecisions}
            </div>
            <div className="text-xs text-slate-400">Learned Patterns</div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <Shield className={`w-4 h-4 ${
                status.decisionEngine.autonomyLevel === 'CRITICAL' ? 'text-red-400' :
                status.decisionEngine.autonomyLevel === 'HIGH' ? 'text-orange-400' :
                status.decisionEngine.autonomyLevel === 'MEDIUM' ? 'text-yellow-400' :
                'text-green-400'
              }`} />
              <span className="text-sm font-medium">
                {status.decisionEngine.autonomyLevel}
              </span>
            </div>
            <div className="mt-3 text-2xl font-bold text-white">
              {status.decisionEngine.autonomyLevel === 'CRITICAL' ? '🚨' :
               status.decisionEngine.autonomyLevel === 'HIGH' ? '⚡' :
               status.decisionEngine.autonomyLevel === 'MEDIUM' ? '🤖' :
               '👁️'}
            </div>
            <div className="text-xs text-slate-400">Autonomy Level</div>
          </GlassCard>
        </motion.div>
      )}

      {/* Control Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Autonomy Control */}
        <GlassCard title="Autonomy Control" icon={Settings}>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                AI Autonomy Level
              </label>
              <select
                value={autonomyLevel}
                onChange={(e) => updateAutonomyLevel(e.target.value)}
                className="w-full px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
              >
                <option value="LOW">👁️ LOW - Human Approval Required</option>
                <option value="MEDIUM">🤖 MEDIUM - Routine Tasks Autonomous</option>
                <option value="HIGH">⚡ HIGH - Advanced Autonomy</option>
                <option value="CRITICAL">🚨 CRITICAL - Emergency Autonomy</option>
              </select>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div><strong>LOW:</strong> All decisions require human approval</div>
              <div><strong>MEDIUM:</strong> Routine tasks handled automatically</div>
              <div><strong>HIGH:</strong> Complex decisions made autonomously</div>
              <div><strong>CRITICAL:</strong> Emergency responses fully autonomous</div>
            </div>
          </div>
        </GlassCard>

        {/* Simulation Panel */}
        <GlassCard title="Response Simulation" icon={Play}>
          <div className="space-y-3">
            <button
              onClick={() => simulateResponse('malware-detection')}
              className="w-full p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-left hover:bg-red-500/30 transition-colors"
            >
              <div className="font-medium text-red-400">Malware Detection</div>
              <div className="text-xs text-slate-400">Simulate ransomware response</div>
            </button>

            <button
              onClick={() => simulateResponse('phishing-alert')}
              className="w-full p-3 bg-blue-500/20 border border-blue-500/50 rounded-lg text-left hover:bg-blue-500/30 transition-colors"
            >
              <div className="font-medium text-blue-400">Phishing Alert</div>
              <div className="text-xs text-slate-400">Simulate credential theft response</div>
            </button>

            <button
              onClick={() => simulateResponse('ddos-attack')}
              className="w-full p-3 bg-orange-500/20 border border-orange-500/50 rounded-lg text-left hover:bg-orange-500/30 transition-colors"
            >
              <div className="font-medium text-orange-400">DDoS Attack</div>
              <div className="text-xs text-slate-400">Simulate traffic mitigation</div>
            </button>
          </div>
        </GlassCard>

        {/* Performance Metrics */}
        {metrics && (
          <GlassCard title="Performance Metrics" icon={BarChart3}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-300 text-sm">Uptime</span>
                <span className="text-green-400 font-semibold">{metrics.uptime}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300 text-sm">Decisions/Hour</span>
                <span className="text-cyan-400 font-semibold">{metrics.decisionsPerHour}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300 text-sm">Success Rate</span>
                <span className="text-green-400 font-semibold">{metrics.successRate.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300 text-sm">Response Time</span>
                <span className="text-yellow-400 font-semibold">{metrics.avgResponseTime.toFixed(1)}s</span>
              </div>
            </div>
          </GlassCard>
        )}
      </motion.div>

      {/* Main Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex space-x-1 mb-6">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'decisions', label: 'Decisions', icon: Brain },
            { id: 'learning', label: 'Learning', icon: TrendingUp },
            { id: 'health', label: 'Health', icon: Shield }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              {/* Recent Decisions */}
              <GlassCard title="Recent Autonomous Decisions" icon={Brain}>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {decisions.slice(0, 5).map((decision, index) => (
                    <motion.div
                      key={decision.eventId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-slate-800/50 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-white font-medium text-sm">
                          {decision.analysis?.threatLevel} Threat
                        </span>
                        <div className="flex items-center space-x-2">
                          {decision.canExecuteAutonomously ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <Clock className="w-4 h-4 text-yellow-400" />
                          )}
                          <span className="text-xs text-slate-400">
                            {decision.canExecuteAutonomously ? 'Auto' : 'Review'}
                          </span>
                        </div>
                      </div>
                      <div className="text-slate-300 text-sm mb-2">
                        {decision.reasoning?.split('.')[0]}
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{new Date(decision.timestamp).toLocaleTimeString()}</span>
                        <ConfidenceMeter confidence={decision.confidence} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Self-Healing Actions */}
              <GlassCard title="Self-Healing Actions" icon={Shield}>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      {status?.selfHealing?.successRate?.toFixed(1) || 0}%
                    </div>
                    <div className="text-slate-400 text-sm">Success Rate</div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-cyan-400">
                        {status?.selfHealing?.healingAttempts || 0}
                      </div>
                      <div className="text-xs text-slate-400">Total Actions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-purple-400">
                        {status?.selfHealing?.activeHealings || 0}
                      </div>
                      <div className="text-xs text-slate-400">Active</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Vulnerability Patching</span>
                      <span className="text-green-400">Automated</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Configuration Fixes</span>
                      <span className="text-green-400">Automated</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Service Recovery</span>
                      <span className="text-yellow-400">Approval Required</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'decisions' && (
            <motion.div
              key="decisions"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <GlassCard title="Decision History & Analysis" icon={Brain}>
                <div className="space-y-4">
                  {decisions.map((decision, index) => (
                    <motion.div
                      key={decision.eventId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-cyan-500/50"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-white font-semibold">
                            Decision #{decisions.length - index}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {decision.analysis?.threatLevel} threat detected
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-cyan-400 mb-1">
                            {decision.confidence}% Confidence
                          </div>
                          <div className={`text-xs px-2 py-1 rounded ${
                            decision.canExecuteAutonomously
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {decision.canExecuteAutonomously ? 'Autonomous' : 'Human Review'}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Impact</div>
                          <div className={`text-sm font-semibold ${
                            decision.analysis?.impactAssessment === 'CRITICAL' ? 'text-red-400' :
                            decision.analysis?.impactAssessment === 'HIGH' ? 'text-orange-400' :
                            decision.analysis?.impactAssessment === 'MEDIUM' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {decision.analysis?.impactAssessment}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Urgency</div>
                          <div className={`text-sm font-semibold ${
                            decision.analysis?.urgency === 'CRITICAL' ? 'text-red-400' :
                            decision.analysis?.urgency === 'HIGH' ? 'text-orange-400' :
                            decision.analysis?.urgency === 'MEDIUM' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {decision.analysis?.urgency}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400 mb-1">Risk Score</div>
                          <div className="text-sm font-semibold text-purple-400">
                            {decision.riskAssessment}
                          </div>
                        </div>
                      </div>

                      <div className="text-sm text-slate-300 mb-3">
                        <strong>Recommended Action:</strong> {decision.recommendedAction}
                      </div>

                      <div className="text-xs text-slate-500">
                        {new Date(decision.timestamp).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'learning' && learning && (
            <motion.div
              key="learning"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 xl:grid-cols-2 gap-6"
            >
              <GlassCard title="Learning Insights" icon={TrendingUp}>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {learning.improvementRate}%
                    </div>
                    <div className="text-slate-400 text-sm">Improvement Rate</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Learned Patterns</span>
                      <span className="text-cyan-400 font-semibold">{learning.totalLearnedPatterns}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Predictive Accuracy</span>
                      <span className="text-green-400 font-semibold">{learning.predictiveAccuracy.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">False Positive Reduction</span>
                      <span className="text-yellow-400 font-semibold">{learning.falsePositiveReduction.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard title="Recent Learnings" icon={Brain}>
                <div className="space-y-3">
                  {learning.recentLearnings.map((learning, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 bg-slate-800/50 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          learning.impact === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                          learning.impact === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {learning.impact} Impact
                        </span>
                        <span className="text-xs text-slate-500">
                          {new Date(learning.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-slate-300 text-sm">{learning.lesson}</p>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'health' && health && (
            <motion.div
              key="health"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 xl:grid-cols-3 gap-6"
            >
              <GlassCard title="System Health" icon={Shield}>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className={`text-3xl font-bold mb-2 ${
                      health.overall === 'HEALTHY' ? 'text-green-400' :
                      health.overall === 'WARNING' ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {health.overall}
                    </div>
                    <div className="text-slate-400 text-sm">Overall Status</div>
                  </div>

                  <div className="space-y-2">
                    {Object.entries(health.components).map(([component, status]) => (
                      <div key={component} className="flex justify-between text-sm">
                        <span className="text-slate-300 capitalize">
                          {component.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <StatusIndicator status={status} label="" />
                      </div>
                    ))}
                  </div>
                </div>
              </GlassCard>

              <GlassCard title="Performance Metrics" icon={Cpu}>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">CPU Usage</span>
                      <span className="text-cyan-400 font-semibold">{health.performance.cpu}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Memory Usage</span>
                      <span className="text-purple-400 font-semibold">{health.performance.memory}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300 text-sm">Response Time</span>
                      <span className="text-green-400 font-semibold">{health.performance.responseTime}ms</span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-700/50">
                    <div className="text-xs text-slate-400 mb-1">Last Maintenance</div>
                    <div className="text-sm text-white">
                      {new Date(health.lastMaintenance).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </GlassCard>

              <GlassCard title="System Information" icon={Settings}>
                <div className="space-y-4">
                  <div>
                    <div className="text-xs text-slate-400 mb-1">Next Maintenance</div>
                    <div className="text-sm text-cyan-400">
                      {new Date(health.nextMaintenance).toLocaleDateString()}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 mb-1">Active Components</div>
                    <div className="text-sm text-white">
                      {Object.values(health.components).filter(s => s === 'OPERATIONAL' || s === 'ACTIVE').length} of {Object.keys(health.components).length}
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 mb-1">System Uptime</div>
                    <div className="text-sm text-green-400">
                      {Math.floor((Date.now() - new Date(health.lastMaintenance).getTime()) / (1000 * 60 * 60 * 24))} days
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* AI Autonomous Intelligence Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">AI Autonomous Intelligence Summary</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Autonomous Security Operations Active:</strong> AI-powered SOAR system is continuously monitoring, analyzing, and responding to security events.
                  Decision engine has processed {status?.decisionEngine?.decisionsMade || 0} security events with {status?.selfHealing?.successRate?.toFixed(1) || 0}% self-healing success rate.
                  Machine learning models have learned {status?.learningDatabase?.totalDecisions || 0} patterns and improved detection accuracy by {learning?.improvementRate || 0}%.
                </p>
                <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400">
                  <span>• Autonomous Decisions: {metrics?.autonomousActions || 0}</span>
                  <span>• Self-Healing Actions: {status?.selfHealing?.healingAttempts || 0}</span>
                  <span>• Learning Efficiency: {metrics?.learningEfficiency?.toFixed(1) || 0}%</span>
                  <span>• Risk Reduction: {metrics?.riskReduction?.toFixed(1) || 0}%</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}

export default AIAutonomousSecurity
