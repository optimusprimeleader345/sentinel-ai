export const threatTrendData = [
  { time: '00:00', threats: 2, criticalAlerts: 0 },
  { time: '04:00', threats: 5, criticalAlerts: 1 },
  { time: '08:00', threats: 12, criticalAlerts: 2 },
  { time: '12:00', threats: 8, criticalAlerts: 1 },
  { time: '16:00', threats: 15, criticalAlerts: 3 },
  { time: '20:00', threats: 7, criticalAlerts: 1 },
  { time: 'Now', threats: 9, criticalAlerts: 2 },
];

export const attackVectorsData = [
  { name: 'Malware', value: 35, color: '#ef4444' },
  { name: 'Phishing', value: 28, color: '#f59e0b' },
  { name: 'DDoS', value: 18, color: '#3b82f6' },
  { name: 'Ransomware', value: 12, color: '#8b5cf6' },
  { name: 'Zero Day', value: 7, color: '#06b6d4' },
];

export const severityHeatmapData = [
  { day: 'Mon', critical: 2, high: 8, medium: 15, low: 25 },
  { day: 'Tue', critical: 1, high: 6, medium: 12, low: 18 },
  { day: 'Wed', critical: 3, high: 10, medium: 20, low: 22 },
  { day: 'Thu', critical: 1, high: 4, medium: 8, low: 15 },
  { day: 'Fri', critical: 2, high: 7, medium: 14, low: 20 },
  { day: 'Sat', critical: 0, high: 2, medium: 6, low: 10 },
  { day: 'Sun', critical: 1, high: 3, medium: 9, low: 12 },
];
