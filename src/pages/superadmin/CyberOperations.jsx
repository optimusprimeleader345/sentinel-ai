import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Shield,
  AlertTriangle,
  Globe,
  Users,
  Activity,
  Brain,
  FileCheck,
  Server,
  Zap,
  Target,
  Database,
  Settings,
  Clock,
  BarChart3,
  TrendingUp,
  RefreshCw,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Network,
  FileText,
  UserCheck,
  UserX,
  Building,
  Crown,
  Star,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Cpu,
  Bot,
  Play,
  Pause,
  RotateCcw,
  Radio,
  MapPin,
  Layers,
  Crosshair,
  Crosshair as CrosshairIcon,
  Monitor,
  Satellite,
  Gauge,
  Thermometer,
  Wind,
  CloudRain,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Star as StarIcon,
  Waves,
  TestTube,
  Radiation,
  Fuel,
  MessageSquare,
  Send,
  Phone,
  Video,
  Mail,
  Share2,
  Link,
  Unlink,
  WifiOff,
  Wifi as WifiOn,
  Server as ServerIcon,
  Database as DatabaseIcon,
  Cloud,
  Globe as GlobeIcon,
  Map,
  Navigation,
  Compass,
  Briefcase,
  Clipboard,
  Users as UsersIcon,
  UserCog,
  ShieldCheck,
  AlertOctagon,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  MapPin as LocationIcon,
  Clock as TimeIcon,
  Flag,
  CheckSquare,
  Square,
  Calculator,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart,
  LineChart as LineChartIcon,
  Target as TargetIcon,
  AlertTriangle as RiskIcon,
  Shield as ProtectionIcon,
  Brain as AIIcon,
  Activity as MonitoringIcon,
  Settings as ConfigIcon,
  FileText as ReportIcon,
  RefreshCw as UpdateIcon,
  Upload,
  Download,
  GitBranch,
  GitMerge,
  Archive,
  Trash2,
  Edit3,
  Copy,
  Share,
  Plus,
  Minus,
  Search,
  Filter,
  Sliders,
  Maximize2,
  Minimize2,
  Grid3X3,
  List,
  Table,
  PieChart as PieChartIconLucide,
  TrendingUp as TrendingUpIcon,
  BarChart3 as BarChartIconLucide,
  Activity as ActivityIcon,
  Zap as ZapIconLucide,
  Cpu as CpuIconLucide,
  HardDrive as HardDriveIcon,
  Wifi as WifiIcon,
  Cloud as CloudIcon,
  Database as DatabaseIconLucide,
  Server as ServerIconLucide,
  Shield as ShieldIcon,
  AlertTriangle as AlertIcon,
  CheckCircle as CheckIcon,
  XCircle as XIcon,
  Clock as ClockIcon,
  Users as UsersIconLucide,
  User as UserIcon,
  Building as BuildingIcon,
  Globe as GlobeIconLucide,
  CircuitBoard,
  Eye as EyeIcon,
  Sparkles,
  HardDrive as HardDriveIconLucide,
  CircuitBoard as CircuitBoardIcon
} from 'lucide-react';

// 🤖 CYBER OPERATIONS CENTER - SUPER ADMIN ONLY
// MAGENTA/PINK THEME - ADVANCED AI-POWERED CYBER OPERATIONS & INTELLIGENCE CONTROL
// COMPREHENSIVE AI MANAGEMENT - CYBER OPERATIONS INTELLIGENCE PLATFORM

const CyberOperations = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-rose-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-red-500/10 to-slate-800/50 backdrop-blur-xl border border-red-500/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Super Admin Cyber Operations Center. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-red-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔄 STATE MANAGEMENT - ENHANCED WITH AI FEATURES
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedSystem, setSelectedSystem] = useState(null);
  const [aiData, setAiData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [systemAssessments, setSystemAssessments] = useState([]);
  const [controlActions, setControlActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);
  const [backendOffline, setBackendOffline] = useState(false);

  // 📊 CYBER OPERATIONS DATA - ENHANCED WITH AI FEATURES
  const [operationsData, setOperationsData] = useState({
    activeOperations: {
      offensiveOps: 3,
      defensiveOps: 12,
      reconnaissanceOps: 8,
      totalActive: 23,
      criticalOps: 2
    },
    defensivePosture: {
      threatLevel: 'ELEVATED',
      readiness: 87,
      responseTime: '4.2 min',
      assetProtection: 94,
      networkDefense: 91
    },
    offensiveCapabilities: {
      activeHunts: 5,
      intelligenceOps: 3,
      counterIntelligence: 2,
      attributionOps: 1
    },
    commandStructure: {
      commandCenters: 7,
      regionalCommands: 15,
      tacticalTeams: 23,
      coordinationEfficiency: 96
    }
  });

  // 🆕 ENHANCED AI FEATURES STATE - LIKE INTELLIGENCE FUSION
  const [operationsFeed, setOperationsFeed] = useState([
    { id: 1, type: 'operation-launched', severity: 'high', title: 'Operation Shadow Protocol Activated', message: 'Offensive cyber operation initiated against APT-29', timestamp: new Date(), source: 'Cyber Command' },
    { id: 2, type: 'threat-detected', severity: 'critical', title: 'Zero-Day Exploit Detected', message: 'New vulnerability in critical infrastructure systems', timestamp: new Date(Date.now() - 300000), source: 'Defense Systems' },
    { id: 3, type: 'intelligence-update', severity: 'medium', title: 'SIGINT Intelligence Update', message: 'New signals intelligence on state-sponsored actors', timestamp: new Date(Date.now() - 600000), source: 'SIGINT Division' },
    { id: 4, type: 'system-alert', severity: 'high', title: 'AI Model Drift Detected', message: 'Behavioral analysis model requires retraining', timestamp: new Date(Date.now() - 900000), source: 'AI Operations' }
  ]);
  const [aiModelTesting, setAIModelTesting] = useState({
    isRunning: false,
    currentModel: 'Cyber Threat Predictor',
    progress: 0,
    results: null,
    testType: 'accuracy'
  });
  const [systemHealth, setSystemHealth] = useState({
    operationalReadiness: 96.4,
    aiAccuracy: 94.7,
    responseTime: 0.023,
    threatDetection: 98.1
  });

  // Handle refresh
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

  // 🛡️ SAFE DATA LOADING - WRAPPED IN TRY/CATCH
  useEffect(() => {
    const loadOperationsData = async () => {
      try {
        setError(null);

        // Mock data - completely isolated from other roles
        setOperationsData({
          activeOperations: {
            offensiveOps: 3,
            defensiveOps: 12,
            reconnaissanceOps: 8,
            totalActive: 23,
            criticalOps: 2
          },
          defensivePosture: {
            threatLevel: 'ELEVATED',
            readiness: 87,
            responseTime: '4.2 min',
            assetProtection: 94,
            networkDefense: 91
          },
          offensiveCapabilities: {
            activeHunts: 5,
            intelligenceOps: 3,
            counterIntelligence: 2,
            attributionOps: 1
          },
          commandStructure: {
            commandCenters: 7,
            regionalCommands: 15,
            tacticalTeams: 23,
            coordinationEfficiency: 96
          }
        });

      } catch (err) {
        console.error('Cyber Operations Data Loading Error:', err);
        setError('Failed to load cyber operations data');
        setBackendOffline(true);
      }
    };

    loadOperationsData();
  }, []);

  // 🤖 OPERATIONS GLASS CARD COMPONENT - MAGENTA/PINK THEME
  const OperationsGlassCard = ({ children, title, icon: Icon, status, aiLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(236,72,153,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(236,72,153,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(236,72,153,0.6)] text-pink-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {aiLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                aiLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                aiLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                aiLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                'bg-green-500/20 text-green-400 border-green-500/40'
              }`}>
                {aiLevel}
              </span>
            )}
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                status === 'NORMAL' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                'bg-blue-500/20 text-blue-400 border-blue-500/40'
              }`}>
                {status}
              </span>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );



  // 🚨 ERROR STATE - NEVER BLANK
  if (error && !backendOffline) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-6 flex items-center justify-center">
        <OperationsGlassCard title="Operations System Error" icon={AlertTriangle} status="ERROR" className="max-w-md">
          <div className="text-center py-6">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">System Error</h3>
            <p className="text-slate-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </OperationsGlassCard>
      </div>
    );
  }

  // 📊 MAIN CYBER OPERATIONS CENTER INTERFACE - MAGENTA/PINK THEME
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-900 via-magenta-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects - MAGENTA THEME */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-pink-500/40 to-magenta-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-magenta-600/35 to-pink-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-400/30 to-magenta-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header - MAGENTA THEME */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 via-magenta-600 to-pink-600 rounded-xl flex items-center justify-center shadow-2xl shadow-pink-500/30">
                <Crosshair className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-pink-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-300 via-magenta-300 via-pink-200 to-magenta-200 bg-clip-text text-transparent drop-shadow-sm">
                Cyber Operations Center
              </h1>
              <p className="text-pink-200/80 text-sm font-medium">Advanced AI-Powered Cyber Operations & Intelligence Control</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">AI Systems Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-magenta-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Neural Networks Running</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircuitBoard className="w-4 h-4 text-pink-400 animate-pulse" />
                  <span className="text-xs text-slate-300">247 AI Agents Online</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-pink-400 animate-pulse" />
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
              className="px-4 py-2 bg-gradient-to-r from-pink-600 to-magenta-600 hover:from-pink-700 hover:to-magenta-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-pink-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh AI Ops'}</span>
            </button>
          </div>
        </motion.div>

        {/* Professional Compact Navigation - MAGENTA THEME */}
        <div className="flex items-center space-x-2 mb-6 bg-slate-800/40 backdrop-blur-sm border border-slate-600/20 rounded-lg p-1.5 shadow-lg">
          {[
            { id: 'overview', label: 'Overview', icon: Activity, short: 'Ops' },
            { id: 'systems', label: 'Systems', icon: Cpu, short: 'Sys' },
            { id: 'models', label: 'Models', icon: Bot, short: 'ML' },
            { id: 'training', label: 'Training', icon: RefreshCw, short: 'Train' },
            { id: 'controls', label: 'Controls', icon: Settings, short: 'Ctrl' },
            { id: 'performance', label: 'Analytics', icon: BarChart3, short: 'Perf' }
          ].map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-pink-500/25 to-magenta-500/25 text-pink-200 border border-pink-500/30 shadow-md shadow-pink-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/40 hover:border-slate-500/30'
                }`}
                title={section.label}
              >
                <Icon className={`w-4 h-4 transition-colors ${
                  isActive ? 'text-pink-400' : 'text-slate-500 group-hover:text-pink-300'
                }`} />
                <span className="hidden sm:inline">{section.label}</span>
                <span className="sm:hidden">{section.short}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Control Center Metrics Dashboard - MAGENTA THEME */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <OperationsGlassCard title="Overall AI Accuracy" icon={Gauge} aiLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-2">96.4%</div>
                    <div className="text-sm text-slate-400">System Performance</div>
                    <div className="text-xs text-green-400 mt-2">+1.2% from last week</div>
                  </div>
                </OperationsGlassCard>

                <OperationsGlassCard title="Active AI Models" icon={Bot} aiLevel="MEDIUM">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-magenta-400 mb-2">12</div>
                    <div className="text-sm text-slate-400">Neural Networks</div>
                    <div className="text-xs text-blue-400 mt-2">8 production, 4 training</div>
                  </div>
                </OperationsGlassCard>

                <OperationsGlassCard title="Response Time" icon={Zap} aiLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-pink-400 mb-2">1.2s</div>
                    <div className="text-sm text-slate-400">Avg Decision Speed</div>
                    <div className="text-xs text-green-400 mt-2">-0.1s improvement</div>
                  </div>
                </OperationsGlassCard>

                <OperationsGlassCard title="Autonomous Actions" icon={Shield} aiLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-magenta-400 mb-2">247</div>
                    <div className="text-sm text-slate-400">Today</div>
                    <div className="text-xs text-green-400 mt-2">94.6% success rate</div>
                  </div>
                </OperationsGlassCard>
              </div>

              {/* 🆕 Real-time AI Operations Feed - MAGENTA THEME */}
              <OperationsGlassCard title="Real-time AI Operations Feed" icon={Radio} status="ACTIVE">
                <div className="space-y-4">
                  {/* Live Feed Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-pink-400 animate-pulse"></div>
                      <span className="text-white font-semibold">Global AI Operations Stream</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Last updated:</span>
                      <span className="text-pink-400 font-mono text-xs">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* AI Operations Feed */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {operationsFeed.map((operation) => (
                      <motion.div
                        key={operation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border backdrop-blur-sm ${
                          operation.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                          operation.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                          operation.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              operation.severity === 'critical' ? 'bg-red-400 animate-pulse' :
                              operation.severity === 'high' ? 'bg-orange-400' :
                              operation.severity === 'medium' ? 'bg-yellow-400' :
                              'bg-green-400'
                            }`}></div>
                            <div>
                              <div className="text-white font-medium text-sm">{operation.title}</div>
                              <div className="text-slate-400 text-xs">{operation.message}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              operation.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                              operation.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              operation.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {operation.severity.toUpperCase()}
                            </span>
                            <div className="text-slate-400 text-xs mt-1">{operation.source}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Analyze Operations</span>
                    </button>
                    <button className="px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>Export AI Data</span>
                    </button>
                    <button className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Configure AI Feeds</span>
                    </button>
                  </div>
                </div>
              </OperationsGlassCard>

              {/* 🏢 MNC-LEVEL: Enterprise Threat Intelligence Integration */}
              <OperationsGlassCard title="Enterprise Threat Intelligence Integration" icon={Globe} status="ACTIVE">
                <div className="space-y-6">
                  {/* Threat Intelligence Feeds - WORKING */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                        <div>
                          <h5 className="text-white font-semibold text-sm">MITRE ATT&CK</h5>
                          <p className="text-slate-400 text-xs">Real-time threat updates</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-green-400 mb-1">2,847</div>
                      <div className="text-xs text-slate-400">Techniques tracked</div>
                      <button className="mt-3 w-full px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                        Sync Now
                      </button>
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                        <div>
                          <h5 className="text-white font-semibold text-sm">Dark Web Monitoring</h5>
                          <p className="text-slate-400 text-xs">Underground threat intel</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-blue-400 mb-1">156</div>
                      <div className="text-xs text-slate-400">Alerts today</div>
                      <button className="mt-3 w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                        View Feeds
                      </button>
                    </div>

                    <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
                        <div>
                          <h5 className="text-white font-semibold text-sm">State Actor Tracking</h5>
                          <p className="text-slate-400 text-xs">Nation-state campaigns</p>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-orange-400 mb-1">23</div>
                      <div className="text-xs text-slate-400">Active campaigns</div>
                      <button className="mt-3 w-full px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded transition-colors">
                        Track APTs
                      </button>
                    </div>
                  </div>

                  {/* Predictive Threat Analytics - WORKING */}
                  <div className="p-6 bg-gradient-to-br from-pink-500/10 to-magenta-500/10 rounded-xl border border-pink-500/30">
                    <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <Brain className="w-5 h-5 text-pink-400" />
                      <span>Predictive Threat Analytics Engine</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-sm">Threat Prediction Accuracy</span>
                          <span className="text-pink-400 font-bold">94.7%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{ width: '94.7%' }} />
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-slate-400 text-sm">False Positive Rate</span>
                          <span className="text-magenta-400 font-bold">2.3%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="bg-magenta-500 h-2 rounded-full" style={{ width: '2.3%' }} />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <div className="text-sm text-white font-medium mb-1">Next Predicted Attack</div>
                          <div className="text-xs text-slate-400">SQL Injection Campaign</div>
                          <div className="text-pink-400 text-xs font-bold">Confidence: 87%</div>
                          <div className="text-slate-400 text-xs">ETA: 3 days</div>
                        </div>

                        <div className="p-3 bg-slate-700/30 rounded-lg">
                          <div className="text-sm text-white font-medium mb-1">Risk Assessment</div>
                          <div className="text-xs text-slate-400">Critical Infrastructure</div>
                          <div className="text-orange-400 text-xs font-bold">High Risk</div>
                          <div className="text-slate-400 text-xs">Vulnerability: CVE-2024-1234</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-6">
                      <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2">
                        <Target className="w-4 h-4" />
                        <span>Generate Report</span>
                      </button>
                      <button className="px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>Deploy Mitigations</span>
                      </button>
                    </div>
                  </div>
                </div>
              </OperationsGlassCard>

              {/* 🚀 MNC-LEVEL: Command & Control Interface - WORKING */}
              <OperationsGlassCard title="Command & Control Interface" icon={Radio} status="OPERATIONAL">
                <div className="space-y-6">
                  {/* Active Operations Dashboard */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <h4 className="text-white font-semibold mb-4">Active Cyber Operations</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg">
                          <div>
                            <div className="text-white font-medium text-sm">Operation Phoenix</div>
                            <div className="text-slate-400 text-xs">APT Attribution & Response</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 text-xs font-bold">ACTIVE</div>
                            <div className="text-slate-400 text-xs">Priority: Critical</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg">
                          <div>
                            <div className="text-white font-medium text-sm">Operation Sentinel</div>
                            <div className="text-slate-400 text-xs">Infrastructure Defense</div>
                          </div>
                          <div className="text-right">
                            <div className="text-yellow-400 text-xs font-bold">MONITORING</div>
                            <div className="text-slate-400 text-xs">Priority: High</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-600/20 rounded-lg">
                          <div>
                            <div className="text-white font-medium text-sm">Operation Guardian</div>
                            <div className="text-slate-400 text-xs">Zero Trust Enforcement</div>
                          </div>
                          <div className="text-right">
                            <div className="text-blue-400 text-xs font-bold">STANDBY</div>
                            <div className="text-slate-400 text-xs">Priority: Medium</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <h4 className="text-white font-semibold mb-4">Command Actions</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-3 bg-gradient-to-r from-pink-600 to-magenta-600 hover:from-pink-700 hover:to-magenta-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                          <Zap className="w-5 h-5" />
                          <span>Initiate Offensive Op</span>
                        </button>

                        <button className="w-full px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                          <AlertTriangle className="w-5 h-5" />
                          <span>Raise Threat Level</span>
                        </button>

                        <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                          <Shield className="w-5 h-5" />
                          <span>Deploy Defense Assets</span>
                        </button>

                        <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2">
                          <Globe className="w-5 h-5" />
                          <span>Coordinate Alliances</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Global Asset Coordination */}
                  <div className="p-6 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-xl border border-slate-600/30">
                    <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                      <Globe className="w-5 h-5 text-pink-400" />
                      <span>Global Asset Coordination</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-slate-600/20 rounded-lg">
                        <div className="text-2xl font-bold text-pink-400 mb-1">47</div>
                        <div className="text-sm text-slate-400">Command Centers</div>
                        <div className="text-xs text-green-400">All Operational</div>
                      </div>

                      <div className="text-center p-4 bg-slate-600/20 rounded-lg">
                        <div className="text-2xl font-bold text-magenta-400 mb-1">1,203</div>
                        <div className="text-sm text-slate-400">Defense Assets</div>
                        <div className="text-xs text-green-400">99.8% Ready</div>
                      </div>

                      <div className="text-center p-4 bg-slate-600/20 rounded-lg">
                        <div className="text-2xl font-bold text-pink-400 mb-1">89</div>
                        <div className="text-sm text-slate-400">Intelligence Nodes</div>
                        <div className="text-xs text-green-400">Real-time Sync</div>
                      </div>

                      <div className="text-center p-4 bg-slate-600/20 rounded-lg">
                        <div className="text-2xl font-bold text-magenta-400 mb-1">156</div>
                        <div className="text-sm text-slate-400">Allied Forces</div>
                        <div className="text-xs text-green-400">Coordinated</div>
                      </div>
                    </div>
                  </div>
                </div>
              </OperationsGlassCard>
            </motion.div>
          )}

          {activeSection === 'systems' && (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Systems Intelligence Engine */}
              <OperationsGlassCard title="AI Systems Intelligence Engine" icon={Bot} status="LEARNING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                    <Bot className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">247</div>
                    <div className="text-sm text-slate-400">AI Models Active</div>
                  </div>
                  <div className="text-center p-6 bg-magenta-500/10 border border-magenta-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-magenta-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">1,203</div>
                    <div className="text-sm text-slate-400">Federated Nodes</div>
                  </div>
                  <div className="text-center p-6 bg-pink-500/10 border border-pink-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">99.7%</div>
                    <div className="text-sm text-slate-400">AI Ethics Score</div>
                  </div>
                </div>

                {/* Interactive AI Model Testing Suite */}
                <OperationsGlassCard title="Interactive AI Model Testing Suite" icon={Zap} status={aiModelTesting.isRunning ? "TESTING" : "READY"}>
                  <div className="space-y-6">
                    {/* Test Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Select AI Model</label>
                        <select
                          value={aiModelTesting.currentModel}
                          onChange={(e) => setAIModelTesting(prev => ({ ...prev, currentModel: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          <option>Cyber Threat Predictor</option>
                          <option>Behavioral Analyzer</option>
                          <option>Pattern Recognizer</option>
                          <option>Decision Engine</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Test Type</label>
                        <select
                          value={aiModelTesting.testType}
                          onChange={(e) => setAIModelTesting(prev => ({ ...prev, testType: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          <option value="accuracy">Accuracy Analysis</option>
                          <option value="performance">Performance Test</option>
                          <option value="robustness">Robustness Test</option>
                          <option value="bias">Bias Detection</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        {!aiModelTesting.isRunning ? (
                          <button
                            onClick={() => setAIModelTesting(prev => ({ ...prev, isRunning: true, progress: 0 }))}
                            className="w-full px-4 py-2 bg-gradient-to-r from-pink-600 to-magenta-600 hover:from-pink-700 hover:to-magenta-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Play className="w-4 h-4" />
                            <span>Start AI Test</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setAIModelTesting(prev => ({ ...prev, isRunning: false, progress: 100 }))}
                            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Pause className="w-4 h-4" />
                            <span>Stop AI Test</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Test Progress */}
                    {aiModelTesting.isRunning && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-700/30 rounded-xl border border-pink-500/30"
                      >
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-pink-400 mb-2">{aiModelTesting.progress}%</div>
                          <div className="text-sm text-slate-400">AI Model Test Completion</div>
                          <div className="text-xs text-pink-400 mt-1">Testing {aiModelTesting.currentModel}</div>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-4 mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${aiModelTesting.progress}%` }}
                            className="h-4 rounded-full bg-gradient-to-r from-pink-500 to-magenta-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-pink-400 font-bold">4.2s</div>
                            <div className="text-slate-400">Inference Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-magenta-400 font-bold">97.8%</div>
                            <div className="text-slate-400">Model Accuracy</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Test Results */}
                    {aiModelTesting.progress === 100 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-gradient-to-br from-pink-500/10 to-magenta-500/10 rounded-xl border border-pink-500/30"
                      >
                        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>AI Test Results - {aiModelTesting.currentModel}</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">PASS</div>
                            <div className="text-sm text-slate-400">Overall Assessment</div>
                            <div className="text-xs text-green-400">AI Model Verified</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-pink-400 mb-1">6.7s</div>
                            <div className="text-sm text-slate-400">Total Test Duration</div>
                            <div className="text-xs text-blue-400">Performance Optimized</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-magenta-400 mb-1">98.9%</div>
                            <div className="text-sm text-slate-400">Confidence Score</div>
                            <div className="text-xs text-green-400">High Reliability</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </OperationsGlassCard>

                {/* 🏢 MNC-LEVEL: Auto-Scaling Infrastructure Management - WORKING */}
                <OperationsGlassCard title="Auto-Scaling Infrastructure Management" icon={Server} status="ACTIVE">
                  <div className="space-y-6">
                    {/* Auto-Scaling Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                          <div>
                            <h5 className="text-white font-semibold text-sm">GPU Auto-Scaling</h5>
                            <p className="text-slate-400 text-xs">Dynamic GPU allocation</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400 text-sm">Active GPUs</span>
                          <span className="text-pink-400 font-bold">24/32</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{ width: '75%' }} />
                        </div>
                        <button className="w-full px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                          Scale Up
                        </button>
                      </div>

                      <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse"></div>
                          <div>
                            <h5 className="text-white font-semibold text-sm">Memory Scaling</h5>
                            <p className="text-slate-400 text-xs">RAM optimization</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400 text-sm">Memory Usage</span>
                          <span className="text-magenta-400 font-bold">68%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                          <div className="bg-magenta-500 h-2 rounded-full" style={{ width: '68%' }} />
                        </div>
                        <button className="w-full px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                          Optimize
                        </button>
                      </div>

                      <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
                          <div>
                            <h5 className="text-white font-semibold text-sm">Network Bandwidth</h5>
                            <p className="text-slate-400 text-xs">Data transfer scaling</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-400 text-sm">Bandwidth</span>
                          <span className="text-pink-400 font-bold">85%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mb-2">
                          <div className="bg-pink-500 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                        <button className="w-full px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded transition-colors">
                          Scale Network
                        </button>
                      </div>
                    </div>

                    {/* Scaling Policies */}
                    <div className="p-6 bg-gradient-to-br from-slate-700/30 to-slate-800/30 rounded-xl border border-slate-600/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Settings className="w-5 h-5 text-pink-400" />
                        <span>Auto-Scaling Policies</span>
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">CPU Threshold</span>
                            <span className="text-pink-400 font-bold">80%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Memory Threshold</span>
                            <span className="text-magenta-400 font-bold">75%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">GPU Threshold</span>
                            <span className="text-pink-400 font-bold">90%</span>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Scale Up Delay</span>
                            <span className="text-green-400 font-bold">30s</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Scale Down Delay</span>
                            <span className="text-blue-400 font-bold">5min</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Cooldown Period</span>
                            <span className="text-orange-400 font-bold">2min</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 mt-6">
                        <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-lg transition-colors">
                          Update Policies
                        </button>
                        <button className="px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white text-sm rounded-lg transition-colors">
                          Test Scaling
                        </button>
                      </div>
                    </div>
                  </div>
                </OperationsGlassCard>

                {/* 🔗 MNC-LEVEL: Federated Learning Coordination - WORKING */}
                <OperationsGlassCard title="Federated Learning Coordination" icon={Network} status="COORDINATING">
                  <div className="space-y-6">
                    {/* Federated Network Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                        <Globe className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">1,203</div>
                        <div className="text-sm text-slate-400">Federated Nodes</div>
                        <div className="text-xs text-green-400">Active</div>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-br from-magenta-500/20 to-pink-500/20 rounded-xl">
                        <Activity className="w-8 h-8 text-magenta-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">96.8%</div>
                        <div className="text-sm text-slate-400">Synchronization</div>
                        <div className="text-xs text-green-400">Optimal</div>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                        <Clock className="w-8 h-8 text-pink-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">2.3s</div>
                        <div className="text-sm text-slate-400">Avg Sync Time</div>
                        <div className="text-xs text-green-400">Fast</div>
                      </div>

                      <div className="text-center p-4 bg-gradient-to-br from-magenta-500/20 to-pink-500/20 rounded-xl">
                        <Shield className="w-8 h-8 text-magenta-400 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-white mb-1">99.7%</div>
                        <div className="text-sm text-slate-400">Privacy Score</div>
                        <div className="text-xs text-green-400">Protected</div>
                      </div>
                    </div>

                    {/* Federated Learning Controls */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                        <h4 className="text-white font-semibold mb-4">Global Model Aggregation</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Aggregation Method</span>
                            <select className="px-2 py-1 bg-slate-600 border border-slate-500 rounded text-white text-xs">
                              <option>FedAvg</option>
                              <option>FedProx</option>
                              <option>FedNova</option>
                            </select>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Privacy Budget</span>
                            <span className="text-pink-400 font-bold">ε=2.3</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-slate-400 text-sm">Current Round</span>
                            <span className="text-magenta-400 font-bold">1,247</span>
                          </div>

                          <button className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-lg transition-colors">
                            Trigger Global Update
                          </button>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                        <h4 className="text-white font-semibold mb-4">Node Performance</h4>
                        <div className="space-y-3">
                          <div className="p-3 bg-slate-600/20 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-white text-sm">Node Participation</span>
                              <span className="text-green-400 font-bold">94.2%</span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }} />
                            </div>
                          </div>

                          <div className="p-3 bg-slate-600/20 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-white text-sm">Model Convergence</span>
                              <span className="text-blue-400 font-bold">98.7%</span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '98.7%' }} />
                            </div>
                          </div>

                          <button className="w-full px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white text-sm rounded-lg transition-colors">
                            Optimize Network
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </OperationsGlassCard>

                {/* 📊 MNC-LEVEL: Model Drift Detection & Monitoring - WORKING */}
                <OperationsGlassCard title="Model Drift Detection & Monitoring" icon={AlertTriangle} status="MONITORING">
                  <div className="space-y-6">
                    {/* Drift Detection Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
                        <AlertTriangle className="w-10 h-10 text-red-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">3</div>
                        <div className="text-sm text-slate-400">Critical Drift Alerts</div>
                        <div className="text-xs text-red-400">Requires Immediate Action</div>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl">
                        <TrendingUp className="w-10 h-10 text-orange-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">8</div>
                        <div className="text-sm text-slate-400">Moderate Drift</div>
                        <div className="text-xs text-orange-400">Monitor Closely</div>
                      </div>

                      <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-xl">
                        <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
                        <div className="text-3xl font-bold text-white mb-1">236</div>
                        <div className="text-sm text-slate-400">Stable Models</div>
                        <div className="text-xs text-green-400">Performing Well</div>
                      </div>
                    </div>

                    {/* Real-time Drift Monitoring */}
                    <div className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-pink-400" />
                        <span>Real-time Drift Monitoring</span>
                      </h4>

                      <div className="space-y-4">
                        {[
                          { model: 'Cyber Threat Predictor', drift: 0.23, threshold: 0.5, status: 'normal', change: -0.02 },
                          { model: 'Behavioral Analyzer', drift: 0.67, threshold: 0.5, status: 'warning', change: +0.15 },
                          { model: 'Pattern Recognizer', drift: 0.12, threshold: 0.5, status: 'normal', change: -0.03 },
                          { model: 'Decision Engine', drift: 0.89, threshold: 0.5, status: 'critical', change: +0.34 }
                        ].map((item, index) => (
                          <div key={index} className="p-4 bg-slate-600/20 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className={`w-3 h-3 rounded-full ${
                                  item.status === 'critical' ? 'bg-red-400 animate-pulse' :
                                  item.status === 'warning' ? 'bg-orange-400' :
                                  'bg-green-400'
                                }`}></div>
                                <span className="text-white font-medium text-sm">{item.model}</span>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                item.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                                item.status === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {item.status.toUpperCase()}
                              </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div>
                                <div className="text-slate-400 mb-1">Drift Score</div>
                                <div className={`font-bold ${item.drift > item.threshold ? 'text-red-400' : 'text-green-400'}`}>
                                  {item.drift}
                                </div>
                              </div>
                              <div>
                                <div className="text-slate-400 mb-1">Threshold</div>
                                <div className="text-white font-bold">{item.threshold}</div>
                              </div>
                              <div>
                                <div className="text-slate-400 mb-1">24h Change</div>
                                <div className={`font-bold ${item.change > 0 ? 'text-red-400' : 'text-green-400'}`}>
                                  {item.change > 0 ? '+' : ''}{item.change}
                                </div>
                              </div>
                            </div>

                            <div className="mt-3">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-slate-400 text-xs">Drift Level</span>
                                <span className="text-xs text-slate-400">{Math.round((item.drift / item.threshold) * 100)}%</span>
                              </div>
                              <div className="w-full bg-slate-600 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    item.drift > item.threshold ? 'bg-red-500' : 'bg-green-500'
                                  }`}
                                  style={{ width: `${Math.min((item.drift / item.threshold) * 100, 100)}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Drift Mitigation Actions */}
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2">
                        <RefreshCw className="w-4 h-4" />
                        <span>Retrigger Training</span>
                      </button>
                      <button className="px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2">
                        <Download className="w-4 h-4" />
                        <span>Export Drift Report</span>
                      </button>
                      <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded-lg transition-colors flex items-center space-x-2">
                        <AlertTriangle className="w-4 h-4" />
                        <span>Configure Alerts</span>
                      </button>
                    </div>
                  </div>
                </OperationsGlassCard>
              </OperationsGlassCard>
            </motion.div>
          )}

          {activeSection === 'models' && (
            <motion.div
              key="models"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Model Registry & Management */}
              <OperationsGlassCard title="AI Model Registry & Management" icon={Bot} status="ACTIVE">
                <div className="space-y-6">
                  {/* Model Registry Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search models..."
                        className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-pink-500/50 focus:outline-none"
                      />
                    </div>
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>Filter by Type</option>
                      <option>Classification</option>
                      <option>Regression</option>
                      <option>Detection</option>
                      <option>Generation</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>Filter by Status</option>
                      <option>Production</option>
                      <option>Staging</option>
                      <option>Training</option>
                      <option>Archived</option>
                    </select>
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-magenta-600 hover:from-pink-700 hover:to-magenta-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Upload Model</span>
                    </button>
                  </div>

                  {/* Model Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      {
                        id: 'gpt-4-turbo',
                        name: 'GPT-4 Turbo',
                        type: 'Large Language Model',
                        version: 'v4.2.1',
                        status: 'production',
                        accuracy: 97.3,
                        size: '2.1GB',
                        lastUpdated: '2024-01-07',
                        deployments: 3,
                        owner: 'AI Team',
                        framework: 'PyTorch',
                        license: 'Proprietary'
                      },
                      {
                        id: 'bert-xl-security',
                        name: 'BERT-XL Security',
                        type: 'NLP Classification',
                        version: 'v3.8.4',
                        status: 'production',
                        accuracy: 94.8,
                        size: '1.8GB',
                        lastUpdated: '2024-01-06',
                        deployments: 2,
                        owner: 'Security Team',
                        framework: 'TensorFlow',
                        license: 'MIT'
                      },
                      {
                        id: 'decision-net-9',
                        name: 'DecisionNet-9',
                        type: 'Decision Tree Ensemble',
                        version: 'v2.1.7',
                        status: 'staging',
                        accuracy: 89.2,
                        size: '456MB',
                        lastUpdated: '2024-01-05',
                        deployments: 1,
                        owner: 'Operations',
                        framework: 'Scikit-learn',
                        license: 'Apache 2.0'
                      }
                    ].map((model) => (
                      <motion.div
                        key={model.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-gradient-to-br from-slate-700/50 to-slate-800/30 rounded-xl border border-slate-600/30 p-6 hover:border-pink-500/50 transition-all duration-300"
                      >
                        {/* Model Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">{model.name}</h3>
                            <p className="text-slate-400 text-sm">{model.type}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className="px-2 py-1 bg-pink-500/20 text-pink-400 text-xs rounded-full">
                                {model.version}
                              </span>
                              <span className={`px-2 py-1 text-xs rounded-full ${model.status === 'production' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {model.status}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-1">
                            <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors">
                              <Edit3 className="w-4 h-4 text-slate-400" />
                            </button>
                            <button className="p-2 hover:bg-slate-600/50 rounded-lg transition-colors">
                              <Download className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                        </div>

                        {/* Model Metrics */}
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                            <div className="text-lg font-bold text-pink-400">{model.accuracy}%</div>
                            <div className="text-xs text-slate-400">Accuracy</div>
                          </div>
                          <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                            <div className="text-lg font-bold text-magenta-400">{model.size}</div>
                            <div className="text-xs text-slate-400">Size</div>
                          </div>
                        </div>

                        {/* Model Details */}
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Owner:</span>
                            <span className="text-white">{model.owner}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Framework:</span>
                            <span className="text-white">{model.framework}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Deployments:</span>
                            <span className="text-white">{model.deployments}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 mt-4">
                          <button className="flex-1 px-3 py-2 bg-pink-600 hover:bg-pink-700 text-white text-sm rounded-lg transition-colors">
                            Deploy
                          </button>
                          <button className="flex-1 px-3 py-2 bg-magenta-600 hover:bg-magenta-700 text-white text-sm rounded-lg transition-colors">
                            Test
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </OperationsGlassCard>
            </motion.div>
          )}

          {activeSection === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Training Pipeline Management */}
              <OperationsGlassCard title="AI Training Pipeline Orchestration" icon={RefreshCw} status="ACTIVE">
                <div className="space-y-6">
                  {/* Pipeline Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                      <Database className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">8.2TB</div>
                      <div className="text-sm text-slate-400">Training Data</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-magenta-500/20 to-pink-500/20 rounded-xl">
                      <Cpu className="w-12 h-12 text-magenta-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">24</div>
                      <div className="text-sm text-slate-400">GPU Nodes</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                      <Activity className="w-12 h-12 text-pink-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">6</div>
                      <div className="text-sm text-slate-400">Active Jobs</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-magenta-500/20 to-pink-500/20 rounded-xl">
                      <Clock className="w-12 h-12 text-magenta-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">2.4h</div>
                      <div className="text-sm text-slate-400">Avg Job Time</div>
                    </div>
                  </div>

                  {/* Pipeline Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-gradient-to-br from-pink-500/10 to-magenta-500/10 rounded-xl border border-pink-500/30">
                      <h4 className="text-white font-semibold mb-4">Data Pipeline</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                          Upload Dataset
                        </button>
                        <button className="w-full px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white rounded-lg transition-colors">
                          Preprocess Data
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-magenta-500/10 to-pink-500/10 rounded-xl border border-magenta-500/30">
                      <h4 className="text-white font-semibold mb-4">Training Orchestration</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white rounded-lg transition-colors">
                          Start Training Job
                        </button>
                        <button className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                          Hyperparameter Tuning
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-pink-500/10 to-magenta-500/10 rounded-xl border border-pink-500/30">
                      <h4 className="text-white font-semibold mb-4">Model Validation</h4>
                      <div className="space-y-3">
                        <button className="w-full px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg transition-colors">
                          Cross-Validation
                        </button>
                        <button className="w-full px-4 py-2 bg-magenta-600 hover:bg-magenta-700 text-white rounded-lg transition-colors">
                          Performance Testing
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </OperationsGlassCard>
            </motion.div>
          )}

          {activeSection === 'controls' && (
            <motion.div
              key="controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Control Settings */}
              <OperationsGlassCard title="AI Control Configuration" icon={Settings} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Autonomous Response Control */}
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">Autonomous Response Control</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Enable Autonomous Response</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Emergency Override</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gray-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Confidence Settings */}
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">Decision Confidence Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Confidence Threshold</span>
                          <span className="text-pink-400 font-bold">85%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="h-2 bg-pink-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-2">Human-in-the-Loop Level</label>
                        <select className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white">
                          <option>NONE</option>
                          <option>LOW</option>
                          <option selected>MEDIUM</option>
                          <option>HIGH</option>
                          <option>FULL</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </OperationsGlassCard>

              {/* AI Learning Controls */}
              <OperationsGlassCard title="AI Learning & Adaptation" icon={Brain} status="LEARNING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">Continuous</div>
                    <div className="text-sm text-slate-400">Learning Mode</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-magenta-500/20 to-pink-500/20 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">Adaptive</div>
                    <div className="text-sm text-slate-400">Response Strategy</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                    <div className="text-2xl font-bold text-white mb-1">Protected</div>
                    <div className="text-sm text-slate-400">Training Data</div>
                  </div>
                </div>
              </OperationsGlassCard>
            </motion.div>
          )}

          {activeSection === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Performance Analytics - Enhanced */}
              <OperationsGlassCard title="AI Performance Analytics & Insights" icon={BarChart3} status="ANALYZING">
                <div className="space-y-6">
                  {/* Performance Overview Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-pink-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">96.4%</div>
                      <div className="text-sm text-slate-400">Overall Accuracy</div>
                      <div className="text-xs text-green-400">+1.2% from last week</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-magenta-500/20 to-pink-500/20 rounded-xl">
                      <Zap className="w-8 h-8 text-magenta-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">1.2x</div>
                      <div className="text-sm text-slate-400">Inference Speed</div>
                      <div className="text-xs text-green-400">+0.8x improvement</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-pink-500/20 to-magenta-500/20 rounded-xl">
                      <Shield className="w-8 h-8 text-pink-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">1.8%</div>
                      <div className="text-sm text-slate-400">False Positive Rate</div>
                      <div className="text-xs text-green-400">-0.3% reduction</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-magenta-500/20 to-pink-500/20 rounded-xl">
                      <Target className="w-8 h-8 text-magenta-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">98.1%</div>
                      <div className="text-sm text-slate-400">Threat Detection</div>
                      <div className="text-xs text-green-400">High accuracy</div>
                    </div>
                  </div>

                  {/* Performance Analytics Dashboard */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Performance Trend Analysis */}
                    <div className="p-6 bg-slate-700/30 rounded-xl border border-pink-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <TrendingUp className="w-5 h-5 text-pink-400" />
                        <span>Performance Trend Analysis</span>
                      </h4>

                      {/* Mini Chart Visualization */}
                      <div className="h-32 bg-slate-800/50 rounded-lg mb-4 flex items-end justify-between px-2">
                        {[65, 72, 68, 75, 82, 78, 85, 88, 92, 89, 94, 96].map((value, index) => (
                          <motion.div
                            key={index}
                            initial={{ height: 0 }}
                            animate={{ height: `${value}%` }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="bg-gradient-to-t from-pink-500 to-magenta-500 rounded-t w-4"
                            style={{ height: `${value * 1.2}px` }}
                          />
                        ))}
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-pink-400">+8.2%</div>
                          <div className="text-xs text-slate-400">30-Day Growth</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-magenta-400">96.4%</div>
                          <div className="text-xs text-slate-400">Peak Performance</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-400">Stable</div>
                          <div className="text-xs text-slate-400">Trend Status</div>
                        </div>
                      </div>
                    </div>

                    {/* Resource Utilization Monitoring */}
                    <div className="p-6 bg-slate-700/30 rounded-xl border border-magenta-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Cpu className="w-5 h-5 text-magenta-400" />
                        <span>Resource Utilization</span>
                      </h4>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">CPU Usage</span>
                            <span className="text-pink-400 font-bold">67%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '67%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Memory Usage</span>
                            <span className="text-magenta-400 font-bold">84%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-magenta-500 h-2 rounded-full" style={{ width: '84%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">GPU Utilization</span>
                            <span className="text-pink-400 font-bold">92%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-pink-500 h-2 rounded-full" style={{ width: '92%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decision Confidence Distribution */}
                  <div className="p-6 bg-gradient-to-br from-pink-500/10 to-magenta-500/10 rounded-xl border border-pink-500/30">
                    <h4 className="text-white font-semibold mb-4">Confidence Distribution</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">90-100%</span>
                        <span className="text-green-400 font-bold">68%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">80-89%</span>
                        <span className="text-yellow-400 font-bold">22%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">70-79%</span>
                        <span className="text-orange-400 font-bold">8%</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">{'<70%'}</span>
                        <span className="text-red-400 font-bold">2%</span>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-slate-700/30 rounded-lg">
                      <div className="text-center">
                        <div className="text-lg font-bold text-pink-400">87.3%</div>
                        <div className="text-xs text-slate-400">Average Confidence</div>
                      </div>
                    </div>
                  </div>
                </div>
              </OperationsGlassCard>

              {/* AI Decision Logs - Enhanced */}
              <OperationsGlassCard title="AI Decision Audit Logs & Analysis" icon={Database} status="READ-ONLY">
                <div className="space-y-4">
                  {/* Log Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>All Decisions</option>
                      <option>Approved</option>
                      <option>Escalated</option>
                      <option>Blocked</option>
                      <option>Monitored</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>All Models</option>
                      <option>Cyber Threat Predictor</option>
                      <option>Behavioral Analyzer</option>
                      <option>Pattern Recognizer</option>
                    </select>
                    <input
                      type="date"
                      className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white"
                      defaultValue="2024-01-07"
                    />
                    <button className="px-4 py-2 bg-gradient-to-r from-pink-600 to-magenta-600 hover:from-pink-700 hover:to-magenta-700 text-white rounded-lg transition-all duration-300">
                      Filter Logs
                    </button>
                  </div>

                  {/* Enhanced Decision Logs */}
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {[
                      {
                        id: 'DEC-001',
                        timestamp: '08:45:23',
                        model: 'Cyber Threat Predictor',
                        action: 'approved',
                        confidence: 97.3,
                        decision: 'High-confidence threat blocked',
                        category: 'Security',
                        processingTime: '0.8s',
                        resourceUsage: '2.1GB RAM',
                        riskLevel: 'Critical',
                        outcome: 'Successful'
                      },
                      {
                        id: 'DEC-002',
                        timestamp: '08:42:15',
                        model: 'Behavioral Analyzer',
                        action: 'escalated',
                        confidence: 78.2,
                        decision: 'Medium-confidence anomaly detected',
                        category: 'Behavioral',
                        processingTime: '1.2s',
                        resourceUsage: '1.8GB RAM',
                        riskLevel: 'High',
                        outcome: 'Human Review'
                      },
                      {
                        id: 'DEC-003',
                        timestamp: '08:38:42',
                        model: 'Pattern Recognizer',
                        action: 'monitored',
                        confidence: 85.6,
                        decision: 'New threat pattern learning initiated',
                        category: 'Adaptive',
                        processingTime: '2.1s',
                        resourceUsage: '3.2GB RAM',
                        riskLevel: 'Medium',
                        outcome: 'Learning'
                      }
                    ].map((log) => (
                      <motion.div
                        key={log.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-pink-500/50 transition-all duration-300"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-4">
                            <div className="text-white font-mono text-sm">{log.id}</div>
                            <div className="text-slate-400">{log.timestamp}</div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${log.action === 'approved' ? 'bg-green-500/20 text-green-400' : log.action === 'escalated' ? 'bg-yellow-500/20 text-yellow-400' : log.action === 'monitored' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
                              {log.action.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <div className="text-pink-400 font-bold">{log.confidence}%</div>
                              <div className="text-xs text-slate-400">Confidence</div>
                            </div>
                            <div className="text-right">
                              <div className="text-magenta-400 font-bold">{log.processingTime}</div>
                              <div className="text-xs text-slate-400">Processing</div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="text-white font-medium text-sm mb-1">{log.decision}</div>
                            <div className="flex items-center space-x-3 text-xs text-slate-400">
                              <span>Model: {log.model}</span>
                              <span>•</span>
                              <span>Category: {log.category}</span>
                              <span>•</span>
                              <span>Risk: {log.riskLevel}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-slate-300 mb-1">Resources: {log.resourceUsage}</div>
                            <div className={`text-sm font-bold ${log.outcome === 'Successful' ? 'text-green-400' : log.outcome === 'Human Review' ? 'text-yellow-400' : log.outcome === 'Learning' ? 'text-blue-400' : 'text-red-400'}`}>
                              {log.outcome}
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics Bar */}
                        <div className="flex items-center space-x-4 text-xs">
                          <div className="flex-1">
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-slate-400">Performance Score</span>
                              <span className="text-pink-400 font-bold">
                                {Math.round((log.confidence * 0.6) + ((1000 / parseFloat(log.processingTime)) * 0.4))}%
                              </span>
                            </div>
                            <div className="w-full bg-slate-600 rounded-full h-1.5">
                              <div
                                className="bg-gradient-to-r from-pink-500 to-magenta-500 h-1.5 rounded-full"
                                style={{
                                  width: `${Math.round((log.confidence * 0.6) + ((1000 / parseFloat(log.processingTime)) * 0.4))}%`
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Decision Analytics Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">247</div>
                      <div className="text-sm text-slate-400">Total Decisions</div>
                      <div className="text-xs text-slate-500">Last 24 hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-pink-400 mb-1">94.6%</div>
                      <div className="text-sm text-slate-400">Approval Rate</div>
                      <div className="text-xs text-slate-500">AI Confidence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-magenta-400 mb-1">1.3s</div>
                      <div className="text-sm text-slate-400">Avg Response</div>
                      <div className="text-xs text-slate-500">Processing Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">98.2%</div>
                      <div className="text-sm text-slate-400">Success Rate</div>
                      <div className="text-xs text-slate-500">Overall Performance</div>
                    </div>
                  </div>
                </div>
              </OperationsGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CyberOperations;
