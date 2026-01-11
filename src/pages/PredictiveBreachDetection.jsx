import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Shield,
  Clock,
  Target,
  BarChart3,
  RefreshCw,
  Eye,
  Zap,
  Activity,
  Timer
} from 'lucide-react'
import { getPredictiveAnalysis, getPredictionMetrics, getPredictionAlerts } from '../lib/api.js'
import RiskScoreCard from '../components/RiskScoreCard.jsx'
import PredictionTimeline from '../components/PredictionTimeline.jsx'

const PredictiveBreachDetection = () => {
  const [predictions, setPredictions] = useState([])
  const [metrics, setMetrics] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAsset, setSelectedAsset] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    loadData()
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      loadData(false) // Silent refresh
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const loadData = async (showLoading = true) => {
    if (showLoading) setLoading(true)
    try {
      const [predictionsRes, metricsRes, alertsRes] = await Promise.all([
        getPredictiveAnalysis(),
        getPredictionMetrics(),
        getPredictionAlerts()
      ])

      if (predictionsRes.data) {
        setPredictions(predictionsRes.data.data || [])
      }
      if (metricsRes.data) {
        setMetrics(metricsRes.data.data)
      }
      if (alertsRes.data) {
        setAlerts(alertsRes.data.data || [])
      }

      setLastUpdate(new Date())
    } catch (error) {
      console.error('Failed to load predictive data:', error)
    } finally {
      if (showLoading) setLoading(false)
    }
  }

  const getRiskSummary = () => {
    const critical = predictions.filter(p => p.prediction.riskLevel === 'Critical').length
    const high = predictions.filter(p => p.prediction.riskLevel === 'High').length
    const medium = predictions.filter(p => p.prediction.riskLevel === 'Medium').length
    const low = predictions.filter(p => p.prediction.riskLevel === 'Low').length

    return { critical, high, medium, low, total: predictions.length }
  }

  const riskSummary = getRiskSummary()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
              <p className="text-white text-lg">AI Analyzing Risk Patterns...</p>
              <p className="text-slate-400 text-sm">Running machine learning algorithms</p>
            </div>
          </div>
        </div>
      </div>
    )
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
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold neon-text">AI Predictive Breach Detection</h1>
              <p className="text-slate-400 text-lg">Machine learning predicts cyber attacks before they happen</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-slate-400">Last Updated</div>
              <div className="text-white font-mono">{lastUpdate.toLocaleTimeString()}</div>
            </div>
            <button
              onClick={() => loadData(true)}
              className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 px-4 py-2 rounded-lg text-white font-medium transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh AI</span>
            </button>
          </div>
        </motion.div>

        {/* AI Metrics Overview */}
        {metrics && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">AI Accuracy</p>
                  <p className="text-3xl font-bold text-green-400">{metrics.overallAccuracy}%</p>
                  <p className="text-xs text-slate-500 mt-1">94.7% prediction accuracy</p>
                </div>
                <div className="p-3 bg-green-500/20 rounded-lg">
                  <Target className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">True Positives</p>
                  <p className="text-3xl font-bold text-blue-400">{metrics.truePositives}</p>
                  <p className="text-xs text-slate-500 mt-1">Correct predictions</p>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Model Version</p>
                  <p className="text-3xl font-bold text-purple-400">{metrics.modelVersion}</p>
                  <p className="text-xs text-slate-500 mt-1">Latest AI model</p>
                </div>
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </div>

            <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-400 text-sm">Training Data</p>
                  <p className="text-3xl font-bold text-cyan-400">{metrics.trainingDataSize.toLocaleString()}</p>
                  <p className="text-xs text-slate-500 mt-1">Data points used</p>
                </div>
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-cyan-400" />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Risk Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8"
        >
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{riskSummary.critical}</div>
            <div className="text-sm text-red-300">Critical Risk</div>
          </div>
          <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{riskSummary.high}</div>
            <div className="text-sm text-orange-300">High Risk</div>
          </div>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{riskSummary.medium}</div>
            <div className="text-sm text-yellow-300">Medium Risk</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{riskSummary.low}</div>
            <div className="text-sm text-green-300">Low Risk</div>
          </div>
          <div className="bg-slate-500/10 border border-slate-500/20 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-slate-400">{riskSummary.total}</div>
            <div className="text-sm text-slate-300">Total Assets</div>
          </div>
        </motion.div>



        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Risk Score Cards */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                <Shield className="w-6 h-6 text-cyan-400" />
                <span>Asset Risk Assessment</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {predictions.slice(0, 8).map((prediction, index) => (
                  <motion.div
                    key={prediction.asset.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <RiskScoreCard
                      asset={prediction.asset}
                      prediction={prediction.prediction}
                      onClick={() => setSelectedAsset(prediction)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Prediction Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
              <Activity className="w-6 h-6 text-green-400" />
              <span>Risk Timeline</span>
            </h2>

            <PredictionTimeline predictions={predictions.slice(0, 5)} />
          </motion.div>
        </div>

        {/* AI Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
            <Eye className="w-6 h-6 text-purple-400" />
            <span>AI Predictive Insights</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Top Risk Factors</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-slate-300">Unpatched vulnerabilities</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-slate-300">Time since last scan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <span className="text-slate-300">Global threat intelligence</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Predicted Attack Vectors</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-slate-300">API exploitation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-slate-300">SQL injection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-slate-300">Phishing campaigns</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-2">Recommended Actions</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center space-x-1">
                  <Timer className="w-3 h-3 text-cyan-400" />
                  <span className="text-slate-300">Apply critical patches</span>
                </li>
                <li className="flex items-center space-x-1">
                  <Shield className="w-3 h-3 text-cyan-400" />
                  <span className="text-slate-300">Enable MFA everywhere</span>
                </li>
                <li className="flex items-center space-x-1">
                  <Activity className="w-3 h-3 text-cyan-400" />
                  <span className="text-slate-300">Run security scans</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Asset Details Modal */}
        <AnimatePresence>
          {selectedAsset && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedAsset(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-slate-800 rounded-xl p-6 max-w-2xl w-full mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      selectedAsset.prediction.riskLevel === 'Critical' ? 'bg-red-500' :
                      selectedAsset.prediction.riskLevel === 'High' ? 'bg-orange-500' :
                      selectedAsset.prediction.riskLevel === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}>
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{selectedAsset.asset.name}</h2>
                      <p className="text-slate-400">{selectedAsset.asset.type} • {selectedAsset.asset.location}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="text-slate-400 hover:text-white text-xl"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Risk Assessment</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Risk Score:</span>
                        <span className="text-white font-bold">{selectedAsset.prediction.riskScore}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Risk Level:</span>
                        <span className={`font-bold ${
                          selectedAsset.prediction.riskLevel === 'Critical' ? 'text-red-400' :
                          selectedAsset.prediction.riskLevel === 'High' ? 'text-orange-400' :
                          selectedAsset.prediction.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {selectedAsset.prediction.riskLevel}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Time to Breach:</span>
                        <span className="text-white font-bold">{selectedAsset.prediction.timeToBreach}h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Confidence:</span>
                        <span className="text-cyan-400 font-bold">{selectedAsset.prediction.confidence}%</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Asset Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">IP Address:</span>
                        <span className="text-white font-mono">{selectedAsset.asset.ip}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Vulnerabilities:</span>
                        <span className="text-orange-400 font-bold">{selectedAsset.asset.vulnerabilities}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Last Scanned:</span>
                        <span className="text-white text-sm">
                          {new Date(selectedAsset.asset.lastScanned).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Attack Vector:</span>
                        <span className="text-red-400">{selectedAsset.prediction.predictedAttackVector}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-4">Top Risk Factors</h3>
                  <div className="space-y-2">
                    {selectedAsset.prediction.topRiskFactors.map((factor, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-slate-700/30 rounded p-2">
                        <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                        <span className="text-slate-300 text-sm">{factor}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default PredictiveBreachDetection
