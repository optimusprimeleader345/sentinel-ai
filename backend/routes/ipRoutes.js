import express from 'express';
import ipController from '../controllers/ipController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * IP Scanner Routes
 * Provides comprehensive IP reputation scanning capabilities
 */

// Scan IP address for threats
router.post('/scan', optionalAuth, (req, res) => ipController.scanIP(req, res));

// Get IP scanning reports/history
router.get('/reports', optionalAuth, (req, res) => ipController.getIPReports(req, res));

// Health check for IP scanner
router.get('/health', (req, res) => {
  res.json({
    service: 'IP Scanner',
    status: 'operational',
    provider: 'AbuseIPDB',
    timestamp: new Date().toISOString()
  });
});

export default router;
