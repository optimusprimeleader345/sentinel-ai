import axios from 'axios'
import NodeCache from 'node-cache'

// Cache for API responses (5 minute TTL)
const cache = new NodeCache({ stdTTL: 300 })

// Threat intelligence API configurations
const THREAT_APIS = {
  alienVault: {
    baseUrl: 'https://otx.alienvault.com/api/v1',
    // Note: Requires API key for production
    apiKey: process.env.ALIENVAULT_API_KEY || null,
    endpoints: {
      pulses: '/pulses/general',
      indicators: '/indicators/export'
    }
  },

  abuseIPDB: {
    baseUrl: 'https://api.abuseipdb.com/api/v2',
    apiKey: process.env.ABUSEIPDB_API_KEY || 'demo-key',
    endpoints: {
      check: '/check',
      blacklist: '/blacklist'
    }
  },

  shodan: {
    baseUrl: 'https://api.shodan.io',
    apiKey: process.env.SHODAN_API_KEY || 'demo-key',
    endpoints: {
      search: '/shodan/host/search',
      count: '/shodan/host/count'
    }
  },

  virusTotal: {
    baseUrl: 'https://www.virustotal.com/api/v3',
    apiKey: process.env.VIRUSTOTAL_API_KEY || null,
    endpoints: {
      ip: '/ip_addresses/',
      domain: '/domains/'
    }
  },

  mitre: {
    baseUrl: 'https://cveawg.mitre.org/api',
    endpoints: {
      cve: '/cve'
    }
  }
}

// IP Geolocation service
const IP_GEOLOCATION_API = 'http://ip-api.com/json/'

// Threat severity mapping
const SEVERITY_MAP = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
  info: 0
}

// Country coordinates for fallback
const COUNTRY_COORDINATES = {
  'US': [39.8283, -98.5795],
  'CN': [35.8617, 104.1954],
  'RU': [61.5240, 105.3188],
  'IN': [20.5937, 78.9629],
  'GB': [55.3781, -3.4360],
  'JP': [36.2048, 138.2529],
  'DE': [51.1657, 10.4515],
  'FR': [46.2276, 2.2137],
  'CA': [56.1304, -106.3468],
  'AU': [-25.2744, 133.7751],
  'BR': [-14.2350, -51.9253],
  'KR': [35.9078, 127.7669]
}

// Utility function to get random coordinates within a country
function getRandomCoordinatesInCountry(countryCode) {
  const baseCoords = COUNTRY_COORDINATES[countryCode] || [0, 0]
  // Add some randomness (±5 degrees)
  const lat = baseCoords[0] + (Math.random() - 0.5) * 10
  const lng = baseCoords[1] + (Math.random() - 0.5) * 20
  return [Math.max(-90, Math.min(90, lat)), Math.max(-180, Math.min(180, lng))]
}

// Geocode IP address to coordinates
async function geocodeIP(ip) {
  try {
    const cacheKey = `geo_${ip}`
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const response = await axios.get(`${IP_GEOLOCATION_API}${ip}`, { timeout: 5000 })
    const data = response.data

    if (data.status === 'success') {
      const coords = [data.lat, data.lon]
      cache.set(cacheKey, coords, 3600) // Cache for 1 hour
      return coords
    }

    // Fallback to country-based coordinates
    return getRandomCoordinatesInCountry(data.countryCode)
  } catch (error) {
    console.error('Geocoding error:', error.message)
    // Return random coordinates as fallback
    return [Math.random() * 180 - 90, Math.random() * 360 - 180]
  }
}

// Fetch threats from AlienVault OTX
async function fetchAlienVaultThreats() {
  try {
    const cacheKey = 'alienvault_threats'
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const response = await axios.get(`${THREAT_APIS.alienVault.baseUrl}${THREAT_APIS.alienVault.endpoints.pulses}`, {
      headers: THREAT_APIS.alienVault.apiKey ? { 'X-OTX-API-KEY': THREAT_APIS.alienVault.apiKey } : {},
      timeout: 10000
    })

    const threats = []
    const pulses = response.data.results || []

    for (const pulse of pulses.slice(0, 10)) { // Limit to 10 recent pulses
      const indicators = pulse.indicators || []
      for (const indicator of indicators.slice(0, 5)) { // Limit indicators per pulse
        if (indicator.type === 'IPv4' || indicator.type === 'domain') {
          const coords = indicator.type === 'IPv4' ?
            await geocodeIP(indicator.indicator) :
            getRandomCoordinatesInCountry('US') // Default for domains

          threats.push({
            id: `alienvault_${indicator.id}`,
            type: indicator.type === 'IPv4' ? 'IP Attack' : 'Domain Threat',
            severity: 'medium',
            description: pulse.name || 'Suspicious activity detected',
            source: 'AlienVault OTX',
            latitude: coords[0],
            longitude: coords[1],
            timestamp: new Date(pulse.created).getTime(),
            count: 1,
            country: 'Unknown'
          })
        }
      }
    }

    cache.set(cacheKey, threats, 300) // Cache for 5 minutes
    return threats
  } catch (error) {
    console.error('AlienVault API error:', error.message)
    return []
  }
}

// Fetch threats from AbuseIPDB
async function fetchAbuseIPDBThreats() {
  try {
    const cacheKey = 'abuseipdb_threats'
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const response = await axios.get(`${THREAT_APIS.abuseIPDB.baseUrl}${THREAT_APIS.abuseIPDB.endpoints.blacklist}`, {
      headers: {
        'Key': THREAT_APIS.abuseIPDB.apiKey,
        'Accept': 'application/json'
      },
      params: {
        limit: 20,
        confidenceMinimum: 80
      },
      timeout: 10000
    })

    const threats = []
    const blacklist = response.data.data || []

    for (const entry of blacklist) {
      const coords = await geocodeIP(entry.ipAddress)

      threats.push({
        id: `abuseipdb_${entry.ipAddress}`,
        type: 'IP Blacklist',
        severity: entry.abuseConfidenceScore > 90 ? 'critical' : 'high',
        description: `${entry.abuseConfidenceScore}% confidence of malicious activity`,
        source: 'AbuseIPDB',
        latitude: coords[0],
        longitude: coords[1],
        timestamp: new Date(entry.lastReportedAt).getTime(),
        count: entry.totalReports,
        country: entry.countryCode || 'Unknown'
      })
    }

    cache.set(cacheKey, threats, 300)
    return threats
  } catch (error) {
    console.error('AbuseIPDB API error:', error.message)
    return []
  }
}

// Fetch threats from Shodan
async function fetchShodanThreats() {
  try {
    const cacheKey = 'shodan_threats'
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const response = await axios.get(`${THREAT_APIS.shodan.baseUrl}${THREAT_APIS.shodan.endpoints.search}`, {
      params: {
        key: THREAT_APIS.shodan.apiKey,
        query: 'port:22,3389,445,80,443',
        limit: 10
      },
      timeout: 10000
    })

    const threats = []
    const matches = response.data.matches || []

    for (const match of matches) {
      const coords = [match.location?.latitude || 0, match.location?.longitude || 0]
      if (coords[0] === 0 && coords[1] === 0) {
        // Try to geocode if coordinates not available
        coords = await geocodeIP(match.ip_str)
      }

      threats.push({
        id: `shodan_${match.ip_str}`,
        type: 'Vulnerable Service',
        severity: match.vulns ? 'high' : 'medium',
        description: `Open ports: ${match.port}, ${match.product || 'Unknown service'}`,
        source: 'Shodan',
        latitude: coords[0],
        longitude: coords[1],
        timestamp: new Date().getTime(),
        count: 1,
        country: match.location?.country_code || 'Unknown'
      })
    }

    cache.set(cacheKey, threats, 300)
    return threats
  } catch (error) {
    console.error('Shodan API error:', error.message)
    return []
  }
}

// Fetch CVEs from MITRE
async function fetchMITREThreats() {
  try {
    const cacheKey = 'mitre_threats'
    const cached = cache.get(cacheKey)
    if (cached) return cached

    const response = await axios.get(`${THREAT_APIS.mitre.baseUrl}${THREAT_APIS.mitre.endpoints.cve}`, {
      params: {
        startIndex: 0,
        resultsPerPage: 10
      },
      timeout: 10000
    })

    const threats = []
    const vulnerabilities = response.data.vulnerabilities || []

    for (const vuln of vulnerabilities.slice(0, 5)) {
      const cve = vuln.cve
      const severity = cve.metrics?.cvssMetricV31?.[0]?.cvssData?.baseScore || 5

      threats.push({
        id: `mitre_${cve.id}`,
        type: 'Vulnerability',
        severity: severity >= 9 ? 'critical' : severity >= 7 ? 'high' : 'medium',
        description: cve.descriptions?.[0]?.value || 'New vulnerability discovered',
        source: 'MITRE CVE',
        latitude: Math.random() * 180 - 90, // Random global distribution
        longitude: Math.random() * 360 - 180,
        timestamp: new Date(cve.published).getTime(),
        count: 1,
        country: 'Global'
      })
    }

    cache.set(cacheKey, threats, 600) // Cache for 10 minutes (CVEs change less frequently)
    return threats
  } catch (error) {
    console.error('MITRE API error:', error.message)
    return []
  }
}

// Generate simulated threats for demo when APIs are unavailable
function generateSimulatedThreats() {
  const threatTypes = ['DDoS Attack', 'Malware Infection', 'Phishing Campaign', 'Ransomware', 'Data Breach']
  const severities = ['critical', 'high', 'medium', 'low']
  const regions = [
    { name: 'North America', latRange: [25, 70], lngRange: [-125, -65] },
    { name: 'Europe', latRange: [35, 70], lngRange: [-10, 40] },
    { name: 'Asia', latRange: [1, 50], lngRange: [67, 140] },
    { name: 'South America', latRange: [-55, 12], lngRange: [-80, -35] },
    { name: 'Africa', latRange: [-35, 35], lngRange: [-17, 50] },
    { name: 'Oceania', latRange: [-45, -10], lngRange: [113, 180] }
  ]

  const threats = []

  for (let i = 0; i < 25; i++) {
    const region = regions[Math.floor(Math.random() * regions.length)]
    const lat = Math.random() * (region.latRange[1] - region.latRange[0]) + region.latRange[0]
    const lng = Math.random() * (region.lngRange[1] - region.lngRange[0]) + region.lngRange[0]

    threats.push({
      id: `sim_${i}`,
      type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
      severity: severities[Math.floor(Math.random() * severities.length)],
      description: `Simulated ${threatTypes[Math.floor(Math.random() * threatTypes.length)].toLowerCase()} detected`,
      source: 'SentinelAI Simulation',
      latitude: lat,
      longitude: lng,
      timestamp: Date.now() - Math.random() * 24 * 60 * 60 * 1000, // Last 24 hours
      count: Math.floor(Math.random() * 50) + 1,
      country: region.name
    })
  }

  return threats
}

// Main function to aggregate all threats
async function aggregateThreats() {
  try {
    console.log('🔍 Aggregating threats from multiple sources...')

    // Fetch from real APIs
    const [alienVault, abuseIPDB, shodan, mitre] = await Promise.allSettled([
      fetchAlienVaultThreats(),
      fetchAbuseIPDBThreats(),
      fetchShodanThreats(),
      fetchMITREThreats()
    ])

    let allThreats = []

    // Extract successful results
    if (alienVault.status === 'fulfilled') allThreats.push(...alienVault.value)
    if (abuseIPDB.status === 'fulfilled') allThreats.push(...abuseIPDB.value)
    if (shodan.status === 'fulfilled') allThreats.push(...shodan.value)
    if (mitre.status === 'fulfilled') allThreats.push(...mitre.value)

    // If no real threats, use simulated data
    if (allThreats.length === 0) {
      console.log('⚠️ No real threat data available, using simulated threats')
      allThreats = generateSimulatedThreats()
    }

    // Sort by timestamp and limit to most recent 100 threats
    allThreats.sort((a, b) => b.timestamp - a.timestamp)
    allThreats = allThreats.slice(0, 100)

    console.log(`✅ Aggregated ${allThreats.length} threats from ${new Set(allThreats.map(t => t.source)).size} sources`)

    return allThreats
  } catch (error) {
    console.error('Threat aggregation error:', error.message)
    return generateSimulatedThreats()
  }
}

// Export functions
export {
  aggregateThreats,
  fetchAlienVaultThreats,
  fetchAbuseIPDBThreats,
  fetchShodanThreats,
  fetchMITREThreats,
  generateSimulatedThreats,
  geocodeIP
}

// Default export
export default {
  aggregateThreats,
  fetchAlienVaultThreats,
  fetchAbuseIPDBThreats,
  fetchShodanThreats,
  fetchMITREThreats,
  generateSimulatedThreats,
  geocodeIP
}
