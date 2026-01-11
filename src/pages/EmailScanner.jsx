import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Mail, Scan, AlertTriangle, CheckCircle, XCircle, Clock, Shield, Target, FileText } from 'lucide-react'
import { scanAPI } from '../lib/api.js'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'
import SeverityBadge from '../components/SeverityBadge.jsx'

function EmailScanner() {
  const [emailText, setEmailText] = useState('')
  const [scanResult, setScanResult] = useState(null)
  const [isScanning, setIsScanning] = useState(false)
  const [scanHistory, setScanHistory] = useState([])

  useEffect(() => {
    loadScanHistory()
  }, [])

  const loadScanHistory = async () => {
    try {
      const response = await scanAPI.getHistory()
      const emailScans = response.data.filter(scan => scan.type === 'email')
      setScanHistory(emailScans || [])
    } catch (error) {
      console.error('Error loading scan history:', error)
    }
  }

  const handleScanEmail = async () => {
    if (!emailText.trim()) return

    setIsScanning(true)
    setScanResult(null)

    try {
      const response = await scanAPI.scanEmail({ email: emailText })
      setScanResult(response.data)
      loadScanHistory() // Refresh history after scan
    } catch (error) {
      console.error('Scan error:', error)
      setScanResult({
        error: 'Failed to scan email. Please try again.',
        isPhishing: false,
        score: 0,
        riskLevel: 'ERROR'
      })
    } finally {
      setIsScanning(false)
    }
  }

  const getStatusColor = (riskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'text-red-400'
      case 'MEDIUM':
        return 'text-yellow-400'
      case 'LOW':
        return 'text-green-400'
      default:
        return 'text-slate-400'
    }
  }

  const getStatusIcon = (riskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return <XCircle className="w-6 h-6 text-red-400" />
      case 'MEDIUM':
        return <AlertTriangle className="w-6 h-6 text-yellow-400" />
      case 'LOW':
        return <CheckCircle className="w-6 h-6 text-green-400" />
      default:
        return <Clock className="w-6 h-6 text-slate-400" />
    }
  }

  const getBadgeVariant = (riskLevel) => {
    switch (riskLevel) {
      case 'HIGH':
        return 'danger'
      case 'MEDIUM':
        return 'warning'
      case 'LOW':
        return 'success'
      default:
        return 'secondary'
    }
  }

  const exampleEmail = `Subject: Urgent Security Alert - Action Required

Dear Valued Customer,

Your account security has been compromised. We have detected suspicious activity on your account and immediate verification is required to prevent account suspension.

Please verify your account information immediately by clicking the link below:
https://secure-bank123.com/verify

If you do not verify within 24 hours, your account will be temporarily locked for security purposes.

Thank you for your attention to this matter.

Best regards,
Security Team
Bank of America`

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Mail className="w-8 h-8 text-cyan-400" />
          <div>
            <h1 className="text-4xl font-bold neon-text">Email Threat Scanner</h1>
            <p className="text-slate-400">Advanced phishing & malware detection using AI and Google SafeBrowsing</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Email Input Section */}
          <div className="space-y-6">
            <Card className="hover" hover>
              <div className="flex items-center space-x-3 mb-6">
                <FileText className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-slate-200">Email Content</h2>
              </div>

              <div className="space-y-4">
                <textarea
                  placeholder="Paste your email content here..."
                  value={emailText}
                  onChange={(e) => setEmailText(e.target.value)}
                  rows={12}
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none font-mono text-sm"
                />

                <div className="flex items-center justify-between">
                  <Button
                    onClick={() => setEmailText(exampleEmail)}
                    variant="ghost"
                    size="sm"
                    className="text-cyan-400 hover:text-cyan-300"
                  >
                    Load Example Phishing Email
                  </Button>

                  <Button
                    onClick={handleScanEmail}
                    disabled={isScanning || !emailText.trim()}
                    className="flex items-center space-x-2"
                  >
                    {isScanning ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        <span>Scanning...</span>
                      </>
                    ) : (
                      <>
                        <Scan className="w-4 h-4" />
                        <span>Scan Email</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Scan History */}
            {scanHistory.length > 0 && (
              <Card hover>
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="w-5 h-5 text-cyan-400" />
                  <h3 className="text-lg font-semibold text-slate-200">Recent Scans</h3>
                </div>
                <div className="space-y-3">
                  {scanHistory.slice(0, 5).map((scan) => (
                    <div key={scan._id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          scan.status === 'threat' ? 'bg-red-500' :
                          scan.status === 'suspicious' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                        <div>
                          <p className="text-sm text-slate-300 truncate max-w-xs">
                            {scan.target}
                          </p>
                          <p className="text-xs text-slate-500">
                            {new Date(scan.scannedAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-medium ${
                          scan.status === 'threat' ? 'text-red-400' :
                          scan.status === 'suspicious' ? 'text-yellow-400' : 'text-green-400'
                        }`}>
                          {scan.status}
                        </p>
                        <p className="text-xs text-slate-500">
                          Score: {scan.riskScore}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Results Section */}
          <div className="space-y-6">
            {isScanning && (
              <Card hover>
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-cyan-400 font-medium">Analyzing email for threats...</p>
                    <p className="text-slate-500 text-sm mt-2">
                      Checking keywords • Analyzing URLs • Google SafeBrowsing lookup
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {scanResult && !scanResult.error && (
              <>
                {/* Overall Result */}
                <Card hover className={`border-2 ${
                  scanResult.riskLevel === 'HIGH' ? 'border-red-500/30' :
                  scanResult.riskLevel === 'MEDIUM' ? 'border-yellow-500/30' :
                  'border-green-500/30'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(scanResult.riskLevel)}
                      <div>
                        <h3 className="text-xl font-bold text-slate-200">Analysis Results</h3>
                        <p className="text-sm text-slate-400">
                          {scanResult.isPhishing ? 'Potential phishing email detected' : 'Email appears safe'}
                        </p>
                      </div>
                    </div>
                    <SeverityBadge variant={getBadgeVariant(scanResult.riskLevel)}>
                      {scanResult.riskLevel} RISK
                    </SeverityBadge>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-800/30 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">Phishing Score</p>
                      <p className={`text-xl font-bold ${getStatusColor(scanResult.riskLevel)}`}>
                        {scanResult.score}%
                      </p>
                    </div>
                    <div className="bg-slate-800/30 p-3 rounded-lg">
                      <p className="text-xs text-slate-400 mb-1">Threat Level</p>
                      <p className="text-sm font-medium text-slate-200">
                        {scanResult.isPhishing ? 'HIGH THREAT' : 'SAFE'}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Detailed Findings */}
                <Card hover>
                  <h4 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                    <Target className="w-5 h-5 text-cyan-400" />
                    <span>Detailed Findings</span>
                  </h4>

                  <div className="space-y-4">
                    {/* Detected Keywords */}
                    {scanResult.detectedKeywords.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">⚠️ Detected Phishing Keywords</h5>
                        <div className="flex flex-wrap gap-2">
                          {scanResult.detectedKeywords.map((keyword, index) => (
                            <span key={index} className="px-2 py-1 bg-red-900/20 text-red-400 rounded text-xs">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suspicious Links */}
                    {scanResult.suspiciousLinks.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">🔗 Suspicious Links ({scanResult.suspiciousLinks.length})</h5>
                        <div className="space-y-2">
                          {scanResult.suspiciousLinks.map((link, index) => (
                            <div key={index} className="p-2 bg-slate-800/30 rounded text-xs font-mono text-red-300">
                              {link}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* SafeBrowsing Hits */}
                    {scanResult.safeBrowsingHits.length > 0 && (
                      <div>
                        <h5 className="text-sm font-medium text-slate-300 mb-2">🚨 Google SafeBrowsing Alerts</h5>
                        <div className="space-y-2">
                          {scanResult.safeBrowsingHits.map((hit, index) => (
                            <div key={index} className="p-3 bg-red-900/20 border border-red-700/50 rounded">
                              <p className="text-xs text-red-400 font-medium">{hit.threatType}</p>
                              <p className="text-xs text-slate-300">{hit.url}</p>
                              <p className="text-xs text-slate-500">Platform: {hit.platformType}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No threats found */}
                    {scanResult.detectedKeywords.length === 0 &&
                     scanResult.suspiciousLinks.length === 0 &&
                     scanResult.safeBrowsingHits.length === 0 && (
                      <div className="text-center py-4">
                        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-sm text-green-400 font-medium">No security threats detected</p>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Security Recommendations */}
                <Card hover>
                  <h4 className="text-lg font-semibold text-slate-200 mb-4 flex items-center space-x-2">
                    <Shield className="w-5 h-5 text-cyan-400" />
                    <span>Security Recommendations</span>
                  </h4>

                  <div className="space-y-3">
                    {scanResult.suggestions.map((suggestion, index) => (
                      <div key={index} className={`p-3 rounded-lg ${
                        suggestion.includes('Do NOT') || suggestion.includes('Report') ?
                        'bg-red-900/20 border border-red-700/50' :
                        suggestion.includes('Verify') || suggestion.includes('manually') ?
                        'bg-yellow-900/20 border border-yellow-700/50' :
                        'bg-slate-800/30'
                      }`}>
                        <p className="text-sm text-slate-200">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            )}

            {scanResult?.error && (
              <Card hover className="border-2 border-red-500/30">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-6 h-6 text-red-400" />
                  <p className="text-red-400 font-medium">Scan Failed</p>
                </div>
                <p className="text-slate-400 text-sm mt-2">{scanResult.error}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailScanner
