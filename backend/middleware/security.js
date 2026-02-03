import mongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'

// Sanitize MongoDB injection attempts
export const sanitizeMongo = mongoSanitize({
  replaceWith: '_',
  onSanitize: ({ req, key }) => {
    console.warn(`⚠️ MongoDB injection attempt detected: ${key} from IP ${req.ip}`)
  }
})

// Prevent HTTP Parameter Pollution
export const preventHPP = hpp({
  whitelist: ['page', 'limit', 'sort', 'filter', 'order', 'search']
})

// Request size limiter middleware
export const requestSizeLimiter = (req, res, next) => {
  const maxSize = 10 * 1024 * 1024 // 10MB
  const contentLength = req.headers['content-length']
  
  if (contentLength && parseInt(contentLength) > maxSize) {
    return res.status(413).json({
      success: false,
      message: 'Request entity too large. Maximum size is 10MB.',
      maxSize: '10MB'
    })
  }
  next()
}

// XSS protection (using express-validator's escape instead of deprecated xss-clean)
export const xssProtection = (req, res, next) => {
  // Basic XSS protection - escape common XSS patterns
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
    }
    if (Array.isArray(obj)) {
      return obj.map(sanitize)
    }
    if (obj && typeof obj === 'object') {
      const sanitized = {}
      for (const key in obj) {
        sanitized[key] = sanitize(obj[key])
      }
      return sanitized
    }
    return obj
  }

  if (req.body && typeof req.body === 'object') {
    req.body = sanitize(req.body)
  }
  if (req.query && typeof req.query === 'object') {
    req.query = sanitize(req.query)
  }
  
  next()
}

// Security headers middleware (enhanced)
export const securityHeaders = (req, res, next) => {
  // Additional security headers
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('X-XSS-Protection', '1; mode=block')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  next()
}
