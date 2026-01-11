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
  CircuitBoard as CircuitBoardIcon,
  Zap as Sword,
  Zap as Swords,
  Zap as Castle,
  Crown as CrownIcon,
  Shield as ShieldIconLucide,
  Target as TargetIconLucide,
  Crosshair as CrosshairIcon,
  Zap as ZapIcon,
  Flame as FlameIcon,
  Skull,
  Bomb,
  Zap as Explosion,
  Rocket,
  Zap as Missile,
  Radar,
  Zap as Antenna,
  Satellite as SatelliteIcon
} from 'lucide-react';

// 🛡️ CYBER WARFARE COMMAND CENTER - SUPER ADMIN ONLY
// ELITE MILITARY-GRADE CYBER WARFARE OPERATIONS & STRATEGIC COMMAND
// ADVANCED CYBER OFFENSIVE & DEFENSIVE WARFARE CAPABILITIES

const CyberWarfareCommand = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-900 via-slate-950 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-20"
        >
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Cyber Warfare Command Center. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-red-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔄 STATE MANAGEMENT - ENHANCED WITH WARFARE FEATURES
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('command-center');
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [warfareData, setWarfareData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [commandActions, setCommandActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [error, setError] = useState(null);
  const [backendOffline, setBackendOffline] = useState(false);

  // 📊 CYBER WARFARE DATA - ENHANCED WITH MILITARY FEATURES
  const [warfareStats, setWarfareStats] = useState({
    activeOperations: {
      offensiveOps: 8,
      defensiveOps: 15,
      intelligenceOps: 12,
      totalActive: 35,
      criticalOps: 5
    },
    warfareReadiness: {
      readiness: 89,
      cyberForces: 247,
      assets: 156,
      coordination: 94
    },
    strategicAssets: {
      satellites: 23,
      commandCenters: 47,
      cyberUnits: 89,
      alliedForces: 34
    },
    threatAssessment: {
      globalThreatLevel: 'HIGH',
      activeConflicts: 12,
      monitoredActors: 156,
      intelligenceCoverage: 87
    }
  });

  // 🆕 ENHANCED WARFARE FEATURES STATE
  const [warfareFeed, setWarfareFeed] = useState([
    { id: 1, type: 'operation-launched', severity: 'critical', title: 'Operation Digital Storm Activated', message: 'Strategic cyber offensive operation initiated against critical infrastructure', timestamp: new Date(), source: 'Strategic Command' },
    { id: 2, type: 'threat-detected', severity: 'high', title: 'State Actor Cyber Campaign', message: 'Advanced persistent threat detected from nation-state actor', timestamp: new Date(Date.now() - 300000), source: 'SIGINT Division' },
    { id: 3, type: 'intelligence-update', severity: 'medium', title: 'Quantum Computing Threat', message: 'New quantum computing capabilities detected in adversary arsenal', timestamp: new Date(Date.now() - 600000), source: 'Technical Intelligence' },
    { id: 4, type: 'system-alert', severity: 'high', title: 'Cyber Warfare Readiness Alert', message: 'Strategic cyber warfare assets mobilized for potential conflict', timestamp: new Date(Date.now() - 900000), source: 'Warfare Command' }
  ]);

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
    const loadWarfareData = async () => {
      try {
        setError(null);

        // Mock data - completely isolated from other roles
        setWarfareData({
          activeOperations: {
            offensiveOps: 8,
            defensiveOps: 15,
            intelligenceOps: 12,
            totalActive: 35,
            criticalOps: 5
          },
          warfareReadiness: {
            readiness: 89,
            cyberForces: 247,
            assets: 156,
            coordination: 94
          },
          strategicAssets: {
            satellites: 23,
            commandCenters: 47,
            cyberUnits: 89,
            alliedForces: 34
          },
          threatAssessment: {
            globalThreatLevel: 'HIGH',
            activeConflicts: 12,
            monitoredActors: 156,
            intelligenceCoverage: 87
          }
        });

      } catch (err) {
        console.error('Cyber Warfare Data Loading Error:', err);
        setError('Failed to load cyber warfare data');
        setBackendOffline(true);
      }
    };

    loadWarfareData();
  }, []);

  // ⚔️ CYBER WARFARE GLASS CARD COMPONENT - MILITARY THEME
  const WarfareGlassCard = ({ children, title, icon: Icon, status, readiness, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {readiness && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${readiness === 'COMBAT READY' ? 'bg-green-500/20 text-green-400 border-green-500/40' : readiness === 'STANDBY' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-red-500/20 text-red-400 border-red-500/40'}`}>
                {readiness}
              </span>
            )}
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' : status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : status === 'NORMAL' ? 'bg-green-500/20 text-green-400 border-green-500/40' : 'bg-blue-500/20 text-blue-400 border-blue-500/40'}`}>
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
        <WarfareGlassCard title="Warfare Command Error" icon={AlertTriangle} status="ERROR" className="max-w-md">
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
        </WarfareGlassCard>
      </div>
    );
  }

  // 📊 MAIN CYBER WARFARE COMMAND CENTER INTERFACE - MILITARY THEME
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-900 via-slate-950 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects - MILITARY THEME */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-red-500/40 to-orange-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-red-600/35 to-orange-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-red-400/30 to-orange-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header - MILITARY THEME */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-red-600 to-red-600 rounded-xl flex items-center justify-center shadow-2xl shadow-red-500/30">
                <Swords className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-300 via-orange-300 via-red-200 to-red-200 bg-clip-text text-transparent drop-shadow-sm">
                Cyber Warfare Command Center
              </h1>
              <p className="text-red-200/80 text-sm font-medium">Elite Military-Grade Cyber Warfare Operations & Strategic Command</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">Strategic Operations Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-orange-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Elite Cyber Forces Ready</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-xs text-slate-300">156 Strategic Assets Deployed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-red-400 animate-pulse" />
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
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-red-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Warfare Status'}</span>
            </button>
          </div>
        </motion.div>

        {/* Strategic Command Center Tabs - MILITARY THEME */}
        <div className="flex items-center space-x-2 mb-6 bg-slate-800/40 backdrop-blur-sm border border-slate-600/20 rounded-lg p-1.5 shadow-lg">
          {[
            { id: 'command-center', label: 'Command Center', icon: Crown, short: 'Cmd' },
            { id: 'offensive-ops', label: 'Offensive Ops', icon: Swords, short: 'Off' },
            { id: 'defensive-ops', label: 'Defensive Ops', icon: Shield, short: 'Def' },
            { id: 'intelligence', label: 'Intelligence', icon: Radar, short: 'Intel' },
            { id: 'strategic-assets', label: 'Strategic Assets', icon: Satellite, short: 'Assets' },
            { id: 'warfare-analytics', label: 'Warfare Analytics', icon: BarChart3, short: 'Stats' },
            { id: 'command-control', label: 'Command & Control', icon: Radio, short: 'Ctrl' }
          ].map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`group flex items-center space-x-2 px-4 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10' : 'text-slate-400 hover:text-white hover:bg-slate-700/40 hover:border-slate-500/30'}`}
                title={section.label}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-red-400' : 'text-slate-500 group-hover:text-red-300'}`} />
                <span className="hidden sm:inline">{section.label}</span>
                <span className="sm:hidden">{section.short}</span>
                {isActive && (
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'command-center' && (
            <motion.div
              key="command-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Cyber Warfare Command Center Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <WarfareGlassCard title="Strategic Readiness" icon={Gauge} readiness="COMBAT READY">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">89%</div>
                    <div className="text-sm text-slate-400">Warfare Readiness</div>
                    <div className="text-xs text-green-400 mt-2">Elite Forces Deployed</div>
                  </div>
                </WarfareGlassCard>

                <WarfareGlassCard title="Active Operations" icon={Swords} readiness="ENGAGED">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">35</div>
                    <div className="text-sm text-slate-400">Live Cyber Ops</div>
                    <div className="text-xs text-red-400 mt-2">5 Critical Priority</div>
                  </div>
                </WarfareGlassCard>

                <WarfareGlassCard title="Strategic Assets" icon={Satellite} readiness="DEPLOYED">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">156</div>
                    <div className="text-sm text-slate-400">Cyber Assets</div>
                    <div className="text-xs text-green-400 mt-2">All Systems Operational</div>
                  </div>
                </WarfareGlassCard>

                <WarfareGlassCard title="Global Threat Level" icon={AlertTriangle} readiness="HIGH ALERT">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">HIGH</div>
                    <div className="text-sm text-slate-400">Strategic Threat</div>
                    <div className="text-xs text-orange-400 mt-2">12 Active Conflicts</div>
                  </div>
                </WarfareGlassCard>
              </div>

              {/* Real-time Strategic Warfare Intelligence Feed */}
              <WarfareGlassCard title="Real-time Strategic Warfare Intelligence Feed" icon={Radio} status="ACTIVE">
                <div className="space-y-4">
                  {/* Live Feed Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                      <span className="text-white font-semibold">Global Cyber Warfare Operations Stream</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Last updated:</span>
                      <span className="text-red-400 font-mono text-xs">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Warfare Operations Feed */}
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {warfareFeed.map((operation) => (
                      <motion.div
                        key={operation.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border backdrop-blur-sm ${operation.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' : operation.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' : operation.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${operation.severity === 'critical' ? 'bg-red-400 animate-pulse' : operation.severity === 'high' ? 'bg-orange-400' : operation.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                            <div>
                              <div className="text-white font-medium text-sm">{operation.title}</div>
                              <div className="text-slate-400 text-xs">{operation.message}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${operation.severity === 'critical' ? 'bg-red-500/20 text-red-400' : operation.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : operation.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                              {operation.severity.toUpperCase()}
                            </span>
                            <div className="text-slate-400 text-xs mt-1">{operation.source}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Strategic Command Actions */}
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Swords className="w-4 h-4" />
                      <span>Launch Offensive</span>
                    </button>
                    <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Shield className="w-4 h-4" />
                      <span>Strategic Defense</span>
                    </button>
                    <button className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Radar className="w-4 h-4" />
                      <span>Intelligence Report</span>
                    </button>
                  </div>
                </div>
              </WarfareGlassCard>

              {/* Global Cyber Warfare Operations Map */}
              <WarfareGlassCard title="Global Cyber Warfare Operations Map" icon={Globe} status="LIVE">
                <div className="space-y-6">
                  {/* Map Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                        <option>All Operations</option>
                        <option>Offensive Only</option>
                        <option>Defensive Only</option>
                        <option>Intelligence Ops</option>
                      </select>

                      <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                        <option>Global View</option>
                        <option>North America</option>
                        <option>Europe</option>
                        <option>Asia Pacific</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <RefreshCw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Strategic Operations Map */}
                  <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 relative overflow-hidden">
                    {/* Simulated Global Warfare Map */}
                    <div className="grid grid-cols-24 grid-rows-12 gap-1 p-4 h-full">
                      {Array.from({ length: 288 }).map((_, index) => {
                        const threatLevel = Math.random() > 0.8 ? Math.floor(Math.random() * 4) + 1 : 0;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.002 }}
                            className={`rounded-sm cursor-pointer transition-transform hover:scale-125 ${threatLevel === 0 ? 'bg-slate-700/30' : threatLevel === 1 ? 'bg-yellow-500/60' : threatLevel === 2 ? 'bg-orange-500/60' : threatLevel === 3 ? 'bg-red-500/60' : 'bg-red-600/80'}`}
                            title={threatLevel > 0 ? `Warfare Level: ${threatLevel}/4` : 'Peaceful region'}
                          />
                        );
                      })}
                    </div>

                    {/* Strategic Command Centers */}
                    <div className="absolute top-8 left-8 bg-red-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                      <div className="text-white text-xs font-medium">STRATEGIC COMMAND</div>
                      <div className="text-red-200 text-xs">NORAD Cyber Command - Level 4</div>
                    </div>

                    <div className="absolute bottom-8 right-8 bg-orange-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                      <div className="text-white text-xs font-medium">ALLIED FORCES</div>
                      <div className="text-orange-200 text-xs">Five Eyes Coalition - Active</div>
                    </div>

                    <div className="absolute top-1/2 left-1/2 bg-red-600/90 backdrop-blur rounded-lg p-2 animate-pulse">
                      <div className="text-white text-xs font-medium">CRITICAL OPERATION</div>
                      <div className="text-red-200 text-xs">Infrastructure Defense - Priority 1</div>
                    </div>
                  </div>

                  {/* Warfare Operations Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="text-red-400 font-bold">35</div>
                      <div className="text-xs text-slate-400">Active Operations</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                      <div className="text-orange-400 font-bold">12</div>
                      <div className="text-xs text-slate-400">Critical Conflicts</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="text-yellow-400 font-bold">89</div>
                      <div className="text-xs text-slate-400">Cyber Units</div>
                    </div>
                    <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="text-green-400 font-bold">94%</div>
                      <div className="text-xs text-slate-400">Mission Success</div>
                    </div>
                  </div>
                </div>
              </WarfareGlassCard>
            </motion.div>
          )}

          {/* Offensive Cyber Warfare Operations */}
          {activeSection === 'offensive-ops' && (
            <motion.div
              key="offensive-ops"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <WarfareGlassCard title="Offensive Cyber Warfare Operations Center" icon={Swords} readiness="COMBAT READY">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <Swords className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">8</div>
                    <div className="text-sm text-slate-400">Active Offensive Ops</div>
                  </div>
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <Target className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">94%</div>
                    <div className="text-sm text-slate-400">Success Rate</div>
                  </div>
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <Zap className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Strategic Targets</div>
                  </div>
                </div>

                {/* Offensive Operations Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">Strategic Offensive Capabilities</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">Offensive Forces Ready</span>
                    </div>
                  </div>

                  {/* Offensive Operations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Strategic Cyber Attack */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Swords className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Strategic Cyber Attack</h5>
                          <p className="text-slate-400 text-xs">Precision offensive operations</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Target Systems</span>
                          <span className="text-red-400 font-medium">23 identified</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Success Probability</span>
                          <span className="text-green-400 font-medium">87%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Collateral Risk</span>
                          <span className="text-yellow-400 font-medium">Low</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
                        Launch Operation
                      </button>
                    </motion.div>

                    {/* Intelligence Disruption */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-orange-500/20 rounded-lg">
                          <Radar className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Intelligence Disruption</h5>
                          <p className="text-slate-400 text-xs">Blind enemy surveillance</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Satellites Targeted</span>
                          <span className="text-orange-400 font-medium">12 active</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Disruption Duration</span>
                          <span className="text-blue-400 font-medium">4-6 hours</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Detection Risk</span>
                          <span className="text-green-400 font-medium">Minimal</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium">
                        Execute Disruption
                      </button>
                    </motion.div>

                    {/* Infrastructure Sabotage */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Zap className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Infrastructure Sabotage</h5>
                          <p className="text-slate-400 text-xs">Critical system disruption</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Target Priority</span>
                          <span className="text-red-400 font-medium">Critical</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Impact Assessment</span>
                          <span className="text-orange-400 font-medium">High</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Recovery Time</span>
                          <span className="text-yellow-400 font-medium">24-48h</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
                        Initiate Sabotage
                      </button>
                    </motion.div>
                  </div>
                </div>
              </WarfareGlassCard>
            </motion.div>
          )}

          {/* Placeholder sections for remaining tabs */}
          {activeSection === 'defensive-ops' && (
            <motion.div
              key="defensive-ops"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <WarfareGlassCard title="Defensive Cyber Warfare Operations" icon={Shield} readiness="DEFENSIVE POSTURE">
                <div className="text-center py-12">
                  <Shield className="w-20 h-20 text-blue-400 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-white mb-4">Strategic Defense Systems</h4>
                  <p className="text-blue-200/80 text-lg mb-6">Advanced defensive cyber warfare capabilities and threat mitigation</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Shield className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <div className="text-blue-400 font-semibold text-sm mb-2">Active Defense</div>
                      <div className="text-blue-200/80 text-xs">Real-time threat blocking</div>
                    </div>
                    <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <div className="text-green-400 font-semibold text-sm mb-2">Counter-Intelligence</div>
                      <div className="text-green-200/80 text-xs">Attack attribution and response</div>
                    </div>
                    <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <Satellite className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      <div className="text-purple-400 font-semibold text-sm mb-2">Space-Based Defense</div>
                      <div className="text-purple-200/80 text-xs">Orbital cyber protection</div>
                    </div>
                  </div>
                </div>
              </WarfareGlassCard>
            </motion.div>
          )}

          {activeSection === 'intelligence' && (
            <motion.div
              key="intelligence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <WarfareGlassCard title="Strategic Cyber Intelligence Operations" icon={Radar} readiness="INTELLIGENCE ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Radar className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Monitored Actors</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Antenna className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">87%</div>
                    <div className="text-sm text-slate-400">Intelligence Coverage</div>
                  </div>
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <Eye className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">Active SIGINT Ops</div>
                  </div>
                </div>

                <div className="text-center bg-blue-800/20 border border-blue-600/20 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-white mb-2">Global Intelligence Network</h4>
                  <p className="text-blue-200/80">Advanced signals intelligence and cyber threat monitoring</p>
                </div>
              </WarfareGlassCard>
            </motion.div>
          )}

          {activeSection === 'strategic-assets' && (
            <motion.div
              key="strategic-assets"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <WarfareGlassCard title="Strategic Cyber Warfare Assets" icon={Satellite} readiness="FULLY DEPLOYED">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Satellite className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">Orbital Satellites</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Server className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">47</div>
                    <div className="text-sm text-slate-400">Command Centers</div>
                  </div>
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <Users className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">89</div>
                    <div className="text-sm text-slate-400">Elite Cyber Units</div>
                  </div>
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <Globe className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">34</div>
                    <div className="text-sm text-slate-400">Allied Nations</div>
                  </div>
                </div>

                <div className="text-center bg-green-800/20 border border-green-600/20 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-white mb-2">Global Cyber Warfare Coalition</h4>
                  <p className="text-green-200/80">United strategic assets and international cyber defense forces</p>
                </div>
              </WarfareGlassCard>
            </motion.div>
          )}

          {activeSection === 'warfare-analytics' && (
            <motion.div
              key="warfare-analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <WarfareGlassCard title="Cyber Warfare Analytics & Performance Metrics" icon={BarChart3} status="ANALYZING">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">94%</div>
                    <div className="text-sm text-green-200">Mission Success Rate</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Target className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">2.3s</div>
                    <div className="text-sm text-blue-200">Response Time</div>
                  </div>
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <TrendingUp className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">89%</div>
                    <div className="text-sm text-orange-200">Warfare Readiness</div>
                  </div>
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">156</div>
                    <div className="text-sm text-red-200">Strategic Assets</div>
                  </div>
                </div>

                <div className="text-center bg-red-800/20 border border-red-600/20 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-white mb-2">Elite Cyber Warfare Performance Dashboard</h4>
                  <p className="text-red-200/80">Real-time metrics for strategic cyber warfare operations and mission outcomes</p>
                </div>
              </WarfareGlassCard>
            </motion.div>
          )}

          {activeSection === 'command-control' && (
            <motion.div
              key="command-control"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <WarfareGlassCard title="Supreme Command & Control Interface" icon={Crown} readiness="COMMAND ACTIVE">
                <div className="text-center py-12">
                  <Crown className="w-20 h-20 text-yellow-400 mx-auto mb-6" />
                  <h4 className="text-2xl font-bold text-white mb-4">Strategic Cyber Warfare Command</h4>
                  <p className="text-yellow-200/80 text-lg mb-6">Ultimate authority over global cyber warfare operations</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                    <button className="p-6 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors">
                      <Swords className="w-12 h-12 text-red-400 mx-auto mb-3" />
                      <div className="text-red-400 font-semibold text-sm mb-2">Global Offensive</div>
                      <div className="text-red-200/80 text-xs">Launch strategic attacks</div>
                    </button>
                    <button className="p-6 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-colors">
                      <Shield className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <div className="text-blue-400 font-semibold text-sm mb-2">Total Defense</div>
                      <div className="text-blue-200/80 text-xs">Activate all defenses</div>
                    </button>
                    <button className="p-6 bg-green-500/10 hover:bg-green-500/20 border border-green-500/30 rounded-lg transition-colors">
                      <Radar className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <div className="text-green-400 font-semibold text-sm mb-2">Intelligence Surge</div>
                      <div className="text-green-200/80 text-xs">Maximum surveillance</div>
                    </button>
                    <button className="p-6 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg transition-colors">
                      <Crown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                      <div className="text-yellow-400 font-semibold text-sm mb-2">Supreme Override</div>
                      <div className="text-yellow-200/80 text-xs">Ultimate command authority</div>
                    </button>
                  </div>
                </div>
              </WarfareGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CyberWarfareCommand;