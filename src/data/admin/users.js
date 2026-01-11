export const usersData = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', role: 'Admin', status: 'Active', lastLogin: '2025-01-05T10:30:00Z' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', role: 'Analyst', status: 'Active', lastLogin: '2025-01-05T09:45:00Z' },
  { id: 3, name: 'Mike Davis', email: 'mike.davis@company.com', role: 'User', status: 'Inactive', lastLogin: '2025-01-03T14:20:00Z' },
  { id: 4, name: 'Emily Chen', email: 'emily.chen@company.com', role: 'Analyst', status: 'Active', lastLogin: '2025-01-05T11:15:00Z' },
  { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', role: 'User', status: 'Active', lastLogin: '2025-01-04T16:45:00Z' },
  { id: 6, name: 'Lisa Brown', email: 'lisa.brown@company.com', role: 'Admin', status: 'Active', lastLogin: '2025-01-05T08:20:00Z' },
  { id: 7, name: 'Robert Taylor', email: 'robert.taylor@company.com', role: 'User', status: 'Pending', lastLogin: null },
  { id: 8, name: 'Anna Martinez', email: 'anna.martinez@company.com', role: 'Analyst', status: 'Active', lastLogin: '2025-01-05T13:10:00Z' },
];

export const userActivityData = [
  { day: 'Mon', logins: 45, anomalies: 2 },
  { day: 'Tue', logins: 52, anomalies: 1 },
  { day: 'Wed', logins: 38, anomalies: 3 },
  { day: 'Thu', logins: 61, anomalies: 1 },
  { day: 'Fri', logins: 55, anomalies: 4 },
  { day: 'Sat', logins: 23, anomalies: 0 },
  { day: 'Sun', logins: 18, anomalies: 1 },
];

export const rolesDistribution = [
  { name: 'Admin', value: 15, color: '#8b5cf6' },
  { name: 'Analyst', value: 35, color: '#3b82f6' },
  { name: 'User', value: 50, color: '#06b6d4' },
];
