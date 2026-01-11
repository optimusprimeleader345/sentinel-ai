// Global Attack Map Data for Enterprise Geopolitical Intelligence
export const worldCountries = [
  // Major attacking countries (with security threat levels)
  { id: "CN", name: "China", lat: 35.86, lng: 104.19, threatLevel: "critical", attacksOrigin: 2847 },
  { id: "RU", name: "Russia", lat: 61.52, lng: 105.32, threatLevel: "high", attacksOrigin: 1923 },
  { id: "IR", name: "Iran", lat: 32.42, lng: 53.69, threatLevel: "high", attacksOrigin: 1345 },
  { id: "KP", name: "North Korea", lat: 40.34, lng: 127.51, threatLevel: "critical", attacksOrigin: 892 },
  { id: "VN", name: "Vietnam", lat: 14.05, lng: 108.28, threatLevel: "medium", attacksOrigin: 756 },

  // Target countries (receiving attacks)
  { id: "US", name: "United States", lat: 37.09, lng: -95.71, receivedAttacks: 4251 },
  { id: "EU", name: "European Union", lat: 50.11, lng: 9.65, receivedAttacks: 3287 },
  { id: "JP", name: "Japan", lat: 36.20, lng: 138.25, receivedAttacks: 1543 },
  { id: "KR", name: "South Korea", lat: 35.91, lng: 127.77, receivedAttacks: 1247 },
  { id: "AU", name: "Australia", lat: -25.27, lng: 133.78, receivedAttacks: 789 },

  // Active attack hubs
  { id: "BR", name: "Brazil", lat: -14.24, lng: -51.93, activeIncidents: 634 },
  { id: "IN", name: "India", lat: 20.59, lng: 78.96, activeIncidents: 923 },
  { id: "ZA", name: "South Africa", lat: -30.56, lng: 22.94, growingThreats: 548 },

  // Monitoring points
  { id: "GB", name: "United Kingdom", lat: 55.38, lng: -3.44, monitoringLevel: "high" },
  { id: "CA", name: "Canada", lat: 56.13, lng: -106.35, monitoringLevel: "high" },
  { id: "SG", name: "Singapore", lat: 1.35, lng: 103.82, monitoringLevel: "high" },
];

export const activeAttackFlows = [
  // High-severity attacks (black/red)
  {
    id: 1,
    from: { lat: 35.86, lng: 104.19, country: "China" }, // Beijing
    to: { lat: 37.09, lng: -95.71, country: "USA" },
    severity: "critical",
    attacksPerHour: 45,
    type: "APT",
    description: "Targeted espionage campaign"
  },
  {
    id: 2,
    from: { lat: 61.52, lng: 105.32, country: "Russia" }, // Moscow
    to: { lat: 50.11, lng: 9.65, country: "EU" },
    severity: "high",
    attacksPerHour: 32,
    type: "Ransomware",
    description: "Financial institution targeting"
  },
  {
    id: 3,
    from: { lat: 32.42, lng: 53.69, country: "Iran" }, // Tehran
    to: { lat: 36.20, lng: 138.25, country: "Japan" },
    severity: "high",
    attacksPerHour: 28,
    type: "DDoS",
    description: "Critical infrastructure disruption"
  },

  // Medium-severity attacks (orange)
  {
    id: 4,
    from: { lat: 40.34, lng: 127.51, country: "North Korea" }, // Pyongyang
    to: { lat: 35.91, lng: 127.77, country: "South Korea" },
    severity: "medium",
    attacksPerHour: 18,
    type: "Malware",
    description: "Cross-border espionage"
  },
  {
    id: 5,
    from: { lat: 14.05, lng: 108.28, country: "Vietnam" }, // Hanoi
    to: { lat: -25.27, lng: 133.78, country: "Australia" },
    severity: "medium",
    attacksPerHour: 12,
    type: "Phishing",
    description: "Credential harvesting campaign"
  },
  {
    id: 6,
    from: { lat: -14.24, lng: -51.93, country: "Brazil" }, // Brasilia
    to: { lat: 55.38, lng: -3.44, country: "UK" },
    severity: "medium",
    attacksPerHour: 9,
    type: "Scams",
    description: "Financial fraud operations"
  },
];

export const attackPredictions = [
  {
    region: "Eastern Europe",
    threat: "APT Campaigns",
    probability: 87,
    timeframe: "48 hours",
    expectedIncrease: 145,
    aiConfidence: 94
  },
  {
    region: "Southeast Asia",
    threat: "DDoSNetworks",
    probability: 72,
    timeframe: "7 days",
    expectedIncrease: 89,
    aiConfidence: 87
  },
  {
    region: "Middle East",
    threat: "Advanced Malware",
    probability: 63,
    timeframe: "14 days",
    expectedIncrease: 67,
    aiConfidence: 82
  },
];

export const realTimeMetrics = [
  { label: "Global Attack Flows", value: 132, change: "+12", status: "active" },
  { label: "Countries Under Attack", value: 48, change: "+3", status: "critical" },
  { label: "Critical Infrastructures", value: 27, change: "0", status: "stable" },
  { label: "Active Threat Actors", value: 94, change: "+8", status: "growing" },
];

export const threatClusters = [
  {
    cluster: "Chinese APT",
    countries: ["CN", "KR", "JP", "US"],
    attacks: 2847,
    patterns: "State-sponsored espionage",
    confidence: 96
  },
  {
    cluster: "Russian Ransomware",
    countries: ["RU", "EU", "US", "AU"],
    attacks: 1923,
    patterns: "Financial attacks",
    confidence: 92
  },
  {
    cluster: "Iranian DDoS",
    countries: ["IR", "JP", "EU"],
    attacks: 1345,
    patterns: "Disruption campaigns",
    confidence: 88
  },
];

export const emergingThreats = [
  {
    country: "Nigeria",
    threatType: "Business Email Compromise",
    trend: "rapidly increasing",
    projectedIncrease: "+342%",
    timeframe: "next month"
  },
  {
    country: "Colombia",
    threatType: "Supply Chain Attacks",
    trend: "viral expansion",
    projectedIncrease: "+189%",
    timeframe: "next quarter"
  },
  {
    country: "Ukraine",
    threatType: "Critical Infrastructure",
    trend: "geopolitical escalation",
    projectedIncrease: "+276%",
    timeframe: "next week"
  },
];
