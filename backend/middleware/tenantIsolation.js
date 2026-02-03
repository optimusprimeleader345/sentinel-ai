import Organization from '../models/Organization.js'
import User from '../models/User.js'

/**
 * Tenant Isolation Middleware
 * Ensures all data queries are scoped to the user's organization
 */

// Middleware to attach organization to request
export const attachOrganization = async (req, res, next) => {
  try {
    // If user is authenticated, get their organization
    if (req.user && req.user.userId) {
      const user = await User.findById(req.user.userId).select('organization organizationRole')
      
      if (user && user.organization) {
        const org = await Organization.findById(user.organization)
        
        if (org && org.isActive && org.isSubscriptionActive()) {
          req.organization = org
          req.organizationId = org._id
          req.organizationRole = user.organizationRole
        } else {
          // Allow access but mark as inactive
          req.organization = org
          req.organizationId = org?._id
          req.organizationRole = user.organizationRole
        }
      }
    }
    
    next()
  } catch (error) {
    console.error('Attach organization error:', error)
    next(error)
  }
}

// Middleware to require organization
export const requireOrganization = async (req, res, next) => {
  if (!req.organization || !req.organizationId) {
    return res.status(403).json({
      success: false,
      error: 'Organization access required'
    })
  }
  next()
}

// Middleware to check organization role
export const requireOrganizationRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.organizationRole) {
      return res.status(403).json({
        success: false,
        error: 'Organization role required'
      })
    }
    
    if (!allowedRoles.includes(req.organizationRole)) {
      return res.status(403).json({
        success: false,
        error: `Insufficient organization permissions. Required: ${allowedRoles.join(', ')}`
      })
    }
    
    next()
  }
}

// Helper function to add organization filter to queries
export const addOrganizationFilter = (query, organizationId) => {
  if (!organizationId) return query
  
  return {
    ...query,
    organization: organizationId
  }
}

// Helper function to ensure organization isolation in queries
export const ensureOrganizationIsolation = (req, query = {}) => {
  // If no organization, return query as-is (backward compatible)
  if (!req.organizationId) {
    return query
  }
  
  return {
    ...query,
    organization: req.organizationId
  }
}

export default {
  attachOrganization,
  requireOrganization,
  requireOrganizationRole,
  addOrganizationFilter,
  ensureOrganizationIsolation
}
