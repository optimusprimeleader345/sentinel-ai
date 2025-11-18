// Mock data for Threat Overview
export const threatOverviewData = {
  totalAttacks24h: 1247,
  criticalThreats: 23,
  highRiskIPs: 156,
  suspiciousDomains: 89,
  threatTypes: [
    { name: 'Malware', value: 423, color: '#ef4444' },
    { name: 'Phishing', value: 234, color: '#f97316' },
    { name: 'DDoS', value: 189, color: '#eab308' },
    { name: 'Injection', value: 145, color: '#22c55e' },
    { name: 'Other', value: 256, color: '#3b82f6' }
  ],
  severityLevels: [
    { name: 'Critical', value: 23, color: '#ef4444' },
    { name: 'High', value: 89, color: '#f97316' },
    { name: 'Medium', value: 234, color: '#eab308' },
    { name: 'Low', value: 901, color: '#22c55e' }
  ],
  monthlyTrend: [
    { month: 'Jan', attacks: 1200 },
    { month: 'Feb', attacks: 1450 },
    { month: 'Mar', attacks: 1100 },
    { month: 'Apr', attacks: 1600 },
    { month: 'May', attacks: 1800 },
    { month: 'Jun', attacks: 1400 },
    { month: 'Jul', attacks: 1900 },
    { month: 'Aug', attacks: 2100 },
    { month: 'Sep', attacks: 1750 },
    { month: 'Oct', attacks: 2200 },
    { month: 'Nov', attacks: 1850 },
    { month: 'Dec', attacks: 2380 }
  ],
  recentAttacks: [
    { id: 1, level: 'High', timestamp: '2025-11-17T12:34:56Z', type: 'SQL Injection', source: '192.168.1.100' },
    { id: 2, level: 'Critical', timestamp: '2025-11-17T12:32:44Z', type: 'Malware Upload', source: '203.0.113.23' },
    { id: 3, level: 'Medium', timestamp: '2025-11-17T12:28:12Z', type: 'Suspicious Login', source: '10.0.0.5' },
    { id: 4, level: 'High', timestamp: '2025-11-17T12:24:33Z', type: 'XSS Attempt', source: '172.16.0.42' },
    { id: 5, level: 'Low', timestamp: '2025-11-17T12:19:07Z', type: 'Port Scan', source: '45.67.89.101' }
  ],
  aiRecommendations: [
    'Implement rate limiting on authentication endpoints to prevent brute force attempts',
    'Update firewall rules to block suspicious IP ranges from Asia-Pacific region',
    'Enable multi-factor authentication for all admin accounts immediately'
  ],
  geoHeatmap: {
    'North America': 85,
    'Europe': 72,
    'Asia': 91,
    'Middle East': 68,
    'South America': 54,
    'Africa': 43,
    'Oceania': 29
  },
  mitreFindings: [
    { technique: 'Phishing', tactic: 'Initial Access', detections: 12 },
    { technique: 'Valid Accounts', tactic: 'Initial Access', detections: 8 },
    { technique: 'PowerShell', tactic: 'Execution', detections: 15 },
    { technique: 'Command and Scripting Interpreter', tactic: 'Execution', detections: 9 },
    { technique: 'Create Account', tactic: 'Persistence', detections: 6 },
    { technique: 'Scheduled Task', tactic: 'Persistence', detections: 4 },
    { technique: 'Privilege Escalation', tactic: 'Privilege Escalation', detections: 7 },
    { technique: 'Setuid and Setgid', tactic: 'Privilege Escalation', detections: 3 },
    { technique: 'Deobfuscate/Decode Files or Information', tactic: 'Defense Evasion', detections: 11 },
    { technique: 'Masquerading', tactic: 'Defense Evasion', detections: 5 },
    { technique: 'OS Credential Dumping', tactic: 'Credential Access', detections: 8 },
    { technique: 'Brute Force', tactic: 'Credential Access', detections: 14 },
    { technique: 'Network Sniffing', tactic: 'Discovery', detections: 6 },
    { technique: 'Remote System Discovery', tactic: 'Discovery', detections: 7 },
    { technique: 'Replication Through Removable Media', tactic: 'Lateral Movement', detections: 4 },
    { technique: 'Remote Services', tactic: 'Lateral Movement', detections: 9 },
    { technique: 'Application Layer Protocol', tactic: 'Command & Control', detections: 12 },
    { technique: 'Data Obfuscation', tactic: 'Command & Control', detections: 8 },
    { technique: 'Exfiltration Over Alternative Protocol', tactic: 'Exfiltration', detections: 5 },
    { technique: 'Automated Exfiltration', tactic: 'Exfiltration', detections: 7 }
  ]
};

export const iocLookupData = {
  ip: {
    '192.168.1.100': {
      threatLevel: 'Critical',
      reputationScore: 95,
      asn: 'AS64496',
      blacklistStatus: 'Listed in 8 blacklists',
      lastSeen: '2025-11-17T12:00:00Z',
      category: 'Command & Control',
      country: 'Russia',
      isp: 'Malicious Hosting Ltd',
      malwareHistory: ['Emotet', 'Trickbot', 'Ryuk'],
      relatedThreats: ['Botnet C2', 'DDoS Attacks', 'Data Exfiltration'],
      firstSeen: '2025-10-15T08:30:00Z',
      tags: ['Malware C2', 'DDoS Source', 'Botnet']
    },
    '203.0.113.23': {
      threatLevel: 'High',
      reputationScore: 78,
      asn: 'AS4837',
      blacklistStatus: 'Listed in 5 blacklists',
      lastSeen: '2025-11-17T12:30:00Z',
      category: 'Malware Distribution',
      country: 'China',
      isp: 'Hostile Networks Inc',
      malwareHistory: ['Trojans', 'Ransomware'],
      relatedThreats: ['File Sharing Malware', 'Drive-by Downloads'],
      firstSeen: '2025-11-01T15:20:00Z',
      tags: ['Trojan Horse', 'File Sharing', 'Malware Distribution']
    }
  },
  domain: {
    'malicious-site.com': {
      threatLevel: 'Critical',
      reputationScore: 92,
      asn: 'AS16509',
      blacklistStatus: 'Listed in 12 blacklists',
      lastSeen: '2025-11-17T12:15:00Z',
      category: 'Phishing',
      registrar: 'Evil Domains LLC',
      nameServers: ['ns1.evil.com', 'ns2.evil.com'],
      malwareHistory: ['Phishing Kits', 'Credential Harvesters'],
      relatedThreats: ['Banking Fraud', 'Identity Theft', 'BEC Attacks'],
      firstSeen: '2025-09-20T10:45:00Z',
      tags: ['Phishing', 'Credential Theft', 'Scam']
    },
    'suspicious-bank.net': {
      threatLevel: 'Medium',
      reputationScore: 65,
      asn: 'AS14061',
      blacklistStatus: 'Listed in 3 blacklists',
      lastSeen: '2025-11-17T12:10:00Z',
      category: 'Suspicious',
      registrar: 'Unknown',
      nameServers: ['ns1.unknown.org'],
      malwareHistory: [],
      relatedThreats: ['Potential Banking Scam', 'Suspicious Activity'],
      firstSeen: '2025-11-10T14:22:00Z',
      tags: ['Potential Scam', 'Suspicious']
    }
  },
  hash: {
    'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3': {
      threatLevel: 'Critical',
      reputationScore: 98,
      asn: 'N/A',
      blacklistStatus: 'Listed in 15 blacklists',
      lastSeen: '2025-11-17T12:20:00Z',
      type: 'SHA256',
      fileName: 'trojan.exe',
      fileSize: '245KB',
      category: 'Trojan',
      malwareHistory: ['Banking Trojan', 'Keylogger', 'Ransomware Components'],
      relatedThreats: ['Financial Fraud', 'Data Theft', 'System Compromise'],
      firstSeen: '2025-08-05T09:15:00Z',
      tags: ['Banking Trojan', 'Keylogger', 'Ransomware', 'Financial Malware']
    },
    'd41d8cd98f00b204e9800998ecf8427e': {
      threatLevel: 'Low',
      reputationScore: 5,
      asn: 'N/A',
      blacklistStatus: 'Not listed',
      lastSeen: '2025-11-17T12:05:00Z',
      type: 'MD5',
      fileName: 'safe-file.txt',
      fileSize: '1KB',
      category: 'Clean',
      malwareHistory: [],
      relatedThreats: [],
      firstSeen: '2025-11-17T12:05:00Z',
      tags: ['Verified', 'Whitelisted', 'Clean']
    }
  }
};
