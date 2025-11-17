import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import {
  FileQuestion,
  Upload,
  Play,
  Shield,
  Eye,
  AlertCircle,
  CheckCircle,
  XCircle,
  MessageSquare,
  Zap,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react'
import { deepfakeAPI } from '../lib/api.js'
import {
  analyzeDeepfake,
  getDeepfakeForensics,
  getDeepfakeFrames,
  getDeepfakeTimeline,
  explainDeepfake,
  getDeepfakeRecommendations
} from '../lib/api.js'

function DeepfakeDetector() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisResult, setAnalysisResult] = useState(null)
  const [forensics, setForensics] = useState([])
  const [frames, setFrames] = useState([])
  const [timeline, setTimeline] = useState([])
  const [aiExplanation, setAiExplanation] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'video/mp4', 'video/webm']
      if (!allowedTypes.includes(file.type)) {
        setError('Unsupported file type. Only JPG, PNG, MP4, and WebM files are allowed.')
        return
      }

      // Validate file size (50MB)
      if (file.size > 50 * 1024 * 1024) {
        setError('File too large. Maximum size is 50MB.')
        return
      }

      setSelectedFile(file)
      setError('')
      setAnalysisResult(null)
      setForensics([])
      setFrames([])
      setTimeline([])
      setAiExplanation('')
    }
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setIsAnalyzing(true)
    setError('')

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)

      const response = await deepfakeAPI.analyze(selectedFile)
      const result = response.data

      setAnalysisResult(result)

      // Fetch additional data
      const [forensicsRes, timelineRes, recsRes] = await Promise.all([
        getDeepfakeForensics(result.id),
        getDeepfakeTimeline(result.id),
        getDeepfakeRecommendations()
      ])

      setForensics(forensicsRes.data)
      setTimeline(timelineRes.data)
      setRecommendations(recsRes.data)

      if (result.isVideo) {
        const framesRes = await getDeepfakeFrames(result.id)
        setFrames(framesRes.data.frames)
      }

    } catch (err) {
      console.error('Analysis error:', err)
      setError(err.response?.data?.error || 'Failed to analyze the file. Please try again.')
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleExplain = async () => {
    if (!analysisResult) return

    try {
      const response = await explainDeepfake({ id: analysisResult.id })
      setAiExplanation(response.data.explanation)
    } catch (err) {
      setAiExplanation('Failed to generate explanation.')
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
          <FileQuestion className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Deepfake Detector</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">AI-powered deepfake detection and analysis</p>

        {/* File Upload Component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Upload className="w-6 h-6 text-cyan-400" />
            <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Image & Video Upload + Analysis
            </h2>
          </div>

          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-600/50 rounded-lg p-8 text-center hover:border-cyan-400/50 transition-colors">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                onChange={handleFileSelect}
                className="hidden"
              />

              {!selectedFile ? (
                <div onClick={() => fileInputRef.current?.click()} className="cursor-pointer">
                  <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-300 mb-2">Drop your file here or click to browse</p>
                  <p className="text-slate-500 text-sm">Support: JPG, PNG, MP4, WebM (max 50MB)</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center space-x-3 mb-4">
                    {selectedFile.type.startsWith('image/') ? (
                      <Play className="w-8 h-8 text-cyan-400" />
                    ) : (
                      <Play className="w-8 h-8 text-cyan-400" />
                    )}
                    <div className="text-left">
                      <p className="text-slate-300 font-medium">{selectedFile.name}</p>
                      <p className="text-slate-500 text-sm">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <div className="flex space-x-4 justify-center">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Change File
                    </button>
                  </div>
                </div>
              )}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg"
              >
                <p className="text-red-400">{error}</p>
              </motion.div>
            )}

            {selectedFile && !error && (
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze for Deepfake'}
              </motion.button>
            )}
          </div>
        </motion.div>

        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-center items-center h-64 mb-8"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full"
            />
            <p className="ml-4 text-slate-300">Analyzing file with AI detection algorithms...</p>
          </motion.div>
        )}

        {/* AI Detection Result Card */}
        {analysisResult && !isAnalyzing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-8"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI Detection Result
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center">
                <div className={`text-6xl font-bold mb-4 ${analysisResult.label === 'fake' ? 'text-red-400' : 'text-green-400'}`}>
                  {analysisResult.label === 'fake' ? <ThumbsDown /> : <ThumbsUp />}
                </div>
                <div className={`text-4xl font-bold mb-2 ${analysisResult.label === 'fake' ? 'text-red-400' : 'text-green-400'}`}>
                  {analysisResult.label.toUpperCase()}
                </div>
                <div className="text-slate-400">Confidence Score</div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">{analysisResult.confidence}%</div>

                <div className="relative inline-block w-48 h-4 bg-slate-700 rounded-full mb-4">
                  <div
                    className={`h-4 rounded-full transition-all duration-1000 ${
                      analysisResult.label === 'fake' ? 'bg-gradient-to-r from-red-500 to-red-600' : 'bg-gradient-to-r from-green-500 to-green-600'
                    }`}
                    style={{ width: `${analysisResult.confidence}%` }}
                  ></div>
                </div>
              </div>

              <div className="space-y-4">
                {analysisResult.details && Object.entries(analysisResult.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-slate-300 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
                    <span className={`px-2 py-1 rounded text-xs ${value ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                      {value ? 'Detected' : 'Clear'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Forensic Analysis Breakdown */}
        {forensics.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Eye className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Forensic Analysis Breakdown
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {forensics.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-slate-300 font-medium">{item.name}</h3>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.status === 'Fake' || item.status === 'Suspicious'
                          ? 'bg-red-500/20 text-red-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <div className="mb-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.severity === 'Critical'
                          ? 'bg-red-500/20 text-red-400'
                          : item.severity === 'High'
                          ? 'bg-orange-500/20 text-orange-400'
                          : item.severity === 'Medium'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-green-500/20 text-green-400'
                      }`}
                    >
                      {item.severity}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Frame-by-Frame Video Inspection */}
        {frames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Play className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Frame-by-Frame Video Inspection
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {frames.map((frame, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className={`relative rounded-lg overflow-hidden border-2 ${
                    frame.sus ? 'border-red-500/50' : 'border-green-500/50'
                  }`}
                >
                  <img
                    src={frame.url || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzMzMzMzMyIvPjwvc3ZnPg=='}
                    alt={`Frame ${frame.index}`}
                    className="w-full h-32 object-cover"
                  />

                  {frame.sus && (
                    <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-red-400" />
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                    Frame {frame.index} {frame.sus && '(Flagged)'}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Timeline of Suspicious Activity */}
        {timeline.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Timeline of Suspicious Activity
              </h2>
            </div>

            <div className="space-y-4">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start space-x-4"
                >
                  <div className="w-16 text-right">
                    <div className="text-cyan-400 font-mono text-sm">{event.time}</div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-slate-300 font-medium">{event.event}</span>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          event.severity === 'Critical'
                            ? 'bg-red-500/20 text-red-400'
                            : event.severity === 'High'
                            ? 'bg-orange-500/20 text-orange-400'
                            : event.severity === 'Medium'
                            ? 'bg-yellow-500/20 text-yellow-400'
                            : 'bg-green-500/20 text-green-400'
                        }`}
                      >
                        {event.severity}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm">{event.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Explainer */}
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-cyan-400" />
                <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  AI Explainer (Why is it {analysisResult.label === 'fake' ? 'Fake' : 'Real'}?)
                </h2>
              </div>

              {!aiExplanation && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleExplain}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-colors text-white text-sm font-medium"
                >
                  Generate Explanation
                </motion.button>
              )}
            </div>

            {aiExplanation && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20"
              >
                <p className="text-slate-300 leading-relaxed">{aiExplanation}</p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* AI Suggested Actions */}
        {recommendations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-cyan-400" />
              <h2 className="text-2xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                AI Suggested Actions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                >
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300 text-sm">{rec}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default DeepfakeDetector
