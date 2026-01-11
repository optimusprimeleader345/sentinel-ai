import axios from 'axios'
import Threat from '../models/Threat.js'

class ThreatIntelService {
  constructor() {
    this.otxApiKey = process.env.OTX_API_KEY
    this.mispApiKey = process.env.MISP_API_KEY
    this.mispUrl = process.env.MISP_URL

    this.feeds = {
      otx: {
        enabled: !!this.otxApiKey,
        name: 'AlienVault OTX',
        url: 'https://otx.alienvault.com/api/v1',
        lastSync: null,
        pulseCount: 0
      },
      misp: {
        enabled: !!this.mispApiKey && !!this.mispUrl,
        name: 'MISP Platform',
        url: this.mispUrl,
        lastSync: null,
        eventCount: 0
      }
    }

    // Intelligence cache to avoid duplicate API calls
    this.cache = new Map()
    this.cacheTimeout = 5 * 60 * 1000 // 5 minutes
  }

  // AlienVault OTX (Open Threat Exchange) Integration
  async queryOTX(indicator, type = 'ip') {
    if (!this.feeds.otx.enabled) {
      console.warn('OTX not configured - OTX_API_KEY missing')
      return null
    }

    try {
      const cacheKey = `otx-${type}-${indicator}`
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey)
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          return cached.data
        }
      }

      console.log(`🔍 Querying OTX for ${type}: ${indicator}`)

      const response = await axios.get(`${this.feeds.otx.url}/indicators/${type}/${indicator}`, {
        headers: {
          'X-OTX-API-KEY': this.otxApiKey,
          'Accept': 'application/json'
        },
        timeout: 10000
      })

      const result = this.processOTXResult(response.data, indicator, type)

      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      })

      this.feeds.otx.lastSync = new Date()
      return result

    } catch (error) {
      console.error('OTX API error:', error.message)
      return null
    }
  }

  // Process OTX API response
  processOTXResult(data, indicator, type) {
    if (!data) return null

    // Get the most recent pulse (threat intelligence report)
    const latestPulse = data.pulse_info?.pulses?.[0]

    if (!latestPulse) {
      return {
        indicator,
        type: 'clean',
        confidence: 0,
        source: 'otx',
        reputation: 'clean',
        details: 'No threat intelligence found'
      }
    }

    // Determine threat level based on OTX pulse
    const threatLevel = this.getOTXThreatLevel(latestPulse)

    return {
      indicator,
      type: threatLevel.type,
      severity: threatLevel.severity,
      confidence: latestPulse.confidence || 50,
      source: 'otx',
      metadata: {
        pulseId: latestPulse.id,
        pulseName: latestPulse.name,
        author: latestPulse.author?.username,
        tags: latestPulse.tags || [],
        description: latestPulse.description,
        created: latestPulse.created,
        modified: latestPulse.modified,
        references: latestPulse.references || [],
        indicators: latestPulse.indicators_count
      },
      details: `${latestPulse.name}: ${latestPulse.description || 'Unknown threat pattern'}`
    }
  }

  // Determine threat level from OTX pulse data
  getOTXThreatLevel(pulse) {
    const threatLevel = {
      type: 'suspicious',
      severity: 'medium'
    }

    // Check tags for threat classification
    const maliciousTags = [
      'malware', 'ransomware', 'trojan', 'worm', 'spyware', 'bec',
      'phishing', 'apt', 'c2', 'command-and-control', 'backdoor',
      'exploit', 'vulnerability', 'zero-day', 'advanced-persistent-threat'
    ]

    const pulseTags = pulse.tags?.map(tag => tag.toLowerCase()) || []

    const hasMaliciousTags = maliciousTags.some(tag =>
      pulseTags.some(pulseTag => pulseTag.includes(tag))
    )

    if (hasMaliciousTags) {
      threatLevel.severity = 'high'
      threatLevel.type = pulseTags.includes('ransomware') ? 'ransomware' :
                         pulseTags.includes('phishing') ? 'phishing' :
                         pulseTags.includes('api') ? 'aptioc' :
                         'malware'
    }

    // Adjust based on confidence score
    if (pulse.confidence) {
      if (pulse.confidence >= 80) {
        threatLevel.severity = 'critical'
      } else if (pulse.confidence >= 60) {
        threatLevel.severity = threatLevel.severity === 'low' ? 'medium' : threatLevel.severity
      }
    }

    return threatLevel
  }

  // MISP (Malware Information Sharing Platform) Integration
  async queryMISP(indicator, type = 'ip') {
    if (!this.feeds.misp.enabled) {
      console.warn('MISP not configured - MISP_API_KEY or MISP_URL missing')
      return null
    }

    try {
      const cacheKey = `misp-${type}-${indicator}`
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey)
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          return cached.data
        }
      }

      console.log(`🔍 Querying MISP for ${type}: ${indicator}`)

      // Search for indicators in MISP
      const searchResponse = await axios.post(`${this.mispUrl}/attributes/restSearch`, {
        value: indicator,
        type: this.mapToMISPType(type),
        published: true,
        to_ids: true,
        returnFormat: 'json'
      }, {
        headers: {
          'Authorization': this.mispApiKey,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 15000
      })

      let result = null

      if (searchResponse.data && searchResponse.data.Attribute && searchResponse.data.Attribute.length > 0) {
        result = this.processMISPResult(searchResponse.data.Attribute[0], indicator, type)
      } else {
        result = {
          indicator,
          type: 'clean',
          confidence: 0,
          source: 'misp',
          reputation: 'clean',
          details: 'No matching indicators found in MISP'
        }
      }

      // Cache the result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      })

      this.feeds.misp.lastSync = new Date()
      return result

    } catch (error) {
      console.error('MISP API error:', error.message)
      return null
    }
  }

  // Process MISP API response
  processMISPResult(attribute, indicator, type) {
    if (!attribute) return null

    const eventId = attribute.event_id
    const tags = attribute.Tag || []

    return {
      indicator,
      type: this.getMISPIndicatorType(tags),
      severity: this.getMISPSeverity(tags),
      confidence: 90, // MISP indicators are typically high confidence
      source: 'misp',
      metadata: {
        eventId,
        attributeId: attribute.id,
        category: attribute.category,
        type: attribute.type,
        toIds: attribute.to_ids,
        tags: tags.map(tag => tag.name),
        comment: attribute.comment,
        timestamp: attribute.timestamp
      },
      details: `${attribute.category}: ${attribute.comment || 'Shared intelligence indicator'}`
    }
  }

  // Map SentinelAI types to MISP attribute types
  mapToMISPType(type) {
    const typeMap = {
      ip: 'ip-dst|ip-src',
      domain: 'domain|hostname',
      url: 'url',
      email: 'email-src|email-dst',
      hash: 'md5|sha1|sha256',
      file: 'filename'
    }
    return typeMap[type] || type
  }

  // Determine indicator type from MISP tags
  getMISPIndicatorType(tags) {
    const tagNames = tags.map(tag => tag.name.toLowerCase())

    if (tagNames.some(tag => tag.includes('malware') || tag.includes('ransomware'))) {
      return 'malware'
    }
    if (tagNames.some(tag => tag.includes('phishing') || tag.includes('spam'))) {
      return 'phishing'
    }
    if (tagNames.some(tag => tag.includes('c2') || tag.includes('command'))) {
      return 'c2-server'
    }
    if (tagNames.some(tag => tag.includes('apt') || tag.includes('advanced'))) {
      return 'aptioc'
    }

    return 'suspicious'
  }

  // Determine severity from MISP tags
  getMISPSeverity(tags) {
    const tagNames = tags.map(tag => tag.name.toLowerCase())

    if (tagNames.some(tag => tag.includes('critical') || tag.includes('high'))) {
      return 'critical'
    }
    if (tagNames.some(tag => tag.includes('medium') || tag.includes('suspicious'))) {
      return 'high'
    }

    return 'medium'
  }

  // Comprehensive threat intelligence lookup
  async comprehensiveLookup(indicator, type = 'ip') {
    console.log(`🔍 Comprehensive threat intelligence lookup for ${type}: ${indicator}`)

    const results = []
    let maxThreat = null

    // Query all enabled feeds
    if (this.feeds.otx.enabled) {
      const otxResult = await this.queryOTX(indicator, type)
      if (otxResult && otxResult.confidence > 0) {
        results.push(otxResult)
      }
    }

    if (this.feeds.misp.enabled) {
      const mispResult = await this.queryMISP(indicator, type)
      if (mispResult && mispResult.confidence > 0) {
        results.push(mispResult)
      }
    }

    // Determine the most severe threat
    if (results.length > 0) {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }

      maxThreat = results.reduce((max, current) => {
        const maxScore = severityOrder[max.severity] || 0
        const currScore = severityOrder[current.severity] || 0
        return currScore > maxScore ? current : max
      })

      // Consolidate metadata from all sources
      maxThreat.metadata = {
        ...maxThreat.metadata,
        allSources: results.map(r => ({
          source: r.source,
          type: r.type,
          severity: r.severity,
          confidence: r.confidence
        }))
      }
    }

    return maxThreat || {
      indicator,
      type: 'clean',
      severity: 'low',
      confidence: 0,
      source: 'multiple',
      reputation: 'clean',
      details: `Checked ${results.length} threat intelligence sources - no threats detected`
    }
  }

  // Bulk threat intelligence lookup for multiple indicators
  async bulkLookup(indicators, type = 'ip') {
    console.log(`🔍 Bulk threat intelligence lookup for ${indicators.length} ${type} indicators`)

    const results = []
    const promises = indicators.map(indicator =>
      this.comprehensiveLookup(indicator, type)
    )

    const lookupResults = await Promise.allSettled(promises)

    lookupResults.forEach((result, index) => {
      if (result.status === 'fulfilled') {
        results.push(result.value)
      } else {
        console.error(`Failed to look up ${indicators[index]}:`, result.reason)
        results.push({
          indicator: indicators[index],
          type: 'error',
          severity: 'low',
          confidence: 0,
          source: 'lookup-error',
          details: 'Failed to perform threat intelligence lookup'
        })
      }
    })

    return results
  }

  // Save threat intelligence to database
  async saveToDatabase(threatData, userId = null) {
    try {
      // Check if threat already exists to avoid duplicates
      const existingThreat = await Threat.findOne({
        indicator: threatData.indicator,
        source: threatData.source
      })

      if (existingThreat) {
        // Update existing threat with new data
        await Threat.findByIdAndUpdate(existingThreat._id, {
          ...threatData,
          lastSeen: new Date(),
          updatedAt: new Date()
        })
        return existingThreat._id
      } else {
        // Create new threat
        const threat = new Threat({
          ...threatData,
          createdBy: userId,
          firstSeen: new Date(),
          lastSeen: new Date()
        })

        const savedThreat = await threat.save()
        return savedThreat._id
      }
    } catch (error) {
      console.error('Error saving threat to database:', error)
      return null
    }
  }

  // Get feed status and statistics
  getStatus() {
    return {
      feeds: this.feeds,
      cacheSize: this.cache.size,
      uptime: process.uptime(),
      lastActivity: new Date()
    }
  }

  // Clear cache (useful for forced refresh)
  clearCache() {
    this.cache.clear()
    console.log('Threat intelligence cache cleared')
  }

  // Test connectivity to threat intelligence feeds
  async testConnectivity() {
    const results = {
      timestamp: new Date(),
      feeds: {}
    }

    // Test OTX connectivity
    if (this.feeds.otx.enabled) {
      try {
        const testResponse = await axios.get(`${this.feeds.otx.url}/pulses/user/AlienVault`, {
          headers: { 'X-OTX-API-KEY': this.otxApiKey },
          timeout: 5000
        })
        results.feeds.otx = {
          status: 'connected',
          latency: testResponse.headers['x-response-time'] || 'unknown'
        }
      } catch (error) {
        results.feeds.otx = {
          status: 'failed',
          error: error.message
        }
      }
    }

    // Test MISP connectivity
    if (this.feeds.misp.enabled) {
      try {
        const testResponse = await axios.get(`${this.mispUrl}/users/me`, {
          headers: { 'Authorization': this.mispApiKey },
          timeout: 5000
        })
        results.feeds.misp = {
          status: 'connected',
          latency: testResponse.headers['x-response-time'] || 'unknown'
        }
      } catch (error) {
        results.feeds.misp = {
          status: 'failed',
          error: error.message
        }
      }
    }

    return results
  }
}

// Export singleton instance
export default new ThreatIntelService()
