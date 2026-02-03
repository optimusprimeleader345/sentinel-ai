import axios from 'axios'
import Breach from '../models/Breach.js'

// Fallback mock data
const mockBreaches = [
  {
    id: '1',
    email: 'user@example.com',
    breachSource: 'Data Breach Database 2023',
    leakedData: ['email', 'password', 'username'],
    severity: 'high',
    detectedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  },
  {
    id: '2',
    email: 'user@example.com',
    breachSource: 'Credential Dump 2024',
    leakedData: ['email', 'password'],
    severity: 'critical',
    detectedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
]

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.query
    const userId = req.user?.userId

    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' })
    }

    // REAL: Check database first (cached results)
    const cachedBreaches = await Breach.find({
      email: email.toLowerCase(),
      checkedAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } // Cache for 7 days
    }).sort({ checkedAt: -1 })

    if (cachedBreaches.length > 0) {
      const leaks = cachedBreaches.map(b => ({
        id: b._id.toString(),
        email: b.email,
        breachSource: b.breachName,
        leakedData: b.leakedData,
        severity: b.severity,
        detectedAt: b.breachDate || b.checkedAt
      }))

      return res.json({
        email,
        leaksFound: leaks.length,
        leaks,
        severity: leaks.length > 0 
          ? leaks.some(b => b.severity === 'critical') ? 'critical' : 
            leaks.some(b => b.severity === 'high') ? 'high' : 'medium'
          : 'none',
        recommendation: leaks.length > 0
          ? 'Your email was found in data breaches. Please change your passwords immediately.'
          : 'No leaks found for this email address.',
        cached: true
      })
    }

    // REAL: Use HaveIBeenPwned API
    const hibpApiKey = process.env.HIBP_API_KEY
    if (hibpApiKey) {
      try {
        const response = await axios.get(
          `https://haveibeenpwned.com/api/v3/breachedaccount/${encodeURIComponent(email)}`,
          {
            headers: {
              'hibp-api-key': hibpApiKey,
              'User-Agent': 'SentinelAI-CyberDefense-Platform'
            },
            timeout: 10000
          }
        )

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
          // Save breaches to database
          const breachPromises = response.data.map(breach => {
            const leakedData = []
            if (breach.DataClasses) {
              breach.DataClasses.forEach(dataClass => {
                if (dataClass.includes('Email')) leakedData.push('email')
                if (dataClass.includes('Password')) leakedData.push('password')
                if (dataClass.includes('Usernames')) leakedData.push('username')
                if (dataClass.includes('Phone')) leakedData.push('phone')
                if (dataClass.includes('Addresses')) leakedData.push('address')
                if (dataClass.includes('Credit')) leakedData.push('credit_card')
                if (breach.DataClasses.length === 0) leakedData.push('other')
              })
            }

            const severity = leakedData.includes('password') || leakedData.includes('credit_card') 
              ? 'critical' 
              : leakedData.length > 2 
                ? 'high' 
                : 'medium'

            return Breach.create({
              email: email.toLowerCase(),
              breachName: breach.Name,
              breachDate: breach.BreachDate ? new Date(breach.BreachDate) : new Date(),
              leakedData: leakedData.length > 0 ? leakedData : ['email'],
              severity,
              source: 'HaveIBeenPwned',
              description: breach.Description || '',
              recordCount: breach.PwnCount || 0,
              userId,
              verified: true
            }).catch(err => {
              // Ignore duplicate errors
              if (err.code !== 11000) console.error('Error saving breach:', err)
            })
          })

          await Promise.allSettled(breachPromises)

          // Fetch saved breaches
          const savedBreaches = await Breach.find({
            email: email.toLowerCase()
          }).sort({ checkedAt: -1 }).limit(20)

          const leaks = savedBreaches.map(b => ({
            id: b._id.toString(),
            email: b.email,
            breachSource: b.breachName,
            leakedData: b.leakedData,
            severity: b.severity,
            detectedAt: b.breachDate || b.checkedAt
          }))

          return res.json({
            email,
            leaksFound: leaks.length,
            leaks,
            severity: leaks.length > 0 
              ? leaks.some(b => b.severity === 'critical') ? 'critical' : 
                leaks.some(b => b.severity === 'high') ? 'high' : 'medium'
              : 'none',
            recommendation: leaks.length > 0
              ? 'Your email was found in data breaches. Please change your passwords immediately.'
              : 'No leaks found for this email address.',
          })
        } else {
          // No breaches found - save this result too
          await Breach.create({
            email: email.toLowerCase(),
            breachName: 'No Breaches Found',
            leakedData: [],
            severity: 'low',
            source: 'HaveIBeenPwned',
            userId,
            verified: true
          }).catch(() => {}) // Ignore errors

          return res.json({
            email,
            leaksFound: 0,
            leaks: [],
            severity: 'none',
            recommendation: 'No leaks found for this email address.',
          })
        }
      } catch (hibpError) {
        if (hibpError.response?.status === 404) {
          // No breaches found
          return res.json({
            email,
            leaksFound: 0,
            leaks: [],
            severity: 'none',
            recommendation: 'No leaks found for this email address.',
          })
        }
        console.error('HaveIBeenPwned API error:', hibpError.message)
        // Fall through to mock data fallback
      }
    }

    // Fallback to mock data if API not configured or fails
    const breaches = mockBreaches.filter(b => b.email === email)
    res.json({
      email,
      leaksFound: breaches.length,
      leaks: breaches,
      severity: breaches.length > 0 
        ? breaches.some(b => b.severity === 'critical') ? 'critical' : 'high'
        : 'none',
      recommendation: breaches.length > 0
        ? 'Your email was found in data breaches. Please change your passwords immediately.'
        : 'No leaks found for this email address.',
      note: 'Using mock data - configure HIBP_API_KEY for real breach checking'
    })
  } catch (error) {
    console.error('Check email error:', error)
    res.status(500).json({ message: 'Server error checking email' })
  }
}

export const getBreaches = async (req, res) => {
  try {
    const userId = req.user?.userId

    // REAL: Get breaches from database
    const query = userId ? { userId } : {}
    const breaches = await Breach.find(query)
      .sort({ checkedAt: -1 })
      .limit(100)
      .lean()

    if (breaches.length > 0) {
      const formattedBreaches = breaches.map(b => ({
        id: b._id.toString(),
        email: b.email,
        breachSource: b.breachName,
        leakedData: b.leakedData,
        severity: b.severity,
        detectedAt: b.breachDate || b.checkedAt,
        verified: b.verified
      }))

      const summary = {
        critical: breaches.filter(b => b.severity === 'critical').length,
        high: breaches.filter(b => b.severity === 'high').length,
        medium: breaches.filter(b => b.severity === 'medium').length,
        low: breaches.filter(b => b.severity === 'low').length,
      }

      return res.json({
        totalBreaches: breaches.length,
        breaches: formattedBreaches,
        summary,
      })
    }

    // Fallback to mock data if database is empty
    res.json({
      totalBreaches: mockBreaches.length,
      breaches: mockBreaches,
      summary: {
        critical: mockBreaches.filter(b => b.severity === 'critical').length,
        high: mockBreaches.filter(b => b.severity === 'high').length,
        medium: 0,
        low: 0,
      },
      note: 'Using mock data - no breaches in database'
    })
  } catch (error) {
    console.error('Get breaches error:', error)
    res.status(500).json({ message: 'Server error fetching breaches' })
  }
}

// Mock dark web search data
const mockSearchData = {
  categories: [
    {
      type: 'credential leaks',
      count: 7,
      description: 'Found credential leaks in multiple databases'
    },
    {
      type: 'database dumps',
      count: 3,
      description: 'Data breaches containing personal information'
    },
    {
      type: 'market listings',
      count: 2,
      description: 'Items related to this identifier for sale'
    },
    {
      type: 'ransomware mentions',
      count: 1,
      description: 'References in ransomware communications'
    }
  ]
}

// Mock compromised credentials data
const mockCredentialsData = {
  credentials: [
    {
      email: 'user@example.com',
      username: 'user123',
      passwordHash: '5baa61e4c9b93f3f0682250b6cf8331b7ee68fd8',
      breachSource: 'Data Breach 2023',
      dateExposed: '2023-06-15T00:00:00Z'
    },
    {
      email: 'john.doe@example.com',
      username: 'johndoe',
      passwordHash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',
      breachSource: 'Credential Dump 2024',
      dateExposed: '2024-02-20T00:00:00Z'
    },
    {
      email: 'test@example.com',
      username: 'testuser',
      passwordHash: 'a94a8fe5ccb19ba61c4c0873d391e987982fbbd3',
      breachSource: 'Forum Database',
      dateExposed: '2023-11-10T00:00:00Z'
    },
    {
      email: 'admin@example.com',
      username: 'admin',
      passwordHash: '0cc175b9c0f1b6a831c399e269772661',
      breachSource: 'Admin Panel Breach',
      dateExposed: '2023-08-05T00:00:00Z'
    },
    {
      email: 'support@example.com',
      username: 'support_team',
      passwordHash: '92eb5ffee6ae2fec3ad71c777531578f',
      breachSource: 'Customer Support Database',
      dateExposed: '2024-01-30T00:00:00Z'
    }
  ],
  total: 12
}

// Mock marketplace data
const mockMarketplaceData = {
  listings: [
    {
      marketplace: 'Dark0',
      title: 'Complete Email Database with Passwords',
      price: '$50',
      sellerRating: 4.2,
      availability: 'In Stock'
    },
    {
      marketplace: 'TorMarket',
      title: 'Breached Credentials Bundle - 1M+ Accounts',
      price: '$200',
      sellerRating: 4.8,
      availability: 'Limited Stock'
    },
    {
      marketplace: 'ShadowWeb',
      title: 'Personal Data Archives - Email Collections',
      price: '$75',
      sellerRating: 3.9,
      availability: 'Available'
    }
  ]
}

// Mock ransomware data
const mockRansomwareData = {
  groups: [
    {
      name: 'LockBit',
      recentVictims: ['Hospital Corp', 'Bank Systems'],
      country: 'Russia',
      severity: 'critical'
    },
    {
      name: 'Conti',
      recentVictims: ['Education University', 'Manufacturing Inc'],
      country: 'Russia',
      severity: 'high'
    },
    {
      name: 'REvil',
      recentVictims: ['Retail Chain', 'Tech Company'],
      country: 'Russia',
      severity: 'critical'
    }
  ]
}

// Mock pastebin/telegram leaks data
const mockPastesData = {
  leaks: [
    {
      source: 'pastebin',
      snippet: 'Found leaked credentials for user@example.com... password: qwerty123...',
      url: 'https://pastebin.com/abc123',
      tags: ['credentials', 'passwords', 'breach']
    },
    {
      source: 'telegram',
      snippet: 'Database dump containing 50k emails and hashes...',
      url: 'https://t.me/leaks_channel/123',
      tags: ['database', 'hashes', 'dump']
    },
    {
      source: 'pastebin',
      snippet: 'Configuration files with API keys and secrets...',
      url: 'https://pastebin.com/def456',
      tags: ['config', 'api', 'secrets']
    },
    {
      source: 'telegram',
      snippet: 'Ransomware communication logs from recent attack...',
      url: 'https://t.me/cyber_group/456',
      tags: ['ransomware', 'logs', 'malware']
    },
    {
      source: 'pastebin',
      snippet: 'Exposed source code with embedded passwords...',
      url: 'https://pastebin.com/ghi789',
      tags: ['source', 'code', 'passwords']
    }
  ]
}

// Mock exposure score data
const mockScoreData = {
  score: 72,
  level: 'High Risk',
  description: 'Your digital footprint shows significant exposure across multiple dark web sources.',
  recommendations: [
    'Enable two-factor authentication on all accounts',
    'Change passwords that may have been compromised',
    'Monitor financial accounts for unusual activity',
    'Use a password manager for secure credential storage',
    'Regularly review account access and connected applications'
  ]
}

export const searchLeaks = async (req, res) => {
  try {
    const { query } = req.query

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' })
    }

    // Mock search response
    res.json(mockSearchData)
  } catch (error) {
    console.error('Search leaks error:', error)
    res.status(500).json({ message: 'Server error searching leaks' })
  }
}

export const getCredentials = async (req, res) => {
  try {
    const { query } = req.query

    // Mock credentials response
    res.json(mockCredentialsData)
  } catch (error) {
    console.error('Get credentials error:', error)
    res.status(500).json({ message: 'Server error fetching credentials' })
  }
}

export const getMarketplace = async (req, res) => {
  try {
    // Mock marketplace response
    res.json(mockMarketplaceData)
  } catch (error) {
    console.error('Get marketplace error:', error)
    res.status(500).json({ message: 'Server error fetching marketplace data' })
  }
}

export const getRansomware = async (req, res) => {
  try {
    // Mock ransomware response
    res.json(mockRansomwareData)
  } catch (error) {
    console.error('Get ransomware error:', error)
    res.status(500).json({ message: 'Server error fetching ransomware data' })
  }
}

export const getPastes = async (req, res) => {
  try {
    // Mock pastes response
    res.json(mockPastesData)
  } catch (error) {
    console.error('Get pastes error:', error)
    res.status(500).json({ message: 'Server error fetching paste data' })
  }
}

export const getScore = async (req, res) => {
  try {
    // Mock score response
    res.json(mockScoreData)
  } catch (error) {
    console.error('Get score error:', error)
    res.status(500).json({ message: 'Server error fetching exposure score' })
  }
}

// New Dark Web Monitor functions - getBreaches with specified data structure
export const getBreachesExact = (req, res) => {
  const breaches = [
    {
      site: "LinkedIn",
      leaked: "Emails + Password Hashes",
      records: 1200000,
      date: "2025-01-04"
    },
    {
      site: "Dropbox",
      leaked: "Access Tokens",
      records: 230000,
      date: "2025-01-05"
    }
  ];
  res.status(200).json(breaches);
};

// New Dark Web Monitor functions - getExposedCredentials
export const getExposedCredentials = (req, res) => {
  const exposedCredentials = [
    { email: "user1@corp.com", password: "HASHED", source: "BreachForums" },
    { email: "ceo@corp.com", password: "HASHED", source: "RaidForums" }
  ];
  res.status(200).json(exposedCredentials);
};

// New Dark Web Monitor functions - getWarnings
export const getWarnings = (req, res) => {
  const warnings = [
    "Multiple corporate emails found in recent breach dumps.",
    "Possible credential stuffing activity detected.",
    "vpn.corp.com subdomain discussed on dark web channels."
  ];
  res.status(200).json(warnings);
};
