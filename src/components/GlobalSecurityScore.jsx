import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Info } from 'lucide-react'

const GlobalSecurityScore = ({ compact = false }) => {
  const [score, setScore] = useState(85)
  const [previousScore, setPreviousScore] = useState(85)
  const [explanation, setExplanation] = useState('')
  const [loading, setLoading] = useState(false)

  // Mock scan results for demonstration
  const mockScanResults = [
    { type: 'url', result: 'threat', details: 'phishing' },
    { type: 'url', result: 'threat', details: 'malware' },
    { type: 'ip', result: 'threat', details: 'blacklisted' },
    { type: 'email', result: 'threat', details: 'spoofing' },
    { type: 'password', result: 'threat', details: 'breach', count: 150 }
  ]

  // Calculate security score based on scan results
  const calculateSecurityScore = () => {
    let currentScore = 100
    const threats = []

    mockScanResults.forEach(scan => {
      switch (scan.type) {
        case 'url':
          if (scan.details === 'phishing') {
            currentScore -= 25
            threats.push('phishing URL')
          } else if (scan.details === 'malware') {
            currentScore -= 30
            threats.push('malicious URL')
          }
          break
        case 'ip':
          if (scan.details === 'blacklisted') {
            currentScore -= 30
            threats.push('blacklisted IP')
          } else if (scan.details === 'abuse') {
            currentScore -= 15
            threats.push('IP with abuse reports')
          }
          break
        case 'email':
          if (scan.details === 'spoofing') {
            currentScore -= 20
            threats.push('spoofed email')
          } else if (scan.details === 'malicious') {
            currentScore -= 25
            threats.push('email with malicious attachment')
          }
          break
        case 'password':
          if (scan.count > 1000) {
            currentScore -= 40
            threats.push(`password breached ${scan.count} times`)
          } else if (scan.count > 100) {
            currentScore -= 25
            threats.push(`password breached ${scan.count} times`)
          }
          break
      }
    })

    // Clamp score between 0 and 100
    currentScore = Math.max(0, Math.min(100, currentScore))

    // Generate AI explanation
    let explanationText = ''
    if (threats.length === 0) {
      explanationText = 'Your security posture is excellent. No significant threats detected in recent scans.'
    } else {
      explanationText = `Your security score decreased due to ${threats.length} threat${threats.length > 1 ? 's' : ''} detected: ${threats.join(', ')}.`
    }

    return { score: currentScore, explanation: explanationText }
  }

  // Get score color based on range
  const getScoreColor = (score) => {
    if (score >= 80) return { primary: '#10b981', secondary: '#34d399', bg: 'bg-green-500/20', text: 'text-green-400', label: 'Secure' }
    if (score >= 60) return { primary: '#f59e0b', secondary: '#fbbf24', bg: 'bg-yellow-500/20', text: 'text-yellow-400', label: 'Moderate Risk' }
    if (score >= 40) return { primary: '#f97316', secondary: '#fb923c', bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'High Risk' }
    return { primary: '#ef4444', secondary: '#f87171', bg: 'bg-red-500/20', text: 'text-red-400', label: 'Critical' }
  }

  // Calculate score on component mount and when scan results change
  useEffect(() => {
    const result = calculateSecurityScore()
    setPreviousScore(score)
    setScore(result.score)
    setExplanation(result.explanation)
  }, [])

  const scoreColor = getScoreColor(score)
  const scoreChange = score - previousScore

  // Circular progress calculation - ensure all values are safe
  const radius = compact ? 60 : 80
  const strokeWidth = compact ? 8 : 12
  const safeRadius = typeof radius === 'number' && radius > 0 ? radius : 80
  const safeStrokeWidth = typeof strokeWidth === 'number' && strokeWidth > 0 ? strokeWidth : 12
  const circumference = 2 * Math.PI * safeRadius
  const strokeDashoffset = circumference - (score / 100) * circumference

  if (compact) {
    return (
      <div className="flex items-center space-x-4">
        {/* Compact Circular Gauge */}
        <div className="relative">
          <svg width={safeRadius * 2} height={safeRadius * 2} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={safeRadius}
              cy={safeRadius}
              r={safeRadius - safeStrokeWidth / 2}
              stroke="#374151"
              strokeWidth={safeStrokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              cx={safeRadius}
              cy={safeRadius}
              r={safeRadius - safeStrokeWidth / 2}
              stroke={scoreColor.primary}
              strokeWidth={safeStrokeWidth}
              fill="transparent"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>
          {/* Score text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${scoreColor.text}`}>{score}</span>
          </div>
        </div>

        {/* Compact Info */}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${scoreColor.text}`}>{scoreColor.label}</span>
            {scoreChange !== 0 && (
              <div className={`flex items-center space-x-1 ${scoreChange > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {scoreChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="text-xs">{Math.abs(scoreChange)}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2">{explanation}</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-8 backdrop-blur-sm"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Shield className={`w-8 h-8 ${scoreColor.text}`} />
          <div>
            <h2 className="text-2xl font-bold text-white">Global Security Score</h2>
            <p className="text-slate-400 text-sm">Enterprise threat assessment</p>
          </div>
        </div>
        <div className={`px-4 py-2 rounded-lg ${scoreColor.bg} ${scoreColor.text} text-sm font-medium`}>
          {scoreColor.label}
        </div>
      </div>

      {/* Score Visualization */}
      <div className="flex items-center justify-center mb-8">
        <div className="relative">
          {/* Circular Gauge */}
          <svg width={safeRadius * 2} height={safeRadius * 2} className="transform -rotate-90">
            {/* Background circle */}
            <circle
              cx={safeRadius}
              cy={safeRadius}
              r={safeRadius - safeStrokeWidth / 2}
              stroke="#374151"
              strokeWidth={safeStrokeWidth}
              fill="transparent"
            />
            {/* Progress circle */}
            <motion.circle
              cx={safeRadius}
              cy={safeRadius}
              r={safeRadius - safeStrokeWidth / 2}
              stroke={scoreColor.primary}
              strokeWidth={safeStrokeWidth}
              fill="transparent"
              strokeLinecap="round"
              initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 2, ease: "easeOut" }}
              style={{
                strokeDasharray: circumference,
              }}
            />
          </svg>

          {/* Score text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-5xl font-bold ${scoreColor.text}`}>{score}</span>
            <span className="text-slate-400 text-sm">/100</span>
          </div>

          {/* Score change indicator */}
          {scoreChange !== 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
            >
              <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium ${
                scoreChange > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {scoreChange > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{Math.abs(scoreChange)}</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* AI Explanation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-center"
      >
        <div className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-600/50">
          <Info className={`w-5 h-5 mt-0.5 ${scoreColor.text} flex-shrink-0`} />
          <p className="text-slate-300 text-sm leading-relaxed">{explanation}</p>
        </div>
      </motion.div>

      {/* Risk Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="mt-6 grid grid-cols-4 gap-4"
      >
        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
          <div className="text-lg font-bold text-green-400">{mockScanResults.filter(s => s.result === 'safe').length}</div>
          <div className="text-xs text-slate-400">Safe</div>
        </div>
        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
          <div className="text-lg font-bold text-yellow-400">{mockScanResults.filter(s => s.result === 'suspicious').length}</div>
          <div className="text-xs text-slate-400">Suspicious</div>
        </div>
        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
          <div className="text-lg font-bold text-orange-400">{mockScanResults.filter(s => s.result === 'threat' && s.details !== 'breach').length}</div>
          <div className="text-xs text-slate-400">Threats</div>
        </div>
        <div className="text-center p-3 bg-slate-800/30 rounded-lg">
          <div className="text-lg font-bold text-red-400">{mockScanResults.filter(s => s.details === 'breach').length}</div>
          <div className="text-xs text-slate-400">Breaches</div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default GlobalSecurityScore
