import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Globe,
  Mail,
  Lock,
  Server,
  Calendar,
  Filter,
  Search,
  RefreshCw
} from 'lucide-react'

const SecurityTimeline = () => {
  const [timelineEvents, setTimelineEvents] = useState([])
  const [filteredEvents, setFilteredEvents] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock threat timeline data
  const mockTimelineData = [
    {
      id: 1,
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      type: 'URL Scan',
      severity: 'high',
      description: 'Malicious URL detected in recent scan',
      affectedAsset: 'marketing-site.com/login',
      riskDelta: -30,
      details: 'URL contained malware distribution payload',
      status: 'blocked',
      source: 'Automated Scanner'
    },
    {
      id: 2,
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      type: 'IP Scan',
      severity: 'critical',
      description: 'Blacklisted IP address blocked',
      affectedAsset: '203.0.113.195',
      riskDelta: -30,
      details: 'IP associated with known botnet C2 server',
      status: 'quarantined',
      source: 'Threat Intelligence'
    },
    {
      id: 3,
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
      type: 'Email Scan',
      severity: 'medium',
      description: 'Phishing email detected and quarantined',
      affectedAsset: 'employee@company.com',
      riskDelta: -20,
      details: 'Email contained spoofed sender and malicious link',
      status: 'quarantined',
      source: 'Email Gateway'
    },
    {
      id: 4,
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      type: 'Password Breach',
      severity: 'high',
      description: 'Credential breach detected',
      affectedAsset: 'admin@company.com',
      riskDelta: -25,
      details: 'Password found in breach database (150 occurrences)',
      status: 'flagged',
      source: 'Password Monitor'
    },
    {
      id: 5,
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      type: 'URL Scan',
      severity: 'medium',
      description: 'Suspicious URL flagged for review',
      affectedAsset: 'suspicious-link.com',
      riskDelta: -15,
      details: 'URL matched phishing pattern but low confidence',
      status: 'monitored',
      source: 'URL Scanner'
    },
    {
      id: 6,
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      type: 'IP Scan',
      severity: 'low',
      description: 'IP with minor abuse reports',
      affectedAsset: '192.168.1.100',
      riskDelta: -10,
      details: 'IP has 3 minor abuse reports in last 30 days',
      status: 'logged',
      source: 'IP Reputation'
    },
    {
      id: 7,
      timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
      type: 'Email Scan',
      severity: 'low',
      description: 'Clean email processed successfully',
      affectedAsset: 'user@company.com',
      riskDelta: 0,
      details: 'Email passed all security checks',
      status: 'allowed',
      source: 'Email Scanner'
    },
    {
      id: 8,
      timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
      type: 'Password Breach',
      severity: 'critical',
      description: 'High-risk password breach detected',
      affectedAsset: 'security@company.com',
      riskDelta: -40,
      details: 'Password breached over 1000 times in multiple databases',
      status: 'critical',
      source: 'Breach Monitor'
    }
  ]

  useEffect(() => {
    loadTimelineEvents()
  }, [])

  useEffect(() => {
    filterEvents()
  }, [timelineEvents, activeFilter, searchTerm])

  const loadTimelineEvents = async () => {
    setLoading(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setTimelineEvents(mockTimelineData)
    setLoading(false)
  }

  const filterEvents = () => {
    let filtered = timelineEvents

    // Filter by type
    if (activeFilter !== 'all') {
      filtered = filtered.filter(event => {
        switch (activeFilter) {
          case 'threats':
            return ['high', 'critical'].includes(event.severity)
          case 'scans':
            return event.type.includes('Scan')
          case 'breaches':
            return event.type === 'Password Breach'
          default:
            return true
        }
      })
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.affectedAsset.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Sort by timestamp (newest first)
    filtered.sort((a, b) => b.timestamp - a.timestamp)

    setFilteredEvents(filtered)
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'URL Scan':
        return Globe
      case 'IP Scan':
        return Server
      case 'Email Scan':
        return Mail
      case 'Password Breach':
        return Lock
      default:
        return AlertTriangle
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-500/20 border-red-500/50 text-red-400'
      case 'high':
        return 'bg-orange-500/20 border-orange-500/50 text-orange-400'
      case 'medium':
        return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-400'
      case 'low':
        return 'bg-blue-500/20 border-blue-500/50 text-blue-400'
      default:
        return 'bg-slate-500/20 border-slate-500/50 text-slate-400'
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'blocked':
      case 'quarantined':
        return 'text-red-400'
      case 'flagged':
        return 'text-orange-400'
      case 'monitored':
        return 'text-yellow-400'
      case 'allowed':
        return 'text-green-400'
      case 'logged':
        return 'text-blue-400'
      default:
        return 'text-slate-400'
    }
  }

  const formatTimestamp = (timestamp) => {
    const now = new Date()
    const diff = now - timestamp
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
    return timestamp.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
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
              <Clock className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                Threat Timeline
              </h1>
              <p className="text-slate-400 text-lg">Chronological security events and threat activity</p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loadTimelineEvents}
            disabled={loading}
            className="flex items-center space-x-2 px-4 py-2 bg-cyan-600/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-600/30 transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </motion.button>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'all', label: 'All Events', count: timelineEvents.length },
                { id: 'threats', label: 'High Threats', count: timelineEvents.filter(e => ['high', 'critical'].includes(e.severity)).length },
                { id: 'scans', label: 'Security Scans', count: timelineEvents.filter(e => e.type.includes('Scan')).length },
                { id: 'breaches', label: 'Breach Alerts', count: timelineEvents.filter(e => e.type === 'Password Breach').length }
              ].map(({ id, label, count }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                    activeFilter === id
                      ? 'bg-cyan-600/20 border-cyan-400/50 text-cyan-400'
                      : 'bg-slate-800/50 border-slate-600/50 text-slate-400 hover:border-cyan-400/30'
                  }`}
                >
                  <span>{label}</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeFilter === id ? 'bg-cyan-500/20' : 'bg-slate-600/50'
                  }`}>
                    {count}
                  </span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search events, assets, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-400/50 focus:bg-slate-800/70"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-purple-400 to-blue-400"></div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
              <span className="ml-4 text-slate-400">Loading threat timeline...</span>
            </div>
          ) : filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Shield className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-400 mb-2">
                {searchTerm || activeFilter !== 'all' ? 'No matching events found' : 'No threats detected yet'}
              </h3>
              <p className="text-slate-500">
                {searchTerm || activeFilter !== 'all'
                  ? 'Try adjusting your search or filter criteria'
                  : 'Security events will appear here as they are detected'
                }
              </p>
            </motion.div>
          ) : (
            <div className="space-y-8">
              {filteredEvents.map((event, index) => {
                const EventIcon = getEventIcon(event.type)
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative flex items-start space-x-6"
                  >
                    {/* Timeline Node */}
                    <div className={`relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 ${
                      event.severity === 'critical' ? 'bg-red-500/20 border-red-500' :
                      event.severity === 'high' ? 'bg-orange-500/20 border-orange-500' :
                      event.severity === 'medium' ? 'bg-yellow-500/20 border-yellow-500' :
                      'bg-blue-500/20 border-blue-500'
                    }`}>
                      <EventIcon className={`w-6 h-6 ${
                        event.severity === 'critical' ? 'text-red-400' :
                        event.severity === 'high' ? 'text-orange-400' :
                        event.severity === 'medium' ? 'text-yellow-400' :
                        'text-blue-400'
                      }`} />
                    </div>

                    {/* Event Card */}
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex-1 bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 hover:border-cyan-400/30 transition-all duration-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-semibold text-white">{event.type}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getSeverityColor(event.severity)}`}>
                              {event.severity}
                            </span>
                            <span className={`text-sm font-medium capitalize ${getStatusColor(event.status)}`}>
                              {event.status}
                            </span>
                          </div>
                          <p className="text-slate-300 text-lg mb-3">{event.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-slate-400">
                            <span className="flex items-center space-x-2">
                              <Shield className="w-4 h-4" />
                              <span>{event.affectedAsset}</span>
                            </span>
                            <span className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span>{formatTimestamp(event.timestamp)}</span>
                            </span>
                            <span className="text-slate-500">{event.source}</span>
                          </div>
                        </div>

                        {/* Risk Delta */}
                        <div className="flex flex-col items-end space-y-2">
                          <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                            event.riskDelta < 0 ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {event.riskDelta < 0 ? <TrendingDown className="w-4 h-4" /> : <TrendingUp className="w-4 h-4" />}
                            <span className="font-bold">{Math.abs(event.riskDelta)}</span>
                          </div>
                          <span className="text-xs text-slate-500">Risk Impact</span>
                        </div>
                      </div>

                      {/* Event Details */}
                      <div className="border-t border-slate-700/50 pt-4">
                        <p className="text-slate-400 text-sm mb-2">{event.details}</p>
                        <div className="text-xs text-slate-500">
                          Full timestamp: {formatFullTimestamp(event.timestamp)}
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>

        {/* Timeline Stats */}
        {!loading && filteredEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-slate-200 mb-2">{filteredEvents.length}</div>
              <div className="text-slate-400 text-sm">Total Events</div>
            </div>
            <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-red-400 mb-2">
                {filteredEvents.filter(e => e.severity === 'critical').length}
              </div>
              <div className="text-slate-400 text-sm">Critical Threats</div>
            </div>
            <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-orange-400 mb-2">
                {filteredEvents.filter(e => e.severity === 'high').length}
              </div>
              <div className="text-slate-400 text-sm">High Risk Events</div>
            </div>
            <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">
                {filteredEvents.filter(e => e.riskDelta < 0).reduce((sum, e) => sum + Math.abs(e.riskDelta), 0)}
              </div>
              <div className="text-slate-400 text-sm">Risk Impact</div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default SecurityTimeline
