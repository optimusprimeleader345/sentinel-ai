import { darkWebIntel, threatCorrelation, classificationRules } from '../data/advancedThreatData.js'

export const getDarkWebIntel = async (req, res) => {
  try {
    // Add some randomization for live feel
    const randomized = {
      ...darkWebIntel,
      stolenCredentialsCount: darkWebIntel.stolenCredentialsCount + Math.floor(Math.random() * 1000),
      leakedAssets: darkWebIntel.leakedAssets + Math.floor(Math.random() * 100),
      marketplaceMentions: darkWebIntel.marketplaceMentions + Math.floor(Math.random() * 5)
    }
    res.json(randomized)
  } catch (error) {
    console.error('Get dark web intel error:', error)
    res.status(500).json({ message: 'Server error fetching dark web intelligence' })
  }
}

export const getThreatCorrelation = async (req, res) => {
  try {
    // Add timestamp randomization
    const correlated = threatCorrelation.correlatedEvents.map(event => ({
      ...event,
      timestamp: new Date(new Date(event.timestamp).getTime() + Math.random() * 3600000).toISOString()
    }))
    res.json({ correlatedEvents: correlated })
  } catch (error) {
    console.error('Get threat correlation error:', error)
    res.status(500).json({ message: 'Server error fetching threat correlation' })
  }
}

export const classifyThreat = async (req, res) => {
  try {
    const { text } = req.body

    if (!text) {
      return res.status(400).json({ message: 'Text is required for classification' })
    }

    const lowerText = text.toLowerCase()
    let bestMatch = { classification: 'Unknown', confidence: 0, recommendedAction: 'Monitor and investigate further' }

    for (const rule of classificationRules) {
      const matchCount = rule.keywords.filter(keyword => lowerText.includes(keyword)).length
      const confidence = matchCount > 0 ? Math.min(rule.confidence * matchCount, 100) : 0

      if (confidence > bestMatch.confidence) {
        bestMatch = {
          classification: rule.classification,
          confidence: Math.round(confidence),
          recommendedAction: rule.action
        }
      }
    }

    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500))

    res.json(bestMatch)
  } catch (error) {
    console.error('Classify threat error:', error)
    res.status(500).json({ message: 'Server error during threat classification' })
  }
}
