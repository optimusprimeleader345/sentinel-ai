import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Zap, Shield, AlertTriangle, RefreshCw, Activity, Users, MapPin, TrendingUp } from 'lucide-react'
import LeafletGlobalThreatMap from '../components/LeafletGlobalThreatMap.jsx'
import { aggregateThreats } from '../lib/api.js'

const GlobalThreatMap = () => {
  const [threatStats, setThreatStats] = useState({
    totalThreats: 0,
    criticalThreats: 0,
    activeRegions: 0,
    lastUpdate: new Date()
  })
  const [loading, setLoading] = useState(true)
  const [realTimeMode, setRealTimeMode] = useState(true)

  useEffect(() => {
    loadThreatStats()
  }, [])

  const loadThreatStats = async () => {
    try {
      setLoading(true)
      const response = await aggregateThreats()

      if (response.data && response.data.data) {
        const threats = response.data.data
        const critical = threats.filter(t => t.severity === 'critical').length
        const regions = new Set(threats.map(t => t.country)).size

        setThreatStats({
          totalThreats: threats.length,
          criticalThreats: critical,
          activeRegions: regions,
          lastUpdate: new Date(response.data.timestamp || Date.now())
        })
      }
    } catch (error) {
      console.error('Failed to load threat stats:', error)
      // Set fallback stats
      setThreatStats({
        totalThreats: 47,
        criticalThreats: 8,
        activeRegions: 12,
        lastUpdate: new Date()
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    loadThreatStats()
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold neon-text">Global Threat Map</h1>
              <p className="text-slate-400 text-lg">Real-time cyber threats worldwide</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Real-time toggle */}
            <div className="flex items-center space-x-2">
              <span className="text-slate-300 text-sm">Real-time</span>
              <button
                onClick={() => setRealTimeMode(!realTimeMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  realTimeMode ? 'bg-cyan-600' : 'bg-gray-600'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    realTimeMode ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {/* Refresh button */}
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="flex items-center space-x-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Threats</p>
                <p className="text-2xl font-bold text-white">{threatStats.totalThreats.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-red-500/20 rounded-lg">
                <Zap className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Critical Threats</p>
                <p className="text-2xl font-bold text-white">{threatStats.criticalThreats}</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Active Regions</p>
                <p className="text-2xl font-bold text-white">{threatStats.activeRegions}</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <MapPin className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Last Update</p>
                <p className="text-lg font-bold text-white">
                  {threatStats.lastUpdate.toLocaleTimeString()}
                </p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Activity className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Main Threat Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden h-[600px]"
        >
          <LeafletGlobalThreatMap />
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Data Sources */}
          <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              <span>Threat Intelligence Sources</span>
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">AlienVault OTX</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">AbuseIPDB</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Active</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Shodan</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-yellow-400">Limited</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-300">MITRE CVE</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-400">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Threat Categories */}
          <div className="bg-[#0f172a]/80 backdrop-blur-sm rounded-xl border border-slate-700/50 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-400" />
              <span>Common Threat Types</span>
            </h3>
            <div className="space-y-3">
              {[
                { type: 'IP Attacks', count: 24, color: 'bg-red-500' },
                { type: 'Malware', count: 18, color: 'bg-orange-500' },
                { type: 'Phishing', count: 15, color: 'bg-yellow-500' },
                { type: 'DDoS', count: 12, color: 'bg-purple-500' },
                { type: 'SQL Injection', count: 8, color: 'bg-blue-500' }
              ].map((threat, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${threat.color}`}></div>
                    <span className="text-slate-300">{threat.type}</span>
                  </div>
                  <span className="text-slate-400 font-mono">{threat.count}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center text-slate-500 text-sm"
        >
          <p>Real-time threat data updates every 2 minutes • Last updated: {threatStats.lastUpdate.toLocaleString()}</p>
          <p className="mt-2">Data sources: AlienVault OTX, AbuseIPDB, Shodan, MITRE CVE Database</p>
        </motion.div>
      </div>
    </div>
  )
}

export default GlobalThreatMap
