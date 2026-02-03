import jwt from 'jsonwebtoken'

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization

    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123')
      req.user = decoded
      
      // Organization info is already in JWT if user has one
      if (decoded.organizationId) {
        req.user.organizationId = decoded.organizationId
        req.user.organizationRole = decoded.organizationRole
      }
      
      next()
    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error in authentication' })
  }
}

// Optional middleware for routes that work with or without auth
export const optionalAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123')
        req.user = decoded
        
        // Organization info is already in JWT if user has one
        if (decoded.organizationId) {
          req.user.organizationId = decoded.organizationId
          req.user.organizationRole = decoded.organizationRole
        }
      } catch (error) {
        // Continue without user
      }
    }
    next()
  } catch (error) {
    next()
  }
}

