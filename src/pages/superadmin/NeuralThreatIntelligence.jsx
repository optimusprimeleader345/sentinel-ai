import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);
import {
  LineChart,
  Line as RechartsLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend as RechartsLegend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart as BarChartIcon,
  Bar as RechartsBar,
  PieChart as PieChartIcon,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  Brain,
  AlertTriangle,
  Network,
  Activity,
  Shield,
  Zap,
  Target,
  Cpu,
  Layers,
  Eye,
  Settings,
  TrendingUp,
  RefreshCw,
  Loader2,
  Play,
  Pause,
  RotateCcw,
  Radio,
  Bot,
  CircuitBoard,
  Sparkles,
  Gauge,
  Thermometer,
  Wind,
  CloudRain,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Star,
  Waves,
  TestTube,
  Radiation,
  Fuel,
  MessageSquare,
  Send,
  Phone,
  Video,
  Mail,
  Share2,
  Link,
  Unlink,
  WifiOff,
  Wifi,
  Server,
  Database,
  Cloud,
  Globe,
  Map,
  Navigation,
  Compass,
  Briefcase,
  Clipboard,
  Users,
  UserCog,
  ShieldCheck,
  AlertOctagon,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  Flag,
  CheckSquare,
  Square,
  Calculator,
  TrendingDown,
  DollarSign,
  PieChart,
  BarChart,
  FileText,
  Clock,
  Lock,
  EyeOff,
  FileCheck,
  UserCheck,
  UserX,
  Building,
  Crown,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  HardDrive
} from 'lucide-react';

// 🧠 NEURAL THREAT INTELLIGENCE HUB - SUPER ADMIN ONLY
// ADVANCED AI-POWERED NEURAL NETWORK THREAT DETECTION & ANALYSIS
// DEEP LEARNING-BASED CYBER THREAT INTELLIGENCE PLATFORM

const NeuralThreatIntelligence = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-slate-950 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-20"
        >
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Neural Threat Intelligence Hub. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-purple-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔄 STATE MANAGEMENT
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('neural-analysis');
  const [selectedNeuralModel, setSelectedNeuralModel] = useState(null);
  const [neuralData, setNeuralData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [neuralAssessments, setNeuralAssessments] = useState([]);
  const [mitigationActions, setMitigationActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 📊 ANALYTICS DATA
  const [analyticsData, setAnalyticsData] = useState(null);

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Neural Network Threat Categories
  const neuralCategories = [
    {
      id: 'anomaly-detection',
      name: 'Anomaly Detection',
      icon: AlertTriangle,
      level: 'HIGH',
      score: 94,
      trend: 'increasing',
      description: 'Deep learning anomaly detection in network traffic',
      mitigation: 'Automated isolation protocols',
      color: 'red'
    },
    {
      id: 'pattern-recognition',
      name: 'Pattern Recognition',
      icon: Target,
      level: 'MEDIUM',
      score: 87,
      trend: 'stable',
      description: 'Neural pattern matching for threat signatures',
      mitigation: 'Enhanced signature updates',
      color: 'orange'
    },
    {
      id: 'behavioral-analysis',
      name: 'Behavioral Analysis',
      icon: Activity,
      level: 'HIGH',
      score: 91,
      trend: 'increasing',
      description: 'AI-powered user and system behavior analysis',
      mitigation: 'Adaptive security policies',
      color: 'yellow'
    },
    {
      id: 'predictive-modeling',
      name: 'Predictive Modeling',
      icon: Brain,
      level: 'MEDIUM',
      score: 83,
      trend: 'stable',
      description: 'Machine learning threat prediction models',
      mitigation: 'Proactive defense measures',
      color: 'purple'
    },
    {
      id: 'deep-packet-inspection',
      name: 'Deep Packet Inspection',
      icon: Network,
      level: 'LOW',
      score: 76,
      trend: 'stable',
      description: 'Neural network packet analysis',
      mitigation: 'Traffic filtering optimization',
      color: 'blue'
    },
    {
      id: 'zero-day-detection',
      name: 'Zero-Day Detection',
      icon: Shield,
      level: 'HIGH',
      score: 89,
      trend: 'increasing',
      description: 'Unknown threat detection using AI',
      mitigation: 'Heuristic analysis enhancement',
      color: 'green'
    }
  ];

  // 🧠 NEURAL GLASS CARD COMPONENT
  const NeuralGlassCard = ({ children, title, icon: Icon, status, neuralLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(139,92,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] text-purple-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {neuralLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                neuralLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                neuralLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                neuralLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                'bg-green-500/20 text-green-400 border-green-500/40'
              }`}>
                {neuralLevel}
              </span>
            )}
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                status === 'NORMAL' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                'bg-blue-500/20 text-blue-400 border-blue-500/40'
              }`}>
                {status}
              </span>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );

  // 📊 MAIN NEURAL THREAT INTELLIGENCE INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-violet-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/40 to-violet-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-violet-600/35 to-indigo-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-violet-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-violet-300 via-indigo-200 to-blue-200 bg-clip-text text-transparent drop-shadow-sm">
                Neural Threat Intelligence Hub
              </h1>
              <p className="text-purple-200/80 text-sm font-medium">Advanced AI-Powered Neural Network Threat Detection & Analysis</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">Neural Networks Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Bot className="w-4 h-4 text-violet-400 animate-pulse" />
                  <span className="text-xs text-slate-300">AI Models Running</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CircuitBoard className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Deep Learning Engines</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-xs text-slate-300">LIVE</span>
                </div>
                <div className="text-xs text-slate-400">|</div>
                <div className="text-xs text-slate-300">
                  Updated: {lastUpdated.toLocaleTimeString()}
                </div>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Neural Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Neural Intelligence Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'neural-analysis', label: 'Neural Analysis', icon: Brain },
            { id: 'threat-detection', label: 'AI Threat Detection', icon: Target },
            { id: 'pattern-recognition', label: 'Pattern Recognition', icon: Network },
            { id: 'model-performance', label: 'Model Performance', icon: Gauge },
            { id: 'neural-reports', label: 'Neural Reports', icon: FileText }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-violet-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'neural-analysis' && (
            <motion.div
              key="neural-analysis"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Neural Network Intelligence Metrics Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <NeuralGlassCard title="Neural Accuracy" icon={Gauge} neuralLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">96.7%</div>
                    <div className="text-sm text-slate-400">Threat Detection Rate</div>
                    <div className="text-xs text-green-400 mt-2">+1.2% from last week</div>
                  </div>
                </NeuralGlassCard>

                <NeuralGlassCard title="Active Models" icon={Bot} neuralLevel="MEDIUM">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-violet-400 mb-2">12</div>
                    <div className="text-sm text-slate-400">Neural Networks</div>
                    <div className="text-xs text-blue-400 mt-2">8 production, 4 training</div>
                  </div>
                </NeuralGlassCard>

                <NeuralGlassCard title="False Positives" icon={AlertTriangle} neuralLevel="LOW">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">0.3%</div>
                    <div className="text-sm text-slate-400">Error Rate</div>
                    <div className="text-xs text-green-400 mt-2">-0.1% improvement</div>
                  </div>
                </NeuralGlassCard>

                <NeuralGlassCard title="Processing Speed" icon={Zap} neuralLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">2.4ms</div>
                    <div className="text-sm text-slate-400">Average Latency</div>
                    <div className="text-xs text-green-400 mt-2">Real-time processing</div>
                  </div>
                </NeuralGlassCard>
              </div>

              {/* Neural Network Categories Overview */}
              <NeuralGlassCard title="Neural Network Threat Categories Overview" icon={Layers} status="ANALYZING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {neuralCategories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedNeuralModel === category.id
                            ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                        }`}
                        onClick={() => setSelectedNeuralModel(selectedNeuralModel === category.id ? null : category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.4)]`} />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{category.name}</h4>
                            <div className={`text-xs ${
                              category.level === 'CRITICAL' ? 'text-red-400' :
                              category.level === 'HIGH' ? 'text-orange-400' :
                              category.level === 'MEDIUM' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {category.level} PRIORITY
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Accuracy:</span>
                            <span className="text-white font-medium">{category.score}%</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">Trend:</span>
                            <span className={`font-medium ${
                              category.trend === 'increasing' ? 'text-green-400' :
                              category.trend === 'decreasing' ? 'text-red-400' :
                              'text-yellow-400'
                            }`}>
                              {category.trend.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </NeuralGlassCard>

              {/* Real-time Neural Alerts */}
              <NeuralGlassCard title="Real-time Neural Threat Alerts & Notifications" icon={Radio} status="ACTIVE">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { id: 1, type: 'critical', title: 'Neural Anomaly Detected', message: 'Unusual traffic pattern identified by deep learning model', time: '2 minutes ago', severity: 'critical' },
                    { id: 2, type: 'warning', title: 'Model Performance Drift', message: 'Behavioral analysis model accuracy dropped by 2%', time: '15 minutes ago', severity: 'high' },
                    { id: 3, type: 'info', title: 'New Threat Pattern Learned', message: 'AI successfully adapted to emerging attack vector', time: '1 hour ago', severity: 'medium' },
                    { id: 4, type: 'success', title: 'Zero-Day Detection Success', message: 'Unknown malware detected and contained by neural network', time: '2 hours ago', severity: 'low' }
                  ].map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border ${
                        alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                        alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                        alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-green-500/10 border-green-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            alert.severity === 'critical' ? 'bg-red-400' :
                            alert.severity === 'high' ? 'bg-orange-400' :
                            alert.severity === 'medium' ? 'bg-yellow-400' :
                            'bg-green-400'
                          }`}></div>
                          <div>
                            <div className="text-white font-medium text-sm">{alert.title}</div>
                            <div className="text-slate-400 text-xs">{alert.message}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-slate-400 text-xs">{alert.time}</div>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                            alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                            alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-green-500/20 text-green-400'
                          }`}>
                            {alert.severity.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </NeuralGlassCard>
            </motion.div>
          )}

          {activeSection === 'threat-detection' && (
            <motion.div
              key="threat-detection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Threat Detection Engine */}
              <NeuralGlassCard title="AI Threat Detection Engine" icon={Target} status="PROCESSING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Bot className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">98.2%</div>
                    <div className="text-sm text-slate-400">Detection Accuracy</div>
                  </div>
                  <div className="text-center p-6 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                    <Zap className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-violet-400 mb-1">1.8ms</div>
                    <div className="text-sm text-slate-400">Response Time</div>
                  </div>
                  <div className="text-center p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-indigo-400 mb-1">247</div>
                    <div className="text-sm text-slate-400">Threats Blocked Today</div>
                  </div>
                </div>

                {/* Neural Threat Detection Scenarios */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">Active Neural Detection Models</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">AI Models Active</span>
                    </div>
                  </div>

                  {/* Detection Models Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        model: 'Deep Anomaly Detector',
                        type: 'Autoencoder Network',
                        accuracy: 97,
                        status: 'active',
                        icon: Brain,
                        color: 'purple',
                        detections: 156,
                        description: 'Unsupervised learning for network anomaly detection'
                      },
                      {
                        model: 'Behavioral Pattern Analyzer',
                        type: 'LSTM Network',
                        accuracy: 94,
                        status: 'active',
                        icon: Activity,
                        color: 'violet',
                        detections: 89,
                        description: 'Sequential pattern recognition for user behavior'
                      },
                      {
                        model: 'Signature Matching Engine',
                        type: 'Convolutional NN',
                        accuracy: 99,
                        status: 'active',
                        icon: Target,
                        color: 'indigo',
                        detections: 234,
                        description: 'Deep learning signature-based threat detection'
                      },
                      {
                        model: 'Predictive Threat Model',
                        type: 'Transformer Network',
                        accuracy: 92,
                        status: 'training',
                        icon: TrendingUp,
                        color: 'blue',
                        detections: 67,
                        description: 'Advanced prediction of emerging threats'
                      }
                    ].map((model, index) => {
                      const Icon = model.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                          className={`relative p-6 rounded-xl border backdrop-blur-xl hover:scale-105 transition-all duration-300 ${
                            model.color === 'purple' ? 'bg-gradient-to-br from-purple-500/10 to-purple-900/20 border-purple-500/30' :
                            model.color === 'violet' ? 'bg-gradient-to-br from-violet-500/10 to-violet-900/20 border-violet-500/30' :
                            model.color === 'indigo' ? 'bg-gradient-to-br from-indigo-500/10 to-indigo-900/20 border-indigo-500/30' :
                            'bg-gradient-to-br from-blue-500/10 to-blue-900/20 border-blue-500/30'
                          }`}
                        >
                          {/* Glow Effect */}
                          <div className={`absolute inset-0 rounded-xl opacity-30 blur-xl ${
                            model.color === 'purple' ? 'bg-purple-500/20' :
                            model.color === 'violet' ? 'bg-violet-500/20' :
                            model.color === 'indigo' ? 'bg-indigo-500/20' :
                            'bg-blue-500/20'
                          }`}></div>

                          <div className="relative z-10">
                            {/* Header with Icon and Status */}
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${
                                  model.color === 'purple' ? 'bg-purple-500/20' :
                                  model.color === 'violet' ? 'bg-violet-500/20' :
                                  model.color === 'indigo' ? 'bg-indigo-500/20' :
                                  'bg-blue-500/20'
                                }`}>
                                  <Icon className={`w-5 h-5 ${
                                    model.color === 'purple' ? 'text-purple-400' :
                                    model.color === 'violet' ? 'text-violet-400' :
                                    model.color === 'indigo' ? 'text-indigo-400' :
                                    'text-blue-400'
                                  }`} />
                                </div>
                                <div>
                                  <h5 className="text-white font-semibold text-sm">{model.model}</h5>
                                  <p className="text-slate-400 text-xs">{model.type}</p>
                                </div>
                              </div>

                              {/* Status Indicator */}
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                                model.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                model.status === 'training' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-red-500/20 text-red-400'
                              }`}>
                                <div className={`w-2 h-2 rounded-full ${
                                  model.status === 'active' ? 'bg-green-400' :
                                  model.status === 'training' ? 'bg-yellow-400 animate-pulse' :
                                  'bg-red-400'
                                }`}></div>
                                <span className="capitalize">{model.status}</span>
                              </div>
                            </div>

                            {/* Description */}
                            <p className="text-slate-300 text-xs mb-4 leading-relaxed">{model.description}</p>

                            {/* Accuracy and Detections */}
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-slate-400 text-xs font-medium">Accuracy</span>
                                <div className="flex items-center space-x-2">
                                  <span className={`text-lg font-bold ${
                                    model.color === 'purple' ? 'text-purple-400' :
                                    model.color === 'violet' ? 'text-violet-400' :
                                    model.color === 'indigo' ? 'text-indigo-400' :
                                    'text-blue-400'
                                  }`}>
                                    {model.accuracy}%
                                  </span>
                                </div>
                              </div>

                              {/* Progress Bar */}
                              <div className="relative">
                                <div className="w-full bg-slate-600/50 rounded-full h-3 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${model.accuracy}%` }}
                                    transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }}
                                    className={`h-full rounded-full ${
                                      model.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' :
                                      model.color === 'violet' ? 'bg-gradient-to-r from-violet-500 to-violet-600' :
                                      model.color === 'indigo' ? 'bg-gradient-to-r from-indigo-500 to-indigo-600' :
                                      'bg-gradient-to-r from-blue-500 to-blue-600'
                                    }`}
                                  />
                                </div>

                                {/* Animated Glow */}
                                <div className={`absolute inset-0 rounded-full blur-sm opacity-50 ${
                                  model.color === 'purple' ? 'bg-purple-500/30' :
                                  model.color === 'violet' ? 'bg-violet-500/30' :
                                  model.color === 'indigo' ? 'bg-indigo-500/30' :
                                  'bg-blue-500/30'
                                }`}></div>
                              </div>

                              {/* Detections Count */}
                              <div className="flex items-center justify-center space-x-1">
                                <span className="text-xs text-slate-400">Detections Today:</span>
                                <span className={`text-sm font-bold ${
                                  model.color === 'purple' ? 'text-purple-400' :
                                  model.color === 'violet' ? 'text-violet-400' :
                                  model.color === 'indigo' ? 'text-indigo-400' :
                                  'text-blue-400'
                                }`}>
                                  {model.detections}
                                </span>
                              </div>
                            </div>

                            {/* Hover Effect Border */}
                            <div className={`absolute inset-0 rounded-xl border-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                              model.color === 'purple' ? 'border-purple-400/50' :
                              model.color === 'violet' ? 'border-violet-400/50' :
                              model.color === 'indigo' ? 'border-indigo-400/50' :
                              'border-blue-400/50'
                            }`}></div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Detection Summary Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">4</div>
                      <div className="text-sm text-slate-400">Active Models</div>
                      <div className="text-xs text-slate-500">Neural Networks</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-violet-400 mb-1">546</div>
                      <div className="text-sm text-slate-400">Total Detections</div>
                      <div className="text-xs text-slate-500">Last 24 hours</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-400 mb-1">95.8%</div>
                      <div className="text-sm text-slate-400">Average Accuracy</div>
                      <div className="text-xs text-slate-500">All Models</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400 mb-1">2.1ms</div>
                      <div className="text-sm text-slate-400">Avg Response Time</div>
                      <div className="text-xs text-slate-500">Real-time</div>
                    </div>
                  </div>
                </div>
              </NeuralGlassCard>
            </motion.div>
          )}

          {activeSection === 'pattern-recognition' && (
            <motion.div
              key="pattern-recognition"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Neural Pattern Recognition */}
              <NeuralGlassCard title="Neural Pattern Recognition Engine" icon={Network} status="LEARNING">
                <div className="space-y-6">
                  {/* Pattern Recognition Controls */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Pattern Type</option>
                      <option>Network Traffic</option>
                      <option>User Behavior</option>
                      <option>System Logs</option>
                      <option>Application Data</option>
                    </select>

                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Analysis Mode</option>
                      <option>Real-time</option>
                      <option>Batch Processing</option>
                      <option>Historical</option>
                    </select>

                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                      <option>Confidence Threshold</option>
                      <option>90%+</option>
                      <option>80%+</option>
                      <option>70%+</option>
                      <option>50%+</option>
                    </select>

                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded text-sm font-medium">
                      Start Analysis
                    </button>
                  </div>

                  {/* Neural Pattern Visualization */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Detected Threat Patterns</h4>

                    {[
                      { pattern: 'DDoS Attack Pattern', confidence: 98, type: 'Network', severity: 'high', description: 'Distributed denial of service detected in traffic patterns' },
                      { pattern: 'Data Exfiltration', confidence: 94, type: 'Behavioral', severity: 'critical', description: 'Unusual data transfer patterns indicating breach' },
                      { pattern: 'Brute Force Login', confidence: 89, type: 'Authentication', severity: 'medium', description: 'Sequential login attempts detected' },
                      { pattern: 'Malware Signature', confidence: 96, type: 'Binary', severity: 'high', description: 'Known malware pattern in file analysis' },
                      { pattern: 'Zero-Day Exploit', confidence: 87, type: 'Unknown', severity: 'critical', description: 'Anomalous behavior not matching known patterns' }
                    ].map((pattern, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex-1">
                            <h5 className="text-white font-medium text-sm">{pattern.pattern}</h5>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded">{pattern.type}</span>
                              <span className={`text-xs font-bold px-2 py-1 rounded ${
                                pattern.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                                pattern.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                                'bg-yellow-500/20 text-yellow-400'
                              }`}>
                                {pattern.severity.toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-purple-400">{pattern.confidence}%</div>
                            <div className="text-xs text-slate-400">Confidence</div>
                          </div>
                        </div>

                        <p className="text-slate-300 text-xs mb-3">{pattern.description}</p>

                        {/* Confidence Bar */}
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                            style={{ width: `${pattern.confidence}%` }}
                          ></div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Pattern Learning Progress */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400 mb-1">1,247</div>
                      <div className="text-sm text-slate-400">Patterns Learned</div>
                      <div className="text-xs text-slate-500">Last 30 days</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-violet-400 mb-1">94.3%</div>
                      <div className="text-sm text-slate-400">Learning Accuracy</div>
                      <div className="text-xs text-slate-500">Continuous improvement</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-indigo-400 mb-1">156</div>
                      <div className="text-sm text-slate-400">New Patterns Today</div>
                      <div className="text-xs text-slate-500">Real-time adaptation</div>
                    </div>
                  </div>
                </div>
              </NeuralGlassCard>
            </motion.div>
          )}

          {activeSection === 'model-performance' && (
            <motion.div
              key="model-performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Model Performance Analytics */}
              <NeuralGlassCard title="AI Model Performance Analytics" icon={Gauge} status="MONITORING">
                <div className="space-y-6">
                  {/* Model Performance Metrics */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                      <Gauge className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-purple-400">95.8%</div>
                      <div className="text-xs text-slate-400">Overall Accuracy</div>
                    </div>
                    <div className="text-center p-4 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                      <TrendingUp className="w-8 h-8 text-violet-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-violet-400">+2.1%</div>
                      <div className="text-xs text-slate-400">Weekly Improvement</div>
                    </div>
                    <div className="text-center p-4 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                      <Activity className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-indigo-400">12</div>
                      <div className="text-xs text-slate-400">Active Models</div>
                    </div>
                    <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                      <Zap className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                      <div className="text-xl font-bold text-blue-400">1.9ms</div>
                      <div className="text-xs text-slate-400">Avg Latency</div>
                    </div>
                  </div>

                  {/* Model Performance Details */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Model Performance Breakdown</h4>

                    {[
                      { model: 'Anomaly Detection NN', accuracy: 97.2, precision: 94.8, recall: 95.6, f1Score: 95.2, status: 'excellent' },
                      { model: 'Behavioral Analysis LSTM', accuracy: 93.8, precision: 91.2, recall: 92.4, f1Score: 91.8, status: 'good' },
                      { model: 'Pattern Recognition CNN', accuracy: 98.1, precision: 97.3, recall: 96.9, f1Score: 97.1, status: 'excellent' },
                      { model: 'Predictive Threat Model', accuracy: 89.4, precision: 87.6, recall: 88.9, f1Score: 88.2, status: 'training' }
                    ].map((model, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="text-white font-medium text-sm">{model.model}</h5>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${
                            model.status === 'excellent' ? 'bg-green-500/20 text-green-400' :
                            model.status === 'good' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {model.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="text-lg font-bold text-purple-400">{model.accuracy}%</div>
                            <div className="text-xs text-slate-400">Accuracy</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-violet-400">{model.precision}%</div>
                            <div className="text-xs text-slate-400">Precision</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-indigo-400">{model.recall}%</div>
                            <div className="text-xs text-slate-400">Recall</div>
                          </div>
                          <div>
                            <div className="text-lg font-bold text-blue-400">{model.f1Score}%</div>
                            <div className="text-xs text-slate-400">F1-Score</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Performance Optimization */}
                  <div className="flex justify-between items-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <div>
                      <h5 className="text-white font-medium text-sm mb-1">Model Optimization</h5>
                      <p className="text-slate-400 text-xs">Automated performance tuning active</p>
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-sm font-medium rounded transition-all duration-300">
                      Run Optimization
                    </button>
                  </div>
                </div>
              </NeuralGlassCard>
            </motion.div>
          )}

          {activeSection === 'neural-reports' && (
            <motion.div
              key="neural-reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Neural Threat Intelligence Reports */}
              <NeuralGlassCard title="Neural Threat Intelligence Reports Center" icon={FileText} status="GENERATING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <FileText className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">47</div>
                    <div className="text-sm text-slate-400">Reports Generated</div>
                  </div>
                  <div className="text-center p-6 bg-violet-500/10 border border-violet-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-violet-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-violet-400 mb-1">23</div>
                    <div className="text-sm text-slate-400">AI Insights</div>
                  </div>
                  <div className="text-center p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                    <Clock className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-indigo-400 mb-1">4.2min</div>
                    <div className="text-sm text-slate-400">Avg Generation Time</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Available Neural Reports</h4>
                    <div className="space-y-3">
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium text-sm">Neural Threat Summary</div>
                        <div className="text-slate-400 text-sm">AI-powered threat overview with predictions</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium text-sm">Model Performance Report</div>
                        <div className="text-slate-400 text-sm">Detailed neural network performance analysis</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium text-sm">Pattern Recognition Analysis</div>
                        <div className="text-slate-400 text-sm">Deep learning pattern detection insights</div>
                      </button>
                      <button className="w-full p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-left transition-colors">
                        <div className="text-white font-medium text-sm">Predictive Threat Forecast</div>
                        <div className="text-slate-400 text-sm">AI-generated threat predictions and scenarios</div>
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Report Generation</h4>
                    <div className="p-4 bg-slate-800/50 rounded-lg">
                      <div className="text-white font-medium mb-2">Custom Neural Report Builder</div>
                      <div className="space-y-3">
                        <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm">
                          <option>Select Report Type</option>
                          <option>Executive Summary</option>
                          <option>Technical Analysis</option>
                          <option>Performance Metrics</option>
                          <option>Threat Predictions</option>
                        </select>

                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="include-ai" className="rounded" />
                          <label htmlFor="include-ai" className="text-xs text-slate-300">Include AI Insights</label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="include-predictions" className="rounded" />
                          <label htmlFor="include-predictions" className="text-xs text-slate-300">Include Predictions</label>
                        </div>

                        <button className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white text-sm font-medium rounded transition-all duration-300">
                          Generate Neural Report
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </NeuralGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NeuralThreatIntelligence;
