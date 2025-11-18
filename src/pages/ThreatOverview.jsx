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
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 mb-3">
                        <SeverityBadge severity={lookupResult.data.threatLevel.toLowerCase()} />
                        <span className="text-white font-medium">{lookupResult.type.toUpperCase()}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-cyan-400 text-xs font-medium">REPUTATION SCORE</p>
                          <p className="text-white text-lg font-bold">{lookupResult.data.reputationScore}/100</p>
                        </div>
                        <div>
                          <p className="text-cyan-400 text-xs font-medium">ASN</p>
                          <p className="text-white font-medium">{lookupResult.data.asn || 'N/A'}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-cyan-400 text-xs font-medium mb-1">BLACKLIST STATUS</p>
                        <p className="text-white">{lookupResult.data.blacklistStatus}</p>
                      </div>

                      {lookupResult.data.category && (
                        <div>
                          <p className="text-cyan-400 text-xs font-medium mb-1">CATEGORY</p>
                          <p className="text-slate-300 text-sm">{lookupResult.data.category}</p>
                        </div>
                      )}

                      {lookupResult.data.malwareHistory && lookupResult.data.malwareHistory.length > 0 && (
                        <div>
                          <p className="text-cyan-400 text-xs font-medium mb-2">MALWARE HISTORY</p>
                          <div className="flex flex-wrap gap-2">
                            {lookupResult.data.malwareHistory.map((malware, index) => (
                              <span key={index} className="px-2 py-1 bg-red-900/30 text-red-400 text-xs rounded">
                                {malware}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {lookupResult.data.relatedThreats && lookupResult.data.relatedThreats.length > 0 && (
                        <div>
                          <p className="text-cyan-400 text-xs font-medium mb-2">RELATED THREATS</p>
                          <div className="space-y-1">
                            {lookupResult.data.relatedThreats.map((threat, index) => (
                              <div key={index} className="text-slate-300 text-sm">• {threat}</div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="border-t border-slate-700/50 pt-3">
                        <div className="text-xs text-slate-500 space-y-1">
                          <p><span className="text-cyan-400">Last Seen:</span> {new Date(lookupResult.data.lastSeen).toLocaleString()}</p>
                          <p><span className="text-cyan-400">First Seen:</span> {lookupResult.data.firstSeen ? new Date(lookupResult.data.firstSeen).toLocaleString() : 'N/A'}</p>
                          {lookupResult.data.country && <p><span className="text-cyan-400">Country:</span> {lookupResult.data.country}</p>}
                          {lookupResult.data.isp && <p><span className="text-cyan-400">ISP:</span> {lookupResult.data.isp}</p>}
                        </div>
                      </div>
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

        {/* Severity Distribution Pie Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Severity Distribution</h3>
              <SeverityDistributionChart />
            </Card>
          </motion.div>

          {/* Attack Trend Line Graph */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Attack Trends (12 Months)</h3>
              <AttackTrendChart />
            </Card>
          </motion.div>
        </div>

        {/* Threat Feed */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Live Threat Feed</h3>
              <ThreatFeed />
            </Card>
          </motion.div>
        </div>

        {/* Enhanced Threat Correlation Engine */}
        <div className="grid grid-cols-1 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 }}>
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Threat Correlation Engine</h3>
              <CorrelationEngine />
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
      <div className="text-center">
        <div className="text-2xl font-bold text-red-400">{darkWebData.stolenCredentialsCount.toLocaleString()}</div>
        <div className="text-sm text-slate-400">Stolen Credentials</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-yellow-400">{darkWebData.leakedAssets}</div>
        <div className="text-sm text-slate-400">Leaked Assets</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-purple-400">{darkWebData.marketplaceMentions}</div>
        <div className="text-sm text-slate-400">Marketplace Mentions</div>
      </div>
      <div className="col-span-3 mt-4">
        <h4 className="text-sm font-semibold text-white mb-2">Ransomware Group Activity</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {darkWebData.ransomwareGroupActivity.map((group, index) => (
            <div key={index} className={`p-3 rounded-lg border ${group.status === 'Active' ? 'border-red-500/30 bg-red-900/20' : 'border-slate-700/50 bg-slate-800/50'}`}>
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

  if (!correlations.length) return <div className="text-slate-400">Loading correlation insights...</div>

  return (
    <div className="space-y-4">
      {correlations.map((correlation, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex justify-between items-start p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
        >
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-slate-300 font-medium">{correlation.threat}</span>
              <SeverityBadge severity={correlation.confidence > 80 ? 'high' : correlation.confidence > 60 ? 'medium' : 'low'} />
            </div>
            <p className="text-slate-400 text-sm">{correlation.description}</p>
          </div>
          <div className="text-right">
            <div className="text-cyan-400 text-sm font-bold">{correlation.confidence}%</div>
            <div className="text-xs text-slate-500">{correlation.timestamp}</div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Severity Distribution Pie Chart Component
function SeverityDistributionChart() {
  const [severityData, setSeverityData] = useState([])

  useEffect(() => {
    const loadSeverityData = async () => {
      try {
        const response = await threatAPI.getSeverityStats()
        setSeverityData(response.data)
      } catch (error) {
        console.error('Failed to load severity data:', error)
      }
    }
    loadSeverityData()
  }, [])

  if (!severityData.length) return <div className="text-slate-400">Loading severity distribution...</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={severityData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {severityData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

// Attack Trend Line Graph Component
function AttackTrendChart() {
  const [trendData, setTrendData] = useState([])

  useEffect(() => {
    const loadTrendData = async () => {
      try {
        const response = await threatAPI.getTrends()
        setTrendData(response.data)
      } catch (error) {
        console.error('Failed to load trend data:', error)
      }
    }
    loadTrendData()
  }, [])

  if (!trendData.length) return <div className="text-slate-400">Loading attack trends...</div>

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={trendData}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="month" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            border: '1px solid #475569',
            borderRadius: '6px'
          }}
        />
        <Area
          type="monotone"
          dataKey="attacks"
          stroke="#ef4444"
          fill="rgba(239, 68, 68, 0.2)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// Threat Feed Component
function ThreatFeed() {
  const [threatFeed, setThreatFeed] = useState([])

  useEffect(() => {
    const loadThreatFeed = async () => {
      try {
        const response = await threatAPI.getThreatFeed()
        setThreatFeed(response.data.threats || [])
      } catch (error) {
        console.error('Failed to load threat feed:', error)
      }
    }
    loadThreatFeed()
  }, [])

  if (!threatFeed.length) return <div className="text-slate-400">Loading threat feed...</div>

  return (
    <div className="space-y-4 max-h-96 overflow-y-auto">
      {threatFeed.map((threat, index) => (
        <motion.div
          key={threat.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
        >
          <div className="flex items-center space-x-4">
            <SeverityBadge severity={threat.level.toLowerCase()} />
            <div>
              <div className="text-white font-medium">{threat.vector}</div>
              <div className="text-slate-400 text-sm">{threat.source} → {threat.target}</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs text-slate-500">
              {new Date(threat.timestamp).toLocaleString()}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// Correlation Engine Component
function CorrelationEngine() {
  const [correlationData, setCorrelationData] = useState(null)

  useEffect(() => {
    const loadCorrelationData = async () => {
      try {
        const response = await threatAPI.getCorrelationEngine()
        setCorrelationData(response.data)
      } catch (error) {
        console.error('Failed to load correlation engine data:', error)
      }
    }
    loadCorrelationData()
  }, [])

  if (!correlationData) return <div className="text-slate-400">Loading correlation engine...</div>

  return (
    <div className="space-y-6">
      {/* Connected IOCs */}
      <div>
        <h4 className="text-sm font-semibold text-cyan-400 mb-3">Connected IOCs</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {correlationData.connectedIOCs?.map((ioc, index) => (
            <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="text-white font-medium">{ioc.ioc}</div>
              <div className="text-slate-400 text-sm">{ioc.type} • {ioc.linkedThreats} linked threats</div>
              <div className="text-cyan-400 text-xs">Similarity: {ioc.similarity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Attack Clusters */}
      <div>
        <h4 className="text-sm font-semibold text-cyan-400 mb-3">Attack Clusters</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {correlationData.attackClusters?.map((cluster, index) => (
            <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <div className="text-white font-medium">{cluster.clusterId}</div>
                <div className="text-cyan-400 text-sm">{cluster.confidence}% confidence</div>
              </div>
              <div className="text-slate-400 text-sm">{cluster.pattern}</div>
              <div className="text-xs text-slate-500">{cluster.threatCount} threats detected</div>
            </div>
          ))}
        </div>
      </div>

      {/* Pattern Similarity */}
      <div>
        <h4 className="text-sm font-semibold text-cyan-400 mb-3">Pattern Similarity Analysis</h4>
        <div className="space-y-2">
          {correlationData.patternSimilarity?.map((pattern, index) => (
            <div key={index} className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
              <span className="text-slate-300">{pattern.pattern}</span>
              <div className="text-right">
                <div className="text-white text-sm">{pattern.matchCount} matches</div>
                <div className="text-cyan-400 text-xs">{pattern.similarityScore}% similarity</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ThreatOverview
