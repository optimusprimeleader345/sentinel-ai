// AI Defense Bot Controller
// Mock AI analysis for autonomous security responses

export const getDefenseOverview = (req, res) => {
  const overview = {
    activePolicies: 7,
    autoRemediationEnabled: true,
    incidentsMitigatedLast24h: 5,
    currentMode: "Adaptive Defense",
    lastUpdated: "2025-01-05T11:30:00Z"
  };

  res.status(200).json(overview);
};

export const analyzeContext = (req, res) => {
  const { threatType, severity, affectedAssets, indicators } = req.body;

  // Simple logic based on severity
  let recommendedActions = [];
  let automationLevel = "Semi-automatic";
  let estimatedRiskReduction = 50;

  if (severity === "Critical") {
    recommendedActions = [
      "Immediate network isolation of affected assets.",
      "Full system lockdown and incident escalation to SOC.",
      "Automated data backup isolation and ransomware removal.",
      "CISO notification and regulatory reporting initiated."
    ];
    automationLevel = "Fully automatic";
    estimatedRiskReduction = 95;
  } else if (severity === "High") {
    recommendedActions = [
      "Lock affected user accounts.",
      "Isolate suspicious endpoints from the network.",
      "Block malicious IPs at the firewall.",
      "Create a high-priority incident in the SOC queue."
    ];
    automationLevel = "Semi-automatic";
    estimatedRiskReduction = 74;
  } else if (severity === "Medium") {
    recommendedActions = [
      "Apply suspicious activity monitoring.",
      "Update security policies for affected systems.",
      "Schedule thorough security scan within 24 hours.",
      "Send alert notifications to system administrators."
    ];
    estimatedRiskReduction = 62;
  } else {
    recommendedActions = [
      "Log suspicious activity for monitoring.",
      "Review security policies and user training.",
      "Consider implementing additional logging."
    ];
    estimatedRiskReduction = 25;
  }

  const response = {
    summary: `AI Defense Bot recommends ${severity === "Critical" ? "immediate containment" : severity === "High" ? "urgent action" : "monitoring"} for ${threatType} threat.`,
    recommendedActions,
    automationLevel,
    estimatedRiskReduction
  };

  res.status(200).json(response);
};

export const getDefenseActions = (req, res) => {
  const actions = [
    {
      id: "ACT-LOCK-ACCOUNT",
      label: "Lock User Account",
      category: "Identity",
      impact: "Medium",
      description: "Temporarily disables account until verified."
    },
    {
      id: "ACT-ISOLATE-ENDPOINT",
      label: "Isolate Endpoint",
      category: "Endpoint",
      impact: "High",
      description: "Cuts network connectivity for the suspected device."
    },
    {
      id: "ACT-BLOCK-IP",
      label: "Block IP at Firewall",
      category: "Network",
      impact: "Medium",
      description: "Adds IP to perimeter block list."
    },
    {
      id: "ACT-QUARANTINE-FILE",
      label: "Quarantine Suspicious File",
      category: "Endpoint",
      impact: "Medium",
      description: "Moves potentially malicious files to secure quarantine."
    },
    {
      id: "ACT-ESCALATE-SOC",
      label: "Escalate to SOC",
      category: "Incident",
      impact: "High",
      description: "Creates high-priority incident for human investigation."
    }
  ];

  res.status(200).json(actions);
};

export const simulateAction = (req, res) => {
  const { actionId, target } = req.body;

  const simulatedResult = {
    actionId,
    target,
    status: "Simulated",
    log: [
      "Checked preconditions for action.",
      "Simulated execution in sandbox environment.",
      "No conflicts detected with existing policies.",
      "Action would be executed successfully in production.",
      "Rollback plan prepared for safety."
    ],
    executedAt: new Date().toISOString()
  };

  res.status(200).json(simulatedResult);
};
