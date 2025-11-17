import crypto from 'crypto'

const ALGORITHM = 'aes-256-cbc'
const SECRET_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here!!'
const IV_LENGTH = 16

export const encrypt = (text) => {
  try {
    const iv = crypto.randomBytes(IV_LENGTH)
    const cipher = crypto.createCipheriv(ALGORITHM, Buffer.from(SECRET_KEY.slice(0, 32)), iv)
    let encrypted = cipher.update(text, 'utf8', 'hex')
    encrypted += cipher.final('hex')
    return iv.toString('hex') + ':' + encrypted
  } catch (error) {
    console.error('Encryption error:', error)
    return text // Fallback to plain text if encryption fails
  }
}

export const decrypt = (encryptedText) => {
  try {
    const parts = encryptedText.split(':')
    const iv = Buffer.from(parts.shift(), 'hex')
    const encrypted = parts.join(':')
    const decipher = crypto.createDecipheriv(ALGORITHM, Buffer.from(SECRET_KEY.slice(0, 32)), iv)
    let decrypted = decipher.update(encrypted, 'hex', 'utf8')
    decrypted += decipher.final('utf8')
    return decrypted
  } catch (error) {
    console.error('Decryption error:', error)
    return encryptedText // Fallback if decryption fails
  }
}

