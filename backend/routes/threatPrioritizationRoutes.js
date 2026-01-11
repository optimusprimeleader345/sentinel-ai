const express = require('express');
const router = express.Router();
const {
  requireSuperAdmin,
  logSuperAdminActivity,
  superAdminRateLimit
} = require('../middleware/superAdminMiddleware');

const {
  analyzeNationalThreats,
  getPrioritizedThreats,
  updateThreatPrioritization
} = require('../controllers/threatPrioritizationController');

// Apply Super Admin middleware to all routes
router.use(requireSuperAdmin);
router.use(logSuperAdminActivity);
router.use(superAdminRateLimit);

// 🤖 AI THREAT PRIORITIZATION ENGINE ROUTES
// Government-grade threat intelligence with explainable AI

// Analyze and prioritize national threats
router.post('/analyze', analyzeNationalThreats);

// Get prioritized threat results with filtering
router.get('/results', getPrioritizedThreats);

// Update threat prioritization manually (Super Admin override)
router.post('/update', updateThreatPrioritization);

module.exports = router;
