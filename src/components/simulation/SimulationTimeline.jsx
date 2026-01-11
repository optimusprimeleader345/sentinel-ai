import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Clock,
  AlertTriangle,
  Shield,
  CheckCircle,
  XCircle,
  Zap,
  Activity,
  ArrowRight,
  Target,
  AlertCircle
} from 'lucide-react'

const SimulationTimeline = ({ timeline, isRunning, currentStage, maxStages }) => {
  const getEventIcon = (eventType) => {
    switch (eventType) {
      case 'PHISHING_URL':
      case 'CREDENTIAL_THEFT':
      case 'PASSWORD_BREACH':
        return AlertTriangle
      case 'MALICIOUS_UPLOAD':
      case 'FILE_EXECUTION':
        return Shield
      case 'C2_COMMUNICATION':
      case 'COMMAND_EXECUTION':
        return Zap
      case 'FAILED_LOGIN':
      case 'PRIVILEGE_ESCALATION':
        return Target
      default:
        return Activity
    }
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'CRITICAL': return 'text-red-400 bg-red-500/20 border-red-500/30'
      case 'HIGH': return 'text-orange-400 bg-orange-500/20 border-orange-500/30'
      case 'MEDIUM': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30'
      case 'LOW': return 'text-green-400 bg-green-500/20 border-green-500/30'
      default: return 'text-slate-400 bg-slate-500/20 border-slate-500/30'
    }
  }

  const getEventTypeColor = (eventType) => {
    if (eventType.includes('PHISHING') || eventType.includes('CREDENTIAL')) {
      return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30'
    }
    if (eventType.includes('MALICIOUS') || eventType.includes('EXECUTION')) {
      return 'from-red-500/20 to-orange-500/20 border-red-500/30'
    }
    if (eventType.includes('C2') || eventType.includes('COMMAND')) {
      return 'from-purple-500/20 to-pink-500/20 border-purple-500/30'
    }
    if (eventType.includes('LOGIN') || eventType.includes('PRIVILEGE')) {
      return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30'
    }
    return 'from-slate-500/20 to-slate-600/20 border-slate-500/30'
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Clock className="w-6 h-6 text-cyan-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Attack Timeline</h2>
            <p className="text-slate-400 text-sm">Real-time attack progression and system responses</p>
          </div>
        </div>
        {isRunning && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm font-medium">LIVE SIMULATION</span>
          </div>
        )}
      </div>

      {/* Timeline Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-slate-400">Progress</span>
          <span className="text-sm text-cyan-400">{timeline.length}/{maxStages} events</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(timeline.length / maxStages) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Timeline Events */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {timeline.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <Clock className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No events yet. Select a scenario and start simulation.</p>
            </motion.div>
          ) : (
            timeline.map((event, index) => {
              const Icon = getEventIcon(event.event)
              const isLatest = index === timeline.length - 1 && isRunning

              return (
                <motion.div
                  key={`${event.timestamp}-${index}`}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`relative p-4 rounded-lg border ${getEventTypeColor(event.event)} ${
                    isLatest ? 'ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/20' : ''
                  }`}
                >
                  {/* Connection Line */}
                  {index < timeline.length - 1 && (
                    <div className="absolute left-6 top-full w-px h-4 bg-gradient-to-b from-slate-600 to-transparent" />
                  )}

                  <div className="flex items-start space-x-4">
                    {/* Event Icon */}
                    <div className={`relative p-2 rounded-lg bg-slate-800/50 border border-slate-600/50 ${
                      isLatest ? 'animate-pulse' : ''
                    }`}>
                      <Icon className={`w-5 h-5 ${event.severity === 'CRITICAL' ? 'text-red-400' : 'text-cyan-400'}`} />
                      {isLatest && (
                        <div className="absolute -top-1 -right-1 w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                      )}
                    </div>

                    {/* Event Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-white font-semibold text-sm">
                            {event.event.replace(/_/g, ' ')}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(event.severity)}`}>
                            {event.severity}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 font-mono">
                          {formatTimestamp(event.timestamp)}
                        </span>
                      </div>

                      <p className="text-slate-300 text-sm mb-3 leading-relaxed">
                        {event.description}
                      </p>

                      {/* Event Metadata */}
                      <div className="flex items-center space-x-4 text-xs text-slate-400">
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span>Event Ingested</span>
                        </div>
                        <ArrowRight className="w-3 h-3" />
                        <div className="flex items-center space-x-1">
                          <AlertCircle className="w-3 h-3 text-yellow-400" />
                          <span>SIEM Processing</span>
                        </div>
                        <ArrowRight className="w-3 h-3" />
                        <div className="flex items-center space-x-1">
                          <Shield className="w-3 h-3 text-blue-400" />
                          <span>Response Engine</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status Indicator */}
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 rounded-full ${
                      event.status === 'completed' ? 'bg-green-400' :
                      event.status === 'processing' ? 'bg-yellow-400 animate-pulse' :
                      'bg-slate-400'
                    }`} />
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* Timeline Footer */}
      {timeline.length > 0 && (
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-slate-300">Events Generated: {timeline.length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-slate-300">Active Responses: {timeline.filter(e => e.severity === 'CRITICAL').length}</span>
              </div>
            </div>
            <div className="text-slate-400">
              Last Update: {timeline.length > 0 ? formatTimestamp(timeline[timeline.length - 1].timestamp) : 'N/A'}
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default SimulationTimeline
