import express from 'express';
import {
  getIdentityTrust,
  getDeviceTrust,
  getSessionTrust,
  getNetworkTrust,
  getRadar,
  getZTRecommendations
} from '../controllers/zeroTrustController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Zero Trust Routes
router.get('/identity', optionalAuth, getIdentityTrust);
router.get('/device', optionalAuth, getDeviceTrust);
router.get('/session', optionalAuth, getSessionTrust);
router.get('/network', optionalAuth, getNetworkTrust);
router.get('/radar', optionalAuth, getRadar);
router.get('/recommendations', optionalAuth, getZTRecommendations);

export default router;
