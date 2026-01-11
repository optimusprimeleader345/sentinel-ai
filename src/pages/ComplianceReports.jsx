import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { useAlerts } from '../contexts/AlertContext'
import GlassCard from '../components/admin/GlassCard'
import ReportFilters from '../components/reports/ReportFilters'
import AuditLogTable from '../components/reports/AuditLogTable'
import ExportPDFButton from '../components/reports/ExportPDFButton'
import SeverityDistributionChart from '../components/reports/SeverityDistributionChart'
import AuditTimelineChart from '../components/reports/AuditTimelineChart'
import {
  FileText,
  Shield,
  BarChart3,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Download,
  Activity,
  Target,
  Zap,
  Server
} from 'lucide-react'

const ComplianceReports = () => {
  const { user } = useAuth()
  const { alerts } = useAlerts()
  const [filters, setFilters] = useState({
    search: '',
    severity: 'all',
    type: 'all',
    outcome: 'all',
    startDate: '',
    endDate: ''
  })
  const [isLoading, setIsLoading] = useState(true)

  // Transform alert data to audit log format
  const [auditLogs, setAuditLogs] = useState([])

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      // Transform existing alert data into audit log format
      const transformedLogs = alerts.map((alert, index) => ({
        id: alert.id,
        timestamp: alert.timestamp,
        actor: user?.username || `user-${index}`,
        role: user?.role || 'user',
        action: getActionFromAlert(alert),
        resource: alert.affectedAsset,
        type: alert.type || 'URL', // Ensure type field exists
        severity: alert.severity,
        outcome: getOutcomeFromAlert(alert),
        scoreImpact: alert.scoreImpact
      }))

      // Add some mock historical data for demonstration
      const mockHistoricalLogs = generateMockAuditLogs()
      setAuditLogs([...transformedLogs, ...mockHistoricalLogs])
      setIsLoading(false)
    }, 1000)
  }, [alerts, user])

  // Generate mock audit logs for demonstration
  const generateMockAuditLogs = () => {
    const mockLogs = []
    const actions = [
      'URL scan initiated',
      'IP address checked',
      'Email attachment scanned',
      'Password breach check',
      'Malware detected',
      'Phishing URL blocked',
      'Access granted',
      'Login attempt',
      'File uploaded',
      'Report generated'
    ]

    const resources = [
      'https://suspicious-site.com',
      '192.168.1.100',
      'user@company.com',
      'admin@company.com',
      '/api/security/scan',
      '/dashboard',
      'system.log',
      'report.pdf'
    ]

    const outcomes = ['SUCCESS', 'BLOCKED', 'FAILED']
    const severities = ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']
    const types = ['URL', 'IP', 'EMAIL', 'PASSWORD']
    const roles = ['user', 'analyst', 'admin']

    // Generate last 30 days of mock data with more realistic distribution
    for (let i = 0; i < 150; i++) {
      const daysAgo = Math.floor(Math.random() * 30)
      const timestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000)

      // Add some randomness to the hour and minute
      timestamp.setHours(Math.floor(Math.random() * 24))
      timestamp.setMinutes(Math.floor(Math.random() * 60))
      timestamp.setSeconds(Math.floor(Math.random() * 60))

      // Determine type based on resource pattern
      let type = 'URL'
      const resource = resources[Math.floor(Math.random() * resources.length)]
      if (resource.includes('@')) type = 'EMAIL'
      else if (resource.match(/^\d+\.\d+\.\d+\.\d+$/)) type = 'IP'
      else if (resource.includes('password') || resource.includes('breach')) type = 'PASSWORD'
      else if (resource.startsWith('http') || resource.includes('site.com')) type = 'URL'

      mockLogs.push({
        id: `mock-${i}`,
        timestamp: timestamp.toISOString(),
        actor: `user-${Math.floor(Math.random() * 10)}`,
        role: roles[Math.floor(Math.random() * roles.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        resource: resource,
        type: type,
        severity: severities[Math.floor(Math.random() * severities.length)],
        outcome: outcomes[Math.floor(Math.random() * outcomes.length)],
        scoreImpact: Math.floor(Math.random() * 50) - 25 // -25 to +25
      })
    }

    return mockLogs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  // Convert alert to audit action
  const getActionFromAlert = (alert) => {
    switch (alert.type) {
      case 'URL':
        return alert.severity === 'CRITICAL' ? 'Malware URL blocked' : 'Phishing URL detected'
      case 'IP':
        return alert.severity === 'HIGH' ? 'Blacklisted IP blocked' : 'IP abuse reported'
      case 'EMAIL':
        return alert.severity === 'CRITICAL' ? 'Malicious attachment blocked' : 'Email spoofing detected'
      case 'PASSWORD':
        return alert.severity === 'CRITICAL' ? 'Critical password breach found' : 'Password breach detected'
      default:
        return 'Security event'
    }
  }

  // Convert alert to outcome
  const getOutcomeFromAlert = (alert) => {
    switch (alert.severity) {
      case 'CRITICAL':
      case 'HIGH':
        return 'BLOCKED'
      case 'MEDIUM':
        return 'SUCCESS'
      default:
        return 'SUCCESS'
    }
  }

  // Handle filter changes
  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters)
  }

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      search: '',
      severity: 'all',
      type: 'all',
      outcome: 'all',
      startDate: '',
      endDate: ''
    })
  }

  // Filter logs based on current filters
  const getFilteredLogs = () => {
    let filtered = [...auditLogs]

    if (filters.startDate) {
      filtered = filtered.filter(log =>
        new Date(log.timestamp) >= new Date(filters.startDate)
      )
    }

    if (filters.endDate) {
      filtered = filtered.filter(log =>
        new Date(log.timestamp) <= new Date(filters.endDate + 'T23:59:59')
      )
    }

    if (filters.severity !== 'all') {
      filtered = filtered.filter(log => log.severity === filters.severity)
    }

    if (filters.type !== 'all') {
      filtered = filtered.filter(log => log.type === filters.type)
    }

    if (filters.outcome !== 'all') {
      filtered = filtered.filter(log => log.outcome === filters.outcome)
    }

    if (filters.search) {
      filtered = filtered.filter(log =>
        log.action.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.resource.toLowerCase().includes(filters.search.toLowerCase()) ||
        log.actor.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    return filtered
  }

  const filteredLogs = getFilteredLogs()

  // Calculate statistics
  const stats = {
    total: filteredLogs.length,
    critical: filteredLogs.filter(log => log.severity === 'CRITICAL').length,
    high: filteredLogs.filter(log => log.severity === 'HIGH').length,
    blocked: filteredLogs.filter(log => log.outcome === 'BLOCKED').length,
    success: filteredLogs.filter(log => log.outcome === 'SUCCESS').length,
    totalImpact: filteredLogs.reduce((sum, log) => sum + (log.scoreImpact || 0), 0)
  }

  // Handle PDF export
  const handleExport = (filename) => {
    console.log('PDF exported:', filename)
    // Could show success toast here
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Compliance & Audit Reports
              </h1>
              <p className="text-slate-400 text-lg">Professional security audit logs and compliance reporting</p>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex items-center space-x-4">
            <ExportPDFButton
              auditLogs={filteredLogs}
              filters={filters}
              userRole={user?.role}
              userName={user?.username}
              onExport={handleExport}
            />
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Activity className="w-8 h-8 text-cyan-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.total}</div>
              <div className="text-slate-400 text-sm">Total Events</div>
              <div className="mt-2 text-xs text-cyan-400">Active monitoring</div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-4">
                <AlertTriangle className="w-8 h-8 text-red-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.critical}</div>
              <div className="text-slate-400 text-sm">Critical</div>
              <motion.div
                animate={{ opacity: stats.critical > 0 ? [0.5, 1, 0.5] : 1 }}
                className="mt-2 text-xs text-red-400"
              >
                {stats.critical > 0 ? '⚠️ Immediate attention required' : '✅ Under control'}
              </motion.div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Target className="w-8 h-8 text-orange-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.high}</div>
              <div className="text-slate-400 text-sm">High Priority</div>
              <div className="mt-2 text-xs text-orange-400">Active monitoring</div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-3xl font-bold text-white mb-2">{stats.success}</div>
              <div className="text-slate-400 text-sm">Successful</div>
              <div className="mt-2 text-xs text-green-400">✅ Performing well</div>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className={`w-8 h-8 ${stats.totalImpact >= 0 ? 'text-green-400' : 'text-red-400'}`} />
              </div>
              <div className={`text-3xl font-bold mb-2 ${stats.totalImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.totalImpact > 0 ? '+' : ''}{stats.totalImpact}
              </div>
              <div className="text-slate-400 text-sm">Score Impact</div>
              <div className={`mt-2 text-xs ${stats.totalImpact >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {stats.totalImpact >= 0 ? '📈 Positive trend' : '📉 Needs attention'}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <ReportFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onReset={handleResetFilters}
          />
        </motion.div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Audit Analytics</h2>
              <p className="text-slate-400">Visual insights into security events and trends</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <SeverityDistributionChart auditLogs={filteredLogs} />
            <AuditTimelineChart auditLogs={filteredLogs} />
          </div>
        </motion.div>

        {/* Audit Log Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <AuditLogTable
            auditLogs={filteredLogs}
            isLoading={isLoading}
          />
        </motion.div>

        {/* Compliance Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* ISO 27001 */}
          <GlassCard title="ISO 27001 Information Security" icon={Shield}>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Incident logging and monitoring implemented</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Access controls and authentication verified</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Security event tracking and analysis active</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Regular security assessments conducted</span>
              </li>
            </ul>
          </GlassCard>

          {/* SOC 2 */}
          <GlassCard title="SOC 2 Trust Services Criteria" icon={BarChart3}>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Security monitoring and alerting systems operational</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Incident response procedures documented</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Access logging and audit trails maintained</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Security controls regularly tested</span>
              </li>
            </ul>
          </GlassCard>

          {/* GDPR */}
          <GlassCard title="GDPR Data Protection" icon={TrendingUp}>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Personal data processing logged and monitored</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Breach detection mechanisms active</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Security incident response procedures in place</span>
              </li>
              <li className="flex items-center space-x-3">
                <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Data protection impact assessments conducted</span>
              </li>
            </ul>
          </GlassCard>
        </motion.div>
      </div>
    </div>
  )
}

export default ComplianceReports
