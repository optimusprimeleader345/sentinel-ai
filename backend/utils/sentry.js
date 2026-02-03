import * as Sentry from '@sentry/node'
import { ProfilingIntegration } from '@sentry/profiling-node'

/**
 * Sentry Error Tracking Setup
 * Initialize Sentry for error tracking and performance monitoring
 */
export const initSentry = () => {
  // Only initialize if DSN is provided
  if (!process.env.SENTRY_DSN) {
    console.log('⚠️ Sentry DSN not provided, error tracking disabled')
    return
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: process.env.NODE_ENV || 'development',
    tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0, // 10% in production, 100% in dev
    profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
    integrations: [
      new ProfilingIntegration(),
    ],
    // Set sample rate for profiling
    beforeSend(event, hint) {
      // Filter out sensitive data
      if (event.request) {
        // Remove sensitive headers
        if (event.request.headers) {
          delete event.request.headers.authorization
          delete event.request.headers.cookie
        }
        // Remove sensitive query params
        if (event.request.query_string) {
          const queryParams = new URLSearchParams(event.request.query_string)
          queryParams.delete('password')
          queryParams.delete('token')
          queryParams.delete('apiKey')
          event.request.query_string = queryParams.toString()
        }
      }
      return event
    },
  })

  console.log('✅ Sentry initialized for error tracking')
}

/**
 * Sentry Error Handler Middleware
 */
export const sentryErrorHandler = Sentry.Handlers.errorHandler()

/**
 * Sentry Request Handler Middleware
 */
export const sentryRequestHandler = Sentry.Handlers.requestHandler({
  user: ['id', 'email', 'organizationId'],
  ip: true,
})

/**
 * Capture exception manually
 */
export const captureException = (error, context = {}) => {
  Sentry.captureException(error, {
    extra: context
  })
}

/**
 * Capture message manually
 */
export const captureMessage = (message, level = 'info', context = {}) => {
  Sentry.captureMessage(message, {
    level,
    extra: context
  })
}

/**
 * Set user context
 */
export const setUserContext = (user) => {
  Sentry.setUser({
    id: user.id || user.userId,
    email: user.email,
    username: user.username,
    organizationId: user.organizationId
  })
}

/**
 * Add breadcrumb
 */
export const addBreadcrumb = (message, category, level = 'info', data = {}) => {
  Sentry.addBreadcrumb({
    message,
    category,
    level,
    data
  })
}

export default {
  initSentry,
  sentryErrorHandler,
  sentryRequestHandler,
  captureException,
  captureMessage,
  setUserContext,
  addBreadcrumb
}
