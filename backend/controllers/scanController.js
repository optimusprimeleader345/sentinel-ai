import Scan from '../models/Scan.js'

const analyzeURL = (url) => {
  // Mock URL analysis
  const suspiciousPatterns = ['malware', 'phishing', 'spam', 'virus']
  const lowerUrl = url.toLowerCase()
  const hasSuspicious = suspiciousPatterns.some(pattern => lowerUrl.includes(pattern))
  
  return {
    riskScore: hasSuspicious ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30),
    explanation: hasSuspicious 
      ? 'URL contains suspicious patterns commonly associated with malicious sites'
      : 'URL appears safe based on pattern analysis',
    classification: hasSuspicious ? 'suspicious' : 'safe',
  }
}

const analyzeEmail = (email) => {
  // Mock email analysis
  const suspiciousDomains = ['spam.com', 'phishing.net', 'malicious.org']
  const domain = email.split('@')[1]?.toLowerCase()
  const isSuspicious = suspiciousDomains.includes(domain)
  
  return {
    riskScore: isSuspicious ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 20),
    explanation: isSuspicious
      ? 'Email domain is associated with known spam/phishing sources'
      : 'Email address appears legitimate',
    classification: isSuspicious ? 'threat' : 'safe',
  }
}

export const scanURL = async (req, res) => {
  try {
    const { url } = req.body
    const userId = req.user?.userId

    if (!url) {
      return res.status(400).json({ message: 'URL is required' })
    }

    const analysis = analyzeURL(url)
    const status = analysis.riskScore > 50 ? 'threat' : analysis.riskScore > 30 ? 'suspicious' : 'safe'

    // Save scan record
    const scan = await Scan.create({
      type: 'url',
      target: url,
      status,
      riskScore: analysis.riskScore,
      analysis: analysis.explanation,
      userId,
    })

    res.json({
      ...analysis,
      scanId: scan._id,
      timestamp: scan.scannedAt,
    })
  } catch (error) {
    console.error('Scan URL error:', error)
    res.status(500).json({ message: 'Server error scanning URL' })
  }
}

export const scanEmail = async (req, res) => {
  try {
    const { email } = req.body
    const userId = req.user?.userId

    if (!email) {
      return res.status(400).json({ message: 'Email is required' })
    }

    const analysis = analyzeEmail(email)
    const status = analysis.riskScore > 50 ? 'threat' : 'safe'

    // Save scan record
    const scan = await Scan.create({
      type: 'email',
      target: email,
      status,
      riskScore: analysis.riskScore,
      analysis: analysis.explanation,
      userId,
    })

    res.json({
      ...analysis,
      scanId: scan._id,
      timestamp: scan.scannedAt,
    })
  } catch (error) {
    console.error('Scan email error:', error)
    res.status(500).json({ message: 'Server error scanning email' })
  }
}

export const getScanHistory = async (req, res) => {
  try {
    const userId = req.user?.userId
    const scans = await Scan.find(userId ? { userId } : {}).sort({ scannedAt: -1 }).limit(50)

    res.json(scans)
  } catch (error) {
    console.error('Get scan history error:', error)
    res.status(500).json({ message: 'Server error fetching scan history' })
  }
}

