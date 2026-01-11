import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);
import {
  LineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as BarChartIcon,
  Bar as RechartsBar,
  PieChart as PieChartIcon,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
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
  TrendingDown,
  RefreshCw,
  Loader2,
  ZoomIn,
  ZoomOut,
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
  Siren,
  ShieldAlert,
  Zap as ZapIcon,
  Radio as RadioIcon,
  Camera,
  Wifi,
  Power,
  Droplets,
  Truck,
  Heart,
  Factory,
  Banknote,
  Plane,
  Train,
  Ship,
  Satellite,
  MonitorSpeaker,
  HardDrive,
  Cpu as CpuIcon,
  CircuitBoard,
  Eye as EyeIcon,
  Sparkles,
  Gauge,
  Thermometer,
  Wind,
  CloudRain,
  ZapIcon as Lightning,
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
  Crown as CrownIcon,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Eye as EyeIcon2,
  Camera as CameraIcon,
  Wifi as WifiIcon,
  MapPin as MapPinIcon,
  Bell as BellIcon,
  AlertTriangle as AlertIcon,
  User as UserIcon,
  Users as UsersIcon2,
  Building as BuildingIcon,
  Car,
  Plane as PlaneIcon,
  ShieldCheck as ShieldCheckIcon,
  Fingerprint,
  Scan,
  Search as SearchIcon,
  Filter as FilterIcon,
  Calendar,
  Clock as ClockIcon,
  Volume2 as VolumeIcon,
  VolumeX as MuteIcon,
  Calculator as CalculatorIcon,
  DollarSign as DollarIcon,
  Target as TargetIcon2,
  Activity as ActivityIcon,
  MonitorSpeaker as SpeakerIcon,
  Radio as RadioIcon2,
  Satellite as SatelliteIcon,
  Navigation as NavigationIcon,
  Compass as CompassIcon,
  Flag as FlagIcon,
  CheckSquare as CheckIcon,
  Square as SquareIcon,
  Crown as ExecutiveIcon,
  Shield as ProtectionIcon2,
  Lock as SecurityIcon,
  Eye as VisibilityIcon,
  Camera as SurveillanceIcon,
  Wifi as NetworkIcon,
  MapPin as LocationIcon2,
  Bell as AlertIcon2,
  AlertTriangle as WarningIcon,
  User as PersonIcon,
  Users as GroupIcon,
  Building as FacilityIcon,
  Car as VehicleIcon,
  Plane as AviationIcon
} from 'lucide-react';

// 🛡️ EXECUTIVE PROTECTION SUITE - SUPER ADMIN ONLY
// ADVANCED AI-POWERED EXECUTIVE SECURITY & PERSONAL PROTECTION
// COMPREHENSIVE C-SUITE PROTECTION & THREAT MITIGATION PLATFORM

const ExecutiveProtectionSuite = () => {
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
              This is an Executive Protection Suite. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-red-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔄 STATE MANAGEMENT
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('executive-overview');
  const [selectedExecutive, setSelectedExecutive] = useState(null);
  const [protectionData, setProtectionData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [executiveProfiles, setExecutiveProfiles] = useState([]);
  const [threatAssessments, setThreatAssessments] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 📊 EXECUTIVE PROTECTION METRICS
  const [analyticsData, setAnalyticsData] = useState(null);

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

  // Executive Threat Categories
  const executiveThreatCategories = [
    {
      id: 'personal-security',
      name: 'Personal Security Threats',
      icon: UserX,
      level: 'HIGH',
      score: 78,
      trend: 'stable',
      description: 'Direct threats to executive safety and wellbeing',
      mitigation: 'Personal security detail and threat monitoring',
      color: 'red',
      protected: 47
    },
    {
      id: 'corporate-espionage',
      name: 'Corporate Espionage',
      icon: Eye,
      level: 'HIGH',
      score: 82,
      trend: 'increasing',
      description: 'Industrial espionage and competitive intelligence gathering',
      mitigation: 'Information security and counterintelligence',
      color: 'orange',
      protected: 47
    },
    {
      id: 'cyber-targeting',
      name: 'Executive Cyber Targeting',
      icon: Zap,
      level: 'CRITICAL',
      score: 89,
      trend: 'rising',
      description: 'Targeted cyber attacks on executive communications',
      mitigation: 'Advanced cybersecurity and secure communications',
      color: 'red',
      protected: 47
    },
    {
      id: 'reputational-risks',
      name: 'Reputational Risks',
      icon: Users,
      level: 'MEDIUM',
      score: 65,
      trend: 'stable',
      description: 'Public scandals and personal reputation attacks',
      mitigation: 'Crisis management and reputation monitoring',
      color: 'yellow',
      protected: 47
    },
    {
      id: 'travel-security',
      name: 'Travel & Transportation',
      icon: Plane,
      level: 'HIGH',
      score: 74,
      trend: 'decreasing',
      description: 'Security risks during business travel and transportation',
      mitigation: 'Travel security protocols and route planning',
      color: 'orange',
      protected: 47
    },
    {
      id: 'insider-threats',
      name: 'Insider Threats',
      icon: UserCog,
      level: 'MEDIUM',
      score: 58,
      trend: 'stable',
      description: 'Internal threats from employees and associates',
      mitigation: 'Background checks and behavioral monitoring',
      color: 'blue',
      protected: 47
    }
  ];

  // 🎯 EXECUTIVE PROTECTION GLASS CARD COMPONENT
  const ExecutiveProtectionGlassCard = ({ children, title, icon: Icon, status, riskLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(168,85,247,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] text-purple-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {riskLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' : riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-green-500/20 text-green-400 border-green-500/40'}`}>
                {riskLevel}
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

  // 📊 MAIN EXECUTIVE PROTECTION SUITE INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-violet-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/40 to-violet-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/35 to-indigo-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
                Executive Protection Suite
              </h1>
              <p className="text-purple-200/80 text-sm font-medium">Advanced AI-Powered Executive Security & Personal Protection</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">Executive Security Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AIIcon className="w-4 h-4 text-violet-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Threat Intelligence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs text-slate-300">47 Executives Protected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
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
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Protection Status'}</span>
            </button>
          </div>
        </motion.div>

        {/* Executive Protection Suite Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'executive-overview', label: 'Executive Overview', icon: Crown },
            { id: 'personal-security', label: 'Personal Security', icon: Shield },
            { id: 'threat-intelligence', label: 'Threat Intelligence', icon: Brain },
            { id: 'travel-security', label: 'Travel Security', icon: Plane },
            { id: 'crisis-management', label: 'Crisis Management', icon: AlertTriangle }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === section.id ? 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-700/30'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'executive-overview' && (
            <motion.div
              key="executive-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enterprise Executive Protection Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <ExecutiveProtectionGlassCard title="Protected Executives" icon={Crown} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">47</div>
                    <div className="text-sm text-slate-400">C-Suite Protected</div>
                    <div className="text-xs text-green-400 mt-2">100% Coverage</div>
                  </div>
                </ExecutiveProtectionGlassCard>

                <ExecutiveProtectionGlassCard title="Active Threats" icon={AlertTriangle} riskLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">23</div>
                    <div className="text-sm text-slate-400">Immediate Threats</div>
                    <div className="text-xs text-orange-400 mt-2">12 escalated today</div>
                  </div>
                </ExecutiveProtectionGlassCard>

                <ExecutiveProtectionGlassCard title="Security Score" icon={Shield} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">96%</div>
                    <div className="text-sm text-slate-400">Overall Protection</div>
                    <div className="text-xs text-blue-400 mt-2">Industry Leading</div>
                  </div>
                </ExecutiveProtectionGlassCard>

                <ExecutiveProtectionGlassCard title="Response Time" icon={Clock} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{`< 30s`}</div>
                    <div className="text-sm text-slate-400">Emergency Response</div>
                    <div className="text-xs text-green-400 mt-2">99.9% SLA met</div>
                  </div>
                </ExecutiveProtectionGlassCard>
              </div>

              {/* Executive Threat Categories Overview */}
              <ExecutiveProtectionGlassCard title="Executive Threat Categories Overview" icon={Layers} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {executiveThreatCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${selectedExecutive === category.id ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'}`}
                        onClick={() => setSelectedExecutive(selectedExecutive === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.4)]`} />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{category.name}</h4>
                            <div className={`text-xs ${category.level === 'CRITICAL' ? 'text-red-400' : category.level === 'HIGH' ? 'text-orange-400' : category.level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>
                              {category.level} RISK
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold text-sm">{category.protected}</div>
                            <div className="text-slate-400 text-xs">Protected</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Risk Score:</span>
                            <span className="text-white font-medium">{category.score}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Trend:</span>
                            <span className={`font-medium ${category.trend === 'increasing' ? 'text-red-400' : category.trend === 'decreasing' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {category.trend.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </ExecutiveProtectionGlassCard>

              {/* Real-time Executive Security Alerts */}
              <ExecutiveProtectionGlassCard title="Real-time Executive Security Alerts & Notifications" icon={Radio} status="ACTIVE">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { id: 1, type: 'critical', title: 'Executive Location Compromised', message: 'CEO location tracking indicates unauthorized surveillance attempt', time: '2 minutes ago', severity: 'critical', executive: 'John Smith, CEO' },
                    { id: 2, type: 'warning', title: 'Suspicious Communication Pattern', message: 'Unusual email traffic detected targeting CFO communications', time: '15 minutes ago', severity: 'high', executive: 'Sarah Johnson, CFO' },
                    { id: 3, type: 'info', title: 'Travel Security Assessment Complete', message: 'Board member travel itinerary reviewed and secured', time: '1 hour ago', severity: 'medium', executive: 'Michael Chen, Board Member' },
                    { id: 4, type: 'success', title: 'Security Protocol Activated', message: 'Emergency response team deployed for executive protection', time: '2 hours ago', severity: 'low', executive: 'All Executives' }
                  ].map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border ${alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' : alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' : alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-red-400' : alert.severity === 'high' ? 'bg-orange-400' : alert.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                          <div className="flex-1">
                            <div className="text-white font-medium text-sm">{alert.title}</div>
                            <div className="text-slate-400 text-xs">{alert.message}</div>
                            <div className="text-purple-400 text-xs font-medium mt-1">{alert.executive}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-slate-400 text-xs">{alert.time}</div>
                            <span className={`text-xs font-bold px-2 py-1 rounded ml-4 ${alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' : alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                              {alert.severity.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ExecutiveProtectionGlassCard>
            </motion.div>
          )}

          {activeSection === 'personal-security' && (
            <motion.div
              key="personal-security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Personal Security Protection Center */}
              <ExecutiveProtectionGlassCard title="Personal Security Protection Center" icon={Shield} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">47</div>
                    <div className="text-sm text-slate-400">Security Details</div>
                  </div>
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <Camera className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-cyan-400 mb-1">2,847</div>
                    <div className="text-sm text-slate-400">Surveillance Cameras</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <MapPin className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">24/7</div>
                    <div className="text-sm text-slate-400">Location Tracking</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Bell className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Emergency Alerts</div>
                  </div>
                </div>

                {/* Personal Security Operations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Executive Location Tracking */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <MapPin className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Location Tracking</h5>
                        <p className="text-slate-400 text-xs">Real-time GPS monitoring</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Active Tracking:</span>
                        <span className="text-blue-400 font-medium">47 executives</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Safe Zones:</span>
                        <span className="text-green-400 font-medium">23 defined</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Alerts Today:</span>
                        <span className="text-orange-400 font-medium">7</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                      View Live Map
                    </button>
                  </motion.div>

                  {/* Surveillance Systems */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Camera className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Surveillance Systems</h5>
                        <p className="text-slate-400 text-xs">AI-powered video monitoring</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Active Cameras:</span>
                        <span className="text-cyan-400 font-medium">2,847</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">AI Detections:</span>
                        <span className="text-green-400 font-medium">1,247 today</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">False Positives:</span>
                        <span className="text-blue-400 font-medium">0.02%</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium">
                      Monitor Feeds
                    </button>
                  </motion.div>

                  {/* Emergency Response */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-red-500/20 rounded-lg">
                        <Bell className="w-6 h-6 text-red-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Emergency Response</h5>
                        <p className="text-slate-400 text-xs">Rapid deployment system</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Response Teams:</span>
                        <span className="text-red-400 font-medium">12 active</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Avg Response:</span>
                        <span className="text-green-400 font-medium">2.3 min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Success Rate:</span>
                        <span className="text-blue-400 font-medium">99.7%</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium">
                      Deploy Team
                    </button>
                  </motion.div>

                  {/* Secure Communications */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Lock className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Secure Communications</h5>
                        <p className="text-slate-400 text-xs">Encrypted executive channels</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Secure Lines:</span>
                        <span className="text-purple-400 font-medium">47 active</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Encrypted Calls:</span>
                        <span className="text-green-400 font-medium">1,247 today</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Interceptions:</span>
                        <span className="text-red-400 font-medium">0 blocked</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium">
                      Communication Logs
                    </button>
                  </motion.div>

                  {/* Threat Assessment */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-orange-500/20 rounded-lg">
                        <Target className="w-6 h-6 text-orange-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Threat Assessment</h5>
                        <p className="text-slate-400 text-xs">Personal risk evaluation</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Risk Profiles:</span>
                        <span className="text-orange-400 font-medium">47 complete</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">High Risk:</span>
                        <span className="text-red-400 font-medium">12 flagged</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Last Updated:</span>
                        <span className="text-green-400 font-medium">Today</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium">
                      Update Assessments
                    </button>
                  </motion.div>

                  {/* Digital Security */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Wifi className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Digital Security</h5>
                        <p className="text-slate-400 text-xs">Cyber protection monitoring</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Devices Protected:</span>
                        <span className="text-indigo-400 font-medium">156</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Threats Blocked:</span>
                        <span className="text-green-400 font-medium">23 today</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Security Score:</span>
                        <span className="text-blue-400 font-medium">98%</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">
                      Security Dashboard
                    </button>
                  </motion.div>
                </div>
              </ExecutiveProtectionGlassCard>
            </motion.div>
          )}

          {activeSection === 'threat-intelligence' && (
            <motion.div
              key="threat-intelligence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Executive Threat Intelligence Center */}
              <ExecutiveProtectionGlassCard title="Executive Threat Intelligence Center" icon={Brain} status="ANALYZING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">94%</div>
                    <div className="text-sm text-slate-400">Intelligence Accuracy</div>
                  </div>
                  <div className="text-center p-6 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                    <Target className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-violet-400 mb-1">847</div>
                    <div className="text-sm text-slate-400">Threats Identified</div>
                  </div>
                  <div className="text-center p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-indigo-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">Days Advance Warning</div>
                  </div>
                </div>

                {/* Executive Threat Intelligence Scenarios */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">Executive Protection Threat Scenarios</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">Personal Security Intelligence</span>
                    </div>
                  </div>

                  {/* Executive Protection Threat Scenarios Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        scenario: 'VIP Assassination Plot',
                        probability: 23,
                        impact: 'CRITICAL',
                        timeframe: 'Next 120 days',
                        icon: Target,
                        color: 'red',
                        trend: 'stable',
                        description: 'Coordinated assassination attempts targeting high-profile executives',
                        executives: 'CEO, Board Chairman',
                        protection: 'Armed detail, route randomization'
                      },
                      {
                        scenario: 'Executive Kidnapping for Ransom',
                        probability: 34,
                        impact: 'CRITICAL',
                        timeframe: 'Next 90 days',
                        icon: UserX,
                        color: 'red',
                        trend: 'rising',
                        description: 'Corporate extortion through executive abduction and ransom demands',
                        executives: 'CFO, CTO',
                        protection: 'Safe houses, emergency protocols'
                      },
                      {
                        scenario: 'Stalking & Harassment Campaign',
                        probability: 67,
                        impact: 'HIGH',
                        timeframe: 'Next 45 days',
                        icon: Eye,
                        color: 'orange',
                        trend: 'increasing',
                        description: 'Persistent surveillance and harassment targeting executive privacy',
                        executives: 'All C-suite',
                        protection: 'Digital forensics, restraining orders'
                      },
                      {
                        scenario: 'Family Protection Breach',
                        probability: 45,
                        impact: 'HIGH',
                        timeframe: 'Next 60 days',
                        icon: Users,
                        color: 'orange',
                        trend: 'stable',
                        description: 'Threats extending to executive family members and close associates',
                        executives: 'Family members of 8 executives',
                        protection: 'Family security detail, school security'
                      },
                      {
                        scenario: 'Corporate Blackmail Operation',
                        probability: 56,
                        impact: 'HIGH',
                        timeframe: 'Next 30 days',
                        icon: Lock,
                        color: 'orange',
                        trend: 'rising',
                        description: 'Personal compromise material used for corporate blackmail',
                        executives: '12 high-profile executives',
                        protection: 'Digital security audit, reputation management'
                      },
                      {
                        scenario: 'Executive Vehicle Tampering',
                        probability: 28,
                        impact: 'CRITICAL',
                        timeframe: 'Next 75 days',
                        icon: Car,
                        color: 'red',
                        trend: 'stable',
                        description: 'Sabotage attempts on executive transportation and vehicles',
                        executives: 'CEO, key executives',
                        protection: 'Vehicle security sweeps, armored transport'
                      }
                    ].map((scenario, index) => {
                      const Icon = scenario.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                          className={`relative p-6 rounded-xl border backdrop-blur-xl hover:scale-105 transition-all duration-300 ${scenario.color === 'red' ? 'bg-gradient-to-br from-red-500/10 to-red-900/20 border-red-500/30' : scenario.color === 'orange' ? 'bg-gradient-to-br from-orange-500/10 to-orange-900/20 border-orange-500/30' : scenario.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-900/20 border-yellow-500/30' : 'bg-gradient-to-br from-green-500/10 to-green-900/20 border-green-500/30'}`}
                        >
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 rounded-xl opacity-30 blur-xl ${scenario.color === 'red' ? 'bg-red-500/20' : scenario.color === 'orange' ? 'bg-orange-500/20' : scenario.color === 'yellow' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}></div>

                          <div className="relative z-10">
                            {/* Header with Icon and Trend */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${scenario.color === 'red' ? 'bg-red-500/20' : scenario.color === 'orange' ? 'bg-orange-500/20' : scenario.color === 'yellow' ? 'bg-yellow-500/20' : 'bg-green-500/20'}`}>
                                  <Icon className={`w-5 h-5 ${scenario.color === 'red' ? 'text-red-400' : scenario.color === 'orange' ? 'text-orange-400' : scenario.color === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`} />
                                </div>
                                <div>
                                  <h5 className="text-white font-semibold text-sm">{scenario.scenario}</h5>
                                  <p className="text-slate-400 text-xs">{scenario.timeframe}</p>
                                </div>
                              </div>

                              {/* Trend Indicator */}
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${scenario.trend === 'rising' ? 'bg-red-500/20 text-red-400' : scenario.trend === 'stable' ? 'bg-yellow-500/20 text-yellow-400' : scenario.trend === 'increasing' ? 'bg-red-500/20 text-red-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {scenario.trend === 'rising' || scenario.trend === 'increasing' ? <TrendingUp className="w-3 h-3" /> : scenario.trend === 'stable' ? <Activity className="w-3 h-3" /> : <BarChart3 className="w-3 h-3" />}
                                <span className="capitalize">{scenario.trend}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-slate-300 text-xs mb-4 leading-relaxed">{scenario.description}</p>

                            {/* Intelligence Details */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-xs font-medium">Threat Probability</span>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-lg font-bold ${scenario.color === 'red' ? 'text-red-400' : scenario.color === 'orange' ? 'text-orange-400' : scenario.color === 'yellow' ? 'text-yellow-400' : 'text-green-400'}`}>
                                    {scenario.probability}%
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${scenario.impact === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : scenario.impact === 'HIGH' ? 'bg-orange-500/20 text-orange-400' : scenario.impact === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                                    {scenario.impact}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-xs">Executives at Risk:</span>
                                <span className="text-purple-400 font-bold text-sm">{scenario.executives}</span>
                              </div>

                              {/* Progress Bar */}
                              <div className="relative">
                                <div className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scenario.probability}%` }}
                                    transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }}
                                    className={`h-full rounded-full ${scenario.color === 'red' ? 'bg-gradient-to-r from-red-500 to-red-600' : scenario.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' : scenario.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`}
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className={`absolute inset-0 rounded-xl border-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ${scenario.color === 'red' ? 'border-red-400/50' : scenario.color === 'orange' ? 'border-orange-400/50' : scenario.color === 'yellow' ? 'border-yellow-400/50' : 'border-green-400/50'}`}></div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Intelligence Operations Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400 mb-1">23</div>
                      <div className="text-sm text-slate-400">Active Threats</div>
                      <div className="text-xs text-slate-500">Being Monitored</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400 mb-1">847</div>
                      <div className="text-sm text-slate-400">Intelligence Reports</div>
                      <div className="text-xs text-slate-500">Generated Today</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">94%</div>
                      <div className="text-sm text-slate-400">Accuracy Rate</div>
                      <div className="text-xs text-slate-500">AI Confidence</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">47</div>
                      <div className="text-sm text-slate-400">Protected Executives</div>
                      <div className="text-xs text-slate-500">Full Coverage</div>
                    </div>
                  </div>
                </div>
              </ExecutiveProtectionGlassCard>
            </motion.div>
          )}

          {activeSection === 'travel-security' && (
            <motion.div
              key="travel-security"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Executive Travel Security Center */}
              <ExecutiveProtectionGlassCard title="Executive Travel Security Center" icon={Plane} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Plane className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Trips Secured</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">99.8%</div>
                    <div className="text-sm text-slate-400">Safety Record</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">24/7</div>
                    <div className="text-sm text-slate-400">Travel Support</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Travel Security Protocols</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Route Planning & Security</div>
                        <div className="text-slate-400 text-sm">AI-optimized safe travel routes</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Airport & Ground Security</div>
                        <div className="text-slate-400 text-sm">VIP security protocols and coordination</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Accommodation Security</div>
                        <div className="text-slate-400 text-sm">Hotel and residence security assessments</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Medical Emergency Response</div>
                        <div className="text-slate-400 text-sm">International medical evacuation planning</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Current Travel Status</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 font-medium text-sm">CEO - New York Business Trip</div>
                        <div className="text-slate-400 text-xs">Departing in 2 hours - All security protocols active</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="text-blue-400 font-medium text-sm">CFO - London Conference</div>
                        <div className="text-slate-400 text-xs">Travel security team deployed - 24/7 monitoring</div>
                      </div>
                      <div className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="text-yellow-400 font-medium text-sm">CTO - Tokyo Tech Summit</div>
                        <div className="text-slate-400 text-xs">Enhanced security measures - High-threat region</div>
                      </div>
                    </div>
                  </div>
                </div>
              </ExecutiveProtectionGlassCard>
            </motion.div>
          )}

          {activeSection === 'crisis-management' && (
            <motion.div
              key="crisis-management"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Executive Crisis Management Center */}
              <ExecutiveProtectionGlassCard title="Executive Crisis Management Center" icon={AlertTriangle} status="STANDBY">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">12</div>
                    <div className="text-sm text-slate-400">Crisis Response Teams</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">98%</div>
                    <div className="text-sm text-slate-400">Resolution Success</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">{`< 15min`}</div>
                    <div className="text-sm text-slate-400">Response Time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Crisis Response Playbooks</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Executive Kidnapping Response</div>
                        <div className="text-slate-400 text-sm">Immediate action protocols and negotiation support</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Cyber Extortion Crisis</div>
                        <div className="text-slate-400 text-sm">Ransomware and data breach response coordination</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Reputational Crisis Management</div>
                        <div className="text-slate-400 text-sm">Media relations and reputation protection</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Medical Emergency Protocols</div>
                        <div className="text-slate-400 text-sm">Medical evacuation and emergency medical support</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Emergency Communication</h4>
                    <div className="space-y-3">
                      <div className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="text-white font-medium mb-2">Emergency Contact Network</div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Security Operations:</span>
                            <span className="text-green-400 font-medium">24/7 Active</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Legal Counsel:</span>
                            <span className="text-blue-400 font-medium">On Standby</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">Medical Support:</span>
                            <span className="text-purple-400 font-medium">Ready</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-400">PR Team:</span>
                            <span className="text-orange-400 font-medium">Available</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm">
                          Activate Crisis Mode
                        </button>
                        <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
                          Test Communications
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ExecutiveProtectionGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ExecutiveProtectionSuite;
