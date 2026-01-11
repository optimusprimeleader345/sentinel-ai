import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  AlertTriangle,
  Shield,
  Filter,
  Search,
  SortAsc,
  SortDesc,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Globe,
  Mail,
  Server,
  Lock,
  Calendar,
  TrendingDown,
  Eye,
  EyeOff
} from 'lucide-react'
import { useAlerts } from '../contexts/AlertContext'

const Alerts = () => {
  const { alerts, markAsRead, markAllAsRead } = useAlerts()
  const [filteredAlerts, setFilteredAlerts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [severityFilter, setSeverityFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('timestamp')
  const [sortOrder, setSortOrder] = useState('desc')
  const [showRead, setShowRead] = useState(true)

  // Filter and sort alerts
  useEffect(() => {
    let filtered = [...alerts]

    // Filter by read status
    if (!showRead) {
      filtered = filtered.filter(alert => !alert.read)
    }

    // Filter by severity
    if (severityFilter !== 'all') {
      filtered = filtered.filter(alert => alert.severity.toLowerCase() === severityFilter)
    }

    // Filter by type
    if (typeFilter !== 'all') {
      filtered = filtered.filter(alert => alert.type.toLowerCase() === typeFilter)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(alert =>
        alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.affectedAsset.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort alerts
    filtered.sort((a, b) => {
      let aValue, bValue

      switch (sortBy) {
        case 'timestamp':
          aValue = new Date(a.timestamp)
          bValue = new Date(b.timestamp)
          break
        case 'severity':
          const severityOrder = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 }
          aValue = severityOrder[a.severity] || 0
          bValue = severityOrder[b.severity] || 0
          break
        case 'type':
          aValue = a.type
          bValue = b.type
          break
        case 'impact':
          aValue = Math.abs(a.scoreImpact)
          bValue = Math.abs(b.scoreImpact)
          break
        default:
          return 0
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredAlerts(filtered)
  }, [alerts, searchTerm, severityFilter, typeFilter, sortBy, sortOrder, showRead])

  // Get severity color and icon
  const getSeverityInfo = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return {
          color: 'text-red-400',
          bg: 'bg-red-500/20',
          border: 'border-red-500/50',
          icon: AlertTriangle
        }
      case 'high':
        return {
          color: 'text-orange-400',
          bg: 'bg-orange-500/20',
          border: 'border-orange-500/50',
          icon: AlertCircle
        }
      case 'medium':
        return {
          color: 'text-yellow-400',
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/50',
          icon: AlertCircle
        }
      case 'low':
        return {
          color: 'text-blue-400',
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/50',
          icon: AlertCircle
        }
      default:
        return {
          color: 'text-slate-400',
          bg: 'bg-slate-500/20',
          border: 'border-slate-500/50',
          icon: AlertCircle
        }
    }
  }

  // Get alert type icon
  const getAlertTypeIcon = (type) => {
    switch (type) {
      case 'URL':
        return Globe
      case 'IP':
        return Server
      case 'EMAIL':
        return Mail
      case 'PASSWORD':
        return Lock
      default:
        return Shield
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diff = now - alertTime
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes}m ago`
    } else if (hours < 24) {
      return `${hours}h ago`
    } else {
      return `${days}d ago`
    }
  }

  const formatFullTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Statistics
  const stats = {
    total: alerts.length,
    unread: alerts.filter(a => !a.read).length,
    critical: alerts.filter(a => a.severity === 'CRITICAL').length,
    high: alerts.filter(a => a.severity === 'HIGH').length,
    totalImpact: alerts.reduce((sum, a) => sum + Math.abs(a.scoreImpact), 0)
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
            <div className="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg">
              <AlertTriangle className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
                Security Alerts
              </h1>
              <p className="text-slate-400 text-lg">Comprehensive threat monitoring and alert management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.total}</div>
              <div className="text-sm text-slate-400">Total Alerts</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-red-400">{stats.unread}</div>
              <div className="text-sm text-slate-400">Unread</div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8"
        >
          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-slate-200 mb-2">{stats.total}</div>
            <div className="text-slate-400 text-sm">Total Alerts</div>
          </div>
          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{stats.unread}</div>
            <div className="text-slate-400 text-sm">Unread</div>
          </div>
          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-red-400 mb-2">{stats.critical}</div>
            <div className="text-slate-400 text-sm">Critical</div>
          </div>
          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">{stats.high}</div>
            <div className="text-slate-400 text-sm">High</div>
          </div>
          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{stats.totalImpact}</div>
            <div className="text-slate-400 text-sm">Total Impact</div>
          </div>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400/50"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400/50"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            {/* Type Filter */}
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400/50"
            >
              <option value="all">All Types</option>
              <option value="url">URL</option>
              <option value="ip">IP</option>
              <option value="email">Email</option>
              <option value="password">Password</option>
            </select>

            {/* Sort Options */}
            <div className="flex space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 focus:outline-none focus:border-cyan-400/50"
              >
                <option value="timestamp">Time</option>
                <option value="severity">Severity</option>
                <option value="type">Type</option>
                <option value="impact">Impact</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 text-sm">
                <input
                  type="checkbox"
                  checked={showRead}
                  onChange={(e) => setShowRead(e.target.checked)}
                  className="rounded border-slate-600/50 bg-slate-800/50 text-cyan-400 focus:ring-cyan-400"
                />
                <span className="text-slate-300">Show read alerts</span>
              </label>

              {stats.unread > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="flex items-center space-x-2 px-3 py-1.5 text-sm bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark all as read</span>
                </button>
              )}
            </div>

            <div className="text-sm text-slate-400">
              Showing {filteredAlerts.length} of {alerts.length} alerts
            </div>
          </div>
        </motion.div>

        {/* Alerts List */}
        <div className="space-y-4">
          {filteredAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">
                {alerts.length === 0 ? 'No alerts yet' : 'No matching alerts'}
              </h3>
              <p className="text-slate-500">
                {alerts.length === 0
                  ? 'Security alerts will appear here when threats are detected.'
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
            </motion.div>
          ) : (
            filteredAlerts.map((alert, index) => {
              const severityInfo = getSeverityInfo(alert.severity)
              const TypeIcon = getAlertTypeIcon(alert.type)

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative bg-[#0f172a]/80 rounded-xl border p-6 hover:scale-[1.01] transition-all duration-200 cursor-pointer ${
                    !alert.read
                      ? 'border-cyan-400/50 bg-slate-800/20'
                      : `${severityInfo.border} ${severityInfo.bg}`
                  }`}
                  onClick={() => markAsRead(alert.id)}
                >
                  {/* Unread indicator */}
                  {!alert.read && (
                    <div className="absolute top-4 right-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
                  )}

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${severityInfo.bg}`}>
                        <TypeIcon className={`w-5 h-5 ${severityInfo.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{alert.title}</h3>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <span className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimestamp(alert.timestamp)}</span>
                          </span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${severityInfo.bg} ${severityInfo.color}`}>
                            {alert.severity}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs bg-slate-600/50 text-slate-300">
                            {alert.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Score Impact */}
                    <div className="flex flex-col items-end space-y-2">
                      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                        alert.scoreImpact < 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                      }`}>
                        <TrendingDown className="w-4 h-4" />
                        <span className="font-bold">{Math.abs(alert.scoreImpact)}</span>
                      </div>
                      <span className="text-xs text-slate-500">Score Impact</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-4 leading-relaxed">{alert.description}</p>

                  {/* Asset and Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-700/50">
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="text-slate-400">
                        <strong className="text-slate-300">Asset:</strong> {alert.affectedAsset}
                      </span>
                      <span className="text-slate-500 text-xs">
                        {formatFullTimestamp(alert.timestamp)}
                      </span>
                    </div>

                    {!alert.read && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          markAsRead(alert.id)
                        }}
                        className="flex items-center space-x-2 px-3 py-1.5 text-xs bg-cyan-600/20 text-cyan-400 rounded-lg hover:bg-cyan-600/30 transition-colors"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Mark as Read</span>
                      </button>
                    )}
                  </div>

                  {/* Critical alert glow */}
                  {alert.severity === 'CRITICAL' && (
                    <motion.div
                      className="absolute inset-0 border border-red-500/30 rounded-xl"
                      animate={{
                        opacity: [0.3, 0.6, 0.3],
                        scale: [1, 1.005, 1]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                  )}
                </motion.div>
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}

export default Alerts
