import express from 'express';
import {
  analyzeDeepfake,
  getDeepfakeForensics,
  getDeepfakeFrames,
  getDeepfakeTimeline,
  explainDeepfake,
  getDeepfakeRecommendations,
} from '../controllers/deepfakeController.js';
import { upload } from '../utils/fileUpload.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Upload and analyze endpoint
router.post('/analyze', optionalAuth, upload, analyzeDeepfake);

// Analysis endpoints
router.get('/forensics/:id', optionalAuth, getDeepfakeForensics);
router.get('/frames/:id', optionalAuth, getDeepfakeFrames);
router.get('/timeline/:id', optionalAuth, getDeepfakeTimeline);
router.post('/explain', optionalAuth, explainDeepfake);

// Recommendations endpoint
router.get('/recommendations', optionalAuth, getDeepfakeRecommendations);

export default router;
