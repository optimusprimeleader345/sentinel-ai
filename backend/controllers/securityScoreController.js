// Security Score Engine Controller
// Mock endpoints for computing and managing security scores

export const getOverallScore = (req, res) => {
  const overallScore = {
    score: 78,
    grade: "B",
    status: "Moderate Risk",
    factors: ["Behavior anomalies", "Unpatched devices", "Weak passwords"]
  };
  res.status(200).json(overallScore);
};

export const getScoreFactors = (req, res) => {
  const scoreFactors = [
    { factor: "Identity Security", value: 82 },
    { factor: "Device Hygiene", value: 71 },
    { factor: "Network Security", value: 69 },
    { factor: "User Behavior", value: 74 }
  ];
  res.status(200).json(scoreFactors);
};

export const getScoreHistory = (req, res) => {
  const scoreHistory = [
    { date: "2025-01-01", score: 72 },
    { date: "2025-01-02", score: 74 },
    { date: "2025-01-03", score: 78 }
  ];
  res.status(200).json(scoreHistory);
};
