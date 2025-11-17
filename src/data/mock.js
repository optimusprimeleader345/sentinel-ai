// Mock data for SentinelAI Cyber Defense Center

export const kpiData = [
  {
    id: 1,
    title: 'Active Threats',
    value: '2',
    label: 'Requires attention',
    icon: 'alert-triangle',
    color: 'red',
    gradient: 'from-red-500/20 to-red-900/20',
  },
  {
    id: 2,
    title: 'Blocked Attacks',
    value: '6',
    subtext: 'Last 24 hours',
    growth: '+12%',
    icon: 'shield-check',
    color: 'green',
    gradient: 'from-green-500/20 to-green-900/20',
  },
  {
    id: 3,
    title: 'Risk Level',
    badge: 'MEDIUM',
    subtext: 'Score: 81/100',
    color: 'yellow',
    gradient: 'from-yellow-500/20 to-yellow-900/20',
  },
  {
    id: 4,
    title: 'AI Predictions',
    value: '24',
    subtext: 'Threats prevented',
    growth: '+8%',
    icon: 'brain',
    color: 'purple',
    gradient: 'from-purple-500/20 to-purple-900/20',
  },
]

export const aiAgentActivities = [
  {
    id: 1,
    action: 'Blocked suspicious IP',
    details: '192.168.1.100',
    timestamp: '2 min ago',
    icon: 'shield',
  },
  {
    id: 2,
    action: 'Isolated potential malware',
    details: 'trojan.exe',
    timestamp: '5 min ago',
    icon: 'virus',
  },
  {
    id: 3,
    action: 'Detected phishing attempt',
    details: 'suspicious-email.com',
    timestamp: '12 min ago',
    icon: 'mail-warning',
  },
  {
    id: 4,
    action: 'Updated firewall rules',
    details: '3 new rules applied',
    timestamp: '18 min ago',
    icon: 'settings',
  },
]

export const securityScore = {
  score: 87,
  maxScore: 100,
  level: 'DEFENDER LEVEL',
  badge: 'Level 3 Defi',
}

export const recentScans = [
  {
    id: 1,
    type: 'URL Scan',
    target: 'https://example.com',
    status: 'safe',
    timestamp: '5 min ago',
  },
  {
    id: 2,
    type: 'Email Scan',
    target: 'suspicious@email.com',
    status: 'threat',
    timestamp: '12 min ago',
  },
  {
    id: 3,
    type: 'File Scan',
    target: 'document.pdf',
    status: 'safe',
    timestamp: '25 min ago',
  },
  {
    id: 4,
    type: 'URL Scan',
    target: 'https://malicious-site.com',
    status: 'blocked',
    timestamp: '1 hour ago',
  },
]

export const systemHealth = {
  cpu: 45,
  memory: 62,
  network: 78,
  disk: 34,
}

export const darkWebAlerts = [
  {
    id: 1,
    type: 'Email Leak',
    source: 'Data breach database',
    timestamp: '2 hours ago',
    severity: 'high',
  },
  {
    id: 2,
    type: 'Password Found',
    source: 'Credential dump',
    timestamp: '5 hours ago',
    severity: 'critical',
  },
]
