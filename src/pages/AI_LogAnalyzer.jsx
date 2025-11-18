import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileText, Upload, AlertTriangle, BarChart3, PieChart, Clock, Download, Brain, Sparkles, Loader } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import SeverityBadge from '../components/SeverityBadge'
import { analyzeLogs, uploadLogFile, getLogAnomalies, getLogEvents, getLogTimeline } from '../lib/api.js'

function AI_LogAnalyzer() {
  const [logText, setLogText] = useState('')
  const [logFile, setLogFile] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [anomalies, setAnomalies] = useState([])
  const [events, setEvents] = useState([])
  const [timeline, setTimeline] = useState([])

  // Load mock data on component mount
  useEffect(() => {
    loadMockData()
  }, [])

  const loadMockData = async () => {
    try {
      const [anomaliesRes, eventsRes, timelineRes] = await Promise.all([
        getLogAnomalies(),
        getLogEvents(),
        getLogTimeline()
      ])
      setAnomalies(anomaliesRes.data || [])
      setEvents(eventsRes.data || [])
      setTimeline(timelineRes.data || [])
    } catch (error) {
      console.error('Error loading mock data:', error)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setLogFile(file)
      // Read file content for preview
      const reader = new FileReader()
      reader.onload = (e) => setLogText(e.target.result)
      reader.readAsText(file)
    }
  }

  const handleAnalyze = async () => {
    if (!logText.trim() && !logFile) return

    setAnalyzing(true)
    setAnalysisResult(null)

    try {
      let response
      if (logFile) {
        const formData = new FormData()
        formData.append('logFile', logFile)
        response = await uploadLogFile(formData)
      } else {
        response = await analyzeLogs({ logData: logText })
      }
      setAnalysisResult(response.data)
    } catch (error) {
      console.error('Analysis error:', error)
      // Mock fallback data
      setAnalysisResult({
        summary: "AI-powered log analysis detected potential security anomalies",
        anomalies: ["Unusual login time: 2:30 AM", "Suspicious device change", "High-volume failed attempts"],
        frequent_events: ["Authentication failures", "Database connection timeouts", "API rate limiting"],
        event_distribution: {
          info: 245,
          warning: 67,
          error: 23,
          critical: 5
        },
        attack_patterns: [
          { type: "Brute force attempts", count: 15, severity: "high" },
          { type: "Port scanning", count: 8, severity: "medium" },
          { type: "Privilege escalation attempts", count: 3, severity: "critical" }
        ]
      })
    } finally {
      setAnalyzing(false)
    }
  }

  const exportReport = () => {
    // Mock export functionality
    alert('AI Log Report export initiated (PDF generation mock)')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Log Analyzer (SIEM + UEBA)</h2>
            <p className="text-sm text-slate-400">Advanced AI-powered security log analysis and anomaly detection</p>
          </div>
        </div>
      </Card>

      {/* Log Upload Section */}
      <Card>
        <div className="space-y-6">
          <div className="flex items-center space-x-2 mb-4">
            <FileText className="w-5 h-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">Upload Logs</h3>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Log File (.log, .txt)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".log,.txt"
                onChange={handleFileChange}
                className="block w-full text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
              />
              <Upload className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Or Paste Raw Logs
            </label>
            <textarea
              value={logText}
              onChange={(e) => setLogText(e.target.value)}
              placeholder="Paste your security logs here for AI analysis..."
              className="w-full h-48 px-4 py-3 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm text-slate-300 bg-slate-800 resize-none"
            />
            <p className="mt-2 text-xs text-slate-500">
              {logText.length} characters
            </p>
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!logText.trim() && !logFile}
            size="lg"
            className="w-full sm:w-auto"
          >
            {analyzing ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Analyzing Logs...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Logs
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* AI Summary */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <div className="flex items-center space-x-2 mb-4">
              <Brain className="w-5 h-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">AI Log Summary</h3>
            </div>
            <div className="p-4 bg-green-900/20 border border-green-500/30 rounded-lg">
              <p className="text-sm text-green-100 mb-3">{analysisResult.summary}</p>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-green-200">Key Anomalies:</p>
                <ul className="space-y-1">
                  {analysisResult.anomalies?.map((anomaly, index) => (
                    <li key={index} className="text-sm text-green-100">• {anomaly}</li>
                  ))}
                </ul>
                <p className="text-sm font-semibold text-green-200 mt-3">Most Frequent Events:</p>
                <ul className="space-y-1">
                  {analysisResult.frequent_events?.map((event, index) => (
                    <li key={index} className="text-sm text-green-100">• {event}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      )}

      {/* UEBA Anomaly Detection */}
      <Card>
        <div className="flex items-center space-x-2 mb-6">
          <AlertTriangle className="w-5 h-5 text-orange-400" />
          <h3 className="text-lg font-semibold text-white">UEBA Anomaly Detection</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {anomalies.length > 0 ? anomalies.map((anomaly, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-500/30 rounded-lg shadow-neon-red"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-red-200">{anomaly.type}</p>
                <SeverityBadge severity={anomaly.severity} />
              </div>
              <p className="text-xs text-red-100">{anomaly.description}</p>
              <p className="text-xs text-red-300 mt-2">{anomaly.timestamp}</p>
            </motion.div>
          )) : (
            <div className="p-4 bg-gray-900/50 border border-gray-600 rounded-lg">
              <p className="text-sm text-gray-400">No anomalies detected</p>
            </div>
          )}
        </div>
      </Card>

      {/* Event Classification */}
      <Card>
        <div className="flex items-center space-x-2 mb-6">
          <PieChart className="w-5 h-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-white">Event Classification</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {events.length > 0 ? events.map((event, index) => (
            <div key={index} className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-center">
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                event.level === 'critical' ? 'bg-red-900/50 text-red-300 border border-red-500/30' :
                event.level === 'error' ? 'bg-orange-900/50 text-orange-300 border border-orange-500/30' :
                event.level === 'warning' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30' :
                'bg-blue-900/50 text-blue-300 border border-blue-500/30'
              }`}>
                {event.level.toUpperCase()}
              </div>
              <p className="text-2xl font-bold text-white">{event.count}</p>
            </div>
          )) : (
            ['Info', 'Warning', 'Error', 'Critical'].map((level, index) => (
              <div key={index} className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-center">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold mb-2 ${
                  level === 'Critical' ? 'bg-red-900/50 text-red-300 border border-red-500/30' :
                  level === 'Error' ? 'bg-orange-900/50 text-orange-300 border border-orange-500/30' :
                  level === 'Warning' ? 'bg-yellow-900/50 text-yellow-300 border border-yellow-500/30' :
                  'bg-blue-900/50 text-blue-300 border border-blue-500/30'
                }`}>
                  {level.toUpperCase()}
                </div>
                <p className="text-2xl font-bold text-white">0</p>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Attack Pattern Detection */}
      <Card>
        <div className="flex items-center space-x-2 mb-6">
          <BarChart3 className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Attack Pattern Detection</h3>
        </div>
        <div className="space-y-4">
          {analysisResult?.attack_patterns?.map((pattern, index) => (
            <div key={index} className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold text-white">{pattern.type}</p>
                <div className="flex items-center space-x-2">
                  <SeverityBadge severity={pattern.severity} />
                  <span className="text-sm text-slate-400">{pattern.count} incidents</span>
                </div>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    pattern.severity === 'critical' ? 'bg-red-500' :
                    pattern.severity === 'high' ? 'bg-orange-500' :
                    pattern.severity === 'medium' ? 'bg-yellow-500' :
                    'bg-green-500'
                  }`}
                  style={{ width: `${Math.min((pattern.count / 20) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )) || (
            <div className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-center">
              <p className="text-sm text-slate-400">No attack patterns detected</p>
            </div>
          )}
        </div>
      </Card>

      {/* Log Timeline Visualization */}
      <Card>
        <div className="flex items-center space-x-2 mb-6">
          <Clock className="w-5 h-5 text-indigo-400" />
          <h3 className="text-lg font-semibold text-white">Log Timeline Visualization</h3>
        </div>
        <div className="space-y-4 max-h-64 overflow-y-auto">
          {timeline.length > 0 ? timeline.map((event, index) => (
            <div key={index} className="flex items-start space-x-4 p-3 bg-slate-800/30 rounded-lg">
              <div className="flex-shrink-0 w-2">
                <div className={`w-2 h-2 rounded-full ${
                  event.severity === 'critical' ? 'bg-red-500 shadow-neon-red' :
                  event.severity === 'error' ? 'bg-orange-500 shadow-neon-orange' :
                  event.severity === 'warning' ? 'bg-yellow-500 shadow-neon-yellow' :
                  'bg-blue-500 shadow-neon-blue'
                }`}></div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white">{event.message}</p>
                  <span className="text-xs text-slate-400">{event.timestamp}</span>
                </div>
                <p className="text-xs text-slate-500">{event.source}</p>
              </div>
            </div>
          )) : (
            <div className="p-4 bg-slate-800/50 border border-slate-600 rounded-lg text-center">
              <p className="text-sm text-slate-400">No timeline data available</p>
            </div>
          )}
        </div>
      </Card>

      {/* Export Report */}
      <Card>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Download className="w-5 h-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">Export AI Log Report</h3>
          </div>
          <Button onClick={exportReport} variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default AI_LogAnalyzer
