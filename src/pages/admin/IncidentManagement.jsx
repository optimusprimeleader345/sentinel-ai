import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Shield,
  Clock,
  Users,
  Activity,
  Target,
  FileText,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Eye,
  User,
  MapPin,
  Calendar,
  Tag,
  Flag,
  Zap,
  Layers,
  CheckCircle,
  XCircle,
  PauseCircle,
  PlayCircle
} from 'lucide-react';

// Mock incident data
const incidentData = [
  {
    id: 'INC-2025-001',
    title: 'Suspicious Network Traffic Spike',
    severity: 'critical',
    status: 'active',
    priority: 'high',
    type: 'Network Intrusion',
    description: 'Detected anomalous network traffic with multiple connections to foreign IP addresses',
    affectedSystems: ['Web Server 01', 'Database Cluster A', 'Load Balancer 02'],
    assignee: 'SOC Analyst 1',
    created: '2025-01-15T08:30:00Z',
    lastUpdated: '2025-01-15T09:45:00Z',
    progress: 65,
    indicators: ['170+ connections/sec', 'Unknown IPs from Russia', 'Port scanning detected']
  },
  {
    id: 'INC-2025-002',
    title: 'Potential Data Exfiltration',
    severity: 'high',
    status: 'investigating',
    priority: 'high',
    type: 'Data Breach',
    description: 'Large outbound data transfer detected from employee workstation',
    affectedSystems: ['Workstation WS-045', 'File Server 01'],
    assignee: 'SOC Analyst 2',
    created: '2025-01-15T07:15:00Z',
    lastUpdated: '2025-01-15T08:20:00Z',
    progress: 30,
    indicators: ['1.2GB outbound', 'Unusual file types', 'After-hours activity']
  },
  {
    id: 'INC-2025-003',
    title: 'Ransomware Indicators',
    severity: 'critical',
    status: 'contained',
    priority: 'critical',
    type: 'Malware',
    description: 'Ransomware behavior detected on multiple endpoints',
    affectedSystems: ['10 user workstations', 'File Share Server'],
    assignee: 'Incident Response Team',
    created: '2025-01-14T23:45:00Z',
    lastUpdated: '2025-01-15T06:30:00Z',
    progress: 95,
    indicators: ['File encryption pattern', 'Ransom note files', 'Network isolation']
  },
  {
    id: 'INC-2025-004',
    title: 'Brute Force Login Attempts',
    severity: 'medium',
    status: 'resolved',
    priority: 'medium',
    type: 'Authentication Attack',
    description: 'Recurring brute force attempts on VPN service',
    affectedSystems: ['VPN Gateway', 'Authentication Server'],
    assignee: 'SOC Analyst 1',
    created: '2025-01-14T16:20:00Z',
    lastUpdated: '2025-01-14T17:45:00Z',
    progress: 100,
    indicators: ['500+ failed logins', 'Synchronized attempts', 'IP blocking applied']
  },
  {
    id: 'INC-2025-005',
    title: 'Phishing Campaign Detected',
    severity: 'medium',
    status: 'investigating',
    priority: 'medium',
    type: 'Social Engineering',
    description: 'Suspected spear-phishing emails targeting executive team',
    affectedSystems: ['Email Gateway', '5 Executive Workstations'],
    assignee: 'SOC Analyst 3',
    created: '2025-01-15T10:00:00Z',
    lastUpdated: '2025-01-15T10:15:00Z',
    progress: 15,
    indicators: ['Targeted executive domains', 'Malicious attachments', 'URL spoofing']
  }
];

const statusOptions = ['all', 'active', 'investigating', 'contained', 'resolved'];
const severityOptions = ['all', 'critical', 'high', 'medium', 'low'];

const IncidentManagement = () => {
  const [incidents, setIncidents] = useState(incidentData);
  const [filteredIncidents, setFilteredIncidents] = useState(incidentData);
  const [statusFilter, setStatusFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  useEffect(() => {
    let filtered = incidents;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(incident => incident.status === statusFilter);
    }

    if (severityFilter !== 'all') {
      filtered = filtered.filter(incident => incident.severity === severityFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(incident =>
        incident.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        incident.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredIncidents(filtered);
  }, [incidents, statusFilter, severityFilter, searchTerm]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status, priority) => {
    if (priority === 'critical') return 'text-red-400 bg-red-500/20 border-red-500/30';
    if (priority === 'high') return 'text-orange-400 bg-orange-500/20 border-orange-500/30';

    switch (status) {
      case 'active': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'investigating': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'contained': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      case 'resolved': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return AlertTriangle;
      case 'investigating': return Search;
      case 'contained': return Shield;
      case 'resolved': return CheckCircle;
      default: return Activity;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const IncidentCard = ({ incident }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 cursor-pointer hover:bg-slate-700/50 transition-all"
      onClick={() => setSelectedIncident(incident)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white mb-2">{incident.title}</h3>
          <p className="text-sm text-slate-400 mb-3">{incident.description}</p>

          <div className="flex items-center space-x-4 text-sm">
            <span className="text-slate-500">{incident.id}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">{incident.type}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">
              {incident.affectedSystems.length} system{incident.affectedSystems.length !== 1 ? 's' : ''} affected
            </span>
          </div>
        </div>

        <div className="flex flex-col space-y-2 ml-4">
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(incident.severity)}`}>
            {incident.severity}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(incident.status, incident.priority)}`}>
            {incident.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-sm text-slate-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{incident.assignee}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{formatDate(incident.created)}</span>
          </div>
        </div>

        <div className="text-right">
          <div className="text-sm text-slate-400 mb-1">Progress</div>
          <div className="w-20 bg-slate-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
              style={{ width: `${incident.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const IncidentDetails = ({ incident, onClose }) => (
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
            <div className={`p-3 rounded-lg ${getSeverityColor(incident.severity)}`}>
              {React.createElement(getStatusIcon(incident.status), { className: 'w-6 h-6' })}
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">{incident.title}</h2>
              <p className="text-slate-400">{incident.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg">
            <XCircle className="w-6 h-6 text-slate-400" />
          </button>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Incident Details</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Type:</span>
                  <span className="text-white">{incident.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Severity:</span>
                  <span className={`${getSeverityColor(incident.severity)}`}>{incident.severity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className={`${getStatusColor(incident.status)}`}>{incident.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Priority:</span>
                  <span className={`${incident.priority === 'critical' ? 'text-red-400' : incident.priority === 'high' ? 'text-orange-400' : 'text-yellow-400'}`}>
                    {incident.priority}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Assignee:</span>
                  <span className="text-white">{incident.assignee}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Created:</span>
                  <span className="text-slate-300">{formatDate(incident.created)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Updated:</span>
                  <span className="text-slate-300">{formatDate(incident.lastUpdated)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Progress</h3>

              <div className="bg-slate-900/50 rounded-lg p-4">
                <div className="flex justify-between mb-2">
                  <span className="text-slate-400">Investigation</span>
                  <span className="text-white">{incident.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-cyan-500 h-3 rounded-full"
                    style={{ width: `${incident.progress}%` }}
                  ></div>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-white">Description</h3>
              <p className="text-slate-300">{incident.description}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Affected Systems</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {incident.affectedSystems.map((system, index) => (
                <div key={index} className="flex items-center space-x-2 bg-slate-900/50 px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <span className="text-slate-300 text-sm">{system}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Key Indicators</h3>
            <div className="space-y-2">
              {incident.indicators.map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 text-slate-300">
                  <span className="text-cyan-400">•</span>
                  <span>{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-700/50 flex justify-end space-x-3">
          <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-300 rounded-lg transition-colors">
            Update Incident
          </button>
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
            Run Analysis
          </button>
          <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
            Resolve Incident
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-xl shadow-lg">
            <AlertTriangle className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent">
              Incident Management
            </h1>
            <p className="text-slate-400 text-sm">SOC incident response and management system</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-white">Active Incidents</div>
            <div className="text-lg text-red-400 font-bold">
              {incidents.filter(inc => inc.status === 'active').length}
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-red-500/50 transition-all duration-200 flex items-center space-x-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </motion.div>

      {/* Filters and Controls */}
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
              placeholder="Search incidents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-red-500/50 transition-colors"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-red-500/50 transition-colors"
          >
            {statusOptions.map(status => (
              <option key={status} value={status}>
                Status: {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>

          {/* Severity Filter */}
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-red-500/50 transition-colors"
          >
            {severityOptions.map(severity => (
              <option key={severity} value={severity}>
                Severity: {severity.charAt(0).toUpperCase() + severity.slice(1)}
              </option>
            ))}
          </select>

          {/* New Incident Button */}
          <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-bold text-white hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-200 flex items-center justify-center space-x-2">
            <Plus className="w-5 h-5" />
            <span>New Incident</span>
          </button>
        </div>
      </motion.div>

      {/* Incident Overview Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <AlertTriangle className="w-8 h-8 text-red-400" />
            <div>
              <div className="text-2xl font-bold text-red-400">
                {incidents.filter(inc => inc.severity === 'critical').length}
              </div>
              <div className="text-sm text-slate-400">Critical Incidents</div>
            </div>
          </div>
        </div>

        <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <Shield className="w-8 h-8 text-orange-400" />
            <div>
              <div className="text-2xl font-bold text-orange-400">
                {incidents.filter(inc => inc.status === 'active').length}
              </div>
              <div className="text-sm text-slate-400">Active Investigations</div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <Clock className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-2xl font-bold text-yellow-400">2</div>
              <div className="text-sm text-slate-400">Unassigned</div>
            </div>
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
          <div className="flex items-center space-x-4">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-2xl font-bold text-green-400">
                {incidents.filter(inc => inc.status === 'resolved').length}
              </div>
              <div className="text-sm text-slate-400">Resolved Today</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Incidents List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 xl:grid-cols-2 gap-6"
      >
        {filteredIncidents.map((incident, index) => (
          <motion.div
            key={incident.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <IncidentCard incident={incident} />
          </motion.div>
        ))}
      </motion.div>

      {/* Incident Details Modal */}
      {selectedIncident && (
        <IncidentDetails
          incident={selectedIncident}
          onClose={() => setSelectedIncident(null)}
        />
      )}
    </div>
  );
};

export default IncidentManagement;
