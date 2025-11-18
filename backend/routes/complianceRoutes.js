import express from 'express';
import { getFrameworks, getControls, getGaps } from '../controllers/complianceController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Compliance Routes
router.get('/frameworks', optionalAuth, getFrameworks);
router.get('/controls', optionalAuth, getControls);
router.get('/gaps', optionalAuth, getGaps);

export default router;
