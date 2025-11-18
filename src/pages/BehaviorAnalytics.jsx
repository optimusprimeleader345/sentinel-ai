import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Activity,
  Smartphone,
  MapPin,
  TrendingUp,
  AlertTriangle,
  Users,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from '../components/Card';
import {
  getBehaviorSummary,
  getBehaviorTrends,
  getAnomalyEvents,
  getUserRisk,
  getDeviceBehavior,
  getLocationActivity,
  getBehaviorInsights,
} from '../lib/api.js';

function BehaviorAnalytics() {
  const [behaviorSummary, setBehaviorSummary] = useState(null);
  const [behaviorTrends, setBehaviorTrends] = useState([]);
  const [anomalyEvents, setAnomalyEvents] = useState([]);
  const [userRisk, setUserRisk] = useState({ risk: 0, level: 'Low' });
  const [deviceBehavior, setDeviceBehavior] = useState([]);
  const [locationActivity, setLocationActivity] = useState([]);
  const [behaviorInsights, setBehaviorInsights] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBehaviorAnalytics();
  }, []);

  const loadBehaviorAnalytics = async () => {
    try {
      const [
        summaryRes,
        trendsRes,
        anomaliesRes,
        riskRes,
        devicesRes,
        locationsRes,
        insightsRes,
      ] = await Promise.all([
        getBehaviorSummary(),
        getBehaviorTrends(),
        getAnomalyEvents(),
        getUserRisk(),
        getDeviceBehavior(),
        getLocationActivity(),
        getBehaviorInsights(),
      ]);

      setBehaviorSummary(summaryRes.data);
      setBehaviorTrends(trendsRes.data.trends || []);
      setAnomalyEvents(anomaliesRes.data.anomalies || []);
      setUserRisk(riskRes.data);
      setDeviceBehavior(devicesRes.data.devices || []);
      setLocationActivity(locationsRes.data.locations || []);
      setBehaviorInsights(insightsRes.data.insights || []);
    } catch (error) {
      console.error('Failed to load behavior analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadgeColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-400 bg-green-900/30';
      case 'Moderate': return 'text-yellow-400 bg-yellow-900/30';
      case 'High': return 'text-red-400 bg-red-900/30';
      case 'Critical': return 'text-purple-400 bg-purple-900/30';
      default: return 'text-slate-400 bg-slate-900/30';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Safe': return 'text-green-400 bg-green-900/30';
      case 'Warning': return 'text-yellow-400 bg-yellow-900/30';
      case 'Danger': return 'text-red-400 bg-red-900/30';
      default: return 'text-slate-400 bg-slate-900/30';
    }
  };

  const getActivityIntensity = (activity) => {
    if (activity >= 15) return 'High';
    if (activity >= 8) return 'Medium';
    return 'Low';
  };

  const getActivityColor = (intensity) => {
    switch (intensity) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading behavior analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Shield className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Behavior Analytics</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Real-time User and Entity Behavior Analysis (UEBA)</p>

        {/* ==========================================
            1. User Behavior Summary (Mock Statistics)
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-bold text-white mb-6">📊 User Behavior Summary</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {behaviorSummary && (
                <>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-400 mb-2">{behaviorSummary.unusualLogins}</div>
                    <p className="text-sm text-slate-400">Unusual Logins</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-400 mb-2">{behaviorSummary.riskyDevices}</div>
                    <p className="text-sm text-slate-400">Risky Devices</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{behaviorSummary.locationChanges}</div>
                    <p className="text-sm text-slate-400">Location Changes</p>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{behaviorSummary.privilegeEscalations}</div>
                    <p className="text-sm text-slate-400">Privilege Escalations</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            2. Behavior Trend Line Chart
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">📈 Behavior Trend Analysis</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] p-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={behaviorTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '6px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="anomalies"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ==========================================
            3. Anomaly List (UEBA Events)
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">🚨 Anomaly Events</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] p-6">
            <div className="space-y-4">
              {anomalyEvents.map((event) => (
                <div key={event.id} className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center space-x-4">
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${event.risk === 'High' ? 'bg-red-900/30 text-red-400' : event.risk === 'Medium' ? 'bg-yellow-900/30 text-yellow-400' : 'bg-green-900/30 text-green-400'}`}>
                      {event.risk}
                    </div>
                    <div>
                      <div className="text-white font-medium">{event.type}</div>
                      <div className="text-slate-400 text-sm">{event.detail}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">{event.timestamp}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            4. User Risk Score (0–100)
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">⚠️ User Behavior Risk Score</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] p-6">
            <div className="text-center">
              <div className={`inline-block px-6 py-3 rounded-lg ${getRiskBadgeColor(userRisk.level)}`}>
                <div className="text-4xl font-bold mb-1">{userRisk.risk}%</div>
                <div className="text-sm capitalize">User Behavior Risk Score: {userRisk.level}</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            5. Device Behavior Panel
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">📱 Device Behavior Panel</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deviceBehavior.map((device, index) => (
                <div key={index} className="flex justify-between items-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-6 h-6 text-slate-400" />
                    <div>
                      <div className="text-white font-medium">{device.device}</div>
                      <div className="text-xs text-slate-400">{device.anomalies} anomalies detected</div>
                    </div>
                  </div>
                  <div className={`px-3 py-1 rounded text-sm font-medium ${getStatusColor(device.status)}`}>
                    {device.status}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            6. Location Activity Map (Mock Grid)
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">🌍 Location Activity Analysis</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {locationActivity.map((location, index) => {
                const intensity = getActivityIntensity(location.activity);
                return (
                  <div key={index} className={`p-4 rounded-lg text-center ${getActivityColor(intensity)} border border-opacity-30`}>
                    <div className="text-white text-lg font-bold">{location.activity}</div>
                    <div className="text-white text-sm opacity-90">{location.location}</div>
                    <div className="text-xs text-slate-300 mt-1">{intensity} Activity</div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* ==========================================
            7. Behavior Insights (AI Explanations)
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">🤖 AI Behavior Insights</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.2)] p-6">
            <div className="space-y-4">
              {behaviorInsights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg">
                  <Eye className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300">{insight}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default BehaviorAnalytics;
