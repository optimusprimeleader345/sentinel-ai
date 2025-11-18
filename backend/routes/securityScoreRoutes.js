import express from 'express';
import {
  getOverallScore,
  getScoreFactors,
  getScoreHistory
} from '../controllers/securityScoreController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Security Score Routes
router.get('/overall', optionalAuth, getOverallScore);
router.get('/factors', optionalAuth, getScoreFactors);
router.get('/history', optionalAuth, getScoreHistory);

export default router;
