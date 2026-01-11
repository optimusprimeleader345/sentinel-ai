import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/admin/GlassCard'
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  Shield,
  Users,
  BarChart3,
  CheckCircle,
  Calendar,
  Filter,
  Activity,
  Clock,
  Target,
  Eye,
  Brain,
  Zap,
  RefreshCw,
  Download,
  Settings
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
  Cell,
  RadialBarChart,
  RadialBar,
  Legend
} from 'recharts'

// Real-time compliance data
const complianceMetrics = [
  { standard: 'ISO 27001', compliance: 94, trend: 'improving', lastAudit: '2 days ago' },
  { standard: 'GDPR', compliance: 87, trend: 'stable', lastAudit: '1 week ago' },
  { standard: 'SOC 2', compliance: 91, trend: 'improving', lastAudit: '3 days ago' },
  { standard: 'NIST', compliance: 89, trend: 'stable', lastAudit: '5 days ago' },
  { standard: 'PCI DSS', compliance: 85, trend: 'improving', lastAudit: '1 day ago' },
]

const reportingActivity = [
  { time: '00:00', generated: 3, critical: 0, automated: 2 },
  { time: '04:00', generated: 7, critical: 1, automated: 5 },
  { time: '08:00', generated: 12, critical: 2, automated: 8 },
  { time: '12:00', generated: 18, critical: 1, automated: 12 },
  { time: '16:00', generated: 15, critical: 3, automated: 10 },
  { time: '20:00', generated: 9, critical: 1, automated: 6 },
]

const reportGenerationStats = [
  { metric: 'Reports Generated', value: 342, change: '+12%', icon: FileText, color: '#06b6d4' },
  { metric: 'Compliance Alerts', value: 23, change: '-5%', icon: AlertTriangle, color: '#ef4444' },
  { metric: 'Active Monitors', value: 156, change: '+8%', icon: Activity, color: '#10b981' },
  { metric: 'AI Insights', value: 89, change: '+15%', icon: Brain, color: '#8b5cf6' },
]

const complianceGaps = [
  {
    category: 'Access Controls',
    severity: 'High',
    gaps: 3,
    description: 'Multi-factor authentication not enforced on critical systems',
    confidence: 92,
    priority: 'Immediate'
  },
  {
    category: 'Data Encryption',
    severity: 'Medium',
    gaps: 5,
    description: 'Sensitive data repositories lacking proper encryption',
    confidence: 78,
    priority: 'High'
  },
  {
    category: 'Incident Response',
    severity: 'Low',
    gaps: 2,
    description: 'Minor gaps in incident documentation procedures',
    confidence: 85,
    priority: 'Medium'
  },
]

function ReportingCenter() {
  // Real-time reporting data
  const [realTimeReports, setRealTimeReports] = useState([
    {
      id: 'RPT-001',
      type: 'Compliance Alert',
      status: 'generating',
      progress: 0,
      timestamp: new Date().toISOString(),
      confidence: 91
    },
    {
      id: 'RPT-002',
      type: 'Executive Summary',
      status: 'completed',
      progress: 100,
      timestamp: new Date(Date.now() - 300000).toISOString(),
      confidence: 94
    },
    {
      id: 'RPT-003',
      type: 'Threat Intelligence',
      status: 'processing',
      progress: 65,
      timestamp: new Date(Date.now() - 600000).toISOString(),
      confidence: 87
    }
  ]);

  const [selectedReportType, setSelectedReportType] = useState("")
  const [generationStatus, setGenerationStatus] = useState('idle')
  const [logs, setLogs] = useState([])
  const loggingEnabled = useRef(true)

  // Simulate real-time report updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeReports(prev => prev.map(report => {
        if (report.status === 'generating' || report.status === 'processing') {
          const newProgress = Math.min(100, report.progress + Math.floor(Math.random() * 5) + 1);
          const newStatus = newProgress >= 100 ? 'completed' : report.status;
          return {
            ...report,
            progress: newProgress,
            status: newStatus,
            confidence: Math.min(100, report.confidence + Math.floor(Math.random() * 2) - 1)
          };
        }
        return report;
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [])

  const reportTypes = [
    { name: "Executive Summary", icon: Shield, description: "High-level security overview", color: "from-purple-500 to-blue-500", metrics: "15 KPIs, 8 insights" },
    { name: "Compliance Report", icon: CheckCircle, description: "Regulatory compliance status", color: "from-green-500 to-teal-500", metrics: "ISO, GDPR, SOC 2" },
    { name: "Threat Intelligence", icon: AlertTriangle, description: "Active threat analysis", color: "from-red-500 to-pink-500", metrics: "47 campaigns, 23 vectors" },
    { name: "User Behavior Report", icon: Users, description: "UEBA analytics", color: "from-indigo-500 to-purple-500", metrics: "1.2K users, patterns" },
    { name: "System Health Report", icon: Activity, description: "Infrastructure monitoring", color: "from-cyan-500 to-blue-500", metrics: "CPU, Network, Security" },
    { name: "Incident Response Log", icon: FileText, description: "Incident tracking", color: "from-orange-500 to-yellow-500", metrics: "Timeline, Response effectiveness" }
  ]

  const handleGenerateReport = () => {
    setGenerationStatus('generating')
    setLogs([])
    const fakeLogs = [
      "[🔄] Analyzing compliance data...",
      "[📊] Aggregating threat intelligence...",
      "[🤖] Generating AI insights...",
      "[📈] Creating visualizations...",
      "[✅] Finalizing report compilation...",
      "[💾] Report ready for download!"
    ]

    fakeLogs.forEach((log, index) => {
      setTimeout(() => {
        if (loggingEnabled.current) {
          setLogs(prev => [...prev, log])
        }
      }, (index + 1) * 800)
    })

    setTimeout(() => {
      setGenerationStatus('completed')
    }, fakeLogs.length * 1000)
  }

  const getReportPreview = (type) => {
    const reportsData = {
      "Executive Summary": {
        title: "Executive Security Overview",
        data: { kpis: 15, threats: 47, uptime: "99.8%", score: 92 },
        chartData: [
          { name: 'Last Week', security: 89, threats: 23, compliance: 91 },
          { name: 'This Week', security: 92, threats: 19, compliance: 94 }
        ]
      },
      "Compliance Report": {
        title: "Compliance Status Dashboard",
        data: { standards: 8, issues: 12, remediated: 9, score: 88 },
        chartData: complianceMetrics.map(item => ({
          name: item.standard,
          compliance: item.compliance,
          trend: item.trend === 'improving' ? 5 : item.trend === 'stable' ? 0 : -3
        }))
      },
      "Threat Intelligence": {
        title: "Active Threat Intelligence",
        data: { campaigns: 47, vectors: 23, blocked: 156, confidence: 87 },
        chartData: [
          { category: 'Malware', incidents: 23, severity: 'high' },
          { category: 'Phishing', incidents: 34, severity: 'medium' },
          { category: 'DDoS', incidents: 18, severity: 'high' },
          { category: 'Ransomware', incidents: 12, severity: 'critical' }
        ]
      }
    }

    const reportData = reportsData[type] || {
      title: "Select Report Type",
      data: {},
      chartData: []
    };

    return reportData;
  }

  const previewData = getReportPreview(selectedReportType)

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real-Time Reporting Center
            </h1>
            <p className="text-slate-400 text-sm">AI-powered compliance analytics and automated report generation</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-white">{realTimeReports.filter(r => r.status === 'completed').length}</span>
            <span className="text-xs text-slate-400">Generated</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-green-400" />
            <span className="text-sm font-bold text-white">{realTimeReports.filter(r => ['generating', 'processing'].includes(r.status)).length}</span>
            <span className="text-xs text-slate-400">Active</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {reportGenerationStats.map((stat, index) => (
          <motion.div
            key={stat.metric}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-4">
                <stat.icon className="w-8 h-8" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-slate-400 text-sm">{stat.metric}</div>
              <div className={`mt-2 text-xs ${
                stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change} from last week
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">

        {/* Reporting Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2"
        >
          <GlassCard title="24-Hour Reporting Activity" icon={TrendingUp}>
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={reportingActivity}>
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
                  <Area dataKey="generated" stroke="#8b5cf6" fill="url(#reportsGradient)" />
                  <Area dataKey="automated" stroke="#06b6d4" fill="url(#autoGradient)" />
                  <defs>
                    <linearGradient id="reportsGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="autoGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Real-time Report Processing */}
            <div className="border-t border-slate-700/50 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Active Report Generation</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Processing</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-sm text-slate-300">
                  <div className="flex justify-between">
                    <span>Report Processing:</span>
                    <span className="text-cyan-400">97% complete</span>
                  </div>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '97%' }}></div>
                </div>
                <div className="text-xs text-slate-500">
                  ETA: 2 minutes
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Compliance Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="xl:col-span-1"
        >
          <GlassCard title="Compliance Status" icon={CheckCircle}>
            <div className="space-y-4">
              {complianceMetrics.slice(0, 4).map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-medium">{metric.standard}</span>
                    <span className={`text-sm font-bold ${
                      metric.compliance >= 90 ? 'text-green-400' :
                      metric.compliance >= 80 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {metric.compliance}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className={`h-2 rounded-full ${
                      metric.compliance >= 90 ? 'bg-green-500' :
                      metric.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} style={{ width: `${metric.compliance}%` }}></div>
                  </div>
                  <div className="text-xs text-slate-500">{metric.lastAudit}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="text-xs text-slate-400 mb-1">Next Audit</div>
              <div className="text-sm font-semibold text-cyan-400">
                ISO 27001 - 3 days
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Real-time Reports Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="xl:col-span-1"
        >
          <GlassCard title="Reports Feed" icon={Activity}>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {realTimeReports.map((report, index) => (
                <motion.div
                  key={report.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    report.status === 'completed' ? 'border-l-green-500 bg-green-500/5' :
                    report.status === 'processing' || report.status === 'generating' ? 'border-l-blue-500 bg-blue-500/5' :
                    'border-l-slate-500 bg-slate-500/5'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium text-sm">{report.type}</span>
                    <span className={`text-xs px-2 py-1 rounded ${report.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {report.status}
                    </span>
                  </div>
                  <div className="text-slate-300 text-xs mb-2">{report.id}</div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5 mb-1">
                    <div className={`h-1.5 rounded-full ${report.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} style={{ width: `${report.progress}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{report.progress}%</span>
                    <span>{new Date(report.timestamp).toLocaleTimeString()}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Active:</span>
                <span className="text-blue-400">
                  {realTimeReports.filter(r => ['generating', 'processing'].includes(r.status)).length}
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Report Generation Interface */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <GlassCard title="Automated Report Generation" icon={FileText}>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {reportTypes.map((report, index) => (
              <motion.button
                key={report.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedReportType(report.name)}
                className={`relative group bg-gradient-to-br ${report.color} p-4 rounded-xl text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                  selectedReportType === report.name ? 'ring-2 ring-white/50' : ''
                }`}
              >
                <report.icon className="w-6 h-6 mb-2" />
                <h4 className="font-semibold text-sm mb-1">{report.name}</h4>
                <p className="text-xs opacity-90 text-center leading-tight">{report.description}</p>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl"></div>
              </motion.button>
            ))}
          </div>

          {/* Report Generation Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-white font-semibold">Report Configuration</h4>

              {generationStatus !== 'idle' && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-300">Generation Progress:</span>
                    <span className="text-cyan-400 font-semibold">
                      {generationStatus === 'generating' ? 'Processing...' : 'Completed!'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <motion.div
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 h-3 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: generationStatus === 'completed' ? '100%' : '70%' }}
                      transition={{ duration: 2 }}
                    ></motion.div>
                  </div>
                </div>
              )}

              <button
                onClick={handleGenerateReport}
                disabled={!selectedReportType || generationStatus === 'generating'}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg px-6 py-3 hover:opacity-90 disabled:opacity-50 transition-all font-semibold shadow-lg flex items-center justify-center space-x-2"
              >
                <Download className="w-5 h-5" />
                <span>{generationStatus === 'generating' ? 'Generating...' : 'Generate Report'}</span>
              </button>

              {/* Real-time Logs */}
              {logs.length > 0 && (
                <div className="bg-slate-900/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                  <h5 className="text-cyan-400 font-semibold mb-2 flex items-center space-x-1">
                    <Activity className="w-4 h-4" />
                    <span>Generation Log</span>
                  </h5>
                  <div className="space-y-1">
                    {logs.map((log, index) => (
                      <div key={index} className="text-xs text-slate-300 font-mono">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-white font-semibold">Report Preview</h4>

              <div className="bg-slate-900/50 rounded-lg p-4 min-h-48">
                {selectedReportType ? (
                  <div className="space-y-3">
                    <h5 className="text-cyan-400 font-semibold">{previewData.title}</h5>

                    {previewData.chartData && previewData.chartData.length > 0 && (
                      <ResponsiveContainer width="100%" height={120}>
                        <BarChart data={previewData.chartData.slice(0, 3)}>
                          <Bar dataKey="compliance" fill="#8b5cf6" radius={[2, 2, 0, 0]} />
                          <XAxis dataKey="name" stroke="#9ca3af" fontSize={10} />
                          <YAxis stroke="#9ca3af" fontSize={10} />
                        </BarChart>
                      </ResponsiveContainer>
                    )}

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(previewData.data).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <div className="text-cyan-400 font-bold">{value}</div>
                          <div className="text-slate-400 text-xs capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-slate-400 py-8">
                    <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Select a report type to preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Compliance Intelligence */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <GlassCard title="AI Compliance Intelligence" icon={Brain}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-semibold mb-4">Critical Compliance Gaps</h4>
              <div className="space-y-4">
                {complianceGaps.map((gap, index) => (
                  <div key={index} className={`p-3 rounded-lg border-l-4 ${
                    gap.severity === 'High' ? 'border-l-red-500 bg-red-500/5' :
                    gap.severity === 'Medium' ? 'border-l-yellow-500 bg-yellow-500/5' :
                    'border-l-blue-500 bg-blue-500/5'
                  }`}>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-white font-medium text-sm">{gap.category}</span>
                      <div className="flex items-center space-x-2">
                        <span className={`text-xs px-2 py-1 rounded ${
                          gap.severity === 'High' ? 'bg-red-500/20 text-red-400' :
                          gap.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {gap.severity}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs mb-2">{gap.description}</p>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>{gap.priority} priority</span>
                      <span>{gap.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Automated Recommendations</h4>
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300 leading-relaxed text-sm mb-3">
                      <strong>AI Assessment:</strong> Compliance posture analysis shows 91% overall adherence across all frameworks.
                      Identified 3 critical gaps requiring immediate attention, primarily in access control and data encryption policies.
                      Automated remediation suggestions have been generated with 88% confidence level.
                    </p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-start space-x-2">
                        <span className="text-green-400 mt-0.5">✓</span>
                        <span className="text-slate-300">Multi-factor authentication deployment recommended</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-yellow-400 mt-0.5">!</span>
                        <span className="text-slate-300">Data encryption policy updates in progress</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-cyan-400 mt-0.5">⟳</span>
                        <span className="text-slate-300">Automated monitoring systems active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  )
}

export default ReportingCenter
