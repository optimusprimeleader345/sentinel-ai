import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/admin/GlassCard'
import {
  Zap,
  TrendingUp,
  AlertTriangle,
  Target,
  BarChart3,
  Activity,
  Clock,
  Eye,
  Brain,
  Shield,
  ChevronDown,
  ChevronUp,
  RefreshCw
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ScatterChart,
  Scatter
} from 'recharts'
import { getPredictionSummary } from '../lib/api.js'

// Real-time threat prediction data
const threatProjectionData = [
  { time: '00:00', phishing: 23, malware: 12, ransomware: 8, anomaly: 5 },
  { time: '04:00', phishing: 28, malware: 15, ransomware: 11, anomaly: 7 },
  { time: '08:00', phishing: 31, malware: 18, ransomware: 15, anomaly: 9 },
  { time: '12:00', phishing: 27, malware: 16, ransomware: 12, anomaly: 6 },
  { time: '16:00', phishing: 35, malware: 22, ransomware: 18, anomaly: 11 },
  { time: '20:00', phishing: 29, malware: 19, ransomware: 14, anomaly: 8 },
]

const confidenceMetrics = [
  { model: 'Neural Network', accuracy: 89, confidence: 94, lastUpdated: '2 min ago' },
  { model: 'Deep Learning', accuracy: 92, confidence: 87, lastUpdated: '1 min ago' },
  { model: 'Ensemble Model', accuracy: 95, confidence: 91, lastUpdated: '30 sec ago' },
]

const predictiveInsights = [
  {
    severity: 'Critical',
    title: 'Ransomware Deployment Imminent',
    prediction: '89% probability of ransomware attack in next 24 hours',
    confidence: 94,
    timeframe: 'Critical: Next 6-12 hours',
    impact: 'System-wide file encryption possible'
  },
  {
    severity: 'High',
    title: 'Phishing Campaign Surge',
    prediction: '67% increase in credential harvesting attempts',
    confidence: 87,
    timeframe: 'High: Next 48 hours',
    impact: 'User accounts at risk through targeted attacks'
  },
  {
    severity: 'Medium',
    title: 'Network Intrusion Pattern',
    prediction: 'Potential advanced persistent threat development',
    confidence: 76,
    timeframe: 'Medium: Next 72 hours',
    impact: 'Data exfiltration concerns rising'
  },
]

const modelPerformance = [
  { metric: 'Anomaly Detection', score: 94, target: 95, trend: 'stable' },
  { metric: 'Pattern Recognition', score: 87, target: 90, trend: 'improving' },
  { metric: 'False Positive Rate', score: 92, target: 88, trend: 'optimizing' },
]

function ThreatPrediction() {
  // Real-time prediction data
  const [realTimeThreats, setRealTimeThreats] = useState({
    totalPredicted: 143,
    activeIncidents: 28,
    confidenceScore: 82,
    lastUpdate: new Date().toLocaleTimeString(),
    riskLevel: 'High'
  });

  const [predictiveModels, setPredictiveModels] = useState([
    {
      id: 'NN-001',
      name: 'Neural Threat Predictor',
      status: 'active',
      accuracy: 94,
      lastPrediction: '2 min ago',
      predictionsToday: 47
    },
    {
      id: 'DL-002',
      name: 'Deep Learning Anomaly',
      status: 'active',
      accuracy: 89,
      lastPrediction: '1 min ago',
      predictionsToday: 32
    },
    {
      id: 'ML-003',
      name: 'Ensemble Learning',
      status: 'active',
      accuracy: 96,
      lastPrediction: '30 sec ago',
      predictionsToday: 18
    }
  ]);

  const [selectedInsight, setSelectedInsight] = useState(null)
  const [forceUpdate, setForceUpdate] = useState(0)

  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeThreats(prev => ({
        totalPredicted: Math.max(120, Math.min(200, prev.totalPredicted + Math.floor(Math.random() * 10) - 5)),
        activeIncidents: Math.max(10, Math.min(50, prev.activeIncidents + Math.floor(Math.random() * 6) - 3)),
        confidenceScore: Math.max(70, Math.min(95, prev.confidenceScore + Math.floor(Math.random() * 4) - 2)),
        lastUpdate: new Date().toLocaleTimeString(),
        riskLevel: prev.confidenceScore > 85 ? 'High' : prev.confidenceScore > 75 ? 'Medium' : 'Low'
      }));

      setPredictiveModels(prev => prev.map(model => ({
        ...model,
        accuracy: Math.max(85, Math.min(98, model.accuracy + Math.floor(Math.random() * 3) - 1.5)),
        lastPrediction: Math.floor(Math.random() * 3) + ' min ago',
        predictionsToday: model.predictionsToday + Math.floor(Math.random() * 5)
      })));

      setForceUpdate(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [])

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              AI Threat Prediction Hub
            </h1>
            <p className="text-slate-400 text-sm">Advanced predictive AI analysis and threat forecasting with real-time accuracy metrics</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-white">{realTimeThreats.totalPredicted}</span>
            <span className="text-xs text-slate-400">Predicted</span>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-bold text-white">{realTimeThreats.activeIncidents}</span>
            <span className="text-xs text-slate-400">Active</span>
          </div>
          <div className="flex items-center space-x-2">
            <Brain className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">{realTimeThreats.confidenceScore}%</span>
            <span className="text-xs text-slate-400">Confidence</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              realTimeThreats.riskLevel === 'High' ? 'bg-red-400' :
              realTimeThreats.riskLevel === 'Medium' ? 'bg-yellow-400' : 'bg-green-400'
            }`}></div>
            <span className="text-xs text-slate-400">{realTimeThreats.riskLevel} Risk</span>
          </div>
        </div>
      </motion.div>

      {/* Real-time Prediction Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <GlassCard title="Overall Threat Forecast" icon={TrendingUp}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{realTimeThreats.totalPredicted}</div>
              <div className="text-slate-400 text-sm mb-4">Predicted threats this week</div>
              <div className="px-3 py-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full text-red-400 text-xs font-semibold inline-block">
                {realTimeThreats.riskLevel} Risk Level
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <GlassCard title="Active Incidents" icon={AlertTriangle}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{realTimeThreats.activeIncidents}</div>
              <div className="text-slate-400 text-sm mb-4">Currently active threats</div>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                <span className="text-red-400 text-xs">Live tracking</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard title="Model Confidence" icon={Shield}>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">{realTimeThreats.confidenceScore}%</div>
              <div className="text-slate-400 text-sm mb-4">Prediction accuracy</div>
              <motion.div
                className="w-full bg-slate-700 rounded-full h-2"
                key={forceUpdate}
              >
                <motion.div
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${realTimeThreats.confidenceScore}%` }}
                ></motion.div>
              </motion.div>
            </div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard title="Last Update" icon={Clock}>
            <div className="text-center">
              <div className="text-lg font-bold text-white mb-2">{realTimeThreats.lastUpdate}</div>
              <div className="text-slate-400 text-sm mb-4">Real-time feed</div>
              <div className="text-green-400 text-xs flex items-center justify-center space-x-1">
                <div className="w-1 h-1 bg-green-400 rounded-full animate-ping"></div>
                <span>LIVE DATA</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Threat Projection Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2"
        >
          <GlassCard title="Real-time Threat Projection" icon={BarChart3}>
            <div className="mb-6">
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={threatProjectionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Area dataKey="phishing" stroke="#ef4444" fill="url(#phishingGradient)" />
                  <Area dataKey="malware" stroke="#f97316" fill="url(#malwareGradient)" />
                  <Area dataKey="ransomware" stroke="#eab308" fill="url(#ransomwareGradient)" />
                  <Area dataKey="anomaly" stroke="#22c55e" fill="url(#anomalyGradient)" />
                  <defs>
                    <linearGradient id="phishingGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="malwareGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="ransomwareGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="anomalyGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Real-time Attack Vector Analysis */}
            <div className="border-t border-slate-700/50 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Attack Vector Likelihood</h4>
                <div className="flex space-x-4 text-xs">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-red-500 rounded"></div>
                    <span className="text-slate-400">Phishing (89%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-orange-500 rounded"></div>
                    <span className="text-slate-400">Malware (72%)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded"></div>
                    <span className="text-slate-400">Ransomware (64%)</span>
                  </div>
                </div>
              </div>

              <div className="text-sm text-slate-300">
                🤖 **AI Analysis:** Current threat patterns show 91% correlation with historical holiday season attacks.
                Expect surge in credential harvesting attempts with focus on financial and cloud services platforms.
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Model Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="AI Model Performance" icon={Brain}>
            <div className="space-y-4">
              {modelPerformance.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-medium">{metric.metric}</span>
                    <span className={`text-sm font-bold ${
                      metric.score >= metric.target ? 'text-green-400' :
                      metric.score >= metric.target - 5 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {metric.score}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: `${metric.score}%` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Target: {metric.target}%</span>
                    <span className={metric.trend === 'improving' ? 'text-green-400' : metric.trend === 'stable' ? 'text-cyan-400' : 'text-purple-400'}>
                      {metric.trend}
                    </span>
                  </div>
                </div>
              ))}

              <div className="border-t border-slate-700/50 pt-4">
                <div className="text-xs text-slate-400 mb-2">Live Training Status</div>
                <div className="text-sm font-semibold text-cyan-400">
                  Neural Networks Active
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Predictive Insights & Model Confidence */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* AI Predictive Insights */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="AI Predictive Intelligence" icon={Eye}>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {predictiveInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 cursor-pointer hover:scale-101 transition-all ${insight.severity === 'Critical' ? 'border-l-red-500 bg-red-500/5' : insight.severity === 'High' ? 'border-l-orange-500 bg-orange-500/5' : 'border-l-blue-500 bg-blue-500/5'}`}
                  onClick={() => setSelectedInsight(selectedInsight === index ? null : index)}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-white font-semibold mb-1">{insight.title}</div>
                      <p className="text-slate-300 text-sm">{insight.prediction}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${insight.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : insight.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                      {insight.severity}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm text-slate-400">
                      <span className="font-medium">Confidence:</span> {insight.confidence}%
                    </div>
                    <div className="text-right text-xs text-slate-500">
                      {insight.timeframe}
                    </div>
                  </div>
                  <AnimatePresence>
                    {selectedInsight === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 pt-3 border-t border-slate-600/50"
                      >
                        <div className="text-xs text-slate-400">
                          <strong>Impact:</strong> {insight.impact}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Predictive Model Confidence */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Model Confidence Metrics" icon={Activity}>
            <div className="space-y-6">
              {confidenceMetrics.map((model, index) => (
                <motion.div
                  key={`${model.model}-${index}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/30"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-white font-semibold text-sm">{model.model}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold text-lg">{model.accuracy}%</div>
                      <div className="text-slate-400 text-xs">Accuracy</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Confidence Score:</span>
                      <span className="text-purple-400 font-semibold">{model.confidence}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-1.5">
                      <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1.5 rounded-full" style={{ width: `${model.confidence}%` }}></div>
                    </div>
                    <div className="text-rs text-slate-500 text-right">
                      Updated {model.lastUpdated}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Live Model Status */}
              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-3">Live Prediction Engine</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xl font-bold text-green-400">{predictiveModels.reduce((sum, model) => sum + model.predictionsToday, 0)}</div>
                    <div className="text-slate-400 text-xs">Predictions Today</div>
                  </div>
                  <div className="text-center bg-slate-800/50 rounded-lg p-3">
                    <div className="text-xl font-bold text-blue-400">{predictiveModels.length}</div>
                    <div className="text-slate-400 text-xs">Active Models</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Threat Intelligence Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">AI Threat Forecasting Summary</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Advanced Threat Prediction Analysis:</strong> Current AI forecasting models predict {realTimeThreats.totalPredicted} threats with {realTimeThreats.confidenceScore}% confidence accuracy. Real-time analysis shows {realTimeThreats.activeIncidents} active incidents across multiple attack vectors, with rinsing phishing activity ({threatProjectionData[5].phishing} attacks predicted) and emerging ransomware patterns.

                  Machine learning models demonstrate 94% anomaly detection capability with ensemble techniques providing 91% prediction confidence. The system continuously adapts to new threat patterns through real-time model training and validation.
                </p>
                <div className="mt-4 flex items-center space-x-8 text-sm text-slate-400">
                  <span>• Attack Vector Modeling: Continuous</span>
                  <span>• Pattern Recognition: Neural Networks</span>
                  <span>• Real-time Adaptability: +15% Weekly Growth</span>
                  <span>• Prediction Accuracy: {realTimeThreats.confidenceScore}% Live Rating</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  )
}

export default ThreatPrediction
