import express from 'express';
import passwordController from '../controllers/passwordController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

/**
 * Password Breach Check Routes
 * Provides secure password breach checking using HaveIBeenPwned API
 */

// Check password against breach database
router.post('/check', optionalAuth, (req, res) => passwordController.checkPasswordBreach(req, res));

// Health check for password breach service
router.get('/health', (req, res) => passwordController.getHealth(req, res));

export default router;
