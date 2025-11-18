// Mock prediction data
const mockPredictionSummary = {
  totalThreatsNext7Days: 143,
  confidence: 82,
  todayRisk: "High",
  lastUpdated: "2025-01-05T10:15:00Z"
}

const mockAttackTypes = [
  { day: "Mon", phishing: 23, malware: 12, intrusion: 8, anomalies: 5 },
  { day: "Tue", phishing: 28, malware: 15, intrusion: 11, anomalies: 7 },
  { day: "Wed", phishing: 18, malware: 9, intrusion: 6, anomalies: 3 },
  { day: "Thu", phishing: 30, malware: 17, intrusion: 14, anomalies: 9 },
  { day: "Fri", phishing: 26, malware: 13, intrusion: 10, anomalies: 6 },
  { day: "Sat", phishing: 15, malware: 8, intrusion: 5, anomalies: 2 },
  { day: "Sun", phishing: 12, malware: 6, intrusion: 4, anomalies: 2 }
]

const mockRisks = {
  tomorrowProbability: 72,
  highSeverityChance: 44,
  expectedIntrusions: 18,
  trend: "up"
}

const mockInsights = [
  "Phishing activity is expected to rise due to recent credential leaks in your sector.",
  "Login anomalies from new devices have increased over the last 48 hours.",
  "Ransomware-related network patterns are slightly elevated compared to last week."
]

const mockHeatmap = [
  { day: "Mon", morning: "Low", afternoon: "Medium", evening: "High", night: "Medium" },
  { day: "Tue", morning: "Medium", afternoon: "High", evening: "High", night: "Medium" },
  { day: "Wed", morning: "Low", afternoon: "Medium", evening: "Medium", night: "Low" },
  { day: "Thu", morning: "Medium", afternoon: "High", evening: "Critical", night: "High" },
  { day: "Fri", morning: "Medium", afternoon: "High", evening: "High", night: "Medium" },
  { day: "Sat", morning: "Low", afternoon: "Low", evening: "Medium", night: "Low" },
  { day: "Sun", morning: "Low", afternoon: "Low", evening: "Medium", night: "Low" }
]

const mockExplanation = {
  modelType: "Heuristic + Time-Series-style Mock",
  factors: [
    "Spike in failed login attempts over the last 24 hours.",
    "Elevated malware detection events on critical servers.",
    "Increase in phishing URL submissions in the Scan Center."
  ],
  narrative: "Threat levels for the next 7 days are driven primarily by recent increases in phishing and malware events, combined with abnormal login activity from new locations. While containment measures appear effective on weekends, weekdays show a sustained higher baseline of attacks."
}

export const getPredictionSummary = async (req, res) => {
  try {
    res.json(mockPredictionSummary)
  } catch (error) {
    console.error('Get prediction summary error:', error)
    res.status(500).json({ message: 'Server error fetching prediction summary' })
  }
}

export const getPredictionAttackTypes = async (req, res) => {
  try {
    res.json(mockAttackTypes)
  } catch (error) {
    console.error('Get prediction attack types error:', error)
    res.status(500).json({ message: 'Server error fetching attack type predictions' })
  }
}

export const getPredictionRisks = async (req, res) => {
  try {
    res.json(mockRisks)
  } catch (error) {
    console.error('Get prediction risks error:', error)
    res.status(500).json({ message: 'Server error fetching risk projections' })
  }
}

export const getPredictionInsights = async (req, res) => {
  try {
    res.json(mockInsights)
  } catch (error) {
    console.error('Get prediction insights error:', error)
    res.status(500).json({ message: 'Server error fetching predictive insights' })
  }
}

export const getPredictionHeatmap = async (req, res) => {
  try {
    res.json(mockHeatmap)
  } catch (error) {
    console.error('Get prediction heatmap error:', error)
    res.status(500).json({ message: 'Server error fetching prediction heatmap' })
  }
}

export const getPredictionExplanation = async (req, res) => {
  try {
    res.json(mockExplanation)
  } catch (error) {
    console.error('Get prediction explanation error:', error)
    res.status(500).json({ message: 'Server error fetching prediction explanation' })
  }
}
