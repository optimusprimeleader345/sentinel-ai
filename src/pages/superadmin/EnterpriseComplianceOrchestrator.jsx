import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api.js';
import {
  Scale,
  Shield,
  Activity,
  Zap,
  RefreshCw,
  Globe,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Eye,
  Brain,
  FileText,
  Target,
  Radar,
  Workflow,
  Settings
} from 'lucide-react';

const EnterpriseComplianceOrchestrator = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Compliance control states
  const [frameworkStatus, setFrameworkStatus] = useState({
    iso27001: true,
    gdpr: true,
    soc2: true,
    hipaa: false,
    nist: true
  });

  // 📊 COMPLIANCE DATA - AMBER/ORANGE THEME
  const [complianceData, setComplianceData] = useState({
    frameworks: [
      {
        id: 'iso27001',
        name: 'ISO 27001',
        fullName: 'Information Security Management Systems',
        version: '2022',
        totalControls: 93,
        compliantControls: 87,
        compliancePercentage: 94,
        riskLevel: 'low',
        lastAssessment: '2025-01-15T10:00:00Z',
        nextAudit: '2025-04-15',
        status: 'compliant',
        aiInsights: [
          'Strong access control implementation',
          'Good incident response procedures',
          'Excellent risk management framework'
        ],
        gaps: [
          'Physical security controls need enhancement',
          'Supplier management processes require updates'
        ]
      },
      {
        id: 'gdpr',
        name: 'GDPR',
        fullName: 'General Data Protection Regulation',
        version: '2018',
        totalControls: 99,
        compliantControls: 91,
        compliancePercentage: 92,
        riskLevel: 'medium',
        lastAssessment: '2025-01-10T14:30:00Z',
        nextAudit: '2025-05-25',
        status: 'compliant',
        aiInsights: [
          'Good data processing consent mechanisms',
          'Strong data subject rights implementation',
          'Effective data breach notification procedures'
        ],
        gaps: [
          'Data mapping for international transfers needs improvement',
          'Privacy impact assessment process requires enhancement'
        ]
      },
      {
        id: 'nist',
        name: 'NIST CSF',
        fullName: 'NIST Cybersecurity Framework',
        version: '2.0',
        totalControls: 108,
        compliantControls: 98,
        compliancePercentage: 91,
        riskLevel: 'low',
        lastAssessment: '2025-01-08T09:15:00Z',
        nextAudit: '2025-07-08',
        status: 'compliant',
        aiInsights: [
          'Excellent identify and protect functions',
          'Strong detect and respond capabilities',
          'Good recover function implementation'
        ],
        gaps: [
          'Supply chain risk management needs attention',
          'Recovery planning could be enhanced'
        ]
      },
      {
        id: 'hipaa',
        name: 'HIPAA',
        fullName: 'Health Insurance Portability and Accountability Act',
        version: '2013',
        totalControls: 45,
        compliantControls: 38,
        compliancePercentage: 84,
        riskLevel: 'high',
        lastAssessment: '2025-01-05T11:00:00Z',
        nextAudit: '2025-06-05',
        status: 'at-risk',
        aiInsights: [
          'Good security rule implementation',
          'Privacy rule compliance is adequate',
          'Breach notification procedures in place'
        ],
        gaps: [
          'Business associate agreements need review',
          'Risk analysis documentation incomplete',
          'Encryption standards require updates'
        ]
      },
      {
        id: 'soc2',
        name: 'SOC 2',
        fullName: 'System and Organization Controls 2',
        version: '2017',
        totalControls: 61,
        compliantControls: 56,
        compliancePercentage: 92,
        riskLevel: 'low',
        lastAssessment: '2025-01-03T16:45:00Z',
        nextAudit: '2025-08-03',
        status: 'compliant',
        aiInsights: [
          'Strong security controls',
          'Good availability measures',
          'Effective processing integrity'
        ],
        gaps: [
          'Confidentiality controls need enhancement',
          'Some audit trail gaps identified'
        ]
      }
    ],
    organizationCompliance: [
      {
        orgId: 'ORG-001',
        orgName: 'Ministry of Defense',
        industry: 'Government',
        overallScore: 96,
        frameworks: ['ISO 27001', 'NIST'],
        lastAudit: '2025-01-15',
        status: 'compliant',
        criticalGaps: 0,
        aiRecommendations: 'Excellent compliance posture, maintain current standards'
      },
      {
        orgId: 'ORG-002',
        orgName: 'Central Bank',
        industry: 'Financial',
        overallScore: 94,
        frameworks: ['ISO 27001', 'GDPR', 'SOC 2'],
        lastAudit: '2025-01-12',
        status: 'compliant',
        criticalGaps: 1,
        aiRecommendations: 'Strong compliance, focus on GDPR enhancements'
      },
      {
        orgId: 'ORG-003',
        orgName: 'National Health Service',
        industry: 'Healthcare',
        overallScore: 87,
        frameworks: ['ISO 27001', 'GDPR', 'HIPAA'],
        lastAudit: '2025-01-08',
        status: 'at-risk',
        criticalGaps: 3,
        aiRecommendations: 'Urgent attention needed for HIPAA compliance gaps'
      }
    ],
    aiComplianceInsights: [
      {
        id: 'AI-001',
        type: 'prediction',
        title: 'Upcoming GDPR Changes',
        insight: 'Predicted 15% increase in compliance requirements with upcoming AI regulations',
        impact: 'high',
        recommendation: 'Begin preparation for AI governance frameworks',
        timeframe: '6 months'
      },
      {
        id: 'AI-002',
        type: 'gap',
        title: 'HIPAA Risk Analysis Gap',
        insight: 'Current risk analysis methodology may not meet updated HIPAA requirements',
        impact: 'high',
        recommendation: 'Update risk analysis framework and documentation',
        timeframe: '3 months'
      },
      {
        id: 'AI-003',
        type: 'opportunity',
        title: 'Unified Compliance Platform',
        insight: 'Consolidating compliance tools could reduce overhead by 35%',
        impact: 'medium',
        recommendation: 'Evaluate integrated compliance management platform',
        timeframe: '6 months'
      }
    ],
    complianceActions: [
      {
        id: 'ACTION-001',
        type: 'automated_scan',
        title: 'Automated Compliance Scan',
        description: 'AI-powered compliance assessment across all frameworks',
        status: 'available',
        estimatedTime: '30 minutes',
        impact: 'high'
      },
      {
        id: 'ACTION-002',
        type: 'gap_analysis',
        title: 'Comprehensive Gap Analysis',
        description: 'Detailed analysis of compliance gaps and remediation priorities',
        status: 'available',
        estimatedTime: '2 hours',
        impact: 'high'
      },
      {
        id: 'ACTION-003',
        type: 'policy_review',
        title: 'Policy Review & Update',
        description: 'Automated policy review against current compliance requirements',
        status: 'available',
        estimatedTime: '1 hour',
        impact: 'medium'
      }
    ],
    metrics: {
      totalFrameworks: 5,
      activeFrameworks: 4,
      avgCompliance: 89,
      criticalGaps: 6,
      pendingAudits: 3,
      aiRecommendations: 8
    }
  });

  // Functional state management
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [scanInProgress, setScanInProgress] = useState(false);
  const [scanResults, setScanResults] = useState(null);
  const [policies, setPolicies] = useState([
    {
      id: 'POL-001',
      name: 'Data Protection Policy',
      framework: 'GDPR',
      status: 'compliant',
      lastReviewed: '2025-01-10',
      nextReview: '2025-07-10',
      controls: 15
    },
    {
      id: 'POL-002',
      name: 'Access Control Policy',
      framework: 'ISO 27001',
      status: 'compliant',
      lastReviewed: '2025-01-08',
      nextReview: '2025-07-08',
      controls: 12
    },
    {
      id: 'POL-003',
      name: 'Incident Response Policy',
      framework: 'NIST',
      status: 'at-risk',
      lastReviewed: '2024-12-15',
      nextReview: '2025-06-15',
      controls: 8
    }
  ]);
  const [auditLogs, setAuditLogs] = useState([
    {
      id: 'AUDIT-001',
      type: 'compliance_scan',
      framework: 'ISO 27001',
      status: 'completed',
      score: 94,
      timestamp: '2025-01-15T10:00:00Z',
      findings: 3
    },
    {
      id: 'AUDIT-002',
      type: 'gap_analysis',
      framework: 'GDPR',
      status: 'completed',
      score: 92,
      timestamp: '2025-01-10T14:30:00Z',
      findings: 5
    }
  ]);

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

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  // 🔄 LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 via-yellow-800 to-slate-950 p-6 relative overflow-hidden">
        {/* Metallic Effects Background */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-yellow-600/25 to-amber-600/25 rounded-full blur-3xl"></div>
          <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-20 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600 rounded-xl shadow-2xl shadow-amber-500/20 ring-1 ring-orange-400/30">
                <Scale className="w-8 h-8 text-white drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 via-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-sm">
                  Enterprise Compliance Orchestrator
                </h1>
                <p className="text-orange-200/80 text-sm font-medium">AI-Powered Multi-Framework Compliance Management Center</p>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-amber-600 rounded w-3/4"></div>
                  <div className="h-8 bg-amber-600 rounded w-1/2"></div>
                  <div className="h-3 bg-amber-600 rounded w-full"></div>
                  <div className="h-3 bg-amber-600 rounded w-2/3"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-900 via-yellow-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Metallic Effects Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-amber-500/30 to-orange-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-yellow-600/25 to-amber-600/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-orange-400/20 to-yellow-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto">
        {/* 🎖️ HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-br from-amber-400 via-orange-500 to-yellow-600 rounded-xl shadow-2xl shadow-amber-500/20 ring-1 ring-orange-400/30">
              <Scale className="w-8 h-8 text-white drop-shadow-lg" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-300 via-orange-300 via-yellow-200 to-orange-200 bg-clip-text text-transparent drop-shadow-sm">
                Enterprise Compliance Orchestrator
              </h1>
              <p className="text-orange-200/80 text-sm font-medium">AI-Powered Multi-Framework Compliance Management Center</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">6</span>
              </div>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-amber-500/50 transition-all duration-200 flex items-center space-x-2 ${
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
            { id: 'compliance', label: 'Compliance', icon: Shield },
            { id: 'intelligence', label: 'Intelligence', icon: Brain },
            { id: 'orchestration', label: 'Orchestration', icon: Workflow }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedView(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedView === tab.id
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
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
                title: 'Active Frameworks',
                value: complianceData.metrics.activeFrameworks,
                change: '+1',
                trend: 'up',
                icon: Shield,
                color: 'amber'
              }, {
                title: 'Avg Compliance',
                value: `${complianceData.metrics.avgCompliance}%`,
                change: '+2.3%',
                trend: 'up',
                icon: CheckCircle,
                color: 'orange'
              }, {
                title: 'Critical Gaps',
                value: complianceData.metrics.criticalGaps,
                change: '-2',
                trend: 'down',
                icon: AlertTriangle,
                color: 'red'
              }, {
                title: 'AI Recommendations',
                value: complianceData.metrics.aiRecommendations,
                change: '+3',
                trend: 'up',
                icon: Brain,
                color: 'yellow'
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

            {/* Compliance Heat Map - NEW FEATURE */}
            <Card className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                  <Radar className="w-6 h-6 text-orange-400" />
                  <span>Compliance Heat Map</span>
                </h2>
                <span className="text-xs text-slate-400">Real-time framework compliance</span>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {['ISO 27001', 'GDPR', 'NIST', 'HIPAA', 'SOC 2'].map((framework) => (
                  <div key={framework} className="text-center p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                    <div className="text-sm font-medium text-white mb-2">{framework}</div>
                    <div className="w-full bg-slate-600 rounded-full h-3 mb-2">
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-3 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                    <div className="text-xs text-green-400">92% Compliant</div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Framework Status and AI Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-amber-400" />
                  <span>Framework Status Controls</span>
                </h3>
                <div className="space-y-4">
                  {Object.entries(frameworkStatus).map(([framework, enabled]) => (
                    <div key={framework} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${enabled ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <span className="text-white capitalize font-medium">{framework}</span>
                      </div>
                      <button
                        onClick={() => setFrameworkStatus(prev => ({
                          ...prev,
                          [framework]: !prev[framework]
                        }))}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          enabled ? 'bg-amber-500' : 'bg-slate-600'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                  <Brain className="w-5 h-5 text-orange-400" />
                  <span>AI Compliance Insights</span>
                </h3>
                <div className="space-y-4">
                  {complianceData.aiComplianceInsights.slice(0, 3).map((insight, index) => (
                    <div key={insight.id} className="p-3 bg-slate-800/50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-medium text-white">{insight.title}</h4>
                        <span className={`px-2 py-1 rounded text-xs ${insight.impact === 'high' ? 'bg-red-500/20 text-red-400' : insight.impact === 'medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                          {insight.impact}
                        </span>
                      </div>
                      <p className="text-slate-400 text-xs mb-2">{insight.insight}</p>
                      <div className="text-xs text-slate-500">Timeframe: {insight.timeframe}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Compliance Tab */}
        {selectedView === 'compliance' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Framework Compliance Dashboard</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Compliance Status</h4>
                  <div className="space-y-3">
                    {['ISO 27001', 'GDPR', 'NIST', 'HIPAA', 'SOC 2'].map((framework) => (
                      <div key={framework} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                        <span className="text-slate-300">{framework}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-green-400 font-medium">94%</span>
                          <div className="w-20 bg-slate-600 rounded-full h-2">
                            <div className="bg-green-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Compliance Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg transition-all duration-200">
                      <FileText className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <div className="text-xs text-white font-medium">Audit Report</div>
                    </button>
                    <button className="p-3 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 rounded-lg transition-all duration-200">
                      <Target className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                      <div className="text-xs text-white font-medium">Gap Analysis</div>
                    </button>
                    <button className="p-3 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg transition-all duration-200">
                      <Shield className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                      <div className="text-xs text-white font-medium">Remediation</div>
                    </button>
                    <button className="p-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg transition-all duration-200">
                      <Settings className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                      <div className="text-xs text-white font-medium">Policies</div>
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Intelligence Tab */}
        {selectedView === 'intelligence' && (
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
              <Globe className="w-5 h-5 text-blue-400" />
              <span>Regulatory Intelligence Center</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="text-white font-medium">Active Regulatory Changes</h4>
                <div className="space-y-3">
                  <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-amber-400 font-semibold text-sm">GDPR AI Regulation Update</span>
                      <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded">Critical</span>
                    </div>
                    <div className="text-slate-400 text-xs">New AI governance requirements effective March 2026</div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-lg border border-orange-500/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-orange-400 font-semibold text-sm">NIST CSF 2.0 Release</span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Medium</span>
                    </div>
                    <div className="text-slate-400 text-xs">Enhanced cybersecurity framework updates</div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-white font-medium">Intelligence Sources</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium text-sm">Official Regulatory Bodies</div>
                      <div className="text-xs text-slate-400">12 updates this month</div>
                    </div>
                    <span className="text-green-400 text-sm">Active</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white font-medium text-sm">Industry Associations</div>
                      <div className="text-xs text-slate-400">8 updates this month</div>
                    </div>
                    <span className="text-blue-400 text-sm">Monitoring</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Orchestration Tab */}
        {selectedView === 'orchestration' && (
          <div className="space-y-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Workflow className="w-5 h-5 text-purple-400" />
                <span>Multi-Framework Orchestration</span>
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="text-white font-medium">Orchestration Status</h4>
                  <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-lg border border-amber-500/30">
                    <div className="text-amber-400 font-semibold text-lg mb-2">Unified Framework Engine</div>
                    <div className="text-slate-400 text-xs">Intelligent cross-framework control mapping</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300">Framework Integration</span>
                      <span className="text-green-400">95% Complete</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <span className="text-slate-300">Control Mapping</span>
                      <span className="text-green-400">89% Efficiency</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-white font-medium">Orchestration Controls</h4>
                  <div className="space-y-3">
                    <button className="w-full px-3 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 text-sm rounded transition-colors">
                      Run Control Mapping
                    </button>
                    <button className="w-full px-3 py-2 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 text-sm rounded transition-colors">
                      Synchronize Frameworks
                    </button>
                    <button className="w-full px-3 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 text-sm rounded transition-colors">
                      Run Gap Analysis
                    </button>
                  </div>
                </div>
              </div>

              {/* Framework Orchestration Matrix */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-slate-700/50">
                      <th className="text-left py-3 px-4 text-slate-300 font-medium">Framework</th>
                      <th className="text-center py-3 px-4 text-slate-300 font-medium">ISO 27001</th>
                      <th className="text-center py-3 px-4 text-slate-300 font-medium">NIST CSF</th>
                      <th className="text-center py-3 px-4 text-slate-300 font-medium">GDPR</th>
                      <th className="text-center py-3 px-4 text-slate-300 font-medium">SOX</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { framework: 'ISO 27001', mappings: [100, 85, 75, 70] },
                      { framework: 'NIST CSF', mappings: [85, 100, 70, 75] },
                      { framework: 'GDPR', mappings: [75, 70, 100, 65] },
                      { framework: 'SOX', mappings: [70, 75, 65, 100] }
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-slate-800/30">
                        <td className="py-3 px-4 text-white font-medium">{row.framework}</td>
                        {row.mappings.map((mapping, idx) => (
                          <td key={idx} className="py-3 px-4 text-center">
                            <div className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${
                              mapping >= 80 ? 'bg-green-500/20 text-green-400' :
                              mapping >= 70 ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {mapping}%
                            </div>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-slate-500">
          Last updated: {lastUpdated.toLocaleTimeString()} | Enterprise Compliance Orchestrator v2.0
        </div>
      </div>
    </div>
  );
};

export default EnterpriseComplianceOrchestrator;
