// Advanced Threat Data for SentinelAI
export const darkWebIntel = {
  stolenCredentialsCount: 12458000,
  leakedAssets: 56789,
  marketplaceMentions: 23,
  ransomwareGroupActivity: [
    {
      group: 'Conti',
      status: 'Active',
      targets: 'Healthcare & Government',
      recentActivity: '3 successful attacks this week'
    },
    {
      group: 'LockBit',
      status: 'Active',
      targets: 'Corporate Networks',
      recentActivity: 'Negotiating with victim #B34'
    },
    {
      group: 'REvil',
      status: 'Dissolved',
      targets: 'Mixed',
      recentActivity: 'Group disbanded, affiliates continue'
    },
    {
      group: 'DarkSide',
      status: 'Inactive',
      targets: 'Energy & Infrastructure',
      recentActivity: 'No activity since disbandment'
    }
  ]
};

export const threatCorrelation = {
  correlatedEvents: [
    {
      id: 'C-001',
      pattern: 'Phishing → Credential Theft → Lateral Movement',
      relatedIPs: ['192.168.1.100', '10.0.0.5'],
      relatedDomains: ['malicious-pay.com', 'evil-corp.net'],
      severity: 'High',
      timestamp: '2025-11-17T12:30:00Z',
      description: 'Credential harvesting campaign targeting financial sector'
    },
    {
      id: 'C-002',
      pattern: 'Malware Distribution → Data Exfiltration',
      relatedIPs: ['203.0.113.23'],
      relatedDomains: ['suspicious-bank.net'],
      severity: 'Critical',
      timestamp: '2025-11-17T12:15:00Z',
      description: 'Advanced persistent threat with data theft'
    },
    {
      id: 'C-003',
      pattern: 'DDoS Attack → Web Defacement',
      relatedIPs: ['45.67.89.101', '185.23.44.21'],
      relatedDomains: [],
      severity: 'Medium',
      timestamp: '2025-11-17T12:00:00Z',
      description: 'Website compromise attempt blocked'
    },
    {
      id: 'C-004',
      pattern: 'Reconnaissance → Exploitation',
      relatedIPs: ['172.16.0.42'],
      relatedDomains: ['scan-target.org'],
      severity: 'Low',
      timestamp: '2025-11-17T11:45:00Z',
      description: 'Automated vulnerability scanning detected'
    }
  ]
};

export const classificationRules = [
  {
    keywords: ['malware', 'virus', 'trojan', 'ransomware', 'worm'],
    classification: 'Malware',
    confidence: 95,
    action: 'Isolate and quarantine the affected system immediately'
  },
  {
    keywords: ['ddos', 'flood', 'amplification', 'syn flood'],
    classification: 'Network Attack',
    confidence: 90,
    action: 'Activate DDoS protection and filter malicious traffic'
  },
  {
    keywords: ['phish', 'spear', 'credential', 'password harvesting'],
    classification: 'Impersonation',
    confidence: 85,
    action: 'Block suspicious domains and educate users about phishing'
  },
  {
    keywords: ['scan', 'port', 'reconnaissance', 'enumeration'],
    classification: 'Recon',
    confidence: 75,
    action: 'Monitor for follow-up attacks and strengthen perimeter security'
  }
];
