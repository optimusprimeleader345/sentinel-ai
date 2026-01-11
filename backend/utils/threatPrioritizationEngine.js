// AI Threat Prioritization Engine for National Cyber Command
// Correlates incidents across organizations, sectors, and geography
// Ranks threats by national impact, not just severity

const mockNationalThreats = [
  {
    id: 'nt-001',
    name: 'Supply Chain Compromise Campaign',
    severity: 'critical',
    nationalImpact: 95,
    affectedOrganizations: 47,
    affectedSectors: ['Finance', 'Healthcare', 'Government'],
    geographicSpread: ['North America', 'Europe', 'Asia'],
    aiConfidence: 92,
    estimatedEconomicImpact: '$2.8B',
    timeWindow: 'Next 48 hours',
    correlatedIncidents: 156,
    riskFactors: ['Zero-day exploitation', 'Lateral movement', 'Data exfiltration'],
    recommendedActions: [
      'Immediate patch deployment',
      'Network segmentation activation',
      'Enhanced monitoring of privileged accounts'
    ]
  },
  {
    id: 'nt-002',
    name: 'Nation-State Ransomware Deployment',
    severity: 'high',
    nationalImpact: 88,
    affectedOrganizations: 23,
    affectedSectors: ['Energy', 'Transportation', 'Critical Infrastructure'],
    geographicSpread: ['Eastern Europe', 'Middle East'],
    aiConfidence: 87,
    estimatedEconomicImpact: '$1.2B',
    timeWindow: 'Next 72 hours',
    correlatedIncidents: 89,
    riskFactors: ['Targeted spear-phishing', 'Ransomware encryption', 'Data destruction'],
    recommendedActions: [
      'Backup verification protocols',
      'Email security enhancement',
      'Incident response team readiness'
    ]
  },
  {
    id: 'nt-003',
    name: 'Cloud Infrastructure Attack Wave',
    severity: 'high',
    nationalImpact: 82,
    affectedOrganizations: 34,
    affectedSectors: ['Technology', 'Finance', 'Retail'],
    geographicSpread: ['Global'],
    aiConfidence: 78,
    estimatedEconomicImpact: '$950M',
    timeWindow: 'Next 96 hours',
    correlatedIncidents: 67,
    riskFactors: ['Misconfigured cloud storage', 'API vulnerabilities', 'Credential compromise'],
    recommendedActions: [
      'Cloud security assessment',
      'Multi-factor authentication enforcement',
      'Access logging enhancement'
    ]
  },
  {
    id: 'nt-004',
    name: 'Deepfake Executive Impersonation',
    severity: 'medium',
    nationalImpact: 76,
    affectedOrganizations: 18,
    affectedSectors: ['Executive Leadership', 'Finance'],
    geographicSpread: ['North America', 'Europe'],
    aiConfidence: 71,
    estimatedEconomicImpact: '$340M',
    timeWindow: 'Next 7 days',
    correlatedIncidents: 23,
    riskFactors: ['Social engineering', 'Voice cloning', 'Video manipulation'],
    recommendedActions: [
      'Executive communication verification protocols',
      'AI-powered call screening',
      'Training on deepfake detection'
    ]
  },
  {
    id: 'nt-005',
    name: 'IoT Botnet Expansion',
    severity: 'medium',
    nationalImpact: 68,
    affectedOrganizations: 156,
    affectedSectors: ['Healthcare', 'Manufacturing', 'Smart Cities'],
    geographicSpread: ['Global'],
    aiConfidence: 83,
    estimatedEconomicImpact: '$180M',
    timeWindow: 'Ongoing',
    correlatedIncidents: 234,
    riskFactors: ['Default credentials', 'Unpatched devices', 'Network scanning'],
    recommendedActions: [
      'IoT device inventory and patching',
      'Network segmentation for IoT',
      'Default password changes'
    ]
  }
]

// Advanced correlation algorithm for national threat prioritization
export const calculateNationalImpact = (incidents) => {
  // Simulate AI correlation across organizations and sectors
  const organizationCount = new Set(incidents.map(i => i.organizationId)).size
  const sectorCount = new Set(incidents.map(i => i.sector)).size
  const geographicCount = new Set(incidents.flatMap(i => i.geographicRegions || [])).size

  // Weighted scoring algorithm
  const organizationWeight = 0.4
  const sectorWeight = 0.3
  const geographicWeight = 0.2
  const severityWeight = 0.1

  const maxOrgs = 1000 // Assumed maximum organizations
  const maxSectors = 15 // Total economic sectors
  const maxGeographies = 10 // Geographic regions

  const normalizedOrgScore = Math.min(organizationCount / maxOrgs, 1)
  const normalizedSectorScore = Math.min(sectorCount / maxSectors, 1)
  const normalizedGeoScore = Math.min(geographicCount / maxGeographies, 1)

  const avgSeverity = incidents.reduce((sum, i) => {
    const severityMap = { low: 1, medium: 2, high: 3, critical: 4 }
    return sum + (severityMap[i.severity] || 1)
  }, 0) / incidents.length

  const normalizedSeverityScore = avgSeverity / 4 // Max severity score

  const nationalImpact = (
    normalizedOrgScore * organizationWeight +
    normalizedSectorScore * sectorWeight +
    normalizedGeoScore * geographicWeight +
    normalizedSeverityScore * severityWeight
  ) * 100

  return Math.round(nationalImpact)
}

// Generate AI-powered threat prioritization insights
export const generateThreatInsights = (threatData) => {
  const insights = {
    topThreats: mockNationalThreats.slice(0, 5),
    emergingPatterns: [
      {
        pattern: 'Cross-sector correlation increasing',
        confidence: 89,
        trend: 'upward',
        description: 'Threats are increasingly targeting multiple sectors simultaneously'
      },
      {
        pattern: 'Geographic spread acceleration',
        confidence: 76,
        trend: 'upward',
        description: 'Attack campaigns are expanding geographically at faster rates'
      },
      {
        pattern: 'AI-assisted attack sophistication',
        confidence: 92,
        trend: 'upward',
        description: 'Attackers using AI for reconnaissance and exploitation'
      }
    ],
    riskPredictions: [
      {
        riskType: 'Critical Infrastructure Targeting',
        probability: 78,
        timeFrame: 'Next 48 hours',
        affectedSectors: ['Energy', 'Transportation', 'Healthcare']
      },
      {
        riskType: 'Supply Chain Compromise',
        probability: 65,
        timeFrame: 'Next 72 hours',
        affectedSectors: ['Technology', 'Manufacturing']
      },
      {
        riskType: 'Executive Impersonation',
        probability: 54,
        timeFrame: 'Next week',
        affectedSectors: ['Finance', 'Government']
      }
    ],
    mitigationEffectiveness: {
      current: 72,
      target: 85,
      gap: 13,
      recommendations: [
        'Increase automated response coverage',
        'Enhance cross-organization intelligence sharing',
        'Deploy advanced AI detection systems'
      ]
    }
  }

  return insights
}

// Real-time threat correlation engine
export const correlateThreats = (newIncident) => {
  // Simulate real-time correlation with existing threat database
  const correlations = mockNationalThreats.filter(threat =>
    threat.affectedSectors.some(sector => newIncident.sector === sector) ||
    threat.geographicSpread.some(region => newIncident.geographicRegions?.includes(region))
  )

  return {
    correlatedThreats: correlations,
    correlationStrength: correlations.length > 0 ? 'high' : 'low',
    recommendedEscalation: correlations.length > 2 ? 'national' : 'regional',
    aiAnalysis: `Incident correlates with ${correlations.length} known national threat patterns`
  }
}

// Export mock data for development
export { mockNationalThreats }
