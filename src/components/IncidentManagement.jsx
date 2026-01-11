// AI Incident Response Management Component
// Automated incident classification, triage, and response orchestration

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AlertTriangle,
  Shield,
  Clock,
  CheckCircle,
  XCircle,
  Play,
  Pause,
  Eye,
  Zap,
  Target,
  TrendingUp,
  Activity,
  User,
  Server,
  AlertCircle,
  Calendar,
  Filter,
  Search,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import GlassCard from './admin/GlassCard'
import Button from './Button'
import { incidentResponseAPI } from '../lib/api.js'

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [filters, setFilters] = useState({
    status: '',
    severity: '',
    priority: ''
  })
  const [searchTerm, setSearchTerm] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  // Load incidents and stats
  const loadData = async () => {
    try {
      setRefreshing(true)

      const [incidentsRes, statsRes] = await Promise.all([
        incidentResponseAPI.getIncidents(),
        incidentResponseAPI.getIncidentStats()
      ])

      if (incidentsRes.success) {
        setIncidents(incidentsRes.data)
      }

      if (statsRes.success) {
        setStats(statsRes.data)
      }
    } catch (error) {
      console.error('Error loading incident data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Update incident status
  const updateIncidentStatus = async (incidentId, status, notes = '') => {
    try {
      const result = await incidentResponseAPI.updateIncidentStatus(incidentId, {
        status,
        notes
      })

      if (result.success) {
        // Update local state
        setIncidents(prev => prev.map(incident =>
          incident._id === incidentId
            ? { ...incident, status, updatedAt: new Date() }
            : incident
        ))

        // Refresh stats
        loadData()
      }
    } catch (error) {
      console.error('Error updating incident status:', error)
    }
  }

  // Execute response action
  const executeAction = async (incidentId, actionId) => {
    try {
      const result = await incidentResponseAPI.executeManualAction({
        incidentId,
        actionId,
        parameters: {}
      })

      if (result.success) {
        // Refresh incident data
        loadData()
      }
    } catch (error) {
      console.error('Error executing action:', error)
    }
  }

  // Filter incidents
  const filteredIncidents = incidents.filter(incident => {
    const matchesSearch = searchTerm === '' ||
      incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filters.status === '' || incident.status === filters.status
    const matchesSeverity = filters.severity === '' || incident.classification?.severity === filters.severity
    const matchesPriority = filters.priority === '' || incident.priority === parseInt(filters.priority)

    return matchesSearch && matchesStatus && matchesSeverity && matchesPriority
  })

  // Status badges
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      ACTIVE: { color: 'bg-red-500/20 text-red-400', icon: AlertTriangle },
      INVESTIGATING: { color: 'bg-yellow-500/20 text-yellow-400', icon: Eye },
      CONTAINED: { color: 'bg-blue-500/20 text-blue-400', icon: Shield },
      RESOLVED: { color: 'bg-green-500/20 text-green-400', icon: CheckCircle }
    }

    const config = statusConfig[status] || statusConfig.ACTIVE
    const Icon = config.icon

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${config.color}`}>
        <Icon className="w-3 h-3" />
        {status}
      </span>
    )
  }

  // Severity badges
  const SeverityBadge = ({ severity }) => {
    const severityConfig = {
      CRITICAL: 'bg-red-500/20 text-red-400 border-red-500/50',
      HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/50',
      MEDIUM: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
      LOW: 'bg-green-500/20 text-green-400 border-green-500/50'
    }

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium border ${severityConfig[severity] || severityConfig.MEDIUM}`}>
        {severity}
      </span>
    )
  }

  // Priority indicator
  const PriorityIndicator = ({ priority }) => {
    const priorities = ['🔴', '🟠', '🟡', '🟢']
    return <span className="text-lg">{priorities[priority] || '⚪'}</span>
  }

  // Incident card
  const IncidentCard = ({ incident }) => {
    const [expanded, setExpanded] = useState(false)

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-800/50 rounded-lg border border-slate-700/50 overflow-hidden"
      >
        {/* Header */}
        <div
          className="p-4 cursor-pointer hover:bg-slate-700/30 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <PriorityIndicator priority={incident.priority} />
              <div>
                <h3 className="font-semibold text-white">{incident.title}</h3>
                <p className="text-sm text-slate-400 line-clamp-1">{incident.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <StatusBadge status={incident.status} />
              <SeverityBadge severity={incident.classification?.severity} />
              {expanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </div>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-4 mt-2 text-xs text-slate-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(incident.createdAt).toLocaleString()}
            </span>
            <span className="flex items-center gap-1">
              <User className="w-3 h-3" />
              AI Class: {incident.classification?.type || 'Unknown'}
            </span>
            <span className="flex items-center gap-1">
              <Target className="w-3 h-3" />
              Confidence: {incident.classification?.confidence || 0}%
            </span>
          </div>
        </div>

        {/* Expanded content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-slate-700/50"
            >
              <div className="p-4 space-y-4">
                {/* AI Analysis */}
                <div className="bg-slate-900/50 rounded-lg p-3">
                  <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    AI Analysis
                  </h4>
                  <p className="text-sm text-slate-300">
                    {incident.classification?.aiAnalysis || 'Analysis in progress...'}
                  </p>
                </div>

                {/* Response Plan */}
                {incident.responsePlan && (
                  <div className="bg-slate-900/50 rounded-lg p-3">
                    <h4 className="font-medium text-white mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      Response Plan
                    </h4>
                    <div className="space-y-2">
                      <div className="text-sm text-slate-300">
                        Estimated resolution: {Math.round(incident.responsePlan.estimatedResolutionTime / 60)} minutes
                      </div>
                      <div className="text-sm text-slate-300">
                        Automated actions: {incident.responsePlan.automatedActions?.length || 0}
                      </div>
                      <div className="text-sm text-slate-300">
                        Manual approvals needed: {incident.responsePlan.requiredApprovals || 0}
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  {incident.status === 'ACTIVE' && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateIncidentStatus(incident._id, 'INVESTIGATING')}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Investigate
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateIncidentStatus(incident._id, 'CONTAINED')}
                      >
                        <Shield className="w-3 h-3 mr-1" />
                        Contain
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => updateIncidentStatus(incident._id, 'RESOLVED')}
                        className="bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Resolve
                      </Button>
                    </>
                  )}

                  {incident.responsePlan?.automatedActions?.filter(action => action.requiresApproval).map((action, index) => (
                    <Button
                      key={index}
                      size="sm"
                      variant="outline"
                      onClick={() => executeAction(incident._id, `action_${index}`)}
                      className="bg-blue-500/20 border-blue-500/50 text-blue-400 hover:bg-blue-500/30"
                    >
                      <Play className="w-3 h-3 mr-1" />
                      {action.name}
                    </Button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold text-white">AI Incident Response</h1>
          <p className="text-slate-400">Automated threat detection and response orchestration</p>
        </div>

        <Button
          onClick={loadData}
          disabled={refreshing}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </motion.div>

      {/* Stats Overview */}
      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-2">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.activeIncidents || 0}</div>
            <div className="text-sm text-slate-400">Active Incidents</div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-6 h-6 text-orange-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.criticalIncidents || 0}</div>
            <div className="text-sm text-slate-400">Critical Threats</div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-2">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.resolvedIncidents || 0}</div>
            <div className="text-sm text-slate-400">Resolved</div>
          </GlassCard>

          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="w-6 h-6 text-cyan-400" />
            </div>
            <div className="text-2xl font-bold text-white">{stats.totalIncidents || 0}</div>
            <div className="text-sm text-slate-400">Total Incidents</div>
          </GlassCard>
        </motion.div>
      )}

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-4"
      >
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search incidents..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
          />
        </div>

        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INVESTIGATING">Investigating</option>
          <option value="CONTAINED">Contained</option>
          <option value="RESOLVED">Resolved</option>
        </select>

        <select
          value={filters.severity}
          onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
          className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="">All Severity</option>
          <option value="CRITICAL">Critical</option>
          <option value="HIGH">High</option>
          <option value="MEDIUM">Medium</option>
          <option value="LOW">Low</option>
        </select>

        <select
          value={filters.priority}
          onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
          className="px-3 py-2 bg-slate-800/50 border border-slate-700/50 rounded-lg text-white focus:outline-none focus:border-cyan-400"
        >
          <option value="">All Priority</option>
          <option value="0">Critical (P0)</option>
          <option value="1">High (P1)</option>
          <option value="2">Medium (P2)</option>
          <option value="3">Low (P3)</option>
        </select>
      </motion.div>

      {/* Incidents List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        {filteredIncidents.length === 0 ? (
          <GlassCard className="text-center py-8">
            <Shield className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No Incidents Found</h3>
            <p className="text-slate-400">
              {searchTerm || Object.values(filters).some(v => v) ?
                'Try adjusting your filters or search terms.' :
                'AI incident response system is active. High-severity alerts will be automatically processed here.'
              }
            </p>
          </GlassCard>
        ) : (
          filteredIncidents.map((incident) => (
            <IncidentCard key={incident._id} incident={incident} />
          ))
        )}
      </motion.div>
    </div>
  )
}

export default IncidentManagement
