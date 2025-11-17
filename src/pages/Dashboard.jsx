import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import HeroHeader from '../components/HeroHeader'
import KPIStatCard from '../components/KPIStatCard'
import AIStatusCard from '../components/AIStatusCard'
import SecurityScoreCard from '../components/SecurityScoreCard'
import ScannerWidget from '../components/ScannerWidget'
import ThreatMapPlaceholder from '../components/ThreatMapPlaceholder'
import HealthWidget from '../components/HealthWidget'
import RecentScanTable from '../components/RecentScanTable'
import Button from '../components/Button'
import { kpiData } from '../data/mock'
import { Cpu, HardDrive, Network, Activity } from 'lucide-react'
import { systemAPI, darkwebAPI } from '../lib/api.js'

function Dashboard() {
  const [systemHealthState, setSystemHealthState] = useState({
    cpu: 45,
    memory: 62,
    disk: 34,
    network: 78,
    uptime: '99.8%',
    status: 'healthy',
    services: [
      { name: 'Web Server', status: 'running', uptime: '15d 4h' },
      { name: 'Database', status: 'running', uptime: '15d 4h' },
      { name: 'Cache', status: 'running', uptime: '12d 8h' },
      { name: 'Queue Worker', status: 'running', uptime: '10d 2h' },
    ],
  });
  const [darkWebAlerts, setDarkWebAlerts] = useState([]);

  const systemHealth = systemHealthState?.status ?? "Unknown";
  console.log('Dashboard component rendering', { kpiData, systemHealth })

  useEffect(() => {
    systemAPI.getHealth().then(setSystemHealthState).catch(console.error);
    darkwebAPI.getBreaches().then(setDarkWebAlerts).catch(console.error);
  }, []);

  if (!kpiData || !systemHealthState) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white text-xl">Loading dashboard data...</div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-[#0a0e27] p-8" style={{ minHeight: '100vh', backgroundColor: '#0a0e27', padding: '2rem' }}>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Header */}
        <HeroHeader />

        {/* KPI Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => (
            <KPIStatCard key={kpi.id} {...kpi} index={index} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - AI Agent */}
          <div className="lg:col-span-2">
            <AIStatusCard />
          </div>

          {/* Right Column - Security Score */}
          <div>
            <SecurityScoreCard />
          </div>
        </div>

        {/* Additional Widgets Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScannerWidget />
          <ThreatMapPlaceholder />
        </div>

        {/* System Health Widgets */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">System Health</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <HealthWidget
              label="CPU Usage"
              value={systemHealthState.cpu}
              icon={Cpu}
              color="cyan"
            />
            <HealthWidget
              label="Memory"
              value={systemHealthState.memory}
              icon={Activity}
              color="green"
            />
            <HealthWidget
              label="Network"
              value={systemHealthState.network}
              icon={Network}
              color="purple"
            />
            <HealthWidget
              label="Disk"
              value={systemHealthState.disk}
              icon={HardDrive}
              color="yellow"
            />
          </div>
        </div>

        {/* Recent Scans Table */}
        <RecentScanTable />

        {/* Deepfake Detector Quick Access */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-6 border border-slate-700/50 shadow-glow"
        >
          <h3 className="text-lg font-bold text-white mb-4">Deepfake Detector</h3>
          <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center hover:border-purple-500/50 transition-colors">
            <p className="text-slate-400 mb-4">Drop an image or video file here to detect deepfakes</p>
            <Button>Select File</Button>
          </div>
        </motion.div>

        {/* Dark Web Monitor Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-xl p-6 border border-red-500/20 shadow-glow"
        >
          <h3 className="text-lg font-bold text-white mb-4">Dark Web Monitor</h3>
          <div className="space-y-3">
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
              <p className="text-sm font-semibold text-red-400 mb-1">{darkWebAlerts.length} New Alerts</p>
              <p className="text-xs text-slate-400">Email leak detected in data breach database</p>
            </div>
            <Button variant="secondary" className="w-full">View All Alerts</Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Dashboard
