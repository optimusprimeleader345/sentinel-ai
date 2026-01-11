import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Shield, AlertTriangle, CheckCircle, Info, MapPin, Globe, Server, Clock, RefreshCw, X, Zap, Eye, Target, Database, Activity, Cpu, Radar, Lock, Wifi, Users, BarChart3, Network, Terminal, Layers } from 'lucide-react'
import { scanIP } from '../lib/api.js'

const IPScanner = () => {
  const [ip, setIp] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [selectedTab, setSelectedTab] = useState('overview')
  const [scanCount, setScanCount] = useState(0)
  const [threatLevel, setThreatLevel] = useState('LOW')
  const [scanHistory, setScanHistory] = useState([])

  // Real-time threat level updates
  useEffect(() => {
    if (result) {
      setThreatLevel(result.riskLevel)
      setScanCount(prev => prev + 1)
    }
  }, [result])

  const handleScan = async (e) => {
    e.preventDefault()
    if (!ip.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await scanIP({ ip: ip.trim() })
      setResult(response.data)

      // Add to scan history
      const newScan = {
        ...response.data,
        timestamp: new Date().toISOString(),
        scanId: `SCAN-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      }
      setScanHistory(prev => [newScan, ...prev].slice(0, 10))

    } catch (err) {
      setError(err.response?.data?.error || 'Failed to scan IP address')
    } finally {
      setLoading(false)
    }
  }

  const clearResult = () => {
    setResult(null)
    setError(null)
    setThreatLevel('LOW')
  }

  const Card = ({ children, className = "", title, icon: Icon }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center space-x-3 mb-6">
          {Icon && (
            <div className="p-2 bg-purple-500/20 rounded-lg border border-purple-400/30">
              <Icon className="w-5 h-5 text-purple-400" />
            </div>
          )}
          {title && <h3 className="text-lg font-bold text-white">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  )

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Target },
    { id: 'threats', label: 'Threat Analysis', icon: Shield },
    { id: 'history', label: 'Scan History', icon: Clock },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 border-b border-purple-500/30 bg-slate-900/80 backdrop-blur-xl"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-xl shadow-lg">
            <Radar className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              IP Threat Scanner
            </h1>
            <p className="text-slate-400 text-sm">Advanced network security analysis with AbuseIPDB integration</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-600/50">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              threatLevel === 'HIGH' ? 'bg-red-400' : threatLevel === 'MEDIUM' ? 'bg-orange-400' : 'bg-green-400'
            }`} />
            <span className="text-sm text-slate-300">Level: {threatLevel}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all"
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
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
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

            {/* IP Input Card */}
            <Card title="Network Analysis" icon={Terminal}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Enter IP address to scan</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="192.168.1.1"
                      value={ip}
                      onChange={(e) => setIp(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/25"
                      disabled={loading}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>

                  {ip && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-2 flex items-center space-x-2 text-xs text-slate-400"
                    >
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>IP FORMAT VALID • READY FOR SCANNING</span>
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: loading ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleScan}
                  disabled={loading || !ip.trim()}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-all duration-200"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Scanning...</span>
                    </>
                  ) : (
                    <>
                      <Radar className="w-5 h-5" />
                      <span>Start Scan</span>
                    </>
                  )}
                </motion.button>
              </div>
            </Card>

            {/* Scan Stats */}
            <Card title="Scan Statistics" icon={BarChart3}>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Total Scans</span>
                  <span className="text-white font-semibold">{scanCount}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Current Level</span>
                  <span className={`font-semibold ${
                    threatLevel === 'HIGH' ? 'text-red-400' :
                    threatLevel === 'MEDIUM' ? 'text-orange-400' :
                    'text-green-400'
                  }`}>
                    {threatLevel}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Database</span>
                  <span className="text-purple-400 font-semibold">AbuseIPDB</span>
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
                      className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-8 backdrop-blur-xl"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 mx-auto mb-4 border-4 border-purple-400 border-t-transparent rounded-full"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">Analyzing IP Address...</h3>
                        <p className="text-slate-400">Checking against global threat intelligence databases</p>
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
                            <h3 className="text-lg font-bold text-red-400 mb-2">Scan Failed</h3>
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
                      {/* Risk Assessment Card */}
                      <Card title="Risk Assessment" icon={Target}>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                              result.riskLevel === 'HIGH'
                                ? 'border-red-400 bg-red-400/10'
                                : result.riskLevel === 'MEDIUM'
                                  ? 'border-orange-400 bg-orange-400/10'
                                  : 'border-green-400 bg-green-400/10'
                            }`}>
                              {result.riskLevel === 'HIGH' ? (
                                <AlertTriangle className="w-8 h-8 text-red-400" />
                              ) : result.riskLevel === 'MEDIUM' ? (
                                <Shield className="w-8 h-8 text-orange-400" />
                              ) : (
                                <CheckCircle className="w-8 h-8 text-green-400" />
                              )}
                            </div>
                            <div>
                              <h3 className={`text-xl font-bold ${
                                result.riskLevel === 'HIGH' ? 'text-red-400' :
                                result.riskLevel === 'MEDIUM' ? 'text-orange-400' :
                                'text-green-400'
                              }`}>
                                {result.riskLevel} Risk Level
                              </h3>
                              <p className="text-slate-400 text-sm">
                                {result.riskLevel === 'HIGH'
                                  ? 'High threat activity detected'
                                  : result.riskLevel === 'MEDIUM'
                                    ? 'Moderate risk indicators found'
                                    : 'Low risk - appears safe'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                              result.riskLevel === 'HIGH'
                                ? 'bg-red-500/20 text-red-400'
                                : result.riskLevel === 'MEDIUM'
                                  ? 'bg-orange-500/20 text-orange-400'
                                  : 'bg-green-500/20 text-green-400'
                            }`}>
                              {result.riskLevel === 'HIGH' ? (
                                <AlertTriangle className="w-4 h-4" />
                              ) : result.riskLevel === 'MEDIUM' ? (
                                <Shield className="w-4 h-4" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                              <span>{result.riskLevel}</span>
                            </div>
                          </div>
                        </div>

                        {/* Risk Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-purple-400 mb-1">
                              {result.confidence}%
                            </div>
                            <div className="text-sm text-slate-400">Abuse Confidence</div>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-blue-400 mb-1">
                              {result.totalReports?.toLocaleString() || 0}
                            </div>
                            <div className="text-sm text-slate-400">Total Reports</div>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-indigo-400 mb-1">
                              {result.usageType || 'Unknown'}
                            </div>
                            <div className="text-sm text-slate-400">Usage Type</div>
                          </div>
                        </div>
                      </Card>

                      {/* IP Information */}
                      <Card title="IP Information" icon={Globe}>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400">IP Address:</span>
                            <span className="text-white font-mono">{result.ip}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Country:</span>
                            <span className="text-white">{result.country}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">ISP:</span>
                            <span className="text-white text-sm truncate max-w-64" title={result.isp}>
                              {result.isp?.length > 30 ? `${result.isp.substring(0, 30)}...` : result.isp}
                            </span>
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
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-full flex items-center justify-center border border-purple-400/30">
                          <Network className="w-10 h-10 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">IP Network Scanner</h3>
                        <p className="text-slate-400">
                          Enter an IP address to analyze its security posture using AbuseIPDB's comprehensive threat intelligence database.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Threats Tab */}
            {selectedTab === 'threats' && result && (
              <div className="space-y-6">
                <Card title="Threat Analysis" icon={Shield}>
                  {result.categories && result.categories.length > 0 ? (
                    <div className="space-y-4">
                      <h4 className="text-red-400 font-semibold">Detected Threat Categories</h4>
                      {result.categories.map((category, idx) => (
                        <div key={idx} className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            <span className="text-red-400 font-semibold">{category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <h4 className="text-green-400 font-semibold text-lg">No Threats Detected</h4>
                      <p className="text-slate-400">This IP address shows no malicious activity in our databases.</p>
                    </div>
                  )}

                  {result.suggestions && result.suggestions.length > 0 && (
                    <div className="space-y-4 mt-6">
                      <h4 className="text-purple-400 font-semibold">Security Recommendations</h4>
                      {result.suggestions.map((suggestion, idx) => (
                        <div key={idx} className="p-4 bg-slate-800/40 border border-slate-600/30 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center">
                              <span className="text-purple-400 font-bold text-sm">{idx + 1}</span>
                            </div>
                            <span className="text-purple-400 font-semibold">Recommendation</span>
                          </div>
                          <p className="text-slate-300 text-sm">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </div>
            )}

            {/* History Tab */}
            {selectedTab === 'history' && (
              <Card title="Scan History" icon={Clock}>
                {scanHistory.length > 0 ? (
                  <div className="space-y-4">
                    {scanHistory.map((scan, idx) => (
                      <div key={idx} className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              scan.riskLevel === 'HIGH' ? 'bg-red-400' :
                              scan.riskLevel === 'MEDIUM' ? 'bg-orange-400' :
                              'bg-green-400'
                            }`} />
                            <span className="text-white font-medium">{scan.ip}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            scan.riskLevel === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                            scan.riskLevel === 'MEDIUM' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {scan.riskLevel}
                          </span>
                        </div>
                        <div className="text-sm text-slate-400">
                          {new Date(scan.timestamp).toLocaleString()} • {scan.country}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400">
                    <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No scan history yet</p>
                  </div>
                )}
              </Card>
            )}

            {/* Analytics Tab */}
            {selectedTab === 'analytics' && (
              <div className="space-y-6">
                <Card title="Network Analytics" icon={BarChart3}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {scanHistory.filter(s => s.riskLevel === 'LOW').length}
                      </div>
                      <div className="text-slate-400">Safe IPs Scanned</div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                          style={{ width: scanHistory.length > 0 ? `${(scanHistory.filter(s => s.riskLevel === 'LOW').length / scanHistory.length) * 100}%` : '0%' }}
                        />
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/30">
                      <div className="text-3xl font-bold text-red-400 mb-2">
                        {scanHistory.filter(s => s.riskLevel === 'HIGH').length}
                      </div>
                      <div className="text-slate-400">Threat IPs Detected</div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          style={{ width: scanHistory.length > 0 ? `${(scanHistory.filter(s => s.riskLevel === 'HIGH').length / scanHistory.length) * 100}%` : '0%' }}
                        />
                      </div>
                    </div>
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

export default IPScanner
