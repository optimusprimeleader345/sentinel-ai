import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  Shield,
  Clock,
  Users,
  Activity,
  Zap,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  FileText,
  Target,
  ArrowRight,
  ArrowLeft,
  Pause,
  Play,
  RotateCcw,
  User,
  Building,
  Phone,
  Mail,
  Calendar,
  TrendingUp,
  Database,
  Network,
  AlertCircle,
  Clock as ClockIcon,
  BarChart3,
  PieChart,
  TrendingDown,
  Settings,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  MoreHorizontal,
  Globe
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';

// Enterprise Incident Response Data
const activeIncidents = [
  {
    id: 'INC-2025-001',
    title: 'APT28 Spear Phishing Campaign',
    severity: 'critical',
    status: 'active',
    priority: 'high',
    category: 'Advanced Persistent Threat',
    affectedSystems: 3,
    impactedUsers: 24,
    detectionSource: 'Threat Intelligence Feed',
    createdAt: '2024-01-15T14:32:00Z',
    assignedTo: 'SOC Team Alpha',
    sla: 95,
    phases: [
      { name: 'Detection', completed: true, timestamp: '2024-01-15T14:32:00Z' },
      { name: 'Analysis', completed: true, timestamp: '2024-01-15T14:45:00Z' },
      { name: 'Containment', completed: false, timestamp: null },
      { name: 'Eradication', completed: false, timestamp: null },
      { name: 'Recovery', completed: false, timestamp: null },
      { name: 'Lessons Learned', completed: false, timestamp: null }
    ],
    automatedActions: ['Quarantine Endpoints', 'Block IOCs', 'Notify Executives'],
    manualActions: ['Contact FBI', 'Exec Briefing', 'Public Statement Prep'],
    threatActors: ['APT28 (Fancy Bear)'],
    businessImpact: 'High - Executive Communications Compromised'
  },
  {
    id: 'INC-2025-002',
    title: 'Ransomware Deployment Vector',
    severity: 'high',
    status: 'contained',
    priority: 'medium',
    category: 'Ransomware',
    affectedSystems: 12,
    impactedUsers: 45,
    detectionSource: 'Endpoint Detection',
    createdAt: '2024-01-15T11:15:00Z',
    assignedTo: 'SOC Team Beta',
    sla: 82,
    phases: [
      { name: 'Detection', completed: true, timestamp: '2024-01-15T11:15:00Z' },
      { name: 'Analysis', completed: true, timestamp: '2024-01-15T11:30:00Z' },
      { name: 'Containment', completed: true, timestamp: '2024-01-15T12:00:00Z' },
      { name: 'Eradication', completed: false, timestamp: null },
      { name: 'Recovery', completed: false, timestamp: null },
      { name: 'Lessons Learned', completed: false, timestamp: null }
    ],
    automatedActions: ['Isolate Network', 'Kill Encryptions', 'Backup Verification'],
    manualActions: ['Decrypt Negotiation', 'Ransom Payment Analysis'],
    threatActors: ['LockBit Group'],
    businessImpact: 'Medium - File Server Encryption'
  },
  {
    id: 'INC-2025-003',
    title: 'Supply Chain Compromise',
    severity: 'medium',
    status: 'investigating',
    priority: 'low',
    category: 'Supply Chain Attack',
    affectedSystems: 1,
    impactedUsers: 5,
    detectionSource: 'Application Monitoring',
    createdAt: '2024-01-15T09:20:00Z',
    assignedTo: 'SOC Team Gamma',
    sla: 67,
    phases: [
      { name: 'Detection', completed: true, timestamp: '2024-01-15T09:20:00Z' },
      { name: 'Analysis', completed: false, timestamp: null },
      { name: 'Containment', completed: false, timestamp: null },
      { name: 'Eradication', completed: false, timestamp: null },
      { name: 'Recovery', completed: false, timestamp: null },
      { name: 'Lessons Learned', completed: false, timestamp: null }
    ],
    automatedActions: ['Block Application', 'Log Analysis'],
    manualActions: ['Vendor Contact', 'Forensic Investigation'],
    threatActors: ['Unknown'],
    businessImpact: 'Low - Single Application Affected'
  },
  {
    id: 'INC-2025-004',
    title: 'DDoS Attack Campaign',
    severity: 'high',
    status: 'mitigated',
    priority: 'medium',
    category: 'Denial of Service',
    affectedSystems: 8,
    impactedUsers: 1200,
    detectionSource: 'Network Monitoring',
    createdAt: '2024-01-14T23:45:00Z',
    assignedTo: 'SOC Team Delta',
    sla: 94,
    phases: [
      { name: 'Detection', completed: true, timestamp: '2024-01-14T23:45:00Z' },
      { name: 'Analysis', completed: true, timestamp: '2024-01-15T00:15:00Z' },
      { name: 'Containment', completed: true, timestamp: '2024-01-15T00:30:00Z' },
      { name: 'Eradication', completed: true, timestamp: '2024-01-15T02:00:00Z' },
      { name: 'Recovery', completed: true, timestamp: '2024-01-15T03:30:00Z' },
      { name: 'Lessons Learned', completed: false, timestamp: null }
    ],
    automatedActions: ['Rate Limiting', 'CDN Scaling', 'Traffic Filtering'],
    manualActions: ['ISP Coordination', 'Traffic Analysis'],
    threatActors: ['Mirai Botnet'],
    businessImpact: 'High - Website Unavailability'
  }
];

const responsePlaybooks = [
  {
    id: 'PB-APT-001',
    name: 'APT Response Standard',
    description: 'Advanced persistent threat containment and eradication',
    steps: 12,
    executionTime: '4-6 hours',
    successRate: 92,
    lastUsed: '2024-01-15T14:48:00Z'
  },
  {
    id: 'PB-RANSOM-002',
    name: 'Ransomware Incident Guide',
    description: 'Ransomware attack mitigation and recovery procedures',
    steps: 18,
    executionTime: '8-12 hours',
    successRate: 88,
    lastUsed: '2024-01-15T12:05:00Z'
  },
  {
    id: 'PB-DDOS-003',
    name: 'DDoS Mitigation Protocol',
    description: 'Distributed denial of service attack response',
    steps: 8,
    executionTime: '1-2 hours',
    successRate: 97,
    lastUsed: '2024-01-15T03:45:00Z'
  },
  {
    id: 'PB-PHISHER-004',
    name: 'Phishing Campaign Response',
    description: 'Mass phishing attack remediation procedures',
    steps: 6,
    executionTime: '2-3 hours',
    successRate: 94,
    lastUsed: '2024-01-14T15:30:00Z'
  }
];

const stakeholderNotifications = [
  { role: 'CEO', method: 'Email + SMS', notified: true, acknowledged: true },
  { role: 'CISO', method: 'Email + Phone', notified: true, acknowledged: true },
  { role: 'CTO', method: 'Email', notified: true, acknowledged: false },
  { role: 'Legal Counsel', method: 'Email', notified: false, acknowledged: false },
  { role: 'Board Member', method: 'Email + Phone', notified: true, acknowledged: true }
];

const orchestratorMetrics = {
  totalIncidents: 1247,
  activeIncidents: 3,
  resolvedToday: 8,
  averageResolutionTime: '4.2 hours',
  automationSuccessRate: 94.7,
  falsePositiveRate: 2.3,
  mttr: '2.8 hours'
};

const systemIntegrations = [
  {
    name: 'SIEM Platform',
    status: 'active',
    lastSync: 'Now',
    incidentsReceived: 145,
    alertsProcessed: 2340
  },
  {
    name: 'EDR Solutions',
    status: 'active',
    lastSync: '30s ago',
    incidentsReceived: 67,
    alertsProcessed: 892
  },
  {
    name: 'Threat Intelligence Feeds',
    status: 'active',
    lastSync: '5m ago',
    incidentsReceived: 23,
    alertsProcessed: 456
  },
  {
    name: 'Identity Management',
    status: 'active',
    lastSync: '15s ago',
    incidentsReceived: 12,
    alertsProcessed: 234
  },
  {
    name: 'Email Security Gateway',
    status: 'active',
    lastSync: '2m ago',
    incidentsReceived: 89,
    alertsProcessed: 1205
  },
  {
    name: 'Network Perimeter',
    status: 'active',
    lastSync: '10s ago',
    incidentsReceived: 34,
    alertsProcessed: 678
  }
];

const EnterpriseIncidentResponseOrchestrator = () => {
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOrchestrator, setShowOrchestrator] = useState(false);

  const filteredIncidents = activeIncidents.filter(incident => {
    const matchesStatus = filterStatus === 'all' || incident.status === filterStatus;
    const matchesSeverity = filterSeverity === 'all' || incident.severity === filterSeverity;
    const matchesSearch = searchQuery === '' ||
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/20';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/20';
      case 'contained': return 'text-blue-400 bg-blue-500/20';
      case 'mitigated': return 'text-green-400 bg-green-500/20';
      case 'resolved': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return AlertTriangle;
      case 'investigating': return Eye;
      case 'contained': return Shield;
      case 'mitigated': return CheckCircle;
      case 'resolved': return CheckCircle;
      default: return Activity;
    }
  };

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              Enterprise Incident Response Orchestrator
            </h1>
            <p className="text-slate-400 text-sm">SOC Command Center & Automated Incident Response Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-white">3</span>
            <span className="text-xs text-slate-400">Active Incidents</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-white">94.7%</span>
            <span className="text-xs text-slate-400">Auto Success Rate</span>
          </div>
          <button
            onClick={() => setShowOrchestrator(true)}
            className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-bold text-white hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-200 flex items-center space-x-2"
          >
            <Zap className="w-4 h-4" />
            <span>Operator Mode</span>
          </button>
        </div>
      </motion.div>

      {/* Orchestrator Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Incidents', value: orchestratorMetrics.activeIncidents, change: '+1', icon: AlertTriangle, color: 'text-red-400' },
          { title: 'Resolved Today', value: orchestratorMetrics.resolvedToday, change: '+3', icon: CheckCircle, color: 'text-green-400' },
          { title: 'Avg Resolution Time', value: orchestratorMetrics.mttr, change: '-0.3h', icon: Clock, color: 'text-blue-400' },
          { title: 'Automation Rate', value: orchestratorMetrics.automationSuccessRate + '%', change: '+2.1%', icon: Zap, color: 'text-purple-400' }
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

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Active Incidents Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="xl:col-span-2"
        >
          <GlassCard title="Active Incident Response" icon={AlertTriangle}>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/40 rounded-lg">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search incidents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="investigating">Investigating</option>
                <option value="contained">Contained</option>
                <option value="mitigated">Mitigated</option>
                <option value="resolved">Resolved</option>
              </select>

              <select
                value={filterSeverity}
                onChange={(e) => setFilterSeverity(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="all">All Severity</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            {/* Incidents List */}
            <div className="space-y-4">
              {filteredIncidents.map((incident, index) => {
                const StatusIcon = getStatusIcon(incident.status);
                const completedPhases = incident.phases.filter(p => p.completed).length;
                const totalPhases = incident.phases.length;
                const progressPercent = (completedPhases / totalPhases) * 100;

                return (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                    onClick={() => setSelectedIncident(incident)}
                  >
                    {/* Incident Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className={`w-6 h-6 ${incident.status === 'active' ? 'text-red-400' : incident.status === 'investigating' ? 'text-yellow-400' : 'text-green-400'}`} />
                        <div>
                          <h3 className="text-lg font-semibold text-white">{incident.title}</h3>
                          <p className="text-xs text-slate-400">{incident.id} • {incident.category}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(incident.severity)}`}>
                          {incident.severity}
                        </span>
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(incident.status)}`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>

                    {/* Incident Metrics */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Systems</div>
                        <div className="text-lg font-bold text-orange-400">{incident.affectedSystems}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Users</div>
                        <div className="text-lg font-bold text-cyan-400">{incident.impactedUsers}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">SLA</div>
                        <div className={`text-lg font-bold ${incident.sla >= 90 ? 'text-green-400' : incident.sla >= 75 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {incident.sla}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Phase</div>
                        <div className="text-lg font-bold text-blue-400">
                          {completedPhases}/{totalPhases}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-slate-400 mb-1">
                        <span>Response Progress</span>
                        <span>{Math.round(progressPercent)}%</span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            incident.severity === 'critical' ? 'bg-red-500' :
                            incident.severity === 'high' ? 'bg-orange-500' :
                            incident.severity === 'medium' ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Incident Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">Assigned:</span>
                        <span className="text-white ml-2">{incident.assignedTo}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">Source:</span>
                        <span className="text-white ml-2">{incident.detectionSource}</span>
                      </div>
                    </div>

                    {/* Action Summary */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      <div className="text-xs text-slate-400">Actions:</div>
                      {incident.automatedActions.slice(0, 2).map((action, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">
                          {action.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {incident.manualActions.slice(0, 1).map((action, idx) => (
                        <span key={idx} className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded">
                          {action.replace(/_/g, ' ')}
                        </span>
                      ))}
                      {(incident.automatedActions.length + incident.manualActions.length) > 3 && (
                        <span className="text-xs px-2 py-1 bg-slate-500/20 text-slate-400 rounded">
                          +{(incident.automatedActions.length + incident.manualActions.length) - 3} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Control Panels */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          {/* Response Playbooks */}
          <GlassCard title="Response Playbooks" icon={FileText}>
            <div className="space-y-3">
              {responsePlaybooks.map((playbook, index) => (
                <motion.div
                  key={playbook.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                >
                  <h4 className="text-sm font-semibold text-white mb-1">{playbook.name}</h4>
                  <p className="text-xs text-slate-400 mb-2">{playbook.description}</p>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-slate-400">{playbook.steps} steps</span>
                    <span className="text-green-400">{playbook.successRate}% success</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    {playbook.executionTime} • Last used {new Date(playbook.lastUsed).toLocaleDateString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* System Integrations Status */}
          <GlassCard title="System Integrations" icon={Network}>
            <div className="space-y-3">
              {systemIntegrations.map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-3 px-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{system.name}</div>
                    <div className="text-xs text-slate-400">Sync: {system.lastSync}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      system.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                    }`}></div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">{system.incidentsReceived} inc</div>
                      <div className="text-xs text-cyan-400">{system.alertsProcessed} alerts</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Stakeholder Communication */}
          <GlassCard title="Stakeholder Notifications" icon={MessageSquare}>
            <div className="space-y-2">
              {stakeholderNotifications.map((stakeholder, index) => (
                <motion.div
                  key={stakeholder.role}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex-1">
                    <div className="text-sm text-white">{stakeholder.role}</div>
                    <div className="text-xs text-slate-400">{stakeholder.method}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!stakeholder.notified && (
                      <button className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">
                        Notify
                      </button>
                    )}
                    {stakeholder.notified && !stakeholder.acknowledged && (
                      <div className="text-yellow-400">⏳</div>
                    )}
                    {stakeholder.acknowledged && (
                      <CheckCircle className="w-4 h-4 text-green-400" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

        </motion.div>
      </div>

      {/* Incident Detail Modal */}
      <AnimatePresence>
        {selectedIncident && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedIncident(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedIncident.title}</h2>
                    <p className="text-slate-400">{selectedIncident.id} • {selectedIncident.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedIncident.severity)}`}>
                    {selectedIncident.severity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedIncident.status)}`}>
                    {selectedIncident.status}
                  </span>
                  <button onClick={() => setSelectedIncident(null)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                  {/* Incident Response Timeline */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Clock className="w-5 h-5 text-cyan-400" />
                      <span>Response Timeline</span>
                    </h3>
                    <div className="space-y-4">
                      {selectedIncident.phases.map((phase, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            phase.completed ? 'bg-green-500/20 text-green-400' : 'bg-slate-700 text-slate-400'
                          }`}>
                            {phase.completed ? (
                              <CheckCircle className="w-4 h-4" />
                            ) : (
                              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="text-sm font-medium text-white">{phase.name}</div>
                              {phase.completed && (
                                <div className="text-xs text-slate-400">
                                  {new Date(phase.timestamp).toLocaleString()}
                                </div>
                              )}
                            </div>
                            {!phase.completed && index === selectedIncident.phases.findIndex(p => !p.completed) && (
                              <button className="mt-2 px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs transition-colors">
                                Start Phase
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Orchestration */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <span>Action Orchestration</span>
                    </h3>

                    {/* Automated Actions */}
                    <div className="mb-6">
                      <h4 className="text-md font-medium text-white mb-3">Automated Actions</h4>
                      <div className="space-y-2">
                        {selectedIncident.automatedActions.map((action, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                            <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                            <span className="text-sm text-white">{action.replace(/_/g, ' ')}</span>
                            <div className="ml-auto flex items-center space-x-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-xs text-green-400">Executed</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Manual Actions */}
                    <div>
                      <h4 className="text-md font-medium text-white mb-3">Manual Actions Required</h4>
                      <div className="space-y-2">
                        {selectedIncident.manualActions.map((action, index) => (
                          <div key={index} className="flex items-center space-x-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                            <User className="w-4 h-4 text-orange-400 flex-shrink-0" />
                            <span className="text-sm text-white">{action.replace(/_/g, ' ')}</span>
                            <div className="ml-auto">
                              <button className="px-2 py-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 rounded text-xs transition-colors">
                                Start
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-6 flex space-x-2">
                      <button className="flex-1 px-3 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded text-sm font-medium transition-colors">
                        Generate Report
                      </button>
                      <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-sm font-medium transition-colors">
                        Escalate Incident
                      </button>
                    </div>
                  </div>
                </div>

                {/* Incident Communications */}
                <div className="mt-6 pt-6 border-t border-slate-700/50">
                  <h3 className="text-lg font-semibold text-white mb-4">Incident Communications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">

                    {/* Detection Source */}
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Database className="w-4 h-4 text-blue-400" />
                        <span className="text-slate-400 font-medium">Detection Source</span>
                      </div>
                      <div className="text-white">{selectedIncident.detectionSource}</div>
                      <div className="text-xs text-slate-400 mt-1">Automated detection</div>
                    </div>

                    {/* Business Impact */}
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <TrendingDown className="w-4 h-4 text-red-400" />
                        <span className="text-slate-400 font-medium">Business Impact</span>
                      </div>
                      <div className="text-white">{selectedIncident.businessImpact}</div>
                      <div className="text-xs text-slate-400 mt-1">High priority assessment</div>
                    </div>

                    {/* Threat Actor Intelligence */}
                    <div className="bg-slate-800/50 p-4 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Target className="w-4 h-4 text-orange-400" />
                        <span className="text-slate-400 font-medium">Threat Actor</span>
                      </div>
                      <div className="text-white">{selectedIncident.threatActors[0]}</div>
                      <div className="text-xs text-slate-400 mt-1">Intelligence correlated</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orchestrator Operator Mode */}
      <AnimatePresence>
        {showOrchestrator && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl w-full h-full max-w-7xl max-h-[95vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between bg-gradient-to-r from-red-500/10 to-orange-500/10">
                <div className="flex items-center space-x-4">
                  <Shield className="w-8 h-8 text-orange-400" />
                  <div>
                    <h2 className="text-2xl font-bold text-white">SOC Operations Center</h2>
                    <p className="text-slate-400">Enterprise Incident Response Command Center</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-sm">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
                    <span className="text-white">3 Active Incidents</span>
                  </div>
                  <button onClick={() => setShowOrchestrator(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 h-[calc(100%-120px)] overflow-y-auto">
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 h-full">

                  {/* Active Incident Command */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <span>Active Incident Command</span>
                    </h3>
                    {activeIncidents.slice(0, 1).map(incident => {
                      const completedPhases = incident.phases.filter(p => p.completed).length;
                      const totalPhases = incident.phases.length;
                      const progressPercent = (completedPhases / totalPhases) * 100;

                      return (
                        <div key={incident.id} className="bg-slate-800/50 rounded-lg p-4">
                          <div className="mb-4">
                            <h4 className="text-white font-semibold">{incident.title}</h4>
                            <p className="text-slate-400 text-sm">{incident.category} • {incident.severity}</p>
                          </div>

                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-slate-400">Response Progress</span>
                              <span className="text-white">{Math.round(progressPercent)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-3">
                              <div
                                className="bg-red-500 h-3 rounded-full transition-all duration-1000"
                                style={{ width: `${progressPercent}%` }}
                              ></div>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-slate-400 text-sm">Next Action:</span>
                              <span className="text-cyan-400 text-sm font-medium">Containment Phase</span>
                            </div>
                            <div className="flex space-x-2">
                              <button className="flex-1 px-3 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-sm transition-colors">
                                Execute Playbook
                              </button>
                              <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-sm transition-colors">
                                Update Stakeholders
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Systems Orchestration Status */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center space-x-2">
                      <Network className="w-5 h-5 text-green-400" />
                      <span>Systems Orchestration</span>
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {systemIntegrations.slice(0, 6).map(system => (
                        <div key={system.id} className="bg-slate-800/50 rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white text-sm font-medium">{system.name}</span>
                            <div className={`flex items-center space-x-1 text-xs ${
                              system.status === 'active' ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                              <div className={`w-2 h-2 rounded-full ${
                                system.status === 'active' ? 'bg-green-400' : 'bg-yellow-400'
                              }`}></div>
                              <span>{system.status}</span>
                            </div>
                          </div>
                          <div className="flex justify-between text-xs text-slate-400">
                            <span>Last sync: {system.lastSync}</span>
                            <span>
                              {system.incidentsReceived} inc / {system.alertsProcessed} alerts
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnterpriseIncidentResponseOrchestrator;
