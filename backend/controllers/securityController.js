// Mock security score calculation
const calculateSecurityScore = (userId) => {
  // In real app, this would calculate based on:
  // - Password strength
  // - 2FA enabled
  // - Recent security incidents
  // - System health
  // - Threat detection rate

  const baseScore = 72
  const randomVariation = Math.floor(Math.random() * 20) - 10 // -10 to +10
  const score = Math.max(0, Math.min(100, baseScore + randomVariation))

  let level = 'Beginner'
  if (score >= 90) level = 'Expert'
  else if (score >= 80) level = 'Advanced'
  else if (score >= 70) level = 'Intermediate'
  else if (score >= 60) level = 'Defender Level'
  else if (score >= 50) level = 'Beginner'

  const riskLevel = score >= 80 ? 'good' : score >= 60 ? 'fair' : score >= 40 ? 'poor' : 'critical'

  return {
    score,
    level,
    riskLevel,
    weaknesses: [
      score < 80 ? 'Enable two-factor authentication' : null,
      score < 75 ? 'Update your passwords regularly' : null,
      score < 70 ? 'Review your security settings' : null,
    ].filter(Boolean),
    strengths: [
      score >= 80 ? 'Strong password policy' : null,
      score >= 75 ? 'Active threat monitoring' : null,
      score >= 70 ? 'Regular security updates' : null,
    ].filter(Boolean),
  }
}

// Mock security breakdown data
const generateSecurityBreakdown = () => {
  return {
    deviceSecurity: {
      title: 'Device Security',
      score: Math.floor(Math.random() * 30) + 70,
      items: [
        { label: 'Firewall Status', status: Math.random() > 0.2 ? 'active' : 'inactive', icon: '🔥' },
        { label: 'System Updates', status: Math.random() > 0.3 ? 'up-to-date' : 'outdated', icon: '⬆️' },
        { label: 'Antivirus', status: Math.random() > 0.1 ? 'active' : 'inactive', icon: '🛡️' }
      ]
    },
    accountSecurity: {
      title: 'Account Security',
      score: Math.floor(Math.random() * 25) + 60,
      items: [
        { label: '2FA Enabled', status: Math.random() > 0.4 ? 'enabled' : 'disabled', icon: '🔐' },
        { label: 'Password Strength', status: Math.random() > 0.3 ? 'strong' : 'weak', icon: '🔑' },
        { label: 'Recent Login Checks', status: Math.random() > 0.2 ? 'verified' : 'unverified', icon: '👤' }
      ]
    },
    networkSecurity: {
      title: 'Network Security',
      score: Math.floor(Math.random() * 40) + 50,
      items: [
        { label: 'WiFi Security', status: Math.random() > 0.5 ? 'secure' : 'insecure', icon: '📶' },
        { label: 'Exposed Ports', status: Math.random() > 0.7 ? 'none' : 'some', icon: '🔌' },
        { label: 'VPN Active', status: Math.random() > 0.6 ? 'active' : 'inactive', icon: '🌐' }
      ]
    },
    privacyScore: {
      title: 'Privacy Score',
      score: Math.floor(Math.random() * 35) + 55,
      items: [
        { label: 'Data Tracking', status: Math.random() > 0.4 ? 'minimized' : 'active', icon: '👁️' },
        { label: 'Data Leaks', status: Math.random() > 0.8 ? 'none' : 'detected', icon: '🔓' },
        { label: 'Privacy Settings', status: Math.random() > 0.3 ? 'optimized' : 'basic', icon: '⚙️' }
      ]
    }
  }
}





export const getSecurityScore = async (req, res) => {
  try {
    const userId = req.user?.userId
    const securityData = calculateSecurityScore(userId)
    res.json(securityData)
  } catch (error) {
    console.error('Get security score error:', error)
    res.status(500).json({ message: 'Server error fetching security score' })
  }
}

export const getSecurityBreakdown = async (req, res) => {
  try {
    const breakdown = generateSecurityBreakdown()
    res.json(breakdown)
  } catch (error) {
    console.error('Get security breakdown error:', error)
    res.status(500).json({ message: 'Server error fetching security breakdown' })
  }
}

export const getRiskFactors = async (req, res) => {
  try {
    const riskFactors = [
      { id: 1, title: 'Weak Password', description: 'Your password strength is below recommended levels', severity: 'high', icon: '🔑' },
      { id: 2, title: 'Exposed Email', description: 'Email address found in data breaches', severity: 'medium', icon: '📧' },
      { id: 3, title: 'Outdated Software', description: 'Several applications are running outdated versions', severity: 'high', icon: '📱' },
      { id: 4, title: 'Insecure Network', description: 'Connected to public WiFi without proper protections', severity: 'medium', icon: '📶' },
      { id: 5, title: 'Disabled 2FA', description: 'Two-factor authentication not enabled on key accounts', severity: 'high', icon: '🔐' }
    ]
    res.json(riskFactors)
  } catch (error) {
    console.error('Get risk factors error:', error)
    res.status(500).json({ message: 'Server error fetching risk factors' })
  }
}

export const getRecommendations = async (req, res) => {
  try {
    const recommendations = [
      {
        id: 1,
        title: 'Enable Two-Factor Authentication',
        description: 'Add an extra layer of security to your accounts',
        priority: 'high',
        category: 'account',
        effort: 'low'
      },
      {
        id: 2,
        title: 'Update All Software',
        description: 'Install latest security patches and updates',
        priority: 'high',
        category: 'system',
        effort: 'medium'
      },
      {
        id: 3,
        title: 'Use Password Manager',
        description: 'Generate and store strong, unique passwords',
        priority: 'medium',
        category: 'password',
        effort: 'low'
      },
      {
        id: 4,
        title: 'Review Privacy Settings',
        description: 'Check and optimize privacy controls on social media',
        priority: 'medium',
        category: 'privacy',
        effort: 'low'
      },
      {
        id: 5,
        title: 'Use VPN on Public Networks',
        description: 'Protect your connection when using public WiFi',
        priority: 'low',
        category: 'network',
        effort: 'low'
      }
    ]
    res.json(recommendations)
  } catch (error) {
    console.error('Get recommendations error:', error)
    res.status(500).json({ message: 'Server error fetching recommendations' })
  }
}

export const getSecurityHistory = async (req, res) => {
  try {
    const history = []
    const today = new Date()

    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)

      // Simulate score variation over time
      const baseScore = 75
      const variation = Math.sin(i * 0.5) * 15 + Math.random() * 10 - 5
      const score = Math.max(0, Math.min(100, baseScore + variation))

      history.push({
        date: date.toISOString().split('T')[0],
        score: Math.round(score),
        trend: i > 0 ? (score > history[i-1]?.score ? 'up' : score < history[i-1]?.score ? 'down' : 'stable') : 'stable'
      })
    }

    res.json(history.reverse())
  } catch (error) {
    console.error('Get security history error:', error)
    res.status(500).json({ message: 'Server error fetching security history' })
  }
}
