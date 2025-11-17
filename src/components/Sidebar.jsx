import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Shield,
  Brain,
  Bot,
  Scan,
  FileQuestion,
  Lock,
  AlertTriangle,
  Globe,
  Award,
  GraduationCap,
  HelpCircle,
  BarChart3,
  User,
} from 'lucide-react'

const navigationGroups = [
  {
    title: 'MAIN',
    items: [
      { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { path: '/threat-overview', icon: Shield, label: 'Threat Overview' },
    ],
  },
  {
    title: 'AI DEFENSE',
    items: [
      { path: '/ai-defense-bot', icon: Bot, label: 'AI Defense Bot' },
      { path: '/ai-guardian', icon: Brain, label: 'AI Guardian' },
    ],
  },
  {
    title: 'SCANNER',
    items: [
      { path: '/scan-center', icon: Scan, label: 'Scan Center' },
      { path: '/deepfake-detector', icon: FileQuestion, label: 'Deepfake Detector' },
      { path: '/secure-vault', icon: Lock, label: 'Secure Vault' },
    ],
  },
  {
    title: 'INTEL',
    items: [
      { path: '/threat-intel', icon: AlertTriangle, label: 'Threat Intel' },
      { path: '/darkweb-monitor', icon: Globe, label: 'Dark Web Monitor' },
    ],
  },
  {
    title: 'SCORE',
    items: [
      { path: '/security-score', icon: Award, label: 'Security Score' },
    ],
  },
  {
    title: 'EDUCATION',
    items: [
      { path: '/education', icon: GraduationCap, label: 'Cyber Education' },
    ],
  },
  {
    title: 'SUPPORT',
    items: [
      { path: '/support', icon: HelpCircle, label: 'Customer Support' },
    ],
  },
  {
    title: 'REPORTS',
    items: [
      { path: '/reports', icon: BarChart3, label: 'Analytics & Insights' },
    ],
  },
]

function Sidebar() {
  console.log('Sidebar rendering')
  
  return (
    <aside 
      className="fixed left-0 top-0 h-screen w-[270px] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border-r border-slate-700/50 flex flex-col z-50"
      style={{ 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        height: '100vh', 
        width: '270px',
        backgroundColor: '#1e293b',
        zIndex: 50
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b border-slate-700/50" style={{ padding: '1.5rem', borderBottom: '1px solid rgba(51, 65, 85, 0.5)' }}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-neon-purple" style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', background: 'linear-gradient(to bottom right, #a855f7, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Shield className="w-6 h-6 text-white" style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white" style={{ fontSize: '1.125rem', fontWeight: '700', color: 'white' }}>SentinelAI</h1>
            <p className="text-xs text-slate-400" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>CYBER DEFENSE PLATFORM</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto" style={{ flex: 1, padding: '1rem 1rem 1.5rem', overflowY: 'auto' }}>
        {navigationGroups.map((group, groupIndex) => (
          <motion.div
            key={group.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: groupIndex * 0.1 }}
          >
            <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2" style={{ padding: '0 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30 shadow-neon-purple'
                          : 'text-slate-300 hover:bg-slate-800/50 hover:text-white'
                      }`
                    }
                    style={({ isActive }) => ({
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: '0.5rem',
                      color: isActive ? 'white' : '#cbd5e1',
                      backgroundColor: isActive ? 'rgba(168, 85, 247, 0.2)' : 'transparent',
                      border: isActive ? '1px solid rgba(168, 85, 247, 0.3)' : 'none',
                    })}
                  >
                    <Icon className="w-5 h-5" style={{ width: '1.25rem', height: '1.25rem' }} />
                    <span className="font-medium text-sm" style={{ fontWeight: '500', fontSize: '0.875rem' }}>{item.label}</span>
                  </NavLink>
                )
              })}
            </div>
          </motion.div>
        ))}
      </nav>

      {/* User Card */}
      <div className="p-4 border-t border-slate-700/50" style={{ padding: '1rem', borderTop: '1px solid rgba(51, 65, 85, 0.5)' }}>
        <div className="glass-card rounded-xl p-4 border border-purple-500/20 shadow-neon-purple" style={{ borderRadius: '0.75rem', padding: '1rem', border: '1px solid rgba(168, 85, 247, 0.2)', background: 'rgba(15, 23, 42, 0.8)' }}>
          <div className="flex items-center space-x-3 mb-3" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-neon-purple" style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'linear-gradient(to bottom right, #a855f7, #22d3ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '700' }}>
              <User className="w-6 h-6" style={{ width: '1.5rem', height: '1.5rem' }} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-white" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'white' }}>User Account</p>
              <p className="text-xs text-slate-400" style={{ fontSize: '0.75rem', color: '#94a3b8' }}>user@sentinelai.com</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-full text-xs font-semibold text-purple-300" style={{ padding: '0.25rem 0.75rem', background: 'rgba(168, 85, 247, 0.2)', border: '1px solid rgba(168, 85, 247, 0.3)', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600', color: '#c084fc' }}>
              Level 3 Defi
            </span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
