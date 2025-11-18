// AI Guardian Controller
// Mock AI assistant for continuous protection and risk assessment

export const getGuardianOverview = (req, res) => {
  const overview = {
    protectionStatus: "Active",
    monitoredAssets: 42,
    openAlerts: 3,
    guardianMode: "Proactive Monitoring",
    lastScan: "2025-01-05T10:50:00Z"
  };

  res.status(200).json(overview);
};

export const getGuardianAlerts = (req, res) => {
  const alerts = [
    {
      id: "AG-ALERT-001",
      type: "Suspicious Login Pattern",
      severity: "High",
      summary: "Multiple failed logins followed by a successful login from new IP.",
      detectedAt: "2025-01-05T09:15:00Z"
    },
    {
      id: "AG-ALERT-002",
      type: "Unusual Data Transfer",
      severity: "Medium",
      summary: "Outbound data volume higher than normal baseline.",
      detectedAt: "2025-01-04T14:42:00Z"
    }
  ];

  res.status(200).json(alerts);
};

export const getGuardianPolicies = (req, res) => {
  const policies = [
    {
      id: "AG-POL-001",
      name: "Enforce MFA for Privileged Users",
      status: "Enabled",
      description: "Requires MFA on all admin-level accounts."
    },
    {
      id: "AG-POL-002",
      name: "Block High-Risk Geo Locations",
      status: "Enabled",
      description: "Blocks logins from specific regions."
    },
    {
      id: "AG-POL-003",
      name: "Alert on Data Exfiltration Patterns",
      status: "In Progress",
      description: "Monitors outbound connections for suspicious spikes."
    },
    {
      id: "AG-POL-004",
      name: "Real-time Account Monitoring",
      status: "Enabled",
      description: "Continuous monitoring of user account activities."
    }
  ];

  res.status(200).json(policies);
};

export const evaluateActivity = (req, res) => {
  const { user, device, location, recentEvents } = req.body;

  // Simple risk evaluation logic
  let riskScore = 50;
  let riskLevel = "Medium";
  let reasons = [];
  let guardianAdvice = [];

  // Evaluate based on location
  if (location !== "Corporate Office" && location !== "Home Office") {
    riskScore += 20;
    reasons.push("Recent login from new country.");
  }

  // Evaluate recent events
  const suspiciousEvents = recentEvents.filter(event =>
    event.toLowerCase().includes("failed") ||
    event.toLowerCase().includes("suspicious") ||
    event.toLowerCase().includes("unusual")
  );

  if (suspiciousEvents.length > 0) {
    riskScore += 15;
    reasons.push("Multiple access attempts to sensitive resources.");
  }

  // Determine risk level
  if (riskScore >= 80) riskLevel = "Critical";
  else if (riskScore >= 60) riskLevel = "High";
  else if (riskScore >= 40) riskLevel = "Medium";
  else riskLevel = "Low";

  // Generate advice based on risk level
  if (riskLevel === "Critical" || riskLevel === "High") {
    guardianAdvice = [
      "Prompt user for step-up authentication immediately.",
      "Require device health attestation.",
      "Temporarily reduce access to sensitive systems.",
      "Initiate security review of affected account."
    ];
  } else if (riskLevel === "Medium") {
    guardianAdvice = [
      "Send additional verification via email or SMS.",
      "Log this login attempt for monitoring purposes.",
      "Consider implementing additional authentication factors."
    ];
  } else {
    guardianAdvice = [
      "Login activity appears normal.",
      "Continue monitoring user behavior patterns."
    ];
  }

  const evaluation = {
    user,
    device,
    location,
    riskScore,
    riskLevel,
    reasons,
    guardianAdvice
  };

  res.status(200).json(evaluation);
};
