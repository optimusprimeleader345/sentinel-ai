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
  FileText
} from 'lucide-react';

const IncidentCommandCenter = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('active-incidents');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-900 via-crimson-800 to-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-red-500/10 to-slate-800/50 backdrop-blur-xl border border-red-500/30 rounded-xl p-8 text-center shadow-2xl">
            <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Super Admin Incident Command Center. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-red-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-900 via-crimson-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Military Effects Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-red-500/30 to-crimson-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-crimson-600/25 to-red-600/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-red-400/20 to-crimson-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 relative z-10"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-red-400 via-crimson-500 to-red-600 rounded-xl shadow-2xl shadow-red-500/20 ring-1 ring-crimson-400/30">
              <Siren className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-300 via-crimson-300 via-red-200 to-crimson-200 bg-clip-text text-transparent drop-shadow-sm">
                Incident Command Center
              </h1>
              <p className="text-red-200/80 text-sm font-medium">AI-Powered National Cyber Incident Response & Escalation Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Critical Incident Alert */}
            <div className="relative">
              <AlertTriangle className="w-5 h-5 text-red-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">3</span>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-red-500/50 transition-all duration-200 flex items-center space-x-2 ${
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
            { id: 'active-incidents', label: 'Active Incidents', icon: AlertTriangle },
            { id: 'ai-intelligence', label: 'AI Intelligence', icon: Brain },
            { id: 'response-teams', label: 'Response Teams', icon: Users },
            { id: 'impact-analysis', label: 'Impact Analysis', icon: BarChart3 },
            { id: 'command-center', label: 'Command Center', icon: Command }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Incidents Tab */}
        {activeTab === 'active-incidents' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Critical Incidents',
                  value: '3',
                  change: '+2',
                  trend: 'up',
                  icon: AlertTriangle,
                  color: 'red'
                },
                {
                  title: 'Active Response Teams',
                  value: '8',
                  change: '+1',
                  trend: 'up',
                  icon: Users,
                  color: 'blue'
                },
                {
                  title: 'Response Effectiveness',
                  value: '94%',
                  change: '+3.2%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'green'
                },
                {
                  title: 'Threats Contained',
                  value: '23',
                  change: '+5',
                  trend: 'up',
                  icon: Shield,
                  color: 'purple'
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

            {/* Top Critical Incidents Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'Nationwide Ransomware Attack',
                  type: 'Ransomware',
                  severity: 'CRITICAL',
                  confidence: 94,
                  affectedOrgs: 15,
                  status: 'CONTAINED',
                  escalation: 'LEVEL 5'
                },
                {
                  name: 'APT Infrastructure Compromise',
                  type: 'Advanced Persistent Threat',
                  severity: 'HIGH',
                  confidence: 87,
                  affectedOrgs: 3,
                  status: 'ESCALATED',
                  escalation: 'LEVEL 4'
                },
                {
                  name: 'Supply Chain Security Breach',
                  type: 'Supply Chain Attack',
                  severity: 'HIGH',
                  confidence: 89,
                  affectedOrgs: 8,
                  status: 'INVESTIGATING',
                  escalation: 'LEVEL 3'
                }
              ].map((incident, index) => (
                <motion.div
                  key={incident.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-6 h-6 text-red-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{incident.name}</h3>
                          <p className="text-xs text-slate-400">{incident.type}</p>
                        </div>
                      </div>
                      <span className={`text-xl font-bold ${
                        incident.severity === 'CRITICAL' ? 'text-red-400' :
                        incident.severity === 'HIGH' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>
                        {incident.severity === 'CRITICAL' ? incident.affectedOrgs : incident.confidence}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">AI Confidence:</span>
                        <span className="text-purple-400 font-medium">{incident.confidence}%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Escalation:</span>
                        <span className="text-red-400 font-medium">{incident.escalation}</span>
                      </div>
                    </div>

                    {/* Progress bar for containment */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          incident.status === 'CONTAINED' ? 'bg-green-500' :
                          incident.status === 'ESCALATED' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}
                        style={{ width: incident.status === 'CONTAINED' ? '90%' : incident.status === 'ESCALATED' ? '60%' : '30%' }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        incident.status === 'CONTAINED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        incident.status === 'ESCALATED' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                        'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {incident.status}
                      </span>
                      <span className="text-xs text-slate-500">Live</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Incident Activity */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-red-400" />
                  <span>Real-Time Incident Activity</span>
                </h2>
                <span className="text-xs text-slate-400">Last 24 hours</span>
              </div>
              <div className="space-y-4">
                {[
                  { time: '14:23:12', event: 'AI detected ransomware deployment across 15 organizations - automated containment initiated', impact: 'Critical', action: 'Response teams mobilized' },
                  { time: '12:45:33', event: 'APT infrastructure compromise escalated - multi-agency coordination activated', impact: 'High', action: 'Federal response deployed' },
                  { time: '10:18:47', event: 'Supply chain vulnerability exploited - AI predicted 8 additional targets', impact: 'Medium', action: 'Preventive measures deployed' },
                  { time: '08:52:19', event: 'Critical infrastructure systems isolated - zero data exfiltration confirmed', impact: 'High', action: 'Recovery procedures initiated' }
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

        {/* AI Intelligence Tab */}
        {activeTab === 'ai-intelligence' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'AI Classification Accuracy',
                  value: '96%',
                  change: '+2.1%',
                  trend: 'up',
                  icon: Brain,
                  color: 'purple'
                },
                {
                  title: 'Predictive Escalations',
                  value: '12',
                  change: '+3',
                  trend: 'up',
                  icon: TrendingUp,
                  color: 'red'
                },
                {
                  title: 'Automated Responses',
                  value: '89%',
                  change: '+5.2%',
                  trend: 'up',
                  icon: Zap,
                  color: 'blue'
                },
                {
                  title: 'False Positives',
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

            {/* AI Intelligence Analysis */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                  <span>AI-Powered Incident Intelligence</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time Analysis</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Incident Classification:</span>
                    <span className="text-purple-400 font-bold">96% Accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Escalation Prediction:</span>
                    <span className="text-red-400 font-bold">89% Precision</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Response Optimization:</span>
                    <span className="text-blue-400 font-bold">94% Effectiveness</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Pattern Recognition:</span>
                    <span className="text-green-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Threat Correlation:</span>
                    <span className="text-orange-400 font-bold">15 Incidents</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Predictive Accuracy:</span>
                    <span className="text-cyan-400 font-bold">92% Success</span>
                  </div>
                </div>
              </div>

              {/* AI Intelligence Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Brain className="w-5 h-5 mx-auto mb-2" />
                  Run AI Analysis
                </button>
                <button className="p-4 bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <TrendingUp className="w-5 h-5 mx-auto mb-2" />
                  Predictive Modeling
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Zap className="w-5 h-5 mx-auto mb-2" />
                  Automated Response
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Intelligence Report
                </button>
              </div>
            </div>
          </>
        )}

        {/* Response Teams Tab */}
        {activeTab === 'response-teams' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active Teams',
                  value: '8',
                  change: '+1',
                  trend: 'up',
                  icon: Users,
                  color: 'blue'
                },
                {
                  title: 'Standby Teams',
                  value: '12',
                  change: '+2',
                  trend: 'up',
                  icon: Clock,
                  color: 'green'
                },
                {
                  title: 'Mobilized Teams',
                  value: '5',
                  change: '+1',
                  trend: 'up',
                  icon: Zap,
                  color: 'orange'
                },
                {
                  title: 'Team Readiness',
                  value: '98%',
                  change: '+0.5%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'purple'
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

            {/* Response Teams Management */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span>National Response Teams Management</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time Deployment</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Ransomware Specialists:</span>
                    <span className="text-green-400 font-bold">✓ Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">APT Response Unit:</span>
                    <span className="text-green-400 font-bold">✓ Deployed</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Infrastructure Defense:</span>
                    <span className="text-green-400 font-bold">✓ Ready</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Supply Chain Security:</span>
                    <span className="text-yellow-400 font-bold">On Standby</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Emergency Response:</span>
                    <span className="text-blue-400 font-bold">Available</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Federal Coordination:</span>
                    <span className="text-purple-400 font-bold">Activated</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">International Support:</span>
                    <span className="text-cyan-400 font-bold">Coordinated</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Technical Specialists:</span>
                    <span className="text-green-400 font-bold">12 Available</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Command Leadership:</span>
                    <span className="text-gold-400 font-bold">Active</span>
                  </div>
                </div>
              </div>

              {/* Response Team Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Users className="w-5 h-5 mx-auto mb-2" />
                  Mobilize Team
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Radio className="w-5 h-5 mx-auto mb-2" />
                  Team Communication
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Performance Metrics
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Settings className="w-5 h-5 mx-auto mb-2" />
                  Resource Allocation
                </button>
              </div>
            </div>
          </>
        )}

        {/* Impact Analysis Tab */}
        {activeTab === 'impact-analysis' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Critical Systems Affected',
                  value: '3',
                  change: '+1',
                  trend: 'up',
                  icon: Server,
                  color: 'red'
                },
                {
                  title: 'Users Impacted',
                  value: '250K',
                  change: '+50K',
                  trend: 'up',
                  icon: Users,
                  color: 'orange'
                },
                {
                  title: 'Economic Impact',
                  value: '$2.1B',
                  change: '+$800M',
                  trend: 'up',
                  icon: TrendingUp,
                  color: 'yellow'
                },
                {
                  title: 'Recovery Time',
                  value: '72h',
                  change: '+24h',
                  trend: 'up',
                  icon: Clock,
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
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-red-400' : 'text-green-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
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

            {/* Impact Assessment Dashboard */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <BarChart3 className="w-6 h-6 text-orange-400" />
                  <span>Real-Time Impact Assessment</span>
                </h2>
                <span className="text-xs text-slate-400">AI-Powered Analysis</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Business Disruption:</span>
                    <span className="text-red-400 font-bold">High Impact</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Data Exposure Risk:</span>
                    <span className="text-orange-400 font-bold">Critical</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Recovery Complexity:</span>
                    <span className="text-yellow-400 font-bold">Complex</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Stakeholder Communication:</span>
                    <span className="text-blue-400 font-bold">Ongoing</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Regulatory Reporting:</span>
                    <span className="text-purple-400 font-bold">Required</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Insurance Claims:</span>
                    <span className="text-green-400 font-bold">$2.1B Filed</span>
                  </div>
                </div>
              </div>

              {/* Impact Analysis Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <BarChart3 className="w-5 h-5 mx-auto mb-2" />
                  Generate Impact Report
                </button>
                <button className="p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Shield className="w-5 h-5 mx-auto mb-2" />
                  Mitigation Strategies
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Radio className="w-5 h-5 mx-auto mb-2" />
                  Stakeholder Updates
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <TrendingUp className="w-5 h-5 mx-auto mb-2" />
                  Recovery Timeline
                </button>
              </div>
            </div>
          </>
        )}

        {/* Command Center Tab */}
        {activeTab === 'command-center' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active Commands',
                  value: '12',
                  change: '+3',
                  trend: 'up',
                  icon: Command,
                  color: 'red'
                },
                {
                  title: 'Decision Confidence',
                  value: '92%',
                  change: '+2.1%',
                  trend: 'up',
                  icon: Crown,
                  color: 'purple'
                },
                {
                  title: 'Response Coordination',
                  value: '98%',
                  change: '+1.2%',
                  trend: 'up',
                  icon: Network,
                  color: 'blue'
                },
                {
                  title: 'Executive Briefings',
                  value: '5',
                  change: '+1',
                  trend: 'up',
                  icon: FileText,
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

            {/* Command Center Executive Dashboard */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Command className="w-6 h-6 text-red-400" />
                  <span>Executive Command Center</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time Decision Support</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">National Emergency Level:</span>
                    <span className="text-red-400 font-bold">LEVEL 5</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">AI Decision Confidence:</span>
                    <span className="text-purple-400 font-bold">92%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Multi-Agency Coordination:</span>
                    <span className="text-blue-400 font-bold">Active</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Presidential Briefing:</span>
                    <span className="text-gold-400 font-bold">Prepared</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Congressional Updates:</span>
                    <span className="text-green-400 font-bold">Ongoing</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">International Coordination:</span>
                    <span className="text-cyan-400 font-bold">Established</span>
                  </div>
                </div>
              </div>

              {/* Executive Command Controls */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button className="p-4 bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Siren className="w-5 h-5 mx-auto mb-2" />
                  Declare National Emergency
                </button>
                <button className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Crown className="w-5 h-5 mx-auto mb-2" />
                  Executive Briefing
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Radio className="w-5 h-5 mx-auto mb-2" />
                  National Address
                </button>
                <button className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                  <Shield className="w-5 h-5 mx-auto mb-2" />
                  Full Containment Protocol
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IncidentCommandCenter;
