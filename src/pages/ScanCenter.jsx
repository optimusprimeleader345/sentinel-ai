import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { Scan, Globe, Mail, FileText, Shield, AlertTriangle, CheckCircle, XCircle, Zap, Target, Activity } from 'lucide-react'
import { scanWebsite, scanIP, checkPasswordBreach, scanPhishing } from '../lib/api.js'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'

function ScanCenter() {
  const [scanType, setScanType] = useState('url')
  const [inputValue, setInputValue] = useState('')
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)
  const [error, setError] = useState('')

  const scanTypes = [
    { id: 'url', label: 'URL Scan', icon: Globe, placeholder: 'https://example.com' },
    { id: 'ip', label: 'IP Scan', icon: Target, placeholder: '192.168.1.1' },
    { id: 'email', label: 'Email Scan', icon: Mail, placeholder: 'Paste email content here...' },
    { id: 'password', label: 'Password Breach', icon: Shield, placeholder: 'Enter password to check' }
  ]

  const currentScanType = scanTypes.find(type => type.id === scanType)

  // Risk score calculation engine
  const calculateRiskScore = (apiResult, type) => {
    let score = 0

    switch (type) {
      case 'url':
        if (apiResult?.isSafe === false) score += 50 // malware
        if (apiResult?.safeBrowsingResults?.length > 0) score += 40 // phishing
        break
      case 'ip':
        if (apiResult?.isMalicious) score += 60 // blacklist
        if (apiResult?.abuseConfidence > 30) score += 30 // abuse reports
        break
      case 'email':
        if (apiResult?.riskLevel === 'HIGH') score += 50 // malicious links
        if (apiResult?.threatsDetected?.some(t => t.type?.includes('spoof'))) score += 40 // spoofed headers
        break
      case 'password':
        const breachCount = apiResult?.breachCount || 0
        if (breachCount > 1000) score += 80
        else if (breachCount > 100) score += 50
        break
    }

    return Math.min(score, 100)
  }

  const getRiskLevel = (score) => {
    if (score <= 25) return 'LOW'
    if (score <= 50) return 'MEDIUM'
    if (score <= 75) return 'HIGH'
    return 'CRITICAL'
  }

  const getThreatCategories = (apiResult, type) => {
    const categories = []

    switch (type) {
      case 'url':
        if (apiResult?.safeBrowsingResults?.length > 0) categories.push('phishing')
        if (apiResult?.isSafe === false) categories.push('malware')
        break
      case 'ip':
        if (apiResult?.isMalicious) categories.push('blacklist')
        if (apiResult?.abuseConfidence > 30) categories.push('abuse')
        break
      case 'email':
        if (apiResult?.threatsDetected?.some(t => t.type?.includes('spoof'))) categories.push('spoofing')
        if (apiResult?.riskLevel === 'HIGH') categories.push('malicious')
        break
      case 'password':
        if (apiResult?.breachCount > 0) categories.push('breach')
        break
    }

    return categories
  }

  const generateAIExplanation = (apiResult, type, riskScore) => {
    if (riskScore === 0) return "No threats detected. This target appears safe."

    let explanation = ""
    switch (type) {
      case 'url':
        explanation = apiResult?.isSafe === false
          ? "This URL has been flagged by security systems for containing malicious content or leading to phishing attempts."
          : "Safe browsing checks indicate potential security concerns with this URL."
        break
      case 'ip':
        explanation = apiResult?.isMalicious
          ? "This IP address is associated with malicious activities and has been reported for abuse."
          : "This IP shows suspicious patterns that may indicate security risks."
        break
      case 'email':
        explanation = apiResult?.riskLevel === 'HIGH'
          ? "This email content contains indicators commonly associated with phishing or malicious campaigns."
          : "Analysis detected potential security concerns in the email content."
        break
      case 'password':
        const count = apiResult?.breachCount || 0
        explanation = count > 1000
          ? "This password has been exposed in numerous data breaches and should be changed immediately."
          : "This password appears in known breach databases and may be compromised."
        break
    }
    return explanation
  }

  const generateRecommendedActions = (apiResult, type, riskLevel) => {
    const actions = []

    if (riskLevel === 'CRITICAL' || riskLevel === 'HIGH') {
      actions.push("🚫 IMMEDIATE ACTION: Isolate and block this target")
      actions.push("🔍 Conduct thorough security investigation")
      actions.push("📊 Log incident for compliance reporting")
    }

    if (riskLevel === 'MEDIUM') {
      actions.push("⚠️ MONITOR: Keep under observation")
      actions.push("🔒 Implement additional security controls")
    }

    switch (type) {
      case 'url':
        if (riskLevel !== 'LOW') actions.push("🚫 Do not click links from this domain")
        break
      case 'ip':
        if (riskLevel !== 'LOW') actions.push("🚫 Block this IP in firewall rules")
        break
      case 'email':
        if (riskLevel !== 'LOW') actions.push("🚫 Do not interact with email content")
        break
      case 'password':
        if (riskLevel !== 'LOW') actions.push("🔑 Change password immediately and enable 2FA")
        break
    }

    if (riskLevel === 'LOW') {
      actions.push("✅ Continue normal operations")
      actions.push("👁️ Maintain regular monitoring")
    }

    return actions
  }

  const handleScan = async () => {
    if (!inputValue.trim()) {
      setError('Please enter a value to scan')
      return
    }

    setIsScanning(true)
    setError('')
    setScanResult(null)

    try {
      let apiResult

      switch (scanType) {
        case 'url':
          apiResult = await scanWebsite({ url: inputValue.trim() })
          break
        case 'ip':
          apiResult = await scanIP({ ip: inputValue.trim() })
          break
        case 'email':
          // For email scan, we'll use phishing detection with email content
          apiResult = await scanPhishing({ url: inputValue.trim() })
          break
        case 'password':
          apiResult = await checkPasswordBreach({ password: inputValue.trim() })
          break
      }

      // Calculate unified risk score
      const riskScore = calculateRiskScore(apiResult.data, scanType)
      const riskLevel = getRiskLevel(riskScore)
      const threatCategories = getThreatCategories(apiResult.data, scanType)
      const aiExplanation = generateAIExplanation(apiResult.data, scanType, riskScore)
      const recommendedActions = generateRecommendedActions(apiResult.data, scanType, riskLevel)

      setScanResult({
        target: inputValue.trim(),
        threatDetected: riskScore > 0,
        threatCategories,
        riskScore,
        riskLevel,
        confidence: apiResult.data?.abuseConfidence || apiResult.data?.score || riskScore,
        aiExplanation,
        recommendedActions,
        rawData: apiResult.data,
        scanType
      })

    } catch (err) {
      console.error('Scan error:', err)
      setError('Scan temporarily unavailable')
    } finally {
      setIsScanning(false)
    }
  }

  const getRiskColor = (level) => {
    switch (level) {
      case 'LOW': return 'text-green-400'
      case 'MEDIUM': return 'text-yellow-400'
      case 'HIGH': return 'text-orange-400'
      case 'CRITICAL': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getRiskIcon = (level) => {
    switch (level) {
      case 'LOW': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'MEDIUM': return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'HIGH':
      case 'CRITICAL': return <XCircle className="w-5 h-5 text-red-400" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Scan className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Unified Scan Center</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Enterprise-grade security scanning and threat analysis</p>

        {/* Scan Type Selection */}
        <Card className="mb-8" hover>
          <div className="flex flex-wrap gap-2 mb-6">
            {scanTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => {
                  setScanType(type.id)
                  setInputValue('')
                  setScanResult(null)
                  setError('')
                }}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all ${
                  scanType === type.id
                    ? 'bg-cyan-500/20 border-cyan-400 text-cyan-400'
                    : 'bg-slate-800/50 border-slate-700 text-slate-300 hover:border-slate-600'
                }`}
              >
                <type.icon className="w-4 h-4" />
                <span className="font-medium">{type.label}</span>
              </button>
            ))}
          </div>

          {/* Input Field */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-cyan-400 mb-2">
                {currentScanType.label} Input
              </label>
              {scanType === 'email' ? (
                <textarea
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentScanType.placeholder}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none"
                  disabled={isScanning}
                />
              ) : (
                <input
                  type={scanType === 'password' ? 'password' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={currentScanType.placeholder}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
                  disabled={isScanning}
                />
              )}
            </div>

            <Button
              onClick={handleScan}
              disabled={isScanning || !inputValue.trim()}
              className="w-full"
            >
              {isScanning ? (
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4"
                  >
                    <Target className="w-4 h-4" />
                  </motion.div>
                  <span>Running Scan...</span>
                </div>
              ) : (
                'Run Scan'
              )}
            </Button>
          </div>
        </Card>

        {/* Loading Animation */}
        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex justify-center py-12"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 mx-auto mb-4"
                >
                  <div className="w-full h-full border-4 border-cyan-400 border-t-transparent rounded-full"></div>
                </motion.div>
                <p className="text-cyan-400 font-medium">Analyzing target...</p>
                <p className="text-slate-400 text-sm mt-2">Running security scans and threat intelligence</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error Display */}
        {error && (
          <Card className="mb-8 border-red-500/20 bg-red-900/10">
            <div className="flex items-center space-x-3">
              <XCircle className="w-6 h-6 text-red-400" />
              <div>
                <h3 className="text-red-400 font-medium">Scan Error</h3>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Results Panel */}
        <AnimatePresence>
          {scanResult && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <Card className="border-cyan-500/20 bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl">
                <div className="flex items-center space-x-3 mb-6">
                  <Shield className="w-6 h-6 text-cyan-400" />
                  <h2 className="text-xl font-bold text-slate-200">Scan Results</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Target Scanned</div>
                      <div className="text-slate-200 font-mono text-sm break-all">{scanResult.target}</div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Threat Detected</div>
                      <div className="flex items-center space-x-2">
                        {scanResult.threatDetected ? (
                          <XCircle className="w-4 h-4 text-red-400" />
                        ) : (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        )}
                        <span className={scanResult.threatDetected ? 'text-red-400' : 'text-green-400'}>
                          {scanResult.threatDetected ? 'YES' : 'NO'}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Threat Categories</div>
                      <div className="flex flex-wrap gap-1">
                        {scanResult.threatCategories.length > 0 ? (
                          scanResult.threatCategories.map((category, idx) => (
                            <span key={idx} className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">
                              {category}
                            </span>
                          ))
                        ) : (
                          <span className="text-green-400 text-sm">None detected</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Risk Score</div>
                      <div className="text-2xl font-bold text-slate-200">{scanResult.riskScore}/100</div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Risk Level</div>
                      <div className="flex items-center space-x-2">
                        {getRiskIcon(scanResult.riskLevel)}
                        <span className={`font-bold ${getRiskColor(scanResult.riskLevel)}`}>
                          {scanResult.riskLevel}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-sm text-slate-400 mb-1">Confidence %</div>
                      <div className="text-slate-200">{Math.round(scanResult.confidence)}%</div>
                    </div>
                  </div>
                </div>

                {/* AI Explanation */}
                <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="flex items-center space-x-2 mb-3">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-cyan-400 font-medium">AI Explanation</h3>
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed">{scanResult.aiExplanation}</p>
                </div>

                {/* Recommended Actions */}
                <div className="mt-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                  <div className="flex items-center space-x-2 mb-3">
                    <Activity className="w-4 h-4 text-cyan-400" />
                    <h3 className="text-cyan-400 font-medium">Recommended Actions</h3>
                  </div>
                  <ul className="space-y-2">
                    {scanResult.recommendedActions.map((action, idx) => (
                      <li key={idx} className="text-slate-300 text-sm flex items-start space-x-2">
                        <span className="text-cyan-400 mt-0.5">•</span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ScanCenter
