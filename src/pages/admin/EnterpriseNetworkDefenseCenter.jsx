import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Network,
  Globe,
  Activity,
  Zap,
  Eye,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  MapPin,
  Cpu,
  HardDrive,
  Cloud,
  Lock,
  Unlock,
  Search,
  Filter,
  RotateCw,
  Play,
  Pause,
  Monitor,
  Target,
  ArrowRight,
  ArrowLeft,
  Hash,
  Wifi,
  Server,
  Database,
  Radio,
  Cable,
  Box,
  Layers,
  Grid3X3,
  SplitSquareHorizontal
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';

// Network Defense Data
const networkTopology = [
  {
    id: 'PERIMETER',
    name: 'Network Perimeter',
    type: 'Firewall',
    status: 'active',
    protection: 98.7,
    traffic: '2.3 Gbps',
    threats: 23,
    blocked: 1247,
    latency: '2.1ms'
  },
  {
    id: 'IPS',
    name: 'Intrusion Prevention System',
    type: 'IPS',
    status: 'active',
    protection: 96.4,
    traffic: '1.8 Gbps',
    threats: 45,
    blocked: 892,
    latency: '3.2ms'
  },
  {
    id: 'DDoS',
    name: 'DDoS Mitigation',
    type: 'WAF',
    status: 'active',
    protection: 99.8,
    traffic: '5.1 Gbps',
    threats: 156,
    blocked: 2450,
    latency: '1.8ms'
  },
  {
    id: 'SEGMENTATION',
    name: 'Network Segmentation',
    type: 'Micro-segmentation',
    status: 'active',
    protection: 97.2,
    traffic: '890 Mbps',
    threats: 12,
    blocked: 234,
    latency: '1.2ms'
  },
  {
    id: 'ENDPOINT',
    name: 'Endpoint Protection',
    type: 'NAC',
    status: 'warning',
    protection: 89.3,
    traffic: '456 Mbps',
    threats: 67,
    blocked: 456,
    latency: '4.5ms'
  },
  {
    id: 'CLOUD',
    name: 'Cloud Security',
    type: 'CSP',
    status: 'active',
    protection: 95.8,
    traffic: '1.2 Gbps',
    threats: 34,
    blocked: 678,
    latency: '8.9ms'
  }
];

const networkTrafficStats = {
  totalTraffic: '8.7 Tbps',
  northSouthTraffic: '4.2 Tbps',
  eastWestTraffic: '4.5 Tbps',
  encryptedTraffic: '67%',
  anomalies: 23,
  criticalAlerts: 3,
  blockedAttacks: 4567,
  activeConnections: 28456
};

const activeAnomalies = [
  {
    id: 'ANOM-001',
    type: 'Data Exfiltration',
    severity: 'high',
    source: '192.168.2.45',
    destination: 'external',
    protocol: 'HTTPS',
    volume: '234 MB',
    detectionTime: '08:32:15 IST',
    confidence: 94,
    status: 'investigating'
  },
  {
    id: 'ANOM-002',
    type: 'Port Scanning',
    severity: 'medium',
    source: '10.0.1.100',
    destination: '192.168.1.0/24',
    protocol: 'TCP',
    volume: '45.2 KB',
    detectionTime: '08:28:45 IST',
    confidence: 87,
    status: 'blocked'
  },
  {
    id: 'ANOM-003',
    type: 'DDoS SYN Flood',
    severity: 'critical',
    source: 'botnet_network',
    destination: 'web_servers',
    protocol: 'TCP/SYN',
    volume: '1.8 Gbps',
    detectionTime: '08:35:12 IST',
    confidence: 99,
    status: 'mitigating'
  },
  {
    id: 'ANOM-004',
    type: 'Brute Force SSH',
    severity: 'high',
    source: '203.0.113.1',
    destination: '192.168.3.50',
    protocol: 'SSH',
    volume: '12.3 KB',
    detectionTime: '08:27:33 IST',
    confidence: 96,
    status: 'blocked'
  }
];

const networkSegments = [
  {
    id: 'SEG-001',
    name: 'Executive Network',
    type: 'High Security',
    devices: 12,
    users: 8,
    traffic: '234 Mbps',
    threats: 2,
    compliance: 'CISO Approved',
    isolation: 'Complete'
  },
  {
    id: 'SEG-002',
    name: 'Development Zone',
    type: 'Development',
    devices: 45,
    users: 28,
    traffic: '890 Mbps',
    threats: 8,
    compliance: 'DevSecOps',
    isolation: 'Partial'
  },
  {
    id: 'SEG-003',
    name: 'IoT & OT Network',
    type: 'Industrial Control',
    devices: 234,
    users: 5,
    traffic: '156 Mbps',
    threats: 15,
    compliance: 'NERC CIP',
    isolation: 'Air-Gapped'
  },
  {
    id: 'SEG-004',
    name: 'Guest Wireless',
    type: 'Public Access',
    devices: 67,
    users: 45,
    traffic: '78 Mbps',
    threats: 23,
    compliance: 'PCI DSS',
    isolation: 'Guest Network'
  }
];

const zeroTrustEnforcement = [
  {
    policy: 'Executive Access',
    matched: 89,
    blocked: 12,
    adaptive: true,
    lastUpdated: '08:30:45 IST'
  },
  {
    policy: 'Remote Worker VPN',
    matched: 234,
    blocked: 8,
    adaptive: false,
    lastUpdated: '08:25:12 IST'
  },
  {
    policy: 'Contractor Access',
    matched: 67,
    blocked: 23,
    adaptive: false,
    lastUpdated: '08:15:33 IST'
  },
  {
    policy: 'API Gateway Trust',
    matched: 456,
    blocked: 5,
    adaptive: true,
    lastUpdated: '08:40:01 IST'
  }
];

const threatHuntingCAPs = [
  {
    id: 'CAP-001',
    name: 'Lateral Movement Detection',
    active: true,
    engine: 'AI Behavioral Analysis',
    coverage: 'East-West Traffic',
    detectionRate: 96.7,
    falsePositiveRate: 2.3
  },
  {
    id: 'CAP-002',
    name: 'Advanced Malware Scanning',
    active: true,
    engine: 'Machine Learning Classification',
    coverage: 'File Transfers',
    detectionRate: 94.2,
    falsePositiveRate: 1.8
  },
  {
    id: 'CAP-003',
    name: 'DNS Tunneling Hunter',
    active: true,
    engine: 'Statistical Analysis',
    coverage: 'DNS Queries',
    detectionRate: 98.1,
    falsePositiveRate: 0.9
  },
  {
    id: 'CAP-004',
    name: 'Command & Control Detection',
    active: true,
    engine: 'Signature + Behavioral',
    coverage: 'Network Sessions',
    detectionRate: 91.5,
    falsePositiveRate: 3.2
  }
];

const EnterpriseNetworkDefenseCenter = () => {
  const [selectedView, setSelectedView] = useState('topology');
  const [selectedAnomaly, setSelectedAnomaly] = useState(null);
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [mitigationActive, setMitigationActive] = useState(true);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'critical': return 'text-red-400 bg-red-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
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

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Firewall': return Shield;
      case 'IPS': return Zap;
      case 'WAF': return Globe;
      case 'Micro-segmentation': return Grid3X3;
      case 'NAC': return Lock;
      case 'CSP': return Cloud;
      default: return Network;
    }
  };

  const filteredAnomalies = activeAnomalies.filter(anomaly => {
    return filterSeverity === 'all' || anomaly.severity === filterSeverity;
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
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
              Enterprise Network Defense Center
            </h1>
            <p className="text-slate-400 text-sm">Advanced Network Security & Threat Hunting Command Center</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-semibold text-white">{networkTrafficStats.totalTraffic}</span>
              <span className="text-xs text-slate-400">Total Traffic</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm font-semibold text-white">{networkTrafficStats.blockedAttacks}</span>
              <span className="text-xs text-slate-400">Attacks Blocked</span>
            </div>
          </div>

          {/* Mitigation Control */}
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-2 ${
              mitigationActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              <div className={`w-2 h-2 rounded-full ${mitigationActive ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span>Auto-Mitigation: {mitigationActive ? 'ON' : 'OFF'}</span>
            </div>
            <button
              onClick={() => setMitigationActive(!mitigationActive)}
              className="p-2 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-colors"
            >
              <Settings className="w-4 h-4 text-slate-300" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* View Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'topology', label: 'Network Topology', icon: Network },
          { id: 'anomalies', label: 'Anomaly Detection', icon: Activity },
          { id: 'segmentation', label: 'Network Segmentation', icon: Grid3X3 },
          { id: 'threat_hunting', label: 'Threat Hunting', icon: Target },
          { id: 'zero_trust', label: 'Zero Trust', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Network Topology View */}
      {selectedView === 'topology' && (
        <div className="space-y-6">

          {/* Network Status Overview */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
            {[
              { title: 'Total Traffic', value: networkTrafficStats.totalTraffic, icon: Activity },
              { title: 'Encrypted %', value: networkTrafficStats.encryptedTraffic, icon: Lock },
              { title: 'Active Connections', value: networkTrafficStats.activeConnections.toLocaleString(), icon: Network },
              { title: 'Anomalies', value: networkTrafficStats.anomalies, icon: AlertTriangle, color: 'text-orange-400' },
              { title: 'Critical Alerts', value: networkTrafficStats.criticalAlerts, icon: XCircle, color: 'text-red-400' },
              { title: 'Attacks Blocked', value: networkTrafficStats.blockedAttacks, icon: Shield, color: 'text-green-400' }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <GlassCard className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <metric.icon className={`w-5 h-5 ${metric.color || 'text-cyan-400'}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs text-slate-400">{metric.title}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Network Defense Layers */}
          <GlassCard title="Network Defense Architecture" icon={Shield}>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {networkTopology.map((layer, index) => {
                const Icon = getTypeIcon(layer.type);
                return (
                  <motion.div
                    key={layer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-slate-800/50 rounded-lg p-6"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-500/20 rounded-lg">
                          <Icon className="w-5 h-5 text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{layer.name}</h3>
                          <p className="text-xs text-slate-400">{layer.type}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(layer.status)}`}>
                        {layer.status}
                      </span>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Protection</div>
                        <div className={`text-lg font-bold ${
                          layer.protection >= 95 ? 'text-green-400' :
                          layer.protection >= 90 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {layer.protection}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Traffic</div>
                        <div className="text-lg font-bold text-cyan-400">{layer.traffic}</div>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Threats Detected:</span>
                        <span className="text-red-400 font-semibold">{layer.threats}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Blocked:</span>
                        <span className="text-green-400 font-semibold">{layer.blocked}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Latency:</span>
                        <span className="text-white">{layer.latency}</span>
                      </div>
                    </div>

                    {/* Protection Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          layer.status === 'active' ? 'bg-green-500' :
                          layer.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${layer.protection}%` }}
                      ></div>
                    </div>

                    {/* Control Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-xs transition-colors">
                        Configure
                      </button>
                      <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-xs transition-colors">
                        Health Check
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Anomaly Detection View */}
      {selectedView === 'anomalies' && (
        <div className="space-y-6">

          {/* Anomaly Filters */}
          <div className="flex items-center gap-4 p-4 bg-slate-800/40 rounded-lg">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <span className="text-slate-300">Filter by Severity:</span>
            </div>
            {[
              { value: 'all', label: 'All Severity' },
              { value: 'critical', label: 'Critical' },
              { value: 'high', label: 'High' },
              { value: 'medium', label: 'Medium' },
              { value: 'low', label: 'Low' }
            ].map(severity => (
              <button
                key={severity.value}
                onClick={() => setFilterSeverity(severity.value)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  filterSeverity === severity.value
                    ? 'bg-indigo-500/20 text-indigo-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                {severity.label}
              </button>
            ))}
          </div>

          {/* Active Anomalies */}
          <GlassCard title="Active Network Anomalies" icon={AlertTriangle}>
            <div className="space-y-4">
              {filteredAnomalies.map((anomaly, index) => (
                <motion.div
                  key={anomaly.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors border-l-4 border-l-orange-500"
                  onClick={() => setSelectedAnomaly(anomaly)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(anomaly.severity)}`}>
                        {anomaly.severity}
                      </span>
                      <span className="text-lg font-semibold text-white">{anomaly.type}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-slate-400">Confidence</div>
                      <div className="text-sm font-semibold text-green-400">{anomaly.confidence}%</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div>
                      <span className="text-xs text-slate-400">Source</span>
                      <div className="text-sm text-white font-mono">{anomaly.source}</div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Destination</span>
                      <div className="text-sm text-white font-mono">{anomaly.destination}</div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Protocol</span>
                      <div className="text-sm text-cyan-400">{anomaly.protocol}</div>
                    </div>
                    <div>
                      <span className="text-xs text-slate-400">Volume</span>
                      <div className="text-sm text-orange-400">{anomaly.volume}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-xs text-slate-400">Detection Time: {anomaly.detectionTime}</span>
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        anomaly.status === 'blocked' ? 'bg-green-500/20 text-green-400' :
                        anomaly.status === 'investigating' ? 'bg-blue-500/20 text-blue-400' :
                        anomaly.status === 'mitigating' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {anomaly.status}
                      </span>
                    </div>

                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded text-xs transition-colors">
                        Investigate
                      </button>
                      <button className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-xs transition-colors">
                        Block
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Network Segmentation View */}
      {selectedView === 'segmentation' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {networkSegments.map((segment, index) => (
            <motion.div
              key={segment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-slate-800/50 rounded-lg p-6"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-indigo-500/20 rounded-lg">
                    <Grid3X3 className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{segment.name}</h3>
                    <p className="text-xs text-slate-400">{segment.type}</p>
                  </div>
                </div>
                <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                  segment.isolation === 'Complete' ? 'bg-green-500/20 text-green-400' :
                  segment.isolation === 'Air-Gapped' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`}>
                  {segment.isolation}
                </span>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-slate-400 mb-1">Devices</div>
                  <div className="text-xl font-bold text-cyan-400">{segment.devices}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Users</div>
                  <div className="text-xl font-bold text-purple-400">{segment.users}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Traffic</div>
                  <div className="text-xl font-bold text-green-400">{segment.traffic}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 mb-1">Active Threats</div>
                  <div className={`text-xl font-bold ${
                    segment.threats === 0 ? 'text-green-400' :
                    segment.threats <= 5 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                    {segment.threats}
                  </div>
                </div>
              </div>

              {/* Additional Details */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Compliance:</span>
                  <span className="text-green-400">{segment.compliance}</span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex space-x-2">
                <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-sm transition-colors">
                  View Details
                </button>
                <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-sm transition-colors">
                  Isolate
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Threat Hunting View */}
      {selectedView === 'threat_hunting' && (
        <div className="space-y-6">
          <GlassCard title="Advanced Threat Hunting Platforms" icon={Target}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {threatHuntingCAPs.map((cap, index) => (
                <motion.div
                  key={cap.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-800/50 rounded-lg p-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-6 h-6 text-orange-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{cap.name}</h3>
                        <p className="text-xs text-slate-400">{cap.engine}</p>
                      </div>
                    </div>
                    <div className={`w-3 h-3 rounded-full ${cap.active ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  </div>

                  {/* Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Detection Rate</div>
                      <div className="text-xl font-bold text-green-400">{cap.detectionRate}%</div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">False Positive</div>
                      <div className="text-xl font-bold text-orange-400">{cap.falsePositiveRate}%</div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-slate-400 mb-2">Coverage Area</div>
                    <div className="text-sm text-white font-medium">{cap.coverage}</div>
                  </div>

                  {/* Status Indicators */}
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Status:</span>
                    <span className={`font-semibold ${cap.active ? 'text-green-400' : 'text-red-400'}`}>
                      {cap.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Control */}
                  <div className="flex space-x-2 mt-4">
                    <button className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                      cap.active
                        ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400'
                        : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
                    }`}>
                      {cap.active ? 'Pause' : 'Activate'}
                    </button>
                    <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-sm transition-colors">
                      Configure
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* Zero Trust View */}
      {selectedView === 'zero_trust' && (
        <div className="space-y-6">
          <GlassCard title="Zero Trust Network Access (ZTNA)" icon={Shield}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {zeroTrustEnforcement.map((policy, index) => (
                <motion.div
                  key={policy.policy}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-slate-800/50 rounded-lg p-6"
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white">{policy.policy}</h3>
                    <div className="flex items-center space-x-2">
                      {policy.adaptive && (
                        <span className="inline-flex px-2 py-1 rounded text-xs font-semibold bg-blue-500/20 text-blue-400">
                          Adaptive
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300">Access Requests</span>
                      <span className="text-lg font-bold text-green-400">{policy.matched}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-300">Blocked Access</span>
                      <span className="text-lg font-bold text-red-400">{policy.blocked}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>

                  <div className="text-xs text-slate-400">
                    Last Updated: {policy.lastUpdated}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* ZTNA Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Verified Sessions', value: '846', icon: CheckCircle, color: 'text-green-400' },
              { title: 'Risk Assessment', value: 'Low', icon: Shield, color: 'text-blue-400' },
              { title: 'Adaptive Rules', value: '23', icon: Zap, color: 'text-purple-400' },
              { title: 'Continuous Auth', value: '99.2%', icon: Lock, color: 'text-cyan-400' }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <GlassCard className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-xs text-slate-400">{metric.title}</div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Anomaly Detail Modal */}
      <AnimatePresence>
        {selectedAnomaly && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedAnomaly(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedAnomaly.type} Detection</h2>
                    <p className="text-slate-400">ID: {selectedAnomaly.id}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(selectedAnomaly.severity)}`}>
                    {selectedAnomaly.severity}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    selectedAnomaly.status === 'blocked' ? 'text-green-400 bg-green-500/20' :
                    selectedAnomaly.status === 'investigating' ? 'text-blue-400 bg-blue-500/20' :
                    selectedAnomaly.status === 'mitigating' ? 'text-yellow-400 bg-yellow-500/20' :
                    'text-red-400 bg-red-500/20'
                  }`}>
                    {selectedAnomaly.status}
                  </span>
                  <button onClick={() => setSelectedAnomaly(null)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Anomaly Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Network Traffic Analysis</h3>

                    <div className="space-y-4">
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">Source → Destination</div>
                        <div className="text-lg font-mono text-white">
                          {selectedAnomaly.source} → {selectedAnomaly.destination}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">Protocol</div>
                          <div className="text-lg font-semibold text-cyan-400">{selectedAnomaly.protocol}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">Data Volume</div>
                          <div className="text-lg font-semibold text-orange-400">{selectedAnomaly.volume}</div>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">Detection Confidence</div>
                        <div className="flex items-center space-x-2">
                          <div className="text-2xl font-bold text-green-400">{selectedAnomaly.confidence}%</div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                              style={{ width: `${selectedAnomaly.confidence}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Response Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Automated Response Actions</h3>

                    <div className="space-y-3">
                      {[
                        { action: 'Isolate Source System', status: 'executed', time: '08:32:30 IST' },
                        { action: 'Block Source IPs', status: 'executed', time: '08:32:32 IST' },
                        { action: 'Enable Enhanced Logging', status: 'executed', time: '08:32:33 IST' },
                        { action: 'Notify SOC Team', status: 'sent', time: '08:32:35 IST' },
                        { action: 'Traffic Analysis Report', status: 'pending', time: 'Pending' }
                      ].map((action, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                          <div className={`w-4 h-4 rounded-full ${
                            action.status === 'executed' ? 'bg-green-400' :
                            action.status === 'sent' ? 'bg-blue-400' :
                            'bg-yellow-400'
                          }`}></div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{action.action}</div>
                            <div className="text-xs text-slate-400">{action.time}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-2">
                      <button className="w-full px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg font-medium">
                        Deep Traffic Analysis
                      </button>
                      <button className="w-full px-4 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg font-medium">
                        Whitelist Exception
                      </button>
                      <button className="w-full px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg font-medium">
                        Add to Threat Intel
                      </button>
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

export default EnterpriseNetworkDefenseCenter;
