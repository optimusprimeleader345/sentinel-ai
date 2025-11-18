import express from 'express';
import {
  getPlaybookList,
  getPlaybookFlow,
  togglePlaybook,
  simulatePlaybook,
  getPlaybookHistory
} from '../controllers/playbookController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Defense Playbooks Routes
router.get('/list', optionalAuth, getPlaybookList);
router.get('/flow', optionalAuth, getPlaybookFlow);
router.post('/toggle', optionalAuth, togglePlaybook);
router.post('/simulate', optionalAuth, simulatePlaybook);
router.get('/history', optionalAuth, getPlaybookHistory);

export default router;
