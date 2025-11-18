import express from 'express';
import {
  getGuardianOverview,
  getGuardianAlerts,
  getGuardianPolicies,
  evaluateActivity
} from '../controllers/aiGuardianController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// AI Guardian Routes
router.get('/overview', optionalAuth, getGuardianOverview);
router.get('/alerts', optionalAuth, getGuardianAlerts);
router.get('/policies', optionalAuth, getGuardianPolicies);
router.post('/evaluate', optionalAuth, evaluateActivity);

export default router;
