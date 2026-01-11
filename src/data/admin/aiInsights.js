export const aiInsights = [
  {
    title: "Automated Response Activated",
    description: "Successfully mitigated potential ransomware attack targeting HR systems",
    time: "2 hours ago",
    type: "success",
    category: "defense",
    confidence: 95
  },
  {
    title: "New Threat Pattern Detected",
    description: "AI clustered 5 similar phishing attempts with 94% similarity confidence",
    time: "4 hours ago",
    type: "warning",
    category: "intelligence",
    confidence: 94
  },
  {
    title: "System Optimization Applied",
    description: "Reallocated 30% more resources to high-traffic endpoints based on usage patterns",
    time: "6 hours ago",
    type: "info",
    category: "system",
    confidence: 88
  },
];

export const aiActions = [
  {
    id: 1,
    action: "Block IP Range",
    reason: "Detected suspicious traffic from known malicious IP range",
    timestamp: "2025-01-05T11:30:00Z",
    severity: "high",
    status: "completed"
  },
  {
    id: 2,
    action: "Update Firewall Rules",
    reason: "AI detected patterns requiring enhanced inbound filtering",
    timestamp: "2025-01-05T10:15:00Z",
    severity: "medium",
    status: "completed"
  },
  {
    id: 3,
    action: "Isolate Endpoint",
    reason: "Malware detected - automatically isolated affected system",
    timestamp: "2025-01-05T09:45:00Z",
    severity: "critical",
    status: "completed"
  },
  {
    id: 4,
    action: "Send Alert",
    reason: "Anomalous login pattern detected for admin user",
    timestamp: "2025-01-05T08:20:00Z",
    severity: "medium",
    status: "pending"
  },
];

export const aiPredictions = [
  { type: 'Phishing Campaign', likelihood: 85, timeframe: '24h', confidence: 'High' },
  { type: 'Ransomware Attack', likelihood: 72, timeframe: '48h', confidence: 'Medium' },
  { type: 'Insider Threat', likelihood: 63, timeframe: '72h', confidence: 'Medium' },
  { type: 'Supply Chain Compromise', likelihood: 45, timeframe: '7d', confidence: 'Low' },
];
