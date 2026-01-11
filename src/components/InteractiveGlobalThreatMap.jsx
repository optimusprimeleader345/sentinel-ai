import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Zap, Shield, AlertTriangle, Activity, MapPin, Filter, Play, Pause, RefreshCw, TrendingUp, Target, Eye } from 'lucide-react'
import { aggregateThreats } from '../lib/api.js'

// Enhanced threat data with geographic coordinates
const ENHANCED_THREAT_DATA = [
  // Major cyber hubs with real coordinates
  { country: 'United States', code: 'US', lat: 39.8283, lng: -98.5795, attacks: 28470, breaches: 49321, level: 'High', color: '#ea580c', region: 'North America' },
  { country: 'China', code: 'CN', lat: 35.8617, lng: 104.1954, attacks: 19284, breaches: 34592, level: 'Critical', color: '#dc2626', region: 'Asia' },
  { country: 'Russia', code: 'RU', lat: 61.5240, lng: 105.3188, attacks: 12875, breaches: 28944, level: 'High', color: '#ea580c', region: 'Europe' },
  { country: 'India', code: 'IN', lat: 20.5937, lng: 78.9629, attacks: 9877, breaches: 21346, level: 'Medium', color: '#ca8a04', region: 'Asia' },
  { country: 'United Kingdom', code: 'GB', lat: 55.3781, lng: -3.4360, attacks: 8744, breaches: 18924, level: 'High', color: '#ea580c', region: 'Europe' },
  { country: 'Japan', code: 'JP', lat: 36.2048, lng: 138.2529, attacks: 6544, breaches: 14346, level: 'Medium', color: '#ca8a04', region: 'Asia' },
  { country: 'Germany', code: 'DE', lat: 51.1657, lng: 10.4515, attacks: 7655, breaches: 15674, level: 'Medium', color: '#ca8a04', region: 'Europe' },
  { country: 'France', code: 'FR', lat: 46.2276, lng: 2.2137, attacks: 5877, breaches: 13360, level: 'Medium', color: '#ca8a04', region: 'Europe' },
  { country: 'Canada', code: 'CA', lat: 56.1304, lng: -106.3468, attacks: 4322, breaches: 9877, level: 'Low', color: '#65a30d', region: 'North America' },
  { country: 'Australia', code: 'AU', lat: -25.2744, lng: 133.7751, attacks: 2870, breaches: 6543, level: 'Low', color: '#65a30d', region: 'Oceania' },
  { country: 'Brazil', code: 'BR', lat: -14.2350, lng: -51.9253, attacks: 3219, breaches: 7655, level: 'Medium', color: '#ca8a04', region: 'South America' },
  { country: 'South Korea', code: 'KR', lat: 35.9078, lng: 127.7669, attacks: 6544, breaches: 14347, level: 'High', color: '#ea580c', region: 'Asia' },
  // Additional countries for global coverage
  { country: 'Netherlands', code: 'NL', lat: 52.1326, lng: 5.2913, attacks: 5234, breaches: 11234, level: 'Medium', color: '#ca8a04', region: 'Europe' },
  { country: 'Singapore', code: 'SG', lat: 1.3521, lng: 103.8198, attacks: 4123, breaches: 9876, level: 'Medium', color: '#ca8a04', region: 'Asia' },
  { country: 'Israel', code: 'IL', lat: 31.0461, lng: 34.8516, attacks: 3876, breaches: 8765, level: 'High', color: '#ea580c', region: 'Middle East' },
  { country: 'UAE', code: 'AE', lat: 23.4241, lng: 53.8478, attacks: 2987, breaches: 6543, level: 'Medium', color: '#ca8a04', region: 'Middle East' }
]

// Threat types for filtering
const THREAT_TYPES = [
  'All Threats', 'IP Attacks', 'Malware', 'Phishing', 'DDoS', 'SQL Injection', 'Ransomware', 'Brute Force'
]

// Time ranges for filtering
const TIME_RANGES = [
  'Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'
]

// Regions for filtering
const REGIONS = [
  'All Regions', 'North America', 'South America', 'Europe', 'Asia', 'Africa', 'Oceania', 'Middle East'
]

const InteractiveGlobalThreatMap = () => {
  const [threats, setThreats] = useState(ENHANCED_THREAT_DATA)
  const [filteredThreats, setFilteredThreats] = useState(ENHANCED_THREAT_DATA)
  const [selectedThreat, setSelectedThreat] = useState(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [filters, setFilters] = useState({
    threatType: 'All Threats',
    timeRange: 'Last 24 Hours',
    region: 'All Regions',
    severity: 'All Levels'
  })
  const [stats, setStats] = useState({
    totalThreats: 0,
    activeCountries: 0,
    criticalThreats: 0,
    lastUpdate: new Date()
  })
  const [liveThreats, setLiveThreats] = useState([])
  const [showFilters, setShowFilters] = useState(false)

  const mapRef = useRef(null)
  const animationRef = useRef(null)

  useEffect(() => {
    loadInitialData()
    if (isPlaying) {
      startLiveUpdates()
    }
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }, [isPlaying])

  useEffect(() => {
    applyFilters()
  }, [threats, filters])

  const loadInitialData = async () => {
    try {
      // Try to load real threat data
      const response = await aggregateThreats()
      if (response.data && response.data.data) {
        const realThreats = response.data.data.map(threat => ({
          ...threat,
          lat: threat.latitude || Math.random() * 180 - 90,
          lng: threat.longitude || Math.random() * 360 - 180,
          attacks: threat.count || Math.floor(Math.random() * 100) + 1,
          breaches: threat.count * 2 || Math.floor(Math.random() * 200) + 1,
          level: threat.severity === 'critical' ? 'Critical' : threat.severity === 'high' ? 'High' : 'Medium',
          color: threat.severity === 'critical' ? '#dc2626' : threat.severity === 'high' ? '#ea580c' : '#ca8a04'
        }))
        setThreats([...ENHANCED_THREAT_DATA, ...realThreats.slice(0, 5)])
      }
    } catch (error) {
      console.log('Using enhanced mock data:', error.message)
    }
  }

  const startLiveUpdates = () => {
    animationRef.current = setInterval(() => {
      // Simulate new live threats
      const newThreat = {
        id: `live_${Date.now()}`,
        country: 'New Attack',
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        attacks: Math.floor(Math.random() * 50) + 1,
        level: Math.random() > 0.7 ? 'Critical' : 'High',
        color: Math.random() > 0.7 ? '#dc2626' : '#ea580c',
        timestamp: new Date(),
        type: THREAT_TYPES[Math.floor(Math.random() * (THREAT_TYPES.length - 1)) + 1],
        isLive: true
      }

      setLiveThreats(prev => [newThreat, ...prev.slice(0, 4)]) // Keep only 5 recent live threats
    }, 8000) // New threat every 8 seconds
  }

  const applyFilters = () => {
    let filtered = [...threats]

    // Apply region filter
    if (filters.region !== 'All Regions') {
      filtered = filtered.filter(threat => threat.region === filters.region)
    }

    // Apply severity filter
    if (filters.severity !== 'All Levels') {
      filtered = filtered.filter(threat => threat.level === filters.severity)
    }

    // Apply threat type filter (simulate based on existing data)
    if (filters.threatType !== 'All Threats') {
      // For demo, filter by level as proxy for type
      const typeMap = {
        'IP Attacks': ['High', 'Critical'],
        'Malware': ['Critical'],
        'Phishing': ['Medium', 'High'],
        'DDoS': ['High'],
        'SQL Injection': ['Medium'],
        'Ransomware': ['Critical'],
        'Brute Force': ['Low', 'Medium']
      }
      filtered = filtered.filter(threat => typeMap[filters.threatType]?.includes(threat.level))
    }

    setFilteredThreats(filtered)
    updateStats(filtered)
  }

  const updateStats = (threatList) => {
    const critical = threatList.filter(t => t.level === 'Critical').length
    const countries = new Set(threatList.map(t => t.country)).size

    setStats({
      totalThreats: threatList.reduce((sum, t) => sum + t.attacks, 0),
      activeCountries: countries,
      criticalThreats: critical,
      lastUpdate: new Date()
    })
  }

  const handleThreatClick = (threat) => {
    setSelectedThreat(threat)
  }

  const togglePlayback = () => {
    setIsPlaying(!isPlaying)
    if (!isPlaying) {
      startLiveUpdates()
    } else {
      if (animationRef.current) {
        clearInterval(animationRef.current)
      }
    }
  }

  const refreshData = () => {
    loadInitialData()
    setStats(prev => ({ ...prev, lastUpdate: new Date() }))
  }

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden relative">
      {/* Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-10 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Live Indicator */}
          <div className="flex items-center space-x-2 bg-slate-800/90 backdrop-blur-sm rounded-lg px-3 py-2">
            <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
            <span className="text-white text-sm font-medium">
              {isPlaying ? 'LIVE' : 'PAUSED'}
            </span>
          </div>

          {/* Quick Stats */}
          <div className="hidden md:flex items-center space-x-4 bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2">
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-400">{stats.totalThreats.toLocaleString()}</div>
              <div className="text-xs text-slate-400">Total Attacks</div>
            </div>
            <div className="w-px h-8 bg-slate-600"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-red-400">{stats.criticalThreats}</div>
              <div className="text-xs text-slate-400">Critical</div>
            </div>
            <div className="w-px h-8 bg-slate-600"></div>
            <div className="text-center">
              <div className="text-lg font-bold text-yellow-400">{stats.activeCountries}</div>
              <div className="text-xs text-slate-400">Countries</div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="bg-slate-800/90 backdrop-blur-sm hover:bg-slate-700/90 p-2 rounded-lg transition-colors"
          >
            <Filter className="w-5 h-5 text-white" />
          </button>

          {/* Play/Pause */}
          <button
            onClick={togglePlayback}
            className="bg-slate-800/90 backdrop-blur-sm hover:bg-slate-700/90 p-2 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause className="w-5 h-5 text-white" /> : <Play className="w-5 h-5 text-white" />}
          </button>

          {/* Refresh */}
          <button
            onClick={refreshData}
            className="bg-slate-800/90 backdrop-blur-sm hover:bg-slate-700/90 p-2 rounded-lg transition-colors"
          >
            <RefreshCw className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-16 left-4 right-4 z-10 bg-slate-800/95 backdrop-blur-sm rounded-lg p-4"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <select
                value={filters.region}
                onChange={(e) => setFilters(prev => ({ ...prev, region: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              >
                {REGIONS.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>

              <select
                value={filters.threatType}
                onChange={(e) => setFilters(prev => ({ ...prev, threatType: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              >
                {THREAT_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>

              <select
                value={filters.severity}
                onChange={(e) => setFilters(prev => ({ ...prev, severity: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              >
                <option value="All Levels">All Levels</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <select
                value={filters.timeRange}
                onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
                className="bg-slate-700 border border-slate-600 rounded px-3 py-2 text-white text-sm"
              >
                {TIME_RANGES.map(range => (
                  <option key={range} value={range}>{range}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Map Container */}
      <div ref={mapRef} className="w-full h-full relative">
        {/* World Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800">
          {/* Simplified world map using CSS */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1000 500" className="w-full h-full">
              {/* Simplified continents */}
              <path d="M200,150 L250,140 L300,160 L280,180 L220,170 Z" fill="currentColor" className="text-slate-400" />
              <path d="M400,120 L480,110 L520,140 L460,160 L380,150 Z" fill="currentColor" className="text-slate-400" />
              <path d="M600,130 L680,120 L720,150 L650,170 L580,160 Z" fill="currentColor" className="text-slate-400" />
              <path d="M150,250 L200,240 L250,260 L220,280 L120,270 Z" fill="currentColor" className="text-slate-400" />
              <path d="M350,280 L420,270 L480,290 L430,310 L320,300 Z" fill="currentColor" className="text-slate-400" />
            </svg>
          </div>
        </div>

        {/* Threat Points */}
        {filteredThreats.map((threat, index) => (
          <motion.div
            key={threat.id || threat.code}
            className="absolute cursor-pointer"
            style={{
              left: `${((threat.lng + 180) / 360) * 100}%`,
              top: `${((90 - threat.lat) / 180) * 100}%`,
              transform: 'translate(-50%, -50%)'
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.02, duration: 0.5 }}
            whileHover={{ scale: 1.5 }}
            onClick={() => handleThreatClick(threat)}
          >
            {/* Pulsing threat indicator */}
            <div className="relative">
              <motion.div
                className="w-4 h-4 rounded-full border-2 border-white shadow-lg"
                style={{ backgroundColor: threat.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              {/* Pulsing ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-white"
                style={{ borderColor: threat.color }}
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
            </div>
          </motion.div>
        ))}

        {/* Live Threats Animation */}
        <AnimatePresence>
          {liveThreats.map((threat, index) => (
            <motion.div
              key={threat.id}
              className="absolute"
              style={{
                left: `${((threat.lng + 180) / 360) * 100}%`,
                top: `${((90 - threat.lat) / 180) * 100}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, opacity: 0, y: -20 }}
              animate={{
                scale: [0, 1.5, 1],
                opacity: [0, 1, 0.8],
                y: [0, -10, 0]
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 2 }}
            >
              <div className="bg-red-500 text-white text-xs px-2 py-1 rounded shadow-lg animate-bounce">
                ⚡ {threat.type}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Threat Details Modal */}
      <AnimatePresence>
        {selectedThreat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-20"
            onClick={() => setSelectedThreat(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-slate-800 rounded-xl p-6 max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: selectedThreat.color }}
                  ></div>
                  <h3 className="text-xl font-bold text-white">{selectedThreat.country}</h3>
                </div>
                <button
                  onClick={() => setSelectedThreat(null)}
                  className="text-slate-400 hover:text-white"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Total Attacks:</span>
                  <span className="text-white font-semibold">{selectedThreat.attacks.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Data Breaches:</span>
                  <span className="text-white font-semibold">{selectedThreat.breaches.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Threat Level:</span>
                  <span className={`font-semibold ${
                    selectedThreat.level === 'Critical' ? 'text-red-400' :
                    selectedThreat.level === 'High' ? 'text-orange-400' :
                    selectedThreat.level === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {selectedThreat.level}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Region:</span>
                  <span className="text-white">{selectedThreat.region || 'Global'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Coordinates:</span>
                  <span className="text-white font-mono text-sm">
                    {selectedThreat.lat?.toFixed(1)}°, {selectedThreat.lng?.toFixed(1)}°
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Live Threat Feed */}
      <div className="absolute bottom-4 right-4 w-80 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 max-h-48 overflow-y-auto">
        <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Live Threat Feed</span>
        </h4>
        <div className="space-y-2">
          {liveThreats.length === 0 ? (
            <div className="text-slate-400 text-sm text-center py-4">
              Waiting for live threats...
            </div>
          ) : (
            liveThreats.map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between bg-slate-700/50 rounded p-2"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className="w-2 h-2 rounded-full animate-pulse"
                    style={{ backgroundColor: threat.color }}
                  ></div>
                  <span className="text-white text-sm">{threat.type}</span>
                </div>
                <span className="text-slate-400 text-xs">
                  {new Date(threat.timestamp).toLocaleTimeString()}
                </span>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 text-xs text-slate-400">
        Last updated: {stats.lastUpdate.toLocaleTimeString()} • Interactive Global Threat Map
      </div>
    </div>
  )
}

export default InteractiveGlobalThreatMap
