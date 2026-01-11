import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { emergencyAPI } from '../../lib/api.js';
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
  Shield,
  AlertTriangle,
  Users,
  Activity,
  Server,
  Settings,
  RefreshCw,
  Loader2,
  Eye,
  EyeOff,
  FileText,
  UserCheck,
  UserX,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Play,
  Pause,
  MapPin,
  Siren,
  Ambulance,
  PhoneCall,
  MessageCircle,
  Megaphone,
  Headphones,
  Mic,
  MicOff,
  Monitor,
  Laptop,
  Smartphone,
  Printer,
  Wifi,
  Bluetooth,
  Usb,
  Battery,
  Heart,
  Thermometer,
  Cloud,
  Sun,
  Moon,
  Star,
  Car,
  Plane,
  Truck,
  Target,
  Trophy,
  Award,
  Medal,
  Crown,
  Clock,
  Diamond,
  CreditCard,
  File,
  Folder,
  FileImage,
  FileVideo,
  Download,
  Upload,
  Save,
  Copy,
  TrendingDown,
  Briefcase,
  RefreshCw as UpdateIcon,
  Layers,
  Radio,
  MessageSquare,
  Lock,
  Zap,
  Brain,
  Search,
  BarChart3,
  TrendingUp,
  AlertOctagon,
  Crosshair,
  Globe,
  Database,
  Cpu,
  Network,
  Eye as EyeIcon,
  Zap as LightningIcon
} from 'lucide-react';

// 🚨 EMERGENCY COMMAND CENTER - SUPER ADMIN ONLY
// ADVANCED EMERGENCY RESPONSE COORDINATION & CRISIS MANAGEMENT
// GLOBAL EMERGENCY RESPONSE HUB

const EmergencyCommand = () => {
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
              This is an Emergency Command Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('emergency-overview');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [emergencyData, setEmergencyData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
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

  // Emergency Operations Categories
  const emergencyCategories = [
    {
      id: 'response',
      name: 'Emergency Response',
      icon: Siren,
      level: 'CRITICAL',
      score: 94,
      trend: 'increasing',
      description: 'Immediate incident response and containment',
      status: 'Active 24/7',
      color: 'red'
    },
    {
      id: 'coordination',
      name: 'Multi-Agency Coordination',
      icon: Users,
      level: 'HIGH',
      score: 87,
      trend: 'stable',
      description: 'Cross-agency emergency coordination',
      status: 'Coordinated Response',
      color: 'orange'
    },
    {
      id: 'logistics',
      name: 'Emergency Logistics',
      icon: Truck,
      level: 'MEDIUM',
      score: 76,
      trend: 'increasing',
      description: 'Resource deployment and supply chain',
      status: 'Optimized Routes',
      color: 'green'
    },
    {
      id: 'communication',
      name: 'Crisis Communication',
      icon: Megaphone,
      level: 'HIGH',
      score: 82,
      trend: 'stable',
      description: 'Public communication and alerts',
      status: 'Broadcast Active',
      color: 'blue'
    },
    {
      id: 'recovery',
      name: 'Recovery Operations',
      icon: Heart,
      level: 'MEDIUM',
      score: 71,
      trend: 'stable',
      description: 'Post-incident recovery and support',
      status: 'Recovery Phase',
      color: 'purple'
    },
    {
      id: 'prevention',
      name: 'Prevention & Preparedness',
      icon: Shield,
      level: 'LOW',
      score: 68,
      trend: 'increasing',
      description: 'Risk assessment and prevention',
      status: 'Monitoring Active',
      color: 'cyan'
    }
  ];

  // 📊 MAIN EMERGENCY COMMAND CENTER INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-900 via-crimson-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Emergency Alert Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-red-500/40 to-crimson-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-crimson-600/35 to-scarlet-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-scarlet-400/30 to-emerald-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        {/* Emergency Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-crimson-600 to-scarlet-600 rounded-xl flex items-center justify-center shadow-2xl shadow-red-500/30">
                <Siren className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-300 via-crimson-300 via-scarlet-200 to-orange-200 bg-clip-text text-transparent drop-shadow-sm">
                Emergency Command Center
              </h1>
              <p className="text-red-200/80 text-sm font-medium">Advanced Emergency Response Coordination & Crisis Management Hub</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-crimson-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">Emergency Coordination Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Ambulance className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-xs text-slate-300">247 Emergency Assets</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-crimson-400 animate-pulse" />
                  <span className="text-xs text-slate-300">156 Response Teams</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />
                  <span className="text-xs text-slate-300">EMERGENCY</span>
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
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-red-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Emergency Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Emergency Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'emergency-overview', label: 'Emergency Overview', icon: Siren },
            { id: 'crisis-response', label: 'Crisis Response', icon: AlertTriangle },
            { id: 'emergency-intelligence', label: 'Emergency Intelligence', icon: Shield },
            { id: 'recovery-operations', label: 'Recovery Operations', icon: Heart },
            { id: 'emergency-planning', label: 'Emergency Planning', icon: Target }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${activeSection === section.id
                  ? 'bg-gradient-to-r from-red-500/20 to-crimson-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10'
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
          {activeSection === 'emergency-overview' && (
            <motion.div
              key="emergency-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Emergency Response Analytics Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Emergency Response Performance */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Activity className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Response Performance</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-red-400">CRITICAL</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                          data={[
                            { time: '00:00', incidents: 12, responses: 8, resolved: 6 },
                            { time: '06:00', incidents: 15, responses: 11, resolved: 9 },
                            { time: '12:00', incidents: 18, responses: 14, resolved: 12 },
                            { time: '18:00', incidents: 16, responses: 13, resolved: 11 },
                            { time: '24:00', incidents: 14, responses: 10, resolved: 8 }
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
                            dataKey="incidents"
                            stroke="#dc2626"
                            strokeWidth={2}
                            name="Active Incidents"
                            dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
                          />
                          <RechartsLine
                            type="monotone"
                            dataKey="responses"
                            stroke="#ea580c"
                            strokeWidth={2}
                            name="Response Teams"
                            dot={{ fill: '#ea580c', strokeWidth: 2, r: 4 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div className="bg-red-500/10 rounded-lg p-2">
                        <div className="text-red-400 text-lg font-bold">14</div>
                        <div className="text-red-500 text-xs">Incidents</div>
                      </div>
                      <div className="bg-orange-500/10 rounded-lg p-2">
                        <div className="text-orange-400 text-lg font-bold">11</div>
                        <div className="text-orange-500 text-xs">Responses</div>
                      </div>
                      <div className="bg-green-500/10 rounded-lg p-2">
                        <div className="text-green-400 text-lg font-bold">9</div>
                        <div className="text-green-500 text-xs">Resolved</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Resource Allocation */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Resource Allocation</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">OPTIMIZED</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/30 rounded-lg p-3 text-center">
                        <div className="text-red-400 font-bold text-lg">156</div>
                        <div className="text-red-500 text-xs">Response Teams</div>
                        <div className="text-red-600 text-xs mt-1">+8% deployed</div>
                      </div>
                      <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/30 rounded-lg p-3 text-center">
                        <div className="text-green-400 font-bold text-lg">247</div>
                        <div className="text-green-500 text-xs">Emergency Assets</div>
                        <div className="text-green-600 text-xs mt-1">+12% active</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Medical Resources</span>
                        <span className="text-green-400 font-medium">94.7%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Logistics Support</span>
                        <span className="text-blue-400 font-medium">87.3%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Communication Hubs</span>
                        <span className="text-purple-400 font-medium">91.2%</span>
                      </div>
                    </div>

                    <button className="w-full px-4 py-2 bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      Deploy Emergency Resources
                    </button>
                  </div>
                </div>

                {/* Crisis Severity Assessment */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Crisis Assessment</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                      <span className="text-xs text-orange-400">HIGH ALERT</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            { subject: 'Impact', A: 85, fullMark: 100 },
                            { subject: 'Urgency', A: 92, fullMark: 100 },
                            { subject: 'Resources', A: 78, fullMark: 100 },
                            { subject: 'Coordination', A: 88, fullMark: 100 },
                            { subject: 'Communication', A: 82, fullMark: 100 },
                            { subject: 'Recovery', A: 95, fullMark: 100 }
                          ]}
                        >
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                          <Radar
                            name="Severity Level"
                            dataKey="A"
                            stroke="#dc2626"
                            fill="#dc2626"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Overall Risk Score</span>
                        <span className="text-red-400 font-medium">78/100</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Trend</span>
                        <span className="text-red-400 font-medium">↑ Escalating</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Update</span>
                        <span className="text-blue-400 font-medium">2 min ago</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Emergency Communication Status */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Megaphone className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Communication Status</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                      <span className="text-xs text-blue-400">BROADCASTING</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Emergency Alert System</span>
                        <span className="text-green-400 font-medium">ACTIVE</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Multi-Agency Network</span>
                        <span className="text-green-400 font-medium">CONNECTED</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-400 text-sm">Public Broadcast</span>
                        <span className="text-yellow-400 font-medium">STANDBY</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-2 border-t border-slate-700/50">
                      <span className="text-slate-400 text-sm">Communication Uptime</span>
                      <span className="text-green-400 font-bold text-lg">99.8%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Operations Timeline & Resource Deployment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emergency Operations Timeline */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Clock className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Emergency Timeline</h2>
                    </div>
                    <select className="bg-slate-800/60 border border-slate-600/30 rounded-lg px-3 py-1 text-sm text-slate-300 focus:outline-none focus:border-red-500/50">
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
                          { time: '00:00', incidents: 12, responses: 8, recoveries: 6 },
                          { time: '06:00', incidents: 15, responses: 11, recoveries: 9 },
                          { time: '12:00', incidents: 18, responses: 14, recoveries: 12 },
                          { time: '18:00', incidents: 16, responses: 13, recoveries: 11 },
                          { time: '24:00', incidents: 14, responses: 10, recoveries: 8 }
                        ]}
                        margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                      >
                        <defs>
                          <linearGradient id="incidentsGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                          </linearGradient>
                          <linearGradient id="responsesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ea580c" stopOpacity={0.1}/>
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
                          dataKey="incidents"
                          stackId="1"
                          stroke="#dc2626"
                          fill="url(#incidentsGradient)"
                          name="Active Incidents"
                        />
                        <Area
                          type="monotone"
                          dataKey="responses"
                          stackId="2"
                          stroke="#ea580c"
                          fill="url(#responsesGradient)"
                          name="Response Actions"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Emergency Resource Deployment */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Ambulance className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Resource Deployment</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      <span className="text-xs text-green-400">ACTIVE</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-32">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            { subject: 'Medical', A: 85, B: 78, fullMark: 100 },
                            { subject: 'Fire/Rescue', A: 92, B: 88, fullMark: 100 },
                            { subject: 'Police', A: 78, B: 82, fullMark: 100 },
                            { subject: 'Logistics', A: 88, B: 85, fullMark: 100 },
                            { subject: 'Communication', A: 82, B: 79, fullMark: 100 },
                            { subject: 'Recovery', A: 95, B: 91, fullMark: 100 }
                          ]}
                        >
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                          <Radar
                            name="Current Deployment"
                            dataKey="A"
                            stroke="#dc2626"
                            fill="#dc2626"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                          <Radar
                            name="Required Resources"
                            dataKey="B"
                            stroke="#059669"
                            fill="#059669"
                            fillOpacity={0.1}
                            strokeWidth={2}
                          />
                          <RechartsLegend />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-center">
                        <div className="text-green-400 font-bold text-lg">87%</div>
                        <div className="text-green-500 text-xs">Resources Deployed</div>
                        <div className="text-green-600 text-xs mt-1">-5% from optimal</div>
                      </div>
                      <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-center">
                        <div className="text-blue-400 font-bold text-lg">13 min</div>
                        <div className="text-blue-500 text-xs">Avg Response Time</div>
                        <div className="text-blue-600 text-xs mt-1">-2 min improvement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Asset Tracker & Response Categories */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emergency Asset Tracker */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Emergency Asset Tracker</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-bold border bg-green-500/20 text-green-400 border-green-500/40">
                      247 ASSETS ACTIVE
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { asset: 'Medical Teams', count: 23, active: 18, transit: 3, standby: 2, region: 'Global' },
                      { asset: 'Emergency Vehicles', count: 45, active: 35, transit: 5, standby: 5, region: 'Urban' },
                      { asset: 'Supply Convoys', count: 67, active: 52, transit: 8, standby: 7, region: 'Regional' },
                      { asset: 'Communication Hubs', count: 34, active: 28, transit: 4, standby: 2, region: 'National' },
                      { asset: 'Search & Rescue', count: 41, active: 31, transit: 6, standby: 4, region: 'Local' },
                      { asset: 'Shelter Facilities', count: 37, active: 29, transit: 4, standby: 4, region: 'Regional' }
                    ].map((deployment, index) => (
                      <motion.div
                        key={deployment.asset}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50 hover:border-red-500/30 transition-all duration-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium text-sm">{deployment.asset}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${deployment.region === 'Global' ? 'bg-red-500/20 text-red-400' : deployment.region === 'Urban' ? 'bg-orange-500/20 text-orange-400' : deployment.region === 'Regional' ? 'bg-yellow-500/20 text-yellow-400' : deployment.region === 'National' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
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

                {/* Emergency Response Categories */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                    <div className="flex items-center space-x-3">
                      <Layers className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Emergency Categories</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-bold border bg-red-500/20 text-red-400 border-red-500/40">
                      MONITORING
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {emergencyCategories.map((category) => {
                      const Icon = category.icon;
                      return (
                        <motion.div
                          key={category.id}
                          whileHover={{ scale: 1.02 }}
                          className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${selectedIncident === category.id ? 'border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(220,38,38,0.3)]' : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'}`}
                          onClick={() => setSelectedIncident(selectedIncident === category.id ? null : category.id)}
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(220,38,38,0.4)]`} />
                            <div className="flex-1">
                              <h4 className="text-white font-semibold text-sm">{category.name}</h4>
                              <div className={`text-xs ${category.level === 'CRITICAL' ? 'text-red-400' : category.level === 'HIGH' ? 'text-orange-400' : category.level === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>
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
                              <span className={`font-medium ${category.trend === 'increasing' ? 'text-green-400' : category.trend === 'stable' ? 'text-yellow-400' : 'text-blue-400'}`}>
                                {category.status}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Real-time Emergency Alerts & Communication Hub */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Emergency Alerts */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                    <div className="flex items-center space-x-3">
                      <Radio className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Real-time Emergency Alerts</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-bold border bg-red-500/20 text-red-400 border-red-500/40">
                      LIVE ALERTS
                    </span>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {[
                      { id: 1, type: 'critical', title: 'Major Incident Alert', message: 'Category 5 emergency declared in metropolitan area - full response mobilization required', time: '2 minutes ago', severity: 'critical', location: 'Downtown District' },
                      { id: 2, type: 'warning', title: 'Infrastructure Failure', message: 'Critical infrastructure compromise detected - emergency protocols activated', time: '8 minutes ago', severity: 'high', location: 'Industrial Zone' },
                      { id: 3, type: 'info', title: 'Response Team Deployment', message: 'Emergency response teams successfully deployed to incident site', time: '15 minutes ago', severity: 'medium', location: 'Residential Area' },
                      { id: 4, type: 'success', title: 'Crisis Containment', message: 'Initial containment measures successful - situation stabilizing', time: '23 minutes ago', severity: 'low', location: 'Commercial District' },
                      { id: 5, type: 'critical', title: 'Multi-Agency Coordination', message: 'Federal emergency response teams en route - coordination channels established', time: '31 minutes ago', severity: 'critical', location: 'Metropolitan Area' }
                    ].map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-3 rounded-lg border ${alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' : alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' : alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-green-500/10 border-green-500/30'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-red-400' : alert.severity === 'high' ? 'bg-orange-400' : alert.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`} />
                            <div>
                              <div className="text-white font-medium text-sm">{alert.title}</div>
                              <div className="text-slate-400 text-xs">{alert.message}</div>
                              <div className="text-red-400 text-xs mt-1">📍 {alert.location}</div>
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
                </div>

                {/* Emergency Communication Hub */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="w-6 h-6 drop-shadow-[0_0_8px_rgba(220,38,38,0.6)] text-red-400" />
                      <h2 className="text-xl font-bold text-white">Emergency Communication Hub</h2>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-bold border bg-blue-500/20 text-blue-400 border-blue-500/40">
                      SECURE CHANNELS
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">National Emergency Network</span>
                          <span className="text-green-400 text-xs">SECURE</span>
                        </div>
                        <div className="text-xs text-slate-400">Encrypted communication channel</div>
                        <div className="text-green-400 text-xs mt-1">Last activity: 30s ago</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">Regional Command Center</span>
                          <span className="text-green-400 text-xs">ACTIVE</span>
                        </div>
                        <div className="text-xs text-slate-400">Multi-agency coordination</div>
                        <div className="text-blue-400 text-xs mt-1">12 participants online</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">Public Alert System</span>
                          <span className="text-yellow-400 text-xs">STANDBY</span>
                        </div>
                        <div className="text-xs text-slate-400">Mass notification ready</div>
                        <div className="text-yellow-400 text-xs mt-1">Ready for activation</div>
                      </div>
                      <div className="p-3 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-slate-300 text-sm">International Support</span>
                          <span className="text-blue-400 text-xs">CONNECTED</span>
                        </div>
                        <div className="text-xs text-slate-400">Global assistance coordination</div>
                        <div className="text-purple-400 text-xs mt-1">8 countries linked</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Emergency Broadcast
                      </button>
                      <button className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-xs">
                        Open Chat
                      </button>
                    </div>

                    <div className="bg-slate-800/50 rounded-lg p-3">
                      <div className="text-white text-sm font-medium mb-2">Quick Actions</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30 transition-colors">
                          Send Update
                        </button>
                        <button className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30 transition-colors">
                          Request Support
                        </button>
                        <button className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs hover:bg-orange-500/30 transition-colors">
                          Alert Teams
                        </button>
                        <button className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs hover:bg-purple-500/30 transition-colors">
                          Status Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Additional emergency sections would be implemented here */}
          {activeSection === 'crisis-response' && (
            <motion.div
              key="crisis-response"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Active Incident Dashboard */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
                    <div>
                      <h2 className="text-2xl font-bold text-white">Active Incident Dashboard</h2>
                      <p className="text-slate-400">Real-time incident tracking and response coordination</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold border border-red-500/30">
                      12 ACTIVE INCIDENTS
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-crimson-600 hover:from-red-700 hover:to-crimson-700 text-white font-semibold rounded-lg transition-all duration-300">
                      New Incident Report
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { id: 'INC-2024-001', title: 'Cyber Attack Vector', severity: 'CRITICAL', status: 'Active Response', location: 'Data Center A', teams: 8, progress: 65 },
                    { id: 'INC-2024-002', title: 'Network Breach', severity: 'HIGH', status: 'Investigation', location: 'Branch Office', teams: 5, progress: 30 },
                    { id: 'INC-2024-003', title: 'Data Exfiltration', severity: 'CRITICAL', status: 'Containment', location: 'Cloud Services', teams: 12, progress: 80 },
                    { id: 'INC-2024-004', title: 'System Compromise', severity: 'MEDIUM', status: 'Resolution', location: 'Remote Sites', teams: 3, progress: 95 }
                  ].map((incident) => (
                    <motion.div
                      key={incident.id}
                      whileHover={{ scale: 1.02 }}
                      className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 hover:border-red-500/30 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' : incident.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {incident.severity}
                        </span>
                        <span className="text-xs text-slate-400">{incident.id}</span>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-2">{incident.title}</h4>
                      <div className="space-y-1 text-xs text-slate-400 mb-3">
                        <div>📍 {incident.location}</div>
                        <div>👥 {incident.teams} Response Teams</div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className="text-white">{incident.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${incident.severity === 'CRITICAL' ? 'bg-gradient-to-r from-red-500 to-red-600' : incident.severity === 'HIGH' ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'}`}
                            style={{ width: `${incident.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-green-400">{incident.status}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Response Team Coordination & Action Timeline */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Response Team Coordination */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Users className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Response Team Coordination</h3>
                        <p className="text-slate-400 text-sm">Live deployment status and assignments</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                      156 TEAMS ACTIVE
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { name: 'Cyber Incident Response Team Alpha', status: 'Deployed', location: 'Data Center A', members: 12, lead: 'Cmdr. Sarah Chen', eta: 'On Site' },
                      { name: 'Network Defense Squad', status: 'En Route', location: 'Branch Office', members: 8, lead: 'Lt. Mike Rodriguez', eta: '5 min' },
                      { name: 'Digital Forensics Unit', status: 'Standby', location: 'HQ Lab', members: 6, lead: 'Dr. Emily Watson', eta: 'Ready' },
                      { name: 'Emergency Recovery Team', status: 'Active', location: 'Cloud Services', members: 15, lead: 'Maj. David Park', eta: 'Ongoing' }
                    ].map((team) => (
                      <div key={team.name} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold text-sm">{team.name}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${team.status === 'Deployed' ? 'bg-green-500/20 text-green-400' : team.status === 'En Route' ? 'bg-blue-500/20 text-blue-400' : team.status === 'Standby' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-purple-500/20 text-purple-400'}`}>
                            {team.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-3">
                          <div>📍 {team.location}</div>
                          <div>👥 {team.members} members</div>
                          <div>👨‍💼 {team.lead}</div>
                          <div>⏱️ ETA: {team.eta}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30 transition-colors">
                            Contact Team
                          </button>
                          <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30 transition-colors">
                            Update Status
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Timeline */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Clock className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Action Timeline</h3>
                        <p className="text-slate-400 text-sm">Chronological response log</p>
                      </div>
                    </div>
                    <select className="bg-slate-800/60 border border-slate-600/30 rounded-lg px-3 py-1 text-sm text-slate-300 focus:outline-none focus:border-red-500/50">
                      <option>Last 24 Hours</option>
                      <option>Last 7 Days</option>
                      <option>All Time</option>
                    </select>
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {[
                      { time: '14:32:15', action: 'Incident Detected', details: 'Automated alert triggered for unauthorized access attempt', team: 'SOC Team', status: 'completed' },
                      { time: '14:35:22', action: 'Initial Assessment', details: 'Security team began investigation of breach vector', team: 'Cyber Response', status: 'completed' },
                      { time: '14:38:45', action: 'Containment Protocol', details: 'Network segmentation initiated to isolate affected systems', team: 'Network Defense', status: 'in-progress' },
                      { time: '14:42:10', action: 'Evidence Collection', details: 'Digital forensics team deployed for data preservation', team: 'Forensics Unit', status: 'in-progress' },
                      { time: '14:45:33', action: 'Communication Alert', details: 'Stakeholders notified of security incident', team: 'Crisis Comm', status: 'completed' },
                      { time: '14:48:17', action: 'Resource Deployment', details: 'Additional response teams mobilized to incident site', team: 'Operations', status: 'completed' }
                    ].map((entry, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${entry.status === 'completed' ? 'bg-green-400' : entry.status === 'in-progress' ? 'bg-blue-400 animate-pulse' : 'bg-yellow-400'}`} />
                          {index < 5 && <div className="w-0.5 h-8 bg-slate-700 mt-1"></div>}
                        </div>
                        <div className="flex-1 bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-medium text-sm">{entry.action}</span>
                            <span className="text-slate-400 text-xs">{entry.time}</span>
                          </div>
                          <p className="text-slate-400 text-xs mb-2">{entry.details}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-blue-400 text-xs">👥 {entry.team}</span>
                            <span className={`text-xs px-2 py-1 rounded ${entry.status === 'completed' ? 'bg-green-500/20 text-green-400' : entry.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {entry.status.replace('-', ' ').toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Resource Allocation Monitor & Containment Progress */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resource Allocation Monitor */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Server className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Resource Allocation Monitor</h3>
                        <p className="text-slate-400 text-sm">Emergency assets and personnel tracking</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                      89% UTILIZED
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { resource: 'Emergency Personnel', allocated: 156, total: 200, utilization: 78, status: 'High Demand' },
                      { resource: 'Medical Equipment', allocated: 45, total: 60, utilization: 75, status: 'Adequate' },
                      { resource: 'Communication Assets', allocated: 28, total: 35, utilization: 80, status: 'High Usage' },
                      { resource: 'Transport Vehicles', allocated: 22, total: 30, utilization: 73, status: 'Adequate' },
                      { resource: 'Technical Equipment', allocated: 67, total: 80, utilization: 84, status: 'Critical' }
                    ].map((resource) => (
                      <div key={resource.resource} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold text-sm">{resource.resource}</h4>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${resource.status === 'Critical' ? 'bg-red-500/20 text-red-400' : resource.status === 'High Demand' ? 'bg-orange-500/20 text-orange-400' : resource.status === 'High Usage' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                            {resource.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-3">
                          <div>Allocated: {resource.allocated}/{resource.total}</div>
                          <div>Utilization: {resource.utilization}%</div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${resource.utilization > 80 ? 'bg-gradient-to-r from-red-500 to-red-600' : resource.utilization > 70 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`}
                            style={{ width: `${resource.utilization}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Containment Progress */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Shield className="w-8 h-8 text-cyan-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Containment Progress</h3>
                        <p className="text-slate-400 text-sm">Incident containment and recovery phases</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold border border-blue-500/30">
                      PHASE 3: RECOVERY
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Containment Phases */}
                    {[
                      { phase: 'Detection & Alert', progress: 100, status: 'Completed', duration: '2 min' },
                      { phase: 'Initial Assessment', progress: 100, status: 'Completed', duration: '15 min' },
                      { phase: 'Containment', progress: 85, status: 'In Progress', duration: '45 min' },
                      { phase: 'Eradication', progress: 60, status: 'In Progress', duration: '120 min' },
                      { phase: 'Recovery', progress: 25, status: 'Initiated', duration: '240 min' },
                      { phase: 'Lessons Learned', progress: 0, status: 'Pending', duration: 'TBD' }
                    ].map((phase, index) => (
                      <div key={phase.phase} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium">{phase.phase}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`text-xs px-2 py-1 rounded ${phase.status === 'Completed' ? 'bg-green-500/20 text-green-400' : phase.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : phase.status === 'Initiated' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'}`}>
                              {phase.status}
                            </span>
                            <span className="text-slate-400 text-xs">{phase.duration}</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${phase.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-green-600' : phase.status === 'In Progress' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : phase.status === 'Initiated' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-slate-500 to-slate-600'}`}
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}

                    {/* Overall Progress */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-white font-semibold text-sm">Overall Incident Resolution</span>
                        <span className="text-blue-400 text-sm font-bold">58% Complete</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-3 mb-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500" style={{ width: '58%' }}></div>
                      </div>
                      <div className="text-xs text-slate-400">Estimated completion: 3 hours 45 minutes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Protocols */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <FileText className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Emergency Protocols</h3>
                      <p className="text-slate-400 text-sm">Standardized response checklists and procedures</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                      12 ACTIVE PROTOCOLS
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      Activate Protocol
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Cyber Attack Response Protocol', category: 'Cybersecurity', status: 'Active', completion: 75, priority: 'Critical' },
                    { name: 'Data Breach Containment', category: 'Data Security', status: 'Active', completion: 60, priority: 'High' },
                    { name: 'Network Isolation Procedure', category: 'Infrastructure', status: 'Completed', completion: 100, priority: 'Critical' },
                    { name: 'Stakeholder Communication Plan', category: 'Communication', status: 'In Progress', completion: 40, priority: 'High' },
                    { name: 'Evidence Preservation Protocol', category: 'Forensics', status: 'Active', completion: 85, priority: 'High' },
                    { name: 'Business Continuity Plan', category: 'Operations', status: 'Standby', completion: 0, priority: 'Medium' }
                  ].map((protocol) => (
                    <div key={protocol.name} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${protocol.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : protocol.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {protocol.priority}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${protocol.status === 'Active' ? 'bg-green-500/20 text-green-400' : protocol.status === 'Completed' ? 'bg-blue-500/20 text-blue-400' : protocol.status === 'In Progress' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'}`}>
                          {protocol.status}
                        </span>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-2">{protocol.name}</h4>
                      <div className="text-xs text-slate-400 mb-3">{protocol.category}</div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Completion</span>
                          <span className="text-white">{protocol.completion}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${protocol.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-green-600' : protocol.status === 'Active' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : protocol.status === 'In Progress' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-slate-500 to-slate-600'}`}
                            style={{ width: `${protocol.completion}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'emergency-intelligence' && (
            <motion.div
              key="emergency-intelligence"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Real-time Threat Feeds & AI Risk Assessment */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Real-time Threat Feeds */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Radio className="w-8 h-8 text-red-400 animate-pulse" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Real-time Threat Feeds</h3>
                        <p className="text-slate-400 text-sm">Live intelligence from multiple sources</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold border border-red-500/30">
                        47 ACTIVE FEEDS
                      </div>
                      <button className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                        Add Feed
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { source: 'Dark Web Intelligence', threat: 'Ransomware Campaign Targeting Healthcare', risk: 'Critical', confidence: 92, time: '2 min ago', category: 'Cyber Attack' },
                      { source: 'Government Intelligence', threat: 'Coordinated DDoS Attack Planning', risk: 'High', confidence: 87, time: '5 min ago', category: 'Network Attack' },
                      { source: 'Industry Partners', threat: 'Zero-day Vulnerability Discovered', risk: 'High', confidence: 94, time: '8 min ago', category: 'Vulnerability' },
                      { source: 'Open Source Intelligence', threat: 'Malware Distribution Network', risk: 'Medium', confidence: 76, time: '12 min ago', category: 'Malware' },
                      { source: 'Social Media Monitoring', threat: 'Insider Threat Indicators', risk: 'Medium', confidence: 68, time: '18 min ago', category: 'Insider Threat' },
                      { source: 'Honeypot Network', threat: 'Advanced Persistent Threat Activity', risk: 'Critical', confidence: 89, time: '25 min ago', category: 'APT' }
                    ].map((feed, index) => (
                      <motion.div
                        key={feed.source}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        className={`p-4 rounded-lg border ${feed.risk === 'Critical' ? 'bg-red-500/10 border-red-500/30' : feed.risk === 'High' ? 'bg-orange-500/10 border-orange-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${feed.risk === 'Critical' ? 'bg-red-400 animate-pulse' : feed.risk === 'High' ? 'bg-orange-400' : 'bg-yellow-400'}`} />
                            <span className="text-white font-semibold text-sm">{feed.source}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${feed.risk === 'Critical' ? 'bg-red-500/20 text-red-400' : feed.risk === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {feed.risk}
                            </span>
                            <span className="text-slate-400 text-xs">{feed.time}</span>
                          </div>
                        </div>
                        <p className="text-slate-300 text-sm mb-3">{feed.threat}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-blue-400 text-xs">📊 {feed.category}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-slate-400 text-xs">Confidence:</span>
                            <span className="text-green-400 text-xs font-bold">{feed.confidence}%</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Risk Assessment Engine */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Brain className="w-8 h-8 text-purple-400 animate-pulse" />
                      <div>
                        <h3 className="text-xl font-bold text-white">AI Risk Assessment Engine</h3>
                        <p className="text-slate-400 text-sm">Machine learning-powered threat evaluation</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold border border-purple-500/30">
                      AI ACTIVE
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Risk Assessment Chart */}
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <RadarChart
                          data={[
                            { subject: 'Likelihood', A: 85, fullMark: 100 },
                            { subject: 'Impact', A: 92, fullMark: 100 },
                            { subject: 'Velocity', A: 78, fullMark: 100 },
                            { subject: 'Sophistication', A: 88, fullMark: 100 },
                            { subject: 'Persistence', A: 82, fullMark: 100 },
                            { subject: 'Adaptability', A: 95, fullMark: 100 }
                          ]}
                        >
                          <PolarGrid stroke="#374151" />
                          <PolarAngleAxis dataKey="subject" tick={{ fill: '#9CA3AF', fontSize: 10 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9CA3AF', fontSize: 8 }} />
                          <Radar
                            name="Current Threat Assessment"
                            dataKey="A"
                            stroke="#dc2626"
                            fill="#dc2626"
                            fillOpacity={0.3}
                            strokeWidth={2}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* AI Assessment Results */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-red-400 text-2xl font-bold mb-1">87</div>
                          <div className="text-slate-400 text-xs">Overall Risk Score</div>
                          <div className="text-red-500 text-xs mt-1">↑ Increasing</div>
                        </div>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-green-400 text-2xl font-bold mb-1">94%</div>
                          <div className="text-slate-400 text-xs">AI Confidence</div>
                          <div className="text-green-500 text-xs mt-1">High Accuracy</div>
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">AI Recommendations</h4>
                      {[
                        { priority: 'Critical', action: 'Immediate network isolation for affected segments', confidence: 96 },
                        { priority: 'High', action: 'Deploy enhanced endpoint protection', confidence: 89 },
                        { priority: 'Medium', action: 'Increase monitoring on critical assets', confidence: 78 }
                      ].map((rec, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${rec.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : rec.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {rec.priority}
                            </span>
                            <span className="text-green-400 text-xs">{rec.confidence}% confidence</span>
                          </div>
                          <p className="text-slate-300 text-sm">{rec.action}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Predictive Analytics Dashboard & Threat Pattern Recognition */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Predictive Analytics Dashboard */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <TrendingUp className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Predictive Analytics Dashboard</h3>
                        <p className="text-slate-400 text-sm">Forward-looking threat predictions and trends</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold border border-blue-500/30">
                      24H PREDICTION
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Prediction Timeline */}
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={[
                            { time: 'Now', risk: 45, predicted: 67 },
                            { time: '+2h', risk: 52, predicted: 71 },
                            { time: '+4h', risk: 48, predicted: 69 },
                            { time: '+6h', risk: 61, predicted: 78 },
                            { time: '+8h', risk: 55, predicted: 73 },
                            { time: '+12h', risk: 67, predicted: 82 },
                            { time: '+18h', risk: 59, predicted: 76 },
                            { time: '+24h', risk: 72, predicted: 88 }
                          ]}
                          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        >
                          <defs>
                            <linearGradient id="currentRisk" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                            </linearGradient>
                            <linearGradient id="predictedRisk" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#ea580c" stopOpacity={0.1}/>
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
                            dataKey="risk"
                            stackId="1"
                            stroke="#dc2626"
                            fill="url(#currentRisk)"
                            name="Current Risk"
                          />
                          <Area
                            type="monotone"
                            dataKey="predicted"
                            stackId="2"
                            stroke="#ea580c"
                            fill="url(#predictedRisk)"
                            name="Predicted Risk"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Prediction Alerts */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Predicted Threats (Next 24h)</h4>
                      {[
                        { threat: 'Ransomware Attack Surge', probability: 78, time: '6-12 hours', impact: 'High' },
                        { threat: 'DDoS Campaign', probability: 65, time: '12-18 hours', impact: 'Medium' },
                        { threat: 'Data Exfiltration Attempt', probability: 82, time: '18-24 hours', impact: 'Critical' }
                      ].map((prediction, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{prediction.threat}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${prediction.impact === 'Critical' ? 'bg-red-500/20 text-red-400' : prediction.impact === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {prediction.impact}
                              </span>
                              <span className="text-slate-400 text-xs">{prediction.probability}%</span>
                            </div>
                          </div>
                          <div className="text-slate-400 text-xs">Expected: {prediction.time}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Threat Pattern Recognition */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Search className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Threat Pattern Recognition</h3>
                        <p className="text-slate-400 text-sm">Automated correlation of threat indicators</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                      ANALYZING
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Pattern Correlation Matrix */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { pattern: 'APT Group Activity', indicators: 12, correlation: 94 },
                        { pattern: 'Ransomware Behavior', indicators: 8, correlation: 87 },
                        { pattern: 'Insider Threat', indicators: 6, correlation: 76 },
                        { pattern: 'Supply Chain Attack', indicators: 15, correlation: 91 },
                        { pattern: 'Zero-day Exploitation', indicators: 4, correlation: 82 },
                        { pattern: 'Command & Control', indicators: 9, correlation: 89 }
                      ].map((pattern, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-green-400 text-lg font-bold">{pattern.correlation}%</div>
                          <div className="text-slate-400 text-xs">{pattern.pattern}</div>
                          <div className="text-blue-400 text-xs mt-1">{pattern.indicators} indicators</div>
                        </div>
                      ))}
                    </div>

                    {/* Detected Patterns */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Recently Detected Patterns</h4>
                      {[
                        { pattern: 'Coordinated Attack Campaign', confidence: 96, severity: 'Critical', matched: 18 },
                        { pattern: 'Living-off-the-land Techniques', confidence: 89, severity: 'High', matched: 12 },
                        { pattern: 'Advanced Evasion Methods', confidence: 84, severity: 'High', matched: 9 }
                      ].map((detected, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{detected.pattern}</span>
                            <span className="text-green-400 text-xs">{detected.confidence}% confidence</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded text-xs ${detected.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'}`}>
                              {detected.severity}
                            </span>
                            <span className="text-blue-400 text-xs">{detected.matched} indicators matched</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Intelligence Fusion Center & Decision Intelligence Tools */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Intelligence Fusion Center */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Database className="w-8 h-8 text-cyan-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Intelligence Fusion Center</h3>
                        <p className="text-slate-400 text-sm">Multi-source intelligence aggregation</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold border border-cyan-500/30">
                      FUSING DATA
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Intelligence Sources */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { source: 'Human Intelligence', data: '247 reports', quality: 92, status: 'Active' },
                        { source: 'Signals Intelligence', data: '1.2M signals', quality: 87, status: 'Active' },
                        { source: 'Open Source', data: '89K articles', quality: 76, status: 'Active' },
                        { source: 'Technical Intelligence', data: '456 scans', quality: 94, status: 'Active' }
                      ].map((intel, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{intel.source}</span>
                            <span className={`px-2 py-1 rounded text-xs ${intel.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-slate-500/20 text-slate-400'}`}>
                              {intel.status}
                            </span>
                          </div>
                          <div className="text-blue-400 text-xs mb-1">{intel.data}</div>
                          <div className="text-green-400 text-xs">Quality: {intel.quality}%</div>
                        </div>
                      ))}
                    </div>

                    {/* Fusion Results */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Intelligence Fusion Results</h4>
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-white font-medium">Global Threat Assessment</span>
                          <span className="text-red-400 font-bold">THREAT LEVEL: HIGH</span>
                        </div>
                        <div className="space-y-2 text-sm text-slate-400">
                          <div>• 12 new threat actors identified</div>
                          <div>• 8 attack vectors correlated</div>
                          <div>• 23 vulnerabilities prioritized</div>
                          <div>• 5 critical infrastructure targets confirmed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decision Intelligence Tools */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Crosshair className="w-8 h-8 text-orange-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Decision Intelligence Tools</h3>
                        <p className="text-slate-400 text-sm">AI-assisted decision making with confidence scores</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold border border-orange-500/30">
                      ANALYZING
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Decision Options */}
                    <div className="space-y-4">
                      {[
                        { option: 'Full Network Isolation', recommendation: 'Strongly Recommended', confidence: 94, impact: 'High', risk: 'Low' },
                        { option: 'Targeted Containment', recommendation: 'Recommended', confidence: 87, impact: 'Medium', risk: 'Medium' },
                        { option: 'Enhanced Monitoring', recommendation: 'Consider', confidence: 72, impact: 'Low', risk: 'High' },
                        { option: 'Business Continuity Focus', recommendation: 'Not Recommended', confidence: 45, impact: 'Low', risk: 'Critical' }
                      ].map((decision, index) => (
                        <div key={index} className={`border rounded-lg p-4 ${decision.recommendation === 'Strongly Recommended' ? 'bg-green-500/10 border-green-500/30' : decision.recommendation === 'Recommended' ? 'bg-blue-500/10 border-blue-500/30' : decision.recommendation === 'Consider' ? 'bg-yellow-500/10 border-yellow-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{decision.option}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs font-bold ${decision.recommendation === 'Strongly Recommended' ? 'bg-green-500/20 text-green-400' : decision.recommendation === 'Recommended' ? 'bg-blue-500/20 text-blue-400' : decision.recommendation === 'Consider' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                                {decision.recommendation}
                              </span>
                              <span className="text-green-400 text-xs">{decision.confidence}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Impact: <span className={decision.impact === 'High' ? 'text-red-400' : decision.impact === 'Medium' ? 'text-yellow-400' : 'text-green-400'}>{decision.impact}</span></span>
                            <span>Risk: <span className={decision.risk === 'Critical' ? 'text-red-400' : decision.risk === 'High' ? 'text-orange-400' : decision.risk === 'Medium' ? 'text-yellow-400' : 'text-green-400'}>{decision.risk}</span></span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Decision Metrics */}
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold text-sm mb-3">Decision Intelligence Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-blue-400 text-xl font-bold">91%</div>
                          <div className="text-slate-400 text-xs">Success Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 text-xl font-bold">2.3s</div>
                          <div className="text-slate-400 text-xs">Avg Response Time</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Geospatial Threat Mapping */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Globe className="w-8 h-8 text-emerald-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Geospatial Threat Mapping</h3>
                      <p className="text-slate-400 text-sm">Global threat visualization with impact assessment</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-500/30">
                      GLOBAL VIEW
                    </div>
                    <select className="bg-slate-800/60 border border-slate-600/30 rounded-lg px-3 py-1 text-sm text-slate-300 focus:outline-none focus:border-red-500/50">
                      <option>World View</option>
                      <option>Regional Focus</option>
                      <option>Country Specific</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Threat Map Placeholder */}
                  <div className="lg:col-span-2 bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 h-96 flex items-center justify-center">
                    <div className="text-center">
                      <Globe className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                      <div className="text-slate-400 text-sm">Interactive Global Threat Map</div>
                      <div className="text-slate-500 text-xs mt-2">Real-time threat visualization with impact assessment</div>
                    </div>
                  </div>

                  {/* Threat Statistics */}
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold text-sm mb-3">Global Threat Statistics</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Active Threats</span>
                          <span className="text-red-400 font-bold">1,247</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Affected Countries</span>
                          <span className="text-orange-400 font-bold">89</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Critical Infrastructure</span>
                          <span className="text-yellow-400 font-bold">234</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Response Teams Deployed</span>
                          <span className="text-green-400 font-bold">156</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <h4 className="text-white font-semibold text-sm mb-3">High-Risk Regions</h4>
                      <div className="space-y-2">
                        {[
                          { region: 'Eastern Europe', threats: 89, severity: 'Critical' },
                          { region: 'Southeast Asia', threats: 67, severity: 'High' },
                          { region: 'Middle East', threats: 45, severity: 'High' },
                          { region: 'North America', threats: 34, severity: 'Medium' }
                        ].map((region, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-slate-400 text-xs">{region.region}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${region.severity === 'Critical' ? 'bg-red-500/20 text-red-400' : region.severity === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {region.severity}
                              </span>
                              <span className="text-white text-xs">{region.threats}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'recovery-operations' && (
            <motion.div
              key="recovery-operations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Recovery Operations Overview & Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Recovery Progress Overview */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Heart className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Recovery Progress</h3>
                        <p className="text-slate-400 text-sm">Overall recovery status</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                      PHASE 4: RECOVERY
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Recovery Phases */}
                    {[
                      { phase: 'Immediate Response', progress: 100, status: 'Completed' },
                      { phase: 'Damage Assessment', progress: 100, status: 'Completed' },
                      { phase: 'Initial Recovery', progress: 85, status: 'In Progress' },
                      { phase: 'System Restoration', progress: 60, status: 'In Progress' },
                      { phase: 'Business Continuity', progress: 40, status: 'Initiated' },
                      { phase: 'Full Recovery', progress: 15, status: 'Planning' }
                    ].map((phase, index) => (
                      <div key={phase.phase} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium">{phase.phase}</span>
                          <span className={`text-xs px-2 py-1 rounded ${phase.status === 'Completed' ? 'bg-green-500/20 text-green-400' : phase.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : phase.status === 'Initiated' ? 'bg-purple-500/20 text-purple-400' : 'bg-slate-500/20 text-slate-400'}`}>
                            {phase.status}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${phase.status === 'Completed' ? 'bg-gradient-to-r from-green-500 to-green-600' : phase.status === 'In Progress' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : phase.status === 'Initiated' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-slate-500 to-slate-600'}`}
                            style={{ width: `${phase.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery Resources */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Truck className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Recovery Resources</h3>
                        <p className="text-slate-400 text-sm">Allocated recovery assets</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold border border-blue-500/30">
                      89% UTILIZED
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { resource: 'Recovery Teams', allocated: 45, total: 50, status: 'High Demand' },
                      { resource: 'Technical Support', allocated: 28, total: 35, status: 'Adequate' },
                      { resource: 'Equipment & Supplies', allocated: 67, total: 80, status: 'Available' },
                      { resource: 'Backup Systems', allocated: 12, total: 15, status: 'Critical' },
                      { resource: 'Communication Hubs', allocated: 22, total: 25, status: 'High Usage' }
                    ].map((resource) => (
                      <div key={resource.resource} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-sm">{resource.resource}</span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${resource.status === 'Critical' ? 'bg-red-500/20 text-red-400' : resource.status === 'High Demand' ? 'bg-orange-500/20 text-orange-400' : resource.status === 'High Usage' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                            {resource.status}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mb-2">
                          <span>Allocated: {resource.allocated}/{resource.total}</span>
                          <span>{Math.round((resource.allocated/resource.total)*100)}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${(resource.allocated/resource.total) > 0.8 ? 'bg-gradient-to-r from-red-500 to-red-600' : (resource.allocated/resource.total) > 0.7 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`}
                            style={{ width: `${(resource.allocated/resource.total)*100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recovery Timeline */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Clock className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Recovery Timeline</h3>
                        <p className="text-slate-400 text-sm">Recovery milestones</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold border border-purple-500/30">
                      4 DAYS REMAINING
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { milestone: 'System Backup Restore', due: 'Completed', status: 'done' },
                      { milestone: 'Critical Systems Online', due: 'Today', status: 'in-progress' },
                      { milestone: 'User Access Restored', due: 'Tomorrow', status: 'pending' },
                      { milestone: 'Full Operations Resume', due: '3 days', status: 'pending' },
                      { milestone: 'Post-Incident Review', due: '1 week', status: 'scheduled' }
                    ].map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${milestone.status === 'done' ? 'bg-green-400' : milestone.status === 'in-progress' ? 'bg-blue-400 animate-pulse' : milestone.status === 'pending' ? 'bg-yellow-400' : 'bg-slate-400'}`} />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{milestone.milestone}</div>
                          <div className={`text-xs ${milestone.due === 'Completed' ? 'text-green-400' : milestone.due === 'Today' ? 'text-blue-400' : 'text-slate-400'}`}>
                            Due: {milestone.due}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Business Continuity & System Recovery */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Business Continuity Status */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Briefcase className="w-8 h-8 text-cyan-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Business Continuity</h3>
                        <p className="text-slate-400 text-sm">Operational continuity measures</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold border border-cyan-500/30">
                      76% CONTINUITY
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Continuity Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <div className="text-cyan-400 text-2xl font-bold mb-1">76%</div>
                        <div className="text-slate-400 text-xs">Business Functions</div>
                        <div className="text-green-500 text-xs mt-1">+15% improvement</div>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <div className="text-blue-400 text-2xl font-bold mb-1">89%</div>
                        <div className="text-slate-400 text-xs">Customer Services</div>
                        <div className="text-blue-500 text-xs mt-1">Maintained</div>
                      </div>
                    </div>

                    {/* Critical Functions Status */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Critical Functions Status</h4>
                      {[
                        { function: 'Core Banking Systems', status: 'Operational', uptime: '99.8%' },
                        { function: 'Customer Portal', status: 'Operational', uptime: '97.2%' },
                        { function: 'Transaction Processing', status: 'Limited', uptime: '85.4%' },
                        { function: 'Reporting Systems', status: 'Recovery', uptime: 'N/A' },
                        { function: 'Communication Channels', status: 'Operational', uptime: '98.1%' }
                      ].map((func, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{func.function}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${func.status === 'Operational' ? 'bg-green-500/20 text-green-400' : func.status === 'Limited' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                {func.status}
                              </span>
                              <span className="text-slate-400 text-xs">{func.uptime}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* System Recovery Dashboard */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Server className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">System Recovery</h3>
                        <p className="text-slate-400 text-sm">Infrastructure restoration</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                      68% RECOVERED
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Recovery Progress Chart */}
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={[
                            { system: 'Database', recovery: 85, target: 100 },
                            { system: 'Web Servers', recovery: 92, target: 100 },
                            { system: 'Application', recovery: 67, target: 100 },
                            { system: 'Network', recovery: 78, target: 100 },
                            { system: 'Security', recovery: 45, target: 100 },
                            { system: 'Backup', recovery: 89, target: 100 }
                          ]}
                          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                          <XAxis dataKey="system" stroke="#9CA3AF" fontSize={10} />
                          <YAxis stroke="#9CA3AF" fontSize={10} />
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#0a0e1a',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#fff'
                            }}
                          />
                          <RechartsBar dataKey="recovery" fill="#10b981" name="Recovered (%)" />
                          <RechartsBar dataKey="target" fill="#374151" name="Target (%)" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* System Status */}
                    <div className="grid grid-cols-1 gap-3">
                      {[
                        { name: 'Primary Database', status: 'Online', progress: 100 },
                        { name: 'Web Application Servers', status: 'Online', progress: 92 },
                        { name: 'API Gateway', status: 'Recovering', progress: 67 },
                        { name: 'Load Balancers', status: 'Online', progress: 85 },
                        { name: 'Security Systems', status: 'Maintenance', progress: 45 },
                        { name: 'Backup Systems', status: 'Online', progress: 100 }
                      ].map((system, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{system.name}</span>
                            <span className={`px-2 py-1 rounded text-xs ${system.status === 'Online' ? 'bg-green-500/20 text-green-400' : system.status === 'Recovering' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {system.status}
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${system.status === 'Online' ? 'bg-gradient-to-r from-green-500 to-green-600' : system.status === 'Recovering' ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'}`}
                              style={{ width: `${system.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recovery Assessment & Lessons Learned */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recovery Assessment */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <BarChart3 className="w-8 h-8 text-orange-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Recovery Assessment</h3>
                        <p className="text-slate-400 text-sm">Impact analysis and metrics</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold border border-orange-500/30">
                      ASSESSMENT COMPLETE
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Impact Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <div className="text-red-400 text-2xl font-bold mb-1">$2.4M</div>
                        <div className="text-slate-400 text-xs">Financial Impact</div>
                        <div className="text-red-500 text-xs mt-1">-8% from estimate</div>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <div className="text-blue-400 text-2xl font-bold mb-1">47hrs</div>
                        <div className="text-slate-400 text-xs">Downtime Duration</div>
                        <div className="text-blue-500 text-xs mt-1">-12hrs improvement</div>
                      </div>
                    </div>

                    {/* Recovery Effectiveness */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Recovery Effectiveness</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Response Time</span>
                          <span className="text-green-400 font-medium">Excellent (15min)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Containment Speed</span>
                          <span className="text-green-400 font-medium">Good (2.5hrs)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Data Recovery</span>
                          <span className="text-blue-400 font-medium">Partial (78%)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">System Integrity</span>
                          <span className="text-yellow-400 font-medium">Fair (65%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Lessons Learned & Future Improvements */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-8 h-8 text-emerald-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Lessons Learned</h3>
                        <p className="text-slate-400 text-sm">Post-incident analysis</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-500/30">
                      ANALYSIS COMPLETE
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Key Findings */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Key Findings</h4>
                      {[
                        { finding: 'Backup systems performed well - 99% data recovery', priority: 'Strength' },
                        { finding: 'Response team coordination needs improvement', priority: 'Critical' },
                        { finding: 'Automated alerting reduced detection time by 75%', priority: 'Strength' },
                        { finding: 'Communication protocols require updating', priority: 'High' },
                        { finding: 'Redundant systems prevented total outage', priority: 'Strength' }
                      ].map((finding, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className={`px-2 py-1 rounded text-xs font-bold ${finding.priority === 'Critical' ? 'bg-red-500/20 text-red-400' : finding.priority === 'High' ? 'bg-orange-500/20 text-orange-400' : 'bg-green-500/20 text-green-400'}`}>
                              {finding.priority}
                            </span>
                          </div>
                          <p className="text-slate-300 text-sm">{finding.finding}</p>
                        </div>
                      ))}
                    </div>

                    {/* Improvement Actions */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Improvement Actions</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-400">Implement enhanced backup testing protocols</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-400" />
                          <span className="text-slate-400">Conduct regular response team training</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-400">Update emergency communication procedures</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Clock className="w-4 h-4 text-yellow-400" />
                          <span className="text-slate-400">Enhance automated monitoring capabilities</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'emergency-planning' && (
            <motion.div
              key="emergency-planning"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Risk Assessment & Planning Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Planning Readiness Score */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Target className="w-8 h-8 text-green-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Planning Readiness</h3>
                        <p className="text-slate-400 text-sm">Overall preparedness score</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm font-semibold border border-green-500/30">
                      87% READY
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Readiness Metrics */}
                    <div className="text-center">
                      <div className="text-green-400 text-4xl font-bold mb-2">87%</div>
                      <div className="text-slate-400 text-sm">Emergency Preparedness Index</div>
                      <div className="text-green-500 text-xs mt-1">+5% from last quarter</div>
                    </div>

                    {/* Readiness Components */}
                    {[
                      { component: 'Response Plans', score: 92, status: 'Excellent' },
                      { component: 'Resource Allocation', score: 85, status: 'Good' },
                      { component: 'Training Programs', score: 78, status: 'Good' },
                      { component: 'Equipment Readiness', score: 94, status: 'Excellent' },
                      { component: 'Communication Plans', score: 81, status: 'Good' },
                      { component: 'Recovery Strategies', score: 76, status: 'Fair' }
                    ].map((component, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-white text-sm font-medium">{component.component}</span>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs ${component.status === 'Excellent' ? 'bg-green-500/20 text-green-400' : component.status === 'Good' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {component.status}
                            </span>
                            <span className="text-slate-400 text-xs">{component.score}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${component.score > 85 ? 'bg-gradient-to-r from-green-500 to-green-600' : component.score > 75 ? 'bg-gradient-to-r from-blue-500 to-blue-600' : 'bg-gradient-to-r from-yellow-500 to-yellow-600'}`}
                            style={{ width: `${component.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Risk Assessment Matrix */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <AlertTriangle className="w-8 h-8 text-orange-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Risk Assessment</h3>
                        <p className="text-slate-400 text-sm">Threat probability matrix</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg text-sm font-semibold border border-orange-500/30">
                      HIGH PRIORITY
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Risk Heat Map */}
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[
                        { risk: 'Cyber Attack', probability: 'High', impact: 'Critical', priority: 'Critical' },
                        { risk: 'Data Breach', probability: 'Medium', impact: 'High', priority: 'High' },
                        { risk: 'System Failure', probability: 'Low', impact: 'Medium', priority: 'Medium' },
                        { risk: 'Natural Disaster', probability: 'Low', impact: 'Critical', priority: 'High' },
                        { risk: 'Insider Threat', probability: 'Medium', impact: 'High', priority: 'High' },
                        { risk: 'Supply Chain', probability: 'High', impact: 'Medium', priority: 'High' }
                      ].map((item, index) => (
                        <div key={index} className={`p-2 rounded text-xs border ${item.priority === 'Critical' ? 'bg-red-500/10 border-red-500/30' : item.priority === 'High' ? 'bg-orange-500/10 border-orange-500/30' : 'bg-yellow-500/10 border-yellow-500/30'}`}>
                          <div className="font-bold text-white mb-1">{item.risk}</div>
                          <div className="text-slate-400">{item.probability}</div>
                          <div className={`font-medium ${item.impact === 'Critical' ? 'text-red-400' : item.impact === 'High' ? 'text-orange-400' : 'text-yellow-400'}`}>
                            {item.impact}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Top Risks */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Top Risk Priorities</h4>
                      {[
                        { risk: 'Advanced Persistent Threats', score: 9.2, trend: 'increasing' },
                        { risk: 'Ransomware Campaigns', score: 8.7, trend: 'stable' },
                        { risk: 'Supply Chain Vulnerabilities', score: 8.1, trend: 'increasing' }
                      ].map((risk, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-white font-medium text-sm">{risk.risk}</span>
                            <span className="text-red-400 font-bold">{risk.score}/10</span>
                          </div>
                          <div className={`text-xs ${risk.trend === 'increasing' ? 'text-red-400' : 'text-yellow-400'}`}>
                            Trend: {risk.trend}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Planning Timeline */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Clock className="w-8 h-8 text-blue-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Planning Timeline</h3>
                        <p className="text-slate-400 text-sm">Upcoming preparedness activities</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold border border-blue-500/30">
                      12 ACTIVITIES
                    </div>
                  </div>

                  <div className="space-y-3">
                    {[
                      { activity: 'Emergency Response Drill', due: 'Next Week', priority: 'High' },
                      { activity: 'Backup System Testing', due: '2 weeks', priority: 'Critical' },
                      { activity: 'Team Training Session', due: '3 weeks', priority: 'Medium' },
                      { activity: 'Equipment Maintenance', due: 'Monthly', priority: 'High' },
                      { activity: 'Plan Review & Update', due: 'Quarterly', priority: 'High' },
                      { activity: 'Stakeholder Briefing', due: 'Monthly', priority: 'Medium' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${activity.priority === 'Critical' ? 'bg-red-400' : activity.priority === 'High' ? 'bg-orange-400' : 'bg-blue-400'}`} />
                        <div className="flex-1">
                          <div className="text-white text-sm font-medium">{activity.activity}</div>
                          <div className={`text-xs ${activity.due === 'Next Week' ? 'text-orange-400' : activity.due === '2 weeks' ? 'text-yellow-400' : 'text-slate-400'}`}>
                            Due: {activity.due}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Response Plans & Training Programs */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Emergency Response Plans */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <FileText className="w-8 h-8 text-cyan-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Emergency Response Plans</h3>
                        <p className="text-slate-400 text-sm">Comprehensive incident response frameworks</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-semibold border border-cyan-500/30">
                      15 ACTIVE PLANS
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      { plan: 'Cyber Attack Response Plan', coverage: 'All Systems', lastUpdated: '2 weeks ago', status: 'Current' },
                      { plan: 'Data Breach Response Plan', coverage: 'Data Assets', lastUpdated: '1 month ago', status: 'Current' },
                      { plan: 'Business Continuity Plan', coverage: 'Operations', lastUpdated: '3 weeks ago', status: 'Review Due' },
                      { plan: 'Communication Crisis Plan', coverage: 'Public Relations', lastUpdated: '1 week ago', status: 'Current' },
                      { plan: 'Recovery & Restoration Plan', coverage: 'Infrastructure', lastUpdated: '2 months ago', status: 'Update Required' }
                    ].map((plan, index) => (
                      <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-white font-semibold text-sm">{plan.plan}</h4>
                          <span className={`px-2 py-1 rounded text-xs ${plan.status === 'Current' ? 'bg-green-500/20 text-green-400' : plan.status === 'Review Due' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                            {plan.status}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs text-slate-400 mb-2">
                          <div>Coverage: {plan.coverage}</div>
                          <div>Last Updated: {plan.lastUpdated}</div>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30 transition-colors">
                            View Plan
                          </button>
                          <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30 transition-colors">
                            Update Plan
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Training & Readiness Programs */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Users className="w-8 h-8 text-emerald-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Training Programs</h3>
                        <p className="text-slate-400 text-sm">Team preparedness and skill development</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-sm font-semibold border border-emerald-500/30">
                      89% TRAINED
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Training Completion */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <div className="text-emerald-400 text-2xl font-bold mb-1">89%</div>
                        <div className="text-slate-400 text-xs">Team Readiness</div>
                        <div className="text-emerald-500 text-xs mt-1">Target: 95%</div>
                      </div>
                      <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4 text-center">
                        <div className="text-blue-400 text-2xl font-bold mb-1">156</div>
                        <div className="text-slate-400 text-xs">Certified Personnel</div>
                        <div className="text-blue-500 text-xs mt-1">+12 this quarter</div>
                      </div>
                    </div>

                    {/* Training Modules */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Training Modules</h4>
                      {[
                        { module: 'Incident Response Fundamentals', completion: 94, required: true },
                        { module: 'Advanced Threat Handling', completion: 78, required: true },
                        { module: 'Communication Protocols', completion: 87, required: true },
                        { module: 'Recovery Procedures', completion: 65, required: true },
                        { module: 'Leadership in Crisis', completion: 45, required: false },
                        { module: 'Technical Forensics', completion: 52, required: false }
                      ].map((module, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{module.module}</span>
                            <div className="flex items-center space-x-2">
                              {module.required && <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs">Required</span>}
                              <span className="text-green-400 text-xs">{module.completion}%</span>
                            </div>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-500 ${module.completion > 80 ? 'bg-gradient-to-r from-green-500 to-green-600' : module.completion > 60 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
                              style={{ width: `${module.completion}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Resource Preparedness & Scenario Planning */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Resource Preparedness */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Server className="w-8 h-8 text-purple-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Resource Preparedness</h3>
                        <p className="text-slate-400 text-sm">Equipment and infrastructure readiness</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm font-semibold border border-purple-500/30">
                      92% READY
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Equipment Readiness */}
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { equipment: 'Communication Systems', readiness: 96, status: 'Operational' },
                        { equipment: 'Backup Generators', readiness: 89, status: 'Operational' },
                        { equipment: 'Security Equipment', readiness: 94, status: 'Operational' },
                        { equipment: 'Medical Supplies', readiness: 87, status: 'Well Stocked' },
                        { equipment: 'Technical Tools', readiness: 78, status: 'Adequate' },
                        { equipment: 'Transportation Assets', readiness: 91, status: 'Ready' }
                      ].map((item, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3 text-center">
                          <div className="text-purple-400 text-lg font-bold">{item.readiness}%</div>
                          <div className="text-white text-xs font-medium mb-1">{item.equipment}</div>
                          <div className={`text-xs ${item.status === 'Operational' ? 'text-green-400' : item.status === 'Well Stocked' ? 'text-blue-400' : item.status === 'Adequate' ? 'text-yellow-400' : 'text-slate-400'}`}>
                            {item.status}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Supply Chain Status */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Supply Chain Status</h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="text-center">
                            <div className="text-green-400 text-xl font-bold">28</div>
                            <div className="text-slate-400 text-xs">Active Suppliers</div>
                          </div>
                        </div>
                        <div className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="text-center">
                            <div className="text-blue-400 text-xl font-bold">4.2h</div>
                            <div className="text-slate-400 text-xs">Avg Response Time</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Scenario Planning & Simulation */}
                <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <Activity className="w-8 h-8 text-red-400" />
                      <div>
                        <h3 className="text-xl font-bold text-white">Scenario Planning</h3>
                        <p className="text-slate-400 text-sm">Emergency simulation and contingency planning</p>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg text-sm font-semibold border border-red-500/30">
                      8 SCENARIOS
                    </div>
                  </div>

                  <div className="space-y-6">
                    {/* Scenario Library */}
                    <div className="space-y-3">
                      <h4 className="text-white font-semibold text-sm">Prepared Scenarios</h4>
                      {[
                        { scenario: 'Massive Data Breach', probability: 'Medium', lastTested: '2 weeks ago', readiness: 92 },
                        { scenario: 'Ransomware Attack', probability: 'High', lastTested: '1 week ago', readiness: 87 },
                        { scenario: 'DDoS Campaign', probability: 'High', lastTested: '3 days ago', readiness: 94 },
                        { scenario: 'Insider Threat', probability: 'Medium', lastTested: '1 month ago', readiness: 76 },
                        { scenario: 'Infrastructure Failure', probability: 'Low', lastTested: '2 weeks ago', readiness: 83 },
                        { scenario: 'Supply Chain Disruption', probability: 'Medium', lastTested: '3 weeks ago', readiness: 71 }
                      ].map((scenario, index) => (
                        <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-sm">{scenario.scenario}</span>
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 py-1 rounded text-xs ${scenario.probability === 'High' ? 'bg-red-500/20 text-red-400' : scenario.probability === 'Medium' ? 'bg-orange-500/20 text-orange-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                                {scenario.probability}
                              </span>
                              <span className="text-green-400 text-xs">{scenario.readiness}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Last Tested: {scenario.lastTested}</span>
                            <span>Readiness Score: {scenario.readiness}/100</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Planning Actions */}
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                        Run Simulation
                      </button>
                      <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                        Create Scenario
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Compliance & Audit Readiness */}
              <div className="bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(220,38,38,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(220,38,38,0.6)] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Shield className="w-8 h-8 text-yellow-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">Compliance & Audit Readiness</h3>
                      <p className="text-slate-400 text-sm">Regulatory compliance and audit preparedness</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-semibold border border-yellow-500/30">
                      AUDIT READY
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm">
                      Generate Report
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { standard: 'NIST Cybersecurity Framework', compliance: 94, lastAudit: '3 months ago', status: 'Compliant' },
                    { standard: 'ISO 27001', compliance: 87, lastAudit: '6 months ago', status: 'Compliant' },
                    { standard: 'GDPR Readiness', compliance: 91, lastAudit: '2 months ago', status: 'Compliant' },
                    { standard: 'HIPAA Security', compliance: 78, lastAudit: '4 months ago', status: 'Review Needed' },
                    { standard: 'PCI DSS', compliance: 96, lastAudit: '1 month ago', status: 'Compliant' },
                    { standard: 'SOX Controls', compliance: 82, lastAudit: '5 months ago', status: 'Compliant' },
                    { standard: 'FedRAMP', compliance: 89, lastAudit: '3 months ago', status: 'Compliant' },
                    { standard: 'Industry Best Practices', compliance: 93, lastAudit: 'Ongoing', status: 'Compliant' }
                  ].map((compliance, index) => (
                    <div key={index} className="bg-slate-800/50 border border-slate-700/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded text-xs font-bold ${compliance.status === 'Compliant' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {compliance.status}
                        </span>
                      </div>
                      <h4 className="text-white font-semibold text-sm mb-2">{compliance.standard}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Compliance:</span>
                          <span className="text-green-400">{compliance.compliance}%</span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-500 ${compliance.compliance > 85 ? 'bg-gradient-to-r from-green-500 to-green-600' : compliance.compliance > 75 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}
                            style={{ width: `${compliance.compliance}%` }}
                          ></div>
                        </div>
                        <div className="text-slate-400 text-xs mt-1">Last Audit: {compliance.lastAudit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmergencyCommand;