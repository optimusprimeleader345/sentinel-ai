/**
 * API Versioning Middleware
 * Standardizes API versioning across all routes
 */

// API version configuration
const API_VERSIONS = {
  v1: {
    prefix: '/api/v1',
    deprecated: false,
    sunsetDate: null, // ISO date string when version will be deprecated
  },
  // Future versions can be added here
  // v2: {
  //   prefix: '/api/v2',
  //   deprecated: false,
  //   sunsetDate: null,
  // }
}

// Current API version
export const CURRENT_VERSION = 'v1'
export const CURRENT_PREFIX = API_VERSIONS[CURRENT_VERSION].prefix

/**
 * API Version middleware
 * Adds version information to request and response
 */
export const apiVersioning = (req, res, next) => {
  // Extract version from URL
  const versionMatch = req.path.match(/^\/api\/(v\d+)\//)
  const version = versionMatch ? versionMatch[1] : CURRENT_VERSION

  // Add version info to request
  req.apiVersion = version
  req.apiPrefix = API_VERSIONS[version]?.prefix || `/api/${version}`

  // Add version headers to response
  res.setHeader('API-Version', version)
  res.setHeader('API-Current-Version', CURRENT_VERSION)
  
  // Add deprecation warning if using deprecated version
  if (API_VERSIONS[version]?.deprecated) {
    res.setHeader('API-Deprecated', 'true')
    if (API_VERSIONS[version]?.sunsetDate) {
      res.setHeader('API-Sunset-Date', API_VERSIONS[version].sunsetDate)
    }
  }

  next()
}

/**
 * Version check middleware
 * Ensures only supported versions are used
 */
export const validateApiVersion = (req, res, next) => {
  const version = req.apiVersion || CURRENT_VERSION

  if (!API_VERSIONS[version]) {
    return res.status(400).json({
      success: false,
      error: 'Unsupported API version',
      requestedVersion: version,
      supportedVersions: Object.keys(API_VERSIONS),
      currentVersion: CURRENT_VERSION,
      message: `API version '${version}' is not supported. Please use ${CURRENT_VERSION}.`
    })
  }

  next()
}

/**
 * Get API version info endpoint handler
 */
export const getApiVersionInfo = (req, res) => {
  res.json({
    success: true,
    currentVersion: CURRENT_VERSION,
    supportedVersions: Object.keys(API_VERSIONS).map(v => ({
      version: v,
      prefix: API_VERSIONS[v].prefix,
      deprecated: API_VERSIONS[v].deprecated,
      sunsetDate: API_VERSIONS[v].sunsetDate,
    })),
    documentation: {
      baseUrl: `${req.protocol}://${req.get('host')}${CURRENT_PREFIX}`,
      changelog: `${req.protocol}://${req.get('host')}/api/docs/changelog`,
    }
  })
}

export default {
  apiVersioning,
  validateApiVersion,
  getApiVersionInfo,
  CURRENT_VERSION,
  CURRENT_PREFIX,
  API_VERSIONS
}
