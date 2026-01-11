// Advanced Behavioral Analytics Controller
// User and Entity Behavior Analytics (UEBA) System
// Detects anomalous user activities, monitors sessions, and calculates behavioral risk scores

import User from '../models/User.js';

// Behavioral baseline data - in production, this would be stored in database
const behavioralBaselines = new Map();

// Risk scoring weights for different behavioral factors
const RISK_WEIGHTS = {
  loginAnomaly: 0.25,
  sessionDuration: 0.20,
  accessPattern: 0.20,
  timeAnomaly: 0.15,
  locationAnomaly: 0.10,
  deviceAnomaly: 0.10
};

// Risk level thresholds
const RISK_THRESHOLDS = {
  LOW: 25,
  MEDIUM: 50,
  HIGH: 75,
  CRITICAL: 90
};

// Anomaly detection thresholds
const ANOMALY_THRESHOLDS = {
  loginFrequency: { normal: 8, suspicious: 15, critical: 25 },
  sessionDuration: { normal: 480, suspicious: 1200, critical: 3600 }, // minutes
  accessVolume: { normal: 100, suspicious: 500, critical: 1000 },
  timeVariance: { normal: 2, suspicious: 4, critical: 6 }, // hours
  locationChanges: { normal: 2, suspicious: 5, critical: 10 }
};

// Mock user behavioral data
const mockUserData = {
  'john.doe': {
    department: 'Engineering',
    role: 'Senior Developer',
    baseline: {
      avgLoginTime: '09:30',
      avgSessionDuration: 360, // minutes
      commonLocations: ['New York', 'San Francisco'],
      commonDevices: ['MacBook Pro', 'iPhone'],
      weeklyLoginPattern: [8, 8, 8, 8, 8, 4, 2], // Mon-Sun
      accessPatterns: {
        filesAccessed: 45,
        databasesQueried: 12,
        adminActions: 2
      }
    }
  },
  'admin.user': {
    department: 'IT Security',
    role: 'System Administrator',
    baseline: {
      avgLoginTime: '08:00',
      avgSessionDuration: 480,
      commonLocations: ['Headquarters'],
      commonDevices: ['Windows Workstation', 'Android Phone'],
      weeklyLoginPattern: [10, 10, 10, 10, 10, 6, 2],
      accessPatterns: {
        filesAccessed: 120,
        databasesQueried: 45,
        adminActions: 25
      }
    }
  }
};

// Initialize behavioral baselines for users
const initializeBaselines = () => {
  Object.keys(mockUserData).forEach(username => {
    const userData = mockUserData[username];
    behavioralBaselines.set(username, {
      ...userData.baseline,
      lastUpdated: new Date(),
      confidence: 85
    });
  });
};

// Calculate login anomaly score
const calculateLoginAnomaly = (loginEvent, baseline) => {
  let anomalyScore = 0;

  // Time-based anomaly
  const loginHour = new Date(loginEvent.timestamp).getHours();
  const baselineHour = parseInt(baseline.avgLoginTime.split(':')[0]);
  const timeDiff = Math.abs(loginHour - baselineHour);

  if (timeDiff > ANOMALY_THRESHOLDS.timeVariance.critical) {
    anomalyScore += 40;
  } else if (timeDiff > ANOMALY_THRESHOLDS.timeVariance.suspicious) {
    anomalyScore += 20;
  }

  // Location-based anomaly
  if (!baseline.commonLocations.includes(loginEvent.location)) {
    anomalyScore += 25;
  }

  // Device-based anomaly
  if (!baseline.commonDevices.includes(loginEvent.device)) {
    anomalyScore += 15;
  }

  // Frequency anomaly (unusual login count)
  const todayLogins = loginEvent.todayCount || 1;
  if (todayLogins > ANOMALY_THRESHOLDS.loginFrequency.critical) {
    anomalyScore += 30;
  } else if (todayLogins > ANOMALY_THRESHOLDS.loginFrequency.suspicious) {
    anomalyScore += 15;
  }

  return Math.min(100, anomalyScore);
};

// Calculate session anomaly score
const calculateSessionAnomaly = (sessionData, baseline) => {
  let anomalyScore = 0;

  // Session duration anomaly
  const duration = sessionData.duration || 0;
  if (duration > ANOMALY_THRESHOLDS.sessionDuration.critical) {
    anomalyScore += 35;
  } else if (duration > ANOMALY_THRESHOLDS.sessionDuration.suspicious) {
    anomalyScore += 15;
  }

  // Access volume anomaly
  const accessCount = sessionData.accessCount || 0;
  if (accessCount > ANOMALY_THRESHOLDS.accessVolume.critical) {
    anomalyScore += 30;
  } else if (accessCount > ANOMALY_THRESHOLDS.accessVolume.suspicious) {
    anomalyScore += 15;
  }

  // Unusual access patterns
  if (sessionData.unusualAccess) {
    anomalyScore += 20;
  }

  return Math.min(100, anomalyScore);
};

// Calculate overall behavioral risk score
const calculateBehavioralRiskScore = (userActivity) => {
  try {
    const username = userActivity.username;
    const baseline = behavioralBaselines.get(username);

    if (!baseline) {
      return {
        overallRisk: 'UNKNOWN',
        riskScore: 50,
        confidence: 30,
        factors: ['No behavioral baseline available']
      };
    }

    // Calculate individual anomaly scores
    const loginAnomaly = calculateLoginAnomaly(userActivity.loginEvent, baseline);
    const sessionAnomaly = calculateSessionAnomaly(userActivity.sessionData, baseline);

    // Weighted risk calculation
    const riskScore = Math.round(
      (loginAnomaly * RISK_WEIGHTS.loginAnomaly) +
      (sessionAnomaly * RISK_WEIGHTS.sessionDuration) +
      (userActivity.accessAnomaly * RISK_WEIGHTS.accessPattern) +
      (userActivity.timeAnomaly * RISK_WEIGHTS.timeAnomaly) +
      (userActivity.locationAnomaly * RISK_WEIGHTS.locationAnomaly) +
      (userActivity.deviceAnomaly * RISK_WEIGHTS.deviceAnomaly)
    );

    // Determine risk level
    let riskLevel = 'LOW';
    if (riskScore >= RISK_THRESHOLDS.CRITICAL) riskLevel = 'CRITICAL';
    else if (riskScore >= RISK_THRESHOLDS.HIGH) riskLevel = 'HIGH';
    else if (riskScore >= RISK_THRESHOLDS.MEDIUM) riskLevel = 'MEDIUM';

    // Identify top risk factors
    const riskFactors = [];
    if (loginAnomaly > 30) riskFactors.push('Unusual login pattern');
    if (sessionAnomaly > 30) riskFactors.push('Abnormal session behavior');
    if (userActivity.accessAnomaly > 30) riskFactors.push('Suspicious access patterns');
    if (userActivity.timeAnomaly > 30) riskFactors.push('Irregular timing');
    if (userActivity.locationAnomaly > 30) riskFactors.push('Unusual location');
    if (userActivity.deviceAnomaly > 30) riskFactors.push('Unknown device');

    return {
      overallRisk: riskLevel,
      riskScore: Math.min(100, riskScore),
      confidence: baseline.confidence,
      factors: riskFactors.length > 0 ? riskFactors : ['Normal behavior detected'],
      anomalies: {
        login: loginAnomaly,
        session: sessionAnomaly,
        access: userActivity.accessAnomaly,
        time: userActivity.timeAnomaly,
        location: userActivity.locationAnomaly,
        device: userActivity.deviceAnomaly
      },
      recommendations: generateRiskRecommendations(riskLevel, riskFactors)
    };

  } catch (error) {
    console.error('Error calculating behavioral risk score:', error);
    return {
      overallRisk: 'UNKNOWN',
      riskScore: 50,
      confidence: 0,
      factors: ['Analysis failed'],
      recommendations: ['Manual review required']
    };
  }
};

// Generate risk-based recommendations
const generateRiskRecommendations = (riskLevel, riskFactors) => {
  const recommendations = [];

  if (riskLevel === 'CRITICAL') {
    recommendations.push('Immediate account lockdown recommended');
    recommendations.push('Security team notification required');
    recommendations.push('Forensic analysis initiated');
  } else if (riskLevel === 'HIGH') {
    recommendations.push('Enhanced authentication required');
    recommendations.push('Security monitoring increased');
    recommendations.push('User verification requested');
  } else if (riskLevel === 'MEDIUM') {
    recommendations.push('Additional verification suggested');
    recommendations.push('Activity logging enabled');
  }

  // Factor-specific recommendations
  if (riskFactors.includes('Unusual login pattern')) {
    recommendations.push('Review login history and patterns');
  }
  if (riskFactors.includes('Abnormal session behavior')) {
    recommendations.push('Monitor session activity closely');
  }
  if (riskFactors.includes('Suspicious access patterns')) {
    recommendations.push('Audit recent file and data access');
  }

  return recommendations;
};

// Analyze user activity in real-time
const analyzeUserActivity = async (req, res) => {
  try {
    const { username, activityType, activityData } = req.body;

    // Mock current activity data
    const userActivity = {
      username,
      loginEvent: {
        timestamp: activityData.timestamp || new Date().toISOString(),
        location: activityData.location || 'Unknown',
        device: activityData.device || 'Unknown',
        todayCount: activityData.todayCount || 1
      },
      sessionData: {
        duration: activityData.sessionDuration || 120,
        accessCount: activityData.accessCount || 25,
        unusualAccess: activityData.unusualAccess || false
      },
      accessAnomaly: activityData.accessAnomaly || Math.random() * 50,
      timeAnomaly: activityData.timeAnomaly || Math.random() * 40,
      locationAnomaly: activityData.locationAnomaly || Math.random() * 30,
      deviceAnomaly: activityData.deviceAnomaly || Math.random() * 20
    };

    // Calculate behavioral risk
    const riskAnalysis = calculateBehavioralRiskScore(userActivity);

    // Generate alert if high risk
    let alertTriggered = false;
    if (riskAnalysis.riskScore > RISK_THRESHOLDS.HIGH) {
      alertTriggered = true;
      // In production, this would trigger alerts via WebSocket
      console.log(`🚨 HIGH RISK ALERT: ${username} - Risk Score: ${riskAnalysis.riskScore}`);
    }

    res.json({
      success: true,
      analysis: riskAnalysis,
      alertTriggered,
      timestamp: new Date(),
      activityType
    });

  } catch (error) {
    console.error('Error analyzing user activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to analyze user activity',
      error: error.message
    });
  }
};

// Get user behavioral profile
const getUserBehavioralProfile = async (req, res) => {
  try {
    const { username } = req.params;

    const baseline = behavioralBaselines.get(username);
    if (!baseline) {
      return res.status(404).json({
        success: false,
        message: 'Behavioral baseline not found for user'
      });
    }

    // Generate mock recent activities
    const recentActivities = [];
    const now = Date.now();

    for (let i = 0; i < 10; i++) {
      const timestamp = new Date(now - i * 2 * 60 * 60 * 1000); // Every 2 hours
      recentActivities.push({
        timestamp,
        activity: ['Login', 'File Access', 'Database Query', 'Admin Action'][Math.floor(Math.random() * 4)],
        riskScore: Math.floor(Math.random() * 40),
        location: baseline.commonLocations[Math.floor(Math.random() * baseline.commonLocations.length)],
        device: baseline.commonDevices[Math.floor(Math.random() * baseline.commonDevices.length)]
      });
    }

    res.json({
      success: true,
      profile: {
        username,
        department: mockUserData[username]?.department || 'Unknown',
        role: mockUserData[username]?.role || 'Unknown',
        baseline,
        recentActivities,
        lastAnalysis: new Date()
      }
    });

  } catch (error) {
    console.error('Error getting behavioral profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get behavioral profile',
      error: error.message
    });
  }
};

// Get behavioral analytics summary
const getBehavioralAnalyticsSummary = async (req, res) => {
  try {
    // Mock analytics data
    const summary = {
      totalUsers: Object.keys(mockUserData).length,
      activeSessions: Math.floor(Math.random() * 50) + 20,
      anomaliesDetected: Math.floor(Math.random() * 10) + 2,
      highRiskUsers: Math.floor(Math.random() * 5) + 1,
      riskDistribution: {
        low: 15,
        medium: 8,
        high: 3,
        critical: 1
      },
      topRiskFactors: [
        { factor: 'Unusual Login Times', count: 12, percentage: 35 },
        { factor: 'New Device Access', count: 8, percentage: 24 },
        { factor: 'Location Anomalies', count: 6, percentage: 18 },
        { factor: 'Session Duration', count: 5, percentage: 15 },
        { factor: 'Access Pattern Changes', count: 3, percentage: 8 }
      ],
      recentAlerts: [
        {
          user: 'john.doe',
          risk: 'HIGH',
          factor: 'Unusual login from new location',
          timestamp: new Date(Date.now() - 30 * 60 * 1000)
        },
        {
          user: 'admin.user',
          risk: 'MEDIUM',
          factor: 'Extended session duration',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
        }
      ]
    };

    res.json({
      success: true,
      data: summary,
      lastUpdated: new Date()
    });

  } catch (error) {
    console.error('Error getting behavioral analytics summary:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get behavioral analytics summary',
      error: error.message
    });
  }
};

// Get anomaly events
const getAnomalyEvents = async (req, res) => {
  try {
    // Mock anomaly events
    const anomalies = [];
    const eventTypes = [
      'Unusual Login Pattern',
      'New Device Detected',
      'Location Anomaly',
      'Session Duration Alert',
      'Access Pattern Change',
      'Privilege Escalation',
      'Data Exfiltration Attempt'
    ];

    for (let i = 0; i < 15; i++) {
      const user = Object.keys(mockUserData)[Math.floor(Math.random() * Object.keys(mockUserData).length)];
      anomalies.push({
        id: `anomaly_${i + 1}`,
        user,
        type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
        severity: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'][Math.floor(Math.random() * 4)],
        confidence: 70 + Math.random() * 25,
        description: `Anomalous behavior detected for user ${user}`,
        timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        status: ['NEW', 'INVESTIGATING', 'RESOLVED'][Math.floor(Math.random() * 3)],
        location: 'New York',
        device: 'MacBook Pro'
      });
    }

    // Sort by timestamp (most recent first)
    anomalies.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    res.json({
      success: true,
      data: anomalies,
      total: anomalies.length
    });

  } catch (error) {
    console.error('Error getting anomaly events:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get anomaly events',
      error: error.message
    });
  }
};

// Update user behavioral baseline
const updateBehavioralBaseline = async (req, res) => {
  try {
    const { username, newBaseline } = req.body;

    behavioralBaselines.set(username, {
      ...newBaseline,
      lastUpdated: new Date(),
      confidence: Math.min(95, (behavioralBaselines.get(username)?.confidence || 50) + 10)
    });

    res.json({
      success: true,
      message: 'Behavioral baseline updated successfully',
      newConfidence: behavioralBaselines.get(username).confidence
    });

  } catch (error) {
    console.error('Error updating behavioral baseline:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update behavioral baseline',
      error: error.message
    });
  }
};

// Initialize baselines on startup
initializeBaselines();

export {
  analyzeUserActivity,
  getUserBehavioralProfile,
  getBehavioralAnalyticsSummary,
  getAnomalyEvents,
  updateBehavioralBaseline,
  calculateBehavioralRiskScore
};
