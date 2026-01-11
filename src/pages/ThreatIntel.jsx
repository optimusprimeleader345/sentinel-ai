import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/admin/GlassCard'
import {
  AlertTriangle,
  Target,
  Radar,
  BarChart3,
  TrendingUp,
  Shield,
  Eye,
  Cpu,
  Brain,
  Activity,
  Clock,
  MessageSquare,
  Zap
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
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { getThreatIntel } from '../lib/api.js'

// Extended threat analytics data
const threatCategories = [
  { category: 'Phishing', count: 28, severity: 'medium', color: '#ef4444' },
  { category: 'Malware', count: 22, severity: 'high', color: '#f59e0b' },
  { category: 'DDoS', count: 15, severity: 'high', color: '#ec4899' },
  { category: 'Brute Force', count: 12, severity: 'low', color: '#06b6d4' },
  { category: 'Other', count: 8, severity: 'low', color: '#10b981' },
]

const criticalIntel = [
  {
    id: 1,
    threat: 'Targeted Phishing Campaign',
    severity: 'High',
    confidence: 87,
    source: 'Email Gateway',
    status: 'Active',
    description: 'Sophisticated spear-phishing targeting financial services industry.',
    riskScore: 85
  },
  {
    id: 2,
    threat: 'New Ransomware Variant',
    severity: 'Critical',
    confidence: 92,
    source: 'Sandbox Analysis',
    status: 'Contained',
    description: 'Double-extortion ransomware with advanced encryption algorithms.',
    riskScore: 95
  },
  {
    id: 3,
    threat: 'Supply Chain Compromise',
    severity: 'Medium',
    confidence: 76,
    source: 'Intelligence Feed',
    status: 'Monitored',
    description: 'Third-party software supply chain vulnerability detected.',
    riskScore: 72
  },
]

const aiClusteringData = [
  { timeRange: 'Last Hour', clusters: 5, avgSimilarity: 91, threatsAnalyzed: 78 },
  { timeRange: 'Last Day', clusters: 14, avgSimilarity: 85, threatsAnalyzed: 312 },
  { timeRange: 'Last Week', clusters: 42, avgSimilarity: 78, threatsAnalyzed: 2156 },
]

function ThreatIntel() {
  // Real-time threat feed data
  const [realTimeThreats, setRealTimeThreats] = useState([
    {
      id: 1,
      threat: 'Suspicious Login Attempts',
      location: 'Email Service',
      timestamp: new Date().toISOString(),
      severity: 'medium',
      confidence: 82,
      source: 'Behavioral Analytics',
      status: 'active'
    },
    {
      id: 2,
      threat: 'Phishing Email Detected',
      location: 'Global',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      severity: 'high',
      confidence: 91,
      source: 'Email Security',
      status: 'blocked'
    },
    {
      id: 3,
      threat: 'Malware Signature Match',
      location: 'Endpoint',
      timestamp: new Date(Date.now() - 420000).toISOString(),
      severity: 'low',
      confidence: 67,
      source: 'AV Scanner',
      status: 'quarantined'
    }
  ]);

  const [selectedThreat, setSelectedThreat] = useState(null);
  const [threatData, setThreatData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThreatIntel()

    // Simulate real-time threat updates
    const interval = setInterval(() => {
      setRealTimeThreats(prev => {
        const newThreat = {
          id: Date.now(),
          threat: ['Unusual Data Transfer', 'Suspicious API Call', 'Login Anomaly'][Math.floor(Math.random() * 3)],
          location: ['Web Application', 'Database', 'API Gateway'][Math.floor(Math.random() * 3)],
          timestamp: new Date().toISOString(),
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          confidence: Math.floor(Math.random() * 30) + 70,
          source: ['Network IDS', 'Application Logs', 'User Behavior'][Math.floor(Math.random() * 3)],
          status: ['active', 'blocked', 'quarantined'][Math.floor(Math.random() * 3)]
        };
        return [newThreat, ...prev.slice(0, 9)]; // Keep 10 most recent
      });
    }, 15000);

    return () => clearInterval(interval);
  }, [])

  const loadThreatIntel = async () => {
    try {
      const response = await getThreatIntel()
      setThreatData(response.data)
    } catch (error) {
      console.error('Failed to load threat intel:', error)
      setThreatData({
        globalAttacks: [],
        maliciousIps: [],
        darkweb: [],
        summary: 'AI-powered threat intelligence active. Real-time monitoring enabled.'
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading Threat Intelligence Hub...</div>
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
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Threat Intelligence Hub
            </h1>
            <p className="text-slate-400 text-sm">Real-time threat analysis and AI-powered intelligence</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-white">{aiClusteringData[2].threatsAnalyzed.toLocaleString()}</span>
            <span className="text-xs text-slate-400">Analyzed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-white">{criticalIntel.length}</span>
            <span className="text-xs text-slate-400">Critical</span>
          </div>
        </div>
      </motion.div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">

        {/* Attack Vector Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2"
        >
          <GlassCard title="Attack Vector Intelligence" icon={BarChart3}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-4">Threat Categories Analysis</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={threatCategories}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="category"
                    stroke="#9ca3af"
                    angle={-45}
                    textAnchor="end"
                    height={80}
                  />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                    formatter={(value) => [`${value} incidents`, 'Threat Count']}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {threatCategories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="border-t border-slate-700/50 pt-4">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">AI Intelligence Summary</h4>
              <p className="text-slate-300 text-sm">
                📊 Most prevalent threat: Phishing (28 incidents) - primarily targeting user credentials
                through sophisticated social engineering. AI similarity analysis shows 93% pattern matching across vectors.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Threat Clustering Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="AI Threat Clustering" icon={Brain}>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{aiClusteringData[2].clusters}</div>
                <div className="text-slate-400 text-sm">Active Threat Clusters</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Pattern Recognition</span>
                  <span className="text-green-400 font-semibold">{aiClusteringData[2].avgSimilarity}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Behavioral Analysis</span>
                  <span className="text-cyan-400 font-semibold">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Confidence Score</span>
                  <span className="text-yellow-400 font-semibold">91%</span>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <div className="text-xs text-slate-400 mb-2">Last Update</div>
                <div className="text-sm text-cyan-400 font-semibold">Real-time</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Risk Factor Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard title="Personal Risk Assessment" icon={Radar}>
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 text-sm">Overall Risk Level</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  criticalIntel.length > 1 ? 'bg-red-500/20 text-red-400' :
                  criticalIntel.length > 0 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {criticalIntel.length > 1 ? 'High' : criticalIntel.length > 0 ? 'Medium' : 'Low'}
                </span>
              </div>

              {[
                { factor: 'Phishing Exposure', score: 78 },
                { factor: 'Credential Risk', score: 65 },
                { factor: 'Device Security', score: 82 },
                { factor: 'Data Protection', score: 71 }
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
                {criticalIntel.length} active threats monitored
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Critical Threats Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <GlassCard title="Critical Intelligence Analysis" icon={Target}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {criticalIntel.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`p-4 rounded-lg border-l-4 cursor-pointer hover:scale-102 transition-all ${threat.severity === 'Critical' ? 'border-l-red-500 bg-red-500/5' : threat.severity === 'High' ? 'border-l-yellow-500 bg-yellow-500/5' : 'border-l-blue-500 bg-blue-500/5'}`}
                onClick={() => setSelectedThreat(threat)}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="text-white font-semibold mb-1">{threat.threat}</div>
                    <p className="text-slate-300 text-sm">{threat.description}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="text-sm text-slate-400">
                    <span className="font-medium">Source:</span> {threat.source}
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-400">{threat.confidence}%</div>
                    <div className="text-xs text-slate-500">Confidence</div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Risk Score</span>
                    <span>{threat.riskScore}/100</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full" style={{ width: `${threat.riskScore}%` }}></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Real-time Threat Feed & AI Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Live Threat Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="Real-time Threat Feed" icon={Activity}>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {realTimeThreats.map((threat, index) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${threat.severity === 'high' ? 'border-l-red-500 bg-red-500/5' : threat.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-500/5' : 'border-l-blue-500 bg-blue-500/5'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium text-sm">{threat.threat}</span>
                    <span className={`text-xs px-2 py-1 rounded ${threat.severity === 'high' ? 'bg-red-500/20 text-red-400' : threat.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {threat.severity}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{threat.location}</span>
                    <span>{threat.confidence}% confidence</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500 mt-1">
                    <span>{threat.source}</span>
                    <span>{new Date(threat.timestamp).toLocaleTimeString()}</span>
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
          <GlassCard title="AI Clustering Trends" icon={TrendingUp}>
            <div className="mb-4">
              <h4 className="text-lg font-semibold text-white mb-3">Cluster Evolution Over Time</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={aiClusteringData}>
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
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xl font-bold text-cyan-400">{aiClusteringData[2].avgSimilarity}%</div>
                    <div className="text-xs text-slate-400">Similarity Score</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xl font-bold text-purple-400">{aiClusteringData[2].clusters}</div>
                    <div className="text-xs text-slate-400">Total Clusters</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">AI Processing Status</h4>
                <div className="space-y-1 text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Threat Analysis:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Pattern Clustering:</span>
                    <span className="text-green-400">89% Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Assessment:</span>
                    <span className="text-cyan-400">Continuous</span>
                  </div>
                </div>
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
            <h2 className="text-xl font-bold text-white">AI Threat Intelligence Summary</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Personal Threat Analysis:</strong> AI threat clustering detected {aiClusteringData[2].clusters} distinct threat patterns in the past week, showing {aiClusteringData[2].avgSimilarity}% similarity to known attack campaigns. Current risk assessment identifies phishing as the primary vector with 28 confirmed incidents. Real-time monitoring shows {realTimeThreats.length} active threats with automated containment strategies active.
                </p>
                <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400">
                  <span>• Pattern Recognition: {aiClusteringData[2].avgSimilarity}%</span>
                  <span>• Active Monitoring: Continuous</span>
                  <span>• Mitigation Status: Automated</span>
                  <span>• Intelligence Feed: Live Updates</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  )
}

export default ThreatIntel
