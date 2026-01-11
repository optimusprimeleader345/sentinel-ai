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
  RefreshCw as UpdateIcon
} from 'lucide-react';

// 🛡️ ENTERPRISE RISK MANAGEMENT AI - SUPER ADMIN ONLY
// ADVANCED AI-POWERED ENTERPRISE RISK ASSESSMENT & PREDICTIVE ANALYTICS
// COMPREHENSIVE RISK MODELING - STRATEGIC RISK MITIGATION PLATFORM

const EnterpriseRiskManagementAI = () => {
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
              This is an Enterprise Risk Management AI Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('risk-overview');
  const [selectedRisk, setSelectedRisk] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [riskAssessments, setRiskAssessments] = useState([]);
  const [mitigationActions, setMitigationActions] = useState([]);
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

  // Enterprise Risk Categories
  const riskCategories = [
    {
      id: 'cyber',
      name: 'Cybersecurity Risk',
      icon: Shield,
      level: 'HIGH',
      score: 85,
      trend: 'increasing',
      description: 'Network security, data breaches, cyber attacks',
      mitigation: 'Advanced threat detection, zero-trust architecture',
      color: 'red'
    },
    {
      id: 'operational',
      name: 'Operational Risk',
      icon: Settings,
      level: 'MEDIUM',
      score: 72,
      trend: 'stable',
      description: 'Process failures, system outages, human error',
      mitigation: 'Process automation, employee training',
      color: 'orange'
    },
    {
      id: 'financial',
      name: 'Financial Risk',
      icon: DollarSign,
      level: 'MEDIUM',
      score: 68,
      trend: 'decreasing',
      description: 'Market volatility, liquidity issues, fraud',
      mitigation: 'Diversification, risk hedging strategies',
      color: 'yellow'
    },
    {
      id: 'compliance',
      name: 'Compliance Risk',
      icon: FileCheck,
      level: 'HIGH',
      score: 78,
      trend: 'increasing',
      description: 'Regulatory violations, audit failures',
      mitigation: 'Automated compliance monitoring',
      color: 'purple'
    },
    {
      id: 'reputational',
      name: 'Reputational Risk',
      icon: Users,
      level: 'LOW',
      score: 45,
      trend: 'stable',
      description: 'Brand damage, stakeholder trust issues',
      mitigation: 'Crisis communication planning',
      color: 'blue'
    },
    {
      id: 'strategic',
      name: 'Strategic Risk',
      icon: Target,
      level: 'MEDIUM',
      score: 62,
      trend: 'stable',
      description: 'Market changes, competitive threats',
      mitigation: 'Strategic planning, market intelligence',
      color: 'green'
    }
  ];

  // 🎯 RISK GLASS CARD COMPONENT
  const RiskGlassCard = ({ children, title, icon: Icon, status, riskLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(34,197,94,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] text-green-400`} />}
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

  // 📊 MAIN ENTERPRISE RISK MANAGEMENT AI INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-green-900 via-emerald-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-green-500/40 to-emerald-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-emerald-600/35 to-teal-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/30 to-green-400/30 rounded-full blur-3xl"></div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 via-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-2xl shadow-green-500/30">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-300 via-emerald-300 via-teal-200 to-cyan-200 bg-clip-text text-transparent drop-shadow-sm">
                Enterprise Risk Management AI
              </h1>
              <p className="text-green-200/80 text-sm font-medium">Advanced AI-Powered Enterprise Risk Assessment & Predictive Analytics</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">AI Risk Models Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AIIcon className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Predictive Analytics Running</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-teal-400 animate-pulse" />
                  <span className="text-xs text-slate-300">247 Risk Assessments</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-green-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Risk Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Risk Management Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'risk-overview', label: 'Risk Overview', icon: BarChart3 },
            { id: 'risk-assessment', label: 'Risk Assessment', icon: Target },
            { id: 'predictive-analytics', label: 'Predictive Analytics', icon: Brain },
            { id: 'mitigation-strategies', label: 'Mitigation Strategies', icon: Shield },
            { id: 'risk-reporting', label: 'Risk Reporting', icon: FileText }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 border border-green-500/30 shadow-lg shadow-green-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
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
          {activeSection === 'risk-overview' && (
            <motion.div
              key="risk-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enterprise Risk Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <RiskGlassCard title="Overall Risk Score" icon={Gauge} riskLevel="MEDIUM">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">72</div>
                    <div className="text-sm text-slate-400">Enterprise Risk Level</div>
                    <div className="text-xs text-green-400 mt-2">-3 points from last quarter</div>
                  </div>
                </RiskGlassCard>

                <RiskGlassCard title="Critical Risks" icon={AlertTriangle} riskLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">6</div>
                    <div className="text-sm text-slate-400">Immediate Attention</div>
                    <div className="text-xs text-orange-400 mt-2">2 escalated this week</div>
                  </div>
                </RiskGlassCard>

                <RiskGlassCard title="Risk Assessments" icon={FileCheck} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">247</div>
                    <div className="text-sm text-slate-400">Completed Assessments</div>
                    <div className="text-xs text-blue-400 mt-2">94% completion rate</div>
                  </div>
                </RiskGlassCard>

                <RiskGlassCard title="AI Confidence" icon={Brain} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">91%</div>
                    <div className="text-sm text-slate-400">Prediction Accuracy</div>
                    <div className="text-xs text-green-400 mt-2">+2% from last month</div>
                  </div>
                </RiskGlassCard>
              </div>

              {/* Risk Category Overview */}
              <RiskGlassCard title="Enterprise Risk Categories Overview" icon={Layers} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {riskCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedRisk === category.id
                            ? 'border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                        }`}
                        onClick={() => setSelectedRisk(selectedRisk === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.4)]`} />
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
              </RiskGlassCard>

              {/* Real-time Risk Alerts */}
              <RiskGlassCard title="Real-time Risk Alerts & Notifications" icon={Radio} status="ACTIVE">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { id: 1, type: 'critical', title: 'Critical Cybersecurity Risk Detected', message: 'Advanced persistent threat targeting critical infrastructure', time: '2 minutes ago', severity: 'critical' },
                    { id: 2, type: 'warning', title: 'Compliance Risk Escalation', message: 'GDPR compliance gaps identified in data processing', time: '15 minutes ago', severity: 'high' },
                    { id: 3, type: 'info', title: 'Risk Assessment Completed', message: 'Q1 enterprise risk assessment finalized with 74% score', time: '1 hour ago', severity: 'medium' },
                    { id: 4, type: 'success', title: 'Risk Mitigation Successful', message: 'Operational risk reduced by 15% through process improvements', time: '2 hours ago', severity: 'low' }
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
              </RiskGlassCard>
            </motion.div>
          )}

          {activeSection === 'risk-assessment' && (
            <motion.div
              key="risk-assessment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Risk Assessment Templates & Tools */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <RiskGlassCard title="Assessment Templates" icon={FileCheck} status="READY">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-left transition-colors">
                        <div className="text-blue-400 font-medium text-sm">NIST Cybersecurity Framework</div>
                        <div className="text-slate-400 text-xs">Comprehensive security assessment</div>
                      </button>
                      <button className="w-full p-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-left transition-colors">
                        <div className="text-green-400 font-medium text-sm">ISO 27001 Compliance</div>
                        <div className="text-slate-400 text-xs">Information security management</div>
                      </button>
                      <button className="w-full p-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-left transition-colors">
                        <div className="text-purple-400 font-medium text-sm">COBIT 2019 Framework</div>
                        <div className="text-slate-400 text-xs">Governance and risk management</div>
                      </button>
                    </div>
                  </div>
                </RiskGlassCard>

                <RiskGlassCard title="Assessment Types" icon={Target} status="AVAILABLE">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => setLoading(false), 3000);
                        }}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        <span>{loading ? 'Running Assessment...' : 'Start Full Assessment'}</span>
                      </button>

                      <button
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => setLoading(false), 1500);
                        }}
                        disabled={loading}
                        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Quick Risk Scan</span>
                      </button>

                      <button className="w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Custom Assessment</span>
                      </button>
                    </div>
                  </div>
                </RiskGlassCard>

                <RiskGlassCard title="Assessment Progress" icon={Activity} status="ACTIVE">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Current Assessment</span>
                        <span className="text-green-400 font-medium">78%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 font-bold text-lg">23</div>
                          <div className="text-xs text-slate-400">Controls</div>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 font-bold text-lg">18</div>
                          <div className="text-xs text-slate-400">Completed</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-slate-400 text-xs">Estimated completion: 12 min</div>
                      </div>
                    </div>
                  </div>
                </RiskGlassCard>
              </div>

              {/* Interactive Risk Assessment Form */}
              <RiskGlassCard title="Interactive Risk Assessment" icon={Calculator} status="IN PROGRESS">
                <div className="space-y-6">
                  {/* Assessment Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Asset Category</option>
                      <option>Network Infrastructure</option>
                      <option>Data Systems</option>
                      <option>Applications</option>
                      <option>Personnel</option>
                    </select>

                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Risk Type</option>
                      <option>Cybersecurity</option>
                      <option>Operational</option>
                      <option>Financial</option>
                      <option>Compliance</option>
                      <option>Reputational</option>
                    </select>

                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Impact Level</option>
                      <option>Critical</option>
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                    </select>

                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium">
                      Add Risk Factor
                    </button>
                  </div>

                  {/* Risk Assessment Questions */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Current Assessment Questions</h4>

                    {[
                      { question: "Are all critical systems patched within 30 days?", category: "Technical", score: 8 },
                      { question: "Is multi-factor authentication enabled enterprise-wide?", category: "Access Control", score: 6 },
                      { question: "Are security policies regularly reviewed and updated?", category: "Governance", score: 7 },
                      { question: "Is there a documented incident response plan?", category: "Operations", score: 9 },
                      { question: "Are employee security training programs active?", category: "Awareness", score: 5 }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h5 className="text-white font-medium text-sm">{item.question}</h5>
                            <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{item.category}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-slate-400">Score:</span>
                            <span className={`text-sm font-bold ${
                              item.score >= 8 ? 'text-green-400' :
                              item.score >= 6 ? 'text-yellow-400' :
                              'text-red-400'
                            }`}>
                              {item.score}/10
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <input
                            type="range"
                            min="1"
                            max="10"
                            value={item.score}
                            className="w-full h-2 bg-slate-600 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>1 - Very Low</span>
                            <span>5 - Moderate</span>
                            <span>10 - Very High</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Assessment Summary */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400 mb-1">8.2</div>
                      <div className="text-sm text-slate-400">Average Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">23</div>
                      <div className="text-sm text-slate-400">Total Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">78%</div>
                      <div className="text-sm text-slate-400">Completion Rate</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
                      Save Progress
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300">
                      Complete Assessment
                    </button>
                  </div>
                </div>
              </RiskGlassCard>

              {/* Risk Heat Map */}
              <RiskGlassCard title="Interactive Risk Heat Map" icon={Map} status="LIVE">
                <div className="space-y-4">
                  {/* Heat Map Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                        <option>Risk Level View</option>
                        <option>Impact View</option>
                        <option>Likelihood View</option>
                        <option>Overall Risk</option>
                      </select>

                      <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                        <option>All Departments</option>
                        <option>IT Security</option>
                        <option>Operations</option>
                        <option>Finance</option>
                        <option>HR</option>
                      </select>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded text-slate-400 hover:text-white transition-colors">
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Heat Map Visualization */}
                  <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 relative overflow-hidden">
                    {/* Simulated Heat Map Grid */}
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
                            title={`Risk Level: ${riskLevel}/4`}
                          />
                        );
                      })}
                    </div>

                    {/* Heat Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur rounded-lg p-3">
                      <div className="text-white font-medium text-sm mb-2">Risk Levels</div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-slate-300">Low</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span className="text-slate-300">Medium</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span className="text-slate-300">High</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span className="text-slate-300">Critical</span>
                        </div>
                      </div>
                    </div>

                    {/* Hotspot Indicator */}
                    <div className="absolute top-8 right-8 bg-red-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                      <div className="text-white text-xs font-medium">CRITICAL RISK</div>
                      <div className="text-red-200 text-xs">Server Room - 94%</div>
                    </div>
                  </div>

                  {/* Heat Map Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="text-green-400 font-bold">34%</div>
                      <div className="text-xs text-slate-400">Low Risk</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="text-yellow-400 font-bold">28%</div>
                      <div className="text-xs text-slate-400">Medium Risk</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                      <div className="text-orange-400 font-bold">23%</div>
                      <div className="text-xs text-slate-400">High Risk</div>
                    </div>
                    <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="text-red-400 font-bold">15%</div>
                      <div className="text-xs text-slate-400">Critical Risk</div>
                    </div>
                  </div>
                </div>
              </RiskGlassCard>

              {/* AI-Powered Risk Analysis */}
              <RiskGlassCard title="AI-Powered Risk Analysis" icon={Brain} status="ANALYZING">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">AI Risk Insights</h4>

                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Sparkles className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-medium text-sm">Pattern Detected</span>
                          </div>
                          <p className="text-slate-300 text-sm">Unusual login patterns detected in finance department. Potential insider threat risk increased by 23%.</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="w-4 h-4 text-yellow-400" />
                            <span className="text-yellow-400 font-medium text-sm">Trend Analysis</span>
                          </div>
                          <p className="text-slate-300 text-sm">Supply chain risks trending upward. Recommend enhanced vendor risk assessment protocols.</p>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-2 mb-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-medium text-sm">Mitigation Success</span>
                          </div>
                          <p className="text-slate-300 text-sm">Recent security training program reduced phishing susceptibility by 47%. Excellent ROI achieved.</p>
                        </motion.div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold">Risk Predictions</h4>

                      <div className="space-y-3">
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">Q2 Cyber Attack Risk</span>
                            <span className="text-red-400 font-bold">HIGH</span>
                          </div>
                          <div className="text-xs text-slate-400 mb-2">Probability: 72%</div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 }}
                          className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">Regulatory Compliance Risk</span>
                            <span className="text-yellow-400 font-bold">MEDIUM</span>
                          </div>
                          <div className="text-xs text-slate-400 mb-2">Probability: 45%</div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 }}
                          className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">Operational Disruption Risk</span>
                            <span className="text-orange-400 font-bold">HIGH</span>
                          </div>
                          <div className="text-xs text-slate-400 mb-2">Probability: 63%</div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '63%' }}></div>
                          </div>
                        </motion.div>
                      </div>

                      <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300">
                        Generate Detailed Report
                      </button>
                    </div>
                  </div>
                </div>
              </RiskGlassCard>
            </motion.div>
          )}

          {activeSection === 'predictive-analytics' && (
            <motion.div
              key="predictive-analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Predictive Risk Analytics */}
              <RiskGlassCard title="AI Predictive Risk Analytics" icon={Brain} status="PROCESSING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">91%</div>
                    <div className="text-sm text-slate-400">Prediction Accuracy</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">247</div>
                    <div className="text-sm text-slate-400">Risk Predictions Made</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <TrendingUp className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">15</div>
                    <div className="text-sm text-slate-400">Days Advance Warning</div>
                  </div>
                </div>

                {/* Enhanced Predictive Risk Scenarios - Professional Dashboard Design */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">Predicted Risk Scenarios</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">AI Predictions Active</span>
                    </div>
                  </div>

                  {/* Risk Scenarios Grid - Enhanced Visual Design */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        scenario: 'Cyber Attack Surge',
                        probability: 78,
                        impact: 'HIGH',
                        timeframe: 'Next 30 days',
                        icon: ShieldAlert,
                        color: 'red',
                        trend: 'rising',
                        description: 'Advanced persistent threats targeting enterprise networks'
                      },
                      {
                        scenario: 'Supply Chain Disruption',
                        probability: 65,
                        impact: 'MEDIUM',
                        timeframe: 'Next 60 days',
                        icon: Truck,
                        color: 'orange',
                        trend: 'stable',
                        description: 'Critical vendor dependencies and logistics challenges'
                      },
                      {
                        scenario: 'Regulatory Changes',
                        probability: 82,
                        impact: 'HIGH',
                        timeframe: 'Next 90 days',
                        icon: FileCheck,
                        color: 'red',
                        trend: 'rising',
                        description: 'New compliance requirements and policy changes'
                      },
                      {
                        scenario: 'Market Volatility',
                        probability: 45,
                        impact: 'LOW',
                        timeframe: 'Next 45 days',
                        icon: TrendingDown,
                        color: 'yellow',
                        trend: 'fluctuating',
                        description: 'Economic uncertainty and market fluctuations'
                      }
                    ].map((scenario, index) => {
                      const Icon = scenario.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                          className={`relative p-6 rounded-xl border backdrop-blur-xl hover:scale-105 transition-all duration-300 ${
                            scenario.color === 'red' ? 'bg-gradient-to-br from-red-500/10 to-red-900/20 border-red-500/30' :
                            scenario.color === 'orange' ? 'bg-gradient-to-br from-orange-500/10 to-orange-900/20 border-orange-500/30' :
                            scenario.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-900/20 border-yellow-500/30' :
                            'bg-gradient-to-br from-green-500/10 to-green-900/20 border-green-500/30'
                          }`}
                        >
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 rounded-xl opacity-30 blur-xl ${
                            scenario.color === 'red' ? 'bg-red-500/20' :
                            scenario.color === 'orange' ? 'bg-orange-500/20' :
                            scenario.color === 'yellow' ? 'bg-yellow-500/20' :
                            'bg-green-500/20'
                          }`}></div>

                          <div className="relative z-10">
                            {/* Header with Icon and Trend */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${
                                  scenario.color === 'red' ? 'bg-red-500/20' :
                                  scenario.color === 'orange' ? 'bg-orange-500/20' :
                                  scenario.color === 'yellow' ? 'bg-yellow-500/20' :
                                  'bg-green-500/20'
                                }`}>
                                  <Icon className={`w-5 h-5 ${
                                    scenario.color === 'red' ? 'text-red-400' :
                                    scenario.color === 'orange' ? 'text-orange-400' :
                                    scenario.color === 'yellow' ? 'text-yellow-400' :
                                    'text-green-400'
                                  }`} />
                                </div>
                                <div>
                                  <h5 className="text-white font-semibold text-sm">{scenario.scenario}</h5>
                                  <p className="text-slate-400 text-xs">{scenario.timeframe}</p>
                                </div>
                              </div>

                              {/* Trend Indicator */}
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                                scenario.trend === 'rising' ? 'bg-red-500/20 text-red-400' :
                                scenario.trend === 'stable' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-blue-500/20 text-blue-400'
                              }`}>
                                {scenario.trend === 'rising' && <TrendingUp className="w-3 h-3" />}
                                {scenario.trend === 'stable' && <Activity className="w-3 h-3" />}
                                {scenario.trend === 'fluctuating' && <BarChart3 className="w-3 h-3" />}
                                <span className="capitalize">{scenario.trend}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-slate-300 text-xs mb-4 leading-relaxed">{scenario.description}</p>

                            {/* Probability Visualization */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-xs font-medium">Probability</span>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-lg font-bold ${
                                    scenario.color === 'red' ? 'text-red-400' :
                                    scenario.color === 'orange' ? 'text-orange-400' :
                                    scenario.color === 'yellow' ? 'text-yellow-400' :
                                    'text-green-400'
                                  }`}>
                                    {scenario.probability}%
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    scenario.impact === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                                    scenario.impact === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                                    'bg-green-500/20 text-green-400'
                                  }`}>
                                    {scenario.impact}
                                  </span>
                                </div>
                              </div>

                              {/* Enhanced Progress Bar */}
                              <div className="relative">
                                <div className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${scenario.probability}%` }}
                                    transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }}
                                    className={`h-full rounded-full ${
                                      scenario.color === 'red' ? 'bg-gradient-to-r from-red-500 to-red-600' :
                                      scenario.color === 'orange' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
                                      scenario.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' :
                                      'bg-gradient-to-r from-green-500 to-green-600'
                                    }`}
                                  />
                                </div>

                                {/* Animated Glow */}
                                <div className={`absolute inset-0 rounded-full blur-sm opacity-50 ${
                                  scenario.color === 'red' ? 'bg-red-500/30' :
                                  scenario.color === 'orange' ? 'bg-orange-500/30' :
                                  scenario.color === 'yellow' ? 'bg-yellow-500/30' :
                                  'bg-green-500/30'
                                }`}></div>
                              </div>

                              {/* Risk Level Indicator */}
                              <div className="flex items-center justify-center space-x-1">
                                <span className="text-xs text-slate-400">Risk Level:</span>
                                <div className="flex space-x-1">
                                  {[...Array(5)].map((_, i) => (
                                    <div
                                      key={i}
                                      className={`w-2 h-2 rounded-full ${
                                        i < Math.ceil(scenario.probability / 20) ? (
                                          scenario.color === 'red' ? 'bg-red-400' :
                                          scenario.color === 'orange' ? 'bg-orange-400' :
                                          scenario.color === 'yellow' ? 'bg-yellow-400' :
                                          'bg-green-400'
                                        ) : 'bg-slate-600'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className={`absolute inset-0 rounded-xl border-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                              scenario.color === 'red' ? 'border-red-400/50' :
                              scenario.color === 'orange' ? 'border-orange-400/50' :
                              scenario.color === 'yellow' ? 'border-yellow-400/50' :
                              'border-green-400/50'
                            }`}></div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Risk Scenarios Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400 mb-1">3</div>
                      <div className="text-sm text-slate-400">High Risk</div>
                      <div className="text-xs text-slate-500">Immediate Action</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400 mb-1">1</div>
                      <div className="text-sm text-slate-400">Medium Risk</div>
                      <div className="text-xs text-slate-500">Monitor Closely</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">0</div>
                      <div className="text-sm text-slate-400">Low Risk</div>
                      <div className="text-xs text-slate-500">Under Control</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">67%</div>
                      <div className="text-sm text-slate-400">Avg Probability</div>
                      <div className="text-xs text-slate-500">Across Scenarios</div>
                    </div>
                  </div>
                </div>
              </RiskGlassCard>
            </motion.div>
          )}

          {activeSection === 'mitigation-strategies' && (
            <motion.div
              key="mitigation-strategies"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Risk Mitigation Strategies */}
              <RiskGlassCard title="AI-Generated Risk Mitigation Strategies" icon={Shield} status="OPTIMIZING">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">High-Impact Strategies</h4>
                    {[
                      { strategy: 'Zero-Trust Architecture Implementation', effectiveness: 92, cost: 'High', timeline: '6 months' },
                      { strategy: 'Advanced Threat Detection Enhancement', effectiveness: 88, cost: 'Medium', timeline: '3 months' },
                      { strategy: 'Employee Security Training Program', effectiveness: 76, cost: 'Low', timeline: '2 months' },
                      { strategy: 'Supply Chain Risk Monitoring', effectiveness: 84, cost: 'Medium', timeline: '4 months' }
                    ].map((strategy, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-white font-medium text-sm">{strategy.strategy}</h5>
                          <span className="text-green-400 font-bold">{strategy.effectiveness}%</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span>Cost: <span className={`font-medium ${
                            strategy.cost === 'High' ? 'text-red-400' :
                            strategy.cost === 'Medium' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>{strategy.cost}</span></span>
                          <span>Timeline: <span className="text-cyan-400 font-medium">{strategy.timeline}</span></span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Implementation Status</h4>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-green-400 font-medium">Completed Strategies</span>
                          <span className="text-green-400 font-bold">12</span>
                        </div>
                        <div className="text-xs text-slate-400">Successfully implemented mitigation measures</div>
                      </div>

                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-400 font-medium">In Progress</span>
                          <span className="text-blue-400 font-bold">8</span>
                        </div>
                        <div className="text-xs text-slate-400">Currently being implemented</div>
                      </div>

                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-yellow-400 font-medium">Planned</span>
                          <span className="text-yellow-400 font-bold">15</span>
                        </div>
                        <div className="text-xs text-slate-400">Ready for implementation</div>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
                      Generate New Strategies
                    </button>
                  </div>
                </div>
              </RiskGlassCard>
            </motion.div>
          )}

          {activeSection === 'risk-reporting' && (
            <motion.div
              key="risk-reporting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Risk Reporting Dashboard */}
              <RiskGlassCard title="Enterprise Risk Reporting Center" icon={FileText} status="GENERATING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <FileText className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">Reports Generated</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Users className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">47</div>
                    <div className="text-sm text-slate-400">Stakeholders</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">2.4h</div>
                    <div className="text-sm text-slate-400">Avg Generation Time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Available Reports</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Executive Risk Summary</div>
                        <div className="text-slate-400 text-sm">High-level risk overview for executives</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Detailed Risk Assessment</div>
                        <div className="text-slate-400 text-sm">Comprehensive risk analysis report</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Compliance Risk Report</div>
                        <div className="text-slate-400 text-sm">Regulatory compliance status</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Predictive Risk Forecast</div>
                        <div className="text-slate-400 text-sm">AI-generated risk predictions</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Report Generation</h4>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="text-white font-medium mb-2">Custom Report Builder</div>
                      <div className="space-y-3">
                        <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white">
                          <option>Select Report Type</option>
                          <option>Executive Summary</option>
                          <option>Detailed Analysis</option>
                          <option>Compliance Report</option>
                          <option>Risk Forecast</option>
                        </select>
                        <button className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </RiskGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnterpriseRiskManagementAI;
