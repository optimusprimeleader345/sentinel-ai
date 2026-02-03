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
  HeartHandshake,
  MessageCircle,
  ShieldX,
  UserPlus,
  UserMinus,
  AlertTriangle as AlertIcon,
  TrendingUp as UpIcon,
  TrendingDown as DownIcon
} from 'lucide-react';

// 🛡️ CUSTOMER SAFETY DASHBOARD - SUPER ADMIN ONLY
// PEOPLE-CENTRIC CYBERSECURITY - USER PROTECTION & SAFETY MONITORING
// COMPREHENSIVE CUSTOMER SAFETY MANAGEMENT PLATFORM

const CustomerSafetyDashboard = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-900 via-purple-950 to-purple-950 flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-20"
        >
          <div className="bg-purple-800/80 backdrop-blur-xl border border-purple-600/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-purple-200 mb-6">
              This is a Customer Safety Dashboard. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-purple-300">
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
  const [activeSection, setActiveSection] = useState('safety-overview');
  const [selectedUser, setSelectedUser] = useState(null);
  const [safetyData, setSafetyData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [safetyAssessments, setSafetyAssessments] = useState([]);
  const [interventionActions, setInterventionActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 📊 ANALYTICS DATA
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

  // Customer Safety Risk Categories
  const safetyRiskCategories = [
    {
      id: 'account',
      name: 'Account Safety Risk',
      icon: ShieldCheck,
      level: 'HIGH',
      score: 78,
      trend: 'increasing',
      description: 'Abnormal login patterns, location anomalies',
      protection: 'Real-time behavior monitoring',
      color: 'purple'
    },
    {
      id: 'phishing',
      name: 'Phishing Victim Risk',
      icon: AlertTriangle,
      level: 'MEDIUM',
      score: 65,
      trend: 'decreasing',
      description: 'Susceptibility to phishing attacks',
      protection: 'AI-assisted detection',
      color: 'orange'
    },
    {
      id: 'credential',
      name: 'Credential Reuse Risk',
      icon: Lock,
      level: 'HIGH',
      score: 72,
      trend: 'stable',
      description: 'Weak password practices, reuse patterns',
      protection: 'Password strength monitoring',
      color: 'red'
    },
    {
      id: 'insider',
      name: 'Insider Threat Risk',
      icon: Eye,
      level: 'LOW',
      score: 38,
      trend: 'stable',
      description: 'Unauthorized access, privilege misuse',
      protection: 'Read-only monitoring',
      color: 'blue'
    },
    {
      id: 'behavior',
      name: 'Unsafe Behavior Risk',
      icon: AlertCircle,
      level: 'MEDIUM',
      score: 58,
      trend: 'decreasing',
      description: 'Risky online behavior patterns',
      protection: 'Behavioral analysis',
      color: 'yellow'
    },
    {
      id: 'training',
      name: 'Training Gap Risk',
      icon: UserCog,
      level: 'MEDIUM',
      score: 64,
      trend: 'improving',
      description: 'Lack of security awareness',
      protection: 'Automated training recommendations',
      color: 'green'
    }
  ];

  // 🎯 SAFETY GLASS CARD COMPONENT
  const SafetyGlassCard = ({ children, title, icon: Icon, status, riskLevel, className = "" }) => (
    <div className={`bg-[#1a1033]/90 border border-purple-700/60 rounded-xl p-6 text-purple-200 shadow-[0_0_30px_rgba(139,92,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] text-purple-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {riskLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                'bg-green-500/20 text-green-400 border-green-500/40'
              }`}>
                {riskLevel}
              </span>
            )}
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                status === 'PROTECTED' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
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

  // 📊 MAIN CUSTOMER SAFETY DASHBOARD INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-violet-900 to-purple-800 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/40 to-violet-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/35 to-purple-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-violet-400/30 rounded-full blur-3xl"></div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <HeartHandshake className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 via-purple-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm">
                Customer Safety Dashboard
              </h1>
              <p className="text-purple-200/80 text-sm font-medium">People-Centric Cybersecurity - User Protection & Safety Monitoring</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">AI Safety Models Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-violet-400 animate-pulse" />
                  <span className="text-xs text-slate-300">People-First Protection</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-xs text-slate-300">2,847 Users Protected</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-purple-800/60 backdrop-blur-xl border border-purple-600/30 rounded-lg p-3">
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
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Safety Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Customer Safety Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-purple-800/60 backdrop-blur-xl border border-purple-600/30 rounded-xl p-2">
          {[
            { id: 'safety-overview', label: 'Safety Overview', icon: BarChart3 },
            { id: 'account-monitor', label: 'Account Monitor', icon: ShieldCheck },
            { id: 'ai-risk-detection', label: 'AI Risk Detection', icon: Brain },
            { id: 'insider-prevention', label: 'Insider Prevention', icon: Eye },
            { id: 'intervention-panel', label: 'Intervention Panel', icon: ShieldAlert },
            { id: 'safety-alerts', label: 'Safety Alerts', icon: Bell },
            { id: 'safety-metrics', label: 'Safety Metrics', icon: TrendingUp }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-purple-700/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'safety-overview' && (
            <motion.div
              key="safety-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Customer Safety Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SafetyGlassCard title="Users Protected" icon={ShieldCheck} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">2,847</div>
                    <div className="text-sm text-slate-400">Active Safety Monitoring</div>
                    <div className="text-xs text-green-400 mt-2">+12% from last week</div>
                  </div>
                </SafetyGlassCard>

                <SafetyGlassCard title="High Risk Users" icon={AlertTriangle} riskLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">23</div>
                    <div className="text-sm text-slate-400">Immediate Attention</div>
                    <div className="text-xs text-red-400 mt-2">-3 from yesterday</div>
                  </div>
                </SafetyGlassCard>

                <SafetyGlassCard title="Safety Interventions" icon={ShieldCheck} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">156</div>
                    <div className="text-sm text-slate-400">This Month</div>
                    <div className="text-xs text-blue-400 mt-2">94% success rate</div>
                  </div>
                </SafetyGlassCard>

                <SafetyGlassCard title="AI Confidence" icon={Brain} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">92%</div>
                    <div className="text-sm text-slate-400">Detection Accuracy</div>
                    <div className="text-xs text-green-400 mt-2">+1% from last week</div>
                  </div>
                </SafetyGlassCard>
              </div>

              {/* Safety Risk Categories Overview */}
              <SafetyGlassCard title="Customer Safety Risk Categories Overview" icon={Layers} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {safetyRiskCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedUser === category.id
                            ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                            : 'border-purple-700/50 bg-purple-800/30 hover:border-purple-600/50'
                        }`}
                        onClick={() => setSelectedUser(selectedUser === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]`} />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{category.name}</h4>
                            <div className={`text-xs ${
                              category.level === 'CRITICAL' ? 'text-red-400' :
                              category.level === 'HIGH' ? 'text-orange-400' :
                              category.level === 'MEDIUM' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {category.level} RISK
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Score:</span>
                            <span className="text-white font-medium">{category.score}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Trend:</span>
                            <span className={`font-medium ${
                              category.trend === 'increasing' ? 'text-red-400' :
                              category.trend === 'decreasing' ? 'text-green-400' :
                              category.trend === 'improving' ? 'text-blue-400' :
                              'text-yellow-400'
                            }`}>
                              {category.trend.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </SafetyGlassCard>

              {/* Real-time Safety Alerts */}
              <SafetyGlassCard title="Real-time Customer Safety Alerts & Notifications" icon={Radio} status="ACTIVE">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { id: 1, type: 'critical', title: 'Account Takeover Risk Detected', message: 'Unusual login from new location for user john.doe@company.com', time: '2 minutes ago', severity: 'critical', user: 'john.doe@company.com' },
                    { id: 2, type: 'warning', title: 'Phishing Susceptibility Alert', message: 'User clicked suspicious link - training recommended', time: '15 minutes ago', severity: 'high', user: 'sarah.smith@company.com' },
                    { id: 3, type: 'info', title: 'Password Reset Recommended', message: 'Weak password detected - 6 months since last change', time: '1 hour ago', severity: 'medium', user: 'mike.johnson@company.com' },
                    { id: 4, type: 'success', title: 'Safety Intervention Successful', message: 'User completed security training - risk reduced by 40%', time: '2 hours ago', severity: 'low', user: 'lisa.brown@company.com' }
                  ].map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border ${
                        alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                        alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                        alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-green-500/10 border-green-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            alert.severity === 'critical' ? 'bg-red-400' :
                            alert.severity === 'high' ? 'bg-orange-400' :
                            alert.severity === 'medium' ? 'bg-yellow-400' :
                            'bg-green-400'
                          }`}></div>
                          <div>
                            <div className="text-white font-medium text-sm">{alert.title}</div>
                            <div className="text-slate-400 text-xs">{alert.message}</div>
                            <div className="text-purple-400 text-xs font-medium mt-1">{alert.user}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400 text-xs">{alert.time}</div>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SafetyGlassCard>
            </motion.div>
          )}

          {activeSection === 'account-monitor' && (
            <motion.div
              key="account-monitor"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Account Safety Monitoring Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SafetyGlassCard title="Login Anomaly Detection" icon={ShieldCheck} status="ACTIVE">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Suspicious Logins</span>
                      <span className="text-red-400 font-bold">7</span>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-2 bg-red-500/10 border border-red-500/30 rounded">
                        <div className="text-red-400 font-bold text-sm">4</div>
                        <div className="text-xs text-slate-400">Blocked</div>
                      </div>
                      <div className="p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                        <div className="text-orange-400 font-bold text-sm">3</div>
                        <div className="text-xs text-slate-400">Flagged</div>
                      </div>
                    </div>
                  </div>
                </SafetyGlassCard>

                <SafetyGlassCard title="Location Monitoring" icon={MapPin} status="TRACKING">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Location Anomalies</span>
                      <span className="text-orange-400 font-bold">12</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3 p-2 bg-slate-800/50 rounded">
                        <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-white text-xs">New York → Tokyo</div>
                          <div className="text-slate-400 text-xs">john.doe@company.com</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3 p-2 bg-slate-800/50 rounded">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <div className="flex-1">
                          <div className="text-white text-xs">London → Unknown</div>
                          <div className="text-slate-400 text-xs">sarah.smith@company.com</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </SafetyGlassCard>

                <SafetyGlassCard title="Session Monitoring" icon={Activity} status="WATCHING">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Active Sessions</span>
                      <span className="text-green-400 font-bold">1,247</span>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Normal:</span>
                        <span className="text-green-400">1,203</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Suspicious:</span>
                        <span className="text-orange-400">32</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Blocked:</span>
                        <span className="text-red-400">12</span>
                      </div>
                    </div>
                    <button className="w-full px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors">
                      View All Sessions
                    </button>
                  </div>
                </SafetyGlassCard>
              </div>

              {/* Account Safety Heatmap */}
              <SafetyGlassCard title="Customer Account Safety Heatmap" icon={Map} status="LIVE">
                <div className="space-y-4">
                  {/* Heatmap Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <select className="px-3 py-2 bg-purple-700/50 border border-purple-600/50 rounded text-white text-sm">
                        <option>Risk Level View</option>
                        <option>Location Anomalies</option>
                        <option>Login Patterns</option>
                        <option>Session Activity</option>
                      </select>

                      <select className="px-3 py-2 bg-purple-700/50 border border-purple-600/50 rounded text-white text-sm">
                        <option>Last 24 Hours</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                        <option>All Time</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-purple-700/50 hover:bg-purple-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-purple-700/50 hover:bg-purple-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-purple-700/50 hover:bg-purple-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Safety Heatmap Visualization */}
                  <div className="h-96 bg-purple-900/50 rounded-lg border border-purple-700/50 relative overflow-hidden">
                    {/* Simulated Safety Heatmap Grid */}
                    <div className="grid grid-cols-12 grid-rows-8 gap-1 p-4 h-full">
                      {Array.from({ length: 96 }).map((_, index) => {
                        const riskLevel = Math.floor(Math.random() * 4) + 1; // 1-4 scale
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.01 }}
                            className={`rounded cursor-pointer hover:scale-110 transition-transform ${
                              riskLevel === 1 ? 'bg-green-500/60 hover:bg-green-500/80' :
                              riskLevel === 2 ? 'bg-yellow-500/60 hover:bg-yellow-500/80' :
                              riskLevel === 3 ? 'bg-orange-500/60 hover:bg-orange-500/80' :
                              'bg-red-500/60 hover:bg-red-500/80'
                            }`}
                            title={`Safety Level: ${riskLevel}/4`}
                          />
                        );
                      })}
                    </div>

                    {/* Safety Heatmap Legend */}
                    <div className="absolute bottom-4 left-4 bg-purple-800/90 backdrop-blur rounded-lg p-3">
                      <div className="text-white font-medium text-sm mb-2">Safety Levels</div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-slate-300">Safe</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span className="text-slate-300">Monitor</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span className="text-slate-300">Caution</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span className="text-slate-300">Critical</span>
                        </div>
                      </div>
                    </div>

                    {/* Critical Safety Alert */}
                    <div className="absolute top-8 right-8 bg-red-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                      <div className="text-white text-xs font-medium">CRITICAL SAFETY RISK</div>
                      <div className="text-red-200 text-xs">Account: john.doe@company.com</div>
                    </div>
                  </div>

                  {/* Safety Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="text-green-400 font-bold">67%</div>
                      <div className="text-xs text-slate-400">Safe Accounts</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="text-yellow-400 font-bold">23%</div>
                      <div className="text-xs text-slate-400">Monitor Required</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                      <div className="text-orange-400 font-bold">8%</div>
                      <div className="text-xs text-slate-400">Caution Needed</div>
                    </div>
                    <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="text-red-400 font-bold">2%</div>
                      <div className="text-xs text-slate-400">Critical Risk</div>
                    </div>
                  </div>
                </div>
              </SafetyGlassCard>
            </motion.div>
          )}

          {activeSection === 'ai-risk-detection' && (
            <motion.div
              key="ai-risk-detection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI-Assisted User Harm Risk Detection */}
              <SafetyGlassCard title="AI-Assisted User Harm Risk Detection" icon={Brain} status="ANALYZING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">94%</div>
                    <div className="text-sm text-slate-400">AI Detection Accuracy</div>
                  </div>
                  <div className="text-center p-6 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                    <ShieldCheck className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-violet-400 mb-1">1,247</div>
                    <div className="text-sm text-slate-400">Users Analyzed</div>
                  </div>
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-cyan-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">High-Risk Users</div>
                  </div>
                </div>

                {/* AI Risk Detection Insights */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">AI Risk Detection Insights</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">AI Analysis Active</span>
                    </div>
                  </div>

                  {/* Risk Detection Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        risk: 'Phishing Victimization',
                        probability: 78,
                        user: 'sarah.smith@company.com',
                        indicators: ['Clicked suspicious link', 'Downloaded unknown file', 'Shared credentials'],
                        recommendation: 'Immediate security training required',
                        color: 'red'
                      },
                      {
                        risk: 'Credential Reuse',
                        probability: 65,
                        user: 'mike.johnson@company.com',
                        indicators: ['Same password across 5+ sites', 'Weak password pattern', 'No 2FA enabled'],
                        recommendation: 'Password reset and MFA enforcement',
                        color: 'orange'
                      },
                      {
                        risk: 'Unsafe Behavior Patterns',
                        probability: 82,
                        user: 'lisa.brown@company.com',
                        indicators: ['Frequent risky downloads', 'Unknown USB devices', 'Bypassed security warnings'],
                        recommendation: 'Behavioral security training',
                        color: 'red'
                      },
                      {
                        risk: 'Training Gap Identified',
                        probability: 45,
                        user: 'tom.wilson@company.com',
                        indicators: ['Outdated training completion', 'Failed security quizzes', 'No recent awareness activities'],
                        recommendation: 'Refresher training recommended',
                        color: 'yellow'
                      }
                    ].map((detection, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        className={`relative p-6 rounded-xl border backdrop-blur-xl hover:scale-105 transition-all duration-300 ${
                          detection.color === 'red' ? 'bg-red-500/10 border-red-500/30' :
                          detection.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30' :
                          detection.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}
                      >
                        {/* Glow Effect */}
                        <div className={`absolute inset-0 rounded-xl opacity-30 blur-xl ${
                          detection.color === 'red' ? 'bg-red-500/20' :
                          detection.color === 'orange' ? 'bg-orange-500/20' :
                          detection.color === 'yellow' ? 'bg-yellow-500/20' :
                          'bg-green-500/20'
                        }`}></div>

                        <div className="relative z-10">
                          {/* Header */}
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h5 className="text-white font-semibold text-sm">{detection.risk}</h5>
                              <p className="text-purple-400 text-xs font-medium">{detection.user}</p>
                            </div>
                            <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                              detection.color === 'red' ? 'bg-red-500/20 text-red-400' :
                              detection.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                              detection.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {detection.probability}% Risk
                            </div>
                          </div>

                          {/* Indicators */}
                          <div className="mb-4">
                            <div className="text-slate-400 text-xs mb-2">Risk Indicators:</div>
                            <div className="space-y-1">
                              {detection.indicators.map((indicator, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                  <div className={`w-1.5 h-1.5 rounded-full ${
                                    detection.color === 'red' ? 'bg-red-400' :
                                    detection.color === 'orange' ? 'bg-orange-400' :
                                    detection.color === 'yellow' ? 'bg-yellow-400' :
                                    'bg-green-400'
                                  }`}></div>
                                  <span className="text-slate-300 text-xs">{indicator}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Recommendation */}
                          <div className="mb-4">
                            <div className="text-slate-400 text-xs mb-1">AI Recommendation:</div>
                            <div className="text-white text-xs bg-purple-500/10 border border-purple-500/30 rounded px-3 py-2">
                              {detection.recommendation}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-2">
                            <button className={`flex-1 px-3 py-2 text-xs font-medium rounded transition-colors ${
                              detection.color === 'red' ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' :
                              detection.color === 'orange' ? 'bg-orange-500/20 hover:bg-orange-500/30 text-orange-400' :
                              detection.color === 'yellow' ? 'bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400' :
                              'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                            }`}>
                              View Details
                            </button>
                            <button className="px-3 py-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 text-xs font-medium rounded transition-colors">
                              Intervene
                            </button>
                          </div>

                          {/* Hover Effect Border */}
                          <div className={`absolute inset-0 rounded-xl border-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                            detection.color === 'red' ? 'border-red-400/50' :
                            detection.color === 'orange' ? 'border-orange-400/50' :
                            detection.color === 'yellow' ? 'border-yellow-400/50' :
                            'border-green-400/50'
                          }`}></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* AI Detection Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-purple-800/30 rounded-lg border border-purple-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400 mb-1">3</div>
                      <div className="text-sm text-slate-400">Critical Risks</div>
                      <div className="text-xs text-slate-500">Immediate Action</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400 mb-1">5</div>
                      <div className="text-sm text-slate-400">High Risks</div>
                      <div className="text-xs text-slate-500">Monitor Closely</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">8</div>
                      <div className="text-sm text-slate-400">Medium Risks</div>
                      <div className="text-xs text-slate-500">Training Needed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">67%</div>
                      <div className="text-sm text-slate-400">Avg Confidence</div>
                      <div className="text-xs text-slate-500">AI Predictions</div>
                    </div>
                  </div>
                </div>
              </SafetyGlassCard>
            </motion.div>
          )}

          {/* Add more sections for the remaining features... */}
          {activeSection === 'insider-prevention' && (
            <motion.div
              key="insider-prevention"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <SafetyGlassCard title="Insider Risk & Misuse Prevention (READ-ONLY)" icon={Eye} status="MONITORING">
                <div className="text-center py-12">
                  <Eye className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Read-Only Monitoring Active</h3>
                  <p className="text-slate-400 mb-6">Insider risk prevention through policy-based monitoring only. No surveillance or spying.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-green-400 font-medium text-sm">Policy-Based</div>
                      <div className="text-slate-400 text-xs">Only monitors defined policies</div>
                    </div>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Shield className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-blue-400 font-medium text-sm">Non-Invasive</div>
                      <div className="text-slate-400 text-xs">No personal data collection</div>
                    </div>
                    <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <Heart className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-purple-400 font-medium text-sm">People-First</div>
                      <div className="text-slate-400 text-xs">Focuses on protection, not guilt</div>
                    </div>
                  </div>
                </div>
              </SafetyGlassCard>
            </motion.div>
          )}

          {activeSection === 'intervention-panel' && (
            <motion.div
              key="intervention-panel"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <SafetyGlassCard title="Customer Safety Intervention Panel" icon={ShieldAlert} status="REQUIRES APPROVAL">
                <div className="text-center py-12">
                  <ShieldAlert className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Human Approval Required</h3>
                  <p className="text-slate-400 mb-6">All safety interventions require explicit Super Admin approval. No automated actions.</p>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                    <button className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg hover:bg-purple-500/20 transition-colors">
                      <MessageSquare className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-purple-400 font-medium text-sm">Send Warning</div>
                      <div className="text-slate-400 text-xs">Safety notification</div>
                    </button>
                    <button className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg hover:bg-blue-500/20 transition-colors">
                      <Lock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-blue-400 font-medium text-sm">Reset Password</div>
                      <div className="text-slate-400 text-xs">Force reset recommendation</div>
                    </button>
                    <button className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg hover:bg-green-500/20 transition-colors">
                      <ShieldCheck className="w-8 h-8 text-green-400 mx-auto mb-2" />
                      <div className="text-green-400 font-medium text-sm">Enforce MFA</div>
                      <div className="text-slate-400 text-xs">Require 2FA setup</div>
                    </button>
                    <button className="p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg hover:bg-orange-500/20 transition-colors">
                      <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                      <div className="text-orange-400 font-medium text-sm">Restrict Access</div>
                      <div className="text-slate-400 text-xs">Temporary limitations</div>
                    </button>
                  </div>
                </div>
              </SafetyGlassCard>
            </motion.div>
          )}

          {activeSection === 'safety-alerts' && (
            <motion.div
              key="safety-alerts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <SafetyGlassCard title="Customer Safety Alerts & Communication" icon={Bell} status="ACTIVE">
                <div className="text-center py-12">
                  <Bell className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Automated Safety Communications</h3>
                  <p className="text-slate-400 mb-6">Human-readable safety alerts and guidance messages for at-risk users.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                      <Mail className="w-10 h-10 text-cyan-400 mx-auto mb-3" />
                      <div className="text-cyan-400 font-medium text-sm mb-2">Email Notifications</div>
                      <div className="text-slate-400 text-xs">Automated safety alerts</div>
                    </div>
                    <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <MessageSquare className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                      <div className="text-purple-400 font-medium text-sm mb-2">In-App Messages</div>
                      <div className="text-slate-400 text-xs">Dashboard notifications</div>
                    </div>
                    <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <UserCheck className="w-10 h-10 text-green-400 mx-auto mb-3" />
                      <div className="text-green-400 font-medium text-sm mb-2">Stakeholder Alerts</div>
                      <div className="text-slate-400 text-xs">Manager notifications</div>
                    </div>
                  </div>
                </div>
              </SafetyGlassCard>
            </motion.div>
          )}

          {activeSection === 'safety-metrics' && (
            <motion.div
              key="safety-metrics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <SafetyGlassCard title="People Safety Metrics (Board-Level)" icon={TrendingUp} status="EXECUTIVE">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <ShieldCheck className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">2,847</div>
                    <div className="text-sm text-slate-400">Users Protected</div>
                    <div className="text-xs text-green-400 mt-2">+12% this week</div>
                  </div>
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <TrendingDown className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">High-Risk Users</div>
                    <div className="text-xs text-green-400 mt-2">-15% reduction</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <ShieldCheck className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Interventions Taken</div>
                    <div className="text-xs text-blue-400 mt-2">94% success rate</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">87%</div>
                    <div className="text-sm text-slate-400">Awareness Improvement</div>
                    <div className="text-xs text-purple-400 mt-2">+5% this quarter</div>
                  </div>
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-white mb-2">Executive Safety Dashboard</h3>
                  <p className="text-slate-400">Board-level metrics demonstrating responsible cybersecurity leadership</p>
                </div>
              </SafetyGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerSafetyDashboard;
