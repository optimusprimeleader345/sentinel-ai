// Mock data for AI Guardian
export const guardianScore = {
  overall: 78,
  categories: {
    passwordHygiene: { score: 85, status: 'Good' },
    deviceHealth: { score: 92, status: 'Excellent' },
    accountActivity: { score: 65, status: 'Needs Attention' },
    networkSafety: { score: 80, status: 'Good' },
    darkWebExposure: { score: 70, status: 'Moderate' }
  }
};

export const guardianAnomalies = [
  {
    severity: 'High',
    category: 'Account',
    timestamp: '2025-11-17T15:45:00Z',
    description: 'Login attempt from unrecognized device in Russia while account was active in USA'
  },
  {
    severity: 'Medium',
    category: 'Device',
    timestamp: '2025-11-17T12:30:00Z',
    description: 'New application installed with suspicious permissions requested'
  },
  {
    severity: 'Low',
    category: 'Network',
    timestamp: '2025-11-17T10:15:00Z',
    description: 'VPN connection dropped unexpectedly multiple times'
  },
  {
    severity: 'High',
    category: 'Account',
    timestamp: '2025-11-17T09:00:00Z',
    description: 'MFA authentication code requested 5 times in rapid succession'
  },
  {
    severity: 'Medium',
    category: 'Device',
    timestamp: '2025-11-17T08:45:00Z',
    description: 'USB device connected for extended period without recent usage pattern'
  }
];

export const guardianPrivacyScan = [
  {
    type: 'Email Leaks',
    status: 'Found',
    count: 2,
    risk: 'Medium',
    details: 'Email address appeared in two separate data breaches (2019 and 2021)'
  },
  {
    type: 'Password Leaks',
    status: 'Clean',
    count: 0,
    risk: 'Low',
    details: 'No password leaks detected in recent scans'
  },
  {
    type: 'Public Data Exposure',
    status: 'Medium',
    count: 3,
    risk: 'Medium',
    details: 'Personal information found on public profiles and people search sites'
  },
  {
    type: 'Social Media Risk',
    status: 'Low',
    count: 1,
    risk: 'Low',
    details: 'One social media account has minor privacy settings that could be improved'
  }
];

export const guardianDeviceSecurity = {
  osProtectionStatus: 'Active',
  antivirus: 'Enabled',
  firewall: 'Enabled',
  fileIntegrityMonitoring: 'OK',
  usbIntrusionProtection: 'Enabled'
};

export const guardianRecommendations = [
  'Enable MFA on your Google account to prevent unauthorized access',
  'Change password on LinkedIn — email appeared in a 2021 security breach',
  'Review and tighten privacy settings on your Instagram account',
  'Consider rotating your SSH keys that haven\'t been updated in over a year',
  'Enable automatic software updates to maintain device security',
  'Install a password manager to generate and store strong, unique passwords'
];
