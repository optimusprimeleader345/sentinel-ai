import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Activity,
  AlertTriangle,
  TrendingUp,
  Cpu,
  MemoryStick,
  Network,
  HardDrive,
  Zap,
  Eye,
  Settings,
  Users,
  Globe,
  BarChart3,
  Clock,
  Lightbulb,
  Target,
  AlertCircle
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  RadialBarChart,
  RadialBar,
  Legend,
  ScatterChart,
  Scatter
} from 'recharts';

// Mock data for admin dashboard
const threatTrendData = [
  { time: '00:00', threats: 2, criticalAlerts: 0 },
  { time: '04:00', threats: 5, criticalAlerts: 1 },
  { time: '08:00', threats: 12, criticalAlerts: 2 },
  { time: '12:00', threats: 8, criticalAlerts: 1 },
  { time: '16:00', threats: 15, criticalAlerts: 3 },
  { time: '20:00', threats: 7, criticalAlerts: 1 },
  { time: 'Now', threats: 9, criticalAlerts: 2 },
];

const attackVectorsData = [
  { name: 'Malware', value: 35, color: '#ef4444' },
  { name: 'Phishing', value: 28, color: '#f59e0b' },
  { name: 'DDoS', value: 18, color: '#3b82f6' },
  { name: 'Ransomware', value: 12, color: '#8b5cf6' },
  { name: 'Zero Day', value: 7, color: '#06b6d4' },
];

const predictionData = [
  { type: 'Phishing Campaign', likelihood: 85, timeframe: '24h', confidence: 'High' },
  { type: 'Ransomware Attack', likelihood: 72, timeframe: '48h', confidence: 'Medium' },
  { type: 'Insider Threat', likelihood: 63, timeframe: '72h', confidence: 'Medium' },
  { type: 'Supply Chain Compromise', likelihood: 45, timeframe: '7d', confidence: 'Low' },
];

const systemHealthData = [
  { metric: 'CPU Usage', value: 68, maxValue: 100, color: '#ef4444' },
  { metric: 'Memory', value: 74, maxValue: 100, color: '#3b82f6' },
  { metric: 'Network I/O', value: 42, maxValue: 100, color: '#06b6d4' },
  { metric: 'Storage', value: 85, maxValue: 100, color: '#f59e0b' },
];

const aiInsights = [
  {
    title: "Automated Response Activated",
    description: "Successfully mitigated potential ransomware attack targeting HR systems",
    time: "2 hours ago",
    type: "success"
  },
  {
    title: "New Threat Pattern Detected",
    description: "AI clustered 5 similar phishing attempts with 94% similarity confidence",
    time: "4 hours ago",
    type: "warning"
  },
  {
    title: "System Optimization Applied",
    description: "Reallocated 30% more resources to high-traffic endpoints based on usage patterns",
    time: "6 hours ago",
    type: "info"
  },
];

const GlassCard = ({ children, className = "", title, icon: Icon }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl">
      {(title || Icon) && (
        <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-700/50">
          {Icon && <Icon className="w-6 h-6 text-cyan-400" />}
          {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
        </div>
      )}
      {children}
    </div>
  </div>
);

const AISummaryCard = ({ insight }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-4 rounded-lg border-l-4 ${
      insight.type === 'success' ? 'border-l-green-500 bg-green-500/10'
      : insight.type === 'warning' ? 'border-l-yellow-500 bg-yellow-500/10'
      : 'border-l-blue-500 bg-blue-500/10'
    }`}
  >
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
        <p className="text-slate-300 text-sm">{insight.description}</p>
      </div>
      <span className="text-xs text-slate-500">{insight.time}</span>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [realTimeData, setRealTimeData] = useState({
    activeThreats: 9,
    riskScore: 68,
    uptime: '99.8%',
    aiactions: 12
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        activeThreats: Math.max(0, prev.activeThreats + Math.floor(Math.random() * 6 - 3)),
        riskScore: Math.min(100, prev.riskScore + Math.floor(Math.random() * 10 - 5)),
        uptime: '99.8%', // Would be calculated from real data
        aiactions: prev.aiactions + Math.floor(Math.random() * 2)
      }));
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0b1129] to-[#0a0e27] p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              SentinelAI Admin Center
            </h1>
            <p className="text-slate-400 text-sm">Advanced Enterprise Security Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Live Status Indicators */}
          <div className="flex items-center space-x-6">
            <motion.div
              animate={{ scale: realTimeData.activeThreats > 10 ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 0.5, repeat: realTimeData.activeThreats > 10 ? Infinity : 0 }}
              className="flex items-center space-x-2 px-3 py-2 bg-red-500/10 rounded-lg border border-red-500/30"
            >
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm font-semibold text-white">{realTimeData.activeThreats}</span>
              <span className="text-xs text-slate-400">Active Threats</span>
            </motion.div>
            <div className="flex items-center space-x-2 px-3 py-2 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-white">{realTimeData.riskScore}%</span>
              <span className="text-xs text-slate-400">Risk Score</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">

        {/* Threat Analytics Overview - Large Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-3"
        >
          <GlassCard title="AI-Powered SOC Analytics" icon={Activity}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

              {/* Threat Timeline */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Threat Activity (24h)</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <AreaChart data={threatTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1e293b',
                        border: '1px solid #475569',
                        borderRadius: '6px'
                      }}
                    />
                    <Area dataKey="threats" stroke="#ef4444" fill="url(#threatGradient)" />
                    <Area dataKey="criticalAlerts" stroke="#dc2626" fill="url(#alertGradient)" />
                    <defs>
                      <linearGradient id="threatGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="alertGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Attack Vectors */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">Attack Vector Distribution</h3>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={attackVectorsData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {attackVectorsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* AI Insights Summary */}
            <div className="border-t border-slate-700/50 pt-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
                <span>AI-Generated Insights</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/30">
                  <div className="text-purple-300 font-semibold">15 threats clustered</div>
                  <div className="text-slate-400">Similar patterns grouped by AI</div>
                </div>
                <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                  <div className="text-blue-300 font-semibold">Next likely attack: Phishing</div>
                  <div className="text-slate-400">82% confidence score</div>
                </div>
                <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30">
                  <div className="text-cyan-300 font-semibold">Risk score: {realTimeData.riskScore}/100</div>
                  <div className="text-slate-400">Real-time AI assessment</div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Decisions Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <GlassCard title="AI Decision Engine" icon={Zap}>
            <div className="space-y-3">
              <div className="text-center p-4">
                <div className="text-2xl font-bold text-cyan-400 mb-1">{realTimeData.aiactions}</div>
                <div className="text-xs text-slate-400">AI Actions Today</div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                  <div>
                    <div className="text-green-400 text-sm font-semibold">Blocked Attack</div>
                    <div className="text-slate-400 text-xs">SQL Injection</div>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                <div className="flex items-center justify-between p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                  <div>
                    <div className="text-yellow-400 text-sm font-semibold">Investigation</div>
                    <div className="text-slate-400 text-xs">Suspected Malware</div>
                  </div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Second Row - Predictions and System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Prediction Engine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <GlassCard title="AI Prediction Engine" icon={Target}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white mb-4">Next Threat Predictions</h3>
              <div className="space-y-4">
                {predictionData.map((prediction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  >
                    <div>
                      <div className="text-white font-medium">{prediction.type}</div>
                      <div className="text-slate-400 text-sm">Expected in {prediction.timeframe}</div>
                    </div>
                    <div className="text-right">
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        prediction.confidence === 'High' ? 'bg-red-500/20 text-red-400' :
                        prediction.confidence === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {prediction.confidence}
                      </div>
                      <div className="text-white font-bold mt-1">{prediction.likelihood}%</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-700/50 pt-4">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2">AI Insights</h4>
              <p className="text-slate-300 text-sm">
                "High confidence phishing campaign expected due to recent credential patterns observed in network traffic analysis."
              </p>
            </div>
          </GlassCard>
        </motion.div>

        {/* System Health Monitoring */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="System Health" icon={Cpu}>
            <div className="space-y-6">
              {/* Uptime */}
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{realTimeData.uptime}</div>
                <div className="text-slate-400 text-sm">System Uptime</div>
              </div>

              {/* Performance Metrics */}
              <div className="space-y-4">
                {systemHealthData.map((metric, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">{metric.metric}</span>
                      <span className="text-white font-medium">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-1000 ${
                          metric.value > 80 ? 'bg-red-500' :
                          metric.value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* AI Recommendations */}
              <div className="border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-semibold text-cyan-400 mb-2">AI Recommendations</h4>
                <div className="space-y-2 text-sm text-slate-300">
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                    <span>Consider adding CPU cores to handle peak load</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                    <span>Memory optimization recommended</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Third Row - AI Insights Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard title="AI Intelligence Timeline" icon={Eye}>
          <div className="space-y-4">
            {aiInsights.map((insight, index) => (
              <AISummaryCard key={index} insight={insight} />
            ))}
          </div>
        </GlassCard>
      </motion.div>

      {/* Footer Stats */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card className="text-center">
          <div className="text-2xl font-bold text-cyan-400 mb-1">247</div>
          <div className="text-slate-400 text-sm">Total Threat Vectors</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">98.4%</div>
          <div className="text-slate-400 text-sm">Detection Accuracy</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-blue-400 mb-1">0.3s</div>
          <div className="text-slate-400 text-sm">Response Time</div>
        </Card>
        <Card className="text-center">
          <div className="text-2xl font-bold text-purple-400 mb-1">156</div>
          <div className="text-slate-400 text-sm">AI Actions Executed</div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
