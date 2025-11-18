// Reporting Center Controller
// Mock endpoints for automated security report generation

export const generateReport = (req, res) => {
  const { type, range, severityFilter, includeCharts, includeRecommendations } = req.body;

  const reportId = "RPT-" + Date.now();

  const mockReport = {
    id: reportId,
    type: type || "Executive Summary",
    generatedAt: new Date().toISOString(),
    summary: "This is a generated mock " + (type || "Executive Summary") + " report.",
    keyMetrics: {
      totalThreats: 124,
      criticalIncidents: 3,
      highIncidents: 7,
      mediumIncidents: 22
    },
    sections: [
      {
        title: "Threat Overview",
        content: "Threat volume has increased by 18% compared to last week."
      },
      {
        title: "Top Risks",
        content: "Credential theft and phishing remain the top risk vectors."
      }
    ],
    recommendations: includeRecommendations ? [
      "Enforce MFA on all external accounts.",
      "Patch outdated endpoints in the finance segment.",
      "Increase phishing awareness training for employees."
    ] : []
  };

  res.status(200).json(mockReport);
};

export const getReportHistory = (req, res) => {
  const history = [
    { id: "RPT-001", type: "Executive Summary", date: "2025-01-03T09:20:00Z" },
    { id: "RPT-002", type: "Incident Report",   date: "2025-01-04T11:05:00Z" },
    { id: "RPT-003", type: "Compliance Report", date: "2025-01-05T16:40:00Z" }
  ];

  res.status(200).json(history);
};
