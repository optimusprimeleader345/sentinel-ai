import React from 'react'
import { motion } from 'framer-motion'
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react'

const PredictionTimeline = ({ predictions }) => {
  const getTrendIcon = (current, previous) => {
    if (!previous) return <Minus className="w-3 h-3 text-gray-400" />
    if (current > previous) return <TrendingUp className="w-3 h-3 text-red-400" />
    if (current < previous) return <TrendingDown className="w-3 h-3 text-green-400" />
    return <Minus className="w-3 h-3 text-gray-400" />
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'Critical': return 'text-red-400 bg-red-500/20'
      case 'High': return 'text-orange-400 bg-orange-500/20'
      case 'Medium': return 'text-yellow-400 bg-yellow-500/20'
      case 'Low': return 'text-green-400 bg-green-500/20'
      default: return 'text-gray-400 bg-gray-500/20'
    }
  }

  return (
    <div className="space-y-3">
      {predictions.map((prediction, index) => {
        const prevPrediction = predictions[index + 1] // Next item is previous in time
        const prevRiskScore = prevPrediction?.prediction.riskScore || prediction.prediction.riskScore

        return (
          <motion.div
            key={prediction.asset.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg hover:bg-slate-800/50 transition-colors"
          >
            {/* Timeline dot */}
            <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
              prediction.prediction.riskLevel === 'Critical' ? 'bg-red-400' :
              prediction.prediction.riskLevel === 'High' ? 'bg-orange-400' :
              prediction.prediction.riskLevel === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
            }`} />

            {/* Asset info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-white truncate">
                  {prediction.asset.name}
                </p>
                <div className="flex items-center space-x-1">
                  {getTrendIcon(prediction.prediction.riskScore, prevRiskScore)}
                  <span className="text-xs text-slate-400">
                    {prediction.prediction.timeToBreach}h
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-1">
                <div className={`px-2 py-0.5 rounded text-xs font-medium ${getRiskColor(prediction.prediction.riskLevel)}`}>
                  {prediction.prediction.riskLevel}
                </div>
                <div className="flex items-center space-x-2 text-xs">
                  <span className="text-slate-400">Risk:</span>
                  <span className={`font-semibold ${
                    prediction.prediction.riskLevel === 'Critical' ? 'text-red-400' :
                    prediction.prediction.riskLevel === 'High' ? 'text-orange-400' :
                    prediction.prediction.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {prediction.prediction.riskScore}
                  </span>
                </div>
              </div>

              {/* Mini progress bar */}
              <div className="mt-2 w-full bg-slate-700 rounded-full h-1">
                <motion.div
                  className={`h-1 rounded-full ${
                    prediction.prediction.riskLevel === 'Critical' ? 'bg-red-400' :
                    prediction.prediction.riskLevel === 'High' ? 'bg-orange-400' :
                    prediction.prediction.riskLevel === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${prediction.prediction.riskScore}%` }}
                  transition={{ duration: 1, delay: index * 0.1 + 0.2 }}
                />
              </div>
            </div>
          </motion.div>
        )
      })}

      {predictions.length === 0 && (
        <div className="text-center py-8">
          <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">No predictions available</p>
        </div>
      )}
    </div>
  )
}

export default PredictionTimeline
