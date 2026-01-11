import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  AlertTriangle,
  Shield,
  Zap,
  Database,
  BarChart3,
  RefreshCw,
  Settings,
  Users,
  Clock,
  TrendingUp,
  Target,
  Server,
  Globe,
  Wifi,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react'
import GlassCard from '../components/admin/GlassCard'
import Button from '../components/Button'
import EventStream from '../components/siem/EventStream'
import AlertCorrelation from '../components/siem/AlertCorrelation'
import IncidentView from '../components/siem/IncidentView'
import siemEngine from '../services/siemEngine'
import { useAuth } from '../contexts/AuthContext'

const SIEMDashboard = () => {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [alerts, setAlerts] = useState([])
  const [incidents, setIncidents] = useState([])
  const [isAutoRefresh, setIsAutoRefresh] = useState(true)
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [isGeneratingData, setIsGeneratingData] = useState(false)

  // Update data from SIEM engine
  const updateData = useCallback(() => {
    setEvents(siemEngine.getEvents(100))
    setAlerts(siemEngine.getAlerts(50))
    setIncidents(siemEngine.getIncidents(25))
    setLastRefresh(new Date())
  }, [])

  // Auto-refresh data
  useEffect(() => {
    updateData()
    let interval

    if (isAutoRefresh) {
      interval = setInterval(updateData, 5000) // Refresh every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isAutoRefresh, updateData])

  // Generate sample security events for demonstration
  const generateSampleEvents = async () => {
    setIsGeneratingData(true)

    const eventTypes = [
      // URL scanning events
      { source: 'URL_SCAN', eventType: 'MALICIOUS_URL', severity: 'HIGH', asset: 'https://suspicious-site.com' },
      { source: 'URL_SCAN', eventType: 'PHISHING_URL', severity: 'CRITICAL', asset: 'https://phishing-bank.com' },
      { source: 'URL_SCAN', eventType: 'MALICIOUS_URL', severity: 'MEDIUM', asset: 'https://malware-download.net' },

      // IP scanning events
      { source: 'IP_SCAN', eventType: 'MALICIOUS_IP', severity: 'HIGH', asset: '192.168.1.100' },
      { source: 'IP_SCAN', eventType: 'MALICIOUS_IP', severity: 'CRITICAL', asset: '10.0.0.50' },
      { source: 'IP_SCAN', eventType: 'MALICIOUS_IP', severity: 'MEDIUM', asset: '172.16.0.25' },

      // Email scanning events
      { source: 'EMAIL_SCAN', eventType: 'PHISHING_EMAIL', severity: 'HIGH', asset: 'user@company.com' },
      { source: 'EMAIL_SCAN', eventType: 'MALICIOUS_EMAIL', severity: 'CRITICAL', asset: 'admin@enterprise.com' },

      // Password events
      { source: 'PASSWORD', eventType: 'PASSWORD_BREACH', severity: 'HIGH', asset: 'user-account-123' },
      { source: 'PASSWORD', eventType: 'CREDENTIAL_THEFT', severity: 'CRITICAL', asset: 'admin-account' },

      // Malware events
      { source: 'MALWARE', eventType: 'MALWARE_DETECTED', severity: 'CRITICAL', asset: 'workstation-05' },
      { source: 'MALWARE', eventType: 'VIRUS_DETECTED', severity: 'HIGH', asset: 'server-02' },

      // Network events
      { source: 'NETWORK', eventType: 'C2_COMMUNICATION', severity: 'CRITICAL', asset: '192.168.1.50' },
      { source: 'NETWORK', eventType: 'SUSPICIOUS_NETWORK', severity: 'HIGH', asset: '10.0.0.100' },

      // Authentication events
      { source: 'AUTH', eventType: 'AUTH_FAILURE', severity: 'LOW', asset: 'user-login' },
      { source: 'AUTH', eventType: 'BRUTE_FORCE', severity: 'HIGH', asset: 'admin-portal' },
      { source: 'AUTH', eventType: 'PRIVILEGE_ESCALATION', severity: 'CRITICAL', asset: 'system-admin' }
    ]

    // Generate events with realistic timing
    for (let i = 0; i < eventTypes.length; i++) {
      const eventType = eventTypes[i]
      const event = {
        ...eventType,
        metadata: {
          scanner: eventType.source.toLowerCase(),
          confidence: Math.floor(Math.random() * 40) + 60, // 60-100%
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          geolocation: ['US', 'UK', 'DE', 'FR', 'JP'][Math.floor(Math.random() * 5)],
          threatType: eventType.eventType.replace(/_/g, ' ')
        }
      }

      siemEngine.ingestEvent(event)

      // Add delay between events
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
    }

    updateData()
    setIsGeneratingData(false)
  }

  // Handle incident status updates
  const handleIncidentUpdate = (incidentId, updates) => {
    siemEngine.updateIncidentStatus(incidentId, updates.status)
    updateData()
  }

  // Get dashboard statistics
  const getStats = () => {
    const now = new Date()
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000)
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    const recentEvents = events.filter(e => new Date(e.timestamp) > lastHour)
    const recentAlerts = alerts.filter(a => new Date(a.timestamp) > lastHour)
    const recentIncidents = incidents.filter(i => new Date(i.createdAt) > last24Hours)

    return {
      totalEvents: events.length,
      recentEvents: recentEvents.length,
      totalAlerts: alerts.length,
      activeAlerts: alerts.filter(a => a.status === 'ACTIVE').length,
      recentAlerts: recentAlerts.length,
      totalIncidents: incidents.length,
      openIncidents: incidents.filter(i => i.status === 'OPEN').length,
      recentIncidents: recentIncidents.length,
      criticalEvents: events.filter(e => e.severity === 'CRITICAL').length,
      criticalAlerts: alerts.filter(a => a.severity === 'CRITICAL').length,
      criticalIncidents: incidents.filter(i => i.severity === 'CRITICAL').length
    }
  }

  const stats = getStats()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900 text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern id="siem-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="50" height="50" fill="none" stroke="url(#siem-gradient)" strokeWidth="1" opacity="0.1" />
                <circle cx="25" cy="25" r="1.5" fill="#06b6d4" opacity="0.4">
                  <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite" />
                </circle>
              </pattern>
              <linearGradient id="siem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0e7490" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#siem-grid)" />
          </svg>
        </div>

        {/* Floating Data Nodes */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={`data-${i}`}
            className="absolute w-3 h-3 rounded-full border border-cyan-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: Math.random() * 6 + 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl border border-cyan-400/40">
              <Database className="w-8 h-8 text-cyan-400" />
            </div>
            <div>
              <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                SIEM CORRELATION ENGINE
              </h1>
              <p className="text-slate-400 text-sm font-mono">
                Security Information & Event Management • Real-time Threat Correlation • Incident Response
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm text-slate-400">Last Update</div>
              <div className="text-white font-mono text-sm">
                {lastRefresh.toLocaleTimeString()}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={() => setIsAutoRefresh(!isAutoRefresh)}
                className={`px-3 py-2 ${isAutoRefresh ? 'bg-green-500/20 text-green-400' : 'bg-slate-700/50 text-slate-400'}`}
              >
                {isAutoRefresh ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>

              <Button
                onClick={updateData}
                className="px-3 py-2 bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>

              {(user?.role === 'admin' || user?.role === 'analyst') && (
                <Button
                  onClick={generateSampleEvents}
                  disabled={isGeneratingData}
                  className="px-4 py-2 bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"
                >
                  {isGeneratingData ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Zap className="w-4 h-4" />
                  )}
                  {isGeneratingData ? 'Generating...' : 'Generate Events'}
                </Button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <GlassCard title="Event Stream" icon={Activity}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-cyan-400">{stats.totalEvents}</div>
                <div className="text-sm text-slate-400">Total Events</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-400">+{stats.recentEvents}</div>
                <div className="text-xs text-slate-500">Last Hour</div>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2 text-xs">
              <span className="text-red-400">⚠️ {stats.criticalEvents} Critical</span>
            </div>
          </GlassCard>

          <GlassCard title="Alert Correlation" icon={AlertTriangle}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-orange-400">{stats.totalAlerts}</div>
                <div className="text-sm text-slate-400">Total Alerts</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-yellow-400">{stats.activeAlerts}</div>
                <div className="text-xs text-slate-500">Active</div>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2 text-xs">
              <span className="text-orange-400">🔥 {stats.recentAlerts} New</span>
            </div>
          </GlassCard>

          <GlassCard title="Incident Response" icon={Shield}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-400">{stats.totalIncidents}</div>
                <div className="text-sm text-slate-400">Total Incidents</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-red-400">{stats.openIncidents}</div>
                <div className="text-xs text-slate-500">Open</div>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2 text-xs">
              <span className="text-purple-400">🎯 {stats.recentIncidents} Today</span>
            </div>
          </GlassCard>

          <GlassCard title="System Health" icon={BarChart3}>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {stats.totalEvents > 0 ? '98%' : '100%'}
                </div>
                <div className="text-sm text-slate-400">Uptime</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-400">
                  {isAutoRefresh ? 'LIVE' : 'PAUSED'}
                </div>
                <div className="text-xs text-slate-500">Status</div>
              </div>
            </div>
            <div className="mt-3 flex items-center space-x-2 text-xs">
              <span className="text-green-400">✓ Engine Active</span>
              <span className="text-blue-400">✓ Correlation Running</span>
            </div>
          </GlassCard>
        </motion.div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Event Stream */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="xl:col-span-1"
          >
            <EventStream
              events={events}
              maxHeight="600px"
            />
          </motion.div>

          {/* Right Column - Alerts and Incidents */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="xl:col-span-2 space-y-8"
          >
            {/* Alert Correlation */}
            <AlertCorrelation
              alerts={alerts}
              onAlertClick={(alert) => console.log('Alert clicked:', alert)}
              maxHeight="400px"
            />

            {/* Incident View */}
            <IncidentView
              incidents={incidents}
              onIncidentUpdate={handleIncidentUpdate}
              userRole={user?.role}
              maxHeight="400px"
            />
          </motion.div>
        </div>

        {/* Footer Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center text-xs text-slate-500 space-y-2"
        >
          <div className="flex items-center justify-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Real-time Event Processing</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>MITRE ATT&CK Integration</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Advanced Correlation Engine</span>
            </div>
          </div>

          <p className="text-slate-600">
            SIEM Correlation Engine v2.1 • Enterprise Security Information & Event Management •
            Built for SOC Operations • {user?.role === 'admin' ? 'Admin Mode Enabled' : 'Analyst Access'}
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default SIEMDashboard
