import express from 'express';
import { getThreatFeed, getThreatActors, getIOCs } from '../controllers/threatIntelController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Threat Intelligence Routes
router.get('/feed', optionalAuth, getThreatFeed);
router.get('/actors', optionalAuth, getThreatActors);
router.get('/iocs', optionalAuth, getIOCs);

export default router;
