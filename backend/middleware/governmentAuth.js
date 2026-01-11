import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import GovernmentAgency from '../models/GovernmentAgency.js'

// Government security clearance hierarchy
const CLEARANCE_LEVELS = {
  'none': 0,
  'confidential': 1,
  'secret': 2,
  'top-secret': 3,
  'ts-sci': 4,
  'q-clearance': 5
}

// Required clearances for different operations
const OPERATION_CLEARANCES = {
  'read:unclassified': 'none',
  'read:confidential': 'confidential',
  'read:secret': 'secret',
  'read:top-secret': 'top-secret',
  'read:ts-sci': 'ts-sci',
  'write:unclassified': 'confidential',
  'write:confidential': 'secret',
  'write:secret': 'top-secret',
  'write:top-secret': 'ts-sci',
  'write:ts-sci': 'q-clearance',
  'admin:agency': 'q-clearance',
  'admin:emergency': 'q-clearance',
  'admin:national': 'q-clearance'
}

// Government role permissions
const ROLE_PERMISSIONS = {
  'user': [
    'read:unclassified',
    'read:confidential'
  ],
  'analyst': [
    'read:unclassified',
    'read:confidential',
    'read:secret',
    'write:unclassified'
  ],
  'admin': [
    'read:unclassified',
    'read:confidential',
    'read:secret',
    'read:top-secret',
    'write:unclassified',
    'write:confidential',
    'write:secret',
    'admin:agency'
  ],
  'manager': [
    'read:unclassified',
    'read:confidential',
    'read:secret',
    'read:top-secret',
    'write:unclassified',
    'write:confidential',
    'write:secret',
    'write:top-secret',
    'admin:agency'
  ],
  'superadmin': [
    'read:unclassified',
    'read:confidential',
    'read:secret',
    'read:top-secret',
    'read:ts-sci',
    'write:unclassified',
    'write:confidential',
    'write:secret',
    'write:top-secret',
    'write:ts-sci',
    'admin:agency',
    'admin:emergency',
    'admin:national'
  ]
}

// Middleware to verify JWT and attach user/agency info
export const verifyGovernmentToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: 'Access denied. No token provided.'
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded.user.id)

    if (!user || !user.isActive) {
      return res.status(401).json({
        success: false,
        msg: 'Invalid token or inactive user.'
      })
    }

    // Attach user and permissions to request
    req.user = user
    req.userPermissions = ROLE_PERMISSIONS[user.role] || []
    req.userClearance = user.clearance || 'none'

    next()
  } catch (error) {
    console.error('Token verification error:', error)
    res.status(401).json({
      success: false,
      msg: 'Invalid token.'
    })
  }
}

// Middleware to check role-based permissions
export const requirePermission = (permission) => {
  return (req, res, next) => {
    if (!req.userPermissions || !req.userPermissions.includes(permission)) {
      return res.status(403).json({
        success: false,
        msg: `Access denied. Required permission: ${permission}`,
        requiredRole: getRequiredRole(permission)
      })
    }
    next()
  }
}

// Middleware to check security clearance
export const requireClearance = (requiredClearance) => {
  return (req, res, next) => {
    const userClearance = req.userClearance || 'none'
    const userLevel = CLEARANCE_LEVELS[userClearance] || 0
    const requiredLevel = CLEARANCE_LEVELS[requiredClearance] || 0

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        msg: `Access denied. Required clearance: ${requiredClearance}`,
        userClearance: userClearance,
        requiredClearance: requiredClearance
      })
    }
    next()
  }
}

// Middleware for government agency access
export const requireAgencyAccess = (agencyCode = null) => {
  return async (req, res, next) => {
    try {
      let agency

      if (agencyCode) {
        // Specific agency access
        agency = await GovernmentAgency.findOne({ code: agencyCode })
      } else {
        // User's assigned agency
        const user = await User.findById(req.user._id).populate('agency')
        agency = user.agency
      }

      if (!agency) {
        return res.status(404).json({
          success: false,
          msg: 'Agency not found.'
        })
      }

      // Check if agency is active
      if (agency.operationalStatus === 'deactivated') {
        return res.status(403).json({
          success: false,
          msg: 'Agency is deactivated.'
        })
      }

      // Check emergency access for superadmin
      if (agency.operationalStatus === 'emergency' && req.user.role !== 'superadmin') {
        return res.status(403).json({
          success: false,
          msg: 'Emergency access restricted to super administrators.'
        })
      }

      req.agency = agency
      next()
    } catch (error) {
      console.error('Agency access error:', error)
      res.status(500).json({
        success: false,
        msg: 'Agency access verification failed.'
      })
    }
  }
}

// Middleware for emergency operations
export const requireEmergencyAccess = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      msg: 'Emergency operations require super administrator privileges.'
    })
  }

  // Additional emergency protocols could be added here
  // Such as additional authentication, logging, etc.

  next()
}

// Middleware for classified operations
export const requireClassification = (classification) => {
  return (req, res, next) => {
    const userClearance = req.userClearance || 'none'
    const userLevel = CLEARANCE_LEVELS[userClearance] || 0
    const requiredLevel = CLEARANCE_LEVELS[classification] || 0

    if (userLevel < requiredLevel) {
      return res.status(403).json({
        success: false,
        msg: `Access denied. Classified operation requires: ${classification}`,
        classification: classification,
        userClearance: userClearance
      })
    }

    // Log classified access
    console.log(`CLASSIFIED ACCESS: ${req.user.email} accessed ${classification} operation at ${new Date().toISOString()}`)

    next()
  }
}

// Middleware for national emergency operations
export const requireNationalEmergency = (req, res, next) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({
      success: false,
      msg: 'National emergency operations require super administrator privileges.'
    })
  }

  // Check for additional national emergency protocols
  // This could include checking presidential authorization, etc.

  console.log(`NATIONAL EMERGENCY ACCESS: ${req.user.email} initiated national emergency operation at ${new Date().toISOString()}`)

  next()
}

// Utility function to get required role for permission
const getRequiredRole = (permission) => {
  for (const [role, permissions] of Object.entries(ROLE_PERMISSIONS)) {
    if (permissions.includes(permission)) {
      return role
    }
  }
  return 'unknown'
}

// Middleware to log all government operations
export const logGovernmentOperation = (operation, classification = 'unclassified') => {
  return (req, res, next) => {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user: req.user.email,
      role: req.user.role,
      operation: operation,
      classification: classification,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      endpoint: req.originalUrl,
      method: req.method
    }

    // In production, this should be written to a secure audit log
    console.log('GOVERNMENT AUDIT:', JSON.stringify(logEntry, null, 2))

    // For superadmin operations, also log to agency audit trail
    if (req.agency && ['superadmin'].includes(req.user.role)) {
      req.agency.auditLogs.push({
        action: operation,
        performedBy: req.user._id,
        details: {
          endpoint: req.originalUrl,
          method: req.method,
          classification: classification
        },
        classification: classification
      })
    }

    next()
  }
}

export default {
  verifyGovernmentToken,
  requirePermission,
  requireClearance,
  requireAgencyAccess,
  requireEmergencyAccess,
  requireClassification,
  requireNationalEmergency,
  logGovernmentOperation
}
