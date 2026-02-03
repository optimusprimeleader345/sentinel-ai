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
  BarChart,
  Bar as RechartsBar,
  PieChart,
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
  Compass
} from 'lucide-react';

// 🔐 CROSS-AGENCY INTELLIGENCE FUSION - SUPER ADMIN ONLY
// ADVANCED MULTI-AGENCY COLLABORATION & INTELLIGENCE SHARING PLATFORM
// REAL-TIME SECURE INTELLIGENCE EXCHANGE & UNIFIED THREAT ASSESSMENT

const CrossAgencyIntelligenceFusion = () => {
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
              This is a Cross-Agency Intelligence Fusion Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('intelligence-overview');
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [intelligenceData, setIntelligenceData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      sender: 'NSA Command',
      agency: 'NSA',
      message: 'Critical intelligence update: Advanced persistent threat detected targeting financial sector.',
      timestamp: new Date(Date.now() - 300000),
      type: 'alert',
      priority: 'HIGH'
    },
    {
      id: 2,
      sender: 'CIA Analysis',
      agency: 'CIA',
      message: 'Correlated threat patterns identified. Sharing analysis with all agencies.',
      timestamp: new Date(Date.now() - 240000),
      type: 'intel',
      priority: 'MEDIUM'
    },
    {
      id: 3,
      sender: 'FBI Operations',
      agency: 'FBI',
      message: 'Field teams activated. Requesting coordination with DHS for infrastructure protection.',
      timestamp: new Date(Date.now() - 180000),
      type: 'coordination',
      priority: 'HIGH'
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineAgencies, setOnlineAgencies] = useState(['NSA', 'CIA', 'FBI', 'DHS']);
  const [intelligenceShares, setIntelligenceShares] = useState([]);
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

  // Send message in chat
  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: 'Super Admin',
        agency: 'NATIONAL COMMAND',
        message: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setChatMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  // Government agencies data
  const governmentAgencies = [
    {
      id: 'nsa',
      name: 'National Security Agency',
      acronym: 'NSA',
      status: 'CONNECTED',
      color: 'purple',
      threatLevel: 'HIGH',
      intelligenceShared: 247,
      lastActivity: '2024-01-06T14:30:00Z',
      connectivity: 99.8,
      dataExchanges: 156
    },
    {
      id: 'cia',
      name: 'Central Intelligence Agency',
      acronym: 'CIA',
      status: 'CONNECTED',
      color: 'blue',
      threatLevel: 'MEDIUM',
      intelligenceShared: 189,
      lastActivity: '2024-01-06T13:45:00Z',
      connectivity: 99.9,
      dataExchanges: 98
    },
    {
      id: 'fbi',
      name: 'Federal Bureau of Investigation',
      acronym: 'FBI',
      status: 'CONNECTED',
      color: 'green',
      threatLevel: 'CRITICAL',
      intelligenceShared: 312,
      lastActivity: '2024-01-06T15:20:00Z',
      connectivity: 99.5,
      dataExchanges: 203
    },
    {
      id: 'dhs',
      name: 'Department of Homeland Security',
      acronym: 'DHS',
      status: 'CONNECTED',
      color: 'red',
      threatLevel: 'HIGH',
      intelligenceShared: 278,
      lastActivity: '2024-01-06T14:15:00Z',
      connectivity: 99.7,
      dataExchanges: 167
    },
    {
      id: 'dod',
      name: 'Department of Defense',
      acronym: 'DoD',
      status: 'CONNECTED',
      color: 'yellow',
      threatLevel: 'MEDIUM',
      intelligenceShared: 198,
      lastActivity: '2024-01-06T13:30:00Z',
      connectivity: 99.6,
      dataExchanges: 145
    },
    {
      id: 'treasury',
      name: 'Department of Treasury',
      acronym: 'Treasury',
      status: 'CONNECTED',
      color: 'emerald',
      threatLevel: 'LOW',
      intelligenceShared: 87,
      lastActivity: '2024-01-06T12:45:00Z',
      connectivity: 99.9,
      dataExchanges: 67
    },
    {
      id: 'state',
      name: 'Department of State',
      acronym: 'State',
      status: 'CONNECTED',
      color: 'indigo',
      threatLevel: 'MEDIUM',
      intelligenceShared: 134,
      lastActivity: '2024-01-06T14:00:00Z',
      connectivity: 99.4,
      dataExchanges: 89
    },
    {
      id: 'energy',
      name: 'Department of Energy',
      acronym: 'Energy',
      status: 'CONNECTED',
      color: 'orange',
      threatLevel: 'HIGH',
      intelligenceShared: 156,
      lastActivity: '2024-01-06T15:10:00Z',
      connectivity: 99.8,
      dataExchanges: 124
    }
  ];

  // 🎯 INTELLIGENCE GLASS CARD COMPONENT - Premium Purple/Indigo Theme
  const IntelligenceGlassCard = ({ children, title, icon: Icon, status, riskLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(147,51,234,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(147,51,234,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(147,51,234,0.6)] text-purple-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {riskLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' : riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-green-500/20 text-green-400 border-green-500/40'}`}>
                {riskLevel}
              </span>
            )}
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                status === 'CONNECTED' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                status === 'ACTIVE' ? 'bg-purple-500/20 text-purple-400 border-purple-500/40' :
                status === 'SECURE' ? 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40' :
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

  // 📊 MAIN CROSS-AGENCY INTELLIGENCE FUSION INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-indigo-800 to-slate-950 p-4 sm:p-6 relative overflow-hidden">
      {/* Premium Background Effects - Unique Purple/Indigo Theme */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/40 to-indigo-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/35 to-violet-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-violet-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-72 h-72 bg-gradient-to-r from-fuchsia-500/25 to-purple-500/25 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 lg:mb-8 gap-4"
        >
          <div className="flex items-center space-x-4 lg:space-x-6">
            <div className="relative">
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <Network className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 via-violet-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
                Cross-Agency Intelligence Fusion
              </h1>
              <p className="text-purple-200/80 text-xs lg:text-sm font-medium">Advanced Multi-Agency Collaboration & Secure Intelligence Sharing Platform</p>

              <div className="flex flex-wrap items-center gap-2 lg:gap-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">8 Agencies Connected</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Real-time Intelligence Flow</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-2 lg:p-3 w-full sm:w-auto">
              <div className="flex items-center space-x-2 lg:space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-xs text-slate-300">SECURE</span>
                </div>
                <div className="text-xs text-slate-400 hidden sm:inline">|</div>
                <div className="text-xs text-slate-300">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-3 py-2 lg:px-4 lg:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25 text-xs lg:text-sm w-full sm:w-auto justify-center"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="whitespace-nowrap">{isRefreshing ? 'Refreshing...' : 'Refresh Intelligence'}</span>
            </button>
          </div>
        </motion.div>

        {/* Intelligence Fusion Command Center Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-3 overflow-x-auto">
          {[
            { id: 'intelligence-overview', label: 'Intelligence Overview', icon: Shield },
            { id: 'agency-collaboration', label: 'Agency Collaboration', icon: Users },
            { id: 'threat-correlation', label: 'Threat Correlation', icon: Target },
            { id: 'predictive-forecasting', label: 'Predictive Forecasting', icon: TrendingUp },
            { id: 'intelligence-network', label: 'Intelligence Network', icon: Network },
            { id: 'data-exchange', label: 'Data Exchange', icon: Share2 },
            { id: 'secure-comms', label: 'Secure Communications', icon: Lock }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap min-w-fit ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:inline">{section.label}</span>
                <span className="sm:hidden">{section.label.split(' ')[0]}</span>
              </motion.button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'intelligence-overview' && (
            <motion.div
              key="intelligence-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enhanced Intelligence Overview - Multiple Features */}
              <div className="space-y-6">
                {/* Global Intelligence Dashboard - Enhanced Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <IntelligenceGlassCard title="Total Intelligence Shared" icon={Database} status="ACTIVE">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">1,597</div>
                      <div className="text-sm text-slate-400">Intelligence Reports</div>
                      <div className="text-xs text-green-400 mt-2">+12% from last week</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-slate-800/50 rounded">
                          <div className="text-cyan-400 text-sm font-bold">89</div>
                          <div className="text-xs text-slate-400">Today</div>
                        </div>
                        <div className="text-center p-2 bg-slate-800/50 rounded">
                          <div className="text-cyan-400 text-sm font-bold">247</div>
                          <div className="text-xs text-slate-400">This Week</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Active Agencies" icon={Building} status="CONNECTED">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">8</div>
                      <div className="text-sm text-slate-400">Government Agencies</div>
                      <div className="text-xs text-green-400 mt-2">All systems online</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">100%</div>
                          <div className="text-xs text-slate-400">Uptime</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">18</div>
                          <div className="text-xs text-slate-400">Connections</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Data Exchanges" icon={Share2} status="SECURE">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">1,049</div>
                      <div className="text-sm text-slate-400">Secure Transfers</div>
                      <div className="text-xs text-blue-400 mt-2">99.9% success rate</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">2.4GB</div>
                          <div className="text-xs text-slate-400">Transferred</div>
                        </div>
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">1,247</div>
                          <div className="text-xs text-slate-400">Packets/sec</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Threat Correlations" icon={Target} status="ANALYZING">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">23</div>
                      <div className="text-sm text-slate-400">Cross-Agency Links</div>
                      <div className="text-xs text-orange-400 mt-2">5 new correlations</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-red-500/10 border border-red-500/30 rounded">
                          <div className="text-red-400 text-sm font-bold">3</div>
                          <div className="text-xs text-slate-400">Critical</div>
                        </div>
                        <div className="text-center p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                          <div className="text-orange-400 text-sm font-bold">12</div>
                          <div className="text-xs text-slate-400">High</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Intelligence Priority Feeds & Real-time Alerts */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Priority Intelligence Feeds */}
                  <div className="lg:col-span-2">
                    <IntelligenceGlassCard title="Priority Intelligence Feeds" icon={Radio} status="LIVE">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-semibold text-sm">Real-time Intelligence Stream</h4>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                            <span className="text-xs text-green-400">LIVE</span>
                          </div>
                        </div>

                        <div className="space-y-3 max-h-80 overflow-y-auto">
                          {[
                            { id: 1, priority: 'CRITICAL', title: 'Advanced APT Detected', agency: 'NSA', time: '2 minutes ago', content: 'Zero-day vulnerability exploitation in critical infrastructure targeting energy sector.' },
                            { id: 2, priority: 'HIGH', title: 'State-Sponsored Campaign', agency: 'CIA', time: '5 minutes ago', content: 'Coordinated disinformation campaign targeting election infrastructure.' },
                            { id: 3, priority: 'MEDIUM', title: 'Ransomware Activity', agency: 'FBI', time: '8 minutes ago', content: 'New ransomware variant targeting healthcare institutions with enhanced encryption.' },
                            { id: 4, priority: 'HIGH', title: 'Supply Chain Attack', agency: 'DHS', time: '12 minutes ago', content: 'Malicious code injection detected in widely-used software distribution channels.' },
                            { id: 5, priority: 'MEDIUM', title: 'Cyber Espionage', agency: 'NSA', time: '15 minutes ago', content: 'Foreign intelligence service targeting defense contractor networks.' }
                          ].map((feed) => (
                            <motion.div
                              key={feed.id}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`p-4 rounded-lg border ${
                                feed.priority === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30' :
                                feed.priority === 'HIGH' ? 'bg-orange-500/10 border-orange-500/30' :
                                'bg-yellow-500/10 border-yellow-500/30'
                              }`}
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                  <div className={`px-2 py-1 rounded text-xs font-bold ${
                                    feed.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                                    feed.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {feed.priority}
                                  </div>
                                  <div>
                                    <div className="text-white font-semibold text-sm">{feed.title}</div>
                                    <div className="text-slate-400 text-xs">From: {feed.agency} • {feed.time}</div>
                                  </div>
                                </div>
                                <button className="text-slate-400 hover:text-white">
                                  <Eye className="w-4 h-4" />
                                </button>
                              </div>
                              <p className="text-slate-300 text-sm">{feed.content}</p>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </IntelligenceGlassCard>
                  </div>

                  {/* Intelligence Quality Breakdown */}
                  <IntelligenceGlassCard title="Source Reliability Matrix" icon={ShieldAlert} status="VALIDATED">
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold text-sm mb-3">Intelligence Source Quality</h4>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold text-sm">HUMINT</span>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold text-sm">98%</div>
                            <div className="text-xs text-slate-400">Reliability</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <MonitorSpeaker className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-semibold text-sm">SIGINT</span>
                          </div>
                          <div className="text-right">
                            <div className="text-blue-400 font-bold text-sm">95%</div>
                            <div className="text-xs text-slate-400">Reliability</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Globe className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 font-semibold text-sm">OSINT</span>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-400 font-bold text-sm">87%</div>
                            <div className="text-xs text-slate-400">Reliability</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <HardDrive className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold text-sm">CYBER</span>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold text-sm">92%</div>
                            <div className="text-xs text-slate-400">Reliability</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">93.2%</div>
                          <div className="text-xs text-slate-400">Overall Intelligence Quality</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Agency Performance Analytics */}
                <IntelligenceGlassCard title="Agency Performance Analytics" icon={TrendingUp} status="MONITORING">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    <div className="space-y-4">
                      <h4 className="text-white font-semibold text-sm">Response Time Metrics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">NSA Average Response</span>
                          <span className="text-green-400 font-bold text-sm">1.2s</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">CIA Intelligence Sharing</span>
                          <span className="text-blue-400 font-bold text-sm">2.8s</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">FBI Coordination Time</span>
                          <span className="text-purple-400 font-bold text-sm">3.1s</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold text-sm">Efficiency Ratings</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">NSA Processing Rate</span>
                          <span className="text-green-400 font-bold text-sm">96%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">CIA Analysis Accuracy</span>
                          <span className="text-blue-400 font-bold text-sm">94%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">FBI Case Closure Rate</span>
                          <span className="text-purple-400 font-bold text-sm">92%</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="text-white font-semibold text-sm">Collaboration Score</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">Cross-Agency Trust</span>
                          <span className="text-green-400 font-bold text-sm">98%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">Information Sharing</span>
                          <span className="text-blue-400 font-bold text-sm">95%</span>
                        </div>
                        <div className="flex justify-between items-center p-3 bg-slate-800/50 rounded-lg">
                          <span className="text-slate-300 text-sm">Joint Operations</span>
                          <span className="text-purple-400 font-bold text-sm">89%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </IntelligenceGlassCard>

                {/* Intelligence Quality Assessment */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntelligenceGlassCard title="Intelligence Quality Assessment" icon={ShieldAlert} status="VALIDATING">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-green-400 mb-1">97.3%</div>
                          <div className="text-sm text-slate-400">Source Reliability</div>
                        </div>
                        <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400 mb-1">94.8%</div>
                          <div className="text-sm text-slate-400">Information Accuracy</div>
                        </div>
                        <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400 mb-1">96.1%</div>
                          <div className="text-sm text-slate-400">Timeliness Score</div>
                        </div>
                        <div className="text-center p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-orange-400 mb-1">92.7%</div>
                          <div className="text-sm text-slate-400">Completeness Rate</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-purple-400 font-medium text-sm">Quality Validation Results</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 bg-green-500/10 border border-green-500/30 rounded">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-green-400 text-xs">All sources validated and authenticated</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-blue-400 text-xs">Cross-reference validation successful</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span className="text-orange-400 text-xs">Real-time quality monitoring active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Cross-Agency Intelligence Trends" icon={Activity} status="ANALYZING">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">Intelligence Flow Patterns</h4>
                        <select className="px-2 py-1 bg-slate-700/50 border border-slate-600/50 rounded text-white text-xs">
                          <option>Last 24 Hours</option>
                          <option>Last 7 Days</option>
                          <option>Last 30 Days</option>
                        </select>
                      </div>

                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[
                            { time: '00:00', nsa: 45, cia: 32, fbi: 67, dhs: 23 },
                            { time: '06:00', nsa: 52, cia: 41, fbi: 71, dhs: 28 },
                            { time: '12:00', nsa: 48, cia: 38, fbi: 69, dhs: 31 },
                            { time: '18:00', nsa: 61, cia: 47, fbi: 78, dhs: 35 }
                          ]}>
                            <defs>
                              <linearGradient id="nsaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                              </linearGradient>
                              <linearGradient id="ciaGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                              </linearGradient>
                              <linearGradient id="fbiGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                              </linearGradient>
                              <linearGradient id="dhsGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.1}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} />
                            <YAxis stroke="#9ca3af" fontSize={10} />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f9fafb'
                              }}
                            />
                            <Area
                              type="monotone"
                              dataKey="nsa"
                              stackId="1"
                              stroke="#06b6d4"
                              fill="url(#nsaGradient)"
                              name="NSA Intelligence"
                            />
                            <Area
                              type="monotone"
                              dataKey="cia"
                              stackId="2"
                              stroke="#a855f7"
                              fill="url(#ciaGradient)"
                              name="CIA Intelligence"
                            />
                            <Area
                              type="monotone"
                              dataKey="fbi"
                              stackId="3"
                              stroke="#10b981"
                              fill="url(#fbiGradient)"
                              name="FBI Intelligence"
                            />
                            <Area
                              type="monotone"
                              dataKey="dhs"
                              stackId="4"
                              stroke="#f59e0b"
                              fill="url(#dhsGradient)"
                              name="DHS Intelligence"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 font-bold text-sm">+23%</div>
                          <div className="text-xs text-slate-400">Intelligence Flow</div>
                        </div>
                        <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 font-bold text-sm">96%</div>
                          <div className="text-xs text-slate-400">Collaboration Rate</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>
              </div>

              {/* Intelligence Sharing Trends */}
              <IntelligenceGlassCard title="Intelligence Sharing Trends (Last 30 Days)" icon={TrendingUp} status="REAL-TIME">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { date: 'Day 1', shared: 45, received: 38, correlated: 12 },
                      { date: 'Day 2', shared: 52, received: 41, correlated: 15 },
                      { date: 'Day 3', shared: 48, received: 39, correlated: 11 },
                      { date: 'Day 4', shared: 61, received: 47, correlated: 18 },
                      { date: 'Day 5', shared: 55, received: 44, correlated: 16 },
                      { date: 'Day 6', shared: 67, received: 52, correlated: 21 },
                      { date: 'Day 7', shared: 58, received: 46, correlated: 14 },
                      { date: 'Day 8', shared: 63, received: 49, correlated: 19 },
                      { date: 'Day 9', shared: 59, received: 45, correlated: 17 },
                      { date: 'Day 10', shared: 72, received: 55, correlated: 23 }
                    ]}>
                      <defs>
                        <linearGradient id="sharedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="receivedGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#f9fafb'
                        }}
                      />
                      <RechartsLegend />
                      <Area
                        type="monotone"
                        dataKey="shared"
                        stackId="1"
                        stroke="#06b6d4"
                        fill="url(#sharedGradient)"
                        name="Intelligence Shared"
                      />
                      <Area
                        type="monotone"
                        dataKey="received"
                        stackId="2"
                        stroke="#a855f7"
                        fill="url(#receivedGradient)"
                        name="Intelligence Received"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </IntelligenceGlassCard>

              {/* Agency Connectivity Status */}
              <IntelligenceGlassCard title="Agency Connectivity & Health Status" icon={Network} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {governmentAgencies.map((agency) => (
                    <motion.div
                      key={agency.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                    >
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`w-3 h-3 rounded-full ${
                          agency.status === 'CONNECTED' ? 'bg-green-400 animate-pulse' :
                          agency.status === 'WARNING' ? 'bg-yellow-400' : 'bg-red-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{agency.acronym}</div>
                          <div className="text-slate-400 text-xs truncate">{agency.name}</div>
                        </div>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Connectivity:</span>
                          <span className="text-green-400">{agency.connectivity}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Data Exchanges:</span>
                          <span className="text-cyan-400">{agency.dataExchanges}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Intelligence:</span>
                          <span className="text-purple-400">{agency.intelligenceShared}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Threat Level:</span>
                          <span className={`font-semibold ${
                            agency.threatLevel === 'CRITICAL' ? 'text-red-400' :
                            agency.threatLevel === 'HIGH' ? 'text-orange-400' :
                            agency.threatLevel === 'MEDIUM' ? 'text-yellow-400' :
                            'text-green-400'
                          }`}>
                            {agency.threatLevel}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </IntelligenceGlassCard>
            </motion.div>
          )}

          {activeSection === 'agency-collaboration' && (
            <motion.div
              key="agency-collaboration"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Enhanced Agency Collaboration Hub */}
              <div className="space-y-6">
                {/* Advanced Cross-Agency Collaboration Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <IntelligenceGlassCard title="Active Collaborations" icon={Users} status="LIVE">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">47</div>
                      <div className="text-sm text-slate-400">Joint Operations</div>
                      <div className="text-xs text-green-400 mt-2">+5 today</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">12</div>
                          <div className="text-xs text-slate-400">Critical</div>
                        </div>
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">35</div>
                          <div className="text-xs text-slate-400">Ongoing</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">94%</div>
                          <div className="text-xs text-slate-400">Success</div>
                        </div>
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">2.1h</div>
                          <div className="text-xs text-slate-400">Avg Duration</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Resource Sharing" icon={Share2} status="ACTIVE">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">156</div>
                      <div className="text-sm text-slate-400">Shared Assets</div>
                      <div className="text-xs text-blue-400 mt-2">98% utilization</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">89</div>
                          <div className="text-xs text-slate-400">Data</div>
                        </div>
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">67</div>
                          <div className="text-xs text-slate-400">Tools</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-center p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                          <div className="text-orange-400 text-sm font-bold">23</div>
                          <div className="text-xs text-slate-400">Personnel</div>
                        </div>
                        <div className="text-center p-2 bg-indigo-500/10 border border-indigo-500/30 rounded">
                          <div className="text-indigo-400 text-sm font-bold">45GB</div>
                          <div className="text-xs text-slate-400">Bandwidth</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Task Coordination" icon={CheckCircle} status="COORDINATING">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">234</div>
                      <div className="text-sm text-slate-400">Tasks Completed</div>
                      <div className="text-xs text-green-400 mt-2">92% on time</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">45</div>
                          <div className="text-xs text-slate-400">Today</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">189</div>
                          <div className="text-xs text-slate-400">This Week</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">67</div>
                          <div className="text-xs text-slate-400">Active</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                          <div className="text-yellow-400 text-sm font-bold">12</div>
                          <div className="text-xs text-slate-400">Overdue</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Communication Channels" icon={Radio} status="SECURE">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">18</div>
                      <div className="text-sm text-slate-400">Active Channels</div>
                      <div className="text-xs text-green-400 mt-2">100% encrypted</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">12</div>
                          <div className="text-xs text-slate-400">Video</div>
                        </div>
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">6</div>
                          <div className="text-xs text-slate-400">Secure Chat</div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">2.1MB/s</div>
                          <div className="text-xs text-slate-400">Throughput</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">0.8ms</div>
                          <div className="text-xs text-slate-400">Latency</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Collaboration Performance Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntelligenceGlassCard title="Collaboration Performance Insights" icon={TrendingUp} status="ANALYZING">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-green-400 mb-1">96.3%</div>
                          <div className="text-sm text-slate-400">Coordination Efficiency</div>
                        </div>
                        <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400 mb-1">94.7%</div>
                          <div className="text-sm text-slate-400">Resource Utilization</div>
                        </div>
                        <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400 mb-1">97.1%</div>
                          <div className="text-sm text-slate-400">Task Completion Rate</div>
                        </div>
                        <div className="text-center p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-orange-400 mb-1">98.2%</div>
                          <div className="text-sm text-slate-400">Communication Security</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-cyan-400 font-medium text-sm">Performance Metrics Breakdown</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-green-400 text-xs">Response times improved by 23% this month</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-blue-400 text-xs">Resource sharing efficiency at 94.7% utilization</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <span className="text-purple-400 text-xs">Joint operations success rate: 97.1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Cross-Agency Workflow Status" icon={Activity} status="MONITORING">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">Active Workflows</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-xs text-green-400">LIVE</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {[
                          { name: 'Intelligence Sharing Pipeline', agencies: ['NSA', 'CIA', 'FBI'], progress: 87, status: 'ACTIVE', color: 'blue' },
                          { name: 'Joint Threat Assessment', agencies: ['DHS', 'DoD', 'FBI'], progress: 92, status: 'ACTIVE', color: 'green' },
                          { name: 'Resource Allocation Protocol', agencies: ['Treasury', 'State', 'CIA'], progress: 78, status: 'PROCESSING', color: 'purple' },
                          { name: 'Emergency Response Coordination', agencies: ['FBI', 'DHS', 'NSA'], progress: 95, status: 'COMPLETING', color: 'orange' }
                        ].map((workflow) => (
                          <motion.div
                            key={workflow.name}
                            whileHover={{ scale: 1.01 }}
                            className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <div className="text-white font-semibold text-xs">{workflow.name}</div>
                                <div className="text-slate-400 text-xs">{workflow.agencies.join(' ↔ ')}</div>
                              </div>
                              <span className={`px-2 py-1 rounded text-xs font-bold ${
                                workflow.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                                workflow.status === 'PROCESSING' ? 'bg-blue-500/20 text-blue-400' :
                                workflow.status === 'COMPLETING' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-purple-500/20 text-purple-400'
                              }`}>
                                {workflow.status}
                              </span>
                            </div>

                            <div className="space-y-1">
                              <div className="flex justify-between text-xs">
                                <span className="text-slate-400">Progress:</span>
                                <span className="text-white">{workflow.progress}%</span>
                              </div>
                              <div className="w-full bg-slate-600 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${
                                    workflow.color === 'blue' ? 'bg-blue-500' :
                                    workflow.color === 'green' ? 'bg-green-500' :
                                    workflow.color === 'purple' ? 'bg-purple-500' :
                                    'bg-orange-500'
                                  }`}
                                  style={{ width: `${workflow.progress}%` }}
                                ></div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Enhanced Collaboration Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Real-time Agency Status */}
                  <div className="lg:col-span-2 space-y-6">
                    <IntelligenceGlassCard title="Real-time Agency Collaboration Status" icon={Activity} status="LIVE">
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {governmentAgencies.slice(0, 8).map((agency) => (
                            <motion.div
                              key={agency.id}
                              whileHover={{ scale: 1.02 }}
                              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-3 h-3 rounded-full ${agency.status === 'CONNECTED' ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                                  <div>
                                    <div className="text-white font-semibold text-sm">{agency.acronym}</div>
                                    <div className="text-slate-400 text-xs">{agency.intelligenceShared} reports</div>
                                  </div>
                                </div>
                                <div className="flex space-x-1">
                                  <button className="p-1.5 bg-blue-600/20 hover:bg-blue-600/30 rounded text-blue-400 hover:text-blue-300 transition-colors">
                                    <Video className="w-3 h-3" />
                                  </button>
                                  <button className="p-1.5 bg-green-600/20 hover:bg-green-600/30 rounded text-green-400 hover:text-green-300 transition-colors">
                                    <MessageSquare className="w-3 h-3" />
                                  </button>
                                  <button className="p-1.5 bg-purple-600/20 hover:bg-purple-600/30 rounded text-purple-400 hover:text-purple-300 transition-colors">
                                    <Share2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Collaboration Score:</span>
                                  <span className="text-cyan-400 font-semibold">{Math.floor(Math.random() * 20) + 85}%</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Active Tasks:</span>
                                  <span className="text-green-400 font-semibold">{Math.floor(Math.random() * 10) + 1}</span>
                                </div>
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Shared Resources:</span>
                                  <span className="text-purple-400 font-semibold">{Math.floor(Math.random() * 15) + 5}</span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </IntelligenceGlassCard>

                    {/* Joint Operations Dashboard */}
                    <IntelligenceGlassCard title="Joint Operations Coordination" icon={Target} status="ACTIVE">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-semibold text-sm">Active Joint Operations</h4>
                          <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-xs rounded transition-colors">
                            New Operation
                          </button>
                        </div>

                        <div className="space-y-3">
                          {[
                            { id: 1, name: 'Operation Cyber Shield', agencies: ['NSA', 'FBI', 'DHS'], status: 'ACTIVE', priority: 'CRITICAL', progress: 75 },
                            { id: 2, name: 'Task Force Alpha', agencies: ['CIA', 'DoD', 'State'], status: 'PLANNING', priority: 'HIGH', progress: 30 },
                            { id: 3, name: 'Infrastructure Defense', agencies: ['DHS', 'Energy', 'FBI'], status: 'ACTIVE', priority: 'HIGH', progress: 60 },
                            { id: 4, name: 'Counter Intelligence Net', agencies: ['NSA', 'CIA', 'Treasury'], status: 'MONITORING', priority: 'MEDIUM', progress: 85 }
                          ].map((operation) => (
                            <motion.div
                              key={operation.id}
                              whileHover={{ scale: 1.01 }}
                              className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                            >
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <div className="text-white font-semibold text-sm">{operation.name}</div>
                                  <div className="text-slate-400 text-xs">{operation.agencies.join(' • ')}</div>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    operation.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                                    operation.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                                    'bg-yellow-500/20 text-yellow-400'
                                  }`}>
                                    {operation.priority}
                                  </span>
                                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                                    operation.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                                    operation.status === 'PLANNING' ? 'bg-blue-500/20 text-blue-400' :
                                    'bg-cyan-500/20 text-cyan-400'
                                  }`}>
                                    {operation.status}
                                  </span>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                  <span className="text-slate-400">Progress:</span>
                                  <span className="text-white">{operation.progress}%</span>
                                </div>
                                <div className="w-full bg-slate-600 rounded-full h-2">
                                  <div
                                    className={`h-2 rounded-full ${
                                      operation.priority === 'CRITICAL' ? 'bg-red-500' :
                                      operation.priority === 'HIGH' ? 'bg-orange-500' :
                                      'bg-yellow-500'
                                    }`}
                                    style={{ width: `${operation.progress}%` }}
                                  ></div>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </IntelligenceGlassCard>
                  </div>

                  {/* Collaboration Analytics */}
                  <div className="space-y-6">
                    <IntelligenceGlassCard title="Collaboration Analytics" icon={TrendingUp} status="ANALYZING">
                      <div className="space-y-4">
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <RadarChart data={[
                              { subject: 'Coordination', A: 92, fullMark: 100 },
                              { subject: 'Communication', A: 88, fullMark: 100 },
                              { subject: 'Resource Sharing', A: 95, fullMark: 100 },
                              { subject: 'Task Completion', A: 87, fullMark: 100 },
                              { subject: 'Information Flow', A: 91, fullMark: 100 },
                              { subject: 'Joint Decisions', A: 84, fullMark: 100 }
                            ]}>
                              <PolarGrid stroke="#374151" />
                              <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 8 }} />
                              <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 6 }} />
                              <Radar
                                name="Collaboration Score"
                                dataKey="A"
                                stroke="#06b6d4"
                                fill="#06b6d4"
                                fillOpacity={0.2}
                                strokeWidth={2}
                              />
                              <RechartsTooltip
                                contentStyle={{
                                  backgroundColor: '#1f2937',
                                  border: '1px solid #374151',
                                  borderRadius: '8px',
                                  color: '#f9fafb'
                                }}
                              />
                            </RadarChart>
                          </ResponsiveContainer>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                            <span className="text-slate-300 text-sm">Overall Score</span>
                            <span className="text-cyan-400 font-bold text-lg">91%</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                            <span className="text-slate-300 text-sm">Efficiency Rate</span>
                            <span className="text-green-400 font-bold text-lg">94%</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                            <span className="text-slate-300 text-sm">Response Time</span>
                            <span className="text-purple-400 font-bold text-lg">1.8s</span>
                          </div>
                        </div>
                      </div>
                    </IntelligenceGlassCard>

                    {/* Resource Sharing Status */}
                    <IntelligenceGlassCard title="Resource Sharing Matrix" icon={Share2} status="ACTIVE">
                      <div className="space-y-3">
                        <div className="text-sm text-slate-300 mb-3">Cross-Agency Resource Utilization</div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 bg-green-500/10 border border-green-500/30 rounded">
                            <span className="text-green-400 text-sm font-semibold">Data Intelligence</span>
                            <span className="text-slate-300 text-xs">98% shared</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                            <span className="text-blue-400 text-sm font-semibold">Technical Assets</span>
                            <span className="text-slate-300 text-xs">95% shared</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                            <span className="text-purple-400 text-sm font-semibold">Personnel Resources</span>
                            <span className="text-slate-300 text-xs">89% coordinated</span>
                          </div>
                          <div className="flex items-center justify-between p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                            <span className="text-orange-400 text-sm font-semibold">Budget Allocation</span>
                            <span className="text-slate-300 text-xs">92% optimized</span>
                          </div>
                        </div>
                      </div>
                    </IntelligenceGlassCard>
                  </div>
                </div>

                {/* Secure Communication Channel */}
                <IntelligenceGlassCard title="Secure Communication Channel" icon={Lock} status="ENCRYPTED">
                  <div className="flex flex-col h-96">
                    {/* Chat Messages */}
                    <div className="flex-1 overflow-y-auto space-y-3 mb-4">
                      {chatMessages.map((msg) => (
                        <div key={msg.id} className="p-3 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-cyan-400 font-semibold text-sm">{msg.sender}</span>
                            <span className="text-slate-400 text-xs">•</span>
                            <span className="text-slate-400 text-xs">{msg.agency}</span>
                            <span className="text-slate-500 text-xs ml-auto">
                              {msg.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-white text-sm">{msg.message}</p>
                        </div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type secure message..."
                        className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/30 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500/50"
                      />
                      <button
                        onClick={handleSendMessage}
                        className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </IntelligenceGlassCard>
              </div>
            </motion.div>
          )}

          {activeSection === 'threat-correlation' && (
            <motion.div
              key="threat-correlation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Advanced Threat Correlation Dashboard */}
              <div className="space-y-6">
                {/* Enhanced Unified Threat Assessment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <IntelligenceGlassCard title="Current Threat Level" icon={AlertTriangle} status="CRITICAL">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400 mb-2">CRITICAL</div>
                      <div className="text-sm text-slate-400">Active Threat Status</div>
                      <div className="text-xs text-red-400 mt-2">Immediate Action Required</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-red-500/10 border border-red-500/30 rounded">
                          <div className="text-red-400 text-sm font-bold">5</div>
                          <div className="text-xs text-slate-400">Critical</div>
                        </div>
                        <div className="text-center p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                          <div className="text-orange-400 text-sm font-bold">18</div>
                          <div className="text-xs text-slate-400">High</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Active Correlations" icon={Target} status="ANALYZING">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-2">23</div>
                      <div className="text-sm text-slate-400">Cross-Agency Links</div>
                      <div className="text-xs text-green-400 mt-2">+7 new today</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">16</div>
                          <div className="text-xs text-slate-400">Validated</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                          <div className="text-yellow-400 text-sm font-bold">7</div>
                          <div className="text-xs text-slate-400">Pending</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Detection Accuracy" icon={Zap} status="HIGH">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-400 mb-2">89%</div>
                      <div className="text-sm text-slate-400">Correlation Success</div>
                      <div className="text-xs text-green-400 mt-2">+2.3% this week</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">94%</div>
                          <div className="text-xs text-slate-400">Precision</div>
                        </div>
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">87%</div>
                          <div className="text-xs text-slate-400">Recall</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Response Effectiveness" icon={Shield} status="MONITORING">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">92%</div>
                      <div className="text-sm text-slate-400">Threat Mitigation</div>
                      <div className="text-xs text-green-400 mt-2">Above Target</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">1.2s</div>
                          <div className="text-xs text-slate-400">Avg Response</div>
                        </div>
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">98%</div>
                          <div className="text-xs text-slate-400">Success Rate</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Threat Correlation Performance Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntelligenceGlassCard title="Advanced Threat Correlation Analytics" icon={BarChart3} status="ANALYZING">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-red-400 mb-1">96.7%</div>
                          <div className="text-sm text-slate-400">False Positive Rate</div>
                        </div>
                        <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400 mb-1">94.2%</div>
                          <div className="text-sm text-slate-400">Correlation Speed</div>
                        </div>
                        <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400 mb-1">97.8%</div>
                          <div className="text-sm text-slate-400">Pattern Recognition</div>
                        </div>
                        <div className="text-center p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-orange-400 mb-1">95.3%</div>
                          <div className="text-sm text-slate-400">Intelligence Quality</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-cyan-400 font-medium text-sm">Correlation Performance Metrics</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-green-400 text-xs">Correlation accuracy improved by 3.2% this month</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-blue-400 text-xs">Response time reduced to 1.2 seconds average</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <span className="text-purple-400 text-xs">Cross-agency correlation success rate at 97.8%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Real-time Correlation Alerts" icon={Activity} status="LIVE">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">Live Correlation Feed</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-xs text-green-400">LIVE</span>
                        </div>
                      </div>

                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {[
                          { id: 1, type: 'HIGH_CORRELATION', agency: 'NSA + CIA', threat: 'APT-45 Infrastructure', confidence: 94, time: '2 min ago' },
                          { id: 2, type: 'NEW_PATTERN', agency: 'FBI + DHS', threat: 'Ransomware Campaign', confidence: 87, time: '5 min ago' },
                          { id: 3, type: 'CROSS_VALIDATION', agency: 'DoD + State', threat: 'Supply Chain Attack', confidence: 91, time: '8 min ago' },
                          { id: 4, type: 'THREAT_ESCALATION', agency: 'CIA + NSA', threat: 'State Actor Activity', confidence: 96, time: '12 min ago' },
                          { id: 5, type: 'INTEL_CORRELATION', agency: 'FBI + Treasury', threat: 'Financial Malware', confidence: 89, time: '15 min ago' }
                        ].map((alert) => (
                          <motion.div
                            key={alert.id}
                            whileHover={{ scale: 1.01 }}
                            className={`p-3 rounded-lg border ${
                              alert.type === 'HIGH_CORRELATION' ? 'bg-red-500/10 border-red-500/30' :
                              alert.type === 'NEW_PATTERN' ? 'bg-orange-500/10 border-orange-500/30' :
                              alert.type === 'CROSS_VALIDATION' ? 'bg-blue-500/10 border-blue-500/30' :
                              alert.type === 'THREAT_ESCALATION' ? 'bg-purple-500/10 border-purple-500/30' :
                              'bg-yellow-500/10 border-yellow-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                  alert.type === 'HIGH_CORRELATION' ? 'bg-red-500/20 text-red-400' :
                                  alert.type === 'NEW_PATTERN' ? 'bg-orange-500/20 text-orange-400' :
                                  alert.type === 'CROSS_VALIDATION' ? 'bg-blue-500/20 text-blue-400' :
                                  alert.type === 'THREAT_ESCALATION' ? 'bg-purple-500/20 text-purple-400' :
                                  'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {alert.type.split('_').join(' ')}
                                </span>
                                <span className="text-cyan-400 font-semibold text-xs">{alert.confidence}%</span>
                              </div>
                              <span className="text-slate-400 text-xs">{alert.time}</span>
                            </div>
                            <div className="text-white font-semibold text-sm mb-1">{alert.threat}</div>
                            <div className="text-slate-400 text-xs">{alert.agency}</div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Unified Threat Assessment */}
                <IntelligenceGlassCard title="Unified Threat Assessment Dashboard" icon={ShieldAlert} status="CRITICAL">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                      <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-red-400 mb-1">CRITICAL</div>
                      <div className="text-sm text-slate-400">Current Threat Level</div>
                    </div>
                    <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                      <Target className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-orange-400 mb-1">23</div>
                      <div className="text-sm text-slate-400">Active Correlations</div>
                    </div>
                    <div className="text-center p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                      <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-yellow-400 mb-1">89%</div>
                      <div className="text-sm text-slate-400">Detection Accuracy</div>
                    </div>
                  </div>

                  {/* Enhanced Threat Correlation Matrix */}
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[
                        { agency: 'NSA', threats: 45, correlations: 12, shared: 8, accuracy: 96 },
                        { agency: 'CIA', threats: 32, correlations: 9, shared: 6, accuracy: 93 },
                        { agency: 'FBI', threats: 67, correlations: 18, shared: 15, accuracy: 98 },
                        { agency: 'DHS', threats: 54, correlations: 14, shared: 11, accuracy: 95 },
                        { agency: 'DoD', threats: 41, correlations: 11, shared: 9, accuracy: 92 },
                        { agency: 'Treasury', threats: 28, correlations: 7, shared: 5, accuracy: 89 }
                      ]}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="agency" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#f9fafb'
                          }}
                        />
                        <RechartsLegend />
                        <RechartsBar dataKey="threats" fill="#ef4444" name="Detected Threats" />
                        <RechartsBar dataKey="correlations" fill="#f97316" name="Correlations Found" />
                        <RechartsBar dataKey="shared" fill="#06b6d4" name="Intelligence Shared" />
                        <RechartsBar dataKey="accuracy" fill="#10b981" name="Correlation Accuracy %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </IntelligenceGlassCard>

                {/* Cross-Agency Threat Correlation Patterns */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <IntelligenceGlassCard title="Cross-Agency Threat Correlation Patterns" icon={Network} status="ANALYZING">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-white font-semibold text-sm">Correlation Network Map</h4>
                          <select className="px-2 py-1 bg-slate-700/50 border border-slate-600/50 rounded text-white text-xs">
                            <option>Last 24 Hours</option>
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                          </select>
                        </div>

                        <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 p-6 relative overflow-hidden">
                          <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-10 left-10 w-24 h-24 bg-red-500/40 rounded-full blur-xl"></div>
                            <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500/40 rounded-full blur-xl"></div>
                            <div className="absolute top-1/2 left-1/2 w-28 h-28 bg-yellow-500/40 rounded-full blur-xl"></div>
                          </div>

                          {/* Correlation Network Nodes */}
                          <div className="relative h-full flex items-center justify-center">
                            {[
                              { name: 'NSA', x: 25, y: 20, connections: 5, color: 'red' },
                              { name: 'CIA', x: 75, y: 20, connections: 4, color: 'orange' },
                              { name: 'FBI', x: 50, y: 50, connections: 6, color: 'yellow' },
                              { name: 'DHS', x: 25, y: 80, connections: 4, color: 'blue' },
                              { name: 'DoD', x: 75, y: 80, connections: 3, color: 'purple' }
                            ].map((node, index) => (
                              <motion.div
                                key={node.name}
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [0.7, 1, 0.7]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: index * 0.3
                                }}
                                className="absolute flex flex-col items-center"
                                style={{
                                  left: `${node.x}%`,
                                  top: `${node.y}%`,
                                  transform: 'translate(-50%, -50%)'
                                }}
                              >
                                <div className={`w-12 h-12 bg-${node.color}-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20`}>
                                  <span className="text-white font-bold text-xs">{node.name.substring(0, 2)}</span>
                                </div>
                                <div className="text-center mt-2">
                                  <div className="text-white text-xs font-semibold">{node.name}</div>
                                  <div className="text-slate-400 text-xs">{node.connections} links</div>
                                </div>
                              </motion.div>
                            ))}

                            {/* Connection Lines */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                              <defs>
                                <marker id="arrowhead" markerWidth="10" markerHeight="7"
                                  refX="9" refY="3.5" orient="auto">
                                  <polygon points="0 0, 10 3.5, 0 7" fill="#06b6d4" />
                                </marker>
                              </defs>
                              <line x1="25%" y1="20%" x2="75%" y2="20%" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="75%" y1="20%" x2="50%" y2="50%" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="50%" y1="50%" x2="25%" y2="80%" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="50%" y1="50%" x2="75%" y2="80%" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                              <line x1="25%" y1="20%" x2="50%" y2="50%" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrowhead)" />
                            </svg>
                          </div>

                          {/* Network Stats */}
                          <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
                            <div className="text-white text-sm font-semibold mb-2">Network Stats</div>
                            <div className="space-y-1 text-xs">
                              <div className="flex justify-between">
                                <span className="text-slate-300">Active Nodes:</span>
                                <span className="text-green-400">5</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Connections:</span>
                                <span className="text-cyan-400">8</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-300">Data Flow:</span>
                                <span className="text-purple-400">1.2 GB/s</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </IntelligenceGlassCard>
                  </div>

                  {/* Threat Correlation Insights */}
                  <IntelligenceGlassCard title="Correlation Confidence Analysis" icon={Gauge} status="VALIDATING">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Threat Correlation Confidence Levels</div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-red-400">Critical Threats</span>
                            <span className="text-red-400 font-bold">98%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-red-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-orange-400">High Priority</span>
                            <span className="text-orange-400 font-bold">94%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-yellow-400">Medium Risk</span>
                            <span className="text-yellow-400 font-bold">87%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-400">Low Risk</span>
                            <span className="text-blue-400 font-bold">76%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '76%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">89.2%</div>
                          <div className="text-xs text-slate-400">Overall Correlation Confidence</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <h5 className="text-cyan-400 font-medium text-sm">Recent Correlations</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-green-400 text-xs">APT-45 correlation validated</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span className="text-orange-400 text-xs">Ransomware pattern identified</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-blue-400 text-xs">Supply chain threat correlated</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'data-exchange' && (
            <motion.div
              key="data-exchange"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Advanced Data Exchange Architecture */}
              <div className="space-y-6">
                {/* Enhanced Data Exchange Metrics Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <IntelligenceGlassCard title="Exchange Success Rate" icon={CheckCircle} status="EXCELLENT">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                      <div className="text-sm text-slate-400">Success Rate</div>
                      <div className="text-xs text-green-400 mt-2">Zero Failures Today</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">1,049</div>
                          <div className="text-xs text-slate-400">Successful</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">3</div>
                          <div className="text-xs text-slate-400">Retried</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Data Throughput" icon={Database} status="HIGH">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">2.4GB</div>
                      <div className="text-sm text-slate-400">Data Transferred</div>
                      <div className="text-xs text-blue-400 mt-2">+18.7% this week</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">1.2GB</div>
                          <div className="text-xs text-slate-400">Incoming</div>
                        </div>
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">1.2GB</div>
                          <div className="text-xs text-slate-400">Outgoing</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Encryption Security" icon={Lock} status="SECURE">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">256-bit</div>
                      <div className="text-sm text-slate-400">AES Encryption</div>
                      <div className="text-xs text-purple-400 mt-2">Military Grade</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">100%</div>
                          <div className="text-xs text-slate-400">Encrypted</div>
                        </div>
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">FIPS</div>
                          <div className="text-xs text-slate-400">Compliant</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Active Exchanges" icon={Activity} status="PROCESSING">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">1,049</div>
                      <div className="text-sm text-slate-400">Total Exchanges</div>
                      <div className="text-xs text-cyan-400 mt-2">+23 exchanges/hour</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">87</div>
                          <div className="text-xs text-slate-400">Active</div>
                        </div>
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">962</div>
                          <div className="text-xs text-slate-400">Completed</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Secure Data Exchange Analytics */}
                <IntelligenceGlassCard title="Secure Data Exchange Analytics" icon={Share2} status="MONITORING">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                    <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-green-400 mb-1">99.9%</div>
                      <div className="text-sm text-slate-400">Success Rate</div>
                    </div>
                    <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Database className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-blue-400 mb-1">2.4GB</div>
                      <div className="text-sm text-slate-400">Data Transferred</div>
                    </div>
                    <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <Lock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-purple-400 mb-1">256-bit</div>
                      <div className="text-sm text-slate-400">Encryption</div>
                    </div>
                    <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                      <Activity className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-cyan-400 mb-1">1,049</div>
                      <div className="text-sm text-slate-400">Total Exchanges</div>
                    </div>
                  </div>

                  {/* Enhanced Data Exchange Volume Trends */}
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { time: '00:00', volume: 45, encrypted: 42, verified: 41 },
                        { time: '04:00', volume: 32, encrypted: 31, verified: 29 },
                        { time: '08:00', volume: 78, encrypted: 76, verified: 74 },
                        { time: '12:00', volume: 95, encrypted: 93, verified: 91 },
                        { time: '16:00', volume: 87, encrypted: 85, verified: 83 },
                        { time: '20:00', volume: 56, encrypted: 54, verified: 52 }
                      ]}>
                        <defs>
                          <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="encryptedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="verifiedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#f9fafb'
                          }}
                        />
                        <RechartsLegend />
                        <Area
                          type="monotone"
                          dataKey="volume"
                          stackId="1"
                          stroke="#a855f7"
                          fill="url(#volumeGradient)"
                          name="Total Volume"
                        />
                        <Area
                          type="monotone"
                          dataKey="encrypted"
                          stackId="2"
                          stroke="#10b981"
                          fill="url(#encryptedGradient)"
                          name="Encrypted Data"
                        />
                        <Area
                          type="monotone"
                          dataKey="verified"
                          stackId="3"
                          stroke="#06b6d4"
                          fill="url(#verifiedGradient)"
                          name="Verified Transfers"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </IntelligenceGlassCard>

                {/* Data Exchange Performance Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntelligenceGlassCard title="Data Exchange Performance Analytics" icon={TrendingUp} status="OPTIMIZING">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-green-400 mb-1">98.7%</div>
                          <div className="text-sm text-slate-400">Transfer Success</div>
                        </div>
                        <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-blue-400 mb-1">1.2s</div>
                          <div className="text-sm text-slate-400">Average Latency</div>
                        </div>
                        <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-purple-400 mb-1">2.4GB/s</div>
                          <div className="text-sm text-slate-400">Peak Throughput</div>
                        </div>
                        <div className="text-center p-4 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                          <div className="text-2xl font-bold text-orange-400 mb-1">99.99%</div>
                          <div className="text-sm text-slate-400">Data Integrity</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <h5 className="text-cyan-400 font-medium text-sm">Exchange Performance Metrics</h5>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-green-400 text-xs">Transfer speeds improved by 15% this month</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-blue-400 text-xs">Latency reduced to industry-leading levels</span>
                          </div>
                          <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                            <span className="text-purple-400 text-xs">All exchanges maintain 100% data integrity</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Real-time Exchange Monitoring" icon={MonitorSpeaker} status="LIVE">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">Active Data Exchanges</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-xs text-green-400">LIVE</span>
                        </div>
                      </div>

                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {[
                          { id: 1, type: 'INTEL_TRANSFER', from: 'NSA', to: 'CIA', size: '2.3GB', status: 'COMPLETED', time: '2 min ago' },
                          { id: 2, type: 'THREAT_DATA', from: 'FBI', to: 'DHS', size: '1.8GB', status: 'IN_PROGRESS', time: '5 min ago' },
                          { id: 3, type: 'ANALYSIS_RESULTS', from: 'CIA', to: 'NSA', size: '956MB', status: 'COMPLETED', time: '8 min ago' },
                          { id: 4, type: 'SURVEILLANCE_FEED', from: 'DHS', to: 'DoD', size: '4.2GB', status: 'IN_PROGRESS', time: '12 min ago' },
                          { id: 5, type: 'COORDINATION_DATA', from: 'Treasury', to: 'State', size: '734MB', status: 'COMPLETED', time: '15 min ago' }
                        ].map((exchange) => (
                          <motion.div
                            key={exchange.id}
                            whileHover={{ scale: 1.01 }}
                            className={`p-3 rounded-lg border ${
                              exchange.status === 'COMPLETED' ? 'bg-green-500/10 border-green-500/30' :
                              exchange.status === 'IN_PROGRESS' ? 'bg-blue-500/10 border-blue-500/30' :
                              'bg-yellow-500/10 border-yellow-500/30'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded text-xs font-bold ${
                                  exchange.type === 'INTEL_TRANSFER' ? 'bg-purple-500/20 text-purple-400' :
                                  exchange.type === 'THREAT_DATA' ? 'bg-red-500/20 text-red-400' :
                                  exchange.type === 'ANALYSIS_RESULTS' ? 'bg-blue-500/20 text-blue-400' :
                                  exchange.type === 'SURVEILLANCE_FEED' ? 'bg-green-500/20 text-green-400' :
                                  'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {exchange.type.split('_').join(' ')}
                                </span>
                                <span className="text-cyan-400 font-semibold text-xs">{exchange.size}</span>
                              </div>
                              <span className="text-slate-400 text-xs">{exchange.time}</span>
                            </div>
                            <div className="text-white font-semibold text-sm mb-1">
                              {exchange.from} → {exchange.to}
                            </div>
                            <div className="flex items-center justify-between">
                              <span className={`text-xs font-bold ${
                                exchange.status === 'COMPLETED' ? 'text-green-400' :
                                exchange.status === 'IN_PROGRESS' ? 'text-blue-400' :
                                'text-yellow-400'
                              }`}>
                                {exchange.status}
                              </span>
                              {exchange.status === 'IN_PROGRESS' && (
                                <div className="w-16 bg-slate-600 rounded-full h-1">
                                  <div className="bg-blue-400 h-1 rounded-full animate-pulse" style={{ width: '60%' }}></div>
                                </div>
                              )}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Data Exchange Security & Compliance */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <IntelligenceGlassCard title="Exchange Security Protocols" icon={Shield} status="SECURE">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Security Verification Status</div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold text-sm">End-to-End Encryption</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-semibold text-sm">Digital Signatures</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 font-semibold text-sm">Integrity Verification</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-purple-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Database className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold text-sm">Secure Storage</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-cyan-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400 font-semibold text-sm">Audit Logging</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-orange-400" />
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">100%</div>
                          <div className="text-xs text-slate-400">Security Compliance Rate</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Data Exchange Compliance" icon={FileCheck} status="COMPLIANT">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Regulatory Compliance Status</div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">FISMA Compliant</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">NIST Framework</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">FIPS 140-2</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">CJIS Security</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">Executive Order 13526</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded">
                        <div className="text-center">
                          <div className="text-green-400 font-bold text-lg mb-1">FULL COMPLIANCE</div>
                          <div className="text-xs text-slate-400">All Federal Standards Met</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Exchange Performance Trends" icon={BarChart3} status="ANALYZING">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Monthly Performance Trends</div>

                      <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-green-400 font-semibold text-sm">Success Rate</span>
                            <span className="text-blue-400 text-xs">↑ 0.1%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Maintaining industry-leading reliability</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-blue-400 font-semibold text-sm">Throughput</span>
                            <span className="text-purple-400 text-xs">↑ 18.7%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Significant improvement in data transfer speeds</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-purple-400 font-semibold text-sm">Security</span>
                            <span className="text-cyan-400 text-xs">Zero Incidents</span>
                          </div>
                          <div className="text-slate-300 text-xs">Perfect security record maintained</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-cyan-400 font-semibold text-sm">Compliance</span>
                            <span className="text-indigo-400 text-xs">100%</span>
                          </div>
                          <div className="text-slate-300 text-xs">All regulatory requirements satisfied</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">+12.8%</div>
                          <div className="text-xs text-slate-400">Overall Performance Improvement</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'secure-comms' && (
            <motion.div
              key="secure-comms"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Advanced Secure Communication Networks */}
              <div className="space-y-6">
                {/* Enhanced Communication Metrics Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <IntelligenceGlassCard title="Active Communication Channels" icon={Radio} status="SECURE">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">24</div>
                      <div className="text-sm text-slate-400">Secure Channels</div>
                      <div className="text-xs text-green-400 mt-2">All Encrypted</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">18</div>
                          <div className="text-xs text-slate-400">Video</div>
                        </div>
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">6</div>
                          <div className="text-xs text-slate-400">Chat</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Message Throughput" icon={Send} status="HIGH">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">1,247</div>
                      <div className="text-sm text-slate-400">Messages/Minute</div>
                      <div className="text-xs text-green-400 mt-2">Peak Performance</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">892</div>
                          <div className="text-xs text-slate-400">Sent</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">355</div>
                          <div className="text-xs text-slate-400">Received</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Communication Security" icon={Lock} status="ENCRYPTED">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">AES-256</div>
                      <div className="text-sm text-slate-400">End-to-End Encryption</div>
                      <div className="text-xs text-purple-400 mt-2">Military Grade</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">100%</div>
                          <div className="text-xs text-slate-400">Secure</div>
                        </div>
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">0</div>
                          <div className="text-xs text-slate-400">Breaches</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Response Time" icon={Clock} status="OPTIMAL">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-400 mb-2">0.8s</div>
                      <div className="text-sm text-slate-400">Average Latency</div>
                      <div className="text-xs text-blue-400 mt-2">Real-time Performance</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">0.3s</div>
                          <div className="text-xs text-slate-400">Min</div>
                        </div>
                        <div className="text-center p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="text-blue-400 text-sm font-bold">2.1s</div>
                          <div className="text-xs text-slate-400">Max</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Advanced Secure Communication Networks */}
                <IntelligenceGlassCard title="Advanced Secure Communication Networks" icon={Radio} status="ENCRYPTED">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Enhanced Video Conferences */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm flex items-center">
                          <Video className="w-5 h-5 text-blue-400 mr-2" />
                          Video Conferences
                        </h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-xs text-green-400">LIVE</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-white font-semibold text-sm">National Security Council</div>
                              <div className="text-slate-400 text-xs">Crisis Management Session</div>
                            </div>
                            <span className="text-green-400 text-xs font-bold">ACTIVE</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300">Participants: 12</span>
                            <span className="text-slate-300">Duration: 2h 34m</span>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded text-green-400 hover:text-green-300 transition-colors">
                              <Phone className="w-3 h-3" />
                            </button>
                            <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded text-blue-400 hover:text-blue-300 transition-colors">
                              <MonitorSpeaker className="w-3 h-3" />
                            </button>
                            <button className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded text-red-400 hover:text-red-300 transition-colors">
                              <XCircle className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-white font-semibold text-sm">Threat Assessment Team</div>
                              <div className="text-slate-400 text-xs">Daily Intelligence Brief</div>
                            </div>
                            <span className="text-green-400 text-xs font-bold">ACTIVE</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300">Participants: 8</span>
                            <span className="text-slate-300">Duration: 1h 12m</span>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded text-green-400 hover:text-green-300 transition-colors">
                              <Phone className="w-3 h-3" />
                            </button>
                            <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded text-blue-400 hover:text-blue-300 transition-colors">
                              <MonitorSpeaker className="w-3 h-3" />
                            </button>
                            <button className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded text-red-400 hover:text-red-300 transition-colors">
                              <XCircle className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <div className="text-white font-semibold text-sm">Joint Operations Center</div>
                              <div className="text-slate-400 text-xs">Field Coordination</div>
                            </div>
                            <span className="text-orange-400 text-xs font-bold">SCHEDULED</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-slate-300">Participants: 15</span>
                            <span className="text-slate-300">Starts: 14:00</span>
                          </div>
                          <div className="flex space-x-2 mt-3">
                            <button className="p-2 bg-blue-600/20 hover:bg-blue-600/30 rounded text-blue-400 hover:text-blue-300 transition-colors">
                              <Calendar className="w-3 h-3" />
                            </button>
                            <button className="p-2 bg-green-600/20 hover:bg-green-600/30 rounded text-green-400 hover:text-green-300 transition-colors">
                              <Users className="w-3 h-3" />
                            </button>
                            <button className="p-2 bg-red-600/20 hover:bg-red-600/30 rounded text-red-400 hover:text-red-300 transition-colors">
                              <XCircle className="w-3 h-3" />
                            </button>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Enhanced Encrypted Messaging */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm flex items-center">
                          <MessageSquare className="w-5 h-5 text-green-400 mr-2" />
                          Encrypted Messaging Hub
                        </h4>
                        <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                          New Message
                        </button>
                      </div>

                      <div className="space-y-3 max-h-80 overflow-y-auto">
                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-red-400 font-bold text-sm">CRITICAL ALERT</span>
                            <span className="text-red-400 text-xs">2 min ago</span>
                          </div>
                          <div className="text-slate-300 text-sm mb-2">Critical infrastructure threat detected in transportation sector. Immediate coordination required.</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-cyan-400">From: NSA → All Agencies</span>
                            <div className="flex space-x-1">
                              <button className="p-1 bg-blue-600/20 rounded text-blue-400 hover:text-blue-300">
                                <Eye className="w-3 h-3" />
                              </button>
                              <button className="p-1 bg-green-600/20 rounded text-green-400 hover:text-green-300">
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-400 font-bold text-sm">OPERATION UPDATE</span>
                            <span className="text-green-400 text-xs">8 min ago</span>
                          </div>
                          <div className="text-slate-300 text-sm mb-2">Operation successful. 15 suspects apprehended. Full debrief in progress.</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-cyan-400">From: FBI → DHS, DoD</span>
                            <div className="flex space-x-1">
                              <button className="p-1 bg-blue-600/20 rounded text-blue-400 hover:text-blue-300">
                                <Eye className="w-3 h-3" />
                              </button>
                              <button className="p-1 bg-green-600/20 rounded text-green-400 hover:text-green-300">
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-400 font-bold text-sm">INTEL SHARING</span>
                            <span className="text-blue-400 text-xs">12 min ago</span>
                          </div>
                          <div className="text-slate-300 text-sm mb-2">New cyber threat patterns identified. Analysis shared with intelligence community.</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-cyan-400">From: CIA → NSA, DHS</span>
                            <div className="flex space-x-1">
                              <button className="p-1 bg-blue-600/20 rounded text-blue-400 hover:text-blue-300">
                                <Eye className="w-3 h-3" />
                              </button>
                              <button className="p-1 bg-green-600/20 rounded text-green-400 hover:text-green-300">
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          className="p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-yellow-400 font-bold text-sm">COORDINATION</span>
                            <span className="text-yellow-400 text-xs">18 min ago</span>
                          </div>
                          <div className="text-slate-300 text-sm mb-2">Joint investigation team assembled. Requesting additional resources from Treasury.</div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-cyan-400">From: DHS → Treasury, FBI</span>
                            <div className="flex space-x-1">
                              <button className="p-1 bg-blue-600/20 rounded text-blue-400 hover:text-blue-300">
                                <Eye className="w-3 h-3" />
                              </button>
                              <button className="p-1 bg-green-600/20 rounded text-green-400 hover:text-green-300">
                                <Send className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Advanced Security & Compliance */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm flex items-center">
                          <Shield className="w-5 h-5 text-purple-400 mr-2" />
                          Communication Security Status
                        </h4>
                        <div className="flex items-center space-x-2">
                          <Lock className="w-4 h-4 text-green-400" />
                          <span className="text-xs text-green-400">SECURE</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold text-sm">AES-256 Encryption</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-semibold text-sm">Zero Trust Framework</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Network className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 font-semibold text-sm">VPN Secure Tunnels</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-purple-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold text-sm">Intrusion Detection</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-cyan-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Activity className="w-4 h-4 text-orange-400" />
                            <span className="text-orange-400 font-semibold text-sm">Audit Logging</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-orange-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                            <span className="text-red-400 font-semibold text-sm">Threat Monitoring</span>
                          </div>
                          <CheckCircle className="w-5 h-5 text-red-400" />
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">100%</div>
                          <div className="text-xs text-slate-400">Communication Security</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </IntelligenceGlassCard>

                {/* Communication Analytics & Performance */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntelligenceGlassCard title="Communication Analytics Dashboard" icon={BarChart3} status="MONITORING">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Real-time Communication Metrics</div>

                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={[
                            { time: '00:00', messages: 45, calls: 8, conferences: 3 },
                            { time: '06:00', messages: 67, calls: 12, conferences: 5 },
                            { time: '12:00', messages: 89, calls: 15, conferences: 7 },
                            { time: '18:00', messages: 78, calls: 11, conferences: 4 }
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} />
                            <YAxis stroke="#9ca3af" fontSize={10} />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f9fafb'
                              }}
                            />
                            <RechartsLegend />
                            <RechartsLine
                              type="monotone"
                              dataKey="messages"
                              stroke="#06b6d4"
                              strokeWidth={2}
                              name="Secure Messages"
                            />
                            <RechartsLine
                              type="monotone"
                              dataKey="calls"
                              stroke="#10b981"
                              strokeWidth={2}
                              name="Video Calls"
                            />
                            <RechartsLine
                              type="monotone"
                              dataKey="conferences"
                              stroke="#a855f7"
                              strokeWidth={2}
                              name="Conferences"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 font-bold text-sm">89</div>
                          <div className="text-xs text-slate-400">Messages/Hr</div>
                        </div>
                        <div className="p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 font-bold text-sm">15</div>
                          <div className="text-xs text-slate-400">Active Calls</div>
                        </div>
                        <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 font-bold text-sm">7</div>
                          <div className="text-xs text-slate-400">Conferences</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Secure Communication Compliance" icon={FileCheck} status="COMPLIANT">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Regulatory Compliance Status</div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">FISMA Compliant</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">NIST 800-53</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">CJIS Security</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">FIPS 140-2</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">Executive Order 13526</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>

                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <span className="text-green-400 font-semibold text-sm">Communications Act</span>
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded">
                        <div className="text-center">
                          <div className="text-green-400 font-bold text-lg mb-1">FULL COMPLIANCE</div>
                          <div className="text-xs text-slate-400">All Communication Standards Met</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Advanced Communication Protocols & Features */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <IntelligenceGlassCard title="Communication Protocols" icon={Settings} status="ACTIVE">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Active Security Protocols</div>

                      <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-400 font-semibold text-sm">Quantum Key Distribution</span>
                            <span className="text-green-400 text-xs">Active</span>
                          </div>
                          <div className="text-slate-300 text-xs">Unbreakable encryption keys</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-400 font-semibold text-sm">Perfect Forward Secrecy</span>
                            <span className="text-green-400 text-xs">Enabled</span>
                          </div>
                          <div className="text-slate-300 text-xs">Session keys never reused</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-400 font-semibold text-sm">End-to-End Verification</span>
                            <span className="text-green-400 text-xs">Verified</span>
                          </div>
                          <div className="text-slate-300 text-xs">Message authenticity guaranteed</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-400 font-semibold text-sm">Traffic Obfuscation</span>
                            <span className="text-green-400 text-xs">Active</span>
                          </div>
                          <div className="text-slate-300 text-xs">Pattern analysis protection</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Communication Features" icon={Zap} status="ADVANCED">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Advanced Communication Capabilities</div>

                      <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-cyan-400 font-semibold text-sm">Real-time Translation</span>
                            <span className="text-green-400 text-xs">12 Languages</span>
                          </div>
                          <div className="text-slate-300 text-xs">AI-powered simultaneous translation</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-400 font-semibold text-sm">Priority Routing</span>
                            <span className="text-green-400 text-xs">Intelligent</span>
                          </div>
                          <div className="text-slate-300 text-xs">Context-aware message prioritization</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-green-400 font-semibold text-sm">Secure File Transfer</span>
                            <span className="text-green-400 text-xs">Up to 10GB</span>
                          </div>
                          <div className="text-slate-300 text-xs">Encrypted large file transfers</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-yellow-400 font-semibold text-sm">Emergency Broadcasting</span>
                            <span className="text-green-400 text-xs">Available</span>
                          </div>
                          <div className="text-slate-300 text-xs">Instant all-agency alerts</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Communication Performance" icon={TrendingUp} status="OPTIMAL">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Performance Metrics & Trends</div>

                      <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-green-400 font-semibold text-sm">Uptime</span>
                            <span className="text-green-400 text-xs">99.99%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Communication system reliability</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-blue-400 font-semibold text-sm">Response Time</span>
                            <span className="text-blue-400 text-xs">0.8s avg</span>
                          </div>
                          <div className="text-slate-300 text-xs">Message delivery speed</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-purple-400 font-semibold text-sm">Throughput</span>
                            <span className="text-purple-400 text-xs">+18.7%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Message processing capacity</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-orange-400 font-semibold text-sm">Security Score</span>
                            <span className="text-orange-400 text-xs">100/100</span>
                          </div>
                          <div className="text-slate-300 text-xs">Communication security rating</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">+15.3%</div>
                          <div className="text-xs text-slate-400">Overall Performance Improvement</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'predictive-forecasting' && (
            <motion.div
              key="predictive-forecasting"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Advanced Predictive Intelligence Forecasting */}
              <div className="space-y-6">
                {/* Enhanced Forecasting Metrics Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <IntelligenceGlassCard title="AI Prediction Accuracy" icon={Brain} status="HIGH">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">97.3%</div>
                      <div className="text-sm text-slate-400">Correlation Success</div>
                      <div className="text-xs text-green-400 mt-2">+4.2% this month</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">98.1%</div>
                          <div className="text-xs text-slate-400">Precision</div>
                        </div>
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">96.5%</div>
                          <div className="text-xs text-slate-400">Recall</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Patterns Analyzed" icon={Target} status="PROCESSING">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-indigo-400 mb-2">1,247</div>
                      <div className="text-sm text-slate-400">Threat Patterns</div>
                      <div className="text-xs text-blue-400 mt-2">+89 new patterns</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-indigo-500/10 border border-indigo-500/30 rounded">
                          <div className="text-indigo-400 text-sm font-bold">742</div>
                          <div className="text-xs text-slate-400">Active</div>
                        </div>
                        <div className="text-center p-2 bg-indigo-500/10 border border-indigo-500/30 rounded">
                          <div className="text-indigo-400 text-sm font-bold">505</div>
                          <div className="text-xs text-slate-400">Archived</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Predictive Success Rate" icon={TrendingUp} status="EXCELLENT">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">89%</div>
                      <div className="text-sm text-slate-400">Prevention Rate</div>
                      <div className="text-xs text-green-400 mt-2">Above target</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">92%</div>
                          <div className="text-xs text-slate-400">Accuracy</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">1.4s</div>
                          <div className="text-xs text-slate-400">Response</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Forecast Horizon" icon={Clock} status="EXTENDED">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">72h</div>
                      <div className="text-sm text-slate-400">Prediction Window</div>
                      <div className="text-xs text-blue-400 mt-2">Extended coverage</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">24h</div>
                          <div className="text-xs text-slate-400">High Conf</div>
                        </div>
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">48h</div>
                          <div className="text-xs text-slate-400">Med Conf</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Advanced Intelligence Correlation Engine */}
                <IntelligenceGlassCard title="Advanced Intelligence Correlation Engine" icon={Brain} status="PROCESSING">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <Brain className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-purple-400 mb-1">97.3%</div>
                      <div className="text-sm text-slate-400">Correlation Accuracy</div>
                    </div>
                    <div className="text-center p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                      <Target className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-indigo-400 mb-1">1,247</div>
                      <div className="text-sm text-slate-400">Patterns Analyzed</div>
                    </div>
                    <div className="text-center p-6 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                      <TrendingUp className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-violet-400 mb-1">89%</div>
                      <div className="text-sm text-slate-400">Predictive Success</div>
                    </div>
                  </div>

                  {/* Enhanced Predictive Intelligence Forecasting */}
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={[
                        { time: 'Now', threats: 23, predictions: 45, correlations: 67, prevention: 89 },
                        { time: '+1H', threats: 28, predictions: 52, correlations: 71, prevention: 92 },
                        { time: '+2H', threats: 31, predictions: 48, correlations: 69, prevention: 87 },
                        { time: '+4H', threats: 35, predictions: 61, correlations: 78, prevention: 94 },
                        { time: '+6H', threats: 42, predictions: 55, correlations: 82, prevention: 89 },
                        { time: '+12H', threats: 38, predictions: 67, correlations: 85, prevention: 96 },
                        { time: '+24H', threats: 45, predictions: 73, correlations: 89, prevention: 91 }
                      ]}>
                        <defs>
                          <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="predictionsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="correlationsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="preventionGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                        <YAxis stroke="#9ca3af" fontSize={12} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#f9fafb'
                          }}
                        />
                        <RechartsLegend />
                        <Area
                          type="monotone"
                          dataKey="threats"
                          stackId="1"
                          stroke="#ef4444"
                          fill="url(#threatsGradient)"
                          name="Detected Threats"
                        />
                        <Area
                          type="monotone"
                          dataKey="predictions"
                          stackId="2"
                          stroke="#a855f7"
                          fill="url(#predictionsGradient)"
                          name="AI Predictions"
                        />
                        <Area
                          type="monotone"
                          dataKey="correlations"
                          stackId="3"
                          stroke="#06b6d4"
                          fill="url(#correlationsGradient)"
                          name="Intelligence Correlations"
                        />
                        <Area
                          type="monotone"
                          dataKey="prevention"
                          stackId="4"
                          stroke="#10b981"
                          fill="url(#preventionGradient)"
                          name="Prevention Success %"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </IntelligenceGlassCard>

                {/* Intelligence Pattern Recognition & Forecasting */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntelligenceGlassCard title="Intelligence Pattern Recognition & Forecasting" icon={Eye} status="ANALYZING">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">Emerging Threat Patterns</h4>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                          <span className="text-xs text-green-400">AI ACTIVE</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-red-400 font-semibold text-sm">CRITICAL: APT-45 Evolution</span>
                            <span className="text-orange-400 text-xs">Probability: 87%</span>
                          </div>
                          <div className="text-slate-300 text-sm">Advanced persistent threat showing sophisticated infrastructure targeting patterns. Expected escalation in 4-6 hours.</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-2 h-2 rounded-full bg-red-400"></div>
                            <span className="text-xs text-slate-400">Time to Impact: 4.2 hours</span>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-400 font-semibold text-sm">HIGH: Supply Chain Attack</span>
                            <span className="text-yellow-400 text-xs">Probability: 72%</span>
                          </div>
                          <div className="text-slate-300 text-sm">Correlated indicators suggest potential compromise of critical software distribution channels.</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-2 h-2 rounded-full bg-orange-400"></div>
                            <span className="text-xs text-slate-400">Time to Impact: 12.8 hours</span>
                          </div>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          className="p-4 bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-yellow-400 font-semibold text-sm">MEDIUM: DDoS Campaign</span>
                            <span className="text-green-400 text-xs">Probability: 58%</span>
                          </div>
                          <div className="text-slate-300 text-sm">Botnet activity suggests coordinated attack preparation against financial institutions.</div>
                          <div className="flex items-center space-x-2 mt-2">
                            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                            <span className="text-xs text-slate-400">Time to Impact: 28.5 hours</span>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Predictive Analytics Dashboard" icon={Gauge} status="MONITORING">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">AI Forecasting Performance</h4>
                        <select className="px-2 py-1 bg-slate-700/50 border border-slate-600/50 rounded text-white text-xs">
                          <option>Real-time</option>
                          <option>Hourly</option>
                          <option>Daily</option>
                        </select>
                      </div>

                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={[
                            { subject: 'Threat Prediction', A: 89, fullMark: 100 },
                            { subject: 'Pattern Recognition', A: 94, fullMark: 100 },
                            { subject: 'Correlation Analysis', A: 87, fullMark: 100 },
                            { subject: 'Impact Assessment', A: 92, fullMark: 100 },
                            { subject: 'Response Planning', A: 85, fullMark: 100 },
                            { subject: 'Risk Mitigation', A: 91, fullMark: 100 },
                            { subject: 'Prevention Success', A: 96, fullMark: 100 },
                            { subject: 'False Positive Rate', A: 97, fullMark: 100 }
                          ]}>
                            <PolarGrid stroke="#374151" />
                            <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 8 }} />
                            <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 6 }} />
                            <Radar
                              name="Performance Score"
                              dataKey="A"
                              stroke="#a855f7"
                              fill="#a855f7"
                              fillOpacity={0.2}
                              strokeWidth={2}
                            />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f9fafb'
                              }}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-3 bg-green-500/10 border border-green-500/30 rounded">
                            <div className="text-green-400 font-bold text-lg">96.4%</div>
                            <div className="text-xs text-slate-400">Prevention Rate</div>
                          </div>
                          <div className="text-center p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                            <div className="text-blue-400 font-bold text-lg">1.3s</div>
                            <div className="text-xs text-slate-400">Avg Response</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-cyan-400 font-medium text-sm">Recent Forecasting Achievements</h5>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                              <div className="w-2 h-2 rounded-full bg-green-400"></div>
                              <span className="text-green-400 text-xs">Successfully predicted APT campaign 4 hours early</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                              <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                              <span className="text-blue-400 text-xs">97% accuracy in supply chain attack prevention</span>
                            </div>
                            <div className="flex items-center space-x-2 p-2 bg-slate-800/50 rounded">
                              <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                              <span className="text-purple-400 text-xs">Zero false positives in critical threat detection</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Forecasting Accuracy & Performance Metrics */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <IntelligenceGlassCard title="Forecasting Accuracy Metrics" icon={CheckCircle} status="EXCELLENT">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Prediction Accuracy by Time Horizon</div>

                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">Immediate (0-1h)</span>
                            <span className="text-green-400 font-bold">98.7%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '98.7%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-400">Short-term (1-6h)</span>
                            <span className="text-blue-400 font-bold">94.3%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94.3%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-yellow-400">Medium-term (6-24h)</span>
                            <span className="text-yellow-400 font-bold">87.6%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '87.6%' }}></div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-orange-400">Long-term (24-72h)</span>
                            <span className="text-orange-400 font-bold">76.4%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '76.4%' }}></div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">89.2%</div>
                          <div className="text-xs text-slate-400">Overall Forecasting Accuracy</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="AI Model Performance" icon={Sparkles} status="OPTIMIZING">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Machine Learning Model Metrics</div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <div>
                            <div className="text-cyan-400 font-semibold text-sm">Model Confidence</div>
                            <div className="text-slate-400 text-xs">Prediction reliability</div>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold text-lg">96.8%</div>
                            <div className="text-green-400 text-xs">+2.1%</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <div>
                            <div className="text-purple-400 font-semibold text-sm">Learning Rate</div>
                            <div className="text-slate-400 text-xs">Adaptation speed</div>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-400 font-bold text-lg">0.94</div>
                            <div className="text-green-400 text-xs">Optimal</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <div>
                            <div className="text-green-400 font-semibold text-sm">Training Data</div>
                            <div className="text-slate-400 text-xs">Historical patterns</div>
                          </div>
                          <div className="text-right">
                            <div className="text-green-400 font-bold text-lg">2.4M</div>
                            <div className="text-blue-400 text-xs">+15K daily</div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                          <div>
                            <div className="text-orange-400 font-semibold text-sm">Model Updates</div>
                            <div className="text-slate-400 text-xs">Retraining frequency</div>
                          </div>
                          <div className="text-right">
                            <div className="text-orange-400 font-bold text-lg">6/hr</div>
                            <div className="text-green-400 text-xs">Continuous</div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded">
                        <div className="text-center">
                          <div className="text-purple-400 font-bold text-lg mb-1">Quantum AI Engine</div>
                          <div className="text-xs text-slate-400">Next-generation predictive analytics</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Predictive Intelligence Trends" icon={TrendingUp} status="ANALYZING">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">Intelligence Trends Analysis</h4>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-blue-400">REAL-TIME</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-red-400 font-semibold text-sm">🔥 APT Campaigns</span>
                            <span className="text-orange-400 text-xs">↑ 23%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Advanced persistent threats showing increased sophistication</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-orange-400 font-semibold text-sm">🔗 Supply Chain</span>
                            <span className="text-yellow-400 text-xs">↑ 18%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Software supply chain attacks becoming more prevalent</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-yellow-400 font-semibold text-sm">🌐 IoT Threats</span>
                            <span className="text-green-400 text-xs">↑ 31%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Internet of Things devices emerging as attack vectors</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-green-400 font-semibold text-sm">🤖 AI-Driven</span>
                            <span className="text-blue-400 text-xs">↑ 45%</span>
                          </div>
                          <div className="text-slate-300 text-xs">AI-powered attacks and automated exploitation</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">+28.4%</div>
                          <div className="text-xs text-slate-400">Overall Threat Trend Growth</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>
              </div>

              {/* Intelligence Pattern Recognition */}
              <IntelligenceGlassCard title="Intelligence Pattern Recognition & Forecasting" icon={Eye} status="ANALYZING">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center">
                      <Sparkles className="w-5 h-5 text-purple-400 mr-2" />
                      Emerging Threat Patterns
                    </h4>
                    <div className="space-y-3">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-red-400 font-semibold text-sm">CRITICAL: APT-45 Evolution</span>
                          <span className="text-orange-400 text-xs">Probability: 87%</span>
                        </div>
                        <div className="text-slate-300 text-sm">Advanced persistent threat showing sophisticated infrastructure targeting patterns. Expected escalation in 4-6 hours.</div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-orange-400 font-semibold text-sm">HIGH: Supply Chain Attack</span>
                          <span className="text-yellow-400 text-xs">Probability: 72%</span>
                        </div>
                        <div className="text-slate-300 text-sm">Correlated indicators suggest potential compromise of critical software distribution channels.</div>
                      </motion.div>

                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="p-4 bg-gradient-to-r from-yellow-500/10 to-green-500/10 border border-yellow-500/30 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-yellow-400 font-semibold text-sm">MEDIUM: DDoS Campaign</span>
                          <span className="text-green-400 text-xs">Probability: 58%</span>
                        </div>
                        <div className="text-slate-300 text-sm">Botnet activity suggests coordinated attack preparation against financial institutions.</div>
                      </motion.div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center">
                      <Gauge className="w-5 h-5 text-indigo-400 mr-2" />
                      Predictive Analytics Dashboard
                    </h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={[
                          { subject: 'Threat Prediction', A: 89, fullMark: 100 },
                          { subject: 'Pattern Recognition', A: 94, fullMark: 100 },
                          { subject: 'Correlation Analysis', A: 87, fullMark: 100 },
                          { subject: 'Impact Assessment', A: 92, fullMark: 100 },
                          { subject: 'Response Planning', A: 85, fullMark: 100 },
                          { subject: 'Risk Mitigation', A: 91, fullMark: 100 }
                        ]}>
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 10 }} />
                          <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 8 }} />
                          <Radar
                            name="Performance Score"
                            dataKey="A"
                            stroke="#a855f7"
                            fill="#a855f7"
                            fillOpacity={0.2}
                            strokeWidth={2}
                          />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#1f2937',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#f9fafb'
                            }}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </IntelligenceGlassCard>
            </motion.div>
          )}

          {activeSection === 'intelligence-network' && (
            <motion.div
              key="intelligence-network"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Advanced Intelligence Network Architecture */}
              <div className="space-y-6">
                {/* Enhanced Network Topology Dashboard */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
                  <IntelligenceGlassCard title="Network Health Score" icon={Activity} status="EXCELLENT">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">98.7%</div>
                      <div className="text-sm text-slate-400">Overall Network Status</div>
                      <div className="text-xs text-green-400 mt-2">All Systems Operational</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">6/6</div>
                          <div className="text-xs text-slate-400">Active</div>
                        </div>
                        <div className="text-center p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 text-sm font-bold">99.9%</div>
                          <div className="text-xs text-slate-400">Uptime</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Data Throughput" icon={Zap} status="HIGH">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-cyan-400 mb-2">2.4GB/s</div>
                      <div className="text-sm text-slate-400">Network Bandwidth</div>
                      <div className="text-xs text-blue-400 mt-2">+15.7% from baseline</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">1,247</div>
                          <div className="text-xs text-slate-400">Packets/s</div>
                        </div>
                        <div className="text-center p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 text-sm font-bold">0.8ms</div>
                          <div className="text-xs text-slate-400">Latency</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Security Protocols" icon={Shield} status="ENCRYPTED">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-400 mb-2">256-bit</div>
                      <div className="text-sm text-slate-400">AES Encryption</div>
                      <div className="text-xs text-purple-400 mt-2">Military Grade Security</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">100%</div>
                          <div className="text-xs text-slate-400">Encrypted</div>
                        </div>
                        <div className="text-center p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 text-sm font-bold">Zero</div>
                          <div className="text-xs text-slate-400">Breaches</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Intelligence Routing" icon={Navigation} status="OPTIMIZED">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-400 mb-2">18</div>
                      <div className="text-sm text-slate-400">Active Routes</div>
                      <div className="text-xs text-orange-400 mt-2">Dynamic Optimization</div>
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <div className="text-center p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                          <div className="text-orange-400 text-sm font-bold">3</div>
                          <div className="text-xs text-slate-400">Priority</div>
                        </div>
                        <div className="text-center p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                          <div className="text-orange-400 text-sm font-bold">15</div>
                          <div className="text-xs text-slate-400">Standard</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Real-time Intelligence Network Visualization */}
                <IntelligenceGlassCard title="Real-time Intelligence Network Visualization" icon={Network} status="ACTIVE">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Enhanced Network Topology */}
                    <div className="lg:col-span-2">
                      <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 p-6 relative overflow-hidden">
                        <div className="absolute inset-0 opacity-20">
                          <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/40 rounded-full blur-xl"></div>
                          <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500/40 rounded-full blur-xl"></div>
                          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-violet-500/40 rounded-full blur-xl"></div>
                          <div className="absolute top-20 right-20 w-28 h-28 bg-cyan-500/40 rounded-full blur-xl"></div>
                        </div>

                        {/* Network Nodes */}
                        <div className="relative h-full flex items-center justify-center">
                          {/* Central Intelligence Hub */}
                          <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50"
                          >
                            <Crown className="w-8 h-8 text-white" />
                          </motion.div>

                          {/* Connected Agencies with Enhanced Status */}
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-0"
                          >
                            {[
                              { name: 'NSA', angle: 0, color: 'purple', status: 'active', load: 95, security: 99 },
                              { name: 'CIA', angle: 60, color: 'blue', status: 'active', load: 87, security: 98 },
                              { name: 'FBI', angle: 120, color: 'green', status: 'active', load: 92, security: 97 },
                              { name: 'DHS', angle: 180, color: 'red', status: 'active', load: 78, security: 96 },
                              { name: 'DoD', angle: 240, color: 'yellow', status: 'active', load: 85, security: 95 },
                              { name: 'Treasury', angle: 300, color: 'emerald', status: 'active', load: 72, security: 94 }
                            ].map((agency, index) => {
                              const radius = 120;
                              const radian = (agency.angle * Math.PI) / 180;
                              const x = Math.cos(radian) * radius;
                              const y = Math.sin(radian) * radius;

                              return (
                                <motion.div
                                  key={agency.name}
                                  animate={{ scale: [1, 1.2, 1] }}
                                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                                  className="absolute"
                                  style={{
                                    left: `calc(50% + ${x}px - 20px)`,
                                    top: `calc(50% + ${y}px - 20px)`,
                                  }}
                                >
                                  <div className={`w-10 h-10 bg-${agency.color}-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20 relative`}>
                                    <span className="text-white font-bold text-xs">{agency.name.substring(0, 2)}</span>
                                    {/* Status Indicator */}
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-slate-900 animate-pulse"></div>
                                  </div>

                                  {/* Connection Lines with Data Flow */}
                                  <svg
                                    className="absolute inset-0 w-10 h-10 pointer-events-none"
                                    style={{ transform: `rotate(${-agency.angle}deg)` }}
                                  >
                                    <defs>
                                      <marker id={`arrowhead-${agency.name}`} markerWidth="6" markerHeight="4"
                                        refX="5" refY="2" orient="auto">
                                        <polygon points="0 0, 6 2, 0 4" fill={`var(--tw-ring-color-${agency.color}-400)`} />
                                      </marker>
                                      <path id={`path-${agency.name}`} d="M 20 20 L 120 20" />
                                    </defs>
                                    <line
                                      x1="20"
                                      y1="20"
                                      x2="120"
                                      y2="20"
                                      stroke={`var(--tw-ring-color-${agency.color}-400)`}
                                      strokeWidth="2"
                                      opacity="0.7"
                                      className="animate-pulse"
                                      markerEnd={`url(#arrowhead-${agency.name})`}
                                    />
                                    {/* Data packets animation - simplified */}
                                    <circle
                                      r="2"
                                      fill={`var(--tw-ring-color-${agency.color}-400)`}
                                      opacity="0.8"
                                      className="animate-pulse"
                                    />
                                  </svg>
                                </motion.div>
                              );
                            })}
                          </motion.div>

                          {/* Enhanced Data Flow Animations */}
                          <motion.div
                            animate={{
                              x: [0, 120, 0],
                              y: [0, 0, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                            style={{ left: 'calc(50% - 6px)', top: 'calc(50% - 6px)' }}
                          />

                          {/* Secondary Data Flows */}
                          <motion.div
                            animate={{
                              x: [120, 0, 120],
                              y: [0, 0, 0],
                              opacity: [0, 1, 0]
                            }}
                            transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                            className="absolute w-2 h-2 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"
                            style={{ left: 'calc(50% - 4px)', top: 'calc(50% - 4px)' }}
                          />
                        </div>

                        {/* Enhanced Network Stats Overlay */}
                        <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
                          <div className="text-white text-sm font-semibold mb-2">Network Intelligence Hub</div>
                          <div className="space-y-1 text-xs">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                              <span className="text-slate-300">6 Agencies Connected</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Activity className="w-3 h-3 text-cyan-400" />
                              <span className="text-slate-300">Data Flow: 2.4 GB/s</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Shield className="w-3 h-3 text-purple-400" />
                              <span className="text-slate-300">Encryption: AES-256</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Zap className="w-3 h-3 text-yellow-400" />
                              <span className="text-slate-300">Latency: 0.8ms</span>
                            </div>
                          </div>
                        </div>

                        {/* Network Load Indicators */}
                        <div className="absolute bottom-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
                          <div className="text-white text-sm font-semibold mb-2">Connection Load</div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="text-center">
                              <div className="text-green-400 font-bold">NSA: 95%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-blue-400 font-bold">CIA: 87%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-green-400 font-bold">FBI: 92%</div>
                            </div>
                            <div className="text-center">
                              <div className="text-red-400 font-bold">DHS: 78%</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Advanced Network Analytics */}
                    <div className="space-y-6">
                      <IntelligenceGlassCard title="Network Intelligence Flow" status="REAL-TIME">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <div>
                              <div className="text-cyan-400 font-semibold text-sm">Data Packets/sec</div>
                              <div className="text-slate-400 text-xs">Intelligence Exchange Rate</div>
                            </div>
                            <div className="text-right">
                              <div className="text-cyan-400 text-xl font-bold">1,247</div>
                              <div className="text-green-400 text-xs">+8.3%</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <div>
                              <div className="text-purple-400 font-semibold text-sm">Active Connections</div>
                              <div className="text-slate-400 text-xs">Agency Links</div>
                            </div>
                            <div className="text-right">
                              <div className="text-purple-400 text-xl font-bold">18</div>
                              <div className="text-green-400 text-xs">All Secure</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <div>
                              <div className="text-indigo-400 font-semibold text-sm">Response Time</div>
                              <div className="text-slate-400 text-xs">Average Latency</div>
                            </div>
                            <div className="text-right">
                              <div className="text-indigo-400 text-xl font-bold">23ms</div>
                              <div className="text-green-400 text-xs">Optimal</div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <div>
                              <div className="text-green-400 font-semibold text-sm">Network Uptime</div>
                              <div className="text-slate-400 text-xs">Reliability Score</div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 text-xl font-bold">99.9%</div>
                              <div className="text-green-400 text-xs">Excellent</div>
                            </div>
                          </div>
                        </div>
                      </IntelligenceGlassCard>

                      {/* Intelligence Routing Matrix */}
                      <IntelligenceGlassCard title="Intelligence Routing Matrix" status="OPTIMIZED">
                        <div className="space-y-3">
                          <div className="text-sm text-slate-300 mb-3">Priority Routing Paths</div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between p-2 bg-red-500/10 border border-red-500/30 rounded">
                              <span className="text-red-400 text-sm font-semibold">CRITICAL</span>
                              <span className="text-slate-300 text-xs">Direct → All Agencies</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-orange-500/10 border border-orange-500/30 rounded">
                              <span className="text-orange-400 text-sm font-semibold">HIGH</span>
                              <span className="text-slate-300 text-xs">NSA → CIA → FBI</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                              <span className="text-yellow-400 text-sm font-semibold">MEDIUM</span>
                              <span className="text-slate-300 text-xs">DHS → Treasury</span>
                            </div>
                            <div className="flex items-center justify-between p-2 bg-blue-500/10 border border-blue-500/30 rounded">
                              <span className="text-blue-400 text-sm font-semibold">LOW</span>
                              <span className="text-slate-300 text-xs">Standard Routing</span>
                            </div>
                          </div>
                        </div>
                      </IntelligenceGlassCard>
                    </div>
                  </div>
                </IntelligenceGlassCard>

                {/* Network Security & Performance Dashboard */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <IntelligenceGlassCard title="Network Security Status" icon={Shield} status="SECURE">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Security Protocol Status</div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Lock className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 font-semibold text-sm">AES-256 Encryption</span>
                          </div>
                          <span className="text-green-400 text-xs">Active</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Shield className="w-4 h-4 text-blue-400" />
                            <span className="text-blue-400 font-semibold text-sm">Zero Trust</span>
                          </div>
                          <span className="text-blue-400 text-xs">Verified</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Network className="w-4 h-4 text-purple-400" />
                            <span className="text-purple-400 font-semibold text-sm">VPN Tunnels</span>
                          </div>
                          <span className="text-purple-400 text-xs">18 Active</span>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="flex items-center space-x-2">
                            <Eye className="w-4 h-4 text-cyan-400" />
                            <span className="text-cyan-400 font-semibold text-sm">Intrusion Detection</span>
                          </div>
                          <span className="text-cyan-400 text-xs">Monitoring</span>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">100%</div>
                          <div className="text-xs text-slate-400">Security Compliance Rate</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Agency Connectivity Matrix" icon={Radio} status="MONITORING">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Inter-Agency Connection Status</div>

                      <div className="space-y-2">
                        <div className="grid grid-cols-6 gap-1 text-xs">
                          <div></div>
                          <div className="text-center text-slate-400">NSA</div>
                          <div className="text-center text-slate-400">CIA</div>
                          <div className="text-center text-slate-400">FBI</div>
                          <div className="text-center text-slate-400">DHS</div>
                          <div className="text-center text-slate-400">DoD</div>

                          <div className="text-slate-400 text-right pr-2">NSA</div>
                          <div className="text-center">-</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>

                          <div className="text-slate-400 text-right pr-2">CIA</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center">-</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>

                          <div className="text-slate-400 text-right pr-2">FBI</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center">-</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>

                          <div className="text-slate-400 text-right pr-2">DHS</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center">-</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>

                          <div className="text-slate-400 text-right pr-2">DoD</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center bg-green-500/20 text-green-400 rounded p-1">✓</div>
                          <div className="text-center">-</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-400 mb-1">30</div>
                          <div className="text-xs text-slate-400">Total Active Connections</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Network Performance Trends" icon={TrendingUp} status="ANALYZING">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-white font-semibold text-sm">Performance Metrics</h4>
                        <div className="flex items-center space-x-2">
                          <Activity className="w-4 h-4 text-blue-400" />
                          <span className="text-xs text-blue-400">LIVE</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-green-400 font-semibold text-sm">Throughput</span>
                            <span className="text-blue-400 text-xs">↑ 15.7%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Network bandwidth utilization at optimal levels</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-blue-400 font-semibold text-sm">Latency</span>
                            <span className="text-purple-400 text-xs">↓ 0.2ms</span>
                          </div>
                          <div className="text-slate-300 text-xs">Response times improved across all connections</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-purple-400 font-semibold text-sm">Reliability</span>
                            <span className="text-cyan-400 text-xs">99.9%</span>
                          </div>
                          <div className="text-slate-300 text-xs">Network uptime maintained at enterprise levels</div>
                        </div>

                        <div className="p-3 bg-gradient-to-r from-cyan-500/10 to-indigo-500/10 border border-cyan-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-cyan-400 font-semibold text-sm">Security</span>
                            <span className="text-indigo-400 text-xs">Zero Incidents</span>
                          </div>
                          <div className="text-slate-300 text-xs">No security breaches or unauthorized access</div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">+12.3%</div>
                          <div className="text-xs text-slate-400">Overall Performance Improvement</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>

                {/* Data Flow Analytics & Intelligence Routing */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <IntelligenceGlassCard title="Data Flow Analytics" icon={BarChart3} status="MONITORING">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Intelligence Data Flow Patterns</div>

                      <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={[
                            { time: '00:00', incoming: 45, outgoing: 38, processed: 42 },
                            { time: '04:00', incoming: 52, outgoing: 41, processed: 49 },
                            { time: '08:00', incoming: 67, outgoing: 58, processed: 63 },
                            { time: '12:00', incoming: 78, outgoing: 72, processed: 75 },
                            { time: '16:00', incoming: 89, outgoing: 81, processed: 85 },
                            { time: '20:00', incoming: 56, outgoing: 49, processed: 52 }
                          ]}>
                            <defs>
                              <linearGradient id="incomingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                              </linearGradient>
                              <linearGradient id="outgoingGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#a855f7" stopOpacity={0.1}/>
                              </linearGradient>
                              <linearGradient id="processedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                            <XAxis dataKey="time" stroke="#9ca3af" fontSize={10} />
                            <YAxis stroke="#9ca3af" fontSize={10} />
                            <RechartsTooltip
                              contentStyle={{
                                backgroundColor: '#1f2937',
                                border: '1px solid #374151',
                                borderRadius: '8px',
                                color: '#f9fafb'
                              }}
                            />
                            <RechartsLegend />
                            <Area
                              type="monotone"
                              dataKey="incoming"
                              stackId="1"
                              stroke="#06b6d4"
                              fill="url(#incomingGradient)"
                              name="Incoming Data"
                            />
                            <Area
                              type="monotone"
                              dataKey="outgoing"
                              stackId="2"
                              stroke="#a855f7"
                              fill="url(#outgoingGradient)"
                              name="Outgoing Data"
                            />
                            <Area
                              type="monotone"
                              dataKey="processed"
                              stackId="3"
                              stroke="#10b981"
                              fill="url(#processedGradient)"
                              name="Processed Intelligence"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded">
                          <div className="text-cyan-400 font-bold text-sm">67 GB</div>
                          <div className="text-xs text-slate-400">Incoming</div>
                        </div>
                        <div className="p-2 bg-purple-500/10 border border-purple-500/30 rounded">
                          <div className="text-purple-400 font-bold text-sm">59 GB</div>
                          <div className="text-xs text-slate-400">Outgoing</div>
                        </div>
                        <div className="p-2 bg-green-500/10 border border-green-500/30 rounded">
                          <div className="text-green-400 font-bold text-sm">63 GB</div>
                          <div className="text-xs text-slate-400">Processed</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>

                  <IntelligenceGlassCard title="Advanced Intelligence Routing" icon={Navigation} status="OPTIMIZED">
                    <div className="space-y-4">
                      <div className="text-sm text-slate-300 mb-3">Dynamic Routing Optimization</div>

                      <div className="space-y-3">
                        <div className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-red-400 font-semibold text-sm">Critical Intelligence</span>
                            <span className="text-orange-400 text-xs">Priority: MAX</span>
                          </div>
                          <div className="text-slate-300 text-xs mb-2">Route: Central Hub → All Agencies (Direct)</div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-green-400 text-xs">Optimal Path Selected</span>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 border border-orange-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-orange-400 font-semibold text-sm">High Priority</span>
                            <span className="text-yellow-400 text-xs">Priority: HIGH</span>
                          </div>
                          <div className="text-slate-300 text-xs mb-2">Route: NSA → CIA → FBI (Optimized)</div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-green-400"></div>
                            <span className="text-green-400 text-xs">Load Balanced</span>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-yellow-500/10 to-blue-500/10 border border-yellow-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-yellow-400 font-semibold text-sm">Standard Traffic</span>
                            <span className="text-blue-400 text-xs">Priority: MEDIUM</span>
                          </div>
                          <div className="text-slate-300 text-xs mb-2">Route: DHS → Treasury (Standard)</div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                            <span className="text-blue-400 text-xs">Cost Optimized</span>
                          </div>
                        </div>

                        <div className="p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/30 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-blue-400 font-semibold text-sm">Bulk Data</span>
                            <span className="text-indigo-400 text-xs">Priority: LOW</span>
                          </div>
                          <div className="text-slate-300 text-xs mb-2">Route: Multi-path Distribution</div>
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 rounded-full bg-indigo-400"></div>
                            <span className="text-indigo-400 text-xs">Bandwidth Optimized</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 p-3 bg-slate-800/50 rounded">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-white mb-1">18</div>
                          <div className="text-xs text-slate-400">Active Routing Paths</div>
                          <div className="text-green-400 text-xs mt-1">All Optimized</div>
                        </div>
                      </div>
                    </div>
                  </IntelligenceGlassCard>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CrossAgencyIntelligenceFusion;
