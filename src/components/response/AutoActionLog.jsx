import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Activity, Clock, Shield, CheckCircle, XCircle, AlertTriangle, Filter, Search, RefreshCw, TrendingUp, BarChart3, Trash2 } from 'lucide-react'
import responseEngine from '../../services/responseEngine'

function AutoActionLog({ className = '' }) {
  const [auditLogs, setAuditLogs] = useState([])
  const [filteredLogs, setFilteredLogs] = useState([])
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // Get initial logs from response engine
    const logs = responseEngine.getAuditLogs()
    setAuditLogs(logs)
    setFilteredLogs(logs)
  }, [])

  useEffect(() => {
    // Filter logs based on current filter and search
    let filtered = auditLogs

    if (filter !== 'all') {
      filtered = filtered.filter(log => {
        switch (filter) {
          case 'executed':
            return log.result === 'SUCCESS'
          case 'failed':
            return log.result === 'FAILED'
          case 'critical':
            return log.severity === 'CRITICAL'
          case 'recent':
            const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
            return new Date(log.timestamp) > oneHourAgo
          default:
            return true
        }
      })
    }

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.target.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredLogs(filtered)
  }, [auditLogs, filter, searchTerm])

  const getActionIcon = (action) => {
    const iconMap = {
      BLOCK_ASSET: Shield,
      BLOCK_URL: Shield,
      BLOCK_IP: Shield,
      QUARANTINE_FILE: Shield,
      DISABLE_ACCOUNT: Shield,
      ESCALATE_INCIDENT: AlertTriangle,
      NOTIFY_ADMIN: Activity,
      RECOMMEND_BLOCK: Shield,
      RECOMMEND_REVIEW: Activity,
      LOG_ONLY: CheckCircle
    }
    return iconMap[action] || Activity
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'text-red-600 bg-red-100'
      case 'HIGH':
        return 'text-orange-600 bg-orange-100'
      case 'MEDIUM':
        return 'text-yellow-600 bg-yellow-100'
      case 'LOW':
        return 'text-blue-600 bg-blue-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getResultIcon = (result) => {
    return result === 'SUCCESS' ? CheckCircle : XCircle
  }

  const getResultColor = (result) => {
    return result === 'SUCCESS' ? 'text-green-600' : 'text-red-600'
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return date.toLocaleDateString()
  }

  const clearLogs = () => {
    responseEngine.clearAuditLogs()
    setAuditLogs([])
    setFilteredLogs([])
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 shadow-2xl ${className}`}
    >
      <div className="p-6 border-b border-slate-600/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
                Action Audit Trail
              </h3>
              <p className="text-slate-400">
                {filteredLogs.length} automated action{filteredLogs.length !== 1 ? 's' : ''} recorded
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={clearLogs}
              className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition-all duration-200 flex items-center space-x-2 border border-red-500/30"
            >
              <Trash2 className="w-4 h-4" />
              <span className="text-sm font-medium">Clear Logs</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setAuditLogs(responseEngine.getAuditLogs())}
              className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-xl transition-all duration-200 flex items-center space-x-2 border border-blue-500/30"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="text-sm font-medium">Refresh</span>
            </motion.button>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-3 bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50">
            <Filter className="w-5 h-5 text-slate-400" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent text-white border-none outline-none focus:ring-0 text-sm font-medium"
            >
              <option value="all" className="bg-slate-700 text-white">All Actions</option>
              <option value="executed" className="bg-slate-700 text-white">Executed Only</option>
              <option value="failed" className="bg-slate-700 text-white">Failed Only</option>
              <option value="critical" className="bg-slate-700 text-white">Critical Only</option>
              <option value="recent" className="bg-slate-700 text-white">Recent (1h)</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 bg-slate-700/30 px-4 py-3 rounded-xl border border-slate-600/50 flex-1 max-w-md">
            <Search className="w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search actions, targets, or details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent text-white placeholder-slate-400 border-none outline-none focus:ring-0 text-sm font-medium flex-1"
            />
          </div>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-800">
        <AnimatePresence>
          {filteredLogs.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-12 text-center"
            >
              <div className="w-20 h-20 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Activity className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-300 mb-2">No Actions Logged</h3>
              <p className="text-slate-500">Executed actions will appear here with full audit trails</p>
            </motion.div>
          ) : (
            <div className="divide-y divide-slate-600/30">
              {filteredLogs.map((log, index) => {
                const ActionIcon = getActionIcon(log.action)
                const ResultIcon = getResultIcon(log.result)

                return (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.03 }}
                    className="p-6 hover:bg-slate-700/20 transition-all duration-200 group"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`relative p-3 rounded-xl ${getSeverityColor(log.severity)} shadow-md`}>
                        <ActionIcon className="w-5 h-5" />
                        {log.severity === 'CRITICAL' && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <span className="font-bold text-white text-lg">
                              {log.action.replace('_', ' ')}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${getSeverityColor(log.severity)} shadow-sm`}>
                              {log.severity}
                            </span>
                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${getResultColor(log.result) === 'text-green-600' ? 'bg-green-500/20 border border-green-500/30' : 'bg-red-500/20 border border-red-500/30'}`}>
                              <ResultIcon className="w-4 h-4" />
                              <span className="text-sm font-semibold">
                                {log.result}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-700/50 px-3 py-1 rounded-lg">
                            <Clock className="w-4 h-4" />
                            <span className="font-medium">{formatTimestamp(log.timestamp)}</span>
                          </div>
                        </div>

                        <p className="text-slate-300 mb-4 leading-relaxed">
                          {log.details}
                        </p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-6 text-sm">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                              <span className="text-slate-400">Target:</span>
                              <span className="text-cyan-400 font-medium">{log.target}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                              <span className="text-slate-400">Actor:</span>
                              <span className="text-purple-400 font-medium">{log.initiatedBy}</span>
                            </div>
                          </div>

                          {/* Hover Actions */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                            <button className="w-8 h-8 bg-blue-500/20 hover:bg-blue-500/40 rounded-lg flex items-center justify-center transition-colors">
                              <Eye className="w-4 h-4 text-blue-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {filteredLogs.length > 0 && (
        <div className="p-6 border-t border-slate-600/30 bg-gradient-to-r from-slate-800/40 to-slate-700/40">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-sm text-slate-300">
              <TrendingUp className="w-4 h-4" />
              <span>Showing {filteredLogs.length} of {auditLogs.length} actions</span>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-green-400 font-semibold">
                  {auditLogs.filter(l => l.result === 'SUCCESS').length} Successful
                </span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <XCircle className="w-5 h-5 text-red-500" />
                <span className="text-red-400 font-semibold">
                  {auditLogs.filter(l => l.result === 'FAILED').length} Failed
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default AutoActionLog
