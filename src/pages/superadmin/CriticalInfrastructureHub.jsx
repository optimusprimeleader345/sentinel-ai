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

// Register Chart.js components
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
  BarChart,
  Bar as RechartsBar,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from 'recharts';
import {
  Shield,
  AlertTriangle,
  Globe,
  Users,
  Activity,
  Brain,
  FileCheck,
  Server,
  Zap,
  Target,
  Database,
  Settings,
  Clock,
  BarChart3,
  TrendingUp,
  RefreshCw,
  Loader2,
  Lock,
  Eye,
  EyeOff,
  Network,
  FileText,
  UserCheck,
  UserX,
  Building,
  Crown,
  Star,
  Timer,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Cpu,
  Bot,
  Play,
  Pause,
  RotateCcw,
  Radio,
  MapPin,
  Layers,
  Crosshair,
  Siren,
  ShieldAlert,
  Zap as ZapIcon,
  Radio as RadioIcon,
  Camera,
  Wifi,
  Power,
  Droplets,
  Truck,
  Heart,
  Factory,
  Banknote,
  Plane,
  Train,
  Ship,
  Satellite,
  MonitorSpeaker,
  HardDrive,
  Cpu as CpuIcon,
  CircuitBoard,
  Eye as EyeIcon,
  Sparkles,
  Gauge,
  Thermometer,
  Wind,
  CloudRain,
  ZapIcon as Lightning,
  Flame,
  Snowflake,
  Sun,
  Moon,
  Star as StarIcon,
  Waves,
  TestTube,
  Radiation,
  Fuel
} from 'lucide-react';

// 🔒 CRITICAL INFRASTRUCTURE PROTECTION HUB - SUPER ADMIN ONLY
// AI-POWERED NATIONAL CRITICAL INFRASTRUCTURE MONITORING & DEFENSE
// REAL-TIME THREAT DETECTION & AUTOMATED PROTECTION SYSTEMS

const CriticalInfrastructureHub = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-red-900 via-slate-950 to-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
        {/* Premium Background Effects */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-red-500/40 to-slate-500/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-slate-600/35 to-red-600/35 rounded-full blur-3xl"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full relative z-20"
        >
          <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-600/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Critical Infrastructure Protection Hub. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-red-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔄 STATE MANAGEMENT
  const [loading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeSection, setActiveSection] = useState('infrastructure-overview');
  const [infrastructureData, setInfrastructureData] = useState(null);
  const [realTimeAlerts, setRealTimeAlerts] = useState([]);
  const [selectedSector, setSelectedSector] = useState(null);
  const [threatLevel, setThreatLevel] = useState('ELEVATED');
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 📊 ANALYTICS DATA
  const [analyticsData, setAnalyticsData] = useState(null);
  const [threatTrendData, setThreatTrendData] = useState([]);
  const [uptimeData, setUptimeData] = useState([]);
  const [aiMetrics, setAiMetrics] = useState([]);

  // 📊 DATA GENERATION FUNCTIONS
  const generateThreatTrendData = () => {
    const days = 30;
    const data = [];
    let baseThreats = 15;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      // Add some realistic variation
      const variation = (Math.random() - 0.5) * 8;
      const threats = Math.max(0, Math.round(baseThreats + variation));

      data.push({
        date: date.toISOString().split('T')[0],
        threats: threats,
        mitigated: Math.round(threats * 0.85),
        detected: threats
      });

      // Gradually increase baseline over time
      baseThreats += Math.random() * 0.5;
    }

    return data;
  };

  const generateSectorPerformanceData = () => {
    return infrastructureSectors.map(sector => ({
      name: sector.name,
      assets: sector.assets,
      uptime: sector.uptime,
      threats: sector.threats,
      aiConfidence: sector.aiConfidence,
      risk: sector.risk === 'critical' ? 4 : sector.risk === 'high' ? 3 : sector.risk === 'medium' ? 2 : 1
    }));
  };

  const generateUptimeData = () => {
    const hours = 24;
    const data = [];

    for (let i = hours - 1; i >= 0; i--) {
      const hour = new Date();
      hour.setHours(hour.getHours() - i);

      // Generate realistic uptime data with occasional dips
      let uptime = 99.8;
      if (Math.random() < 0.1) { // 10% chance of maintenance/dip
        uptime = 95 + Math.random() * 4; // 95-99%
      }

      data.push({
        hour: hour.getHours(),
        uptime: Math.round(uptime * 10) / 10,
        timestamp: hour.toLocaleTimeString()
      });
    }

    return data;
  };

  const generateAIMetrics = () => {
    const days = 7;
    const data = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);

      data.push({
        date: date.toISOString().split('T')[0],
        accuracy: 94 + Math.random() * 4, // 94-98%
        responseTime: 1.5 + Math.random() * 1.5, // 1.5-3s
        predictions: Math.floor(150 + Math.random() * 100),
        falsePositives: Math.floor(2 + Math.random() * 5)
      });
    }

    return data;
  };

  // Handle refresh - MUST BE BEFORE ANY CONDITIONAL RETURNS
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setLastUpdated(new Date());

      // Update analytics data
      const newAnalyticsData = {
        threatTrends: generateThreatTrendData(),
        sectorPerformance: generateSectorPerformanceData(),
        uptimeMetrics: generateUptimeData(),
        aiInsights: generateAIMetrics()
      };
      setAnalyticsData(newAnalyticsData);

    } catch (error) {
      console.error('Refresh failed:', error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);



  // 🏗️ CRITICAL INFRASTRUCTURE SECTORS DATA
  const infrastructureSectors = [
    {
      id: 'power',
      name: 'Power Grid',
      icon: Zap,
      assets: 247,
      uptime: 99.7,
      threats: 3,
      color: 'yellow',
      status: 'warning',
      description: 'Electrical power generation and distribution systems',
      risk: 'high',
      lastIncident: '2024-01-05T14:30:00Z',
      aiConfidence: 94.2
    },
    {
      id: 'water',
      name: 'Water Systems',
      icon: Droplets,
      assets: 189,
      uptime: 99.8,
      threats: 1,
      color: 'blue',
      status: 'normal',
      description: 'Water treatment and distribution infrastructure',
      risk: 'medium',
      lastIncident: '2024-01-03T09:15:00Z',
      aiConfidence: 97.1
    },
    {
      id: 'transportation',
      name: 'Transportation',
      icon: Truck,
      assets: 456,
      uptime: 98.9,
      threats: 7,
      color: 'green',
      status: 'critical',
      description: 'Road, rail, air, and maritime transportation systems',
      risk: 'high',
      lastIncident: '2024-01-06T11:45:00Z',
      aiConfidence: 89.3
    },
    {
      id: 'healthcare',
      name: 'Healthcare',
      icon: Heart,
      assets: 312,
      uptime: 99.9,
      threats: 2,
      color: 'red',
      status: 'normal',
      description: 'Hospitals, clinics, and medical infrastructure',
      risk: 'low',
      lastIncident: '2024-01-02T16:20:00Z',
      aiConfidence: 98.7
    },
    {
      id: 'finance',
      name: 'Financial',
      icon: Banknote,
      assets: 178,
      uptime: 99.95,
      threats: 1,
      color: 'purple',
      status: 'normal',
      description: 'Banking and financial transaction systems',
      risk: 'medium',
      lastIncident: '2024-01-04T13:10:00Z',
      aiConfidence: 96.8
    },
    {
      id: 'communications',
      name: 'Communications',
      icon: Radio,
      assets: 423,
      uptime: 99.6,
      threats: 5,
      color: 'cyan',
      status: 'warning',
      description: 'Telecommunications and internet infrastructure',
      risk: 'high',
      lastIncident: '2024-01-05T18:30:00Z',
      aiConfidence: 92.4
    },
    {
      id: 'aviation',
      name: 'Aviation',
      icon: Plane,
      assets: 98,
      uptime: 99.8,
      threats: 2,
      color: 'indigo',
      status: 'normal',
      description: 'Airports, air traffic control, and aviation systems',
      risk: 'medium',
      lastIncident: '2024-01-01T08:45:00Z',
      aiConfidence: 95.6
    },
    {
      id: 'rail',
      name: 'Rail Systems',
      icon: Train,
      assets: 156,
      uptime: 99.4,
      threats: 3,
      color: 'orange',
      status: 'warning',
      description: 'Railway transportation and signaling systems',
      risk: 'medium',
      lastIncident: '2024-01-04T22:15:00Z',
      aiConfidence: 93.1
    },
    {
      id: 'maritime',
      name: 'Maritime',
      icon: Ship,
      assets: 87,
      uptime: 99.2,
      threats: 1,
      color: 'teal',
      status: 'normal',
      description: 'Ports, shipping, and maritime navigation systems',
      risk: 'low',
      lastIncident: '2023-12-28T14:20:00Z',
      aiConfidence: 97.8
    },
    {
      id: 'manufacturing',
      name: 'Manufacturing',
      icon: Factory,
      assets: 234,
      uptime: 98.7,
      threats: 4,
      color: 'pink',
      status: 'critical',
      description: 'Industrial manufacturing and production facilities',
      risk: 'high',
      lastIncident: '2024-01-06T07:30:00Z',
      aiConfidence: 88.9
    },
    {
      id: 'emergency',
      name: 'Emergency Services',
      icon: Siren,
      assets: 167,
      uptime: 99.9,
      threats: 0,
      color: 'red',
      status: 'normal',
      description: 'Emergency response and public safety systems',
      risk: 'low',
      lastIncident: '2023-12-25T12:00:00Z',
      aiConfidence: 99.1
    },
    {
      id: 'government',
      name: 'Government',
      icon: Building,
      assets: 145,
      uptime: 99.8,
      threats: 2,
      color: 'slate',
      status: 'normal',
      description: 'Government buildings and administrative systems',
      risk: 'medium',
      lastIncident: '2024-01-03T10:45:00Z',
      aiConfidence: 96.3
    },
    {
      id: 'satellite',
      name: 'Satellite Systems',
      icon: Satellite,
      assets: 23,
      uptime: 99.99,
      threats: 0,
      color: 'violet',
      status: 'normal',
      description: 'Satellite communications and GPS systems',
      risk: 'low',
      lastIncident: '2023-12-20T09:15:00Z',
      aiConfidence: 99.4
    },
    {
      id: 'data-centers',
      name: 'Data Centers',
      icon: HardDrive,
      assets: 89,
      uptime: 99.9,
      threats: 3,
      color: 'emerald',
      status: 'warning',
      description: 'Critical data centers and cloud infrastructure',
      risk: 'high',
      lastIncident: '2024-01-05T16:20:00Z',
      aiConfidence: 91.7
    },
    {
      id: 'nuclear',
      name: 'Nuclear Facilities',
      icon: Radiation,
      assets: 12,
      uptime: 100,
      threats: 0,
      color: 'yellow',
      status: 'normal',
      description: 'Nuclear power plants and research facilities',
      risk: 'critical',
      lastIncident: '2023-11-15T00:00:00Z',
      aiConfidence: 99.8
    },
    {
      id: 'chemical',
      name: 'Chemical Plants',
      icon: TestTube,
      assets: 67,
      uptime: 99.5,
      threats: 2,
      color: 'lime',
      status: 'warning',
      description: 'Chemical processing and storage facilities',
      risk: 'high',
      lastIncident: '2024-01-02T14:30:00Z',
      aiConfidence: 94.5
    },
    {
      id: 'dams',
      name: 'Dams & Reservoirs',
      icon: Waves,
      assets: 45,
      uptime: 99.7,
      threats: 1,
      color: 'sky',
      status: 'normal',
      description: 'Dam infrastructure and water management systems',
      risk: 'high',
      lastIncident: '2024-01-01T06:45:00Z',
      aiConfidence: 97.2
    },
    {
      id: 'pipelines',
      name: 'Oil & Gas Pipelines',
      icon: Fuel,
      assets: 123,
      uptime: 99.3,
      threats: 4,
      color: 'amber',
      status: 'critical',
      description: 'Oil, gas, and fuel transportation pipelines',
      risk: 'high',
      lastIncident: '2024-01-06T13:15:00Z',
      aiConfidence: 90.3
    }
  ];

  // 🛡️ SAFE DATA LOADING
  useEffect(() => {
    // Initialize analytics data immediately
    const initialAnalyticsData = {
      threatTrends: generateThreatTrendData(),
      sectorPerformance: generateSectorPerformanceData(),
      uptimeMetrics: generateUptimeData(),
      aiInsights: generateAIMetrics()
    };
    setAnalyticsData(initialAnalyticsData);

    const loadInfrastructureData = async () => {
      try {
        setLoading(true);

        // Simulate API calls with realistic delays
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Mock comprehensive infrastructure monitoring data
        const totalAssets = infrastructureSectors.reduce((sum, sector) => sum + sector.assets, 0);
        const totalThreats = infrastructureSectors.reduce((sum, sector) => sum + sector.threats, 0);
        const averageUptime = infrastructureSectors.reduce((sum, sector) => sum + sector.uptime, 0) / infrastructureSectors.length;
        const averageAIConfidence = infrastructureSectors.reduce((sum, sector) => sum + sector.aiConfidence, 0) / infrastructureSectors.length;

        setInfrastructureData({
          totalAssets,
          activeThreats: totalThreats,
          averageUptime: averageUptime.toFixed(1),
          aiConfidence: averageAIConfidence.toFixed(1),
          lastUpdate: new Date().toISOString(),
          criticalSectors: infrastructureSectors.filter(s => s.status === 'critical').length,
          warningSectors: infrastructureSectors.filter(s => s.status === 'warning').length,
          normalSectors: infrastructureSectors.filter(s => s.status === 'normal').length,
          sectors: infrastructureSectors,
          threatIntelligence: {
            activeAttacks: Math.floor(totalThreats * 0.3),
            potentialThreats: Math.floor(totalThreats * 2.5),
            mitigatedIncidents: Math.floor(totalThreats * 8),
            falsePositives: Math.floor(totalThreats * 0.1)
          },
          aiInsights: {
            predictiveAccuracy: 95.7,
            anomalyDetection: 97.3,
            automatedResponses: 87,
            humanOverrides: 13
          },
          performance: {
            responseTime: '2.3s',
            detectionAccuracy: 98.4,
            falsePositiveRate: 1.6,
            systemAvailability: 99.99
          }
        });

      } catch (err) {
        console.error('Infrastructure Data Loading Error:', err);
      } finally {
        setLoading(false);
      }
    };

    loadInfrastructureData();

    // Simulate real-time alerts and threat level updates
    const alertInterval = setInterval(() => {
      const alerts = [
        { id: Date.now(), type: 'threat', severity: 'high', message: 'Potential DDoS attack detected on transportation sector', sector: 'transportation', timestamp: new Date() },
        { id: Date.now() + 1, type: 'anomaly', severity: 'medium', message: 'Unusual traffic pattern in manufacturing facility', sector: 'manufacturing', timestamp: new Date() },
        { id: Date.now() + 2, type: 'maintenance', severity: 'low', message: 'Scheduled security audit completed in data center', sector: 'data-centers', timestamp: new Date() },
        { id: Date.now() + 3, type: 'threat', severity: 'critical', message: 'Advanced persistent threat detected in financial sector', sector: 'finance', timestamp: new Date() }
      ];
      setRealTimeAlerts(prev => [...prev.slice(-6), ...alerts]);

      // Update threat level based on critical alerts
      const criticalAlerts = alerts.filter(a => a.severity === 'critical').length;
      if (criticalAlerts > 0) {
        setThreatLevel('critical');
      } else if (alerts.some(a => a.severity === 'high')) {
        setThreatLevel('high');
      } else {
        setThreatLevel('normal');
      }
    }, 8000);

    return () => clearInterval(alertInterval);
  }, []);

  // 🎯 INFRASTRUCTURE GLASS CARD COMPONENT - CYBERPUNK THEME
  const InfrastructureGlassCard = ({ children, title, icon: Icon, status, threatLevel, sector, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(59,130,246,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(34,211,238,0.6)] ${
              sector ? getSectorColor(sector) : 'text-cyan-400'
            }`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {threatLevel && (
              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                threatLevel === 'critical' ? 'bg-red-500/30 text-red-300 border border-red-500/50' :
                threatLevel === 'high' ? 'bg-orange-500/30 text-orange-300 border border-orange-500/50' :
                threatLevel === 'medium' ? 'bg-yellow-500/30 text-yellow-300 border border-yellow-500/50' :
                'bg-green-500/30 text-green-300 border border-green-500/50'
              }`}>
                {threatLevel.toUpperCase()}
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

  // 🎨 GET SECTOR COLOR UTILITY
  const getSectorColor = (sectorId) => {
    const sector = infrastructureSectors.find(s => s.id === sectorId);
    return sector ? `text-${sector.color}-400` : 'text-cyan-400';
  };





  // 📊 MAIN CRITICAL INFRASTRUCTURE PROTECTION HUB INTERFACE
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-900 via-pink-900 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Neon Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-pink-600/35 to-fuchsia-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-fuchsia-400/30 to-purple-400/30 rounded-full blur-3xl"></div>
        <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-gradient-to-r from-pink-400/25 to-violet-400/25 rounded-full blur-2xl"></div>
      </div>

      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative z-20">
        {/* Premium Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-6">
            {/* Infrastructure Protection Badge */}
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30 ring-2 ring-blue-400/50">
                <Shield className="w-8 h-8 text-white" />
              </div>
              {/* Pulsing Indicator */}
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-75"></div>
            </div>

            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
                Critical Infrastructure Protection Hub
              </h1>
              <p className="text-blue-200/80 text-sm font-medium">AI-Powered National Critical Infrastructure Monitoring & Automated Defense</p>

              {/* Status Indicators */}
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${threatLevel === 'CRITICAL' ? 'bg-red-400 animate-pulse' : threatLevel === 'HIGH' ? 'bg-orange-400' : 'bg-blue-400'}`}></div>
                  <span className="text-xs text-slate-300">Threat Level: <span className={`font-semibold ${threatLevel === 'CRITICAL' ? 'text-red-400' : threatLevel === 'HIGH' ? 'text-orange-400' : 'text-blue-400'}`}>{threatLevel}</span></span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                  <span className="text-xs text-slate-300">System Status: <span className="font-semibold text-green-400">PROTECTED</span></span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Live Status Panel */}
            <div className="bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-lg p-3">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <Activity className="w-4 h-4 text-green-400 animate-pulse" />
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
              className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 flex items-center space-x-2 shadow-lg shadow-cyan-500/25"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh Data'}</span>
            </button>
          </div>
        </motion.div>

        {/* Command Center Tabs */}
        <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
          {[
            { id: 'infrastructure-overview', label: 'Infrastructure Overview', icon: Shield },
            { id: 'threat-monitoring', label: 'Threat Monitoring', icon: AlertTriangle },
            { id: 'ai-insights', label: 'AI Insights', icon: Brain },
            { id: 'response-coordination', label: 'Response Coordination', icon: Users },
            { id: 'performance-analytics', label: 'Performance Analytics', icon: BarChart3 }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
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
          {activeSection === 'infrastructure-overview' && (
            <motion.div
              key="infrastructure-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Infrastructure Sector Grid */}
              <InfrastructureGlassCard title="Critical Infrastructure Sectors" icon={Layers} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {infrastructureSectors.map((sector) => {
                    const Icon = sector.icon;
                    return (
                      <motion.div
                        key={sector.id}
                        whileHover={{ scale: 1.02 }}
                        className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                          selectedSector === sector.id
                            ? 'border-cyan-500/50 bg-cyan-500/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                            : 'border-slate-700/50 bg-slate-800/30 hover:border-slate-600/50'
                        }`}
                        onClick={() => setSelectedSector(selectedSector === sector.id ? null : sector.id)}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <Icon className={`w-8 h-8 text-${sector.color}-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.4)]`} />
                          <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm">{sector.name}</h4>
                            <div className={`text-xs ${
                              sector.status === 'critical' ? 'text-red-400' :
                              sector.status === 'warning' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {sector.status.toUpperCase()}
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="text-slate-400">Assets: <span className="text-white">{sector.assets}</span></div>
                          <div className="text-slate-400">Uptime: <span className="text-green-400">{sector.uptime}%</span></div>
                          <div className="text-slate-400">Threats: <span className="text-red-400">{sector.threats}</span></div>
                          <div className="text-slate-400">AI: <span className="text-purple-400">{sector.aiConfidence}%</span></div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </InfrastructureGlassCard>

              {/* Selected Sector Details */}
              {selectedSector && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <InfrastructureGlassCard
                    title={`${infrastructureSectors.find(s => s.id === selectedSector)?.name} Sector Details`}
                    icon={infrastructureSectors.find(s => s.id === selectedSector)?.icon}
                    threatLevel={infrastructureSectors.find(s => s.id === selectedSector)?.risk}
                    status="ACTIVE"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-semibold mb-2">Sector Overview</h4>
                          <p className="text-slate-400 text-sm">
                            {infrastructureSectors.find(s => s.id === selectedSector)?.description}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-cyan-400">
                              {infrastructureSectors.find(s => s.id === selectedSector)?.assets}
                            </div>
                            <div className="text-xs text-slate-400">Total Assets</div>
                          </div>
                          <div className="bg-slate-800/50 rounded-lg p-3">
                            <div className="text-2xl font-bold text-green-400">
                              {infrastructureSectors.find(s => s.id === selectedSector)?.uptime}%
                            </div>
                            <div className="text-xs text-slate-400">Uptime</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Risk Assessment</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Risk Level:</span>
                            <span className={`font-semibold ${
                              infrastructureSectors.find(s => s.id === selectedSector)?.risk === 'critical' ? 'text-red-400' :
                              infrastructureSectors.find(s => s.id === selectedSector)?.risk === 'high' ? 'text-orange-400' :
                              'text-green-400'
                            }`}>
                              {infrastructureSectors.find(s => s.id === selectedSector)?.risk.toUpperCase()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Active Threats:</span>
                            <span className="text-red-400 font-semibold">
                              {infrastructureSectors.find(s => s.id === selectedSector)?.threats}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">AI Confidence:</span>
                            <span className="text-purple-400 font-semibold">
                              {infrastructureSectors.find(s => s.id === selectedSector)?.aiConfidence}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Recent Activity</h4>
                        <div className="space-y-2">
                          <div className="text-sm text-slate-400">
                            Last Incident: {new Date(infrastructureSectors.find(s => s.id === selectedSector)?.lastIncident).toLocaleString()}
                          </div>
                          <div className="text-sm text-slate-400">
                            Status: {infrastructureSectors.find(s => s.id === selectedSector)?.status.toUpperCase()}
                          </div>
                        </div>
                        <button className="w-full px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm">
                          View Detailed Report
                        </button>
                      </div>
                    </div>
                  </InfrastructureGlassCard>
                </motion.div>
              )}

              {/* Real-time Alerts */}
              <InfrastructureGlassCard title="Real-time Infrastructure Alerts" icon={Radio} status="LIVE">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {realTimeAlerts.slice(-5).map((alert) => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`p-3 rounded-lg border ${
                        alert.severity === 'critical' ? 'bg-red-500/10 border-red-500/30' :
                        alert.severity === 'high' ? 'bg-orange-500/10 border-orange-500/30' :
                        alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
                        'bg-blue-500/10 border-blue-500/30'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full ${
                            alert.severity === 'critical' ? 'bg-red-400' :
                            alert.severity === 'high' ? 'bg-orange-400' :
                            alert.severity === 'medium' ? 'bg-yellow-400' :
                            'bg-blue-400'
                          }`}></div>
                          <div>
                            <div className="text-white font-medium text-sm">{alert.message}</div>
                            <div className="text-slate-400 text-xs">
                              {alert.sector} • {alert.timestamp.toLocaleTimeString()}
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                          alert.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                          alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </InfrastructureGlassCard>
            </motion.div>
          )}

          {activeSection === 'threat-monitoring' && (
            <motion.div
              key="threat-monitoring"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Threat Intelligence Dashboard */}
              <InfrastructureGlassCard title="AI-Powered Threat Intelligence" icon={AlertTriangle} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                  <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <Target className="w-12 h-12 text-red-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-red-400 mb-1">{infrastructureData?.threatIntelligence?.activeAttacks}</div>
                    <div className="text-sm text-slate-400">Active Attacks</div>
                  </div>
                  <div className="text-center p-6 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                    <EyeIcon className="w-12 h-12 text-orange-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-orange-400 mb-1">{infrastructureData?.threatIntelligence?.potentialThreats}</div>
                    <div className="text-sm text-slate-400">Potential Threats</div>
                  </div>
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">{infrastructureData?.threatIntelligence?.mitigatedIncidents}</div>
                    <div className="text-sm text-slate-400">Mitigated</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <CheckCircle className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">{infrastructureData?.threatIntelligence?.falsePositives}</div>
                    <div className="text-sm text-slate-400">False Positives</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Threat Detection Accuracy</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">True Positives:</span>
                        <span className="text-green-400">98.4%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">False Negatives:</span>
                        <span className="text-red-400">1.6%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Detection Speed:</span>
                        <span className="text-cyan-400">2.3 seconds</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Coverage:</span>
                        <span className="text-purple-400">100%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Automated Response Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                        Activate Emergency Protocol
                      </button>
                      <button className="w-full px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors">
                        Isolate Affected Systems
                      </button>
                      <button className="w-full px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors">
                        Deploy Honeypots
                      </button>
                      <button className="w-full px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors">
                        Update Threat Intelligence
                      </button>
                    </div>
                  </div>
                </div>
              </InfrastructureGlassCard>

              {/* Threat Map Visualization */}
              <InfrastructureGlassCard title="Global Infrastructure Threat Map" icon={Globe} status="INTERACTIVE">
                <div className="h-96 bg-slate-900/50 rounded-lg border border-slate-700/50 flex items-center justify-center">
                  <div className="text-center">
                    <Globe className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                    <h3 className="text-white font-semibold mb-2">Interactive Threat Visualization</h3>
                    <p className="text-slate-400 text-sm mb-4">Real-time global infrastructure threat mapping with predictive analytics</p>
                    <div className="flex space-x-4 justify-center">
                      <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors text-sm">
                        View 3D Map
                      </button>
                      <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm">
                        Threat Overlay
                      </button>
                    </div>
                  </div>
                </div>
              </InfrastructureGlassCard>
            </motion.div>
          )}

          {activeSection === 'ai-insights' && (
            <motion.div
              key="ai-insights"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* AI Accuracy Trend Analytics */}
              <InfrastructureGlassCard title="AI Performance Trends (7 Days)" icon={Brain} status="LEARNING">
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { date: 'Day 1', accuracy: 94.2 },
                      { date: 'Day 2', accuracy: 95.8 },
                      { date: 'Day 3', accuracy: 96.1 },
                      { date: 'Day 4', accuracy: 95.4 },
                      { date: 'Day 5', accuracy: 97.2 },
                      { date: 'Day 6', accuracy: 96.8 },
                      { date: 'Day 7', accuracy: 97.5 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="date"
                        stroke="#9ca3af"
                        fontSize={12}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        domain={[90, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#f9fafb'
                        }}
                      />
                      <RechartsLine
                        type="monotone"
                        dataKey="accuracy"
                        stroke="#a855f7"
                        strokeWidth={3}
                        name="AI Accuracy (%)"
                        dot={{ fill: '#a855f7', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">
                      96.7%
                    </div>
                    <div className="text-sm text-slate-400">Avg Accuracy (7d)</div>
                  </div>
                  <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-cyan-400">
                      2.1s
                    </div>
                    <div className="text-sm text-slate-400">Avg Response Time</div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      1,247
                    </div>
                    <div className="text-sm text-slate-400">Predictions Made</div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">
                      23
                    </div>
                    <div className="text-sm text-slate-400">False Positives</div>
                  </div>
                </div>
              </InfrastructureGlassCard>

              {/* AI Learning Progress Analytics */}
              <InfrastructureGlassCard title="AI Learning & Adaptation Metrics" icon={Sparkles} status="EVOLVING">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">Model Performance Scores</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Threat Detection Model</span>
                          <span className="text-red-400 font-semibold">97.8%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-red-500 h-3 rounded-full" style={{ width: '97.8%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Anomaly Classification</span>
                          <span className="text-blue-400 font-semibold">95.3%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: '95.3%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Predictive Analytics</span>
                          <span className="text-purple-400 font-semibold">94.7%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-purple-500 h-3 rounded-full" style={{ width: '94.7%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Behavioral Analysis</span>
                          <span className="text-green-400 font-semibold">98.2%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '98.2%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-4">AI Confidence Levels</h4>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">High Confidence Alerts</span>
                          <span className="text-green-400 font-semibold">87.3%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-green-500 h-3 rounded-full" style={{ width: '87.3%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Medium Confidence Alerts</span>
                          <span className="text-yellow-400 font-semibold">11.2%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-yellow-500 h-3 rounded-full" style={{ width: '11.2%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">Low Confidence Alerts</span>
                          <span className="text-red-400 font-semibold">1.5%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-red-500 h-3 rounded-full" style={{ width: '1.5%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-slate-400">False Positive Rate</span>
                          <span className="text-blue-400 font-semibold">2.1%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div className="bg-blue-500 h-3 rounded-full" style={{ width: '2.1%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Learning Metrics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Training Data Points:</span>
                        <span className="text-cyan-400">2.4M</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Model Updates:</span>
                        <span className="text-green-400">47</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Retraining Cycles:</span>
                        <span className="text-purple-400">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Accuracy Improvement:</span>
                        <span className="text-yellow-400">+3.2%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">AI Response Efficiency</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Avg Detection Time:</span>
                        <span className="text-blue-400">1.8s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Response Accuracy:</span>
                        <span className="text-green-400">96.7%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Automation Rate:</span>
                        <span className="text-purple-400">89.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Human Overrides:</span>
                        <span className="text-orange-400">10.7%</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">AI Recommendations</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <div className="text-red-400 font-semibold text-sm">URGENT</div>
                        <div className="text-white text-sm">Deploy advanced ML model for transportation sector</div>
                      </div>
                      <div className="p-3 bg-orange-500/10 border border-orange-500/30 rounded-lg">
                        <div className="text-orange-400 font-semibold text-sm">HIGH</div>
                        <div className="text-white text-sm">Update anomaly detection parameters</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                        <div className="text-blue-400 font-semibold text-sm">INFO</div>
                        <div className="text-white text-sm">Schedule model retraining next week</div>
                      </div>
                    </div>
                  </div>
                </div>
              </InfrastructureGlassCard>

              {/* AI Model Performance Radar */}
              <InfrastructureGlassCard title="AI Model Performance Analysis" icon={Target} status="ANALYZING">
                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={[
                      { subject: 'Accuracy', A: 97, B: 95 },
                      { subject: 'Speed', A: 92, B: 88 },
                      { subject: 'Reliability', A: 98, B: 94 },
                      { subject: 'Adaptability', A: 89, B: 85 },
                      { subject: 'Precision', A: 96, B: 93 },
                      { subject: 'Scalability', A: 94, B: 91 }
                    ]}>
                      <PolarGrid stroke="#374151" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                      <PolarRadiusAxis
                        angle={90}
                        domain={[0, 100]}
                        tick={{ fill: '#9ca3af', fontSize: 10 }}
                      />
                      <Radar
                        name="Current Model"
                        dataKey="A"
                        stroke="#a855f7"
                        fill="#a855f7"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                      <Radar
                        name="Baseline Model"
                        dataKey="B"
                        stroke="#06b6d4"
                        fill="#06b6d4"
                        fillOpacity={0.1}
                        strokeWidth={1}
                      />
                      <RechartsLegend />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#f9fafb'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </InfrastructureGlassCard>
            </motion.div>
          )}

          {activeSection === 'response-coordination' && (
            <motion.div
              key="response-coordination"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Response Coordination Center */}
              <InfrastructureGlassCard title="Automated Response Coordination" icon={Users} status="READY">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                    <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-400 mb-1">{infrastructureData?.performance?.responseTime}</div>
                    <div className="text-sm text-slate-400">Average Response Time</div>
                  </div>
                  <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                    <Gauge className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-blue-400 mb-1">{infrastructureData?.performance?.detectionAccuracy}%</div>
                    <div className="text-sm text-slate-400">Detection Accuracy</div>
                  </div>
                  <div className="p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg text-center">
                    <Shield className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-purple-400 mb-1">{infrastructureData?.performance?.systemAvailability}%</div>
                    <div className="text-sm text-slate-400">System Availability</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Active Response Teams</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                        <div>
                          <div className="text-white font-medium text-sm">Cyber Defense Team</div>
                          <div className="text-slate-400 text-xs">12 members active</div>
                        </div>
                        <span className="text-green-400 text-sm">ENGAGED</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                        <div>
                          <div className="text-white font-medium text-sm">Infrastructure Engineers</div>
                          <div className="text-slate-400 text-xs">8 members on standby</div>
                        </div>
                        <span className="text-yellow-400 text-sm">STANDBY</span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-slate-800/50 rounded">
                        <div>
                          <div className="text-white font-medium text-sm">Emergency Response</div>
                          <div className="text-slate-400 text-xs">24/7 on call</div>
                        </div>
                        <span className="text-blue-400 text-sm">MONITORING</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Emergency Protocols</h4>
                    <div className="space-y-2">
                      <button className="w-full px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded transition-colors">
                        🚨 Activate National Emergency Protocol
                      </button>
                      <button className="w-full px-3 py-2 bg-orange-600 hover:bg-orange-700 text-white text-sm rounded transition-colors">
                        📢 Broadcast Emergency Alert
                      </button>
                      <button className="w-full px-3 py-2 bg-yellow-600 hover:bg-yellow-700 text-white text-sm rounded transition-colors">
                        🔄 Initiate Failover Procedures
                      </button>
                      <button className="w-full px-3 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors">
                        📋 Generate Incident Report
                      </button>
                    </div>
                  </div>
                </div>
              </InfrastructureGlassCard>
            </motion.div>
          )}

          {activeSection === 'performance-analytics' && (
            <motion.div
              key="performance-analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Threat Trend Analytics */}
              <InfrastructureGlassCard title="Threat Trend Analysis (30 Days)" icon={TrendingUp} status="REAL-TIME">
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData?.threatTrends || generateThreatTrendData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="date"
                        stroke="#9ca3af"
                        fontSize={12}
                        tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#f9fafb'
                        }}
                        labelFormatter={(value) => new Date(value).toLocaleDateString()}
                      />
                      <RechartsLegend />
                      <RechartsLine
                        type="monotone"
                        dataKey="threats"
                        stroke="#ef4444"
                        strokeWidth={3}
                        name="Detected Threats"
                        dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }}
                      />
                      <RechartsLine
                        type="monotone"
                        dataKey="mitigated"
                        stroke="#10b981"
                        strokeWidth={2}
                        name="Mitigated Threats"
                        dot={{ fill: '#10b981', strokeWidth: 2, r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-red-400">
                      {analyticsData?.threatTrends?.reduce((sum, day) => sum + day.threats, 0) || 0}
                    </div>
                    <div className="text-sm text-slate-400">Total Threats (30d)</div>
                  </div>
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      {Math.round((analyticsData?.threatTrends?.reduce((sum, day) => sum + day.mitigated, 0) || 0) /
                                  (analyticsData?.threatTrends?.reduce((sum, day) => sum + day.threats, 0) || 1) * 100)}%
                    </div>
                    <div className="text-sm text-slate-400">Mitigation Rate</div>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">
                      {analyticsData?.threatTrends?.slice(-7).reduce((sum, day) => sum + day.threats, 0) || 0}
                    </div>
                    <div className="text-sm text-slate-400">Threats (Last 7d)</div>
                  </div>
                </div>
              </InfrastructureGlassCard>

              {/* Sector Performance Analytics */}
              <InfrastructureGlassCard title="Sector Performance Analytics" icon={BarChart3} status="ANALYZING">
                <div className="h-80 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={analyticsData?.sectorPerformance || generateSectorPerformanceData()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="name"
                        stroke="#9ca3af"
                        fontSize={11}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                        interval={0}
                      />
                      <YAxis stroke="#9ca3af" fontSize={12} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#f9fafb'
                        }}
                      />
                      <RechartsLegend />
                      <RechartsBar dataKey="uptime" fill="#10b981" name="Uptime %" radius={[4, 4, 0, 0]} />
                      <RechartsBar dataKey="threats" fill="#ef4444" name="Active Threats" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-semibold mb-3">Top Performing Sectors</h4>
                    <div className="space-y-2">
                      {(analyticsData?.sectorPerformance || generateSectorPerformanceData())
                        .sort((a, b) => b.uptime - a.uptime)
                        .slice(0, 5)
                        .map((sector, index) => (
                          <div key={sector.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                                index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                                index === 1 ? 'bg-slate-500/20 text-slate-400' :
                                index === 2 ? 'bg-amber-500/20 text-amber-400' :
                                'bg-slate-600/20 text-slate-400'
                              }`}>
                                {index + 1}
                              </div>
                              <div>
                                <div className="text-white text-sm font-medium">{sector.name}</div>
                                <div className="text-slate-400 text-xs">{sector.assets} assets</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-green-400 font-semibold">{sector.uptime}%</div>
                              <div className="text-red-400 text-xs">{sector.threats} threats</div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-white font-semibold mb-3">Risk Distribution</h4>
                    <div className="h-48">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Critical', value: infrastructureSectors.filter(s => s.risk === 'critical').length, color: '#ef4444' },
                              { name: 'High', value: infrastructureSectors.filter(s => s.risk === 'high').length, color: '#f97316' },
                              { name: 'Medium', value: infrastructureSectors.filter(s => s.risk === 'medium').length, color: '#eab308' },
                              { name: 'Low', value: infrastructureSectors.filter(s => s.risk === 'low').length, color: '#22c55e' }
                            ]}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={80}
                            dataKey="value"
                          >
                            {[
                              { name: 'Critical', value: infrastructureSectors.filter(s => s.risk === 'critical').length, color: '#ef4444' },
                              { name: 'High', value: infrastructureSectors.filter(s => s.risk === 'high').length, color: '#f97316' },
                              { name: 'Medium', value: infrastructureSectors.filter(s => s.risk === 'medium').length, color: '#eab308' },
                              { name: 'Low', value: infrastructureSectors.filter(s => s.risk === 'low').length, color: '#22c55e' }
                            ].map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip
                            contentStyle={{
                              backgroundColor: '#1f2937',
                              border: '1px solid #374151',
                              borderRadius: '8px',
                              color: '#f9fafb'
                            }}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-xs text-slate-400">Critical</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-xs text-slate-400">High</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-xs text-slate-400">Medium</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-slate-400">Low</span>
                      </div>
                    </div>
                  </div>
                </div>
              </InfrastructureGlassCard>

              {/* Uptime Monitoring */}
              <InfrastructureGlassCard title="System Uptime Monitoring (24 Hours)" icon={Activity} status="LIVE">
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={analyticsData?.uptimeMetrics || generateUptimeData()}>
                      <defs>
                        <linearGradient id="uptimeGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis
                        dataKey="hour"
                        stroke="#9ca3af"
                        fontSize={12}
                        tickFormatter={(value) => `${value}:00`}
                      />
                      <YAxis
                        stroke="#9ca3af"
                        fontSize={12}
                        domain={[95, 100]}
                        tickFormatter={(value) => `${value}%`}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1f2937',
                          border: '1px solid #374151',
                          borderRadius: '8px',
                          color: '#f9fafb'
                        }}
                        labelFormatter={(value) => `Hour ${value}:00`}
                        formatter={(value) => [`${value}%`, 'Uptime']}
                      />
                      <Area
                        type="monotone"
                        dataKey="uptime"
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#uptimeGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">
                      {Math.round((analyticsData?.uptimeMetrics || generateUptimeData()).reduce((sum, hour) => sum + hour.uptime, 0) / 24 * 10) / 10}%
                    </div>
                    <div className="text-sm text-slate-400">Average Uptime</div>
                  </div>
                  <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">
                      {Math.max(...(analyticsData?.uptimeMetrics || generateUptimeData()).map(h => h.uptime))}%
                    </div>
                    <div className="text-sm text-slate-400">Peak Uptime</div>
                  </div>
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-400">
                      {Math.min(...(analyticsData?.uptimeMetrics || generateUptimeData()).map(h => h.uptime))}%
                    </div>
                    <div className="text-sm text-slate-400">Lowest Uptime</div>
                  </div>
                  <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">
                      {(analyticsData?.uptimeMetrics || generateUptimeData()).filter(h => h.uptime < 99).length}
                    </div>
                    <div className="text-sm text-slate-400">Maintenance Hours</div>
                  </div>
                </div>
              </InfrastructureGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CriticalInfrastructureHub;
