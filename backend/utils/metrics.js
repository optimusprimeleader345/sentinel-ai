import client from 'prom-client'

// Create a Registry to register the metrics
export const register = new client.Registry()

// Add default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register })

// HTTP Request Metrics
export const httpRequestDuration = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10]
})

export const httpRequestTotal = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code']
})

export const httpRequestSize = new client.Histogram({
  name: 'http_request_size_bytes',
  help: 'Size of HTTP requests in bytes',
  labelNames: ['method', 'route'],
  buckets: [100, 500, 1000, 5000, 10000, 50000, 100000]
})

export const httpResponseSize = new client.Histogram({
  name: 'http_response_size_bytes',
  help: 'Size of HTTP responses in bytes',
  labelNames: ['method', 'route'],
  buckets: [100, 500, 1000, 5000, 10000, 50000, 100000, 500000]
})

// Database Metrics
export const dbQueryDuration = new client.Histogram({
  name: 'db_query_duration_seconds',
  help: 'Duration of database queries in seconds',
  labelNames: ['operation', 'collection'],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
})

export const dbQueryTotal = new client.Counter({
  name: 'db_queries_total',
  help: 'Total number of database queries',
  labelNames: ['operation', 'collection', 'status']
})

// API Metrics
export const apiEndpointDuration = new client.Histogram({
  name: 'api_endpoint_duration_seconds',
  help: 'Duration of API endpoint calls',
  labelNames: ['endpoint', 'method', 'status'],
  buckets: [0.1, 0.5, 1, 2, 5, 10, 30]
})

export const apiEndpointTotal = new client.Counter({
  name: 'api_endpoints_total',
  help: 'Total number of API endpoint calls',
  labelNames: ['endpoint', 'method', 'status']
})

// Error Metrics
export const errorTotal = new client.Counter({
  name: 'errors_total',
  help: 'Total number of errors',
  labelNames: ['type', 'endpoint', 'status_code']
})

// Rate Limiting Metrics
export const rateLimitHits = new client.Counter({
  name: 'rate_limit_hits_total',
  help: 'Total number of rate limit hits',
  labelNames: ['endpoint', 'ip']
})

// Authentication Metrics
export const authAttempts = new client.Counter({
  name: 'auth_attempts_total',
  help: 'Total number of authentication attempts',
  labelNames: ['type', 'status'] // type: login/register, status: success/failure
})

// AI API Metrics
export const aiApiCalls = new client.Counter({
  name: 'ai_api_calls_total',
  help: 'Total number of AI API calls',
  labelNames: ['provider', 'endpoint', 'status']
})

export const aiApiDuration = new client.Histogram({
  name: 'ai_api_duration_seconds',
  help: 'Duration of AI API calls in seconds',
  labelNames: ['provider', 'endpoint'],
  buckets: [1, 2, 5, 10, 20, 30, 60]
})

// WebSocket Metrics
export const websocketConnections = new client.Gauge({
  name: 'websocket_connections_active',
  help: 'Number of active WebSocket connections'
})

export const websocketMessages = new client.Counter({
  name: 'websocket_messages_total',
  help: 'Total number of WebSocket messages',
  labelNames: ['type', 'direction'] // type: event type, direction: in/out
})

// Organization Metrics
export const organizationCount = new client.Gauge({
  name: 'organizations_total',
  help: 'Total number of organizations'
})

export const activeUsers = new client.Gauge({
  name: 'active_users_total',
  help: 'Total number of active users',
  labelNames: ['organization']
})

// System Health Metrics
export const systemHealth = new client.Gauge({
  name: 'system_health_score',
  help: 'System health score (0-100)',
  labelNames: ['component'] // component: api, database, cache, etc.
})

// Register all metrics
register.registerMetric(httpRequestDuration)
register.registerMetric(httpRequestTotal)
register.registerMetric(httpRequestSize)
register.registerMetric(httpResponseSize)
register.registerMetric(dbQueryDuration)
register.registerMetric(dbQueryTotal)
register.registerMetric(apiEndpointDuration)
register.registerMetric(apiEndpointTotal)
register.registerMetric(errorTotal)
register.registerMetric(rateLimitHits)
register.registerMetric(authAttempts)
register.registerMetric(aiApiCalls)
register.registerMetric(aiApiDuration)
register.registerMetric(websocketConnections)
register.registerMetric(websocketMessages)
register.registerMetric(organizationCount)
register.registerMetric(activeUsers)
register.registerMetric(systemHealth)

export default {
  register,
  httpRequestDuration,
  httpRequestTotal,
  httpRequestSize,
  httpResponseSize,
  dbQueryDuration,
  dbQueryTotal,
  apiEndpointDuration,
  apiEndpointTotal,
  errorTotal,
  rateLimitHits,
  authAttempts,
  aiApiCalls,
  aiApiDuration,
  websocketConnections,
  websocketMessages,
  organizationCount,
  activeUsers,
  systemHealth
}
