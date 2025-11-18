import express from 'express'
import { getLogs, createLog, analyzeLogs, uploadLogFile, getLogAnomalies, getLogEvents, getLogTimeline, analyzeLogsExact, uploadLogFileExact, getAnomaliesExact, getEventsExact, getTimelineExact } from '../controllers/logController.js'
import { optionalAuth } from '../middleware/authMiddleware.js'
import { upload } from '../utils/fileUpload.js'

const router = express.Router()

// Existing routes
router.get('/', optionalAuth, getLogs)
router.post('/', optionalAuth, createLog)

// AI Log Analysis routes (legacy)
router.post('/analyze', optionalAuth, analyzeLogs)
router.post('/upload', optionalAuth, upload.single('logFile'), uploadLogFile)
router.get('/anomalies', optionalAuth, getLogAnomalies)
router.get('/events', optionalAuth, getLogEvents)
router.get('/timeline', optionalAuth, getLogTimeline)

// New exact specification routes
router.post('/analyze-exact', optionalAuth, analyzeLogsExact)
router.post('/upload-exact', optionalAuth, uploadLogFileExact)
router.get('/anomalies-exact', optionalAuth, getAnomaliesExact)
router.get('/events-exact', optionalAuth, getEventsExact)
router.get('/timeline-exact', optionalAuth, getTimelineExact)

export default router
