export const systemHealthData = [
  { metric: 'CPU Usage', value: 68, maxValue: 100, color: '#ef4444' },
  { metric: 'Memory', value: 74, maxValue: 100, color: '#3b82f6' },
  { metric: 'Network I/O', value: 42, maxValue: 100, color: '#06b6d4' },
  { metric: 'Storage', value: 85, maxValue: 100, color: '#f59e0b' },
];

export const cpuUsageData = [
  { time: '00:00', usage: 65.2 },
  { time: '01:00', usage: 62.8 },
  { time: '02:00', usage: 58.9 },
  { time: '03:00', usage: 55.1 },
  { time: '04:00', usage: 68.4 },
  { time: '05:00', usage: 72.3 },
  { time: '06:00', usage: 75.6 },
  { time: '07:00', usage: 78.9 },
  { time: '08:00', usage: 82.1 },
  { time: '09:00', usage: 79.5 },
  { time: '10:00', usage: 76.2 },
  { time: '11:00', usage: 73.8 },
];

export const memoryUsageData = [
  { time: '00:00', usage: 85.2 },
  { time: '01:00', usage: 83.8 },
  { time: '02:00', usage: 81.9 },
  { time: '03:00', usage: 79.1 },
  { time: '04:00', usage: 82.4 },
  { time: '05:00', usage: 86.3 },
  { time: '06:00', usage: 89.6 },
  { time: '07:00', usage: 91.9 },
  { time: '08:00', usage: 88.1 },
  { time: '09:00', usage: 85.5 },
  { time: '10:00', usage: 87.2 },
  { time: '11:00', usage: 90.8 },
];

export const systemLogs = [
  {
    id: 1,
    timestamp: '2025-01-05T11:58:00Z',
    level: 'ERROR',
    source: 'Database',
    message: 'Connection timeout exceeded for user session',
    details: 'Failed to establish database connection after 30 seconds'
  },
  {
    id: 2,
    timestamp: '2025-01-05T11:45:00Z',
    level: 'WARNING',
    source: 'Memory',
    message: 'High memory utilization detected',
    details: 'Memory usage exceeded 85% threshold for 5 minutes'
  },
  {
    id: 3,
    timestamp: '2025-01-05T11:30:00Z',
    level: 'INFO',
    source: 'Security',
    message: 'AI defense action executed',
    details: 'Blocked suspicious inbound traffic from IP range'
  },
  {
    id: 4,
    timestamp: '2025-01-05T11:15:00Z',
    level: 'WARNING',
    source: 'Disk',
    message: 'Disk space running low',
    details: 'Available storage below 15% threshold'
  },
  {
    id: 5,
    timestamp: '2025-01-05T10:45:00Z',
    level: 'INFO',
    source: 'Network',
    message: 'VPN connection established',
    details: 'Remote administrator access granted'
  },
];
