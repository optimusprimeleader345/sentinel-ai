import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/admin/GlassCard'
import {
  Users,
  Target,
  Activity,
  AlertTriangle,
  TrendingUp,
  Eye,
  Cpu,
  Brain,
  Clock,
  MessageSquare,
  Shield,
  Zap,
  Radar,
  BarChart3,
  User,
  Globe,
  Smartphone,
  Monitor,
  Database,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle
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
  ScatterChart,
  Scatter,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { behavioralAnalyticsAPI } from '../lib/api.js'

// Extended behavioral analytics data
const behavioralPatterns = [
  {
    pattern: 'High-Latency Login',
    confidence: 89,
    usersAffected: 3,
    risk: 'Medium',
    locations: ['Remote Office', 'VPN Connection'],
    trend: 'Increasing',
    color: '#f59e0b'
  },
  {
    pattern: 'Privilege Escalation Attempt',
    confidence: 95,
    usersAffected: 1,
    risk: 'High',
    locations: ['Admin Server'],
    trend: 'New',
    color: '#ef4444'
  },
  {
    pattern: 'Data Exfiltration',
    confidence: 76,
    usersAffected: 2,
    risk: 'Critical',
    locations: ['Database Server'],
    trend: 'Persistent',
    color: '#8b5cf6'
  },
  {
    pattern: 'Unusual Time Access',
    confidence: 82,
    usersAffected: 5,
    risk: 'Low',
    locations: ['Multiple Locations'],
    trend: 'Stable',
    color: '#06b6d4'
  }
]

const anomalyData = [
  {
    id: 1,
    user: 'john.doe',
    anomaly: 'Late Night Access',
    riskScore: 89,
    confidence: 94,
    time: '23:45',
    location: 'Office Campus',
    action: 'Monitored'
  },
  {
    id: 2,
    user: 'jane.smith',
    anomaly: 'Bulk Data Transfer',
    riskScore: 76,
    confidence: 87,
    time: '14:20',
    location: 'Remote Office',
    action: 'Flagged'
  },
  {
    id: 3,
    user: 'admin.user',
    anomaly: 'Elevated Privileges',
    riskScore: 95,
    confidence: 91,
    time: '23:15',
    location: 'Data Center',
    action: 'Alerted'
  }
]

const aiBehavioralClusters = [
  { timeRange: 'Last Hour', clusters: 7, anomaliesDetected: 12, patternSimilarity: 94 },
  { timeRange: 'Last Day', clusters: 18, anomaliesDetected: 47, patternSimilarity: 87 },
  { timeRange: 'Last Week', clusters: 54, anomaliesDetected: 142, patternSimilarity: 79 },
]

function BehaviorAnalytics() {
  // Safe visibility marker (debug only)
  console.log('ANALYST_RENDER_OK: BehaviorAnalytics rendering');

  // Real-time anomaly feed data
  const [realTimeAnomalies, setRealTimeAnomalies] = useState([
    {
      id: 1,
      user: 'sarah.admin',
      anomaly: 'Multiple Failed Login Attempts',
      risk: 'medium',
      timestamp: new Date().toISOString(),
      confidence: 88,
      location: 'Main Campus'
    },
    {
      id: 2,
      user: 'dev.user',
      anomaly: 'Unexpected Data Access',
      risk: 'high',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      confidence: 92,
      location: 'Server Room'
    },
    {
      id: 3,
      user: 'finance.head',
      anomaly: 'Off-Hours Activity',
      risk: 'low',
      timestamp: new Date(Date.now() - 420000).toISOString(),
      confidence: 76,
      location: 'Remote VPN'
    }
  ]);

  const [behaviorSummary, setBehaviorSummary] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBehaviorAnalytics()

    // Simulate real-time anomaly updates
    const interval = setInterval(() => {
      setRealTimeAnomalies(prev => {
        const newAnomaly = {
          id: Date.now(),
          user: ['user.manager', 'admin.support', 'data.analyst'][Math.floor(Math.random() * 3)],
          anomaly: ['Suspicious File Download', 'Unusual API Usage', 'Session Hijack Attempt'][Math.floor(Math.random() * 3)],
          risk: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          timestamp: new Date().toISOString(),
          confidence: Math.floor(Math.random() * 20) + 75,
          location: ['Corporate Office', 'Remote Server', 'Cloud Instance'][Math.floor(Math.random() * 3)]
        };
        return [newAnomaly, ...prev.slice(0, 8)]; // Keep 9 most recent
      });
    }, 12000);

    return () => clearInterval(interval);
  }, [])

  const loadBehaviorAnalytics = async () => {
    try {
      const response = await getBehaviorSummary()
      setBehaviorSummary(response.data)
    } catch (error) {
      console.error('Failed to load behavior analytics:', error)
      setBehaviorSummary({
        totalUsers: 247,
        activeSessions: 89,
        anomaliesDetected: 12,
        averageRiskScore: 34
      })
    } finally {
      setLoading(false)
    }
  }

  const AnomalyCard = ({ anomaly, index }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`p-4 rounded-lg border-l-4 cursor-pointer hover:scale-102 transition-all ${anomaly.risk === 'high' ? 'border-l-red-500 bg-red-500/5' : anomaly.risk === 'medium' ? 'border-l-yellow-500 bg-yellow-500/5' : 'border-l-blue-500 bg-blue-500/5'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-white font-semibold mb-1">{anomaly.user}</div>
          <p className="text-slate-300 text-sm">{anomaly.anomaly}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-slate-400">
          <span className="font-medium">Risk Score:</span> {anomaly.riskScore}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-cyan-400">{anomaly.confidence}%</div>
          <div className="text-xs text-slate-500">Confidence</div>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{anomaly.location}</span>
        <span>{new Date(anomaly.timestamp).toLocaleTimeString()}</span>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading Behavioral Analytics Hub...</div>
      </div>
    )
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
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Behavioral Analytics Hub
            </h1>
            <p className="text-slate-400 text-sm">AI-powered User and Entity Behavior Analysis (UEBA)</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-white">{aiBehavioralClusters[2].anomaliesDetected}</span>
            <span className="text-xs text-slate-400">Anomalies</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-white">{behavioralPatterns.length}</span>
            <span className="text-xs text-slate-400">Patterns</span>
          </div>
        </div>
      </motion.div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">

        {/* User Behavior Patterns - Advanced Multi-Dimension Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2"
        >
          <GlassCard title="Behavioral Pattern Analysis" icon={BarChart3}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-4">Multi-Dimension Behavioral Intelligence Map</h3>

              {/* Advanced 3D-Like Behavioral Pattern Grid */}
              <div className="relative h-80 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50">
                {/* Background Grid Pattern */}
                <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 100 100">
                  <defs>
                    <pattern id="behavioral-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                      <rect width="10" height="10" fill="transparent"/>
                      <circle cx="2" cy="2" r="0.5" fill="#475569"/>
                      <line x1="0" y1="10" x2="10" y2="0" stroke="#475569" strokeWidth="0.2"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#behavioral-grid)"/>
                </svg>

                {/* Floating Pattern Nodes */}
                {(Array.isArray(behavioralPatterns) ? behavioralPatterns : []).map((pattern, index) => {
                  const angle = (index * 360) / behavioralPatterns.length;
                  const radius = 75; // Reduced radius for better spacing
                  const x = 135 + Math.cos((angle * Math.PI) / 180) * radius;
                  const y = 135 + Math.sin((angle * Math.PI) / 180) * radius;

                  // Determine tooltip position based on quadrant to prevent overlap
                  const isRightHalf = Math.cos((angle * Math.PI) / 180) > 0;
                  const isTopHalf = Math.sin((angle * Math.PI) / 180) < 0;

                  const tooltipClass = isRightHalf
                    ? (isTopHalf ? 'left-12 top-0' : 'left-12 bottom-0')
                    : (isTopHalf ? 'right-12 top-0' : 'right-12 bottom-0');

                  return (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.15, duration: 0.8, type: "spring" }}
                      className="absolute cursor-pointer group z-20"
                      style={{
                        left: x,
                        top: y,
                        zIndex: 20
                      }}
                    >
                      {/* Constrained Node Glow Effect */}
                      <div
                        className="absolute inset-0 rounded-full blur-md"
                        style={{
                          backgroundColor: pattern.color,
                          opacity: 0.2,
                          width: Math.min(pattern.usersAffected * 4, 20) + 'px',
                          height: Math.min(pattern.usersAffected * 4, 20) + 'px',
                          transform: 'translate(-50%, -50%)',
                          left: '50%',
                          top: '50%'
                        }}
                      />

                      {/* Main Node */}
                      <div
                        className="relative w-3 h-3 rounded-full border shadow-md group-hover:scale-125 transition-all duration-300"
                        style={{
                          backgroundColor: pattern.color,
                          borderColor: pattern.color,
                          boxShadow: `0 0 8px ${pattern.color}60`
                        }}
                      >
                        {/* Pulsing Inner Core */}
                        <div
                          className="absolute inset-0.5 rounded-full animate-pulse"
                          style={{ backgroundColor: pattern.color, opacity: 0.7 }}
                        />
                      </div>

                      {/* Positioned Tooltip to prevent overlap */}
                      <div className={`absolute ${tooltipClass} transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30`}>
                        <div className="bg-slate-900/95 border border-slate-600/50 rounded-lg p-2 shadow-xl backdrop-blur-sm min-w-40 max-w-48 pointer-events-none">
                          <div className="font-semibold text-white text-xs mb-1">{pattern.pattern}</div>
                          <div className="text-xs text-slate-300 space-y-0.5">
                            <div className="flex justify-between">
                              <span>Confidence:</span>
                              <span className="text-cyan-400">{pattern.confidence}%</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Users:</span>
                              <span className="text-red-400">{pattern.usersAffected}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Risk:</span>
                              <span className={`${
                                pattern.risk === 'High' ? 'text-red-400' :
                                pattern.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                              }`}>{pattern.risk}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Trend:</span>
                              <span className="text-purple-400">{pattern.trend}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}

                {/* Central Intelligence Hub */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, duration: 0.6, type: "spring" }}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10"
                >
                  <div className="relative">
                    {/* Outer Rotating Ring */}
                    <div className="w-16 h-16 border-2 border-cyan-400/30 rounded-full animate-spin" style={{ animationDuration: '8s' }}>
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full">
                        <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping"></div>
                      </div>
                    </div>
                    {/* Inner Core */}
                    <div className="absolute inset-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </motion.div>

                {/* Connection Lines */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                  {behavioralPatterns.map((pattern, index) => {
                    const angle = (index * 360) / behavioralPatterns.length;
                    const x1 = 133;
                    const y1 = 133;
                    const x2 = 135 + Math.cos((angle * Math.PI) / 180) * 70; // Adjusted for smaller radius
                    const y2 = 135 + Math.sin((angle * Math.PI) / 180) * 70;

                    return (
                      <motion.line
                        key={`line-${index}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={pattern.color}
                        strokeWidth="0.8"
                        strokeOpacity="0.3"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: index * 0.1 + 1, duration: 0.8 }}
                      />
                    );
                  })}
                </svg>
              </div>

              {/* Pattern Intensity Legend */}
              <div className="flex justify-center items-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-xs text-slate-400">Low Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-xs text-slate-400">Medium Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span className="text-xs text-slate-400">High Impact</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="text-xs text-slate-400">Critical Threat</span>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-cyan-400">Neural Pattern Recognition Active</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-cyan-400">LIVE</span>
                </div>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                🤖 <strong>Advanced AI Analysis:</strong> Multi-dimensional behavioral intelligence network detected {behavioralPatterns.length} complex patterns with interconnections.
                Highest threat vectors show {behavioralPatterns[0].pattern} pattern affecting {behavioralPatterns[0].usersAffected} users with {behavioralPatterns[0].confidence}% confidence.
                Real-time correlation algorithms continuously adapt to emerging behavior anomalies. Neural pattern matching operates at 98.7% efficiency with instant threat escalation protocols active.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Behavioral Clustering Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="AI Behavioral Clustering" icon={Brain}>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{aiBehavioralClusters[2].clusters}</div>
                <div className="text-slate-400 text-sm">Behavioral Clusters</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Pattern Recognition</span>
                  <span className="text-green-400 font-semibold">{aiBehavioralClusters[2].patternSimilarity}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Anomaly Detection</span>
                  <span className="text-cyan-400 font-semibold">{aiBehavioralClusters[2].anomaliesDetected}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Confidence Score</span>
                  <span className="text-yellow-400 font-semibold">91%</span>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <div className="text-xs text-slate-400 mb-2">Last Analysis</div>
                <div className="text-sm text-cyan-400 font-semibold">Real-time</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* User Risk Profile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard title="Personal Risk Profile" icon={Radar}>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 text-sm">Current Risk Level</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  anomalyData.filter(a => a.riskScore > 80).length > 1 ? 'bg-red-500/20 text-red-400' :
                  anomalyData.filter(a => a.riskScore > 60).length > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {anomalyData.filter(a => a.riskScore > 80).length > 1 ? 'High' : anomalyData.filter(a => a.riskScore > 60).length > 0 ? 'Medium' : 'Low'}
                </span>
              </div>

              {[
                { factor: 'Login Behavior', score: 76 },
                { factor: 'Data Access', score: 82 },
                { factor: 'Session Patterns', score: 69 },
                { factor: 'Device Usage', score: 85 }
              ].map((factor, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-medium">{factor.factor}</span>
                    <span className={`text-sm font-bold ${factor.score >= 80 ? 'text-red-400' : factor.score >= 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {factor.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className={`h-2 rounded-full transition-all duration-1000 ${factor.score >= 80 ? 'bg-gradient-to-r from-red-500 to-red-400' : factor.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' : 'bg-gradient-to-r from-green-500 to-blue-400'}`} style={{ width: `${factor.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700/50 pt-4">
              <div className="text-xs text-slate-400 mb-1">AI Assessment</div>
              <div className="text-sm font-semibold text-cyan-400">
                {anomalyData.length} behavioral anomalies monitored
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Critical Anomaly Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <GlassCard title="Critical Behavioral Anomalies" icon={AlertTriangle}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {(Array.isArray(anomalyData) ? anomalyData : []).map((anomaly, index) => (
              <AnomalyCard key={anomaly.id} anomaly={anomaly} index={index} />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Real-time Anomaly Feed & AI Clustering */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Live Anomaly Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="Real-time Anomaly Feed" icon={Activity}>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {(Array.isArray(realTimeAnomalies) ? realTimeAnomalies : []).map((anomaly, index) => (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${anomaly.risk === 'high' ? 'border-l-red-500 bg-red-500/5' : anomaly.risk === 'medium' ? 'border-l-yellow-500 bg-yellow-500/5' : 'border-l-blue-500 bg-blue-500/5'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium text-sm">{anomaly.user}</span>
                    <span className={`text-xs px-2 py-1 rounded ${anomaly.risk === 'high' ? 'bg-red-500/20 text-red-400' : anomaly.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {anomaly.risk} risk
                    </span>
                  </div>
                  <div className="text-slate-300 text-sm mb-2">{anomaly.anomaly}</div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{anomaly.location}</span>
                    <span>{anomaly.confidence}% confidence</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(anomaly.timestamp).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Feed Status:</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Clustering Trends */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Behavioral Clustering Trends" icon={TrendingUp}>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mb-3">Anomaly Pattern Evolution</h4>
              {Array.isArray(aiBehavioralClusters) && aiBehavioralClusters.length > 0 ? (
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={aiBehavioralClusters}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="timeRange" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Line
                    dataKey="clusters"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-gray-400 text-center py-8">Preparing analytics...</div>
            )}
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xl font-bold text-cyan-400">{aiBehavioralClusters[2].patternSimilarity}%</div>
                    <div className="text-xs text-slate-400">Similarity Score</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xl font-bold text-purple-400">{aiBehavioralClusters[2].anomaliesDetected}</div>
                    <div className="text-xs text-slate-400">Total Anomalies</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">AI Processing Status</h4>
                <div className="space-y-1 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Behavioral Analysis:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pattern Clustering:</span>
                    <span className="text-green-400">94% Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Scoring:</span>
                    <span className="text-cyan-400">Continuous</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Behavioral Intelligence Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">AI Behavioral Analysis Summary</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Behavioral Intelligence Assessment:</strong> AI-powered UEBA analysis detected 54 behavioral clusters across 142 anomalous events. Real-time pattern recognition identifies privilege escalation and data exfiltration attempts with 94% confidence. Current user risk profile shows medium behavioral risk with active monitoring of {anomalyData.length} critical anomalies.
                </p>
                <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400">
                  <span>• Pattern Matching: {aiBehavioralClusters[2].patternSimilarity}%</span>
                  <span>• Real-time Monitoring: Active</span>
                  <span>• Risk Mitigation: Automated</span>
                  <span>• Behavioral Profiling: Continuous</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  )
}

export default BehaviorAnalytics
