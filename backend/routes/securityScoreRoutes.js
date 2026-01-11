import express from 'express';
import {
  getOverallScore,
  getScoreBreakdown,
  getRiskFactors,
  getRecommendations,
  getScoreHistory,
  getScoreAnalysis,
  clearScoreCache
} from '../controllers/securityScoreController.js';
import { optionalAuth, authMiddleware as requireAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Security Score Routes - Enhanced Enterprise Scoring System
router.get('/overall', optionalAuth, getOverallScore);                    // Backward compatibility
router.get('/breakdown', optionalAuth, getScoreBreakdown);                // Category breakdown
router.get('/risk-factors', optionalAuth, getRiskFactors);                // Risk factors analysis
router.get('/recommendations', optionalAuth, getRecommendations);         // Actionable recommendations
router.get('/history', optionalAuth, getScoreHistory);                    // Score history for trends
router.get('/analysis', optionalAuth, getScoreAnalysis);                  // Comprehensive analysis

// Admin Routes
router.post('/clear-cache', requireAuth, (req, res, next) => {            // Clear cache (admin only)
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Admin access required' });
  }
  clearScoreCache(req, res, next);
});

export default router;
