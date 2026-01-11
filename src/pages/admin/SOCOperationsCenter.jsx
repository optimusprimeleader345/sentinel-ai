import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Monitor,
  Users,
  Activity,
  Zap,
  Clock,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageCircle,
  BarChart3,
  PieChart,
  Clock as ClockIcon,
  Target,
  Shield,
  AlertCircle,
  Globe,
  Network,
  Cpu,
  HardDrive,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Video,
  Settings,
  Refresh,
  Filter,
  Search,
  User,
  Building,
  Plus,
  Edit,
  Trash2,
  Bell,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  Radio,
  Radio as RadioIcon
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';

// SOC Operations Data
const socMetrics = {
  totalIncidents: 1247,
  activeNow: 8,
  escalatedToday: 3,
  avgResponseTime: '4.2 minutes',
  analystUtilization: 87,
  successfulBlocks: 98.3,
  falsePositives: 2.1
};

const activeAnalysts = [
  {
    id: 'A001',
    name: 'Sarah Johnson',
    avatar: 'SJ',
    status: 'active',
    role: 'Senior Analyst',
    shift: 'Day Shift (07:00-19:00)',
    activeIncidents: 3,
    efficiency: 94,
    lastActivity: '2 minutes ago',
    assignedCases: ['INC-2025-001', 'INC-2025-008', 'INC-2025-012']
  },
  {
    id: 'A002',
    name: 'Marcus Chen',
    avatar: 'MC',
    status: 'active',
    role: 'Threat Hunter',
    shift: 'Day Shift (07:00-19:00)',
    activeIncidents: 2,
    efficiency: 96,
    lastActivity: '30 seconds ago',
    assignedCases: ['INC-2025-005', 'INC-2025-007']
  },
  {
    id: 'A003',
    name: 'Elena Rodriguez',
    avatar: 'ER',
    status: 'busy',
    role: 'Incident Responder',
    shift: 'Night Shift (19:00-07:00)',
    activeIncidents: 4,
    efficiency: 92,
    lastActivity: '5 minutes ago',
    assignedCases: ['INC-2025-002', 'INC-2025-009', 'INC-2025-011', 'INC-2025-013']
  },
  {
    id: 'A004',
    name: 'David Kim',
    avatar: 'DK',
    status: 'break',
    role: 'SOC Lead',
    shift: 'Day Shift (07:00-19:00)',
    activeIncidents: 0,
    efficiency: 98,
    lastActivity: '12 minutes ago',
    assignedCases: []
  },
  {
    id: 'A005',
    name: 'Aisha Patel',
    avatar: 'AP',
    status: 'off',
    role: 'Forensic Analyst',
    shift: 'Off Duty',
    activeIncidents: 0,
    efficiency: 0,
    lastActivity: '2 hours ago',
    assignedCases: []
  }
];

const escalationQueue = [
  {
    id: 'ESC-001',
    incidentId: 'INC-2025-001',
    title: 'APT28 Email Campaign Detected',
    severity: 'critical',
    timeInQueue: '5 minutes',
    assignedAnalyst: 'Auto-escalating',
    nextAction: 'CISO Notification Required',
    priority: 'executive'
  },
  {
    id: 'ESC-002',
    incidentId: 'INC-2025-008',
    title: 'SQL Injection Attempt',
    severity: 'high',
    timeInQueue: '8 minutes',
    assignedAnalyst: 'Marcus Chen',
    nextAction: 'Database Isolation',
    priority: 'technical'
  },
  {
    id: 'ESC-003',
    incidentId: 'INC-2025-014',
    title: 'Data Exfiltration Alert',
    severity: 'high',
    timeInQueue: '3 minutes',
    assignedAnalyst: 'Awaiting Assignment',
    nextAction: 'DLP Policy Review',
    priority: 'security'
  }
];

const shiftSchedule = {
  current: 'Day Shift (07:00-19:00)',
  next: 'Swing Shift (15:00-23:00)',
  handoffTime: '15:00 IST',
  transitionPrep: 45 // minutes until handover
};

const systemStatus = [
  {
    name: 'SIEM Platform',
    status: 'healthy',
    metric: 98.7,
    incidents: 145,
    alerts: 2340,
    lastUpdate: 'Now'
  },
  {
    name: 'EDR Systems',
    status: 'warning',
    metric: 89.2,
    incidents: 67,
    alerts: 892,
    lastUpdate: '2m ago'
  },
  {
    name: 'Intrusion Prevention',
    status: 'healthy',
    metric: 99.1,
    incidents: 23,
    alerts: 456,
    lastUpdate: '5s ago'
  },
  {
    name: 'Network Perimeter',
    status: 'healthy',
    metric: 97.8,
    incidents: 34,
    alerts: 678,
    lastUpdate: '10s ago'
  },
  {
    name: 'Endpoint Detection',
    status: 'critical',
    metric: 74.5,
    incidents: 89,
    alerts: 1205,
    lastUpdate: '1m ago'
  },
  {
    name: 'Log Aggregation',
    status: 'healthy',
    metric: 96.3,
    incidents: 12,
    alerts: 234,
    lastUpdate: '15s ago'
  }
];

const teamCommunication = [
  {
    sender: 'SOC Lead',
    message: 'Major incident detected - activating crisis protocol',
    time: '08:30 IST',
    type: 'announcement',
    urgent: true
  },
  {
    sender: 'Marcus Chen',
    message: 'Found evidence of lateral movement in INC-2025-005',
    time: '08:32 IST',
    type: 'update',
    urgent: true
  },
  {
    sender: 'Elena Rodriguez',
    message: 'DLP alert triggered for executive communications',
    time: '08:35 IST',
    type: 'alert',
    urgent: false
  },
  {
    sender: 'System',
    message: 'Automated backup verification initiated',
    time: '08:37 IST',
    type: 'automation',
    urgent: false
  }
];

const performanceMetrics = [
  { name: 'MTTR (Mean Time to Respond)', value: '2.8 minutes', trend: 'down', change: '-0.3m' },
  { name: 'MTTD (Mean Time to Detect)', value: '4.1 minutes', trend: 'up', change: '+1.2m' },
  { name: 'Case Closure Rate', value: '96.8%', trend: 'up', change: '+2.1%' },
  { name: 'Escalation Rate', value: '3.2%', trend: 'down', change: '-0.8%' },
  { name: 'False Positive Rate', value: '21.1%', trend: 'down', change: '-1.2%' },
  { name: 'Analyst Satisfaction', value: '94.3%', trend: 'up', change: '+3.1%' }
];

const SOCOperationsCenter = () => {
  const [selectedView, setSelectedView] = useState('dashboard');
  const [selectedAnalyst, setSelectedAnalyst] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [micEnabled, setMicEnabled] = useState(false);
  const [speakerEnabled, setSpeakerEnabled] = useState(true);
  const [onCallStatus, setOnCallStatus] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'busy': return 'text-orange-400 bg-orange-500/20';
      case 'break': return 'text-blue-400 bg-blue-500/20';
      case 'off': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSystemStatusColor = (status) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'executive': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'security': return 'bg-orange-500/20 text-orange-400 border border-orange-500/30';
      case 'technical': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border border-blue-500/30';
    }
  };

  const filteredAnalysts = activeAnalysts.filter(analyst => {
    return filterStatus === 'all' || analyst.status === filterStatus;
  });

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg shadow-lg">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              SOC Operations Center
            </h1>
            <p className="text-slate-400 text-sm">Enterprise SOC Mission Control & Real-Time Operations Hub</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">8</span>
              <span className="text-xs text-slate-400">Active Incidents</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">5</span>
              <span className="text-xs text-slate-400">Active Analysts</span>
            </div>
          </div>

          {/* Communication Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setMicEnabled(!micEnabled)}
              className={`p-2 rounded-lg ${micEnabled ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'} transition-colors`}
            >
              {micEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setSpeakerEnabled(!speakerEnabled)}
              className={`p-2 rounded-lg ${speakerEnabled ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'} transition-colors`}
            >
              {speakerEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
              onCallStatus ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              {onCallStatus ? 'ON CALL' : 'OFF CALL'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* View Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'dashboard', label: 'Operations Dashboard', icon: Monitor },
          { id: 'analysts', label: 'Team Management', icon: Users },
          { id: 'systems', label: 'System Status', icon: Network },
          { id: 'communications', label: 'Communications', icon: MessageCircle }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Based on Selected View */}
      {selectedView === 'dashboard' && (
        <>
          {/* SOC Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Active Incidents', value: socMetrics.activeNow, change: '+2', icon: AlertTriangle, color: 'text-red-400' },
              { title: 'Escalated Today', value: socMetrics.escalatedToday, change: '0', icon: TrendingUp, color: 'text-orange-400' },
              { title: 'Avg Response Time', value: socMetrics.avgResponseTime, change: '-0.3m', icon: Clock, color: 'text-blue-400' },
              { title: 'Block Success', value: socMetrics.successfulBlocks + '%', change: '+1.2%', icon: Shield, color: 'text-green-400' }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs text-slate-400 mb-2">{metric.title}</div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    metric.change?.startsWith('+') || metric.change?.startsWith('-0.3') ? 'bg-green-500/20 text-green-400' :
                    metric.change?.startsWith('-') && !metric.change.startsWith('-0.3') ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {metric.change}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Central Operations Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

            {/* Escalation Queue */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="xl:col-span-2"
            >
              <GlassCard title="Critical Escalation Queue" icon={AlertTriangle}>
                <div className="space-y-4">
                  {escalationQueue.map((escalation, index) => (
                    <motion.div
                      key={escalation.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 bg-slate-800/50 rounded-lg border border-slate-600/30"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(escalation.severity)}`}>
                            {escalation.severity}
                          </span>
                          <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getPriorityBadge(escalation.priority)}`}>
                            {escalation.priority}
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs text-slate-400">Queue Time</div>
                          <div className="text-sm font-semibold text-orange-400">{escalation.timeInQueue}</div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <h4 className="text-white font-semibold">{escalation.title}</h4>
                        <p className="text-sm text-slate-400">ID: {escalation.incidentId}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs text-slate-400">Assigned To:</span>
                          <div className="text-sm text-white font-medium">{escalation.assignedAnalyst}</div>
                        </div>
                        <div>
                          <span className="text-xs text-slate-400">Next Action:</span>
                          <div className="text-sm text-cyan-400">{escalation.nextAction}</div>
                        </div>
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-sm transition-colors">
                          Assign Analyst
                        </button>
                        <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-sm transition-colors">
                          Execute Action
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700/50">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Showing {escalationQueue.length} critical escalations</span>
                    <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-sm transition-colors">
                      View All Queue
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Shift Status & Team Performance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >

              {/* Current Shift Status */}
              <GlassCard title="Shift Management" icon={Clock}>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-slate-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-white mb-1">{shiftSchedule.current}</div>
                    <div className="text-sm text-slate-400 mb-3">Current Active Shift</div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400">Next Handoff:</span>
                      <span className="text-cyan-400 font-semibold">{shiftSchedule.handoffTime}</span>
                    </div>
                    <div className="mt-3">
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${(shiftSchedule.transitionPrep / 480) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {shiftSchedule.transitionPrep} minutes until transition
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>

              {/* Performance Metrics */}
              <GlassCard title="Key Performance Indicators" icon={BarChart3}>
                <div className="space-y-3">
                  {performanceMetrics.slice(0, 3).map((metric, index) => (
                    <motion.div
                      key={metric.name}
                      initial={{ opacity: 0, x: 10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between py-2"
                    >
                      <div className="flex-1">
                        <div className="text-sm font-medium text-slate-300">{metric.name}</div>
                        <div className="text-lg font-bold text-white">{metric.value}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-semibold ${
                        metric.trend === 'up' && metric.change.startsWith('+') ? 'bg-green-500/20 text-green-400' :
                        metric.trend === 'down' && metric.change.startsWith('-') ? 'bg-green-500/20 text-green-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {metric.change}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </>
      )}

      {/* Team Management View */}
      {selectedView === 'analysts' && (
        <div className="space-y-6">

          {/* Team Filter */}
          <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-lg">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Filter by Status:</span>
            </div>
            {[
              { value: 'all', label: 'All Status' },
              { value: 'active', label: 'Active' },
              { value: 'busy', label: 'Busy' },
              { value: 'break', label: 'Break' },
              { value: 'off', label: 'Off Duty' }
            ].map(status => (
              <button
                key={status.value}
                onClick={() => setFilterStatus(status.value)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  filterStatus === status.value
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                {status.label}
              </button>
            ))}
          </div>

          {/* Analyst Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAnalysts.map((analyst, index) => (
              <motion.div
                key={analyst.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-800/50 rounded-lg p-6 cursor-pointer hover:bg-slate-700/50 transition-colors"
                onClick={() => setSelectedAnalyst(analyst)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                    {analyst.avatar}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{analyst.name}</h3>
                    <p className="text-sm text-slate-400">{analyst.role}</p>
                  </div>
                  <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(analyst.status)}`}>
                    {analyst.status}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Active Incidents:</span>
                    <span className="text-white font-semibold">{analyst.activeIncidents}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Efficiency:</span>
                    <span className={`font-semibold ${
                      analyst.efficiency >= 95 ? 'text-green-400' :
                      analyst.efficiency >= 85 ? 'text-yellow-400' :
                      'text-red-400'
                    }`}>
                      {analyst.efficiency}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-400">Last Activity:</span>
                    <span className="text-cyan-400">{analyst.lastActivity}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700/50">
                  <div className="text-xs text-slate-400 mb-2">Shift: {analyst.shift}</div>
                  {analyst.assignedCases.length > 0 && (
                    <div className="space-y-1">
                      <div className="text-xs text-slate-400">Current Cases:</div>
                      <div className="flex flex-wrap gap-1">
                        {analyst.assignedCases.slice(0, 2).map(caseId => (
                          <span key={caseId} className="text-xs px-2 py-1 bg-slate-700/50 text-slate-300 rounded">
                            {caseId}
                          </span>
                        ))}
                        {analyst.assignedCases.length > 2 && (
                          <span className="text-xs px-2 py-1 bg-slate-700/50 text-slate-500 rounded">
                            +{analyst.assignedCases.length - 2}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Systems View */}
      {selectedView === 'systems' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemStatus.map((system, index) => (
            <motion.div
              key={system.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{system.name}</h3>
                <div className={`flex items-center space-x-2 px-2 py-1 rounded-full text-xs font-semibold ${
                  system.status === 'healthy' ? 'bg-green-500/20 text-green-400' :
                  system.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-red-500/20 text-red-400'
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    system.status === 'healthy' ? 'bg-green-400' :
                    system.status === 'warning' ? 'bg-yellow-400' :
                    'bg-red-400'
                  }`}></div>
                  <span>{system.status}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Health Score:</span>
                  <span className={`font-semibold ${getSystemStatusColor(system.status)}`}>
                    {system.metric}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Incidents:</span>
                  <span className="text-red-400 font-semibold">{system.incidents}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Alerts Processed:</span>
                  <span className="text-cyan-400 font-semibold">{system.alerts.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Update:</span>
                  <span className="text-green-400">{system.lastUpdate}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-1000 ${
                      system.status === 'healthy' ? 'bg-green-500' :
                      system.status === 'warning' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${system.metric}%` }}
                  ></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Communications View */}
      {selectedView === 'communications' && (
        <div className="space-y-6">
          <GlassCard title="Team Communications Center" icon={MessageCircle}>
            <div className="space-y-4">
              {teamCommunication.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-4 rounded-lg ${
                    msg.urgent
                      ? 'bg-red-500/10 border border-red-500/20'
                      : 'bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        msg.sender === 'SOC Lead' ? 'bg-purple-500 text-white' :
                        msg.sender === 'System' ? 'bg-blue-500 text-white' :
                        'bg-slate-600 text-white'
                      }`}>
                        {msg.sender.split(' ').map(word => word[0]).join('')}
                      </div>
                      <div>
                        <span className="text-white font-medium">{msg.sender}</span>
                        {msg.urgent && (
                          <span className="ml-2 inline-flex px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400">
                            URGENT
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400">{msg.time}</span>
                  </div>
                  <p className="text-slate-300 ml-10">{msg.message}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Communication Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Phone, label: 'Emergency Call', status: onCallStatus ? 'Active' : 'Inactive', color: onCallStatus ? 'green' : 'red' },
              { icon: Video, label: 'Video Conference', status: 'Available', color: 'blue' },
              { icon: RadioIcon, label: 'Team Radio', status: 'Connected', color: 'cyan' },
              { icon: Bell, label: 'Alert Broadcast', status: 'Ready', color: 'orange' }
            ].map((control, index) => {
              const Icon = control.icon;
              return (
                <motion.div
                  key={control.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-800/50 rounded-lg p-6 text-center"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 ${
                    control.color === 'green' ? 'bg-green-500/20' :
                    control.color === 'red' ? 'bg-red-500/20' :
                    control.color === 'blue' ? 'bg-blue-500/20' :
                    control.color === 'cyan' ? 'bg-cyan-500/20' :
                    'bg-orange-500/20'
                  }`}>
                    <Icon className={`w-6 h-6 ${
                      control.color === 'green' ? 'text-green-400' :
                      control.color === 'red' ? 'text-red-400' :
                      control.color === 'blue' ? 'text-blue-400' :
                      control.color === 'cyan' ? 'text-cyan-400' :
                      'text-orange-400'
                    }`} />
                  </div>
                  <h3 className="text-white font-semibold mb-1">{control.label}</h3>
                  <p className={`text-xs font-medium ${
                    control.status === 'Active' ? 'text-green-400' :
                    control.status === 'Inactive' ? 'text-red-400' :
                    'text-slate-400'
                  }`}>
                    {control.status}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default SOCOperationsCenter;
