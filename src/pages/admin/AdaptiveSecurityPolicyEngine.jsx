import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Lock,
  Zap,
  Eye,
  Settings,
  FileText,
  CheckCircle,
  AlertTriangle,
  Plus,
  Edit,
  Trash2,
  Monitor,
  Network,
  Database,
  Users,
  Globe,
  Activity,
  Clock,
  Target,
  Filter,
  Search,
  Save,
  Play,
  Pause,
  RotateCcw,
  BarChart3,
  PieChart,
  TrendingUp,
  X
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';

// Adaptive Security Policy Data
const activePolicies = [
  {
    id: 'POL-APT-001',
    name: 'APT Threat Response',
    type: 'Adaptive',
    status: 'active',
    priority: 'critical',
    triggers: ['APT29_Activity', 'Lateral_Movement_Detected'],
    conditions: ['High_Confidence', 'Critical_Assets'],
    actions: ['Isolate_Segment', 'Enhanced_Monitoring', 'Push_Defense_Playbook'],
    effectiveness: 94,
    violations: 3,
    lastTriggered: '2024-01-15T14:23:00Z',
    createdBy: 'SOC Director'
  },
  {
    id: 'POL-ZERO-002',
    name: 'Zero Trust Network Access',
    type: 'Zero Trust',
    status: 'active',
    priority: 'high',
    triggers: ['Unusual_Network_Pattern', 'Geographic_Anomaly'],
    conditions: ['Non_Corp_Network', 'High_Risk_Country'],
    actions: ['MFA_Challenge', 'VPNCert_Required', 'StepUp_Auth'],
    effectiveness: 87,
    violations: 12,
    lastTriggered: '2024-01-15T13:45:00Z',
    createdBy: 'Security Admin'
  },
  {
    id: 'POL-RANSOM-003',
    name: 'Ransomware Prevention Suite',
    type: 'Detection',
    status: 'active',
    priority: 'critical',
    triggers: ['File_Encryption_Spike', 'RansomNote_Detected'],
    conditions: ['Multiple_Files_Affected', 'Network_Isolation'],
    actions: ['Kill_Process', 'Isolate_Endpoint', 'Backup_Verification', 'Notify_IR_Team'],
    effectiveness: 98,
    violations: 1,
    lastTriggered: '2024-01-15T08:12:00Z',
    createdBy: 'Operations Lead'
  },
  {
    id: 'POL-DATA-004',
    name: 'Data Breach Containment',
    type: 'Containment',
    status: 'draft',
    priority: 'critical',
    triggers: ['DLP_Alert', 'Exfiltration_Spike'],
    conditions: ['PII_Detected', 'Large_Data_Transfer'],
    actions: ['Block_Data_Flow', 'Notify_Compliance', 'Log_For_Audit'],
    effectiveness: 0,
    violations: 0,
    lastTriggered: 'Never',
    createdBy: 'Compliance Officer'
  },
  {
    id: 'POL-PATCH-005',
    name: 'Vulnerability Management',
    type: 'Compliance',
    status: 'active',
    priority: 'medium',
    triggers: ['Critical_Vuln_Discovered', 'Unpatched_System'],
    conditions: ['Exploitation_Risk_High', 'Assets_Exposed'],
    actions: ['Notify_Admins', 'Auto_Quarantine', 'Force_Patch'],
    effectiveness: 76,
    violations: 23,
    lastTriggered: '2024-01-15T12:30:00Z',
    createdBy: 'System Admin'
  }
];

const policyTemplates = [
  {
    name: 'APT Defense Template',
    description: 'Automated response to advanced persistent threats',
    triggers: ['Spear Phishing', 'Zero Day Exploits', 'Lateral Movement'],
    actions: ['Isolate', 'Monitor', 'Alert'],
    category: 'Adaptive'
  },
  {
    name: 'Zero Trust Template',
    description: 'Continuous verification and least privilege access',
    triggers: ['Location Change', 'Device Risk', 'Time Based'],
    actions: ['Challenge', 'Restrict', 'Log'],
    category: 'Zero Trust'
  },
  {
    name: 'Ransomware Defense',
    description: 'Behavioral detection and rapid containment',
    triggers: ['Encryption Spikes', 'Ransom Notes', 'Malware Signatures'],
    actions: ['Kill', 'Isolate', 'Backup'],
    category: 'Detection'
  },
  {
    name: 'Data Loss Prevention',
    description: 'Sensitive data protection and monitoring',
    triggers: ['DLP Violation', 'Exfiltration', 'PII Detection'],
    actions: ['Block', 'Alert', 'Quarantine'],
    category: 'Compliance'
  }
];

const policyStats = {
  totalPolicies: 5,
  activePolicies: 4,
  draftPolicies: 1,
  averageEffectiveness: 91,
  totalViolations: 39,
  policiesTriggered: 42,
  highRiskBlocked: 876
};

const enforcementMetrics = [
  { metric: 'Policy Execution Rate', value: '99.7%', status: 'excellent' },
  { metric: 'False Positive Rate', value: '0.3%', status: 'excellent' },
  { metric: 'Response Time', value: '1.2s', status: 'good' },
  { metric: 'System Overhead', value: '2.1%', status: 'good' },
  { metric: 'Policy Conflicts', value: '0', status: 'excellent' },
  { metric: 'Manual Overrides', value: '12', status: 'acceptable' }
];

const AdaptiveSecurityPolicyEngine = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showCreatePolicy, setShowCreatePolicy] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [enforcementMode, setEnforcementMode] = useState('auto');

  const filteredPolicies = activePolicies.filter(policy => {
    const matchesStatus = filterStatus === 'all' || policy.status === filterStatus;
    const matchesType = filterType === 'all' || policy.type === filterType;
    const matchesSearch = searchQuery === '' ||
      policy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      policy.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'draft': return 'text-yellow-400 bg-yellow-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Adaptive': return 'bg-purple-500/20 text-purple-400';
      case 'Zero Trust': return 'bg-blue-500/20 text-blue-400';
      case 'Detection': return 'bg-red-500/20 text-red-400';
      case 'Containment': return 'bg-orange-500/20 text-orange-400';
      case 'Compliance': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getMetricStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'acceptable': return 'text-yellow-400';
      case 'poor': return 'text-red-400';
      default: return 'text-gray-400';
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
          <div className="p-2 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 bg-clip-text text-transparent">
              Adaptive Security Policy Engine
            </h1>
            <p className="text-slate-400 text-sm">Intelligent Policy Enforcement & Zero Trust Security Framework</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">4</span>
            <span className="text-xs text-slate-400">Active Policies</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-white">91%</span>
            <span className="text-xs text-slate-400">Avg Effectiveness</span>
          </div>
          <button
            onClick={() => setShowCreatePolicy(true)}
            className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-white hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Create Policy</span>
          </button>
        </div>
      </motion.div>

      {/* Policy Engine Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Active Policies', value: policyStats.activePolicies, total: policyStats.totalPolicies, icon: Shield, color: 'text-green-400' },
          { title: 'Threat Blocks', value: policyStats.highRiskBlocked, change: '+23%', icon: Target, color: 'text-red-400' },
          { title: 'Policy Triggers', value: policyStats.policiesTriggered, change: '+15%', icon: Zap, color: 'text-yellow-400' },
          { title: 'Violations', value: policyStats.totalViolations, change: '-8%', icon: AlertTriangle, color: 'text-orange-400' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-2">
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value.toLocaleString()}</div>
              <div className="text-xs text-slate-400 mb-2">{stat.title}</div>
              {stat.total && (
                <div className="text-xs text-slate-500">of {stat.total}</div>
              )}
              {stat.change && (
                <div className={`text-xs px-2 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                  {stat.change}
                </div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Policy Management Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Policy List Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="xl:col-span-2"
        >
          <GlassCard title="Security Policy Management" icon={FileText}>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/40 rounded-lg">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search policies..."
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
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="all">All Types</option>
                <option value="Adaptive">Adaptive</option>
                <option value="Zero Trust">Zero Trust</option>
                <option value="Detection">Detection</option>
                <option value="Containment">Containment</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>

            {/* Policies List */}
            <div className="space-y-4">
              {filteredPolicies.map((policy, index) => (
                <motion.div
                  key={policy.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setSelectedPolicy(policy)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(policy.type)}`}>
                        {policy.type}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(policy.status)}`}>
                        {policy.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        policy.priority === 'critical' ? 'bg-red-500/20 text-red-400' :
                        policy.priority === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        policy.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {policy.priority}
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs text-slate-400">Effectiveness</span>
                      <div className={`text-sm font-bold ${
                        policy.effectiveness >= 90 ? 'text-green-400' :
                        policy.effectiveness >= 70 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {policy.effectiveness}%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{policy.name}</h3>
                      <p className="text-sm text-slate-400">{policy.id}</p>
                      <p className="text-xs text-slate-500">Created by: {policy.createdBy}</p>
                    </div>

                    <div className="text-right space-y-1">
                      <div className="text-xs text-slate-400">Last Triggered</div>
                      <div className="text-sm text-cyan-400">
                        {policy.lastTriggered === 'Never' ? 'Never' :
                         new Date(policy.lastTriggered).toLocaleString()}
                      </div>
                      <div className="text-xs text-slate-500">
                        Violations: {policy.violations}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <div className="text-xs text-slate-400">Triggers:</div>
                    {policy.triggers.slice(0, 2).map((trigger, idx) => (
                      <span key={idx} className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-300">
                        {trigger.replace(/_/g, ' ')}
                      </span>
                    ))}
                    {policy.triggers.length > 2 && (
                      <span className="text-xs px-2 py-1 bg-slate-700/50 rounded text-slate-500">
                        +{policy.triggers.length - 2} more
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* System Control Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          {/* Enforcement Mode Control */}
          <GlassCard title="Policy Engine Control" icon={Settings}>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-2 block">Enforcement Mode</label>
                <select
                  value={enforcementMode}
                  onChange={(e) => setEnforcementMode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                >
                  <option value="auto">Automatic (Recommended)</option>
                  <option value="learning">Learning Mode</option>
                  <option value="manual">Manual Approval Required</option>
                  <option value="disabled">Disabled (Maintenance)</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-300">Engine Status</div>
                  <div className="text-xs text-green-400">● Active</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-white">99.7%</div>
                  <div className="text-xs text-slate-400">Uptime</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors">
                  Enable All
                </button>
                <button className="flex-1 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                  Maintenance
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Enforcement Metrics */}
          <GlassCard title="Enforcement Metrics" icon={BarChart3}>
            <div className="space-y-3">
              {enforcementMetrics.map((metric, index) => (
                <motion.div
                  key={metric.metric}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-2"
                >
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-300">{metric.metric}</div>
                    <div className={`text-lg font-bold ${getMetricStatusColor(metric.status)}`}>
                      {metric.value}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${
                    metric.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                    metric.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                    metric.status === 'acceptable' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {metric.status}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Policy Templates */}
          <GlassCard title="Quick Deploy Templates" icon={Zap}>
            <div className="space-y-3">
              {policyTemplates.map((template, index) => (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      template.category === 'Adaptive' ? 'bg-purple-400' :
                      template.category === 'Zero Trust' ? 'bg-blue-400' :
                      template.category === 'Detection' ? 'bg-red-400' :
                      template.category === 'Compliance' ? 'bg-green-400' :
                      'bg-yellow-400'
                    }`}></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-white">{template.name}</h4>
                      <p className="text-xs text-slate-400">{template.description}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="text-xs text-slate-500">{template.actions.length} actions</span>
                        <span className="text-xs text-slate-500">•</span>
                        <span className="text-xs text-slate-500">{template.triggers.length} triggers</span>
                      </div>
                    </div>
                    <Play className="w-4 h-4 text-green-400" />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </>
  );
};

export default AdaptiveSecurityPolicyEngine;
