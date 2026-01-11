import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Settings,
  Shield,
  Activity,
  Zap,
  RefreshCw,
  Play,
  Pause,
  Square,
  Monitor,
  Server,
  Database,
  Network,
  Cloud,
  Cpu,
  HardDrive,
  Wifi,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Save,
  RotateCcw,
  Power,
  PowerOff,
  Sliders,
  Gauge,
  Timer,
  Clock,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  Search,
  Filter,
  MoreHorizontal,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Maximize2,
  Minimize2,
  Target,
  Crosshair,
  Radar,
  Satellite,
  Radio,
  Layers,
  Grid3X3,
  Workflow,
  GitBranch,
  Share2,
  Download,
  Upload,
  FileText,
  Code,
  Terminal,
  Cpu as CpuIcon,
  MemoryStick,
  HardDrive as StorageIcon,
  Wifi as WifiIcon,
  Zap as Lightning
} from 'lucide-react';

const MasterControlDashboard = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [controlData, setControlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // System control states
  const [systemStatus, setSystemStatus] = useState({
    mainframe: 'online',
    database: 'online',
    network: 'online',
    security: 'active',
    backup: 'ready'
  });

  const [resourceAllocation, setResourceAllocation] = useState({
    cpu: 75,
    memory: 60,
    storage: 45,
    network: 80
  });

  const [policyControls, setPolicyControls] = useState({
    firewall: true,
    intrusion: true,
    encryption: true,
    audit: true,
    compliance: false
  });

  const [alertSettings, setAlertSettings] = useState({
    critical: true,
    high: true,
    medium: false,
    low: false,
    info: false
  });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await Promise.all([fetchControlData()]);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to refresh control data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, handleRefresh]);

  // Mock control data
  const mockControlData = {
    systems: [
      {
        id: 'mainframe-01',
        name: 'Primary Mainframe',
        type: 'Core Processing',
        status: 'online',
        load: 78,
        uptime: '45d 12h',
        alerts: 2,
        lastMaintenance: '2025-12-15'
      },
      {
        id: 'database-01',
        name: 'Central Database',
        type: 'Data Storage',
        status: 'online',
        load: 65,
        uptime: '67d 8h',
        alerts: 0,
        lastMaintenance: '2025-12-20'
      },
      {
        id: 'network-01',
        name: 'Core Network',
        type: 'Infrastructure',
        status: 'online',
        load: 55,
        uptime: '120d 6h',
        alerts: 1,
        lastMaintenance: '2025-11-30'
      }
    ],
    policies: [
      {
        id: 'policy-001',
        name: 'Access Control Policy',
        type: 'Security',
        status: 'active',
        lastUpdated: '2025-01-02',
        violations: 0,
        compliance: 98
      },
      {
        id: 'policy-002',
        name: 'Data Encryption Policy',
        type: 'Compliance',
        status: 'active',
        lastUpdated: '2025-01-01',
        violations: 2,
        compliance: 95
      }
    ],
    operations: [
      {
        id: 'op-001',
        name: 'System Maintenance',
        type: 'Maintenance',
        status: 'running',
        progress: 75,
        eta: '2 hours',
        priority: 'high'
      },
      {
        id: 'op-002',
        name: 'Security Audit',
        type: 'Security',
        status: 'scheduled',
        progress: 0,
        eta: '6 hours',
        priority: 'medium'
      }
    ],
    metrics: {
      totalSystems: 12,
      activeSystems: 11,
      systemHealth: 92,
      resourceUtilization: 68,
      activeAlerts: 3,
      pendingTasks: 8
    }
  };

  // Fetch control data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setControlData(mockControlData);
        setLastUpdated(new Date());
      } catch (err) {
        setError('Failed to load control data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const fetchControlData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockControlData;
    } catch (error) {
      console.error('Error fetching control data:', error);
      throw error;
    }
  };

  // System control handlers
  const toggleSystemStatus = (system, status) => {
    setSystemStatus(prev => ({
      ...prev,
      [system]: status
    }));
  };

  const updateResourceAllocation = (resource, value) => {
    setResourceAllocation(prev => ({
      ...prev,
      [resource]: Math.max(0, Math.min(100, value))
    }));
  };

  const togglePolicyControl = (policy) => {
    setPolicyControls(prev => ({
      ...prev,
      [policy]: !prev[policy]
    }));
  };

  const toggleAlertSetting = (level) => {
    setAlertSettings(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-800 via-violet-700 to-slate-800 p-6 relative overflow-hidden">
      <div className="relative z-20">
      {/* Royal Effects Background */}
      <div className="absolute inset-0 opacity-35 pointer-events-none">
        <div className="absolute top-15 left-15 w-[450px] h-[450px] bg-gradient-to-r from-purple-500/45 to-indigo-500/45 rounded-full blur-3xl"></div>
        <div className="absolute bottom-15 right-15 w-[550px] h-[550px] bg-gradient-to-r from-indigo-600/40 to-violet-600/40 rounded-full blur-3xl" style={{ animationDelay: '1.2s' }}></div>
        <div className="absolute top-1/4 right-1/5 w-96 h-96 bg-gradient-to-r from-violet-500/35 to-purple-500/35 rounded-full blur-3xl" style={{ animationDelay: '2.4s' }}></div>
        <div className="absolute top-3/4 left-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-blue-400/30 rounded-full blur-3xl" style={{ animationDelay: '0.8s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-purple-300/25 to-indigo-300/25 rounded-full blur-3xl" style={{ animationDelay: '1.6s' }}></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4 relative z-10">
          <div className="p-3 bg-gradient-to-br from-purple-400 via-indigo-500 to-violet-600 rounded-xl shadow-2xl shadow-purple-500/20 ring-1 ring-indigo-400/30">
            <Settings className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 via-violet-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-sm">
              Master Control Dashboard
            </h1>
            <p className="text-indigo-200/80 text-sm font-medium">Unified System Control & Resource Management Center</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{controlData?.metrics.activeAlerts || 0}</span>
            </div>
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

      {/* View Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'systems', label: 'Systems', icon: Server },
          { id: 'resources', label: 'Resources', icon: Cpu },
          { id: 'policies', label: 'Policies', icon: Shield },
          { id: 'operations', label: 'Operations', icon: Activity }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
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
      {selectedView === 'overview' && controlData && (
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[{
              title: 'Total Systems',
              value: controlData.metrics.totalSystems,
              change: '+2',
              trend: 'up',
              icon: Server,
              color: 'purple'
            }, {
              title: 'System Health',
              value: `${controlData.metrics.systemHealth}%`,
              change: '+1.2%',
              trend: 'up',
              icon: Activity,
              color: 'indigo'
            }, {
              title: 'Resource Usage',
              value: `${controlData.metrics.resourceUtilization}%`,
              change: '-3.1%',
              trend: 'down',
              icon: Gauge,
              color: 'blue'
            }, {
              title: 'Active Alerts',
              value: controlData.metrics.activeAlerts,
              change: '-5',
              trend: 'down',
              icon: AlertTriangle,
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
                      ) : metric.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      ) : null}
                      <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
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

          {/* System Status and Resource Allocation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* System Status Control */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Monitor className="w-5 h-5 text-purple-400" />
                <span>System Status Control</span>
              </h3>
              <div className="space-y-4">
                {Object.entries(systemStatus).map(([system, status]) => (
                  <div key={system} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        status === 'online' || status === 'active' || status === 'ready' ? 'bg-green-400' : 'bg-red-400'
                      }`}></div>
                      <span className="text-white capitalize font-medium">{system}</span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleSystemStatus(system, status === 'online' ? 'offline' : 'online')}
                        className={`px-3 py-1 rounded text-xs font-medium transition-colors ${
                          status === 'online' || status === 'active' || status === 'ready'
                            ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                        }`}
                      >
                        {status === 'online' || status === 'active' || status === 'ready' ? 'Online' : 'Offline'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Resource Allocation Control */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Sliders className="w-5 h-5 text-indigo-400" />
                <span>Resource Allocation</span>
              </h3>
              <div className="space-y-4">
                {Object.entries(resourceAllocation).map(([resource, value]) => (
                  <div key={resource} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 capitalize font-medium">{resource}</span>
                      <span className={`text-sm font-bold ${
                        value > 80 ? 'text-red-400' : value > 60 ? 'text-yellow-400' : 'text-green-400'
                      }`}>{value}%</span>
                    </div>
                    <div className="relative">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => updateResourceAllocation(resource, parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-purple"
                      />
                      <div className="w-full bg-slate-600 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            value > 80 ? 'bg-red-500' : value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Policy Controls and Operations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Policy Control Panel */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Shield className="w-5 h-5 text-blue-400" />
                <span>Policy Control Panel</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(policyControls).map(([policy, enabled]) => (
                  <div key={policy} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-white capitalize font-medium">{policy} Policy</span>
                    <button
                      onClick={() => togglePolicyControl(policy)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        enabled ? 'bg-purple-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>

            {/* Alert Settings */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Bell className="w-5 h-5 text-yellow-400" />
                <span>Alert Settings</span>
              </h3>
              <div className="space-y-3">
                {Object.entries(alertSettings).map(([level, enabled]) => (
                  <div key={level} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <span className="text-white capitalize font-medium">{level} Priority Alerts</span>
                    <button
                      onClick={() => toggleAlertSetting(level)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        enabled ? 'bg-indigo-500' : 'bg-slate-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          enabled ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </>
      )}

      {/* Systems Tab */}
      {selectedView === 'systems' && controlData && (
        <div className="space-y-6">
          {controlData.systems.map((system, index) => (
            <motion.div
              key={system.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Server className="w-8 h-8 text-purple-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{system.name}</h3>
                      <p className="text-slate-400">{system.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold mb-1 ${
                      system.status === 'online' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {system.status.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-400">Load: {system.load}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-lg font-bold text-purple-400">{system.uptime}</div>
                    <div className="text-xs text-slate-400">Uptime</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className={`text-lg font-bold ${system.alerts > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {system.alerts}
                    </div>
                    <div className="text-xs text-slate-400">Active Alerts</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-sm font-bold text-slate-300">{system.lastMaintenance}</div>
                    <div className="text-xs text-slate-400">Last Maintenance</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors">
                    Run Diagnostics
                  </button>
                  <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium transition-colors">
                    Schedule Maintenance
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Resources Tab */}
      {selectedView === 'resources' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* CPU Resources */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Cpu className="w-6 h-6 text-purple-400" />
                </div>
                <span className="text-xs text-slate-400">CPU</span>
              </div>
              <div className="text-2xl font-bold text-white mb-2">{resourceAllocation.cpu}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    resourceAllocation.cpu > 80 ? 'bg-red-500' : resourceAllocation.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${resourceAllocation.cpu}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-400">8 cores allocated</div>
            </Card>

            {/* Memory Resources */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-indigo-500/20 rounded-lg">
                  <MemoryStick className="w-6 h-6 text-indigo-400" />
                </div>
                <span className="text-xs text-slate-400">Memory</span>
              </div>
              <div className="text-2xl font-bold text-white mb-2">{resourceAllocation.memory}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    resourceAllocation.memory > 80 ? 'bg-red-500' : resourceAllocation.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${resourceAllocation.memory}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-400">24GB allocated</div>
            </Card>

            {/* Storage Resources */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <HardDrive className="w-6 h-6 text-blue-400" />
                </div>
                <span className="text-xs text-slate-400">Storage</span>
              </div>
              <div className="text-2xl font-bold text-white mb-2">{resourceAllocation.storage}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    resourceAllocation.storage > 80 ? 'bg-red-500' : resourceAllocation.storage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${resourceAllocation.storage}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-400">2.4TB allocated</div>
            </Card>

            {/* Network Resources */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Network className="w-6 h-6 text-cyan-400" />
                </div>
                <span className="text-xs text-slate-400">Network</span>
              </div>
              <div className="text-2xl font-bold text-white mb-2">{resourceAllocation.network}%</div>
              <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${
                    resourceAllocation.network > 80 ? 'bg-red-500' : resourceAllocation.network > 60 ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${resourceAllocation.network}%` }}
                ></div>
              </div>
              <div className="text-xs text-slate-400">10Gbps bandwidth</div>
            </Card>
          </div>

          {/* Resource Optimization Controls */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
              <Workflow className="w-5 h-5 text-purple-400" />
              <span>Resource Optimization Controls</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 hover:from-purple-500/30 hover:to-indigo-500/30 border border-purple-500/30 rounded-lg transition-all duration-200">
                <Target className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <div className="text-white font-medium">Auto Balance</div>
                <div className="text-xs text-slate-400">Optimize resource distribution</div>
              </button>
              <button className="p-4 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 hover:from-indigo-500/30 hover:to-blue-500/30 border border-indigo-500/30 rounded-lg transition-all duration-200">
                <Zap className="w-6 h-6 text-indigo-400 mx-auto mb-2" />
                <div className="text-white font-medium">Performance Boost</div>
                <div className="text-xs text-slate-400">Increase critical resources</div>
              </button>
              <button className="p-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 hover:from-blue-500/30 hover:to-cyan-500/30 border border-blue-500/30 rounded-lg transition-all duration-200">
                <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-white font-medium">Load Balancing</div>
                <div className="text-xs text-slate-400">Distribute system load</div>
              </button>
            </div>
          </Card>
        </div>
      )}

      {/* Policies Tab */}
      {selectedView === 'policies' && controlData && (
        <div className="space-y-6">
          {controlData.policies.map((policy, index) => (
            <motion.div
              key={policy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Shield className="w-8 h-8 text-indigo-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{policy.name}</h3>
                      <p className="text-slate-400">{policy.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold mb-1 ${
                      policy.status === 'active' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {policy.status.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-400">Compliance: {policy.compliance}%</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className={`text-lg font-bold ${policy.violations > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {policy.violations}
                    </div>
                    <div className="text-xs text-slate-400">Violations</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-sm font-bold text-slate-300">{policy.lastUpdated}</div>
                    <div className="text-xs text-slate-400">Last Updated</div>
                  </div>
                  <div className="text-center p-3 bg-slate-700/30 rounded">
                    <div className="text-lg font-bold text-purple-400">{policy.compliance}%</div>
                    <div className="text-xs text-slate-400">Compliance Rate</div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button className="px-4 py-2 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-400 rounded-lg text-sm font-medium transition-colors">
                    Edit Policy
                  </button>
                  <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors">
                    View Rules
                  </button>
                  <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors">
                    Run Audit
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Operations Tab */}
      {selectedView === 'operations' && controlData && (
        <div className="space-y-6">
          {controlData.operations.map((operation, index) => (
            <motion.div
              key={operation.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <Activity className="w-8 h-8 text-blue-400" />
                    <div>
                      <h3 className="text-xl font-bold text-white">{operation.name}</h3>
                      <p className="text-slate-400">{operation.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-lg font-bold mb-1 ${
                      operation.status === 'running' ? 'text-green-400' :
                      operation.status === 'scheduled' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`}>
                      {operation.status.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-400">Priority: {operation.priority}</div>
                  </div>
                </div>

                {operation.status === 'running' && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-400">Progress:</span>
                      <span className="text-white">{operation.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${operation.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">ETA: {operation.eta}</div>
                  </div>
                )}

                <div className="flex space-x-3">
                  {operation.status === 'running' ? (
                    <>
                      <button className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg text-sm font-medium transition-colors">
                        Pause Operation
                      </button>
                      <button className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg text-sm font-medium transition-colors">
                        Stop Operation
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg text-sm font-medium transition-colors">
                        Start Operation
                      </button>
                      <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg text-sm font-medium transition-colors">
                        View Details
                      </button>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
};

export default MasterControlDashboard;
