import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  AlertTriangle,
  Info,
  AlertCircle,
  Globe,
  Server,
  Mail,
  Lock,
  Clock,
  User,
  CheckCircle,
  XCircle
} from 'lucide-react'

const AuditLogTable = ({ auditLogs, isLoading = false }) => {
  const [sortBy, setSortBy] = useState('timestamp')
  const [sortOrder, setSortOrder] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize] = useState(25)

  // Sort logs
  const sortedLogs = [...auditLogs].sort((a, b) => {
    let aValue = a[sortBy]
    let bValue = b[sortBy]

    if (sortBy === 'timestamp') {
      aValue = new Date(aValue)
      bValue = new Date(bValue)
    }

    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  // Paginate logs
  const totalPages = Math.ceil(sortedLogs.length / pageSize)
  const paginatedLogs = sortedLogs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  )

  // Handle sorting
  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('desc')
    }
    setCurrentPage(1)
  }

  // Get severity styling
  const getSeverityStyle = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          border: 'border-red-200',
          icon: AlertTriangle
        }
      case 'HIGH':
        return {
          bg: 'bg-orange-100',
          text: 'text-orange-800',
          border: 'border-orange-200',
          icon: AlertCircle
        }
      case 'MEDIUM':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          border: 'border-yellow-200',
          icon: AlertCircle
        }
      case 'LOW':
        return {
          bg: 'bg-blue-100',
          text: 'text-blue-800',
          border: 'border-blue-200',
          icon: Info
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          border: 'border-gray-200',
          icon: Info
        }
    }
  }

  // Get outcome styling
  const getOutcomeStyle = (outcome) => {
    switch (outcome) {
      case 'SUCCESS':
        return {
          bg: 'bg-green-100',
          text: 'text-green-800',
          icon: CheckCircle
        }
      case 'BLOCKED':
        return {
          bg: 'bg-red-100',
          text: 'text-red-800',
          icon: XCircle
        }
      case 'FAILED':
        return {
          bg: 'bg-yellow-100',
          text: 'text-yellow-800',
          icon: AlertTriangle
        }
      default:
        return {
          bg: 'bg-gray-100',
          text: 'text-gray-800',
          icon: Info
        }
    }
  }

  // Get type icon
  const getTypeIcon = (type) => {
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

  // Get role badge color
  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800'
      case 'analyst':
        return 'bg-orange-100 text-orange-800'
      case 'user':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  // Sort indicator
  const SortIndicator = ({ column }) => {
    if (sortBy !== column) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />
    }
    return sortOrder === 'asc'
      ? <ArrowUp className="w-4 h-4 text-blue-600" />
      : <ArrowDown className="w-4 h-4 text-blue-600" />
  }

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
        <div className="animate-pulse">
          {/* Header */}
          <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-700/50">
            <div className="h-5 bg-slate-700 rounded w-48"></div>
            <div className="h-4 bg-slate-700 rounded w-64 mt-2"></div>
          </div>

          {/* Table rows */}
          {[...Array(10)].map((_, i) => (
            <div key={i} className="px-6 py-4 border-b border-slate-700/30">
              <div className="grid grid-cols-8 gap-4">
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-700 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl overflow-hidden">
      {/* Table Header */}
      <div className="bg-slate-900/50 px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Audit Events</h3>
            <p className="text-sm text-slate-400">
              {auditLogs.length} total events • Page {currentPage} of {totalPages}
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-900/50 border-b border-slate-700/50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-800/50"
                onClick={() => handleSort('timestamp')}
              >
                <div className="flex items-center space-x-1">
                  <span>Timestamp</span>
                  <SortIndicator column="timestamp" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-800/50"
                onClick={() => handleSort('actor')}
              >
                <div className="flex items-center space-x-1">
                  <span>Actor</span>
                  <SortIndicator column="actor" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-800/50"
                onClick={() => handleSort('action')}
              >
                <div className="flex items-center space-x-1">
                  <span>Action</span>
                  <SortIndicator column="action" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-800/50"
                onClick={() => handleSort('resource')}
              >
                <div className="flex items-center space-x-1">
                  <span>Resource</span>
                  <SortIndicator column="resource" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-800/50"
                onClick={() => handleSort('type')}
              >
                <div className="flex items-center space-x-1">
                  <span>Type</span>
                  <SortIndicator column="type" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-800/50"
                onClick={() => handleSort('severity')}
              >
                <div className="flex items-center space-x-1">
                  <span>Severity</span>
                  <SortIndicator column="severity" />
                </div>
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:bg-slate-800/50"
                onClick={() => handleSort('outcome')}
              >
                <div className="flex items-center space-x-1">
                  <span>Outcome</span>
                  <SortIndicator column="outcome" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {paginatedLogs.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center">
                  <Shield className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                  <h3 className="text-sm font-medium text-slate-300 mb-1">No audit events found</h3>
                  <p className="text-sm text-slate-500">Try adjusting your filters or date range.</p>
                </td>
              </tr>
            ) : (
              paginatedLogs.map((log, index) => {
                const severityStyle = getSeverityStyle(log.severity)
                const outcomeStyle = getOutcomeStyle(log.outcome)
                const TypeIcon = getTypeIcon(log.type)
                const SeverityIcon = severityStyle.icon
                const OutcomeIcon = outcomeStyle.icon

                return (
                  <motion.tr
                    key={log.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-slate-800/30"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <div className="flex flex-col">
                        <span className="font-medium">{formatTimestamp(log.timestamp).split(',')[0]}</span>
                        <span className="text-slate-500 text-xs">{formatTimestamp(log.timestamp).split(',')[1]}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <div>
                          <div className="text-sm font-medium text-white">{log.actor}</div>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(log.role)}`}>
                            {log.role}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      {log.action}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                      <div className="max-w-xs truncate" title={log.resource}>
                        {log.resource}
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <TypeIcon className="w-4 h-4 text-slate-400" />
                        <span className="text-sm font-medium text-white">{log.type}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${severityStyle.bg} ${severityStyle.text} border ${severityStyle.border}`}>
                        <SeverityIcon className="w-3 h-3 mr-1" />
                        {log.severity}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${outcomeStyle.bg} ${outcomeStyle.text}`}>
                        <OutcomeIcon className="w-3 h-3 mr-1" />
                        {log.outcome}
                      </span>
                    </td>
                  </motion.tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-slate-900/50 px-6 py-4 border-t border-slate-700/50 flex items-center justify-between">
          <div className="text-sm text-slate-300">
            Showing {((currentPage - 1) * pageSize) + 1} to {Math.min(currentPage * pageSize, sortedLogs.length)} of {sortedLogs.length} results
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="flex items-center px-3 py-1 text-sm font-medium text-slate-400 bg-slate-800/50 border border-slate-600 rounded-md hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </button>

            <div className="flex space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                const pageNum = i + 1
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-all ${
                      currentPage === pageNum
                        ? 'text-cyan-400 bg-cyan-500/20 border border-cyan-500/30'
                        : 'text-slate-400 bg-slate-800/50 border border-slate-600 hover:bg-slate-700/50'
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              })}
            </div>

            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="flex items-center px-3 py-1 text-sm font-medium text-slate-400 bg-slate-800/50 border border-slate-600 rounded-md hover:bg-slate-700/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AuditLogTable
