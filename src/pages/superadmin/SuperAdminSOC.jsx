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
  Stars,
  Radar,
  MonitorSpeaker,
  CircuitBoard,
  Binary,
  Workflow,
  ShieldCheck,
  FileSearch,
  ShieldAlert,

} from 'lucide-react';

const SuperAdminSOC = () => {
  const { user } = useAuth();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('event-horizon');
  const [autonomousEnabled, setAutonomousEnabled] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState(85);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Advanced State Management for Interactive Features
  const [eventFilter, setEventFilter] = useState('');
  const [selectedAlerts, setSelectedAlerts] = useState([]);
  const [alertPriority, setAlertPriority] = useState('all');
  const [timeRange, setTimeRange] = useState('24h');
  const [threatClusters, setThreatClusters] = useState([]);
  const [activeIncidents, setActiveIncidents] = useState([]);
  const [responseActions, setResponseActions] = useState([]);
  const [intelligenceFeeds, setIntelligenceFeeds] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [selectedThreat, setSelectedThreat] = useState(null);
  const [showCorrelationMap, setShowCorrelationMap] = useState(false);
  const [automationStatus, setAutomationStatus] = useState('active');

  // Real-time Data Simulation
  const [liveMetrics, setLiveMetrics] = useState({
    activeAlerts: 247,
    eventsPerMinute: 1847,
    responseRate: 94,
    threatCorrelation: 89,
    activeCorrelations: 156,
    threatClusters: 34,
    attackChains: 89,
    behavioralAnomalies: 412,
    automatedResponses: 1247,
    playbookExecutions: 67,
    containmentSuccess: 94,
    communicationAlerts: 203,
    predictiveIntelligence: 97,
    iocGeneration: 1456,
    threatAttribution: 89,
    exploitIntelligence: 312,
    executiveDashboards: 12,
    kpiCompliance: 96,
    riskAssessments: 89,
    strategicIntelligence: 247
  });

  // Simulate real-time data updates
  useEffect(() => {
    if (!isLiveMode) return;

    const interval = setInterval(() => {
      setLiveMetrics(prev => ({
        ...prev,
        activeAlerts: prev.activeAlerts + Math.floor(Math.random() * 5) - 2,
        eventsPerMinute: prev.eventsPerMinute + Math.floor(Math.random() * 50) - 25,
        threatCorrelation: Math.min(100, prev.threatCorrelation + (Math.random() - 0.5) * 2),
        activeCorrelations: prev.activeCorrelations + Math.floor(Math.random() * 3) - 1,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, [isLiveMode]);

  // Interactive Event Filtering
  const [filteredEvents, setFilteredEvents] = useState([]);

  // Threat Correlation Data
  const [correlationData, setCorrelationData] = useState({
    nodes: [],
    links: []
  });

  // Response Workflow State
  const [activePlaybook, setActivePlaybook] = useState(null);
  const [workflowSteps, setWorkflowSteps] = useState([]);

  // Intelligence Oracle Data
  const [predictiveInsights, setPredictiveInsights] = useState([]);
  const [geopoliticalData, setGeopoliticalData] = useState([]);

  // Command Nexus Data
  const [executiveBriefs, setExecutiveBriefs] = useState([]);
  const [complianceMetrics, setComplianceMetrics] = useState([]);
  const [buttonFeedback, setButtonFeedback] = useState({});

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate API call with enhanced data refresh
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Update live metrics with simulated API response
      setLiveMetrics(prev => ({
        ...prev,
        activeAlerts: prev.activeAlerts + Math.floor(Math.random() * 10) - 5,
        eventsPerMinute: prev.eventsPerMinute + Math.floor(Math.random() * 100) - 50,
        responseRate: Math.min(100, prev.responseRate + (Math.random() - 0.5)),
        threatCorrelation: Math.min(100, prev.threatCorrelation + (Math.random() - 0.5) * 3),
      }));

      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to refresh:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Interactive Functions
  const handleAlertSelection = useCallback((alertId) => {
    setSelectedAlerts(prev =>
      prev.includes(alertId)
        ? prev.filter(id => id !== alertId)
        : [...prev, alertId]
    );
  }, []);

  const handleBulkAlertAction = useCallback(async (action) => {
    if (selectedAlerts.length === 0) return;

    // Simulate bulk action processing
    setResponseActions(prev => [...prev, {
      id: Date.now(),
      action,
      alerts: selectedAlerts.length,
      timestamp: new Date(),
      status: 'processing'
    }]);

    // Clear selection after action
    setSelectedAlerts([]);
  }, [selectedAlerts]);

  const handleThreatClusterSelection = useCallback((cluster) => {
    setSelectedThreat(cluster);
    setShowCorrelationMap(true);
  }, []);

  const handlePlaybookExecution = useCallback(async (playbookId) => {
    setActivePlaybook(playbookId);
    setWorkflowSteps([
      { step: 1, name: 'Initial Assessment', status: 'completed', duration: '2s' },
      { step: 2, name: 'Containment Actions', status: 'in-progress', duration: '15s' },
      { step: 3, name: 'Evidence Collection', status: 'pending', duration: '30s' },
      { step: 4, name: 'Recovery Procedures', status: 'pending', duration: '45s' },
      { step: 5, name: 'Post-Incident Review', status: 'pending', duration: '10s' }
    ]);
  }, []);

  const handleIntelligenceFeedToggle = useCallback((feedId, enabled) => {
    setIntelligenceFeeds(prev =>
      prev.map(feed =>
        feed.id === feedId ? { ...feed, enabled } : feed
      )
    );
  }, []);

  const handleCommandExecution = useCallback(async (command, buttonId) => {
    console.log('🔮 Executing command:', command);

    // Set button feedback for visual confirmation
    if (buttonId) {
      setButtonFeedback(prev => ({ ...prev, [buttonId]: true }));
      setTimeout(() => {
        setButtonFeedback(prev => ({ ...prev, [buttonId]: false }));
      }, 200);
    }

    const newCommand = {
      id: Date.now(),
      command,
      timestamp: new Date(),
      user: user?.username || 'SuperAdmin',
      status: 'executed',
      result: 'Command executed successfully'
    };

    setCommandHistory(prev => {
      const updated = [newCommand, ...prev.slice(0, 9)]; // Keep last 10 commands
      console.log('📝 Command history updated:', updated.length, 'commands');
      return updated;
    });

    // Show immediate feedback
    console.log('✨ Command executed successfully:', command);

    // Force a re-render to ensure immediate UI updates
    setTimeout(() => {
      setCommandHistory(prev => [...prev]);
    }, 100);
  }, [user]);

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-900 via-yellow-800 to-slate-950 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-amber-500/10 to-slate-800/50 backdrop-blur-xl border border-amber-500/30 rounded-xl p-8 text-center shadow-2xl">
            <Gem className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Super Admin SOC Command Centre. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-amber-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-amber-900 via-yellow-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Mystical Effects Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-amber-500/30 to-yellow-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-yellow-600/25 to-amber-600/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8 relative z-10"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-xl shadow-2xl shadow-amber-500/20 ring-1 ring-yellow-400/30">
              <Gem className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-yellow-300 via-amber-200 to-yellow-200 bg-clip-text text-transparent drop-shadow-sm">
                SOC Command Centre
              </h1>
              <p className="text-amber-200/80 text-sm font-medium">AI-Powered Security Operations & Mystic Intelligence Hub</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {/* Mystic Alert Indicator */}
            <div className="relative">
              <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">47</span>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-amber-500/50 transition-all duration-200 flex items-center space-x-2 ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Scrying...' : 'Oracle Scan'}</span>
            </button>
          </div>
        </motion.div>

        {/* View Tabs */}
        <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
          {[
            { id: 'event-horizon', label: 'Event Horizon', icon: Radar },
            { id: 'threat-nebula', label: 'Threat Nebula', icon: Atom },
            { id: 'response-matrix', label: 'Response Matrix', icon: CircuitBoard },
            { id: 'intelligence-oracle', label: 'Intelligence Oracle', icon: MysticEye },
            { id: 'command-nexus', label: 'Command Nexus', icon: Crown }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Event Horizon Tab */}
        {activeTab === 'event-horizon' && (
          <>
            {/* Interactive Controls */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Settings className="w-6 h-6 text-amber-400" />
                  <span>Event Horizon Controls</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Live Mode:</label>
                    <button
                      onClick={() => setIsLiveMode(!isLiveMode)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        isLiveMode
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-slate-600/20 text-slate-400 border border-slate-600/30'
                      }`}
                    >
                      {isLiveMode ? 'ON' : 'OFF'}
                    </button>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Priority:</label>
                    <select
                      value={alertPriority}
                      onChange={(e) => setAlertPriority(e.target.value)}
                      className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white"
                    >
                      <option value="all">All</option>
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Time Range:</label>
                    <select
                      value={timeRange}
                      onChange={(e) => setTimeRange(e.target.value)}
                      className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white"
                    >
                      <option value="1h">1 Hour</option>
                      <option value="6h">6 Hours</option>
                      <option value="24h">24 Hours</option>
                      <option value="7d">7 Days</option>
                      <option value="30d">30 Days</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Search and Filter */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search events, alerts, or threats..."
                    value={eventFilter}
                    onChange={(e) => setEventFilter(e.target.value)}
                    className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:border-amber-500/50"
                  />
                </div>
                <button
                  onClick={() => setEventFilter('')}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 hover:text-white rounded-lg transition-colors"
                >
                  Clear
                </button>
              </div>

              {/* Bulk Actions */}
              {selectedAlerts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-amber-500/10 border border-amber-500/30 rounded-lg"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-amber-400 font-medium">
                      {selectedAlerts.length} alert{selectedAlerts.length !== 1 ? 's' : ''} selected
                    </span>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleBulkAlertAction('acknowledge')}
                        className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 hover:text-blue-300 rounded text-sm font-medium transition-colors"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => handleBulkAlertAction('suppress')}
                        className="px-3 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 hover:text-orange-300 rounded text-sm font-medium transition-colors"
                      >
                        Suppress
                      </button>
                      <button
                        onClick={() => handleBulkAlertAction('escalate')}
                        className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 hover:text-red-300 rounded text-sm font-medium transition-colors"
                      >
                        Escalate
                      </button>
                      <button
                        onClick={() => setSelectedAlerts([])}
                        className="px-3 py-1 bg-slate-600/50 hover:bg-slate-500/50 text-slate-400 hover:text-slate-300 rounded text-sm font-medium transition-colors"
                      >
                        Clear Selection
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Key Metrics Grid - Now Interactive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active Alerts',
                  value: liveMetrics.activeAlerts.toLocaleString(),
                  change: '+34',
                  trend: 'up',
                  icon: AlertTriangle,
                  color: 'red',
                  description: 'Real-time alert count',
                  onClick: () => setAlertPriority('critical')
                },
                {
                  title: 'Events Per Minute',
                  value: liveMetrics.eventsPerMinute.toLocaleString(),
                  change: '+123',
                  trend: 'up',
                  icon: Activity,
                  color: 'blue',
                  description: 'Current event processing rate',
                  onClick: () => setTimeRange('1h')
                },
                {
                  title: 'Response Rate',
                  value: `${liveMetrics.responseRate}%`,
                  change: '+2.1%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'green',
                  description: 'Automated response effectiveness',
                  onClick: () => setActiveTab('response-matrix')
                },
                {
                  title: 'Threat Correlation',
                  value: `${liveMetrics.threatCorrelation}%`,
                  change: '+1.8%',
                  trend: 'up',
                  icon: Network,
                  color: 'purple',
                  description: 'Multi-source threat correlation',
                  onClick: () => setActiveTab('threat-nebula')
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:border-amber-500/50 transition-all duration-200 group"
                    onClick={metric.onClick}
                    title={`Click to ${metric.description}`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg group-hover:bg-${metric.color}-500/30 transition-colors`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{metric.value}</div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</div>
                    <div className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{metric.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top Critical Events Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  name: 'Critical Alert Storm',
                  type: 'Multi-System Breach',
                  severity: 'CRITICAL',
                  eventsPerMin: 47,
                  systemsAffected: 12,
                  siemEngine: 'Active',
                  status: 'CONTAINED',
                  correlation: '94%'
                },
                {
                  name: 'APT Nebula Detected',
                  type: 'Advanced Persistent Threat',
                  severity: 'HIGH',
                  eventsPerMin: 23,
                  systemsAffected: 8,
                  siemEngine: 'Analyzing',
                  status: 'ANALYZING',
                  correlation: '87%'
                },
                {
                  name: 'Zero-Day Oracle Vision',
                  type: 'Unknown Exploit Pattern',
                  severity: 'CRITICAL',
                  eventsPerMin: 31,
                  systemsAffected: 3,
                  siemEngine: 'Learning',
                  status: 'BLOCKED',
                  correlation: '96%'
                }
              ].map((event, index) => (
                <motion.div
                  key={event.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Radar className="w-6 h-6 text-amber-400" />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                          <p className="text-xs text-slate-400">{event.type}</p>
                        </div>
                      </div>
                      <span className={`text-xl font-bold ${
                        event.severity === 'CRITICAL' ? 'text-red-400' :
                        event.severity === 'HIGH' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>
                        {event.eventsPerMin}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">SIEM Engine:</span>
                        <span className="text-amber-400 font-medium">{event.siemEngine}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Correlation:</span>
                        <span className="text-purple-400 font-medium">{event.correlation}</span>
                      </div>
                    </div>

                    {/* Progress bar for event processing */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          event.status === 'CONTAINED' ? 'bg-green-500' :
                          event.status === 'BLOCKED' ? 'bg-indigo-500' :
                          'bg-amber-500'
                        }`}
                        style={{ width: event.status === 'CONTAINED' ? '100%' : event.status === 'BLOCKED' ? '95%' : '70%' }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        event.status === 'CONTAINED' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                        event.status === 'BLOCKED' ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30' :
                        'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      }`}>
                        {event.status}
                      </span>
                      <span className="text-xs text-slate-500">Live</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Real-Time Event Stream */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-amber-400" />
                  <span>Event Horizon Stream</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time processing</span>
              </div>
              <div className="space-y-4">
                {[
                  { time: '14:23:12', event: 'SIEM correlation detected lateral movement across 12 systems - automated containment initiated', impact: 'Critical', action: 'Response matrix activated' },
                  { time: '12:45:33', event: 'Anomaly detection flagged unusual data exfiltration pattern - ML analysis enhanced', impact: 'High', action: 'Intelligence oracle consulted' },
                  { time: '10:18:47', event: 'Zero-day exploit signature identified through behavioral analysis - global blocking deployed', impact: 'Critical', action: 'Threat nebula expanded' },
                  { time: '08:52:19', event: 'Insider threat pattern detected in access logs - behavioral monitoring intensified', impact: 'Medium', action: 'Command nexus alerted' }
                ].map((stream, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${
                      stream.impact === 'Critical' ? 'bg-red-400' :
                      stream.impact === 'High' ? 'bg-orange-400' :
                      'bg-yellow-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium">{stream.event}</div>
                      <div className="text-xs text-slate-400">{stream.action}</div>
                    </div>
                    <div className="text-xs text-slate-500">{stream.time}</div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Threat Nebula Tab */}
        {activeTab === 'threat-nebula' && (
          <>
            {/* Interactive Nebula Controls */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Atom className="w-6 h-6 text-purple-400" />
                  <span>Threat Nebula Controls</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Analysis Mode:</label>
                    <select
                      value={automationStatus}
                      onChange={(e) => setAutomationStatus(e.target.value)}
                      className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white"
                    >
                      <option value="active">Active</option>
                      <option value="learning">Learning</option>
                      <option value="intensive">Intensive</option>
                      <option value="passive">Passive</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Correlation Depth:</label>
                    <select className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white">
                      <option value="surface">Surface</option>
                      <option value="deep">Deep</option>
                      <option value="quantum">Quantum</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Threat Clusters Visualization */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Active Threat Clusters</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { id: 1, name: 'APT Cluster Alpha', severity: 'Critical', connections: 47, status: 'Active' },
                    { id: 2, name: 'Ransomware Nebula', severity: 'High', connections: 23, status: 'Expanding' },
                    { id: 3, name: 'Zero-Day Constellation', severity: 'Critical', connections: 89, status: 'Contained' },
                    { id: 4, name: 'Insider Threat Orbit', severity: 'Medium', connections: 12, status: 'Monitoring' },
                    { id: 5, name: 'Supply Chain Vortex', severity: 'High', connections: 34, status: 'Analyzing' },
                    { id: 6, name: 'IoT Swarm', severity: 'Low', connections: 8, status: 'Passive' }
                  ].map((cluster) => (
                    <div
                      key={cluster.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                        selectedThreat?.id === cluster.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-slate-600/50 bg-slate-700/30 hover:bg-slate-600/50'
                      }`}
                      onClick={() => handleThreatClusterSelection(cluster)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{cluster.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          cluster.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          cluster.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          cluster.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {cluster.severity}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">
                        {cluster.connections} connections • {cluster.status}
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            cluster.status === 'Active' ? 'bg-red-500' :
                            cluster.status === 'Expanding' ? 'bg-orange-500' :
                            cluster.status === 'Contained' ? 'bg-green-500' :
                            cluster.status === 'Monitoring' ? 'bg-yellow-500' :
                            cluster.status === 'Analyzing' ? 'bg-blue-500' :
                            'bg-slate-500'
                          }`}
                          style={{ width: cluster.status === 'Contained' ? '100%' : cluster.status === 'Active' ? '80%' : '60%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid - Interactive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Active Correlations',
                  value: liveMetrics.activeCorrelations.toString(),
                  change: '+23',
                  trend: 'up',
                  icon: Network,
                  color: 'blue',
                  description: 'Real-time threat correlation analysis'
                },
                {
                  title: 'Threat Clusters',
                  value: liveMetrics.threatClusters.toString(),
                  change: '+7',
                  trend: 'up',
                  icon: Atom,
                  color: 'purple',
                  description: 'Identified threat cluster groups'
                },
                {
                  title: 'Attack Chains',
                  value: liveMetrics.attackChains.toString(),
                  change: '+4.2%',
                  trend: 'up',
                  icon: Dna,
                  color: 'green',
                  description: 'Mapped attack chain sequences'
                },
                {
                  title: 'Behavioral Anomalies',
                  value: liveMetrics.behavioralAnomalies.toString(),
                  change: '+67',
                  trend: 'up',
                  icon: Brain,
                  color: 'orange',
                  description: 'Detected anomalous behavior patterns'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:border-purple-500/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg group-hover:bg-${metric.color}-500/30 transition-colors`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{metric.value}</div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</div>
                    <div className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{metric.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Threat Correlation Analysis */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Atom className="w-6 h-6 text-purple-400" />
                  <span>Threat Nebula Intelligence</span>
                </h2>
                <span className="text-xs text-slate-400">Multi-dimensional analysis</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Correlation Engine:</span>
                    <span className="text-indigo-400 font-bold">97% Accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Behavioral Analysis:</span>
                    <span className="text-violet-400 font-bold">94% Detection</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Anomaly Detection:</span>
                    <span className="text-purple-400 font-bold">96% Precision</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Threat Hunting:</span>
                    <span className="text-fuchsia-400 font-bold">{automationStatus === 'active' ? 'Active' : 'Standby'}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Attack Chain Mapping:</span>
                    <span className="text-cyan-400 font-bold">{liveMetrics.attackChains} Chains</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Pattern Recognition:</span>
                    <span className="text-emerald-400 font-bold">92% Success</span>
                  </div>
                </div>
              </div>

              {/* Nebula Controls - Now Interactive */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleCommandExecution('Initiate Nebula Fusion Analysis')}
                  className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Atom className="w-5 h-5 mx-auto mb-2" />
                  Nebula Fusion
                </button>
                <button
                  onClick={() => handleCommandExecution('Execute Behavioral Analysis Scan')}
                  className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Brain className="w-5 h-5 mx-auto mb-2" />
                  Behavioral Analysis
                </button>
                <button
                  onClick={() => handleCommandExecution('Map Attack Chain Sequences')}
                  className="p-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Dna className="w-5 h-5 mx-auto mb-2" />
                  Chain Mapping
                </button>
                <button
                  onClick={() => handleCommandExecution('Activate Threat Hunting Protocol')}
                  className="p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <MysticEye className="w-5 h-5 mx-auto mb-2" />
                  Threat Hunting
                </button>
              </div>
            </div>
          </>
        )}

        {/* Response Matrix Tab */}
        {activeTab === 'response-matrix' && (
          <>
            {/* Interactive Response Controls */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <CircuitBoard className="w-6 h-6 text-green-400" />
                  <span>Response Matrix Controls</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Response Mode:</label>
                    <select className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white">
                      <option value="automated">Automated</option>
                      <option value="semi-automated">Semi-Automated</option>
                      <option value="manual">Manual Override</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Priority Threshold:</label>
                    <select className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white">
                      <option value="critical">Critical+</option>
                      <option value="high">High+</option>
                      <option value="medium">Medium+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Playbook Display */}
              {activePlaybook && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-green-400 font-semibold">Active Playbook: {activePlaybook}</h3>
                    <button
                      onClick={() => setActivePlaybook(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="space-y-2">
                    {workflowSteps.map((step) => (
                      <div key={step.step} className="flex items-center space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          step.status === 'completed' ? 'bg-green-500 text-white' :
                          step.status === 'in-progress' ? 'bg-blue-500 text-white' :
                          'bg-slate-600 text-slate-400'
                        }`}>
                          {step.step}
                        </div>
                        <span className="text-white">{step.name}</span>
                        <span className="text-slate-400 text-sm">{step.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Response Actions Log */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Response Actions</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {responseActions.slice(-5).map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                      <span className="text-white">{action.action} - {action.alerts} alerts</span>
                      <span className={`text-xs px-2 py-1 rounded ${
                        action.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                        action.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {action.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid - Interactive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Automated Responses',
                  value: liveMetrics.automatedResponses.toString(),
                  change: '+89',
                  trend: 'up',
                  icon: Zap,
                  color: 'blue',
                  description: 'AI-driven incident responses'
                },
                {
                  title: 'Playbook Executions',
                  value: liveMetrics.playbookExecutions.toString(),
                  change: '+12',
                  trend: 'up',
                  icon: Workflow,
                  color: 'green',
                  description: 'Automated response workflows'
                },
                {
                  title: 'Containment Success',
                  value: `${liveMetrics.containmentSuccess}%`,
                  change: '+2.1%',
                  trend: 'up',
                  icon: ShieldCheck,
                  color: 'purple',
                  description: 'Threat containment effectiveness'
                },
                {
                  title: 'Communication Alerts',
                  value: liveMetrics.communicationAlerts.toString(),
                  change: '+31',
                  trend: 'up',
                  icon: Radio,
                  color: 'orange',
                  description: 'Stakeholder notifications sent'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:border-green-500/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg group-hover:bg-${metric.color}-500/30 transition-colors`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">{metric.value}</div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</div>
                    <div className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{metric.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response Orchestration Center */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <CircuitBoard className="w-6 h-6 text-green-400" />
                  <span>Response Matrix Orchestration</span>
                </h2>
                <span className="text-xs text-slate-400">Automated coordination</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Response Orchestration:</span>
                    <span className="text-indigo-400 font-bold">96% Efficiency</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Playbook Intelligence:</span>
                    <span className="text-violet-400 font-bold">94% Selection</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Resource Allocation:</span>
                    <span className="text-purple-400 font-bold">97% Optimization</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Containment Automation:</span>
                    <span className="text-fuchsia-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Stakeholder Alerts:</span>
                    <span className="text-cyan-400 font-bold">{liveMetrics.communicationAlerts} Sent</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Response Effectiveness:</span>
                    <span className="text-emerald-400 font-bold">{liveMetrics.containmentSuccess}% Success</span>
                  </div>
                </div>
              </div>

              {/* Matrix Controls - Now Interactive */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleCommandExecution('Execute APT Response Protocol Playbook', 'response-playbook')}
                  className={`p-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 ${
                    buttonFeedback['response-playbook'] ? 'ring-2 ring-green-400 scale-110' : ''
                  }`}
                >
                  <Workflow className="w-5 h-5 mx-auto mb-2" />
                  Execute Playbook
                </button>
                <button
                  onClick={() => handleCommandExecution('Initiate Containment Protocol Alpha')}
                  className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <ShieldCheck className="w-5 h-5 mx-auto mb-2" />
                  Containment Protocol
                </button>
                <button
                  onClick={() => handleCommandExecution('Broadcast Stakeholder Alert Matrix')}
                  className="p-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Radio className="w-5 h-5 mx-auto mb-2" />
                  Alert Communications
                </button>
                <button
                  onClick={() => handleCommandExecution('Deploy SOC Response Resources')}
                  className="p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Users className="w-5 h-5 mx-auto mb-2" />
                  Resource Deployment
                </button>
              </div>
            </div>
          </>
        )}

        {/* Intelligence Oracle Tab */}
        {activeTab === 'intelligence-oracle' && (
          <>
            {/* Interactive Oracle Controls */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <MysticEye className="w-6 h-6 text-blue-400" />
                  <span>Intelligence Oracle Controls</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Oracle Mode:</label>
                    <select className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white">
                      <option value="prophetic">Prophetic</option>
                      <option value="analytical">Analytical</option>
                      <option value="strategic">Strategic</option>
                      <option value="tactical">Tactical</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Confidence Threshold:</label>
                    <select className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white">
                      <option value="80">80%+</option>
                      <option value="90">90%+</option>
                      <option value="95">95%+</option>
                      <option value="99">99%+</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Predictive Insights Display */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Active Predictive Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 1, insight: 'APT-47 Campaign Expansion', confidence: 97, timeline: '2-3 weeks', impact: 'Critical' },
                    { id: 2, insight: 'Ransomware Wave Incoming', confidence: 89, timeline: '1 week', impact: 'High' },
                    { id: 3, insight: 'Zero-Day Exploit Discovery', confidence: 94, timeline: '3-5 days', impact: 'Critical' },
                    { id: 4, insight: 'Supply Chain Compromise', confidence: 76, timeline: '1-2 months', impact: 'Medium' }
                  ].map((insight) => (
                    <div key={insight.id} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium">{insight.insight}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          insight.impact === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          insight.impact === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          insight.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {insight.impact}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">
                        Confidence: {insight.confidence}% • Timeline: {insight.timeline}
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            insight.confidence >= 95 ? 'bg-green-500' :
                            insight.confidence >= 85 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${insight.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IOC Generation Feed */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Live IOC Generation</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {[
                    { time: '14:23:45', ioc: 'New malware hash detected', type: 'Hash', confidence: 98 },
                    { time: '14:22:12', ioc: 'Suspicious domain pattern', type: 'Domain', confidence: 87 },
                    { time: '14:20:33', ioc: 'Command & control IP', type: 'IP', confidence: 94 },
                    { time: '14:18:47', ioc: 'Malicious file signature', type: 'File', confidence: 91 }
                  ].map((ioc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-slate-700/30 rounded text-sm">
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500">{ioc.time}</span>
                        <span className="text-white">{ioc.ioc}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          ioc.type === 'Hash' ? 'bg-blue-500/20 text-blue-400' :
                          ioc.type === 'Domain' ? 'bg-green-500/20 text-green-400' :
                          ioc.type === 'IP' ? 'bg-red-500/20 text-red-400' :
                          'bg-purple-500/20 text-purple-400'
                        }`}>
                          {ioc.type}
                        </span>
                        <span className="text-slate-400">{ioc.confidence}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid - Interactive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Predictive Intelligence',
                  value: `${liveMetrics.predictiveIntelligence}%`,
                  change: '+1.8%',
                  trend: 'up',
                  icon: MysticEye,
                  color: 'purple',
                  description: 'AI-powered threat forecasting accuracy'
                },
                {
                  title: 'IOC Generation',
                  value: liveMetrics.iocGeneration.toString(),
                  change: '+234',
                  trend: 'up',
                  icon: Search,
                  color: 'blue',
                  description: 'Automated indicator generation rate'
                },
                {
                  title: 'Threat Attribution',
                  value: `${liveMetrics.threatAttribution}%`,
                  change: '+3.1%',
                  trend: 'up',
                  icon: Target,
                  color: 'red',
                  description: 'Attacker identification confidence'
                },
                {
                  title: 'Exploit Intelligence',
                  value: liveMetrics.exploitIntelligence.toString(),
                  change: '+67',
                  trend: 'up',
                  icon: FileSearch,
                  color: 'orange',
                  description: 'Vulnerability intelligence discoveries'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:border-blue-500/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg group-hover:bg-${metric.color}-500/30 transition-colors`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{metric.value}</div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</div>
                    <div className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{metric.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Oracle Intelligence Hub */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Wand2 className="w-6 h-6 text-blue-400" />
                  <span>Intelligence Oracle Hub</span>
                </h2>
                <span className="text-xs text-slate-400">Predictive wisdom</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Predictive Forecasting:</span>
                    <span className="text-indigo-400 font-bold">{liveMetrics.predictiveIntelligence}% Accuracy</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">IOC Discovery:</span>
                    <span className="text-violet-400 font-bold">{liveMetrics.iocGeneration} Generated</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Threat Attribution:</span>
                    <span className="text-purple-400 font-bold">{liveMetrics.threatAttribution}% Confidence</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Exploit Intelligence:</span>
                    <span className="text-fuchsia-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Geopolitical Analysis:</span>
                    <span className="text-cyan-400 font-bold">18 Nations</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Strategic Intelligence:</span>
                    <span className="text-emerald-400 font-bold">92% Coverage</span>
                  </div>
                </div>
              </div>

              {/* Oracle Controls - Now Interactive */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleCommandExecution('Activate Predictive Vision Algorithm')}
                  className="p-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <MysticEye className="w-5 h-5 mx-auto mb-2" />
                  Predictive Vision
                </button>
                <button
                  onClick={() => handleCommandExecution('Generate IOC Intelligence Matrix')}
                  className="p-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Search className="w-5 h-5 mx-auto mb-2" />
                  IOC Generation
                </button>
                <button
                  onClick={() => handleCommandExecution('Execute Threat Attribution Analysis')}
                  className="p-4 bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-purple-700 hover:to-fuchsia-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Target className="w-5 h-5 mx-auto mb-2" />
                  Threat Attribution
                </button>
                <button
                  onClick={() => handleCommandExecution('Consult Geopolitical Intelligence Oracle')}
                  className="p-4 bg-gradient-to-r from-fuchsia-600 to-pink-600 hover:from-fuchsia-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Globe className="w-5 h-5 mx-auto mb-2" />
                  Geopolitical Oracle
                </button>
              </div>
            </div>
          </>
        )}

        {/* Command Nexus Tab */}
        {activeTab === 'command-nexus' && (
          <>
            {/* Interactive Executive Controls */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Crown className="w-6 h-6 text-amber-400" />
                  <span>Executive Command Controls</span>
                </h2>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Command Priority:</label>
                    <select className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white">
                      <option value="executive">Executive</option>
                      <option value="strategic">Strategic</option>
                      <option value="tactical">Tactical</option>
                      <option value="operational">Operational</option>
                    </select>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="text-sm text-slate-400">Report Frequency:</label>
                    <select className="bg-slate-700/50 border border-slate-600/50 rounded px-3 py-1 text-sm text-white">
                      <option value="real-time">Real-time</option>
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Command History */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Command Actions</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {commandHistory.slice(0, 5).map((command) => (
                    <div key={command.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded">
                      <div className="flex items-center space-x-3">
                        <span className="text-slate-500 text-xs">
                          {new Date(command.timestamp).toLocaleTimeString()}
                        </span>
                        <span className="text-white text-sm">{command.command}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 text-xs">{command.user}</span>
                        <span className={`text-xs px-2 py-1 rounded ${
                          command.status === 'executed' ? 'bg-green-500/20 text-green-400' :
                          command.status === 'processing' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {command.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Executive Briefs */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-4">Executive Intelligence Briefs</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Q4 Threat Landscape Report', priority: 'High', recipients: 8, status: 'Delivered' },
                    { title: 'Zero-Day Exploitation Analysis', priority: 'Critical', recipients: 12, status: 'Draft' },
                    { title: 'Strategic Risk Assessment', priority: 'Medium', recipients: 6, status: 'Review' },
                    { title: 'Compliance Status Update', priority: 'Low', recipients: 15, status: 'Scheduled' }
                  ].map((brief, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{brief.title}</h4>
                        <span className={`text-xs px-2 py-1 rounded ${
                          brief.priority === 'Critical' ? 'bg-red-500/20 text-red-400' :
                          brief.priority === 'High' ? 'bg-orange-500/20 text-orange-400' :
                          brief.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {brief.priority}
                        </span>
                      </div>
                      <div className="text-sm text-slate-400 mb-2">
                        {brief.recipients} recipients • {brief.status}
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            brief.status === 'Delivered' ? 'bg-green-500' :
                            brief.status === 'Draft' ? 'bg-blue-500' :
                            brief.status === 'Review' ? 'bg-yellow-500' :
                            'bg-slate-500'
                          }`}
                          style={{ width: brief.status === 'Delivered' ? '100%' : brief.status === 'Draft' ? '30%' : brief.status === 'Review' ? '70%' : '10%' }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Key Metrics Grid - Interactive */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: 'Executive Dashboards',
                  value: liveMetrics.executiveDashboards.toString(),
                  change: '+2',
                  trend: 'up',
                  icon: Crown,
                  color: 'gold',
                  description: 'Active executive monitoring interfaces'
                },
                {
                  title: 'KPI Compliance',
                  value: `${liveMetrics.kpiCompliance}%`,
                  change: '+1.2%',
                  trend: 'up',
                  icon: CheckCircle,
                  color: 'green',
                  description: 'Key performance indicator adherence'
                },
                {
                  title: 'Risk Assessments',
                  value: liveMetrics.riskAssessments.toString(),
                  change: '+5',
                  trend: 'up',
                  icon: ShieldAlert,
                  color: 'red',
                  description: 'Comprehensive risk evaluation reports'
                },
                {
                  title: 'Strategic Intelligence',
                  value: liveMetrics.strategicIntelligence.toString(),
                  change: '+34',
                  trend: 'up',
                  icon: Brain,
                  color: 'blue',
                  description: 'Long-term security intelligence insights'
                }
              ].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:border-amber-500/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg group-hover:bg-${metric.color}-500/30 transition-colors`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        <TrendingUp className={`w-3 h-3 ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`} />
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{metric.value}</div>
                    <div className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">{metric.title}</div>
                    <div className="text-xs text-slate-500 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{metric.description}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Executive Command Center */}
            <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Crown className="w-6 h-6 text-amber-400" />
                  <span>Executive Command Nexus</span>
                </h2>
                <span className="text-xs text-slate-400">Strategic oversight</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Executive Visibility:</span>
                    <span className="text-indigo-400 font-bold">96% Coverage</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">KPI Monitoring:</span>
                    <span className="text-violet-400 font-bold">{liveMetrics.kpiCompliance}% Compliance</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Risk Intelligence:</span>
                    <span className="text-purple-400 font-bold">{liveMetrics.riskAssessments} Assessments</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Strategic Planning:</span>
                    <span className="text-fuchsia-400 font-bold">Active</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Long-term Trends:</span>
                    <span className="text-cyan-400 font-bold">{liveMetrics.strategicIntelligence} Insights</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-slate-600/20 rounded">
                    <span className="text-slate-400">Executive Confidence:</span>
                    <span className="text-emerald-400 font-bold">92% Rating</span>
                  </div>
                </div>
              </div>

              {/* Nexus Controls - Now Interactive */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleCommandExecution('Generate Executive Intelligence Brief')}
                  className="p-4 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Crown className="w-5 h-5 mx-auto mb-2" />
                  Executive Brief
                </button>
                <button
                  onClick={() => handleCommandExecution('Update KPI Compliance Dashboard')}
                  className="p-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <CheckCircle className="w-5 h-5 mx-auto mb-2" />
                  KPI Dashboard
                </button>
                <button
                  onClick={() => handleCommandExecution('Execute Comprehensive Risk Assessment')}
                  className="p-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <ShieldAlert className="w-5 h-5 mx-auto mb-2" />
                  Risk Assessment
                </button>
                <button
                  onClick={() => handleCommandExecution('Activate Strategic Intelligence Synthesis')}
                  className="p-4 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <Brain className="w-5 h-5 mx-auto mb-2" />
                  Strategic Intelligence
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SuperAdminSOC;
