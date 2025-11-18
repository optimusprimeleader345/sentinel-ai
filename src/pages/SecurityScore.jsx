import { motion } from 'framer-motion'
import { Award, AlertTriangle, CheckCircle, TrendingUp } from 'lucide-react'
import { useEffect, useState } from 'react'
import api from '../lib/api.js'

// Circular Score Meter Component
const ScoreMeter = ({ score = 75, riskLevel = 'fair' }) => {
  const getColor = (level) => {
    switch (level) {
      case 'good': return '#10b981'
      case 'fair': return '#f59e0b'
      case 'poor': return '#f97316'
      case 'critical': return '#ef4444'
      default: return '#6b7280'
    }
  }

  const getRiskText = (level) => {
    switch (level) {
      case 'good': return 'Low Risk'
      case 'fair': return 'Medium Risk'
      case 'poor': return 'High Risk'
      case 'critical': return 'Critical Risk'
      default: return 'Unknown'
    }
  }

  const circumference = 2 * Math.PI * 80
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-8 shadow-[0_0_20px_rgba(139,92,246,0.3)] neon-glow"
    >
      <div className="flex flex-col items-center space-y-6">
        <div className="relative w-48 h-48">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#334155"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke={getColor(riskLevel)}
              strokeWidth="8"
              fill="none"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-5xl font-bold text-white">{score}</div>
            <div className="text-lg text-slate-300">Score</div>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-2">{getRiskText(riskLevel)}</h3>
          <p className="text-slate-400">Overall Security Rating</p>
        </div>
      </div>
    </motion.div>
  )
}

// Security Breakdown Cards Component
const SecurityBreakdown = ({ breakdown }) => {
  const CategoryCard = ({ category, data }) => {
    const getStatusColor = (status) => {
      if (status.includes('active') || status.includes('enabled') || status.includes('secure') ||
          status.includes('up-to-date') || status.includes('verified') || status.includes('none') ||
          status.includes('minimized') || status.includes('optimized')) {
        return 'text-green-400'
      } else if (status.includes('inactive') || status.includes('disabled') || status.includes('outdated') ||
                 status.includes('insecure') || status.includes('weak') || status.includes('some') ||
                 status.includes('active') || status.includes('detected') || status.includes('basic')) {
        return 'text-red-400'
      }
      return 'text-yellow-400'
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
      >
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xl font-bold text-white">{data.title}</h4>
          <div className="text-2xl font-bold text-cyan-400">{data.score}%</div>
        </div>
        <div className="space-y-3">
          {data.items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-lg">{item.icon}</span>
                <span className="text-slate-300">{item.label}</span>
              </div>
              <span className={`text-sm font-medium ${getStatusColor(item.status)}`}>
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {Object.entries(breakdown).map(([key, data]) => (
        <CategoryCard key={key} category={key} data={data} />
      ))}
    </div>
  )
}

// Risk Factors List Component
const RiskFactors = ({ factors }) => {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-400 border-red-400/30'
      case 'medium': return 'text-yellow-400 border-yellow-400/30'
      case 'low': return 'text-green-400 border-green-400/30'
      default: return 'text-slate-400 border-slate-400/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
    >
      <div className="flex items-center space-x-2 mb-6">
        <AlertTriangle className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Current Risk Factors</h3>
      </div>
      <div className="space-y-4">
        {factors.map((factor) => (
          <div key={factor.id} className={`flex items-center space-x-3 p-4 rounded-lg border ${getSeverityColor(factor.severity)} bg-black/20`}>
            <span className="text-2xl">{factor.icon}</span>
            <div className="flex-1">
              <h4 className="font-medium text-white">{factor.title}</h4>
              <p className="text-sm text-slate-400">{factor.description}</p>
            </div>
            <div className={`text-xs font-medium px-2 py-1 rounded-full uppercase ${getSeverityColor(factor.severity)} bg-black/30`}>
              {factor.severity}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Recommendations Component
const Recommendations = ({ recommendations }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-400 border-red-400/30'
      case 'medium': return 'text-yellow-400 border-yellow-400/30'
      case 'low': return 'text-green-400 border-green-400/30'
      default: return 'text-slate-400 border-slate-400/30'
    }
  }

  const getEffortColor = (effort) => {
    switch (effort) {
      case 'low': return 'text-green-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
    >
      <div className="flex items-center space-x-2 mb-6">
        <CheckCircle className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-bold text-white">Improvement Recommendations</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <div key={rec.id} className={`p-4 rounded-lg border ${getPriorityColor(rec.priority)} bg-black/20`}>
            <h4 className="font-medium text-white mb-2">{rec.title}</h4>
            <p className="text-sm text-slate-400 mb-3">{rec.description}</p>
            <div className="flex items-center justify-between text-xs">
              <span className={`font-medium ${getPriorityColor(rec.priority)}`}>
                {rec.priority} priority
              </span>
              <span className={`font-medium ${getEffortColor(rec.effort)}`}>
                {rec.effort} effort
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

// Security Timeline Chart Component
const SecurityTimeline = ({ history }) => {
  // Simple line chart using SVG
  const maxScore = 100
  const minScore = 0
  const width = 600
  const height = 200
  const padding = 40

  const chartWidth = width - (padding * 2)
  const chartHeight = height - (padding * 2)

  // Create path points
  const points = history.slice(0, 14).map((item, index) => {
    const x = padding + (index / 13) * chartWidth
    const y = padding + ((maxScore - item.score) / (maxScore - minScore)) * chartHeight
    return `${x},${y}`
  }).join(' ')

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
    >
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Security Score Timeline</h3>
        <span className="text-sm text-slate-400">(Last 30 days)</span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(score => {
            const y = padding + ((maxScore - score) / (maxScore - minScore)) * chartHeight
            return (
              <g key={score}>
                <line
                  x1={padding}
                  y1={y}
                  x2={width - padding}
                  y2={y}
                  stroke="#334155"
                  strokeWidth="1"
                />
                <text x={padding - 10} y={y + 4} textAnchor="end" fill="#64748b" fontSize="12">
                  {score}
                </text>
              </g>
            )
          })}

          {/* Main line */}
          <polyline
            points={points}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Point markers */}
          {history.slice(0, 14).map((item, index) => {
            const x = padding + (index / 13) * chartWidth
            const y = padding + ((maxScore - item.score) / (maxScore - minScore)) * chartHeight
            return (
              <circle
                key={`point-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill="#10b981"
                stroke="#0f172a"
                strokeWidth="2"
              />
            )
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-slate-400">Score Trend</span>
        </div>
      </div>
    </motion.div>
  )
}

function SecurityScore() {
  const [scoreData, setScoreData] = useState({ score: 75, level: 'Advanced', riskLevel: 'fair' })
  const [breakdown, setBreakdown] = useState(null)
  const [riskFactors, setRiskFactors] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [scoreRes, breakdownRes, factorsRes, recsRes, historyRes] = await Promise.all([
          api.get('/security/score'),
          api.get('/security/breakdown'),
          api.get('/security/risk-factors'),
          api.get('/security/recommendations'),
          api.get('/security/history')
        ])

        setScoreData(scoreRes.data)
        setBreakdown(breakdownRes.data)
        setRiskFactors(factorsRes.data)
        setRecommendations(recsRes.data)
        setHistory(historyRes.data)

        setLoading(false)
      } catch (error) {
        console.error('Error fetching security data:', error)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-slate-400">Loading security data...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Award className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Security Score</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Your comprehensive security rating and insights</p>

        {/* Security Score Meter */}
        <div className="mb-12">
          <ScoreMeter score={scoreData.score} riskLevel={scoreData.riskLevel} />
        </div>

        {/* Security Breakdown Cards */}
        {breakdown && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Security Breakdown</h2>
            <SecurityBreakdown breakdown={breakdown} />
          </div>
        )}

        {/* Risk Factors */}
        {riskFactors.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Risk Factors</h2>
            <RiskFactors factors={riskFactors} />
          </div>
        )}

        {/* Recommendations */}
        {recommendations.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Recommendations</h2>
            <Recommendations recommendations={recommendations} />
          </div>
        )}

        {/* Security Timeline */}
        {history.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Score Progress</h2>
            <SecurityTimeline history={history} />
          </div>
        )}
      </div>
    </div>
  )
}

export default SecurityScore
