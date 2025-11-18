import express from 'express';
import {
  getBehaviorSummary,
  getBehaviorTrends,
  getAnomalyEvents,
  getUserRisk,
  getDeviceBehavior,
  getLocationActivity,
  getBehaviorInsights,
  // New exact specification functions
  getSummary,
  getTrends,
  getAnomalies,
  getRiskScore,
  getDevices,
  getLocations,
  getInsights,
} from '../controllers/behaviorController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Behavior Analytics Routes (UEBA) - Legacy functions
router.get('/summary', optionalAuth, getBehaviorSummary);
router.get('/trends', optionalAuth, getBehaviorTrends);
router.get('/anomalies', optionalAuth, getAnomalyEvents);
router.get('/risk', optionalAuth, getUserRisk);
router.get('/devices', optionalAuth, getDeviceBehavior);
router.get('/locations', optionalAuth, getLocationActivity);
router.get('/insights', optionalAuth, getBehaviorInsights);

// New exact specification routes
router.get('/summary-exact', optionalAuth, getSummary);
router.get('/trends-exact', optionalAuth, getTrends);
router.get('/anomalies-exact', optionalAuth, getAnomalies);
router.get('/risk-exact', optionalAuth, getRiskScore);
router.get('/devices-exact', optionalAuth, getDevices);
router.get('/locations-exact', optionalAuth, getLocations);
router.get('/insights-exact', optionalAuth, getInsights);

export default router;
