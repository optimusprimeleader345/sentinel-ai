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
  Monitor,
  Radio,
  MapPin
} from 'lucide-react';

// 🔒 ANALYST OPERATIONS - SUPER ADMIN ONLY
// GREEN/TEAL SECURITY THEME - COMPREHENSIVE SOC ANALYST MANAGEMENT
// REAL-TIME MONITORING - TRAINING - CERTIFICATION - WORKLOAD BALANCING
// ERROR-PROOF RENDERING - ALWAYS RETURNS JSX

const AnalystOperations = () => {
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
              This is a Super Admin Analyst Operations Center. Access is restricted to authorized personnel only.
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
  const [activeSection, setActiveSection] = useState('analysts');

  // 📊 ANALYST OPERATIONS DATA - REALISTIC MOCK DATA
  const [analystData, setAnalystData] = useState({
    analysts: null,
    operations: null,
    performance: null,
    workloads: null,
    training: null,
    certifications: null,
    shiftSchedule: null,
    escalationMatrix: null,
    realTimeMonitoring: null,
    communicationHub: null
  });

  // 🛡️ SAFE DATA LOADING - WRAPPED IN TRY/CATCH
  useEffect(() => {
    const loadAnalystData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Simulate API calls with realistic delays
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock data - completely isolated from other roles
        setAnalystData({
          analysts: [
            {
              id: 'L1-001',
              name: 'Sarah Chen',
              tier: 'L1',
              status: 'ACTIVE',
              cases: 23,
              mttr: '2.3h',
              resolution: '87%',
              shift: 'Day',
              lastActive: '08:45',
              specialization: 'Network Security',
              experience: '2 years',
              currentActivity: 'Investigating phishing alert',
              alertsHandled: 45,
              satisfactionScore: 4.8
            },
            {
              id: 'L1-002',
              name: 'Marcus Rodriguez',
              tier: 'L1',
              status: 'ACTIVE',
              cases: 18,
              mttr: '2.8h',
              resolution: '92%',
              shift: 'Night',
              lastActive: '09:12',
              specialization: 'Endpoint Security',
              experience: '1.5 years',
              currentActivity: 'Analyzing malware sample',
              alertsHandled: 38,
              satisfactionScore: 4.6
            },
            {
              id: 'L2-001',
              name: 'Dr. Elena Volkov',
              tier: 'L2',
              status: 'ACTIVE',
              cases: 12,
              mttr: '4.1h',
              resolution: '94%',
              shift: 'Day',
              lastActive: '08:33',
              specialization: 'Threat Hunting',
              experience: '5 years',
              currentActivity: 'Deep packet inspection',
              alertsHandled: 156,
              satisfactionScore: 4.9
            },
            {
              id: 'L2-002',
              name: 'James Wilson',
              tier: 'L2',
              status: 'BREAK',
              cases: 9,
              mttr: '3.9h',
              resolution: '96%',
              shift: 'Night',
              lastActive: '08:50',
              specialization: 'Forensics',
              experience: '4 years',
              currentActivity: 'On break - 15 min remaining',
              alertsHandled: 89,
              satisfactionScore: 4.7
            },
            {
              id: 'L3-001',
              name: 'Dr. Amara Okafor',
              tier: 'L3',
              status: 'ACTIVE',
              cases: 5,
              mttr: '8.7h',
              resolution: '98%',
              shift: 'Day',
              lastActive: '08:28',
              specialization: 'Advanced Persistent Threats',
              experience: '8 years',
              currentActivity: 'APT investigation coordination',
              alertsHandled: 234,
              satisfactionScore: 5.0
            }
          ],
          operations: {
            totalAnalysts: 45,
            activeAnalysts: 42,
            shifts: {
              day: 23,
              night: 19,
              offDuty: 3
            },
            avgCasesPerAnalyst: 15.6,
            criticalIncidents: 3,
            responseTime: '4.2 min',
            totalAlertsToday: 1247,
            alertsResolved: 1189,
            avgResolutionTime: '3.2h'
          },
          performance: {
            overallResolution: '91%',
            avgMTTR: '3.8h',
            customerSatisfaction: '4.7/5',
            falsePositives: '2.3%',
            trainingCompletion: '94%',
            analystUtilization: '87%'
          },
          workloads: {
            low: 12,
            medium: 23,
            high: 7,
            critical: 3
          },
          training: {
            programs: [
              {
                id: 'TRAIN-001',
                name: 'Advanced Threat Hunting',
                type: 'Technical',
                duration: '4 weeks',
                enrolled: 15,
                completed: 12,
                status: 'ACTIVE',
                progress: '75%',
                nextSession: 'Tomorrow 10:00 AM'
              },
              {
                id: 'TRAIN-002',
                name: 'Incident Response Mastery',
                type: 'Operational',
                duration: '6 weeks',
                enrolled: 8,
                completed: 5,
                status: 'ACTIVE',
                progress: '62%',
                nextSession: 'Friday 2:00 PM'
              },
              {
                id: 'TRAIN-003',
                name: 'Cloud Security Fundamentals',
                type: 'Technical',
                duration: '3 weeks',
                enrolled: 22,
                completed: 18,
                status: 'COMPLETED',
                progress: '100%',
                nextSession: 'Completed'
              }
            ],
            completionRate: '87%',
            upcomingSessions: 5,
            totalCourses: 24,
            activeEnrollments: 67
          },
          certifications: [
            {
              analyst: 'Sarah Chen',
              certification: 'CISSP',
              status: 'CERTIFIED',
              expiryDate: '2026-03-15',
              renewalStatus: 'COMPLIANT',
              lastRenewed: '2024-03-15',
              score: 'Passed with distinction'
            },
            {
              analyst: 'Dr. Elena Volkov',
              certification: 'GCFA',
              status: 'CERTIFIED',
              expiryDate: '2025-08-20',
              renewalStatus: 'COMPLIANT',
              lastRenewed: '2023-08-20',
              score: 'Passed with distinction'
            },
            {
              analyst: 'James Wilson',
              certification: 'CEH',
              status: 'EXPIRED',
              expiryDate: '2024-12-01',
              renewalStatus: 'OVERDUE',
              lastRenewed: '2022-12-01',
              score: 'Renewal required'
            }
          ],
          shiftSchedule: {
            currentDay: 'Monday',
            dayShift: ['Sarah Chen', 'Dr. Elena Volkov', 'Dr. Amara Okafor'],
            nightShift: ['Marcus Rodriguez', 'James Wilson'],
            onCall: ['Dr. Elena Volkov', 'Marcus Rodriguez'],
            coverage: '98%',
            handoffTime: '09:00 AM',
            nextHandoff: 'Tomorrow 9:00 AM'
          },
          escalationMatrix: {
            level1: {
              threshold: 'Low to Medium',
              responseTime: '30 minutes',
              analysts: ['L1 Analysts'],
              escalationTime: '2 hours'
            },
            level2: {
              threshold: 'High',
              responseTime: '15 minutes',
              analysts: ['L2 Analysts + L1 Backup'],
              escalationTime: '1 hour'
            },
            level3: {
              threshold: 'Critical',
              responseTime: '5 minutes',
              analysts: ['L3 Analysts + Full Team'],
              escalationTime: 'Immediate'
            }
          },
          realTimeMonitoring: {
            activeSessions: 42,
            averageSessionTime: '4.2h',
            screenActivity: '95%',
            collaborationEvents: 23,
            systemHealth: '99.8%'
          },
          communicationHub: {
            activeChannels: 12,
            pendingMessages: 8,
            urgentAlerts: 3,
            teamCoordination: 'ACTIVE',
            externalUpdates: 15
          }
        });

      } catch (err) {
        console.error('Analyst Operations Data Loading Error:', err);
        setError('Failed to load analyst operations data');
        setBackendOffline(true);
      } finally {
        setLoading(false);
      }
    };

    loadAnalystData();
  }, []);

  // 🎯 GLASS CARD COMPONENT - GREEN/TEAL SECURITY THEME
  const AnalystGlassCard = ({ children, title, icon: Icon, status, className = "" }) => (
    <div className={`bg-[#0f1a1a]/80 border border-teal-500/30 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(20,184,166,0.3)] ${className}`}>
      {(title || Icon || status) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-teal-500/30">
          <div className="flex items-center space-x-3">
            {Icon && <Icon className="w-6 h-6 text-teal-400" />}
            {title && <h2 className="text-xl font-bold text-white">{title}</h2>}
          </div>
          {status && (
            <span className={`px-3 py-1 rounded-full text-sm font-bold border ${status === 'ACTIVE' ? 'bg-green-500/20 text-green-400 border-green-500/30' : status === 'MONITORING' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : status === 'WARNING' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' : status === 'CRITICAL' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-teal-500/20 text-teal-400 border-teal-500/30'}`}>
              {status}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );

  // 🔄 LOADING STATE - GREEN/TEAL THEME
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-teal-900 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-4 mb-8">
            <Shield className="w-12 h-12 text-teal-400" />
            <div>
              <h1 className="text-3xl font-bold text-white">Analyst Operations Center</h1>
              <p className="text-slate-400">Loading comprehensive analyst operations...</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <AnalystGlassCard key={i}>
                <div className="animate-pulse space-y-4">
                  <div className="h-4 bg-teal-600 rounded w-3/4"></div>
                  <div className="h-8 bg-teal-600 rounded w-1/2"></div>
                  <div className="h-3 bg-teal-600 rounded w-full"></div>
                  <div className="h-3 bg-teal-600 rounded w-2/3"></div>
                </div>
              </AnalystGlassCard>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 🚨 ERROR STATE - GREEN/TEAL THEME
  if (error && !backendOffline) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-teal-900 p-8 flex items-center justify-center">
        <AnalystGlassCard title="Operations System Error" icon={AlertTriangle} status="ERROR" className="max-w-md">
          <div className="text-center py-6">
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">System Error</h3>
            <p className="text-slate-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg transition-colors"
            >
              Retry
            </button>
          </div>
        </AnalystGlassCard>
      </div>
    );
  }

  // 📊 MAIN ANALYST OPERATIONS INTERFACE - GREEN/TEAL SECURITY THEME
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-teal-900 p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">

        {/* 🎖️ ANALYST OPERATIONS HEADER - GREEN/TEAL THEME */}
        <div className="mb-8">
          {/* Main Title */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-gradient-to-br from-green-500 via-teal-500 to-cyan-600 rounded-xl shadow-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent">
                  Analyst Operations Center
                </h1>
                <p className="text-slate-300 text-lg">Comprehensive SOC Analyst Management & Real-Time Monitoring</p>
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

          {/* 🚨 OPERATIONS METRICS - GREEN/TEAL THEME */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#0f1a1a]/80 border border-teal-500/30 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-teal-400 font-semibold text-lg">{analystData.operations?.totalAnalysts || 0}</span>
                <Users className="w-6 h-6 text-teal-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Total Analysts</div>
              <div className="text-sm text-slate-400">{analystData.operations?.activeAnalysts || 0} Active</div>
            </div>

            <div className="bg-[#0f1a1a]/80 border border-teal-500/30 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-cyan-400 font-semibold text-lg">{analystData.operations?.avgCasesPerAnalyst || 0}</span>
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Avg Cases/Analyst</div>
              <div className="text-sm text-slate-400">Current Workload</div>
            </div>

            <div className="bg-[#0f1a1a]/80 border border-teal-500/30 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-emerald-400 font-semibold text-lg">{analystData.performance?.overallResolution || '0%'}</span>
                <CheckCircle className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Resolution Rate</div>
              <div className="text-sm text-slate-400">Overall Performance</div>
            </div>

            <div className="bg-[#0f1a1a]/80 border border-teal-500/30 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(20,184,166,0.3)]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-green-400 font-semibold text-lg">{analystData.operations?.responseTime || '0 min'}</span>
                <Timer className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-xl font-bold text-white mb-1">Avg Response</div>
              <div className="text-sm text-slate-400">Time to Action</div>
            </div>
          </div>
        </div>

        {/* 🧭 NAVIGATION - GREEN/TEAL THEME */}
        <div className="flex flex-wrap gap-1 mb-8 bg-slate-800/50 p-1 rounded-lg">
          {[
            { id: 'analysts', label: 'Active Analysts', icon: Users },
            { id: 'monitoring', label: 'Real-time Monitoring', icon: Eye },
            { id: 'training', label: 'Training & Certification', icon: Crown },
            { id: 'workloads', label: 'Workload Management', icon: Activity },
            { id: 'shifts', label: 'Shift Management', icon: Clock },
            { id: 'performance', label: 'Performance Analytics', icon: BarChart3 },
            { id: 'escalation', label: 'Escalation Matrix', icon: TrendingUp },
            { id: 'operations', label: 'Operations Control', icon: Settings }
          ].map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-teal-600/50 text-white border border-teal-500/50'
                    : 'text-slate-400 hover:text-white hover:bg-teal-700/30'
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
          {activeSection === 'analysts' && (
            <motion.div
              key="analysts"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Active Analysts Grid */}
              <AnalystGlassCard title="Active SOC Analysts" icon={Users} status="MONITORING">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.isArray(analystData.analysts) && analystData.analysts.map((analyst, index) => (
                    <div key={analyst.id} className="min-h-[320px] p-6 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-teal-500/50 transition-all duration-300 flex flex-col">
                      {/* Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-xl font-bold text-white truncate">{analyst?.name || 'Unknown Analyst'}</h3>
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${(analyst?.tier === 'L1') ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' : (analyst?.tier === 'L2') ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-purple-500/20 text-purple-400 border-purple-500/30'}`}>
                              {analyst?.tier || 'N/A'}
                            </span>
                          </div>
                          <p className="text-slate-400 text-sm">{analyst?.specialization || 'N/A'}</p>
                          <p className="text-teal-400 text-sm font-medium mt-1">{analyst?.currentActivity || 'No activity'}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${analyst.status === 'ACTIVE' ? 'bg-green-400' : analyst.status === 'BREAK' ? 'bg-yellow-400' : 'bg-red-400'}`}></div>
                          <span className={`text-sm font-semibold ${analyst.status === 'ACTIVE' ? 'text-green-400' : analyst.status === 'BREAK' ? 'text-yellow-400' : 'text-red-400'}`}>
                            {analyst.status}
                          </span>
                        </div>
                      </div>

                      {/* Analyst Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-400">{analyst.cases}</div>
                          <div className="text-xs text-slate-400">Active Cases</div>
                        </div>
                        <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                          <div className="text-lg font-bold text-green-400">{analyst.resolution}</div>
                          <div className="text-xs text-slate-400">Resolution Rate</div>
                        </div>
                      </div>

                      {/* Additional Metrics */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                          <div className="text-lg font-bold text-cyan-400">{analyst.alertsHandled}</div>
                          <div className="text-xs text-slate-400">Alerts Handled</div>
                        </div>
                        <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                          <div className="text-lg font-bold text-emerald-400">{analyst.satisfactionScore}</div>
                          <div className="text-xs text-slate-400">Satisfaction Score</div>
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">MTTR</span>
                          <span className="text-orange-400 font-semibold">{analyst.mttr}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Experience</span>
                          <span className="text-cyan-400 font-semibold">{analyst.experience}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 text-sm">Shift</span>
                          <span className="text-purple-400 font-semibold">{analyst.shift}</span>
                        </div>
                      </div>

                      {/* Status Footer */}
                      <div className="flex justify-between items-center pt-4 border-t border-slate-600/30">
                        <div className="text-xs text-slate-400">
                          Last Active: {analyst.lastActive}
                        </div>
                        <div className="text-xs text-slate-400">
                          ID: {analyst.id}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnalystGlassCard>

              {/* Real-time Activity Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AnalystGlassCard title="Today's Activity" icon={Activity} status="ACTIVE">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Total Alerts</span>
                      <span className="text-cyan-400 font-bold">{analystData.operations?.totalAlertsToday || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Alerts Resolved</span>
                      <span className="text-green-400 font-bold">{analystData.operations?.alertsResolved || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Avg Resolution Time</span>
                      <span className="text-orange-400 font-bold">{analystData.operations?.avgResolutionTime || '0h'}</span>
                    </div>
                  </div>
                </AnalystGlassCard>

                <AnalystGlassCard title="Shift Distribution" icon={Clock} status="ACTIVE">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Day Shift</span>
                      <span className="text-green-400 font-bold">{analystData.operations?.shifts?.day || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Night Shift</span>
                      <span className="text-blue-400 font-bold">{analystData.operations?.shifts?.night || 0}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400">Coverage</span>
                      <span className="text-teal-400 font-bold">{analystData.shiftSchedule?.coverage || '0%'}</span>
                    </div>
                  </div>
                </AnalystGlassCard>

                <AnalystGlassCard title="Operations Actions" icon={Settings} status="READY">
                  <div className="space-y-3">
                    <button className="w-full px-4 py-3 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-lg transition-colors">
                      Assign New Case
                    </button>
                      <button className="w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm rounded transition-colors">
                        {'Broadcast Update'}
                      </button>
                    <button className="w-full px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors">
                      Performance Review
                    </button>
                  </div>
                </AnalystGlassCard>
              </div>
            </motion.div>
          )}

          {activeSection === 'monitoring' && (
            <motion.div
              key="monitoring"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Real-time Monitoring Dashboard */}
              <AnalystGlassCard title="Real-Time Analyst Monitoring" icon={Eye} status="LIVE">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                  <div className="text-center p-6 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 rounded-xl">
                    <Monitor className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{analystData.realTimeMonitoring?.activeSessions || 0}</div>
                    <div className="text-sm text-slate-400">Active Sessions</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-xl">
                    <Clock className="w-12 h-12 text-cyan-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{analystData.realTimeMonitoring?.averageSessionTime || '0h'}</div>
                    <div className="text-sm text-slate-400">Avg Session Time</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                    <Activity className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{analystData.realTimeMonitoring?.screenActivity || '0%'}</div>
                    <div className="text-sm text-slate-400">Screen Activity</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Users className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-white mb-1">{analystData.realTimeMonitoring?.collaborationEvents || 0}</div>
                    <div className="text-sm text-slate-400">Collaboration Events</div>
                  </div>
                </div>

                {/* Live Activity Feed */}
                <div className="space-y-3">
                  <h3 className="text-white font-semibold mb-4">Live Activity Feed</h3>
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {[
                      { time: '08:47:23', analyst: 'Sarah Chen', action: 'Started investigation on alert #1234', type: 'investigation' },
                      { time: '08:46:15', analyst: 'Marcus Rodriguez', action: 'Completed malware analysis', type: 'completion' },
                      { time: '08:45:42', analyst: 'Dr. Elena Volkov', action: 'Escalated critical threat to L3', type: 'escalation' },
                      { time: '08:44:18', analyst: 'James Wilson', action: 'Joined collaboration session', type: 'collaboration' },
                      { time: '08:43:33', analyst: 'Dr. Amara Okafor', action: 'Updated incident response plan', type: 'update' }
                    ].map((activity, index) => (
                      <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                        <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'investigation' ? 'bg-blue-400' : activity.type === 'completion' ? 'bg-green-400' : activity.type === 'escalation' ? 'bg-red-400' : activity.type === 'collaboration' ? 'bg-purple-400' : 'bg-yellow-400'}`}></div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <span className="text-white font-medium">{activity.analyst}</span>
                            <span className="text-xs text-slate-400">{activity.time}</span>
                          </div>
                          <p className="text-slate-400 text-sm mt-1">{activity.action}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnalystGlassCard>

              {/* System Health Monitoring */}
              <AnalystGlassCard title="System Health & Performance" icon={Server} status="HEALTHY">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Server className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">{analystData.realTimeMonitoring?.systemHealth || '0%'}</div>
                    <div className="text-sm text-slate-400">System Health</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Network className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">99.2%</div>
                    <div className="text-sm text-slate-400">Network Connectivity</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Database className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">98.7%</div>
                    <div className="text-sm text-slate-400">Database Performance</div>
                  </div>
                </div>
              </AnalystGlassCard>
            </motion.div>
          )}

          {activeSection === 'training' && (
            <motion.div
              key="training"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Training Programs */}
              <AnalystGlassCard title="Active Training Programs" icon={Crown} status="ACTIVE">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {Array.isArray(analystData.training?.programs) && analystData.training.programs.map((program, index) => (
                    <div key={program.id} className="p-6 bg-slate-700/30 rounded-xl border border-slate-600/30">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">{program.name}</h3>
                          <div className="flex items-center space-x-2">
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full">{program.type}</span>
                            <span className={`px-2 py-1 text-xs rounded-full ${program.status === 'ACTIVE' ? 'bg-green-500/20 text-green-400' : program.status === 'COMPLETED' ? 'bg-purple-500/20 text-purple-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                              {program.status}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-teal-400">{program.progress}</div>
                          <div className="text-xs text-slate-400">Progress</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                          <div className="text-lg font-bold text-green-400">{program.enrolled}</div>
                          <div className="text-xs text-slate-400">Enrolled</div>
                        </div>
                        <div className="text-center p-3 bg-slate-600/20 rounded-lg">
                          <div className="text-lg font-bold text-blue-400">{program.completed}</div>
                          <div className="text-xs text-slate-400">Completed</div>
                        </div>
                      </div>

                      <div className="text-sm text-slate-400 mb-4">
                        Duration: {program.duration} | Next: {program.nextSession}
                      </div>

                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-500"
                          style={{ width: program.progress }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </AnalystGlassCard>

              {/* Certification Management */}
              <AnalystGlassCard title="Certification Management" icon={FileCheck} status="MONITORING">
                <div className="space-y-4">
                  {Array.isArray(analystData.certifications) && analystData.certifications.map((cert, index) => (
                    <div key={index} className="p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="text-white font-semibold">{cert.analyst}</h4>
                          <p className="text-slate-400 text-sm">{cert.certification}</p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${cert.status === 'CERTIFIED' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {cert.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-slate-400">Expiry Date</div>
                          <div className="text-white font-medium">{cert.expiryDate}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-400">Renewal Status</div>
                          <div className={`text-sm font-medium ${cert.renewalStatus === 'COMPLIANT' ? 'text-green-400' : 'text-red-400'}`}>
                            {cert.renewalStatus}
                          </div>
                        </div>
                      </div>

                      <div className="mt-3 text-xs text-slate-400">
                        Last Renewed: {cert.lastRenewed} | Score: {cert.score}
                      </div>
                    </div>
                  ))}
                </div>
              </AnalystGlassCard>
            </motion.div>
          )}


          {activeSection === 'workloads' && (
            <motion.div
              key="workloads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Workload Distribution */}
              <AnalystGlassCard title="Current Workload Distribution" icon={Activity} status="ANALYZING">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                  <div className="p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-400 mb-2">{analystData.workloads?.low || 0}</div>
                      <div className="text-lg text-white mb-1">Low Workload</div>
                      <div className="text-sm text-slate-400">Available Capacity</div>
                    </div>
                  </div>
                  <div className="p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-400 mb-2">{analystData.workloads?.medium || 0}</div>
                      <div className="text-lg text-white mb-1">Medium Workload</div>
                      <div className="text-sm text-slate-400">Optimal Capacity</div>
                    </div>
                  </div>
                  <div className="p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-400 mb-2">{analystData.workloads?.high || 0}</div>
                      <div className="text-lg text-white mb-1">High Workload</div>
                      <div className="text-sm text-slate-400">Monitor Closely</div>
                    </div>
                  </div>
                  <div className="p-6 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-red-400 mb-2">{analystData.workloads?.critical || 0}</div>
                      <div className="text-lg text-white mb-1">Critical Workload</div>
                      <div className="text-sm text-slate-400">Immediate Action</div>
                    </div>
                  </div>
                </div>

                {/* Workload Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <button className="p-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <BarChart3 className="w-8 h-8 mx-auto mb-3" />
                    Load Balancing
                  </button>
                  <button className="p-6 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <UserCheck className="w-8 h-8 mx-auto mb-3" />
                    Assign Resources
                  </button>
                  <button className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
                    Emergency Response
                  </button>
                </div>
              </AnalystGlassCard>
            </motion.div>
          )}

          {activeSection === 'performance' && (
            <motion.div
              key="performance"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Performance Metrics */}
              <AnalystGlassCard title="SOC Performance Analytics" icon={BarChart3} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="p-6 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl">
                    <CheckCircle className="w-8 h-8 text-green-400 mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{analystData.performance?.overallResolution || '0%'}</div>
                    <div className="text-sm text-slate-400">Overall Resolution</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl">
                    <Timer className="w-8 h-8 text-blue-400 mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{analystData.performance?.avgMTTR || '0h'}</div>
                    <div className="text-sm text-slate-400">Average MTTR</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl">
                    <Star className="w-8 h-8 text-purple-400 mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{analystData.performance?.customerSatisfaction || '0/5'}</div>
                    <div className="text-sm text-slate-400">Customer Satisfaction</div>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl">
                    <XCircle className="w-8 h-8 text-red-400 mb-3" />
                    <div className="text-2xl font-bold text-white mb-1">{analystData.performance?.falsePositives || '0%'}</div>
                    <div className="text-sm text-slate-400">False Positives</div>
                  </div>
                </div>
              </AnalystGlassCard>

              {/* Training & Development */}
              <AnalystGlassCard title="Training & Development" icon={Crown} status="MONITORING">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Training Completion</h4>
                    <div className="text-3xl font-bold text-green-400 mb-2">{analystData.performance?.trainingCompletion || '0%'}</div>
                    <div className="w-full bg-slate-600 rounded-full h-3">
                      <div
                        className="h-3 bg-green-500 rounded-full transition-all duration-500"
                        style={{ width: analystData.performance?.trainingCompletion || '0%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-700/30 rounded-lg">
                    <h4 className="text-white font-semibold mb-3">Certification Status</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-400">CISSP Certified</span>
                        <span className="text-green-400">23</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">CEH Certified</span>
                        <span className="text-blue-400">18</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pending Certs</span>
                        <span className="text-yellow-400">4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </AnalystGlassCard>
            </motion.div>
          )}

          {activeSection === 'operations' && (
            <motion.div
              key="operations"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              {/* Operations Control Center */}
              <AnalystGlassCard title="SOC Operations Control Center" icon={Settings} status="ACTIVE">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <button className="p-6 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <UserCheck className="w-8 h-8 mx-auto mb-3" />
                    Approve Analyst
                  </button>
                  <button className="p-6 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <Clock className="w-8 h-8 mx-auto mb-3" />
                    Manage Shifts
                  </button>
                  <button className="p-6 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <Target className="w-8 h-8 mx-auto mb-3" />
                    Set Priorities
                  </button>
                  <button className="p-6 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold rounded-lg transition-all duration-300">
                    <AlertTriangle className="w-8 h-8 mx-auto mb-3" />
                    Emergency Mode
                  </button>
                </div>
              </AnalystGlassCard>

              {/* System Health */}
              <AnalystGlassCard title="System Health Monitoring" icon={Server} status="HEALTHY">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <Server className="w-12 h-12 text-green-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-green-400 mb-1">99.8%</div>
                    <div className="text-sm text-slate-400">SIEM Uptime</div>
                  </div>
                  <div className="text-center p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                    <Database className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-blue-400 mb-1">98.9%</div>
                    <div className="text-sm text-slate-400">Database Health</div>
                  </div>
                  <div className="text-center p-6 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                    <Network className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-purple-400 mb-1">97.5%</div>
                    <div className="text-sm text-slate-400">Network Connectivity</div>
                  </div>
                </div>
              </AnalystGlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AnalystOperations;
