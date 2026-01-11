import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext.jsx';
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
  Crosshair
} from 'lucide-react';

// 🔒 COMPLIANCE AUDIT CENTER - SUPER ADMIN ONLY
// ROYAL BLUE THEME - REGULATORY COMPLIANCE & AUDIT MANAGEMENT
// ERROR-PROOF RENDERING - ALWAYS RETURNS JSX

const ComplianceAudit = () => {
  const { user } = useAuth();

  // 🔐 ACCESS GUARD - STRICT SUPERADMIN ONLY
  if (!user || user.role !== 'superadmin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <div className="bg-gradient-to-br from-blue-500/10 to-slate-800/50 backdrop-blur-xl border border-blue-500/30 rounded-xl p-8 text-center shadow-2xl">
            <Lock className="w-16 h-16 text-blue-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-white mb-4">Access Denied</h1>
            <p className="text-slate-400 mb-6">
              This is a Super Admin Compliance Audit Center. Access is restricted to authorized personnel only.
            </p>
            <div className="text-sm text-slate-500">
              Required Role: <span className="text-blue-400 font-semibold">SUPERADMIN</span>
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
  const [activeSection, setActiveSection] = useState('compliance-overview');

  // 📊 COMPLIANCE AUDIT DATA - REALISTIC MOCK DATA
  const [complianceData, setComplianceData] = useState({
    frameworks: null,
    audits: null,
    reports: null,
    violations: null
  });

  // 🛡️ SAFE DATA LOADING - WRAPPED IN TRY/CATCH
  useEffect(() => {
    const loadComplianceData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API calls with realistic delays
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock data - completely isolated from other roles
        setComplianceData({
          frameworks: {
            iso27001: { compliant: 87, total: 95, percentage: 92, status: 'GOOD' },
            gdpr: { compliant: 82, total: 95, percentage: 86, status: 'MONITOR' },
            soc2: { compliant: 76, total: 95, percentage: 80, status: 'REVIEW' },
            hipaa: { compliant: 68, total: 95, percentage: 72, status: 'CRITICAL' },
            nist: { compliant: 91, total: 95, percentage: 96, status: 'EXCELLENT' }
          },
          audits: [
            { id: 'AUD-2025-001', framework: 'ISO 27001', status: 'COMPLETED', score: 94, date: '2025-01-15', auditor: 'CERT-In' },
            { id: 'AUD-2025-002', framework: 'GDPR', status: 'IN PROGRESS', score: null, date: '2025-01-12', auditor: 'EU Commission' },
            { id: 'AUD-2025-003', framework: 'SOC 2', status: 'COMPLETED', score: 89, date: '2025-01-10', auditor: 'Deloitte' },
            { id: 'AUD-2025-004', framework: 'HIPAA', status: 'FAILED', score: 65, date: '2025-01-08', auditor: 'OCR' }
          ],
          reports: {
            totalReports: 156,
            complianceRate: 89,
            criticalViolations: 3,
            pendingAudits: 12,
            remediationRate: 94
          },
          violations: [
            { id: 'VIO-001', severity: 'CRITICAL', framework: 'HIPAA', description: 'Data encryption not implemented', status: 'OPEN', dueDate: '2025-02-01' },
            { id: 'VIO-002', severity: 'HIGH', framework: 'GDPR', description: 'Consent management incomplete', status: 'IN PROGRESS', dueDate: '2025-01-30' },
            { id: 'VIO-003', severity: 'MEDIUM', framework: 'ISO 27001', description: 'Access controls review needed', status: 'OPEN', dueDate: '2025-01-25' }
          ]
        });

      } catch (err) {
        console.error('Compliance Audit Data Loading Error:', err);
        setError('Failed to load compliance audit data');
        setBackendOffline(true);
      } finally {
        setLoading(false);
      }
    };

    loadComplianceData();
  }, []);

  // 🎯 GLASS CARD COMPONENT - ROYAL BLUE THEME
  const ComplianceGlassCard = ({ children, title, icon: Icon, status, className = "" }) => (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="relative bg-gradient-to-br from-slate-900/95 to-slate-800/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6 shadow-2xl">
        {(title || Icon || status) && (
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-500/30">
            <div className="flex items-center space-x-3">
              {Icon && <Icon className="w-6 h-6 text-blue-400" />}
              {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
            </div>
            {status && (
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                status === 'EXCELLENT' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                status === 'GOOD' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                status === 'MONITOR' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
                status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                'bg-blue-500/20 text-blue-400 border border-blue-500/30'
              }`}>
                {status}
              </span>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  );

  // 🔄 LOADING STATE - ROYAL BLUE THEME
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <FileCheck className="w-12 h-12 text-blue-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Compliance Audit Center</h1>
              <p className="text-slate-400">Loading compliance audit data...</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ComplianceGlassCard key={i}>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-blue-600 rounded w-3/4"></div>
                  <div className="h-8 bg-blue-600 rounded w-1/2"></div>
                  <div className="h-3 bg-blue-600 rounded w-full"></div>
                  <div className="h-3 bg-blue-600 rounded w-2/3"></div>
                </div>
              </ComplianceGlassCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 🚨 ERROR STATE - ROYAL BLUE THEME
  if (error && !backendOffline) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6 flex items-center justify-center">
        <ComplianceGlassCard title="Compliance System Error" icon={AlertTriangle} status="ERROR" className="max-w-md">
          <div className="text-center py-6">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">System Error</h3>
            <p className="text-slate-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </ComplianceGlassCard>
      </div>
    );
  }

  // 📊 MAIN COMPLIANCE AUDIT CENTER INTERFACE - ROYAL BLUE THEME
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-7xl mx-auto">

        {/* 🎖️ COMPLIANCE AUDIT CENTER HEADER */}
        <div className="mb-8">
          {/* Main Title - ROYAL BLUE THEME */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-blue-500 via-indigo-500 to-blue-600 rounded-xl shadow-neon-blue">
                <FileCheck className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-500 bg-clip-text text-transparent">
                  Compliance Audit Center
                </h1>
                <p className="text-slate-300 text-lg">National Security Compliance & Regulatory Oversight</p>
              </div>
            </div>

            {/* 🔴 BACKEND STATUS */}
            {backendOffline && (
              <div className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-red-400" />
                <span className="text-red-400 text-sm">Backend Offline - Cached Data</span>
              </div>
            )}
          </div>

          {/* 🚨 COMPLIANCE STATUS METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 font-semibold text-lg">{complianceData.reports?.complianceRate || 0}%</span>
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Overall Compliance</div>
              <div className="text-sm text-slate-400">Enterprise Wide</div>
            </div>

            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 backdrop-blur-xl border border-red-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-red-400 font-semibold text-lg">{complianceData.reports?.criticalViolations || 0}</span>
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Critical Violations</div>
              <div className="text-sm text-slate-400">Immediate Attention</div>
            </div>

            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-xl border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-blue-400 font-semibold text-lg">{complianceData.reports?.pendingAudits || 0}</span>
                <Clock className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Pending Audits</div>
              <div className="text-sm text-slate-400">Scheduled Reviews</div>
            </div>

            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-purple-400 font-semibold text-lg">{complianceData.reports?.remediationRate || 0}%</span>
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Remediation Rate</div>
              <div className="text-sm text-slate-400">Issue Resolution</div>
            </div>
          </div>
        </div>

        {/* 🧭 NAVIGATION - ROYAL BLUE THEME */}
        <div className="flex space-x-1 mb-8 bg-slate-800/50 p-1 rounded-lg overflow-x-auto">
          {[
            { id: 'compliance-overview', label: 'Compliance Overview', icon: FileCheck },
            { id: 'audit-reports', label: 'Audit Reports', icon: BarChart3 },
            { id: 'violations', label: 'Violations', icon: AlertTriangle },
            { id: 'remediation', label: 'Remediation', icon: Shield }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  activeSection === section.id
                    ? 'bg-blue-600/50 text-white border border-blue-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-blue-700/30'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>

        {/* 📊 CONTENT SECTIONS */}
        <AnimatePresence mode="wait">
          {activeSection === 'compliance-overview' && (
            <motion.div
              key="compliance-overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Framework Compliance Status */}
              <ComplianceGlassCard title="Compliance Framework Status" icon={FileCheck} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(complianceData.frameworks || {}).map(([framework, data]) => (
                    <div key={framework} className="p-6 bg-slate-700/30 rounded-xl">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-bold text-white">{framework.toUpperCase()}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          data.status === 'EXCELLENT' ? 'bg-green-500/20 text-green-400' :
                          data.status === 'GOOD' ? 'bg-blue-500/20 text-blue-400' :
                          data.status === 'MONITOR' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {data.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-slate-400">Compliance Rate</span>
                          <span className="text-white font-bold">{data.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-600 rounded-full h-3">
                          <div
                            className={`h-3 rounded-full transition-all duration-500 ${
                              data.percentage >= 90 ? 'bg-green-500' :
                              data.percentage >= 80 ? 'bg-blue-500' :
                              data.percentage >= 70 ? 'bg-yellow-500' :
                              'bg-red-500'
                            }`}
                            style={{ width: `${data.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="text-sm text-slate-400">
                        {data.compliant}/{data.total} Organizations Compliant
                      </div>
                    </div>
                  ))}
                </div>
              </ComplianceGlassCard>

              {/* Compliance Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ComplianceGlassCard title="Audit Management" icon={BarChart3} status="ACTIVE">
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors">
                      Schedule New Audit
                    </button>
                    <button className="w-full px-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                      Review Audit Results
                    </button>
                    <button className="w-full px-4 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-lg transition-colors">
                      Generate Compliance Report
                    </button>
                  </div>
                </ComplianceGlassCard>

                <ComplianceGlassCard title="Policy Enforcement" icon={Shield} status="ENFORCED">
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors">
                      Update Security Policies
                    </button>
                    <button className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors">
                      Configure Compliance Rules
                    </button>
                    <button className="w-full px-4 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors">
                      Automated Enforcement
                    </button>
                  </div>
                </ComplianceGlassCard>

                <ComplianceGlassCard title="Risk Assessment" icon={Target} status="ANALYZING">
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold rounded-lg transition-colors">
                      Compliance Risk Analysis
                    </button>
                    <button className="w-full px-4 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg transition-colors">
                      Regulatory Impact Assessment
                    </button>
                    <button className="w-full px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
                      Gap Analysis Report
                    </button>
                  </div>
                </ComplianceGlassCard>
              </div>
            </motion.div>
          )}

          {activeSection === 'audit-reports' && (
            <motion.div
              key="audit-reports"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Recent Audit Reports */}
              <ComplianceGlassCard title="Recent Audit Reports" icon={BarChart3} status="UPDATED">
                <div className="space-y-4">
                  {Array.isArray(complianceData.audits) && complianceData.audits.map((audit, index) => (
                    <div key={audit.id} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h4 className="text-lg font-bold text-white">{audit.framework}</h4>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              audit.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                              audit.status === 'IN PROGRESS' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-red-500/20 text-red-400'
                            }`}>
                              {audit.status}
                            </span>
                          </div>
                          <p className="text-slate-400 text-sm">Auditor: {audit.auditor} | Date: {audit.date}</p>
                        </div>
                        {audit.score && (
                          <div className="text-right">
                            <div className="text-2xl font-bold text-orange-400">{audit.score}/100</div>
                            <div className="text-xs text-slate-400">Compliance Score</div>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-600/30">
                        <div className="text-xs text-slate-400">ID: {audit.id}</div>
                        <button className="px-3 py-1 bg-orange-600 hover:bg-orange-700 text-white text-xs rounded transition-colors">
                          View Report
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </ComplianceGlassCard>
            </motion.div>
          )}

          {activeSection === 'violations' && (
            <motion.div
              key="violations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Compliance Violations */}
              <ComplianceGlassCard title="Critical Compliance Violations" icon={AlertTriangle} status="CRITICAL">
                <div className="space-y-4">
                  {Array.isArray(complianceData.violations) && complianceData.violations.map((violation, index) => (
                    <div key={violation.id} className="p-4 bg-slate-700/30 rounded-lg border-l-4 border-red-500">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h4 className="text-lg font-bold text-white">{violation.framework} Violation</h4>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              violation.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                              violation.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {violation.severity}
                            </span>
                          </div>
                          <p className="text-white">{violation.description}</p>
                          <p className="text-slate-400 text-sm">Due: {violation.dueDate}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                          violation.status === 'OPEN' ? 'bg-red-500/20 text-red-400' :
                          violation.status === 'IN PROGRESS' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {violation.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t border-slate-600/30">
                        <div className="text-xs text-slate-400">ID: {violation.id}</div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors">
                            Details
                          </button>
                          <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-xs rounded transition-colors">
                            Remediate
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ComplianceGlassCard>
            </motion.div>
          )}

          {activeSection === 'remediation' && (
            <motion.div
              key="remediation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Remediation Tracking */}
              <ComplianceGlassCard title="Compliance Remediation Tracking" icon={Shield} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-green-400 mb-1">94%</div>
                      <div className="text-sm text-slate-400">Remediation Success Rate</div>
                    </div>
                  </div>
                  <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-center">
                      <Timer className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-blue-400 mb-1">7.2 days</div>
                      <div className="text-sm text-slate-400">Average Resolution Time</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <button className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <Target className="w-6 h-6 mx-auto mb-2" />
                    Track Remediation
                  </button>
                  <button className="p-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <FileCheck className="w-6 h-6 mx-auto mb-2" />
                    Verify Compliance
                  </button>
                  <button className="p-4 bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <BarChart3 className="w-6 h-6 mx-auto mb-2" />
                    Generate Report
                  </button>
                </div>
              </ComplianceGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ComplianceAudit;
