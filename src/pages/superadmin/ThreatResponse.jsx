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
  Bot,
  Brain,
  Timer,
  Network,
  Cpu,
  HardDrive,
  Gauge,
  Sliders
} from 'lucide-react';

const ThreatResponse = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('agent-coordination');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-900 via-purple-800 to-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-purple-500/10 to-slate-800/50 backdrop-blur-xl border border-purple-500/30 rounded-xl p-8 text-center shadow-2xl">
            <Shield className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Super Admin Autonomous Defense Orchestrator. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-purple-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-900 via-purple-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Metallic Effects Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-600/25 to-pink-600/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 relative z-10"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-pink-400 via-purple-500 to-pink-600 rounded-xl shadow-2xl shadow-pink-500/20 ring-1 ring-purple-400/30">
              <Bot className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
                Autonomous Defense Orchestrator
              </h1>
              <p className="text-purple-200/80 text-sm font-medium">AI-Powered Zero-Touch Security Operations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-pink-500/50 transition-all duration-200 flex items-center space-x-2 ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </motion.div>

        {/* View Tabs */}
        <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
          {[
            { id: 'agent-coordination', label: 'AI Agent Coordination', icon: Bot },
            { id: 'neural-networks', label: 'Neural Networks', icon: Brain },
            { id: 'automation-metrics', label: 'Automation Analytics', icon: Activity },
            { id: 'human-collaboration', label: 'Human-AI Collaboration', icon: Users },
            { id: 'predictive-intelligence', label: 'Predictive Intelligence', icon: Target },
            { id: 'system-health', label: 'System Health', icon: Shield }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Container */}
        <>
          {/* Overview Tab */}
          {activeTab === 'agent-coordination' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active AI Agents',
                  value: '4',
                  change: '+1',
                  trend: 'up',
                  icon: Bot,
                  color: 'purple'
                },
                {
                  title: 'Zero-Touch Rate',
                  value: '89%',
                  change: '+5.2%',
                  trend: 'up',
                  icon: Zap,
                  color: 'green'
                },
                {
                  title: 'Avg Response Time',
                  value: '0.7s',
                  change: '-0.2s',
                  trend: 'down',
                  icon: Timer,
                  color: 'blue'
                },
                {
                  title: 'Success Rate',
                  value: '98.7%',
                  change: '+2.1%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'indigo'
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

            {/* Top AI Agents Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'Neural Defense Sentinel',
                  type: 'Threat Detection',
                  confidence: 94,
                  uptime: '99.97%',
                  lastAction: 'Blocked APT attempt',
                  status: 'ACTIVE'
                },
                {
                  name: 'Quantum Response Engine',
                  type: 'Incident Response',
                  confidence: 91,
                  uptime: '99.95%',
                  lastAction: 'Automated containment',
                  status: 'ACTIVE'
                },
                {
                  name: 'Adaptive Learning Core',
                  type: 'Machine Learning',
                  confidence: 87,
                  uptime: '99.99%',
                  lastAction: 'Model training completed',
                  status: 'LEARNING'
                }
              ].map((agent, index) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Bot className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{agent.name}</h3>
                          <p className="text-xs text-slate-400">{agent.type}</p>
                        </div>
                      </div>
                      <span className={`text-xl font-bold ${
                        agent.status === 'ACTIVE' ? 'text-green-400' :
                        agent.status === 'LEARNING' ? 'text-blue-400' :
                        'text-gray-400'
                      }`}>
                        {agent.confidence}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Uptime:</span>
                        <span className="text-white font-medium">{agent.uptime}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Action:</span>
                        <span className="text-purple-400 font-medium">{agent.lastAction}</span>
                      </div>
                    </div>

                    {/* Progress bar for confidence */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          agent.confidence >= 90 ? 'bg-green-500' :
                          agent.confidence >= 80 ? 'bg-blue-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: `${agent.confidence}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        agent.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        agent.status === 'LEARNING' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                        'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                      }`}>
                        {agent.status}
                      </span>
                      <span className="text-xs text-slate-500">Live</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent AI Agent Activity */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <span>Recent AI Agent Activity</span>
                </h2>
                <span className="text-xs text-slate-400">Last 24 hours</span>
              </div>
              <div className="space-y-4">
                {[
                  { time: '14:23:12', event: 'Neural Defense Sentinel blocked sophisticated APT campaign targeting critical infrastructure', impact: 'Critical', action: 'Automated containment deployed' },
                  { time: '12:45:33', event: 'Quantum Response Engine coordinated multi-agent response to zero-day exploit', impact: 'High', action: 'Patches deployed automatically' },
                  { time: '10:18:47', event: 'Adaptive Learning Core updated threat models with new attack patterns', impact: 'Medium', action: 'Model accuracy improved by 3.2%' },
                  { time: '08:52:19', event: 'Predictive Guardian preemptively blocked credential stuffing attack', impact: 'High', action: '15,000 login attempts prevented' }
                ].map((event, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      event.impact === 'Critical' ? 'bg-red-400' :
                      event.impact === 'High' ? 'bg-orange-400' :
                      'bg-yellow-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium">{event.event}</div>
                      <div className="text-xs text-slate-400">{event.action}</div>
                    </div>
                    <div className="text-xs text-slate-500">{event.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Neural Networks Tab */}
        {activeTab === 'neural-networks' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active Models',
                  value: '12',
                  change: '+2',
                  trend: 'up',
                  icon: Brain,
                  color: 'purple'
                },
                {
                  title: 'Accuracy Rate',
                  value: '97.3%',
                  change: '+1.2%',
                  trend: 'up',
                  icon: Target,
                  color: 'green'
                },
                {
                  title: 'False Positives',
                  value: '0.02%',
                  change: '-0.01%',
                  trend: 'down',
                  icon: AlertTriangle,
                  color: 'orange'
                },
                {
                  title: 'Adaptation Speed',
                  value: 'Real-time',
                  change: 'Active',
                  trend: 'up',
                  icon: Zap,
                  color: 'blue'
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

            {/* Neural Network Health Monitoring */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <span>Neural Network Health Monitoring</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time Status</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Training Accuracy:</span>
                    <span className="text-purple-400 font-bold">97.3%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">False Positive Rate:</span>
                    <span className="text-green-400 font-bold">0.02%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Last Retrained:</span>
                    <span className="text-blue-400 font-bold">2 minutes ago</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Model Versions:</span>
                    <span className="text-purple-400 font-bold">47</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Bias Detection:</span>
                    <span className="text-green-400 font-bold">Clean</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Memory Usage:</span>
                    <span className="text-cyan-400 font-bold">2.3 GB</span>
                  </div>
                </div>
              </div>

              {/* Neural Network Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Brain className="w-5 h-5 mx-auto mb-2" />
                  Retrain Models
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Gauge className="w-5 h-5 mx-auto mb-2" />
                  Performance Test
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Target className="w-5 h-5 mx-auto mb-2" />
                  Bias Audit
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Settings className="w-5 h-5 mx-auto mb-2" />
                  Optimize
                </button>
              </div>
            </div>
          </>
        )}

        {/* Automation Analytics Tab */}
        {activeTab === 'automation-metrics' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Zero-Touch Rate',
                  value: '89%',
                  change: '+5.2%',
                  trend: 'up',
                  icon: Zap,
                  color: 'purple'
                },
                {
                  title: 'Human Overrides',
                  value: '11%',
                  change: '-2.1%',
                  trend: 'down',
                  icon: Users,
                  color: 'orange'
                },
                {
                  title: 'Avg Response Time',
                  value: '0.7s',
                  change: '-0.2s',
                  trend: 'down',
                  icon: Timer,
                  color: 'blue'
                },
                {
                  title: 'Success Rate',
                  value: '98.7%',
                  change: '+2.1%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'green'
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

            {/* Automation Analytics Dashboard */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-blue-400" />
                  <span>Zero-Touch Automation Analytics</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time Performance</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Automated Responses:</span>
                    <span className="text-purple-400 font-bold">1,247</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Manual Interventions:</span>
                    <span className="text-orange-400 font-bold">156</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Sub-1 Second:</span>
                    <span className="text-green-400 font-bold">67%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">1-5 Seconds:</span>
                    <span className="text-yellow-400 font-bold">28%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Over 5 Seconds:</span>
                    <span className="text-orange-400 font-bold">5%</span>
                  </div>
                </div>
              </div>

              {/* Automation Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Generate Report
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <TrendingUp className="w-5 h-5 mx-auto mb-2" />
                  Performance Analytics
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Sliders className="w-5 h-5 mx-auto mb-2" />
                  Optimize Rules
                </button>
              </div>
            </div>
          </>
        )}

        {/* Human-AI Collaboration Tab */}
        {activeTab === 'human-collaboration' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active Sessions',
                  value: '3',
                  change: '+1',
                  trend: 'up',
                  icon: Users,
                  color: 'purple'
                },
                {
                  title: 'Pending Approvals',
                  value: '2',
                  change: '-1',
                  trend: 'down',
                  icon: Clock,
                  color: 'orange'
                },
                {
                  title: 'Collaborative Decisions',
                  value: '15',
                  change: '+3',
                  trend: 'up',
                  icon: Brain,
                  color: 'blue'
                },
                {
                  title: 'AI Assistance Rate',
                  value: '87%',
                  change: '+4.2%',
                  trend: 'up',
                  icon: TrendingUp,
                  color: 'green'
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

            {/* Human-AI Collaboration Dashboard */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Users className="w-6 h-6 text-purple-400" />
                  <span>Human-AI Collaboration Interface</span>
                </h2>
                <span className="text-xs text-slate-400">Active Sessions</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Overall Confidence:</span>
                    <span className="text-purple-400 font-bold">93%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">AI Recommendation Trust:</span>
                    <span className="text-cyan-400 font-bold">89%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Override Requests:</span>
                    <span className="text-orange-400 font-bold">12</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Joint Decisions:</span>
                    <span className="text-green-400 font-bold">45</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">AI-Only Actions:</span>
                    <span className="text-blue-400 font-bold">1,247</span>
                  </div>
                </div>
              </div>

              {/* Collaboration Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Users className="w-5 h-5 mx-auto mb-2" />
                  Start Session
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <CheckCircle className="w-5 h-5 mx-auto mb-2" />
                  Review Approvals
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Generate Report
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Sliders className="w-5 h-5 mx-auto mb-2" />
                  Adjust Settings
                </button>
              </div>
            </div>
          </>
        )}

        {/* Predictive Intelligence Tab */}
        {activeTab === 'predictive-intelligence' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Prediction Accuracy',
                  value: '94%',
                  change: '+2.1%',
                  trend: 'up',
                  icon: Target,
                  color: 'purple'
                },
                {
                  title: 'Threats Prevented',
                  value: '23',
                  change: '+5',
                  trend: 'up',
                  icon: Shield,
                  color: 'green'
                },
                {
                  title: 'Analysis Speed',
                  value: 'Real-time',
                  change: 'Active',
                  trend: 'up',
                  icon: TrendingUp,
                  color: 'blue'
                },
                {
                  title: 'False Positive Rate',
                  value: '0.03%',
                  change: '-0.01%',
                  trend: 'down',
                  icon: AlertTriangle,
                  color: 'orange'
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

            {/* Predictive Defense Intelligence */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Target className="w-6 h-6 text-purple-400" />
                  <span>Predictive Defense Intelligence</span>
                </h2>
                <span className="text-xs text-slate-400">AI-Driven Prevention</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">APT Campaign Detection:</span>
                    <span className="text-purple-400 font-bold">96%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Ransomware Prediction:</span>
                    <span className="text-cyan-400 font-bold">92%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Zero-Day Vulnerability:</span>
                    <span className="text-blue-400 font-bold">89%</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Current Risk Level:</span>
                    <span className="text-orange-400 font-bold">LOW</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">24h Risk Trend:</span>
                    <span className="text-green-400 font-bold">↓ 12%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Prevention Rate:</span>
                    <span className="text-teal-400 font-bold">94%</span>
                  </div>
                </div>
              </div>

              {/* Predictive Controls */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Target className="w-5 h-5 mx-auto mb-2" />
                  Run Prediction Scan
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Brain className="w-5 h-5 mx-auto mb-2" />
                  Update Models
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  View Analytics
                </button>
              </div>
            </div>
          </>
        )}

        {/* System Health Tab */}
        {activeTab === 'system-health' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Overall Uptime',
                  value: '99.97%',
                  change: '+0.01%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'green'
                },
                {
                  title: 'CPU Usage',
                  value: '23%',
                  change: '-2%',
                  trend: 'down',
                  icon: Cpu,
                  color: 'blue'
                },
                {
                  title: 'Memory Usage',
                  value: '4.2GB',
                  change: '+0.1GB',
                  trend: 'up',
                  icon: HardDrive,
                  color: 'purple'
                },
                {
                  title: 'Network Latency',
                  value: '156ms',
                  change: '-12ms',
                  trend: 'down',
                  icon: Network,
                  color: 'orange'
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

            {/* System Health Dashboard */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Shield className="w-6 h-6 text-purple-400" />
                  <span>Autonomous Defense System Health</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time Monitoring</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">AI Engine Status:</span>
                    <span className="text-green-400 font-bold">✓ Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Database Health:</span>
                    <span className="text-green-400 font-bold">✓ Healthy</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Security Posture:</span>
                    <span className="text-green-400 font-bold">✓ Enforced</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Model Loading:</span>
                    <span className="text-green-400 font-bold">✓ Running</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Query Performance:</span>
                    <span className="text-green-400 font-bold">✓ Optimal</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Access Control:</span>
                    <span className="text-green-400 font-bold">✓ Active</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Training Queue:</span>
                    <span className="text-green-400 font-bold">✓ Processing</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Backup Status:</span>
                    <span className="text-green-400 font-bold">✓ Current</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Audit Logging:</span>
                    <span className="text-green-400 font-bold">✓ Enabled</span>
                  </div>
                </div>
              </div>

              {/* System Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <RefreshCw className="w-5 h-5 mx-auto mb-2" />
                  Run Diagnostics
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Performance Report
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Settings className="w-5 h-5 mx-auto mb-2" />
                  System Settings
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Shield className="w-5 h-5 mx-auto mb-2" />
                  Security Audit
                </button>
              </div>
            </div>
          </>
        )}
        </>
      </div>
    </div>
  );
};

export default ThreatResponse;
