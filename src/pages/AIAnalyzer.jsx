import { useState } from 'react'
import { motion } from 'framer-motion'
import { Brain, Sparkles, Loader } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import SeverityBadge from '../components/SeverityBadge'
import { aiAPI } from '../lib/api.js'

function AIAnalyzer() {
  const [input, setInput] = useState('')
  const [analyzing, setAnalyzing] = useState(false)
  const [result, setResult] = useState(null)

  const handleAnalyze = async () => {
    if (!input.trim()) return

    setAnalyzing(true)
    setResult(null)

    try {
      const response = await aiAPI.analyze({ input })
      setResult(response.data)
    } catch (error) {
      console.error('Analysis error:', error)
      // Optional: set an error state or toast
    } finally {
      setAnalyzing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Brain className="w-6 h-6 text-indigo-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Threat Analyzer</h2>
            <p className="text-sm text-slate-400">Analyze logs and text for security threats</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Paste logs or text here...
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter log data, error messages, or any text you want to analyze for security threats..."
              className="w-full h-64 px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm resize-none"
            />
            <p className="mt-2 text-xs text-slate-500">
              {input.length} characters
            </p>
          </div>

          <Button
            onClick={handleAnalyze}
            disabled={!input.trim() || analyzing}
            size="lg"
            className="w-full sm:w-auto"
          >
            {analyzing ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze with Sentinel AI
              </>
            )}
          </Button>
        </div>
      </Card>

      {/* Results Panel */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card>
            <h3 className="text-lg font-semibold text-white mb-6">Analysis Results</h3>
            <div className="space-y-6">
              {/* Summary */}
              <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-yellow-200">Threat Detected</p>
                  <SeverityBadge severity={result.severity} />
                </div>
                <p className="text-sm text-yellow-100">{result.summary}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-400 mb-1">Confidence Score</p>
                  <p className="text-2xl font-bold text-white">{result.confidence}%</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 mb-1">Severity Level</p>
                  <SeverityBadge severity={result.severity} />
                </div>
              </div>

              {/* Threats List */}
              <div>
                <p className="text-sm font-semibold text-white mb-3">Identified Threats:</p>
                <ul className="space-y-2">
                  {result.threats.map((threat, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-red-400 mt-1">•</span>
                      <span className="text-sm text-slate-300">{threat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Remediation */}
              <div className="p-4 bg-blue-900/20 border border-blue-500/30 rounded-lg">
                <p className="text-sm font-semibold text-blue-200 mb-2">Suggested Remediation:</p>
                <p className="text-sm text-blue-100">{result.remediation}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      )}
    </div>
  )
}

export default AIAnalyzer
