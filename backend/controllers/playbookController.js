// Autonomous Defense Playbooks (SOAR) Controller
// Mock endpoints for automated security orchestration and response

export const getPlaybookList = (req, res) => {
  const playbooks = [
    {
      id: "PB-001",
      name: "Account Compromise Containment",
      severity: "High",
      trigger: "Suspicious login + impossible travel",
      status: "Enabled"
    },
    {
      id: "PB-002",
      name: "Ransomware Containment",
      severity: "Critical",
      trigger: "Mass file encryption + EDR alerts",
      status: "Enabled"
    },
    {
      id: "PB-003",
      name: "Phishing Email Cleanup",
      severity: "Medium",
      trigger: "Multiple phishing reports on same sender",
      status: "Disabled"
    }
  ];
  res.status(200).json(playbooks);
};

export const getPlaybookFlow = (req, res) => {
  const { id } = req.query;

  const mockFlow = {
    id: id || "PB-001",
    name: "Account Compromise Containment",
    steps: [
      "Detect suspicious login on privileged account.",
      "Notify SOC via chat/notification channel.",
      "Temporarily lock the affected account.",
      "Force password reset and terminate sessions.",
      "Log full details into SIEM and ticketing system."
    ]
  };
  res.status(200).json(mockFlow);
};

export const togglePlaybook = (req, res) => {
  const { id, enable } = req.body;

  const result = {
    id,
    status: enable ? "Enabled" : "Disabled",
    message: "Playbook status updated (mock)."
  };
  res.status(200).json(result);
};

export const simulatePlaybook = (req, res) => {
  const { id } = req.body;

  const result = {
    id,
    status: "Simulated",
    logs: [
      "[✓] Trigger condition matched (mock).",
      "[✓] Notification sent to SOC analyst.",
      "[✓] Account lock operation simulated.",
      "[✓] SIEM event created (simulation)."
    ],
    executedAt: "2025-01-05T11:03:00Z"
  };
  res.status(200).json(result);
};

export const getPlaybookHistory = (req, res) => {
  const history = [
    {
      id: "EXEC-001",
      playbook: "Account Compromise Containment",
      result: "Completed",
      startedAt: "2025-01-03T14:22:00Z"
    },
    {
      id: "EXEC-002",
      playbook: "Phishing Email Cleanup",
      result: "Pending Approval",
      startedAt: "2025-01-04T09:10:00Z"
    }
  ];
  res.status(200).json(history);
};
