import threatIntelService from '../utils/threatIntelFeeds.js'
import Threat from '../models/Threat.js'

// Comprehensive threat intelligence check
export const checkIndicator = async (req, res) => {
  try {
    const { indicator, type = 'ip' } = req.body
    const userId = req.user?.userId

    if (!indicator) {
      return res.status(400).json({ message: 'Indicator is required' })
    }

    console.log(`🔍 Checking threat intelligence for ${type}: ${indicator}`)

    // Query all available feeds
    const result = await threatIntelService.comprehensiveLookup(indicator, type)

    // Log the lookup
    console.log(`📊 Threat intelligence result for ${indicator}:`, {
      type: result.type,
      severity: result.severity,
      confidence: result.confidence,
      sources: result.metadata?.allSources?.length || 1
    })

    // If threat found, save to database and potentially create incident
    if (result.confidence > 0 && result.type !== 'clean' && userId) {
      await threatIntelService.saveToDatabase(result, userId)
    }

    res.json({
      indicator,
      type,
      result,
      checkedAt: new Date(),
      queriedSources: result.metadata?.allSources ? Object.keys(result.metadata.allSources).length + 1 : 1
    })

  } catch (error) {
    console.error('Threat intelligence check error:', error)
    res.status(500).json({ message: 'Server error checking threat intelligence' })
  }
}

// Bulk threat intelligence check
export const bulkCheckIndicators = async (req, res) => {
  try {
    const { indicators, type = 'ip' } = req.body
    const userId = req.user?.userId

    if (!indicators || !Array.isArray(indicators) || indicators.length === 0) {
      return res.status(400).json({ message: 'Indicators array is required' })
    }

    if (indicators.length > 1000) {
      return res.status(400).json({ message: 'Maximum 1000 indicators per request' })
    }

    console.log(`🔍 Bulk checking ${indicators.length} ${type} indicators`)

    const results = await threatIntelService.bulkLookup(indicators, type)

    // Save threats to database
    const threatsFound = results.filter(r => r.confidence > 0 && r.type !== 'clean')
    if (threatsFound.length > 0 && userId) {
      const savePromises = threatsFound.map(threat => threatIntelService.saveToDatabase(threat, userId))
      await Promise.allSettled(savePromises)
    }

    // Calculate summary statistics
    const summary = {
      total: results.length,
      clean: results.filter(r => r.type === 'clean').length,
      suspicious: results.filter(r => r.type === 'suspicious').length,
      malware: results.filter(r => r.type === 'malware').length,
      phishing: results.filter(r => r.type === 'phishing').length,
      ransomware: results.filter(r => r.type === 'ransomware').length,
      apitoc: results.filter(r => r.type === 'apitoc' || r.type === 'c2-server').length,
      errors: results.filter(r => r.type === 'error').length,
      highSeverity: results.filter(r => r.severity === 'high' || r.severity === 'critical').length
    }

    res.json({
      type,
      count: indicators.length,
      results,
      summary,
      processedAt: new Date(),
      threatsFound: threatsFound.length,
      queriedSources: summary.total > 0 ? results[0]?.metadata?.allSources?.length + 1 || 1 : 0
    })

  } catch (error) {
    console.error('Bulk threat intelligence check error:', error)
    res.status(500).json({ message: 'Server error processing bulk threat intelligence check' })
  }
}

// Get recent threats from database
export const getRecentThreats = async (req, res) => {
  try {
    const { days = 30, limit = 100, sources, types, severities } = req.query
    const userId = req.user?.userId

    // Build query
    const query = {
      firstSeen: { $gte: new Date(Date.now() - days * 24 * 60 * 60 * 1000) }
    }

    // Add user filter for non-admin users (if implementing role-based access)
    if (userId) {
      query.$or = [
        { createdBy: userId },
        { createdBy: null } // Include global threats
      ]
    }

    // Apply filters
    if (sources) {
      query.source = { $in: sources.split(',') }
    }

    if (types) {
      query.type = { $in: types.split(',') }
    }

    if (severities) {
      query.severity = { $in: severities.split(',') }
    }

    const threats = await Threat.find(query)
      .sort({ lastSeen: -1 })
      .limit(parseInt(limit))
      .populate('createdBy', 'username')

    // Group by source for statistics
    const stats = {
      total: threats.length,
      bySource: {},
      byType: {},
      bySeverity: {},
      timeline: {}
    }

    threats.forEach(threat => {
      stats.bySource[threat.source] = (stats.bySource[threat.source] || 0) + 1
      stats.byType[threat.type] = (stats.byType[threat.type] || 0) + 1
      stats.bySeverity[threat.severity] = (stats.bySeverity[threat.severity] || 0) + 1

      // Timeline grouping by day
      const dayKey = threat.firstSeen.toISOString().split('T')[0]
      stats.timeline[dayKey] = (stats.timeline[dayKey] || 0) + 1
    })

    res.json({
      threats,
      stats,
      filters: { days, limit, sources, types, severities },
      queryTime: new Date()
    })

  } catch (error) {
    console.error('Get recent threats error:', error)
    res.status(500).json({ message: 'Server error retrieving recent threats' })
  }
}

// Search threats by indicator or metadata
export const searchThreats = async (req, res) => {
  try {
    const { q, type, source, limit = 50 } = req.query

    if (!q) {
      return res.status(400).json({ message: 'Search query is required' })
    }

    const searchRegex = new RegExp(q, 'i')

    const query = {
      $or: [
        { indicator: searchRegex },
        { type: searchRegex },
        { source: searchRegex },
        { details: searchRegex },
        { 'metadata.pulseName': searchRegex },
        { 'metadata.tags': { $in: [searchRegex] } }
      ]
    }

    // Apply type filter
    if (type && type !== 'all') {
      query.type = type
    }

    // Apply source filter
    if (source && source !== 'all') {
      query.source = source
    }

    const threats = await Threat.find(query)
      .sort({ lastSeen: -1 })
      .limit(parseInt(limit))
      .populate('createdBy', 'username')

    res.json({
      query: q,
      totalFound: threats.length,
      results: threats,
      filters: { type, source },
      searchedAt: new Date()
    })

  } catch (error) {
    console.error('Search threats error:', error)
    res.status(500).json({ message: 'Server error searching threats' })
  }
}

// Get threat intelligence feed status
export const getFeedStatus = async (req, res) => {
  try {
    const status = threatIntelService.getStatus()

    // Add additional stats
    const recentThreats = await Threat.countDocuments({
      firstSeen: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    })

    const totalThreats = await Threat.countDocuments()
    const lastUpdate = await Threat.findOne().sort({ updatedAt: -1 })

    status.recentActivity = {
      last24hThreats: recentThreats,
      totalThreats,
      lastUpdate: lastUpdate?.updatedAt || null
    }

    res.json(status)

  } catch (error) {
    console.error('Get feed status error:', error)
    res.status(500).json({ message: 'Server error retrieving feed status' })
  }
}

// Test connectivity to threat intelligence feeds
export const testFeedConnectivity = async (req, res) => {
  try {
    console.log('🔧 Testing threat intelligence feed connectivity')

    const connectivityResults = await threatIntelService.testConnectivity()

    // Calculate overall status
    const feeds = Object.values(connectivityResults.feeds)
    const connectedCount = feeds.filter(f => f.status === 'connected').length
    const overallStatus = connectedCount === feeds.length ? 'healthy' :
                         connectedCount > 0 ? 'partial' : 'offline'

    res.json({
      ...connectivityResults,
      summary: {
        totalFeeds: feeds.length,
        connectedFeeds: connectedCount,
        offlineFeeds: feeds.length - connectedCount,
        overallStatus
      }
    })

  } catch (error) {
    console.error('Test feed connectivity error:', error)
    res.status(500).json({ message: 'Server error testing feed connectivity' })
  }
}

// Get threat statistics and trends
export const getThreatStatistics = async (req, res) => {
  try {
    const { days = 7, groupBy = 'day' } = req.query

    // Get date range
    const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000)

    const pipeline = [
      {
        $match: {
          firstSeen: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: {
            [groupBy]: {
              $dateToString: { format: groupBy === 'day' ? '%Y-%m-%d' : '%Y-%m-%d %H:00', date: '$firstSeen' }
            }
          },
          count: { $sum: 1 },
          byType: { $push: '$type' },
          bySource: { $push: '$source' },
          bySeverity: { $push: '$severity' }
        }
      },
      {
        $sort: { '_id.day': 1 }
      }
    ]

    const stats = await Threat.aggregate(pipeline)

    // Process aggregated data
    const processedStats = stats.map(item => {
      const types = {}
      const sources = {}
      const severities = {}

      item.byType.forEach(type => types[type] = (types[type] || 0) + 1)
      item.bySource.forEach(source => sources[source] = (sources[source] || 0) + 1)
      item.bySeverity.forEach(severity => severities[severity] = (severities[severity] || 0) + 1)

      return {
        date: item._id.day,
        total: item.count,
        byType: types,
        bySource: sources,
        bySeverity: severities
      }
    })

    // Get overall statistics
    const allTimeStats = await Threat.aggregate([
      {
        $group: {
          _id: null,
          totalThreats: { $sum: 1 },
          byType: { $push: '$type' },
          bySource: { $push: '$source' },
          bySeverity: { $push: '$severity' }
        }
      }
    ])

    let overallStats = {}
    if (allTimeStats.length > 0) {
      const data = allTimeStats[0]
      const types = {}
      const sources = {}
      const severities = {}

      data.byType.forEach(type => types[type] = (types[type] || 0) + 1)
      data.bySource.forEach(source => sources[source] = (sources[source] || 0) + 1)
      data.bySeverity.forEach(severity => severities[severity] = (severities[severity] || 0) + 1)

      overallStats = {
        totalThreats: data.totalThreats,
        byType: types,
        bySource: sources,
        bySeverity: severities
      }
    }

    res.json({
      period: `${days} days`,
      groupBy,
      timeline: processedStats,
      overall: overallStats,
      generatedAt: new Date()
    })

  } catch (error) {
    console.error('Get threat statistics error:', error)
    res.status(500).json({ message: 'Server error retrieving threat statistics' })
  }
}

// Get threat intelligence report for a specific indicator
export const getIndicatorReport = async (req, res) => {
  try {
    const { indicator } = req.params

    if (!indicator) {
      return res.status(404).json({ message: 'Indicator not found in path' })
    }

    // Get threat data from database
    const threats = await Threat.find({
      indicator: { $regex: new RegExp(`^${indicator}$`, 'i') }
    }).sort({ lastSeen: -1 })

    if (threats.length === 0) {
      return res.status(404).json({ message: 'No threat intelligence found for this indicator' })
    }

    // Get the most recent threat
    const latestThreat = threats[0]

    // Generate detailed report
    const report = {
      indicator,
      currentStatus: {
        type: latestThreat.type,
        severity: latestThreat.severity,
        confidence: latestThreat.confidence,
        source: latestThreat.source,
        firstSeen: latestThreat.firstSeen,
        lastSeen: latestThreat.lastSeen
      },
      metadata: latestThreat.metadata || {},
      allObservations: threats.map(t => ({
        type: t.type,
        source: t.source,
        severity: t.severity,
        confidence: t.confidence,
        observedAt: t.lastSeen,
        details: t.details
      })),
      details: latestThreat.details,
      analystNotes: latestThreat.metadata?.comment || 'No additional notes available',
      requestedAt: new Date()
    }

    res.json(report)

  } catch (error) {
    console.error('Get indicator report error:', error)
    res.status(500).json({ message: 'Server error generating indicator report' })
  }
}
