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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-indigo-800 to-slate-950 p-6 relative overflow-hidden">
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
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <Network className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
            </div>

            <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 via-violet-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
              Cross-Agency Intelligence Fusion
            </h1>
            <p className="text-purple-200/80 text-sm font-medium">Advanced Multi-Agency Collaboration & Secure Intelligence Sharing Platform</p>

              <div className="flex items-center space-x-4 mt-2">
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

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
                  <span className="text-xs text-slate-300">SECURE</span>
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
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Intelligence'}</span>
            </button>
          </div>
        </motion.div>

        {/* Intelligence Fusion Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
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
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
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
              {/* Intelligence Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <IntelligenceGlassCard title="Total Intelligence Shared" icon={Database} status="ACTIVE">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">1,597</div>
                    <div className="text-sm text-slate-400">Intelligence Reports</div>
                    <div className="text-xs text-green-400 mt-2">+12% from last week</div>
                  </div>
                </IntelligenceGlassCard>

                <IntelligenceGlassCard title="Active Agencies" icon={Building} status="CONNECTED">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">8</div>
                    <div className="text-sm text-slate-400">Government Agencies</div>
                    <div className="text-xs text-green-400 mt-2">All systems online</div>
                  </div>
                </IntelligenceGlassCard>

                <IntelligenceGlassCard title="Data Exchanges" icon={Share2} status="SECURE">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">1,049</div>
                    <div className="text-sm text-slate-400">Secure Transfers</div>
                    <div className="text-xs text-blue-400 mt-2">99.9% success rate</div>
                  </div>
                </IntelligenceGlassCard>

                <IntelligenceGlassCard title="Threat Correlations" icon={Target} status="ANALYZING">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">23</div>
                    <div className="text-sm text-slate-400">Cross-Agency Links</div>
                    <div className="text-xs text-orange-400 mt-2">5 new correlations</div>
                  </div>
                </IntelligenceGlassCard>
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
              {/* Real-time Collaboration Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Agency Status Dashboard */}
                <div className="lg:col-span-2 space-y-6">
                  <IntelligenceGlassCard title="Real-time Agency Collaboration Hub" icon={Users} status="LIVE">
                    <div className="space-y-4">
                      {governmentAgencies.slice(0, 6).map((agency) => (
                        <div key={agency.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className={`w-4 h-4 rounded-full ${
                              agency.status === 'CONNECTED' ? 'bg-green-400 animate-pulse' : 'bg-red-400'
                            }`}></div>
                            <div>
                              <div className="text-white font-semibold">{agency.acronym}</div>
                              <div className="text-slate-400 text-sm">{agency.intelligenceShared} reports shared</div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                              <Video className="w-4 h-4 text-white" />
                            </button>
                            <button className="p-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                              <MessageSquare className="w-4 h-4 text-white" />
                            </button>
                            <button className="p-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors">
                              <Share2 className="w-4 h-4 text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </IntelligenceGlassCard>

                  {/* Intelligence Correlation Analytics */}
                  <IntelligenceGlassCard title="Intelligence Correlation Analytics" icon={Target} status="ANALYZING">
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart data={[
                          { subject: 'NSA', A: 95, fullMark: 100 },
                          { subject: 'CIA', A: 87, fullMark: 100 },
                          { subject: 'FBI', A: 92, fullMark: 100 },
                          { subject: 'DHS', A: 89, fullMark: 100 },
                          { subject: 'DoD', A: 94, fullMark: 100 },
                          { subject: 'Treasury', A: 76, fullMark: 100 }
                        ]}>
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                          <PolarRadiusAxis domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                          <Radar
                            name="Correlation Score"
                            dataKey="A"
                            stroke="#a855f7"
                            fill="#a855f7"
                            fillOpacity={0.3}
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
                  </IntelligenceGlassCard>
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

                {/* Threat Correlation Matrix */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[
                      { agency: 'NSA', threats: 45, correlations: 12, shared: 8 },
                      { agency: 'CIA', threats: 32, correlations: 9, shared: 6 },
                      { agency: 'FBI', threats: 67, correlations: 18, shared: 15 },
                      { agency: 'DHS', threats: 54, correlations: 14, shared: 11 },
                      { agency: 'DoD', threats: 41, correlations: 11, shared: 9 }
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
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </IntelligenceGlassCard>
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
              {/* Data Exchange Analytics */}
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

                {/* Data Exchange Volume Trends */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '00:00', volume: 45 },
                      { time: '04:00', volume: 32 },
                      { time: '08:00', volume: 78 },
                      { time: '12:00', volume: 95 },
                      { time: '16:00', volume: 87 },
                      { time: '20:00', volume: 56 }
                    ]}>
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
                      <RechartsLine
                        type="monotone"
                        dataKey="volume"
                        stroke="#a855f7"
                        strokeWidth={3}
                        dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                        name="Data Exchange Volume"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </IntelligenceGlassCard>
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
              {/* Secure Communication Networks */}
              <IntelligenceGlassCard title="Secure Communication Networks" icon={Radio} status="ENCRYPTED">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <Video className="w-5 h-5 text-blue-400 mr-2" />
                      Video Conferences
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                        <div>
                          <div className="text-white text-sm">National Security Council</div>
                          <div className="text-slate-400 text-xs">12 participants</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="p-2 bg-green-600 hover:bg-green-700 rounded text-white">
                            <Phone className="w-3 h-3" />
                          </button>
                          <button className="p-2 bg-red-600 hover:bg-red-700 rounded text-white">
                            <XCircle className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded">
                        <div>
                          <div className="text-white text-sm">Threat Assessment Team</div>
                          <div className="text-slate-400 text-xs">8 participants</div>
                        </div>
                        <span className="text-green-400 text-xs">ACTIVE</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <MessageSquare className="w-5 h-5 text-green-400 mr-2" />
                      Encrypted Messaging
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 rounded">
                        <div className="text-white text-sm mb-2">Priority Intelligence Alert</div>
                        <div className="text-slate-400 text-xs mb-2">From: NSA • To: All Agencies</div>
                        <div className="text-slate-300 text-sm">Critical infrastructure threat detected in transportation sector. Immediate coordination required.</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded">
                        <div className="text-white text-sm mb-2">Joint Operation Update</div>
                        <div className="text-slate-400 text-xs mb-2">From: FBI • To: DHS, DoD</div>
                        <div className="text-slate-300 text-sm">Operation successful. 15 suspects apprehended. Full debrief in progress.</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <Shield className="w-5 h-5 text-purple-400 mr-2" />
                      Security Status
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div>
                          <div className="text-green-400 font-semibold text-sm">Encryption Active</div>
                          <div className="text-slate-400 text-xs">AES-256 Military Grade</div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div>
                          <div className="text-green-400 font-semibold text-sm">Zero Trust Verified</div>
                          <div className="text-slate-400 text-xs">All connections authenticated</div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div>
                          <div className="text-green-400 font-semibold text-sm">Network Isolation</div>
                          <div className="text-slate-400 text-xs">Secure enclave active</div>
                        </div>
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </IntelligenceGlassCard>
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

                {/* Predictive Intelligence Forecasting */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { time: 'Now', threats: 23, predictions: 45, correlations: 67 },
                      { time: '+1H', threats: 28, predictions: 52, correlations: 71 },
                      { time: '+2H', threats: 31, predictions: 48, correlations: 69 },
                      { time: '+4H', threats: 35, predictions: 61, correlations: 78 },
                      { time: '+6H', threats: 42, predictions: 55, correlations: 82 },
                      { time: '+12H', threats: 38, predictions: 67, correlations: 85 },
                      { time: '+24H', threats: 45, predictions: 73, correlations: 89 }
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
                        name="Current Threats"
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
                        name="Correlations"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </IntelligenceGlassCard>

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
              {/* Real-time Intelligence Network Visualization */}
              <IntelligenceGlassCard title="Real-time Intelligence Network Visualization" icon={Network} status="ACTIVE">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Network Topology */}
                  <div className="lg:col-span-2">
                    <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 p-6 relative overflow-hidden">
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/40 rounded-full blur-xl"></div>
                        <div className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500/40 rounded-full blur-xl"></div>
                        <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-violet-500/40 rounded-full blur-xl"></div>
                      </div>

                      {/* Network Nodes */}
                      <div className="relative h-full flex items-center justify-center">
                        {/* Central Hub */}
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-2xl shadow-purple-500/50"
                        >
                          <Crown className="w-8 h-8 text-white" />
                        </motion.div>

                        {/* Connected Agencies */}
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-0"
                        >
                          {[
                            { name: 'NSA', angle: 0, color: 'purple', status: 'active' },
                            { name: 'CIA', angle: 60, color: 'blue', status: 'active' },
                            { name: 'FBI', angle: 120, color: 'green', status: 'active' },
                            { name: 'DHS', angle: 180, color: 'red', status: 'active' },
                            { name: 'DoD', angle: 240, color: 'yellow', status: 'active' },
                            { name: 'Treasury', angle: 300, color: 'emerald', status: 'active' }
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
                                <div className={`w-10 h-10 bg-${agency.color}-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/20`}>
                                  <span className="text-white font-bold text-xs">{agency.name.substring(0, 2)}</span>
                                </div>
                                {/* Connection Line */}
                                <svg
                                  className="absolute inset-0 w-10 h-10 pointer-events-none"
                                  style={{ transform: `rotate(${-agency.angle}deg)` }}
                                >
                                  <line
                                    x1="20"
                                    y1="20"
                                    x2="120"
                                    y2="20"
                                    stroke={`var(--tw-ring-color-${agency.color}-500)`}
                                    strokeWidth="2"
                                    opacity="0.6"
                                    className="animate-pulse"
                                  />
                                </svg>
                              </motion.div>
                            );
                          })}
                        </motion.div>

                        {/* Data Flow Animation */}
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
                      </div>

                      {/* Network Stats Overlay */}
                      <div className="absolute top-4 left-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3">
                        <div className="text-white text-sm font-semibold mb-2">Network Status</div>
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
                            <span className="text-slate-300">Encryption: Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Network Analytics */}
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
                      </div>
                    </IntelligenceGlassCard>

                    {/* Intelligence Routing */}
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
                        </div>
                      </div>
                    </IntelligenceGlassCard>
                  </div>
                </div>
              </IntelligenceGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CrossAgencyIntelligenceFusion;
