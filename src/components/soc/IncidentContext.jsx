import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Clock, Shield, Server, Eye, Activity, Target } from 'lucide-react'

const IncidentContext = ({ incident, onAskQuestion }) => {
  if (!incident) return null

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return { bg: 'bg-red-500/20', border: 'border-red-500/30', text: 'text-red-400' }
      case 'high': return { bg: 'bg-orange-500/20', border: 'border-orange-500/30', text: 'text-orange-400' }
      case 'medium': return { bg: 'bg-yellow-500/20', border: 'border-yellow-500/30', text: 'text-yellow-400' }
      default: return { bg: 'bg-green-500/20', border: 'border-green-500/30', text: 'text-green-400' }
    }
  }

  const severityStyle = getSeverityColor(incident.severity)

  const quickQuestions = [
    "Why is this dangerous?",
    "What should I do next?",
    "Explain this incident",
    "What's the business impact?",
    "Show MITRE ATT&CK mapping"
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-slate-800/50 rounded-lg p-4 border ${severityStyle.border} mb-6`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${severityStyle.bg}`}>
            <AlertTriangle className={`w-5 h-5 ${severityStyle.text}`} />
          </div>
          <div>
            <h3 className="font-semibold text-white">{incident.id}</h3>
            <p className="text-sm text-slate-400 capitalize">{incident.incidentType?.replace('-', ' ')} Incident</p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-bold ${severityStyle.bg} ${severityStyle.text}`}>
          {incident.severity?.toUpperCase()}
        </div>
      </div>

      {/* Incident Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <Server className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-xs text-slate-500">Affected Asset</div>
            <div className="text-sm text-white truncate max-w-32" title={incident.affectedAsset}>
              {incident.affectedAsset}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-xs text-slate-500">Detection Source</div>
            <div className="text-sm text-white">{incident.detectionSource}</div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-xs text-slate-500">Time</div>
            <div className="text-sm text-white">
              {new Date(incident.timestamp).toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Target className="w-4 h-4 text-slate-400" />
          <div>
            <div className="text-xs text-slate-500">Risk Score</div>
            <div className="text-sm text-white">{(incident.riskScore * 100).toFixed(0)}%</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mb-4">
        <div className="text-sm text-slate-300 leading-relaxed">
          {incident.description}
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${
            incident.status === 'active' ? 'bg-red-400' :
            incident.status === 'contained' ? 'bg-orange-400' :
            'bg-green-400'
          }`}></div>
          <span className="text-sm text-slate-400 capitalize">{incident.status} Incident</span>
        </div>
        <div className="text-xs text-slate-500">
          {new Date(incident.timestamp).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>

      {/* Quick Questions */}
      <div>
        <h4 className="text-sm font-medium text-white mb-3 flex items-center">
          <Eye className="w-4 h-4 mr-2" />
          Ask the AI SOC Assistant:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {quickQuestions.map((question, index) => (
            <motion.button
              key={index}
              onClick={() => onAskQuestion(question)}
              className="text-left p-2 rounded bg-slate-700/50 hover:bg-slate-700 text-sm text-slate-300 hover:text-white transition-colors border border-slate-600/30 hover:border-slate-500/50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              "{question}"
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default IncidentContext
