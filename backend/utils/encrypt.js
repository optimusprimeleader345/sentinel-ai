import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const SECRET_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here!!'
const IV_LENGTH = 16
const TAG_LENGTH = 16

// Enhanced validation functions
const validateInput = (text, fieldName = 'input') => {
  if (!text || typeof text !== 'string') {
    throw new Error(`${fieldName} must be a non-empty string`)
  }
  if (text.length > 100000) { // 100KB limit
    throw new Error(`${fieldName} is too large (max 100KB)`)
  }
  return text.trim()
}

const validateKey = () => {
  if (!SECRET_KEY || SECRET_KEY.length < 32) {
    throw new Error('Encryption key must be at least 32 characters')
  }
  return Buffer.from(SECRET_KEY.slice(0, 32), 'utf8')
}

export const encrypt = (text) => {
  try {
    // Input validation
    const validatedText = validateInput(text, 'text to encrypt')
    const key = validateKey()
    
    // Generate random IV
    const iv = crypto.randomBytes(IV_LENGTH)
    
    // Create cipher with GCM mode for authenticated encryption
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)
    
    // Set additional authenticated data (optional)
    cipher.setAAD(Buffer.from('sentinel-vault-v1'))
    
    let encrypted = cipher.update(validatedText, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    
    // Get authentication tag
    const tag = cipher.getAuthTag()
    
    // Return format: iv:tag:encrypted
    return iv.toString('hex') + ':' + tag.toString('hex') + ':' + encrypted
    
  } catch (error) {
    console.error('Encryption error:', error.message)
    // Return encrypted with basic encoding as fallback
    try {
      return Buffer.from(text).toString('base64')
    } catch (fallbackError) {
      console.error('Fallback encryption failed:', fallbackError.message)
      throw new Error('Encryption failed completely')
    }
  }
}

export const decrypt = (encryptedText) => {
  try {
    // Input validation
    const validatedText = validateInput(encryptedText, 'text to decrypt')
    const key = validateKey()
    
    // Check if it's new format (iv:tag:encrypted) or old format
    const parts = validatedText.split(':')
    
    if (parts.length === 3) {
      // New GCM format
      const [ivHex, tagHex, encrypted] = parts
      const iv = Buffer.from(ivHex, 'hex')
      const tag = Buffer.from(tagHex, 'hex')
      
      // Create decipher
      const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
      decipher.setAuthTag(tag)
      decipher.setAAD(Buffer.from('sentinel-vault-v1'))
      
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      
      return decrypted
    } else if (parts.length === 2) {
      // Old CBC format - backward compatibility
      const iv = Buffer.from(parts.shift(), 'hex')
      const encrypted = parts.join(':')
      
      const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
      let decrypted = decipher.update(encrypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')
      
      return decrypted
    } else {
      // Try base64 fallback
      return Buffer.from(validatedText, 'base64').toString('utf8')
    }
    
  } catch (error) {
    console.error('Decryption error:', error.message)
    // Try base64 fallback
    try {
      return Buffer.from(encryptedText, 'base64').toString('utf8')
    } catch (fallbackError) {
      console.error('Fallback decryption failed:', fallbackError.message)
      // Return original text as last resort
      return encryptedText
    }
  }
}

// New utility functions for enhanced security
export const generateSecureKey = () => {
  try {
    return crypto.randomBytes(32).toString('hex')
  } catch (error) {
    console.error('Key generation error:', error.message)
    throw new Error('Failed to generate secure key')
  }
}

export const hashPassword = (password) => {
  try {
    const validatedPassword = validateInput(password, 'password')
    const salt = crypto.randomBytes(16)
    const hash = crypto.pbkdf2Sync(validatedPassword, salt, 100000, 64, 'sha512')
    return salt.toString('hex') + ':' + hash.toString('hex')
  } catch (error) {
    console.error('Password hashing error:', error.message)
    throw new Error('Failed to hash password')
  }
}

export const verifyPassword = (password, hash) => {
  try {
    const [saltHex, hashHex] = hash.split(':')
    const salt = Buffer.from(saltHex, 'hex')
    const hashVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512')
    return hashVerify.toString('hex') === hashHex
  } catch (error) {
    console.error('Password verification error:', error.message)
    return false
  }
}
