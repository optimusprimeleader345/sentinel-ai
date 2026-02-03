import {
  httpRequestDuration,
  httpRequestTotal,
  httpRequestSize,
  httpResponseSize,
  apiEndpointDuration,
  apiEndpointTotal,
  errorTotal
} from '../utils/metrics.js'

/**
 * Metrics Middleware
 * Collects Prometheus metrics for all HTTP requests
 */
export const metricsMiddleware = (req, res, next) => {
  const startTime = Date.now()
  const route = req.route?.path || req.path || 'unknown'
  const method = req.method

  // Record request size
  const requestSize = parseInt(req.headers['content-length'] || '0', 10)
  if (requestSize > 0) {
    httpRequestSize.observe({ method, route }, requestSize)
  }

  // Override res.end to capture response metrics
  const originalEnd = res.end
  res.end = function(chunk, encoding) {
    const duration = (Date.now() - startTime) / 1000
    const statusCode = res.statusCode
    const responseSize = chunk ? Buffer.byteLength(chunk, encoding) : 0

    // Record metrics
    httpRequestDuration.observe({ method, route, status_code: statusCode }, duration)
    httpRequestTotal.inc({ method, route, status_code: statusCode })
    
    if (responseSize > 0) {
      httpResponseSize.observe({ method, route }, responseSize)
    }

    // Record API endpoint metrics
    if (route !== 'unknown') {
      apiEndpointDuration.observe({ endpoint: route, method, status: statusCode }, duration)
      apiEndpointTotal.inc({ endpoint: route, method, status: statusCode })
    }

    // Record errors
    if (statusCode >= 400) {
      errorTotal.inc({ 
        type: statusCode >= 500 ? 'server_error' : 'client_error',
        endpoint: route,
        status_code: statusCode
      })
    }

    // Call original end
    originalEnd.call(this, chunk, encoding)
  }

  next()
}

export default metricsMiddleware
