import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Network,
  Wifi,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Monitor,
  Globe,
  RefreshCw,
  Settings,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Zap,
  Server,
  Router,
  HardDrive,
  Database,
  Users,
  Lock,
  Eye,
  Play,
  Pause,
  MapPin,
  Filter,
  Search,
  MoreHorizontal,
  Cpu,
  MemoryStick,
  ArrowRight,
  ArrowLeft,
  Target,
  X,
  Bell
} from 'lucide-react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const NetworkMonitor = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Comprehensive network device inventory
  const [networkDevices] = useState([
    {
      id: 'FW-001',
      name: 'Core Firewall',
      type: 'Firewall',
      ip: '192.168.1.1',
      status: 'online',
      uptime: '45d 12h',
      bandwidth: 98.5,
      connections: 15420,
      threats: 3,
      blocked: 1456,
      lastSeen: 'Now',
      location: 'Data Center A',
      firmware: 'v8.2.1',
      cpu: 23,
      memory: 67,
      alerts: 2
    },
    {
      id: 'RT-001',
      name: 'Main Router',
      type: 'Router',
      ip: '192.168.1.254',
      status: 'online',
      uptime: '67d 8h',
      bandwidth: 78.3,
      connections: 8945,
      threats: 0,
      blocked: 234,
      lastSeen: 'Now',
      location: 'Data Center A',
      firmware: 'v16.2.3',
      cpu: 45,
      memory: 89,
      alerts: 1
    },
    {
      id: 'SW-001',
      name: 'Core Switch A',
      type: 'Switch',
      ip: '192.168.2.1',
      status: 'online',
      uptime: '23d 18h',
      bandwidth: 92.7,
      connections: 2847,
      threats: 1,
      blocked: 89,
      lastSeen: 'Now',
      location: 'Data Center B',
      firmware: 'v12.1.5',
      cpu: 12,
      memory: 45,
      alerts: 0
    },
    {
      id: 'NAS-001',
      name: 'Storage Server',
      type: 'NAS',
      ip: '192.168.3.10',
      status: 'warning',
      uptime: '12d 6h',
      bandwidth: 45.2,
      connections: 125,
      threats: 5,
      blocked: 234,
      lastSeen: '2min ago',
      location: 'Data Center C',
      firmware: 'v7.8.9',
      cpu: 78,
      memory: 95,
      alerts: 7
    },
    {
      id: 'VPN-001',
      name: 'VPN Gateway',
      type: 'VPN',
      ip: 'external.example.com',
      status: 'online',
      uptime: '98d 14h',
      bandwidth: 15.7,
      connections: 467,
      threats: 2,
      blocked: 123,
      lastSeen: 'Now',
      location: 'DMZ',
      firmware: 'v9.3.1',
      cpu: 23,
      memory: 34,
      alerts: 0
    }
  ]);

  // Firewall rules
  const [firewallRules] = useState([
    {
      id: 'FW-RULE-001',
      name: 'SSH Access - Dev Team',
      source: '10.0.10.0/24',
      destination: '192.168.2.0/24',
      port: 22,
      protocol: 'TCP',
      action: 'allow',
      hits: 15432,
      lastHit: '8:32:15 IST',
      status: 'active'
    },
    {
      id: 'FW-RULE-002',
      name: 'HTTPS External',
      source: 'any',
      destination: '192.168.1.100',
      port: 443,
      protocol: 'TCP',
      action: 'allow',
      hits: 89567,
      lastHit: 'Now',
      status: 'active'
    },
    {
      id: 'FW-RULE-003',
      name: 'Block Malware C2',
      source: 'any',
      destination: 'malicious-domain.com',
      port: 'any',
      protocol: 'any',
      action: 'block',
      hits: 245,
      lastHit: '2h ago',
      status: 'active'
    }
  ]);

  // Network traffic data for charts
  const [trafficData] = useState({
    labels: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    datasets: [
      {
        label: 'Inbound (Gbps)',
        data: [12.3, 15.7, 18.2, 22.4, 28.9, 25.6, 31.2, 29.8, 35.1, 32.4, 28.7, 24.3],
        fill: true,
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderColor: 'rgba(59, 130, 246, 0.8)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      },
      {
        label: 'Outbound (Gbps)',
        data: [8.9, 11.2, 13.8, 17.6, 20.3, 19.8, 23.4, 21.9, 25.7, 24.1, 20.8, 18.6],
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 0.8)',
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }
    ]
  });

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#94a3b8'
        }
      },
      tooltip: {
        backgroundColor: '#1e293b',
        borderColor: '#334155',
        borderWidth: 1
      }
    },
    scales: {
      x: {
        grid: {
          color: '#334155'
        },
        ticks: {
          color: '#94a3b8'
        }
      },
      y: {
        grid: {
          color: '#334155'
        },
        ticks: {
          color: '#94a3b8'
        }
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'offline': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDeviceIcon = (type) => {
    const icons = {
      Firewall: Shield,
      Router: Router,
      Switch: Network,
      NAS: Database,
      VPN: Lock
    };
    return icons[type] || Network;
  };

  const filteredDevices = networkDevices.filter(device =>
    device.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus === 'all' || device.status === filterStatus)
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-cyan-900 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl shadow-lg">
            <Network className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Network Monitoring Center
            </h1>
            <p className="text-slate-400 text-sm">Real-time network infrastructure monitoring and analysis</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Global Alert Indicator */}
          <div className="relative">
            <button className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors">
              <Bell className="w-4 h-4" />
            </button>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{networkDevices.reduce((sum, dev) => sum + dev.alerts, 0)}</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-200 flex items-center space-x-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </motion.div>

      {/* View Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Monitor },
          { id: 'devices', label: 'Devices', icon: Server },
          { id: 'traffic', label: 'Traffic', icon: Activity },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'topology', label: 'Topology', icon: MapPin }
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

      {/* Overview Tab */}
      {selectedView === 'overview' && (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[{
              title: 'Total Bandwidth',
              value: '44.5 Gbps',
              change: '+5.2%',
              trend: 'up',
              icon: Wifi,
              color: 'blue'
            }, {
              title: 'Network Security',
              value: '94%',
              change: '+2.3%',
              trend: 'up',
              icon: Shield,
              color: 'green'
            }, {
              title: 'Active Connections',
              value: '2,845,690',
              change: '+8.1%',
              trend: 'up',
              icon: Users,
              color: 'purple'
            }, {
              title: 'Threats Blocked',
              value: '2,456',
              change: '-15.3%',
              trend: 'down',
              icon: Target,
              color: 'red'
            }].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                      <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.title}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Network Traffic Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Network Traffic - Last 24 Hours</h2>
              </div>
              <div className="h-64">
                <Line data={trafficData} options={chartOptions} />
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <Globe className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Protocol Distribution</h2>
              </div>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Protocol breakdown visualization</p>
                  <div className="mt-4 space-y-2 text-xs">
                    {[['HTTP/HTTPS', '45%'], ['TCP', '28%'], ['UDP', '15%'], ['Other', '12%']].map(([protocol, percentage]) => (
                      <div key={protocol} className="flex justify-between">
                        <span>{protocol}:</span>
                        <span className="text-cyan-400">{percentage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Network Events */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Activity className="w-6 h-6 text-green-400" />
                <span>Recent Network Events</span>
              </h2>
              <span className="text-xs text-slate-400">Last 10 minutes</span>
            </div>
            <div className="space-y-4">
              {[
                { time: '08:42:15', event: 'High bandwidth alert', type: 'warning', details: 'Inbound traffic exceeded 90% capacity' },
                { time: '08:38:22', event: 'New device connected', type: 'info', details: 'Mobile device joined WiFi network' },
                { time: '08:35:47', event: 'VPN tunnel established', type: 'success', details: 'Remote user connection secure' },
                { time: '08:32:11', event: 'Malware blocked', type: 'danger', details: 'Ransomware signature detected and quarantined' },
                { time: '08:28:33', event: 'Certificate renewed', type: 'success', details: 'SSL certificate auto-renewed successfully' }
              ].map((event, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'warning' ? 'bg-yellow-400' :
                    event.type === 'danger' ? 'bg-red-400' :
                    event.type === 'success' ? 'bg-green-400' :
                    'bg-blue-400'
                  }`}></div>
                  <div className="text-sm text-slate-300">{event.event}</div>
                  <div className="text-xs text-slate-500 ml-auto">{event.time}</div>
                  <Eye className="w-4 h-4 text-slate-400 cursor-pointer hover:text-white transition-colors" />
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Devices Tab */}
      {selectedView === 'devices' && (
        <>
          {/* Search and Filter Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/25"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/25"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="warning">Warning</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredDevices.map((device, index) => {
              const Icon = getDeviceIcon(device.type);
              return (
                <motion.div
                  key={device.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="cursor-pointer hover:bg-slate-700/50 transition-colors">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-cyan-500/20 rounded-lg">
                          <Icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{device.name}</h3>
                          <p className="text-xs text-slate-400">{device.ip}</p>
                        </div>
                      </div>
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(device.status)}`}>
                        {device.status}
                      </span>
                    </div>

                    {/* Device Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Bandwidth</div>
                        <div className="text-lg font-bold text-green-400">{device.bandwidth}%</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Connections</div>
                        <div className="text-lg font-bold text-blue-400">{device.connections.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">CPU</div>
                        <div className={`text-lg font-bold ${device.cpu > 80 ? 'text-red-400' : device.cpu > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {device.cpu}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400 mb-1">Memory</div>
                        <div className={`text-lg font-bold ${device.memory > 90 ? 'text-red-400' : device.memory > 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                          {device.memory}%
                        </div>
                      </div>
                    </div>

                    {/* Status Bar */}
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          device.status === 'online' ? 'bg-green-500' :
                          device.status === 'warning' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: '100%' }}
                      ></div>
                    </div>

                    {/* Device Details */}
                    <div className="text-xs text-slate-400 space-y-1">
                      <div>Firmware: {device.firmware}</div>
                      <div>Location: {device.location}</div>
                      <div>Uptime: {device.uptime}</div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 mt-4">
                      <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-xs transition-colors">
                        Configure
                      </button>
                      <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-xs transition-colors">
                        Reboot
                      </button>
                      {device.alerts > 0 && (
                        <div className="relative">
                          <button className="px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded text-xs transition-colors">
                            <Bell className="w-4 h-4" />
                          </button>
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">{device.alerts}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </>
      )}

      {/* Traffic Analysis Tab */}
      {selectedView === 'traffic' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <h2 className="text-xl font-bold text-white">Real-time Traffic Analysis</h2>
              </div>
              <div className="h-64">
                <Line data={trafficData} options={chartOptions} />
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">Top Talkers</h2>
              </div>
              <div className="space-y-3">
                {[
                  { ip: '192.168.1.100', traffic: '2.4 Gbps', type: 'Web Server' },
                  { ip: '10.0.5.23', traffic: '1.8 Gbps', type: 'Database' },
                  { ip: '192.168.3.45', traffic: '1.3 Gbps', type: 'File Server' },
                  { ip: '10.0.2.67', traffic: '987 Mbps', type: 'Application Server' },
                  { ip: '192.168.4.12', traffic: '756 Mbps', type: 'API Gateway' }
                ].map((talker, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-sm text-white font-mono">{talker.ip}</div>
                      <div className="text-xs text-slate-400">{talker.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-cyan-400 font-semibold">{talker.traffic}</div>
                      <div className="text-xs text-slate-400">Peak Usage</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Firewall Rules */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Shield className="w-6 h-6 text-green-400" />
                <span>Active Firewall Rules</span>
              </h2>
              <span className="text-xs text-slate-400">{firewallRules.length} total rules</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Rule Name</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Source</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Destination</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Port</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Action</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Hits</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Last Hit</th>
                  </tr>
                </thead>
                <tbody>
                  {firewallRules.map((rule, index) => (
                    <tr key={rule.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                      <td className="py-3 px-4 text-slate-200 font-medium">{rule.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-400 text-xs">{rule.source}</td>
                      <td className="py-3 px-4 font-mono text-slate-400 text-xs">{rule.destination}</td>
                      <td className="py-3 px-4 text-slate-300">{rule.port}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          rule.action === 'allow' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {rule.action}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-cyan-400 font-semibold">{rule.hits.toLocaleString()}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{rule.lastHit}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {selectedView === 'security' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[{
              title: 'Active IDS Signatures',
              value: '1,247',
              icon: Target,
              color: 'cyan',
              description: '+12 from yesterday'
            }, {
              title: 'Blocked Threats',
              value: '8,561',
              icon: Shield,
              color: 'green',
              description: '+234 in last hour'
            }, {
              title: 'Quarantined Files',
              value: '89',
              icon: AlertTriangle,
              color: 'yellow',
              description: 'Pending review'
            }].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <metric.icon className={`w-8 h-8 text-${metric.color}-400`} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{metric.value}</div>
                  <div className="text-sm text-slate-400 mb-1">{metric.title}</div>
                  <div className="text-xs text-slate-500">{metric.description}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span>Recent Security Events</span>
              </h2>
              <select className="px-3 py-1 bg-slate-800/50 border border-slate-600/50 rounded text-sm text-slate-300">
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="space-y-4">
              {[
                { time: '08:45:23', event: 'Port scan detected', severity: 'high', source: '203.0.113.1', details: 'Attempted scan of ports 1-1024' },
                { time: '08:32:15', event: 'Malware signature match', severity: 'critical', source: '192.168.2.45', details: 'Trojan.Generic detected in email attachment' },
                { time: '08:28:47', event: 'DDoS mitigation activated', severity: 'high', source: 'botnet_cluster', details: 'SYN flood attack from 45+ sources' },
                { time: '08:15:33', event: 'Unauthorized login attempt', severity: 'medium', source: 'external_ip', details: 'Multiple failed SSH attempts' }
              ].map((event, index) => (
                <div key={index} className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-l-red-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                        event.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        event.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {event.severity}
                      </span>
                      <span className="text-lg font-semibold text-white">{event.event}</span>
                    </div>
                    <div className="text-xs text-slate-500">{event.time}</div>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">
                    Source: {event.source} • {event.details}
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Investigate</button>
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs">Block</button>
                    <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-xs">Report</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Topology Tab */}
      {selectedView === 'topology' && (
        <Card>
          <div className="flex items-center space-x-3 mb-6">
            <MapPin className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Network Topology Map</h2>
          </div>
          <div className="h-96 flex items-center justify-center">
            <div className="text-center text-slate-400">
              <Network className="w-20 h-20 mx-auto mb-4 opacity-50" />
              <p className="text-lg mb-2">Interactive Network Topology</p>
              <p className="text-sm">Visual representation of network architecture and device connections</p>
              <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 max-w-lg mx-auto">
                {[
                  { label: 'Internet Gateway', status: 'online', devices: 1 },
                  { label: 'DMZ Zone', status: 'online', devices: 12 },
                  { label: 'Internal Network', status: 'mixed', devices: 234 },
                  { label: 'Development Zone', status: 'online', devices: 45 },
                  { label: 'Storage Zone', status: 'warning', devices: 15 },
                  { label: 'Management Zone', status: 'online', devices: 8 }
                ].map((zone, index) => (
                  <div key={index} className="text-center">
                    <div className={`inline-block w-3 h-3 rounded-full mb-2 ${
                      zone.status === 'online' ? 'bg-green-400' :
                      zone.status === 'warning' ? 'bg-yellow-400' :
                      zone.status === 'offline' ? 'bg-red-400' :
                      'bg-orange-400'
                    }`}></div>
                    <div className="text-xs font-medium text-white">{zone.label}</div>
                    <div className="text-xs text-slate-400">{zone.devices} devices</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default NetworkMonitor;
