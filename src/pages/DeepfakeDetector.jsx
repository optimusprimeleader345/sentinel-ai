import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Camera, Upload, Shield, AlertTriangle, ThumbsUp, ThumbsDown, FileQuestion,
  CheckCircle, XCircle, Clock, Target, Brain, Zap, Play, MessageSquare, Eye,
  Globe, Network, Lock, Cpu, Settings, BarChart3, Activity, Layers,
  Fingerprint, Microscope, Database, ChevronDown, ChevronRight,
  RefreshCw, Wifi, WifiOff, Timer, AlertCircle, Zap as Lightning
} from "lucide-react";
import { deepfakeAPI } from '../lib/api.js'
import {
  analyzeDeepfake,
  getDeepfakeForensics,
  getDeepfakeFrames,
  getDeepfakeTimeline,
  explainDeepfake,
  getDeepfakeRecommendations
} from '../lib/api.js'
import SeverityBadge from '../components/SeverityBadge.jsx'

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

  // New advanced state variables
  const [expandedSections, setExpandedSections] = useState({
    models: false,
    forensic: false,
    timeline: true,
    realTime: false
  })
  const [realTimeMode, setRealTimeMode] = useState(false)
  const [streamStatus, setStreamStatus] = useState('disconnected')
  const [detectionMode, setDetectionMode] = useState('standard')
  const [externalAPIs, setExternalAPIs] = useState({
    microsoftVideoAuth: false,
    hivemind: true,
    deepware: false
  })
  const [batchMode, setBatchMode] = useState(false)
  const [batchProgress, setBatchProgress] = useState({ current: 0, total: 0 })
  const [confidenceThreshold, setConfidenceThreshold] = useState(65)

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

      // Safely handle the response structure with fallbacks
      setAnalysisResult({
        ...result,
        label: result.analysis?.isDeepfake ? 'fake' : 'real',
        confidence: result.analysis?.confidence ?? 0,
        details: result.analysis?.details ?? {},
        metadata: result.metadata ?? {}
      })

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
        <p className="text-slate-400 mb-8">Enterprise-grade deepfake detection with AI model ensemble, real-time analysis, and advanced forensics</p>

        {/* Advanced Controls Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Advanced Detection Controls
              </h2>
            </div>
            <div className="text-right">
              <div className="text-xs text-slate-400">Confidence Threshold</div>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="range"
                  min="50"
                  max="95"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(parseInt(e.target.value))}
                  className="w-16"
                />
                <span className="text-sm text-cyan-400 font-medium">{confidenceThreshold}%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Detection Mode */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 uppercase tracking-wide">Detection Mode</label>
              <select
                value={detectionMode}
                onChange={(e) => setDetectionMode(e.target.value)}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-sm text-slate-300"
              >
                <option value="standard">Standard</option>
                <option value="advanced">Advanced AI</option>
                <option value="forensic">Digital Forensics</option>
                <option value="military">Military Grade</option>
              </select>
            </div>

            {/* Real-time Toggle */}
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setRealTimeMode(!realTimeMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  realTimeMode ? 'bg-cyan-500' : 'bg-slate-600'
                }`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  realTimeMode ? 'translate-x-6' : 'translate-x-1'
                }`} />
              </button>
              <div className="flex flex-col">
                <span className="text-xs text-slate-400">Real-time</span>
                <span className="text-xs text-cyan-400">Analysis</span>
              </div>
            </div>

            {/* External APIs */}
            <div className="space-y-2">
              <label className="text-xs text-slate-400 uppercase tracking-wide">External APIs</label>
              <div className="flex space-x-2">
                {Object.entries(externalAPIs).map(([api, enabled]) => (
                  <button
                    key={api}
                    onClick={() => setExternalAPIs(prev => ({ ...prev, [api]: !prev[api] }))}
                    className={`px-2 py-1 rounded text-xs ${
                      enabled ? 'bg-cyan-500/20 border border-cyan-500/50 text-cyan-400' : 'bg-slate-700/50 border border-slate-600/50 text-slate-500'
                    }`}
                  >
                    {api === 'microsoftVideoAuth' ? 'MSFT' : api === 'hivemind' ? 'Hive' : 'Deep'}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Selection */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setExpandedSections(prev => ({ ...prev, models: !prev.models }))}
                className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white text-xs"
              >
                <Brain className="w-3 h-3" />
                <span>Model Config</span>
                <ChevronDown className={`w-3 h-3 transform transition-transform ${expandedSections.models ? 'rotate-180' : ''}`} />
              </button>
            </div>
          </div>

          {/* Expanded Model Configuration */}
          <AnimatePresence>
            {expandedSections.models && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="mt-4 border-t border-slate-700/50 pt-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries({
                    primaryDetector: { models: ['meso-4', 'xception', 'efficientnet', 'vit-face'] },
                    biometricDetector: { models: ['face-forensics', 'face-morphing', 'identity-spoofing'] },
                    temporalDetector: { models: ['motion-analysis', 'temporal-correlation', 'frame-consistency'] },
                    forensicDetector: { models: ['compression-artifact', 'frequency-analysis', 'metadata-forensic'] }
                  }).map(([detector, config]) => (
                    <div key={detector} className="space-y-2">
                      <h4 className="text-sm font-medium text-cyan-400 capitalize">{detector.replace('Detector', '')}</h4>
                      <div className="flex flex-wrap gap-1">
                        {config.models.map((model, idx) => (
                          <span key={idx} className="px-2 py-1 bg-slate-700/50 text-xs rounded border border-slate-600/30">
                            {model}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Live Stream Analysis Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Camera className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Real-Time Stream Analysis
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              {streamStatus === 'connected' ? (
                <Wifi className="w-5 h-5 text-green-400" />
              ) : streamStatus === 'analyzing' ? (
                <Timer className="w-5 h-5 text-yellow-400" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-400" />
              )}
              <span className={`text-xs capitalize ${streamStatus === 'connected' ? 'text-green-400' : streamStatus === 'analyzing' ? 'text-yellow-400' : 'text-red-400'}`}>
                {streamStatus}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStreamStatus('analyzing')}
              className="p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 rounded-lg hover:border-cyan-400/50 transition-all text-left"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Network className="w-6 h-6 text-cyan-400" />
                <span className="text-slate-300 font-medium">WebRTC Stream</span>
              </div>
              <p className="text-slate-400 text-sm">Analyze live webcam feed for real-time deepfake detection</p>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setStreamStatus('analyzing')}
              className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg hover:border-purple-400/50 transition-all text-left"
            >
              <div className="flex items-center space-x-3 mb-2">
                <Activity className="w-6 h-6 text-purple-400" />
                <span className="text-slate-300 font-medium">Screen Capture</span>
              </div>
              <p className="text-slate-400 text-sm">Monitor screen content for manipulated media playback</p>
            </motion.button>
          </div>
        </motion.div>

        {/* Batch Processing Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="bg-[#0f172a]/80 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.35)] mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Layers className="w-6 h-6 text-cyan-400" />
              <h2 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Enterprise Batch Processing
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-cyan-400" />
              <span className="text-xs text-slate-400">Process Multiple Files</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Fingerprint className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                <h3 className="text-sm text-slate-300 mb-1">Dataset Verification</h3>
                <p className="text-xs text-slate-500">Bulk verify large media collections for deepfake content</p>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Microscope className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="text-sm text-slate-300 mb-1">Forensic Analysis</h3>
                <p className="text-xs text-slate-500">Detailed multi-angle forensic examination</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Lightning className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-sm text-slate-300 mb-1">Priority Scoring</h3>
                <p className="text-xs text-slate-500">Auto-assign urgency based on detection confidence</p>
              </div>
              <div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                <Lock className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="text-sm text-slate-300 mb-1">Chain of Custody</h3>
                <p className="text-xs text-slate-500">Maintain evidence integrity for legal proceedings</p>
              </div>
            </div>
          </div>
        </motion.div>

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
                  {(analysisResult.label || 'unknown').toUpperCase()}
                </div>
                <div className="text-slate-400">Confidence Score</div>
                <div className="text-3xl font-bold text-cyan-400 mb-2">{analysisResult.confidence || 0}%</div>

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
