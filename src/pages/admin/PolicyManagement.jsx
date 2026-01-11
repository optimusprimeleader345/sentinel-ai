import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Shield,
  Settings,
  Users,
  Eye,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  AlertTriangle,
  CheckCircle,
  Key,
  Globe,
  Lock,
  Wifi,
  Database,
  Cloud,
  Monitor,
  Filter,
  Search
} from 'lucide-react';

// Mock security policies data
const securityPolicies = [
  {
    id: 'POL-001',
    name: 'Password Policy',
    category: 'Authentication',
    status: 'active',
    priority: 'high',
    description: 'Enterprise password requirements and rotation policies',
    complianceScore: 98,
    lastUpdated: '2025-01-15',
    enforcedUsers: 1250,
    violations: 3,
    rules: [
      'Minimum 12 characters',
      'Complex requirements (upper, lower, number, special)',
      '90-day rotation',
      'No password reuse (last 10)',
      'Account lockout after 5 attempts'
    ]
  },
  {
    id: 'POL-002',
    name: 'Data Classification Policy',
    category: 'Data Protection',
    status: 'active',
    priority: 'critical',
    description: 'Data classification and handling procedures',
    complianceScore: 94,
    lastUpdated: '2025-01-10',
    enforcedUsers: 1250,
    violations: 8,
    rules: [
      'Public/Private/Confidential/Secret classification',
      'Encryption requirements by classification',
      'Access controls based on clearance',
      'Data retention policies',
      'Cross-border transfer controls'
    ]
  },
  {
    id: 'POL-003',
    name: 'Network Access Control',
    category: 'Network Security',
    status: 'active',
    priority: 'high',
    description: 'Network segmentation and access control policies',
    complianceScore: 96,
    lastUpdated: '2025-01-12',
    enforcedUsers: 980,
    violations: 12,
    rules: [
      'Zero trust network access',
      'Role-based network segmentation',
      'VPN required for remote access',
      'Device compliance scanning',
      'Continuous authentication monitoring'
    ]
  },
  {
    id: 'POL-004',
    name: 'Incident Response Policy',
    category: 'Incident Management',
    status: 'draft',
    priority: 'critical',
    description: 'SOC incident response and reporting procedures',
    complianceScore: 0,
    lastUpdated: '2025-01-08',
    enforcedUsers: 0,
    violations: 0,
    rules: [
      'Immediate notification (< 15 minutes)',
      'Escalation procedures by severity',
      'Evidence preservation protocols',
      'External notification requirements',
      'Post-incident reporting timeline'
    ]
  },
  {
    id: 'POL-005',
    name: 'Remote Work Security',
    category: 'Remote Access',
    status: 'active',
    priority: 'medium',
    description: 'Security requirements for remote and work-from-home employees',
    complianceScore: 89,
    lastUpdated: '2025-01-14',
    enforcedUsers: 340,
    violations: 25,
    rules: [
      'Endpoint protection required',
      'Secure VPN usage mandatory',
      'Screen lock policies',
      'Approved device requirements',
      'Regular security training'
    ]
  }
];

const statusOptions = ['all', 'active', 'draft', 'inactive'];
const categoryOptions = ['all', 'Authentication', 'Data Protection', 'Network Security', 'Incident Management', 'Remote Access'];

const PolicyManagement = () => {
  const [policies, setPolicies] = useState(securityPolicies);
  const [filteredPolicies, setFilteredPolicies] = useState(securityPolicies);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [isCreatingPolicy, setIsCreatingPolicy] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Apply filters whenever filter states change
  React.useEffect(() => {
    let filtered = policies;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(policy => policy.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(policy => policy.category === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(policy =>
        policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        policy.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredPolicies(filtered);
  }, [policies, statusFilter, categoryFilter, searchTerm]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'draft': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'inactive': return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'draft': return Edit;
      case 'inactive': return AlertTriangle;
      default: return Shield;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Authentication': return Key;
      case 'Data Protection': return Database;
      case 'Network Security': return Wifi;
      case 'Incident Management': return AlertTriangle;
      case 'Remote Access': return Globe;
      default: return Settings;
    }
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  const PolicyCard = ({ policy }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:bg-slate-700/50 transition-all"
      onClick={() => setSelectedPolicy(policy)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 flex-1">
          <div className={`p-3 rounded-lg ${policy.category === 'Authentication' ? 'bg-blue-500/20' :
            policy.category === 'Data Protection' ? 'bg-green-500/20' :
            policy.category === 'Network Security' ? 'bg-purple-500/20' :
            policy.category === 'Incident Management' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
            <Key className="w-6 h-6 text-current" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-white truncate">{policy.name}</h3>
            <p className="text-sm text-slate-400 mb-2">{policy.id}</p>
            <p className="text-sm text-slate-400 line-clamp-2">{policy.description}</p>
          </div>
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(policy.status)}`}>
            {policy.status}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full border ${getPriorityColor(policy.priority) === 'text-red-400' ?
            'text-red-400 bg-red-500/20 border-red-500/30' :
            getPriorityColor(policy.priority) === 'text-orange-400' ? 'text-orange-400 bg-orange-500/20 border-orange-500/30' :
            getPriorityColor(policy.priority) === 'text-yellow-400' ? 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30' :
            'text-green-400 bg-green-500/20 border-green-500/30'
          }`}>
            {policy.priority}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-bold text-white">{policy.complianceScore}%</div>
            <div className="text-gray-400 text-xs">Compliance</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">{policy.enforcedUsers}</div>
            <div className="text-gray-400 text-xs">Users</div>
          </div>
          <div className="text-center">
            <div className={`text-lg font-bold ${policy.violations > 5 ? 'text-red-400' :
              policy.violations > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
              {policy.violations}
            </div>
            <div className="text-gray-400 text-xs">Violations</div>
          </div>
        </div>

        <div className="text-right">
          <div className="text-gray-400 text-xs">Last Updated</div>
          <div className="text-white text-sm">{policy.lastUpdated}</div>
        </div>
      </div>
    </motion.div>
  );

  const PolicyDetails = ({ policy, onClose }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${policy.category === 'Authentication' ? 'bg-blue-500/20' :
              policy.category === 'Data Protection' ? 'bg-green-500/20' :
              policy.category === 'Network Security' ? 'bg-purple-500/20' :
              policy.category === 'Incident Management' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
              <Key className="w-8 h-8 text-current" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{policy.name}</h2>
              <p className="text-slate-400">{policy.id} • {policy.category}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(policy.status)}`}>
              {policy.status}
            </span>
            <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">
              <X className="w-6 h-6 text-slate-400" />
            </button>
          </div>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Key Metrics */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Policy Metrics</h3>

              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-400">Compliance Score:</span>
                  <span className="text-white font-semibold">{policy.complianceScore}%</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-400">Enforced Users:</span>
                  <span className="text-cyan-400 font-semibold">{policy.enforcedUsers}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-400">Active Violations:</span>
                  <span className={`font-semibold ${policy.violations > 5 ? 'text-red-400' :
                    policy.violations > 0 ? 'text-yellow-400' : 'text-green-400'}`}>
                    {policy.violations}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                  <span className="text-slate-400">Last Updated:</span>
                  <span className="text-white font-semibold">{policy.lastUpdated}</span>
                </div>
              </div>
            </div>

            {/* Compliance Visualization */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Compliance Overview</h3>

              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Overall Compliance</span>
                  <span className="text-white font-semibold">{policy.complianceScore}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${policy.complianceScore >= 90 ? 'bg-green-500' :
                      policy.complianceScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${policy.complianceScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-400">Violation Risk</span>
                  <span className={`font-semibold ${policy.violations > 5 ? 'text-red-400' : 'text-yellow-400'}`}>
                    {policy.violations > 5 ? 'High' : policy.violations > 0 ? 'Medium' : 'Low'}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${policy.violations > 5 ? 'bg-red-500' :
                      policy.violations > 0 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    style={{ width: `${Math.min(policy.violations * 10, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Quick Actions</h3>

              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit Policy</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
                  <CheckCircle className="w-4 h-4" />
                  <span>Review Compliance</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors">
                  <FileText className="w-4 h-4" />
                  <span>Generate Report</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Handle Violations</span>
                </button>
              </div>
            </div>
          </div>

          {/* Policy Rules */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Policy Rules & Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {policy.rules.map((rule, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-900/50 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700/50 flex justify-end space-x-3">
          <button className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
            Update Policy
          </button>
          <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg transition-colors">
            Enforce Globally
          </button>
          <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Security Policy Management
            </h1>
            <p className="text-slate-400 text-sm">Enterprise policy administration and compliance monitoring</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-white">Overall Compliance</div>
            <div className="text-lg text-green-400 font-bold">94.2%</div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsCreatingPolicy(true)}
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg font-bold text-white hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-200 flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>New Policy</span>
            </button>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-200 flex items-center space-x-2 ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Settings className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search policies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-500/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                Status: {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Category Filter */}
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-blue-500/50 transition-colors"
          >
            {categoryOptions.map(category => (
              <option key={category} value={category}>
                Category: {category}
              </option>
            ))}
          </select>

          {/* Export Button */}
          <button className="px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/50 transition-colors flex items-center justify-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Export Report</span>
          </button>
        </div>
      </motion.div>

      {/* Policies Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        {filteredPolicies.map((policy, index) => (
          <motion.div
            key={policy.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <PolicyCard policy={policy} />
          </motion.div>
        ))}
      </motion.div>

      {/* Policy Details Modal */}
      {selectedPolicy && (
        <PolicyDetails
          policy={selectedPolicy}
          onClose={() => setSelectedPolicy(null)}
        />
      )}

      {/* Create Policy Modal */}
      {isCreatingPolicy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsCreatingPolicy(false)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Create New Security Policy</h2>
              <button onClick={() => setIsCreatingPolicy(false)} className="p-2 hover:bg-slate-700 rounded-lg">
                <X className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="p-6">
              <div className="text-center text-slate-400">
                Policy creation form would go here - implementing basic template for now
              </div>
            </div>

            <div className="p-6 border-t border-slate-700/50 flex justify-end space-x-3">
              <button
                onClick={() => setIsCreatingPolicy(false)}
                className="px-6 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                Create Policy
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PolicyManagement;
