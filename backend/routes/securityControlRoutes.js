const express = require('express');
const router = express.Router();
const {
  emergencyLockdown,
  toggleSystemPower,
  allocateResources,
  updateAlertSettings,
  switchAIModel,
  updateAISensitivity,
  getSecurityState
} = require('../controllers/securityControlController');

// 🛡️ SUPER ADMIN SECURITY CONTROL ROUTES
// Real-time security system management endpoints

// Emergency Lockdown Routes
router.post('/emergency/lockdown', emergencyLockdown);

// System Power Control Routes
router.post('/systems/toggle', toggleSystemPower);

// Resource Allocation Routes
router.post('/resources/allocate', allocateResources);

// Alert Settings Routes
router.post('/alerts/settings', updateAlertSettings);

// AI Control Routes
router.post('/ai/models/switch', switchAIModel);
router.post('/ai/sensitivity', updateAISensitivity);

// Monitoring Routes
router.get('/state', getSecurityState);

module.exports = router;
