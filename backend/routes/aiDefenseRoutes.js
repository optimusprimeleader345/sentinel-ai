import express from 'express';
import {
  getDefenseOverview,
  analyzeContext,
  getDefenseActions,
  simulateAction
} from '../controllers/aiDefenseController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// AI Defense Bot Routes
router.get('/overview', optionalAuth, getDefenseOverview);
router.post('/analyze-context', optionalAuth, analyzeContext);
router.get('/actions', optionalAuth, getDefenseActions);
router.post('/simulate', optionalAuth, simulateAction);

export default router;
