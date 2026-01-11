import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Activity,
  Globe,
  Target,
  Zap,
  Brain,
  Network,
  Cpu,
  Monitor,
  Radio,
  Siren,
  Eye,
  Lock,
  BarChart3,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Settings,
  Search,
  Filter,
  MapPin,
  Satellite,
  Radar,
  Crosshair,
  Layers,
  Command,
  Crown,
  Star,
  Timer,
  Bot,
  Database,
  FileText,
  Sparkles,
  Gem,
  Orbit,
  Telescope,
  Atom,
  Dna,
  Flame,
  Wind,
  Mountain,
  CloudRain,
  Sun,
  Moon,
  Stars,
  Workflow,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
  Mic,
  MicOff
} from 'lucide-react';

const NationalCyberCommandCenter = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeView, setActiveView] = useState('overview');
  const [threatLevel, setThreatLevel] = useState('ELEVATED');
  const [commandStatus, setCommandStatus] = useState('ACTIVE');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Advanced State Management
  const [nationalThreats, setNationalThreats] = useState([]);
  const [activeOperations, setActiveOperations] = useState([]);
  const [intelligenceFeeds, setIntelligenceFeeds] = useState([]);
  const [responseTeams, setResponseTeams] = useState([]);
  const [criticalAssets, setCriticalAssets] = useState([]);
  const [liveMetrics, setLiveMetrics] = useState({
    activeThreats: 47,
    protectedAssets: 1247,
    responseTeams: 23,
    intelligenceAlerts: 89,
    containmentActions: 156,
    nationalRiskScore: 78,
    cyberDefenseReadiness: 94,
    internationalCoordination: 87
  });

  const [alerts, setAlerts] = useState([
    {
      id: 'nat-001',
      title: 'Nation-State APT Detected',
      severity: 'CRITICAL',
      source: 'NSA Intelligence',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'ACTIVE',
      affectedSystems: 12,
      responseTime: '2m 34s',
      confidence: 97
    },
    {
      id: 'nat-002',
      title: 'Critical Infrastructure Breach',
      severity: 'HIGH',
      source: 'DHS Alert',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      status: 'CONTAINED',
      affectedSystems: 8,
      responseTime: '5m 12s',
      confidence: 91
    },
    {
      id: 'nat-003',
      title: 'Ransomware Campaign',
      severity: 'HIGH',
      source: 'FBI Intelligence',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      status: 'MONITORING',
      affectedSystems: 15,
      responseTime: '8m 47s',
      confidence: 84
    }
  ]);

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        activeThreats: prev.activeThreats + Math.floor(Math.random() * 3) - 1,
        intelligenceAlerts: prev.intelligenceAlerts + Math.floor(Math.random() * 5) - 2,
        containmentActions: prev.containmentActions + Math.floor(Math.random() * 2),
        nationalRiskScore: Math.min(100, Math.max(0, prev.nationalRiskScore + (Math.random() - 0.5) * 2)),
        cyberDefenseReadiness: Math.min(100, Math.max(85, prev.cyberDefenseReadiness + (Math.random() - 0.5))),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-red-500/20 text-red-400';
      case 'contained': return 'bg-green-500/20 text-green-400';
      case 'monitoring': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-blue-500/20 text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 via-indigo-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/40 to-indigo-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/35 to-purple-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl"></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            {/* National Command Badge */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/30 ring-2 ring-cyan-400/50">
                <Shield className="w-8 h-8 text-white" />
              </div>
              {/* Pulsing Indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-ping opacity-75"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
                National Cyber Command Center
              </h1>
              <p className="text-cyan-200/80 text-sm font-medium">Unified National Cyber Defense & Intelligence Operations Hub</p>

              {/* Status Indicators */}
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${threatLevel === 'CRITICAL' ? 'bg-red-400 animate-pulse' : threatLevel === 'HIGH' ? 'bg-orange-400' : 'bg-yellow-400'}`}></div>
                  <span className="text-xs text-slate-300">Threat Level: <span className={`font-semibold ${threatLevel === 'CRITICAL' ? 'text-red-400' : threatLevel === 'HIGH' ? 'text-orange-400' : 'text-yellow-400'}`}>{threatLevel}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${commandStatus === 'ACTIVE' ? 'bg-green-400 animate-pulse' : 'bg-slate-400'}`}></div>
                  <span className="text-xs text-slate-300">Command Status: <span className={`font-semibold ${commandStatus === 'ACTIVE' ? 'text-green-400' : 'text-slate-400'}`}>{commandStatus}</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Live Status Panel */}
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-xs text-slate-300">LIVE</span>
                </div>
                <div className="text-xs text-slate-400">|</div>
                <div className="text-xs text-slate-300">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Intel'}</span>
            </button>
          </div>
        </motion.div>

        {/* Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'overview', label: 'Command Overview', icon: Monitor },
            { id: 'threats', label: 'National Threats', icon: AlertTriangle },
            { id: 'operations', label: 'Active Operations', icon: Target },
            { id: 'intelligence', label: 'Intelligence Fusion', icon: Brain },
            { id: 'response', label: 'Emergency Response', icon: Siren }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeView === tab.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Overview Tab */}
        {activeView === 'overview' && (
          <>
            {/* National Security Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active National Threats',
                  value: liveMetrics.activeThreats.toString(),
                  change: '+3',
                  trend: 'up',
                  icon: AlertTriangle,
                  color: 'red',
                  description: 'Real-time national threat monitoring'
                },
                {
                  title: 'Protected Critical Assets',
                  value: liveMetrics.protectedAssets.toString(),
                  change: '+47',
                  trend: 'up',
                  icon: Shield,
                  color: 'green',
                  description: 'Nationally protected infrastructure'
                },
                {
                  title: 'National Risk Score',
                  value: `${liveMetrics.nationalRiskScore}%`,
                  change: '-1.2%',
                  trend: 'down',
                  icon: Target,
                  color: 'orange',
                  description: 'Overall national cyber risk assessment'
                },
                {
                  title: 'Cyber Defense Readiness',
                  value: `${liveMetrics.cyberDefenseReadiness}%`,
                  change: '+0.8%',
                  trend: 'up',
                  icon: Zap,
                  color: 'blue',
                  description: 'National defense capability readiness'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-lg transition-colors ${
                        metric.color === 'red' ? 'bg-red-500/20 group-hover:bg-red-500/30' :
                        metric.color === 'green' ? 'bg-green-500/20 group-hover:bg-green-500/30' :
                        metric.color === 'orange' ? 'bg-orange-500/20 group-hover:bg-orange-500/30' :
                        'bg-blue-500/20 group-hover:bg-blue-500/30'
                      }`}>
                        <metric.icon className={`w-6 h-6 ${
                          metric.color === 'red' ? 'text-red-400' :
                          metric.color === 'green' ? 'text-green-400' :
                          metric.color === 'orange' ? 'text-orange-400' :
                          'text-blue-400'
                        }`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">{metric.value}</div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</div>
                    <div className="text-xs text-slate-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">{metric.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active National Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Priority Alerts */}
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                    <span>Priority National Alerts</span>
                  </h2>
                  <span className="text-xs text-slate-400">Live Feed</span>
                </div>

                <div className="space-y-4">
                  {alerts.map((alert, index) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="text-white font-semibold">{alert.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                              {alert.severity}
                            </span>
                          </div>
                          <div className="text-sm text-slate-400 mb-2">Source: {alert.source}</div>
                          <div className="flex items-center space-x-4 text-xs text-slate-500">
                            <span>Affected: {alert.affectedSystems} systems</span>
                            <span>Response: {alert.responseTime}</span>
                            <span>Confidence: {alert.confidence}%</span>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded text-xs font-semibold ${getStatusColor(alert.status)}`}>
                          {alert.status}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* National Command Status */}
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                    <Command className="w-6 h-6 text-blue-400" />
                    <span>National Command Status</span>
                  </h2>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-400">OPERATIONAL</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    { component: 'National Intelligence Center', status: 'Active', operations: 23 },
                    { component: 'Emergency Response Network', status: 'Standby', operations: 8 },
                    { component: 'Critical Infrastructure Monitor', status: 'Active', operations: 47 },
                    { component: 'International Coordination Hub', status: 'Active', operations: 12 },
                    { component: 'Cyber Defense Operations', status: 'Active', operations: 31 }
                  ].map((component, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${component.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                        <div>
                          <div className="text-white font-medium text-sm">{component.component}</div>
                          <div className="text-xs text-slate-400">{component.operations} active operations</div>
                        </div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        component.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {component.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* National Intelligence Map */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Globe className="w-6 h-6 text-cyan-400" />
                  <span>National Intelligence Operations Map</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-slate-400">Real-time global coverage</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-cyan-400">87 nations monitored</span>
                  </div>
                </div>
              </div>

              {/* Interactive Map Placeholder with Premium Styling */}
              <div className="relative h-96 bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg border border-slate-600/30 overflow-hidden">
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `
                      linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px',
                    animation: 'moveGrid 20s linear infinite'
                  }}></div>
                </div>

                {/* Threat Indicators */}
                <div className="absolute inset-0">
                  {[
                    { x: '15%', y: '25%', type: 'critical', label: 'Eastern Europe APT' },
                    { x: '45%', y: '35%', type: 'high', label: 'Pacific Rim Attack' },
                    { x: '75%', y: '45%', type: 'medium', label: 'Middle East Campaign' },
                    { x: '25%', y: '65%', type: 'critical', label: 'South Asia Threat' },
                    { x: '60%', y: '75%', type: 'high', label: 'African Cyber Ops' }
                  ].map((threat, index) => (
                    <motion.div
                      key={index}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: index * 0.2 }}
                      className="absolute"
                      style={{ left: threat.x, top: threat.y }}
                    >
                      <div className={`w-4 h-4 rounded-full border-2 animate-pulse ${
                        threat.type === 'critical' ? 'bg-red-400 border-red-300' :
                        threat.type === 'high' ? 'bg-orange-400 border-orange-300' :
                        'bg-yellow-400 border-yellow-300'
                      }`}></div>
                      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-slate-800/90 backdrop-blur-sm border border-slate-600/30 rounded px-2 py-1">
                        <span className="text-xs text-white whitespace-nowrap">{threat.label}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm border border-slate-600/30 rounded-lg p-3">
                  <div className="flex items-center space-x-4 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <span className="text-slate-300">Critical Threat</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                      <span className="text-slate-300">High Priority</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-slate-300">Medium Risk</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Threats Tab */}
        {activeView === 'threats' && (
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span>National Threat Intelligence</span>
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-slate-400">Advanced AI analysis</span>
                <div className="flex items-center space-x-2">
                  <Brain className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs text-cyan-400">AI-Powered</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  threat: 'State-Sponsored Cyber Campaign',
                  actor: 'APT-47',
                  target: 'Critical Infrastructure',
                  impact: 'National Security',
                  confidence: 97,
                  timeline: 'Active - Next 48hrs',
                  mitigation: 'Enhanced monitoring deployed'
                },
                {
                  threat: 'Advanced Ransomware Network',
                  actor: 'DarkNet Collective',
                  target: 'Financial Sector',
                  impact: 'Economic Disruption',
                  confidence: 89,
                  timeline: 'Imminent - 24hrs',
                  mitigation: 'Automated defenses activated'
                },
                {
                  threat: 'Supply Chain Compromise',
                  actor: 'Unknown Actor',
                  target: 'Technology Vendors',
                  impact: 'Widespread Exposure',
                  confidence: 76,
                  timeline: 'Developing - 1 week',
                  mitigation: 'Intelligence sharing initiated'
                }
              ].map((threat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">THREAT</div>
                      <div className="text-white font-semibold">{threat.threat}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">ACTOR</div>
                      <div className="text-cyan-400 font-medium">{threat.actor}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">TARGET</div>
                      <div className="text-orange-400 font-medium">{threat.target}</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">CONFIDENCE</div>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-medium">{threat.confidence}%</span>
                        <div className="w-16 bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${threat.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-600/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Impact:</span>
                        <span className="text-red-400 ml-2 font-medium">{threat.impact}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Timeline:</span>
                        <span className="text-yellow-400 ml-2 font-medium">{threat.timeline}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Status:</span>
                        <span className="text-green-400 ml-2 font-medium">{threat.mitigation}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Operations Tab */}
        {activeView === 'operations' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Active Operations */}
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                    <Target className="w-6 h-6 text-green-400" />
                    <span>Active National Operations</span>
                  </h2>
                  <span className="text-xs text-green-400">8 operations running</span>
                </div>

                <div className="space-y-4">
                  {[
                    { name: 'Operation Shield Wall', type: 'Defense', status: 'Active', progress: 87, teams: 12 },
                    { name: 'Operation Cyber Guardian', type: 'Protection', status: 'Active', progress: 92, teams: 8 },
                    { name: 'Operation Threat Hunter', type: 'Offensive', status: 'Active', progress: 76, teams: 15 },
                    { name: 'Operation Intel Fusion', type: 'Intelligence', status: 'Active', progress: 94, teams: 6 }
                  ].map((op, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${op.status === 'Active' ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`}></div>
                          <div>
                            <div className="text-white font-medium">{op.name}</div>
                            <div className="text-xs text-slate-400">{op.type} • {op.teams} teams deployed</div>
                          </div>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          op.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {op.status}
                        </span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${op.progress}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">{op.progress}% complete</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Teams */}
              <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                    <Users className="w-6 h-6 text-blue-400" />
                    <span>Deployed Response Teams</span>
                  </h2>
                  <span className="text-xs text-blue-400">23 teams active</span>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'National CERT Team Alpha', location: 'Washington DC', status: 'Deployed', specialty: 'Critical Infrastructure' },
                    { name: 'Cyber Defense Unit Bravo', location: 'New York', status: 'Standby', specialty: 'Financial Sector' },
                    { name: 'Intelligence Response Charlie', location: 'San Francisco', status: 'Active', specialty: 'Technology' },
                    { name: 'Emergency Response Delta', location: 'Chicago', status: 'Deployed', specialty: 'Healthcare' }
                  ].map((team, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
                      <div className="flex-1">
                        <div className="text-white font-medium text-sm">{team.name}</div>
                        <div className="text-xs text-slate-400">{team.location} • {team.specialty}</div>
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded ${
                        team.status === 'Deployed' ? 'bg-red-500/20 text-red-400' :
                        team.status === 'Active' ? 'bg-green-500/20 text-green-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {team.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Intelligence Tab */}
        {activeView === 'intelligence' && (
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Brain className="w-6 h-6 text-purple-400" />
                <span>Intelligence Fusion Center</span>
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-slate-400">Multi-source intelligence</span>
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-purple-400" />
                  <span className="text-xs text-purple-400">18 agencies connected</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { source: 'NSA Signals Intelligence', alerts: 47, status: 'Active', lastUpdate: '2m ago' },
                { source: 'FBI Cyber Division', alerts: 23, status: 'Active', lastUpdate: '5m ago' },
                { source: 'DHS CISA', alerts: 31, status: 'Active', lastUpdate: '1m ago' },
                { source: 'CIA Clandestine Ops', alerts: 12, status: 'Active', lastUpdate: '8m ago' },
                { source: 'DOD Cyber Command', alerts: 28, status: 'Active', lastUpdate: '3m ago' },
                { source: 'Treasury FinCEN', alerts: 15, status: 'Active', lastUpdate: '6m ago' }
              ].map((feed, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-white font-medium text-sm">{feed.source}</div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">LIVE</span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{feed.alerts}</div>
                  <div className="text-xs text-slate-400">Active intelligence alerts</div>
                  <div className="text-xs text-slate-500 mt-2">Updated {feed.lastUpdate}</div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Response Tab */}
        {activeView === 'response' && (
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Siren className="w-6 h-6 text-red-400" />
                <span>Emergency Cyber Response Center</span>
              </h2>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-slate-400">National emergency protocols</span>
                <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-red-500/25">
                  <Siren className="w-4 h-4" />
                  <span>Activate Emergency Protocol</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Emergency Protocols */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Emergency Response Protocols</h3>
                {[
                  { name: 'Critical Infrastructure Breach', code: 'CIP-001', status: 'Ready', responseTime: '< 5min' },
                  { name: 'Nation-State Cyber Attack', code: 'NSA-001', status: 'Ready', responseTime: '< 10min' },
                  { name: 'Financial System Compromise', code: 'FIN-001', status: 'Ready', responseTime: '< 3min' },
                  { name: 'Healthcare Data Breach', code: 'HHS-001', status: 'Ready', responseTime: '< 2min' }
                ].map((protocol, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <div>
                      <div className="text-white font-medium">{protocol.name}</div>
                      <div className="text-xs text-slate-400">{protocol.code} • Response: {protocol.responseTime}</div>
                    </div>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm font-semibold">
                      {protocol.status}
                    </span>
                  </div>
                ))}
              </div>

              {/* Communication Channels */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-4">Emergency Communication</h3>
                {[
                  { channel: 'National Security Council', status: 'Connected', priority: 'Critical' },
                  { channel: 'Federal Agency Network', status: 'Connected', priority: 'High' },
                  { channel: 'State & Local Governments', status: 'Connected', priority: 'High' },
                  { channel: 'International Partners', status: 'Connected', priority: 'Medium' }
                ].map((comm, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                    <div>
                      <div className="text-white font-medium text-sm">{comm.channel}</div>
                      <div className="text-xs text-slate-400">Priority: {comm.priority}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">{comm.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NationalCyberCommandCenter;
