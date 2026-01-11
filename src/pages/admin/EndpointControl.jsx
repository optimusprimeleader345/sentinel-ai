import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HardDrive,
  Shield,
  Computer,
  Wifi,
  Lock,
  AlertTriangle,
  CheckCircle,
  Activity,
  RefreshCw,
  Settings,
  Monitor,
  Smartphone,
  Laptop,
  Server,
  ShieldCheck,
  XCircle,
  Play,
  Pause,
  Search,
  Filter,
  Eye,
  MoreHorizontal,
  Cpu,
  MemoryStick,
  HardDrive as Storage,
  Battery,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  TrendingDown,
  Bell,
  Zap,
  Download,
  Upload,
  Target,
  X,
  Check,
  AlertCircle
} from 'lucide-react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const EndpointControl = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState(null);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Comprehensive endpoint inventory
  const [endpoints] = useState([
    {
      id: 'EPD-001',
      hostname: 'DESKTOP-001',
      type: 'Desktop',
      os: 'Windows 11 Pro',
      user: 'John Doe',
      ip: '192.168.1.100',
      mac: '00:1B:44:11:3A:B7',
      status: 'online',
      lastSeen: 'Now',
      compliance: 'compliant',
      patchLevel: 'Up-to-date',
      antivirusStatus: 'Active',
      encryption: 'Enabled',
      battery: null,
      cpu: 15,
      memory: 45,
      disk: 65,
      activeConnections: 8,
      threats: 0,
      location: 'Office A',
      department: 'Engineering',
      appsInstalled: 147,
      dataTransferred: '2.4 GB',
      uptime: '5d 12h',
      alerts: 1
    },
    {
      id: 'EPD-002',
      hostname: 'LAPTOP-ADMIN',
      type: 'Laptop',
      os: 'macOS Ventura',
      user: 'Jane Smith',
      ip: '192.168.1.150',
      mac: 'AC:BC:32:AD:4E:9F',
      status: 'online',
      lastSeen: 'Now',
      compliance: 'warning',
      patchLevel: '1 update pending',
      antivirusStatus: 'Active',
      encryption: 'Enabled',
      battery: 78,
      cpu: 23,
      memory: 67,
      disk: 78,
      activeConnections: 5,
      threats: 1,
      location: 'Remote',
      department: 'Management',
      appsInstalled: 98,
      dataTransferred: '856 MB',
      uptime: '2d 8h',
      alerts: 3
    },
    {
      id: 'EPD-003',
      hostname: 'PHONE-SALES01',
      type: 'Mobile',
      os: 'iOS 17.2',
      user: 'Bob Wilson',
      ip: '192.168.2.50',
      mac: 'A4:83:E7:9B:1C:2D',
      status: 'online',
      lastSeen: '5 min ago',
      compliance: 'compliant',
      patchLevel: 'Up-to-date',
      antivirusStatus: 'Not Applicable',
      encryption: 'Enabled',
      battery: 45,
      cpu: 8,
      memory: 32,
      disk: 45,
      activeConnections: 3,
      threats: 0,
      location: 'Mobile',
      department: 'Sales',
      appsInstalled: 67,
      dataTransferred: '154 MB',
      uptime: '1d 6h',
      alerts: 0
    },
    {
      id: 'EPD-004',
      hostname: 'SERVER-DB01',
      type: 'Server',
      os: 'Ubuntu 22.04 LTS',
      user: 'Database Admin',
      ip: '192.168.3.20',
      mac: 'E8:6A:64:2C:5F:9A',
      status: 'warning',
      lastSeen: '1h ago',
      compliance: 'non-compliant',
      patchLevel: '17 updates pending',
      antivirusStatus: 'Active',
      encryption: 'Partial',
      battery: null,
      cpu: 85,
      memory: 92,
      disk: 94,
      activeConnections: 234,
      threats: 5,
      location: 'Data Center',
      department: 'IT',
      appsInstalled: 23,
      dataTransferred: '45.6 GB',
      uptime: '25d 14h',
      alerts: 12
    },
    {
      id: 'EPD-005',
      hostname: 'TABLET-FIELD01',
      type: 'Tablet',
      os: 'Android 13',
      user: 'Alice Johnson',
      ip: '192.168.2.75',
      mac: '84:8D:9C:3F:7E:1B',
      status: 'offline',
      lastSeen: '3h ago',
      compliance: 'compliant',
      patchLevel: 'Up-to-date',
      antivirusStatus: 'Active',
      encryption: 'Enabled',
      battery: 12,
      cpu: 5,
      memory: 28,
      disk: 36,
      activeConnections: 0,
      threats: 0,
      location: 'Field Office',
      department: 'Field Service',
      appsInstalled: 45,
      dataTransferred: '78 MB',
      uptime: '0h 0m',
      alerts: 2
    }
  ]);

  // Software inventory data
  const [softwareInventory] = useState([
    { name: 'Microsoft Office 365', installed: 1234, upToDate: 1156, outdated: 78 },
    { name: 'Google Chrome', installed: 1247, upToDate: 1234, outdated: 13 },
    { name: 'Adobe Acrobat Reader', installed: 1189, upToDate: 1098, outdated: 91 },
    { name: 'Zoom', installed: 987, upToDate: 956, outdated: 31 },
    { name: 'VPN Client', installed: 1247, upToDate: 1247, outdated: 0 }
  ]);

  // Patch management status
  const [patchStatus] = useState({
    critical: 67,
    important: 234,
    moderate: 456,
    low: 123,
    installed: 8901
  });

  // Threat detection data
  const [threatData] = useState({
    labels: ['Malware', 'Spyware', 'Ransomware', 'Phishing', 'Unauthorized Access'],
    datasets: [{
      label: 'Detected Threats',
      data: [15, 8, 3, 25, 12],
      backgroundColor: [
        'rgba(239, 68, 68, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(234, 179, 8, 0.8)',
        'rgba(59, 130, 246, 0.8)',
        'rgba(139, 69, 19, 0.8)'
      ],
      borderWidth: 1
    }]
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
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      },
      x: {
        grid: { color: '#334155' },
        ticks: { color: '#94a3b8' }
      }
    }
  };

  const getDeviceIcon = (type) => {
    const icons = {
      Desktop: Computer,
      Laptop: Laptop,
      Mobile: Smartphone,
      Server: Server,
      Tablet: Smartphone
    };
    return icons[type] || Computer;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'offline': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getComplianceColor = (compliance) => {
    switch (compliance) {
      case 'compliant': return 'text-green-400 bg-green-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/20';
      case 'non-compliant': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const filteredEndpoints = endpoints.filter(endpoint =>
    endpoint.hostname.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterType === 'all' || endpoint.type === filterType) &&
    (filterStatus === 'all' || endpoint.status === filterStatus)
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl shadow-lg">
            <HardDrive className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-yellow-400 to-red-400 bg-clip-text text-transparent">
              Endpoint Control Center
            </h1>
            <p className="text-slate-400 text-sm">Enterprise endpoint device management and security enforcement</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Global Alert Indicator */}
          <div className="relative">
            <Bell className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{endpoints.reduce((sum, ep) => sum + ep.alerts, 0)}</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-orange-500/50 transition-all duration-200 flex items-center space-x-2 ${
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
          { id: 'devices', label: 'Device Inventory', icon: Computer },
          { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'patches', label: 'Patch Management', icon: Download }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
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
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[{
              title: 'Total Endpoints',
              value: '1,247',
              change: '+12',
              trend: 'up',
              icon: Computer,
              color: 'orange'
            }, {
              title: 'Compliant',
              value: '1,189',
              change: '+8%',
              trend: 'up',
              icon: CheckCircle,
              color: 'green'
            }, {
              title: 'Non-compliant',
              value: '58',
              change: '-3',
              trend: 'down',
              icon: XCircle,
              color: 'red'
            }, {
              title: 'Compliance Rate',
              value: '95.3%',
              change: '+1.2%',
              trend: 'up',
              icon: TrendingUp,
              color: 'blue'
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

          {/* Endpoint Distribution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-orange-400" />
                <h2 className="text-xl font-bold text-white">Endpoint Distribution</h2>
              </div>
              <div className="space-y-3">
                {[
                  { type: 'Desktop', count: 756, percentage: '61%' },
                  { type: 'Laptop', count: 345, percentage: '28%' },
                  { type: 'Mobile', count: 98, percentage: '8%' },
                  { type: 'Tablet', count: 34, percentage: '3%' },
                  { type: 'Server', count: 14, percentage: '1%' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-slate-300 font-medium">{item.type}</span>
                      <span className="text-xs text-slate-500">({item.percentage})</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500`}
                          style={{ width: `${(item.count / 1247) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-orange-400 font-semibold text-sm">{item.count}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <Shield className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">Recent Device Activity</h2>
              </div>
              <div className="space-y-4">
                {[
                  { time: '08:45:15', device: 'DESKTOP-001', user: 'John Doe', action: 'Logged in', status: 'success' },
                  { time: '08:32:22', device: 'LAPTOP-ADMIN', user: 'Jane Smith', action: 'File downloaded', status: 'warning' },
                  { time: '08:28:47', device: 'PHONE-SALES01', user: 'Bob Wilson', action: 'Policy enforcement', status: 'info' },
                  { time: '08:15:33', device: 'SERVER-DB01', user: 'Database Admin', action: 'High CPU usage', status: 'warning' },
                  { time: '08:12:18', device: 'TABLET-FIELD01', user: 'Alice Johnson', action: 'Device offline', status: 'error' }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'success' ? 'bg-green-400' :
                      activity.status === 'warning' ? 'bg-yellow-400' :
                      activity.status === 'error' ? 'bg-red-400' :
                      'bg-blue-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-sm text-white font-medium">{activity.action}</div>
                      <div className="text-xs text-slate-400">{activity.device} • {activity.user}</div>
                    </div>
                    <div className="text-xs text-slate-500">{activity.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Critical Alerts */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-red-400" />
                <span>Critical Endpoint Alerts</span>
              </h2>
              <span className="text-xs text-slate-400">{endpoints.filter(ep => ep.alerts > 0).length} devices with alerts</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {endpoints.filter(ep => ep.alerts > 0).slice(0, 4).map((endpoint, index) => (
                <div key={endpoint.id} className="p-4 bg-slate-800/50 rounded-lg border-l-4 border-l-red-500">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-white font-medium">{endpoint.hostname}</div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">{endpoint.user}</span>
                      <span className="text-xs text-red-400 bg-red-500/20 px-2 py-1 rounded">
                        {endpoint.alerts} alerts
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-slate-400 mb-2">
                    {endpoint.os} • {endpoint.ip}
                  </div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">Investigate</button>
                    <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-xs">Remediate</button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Device Inventory Tab */}
      {selectedView === 'devices' && (
        <>
          {/* Search and Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/25"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/25"
            >
              <option value="all">All Types</option>
              <option value="Desktop">Desktops</option>
              <option value="Laptop">Laptops</option>
              <option value="Mobile">Mobile</option>
              <option value="Tablet">Tablets</option>
              <option value="Server">Servers</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400/25"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="warning">Warning</option>
              <option value="offline">Offline</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Device</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Compliance</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">User</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Last Seen</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">IP Address</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEndpoints.map((endpoint, index) => {
                  const Icon = getDeviceIcon(endpoint.type);
                  return (
                    <tr key={endpoint.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-orange-500/20 rounded-lg">
                            <Icon className="w-4 h-4 text-orange-400" />
                          </div>
                          <div>
                            <div className="text-white font-medium">{endpoint.hostname}</div>
                            <div className="text-xs text-slate-400">{endpoint.os}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{endpoint.type}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(endpoint.status)}`}>
                          {endpoint.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getComplianceColor(endpoint.compliance)}`}>
                          {endpoint.compliance.replace('-', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{endpoint.user}</td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{endpoint.lastSeen}</td>
                      <td className="py-3 px-4 font-mono text-slate-400 text-xs">{endpoint.ip}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setSelectedEndpoint(endpoint)}
                            className="p-1 text-slate-400 hover:text-white transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-green-400 transition-colors" title="Remote Access">
                            <Monitor className="w-4 h-4" />
                          </button>
                          {endpoint.alerts > 0 && (
                            <div className="relative">
                              <button className="p-1 text-red-400" title="Has Alerts">
                                <AlertTriangle className="w-4 h-4" />
                              </button>
                              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-xs font-bold">{endpoint.alerts}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Compliance Tab */}
      {selectedView === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              title: 'Overall Compliance',
              value: '95.3%',
              description: 'End-to-end protection',
              icon: ShieldCheck,
              color: 'green'
            }, {
              title: 'Encryption Compliance',
              value: '98.7%',
              description: 'Data at rest/transit',
              icon: Lock,
              color: 'blue'
            }, {
              title: 'Security Policy',
              value: '92.1%',
              description: 'Company policies enforced',
              icon: Settings,
              color: 'purple'
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
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              <span>Non-compliant Endpoints</span>
            </h2>
            <div className="space-y-4">
              {endpoints.filter(ep => ep.compliance !== 'compliant').map((endpoint, index) => (
                <div key={endpoint.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-orange-500/20 rounded-lg">
                      <Computer className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">{endpoint.hostname}</div>
                      <div className="text-sm text-slate-400">{endpoint.user} • {endpoint.os}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-xs text-slate-400">Issues</div>
                      <div className="text-sm font-semibold text-red-400">{endpoint.alerts}</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                        Remediate
                      </button>
                      <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                        Force Compliance
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {selectedView === 'security' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Threat Detection Summary</h2>
            </div>
            <div className="h-64 mb-6">
              <Bar data={threatData} options={chartOptions} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {threatData.labels.map((type, index) => (
                <div key={type} className="text-center">
                  <div className="text-lg font-bold text-white">{threatData.datasets[0].data[index]}</div>
                  <div className="text-xs text-slate-400">{type}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <span>Active Security Threats</span>
              </h2>
              <span className="text-xs text-slate-400">63 active threats</span>
            </div>
            <div className="space-y-4">
              {[
                { endpoint: 'DESKTOP-001', threat: 'Malicious File', severity: 'high', action: 'Quarantined' },
                { endpoint: 'LAPTOP-ADMIN', threat: 'Phishing Email', severity: 'medium', action: 'Blocked' },
                { endpoint: 'SERVER-DB01', threat: 'Unauthorized Access', severity: 'high', action: 'Alert Generated' },
                { endpoint: 'PHONE-SALES01', threat: 'Suspicious App', severity: 'low', action: 'Monitored' }
              ].map((threat, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      threat.severity === 'high' ? 'bg-red-400' :
                      threat.severity === 'medium' ? 'bg-yellow-400' :
                      'bg-green-400'
                    }`}></div>
                    <div>
                      <div className="text-white font-medium">{threat.endpoint}</div>
                      <div className="text-sm text-slate-400">{threat.threat}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-semibold ${
                      threat.severity === 'high' ? 'text-red-400' :
                      threat.severity === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {threat.severity.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-500">{threat.action}</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Patch Management Tab */}
      {selectedView === 'patches' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: 'Critical Patches', value: patchStatus.critical, color: 'red', icon: AlertTriangle },
              { title: 'Important', value: patchStatus.important, color: 'orange', icon: AlertCircle },
              { title: 'Moderate', value: patchStatus.moderate, color: 'yellow', icon: Bell },
              { title: 'Installed', value: patchStatus.installed, color: 'green', icon: Check }
            ].map((metric, index) => (
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
                  <div className="text-3xl font-bold text-white mb-2">{metric.value.toLocaleString()}</div>
                  <div className="text-sm text-slate-400">{metric.title}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Download className="w-6 h-6 text-cyan-400" />
                <span>Pending Updates by Device</span>
              </h2>
              <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                Deploy All Critical
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700/50">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Device</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">OS</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Critical</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Important</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Last Update</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {endpoints.slice(0, 5).map((endpoint, index) => (
                    <tr key={endpoint.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                      <td className="py-3 px-4 text-white font-medium">{endpoint.hostname}</td>
                      <td className="py-3 px-4 text-slate-300">{endpoint.os}</td>
                      <td className="py-3 px-4">
                        {endpoint.patchLevel.includes('17') ? (
                          <span className="text-red-400 font-semibold">17</span>
                        ) : (
                          <span className="text-green-400">0</span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        {endpoint.patchLevel.includes('1') ? (
                          <span className="text-orange-400 font-semibold">1</span>
                        ) : (
                          <span className="text-green-400">0</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-slate-400 text-xs">{endpoint.lastSeen}</td>
                      <td className="py-3 px-4">
                        <div className="flex space-x-1">
                          <button className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs hover:bg-green-500/30">
                            Update
                          </button>
                          <button className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                            Schedule
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <Activity className="w-6 h-6 text-purple-400" />
              <span>Software Inventory</span>
            </h2>
            <div className="space-y-4">
              {softwareInventory.map((software, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-white font-medium">{software.name}</div>
                    <div className="text-sm text-slate-400">Installed on {software.installed} endpoints</div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-sm text-slate-400">
                      Up-to-date: <span className="text-green-400">{software.upToDate}</span>
                    </div>
                    <div className="text-sm text-slate-400">
                      Outdated: <span className="text-orange-400">{software.outdated}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Device Detail Modal */}
      <AnimatePresence>
        {selectedEndpoint && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedEndpoint(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-orange-500/20 rounded-lg">
                    {React.createElement(getDeviceIcon(selectedEndpoint.type), { className: "w-8 h-8 text-orange-400" })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedEndpoint.hostname}</h2>
                    <p className="text-slate-400">{selectedEndpoint.os} • {selectedEndpoint.user}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedEndpoint.status)}`}>
                    {selectedEndpoint.status}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getComplianceColor(selectedEndpoint.compliance)}`}>
                    {selectedEndpoint.compliance.replace('-', ' ').toUpperCase()}
                  </span>
                  <button onClick={() => setSelectedEndpoint(null)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Device Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Device Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">IP Address</div>
                          <div className="text-lg font-mono text-white">{selectedEndpoint.ip}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">MAC Address</div>
                          <div className="text-lg font-mono text-white text-xs">{selectedEndpoint.mac}</div>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">System Resources</div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-300">CPU Usage</span>
                            <span className={`text-sm ${selectedEndpoint.cpu > 80 ? 'text-red-400' : selectedEndpoint.cpu > 60 ? 'text-yellow-400' : 'text-green-400'}`}>
                              {selectedEndpoint.cpu}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${selectedEndpoint.cpu > 80 ? 'bg-red-500' : selectedEndpoint.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${selectedEndpoint.cpu}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-slate-300">Memory Usage</span>
                            <span className={`text-sm ${selectedEndpoint.memory > 90 ? 'text-red-400' : selectedEndpoint.memory > 70 ? 'text-yellow-400' : 'text-green-400'}`}>
                              {selectedEndpoint.memory}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${selectedEndpoint.memory > 90 ? 'bg-red-500' : selectedEndpoint.memory > 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                              style={{ width: `${selectedEndpoint.memory}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">Battery</div>
                          <div className={`text-2xl font-bold ${selectedEndpoint.battery <= 20 ? 'text-red-400' : selectedEndpoint.battery <= 50 ? 'text-yellow-400' : 'text-green-400'}`}>
                            {selectedEndpoint.battery ? `${selectedEndpoint.battery}%` : 'N/A'}
                          </div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">Active Connections</div>
                          <div className="text-2xl font-bold text-blue-400">{selectedEndpoint.activeConnections}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Security Status */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Security Status</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">Antivirus</div>
                          <div className={`text-lg font-semibold ${selectedEndpoint.antivirusStatus === 'Active' ? 'text-green-400' : 'text-red-400'}`}>
                            {selectedEndpoint.antivirusStatus}
                          </div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-lg">
                          <div className="text-sm text-slate-400 mb-2">Encryption</div>
                          <div className={`text-lg font-semibold ${selectedEndpoint.encryption === 'Enabled' ? 'text-green-400' : 'text-yellow-400'}`}>
                            {selectedEndpoint.encryption}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">Patch Status</div>
                        <div className={`text-lg font-semibold ${selectedEndpoint.patchLevel === 'Up-to-date' ? 'text-green-400' : 'text-orange-400'}`}>
                          {selectedEndpoint.patchLevel}
                        </div>
                      </div>

                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-2">Active Threats</div>
                        <div className={`text-3xl font-bold ${selectedEndpoint.threats > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {selectedEndpoint.threats}
                        </div>
                      </div>

                      {selectedEndpoint.alerts > 0 && (
                        <div className="bg-slate-800/50 p-4 rounded-lg border-l-4 border-l-red-500">
                          <div className="text-sm text-slate-400 mb-2">Active Alerts</div>
                          <div className="text-xl font-bold text-red-400">{selectedEndpoint.alerts} alerts</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex space-x-3">
                  <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                    Remote Desktop
                  </button>
                  <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                    Run Diagnostics
                  </button>
                  <button className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors">
                    Install Updates
                  </button>
                  <button className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                    Isolate Device
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EndpointControl;
