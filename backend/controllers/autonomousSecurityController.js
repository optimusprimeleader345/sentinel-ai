// AI-Powered Autonomous Security Operations (SOAR) Controller
// Self-learning, self-healing cybersecurity platform with autonomous decision-making

import { calculateBehavioralRiskScore } from './behaviorAnalyticsController.js';
import { processIncident } from './incidentResponseController.js';

// Autonomous decision-making confidence thresholds
const AUTONOMY_LEVELS = {
  LOW: 30,      // Human approval required
  MEDIUM: 60,   // Human notification, auto-execute if no response
  HIGH: 85,     // Full autonomy for routine tasks
  CRITICAL: 95  // Emergency autonomous actions
};

// Decision categories and autonomy levels
const DECISION_CATEGORIES = {
  // Routine security tasks - high autonomy
  routine: {
    quarantine_endpoint: { autonomy: 'HIGH', confidence: 90 },
    block_ip: { autonomy: 'HIGH', confidence: 85 },
    enable_mfa: { autonomy: 'HIGH', confidence: 88 },
    reset_weak_password: { autonomy: 'MEDIUM', confidence: 75 }
  },

  // Moderate risk actions - medium autonomy
  moderate: {
    kill_suspicious_process: { autonomy: 'MEDIUM', confidence: 70 },
    disable_user_account: { autonomy: 'LOW', confidence: 45 },
    change_firewall_rules: { autonomy: 'MEDIUM', confidence: 65 }
  },

  // High-risk actions - low autonomy
  critical: {
    shutdown_system: { autonomy: 'LOW', confidence: 20 },
    delete_data: { autonomy: 'LOW', confidence: 15 },
    change_admin_privileges: { autonomy: 'LOW', confidence: 25 }
  }
};

// Self-healing capabilities
const SELF_HEALING_ACTIONS = {
  patch_vulnerability: {
    name: 'Apply Security Patch',
    description: 'Automatically apply security patches for known vulnerabilities',
    autonomous: true,
    requiresApproval: false,
    estimatedTime: 300
  },

  update_configuration: {
    name: 'Update Security Configuration',
    description: 'Automatically correct misconfigurations',
    autonomous: true,
    requiresApproval: false,
    estimatedTime: 60
  },

  restart_service: {
    name: 'Restart Compromised Service',
    description: 'Automatically restart services showing anomalous behavior',
    autonomous: true,
    requiresApproval: true,
    estimatedTime: 30
  },

  isolate_network: {
    name: 'Network Isolation',
    description: 'Automatically isolate affected network segments',
    autonomous: false,
    requiresApproval: true,
    estimatedTime: 15
  }
};

// Learning database - stores decision outcomes for continuous improvement
const learningDatabase = new Map();

// Autonomous decision engine
class AutonomousDecisionEngine {
  constructor() {
    this.decisionHistory = [];
    this.learningEnabled = true;
    this.autonomyLevel = 'MEDIUM'; // Can be LOW, MEDIUM, HIGH, CRITICAL
  }

  // Make autonomous security decision
  async makeDecision(securityEvent, context) {
    try {
      console.log('🤖 Autonomous Decision Engine analyzing event:', securityEvent.type);

      // Step 1: Analyze the security event
      const analysis = await this.analyzeSecurityEvent(securityEvent, context);

      // Step 2: Determine decision category and autonomy level
      const decisionCategory = this.categorizeDecision(securityEvent);
      const requiredAutonomy = DECISION_CATEGORIES[decisionCategory.category]?.[securityEvent.action]?.autonomy || 'LOW';

      // Step 3: Calculate confidence and risk assessment
      const confidence = await this.calculateDecisionConfidence(analysis, securityEvent);
      const riskAssessment = await this.assessDecisionRisk(securityEvent, analysis);

      // Step 4: Determine if autonomous execution is allowed
      const canExecuteAutonomously = this.canExecuteAutonomously(requiredAutonomy, confidence, riskAssessment);

      // Step 5: Generate decision outcome
      const decision = {
        eventId: securityEvent.id,
        timestamp: new Date(),
        analysis,
        decisionCategory,
        requiredAutonomy,
        confidence,
        riskAssessment,
        canExecuteAutonomously,
        recommendedAction: this.generateRecommendedAction(securityEvent, analysis),
        reasoning: this.generateDecisionReasoning(analysis, confidence, riskAssessment),
        learningInsights: this.extractLearningInsights(securityEvent, analysis)
      };

      // Step 6: Store decision for learning
      this.storeDecisionForLearning(decision);

      console.log('✅ Autonomous decision made:', {
        canExecute: canExecuteAutonomously,
        confidence: confidence,
        action: decision.recommendedAction
      });

      return decision;

    } catch (error) {
      console.error('❌ Error in autonomous decision making:', error);
      return {
        error: true,
        message: 'Decision engine error',
        fallbackAction: 'ESCALATE_TO_HUMAN'
      };
    }
  }

  // Analyze security event with AI
  async analyzeSecurityEvent(securityEvent, context) {
    const analysis = {
      threatLevel: 'UNKNOWN',
      impactAssessment: 'LOW',
      urgency: 'LOW',
      patterns: [],
      correlations: [],
      historicalContext: {}
    };

    // Threat level assessment
    analysis.threatLevel = this.assessThreatLevel(securityEvent);

    // Impact assessment
    analysis.impactAssessment = this.assessImpact(securityEvent, context);

    // Urgency calculation
    analysis.urgency = this.calculateUrgency(securityEvent, analysis);

    // Pattern recognition
    analysis.patterns = await this.recognizePatterns(securityEvent);

    // Correlation analysis
    analysis.correlations = await this.analyzeCorrelations(securityEvent, context);

    // Historical context
    analysis.historicalContext = this.getHistoricalContext(securityEvent);

    return analysis;
  }

  // Assess threat level using AI
  assessThreatLevel(event) {
    const threatIndicators = {
      'CRITICAL': ['ransomware', 'data_breach', 'privilege_escalation', 'zero_day'],
      'HIGH': ['malware', 'phishing', 'ddos', 'unauthorized_access'],
      'MEDIUM': ['suspicious_login', 'unusual_traffic', 'configuration_change'],
      'LOW': ['failed_login', 'timeout', 'minor_anomaly']
    };

    for (const [level, indicators] of Object.entries(threatIndicators)) {
      if (indicators.some(indicator =>
        event.description?.toLowerCase().includes(indicator) ||
        event.type?.toLowerCase().includes(indicator)
      )) {
        return level;
      }
    }

    return 'MEDIUM'; // Default
  }

  // Assess business impact
  assessImpact(event, context) {
    let impact = 0;

    // Asset criticality (0-40 points)
    const assetCriticality = context?.assetCriticality || 5;
    impact += assetCriticality * 8;

    // Data sensitivity (0-30 points)
    const dataSensitivity = context?.dataSensitivity || 3;
    impact += dataSensitivity * 10;

    // User impact (0-20 points)
    const userImpact = context?.affectedUsers || 1;
    impact += Math.min(userImpact * 2, 20);

    // Time sensitivity (0-10 points)
    const timeSensitivity = context?.timeSensitivity || 1;
    impact += timeSensitivity * 10;

    if (impact >= 80) return 'CRITICAL';
    if (impact >= 60) return 'HIGH';
    if (impact >= 40) return 'MEDIUM';
    return 'LOW';
  }

  // Calculate urgency based on threat and impact
  calculateUrgency(event, analysis) {
    const threatMultiplier = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };
    const impactMultiplier = { 'CRITICAL': 4, 'HIGH': 3, 'MEDIUM': 2, 'LOW': 1 };

    const urgency = (threatMultiplier[analysis.threatLevel] + impactMultiplier[analysis.impactAssessment]) / 2;

    if (urgency >= 3.5) return 'CRITICAL';
    if (urgency >= 2.5) return 'HIGH';
    if (urgency >= 1.5) return 'MEDIUM';
    return 'LOW';
  }

  // Pattern recognition using AI
  async recognizePatterns(event) {
    const patterns = [];

    // Time-based patterns
    if (this.isOffHours(event.timestamp)) {
      patterns.push('off-hours-activity');
    }

    // Frequency patterns
    if (event.frequency > 10) {
      patterns.push('high-frequency-events');
    }

    // Location patterns
    if (event.location !== event.expectedLocation) {
      patterns.push('unusual-location');
    }

    // Behavioral patterns
    if (event.behavioralAnomaly) {
      patterns.push('behavioral-anomaly');
    }

    return patterns;
  }

  // Analyze correlations with other events
  async analyzeCorrelations(event, context) {
    const correlations = [];

    // Check for related events in the last hour
    const recentEvents = context?.recentEvents || [];
    const relatedEvents = recentEvents.filter(e =>
      e.source === event.source ||
      e.user === event.user ||
      e.asset === event.asset
    );

    if (relatedEvents.length > 3) {
      correlations.push('multiple-related-events');
    }

    // Check for attack patterns
    if (this.isPartOfAttackChain(event, recentEvents)) {
      correlations.push('attack-chain-pattern');
    }

    return correlations;
  }

  // Get historical context
  getHistoricalContext(event) {
    const history = learningDatabase.get(event.type) || [];
    const similarEvents = history.filter(h =>
      h.outcome === 'SUCCESS' &&
      Math.abs(new Date(h.timestamp) - new Date(event.timestamp)) < 24 * 60 * 60 * 1000
    );

    return {
      similarEventsCount: similarEvents.length,
      successRate: similarEvents.length > 0 ?
        similarEvents.filter(s => s.outcome === 'SUCCESS').length / similarEvents.length : 0,
      avgResolutionTime: similarEvents.length > 0 ?
        similarEvents.reduce((sum, s) => sum + s.resolutionTime, 0) / similarEvents.length : 0
    };
  }

  // Categorize the type of decision needed
  categorizeDecision(event) {
    const action = event.action || event.type;

    // Check if it's a routine action
    if (DECISION_CATEGORIES.routine[action]) {
      return { category: 'routine', action };
    }

    // Check if it's moderate risk
    if (DECISION_CATEGORIES.moderate[action]) {
      return { category: 'moderate', action };
    }

    // Check if it's critical
    if (DECISION_CATEGORIES.critical[action]) {
      return { category: 'critical', action };
    }

    // Default to moderate
    return { category: 'moderate', action: 'unknown' };
  }

  // Calculate confidence in the decision
  async calculateDecisionConfidence(analysis, event) {
    let confidence = 50; // Base confidence

    // Threat level confidence (20 points)
    const threatConfidence = { 'CRITICAL': 20, 'HIGH': 15, 'MEDIUM': 10, 'LOW': 5 };
    confidence += threatConfidence[analysis.threatLevel] || 0;

    // Historical success rate (15 points)
    confidence += analysis.historicalContext.successRate * 15;

    // Pattern recognition confidence (10 points)
    confidence += analysis.patterns.length * 2;

    // Correlation strength (10 points)
    confidence += analysis.correlations.length * 3;

    // AI model confidence (up to 20 points)
    confidence += Math.random() * 20; // Simulate AI model confidence

    // Urgency boost (10 points for critical urgency)
    if (analysis.urgency === 'CRITICAL') confidence += 10;

    return Math.min(100, Math.max(0, confidence));
  }

  // Assess risk of autonomous execution
  async assessDecisionRisk(event, analysis) {
    let risk = 0;

    // Impact risk (0-40 points)
    const impactRisk = { 'CRITICAL': 40, 'HIGH': 30, 'MEDIUM': 20, 'LOW': 10 };
    risk += impactRisk[analysis.impactAssessment] || 0;

    // Urgency risk reduction (negative risk for urgent situations)
    const urgencyRisk = { 'CRITICAL': -10, 'HIGH': -5, 'MEDIUM': 0, 'LOW': 5 };
    risk += urgencyRisk[analysis.urgency] || 0;

    // Historical failure risk (0-20 points)
    const failureRate = 1 - analysis.historicalContext.successRate;
    risk += failureRate * 20;

    // Autonomy level risk adjustment
    const autonomyRisk = { 'CRITICAL': 15, 'HIGH': 10, 'MEDIUM': 5, 'LOW': 0 };
    risk += autonomyRisk[this.autonomyLevel] || 0;

    return Math.max(0, risk);
  }

  // Determine if autonomous execution is allowed
  canExecuteAutonomously(requiredAutonomy, confidence, risk) {
    const autonomyThresholds = {
      'CRITICAL': AUTONOMY_LEVELS.CRITICAL,
      'HIGH': AUTONOMY_LEVELS.HIGH,
      'MEDIUM': AUTONOMY_LEVELS.MEDIUM,
      'LOW': AUTONOMY_LEVELS.LOW
    };

    const requiredConfidence = autonomyThresholds[requiredAutonomy] || AUTONOMY_LEVELS.LOW;

    // Allow autonomous execution if confidence is high enough and risk is acceptable
    return confidence >= requiredConfidence && risk < 50;
  }

  // Generate recommended action
  generateRecommendedAction(event, analysis) {
    // Based on analysis, determine the best course of action
    if (analysis.urgency === 'CRITICAL') {
      return 'IMMEDIATE_AUTONOMOUS_RESPONSE';
    }

    if (analysis.impactAssessment === 'CRITICAL') {
      return 'ESCALATE_WITH_AUTONOMOUS_CONTAINMENT';
    }

    if (analysis.threatLevel === 'CRITICAL') {
      return 'AUTONOMOUS_ISOLATION_AND_ANALYSIS';
    }

    if (analysis.patterns.includes('attack-chain-pattern')) {
      return 'AUTONOMOUS_CHAIN_DISRUPTION';
    }

    return 'MONITOR_AND_ANALYZE';
  }

  // Generate decision reasoning
  generateDecisionReasoning(analysis, confidence, risk) {
    return `Based on ${analysis.threatLevel} threat level, ${analysis.impactAssessment} impact assessment, and ${analysis.urgency} urgency, with ${confidence}% confidence and ${risk} risk score. Historical success rate: ${(analysis.historicalContext.successRate * 100).toFixed(1)}%. Patterns identified: ${analysis.patterns.join(', ')}.`;
  }

  // Extract learning insights
  extractLearningInsights(event, analysis) {
    return {
      eventType: event.type,
      threatLevel: analysis.threatLevel,
      patterns: analysis.patterns,
      correlations: analysis.correlations,
      decisionConfidence: analysis.confidence,
      outcome: 'PENDING' // Will be updated after execution
    };
  }

  // Store decision for learning
  storeDecisionForLearning(decision) {
    this.decisionHistory.push(decision);

    // Update learning database
    const key = decision.eventId;
    learningDatabase.set(key, decision);

    // Keep only last 1000 decisions
    if (this.decisionHistory.length > 1000) {
      this.decisionHistory = this.decisionHistory.slice(-1000);
    }
  }

  // Update decision outcome for learning
  updateDecisionOutcome(decisionId, outcome, resolutionTime) {
    const decision = learningDatabase.get(decisionId);
    if (decision) {
      decision.outcome = outcome;
      decision.resolutionTime = resolutionTime;
      decision.completedAt = new Date();
    }
  }

  // Check if event is during off-hours
  isOffHours(timestamp) {
    const hour = new Date(timestamp).getHours();
    return hour < 6 || hour > 22; // Outside 6 AM - 10 PM
  }

  // Check if event is part of an attack chain
  isPartOfAttackChain(event, recentEvents) {
    // Simple attack chain detection logic
    const chainPatterns = [
      ['reconnaissance', 'initial_access', 'execution'],
      ['phishing', 'credential_access', 'lateral_movement'],
      ['malware', 'persistence', 'data_exfiltration']
    ];

    // Check if this event fits into known attack chains
    return chainPatterns.some(chain =>
      chain.some(phase => event.type?.toLowerCase().includes(phase))
    );
  }
}

// Self-healing system
class SelfHealingSystem {
  constructor() {
    this.healingHistory = [];
    this.activeHealings = new Map();
  }

  // Attempt autonomous healing
  async attemptSelfHealing(securityIssue, context) {
    try {
      console.log('🔧 Self-Healing System analyzing issue:', securityIssue.type);

      // Determine if autonomous healing is possible
      const healingAction = this.determineHealingAction(securityIssue);

      if (!healingAction) {
        console.log('❌ No autonomous healing action available');
        return { success: false, reason: 'NO_AUTONOMOUS_HEALING_AVAILABLE' };
      }

      // Check if healing is allowed autonomously
      if (!healingAction.autonomous) {
        console.log('⚠️ Healing requires human approval');
        return { success: false, reason: 'REQUIRES_HUMAN_APPROVAL', action: healingAction };
      }

      // Execute healing action
      const result = await this.executeHealingAction(healingAction, securityIssue, context);

      // Log healing attempt
      this.logHealingAttempt(securityIssue, healingAction, result);

      return result;

    } catch (error) {
      console.error('❌ Self-healing error:', error);
      return { success: false, reason: 'HEALING_EXECUTION_ERROR', error: error.message };
    }
  }

  // Determine appropriate healing action
  determineHealingAction(securityIssue) {
    const issueType = securityIssue.type?.toLowerCase();

    if (issueType?.includes('vulnerability') || issueType?.includes('patch')) {
      return SELF_HEALING_ACTIONS.patch_vulnerability;
    }

    if (issueType?.includes('configuration') || issueType?.includes('misconfig')) {
      return SELF_HEALING_ACTIONS.update_configuration;
    }

    if (issueType?.includes('service') || issueType?.includes('process')) {
      return SELF_HEALING_ACTIONS.restart_service;
    }

    if (issueType?.includes('network') || issueType?.includes('isolation')) {
      return SELF_HEALING_ACTIONS.isolate_network;
    }

    return null;
  }

  // Execute healing action
  async executeHealingAction(action, issue, context) {
    // Simulate healing execution
    const executionTime = Math.random() * action.estimatedTime;
    await new Promise(resolve => setTimeout(resolve, executionTime * 100)); // Simulate execution time

    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1;

    const result = {
      success,
      action: action.name,
      executionTime,
      timestamp: new Date(),
      issueId: issue.id,
      details: success ?
        `${action.name} completed successfully` :
        `Failed to execute ${action.name}`
    };

    if (success) {
      result.verification = await this.verifyHealing(action, issue);
    }

    return result;
  }

  // Verify healing effectiveness
  async verifyHealing(action, issue) {
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    return {
      verified: true,
      checks: ['Service status', 'Configuration validation', 'Security scan'],
      timestamp: new Date()
    };
  }

  // Log healing attempt
  logHealingAttempt(issue, action, result) {
    const logEntry = {
      issueId: issue.id,
      issueType: issue.type,
      action: action.name,
      success: result.success,
      executionTime: result.executionTime,
      timestamp: new Date(),
      details: result.details
    };

    this.healingHistory.push(logEntry);

    // Keep only last 500 healing attempts
    if (this.healingHistory.length > 500) {
      this.healingHistory = this.healingHistory.slice(-500);
    }
  }
}

// Initialize autonomous systems
const decisionEngine = new AutonomousDecisionEngine();
const selfHealingSystem = new SelfHealingSystem();

// Main autonomous security operations function
const processAutonomousSecurity = async (req, res) => {
  try {
    const { securityEvent, context = {} } = req.body;

    console.log('🚀 Processing autonomous security event:', securityEvent.type);

    // Step 1: Make autonomous decision
    const decision = await decisionEngine.makeDecision(securityEvent, context);

    if (decision.error) {
      return res.status(500).json({
        success: false,
        error: decision.message,
        action: decision.fallbackAction
      });
    }

    // Step 2: Attempt self-healing if applicable
    let healingResult = null;
    if (decision.canExecuteAutonomously && securityEvent.type !== 'alert') {
      healingResult = await selfHealingSystem.attemptSelfHealing(securityEvent, context);
    }

    // Step 3: Prepare response
    const response = {
      success: true,
      decision,
      healingResult,
      autonomousActionTaken: decision.canExecuteAutonomously,
      requiresHumanApproval: !decision.canExecuteAutonomously,
      timestamp: new Date()
    };

    // Step 4: Log autonomous action
    if (decision.canExecuteAutonomously) {
      console.log('🤖 AUTONOMOUS ACTION EXECUTED:', decision.recommendedAction);
    } else {
      console.log('👤 HUMAN APPROVAL REQUIRED for:', decision.recommendedAction);
    }

    res.json(response);

  } catch (error) {
    console.error('❌ Error in autonomous security processing:', error);
    res.status(500).json({
      success: false,
      message: 'Autonomous security processing failed',
      error: error.message
    });
  }
};

// Get autonomous system status
const getAutonomousStatus = async (req, res) => {
  try {
    const status = {
      decisionEngine: {
        active: true,
        autonomyLevel: decisionEngine.autonomyLevel,
        decisionsMade: decisionEngine.decisionHistory.length,
        learningEnabled: decisionEngine.learningEnabled,
        lastDecision: decisionEngine.decisionHistory[decisionEngine.decisionHistory.length - 1]?.timestamp
      },
      selfHealing: {
        active: true,
        healingAttempts: selfHealingSystem.healingHistory.length,
        successRate: selfHealingSystem.healingHistory.length > 0 ?
          (selfHealingSystem.healingHistory.filter(h => h.success).length / selfHealingSystem.healingHistory.length) * 100 : 0,
        activeHealings: selfHealingSystem.activeHealings.size
      },
      learningDatabase: {
        totalDecisions: learningDatabase.size,
        avgConfidence: Array.from(learningDatabase.values())
          .reduce((sum, d) => sum + (d.confidence || 0), 0) / Math.max(learningDatabase.size, 1)
      },
      timestamp: new Date()
    };

    res.json({
      success: true,
      status
    });

  } catch (error) {
    console.error('Error getting autonomous status:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get autonomous status',
      error: error.message
    });
  }
};

// Update autonomy level
const updateAutonomyLevel = async (req, res) => {
  try {
    const { level } = req.body;

    if (!['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(level)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid autonomy level. Must be LOW, MEDIUM, HIGH, or CRITICAL'
      });
    }

    decisionEngine.autonomyLevel = level;

    res.json({
      success: true,
      message: `Autonomy level updated to ${level}`,
      newLevel: level
    });

  } catch (error) {
    console.error('Error updating autonomy level:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update autonomy level',
      error: error.message
    });
  }
};

// Get decision history
const getDecisionHistory = async (req, res) => {
  try {
    const { limit = 50, offset = 0 } = req.query;

    const history = decisionEngine.decisionHistory
      .slice(-parseInt(limit) - parseInt(offset))
      .slice(-parseInt(limit));

    res.json({
      success: true,
      data: history,
      total: decisionEngine.decisionHistory.length,
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

  } catch (error) {
    console.error('Error getting decision history:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get decision history',
      error: error.message
    });
  }
};

// Override autonomous decision (human intervention)
const overrideDecision = async (req, res) => {
  try {
    const { decisionId, overrideAction, reason } = req.body;

    // Find the decision
    const decision = decisionEngine.decisionHistory.find(d => d.eventId === decisionId);

    if (!decision) {
      return res.status(404).json({
        success: false,
        message: 'Decision not found'
      });
    }

    // Update decision with override
    decision.override = {
      action: overrideAction,
      reason,
      timestamp: new Date(),
      humanOverride: true
    };

    // Update learning database
    decisionEngine.updateDecisionOutcome(decisionId, overrideAction, 0);

    res.json({
      success: true,
      message: 'Decision override recorded',
      override: decision.override
    });

  } catch (error) {
    console.error('Error overriding decision:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to override decision',
      error: error.message
    });
  }
};

export {
  processAutonomousSecurity,
  getAutonomousStatus,
  updateAutonomyLevel,
  getDecisionHistory,
  overrideDecision,
  decisionEngine,
  selfHealingSystem
};
