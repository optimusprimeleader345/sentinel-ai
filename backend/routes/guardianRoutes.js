import express from 'express';
import {
  getGuardianScore,
  getGuardianAnomalies,
  getGuardianPrivacyScan,
  getGuardianDeviceSecurity,
  getGuardianRecommendations,
  askAIGuardian,
} from '../controllers/guardianController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/score', optionalAuth, getGuardianScore);
router.get('/anomalies', optionalAuth, getGuardianAnomalies);
router.get('/privacy-scan', optionalAuth, getGuardianPrivacyScan);
router.get('/device-security', optionalAuth, getGuardianDeviceSecurity);
router.get('/recommendations', optionalAuth, getGuardianRecommendations);
router.post('/ask', optionalAuth, askAIGuardian);

export default router;
