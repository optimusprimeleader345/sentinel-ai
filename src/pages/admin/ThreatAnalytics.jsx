import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Target,
  Radar,
  BarChart3,
  TrendingUp,
  Shield,
  Eye,
  Cpu,
  Network,
  Zap,
  Brain,
  Activity,
  Clock,
  Globe,
  MessageSquare,
  Settings,
  Play,
  Pause,
  Zap as Lightning,
  RefreshCw,
  TrendingDown,
  Wifi,
  Server,
  Users,
  Database,
  Code,
  Bug,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Minimize2,
  Maximize2,
  X,
  MapPin,
  Bell
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
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
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';

// Extended threat analytics data
const threatCategories = [
  { category: 'Malware', count: 45, severity: 'high', color: '#ef4444' },
  { category: 'Phishing', count: 38, severity: 'medium', color: '#f59e0b' },
  { category: 'DDoS Attack', count: 29, severity: 'high', color: '#ec4899' },
  { category: 'Ransomware', count: 22, severity: 'critical', color: '#8b5cf6' },
  { category: 'Zero Day', count: 15, severity: 'critical', color: '#06b6d4' },
  { category: 'Insider Threat', count: 8, severity: 'high', color: '#10b981' },
];

const criticalThreats = [
  {
    id: 1,
    threat: 'APT29 Malware Dropper',
    severity: 'Critical',
    confidence: 92,
    cluster: 'Russian APT',
    status: 'Active',
    description: 'Sophisticated state-sponsored malware targeting government infrastructure.',
    riskScore: 95
  },
  {
    id: 2,
    threat: 'DarkBanker Trojan',
    severity: 'High',
    confidence: 87,
    cluster: 'Financial Malware',
    status: 'Quarantined',
    description: 'Banking credential stealer with keylogger capabilities.',
    riskScore: 85
  },
  {
    id: 3,
    threat: 'RazorBear Ransomware',
    severity: 85,
    confidence: 85,
    cluster: 'Russian Ransomware',
    status: 'Contained',
    description: 'Double-extortion ransomware targeting critical infrastructure.',
    riskScore: 82
  },
];

const riskFactors = [
  { factor: 'Network Exposure', score: 85, fullMark: 100 },
  { factor: 'User Awareness', score: 72, fullMark: 100 },
  { factor: 'Patch Compliance', score: 68, fullMark: 100 },
  { factor: 'Authentication Strength', score: 89, fullMark: 100 },
  { factor: 'Data Encryption', score: 76, fullMark: 100 },
  { factor: 'Backup Integrity', score: 82, fullMark: 100 },
];

const aiClusteringData = [
  { timeRange: 'Last Hour', clusters: 8, avgSimilarity: 94, threatsAnalyzed: 127 },
  { timeRange: 'Last Day', clusters: 23, avgSimilarity: 87, threatsAnalyzed: 1564 },
  { timeRange: 'Last Week', clusters: 67, avgSimilarity: 79, threatsAnalyzed: 8921 },
  { timeRange: 'Last Month', clusters: 189, avgSimilarity: 72, threatsAnalyzed: 34728 },
];



const ThreatAnalytics = () => {
  // Real-time threat feed data
  const [realTimeThreats, setRealTimeThreats] = useState([
    {
      id: 1,
      threat: 'Suspicious SSH Login Attempts',
      location: '192.168.1.100',
      timestamp: new Date().toISOString(),
      severity: 'medium',
      confidence: 87,
      source: 'Network IDS',
      status: 'active'
    },
    {
      id: 2,
      threat: 'Phishing Email Campaign',
      location: 'Global',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      severity: 'high',
      confidence: 94,
      source: 'Email Gateway',
      status: 'contained'
    },
    {
      id: 3,
      threat: 'Anomalous Data Transfer',
      location: 'Database Server',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      severity: 'low',
      confidence: 76,
      source: 'Behavior Analytics',
      status: 'monitoring'
    }
  ]);

  // AI Response Engine data
  const [aiResponses, setAiResponses] = useState([
    {
      id: 1,
      type: 'Automated Containment',
      action: 'Network Isolation',
      target: 'Compromised Endpoint',
      confidence: 98,
      status: 'executing',
      timestamp: new Date().toISOString()
    },
    {
      id: 2,
      type: 'Threat Hunting',
      action: 'Pattern Analysis',
      target: 'Similar Indicators',
      confidence: 92,
      status: 'completed',
      timestamp: new Date(Date.now() - 120000).toISOString()
    }
  ]);

  // Behavioral Analytics data
  const [behavioralData, setBehavioralData] = useState({
    anomalies: [
      { user: 'john.doe', score: 89, activity: 'Late night access', risk: 'medium', time: '22:45' },
      { user: 'jane.smith', score: 76, activity: 'Unusual file transfer', risk: 'low', time: '14:20' },
      { user: 'admin.user', score: 95, activity: 'Elevated privileges', risk: 'high', time: '23:15' }
    ],
    patterns: [
      { pattern: 'Ransomware Indicators', instances: 3, trend: 'increasing', confidence: 88 },
      { pattern: 'DDoS Precursor', instances: 7, trend: 'stable', confidence: 76 },
      { pattern: 'Data Exfiltration', instances: 12, trend: 'decreasing', confidence: 91 }
    ]
  });

  // Real-time attack patterns (simulated)
  const [attackPatterns, setAttackPatterns] = useState([
    {
      id: 'PATTERN-001',
      name: 'Zero-Day Exploit Chain',
      confidence: 89,
      timeline: ['Recon', 'Initial Access', 'Privilege Escalation', 'Lateral Movement'],
      currentStage: 2,
      predictedNextStage: 'Privilege Escalation',
      mitigation: 'Patch deployment initiated',
      risk: 'critical'
    },
    {
      id: 'PATTERN-002',
      name: 'Phishing Campaign Evolution',
      confidence: 76,
      timeline: ['Email Distribution', 'Link Clicks', 'Credentials Harvested', 'Internal Recon'],
      currentStage: 3,
      predictedNextStage: 'Data Exfiltration',
      mitigation: 'Multi-factor authentication enforcement',
      risk: 'high'
    }
  ]);

  // Global threat map data (simulated)
  const [threatMapData, setThreatMapData] = useState([
    { country: 'US', attacks: 1247, severity: 'high', coordinates: [37.7749, -122.4194] },
    { country: 'CN', attacks: 892, severity: 'medium', coordinates: [39.9042, 116.4074] },
    { country: 'RU', attacks: 654, severity: 'critical', coordinates: [55.7558, 37.6176] },
    { country: 'IN', attacks: 432, severity: 'medium', coordinates: [28.6353, 77.2250] },
    { country: 'GB', attacks: 321, severity: 'low', coordinates: [51.5074, -0.1278] }
  ]);

  const [selectedThreat, setSelectedThreat] = useState(null);
  const [showAIAnalysis, setShowAIAnalysis] = useState(true);

  const ThreatCard = ({ threat, index }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`p-4 rounded-lg border-l-4 cursor-pointer transition-all hover:scale-102 ${
        threat.severity === 'Critical' ? 'border-l-red-500 bg-red-500/5'
        : threat.severity === 'High' ? 'border-l-yellow-500 bg-yellow-500/5'
        : 'border-l-blue-500 bg-blue-500/5'
      }`}
      onClick={() => setSelectedThreat(threat)}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <span className="font-semibold text-white">{threat.threat}</span>
            <span className={`px-2 py-0.5 rounded text-xs font-bold ${
              threat.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
              threat.severity === 'High' ? 'bg-yellow-500/20 text-yellow-400' :
              'bg-blue-500/20 text-blue-400'
            }`}>
              {threat.severity}
            </span>
          </div>
          <p className="text-sm text-slate-300">{threat.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-slate-400">
          <span className="font-medium">Cluster:</span> {threat.cluster}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-cyan-400">{threat.confidence}%</div>
          <div className="text-xs text-slate-500">AI Confidence</div>
        </div>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>Risk Score</span>
          <span>{threat.riskScore}/100</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-1.5">
          <div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full"
            style={{ width: `${threat.riskScore}%` }}
          ></div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-red-500 to-pink-500 rounded-lg shadow-lg">
            <Target className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Threat Analytics Dashboard
            </h1>
            <p className="text-slate-400 text-sm">Deep Intelligence & AI-Powered Threat Analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">{aiClusteringData.reduce((sum, item) => sum + item.threatsAnalyzed, 0).toLocaleString()}</span>
            <span className="text-xs text-slate-400">Threats Analyzed</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-semibold text-white">{aiClusteringData[3].clusters}</span>
            <span className="text-xs text-slate-400">AI Clusters</span>
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
                📊 Most prevalent threat: Malware (45 incidents) - primarily targeting employee workstations
                through phishing campaigns. AI clustering shows 94% behavioral similarity patterns.
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* Risk Factor Assessment */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Enterprise Risk Assessment" icon={Radar}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-4">Risk Factor Analysis</h3>
              <div className="space-y-4">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm font-medium">{factor.factor}</span>
                      <span className={`text-sm font-bold ${
                        factor.score >= 80 ? 'text-red-400' :
                        factor.score >= 60 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {factor.score}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full transition-all duration-1000 ${
                          factor.score >= 80 ? 'bg-gradient-to-r from-red-500 to-red-400' :
                          factor.score >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-400' :
                          'bg-gradient-to-r from-green-500 to-blue-400'
                        }`}
                        style={{
                          width: `${factor.score}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-4">
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Critical Areas:</span>
                  <span className="text-red-400 font-semibold">Network Exposure</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Strongest Area:</span>
                  <span className="text-green-400 font-semibold">Authentication</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-300">Average Risk:</span>
                  <span className="text-cyan-400 font-semibold">76%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Clustering Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard title="AI Threat Clustering" icon={Brain}>
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">{aiClusteringData[3].clusters}</div>
                <div className="text-slate-400 text-sm">Active Threat Clusters</div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Pattern Recognition</span>
                  <span className="text-green-400 font-semibold">94%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Behavioral Analysis</span>
                  <span className="text-cyan-400 font-semibold">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300 text-sm">Base Score</span>
                  <span className="text-yellow-400 font-semibold">72%</span>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4">
                <div className="text-xs text-slate-400 mb-2">Last Update</div>
                <div className="text-sm text-cyan-400 font-semibold">2 minutes ago</div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Critical Threats Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <GlassCard title="Top Critical Threats" icon={AlertTriangle}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {criticalThreats.map((threat, index) => (
              <ThreatCard key={threat.id} threat={threat} index={index} />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Analysis Panel - Conditional based on selection */}
      {selectedThreat ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <GlassCard title={`AI Analysis: ${selectedThreat.threat}`} icon={Brain}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Threat Categorization</h4>
                  <p className="text-slate-300 text-sm">
                    AI has classified this threat as <strong className="text-red-400">{selectedThreat.severity.toLowerCase()}</strong>
                    with {selectedThreat.confidence}% confidence. Similar threats have been grouped in the "{selectedThreat.cluster}" cluster
                    showing patterns consistent with advanced persistent threat (APT) behavior.
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Behavioral Analysis</h4>
                  <p className="text-slate-300 text-sm">
                    This threat exhibits sophisticated evasion techniques and lateral movement patterns.
                    AI correlation analysis shows {Math.floor(selectedThreat.confidence * 0.8)}% similarity
                    with previously identified attack campaigns targeting similar industry sectors.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-white mb-3">Risk Mitigation Scores</h4>

                  <div className="space-y-2">
                    {[
                      { label: 'Containment Success', score: 78 },
                      { label: 'Data Protection', score: selectedThreat.riskScore },
                      { label: 'Network Isolation', score: 82 },
                      { label: 'Recovery Success', score: 91 }
                    ].map((metric, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">{metric.label}</span>
                        <span className="text-white font-bold">{metric.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Recommended Actions</h4>
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Zap className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Implement immediate network segmentation for affected endpoints
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Shield className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Deploy targeted malware signatures to all network devices
                      </span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Eye className="w-4 h-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300 text-sm">
                        Enable enhanced AI monitoring for similar attack patterns
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6 border-t border-slate-700/50 pt-4">
              <button
                onClick={() => setSelectedThreat(null)}
                className="px-4 py-2 bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 rounded-lg transition-colors"
              >
                Close Analysis
              </button>
            </div>
          </GlassCard>
        </motion.div>
      ) : showAIAnalysis && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Brain className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">AI Threat Intelligence Summary</h2>
              </div>
              <button
                onClick={() => setShowAIAnalysis(false)}
                className="text-slate-400 hover:text-slate-300 text-sm"
              >
                Hide
              </button>
            </div>
            <div className="bg-slate-800/50 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-slate-300 leading-relaxed">
                    <strong>AI Analysis:</strong> Recent threat patterns show a concerning convergence of multiple attack vectors.
                    The {aiClusteringData[3].clusters} identified clusters exhibit sophisticated coordination,
                    suggesting organized attacker campaigns rather than opportunistic attacks. Historical pattern analysis
                    indicates a 78% increase in similar clustering behavior compared to baseline operations.
                  </p>
                  <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400">
                    <span>• Pattern Confidence: 91%</span>
                    <span>• Cluster Similarity: 87%</span>
                    <span>• Anomaly Score: 94/100</span>
                    <span>• Next Review: Auto-updating</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Clustering Analysis Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard title="AI Clustering Trends" icon={TrendingUp}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Cluster Evolution Over Time</h3>
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

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Current AI Metrics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-cyan-400">{aiClusteringData[3].avgSimilarity}%</div>
                    <div className="text-xs text-slate-400">Avg Similarity</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                    <div className="text-2xl font-bold text-purple-400">{aiClusteringData[3].clusters}</div>
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
                    <span className="text-green-400">92% Complete</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Risk Assessment:</span>
                    <span className="text-cyan-400">Updating</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Advanced Real-time Features Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Live Threat Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="Live Threat Intelligence Feed" icon={Activity}>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {realTimeThreats.map((threat, index) => (
                <motion.div
                  key={threat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    threat.severity === 'high' ? 'border-l-red-500 bg-red-500/5'
                    : threat.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-500/5'
                    : 'border-l-blue-500 bg-blue-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium text-sm">{threat.threat}</span>
                    <span className={`text-xs px-2 py-1 rounded ${
                      threat.severity === 'high' ? 'bg-red-500/20 text-red-400'
                      : threat.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                    }`}>
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

        {/* AI Response Engine */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="AI Response Engine" icon={Zap}>
            <div className="space-y-4">
              {aiResponses.map((response, index) => (
                <motion.div
                  key={response.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="text-white font-medium text-sm">{response.type}</div>
                      <div className="text-slate-400 text-xs">{response.action}</div>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      response.status === 'executing' ? 'bg-blue-500/20 text-blue-400'
                      : response.status === 'completed' ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {response.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>{response.target}</span>
                    <span>{response.confidence}% success rate</span>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="text-green-400">
                  <div className="text-lg font-bold">98%</div>
                  <div className="text-xs text-slate-400">Success Rate</div>
                </div>
                <div className="text-blue-400">
                  <div className="text-lg font-bold">{aiResponses.filter(r => r.status === 'executing').length}</div>
                  <div className="text-xs text-slate-400">Active</div>
                </div>
                <div className="text-purple-400">
                  <div className="text-lg font-bold">{aiResponses.length}</div>
                  <div className="text-xs text-slate-400">Total</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Behavioral Analytics */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard title="Behavioral Anomaly Detection" icon={Users}>
            <div className="space-y-4">
              {/* Anomalous Users */}
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-slate-300 text-sm">User Anomalies</span>
                  <span className="text-orange-400 text-sm">{behavioralData.anomalies.length}</span>
                </div>
                <div className="space-y-2">
                  {behavioralData.anomalies.slice(0, 3).map((anomaly, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">{anomaly.user}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          anomaly.risk === 'high' ? 'bg-red-500/20 text-red-400'
                          : anomaly.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {anomaly.score}%
                        </span>
                        <span className="text-xs text-slate-500">{anomaly.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Threat Patterns */}
              <div className="border-t border-slate-700/50 pt-4">
                <span className="text-slate-300 text-sm mb-2 block">Detected Patterns</span>
                <div className="space-y-2">
                  {behavioralData.patterns.map((pattern, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">{pattern.pattern}</span>
                      <div className="flex items-center space-x-2">
                        <TrendingUp className={`w-3 h-3 ${
                          pattern.trend === 'increasing' ? 'text-red-400'
                          : pattern.trend === 'decreasing' ? 'text-green-400'
                          : 'text-yellow-400'
                        }`} />
                        <span className="text-slate-400 text-xs">{pattern.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Attack Pattern Recognition & Global Threat Map */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Attack Pattern Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="Real-time Attack Pattern Recognition" icon={Target}>
            <div className="space-y-4">
              {attackPatterns.map((pattern, index) => (
                <motion.div
                  key={pattern.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`border-l-4 p-4 rounded-lg ${
                    pattern.risk === 'critical' ? 'border-l-red-500 bg-red-500/5'
                    : pattern.risk === 'high' ? 'border-l-orange-500 bg-orange-500/5'
                    : 'border-l-yellow-500 bg-yellow-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-white font-semibold">{pattern.name}</h4>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-1 rounded ${
                        pattern.risk === 'critical' ? 'bg-red-500/20 text-red-400'
                        : pattern.risk === 'high' ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {pattern.risk}
                      </span>
                      <div className="text-xs text-slate-400 mt-1">{pattern.confidence}% confidence</div>
                    </div>
                  </div>

                  {/* Attack Timeline */}
                  <div className="mb-3">
                    <div className="flex items-center space-x-1 mb-2">
                      {pattern.timeline.map((stage, idx) => (
                        <React.Fragment key={stage}>
                          <div
                            className={`w-3 h-3 rounded-full ${
                              idx <= pattern.currentStage ? 'bg-red-400' :
                              idx === pattern.currentStage + 1 ? 'bg-orange-400 animate-pulse' :
                              'bg-slate-600'
                            }`}
                          ></div>
                          {idx < pattern.timeline.length - 1 && (
                            <div
                              className={`h-0.5 w-8 ${
                                idx < pattern.currentStage ? 'bg-red-400' : 'bg-slate-600'
                              }`}
                            ></div>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                    <div className="text-xs text-slate-400">
                      Current: <span className="text-red-400">{pattern.timeline[pattern.currentStage]}</span> →
                      Predicted: <span className="text-orange-400">{pattern.predictedNextStage}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    Mitigation: <span className="text-green-400">{pattern.mitigation}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Global Threat Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Global Threat Distribution Map" icon={Globe}>
            <div className="relative h-80 bg-slate-900 rounded-lg overflow-hidden">
              {/* Simulated World Map Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="absolute inset-0 opacity-20">
                  {/* Simplified world map representation */}
                  <svg viewBox="0 0 800 400" className="w-full h-full">
                    <defs>
                      <radialGradient id="earthGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#0f172a" />
                      </radialGradient>
                    </defs>
                    <circle cx="400" cy="200" r="180" fill="url(#earthGradient)" stroke="#334155" strokeWidth="2"/>
                  </svg>
                </div>
              </div>

              {/* Threat Points */}
              {threatMapData.map((threat, index) => (
                <motion.div
                  key={threat.country}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1, type: "spring", stiffness: 260, damping: 20 }}
                  className="absolute"
                  style={{
                    left: `${threat.coordinates[1] * 0.1 + 20}%`,
                    top: `${threat.coordinates[0] * 0.05 + 20}%`
                  }}
                >
                  <div className="relative group">
                    <div
                      className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 hover:scale-125 ${
                        threat.severity === 'critical' ? 'bg-red-500 shadow-red-500/50'
                        : threat.severity === 'high' ? 'bg-orange-500 shadow-orange-500/50'
                        : 'bg-yellow-500 shadow-yellow-500/50'
                      } shadow-lg animate-pulse`}
                      style={{
                        boxShadow: threat.severity === 'critical'
                          ? '0 0 20px rgba(239, 68, 68, 0.5)'
                          : threat.severity === 'high'
                          ? '0 0 20px rgba(249, 115, 22, 0.5)'
                          : '0 0 20px rgba(234, 179, 8, 0.5)'
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/20 animate-ping"></div>
                    </div>

                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                      <div className="font-semibold">{threat.country}</div>
                      <div className="text-slate-300">{threat.attacks} attacks</div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/50 rounded-lg p-3 backdrop-blur">
                <div className="text-xs text-slate-300 mb-2 font-semibold">Threat Levels</div>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-xs text-slate-400">Critical</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span className="text-xs text-slate-400">High</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-slate-400">Medium</span>
                  </div>
                </div>
              </div>

              {/* Real-time Stats */}
              <div className="absolute top-4 right-4 bg-black/50 rounded-lg p-3 backdrop-blur">
                <div className="text-xs text-cyan-400 font-semibold mb-1">Live Updates</div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-slate-300">Active Monitoring</span>
                </div>
              </div>
            </div>

            {/* Threat Statistics */}
            <div className="mt-4 grid grid-cols-5 gap-4">
              {threatMapData.map((threat, index) => (
                <div key={threat.country} className="text-center">
                  <div className={`text-lg font-bold ${
                    threat.severity === 'critical' ? 'text-red-400'
                    : threat.severity === 'high' ? 'text-orange-400'
                    : 'text-yellow-400'
                  }`}>
                    {threat.attacks}
                  </div>
                  <div className="text-xs text-slate-400">{threat.country}</div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Security Event Correlation Engine */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard title="Real-time Security Event Correlation" icon={Network}>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Correlation Metrics */}
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">1,247</div>
                <div className="text-slate-400 text-sm">Events Correlated</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Correlation Rate:</span>
                  <span className="text-green-400 font-semibold">96.3%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">False Positives:</span>
                  <span className="text-blue-400 font-semibold">2.7%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300">Processing Speed:</span>
                  <span className="text-purple-400 font-semibold">45ms</span>
                </div>
              </div>
            </div>

            {/* Event Chains */}
            <div className="col-span-2">
              <h4 className="text-lg font-semibold text-white mb-4">Active Event Correlations</h4>
              <div className="space-y-3">
                {[
                  {
                    chain: "Phishing → Credential Harvest → Lateral Movement",
                    confidence: 89,
                    risk: "Critical",
                    affected: ["Email Server", "Domain Controller", "Workstation"],
                    timeline: "12:34 → 12:36 → 12:42"
                  },
                  {
                    chain: "Port Scan → Vulnerability Exploit → Data Exfiltration",
                    confidence: 76,
                    risk: "High",
                    affected: ["Web Server", "Database"],
                    timeline: "11:45 → 11:52 → 12:01"
                  }
                ].map((correlation, index) => (
                  <div key={index} className={`p-4 rounded-lg border-l-4 ${
                    correlation.risk === 'Critical' ? 'border-l-red-500 bg-red-500/5'
                    : 'border-l-orange-500 bg-orange-500/5'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white font-medium text-sm">{correlation.chain}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          correlation.risk === 'Critical' ? 'bg-red-500/20 text-red-400'
                          : 'bg-orange-500/20 text-orange-400'
                        }`}>
                          {correlation.risk}
                        </span>
                        <span className="text-cyan-400 text-xs">{correlation.confidence}%</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {correlation.affected.map((item, idx) => (
                        <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-slate-500">{correlation.timeline}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Real-time Processing */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Engine Status</h4>
              <div className="space-y-3">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-sm text-slate-300 mb-2">Event Processing</div>
                  <div className="flex items-center space-x-2">
                    <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Processing 342 EPS</div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-sm text-slate-300 mb-2">Correlation Engine</div>
                  <div className="flex items-center space-x-2">
                    <Brain className="w-4 h-4 text-purple-400 animate-pulse" />
                    <span className="text-purple-400 text-sm">Learning</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">16 active rules</div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-sm text-slate-300 mb-2">Alert Generation</div>
                  <div className="flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-yellow-400" />
                    <span className="text-yellow-400 text-sm">3 alerts</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">Last: 2 min ago</div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  );
};

export default ThreatAnalytics;
