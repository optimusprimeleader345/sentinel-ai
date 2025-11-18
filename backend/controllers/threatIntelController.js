// Threat Intelligence Feed Controller
// Mock threat intelligence and IOC data

export const getThreatFeed = (req, res) => {
  const feed = [
    {
      id: "TFEED-001",
      title: "New Ransomware Variant Targeting Cloud Servers",
      severity: "High",
      source: "CyberNews",
      timestamp: "2025-01-05T09:20:00Z"
    },
    {
      id: "TFEED-002",
      title: "Mass Credential Leak Affecting 1.2M Accounts",
      severity: "Critical",
      source: "ThreatWire",
      timestamp: "2025-01-04T14:10:00Z"
    }
  ];

  res.status(200).json(feed);
};

export const getThreatActors = (req, res) => {
  const actors = [
    {
      name: "APT-29",
      origin: "Russia",
      tactics: ["Phishing", "Credential Theft"],
      motivation: "Espionage"
    },
    {
      name: "LAPSUS$",
      origin: "Global",
      tactics: ["Social Engineering", "Insider Recruitment"],
      motivation: "Financial"
    }
  ];

  res.status(200).json(actors);
};

export const getIOCs = (req, res) => {
  const iocs = {
    hashes: ["9b3e1f...a12", "ff1c92...d09"],
    ips: ["185.23.44.19", "102.45.12.77"],
    domains: ["malicious-update.com", "account-verify.net"]
  };

  res.status(200).json(iocs);
};
