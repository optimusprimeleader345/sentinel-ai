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
  RefreshCw as UpdateIcon
} from 'lucide-react';

// 🛡️ GLOBAL SUPPLY CHAIN SECURITY - SUPER ADMIN ONLY
// ADVANCED AI-POWERED SUPPLY CHAIN CYBER PROTECTION
// COMPREHENSIVE VENDOR RISK MANAGEMENT - END-TO-END SECURITY MONITORING

const GlobalSupplyChainSecurity = () => {
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
              This is a Global Supply Chain Security Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('supply-chain-overview');
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [supplyChainData, setSupplyChainData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [vendorAssessments, setVendorAssessments] = useState([]);
  const [mitigationActions, setMitigationActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 📊 SUPPLY CHAIN METRICS
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

  // Supply Chain Risk Categories
  const supplyChainRiskCategories = [
    {
      id: 'vendor-security',
      name: 'Vendor Security Risk',
      icon: Shield,
      level: 'HIGH',
      score: 78,
      trend: 'increasing',
      description: 'Third-party vendor security posture and compliance',
      mitigation: 'Enhanced vendor assessment protocols',
      color: 'red'
    },
    {
      id: 'supply-disruption',
      name: 'Supply Disruption Risk',
      icon: Truck,
      level: 'MEDIUM',
      score: 65,
      trend: 'stable',
      description: 'Logistics and supply chain interruptions',
      mitigation: 'Multi-vendor redundancy strategies',
      color: 'orange'
    },
    {
      id: 'data-leakage',
      name: 'Data Leakage Risk',
      icon: Database,
      level: 'HIGH',
      score: 82,
      trend: 'increasing',
      description: 'Sensitive data exposure through supply chain',
      mitigation: 'Zero-trust data access controls',
      color: 'red'
    },
    {
      id: 'compliance-gaps',
      name: 'Compliance Gaps',
      icon: FileCheck,
      level: 'MEDIUM',
      score: 71,
      trend: 'decreasing',
      description: 'Regulatory compliance across supply chain',
      mitigation: 'Automated compliance monitoring',
      color: 'yellow'
    },
    {
      id: 'geopolitical',
      name: 'Geopolitical Risk',
      icon: Globe,
      level: 'LOW',
      score: 43,
      trend: 'stable',
      description: 'International trade and political instability',
      mitigation: 'Geographic diversification',
      color: 'blue'
    },
    {
      id: 'cyber-attacks',
      name: 'Supply Chain Cyber Attacks',
      icon: Zap,
      level: 'HIGH',
      score: 89,
      trend: 'rising',
      description: 'Targeted attacks on supply chain infrastructure',
      mitigation: 'Advanced threat detection and response',
      color: 'red'
    }
  ];

  // 🎯 SUPPLY CHAIN GLASS CARD COMPONENT
  const SupplyChainGlassCard = ({ children, title, icon: Icon, status, riskLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] text-cyan-400`} />}
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

  // 📊 MAIN GLOBAL SUPPLY CHAIN SECURITY INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-900 via-blue-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/35 to-cyan-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full blur-3xl"></div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
                Global Supply Chain Security
              </h1>
              <p className="text-cyan-200/80 text-sm font-medium">Advanced AI-Powered Supply Chain Cyber Protection & Risk Management</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">AI Risk Models Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AIIcon className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Supply Chain Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs text-slate-300">1,247 Vendors Protected</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
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
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-cyan-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Chain Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Supply Chain Security Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'supply-chain-overview', label: 'Chain Overview', icon: BarChart3 },
            { id: 'vendor-assessment', label: 'Vendor Assessment', icon: Target },
            { id: 'threat-intelligence', label: 'Threat Intelligence', icon: Brain },
            { id: 'risk-mitigation', label: 'Risk Mitigation', icon: Shield },
            { id: 'compliance-monitoring', label: 'Compliance Monitoring', icon: FileText }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === section.id ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-700/30'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'supply-chain-overview' && (
            <motion.div
              key="supply-chain-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enterprise Supply Chain Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <SupplyChainGlassCard title="Overall Chain Risk" icon={Gauge} riskLevel="MEDIUM">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">71</div>
                    <div className="text-sm text-slate-400">Supply Chain Risk Level</div>
                    <div className="text-xs text-green-400 mt-2">-4 points from last quarter</div>
                  </div>
                </SupplyChainGlassCard>

                <SupplyChainGlassCard title="Critical Vendors" icon={AlertTriangle} riskLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">12</div>
                    <div className="text-sm text-slate-400">High Risk Vendors</div>
                    <div className="text-xs text-orange-400 mt-2">3 escalated this week</div>
                  </div>
                </SupplyChainGlassCard>

                <SupplyChainGlassCard title="Chain Visibility" icon={Eye} riskLevel="MEDIUM">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">89%</div>
                    <div className="text-sm text-slate-400">Supply Chain Visibility</div>
                    <div className="text-xs text-blue-400 mt-2">+5% from last month</div>
                  </div>
                </SupplyChainGlassCard>

                <SupplyChainGlassCard title="AI Confidence" icon={Brain} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">94%</div>
                    <div className="text-sm text-slate-400">Risk Prediction Accuracy</div>
                    <div className="text-xs text-green-400 mt-2">+3% from last quarter</div>
                  </div>
                </SupplyChainGlassCard>
              </div>

              {/* Supply Chain Risk Categories Overview */}
              <SupplyChainGlassCard title="Supply Chain Risk Categories Overview" icon={Layers} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {supplyChainRiskCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${selectedVendor === category.id ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'}`}
                        onClick={() => setSelectedVendor(selectedVendor === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]`} />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{category.name}</h4>
                            <div className={`text-xs ${category.level === 'CRITICAL' ? 'text-red-400' : category.level === 'HIGH' ? 'text-orange-400' : category.level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>
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
                            <span className={`font-medium ${category.trend === 'increasing' ? 'text-red-400' : category.trend === 'decreasing' ? 'text-green-400' : 'text-yellow-400'}`}>
                              {category.trend.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </SupplyChainGlassCard>

              {/* Real-time Supply Chain Alerts */}
              <SupplyChainGlassCard title="Real-time Supply Chain Alerts & Notifications" icon={Radio} status="ACTIVE">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { id: 1, type: 'critical', title: 'Critical Vendor Compromise Detected', message: 'High-risk vendor network breach affecting 15 downstream suppliers', time: '2 minutes ago', severity: 'critical' },
                    { id: 2, type: 'warning', title: 'Supply Chain Compliance Gap', message: 'GDPR compliance violations detected in European vendor network', time: '15 minutes ago', severity: 'high' },
                    { id: 3, type: 'info', title: 'Vendor Risk Assessment Completed', message: 'Q1 vendor risk assessment finalized with 73% average score', time: '1 hour ago', severity: 'medium' },
                    { id: 4, type: 'success', title: 'Supply Chain Mitigation Success', message: 'Zero-trust implementation reduced vendor breach risk by 45%', time: '2 hours ago', severity: 'low' }
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
                          <div>
                            <div className="text-white font-medium text-sm">{alert.title}</div>
                            <div className="text-slate-400 text-xs">{alert.message}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400 text-xs">{alert.time}</div>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' : alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </SupplyChainGlassCard>
            </motion.div>
          )}

          {activeSection === 'vendor-assessment' && (
            <motion.div
              key="vendor-assessment"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Vendor Assessment Tools & Templates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <SupplyChainGlassCard title="Assessment Templates" icon={FileCheck} status="READY">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg text-left transition-colors">
                        <div className="text-blue-400 font-medium text-sm">NIST Cybersecurity Framework</div>
                        <div className="text-slate-400 text-xs">Comprehensive vendor security assessment</div>
                      </button>
                      <button className="w-full p-3 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg text-left transition-colors">
                        <div className="text-green-400 font-medium text-sm">ISO 27001 Vendor Compliance</div>
                        <div className="text-slate-400 text-xs">Information security management</div>
                      </button>
                      <button className="w-full p-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg text-left transition-colors">
                        <div className="text-purple-400 font-medium text-sm">Supply Chain Risk Framework</div>
                        <div className="text-slate-400 text-xs">End-to-end supply chain risk assessment</div>
                      </button>
                    </div>
                  </div>
                </SupplyChainGlassCard>

                <SupplyChainGlassCard title="Assessment Types" icon={Target} status="AVAILABLE">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setLoading(true);
                          setTimeout(() => setLoading(false), 3000);
                        }}
                        disabled={loading}
                        className="w-full px-4 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                      >
                        {loading ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                        <span>{loading ? 'Running Assessment...' : 'Start Full Vendor Assessment'}</span>
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
                        <span>Quick Vendor Scan</span>
                      </button>

                      <button className="w-full px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center justify-center space-x-2">
                        <Settings className="w-4 h-4" />
                        <span>Custom Assessment</span>
                      </button>
                    </div>
                  </div>
                </SupplyChainGlassCard>

                <SupplyChainGlassCard title="Assessment Progress" icon={Activity} status="ACTIVE">
                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-300 text-sm">Current Assessment</span>
                        <span className="text-cyan-400 font-medium">82%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '82%' }}></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 font-bold text-lg">47</div>
                          <div className="text-xs text-slate-400">Vendors</div>
                        </div>
                        <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 font-bold text-lg">39</div>
                          <div className="text-xs text-slate-400">Completed</div>
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-slate-400 text-xs">Estimated completion: 8 min</div>
                      </div>
                    </div>
                  </div>
                </SupplyChainGlassCard>
              </div>

              {/* Interactive Vendor Assessment Form */}
              <SupplyChainGlassCard title="Interactive Vendor Assessment" icon={Calculator} status="IN PROGRESS">
                <div className="space-y-6">
                  {/* Assessment Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Vendor Category</option>
                      <option>Technology Suppliers</option>
                      <option>Logistics Partners</option>
                      <option>Cloud Services</option>
                      <option>Data Security</option>
                    </select>

                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Risk Level</option>
                      <option>Critical Infrastructure</option>
                      <option>High Impact</option>
                      <option>Medium Impact</option>
                      <option>Low Impact</option>
                    </select>

                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Assessment Type</option>
                      <option>Comprehensive Security</option>
                      <option>Compliance Check</option>
                      <option>Risk Analysis</option>
                      <option>Performance Review</option>
                    </select>

                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded text-sm font-medium">
                      Add Assessment Factor
                    </button>
                  </div>

                  {/* Vendor Assessment Questions */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Current Vendor Assessment Questions</h4>

                    {[
                      { question: "Does the vendor have documented security policies?", category: "Security Governance", score: 8 },
                      { question: "Is multi-factor authentication implemented?", category: "Access Control", score: 6 },
                      { question: "Are security audits conducted regularly?", category: "Compliance", score: 9 },
                      { question: "Is there an incident response plan?", category: "Operations", score: 7 },
                      { question: "Are employees trained on security awareness?", category: "Awareness", score: 5 }
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
                            <span className={`text-sm font-bold ${item.score >= 8 ? 'text-green-400' : item.score >= 6 ? 'text-yellow-400' : 'text-red-400'}`}>
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
                      <div className="text-2xl font-bold text-green-400 mb-1">8.5</div>
                      <div className="text-sm text-slate-400">Average Security Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">47</div>
                      <div className="text-sm text-slate-400">Assessment Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">82%</div>
                      <div className="text-sm text-slate-400">Completion Rate</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <button className="px-6 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors">
                      Save Assessment Progress
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300">
                      Complete Vendor Assessment
                    </button>
                  </div>
                </div>
              </SupplyChainGlassCard>

              {/* Vendor Risk Heat Map */}
              <SupplyChainGlassCard title="Interactive Vendor Risk Heat Map" icon={Map} status="LIVE">
                <div className="space-y-4">
                  {/* Heat Map Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                        <option>Risk Level View</option>
                        <option>Geographic Risk</option>
                        <option>Category Risk</option>
                        <option>Overall Risk</option>
                      </select>

                      <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                        <option>All Vendors</option>
                        <option>Critical Vendors</option>
                        <option>Technology</option>
                        <option>Logistics</option>
                        <option>Cloud Services</option>
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
                    {/* Simulated Vendor Risk Heat Map */}
                    <div className="grid grid-cols-12 grid-rows-8 gap-1 p-4 h-full">
                      {Array.from({ length: 96 }).map((_, index) => {
                        const riskLevel = Math.floor(Math.random() * 4) + 1; // 1-4 scale
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.01 }}
                            className={`rounded cursor-pointer hover:scale-110 transition-transform ${riskLevel === 1 ? 'bg-green-500/60 hover:bg-green-500/80' : riskLevel === 2 ? 'bg-yellow-500/60 hover:bg-yellow-500/80' : riskLevel === 3 ? 'bg-orange-500/60 hover:bg-orange-500/80' : 'bg-red-500/60 hover:bg-red-500/80'}`}
                            title={`Vendor Risk Level: ${riskLevel}/4`}
                          />
                        );
                      })}
                    </div>

                    {/* Heat Map Legend */}
                    <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur rounded-lg p-3">
                      <div className="text-white font-medium text-sm mb-2">Vendor Risk Levels</div>
                      <div className="flex items-center space-x-4 text-xs">
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span className="text-slate-300">Low Risk</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span className="text-slate-300">Medium Risk</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-orange-500 rounded"></div>
                          <span className="text-slate-300">High Risk</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span className="text-slate-300">Critical Risk</span>
                        </div>
                      </div>
                    </div>

                    {/* Critical Vendor Indicator */}
                    <div className="absolute top-8 right-8 bg-red-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                      <div className="text-white text-xs font-medium">CRITICAL VENDOR</div>
                      <div className="text-red-200 text-xs">TechCorp Inc - 94% Risk</div>
                    </div>
                  </div>

                  {/* Heat Map Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                      <div className="text-green-400 font-bold">41%</div>
                      <div className="text-xs text-slate-400">Low Risk Vendors</div>
                    </div>
                    <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                      <div className="text-yellow-400 font-bold">32%</div>
                      <div className="text-xs text-slate-400">Medium Risk</div>
                    </div>
                    <div className="text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                      <div className="text-orange-400 font-bold">19%</div>
                      <div className="text-xs text-slate-400">High Risk</div>
                    </div>
                    <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded">
                      <div className="text-red-400 font-bold">8%</div>
                      <div className="text-xs text-slate-400">Critical Risk</div>
                    </div>
                  </div>
                </div>
              </SupplyChainGlassCard>
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
              {/* Real-Time Supply Chain Threat Intelligence Operations Center */}
              <SupplyChainGlassCard title="Supply Chain Threat Intelligence Operations Center" icon={Radio} status="LIVE">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">Active Threats</div>
                  </div>
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <Activity className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-cyan-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Intelligence Feeds</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">94%</div>
                    <div className="text-sm text-slate-400">Response Success</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">47</div>
                    <div className="text-sm text-slate-400">Partner Networks</div>
                  </div>
                </div>

                {/* Real-Time Threat Intelligence Dashboard */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">Live Threat Intelligence Operations</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">Real-time Monitoring Active</span>
                    </div>
                  </div>

                  {/* Threat Intelligence Operations Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Threat Feeds Monitor */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-cyan-500/20 rounded-lg">
                          <Radio className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Threat Feeds Monitor</h5>
                          <p className="text-slate-400 text-xs">156 active intelligence sources</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Dark Web Feeds</span>
                          <span className="text-green-400 font-medium">23 active</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Partner Intelligence</span>
                          <span className="text-blue-400 font-medium">47 sources</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Vendor Alerts</span>
                          <span className="text-orange-400 font-medium">12 pending</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium">
                        Configure Feeds
                      </button>
                    </motion.div>

                    {/* Automated Response Engine */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-green-500/20 rounded-lg">
                          <Zap className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Automated Response</h5>
                          <p className="text-slate-400 text-xs">SOAR platform integration</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Active Playbooks</span>
                          <span className="text-green-400 font-medium">18 running</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Response Success</span>
                          <span className="text-cyan-400 font-medium">94%</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Avg Response Time</span>
                          <span className="text-blue-400 font-medium">2.3 min</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded text-sm">
                          Run Playbook
                        </button>
                        <button className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm">
                          View Logs
                        </button>
                      </div>
                    </motion.div>

                    {/* Threat Hunting Dashboard */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-red-500/20 rounded-lg">
                          <Crosshair className="w-6 h-6 text-red-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Threat Hunting</h5>
                          <p className="text-slate-400 text-xs">Advanced search & correlation</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Active Hunts</span>
                          <span className="text-red-400 font-medium">7 ongoing</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Indicators Found</span>
                          <span className="text-orange-400 font-medium">23 new</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">False Positives</span>
                          <span className="text-green-400 font-medium">2%</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded text-sm">
                          Start Hunt
                        </button>
                        <button className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm">
                          View Results
                        </button>
                      </div>
                    </motion.div>

                    {/* Supply Chain Attack Simulation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-purple-500/20 rounded-lg">
                          <Play className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Attack Simulation</h5>
                          <p className="text-slate-400 text-xs">Supply chain scenario testing</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Active Simulations</span>
                          <span className="text-purple-400 font-medium">3 running</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Vulnerabilities Found</span>
                          <span className="text-orange-400 font-medium">47</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Success Rate</span>
                          <span className="text-green-400 font-medium">89%</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm">
                          Run Simulation
                        </button>
                        <button className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm">
                          View Reports
                        </button>
                      </div>
                    </motion.div>

                    {/* Intelligence Sharing Platform */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Share2 className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                          <h5 className="text-white font-semibold">Intelligence Sharing</h5>
                          <p className="text-slate-400 text-xs">47 partner networks connected</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Shared Intelligence</span>
                          <span className="text-blue-400 font-medium">1,247 items</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Active Partners</span>
                          <span className="text-green-400 font-medium">47</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Response Rate</span>
                          <span className="text-cyan-400 font-medium">96%</span>
                        </div>
                      </div>

                      <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                        Share Intelligence
                      </button>
                    </motion.div>

                    {/* IoT Device Security Monitor */}
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
                          <h5 className="text-white font-semibold">IoT Security Monitor</h5>
                          <p className="text-slate-400 text-xs">Connected supply chain devices</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Monitored Devices</span>
                          <span className="text-indigo-400 font-medium">2,847</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Vulnerable Devices</span>
                          <span className="text-red-400 font-medium">23</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-slate-400">Security Score</span>
                          <span className="text-green-400 font-medium">87%</span>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded text-sm">
                          Scan Devices
                        </button>
                        <button className="flex-1 px-3 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded text-sm">
                          View Alerts
                        </button>
                      </div>
                    </motion.div>
                  </div>

                  {/* Live Threat Map for Supply Chain */}
                  <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-white font-semibold">Global Supply Chain Threat Map</h4>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full bg-red-400 animate-pulse"></div>
                        <span className="text-xs text-slate-400">Live Updates</span>
                      </div>
                    </div>

                    <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 relative overflow-hidden">
                      {/* Simulated Global Threat Map */}
                      <div className="grid grid-cols-24 grid-rows-12 gap-1 p-4 h-full">
                        {Array.from({ length: 288 }).map((_, index) => {
                          const threatLevel = Math.random() > 0.85 ? Math.floor(Math.random() * 3) + 1 : 0; // 0-3 scale, mostly 0
                          return (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.002 }}
                              className={`rounded-sm cursor-pointer transition-transform hover:scale-125 ${
                                threatLevel === 0 ? 'bg-slate-700/30' :
                                threatLevel === 1 ? 'bg-yellow-500/60' :
                                threatLevel === 2 ? 'bg-orange-500/60' :
                                'bg-red-500/60'
                              }`}
                              title={threatLevel > 0 ? `Threat Level: ${threatLevel}/3` : 'No active threats'}
                            />
                          );
                        })}
                      </div>

                      {/* Threat Hotspots */}
                      <div className="absolute top-8 left-8 bg-red-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                        <div className="text-white text-xs font-medium">CRITICAL</div>
                        <div className="text-red-200 text-xs">China Supply Hub</div>
                      </div>

                      <div className="absolute bottom-8 right-8 bg-orange-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                        <div className="text-white text-xs font-medium">HIGH RISK</div>
                        <div className="text-orange-200 text-xs">Europe Logistics</div>
                      </div>

                      <div className="absolute top-1/2 left-1/4 bg-yellow-500/90 backdrop-blur rounded-lg p-2 animate-pulse">
                        <div className="text-white text-xs font-medium">MONITORING</div>
                        <div className="text-yellow-200 text-xs">US Manufacturing</div>
                      </div>
                    </div>

                    {/* Map Statistics */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
                      <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div className="text-green-400 font-bold">67%</div>
                        <div className="text-xs text-slate-400">Safe Regions</div>
                      </div>
                      <div className="text-center p-3 bg-yellow-500/10 border border-yellow-500/30 rounded">
                        <div className="text-yellow-400 font-bold">28%</div>
                        <div className="text-xs text-slate-400">Low Risk</div>
                      </div>
                      <div className="text-center p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                        <div className="text-orange-400 font-bold">4%</div>
                        <div className="text-xs text-slate-400">High Risk</div>
                      </div>
                      <div className="text-center p-3 bg-red-500/10 border border-red-500/30 rounded">
                        <div className="text-red-400 font-bold">1%</div>
                        <div className="text-xs text-slate-400">Critical Risk</div>
                      </div>
                    </div>
                  </div>

                  {/* Vendor Communication Center */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SupplyChainGlassCard title="Vendor Communication Center" icon={MessageSquare} status="ACTIVE">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <AlertTriangle className="w-5 h-5 text-red-400" />
                              <div>
                                <div className="text-red-400 font-medium text-sm">URGENT: Security Breach</div>
                                <div className="text-slate-400 text-xs">Sent to 12 critical vendors</div>
                              </div>
                            </div>
                            <span className="text-red-400 text-xs">2 min ago</span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Shield className="w-5 h-5 text-orange-400" />
                              <div>
                                <div className="text-orange-400 font-medium text-sm">Compliance Update Required</div>
                                <div className="text-slate-400 text-xs">Sent to 47 vendors</div>
                              </div>
                            </div>
                            <span className="text-orange-400 text-xs">15 min ago</span>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <Users className="w-5 h-5 text-blue-400" />
                              <div>
                                <div className="text-blue-400 font-medium text-sm">Monthly Security Briefing</div>
                                <div className="text-slate-400 text-xs">Sent to all vendors</div>
                              </div>
                            </div>
                            <span className="text-blue-400 text-xs">1 hour ago</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm">
                            Send Alert
                          </button>
                          <button className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm">
                            View History
                          </button>
                        </div>
                      </div>
                    </SupplyChainGlassCard>

                    <SupplyChainGlassCard title="Supply Chain Attack Playbooks" icon={FileText} status="READY">
                      <div className="space-y-4">
                        <div className="space-y-3">
                          <button className="w-full p-3 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-left transition-colors">
                            <div className="text-red-400 font-medium text-sm">SolarWinds-style Attack Response</div>
                            <div className="text-slate-400 text-xs">Software supply chain compromise</div>
                          </button>

                          <button className="w-full p-3 bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 rounded-lg text-left transition-colors">
                            <div className="text-orange-400 font-medium text-sm">Vendor Credential Breach</div>
                            <div className="text-slate-400 text-xs">Third-party access compromise</div>
                          </button>

                          <button className="w-full p-3 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 rounded-lg text-left transition-colors">
                            <div className="text-yellow-400 font-medium text-sm">Counterfeit Component Detection</div>
                            <div className="text-slate-400 text-xs">Hardware supply chain tampering</div>
                          </button>

                          <button className="w-full p-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-left transition-colors">
                            <div className="text-blue-400 font-medium text-sm">Logistics Infrastructure Attack</div>
                            <div className="text-slate-400 text-xs">Transportation disruption response</div>
                          </button>
                        </div>

                        <div className="flex space-x-2">
                          <button className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
                            Execute Playbook
                          </button>
                          <button className="flex-1 px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg text-sm">
                            Edit Playbooks
                          </button>
                        </div>
                      </div>
                    </SupplyChainGlassCard>
                  </div>
                </div>
              </SupplyChainGlassCard>
            </motion.div>
          )}

          {activeSection === 'risk-mitigation' && (
            <motion.div
              key="risk-mitigation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Supply Chain Risk Mitigation Strategies */}
              <SupplyChainGlassCard title="AI-Generated Supply Chain Risk Mitigation Strategies" icon={Shield} status="OPTIMIZING">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">High-Impact Mitigation Strategies</h4>
                    {[
                      { strategy: 'Zero-Trust Vendor Access Control', effectiveness: 94, cost: 'High', timeline: '6 months' },
                      { strategy: 'Advanced Vendor Threat Detection', effectiveness: 89, cost: 'Medium', timeline: '3 months' },
                      { strategy: 'Supply Chain Security Training', effectiveness: 78, cost: 'Low', timeline: '2 months' },
                      { strategy: 'Vendor Risk Monitoring Platform', effectiveness: 86, cost: 'Medium', timeline: '4 months' }
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
                          <span className="text-cyan-400 font-bold">{strategy.effectiveness}%</span>
                        </div>
                        <div className="flex items-center space-x-4 text-xs text-slate-400">
                          <span>Cost: <span className={`font-medium ${strategy.cost === 'High' ? 'text-red-400' : strategy.cost === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>{strategy.cost}</span></span>
                          <span>Timeline: <span className="text-blue-400 font-medium">{strategy.timeline}</span></span>
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
                          <span className="text-green-400 font-bold">18</span>
                        </div>
                        <div className="text-xs text-slate-400">Successfully implemented mitigation measures</div>
                      </div>

                      <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-blue-400 font-medium">In Progress</span>
                          <span className="text-blue-400 font-bold">12</span>
                        </div>
                        <div className="text-xs text-slate-400">Currently being implemented</div>
                      </div>

                      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-yellow-400 font-medium">Planned</span>
                          <span className="text-yellow-400 font-bold">23</span>
                        </div>
                        <div className="text-xs text-slate-400">Ready for implementation</div>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                      Generate New Strategies
                    </button>
                  </div>
                </div>
              </SupplyChainGlassCard>
            </motion.div>
          )}

          {activeSection === 'compliance-monitoring' && (
            <motion.div
              key="compliance-monitoring"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Supply Chain Compliance Monitoring Center */}
              <SupplyChainGlassCard title="Supply Chain Compliance Monitoring Center" icon={FileText} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <FileText className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-cyan-400 mb-1">34</div>
                    <div className="text-sm text-slate-400">Compliance Reports</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">92%</div>
                    <div className="text-sm text-slate-400">Compliance Rate</div>
                  </div>
                  <div className="text-center p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-indigo-400 mb-1">7</div>
                    <div className="text-sm text-slate-400">Non-Compliant Vendors</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Available Compliance Frameworks</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">NIST Cybersecurity Framework</div>
                        <div className="text-slate-400 text-sm">Comprehensive security compliance</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">ISO 27001 Supply Chain</div>
                        <div className="text-slate-400 text-sm">Information security management</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">GDPR Data Protection</div>
                        <div className="text-slate-400 text-sm">Privacy and data protection</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">SOC 2 Compliance</div>
                        <div className="text-slate-400 text-sm">Trust and security principles</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Compliance Report Generation</h4>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="text-white font-medium mb-2">Automated Compliance Report Builder</div>
                      <div className="space-y-3">
                        <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white">
                          <option>Select Framework</option>
                          <option>NIST CSF</option>
                          <option>ISO 27001</option>
                          <option>GDPR</option>
                          <option>SOC 2</option>
                        </select>
                        <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded transition-colors">
                          Generate Compliance Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </SupplyChainGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GlobalSupplyChainSecurity;
