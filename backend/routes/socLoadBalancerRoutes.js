const express = require('express');
const router = express.Router();
const {
  requireSuperAdmin,
  logSuperAdminActivity,
  superAdminRateLimit
} = require('../middleware/superAdminMiddleware');

const {
  balanceSOCWorkload,
  getSOCLoadStatus,
  getSafeModeRecommendations,
  updateLoadBalancingConfig
} = require('../controllers/socLoadBalancerController');

// Apply Super Admin middleware to all routes
router.use(requireSuperAdmin);
router.use(logSuperAdminActivity);
router.use(superAdminRateLimit);

// 🤖 AUTONOMOUS SOC LOAD BALANCER ENGINE ROUTES
// SAFE MODE - AI-powered workload distribution to prevent analyst burnout

// Balance SOC workload with AI optimization
router.post('/balance', balanceSOCWorkload);

// Get current SOC load status and analyst workload
router.get('/status', getSOCLoadStatus);

// Get SAFE MODE recommendations and fatigue alerts
router.get('/safe-mode', getSafeModeRecommendations);

// Update load balancing configuration and constraints
router.put('/config', updateLoadBalancingConfig);

module.exports = router;
