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
  Square
} from 'lucide-react';

// 🚨 EMERGENCY CYBER RESPONSE COORDINATION - SUPER ADMIN ONLY
// CRISIS MANAGEMENT & MULTI-AGENCY EMERGENCY RESPONSE PLATFORM
// REAL-TIME INCIDENT COMMAND SYSTEM & AUTOMATED RESPONSE COORDINATION

const EmergencyCyberResponseCoordination = () => {
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
              This is an Emergency Cyber Response Coordination Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('crisis-command');
  const [emergencyData, setEmergencyData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([
    {
      id: 1,
      type: 'critical',
      title: 'Nationwide Cyber Emergency Declared',
      message: 'Multiple critical infrastructure sectors under attack',
      timestamp: new Date(),
      acknowledged: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Response Teams Activated',
      message: '5 emergency response teams deployed across affected sectors',
      timestamp: new Date(Date.now() - 120000),
      acknowledged: true
    }
  ]);
  const [incidentLog, setIncidentLog] = useState([
    {
      id: 1,
      action: 'Emergency Protocol Activated',
      actor: 'National Cyber Command',
      timestamp: new Date(),
      status: 'completed'
    },
    {
      id: 2,
      action: 'Infrastructure Isolation Initiated',
      actor: 'DHS Response Team',
      timestamp: new Date(Date.now() - 300000),
      status: 'completed'
    },
    {
      id: 3,
      action: 'Containment Procedures Started',
      actor: 'FBI Cyber Division',
      timestamp: new Date(Date.now() - 600000),
      status: 'in-progress'
    }
  ]);
  const [responseTeams, setResponseTeams] = useState([]);
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [resourceAllocations, setResourceAllocations] = useState({});
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

  // Emergency response teams
  const emergencyTeams = [
    {
      id: 'national-command',
      name: 'National Cyber Command',
      role: 'INCIDENT COMMANDER',
      status: 'ACTIVE',
      members: 15,
      responseTime: '00:02:15',
      specialization: 'Strategic Coordination'
    },
    {
      id: 'fbi-cyber',
      name: 'FBI Cyber Division',
      role: 'INVESTIGATION LEAD',
      status: 'ENGAGED',
      members: 12,
      responseTime: '00:05:30',
      specialization: 'Digital Forensics'
    },
    {
      id: 'dhs-cisa',
      name: 'CISA Response Team',
      role: 'TECHNICAL SUPPORT',
      status: 'STANDBY',
      members: 8,
      responseTime: '00:08:45',
      specialization: 'Infrastructure Protection'
    },
    {
      id: 'dod-cyber',
      name: 'DoD Cyber Defense',
      role: 'RESOURCE PROVIDER',
      status: 'READY',
      members: 25,
      responseTime: '00:12:00',
      specialization: 'Military Support'
    },
    {
      id: 'private-sector',
      name: 'Private Sector Alliance',
      role: 'EXPERT CONSULTANTS',
      status: 'AVAILABLE',
      members: 18,
      responseTime: '00:15:20',
      specialization: 'Industry Expertise'
    }
  ];

  // Active incidents
  const activeIncidents = [
    {
      id: 'INC-2024-001',
      title: 'Critical Infrastructure Ransomware Attack',
      severity: 'CRITICAL',
      status: 'ACTIVE',
      affected: 'Power Grid Sector',
      startTime: '2024-01-06T14:30:00Z',
      responseTeams: 3,
      progress: 75
    },
    {
      id: 'INC-2024-002',
      title: 'Nationwide DDoS Campaign',
      severity: 'HIGH',
      status: 'CONTAINED',
      affected: 'Financial Institutions',
      startTime: '2024-01-06T12:15:00Z',
      responseTeams: 2,
      progress: 95
    },
    {
      id: 'INC-2024-003',
      title: 'Advanced Persistent Threat',
      severity: 'HIGH',
      status: 'INVESTIGATING',
      affected: 'Government Networks',
      startTime: '2024-01-06T09:45:00Z',
      responseTeams: 4,
      progress: 40
    }
  ];

  // 🎯 EMERGENCY RESPONSE GLASS CARD COMPONENT
  const EmergencyGlassCard = ({ children, title, icon: Icon, status, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(239,68,68,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(239,68,68,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(239,68,68,0.6)] text-red-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                status === 'ACTIVE' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                status === 'CONTAINED' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                'bg-green-500/20 text-green-400 border-green-500/40'
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

  // 📊 MAIN EMERGENCY CYBER RESPONSE COORDINATION INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-900 via-orange-900 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-red-500/40 to-orange-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-orange-600/35 to-red-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-red-400/30 to-orange-400/30 rounded-full blur-3xl"></div>
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
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 via-orange-600 to-red-600 rounded-xl flex items-center justify-center shadow-2xl shadow-red-500/30">
                <Siren className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-red-300 via-orange-300 via-yellow-200 to-red-200 bg-clip-text text-transparent drop-shadow-sm">
                Emergency Cyber Response Coordination
              </h1>
              <p className="text-red-200/80 text-sm font-medium">Crisis Management Command Center & Multi-Agency Emergency Response Platform</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">3 Active Incidents</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">5 Response Teams Engaged</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">CRITICAL Threat Level</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Siren className="w-4 h-4 text-red-400 animate-pulse" />
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
              className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-red-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Emergency Status'}</span>
            </button>
          </div>
        </motion.div>

        {/* Emergency Response Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'crisis-command', label: 'Crisis Command', icon: ShieldAlert },
            { id: 'incident-timeline', label: 'Incident Timeline', icon: Clock },
            { id: 'response-teams', label: 'Response Teams', icon: Users },
            { id: 'resource-allocation', label: 'Resource Allocation', icon: Briefcase },
            { id: 'communication-hub', label: 'Communication Hub', icon: Radio }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 text-red-300 border border-red-500/30 shadow-lg shadow-red-500/10'
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
          {activeSection === 'crisis-command' && (
            <motion.div
              key="crisis-command"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Emergency Status Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <EmergencyGlassCard title="Active Incidents" icon={AlertTriangle} status="CRITICAL">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">3</div>
                    <div className="text-sm text-slate-400">Ongoing Crises</div>
                    <div className="text-xs text-red-400 mt-2">Immediate Action Required</div>
                  </div>
                </EmergencyGlassCard>

                <EmergencyGlassCard title="Response Teams" icon={Users} status="ENGAGED">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-400 mb-2">5</div>
                    <div className="text-sm text-slate-400">Teams Deployed</div>
                    <div className="text-xs text-orange-400 mt-2">78 Members Active</div>
                  </div>
                </EmergencyGlassCard>

                <EmergencyGlassCard title="Containment Progress" icon={ShieldCheck} status="ACTIVE">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">70%</div>
                    <div className="text-sm text-slate-400">Average Progress</div>
                    <div className="text-xs text-yellow-400 mt-2">2 Incidents Stabilized</div>
                  </div>
                </EmergencyGlassCard>

                <EmergencyGlassCard title="Response Time" icon={Timer} status="MONITORING">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">4.2m</div>
                    <div className="text-sm text-slate-400">Average Response</div>
                    <div className="text-xs text-green-400 mt-2">Within Target</div>
                  </div>
                </EmergencyGlassCard>
              </div>

              {/* Active Incidents Command Center */}
              <EmergencyGlassCard title="Active Incidents Command Center" icon={ShieldAlert} status="CRITICAL">
                <div className="space-y-4">
                  {activeIncidents.map((incident) => (
                    <div key={incident.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${
                            incident.severity === 'CRITICAL' ? 'bg-red-400 animate-pulse' :
                            incident.severity === 'HIGH' ? 'bg-orange-400' : 'bg-yellow-400'
                          }`}></div>
                          <div>
                            <div className="text-white font-semibold">{incident.title}</div>
                            <div className="text-slate-400 text-sm">ID: {incident.id} • {incident.affected}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            incident.status === 'ACTIVE' ? 'bg-red-500/20 text-red-400' :
                            incident.status === 'CONTAINED' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {incident.status}
                          </span>
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            incident.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/40' :
                            incident.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40' :
                            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/40'
                          }`}>
                            {incident.severity}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-slate-400">Started: {new Date(incident.startTime).toLocaleString()}</span>
                          <span className="text-slate-400">Teams: {incident.responseTeams}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="text-sm text-slate-400">Progress:</div>
                          <div className="w-24 bg-slate-600 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                incident.progress > 80 ? 'bg-green-500' :
                                incident.progress > 60 ? 'bg-yellow-500' : 'bg-red-500'
                              }`}
                              style={{ width: `${incident.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-white">{incident.progress}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </EmergencyGlassCard>

              {/* Emergency Response Timeline */}
              <EmergencyGlassCard title="Emergency Response Timeline" icon={Clock} status="REAL-TIME">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { time: '14:30', incidents: 1, responses: 3, containment: 0 },
                      { time: '14:45', incidents: 2, responses: 5, containment: 1 },
                      { time: '15:00', incidents: 3, responses: 8, containment: 1 },
                      { time: '15:15', incidents: 3, responses: 12, containment: 2 },
                      { time: '15:30', incidents: 3, responses: 15, containment: 2 },
                      { time: '15:45', incidents: 3, responses: 18, containment: 3 }
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
                      <RechartsLegend />
                      <RechartsLine
                        type="monotone"
                        dataKey="incidents"
                        stroke="#ef4444"
                        strokeWidth={3}
                        name="Active Incidents"
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      />
                      <RechartsLine
                        type="monotone"
                        dataKey="responses"
                        stroke="#f97316"
                        strokeWidth={2}
                        name="Response Actions"
                        dot={{ fill: '#f97316', strokeWidth: 2, r: 3 }}
                      />
                      <RechartsLine
                        type="monotone"
                        dataKey="containment"
                        stroke="#22c55e"
                        strokeWidth={2}
                        name="Incidents Contained"
                        dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </EmergencyGlassCard>
            </motion.div>
          )}

          {activeSection === 'incident-timeline' && (
            <motion.div
              key="incident-timeline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Incident Timeline Visualization */}
              <EmergencyGlassCard title="Comprehensive Incident Timeline" icon={Clock} status="TRACKING">
                <div className="space-y-6">
                  {/* Timeline Events */}
                  <div className="space-y-4">
                    {[
                      { time: '14:30:00', event: 'CRITICAL: Ransomware attack detected on power grid infrastructure', type: 'attack', severity: 'critical' },
                      { time: '14:32:15', event: 'National Cyber Command activated emergency response protocol', type: 'response', severity: 'info' },
                      { time: '14:35:42', event: 'FBI Cyber Division deployed forensic analysis team', type: 'response', severity: 'info' },
                      { time: '14:38:20', event: 'Infrastructure isolation initiated for affected systems', type: 'containment', severity: 'warning' },
                      { time: '14:45:00', event: 'SECONDARY: DDoS campaign targeting financial institutions detected', type: 'attack', severity: 'high' },
                      { time: '14:47:33', event: 'Automated mitigation systems activated across banking sector', type: 'response', severity: 'info' },
                      { time: '15:00:00', event: 'THIRD INCIDENT: APT detected in government networks', type: 'attack', severity: 'high' },
                      { time: '15:02:18', event: 'Multi-agency coordination call initiated', type: 'response', severity: 'info' },
                      { time: '15:15:30', event: 'First incident containment achieved - power grid stabilized', type: 'containment', severity: 'success' },
                      { time: '15:30:45', event: 'Financial sector DDoS attack successfully mitigated', type: 'containment', severity: 'success' }
                    ].map((event, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-4 h-4 rounded-full border-2 ${
                            event.type === 'attack' ? 'bg-red-500 border-red-400' :
                            event.type === 'response' ? 'bg-blue-500 border-blue-400' :
                            event.type === 'containment' ? 'bg-green-500 border-green-400' :
                            'bg-yellow-500 border-yellow-400'
                          }`}></div>
                          {index < 9 && <div className="w-0.5 h-8 bg-slate-600 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-8">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className="text-sm text-slate-400 font-mono">{event.time}</span>
                            <span className={`px-2 py-1 rounded text-xs font-bold ${
                              event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                              event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              event.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                              event.severity === 'success' ? 'bg-green-500/20 text-green-400' :
                              'bg-blue-500/20 text-blue-400'
                            }`}>
                              {event.severity.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-white">{event.event}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </EmergencyGlassCard>
            </motion.div>
          )}

          {activeSection === 'response-teams' && (
            <motion.div
              key="response-teams"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Response Teams Coordination */}
              <EmergencyGlassCard title="Multi-Agency Response Teams Coordination" icon={Users} status="ENGAGED">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {emergencyTeams.map((team) => (
                    <motion.div
                      key={team.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-6 bg-slate-800/50 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-4 h-4 rounded-full ${
                          team.status === 'ACTIVE' ? 'bg-green-400 animate-pulse' :
                          team.status === 'ENGAGED' ? 'bg-blue-400 animate-pulse' :
                          team.status === 'STANDBY' ? 'bg-yellow-400' :
                          'bg-slate-400'
                        }`}></div>
                        <div className="flex-1">
                          <div className="text-white font-semibold text-sm">{team.name}</div>
                          <div className="text-slate-400 text-xs">{team.role}</div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Members:</span>
                          <span className="text-cyan-400">{team.members}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Response Time:</span>
                          <span className="text-green-400">{team.responseTime}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-400">Specialization:</span>
                          <span className="text-purple-400 text-xs">{team.specialization}</span>
                        </div>

                        <div className="flex space-x-2 mt-4">
                          <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                            Deploy
                          </button>
                          <button className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                            Contact
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </EmergencyGlassCard>

              {/* Team Performance Analytics */}
              <EmergencyGlassCard title="Response Team Performance Analytics" icon={BarChart3} status="ANALYZING">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={emergencyTeams.map(team => ({
                      name: team.name.split(' ')[0],
                      responseTime: parseFloat(team.responseTime.split(':')[2]),
                      efficiency: team.status === 'ACTIVE' ? 95 : team.status === 'ENGAGED' ? 87 : team.status === 'STANDBY' ? 65 : 45,
                      members: team.members
                    }))}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="name" stroke="#9ca3af" fontSize={11} />
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
                      <RechartsBar dataKey="efficiency" fill="#f97316" name="Efficiency %" />
                      <RechartsBar dataKey="responseTime" fill="#06b6d4" name="Response Time (s)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </EmergencyGlassCard>
            </motion.div>
          )}

          {activeSection === 'resource-allocation' && (
            <motion.div
              key="resource-allocation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Resource Allocation Dashboard */}
              <EmergencyGlassCard title="Emergency Resource Allocation & Tracking" icon={Briefcase} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <UserCog className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">156</div>
                    <div className="text-sm text-slate-400">Personnel Deployed</div>
                    <div className="text-xs text-blue-400 mt-2">From 5 Agencies</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Server className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">47</div>
                    <div className="text-sm text-slate-400">Systems Protected</div>
                    <div className="text-xs text-green-400 mt-2">Critical Infrastructure</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Database className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">12.4TB</div>
                    <div className="text-sm text-slate-400">Data Secured</div>
                    <div className="text-xs text-purple-400 mt-2">Backup Completed</div>
                  </div>
                </div>

                {/* Resource Allocation by Incident */}
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={[
                      { incident: 'Power Grid', personnel: 45, systems: 12, budget: 2.4 },
                      { incident: 'Financial DDoS', personnel: 38, systems: 15, budget: 1.8 },
                      { incident: 'Government APT', personnel: 73, systems: 20, budget: 4.2 }
                    ]}>
                      <defs>
                        <linearGradient id="personnelGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="systemsGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="incident" stroke="#9ca3af" fontSize={12} />
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
                        dataKey="personnel"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="url(#personnelGradient)"
                        name="Personnel Allocated"
                      />
                      <Area
                        type="monotone"
                        dataKey="systems"
                        stackId="2"
                        stroke="#10b981"
                        fill="url(#systemsGradient)"
                        name="Systems Protected"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </EmergencyGlassCard>
            </motion.div>
          )}

          {activeSection === 'communication-hub' && (
            <motion.div
              key="communication-hub"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Emergency Communication Hub */}
              <EmergencyGlassCard title="Emergency Communication Hub" icon={Radio} status="ACTIVE">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Emergency Broadcast System */}
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <BellRing className="w-5 h-5 text-red-400 mr-2" />
                      Emergency Broadcast System
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded">
                        <div className="text-red-400 font-semibold text-sm mb-1">CRITICAL ALERT - ACTIVE</div>
                        <div className="text-white text-sm">Nationwide cyber emergency declared. All agencies activate emergency protocols.</div>
                        <div className="text-slate-400 text-xs mt-2">Broadcast to: All Government Agencies, Critical Infrastructure Operators</div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                          Send Alert
                        </button>
                        <button className="flex-1 px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors">
                          Update Status
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Secure Messaging */}
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4 flex items-center">
                      <MessageSquare className="w-5 h-5 text-blue-400 mr-2" />
                      Secure Inter-Agency Messaging
                    </h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded">
                        <div className="text-blue-400 font-semibold text-sm mb-1">From: National Cyber Command</div>
                        <div className="text-white text-sm">Containment protocols activated. All teams report status immediately.</div>
                        <div className="text-slate-400 text-xs mt-2">Priority: URGENT • Encrypted: AES-256</div>
                      </div>
                      <div className="p-3 bg-green-500/10 border border-green-500/30 rounded">
                        <div className="text-green-400 font-semibold text-sm mb-1">From: FBI Cyber Division</div>
                        <div className="text-white text-sm">Forensic analysis complete. Attack vector identified: supply chain compromise.</div>
                        <div className="text-slate-400 text-xs mt-2">Status: RESOLVED • Recipients: Command Center</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Communication Status Dashboard */}
                <div className="mt-6">
                  <h4 className="text-white font-semibold mb-4">Communication Channels Status</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                      { name: 'Emergency Broadcast', status: 'ACTIVE', uptime: '99.9%', users: 1247 },
                      { name: 'Secure Chat', status: 'ACTIVE', uptime: '99.8%', users: 89 },
                      { name: 'Video Conference', status: 'ACTIVE', uptime: '99.7%', users: 156 },
                      { name: 'Alert System', status: 'ACTIVE', uptime: '100%', users: 2034 }
                    ].map((channel) => (
                      <div key={channel.name} className="p-4 bg-slate-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white text-sm font-medium">{channel.name}</span>
                          <div className={`w-2 h-2 rounded-full ${
                            channel.status === 'ACTIVE' ? 'bg-green-400' : 'bg-red-400'
                          }`}></div>
                        </div>
                        <div className="space-y-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Uptime:</span>
                            <span className="text-green-400">{channel.uptime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Active Users:</span>
                            <span className="text-cyan-400">{channel.users}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </EmergencyGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EmergencyCyberResponseCoordination;
