import { threatOverviewData, iocLookupData } from '../data/threatData.js'

export const getThreats = async (req, res) => {
  try {
    // Add some randomization to mock real-time data
    const totalAttacks = threatOverviewData.totalAttacks24h + Math.floor(Math.random() * 50)
    const data = {
      ...threatOverviewData,
      totalAttacks24h: totalAttacks
    }

    res.json(data)
  } catch (error) {
    console.error('Get threat overview error:', error)
    res.status(500).json({ message: 'Server error fetching threat overview' })
  }
}

export const lookupIOC = async (req, res) => {
  try {
    const { query } = req.query

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' })
    }

    let result = null
    let type = 'unknown'

    // Check if it's an IP
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query)) {
      result = iocLookupData.ip[query]
      type = 'ip'
    }
    // Check if it's a domain
    else if (query.includes('.') && query.length > 3) {
      result = iocLookupData.domain[query]
      type = 'domain'
    }
    // Check if it's a hash
    else if (/^[a-f0-9]{32,64}$/i.test(query)) {
      result = iocLookupData.hash[query]
      type = 'hash'
    }

    if (!result) {
      return res.json({
        found: false,
        type: type,
        query: query,
        message: 'No threat intelligence found for this query'
      })
    }

    res.json({
      found: true,
      type: type,
      query: query,
      data: result
    })
  } catch (error) {
    console.error('IOC lookup error:', error)
    res.status(500).json({ message: 'Server error during IOC lookup' })
  }
}

export const getGlobalThreats = async (req, res) => {
  try {
    // Mock global threats data
    res.json({
      globalStats: {
        totalAttacks: 15420,
        blockedThreats: 14350,
        activeThreats: 1070
      },
      countryStats: [
        { country: 'United States', attacks: 3240, color: '#ef4444' },
        { country: 'China', attacks: 2850, color: '#f97316' },
        { country: 'Russia', attacks: 2230, color: '#eab308' },
        { country: 'North Korea', attacks: 1850, color: '#22c55e' },
        { country: 'Iran', attacks: 1620, color: '#3b82f6' }
      ]
    })
  } catch (error) {
    console.error('Get global threats error:', error)
    res.status(500).json({ message: 'Server error fetching global threats' })
  }
}

export const createThreat = async (req, res) => {
  try {
    const threatData = {
      id: Date.now(),
      ...req.body,
      createdAt: new Date()
    }

    // In practice, save to database
    console.log('Threat created:', threatData)

    res.json(threatData)
  } catch (error) {
    console.error('Create threat error:', error)
    res.status(500).json({ message: 'Server error creating threat' })
  }
}

export const updateThreat = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    const updatedThreat = {
      id: parseInt(id),
      ...updates,
      updatedAt: new Date()
    }

    // In practice, update in database
    console.log('Threat updated:', updatedThreat)

    res.json(updatedThreat)
  } catch (error) {
    console.error('Update threat error:', error)
    res.status(500).json({ message: 'Server error updating threat' })
  }
}

export const deleteThreat = async (req, res) => {
  try {
    const { id } = req.params

    // In practice, delete from database
    console.log('Threat deleted:', id)

    res.json({ id: parseInt(id), deleted: true })
  } catch (error) {
    console.error('Delete threat error:', error)
    res.status(500).json({ message: 'Server error deleting threat' })
  }
}

export const getHeatmap = async (req, res) => {
  try {
    // Mock heatmap data with region intensities
    const heatmapData = {
      regions: [
        { region: 'North America', threatLevel: 'Critical', intensity: 85, attacks: 3240 },
        { region: 'Europe', threatLevel: 'High', intensity: 72, attacks: 2850 },
        { region: 'Asia', threatLevel: 'Critical', intensity: 91, attacks: 4100 },
        { region: 'Middle East', threatLevel: 'High', intensity: 68, attacks: 2230 },
        { region: 'South America', threatLevel: 'Medium', intensity: 54, attacks: 1850 },
        { region: 'Africa', threatLevel: 'Medium', intensity: 43, attacks: 1620 },
        { region: 'Oceania', threatLevel: 'Low', intensity: 29, attacks: 890 }
      ],
      totalGlobalAttacks: 16880,
      lastUpdated: new Date().toISOString()
    }

    res.json(heatmapData)
  } catch (error) {
    console.error('Get heatmap error:', error)
    res.status(500).json({ message: 'Server error fetching heatmap data' })
  }
}

export const getSeverityStats = async (req, res) => {
  try {
    res.json(threatOverviewData.severityLevels)
  } catch (error) {
    console.error('Get severity stats error:', error)
    res.status(500).json({ message: 'Server error fetching severity stats' })
  }
}

export const getTrends = async (req, res) => {
  try {
    res.json(threatOverviewData.monthlyTrend)
  } catch (error) {
    console.error('Get trends error:', error)
    res.status(500).json({ message: 'Server error fetching trends data' })
  }
}

export const getThreatFeed = async (req, res) => {
  try {
    const threatFeed = threatOverviewData.recentAttacks.map(attack => ({
      ...attack,
      severity: attack.level,
      source: attack.source,
      target: 'Corporate Network',
      vector: attack.type,
      timestamp: attack.timestamp
    }))

    res.json({ threats: threatFeed })
  } catch (error) {
    console.error('Get threat feed error:', error)
    res.status(500).json({ message: 'Server error fetching threat feed' })
  }
}

export const getMitreMatrix = async (req, res) => {
  try {
    res.json({ techniques: threatOverviewData.mitreFindings })
  } catch (error) {
    console.error('Get MITRE matrix error:', error)
    res.status(500).json({ message: 'Server error fetching MITRE matrix' })
  }
}

export const getCorrelationEngine = async (req, res) => {
  try {
    const correlations = {
      connectedIOCs: [
        { ioc: '192.168.1.100', type: 'IP', linkedThreats: 3, similarity: 0.95 },
        { ioc: 'malicious-site.com', type: 'Domain', linkedThreats: 5, similarity: 0.87 },
        { ioc: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', type: 'Hash', linkedThreats: 2, similarity: 0.91 }
      ],
      attackClusters: [
        { clusterId: 'CLUSTER-001', threatCount: 12, pattern: 'Brute Force Campaign', confidence: 0.89 },
        { clusterId: 'CLUSTER-002', threatCount: 8, pattern: 'Phishing Wave', confidence: 0.94 },
        { clusterId: 'CLUSTER-003', threatCount: 15, pattern: 'Malware Distribution', confidence: 0.76 }
      ],
      patternSimilarity: [
        { pattern: 'SQL Injection Patterns', matchCount: 23, similarityScore: 0.82 },
        { pattern: 'PowerShell Scripts', matchCount: 34, similarityScore: 0.78 },
        { pattern: 'Credential Stuffing', matchCount: 18, similarityScore: 0.91 }
      ]
    }

    res.json(correlations)
  } catch (error) {
    console.error('Get correlation engine error:', error)
    res.status(500).json({ message: 'Server error fetching correlation data' })
  }
}
