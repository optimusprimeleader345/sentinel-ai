import Threat from '../models/Threat.js'
import { threatOverviewData } from '../data/threatData.js' // Fallback data
import threatIntelFeeds from '../utils/threatIntelFeeds.js'

export const getThreats = async (req, res) => {
  try {
    // REAL: Query from MongoDB
    const now = new Date()
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    // Get active threats from last 24 hours
    const activeThreats = await Threat.find({
      status: 'active',
      createdAt: { $gte: last24Hours }
    })
      .sort({ 'intelligence.riskScore': -1, createdAt: -1 })
      .limit(50)
      .lean()

    // Get blocked/mitigated threats
    const blockedAttacks = await Threat.find({
      status: 'mitigated',
      createdAt: { $gte: last24Hours }
    })
      .sort({ createdAt: -1 })
      .limit(20)
      .lean()

    // Aggregate statistics
    const stats = await Threat.aggregate([
      {
        $match: {
          createdAt: { $gte: last24Hours }
        }
      },
      {
        $group: {
          _id: '$severity',
          count: { $sum: 1 }
        }
      }
    ])

    const criticalThreats = stats.find(s => s._id === 'critical')?.count || 0
    const highThreats = stats.find(s => s._id === 'high')?.count || 0
    const totalAttacks24h = activeThreats.length

    // Determine risk level
    let riskLevel = 'LOW'
    if (criticalThreats > 5 || totalAttacks24h > 100) riskLevel = 'HIGH'
    else if (criticalThreats > 2 || totalAttacks24h > 50) riskLevel = 'MEDIUM'

    // Format response to match frontend expectations
    const data = {
      totalAttacks24h,
      criticalThreats,
      highThreats,
      activeThreats: activeThreats.map(threat => ({
        id: threat._id.toString(),
        type: threat.type,
        severity: threat.severity,
        level: threat.severity,
        source: threat.source,
        description: threat.metadata?.description || 'Threat detected',
        timestamp: threat.createdAt,
        riskScore: threat.intelligence?.riskScore || 50,
        confidence: threat.confidence
      })),
      blockedAttacks: blockedAttacks.map(threat => ({
        id: threat._id.toString(),
        type: threat.type,
        severity: threat.severity,
        level: threat.severity,
        source: threat.source,
        timestamp: threat.createdAt
      })),
      recentEvents: activeThreats.slice(0, 10).map(threat => ({
        id: threat._id.toString(),
        type: threat.type,
        severity: threat.severity,
        timestamp: threat.createdAt
      })),
      riskLevel,
      severityLevels: {
        critical: criticalThreats,
        high: highThreats,
        medium: stats.find(s => s._id === 'medium')?.count || 0,
        low: stats.find(s => s._id === 'low')?.count || 0
      },
      aiPredictions: [] // Can be enhanced with AI predictions later
    }

    res.json(data)
  } catch (error) {
    console.error('Get threat overview error:', error)
    // Fallback to mock data if database fails
    const totalAttacks = threatOverviewData.totalAttacks24h + Math.floor(Math.random() * 50)
    res.json({
      ...threatOverviewData,
      totalAttacks24h: totalAttacks,
      activeThreats: threatOverviewData.recentAttacks || [],
      blockedAttacks: threatOverviewData.recentAttacks?.filter(attack => attack.level === 'High') || [],
      recentEvents: threatOverviewData.recentAttacks || [],
      riskLevel: threatOverviewData.criticalThreats > 5 ? 'HIGH' : threatOverviewData.criticalThreats > 2 ? 'MEDIUM' : 'LOW',
      aiPredictions: threatOverviewData.aiRecommendations || []
    })
  }
}

export const lookupIOC = async (req, res) => {
  try {
    const { query } = req.query

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' })
    }

    // Determine IOC type
    let type = 'unknown'
    if (/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(query)) {
      type = 'ip'
    } else if (query.includes('.') && query.length > 3) {
      type = 'domain'
    } else if (/^[a-f0-9]{32,64}$/i.test(query)) {
      type = 'hash'
    }

    // REAL: Check database first
    const dbThreat = await Threat.findOne({
      'indicator.value': query,
      'indicator.type': type
    }).lean()

    if (dbThreat) {
      return res.json({
        found: true,
        type: type,
        query: query,
        data: {
          indicator: dbThreat.indicator.value,
          type: dbThreat.type,
          severity: dbThreat.severity,
          confidence: dbThreat.confidence,
          source: dbThreat.source,
          description: dbThreat.metadata?.description || 'Threat found in database',
          firstSeen: dbThreat.intelligence?.firstSeen,
          lastSeen: dbThreat.intelligence?.lastSeen,
          riskScore: dbThreat.intelligence?.riskScore
        }
      })
    }

    // REAL: Use threat intelligence feeds if not in database
    const intelService = new threatIntelFeeds()
    const threatIntel = await intelService.comprehensiveLookup(query, type)

    if (threatIntel && threatIntel.confidence > 0 && threatIntel.type !== 'clean') {
      // Save to database for future lookups
      const userId = req.user?.userId
      await intelService.saveToDatabase({
        indicator: {
          type: type,
          value: query
        },
        type: threatIntel.type,
        severity: threatIntel.severity,
        confidence: threatIntel.confidence,
        source: threatIntel.source,
        metadata: {
          description: threatIntel.details,
          ...threatIntel.metadata
        },
        intelligence: {
          riskScore: threatIntel.confidence,
          firstSeen: new Date(),
          lastSeen: new Date()
        }
      }, userId)

      return res.json({
        found: true,
        type: type,
        query: query,
        data: threatIntel
      })
    }

    // No threat found
    res.json({
      found: false,
      type: type,
      query: query,
      message: 'No threat intelligence found for this query'
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
    const userId = req.user?.userId

    // REAL: Save to MongoDB
    const threat = new Threat({
      indicator: {
        type: req.body.indicatorType || 'ioc',
        value: req.body.indicatorValue || req.body.indicator
      },
      type: req.body.type || 'other',
      severity: req.body.severity || 'medium',
      confidence: req.body.confidence || 50,
      source: req.body.source || 'manual',
      metadata: {
        description: req.body.description || '',
        attackVector: req.body.attackVector,
        targetedEntity: req.body.targetedEntity,
        ...req.body.metadata
      },
      intelligence: {
        riskScore: req.body.riskScore || 50,
        firstSeen: new Date(),
        lastSeen: new Date()
      },
      createdBy: userId
    })

    const savedThreat = await threat.save()

    res.status(201).json({
      id: savedThreat._id.toString(),
      ...savedThreat.toObject(),
      createdAt: savedThreat.createdAt
    })
  } catch (error) {
    console.error('Create threat error:', error)
    res.status(500).json({ message: 'Server error creating threat', error: error.message })
  }
}

export const updateThreat = async (req, res) => {
  try {
    const { id } = req.params
    const updates = req.body

    // REAL: Update in MongoDB
    const threat = await Threat.findByIdAndUpdate(
      id,
      {
        ...updates,
        'intelligence.lastSeen': new Date(),
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    )

    if (!threat) {
      return res.status(404).json({ message: 'Threat not found' })
    }

    res.json({
      id: threat._id.toString(),
      ...threat.toObject(),
      updatedAt: threat.updatedAt
    })
  } catch (error) {
    console.error('Update threat error:', error)
    res.status(500).json({ message: 'Server error updating threat', error: error.message })
  }
}

export const deleteThreat = async (req, res) => {
  try {
    const { id } = req.params

    // REAL: Delete from MongoDB (or mark as inactive)
    const threat = await Threat.findByIdAndUpdate(
      id,
      { status: 'inactive' }, // Soft delete - mark as inactive
      { new: true }
    )

    if (!threat) {
      return res.status(404).json({ message: 'Threat not found' })
    }

    // Optionally hard delete:
    // await Threat.findByIdAndDelete(id)

    res.json({ id: id, deleted: true, status: 'inactive' })
  } catch (error) {
    console.error('Delete threat error:', error)
    res.status(500).json({ message: 'Server error deleting threat', error: error.message })
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
    // REAL: Get recent threats from database
    const threats = await Threat.find({
      status: 'active'
    })
      .sort({ createdAt: -1 })
      .limit(50)
      .lean()

    const threatFeed = threats.map(threat => ({
      id: threat._id.toString(),
      type: threat.type,
      severity: threat.severity,
      level: threat.severity,
      source: threat.source,
      target: threat.metadata?.targetedEntity || 'Corporate Network',
      vector: threat.metadata?.attackVector || threat.type,
      timestamp: threat.createdAt,
      description: threat.metadata?.description || 'Threat detected',
      confidence: threat.confidence,
      riskScore: threat.intelligence?.riskScore || 50
    }))

    res.json({ threats: threatFeed })
  } catch (error) {
    console.error('Get threat feed error:', error)
    // Fallback to mock data
    const threatFeed = threatOverviewData.recentAttacks.map(attack => ({
      ...attack,
      severity: attack.level,
      source: attack.source,
      target: 'Corporate Network',
      vector: attack.type,
      timestamp: attack.timestamp
    }))
    res.json({ threats: threatFeed })
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
