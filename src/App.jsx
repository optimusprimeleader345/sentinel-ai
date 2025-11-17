import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import ThreatOverview from './pages/ThreatOverview'
import AIDefenseBot from './pages/AIDefenseBot'
import AIGuardian from './pages/AIGuardian'
import ScanCenter from './pages/ScanCenter'
import DeepfakeDetector from './pages/DeepfakeDetector'
import SecureVault from './pages/SecureVault'
import ThreatIntel from './pages/ThreatIntel'
import DarkWebMonitor from './pages/DarkWebMonitor'
import SecurityScore from './pages/SecurityScore'
import Education from './pages/Education'
import Support from './pages/Support'
import Reports from './pages/Reports'
import CustomerService from './pages/CustomerService'
import SystemProcesses from './pages/SystemProcesses'

function App() {
  console.log('App component rendering')

  try {
    return (
      <Router>
        {console.log('Router initialized')}
        <MainLayout>
          {console.log('MainLayout rendered')}
          <Routes>
            {console.log('Routes initialized')}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/threat-overview" element={<ThreatOverview />} />
            <Route path="/ai-defense-bot" element={<AIDefenseBot />} />
            <Route path="/ai-guardian" element={<AIGuardian />} />
            <Route path="/scan-center" element={<ScanCenter />} />
            <Route path="/deepfake-detector" element={<DeepfakeDetector />} />
            <Route path="/secure-vault" element={<SecureVault />} />
            <Route path="/threat-intel" element={<ThreatIntel />} />
            <Route path="/darkweb-monitor" element={<DarkWebMonitor />} />
            <Route path="/security-score" element={<SecurityScore />} />
            <Route path="/education" element={<Education />} />
            <Route path="/support" element={<Support />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/customer-service" element={<CustomerService />} />
            <Route path="/system-processes" element={<SystemProcesses />} />
          </Routes>
        </MainLayout>
      </Router>
    )
  } catch (error) {
    console.error('Error in App component:', error)
    return (
      <div style={{
        minHeight: '100vh',
        background: '#0a0e27',
        color: 'white',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ background: '#1e293b', padding: '2rem', borderRadius: '0.75rem' }}>
          <h1 style={{ color: '#ef4444' }}>Error in App Component</h1>
          <p>{error.message}</p>
          <pre style={{ background: '#0f172a', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto' }}>
            {error.stack}
          </pre>
        </div>
      </div>
    )
  }
}

export default App
