import React, { useState, useEffect } from 'react'
import { Shield, AlertTriangle, CheckCircle, Lock, Eye, EyeOff, TrendingUp, Activity, Clock, Users } from 'lucide-react'

const VaultSecurityDashboard = ({ vaultItems, activityLog }) => {
  const [securityScore, setSecurityScore] = useState(0)
  const [recommendations, setRecommendations] = useState([])
  const [anomalies, setAnomalies] = useState([])
  const [stats, setStats] = useState({
    totalItems: 0,
    weakPasswords: 0,
    reusedPasswords: 0,
    oldPasswords: 0,
    averageStrength: 0
  })

  useEffect(() => {
    analyzeVaultSecurity()
  }, [vaultItems, activityLog])

  const analyzeVaultSecurity = () => {
    if (!vaultItems || vaultItems.length === 0) {
      setSecurityScore(0)
      setRecommendations(['Add your first secure item to get started'])
      setStats({ totalItems: 0, weakPasswords: 0, reusedPasswords: 0, oldPasswords: 0, averageStrength: 0 })
      return
    }

    let totalScore = 0
    const newStats = {
      totalItems: vaultItems.length,
      weakPasswords: 0,
      reusedPasswords: 0,
      oldPasswords: 0,
      averageStrength: 0
    }

    const passwordItems = vaultItems.filter(item => item.type === 'Password')
    const values = {} // To check for duplicates
    let totalStrengthScore = 0
    let analyzedPasswords = 0

    passwordItems.forEach(item => {
      if (item.value && item.value.length > 0) {
        // Check password strength
        const strength = analyzePasswordStrength(item.value)
        totalStrengthScore += strength.score
        analyzedPasswords++

        if (strength.score < 60) newStats.weakPasswords++

        // Check for reused passwords
        if (values[item.value]) {
          newStats.reusedPasswords++
        } else {
          values[item.value] = true
        }

        // Check for old passwords (older than 90 days)
        const lastUpdated = new Date(item.lastUpdated)
        const daysSinceUpdate = (new Date() - lastUpdated) / (1000 * 60 * 60 * 24)
        if (daysSinceUpdate > 90) {
          newStats.oldPasswords++
        }
      }
    })

    newStats.averageStrength = analyzedPasswords > 0 ? totalStrengthScore / analyzedPasswords : 0

    // Calculate overall security score
    let score = 100

    // Deduct for weak passwords
    score -= (newStats.weakPasswords / Math.max(passwordItems.length, 1)) * 30

    // Deduct for reused passwords
    score -= (newStats.reusedPasswords / Math.max(passwordItems.length, 1)) * 20

    // Deduct for old passwords
    score -= (newStats.oldPasswords / Math.max(passwordItems.length, 1)) * 15

    // Bonus for strong average strength
    if (newStats.averageStrength > 80) score += 10
    else if (newStats.averageStrength > 60) score += 5

    // Bonus for variety of item types
    const uniqueTypes = new Set(vaultItems.map(item => item.type)).size
    score += Math.min(uniqueTypes * 5, 15)

    score = Math.max(0, Math.min(100, score))
    setSecurityScore(Math.round(score))
    setStats(newStats)

    // Generate recommendations
    generateRecommendations(newStats, passwordItems)

    // Check for anomalies
    detectAnomalies(activityLog)
  }

  const analyzePasswordStrength = (password) => {
    if (!password) return { score: 0, level: 'Very Weak' }

    let score = 0

    // Length bonus
    if (password.length >= 8) score += 20
    if (password.length >= 12) score += 20
    if (password.length >= 16) score += 20

    // Character variety
    if (/[a-z]/.test(password)) score += 10
    if (/[A-Z]/.test(password)) score += 10
    if (/[0-9]/.test(password)) score += 10
    if (/[^a-zA-Z0-9]/.test(password)) score += 10

    // Penalties
    if (/(.)\1{2,}/.test(password)) score -= 10 // Repeated characters
    if (/(abc|123|qwe)/i.test(password)) score -= 10 // Common sequences

    return { score: Math.max(0, Math.min(100, score)) }
  }

  const generateRecommendations = (stats, passwordItems) => {
    const recs = []

    if (stats.weakPasswords > 0) {
      recs.push({
        type: 'warning',
        icon: <AlertTriangle className="w-4 h-4" />,
        title: 'Weak Passwords Detected',
        description: `${stats.weakPasswords} passwords need strengthening. Use the password generator for better security.`,
        action: 'Review Weak Passwords'
      })
    }

    if (stats.reusedPasswords > 0) {
      recs.push({
        type: 'danger',
        icon: <AlertTriangle className="w-4 h-4" />,
        title: 'Password Reuse Detected',
        description: `${stats.reusedPasswords} passwords are reused. Each account should have a unique password.`,
        action: 'Generate Unique Passwords'
      })
    }

    if (stats.oldPasswords > 0) {
      recs.push({
        type: 'warning',
        icon: <Clock className="w-4 h-4" />,
        title: 'Outdated Passwords',
        description: `${stats.oldPasswords} passwords haven't been updated in 90+ days. Regular updates improve security.`,
        action: 'Update Old Passwords'
      })
    }

    if (stats.averageStrength < 60) {
      recs.push({
        type: 'info',
        icon: <TrendingUp className="w-4 h-4" />,
        title: 'Improve Average Strength',
        description: 'Your average password strength could be better. Aim for 80+ scores.',
        action: 'Use Password Generator'
      })
    }

    if (passwordItems.length === 0) {
      recs.push({
        type: 'info',
        icon: <Shield className="w-4 h-4" />,
        title: 'Add Password Items',
        description: 'Start by adding your important passwords to the secure vault.',
        action: 'Add First Password'
      })
    }

    // Always include some positive recommendations
    if (stats.averageStrength >= 80 && stats.weakPasswords === 0) {
      recs.push({
        type: 'success',
        icon: <CheckCircle className="w-4 h-4" />,
        title: 'Excellent Security',
        description: 'Your vault security is in great shape! Keep up the good work.',
        action: 'Maintain Security'
      })
    }

    setRecommendations(recs)
  }

  const detectAnomalies = (logs) => {
    const anomalies = []

    if (!logs || logs.length === 0) return

    // Check for rapid access patterns
    const recentLogs = logs.filter(log => {
      const logTime = new Date(log.timestamp)
      const now = new Date()
      return (now - logTime) < (24 * 60 * 60 * 1000) // Last 24 hours
    })

    // Unusual activity patterns
    const accessCount = recentLogs.length
    if (accessCount > 50) {
      anomalies.push({
        type: 'warning',
        title: 'High Activity Detected',
        description: `${accessCount} vault accesses in the last 24 hours. This might indicate unusual activity.`,
        timestamp: new Date().toISOString()
      })
    }

    // Failed access attempts (if we had that data)
    // This would be enhanced with actual authentication logs

    setAnomalies(anomalies)
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-blue-400'
    if (score >= 40) return 'text-yellow-400'
    return 'text-red-400'
  }

  const getScoreBgColor = (score) => {
    if (score >= 80) return 'bg-green-500'
    if (score >= 60) return 'bg-blue-500'
    if (score >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getScoreText = (score) => {
    if (score >= 80) return 'Excellent'
    if (score >= 60) return 'Good'
    if (score >= 40) return 'Fair'
    return 'Poor'
  }

  return (
    <div className="space-y-6">
      {/* Security Score Overview */}
      <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <div>
              <h2 className="text-xl font-bold text-slate-200">Vault Security Score</h2>
              <p className="text-slate-400 text-sm">Overall security health of your vault</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${getScoreColor(securityScore)}`}>
              {securityScore}/100
            </div>
            <div className={`text-sm font-medium ${getScoreColor(securityScore)}`}>
              {getScoreText(securityScore)} Security
            </div>
          </div>
        </div>

        {/* Score Bar */}
        <div className="mb-6">
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className={`h-full ${getScoreBgColor(securityScore)} transition-all duration-500 ease-out`}
              style={{ width: `${securityScore}%` }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-200">{stats.totalItems}</div>
            <div className="text-xs text-slate-400">Total Items</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${stats.weakPasswords > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {stats.weakPasswords}
            </div>
            <div className="text-xs text-slate-400">Weak Passwords</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl font-bold ${stats.reusedPasswords > 0 ? 'text-orange-400' : 'text-green-400'}`}>
              {stats.reusedPasswords}
            </div>
            <div className="text-xs text-slate-400">Reused Passwords</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-200">
              {stats.averageStrength.toFixed(0)}%
            </div>
            <div className="text-xs text-slate-400">Avg Strength</div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-cyan-400" />
            <h3 className="text-lg font-bold text-slate-200">Security Recommendations</h3>
          </div>

          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border ${
                  rec.type === 'danger' ? 'border-red-500/30 bg-red-500/10' :
                  rec.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/10' :
                  rec.type === 'success' ? 'border-green-500/30 bg-green-500/10' :
                  'border-blue-500/30 bg-blue-500/10'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className={`flex-shrink-0 ${
                    rec.type === 'danger' ? 'text-red-400' :
                    rec.type === 'warning' ? 'text-yellow-400' :
                    rec.type === 'success' ? 'text-green-400' :
                    'text-blue-400'
                  }`}>
                    {rec.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-200 mb-1">{rec.title}</h4>
                    <p className="text-sm text-slate-300 mb-2">{rec.description}</p>
                    <button className="text-xs bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded text-white transition-colors">
                      {rec.action}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Anomalies */}
      {anomalies.length > 0 && (
        <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-orange-400" />
            <h3 className="text-lg font-bold text-slate-200">Security Anomalies</h3>
          </div>

          <div className="space-y-3">
            {anomalies.map((anomaly, index) => (
              <div key={index} className="p-4 rounded-lg border border-orange-500/30 bg-orange-500/10">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-slate-200 mb-1">{anomaly.title}</h4>
                    <p className="text-sm text-slate-300">{anomaly.description}</p>
                    <div className="text-xs text-slate-500 mt-1">
                      Detected: {new Date(anomaly.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Security Tips */}
      <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Lock className="w-6 h-6 text-green-400" />
          <h3 className="text-lg font-bold text-slate-200">Security Best Practices</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-300">
          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span>Password Security</span>
            </h4>
            <ul className="space-y-1 text-xs ml-6">
              <li>• Use 12+ characters minimum</li>
              <li>• Include uppercase, lowercase, numbers, symbols</li>
              <li>• Avoid common words and sequences</li>
              <li>• Never reuse passwords</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-slate-200 flex items-center space-x-2">
              <Eye className="w-4 h-4 text-blue-400" />
              <span>Vault Management</span>
            </h4>
            <ul className="space-y-1 text-xs ml-6">
              <li>• Update passwords every 90 days</li>
              <li>• Use unique passwords per account</li>
              <li>• Enable two-factor authentication</li>
              <li>• Regularly export backups</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VaultSecurityDashboard
