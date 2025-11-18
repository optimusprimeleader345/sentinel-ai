// Zero Trust Analyzer Controller
// Mock endpoints for Zero Trust security assessment and monitoring

export const getIdentityTrust = (req, res) => {
  const identityData = {
    score: 85,
    status: "Trusted",
    weakSignals: ["Password unchanged for 120 days"],
    strongSignals: ["MFA enabled", "Device bound identity"]
  };
  res.status(200).json(identityData);
};

export const getDeviceTrust = (req, res) => {
  const deviceData = {
    score: 72,
    status: "Moderate",
    issues: ["Outdated antivirus", "Unpatched OS"],
    compliantDevices: 14,
    riskyDevices: 3
  };
  res.status(200).json(deviceData);
};

export const getSessionTrust = (req, res) => {
  const sessionData = {
    score: 67,
    anomalies: ["Unusual session duration", "Session from new ISP"],
    activeSessions: 25
  };
  res.status(200).json(sessionData);
};

export const getNetworkTrust = (req, res) => {
  const networkData = {
    score: 70,
    blockedIPs: 12,
    suspiciousConnections: 5,
    safeConnections: 112
  };
  res.status(200).json(networkData);
};

export const getRadar = (req, res) => {
  const radarData = [
    { label: "Identity", value: 85 },
    { label: "Devices", value: 72 },
    { label: "Sessions", value: 67 },
    { label: "Network", value: 70 }
  ];
  res.status(200).json(radarData);
};

export const getZTRecommendations = (req, res) => {
  const recommendations = [
    "Force password rotation for users with weak credentials.",
    "Update 3 high-risk devices to meet compliance.",
    "Enable session anomaly alerts for privileged users.",
    "Restrict external IP access to admin endpoints."
  ];
  res.status(200).json(recommendations);
};
