import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  TrendingUp,
  Clock,
  Target,
  ChevronDown,
  ChevronUp,
  Shield,
  Activity,
  Zap,
  Users,
  Server,
  Globe,
  Filter,
  RefreshCw
} from 'lucide-react'

const AlertCorrelation = ({ alerts, onAlertClick, maxHeight = '400px' }) => {
  const [filteredAlerts, setFilteredAlerts] = useState(alerts)
  const [selectedSeverity, setSelectedSeverity] = useState('ALL')
  const [selectedType, setSelectedType] = useState('ALL')
  const [expandedAlert, setExpandedAlert] = useState(null)
  const [sortBy, setSortBy] = useState('timestamp') // timestamp, confidence, severity

  // Update filtered alerts when alerts change
  useEffect(() => {
    let filtered = [...alerts]

    if (selectedSeverity !== 'ALL') {
      filtered = filtered.filter(alert => alert.severity === selectedSeverity)
    }

    if (selectedType !== 'ALL') {
      filtered = filtered.filter(alert => alert.alertType === selectedType)
    }

    // Sort alerts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'confidence':
          return b.confidence - a.confidence
        case 'severity':
          const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }
          return severityOrder[b.severity] - severityOrder[a.severity]
        case 'timestamp':
        default:
          return new Date(b.timestamp) - new Date(a.timestamp)
      }
    })

    setFilteredAlerts(filtered)
  }, [alerts, selectedSeverity, selectedType, sortBy])

  // Get unique alert types
  const alertTypes = [...new Set(alerts.map(alert => alert.alertType))]

  // Get severity counts
  const severityCounts = alerts.reduce((acc, alert) => {
    acc[alert.severity] = (acc[alert.severity] || 0) + 1
    return acc
  }, {})

  // Get alert type icon
  const getAlertIcon = (alertType) => {
    switch (alertType) {
      case 'MULTIPLE_URL_THREATS':
        return Globe
      case 'MULTIPLE_IP_BLOCKS':
        return Server
      case 'PHISHING_CREDENTIAL_CHAIN':
        return Shield
      case 'MALWARE_C2_CHAIN':
        return Zap
      case 'PRIVILEGE_ESCALATION_ATTACK':
        return Target
      case 'HIGH_SEVERITY_EVENT':
        return AlertTriangle
      default:
        return Activity
    }
  }

  // Get severity color
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/20 border-red-500/50 text-red-400'
      case 'HIGH':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-400'
      case 'MEDIUM':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
      case 'LOW':
        return 'bg-green-500/20 border-green-500/50 text-green-400'
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400'
    }
  }

  // Get confidence color
  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-400'
    if (confidence >= 70) return 'text-yellow-400'
    if (confidence >= 50) return 'text-orange-400'
    return 'text-red-400'
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'ESCALATED':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
      case 'RESOLVED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/50'
    }
  }

  // Format timestamp
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date

    if (diff < 60000) { // Less than 1 minute
      return `${Math.floor(diff / 1000)}s ago`
    } else if (diff < 3600000) { // Less than 1 hour
      return `${Math.floor(diff / 60000)}m ago`
    } else if (diff < 86400000) { // Less than 1 day
      return `${Math.floor(diff / 3600000)}h ago`
    } else {
      return date.toLocaleDateString()
    }
  }

  // Get confidence level text
  const getConfidenceLevel = (confidence) => {
    if (confidence >= 90) return 'Very High'
    if (confidence >= 70) return 'High'
    if (confidence >= 50) return 'Medium'
    if (confidence >= 30) return 'Low'
    return 'Very Low'
  }

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Alert Correlation</h3>
              <p className="text-sm text-slate-400">Correlated security alerts with confidence scoring</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
              <span className="text-slate-400">CORRELATING</span>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{filteredAlerts.length} alerts</span>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex items-center space-x-4 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Filters:</span>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option value="ALL">All ({alerts.length})</option>
              <option value="CRITICAL">Critical ({severityCounts.CRITICAL || 0})</option>
              <option value="HIGH">High ({severityCounts.HIGH || 0})</option>
              <option value="MEDIUM">Medium ({severityCounts.MEDIUM || 0})</option>
              <option value="LOW">Low ({severityCounts.LOW || 0})</option>
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Type:</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option value="ALL">All Types</option>
              {alertTypes.map(type => (
                <option key={type} value={type}>
                  {type.replace(/_/g, ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-orange-400"
            >
              <option value="timestamp">Latest First</option>
              <option value="confidence">Confidence</option>
              <option value="severity">Severity</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alert List */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        <AnimatePresence>
          {filteredAlerts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <AlertTriangle className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No alerts match the current filters</p>
              <p className="text-sm text-slate-500">Try adjusting the severity or type filters</p>
            </motion.div>
          ) : (
            filteredAlerts.map((alert, index) => {
              const IconComponent = getAlertIcon(alert.alertType)
              const isExpanded = expandedAlert === alert.id

              return (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors cursor-pointer ${
                    isExpanded ? 'bg-slate-800/50' : ''
                  }`}
                  onClick={() => {
                    setExpandedAlert(isExpanded ? null : alert.id)
                    if (onAlertClick) onAlertClick(alert)
                  }}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {/* Alert Icon */}
                        <div className={`p-2 rounded-lg border ${getSeverityColor(alert.severity)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Alert Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2 flex-wrap gap-1">
                            <span className="font-medium text-white text-sm">
                              {alert.alertType.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(alert.status)}`}>
                              {alert.status}
                            </span>
                          </div>

                          <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                            {alert.description}
                          </p>

                          {/* Alert Stats */}
                          <div className="flex items-center space-x-6 text-xs text-slate-400 mb-2">
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span className={getConfidenceColor(alert.confidence)}>
                                {alert.confidence}% confidence
                              </span>
                              <span className="text-slate-500">
                                ({getConfidenceLevel(alert.confidence)})
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Activity className="w-3 h-3" />
                              <span>{alert.relatedEvents?.length || 0} events</span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(alert.timestamp)}</span>
                            </div>
                          </div>

                          {/* Asset and MITRE info */}
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>
                              <span className="text-slate-400">Asset:</span> {alert.asset}
                            </span>
                            {alert.metadata?.mitreChain && (
                              <span>
                                <span className="text-slate-400">MITRE:</span> {alert.metadata.mitreChain.join(', ')}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setExpandedAlert(isExpanded ? null : alert.id)
                        }}
                        className="p-1 text-slate-400 hover:text-white transition-colors"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-slate-700/50"
                        >
                          <div className="space-y-4">
                            {/* Confidence Breakdown */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <h4 className="text-sm font-medium text-slate-300 mb-2">Confidence Analysis</h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Overall Score:</span>
                                    <span className={`text-sm font-medium ${getConfidenceColor(alert.confidence)}`}>
                                      {alert.confidence}/100
                                    </span>
                                  </div>
                                  <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full transition-all duration-500 ${
                                        alert.confidence >= 90 ? 'bg-green-400' :
                                        alert.confidence >= 70 ? 'bg-yellow-400' :
                                        alert.confidence >= 50 ? 'bg-orange-400' : 'bg-red-400'
                                      }`}
                                      style={{ width: `${alert.confidence}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="text-sm font-medium text-slate-300 mb-2">Alert Statistics</h4>
                                <div className="space-y-2 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Related Events:</span>
                                    <span className="text-slate-300">{alert.relatedEvents?.length || 0}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Event Sources:</span>
                                    <span className="text-slate-300">
                                      {alert.metadata?.sources ? alert.metadata.sources.length : 0}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Last Updated:</span>
                                    <span className="text-slate-300">
                                      {alert.lastUpdated ? formatTimestamp(alert.lastUpdated) : formatTimestamp(alert.timestamp)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Related Events */}
                            {alert.relatedEvents && alert.relatedEvents.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-slate-300 mb-2">Related Event IDs</h4>
                                <div className="bg-slate-800/50 rounded p-3">
                                  <div className="flex flex-wrap gap-1">
                                    {alert.relatedEvents.slice(0, 10).map((eventId, idx) => (
                                      <span
                                        key={idx}
                                        className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 font-mono"
                                      >
                                        {eventId.split('-')[1] || eventId}
                                      </span>
                                    ))}
                                    {alert.relatedEvents.length > 10 && (
                                      <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-400">
                                        +{alert.relatedEvents.length - 10} more
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Metadata */}
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-2">Alert Metadata</h4>
                              <div className="bg-slate-800/50 rounded p-3">
                                <pre className="text-xs text-slate-400 whitespace-pre-wrap">
                                  {JSON.stringify(alert.metadata, null, 2)}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-slate-700/50 bg-slate-900/30">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center space-x-6">
            <span>Total Alerts: {alerts.length}</span>
            <span>Filtered: {filteredAlerts.length}</span>
            <span>Active: {alerts.filter(a => a.status === 'ACTIVE').length}</span>
            <span>Escalated: {alerts.filter(a => a.status === 'ESCALATED').length}</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-400 rounded-full"></div>
              <span>Critical: {severityCounts.CRITICAL || 0}</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
              <span>High: {severityCounts.HIGH || 0}</span>
            </span>
            <span className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
              <span>Medium: {severityCounts.MEDIUM || 0}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertCorrelation
