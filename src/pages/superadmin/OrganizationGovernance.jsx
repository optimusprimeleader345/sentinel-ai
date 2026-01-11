import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
import api from '../../lib/api.js';
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
  CheckCircle,
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Download,
  Upload,
  Eye as EyeIcon,
  Edit,
  Save,
  RotateCcw,
  Power,
  PowerOff,
  Gauge,
  Timer,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  ChartLine,
  Layers,
  Workflow
} from 'lucide-react';

const OrganizationGovernance = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-red-500/10 to-slate-800/50 backdrop-blur-xl border border-red-500/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Super Admin Organization Governance Center. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-red-400 font-semibold">SUPERADMIN</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // 🔄 STATE MANAGEMENT - SAFE AND ISOLATED
  const [loading, setLoading] = useState(true);
  const [backendOffline, setBackendOffline] = useState(false);
  const [error, setError] = useState(null);
  const [selectedView, setSelectedView] = useState('overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // 📊 GOVERNANCE DATA - EMERALD/GREEN THEME
  const [governanceData, setGovernanceData] = useState({
    organizations: [
      {
        id: 'ORG-001',
        name: 'Ministry of Defense',
        industry: 'Government',
        riskScore: 15,
        compliance: ['ISO 27001', 'GDPR', 'NIST'],
        isolated: false,
        users: 1247,
        uptime: '99.8%',
        lastAudit: '2025-01-15',
        status: 'SECURE',
        region: 'National Capital',
        trend: 'stable'
      },
      {
        id: 'ORG-002',
        name: 'Central Reserve Bank',
        industry: 'Financial',
        riskScore: 23,
        compliance: ['SOC 2', 'PCI DSS', 'GDPR'],
        isolated: false,
        users: 892,
        uptime: '99.9%',
        lastAudit: '2025-01-12',
        status: 'MONITORING',
        region: 'Financial District',
        trend: 'increasing'
      }
    ],
    riskPredictions: [
      { timeframe: 'Next 24h', risk: 'HIGH', description: 'Supply chain vulnerability detected', impact: 'Critical infrastructure' },
      { timeframe: 'Next 72h', risk: 'MEDIUM', description: 'Executive phishing campaign', impact: 'Financial sector' },
      { timeframe: 'Next week', risk: 'LOW', description: 'IoT botnet expansion', impact: 'Healthcare devices' }
    ],
    complianceMetrics: {
      totalOrganizations: 95,
      compliantOrgs: 76,
      averageCompliance: 89,
      criticalGaps: 6,
      trend: 'improving'
    }
  });

  // 🛡️ SAFE DATA LOADING
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Failed to load governance data:', err);
        setBackendOffline(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Refresh handler
  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    try {
      // Simulate refresh
      await new Promise(resolve => setTimeout(resolve, 1000));
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Refresh failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const getRiskColor = (score) => {
    if (score >= 80) return 'text-red-400';
    if (score >= 60) return 'text-orange-400';
    if (score >= 40) return 'text-yellow-400';
    return 'text-green-400';
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 via-teal-800 to-slate-950 p-6 relative overflow-hidden">
        {/* Metallic Effects Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-teal-600/25 to-emerald-600/25 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-xl shadow-2xl shadow-emerald-500/20 ring-1 ring-teal-400/30">
                <Building className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 via-teal-200 to-green-200 bg-clip-text text-transparent drop-shadow-sm">
                  Organization Governance Center
                </h1>
                <p className="text-teal-200/80 text-sm font-medium">Enterprise Security & Compliance Oversight</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-emerald-600 rounded w-3/4"></div>
                  <div className="h-8 bg-emerald-600 rounded w-1/2"></div>
                  <div className="h-3 bg-emerald-600 rounded w-full"></div>
                  <div className="h-3 bg-emerald-600 rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-green-900 via-teal-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Metallic Effects Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-emerald-500/30 to-green-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-teal-600/25 to-emerald-600/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* 🎖️ HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-emerald-400 via-green-500 to-teal-600 rounded-xl shadow-2xl shadow-emerald-500/20 ring-1 ring-teal-400/30">
              <Building className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-300 via-green-300 via-teal-200 to-green-200 bg-clip-text text-transparent drop-shadow-sm">
                Organization Governance Center
              </h1>
              <p className="text-teal-200/80 text-sm font-medium">Enterprise Security & Compliance Oversight</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">2</span>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all duration-200 flex items-center space-x-2 ${
                isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
            </button>
          </div>
        </motion.div>

        {/* View Tabs */}
        <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'organizations', label: 'Organizations', icon: Building },
            { id: 'risks', label: 'Risk Analysis', icon: Target },
            { id: 'compliance', label: 'Compliance', icon: Shield }
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

        {/* Overview Tab */}
        {selectedView === 'overview' && (
          <>
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[{
                title: 'Total Organizations',
                value: governanceData.complianceMetrics.totalOrganizations,
                change: '+3',
                trend: 'up',
                icon: Building,
                color: 'emerald'
              }, {
                title: 'Compliant Orgs',
                value: governanceData.complianceMetrics.compliantOrgs,
                change: '+89%',
                trend: 'up',
                icon: CheckCircle,
                color: 'green'
              }, {
                title: 'Critical Gaps',
                value: governanceData.complianceMetrics.criticalGaps,
                change: '-2',
                trend: 'down',
                icon: AlertTriangle,
                color: 'red'
              }, {
                title: 'Avg Risk Score',
                value: governanceData.complianceMetrics.averageCompliance,
                change: '-5.2%',
                trend: 'down',
                icon: Target,
                color: 'teal'
              }].map((metric, index) => (
                <motion.div
                  key={metric.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                        <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      </div>
                      <div className="flex items-center space-x-1">
                        {metric.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 text-green-400" />
                        ) : metric.trend === 'down' ? (
                          <TrendingDown className="w-3 h-3 text-red-400" />
                        ) : null}
                        <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                    <div className="text-sm text-slate-400">{metric.title}</div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Risk Predictions Timeline - NEW FEATURE */}
            <Card className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <ChartLine className="w-6 h-6 text-green-400" />
                  <span>AI Risk Predictions Timeline</span>
                </h2>
                <span className="text-xs text-slate-400">Next 7 days</span>
              </div>

              <div className="space-y-4">
                {governanceData.riskPredictions.map((prediction, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className={`w-3 h-3 rounded-full ${
                      prediction.risk === 'HIGH' ? 'bg-red-400' :
                      prediction.risk === 'MEDIUM' ? 'bg-yellow-400' : 'bg-green-400'
                    }`}></div>
                    <div className="flex-1">
                      <div className="text-white font-medium">{prediction.description}</div>
                      <div className="text-xs text-slate-400">{prediction.impact}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-semibold ${
                        prediction.risk === 'HIGH' ? 'text-red-400' :
                        prediction.risk === 'MEDIUM' ? 'text-yellow-400' : 'text-green-400'
                      }`}>
                        {prediction.risk}
                      </div>
                      <div className="text-xs text-slate-500">{prediction.timeframe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Organization Status Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-teal-400" />
                  <span>Organization Security Status</span>
                </h3>
                <div className="space-y-4">
                  {governanceData.organizations.slice(0, 3).map((org) => (
                    <div key={org.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          org.status === 'SECURE' ? 'bg-green-400' :
                          org.status === 'MONITORING' ? 'bg-blue-400' : 'bg-red-400'
                        }`}></div>
                        <div>
                          <div className="text-white font-medium text-sm">{org.name}</div>
                          <div className="text-xs text-slate-400">{org.industry}</div>
                        </div>
                      </div>
                      <div className={`text-sm font-bold ${getRiskColor(org.riskScore)}`}>
                        {org.riskScore}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                  <Workflow className="w-5 h-5 text-emerald-400" />
                  <span>Governance Actions</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg transition-all duration-200">
                    <Plus className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Add Organization</div>
                  </button>
                  <button className="p-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg transition-all duration-200">
                    <Download className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Export Report</div>
                  </button>
                  <button className="p-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-all duration-200">
                    <Shield className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Risk Assessment</div>
                  </button>
                  <button className="p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-all duration-200">
                    <Settings className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Configure</div>
                  </button>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Organizations Tab */}
        {selectedView === 'organizations' && (
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
              <Building className="w-5 h-5 text-emerald-400" />
              <span>Organization Registry</span>
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {governanceData.organizations.map((org, index) => (
                <motion.div
                  key={org.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-bold text-white">{org.name}</h4>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full border border-blue-500/30">
                          {org.industry}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{org.region}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      org.riskScore > 60 ? 'bg-red-500/20 border-2 border-red-500/50' :
                      org.riskScore > 40 ? 'bg-yellow-500/20 border-2 border-yellow-500/50' :
                      'bg-green-500/20 border-2 border-green-500/50'
                    }`}>
                      <span className={`text-sm font-bold ${
                        org.riskScore > 60 ? 'text-red-400' :
                        org.riskScore > 40 ? 'text-yellow-400' :
                        'text-green-400'
                      }`}>
                        {org.riskScore}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">{org.users.toLocaleString()}</div>
                      <div className="text-xs text-slate-400">Users</div>
                    </div>
                    <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                      <div className="text-lg font-bold text-green-400">{org.uptime}</div>
                      <div className="text-xs text-slate-400">Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                      <div className={`text-lg font-bold ${
                        org.status === 'SECURE' ? 'text-green-400' :
                        org.status === 'MONITORING' ? 'text-blue-400' :
                        'text-red-400'
                      }`}>
                        {org.status}
                      </div>
                      <div className="text-xs text-slate-400">Status</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-sm rounded transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 px-3 py-2 bg-teal-500/20 hover:bg-teal-500/30 text-teal-400 text-sm rounded transition-colors">
                      Edit Settings
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}

        {/* Risk Analysis Tab */}
        {selectedView === 'risks' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Target className="w-5 h-5 text-red-400" />
                <span>Risk Analysis Dashboard</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-red-400 mb-1">3</div>
                  <div className="text-sm text-slate-400">High Risk Orgs</div>
                </div>
                <div className="text-center p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <Target className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-yellow-400 mb-1">12</div>
                  <div className="text-sm text-slate-400">Medium Risk Orgs</div>
                </div>
                <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-400 mb-1">80</div>
                  <div className="text-sm text-slate-400">Low Risk Orgs</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Risk Distribution by Score</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {governanceData.organizations.map((org) => (
                    <div key={org.id} className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-white font-medium">{org.name}</span>
                        <span className={`text-sm font-bold ${getRiskColor(org.riskScore)}`}>
                          {org.riskScore}/100
                        </span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            org.riskScore > 60 ? 'bg-red-500' :
                            org.riskScore > 40 ? 'bg-yellow-500' :
                            'bg-green-500'
                          }`}
                          style={{ width: `${org.riskScore}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        {org.riskScore > 60 ? 'CRITICAL' : org.riskScore > 40 ? 'WARNING' : 'SECURE'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Compliance Tab */}
        {selectedView === 'compliance' && (
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
              <FileCheck className="w-5 h-5 text-blue-400" />
              <span>Compliance Monitoring</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Framework Compliance</h4>
                <div className="space-y-3">
                  {['ISO 27001', 'GDPR', 'NIST', 'HIPAA', 'SOC 2'].map((framework) => (
                    <div key={framework} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300">{framework}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-medium">92%</span>
                        <div className="w-20 bg-slate-600 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Compliance Actions</h4>
                <div className="grid grid-cols-2 gap-3">
                  <button className="p-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/30 rounded-lg transition-all duration-200">
                    <FileText className="w-5 h-5 text-emerald-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Audit Report</div>
                  </button>
                  <button className="p-3 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/30 rounded-lg transition-all duration-200">
                    <Target className="w-5 h-5 text-teal-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Gap Analysis</div>
                  </button>
                  <button className="p-3 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg transition-all duration-200">
                    <Shield className="w-5 h-5 text-green-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Remediation</div>
                  </button>
                  <button className="p-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg transition-all duration-200">
                    <Settings className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                    <div className="text-xs text-white font-medium">Policies</div>
                  </button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Last updated: {lastUpdated.toLocaleTimeString()} | Organization Governance Center v2.0
        </div>
      </div>
    </div>
  );
};

export default OrganizationGovernance;
