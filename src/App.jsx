import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shield, Network, Siren, BarChart3, TrendingUp, Globe, Lock } from 'lucide-react'
import { AuthProvider } from './contexts/AuthContext.jsx'
import { AlertProvider } from './contexts/AlertContext.jsx'
import { ThemeProvider } from './contexts/ThemeContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import MainLayout from './layouts/MainLayout'
import Landing from './pages/Landing.jsx'
import LandingNew from './pages/LandingNew.jsx'
import LoginAdmin from './pages/LoginAdmin.jsx'
import LoginUser from './pages/LoginUser.jsx'
import Dashboard from './pages/Dashboard.jsx'
import AnalystDashboard from './pages/AnalystDashboard.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import AdminOverview from './pages/admin/AdminOverview.jsx'
import ThreatAnalytics from './pages/admin/ThreatAnalytics.jsx'
import AdvancedThreatIntelligence from './pages/admin/AdvancedThreatIntelligence.jsx'
import AIModelManagement from './pages/admin/AIModelManagement.jsx'
import AttackMap from './pages/admin/AttackMap.jsx'
import UserManagement from './pages/admin/UserManagement.jsx'
import EnterpriseSystemHealth from './pages/admin/EnterpriseSystemHealth.jsx'
import AIAgentManagement from './pages/admin/AIAgentManagement.jsx'
import IncidentManagement from './pages/admin/IncidentManagement.jsx'
import PolicyManagement from './pages/admin/PolicyManagement.jsx'
import AdaptiveSecurityPolicyEngine from './pages/admin/AdaptiveSecurityPolicyEngine.jsx'
import EnterpriseIncidentResponseOrchestrator from './pages/admin/EnterpriseIncidentResponseOrchestrator.jsx'
import EnterpriseNetworkDefenseCenter from './pages/admin/EnterpriseNetworkDefenseCenter.jsx'
import SecurityAuditing from './pages/admin/SecurityAuditing.jsx'
import AdminComplianceReports from './pages/admin/ComplianceReports.jsx'
import NetworkMonitor from './pages/admin/NetworkMonitor.jsx'
import EndpointControl from './pages/admin/EndpointControl.jsx'
import CloudSecurity from './pages/admin/CloudSecurity.jsx'
import ThreatOverview from './pages/ThreatOverview.jsx'
import Incidents from './pages/Incidents.jsx'
import AIDefenseBot from './pages/AIDefenseBot.jsx'
import AIGuardian from './pages/AIGuardian.jsx'
import DefensePlaybooks from './pages/DefensePlaybooks.jsx'
import ScanCenter from './pages/ScanCenter.jsx'
import DeepfakeDetector from './pages/DeepfakeDetector.jsx'
import SecureVault from './pages/SecureVault.jsx'
import ThreatIntel from './pages/ThreatIntel.jsx'
import DarkWebMonitor from './pages/DarkWebMonitor.jsx'
import SecurityScore from './pages/SecurityScore.jsx'
import Education from './pages/Education.jsx'
import EmailScanner from './pages/EmailScanner.jsx'
import URLScanner from './pages/URLScanner.jsx'
import IPScanner from './pages/IPScanner.jsx'
import PasswordBreach from './pages/PasswordBreach.jsx'
import Support from './pages/Support.jsx'
import Reports from './pages/Reports.jsx'
import CustomerService from './pages/CustomerService.jsx'
import SystemProcesses from './pages/SystemProcesses.jsx'
import AI_LogAnalyzer from './pages/AI_LogAnalyzer.jsx'
import ThreatPrediction from './pages/ThreatPrediction.jsx'
import BehaviorAnalytics from './pages/BehaviorAnalytics.jsx'
import ComplianceCenter from './pages/ComplianceCenter.jsx'
import ZeroTrustAnalyzer from './pages/ZeroTrustAnalyzer.jsx'
import IncidentResponse from './pages/IncidentResponse.jsx'
import AttackSimulation from './pages/AttackSimulation.jsx'
import ReportingCenter from './pages/ReportingCenter.jsx'
import SecurityTimeline from './pages/SecurityTimeline.jsx'
import Alerts from './pages/Alerts.jsx'
import ComplianceReports from './pages/ComplianceReports.jsx'
import GlobalThreatMap from './pages/GlobalThreatMap.jsx'
import PredictiveBreachDetection from './pages/PredictiveBreachDetection.jsx'
import AIIncidentResponse from './pages/AIIncidentResponse.jsx'
import AIAutonomousSecurity from './pages/AIAutonomousSecurity.jsx'
import QuantumCryptography from './pages/QuantumCryptography.jsx'
import AIVulnerabilityAssessment from './pages/AIVulnerabilityAssessment.jsx'
import SOCAssistant from './pages/SOCAssistant.jsx'
import AutonomousResponses from './pages/AutonomousResponses.jsx'
import SIEMDashboard from './pages/SIEMDashboard.jsx'
import AdvancedAttackSimulation from './pages/AdvancedAttackSimulation.jsx'
import SuperAdminDashboard from './pages/SuperAdminDashboard.jsx'
import SuperAdminSOC from './pages/superadmin/SuperAdminSOC.jsx'
import OrganizationGovernance from './pages/superadmin/OrganizationGovernance.jsx'
import AnalystOperations from './pages/superadmin/AnalystOperations.jsx'
import AIControlCenter from './pages/superadmin/AIControlCenter.jsx'
import AIStrategicCommandCenter from './pages/superadmin/AIStrategicCommandCenter.jsx'
import IncidentCommandCenter from './pages/superadmin/IncidentCommandCenter.jsx'
import ComplianceAudit from './pages/superadmin/ComplianceAudit.jsx'
import IntelligenceFusion from './pages/superadmin/IntelligenceFusion.jsx'
import CyberOperations from './pages/superadmin/CyberOperations.jsx'
import PredictiveCyberOperations from './pages/superadmin/PredictiveCyberOperations.jsx'
import ThreatResponse from './pages/superadmin/ThreatResponse.jsx'
import QuantumDefense from './pages/superadmin/QuantumDefense.jsx'
import GlobalOperations from './pages/superadmin/GlobalOperations.jsx'
import EmergencyCommand from './pages/superadmin/EmergencyCommand.jsx'
import MasterControlDashboard from './pages/superadmin/MasterControlDashboard.jsx'
import AdvancedThreatIntelligenceHub from './pages/superadmin/AdvancedThreatIntelligenceHub.jsx'
import EnterpriseComplianceOrchestrator from './pages/superadmin/EnterpriseComplianceOrchestrator.jsx'
import AIThreatPrioritizationEngine from './pages/superadmin/AIThreatPrioritizationEngine.jsx'
import NationalCyberCommandCenter from './pages/superadmin/NationalCyberCommandCenter.jsx'
import SuperAdminLogin from './pages/SuperAdminLogin.jsx'
import CriticalInfrastructureHub from './pages/superadmin/CriticalInfrastructureHub.jsx'
import CrossAgencyIntelligenceFusion from './pages/superadmin/CrossAgencyIntelligenceFusion.jsx'
import EmergencyCyberResponseCoordination from './pages/superadmin/EmergencyCyberResponseCoordination.jsx'
import EnterpriseRiskManagementAI from './pages/superadmin/EnterpriseRiskManagementAI.jsx'
import GlobalSupplyChainSecurity from './pages/superadmin/GlobalSupplyChainSecurity.jsx'
import FinancialFraudIntelligence from './pages/superadmin/FinancialFraudIntelligence.jsx'
import ExecutiveProtectionSuite from './pages/superadmin/ExecutiveProtectionSuite.jsx'
import CustomerSafetyDashboard from './pages/superadmin/CustomerSafetyDashboard.jsx'
import CyberWarfareCommand from './pages/superadmin/CyberWarfareCommand.jsx'
import NeuralThreatIntelligence from './pages/superadmin/NeuralThreatIntelligence.jsx'



function App() {
  return (
    <ThemeProvider>
      <AlertProvider>
        <AuthProvider>
          <Router>
          <Routes>
          {/* Landing page */}
          <Route path="/" element={<Landing />} />

          {/* Separate login paths for different roles */}
          <Route path="/login/admin" element={<LoginAdmin />} />
          <Route path="/login/user" element={<LoginUser />} />
          <Route path="/login/security" element={<LoginUser />} />
          <Route path="/login/super-admin" element={<SuperAdminLogin />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AdminDashboard /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/overview"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AdminOverview /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/analytics"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><ThreatAnalytics /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/threat-intelligence"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AdvancedThreatIntelligence /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/map"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AttackMap /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><UserManagement /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/system-health"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><EnterpriseSystemHealth /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ai-agent"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AIAgentManagement /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/incident-orchestrator"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><EnterpriseIncidentResponseOrchestrator /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/ai-models"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AIModelManagement /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/incident-management"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><IncidentManagement /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/policy-engine"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AdaptiveSecurityPolicyEngine /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/audit-logs"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><SecurityAuditing /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/compliance-report"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><AdminComplianceReports /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/network-monitor"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><NetworkMonitor /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/endpoint-admin"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><EndpointControl /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/network-defense-center"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><EnterpriseNetworkDefenseCenter /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/cloud-security"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <MainLayout><CloudSecurity /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* User Dashboard - Simple Consumer Experience */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={['user']}>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Analyst Dashboard - Advanced Enterprise Features */}
          <Route
            path="/analyst-dashboard"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout>
                  <AnalystDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/scan-center"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><ScanCenter /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/incidents"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><Incidents /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/email-scanner"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><EmailScanner /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/url-scanner"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><URLScanner /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ip-scanner"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><IPScanner /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/password-breach"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><PasswordBreach /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/secure-vault"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><SecureVault /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/security-score"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><SecurityScore /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/threat-overview"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><ThreatOverview /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/threat-intel"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><ThreatIntel /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/global-threat-map"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst', 'admin']}>
                <MainLayout><GlobalThreatMap /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/predictive-breach-detection"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst', 'admin']}>
                <MainLayout><PredictiveBreachDetection /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-defense-bot"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><AIDefenseBot /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-guardian"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><AIGuardian /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dark-web-monitor"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><DarkWebMonitor /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/threat-timeline"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><SecurityTimeline /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><Alerts /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/compliance-reports"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst', 'admin']}>
                <MainLayout><ComplianceReports /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/deepfake-detector"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><DeepfakeDetector /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/defense-playbooks"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><DefensePlaybooks /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/compliance-center"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><ComplianceCenter /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/zero-trust-analyzer"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><ZeroTrustAnalyzer /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/incident-response"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><IncidentResponse /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/attack-simulation"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><AttackSimulation /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/system-processes"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><SystemProcesses /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/education"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><Education /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><Support /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><Reports /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Analyst-only routes */}
          <Route
            path="/behavior-analytics"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><BehaviorAnalytics /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/threat-prediction"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><ThreatPrediction /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/ai-log-analyzer"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><AI_LogAnalyzer /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/reporting-center"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><ReportingCenter /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* AI Vulnerability Assessment - Advanced AI Feature */}
          <Route
            path="/ai-vulnerability-assessment"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst', 'admin']}>
                <MainLayout><AIVulnerabilityAssessment /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Autonomous Response Engine - Advanced AI Feature */}
          <Route
            path="/autonomous-responses"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst', 'admin']}>
                <MainLayout><AutonomousResponses /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* SIEM Dashboard - Event Correlation Engine */}
          <Route
            path="/siem-dashboard"
            element={
              <ProtectedRoute allowedRoles={['analyst', 'admin']}>
                <MainLayout><SIEMDashboard /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Advanced Attack Simulation - Security Pipeline Testing */}
          <Route
            path="/advanced-attack-simulation"
            element={
              <ProtectedRoute allowedRoles={['analyst', 'admin']}>
                <MainLayout><AdvancedAttackSimulation /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* AI SOC Assistant - Intelligent Security Guidance */}
          <Route
            path="/ai-soc-assistant"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst', 'admin']}>
                <MainLayout><SOCAssistant /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* AI Incident Response - Advanced Feature */}
          <Route
            path="/ai-incident-response"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <AIIncidentResponse />
              </ProtectedRoute>
            }
          />

          {/* AI Autonomous Security Operations - Advanced AI Feature */}
          <Route
            path="/ai-autonomous-security"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst']}>
                <MainLayout><AIAutonomousSecurity /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Quantum-Resistant Cryptography Suite - Advanced Feature */}
          <Route
            path="/quantum-cryptography"
            element={
              <ProtectedRoute allowedRoles={['user', 'analyst', 'admin']}>
                <MainLayout><QuantumCryptography /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Legacy routes - redirect to appropriate new routes */}
          <Route path="/login" element={<LoginUser />} /> {/* Default login redirects to user */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><MainLayout><AdminDashboard /></MainLayout></ProtectedRoute>} />

          {/* Super Admin Routes - Advanced Government Cyber Command */}
          <Route
            path="/super-admin"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><SuperAdminDashboard /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/soc"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><SuperAdminSOC /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><SuperAdminDashboard initialCommand="command-center" /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/organization-governance"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><OrganizationGovernance /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/analyst-operations"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><AnalystOperations /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/ai-control-center"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><AIControlCenter /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/incident-command"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><IncidentCommandCenter /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/compliance-audit"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><ComplianceAudit /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/intelligence-fusion"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><IntelligenceFusion /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/cyber-operations"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><CyberOperations /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/threat-response"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><ThreatResponse /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/quantum-defense"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><QuantumDefense /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/global-operations"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><GlobalOperations /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/emergency-command"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><EmergencyCommand /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* New Advanced Super Admin Features */}
          <Route
            path="/super-admin/master-control-dashboard"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><MasterControlDashboard /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/advanced-threat-intelligence-hub"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><AdvancedThreatIntelligenceHub /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/enterprise-compliance-orchestrator"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><EnterpriseComplianceOrchestrator /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* New AI-Powered SuperAdmin Routes */}
          <Route
            path="/super-admin/ai-strategic-command"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><AIStrategicCommandCenter /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/neural-threat-intelligence"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><NeuralThreatIntelligence /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/autonomous-defense-orchestrator"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><ThreatResponse /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/quantum-ai-defense"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><QuantumDefense /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/ai-global-intelligence-fusion"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><IntelligenceFusion /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/predictive-cyber-operations"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><PredictiveCyberOperations /></MainLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/super-admin/ai-threat-prioritization-engine"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><AIThreatPrioritizationEngine /></MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Premium Enterprise AI Features - Government Level */}
          <Route
            path="/super-admin/national-cyber-command"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><NationalCyberCommandCenter /></MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/critical-infrastructure-hub"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><CriticalInfrastructureHub /></MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/cross-agency-intelligence"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout>
                  <CrossAgencyIntelligenceFusion />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/emergency-cyber-response"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout>
                  <EmergencyCyberResponseCoordination />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          {/* Premium Enterprise AI Features - MNC Level */}
          <Route
            path="/super-admin/enterprise-risk-management"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout><EnterpriseRiskManagementAI /></MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/global-supply-chain-security"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout>
                  <GlobalSupplyChainSecurity />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/financial-fraud-intelligence"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout>
                  <FinancialFraudIntelligence />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/executive-protection-suite"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout>
                  <ExecutiveProtectionSuite />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/customer-safety-dashboard"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout>
                  <CustomerSafetyDashboard />
                </MainLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/super-admin/cyber-warfare-command"
            element={
              <ProtectedRoute allowedRoles={['superadmin']}>
                <MainLayout>
                  <CyberWarfareCommand />
                </MainLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
        </Router>
      </AuthProvider>
    </AlertProvider>
  </ThemeProvider>
  )
}

export default App
