import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'
import {
  Shield, User, Bot, Activity, Globe, Target, AlertCircle,
  TrendingUp, Eye, Cpu, Network, Zap, Brain, BarChart3,
  Search, Radar, Eye as EyeIcon, Lightbulb, FileText,
  Users, Settings, Monitor, Database, Lock, Scan, AlertTriangle, HardDrive,
  BookOpen, Mail, Clock, MessageSquare, FileCheck, Siren, Award, Scale,
  LogOut, LogIn, UserCog, Key, Bell, Moon, Sun
} from 'lucide-react'

// Get role badge styling for different user roles
const getRoleBadge = (role) => {
  const roleStyles = {
    admin: 'bg-red-500/20 text-red-400 border border-red-500/30',
    analyst: 'bg-orange-500/20 text-orange-400 border border-orange-500/30',
    user: 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
    superadmin: 'bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30 animate-pulse'
  };
  return roleStyles[role] || roleStyles.user;
};

// Completely separate navigation configurations - no overlapping features
const getNavigationGroups = (userRole) => {
  // ADMIN EXCLUSIVE FEATURES - Enterprise SOC Management
  const adminNavigation = [
    {
      title: 'ENTERPRISE SOC',
      items: [
        { path: '/admin/dashboard', icon: Shield, label: 'Enterprise SOC' },
        { path: '/admin/overview', icon: Monitor, label: 'SOC Operations' },
        { path: '/admin/analytics', icon: BarChart3, label: 'SOC Analytics' },
        { path: '/admin/threat-intelligence', icon: Brain, label: 'Threat Intelligence Hub' },
        { path: '/admin/map', icon: Globe, label: 'Global Threat View' },
        { path: '/autonomous-responses', icon: Shield, label: 'Autonomous Response' },
      ],
    },
    {
      title: 'ADMIN MANAGEMENT',
      items: [
        { path: '/admin/users', icon: Users, label: 'User Administration' },
        { path: '/admin/system-health', icon: Cpu, label: 'Enterprise Systems' },
        { path: '/admin/incident-orchestrator', icon: AlertTriangle, label: 'Incident Orchestrator' },
        { path: '/admin/ai-agent', icon: Brain, label: 'AI Management Hub' },
        { path: '/admin/ai-models', icon: Database, label: 'AI/ML Models' },
        { path: '/admin/policy-engine', icon: Shield, label: 'Policy Engine' },
      ],
    },
    {
      title: 'ENTERPRISE SECURITY',
      items: [
        { path: '/admin/incident-management', icon: AlertTriangle, label: 'Incident Management' },
        { path: '/admin/policy-engine', icon: FileText, label: 'Policy Management' },
        { path: '/admin/audit-logs', icon: Activity, label: 'Security Auditing' },
        { path: '/admin/compliance-report', icon: BarChart3, label: 'Compliance Reports' },
        { path: '/siem-dashboard', icon: Database, label: 'SIEM Dashboard' },
        { path: '/advanced-attack-simulation', icon: Zap, label: 'Advanced Attack Simulation' },
      ],
    },
    {
      title: 'ENTERPRISE INFRA',
      items: [
        { path: '/admin/network-defense-center', icon: Shield, label: 'Network Defense Center' },
        { path: '/admin/network-monitor', icon: Network, label: 'Network Monitor' },
        { path: '/admin/endpoint-admin', icon: HardDrive, label: 'Endpoint Control' },
        { path: '/admin/cloud-security', icon: Globe, label: 'Cloud Security' },
      ],
    },
  ]

  // ANALYST EXCLUSIVE FEATURES - Professional SOC Tools
  const analystNavigation = [
    {
      title: 'SECURITY ANALYTICS',
      items: [
        { path: '/analyst-dashboard', icon: BarChart3, label: 'Security Analyst Dashboard' },
        { path: '/dashboard', icon: Activity, label: 'Analysis Dashboard' },
      ],
    },
    {
      title: 'THREAT ANALYSIS',
      items: [
        { path: '/threat-intelligence-center', icon: Search, label: 'Threat Intelligence Center' },
        { path: '/predictive-threat-modeling', icon: Brain, label: 'Predictive Threat Modeling' },
      ],
    },
    {
      title: 'SIEM OPERATIONS',
      items: [
        { path: '/siem-dashboard', icon: Database, label: 'SIEM Dashboard' },
      ],
    },
    {
      title: 'INVESTIGATION TOOLS',
      items: [
        { path: '/advanced-behavioral-forensics', icon: Target, label: 'Behavioral Forensics' },
        { path: '/cyber-threat-hunting', icon: Search, label: 'Threat Hunting Platform' },
        { path: '/forensic-analysis-tools', icon: Eye, label: 'Forensic Analysis' },
        { path: '/incident-response', icon: AlertCircle, label: 'Incident Response' },
        { path: '/advanced-attack-simulation', icon: Zap, label: 'Advanced Attack Simulation' },
      ],
    },
    {
      title: 'THREAT INTELLIGENCE',
      items: [
        { path: '/vulnerability-intelligence', icon: Shield, label: 'Vulnerability Intelligence' },
        { path: '/deep-web-operations', icon: Globe, label: 'Deep Web Operations' },
        { path: '/threat-fusion-center', icon: MessageSquare, label: 'Intelligence Fusion Center' },
      ],
    },
    {
      title: 'COMPLIANCE & REPORTING',
      items: [
        { path: '/compliance-auditing', icon: FileText, label: 'Compliance Auditing' },
        { path: '/risk-management-framework', icon: BarChart3, label: 'Risk Management' },
        { path: '/executive-briefings', icon: TrendingUp, label: 'Executive Briefings' },
      ],
    },
  ]

  // USER EXCLUSIVE FEATURES - Advanced Security Tools
  const userNavigation = [
    {
      title: 'SECURITY DASHBOARD',
      items: [
        { path: '/dashboard', icon: Activity, label: 'Security Dashboard' },
        { path: '/security-score', icon: Target, label: 'Security Score' },
        { path: '/threat-overview', icon: Eye, label: 'Threat Overview' },
        { path: '/scan-center', icon: Scan, label: 'Scan Center' },
        { path: '/email-scanner', icon: Mail, label: 'Email Scanner' },
        { path: '/url-scanner', icon: Globe, label: 'URL Scanner' },
        { path: '/ip-scanner', icon: Radar, label: 'IP Scanner' },
        { path: '/password-breach', icon: Shield, label: 'Password Breach Checker' },
      ],
    },
    {
      title: 'SECURITY ANALYTICS',
      items: [
        { path: '/analyst-dashboard', icon: BarChart3, label: 'Security Analyst Dashboard' },
      ],
    },
    {
      title: 'AI DEFENSE TOOLS',
      items: [
        { path: '/ai-defense-bot', icon: Bot, label: 'AI Defense Bot' },
        { path: '/ai-guardian', icon: Shield, label: 'AI Guardian' },
        { path: '/deepfake-detector', icon: EyeIcon, label: 'Deepfake Detector' },
      ],
    },
    {
      title: 'THREAT ANALYSIS',
      items: [
        { path: '/threat-intel', icon: Search, label: 'Threat Intelligence' },
        { path: '/global-threat-map', icon: Globe, label: 'Global Threat Map' },
        { path: '/predictive-breach-detection', icon: Brain, label: 'AI Breach Prediction' },
        { path: '/ai-vulnerability-assessment', icon: Brain, label: 'AI Vulnerability Assessment' },
        { path: '/ai-soc-assistant', icon: MessageSquare, label: 'AI SOC Assistant' },
        { path: '/behavior-analytics', icon: BarChart3, label: 'Behavior Analytics' },
        { path: '/threat-prediction', icon: TrendingUp, label: 'Threat Prediction' },
      ],
    },
    {
      title: 'SECURITY MONITORING',
      items: [
        { path: '/dark-web-monitor', icon: Globe, label: 'Dark Web Monitor' },
        { path: '/threat-timeline', icon: Clock, label: 'Threat Timeline' },
        { path: '/alerts', icon: AlertTriangle, label: 'Security Alerts' },
        { path: '/compliance-center', icon: FileText, label: 'Compliance Center' },
        { path: '/compliance-reports', icon: FileText, label: 'Compliance & Reports' },
        { path: '/zero-trust-analyzer', icon: Lock, label: 'Zero Trust Analyzer' },
      ],
    },
    {
      title: 'INCIDENT RESPONSE',
      items: [
        { path: '/ai-incident-response', icon: Brain, label: 'AI Incident Response' },
        { path: '/ai-autonomous-security', icon: Shield, label: 'AI Autonomous Security' },
        { path: '/autonomous-responses', icon: Shield, label: 'Autonomous Response' },
        { path: '/quantum-cryptography', icon: Cpu, label: 'Quantum Cryptography' },
        { path: '/incidents', icon: AlertTriangle, label: 'Security Incidents' },
        { path: '/incident-response', icon: AlertCircle, label: 'Incident Response' },
        { path: '/attack-simulation', icon: Zap, label: 'Attack Simulation' },
        { path: '/defense-playbooks', icon: BookOpen, label: 'Defense Playbooks' },
      ],
    },
    {
      title: 'SYSTEM TOOLS',
      items: [
        { path: '/system-processes', icon: Monitor, label: 'System Processes' },
        { path: '/secure-vault', icon: Database, label: 'Secure Vault' },
        { path: '/reporting-center', icon: BarChart3, label: 'Reporting Center' },
        { path: '/ai-log-analyzer', icon: Cpu, label: 'AI Log Analyzer' },
      ],
    },
    {
      title: 'EDUCATION & SUPPORT',
      items: [
        { path: '/education', icon: Lightbulb, label: 'Cyber Education' },
        { path: '/support', icon: Settings, label: 'Support Center' },
        { path: '/reports', icon: FileText, label: 'Reports' },
      ],
    },
  ]

  // SUPERADMIN EXCLUSIVE FEATURES - Advanced Government Cyber Command
  const superadminNavigation = [
    {
      title: 'COMMAND CENTER',
      items: [
        { path: '/super-admin/soc', icon: Shield, label: 'SOC Command Center' },
        { path: '/super-admin/dashboard', icon: Target, label: 'Super Admin Dashboard' },
      ],
    },
    {
      title: 'ENTERPRISE AI DASHBOARDS',
      items: [
        { path: '/super-admin/master-control-dashboard', icon: Monitor, label: 'Master Control Dashboard' },
        { path: '/super-admin/advanced-threat-intelligence-hub', icon: Radar, label: 'Advanced Threat Intelligence Hub' },
        { path: '/super-admin/ai-threat-prioritization-engine', icon: Target, label: 'AI Threat Prioritization Engine' },
        { path: '/super-admin/enterprise-compliance-orchestrator', icon: Scale, label: 'Enterprise Compliance Orchestrator' },
        { path: '/super-admin/customer-safety-dashboard', icon: Shield, label: 'Customer Safety Dashboard' },
      ],
    },
    {
      title: 'GOVERNANCE & COMPLIANCE',
      items: [
        { path: '/super-admin/organization-governance', icon: Users, label: 'Organization Governance' },
        { path: '/super-admin/compliance-audit', icon: FileCheck, label: 'Compliance & Audit' },
      ],
    },
    {
      title: 'OPERATIONS MANAGEMENT',
      items: [
        { path: '/super-admin/analyst-operations', icon: User, label: 'Analyst Operations' },
        { path: '/super-admin/incident-command', icon: AlertTriangle, label: 'Incident Command Center' },
      ],
    },
    {
      title: 'AI & AUTONOMOUS SYSTEMS',
      items: [
        { path: '/super-admin/ai-strategic-command', icon: Award, label: 'AI Strategic Command Center' },
        { path: '/super-admin/neural-threat-intelligence', icon: Brain, label: 'Neural Threat Intelligence Hub' },
        { path: '/super-admin/ai-control-center', icon: Settings, label: 'AI Control Center' },
      ],
    },
    {
      title: 'ADVANCED AI OPERATIONS',
      items: [
        { path: '/super-admin/autonomous-defense-orchestrator', icon: Shield, label: 'Autonomous Defense Orchestrator' },
        { path: '/super-admin/quantum-ai-defense', icon: Cpu, label: 'Quantum AI Defense Network' },
        { path: '/super-admin/ai-global-intelligence-fusion', icon: Network, label: 'AI Global Intelligence Fusion' },
        { path: '/super-admin/predictive-cyber-operations', icon: Target, label: 'Predictive Cyber Operations Center' },
      ],
    },
    {
      title: 'INTELLIGENCE & RESPONSE',
      items: [
        { path: '/super-admin/intelligence-fusion', icon: Network, label: 'Intelligence Fusion' },
        { path: '/super-admin/threat-response', icon: Shield, label: 'Threat Response Center' },
      ],
    },
    {
      title: 'GLOBAL OPERATIONS',
      items: [
        { path: '/super-admin/cyber-operations', icon: Target, label: 'Cyber Operations' },
        { path: '/super-admin/global-operations', icon: Globe, label: 'Global Operations' },
        { path: '/super-admin/cyber-warfare-command', icon: Zap, label: 'Cyber Warfare Command' },
        { path: '/super-admin/emergency-command', icon: Siren, label: 'Emergency Command' },
      ],
    },
    {
      title: 'GOVERNMENT CYBER COMMAND',
      items: [
        { path: '/super-admin/national-cyber-command', icon: Shield, label: 'National Cyber Command Center' },
        { path: '/super-admin/critical-infrastructure-hub', icon: Cpu, label: 'Critical Infrastructure Protection' },
        { path: '/super-admin/cross-agency-intelligence', icon: Network, label: 'Cross-Agency Intelligence Fusion' },
        { path: '/super-admin/emergency-cyber-response', icon: AlertTriangle, label: 'Emergency Cyber Response Coordination' },
      ],
    },
    {
      title: 'ENTERPRISE AI OPERATIONS',
      items: [
        { path: '/super-admin/enterprise-risk-management', icon: BarChart3, label: 'Enterprise Risk Management AI' },
        { path: '/super-admin/global-supply-chain-security', icon: Globe, label: 'Global Supply Chain Security' },
        { path: '/super-admin/financial-fraud-intelligence', icon: TrendingUp, label: 'Financial Fraud Intelligence' },
        { path: '/super-admin/executive-protection-suite', icon: Lock, label: 'Executive Protection Suite' },
      ],
    },
  ]

  // Return navigation based on role - completely separate
  switch (userRole) {
    case 'admin':
      return adminNavigation
    case 'analyst':
      return analystNavigation
    case 'user':
      return userNavigation
    case 'superadmin':
      return superadminNavigation
    default:
      return userNavigation // fallback to user navigation
  }
}

function Sidebar() {
  const { user, logout } = useAuth();
  const { theme } = useTheme();
  const navigationGroups = getNavigationGroups(user?.role);
  const [activeItem, setActiveItem] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);

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
                const IconComponent = item.icon;
                const isSuperAdmin = user?.role === 'superadmin';
                const isActive = activeItem === item.path;

                // Color schemes for different roles
                const iconColors = {
                  superadmin: {
                    default: 'text-orange-400',
                    active: 'text-orange-300',
                    hover: 'text-orange-300'
                  },
                  admin: {
                    default: 'text-blue-400',
                    active: 'text-blue-300',
                    hover: 'text-blue-300'
                  },
                  analyst: {
                    default: 'text-green-400',
                    active: 'text-green-300',
                    hover: 'text-green-300'
                  },
                  user: {
                    default: 'text-slate-400',
                    active: 'text-slate-300',
                    hover: 'text-slate-300'
                  }
                };

                const colors = iconColors[user?.role] || iconColors.user;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setActiveItem(item.path)}
                    className={`group flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 relative overflow-hidden ${
                      isActive
                        ? `${isSuperAdmin ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30' : 'bg-slate-600/50 border border-slate-500/50'}`
                        : `hover:${isSuperAdmin ? 'bg-orange-500/10' : 'bg-slate-700/30'}`
                    }`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.625rem 0.75rem',
                      borderRadius: '0.5rem',
                      position: 'relative'
                    }}
                  >
                    {/* Active indicator for Super Admin */}
                    {isSuperAdmin && isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-red-400 rounded-r-full"></div>
                    )}

                    <div className="flex items-center flex-1 min-w-0">
                      <IconComponent
                        className={`w-5 h-5 flex-shrink-0 transition-colors duration-200 ${
                          isActive ? colors.active : colors.default
                        } group-hover:${colors.hover}`}
                        style={{
                          width: '1.25rem',
                          height: '1.25rem',
                          flexShrink: 0
                        }}
                      />
                      <span
                        className={`font-medium text-sm ml-3 truncate transition-colors duration-200 ${
                          isActive ? 'text-white' : 'text-slate-300'
                        } group-hover:text-white`}
                        style={{
                          fontWeight: '500',
                          fontSize: '0.875rem',
                          marginLeft: '0.75rem'
                        }}
                      >
                        {item.label}
                      </span>
                    </div>

                    {/* Subtle glow effect for Super Admin */}
                    {isSuperAdmin && (
                      <div className={`absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-orange-500/10 to-red-500/10'
                          : 'bg-gradient-to-r from-orange-500/5 to-red-500/5'
                      }`}></div>
                    )}
                  </NavLink>
                )
              })}
            </div>
          </motion.div>
        ))}
      </nav>

      {/* Theme Toggle Only */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex justify-center">
          <ThemeToggle />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
