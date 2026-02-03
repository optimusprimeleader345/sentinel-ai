import { body, param, query, validationResult } from 'express-validator'

// Validation error handler middleware
export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value
      }))
    })
  }
  next()
}

// Common validation rules
export const validateEmail = [
  body('email')
    .isEmail()
    .withMessage('Valid email address is required')
    .normalizeEmail()
    .trim(),
  handleValidationErrors
]

export const validatePassword = [
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  handleValidationErrors
]

export const validateLogin = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .trim(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 }),
  handleValidationErrors
]

export const validateRegister = [
  body('email')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .trim(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  body('username')
    .trim()
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters')
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage('Username can only contain letters, numbers, and underscores'),
  body('firstName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('First name is required'),
  body('lastName')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Last name is required'),
  handleValidationErrors
]

export const validateObjectId = [
  param('id')
    .isMongoId()
    .withMessage('Invalid ID format'),
  handleValidationErrors
]

export const validateURL = [
  body('url')
    .isURL({ protocols: ['http', 'https'], require_protocol: true })
    .withMessage('Valid URL with http or https protocol is required')
    .trim(),
  handleValidationErrors
]

export const validateThreatData = [
  body('type')
    .isIn(['malware', 'phishing', 'ddos', 'ransomware', 'data-breach', 'insider-threat', 'zero-day', 'apt', 'supply-chain', 'web-attack'])
    .withMessage('Invalid threat type'),
  body('severity')
    .optional()
    .isIn(['critical', 'high', 'medium', 'low', 'info'])
    .withMessage('Invalid severity level'),
  body('indicator.value')
    .notEmpty()
    .withMessage('Indicator value is required')
    .trim(),
  body('indicator.type')
    .optional()
    .isIn(['ip', 'domain', 'url', 'hash', 'email', 'signature', 'ioc'])
    .withMessage('Invalid indicator type'),
  handleValidationErrors
]

export const validateScanRequest = [
  body('url')
    .optional()
    .isURL({ protocols: ['http', 'https'] })
    .withMessage('Valid URL is required'),
  body('email')
    .optional()
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail(),
  body('targets')
    .optional()
    .isArray({ min: 1 })
    .withMessage('Targets must be a non-empty array'),
  handleValidationErrors
]

export const validateAIRequest = [
  body('input')
    .optional()
    .trim()
    .isLength({ min: 1, max: 10000 })
    .withMessage('Input must be between 1 and 10000 characters'),
  body('message')
    .optional()
    .trim()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Message must be between 1 and 2000 characters'),
  handleValidationErrors
]

export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
  handleValidationErrors
]
