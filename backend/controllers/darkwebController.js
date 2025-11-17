// Mock dark web breach data
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

    if (!email) {
      return res.status(400).json({ message: 'Email parameter is required' })
    }

    // Mock check - in real app, this would query a breach database
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
    })
  } catch (error) {
    console.error('Check email error:', error)
    res.status(500).json({ message: 'Server error checking email' })
  }
}

export const getBreaches = async (req, res) => {
  try {
    const userId = req.user?.userId

    // Return mock breach data
    res.json({
      totalBreaches: mockBreaches.length,
      breaches: mockBreaches,
      summary: {
        critical: mockBreaches.filter(b => b.severity === 'critical').length,
        high: mockBreaches.filter(b => b.severity === 'high').length,
        medium: 0,
        low: 0,
      },
    })
  } catch (error) {
    console.error('Get breaches error:', error)
    res.status(500).json({ message: 'Server error fetching breaches' })
  }
}

