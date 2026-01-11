// Enterprise User Management Data for SentinelAI Admin Dashboard
export const userDatabase = [
  // Active Users
  {
    id: 1,
    username: "johndoe_admin",
    email: "john.doe@sentinelai.com",
    role: "admin",
    department: "Security Operations Center",
    status: "active",
    lastLogin: "2025-12-06T09:30:00Z",
    securityLevel: 5,
    riskScore: 12,
    mfaEnabled: true,
    failedLoginAttempts: 0,
    createdAt: "2024-01-15T00:00:00Z",
    permissions: ["admin_view", "user_manage", "system_access", "reports_view"],
    sessions: { current: 1, totalToday: 8, avgSessionTime: 145 },
    devices: ["desktop", "mobile"],
    lastActivity: "Active now",
    complianceScore: 98
  },
  {
    id: 2,
    username: "sarahsmith_analyst",
    email: "sarah.smith@sentinelai.com",
    role: "analyst",
    department: "Threat Intelligence Division",
    status: "active",
    lastLogin: "2025-12-06T08:45:00Z",
    securityLevel: 4,
    riskScore: 8,
    mfaEnabled: true,
    failedLoginAttempts: 0,
    createdAt: "2024-02-20T00:00:00Z",
    permissions: ["threat_analyze", "reports_view", "intelligence_access"],
    sessions: { current: 1, totalToday: 6, avgSessionTime: 120 },
    devices: ["desktop", "tablet"],
    lastActivity: "2 minutes ago",
    complianceScore: 95
  },
  {
    id: 3,
    username: "mikesecure_user",
    email: "mike.jones@usercompany.com",
    role: "user",
    department: "Secured Services",
    status: "active",
    lastLogin: "2025-12-06T07:22:00Z",
    securityLevel: 2,
    riskScore: 15,
    mfaEnabled: false,
    failedLoginAttempts: 1,
    createdAt: "2024-03-10T00:00:00Z",
    permissions: ["dashboard_view", "scan_rerun", "reports_personal"],
    sessions: { current: 1, totalToday: 3, avgSessionTime: 45 },
    devices: ["desktop"],
    lastActivity: "1 hour ago",
    complianceScore: 82
  },
  {
    id: 4,
    username: "emergency_response",
    email: "emergency@sentinelai.com",
    role: "analyst",
    department: "Incident Response Team",
    status: "active",
    lastLogin: "2025-12-06T09:15:00Z",
    securityLevel: 4,
    riskScore: 5,
    mfaEnabled: true,
    failedLoginAttempts: 0,
    createdAt: "2024-01-30T00:00:00Z",
    permissions: ["incident_access", "system_alerts", "emergency_response"],
    sessions: { current: 2, totalToday: 12, avgSessionTime: 95 },
    devices: ["desktop", "mobile", "laptop"],
    lastActivity: "Active now",
    complianceScore: 99
  },
  {
    id: 5,
    username: "inactive.user_old",
    email: "inactive.user@oldcompany.com",
    role: "user",
    department: "Archived Accounts",
    status: "inactive",
    lastLogin: "2025-10-15T14:22:00Z",
    securityLevel: 1,
    riskScore: 0,
    mfaEnabled: false,
    failedLoginAttempts: 0,
    createdAt: "2023-06-15T00:00:00Z",
    permissions: ["none"],
    sessions: { current: 0, totalToday: 0, avgSessionTime: 0 },
    devices: [],
    lastActivity: "61 days ago",
    complianceScore: 0
  },
  // Pending Users (under review)
  {
    id: 6,
    username: "newrecruit_pending",
    email: "new.recruit@company.com",
    role: "user",
    department: "New Employees",
    status: "pending",
    lastLogin: null,
    securityLevel: 1,
    riskScore: 0,
    mfaEnabled: false,
    failedLoginAttempts: 0,
    createdAt: "2025-12-05T10:30:00Z",
    permissions: ["none"],
    sessions: { current: 0, totalToday: 0, avgSessionTime: 0 },
    devices: [],
    lastActivity: "Never logged in",
    complianceScore: 0
  },
  // Suspended Users (security concerns)
  {
    id: 7,
    username: "suspicious.activity",
    email: "suspicious@somecompany.com",
    role: "user",
    department: "Security Review",
    status: "suspended",
    lastLogin: "2025-12-02T16:45:00Z",
    securityLevel: 0,
    riskScore: 92,
    mfaEnabled: false,
    failedLoginAttempts: 12,
    createdAt: "2024-08-20T00:00:00Z",
    permissions: ["none"],
    sessions: { current: 0, totalToday: 0, avgSessionTime: 0 },
    devices: ["mobile"],
    lastActivity: "4 days ago",
    complianceScore: 15
  },
];

export const userActivityMetrics = [
  { label: "Total Users", value: 2347, change: "+12%", status: "active" },
  { label: "Active Users", value: 2189, change: "+8%", status: "growing" },
  { label: "New Users This Month", value: 78, change: "+23%", status: "growth" },
  { label: "Suspended Users", value: 45, change: "-15%", status: "improving" },
  { label: "MFA Adoption Rate", value: "68%", change: "+12%", status: "progressing" },
  { label: "Average Risk Score", value: 24, change: "-8%", status: "improving" },
];

export const roleDistribution = [
  { role: "Admin", count: 12, percentage: 2.5, color: "#dc2626" },
  { role: "Analyst", count: 89, percentage: 18.7, color: "#ea580c" },
  { role: "User", count: 2287, percentage: 78.8, color: "#3b82f6" },
  { role: "Pending", count: 23, percentage: 0.0, color: "#ca8a04" },
];

export const securityAlerts = [
  {
    id: 1,
    userId: 7,
    userName: "suspicious.activity",
    alertType: "Multiple Failed Logins",
    severity: "high",
    detectedAt: "2025-12-06T08:30:00Z",
    status: "active",
    description: "12 consecutive failed login attempts from 3 different IPs",
    recommendedAction: "Account temporarily suspended, password reset required"
  },
  {
    id: 2,
    userId: 3,
    userName: "mikesecure_user",
    alertType: "MFA Disabled",
    severity: "medium",
    detectedAt: "2025-12-06T05:15:00Z",
    status: "active",
    description: "User has disabled MFA for over 30 days",
    recommendedAction: "Send MFA reactivation reminder"
  },
  {
    id: 3,
    userId: 9,
    userName: "weakpassword_user",
    alertType: "Weak Password",
    severity: "low",
    detectedAt: "2025-12-04T12:00:00Z",
    status: "resolved",
    description: "Password changed to meet complexity requirements",
    recommendedAction: "Monitor next login"
  },
];

export const userGrowthData = [
  { month: "Jul 2024", active: 1456, newUsers: 67, suspended: 89 },
  { month: "Aug 2024", active: 1578, newUsers: 89, suspended: 76 },
  { month: "Sep 2024", active: 1745, newUsers: 134, suspended: 67 },
  { month: "Oct 2024", active: 1892, newUsers: 98, suspended: 58 },
  { month: "Nov 2024", active: 2019, newUsers: 82, suspended: 52 },
  { month: "Dec 2024", active: 2189, newUsers: 78, suspended: 45 },
];

export const departmentStats = [
  { department: "SOC", count: 45, active: 43, avgRisk: 8, mfaRate: 100 },
  { department: "Threat Intelligence", count: 78, active: 76, avgRisk: 12, mfaRate: 95 },
  { department: "Executive", count: 23, active: 23, avgRisk: 5, mfaRate: 100 },
  { department: "Engineering", count: 156, active: 154, avgRisk: 18, mfaRate: 87 },
  { department: "Support", count: 89, active: 85, avgRisk: 15, mfaRate: 82 },
  { department: "External Users", count: 1956, active: 1808, avgRisk: 28, mfaRate: 45 },
];

export const recentUserActions = [
  {
    id: 1,
    timestamp: "2025-12-06T09:45:00Z",
    userName: "system_admin",
    action: "User Created",
    targetUser: "new_hr_analyst",
    details: "New HR compliance analyst account created",
    status: "success"
  },
  {
    id: 2,
    timestamp: "2025-12-06T09:30:00Z",
    userName: "sarahsmith_analyst",
    action: "Password Changed",
    targetUser: "sarahsmith_analyst",
    details: "Scheduled password rotation completed",
    status: "success"
  },
  {
    id: 3,
    timestamp: "2025-12-06T09:15:00Z",
    userName: "ai_security_system",
    action: "Account Suspended",
    targetUser: "suspicious.activity",
    details: "Automated suspension due to security policy violation",
    status: "alert"
  },
  {
    id: 4,
    timestamp: "2025-12-06T08:45:00Z",
    userName: "emergency_response",
    action: "Role Changed",
    targetUser: "temp_incident_user",
    details: "Temporarily escalated access during incident response",
    status: "warning"
  },
];

export const pendingApprovals = [
  {
    id: 1,
    userName: "john.newhire",
    email: "john.newhire@company.com",
    department: "IT Security",
    requestedRole: "analyst",
    requester: "hr_manager",
    requestedAt: "2025-12-05T14:30:00Z",
    justification: "New security operations analyst hire"
  },
  {
    id: 2,
    userName: "vendor_external",
    email: "security@vendor.com",
    department: "External Vendors",
    requestedRole: "user",
    requester: "procurement_mgr",
    requestedAt: "2025-12-04T10:00:00Z",
    justification: "Third-party security assessment access"
  },
];

export const userComplianceStats = [
  { complianceType: "Password Policy", compliant: 2189, nonCompliant: 8, percentage: 99.6 },
  { complianceType: "MFA Enabled", compliant: 1587, nonCompliant: 610, percentage: 72.2 },
  { complianceType: "Security Training", compliant: 2103, nonCompliant: 94, percentage: 95.7 },
  { complianceType: "Access Reviews", compliant: 2267, nonCompliant: 10, percentage: 99.6 },
];
