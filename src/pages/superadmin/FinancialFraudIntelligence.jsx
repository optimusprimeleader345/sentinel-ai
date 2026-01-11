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
  CreditCard,
  Receipt,
  PiggyBank,
  Wallet,
  Coins,
  Banknote as BanknoteIcon,
  Landmark,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  AlertOctagon as AlertIcon,
  ShieldCheck as ShieldCheckIcon,
  Target as TargetIcon2,
  Eye as EyeIcon2,
  Lock as LockIcon,
  Unlock,
  Fingerprint,
  Scan,
  Search as SearchIcon,
  Filter as FilterIcon,
  Calendar,
  Clock as ClockIcon,
  Bell as BellIcon,
  BellRing as BellRingIcon,
  Volume2 as VolumeIcon,
  VolumeX as MuteIcon,
  Calculator as CalculatorIcon,
  DollarSign as DollarIcon,
  PieChart as PieChartIcon2,
  BarChart as BarChartIcon2,
  LineChart as LineChartIcon2,
  CreditCard as CardIcon,
  Receipt as ReceiptIcon,
  PiggyBank as PiggyIcon,
  Wallet as WalletIcon,
  Coins as CoinsIcon,
  Banknote as BankIcon,
  Landmark as BankIcon2,
  Fingerprint as FingerprintIcon,
  Scan as ScanIcon,
  Search as SearchIcon2,
  Filter as FilterIcon2,
  Calendar as CalendarIcon,
  Clock as ClockIcon2,
  Bell as BellIcon2,
  BellRing as BellRingIcon2,
  Volume2 as VolumeIcon2,
  VolumeX as MuteIcon2,
  Calculator as CalculatorIcon2,
  DollarSign as DollarIcon2
} from 'lucide-react';

// 🛡️ FINANCIAL FRAUD INTELLIGENCE - SUPER ADMIN ONLY
// ADVANCED AI-POWERED FINANCIAL FRAUD DETECTION & PREVENTION
// ENTERPRISE FINANCIAL SECURITY & ANOMALY DETECTION PLATFORM

const FinancialFraudIntelligence = () => {
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
              This is a Financial Fraud Intelligence Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('fraud-overview');
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [fraudData, setFraudData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [fraudAssessments, setFraudAssessments] = useState([]);
  const [mitigationActions, setMitigationActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 📊 FINANCIAL METRICS
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

  // Fraud Risk Categories
  const fraudRiskCategories = [
    {
      id: 'transaction-fraud',
      name: 'Transaction Fraud',
      icon: CreditCard,
      level: 'HIGH',
      score: 82,
      trend: 'increasing',
      description: 'Unauthorized transaction attempts and payment fraud',
      mitigation: 'Real-time transaction monitoring and AI scoring',
      color: 'red',
      amount: '$2.8M'
    },
    {
      id: 'identity-theft',
      name: 'Identity Theft',
      icon: Fingerprint,
      level: 'HIGH',
      score: 79,
      trend: 'stable',
      description: 'Account takeover and synthetic identity fraud',
      mitigation: 'Behavioral biometrics and device fingerprinting',
      color: 'orange',
      amount: '$1.9M'
    },
    {
      id: 'money-laundering',
      name: 'Money Laundering',
      icon: PiggyBank,
      level: 'MEDIUM',
      score: 65,
      trend: 'decreasing',
      description: 'AML violations and suspicious transaction patterns',
      mitigation: 'Enhanced due diligence and transaction monitoring',
      color: 'yellow',
      amount: '$4.2M'
    },
    {
      id: 'insider-threats',
      name: 'Insider Threats',
      icon: UserX,
      level: 'MEDIUM',
      score: 58,
      trend: 'stable',
      description: 'Employee fraud and unauthorized access',
      mitigation: 'Access controls and behavioral monitoring',
      color: 'blue',
      amount: '$1.1M'
    },
    {
      id: 'regulatory-fraud',
      name: 'Regulatory Fraud',
      icon: FileCheck,
      level: 'LOW',
      score: 34,
      trend: 'decreasing',
      description: 'Compliance violations and regulatory breaches',
      mitigation: 'Automated compliance monitoring',
      color: 'green',
      amount: '$750K'
    },
    {
      id: 'cyber-financial',
      name: 'Cyber Financial Attacks',
      icon: Zap,
      level: 'HIGH',
      score: 88,
      trend: 'rising',
      description: 'Ransomware and cyber-enabled financial fraud',
      mitigation: 'Advanced threat detection and incident response',
      color: 'red',
      amount: '$3.7M'
    }
  ];

  // 🎯 FINANCIAL FRAUD GLASS CARD COMPONENT
  const FinancialFraudGlassCard = ({ children, title, icon: Icon, status, riskLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(251,146,60,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(251,146,60,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(251,146,60,0.6)] text-orange-400`} />}
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

  // 📊 MAIN FINANCIAL FRAUD INTELLIGENCE INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-orange-900 via-amber-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-orange-500/40 to-amber-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-amber-600/35 to-yellow-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-yellow-400/30 to-orange-400/30 rounded-full blur-3xl"></div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 via-amber-600 to-yellow-600 rounded-xl flex items-center justify-center shadow-2xl shadow-orange-500/30">
                <Banknote className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-300 via-amber-300 via-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-sm">
                Financial Fraud Intelligence
              </h1>
              <p className="text-orange-200/80 text-sm font-medium">Advanced AI-Powered Financial Fraud Detection & Enterprise Security</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">AI Fraud Models Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AIIcon className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Transaction Monitoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-yellow-400 animate-pulse" />
                  <span className="text-xs text-slate-300">$2.8B Fraud Prevented</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-orange-400 animate-pulse" />
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
              className="px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-orange-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Fraud Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Financial Fraud Intelligence Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'fraud-overview', label: 'Fraud Overview', icon: BarChart3 },
            { id: 'transaction-monitoring', label: 'Transaction Monitoring', icon: CreditCard },
            { id: 'fraud-detection', label: 'Fraud Detection', icon: Brain },
            { id: 'risk-assessment', label: 'Risk Assessment', icon: Shield },
            { id: 'compliance-reporting', label: 'Compliance Reporting', icon: FileText }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === section.id ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border border-orange-500/30 shadow-lg shadow-orange-500/10' : 'text-slate-300 hover:text-white hover:bg-slate-700/30'}`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'fraud-overview' && (
            <motion.div
              key="fraud-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enterprise Financial Fraud Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <FinancialFraudGlassCard title="Total Fraud Prevented" icon={Banknote} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">$2.8B</div>
                    <div className="text-sm text-slate-400">This Quarter</div>
                    <div className="text-xs text-green-400 mt-2">+12% from last quarter</div>
                  </div>
                </FinancialFraudGlassCard>

                <FinancialFraudGlassCard title="Active Fraud Alerts" icon={AlertTriangle} riskLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">47</div>
                    <div className="text-sm text-slate-400">Real-time Threats</div>
                    <div className="text-xs text-orange-400 mt-2">18 escalated today</div>
                  </div>
                </FinancialFraudGlassCard>

                <FinancialFraudGlassCard title="Detection Accuracy" icon={Target} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">96%</div>
                    <div className="text-sm text-slate-400">AI Model Performance</div>
                    <div className="text-xs text-blue-400 mt-2">+2% from last month</div>
                  </div>
                </FinancialFraudGlassCard>

                <FinancialFraudGlassCard title="Response Time" icon={Clock} riskLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{`< 5min`}</div>
                    <div className="text-sm text-slate-400">Average Response</div>
                    <div className="text-xs text-green-400 mt-2">99.9% SLA met</div>
                  </div>
                </FinancialFraudGlassCard>
              </div>

              {/* Financial Fraud Risk Categories Overview */}
              <FinancialFraudGlassCard title="Financial Fraud Risk Categories Overview" icon={Layers} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {fraudRiskCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${selectedTransaction === category.id ? 'border-orange-500/50 bg-orange-500/10 shadow-[0_0_15px_rgba(251,146,60,0.3)]' : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'}`}
                        onClick={() => setSelectedTransaction(selectedTransaction === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(251,146,60,0.4)]`} />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{category.name}</h4>
                            <div className={`text-xs ${category.level === 'CRITICAL' ? 'text-red-400' : category.level === 'HIGH' ? 'text-orange-400' : category.level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>
                              {category.level} RISK
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-bold text-sm">{category.amount}</div>
                            <div className="text-slate-400 text-xs">Potential Loss</div>
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
              </FinancialFraudGlassCard>

              {/* Real-time Financial Fraud Alerts */}
              <FinancialFraudGlassCard title="Real-time Financial Fraud Alerts & Notifications" icon={Radio} status="ACTIVE">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { id: 1, type: 'critical', title: 'High-Value Transaction Fraud Detected', message: '$2.3M wire transfer flagged as suspicious - account takeover suspected', time: '2 minutes ago', severity: 'critical', amount: '$2,300,000' },
                    { id: 2, type: 'warning', title: 'Bulk Transaction Anomaly', message: '47 small transactions totaling $89K from compromised merchant account', time: '8 minutes ago', severity: 'high', amount: '$89,000' },
                    { id: 3, type: 'info', title: 'Identity Verification Failed', message: 'Synthetic identity fraud attempt blocked at account creation', time: '15 minutes ago', severity: 'medium', amount: '$0' },
                    { id: 4, type: 'success', title: 'Fraud Prevention Success', message: 'AI blocked $1.2M in fraudulent ACH transactions - 23 attempts prevented', time: '1 hour ago', severity: 'low', amount: '$1,200,000' }
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
                          </div>
                          <div className="text-right">
                            <div className="text-orange-400 font-bold text-sm">{alert.amount}</div>
                            <div className="text-slate-400 text-xs">{alert.time}</div>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ml-4 ${alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' : alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' : alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </FinancialFraudGlassCard>
            </motion.div>
          )}

          {activeSection === 'transaction-monitoring' && (
            <motion.div
              key="transaction-monitoring"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Real-Time Transaction Monitoring Dashboard */}
              <FinancialFraudGlassCard title="Real-Time Transaction Monitoring Center" icon={Activity} status="LIVE">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <TrendingUp className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">1.2M</div>
                    <div className="text-sm text-slate-400">Transactions/Hour</div>
                  </div>
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <AlertTriangle className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">247</div>
                    <div className="text-sm text-slate-400">Flagged Transactions</div>
                  </div>
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-cyan-400 mb-1">99.7%</div>
                    <div className="text-sm text-slate-400">Uptime</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">0.3s</div>
                    <div className="text-sm text-slate-400">Avg Processing</div>
                  </div>
                </div>

                {/* Transaction Monitoring Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* High-Value Transaction Monitor */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <DollarSign className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">High-Value Transactions</h5>
                        <p className="text-slate-400 text-xs">$10M+ threshold monitoring</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Active Monitoring:</span>
                        <span className="text-green-400 font-medium">1,247 accounts</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Flagged Today:</span>
                        <span className="text-orange-400 font-medium">23 transactions</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Total Value:</span>
                        <span className="text-cyan-400 font-medium">$89.2M</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
                      View Transactions
                    </button>
                  </motion.div>

                  {/* Velocity Check Engine */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        <Zap className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Velocity Checks</h5>
                        <p className="text-slate-400 text-xs">Transaction frequency analysis</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Checks/Hour:</span>
                        <span className="text-blue-400 font-medium">2.1M</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Anomalies Found:</span>
                        <span className="text-orange-400 font-medium">156</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">False Positive Rate:</span>
                        <span className="text-green-400 font-medium">0.02%</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium">
                      Configure Rules
                    </button>
                  </motion.div>

                  {/* Geographic Risk Monitor */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <Globe className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Geographic Risk</h5>
                        <p className="text-slate-400 text-xs">Location-based fraud detection</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">High-Risk Countries:</span>
                        <span className="text-red-400 font-medium">12</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Blocked IPs:</span>
                        <span className="text-orange-400 font-medium">8,947</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">VPN Detection:</span>
                        <span className="text-cyan-400 font-medium">Active</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium">
                      Risk Map View
                    </button>
                  </motion.div>

                  {/* Device Fingerprinting */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <Fingerprint className="w-6 h-6 text-indigo-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Device Fingerprinting</h5>
                        <p className="text-slate-400 text-xs">Behavioral device analysis</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Unique Devices:</span>
                        <span className="text-indigo-400 font-medium">1.2M</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Suspicious Devices:</span>
                        <span className="text-red-400 font-medium">89</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Accuracy Rate:</span>
                        <span className="text-green-400 font-medium">98.7%</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium">
                      Device Analytics
                    </button>
                  </motion.div>

                  {/* AI Anomaly Detection */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-cyan-500/20 rounded-lg">
                        <Brain className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">AI Anomaly Detection</h5>
                        <p className="text-slate-400 text-xs">Machine learning fraud patterns</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Models Active:</span>
                        <span className="text-cyan-400 font-medium">18</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Anomalies Detected:</span>
                        <span className="text-orange-400 font-medium">423</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Model Accuracy:</span>
                        <span className="text-green-400 font-medium">96.2%</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-medium">
                      Model Training
                    </button>
                  </motion.div>

                  {/* Regulatory Compliance Monitor */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500/20 rounded-lg">
                        <FileCheck className="w-6 h-6 text-green-400" />
                      </div>
                      <div>
                        <h5 className="text-white font-semibold">Regulatory Compliance</h5>
                        <p className="text-slate-400 text-xs">AML/KYC monitoring</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">SAR Filed:</span>
                        <span className="text-red-400 font-medium">23</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">Compliance Rate:</span>
                        <span className="text-green-400 font-medium">99.1%</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">OFAC Hits:</span>
                        <span className="text-orange-400 font-medium">7</span>
                      </div>
                    </div>

                    <button className="w-full mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium">
                      Compliance Reports
                    </button>
                  </motion.div>
                </div>
              </FinancialFraudGlassCard>
            </motion.div>
          )}

          {activeSection === 'fraud-detection' && (
            <motion.div
              key="fraud-detection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Advanced AI Fraud Detection Engine */}
              <FinancialFraudGlassCard title="AI-Powered Fraud Detection Engine" icon={Brain} status="ANALYZING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">96%</div>
                    <div className="text-sm text-slate-400">Detection Accuracy</div>
                  </div>
                  <div className="text-center p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <Target className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-amber-400 mb-1">847</div>
                    <div className="text-sm text-slate-400">Fraud Attempts Blocked</div>
                  </div>
                  <div className="text-center p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-yellow-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">Days Advance Warning</div>
                  </div>
                </div>

                {/* AI Fraud Detection Scenarios */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">AI Fraud Detection Scenarios</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-orange-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">AI Models Learning</span>
                    </div>
                  </div>

                  {/* Fraud Detection Scenarios Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        scenario: 'Account Takeover Detection',
                        probability: 89,
                        impact: 'HIGH',
                        timeframe: 'Real-time',
                        icon: Lock,
                        color: 'red',
                        trend: 'rising',
                        description: 'Login anomalies and credential stuffing detection',
                        prevented: '$1.2M'
                      },
                      {
                        scenario: 'Synthetic Identity Fraud',
                        probability: 76,
                        impact: 'MEDIUM',
                        timeframe: 'Account Creation',
                        icon: UserX,
                        color: 'orange',
                        trend: 'stable',
                        description: 'Fake identity patterns using AI behavioral analysis',
                        prevented: '$890K'
                      },
                      {
                        scenario: 'Transaction Laundering',
                        probability: 82,
                        impact: 'HIGH',
                        timeframe: 'Pattern Analysis',
                        icon: PiggyBank,
                        color: 'red',
                        trend: 'rising',
                        description: 'Money laundering through layered micro-transactions',
                        prevented: '$2.1M'
                      },
                      {
                        scenario: 'Merchant Fraud Rings',
                        probability: 67,
                        impact: 'HIGH',
                        timeframe: 'Network Analysis',
                        icon: Building,
                        color: 'orange',
                        trend: 'increasing',
                        description: 'Coordinated merchant account compromises',
                        prevented: '$1.8M'
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
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${scenario.trend === 'rising' ? 'bg-red-500/20 text-red-400' : scenario.trend === 'stable' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {scenario.trend === 'rising' && <TrendingUp className="w-3 h-3" />}
                                {scenario.trend === 'stable' && <Activity className="w-3 h-3" />}
                                {scenario.trend === 'increasing' && <TrendingUp className="w-3 h-3" />}
                                <span className="capitalize">{scenario.trend}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-slate-300 text-xs mb-4 leading-relaxed">{scenario.description}</p>

                            {/* Metrics */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-xs font-medium">Detection Probability</span>
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
                                <span className="text-slate-400 text-xs">Fraud Prevented:</span>
                                <span className="text-green-400 font-bold text-sm">{scenario.prevented}</span>
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

                  {/* Fraud Detection Statistics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-400 mb-1">18</div>
                      <div className="text-sm text-slate-400">AI Models</div>
                      <div className="text-xs text-slate-500">Active Detection</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-400 mb-1">847</div>
                      <div className="text-sm text-slate-400">Frauds Blocked</div>
                      <div className="text-xs text-slate-500">This Month</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-400 mb-1">96%</div>
                      <div className="text-sm text-slate-400">Accuracy Rate</div>
                      <div className="text-xs text-slate-500">Industry Leading</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">$2.8B</div>
                      <div className="text-sm text-slate-400">Protected Value</div>
                      <div className="text-xs text-slate-500">Total Savings</div>
                    </div>
                  </div>
                </div>
              </FinancialFraudGlassCard>
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
              {/* Financial Risk Assessment Center */}
              <FinancialFraudGlassCard title="Financial Risk Assessment & Scoring Engine" icon={Calculator} status="CALCULATING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <Calculator className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">2,847</div>
                    <div className="text-sm text-slate-400">Risk Assessments</div>
                  </div>
                  <div className="text-center p-6 bg-amber-500/10 border border-amber-500/30 rounded-lg">
                    <Gauge className="w-12 h-12 text-amber-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-amber-400 mb-1">73</div>
                    <div className="text-sm text-slate-400">Average Risk Score</div>
                  </div>
                  <div className="text-center p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <TrendingDown className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-yellow-400 mb-1">-15%</div>
                    <div className="text-sm text-slate-400">Risk Reduction</div>
                  </div>
                </div>

                {/* Risk Assessment Tools */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Risk Assessment Frameworks</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Fraud Risk Heat Map</div>
                        <div className="text-slate-400 text-sm">Geographic and temporal risk analysis</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Customer Risk Profiling</div>
                        <div className="text-slate-400 text-sm">Behavioral risk scoring algorithms</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Transaction Risk Scoring</div>
                        <div className="text-slate-400 text-sm">Real-time transaction evaluation</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">Portfolio Risk Analysis</div>
                        <div className="text-slate-400 text-sm">Enterprise-wide risk aggregation</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Risk Mitigation Strategies</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 font-medium text-sm">Automated Approval Limits</div>
                        <div className="text-slate-400 text-xs">Dynamic transaction limits based on risk</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="text-blue-400 font-medium text-sm">Enhanced Authentication</div>
                        <div className="text-slate-400 text-xs">Multi-factor and biometric verification</div>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <div className="text-purple-400 font-medium text-sm">Real-time Monitoring</div>
                        <div className="text-slate-400 text-xs">Continuous transaction surveillance</div>
                      </div>
                      <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <div className="text-cyan-400 font-medium text-sm">AI-Powered Alerts</div>
                        <div className="text-slate-400 text-xs">Predictive fraud detection notifications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </FinancialFraudGlassCard>
            </motion.div>
          )}

          {activeSection === 'compliance-reporting' && (
            <motion.div
              key="compliance-reporting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Financial Compliance Reporting Center */}
              <FinancialFraudGlassCard title="Financial Compliance & Regulatory Reporting" icon={FileText} status="GENERATING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <FileText className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Reports Generated</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">99.2%</div>
                    <div className="text-sm text-slate-400">Compliance Rate</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Clock className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">2.4h</div>
                    <div className="text-sm text-slate-400">Avg Report Time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Regulatory Reporting</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">SAR/CTR Filings</div>
                        <div className="text-slate-400 text-sm">Suspicious Activity Reports</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">OFAC Compliance</div>
                        <div className="text-slate-400 text-sm">Office of Foreign Assets Control</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">AML Risk Assessment</div>
                        <div className="text-slate-400 text-sm">Anti-Money Laundering reports</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium">KYC Compliance</div>
                        <div className="text-slate-400 text-sm">Know Your Customer verification</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Report Generation</h4>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="text-white font-medium mb-2">Automated Report Builder</div>
                      <div className="space-y-3">
                        <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white">
                          <option>Select Report Type</option>
                          <option>Daily Fraud Summary</option>
                          <option>Weekly Risk Assessment</option>
                          <option>Monthly Compliance</option>
                          <option>Quarterly AML Report</option>
                        </select>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="date"
                            className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm"
                            placeholder="Start Date"
                          />
                          <input
                            type="date"
                            className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm"
                            placeholder="End Date"
                          />
                        </div>
                        <button className="w-full px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded transition-colors">
                          Generate Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FinancialFraudGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default FinancialFraudIntelligence;
