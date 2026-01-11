import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Clock, Target, AlertTriangle, TrendingUp, Zap } from 'lucide-react'

const RiskScoreCard = ({ asset, prediction, onClick }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical': return 'from-red-500 to-red-600'
      case 'High': return 'from-orange-500 to-orange-600'
      case 'Medium': return 'from-yellow-500 to-yellow-600'
      case 'Low': return 'from-green-500 to-green-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getRiskBgColor = (level) => {
    switch (level) {
      case 'Critical': return 'bg-red-500/10 border-red-500/20'
      case 'High': return 'bg-orange-500/10 border-orange-500/20'
      case 'Medium': return 'bg-yellow-500/10 border-yellow-500/20'
      case 'Low': return 'bg-green-500/10 border-green-500/20'
      default: return 'bg-gray-500/10 border-gray-500/20'
    }
  }

  const getTextColor = (level) => {
    switch (level) {
      case 'Critical': return 'text-red-400'
      case 'High': return 'text-orange-400'
      case 'Medium': return 'text-yellow-400'
      case 'Low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <motion.div
      className={`cursor-pointer ${getRiskBgColor(prediction.riskLevel)} rounded-xl border p-4 transition-all hover:scale-105 hover:shadow-lg`}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 bg-gradient-to-br ${getRiskColor(prediction.riskLevel)} rounded-lg`}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-sm">{asset.name}</h3>
            <p className="text-xs text-slate-400">{asset.type}</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getTextColor(prediction.riskLevel)} bg-current/20`}>
          {prediction.riskLevel}
        </div>
      </div>

      {/* Risk Score */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-400">Risk Score</span>
          <span className={`text-lg font-bold ${getTextColor(prediction.riskLevel)}`}>
            {prediction.riskScore}
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full bg-gradient-to-r ${getRiskColor(prediction.riskLevel)}`}
            initial={{ width: 0 }}
            animate={{ width: `${prediction.riskScore}%` }}
            transition={{ duration: 1, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span className="text-slate-400">Breach in:</span>
        </div>
        <div className="text-white font-semibold text-right">
          {prediction.timeToBreach}h
        </div>

        <div className="flex items-center space-x-1">
          <Target className="w-3 h-3 text-slate-400" />
          <span className="text-slate-400">Confidence:</span>
        </div>
        <div className="text-cyan-400 font-semibold text-right">
          {prediction.confidence}%
        </div>
      </div>

      {/* Attack Vector */}
      <div className="mt-3 pt-3 border-t border-slate-600">
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">Predicted Attack:</span>
          <span className="text-xs text-red-400 font-medium">
            {prediction.predictedAttackVector}
          </span>
        </div>
      </div>

      {/* Vulnerability Count */}
      <div className="mt-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">Vulnerabilities:</span>
        <span className={`font-semibold ${
          asset.vulnerabilities > 3 ? 'text-red-400' :
          asset.vulnerabilities > 1 ? 'text-orange-400' : 'text-green-400'
        }`}>
          {asset.vulnerabilities}
        </span>
      </div>
    </motion.div>
  )
}

export default RiskScoreCard
