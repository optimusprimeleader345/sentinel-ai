// Attack Simulation Engine Controller
// Mock endpoints for red team simulation and attack vector testing

export const getScenarios = (req, res) => {
  const scenarios = [
    {
      id: "SIM-PHISH",
      name: "Phishing Campaign",
      difficulty: "Medium",
      description: "Simulates targeted credential harvesting via email."
    },
    {
      id: "SIM-BRUTE",
      name: "Brute Force Attack",
      difficulty: "High",
      description: "Tests account lockout and rate-limiting controls."
    },
    {
      id: "SIM-RANSOM",
      name: "Ransomware Outbreak",
      difficulty: "Critical",
      description: "Evaluates backup, detection and containment."
    },
    {
      id: "SIM-EXFIL",
      name: "Data Exfiltration",
      difficulty: "High",
      description: "Checks egress monitoring and DLP effectiveness."
    }
  ];
  res.status(200).json(scenarios);
};

export const runSimulation = (req, res) => {
  const { scenarioId, targetEnv, attackVector, duration, stealth } = req.body;

  const mockResult = {
    scenarioId,
    status: "Completed",
    successProbability: 37,
    blockedStages: ["Delivery", "Exploitation"],
    successfulStages: ["Reconnaissance"],
    partiallySuccessfulStages: ["Installation"],
    impactAssessment: {
      level: "High",
      dataAtRisk: ["Credentials", "PII"],
      affectedUsers: 42,
      affectedDevices: 7
    },
    recommendations: [
      "Enforce MFA on external-facing accounts.",
      "Harden email filtering and anti-phishing controls.",
      "Improve lateral movement detection and network segmentation."
    ],
    executedAt: "2025-01-05T10:22:00Z"
  };
  res.status(200).json(mockResult);
};

export const getSimulationHistory = (req, res) => {
  const history = [
    {
      id: "SIM-001",
      scenario: "Phishing Campaign",
      result: "Contained",
      date: "2025-01-03T14:22:00Z"
    },
    {
      id: "SIM-002",
      scenario: "Ransomware Outbreak",
      result: "Partial Compromise",
      date: "2025-01-04T09:10:00Z"
    }
  ];
  res.status(200).json(history);
};
