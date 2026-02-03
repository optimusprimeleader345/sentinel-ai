import { dbQueryDuration, dbQueryTotal } from '../utils/metrics.js'
import logger from '../utils/logger.js'

/**
 * Performance Monitoring Middleware
 * Tracks slow requests and database queries
 */

// Track slow requests
export const performanceMonitoring = (req, res, next) => {
  const startTime = Date.now()
  const slowRequestThreshold = 2000 // 2 seconds

  res.on('finish', () => {
    const duration = Date.now() - startTime
    
    if (duration > slowRequestThreshold) {
      logger.warn('Slow request detected', {
        method: req.method,
        path: req.path,
        duration: `${duration}ms`,
        ip: req.ip,
        user: req.user?.userId || 'anonymous'
      })
    }
  })

  next()
}

/**
 * Database Query Monitoring
 * Wraps Mongoose queries to track performance
 */
export const monitorDatabaseQuery = async (operation, collection, queryFn) => {
  const startTime = Date.now()
  
  try {
    const result = await queryFn()
    const duration = (Date.now() - startTime) / 1000
    
    // Record metrics
    dbQueryDuration.observe({ operation, collection }, duration)
    dbQueryTotal.inc({ operation, collection, status: 'success' })
    
    // Log slow queries
    if (duration > 1) { // Queries taking more than 1 second
      logger.warn('Slow database query detected', {
        operation,
        collection,
        duration: `${duration}s`
      })
    }
    
    return result
  } catch (error) {
    const duration = (Date.now() - startTime) / 1000
    dbQueryDuration.observe({ operation, collection }, duration)
    dbQueryTotal.inc({ operation, collection, status: 'error' })
    
    logger.error('Database query error', {
      operation,
      collection,
      duration: `${duration}s`,
      error: error.message
    })
    
    throw error
  }
}

export default {
  performanceMonitoring,
  monitorDatabaseQuery
}
