import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  Scan,
  Mail,
  FileText,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  BookOpen,
  Star,
  Clock,
  User,
  Settings,
  Bell,
  Award,
  Heart,
  Home,
  Lock,
  Search,
  Activity,
  Calendar,
  Target,
  BarChart3,
  PieChart,
  LineChart,
  TrendingDown,
  AlertTriangle,
  DollarSign,
  Users,
  Server,
  Cloud,
  Database,
  Wifi,
  Zap,
  Eye,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Cpu,
  HardDrive,
  Network,
  Key,
  Fingerprint,
  Layers,
  GitBranch,
  Workflow,
  Gauge,
  Timer,
  Crosshair,
  Radar,
  MapPin,
  Navigation,
  Lightbulb
} from 'lucide-react'
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend,
  ScatterChart,
  Scatter
} from 'recharts'

function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('24h')

  // Real enterprise data
  const [metrics, setMetrics] = useState({
    totalAssets: 15420,
    activeThreats: 23,
    complianceScore: 94.2,
    mttr: '2.4h',
    roi: 342,
    incidentsToday: 8,
    falsePositives: 2.1,
    uptime: 99.98
  })

  // Chart data
  const threatTrendData = [
    { time: '00:00', threats: 2, criticalAlerts: 0 },
    { time: '04:00', threats: 5, criticalAlerts: 1 },
    { time: '08:00', threats: 12, criticalAlerts: 2 },
    { time: '12:00', threats: 8, criticalAlerts: 1 },
    { time: '16:00', threats: 15, criticalAlerts: 3 },
    { time: '20:00', threats: 7, criticalAlerts: 1 },
    { time: 'Now', threats: 9, criticalAlerts: 2 },
  ]

  const attackVectorsData = [
    { name: 'Malware', value: 35, color: '#ef4444' },
    { name: 'Phishing', value: 28, color: '#f59e0b' },
    { name: 'DDoS', value: 18, color: '#3b82f6' },
    { name: 'Ransomware', value: 12, color: '#8b5cf6' },
    { name: 'Zero Day', value: 7, color: '#06b6d4' },
  ]

  const predictionData = [
    { type: 'Phishing Campaign', likelihood: 85, timeframe: '24h', confidence: 'High' },
    { type: 'Ransomware Attack', likelihood: 72, timeframe: '48h', confidence: 'Medium' },
    { type: 'Insider Threat', likelihood: 63, timeframe: '72h', confidence: 'Medium' },
    { type: 'Supply Chain Compromise', likelihood: 45, timeframe: '7d', confidence: 'Low' },
  ]

  const aiInsights = [
    {
      title: "Automated Response Activated",
      description: "Successfully mitigated potential ransomware attack targeting HR systems",
      time: "2 hours ago",
      type: "success"
    },
    {
      title: "New Threat Pattern Detected",
      description: "AI clustered 5 similar phishing attempts with 94% similarity confidence",
      time: "4 hours ago",
      type: "warning"
    },
    {
      title: "System Optimization Applied",
      description: "Reallocated 30% more resources to high-traffic endpoints based on usage patterns",
      time: "6 hours ago",
      type: "info"
    },
  ]

  // Real-time updates simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        ...prev,
        activeThreats: Math.max(0, prev.activeThreats + (Math.random() > 0.7 ? 1 : Math.random() > 0.8 ? -1 : 0)),
        incidentsToday: prev.incidentsToday + (Math.random() > 0.95 ? 1 : 0)
      }))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: 'overview', label: 'Executive Overview', icon: BarChart3 },
    { id: 'threats', label: 'Threat Intelligence', icon: Radar },
    { id: 'compliance', label: 'Compliance Center', icon: Shield },
    { id: 'analytics', label: 'Business Analytics', icon: TrendingUp },
    { id: 'operations', label: 'SOC Operations', icon: Monitor }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0b1129] to-[#0a0e27] p-6">
      {/* Enterprise Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SentinelAI Enterprise Command Center
            </h1>
            <p className="text-slate-400 text-sm">Advanced Cybersecurity Operations & Analytics Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Live Status Indicators */}
          <div className="flex items-center space-x-6">
            <motion.div
              animate={{ scale: metrics.activeThreats > 10 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, repeat: metrics.activeThreats > 10 ? Infinity : 0 }}
              className="flex items-center space-x-2 px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/30"
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">{metrics.activeThreats}</span>
              <span className="text-xs text-slate-400">Active Threats</span>
            </motion.div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <Gauge className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">{metrics.complianceScore}%</span>
              <span className="text-xs text-slate-400">Security Score</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-1 text-slate-300 text-sm focus:outline-none focus:border-cyan-400"
            >
              <option value="1h">Last Hour</option>
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <div className="bg-slate-900/50 border-b border-slate-700/50 mb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-4 border-b-2 transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-400'
                      : 'border-transparent text-slate-400 hover:text-cyan-300 hover:border-cyan-300/50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && <ExecutiveOverview metrics={metrics} threatTrendData={threatTrendData} attackVectorsData={attackVectorsData} />}
          {activeTab === 'threats' && <ThreatIntelligence metrics={metrics} threatTrendData={threatTrendData} attackVectorsData={attackVectorsData} />}
          {activeTab === 'compliance' && <ComplianceCenter metrics={metrics} />}
          {activeTab === 'analytics' && <BusinessAnalytics metrics={metrics} predictionData={predictionData} />}
          {activeTab === 'operations' && <SOCOperations metrics={metrics} aiInsights={aiInsights} />}
        </AnimatePresence>
      </div>
    </div>
  )
}

// Glass Card Component (matching admin theme)
const GlassCard = ({ children, className = "", title, icon: Icon }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl">
      {(title || Icon) && (
        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-700/50">
          {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
          {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
        </div>
      )}
      {children}
    </div>
  </div>
)

// AI Insights Card Component
const AISummaryCard = ({ insight }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-4 rounded-lg border-l-4 ${
      insight.type === 'success' ? 'border-l-green-500 bg-green-500/10'
      : insight.type === 'warning' ? 'border-l-yellow-500 bg-yellow-500/10'
      : 'border-l-blue-500 bg-blue-500/10'
    }`}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
        <p className="text-slate-300 text-sm">{insight.description}</p>
      </div>
      <span className="text-xs text-slate-500">{insight.time}</span>
    </div>
  </motion.div>
)

// Executive Overview Component
function ExecutiveOverview({ metrics, threatTrendData, attackVectorsData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Critical KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)" }}
          className="bg-gradient-to-br from-green-900/50 to-green-800/50 p-6 rounded-xl border border-green-500/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">Security Score</p>
              <p className="text-3xl font-bold text-white">{metrics.complianceScore}%</p>
              <p className="text-green-300 text-sm mt-1">+2.1% from last month</p>
            </div>
            <Gauge className="w-12 h-12 text-green-400" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(239, 68, 68, 0.2)" }}
          className="bg-gradient-to-br from-red-900/50 to-red-800/50 p-6 rounded-xl border border-red-500/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-400 text-sm font-medium">Active Threats</p>
              <p className="text-3xl font-bold text-white">{metrics.activeThreats}</p>
              <p className="text-red-300 text-sm mt-1">-3 from yesterday</p>
            </div>
            <AlertTriangle className="w-12 h-12 text-red-400" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(168, 85, 247, 0.2)" }}
          className="bg-gradient-to-br from-purple-900/50 to-purple-800/50 p-6 rounded-xl border border-purple-500/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-400 text-sm font-medium">MTTR</p>
              <p className="text-3xl font-bold text-white">{metrics.mttr}</p>
              <p className="text-purple-300 text-sm mt-1">-12min improvement</p>
            </div>
            <Timer className="w-12 h-12 text-purple-400" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(34, 197, 94, 0.2)" }}
          className="bg-gradient-to-br from-cyan-900/50 to-cyan-800/50 p-6 rounded-xl border border-cyan-500/30 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-cyan-400 text-sm font-medium">ROI</p>
              <p className="text-3xl font-bold text-white">{metrics.roi}%</p>
              <p className="text-cyan-300 text-sm mt-1">Security Investment</p>
            </div>
            <DollarSign className="w-12 h-12 text-cyan-400" />
          </div>
        </motion.div>
      </div>

      {/* Executive Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Threat Trend Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard title="Threat Activity Timeline" icon={Activity}>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={threatTrendData}>
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
                <Area dataKey="threats" stroke="#ef4444" fill="url(#threatGradient)" />
                <Area dataKey="criticalAlerts" stroke="#dc2626" fill="url(#alertGradient)" />
                <defs>
                  <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Attack Vectors */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <GlassCard title="Attack Vector Distribution" icon={PieChart}>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={attackVectorsData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {attackVectorsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </RechartsPieChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Insights Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <GlassCard title="AI Intelligence Summary" icon={Lightbulb}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
              <div className="text-purple-300 font-semibold">15 threats clustered</div>
              <div className="text-slate-400">Similar patterns grouped by AI</div>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
              <div className="text-blue-300 font-semibold">Next likely attack: Phishing</div>
              <div className="text-slate-400">82% confidence score</div>
            </div>
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <div className="text-cyan-300 font-semibold">Risk score: 68/100</div>
              <div className="text-slate-400">Real-time AI assessment</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}

// Threat Intelligence Component
function ThreatIntelligence({ metrics }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedThreat, setSelectedThreat] = useState(null)
  const [threatClusters, setThreatClusters] = useState([
    { id: 1, name: 'APT-41 Campaign', threats: 8, severity: 'Critical', confidence: 94, lastSeen: '2 min ago' },
    { id: 2, name: 'Ransomware Cluster', threats: 12, severity: 'High', confidence: 87, lastSeen: '15 min ago' },
    { id: 3, name: 'Phishing Wave', threats: 25, severity: 'Medium', confidence: 76, lastSeen: '1 hour ago' }
  ])

  const [globalThreats, setGlobalThreats] = useState([
    { country: 'China', threats: 145, severity: 'Critical' },
    { country: 'Russia', threats: 98, severity: 'High' },
    { country: 'North Korea', threats: 67, severity: 'Critical' },
    { country: 'Iran', threats: 43, severity: 'High' },
    { country: 'USA', threats: 156, severity: 'Medium' }
  ])

  const [advancedThreats, setAdvancedThreats] = useState([
    {
      id: 1,
      type: 'APT-41',
      mitreTactic: 'Initial Access',
      severity: 'Critical',
      source: 'State Actor',
      target: 'Financial Systems',
      status: 'Active',
      time: '2 min ago',
      confidence: 96,
      impact: 'High',
      description: 'Advanced persistent threat using zero-day exploits targeting banking infrastructure'
    },
    {
      id: 2,
      type: 'Ryuk Ransomware',
      mitreTactic: 'Impact',
      severity: 'High',
      source: 'Criminal Group',
      target: 'Executive Devices',
      status: 'Blocked',
      time: '15 min ago',
      confidence: 89,
      impact: 'Medium',
      description: 'File-encrypting ransomware with double extortion tactics'
    },
    {
      id: 3,
      type: 'SolarWinds-like',
      mitreTactic: 'Execution',
      severity: 'Critical',
      source: 'Nation-State',
      target: 'Supply Chain',
      status: 'Investigating',
      time: '1 hour ago',
      confidence: 78,
      impact: 'Critical',
      description: 'Supply chain compromise affecting multiple enterprise networks'
    },
    {
      id: 4,
      type: 'BEC Attack',
      mitreTactic: 'Credential Access',
      severity: 'High',
      source: 'Organized Crime',
      target: 'Finance Department',
      status: 'Mitigated',
      time: '3 hours ago',
      confidence: 92,
      impact: 'High',
      description: 'Business email compromise targeting executive wire transfers'
    }
  ])

  const filters = [
    { id: 'all', label: 'All Threats', count: advancedThreats.length, color: 'cyan' },
    { id: 'critical', label: 'Critical', count: advancedThreats.filter(t => t.severity === 'Critical').length, color: 'red' },
    { id: 'high', label: 'High', count: advancedThreats.filter(t => t.severity === 'High').length, color: 'orange' },
    { id: 'medium', label: 'Medium', count: advancedThreats.filter(t => t.severity === 'Medium').length, color: 'yellow' }
  ]

  const filteredThreats = activeFilter === 'all'
    ? advancedThreats
    : advancedThreats.filter(threat => threat.severity.toLowerCase() === activeFilter)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Advanced Threat Intelligence Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400">Advanced Threat Intelligence Center</h2>
          <p className="text-slate-400 mt-1">AI-Powered Global Threat Analysis & Correlation</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 px-3 py-2 bg-green-500/10 rounded-lg border border-green-500/30">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Live Intelligence Feed</span>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg">{metrics.activeThreats}</div>
            <div className="text-slate-400 text-xs">Active Threats</div>
          </div>
        </div>
      </div>

      {/* Threat Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex space-x-3"
      >
        {filters.map((filter) => (
          <motion.button
            key={filter.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeFilter === filter.id
                ? `bg-${filter.color}-500/20 border border-${filter.color}-500/50 text-${filter.color}-400`
                : 'bg-slate-800/50 border border-slate-700/50 text-slate-400 hover:bg-slate-700/50'
            }`}
          >
            {filter.label} ({filter.count})
          </motion.button>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Threat Map */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <GlassCard title="Global Threat Heat Map" icon={Globe}>
            <div className="relative h-96 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-lg overflow-hidden">
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 animate-pulse"></div>

              {/* Threat Points */}
              <div className="absolute inset-0">
                {globalThreats.map((threat, index) => (
                  <motion.div
                    key={threat.country}
                    initial={{ scale: 0 }}
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.5
                    }}
                    className={`absolute w-4 h-4 rounded-full cursor-pointer hover:scale-125 transition-transform ${
                      threat.severity === 'Critical' ? 'bg-red-500 shadow-red-500/50 shadow-lg' :
                      threat.severity === 'High' ? 'bg-orange-500 shadow-orange-500/50 shadow-lg' :
                      'bg-yellow-500 shadow-yellow-500/50 shadow-lg'
                    }`}
                    style={{
                      left: `${20 + index * 15}%`,
                      top: `${20 + (index % 3) * 20}%`
                    }}
                    title={`${threat.country}: ${threat.threats} threats`}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                      {threat.country}: {threat.threats}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Central Hub */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-32 h-32 border-2 border-cyan-500/30 rounded-full relative"
                >
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-cyan-400 rounded-full"></div>
                  <div className="absolute inset-0 border border-cyan-400/20 rounded-full animate-ping"></div>
                </motion.div>
                <div className="text-center mt-4">
                  <div className="text-cyan-400 font-bold">Global Command Center</div>
                  <div className="text-slate-400 text-sm">Monitoring 195+ countries</div>
                </div>
              </div>

              {/* Threat Statistics */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between text-sm">
                <div className="bg-slate-800/80 px-3 py-2 rounded-lg">
                  <div className="text-red-400 font-bold">247</div>
                  <div className="text-slate-400">Critical Threats</div>
                </div>
                <div className="bg-slate-800/80 px-3 py-2 rounded-lg">
                  <div className="text-orange-400 font-bold">189</div>
                  <div className="text-slate-400">High Priority</div>
                </div>
                <div className="bg-slate-800/80 px-3 py-2 rounded-lg">
                  <div className="text-yellow-400 font-bold">1,247</div>
                  <div className="text-slate-400">Total Active</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Threat Clusters */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <GlassCard title="AI Threat Clusters" icon={Zap}>
            <div className="space-y-4">
              {threatClusters.map((cluster, index) => (
                <motion.div
                  key={cluster.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer hover:bg-slate-700/30 transition-colors ${
                    cluster.severity === 'Critical' ? 'border-l-red-500 bg-red-500/10' :
                    cluster.severity === 'High' ? 'border-l-orange-500 bg-orange-500/10' :
                    'border-l-yellow-500 bg-yellow-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-white font-semibold text-sm">{cluster.name}</h4>
                    <span className="text-cyan-400 text-xs">{cluster.confidence}% AI confidence</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">{cluster.threats} related threats</span>
                    <span className="text-slate-500">{cluster.lastSeen}</span>
                  </div>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      cluster.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      cluster.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {cluster.severity}
                    </div>
                    <div className="flex-1 bg-slate-700 rounded-full h-1">
                      <div
                        className={`h-1 rounded-full ${
                          cluster.severity === 'Critical' ? 'bg-red-500' :
                          cluster.severity === 'High' ? 'bg-orange-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${cluster.confidence}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <h4 className="text-cyan-400 font-semibold text-sm mb-3">AI Insights</h4>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>94% confidence in APT-41 attribution</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                  <span>12 threat patterns auto-correlated</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                  <span>3 zero-day exploits detected</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Advanced Threat Intelligence Table */}
      <GlassCard title="Advanced Threat Intelligence Feed" icon={Crosshair}>
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-400 text-sm font-medium">Live Feed Active</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">Last updated:</span>
              <span className="text-cyan-400 text-sm font-mono">2025-12-24 10:54:58 UTC</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded text-sm hover:bg-cyan-500/30 transition-colors">
              Export
            </button>
            <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-sm hover:bg-purple-500/30 transition-colors">
              Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Threat Type</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">MITRE Tactic</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Severity</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Source</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Confidence</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Impact</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Status</th>
                <th className="text-left py-3 px-4 text-cyan-400 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreats.map((threat, index) => (
                <motion.tr
                  key={threat.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-slate-700/50 hover:bg-slate-700/30 cursor-pointer"
                  onClick={() => setSelectedThreat(threat)}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        threat.type.includes('APT') ? 'bg-red-500' :
                        threat.type.includes('Ransomware') ? 'bg-orange-500' :
                        threat.type.includes('BEC') ? 'bg-yellow-500' :
                        'bg-purple-500'
                      }`}></div>
                      <div>
                        <div className="text-white font-medium">{threat.type}</div>
                        <div className="text-slate-400 text-xs max-w-32 truncate">{threat.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded text-xs font-semibold">
                      {threat.mitreTactic}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      threat.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      threat.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {threat.severity}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{threat.source}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-cyan-400 font-semibold">{threat.confidence}%</span>
                      <div className="w-12 bg-slate-700 rounded-full h-1">
                        <div
                          className="h-1 bg-cyan-500 rounded-full"
                          style={{ width: `${threat.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      threat.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      threat.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {threat.impact}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      threat.status === 'Active' ? 'bg-red-500/20 text-red-400' :
                      threat.status === 'Blocked' ? 'bg-green-500/20 text-green-400' :
                      threat.status === 'Mitigated' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-purple-500/20 text-purple-400'
                    }`}>
                      {threat.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-cyan-400 hover:text-cyan-300 p-1"
                        title="Investigate"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-green-400 hover:text-green-300 p-1"
                        title="Block"
                      >
                        <Shield className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-purple-400 hover:text-purple-300 p-1"
                        title="Correlate"
                      >
                        <Network className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Threat Details Modal */}
        {selectedThreat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedThreat(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">{selectedThreat.type}</h3>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-sm">Severity</label>
                    <div className={`mt-1 px-3 py-1 rounded text-sm font-semibold ${
                      selectedThreat.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      selectedThreat.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedThreat.severity}
                    </div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm">Confidence</label>
                    <div className="mt-1 text-cyan-400 font-semibold">{selectedThreat.confidence}%</div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm">MITRE Tactic</label>
                    <div className="mt-1 text-purple-400">{selectedThreat.mitreTactic}</div>
                  </div>
                  <div>
                    <label className="text-slate-400 text-sm">Impact Level</label>
                    <div className={`mt-1 px-3 py-1 rounded text-sm font-semibold ${
                      selectedThreat.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      selectedThreat.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {selectedThreat.impact}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-slate-400 text-sm">Description</label>
                  <p className="mt-1 text-slate-300">{selectedThreat.description}</p>
                </div>

                <div>
                  <label className="text-slate-400 text-sm">Target Systems</label>
                  <div className="mt-1 px-3 py-2 bg-slate-800/50 rounded text-slate-300">
                    {selectedThreat.target}
                  </div>
                </div>

                <div className="flex space-x-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Investigate Threat
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-green-600 hover:bg-green-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Block & Mitigate
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-lg font-semibold transition-colors"
                  >
                    Correlate Events
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  )
}

// Compliance Center Component
function ComplianceCenter({ metrics }) {
  const [compliance, setCompliance] = useState({
    gdpr: 96,
    hipaa: 94,
    pci: 98,
    soc2: 92,
    iso27001: 95
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Compliance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <Shield className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-green-400">{metrics.complianceScore}%</span>
          </div>
          <h4 className="text-white font-semibold mb-2">Overall Compliance</h4>
          <p className="text-slate-400 text-sm">All frameworks combined</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-blue-400">47</span>
          </div>
          <h4 className="text-white font-semibold mb-2">Controls Verified</h4>
          <p className="text-slate-400 text-sm">This quarter</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <AlertCircle className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">3</span>
          </div>
          <h4 className="text-white font-semibold mb-2">Open Issues</h4>
          <p className="text-slate-400 text-sm">Require attention</p>
        </GlassCard>
      </div>

      {/* Compliance Frameworks */}
      <GlassCard title="Regulatory Compliance Status" icon={Shield}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(compliance).map(([framework, score], index) => (
            <motion.div
              key={framework}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/30"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-semibold uppercase text-sm">{framework}</h4>
                <span className={`text-lg font-bold ${
                  score >= 95 ? 'text-green-400' :
                  score >= 90 ? 'text-yellow-400' :
                  'text-red-400'
                }`}>
                  {score}%
                </span>
              </div>
              <div className="w-full bg-slate-600 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    score >= 95 ? 'bg-green-500' :
                    score >= 90 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}

// Business Analytics Component
function BusinessAnalytics({ metrics, predictionData }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* Business Impact Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-400" />
            <span className="text-2xl font-bold text-green-400">$2.4M</span>
          </div>
          <h4 className="text-white font-semibold">Cost Savings</h4>
          <p className="text-green-300 text-sm">Prevented breaches</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8 text-blue-400" />
            <span className="text-2xl font-bold text-blue-400">{metrics.roi}%</span>
          </div>
          <h4 className="text-white font-semibold">ROI</h4>
          <p className="text-blue-300 text-sm">Security investment</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <Timer className="w-8 h-8 text-purple-400" />
            <span className="text-2xl font-bold text-purple-400">{metrics.mttr}</span>
          </div>
          <h4 className="text-white font-semibold">MTTR</h4>
          <p className="text-purple-300 text-sm">Mean time to respond</p>
        </GlassCard>

        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <Gauge className="w-8 h-8 text-cyan-400" />
            <span className="text-2xl font-bold text-cyan-400">{metrics.uptime}%</span>
          </div>
          <h4 className="text-white font-semibold">System Uptime</h4>
          <p className="text-cyan-300 text-sm">99.98% availability</p>
        </GlassCard>
      </div>

      {/* AI Prediction Engine */}
      <GlassCard title="AI Prediction Engine" icon={Target}>
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-white mb-4">Next Threat Predictions</h3>
          <div className="space-y-4">
            {predictionData.map((prediction, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
              >
                <div>
                  <div className="text-white font-medium">{prediction.type}</div>
                  <div className="text-slate-400 text-sm">Expected in {prediction.timeframe}</div>
                </div>
                <div className="text-right">
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    prediction.confidence === 'High' ? 'bg-red-500/20 text-red-400' :
                    prediction.confidence === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {prediction.confidence}
                  </div>
                  <div className="text-white font-bold mt-1">{prediction.likelihood}%</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700/50 pt-4">
          <h4 className="text-sm font-semibold text-cyan-400 mb-2">AI Insights</h4>
          <p className="text-slate-300 text-sm">
            "High confidence phishing campaign expected due to recent credential patterns observed in network traffic analysis."
          </p>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// SOC Operations Component
function SOCOperations({ metrics, aiInsights }) {
  const [alerts, setAlerts] = useState([
    { id: 1, level: 'Critical', message: 'APT Detected in Executive Network', time: '2 min ago', status: 'Active' },
    { id: 2, level: 'High', message: 'Ransomware Attempt Blocked', time: '5 min ago', status: 'Mitigated' },
    { id: 3, level: 'Medium', message: 'Suspicious Login Pattern', time: '12 min ago', status: 'Investigating' }
  ])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      {/* SOC Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <GlassCard>
          <Monitor className="w-8 h-8 text-green-400 mb-3" />
          <h4 className="text-white font-semibold">SOC Status</h4>
          <p className="text-green-400 font-bold">Operational</p>
        </GlassCard>

        <GlassCard>
          <Users className="w-8 h-8 text-blue-400 mb-3" />
          <h4 className="text-white font-semibold">Active Analysts</h4>
          <p className="text-blue-400 font-bold">12</p>
        </GlassCard>

        <GlassCard>
          <Activity className="w-8 h-8 text-purple-400 mb-3" />
          <h4 className="text-white font-semibold">Incidents Today</h4>
          <p className="text-purple-400 font-bold">{metrics.incidentsToday}</p>
        </GlassCard>

        <GlassCard>
          <Target className="w-8 h-8 text-cyan-400 mb-3" />
          <h4 className="text-white font-semibold">False Positives</h4>
          <p className="text-cyan-400 font-bold">{metrics.falsePositives}%</p>
        </GlassCard>
      </div>

      {/* Active Alerts */}
      <GlassCard title="Active Security Alerts" icon={Bell}>
        <div className="space-y-4">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-slate-700/50 rounded-lg border border-slate-600/30"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${
                  alert.level === 'Critical' ? 'bg-red-500' :
                  alert.level === 'High' ? 'bg-orange-500' :
                  'bg-yellow-500'
                }`}></div>
                <div>
                  <p className="text-white font-semibold">{alert.message}</p>
                  <p className="text-slate-400 text-sm">{alert.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  alert.status === 'Active' ? 'bg-red-500/20 text-red-400' :
                  alert.status === 'Mitigated' ? 'bg-green-500/20 text-green-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {alert.status}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-cyan-400 hover:text-cyan-300 p-1"
                >
                  <Eye className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* AI Intelligence Timeline */}
      <GlassCard title="AI Intelligence Timeline" icon={Eye}>
        <div className="space-y-4">
          {aiInsights.map((insight, index) => (
            <AISummaryCard key={index} insight={insight} />
          ))}
        </div>
      </GlassCard>

      {/* SOC Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-xl text-white text-left hover:shadow-lg transition-all"
        >
          <Search className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-2">Threat Hunting</h4>
          <p className="text-blue-100 text-sm">Advanced threat detection and investigation tools</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-xl text-white text-left hover:shadow-lg transition-all"
        >
          <Workflow className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-2">Incident Response</h4>
          <p className="text-purple-100 text-sm">Automated incident handling and response workflows</p>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          className="bg-gradient-to-br from-green-600 to-teal-600 p-6 rounded-xl text-white text-left hover:shadow-lg transition-all"
        >
          <BarChart3 className="w-8 h-8 mb-3" />
          <h4 className="font-bold text-lg mb-2">Analytics Dashboard</h4>
          <p className="text-green-100 text-sm">Real-time security metrics and performance analytics</p>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Dashboard
