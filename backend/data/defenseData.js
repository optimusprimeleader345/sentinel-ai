// Mock data for AI Defense Bot
export const defenseStatus = {
  systemStatus: 'Protected',
  firewall: 'Active',
  intrusionDetection: 'Online',
  anomalyDetection: 'Monitoring',
  lastAutonomousAction: new Date().toISOString()
};

export const defenseActions = [
  {
    actionType: 'Threat blocked',
    severity: 'High',
    timestamp: '2025-11-17T18:40:00Z',
    description: 'Blocked suspicious IP 192.168.1.100 attempting unauthorized access.'
  },
  {
    actionType: 'Malware quarantined',
    severity: 'Critical',
    timestamp: '2025-11-17T18:35:00Z',
    description: 'Detected and isolated Trojan malware in system files.'
  },
  {
    actionType: 'Suspicious IP isolated',
    severity: 'Medium',
    timestamp: '2025-11-17T18:30:00Z',
    description: 'Isolated IP 203.0.113.195 from network due to abnormal behavior.'
  },
  {
    actionType: 'Unauthorized login attempt flagged',
    severity: 'High',
    timestamp: '2025-11-17T18:25:00Z',
    description: 'Flagged multiple failed login attempts from unknown source.'
  },
  {
    actionType: 'Attack pattern neutralized',
    severity: 'Medium',
    timestamp: '2025-11-17T18:20:00Z',
    description: 'Neutralized distributed denial of service pattern.'
  }
];

export const activeThreats = [
  {
    ip: '192.168.1.205',
    type: 'Malware',
    confidence: 95,
    status: 'Neutralized'
  },
  {
    ip: '203.0.113.47',
    type: 'Network Attack',
    confidence: 87,
    status: 'Tracking'
  },
  {
    ip: '45.67.89.123',
    type: 'Phishing',
    confidence: 72,
    status: 'Escalated'
  },
  {
    ip: '10.0.0.78',
    type: 'Recon',
    confidence: 64,
    status: 'Monitoring'
  }
];

export const defenseRecommendations = [
  'Increase firewall strictness due to elevated network anomalies detected in the last 24 hours.',
  'Enable 2FA for admin accounts to prevent unauthorized access attempts.',
  'Unusual login pattern detected from IP ranges in Eastern Europe; consider geo-blocking.',
  'Update intrusion detection signatures to address emerging zero-day exploits.',
  'Schedule automated system integrity checks to maintain proactive defense posture.'
];
