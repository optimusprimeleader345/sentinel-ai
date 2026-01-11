import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Radar,
  Shield,
  Activity,
  Zap,
  RefreshCw,
  Play,
  Pause,
  Square,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Save,
  RotateCcw,
  Power,
  PowerOff,
  Sliders,
  Gauge,
  Timer,
  Clock,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Target,
  Crosshair,
  Satellite,
  Radio,
  Layers,
  Grid3X3,
  Workflow,
  GitBranch,
  Share2,
  Download,
  Upload,
  FileText,
  Code,
  Terminal,
  Cpu as CpuIcon,
  MemoryStick,
  HardDrive as StorageIcon,
  Wifi as WifiIcon,
  Bolt,
  Brain,
  Eye as EyeIcon,
  MapPin,
  Network,
  Database,
  Cloud,
  Server,
  Monitor,
  Settings,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  ScanLine,
  Microscope,
  TestTube,
  TestTube2,
  Atom,
  Dna,
  Zap as Thunder,
  Wind,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Star,
  Sparkles
} from 'lucide-react';

const AdvancedThreatIntelligenceHub = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Intelligence gathering states
  const [feedStatus, setFeedStatus] = useState({
    alienvault: 'active',
    shodan: 'active',
    mitre: 'active',
    darkweb: 'scanning',
    internal: 'active'
  });

  const [threatLevels, setThreatLevels] = useState({
    critical: 3,
    high: 8,
    medium: 15,
    low: 27,
    info: 45
  });

  const [analysisMode, setAnalysisMode] = useState({
    pattern: true,
    attribution: true,
    prediction: true,
    correlation: true,
    forensics: false
  });

  const [intelligenceSources, setIntelligenceSources] = useState({
    open_source: true,
    commercial: true,
    government: true,
    dark_web: false,
    insider: false
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await Promise.all([fetchIntelligenceData()]);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to refresh intelligence data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, handleRefresh]);

  // Mock intelligence data
  const mockIntelligenceData = {
    globalThreats: [
      {
        id: 'threat-001',
        name: 'SolarWinds Supply Chain Attack',
        type: 'APT',
        severity: 'critical',
        confidence: 95,
        attribution: 'APT29 (Cozy Bear)',
        affectedCountries: 18,
        activeIndicators: 234,
        lastSeen: '2025-01-02T08:30:00Z',
        status: 'active'
      },
      {
        id: 'threat-002',
        name: 'Ransomware Campaign',
        type: 'Malware',
        severity: 'high',
        confidence: 88,
        attribution: 'LockBit Gang',
        affectedCountries: 45,
        activeIndicators: 156,
        lastSeen: '2025-01-02T06:15:00Z',
        status: 'active'
      },
      {
        id: 'threat-003',
        name: 'Zero-Day Vulnerability',
        type: 'Vulnerability',
        severity: 'critical',
        confidence: 92,
        attribution: 'Unknown',
        affectedCountries: 67,
        activeIndicators: 89,
        lastSeen: '2025-01-02T04:45:00Z',
        status: 'active'
      }
    ],
    intelligenceFeeds: [
      {
        id: 'feed-001',
        name: 'AlienVault OTX',
        type: 'Open Source',
        status: 'active',
        pulses: 1247,
        lastUpdate: '2025-01-02T08:45:00Z',
        reliability: 92
      },
      {
        id: 'feed-002',
        name: 'MITRE ATT&CK',
        type: 'Framework',
        status: 'active',
        pulses: 892,
        lastUpdate: '2025-01-02T08:30:00Z',
        reliability: 98
      },
      {
        id: 'feed-003',
        name: 'Dark Web Monitor',
        type: 'Dark Web',
        status: 'scanning',
        pulses: 156,
        lastUpdate: '2025-01-02T08:15:00Z',
        reliability: 75
      }
    ],
    predictions: [
      {
        id: 'pred-001',
        type: 'Attack Pattern',
        description: 'AI-enhanced phishing campaigns targeting executives',
        probability: 78,
        timeframe: 'Next 48 hours',
        confidence: 85,
        mitigation: 'Enable advanced email filtering'
      },
      {
        id: 'pred-002',
        type: 'Vulnerability Exploitation',
        description: 'Mass exploitation of zero-day in enterprise software',
        probability: 65,
        timeframe: 'Next 72 hours',
        confidence: 91,
        mitigation: 'Apply emergency patches'
      }
    ],
    attribution: [
      {
        id: 'attr-001',
        actor: 'APT28 (Fancy Bear)',
        confidence: 94,
        techniques: ['Spear Phishing', 'Zero-Day Exploits', 'Lateral Movement'],
        campaigns: 12,
        lastActivity: '2025-01-01T22:30:00Z',
        region: 'Eastern Europe'
      },
      {
        id: 'attr-002',
        actor: 'Lazarus Group',
        confidence: 89,
        techniques: ['Supply Chain Attacks', 'Ransomware', 'Cryptocurrency Mining'],
        campaigns: 8,
        lastActivity: '2025-01-01T18:45:00Z',
        region: 'East Asia'
      }
    ],
    metrics: {
      totalThreats: 98,
      activeThreats: 23,
      intelligenceFeeds: 15,
      predictions: 12,
      attributionConfidence: 87,
      coverage: 94
    }
  };

  // Fetch intelligence data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 1200));
        setIntelligenceData(mockIntelligenceData);
        setLastUpdated(new Date());
      } catch (err) {
        setError('Failed to load intelligence data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchIntelligenceData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockIntelligenceData;
    } catch (error) {
      console.error('Error fetching intelligence data:', error);
      throw error;
    }
  };

  // Intelligence control handlers
  const toggleFeedStatus = useCallback((feed, newStatus) => {
    setFeedStatus(prev => ({
      ...prev,
      [feed]: newStatus || (prev[feed] === 'active' ? 'inactive' : 'active')
    }));
  }, []);

  const updateThreatLevels = useCallback((level, operation) => {
    setThreatLevels(prev => ({
      ...prev,
      [level]: operation === 'increment'
        ? prev[level] + 1
        : operation === 'decrement'
        ? Math.max(0, prev[level] - 1)
        : Math.max(0, operation)
    }));
  }, []);

  const toggleAnalysisMode = useCallback((mode) => {
    setAnalysisMode(prev => ({
      ...prev,
      [mode]: !prev[mode]
    }));
  }, []);

  const toggleIntelligenceSource = useCallback((source) => {
    setIntelligenceSources(prev => ({
      ...prev,
      [source]: !prev[source]
    }));
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 90) return 'text-green-400';
    if (confidence >= 80) return 'text-blue-400';
    if (confidence >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-green-900 via-teal-800 to-slate-900 p-6 relative overflow-hidden">
      {/* Oceanic Effects Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <div className="absolute top-20 left-20 w-[480px] h-[480px] bg-gradient-to-r from-emerald-500/50 to-green-500/50 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-[520px] h-[520px] bg-gradient-to-r from-green-600/45 to-teal-600/45 rounded-full blur-3xl" style={{ animationDelay: '1.4s' }}></div>
        <div className="absolute top-1/4 right-1/5 w-96 h-96 bg-gradient-to-r from-teal-500/40 to-emerald-500/40 rounded-full blur-3xl" style={{ animationDelay: '2.8s' }}></div>
        <div className="absolute bottom-3/4 left-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/35 to-blue-400/35 rounded-full blur-3xl" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-300/30 to-emerald-300/30 rounded-full blur-3xl" style={{ animationDelay: '2.2s' }}></div>
      </div>
      <div className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4 relative z-10">
          <div className="p-3 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-xl shadow-2xl shadow-emerald-500/20 ring-1 ring-green-400/30">
            <Radar className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 via-teal-200 to-green-200 bg-clip-text text-transparent drop-shadow-sm">
              Advanced Threat Intelligence Hub
            </h1>
            <p className="text-green-200/80 text-sm font-medium">AI-Powered Global Threat Intelligence & Attribution Center</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{intelligenceData?.metrics.activeThreats || 0}</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all duration-200 flex items-center space-x-2 ${
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
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'threats', label: 'Global Threats', icon: Globe },
          { id: 'feeds', label: 'Intelligence Feeds', icon: Network },
          { id: 'analysis', label: 'Analysis', icon: Brain },
          { id: 'attribution', label: 'Attribution', icon: Target }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {selectedView === 'overview' && intelligenceData && (
        <>
          {/* Intelligence Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[{
              title: 'Active Threats',
              value: intelligenceData.metrics.activeThreats,
              change: '+5',
              trend: 'up',
              icon: AlertTriangle,
              color: 'red'
            }, {
              title: 'Intelligence Coverage',
              value: `${intelligenceData.metrics.coverage}%`,
              change: '+2.1%',
              trend: 'up',
              icon: Shield,
              color: 'green'
            }, {
              title: 'Attribution Confidence',
              value: `${intelligenceData.metrics.attributionConfidence}%`,
              change: '+1.8%',
              trend: 'up',
              icon: Target,
              color: 'emerald'
            }, {
              title: 'Predictions',
              value: intelligenceData.metrics.predictions,
              change: 'Stable',
              trend: 'stable',
              icon: Brain,
              color: 'blue'
            }].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                      <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : metric.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      ) : null}
                      <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.title}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Threat Level Distribution and Intelligence Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Threat Level Distribution */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
                <span>Threat Level Distribution</span>
              </h3>
              <div className="space-y-4">
                {Object.entries(threatLevels).map(([level, count]) => (
                  <div key={level} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        level === 'critical' ? 'bg-red-400' :
                        level === 'high' ? 'bg-orange-400' :
                        level === 'medium' ? 'bg-yellow-400' :
                        level === 'low' ? 'bg-blue-400' : 'bg-gray-400'
                      }`}></div>
                      <span className="text-white capitalize font-medium">{level}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateThreatLevels(level, count - 1)}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-white font-bold w-8 text-center">{count}</span>
                      <button
                        onClick={() => updateThreatLevels(level, count + 1)}
                        className="w-6 h-6 bg-slate-600 hover:bg-slate-500 rounded flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Intelligence Source Controls */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Network className="w-5 h-5 text-green-400" />
                <span>Intelligence Sources</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(intelligenceSources).map(([source, enabled]) => (
                  <div key={source} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-white capitalize font-medium">{source.replace('_', ' ')}</span>
                    <button
                      onClick={() => toggleIntelligenceSource(source)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        enabled ? 'bg-emerald-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Global Threat Map and Analysis Modes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Analysis Mode Controls */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Brain className="w-5 h-5 text-blue-400" />
                <span>Analysis Modes</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(analysisMode).map(([mode, enabled]) => (
                  <div key={mode} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-white capitalize font-medium">{mode} Analysis</span>
                    <button
                      onClick={() => toggleAnalysisMode(mode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        enabled ? 'bg-green-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Actions */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span>Quick Intelligence Actions</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 border border-emerald-500/30 rounded-lg transition-all duration-200">
                  <ScanLine className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                  <div className="text-xs text-white font-medium">Deep Scan</div>
                </button>
                <button className="p-3 bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 border border-green-500/30 rounded-lg transition-all duration-200">
                  <Microscope className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <div className="text-xs text-white font-medium">Forensic Analysis</div>
                </button>
                <button className="p-3 bg-gradient-to-r from-teal-500/20 to-blue-500/20 hover:from-teal-500/30 hover:to-blue-500/30 border border-teal-500/30 rounded-lg transition-all duration-200">
                  <Target className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                  <div className="text-xs text-white font-medium">Target Intelligence</div>
                </button>
                <button className="p-3 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/30 rounded-lg transition-all duration-200">
                  <Share2 className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-xs text-white font-medium">Share Intel</div>
                </button>
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Global Threats Tab */}
      {selectedView === 'threats' && intelligenceData && (
        <div className="space-y-6">
          {intelligenceData.globalThreats.map((threat, index) => (
            <motion.div
              key={threat.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className={`w-8 h-8 ${
                      threat.severity === 'critical' ? 'text-red-400' : 'text-orange-400'
                    }`} />
                    <div>
                      <h3 className="text-xl font-bold text-white">{threat.name}</h3>
                      <p className="text-slate-400">{threat.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold mb-1 ${getSeverityColor(threat.severity).split(' ')[1]}`}>
                      {threat.severity.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-400">Confidence: {threat.confidence}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-lg font-bold text-emerald-400">{threat.affectedCountries}</div>
                    <div className="text-xs text-slate-400">Affected Countries</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-lg font-bold text-blue-400">{threat.activeIndicators}</div>
                    <div className="text-xs text-slate-400">Active Indicators</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className={`text-lg font-bold ${threat.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                      {threat.status}
                    </div>
                    <div className="text-xs text-slate-400">Status</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-sm font-bold text-slate-300">
                      {new Date(threat.lastSeen).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-slate-400">Last Seen</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-slate-400 mb-2">Attribution:</div>
                  <div className="text-white font-medium">{threat.attribution}</div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors">
                    Track Threat
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                    Block Indicators
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Intelligence Feeds Tab */}
      {selectedView === 'feeds' && intelligenceData && (
        <div className="space-y-6">
          {/* Feed Status Controls */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
              <Globe className="w-5 h-5 text-emerald-400" />
              <span>Intelligence Feed Controls</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.entries(feedStatus).map(([feed, status]) => (
                <div key={feed} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      status === 'active' || status === 'scanning' ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <span className="text-white capitalize font-medium">{feed}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => toggleFeedStatus(feed, status === 'active' ? 'inactive' : 'active')}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                        status === 'active' || status === 'scanning'
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      }`}
                    >
                      {status === 'active' || status === 'scanning' ? 'Active' : 'Inactive'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Feed Performance */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {intelligenceData.intelligenceFeeds.map((feed, index) => (
              <motion.div
                key={feed.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-emerald-500/20 rounded-lg">
                      <Database className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      feed.status === 'active' ? 'bg-green-500/20 text-green-400' :
                      feed.status === 'scanning' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {feed.status}
                    </span>
                  </div>
                  <div className="text-lg font-bold text-white mb-1">{feed.name}</div>
                  <div className="text-sm text-slate-400 mb-3">{feed.type}</div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Pulses:</span>
                      <span className="text-emerald-400 font-medium">{feed.pulses}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Reliability:</span>
                      <span className={`font-medium ${getConfidenceColor(feed.reliability)}`}>
                        {feed.reliability}%
                      </span>
                    </div>
                    <div className="text-xs text-slate-500 mt-2">
                      Last Update: {new Date(feed.lastUpdate).toLocaleString()}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {selectedView === 'analysis' && intelligenceData && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Threat Predictions */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Brain className="w-5 h-5 text-purple-400" />
                <span>AI Threat Predictions</span>
              </h3>
              <div className="space-y-4">
                {intelligenceData.predictions.map((prediction, index) => (
                  <div key={prediction.id} className="p-4 bg-slate-800/50 rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="text-sm font-medium text-white">{prediction.type}</h4>
                      <span className={`px-2 py-1 rounded text-xs ${
                        prediction.probability > 70 ? 'bg-red-500/20 text-red-400' :
                        prediction.probability > 50 ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {prediction.probability}% likely
                      </span>
                    </div>
                    <p className="text-slate-400 text-xs mb-2">{prediction.description}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Timeframe: {prediction.timeframe}</span>
                      <span className="text-blue-400">Confidence: {prediction.confidence}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Analysis Tools */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Microscope className="w-5 h-5 text-green-400" />
                <span>Analysis Tools</span>
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-4 bg-gradient-to-r from-emerald-500/20 to-green-500/20 hover:from-emerald-500/30 hover:to-green-500/30 border border-emerald-500/30 rounded-lg transition-all duration-200">
                  <TestTube className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
                  <div className="text-white font-medium text-sm">Malware Analysis</div>
                  <div className="text-xs text-slate-400">Behavioral analysis</div>
                </button>
                <button className="p-4 bg-gradient-to-r from-green-500/20 to-teal-500/20 hover:from-green-500/30 hover:to-teal-500/30 border border-green-500/30 rounded-lg transition-all duration-200">
                  <TestTube2 className="w-6 h-6 text-green-400 mx-auto mb-2" />
                  <div className="text-white font-medium text-sm">Pattern Recognition</div>
                  <div className="text-xs text-slate-400">AI-powered detection</div>
                </button>
                <button className="p-4 bg-gradient-to-r from-teal-500/20 to-blue-500/20 hover:from-teal-500/30 hover:to-blue-500/30 border border-teal-500/30 rounded-lg transition-all duration-200">
                  <Atom className="w-6 h-6 text-teal-400 mx-auto mb-2" />
                  <div className="text-white font-medium text-sm">Correlation Engine</div>
                  <div className="text-xs text-slate-400">Cross-source linking</div>
                </button>
                <button className="p-4 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 hover:from-blue-500/30 hover:to-indigo-500/30 border border-blue-500/30 rounded-lg transition-all duration-200">
                  <Dna className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-white font-medium text-sm">DNA Matching</div>
                  <div className="text-xs text-slate-400">Signature analysis</div>
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Attribution Tab */}
      {selectedView === 'attribution' && intelligenceData && (
        <div className="space-y-6">
          {intelligenceData.attribution.map((actor, index) => (
            <motion.div
              key={actor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Target className="w-8 h-8 text-red-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{actor.actor}</h3>
                      <p className="text-slate-400">{actor.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold mb-1 ${getConfidenceColor(actor.confidence)}`}>
                      {actor.confidence}% Confidence
                    </div>
                    <div className="text-xs text-slate-400">Last Activity: {new Date(actor.lastActivity).toLocaleDateString()}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-lg font-bold text-emerald-400">{actor.campaigns}</div>
                    <div className="text-xs text-slate-400">Active Campaigns</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-lg font-bold text-blue-400">{actor.techniques.length}</div>
                    <div className="text-xs text-slate-400">Known Techniques</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-lg font-bold text-purple-400">{actor.region}</div>
                    <div className="text-xs text-slate-400">Primary Region</div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-sm text-slate-400 mb-2">Techniques:</div>
                  <div className="flex flex-wrap gap-2">
                    {actor.techniques.map((technique, idx) => (
                      <span key={idx} className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded">
                        {technique}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors">
                    View Profile
                  </button>
                  <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors">
                    Track Activity
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                    Block Operations
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default AdvancedThreatIntelligenceHub;
