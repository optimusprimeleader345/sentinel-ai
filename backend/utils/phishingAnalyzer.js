import axios from 'axios';
// Import the phishing patterns we just created
import {
  PHISHING_KEYWORDS,
  SUSPICIOUS_FORM_PATTERNS,
  MALICIOUS_HTML_SIGNATURES,
  FORM_ANALYSIS_WEIGHTS,
  PHISHING_RED_FLAG_DOMAINS,
  LEGITIMATE_DOMAINS,
  PHISHING_WEBCAM_KEYWORDS
} from '../data/phishingPatterns.js';

/**
 * Advanced Phishing Detection Analyzer
 * Implements sophisticated real-time phishing detection logic
 */

// Google Safe Browsing API configuration
const SAFE_BROWSING_API_KEY = process.env.GOOGLE_SAFE_BROWSING_API_KEY || 'YOUR_API_KEY';
const SAFE_BROWSING_URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find';

// Domain WHOIS API (free tier)
const WHOIS_API_URL = 'https://api.ipify.org'; // Alternative simple check

/**
 * Main Phishing Detection Function
 * @param {Object} analysisData - Data from browser extension
 * @returns {Object} - Comprehensive phishing analysis result
 */
export async function detectPhishing(analysisData) {
  const {
    url,
    htmlContent = '',
    visibleText = '',
    formFields = [],
    sslCertificate = null,
    suspiciousElements = []
  } = analysisData;

  console.log(`🔍 Starting phishing analysis for: ${url}`);

  // Initialize scoring components
  let keywordScore = 0;
  let formScore = 0;
  let safeBrowsingScore = 0;
  let domainAgeScore = 0;

  // Evidence collection for transparency
  const detectedThreats = [];
  const detectionMetadata = {};

  try {
    // 1. Keyword Analysis (score: keywords * 10)
    const keywordAnalysis = analyzeKeywords(visibleText, htmlContent);
    keywordScore = keywordAnalysis.count * 10;
    if (keywordAnalysis.threats.length > 0) {
      detectedThreats.push(...keywordAnalysis.threats);
    }

    // 2. Form Analysis (score: forms * 20)
    const formAnalysis = analyzeForms(formFields, htmlContent);
    formScore = formAnalysis.score;
    if (formAnalysis.threats.length > 0) {
      detectedThreats.push(...formAnalysis.threats);
    }

    // 3. Safe Browsing Check (score: safebrowsing * 50)
    try {
      const safeBrowsingAnalysis = await checkSafeBrowsing(url);
      safeBrowsingScore = safeBrowsingAnalysis.score;
      detectionMetadata.safeBrowsing = safeBrowsingAnalysis.metadata;

      if (safeBrowsingAnalysis.threats.length > 0) {
        detectedThreats.push(...safeBrowsingAnalysis.threats);
      }
    } catch (error) {
      console.warn('SafeBrowsing check failed:', error.message);
      // Continue without SafeBrowsing, but note it
      detectedThreats.push({
        type: 'safeBrowsingError',
        severity: 'low',
        description: 'SafeBrowsing check unavailable',
        score: 0
      });
    }

    // 4. Domain Age Analysis (score: domainAge * 10)
    const domainAnalysis = await analyzeDomainAge(url);
    domainAgeScore = domainAnalysis.score;
    detectionMetadata.domainAge = domainAnalysis.metadata;

    if (domainAnalysis.isNew) {
      detectedThreats.push(domainAnalysis.threat);
    }

    // 5. HTML Signature Analysis
    const htmlAnalysis = analyzeHTMLSignatures(htmlContent);
    if (htmlAnalysis.threats.length > 0) {
      detectedThreats.push(...htmlAnalysis.threats);
      keywordScore += htmlAnalysis.score; // Add to keyword score
    }

    // 6. SSL Certificate Analysis
    if (sslCertificate) {
      const sslAnalysis = analyzeSSLCertificate(sslCertificate);
      if (sslAnalysis.threats.length > 0) {
        detectedThreats.push(...sslAnalysis.threats);
        keywordScore += sslAnalysis.score; // Add to keyword score
      }
    }

    // 7. Additional Suspicious Element Analysis
    const elementAnalysis = analyzeSuspiciousElements(suspiciousElements);
    if (elementAnalysis.threats.length > 0) {
      detectedThreats.push(...elementAnalysis.threats);
      keywordScore += elementAnalysis.score;
    }

  } catch (error) {
    console.error('Phishing detection error:', error);
    detectedThreats.push({
      type: 'analysis_error',
      severity: 'low',
      description: 'Analysis encountered an error',
      score: 0
    });
  }

  // Calculate final score using your specified formula
  const finalScore = keywordScore + formScore + safeBrowsingScore + domainAgeScore;

  // Determine risk level
  let riskLevel = 'LOW';
  if (finalScore > 100) {
    riskLevel = 'HIGH';
  } else if (finalScore > 60) {
    riskLevel = 'MEDIUM';
  }

  // Generate recommendations
  const recommendations = generateRecommendations(riskLevel, detectedThreats);

  // Calculate confidence based on evidence strength
  const confidence = calculateConfidence(detectedThreats, finalScore);

  const result = {
    url,
    score: finalScore,
    riskLevel,
    detectionType: determineDetectionType(detectedThreats),
    threatsDetected: detectedThreats,
    scores: {
      keywords: keywordScore,
      forms: formScore,
      safeBrowsing: safeBrowsingScore,
      domainAge: domainAgeScore
    },
    recommendation: getRecommendationAction(riskLevel),
    confidence,
    metadata: detectionMetadata,
    recommendations,
    timestamp: new Date().toISOString(),
    analysisVersion: '1.0.0'
  };

  console.log(`✅ Phishing analysis complete for ${url}: Score ${finalScore}, Risk ${riskLevel}`);

  return result;
}

/**
 * Analyze keywords for phishing indicators
 */
function analyzeKeywords(visibleText, htmlContent) {
  const text = (visibleText + ' ' + htmlContent).toLowerCase();
  const foundKeywords = [];
  let keywordCount = 0;

  PHISHING_KEYWORDS.forEach(keyword => {
    const regex = new RegExp(keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = text.match(regex);
    if (matches) {
      keywordCount += matches.length;
      foundKeywords.push(keyword);
    }
  });

  // Special handling for webcam keywords (high indicators)
  const webcamFound = PHISHING_WEBCAM_KEYWORDS.some(keyword =>
    text.includes(keyword.toLowerCase())
  );

  const threats = [];

  if (foundKeywords.length > 0) {
    threats.push({
      type: 'keyword',
      severity: keywordCount > 3 ? 'high' : 'medium',
      description: `Found ${keywordCount} phishing keywords: ${foundKeywords.slice(0, 5).join(', ')}`,
      score: keywordCount * 10,
      evidence: foundKeywords
    });
  }

  if (webcamFound) {
    threats.push({
      type: 'webcam_request',
      severity: 'high',
      description: 'Page requests camera/microphone access (phishing red flag)',
      score: 40,
      evidence: ['camera_access_request']
    });
  }

  return {
    count: keywordCount,
    threats
  };
}

/**
 * Analyze form fields for suspicious patterns
 */
function analyzeForms(formFields, htmlContent) {
  let totalScore = 0;
  const threats = [];
  const normalizedFields = formFields.map(f => f.toLowerCase());

  // Check for suspicious field combinations
  Object.keys(FORM_ANALYSIS_WEIGHTS).forEach(combination => {
    const fields = combination.split('+');
    const hasAllFields = fields.every(field =>
      normalizedFields.some(formField => formField.includes(field))
    );

    if (hasAllFields) {
      totalScore += FORM_ANALYSIS_WEIGHTS[combination];
      threats.push({
        type: 'suspicious_form',
        severity: totalScore > 40 ? 'high' : 'medium',
        description: `Suspicious form combination: ${combination}`,
        score: FORM_ANALYSIS_WEIGHTS[combination],
        evidence: fields
      });
    }
  });

  // Check for individual suspicious fields
  normalizedFields.forEach(field => {
    Object.keys(FORM_ANALYSIS_WEIGHTS).forEach(pattern => {
      if (pattern.startsWith('hidden_') && field.includes(pattern.replace('hidden_', ''))) {
        if (htmlContent.includes(`type="hidden"`) && htmlContent.includes(`name="${field}"`)) {
          totalScore += FORM_ANALYSIS_WEIGHTS[pattern];
          threats.push({
            type: 'hidden_field',
            severity: 'high',
            description: `Hidden ${pattern.replace('hidden_', '')} field detected`,
            score: FORM_ANALYSIS_WEIGHTS[pattern],
            evidence: [field]
          });
        }
      }
    });
  });

  // Check for auto-submit patterns
  if (htmlContent.includes('onsubmit') && htmlContent.includes('return true')) {
    totalScore += 15;
    threats.push({
      type: 'auto_submit',
      severity: 'medium',
      description: 'Form auto-submits (potential drive-by phishing)',
      score: 15,
      evidence: ['auto_submit_detection']
    });
  }

  return {
    score: totalScore,
    threats
  };
}

/**
 * Check Google Safe Browsing API
 */
async function checkSafeBrowsing(url) {
  try {
    const response = await axios.post(`${SAFE_BROWSING_URL}?key=${SAFE_BROWSING_API_KEY}`, {
      client: {
        clientId: "sentinelai-extension",
        clientVersion: "1.0.0"
      },
      threatInfo: {
        threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "POTENTIALLY_HARMFUL_APPLICATION"],
        platformTypes: ["ANY_PLATFORM"],
        threatEntryTypes: ["URL"],
        threatEntries: [{ url }]
      }
    });

    const matches = response.data?.matches || [];

    let score = 0;
    const threatTypes = [];

    if (matches.length > 0) {
      // Very high score for SafeBrowsing hits
      score = 70;
      matches.forEach(match => {
        threatTypes.push(match.threatType);

        if (match.threatType === 'SOCIAL_ENGINEERING') {
          // Phishing sites get highest score
          score = 80;
        }
      });
    }

    const threats = [];
    if (score > 0) {
      threats.push({
        type: 'safeBrowsing',
        severity: 'high',
        description: `Google Safe Browsing flagged: ${threatTypes.join(', ')}`,
        score,
        evidence: threatTypes
      });
    }

    return {
      score,
      threats,
      metadata: {
        matches: matches.length,
        threatTypes,
        checkedAt: new Date().toISOString()
      }
    };

  } catch (error) {
    // If API fails, return neutral result
    return {
      score: 0,
      threats: [],
      metadata: {
        error: error.message,
        checkedAt: new Date().toISOString()
      }
    };
  }
}

/**
 * Analyze domain age (simplified - in production use real WHOIS)
 */
async function analyzeDomainAge(url) {
  try {
    // Extract domain from URL
    const domain = new URL(url).hostname;

    // Check against known legitimate domains
    const isLegitimate = LEGITIMATE_DOMAINS.some(legitDomain =>
      domain === legitDomain || domain.endsWith(`.${legitDomain}`)
    );

    // Check against suspicious TLD patterns
    const hasSuspiciousTLD = PHISHING_RED_FLAG_DOMAINS.some(pattern => {
      if (pattern.startsWith('/')) {
        // Regex pattern
        return new RegExp(pattern.slice(1, -1)).test(domain);
      } else {
        // String pattern
        return domain.includes(pattern);
      }
    });

    // Simple heuristic: shorter domains, numbers, unusual chars = suspicious
    const hasSuspiciousChars = /[0-9]{4,}|[^\w.-]|-{2,}|\.{2,}/.test(domain);
    const isVeryNewLooking = domain.split('.').some(part => part.length < 5);

    let score = 0;
    let isNew = false;

    if (!isLegitimate && (hasSuspiciousTLD || hasSuspiciousChars || isVeryNewLooking)) {
      isNew = true;
      score = 30; // High score for suspicious domains

      if (hasSuspiciousTLD) score += 20;
      if (hasSuspiciousChars) score += 10;
    } else if (isLegitimate) {
      // Bonus for legitimate domains
      score = -10;
    }

    const threat = isNew ? {
      type: 'domain_analysis',
      severity: 'medium',
      description: `Suspicious domain characteristics: ${[
        hasSuspiciousTLD ? 'suspicious TLD' : '',
        hasSuspiciousChars ? 'unusual characters' : '',
        isVeryNewLooking ? 'short segments' : ''
      ].filter(Boolean).join(', ')}`,
      score: Math.max(0, score),
      evidence: [domain]
    } : null;

    return {
      score: Math.max(0, score),
      isNew,
      threat,
      metadata: {
        domain,
        isLegitimate,
        hasSuspiciousTLD,
        hasSuspiciousChars,
        isVeryNewLooking
      }
    };

  } catch (error) {
    return {
      score: 5, // Small penalty for analysis failure
      isNew: false,
      threat: {
        type: 'domain_analysis',
        severity: 'low',
        description: 'Domain analysis failed',
        score: 5,
        evidence: []
      },
      metadata: { error: error.message }
    };
  }
}

/**
 * Analyze HTML for malicious signatures
 */
function analyzeHTMLSignatures(htmlContent) {
  const threats = [];
  let score = 0;

  MALICIOUS_HTML_SIGNATURES.forEach((signature, index) => {
    const regex = new RegExp(signature, 'gi');
    const matches = htmlContent.match(regex);

    if (matches) {
      const severityMap = ['high', 'high', 'medium', 'low'];
      const scoreMap = [30, 25, 15, 10];

      score += scoreMap[index % scoreMap.length];

      threats.push({
        type: 'html_signature',
        severity: severityMap[index % severityMap.length],
        description: `Malicious HTML pattern detected (${signature.substring(0, 30)}...)`,
        score: scoreMap[index % scoreMap.length],
        evidence: [signature]
      });
    }
  });

  return { threats, score };
}

/**
 * Analyze SSL certificate
 */
function analyzeSSLCertificate(sslCert) {
  const threats = [];
  let score = 0;

  if (!sslCert.valid) {
    score += 25;
    threats.push({
      type: 'ssl_certificate',
      severity: 'high',
      description: 'SSL certificate is not valid or trusted',
      score: 25,
      evidence: ['invalid_ssl']
    });
  }

  // Check for suspicious issuers
  if (sslCert.issuer && (
    sslCert.issuer.toLowerCase().includes('unknown') ||
    sslCert.issuer.toLowerCase().includes('self-signed')
  )) {
    score += 20;
    threats.push({
      type: 'ssl_issuer',
      severity: 'medium',
      description: 'SSL certificate issued by suspicious/untrusted authority',
      score: 20,
      evidence: [sslCert.issuer]
    });
  }

  return { threats, score };
}

/**
 * Analyze additional suspicious elements
 */
function analyzeSuspiciousElements(elements) {
  const threats = [];
  let score = 0;

  elements.forEach(element => {
    switch (element) {
      case 'hidden-password':
        score += 35;
        threats.push({
          type: 'hidden_password',
          severity: 'high',
          description: 'Hidden password field detected (classic phishing technique)',
          score: 35
        });
        break;

      case 'fake-branding':
        score += 20;
        threats.push({
          type: 'fake_branding',
          severity: 'medium',
          description: 'Incorrect or fake brand logo/styling detected',
          score: 20
        });
        break;

      case 'redirection-script':
        score += 30;
        threats.push({
          type: 'redirection',
          severity: 'high',
          description: 'Automatic redirection scripts detected',
          score: 30
        });
        break;

      case 'iframe-injection':
        score += 25;
        threats.push({
          type: 'iframe_injection',
          severity: 'medium',
          description: 'Suspicious iframe content detected',
          score: 25
        });
        break;
    }
  });

  return { threats, score };
}

/**
 * Determine primary detection type
 */
function determineDetectionType(threats) {
  const types = threats.map(t => t.type).filter((v, i, a) => a.indexOf(v) === i);

  if (types.includes('safeBrowsing')) {
    return 'safebrowsing_flagged';
  } else if (types.includes('keyword') && threats.some(t => t.evidence?.includes('login'))) {
    return 'fake_login_page';
  } else if (types.includes('suspicious_form')) {
    return 'credential_harvesting';
  } else if (types.includes('domain_analysis')) {
    return 'typo_squatting';
  } else if (types.includes('html_signature')) {
    return 'malicious_website';
  } else {
    return 'suspicious_indicators';
  }
}

/**
 * Generate user recommendations
 */
function generateRecommendations(riskLevel, threats) {
  const recommendations = [];

  switch (riskLevel) {
    case 'HIGH':
      recommendations.push('🚫 DO NOT enter any personal information on this site');
      recommendations.push('🎯 Immediately leave this website');
      recommendations.push('⚠️ If you entered credentials, change them immediately');
      recommendations.push('🔐 Scan your device for malware');
      break;

    case 'MEDIUM':
      recommendations.push('⚠️ Be cautious with any information you plan to submit');
      recommendations.push('🔍 Verify the website URL carefully');
      recommendations.push('🌐 Check the SSL certificate by clicking the lock icon');
      recommendations.push('🚶 Consider leaving and accessing the site through official channels');
      break;

    case 'LOW':
      recommendations.push('✅ Website appears safe, but remain vigilant');
      recommendations.push('👀 Look for any unexpected pop-ups or requests');
      recommendations.push('🔒 2FA is strongly recommended for online accounts');
      break;
  }

  return recommendations;
}

/**
 * Get recommended action
 */
function getRecommendationAction(riskLevel) {
  switch (riskLevel) {
    case 'HIGH':
      return 'BLOCK_ACCESS';
    case 'MEDIUM':
      return 'WARN_USER';
    case 'LOW':
    default:
      return 'ALLOW_ACCESS';
  }
}

/**
 * Calculate confidence in detection
 */
function calculateConfidence(threats, score) {
  if (threats.length === 0) return 0;

  // High confidence if SafeBrowsing confirms OR high score with multiple threats
  if (threats.some(t => t.type === 'safeBrowsing')) {
    return 95;
  }

  // High score with multiple evidence types = high confidence
  const uniqueTypes = [...new Set(threats.map(t => t.type))];
  if (score > 80 && uniqueTypes.length >= 3) {
    return 90;
  }

  // Medium confidence for moderate evidence
  if (threats.length >= 3) {
    return 75;
  }

  // Low confidence for limited evidence
  if (threats.length >= 1) {
    return 50;
  }

  return 25;
}

export default { detectPhishing };
