// Behavior Analytics (UEBA) Controller
// Mock endpoints for User and Entity Behavior Analytics

export const getBehaviorSummary = async (req, res) => {
  try {
    const summary = {
      unusualLogins: 5,
      riskyDevices: 2,
      locationChanges: 3,
      privilegeEscalations: 1,
    };
    res.json(summary);
  } catch (error) {
    console.error('Get behavior summary error:', error);
    res.status(500).json({ message: 'Server error fetching behavior summary' });
  }
};

export const getBehaviorTrends = async (req, res) => {
  try {
    const trends = [
      { day: "Mon", anomalies: 3 },
      { day: "Tue", anomalies: 7 },
      { day: "Wed", anomalies: 4 },
      { day: "Thu", anomalies: 6 },
      { day: "Fri", anomalies: 8 },
      { day: "Sat", anomalies: 2 },
      { day: "Sun", anomalies: 5 },
    ];
    res.json({ trends });
  } catch (error) {
    console.error('Get behavior trends error:', error);
    res.status(500).json({ message: 'Server error fetching behavior trends' });
  }
};

export const getAnomalyEvents = async (req, res) => {
  try {
    const anomalies = [
      {
        id: 1,
        type: "Unusual Login Time",
        risk: "High",
        detail: "Login at 3:41AM from new device",
        timestamp: "2025-01-04 03:41",
      },
      {
        id: 2,
        type: "New Device Detected",
        risk: "Medium",
        detail: "ChromeOS device never seen before",
        timestamp: "2025-01-03 21:20",
      },
      {
        id: 3,
        type: "Location Change",
        risk: "Medium",
        detail: "Login from Germany after US activity",
        timestamp: "2025-01-03 14:15",
      },
      {
        id: 4,
        type: "Privilege Escalation",
        risk: "High",
        detail: "User accessed admin panel unexpectedly",
        timestamp: "2025-01-03 11:30",
      },
      {
        id: 5,
        type: "Data Exfiltration",
        risk: "High",
        detail: "Large file upload to external service",
        timestamp: "2025-01-02 16:45",
      },
    ];
    res.json({ anomalies });
  } catch (error) {
    console.error('Get anomaly events error:', error);
    res.status(500).json({ message: 'Server error fetching anomaly events' });
  }
};

export const getUserRisk = async (req, res) => {
  try {
    const risk = 68; // Moderate risk score
    res.json({ risk, level: "Moderate" });
  } catch (error) {
    console.error('Get user risk error:', error);
    res.status(500).json({ message: 'Server error fetching user risk' });
  }
};

export const getDeviceBehavior = async (req, res) => {
  try {
    const devices = [
      { device: "Windows-PC-01", status: "Safe", anomalies: 0 },
      { device: "iPhone-12", status: "Warning", anomalies: 2 },
      { device: "MacBook-Pro", status: "Safe", anomalies: 0 },
      { device: "ChromeOS-Laptop", status: "Warning", anomalies: 1 },
    ];
    res.json({ devices });
  } catch (error) {
    console.error('Get device behavior error:', error);
    res.status(500).json({ message: 'Server error fetching device behavior' });
  }
};

export const getLocationActivity = async (req, res) => {
  try {
    const locations = [
      { location: "India", activity: 18 },
      { location: "Singapore", activity: 4 },
      { location: "Germany", activity: 2 },
      { location: "United States", activity: 1 },
      { location: "Japan", activity: 3 },
    ];
    res.json({ locations });
  } catch (error) {
    console.error('Get location activity error:', error);
    res.status(500).json({ message: 'Server error fetching location activity' });
  }
};

export const getBehaviorInsights = async (req, res) => {
  try {
    const insights = [
      "Unusual login pattern detected during late hours.",
      "Device change frequency higher than typical baseline.",
      "User location variability increased in last 72 hours.",
      "Privilege escalation attempts correlate with data access patterns.",
      "Session duration anomalies suggest potential compromise.",
    ];
    res.json({ insights });
  } catch (error) {
    console.error('Get behavior insights error:', error);
    res.status(500).json({ message: 'Server error fetching behavior insights' });
  }
};

// Required exact specification functions for the task
export const getSummary = (req, res) => {
  const summary = {
    unusualLogins: 5,
    riskyDevices: 2,
    locationChanges: 3,
    privilegeEscalations: 1,
    last24hAnomalies: 9
  };
  res.status(200).json(summary);
};

export const getTrends = (req, res) => {
  const trends = [
    { day: "Mon", anomalies: 3 },
    { day: "Tue", anomalies: 7 },
    { day: "Wed", anomalies: 4 },
    { day: "Thu", anomalies: 6 },
    { day: "Fri", anomalies: 8 },
    { day: "Sat", anomalies: 2 },
    { day: "Sun", anomalies: 3 }
  ];
  res.status(200).json(trends);
};

export const getAnomalies = (req, res) => {
  const anomalies = [
    {
      id: 1,
      type: "Unusual Login Time",
      risk: "High",
      user: "alice@corp.com",
      detail: "3:41AM login from new device",
      location: "Germany",
      timestamp: "2025-01-05 03:41"
    },
    {
      id: 2,
      type: "New Device Detected",
      risk: "Medium",
      user: "bob@corp.com",
      detail: "New iPhone login from unknown network",
      location: "India",
      timestamp: "2025-01-04 22:10"
    },
    {
      id: 3,
      type: "Geo-Location Change",
      risk: "Medium",
      user: "ceo@corp.com",
      detail: "Back-to-back logins from India and USA",
      location: "USA",
      timestamp: "2025-01-04 18:25"
    }
  ];
  res.status(200).json(anomalies);
};

export const getRiskScore = (req, res) => {
  const riskData = {
    score: 68,
    level: "Moderate",
    reasoning: [
      "Late-night logins observed above baseline.",
      "New devices associated with privileged accounts.",
      "Location variability has increased in the past 72 hours."
    ]
  };
  res.status(200).json(riskData);
};

export const getDevices = (req, res) => {
  const devices = [
    { device: "WIN-SEC-01", status: "Safe", anomalies: 0, owner: "alice@corp.com" },
    { device: "MACBOOK-PRO-02", status: "Warning", anomalies: 2, owner: "bob@corp.com" },
    { device: "IPHONE-12-USER3", status: "Warning", anomalies: 1, owner: "ceo@corp.com" }
  ];
  res.status(200).json(devices);
};

export const getLocations = (req, res) => {
  const locations = [
    { location: "India", activity: 18, anomalies: 4 },
    { location: "Singapore", activity: 6, anomalies: 1 },
    { location: "Germany", activity: 4, anomalies: 2 },
    { location: "USA", activity: 5, anomalies: 2 }
  ];
  res.status(200).json(locations);
};

export const getInsights = (req, res) => {
  const insights = [
    "Login anomalies increased by 27% compared to last week.",
    "Privileged users exhibit higher device churn than normal.",
    "Majority of anomalous behavior originates from two geographic regions.",
    "Behavioral risk is concentrated in 3 high-value accounts."
  ];
  res.status(200).json(insights);
};
