// Advanced Behavioral Analytics Routes
// Routes for User and Entity Behavior Analytics (UEBA)

import express from 'express';
import {
  analyzeUserActivity,
  getUserBehavioralProfile,
  getBehavioralAnalyticsSummary,
  getAnomalyEvents,
  updateBehavioralBaseline
} from '../controllers/behaviorAnalyticsController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Analyze user activity in real-time
router.post('/analyze-activity', optionalAuth, analyzeUserActivity);

// Get user behavioral profile
router.get('/profile/:username', optionalAuth, getUserBehavioralProfile);

// Get behavioral analytics summary
router.get('/summary', optionalAuth, getBehavioralAnalyticsSummary);

// Get anomaly events
router.get('/anomalies', optionalAuth, getAnomalyEvents);

// Update behavioral baseline
router.put('/baseline', optionalAuth, updateBehavioralBaseline);

// Get user risk scores (aggregated)
router.get('/risk-scores', optionalAuth, async (req, res) => {
  try {
    // Mock risk scores for all users
    const riskScores = [
      {
        username: 'john.doe',
        department: 'Engineering',
        riskScore: 25,
        riskLevel: 'LOW',
        lastActivity: new Date(Date.now() - 30 * 60 * 1000),
        anomalies: 2
      },
      {
        username: 'admin.user',
        department: 'IT Security',
        riskScore: 15,
        riskLevel: 'LOW',
        lastActivity: new Date(Date.now() - 15 * 60 * 1000),
        anomalies: 0
      },
      {
        username: 'suspect.user',
        department: 'Marketing',
        riskScore: 85,
        riskLevel: 'HIGH',
        lastActivity: new Date(Date.now() - 5 * 60 * 1000),
        anomalies: 7
      }
    ];

    res.json({
      success: true,
      data: riskScores,
      total: riskScores.length
    });

  } catch (error) {
    console.error('Error getting risk scores:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get risk scores',
      error: error.message
    });
  }
});

// Get behavioral trends over time
router.get('/trends', optionalAuth, async (req, res) => {
  try {
    const { days = 7 } = req.query;

    // Mock trend data
    const trends = [];
    const now = Date.now();

    for (let i = parseInt(days) - 1; i >= 0; i--) {
      const date = new Date(now - i * 24 * 60 * 60 * 1000);
      trends.push({
        date: date.toISOString().split('T')[0],
        totalAnomalies: Math.floor(Math.random() * 20) + 5,
        highRiskUsers: Math.floor(Math.random() * 5) + 1,
        avgRiskScore: Math.floor(Math.random() * 30) + 20,
        activeSessions: Math.floor(Math.random() * 50) + 30
      });
    }

    res.json({
      success: true,
      data: trends,
      period: `${days} days`
    });

  } catch (error) {
    console.error('Error getting behavioral trends:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get behavioral trends',
      error: error.message
    });
  }
});

// Get session analytics
router.get('/sessions', optionalAuth, async (req, res) => {
  try {
    // Mock active session data
    const sessions = [
      {
        sessionId: 'sess_001',
        username: 'john.doe',
        startTime: new Date(Date.now() - 2 * 60 * 60 * 1000),
        duration: 7200, // seconds
        location: 'New York',
        device: 'MacBook Pro',
        riskScore: 15,
        activities: ['File Access', 'Database Query', 'Email Send']
      },
      {
        sessionId: 'sess_002',
        username: 'admin.user',
        startTime: new Date(Date.now() - 45 * 60 * 1000),
        duration: 2700,
        location: 'Headquarters',
        device: 'Windows Workstation',
        riskScore: 8,
        activities: ['Admin Action', 'User Management', 'System Config']
      },
      {
        sessionId: 'sess_003',
        username: 'suspect.user',
        startTime: new Date(Date.now() - 15 * 60 * 1000),
        duration: 900,
        location: 'Unknown',
        device: 'Unknown Device',
        riskScore: 78,
        activities: ['Unusual File Access', 'Data Download']
      }
    ];

    res.json({
      success: true,
      data: sessions,
      activeCount: sessions.length
    });

  } catch (error) {
    console.error('Error getting session analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get session analytics',
      error: error.message
    });
  }
});

export default router;
