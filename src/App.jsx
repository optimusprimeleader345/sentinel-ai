import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard.jsx'
import ThreatOverview from './pages/ThreatOverview.jsx'
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

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/threat-overview" element={<ThreatOverview />} />
          <Route path="/ai-defense-bot" element={<AIDefenseBot />} />
          <Route path="/ai-guardian" element={<AIGuardian />} />
          <Route path="/defense-playbooks" element={<DefensePlaybooks />} />
          <Route path="/scan-center" element={<ScanCenter />} />
          <Route path="/deepfake-detector" element={<DeepfakeDetector />} />
          <Route path="/secure-vault" element={<SecureVault />} />
          <Route path="/threat-intel" element={<ThreatIntel />} />
          <Route path="/darkweb-monitor" element={<DarkWebMonitor />} />
          <Route path="/security-score" element={<SecurityScore />} />
          <Route path="/education" element={<Education />} />
          <Route path="/support" element={<Support />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reporting-center" element={<ReportingCenter />} />
          <Route path="/customer-service" element={<CustomerService />} />
          <Route path="/system-processes" element={<SystemProcesses />} />
          <Route path="/ai-log-analyzer" element={<AI_LogAnalyzer />} />
          <Route path="/threat-prediction" element={<ThreatPrediction />} />
          <Route path="/behavior-analytics" element={<BehaviorAnalytics />} />
          <Route path="/attack-simulation" element={<AttackSimulation />} />
          <Route path="/incident-response" element={<IncidentResponse />} />
          <Route path="/compliance" element={<ComplianceCenter />} />
          <Route path="/zero-trust" element={<ZeroTrustAnalyzer />} />
        </Routes>
      </MainLayout>
    </Router>
  )
}

export default App
