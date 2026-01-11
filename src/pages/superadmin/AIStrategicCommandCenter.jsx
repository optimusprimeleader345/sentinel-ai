import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  TrendingDown,
  RefreshCw,
  ArrowUp,
  ChevronDown,
  Loader2,
  Info,
  ZoomIn,
  ZoomOut,
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
  Wifi as WifiOn,
  Server as ServerIcon,
  Database as DatabaseIcon,
  Cloud,
  Globe as GlobeIcon,
  Map,
  Navigation,
  Compass,
  Briefcase,
  Clipboard,
  Users as UsersIcon,
  UserCog,
  ShieldCheck,
  AlertOctagon,
  Bell,
  BellRing,
  Volume2,
  VolumeX,
  MapPin as LocationIcon,
  Clock as TimeIcon,
  Flag,
  CheckSquare,
  Square,
  Calculator,
  DollarSign,
  PieChart,
  BarChart,
  LineChart as LineChartIcon,
  Target as TargetIcon,
  AlertTriangle as RiskIcon,
  Shield as ProtectionIcon,
  Brain as AIIcon,
  Activity as MonitoringIcon,
  Settings as ConfigIcon,
  FileText as ReportIcon,
  RefreshCw as UpdateIcon,
  Crown as CrownIcon,
  Star as StarIcon2,
  Shield as ShieldIcon,
  Lock as LockIcon,
  Eye as EyeIcon2,
  Camera as CameraIcon,
  Wifi as WifiIcon,
  MapPin as MapPinIcon,
  Bell as BellIcon,
  AlertTriangle as AlertIcon,
  User as UserIcon,
  Users as UsersIcon2,
  Building as BuildingIcon,
  Car,
  Plane as PlaneIcon,
  ShieldCheck as ShieldCheckIcon,
  Fingerprint,
  Scan,
  Search as SearchIcon,
  Filter as FilterIcon,
  Calendar,
  Clock as ClockIcon,
  Volume2 as VolumeIcon,
  VolumeX as MuteIcon,
  Calculator as CalculatorIcon,
  DollarSign as DollarIcon,
  Target as TargetIcon2,
  Activity as ActivityIcon,
  MonitorSpeaker as SpeakerIcon,
  Radio as RadioIcon2,
  Satellite as SatelliteIcon,
  Navigation as NavigationIcon,
  Compass as CompassIcon,
  Flag as FlagIcon,
  CheckSquare as CheckIcon,
  Square as SquareIcon,
  Crown as ExecutiveIcon,
  Star as StarIcon3,
  Shield as ProtectionIcon2,
  Lock as SecurityIcon,
  Eye as VisibilityIcon,
  Camera as SurveillanceIcon,
  Wifi as NetworkIcon,
  MapPin as LocationIcon2,
  Bell as AlertIcon2,
  AlertTriangle as WarningIcon,
  User as PersonIcon,
  Users as GroupIcon,
  Building as FacilityIcon,
  Car as VehicleIcon,
  Plane as AviationIcon,
  Lightbulb,
  Workflow,
  GitBranch,
  Share2 as ShareIcon,
  PowerOff,
  Bluetooth,
  BluetoothConnected,
  Monitor,
  Smartphone as Mobile,
  Tablet as Device,
  Laptop as Computer,
  Monitor as Workstation,
  Keyboard,
  Mouse,
  Printer,
  HardDrive as Storage,
  Server as DataCenter,
  Database as Data,
  Cloud as StorageCloud,
  Battery as Cell,
  Plug as Outlet,
  Usb as USB,
  Briefcase as Work,
  Home as House,
  User as Person,
  Users as Group,
  Crown as Royal,
  Star as Celestial,
  Heart as Love,
  Download
} from 'lucide-react';

// 🧠 AI STRATEGIC COMMAND CENTER - Presidential Decision Support System
// ADVANCED AI ANALYSIS - Real-time Strategic Recommendations
// CYBER COMMAND INTELLIGENCE - Neural Network Decision Making
// PRESIDENTIAL AUTHORITY - High-Level Strategic Oversight

const AIStrategicCommandCenter = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [threats, setThreats] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [selectedMetric, setSelectedMetric] = useState(null);
  const [expandedRec, setExpandedRec] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [actionHistory, setActionHistory] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentThreatLevel, setCurrentThreatLevel] = useState('ELEVATED');
  const [aiConfidence, setAiConfidence] = useState(87);

  // Strategic Recommendations - different content from AI Threat Prioritization Engine
  const initialRecommendations = [
    {
      id: 1,
      priority: 'CRITICAL',
      title: 'Presidential Command Center Security Enhancement',
      description: 'Implement quantum-resistant encryption and AI-driven anomaly detection for presidential communications infrastructure',
      confidence: 97,
      impact: 'CRITICAL',
      timeline: 'Immediate',
      status: 'PENDING'
    },
    {
      id: 2,
      priority: 'HIGH',
      title: 'National Infrastructure Defense Coordination',
      description: 'Establish unified command structure for critical infrastructure protection across energy, transportation, and finance sectors',
      confidence: 94,
      impact: 'HIGH',
      timeline: '24 hours',
      status: 'IN_PROGRESS'
    },
    {
      id: 3,
      priority: 'HIGH',
      title: 'Strategic Intelligence Sharing Protocol',
      description: 'Deploy secure intelligence sharing framework with Five Eyes nations and key strategic allies',
      confidence: 91,
      impact: 'HIGH',
      timeline: '48 hours',
      status: 'APPROVED'
    }
  ];

  // Strategic Analysis Data - different from AI Threat Prioritization Engine
  const strategicAnalysis = {
    strategicRecommendations: initialRecommendations,
    globalThreatAssessment: {
      current: 'CRITICAL',
      trend: 'INCREASING',
      confidence: 94,
      factors: ['Nation-State APT Campaign', 'Critical Infrastructure Targeting', 'Executive Leadership Compromise']
    },
    riskMetrics: {
      geopolitical: 85,
      cyber: 92,
      supplyChain: 78,
      insider: 56
    },
    decisionSupport: {
      activeDecisions: 15,
      pendingApprovals: 7,
      automatedActions: 63,
      humanOverrides: 4
    }
  };

  // Mock threat data for strategic command center - different from AI Threat Prioritization Engine
  const mockStrategicThreats = [
    {
      id: 'st-001',
      name: 'Presidential Command Center Breach Attempt',
      severity: 'critical',
      nationalImpact: 98,
      affectedOrganizations: 1,
      correlatedIncidents: 234,
      aiConfidence: 97,
      estimatedEconomicImpact: '$50B+',
      timeWindow: 'Active Now',
      affectedSectors: ['Government', 'Defense'],
      geographicSpread: ['Washington DC'],
      lastUpdated: new Date(Date.now() - 300000).toISOString(),
      trend: 'critical',
      commandLevel: 'PRESIDENTIAL'
    },
    {
      id: 'st-002',
      name: 'National Infrastructure Cyber Attack',
      severity: 'critical',
      nationalImpact: 95,
      affectedOrganizations: 12,
      correlatedIncidents: 567,
      aiConfidence: 94,
      estimatedEconomicImpact: '$25B',
      timeWindow: 'Next 30 minutes',
      affectedSectors: ['Energy', 'Transportation', 'Finance'],
      geographicSpread: ['East Coast'],
      lastUpdated: new Date(Date.now() - 900000).toISOString(),
      trend: 'escalating',
      commandLevel: 'NATIONAL'
    },
    {
      id: 'st-003',
      name: 'Strategic Military Intelligence Compromise',
      severity: 'high',
      nationalImpact: 92,
      affectedOrganizations: 3,
      correlatedIncidents: 89,
      aiConfidence: 91,
      estimatedEconomicImpact: '$15B',
      timeWindow: 'Next 2 hours',
      affectedSectors: ['Defense', 'Intelligence'],
      geographicSpread: ['Global Military Networks'],
      lastUpdated: new Date(Date.now() - 1800000).toISOString(),
      trend: 'active',
      commandLevel: 'STRATEGIC'
    },
    {
      id: 'st-004',
      name: 'Executive Leadership Phishing Campaign',
      severity: 'high',
      nationalImpact: 87,
      affectedOrganizations: 45,
      correlatedIncidents: 156,
      aiConfidence: 88,
      estimatedEconomicImpact: '$8B',
      timeWindow: 'Next 4 hours',
      affectedSectors: ['Executive Leadership', 'Government'],
      geographicSpread: ['Major Cities'],
      lastUpdated: new Date(Date.now() - 3600000).toISOString(),
      trend: 'spreading',
      commandLevel: 'EXECUTIVE'
    },
    {
      id: 'st-005',
      name: 'Critical Infrastructure DDoS Wave',
      severity: 'high',
      nationalImpact: 83,
      affectedOrganizations: 23,
      correlatedIncidents: 78,
      aiConfidence: 85,
      estimatedEconomicImpact: '$5B',
      timeWindow: 'Next 6 hours',
      affectedSectors: ['Infrastructure', 'Communications'],
      geographicSpread: ['National Grid'],
      lastUpdated: new Date(Date.now() - 7200000).toISOString(),
      trend: 'building',
      commandLevel: 'INFRASTRUCTURE'
    }
  ];

  // AI Decision Engine
  const aiDecisionEngine = {
    currentAnalysis: {
      scenario: 'Nation-State APT Campaign',
      confidence: 94,
      recommendedActions: [
        'Isolate affected networks',
        'Deploy advanced EDR',
        'Activate international coordination',
        'Prepare counterintelligence measures'
      ],
      riskAssessment: {
        immediate: 'HIGH',
        strategic: 'CRITICAL',
        economic: 'SEVERE'
      }
    },
    predictiveOutcomes: [
      { action: 'Full Isolation', success: 87, impact: 'HIGH', timeline: '2h' },
      { action: 'Targeted Response', success: 92, impact: 'MEDIUM', timeline: '4h' },
      { action: 'Wait & Monitor', success: 34, impact: 'LOW', timeline: '24h' }
    ]
  };

  // Presidential Command Interface - Premium Enterprise Design
  const PresidentialCommandInterface = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* AI Decision Engine Status - Premium Glass Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RiskGlassCard title="AI Confidence Level" icon={Brain} status="ACTIVE">
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400 mb-2">{aiConfidence}%</div>
            <div className="text-slate-400 mb-3">Decision Accuracy</div>
            <div className="w-full bg-slate-600 rounded-full h-3 overflow-hidden">
              <motion.div
                className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${aiConfidence}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              />
            </div>
            <div className="text-xs text-green-400 mt-2">+2.3% from last assessment</div>
          </div>
        </RiskGlassCard>

        <RiskGlassCard title="Current Threat Level" icon={AlertTriangle} riskLevel={currentThreatLevel}>
          <div className="text-center">
            <div className={`text-3xl font-bold mb-2 ${
              currentThreatLevel === 'CRITICAL' ? 'text-red-400' :
              currentThreatLevel === 'HIGH' ? 'text-orange-400' :
              currentThreatLevel === 'ELEVATED' ? 'text-yellow-400' :
              'text-green-400'
            }`}>
              {currentThreatLevel}
            </div>
            <div className="text-slate-400 mb-3">Global Assessment</div>
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-4 h-4 text-red-400" />
              <span className="text-red-400 text-sm">Increasing Trend</span>
            </div>
          </div>
        </RiskGlassCard>

        <RiskGlassCard title="Active Defenses" icon={Shield} status="OPERATIONAL">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">47</div>
            <div className="text-slate-400 mb-3">Systems Protected</div>
            <div className="text-green-400 text-sm">All Systems Online</div>
          </div>
        </RiskGlassCard>
      </div>

      {/* Strategic Decision Support */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-600/50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
          <Crown className="w-6 h-6 text-yellow-400" />
          <span>AI Strategic Decision Support</span>
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Analysis */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Current Strategic Analysis</h4>
            <div className="bg-slate-700/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">Scenario:</span>
                <span className="text-white font-medium">{aiDecisionEngine.currentAnalysis.scenario}</span>
              </div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-slate-300">AI Confidence:</span>
                <span className="text-cyan-400 font-medium">{aiDecisionEngine.currentAnalysis.confidence}%</span>
              </div>
              <div className="space-y-2">
                <span className="text-slate-300 text-sm">Recommended Actions:</span>
                <div className="space-y-1">
                  {aiDecisionEngine.currentAnalysis.recommendedActions.map((action, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-slate-300">{action}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Predictive Outcomes */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">Predictive Outcomes</h4>
            <div className="space-y-3">
              {aiDecisionEngine.predictiveOutcomes.map((outcome, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-700/30 rounded-lg p-4"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">{outcome.action}</span>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      outcome.success >= 85 ? 'bg-green-500/20 text-green-400' :
                      outcome.success >= 70 ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {outcome.success}% Success
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-400">Impact: <span className={`font-medium ${
                      outcome.impact === 'HIGH' ? 'text-red-400' :
                      outcome.impact === 'MEDIUM' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>{outcome.impact}</span></span>
                    <span className="text-slate-400">Timeline: <span className="text-cyan-400 font-medium">{outcome.timeline}</span></span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  // Strategic Recommendations Panel - Premium Enterprise Design
  const StrategicRecommendationsPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <RiskGlassCard title="AI Strategic Recommendations" icon={Lightbulb} status="ACTIVE">
        <div className="flex items-center justify-between mb-6">
          <div className="text-slate-300">
            AI-powered strategic recommendations for presidential decision support
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Auto-Refresh:</span>
            <div className="w-12 h-6 bg-cyan-500/20 rounded-full flex items-center px-1">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {strategicAnalysis.strategicRecommendations.map((rec, index) => (
            <motion.div
              key={rec.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative p-6 rounded-xl border backdrop-blur-xl hover:scale-102 transition-all duration-300 ${
                rec.priority === 'CRITICAL' ? 'bg-gradient-to-br from-red-500/10 to-red-900/20 border-red-500/30' :
                rec.priority === 'HIGH' ? 'bg-gradient-to-br from-orange-500/10 to-orange-900/20 border-orange-500/30' :
                'bg-gradient-to-br from-yellow-500/10 to-yellow-900/20 border-yellow-500/30'
              }`}
            >
              {/* Glow Effect */}
              <div className={`absolute inset-0 rounded-xl opacity-30 blur-xl ${
                rec.priority === 'CRITICAL' ? 'bg-red-500/20' :
                rec.priority === 'HIGH' ? 'bg-orange-500/20' :
                'bg-yellow-500/20'
              }`}></div>

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h4 className="text-white font-semibold text-lg">{rec.title}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        rec.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' :
                        rec.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' :
                        'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                      }`}>
                        {rec.priority}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                        rec.status === 'APPROVED' ? 'bg-green-500/20 text-green-400 border-green-500/40' :
                        rec.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-400 border-blue-500/40' :
                        'bg-gray-500/20 text-gray-400 border-gray-500/40'
                      }`}>
                        {rec.status}
                      </span>
                    </div>
                    <p className="text-slate-300 mb-4 leading-relaxed">{rec.description}</p>

                    {expandedRec === rec.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-4 bg-slate-800/50 rounded-lg border border-slate-600/50"
                      >
                        <h5 className="text-white font-medium mb-3">Detailed Strategic Analysis</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-400">Risk Impact:</span>
                            <span className={`font-medium ${rec.impact === 'HIGH' ? 'text-red-400' : rec.impact === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>
                              {rec.impact}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Timeline:</span>
                            <span className="text-purple-400 font-medium">{rec.timeline}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Cost Estimate:</span>
                            <span className="text-cyan-400 font-medium">${Math.floor(Math.random() * 500000) + 50000}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400">Success Rate:</span>
                            <span className="text-green-400 font-medium">{rec.confidence}%</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <button
                      onClick={() => toggleExpandedRec(rec.id)}
                      className="text-cyan-400 hover:text-cyan-300 text-sm font-medium flex items-center space-x-1 transition-colors"
                    >
                      <ChevronDown className={`w-4 h-4 transition-transform ${expandedRec === rec.id ? 'rotate-180' : ''}`} />
                      <span>{expandedRec === rec.id ? 'Hide Analysis' : 'View Strategic Analysis'}</span>
                    </button>
                  </div>

                  <div className="flex space-x-2 ml-6">
                    <button
                      onClick={() => handleRecommendationAction(rec.id, 'approve')}
                      disabled={rec.status !== 'PENDING'}
                      className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRecommendationAction(rec.id, 'reject')}
                      disabled={rec.status !== 'PENDING'}
                      className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* Metrics Footer */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-600/50">
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-lg">{rec.confidence}%</div>
                    <div className="text-xs text-slate-400">AI Confidence</div>
                  </div>
                  <div className="text-center">
                    <div className={`font-bold text-lg ${rec.impact === 'HIGH' ? 'text-red-400' : rec.impact === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'}`}>
                      {rec.impact}
                    </div>
                    <div className="text-xs text-slate-400">Impact Level</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold text-lg">{rec.timeline}</div>
                    <div className="text-xs text-slate-400">Timeline</div>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className={`absolute inset-0 rounded-xl border-2 opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  rec.priority === 'CRITICAL' ? 'border-red-400/50' :
                  rec.priority === 'HIGH' ? 'border-orange-400/50' :
                  'border-yellow-400/50'
                }`}></div>
              </div>
            </motion.div>
          ))}
        </div>
      </RiskGlassCard>
    </motion.div>
  );

  // Risk Assessment Dashboard - Premium Enterprise Design
  const RiskAssessmentDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <RiskGlassCard title="Strategic Risk Assessment Dashboard" icon={BarChart3} status="ACTIVE">
        <div className="mb-6">
          <p className="text-slate-300">Comprehensive risk analysis and AI-powered strategic intelligence assessment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Risk Categories - Premium Card */}
          <RiskGlassCard title="Risk Categories Analysis" icon={Shield} status="MONITORING">
            <div className="space-y-4">
              {Object.entries(strategicAnalysis.riskMetrics).map(([category, score]) => (
                <motion.div
                  key={category}
                  className="flex items-center justify-between cursor-pointer hover:bg-slate-700/20 p-3 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, x: 5 }}
                  onClick={() => {
                    console.log('Risk metric clicked:', category, score);
                    addNotification(`Detailed analysis for ${category} risk: ${score}%`, 'info');
                  }}
                >
                  <span className="text-slate-300 capitalize font-medium">{category} Risk</span>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 h-3 bg-slate-600/50 rounded-full overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${score >= 80 ? 'bg-gradient-to-r from-red-500 to-red-600' : score >= 60 ? 'bg-gradient-to-r from-orange-500 to-orange-600' : score >= 40 ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' : 'bg-gradient-to-r from-green-500 to-green-600'}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      />
                    </div>
                    <span className={`text-lg font-bold w-12 text-right ${score >= 80 ? 'text-red-400' : score >= 60 ? 'text-orange-400' : score >= 40 ? 'text-yellow-400' : 'text-green-400'}`}>
                      {score}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </RiskGlassCard>

          {/* Decision Support Metrics - Premium Card */}
          <RiskGlassCard title="AI Decision Support Metrics" icon={Brain} status="PROCESSING">
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: strategicAnalysis.decisionSupport.activeDecisions, label: 'Active Decisions', color: 'cyan', desc: 'Currently being processed by AI', icon: Activity },
                { value: strategicAnalysis.decisionSupport.pendingApprovals, label: 'Pending Approvals', color: 'orange', desc: 'Require human approval', icon: Clock },
                { value: strategicAnalysis.decisionSupport.automatedActions, label: 'Auto Actions', color: 'green', desc: 'Executed automatically', icon: Zap },
                { value: strategicAnalysis.decisionSupport.humanOverrides, label: 'Human Overrides', color: 'red', desc: 'Manual interventions', icon: User }
              ].map((metric, index) => {
                const Icon = metric.icon;
                return (
                  <motion.div
                    key={index}
                    className={`text-center p-4 bg-gradient-to-br from-slate-700/30 to-slate-800/50 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 border border-slate-600/30`}
                    whileHover={{ scale: 1.05, y: -2 }}
                    onClick={() => {
                      console.log('Decision metric clicked:', metric.label, metric.value);
                      addNotification(`${metric.label}: ${metric.value} (${metric.desc})`, 'info');
                    }}
                  >
                    <Icon className={`w-6 h-6 text-${metric.color}-400 mx-auto mb-2`} />
                    <div className={`text-2xl font-bold text-${metric.color}-400 mb-1`}>{metric.value}</div>
                    <div className="text-xs text-slate-400 font-medium">{metric.label}</div>
                    <div className={`text-xs text-${metric.color}-300/70 mt-1`}>{metric.desc}</div>
                  </motion.div>
                );
              })}
            </div>
          </RiskGlassCard>
        </div>

        {/* Global Threat Assessment - Premium Card */}
        <RiskGlassCard title="Global Threat Assessment Intelligence" icon={Globe} riskLevel="CRITICAL">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <motion.div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-600/30" whileHover={{ scale: 1.05 }}>
              <div className={`text-4xl font-bold mb-2 ${strategicAnalysis.globalThreatAssessment.current === 'CRITICAL' ? 'text-red-400' : strategicAnalysis.globalThreatAssessment.current === 'HIGH' ? 'text-orange-400' : 'text-yellow-400'}`}>
                {strategicAnalysis.globalThreatAssessment.current}
              </div>
              <div className="text-slate-400 text-sm">Current Threat Level</div>
              <div className="text-xs text-slate-500 mt-1">Global Assessment</div>
            </motion.div>

            <motion.div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-600/30" whileHover={{ scale: 1.05 }}>
              <div className="text-4xl font-bold mb-2 text-purple-400">
                {strategicAnalysis.globalThreatAssessment.confidence}%
              </div>
              <div className="text-slate-400 text-sm">AI Confidence Level</div>
              <div className="text-xs text-slate-500 mt-1">Prediction Accuracy</div>
            </motion.div>

            <motion.div className="text-center p-4 bg-slate-800/30 rounded-lg border border-slate-600/30" whileHover={{ scale: 1.05 }}>
              <div className={`text-4xl font-bold mb-2 ${strategicAnalysis.globalThreatAssessment.trend === 'INCREASING' ? 'text-red-400' : strategicAnalysis.globalThreatAssessment.trend === 'STABLE' ? 'text-yellow-400' : 'text-green-400'}`}>
                {strategicAnalysis.globalThreatAssessment.trend}
              </div>
              <div className="text-slate-400 text-sm">Threat Trend</div>
              <div className="text-xs text-slate-500 mt-1">Direction Analysis</div>
            </motion.div>
          </div>

          <div className="border-t border-slate-600/50 pt-6">
            <h5 className="text-white font-semibold mb-4 flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Critical Contributing Factors</span>
            </h5>
            <div className="flex flex-wrap gap-3">
              {strategicAnalysis.globalThreatAssessment.factors.map((factor, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 text-red-400 rounded-full text-sm cursor-pointer hover:scale-105 hover:bg-red-500/20 hover:border-red-500/50 transition-all duration-300 font-medium"
                  whileHover={{ scale: 1.05, y: -1 }}
                  onClick={() => {
                    console.log('Threat factor clicked:', factor);
                    addNotification(`Analyzing critical threat factor: ${factor}`, 'error');
                  }}
                >
                  {factor}
                </motion.span>
              ))}
            </div>
          </div>
        </RiskGlassCard>
      </RiskGlassCard>
    </motion.div>
  );

  // State variables moved to the top of component

  // Add notification system - simplified to avoid dependency issues
  const addNotification = (message, type = 'success') => {
    console.log('Adding notification:', message, type); // Debug log
    const id = Date.now();
    setNotifications(prev => {
      const newNotifications = [...prev, { id, message, type, timestamp: new Date() }];
      console.log('Updated notifications:', newNotifications); // Debug log
      return newNotifications;
    });
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  // Handle recommendation actions - simplified to avoid dependency issues
  const handleRecommendationAction = (recId, action) => {
    console.log('Button clicked - Recommendation:', recId, 'Action:', action); // Debug log

    setRecommendations(prev => {
      const newRecs = prev.map(rec =>
        rec.id === recId
          ? { ...rec, status: action === 'approve' ? 'APPROVED' : 'REJECTED' }
          : rec
      );
      console.log('Updated recommendations:', newRecs); // Debug log
      return newRecs;
    });

    const rec = recommendations.find(r => r.id === recId);
    if (rec) {
      addNotification(
        `${action === 'approve' ? 'Approved' : 'Rejected'}: ${rec.title}`,
        action === 'approve' ? 'success' : 'error'
      );

      setActionHistory(prev => {
        const newHistory = [...prev, {
          id: Date.now(),
          type: action,
          recommendation: rec.title,
          timestamp: new Date(),
          user: 'Super Admin'
        }];
        console.log('Updated action history:', newHistory); // Debug log
        return newHistory;
      });
    }
  };

  // Handle metric selection
  const handleMetricClick = useCallback((metric) => {
    setSelectedMetric(selectedMetric === metric ? null : metric);
  }, [selectedMetric]);

  // Toggle expanded recommendation
  const toggleExpandedRec = useCallback((recId) => {
    setExpandedRec(expandedRec === recId ? null : recId);
  }, [expandedRec]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Mock refresh with new data
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
      setAiConfidence(prev => Math.min(100, prev + Math.random() * 5));
      addNotification('Data refreshed successfully', 'info');
    } catch (err) {
      console.error('Failed to refresh:', err);
      addNotification('Failed to refresh data', 'error');
    } finally {
      setIsRefreshing(false);
    }
  }, [addNotification]);

  // 🎯 RISK GLASS CARD COMPONENT - Premium Enterprise Design
  const RiskGlassCard = ({ children, title, icon: Icon, status, riskLevel, className = "" }) => (
    <div className={`bg-[#0a0e1a]/90 border border-slate-700/60 rounded-xl p-6 text-slate-200 shadow-[0_0_30px_rgba(34,197,94,0.4)] backdrop-blur-xl hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] transition-all duration-300 ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className={`w-6 h-6 drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] text-cyan-400`} />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          <div className="flex items-center space-x-2">
            {riskLevel && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${riskLevel === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' : riskLevel === 'HIGH' ? 'bg-orange-500/20 text-orange-400 border-orange-500/40' : riskLevel === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : 'bg-green-500/20 text-green-400 border-green-500/40'}`}>
                {riskLevel}
              </span>
            )}
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold border ${status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/40' : status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40' : status === 'NORMAL' ? 'bg-green-500/20 text-green-400 border-green-500/40' : 'bg-blue-500/20 text-blue-400 border-blue-500/40'}`}>
                {status}
              </span>
            )}
          </div>
        </div>
      )}
      {children}
    </div>
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-cyan-900 via-blue-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-r from-blue-600/35 to-indigo-600/35 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-cyan-400/30 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 relative z-10"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-cyan-400 via-teal-500 to-blue-600 rounded-xl shadow-2xl shadow-cyan-500/20 ring-1 ring-teal-400/30">
            <Crown className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-300 via-blue-300 via-indigo-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
              AI Strategic Command Center
            </h1>
            <p className="text-cyan-200/80 text-sm font-medium">Presidential AI Decision Support & Strategic Intelligence</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">3</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-red-500/50 transition-all duration-200 flex items-center space-x-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </motion.div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        <AnimatePresence>
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`px-4 py-3 rounded-lg shadow-lg border max-w-sm ${
                notification.type === 'success' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                notification.type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                'bg-blue-500/10 border-blue-500/30 text-blue-400'
              }`}
            >
              <div className="flex items-center space-x-2">
                {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                {notification.type === 'error' && <XCircle className="w-4 h-4" />}
                {notification.type === 'info' && <Info className="w-4 h-4" />}
                <span className="text-sm font-medium">{notification.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Command Center Tabs - Premium Enterprise Design */}
      <div className="flex space-x-1 mb-8 bg-slate-800/60 backdrop-blur-xl border border-slate-600/30 rounded-xl p-2">
        {[
          { id: 'overview', label: 'Strategic Overview', icon: BarChart3, desc: 'AI Decision Support' },
          { id: 'recommendations', label: 'AI Recommendations', icon: Lightbulb, desc: 'Strategic Actions' },
          { id: 'risk', label: 'Risk Assessment', icon: Shield, desc: 'Global Intelligence' },
          { id: 'actions', label: 'Command Actions', icon: Activity, desc: 'Audit Trail' }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-3 px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                selectedView === tab.id
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <div className="text-left">
                <div className="font-semibold">{tab.label}</div>
                <div className={`text-xs ${selectedView === tab.id ? 'text-cyan-200' : 'text-slate-400'}`}>
                  {tab.desc}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <AnimatePresence>
          {selectedView === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PresidentialCommandInterface />
            </motion.div>
          )}
          {selectedView === 'recommendations' && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <StrategicRecommendationsPanel />
            </motion.div>
          )}
          {selectedView === 'risk' && (
            <motion.div
              key="risk"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <RiskAssessmentDashboard />
            </motion.div>
          )}
          {selectedView === 'actions' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Audit Trail Dashboard Header */}
              <RiskGlassCard title="Command Actions & Audit Trail" icon={Activity} status="ACTIVE">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-slate-300">Comprehensive audit trail of all strategic decisions and command actions</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                        <span className="text-xs text-slate-300">Real-time Auditing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <ShieldCheck className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-slate-300">Compliance Ready</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <FileText className="w-4 h-4 text-purple-400" />
                        <span className="text-xs text-slate-300">Export Enabled</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{actionHistory.length}</div>
                    <div className="text-xs text-slate-400">Total Actions</div>
                  </div>
                </div>

                {/* Audit Trail Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-green-400">{actionHistory.filter(a => a.type === 'approve').length}</div>
                    <div className="text-xs text-slate-400">Approved</div>
                  </div>
                  <div className="text-center p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-red-400">{actionHistory.filter(a => a.type === 'reject').length}</div>
                    <div className="text-xs text-slate-400">Rejected</div>
                  </div>
                  <div className="text-center p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-blue-400">{actionHistory.filter(a => new Date(a.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)).length}</div>
                    <div className="text-xs text-slate-400">Last 24h</div>
                  </div>
                  <div className="text-center p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <User className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                    <div className="text-xl font-bold text-purple-400">{new Set(actionHistory.map(a => a.user)).size}</div>
                    <div className="text-xs text-slate-400">Active Users</div>
                  </div>
                </div>

                {/* Advanced Filters & Search */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-medium">Search Actions</label>
                    <input
                      type="text"
                      placeholder="Search by recommendation..."
                      className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm focus:border-cyan-500/50 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-medium">Action Type</label>
                    <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm focus:border-cyan-500/50 focus:outline-none">
                      <option value="all">All Actions</option>
                      <option value="approve">Approved</option>
                      <option value="reject">Rejected</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-medium">Time Range</label>
                    <select className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white text-sm focus:border-cyan-500/50 focus:outline-none">
                      <option value="all">All Time</option>
                      <option value="24h">Last 24 Hours</option>
                      <option value="7d">Last 7 Days</option>
                      <option value="30d">Last 30 Days</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-slate-400 font-medium">Export</label>
                    <button className="w-full px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white text-sm font-medium rounded transition-all duration-300 hover:scale-105">
                      Export Report
                    </button>
                  </div>
                </div>
              </RiskGlassCard>

              {/* Action History Timeline */}
              <RiskGlassCard title="Strategic Action Timeline" icon={Clock} status="CHRONOLOGICAL">
                {actionHistory.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-slate-500 mx-auto mb-4 opacity-50" />
                    <h4 className="text-white font-semibold mb-2">No Actions Recorded</h4>
                    <p className="text-slate-400">Strategic decisions and presidential actions will appear here with full audit trails</p>
                    <div className="mt-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="text-xs text-slate-500">
                        Actions include: Recommendation approvals/rejections, strategic decisions, emergency responses, and compliance actions
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Timeline Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-8 bg-gradient-to-b from-cyan-400 to-blue-600 rounded-full"></div>
                        <span className="text-white font-medium">Action Chronology</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        {actionHistory.length} actions logged
                      </div>
                    </div>

                    {/* Timeline Items */}
                    <div className="space-y-4">
                      {actionHistory.map((action, index) => (
                        <motion.div
                          key={action.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="relative"
                        >
                          {/* Timeline Line */}
                          <div className="absolute left-6 top-8 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>

                          {/* Action Card */}
                          <div className="relative ml-12 p-4 bg-gradient-to-r from-slate-800/80 to-slate-700/60 border border-slate-600/40 rounded-lg backdrop-blur-xl hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]">
                            {/* Timeline Dot */}
                            <div className={`absolute -left-11 top-6 w-4 h-4 rounded-full border-2 ${
                              action.type === 'approve'
                                ? 'bg-green-500 border-green-400 shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                                : 'bg-red-500 border-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]'
                            }`}></div>

                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <div className={`p-2 rounded-lg ${
                                    action.type === 'approve' ? 'bg-green-500/20' : 'bg-red-500/20'
                                  }`}>
                                    {action.type === 'approve' ? (
                                      <CheckCircle className="w-5 h-5 text-green-400" />
                                    ) : (
                                      <XCircle className="w-5 h-5 text-red-400" />
                                    )}
                                  </div>
                                  <div>
                                    <h4 className="text-white font-semibold text-sm">{action.recommendation}</h4>
                                    <div className="flex items-center space-x-2 text-xs text-slate-400">
                                      <span className={`px-2 py-1 rounded-full ${
                                        action.type === 'approve' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                      }`}>
                                        {action.type === 'approve' ? 'APPROVED' : 'REJECTED'}
                                      </span>
                                      <span>by {action.user}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Action Details */}
                                <div className="ml-11 space-y-2">
                                  <div className="text-xs text-slate-300 bg-slate-700/30 p-2 rounded border border-slate-600/30">
                                    <strong>Decision:</strong> {action.type === 'approve' ? 'Strategic recommendation approved for implementation' : 'Strategic recommendation rejected based on risk assessment'}
                                  </div>

                                  <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center space-x-4">
                                      <span className="text-slate-400">
                                        <Clock className="w-3 h-3 inline mr-1" />
                                        {new Date(action.timestamp).toLocaleString()}
                                      </span>
                                      <span className="text-slate-400">
                                        <Shield className="w-3 h-3 inline mr-1" />
                                        Audit Level: HIGH
                                      </span>
                                    </div>
                                    <button className="text-cyan-400 hover:text-cyan-300 text-xs font-medium hover:underline">
                                      View Details
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Timeline Footer */}
                    <div className="text-center pt-4 border-t border-slate-700/50">
                      <div className="text-xs text-slate-500">
                        End of audit trail • All actions are cryptographically signed and immutable
                      </div>
                    </div>
                  </div>
                )}
              </RiskGlassCard>

              {/* Compliance & Reporting */}
              <RiskGlassCard title="Audit Compliance & Reporting" icon={FileText} status="READY">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg hover:border-cyan-500/50 hover:bg-slate-700/50 transition-all duration-300 text-left group">
                    <FileText className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-white font-medium text-sm">Generate Audit Report</div>
                    <div className="text-slate-400 text-xs">Comprehensive compliance report</div>
                  </button>

                  <button className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg hover:border-green-500/50 hover:bg-slate-700/50 transition-all duration-300 text-left group">
                    <Download className="w-6 h-6 text-green-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-white font-medium text-sm">Export to PDF</div>
                    <div className="text-slate-400 text-xs">Executive-ready documentation</div>
                  </button>

                  <button className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg hover:border-purple-500/50 hover:bg-slate-700/50 transition-all duration-300 text-left group">
                    <Database className="w-6 h-6 text-purple-400 mb-2 group-hover:scale-110 transition-transform" />
                    <div className="text-white font-medium text-sm">Archive Actions</div>
                    <div className="text-slate-400 text-xs">Long-term compliance storage</div>
                  </button>
                </div>
              </RiskGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center relative z-10"
      >
        <div className="text-slate-400 text-sm">
          AI Strategic Command Center • Presidential Decision Support • Advanced Neural Intelligence
        </div>
        <div className="text-xs text-slate-500 mt-1">
          Last Update: {new Date().toLocaleTimeString()} • AI Confidence: {aiConfidence}% • System Status: OPERATIONAL
        </div>
      </motion.div>
    </div>
  );
};

export default AIStrategicCommandCenter;
