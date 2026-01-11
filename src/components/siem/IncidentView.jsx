import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
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
  TrendingUp,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  RotateCcw,
  Eye,
  Edit,
  Archive,
  ExternalLink,
  Filter,
  Calendar,
  MapPin,
  Hash,
  Layers
} from 'lucide-react'
import MitreBadge from '../MitreBadge'

const IncidentView = ({ incidents, onIncidentUpdate, userRole, maxHeight = '400px' }) => {
  const [filteredIncidents, setFilteredIncidents] = useState(incidents)
  const [selectedStatus, setSelectedStatus] = useState('ALL')
  const [selectedSeverity, setSelectedSeverity] = useState('ALL')
  const [expandedIncident, setExpandedIncident] = useState(null)
  const [sortBy, setSortBy] = useState('createdAt') // createdAt, severity, confidence

  // Update filtered incidents when incidents change
  useEffect(() => {
    let filtered = [...incidents]

    if (selectedStatus !== 'ALL') {
      filtered = filtered.filter(incident => incident.status === selectedStatus)
    }

    if (selectedSeverity !== 'ALL') {
      filtered = filtered.filter(incident => incident.severity === selectedSeverity)
    }

    // Sort incidents
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'severity':
          const severityOrder = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }
          return severityOrder[b.severity] - severityOrder[a.severity]
        case 'confidence':
          return b.confidence - a.confidence
        case 'createdAt':
        default:
          return new Date(b.createdAt) - new Date(a.createdAt)
      }
    })

    setFilteredIncidents(filtered)
  }, [incidents, selectedStatus, selectedSeverity, sortBy])

  // Get unique statuses and severities
  const statuses = [...new Set(incidents.map(incident => incident.status))]
  const severities = [...new Set(incidents.map(incident => incident.severity))]

  // Get status and severity counts
  const statusCounts = incidents.reduce((acc, incident) => {
    acc[incident.status] = (acc[incident.status] || 0) + 1
    return acc
  }, {})

  const severityCounts = incidents.reduce((acc, incident) => {
    acc[incident.severity] = (acc[incident.severity] || 0) + 1
    return acc
  }, {})

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

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'OPEN':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'INVESTIGATING':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50'
      case 'RESOLVED':
        return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'CLOSED':
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/50'
    }
  }

  // Get escalation reason color
  const getEscalationColor = (reason) => {
    switch (reason) {
      case 'CRITICAL_ALERT_ESCALATION':
        return 'bg-red-500/20 text-red-400 border-red-500/50'
      case 'MULTIPLE_HIGH_CONFIDENCE_ALERTS':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/50'
      case 'MITRE_CHAIN_PHISHING_TO_CREDENTIAL_ACCESS':
      case 'MITRE_CHAIN_INITIAL_ACCESS_TO_EXECUTION':
      case 'MITRE_CHAIN_EXECUTION_TO_PERSISTENCE':
      case 'MITRE_CHAIN_PRIVILEGE_ESCALATION_CHAIN':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50'
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50'
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

  // Handle status update
  const handleStatusUpdate = (incidentId, newStatus) => {
    if (onIncidentUpdate) {
      onIncidentUpdate(incidentId, { status: newStatus, lastUpdated: new Date().toISOString() })
    }
  }

  // Get escalation reason display text
  const getEscalationReasonText = (reason) => {
    return reason.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
  }

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Incident Management</h3>
              <p className="text-sm text-slate-400">Security incidents with attack narratives and response tracking</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-slate-400">MONITORING</span>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{filteredIncidents.length} incidents</span>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="flex items-center space-x-4 flex-wrap gap-2">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-400">Filters:</span>
          </div>

          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              <option value="ALL">All ({incidents.length})</option>
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status} ({statusCounts[status] || 0})
                </option>
              ))}
            </select>
          </div>

          {/* Severity Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Severity:</span>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical ({severityCounts.CRITICAL || 0})</option>
              <option value="HIGH">High ({severityCounts.HIGH || 0})</option>
              <option value="MEDIUM">Medium ({severityCounts.MEDIUM || 0})</option>
              <option value="LOW">Low ({severityCounts.LOW || 0})</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-400"
            >
              <option value="createdAt">Latest First</option>
              <option value="severity">Severity</option>
              <option value="confidence">Confidence</option>
            </select>
          </div>
        </div>
      </div>

      {/* Incident List */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        <AnimatePresence>
          {filteredIncidents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <Shield className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No incidents match the current filters</p>
              <p className="text-sm text-slate-500">Try adjusting the status or severity filters</p>
            </motion.div>
          ) : (
            filteredIncidents.map((incident, index) => {
              const isExpanded = expandedIncident === incident.id

              return (
                <motion.div
                  key={incident.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`border-b border-slate-700/30 hover:bg-slate-800/30 transition-colors ${
                    isExpanded ? 'bg-slate-800/50' : ''
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {/* Incident Icon */}
                        <div className={`p-2 rounded-lg border ${getSeverityColor(incident.severity)}`}>
                          <AlertTriangle className="w-4 h-4" />
                        </div>

                        {/* Incident Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-2 flex-wrap gap-1">
                            <span className="font-medium text-white text-sm">
                              Incident {incident.id.split('-')[1]}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(incident.severity)}`}>
                              {incident.severity}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(incident.status)}`}>
                              {incident.status}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getEscalationColor(incident.escalationReason)}`}>
                              {incident.escalationReason.split('_')[0]}
                            </span>
                          </div>

                          <p className="text-sm text-slate-300 mb-3 leading-relaxed">
                            {incident.description}
                          </p>

                          {/* Incident Stats */}
                          <div className="flex items-center space-x-6 text-xs text-slate-400 mb-2 flex-wrap gap-4">
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-3 h-3" />
                              <span className={
                                incident.confidence >= 90 ? 'text-green-400' :
                                incident.confidence >= 70 ? 'text-yellow-400' :
                                incident.confidence >= 50 ? 'text-orange-400' : 'text-red-400'
                              }>
                                {incident.confidence}% confidence
                              </span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Activity className="w-3 h-3" />
                              <span>{incident.metadata?.alertCount || 0} alerts</span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Target className="w-3 h-3" />
                              <span>{incident.metadata?.eventCount || 0} events</span>
                            </div>

                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(incident.createdAt)}</span>
                            </div>
                          </div>

                          {/* Assets and MITRE */}
                          <div className="flex items-center space-x-4 text-xs text-slate-500 flex-wrap gap-4">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{incident.assets?.join(', ') || 'Unknown'}</span>
                            </div>
                            {incident.mitreMapping && (
                              <div className="flex items-center space-x-1">
                                <Layers className="w-3 h-3" />
                                <MitreBadge
                                  incidentType={incident.mitreMapping.primaryTechnique}
                                  size="sm"
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        {/* Status Update Buttons (Admin/Analyst only) */}
                        {(userRole === 'admin' || userRole === 'analyst') && (
                          <div className="flex items-center space-x-1">
                            {incident.status !== 'RESOLVED' && (
                              <button
                                onClick={() => handleStatusUpdate(incident.id, 'RESOLVED')}
                                className="p-1 text-green-400 hover:text-green-300 transition-colors"
                                title="Mark as Resolved"
                              >
                                <CheckCircle className="w-4 h-4" />
                              </button>
                            )}
                            {incident.status !== 'CLOSED' && (
                              <button
                                onClick={() => handleStatusUpdate(incident.id, 'CLOSED')}
                                className="p-1 text-gray-400 hover:text-gray-300 transition-colors"
                                title="Close Incident"
                              >
                                <Archive className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        )}

                        {/* Expand/Collapse Button */}
                        <button
                          onClick={() => setExpandedIncident(isExpanded ? null : incident.id)}
                          className="p-1 text-slate-400 hover:text-white transition-colors"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
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
                          <div className="space-y-6">
                            {/* Attack Chain Timeline */}
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
                                <Activity className="w-4 h-4" />
                                <span>Attack Chain Timeline</span>
                              </h4>
                              <div className="space-y-2">
                                {incident.metadata?.attackChain?.map((step, idx) => (
                                  <div key={idx} className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg">
                                    <div className="flex-shrink-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-xs font-mono text-slate-300">
                                      {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                      <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-sm font-medium text-white">
                                          {step.type.replace(/_/g, ' ')}
                                        </span>
                                        <span className="text-xs text-slate-400">
                                          {formatTimestamp(step.timestamp)}
                                        </span>
                                      </div>
                                      <p className="text-sm text-slate-300">{step.description}</p>
                                      {step.techniques && step.techniques.length > 0 && (
                                        <div className="flex items-center space-x-2 mt-2">
                                          <span className="text-xs text-slate-500">MITRE:</span>
                                          {step.techniques.map((technique, techIdx) => (
                                            <MitreBadge
                                              key={techIdx}
                                              incidentType={technique}
                                              size="sm"
                                            />
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )) || (
                                  <p className="text-sm text-slate-500 italic">No detailed attack chain available</p>
                                )}
                              </div>
                            </div>

                            {/* Incident Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div className="p-4 bg-slate-800/50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <AlertTriangle className="w-4 h-4 text-orange-400" />
                                  <span className="text-sm font-medium text-slate-300">Alert Breakdown</span>
                                </div>
                                <div className="space-y-1 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Total Alerts:</span>
                                    <span className="text-slate-300">{incident.metadata?.alertCount || 0}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Related Events:</span>
                                    <span className="text-slate-300">{incident.metadata?.eventCount || 0}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Data Sources:</span>
                                    <span className="text-slate-300">{incident.metadata?.sources?.length || 0}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 bg-slate-800/50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <TrendingUp className="w-4 h-4 text-green-400" />
                                  <span className="text-sm font-medium text-slate-300">Confidence Analysis</span>
                                </div>
                                <div className="space-y-2">
                                  <div className="flex justify-between items-center">
                                    <span className="text-xs text-slate-400">Overall Score:</span>
                                    <span className={`text-sm font-medium ${
                                      incident.confidence >= 90 ? 'text-green-400' :
                                      incident.confidence >= 70 ? 'text-yellow-400' :
                                      incident.confidence >= 50 ? 'text-orange-400' : 'text-red-400'
                                    }`}>
                                      {incident.confidence}/100
                                    </span>
                                  </div>
                                  <div className="w-full bg-slate-700 rounded-full h-2">
                                    <div
                                      className={`h-2 rounded-full transition-all duration-500 ${
                                        incident.confidence >= 90 ? 'bg-green-400' :
                                        incident.confidence >= 70 ? 'bg-yellow-400' :
                                        incident.confidence >= 50 ? 'bg-orange-400' : 'bg-red-400'
                                      }`}
                                      style={{ width: `${incident.confidence}%` }}
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="p-4 bg-slate-800/50 rounded-lg">
                                <div className="flex items-center space-x-2 mb-2">
                                  <Calendar className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm font-medium text-slate-300">Timeline</span>
                                </div>
                                <div className="space-y-1 text-xs">
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Created:</span>
                                    <span className="text-slate-300">{new Date(incident.createdAt).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Last Updated:</span>
                                    <span className="text-slate-300">{new Date(incident.lastUpdated).toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span className="text-slate-400">Escalation:</span>
                                    <span className="text-slate-300">{getEscalationReasonText(incident.escalationReason)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* MITRE ATT&CK Analysis */}
                            {incident.mitreMapping && (
                              <div>
                                <h4 className="text-sm font-medium text-slate-300 mb-3 flex items-center space-x-2">
                                  <Layers className="w-4 h-4" />
                                  <span>MITRE ATT&CK Analysis</span>
                                </h4>
                                <div className="p-4 bg-slate-800/50 rounded-lg">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <div className="flex items-center space-x-2 mb-2">
                                        <span className="text-sm text-slate-400">Primary Technique:</span>
                                        <MitreBadge
                                          incidentType={incident.mitreMapping.primaryTechnique}
                                          size="sm"
                                        />
                                      </div>
                                      <div className="text-sm text-slate-300 mb-2">
                                        <span className="text-slate-400">Tactic:</span> {incident.mitreMapping.tactic}
                                      </div>
                                      <div className="text-sm text-slate-300">
                                        <span className="text-slate-400">Confidence:</span> {incident.mitreMapping.confidence}%
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-sm text-slate-400 mb-2">All Techniques:</div>
                                      <div className="flex flex-wrap gap-1">
                                        {incident.mitreMapping.techniques.map((technique, idx) => (
                                          <MitreBadge
                                            key={idx}
                                            incidentType={technique}
                                            size="sm"
                                          />
                                        ))}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}

                            {/* Related Alert IDs */}
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-2">Related Alert IDs</h4>
                              <div className="bg-slate-800/50 rounded p-3">
                                <div className="flex flex-wrap gap-1">
                                  {incident.alerts.slice(0, 10).map((alertId, idx) => (
                                    <span
                                      key={idx}
                                      className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300 font-mono"
                                    >
                                      {alertId.split('-')[1] || alertId}
                                    </span>
                                  ))}
                                  {incident.alerts.length > 10 && (
                                    <span className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-400">
                                      +{incident.alerts.length - 10} more
                                    </span>
                                  )}
                                </div>
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
        <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-4">
          <div className="flex items-center space-x-6">
            <span>Total Incidents: {incidents.length}</span>
            <span>Filtered: {filteredIncidents.length}</span>
            <span>Open: {incidents.filter(i => i.status === 'OPEN').length}</span>
            <span>Investigating: {incidents.filter(i => i.status === 'INVESTIGATING').length}</span>
            <span>Resolved: {incidents.filter(i => i.status === 'RESOLVED').length}</span>
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

export default IncidentView
