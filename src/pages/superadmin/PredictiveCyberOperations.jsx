import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Target,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  RefreshCw,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Zap,
  Globe,
  Users,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  Database,
  PlayCircle,
  PauseCircle,
  Download,
  Upload,
  Siren,
  Radio,
  Crosshair,
  Layers,
  Command,
  Crown,
  Star,
  Timer,
  Bot,
  Brain,
  Network,
  Cpu,
  HardDrive,
  Gauge,
  Sliders,
  Server,
  FileText,
  Sparkles,
  Wand2,
  Eye as MysticEye,
  Gem,
  Orbit,
  Telescope,
  Atom,
  Dna,
  Zap as CosmicBolt,
  Flame,
  Wind,
  Mountain,
  CloudRain,
  Sun,
  Moon,
  Stars
} from 'lucide-react';

const PredictiveCyberOperations = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('crystal-visions');
  const [autonomousEnabled, setAutonomousEnabled] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to refresh:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 via-violet-800 to-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-indigo-500/10 to-slate-800/50 backdrop-blur-xl border border-indigo-500/30 rounded-xl p-8 text-center shadow-2xl">
            <Gem className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Super Admin Predictive Cyber Operations Center. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-indigo-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-900 via-violet-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Cosmic Effects Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-indigo-500/30 to-violet-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-violet-600/25 to-indigo-600/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-violet-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 relative z-10"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-indigo-400 via-violet-500 to-indigo-600 rounded-xl shadow-2xl shadow-indigo-500/20 ring-1 ring-violet-400/30">
              <Gem className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-300 via-violet-300 via-indigo-200 to-violet-200 bg-clip-text text-transparent drop-shadow-sm">
                Predictive Cyber Operations
              </h1>
              <p className="text-indigo-200/80 text-sm font-medium">AI-Powered Future Threat Forecasting & Cosmic Defense Intelligence</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Cosmic Prediction Indicator */}
            <div className="relative">
              <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">96%</span>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-indigo-500/50 transition-all duration-200 flex items-center space-x-2 ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Scrying...' : 'Refresh'}</span>
            </button>
          </div>
        </motion.div>

        {/* View Tabs */}
        <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
          {[
            { id: 'crystal-visions', label: 'Crystal Visions', icon: MysticEye },
            { id: 'risk-oracle', label: 'Risk Oracle', icon: Wand2 },
            { id: 'future-chronicles', label: 'Future Chronicles', icon: Telescope },
            { id: 'prevention-nexus', label: 'Prevention Nexus', icon: Orbit },
            { id: 'intelligence-vortex', label: 'Intelligence Vortex', icon: Atom }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Crystal Visions Tab */}
        {activeTab === 'crystal-visions' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Prediction Accuracy',
                  value: '96%',
                  change: '+2.1%',
                  trend: 'up',
                  icon: MysticEye,
                  color: 'indigo'
                },
                {
                  title: 'Threats Foreseen',
                  value: '47',
                  change: '+12',
                  trend: 'up',
                  icon: Telescope,
                  color: 'violet'
                },
                {
                  title: 'Risk Mitigation',
                  value: '89%',
                  change: '+3.4%',
                  trend: 'up',
                  icon: Shield,
                  color: 'purple'
                },
                {
                  title: 'Proactive Visions',
                  value: '156',
                  change: '+23',
                  trend: 'up',
                  icon: Sparkles,
                  color: 'fuchsia'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top Predictive Prophecies Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'Ransomware Prophecy',
                  type: 'Crystal Ball Vision',
                  confidence: 94,
                  targets: 15,
                  model: 'Neural Network',
                  status: 'PREVENTED',
                  timeline: '7 days ahead'
                },
                {
                  name: 'APT Vision Quest',
                  type: 'Mystic Revelation',
                  confidence: 89,
                  targets: 8,
                  model: 'XGBoost',
                  status: 'MONITORED',
                  timeline: '14 days ahead'
                },
                {
                  name: 'Zero-Day Revelation',
                  type: 'Cosmic Insight',
                  confidence: 92,
                  targets: 3,
                  model: 'Ensemble Wisdom',
                  status: 'BLOCKED',
                  timeline: '3 days ahead'
                }
              ].map((prophecy, index) => (
                <motion.div
                  key={prophecy.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Sparkles className="w-6 h-6 text-indigo-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{prophecy.name}</h3>
                          <p className="text-xs text-slate-400">{prophecy.type}</p>
                        </div>
                      </div>
                      <span className="text-xl font-bold text-violet-400">
                        {prophecy.confidence}%
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Oracle Model:</span>
                        <span className="text-indigo-400 font-medium">{prophecy.model}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Time Horizon:</span>
                        <span className="text-purple-400 font-medium">{prophecy.timeline}</span>
                      </div>
                    </div>

                    {/* Progress bar for prevention */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          prophecy.status === 'PREVENTED' ? 'bg-green-500' :
                          prophecy.status === 'BLOCKED' ? 'bg-indigo-500' :
                          'bg-violet-500'
                        }`}
                        style={{ width: prophecy.status === 'PREVENTED' ? '100%' : prophecy.status === 'BLOCKED' ? '90%' : '75%' }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        prophecy.status === 'PREVENTED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        prophecy.status === 'BLOCKED' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                        'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                      }`}>
                        {prophecy.status}
                      </span>
                      <span className="text-xs text-slate-500">Live</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Real-Time Predictive Activity */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Telescope className="w-6 h-6 text-indigo-400" />
                  <span>Cosmic Predictive Activity</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time visions</span>
              </div>
              <div className="space-y-4">
                {[
                  { time: '14:23:12', event: 'Crystal ball reveals ransomware campaign targeting 15 financial institutions - preventive wards deployed', impact: 'High', action: 'Automated prevention initiated' },
                  { time: '12:45:33', event: 'Mystic vision foresees APT infrastructure compromise - intelligence gathering enhanced', impact: 'Critical', action: 'Defensive constellations activated' },
                  { time: '10:18:47', event: 'Cosmic insight predicts zero-day vulnerability exploitation - patches enchanted', impact: 'Medium', action: 'Proactive countermeasures deployed' },
                  { time: '08:52:19', event: 'Future chronicle reveals supply chain attack pattern - vendor nebula monitored', impact: 'High', action: 'Third-party protection enhanced' }
                ].map((vision, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      vision.impact === 'Critical' ? 'bg-red-400' :
                      vision.impact === 'High' ? 'bg-orange-400' :
                      'bg-yellow-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium">{vision.event}</div>
                      <div className="text-xs text-slate-400">{vision.action}</div>
                    </div>
                    <div className="text-xs text-slate-500">{vision.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Risk Oracle Tab */}
        {activeTab === 'risk-oracle' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Risk Clairvoyance',
                  value: '94%',
                  change: '+1.8%',
                  trend: 'up',
                  icon: Wand2,
                  color: 'indigo'
                },
                {
                  title: 'Vulnerability Visions',
                  value: '127',
                  change: '+8',
                  trend: 'up',
                  icon: MysticEye,
                  color: 'violet'
                },
                {
                  title: 'Attack Surface Aura',
                  value: '78%',
                  change: '+4.2%',
                  trend: 'up',
                  icon: Orbit,
                  color: 'purple'
                },
                {
                  title: 'Compliance Prophecy',
                  value: '91%',
                  change: '+2.1%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'fuchsia'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Oracle Analysis */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Wand2 className="w-6 h-6 text-violet-400" />
                  <span>Risk Oracle Intelligence</span>
                </h2>
                <span className="text-xs text-slate-400">Mystic analysis</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Risk Assessment:</span>
                    <span className="text-indigo-400 font-bold">94% Accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Vulnerability Prophecy:</span>
                    <span className="text-violet-400 font-bold">89% Precision</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Attack Surface Divination:</span>
                    <span className="text-purple-400 font-bold">96% Coverage</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Compliance Oracle:</span>
                    <span className="text-fuchsia-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Risk Constellation:</span>
                    <span className="text-cyan-400 font-bold">15 Patterns</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Future Risk Prophecy:</span>
                    <span className="text-emerald-400 font-bold">92% Success</span>
                  </div>
                </div>
              </div>

              {/* Oracle Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Wand2 className="w-5 h-5 mx-auto mb-2" />
                  Cast Risk Oracle
                </button>
                <button className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <MysticEye className="w-5 h-5 mx-auto mb-2" />
                  Vulnerability Scrying
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Orbit className="w-5 h-5 mx-auto mb-2" />
                  Surface Cartography
                </button>
                <button className="p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Oracle Report
                </button>
              </div>
            </div>
          </>
        )}

        {/* Future Chronicles Tab */}
        {activeTab === 'future-chronicles' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Scenario Accuracy',
                  value: '93%',
                  change: '+1.5%',
                  trend: 'up',
                  icon: Telescope,
                  color: 'indigo'
                },
                {
                  title: 'Attack Chains',
                  value: '34',
                  change: '+7',
                  trend: 'up',
                  icon: Dna,
                  color: 'violet'
                },
                {
                  title: 'Defense Testing',
                  value: '87%',
                  change: '+3.1%',
                  trend: 'up',
                  icon: Shield,
                  color: 'purple'
                },
                {
                  title: 'Recovery Prophecy',
                  value: '91%',
                  change: '+2.4%',
                  trend: 'up',
                  icon: Clock,
                  color: 'fuchsia'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Future Scenario Simulation */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Telescope className="w-6 h-6 text-violet-400" />
                  <span>Future Chronicles & Scenario Simulation</span>
                </h2>
                <span className="text-xs text-slate-400">Time-travel testing</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Scenario Modeling:</span>
                    <span className="text-indigo-400 font-bold">93% Accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Attack Chain Prophecy:</span>
                    <span className="text-violet-400 font-bold">89% Precision</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Defense Aura Testing:</span>
                    <span className="text-purple-400 font-bold">96% Validation</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Resource Nebula:</span>
                    <span className="text-fuchsia-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Recovery Time Oracle:</span>
                    <span className="text-cyan-400 font-bold">15 Scenarios</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Business Continuity:</span>
                    <span className="text-emerald-400 font-bold">92% Success</span>
                  </div>
                </div>
              </div>

              {/* Scenario Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Telescope className="w-5 h-5 mx-auto mb-2" />
                  Run Scenario
                </button>
                <button className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Dna className="w-5 h-5 mx-auto mb-2" />
                  Chain Analysis
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Shield className="w-5 h-5 mx-auto mb-2" />
                  Defense Testing
                </button>
                <button className="p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Scenario Report
                </button>
              </div>
            </div>
          </>
        )}

        {/* Prevention Nexus Tab */}
        {activeTab === 'prevention-nexus' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Prevention Wards',
                  value: '98%',
                  change: '+1.2%',
                  trend: 'up',
                  icon: Orbit,
                  color: 'indigo'
                },
                {
                  title: 'Vulnerability Seals',
                  value: '156',
                  change: '+23',
                  trend: 'up',
                  icon: Shield,
                  color: 'violet'
                },
                {
                  title: 'Configuration Alchemy',
                  value: '89%',
                  change: '+3.4%',
                  trend: 'up',
                  icon: Wand2,
                  color: 'purple'
                },
                {
                  title: 'Threat Hunting Visions',
                  value: '42',
                  change: '+8',
                  trend: 'up',
                  icon: MysticEye,
                  color: 'fuchsia'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Prevention Nexus Dashboard */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Orbit className="w-6 h-6 text-indigo-400" />
                  <span>Prevention Nexus Energy Field</span>
                </h2>
                <span className="text-xs text-slate-400">Cosmic protection</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Automated Wards:</span>
                    <span className="text-indigo-400 font-bold">98% Effectiveness</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Vulnerability Enchantments:</span>
                    <span className="text-violet-400 font-bold">89% Coverage</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Configuration Alchemy:</span>
                    <span className="text-purple-400 font-bold">96% Optimization</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Threat Hunting Quests:</span>
                    <span className="text-fuchsia-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Zero-Trust Vortex:</span>
                    <span className="text-cyan-400 font-bold">42 Policies</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Prevention Success:</span>
                    <span className="text-emerald-400 font-bold">92% Rate</span>
                  </div>
                </div>
              </div>

              {/* Nexus Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Orbit className="w-5 h-5 mx-auto mb-2" />
                  Activate Wards
                </button>
                <button className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Shield className="w-5 h-5 mx-auto mb-2" />
                  Vulnerability Seals
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Wand2 className="w-5 h-5 mx-auto mb-2" />
                  Configuration Alchemy
                </button>
                <button className="p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <MysticEye className="w-5 h-5 mx-auto mb-2" />
                  Threat Hunting
                </button>
              </div>
            </div>
          </>
        )}

        {/* Intelligence Vortex Tab */}
        {activeTab === 'intelligence-vortex' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Intelligence Nebula',
                  value: '97%',
                  change: '+1.8%',
                  trend: 'up',
                  icon: Atom,
                  color: 'indigo'
                },
                {
                  title: 'Dark Web Scrying',
                  value: '234',
                  change: '+31',
                  trend: 'up',
                  icon: MysticEye,
                  color: 'violet'
                },
                {
                  title: 'Geopolitical Stars',
                  value: '18',
                  change: '+4',
                  trend: 'up',
                  icon: Globe,
                  color: 'purple'
                },
                {
                  title: 'Insider Prophecies',
                  value: '12',
                  change: '+2',
                  trend: 'up',
                  icon: Users,
                  color: 'fuchsia'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.title}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Intelligence Vortex Fusion */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Atom className="w-6 h-6 text-violet-400" />
                  <span>Intelligence Vortex Fusion</span>
                </h2>
                <span className="text-xs text-slate-400">Cosmic data fusion</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Multi-Source Nebula:</span>
                    <span className="text-indigo-400 font-bold">97% Fusion</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Dark Web Scrying:</span>
                    <span className="text-violet-400 font-bold">89% Intelligence</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Geopolitical Astrology:</span>
                    <span className="text-purple-400 font-bold">96% Accuracy</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Supply Chain Oracle:</span>
                    <span className="text-fuchsia-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Insider Threat Prophecy:</span>
                    <span className="text-cyan-400 font-bold">12 Patterns</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Federated Mysticism:</span>
                    <span className="text-emerald-400 font-bold">92% Learning</span>
                  </div>
                </div>
              </div>

              {/* Vortex Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Atom className="w-5 h-5 mx-auto mb-2" />
                  Nebula Fusion
                </button>
                <button className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <MysticEye className="w-5 h-5 mx-auto mb-2" />
                  Dark Web Scrying
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Globe className="w-5 h-5 mx-auto mb-2" />
                  Geopolitical Stars
                </button>
                <button className="p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Users className="w-5 h-5 mx-auto mb-2" />
                  Insider Prophecy
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PredictiveCyberOperations;
