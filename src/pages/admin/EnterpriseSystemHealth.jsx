import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Server,
  Database,
  Network,
  HardDrive,
  Cpu,
  MemoryStick,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Settings,
  Shield,
  Wifi,
  Cloud,
  Users,
  BarChart3,
  TrendingUp,
  RefreshCw
} from 'lucide-react';

// Mock infrastructure data for enterprise monitoring
const infrastructureData = {
  datacenters: [
    {
      id: 'dc1',
      name: 'Primary DC - East Coast',
      location: 'Ashburn, VA',
      status: 'healthy',
      servers: 156,
      activeServers: 154,
      criticalAlerts: 2,
      warningAlerts: 5,
      cpuUtilization: 68,
      memoryUtilization: 74,
      networkTraffic: 42,
      uptime: '99.97%',
      lastBackup: '2 hours ago',
      temperature: 22.5,
      powerConsumption: 245
    },
    {
      id: 'dc2',
      name: 'Secondary DC - West Coast',
      location: 'San Jose, CA',
      status: 'warning',
      servers: 142,
      activeServers: 140,
      criticalAlerts: 1,
      warningAlerts: 8,
      cpuUtilization: 72,
      memoryUtilization: 78,
      networkTraffic: 38,
      uptime: '99.92%',
      lastBackup: '1 hour ago',
      temperature: 24.1,
      powerConsumption: 198
    },
    {
      id: 'dc3',
      name: 'Cloud Primary - AWS',
      location: 'us-east-1',
      status: 'healthy',
      servers: 89,
      activeServers: 89,
      criticalAlerts: 0,
      warningAlerts: 2,
      cpuUtilization: 55,
      memoryUtilization: 61,
      networkTraffic: 28,
      uptime: '99.99%',
      lastBackup: '30 minutes ago',
      temperature: 'N/A',
      powerConsumption: 'N/A'
    }
  ],
  services: [
    { name: 'Web Application Servers', status: 'healthy', uptime: '99.95%', responseTime: '245ms', load: 67, endpoints: 12 },
    { name: 'Database Clusters', status: 'healthy', uptime: '99.98%', responseTime: '12ms', load: 58, endpoints: 8 },
    { name: 'API Gateways', status: 'warning', uptime: '99.89%', responseTime: '345ms', load: 78, endpoints: 6 },
    { name: 'Load Balancers', status: 'healthy', uptime: '99.97%', responseTime: '67ms', load: 52, endpoints: 4 },
    { name: 'Auth Services', status: 'healthy', uptime: '99.94%', responseTime: '189ms', load: 43, endpoints: 3 },
    { name: 'Message Queues', status: 'critical', uptime: '98.2%', responseTime: '456ms', load: 91, endpoints: 2 },
  ],
  network: {
    totalBandwidth: '200 Gbps',
    usedBandwidth: '89 Gbps',
    packetLoss: '0.02%',
    latency: '3.2ms',
    connections: 2845690,
    vpnConnections: 1250,
    firewallRules: 15420,
    activeRoutes: 8923
  },
  storage: [
    {
      name: 'Primary SAN',
      type: 'Block Storage',
      used: 8.2,
      total: 50,
      unit: 'TB',
      iops: 45200,
      latency: '0.8ms',
      status: 'healthy',
      utilization: '16.4%'
    },
    {
      name: 'Backup SAN',
      type: 'Block Storage',
      used: 3.8,
      total: 40,
      unit: 'TB',
      iops: 32100,
      latency: '1.2ms',
      status: 'healthy',
      utilization: '9.5%'
    },
    {
      name: 'Cloud Storage',
      type: 'Object Storage',
      used: 12.5,
      total: 100,
      unit: 'TB',
      iops: 'N/A',
      latency: '45ms',
      status: 'warning',
      utilization: '12.5%'
    },
  ],
  applications: [
    { name: 'Core Banking', status: 'healthy', users: 45000, transactions: 125000, uptime: '99.99%' },
    { name: 'Customer Portal', status: 'healthy', users: 89000, sessions: 3400, uptime: '99.97%' },
    { name: 'Mobile App', status: 'warning', users: 125000, apiCalls: 2850000, uptime: '99.91%' },
    { name: 'Analytics Platform', status: 'healthy', users: 1800, queries: 45100, uptime: '99.98%' },
    { name: 'Admin Dashboard', status: 'healthy', users: 850, requests: 56000, uptime: '99.95%' }
  ]
};

const performanceTrends = [
  { time: '00:00', cpu: 65, memory: 72, network: 40, storage: 85 },
  { time: '04:00', cpu: 58, memory: 68, network: 35, storage: 84 },
  { time: '08:00', cpu: 72, memory: 76, network: 55, storage: 86 },
  { time: '12:00', cpu: 78, memory: 82, network: 68, storage: 87 },
  { time: '16:00', cpu: 75, memory: 79, network: 62, storage: 85 },
  { time: '20:00', cpu: 69, memory: 74, network: 48, storage: 84 },
  { time: 'Now', cpu: 71, memory: 76, network: 52, storage: 86 }
];

const EnterpriseSystemHealth = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedDC, setSelectedDC] = useState('dc1');
  const [selectedTab, setSelectedTab] = useState('overview');

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRefreshing(false);
  };

  const getStatusColor = (status, type = 'text') => {
    const colors = {
      healthy: type === 'bg' ? 'bg-green-500/20 border-green-500/30' : 'text-green-400',
      warning: type === 'bg' ? 'bg-yellow-500/20 border-yellow-500/30' : 'text-yellow-400',
      critical: type === 'bg' ? 'bg-red-500/20 border-red-500/30' : 'text-red-400'
    };
    return colors[status] || (type === 'bg' ? 'bg-gray-500/20 border-gray-500/30' : 'text-gray-400');
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  const currentDC = infrastructureData.datacenters.find(dc => dc.id === selectedDC);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg">
            <Server className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Enterprise Infrastructure Monitor
            </h1>
            <p className="text-slate-400 text-sm">Real-time system health and performance across all enterprise assets</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-white">Overall Health</div>
            <div className="text-lg text-green-400 font-bold">97.4%</div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-200 flex items-center space-x-2 ${
              refreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex space-x-1 mb-6 bg-slate-800/50 rounded-lg p-1"
      >
        {['overview', 'datacenters', 'network', 'storage', 'applications'].map(tab => (
          <button
            key={tab}
            onClick={() => setSelectedTab(tab)}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all ${
              selectedTab === tab
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </motion.div>

      {/* Content based on selected tab */}
      {selectedTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Server className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {infrastructureData.datacenters.reduce((acc, dc) => acc + dc.activeServers, 0)}
                    </div>
                    <div className="text-sm text-slate-400">Total Active Servers</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-green-400">+2 from yesterday</div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Network className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-cyan-400">{infrastructureData.network.connections.toLocaleString()}</div>
                    <div className="text-sm text-slate-400">Active Connections</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-cyan-400">44.5% network utilization</div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <HardDrive className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">87%</div>
                    <div className="text-sm text-slate-400">Storage Capacity</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-400">6</div>
                    <div className="text-sm text-slate-400">Active Alerts</div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <div className="text-sm text-red-400">2 critical, 4 warning</div>
              </div>
            </Card>
          </div>

          {/* Service Health */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <Activity className="w-6 h-6 text-cyan-400" />
              <span>Core Services Status</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {infrastructureData.services.map((service, index) => (
                <motion.div
                  key={service.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-slate-900/50 rounded-lg p-4 border ${
                    service.status === 'healthy' ? 'border-green-500/20' :
                    service.status === 'warning' ? 'border-yellow-500/20' :
                    'border-red-500/20'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-white truncate">{service.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(service.status, 'bg')}`}>
                      {service.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Uptime:</span>
                      <span className="text-green-400">{service.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Response:</span>
                      <span className="text-cyan-400">{service.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Endpoints:</span>
                      <span className="text-white">{service.endpoints}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Load:</span>
                      <span className={service.load > 80 ? 'text-red-400' : service.load > 60 ? 'text-yellow-400' : 'text-green-400'}>
                        {service.load}%
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {selectedTab === 'datacenters' && (
        <div className="grid grid-cols-1 gap-6">
          {/* Data Center Selector */}
          <Card>
            <h2 className="text-xl font-bold text-white mb-4">Data Center Selection</h2>
            <div className="flex space-x-4">
              {infrastructureData.datacenters.map((dc, index) => (
                <button
                  key={dc.id}
                  onClick={() => setSelectedDC(dc.id)}
                  className={`px-6 py-3 rounded-lg font-medium text-sm transition-all ${
                    selectedDC === dc.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                      : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <Globe className={`w-4 h-4 ${selectedDC === dc.id ? 'text-white' : 'text-slate-400'}`} />
                    <span>{dc.name.split(' - ')[0]}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Selected DC Details */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg ${getStatusColor(currentDC.status)}`}>
                  <Server className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{currentDC.name}</h3>
                  <p className="text-slate-400">{currentDC.location}</p>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(currentDC.status, 'bg')}`}>
                {currentDC.status} • {currentDC.uptime} uptime
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-lg font-bold text-blue-400">CPU</div>
                <div className="text-3xl font-bold text-white mb-2">{currentDC.cpuUtilization}%</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full"
                    style={{ width: `${currentDC.cpuUtilization}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-lg font-bold text-green-400">Memory</div>
                <div className="text-3xl font-bold text-white mb-2">{currentDC.memoryUtilization}%</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 h-2 rounded-full"
                    style={{ width: `${currentDC.memoryUtilization}%` }}
                  ></div>
                </div>
              </div>

              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-lg font-bold text-purple-400">Network</div>
                <div className="text-3xl font-bold text-white mb-2">{currentDC.networkTraffic} Gbps</div>
                <div className="text-sm text-slate-400">Current load</div>
              </div>

              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-lg font-bold text-yellow-400">Servers</div>
                <div className="text-2xl font-bold text-white mb-2">{currentDC.activeServers}/{currentDC.servers}</div>
                <div className="text-sm text-slate-400">Active/Total</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-slate-400">Power Consumption</div>
                  <div className="text-white font-semibold">
                    {currentDC.powerConsumption === 'N/A' ? 'N/A' : `${currentDC.powerConsumption} kW`}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400">Temperature</div>
                  <div className="text-white font-semibold">
                    {currentDC.temperature === 'N/A' ? 'N/A' : `${currentDC.temperature}°C`}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-slate-400">Alerts</div>
                  <div className="text-white font-semibold">
                    {currentDC.criticalAlerts} critical, {currentDC.warningAlerts} warning
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedTab === 'network' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <Network className="w-6 h-6 text-purple-400" />
              <span>Network Infrastructure</span>
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                <span className="text-slate-400">Total Bandwidth</span>
                <span className="text-white font-semibold">{infrastructureData.network.totalBandwidth}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                <span className="text-slate-400">Used Bandwidth</span>
                <span className="text-blue-400 font-semibold">{infrastructureData.network.usedBandwidth}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                <span className="text-slate-400">Packet Loss</span>
                <span className="text-green-400">{infrastructureData.network.packetLoss}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                <span className="text-slate-400">Average Latency</span>
                <span className="text-cyan-400">{infrastructureData.network.latency}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                <span className="text-slate-400">Active Connections</span>
                <span className="text-white font-semibold">{infrastructureData.network.connections.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                <span className="text-slate-400">VPN Connections</span>
                <span className="text-purple-400">{infrastructureData.network.vpnConnections}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-slate-700/30">
                <span className="text-slate-400">Firewall Rules</span>
                <span className="text-yellow-400">{infrastructureData.network.firewallRules.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Active Routes</span>
                <span className="text-white font-semibold">{infrastructureData.network.activeRoutes.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Current Bandwidth Usage</span>
                <span className="text-white">44.5%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full" style={{ width: '44.5%' }}></div>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <Wifi className="w-6 h-6 text-green-400" />
              <span>Network Security</span>
            </h2>

            <div className="space-y-4">
              {[
                { name: 'Intrusion Detection', status: 'active', events: 142, lastEvent: '2 min ago' },
                { name: 'DDoS Protection', status: 'active', events: 3, lastEvent: '4 hours ago' },
                { name: 'Web Application Firewall', status: 'warning', events: 89, lastEvent: '12 min ago' },
                { name: 'SSL/TLS Inspection', status: 'active', events: 0, lastEvent: 'Never' },
              ].map((security, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-medium">{security.name}</div>
                    <div className="text-xs text-slate-400">
                      {security.events} events • Last: {security.lastEvent}
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    security.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {security.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-700/50">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Security Score</span>
                <span className="text-white">94/100</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-3">
                <div className="bg-gradient-to-r from-green-500 to-yellow-500 h-3 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {selectedTab === 'storage' && (
        <Card>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
            <HardDrive className="w-6 h-6 text-yellow-400" />
            <span>Storage Infrastructure</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {infrastructureData.storage.map((storage, index) => (
              <motion.div
                key={storage.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-yellow-500/20 rounded-lg">
                      {storage.type === 'Block Storage' ? <Database className="w-5 h-5 text-yellow-400" /> : <Cloud className="w-5 h-5 text-yellow-400" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{storage.name}</h3>
                      <p className="text-xs text-slate-400">{storage.type}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(storage.status, 'bg')}`}>
                    {storage.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Capacity</span>
                      <span className="text-white">{storage.used}/{storage.total} {storage.unit}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${storage.utilization.includes('<') ? 'bg-green-500' : 'bg-gradient-to-r from-green-500 to-red-500'}`}
                        style={{ width: storage.utilization.replace('%', '') + '%' }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{storage.utilization} utilized</div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="text-center p-2 bg-slate-800/50 rounded">
                      <div className="text-slate-400">IOPS</div>
                      <div className="text-white font-semibold">{storage.iops}</div>
                    </div>
                    <div className="text-center p-2 bg-slate-800/50 rounded">
                      <div className="text-slate-400">Latency</div>
                      <div className="text-white font-semibold">{storage.latency}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Storage Performance Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-slate-400 text-sm">Total Capacity</div>
                <div className="text-white text-xl font-bold">180 TB</div>
                <div className="text-slate-500 text-xs">75 TB available</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm">Average IOPS</div>
                <div className="text-white text-xl font-bold">38,650</div>
                <div className="text-slate-500 text-xs">Performance rating: Good</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400 text-sm">Total Backups</div>
                <div className="text-white text-xl font-bold">4.2 TB</div>
                <div className="text-slate-500 text-xs">Last backup: 2 hours ago</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {selectedTab === 'applications' && (
        <Card>
          <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
            <Users className="w-6 h-6 text-pink-400" />
            <span>Application Health</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {infrastructureData.applications.map((app, index) => (
              <motion.div
                key={app.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{app.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(app.status, 'bg')}`}>
                    {app.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-cyan-400">{app.users.toLocaleString()}</div>
                    <div className="text-xs text-slate-400">Active Users</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{app.uptime}</div>
                    <div className="text-xs text-slate-400">Uptime</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-700/30">
                  <div className="text-center">
                    <div className="text-slate-400 text-xs">
                      {app.name.includes('App') ? 'API Calls' : app.name.includes('Banking') ? 'Transactions' : app.name.includes('Portal') ? 'Active Sessions' : 'Queries Processed'}
                    </div>
                    <div className="text-white text-lg font-semibold">
                      {(app.transactions || app.sessions || app.apiCalls || app.queries || app.requests || 0).toLocaleString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Application Performance Trends</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-lg font-bold text-green-400">99.96%</div>
                <div className="text-sm text-slate-400">Average Uptime</div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-lg font-bold text-cyan-400">245,000</div>
                <div className="text-sm text-slate-400">Active Users</div>
              </div>
              <div className="text-center p-4 bg-slate-900/50 rounded-lg">
                <div className="text-lg font-bold text-purple-400">3.2M</div>
                <div className="text-sm text-slate-400">Total Transactions</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default EnterpriseSystemHealth;
