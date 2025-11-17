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

  return {
    score,
    level,
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

