import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Shield,
  AlertTriangle,
  Activity,
  RefreshCw,
  Lock,
  Brain,
  Zap,
  Network,
  Target,
  TrendingUp,
  CheckCircle,
  Globe,
  Users,
  FileCheck,
  Server,
  Settings,
  Clock,
  BarChart3,
  Calculator,
  Database,
  Mail,
  Cloud,
  Play,
  Pause,
  RotateCcw,
  Cpu,
  Layers,
  Eye,
  Lightbulb,
  Sparkles,
  Bot,
  Code,
  GitBranch,
  Zap as Lightning,
  Microscope,
  Gauge,
  Workflow,
  Database as Data,
  Cpu as Processor,
  Eye as Vision,
  Brain as Neural,
  Network as Net,
  Sparkles as Magic,
  Bot as Robot,
  Code as Coding,
  GitBranch as Branch,
  Lightbulb as Idea,
  Microscope as Scope,
  Gauge as Meter,
  Workflow as Flow,
  FileText,
  Radio,
  Search,
  Plus
} from 'lucide-react';

// 🤖 AI GLOBAL INTELLIGENCE FUSION CENTER - SUPER ADMIN ONLY
// ADVANCED AI-DRIVEN INTELLIGENCE FUSION & COGNITIVE COMPUTING PLATFORM
// GLOBAL AI INTELLIGENCE NETWORK - CROSS-AGENCY AI FUSION CENTER

const IntelligenceFusion = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-indigo-800 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-20"
        >
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is an AI Global Intelligence Fusion Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('ai-analysis');
  const [selectedAIModel, setSelectedAIModel] = useState(null);
  const [aiData, setAIData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [aiAssessments, setAIAssessments] = useState([]);
  const [fusionActions, setFusionActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 🆕 ENHANCED AI FEATURES STATE
  const [aiIntelligenceFeed, setAIIntelligenceFeed] = useState([
    { id: 1, type: 'ai-breakthrough', severity: 'critical', title: 'Quantum AI Model Breakthrough', message: 'New quantum-accelerated AI model detected', timestamp: new Date(), source: 'Global AI Network' },
    { id: 2, type: 'bias-detection', severity: 'high', title: 'AI Bias Anomaly', message: 'Potential bias detected in threat classification model', timestamp: new Date(Date.now() - 300000), source: 'Ethics Monitor' },
    { id: 3, type: 'federated-learning', severity: 'medium', title: 'Federated Learning Update', message: 'Global AI model synchronization completed', timestamp: new Date(Date.now() - 600000), source: 'FL Network' },
    { id: 4, type: 'neural-network', severity: 'low', title: 'Neural Architecture Optimized', message: 'AutoML generated 15% more efficient model', timestamp: new Date(Date.now() - 900000), source: 'NAS Engine' }
  ]);
  const [aiModelTesting, setAIModelTesting] = useState({
    isRunning: false,
    currentModel: 'GPT-4 Enhanced',
    progress: 0,
    results: null,
    testType: 'performance'
  });
  const [aiSystemHealth, setAISystemHealth] = useState({
    cognitiveResilience: 99.7,
    neuralEfficiency: 97.3,
    intelligenceAccuracy: 95.8,
    processingLatency: 0.015
  });

  // Handle refresh
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsRefreshing(false);
    } catch (error) {
      console.error('Refresh failed:', error);
      setIsRefreshing(false);
    }
  }, []);

  // 🤖 AI GLASS CARD COMPONENT - PURPLE/INDIGO THEME
  const AIGlassCard = ({ children, title, icon: Icon, status, aiLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(139,92,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(139,92,246,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] text-purple-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {aiLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                aiLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                aiLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                aiLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                'bg-green-500/20 text-green-400 border-green-500/40'
              }`}>
                {aiLevel}
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

  // 📊 MAIN AI GLOBAL INTELLIGENCE FUSION INTERFACE - PURPLE/INDIGO THEME
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-indigo-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Enhanced Background Effects - Neural AI Style */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/40 to-indigo-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-indigo-600/35 to-purple-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/30 to-indigo-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-indigo-500/25 to-purple-500/25 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header - PURPLE/INDIGO THEME */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-purple-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-300 via-indigo-300 via-purple-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-sm">
                AI Global Intelligence Fusion Center
              </h1>
              <p className="text-purple-200/80 text-sm font-medium">Advanced AI-Driven Intelligence Fusion & Cognitive Computing Platform</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">AI Systems Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Neural Networks Running</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Network className="w-4 h-4 text-purple-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Global Intelligence Fused</span>
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
                  AI Models: <span className="text-green-400">247</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-purple-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh AI Intelligence'}</span>
            </button>
          </div>
        </motion.div>

        {/* AI Intelligence Fusion Command Center Tabs - Exact Neural Threat Intelligence Structure */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'ai-analysis', label: 'AI Analysis', icon: Brain },
            { id: 'ai-threat-detection', label: 'AI Threat Detection', icon: Target },
            { id: 'ai-pattern-recognition', label: 'AI Pattern Recognition', icon: Network },
            { id: 'ai-performance', label: 'AI Performance', icon: Gauge },
            { id: 'ai-reports', label: 'AI Reports', icon: FileText }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-purple-500/20 to-indigo-500/20 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS - Exact Neural Threat Intelligence Structure */}
        <AnimatePresence mode="wait">
          {activeSection === 'ai-analysis' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Control Center Metrics Dashboard - PURPLE/INDIGO THEME */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <AIGlassCard title="Global AI Readiness" icon={Brain} aiLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">89%</div>
                    <div className="text-sm text-slate-400">Intelligence Fusion</div>
                    <div className="text-xs text-green-400 mt-2">+7.3% from last month</div>
                  </div>
                </AIGlassCard>

                <AIGlassCard title="Active AI Models" icon={Bot} aiLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">247</div>
                    <div className="text-sm text-slate-400">Neural Networks</div>
                    <div className="text-xs text-blue-400 mt-2">GPT-4, BERT, Transformers</div>
                  </div>
                </AIGlassCard>

                <AIGlassCard title="Federated Learning" icon={Network} aiLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">94%</div>
                    <div className="text-sm text-slate-400">Global Synchronization</div>
                    <div className="text-xs text-green-400 mt-2">1,203 nodes active</div>
                  </div>
                </AIGlassCard>

                <AIGlassCard title="AI Ethics Score" icon={Shield} aiLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-400 mb-2">96.7%</div>
                    <div className="text-sm text-slate-400">Bias & Fairness</div>
                    <div className="text-xs text-purple-400 mt-2">Responsible AI verified</div>
                  </div>
                </AIGlassCard>
              </div>

              {/* 🆕 ENHANCED: Real-time AI Intelligence Feed */}
              <AIGlassCard title="Real-time AI Intelligence Feed" icon={Radio} status="ACTIVE">
                <div className="space-y-4">
                  {/* Live Feed Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                      <span className="text-white font-semibold">Global AI Intelligence Stream</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Last updated:</span>
                      <span className="text-purple-400 font-mono text-xs">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* AI Intelligence Feed */}
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {aiIntelligenceFeed.map((intelligence) => (
                      <motion.div
                        key={intelligence.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border backdrop-blur-sm ${
                          intelligence.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                          intelligence.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                          intelligence.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              intelligence.severity === 'critical' ? 'bg-red-400 animate-pulse' :
                              intelligence.severity === 'high' ? 'bg-orange-400' :
                              intelligence.severity === 'medium' ? 'bg-yellow-400' :
                              'bg-green-400'
                            }`}></div>
                            <div>
                              <div className="text-white font-medium text-sm">{intelligence.title}</div>
                              <div className="text-slate-400 text-xs">{intelligence.message}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              intelligence.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                              intelligence.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              intelligence.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {intelligence.severity.toUpperCase()}
                            </span>
                            <div className="text-slate-400 text-xs mt-1">{intelligence.source}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Eye className="w-4 h-4" />
                      <span>Analyze Intelligence</span>
                    </button>
                    <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Database className="w-4 h-4" />
                      <span>Export AI Data</span>
                    </button>
                    <button className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Configure AI Feeds</span>
                    </button>
                  </div>
                </div>
              </AIGlassCard>

              {/* AI Readiness Categories Overview - PURPLE/INDIGO THEME */}
              <AIGlassCard title="AI Intelligence Fusion Categories" icon={Network} status="PROCESSING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'cognitive',
                      name: 'Cognitive Computing',
                      icon: Brain,
                      level: 'HIGH',
                      score: 89,
                      trend: 'increasing',
                      description: 'Advanced neural network processing',
                      mitigation: 'Continuous learning optimization',
                      color: 'purple'
                    },
                    {
                      id: 'federated',
                      name: 'Federated Learning',
                      icon: Network,
                      level: 'HIGH',
                      score: 94,
                      trend: 'stable',
                      description: 'Distributed AI model training',
                      mitigation: 'Privacy-preserving synchronization',
                      color: 'indigo'
                    },
                    {
                      id: 'ethics',
                      name: 'AI Ethics & Governance',
                      icon: Shield,
                      level: 'HIGH',
                      score: 96,
                      trend: 'increasing',
                      description: 'Responsible AI implementation',
                      mitigation: 'Bias detection & mitigation',
                      color: 'blue'
                    },
                    {
                      id: 'mlops',
                      name: 'MLOps Pipeline',
                      icon: Workflow,
                      level: 'HIGH',
                      score: 91,
                      trend: 'increasing',
                      description: 'Machine learning operations',
                      mitigation: 'Automated deployment & monitoring',
                      color: 'green'
                    },
                    {
                      id: 'neural-arch',
                      name: 'Neural Architecture',
                      icon: Layers,
                      level: 'HIGH',
                      score: 87,
                      trend: 'increasing',
                      description: 'Advanced neural network design',
                      mitigation: 'AutoML optimization',
                      color: 'cyan'
                    }
                  ].map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          category.id === 'cognitive'
                            ? 'border-purple-500/50 bg-purple-500/10 shadow-[0_0_15px_rgba(139,92,246,0.3)]'
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                        }`}
                        onClick={() => setActiveSection(category.id)}
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
                            <span className="text-slate-400">Score:</span>
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
              </AIGlassCard>
            </motion.div>
          )}

          {activeSection === 'ai-threat-detection' && (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Systems Intelligence Engine */}
              <AIGlassCard title="AI Systems Intelligence Engine" icon={Bot} status="LEARNING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Bot className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">247</div>
                    <div className="text-sm text-slate-400">AI Models Active</div>
                  </div>
                  <div className="text-center p-6 bg-indigo-500/10 border border-indigo-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-indigo-400 mb-1">1,203</div>
                    <div className="text-sm text-slate-400">Federated Nodes</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">99.7%</div>
                    <div className="text-sm text-slate-400">AI Ethics Score</div>
                  </div>
                </div>

                {/* 🆕 ENHANCED: Interactive AI Model Testing Suite */}
                <AIGlassCard title="Interactive AI Model Testing Suite" icon={Zap} status={aiModelTesting.isRunning ? "TESTING" : "READY"}>
                  <div className="space-y-6">
                    {/* Test Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Select AI Model</label>
                        <select
                          value={aiModelTesting.currentModel}
                          onChange={(e) => setAIModelTesting(prev => ({ ...prev, currentModel: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          <option>GPT-4 Enhanced</option>
                          <option>BERT Large</option>
                          <option>Transformer XL</option>
                          <option>Neural Architecture</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Test Type</label>
                        <select
                          value={aiModelTesting.testType}
                          onChange={(e) => setAIModelTesting(prev => ({ ...prev, testType: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          <option value="performance">Performance Test</option>
                          <option value="accuracy">Accuracy Analysis</option>
                          <option value="bias">Bias Detection</option>
                          <option value="robustness">Robustness Test</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        {!aiModelTesting.isRunning ? (
                          <button
                            onClick={() => setAIModelTesting(prev => ({ ...prev, isRunning: true, progress: 0 }))}
                            className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Play className="w-4 h-4" />
                            <span>Start AI Test</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setAIModelTesting(prev => ({ ...prev, isRunning: false, progress: 100 }))}
                            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Pause className="w-4 h-4" />
                            <span>Stop AI Test</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Test Progress */}
                    {aiModelTesting.isRunning && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-700/30 rounded-xl border border-purple-500/30"
                      >
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-purple-400 mb-2">{aiModelTesting.progress}%</div>
                          <div className="text-sm text-slate-400">AI Model Test Completion</div>
                          <div className="text-xs text-purple-400 mt-1">Testing {aiModelTesting.currentModel}</div>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-4 mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${aiModelTesting.progress}%` }}
                            className="h-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-purple-400 font-bold">4.2s</div>
                            <div className="text-slate-400">Inference Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-indigo-400 font-bold">97.8%</div>
                            <div className="text-slate-400">Model Accuracy</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Test Results */}
                    {aiModelTesting.progress === 100 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-xl border border-purple-500/30"
                      >
                        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>AI Test Results - {aiModelTesting.currentModel}</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-purple-400 mb-1">PASS</div>
                            <div className="text-sm text-slate-400">Overall Assessment</div>
                            <div className="text-xs text-green-400">AI Model Verified</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-indigo-400 mb-1">6.7s</div>
                            <div className="text-sm text-slate-400">Total Test Duration</div>
                            <div className="text-xs text-blue-400">Performance Optimized</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">98.9%</div>
                            <div className="text-sm text-slate-400">Confidence Score</div>
                            <div className="text-xs text-green-400">High Reliability</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </AIGlassCard>

                {/* AI System Categories */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">AI Intelligence Categories</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-purple-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">AI Systems Active</span>
                    </div>
                  </div>

                  {/* System Categories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        name: 'Large Language Models',
                        systems: 89,
                        aiReady: 96,
                        status: 'active',
                        icon: Bot,
                        color: 'purple',
                        models: 89,
                        description: 'Advanced conversational AI and natural language processing'
                      },
                      {
                        name: 'Computer Vision AI',
                        systems: 67,
                        aiReady: 94,
                        status: 'active',
                        icon: Eye,
                        color: 'indigo',
                        models: 67,
                        description: 'Image recognition and visual intelligence systems'
                      }
                    ].map((system, index) => {
                      const Icon = system.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                          className={`relative p-6 rounded-xl border backdrop-blur-xl hover:scale-105 transition-all duration-300 ${system.color === 'purple' ? 'bg-gradient-to-br from-purple-500/10 to-purple-900/20 border-purple-500/30' : 'bg-gradient-to-br from-indigo-500/10 to-indigo-900/20 border-indigo-500/30'}`}
                        >
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${system.color === 'purple' ? 'bg-purple-500/20' : 'bg-indigo-500/20'}`}>
                                  <Icon className={`w-5 h-5 ${system.color === 'purple' ? 'text-purple-400' : 'text-indigo-400'}`} />
                                </div>
                                <div>
                                  <h5 className="text-white font-semibold text-sm">{system.name}</h5>
                                  <p className="text-slate-400 text-xs">{system.models} models</p>
                                </div>
                              </div>
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${system.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400 animate-pulse'}`}>
                                <div className={`w-2 h-2 rounded-full ${system.status === 'active' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`}></div>
                                <span className="capitalize">{system.status}</span>
                              </div>
                            </div>
                            <p className="text-slate-300 text-xs mb-4 leading-relaxed">{system.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 text-xs font-medium">AI Readiness</span>
                              <span className={`text-lg font-bold ${system.color === 'purple' ? 'text-purple-400' : 'text-indigo-400'}`}>{system.aiReady}%</span>
                            </div>
                            <div className="w-full bg-slate-600/50 rounded-full h-3 mt-2">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${system.aiReady}%` }} transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }} className={`h-3 rounded-full ${system.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-purple-600' : 'bg-gradient-to-r from-indigo-500 to-indigo-600'}`} />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </AIGlassCard>
            </motion.div>
          )}

          {/* Other AI sections with enhanced features */}
          {activeSection === 'ai-pattern-recognition' && (
            <motion.div key="algorithms" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <AIGlassCard title="AI Model Registry & Management" icon={Bot} status="ACTIVE">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="Search AI models..." className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-purple-500/50 focus:outline-none" />
                    </div>
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>LLMs</option>
                      <option>Computer Vision</option>
                      <option>NLP Models</option>
                      <option>Reinforcement Learning</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>High Accuracy</option>
                      <option>Fast Inference</option>
                      <option>Low Latency</option>
                      <option>Energy Efficient</option>
                    </select>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Deploy AI Model</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 'gpt4-enhanced', name: 'GPT-4 Enhanced', type: 'LLM', accuracy: '97.8%', performance: '2.1x Faster', status: 'production', deployments: 45 },
                      { id: 'bert-large', name: 'BERT Large', type: 'NLP', accuracy: '95.4%', performance: '1.8x Efficient', status: 'production', deployments: 67 },
                      { id: 'vision-transformer', name: 'Vision Transformer', type: 'Computer Vision', accuracy: '96.2%', performance: '2.3x Accurate', status: 'testing', deployments: 23 }
                    ].map((model) => (
                      <motion.div key={model.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-slate-700/50 to-slate-800/30 rounded-xl border border-slate-600/30 p-6 hover:border-purple-500/50 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">{model.name}</h3>
                            <p className="text-slate-400 text-sm">{model.type} • {model.accuracy} accuracy</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 text-xs rounded-full ${model.status === 'production' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{model.status}</span>
                              <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">AI Powered</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                            <div className="text-lg font-bold text-purple-400">{model.performance}</div>
                            <div className="text-xs text-slate-400">Performance</div>
                          </div>
                          <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                            <div className="text-lg font-bold text-indigo-400">{model.deployments}</div>
                            <div className="text-xs text-slate-400">Deployments</div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <button className="flex-1 px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded-lg transition-colors">Test</button>
                          <button className="flex-1 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors">Deploy</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AIGlassCard>
            </motion.div>
          )}

          {activeSection === 'ai-performance' && (
            <motion.div key="federated" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <AIGlassCard title="Federated Learning & AI Orchestration" icon={Network} status="SYNCHRONIZING">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl">
                      <Network className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">1,203</div>
                      <div className="text-sm text-slate-400">Federated Nodes</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
                      <Activity className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">94%</div>
                      <div className="text-sm text-slate-400">Sync Rate</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl">
                      <Clock className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">2.3s</div>
                      <div className="text-sm text-slate-400">Avg Latency</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
                      <Shield className="w-12 h-12 text-indigo-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">99.8%</div>
                      <div className="text-sm text-slate-400">Privacy Score</div>
                    </div>
                  </div>

                  {/* 🆕 ENHANCED: AI System Health Dashboard */}
                  <AIGlassCard title="AI System Health & Performance Dashboard" icon={Activity} status="MONITORING">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400 mb-1">{aiSystemHealth.cognitiveResilience}%</div>
                        <div className="text-sm text-slate-400">Cognitive Resilience</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${aiSystemHealth.cognitiveResilience}%` }} />
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-indigo-400 mb-1">{aiSystemHealth.neuralEfficiency}%</div>
                        <div className="text-sm text-slate-400">Neural Efficiency</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-indigo-500 h-2 rounded-full" style={{ width: `${aiSystemHealth.neuralEfficiency}%` }} />
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-400 mb-1">{aiSystemHealth.intelligenceAccuracy}%</div>
                        <div className="text-sm text-slate-400">Intelligence Accuracy</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${aiSystemHealth.intelligenceAccuracy}%` }} />
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-orange-400 mb-1">{aiSystemHealth.responseTime}s</div>
                        <div className="text-sm text-slate-400">Response Time</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  </AIGlassCard>

                  {/* Federated Learning Jobs */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Active Federated Learning Rounds</h4>
                    {[
                      { id: 'FL-001', name: 'Global Threat Model Training', nodes: 456, progress: 78, eta: '12.4 minutes', status: 'training' },
                      { id: 'FL-002', name: 'Anomaly Detection Model Update', nodes: 234, progress: 45, eta: '8.7 minutes', status: 'aggregating' },
                      { id: 'FL-003', name: 'Pattern Recognition Enhancement', nodes: 89, progress: 0, eta: 'Pending', status: 'queued' }
                    ].map((round) => (
                      <motion.div key={round.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1">
                            <h5 className="text-white font-semibold text-lg">{round.name}</h5>
                            <p className="text-slate-400">{round.nodes} federated nodes • {round.status}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-purple-400 font-bold">{round.progress}%</div>
                            <div className="text-xs text-slate-400">Progress</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3 mb-4">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${round.progress}%` }} transition={{ duration: 1 }} className={`h-3 rounded-full ${round.status === 'training' ? 'bg-gradient-to-r from-purple-500 to-indigo-500' : 'bg-yellow-500'}`} />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-slate-400">Round ID: {round.id} • ETA: {round.eta}</div>
                          <div className="flex space-x-2">
                            {round.status === 'training' && <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">Pause</button>}
                            <button className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded transition-colors">Monitor</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AIGlassCard>
            </motion.div>
          )}

          {activeSection === 'ai-reports' && (
            <motion.div key="controls" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <AIGlassCard title="AI Governance & Ethics Controls" icon={Shield} status="COMPLIANT">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">AI Ethics Controls</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Bias Detection Active</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Explainability Required</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Human Oversight</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">AI Security Thresholds</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Model Confidence</span>
                          <span className="text-purple-400 font-bold">95%</span>
                        </div>
                        <select defaultValue="95" className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white">
                          <option>90%</option>
                          <option>95%</option>
                          <option>98%</option>
                          <option>99%</option>
                        </select>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Response Threshold</span>
                          <span className="text-indigo-400 font-bold">85%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="h-2 bg-indigo-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AIGlassCard>

              {/* 🆕 ENHANCED: AI Performance Analytics */}
              <AIGlassCard title="AI Performance Analytics & Insights" icon={BarChart3} status="ANALYZING">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-purple-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">96.7%</div>
                      <div className="text-sm text-slate-400">AI Model Success</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
                      <Lightning className="w-8 h-8 text-indigo-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">2.4x</div>
                      <div className="text-sm text-slate-400">Inference Speed</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl">
                      <Eye className="w-8 h-8 text-purple-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">3.1%</div>
                      <div className="text-sm text-slate-400">False Positives</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl">
                      <Shield className="w-8 h-8 text-indigo-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">99.7%</div>
                      <div className="text-sm text-slate-400">AI Ethics Score</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-700/30 rounded-xl border border-purple-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Processor className="w-5 h-5 text-purple-400" />
                        <span>AI Model Performance Matrix</span>
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div className="text-center">
                          <div className="text-purple-400 font-bold">GPT-4</div>
                          <div className="text-slate-400">LLM</div>
                        </div>
                        <div className="text-center">
                          <div className="text-indigo-400 font-bold">BERT</div>
                          <div className="text-slate-400">NLP</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 font-bold">Vision</div>
                          <div className="text-slate-400">CV</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Accuracy:</span>
                          <div className="flex space-x-2">
                            <span className="text-green-400 font-bold">97.8%</span>
                            <span className="text-green-400 font-bold">95.4%</span>
                            <span className="text-green-400 font-bold">96.2%</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Performance:</span>
                          <div className="flex space-x-2">
                            <span className="text-purple-400 font-bold">2.1x</span>
                            <span className="text-indigo-400 font-bold">1.8x</span>
                            <span className="text-green-400 font-bold">2.3x</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Efficiency:</span>
                          <div className="flex space-x-2">
                            <span className="text-purple-400 font-bold">High</span>
                            <span className="text-indigo-400 font-bold">High</span>
                            <span className="text-green-400 font-bold">Medium</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-700/30 rounded-xl border border-purple-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-indigo-400" />
                        <span>AI Resource Utilization</span>
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">GPU Utilization</span>
                            <span className="text-purple-400 font-bold">87%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-purple-500 h-2 rounded-full" style={{ width: '87%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Memory Usage</span>
                            <span className="text-indigo-400 font-bold">92%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '92%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Network I/O</span>
                            <span className="text-green-400 font-bold">65%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Storage Access</span>
                            <span className="text-orange-400 font-bold">43%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '43%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </AIGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntelligenceFusion;
