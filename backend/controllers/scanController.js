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

// File scanning (mock)
const analyzeFile = (filename) => {
  const fileType = filename.split('.').pop()?.toLowerCase()
  const supportedTypes = ['pdf', 'txt', 'docx', 'png']

  if (!supportedTypes.includes(fileType)) {
    return { error: 'Unsupported file type', virusScore: 0, indicators: [] }
  }

  const suspiciousPatterns = ['malware', 'virus', 'trojan', 'exploit', 'backdoor']
  const hasSuspiciousName = suspiciousPatterns.some(pattern =>
    filename.toLowerCase().includes(pattern)
  )

  const virusScore = hasSuspiciousName ? Math.floor(Math.random() * 50) + 50 : Math.floor(Math.random() * 30)
  const hash = 'MD5:' + Math.random().toString(36).substring(2, 10).toUpperCase()

  const indicators = []
  if (virusScore > 70) {
    indicators.push('JS injection detected')
    indicators.push('Macro usage found')
  } else if (virusScore > 40) {
    indicators.push('Metadata anomalies')
  }

  return {
    hash,
    virusScore,
    indicators,
    classification: virusScore > 70 ? 'malicious' : virusScore > 40 ? 'suspicious' : 'safe'
  }
}

// IP/Domain reputation checking
const checkReputation = (query) => {
  const isIP = /^\d+\.\d+\.\d+\.\d+$/.test(query)
  const riskScore = Math.floor(Math.random() * 100)

  const threatLabels = []
  const history = []

  if (riskScore > 80) {
    threatLabels.push('C2 server')
    threatLabels.push('Botnet')
    history.push('High activity flagged')
  } else if (riskScore > 50) {
    threatLabels.push('Spam source')
    history.push('Moderate suspicious activity')
  } else {
    threatLabels.push('No known threats')
    history.push('Clean reputation')
  }

  return {
    domain: isIP ? '' : query,
    ip: isIP ? query : '',
    riskScore,
    asn: isIP ? 'AS' + Math.floor(Math.random() * 10000) : '',
    geolocation: isIP ? ['US', 'Germany', 'China', 'Netherlands'][Math.floor(Math.random() * 4)] : '',
    history,
    threatLabels
  }
}

// AI explanation engine
const explainThreat = (resultType, rawData) => {
  const explanations = {
    url: {
      dangerous: "URLs containing suspicious patterns may lead to phishing sites, malware downloads, or credential theft. Malicious URLs often use domain squatting, character manipulation, or URL shorteners to hide their true destination.",
      handling: "Avoid clicking suspicious links. Verify domain ownership before sharing sensitive information. Use URL scanning tools before navigation.",
      action: "Block URL access and report to security team. Implement URL filtering in network security controls."
    },
    email: {
      dangerous: "This email contains typical phishing indicators like suspicious sender domains, urgent language, or attachment requests. Such emails often lead to identity theft through credential harvesting or malware installation.",
      handling: "Never click links or open attachments from untrusted sources. Verify sender authenticity directly through official channels.",
      action: "Quarantine email and forward to security analysis. Educate users about phishing red flags."
    },
    file: {
      dangerous: "This file shows signs of malicious content through macro usage, embedded scripts, or anomalous metadata. These files may execute unauthorized code or steal sensitive data when opened.",
      handling: "Scan files before opening. Use sandboxed environments for unknown files. Keep antivirus software updated.",
      action: "Isolate infected files and perform cleanup. Update malware signatures and distribute security alert."
    },
    reputation: {
      dangerous: "This IP/domain has a history of malicious activity including connections to command and control servers, spam campaigns, or botnet operations.",
      handling: "Review network logs for unauthorized connections. Implement IP blocking where appropriate. Monitor for related indicators.",
      action: "Isolate affected systems, conduct forensic analysis, and implement compensating security controls."
    }
  }

  return explanations[resultType] || {
    dangerous: "This item shows suspicious characteristics that warrant further analysis.",
    handling: "Apply caution and proper security protocols.",
    action: "Conduct comprehensive security review and implement appropriate controls."
  }
}

export const scanFile = async (req, res) => {
  try {
    const { filename } = req.body
    const userId = req.user?.userId

    if (!filename) {
      return res.status(400).json({ message: 'Filename is required' })
    }

    const analysis = analyzeFile(filename)
    const status = analysis.classification

    if (analysis.error) {
      return res.status(400).json({ message: analysis.error })
    }

    const scan = await Scan.create({
      type: 'file',
      target: filename,
      status,
      riskScore: analysis.virusScore,
      analysis: `${analysis.hash} - ${analysis.indicators.join(', ') || 'No indicators'}`,
      userId,
    })

    res.json({
      ...analysis,
      scanId: scan._id,
      timestamp: scan.scannedAt,
      details: `Virus Score: ${analysis.virusScore}% | Indicators: ${analysis.indicators.join(', ') || 'None'}`
    })
  } catch (error) {
    console.error('Scan file error:', error)
    res.status(500).json({ message: 'Server error scanning file' })
  }
}

export const getReputation = async (req, res) => {
  try {
    const { query } = req.query
    const userId = req.user?.userId

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' })
    }

    const reputation = checkReputation(query)
    const status = reputation.riskScore > 70 ? 'threat' : reputation.riskScore > 40 ? 'suspicious' : 'safe'

    const scan = await Scan.create({
      type: 'reputation',
      target: query,
      status,
      riskScore: reputation.riskScore,
      analysis: `Risk Score: ${reputation.riskScore}% | Labels: ${reputation.threatLabels.join(', ')}`,
      userId,
    })

    res.json({
      ...reputation,
      scanId: scan._id,
      timestamp: scan.scannedAt,
      classification: status
    })
  } catch (error) {
    console.error('Check reputation error:', error)
    res.status(500).json({ message: 'Server error checking reputation' })
  }
}

export const explainScan = async (req, res) => {
  try {
    const { resultType, rawData } = req.body

    if (!resultType) {
      return res.status(400).json({ message: 'Result type is required' })
    }

    const explanation = explainThreat(resultType, rawData)

    res.json({
      resultType,
      explanation: explanation.dangerous,
      handling: explanation.handling,
      action: explanation.action,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Explain scan error:', error)
    res.status(500).json({ message: 'Server error generating explanation' })
  }
}
