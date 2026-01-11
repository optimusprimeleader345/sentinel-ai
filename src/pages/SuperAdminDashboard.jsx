import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Shield,
  Globe,
  AlertTriangle,
  BarChart3,
  Bot,
  Building2,
  Target,
  CheckCircle,
  Zap,
  Activity,
  Gauge,
  ShieldCheck,
  Minus,
  Plus,
  Loader2,
  Eye,
  X,
  Play,
  Pause,
  RotateCcw,
  AlertOctagon,
  Users,
  Server,
  Wifi,
  Cpu,
  HardDrive,
  Terminal
} from 'lucide-react';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import api from '../lib/api.js';

// 🚀 ULTIMATE AI-POWERED SUPER ADMIN COMMAND CENTER
// Next-Generation Enterprise SOC with Advanced AI & Modern UX
// Presidential Cyber Command Center - Government Grade Operations
const SuperAdminDashboard = ({ initialCommand }) => {
  // Advanced state management with real-time AI integration
  const [isLoading, setIsLoading] = useState(false);
  const [backendOffline, setBackendOffline] = useState(false);
  const [error, setError] = useState(null);
  const [activeView, setActiveView] = useState('overview');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});

  // Real-time AI data with backend integration
  const [realTimeData, setRealTimeData] = useState({
    // AI Decision Engine Metrics
    aiConfidence: 94.2,
    autonomousDecisions: 247,
    neuralNetworks: 12,
    responseTime: '0.12s',
    timeToDetection: '45s',
    meanTimeToRespond: '8.5m',

    // Threat Intelligence
    globalThreatLevel: 'ELEVATED',
    activeThreats: 47,
    blockedAttacks: 12543,
    intelligenceSources: 23,
    falsePositiveRate: 2.1,

    // Autonomous Security
    autonomousActions: 1847,
    humanOverrides: 8,
    successRate: 97.3,
    selfHealingEvents: 34,

    // Government Integration
    agencyConnections: 8,
    intelligenceShares: 892,
    complianceScore: 96.8,
    auditAlerts: 2,

    // Neural Network Performance
    modelAccuracy: 95.4,
    trainingProgress: 78,
    predictionConfidence: 91.7,
    anomalyDetection: 98.3,

    // System Health
    systemUptime: '99.97%',
    cpuUsage: 23.4,
    memoryUsage: 67.8,
    networkLatency: '12ms'
  });

  // REAL WORKING SECURITY CONTROLS STATE
  const [securityControls, setSecurityControls] = useState({
    emergencyLockdown: false,
    systemPower: {
      firewall: true,
      ids: true,
      ips: true,
      vpn: false,
      loadBalancer: true
    },
    resourceAllocation: {
      cpu: 75,
      memory: 60,
      storage: 45,
      network: 80
    },
    alertSettings: {
      critical: true,
      high: true,
      medium: false,
      low: false,
      info: false
    },
    aiControls: {
      activeModel: 'threat_detection_v2',
      sensitivity: 85,
      learningMode: true,
      autoResponse: true
    }
  });

  // Control action states
  const [controlActions, setControlActions] = useState({
    isLoading: false,
    lastAction: null,
    error: null,
    success: null
  });

  // REAL WORKING CONTROL FUNCTIONS
  const handleEmergencyLockdown = async () => {
    setControlActions({ isLoading: true, lastAction: 'emergency_lockdown', error: null, success: null });

    try {
      // Simulate API call to trigger emergency lockdown
      const response = await api.post('/api/security-control/emergency/lockdown', {
        initiatedBy: 'SuperAdmin',
        reason: 'Manual Emergency Lockdown',
        timestamp: new Date().toISOString()
      });

      setSecurityControls(prev => ({ ...prev, emergencyLockdown: true }));
      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        success: 'Emergency lockdown activated successfully',
        lastAction: null
      }));

      // Show success notification (you can integrate with your notification system)
      setTimeout(() => setControlActions(prev => ({ ...prev, success: null })), 5000);
    } catch (error) {
      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to activate emergency lockdown',
        lastAction: null
      }));
      setTimeout(() => setControlActions(prev => ({ ...prev, error: null })), 5000);
    }
  };

  const handleSystemPowerToggle = async (system, enabled) => {
    setControlActions({ isLoading: true, lastAction: `toggle_${system}`, error: null, success: null });

    try {
      // Simulate API call to toggle system power
      const response = await api.post('/api/security-control/systems/toggle', {
        system,
        enabled,
        timestamp: new Date().toISOString()
      });

      setSecurityControls(prev => ({
        ...prev,
        systemPower: {
          ...prev.systemPower,
          [system]: enabled
        }
      }));

      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        success: `${system.toUpperCase()} ${enabled ? 'enabled' : 'disabled'} successfully`,
        lastAction: null
      }));

      setTimeout(() => setControlActions(prev => ({ ...prev, success: null })), 3000);
    } catch (error) {
      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        error: `Failed to ${enabled ? 'enable' : 'disable'} ${system}`,
        lastAction: null
      }));
      setTimeout(() => setControlActions(prev => ({ ...prev, error: null })), 5000);
    }
  };

  const handleResourceAllocation = async (resource, value) => {
    setControlActions({ isLoading: true, lastAction: `allocate_${resource}`, error: null, success: null });

    try {
      // Simulate API call to update resource allocation
      const response = await api.post('/api/security-control/resources/allocate', {
        resource,
        value,
        timestamp: new Date().toISOString()
      });

      setSecurityControls(prev => ({
        ...prev,
        resourceAllocation: {
          ...prev.resourceAllocation,
          [resource]: value
        }
      }));

      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        success: `${resource.toUpperCase()} allocation updated to ${value}%`,
        lastAction: null
      }));

      setTimeout(() => setControlActions(prev => ({ ...prev, success: null })), 3000);
    } catch (error) {
      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        error: `Failed to update ${resource} allocation`,
        lastAction: null
      }));
      setTimeout(() => setControlActions(prev => ({ ...prev, error: null })), 5000);
    }
  };

  const handleAlertSettingToggle = async (level, enabled) => {
    setControlActions({ isLoading: true, lastAction: `alert_${level}`, error: null, success: null });

    try {
      // Simulate API call to update alert settings
      const response = await api.post('/api/security-control/alerts/settings', {
        level,
        enabled,
        timestamp: new Date().toISOString()
      });

      setSecurityControls(prev => ({
        ...prev,
        alertSettings: {
          ...prev.alertSettings,
          [level]: enabled
        }
      }));

      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        success: `${level.toUpperCase()} alerts ${enabled ? 'enabled' : 'disabled'}`,
        lastAction: null
      }));

      setTimeout(() => setControlActions(prev => ({ ...prev, success: null })), 3000);
    } catch (error) {
      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        error: `Failed to update ${level} alert settings`,
        lastAction: null
      }));
      setTimeout(() => setControlActions(prev => ({ ...prev, error: null })), 5000);
    }
  };

  const handleAIModelSwitch = async (model) => {
    setControlActions({ isLoading: true, lastAction: 'ai_model_switch', error: null, success: null });

    try {
      const response = await api.post('/api/security-control/ai/models/switch', {
        model,
        timestamp: new Date().toISOString()
      });

      setSecurityControls(prev => ({
        ...prev,
        aiControls: {
          ...prev.aiControls,
          activeModel: model
        }
      }));

      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        success: `AI model switched to ${model}`,
        lastAction: null
      }));

      setTimeout(() => setControlActions(prev => ({ ...prev, success: null })), 3000);
    } catch (error) {
      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to switch AI model',
        lastAction: null
      }));
      setTimeout(() => setControlActions(prev => ({ ...prev, error: null })), 5000);
    }
  };

  const handleAISensitivityChange = async (value) => {
    setControlActions({ isLoading: true, lastAction: 'ai_sensitivity', error: null, success: null });

    try {
      const response = await api.post('/api/security-control/ai/sensitivity', {
        sensitivity: value,
        timestamp: new Date().toISOString()
      });

      setSecurityControls(prev => ({
        ...prev,
        aiControls: {
          ...prev.aiControls,
          sensitivity: value
        }
      }));

      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        success: `AI sensitivity updated to ${value}%`,
        lastAction: null
      }));

      setTimeout(() => setControlActions(prev => ({ ...prev, success: null })), 3000);
    } catch (error) {
      setControlActions(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to update AI sensitivity',
        lastAction: null
      }));
      setTimeout(() => setControlActions(prev => ({ ...prev, error: null })), 5000);
    }
  };

  // Interactive chart and visualization data
  const [chartData, setChartData] = useState({
    threatTrend: [45, 67, 89, 34, 78, 56, 92, 81, 73, 95, 87, 91],
    aiPerformance: [85, 87, 91, 89, 95, 93, 97, 94, 96, 98, 95, 97],
    autonomousActions: [234, 456, 678, 543, 789, 345, 567, 723, 891, 654, 432, 567],
    neuralAccuracy: [92, 94, 91, 96, 93, 97, 95, 98, 94, 96, 97, 99]
  });

  // Simple animation state
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Real-time data fetching with AI integration
  useEffect(() => {
    const fetchRealTimeData = async () => {
      try {
        // Fetch AI decision metrics
        const aiResponse = await api.get('/api/ai/status');
        const predictionResponse = await api.get('/api/predictions/metrics');
        const autonomousResponse = await api.get('/api/autonomous/status');

        setRealTimeData(prev => ({
          ...prev,
          aiConfidence: aiResponse?.data?.confidence || prev.aiConfidence,
          autonomousDecisions: autonomousResponse?.data?.decisionsMade || prev.autonomousDecisions,
          neuralNetworks: aiResponse?.data?.activeModels || prev.neuralNetworks,
          responseTime: `${(aiResponse?.data?.avgResponseTime || 0.08).toFixed(2)}s`,
          modelAccuracy: predictionResponse?.data?.overallAccuracy || prev.modelAccuracy,
          successRate: autonomousResponse?.data?.successRate || prev.successRate
        }));
      } catch (error) {
        console.warn('Real-time data fetch failed, using mock data:', error);
        // Continue with mock data updates
      }
    };

    fetchRealTimeData();
    const interval = setInterval(fetchRealTimeData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  // Enhanced chart component with animations
  const CyberChart = ({ data, type, color, height = 200, title, animate = true }) => {
    const maxValue = Math.max(...data);
    const chartWidth = 400;
    const chartHeight = height;

    if (type === 'bar') {
      const totalBars = data.length;
      const barWidth = Math.floor(chartWidth / totalBars);
      const actualBarWidth = Math.floor(barWidth * 0.8);
      const spacing = Math.floor((barWidth - actualBarWidth) / 2);

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {title && (
            <h4 className="text-sm font-semibold text-slate-300 mb-3">{title}</h4>
          )}
          <svg width={chartWidth} height={chartHeight} className="overflow-visible">
            {data.map((value, index) => {
              const barHeight = (value / maxValue) * (chartHeight - 60);
              const x = (index * barWidth) + spacing;
              const y = chartHeight - barHeight - 30;

              return (
                <motion.g key={index}>
                  <motion.rect
                    x={x}
                    initial={{ y: chartHeight - 30, height: 0 }}
                    animate={{ y, height: barHeight }}
                    transition={{
                      delay: animate ? index * 0.05 : 0,
                      duration: 0.8,
                      ease: "easeOut"
                    }}
                    width={actualBarWidth}
                    fill={`url(#gradient${color}${index})`}
                    className="drop-shadow-lg hover:brightness-110 transition-all duration-300"
                    rx="2"
                  />
                  <motion.text
                    x={x + actualBarWidth / 2}
                    y={y - 5}
                    textAnchor="middle"
                    className="text-xs fill-slate-400 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: animate ? index * 0.05 + 0.4 : 0 }}
                  >
                    {value}
                  </motion.text>
                </motion.g>
              );
            })}
            <defs>
              {data.map((_, index) => (
                <linearGradient key={index} id={`gradient${color}${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={
                    color === 'cyan' ? '#06b6d4' :
                    color === 'purple' ? '#a855f7' :
                    color === 'blue' ? '#3b82f6' :
                    color === 'green' ? '#10b981' : '#ef4444'
                  } />
                  <stop offset="100%" stopColor={
                    color === 'cyan' ? '#0891b2' :
                    color === 'purple' ? '#9333ea' :
                    color === 'blue' ? '#1d4ed8' :
                    color === 'green' ? '#059669' : '#dc2626'
                  } />
                </linearGradient>
              ))}
            </defs>
          </svg>
        </motion.div>
      );
    }

    if (type === 'line') {
      const points = data.map((value, index) => {
        const x = (index * (chartWidth / (data.length - 1)));
        const y = chartHeight - ((value / maxValue) * (chartHeight - 60)) - 30;
        return `${x},${y}`;
      }).join(' ');

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {title && (
            <h4 className="text-sm font-semibold text-slate-300 mb-3">{title}</h4>
          )}
          <svg width={chartWidth} height={chartHeight} className="overflow-visible">
            <motion.polyline
              points={points}
              fill="none"
              stroke={
                color === 'cyan' ? '#06b6d4' :
                color === 'purple' ? '#a855f7' :
                color === 'blue' ? '#3b82f6' :
                color === 'green' ? '#10b981' : '#ef4444'
              }
              strokeWidth="3"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="drop-shadow-lg"
            />
            {data.map((value, index) => {
              const x = (index * (chartWidth / (data.length - 1)));
              const y = chartHeight - ((value / maxValue) * (chartHeight - 60)) - 30;
              return (
                <motion.circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={
                    color === 'cyan' ? '#06b6d4' :
                    color === 'purple' ? '#a855f7' :
                    color === 'blue' ? '#3b82f6' :
                    color === 'green' ? '#10b981' : '#ef4444'
                  }
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="animate-pulse hover:scale-125 transition-transform duration-200"
                />
              );
            })}
          </svg>
        </motion.div>
      );
    }

    if (type === 'area') {
      const points = data.map((value, index) => {
        const x = (index * (chartWidth / (data.length - 1)));
        const y = chartHeight - ((value / maxValue) * (chartHeight - 60)) - 30;
        return `${x},${y}`;
      }).join(' ') + ` ${chartWidth},${chartHeight - 30} 0,${chartHeight - 30}`;

      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          {title && (
            <h4 className="text-sm font-semibold text-slate-300 mb-3">{title}</h4>
          )}
          <svg width={chartWidth} height={chartHeight} className="overflow-visible">
            <motion.polygon
              points={points}
              fill={`url(#areaGradient${color})`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ duration: 1.5 }}
            />
            <motion.polyline
              points={data.map((value, index) => {
                const x = (index * (chartWidth / (data.length - 1)));
                const y = chartHeight - ((value / maxValue) * (chartHeight - 60)) - 30;
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke={
                color === 'cyan' ? '#06b6d4' :
                color === 'purple' ? '#a855f7' :
                color === 'blue' ? '#3b82f6' :
                color === 'green' ? '#10b981' : '#ef4444'
              }
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id={`areaGradient${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={
                  color === 'cyan' ? '#06b6d4' :
                  color === 'purple' ? '#a855f7' :
                  color === 'blue' ? '#3b82f6' :
                  color === 'green' ? '#10b981' : '#ef4444'
                } stopOpacity="0.4" />
                <stop offset="100%" stopColor={
                  color === 'cyan' ? '#06b6d4' :
                  color === 'purple' ? '#a855f7' :
                  color === 'blue' ? '#3b82f6' :
                  color === 'green' ? '#10b981' : '#ef4444'
                } stopOpacity="0.1" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      );
    }

    return null;
  };

  // Advanced Card Component with Modern Design
  const ModernCard = ({
    children,
    className = "",
    title,
    icon: Icon,
    status,
    priority,
    glow = false,
    expandable = false,
    expanded = false,
    onToggleExpand
  }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
      <motion.div
        className={`relative group ${className}`}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Advanced Glow Effects */}
        <div className={`absolute inset-0 rounded-2xl blur-2xl transition-all duration-500 ${
          isHovered || glow ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
        } ${
          glow === 'cyan' ? 'bg-cyan-500/30' :
          glow === 'purple' ? 'bg-purple-500/30' :
          glow === 'blue' ? 'bg-blue-500/30' :
          glow === 'green' ? 'bg-green-500/30' :
          glow === 'red' ? 'bg-red-500/30' :
          'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-blue-500/20'
        }`} />

        {/* Animated Border */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 opacity-0 group-hover:opacity-30 animate-pulse transition-opacity duration-500" />

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 shadow-2xl shadow-slate-900/50 overflow-hidden">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(56,189,248,0.1),transparent_50%)] animate-pulse" />
            <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,rgba(139,92,246,0.1),transparent)] animate-spin" style={{ animationDuration: '20s' }} />
          </div>

          {/* Header */}
          {(title || Icon || status) && (
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/30">
              <div className="flex items-center space-x-4">
                {Icon && (
                  <motion.div
                    animate={isHovered ? { rotate: 360, scale: 1.1 } : { rotate: 0, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="p-3 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-xl border border-cyan-500/30"
                  >
                    <Icon className="w-6 h-6 text-cyan-400" />
                  </motion.div>
                )}
                {title && (
                  <h2 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {title}
                  </h2>
                )}
              </div>

              <div className="flex items-center space-x-3">
                {expandable && (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onToggleExpand}
                    className="p-2 bg-slate-800/50 rounded-lg border border-slate-600/50 hover:border-cyan-500/50 transition-colors duration-200"
                  >
                    {expanded ? <Minus className="w-4 h-4 text-cyan-400" /> : <Plus className="w-4 h-4 text-cyan-400" />}
                  </motion.button>
                )}

                {status && (
                  <motion.span
                    animate={status === 'CRITICAL' ? { scale: [1, 1.1, 1] } : {}}
                    transition={{ duration: 0.5, repeat: status === 'CRITICAL' ? Infinity : 0 }}
                    className={`px-4 py-2 rounded-lg text-sm font-bold backdrop-blur-sm border ${
                      status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border-green-500/30 shadow-lg shadow-green-500/20' :
                      status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/30 shadow-lg shadow-red-500/20' :
                      status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30 shadow-lg shadow-yellow-500/20' :
                      'bg-blue-500/20 text-blue-400 border-blue-500/30 shadow-lg shadow-blue-500/20'
                    }`}
                  >
                    {status}
                  </motion.span>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <motion.div
            layout
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {children}
          </motion.div>
        </div>
      </motion.div>
    );

};

  // Main Dashboard Layout
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 relative">
        {/* Dynamic Background Effects */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-[400px] h-[400px] bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-[300px] h-[300px] bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
        </div>

        {/* Command Interface Bar */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-20 p-4 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50"
        >
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="text-sm text-slate-300 font-mono">COMMAND:</span>
            </div>
            <div className="flex space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                onClick={() => console.log('Run Full Scan')}
              >
                Run Scan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30 hover:bg-green-500/30 transition-colors"
                onClick={() => console.log('Deploy Updates')}
              >
                Deploy
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                onClick={() => console.log('Generate Report')}
              >
                Report
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-3 py-1 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30 hover:bg-red-500/30 transition-colors"
                onClick={() => console.log('Emergency Lockdown')}
              >
                Lockdown
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 p-8"
        >
          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-6">
              <motion.div
                className="p-4 bg-gradient-to-br from-cyan-500 via-purple-500 to-blue-500 rounded-2xl shadow-2xl shadow-cyan-500/20"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Activity className="w-12 h-12 text-white" />
                </motion.div>
              </motion.div>
              <div>
                <motion.h1
                  className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-purple-300 via-blue-300 to-indigo-300 bg-clip-text text-transparent"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  AI Super Admin Command Center
                </motion.h1>
                <motion.p
                  className="text-slate-300 text-lg mt-2 font-medium"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Presidential Cyber Operations • Advanced Neural Intelligence • Autonomous Defense
                </motion.p>
              </div>
            </div>

            {/* Global Status Indicators */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex items-center space-x-4"
            >
              <motion.div
                animate={{
                  scale: realTimeData.globalThreatLevel === 'CRITICAL' ? [1, 1.1, 1] : 1
                }}
                transition={{ duration: 0.5, repeat: realTimeData.globalThreatLevel === 'CRITICAL' ? Infinity : 0 }}
                className="flex items-center space-x-3 px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl"
              >
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <div>
                  <div className="text-sm font-bold text-white">{realTimeData.globalThreatLevel}</div>
                  <div className="text-xs text-slate-400">Global Threat</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <Brain className="w-5 h-5 text-cyan-400" />
                <div>
                  <div className="text-sm font-bold text-white">{realTimeData.aiConfidence.toFixed(1)}%</div>
                  <div className="text-xs text-slate-400">AI Confidence</div>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3 px-6 py-3 bg-slate-900/50 backdrop-blur-xl border border-slate-700 rounded-xl"
                whileHover={{ scale: 1.05 }}
              >
                <Zap className="w-5 h-5 text-purple-400" />
                <div>
                  <div className="text-sm font-bold text-white">{realTimeData.autonomousActions.toLocaleString()}</div>
                  <div className="text-xs text-slate-400">Auto Actions</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Key Metrics Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8"
          >
            {[
              { label: 'Active Threats', value: realTimeData.activeThreats.toLocaleString(), icon: AlertTriangle, color: 'red', trend: '+12%' },
              { label: 'AI Models', value: realTimeData.neuralNetworks, icon: Brain, color: 'cyan', trend: '+3' },
              { label: 'Response Time', value: realTimeData.responseTime, icon: Gauge, color: 'green', trend: '-0.02s' },
              { label: 'Success Rate', value: `${realTimeData.successRate}%`, icon: CheckCircle, color: 'green', trend: '+1.2%' },
              { label: 'Intelligence Sources', value: realTimeData.intelligenceSources, icon: Globe, color: 'blue', trend: '+2' },
              { label: 'Compliance Score', value: `${realTimeData.complianceScore}%`, icon: ShieldCheck, color: 'purple', trend: '+0.5%' }
            ].map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + 1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                  <span className={`text-xs ${
                    metric.trend.startsWith('+') ? 'text-green-400' :
                    metric.trend.startsWith('-') ? 'text-red-400' : 'text-blue-400'
                  }`}>
                    {metric.trend}
                  </span>
                </div>
                <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>
                  {metric.value}
                </div>
                <div className="text-xs text-slate-400">{metric.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* View Tabs */}
          <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'operations', label: 'AI Operations', icon: Brain },
              { id: 'intelligence', label: 'Intelligence', icon: Globe },
              { id: 'analytics', label: 'Analytics', icon: Activity },
              { id: 'health', label: 'System Health', icon: Server }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSelectedView(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedView === tab.id
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Main Dashboard Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="relative z-10 px-8 pb-8"
        >
          {/* Overview Tab */}
          {selectedView === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Security Control Center */}
              <ModernCard
                title="Security Control Center"
                icon={Shield}
                status={securityControls.emergencyLockdown ? "LOCKDOWN ACTIVE" : "STANDBY"}
                glow={securityControls.emergencyLockdown ? "red" : "green"}
                className="lg:col-span-2 xl:col-span-2"
              >
                {/* Emergency Controls */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div>
                      <h4 className="text-lg font-bold text-red-400">Emergency Lockdown</h4>
                      <p className="text-sm text-slate-400">Complete system isolation</p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEmergencyLockdown}
                      disabled={controlActions.isLoading && controlActions.lastAction === 'emergency_lockdown'}
                      className={`px-4 py-2 rounded-lg font-bold text-white transition-all ${
                        securityControls.emergencyLockdown
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-red-500 hover:bg-red-600'
                      } ${controlActions.isLoading && controlActions.lastAction === 'emergency_lockdown' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {controlActions.isLoading && controlActions.lastAction === 'emergency_lockdown' ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Activating...</span>
                        </div>
                      ) : securityControls.emergencyLockdown ? (
                        'LOCKDOWN ACTIVE'
                      ) : (
                        'ACTIVATE LOCKDOWN'
                      )}
                    </motion.button>
                  </div>

                  {/* System Power Controls */}
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(securityControls.systemPower).map(([system, enabled]) => (
                      <motion.button
                        key={system}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSystemPowerToggle(system, !enabled)}
                        disabled={controlActions.isLoading && controlActions.lastAction === `toggle_${system}`}
                        className={`p-3 rounded-lg border transition-all ${
                          enabled
                            ? 'bg-green-500/20 border-green-500/30 text-green-400'
                            : 'bg-slate-700/50 border-slate-600/50 text-slate-400 hover:bg-slate-700/70'
                        } ${controlActions.isLoading && controlActions.lastAction === `toggle_${system}` ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium capitalize">{system.replace('_', ' ')}</span>
                          {controlActions.isLoading && controlActions.lastAction === `toggle_${system}` ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <div className={`w-3 h-3 rounded-full ${enabled ? 'bg-green-400' : 'bg-slate-500'}`}></div>
                          )}
                        </div>
                      </motion.button>
                    ))}
                  </div>

                  {/* Resource Allocation Controls */}
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-slate-300">Resource Allocation</h4>
                    {Object.entries(securityControls.resourceAllocation).map(([resource, value]) => (
                      <div key={resource} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-slate-400 capitalize">{resource}</span>
                          <span className={`text-sm font-bold ${
                            value > 80 ? 'text-red-400' :
                            value > 60 ? 'text-yellow-400' : 'text-green-400'
                          }`}>{value}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={value}
                          onChange={(e) => handleResourceAllocation(resource, parseInt(e.target.value))}
                          disabled={controlActions.isLoading && controlActions.lastAction === `allocate_${resource}`}
                          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-purple"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Alert Priority Controls */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Alert Priorities</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(securityControls.alertSettings).map(([level, enabled]) => (
                        <motion.button
                          key={level}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleAlertSettingToggle(level, !enabled)}
                          disabled={controlActions.isLoading && controlActions.lastAction === `alert_${level}`}
                          className={`p-2 rounded text-xs font-medium transition-all ${
                            enabled
                              ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                              : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'
                          } ${controlActions.isLoading && controlActions.lastAction === `alert_${level}` ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          {controlActions.isLoading && controlActions.lastAction === `alert_${level}` ? (
                            <Loader2 className="w-3 h-3 animate-spin mx-auto" />
                          ) : (
                            `${level.toUpperCase()} ${enabled ? 'ON' : 'OFF'}`
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* AI Controls */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">AI Model Control</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">Active Model</span>
                      <select
                        value={securityControls.aiControls.activeModel}
                        onChange={(e) => handleAIModelSwitch(e.target.value)}
                        disabled={controlActions.isLoading && controlActions.lastAction === 'ai_model_switch'}
                        className="px-3 py-1 bg-slate-700/50 border border-slate-600/50 rounded text-sm text-white"
                      >
                        <option value="threat_detection_v2">Threat Detection v2</option>
                        <option value="behavior_analysis_v3">Behavior Analysis v3</option>
                        <option value="anomaly_detection_v1">Anomaly Detection v1</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-400">Sensitivity</span>
                        <span className="text-sm font-bold text-purple-400">{securityControls.aiControls.sensitivity}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={securityControls.aiControls.sensitivity}
                        onChange={(e) => handleAISensitivityChange(parseInt(e.target.value))}
                        disabled={controlActions.isLoading && controlActions.lastAction === 'ai_sensitivity'}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer slider-purple"
                      />
                    </div>
                  </div>
                </div>
              </ModernCard>
              {/* Row 1: Real-time AI Operations */}
              <ModernCard
                title="AI Decision Feed"
                icon={Bot}
                status="LIVE"
                glow="cyan"
                className="lg:col-span-2 xl:col-span-2"
              >
                {/* Status Messages */}
                {controlActions.success && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg"
                  >
                    <div className="text-sm font-medium text-green-400">{controlActions.success}</div>
                  </motion.div>
                )}
                {controlActions.error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg"
                  >
                    <div className="text-sm font-medium text-red-400">{controlActions.error}</div>
                  </motion.div>
                )}
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: 'AUTONOMOUS_BLOCK',
                        asset: 'Web Server 01',
                        action: 'Blocked suspicious IP 192.168.1.100',
                        confidence: 94,
                        timestamp: new Date(Date.now() - 2 * 60 * 1000),
                        status: 'SUCCESS'
                      },
                      {
                        id: 2,
                        type: 'THREAT_ANALYSIS',
                        asset: 'Database Server',
                        action: 'Detected SQL injection attempt',
                        confidence: 87,
                        timestamp: new Date(Date.now() - 5 * 60 * 1000),
                        status: 'ANALYZING'
                      },
                      {
                        id: 3,
                        type: 'SELF_HEALING',
                        asset: 'API Gateway',
                        action: 'Applied security patch automatically',
                        confidence: 96,
                        timestamp: new Date(Date.now() - 8 * 60 * 1000),
                        status: 'SUCCESS'
                      }
                    ].map((decision) => (
                      <motion.div
                        key={decision.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                      >
                          <div className={`p-2 rounded-lg ${
                            decision.status === 'SUCCESS' ? 'bg-green-500/20' :
                            decision.status === 'ANALYZING' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                          }`}>
                            {decision.status === 'SUCCESS' ? <CheckCircle className="w-4 h-4 text-green-400" /> :
                             decision.status === 'ANALYZING' ? <Loader2 className="w-4 h-4 text-blue-400 animate-spin" /> :
                             <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{decision.asset}</div>
                            <div className="text-xs text-slate-400">{decision.action}</div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="text-sm font-bold text-cyan-400">{decision.confidence}%</div>
                            <div className="text-xs text-slate-500">
                              {decision.timestamp.toLocaleTimeString()}
                            </div>
                            <div className="flex space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded hover:bg-blue-500/30 transition-colors"
                              >
                                Acknowledge
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded hover:bg-orange-500/30 transition-colors"
                              >
                                Investigate
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </ModernCard>
              <ModernCard
                title="AI Anomaly Detection"
                icon={Activity}
                status="ACTIVE"
                glow="cyan"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20"
                    >
                      <div className="text-xl font-bold text-cyan-400">98.7%</div>
                      <div className="text-xs text-slate-400">Detection Rate</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-lg border border-green-500/20"
                    >
                      <div className="text-xl font-bold text-green-400">2.1%</div>
                      <div className="text-xs text-slate-400">False Positives</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Active Behavioral Analysis</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { type: 'User Behavior', anomalies: 3, status: 'NORMAL' },
                        { type: 'Network Traffic', anomalies: 7, status: 'MONITORING' },
                        { type: 'System Access', anomalies: 1, status: 'NORMAL' },
                        { type: 'Data Access', anomalies: 5, status: 'ALERT' }
                      ].map((analysis, index) => (
                        <motion.div
                          key={analysis.type}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border text-center ${
                            analysis.status === 'NORMAL' ? 'bg-green-500/10 border-green-500/30' :
                            analysis.status === 'MONITORING' ? 'bg-yellow-500/10 border-yellow-500/30' :
                            'bg-red-500/10 border-red-500/30'
                          }`}
                        >
                          <div className="text-sm font-medium text-white">{analysis.type}</div>
                          <div className="text-lg font-bold text-cyan-400">{analysis.anomalies}</div>
                          <div className={`text-xs ${
                            analysis.status === 'NORMAL' ? 'text-green-400' :
                            analysis.status === 'MONITORING' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {analysis.status}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-slate-400">Learning Progress</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <span className="text-sm text-cyan-400">87%</span>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>
          )}

          {/* AI Operations Tab */}
          {selectedView === 'operations' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Row 1: Real-time AI Operations */}
              <ModernCard
                title="AI Decision Feed"
                icon={Bot}
                status="LIVE"
                glow="cyan"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: 'AUTONOMOUS_BLOCK',
                        asset: 'Web Server 01',
                        action: 'Blocked suspicious IP 192.168.1.100',
                        confidence: 94,
                        timestamp: new Date(Date.now() - 2 * 60 * 1000),
                        status: 'SUCCESS'
                      },
                      {
                        id: 2,
                        type: 'THREAT_ANALYSIS',
                        asset: 'Database Server',
                        action: 'Detected SQL injection attempt',
                        confidence: 87,
                        timestamp: new Date(Date.now() - 5 * 60 * 1000),
                        status: 'ANALYZING'
                      },
                      {
                        id: 3,
                        type: 'SELF_HEALING',
                        asset: 'API Gateway',
                        action: 'Applied security patch automatically',
                        confidence: 96,
                        timestamp: new Date(Date.now() - 8 * 60 * 1000),
                        status: 'SUCCESS'
                      }
                    ].map((decision) => (
                      <motion.div
                        key={decision.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center space-x-4 p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                      >
                          <div className={`p-2 rounded-lg ${
                            decision.status === 'SUCCESS' ? 'bg-green-500/20' :
                            decision.status === 'ANALYZING' ? 'bg-blue-500/20' : 'bg-yellow-500/20'
                          }`}>
                            {decision.status === 'SUCCESS' ? <CheckCircle className="w-4 h-4 text-green-400" /> :
                             decision.status === 'ANALYZING' ? <Loader2 className="w-4 h-4 text-blue-400 animate-spin" /> :
                             <AlertTriangle className="w-4 h-4 text-yellow-400" />}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{decision.asset}</div>
                            <div className="text-xs text-slate-400">{decision.action}</div>
                          </div>
                          <div className="text-right space-y-2">
                            <div className="text-sm font-bold text-cyan-400">{decision.confidence}%</div>
                            <div className="text-xs text-slate-500">
                              {decision.timestamp.toLocaleTimeString()}
                            </div>
                            <div className="flex space-x-1">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded hover:bg-blue-500/30 transition-colors"
                              >
                                Acknowledge
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded hover:bg-orange-500/30 transition-colors"
                              >
                                Investigate
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              </ModernCard>
              <ModernCard
                title="AI Anomaly Detection"
                icon={Activity}
                status="ACTIVE"
                glow="cyan"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-lg border border-cyan-500/20"
                    >
                      <div className="text-xl font-bold text-cyan-400">98.7%</div>
                      <div className="text-xs text-slate-400">Detection Rate</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-green-500/10 to-cyan-500/10 rounded-lg border border-green-500/20"
                    >
                      <div className="text-xl font-bold text-green-400">2.1%</div>
                      <div className="text-xs text-slate-400">False Positives</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Active Behavioral Analysis</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { type: 'User Behavior', anomalies: 3, status: 'NORMAL' },
                        { type: 'Network Traffic', anomalies: 7, status: 'MONITORING' },
                        { type: 'System Access', anomalies: 1, status: 'NORMAL' },
                        { type: 'Data Access', anomalies: 5, status: 'ALERT' }
                      ].map((analysis, index) => (
                        <motion.div
                          key={analysis.type}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-3 rounded-lg border text-center ${
                            analysis.status === 'NORMAL' ? 'bg-green-500/10 border-green-500/30' :
                            analysis.status === 'MONITORING' ? 'bg-yellow-500/10 border-yellow-500/30' :
                            'bg-red-500/10 border-red-500/30'
                          }`}
                        >
                          <div className="text-sm font-medium text-white">{analysis.type}</div>
                          <div className="text-lg font-bold text-cyan-400">{analysis.anomalies}</div>
                          <div className={`text-xs ${
                            analysis.status === 'NORMAL' ? 'text-green-400' :
                            analysis.status === 'MONITORING' ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {analysis.status}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-slate-400">Learning Progress</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                      </div>
                      <span className="text-sm text-cyan-400">87%</span>
                    </div>
                  </div>
                </div>
              </ModernCard>

              <ModernCard
                title="Automated Response Engine"
                icon={Zap}
                status="ENGAGED"
                glow="purple"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-3 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-lg border border-purple-500/20"
                    >
                      <div className="text-lg font-bold text-purple-400">247</div>
                      <div className="text-xs text-slate-400">Active Rules</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-3 bg-gradient-to-br from-green-500/10 to-purple-500/10 rounded-lg border border-green-500/20"
                    >
                      <div className="text-lg font-bold text-green-400">1847</div>
                      <div className="text-xs text-slate-400">Executions</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-3 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                    >
                      <div className="text-lg font-bold text-blue-400">8</div>
                      <div className="text-xs text-slate-400">Overrides</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Recent AI Responses</h4>
                    {[
                      { action: 'IP Blockade', target: '192.168.1.100', confidence: 96, time: '2m ago' },
                      { action: 'User Isolation', target: 'user@domain.com', confidence: 89, time: '5m ago' },
                      { action: 'Traffic Quarantine', target: 'API Gateway', confidence: 94, time: '8m ago' }
                    ].map((response, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{response.action}</div>
                          <div className="text-xs text-slate-400">{response.target}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-purple-400">{response.confidence}%</div>
                          <div className="text-xs text-slate-500">{response.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-purple-500/20 text-purple-400 text-xs rounded border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                    >
                      Manual Override
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30 hover:bg-green-500/30 transition-colors"
                    >
                      Review Actions
                    </motion.button>
                  </div>
                </div>
              </ModernCard>

              {/* Row 2: AI Performance & Threat Hunting */}
              <ModernCard
                title="Neural Network Performance"
                icon={Brain}
                status="OPTIMAL"
                glow="purple"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'Threat Detection', accuracy: 96.8, status: 'ACTIVE', load: 78 },
                    { name: 'Anomaly Detection', accuracy: 94.2, status: 'ACTIVE', load: 65 },
                    { name: 'Behavioral Analysis', accuracy: 91.7, status: 'TRAINING', load: 45 },
                    { name: 'Predictive Modeling', accuracy: 97.3, status: 'ACTIVE', load: 82 }
                  ].map((model, index) => (
                    <motion.div
                      key={model.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-semibold text-white">{model.name}</h4>
                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                          model.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' :
                          model.status === 'TRAINING' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {model.status}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Accuracy</span>
                            <span>{model.accuracy}%</span>
                          </div>
                          <motion.div
                            className="h-2 bg-slate-700 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: index * 0.1 + 0.3 }}
                          >
                            <motion.div
                              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${model.accuracy}%` }}
                              transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                            />
                          </motion.div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-400 mb-1">
                            <span>Load</span>
                            <span>{model.load}%</span>
                          </div>
                          <motion.div
                            className="h-2 bg-slate-700 rounded-full overflow-hidden"
                            initial={{ width: 0 }}
                            animate={{ width: '100%' }}
                            transition={{ delay: index * 0.1 + 0.6 }}
                          >
                            <motion.div
                              className={`h-full rounded-full ${
                                model.load > 80 ? 'bg-gradient-to-r from-red-500 to-orange-500' :
                                model.load > 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                                'bg-gradient-to-r from-green-500 to-blue-500'
                              }`}
                              initial={{ width: 0 }}
                              animate={{ width: `${model.load}%` }}
                              transition={{ delay: index * 0.1 + 0.8, duration: 1 }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </ModernCard>
              <ModernCard
                title="AI Threat Hunting"
                icon={Target}
                status="HUNTING"
                glow="red"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20"
                    >
                      <div className="text-xl font-bold text-red-400">12</div>
                      <div className="text-xs text-slate-400">Active Hunts</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-lg border border-orange-500/20"
                    >
                      <div className="text-xl font-bold text-orange-400">89%</div>
                      <div className="text-xs text-slate-400">Success Rate</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Current Hunting Campaigns</h4>
                    {[
                      { campaign: 'APT Detection', progress: 75, findings: 3, priority: 'HIGH' },
                      { campaign: 'Insider Threat', progress: 45, findings: 1, priority: 'MEDIUM' },
                      { campaign: 'Supply Chain', progress: 92, findings: 7, priority: 'CRITICAL' }
                    ].map((campaign, index) => (
                      <motion.div
                        key={campaign.campaign}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-3 bg-slate-800/20 rounded-lg border border-slate-700/30"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{campaign.campaign}</span>
                          <span className={`text-xs px-2 py-1 rounded ${
                            campaign.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                            campaign.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {campaign.priority}
                          </span>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Progress</span>
                            <span className="text-cyan-400">{campaign.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-1.5">
                            <div
                              className="bg-gradient-to-r from-red-500 to-orange-500 h-1.5 rounded-full"
                              style={{ width: `${campaign.progress}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs">
                            <span className="text-slate-400">Findings: {campaign.findings}</span>
                            <span className="text-green-400">Active</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-red-500/20 text-red-400 text-xs rounded border border-red-500/30 hover:bg-red-500/30 transition-colors"
                    >
                      Start New Hunt
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-2 bg-blue-500/20 text-blue-400 text-xs rounded border border-blue-500/30 hover:bg-blue-500/30 transition-colors"
                    >
                      View Results
                    </motion.button>
                  </div>
                </div>
              </ModernCard>
            </div>
          )}

          {/* Intelligence Tab */}
          {selectedView === 'intelligence' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              {/* Row 3: Analytics & Intelligence */}
              <ModernCard
                title="Global Threat Intelligence"
                icon={Globe}
                status="ACTIVE"
                glow="blue"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="text-2xl font-bold text-blue-400">{realTimeData.intelligenceSources}</div>
                      <div className="text-xs text-slate-400">Sources</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="text-2xl font-bold text-purple-400">{realTimeData.intelligenceShares.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Shares</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Recent Intelligence</h4>
                    {[
                      { source: 'NSA', type: 'APT Campaign', severity: 'HIGH', time: '2m ago' },
                      { source: 'FBI', type: 'Ransomware Alert', severity: 'CRITICAL', time: '5m ago' },
                      { source: 'Interpol', type: 'Cyber Crime Ring', severity: 'MEDIUM', time: '12m ago' }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{item.source}</div>
                          <div className="text-xs text-slate-400">{item.type}</div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded ${
                            item.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                            item.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {item.severity}
                          </span>
                          <div className="text-xs text-slate-500 mt-1">{item.time}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ModernCard>

              <ModernCard
                title="Autonomous Security Control"
                icon={Shield}
                status="ENGAGED"
                glow="green"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-lg border border-green-500/20"
                    >
                      <div className="text-xl font-bold text-green-400">{realTimeData.successRate}%</div>
                      <div className="text-xs text-slate-400">Success Rate</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20"
                    >
                      <div className="text-xl font-bold text-blue-400">{realTimeData.selfHealingEvents}</div>
                      <div className="text-xs text-slate-400">Self-Healing</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-300">Autonomy Level</span>
                      <span className="text-sm font-bold text-cyan-400">HIGH</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '85%' }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      {[
                        { label: 'Active Rules', value: '247' },
                        { label: 'Overrides', value: realTimeData.humanOverrides.toString() }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 + 0.7 }}
                          className="text-center p-3 bg-slate-800/30 rounded-lg"
                        >
                          <div className="text-lg font-bold text-white">{item.value}</div>
                          <div className="text-xs text-slate-400">{item.label}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </ModernCard>

              <ModernCard
                title="Predictive Breach Intelligence"
                icon={Target}
                status="ANALYZING"
                glow="red"
                className="lg:col-span-2 xl:col-span-2"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20"
                    >
                      <div className="text-xl font-bold text-red-400">{realTimeData.predictionConfidence.toFixed(1)}%</div>
                      <div className="text-xs text-slate-400">Confidence</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-lg border border-orange-500/20"
                    >
                      <div className="text-xl font-bold text-orange-400">{realTimeData.anomalyDetection.toFixed(1)}%</div>
                      <div className="text-xs text-slate-400">Anomaly Detection</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">High-Risk Predictions</h4>
                    {[
                      { asset: 'Database Server', risk: 89, timeToBreach: '2.3h', status: 'MONITORING' },
                      { asset: 'API Gateway', risk: 76, timeToBreach: '8.7h', status: 'ANALYZING' },
                      { asset: 'File Server', risk: 92, timeToBreach: '1.1h', status: 'CRITICAL' }
                    ].map((prediction, index) => (
                      <motion.div
                        key={prediction.asset}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-3 rounded-lg border ${
                          prediction.status === 'CRITICAL' ? 'bg-red-500/10 border-red-500/30' :
                          prediction.status === 'MONITORING' ? 'bg-yellow-500/10 border-yellow-500/30' :
                          'bg-blue-500/10 border-blue-500/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-white">{prediction.asset}</span>
                          <span className={`text-xs px-2 py-1 rounded font-bold ${
                            prediction.status === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                            prediction.status === 'MONITORING' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                            {prediction.status}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400">Risk: <span className="text-red-400 font-bold">{prediction.risk}%</span></span>
                          <span className="text-slate-400">ETA: {prediction.timeToBreach}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ModernCard>

              {/* Row 5: External Integration */}
              <ModernCard
                title="Government Integration Portal"
                icon={Building2}
                status="SECURE"
                glow="purple"
                className="xl:col-span-3 lg:col-span-2"
              >
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="text-2xl font-bold text-purple-400">{realTimeData.agencyConnections}</div>
                      <div className="text-xs text-slate-400">Connected Agencies</div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-700/50"
                    >
                      <div className="text-2xl font-bold text-green-400">{realTimeData.auditAlerts}</div>
                      <div className="text-xs text-slate-400">Active Audits</div>
                    </motion.div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-slate-300">Security Clearance Levels</h4>
                    {[
                      { level: 'TOP SECRET', agencies: 3, status: 'ACTIVE' },
                      { level: 'SECRET', agencies: 8, status: 'ACTIVE' },
                      { level: 'CONFIDENTIAL', agencies: 12, status: 'ACTIVE' }
                    ].map((clearance, index) => (
                      <motion.div
                        key={clearance.level}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center justify-between p-3 bg-slate-800/20 rounded-lg"
                      >
                        <div>
                          <div className="text-sm font-medium text-white">{clearance.level}</div>
                          <div className="text-xs text-slate-400">{clearance.agencies} agencies</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          clearance.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {clearance.status}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ModernCard>
            </div>
          )}

          {/* Analytics Tab */}
          {selectedView === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              <ModernCard
                title="Real-Time Analytics"
                icon={BarChart3}
                status="LIVE"
                glow="purple"
                className="xl:col-span-4"
              >
                <div className="space-y-6">
                  {/* Threat Trends Chart */}
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">Threat Trends (24h)</h3>
                      <div className="text-sm text-slate-400">Last 12 hours</div>
                    </div>
                    <div className="h-24 flex items-end justify-between space-x-1">
                      {[23, 31, 28, 35, 42, 38, 45, 52, 48, 41, 35, 29].map((value, index) => (
                        <div key={index} className="flex flex-col items-center flex-1">
                          <motion.div
                            className="w-full bg-gradient-to-t from-red-500 to-red-400 rounded-t"
                            style={{ height: `${(value / 60) * 100}%` }}
                            initial={{ height: 0 }}
                            animate={{ height: `${(value / 60) * 100}%` }}
                            transition={{ delay: index * 0.05, duration: 0.5 }}
                          />
                          <div className="text-xs text-slate-500 mt-1">{index + 1}h</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="text-slate-400">Peak: 52 threats</span>
                      <span className="text-red-400 font-semibold">↑ 8.2%</span>
                    </div>
                  </div>

                  {/* AI Performance Chart */}
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-semibold text-white">AI Performance</h3>
                      <div className="text-sm text-slate-400">Accuracy Trend</div>
                    </div>
                    <div className="h-24 relative">
                      <svg className="w-full h-full" viewBox="0 0 200 100">
                        <polyline
                          points="10,80 30,75 50,70 70,72 90,68 110,65 130,67 150,63 170,60 190,62"
                          fill="none"
                          stroke="#06b6d4"
                          strokeWidth="2"
                        />
                        <circle cx="190" cy="62" r="3" fill="#06b6d4" />
                      </svg>
                      <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-slate-500">
                        <span>85%</span>
                        <span>97%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-3 text-sm">
                      <span className="text-slate-400">Current: 97.3%</span>
                      <span className="text-green-400 font-semibold">↑ 2.1%</span>
                    </div>
                  </div>

                  {/* Analytics Summary */}
                  <div className="grid grid-cols-3 gap-3">
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-lg p-3 border border-slate-700/30 text-center">
                      <div className="text-lg font-bold text-red-400 mb-1">47</div>
                      <div className="text-xs text-slate-400">Threats</div>
                      <div className="text-xs text-green-400">↓ 15%</div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-lg p-3 border border-slate-700/30 text-center">
                      <div className="text-lg font-bold text-cyan-400 mb-1">0.12s</div>
                      <div className="text-xs text-slate-400">Response</div>
                      <div className="text-xs text-green-400">↓ 0.03s</div>
                    </div>
                    <div className="bg-gradient-to-br from-slate-800/40 to-slate-900/40 rounded-lg p-3 border border-slate-700/30 text-center">
                      <div className="text-lg font-bold text-green-400 mb-1">97.3%</div>
                      <div className="text-xs text-slate-400">Success</div>
                      <div className="text-xs text-green-400">↑ 1.8%</div>
                    </div>
                  </div>
                </div>
              </ModernCard>
            </div>
          )}

          {/* System Health Tab */}
          {selectedView === 'health' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
              <ModernCard
                title="System Health & Performance"
                icon={Server}
                status="HEALTHY"
                glow="green"
                className="xl:col-span-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">{realTimeData.systemUptime}</div>
                    <div className="text-sm text-slate-400">System Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-2">{realTimeData.cpuUsage}%</div>
                    <div className="text-sm text-slate-400">CPU Usage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">{realTimeData.memoryUsage}%</div>
                    <div className="text-sm text-slate-400">Memory Usage</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">{realTimeData.networkLatency}</div>
                    <div className="text-sm text-slate-400">Network Latency</div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-slate-300 mb-4">Service Status</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { name: 'AI Engine', status: 'OPERATIONAL', color: 'green' },
                      { name: 'Threat Intel', status: 'OPERATIONAL', color: 'green' },
                      { name: 'Database', status: 'OPERATIONAL', color: 'green' },
                      { name: 'Web Services', status: 'OPERATIONAL', color: 'green' }
                    ].map((service, index) => (
                      <motion.div
                        key={service.name}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 bg-slate-800/20 rounded-lg"
                      >
                        <div className={`w-3 h-3 rounded-full bg-${service.color}-400 animate-pulse`}></div>
                        <div>
                          <div className="text-sm font-medium text-white">{service.name}</div>
                          <div className={`text-xs text-${service.color}-400`}>{service.status}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </ModernCard>
            </div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="relative z-10 px-8 pb-8 text-center"
        >
          <div className="text-slate-400 text-sm">
            Advanced AI-Powered Cyber Command Center • Neural Intelligence Operations • Autonomous Defense Systems
          </div>
          <div className="text-xs text-slate-500 mt-2">
            System Status: OPERATIONAL • Global Threat Level: {realTimeData.globalThreatLevel} • AI Confidence: {realTimeData.aiConfidence.toFixed(1)}% • Last Update: {new Date().toLocaleTimeString()}
          </div>
        </motion.div>
      </div>
    </ErrorBoundary>
  );
};

export default SuperAdminDashboard;
