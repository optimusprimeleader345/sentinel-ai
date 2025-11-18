import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import {
  getPredictionSummary,
  getPredictionAttackTypes,
  getPredictionRisks,
  getPredictionInsights,
  getPredictionHeatmap,
  getPredictionExplanation
} from '../lib/api.js'
import { TrendingUp, Activity, AlertTriangle, Clock, ChevronDown, ChevronUp, Shield, Zap } from 'lucide-react'

function ThreatPrediction() {
  const [predictionData, setPredictionData] = useState({
    summary: null,
    attackTypes: null,
    risks: null,
    insights: null,
    heatmap: null,
    explanation: null
  })

  const [loading, setLoading] = useState(true)
  const [explainCollapse, setExplainCollapse] = useState(false)

  useEffect(() => {
    const loadPredictionData = async () => {
      try {
        const [summaryRes, attackTypesRes, risksRes, insightsRes, heatmapRes, explainRes] = await Promise.all([
          getPredictionSummary(),
          getPredictionAttackTypes(),
          getPredictionRisks(),
          getPredictionInsights(),
          getPredictionHeatmap(),
          getPredictionExplanation()
        ])

        setPredictionData({
          summary: summaryRes.data,
          attackTypes: attackTypesRes.data,
          risks: risksRes.data,
          insights: insightsRes.data,
          heatmap: heatmapRes.data,
          explanation: explainRes.data
        })
      } catch (error) {
        console.error('Error loading prediction data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadPredictionData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading Threat Prediction AI...</div>
      </div>
    )
  }

  const { summary, attackTypes, risks, insights, heatmap, explanation } = predictionData

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">Threat Prediction AI</h1>
          <p className="text-slate-400">AI-powered threat forecasting and risk analysis</p>
        </motion.div>

        {/* Forecast Overview Panel */}
        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[rgba(15,23,42,0.8)] rounded-xl p-6 border border-slate-700/50 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-white">7-Day Attack Forecast</h2>
              <div className="flex items-center space-x-2">
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm font-semibold text-cyan-300">
                  {summary.confidence}% Confidence
                </span>
              </div>
            </div>
            <div className="text-6xl font-bold text-cyan-400 text-center">
              {summary.predictedThreats}
            </div>
            <div className="text-center text-slate-300 mt-2">Predicted threats this week</div>
          </motion.div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Attack Type Forecasting Chart */}
          <div className="lg:col-span-2">
            {attackTypes && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[rgba(15,23,42,0.8)] rounded-xl p-4 border border-slate-700/50 shadow-[0_0_15px_rgba(0,255,255,0.1)]"
              >
                <h3 className="text-xl font-bold text-white mb-4">Attack Type Forecasting</h3>
                <div className="space-y-4">
                  {attackTypes.attackTypes.map((attack, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <span className="text-slate-300">{attack.type}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">{attack.predicted}</div>
                        <div className={`text-xs ${attack.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
                          {attack.trend === 'up' ? '+' : ''}{attack.change}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Risk Projection Cards */}
          <div>
            {risks && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-[rgba(15,23,42,0.8)] rounded-xl p-4 border border-slate-700/50 shadow-[0_0_15px_rgba(255,0,255,0.1)]"
              >
                <h3 className="text-xl font-bold text-white mb-4">Risk Projections</h3>
                <div className="space-y-4">
                  {risks.projections.map((projection, index) => (
                    <div key={index} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-4 border border-purple-500/30">
                      <div className="text-sm text-slate-400 mb-1">{projection.metric}</div>
                      <div className="text-2xl font-bold text-white mb-1">{projection.value}</div>
                      <div className={projection.trend === 'up' ? 'text-red-400 flex items-center' : 'text-green-400 flex items-center'}>
                        {projection.trend === 'up' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        <span className="text-xs ml-1">{projection.trendChange}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Predictive Insights */}
        {insights && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[rgba(15,23,42,0.8)] rounded-xl p-4 border border-slate-700/50 shadow-[0_0_15px_rgba(255,255,0,0.1)]"
          >
            <h3 className="text-xl font-bold text-white mb-4">AI Predictive Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {insights.insights.map((insight, index) => (
                <div key={index} className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl p-4 border border-orange-500/30">
                  <div className="text-orange-400 text-sm font-semibold mb-2">AI Insight #{index + 1}</div>
                  <div className="text-slate-200 text-sm">{insight.text}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Predictive Heatmap */}
        {heatmap && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[rgba(15,23,42,0.8)] rounded-xl p-4 border border-slate-700/50 shadow-[0_0_15px_rgba(0,255,0,0.1)]"
          >
            <h3 className="text-xl font-bold text-white mb-4">Threat Prediction Heatmap</h3>
            <div className="grid grid-cols-7 gap-2 text-center">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                <div key={day} className="text-slate-400 text-sm mb-2">{day}</div>
              ))}
              {heatmap.weekData.flat().map((threat, index) => (
                <div
                  key={index}
                  className={`aspect-square rounded flex items-center justify-center text-xs font-bold ${
                    threat.level === 'critical' ? 'bg-red-600 text-white' :
                    threat.level === 'high' ? 'bg-orange-600 text-white' :
                    threat.level === 'medium' ? 'bg-yellow-600 text-black' :
                    'bg-gray-700 text-white'
                  }`}
                  title={`${threat.day} ${threat.time}: ${threat.level}`}
                >
                  {threat.count}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Explainability Section */}
        {explanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[rgba(15,23,42,0.8)] rounded-xl p-4 border border-slate-700/50 shadow-[0_0_15px_rgba(0,255,127,0.1)]"
          >
            <button
              onClick={() => setExplainCollapse(!explainCollapse)}
              className="w-full flex items-center justify-between text-xl font-bold text-white mb-4"
            >
              <span>Why This Prediction?</span>
              {explainCollapse ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>

            {explainCollapse && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-cyan-400 mb-2">Model Explanation</h4>
                    <p className="text-slate-300 text-sm">{explanation.modelExplanation}</p>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-purple-400 mb-2">Key Factors</h4>
                    <div className="space-y-2">
                      {explanation.keyFactors.map((factor, index) => (
                        <div key={index} className="text-xs text-slate-300">• {factor}</div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-slate-900/50 rounded-xl p-4">
                    <h4 className="text-lg font-semibold text-green-400 mb-2">Pattern Analysis</h4>
                    <div className="space-y-2">
                      {explanation.patterns.map((pattern, index) => (
                        <div key={index} className="text-xs text-slate-300">• {pattern}</div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 rounded-xl p-4">
                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">Event Correlations</h4>
                  <div className="space-y-2">
                    {explanation.correlations.map((correlation, index) => (
                      <div key={index} className="text-xs text-slate-300">• {correlation}</div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ===== ADDITIONAL WORKING UI COMPONENTS WITH REAL MOCK DATA ===== */}

        {/* 1. Enhanced Forecast Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-slate-200">Next 7-Day Attack Forecast</h2>
            <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-sm font-semibold text-cyan-300">
              Today Risk: High
            </span>
          </div>
          <div className="grid grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-4xl font-bold text-cyan-400">143</div>
              <div className="text-slate-300 text-sm">Total Threats</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">82%</div>
              <div className="text-slate-300 text-sm">Confidence</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-orange-400">28</div>
              <div className="text-slate-300 text-sm">Active Now</div>
            </div>
          </div>
        </motion.div>

        {/* 2. Interactive Multi-Line Attack Forecast Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          <h3 className="text-xl font-bold text-slate-200 mb-6">Attack Type Forecasting Trend</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={[
                { day: "Mon", phishing: 23, malware: 12, intrusion: 8, anomaly: 5 },
                { day: "Tue", phishing: 28, malware: 15, intrusion: 11, anomaly: 7 },
                { day: "Wed", phishing: 31, malware: 18, intrusion: 15, anomaly: 9 },
                { day: "Thu", phishing: 27, malware: 16, intrusion: 12, anomaly: 6 },
                { day: "Fri", phishing: 35, malware: 22, intrusion: 18, anomaly: 11 },
                { day: "Sat", phishing: 29, malware: 19, intrusion: 14, anomaly: 8 },
                { day: "Sun", phishing: 24, malware: 14, intrusion: 10, anomaly: 6 }
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(139, 92, 246, 0.2)" />
                <XAxis dataKey="day" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(15, 23, 42, 0.9)',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    borderRadius: '8px',
                    color: '#e2e8f0'
                  }}
                />
                <Legend />
                <Line type="monotone" dataKey="phishing" stroke="#ef4444" strokeWidth={3} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="malware" stroke="#f97316" strokeWidth={3} dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="intrusion" stroke="#eab308" strokeWidth={3} dot={{ fill: '#eab308', strokeWidth: 2, r: 4 }} />
                <Line type="monotone" dataKey="anomaly" stroke="#22c55e" strokeWidth={3} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* 3. Enhanced Risk Projection Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="w-6 h-6 text-blue-400" />
              <span className="text-slate-300 font-medium">Tomorrow's Probability</span>
            </div>
            <div className="text-3xl font-bold text-blue-400">72%</div>
            <div className="text-red-400 text-sm mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +15% from today
            </div>
          </div>

          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <div className="flex items-center space-x-3 mb-3">
              <AlertTriangle className="w-6 h-6 text-red-400" />
              <span className="text-slate-300 font-medium">High Severity Chance</span>
            </div>
            <div className="text-3xl font-bold text-red-400">44%</div>
            <div className="text-green-400 text-sm mt-2 flex items-center">
              <ChevronDown className="w-4 h-4 mr-1" />
              -8% decrease
            </div>
          </div>

          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <div className="flex items-center space-x-3 mb-3">
              <Zap className="w-6 h-6 text-purple-400" />
              <span className="text-slate-300 font-medium">Expected Intrusions</span>
            </div>
            <div className="text-3xl font-bold text-purple-400">18</div>
            <div className="text-orange-400 text-sm mt-2 flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" />
              +23% spike expected
            </div>
          </div>

          <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <div className="flex items-center space-x-3 mb-3">
              <Activity className="w-6 h-6 text-green-400" />
              <span className="text-slate-300 font-medium">Risk Trend</span>
            </div>
            <div className="text-3xl font-bold text-green-400">DOWN</div>
            <div className="text-green-400 text-sm mt-2">-12% this week</div>
          </div>
        </motion.div>

        {/* 4. AI Insights with Real Data */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          <h3 className="text-xl font-bold text-slate-200 mb-6">AI Predictive Insights</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg border border-red-500/30">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                <div>
                  <div className="text-red-400 font-medium text-sm mb-1">Phishing Activity Surge</div>
                  <p className="text-slate-300 text-sm">Increased phishing activities expected due to holiday season correlation analysis with 89% confidence in authentication attacks.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg border border-blue-500/30">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                <div>
                  <div className="text-blue-400 font-medium text-sm mb-1">Login Anomaly Detection</div>
                  <p className="text-slate-300 text-sm">Login anomaly trends rising 34% from baseline patterns with unusual geographic access attempts from 12 new regions.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg border border-yellow-500/30">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                <div>
                  <div className="text-yellow-400 font-medium text-sm mb-1">Ransomware Warning System</div>
                  <p className="text-slate-300 text-sm">Ransomware signals mounting with 67% confidence in upcoming deployment targeting file servers using previously unseen signature patterns.</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 5. Enhanced Predictive Heatmap */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          <h3 className="text-xl font-bold text-slate-200 mb-6">Threat Prediction Heatmap</h3>
          <div className="grid grid-cols-4 gap-1 text-center">
            <div className="text-slate-400 text-xs font-medium mb-2"></div>
            <div className="text-slate-400 text-xs font-medium mb-2">Morning</div>
            <div className="text-slate-400 text-xs font-medium mb-2">Evening</div>
            <div className="text-slate-400 text-xs font-medium mb-2">Night</div>

            <div className="text-slate-400 text-xs font-medium">Mon</div>
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">15</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">8</div>
            <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">4</div>

            <div className="text-slate-400 text-xs font-medium">Tue</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">11</div>
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">18</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">6</div>

            <div className="text-slate-400 text-xs font-medium">Wed</div>
            <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">7</div>
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">22</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">9</div>

            <div className="text-slate-400 text-xs font-medium">Thu</div>
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">19</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">14</div>
            <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">3</div>

            <div className="text-slate-400 text-xs font-medium">Fri</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">12</div>
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">26</div>
            <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">31</div>

            <div className="text-slate-400 text-xs font-medium">Sat</div>
            <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">5</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">16</div>
            <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">7</div>

            <div className="text-slate-400 text-xs font-medium">Sun</div>
            <div className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">2</div>
            <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">10</div>
            <div className="w-16 h-16 bg-yellow-600 rounded-lg flex items-center justify-center text-black font-bold text-sm">4</div>
          </div>
          <div className="flex justify-center space-x-6 mt-4 text-xs">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded"></div>
              <span className="text-slate-400">Critical (90%+)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-orange-600 rounded"></div>
              <span className="text-slate-400">High Risk (60-89%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-600 rounded"></div>
              <span className="text-slate-400">Medium Risk (30-59%)</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-gray-700 rounded"></div>
              <span className="text-slate-400">Low Risk (0-29%)</span>
            </div>
          </div>
        </motion.div>

        {/* 6. Interactive Explainability Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]"
        >
          <details className="group">
            <summary className="text-xl font-bold text-slate-200 cursor-pointer flex items-center justify-between list-none">
              <span>Why This Prediction? - XAI Explainability</span>
              <ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
            </summary>
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-slate-900/50 rounded-lg border border-cyan-500/30">
                <h4 className="text-cyan-400 font-semibold mb-2">Prediction influenced by anomaly spikes in login attempts.</h4>
                <p className="text-slate-300 text-sm">Machine learning models detected 234% increase in unusual login patterns from previously unseen geographic locations.</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg border border-purple-500/30">
                <h4 className="text-purple-400 font-semibold mb-2">Increased malware signature hits on port 445.</h4>
                <p className="text-slate-300 text-sm">18 additional malware variants targeting Server Message Block protocol detected in threat intelligence feeds.</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg border border-green-500/30">
                <h4 className="text-green-400 font-semibold mb-2">Trend suggests rising network intrusion attempts.</h4>
                <p className="text-slate-300 text-sm">Correlational analysis shows 67% probability of coordinated attack campaigns based on concurrent port scanning patterns.</p>
              </div>

              <div className="p-4 bg-slate-900/50 rounded-lg border border-yellow-500/30">
                <h4 className="text-yellow-400 font-semibold mb-2">Seasonal attack vector activation detected.</h4>
                <p className="text-slate-300 text-sm">Historical data correlation indicates 42% higher phishing success rates during weekend retail periods.</p>
              </div>
            </div>
          </details>
        </motion.div>

      </div>
    </div>
  )
}

export default ThreatPrediction
