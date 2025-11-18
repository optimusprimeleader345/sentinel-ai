import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Scan, Globe, Mail, FileText, Shield, Zap, History, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { scanAPI, scanFile, checkReputation, explainScan } from '../lib/api.js'
import Card from '../components/Card.jsx'
import Button from '../components/Button.jsx'

function ScanCenter() {
  const [urlInput, setUrlInput] = useState('')
  const [urlResult, setUrlResult] = useState(null)
  const [urlLoading, setUrlLoading] = useState(false)

  const [emailInput, setEmailInput] = useState('')
  const [emailResult, setEmailResult] = useState(null)
  const [emailLoading, setEmailLoading] = useState(false)

  const [fileInput, setFileInput] = useState('')
  const [fileResult, setFileResult] = useState(null)
  const [fileLoading, setFileLoading] = useState(false)

  const [reputationInput, setReputationInput] = useState('')
  const [reputationResult, setReputationResult] = useState(null)
  const [reputationLoading, setReputationLoading] = useState(false)

  const [scanHistory, setScanHistory] = useState([])
  const [historyLoading, setHistoryLoading] = useState(false)

  const [explanation, setExplanation] = useState(null)

  useEffect(() => {
    loadScanHistory()
  }, [])

  const loadScanHistory = async () => {
    setHistoryLoading(true)
    try {
      const response = await scanAPI.getHistory()
      setScanHistory(response.data || [])
    } catch (error) {
      console.error('Error loading scan history:', error)
    }
    setHistoryLoading(false)
  }

  const handleUrlScan = async () => {
    if (!urlInput.trim()) return
    setUrlLoading(true)
    try {
      const response = await scanAPI.scanURL({ url: urlInput })
      setUrlResult(response.data)
    } catch (error) {
      setUrlResult({ error: 'Failed to scan URL' })
    }
    setUrlLoading(false)
  }

  const handleEmailScan = async () => {
    if (!emailInput.trim()) return
    setEmailLoading(true)
    try {
      const response = await scanAPI.scanEmail({ email: emailInput })
      setEmailResult(response.data)
    } catch (error) {
      setEmailResult({ error: 'Failed to scan email' })
    }
    setEmailLoading(false)
  }

  const handleFileScan = async () => {
    if (!fileInput.trim()) return
    setFileLoading(true)
    try {
      const response = await scanFile(fileInput)
      setFileResult(response.data)
    } catch (error) {
      setFileResult({ error: 'Failed to scan file' })
    }
    setFileLoading(false)
  }

  const handleReputationCheck = async () => {
    if (!reputationInput.trim()) return
    setReputationLoading(true)
    try {
      const response = await checkReputation(reputationInput)
      setReputationResult(response.data)
    } catch (error) {
      setReputationResult({ error: 'Failed to check reputation' })
    }
    setReputationLoading(false)
  }

  const getAiExplanation = async (result, type) => {
    try {
      const response = await explainScan({ resultType: type, rawData: result })
      setExplanation(response.data)
    } catch (error) {
      console.error('Error getting explanation:', error)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'safe': return 'text-green-400'
      case 'suspicious': return 'text-yellow-400'
      case 'malicious':
      case 'threat': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'safe': return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'suspicious': return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      case 'malicious':
      case 'threat': return <XCircle className="w-5 h-5 text-red-400" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Scan className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Scan Center</h1>
        </motion.div>
        <p className="text-slate-400">Centralized scanning and analysis hub</p>

        {/* URL Scanner */}
        <Card className="mt-8" hover>
          <div className="flex items-center space-x-3 mb-6">
            <Globe className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-200">URL Scanner</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="url"
                placeholder="https://example.com"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
              <Button
                onClick={handleUrlScan}
                disabled={urlLoading || !urlInput.trim()}
                className="w-full"
              >
                {urlLoading ? 'Scanning...' : 'Scan URL'}
              </Button>
            </div>
            <div className="space-y-4">
              {urlResult && !urlResult.error && (
                <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-400">Status</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(urlResult.classification)}
                      <span className={`font-medium ${getStatusColor(urlResult.classification)}`}>
                        {urlResult.classification?.toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-slate-300">
                    <div className="flex justify-between">
                      <span>Risk Score:</span>
                      <span>{urlResult.riskScore}%</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-2">
                      Confidence: {urlResult.riskScore > 50 ? 'High' : urlResult.riskScore > 30 ? 'Medium' : 'Low'}
                    </div>
                  </div>
                </div>
              )}
              {urlResult?.error && (
                <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-xl">
                  <p className="text-red-400 text-sm">{urlResult.error}</p>
                </div>
              )}
            </div>
          </div>
          {urlResult && !urlResult.error && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => getAiExplanation(urlResult, 'url')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Explain why this might be dangerous
              </Button>
            </div>
          )}
        </Card>

        {/* Email Scanner */}
        <Card className="mt-8" hover>
          <div className="flex items-center space-x-3 mb-6">
            <Mail className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-200">Email Text Scanner</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <textarea
                placeholder="Paste email content here..."
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50 resize-none"
              />
              <Button
                onClick={handleEmailScan}
                disabled={emailLoading || !emailInput.trim()}
                className="w-full"
              >
                {emailLoading ? 'Analyzing...' : 'Analyze Email'}
              </Button>
            </div>
            <div className="space-y-4">
              {emailResult && !emailResult.error && (
                <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-slate-400">Phishing Probability</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(emailResult.classification)}
                      <span className={`font-medium ${getStatusColor(emailResult.classification)}`}>
                        {emailResult.riskScore}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 text-xs text-slate-400">
                    <div>• Scam signals: {emailResult.riskScore > 50 ? 'High' : 'Low'}</div>
                    <div>• Suspicious keywords: {emailResult.riskScore > 70 ? 'Detected' : 'None'}</div>
                    <div>• AI analysis: {emailResult.classification === 'threat' ? 'Malicious' : 'Safe'}</div>
                  </div>
                </div>
              )}
              {emailResult?.error && (
                <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-xl">
                  <p className="text-red-400 text-sm">{emailResult.error}</p>
                </div>
              )}
            </div>
          </div>
          {emailResult && !emailResult.error && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => getAiExplanation(emailResult, 'email')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Explain why this might be dangerous
              </Button>
            </div>
          )}
        </Card>

        {/* File Scanner */}
        <Card className="mt-8" hover>
          <div className="flex items-center space-x-3 mb-6">
            <FileText className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-200">File Scanner (Mock)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="document.pdf, script.js, image.png, etc."
                value={fileInput}
                onChange={(e) => setFileInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
              <div className="text-xs text-slate-400">
                Supported: PDF, TXT, DOCX, PNG
              </div>
              <Button
                onClick={handleFileScan}
                disabled={fileLoading || !fileInput.trim()}
                className="w-full"
              >
                {fileLoading ? 'Scanning...' : 'Scan File'}
              </Button>
            </div>
            <div className="space-y-4">
              {fileResult && !fileResult.error && (
                <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">File Hash:</span>
                      <span className="text-xs font-mono text-cyan-400 bg-slate-900/50 px-2 py-1 rounded">
                        {fileResult.hash}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Virus Score:</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(fileResult.classification)}
                        <span className={`font-medium ${getStatusColor(fileResult.classification)}`}>
                          {fileResult.virusScore}%
                        </span>
                      </div>
                    </div>
                    {fileResult.indicators?.length > 0 && (
                      <div className="text-xs text-slate-400">
                        <div className="font-medium mb-1">Indicators:</div>
                        {fileResult.indicators.map((indicator, i) => (
                          <div key={i}>• {indicator}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              {fileResult?.error && (
                <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-xl">
                  <p className="text-red-400 text-sm">{fileResult.error}</p>
                </div>
              )}
            </div>
          </div>
          {fileResult && !fileResult.error && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => getAiExplanation(fileResult, 'file')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Explain why this might be dangerous
              </Button>
            </div>
          )}
        </Card>

        {/* Reputation Checker */}
        <Card className="mt-8" hover>
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-200">IP / Domain Reputation Checker</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="192.168.1.1 or example.com"
                value={reputationInput}
                onChange={(e) => setReputationInput(e.target.value)}
                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700/50 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/50"
              />
              <Button
                onClick={handleReputationCheck}
                disabled={reputationLoading || !reputationInput.trim()}
                className="w-full"
              >
                {reputationLoading ? 'Checking...' : 'Check Reputation'}
              </Button>
            </div>
            <div className="space-y-4">
              {reputationResult && !reputationResult.error && (
                <div className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Risk Score:</span>
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(reputationResult.classification)}
                        <span className={`font-medium ${getStatusColor(reputationResult.classification)}`}>
                          {reputationResult.riskScore}%
                        </span>
                      </div>
                    </div>
                    {reputationResult.asn && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">ASN:</span>
                        <span className="text-xs font-mono text-slate-300">{reputationResult.asn}</span>
                      </div>
                    )}
                    {reputationResult.geolocation && (
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Geolocation:</span>
                        <span className="text-sm text-slate-300">{reputationResult.geolocation}</span>
                      </div>
                    )}
                    {reputationResult.threatLabels?.length > 0 && (
                      <div className="text-xs text-slate-400">
                        <div className="font-medium mb-1">Threat Labels:</div>
                        <div className="flex flex-wrap gap-1">
                          {reputationResult.threatLabels.map((label, i) => (
                            <span key={i} className="bg-slate-700 px-2 py-1 rounded text-xs">
                              {label}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {reputationResult?.error && (
                <div className="p-4 bg-red-900/20 border border-red-700/50 rounded-xl">
                  <p className="text-red-400 text-sm">{reputationResult.error}</p>
                </div>
              )}
            </div>
          </div>
          {reputationResult && !reputationResult.error && (
            <div className="mt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => getAiExplanation(reputationResult, 'reputation')}
                className="text-cyan-400 hover:text-cyan-300"
              >
                <Zap className="w-4 h-4 mr-2" />
                Explain why this might be dangerous
              </Button>
            </div>
          )}
        </Card>

        {/* AI Explanation */}
        {explanation && (
          <Card className="mt-8" hover>
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-bold text-slate-200">AI Threat Analysis</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-2">Why is this dangerous?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{explanation.explanation}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-2">How should I handle this?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{explanation.handling}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-slate-300 mb-2">Recommended action:</h3>
                <p className="text-slate-400 text-sm leading-relaxed bg-slate-800/30 p-3 rounded-lg border border-slate-700/50">
                  {explanation.action}
                </p>
              </div>
            </div>
          </Card>
        )}

        {/* Scan History */}
        <Card className="mt-8" hover>
          <div className="flex items-center space-x-3 mb-6">
            <History className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-slate-200">Scan History</h2>
          </div>
          {historyLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Type</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Target</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Result</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Confidence</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {scanHistory.map((scan) => (
                    <tr key={scan._id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                      <td className="py-3 px-4 text-slate-300 capitalize">{scan.type}</td>
                      <td className="py-3 px-4 text-slate-300 font-mono text-xs max-w-xs truncate">
                        {scan.target}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(scan.status)}
                          <span className={`text-sm ${getStatusColor(scan.status)}`}>
                            {scan.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {scan.riskScore}%
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-xs">
                        {new Date(scan.scannedAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {scanHistory.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  No scans performed yet
                </div>
              )}
            </div>
          )}
        </Card>
      </div>
    </div>
  )
}

export default ScanCenter
