import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Database,
  Zap,
  Eye,
  Settings,
  Download,
  Upload,
  Monitor,
  BarChart3,
  PieChart,
  LineChart,
  Clock,
  Calendar,
  User,
  Cpu,
  Cloud,
  Shield,
  Target,
  RotateCw,
  Filter,
  Search,
  Plus,
  Edit,
  Trash2,
  Globe,
  Network,
  HardDrive,
  FileText
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';

// Advanced AI Model Data
const activeModels = [
  {
    id: 'MALWARE-DETECTOR-V3',
    name: 'Enterprise Malware Detector',
    type: 'Behavioral Analysis',
    status: 'active',
    version: '3.2.1',
    accuracy: 98.7,
    precision: 97.2,
    recall: 95.8,
    f1_score: 96.5,
    lastUpdated: '2024-01-15T14:30:00Z',
    deploymentTarget: 'Production',
    resourceUsage: '2.3 GB RAM',
    throughput: '450 req/sec',
    modelSize: '1.8 GB',
    createdBy: 'Dr. Sarah Chen',
    framework: 'TensorFlow 2.12',
    trainingData: '2.5M samples',
    alerts: 2
  },
  {
    id: 'PHISHING-PREDICTOR-V2',
    name: 'Advanced Phishing Predictor',
    type: 'NLP Classification',
    status: 'active',
    version: '2.1.8',
    accuracy: 94.1,
    precision: 96.3,
    recall: 91.7,
    f1_score: 94.0,
    lastUpdated: '2024-01-15T13:45:00Z',
    deploymentTarget: 'Staging',
    resourceUsage: '1.1 GB RAM',
    throughput: '230 req/sec',
    modelSize: '650 MB',
    createdBy: 'Michael Rodriguez',
    framework: 'PyTorch 2.0',
    trainingData: '890K samples',
    alerts: 0
  },
  {
    id: 'DEEPFAKE-ANALYZER-V1',
    name: 'Deepfake Detection System',
    type: 'Computer Vision',
    status: 'training',
    version: '1.0.3',
    accuracy: 91.5,
    precision: 89.2,
    recall: 94.1,
    f1_score: 91.6,
    lastUpdated: '2024-01-15T12:20:00Z',
    deploymentTarget: 'Development',
    resourceUsage: '4.2 GB RAM',
    throughput: '120 req/sec',
    modelSize: '2.1 GB',
    createdBy: 'Dr. Priya Patel',
    framework: 'TensorFlow 2.12',
    trainingData: '150K samples',
    alerts: 1
  },
  {
    id: 'NETWORK-ANOMALY-V4',
    name: 'Network Anomaly Detector',
    type: 'Time Series Analysis',
    status: 'active',
    version: '4.0.5',
    accuracy: 93.2,
    precision: 95.1,
    recall: 91.3,
    f1_score: 93.2,
    lastUpdated: '2024-01-14T16:15:00Z',
    deploymentTarget: 'Production',
    resourceUsage: '890 MB RAM',
    throughput: '180 req/sec',
    modelSize: '280 MB',
    createdBy: 'Julian Kim',
    framework: 'Scikit-learn 1.3',
    trainingData: '4.2M packets',
    alerts: 1
  }
];

const modelPerformanceMetrics = [
  { metric: 'Average Accuracy', value: '94.4%', status: 'excellent' },
  { metric: 'Overall Precision', value: '94.5%', status: 'excellent' },
  { metric: 'Mean Response Time', value: '245ms', status: 'good' },
  { metric: 'Model Drift Score', value: '2.1%', status: 'excellent' },
  { metric: 'False Positive Rate', value: '3.2%', status: 'acceptable' },
  { metric: 'System Availability', value: '99.8%', status: 'excellent' }
];

const activeExperiments = [
  {
    id: 'EXP-001',
    name: 'Malware LSTM Improvement',
    modelType: 'Recurrent Neural Network',
    status: 'running',
    progress: 78,
    eta: '1.2 hours',
    expectedImprovement: '+2.1% accuracy'
  },
  {
    id: 'EXP-002',
    name: 'BERT Phishing Detection',
    modelType: 'Transformer Architecture',
    status: 'completed',
    progress: 100,
    eta: 'Complete',
    expectedImprovement: '+5.3% precision'
  },
  {
    id: 'EXP-003',
    name: 'CNN Deepfake Enhancement',
    modelType: 'Convolutional Neural Network',
    status: 'queued',
    progress: 0,
    eta: '2.5 hours (queued)',
    expectedImprovement: '+6.8% recall'
  }
];

const modelDeployments = [
  { environment: 'Production', activeModels: 12, totalDeployments: 45 },
  { environment: 'Staging', activeModels: 8, totalDeployments: 23 },
  { environment: 'Development', activeModels: 15, totalDeployments: 67 },
  { environment: 'Testing', activeModels: 6, totalDeployments: 34 }
];

const recentAlerts = [
  {
    id: 1,
    modelId: 'MALWARE-DETECTOR-V3',
    severity: 'warning',
    message: 'Model accuracy dropped 1.2% below threshold',
    timestamp: '2024-01-15T14:45:00Z',
    resolved: false
  },
  {
    id: 2,
    modelId: 'NETWORK-ANOMALY-V4',
    severity: 'info',
    message: 'New version deployed successfully',
    timestamp: '2024-01-15T13:20:00Z',
    resolved: true
  },
  {
    id: 3,
    modelId: 'DEEPFAKE-ANALYZER-V1',
    severity: 'warning',
    message: 'Training data drift detected',
    timestamp: '2024-01-15T12:10:00Z',
    resolved: false
  }
];

const AIModelManagement = () => {
  const [selectedModel, setSelectedModel] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [isTraining, setIsTraining] = useState(false);

  const filteredModels = activeModels.filter(model => {
    const matchesStatus = filterStatus === 'all' || model.status === filterStatus;
    const matchesType = filterType === 'all' || model.type === filterType;
    const matchesSearch = searchQuery === '' ||
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesType && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500/20';
      case 'training': return 'text-blue-400 bg-blue-500/20';
      case 'inactive': return 'text-gray-400 bg-gray-500/20';
      case 'failed': return 'text-red-400 bg-red-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getDeploymentColor = (target) => {
    switch (target) {
      case 'Production': return 'bg-red-500/20 text-red-400';
      case 'Staging': return 'bg-yellow-500/20 text-yellow-400';
      case 'Development': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getAlertSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-400';
      case 'warning': return 'bg-yellow-500/20 text-yellow-400';
      case 'info': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
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
          <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-lg shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
              AI/ML Model Management Hub
            </h1>
            <p className="text-slate-400 text-sm">Enterprise AI Operations Center & MLOps Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold text-white">18</span>
            <span className="text-xs text-slate-400">Active Models</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">94.4%</span>
            <span className="text-xs text-slate-400">Avg Accuracy</span>
          </div>
          <button
            onClick={() => setIsTraining(true)}
            className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-bold text-white hover:shadow-2xl hover:shadow-purple-500/25 transition-all duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Train New Model</span>
          </button>
        </div>
      </motion.div>

      {/* Model Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
        {[
          { title: 'Total Models', value: '18', change: '+2', icon: Brain },
          { title: 'Active', value: '16', change: '+1', icon: CheckCircle },
          { title: 'Training', value: '2', change: '0', icon: Activity },
          { title: 'Avg Accuracy', value: '94.4%', change: '+1.2%', icon: Target },
          { title: 'Alerts', value: '3', change: '-1', icon: AlertTriangle },
          { title: 'Deployments', value: '169', change: '+12', icon: Cloud }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-2">
                <metric.icon className={`w-5 h-5 ${index === 4 && parseInt(metric.value) > 0 ? 'text-orange-400' : 'text-cyan-400'}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-slate-400 mb-1">{metric.title}</div>
              <div className={`text-xs px-2 py-0.5 rounded-full ${
                metric.change?.startsWith('+') ? 'bg-green-500/20 text-green-400' :
                metric.change?.startsWith('-') ? 'bg-red-500/20 text-red-400' :
                'bg-blue-500/20 text-blue-400'
              }`}>
                {metric.change}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Model Registry */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="xl:col-span-2"
        >
          <GlassCard title="AI Model Registry" icon={Database}>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/40 rounded-lg">
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search models..."
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
                <option value="training">Training</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="all">All Types</option>
                <option value="Behavioral Analysis">Behavioral Analysis</option>
                <option value="NLP Classification">NLP Classification</option>
                <option value="Computer Vision">Computer Vision</option>
                <option value="Time Series Analysis">Time Series Analysis</option>
              </select>
            </div>

            {/* Models Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredModels.map((model, index) => (
                <motion.div
                  key={model.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setSelectedModel(model)}
                >
                  {/* Model Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <Brain className="w-8 h-8 text-cyan-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                        <p className="text-xs text-slate-400">ID: {model.id}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(model.status)}`}>
                        {model.status}
                      </span>
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getDeploymentColor(model.deploymentTarget)}`}>
                        {model.deploymentTarget}
                      </span>
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs text-slate-400 mb-1">Accuracy</div>
                      <div className={`text-lg font-bold ${
                        model.accuracy >= 95 ? 'text-green-400' :
                        model.accuracy >= 90 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                        {model.accuracy}%
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 mb-1">F1-Score</div>
                      <div className="text-lg font-bold text-blue-400">{model.f1_score}%</div>
                    </div>
                  </div>

                  {/* Model Details */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Framework:</span>
                      <span className="text-white">{model.framework}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Version:</span>
                      <span className="text-white">{model.version}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Throughput:</span>
                      <span className="text-cyan-400">{model.throughput}</span>
                    </div>
                  </div>

                  {/* Last Updated */}
                  <div className="mt-4 pt-3 border-t border-slate-700/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">Updated {new Date(model.lastUpdated).toLocaleDateString()}</span>
                      {model.alerts > 0 && (
                        <div className="flex items-center space-x-1 text-orange-400">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{model.alerts} alerts</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Control Panels */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >

          {/* System Performance */}
          <GlassCard title="System Performance" icon={BarChart3}>
            <div className="space-y-3">
              {modelPerformanceMetrics.map((metric, index) => (
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

          {/* Active Experiments */}
          <GlassCard title="Active Experiments" icon={Zap}>
            <div className="space-y-4">
              {activeExperiments.map((experiment, index) => (
                <motion.div
                  key={experiment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setSelectedExperiment(experiment)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-semibold text-white">{experiment.name}</h4>
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${
                      experiment.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                      experiment.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {experiment.status}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Type:</span>
                      <span className="text-white">{experiment.modelType}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Progress:</span>
                      <span className="text-cyan-400">{experiment.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          experiment.status === 'running' ? 'bg-blue-500' :
                          experiment.status === 'completed' ? 'bg-green-500' :
                          'bg-gray-500'
                        }`}
                        style={{
                          width: `${experiment.progress}%`,
                          animationDelay: `${index * 200}ms`
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">ETA: {experiment.eta}</span>
                      <span className="text-green-400">{experiment.expectedImprovement}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Environment Deployments */}
          <GlassCard title="Model Deployments" icon={Cloud}>
            <div className="space-y-3">
              {modelDeployments.map((env, index) => (
                <motion.div
                  key={env.environment}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center justify-between py-3 px-3 bg-slate-800/50 rounded-lg"
                >
                  <div>
                    <div className="text-sm font-semibold text-white">{env.environment}</div>
                    <div className="text-xs text-slate-400">{env.totalDeployments} total</div>
                  </div>
                  <div className={`text-xl font-bold ${
                    env.environment === 'Production' ? 'text-red-400' :
                    env.environment === 'Staging' ? 'text-yellow-400' :
                    env.environment === 'Development' ? 'text-blue-400' :
                    'text-green-400'
                  }`}>
                    {env.activeModels}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

        </motion.div>
      </div>

      {/* Recent Alerts & Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <GlassCard title="Recent Model Alerts & Activity" icon={AlertTriangle}>
          <div className="space-y-4">
            {recentAlerts.map((alert, index) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-full ${
                    alert.severity === 'critical' ? 'bg-red-500/20' :
                    alert.severity === 'warning' ? 'bg-yellow-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    <AlertTriangle className={`w-4 h-4 ${
                      alert.severity === 'critical' ? 'text-red-400' :
                      alert.severity === 'warning' ? 'text-yellow-400' :
                      'text-blue-400'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{alert.message}</div>
                    <div className="text-xs text-slate-400">
                      Model: {alert.modelId} • {new Date(alert.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className={`px-2 py-1 rounded text-xs font-semibold ${getAlertSeverityColor(alert.severity)}`}>
                    {alert.severity}
                  </div>
                  {!alert.resolved && (
                    <button className="px-3 py-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 rounded text-xs font-medium transition-colors">
                      Resolve
                    </button>
                  )}
                  {alert.resolved && (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded-lg text-sm transition-colors">
              View All Activity
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Model Detail Modal */}
      <AnimatePresence>
        {selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedModel(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-cyan-500/20 rounded-lg">
                    <Brain className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedModel.name}</h2>
                    <p className="text-slate-400">{selectedModel.id} • v{selectedModel.version}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedModel.status)}`}>
                    {selectedModel.status}
                  </span>
                  <button onClick={() => setSelectedModel(null)} className="p-2 hover:bg-slate-700 rounded-lg">
                    <X className="w-6 h-6 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="p-6 max-h-96 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Performance Metrics */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Accuracy</div>
                        <div className={`text-2xl font-bold ${
                          selectedModel.accuracy >= 95 ? 'text-green-400' :
                          selectedModel.accuracy >= 90 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {selectedModel.accuracy}%
                        </div>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Precision</div>
                        <div className="text-2xl font-bold text-blue-400">{selectedModel.precision}%</div>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">Recall</div>
                        <div className="text-2xl font-bold text-purple-400">{selectedModel.recall}%</div>
                      </div>
                      <div className="bg-slate-800/50 p-4 rounded-lg">
                        <div className="text-sm text-slate-400 mb-1">F1-Score</div>
                        <div className="text-2xl font-bold text-cyan-400">{selectedModel.f1_score}%</div>
                      </div>
                    </div>

                    <div className="mt-6 space-y-3">
                      <h4 className="text-md font-semibold text-white mb-3">Technical Specifications</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between py-2 border-b border-slate-700/30">
                          <span className="text-slate-400">Framework:</span>
                          <span className="text-white">{selectedModel.framework}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-700/30">
                          <span className="text-slate-400">Model Size:</span>
                          <span className="text-white">{selectedModel.modelSize}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-700/30">
                          <span className="text-slate-400">Throughput:</span>
                          <span className="text-cyan-400">{selectedModel.throughput}</span>
                        </div>
                        <div className="flex justify-between py-2 border-b border-slate-700/30">
                          <span className="text-slate-400">Resource Usage:</span>
                          <span className="text-orange-400">{selectedModel.resourceUsage}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Model Actions & History */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">Model Management</h3>

                    {/* Quick Actions */}
                    <div className="space-y-3 mb-6">
                      <button className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                        selectedModel.status === 'active' ? 'bg-green-500/20 hover:bg-green-500/30 text-green-400' : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-400'
                      }`}>
                        {selectedModel.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        <div className="text-left">
                          <div className="font-medium">{selectedModel.status === 'active' ? 'Pause' : 'Activate'} Model</div>
                          <div className="text-xs opacity-75">{selectedModel.status === 'active' ? 'Stop processing requests' : 'Start serving predictions'}</div>
                        </div>
                      </button>

                      <button className="w-full flex items-center space-x-3 p-3 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-lg transition-colors">
                        <RotateCcw className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium">Retraining</div>
                          <div className="text-xs opacity-75">Schedule model retraining</div>
                        </div>
                      </button>

                      <button className="w-full flex items-center space-x-3 p-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 rounded-lg transition-colors">
                        <Upload className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium">Version Control</div>
                          <div className="text-xs opacity-75">Manage model versions</div>
                        </div>
                      </button>
                    </div>

                    {/* Model History */}
                    <div className="bg-slate-800/50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-white mb-3">Recent Updates</h4>
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm text-white">Model deployed to production</div>
                            <div className="text-xs text-slate-400">{selectedModel.lastUpdated}</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm text-white">Performance metrics updated</div>
                            <div className="text-xs text-slate-400">2 hours ago</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                          <div className="flex-1">
                            <div className="text-sm text-white">Drift detection triggered</div>
                            <div className="text-xs text-slate-400">4 hours ago</div>
                          </div>
                        </div>
                      </div>
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

export default AIModelManagement;
