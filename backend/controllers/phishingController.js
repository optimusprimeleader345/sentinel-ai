import Scan from '../models/Scan.js';
import { detectPhishing } from '../utils/phishingAnalyzer.js';
import { optionalAuth } from '../middleware/authMiddleware.js';
import { logIncident } from '../utils/incidentLogger.js';

/**
 * Phishing Detection Controller
 * Handles real-time analysis of websites for phishing threats
 */

/**
 * Analyze website for phishing threats
 * Endpoint: POST /api/phishing/detect
 */
export const detectPhishingController = async (req, res) => {
  try {
    const userId = req.user?.userId;
    const analysisData = req.body;

    // Validate required fields
    if (!analysisData.url) {
      return res.status(400).json({
        message: 'URL is required for phishing analysis',
        error: 'Missing URL parameter'
      });
    }

    console.log(`🔍 Starting phishing detection analysis for URL: ${analysisData.url}`);

    // Perform phishing detection analysis
    const analysisResult = await detectPhishing(analysisData);

    // Log the analysis in the database (similar to other scans)
    try {
      const scan = await Scan.create({
        type: 'phishing_analysis',
        target: analysisData.url,
        status: analysisResult.riskLevel === 'LOW' ? 'safe' :
                analysisResult.riskLevel === 'MEDIUM' ? 'suspicious' : 'threat',
        riskScore: analysisResult.score,
        analysis: `Phishing Risk: ${analysisResult.riskLevel} | Score: ${analysisResult.score} | Detection: ${analysisResult.detectionType} | Threats: ${analysisResult.threatsDetected.length}`.slice(0, 500),
        userId,
      });

      // Add scan ID to response
      analysisResult.scanId = scan._id;
      analysisResult.scannedAt = scan.scannedAt;

      // Log incident for HIGH/MEDIUM risk phishing detections
      if (analysisResult.riskLevel === 'HIGH' || analysisResult.riskLevel === 'MEDIUM') {
        const severity = analysisResult.riskLevel === 'HIGH' ? 'HIGH' : 'MEDIUM';

        try {
          await logIncident({
            type: 'phishing',
            severity,
            message: `Phishing detected on website: ${analysisData.url}`,
            details: {
              detectedURL: analysisData.url,
              score: analysisResult.score,
              threatsDetected: analysisResult.threatsDetected.length,
              confidence: analysisResult.confidence
            },
            source: 'phishing_detector',
            threatDetails: analysisResult,
            actionSuggested: analysisResult.recommendation + '. Block access to this URL.',
            userId
          });
        } catch (incidentError) {
          console.warn('Failed to log phishing incident:', incidentError.message);
        }
      }
    } catch (dbError) {
      console.warn('Failed to save phishing analysis to database:', dbError.message);
      // Continue without saving - analysis still works
    }

    // Return comprehensive analysis result
    res.json({
      success: true,
      ...analysisResult
    });

  } catch (error) {
    console.error('Phishing detection error:', error);

    // Return detailed error information
    res.status(500).json({
      success: false,
      message: 'Failed to analyze website for phishing threats',
      error: error.message,
      url: req.body?.url || 'unknown',
      analysisResult: {
        riskLevel: 'ERROR',
        score: 0,
        confidence: 0,
        recommendation: 'MANUAL_REVIEW',
        threatsDetected: [{
          type: 'analysis_error',
          severity: 'high',
          description: 'Phishing analysis system encountered an error',
          score: 0
        }],
        timestamp: new Date().toISOString()
      }
    });
  }
};

/**
 * Get phishing detection statistics (optional analytics endpoint)
 * Could be used in admin dashboard
 */
export const getPhishingStats = async (req, res) => {
  try {
    const userId = req.user?.userId;

    // Get phishing analysis scans from the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const phishingScans = await Scan.find({
      type: 'phishing_analysis',
      ...(userId && { userId }),
      scannedAt: { $gte: thirtyDaysAgo }
    }).sort({ scannedAt: -1 });

    // Calculate statistics
    const total = phishingScans.length;
    const safe = phishingScans.filter(s => s.status === 'safe').length;
    const suspicious = phishingScans.filter(s => s.status === 'suspicious').length;
    const threats = phishingScans.filter(s => s.status === 'threat').length;

    const stats = {
      totalAnalyses: total,
      safeSites: safe,
      suspiciousSites: suspicious,
      blockedSites: threats,
      detectionRate: total > 0 ? ((suspicious + threats) / total * 100) : 0,
      timeRange: 'last 30 days',
      recentScans: phishingScans.slice(0, 10).map(scan => ({
        id: scan._id,
        url: scan.target,
        riskLevel: scan.status === 'threat' ? 'HIGH' : scan.status === 'suspicious' ? 'MEDIUM' : 'LOW',
        score: scan.riskScore,
        timestamp: scan.scannedAt
      }))
    };

    res.json(stats);
  } catch (error) {
    console.error('Get phishing stats error:', error);
    res.status(500).json({
      message: 'Failed to fetch phishing detection statistics',
      error: error.message
    });
  }
};

/**
 * Test phishing detection with sample data (for development/testing)
 * Endpoint: POST /api/phishing/test
 */
export const testPhishingDetection = async (req, res) => {
  try {
    // Sample phishing website test data
    const phishingTestData = [
      {
        url: 'https://login-fake-bank.com',
        htmlContent: '<html><body><form><input name="username"><input name="password" type="password"><button>Login to your account</button></form></body></html>',
        visibleText: 'Login to your bank account. Verify your identity. Update your password.',
        formFields: ['username', 'password'],
        sslCertificate: { valid: false, issuer: 'Unknown Authority' },
        suspiciousElements: ['hidden-password']
      },
      {
        url: 'https://paypal-secure-login.com',
        htmlContent: '<html><body><form><input name="email"><input name="pass"><button>Secure Login</button></form></body></html>',
        visibleText: 'Welcome to PayPal. Please verify your account. Log in to view your balance.',
        formFields: ['email', 'pass'],
        sslCertificate: { valid: true, issuer: 'Let\'s Encrypt' },
        suspiciousElements: []
      },
      {
        url: 'https://new-bank-secure.com',
        htmlContent: '<html><body><form><input name="user"><input name="pwd"><button>Bank Login</button></form></body></html>',
        visibleText: 'New bank services. Secure banking online.',
        formFields: ['user', 'pwd'],
        sslCertificate: { valid: true, issuer: 'Self-signed' },
        suspiciousElements: ['fake-branding']
      }
    ];

    const testIndex = req.body.testIndex || 0;
    const testData = phishingTestData[testIndex % phishingTestData.length];

    if (!testData) {
      return res.status(400).json({ message: 'Invalid test index' });
    }

    console.log(`🧪 Running phishing detection test case ${testIndex}`);

    const result = await detectPhishing(testData);
    result.testCase = testIndex;
    result.testData = {
      url: testData.url,
      description: getTestDescription(testIndex)
    };

    res.json({ success: true, ...result });

  } catch (error) {
    console.error('Phishing test error:', error);
    res.status(500).json({
      success: false,
      message: 'Test execution failed',
      error: error.message
    });
  }
};

// Helper function for test descriptions
function getTestDescription(index) {
  const descriptions = [
    'Fake bank login page (high-risk indicators)',
    'PayPal phishing clone (medium-risk indicators)',
    'New banking site with suspicious domain (suspicious characteristics)'
  ];
  return descriptions[index % descriptions.length] || 'Unknown test case';
}

export default {
  detectPhishingController,
  getPhishingStats,
  testPhishingDetection
};
