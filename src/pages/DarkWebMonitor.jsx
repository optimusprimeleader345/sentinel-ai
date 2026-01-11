import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/admin/GlassCard'
import {
  Globe,
  Target,
  Activity,
  AlertTriangle,
  TrendingUp,
  Eye,
  Cpu,
  Brain,
  Clock,
  MessageSquare,
  Shield,
  Zap,
  Search,
  Store,
  Hash,
  BarChart3
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { darkwebAPI } from '../lib/api.js'

// Extended dark web surveillance data
const breachActivityData = [
  { time: '00:00', breaches: 12, exposures: 2 },
  { time: '04:00', breaches: 23, exposures: 4 },
  { time: '08:00', breaches: 34, exposures: 7 },
  { time: '12:00', breaches: 45, exposures: 9 },
  { time: '16:00', breaches: 52, exposures: 11 },
  { time: '20:00', breaches: 58, exposures: 13 },
]

const threatCategoryData = [
  { category: 'Credential Theft', count: 1247, severity: 'high', color: '#ef4444' },
  { category: 'Data Exfiltration', count: 892, severity: 'critical', color: '#f59e0b' },
  { category: 'Ransomware Sales', count: 654, severity: 'high', color: '#ec4899' },
  { category: 'Trade Monitoring', count: 423, severity: 'medium', color: '#06b6d4' },
  { category: 'Forum Intelligence', count: 298, severity: 'medium', color: '#10b981' },
]

const criticalBreaches = [
  {
    id: 1,
    breach: 'Financial Services Mega-Breach',
    exposureCount: 12000000,
    sensitivity: 'Critical',
    confidence: 96,
    source: 'Dark Web Forum',
    time: '2 hours ago',
    description: 'Major bank credentials and financial data exposed on underground markets.'
  },
  {
    id: 2,
    breach: 'Healthcare Database Compromise',
    exposureCount: 8500000,
    sensitivity: 'High',
    confidence: 92,
    source: 'Ransomware Group',
    time: '4 hours ago',
    description: 'Patient records and medical data leaked through supply chain attack.'
  },
  {
    id: 3,
    breach: 'Corporate Email Harvest',
    exposureCount: 4500000,
    sensitivity: 'Medium',
    confidence: 88,
    source: 'Credential Marketplace',
    time: '6 hours ago',
    description: 'Business email compromises flooding dark web trading platforms.'
  },
]

const marketIntelligence = [
  { source: 'AlphaBay Intelligence', alerts: 23, riskLevel: 'high', confidence: 94 },
  { source: 'Dark Markets Surveillance', alerts: 18, riskLevel: 'critical', confidence: 89 },
  { source: 'Forum Leak Monitoring', alerts: 31, riskLevel: 'medium', confidence: 76 },
]

function DarkWebMonitor() {
  // Real-time breach feed data
  const [realTimeBreaches, setRealTimeBreaches] = useState([
    {
      id: 1,
      breach: 'Corporate Data Leak Detected',
      company: 'TechCorp Inc',
      exposed: 'Employee Emails',
      risk: 'high',
      timestamp: new Date().toISOString(),
      confidence: 91,
      source: 'Dark Web Forum'
    },
    {
      id: 2,
      breach: 'Database Credentials Exposed',
      company: 'Global Finance',
      exposed: 'Database Access',
      risk: 'critical',
      timestamp: new Date(Date.now() - 180000).toISOString(),
      confidence: 97,
      source: 'Underground Marketplace'
    },
    {
      id: 3,
      breach: 'API Keys Compromised',
      company: 'Cloud Services',
      exposed: 'API Credentials',
      risk: 'medium',
      timestamp: new Date(Date.now() - 420000).toISOString(),
      confidence: 84,
      source: 'Hacker Forum'
    }
  ]);

  const [searchResults, setSearchResults] = useState(null)
  const [exposureScore, setExposureScore] = useState(72)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate real-time breach updates
    const interval = setInterval(() => {
      setRealTimeBreaches(prev => {
        const newBreach = {
          id: Date.now(),
          breach: ['Login Credentials Exposed', 'Financial Data Breach', 'Customer Records Leaked'][Math.floor(Math.random() * 3)],
          company: ['Tech Solutions', 'Data Systems', 'Global Corp', 'Secure Networks'][Math.floor(Math.random() * 4)],
          exposed: ['User Accounts', 'Financial Data', 'Personal Information', 'API Keys'][Math.floor(Math.random() * 4)],
          risk: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)],
          timestamp: new Date().toISOString(),
          confidence: Math.floor(Math.random() * 20) + 75,
          source: ['Dark Market', 'Hacker Forum', 'Leak Site', 'Ransomware Group'][Math.floor(Math.random() * 4)]
        };
        return [newBreach, ...prev.slice(0, 7)]; // Keep 8 most recent
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    loadDarkWebData()
  }, [])

  const loadDarkWebData = async () => {
    try {
      // Simulating dark web data loading
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Could use: await darkwebAPI.getBreaches() or other darkweb functions
      // For now, just set loading to false
    } catch (error) {
      console.error('Failed to load dark web data:', error)
    } finally {
      setLoading(false)
    }
  }

  const BreachCard = ({ breach, index }) => (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className={`p-4 rounded-lg border-l-4 cursor-pointer hover:scale-102 transition-all ${breach.sensitivity === 'Critical' ? 'border-l-red-500 bg-red-500/5' : breach.sensitivity === 'High' ? 'border-l-orange-500 bg-orange-500/5' : 'border-l-blue-500 bg-blue-500/5'}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex-1">
          <div className="text-white font-semibold mb-1">{breach.breach}</div>
          <p className="text-slate-300 text-sm">{breach.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-3">
        <div className="text-sm text-slate-400">
          <span className="font-medium">Records:</span> {breach.exposureCount.toLocaleString()}
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-cyan-400">{breach.confidence}%</div>
          <div className="text-xs text-slate-500">Confidence</div>
        </div>
      </div>
      <div className="mt-2 flex justify-between text-xs text-slate-500">
        <span>{breach.source}</span>
        <span>{breach.time}</span>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading Dark Web Intelligence Hub...</div>
      </div>
    )
  }

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              Dark Web Intelligence Hub
            </h1>
            <p className="text-slate-400 text-sm">Real-time dark web surveillance and breach monitoring</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-orange-400" />
            <span className="text-sm font-bold text-white">{realTimeBreaches.length}</span>
            <span className="text-xs text-slate-400">Active Breaches</span>
          </div>
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-purple-400" />
            <span className="text-sm font-bold text-white">{exposureScore}%</span>
            <span className="text-xs text-slate-400">Exposure Risk</span>
          </div>
        </div>
      </motion.div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">

        {/* Breach Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2"
        >
          <GlassCard title="24-Hour Breach Activity" icon={Activity}>
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={breachActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Area dataKey="breaches" stroke="#ef4444" fill="url(#breachGradient)" />
                  <Area dataKey="exposures" stroke="#dc2626" fill="url(#exposureGradient)" />
                  <defs>
                    <linearGradient id="breachGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                    </linearGradient>
                    <linearGradient id="exposureGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Exposure Risk Assessment */}
            <div className="border-t border-slate-700/50 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">Personal Exposure Risk</h4>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  exposureScore > 70 ? 'bg-red-500/20 text-red-400' :
                  exposureScore > 50 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {exposureScore}/100 Risk Score
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span>Cybercrime marketplace monitoring active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <span>Ransomware negotiation tracking enabled</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>Dark web forum intelligence gathering</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Threat Category Analytics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Dark Web Threat Categories" icon={BarChart3} className="mb-6">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={threatCategoryData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" />
                <YAxis dataKey="category" type="category" stroke="#9ca3af" width={120} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '6px'
                  }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {threatCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </GlassCard>
        </motion.div>

        {/* Market Intelligence Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard title="Dark Market Intelligence" icon={Store}>
            <div className="space-y-6">
              {marketIntelligence.map((market, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm font-medium">{market.source}</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      market.riskLevel === 'critical' ? 'bg-red-500/20 text-red-400' :
                      market.riskLevel === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {market.alerts}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    <span className="text-cyan-400">{market.confidence}% confidence</span> | {market.riskLevel} risk
                  </div>
                </div>
              ))}

              <div className="border-t border-slate-700/50 pt-4">
                <div className="text-xs text-slate-400 mb-2">Market Status</div>
                <div className="text-sm text-green-400 font-semibold flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>Active Surveillance</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Critical Breach Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <GlassCard title="Critical Breach Intelligence" icon={AlertTriangle}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {criticalBreaches.map((breach, index) => (
              <BreachCard key={breach.id} breach={breach} index={index} />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Real-time Breach Feed & AI Analysis */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* Live Breach Feed */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="Real-time Breach Feed" icon={Activity}>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {realTimeBreaches.map((breach, index) => (
                <motion.div
                  key={breach.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${breach.risk === 'critical' ? 'border-l-red-500 bg-red-500/5' : breach.risk === 'high' ? 'border-l-orange-500 bg-orange-500/5' : breach.risk === 'medium' ? 'border-l-yellow-500 bg-yellow-500/5' : 'border-l-blue-500 bg-blue-500/5'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-white font-medium text-sm">{breach.company}</span>
                    <span className={`text-xs px-2 py-1 rounded ${breach.risk === 'critical' ? 'bg-red-500/20 text-red-400' : breach.risk === 'high' ? 'bg-orange-500/20 text-orange-400' : breach.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                      {breach.risk} risk
                    </span>
                  </div>
                  <div className="text-slate-300 text-sm mb-2">
                    <span className="text-cyan-400">{breach.breach}</span> - {breach.exposed}
                  </div>
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>{breach.source}</span>
                    <span>{breach.confidence}% confidence</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    {new Date(breach.timestamp).toLocaleTimeString()}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Intelligence Feed:</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Dark Web Exposure Analysis */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Personal Dark Web Exposure" icon={Shield}>
            <div className="space-y-6">
              {/* Risk Score Circle */}
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={
                        exposureScore > 80 ? '#ef4444' :
                        exposureScore > 60 ? '#f97316' :
                        exposureScore > 40 ? '#eab308' :
                        '#22c55e'
                      }
                      strokeWidth="3"
                      strokeDasharray={`${exposureScore}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{exposureScore}%</span>
                  </div>
                </div>
                <div className="text-sm text-slate-400 mb-4">
                  {exposureScore > 80 ? '🚨 Critical Exposure' :
                   exposureScore > 60 ? '⚠️ High Exposure' :
                   exposureScore > 40 ? '🔔 Medium Exposure' : '✅ Low Exposure'}
                </div>
              </div>

              {/* Exposure Categories */}
              <div className="space-y-4">
                <div className="text-sm font-semibold text-slate-300 mb-2">Exposure Categories</div>
                {[
                  { category: 'Email Compromises', count: 3, risk: 'high' },
                  { category: 'Credential Leaks', count: 7, risk: 'medium' },
                  { category: 'Identity Data', count: 1, risk: 'low' },
                  { category: 'Financial Data', count: 0, risk: 'none' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-slate-300 text-sm">{item.category}</span>
                    <div className="flex items-center space-x-2">
                      <span className={`text-sm font-bold ${
                        item.risk === 'high' ? 'text-red-400' :
                        item.risk === 'medium' ? 'text-yellow-400' :
                        item.risk === 'low' ? 'text-green-400' : 'text-slate-400'
                      }`}>
                        {item.count > 0 ? item.count : 'None'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Protection Status */}
              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-3">AI Protection Status</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Automated Monitoring</span>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Alert Generation</span>
                    <span className="text-cyan-400 text-sm">94% Accuracy</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">Response Automation</span>
                    <span className="text-purple-400 text-sm">Real-time</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Intelligence Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Brain className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Dark Web Intelligence Summary</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Dark Web Surveillance Analysis:</strong> AI-powered monitoring detected {realTimeBreaches.length} active data breaches in the past 24 hours across cybercrime marketplaces and underground forums. Current personal exposure score of {exposureScore}% indicates moderate risk with active monitoring of {threatCategoryData.length} threat categories. Real-time correlation shows {criticalBreaches.length} critical breaches requiring immediate attention, with AI confidence levels averaging 90% accuracy.
                </p>
                <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400">
                  <span>• Breach Monitoring: Continuous</span>
                  <span>• Intelligence Gathering: Active</span>
                  <span>• Risk Mitigation: Automated</span>
                  <span>• Market Surveillance: 24/7</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  )
}

export default DarkWebMonitor
