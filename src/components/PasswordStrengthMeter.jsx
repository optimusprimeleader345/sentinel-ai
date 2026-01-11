import React, { useState, useEffect } from 'react'
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

const PasswordStrengthMeter = ({ password, onStrengthChange }) => {
  const [strength, setStrength] = useState(0)
  const [feedback, setFeedback] = useState([])
  const [score, setScore] = useState(0)

  useEffect(() => {
    try {
      if (!password) {
        setStrength(0)
        setScore(0)
        setFeedback([])
        onStrengthChange?.(0, [])
        return
      }

      const analysis = analyzePassword(password)
      setStrength(analysis.strength)
      setScore(analysis.score)
      setFeedback(analysis.feedback)
      onStrengthChange?.(analysis.score, analysis.feedback)
    } catch (error) {
      console.error('PasswordStrengthMeter useEffect error:', error)
      setStrength(0)
      setScore(0)
      setFeedback(['Error analyzing password'])
    }
  }, [password, onStrengthChange])

  const analyzePassword = (pwd) => {
    let score = 0
    let strength = 0
    let feedback = []

    try {
      if (!pwd || typeof pwd !== 'string') {
        return { strength: 0, score: 0, feedback: ['Invalid password'] }
      }

      // Length check
      if (pwd.length < 8) {
        feedback.push('Password should be at least 8 characters')
      } else {
        score += 20
        if (pwd.length >= 12) score += 10
        if (pwd.length >= 16) score += 10
      }

      // Character variety checks
      if (/[a-z]/.test(pwd)) {
        score += 15
      } else {
        feedback.push('Include lowercase letters')
      }

      if (/[A-Z]/.test(pwd)) {
        score += 15
      } else {
        feedback.push('Include uppercase letters')
      }

      if (/[0-9]/.test(pwd)) {
        score += 15
      } else {
        feedback.push('Include numbers')
      }

      if (/[^a-zA-Z0-9]/.test(pwd)) {
        score += 15
      } else {
        feedback.push('Include special characters')
      }

      // Pattern checks
      if (/(.)\1{2,}/.test(pwd)) {
        score -= 10
        feedback.push('Avoid repeated characters')
      }

      if (/(abc|123|qwe|asd)/i.test(pwd)) {
        score -= 10
        feedback.push('Avoid common sequences')
      }

      // Common password check
      const commonPasswords = ['password', '123456', 'qwerty', 'admin', 'letmein']
      if (commonPasswords.some(common => pwd.toLowerCase().includes(common))) {
        score -= 20
        feedback.push('Avoid common password patterns')
      }

      // Calculate strength level
      score = Math.max(0, Math.min(100, score))
      
      if (score >= 80) strength = 4 // Very Strong
      else if (score >= 60) strength = 3 // Strong
      else if (score >= 40) strength = 2 // Medium
      else if (score >= 20) strength = 1 // Weak
      else strength = 0 // Very Weak

    } catch (error) {
      console.error('Password analysis error:', error)
      feedback.push('Error analyzing password')
      score = 0
      strength = 0
    }

    return { strength, score, feedback }
  }

  const getStrengthColor = () => {
    try {
      switch (strength) {
        case 4: return 'text-green-400'
        case 3: return 'text-blue-400'
        case 2: return 'text-yellow-400'
        case 1: return 'text-orange-400'
        case 0: return 'text-red-400'
        default: return 'text-gray-400'
      }
    } catch (error) {
      return 'text-gray-400'
    }
  }

  const getStrengthBgColor = () => {
    try {
      switch (strength) {
        case 4: return 'bg-green-500'
        case 3: return 'bg-blue-500'
        case 2: return 'bg-yellow-500'
        case 1: return 'bg-orange-500'
        case 0: return 'bg-red-500'
        default: return 'bg-gray-500'
      }
    } catch (error) {
      return 'bg-gray-500'
    }
  }

  const getStrengthText = () => {
    try {
      switch (strength) {
        case 4: return 'Very Strong'
        case 3: return 'Strong'
        case 2: return 'Medium'
        case 1: return 'Weak'
        case 0: return 'Very Weak'
        default: return 'Unknown'
      }
    } catch (error) {
      return 'Unknown'
    }
  }

  const getStrengthIcon = () => {
    try {
      switch (strength) {
        case 4: return <CheckCircle className="w-4 h-4" />
        case 3: return <CheckCircle className="w-4 h-4" />
        case 2: return <AlertTriangle className="w-4 h-4" />
        case 1: return <AlertTriangle className="w-4 h-4" />
        case 0: return <XCircle className="w-4 h-4" />
        default: return <Shield className="w-4 h-4" />
      }
    } catch (error) {
      return <Shield className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-2">
      {/* Strength Bar */}
      <div className="flex items-center space-x-3">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className={`text-xs font-medium ${getStrengthColor()}`}>
              Password Strength: {getStrengthText()}
            </span>
            <span className={`text-xs ${getStrengthColor()}`}>
              {score}/100
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full ${getStrengthBgColor()} transition-all duration-300 ease-out`}
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
        <div className={`flex items-center ${getStrengthColor()}`}>
          {getStrengthIcon()}
        </div>
      </div>

      {/* Feedback Messages */}
      {feedback && feedback.length > 0 && (
        <div className="space-y-1">
          {feedback.map((message, index) => (
            <div key={index} className="flex items-center space-x-2 text-xs text-gray-400">
              <AlertTriangle className="w-3 h-3 text-yellow-400" />
              <span>{message}</span>
            </div>
          ))}
        </div>
      )}

      {/* Password Requirements */}
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
        <div className={`flex items-center space-x-1 ${password && password.length >= 8 ? 'text-green-400' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${password && password.length >= 8 ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span>8+ characters</span>
        </div>
        <div className={`flex items-center space-x-1 ${password && /[a-z]/.test(password) ? 'text-green-400' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${password && /[a-z]/.test(password) ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span>Lowercase</span>
        </div>
        <div className={`flex items-center space-x-1 ${password && /[A-Z]/.test(password) ? 'text-green-400' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${password && /[A-Z]/.test(password) ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span>Uppercase</span>
        </div>
        <div className={`flex items-center space-x-1 ${password && /[0-9]/.test(password) ? 'text-green-400' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${password && /[0-9]/.test(password) ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span>Numbers</span>
        </div>
        <div className={`flex items-center space-x-1 ${password && /[^a-zA-Z0-9]/.test(password) ? 'text-green-400' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${password && /[^a-zA-Z0-9]/.test(password) ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span>Special chars</span>
        </div>
        <div className={`flex items-center space-x-1 ${password && password.length >= 12 ? 'text-green-400' : ''}`}>
          <div className={`w-2 h-2 rounded-full ${password && password.length >= 12 ? 'bg-green-400' : 'bg-gray-600'}`} />
          <span>12+ recommended</span>
        </div>
      </div>
    </div>
  )
}

export default PasswordStrengthMeter
