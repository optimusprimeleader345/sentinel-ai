import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  Calendar,
  Clock,
  Eye,
  FileText,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle,
  AlertCircle,
  Shield,
  Users,
  Database,
  Lock,
  RefreshCw
} from 'lucide-react';

// Mock security audit data
const auditLogs = [
  {
    id: 'AUD-2025-001',
    timestamp: '2025-01-15T14:23:45Z',
    event: 'User Login',
    username: 'admin.smith',
    ip: '192.168.1.100',
    status: 'success',
    type: 'authentication',
    risk: 'low',
    details: 'Successful login from workstation WS-002'
  },
  {
    id: 'AUD-2025-002',
    timestamp: '2025-01-15T14:22:33Z',
    event: 'Failed Login Attempt',
    username: 'admin.smith',
    ip: '45.67.89.12',
    status: 'failed',
    type: 'authentication',
    risk: 'high',
    details: 'Invalid credentials, IP blocked after 5 attempts'
  },
  {
    id: 'AUD-2025-003',
    timestamp: '2025-01-15T14:18:12Z',
    event: 'Administrator Action',
    username: 'soc.analyst',
    ip: '192.168.1.150',
    status: 'success',
    type: 'system_admin',
    risk: 'medium',
    details: 'Modified security policy POL-001 requirements'
  },
  {
    id: 'AUD-2025-004',
    timestamp: '2025-01-15T14:15:28Z',
    event: 'Unusual Access Pattern',
    username: 'user.john',
    ip: '192.168.1.89',
    status: 'warning',
    type: 'behavior_anomaly',
    risk: 'high',
    details: 'Accessed 15 restricted files outside normal hours'
  },
  {
    id: 'AUD-2025-005',
    timestamp: '2025-01-15T14:12:05Z',
    event: 'Policy Violation',
    username: 'contractor.mike',
    ip: '192.168.1.76',
    status: 'failed',
    type: 'compliance',
    risk: 'high',
    details: 'Attempted data export violating DLZ-001 policy'
  }
];

const SecurityAuditing = () => {
  const [logs, setLogs] = useState(auditLogs);
  const [filteredLogs, setFilteredLogs] = useState(auditLogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const auditStats = {
    total: logs.length,
    critical: logs.filter(log => log.risk === 'high').length,
    warnings: logs.filter(log => log.status === 'warning').length,
    failures: logs.filter(log => log.status === 'failed').length
  };

  useEffect(() => {
    let filtered = logs;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(log => log.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(log => log.type === typeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.event.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredLogs(filtered);
  }, [logs, statusFilter, typeFilter, searchTerm]);

  const getRiskIcon = (risk) => {
    switch (risk) {
      case 'high': return <AlertTriangle className="w-4 h-4 text-red-400" />;
      case 'medium': return <AlertCircle className="w-4 h-4 text-yellow-400" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-400" />;
      default: return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-400';
      case 'failed': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-slate-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'authentication': return <Lock className="w-4 h-4 text-blue-400" />;
      case 'system_admin': return <Shield className="w-4 h-4 text-purple-400" />;
      case 'behavior_anomaly': return <AlertTriangle className="w-4 h-4 text-orange-400" />;
      case 'compliance': return <FileText className="w-4 h-4 text-red-400" />;
      default: return <Activity className="w-4 h-4 text-slate-400" />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString()
    };
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Security Auditing Hub
            </h1>
            <p className="text-slate-400 text-sm">Comprehensive security event monitoring and audit trail analysis</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-white">Today's Events</div>
            <div className="text-lg text-purple-400 font-bold">{auditStats.total}</div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all duration-200 flex items-center space-x-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </motion.div>

      {/* Summary Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{auditStats.total}</div>
              <div className="text-sm text-slate-400">Total Events</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">{auditStats.critical}</div>
              <div className="text-sm text-slate-400">Critical Events</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-400">{auditStats.warnings}</div>
              <div className="text-sm text-slate-400">Warnings</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gray-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-gray-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-400">{auditStats.failures}</div>
              <div className="text-sm text-slate-500">Non-compliant</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl mb-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
          >
            <option value="all">All Status</option>
            <option value="success">Success</option>
            <option value="failed">Failed</option>
            <option value="warning">Warning</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-purple-500/50 transition-colors"
          >
            <option value="all">All Types</option>
            <option value="authentication">Authentication</option>
            <option value="system_admin">System Admin</option>
            <option value="behavior_anomaly">Behavior Anomaly</option>
            <option value="compliance">Compliance</option>
          </select>

          {/* Export Button */}
          <button className="px-6 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg border border-purple-500/50 transition-colors flex items-center justify-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Export Audit Log</span>
          </button>
        </div>
      </motion.div>

      {/* Audit Log Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl shadow-2xl overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-900/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Event</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">IP Address</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Risk</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filteredLogs.map((log, index) => (
                <motion.tr
                  key={log.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="hover:bg-slate-700/20 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white font-medium">
                      {formatDate(log.timestamp).date}
                    </div>
                    <div className="text-sm text-slate-400">
                      {formatDate(log.timestamp).time}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        {getTypeIcon(log.type)}
                        <div>
                          <div className="text-sm font-medium text-white">{log.event}</div>
                          <div className="text-xs text-slate-400">{log.type.replace('_', ' ')}</div>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-white">{log.username}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-cyan-400">{log.ip}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(log.status)}`}>
                      {log.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getRiskIcon(log.risk)}
                      <span className={`text-xs font-medium ${
                        log.risk === 'high' ? 'text-red-400' :
                        log.risk === 'medium' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {log.risk}
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-300 max-w-xs truncate">
                      {log.details}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredLogs.length === 0 && (
          <div className="px-6 py-12 text-center">
            <Activity className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-400 mb-2">No audit events found</h3>
            <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default SecurityAuditing;
