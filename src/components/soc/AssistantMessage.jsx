import React from 'react'
import { motion } from 'framer-motion'
import { Shield, AlertTriangle, CheckCircle, Brain, Target, TrendingUp, DollarSign, FileText, Clock } from 'lucide-react'
import MitreBadge from '../MitreBadge'

const AssistantMessage = ({ response, isLoading, userRole }) => {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start space-x-3 mb-6"
      >
        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <span className="text-sm text-slate-400 ml-2">AI SOC Assistant is analyzing...</span>
            </div>
            <div className="text-sm text-slate-500">Generating intelligent security insights</div>
          </div>
        </div>
      </motion.div>
    )
  }

  if (!response) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex items-start space-x-3 mb-6"
    >
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
        <Brain className="w-4 h-4 text-white" />
      </div>
      <div className="flex-1 space-y-4">
        {/* Summary */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-2">
            <Shield className="w-4 h-4 text-blue-400" />
            <h4 className="font-semibold text-white">Summary</h4>
          </div>
          <p className="text-slate-300">{response.summary}</p>
        </div>

        {/* Risk Explanation */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-400" />
            <h4 className="font-semibold text-white">Risk Explanation</h4>
          </div>
          <p className="text-slate-300 leading-relaxed">{response.riskExplanation}</p>
        </div>

        {/* MITRE ATT&CK Mapping */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-4 h-4 text-red-400" />
            <h4 className="font-semibold text-white">MITRE ATT&CK Mapping</h4>
          </div>
          <div className="space-y-3">
            <MitreBadge
              incidentType={response.mitreMapping.technique === 'T0000' ? 'UNKNOWN' : response.mitreMapping.technique}
              size="md"
              showTooltip={true}
            />
            <p className="text-sm text-slate-400">{response.mitreMapping.explanation}</p>
          </div>
        </div>

        {/* Recommended Actions */}
        <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <h4 className="font-semibold text-white">Recommended Actions</h4>
          </div>
          <div className="space-y-2">
            {response.recommendedActions?.map((action, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-start space-x-3 p-2 rounded ${
                  action.includes('URGENT') ? 'bg-red-500/10 border border-red-500/30' : ''
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 ${
                  action.includes('URGENT') ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
                }`}>
                  {index + 1}
                </div>
                <p className={`text-sm ${action.includes('URGENT') ? 'text-red-300 font-medium' : 'text-slate-300'}`}>
                  {action.replace('URGENT: ', '')}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Business Impact (Admin only) */}
        {userRole === 'admin' && response.businessImpact && (
          <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-600/30">
            <div className="flex items-center space-x-2 mb-3">
              <DollarSign className="w-4 h-4 text-yellow-400" />
              <h4 className="font-semibold text-white">Business Impact Assessment</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-slate-400 mb-1">Financial Impact</div>
                <div className="text-sm font-medium text-red-400">{response.businessImpact.financial}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Operational Impact</div>
                <div className="text-sm font-medium text-orange-400">{response.businessImpact.operational}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Reputational Risk</div>
                <div className="text-sm font-medium text-yellow-400">{response.businessImpact.reputational}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 mb-1">Regulatory Risk</div>
                <div className="text-sm font-medium text-purple-400">{response.businessImpact.regulatory}</div>
              </div>
            </div>
          </div>
        )}

        {/* Response Metadata */}
        <div className="flex items-center justify-between text-xs text-slate-500 bg-slate-800/30 rounded px-3 py-2">
          <div className="flex items-center space-x-4">
            <span>AI Confidence: {Math.round(response.confidence * 100)}%</span>
            <span>Response Time: {response.responseTime}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-3 h-3" />
            <span>SOC Assistant</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default AssistantMessage
