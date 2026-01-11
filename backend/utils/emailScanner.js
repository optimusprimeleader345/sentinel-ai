import { google } from 'googleapis'

const safeBrowsing = google.safebrowsing('v4')

// Phishing keywords to detect
const PHISHING_KEYWORDS = [
  "urgent",
  "verify account",
  "password reset",
  "click immediately",
  "security alert",
  "bank",
  "paypal",
  "invoice",
  "payment",
  "wire transfer",
  "account suspension",
  "login required",
  "confirm identity",
  "security breach",
  "suspicious activity"
]

// Suspicious TLDs
const SUSPICIOUS_TLDS = ['.ru', '.cn', '.tk', '.ga', '.ml', '.cf', '.gq', '.top', '.xyz']
const RANDOM_CHARS_PATTERN = /[a-zA-Z]{10,}/ // Simple pattern for detecting random character domains

/**
 * Extract all URLs from email text using regex
 */
function extractUrls(text) {
  const urlRegex = /(https?:\/\/[^\s<>"']+)/gi
  const urls = text.match(urlRegex) || []
  return urls.map(url => url.trim())
}

/**
 * Check URLs against Google SafeBrowsing API
 */
async function checkSafeBrowsing(urls) {
  const apiKey = process.env.SAFEBROWSING_KEY
  if (!apiKey) {
    console.warn('Google SafeBrowsing API key not configured')
    return []
  }

  try {
    const response = await safeBrowsing.threatMatches.find({
      auth: apiKey,
      requestBody: {
        client: {
          clientId: "sentinel-ai",
          clientVersion: "1.0.0"
        },
        threatInfo: {
          threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE"],
          platformTypes: ["ANY_PLATFORM"],
          threatEntryTypes: ["URL"],
          threatEntries: urls.map(url => ({ url }))
        }
      }
    })
    return response.data.matches || []
  } catch (error) {
    console.error('SafeBrowsing API error:', error.message)
    return []
  }
}

/**
 * Analyze text for phishing keywords
 */
function analyzeKeywords(text) {
  const lowerText = text.toLowerCase()
  const foundKeywords = PHISHING_KEYWORDS.filter(keyword =>
    lowerText.includes(keyword.toLowerCase())
  )
  return foundKeywords
}

/**
 * Check for suspicious sender patterns
 */
function analyzeSender(sender) {
  if (!sender) return { suspicious: false, reason: null }

  const lowerSender = sender.toLowerCase()
  const suspicious = SUSPICIOUS_TLDS.some(tld => lowerSender.includes(tld)) ||
                    RANDOM_CHARS_PATTERN.test(sender.split('@')[0] || '')

  let reason = null
  if (SUSPICIOUS_TLDS.some(tld => lowerSender.includes(tld))) {
    reason = "Suspicious top-level domain"
  } else if (RANDOM_CHARS_PATTERN.test(sender.split('@')[0] || '')) {
    reason = "Random character pattern in domain"
  }

  return { suspicious, reason }
}

/**
 * Calculate phishing score based on multiple factors
 */
function calculateScore(keywords, urls, safeBrowsingHits, senderSuspicious) {
  let score = 0

  // Keywords: 10 points each
  score += keywords.length * 10

  // Suspicious URLs: 5 points each
  score += urls.length * 5

  // SafeBrowsing hits: 30 points each
  score += safeBrowsingHits.length * 30

  // Sender suspicious pattern: 15 points
  if (senderSuspicious) {
    score += 15
  }

  return Math.min(100, score)
}

/**
 * Determine risk level based on score
 */
function getRiskLevel(score) {
  if (score >= 70) return "HIGH"
  if (score >= 40) return "MEDIUM"
  return "LOW"
}

/**
 * Generate actionable suggestions based on findings
 */
function generateSuggestions(score, keywords, suspiciousUrls, safeBrowsingHits, senderInfo) {
  const suggestions = []

  if (score >= 70) {
    suggestions.push("Do NOT interact with this email - delete immediately")
    suggestions.push("Report this email to your security team")
  } else if (score >= 40) {
    suggestions.push("Verify the sender's identity through official channels")
    suggestions.push("Do not click any links - manually navigate to official websites")
  }

  if (keywords.length > 0) {
    suggestions.push("This email contains typical phishing language patterns")
  }

  if (suspiciousUrls.length > 0) {
    suggestions.push("Do NOT click external links - they may be malicious")
  }

  if (safeBrowsingHits.length > 0) {
    suggestions.push("Links in this email have been flagged as malicious by Google SafeBrowsing")
  }

  if (senderInfo.suspicious) {
    suggestions.push("Sender domain appears suspicious - do not trust this email")
  }

  if (keywords.length === 0 && suspiciousUrls.length === 0 && safeBrowsingHits.length === 0 && !senderInfo.suspicious) {
    suggestions.push("Email appears legitimate based on automated analysis")
  }

  // Always include this safety tip
  suggestions.push("Contact official support directly if you're unsure about any communication")

  return suggestions
}

/**
 * Main email scanning function
 */
export async function scanEmail(emailText, sender = null) {
  try {
    // Extract URLs
    const extractedUrls = extractUrls(emailText)

    // Check SafeBrowsing (if URLs found)
    let safeBrowsingHits = []
    if (extractedUrls.length > 0) {
      safeBrowsingHits = await checkSafeBrowsing(extractedUrls)
    }

    // Analyze keywords
    const detectedKeywords = analyzeKeywords(emailText)

    // Analyze sender if provided
    const senderAnalysis = analyzeSender(sender)

    // Calculate final score
    const score = calculateScore(
      detectedKeywords,
      extractedUrls,
      safeBrowsingHits,
      senderAnalysis.suspicious
    )

    // Determine risk level and phishing status
    const riskLevel = getRiskLevel(score)
    const isPhishing = riskLevel === "HIGH" || (riskLevel === "MEDIUM" && score >= 60)

    // Generate suggestions
    const suggestions = generateSuggestions(
      score,
      detectedKeywords,
      extractedUrls,
      safeBrowsingHits,
      senderAnalysis
    )

    return {
      isPhishing,
      score,
      detectedKeywords,
      suspiciousLinks: extractedUrls,
      safeBrowsingHits: safeBrowsingHits.map(hit => ({
        url: hit.threat.url,
        threatType: hit.threatType,
        platformType: hit.platformType
      })),
      riskLevel,
      suggestions,
      analysis: {
        totalUrls: extractedUrls.length,
        safeBrowsingChecked: process.env.SAFEBROWSING_KEY ? true : false,
        senderAnalysis: senderAnalysis
      }
    }

  } catch (error) {
    console.error('Email scanning error:', error)
    // Return safe defaults on error
    return {
      isPhishing: false,
      score: 0,
      detectedKeywords: [],
      suspiciousLinks: [],
      safeBrowsingHits: [],
      riskLevel: "LOW",
      suggestions: ["Email analysis encountered an error - manual review recommended"],
      analysis: { error: error.message }
    }
  }
}

export default { scanEmail }
