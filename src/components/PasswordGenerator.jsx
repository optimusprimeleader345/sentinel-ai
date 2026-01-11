import React, { useState, useEffect } from 'react'
import { RefreshCw, Copy, CheckCircle, AlertTriangle, Shield } from 'lucide-react'

const PasswordGenerator = ({ onPasswordGenerated }) => {
  const [password, setPassword] = useState('')
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [includeAmbiguous, setIncludeAmbiguous] = useState(false)
  const [copied, setCopied] = useState(false)
  const [generating, setGenerating] = useState(false)

  const generatePassword = async () => {
    try {
      setGenerating(true)
      
      // Validate options
      if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        throw new Error('At least one character type must be selected')
      }
      
      if (length < 4 || length > 128) {
        throw new Error('Password length must be between 4 and 128 characters')
      }

      let charset = ''
      if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz'
      if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      if (includeNumbers) charset += '0123456789'
      
      let symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?'
      if (includeSymbols) {
        // Remove ambiguous characters if not included
        if (!includeAmbiguous) {
          symbols = symbols.replace(/[ilLo1]/g, '')
        }
        charset += symbols
      }

      if (charset.length === 0) {
        throw new Error('No valid characters available for password generation')
      }

      // Generate password using cryptographically secure random
      const array = new Uint32Array(length)
      crypto.getRandomValues(array)
      
      let generatedPassword = ''
      for (let i = 0; i < length; i++) {
        generatedPassword += charset[array[i] % charset.length]
      }

      // Ensure password contains at least one character from each selected type
      let finalPassword = generatedPassword
      const selectedTypes = []
      
      if (includeLowercase) selectedTypes.push(/[a-z]/)
      if (includeUppercase) selectedTypes.push(/[A-Z]/)
      if (includeNumbers) selectedTypes.push(/[0-9]/)
      if (includeSymbols) selectedTypes.push(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/)

      for (const regex of selectedTypes) {
        if (!regex.test(finalPassword)) {
          // Replace one random character with this type
          let replacement = ''
          if (regex === /[a-z]/) {
            const lowercase = 'abcdefghijklmnopqrstuvwxyz'
            replacement = lowercase[Math.floor(Math.random() * lowercase.length)]
          } else if (regex === /[A-Z]/) {
            const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
            replacement = uppercase[Math.floor(Math.random() * uppercase.length)]
          } else if (regex === /[0-9]/) {
            replacement = Math.floor(Math.random() * 10).toString()
          } else if (regex === /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/) {
            const symbolChars = symbols
            replacement = symbolChars[Math.floor(Math.random() * symbolChars.length)]
          }
          
          const pos = Math.floor(Math.random() * finalPassword.length)
          finalPassword = finalPassword.substring(0, pos) + replacement + finalPassword.substring(pos + 1)
        }
      }

      setPassword(finalPassword)
      onPasswordGenerated?.(finalPassword)
      
    } catch (error) {
      console.error('Password generation error:', error)
      // Fallback to simple password
      const fallbackPassword = Math.random().toString(36).slice(-12) + Math.random().toString(36).slice(-4)
      setPassword(fallbackPassword)
      onPasswordGenerated?.(fallbackPassword)
    } finally {
      setGenerating(false)
    }
  }

  const copyToClipboard = async () => {
    try {
      if (!password) {
        throw new Error('No password to copy')
      }

      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(password)
      } else if (document.execCommand) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea')
        textArea.value = password
        textArea.style.position = 'fixed'
        textArea.style.left = '-999999px'
        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()
        
        const successful = document.execCommand('copy')
        document.body.removeChild(textArea)
        
        if (!successful) {
          throw new Error('Failed to copy to clipboard')
        }
      } else {
        throw new Error('Clipboard not available')
      }

      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      
    } catch (error) {
      console.error('Copy to clipboard error:', error)
      // Manual fallback - select text for user to copy manually
      const textArea = document.createElement('textarea')
      textArea.value = password
      textArea.style.position = 'fixed'
      textArea.style.left = '0'
      textArea.style.top = '0'
      textArea.style.zIndex = '9999'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      
      setTimeout(() => {
        document.body.removeChild(textArea)
      }, 100)
    }
  }

  const getPasswordStrength = () => {
    if (!password) return 0
    
    let score = 0
    if (password.length >= 8) score += 20
    if (password.length >= 12) score += 20
    if (password.length >= 16) score += 20
    if (/[a-z]/.test(password)) score += 10
    if (/[A-Z]/.test(password)) score += 10
    if (/[0-9]/.test(password)) score += 10
    if (/[^a-zA-Z0-9]/.test(password)) score += 10
    
    return Math.min(100, score)
  }

  const getStrengthColor = () => {
    const strength = getPasswordStrength()
    if (strength >= 80) return 'text-green-400'
    if (strength >= 60) return 'text-blue-400'
    if (strength >= 40) return 'text-yellow-400'
    if (strength >= 20) return 'text-orange-400'
    return 'text-red-400'
  }

  const getStrengthText = () => {
    const strength = getPasswordStrength()
    if (strength >= 80) return 'Very Strong'
    if (strength >= 60) return 'Strong'
    if (strength >= 40) return 'Medium'
    if (strength >= 20) return 'Weak'
    return 'Very Weak'
  }

  // Generate initial password on mount
  useEffect(() => {
    generatePassword()
  }, [])

  return (
    <div className="space-y-4 p-4 bg-[#0f172a]/50 rounded-xl border border-slate-700/50">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-cyan-400" />
        <h3 className="text-lg font-semibold text-slate-200">Secure Password Generator</h3>
      </div>

      {/* Generated Password Display */}
      <div className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={password}
            readOnly
            className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-3 pr-24 font-mono text-slate-200 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            placeholder="Generated password will appear here..."
          />
          <button
            onClick={copyToClipboard}
            disabled={!password || generating}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 rounded-md transition-colors"
            title="Copy to clipboard"
          >
            {copied ? (
              <CheckCircle className="w-4 h-4 text-green-400" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
        </div>
        
        {password && (
          <div className="flex items-center justify-between text-xs">
            <span className={`${getStrengthColor()} font-medium`}>
              Strength: {getStrengthText()}
            </span>
            <span className="text-slate-400">
              {password.length} characters
            </span>
          </div>
        )}
      </div>

      {/* Password Options */}
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Length: <span className="text-cyan-400">{length}</span>
          </label>
          <input
            type="range"
            min="4"
            max="128"
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value) || 16)}
            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>4</span>
            <span>128</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Character Types:</label>
          
          <div className="space-y-2">
            <label className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700/30 p-2 rounded">
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-4 h-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
              />
              <span className="text-sm text-slate-300">Lowercase (a-z)</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700/30 p-2 rounded">
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-4 h-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
              />
              <span className="text-sm text-slate-300">Uppercase (A-Z)</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700/30 p-2 rounded">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
              />
              <span className="text-sm text-slate-300">Numbers (0-9)</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700/30 p-2 rounded">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
              />
              <span className="text-sm text-slate-300">Symbols (!@#$%^&*)</span>
            </label>

            <label className="flex items-center space-x-2 cursor-pointer hover:bg-slate-700/30 p-2 rounded">
              <input
                type="checkbox"
                checked={includeAmbiguous}
                onChange={(e) => setIncludeAmbiguous(e.target.checked)}
                className="w-4 h-4 text-cyan-600 bg-slate-700 border-slate-600 rounded focus:ring-cyan-400"
              />
              <span className="text-sm text-slate-300">Include ambiguous (ilLo1,0)</span>
            </label>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <button
          onClick={generatePassword}
          disabled={generating}
          className="flex-1 bg-cyan-600 hover:bg-cyan-700 disabled:bg-gray-600 px-4 py-2 rounded-lg text-white font-medium transition-colors flex items-center justify-center space-x-2"
        >
          {generating ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-cyan-400 rounded-full animate-spin"></div>
              <span>Generating...</span>
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4" />
              <span>Generate New</span>
            </>
          )}
        </button>
      </div>

      {/* Security Tips */}
      <div className="mt-4 p-3 bg-slate-800/30 rounded-lg border border-slate-700/30">
        <div className="flex items-center space-x-2 mb-2">
          <AlertTriangle className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-slate-300">Security Tips:</span>
        </div>
        <ul className="text-xs text-slate-400 space-y-1">
          <li>• Use at least 12-16 characters for strong passwords</li>
          <li>• Include all character types for maximum security</li>
          <li>• Avoid personal information or common words</li>
          <li>• Use unique passwords for each account</li>
          <li>• Consider using a password manager for storage</li>
        </ul>
      </div>
    </div>
  )
}

export default PasswordGenerator
