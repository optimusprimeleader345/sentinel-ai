// AI Incident Response Routes
// Routes for automated incident response and management

import express from 'express';
import {
  processIncident,
  getIncidentDetails,
  getIncidents,
  updateIncidentStatus,
  executeManualAction,
  getIncidentStats
} from '../controllers/incidentResponseController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Process incoming alerts and create incidents
router.post('/process', optionalAuth, async (req, res) => {
  try {
    const result = await processIncident(req.body);
    res.json(result);
  } catch (error) {
    console.error('Error processing incident:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process incident',
      error: error.message
    });
  }
});

// Get incident details
router.get('/:id', optionalAuth, getIncidentDetails);

// Get all incidents with filtering
router.get('/', optionalAuth, getIncidents);

// Update incident status
router.patch('/:id/status', optionalAuth, updateIncidentStatus);

// Execute manual response action
router.post('/action/execute', optionalAuth, executeManualAction);

// Get incident statistics
router.get('/stats/overview', optionalAuth, getIncidentStats);

export default router;
