import express from 'express';
import { generateReport, getReportHistory } from '../controllers/reportController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Report Routes
router.post('/generate', optionalAuth, generateReport);
router.get('/history', optionalAuth, getReportHistory);

export default router;
