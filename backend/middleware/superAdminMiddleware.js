const jwt = require('jsonwebtoken');

// 🔐 SUPER ADMIN AUTHENTICATION MIDDLEWARE
// Government-grade Super Admin validation with audit logging

const SUPERADMIN_ROLE = 'superadmin';
const ALLOWED_SUPERADMIN_IPS = process.env.ALLOWED_SUPERADMIN_IPS?.split(',') || [];

// Audit logging for Super Admin access
const logSuperAdminAccess = (action, details, user = 'unknown', ip = 'unknown') => {
  const logEntry = {
    timestamp: new Date().toISOString(),
    user,
    role: 'superadmin',
    action,
    details,
    ip,
    userAgent: 'SuperAdmin API',
    accessLevel: 'CRITICAL'
  };

  console.log('[SUPERADMIN AUDIT]', JSON.stringify(logEntry));
};

// Super Admin JWT verification
const verifySuperAdminToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    return decoded.role === SUPERADMIN_ROLE ? decoded : null;
  } catch (error) {
    return null;
  }
};

// IP-based access control for Super Admin
const validateSuperAdminIP = (ip) => {
  // Allow all IPs in development
  if (process.env.NODE_ENV === 'development') return true;

  // Check against allowed IPs
  return ALLOWED_SUPERADMIN_IPS.length === 0 || ALLOWED_SUPERADMIN_IPS.includes(ip);
};

// Main Super Admin authentication middleware
const requireSuperAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const clientIP = req.ip || req.connection.remoteAddress ||
                    req.socket.remoteAddress ||
                    (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // Validate IP access
    if (!validateSuperAdminIP(clientIP)) {
      logSuperAdminAccess('ACCESS_DENIED_IP', {
        reason: 'IP not in allowed Super Admin list',
        attemptedIP: clientIP
      });

      return res.status(403).json({
        success: false,
        error: 'Access denied: Unauthorized IP address',
        code: 'SUPERADMIN_IP_DENIED'
      });
    }

    // Validate JWT token
    if (!token) {
      logSuperAdminAccess('ACCESS_DENIED_NO_TOKEN', {
        reason: 'No authentication token provided'
      }, 'unknown', clientIP);

      return res.status(401).json({
        success: false,
        error: 'Authentication required: Super Admin access only',
        code: 'SUPERADMIN_TOKEN_MISSING'
      });
    }

    // Verify Super Admin token
    const decoded = verifySuperAdminToken(token);
    if (!decoded) {
      logSuperAdminAccess('ACCESS_DENIED_INVALID_TOKEN', {
        reason: 'Invalid or expired Super Admin token'
      }, 'unknown', clientIP);

      return res.status(403).json({
        success: false,
        error: 'Access denied: Invalid Super Admin credentials',
        code: 'SUPERADMIN_TOKEN_INVALID'
      });
    }

    // Validate Super Admin role
    if (decoded.role !== SUPERADMIN_ROLE) {
      logSuperAdminAccess('ACCESS_DENIED_INSUFFICIENT_ROLE', {
        reason: 'User does not have Super Admin role',
        userRole: decoded.role
      }, decoded.username || decoded.id, clientIP);

      return res.status(403).json({
        success: false,
        error: 'Access denied: Super Admin privileges required',
        code: 'SUPERADMIN_ROLE_INSUFFICIENT'
      });
    }

    // Success - attach Super Admin info to request
    req.superAdmin = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
      permissions: decoded.permissions || ['*'],
      clearanceLevel: decoded.clearanceLevel || 'TOP_SECRET',
      lastLogin: decoded.lastLogin
    };

    req.clientIP = clientIP;

    // Log successful access
    logSuperAdminAccess('ACCESS_GRANTED', {
      endpoint: req.originalUrl,
      method: req.method,
      userAgent: req.headers['user-agent']
    }, decoded.username || decoded.id, clientIP);

    next();

  } catch (error) {
    logSuperAdminAccess('ACCESS_ERROR', {
      reason: 'Middleware error',
      error: error.message
    }, 'unknown', req.ip);

    return res.status(500).json({
      success: false,
      error: 'Super Admin authentication error',
      code: 'SUPERADMIN_AUTH_ERROR'
    });
  }
};

// Super Admin activity logger middleware
const logSuperAdminActivity = (req, res, next) => {
  const startTime = Date.now();

  // Log after response is sent
  res.on('finish', () => {
    const duration = Date.now() - startTime;

    logSuperAdminAccess('ACTIVITY_COMPLETED', {
      endpoint: req.originalUrl,
      method: req.method,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.headers['user-agent']
    }, req.superAdmin?.username || req.superAdmin?.id, req.clientIP);
  });

  next();
};

// Rate limiting for Super Admin actions (stricter than regular users)
const superAdminRateLimit = (req, res, next) => {
  // Simple in-memory rate limiting (use Redis in production)
  const clientIP = req.ip;
  const now = Date.now();
  const windowMs = 60000; // 1 minute
  const maxRequests = 100; // 100 requests per minute for Super Admin

  if (!global.superAdminRateLimit) {
    global.superAdminRateLimit = new Map();
  }

  const key = `superadmin_${clientIP}`;
  const requests = global.superAdminRateLimit.get(key) || [];

  // Clean old requests
  const validRequests = requests.filter(time => now - time < windowMs);

  if (validRequests.length >= maxRequests) {
    logSuperAdminAccess('RATE_LIMIT_EXCEEDED', {
      reason: 'Super Admin rate limit exceeded',
      requestCount: validRequests.length
    }, req.superAdmin?.username, clientIP);

    return res.status(429).json({
      success: false,
      error: 'Rate limit exceeded: Too many Super Admin requests',
      code: 'SUPERADMIN_RATE_LIMIT'
    });
  }

  validRequests.push(now);
  global.superAdminRateLimit.set(key, validRequests);

  next();
};

// Emergency override middleware (for critical situations)
const allowEmergencyOverride = (req, res, next) => {
  const emergencyToken = req.headers['x-emergency-override'];

  if (emergencyToken === process.env.EMERGENCY_OVERRIDE_TOKEN) {
    logSuperAdminAccess('EMERGENCY_OVERRIDE_USED', {
      reason: 'Emergency override token used',
      endpoint: req.originalUrl
    }, 'EMERGENCY_SYSTEM', req.ip);

    // Bypass normal checks for emergency
    req.emergencyOverride = true;
    return next();
  }

  next();
};

module.exports = {
  requireSuperAdmin,
  logSuperAdminActivity,
  superAdminRateLimit,
  allowEmergencyOverride
};
