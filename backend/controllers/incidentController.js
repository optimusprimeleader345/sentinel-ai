// Incident Response / Forensics Controller
// Mock endpoints for incident response and digital forensics

export const getSummary = (req, res) => {
  const summaryData = {
    activeIncidents: 2,
    resolvedIncidents: 14,
    critical: 1,
    medium: 3,
    low: 12,
    lastUpdated: "2025-01-05T08:33:00Z"
  };
  res.status(200).json(summaryData);
};

export const getTimeline = (req, res) => {
  const timelineData = [
    { time: "03:40", event: "Failed login burst", severity: "High" },
    { time: "03:50", event: "Suspicious admin panel access", severity: "Medium" },
    { time: "04:05", event: "Malware detection on WIN-SEC-02", severity: "High" }
  ];
  res.status(200).json(timelineData);
};

export const getDetails = (req, res) => {
  const detailsData = {
    id: 1023,
    rootCause: "Credential Stuffing Attempt",
    affectedSystems: ["WIN-SEC-02", "MACBOOK-CEO"],
    attackerIP: "185.23.44.19",
    severity: "High",
    actionsTaken: ["Blocked IP", "Forced password reset"]
  };
  res.status(200).json(detailsData);
};

export const getMITREMapping = (req, res) => {
  const mitreData = [
    { technique: "T1110", name: "Brute Force", detected: true },
    { technique: "T1059", name: "Command Execution", detected: false },
    { technique: "T1078", name: "Valid Accounts", detected: true }
  ];
  res.status(200).json(mitreData);
};

export const getPlaybook = (req, res) => {
  const playbookData = [
    "Step 1: Identify affected accounts",
    "Step 2: Force credential reset",
    "Step 3: Analyze session token activity",
    "Step 4: Block malicious IP ranges",
    "Step 5: Confirm system integrity"
  ];
  res.status(200).json(playbookData);
};
