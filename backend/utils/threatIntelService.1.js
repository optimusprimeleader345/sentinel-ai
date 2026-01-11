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
