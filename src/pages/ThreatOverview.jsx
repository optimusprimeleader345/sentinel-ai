import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Activity, AlertTriangle, Globe, Search, Clock } from 'lucide-react'
import { PieChart, Pie, Cell, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import Card from '../components/Card'
import Button from '../components/Button'
import SeverityBadge from '../components/SeverityBadge'
import { threatAPI } from '../lib/api.js'

function ThreatOverview() {
  const [threatOverview, setThreatOverview] = useState(null)
  const [lookupResult, setLookupResult] = useState(null)
  const [lookupQuery, setLookupQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadThreatOverview()
  }, [])

  const loadThreatOverview = async () => {
    try {
      const response = await threatAPI.getThreatOverview()
      setThreatOverview(response.data)
    } catch (error) {
      console.error('Failed to load threat overview:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLookupIOC = async () => {
    if (!lookupQuery.trim()) return
    try {
      const response = await threatAPI.lookupIOC(lookupQuery)
      setLookupResult(response.data)
    } catch (error) {
      console.error('IOC lookup error:', error)
      setLookupResult({ found: false, message: 'Lookup failed' })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading threat overview...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Shield className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Threat Overview</h1>
        </motion.div>
        <p className="text-slate-400">Comprehensive threat monitoring and analysis</p>

        {threatOverview && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <Activity className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{threatOverview.totalAttacks24h.toLocaleString()}</div>
                <p className="text-sm text-slate-400">Total Attacks (24h)</p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{threatOverview.criticalThreats}</div>
                <p className="text-sm text-slate-400">Critical Threats</p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <Shield className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{threatOverview.highRiskIPs}</div>
                <p className="text-sm text-slate-400">High-Risk IPs</p>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <Globe className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white mb-1">{threatOverview.suspiciousDomains}</div>
                <p className="text-sm text-slate-400">Suspicious Domains</p>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Threat Heatmap */}
        {threatOverview && threatOverview.geoHeatmap && (
          <div className="grid grid-cols-1 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4">Global Threat Heatmap</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-3">
                  {Object.entries(threatOverview.geoHeatmap).map(([region, intensity]) => {
                    const intensityClass = intensity > 80 ? 'bg-red-500' : intensity > 60 ? 'bg-orange-500' : intensity > 40 ? 'bg-yellow-500' : intensity > 20 ? 'bg-green-500' : 'bg-blue-500'
                    const opacity = Math.max(0.3, intensity / 100)
                    return (
                      <div key={region} className={`p-3 rounded-lg border ${intensityClass} border-opacity-30`} style={{ backgroundColor: `rgba(var(--${intensityClass.replace('bg-', '').replace('-500', '')}-rgb), ${opacity})` }}>
                        <div className="text-center">
                          <div className="text-lg font-bold text-white">{intensity}%</div>
                          <div className="text-xs text-slate-300">{region}</div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* MITRE ATT&CK Matrix */}
        {threatOverview && threatOverview.mitreFindings && (
          <div className="grid grid-cols-1 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4">MITRE ATT&CK Matrix</h3>
                <div className="space-y-3">
                  {threatOverview.mitreFindings.reduce((acc, technique) => {
                    const existing = acc.find(t => t.tactic === technique.tactic)
                    if (!existing) acc.push({ tactic: technique.tactic, techniques: [technique] })
                    else existing.techniques.push(technique)
                    return acc
                  }, []).map((group) => (
                    <div key={group.tactic} className="border border-slate-700/50 rounded-lg p-3">
                      <h4 className="text-sm font-semibold text-cyan-400 mb-2">{group.tactic}</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {group.techniques.map((tech) => (
                          <div key={tech.technique} className="flex justify-between items-center bg-slate-800/50 rounded p-2">
                            <span className="text-sm text-slate-300">{tech.technique}</span>
                            <span className="text-xs text-red-400">{tech.detections}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Threat Classifier Widget */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            {lookupResult && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                <Card>
                  <h3 className="text-lg font-semibold text-white mb-4">IOC Lookup Results</h3>
                  {lookupResult.found ? (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <SeverityBadge severity={lookupResult.data.threatLevel.toLowerCase()} />
                        <span className="text-white font-medium">{lookupResult.type.toUpperCase()}</span>
                      </div>
                      <p className="text-slate-300 text-sm mb-2">{lookupResult.data.category}</p>
                      <p className="text-slate-400 text-xs">Last Seen: {new Date(lookupResult.data.lastSeen).toLocaleString()}</p>
                      <p className="text-slate-400 text-xs">Reputation: {lookupResult.data.reputation}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-white font-medium mb-2">No Results Found</p>
                      <p className="text-slate-400 text-sm">{lookupResult.message}</p>
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">AI Threat Classifier</h3>
              <ThreatClassifier />
            </Card>
          </motion.div>
        </div>

        {/* Dark Web Intel */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Dark Web Intel Feed</h3>
              <DarkWebIntel />
            </Card>
          </motion.div>
        </div>

        {/* Correlation Engine */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Threat Correlation Insights</h3>
              <CorrelationInsights />
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

// Threat Classifier Component
function ThreatClassifier() {
  const [classifyText, setClassifyText] = useState('')
  const [classification, setClassification] = useState(null)

  const handleClassify = async () => {
    if (!classifyText.trim()) return
    try {
      const response = await threatAPI.classifyThreat({ text: classifyText })
      setClassification(response.data)
    } catch (error) {
      setClassification({ classification: 'Error', confidence: 0, recommendedAction: 'Unable to classify' })
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <textarea
          value={classifyText}
          onChange={(e) => setClassifyText(e.target.value)}
          placeholder="Describe the suspicious activity or log entry..."
          className="w-full h-32 px-3 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />
      </div>
      <Button onClick={handleClassify} className="w-full">Classify Threat</Button>

      {classification && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-4 bg-slate-800/50 rounded-lg border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">{classification.classification}</span>
            <span className="text-cyan-400">{classification.confidence}% confidence</span>
          </div>
          <p className="text-slate-400 text-sm">{classification.recommendedAction}</p>
        </motion.div>
      )}
    </div>
  )
}

// Dark Web Intel Component
function DarkWebIntel() {
  const [darkWebData, setDarkWebData] = useState(null)

  useEffect(() => {
    const loadDarkWeb = async () => {
      try {
        const response = await threatAPI.getDarkWebIntel()
        setDarkWebData(response.data)
      } catch (error) {
        console.error('Failed to load dark web data:', error)
      }
    }
    loadDarkWeb()
  }, [])

  if (!darkWebData) return <div className="text-slate-400">Loading dark web intelligence...</div>

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.35)] backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition text-center">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{darkWebData.stolenCredentialsCount.toLocaleString()}</div>
        <div className="text-sm text-slate-200 mt-2">Stolen Credentials</div>
      </div>
      <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.35)] backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition text-center">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{darkWebData.leakedAssets}</div>
        <div className="text-sm text-slate-200 mt-2">Leaked Assets</div>
      </div>
      <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.35)] backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition text-center">
        <div className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">{darkWebData.marketplaceMentions}</div>
        <div className="text-sm text-slate-200 mt-2">Marketplace Mentions</div>
      </div>
      <div className="col-span-3 mt-4">
        <h4 className="text-sm font-semibold text-white mb-2">Ransomware Group Activity</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {darkWebData.ransomwareGroupActivity.map((group, index) => (
            <div key={index} className={`p-3 rounded-xl border border-slate-700/50 ${group.status === 'Active' ? 'bg-[#1e293b]/70 border-red-500/30' : 'bg-[#0f172a]/80'} shadow-[0_0_15px_rgba(0,0,0,0.35)] backdrop-blur-md hover:shadow-[0_0_25px_rgba(139,92,246,0.3)] transition`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-white font-medium">{group.group}</span>
                <SeverityBadge severity={group.status === 'Active' ? 'high' : group.status === 'Dissolved' ? 'low' : 'medium'} />
              </div>
              <p className="text-slate-400 text-sm">{group.targets}</p>
              <p className="text-slate-400 text-xs mt-1">{group.recentActivity}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Correlation Insights Component
function CorrelationInsights() {
  const [correlations, setCorrelations] = useState([])

  useEffect(() => {
    const loadCorrelation = async () => {
      try {
        const response = await threatAPI.getThreatCorrelation()
        setCorrelations(response.data.correlatedEvents)
      } catch (error) {
        console.error('Failed to load correlation data:', error)
      }
    }
    loadCorrelation()
  }, [])

  if (correlations.length === 0) return <div className="text-slate-400">Loading correlation insights...</div>

  return (
    <div className="space-y-4">
      {correlations.map((event) => (
        <motion.div key={event.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-medium">{event.id}</span>
            <SeverityBadge severity={event.severity.toLowerCase()} />
          </div>
          <p className="text-slate-300 text-sm mb-2">{event.pattern}</p>
          <p className="text-slate-400 text-xs mb-3">{event.description}</p>
          <div className="flex flex-wrap gap-2">
            {event.relatedIPs.length > 0 && (
              <div>
                <span className="text-xs text-slate-500">IPs:</span>
                {event.relatedIPs.map((ip, idx) => (
                  <span key={idx} className="ml-1 text-xs text-cyan-400">{ip}{idx < event.relatedIPs.length - 1 ? ',' : ''}</span>
                ))}
              </div>
            )}
            {event.relatedDomains.length > 0 && (
              <div>
                <span className="text-xs text-slate-500">Domains:</span>
                {event.relatedDomains.map((domain, idx) => (
                  <span key={idx} className="ml-1 text-xs text-green-400">{domain}{idx < event.relatedDomains.length - 1 ? ',' : ''}</span>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      ))}

    </div>
  )
}

export default ThreatOverview
