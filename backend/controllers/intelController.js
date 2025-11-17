// Mock threat intelligence data
const getMockIntelFeed = () => {
  return [
    {
      id: '1',
      title: 'New Ransomware Variant Detected',
      description: 'A new variant of LockBit ransomware has been identified targeting financial institutions.',
      severity: 'critical',
      source: 'Threat Intelligence Feed',
      publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      tags: ['ransomware', 'financial', 'critical'],
    },
    {
      id: '2',
      title: 'Zero-Day Exploit in Popular CMS',
      description: 'Security researchers have discovered a zero-day vulnerability affecting WordPress installations.',
      severity: 'high',
      source: 'CVE Database',
      publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      tags: ['zero-day', 'cms', 'wordpress'],
    },
    {
      id: '3',
      title: 'Phishing Campaign Targets Healthcare',
      description: 'Large-scale phishing campaign targeting healthcare organizations with credential theft.',
      severity: 'high',
      source: 'Security Alert',
      publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
      tags: ['phishing', 'healthcare', 'credentials'],
    },
  ]
}

export const getIntelFeed = async (req, res) => {
  try {
    res.json(getMockIntelFeed())
  } catch (error) {
    console.error('Get intel feed error:', error)
    res.status(500).json({ message: 'Server error fetching threat intelligence' })
  }
}

export const getIntelSummary = async (req, res) => {
  try {
    res.json({
      totalThreats: 1247,
      critical: 23,
      high: 156,
      medium: 892,
      low: 176,
      lastUpdated: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Get intel summary error:', error)
    res.status(500).json({ message: 'Server error fetching intel summary' })
  }
}

export const getMalwareTrends = async (req, res) => {
  try {
    res.json({
      trends: [
        { type: 'Ransomware', count: 234, trend: 'up', percentage: 18.7 },
        { type: 'Trojan', count: 189, trend: 'down', percentage: 15.1 },
        { type: 'Spyware', count: 156, trend: 'up', percentage: 12.5 },
        { type: 'Adware', count: 134, trend: 'stable', percentage: 10.7 },
        { type: 'Worm', count: 98, trend: 'down', percentage: 7.8 },
      ],
      period: 'Last 30 days',
    })
  } catch (error) {
    console.error('Get malware trends error:', error)
    res.status(500).json({ message: 'Server error fetching malware trends' })
  }
}

export const getTechniques = async (req, res) => {
  try {
    res.json({
      techniques: [
        {
          id: 'T1059',
          name: 'Command and Scripting Interpreter',
          description: 'Adversaries may abuse command and script interpreters to execute commands.',
          prevalence: 'high',
          examples: ['PowerShell', 'Bash', 'Python'],
        },
        {
          id: 'T1071',
          name: 'Application Layer Protocol',
          description: 'Adversaries may communicate using application layer protocols.',
          prevalence: 'medium',
          examples: ['HTTP', 'HTTPS', 'DNS'],
        },
        {
          id: 'T1566',
          name: 'Phishing',
          description: 'Adversaries may send phishing messages to gain access to victim systems.',
          prevalence: 'high',
          examples: ['Spearphishing', 'Whaling', 'Vishing'],
        },
      ],
    })
  } catch (error) {
    console.error('Get techniques error:', error)
    res.status(500).json({ message: 'Server error fetching attack techniques' })
  }
}

