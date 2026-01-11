import Scan from '../models/Scan.js'
import { scanURL } from '../utils/urlScanner.js'
import { logIncident } from '../utils/incidentLogger.js'

/**
 * URL scanning controller - matches user's specification of /api/url/scan
 */
export const scanURLController = async (req, res) => {
  try {
    const { url } = req.body
    const userId = req.user?.userId

    if (!url) {
      return res.status(400).json({
        message: 'URL is required',
        error: 'Missing URL parameter'
      })
    }

    // Validate URL format
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return res.status(400).json({
        message: 'Invalid URL format. URL must start with http:// or https://',
        error: 'Invalid URL format'
      })
    }

    // Use real URL scanner
    const result = await scanURL(url)

    // Determine status for database
    const status = result.isSafe ? 'safe' : (result.riskLevel === 'HIGH' ? 'threat' : 'suspicious')

    // Save scan record
    const scan = await Scan.create({
      type: 'url_scan',
      target: url,
      status,
      riskScore: result.score,
      analysis: `Risk Level: ${result.riskLevel} | Safe: ${result.isSafe} | Reasons: ${result.reason.join(', ')}`.slice(0, 500),
      userId,
    })

    // Log incident for malicious URLs
    if (!result.isSafe || result.riskLevel === 'HIGH' || result.riskLevel === 'MEDIUM') {
      const severity = result.riskLevel === 'HIGH' ? 'HIGH' : 'MEDIUM';

      try {
        await logIncident({
          type: 'malicious_url',
          severity,
          message: `Malicious URL detected: ${url}`,
          details: {
            scannedURL: url,
            score: result.score,
            safeBrowsingMatches: result.safeBrowsingResults?.length || 0,
            virusTotalMatches: result.virusTotal?.length || 0,
            suspiciousPatterns: result.suspiciousPatterns?.length || 0,
            reasons: result.reason
          },
          source: 'url_scanner',
          threatDetails: result,
          actionSuggested: `Block access to this malicious URL. Risk level: ${result.riskLevel}. Reasons: ${result.reason.join(', ')}`,
          userId
        });
      } catch (incidentError) {
        console.warn('Failed to log malicious URL incident:', incidentError.message);
      }
    }

    // Add scan ID and timestamp to response
    const response = {
      ...result,
      scanId: scan._id,
      timestamp: scan.scannedAt,
    }

    res.json(response)

  } catch (error) {
    console.error('URL scan error:', error)
    res.status(500).json({
      message: 'Server error scanning URL',
      error: error.message,
      url: req.body.url,
      isSafe: false,
      safeBrowsingResults: [],
      virusTotal: [],
      suspiciousPatterns: [{
        type: 'server_error',
        severity: 'HIGH',
        description: 'Server error occurred during scan'
      }],
      riskLevel: 'ERROR',
      score: 0,
      reason: [error.message],
      suggestions: ['Retry the scan or contact support if the issue persists']
    })
  }
}

export default { scanURLController }
