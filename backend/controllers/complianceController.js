// Compliance Center Controller
// Mock compliance frameworks, controls, and gap analysis

export const getFrameworks = (req, res) => {
  const frameworks = [
    {
      id: "ISO27001",
      name: "ISO 27001",
      overallStatus: "Partial",
      score: 72
    },
    {
      id: "NIST-CSF",
      name: "NIST Cybersecurity Framework",
      overallStatus: "Partial",
      score: 68
    },
    {
      id: "GDPR",
      name: "GDPR Security",
      overallStatus: "Low",
      score: 54
    }
  ];

  res.status(200).json(frameworks);
};

export const getControls = (req, res) => {
  const controls = [
    {
      id: "A.5.1",
      framework: "ISO27001",
      name: "Information security policies",
      status: "Implemented"
    },
    {
      id: "A.6.1",
      framework: "ISO27001",
      name: "Organization of information security",
      status: "In Progress"
    },
    {
      id: "ID.AM-1",
      framework: "NIST-CSF",
      name: "Physical devices and systems are inventoried",
      status: "Not Started"
    }
  ];

  res.status(200).json(controls);
};

export const getGaps = (req, res) => {
  const gaps = [
    {
      framework: "ISO27001",
      controlId: "A.12.4",
      issue: "Insufficient logging and monitoring coverage",
      riskLevel: "High",
      recommendation: "Enable centralized logging for all critical assets."
    },
    {
      framework: "NIST-CSF",
      controlId: "DE.CM-7",
      issue: "Lack of monitoring for unauthorized mobile code",
      riskLevel: "Medium",
      recommendation: "Deploy EDR solution to monitor code execution."
    }
  ];

  res.status(200).json(gaps);
};
