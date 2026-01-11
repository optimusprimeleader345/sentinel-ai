import axios from 'axios';
import ipRegex from 'ip-regex';

/**
 * IP Reputation Scanner Controller
 * Integrates with AbuseIPDB API for real-time threat intelligence
 */

// AbuseIPDB categories mapping
const ABUSEIPDB_CATEGORIES = {
  3: "Fraud Orders",
  4: "DDoS Attack",
  5: "FTP Brute-Force",
  6: "Ping of Death",
  7: "Phishing",
  8: "Fraud VoIP",
  9: "Open Proxy",
  10: "Web Spam",
  11: "Email Spam",
  12: "Blog Spam",
  13: "VPN IP",
  14: "Port Scan",
  15: "Hacking",
  16: "SQL Injection",
  17: "Spoofing",
  18: "Brute Force",
  19: "Bad Web Bot",
  20: "Exploited Host",
  21: "Web App Attack",
  22: "SSH",
  23: "IoT Targeted"
};

class IPController {
  /**
   * Validate IP address format
   */
  validateIP(ip) {
    if (!ip || typeof ip !== 'string') {
      return { valid: false, error: 'IP address is required' };
    }

    const trimmed = ip.trim();

    if (!ipRegex({ exact: true }).test(trimmed)) {
      return { valid: false, error: 'Invalid IP address format' };
    }

    // Check for private/reserved IPs
    const parts = trimmed.split('.').map(p => parseInt(p));
    if (
      (parts[0] === 10) ||
      (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
      (parts[0] === 192 && parts[1] === 168) ||
      (parts[0] === 127) ||
      (parts[0] === 0) ||
      (parts[0] === 255 && parts[1] === 255 && parts[2] === 255 && parts[3] === 255)
    ) {
      return { valid: false, error: 'Private or reserved IP addresses are not supported' };
    }

    return { valid: true, ip: trimmed };
  }

  /**
   * Calculate risk level based on abuse confidence and other factors
   */
  calculateRiskLevel(abuseConfidence, categories = [], isProxy = false, botnetSuspicion = false) {
    let score = abuseConfidence;

    // Add points for proxy detection
    if (isProxy) score += 20;

    // Add points for botnet-related categories
    if (categories.some(catId => [3, 4, 14, 18, 22, 23].includes(catId))) {
      score += 15;
    }

    // Add points for high-risk categories
    if (categories.some(catId => [7, 15, 16, 21].includes(catId))) {
      score += 25;
    }

    // Risk level determination
    if (score >= 80) return 'HIGH';
    if (score >= 40) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Generate security recommendations based on risk assessment
   */
  generateSuggestions(riskLevel, categories = [], countryCode = '', isp = '') {
    const suggestions = [];

    if (riskLevel === 'HIGH') {
      suggestions.push('🚫 IMMEDIATE ACTION REQUIRED: Block this IP in firewall');
      suggestions.push('🛡️ This IP has been reported for critical threats');
      suggestions.push('🔍 Conduct forensic investigation of all related logs');
    }

    if (categories.includes(9)) {
      suggestions.push('🌐 Open Proxy detected - do not trust connections from this IP');
    }

    if (categories.includes(13)) {
      suggestions.push('🕵️ VPN/TOR IP detected - may be attempting to hide origin');
    }

    if (categories.some(catId => [3, 11, 12, 7].includes(catId))) {
      suggestions.push('📧 Known spam/phishing source - check email filters');
    }

    if (categories.some(catId => [5, 14, 22, 18].includes(catId))) {
      suggestions.push('🔐 Brute force attempts detected - strengthen SSH/FTP security');
    }

    if (riskLevel === 'MEDIUM') {
      suggestions.push('⚠️ MONITOR: This IP shows suspicious activity');
    }

    if (riskLevel === 'LOW' && categories.length === 0) {
      suggestions.push('✅ This IP appears clean - no known threats detected');
    }

    return suggestions;
  }

  /**
   * Scan IP using AbuseIPDB API (Primary Source)
   */
  async scanWithAbuseIPDB(ip) {
    const apiKey = process.env.ABUSE_IPDB_KEY;

    if (!apiKey) {
      throw new Error('AbuseIPDB API key not configured');
    }

    try {
      const response = await axios.get(`https://api.abuseipdb.com/api/v2/check`, {
        params: {
          ipAddress: ip,
          verbose: true,
          maxAgeInDays: 90
        },
        headers: {
          'Key': apiKey,
          'Accept': 'application/json',
          'User-Agent': 'SentinelAI-IPScanner/1.0'
        },
        timeout: 10000 // 10 second timeout
      });

      if (response.status !== 200) {
        throw new Error(`AbuseIPDB API returned ${response.status}`);
      }

      return response.data.data;
    } catch (error) {
      console.error('AbuseIPDB API Error:', error.message);
      throw new Error(`AbuseIPDB API Error: ${error.message}`);
    }
  }

  /**
   * Enhanced IP scanning with real threat intelligence
   */
  async scanIP(req, res) {
    try {
      const { ip } = req.body;

      // Validate IP
      const validation = this.validateIP(ip);
      if (!validation.valid) {
        return res.status(400).json({
          success: false,
          error: validation.error
        });
      }

      const validIP = validation.ip;

      // Query AbuseIPDB (primary source)
      const abuseData = await this.scanWithAbuseIPDB(validIP);

      // Process results
      const categories = abuseData.categories || [];
      const categoryNames = categories.map(catId => ABUSEIPDB_CATEGORIES[catId] || `Category ${catId}`);

      // Calculate risk level
      const riskLevel = this.calculateRiskLevel(
        abuseData.abuseConfidenceScore || 0,
        categories,
        abuseData.usageType === 'Data Center/Web Hosting/Transit' ||
        categories.includes(9), // Open proxy
        categories.some(catId => [4, 15, 20].includes(catId)) // Botnet indicators
      );

      // Generate suggestions
      const suggestions = this.generateSuggestions(riskLevel, categories, abuseData.countryCode, abuseData.isp);

      // Format response
      const result = {
        ip: validIP,
        isMalicious: riskLevel !== 'LOW',
        abuseConfidence: abuseData.abuseConfidenceScore || 0,
        country: abuseData.countryCode || 'Unknown',
        isp: abuseData.isp || 'Unknown',
        domain: abuseData.domain || 'Unknown',
        usageType: abuseData.usageType || 'Unknown',
        totalReports: abuseData.totalReports || 0,
        lastReport: abuseData.lastReportedAt || null,
        reports: abuseData.reports || [],
        categories: categoryNames,
        blacklistHits: categories.map(catId => ({
          category: catId,
          name: ABUSEIPDB_CATEGORIES[catId] || `Category ${catId}`
        })),
        riskLevel,
        suggestions,
        lastChecked: new Date().toISOString(),
        confidence: abuseData.abuseConfidenceScore || 0
      };

      res.json({
        success: true,
        data: result,
        scanned: true,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      console.error('IP Scan Error:', error);

      // Return error response
      res.status(500).json({
        success: false,
        error: error.message || 'Failed to scan IP address',
        timestamp: new Date().toISOString()
      });
    }
  }

  /**
   * Get IP scanning history/report
   */
  async getIPReports(req, res) {
    try {
      // This would typically query a database for scan history
      // For now, return empty array
      res.json({
        success: true,
        data: [],
        total: 0,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error('Get IP Reports Error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to retrieve IP reports'
      });
    }
  }
}

export default new IPController();
