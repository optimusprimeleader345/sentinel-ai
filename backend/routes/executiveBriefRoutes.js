const express = require('express');
const router = express.Router();
const {
  requireSuperAdmin,
  logSuperAdminActivity,
  superAdminRateLimit
} = require('../middleware/superAdminMiddleware');

const {
  generateExecutiveBrief,
  getBriefHistory,
  getBriefById,
  getBriefTemplates
} = require('../controllers/executiveBriefController');

// Apply Super Admin middleware to all routes
router.use(requireSuperAdmin);
router.use(logSuperAdminActivity);
router.use(superAdminRateLimit);

// 🤖 AI EXECUTIVE BRIEF GENERATOR ROUTES
// Automated strategic intelligence synthesis for C-suite decision making

// Generate executive brief for specific role
router.post('/generate', generateExecutiveBrief);

// Get brief history for specific role
router.get('/history/:role', getBriefHistory);

// Get specific brief by ID
router.get('/:briefId', getBriefById);

// Get brief templates and customization options
router.get('/templates', getBriefTemplates);

module.exports = router;
