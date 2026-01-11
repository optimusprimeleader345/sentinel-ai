import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Globe,
  Search,
  Shield,
  AlertTriangle,
  CheckCircle,
  X,
  Target,
  Zap,
  Activity,
  Eye,
  Clock,
  Award,
  ExternalLink,
  Server,
  Network,
  RefreshCw,
  TrendingUp,
  BarChart3,
  Settings,
  Lock,
  Unlock,
  Filter,
  Download,
  Upload,
  FileText,
  Image,
  Wifi,
  Key,
  Layers,
  Camera,
  FileDown,
  Share2,
  Bell,
  Calendar,
  Play,
  Pause,
  RotateCcw,
  CheckSquare,
  Square
} from 'lucide-react'
import { scanWebsite } from '../lib/api.js'
import siemEngine from '../services/siemEngine.js'

const URLScanner = () => {
  const [url, setUrl] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState('')
  const [selectedTab, setSelectedTab] = useState('overview')
  const [scanHistory, setScanHistory] = useState([])
  const [threatStats, setThreatStats] = useState({
    totalScans: 0,
    threatsFound: 0,
    safeSites: 0,
    lastUpdated: new Date()
  })

  // Premium Features State
  const [batchMode, setBatchMode] = useState(false)
  const [batchUrls, setBatchUrls] = useState('')
  const [batchResults, setBatchResults] = useState([])
  const [isBatchScanning, setIsBatchScanning] = useState(false)
  const [sslInfo, setSslInfo] = useState(null)
  const [screenshotUrl, setScreenshotUrl] = useState('')
  const [alertsEnabled, setAlertsEnabled] = useState(false)
  const [scheduledScans, setScheduledScans] = useState([])
  const [exportFormat, setExportFormat] = useState('pdf')
  const [isExporting, setIsExporting] = useState(false)
  const [advancedMode, setAdvancedMode] = useState(false)
  const [customRules, setCustomRules] = useState([])

  // Update threat stats periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setThreatStats(prev => ({
        ...prev,
        lastUpdated: new Date()
      }))
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  const handleScan = async () => {
    if (!url.trim()) {
      setError('Please enter a URL to scan')
      return
    }

    setIsScanning(true)
    setError('')
    setScanResult(null)

    try {
      const result = await scanWebsite({ url: url.trim() })
      setScanResult(result.data)

      // Add to scan history
      const newScan = {
        ...result.data,
        timestamp: new Date().toISOString(),
        scanId: `SCAN-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`
      }
      setScanHistory(prev => [newScan, ...prev].slice(0, 10))

      // Update stats
      setThreatStats(prev => ({
        ...prev,
        totalScans: prev.totalScans + 1,
        threatsFound: prev.threatsFound + (result.data.isSafe ? 0 : 1),
        safeSites: prev.safeSites + (result.data.isSafe ? 1 : 0)
      }))

      // Log to SIEM
      siemEngine.ingestEvent({
        source: 'URL_SCAN',
        eventType: result.data.isSafe ? 'SAFE_URL' : 'MALICIOUS_URL',
        severity: result.data.isSafe ? 'LOW' : 'HIGH',
        asset: url.trim(),
        metadata: {
          threatScore: result.data.score,
          riskLevel: result.data.riskLevel
        }
      })

    } catch (err) {
      setError(err.response?.data?.message || 'Scan failed')
    } finally {
      setIsScanning(false)
    }
  }

  const clearResult = () => {
    setScanResult(null)
    setError('')
  }

  // Premium Features Functions
  const handleBatchScan = async () => {
    if (!batchUrls.trim()) return

    setIsBatchScanning(true)
    setBatchResults([])
    const urls = batchUrls.split('\n').map(url => url.trim()).filter(url => url)

    for (let i = 0; i < urls.length; i++) {
      try {
        const result = await scanWebsite({ url: urls[i] })
        setBatchResults(prev => [...prev, {
          url: urls[i],
          result: result.data,
          status: 'completed'
        }])
      } catch (err) {
        setBatchResults(prev => [...prev, {
          url: urls[i],
          error: err.message,
          status: 'failed'
        }])
      }

      // Small delay between scans to avoid rate limiting
      if (i < urls.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000))
      }
    }

    setIsBatchScanning(false)
  }

  const generateScreenshot = async () => {
    if (!url.trim()) return
    // Mock screenshot generation - in real app this would call screenshot API
    setScreenshotUrl(`https://api.screenshotapi.net/screenshot?url=${encodeURIComponent(url)}&token=demo`)
  }

  const checkSSL = async () => {
    if (!url.trim()) return
    // Mock SSL check - in real app this would call SSL API
    setSslInfo({
      valid: true,
      issuer: 'DigiCert Inc',
      expires: '2025-12-31',
      protocol: 'TLS 1.3'
    })
  }

  const exportResults = async () => {
    setIsExporting(true)
    // Mock export functionality
    const data = {
      scanResult,
      timestamp: new Date().toISOString(),
      exportFormat
    }

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `url-scan-${Date.now()}.${exportFormat === 'pdf' ? 'pdf' : 'json'}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    setIsExporting(false)
  }

  const toggleAlerts = () => {
    setAlertsEnabled(!alertsEnabled)
    // In real app, this would save to user preferences
  }

  const scheduleScan = () => {
    // Mock scheduling functionality
    const newSchedule = {
      id: Date.now(),
      url: url,
      frequency: 'daily',
      nextRun: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    }
    setScheduledScans(prev => [...prev, newSchedule])
  }

  const Card = ({ children, className = "", title, icon: Icon }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {(title || Icon) && (
        <div className="flex items-center space-x-3 mb-6">
          {Icon && (
            <div className="p-2 bg-green-500/20 rounded-lg border border-green-400/30">
              <Icon className="w-5 h-5 text-green-400" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-6 border-b border-green-500/30 bg-slate-900/80 backdrop-blur-xl"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              URL Threat Scanner
            </h1>
            <p className="text-slate-400 text-sm">Advanced web security analysis with AI-powered threat detection</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-2 bg-slate-800/50 rounded-lg border border-slate-600/50">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-slate-300">{threatStats.totalScans} scans today</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="p-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-green-500/50 transition-all"
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
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30'
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

            {/* URL Input Card */}
            <Card title="URL Analysis" icon={Search}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-2">Enter URL to scan</label>
                  <div className="relative">
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="w-full pl-4 pr-12 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/25"
                      disabled={isScanning}
                    />
                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: isScanning ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleScan}
                  disabled={isScanning || !url.trim()}
                  className="w-full flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-all duration-200"
                >
                  {isScanning ? (
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
                      <Shield className="w-5 h-5" />
                      <span>Start Scan</span>
                    </>
                  )}
                </motion.button>

                {url && (
                  <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-600/30">
                    <div className="text-sm text-slate-400 mb-1">URL Preview:</div>
                    <div className="text-sm text-green-400 break-all">{url}</div>
                  </div>
                )}
              </div>
            </Card>

            {/* Quick Stats */}
            <Card title="Scan Statistics" icon={BarChart3}>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Total Scans</span>
                  <span className="text-white font-semibold">{threatStats.totalScans}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Threats Found</span>
                  <span className="text-red-400 font-semibold">{threatStats.threatsFound}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-slate-800/40 rounded-lg">
                  <span className="text-slate-400">Safe Sites</span>
                  <span className="text-green-400 font-semibold">{threatStats.safeSites}</span>
                </div>
                <div className="text-xs text-slate-500 mt-2">
                  Last updated: {threatStats.lastUpdated.toLocaleTimeString()}
                </div>
              </div>
            </Card>

            {/* Premium Features */}
            <Card title="Advanced Tools" icon={Settings}>
              <div className="space-y-4">
                {/* Batch Scanning */}
                <div>
                  <button
                    onClick={() => setBatchMode(!batchMode)}
                    className="w-full flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-600/30 hover:border-green-400/50 transition-all"
                  >
                    <div className="flex items-center space-x-3">
                      <Upload className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Batch Scanning</span>
                    </div>
                    {batchMode ? <CheckSquare className="w-5 h-5 text-green-400" /> : <Square className="w-5 h-5 text-slate-400" />}
                  </button>

                  {batchMode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="mt-3 space-y-3"
                    >
                      <textarea
                        placeholder="Enter URLs to scan (one per line)&#10;https://example1.com&#10;https://example2.com"
                        value={batchUrls}
                        onChange={(e) => setBatchUrls(e.target.value)}
                        className="w-full h-32 p-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400/25 resize-none"
                        disabled={isBatchScanning}
                      />
                      <motion.button
                        whileHover={{ scale: isBatchScanning ? 1 : 1.02 }}
                        onClick={handleBatchScan}
                        disabled={isBatchScanning || !batchUrls.trim()}
                        className="w-full flex items-center justify-center space-x-3 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-all"
                      >
                        {isBatchScanning ? (
                          <>
                            <RefreshCw className="w-4 h-4 animate-spin" />
                            <span>Batch Scanning...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Start Batch Scan</span>
                          </>
                        )}
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                {/* SSL Analysis */}
                <button
                  onClick={checkSSL}
                  disabled={!url.trim()}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-600/30 hover:border-green-400/50 disabled:opacity-50 disabled:hover:border-slate-600/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">SSL Certificate Check</span>
                  </div>
                  <Wifi className="w-5 h-5 text-slate-400" />
                </button>

                {/* Screenshot Preview */}
                <button
                  onClick={generateScreenshot}
                  disabled={!url.trim()}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-600/30 hover:border-green-400/50 disabled:opacity-50 disabled:hover:border-slate-600/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Camera className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Generate Screenshot</span>
                  </div>
                  <Image className="w-5 h-5 text-slate-400" />
                </button>

                {/* Scheduled Scans */}
                <button
                  onClick={scheduleScan}
                  disabled={!url.trim()}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-600/30 hover:border-green-400/50 disabled:opacity-50 disabled:hover:border-slate-600/30 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Schedule Scan</span>
                  </div>
                  <span className="text-sm text-slate-400">{scheduledScans.length}</span>
                </button>

                {/* Alerts Toggle */}
                <button
                  onClick={toggleAlerts}
                  className="w-full flex items-center justify-between p-3 bg-slate-800/40 rounded-lg border border-slate-600/30 hover:border-green-400/50 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-green-400" />
                    <span className="text-white font-medium">Threat Alerts</span>
                  </div>
                  {alertsEnabled ? <CheckSquare className="w-5 h-5 text-green-400" /> : <Square className="w-5 h-5 text-slate-400" />}
                </button>

                {/* Export Options */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <select
                      value={exportFormat}
                      onChange={(e) => setExportFormat(e.target.value)}
                      className="flex-1 px-3 py-2 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-green-400"
                    >
                      <option value="json">JSON Export</option>
                      <option value="pdf">PDF Report</option>
                      <option value="csv">CSV Data</option>
                    </select>
                    <button
                      onClick={exportResults}
                      disabled={!scanResult || isExporting}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-all"
                    >
                      {isExporting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <FileDown className="w-4 h-4" />
                      )}
                      <span>Export</span>
                    </button>
                  </div>
                </div>
              </div>
            </Card>

            {/* SSL Information */}
            {sslInfo && (
              <Card title="SSL Certificate" icon={Key}>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <span className={`font-semibold ${sslInfo.valid ? 'text-green-400' : 'text-red-400'}`}>
                      {sslInfo.valid ? 'Valid' : 'Invalid'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Issuer:</span>
                    <span className="text-white">{sslInfo.issuer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Expires:</span>
                    <span className="text-white">{new Date(sslInfo.expires).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Protocol:</span>
                    <span className="text-green-400">{sslInfo.protocol}</span>
                  </div>
                </div>
              </Card>
            )}

            {/* Screenshot Preview */}
            {screenshotUrl && (
              <Card title="Website Screenshot" icon={Camera}>
                <div className="text-center">
                  <img
                    src={screenshotUrl}
                    alt="Website screenshot"
                    className="w-full rounded-lg border border-slate-600/50"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                  <p className="text-slate-400 text-sm mt-2">Screenshot preview (demo)</p>
                </div>
              </Card>
            )}

            {/* Scheduled Scans */}
            {scheduledScans.length > 0 && (
              <Card title="Scheduled Scans" icon={Calendar}>
                <div className="space-y-3">
                  {scheduledScans.map((schedule, idx) => (
                    <div key={schedule.id} className="p-3 bg-slate-800/40 rounded-lg border border-slate-600/30">
                      <div className="flex justify-between items-center">
                        <span className="text-white font-medium break-all">{schedule.url}</span>
                        <span className="text-green-400 text-sm">{schedule.frequency}</span>
                      </div>
                      <div className="text-slate-400 text-sm mt-1">
                        Next run: {new Date(schedule.nextRun).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">

            {/* Overview Tab */}
            {selectedTab === 'overview' && (
              <>
                {/* Scanning Status */}
                <AnimatePresence mode="wait">
                  {isScanning && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded-xl p-8 backdrop-blur-xl"
                    >
                      <div className="text-center">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 mx-auto mb-4 border-4 border-green-400 border-t-transparent rounded-full"
                        />
                        <h3 className="text-xl font-bold text-white mb-2">Analyzing URL...</h3>
                        <p className="text-slate-400">Checking against multiple threat intelligence sources</p>
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
                  {scanResult && !isScanning && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* Risk Score Card */}
                      <Card title="Risk Assessment" icon={Target}>
                        <div className="flex items-center justify-between mb-6">
                          <div className="flex items-center space-x-4">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center border-4 ${
                              scanResult.isSafe
                                ? 'border-green-400 bg-green-400/10'
                                : 'border-red-400 bg-red-400/10'
                            }`}>
                              <span className={`text-2xl font-bold ${
                                scanResult.isSafe ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {scanResult.score}
                              </span>
                            </div>
                            <div>
                              <h3 className={`text-xl font-bold ${
                                scanResult.isSafe ? 'text-green-400' : 'text-red-400'
                              }`}>
                                {scanResult.riskLevel} Risk
                              </h3>
                              <p className="text-slate-400 text-sm">
                                {scanResult.isSafe ? 'URL appears safe' : 'Potential security threats detected'}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${
                              scanResult.isSafe
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            }`}>
                              {scanResult.isSafe ? (
                                <Lock className="w-4 h-4" />
                              ) : (
                                <Unlock className="w-4 h-4" />
                              )}
                              <span>{scanResult.isSafe ? 'SECURE' : 'WARNING'}</span>
                            </div>
                          </div>
                        </div>

                        {/* Risk Breakdown */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-green-400 mb-1">
                              {scanResult.safeBrowsingResults?.length || 0}
                            </div>
                            <div className="text-sm text-slate-400">Google SafeBrowsing Hits</div>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-blue-400 mb-1">
                              {scanResult.virusTotal?.length || 0}
                            </div>
                            <div className="text-sm text-slate-400">VirusTotal Detections</div>
                          </div>
                          <div className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30">
                            <div className="text-2xl font-bold text-purple-400 mb-1">
                              {scanResult.suspiciousPatterns?.length || 0}
                            </div>
                            <div className="text-sm text-slate-400">Suspicious Patterns</div>
                          </div>
                        </div>
                      </Card>

                      {/* URL Details */}
                      <Card title="URL Information" icon={Globe}>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Domain:</span>
                            <span className="text-white">{scanResult.url?.split('/')[2] || 'N/A'}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Protocol:</span>
                            <span className="text-green-400">{scanResult.url?.split(':')[0]}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Path:</span>
                            <span className="text-white text-sm break-all">{scanResult.url?.split('/').slice(3).join('/') || '/'}</span>
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

                  {/* Batch Results Display */}
                  {batchResults.length > 0 && !isBatchScanning && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <Card title="Batch Scan Results" icon={Upload}>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-white font-semibold">
                              {batchResults.filter(r => r.status === 'completed').length} of {batchResults.length} URLs scanned
                            </span>
                            <div className="flex items-center space-x-4">
                              <span className="text-green-400">
                                {batchResults.filter(r => r.result?.isSafe).length} Safe
                              </span>
                              <span className="text-red-400">
                                {batchResults.filter(r => r.result && !r.result.isSafe).length} Threats
                              </span>
                            </div>
                          </div>

                          {batchResults.map((item, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="p-4 bg-slate-800/40 rounded-lg border border-slate-600/30"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${
                                    item.status === 'completed'
                                      ? (item.result?.isSafe ? 'bg-green-400' : 'bg-red-400')
                                      : 'bg-orange-400'
                                  }`} />
                                  <span className="text-white font-medium break-all">{item.url}</span>
                                </div>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  item.status === 'completed'
                                    ? (item.result?.isSafe ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400')
                                    : 'bg-orange-500/20 text-orange-400'
                                }`}>
                                  {item.status === 'completed'
                                    ? (item.result?.isSafe ? 'SAFE' : 'THREAT')
                                    : 'FAILED'}
                                </span>
                              </div>

                              {item.result && (
                                <div className="text-sm text-slate-400 mt-2">
                                  Risk Level: {item.result.riskLevel} • Score: {item.result.score}
                                </div>
                              )}

                              {item.error && (
                                <div className="text-sm text-red-400 mt-2">
                                  Error: {item.error}
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </Card>
                    </motion.div>
                  )}

                  {/* Welcome State */}
                  {!scanResult && !error && !isScanning && batchResults.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-16"
                    >
                      <div className="max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full flex items-center justify-center border border-green-400/30">
                          <Shield className="w-10 h-10 text-green-400" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Ready to Scan</h3>
                        <p className="text-slate-400">
                          Enter a URL above to begin comprehensive threat analysis using multiple security intelligence sources.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {/* Threats Tab */}
            {selectedTab === 'threats' && scanResult && (
              <div className="space-y-6">
                <Card title="Threat Analysis" icon={Shield}>
                  {scanResult.safeBrowsingResults?.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-red-400 font-semibold">Google SafeBrowsing Threats</h4>
                      {scanResult.safeBrowsingResults.map((threat, idx) => (
                        <div key={idx} className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertTriangle className="w-5 h-5 text-red-400" />
                            <span className="text-red-400 font-semibold">{threat.threatType}</span>
                          </div>
                          <p className="text-red-300 text-sm">Platform: {threat.platformType}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {scanResult.suspiciousPatterns?.length > 0 && (
                    <div className="space-y-4 mt-6">
                      <h4 className="text-orange-400 font-semibold">Suspicious Patterns</h4>
                      {scanResult.suspiciousPatterns.map((pattern, idx) => (
                        <div key={idx} className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Zap className="w-5 h-5 text-orange-400" />
                            <span className="text-orange-400 font-semibold">{pattern.type}</span>
                            <span className={`px-2 py-1 rounded text-xs ${
                              pattern.severity === 'HIGH' ? 'bg-red-500/20 text-red-300' :
                              pattern.severity === 'MEDIUM' ? 'bg-orange-500/20 text-orange-300' :
                              'bg-yellow-500/20 text-yellow-300'
                            }`}>
                              {pattern.severity}
                            </span>
                          </div>
                          <p className="text-orange-300 text-sm">{pattern.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {scanResult.isSafe && (
                    <div className="text-center py-8">
                      <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                      <h4 className="text-green-400 font-semibold text-lg">No Threats Detected</h4>
                      <p className="text-slate-400">This URL appears to be safe based on current intelligence.</p>
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
                              scan.isSafe ? 'bg-green-400' : 'bg-red-400'
                            }`} />
                            <span className="text-white font-medium break-all">{scan.url}</span>
                          </div>
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            scan.isSafe ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                          }`}>
                            {scan.riskLevel}
                          </span>
                        </div>
                        <div className="text-sm text-slate-400">
                          {new Date(scan.timestamp).toLocaleString()} • Score: {scan.score}
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
                <Card title="Analytics Dashboard" icon={BarChart3}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-gradient-to-br from-green-500/10 to-teal-500/10 rounded-lg border border-green-500/30">
                      <div className="text-3xl font-bold text-green-400 mb-2">{threatStats.safeSites}</div>
                      <div className="text-slate-400">Safe URLs Scanned</div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                        <div
                          className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                          style={{ width: threatStats.totalScans > 0 ? `${(threatStats.safeSites / threatStats.totalScans) * 100}%` : '0%' }}
                        />
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/30">
                      <div className="text-3xl font-bold text-red-400 mb-2">{threatStats.threatsFound}</div>
                      <div className="text-slate-400">Threats Detected</div>
                      <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                        <div
                          className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full"
                          style={{ width: threatStats.totalScans > 0 ? `${(threatStats.threatsFound / threatStats.totalScans) * 100}%` : '0%' }}
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

export default URLScanner
