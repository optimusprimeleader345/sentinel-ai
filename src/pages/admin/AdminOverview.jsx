import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Activity,
  AlertTriangle,
  Shield,
  Zap,
  TrendingUp,
  Server,
  Users,
  Eye,
  Lightbulb,
  AlertCircle,
  CheckCircle,
  Clock,
  BarChart3,
  Brain
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
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
  Cell
} from 'recharts';
import { threatTrendData, attackVectorsData, severityHeatmapData } from '../../data/admin/threats';
import { aiInsights } from '../../data/admin/aiInsights';

const AdminOverview = () => {
  const [realTimeData, setRealTimeData] = useState({
    totalThreats: 247,
    criticalAlerts: 3,
    aiActions: 156,
    activeUsers: 89,
    riskScore: 68,
    uptime: '99.8%'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        criticalAlerts: Math.max(0, prev.criticalAlerts + Math.floor(Math.random() * 3 - 1)),
        aiActions: prev.aiActions + Math.floor(Math.random() * 2),
        activeUsers: Math.max(0, prev.activeUsers + Math.floor(Math.random() * 4 - 2)),
        riskScore: Math.min(100, Math.max(0, prev.riskScore + Math.floor(Math.random() * 6 - 3))),
      }));
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const AISummaryCard = ({ insight }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-lg border-l-4 mb-4 ${
        insight.type === 'success' ? 'border-l-green-500 bg-green-500/10'
        : insight.type === 'warning' ? 'border-l-yellow-500 bg-yellow-500/10'
        : 'border-l-blue-500 bg-blue-500/10'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="font-semibold text-white mb-2">{insight.title}</h4>
          <p className="text-slate-300 text-sm">{insight.description}</p>
          {insight.confidence && (
            <div className="mt-2 text-xs text-cyan-400">
              AI Confidence: {insight.confidence}%
            </div>
          )}
        </div>
        <span className="text-xs text-slate-500">{insight.time}</span>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Page Header */}
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
              Admin SOC Overview
            </h1>
            <p className="text-slate-400 text-sm">Enterprise Security Operations Center - Real-time Dashboard</p>
          </div>
        </div>

        {/* Real-time Status Indicators */}
        <div className="flex items-center space-x-6">
          <motion.div
            animate={{ scale: realTimeData.criticalAlerts > 5 ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1, repeat: realTimeData.criticalAlerts > 5 ? Infinity : 0 }}
            className="flex items-center space-x-2"
          >
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-white">{realTimeData.criticalAlerts}</span>
            <span className="text-xs text-slate-400">Critical</span>
          </motion.div>
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-bold text-white">{realTimeData.aiActions}</span>
            <span className="text-xs text-slate-400">AI Actions</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-bold text-white">{realTimeData.activeUsers}</span>
            <span className="text-xs text-slate-400">Active Users</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="relative"
        >
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-red-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{realTimeData.totalThreats}</div>
            <div className="text-slate-400 text-sm">Total Threats Detected</div>
            <div className="mt-2 text-xs text-green-400">↑ 12% from yesterday</div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">3</div>
            <div className="text-slate-400 text-sm">High-Severity Alerts</div>
            <motion.div
              animate={{ opacity: realTimeData.criticalAlerts > 0 ? [0.5, 1, 0.5] : 1 }}
              className="mt-2 text-xs text-red-400"
            >
              ⚠️ Requires attention
            </motion.div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative"
        >
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Zap className="w-8 h-8 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{realTimeData.aiActions}</div>
            <div className="text-slate-400 text-sm">AI Actions Executed</div>
            <div className="mt-2 text-xs text-cyan-400">🤖 Automated defense active</div>
          </GlassCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <GlassCard className="text-center">
            <div className="flex items-center justify-center mb-4">
              <Server className="w-8 h-8 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-2">{realTimeData.uptime}</div>
            <div className="text-slate-400 text-sm">System Uptime</div>
            <div className="mt-2 text-xs text-green-400">✅ All systems operational</div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

        {/* Threat Activity Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2"
        >
          <GlassCard title="Threat Activity Timeline" icon={Activity}>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-white">24-Hour Threat Volume</h3>
              <ResponsiveContainer width="100%" height={300}>
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

            {/* AI Risk Assessment */}
            <div className="border-t border-slate-700/50 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-semibold text-white">AI Risk Assessment</h4>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                  realTimeData.riskScore > 70 ? 'bg-red-500/20 text-red-400' :
                  realTimeData.riskScore > 50 ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {realTimeData.riskScore}/100 Risk Score
                </div>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                  <span>Phishing detection rate: 95.2%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                  <span>Malware prevention: 87.8%</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full"></div>
                  <span>Zero-day protection: 92.4%</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Attack Vectors & AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Attack Vector Analysis" icon={BarChart3} className="mb-6">
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
          </GlassCard>

          <GlassCard title="AI Insights & Recommendations" icon={Lightbulb}>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {aiInsights.map((insight, index) => (
                <AISummaryCard key={index} insight={insight} />
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Bottom Section - Severity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard title="Severity Heat Distribution" icon={Eye}>
          <div className="grid grid-cols-7 gap-4">
            {severityHeatmapData.map((day, dayIndex) => (
              <div key={day.day} className="space-y-2">
                <div className="text-center text-sm text-slate-400">{day.day}</div>
                <div className="space-y-1">
                  <div
                    className="h-4 bg-red-500/60 rounded text-xs text-center text-white flex items-center justify-center"
                    style={{ height: `${Math.max(day.critical * 2, 8)}px` }}
                  >
                    {day.critical}
                  </div>
                  <div
                    className="h-4 bg-yellow-500/60 rounded text-xs text-center text-white flex items-center justify-center"
                    style={{ height: `${Math.max(day.high * 2, 8)}px` }}
                  >
                    {day.high}
                  </div>
                  <div
                    className="h-4 bg-blue-500/60 rounded text-xs text-center text-white flex items-center justify-center"
                    style={{ height: `${Math.max(day.medium * 2, 8)}px` }}
                  >
                    {day.medium}
                  </div>
                  <div
                    className="h-4 bg-slate-500/60 rounded text-xs text-center text-slate-200 flex items-center justify-center"
                    style={{ height: `${Math.max(day.low * 2, 8)}px` }}
                  >
                    {day.low}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-6 mt-6 pt-4 border-t border-slate-700/50">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500/60 rounded"></div>
              <span className="text-xs text-slate-400">Critical</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500/60 rounded"></div>
              <span className="text-xs text-slate-400">High</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500/60 rounded"></div>
              <span className="text-xs text-slate-400">Medium</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-slate-500/60 rounded"></div>
              <span className="text-xs text-slate-400">Low</span>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* AI Summary Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="mt-8"
      >
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">AI Executive Summary</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Brain className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>Analysis:</strong> Based on the last 24 hours of security telemetry, the AI has detected consistent patterns in inbound traffic with a 82% confidence score for an emerging phishing campaign targeting finance departments. System load remains stable at 68% CPU utilization, with automated resource optimization active. No immediate critical threats detected, but monitoring for the predicted attack escalation continues.
                </p>
                <div className="mt-4 flex items-center space-x-4 text-sm text-slate-400">
                  <span>• Model Confidence: 88%</span>
                  <span>• Last Updated: Now</span>
                  <span>• Next Review: 30min</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  );
};

export default AdminOverview;
