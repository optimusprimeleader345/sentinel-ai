import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  Shield,
  Zap,
  Globe,
  Server,
  Mail,
  Key,
  Bug,
  Wifi,
  User,
  Database,
  Clock,
  ChevronDown,
  ChevronUp,
  Filter
} from 'lucide-react'

const EventStream = ({ events, maxHeight = '400px' }) => {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [selectedSeverity, setSelectedSeverity] = useState('ALL')
  const [selectedSource, setSelectedSource] = useState('ALL')
  const [expandedEvent, setExpandedEvent] = useState(null)
  const [autoScroll, setAutoScroll] = useState(true)

  // Update filtered events when events change
  useEffect(() => {
    let filtered = events

    if (selectedSeverity !== 'ALL') {
      filtered = filtered.filter(event => event.severity === selectedSeverity)
    }

    if (selectedSource !== 'ALL') {
      filtered = filtered.filter(event => event.source === selectedSource)
    }

    setFilteredEvents(filtered)
  }, [events, selectedSeverity, selectedSource])

  // Get unique sources for filter
  const sources = [...new Set(events.map(event => event.source))]

  // Get severity counts
  const severityCounts = events.reduce((acc, event) => {
    acc[event.severity] = (acc[event.severity] || 0) + 1
    return acc
  }, {})

  // Get event type icon
  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'MALICIOUS_URL':
      case 'PHISHING_URL':
        return Globe
      case 'MALICIOUS_IP':
      case 'IP_BLOCK':
        return Server
      case 'PHISHING_EMAIL':
      case 'MALICIOUS_EMAIL':
        return Mail
      case 'PASSWORD_BREACH':
      case 'CREDENTIAL_THEFT':
        return Key
      case 'MALWARE_DETECTED':
      case 'VIRUS_DETECTED':
        return Bug
      case 'C2_COMMUNICATION':
      case 'SUSPICIOUS_NETWORK':
        return Wifi
      case 'AUTH_FAILURE':
      case 'BRUTE_FORCE':
        return User
      case 'PRIVILEGE_ESCALATION':
      case 'ADMIN_ACCESS':
        return Shield
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

  // Get source color
  const getSourceColor = (source) => {
    switch (source) {
      case 'URL_SCAN':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400'
      case 'IP_SCAN':
        return 'bg-purple-500/20 border-purple-500/50 text-purple-400'
      case 'EMAIL_SCAN':
        return 'bg-green-500/20 border-green-500/50 text-green-400'
      case 'PASSWORD':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-400'
      case 'MALWARE':
        return 'bg-red-500/20 border-red-500/50 text-red-400'
      default:
        return 'bg-gray-500/20 border-gray-500/50 text-gray-400'
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

  return (
    <div className="bg-slate-900/50 rounded-lg border border-slate-700/50 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Activity className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Event Stream</h3>
              <p className="text-sm text-slate-400">Real-time security event monitoring</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-400">LIVE</span>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400">{filteredEvents.length} events</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4">
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
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
            >
              <option value="ALL">All ({events.length})</option>
              <option value="CRITICAL">Critical ({severityCounts.CRITICAL || 0})</option>
              <option value="HIGH">High ({severityCounts.HIGH || 0})</option>
              <option value="MEDIUM">Medium ({severityCounts.MEDIUM || 0})</option>
              <option value="LOW">Low ({severityCounts.LOW || 0})</option>
            </select>
          </div>

          {/* Source Filter */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-500">Source:</span>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-slate-800/50 border border-slate-600/50 rounded px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
            >
              <option value="ALL">All Sources</option>
              {sources.map(source => (
                <option key={source} value={source}>
                  {source.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>

          {/* Auto-scroll toggle */}
          <button
            onClick={() => setAutoScroll(!autoScroll)}
            className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
              autoScroll
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
            }`}
          >
            Auto-scroll {autoScroll ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>

      {/* Event List */}
      <div
        className="overflow-y-auto"
        style={{ maxHeight }}
      >
        <AnimatePresence>
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-8 text-center"
            >
              <Activity className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">No events match the current filters</p>
              <p className="text-sm text-slate-500">Try adjusting the severity or source filters</p>
            </motion.div>
          ) : (
            filteredEvents.map((event, index) => {
              const IconComponent = getEventIcon(event.eventType)
              const isExpanded = expandedEvent === event.id

              return (
                <motion.div
                  key={event.id}
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
                        {/* Event Icon */}
                        <div className={`p-2 rounded-lg border ${getSeverityColor(event.severity)}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>

                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-medium text-white text-sm">
                              {event.eventType.replace(/_/g, ' ')}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSeverityColor(event.severity)}`}>
                              {event.severity}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${getSourceColor(event.source)}`}>
                              {event.source.replace('_', ' ')}
                            </span>
                          </div>

                          <div className="text-sm text-slate-300 mb-1">
                            <span className="font-medium text-slate-400">Asset:</span> {event.asset}
                          </div>

                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{formatTimestamp(event.timestamp)}</span>
                            </span>
                            <span>ID: {event.id.split('-')[1]}</span>
                          </div>
                        </div>
                      </div>

                      {/* Expand/Collapse Button */}
                      <button
                        onClick={() => setExpandedEvent(isExpanded ? null : event.id)}
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
                          <div className="space-y-3">
                            <div>
                              <h4 className="text-sm font-medium text-slate-300 mb-2">Event Metadata</h4>
                              <div className="bg-slate-800/50 rounded p-3">
                                <pre className="text-xs text-slate-400 whitespace-pre-wrap">
                                  {JSON.stringify(event.metadata, null, 2)}
                                </pre>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-xs">
                              <div>
                                <span className="text-slate-500">Processed At:</span>
                                <div className="text-slate-300">{new Date(event.processedAt).toLocaleString()}</div>
                              </div>
                              <div>
                                <span className="text-slate-500">Raw Timestamp:</span>
                                <div className="text-slate-300">{event.timestamp}</div>
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
            <span>Total Events: {events.length}</span>
            <span>Filtered: {filteredEvents.length}</span>
            <span>Last Update: {new Date().toLocaleTimeString()}</span>
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

export default EventStream
