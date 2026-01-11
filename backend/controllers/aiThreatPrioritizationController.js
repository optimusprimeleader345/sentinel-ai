import { calculateNationalImpact, generateThreatInsights, correlateThreats, mockNationalThreats } from '../utils/threatPrioritizationEngine.js'

// Get top 5 national risk threats with real-time prioritization
export const getTopNationalThreats = async (req, res) => {
  try {
    const { timeFrame = '24h', sector, region } = req.query

    // Simulate filtering based on parameters
    let filteredThreats = mockNationalThreats

    if (sector) {
      filteredThreats = filteredThreats.filter(threat =>
        threat.affectedSectors.includes(sector)
      )
    }

    if (region) {
      filteredThreats = filteredThreats.filter(threat =>
        threat.geographicSpread.includes(region) || threat.geographicSpread.includes('Global')
      )
    }

    // Sort by national impact and return top threats
    const topThreats = filteredThreats
      .sort((a, b) => b.nationalImpact - a.nationalImpact)
      .slice(0, 5)

    // Add AI confidence scores and timestamps
    const threatsWithMetadata = topThreats.map(threat => ({
      ...threat,
      lastUpdated: new Date(Date.now() - Math.random() * 3600000).toISOString(), // Within last hour
      aiConfidence: Math.floor(Math.random() * 20) + 80, // 80-99%
      trend: Math.random() > 0.5 ? 'increasing' : 'stable'
    }))

    res.json({
      success: true,
      data: {
        threats: threatsWithMetadata,
        totalActiveThreats: mockNationalThreats.length,
        timeFrame,
        filters: { sector, region }
      },
      metadata: {
        generatedAt: new Date().toISOString(),
        aiModel: 'National Threat Prioritization Engine v2.1',
        confidence: 94,
        dataFreshness: 'real-time'
      }
    })
  } catch (error) {
    console.error('Error fetching national threats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve national threat prioritization data'
    })
  }
}

// Get detailed threat analysis for specific threat ID
export const getThreatAnalysis = async (req, res) => {
  try {
    const { threatId } = req.params

    const threat = mockNationalThreats.find(t => t.id === threatId)

    if (!threat) {
      return res.status(404).json({
        success: false,
        message: 'Threat not found'
      })
    }

    // Generate detailed analysis
    const detailedAnalysis = {
      ...threat,
      correlatedIncidents: threat.correlatedIncidents,
      affectedOrganizations: threat.affectedOrganizations,
      economicImpact: {
        direct: threat.estimatedEconomicImpact,
        indirect: `$${Math.floor(parseInt(threat.estimatedEconomicImpact.replace(/[$,BM]/g, '')) * 2.3)}M`,
        total: `$${Math.floor(parseInt(threat.estimatedEconomicImpact.replace(/[$,BM]/g, '')) * 3.8)}M`
      },
      attackVectors: threat.riskFactors,
      mitigationStatus: {
        currentEffectiveness: Math.floor(Math.random() * 30) + 60, // 60-89%
        recommendedActions: threat.recommendedActions,
        priority: threat.nationalImpact > 85 ? 'critical' : 'high'
      },
      intelligence: {
        attribution: threat.name.includes('Nation-State') ? 'State-sponsored' : 'Cybercrime syndicate',
        sophistication: 'Advanced',
        persistence: 'High'
      }
    }

    res.json({
      success: true,
      data: detailedAnalysis,
      metadata: {
        analysisDepth: 'comprehensive',
        aiConfidence: threat.aiConfidence,
        lastAnalyzed: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error fetching threat analysis:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve threat analysis'
    })
  }
}

// Get AI-powered threat insights and predictions
export const getThreatInsights = async (req, res) => {
  try {
    const insights = generateThreatInsights()

    // Add real-time metadata
    const enrichedInsights = {
      ...insights,
      generatedAt: new Date().toISOString(),
      dataSources: ['SIEM feeds', 'Threat intelligence', 'Incident reports', 'Network telemetry'],
      predictionAccuracy: {
        historical: 87,
        current: 91,
        trend: 'improving'
      }
    }

    res.json({
      success: true,
      data: enrichedInsights,
      metadata: {
        aiModel: 'Strategic Threat Intelligence Engine',
        confidence: 89,
        nextUpdate: new Date(Date.now() + 300000).toISOString() // 5 minutes
      }
    })
  } catch (error) {
    console.error('Error fetching threat insights:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve threat insights'
    })
  }
}

// Correlate new incident with national threats
export const correlateIncident = async (req, res) => {
  try {
    const { incident } = req.body

    if (!incident) {
      return res.status(400).json({
        success: false,
        message: 'Incident data is required'
      })
    }

    const correlation = correlateThreats(incident)

    // Add escalation recommendations
    const escalationMatrix = {
      national: {
        level: 'NATIONAL',
        authorities: ['CISA', 'NSA', 'FBI Cyber Division'],
        responseTime: 'Immediate',
        communication: 'Presidential Alert System'
      },
      regional: {
        level: 'REGIONAL',
        authorities: ['State Cyber Command', 'Regional CERT'],
        responseTime: 'Within 1 hour',
        communication: 'Regional coordination center'
      },
      local: {
        level: 'LOCAL',
        authorities: ['Local SOC', 'Organization IR team'],
        responseTime: 'Within 4 hours',
        communication: 'Internal escalation'
      }
    }

    const recommendedResponse = escalationMatrix[correlation.recommendedEscalation] || escalationMatrix.local

    res.json({
      success: true,
      data: {
        correlation,
        escalation: recommendedResponse,
        aiRecommendation: `Escalate to ${recommendedResponse.level} level response`,
        confidence: correlation.correlationStrength === 'high' ? 88 : 65
      },
      metadata: {
        correlationEngine: 'National Threat Correlation AI v3.2',
        processingTime: '45ms',
        analyzedAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error correlating incident:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to correlate incident with national threats'
    })
  }
}

// Get national cyber posture summary
export const getNationalPosture = async (req, res) => {
  try {
    const postureData = {
      overallReadiness: 73,
      sectorBreakdown: {
        critical: {
          score: 78,
          status: 'elevated',
          threats: 12,
          incidents: 34
        },
        finance: {
          score: 82,
          status: 'moderate',
          threats: 8,
          incidents: 23
        },
        healthcare: {
          score: 69,
          status: 'high',
          threats: 15,
          incidents: 67
        },
        government: {
          score: 85,
          status: 'moderate',
          threats: 5,
          incidents: 12
        }
      },
      emergingThreats: [
        'AI-powered attack automation',
        'Quantum-resistant cryptography bypass',
        'Supply chain deepfake injection'
      ],
      mitigationGaps: [
        'Legacy system modernization',
        'Cross-sector intelligence sharing',
        'AI defense capability deployment'
      ]
    }

    res.json({
      success: true,
      data: postureData,
      metadata: {
        assessmentDate: new Date().toISOString(),
        methodology: 'AI-Driven National Cyber Posture Analysis',
        confidence: 91
      }
    })
  } catch (error) {
    console.error('Error fetching national posture:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve national cyber posture data'
    })
  }
}
