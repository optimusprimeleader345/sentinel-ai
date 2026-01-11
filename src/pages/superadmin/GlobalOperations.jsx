import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
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
  LineChart as LineChartIcon,
  Target as TargetIcon,
  AlertTriangle as RiskIcon,
  AlertTriangle,
  Shield as ProtectionIcon,
  Brain as AIIcon,
  Activity as MonitoringIcon,
  Settings as ConfigIcon,
  FileText as ReportIcon,
  RefreshCw as UpdateIcon
} from 'lucide-react';

// 🏛️ GLOBAL OPERATIONS CENTER - SUPER ADMIN ONLY
// ADVANCED GLOBAL COORDINATION & INTERNATIONAL OPERATIONS
// WORLDWIDE STRATEGIC COMMAND & INTELLIGENCE HUB

const GlobalOperations = () => {
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
              This is a Global Operations Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('global-overview');
  const [selectedOperation, setSelectedOperation] = useState(null);
  const [globalData, setGlobalData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [operations, setOperations] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

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

  // Global Operations Categories
  const operationsCategories = [
    {
      id: 'coordination',
      name: 'Global Coordination',
      icon: Globe,
      level: 'HIGH',
      score: 87,
      trend: 'increasing',
      description: 'International coordination and diplomatic channels',
      status: 'Active 24/7',
      color: 'blue'
    },
    {
      id: 'intelligence',
      name: 'Intelligence Operations',
      icon: ShieldAlert,
      level: 'CRITICAL',
      score: 94,
      trend: 'stable',
      description: 'Global intelligence gathering and analysis',
      status: 'Enhanced Security',
      color: 'red'
    },
    {
      id: 'logistics',
      name: 'Strategic Logistics',
      icon: Truck,
      level: 'MEDIUM',
      score: 76,
      trend: 'increasing',
      description: 'Global supply chain and asset deployment',
      status: 'Optimized Routes',
      color: 'green'
    },
    {
      id: 'crisis',
      name: 'Crisis Management',
      icon: AlertTriangle,
      level: 'HIGH',
      score: 82,
      trend: 'stable',
      description: 'Emergency response and humanitarian operations',
      status: 'Ready Response',
      color: 'orange'
    },
    {
      id: 'diplomatic',
      name: 'Diplomatic Operations',
      icon: Building,
      level: 'MEDIUM',
      score: 71,
      trend: 'stable',
      description: 'International relations and embassy security',
      status: 'Diplomatic Channels',
      color: 'purple'
    },
    {
      id: 'economic',
      name: 'Economic Operations',
      icon: DollarSign,
      level: 'LOW',
      score: 68,
      trend: 'increasing',
      description: 'Global economic intelligence and trade',
      status: 'Market Monitoring',
      color: 'yellow'
    }
  ];

  // 📊 MAIN GLOBAL OPERATIONS CENTER INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-900 via-indigo-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Ocean Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-500/40 to-indigo-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/35 to-cyan-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/30 to-orange-400/30 rounded-full blur-3xl"></div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-2xl shadow-blue-500/30">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-indigo-300 via-cyan-200 to-orange-200 bg-clip-text text-transparent drop-shadow-sm">
                Global Operations Center
              </h1>
              <p className="text-blue-200/80 text-sm font-medium">Advanced Global Coordination & International Operations Hub</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">Global Coordination Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4 text-blue-400 animate-pulse" />
                  <span className="text-xs text-slate-300">247 International Assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Satellite className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs text-slate-300">94 Countries Covered</span>
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
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-blue-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Global Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Global Operations Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'global-overview', label: 'Global Overview', icon: Globe },
            { id: 'regional-operations', label: 'Regional Operations', icon: Map },
            { id: 'intelligence-network', label: 'Intelligence Network', icon: ShieldAlert },
            { id: 'crisis-management', label: 'Crisis Management', icon: AlertTriangle },
            { id: 'strategic-planning', label: 'Strategic Planning', icon: Target }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 text-blue-300 border border-blue-500/30 shadow-lg shadow-blue-500/10'
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
          {activeSection === 'global-overview' && (
            <motion.div
              key="global-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Interactive Global Operations Analytics Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Global Performance Metrics */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Global Performance</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-400">LIVE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { time: '00:00', operations: 94, assets: 247, uptime: 98.7 },
                            { time: '04:00', operations: 96, assets: 251, uptime: 98.9 },
                            { time: '08:00', operations: 89, assets: 245, uptime: 98.5 },
                            { time: '12:00', operations: 97, assets: 253, uptime: 99.1 },
                            { time: '16:00', operations: 95, assets: 249, uptime: 98.8 },
                            { time: '20:00', operations: 98, assets: 255, uptime: 99.2 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
                          <YAxis stroke="#9CA3AF" fontSize={10} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#0a0e1a',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                          />
                          <RechartsLegend />
                          <RechartsLine
                            type="monotone"
                            dataKey="operations"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            name="Active Operations"
                            dot={{ fill: '#06b6d4', strokeWidth: 2, r: 4 }}
                          />
                          <RechartsLine
                            type="monotone"
                            dataKey="assets"
                            stroke="#f97316"
                            strokeWidth={2}
                            name="Assets Deployed"
                            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-cyan-500/10 rounded-lg p-2">
                        <div className="text-cyan-400 text-lg font-bold">96</div>
                        <div className="text-cyan-500 text-xs">Operations</div>
                      </div>
                      <div className="bg-orange-500/10 rounded-lg p-2">
                        <div className="text-orange-400 text-lg font-bold">251</div>
                        <div className="text-orange-500 text-xs">Assets</div>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-2">
                        <div className="text-green-400 text-lg font-bold">99.1%</div>
                        <div className="text-green-500 text-xs">Uptime</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Global Intelligence Hub */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Global Intelligence Hub</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-purple-400">AI-POWERED</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/30 rounded-lg p-3 text-center">
                        <div className="text-purple-400 font-bold text-lg">1,247</div>
                        <div className="text-purple-500 text-xs">Signals Intercepted</div>
                        <div className="text-purple-600 text-xs mt-1">+15% this hour</div>
                      </div>
                      <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/10 border border-cyan-500/30 rounded-lg p-3 text-center">
                        <div className="text-cyan-400 font-bold text-lg">892</div>
                        <div className="text-cyan-500 text-xs">Active Sources</div>
                        <div className="text-cyan-600 text-xs mt-1">+8% this week</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Threat Detection Rate</span>
                        <span className="text-green-400 font-medium">94.7%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">False Positive Rate</span>
                        <span className="text-yellow-400 font-medium">2.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Response Time</span>
                        <span className="text-blue-400 font-medium">1.2s</span>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      Launch AI Analysis
                    </button>
                  </div>
                </div>

                {/* Global Risk Assessment */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Global Risk Assessment</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">LOW RISK</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            { subject: 'Geopolitical', A: 85, fullMark: 100 },
                            { subject: 'Cyber', A: 92, fullMark: 100 },
                            { subject: 'Economic', A: 78, fullMark: 100 },
                            { subject: 'Environmental', A: 88, fullMark: 100 },
                            { subject: 'Social', A: 82, fullMark: 100 },
                            { subject: 'Tech', A: 95, fullMark: 100 }
                          ]}
                        >
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                          <Radar
                            name="Risk Level"
                            dataKey="A"
                            stroke="#f97316"
                            fill="#f97316"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Overall Risk Score</span>
                        <span className="text-green-400 font-medium">23/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Trend</span>
                        <span className="text-green-400 font-medium">↓ Decreasing</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Update</span>
                        <span className="text-blue-400 font-medium">2 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Global Resource Allocation */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Resource Allocation</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-400">OPTIMIZING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Operations Budget</span>
                        <span className="text-white font-medium">$2.4B</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Intelligence Assets</span>
                        <span className="text-white font-medium">1,247</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Personnel Deployed</span>
                        <span className="text-white font-medium">3,847</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                      <span className="text-slate-400 text-sm">Efficiency Rating</span>
                      <span className="text-green-400 font-bold text-lg">94.7%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Analytics Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Operations Timeline Analytics */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Operations Timeline</h2>
                    </div>
                    <select className="bg-slate-800/60 border border-slate-600/30 rounded-lg px-3 py-1 text-sm text-slate-300 focus:outline-none focus:border-blue-500/50">
                      <option>Last 24 Hours</option>
                      <option>Last 7 Days</option>
                      <option>Last 30 Days</option>
                      <option>Last 90 Days</option>
                    </select>
                  </div>

                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { time: '00:00', operations: 87, alerts: 12, deployments: 23 },
                          { time: '06:00', operations: 92, alerts: 8, deployments: 31 },
                          { time: '12:00', operations: 89, alerts: 15, deployments: 28 },
                          { time: '18:00', operations: 95, alerts: 6, deployments: 35 },
                          { time: '24:00', operations: 91, alerts: 10, deployments: 29 }
                        ]}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <defs>
                          <linearGradient id="operationsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="alertsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="time" stroke="#9CA3AF" fontSize={10} />
                        <YAxis stroke="#9CA3AF" fontSize={10} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#0a0e1a',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="operations"
                          stackId="1"
                          stroke="#06b6d4"
                          fill="url(#operationsGradient)"
                          name="Active Operations"
                        />
                        <Area
                          type="monotone"
                          dataKey="alerts"
                          stackId="2"
                          stroke="#f97316"
                          fill="url(#alertsGradient)"
                          name="Critical Alerts"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Risk Assessment Engine */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Risk Assessment Engine</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-xs">LOW RISK</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            { subject: 'Geopolitical', A: 85, B: 75, fullMark: 100 },
                            { subject: 'Cyber Threats', A: 92, B: 88, fullMark: 100 },
                            { subject: 'Economic', A: 78, B: 82, fullMark: 100 },
                            { subject: 'Environmental', A: 88, B: 85, fullMark: 100 },
                            { subject: 'Social', A: 82, B: 79, fullMark: 100 },
                            { subject: 'Technological', A: 95, B: 91, fullMark: 100 }
                          ]}
                        >
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                          <Radar
                            name="Current Risk"
                            dataKey="A"
                            stroke="#f97316"
                            fill="#f97316"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          <Radar
                            name="Predicted Risk"
                            dataKey="B"
                            stroke="#06b6d4"
                            fill="#06b6d4"
                            fillOpacity={0.1}
                            strokeWidth={2}
                          />
                          <RechartsLegend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                        <div className="text-green-400 font-bold text-lg">LOW</div>
                        <div className="text-green-500 text-xs">Overall Risk Level</div>
                        <div className="text-green-600 text-xs mt-1">-12% from last week</div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                        <div className="text-blue-400 font-bold text-lg">87%</div>
                        <div className="text-blue-500 text-xs">Risk Mitigation</div>
                        <div className="text-blue-600 text-xs mt-1">+5% improvement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Asset Deployment Tracker */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center space-x-3">
                    <Truck className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Global Asset Deployment Tracker</h2>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-green-400 text-sm">Active</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className="text-yellow-400 text-sm">In Transit</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                      <span className="text-blue-400 text-sm">Standby</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { asset: 'Medical Teams', count: 23, active: 18, transit: 3, standby: 2, region: 'Global' },
                    { asset: 'Intelligence Units', count: 45, active: 35, transit: 5, standby: 5, region: 'Europe' },
                    { asset: 'Logistics Support', count: 67, active: 52, transit: 8, standby: 7, region: 'Asia-Pacific' },
                    { asset: 'Security Forces', count: 34, active: 28, transit: 4, standby: 2, region: 'Americas' },
                    { asset: 'Communication Hubs', count: 56, active: 43, transit: 7, standby: 6, region: 'Middle East' },
                    { asset: 'Emergency Response', count: 29, active: 22, transit: 3, standby: 4, region: 'Africa' },
                    { asset: 'Reconnaissance', count: 41, active: 31, transit: 6, standby: 4, region: 'Central Asia' },
                    { asset: 'Supply Chains', count: 78, active: 65, transit: 9, standby: 4, region: 'Global' }
                  ].map((deployment, index) => (
                    <motion.div
                      key={deployment.asset}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-200"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-white font-medium text-sm">{deployment.asset}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${
                          deployment.region === 'Global' ? 'bg-purple-500/20 text-purple-400' :
                          deployment.region === 'Europe' ? 'bg-blue-500/20 text-blue-400' :
                          deployment.region === 'Asia-Pacific' ? 'bg-orange-500/20 text-orange-400' :
                          deployment.region === 'Americas' ? 'bg-green-500/20 text-green-400' :
                          deployment.region === 'Middle East' ? 'bg-yellow-500/20 text-yellow-400' :
                          deployment.region === 'Africa' ? 'bg-red-500/20 text-red-400' :
                          'bg-cyan-500/20 text-cyan-400'
                        }`}>
                          {deployment.region}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-slate-400">Total:</span>
                          <span className="text-white font-medium">{deployment.count}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-green-400">Active:</span>
                          <span className="text-green-400 font-medium">{deployment.active}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-yellow-400">Transit:</span>
                          <span className="text-yellow-400 font-medium">{deployment.transit}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="text-blue-400">Standby:</span>
                          <span className="text-blue-400 font-medium">{deployment.standby}</span>
                        </div>
                      </div>

                      <div className="mt-3 bg-slate-700/50 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${(deployment.active / deployment.count) * 100}%` }}
                        ></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Global Operations Categories Overview */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center space-x-3">
                    <Layers className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Global Operations Categories</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-bold border bg-blue-500/20 text-blue-400 border-blue-500/40">
                    MONITORING
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {operationsCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedOperation === category.id
                            ? 'border-green-500/50 bg-green-500/10 shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                        }`}
                        onClick={() => setSelectedOperation(selectedOperation === category.id ? null : category.id)}
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
                              {category.level} PRIORITY
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Score:</span>
                            <span className="text-white font-medium">{category.score}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Status:</span>
                            <span className={`font-medium ${
                              category.trend === 'increasing' ? 'text-green-400' :
                              category.trend === 'stable' ? 'text-yellow-400' :
                              'text-blue-400'
                            }`}>
                              {category.status}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Global Operations Alerts */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center space-x-3">
                    <Radio className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Real-time Global Operations Alerts</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-bold border bg-cyan-500/20 text-cyan-400 border-cyan-500/40">
                    ACTIVE
                  </span>
                </div>

                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { id: 1, type: 'critical', title: 'Emergency Response Activated', message: 'Major humanitarian crisis in Southeast Asia - coordinating international aid', time: '2 minutes ago', severity: 'critical', region: 'Asia-Pacific' },
                    { id: 2, type: 'warning', title: 'Diplomatic Incident', message: 'Security breach at embassy in Eastern Europe - diplomatic channels engaged', time: '15 minutes ago', severity: 'high', region: 'Europe' },
                    { id: 3, type: 'info', title: 'Asset Deployment Complete', message: 'Medical supplies delivered to 12 countries - Operation Lifeline Phase 2 initiated', time: '1 hour ago', severity: 'medium', region: 'Global' },
                    { id: 4, type: 'success', title: 'Crisis Resolution', message: 'Peacekeeping operation successfully concluded in African nation', time: '2 hours ago', severity: 'low', region: 'Africa' },
                    { id: 5, type: 'info', title: 'Intelligence Update', message: 'New trade agreement signed - monitoring economic impact across 28 countries', time: '3 hours ago', severity: 'medium', region: 'Americas' }
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
                            <div className="text-cyan-400 text-xs mt-1">Region: {alert.region}</div>
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
              </div>
            </motion.div>
          )}

          {activeSection === 'regional-operations' && (
            <motion.div
              key="regional-operations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Regional Operations Command Center */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center space-x-3">
                    <Map className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Regional Operations Command Center</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-bold border bg-cyan-500/20 text-cyan-400 border-cyan-500/40">
                    94 COUNTRIES ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { region: 'North America', countries: 3, assets: 45, status: 'Optimal', color: 'green' },
                    { region: 'Europe', countries: 27, assets: 89, status: 'Active', color: 'blue' },
                    { region: 'Asia-Pacific', countries: 32, assets: 67, status: 'High Activity', color: 'orange' },
                    { region: 'Africa', countries: 54, assets: 34, status: 'Developing', color: 'yellow' },
                    { region: 'South America', countries: 12, assets: 23, status: 'Stable', color: 'green' },
                    { region: 'Middle East', countries: 18, assets: 41, status: 'Monitoring', color: 'purple' },
                    { region: 'Central Asia', countries: 5, assets: 12, status: 'Limited', color: 'gray' },
                    { region: 'Oceania', countries: 14, assets: 18, status: 'Growing', color: 'cyan' }
                  ].map((region, index) => (
                    <motion.div
                      key={region.region}
                      initial={{ opacity: 0, scale: 0.95, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className={`relative p-4 rounded-xl border backdrop-blur-xl hover:scale-105 transition-all duration-300 ${
                        region.color === 'green' ? 'bg-gradient-to-br from-green-500/10 to-green-900/20 border-green-500/30' :
                        region.color === 'blue' ? 'bg-gradient-to-br from-blue-500/10 to-blue-900/20 border-blue-500/30' :
                        region.color === 'orange' ? 'bg-gradient-to-br from-orange-500/10 to-orange-900/20 border-orange-500/30' :
                        region.color === 'yellow' ? 'bg-gradient-to-br from-yellow-500/10 to-yellow-900/20 border-yellow-500/30' :
                        region.color === 'purple' ? 'bg-gradient-to-br from-purple-500/10 to-purple-900/20 border-purple-500/30' :
                        region.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-900/20 border-cyan-500/30' :
                        'bg-gradient-to-br from-gray-500/10 to-gray-900/20 border-gray-500/30'
                      }`}
                    >
                      <div className="relative z-10">
                        <h4 className="text-white font-semibold text-sm mb-2">{region.region}</h4>
                        <div className="space-y-2 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Countries:</span>
                            <span className="text-white font-medium">{region.countries}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Assets:</span>
                            <span className="text-white font-medium">{region.assets}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Status:</span>
                            <span className={`font-medium ${
                              region.color === 'green' ? 'text-green-400' :
                              region.color === 'blue' ? 'text-blue-400' :
                              region.color === 'orange' ? 'text-orange-400' :
                              region.color === 'yellow' ? 'text-yellow-400' :
                              region.color === 'purple' ? 'text-purple-400' :
                              region.color === 'cyan' ? 'text-cyan-400' :
                              'text-gray-400'
                            }`}>
                              {region.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Advanced Regional Performance Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Regional Performance Comparison */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <BarChart className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Regional Performance Analytics</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">REAL-TIME</span>
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { region: 'Europe', operations: 89, assets: 92, intelligence: 95 },
                          { region: 'Asia-Pacific', operations: 87, assets: 88, intelligence: 91 },
                          { region: 'North America', operations: 93, assets: 96, intelligence: 94 },
                          { region: 'Africa', operations: 76, assets: 78, intelligence: 82 },
                          { region: 'Middle East', operations: 84, assets: 86, intelligence: 88 },
                          { region: 'South America', operations: 81, assets: 83, intelligence: 85 }
                        ]}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="region" stroke="#9CA3AF" fontSize={10} angle={-45} textAnchor="end" height={60} />
                        <YAxis stroke="#9CA3AF" fontSize={10} />
                        <RechartsTooltip
                          contentStyle={{
                            backgroundColor: '#0a0e1a',
                            border: '1px solid #374151',
                            borderRadius: '8px',
                            color: '#fff'
                          }}
                        />
                        <RechartsLegend />
                        <RechartsBar dataKey="operations" fill="#06b6d4" name="Operations %" />
                        <RechartsBar dataKey="assets" fill="#f97316" name="Assets %" />
                        <RechartsBar dataKey="intelligence" fill="#10b981" name="Intelligence %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Cross-Border Coordination Network */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Network className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Cross-Border Coordination</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-400">ACTIVE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                        <div className="text-blue-400 font-bold text-xl">247</div>
                        <div className="text-blue-500 text-xs">Active Channels</div>
                        <div className="text-blue-600 text-xs mt-1">+12% this week</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                        <div className="text-green-400 font-bold text-xl">94.2%</div>
                        <div className="text-green-500 text-xs">Coordination Rate</div>
                        <div className="text-green-600 text-xs mt-1">+2.1% efficiency</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">EU-North America</span>
                        <span className="text-green-400 font-medium">98.7% Sync</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Asia-Pacific Hub</span>
                        <span className="text-blue-400 font-medium">95.3% Active</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Trans-Atlantic Link</span>
                        <span className="text-purple-400 font-medium">97.1% Stable</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Pacific Rim Network</span>
                        <span className="text-cyan-400 font-medium">93.8% Connected</span>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      Optimize Network Routes
                    </button>
                  </div>
                </div>
              </div>

              {/* Resource Allocation Engine & Threat Heatmaps */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dynamic Resource Allocation Engine */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Resource Allocation Engine</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-400">AI-OPTIMIZED</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">High-Threat Regions</span>
                          <span className="text-red-400 font-medium">67% Allocation</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full" style={{ width: '67%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">Strategic Corridors</span>
                          <span className="text-yellow-400 font-medium">23% Allocation</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '23%' }}></div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-400">Development Zones</span>
                          <span className="text-green-400 font-medium">10% Allocation</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-3">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-cyan-400 text-lg font-bold">1,247</div>
                        <div className="text-cyan-500 text-xs">Total Assets</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-green-400 text-lg font-bold">89.3%</div>
                        <div className="text-green-500 text-xs">Utilization</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-purple-400 text-lg font-bold">94.7%</div>
                        <div className="text-purple-500 text-xs">Efficiency</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        AI Optimize
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Manual Override
                      </button>
                    </div>
                  </div>
                </div>

                {/* Regional Threat Heatmaps */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Regional Threat Heatmaps</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-400">HIGH ALERT</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <div className="text-red-400 font-medium text-sm mb-2">Critical Threats</div>
                        <div className="text-red-300 text-2xl font-bold">23</div>
                        <div className="text-red-500 text-xs">Active Regions</div>
                        <div className="text-red-600 text-xs mt-1">Immediate Response Required</div>
                      </div>
                      <div className="bg-gradient-to-br from-orange-500/10 to-orange-900/20 border border-orange-500/30 rounded-lg p-4">
                        <div className="text-orange-400 font-medium text-sm mb-2">High Risk Areas</div>
                        <div className="text-orange-300 text-2xl font-bold">47</div>
                        <div className="text-orange-500 text-xs">Elevated Threat</div>
                        <div className="text-orange-600 text-xs mt-1">Enhanced Monitoring</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Middle East Conflict Zone</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-red-400 font-medium">CRITICAL</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Eastern Europe Border</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                          <span className="text-orange-400 font-medium">HIGH</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">South China Sea</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                          <span className="text-yellow-400 font-medium">MEDIUM</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">African Sahel Region</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                          <span className="text-red-400 font-medium">CRITICAL</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Deploy Response Teams
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Intelligence Brief
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regional Command Center & Asset Visualization */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Regional Command Center Communications */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Command Communications</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">SECURE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">EU Command Center</span>
                          <span className="text-green-400 text-xs">ONLINE</span>
                        </div>
                        <div className="text-xs text-slate-400">Last message: 2 min ago</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">Pacific Operations</span>
                          <span className="text-blue-400 text-xs">ACTIVE</span>
                        </div>
                        <div className="text-xs text-slate-400">Coordinating asset deployment</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">African Command</span>
                          <span className="text-orange-400 text-xs">STANDBY</span>
                        </div>
                        <div className="text-xs text-slate-400">Monitoring humanitarian ops</div>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      Open Command Chat
                    </button>
                  </div>
                </div>

                {/* Asset Deployment Maps */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Asset Deployment Maps</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-400">LIVE TRACKING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-3 h-32 overflow-hidden">
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-2 left-4 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-6 right-6 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-4 left-8 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-6 right-4 w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="text-cyan-400 font-medium text-sm">Interactive Map View</div>
                        <div className="text-slate-400 text-xs mt-1">Click regions for details</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-center">
                      <div className="bg-green-500/10 rounded-lg p-2">
                        <div className="text-green-400 text-sm font-bold">156</div>
                        <div className="text-green-500 text-xs">Active Assets</div>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-2">
                        <div className="text-blue-400 text-sm font-bold">23</div>
                        <div className="text-blue-500 text-xs">Moving Assets</div>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      View Full Map
                    </button>
                  </div>
                </div>

                {/* Regional Performance Trends */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Performance Trends</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">IMPROVING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { month: 'Jan', efficiency: 85, response: 78 },
                            { month: 'Feb', efficiency: 87, response: 82 },
                            { month: 'Mar', efficiency: 89, response: 85 },
                            { month: 'Apr', efficiency: 91, response: 88 },
                            { month: 'May', efficiency: 93, response: 91 },
                            { month: 'Jun', efficiency: 95, response: 94 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <Area
                            type="monotone"
                            dataKey="efficiency"
                            stroke="#10b981"
                            fill="url(#efficiencyGradient)"
                            name="Efficiency %"
                          />
                          <Area
                            type="monotone"
                            dataKey="response"
                            stroke="#06b6d4"
                            fill="url(#responseGradient)"
                            name="Response %"
                          />
                          <defs>
                            <linearGradient id="efficiencyGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="responseGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Efficiency Trend</span>
                        <span className="text-green-400 font-medium">+8.2%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Response Time</span>
                        <span className="text-blue-400 font-medium">-12.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Asset Utilization</span>
                        <span className="text-purple-400 font-medium">+15.3%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              {/* Global Intelligence Operations Network */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center space-x-3">
                    <ShieldAlert className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Global Intelligence Operations Network</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-bold border bg-purple-500/20 text-purple-400 border-purple-500/40">
                    CLASSIFIED
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">SIGINT Operations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                        <div className="text-cyan-400 font-medium text-sm mb-1">Satellite Surveillance</div>
                        <div className="text-cyan-300 text-lg font-bold">23</div>
                        <div className="text-cyan-500 text-xs">Active Orbits</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="text-blue-400 font-medium text-sm mb-1">Signal Intercepts</div>
                        <div className="text-blue-300 text-lg font-bold">1,247</div>
                        <div className="text-blue-500 text-xs">Daily Collection</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">HUMINT Networks</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-magenta-500/10 border border-magenta-500/30 rounded-lg">
                        <div className="text-magenta-400 font-medium text-sm mb-1">Active Agents</div>
                        <div className="text-magenta-300 text-lg font-bold">247</div>
                        <div className="text-magenta-500 text-xs">Field Operatives</div>
                      </div>
                      <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                        <div className="text-purple-400 font-medium text-sm mb-1">Intelligence Assets</div>
                        <div className="text-purple-300 text-lg font-bold">892</div>
                        <div className="text-purple-500 text-xs">Strategic Sources</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">OSINT Collection</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <div className="text-green-400 font-medium text-sm mb-1">Data Feeds</div>
                        <div className="text-green-300 text-lg font-bold">2.4M</div>
                        <div className="text-green-500 text-xs">Active Sources</div>
                      </div>
                      <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                        <div className="text-teal-400 font-medium text-sm mb-1">Analysis Reports</div>
                        <div className="text-teal-300 text-lg font-bold">15.7K</div>
                        <div className="text-teal-500 text-xs">Monthly Output</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Intelligence Source Reliability Scoring */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Source Quality Analytics Dashboard */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Eye className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Intelligence Source Reliability</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">HIGH CONFIDENCE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            { subject: 'Credibility', A: 92, fullMark: 100 },
                            { subject: 'Accuracy', A: 89, fullMark: 100 },
                            { subject: 'Timeliness', A: 95, fullMark: 100 },
                            { subject: 'Consistency', A: 87, fullMark: 100 },
                            { subject: 'Relevance', A: 93, fullMark: 100 },
                            { subject: 'Verification', A: 91, fullMark: 100 }
                          ]}
                        >
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                          <Radar
                            name="Source Quality"
                            dataKey="A"
                            stroke="#06b6d4"
                            fill="#06b6d4"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-green-500/10 rounded-lg p-2">
                        <div className="text-green-400 text-sm font-bold">A+</div>
                        <div className="text-green-500 text-xs">Grade</div>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-2">
                        <div className="text-blue-400 text-sm font-bold">92%</div>
                        <div className="text-blue-500 text-xs">Reliability</div>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-2">
                        <div className="text-purple-400 text-sm font-bold">1.2h</div>
                        <div className="text-purple-500 text-xs">Avg Response</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Threat Detection Dashboard */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Threat Detection Analytics</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-400">AI-POWERED</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">AI Detection Rate</span>
                        <span className="text-green-400 font-medium">94.7%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '94.7%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">False Positive Rate</span>
                        <span className="text-yellow-400 font-medium">2.3%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '2.3%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Response Time</span>
                        <span className="text-blue-400 font-medium">1.2s</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-red-400 text-lg font-bold">156</div>
                        <div className="text-red-500 text-xs">Threats Detected</div>
                        <div className="text-red-600 text-xs mt-1">+23% this week</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-green-400 text-lg font-bold">89</div>
                        <div className="text-green-500 text-xs">Actions Taken</div>
                        <div className="text-green-600 text-xs mt-1">57% automated</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Flow Visualization & Network Performance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Data Flow Visualization */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Network className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Intelligence Data Flow</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-400">REAL-TIME</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4 h-48 overflow-hidden">
                      {/* Data flow visualization */}
                      <div className="absolute inset-0">
                        {/* Collection Points */}
                        <div className="absolute top-4 left-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="absolute top-8 right-8 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-6 left-6 w-3 h-3 bg-purple-400 rounded-full animate-pulse"></div>
                        <div className="absolute bottom-4 right-4 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>

                        {/* Processing Hub */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50">
                          <div className="absolute inset-1 bg-cyan-300 rounded-full animate-ping"></div>
                        </div>

                        {/* Flow Lines */}
                        <svg className="absolute inset-0 w-full h-full">
                          <path d="M16,16 Q120,80 200,120" stroke="#06b6d4" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" className="animate-pulse" />
                          <path d="M304,32 Q200,80 120,120" stroke="#10b981" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" className="animate-pulse" />
                          <path d="M24,104 Q120,80 200,40" stroke="#8b5cf6" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" className="animate-pulse" />
                          <path d="M280,120 Q200,80 120,40" stroke="#f97316" strokeWidth="2" fill="none" strokeDasharray="5,5" opacity="0.6" className="animate-pulse" />
                        </svg>
                      </div>

                      <div className="relative z-10 text-center">
                        <div className="text-cyan-400 font-medium text-sm">AI Processing Hub</div>
                        <div className="text-slate-400 text-xs mt-1">Real-time data routing & analysis</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-blue-500/10 rounded-lg p-2">
                        <div className="text-blue-400 text-sm font-bold">2.4GB/s</div>
                        <div className="text-blue-500 text-xs">Data In</div>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-2">
                        <div className="text-green-400 text-sm font-bold">1.8GB/s</div>
                        <div className="text-green-500 text-xs">Processed</div>
                      </div>
                      <div className="bg-purple-500/10 rounded-lg p-2">
                        <div className="text-purple-400 text-sm font-bold">0.6GB/s</div>
                        <div className="text-purple-500 text-xs">Archived</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Network Performance Metrics */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Gauge className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Network Performance</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">OPTIMAL</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                        <div className="text-green-400 font-bold text-xl">99.97%</div>
                        <div className="text-green-500 text-xs">Uptime</div>
                        <div className="text-green-600 text-xs mt-1">Last 30 days</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                        <div className="text-blue-400 font-bold text-xl">45ms</div>
                        <div className="text-blue-500 text-xs">Avg Latency</div>
                        <div className="text-blue-600 text-xs mt-1">Global network</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Bandwidth Utilization</span>
                        <span className="text-cyan-400 font-medium">67%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '67%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Encryption Strength</span>
                        <span className="text-purple-400 font-medium">AES-256</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-orange-400 text-sm font-bold">156</div>
                        <div className="text-orange-500 text-xs">Active Nodes</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-teal-400 text-sm font-bold">23</div>
                        <div className="text-teal-500 text-xs">Satellites</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Radar Charts & Source Analytics */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Interactive Threat Assessment Radar */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <RadarChart className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Multi-Dimensional Threat Assessment</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-400">CRITICAL</span>
                    </div>
                  </div>

                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        data={[
                          { subject: 'Cyber Attacks', A: 85, B: 78, fullMark: 100 },
                          { subject: 'State Actors', A: 92, B: 88, fullMark: 100 },
                          { subject: 'Terror Threats', A: 76, B: 82, fullMark: 100 },
                          { subject: 'Economic Espionage', A: 89, B: 85, fullMark: 100 },
                          { subject: 'Insider Threats', A: 68, B: 72, fullMark: 100 },
                          { subject: 'Supply Chain', A: 94, B: 91, fullMark: 100 }
                        ]}
                      >
                        <PolarGrid stroke="#374151" />
                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 9 }} />
                        <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                        <Radar
                          name="Current Threats"
                          dataKey="A"
                          stroke="#f97316"
                          fill="#f97316"
                          fillOpacity={0.3}
                          strokeWidth={2}
                        />
                        <Radar
                          name="Predicted Threats"
                          dataKey="B"
                          stroke="#06b6d4"
                          fill="#06b6d4"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                        <RechartsLegend />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Source Quality Scoring System */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Source Quality Scoring</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-yellow-400">EVALUATING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                          <div>
                            <div className="text-white text-sm font-medium">Strategic HUMINT Asset</div>
                            <div className="text-slate-400 text-xs">Eastern Europe Network</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-green-400 font-bold">A+</div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                          <div>
                            <div className="text-white text-sm font-medium">SIGINT Satellite Feed</div>
                            <div className="text-slate-400 text-xs">Middle East Monitoring</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-blue-400 font-bold">A</div>
                          <div className="flex">
                            {[...Array(4)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            <Star className="w-3 h-3 text-slate-600" />
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-3 h-3 bg-orange-400 rounded-full"></div>
                          <div>
                            <div className="text-white text-sm font-medium">OSINT Social Media</div>
                            <div className="text-slate-400 text-xs">Global Trend Analysis</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-orange-400 font-bold">B+</div>
                          <div className="flex">
                            {[...Array(3)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            {[...Array(2)].map((_, i) => (
                              <Star key={i + 3} className="w-3 h-3 text-slate-600" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-green-500/10 rounded-lg p-2">
                        <div className="text-green-400 text-lg font-bold">67%</div>
                        <div className="text-green-500 text-xs">A-Rated</div>
                      </div>
                      <div className="bg-blue-500/10 rounded-lg p-2">
                        <div className="text-blue-400 text-lg font-bold">28%</div>
                        <div className="text-blue-500 text-xs">B-Rated</div>
                      </div>
                      <div className="bg-red-500/10 rounded-lg p-2">
                        <div className="text-red-400 text-lg font-bold">5%</div>
                        <div className="text-red-500 text-xs">C-Rated</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
              {/* Global Crisis Management Center */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Global Crisis Management Center</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-bold border bg-red-500/20 text-red-400 border-red-500/40">
                    EMERGENCY READY
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Active Crisis Operations</h4>
                    <div className="space-y-3">
                      {[
                        { crisis: 'Pacific Tsunami Response', region: 'Asia-Pacific', severity: 'Critical', assets: 45, progress: 78 },
                        { crisis: 'European Refugee Crisis', region: 'Europe', severity: 'High', assets: 78, progress: 65 },
                        { crisis: 'African Famine Relief', region: 'Africa', severity: 'High', assets: 92, progress: 82 },
                        { crisis: 'Caribbean Hurricane Recovery', region: 'Americas', severity: 'Medium', assets: 34, progress: 91 }
                      ].map((operation, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-white font-medium text-sm">{operation.crisis}</div>
                              <div className="text-cyan-400 text-xs">{operation.region}</div>
                            </div>
                            <div className="text-right">
                              <span className={`text-xs font-bold px-2 py-1 rounded ${
                                operation.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                                operation.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {operation.severity}
                              </span>
                              <div className="text-green-400 text-xs mt-1">{operation.assets} Assets</div>
                            </div>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${
                                operation.progress > 80 ? 'bg-green-500' :
                                operation.progress > 60 ? 'bg-yellow-500' :
                                'bg-red-500'
                              }`}
                              style={{ width: `${operation.progress}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{operation.progress}% Complete</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Emergency Response Teams</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { type: 'Medical', count: 23, status: 'Deployed', readiness: 95 },
                        { type: 'Logistics', count: 45, status: 'Ready', readiness: 87 },
                        { type: 'Security', count: 67, status: 'Standby', readiness: 92 },
                        { type: 'Communications', count: 34, status: 'Active', readiness: 89 }
                      ].map((team, index) => (
                        <div key={index} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 text-center">
                          <div className="text-white font-medium text-sm">{team.type}</div>
                          <div className="text-cyan-400 text-lg font-bold">{team.count}</div>
                          <div className={`text-xs ${
                            team.status === 'Deployed' ? 'text-green-400' :
                            team.status === 'Ready' ? 'text-blue-400' :
                            team.status === 'Active' ? 'text-purple-400' :
                            'text-yellow-400'
                          }`}>
                            {team.status}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{team.readiness}% Ready</div>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Activate Protocol
                      </button>
                      <button className="px-3 py-2 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Emergency Alert
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Crisis Escalation Timeline</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-red-400 font-medium text-sm">CRITICAL ALERT</div>
                          <div className="text-red-400 text-xs">2 min ago</div>
                        </div>
                        <div className="text-white text-sm">Pacific Tsunami - Level 5 Escalation</div>
                        <div className="text-red-500 text-xs mt-1">Immediate international response required</div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-orange-400 font-medium text-sm">HIGH PRIORITY</div>
                          <div className="text-orange-400 text-xs">15 min ago</div>
                        </div>
                        <div className="text-white text-sm">European Refugee Crisis - Level 4</div>
                        <div className="text-orange-500 text-xs mt-1">Coordinated humanitarian aid deployment</div>
                      </div>

                      <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-yellow-400 font-medium text-sm">MONITORING</div>
                          <div className="text-yellow-400 text-xs">1 hour ago</div>
                        </div>
                        <div className="text-white text-sm">African Famine Relief - Level 3</div>
                        <div className="text-yellow-500 text-xs mt-1">Ongoing assessment and support</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Crisis Response Analytics & Emergency Asset Deployment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Crisis Response Analytics Dashboard */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <BarChart className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Crisis Response Analytics</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">PERFORMANCE TRACKING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4 text-center">
                        <div className="text-green-400 font-bold text-xl">94.7%</div>
                        <div className="text-green-500 text-xs">Response Success Rate</div>
                        <div className="text-green-600 text-xs mt-1">+5.2% improvement</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-4 text-center">
                        <div className="text-blue-400 font-bold text-xl">1.8h</div>
                        <div className="text-blue-500 text-xs">Average Response Time</div>
                        <div className="text-blue-600 text-xs mt-1">-0.3h faster</div>
                      </div>
                    </div>

                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { month: 'Jan', success: 89, response: 2.1 },
                            { month: 'Feb', success: 91, response: 1.9 },
                            { month: 'Mar', success: 93, response: 1.7 },
                            { month: 'Apr', success: 95, response: 1.6 },
                            { month: 'May', success: 94, response: 1.8 },
                            { month: 'Jun', success: 97, response: 1.5 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} />
                          <YAxis yAxisId="left" stroke="#9CA3AF" fontSize={10} />
                          <YAxis yAxisId="right" orientation="right" stroke="#9CA3AF" fontSize={10} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#0a0e1a',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                          />
                          <RechartsLine
                            yAxisId="left"
                            type="monotone"
                            dataKey="success"
                            stroke="#10b981"
                            strokeWidth={2}
                            name="Success Rate %"
                          />
                          <RechartsLine
                            yAxisId="right"
                            type="monotone"
                            dataKey="response"
                            stroke="#06b6d4"
                            strokeWidth={2}
                            name="Response Time (h)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Crisis Resolution Rate</span>
                        <span className="text-green-400 font-medium">87.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Asset Deployment Efficiency</span>
                        <span className="text-blue-400 font-medium">91.5%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">International Coordination</span>
                        <span className="text-purple-400 font-medium">94.2%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Asset Deployment Maps */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Emergency Asset Deployment</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-400">LIVE DEPLOYMENT</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-4 h-48 overflow-hidden">
                      {/* Deployment visualization */}
                      <div className="absolute inset-0">
                        {/* Active deployment zones */}
                        <div className="absolute top-6 left-8 w-4 h-4 bg-red-400 rounded-full animate-pulse shadow-lg shadow-red-400/50">
                          <div className="absolute inset-1 bg-red-300 rounded-full animate-ping"></div>
                        </div>
                        <div className="absolute top-12 right-12 w-3 h-3 bg-orange-400 rounded-full animate-pulse shadow-lg shadow-orange-400/50"></div>
                        <div className="absolute bottom-8 left-12 w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg shadow-yellow-400/50"></div>
                        <div className="absolute bottom-12 right-8 w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>

                        {/* Deployment routes */}
                        <svg className="absolute inset-0 w-full h-full">
                          <path d="M32,24 Q80,40 120,60" stroke="#f97316" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.8" className="animate-pulse" />
                          <path d="M140,32 Q100,60 60,80" stroke="#10b981" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.8" className="animate-pulse" />
                          <path d="M28,84 Q80,60 132,36" stroke="#eab308" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.8" className="animate-pulse" />
                          <path d="M148,84 Q100,60 52,36" stroke="#06b6d4" strokeWidth="3" fill="none" strokeDasharray="8,4" opacity="0.8" className="animate-pulse" />
                        </svg>
                      </div>

                      <div className="relative z-10 text-center">
                        <div className="text-red-400 font-medium text-sm">Critical Deployment Zones</div>
                        <div className="text-slate-400 text-xs mt-1">Real-time asset movement tracking</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-white text-sm font-medium">Deployed Assets</div>
                        <div className="text-green-400 text-2xl font-bold">247</div>
                        <div className="text-green-500 text-xs">Across 4 crisis zones</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-white text-sm font-medium">In Transit</div>
                        <div className="text-blue-400 text-2xl font-bold">89</div>
                        <div className="text-blue-500 text-xs">Moving to hotspots</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Deploy Medical Teams
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Logistics Support
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recovery Progress & Impact Assessment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recovery Progress Tracking */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Recovery Progress Tracking</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">RECOVERY PHASE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Infrastructure Restoration</span>
                        <span className="text-green-400 font-medium">87%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Population Recovery</span>
                        <span className="text-blue-400 font-medium">73%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Economic Recovery</span>
                        <span className="text-yellow-400 font-medium">65%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Service Restoration</span>
                        <span className="text-purple-400 font-medium">91%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '91%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-green-400 text-lg font-bold">28</div>
                        <div className="text-green-500 text-xs">Days Since Peak</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-blue-400 text-lg font-bold">1.2M</div>
                        <div className="text-blue-500 text-xs">People Assisted</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-purple-400 text-lg font-bold">$4.7B</div>
                        <div className="text-purple-500 text-xs">Aid Distributed</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Assessment Analytics */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Calculator className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Impact Assessment Analytics</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-400">ECONOMIC MODELING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <div className="text-red-400 font-medium text-sm mb-2">Economic Impact</div>
                        <div className="text-red-300 text-xl font-bold">$12.4B</div>
                        <div className="text-red-500 text-xs">Direct losses</div>
                        <div className="text-red-600 text-xs mt-1">-3.2% GDP impact</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/10 to-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                        <div className="text-blue-400 font-medium text-sm mb-2">Recovery Cost</div>
                        <div className="text-blue-300 text-xl font-bold">$8.7B</div>
                        <div className="text-blue-500 text-xs">Reconstruction</div>
                        <div className="text-blue-600 text-xs mt-1">2-year timeline</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Humanitarian Aid</span>
                        <span className="text-green-400 font-medium">$4.7B deployed</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">International Support</span>
                        <span className="text-blue-400 font-medium">47 countries</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Long-term Development</span>
                        <span className="text-purple-400 font-medium">$15.2B planned</span>
                      </div>
                    </div>

                    <div className="h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { week: 'W1', impact: 85, recovery: 15 },
                            { week: 'W2', impact: 78, recovery: 22 },
                            { week: 'W3', impact: 65, recovery: 35 },
                            { week: 'W4', impact: 52, recovery: 48 },
                            { week: 'W5', impact: 38, recovery: 62 },
                            { week: 'W6', impact: 25, recovery: 75 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <Area
                            type="monotone"
                            dataKey="impact"
                            stackId="1"
                            stroke="#f97316"
                            fill="url(#impactGradient)"
                            name="Impact Level"
                          />
                          <Area
                            type="monotone"
                            dataKey="recovery"
                            stackId="1"
                            stroke="#10b981"
                            fill="url(#recoveryGradient)"
                            name="Recovery Progress"
                          />
                          <defs>
                            <linearGradient id="impactGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="recoveryGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      Generate Impact Report
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'strategic-planning' && (
            <motion.div
              key="strategic-planning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Global Strategic Planning Center */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                    <h2 className="text-xl font-bold text-white">Global Strategic Planning Center</h2>
                  </div>
                  <span className="px-3 py-1 rounded-full text-sm font-bold border bg-blue-500/20 text-blue-400 border-blue-500/40">
                    LONG-TERM PLANNING
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { metric: '5-Year Growth Forecast', value: '+127%', trend: 'up', color: 'green' },
                    { metric: 'Infrastructure Projects', value: '847', trend: 'up', color: 'blue' },
                    { metric: 'Economic Partnerships', value: '156', trend: 'stable', color: 'purple' },
                    { metric: 'Technological Investments', value: '$2.4T', trend: 'up', color: 'cyan' },
                    { metric: 'Climate Initiatives', value: '93', trend: 'up', color: 'teal' },
                    { metric: 'Peacekeeping Missions', value: '28', trend: 'stable', color: 'orange' },
                    { metric: 'Trade Agreements', value: '412', trend: 'up', color: 'green' },
                    { metric: 'Development Aid', value: '$89B', trend: 'up', color: 'yellow' }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className={`p-4 rounded-lg border backdrop-blur-sm hover:scale-105 transition-all duration-300 ${
                        item.color === 'green' ? 'bg-green-500/10 border-green-500/30 hover:bg-green-500/20' :
                        item.color === 'blue' ? 'bg-blue-500/10 border-blue-500/30 hover:bg-blue-500/20' :
                        item.color === 'purple' ? 'bg-purple-500/10 border-purple-500/30 hover:bg-purple-500/20' :
                        item.color === 'cyan' ? 'bg-cyan-500/10 border-cyan-500/30 hover:bg-cyan-500/20' :
                        item.color === 'teal' ? 'bg-teal-500/10 border-teal-500/30 hover:bg-teal-500/20' :
                        item.color === 'orange' ? 'bg-orange-500/10 border-orange-500/30 hover:bg-orange-500/20' :
                        item.color === 'yellow' ? 'bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/20' :
                        'bg-gray-500/10 border-gray-500/30 hover:bg-gray-500/20'
                      }`}
                    >
                      <div className="text-center">
                        <div className={`text-lg font-bold mb-1 ${
                          item.color === 'green' ? 'text-green-400' :
                          item.color === 'blue' ? 'text-blue-400' :
                          item.color === 'purple' ? 'text-purple-400' :
                          item.color === 'cyan' ? 'text-cyan-400' :
                          item.color === 'teal' ? 'text-teal-400' :
                          item.color === 'orange' ? 'text-orange-400' :
                          item.color === 'yellow' ? 'text-yellow-400' :
                          'text-gray-400'
                        }`}>
                          {item.value}
                        </div>
                        <div className="text-slate-300 text-xs mb-2">{item.metric}</div>
                        <div className="flex items-center justify-center">
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-3 h-3 text-green-400" />
                          ) : (
                            <Activity className="w-3 h-3 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Long-term Forecasting Models */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* AI-Powered Forecasting Dashboard */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Sparkles className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">AI Forecasting Models</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-purple-400">MACHINE LEARNING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { year: '2024', actual: 85, forecast: 87, scenario1: 92, scenario2: 78 },
                            { year: '2025', actual: null, forecast: 91, scenario1: 97, scenario2: 83 },
                            { year: '2026', actual: null, forecast: 95, scenario1: 102, scenario2: 87 },
                            { year: '2027', actual: null, forecast: 98, scenario1: 106, scenario2: 89 },
                            { year: '2028', actual: null, forecast: 102, scenario1: 111, scenario2: 92 },
                            { year: '2029', actual: null, forecast: 105, scenario1: 115, scenario2: 94 }
                          ]}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="year" stroke="#9CA3AF" fontSize={10} />
                          <YAxis stroke="#9CA3AF" fontSize={10} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#0a0e1a',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                          />
                          <RechartsLegend />
                          <RechartsLine
                            type="monotone"
                            dataKey="actual"
                            stroke="#10b981"
                            strokeWidth={3}
                            name="Historical Data"
                            dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                            connectNulls={false}
                          />
                          <RechartsLine
                            type="monotone"
                            dataKey="forecast"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            strokeDasharray="8 8"
                            name="AI Forecast"
                            dot={false}
                          />
                          <RechartsLine
                            type="monotone"
                            dataKey="scenario1"
                            stroke="#8b5cf6"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            name="Optimistic Scenario"
                            dot={false}
                          />
                          <RechartsLine
                            type="monotone"
                            dataKey="scenario2"
                            stroke="#f97316"
                            strokeWidth={2}
                            strokeDasharray="4 4"
                            name="Conservative Scenario"
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-3">
                        <div className="text-green-400 font-bold text-lg">95%</div>
                        <div className="text-green-500 text-xs">Confidence Level</div>
                        <div className="text-green-600 text-xs mt-1">High Accuracy</div>
                      </div>
                      <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-3">
                        <div className="text-blue-400 font-bold text-lg">+18%</div>
                        <div className="text-blue-500 text-xs">5-Year Growth</div>
                        <div className="text-blue-600 text-xs mt-1">Projected</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-lg p-3">
                        <div className="text-purple-400 font-bold text-lg">3</div>
                        <div className="text-purple-500 text-xs">Scenarios</div>
                        <div className="text-purple-600 text-xs mt-1">Analyzed</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenario Planning Tools */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Layers className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Scenario Planning Tools</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-orange-400">WHAT-IF ANALYSIS</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Economic Downturn Scenario</span>
                        <span className="text-red-400 font-medium">-15% Impact</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Technology Breakthrough</span>
                        <span className="text-green-400 font-medium">+35% Growth</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Geopolitical Instability</span>
                        <span className="text-yellow-400 font-medium">-8% Risk</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '8%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-cyan-400 text-lg font-bold">89%</div>
                        <div className="text-cyan-500 text-xs">Best Case</div>
                        <div className="text-cyan-600 text-xs mt-1">Probability</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-orange-400 text-lg font-bold">67%</div>
                        <div className="text-orange-500 text-xs">Base Case</div>
                        <div className="text-orange-600 text-xs mt-1">Probability</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Run Simulation
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Export Report
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Allocation Engine & Performance Prediction */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Dynamic Resource Allocation Engine */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Resource Allocation Engine</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-cyan-400">AI OPTIMIZATION</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Critical Infrastructure</span>
                        <span className="text-red-400 font-medium">45% Allocation</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full" style={{ width: '45%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Economic Development</span>
                        <span className="text-green-400 font-medium">28% Allocation</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Technology Innovation</span>
                        <span className="text-blue-400 font-medium">22% Allocation</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Defense & Security</span>
                        <span className="text-purple-400 font-medium">5% Allocation</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full" style={{ width: '5%' }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-green-400 text-lg font-bold">$4.7T</div>
                        <div className="text-green-500 text-xs">Total Budget</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-blue-400 text-lg font-bold">94.2%</div>
                        <div className="text-blue-500 text-xs">Utilization</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-purple-400 text-lg font-bold">AI</div>
                        <div className="text-purple-500 text-xs">Optimized</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance Prediction Charts */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <BarChart3 className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Performance Prediction</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">ML FORECASTING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { quarter: 'Q1', actual: 85, predicted: 87, confidence: 92 },
                            { quarter: 'Q2', actual: 88, predicted: 91, confidence: 89 },
                            { quarter: 'Q3', actual: 92, predicted: 95, confidence: 94 },
                            { quarter: 'Q4', actual: 89, predicted: 93, confidence: 91 },
                            { quarter: 'Q1\'', actual: null, predicted: 96, confidence: 88 },
                            { quarter: 'Q2\'', actual: null, predicted: 98, confidence: 86 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="quarter" stroke="#9CA3AF" fontSize={10} />
                          <YAxis stroke="#9CA3AF" fontSize={10} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#0a0e1a',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                          />
                          <RechartsBar dataKey="actual" fill="#10b981" name="Actual Performance" />
                          <RechartsBar dataKey="predicted" fill="#3b82f6" name="Predicted Performance" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Next Quarter Forecast</span>
                        <span className="text-blue-400 font-medium">96.2 ± 3.1</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Year-End Projection</span>
                        <span className="text-green-400 font-medium">98.7 ± 4.2</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Trend Direction</span>
                        <span className="text-green-400 font-medium">↗ Improving</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-green-400 text-lg font-bold">91%</div>
                        <div className="text-green-500 text-xs">Accuracy Rate</div>
                        <div className="text-green-600 text-xs mt-1">Last 12 months</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                        <div className="text-blue-400 text-lg font-bold">±2.3</div>
                        <div className="text-blue-500 text-xs">Confidence Interval</div>
                        <div className="text-blue-600 text-xs mt-1">Standard deviation</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Mitigation Planning & Trend Analysis */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Risk Mitigation Planning */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <ShieldCheck className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Risk Mitigation Planning</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-400">STRATEGIC ANALYSIS</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-900/20 border border-red-500/30 rounded-lg p-4">
                        <div className="text-red-400 font-medium text-sm mb-2">High Risk Factors</div>
                        <div className="text-red-300 text-xl font-bold">23</div>
                        <div className="text-red-500 text-xs">Identified Threats</div>
                        <div className="text-red-600 text-xs mt-1">Require Immediate Action</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-lg p-4">
                        <div className="text-green-400 font-medium text-sm mb-2">Mitigation Success</div>
                        <div className="text-green-300 text-xl font-bold">87%</div>
                        <div className="text-green-500 text-xs">Risk Reduction</div>
                        <div className="text-green-600 text-xs mt-1">Last 12 months</div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Geopolitical Instability</span>
                        <span className="text-red-400 font-medium">HIGH PRIORITY</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Cyber Threat Evolution</span>
                        <span className="text-orange-400 font-medium">MONITORING</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-slate-400">Economic Volatility</span>
                        <span className="text-yellow-400 font-medium">MEDIUM RISK</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button className="px-3 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Mitigation Plan
                      </button>
                      <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Risk Assessment
                      </button>
                    </div>
                  </div>
                </div>

                {/* Trend Analysis Dashboard */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <LineChartIcon className="w-6 h-6 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)] text-blue-400" />
                      <h2 className="text-xl font-bold text-white">Trend Analysis Dashboard</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-400">PREDICTIVE INSIGHTS</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { month: 'Jan', threats: 85, incidents: 45, mitigation: 78 },
                            { month: 'Feb', threats: 82, incidents: 42, mitigation: 81 },
                            { month: 'Mar', threats: 88, incidents: 48, mitigation: 79 },
                            { month: 'Apr', threats: 91, incidents: 51, mitigation: 83 },
                            { month: 'May', threats: 87, incidents: 46, mitigation: 86 },
                            { month: 'Jun', threats: 84, incidents: 43, mitigation: 89 }
                          ]}
                          margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                        >
                          <Area
                            type="monotone"
                            dataKey="threats"
                            stackId="1"
                            stroke="#f97316"
                            fill="url(#threatsGradient)"
                            name="Threat Level"
                          />
                          <Area
                            type="monotone"
                            dataKey="mitigation"
                            stackId="2"
                            stroke="#10b981"
                            fill="url(#mitigationGradient)"
                            name="Mitigation Effectiveness"
                          />
                          <defs>
                            <linearGradient id="threatsGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#f97316" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="mitigationGradient" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                            </linearGradient>
                          </defs>
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-red-400 text-lg font-bold">↗ 12%</div>
                        <div className="text-red-500 text-xs">Threat Trend</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-green-400 text-lg font-bold">↗ 15%</div>
                        <div className="text-green-500 text-xs">Mitigation</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-3">
                        <div className="text-blue-400 text-lg font-bold">↗ 8%</div>
                        <div className="text-blue-500 text-xs">Overall</div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Advanced Analytics
                      </button>
                      <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Export Trends
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default GlobalOperations;
