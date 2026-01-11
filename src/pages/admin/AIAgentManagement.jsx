import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Bot,
  Zap,
  Settings,
  Activity,
  AlertTriangle,
  CheckCircle,
  Pause,
  Play,
  Square,
  RefreshCw,
  Shield,
  BarChart3,
  Users,
  Cpu,
  Network,
  Database,
  Globe,
  Target,
  Eye,
  Wrench,
  Pi
} from 'lucide-react';

// Mock AI agents data
const aiAgents = {
  'threat-detection': {
    name: 'Threat Detection AI',
    type: 'Detection',
    status: 'active',
    uptime: '99.7%',
    version: 'v2.1.4',
    processes: 12,
    accuracy: 98.2,
    falsePositive: 1.8,
    load: 65,
    model: 'Neural Net v7',
    lastTrained: '2025-01-15',
    performance: 'optimal'
  },
  'behavior-analysis': {
    name: 'Behavior Analysis Engine',
    type: 'Analysis',
    status: 'active',
    uptime: '99.9%',
    version: 'v2.0.8',
    processes: 8,
    accuracy: 96.5,
    falsePositive: 2.1,
    load: 72,
    model: 'Transformer v4',
    lastTrained: '2025-01-10',
    performance: 'heavy_load'
  },
  'anomaly-detection': {
    name: 'Anomaly Detector',
    type: 'Detection',
    status: 'warning',
    uptime: '98.4%',
    version: 'v1.9.2',
    processes: 15,
    accuracy: 94.8,
    falsePositive: 3.2,
    load: 85,
    model: 'Autoencoder v3',
    lastTrained: '2025-01-05',
    performance: 'stress_testing'
  },
  'response-automation': {
    name: 'Automated Response System',
    type: 'Response',
    status: 'active',
    uptime: '99.8%',
    version: 'v2.2.1',
    processes: 6,
    accuracy: 97.1,
    falsePositive: 1.4,
    load: 48,
    model: 'Decision Tree v6',
    lastTrained: '2025-01-20',
    performance: 'optimal'
  },
  'predictive-model': {
    name: 'Threat Prediction Model',
    type: 'Prediction',
    status: 'active',
    uptime: '99.6%',
    version: 'v2.3.0',
    processes: 10,
    accuracy: 93.8,
    falsePositive: 2.9,
    load: 78,
    model: 'LSTM v5',
    lastTrained: '2025-01-18',
    performance: 'normal'
  }
};

const systemMetrics = {
  totalAgents: 5,
  activeAgents: 4,
  totalAdvocacy: '95.6%',
  averageLoad: '69.6%',
  totalProcesses: 51,
  modelUpdates: 23
};

const AIAgentManagement = () => {
  const [selectedAgent, setSelectedAgent] = useState('threat-detection');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      case 'stopped': return 'text-gray-400';
      default: return 'text-blue-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'warning': return AlertTriangle;
      case 'error': return AlertTriangle;
      case 'stopped': return Pause;
      default: return Activity;
    }
  };

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'optimal': return 'text-green-400';
      case 'normal': return 'text-blue-400';
      case 'heavy_load': return 'text-yellow-400';
      case 'stress_testing': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const StatusBadge = ({ status, children }) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500/30',
      warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      error: 'bg-red-500/20 text-red-400 border-red-500/30',
      stopped: 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    };

    return (
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${colors[status]}`}>
        {React.createElement(getStatusIcon(status), { className: 'w-3 h-3 mr-1' })}
        {children}
      </span>
    );
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  const currentAgent = aiAgents[selectedAgent];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              AI Agent Management Hub
            </h1>
            <p className="text-slate-400 text-sm">Enterprise AI orchestration and lifecycle management</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-white">System Status</div>
            <div className="text-lg text-green-400 font-bold">All Systems Operational</div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all duration-200 flex items-center space-x-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync'}</span>
          </button>
        </div>
      </motion.div>

      {/* Dashboard Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
      >
        {/* System Metrics */}
        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Bot className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">{systemMetrics.totalAgents}</h3>
              <p className="text-sm text-slate-400">Total AI Agents</p>
              <p className="text-xs text-green-400">{systemMetrics.activeAgents} Active</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-cyan-500/20 rounded-lg">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-cyan-400">{systemMetrics.averageLoad}</h3>
              <p className="text-sm text-slate-400">Average Load</p>
              <p className="text-xs text-slate-500">{systemMetrics.totalProcesses} Processes</p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-green-500/20 rounded-lg">
              <Target className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-400">{systemMetrics.totalAdvocacy}</h3>
              <p className="text-sm text-slate-400">Overall Accuracy</p>
              <p className="text-xs text-purple-400">{systemMetrics.modelUpdates} Updates</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Agent Control Panel */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Agent List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-xl font-bold text-white mb-4 flex items-center space-x-3">
            <Settings className="w-6 h-6 text-cyan-400" />
            <span>AI Agent Fleet</span>
          </h2>

          {Object.entries(aiAgents).map(([id, agent], index) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              className={`cursor-pointer rounded-xl border transition-all duration-300 ${
                selectedAgent === id
                  ? 'bg-purple-500/20 border-purple-500/50 shadow-lg'
                  : 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-800/90'
              }`}
              onClick={() => setSelectedAgent(id)}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-bold text-white">{agent.name}</h3>
                  <StatusBadge status={agent.status}>{agent.status}</StatusBadge>
                </div>

                <div className="space-y-2 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Type:</span>
                    <span className="text-cyan-400">{agent.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Load:</span>
                    <span className={agent.load > 80 ? 'text-red-400' : agent.load > 60 ? 'text-yellow-400' : 'text-green-400'}>
                      {agent.load}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uptime:</span>
                    <span className="text-green-400">{agent.uptime}</span>
                  </div>
                </div>

                {/* Mini load bar */}
                <div className="mt-3">
                  <div className="w-full bg-slate-700 rounded-full h-1">
                    <div
                      className={`h-1 rounded-full transition-all duration-1000 ${
                        agent.load > 80 ? 'bg-red-500' :
                        agent.load > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(agent.load, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Agent Details Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="xl:col-span-2"
        >
          <Card className="h-fit">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-500/20 rounded-lg">
                  <Brain className="w-8 h-8 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{currentAgent.name}</h2>
                  <p className="text-slate-400">{currentAgent.type} Agent • {currentAgent.version}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <StatusBadge status={currentAgent.status}>
                  {currentAgent.status}
                </StatusBadge>
                <div className="flex space-x-2">
                  <button className="p-2 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
                    <Play className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors">
                    <Pause className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors">
                    <Square className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <div className={`text-2xl font-bold ${currentAgent.performance === 'stress_testing' ? 'text-red-400' :
                  currentAgent.performance === 'heavy_load' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {currentAgent.load}%
                </div>
                <div className="text-xs text-slate-400">Current Load</div>
                <div className={`text-xs ${getPerformanceColor(currentAgent.performance)}`}>
                  {currentAgent.performance.replace('_', ' ')}
                </div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{currentAgent.accuracy}%</div>
                <div className="text-xs text-slate-400">Accuracy</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{currentAgent.falsePositive}%</div>
                <div className="text-xs text-slate-400">False Positive</div>
              </div>

              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">{currentAgent.processes}</div>
                <div className="text-xs text-slate-400">Processes</div>
              </div>
            </div>

            {/* Agent Configuration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-3">Model Configuration</h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Model Type</span>
                    <span className="text-white font-medium">{currentAgent.model}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Last Trained</span>
                    <span className="text-cyan-400">{currentAgent.lastTrained}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-slate-700/30">
                    <span className="text-slate-400">Uptime</span>
                    <span className="text-green-400">{currentAgent.uptime}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Version</span>
                    <span className="text-purple-400">{currentAgent.version}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white mb-3">Performance Analytics</h3>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Processing Efficiency</span>
                      <span className="text-white">87%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Memory Usage</span>
                      <span className="text-white">62%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" style={{ width: '62%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Response Time</span>
                      <span className="text-white">1.4ms</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Actions */}
            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4">Agent Controls</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                  <RefreshCw className="w-4 h-4" />
                  <span>Update Model</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded-lg transition-colors">
                  <Target className="w-4 h-4" />
                  <span>Run Tests</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Configure</span>
                </button>
                <button className="flex items-center justify-center space-x-2 px-4 py-3 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-lg transition-colors">
                  <Wrench className="w-4 h-4" />
                  <span>Maintenance</span>
                </button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* System Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Resource Allocation */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
            <Pi className="w-5 h-5 text-cyan-400" />
            <span>Resource Allocation</span>
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Cpu className="w-4 h-4 text-blue-400" />
                <span className="text-slate-400">CPU Cores</span>
              </div>
              <span className="text-white">64/128 allocated</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Database className="w-4 h-4 text-green-400" />
                <span className="text-slate-400">Memory</span>
              </div>
              <span className="text-white">256GB/512GB allocated</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Network className="w-4 h-4 text-purple-400" />
                <span className="text-slate-400">GPU Compute</span>
              </div>
              <span className="text-white">4/8 GPUs allocated</span>
            </div>
          </div>
        </Card>

        {/* Active Deployments */}
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
            <Shield className="w-5 h-5 text-green-400" />
            <span>Active Deployments</span>
          </h3>

          <div className="space-y-3">
            {['Production', 'Staging', 'Development', 'Training'].map((env, index) => (
              <div key={env} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${env === 'Production' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                  <span className="text-slate-400">{env}</span>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-medium ${env === 'Production' ? 'text-green-400' : 'text-blue-400'}`}>
                    {env === 'Production' ? '4 Models' : '2 Models'}
                  </div>
                  <div className="text-xs text-slate-500">
                    99.{9-index}{Math.random() > 0.5 ? '1' : '9'}% uptime
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AIAgentManagement;
