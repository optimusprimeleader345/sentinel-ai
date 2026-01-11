const express = require('express');
const router = express.Router();
const {
  requireSuperAdmin,
  logSuperAdminActivity,
  superAdminRateLimit
} = require('../middleware/superAdminMiddleware');

const {
  computeOrganizationRisk,
  getRiskDashboard,
  getOrganizationRiskHistory
} = require('../controllers/riskScoringController');

// Apply Super Admin middleware to all routes
router.use(requireSuperAdmin);
router.use(logSuperAdminActivity);
router.use(superAdminRateLimit);

// 🤖 ORGANIZATION RISK SCORING ENGINE ROUTES
// Real-time risk computation with predictive analytics

// Compute risk score for specific organization
router.get('/organization/:orgId', computeOrganizationRisk);

// Get dashboard view of all organization risks
router.get('/dashboard', getRiskDashboard);

// Get risk history for specific organization
router.get('/history/:orgId', getOrganizationRiskHistory);

module.exports = router;
