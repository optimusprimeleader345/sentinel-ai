import express from 'express';
import {
  getSummary,
  getTimeline,
  getDetails,
  getMITREMapping,
  getPlaybook
} from '../controllers/incidentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Incident Response / Forensics Routes
router.get('/summary', optionalAuth, getSummary);
router.get('/timeline', optionalAuth, getTimeline);
router.get('/details', optionalAuth, getDetails);
router.get('/mitre', optionalAuth, getMITREMapping);
router.get('/playbook', optionalAuth, getPlaybook);

export default router;
