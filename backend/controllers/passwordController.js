import crypto from 'crypto';
import axios from 'axios';

// Password Breach Controller using HaveIBeenPwned API
class PasswordController {
  /**
   * Validate password input
   */
  validatePassword(password) {
    if (!password || typeof password !== 'string') {
      return { valid: false, error: 'Password is required' };
    }

    // Basic validation - minimum length for security
    if (password.length < 1) {
      return { valid: false, error: 'Password cannot be empty' };
    }

    // Check for extremely long passwords (API limitation)
    if (password.length > 256) {
      return { valid: false, error: 'Password is too long (max 256 characters)' };
    }

    return { valid: true, password: password.trim() };
  }

  /**
   * Calculate SHA1 hash
   */
  hashPassword(password) {
    return crypto.createHash('sha1').update(password, 'utf8').digest('hex').toUpperCase();
  }

  /**
   * Check password against HaveIBeenPwned database using K-Anonymity
   */
  async checkHaveIBeenPwned(hashPrefix) {
    try {
      const response = await axios.get(
        `https://api.pwnedpasswords.com/range/${hashPrefix}`,
        {
          timeout: 10000,
          headers: {
            'User-Agent': 'SentinelAI-PasswordChecker/1.0'
          }
        }
      );

      return response.data;
    } catch (error) {
      console.error('HaveIBeenPwned API Error:', error.message);
      throw new Error(`Breach database unavailable: ${error.message}`);
    }
  }

  /**
   * Calculate risk level based on breach count
   */
  calculateRiskLevel(breachCount) {
    if (breachCount > 1000) return 'HIGH';
    if (breachCount > 100) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Generate security suggestions based on breach analysis
   */
  generateSuggestions(password, breachCount, riskLevel) {
    const suggestions = [];
    const passwordLength = password.length;

    // Breach-specific suggestions
    if (breachCount > 0) {
      suggestions.push('🔴 Change this password immediately - it has been compromised');
      suggestions.push(`📊 This password appears in ${breachCount.toLocaleString()} breach records`);

      if (riskLevel === 'HIGH') {
        suggestions.push('🚨 HIGH RISK: This password is widely known and heavily exploited');
      } else if (riskLevel === 'MEDIUM') {
        suggestions.push('⚠️ MEDIUM RISK: Password seen in multiple security breaches');
      }
    } else {
      suggestions.push('✅ This password was not found in any known data breaches');
    }

    // Password strength suggestions
    if (passwordLength < 8) {
      suggestions.push('📏 Use at least 8 characters for better security');
    } else if (passwordLength < 12) {
      suggestions.push('💪 Consider 12+ characters for maximum protection');
    }

    // General password advice
    suggestions.push('🔐 Use a unique password for each account');
    suggestions.push('⭐ Consider using a password manager');
    suggestions.push('🔑 Enable two-factor authentication when available');

    return suggestions;
  }

  /**
   * Check if password has been pwned
   */
  async checkPasswordBreach(req, res) {
    try {
      const { password } = req.body;

      // Validate input
      const validation = this.validatePassword(password);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: validation.error
        });
      }

      const validPassword = validation.password;

      // Hash the password and split into prefix and suffix
      const fullHash = this.hashPassword(validPassword);
      const hashPrefix = fullHash.substring(0, 5);
      const hashSuffix = fullHash.substring(5);

      // Query HaveIBeenPwned with K-Anonymity (only first 5 chars)
      const pwnedResponse = await this.checkHaveIBeenPwned(hashPrefix);

      // Parse the response and check for our hash suffix
      let breachCount = 0;
      const lines = pwnedResponse.trim().split('\n');

      for (const line of lines) {
        const [suffix, count] = line.split(':');
        if (suffix === hashSuffix) {
          breachCount = parseInt(count, 10);
          break;
        }
      }

      // Calculate risk level
      const riskLevel = this.calculateRiskLevel(breachCount);

      // Generate suggestions
      const suggestions = this.generateSuggestions(validPassword, breachCount, riskLevel);

      // Return response
      const result = {
        passwordPwned: breachCount > 0,
        breachCount,
        riskLevel,
        suggestions,
        hashPrefix, // For transparency (not the full hash)
        checkedAt: new Date().toISOString()
      };

      res.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('Password Breach Check Error:', error);

      res.status(500).json({
        success: false,
        error: error.message || 'Failed to check password security',
        data: {
          passwordPwned: null,
          breachCount: -1,
          riskLevel: 'UNKNOWN',
          suggestions: ['Unable to check password against breach database']
        },
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Health check for password breach checker
   */
  async getHealth(req, res) {
    try {
      // Try a test query to verify API connectivity
      const testResponse = await axios.get('https://api.pwnedpasswords.com/range/00000', {
        timeout: 5000,
        headers: {
          'User-Agent': 'SentinelAI-PasswordChecker/1.0'
        }
      });

      res.json({
        service: 'Password Breach Checker',
        status: 'operational',
        provider: 'HaveIBeenPwned',
        lastTested: new Date().toISOString(),
        apiConnectivity: true
      });
    } catch (error) {
      res.status(503).json({
        service: 'Password Breach Checker',
        status: 'degraded',
        provider: 'HaveIBeenPwned',
        apiConnectivity: false,
        error: error.message
      });
    }
  }
}

export default new PasswordController();
