import Log from '../models/Log.js'

export const getLogs = async (req, res) => {
  try {
    const { level, limit = 50 } = req.query

    const query = level ? { level } : {}
    const logs = await Log.find(query).sort({ timestamp: -1 }).limit(parseInt(limit))

    // If no logs in DB, return mock data
    if (logs.length === 0) {
      const mockLogs = [
        {
          _id: '1',
          level: 'error',
          message: 'Database connection failed: timeout after 30s',
          source: 'db-service',
          timestamp: new Date(),
        },
        {
          _id: '2',
          level: 'warn',
          message: 'High CPU usage detected on server-01',
          source: 'monitor',
          timestamp: new Date(),
        },
        {
          _id: '3',
          level: 'info',
          message: 'User authentication successful: user@example.com',
          source: 'auth-service',
          timestamp: new Date(),
        },
        {
          _id: '4',
          level: 'error',
          message: 'Failed to process payment request',
          source: 'payment-service',
          timestamp: new Date(),
        },
        {
          _id: '5',
          level: 'info',
          message: 'API request processed: GET /api/users',
          source: 'api-gateway',
          timestamp: new Date(),
        },
      ]
      return res.json(mockLogs)
    }

    res.json(logs)
  } catch (error) {
    console.error('Get logs error:', error)
    res.status(500).json({ message: 'Server error fetching logs' })
  }
}

// AI Log Analysis Functions
export const analyzeLogs = async (req, res) => {
  try {
    const { logData } = req.body

    // Mock AI analysis response
    const analysis = {
      summary: "AI-powered log analysis detected potential security anomalies in the provided logs",
      anomalies: [
        "Unusual login time: 2:30 AM from unrecognized IP",
        "Suspicious device change detected",
        "High-volume failed authentication attempts",
        "Privilege escalation attempts detected"
      ],
      frequent_events: [
        "Authentication failures",
        "Database connection timeouts",
        "API rate limiting triggers",
        "Memory usage spikes"
      ],
      event_distribution: {
        info: 245,
        warning: 67,
        error: 23,
        critical: 5
      },
      attack_patterns: [
        { type: "Brute force attempts", count: 15, severity: "high" },
        { type: "Port scanning", count: 8, severity: "medium" },
        { type: "Privilege escalation attempts", count: 3, severity: "critical" },
        { type: "SQL injection patterns", count: 2, severity: "high" }
      ],
      confidence: 87
    }

    res.json(analysis)
  } catch (error) {
    console.error('Log analysis error:', error)
    res.status(500).json({ message: 'Server error analyzing logs' })
  }
}

export const uploadLogFile = async (req, res) => {
  try {
    // Mock file upload analysis
    const analysis = {
      summary: "AI analysis of uploaded log file completed",
      file_processed: true,
      total_lines: 1250,
      anomalies: [
        "Unusual login time: 2:30 AM from unrecognized IP",
        "Suspicious device change detected",
        "High-volume failed authentication attempts"
      ],
      frequent_events: [
        "Authentication failures",
        "Database connection timeouts",
        "API rate limiting triggers"
      ],
      attack_patterns: [
        { type: "Brute force attempts", count: 12, severity: "high" },
        { type: "Port scanning", count: 6, severity: "medium" },
        { type: "Malware delivery attempts", count: 1, severity: "critical" }
      ]
    }

    res.json(analysis)
  } catch (error) {
    console.error('File upload analysis error:', error)
    res.status(500).json({ message: 'Server error processing uploaded file' })
  }
}

export const getLogAnomalies = async (req, res) => {
  try {
    // Mock UEBA anomalies data
    const anomalies = [
      {
        type: "Unusual Login Time",
        description: "User logged in at 2:30 AM from a location not previously used",
        severity: "high",
        timestamp: "2025-01-18 02:30:15",
        user: "admin",
        ip: "192.168.1.150"
      },
      {
        type: "Suspicious Device Change",
        description: "Device fingerprint changed unexpectedly during session",
        severity: "medium",
        timestamp: "2025-01-18 01:45:22",
        user: "jsmith",
        ip: "192.168.1.175"
      },
      {
        type: "Failed Auth Spike",
        description: "High-volume failed authentication attempts from single IP",
        severity: "high",
        timestamp: "2025-01-18 03:15:08",
        user: "system",
        ip: "10.0.0.45"
      },
      {
        type: "Privilege Escalation",
        description: "User attempted to access admin resources without proper authorization",
        severity: "critical",
        timestamp: "2025-01-18 04:22:33",
        user: "developer",
        ip: "192.168.1.200"
      }
    ]

    res.json(anomalies)
  } catch (error) {
    console.error('Get anomalies error:', error)
    res.status(500).json({ message: 'Server error fetching anomalies' })
  }
}

export const getLogEvents = async (req, res) => {
  try {
    // Mock event classification data
    const events = [
      { level: "info", count: 245, percentage: 67.4 },
      { level: "warning", count: 67, percentage: 18.5 },
      { level: "error", count: 23, percentage: 6.3 },
      { level: "critical", count: 5, percentage: 1.4 }
    ]

    res.json(events)
  } catch (error) {
    console.error('Get events error:', error)
    res.status(500).json({ message: 'Server error fetching events' })
  }
}

export const getLogTimeline = async (req, res) => {
  try {
    // Mock timeline data
    const timeline = [
      {
        timestamp: "2025-01-18 04:22:33",
        severity: "critical",
        message: "Privilege escalation attempt blocked",
        source: "auth-service"
      },
      {
        timestamp: "2025-01-18 03:15:08",
        severity: "error",
        message: "Brute force attack detected - multiple failed logins",
        source: "security-module"
      },
      {
        timestamp: "2025-01-18 02:30:15",
        severity: "warning",
        message: "Unusual login time detected",
        source: "ueba-engine"
      },
      {
        timestamp: "2025-01-18 01:45:22",
        severity: "warning",
        message: "Device anomaly detected",
        source: "ueba-engine"
      },
      {
        timestamp: "2025-01-18 00:20:05",
        severity: "info",
        message: "System maintenance completed",
        source: "monitor"
      }
    ]

    res.json(timeline)
  } catch (error) {
    console.error('Get timeline error:', error)
    res.status(500).json({ message: 'Server error fetching timeline' })
  }
}

export const createLog = async (req, res) => {
  try {
    const { level, message, source } = req.body

    const log = await Log.create({
      level: level || 'info',
      message,
      source: source || 'system',
    })

    res.status(201).json(log)
  } catch (error) {
    console.error('Create log error:', error)
    res.status(500).json({ message: 'Server error creating log' })
  }
}

// Required exact specification functions for the task (additional log analyzer functions)
// Note: analyzeLogs, uploadLogFile already exist but with different signatures, adding the exact ones for task compatibility

export const analyzeLogsExact = (req, res) => {
  const result = {
    summary: "Detected several failed login attempts and one potential brute force pattern.",
    totalEvents: 124,
    failedLogins: 27,
    suspiciousIPs: ["185.23.44.19", "92.14.55.201"],
    severity: "High",
    patterns: [
      "Repeated failed logins on user 'admin' from single IP.",
      "Unusual access to /admin from non-corporate network."
    ]
  };
  res.status(200).json(result);
};

export const uploadLogFileExact = (req, res) => {
  const result = {
    message: "Log file processed successfully.",
    parsedEvents: 342,
    detectedIncidents: 3
  };
  res.status(200).json(result);
};

export const getAnomaliesExact = (req, res) => {
  const anomalies = [
    {
      id: 1,
      type: "Brute Force Pattern",
      severity: "High",
      ip: "185.23.44.19",
      username: "admin",
      attempts: 34,
      timeframe: "5 minutes"
    },
    {
      id: 2,
      type: "Suspicious Admin Access",
      severity: "Medium",
      ip: "92.14.55.201",
      path: "/admin",
      method: "GET",
      userAgent: "Unknown Scanner"
    }
  ];
  res.status(200).json(anomalies);
};

export const getEventsExact = (req, res) => {
  const events = [
    {
      timestamp: "2025-01-05T03:41:12Z",
      level: "WARN",
      message: "Failed login for user 'admin'",
      ip: "185.23.44.19"
    },
    {
      timestamp: "2025-01-05T03:42:01Z",
      level: "INFO",
      message: "Successful login for user 'alice'",
      ip: "10.0.0.14"
    },
    {
      timestamp: "2025-01-05T03:45:27Z",
      level: "ERROR",
      message: "Multiple failed logins detected on account 'admin'",
      ip: "185.23.44.19"
    }
  ];
  res.status(200).json(events);
};

export const getTimelineExact = (req, res) => {
  const timeline = [
    { time: "03:40", failedLogins: 3, anomalies: 1 },
    { time: "03:45", failedLogins: 12, anomalies: 2 },
    { time: "03:50", failedLogins: 6, anomalies: 1 },
    { time: "03:55", failedLogins: 4, anomalies: 0 }
  ];
  res.status(200).json(timeline);
};
