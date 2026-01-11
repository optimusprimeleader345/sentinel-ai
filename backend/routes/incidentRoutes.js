import express from 'express';
import {
  getRecentIncidentsController,
  getUnresolvedIncidentsController,
  updateIncidentStatusController,
  assignIncidentController,
  escalateIncidentController,
  addInvestigationController,
  correlateIncidentsController,
  resolveIncidentController,
  closeIncidentController,
  getSummaryController,
  getIncidentsByType,
  getIncidentsWithFiltersController,
  getIncidentAnalyticsController,
  getIncidentByIdController,
  createTestIncidentController
} from '../controllers/incidentController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// ===== ENTERPRISE INCIDENT RESPONSE API ROUTES =====

// Core Dashboard Endpoints
router.get('/recent', optionalAuth, getRecentIncidentsController);
router.get('/unresolved', optionalAuth, getUnresolvedIncidentsController);
router.get('/summary', optionalAuth, getSummaryController);

// Incident Details
router.get('/:incidentId', optionalAuth, getIncidentByIdController);

// Advanced Filtering and Analytics
router.get('/filtered', optionalAuth, getIncidentsWithFiltersController);
router.get('/analytics', optionalAuth, getIncidentAnalyticsController);
router.get('/type/:type', optionalAuth, getIncidentsByType);

// Test and Development Endpoints
router.post('/test', optionalAuth, createTestIncidentController);

// Incident Workflow Management
router.put('/:incidentId/status', optionalAuth, updateIncidentStatusController);
router.put('/:incidentId/assign', optionalAuth, assignIncidentController);
router.put('/:incidentId/escalate', optionalAuth, escalateIncidentController);

// Investigation and Documentation
router.post('/:incidentId/investigation', optionalAuth, addInvestigationController);

// Incident Relationship Management
router.post('/:primaryIncidentId/correlation', optionalAuth, correlateIncidentsController);

// Closure and Resolution
router.put('/:incidentId/resolve', optionalAuth, resolveIncidentController);
router.put('/:incidentId/close', optionalAuth, closeIncidentController);

// ===== LEGACY ENDPOINTS (maintained for backward compatibility) =====
router.get('/timeline', optionalAuth, getRecentIncidentsController);
router.get('/details', optionalAuth, getUnresolvedIncidentsController);
router.get('/mitre', optionalAuth, getUnresolvedIncidentsController);
router.get('/playbook', optionalAuth, getSummaryController);

export default router;
