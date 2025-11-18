import { motion } from 'framer-motion'
import { useState } from 'react'
import { FileText, TrendingUp, AlertTriangle, Shield, Users, BarChart, CheckCircle, Calendar, Filter } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts'
import ToggleSwitch from '../components/ToggleSwitch'

// Mock data as specified
const reportTypes = [
  "Executive Summary",
  "Threat Intelligence Report",
  "Incident Report",
  "Compliance Report",
  "User Behavior Report",
  "Vulnerability Summary",
]

const previewChartData = [
  { name: "Mon", threats: 18 },
  { name: "Tue", threats: 23 },
  { name: "Wed", threats: 12 },
  { name: "Thu", threats: 28 },
  { name: "Fri", threats: 16 },
]

const reportRecommendations = [
  "Enable MFA for high-risk accounts.",
  "Rotate API keys every 30 days.",
  "Patch outdated OS on 7 devices.",
]

const reportHistory = [
  { id: "RPT-001", type: "Executive Summary", date: "2025-01-03" },
  { id: "RPT-002", type: "Incident Report", date: "2025-01-04" },
  { id: "RPT-003", type: "Compliance Report", date: "2025-01-05" },
]

function ReportingCenter() {
  const [selectedReportType, setSelectedReportType] = useState("")
  const [config, setConfig] = useState({
    dateRange: "Last 30 days",
    scope: "Global",
    severity: "All",
    includeCharts: true,
    includeRecommendations: true
  })
  const [showGenerateMessage, setShowGenerateMessage] = useState(false)
  const [logs, setLogs] = useState([])

  const getReportPreview = (type) => {
    switch(type) {
      case "Executive Summary":
        return {
          title: "Executive Security Summary",
          content: (
            <div className="space-y-4">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Total Threats This Week</h4>
                <div className="text-2xl font-bold text-white">47 incidents detected</div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Top 3 Risks</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-400" />
                    <span className="text-slate-200">Unpatched vulnerabilities in production servers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-yellow-400" />
                    <span className="text-slate-200">Increased phishing attempts targeting executives</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-orange-400" />
                    <span className="text-slate-200">Data exfiltration attempts from internal network</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        };

      case "Threat Intelligence Report":
        return {
          title: "Threat Intelligence Analysis",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Active Threats</h4>
                  <div className="text-2xl font-bold text-white">23 campaigns</div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">MITRE Techniques</h4>
                  <div className="text-2xl font-bold text-white">45 identified</div>
                </div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Primary Attack Vectors</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-200">Spear Phishing</span>
                    <span className="text-red-400">78%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-red-500 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-200">Zero-day Exploits</span>
                    <span className="text-orange-400">23%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-orange-500 h-2 rounded-full" style={{width: '23%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case "Incident Report":
        return {
          title: "Incident Analysis Report",
          content: (
            <div className="space-y-4">
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Incident T-4872</h4>
                <div className="text-lg font-semibold text-white">Ransomware Attack - Finance Dept</div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Timeline Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-200">2025-01-02 14:30 - Initial access via phishing</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-slate-200">2025-01-02 15:45 - Lateral movement detected</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-slate-200">2025-01-02 16:20 - Data encryption commenced</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Response Steps</h4>
                <ul className="space-y-1 text-sm">
                  <li className="text-slate-200">🛡️ Isolated affected systems</li>
                  <li className="text-slate-200">📊 Initiated forensic analysis</li>
                  <li className="text-slate-200">🔒 Applied security patches</li>
                  <li className="text-slate-200">💾 Restored from backup sources</li>
                </ul>
              </div>
            </div>
          )
        };

      case "Compliance Report":
        return {
          title: "Compliance Status Report",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">ISO 27001</h4>
                  <div className="text-lg font-bold text-green-400">95% Compliant</div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">GDPR</h4>
                  <div className="text-lg font-bold text-yellow-400">87% Compliant</div>
                </div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Gap Analysis</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-red-500/10 rounded">
                    <span className="text-slate-200 text-sm">Access Control Review</span>
                    <span className="text-red-400 text-xs">Critical Gap</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded">
                    <span className="text-slate-200 text-sm">Data Encryption Policy</span>
                    <span className="text-yellow-400 text-xs">Partial Implementation</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-500/10 rounded">
                    <span className="text-slate-200 text-sm">Incident Response Plan</span>
                    <span className="text-green-400 text-xs">Up to Standard</span>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      case "User Behavior Report":
        return {
          title: "User Behavior Analytics",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Active Users</h4>
                  <div className="text-2xl font-bold text-white">1,247</div>
                </div>
                <div>
                  <h4 className="text-cyan-400 font-semibold mb-2">Risky Behaviors</h4>
                  <div className="text-2xl font-bold text-white">23 detected</div>
                </div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Top Security Violations</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between items-center">
                    <span className="text-slate-200">Password reuse across systems</span>
                    <span className="text-red-400">67 users</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-200">Unauthorized file sharing</span>
                    <span className="text-orange-400">45 users</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span className="text-slate-200">Late-night access patterns</span>
                    <span className="text-yellow-400">28 users</span>
                  </li>
                </ul>
              </div>
            </div>
          )
        };

      case "Vulnerability Summary":
        return {
          title: "Vulnerability Assessment Summary",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-red-400 text-sm font-semibold">Critical</div>
                  <div className="text-2xl font-bold text-white">3</div>
                </div>
                <div className="text-center">
                  <div className="text-orange-400 text-sm font-semibold">High</div>
                  <div className="text-2xl font-bold text-white">12</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 text-sm font-semibold">Medium</div>
                  <div className="text-2xl font-bold text-white">28</div>
                </div>
              </div>
              <div>
                <h4 className="text-cyan-400 font-semibold mb-2">Key Vulnerabilities</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-red-500/10 rounded">
                    <span className="text-slate-200 text-sm">CVE-2024-1234 - Web Server Exploit</span>
                    <span className="text-red-400 text-xs">CVSS 9.8</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-orange-500/10 rounded">
                    <span className="text-slate-200 text-sm">Unpatched Windows Server</span>
                    <span className="text-orange-400 text-xs">CVSS 8.2</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-yellow-500/10 rounded">
                    <span className="text-slate-200 text-sm">Outdated SSL Certificate</span>
                    <span className="text-yellow-400 text-xs">CVSS 6.5</span>
                  </div>
                </div>
              </div>
            </div>
          )
        };

      default:
        return {
          title: "Select a Report Type",
          content: (
            <div className="text-center py-8">
              <FileText className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400">Choose a report type above to see the preview</p>
            </div>
          )
        };
    }
  }

  const handleGenerateReport = () => {
    setShowGenerateMessage(true)
    setLogs([])
    const fakeLogs = [
      "[✓] Data aggregated",
      "[✓] Charts rendered",
      "[✓] Report compiled",
      "[✓] Download ready"
    ]

    fakeLogs.forEach((log, index) => {
      setTimeout(() => {
        setLogs(prev => [...prev, log])
      }, (index + 1) * 500)
    })

    setTimeout(() => {
      setShowGenerateMessage(false)
      setLogs([])
    }, 4000)
  }

  const reportPreview = getReportPreview(selectedReportType)

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text">
            Reporting Center
          </h1>
          <p className="text-slate-400 mt-2">Generate comprehensive security reports with custom configurations</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-8">
            {/* Report Type Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                <BarChart className="w-5 h-5 text-cyan-400" />
                <span>Report Type Selection</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {reportTypes.map((type) => {
                  const getIcon = () => {
                    switch(type) {
                      case "Executive Summary": return <Shield className="w-5 h-5" />
                      case "Threat Intelligence Report": return <TrendingUp className="w-5 h-5" />
                      case "Incident Report": return <AlertTriangle className="w-5 h-5" />
                      case "Compliance Report": return <CheckCircle className="w-5 h-5" />
                      case "User Behavior Report": return <Users className="w-5 h-5" />
                      case "Vulnerability Summary": return <Filter className="w-5 h-5" />
                      default: return <FileText className="w-5 h-5" />
                    }
                  }

                  return (
                    <motion.button
                      key={type}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedReportType(type)}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        selectedReportType === type
                          ? 'bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border-purple-500/50 text-white shadow-neon-purple'
                          : 'bg-slate-800/50 border-slate-600 hover:border-slate-500 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="text-cyan-400">{getIcon()}</div>
                        <div>
                          <h3 className="font-semibold">{type}</h3>
                          <p className="text-xs text-slate-400">Generate {type.toLowerCase()}</p>
                        </div>
                      </div>
                    </motion.button>
                  )
                })}
              </div>
            </motion.div>

            {/* Report Configuration */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-cyan-400" />
                <span>Report Configuration</span>
              </h2>

              <div className="space-y-6">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Date Range</label>
                  <select
                    value={config.dateRange}
                    onChange={(e) => setConfig({...config, dateRange: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option>Last 7 days</option>
                    <option>Last 30 days</option>
                    <option>Last 90 days</option>
                    <option>Custom range</option>
                  </select>
                </div>

                {/* Scope */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Report Scope</label>
                  <select
                    value={config.scope}
                    onChange={(e) => setConfig({...config, scope: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option>Global</option>
                    <option>User-based</option>
                    <option>Device-based</option>
                    <option>Incident-based</option>
                  </select>
                </div>

                {/* Severity */}
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">Severity Filter</label>
                  <select
                    value={config.severity}
                    onChange={(e) => setConfig({...config, severity: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  >
                    <option>All</option>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>

                {/* Toggles */}
                <div className="space-y-4">
                  <ToggleSwitch
                    label="Include Charts"
                    description="Add visual charts to the report"
                    enabled={config.includeCharts}
                    onChange={() => setConfig({...config, includeCharts: !config.includeCharts})}
                  />
                  <ToggleSwitch
                    label="Include Recommendations"
                    description="Add actionable recommendations section"
                    enabled={config.includeRecommendations}
                    onChange={() => setConfig({...config, includeRecommendations: !config.includeRecommendations})}
                  />
                </div>
              </div>
            </motion.div>

            {/* Report Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <h2 className="text-xl font-bold text-white mb-6">Report Preview</h2>

              <div className="max-h-96 overflow-y-auto bg-slate-900/50 rounded-lg p-4 border border-slate-600">
                <h3 className="text-lg font-semibold text-cyan-400 mb-4">{reportPreview.title}</h3>
                {reportPreview.content}

                {/* Charts Section - Conditional */}
                {selectedReportType && config.includeCharts && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <h4 className="text-cyan-400 font-semibold mb-4">Threat Trend Analysis</h4>
                    <ResponsiveContainer width="100%" height={200}>
                      <AreaChart data={previewChartData}>
                        <defs>
                          <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                        <XAxis dataKey="name" stroke="#94a3b8" />
                        <YAxis stroke="#94a3b8" />
                        <Area
                          type="monotone"
                          dataKey="threats"
                          stroke="#8b5cf6"
                          fillOpacity={1}
                          fill="url(#threatGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}

                {/* Recommendations Section - Conditional */}
                {selectedReportType && config.includeRecommendations && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-6"
                  >
                    <h4 className="text-cyan-400 font-semibold mb-3">Security Recommendations</h4>
                    <ul className="space-y-2">
                      {reportRecommendations.map((rec, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-green-400 mt-1">✓</span>
                          <span className="text-slate-200 text-sm">{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </div>

              {/* Generate Button */}
              {selectedReportType && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex flex-col items-center space-y-4"
                >
                  <button
                    onClick={handleGenerateReport}
                    className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg px-8 py-3 hover:opacity-80 transition-opacity font-semibold shadow-neon-purple"
                  >
                    Generate Report
                  </button>

                  {/* Success Message */}
                  {showGenerateMessage && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center"
                    >
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-400 font-semibold">Report generated successfully (PDF mock)!</span>
                      </div>
                      <div className="space-y-1 text-sm text-slate-300">
                        {logs.map((log, index) => (
                          <div key={index} className={`text-left ${log.includes('ready') ? 'text-green-400 font-medium' : ''}`}>
                            {log}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Sidebar - Report History */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <h3 className="text-lg font-bold text-white mb-4">Report History</h3>
              <div className="space-y-3">
                {reportHistory.map((report) => (
                  <div key={report.id} className="bg-slate-800/50 rounded-lg p-3 border border-slate-600">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-purple-400 font-medium text-sm">{report.id}</span>
                      <span className="text-slate-400 text-xs">{report.date}</span>
                    </div>
                    <div className="text-slate-200 text-sm">{report.type}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
            >
              <h3 className="text-lg font-bold text-white mb-4">Report Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Generated This Month</span>
                  <span className="text-cyan-400 font-semibold">47</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Average Generation Time</span>
                  <span className="text-cyan-400 font-semibold">2.3s</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Most Popular</span>
                  <span className="text-cyan-400 font-semibold">Executive Summary</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ReportingCenter
