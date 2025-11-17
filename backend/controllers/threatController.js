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
