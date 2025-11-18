import express from 'express';
import {
  getScenarios,
  runSimulation,
  getSimulationHistory
} from '../controllers/simulationController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Attack Simulation Routes
router.get('/scenarios', optionalAuth, getScenarios);
router.post('/run', optionalAuth, runSimulation);
router.get('/history', optionalAuth, getSimulationHistory);

export default router;
