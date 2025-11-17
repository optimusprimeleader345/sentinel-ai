import express from 'express';
import {
  getDefenseStatus,
  getDefenseActions,
  getActiveThreats,
  getDefenseRecommendations,
  sendDefenseCommand,
} from '../controllers/defenseController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/status', optionalAuth, getDefenseStatus);
router.get('/actions', optionalAuth, getDefenseActions);
router.get('/active-threats', optionalAuth, getActiveThreats);
router.get('/recommendations', optionalAuth, getDefenseRecommendations);
router.post('/command', optionalAuth, sendDefenseCommand);

export default router;
