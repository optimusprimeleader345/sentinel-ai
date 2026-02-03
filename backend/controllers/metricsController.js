import { register } from '../utils/metrics.js'

/**
 * Get Prometheus metrics
 */
export const getMetrics = async (req, res) => {
  try {
    res.set('Content-Type', register.contentType)
    const metrics = await register.metrics()
    res.end(metrics)
  } catch (error) {
    console.error('Error getting metrics:', error)
    res.status(500).end()
  }
}

/**
 * Get metrics in JSON format (for debugging)
 */
export const getMetricsJSON = async (req, res) => {
  try {
    const metrics = await register.getMetricsAsJSON()
    res.json({
      success: true,
      metrics
    })
  } catch (error) {
    console.error('Error getting metrics JSON:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get metrics'
    })
  }
}

/**
 * Get health metrics summary
 */
export const getHealthMetrics = async (req, res) => {
  try {
    const metrics = await register.getMetricsAsJSON()
    
    // Extract key metrics
    const summary = {
      http: {
        total: metrics.find(m => m.name === 'http_requests_total')?.values?.[0]?.value || 0,
        errors: metrics.find(m => m.name === 'errors_total')?.values?.reduce((sum, v) => sum + v.value, 0) || 0
      },
      database: {
        queries: metrics.find(m => m.name === 'db_queries_total')?.values?.reduce((sum, v) => sum + v.value, 0) || 0
      },
      websocket: {
        connections: metrics.find(m => m.name === 'websocket_connections_active')?.values?.[0]?.value || 0
      },
      system: {
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage()
      }
    }
    
    res.json({
      success: true,
      summary,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error getting health metrics:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get health metrics'
    })
  }
}
