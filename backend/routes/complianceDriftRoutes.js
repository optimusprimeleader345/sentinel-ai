const express = require('express');
const router = express.Router();
const {
  requireSuperAdmin,
  logSuperAdminActivity,
  superAdminRateLimit
} = require('../middleware/superAdminMiddleware');

const {
  scanComplianceDrift,
  getDriftAlerts,
  remediateComplianceDrift
} = require('../controllers/complianceDriftController');

// Apply Super Admin middleware to all routes
router.use(requireSuperAdmin);
router.use(logSuperAdminActivity);
router.use(superAdminRateLimit);

// 🤖 AI COMPLIANCE DRIFT DETECTION ENGINE ROUTES
// Government-grade compliance monitoring with AI-powered drift analysis

// Scan compliance drift for specific organization
router.post('/scan/:orgId', scanComplianceDrift);

// Get active compliance drift alerts with filtering
router.get('/alerts', getDriftAlerts);

// Generate AI-powered remediation plans
router.post('/remediate', remediateComplianceDrift);

module.exports = router;
