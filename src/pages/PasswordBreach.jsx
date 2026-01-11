import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Hash,
  Database,
  Zap,
  Key,
  Crown,
  Fingerprint,
  Star,
  ViewIcon,
  Clock,
  Menu,
  Gauge,
  Target,
  X,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Settings,
  Unlock,
  Filter,
  Download
} from 'lucide-react'
import { checkPasswordBreach } from '../lib/api.js'

const PasswordBreach = () => {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [checksPerformed, setChecksPerformed] = useState(0)
  const [vaultIntegrity, setVaultIntegrity] = useState('SECURE')
  const [breachHistory, setBreachHistory] = useState([])

  // Real-time vault status updates
  useEffect(() => {
    if (result) {
      setChecksPerformed(prev => prev + 1)
      setVaultIntegrity(result.data.passwordPwned ? 'COMPROMISED' : 'SECURE')
    }
  }, [result])

  const handleCheck = async (e) => {
    e.preventDefault()
    if (!password.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await checkPasswordBreach({ password: password.trim() })
      setResult(response.data)

      // Add to breach history
      const newCheck = {
        ...response.data,
        timestamp: new Date().toISOString(),
        passwordLength: password.length,
        checkId: `CHECK-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      }
      setBreachHistory(prev => [newCheck, ...prev].slice(0, 10))

    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Failed to check password security')
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setResult(null)
    setError(null)
    setVaultIntegrity('SECURE')
  }

  // Password strength calculator
  const getPasswordStrength = (pwd) => {
    let score = 0
    if (pwd.length >= 8) score++
    if (pwd.length >= 12) score++
    if (/[a-z]/.test(pwd)) score++
    if (/[A-Z]/.test(pwd)) score++
    if (/[0-9]/.test(pwd)) score++
    if (/[^A-Za-z0-9]/.test(pwd)) score++
    return Math.min(Math.max(score, 1), 4)
  }

  const Card = ({ children, className = "", title, icon: Icon }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center space-x-3 mb-6">
          {Icon && (
            <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-400/30">
              <Icon className="w-5 h-5 text-orange-400" />
            </div>
          )}
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  )

  // Strength indicator component
  const StrengthIndicator = ({ level, compact = false }) => {
    const strengthLabels = ['WEAK', 'FAIR', 'GOOD', 'STRONG']
    const getBarColor = (i) => {
      if (i >= level) return 'bg-slate-600'
      return level === 1 ? 'bg-red-500' :
             level === 2 ? 'bg-orange-500' :
             level === 3 ? 'bg-yellow-500' : 'bg-red-500'
    }

    return (
      <div className={`flex items-center space-x-3 ${compact ? 'scale-75' : ''}`}>
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={`h-2 w-6 rounded-full transition-all duration-500 ${getBarColor(i)}`}
          />
        ))}
        {!compact && (
          <span className="text-sm font-bold font-mono text-slate-300 tracking-wider">
            {strengthLabels[level - 1] || 'UNKNOWN'}
          </span>
        )}
      </div>
    )
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'analysis', label: 'Analysis', icon: Shield },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'security', label: 'Security Tips', icon: Lock }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 border-b border-orange-500/30 bg-slate-900/80 backdrop-blur-xl"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-lg">
            <Fingerprint className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Password Breach Checker
            </h1>
            <p className="text-slate-400 text-sm">Advanced password security analysis with HaveIBeenPwned integration</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-600/50">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              vaultIntegrity === 'SECURE' ? 'bg-green-400' : 'bg-red-400'
            }`} />
            <span className="text-sm text-slate-300">Vault: {vaultIntegrity}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-orange-500/50 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 p-6 bg-slate-900/50">
        {tabs.map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedTab === tab.id
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          )
        })}
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">

            {/* Password Input Card */}
            <Card title="Password Analysis" icon={Key}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Enter password to check</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password for breach analysis..."
                      className="w-full pl-4 pr-12 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/25"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-400 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <ViewIcon className="w-5 h-5" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <Gauge className="w-4 h-4 text-orange-400" />
                          <span className="text-xs text-slate-400 font-mono">STRENGTH ANALYSIS</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Lock className="w-3 h-3 text-orange-400" />
                          <span className="text-xs text-slate-400 font-mono">
                            {password.length} chars
                          </span>
                        </div>
                      </div>
                      <StrengthIndicator level={getPasswordStrength(password)} />
                    </motion.div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  onClick={handleCheck}
                  disabled={loading || !password.trim()}
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Shield className="w-5 h-5" />
                      <span>Check Password</span>
                    </>
                  )}
                </motion.button>
              </div>
            </Card>

            {/* Security Stats */}
            <Card title="Security Metrics" icon={BarChart3}>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Checks Performed</span>
                  <span className="text-white font-semibold">{checksPerformed}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Vault Status</span>
                  <span className={`font-semibold ${
                    vaultIntegrity === 'SECURE' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {vaultIntegrity}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Privacy Level</span>
                  <span className="text-orange-400 font-semibold">K-Anonymity</span>
                </div>
              </div>
            </Card>

          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">

            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <>
                {/* Loading State */}
                <AnimatePresence mode="wait">
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-8 backdrop-blur-xl"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 mx-auto mb-4 border-4 border-orange-400 border-t-transparent rounded-full"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">Analyzing Password...</h3>
                        <p className="text-slate-400">Checking against global breach databases</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Error Display */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                    >
                      <Card className="border-red-500/50 bg-red-500/5">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-6 h-6 text-red-400 mt-1" />
                          <div>
                            <h3 className="text-lg font-bold text-red-400 mb-2">Analysis Failed</h3>
                            <p className="text-red-300">{error}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {/* Results Display */}
                  {result && !loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Breach Status Card */}
                      <Card title="Breach Analysis" icon={Target}>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                              result.data.passwordPwned
                                ? 'border-red-400 bg-red-400/10'
                                : 'border-green-400 bg-green-400/10'
                            }`}>
                              {result.data.passwordPwned ? (
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                              ) : (
                                <CheckCircle className="w-8 h-8 text-green-400" />
                              )}
                            </div>
                            <div>
                              <h3 className={`text-xl font-bold ${
                                result.data.passwordPwned ? 'text-red-400' : 'text-green-400'
                              }`}>
                                {result.data.passwordPwned ? 'BREACHED PASSWORD' : 'SECURE PASSWORD'}
                              </h3>
                              <p className="text-slate-400 text-sm">
                                {result.data.passwordPwned
                                  ? 'This password has been found in data breaches'
                                  : 'No breaches found for this password'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                              result.data.passwordPwned
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-green-500/20 text-green-400'
                            }`}>
                              {result.data.passwordPwned ? (
                                <Unlock className="w-4 h-4" />
                              ) : (
                                <Lock className="w-4 h-4" />
                              )}
                              <span>{result.data.passwordPwned ? 'COMPROMISED' : 'SECURE'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Breach Details */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-red-400 mb-1">
                              {result.data.breachCount?.toLocaleString() || 0}
                            </div>
                            <div className="text-sm text-slate-400">Breach Incidents</div>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-orange-400 mb-1">
                              {result.data.riskLevel}
                            </div>
                            <div className="text-sm text-slate-400">Risk Level</div>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-blue-400 mb-1">
                              {result.data.hashPrefix}
                            </div>
                            <div className="text-sm text-slate-400">Hash Prefix</div>
                          </div>
                        </div>
                      </Card>

                      {/* Password Info */}
                      <Card title="Password Information" icon={Hash}>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Length:</span>
                            <span className="text-white">{password.length} characters</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Strength:</span>
                            <span className={`font-semibold ${
                              getPasswordStrength(password) === 1 ? 'text-red-400' :
                              getPasswordStrength(password) === 2 ? 'text-orange-400' :
                              getPasswordStrength(password) === 3 ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {['Weak', 'Fair', 'Good', 'Strong'][getPasswordStrength(password) - 1]}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Algorithm:</span>
                            <span className="text-orange-400">SHA1 K-Anonymity</span>
                          </div>
                        </div>
                      </Card>

                      {/* Clear Button */}
                      <div className="flex justify-center">
                        <button
                          onClick={clearResult}
                          className="px-6 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-slate-500/50 transition-all"
                        >
                          Clear Results
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* Welcome State */}
                  {!result && !error && !loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16"
                    >
                      <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full flex items-center justify-center border border-orange-400/30">
                          <Fingerprint className="w-10 h-10 text-orange-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Password Security Check</h3>
                        <p className="text-slate-400">
                          Enter any password to check if it has been compromised in known data breaches using HaveIBeenPwned's secure K-Anonymity system.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Analysis Tab */}
            {selectedTab === 'analysis' && result && (
              <div className="space-y-6">
                <Card title="Detailed Analysis" icon={Shield}>
                  {result.data.passwordPwned && (
                    <div className="space-y-4">
                      <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <h4 className="text-red-400 font-semibold mb-2">Breach Detection</h4>
                        <p className="text-red-300 text-sm">
                          This password was found in {result.data.breachCount} data breach(es).
                          It is recommended to change this password immediately.
                        </p>
                      </div>

                      {result.data.suggestions?.map((suggestion, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/40 border border-slate-600/30 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                              <span className="text-orange-400 font-bold text-sm">{idx + 1}</span>
                            </div>
                            <span className="text-orange-400 font-semibold">Security Recommendation</span>
                          </div>
                          <p className="text-slate-300 text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {!result.data.passwordPwned && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <h4 className="text-green-400 font-semibold text-lg">Password Not Found in Breaches</h4>
                      <p className="text-slate-400">
                        This password was not found in any known data breaches. However, continue to follow security best practices.
                      </p>
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* History Tab */}
            {selectedTab === 'history' && (
              <Card title="Check History" icon={Clock}>
                {breachHistory.length > 0 ? (
                  <div className="space-y-4">
                    {breachHistory.map((check, idx) => (
                      <div key={idx} className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              check.data.passwordPwned ? 'bg-red-400' : 'bg-green-400'
                            }`} />
                            <span className="text-white font-medium">
                              {check.data.passwordPwned ? 'Compromised' : 'Secure'} Password
                            </span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            check.data.passwordPwned ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'
                          }`}>
                            {check.data.riskLevel}
                          </span>
                        </div>
                        <div className="text-sm text-slate-400">
                          {new Date(check.timestamp).toLocaleString()} • Length: {check.passwordLength} chars
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No check history yet</p>
                  </div>
                )}
              </Card>
            )}

            {/* Security Tips Tab */}
            {selectedTab === 'security' && (
              <div className="space-y-6">
                <Card title="Password Security Best Practices" icon={Lock}>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Use Strong, Unique Passwords",
                        description: "Create passwords with at least 12 characters, mixing uppercase, lowercase, numbers, and symbols.",
                        icon: Key
                      },
                      {
                        title: "Enable Two-Factor Authentication",
                        description: "Add an extra layer of security by requiring a second form of verification.",
                        icon: Shield
                      },
                      {
                        title: "Use a Password Manager",
                        description: "Securely store and generate strong passwords for all your accounts.",
                        icon: Database
                      },
                      {
                        title: "Change Compromised Passwords",
                        description: "Immediately change any password found in a data breach.",
                        icon: RefreshCw
                      },
                      {
                        title: "Monitor for Breaches",
                        description: "Regularly check if your accounts have been compromised.",
                        icon: Eye
                      }
                    ].map((tip, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30"
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 bg-orange-500/20 rounded-lg border border-orange-400/30">
                            <tip.icon className="w-5 h-5 text-orange-400" />
                          </div>
                          <h4 className="text-orange-400 font-semibold">{tip.title}</h4>
                        </div>
                        <p className="text-slate-300 text-sm">{tip.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default PasswordBreach
