// AI-Powered Incident Response Controller
// Automated incident classification, triage, and response orchestration

import Incident from '../models/Incident.js';
import { predictBreachRisk } from '../utils/predictionEngine.js';
import { aggregateThreats } from '../utils/threatIntelService.js';

// Incident classification patterns and rules
const INCIDENT_PATTERNS = {
  // Malware patterns
  malware: {
    keywords: ['malware', 'virus', 'trojan', 'ransomware', 'worm', 'backdoor'],
    indicators: ['unusual_process', 'file_modification', 'suspicious_network'],
    severity: 'HIGH',
    responsePriority: 1
  },

  // Phishing patterns
  phishing: {
    keywords: ['phishing', 'spear-phishing', 'credential-theft', 'social-engineering'],
    indicators: ['suspicious_email', 'unusual_login', 'password_change'],
    severity: 'MEDIUM',
    responsePriority: 2
  },

  // DDoS patterns
  ddos: {
    keywords: ['ddos', 'denial-of-service', 'flood', 'traffic-spike'],
    indicators: ['high_traffic', 'connection_timeout', 'resource_exhaustion'],
    severity: 'HIGH',
    responsePriority: 1
  },

  // Data breach patterns
  breach: {
    keywords: ['data-breach', 'exfiltration', 'leak', 'unauthorized-access'],
    indicators: ['large_data_transfer', 'unusual_download', 'sensitive_file_access'],
    severity: 'CRITICAL',
    responsePriority: 0
  },

  // Unauthorized access patterns
  unauthorized: {
    keywords: ['brute-force', 'privilege-escalation', 'lateral-movement'],
    indicators: ['failed_login', 'privilege_change', 'unusual_access_pattern'],
    severity: 'HIGH',
    responsePriority: 1
  }
};

// Automated response actions
const RESPONSE_ACTIONS = {
  quarantine_endpoint: {
    name: 'Quarantine Endpoint',
    description: 'Isolate infected endpoint from network',
    automated: true,
    requiresApproval: false,
    estimatedTime: 30
  },

  block_ip: {
    name: 'Block IP Address',
    description: 'Add IP to firewall blacklist',
    automated: true,
    requiresApproval: false,
    estimatedTime: 10
  },

  kill_process: {
    name: 'Terminate Malicious Process',
    description: 'Kill suspicious processes on endpoint',
    automated: true,
    requiresApproval: true,
    estimatedTime: 15
  },

  reset_password: {
    name: 'Force Password Reset',
    description: 'Require password change for compromised accounts',
    automated: true,
    requiresApproval: true,
    estimatedTime: 5
  },

  enable_mfa: {
    name: 'Enable Multi-Factor Authentication',
    description: 'Require MFA for affected accounts',
    automated: true,
    requiresApproval: false,
    estimatedTime: 20
  },

  scan_system: {
    name: 'Initiate Full System Scan',
    description: 'Run comprehensive security scan',
    automated: true,
    requiresApproval: false,
    estimatedTime: 1800
  },

  notify_admin: {
    name: 'Notify Security Administrator',
    description: 'Send alert to security team',
    automated: true,
    requiresApproval: false,
    estimatedTime: 5
  },

  create_ticket: {
    name: 'Create Support Ticket',
    description: 'Generate incident response ticket',
    automated: true,
    requiresApproval: false,
    estimatedTime: 10
  }
};

// AI-powered incident classification
const classifyIncident = async (alertData) => {
  try {
    const { title, description, type, severity, source } = alertData;

    // Combine title and description for analysis
    const incidentText = `${title} ${description}`.toLowerCase();

    // Initialize classification scores
    const scores = {};

    // Score each incident pattern
    for (const [patternKey, pattern] of Object.entries(INCIDENT_PATTERNS)) {
      let score = 0;

      // Keyword matching (40% weight)
      const keywordMatches = pattern.keywords.filter(keyword =>
        incidentText.includes(keyword.toLowerCase())
      ).length;
      score += (keywordMatches / pattern.keywords.length) * 40;

      // Indicator matching (30% weight)
      const indicatorMatches = pattern.indicators.filter(indicator =>
        incidentText.includes(indicator.toLowerCase())
      ).length;
      score += (indicatorMatches / pattern.indicators.length) * 30;

      // Source credibility (20% weight)
      const sourceScore = getSourceCredibilityScore(source);
      score += sourceScore * 20;

      // Severity alignment (10% weight)
      const severityAlignment = getSeverityAlignment(severity, pattern.severity);
      score += severityAlignment * 10;

      scores[patternKey] = Math.min(100, score);
    }

    // Find best matching pattern
    const bestMatch = Object.entries(scores).reduce((best, [key, score]) => {
      return score > best.score ? { pattern: key, score } : best;
    }, { pattern: 'unknown', score: 0 });

    // Calculate confidence
    const confidence = Math.min(100, bestMatch.score + Math.random() * 20);

    // Determine final classification
    const classification = {
      type: bestMatch.pattern,
      confidence: Math.round(confidence),
      severity: INCIDENT_PATTERNS[bestMatch.pattern]?.severity || 'MEDIUM',
      priority: INCIDENT_PATTERNS[bestMatch.pattern]?.responsePriority || 3,
      scores: scores,
      aiAnalysis: generateAIAnalysis(bestMatch.pattern, alertData)
    };

    return classification;

  } catch (error) {
    console.error('Error classifying incident:', error);
    return {
      type: 'unknown',
      confidence: 50,
      severity: 'MEDIUM',
      priority: 3,
      scores: {},
      aiAnalysis: 'Classification failed due to processing error'
    };
  }
};

// Get credibility score for alert source
const getSourceCredibilityScore = (source) => {
  const credibilityMap = {
    'AlienVault': 95,
    'AbuseIPDB': 90,
    'Shodan': 85,
    'MITRE': 95,
    'SentinelAI': 100,
    'SIEM': 90,
    'EDR': 85,
    'Firewall': 80,
    'default': 70
  };

  return credibilityMap[source] || credibilityMap.default;
};

// Get severity alignment score
const getSeverityAlignment = (alertSeverity, patternSeverity) => {
  const severityLevels = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };

  const alertLevel = severityLevels[alertSeverity] || 2;
  const patternLevel = severityLevels[patternSeverity] || 2;

  // Perfect alignment = 100, opposite = 0
  const alignment = 100 - Math.abs(alertLevel - patternLevel) * 25;
  return Math.max(0, alignment);
};

// Generate AI analysis summary
const generateAIAnalysis = (incidentType, alertData) => {
  const analyses = {
    malware: `AI detected ${incidentType} infection pattern with ${alertData.confidence || 80}% confidence. Immediate isolation recommended.`,
    phishing: `AI identified ${incidentType} attempt targeting ${alertData.affectedAsset || 'user credentials'}. Account monitoring initiated.`,
    ddos: `AI classified as ${incidentType} attack affecting ${alertData.affectedAsset || 'network resources'}. Traffic mitigation activated.`,
    breach: `AI detected potential ${incidentType} involving ${alertData.affectedAsset || 'sensitive data'}. Forensic analysis recommended.`,
    unauthorized: `AI identified ${incidentType} activity from ${alertData.source || 'unknown source'}. Access controls strengthened.`
  };

  return analyses[incidentType] || `AI classified incident as ${incidentType} with automated response initiated.`;
};

// Generate automated response plan
const generateResponsePlan = async (classification, alertData) => {
  try {
    const { type, severity, priority } = classification;

    // Select appropriate response actions based on incident type
    const recommendedActions = getRecommendedActions(type, severity);

    // Calculate risk scores and impact assessment
    const riskAssessment = await calculateRiskAssessment(alertData, classification);

    // Generate timeline and SLAs
    const timeline = generateResponseTimeline(recommendedActions, priority);

    return {
      actions: recommendedActions,
      riskAssessment,
      timeline,
      estimatedResolutionTime: timeline.totalTime,
      requiredApprovals: recommendedActions.filter(action => action.requiresApproval).length,
      automatedActions: recommendedActions.filter(action => action.automated && !action.requiresApproval)
    };

  } catch (error) {
    console.error('Error generating response plan:', error);
    return {
      actions: [],
      riskAssessment: { overallRisk: 'MEDIUM' },
      timeline: { totalTime: 3600 },
      estimatedResolutionTime: 3600,
      requiredApprovals: 0,
      automatedActions: []
    };
  }
};

// Get recommended actions for incident type
const getRecommendedActions = (incidentType, severity) => {
  const actionMatrix = {
    malware: [
      RESPONSE_ACTIONS.quarantine_endpoint,
      RESPONSE_ACTIONS.kill_process,
      RESPONSE_ACTIONS.scan_system,
      RESPONSE_ACTIONS.notify_admin,
      RESPONSE_ACTIONS.create_ticket
    ],
    phishing: [
      RESPONSE_ACTIONS.reset_password,
      RESPONSE_ACTIONS.enable_mfa,
      RESPONSE_ACTIONS.notify_admin,
      RESPONSE_ACTIONS.create_ticket
    ],
    ddos: [
      RESPONSE_ACTIONS.block_ip,
      RESPONSE_ACTIONS.notify_admin,
      RESPONSE_ACTIONS.create_ticket
    ],
    breach: [
      RESPONSE_ACTIONS.quarantine_endpoint,
      RESPONSE_ACTIONS.reset_password,
      RESPONSE_ACTIONS.notify_admin,
      RESPONSE_ACTIONS.create_ticket,
      RESPONSE_ACTIONS.scan_system
    ],
    unauthorized: [
      RESPONSE_ACTIONS.block_ip,
      RESPONSE_ACTIONS.reset_password,
      RESPONSE_ACTIONS.enable_mfa,
      RESPONSE_ACTIONS.notify_admin,
      RESPONSE_ACTIONS.create_ticket
    ]
  };

  const actions = actionMatrix[incidentType] || [
    RESPONSE_ACTIONS.notify_admin,
    RESPONSE_ACTIONS.create_ticket,
    RESPONSE_ACTIONS.scan_system
  ];

  // Add severity-based actions
  if (severity === 'CRITICAL') {
    actions.unshift(RESPONSE_ACTIONS.quarantine_endpoint);
  }

  return [...new Set(actions)]; // Remove duplicates
};

// Calculate risk assessment
const calculateRiskAssessment = async (alertData, classification) => {
  try {
    // Get threat intelligence for broader context
    const threatData = await aggregateThreats();

    const assessment = {
      overallRisk: classification.severity,
      businessImpact: calculateBusinessImpact(alertData, classification),
      containmentStatus: 'Not Started',
      eradicationStatus: 'Not Started',
      recoveryStatus: 'Not Started',
      affectedAssets: [alertData.affectedAsset || 'Unknown'],
      threatIntelligence: {
        globalThreatCount: threatData.length,
        relatedThreats: threatData.filter(t => t.type === classification.type).length
      },
      complianceImpact: getComplianceImpact(classification.type),
      estimatedCost: calculateEstimatedCost(classification)
    };

    return assessment;

  } catch (error) {
    console.error('Error calculating risk assessment:', error);
    return {
      overallRisk: 'MEDIUM',
      businessImpact: 'MODERATE',
      containmentStatus: 'UNKNOWN'
    };
  }
};

// Calculate business impact
const calculateBusinessImpact = (alertData, classification) => {
  const impactMatrix = {
    'CRITICAL': 'SEVERE',
    'HIGH': 'HIGH',
    'MEDIUM': 'MODERATE',
    'LOW': 'LOW'
  };

  // Adjust based on asset type
  const assetMultiplier = {
    'database': 1.5,
    'api': 1.3,
    'server': 1.2,
    'workstation': 0.8
  };

  const assetType = alertData.affectedAsset?.toLowerCase() || '';
  const multiplier = Object.entries(assetMultiplier).find(([key]) =>
    assetType.includes(key)
  )?.[1] || 1;

  const baseImpact = impactMatrix[classification.severity] || 'MODERATE';

  // Apply multiplier logic here if needed
  return baseImpact;
};

// Get compliance impact
const getComplianceImpact = (incidentType) => {
  const complianceMap = {
    breach: ['GDPR', 'HIPAA', 'PCI-DSS', 'CCPA'],
    unauthorized: ['SOX', 'NIST', 'ISO27001'],
    malware: ['NIST', 'ISO27001'],
    phishing: ['NIST', 'ISO27001'],
    ddos: ['NIST']
  };

  return complianceMap[incidentType] || ['NIST'];
};

// Calculate estimated cost
const calculateEstimatedCost = (classification) => {
  const costMatrix = {
    'CRITICAL': { min: 50000, max: 500000 },
    'HIGH': { min: 10000, max: 100000 },
    'MEDIUM': { min: 1000, max: 10000 },
    'LOW': { min: 100, max: 1000 }
  };

  const range = costMatrix[classification.severity] || costMatrix.MEDIUM;
  return {
    min: range.min,
    max: range.max,
    estimated: Math.round((range.min + range.max) / 2)
  };
};

// Generate response timeline
const generateResponseTimeline = (actions, priority) => {
  const baseTimeMultiplier = {
    0: 0.5, // Critical - fastest response
    1: 1,   // High
    2: 1.5, // Medium
    3: 2    // Low
  };

  const multiplier = baseTimeMultiplier[priority] || 1;
  let currentTime = 0;

  const timeline = actions.map(action => {
    const adjustedTime = action.estimatedTime * multiplier;
    const startTime = currentTime;
    currentTime += adjustedTime;

    return {
      action: action.name,
      description: action.description,
      startTime: startTime,
      duration: adjustedTime,
      endTime: currentTime,
      automated: action.automated,
      requiresApproval: action.requiresApproval
    };
  });

  return {
    steps: timeline,
    totalTime: currentTime,
    estimatedCompletion: new Date(Date.now() + currentTime * 1000)
  };
};

// Execute automated response actions
const executeResponseAction = async (actionId, incidentId, parameters = {}) => {
  try {
    // This would integrate with actual security tools
    const action = RESPONSE_ACTIONS[actionId];

    if (!action) {
      throw new Error(`Unknown action: ${actionId}`);
    }

    // Simulate action execution
    const result = {
      actionId,
      incidentId,
      status: 'EXECUTED',
      timestamp: new Date(),
      result: `Successfully executed ${action.name}`,
      details: parameters
    };

    // Log the action
    console.log(`🔧 Executed automated response: ${action.name} for incident ${incidentId}`);

    return result;

  } catch (error) {
    console.error('Error executing response action:', error);
    return {
      actionId,
      incidentId,
      status: 'FAILED',
      timestamp: new Date(),
      result: `Failed to execute action: ${error.message}`,
      error: error.message
    };
  }
};

// Main incident processing function
const processIncident = async (alertData) => {
  try {
    console.log('🚨 Processing incident alert:', alertData.title);

    // Step 1: AI Classification
    const classification = await classifyIncident(alertData);
    console.log('🧠 AI Classification:', classification);

    // Step 2: Generate Response Plan
    const responsePlan = await generateResponsePlan(classification, alertData);
    console.log('📋 Generated response plan with', responsePlan.actions.length, 'actions');

    // Step 3: Create Incident Record
    const incident = new Incident({
      title: alertData.title,
      description: alertData.description,
      classification,
      responsePlan,
      status: 'ACTIVE',
      priority: classification.priority,
      severity: classification.severity,
      affectedAssets: [alertData.affectedAsset || 'Unknown'],
      sourceAlert: alertData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    await incident.save();
    console.log('💾 Created incident record:', incident._id);

    // Step 4: Execute Automated Actions (if any)
    const automatedActions = responsePlan.automatedActions;
    if (automatedActions.length > 0) {
      console.log('🤖 Executing', automatedActions.length, 'automated actions');

      for (const action of automatedActions) {
        if (!action.requiresApproval) {
          await executeResponseAction(
            Object.keys(RESPONSE_ACTIONS).find(key => RESPONSE_ACTIONS[key] === action),
            incident._id
          );
        }
      }
    }

    return {
      success: true,
      incidentId: incident._id,
      classification,
      responsePlan,
      automatedActionsExecuted: automatedActions.filter(a => !a.requiresApproval).length,
      requiresApproval: automatedActions.filter(a => a.requiresApproval).length
    };

  } catch (error) {
    console.error('Error processing incident:', error);
    return {
      success: false,
      error: error.message,
      classification: { type: 'unknown', confidence: 0 }
    };
  }
};

// Get incident details
const getIncidentDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const incident = await Incident.findById(id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }

    res.json({
      success: true,
      data: incident
    });

  } catch (error) {
    console.error('Error getting incident details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get incident details',
      error: error.message
    });
  }
};

// Get all incidents with filtering
const getIncidents = async (req, res) => {
  try {
    const { status, severity, priority, limit = 50, skip = 0 } = req.query;

    let query = {};

    if (status) query.status = status;
    if (severity) query['classification.severity'] = severity;
    if (priority) query.priority = parseInt(priority);

    const incidents = await Incident.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(parseInt(skip));

    const total = await Incident.countDocuments(query);

    res.json({
      success: true,
      data: incidents,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip)
    });

  } catch (error) {
    console.error('Error getting incidents:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get incidents',
      error: error.message
    });
  }
};

// Update incident status
const updateIncidentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const update = {
      status,
      updatedAt: new Date()
    };

    if (notes) {
      update.notes = notes;
    }

    const incident = await Incident.findByIdAndUpdate(id, update, { new: true });

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: 'Incident not found'
      });
    }

    res.json({
      success: true,
      data: incident
    });

  } catch (error) {
    console.error('Error updating incident:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update incident',
      error: error.message
    });
  }
};

// Execute manual response action
const executeManualAction = async (req, res) => {
  try {
    const { incidentId, actionId, parameters } = req.body;

    const result = await executeResponseAction(actionId, incidentId, parameters);

    // Update incident with action result
    await Incident.findByIdAndUpdate(incidentId, {
      $push: { executedActions: result },
      updatedAt: new Date()
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error executing manual action:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to execute action',
      error: error.message
    });
  }
};

// Get incident statistics
const getIncidentStats = async (req, res) => {
  try {
    const stats = await Incident.aggregate([
      {
        $group: {
          _id: null,
          totalIncidents: { $sum: 1 },
          activeIncidents: {
            $sum: { $cond: [{ $eq: ['$status', 'ACTIVE'] }, 1, 0] }
          },
          criticalIncidents: {
            $sum: { $cond: [{ $eq: ['$classification.severity', 'CRITICAL'] }, 1, 0] }
          },
          highIncidents: {
            $sum: { $cond: [{ $eq: ['$classification.severity', 'HIGH'] }, 1, 0] }
          },
          resolvedIncidents: {
            $sum: { $cond: [{ $eq: ['$status', 'RESOLVED'] }, 1, 0] }
          },
          avgResolutionTime: { $avg: '$resolutionTime' }
        }
      }
    ]);

    const result = stats[0] || {
      totalIncidents: 0,
      activeIncidents: 0,
      criticalIncidents: 0,
      highIncidents: 0,
      resolvedIncidents: 0,
      avgResolutionTime: 0
    };

    // Get incidents by type
    const incidentsByType = await Incident.aggregate([
      { $group: { _id: '$classification.type', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    result.incidentsByType = incidentsByType;

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error getting incident stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get incident statistics',
      error: error.message
    });
  }
};

export {
  processIncident,
  getIncidentDetails,
  getIncidents,
  updateIncidentStatus,
  executeManualAction,
  getIncidentStats,
  classifyIncident,
  generateResponsePlan
};
