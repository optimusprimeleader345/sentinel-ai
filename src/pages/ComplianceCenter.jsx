import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HeroHeader from '../components/HeroHeader'
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Shield,
  FileCheck,
  Lock,
  Eye,
  Zap,
  AlertCircle
} from 'lucide-react'

function ComplianceCenter() {
  // Mock compliance summary data
  const complianceSummary = {
    iso27001: 'Compliant',
    nistScore: 87,
    gdprReadiness: 'Yes',
    soc2Controls: 45
  }

  // Mock framework comparison data
  const frameworksData = [
    {
      control: 'Access Control',
      iso27001: 'A.9',
      nist: 'PR.AC',
      gdpr: 'Article 25, 32'
    },
    {
      control: 'Encryption',
      iso27001: 'A.10',
      nist: 'PR.DS',
      gdpr: 'Article 32'
    },
    {
      control: 'Logging & Monitoring',
      iso27001: 'A.12.4',
      nist: 'DE.AE, RS.AN',
      gdpr: 'Article 30'
    },
    {
      control: 'Incident Response',
      iso27001: 'A.16',
      nist: 'RS.CO, RS.IM',
      gdpr: 'Article 33, 34'
    },
    {
      control: 'Business Continuity',
      iso27001: 'A.17',
      nist: 'RC.RP',
      gdpr: 'Article 32'
    }
  ]

  // Mock control checklist data
  const controlChecklist = [
    {
      category: 'Access Control',
      status: 'Implemented',
      controls: ['Access Control Policy', 'User Registration', 'Privilege Management', 'Information Access']
    },
    {
      category: 'Encryption',
      status: 'Implemented',
      controls: ['Data Encryption', 'Key Management', 'Encryption Standards', 'Media Encryption']
    },
    {
      category: 'Logging & Monitoring',
      status: 'In Progress',
      controls: ['Event Logging', 'Log Monitoring', 'System Monitoring', 'Audit Logs']
    },
    {
      category: 'Incident Response',
      status: 'Not Started',
      controls: ['Incident Response Plan', 'Response Team', 'Recovery Planning', 'Communication Plan']
    },
    {
      category: 'Business Continuity',
      status: 'Implemented',
      controls: ['Business Continuity Plan', 'Disaster Recovery', 'Backup Strategies', 'Continuity Testing']
    }
  ]

  // Mock gap analysis data
  const gapAnalysis = [
    {
      gap: 'Missing Multi-Factor Authentication',
      nextStep: 'Implement MFA across all access points',
      riskLevel: 'High'
    },
    {
      gap: 'Incomplete Data Mapping',
      nextStep: 'Map data flows and retention policies',
      riskLevel: 'Medium'
    },
    {
      gap: 'Outdated Encryption Protocols',
      nextStep: 'Upgrade to AES-256 and TLS 1.3',
      riskLevel: 'Medium'
    }
  ]

  // Mock heatmap data
  const heatmapData = [
    { controlId: 'A.5', severity: 8, category: 'Information Security Policies' },
    { controlId: 'A.6', severity: 6, category: 'Organization of Information Security' },
    { controlId: 'A.7', severity: 9, category: 'Human Resources Security' },
    { controlId: 'A.8', severity: 7, category: 'Asset Management' },
    { controlId: 'A.9', severity: 4, category: 'Access Control' },
    { controlId: 'A.10', severity: 5, category: 'Cryptography' },
    { controlId: 'A.12', severity: 6, category: 'Operations Security' },
    { controlId: 'A.13', severity: 3, category: 'Communications Security' },
    { controlId: 'A.14', severity: 8, category: 'System Acquisition' },
  ]

  const [expandedItems, setExpandedItems] = useState(new Set())

  const toggleExpanded = (index) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  const getStatusBadge = (status) => {
    const statusConfig = {
      'Implemented': { color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: CheckCircle },
      'In Progress': { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: AlertTriangle },
      'Not Started': { color: 'bg-red-500/20 text-red-400 border-red-500/30', icon: XCircle }
    }
    const config = statusConfig[status] || statusConfig['Not Started']
    const Icon = config.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    )
  }

  const getRiskBadge = (risk) => {
    const riskConfig = {
      'High': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Low': 'bg-green-500/20 text-green-400 border-green-500/30'
    }
    return <span className={`px-2 py-1 rounded-full text-xs font-medium border ${riskConfig[risk]}`}>{risk}</span>
  }

  const getHeatmapColor = (severity) => {
    if (severity >= 8) return 'bg-red-500/40'
    if (severity >= 6) return 'bg-orange-500/40'
    if (severity >= 4) return 'bg-yellow-500/40'
    return 'bg-green-500/40'
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <HeroHeader />

        {/* Compliance Summary Dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {/* ISO 27001 Card */}
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <span className="text-sm font-medium text-slate-400">ISO 27001</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {complianceSummary.iso27001 === 'Compliant' ? (
                <span className="text-green-400">✓ Compliant</span>
              ) : complianceSummary.iso27001 === 'Partial' ? (
                <span className="text-yellow-400">⚠ Partial</span>
              ) : (
                <span className="text-red-400">✗ Non-compliant</span>
              )}
            </div>
          </div>

          {/* NIST CSF Score Card */}
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <FileCheck className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-sm font-medium text-slate-400">NIST CSF Score</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {complianceSummary.nistScore}/100
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${complianceSummary.nistScore}%` }}
              ></div>
            </div>
          </div>

          {/* GDPR Readiness Card */}
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Lock className="w-6 h-6 text-green-400" />
              </div>
              <span className="text-sm font-medium text-slate-400">GDPR Readiness</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {complianceSummary.gdprReadiness === 'Yes' ? (
                <span className="text-green-400">✓ Ready</span>
              ) : (
                <span className="text-red-400">✗ Not Ready</span>
              )}
            </div>
          </div>

          {/* SOC2 Controls Card */}
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <Eye className="w-6 h-6 text-orange-400" />
              </div>
              <span className="text-sm font-medium text-slate-400">SOC2 Completed</span>
            </div>
            <div className="text-2xl font-bold text-white mb-2">
              {complianceSummary.soc2Controls}
            </div>
            <p className="text-xs text-slate-400">Controls Implemented</p>
          </div>
        </motion.div>

        {/* Framework Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Framework Comparison</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Control Area</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">ISO 27001</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">NIST CSF</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">GDPR</th>
                </tr>
              </thead>
              <tbody>
                {frameworksData.map((row, index) => (
                  <tr key={index} className="border-b border-slate-700/20 hover:bg-slate-800/30">
                    <td className="py-3 px-4 font-medium text-white">{row.control}</td>
                    <td className="py-3 px-4 text-slate-300">{row.iso27001}</td>
                    <td className="py-3 px-4 text-slate-300">{row.nist}</td>
                    <td className="py-3 px-4 text-slate-300">{row.gdpr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Control Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Control Checklist</h3>
          <div className="space-y-4">
            {controlChecklist.map((item, index) => (
              <div key={index} className="border border-slate-700/30 rounded-lg">
                <button
                  onClick={() => toggleExpanded(index)}
                  className="w-full flex items-center justify-between p-4 hover:bg-slate-800/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-medium text-white">{item.category}</span>
                    {getStatusBadge(item.status)}
                  </div>
                  {expandedItems.has(index) ?
                    <ChevronUp className="w-5 h-5 text-slate-400" /> :
                    <ChevronDown className="w-5 h-5 text-slate-400" />
                  }
                </button>
                {expandedItems.has(index) && (
                  <div className="px-4 pb-4 border-t border-slate-700/30">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-4">
                      {item.controls.map((control, controlIndex) => (
                        <div key={controlIndex} className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                          <span className="text-slate-300 text-sm">{control}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Gap Analysis Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-orange-400" />
            <h3 className="text-xl font-bold text-white">Gap Analysis</h3>
          </div>
          <div className="space-y-4">
            {gapAnalysis.map((gap, index) => (
              <div key={index} className="flex items-start gap-4 p-4 border border-slate-700/30 rounded-lg">
                <div className="flex-shrink-0 mt-1">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-white">{gap.gap}</span>
                    {getRiskBadge(gap.riskLevel)}
                  </div>
                  <p className="text-slate-400 text-sm mb-2">Next Step:</p>
                  <p className="text-slate-300">{gap.nextStep}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Compliance Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)] gap-6"
        >
          <h3 className="text-xl font-bold text-white mb-6">Compliance Heatmap</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-2">
            {heatmapData.map((item, index) => (
              <div key={index} className="relative group">
                <div className={`aspect-square ${getHeatmapColor(item.severity)} border border-slate-600/50 rounded-lg flex items-center justify-center cursor-pointer hover:scale-105 transition-transform`}>
                  <span className="text-xs font-medium text-white">{item.controlId}</span>
                </div>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  {item.category}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-800"></div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/40 rounded"></div>
              <span className="text-slate-400">Low Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500/40 rounded"></div>
              <span className="text-slate-400">Medium Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500/40 rounded"></div>
              <span className="text-slate-400">High Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/40 rounded"></div>
              <span className="text-slate-400">Critical Risk</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ComplianceCenter
