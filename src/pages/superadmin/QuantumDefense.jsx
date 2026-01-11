import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  Shield,
  AlertTriangle,
  Activity,
  RefreshCw,
  Lock,
  Atom,
  Zap,
  Brain,
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
  Network,
  FileText,
  Key,
  Fingerprint,
  Scan,
  Search,
  Plus,
  Edit3,
  Download,
  Copy,
  Radio,
  Gauge,
  Database,
  Mail,
  Cloud,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';

// 🧬 QUANTUM DEFENSE CENTER - SUPER ADMIN ONLY
// ADVANCED QUANTUM-RESISTANT SECURITY & AI THREAT INTELLIGENCE
// COMPREHENSIVE PQ CRYPTO MANAGEMENT - QUANTUM DEFENSE PLATFORM

const QuantumDefense = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-900 via-teal-800 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-20"
        >
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Quantum Defense Center. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-cyan-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔄 STATE MANAGEMENT
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('quantum-analysis');
  const [selectedQuantumModel, setSelectedQuantumModel] = useState(null);
  const [quantumData, setQuantumData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [quantumAssessments, setQuantumAssessments] = useState([]);
  const [mitigationActions, setMitigationActions] = useState([]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 🆕 ENHANCED FEATURES STATE
  const [threatFeed, setThreatFeed] = useState([
    { id: 1, type: 'quantum-breakthrough', severity: 'critical', title: 'Shor Algorithm Optimization', message: 'New quantum factoring breakthrough detected', timestamp: new Date(), source: 'NIST Research' },
    { id: 2, type: 'vulnerability', severity: 'high', title: 'PQ Algorithm Weakness', message: 'Potential weakness in Dilithium-3 implementation', timestamp: new Date(Date.now() - 300000), source: 'Security Audit' },
    { id: 3, type: 'intelligence', severity: 'medium', title: 'Quantum Attack Vector', message: 'New hybrid quantum-classical attack pattern', timestamp: new Date(Date.now() - 600000), source: 'Threat Intel' },
    { id: 4, type: 'update', severity: 'low', title: 'Algorithm Performance', message: 'Kyber-1024 performance improved by 15%', timestamp: new Date(Date.now() - 900000), source: 'System Monitor' }
  ]);
  const [algorithmTest, setAlgorithmTest] = useState({
    isRunning: false,
    currentAlgorithm: 'Kyber-1024',
    progress: 0,
    results: null,
    testType: 'performance'
  });
  const [systemHealth, setSystemHealth] = useState({
    quantumResilience: 99.4,
    algorithmEfficiency: 96.7,
    threatDetection: 94.2,
    responseTime: 0.023
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

  // 🧬 QUANTUM GLASS CARD COMPONENT - CYAN THEME
  const QuantumGlassCard = ({ children, title, icon: Icon, status, quantumLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(6,182,212,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(6,182,212,0.6)] text-cyan-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {quantumLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${
                quantumLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                quantumLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                quantumLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' :
                'bg-green-500/20 text-green-400 border-green-500/40'
              }`}>
                {quantumLevel}
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

  // 📊 MAIN QUANTUM DEFENSE CENTER INTERFACE - CYAN THEME
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-900 via-teal-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Enhanced Background Effects - Neural Style */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/40 to-teal-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-teal-600/35 to-cyan-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-cyan-400/30 to-teal-400/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-teal-500/25 to-cyan-500/25 rounded-full blur-2xl"></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header - CYAN THEME */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-teal-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <Atom className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-teal-300 via-cyan-200 to-teal-200 bg-clip-text text-transparent drop-shadow-sm">
                Quantum AI Defense Center
              </h1>
              <p className="text-cyan-200/80 text-sm font-medium">Advanced Quantum-Resistant Security & AI Threat Intelligence Platform</p>

              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">Quantum Systems Active</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-teal-400 animate-pulse" />
                  <span className="text-xs text-slate-300">PQ Algorithms Running</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs text-slate-300">Quantum Threats Monitored</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                  <span className="text-xs text-slate-300">LIVE</span>
                </div>
                <div className="text-xs text-slate-400">|</div>
                <div className="text-xs text-slate-300">
                  Systems: <span className="text-green-400">892</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-cyan-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Quantum Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Quantum Intelligence Command Center Tabs - Exact Neural Threat Intelligence Structure */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'quantum-analysis', label: 'Quantum Analysis', icon: Atom },
            { id: 'quantum-threat-detection', label: 'Quantum Threat Detection', icon: Target },
            { id: 'quantum-pattern-recognition', label: 'Quantum Pattern Recognition', icon: Network },
            { id: 'quantum-performance', label: 'Quantum Performance', icon: Gauge },
            { id: 'quantum-reports', label: 'Quantum Reports', icon: FileText }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-teal-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
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
          {activeSection === 'quantum-analysis' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quantum Control Center Metrics Dashboard - CYAN THEME */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <QuantumGlassCard title="Overall Quantum Readiness" icon={Atom} quantumLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">67%</div>
                    <div className="text-sm text-slate-400">Enterprise Protection</div>
                    <div className="text-xs text-green-400 mt-2">+5.2% from last month</div>
                  </div>
                </QuantumGlassCard>

                <QuantumGlassCard title="PQ Algorithms Active" icon={Brain} quantumLevel="MEDIUM">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-400 mb-2">12</div>
                    <div className="text-sm text-slate-400">Cryptographic Systems</div>
                    <div className="text-xs text-blue-400 mt-2">Kyber, Dilithium, Falcon</div>
                  </div>
                </QuantumGlassCard>

                <QuantumGlassCard title="Migration Progress" icon={TrendingUp} quantumLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">71%</div>
                    <div className="text-sm text-slate-400">Systems Updated</div>
                    <div className="text-xs text-green-400 mt-2">892/1247 completed</div>
                  </div>
                </QuantumGlassCard>

                <QuantumGlassCard title="Quantum Resistance" icon={Shield} quantumLevel="HIGH">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-teal-400 mb-2">99.4%</div>
                    <div className="text-sm text-slate-400">Algorithm Strength</div>
                    <div className="text-xs text-cyan-400 mt-2">Verified protection</div>
                  </div>
                </QuantumGlassCard>
              </div>

              {/* 🆕 ENHANCED: Real-time Quantum Threat Intelligence Feed */}
              <QuantumGlassCard title="Real-time Quantum Threat Intelligence Feed" icon={Radio} status="ACTIVE">
                <div className="space-y-4">
                  {/* Live Feed Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span className="text-white font-semibold">Live Intelligence Stream</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-400">Last updated:</span>
                      <span className="text-cyan-400 font-mono text-xs">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </div>

                  {/* Threat Intelligence Feed */}
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {threatFeed.map((threat) => (
                      <motion.div
                        key={threat.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-4 rounded-lg border backdrop-blur-sm ${
                          threat.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                          threat.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                          threat.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-green-500/10 border-green-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              threat.severity === 'critical' ? 'bg-red-400 animate-pulse' :
                              threat.severity === 'high' ? 'bg-orange-400' :
                              threat.severity === 'medium' ? 'bg-yellow-400' :
                              'bg-green-400'
                            }`}></div>
                            <div>
                              <div className="text-white font-medium text-sm">{threat.title}</div>
                              <div className="text-slate-400 text-xs">{threat.message}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${
                              threat.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                              threat.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                              threat.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {threat.severity.toUpperCase()}
                            </span>
                            <div className="text-slate-400 text-xs mt-1">{threat.source}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Actions */}
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Search className="w-4 h-4" />
                      <span>Investigate</span>
                    </button>
                    <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Export Feed</span>
                    </button>
                    <button className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors flex items-center space-x-2">
                      <Settings className="w-4 h-4" />
                      <span>Configure Alerts</span>
                    </button>
                  </div>
                </div>
              </QuantumGlassCard>

              {/* Quantum Readiness Categories Overview - CYAN THEME */}
              <QuantumGlassCard title="Quantum Defense Categories Overview" icon={Network} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    {
                      id: 'systems',
                      name: 'Quantum Systems',
                      icon: Server,
                      level: 'HIGH',
                      score: 67,
                      trend: 'increasing',
                      description: 'PQ infrastructure management',
                      mitigation: 'System monitoring & updates',
                      color: 'cyan'
                    },
                    {
                      id: 'algorithms',
                      name: 'Algorithm Registry',
                      icon: Brain,
                      level: 'HIGH',
                      score: 89,
                      trend: 'stable',
                      description: 'NIST-approved PQ algorithms',
                      mitigation: 'Algorithm deployment & testing',
                      color: 'teal'
                    },
                    {
                      id: 'migration',
                      name: 'Migration Pipeline',
                      icon: TrendingUp,
                      level: 'MEDIUM',
                      score: 71,
                      trend: 'increasing',
                      description: 'Post-quantum migration orchestration',
                      mitigation: 'Automated deployment & rollback',
                      color: 'orange'
                    },
                    {
                      id: 'controls',
                      name: 'Defense Controls',
                      icon: Shield,
                      level: 'HIGH',
                      score: 96,
                      trend: 'stable',
                      description: 'Quantum threat mitigation',
                      mitigation: 'Real-time response systems',
                      color: 'green'
                    },
                    {
                      id: 'performance',
                      name: 'Quantum Performance',
                      icon: BarChart3,
                      level: 'HIGH',
                      score: 94,
                      trend: 'increasing',
                      description: 'Algorithm performance monitoring',
                      mitigation: 'Continuous optimization',
                      color: 'blue'
                    }
                  ].map((category) => {
                    const Icon = category.icon;
                    return (
                      <motion.div
                        key={category.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          category.id === 'systems'
                            ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                        }`}
                        onClick={() => setActiveSection(category.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${category.color}-400 drop-shadow-[0_0_6px_rgba(6,182,212,0.4)]`} />
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
              </QuantumGlassCard>
            </motion.div>
          )}

          {activeSection === 'quantum-threat-detection' && (
            <motion.div
              key="systems"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Quantum Systems Management Engine */}
              <QuantumGlassCard title="Quantum Systems Management Engine" icon={Server} status="PROCESSING">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <Server className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-cyan-400 mb-1">892</div>
                    <div className="text-sm text-slate-400">Systems Protected</div>
                  </div>
                  <div className="text-center p-6 bg-teal-500/10 border border-teal-500/30 rounded-lg">
                    <Brain className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-teal-400 mb-1">12</div>
                    <div className="text-sm text-slate-400">PQ Algorithms</div>
                  </div>
                  <div className="text-center p-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-cyan-400 mb-1">99.4%</div>
                    <div className="text-sm text-slate-400">Quantum Resistance</div>
                  </div>
                </div>

                {/* 🆕 ENHANCED: Algorithm Testing Suite */}
                <QuantumGlassCard title="Interactive Algorithm Testing Suite" icon={Zap} status={algorithmTest.isRunning ? "TESTING" : "READY"}>
                  <div className="space-y-6">
                    {/* Test Configuration */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Select Algorithm</label>
                        <select
                          value={algorithmTest.currentAlgorithm}
                          onChange={(e) => setAlgorithmTest(prev => ({ ...prev, currentAlgorithm: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          <option>Kyber-1024</option>
                          <option>Dilithium-5</option>
                          <option>Falcon-1024</option>
                          <option>SPHINCS+-256f</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm text-slate-400 mb-2">Test Type</label>
                        <select
                          value={algorithmTest.testType}
                          onChange={(e) => setAlgorithmTest(prev => ({ ...prev, testType: e.target.value }))}
                          className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white"
                        >
                          <option value="performance">Performance Test</option>
                          <option value="security">Security Analysis</option>
                          <option value="compatibility">Compatibility Check</option>
                          <option value="stress">Stress Test</option>
                        </select>
                      </div>
                      <div className="flex items-end">
                        {!algorithmTest.isRunning ? (
                          <button
                            onClick={() => setAlgorithmTest(prev => ({ ...prev, isRunning: true, progress: 0 }))}
                            className="w-full px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Play className="w-4 h-4" />
                            <span>Start Test</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => setAlgorithmTest(prev => ({ ...prev, isRunning: false, progress: 100 }))}
                            className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                          >
                            <Pause className="w-4 h-4" />
                            <span>Stop Test</span>
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Test Progress */}
                    {algorithmTest.isRunning && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-slate-700/30 rounded-xl border border-cyan-500/30"
                      >
                        <div className="text-center mb-4">
                          <div className="text-2xl font-bold text-cyan-400 mb-2">{algorithmTest.progress}%</div>
                          <div className="text-sm text-slate-400">Test Completion</div>
                          <div className="text-xs text-cyan-400 mt-1">Testing {algorithmTest.currentAlgorithm}</div>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-4 mb-4">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${algorithmTest.progress}%` }}
                            className="h-4 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-cyan-400 font-bold">2.3s</div>
                            <div className="text-slate-400">Current Test Time</div>
                          </div>
                          <div className="text-center">
                            <div className="text-teal-400 font-bold">98.7%</div>
                            <div className="text-slate-400">Success Rate</div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Test Results */}
                    {algorithmTest.progress === 100 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl border border-cyan-500/30"
                      >
                        <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span>Test Results - {algorithmTest.currentAlgorithm}</span>
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-cyan-400 mb-1">PASS</div>
                            <div className="text-sm text-slate-400">Overall Result</div>
                            <div className="text-xs text-green-400">Quantum Resistant</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-teal-400 mb-1">4.2s</div>
                            <div className="text-sm text-slate-400">Total Test Time</div>
                            <div className="text-xs text-blue-400">Performance</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-green-400 mb-1">99.8%</div>
                            <div className="text-sm text-slate-400">Confidence Level</div>
                            <div className="text-xs text-green-400">High Assurance</div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </QuantumGlassCard>

                {/* Quantum System Categories */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h4 className="text-white font-semibold text-lg">Quantum System Categories</h4>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-400 animate-pulse"></div>
                      <span className="text-xs text-slate-400">Systems Active</span>
                    </div>
                  </div>

                  {/* System Categories Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        name: 'Web Servers',
                        systems: 156,
                        pqReady: 98,
                        status: 'active',
                        icon: Server,
                        color: 'cyan',
                        deployments: 156,
                        description: 'High-performance web infrastructure with PQ encryption'
                      },
                      {
                        name: 'Database Systems',
                        systems: 89,
                        pqReady: 96,
                        status: 'active',
                        icon: Database,
                        color: 'teal',
                        deployments: 89,
                        description: 'Enterprise databases with quantum-safe data protection'
                      }
                    ].map((system, index) => {
                      const Icon = system.icon;
                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, scale: 0.95, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ delay: index * 0.15, duration: 0.5 }}
                          className={`relative p-6 rounded-xl border backdrop-blur-xl hover:scale-105 transition-all duration-300 ${system.color === 'cyan' ? 'bg-gradient-to-br from-cyan-500/10 to-cyan-900/20 border-cyan-500/30' : 'bg-gradient-to-br from-teal-500/10 to-teal-900/20 border-teal-500/30'}`}
                        >
                          <div className="relative z-10">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center space-x-3">
                                <div className={`p-2 rounded-lg ${system.color === 'cyan' ? 'bg-cyan-500/20' : 'bg-teal-500/20'}`}>
                                  <Icon className={`w-5 h-5 ${system.color === 'cyan' ? 'text-cyan-400' : 'text-teal-400'}`} />
                                </div>
                                <div>
                                  <h5 className="text-white font-semibold text-sm">{system.name}</h5>
                                  <p className="text-slate-400 text-xs">{system.deployments} systems</p>
                                </div>
                              </div>
                              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${system.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400 animate-pulse'}`}>
                                <div className={`w-2 h-2 rounded-full ${system.status === 'active' ? 'bg-green-400' : 'bg-yellow-400 animate-pulse'}`}></div>
                                <span className="capitalize">{system.status}</span>
                              </div>
                            </div>
                            <p className="text-slate-300 text-xs mb-4 leading-relaxed">{system.description}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-slate-400 text-xs font-medium">PQ Readiness</span>
                              <span className={`text-lg font-bold ${system.color === 'cyan' ? 'text-cyan-400' : 'text-teal-400'}`}>{system.pqReady}%</span>
                            </div>
                            <div className="w-full bg-slate-600/50 rounded-full h-3 mt-2">
                              <motion.div initial={{ width: 0 }} animate={{ width: `${system.pqReady}%` }} transition={{ delay: index * 0.2, duration: 1.5, ease: "easeOut" }} className={`h-3 rounded-full ${system.color === 'cyan' ? 'bg-gradient-to-r from-cyan-500 to-cyan-600' : 'bg-gradient-to-r from-teal-500 to-teal-600'}`} />
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </QuantumGlassCard>
            </motion.div>
          )}

          {/* Other sections remain the same but with enhanced features */}
          {activeSection === 'quantum-pattern-recognition' && (
            <motion.div key="algorithms" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <QuantumGlassCard title="Quantum Algorithm Registry" icon={Brain} status="ACTIVE">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                      <input type="text" placeholder="Search algorithms..." className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:border-cyan-500/50 focus:outline-none" />
                    </div>
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>KEM (Key Encapsulation)</option>
                      <option>Digital Signatures</option>
                      <option>Hybrid Schemes</option>
                    </select>
                    <select className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white">
                      <option>256-bit Security</option>
                      <option>192-bit Security</option>
                      <option>128-bit Security</option>
                    </select>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white rounded-lg transition-all duration-300 flex items-center space-x-2">
                      <Plus className="w-4 h-4" />
                      <span>Register Algorithm</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { id: 'kyber-1024', name: 'Kyber-1024', type: 'KEM', security: '256-bit', performance: '1.2x Classical', status: 'production', deployments: 156 },
                      { id: 'dilithium-5', name: 'Dilithium-5', type: 'Signature', security: '256-bit', performance: '0.9x Classical', status: 'production', deployments: 203 },
                      { id: 'falcon-1024', name: 'Falcon-1024', type: 'Signature', security: '256-bit', performance: '0.8x Classical', status: 'testing', deployments: 12 }
                    ].map((algorithm) => (
                      <motion.div key={algorithm.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-slate-700/50 to-slate-800/30 rounded-xl border border-slate-600/30 p-6 hover:border-cyan-500/50 transition-all duration-300">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <h3 className="text-white font-semibold text-lg">{algorithm.name}</h3>
                            <p className="text-slate-400 text-sm">{algorithm.type} • {algorithm.security}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <span className={`px-2 py-1 text-xs rounded-full ${algorithm.status === 'production' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>{algorithm.status}</span>
                              <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full">NIST Approved</span>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                            <div className="text-lg font-bold text-cyan-400">{algorithm.performance}</div>
                            <div className="text-xs text-slate-400">Performance</div>
                          </div>
                          <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                            <div className="text-lg font-bold text-teal-400">{algorithm.deployments}</div>
                            <div className="text-xs text-slate-400">Deployments</div>
                          </div>
                        </div>
                        <div className="flex space-x-2 mt-4">
                          <button className="flex-1 px-3 py-2 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded-lg transition-colors">Test</button>
                          <button className="flex-1 px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white text-sm rounded-lg transition-colors">Deploy</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </QuantumGlassCard>
            </motion.div>
          )}

          {activeSection === 'quantum-performance' && (
            <motion.div key="migration" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <QuantumGlassCard title="Post-Quantum Migration Pipeline" icon={TrendingUp} status="ACTIVE">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
                      <CheckCircle className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">95%</div>
                      <div className="text-sm text-slate-400">Phase 1 Complete</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                      <Activity className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">67%</div>
                      <div className="text-sm text-slate-400">Phase 2 Progress</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
                      <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">23%</div>
                      <div className="text-sm text-slate-400">Phase 3 Planning</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                      <Server className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">892</div>
                      <div className="text-sm text-slate-400">Systems Migrated</div>
                    </div>
                  </div>

                  {/* 🆕 ENHANCED: System Health Dashboard */}
                  <QuantumGlassCard title="Quantum System Health Dashboard" icon={Activity} status="MONITORING">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-cyan-400 mb-1">{systemHealth.quantumResilience}%</div>
                        <div className="text-sm text-slate-400">Quantum Resilience</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-cyan-500 h-2 rounded-full" style={{ width: `${systemHealth.quantumResilience}%` }} />
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-teal-400 mb-1">{systemHealth.algorithmEfficiency}%</div>
                        <div className="text-sm text-slate-400">Algorithm Efficiency</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-teal-500 h-2 rounded-full" style={{ width: `${systemHealth.algorithmEfficiency}%` }} />
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-green-400 mb-1">{systemHealth.threatDetection}%</div>
                        <div className="text-sm text-slate-400">Threat Detection</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: `${systemHealth.threatDetection}%` }} />
                        </div>
                      </div>
                      <div className="text-center p-4 bg-slate-700/30 rounded-lg">
                        <div className="text-2xl font-bold text-orange-400 mb-1">{systemHealth.responseTime}s</div>
                        <div className="text-sm text-slate-400">Avg Response Time</div>
                        <div className="w-full bg-slate-600 rounded-full h-2 mt-2">
                          <div className="bg-orange-500 h-2 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  </QuantumGlassCard>

                  {/* Migration Jobs */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold">Active Migration Jobs</h4>
                    {[
                      { id: 'MIG-001', name: 'Web Server Migration Phase 2', systems: 45, progress: 67, eta: '4.2 hours', status: 'running' },
                      { id: 'MIG-002', name: 'Database Encryption Upgrade', systems: 23, progress: 43, eta: '6.8 hours', status: 'running' },
                      { id: 'MIG-003', name: 'API Gateway PQ Implementation', systems: 12, progress: 0, eta: 'Pending', status: 'queued' }
                    ].map((job) => (
                      <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex-1">
                            <h5 className="text-white font-semibold text-lg">{job.name}</h5>
                            <p className="text-slate-400">{job.systems} systems • {job.status}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-cyan-400 font-bold">{job.progress}%</div>
                            <div className="text-xs text-slate-400">Progress</div>
                          </div>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3 mb-4">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${job.progress}%` }} transition={{ duration: 1 }} className={`h-3 rounded-full ${job.status === 'running' ? 'bg-gradient-to-r from-cyan-500 to-teal-500' : 'bg-yellow-500'}`} />
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-slate-400">Job ID: {job.id} • ETA: {job.eta}</div>
                          <div className="flex space-x-2">
                            {job.status === 'running' && <button className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">Stop</button>}
                            <button className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 text-white text-sm rounded transition-colors">View Logs</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </QuantumGlassCard>
            </motion.div>
          )}

          {activeSection === 'quantum-reports' && (
            <motion.div key="controls" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <QuantumGlassCard title="Quantum Defense Controls" icon={Shield} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">Threat Response Controls</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Auto-Response Enabled</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Emergency Override</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-gray-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Human Verification</span>
                        <button className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors bg-green-600">
                          <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">Security Thresholds</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Quantum Threat Level</span>
                          <span className="text-orange-400 font-bold">HIGH</span>
                        </div>
                        <select defaultValue="HIGH" className="w-full px-3 py-2 bg-slate-600 border border-slate-500 rounded-lg text-white">
                          <option>LOW</option>
                          <option>MEDIUM</option>
                          <option>HIGH</option>
                          <option>CRITICAL</option>
                        </select>
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-slate-400">Response Sensitivity</span>
                          <span className="text-cyan-400 font-bold">85%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-2">
                          <div className="h-2 bg-cyan-500 rounded-full" style={{ width: '85%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </QuantumGlassCard>

              {/* 🆕 ENHANCED: Quantum Security Analytics */}
              <QuantumGlassCard title="Quantum Security Analytics" icon={BarChart3} status="ANALYZING">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">96.7%</div>
                      <div className="text-sm text-slate-400">PQ Algorithm Success</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                      <Zap className="w-8 h-8 text-teal-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">1.8x</div>
                      <div className="text-sm text-slate-400">Performance Ratio</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
                      <AlertTriangle className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">3.2%</div>
                      <div className="text-sm text-slate-400">False Positives</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                      <Shield className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">99.4%</div>
                      <div className="text-sm text-slate-400">Quantum Resistance</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-700/30 rounded-xl border border-cyan-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Calculator className="w-5 h-5 text-cyan-400" />
                        <span>Algorithm Performance Matrix</span>
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                        <div className="text-center">
                          <div className="text-cyan-400 font-bold">Kyber</div>
                          <div className="text-slate-400">KEM</div>
                        </div>
                        <div className="text-center">
                          <div className="text-teal-400 font-bold">Dilithium</div>
                          <div className="text-slate-400">Signature</div>
                        </div>
                        <div className="text-center">
                          <div className="text-green-400 font-bold">Falcon</div>
                          <div className="text-slate-400">Signature</div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Security Level:</span>
                          <div className="flex space-x-2">
                            <span className="text-green-400 font-bold">256</span>
                            <span className="text-green-400 font-bold">256</span>
                            <span className="text-green-400 font-bold">256</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Performance:</span>
                          <div className="flex space-x-2">
                            <span className="text-cyan-400 font-bold">98.7%</span>
                            <span className="text-teal-400 font-bold">96.2%</span>
                            <span className="text-green-400 font-bold">94.8%</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400 text-sm">Compatibility:</span>
                          <div className="flex space-x-2">
                            <span className="text-cyan-400 font-bold">High</span>
                            <span className="text-teal-400 font-bold">High</span>
                            <span className="text-green-400 font-bold">Medium</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-700/30 rounded-xl border border-cyan-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-teal-400" />
                        <span>Resource Utilization Trends</span>
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">CPU Usage</span>
                            <span className="text-cyan-400 font-bold">67%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '67%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Memory Usage</span>
                            <span className="text-teal-400 font-bold">84%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '84%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Network I/O</span>
                            <span className="text-green-400 font-bold">45%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Storage I/O</span>
                            <span className="text-orange-400 font-bold">32%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '32%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </QuantumGlassCard>
            </motion.div>
          )}

          {activeSection === 'performance' && (
            <motion.div key="performance" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <QuantumGlassCard title="Quantum Performance Analytics & Insights" icon={BarChart3} status="ANALYZING">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
                      <CheckCircle className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">96.7%</div>
                      <div className="text-sm text-slate-400">PQ Algorithm Success</div>
                      <div className="text-xs text-green-400">+2.1% from last month</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                      <Zap className="w-8 h-8 text-teal-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">1.8x</div>
                      <div className="text-sm text-slate-400">Performance Ratio</div>
                      <div className="text-xs text-green-400">vs Classical crypto</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-teal-500/20 rounded-xl">
                      <AlertTriangle className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">3.2%</div>
                      <div className="text-sm text-slate-400">False Positives</div>
                      <div className="text-xs text-green-400">-0.8% reduction</div>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                      <Shield className="w-8 h-8 text-cyan-400 mb-3" />
                      <div className="text-2xl font-bold text-white mb-1">99.4%</div>
                      <div className="text-sm text-slate-400">Quantum Resistance</div>
                      <div className="text-xs text-green-400">Verified</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="p-6 bg-slate-700/30 rounded-xl border border-cyan-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Calculator className="w-5 h-5 text-cyan-400" />
                        <span>Algorithm Performance Matrix</span>
                      </h4>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="text-center">
                            <div className="text-cyan-400 font-bold">Kyber</div>
                            <div className="text-slate-400">KEM</div>
                          </div>
                          <div className="text-center">
                            <div className="text-teal-400 font-bold">Dilithium</div>
                            <div className="text-slate-400">Signature</div>
                          </div>
                          <div className="text-center">
                            <div className="text-green-400 font-bold">Falcon</div>
                            <div className="text-slate-400">Signature</div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Security Level:</span>
                            <div className="flex space-x-2">
                              <span className="text-green-400 font-bold">256</span>
                              <span className="text-green-400 font-bold">256</span>
                              <span className="text-green-400 font-bold">256</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Performance:</span>
                            <div className="flex space-x-2">
                              <span className="text-cyan-400 font-bold">98.7%</span>
                              <span className="text-teal-400 font-bold">96.2%</span>
                              <span className="text-green-400 font-bold">94.8%</span>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-slate-400 text-sm">Compatibility:</span>
                            <div className="flex space-x-2">
                              <span className="text-cyan-400 font-bold">High</span>
                              <span className="text-teal-400 font-bold">High</span>
                              <span className="text-green-400 font-bold">Medium</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-slate-700/30 rounded-xl border border-cyan-500/30">
                      <h4 className="text-white font-semibold mb-4 flex items-center space-x-2">
                        <Activity className="w-5 h-5 text-teal-400" />
                        <span>Resource Utilization Trends</span>
                      </h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">CPU Usage</span>
                            <span className="text-cyan-400 font-bold">67%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '67%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Memory Usage</span>
                            <span className="text-teal-400 font-bold">84%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-teal-500 h-2 rounded-full" style={{ width: '84%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Network I/O</span>
                            <span className="text-green-400 font-bold">45%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-slate-400 text-sm">Storage I/O</span>
                            <span className="text-orange-400 font-bold">32%</span>
                          </div>
                          <div className="w-full bg-slate-600 rounded-full h-2">
                            <div className="bg-orange-500 h-2 rounded-full" style={{ width: '32%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </QuantumGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default QuantumDefense;
