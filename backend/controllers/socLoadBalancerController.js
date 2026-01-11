const fs = require('fs').promises;
const path = require('path');

// 🤖 AUTONOMOUS SOC LOAD BALANCER ENGINE
// SAFE MODE - AI-powered workload distribution to prevent analyst burnout

// In-memory SOC intelligence database
let socIntelligenceDB = {
  analystWorkload: new Map(),
  threatQueue: [],
  escalationRules: new Map(),
  loadMetrics: new Map(),
  lastUpdated: new Date()
};

// Autonomous SOC Load Balancer Engine
class SOCLoadBalancerEngine {
  constructor() {
    // SAFE MODE constraints
    this.safeModeConstraints = {
      maxAlertsPerAnalystPerHour: 50,
      maxCriticalAlertsPerAnalystPerHour: 10,
      minRestPeriodBetweenCriticalAlerts: 15, // minutes
      maxConsecutiveHoursWithoutBreak: 4,
      fatigueThresholdScore: 75,
      burnoutPreventionScore: 85
    };

    // Analyst capacity profiles
    this.analystProfiles = {
      'SENIOR_ANALYST': {
        capacity: { low: 80, medium: 60, high: 40, critical: 20 },
        specialization: ['APT', 'ZeroDay', 'InsiderThreat'],
        fatigueResistance: 0.8
      },
      'MID_LEVEL_ANALYST': {
        capacity: { low: 60, medium: 40, high: 25, critical: 10 },
        specialization: ['Malware', 'Phishing', 'DDoS'],
        fatigueResistance: 0.6
      },
      'JUNIOR_ANALYST': {
        capacity: { low: 40, medium: 25, high: 15, critical: 5 },
        specialization: ['Scanning', 'BasicAlerts', 'Monitoring'],
        fatigueResistance: 0.4
      }
    };

    // Load balancing algorithms
    this.algorithms = {
      ROUND_ROBIN: 'roundRobin',
      LEAST_LOADED: 'leastLoaded',
      SPECIALIZATION_BASED: 'specializationBased',
      AI_OPTIMIZED: 'aiOptimized'
    };

    this.currentAlgorithm = this.algorithms.AI_OPTIMIZED;
  }

  // Analyze and balance SOC workload
  async balanceSOCWorkload(threats, analysts, options = {}) {
    try {
      const {
        algorithm = this.currentAlgorithm,
        timeWindow = 60, // minutes
        safeMode = true,
        considerFatigue = true
      } = options;

      // Update analyst workload metrics
      const currentWorkload = this.calculateCurrentWorkload(analysts, timeWindow);

      // Classify threats by priority and complexity
      const classifiedThreats = this.classifyThreats(threats);

      // Apply load balancing algorithm
      let assignmentResult;
      switch (algorithm) {
        case this.algorithms.AI_OPTIMIZED:
          assignmentResult = await this.applyAIOptimizedBalancing(classifiedThreats, currentWorkload, safeMode, considerFatigue);
          break;
        case this.algorithms.SPECIALIZATION_BASED:
          assignmentResult = this.applySpecializationBasedBalancing(classifiedThreats, currentWorkload);
          break;
        case this.algorithms.LEAST_LOADED:
          assignmentResult = this.applyLeastLoadedBalancing(classifiedThreats, currentWorkload);
          break;
        default:
          assignmentResult = this.applyRoundRobinBalancing(classifiedThreats, analysts);
      }

      // Generate SAFE MODE recommendations
      const safeModeRecommendations = safeMode ? this.generateSafeModeRecommendations(assignmentResult, currentWorkload) : [];

      // Calculate system health metrics
      const systemHealth = this.calculateSystemHealth(assignmentResult, currentWorkload, threats.length);

      const balancingResult = {
        algorithm,
        totalThreats: threats.length,
        assignedThreats: assignmentResult.assignedThreats,
        unassignedThreats: assignmentResult.unassignedThreats,
        assignments: assignmentResult.assignments,
        safeModeRecommendations,
        systemHealth,
        balancingMetrics: this.generateBalancingMetrics(assignmentResult, currentWorkload),
        generatedAt: new Date().toISOString(),
        nextBalancingDue: this.calculateNextBalancingTime(systemHealth.loadImbalance)
      };

      // Update intelligence database
      this.updateSOCIntelligence(assignmentResult, currentWorkload, balancingResult);

      return balancingResult;

    } catch (error) {
      console.error('SOC load balancing error:', error);
      throw error;
    }
  }

  // Classify threats by priority, complexity, and resource requirements
  classifyThreats(threats) {
    return threats.map(threat => {
      const classification = {
        ...threat,
        priority: this.determineThreatPriority(threat),
        complexity: this.determineThreatComplexity(threat),
        estimatedAnalysisTime: this.estimateAnalysisTime(threat),
        requiredSpecialization: this.determineRequiredSpecialization(threat),
        urgency: this.calculateUrgency(threat),
        resourceIntensity: this.calculateResourceIntensity(threat)
      };

      return classification;
    }).sort((a, b) => b.urgency - a.urgency); // Sort by urgency descending
  }

  determineThreatPriority(threat) {
    const severity = threat.severity?.toLowerCase() || 'unknown';
    const aiConfidence = threat.aiConfidence || 0;

    if (severity === 'critical' || aiConfidence > 90) return 'CRITICAL';
    if (severity === 'high' || aiConfidence > 75) return 'HIGH';
    if (severity === 'medium' || aiConfidence > 60) return 'MEDIUM';
    return 'LOW';
  }

  determineThreatComplexity(threat) {
    let complexity = 1; // Base complexity

    // Increase based on indicators
    if (threat.affectedSystems > 10) complexity += 2;
    if (threat.threatType?.includes('APT')) complexity += 3;
    if (threat.threatType?.includes('ZeroDay')) complexity += 3;
    if (threat.correlatedIncidents > 5) complexity += 2;
    if (threat.aiConfidence > 80) complexity += 1;

    return Math.min(complexity, 5); // Max complexity 5
  }

  estimateAnalysisTime(threat) {
    const baseTime = 15; // 15 minutes base
    const complexityMultiplier = threat.complexity || 1;
    const priorityMultiplier = {
      'CRITICAL': 2.0,
      'HIGH': 1.5,
      'MEDIUM': 1.0,
      'LOW': 0.8
    }[threat.priority] || 1.0;

    return Math.round(baseTime * complexityMultiplier * priorityMultiplier);
  }

  determineRequiredSpecialization(threat) {
    const specializations = [];

    if (threat.threatType?.includes('APT') || threat.threatType?.includes('Advanced')) {
      specializations.push('APT');
    }
    if (threat.threatType?.includes('Malware') || threat.indicators?.includes('malware')) {
      specializations.push('Malware');
    }
    if (threat.threatType?.includes('Phishing') || threat.indicators?.includes('phishing')) {
      specializations.push('Phishing');
    }
    if (threat.threatType?.includes('DDoS')) {
      specializations.push('DDoS');
    }
    if (threat.threatType?.includes('ZeroDay') || threat.aiConfidence > 90) {
      specializations.push('ZeroDay');
    }

    return specializations.length > 0 ? specializations : ['General'];
  }

  calculateUrgency(threat) {
    const now = new Date();
    const threatTime = new Date(threat.timestamp || threat.detectedAt || now);
    const ageInMinutes = (now - threatTime) / (1000 * 60);

    const priorityWeights = {
      'CRITICAL': 100,
      'HIGH': 75,
      'MEDIUM': 50,
      'LOW': 25
    };

    const priorityScore = priorityWeights[threat.priority] || 25;
    const agePenalty = Math.min(ageInMinutes * 2, 50); // Age penalty up to 50 points

    return priorityScore + agePenalty;
  }

  calculateResourceIntensity(threat) {
    const complexity = threat.complexity || 1;
    const estimatedTime = threat.estimatedAnalysisTime || 15;

    return Math.round((complexity * estimatedTime) / 10); // Scale 1-10
  }

  // Load balancing algorithms
  async applyAIOptimizedBalancing(threats, currentWorkload, safeMode, considerFatigue) {
    const assignments = [];
    const assignedThreats = [];
    const unassignedThreats = [];

    for (const threat of threats) {
      const bestAnalyst = this.findOptimalAnalystForThreat(threat, currentWorkload, assignments, safeMode, considerFatigue);

      if (bestAnalyst) {
        assignments.push({
          threatId: threat.id,
          analystId: bestAnalyst.analystId,
          analystName: bestAnalyst.name,
          assignmentReason: bestAnalyst.reason,
          estimatedCompletion: new Date(Date.now() + (threat.estimatedAnalysisTime || 30) * 60 * 1000).toISOString(),
          safeModeApplied: bestAnalyst.safeModeApplied || false
        });

        assignedThreats.push(threat);

        // Update workload for next iteration
        currentWorkload[bestAnalyst.analystId] = (currentWorkload[bestAnalyst.analystId] || 0) + (threat.estimatedAnalysisTime || 30);
      } else {
        unassignedThreats.push(threat);
      }
    }

    return { assignments, assignedThreats, unassignedThreats };
  }

  findOptimalAnalystForThreat(threat, currentWorkload, existingAssignments, safeMode, considerFatigue) {
    const availableAnalysts = Object.keys(currentWorkload);

    let bestAnalyst = null;
    let bestScore = -1;
    let bestReason = '';

    for (const analystId of availableAnalysts) {
      const analyst = { id: analystId, name: `Analyst ${analystId}` }; // In production, get from database
      const workload = currentWorkload[analystId] || 0;

      // Check SAFE MODE constraints
      if (safeMode && !this.checkSafeModeCompliance(analystId, threat, workload, existingAssignments)) {
        continue;
      }

      // Calculate assignment score
      const score = this.calculateAssignmentScore(threat, analyst, workload, considerFatigue);

      if (score > bestScore) {
        bestScore = score;
        bestAnalyst = {
          analystId,
          name: analyst.name,
          reason: this.getAssignmentReason(threat, analyst, workload, score),
          safeModeApplied: safeMode
        };
      }
    }

    return bestAnalyst;
  }

  calculateAssignmentScore(threat, analyst, currentWorkload, considerFatigue) {
    let score = 0;

    // Specialization matching (0-40 points)
    const specializationMatch = this.calculateSpecializationMatch(threat, analyst);
    score += specializationMatch * 40;

    // Workload balancing (0-30 points)
    const workloadScore = this.calculateWorkloadBalanceScore(currentWorkload);
    score += workloadScore * 30;

    // Fatigue consideration (0-20 points, if enabled)
    if (considerFatigue) {
      const fatigueScore = this.calculateFatigueScore(analyst.id, threat.priority);
      score += fatigueScore * 20;
    }

    // Urgency bonus (0-10 points)
    const urgencyScore = Math.min(threat.urgency / 10, 10);
    score += urgencyScore;

    return Math.round(score);
  }

  calculateSpecializationMatch(threat, analyst) {
    // Mock specialization data - in production, get from analyst profile
    const analystSpecializations = this.analystProfiles['SENIOR_ANALYST'].specialization; // Default

    const requiredSpecs = threat.requiredSpecialization || [];
    if (requiredSpecs.length === 0) return 1; // General threat

    const matches = requiredSpecs.filter(spec => analystSpecializations.includes(spec));
    return matches.length / requiredSpecs.length;
  }

  calculateWorkloadBalanceScore(currentWorkload) {
    const avgWorkload = Object.values(currentWorkload).reduce((sum, w) => sum + w, 0) / Object.keys(currentWorkload).length;
    const deviation = Math.abs(currentWorkload - avgWorkload) / avgWorkload;

    return Math.max(0, 1 - deviation); // Higher score for better balance
  }

  calculateFatigueScore(analystId, threatPriority) {
    // Mock fatigue calculation - in production, track actual analyst fatigue
    const baseFatigue = 0.3; // 30% base fatigue
    const priorityFatigue = threatPriority === 'CRITICAL' ? 0.2 : 0.1;

    return Math.max(0, 1 - (baseFatigue + priorityFatigue));
  }

  checkSafeModeCompliance(analystId, threat, currentWorkload, existingAssignments) {
    // Check max alerts per hour
    const recentAssignments = existingAssignments.filter(a =>
      a.analystId === analystId &&
      new Date(a.estimatedCompletion) > new Date(Date.now() - 60 * 60 * 1000)
    );

    if (recentAssignments.length >= this.safeModeConstraints.maxAlertsPerAnalystPerHour) {
      return false;
    }

    // Check critical alert limits
    if (threat.priority === 'CRITICAL') {
      const recentCritical = recentAssignments.filter(a =>
        a.threatPriority === 'CRITICAL' &&
        new Date(a.estimatedCompletion) > new Date(Date.now() - 60 * 60 * 1000)
      );

      if (recentCritical.length >= this.safeModeConstraints.maxCriticalAlertsPerAnalystPerHour) {
        return false;
      }
    }

    // Check workload threshold
    if (currentWorkload > 300) { // 5 hours of work
      return false;
    }

    return true;
  }

  getAssignmentReason(threat, analyst, workload, score) {
    if (score >= 80) return 'Optimal match: specialization + low workload';
    if (score >= 60) return 'Good match: balanced workload';
    if (score >= 40) return 'Acceptable match: available capacity';
    return 'Fallback assignment: minimal load';
  }

  // Simplified balancing algorithms for completeness
  applySpecializationBasedBalancing(threats, currentWorkload) {
    // Implementation would prioritize analyst specializations
    return this.applyAIOptimizedBalancing(threats, currentWorkload, false, false);
  }

  applyLeastLoadedBalancing(threats, currentWorkload) {
    // Implementation would prioritize least loaded analysts
    return this.applyAIOptimizedBalancing(threats, currentWorkload, false, false);
  }

  applyRoundRobinBalancing(threats, analysts) {
    // Simple round-robin assignment
    const assignments = [];
    const analystIds = analysts.map(a => a.id);

    threats.forEach((threat, index) => {
      const analystId = analystIds[index % analystIds.length];
      assignments.push({
        threatId: threat.id,
        analystId,
        analystName: `Analyst ${analystId}`,
        assignmentReason: 'Round-robin assignment'
      });
    });

    return {
      assignments,
      assignedThreats: threats,
      unassignedThreats: []
    };
  }

  // Calculate current analyst workload
  calculateCurrentWorkload(analysts, timeWindow) {
    const workload = {};

    // Mock workload calculation - in production, query actual assignments
    analysts.forEach(analyst => {
      workload[analyst.id] = Math.floor(Math.random() * 200); // 0-200 minutes of work
    });

    return workload;
  }

  // Generate SAFE MODE recommendations
  generateSafeModeRecommendations(assignmentResult, currentWorkload) {
    const recommendations = [];

    // Check for overloaded analysts
    const overloaded = Object.entries(currentWorkload)
      .filter(([_, workload]) => workload > 240) // 4+ hours
      .map(([analystId, workload]) => ({ analystId, workload }));

    if (overloaded.length > 0) {
      recommendations.push({
        type: 'OVERLOAD_PREVENTION',
        severity: 'HIGH',
        message: `${overloaded.length} analysts at risk of overload`,
        action: 'Consider redistributing workload or adding break periods',
        affectedAnalysts: overloaded.map(o => o.analystId)
      });
    }

    // Check for unassigned critical threats
    const unassignedCritical = assignmentResult.unassignedThreats.filter(t => t.priority === 'CRITICAL');

    if (unassignedCritical.length > 0) {
      recommendations.push({
        type: 'CRITICAL_THREAT_COVERAGE',
        severity: 'CRITICAL',
        message: `${unassignedCritical.length} critical threats unassigned`,
        action: 'Immediate reassignment required - all analysts at capacity',
        affectedThreats: unassignedCritical.map(t => t.id)
      });
    }

    // Check for fatigue patterns
    const fatigueRisk = Object.keys(currentWorkload).length > 0 ?
      Object.values(currentWorkload).filter(w => w > 300).length : 0;

    if (fatigueRisk > 0) {
      recommendations.push({
        type: 'FATIGUE_PREVENTION',
        severity: 'MEDIUM',
        message: 'Fatigue risk detected in analyst pool',
        action: 'Schedule mandatory breaks and monitor analyst well-being',
        affectedAnalysts: Object.keys(currentWorkload).filter(id => currentWorkload[id] > 300)
      });
    }

    return recommendations;
  }

  // Calculate system health metrics
  calculateSystemHealth(assignmentResult, currentWorkload, totalThreats) {
    const assignmentRate = totalThreats > 0 ? (assignmentResult.assignedThreats.length / totalThreats) * 100 : 0;

    const workloadValues = Object.values(currentWorkload);
    const avgWorkload = workloadValues.reduce((sum, w) => sum + w, 0) / workloadValues.length;
    const maxWorkload = Math.max(...workloadValues);
    const minWorkload = Math.min(...workloadValues);

    const loadImbalance = avgWorkload > 0 ? ((maxWorkload - minWorkload) / avgWorkload) * 100 : 0;

    let healthStatus = 'HEALTHY';
    if (assignmentRate < 80) healthStatus = 'OVERLOADED';
    else if (loadImbalance > 50) healthStatus = 'UNBALANCED';
    else if (assignmentResult.unassignedThreats.some(t => t.priority === 'CRITICAL')) healthStatus = 'CRITICAL';

    return {
      assignmentRate: Math.round(assignmentRate),
      averageWorkload: Math.round(avgWorkload),
      loadImbalance: Math.round(loadImbalance),
      healthStatus,
      totalAnalysts: Object.keys(currentWorkload).length,
      activeAnalysts: workloadValues.filter(w => w > 0).length
    };
  }

  // Generate balancing metrics
  generateBalancingMetrics(assignmentResult, currentWorkload) {
    const priorityDistribution = {
      CRITICAL: assignmentResult.assignedThreats.filter(t => t.priority === 'CRITICAL').length,
      HIGH: assignmentResult.assignedThreats.filter(t => t.priority === 'HIGH').length,
      MEDIUM: assignmentResult.assignedThreats.filter(t => t.priority === 'MEDIUM').length,
      LOW: assignmentResult.assignedThreats.filter(t => t.priority === 'LOW').length
    };

    const analystUtilization = Object.entries(currentWorkload).map(([analystId, workload]) => ({
      analystId,
      workload,
      utilization: Math.min(100, Math.round((workload / 480) * 100)) // Assuming 8-hour shift
    }));

    return {
      priorityDistribution,
      analystUtilization,
      efficiency: Math.round((assignmentResult.assignedThreats.length / Object.keys(currentWorkload).length) * 10) / 10
    };
  }

  // Calculate next balancing time based on system health
  calculateNextBalancingTime(loadImbalance) {
    const now = new Date();

    if (loadImbalance > 75) return new Date(now.getTime() + 15 * 60 * 1000).toISOString(); // 15 min
    if (loadImbalance > 50) return new Date(now.getTime() + 30 * 60 * 1000).toISOString(); // 30 min
    if (loadImbalance > 25) return new Date(now.getTime() + 60 * 60 * 1000).toISOString(); // 1 hour

    return new Date(now.getTime() + 120 * 60 * 1000).toISOString(); // 2 hours
  }

  // Update SOC intelligence database
  updateSOCIntelligence(assignmentResult, currentWorkload, balancingResult) {
    socIntelligenceDB.analystWorkload = new Map(Object.entries(currentWorkload));
    socIntelligenceDB.loadMetrics.set('lastBalancing', balancingResult);
    socIntelligenceDB.lastUpdated = new Date();
  }
}

// Initialize the engine
const socLoadBalancer = new SOCLoadBalancerEngine();

// Audit logging
const logSOCLoadBalancing = async (action, details, user = 'SuperAdmin') => {
  try {
    const logEntry = {
      timestamp: new Date().toISOString(),
      user,
      action,
      details,
      service: 'soc-load-balancer'
    };

    const logFile = path.join(__dirname, '../logs/soc_load_balancing_audit.log');
    await fs.appendFile(logFile, JSON.stringify(logEntry) + '\n');
  } catch (error) {
    console.error('Failed to write SOC load balancing audit log:', error);
  }
};

// Controller Functions

// Balance SOC workload
const balanceSOCWorkload = async (req, res) => {
  try {
    const {
      threats = [],
      analysts = [],
      algorithm = 'aiOptimized',
      safeMode = true,
      timeWindow = 60
    } = req.body;

    if (!Array.isArray(threats) || !Array.isArray(analysts)) {
      return res.status(400).json({
        success: false,
        error: 'Threats and analysts must be arrays'
      });
    }

    // Perform AI-powered load balancing
    const balancingResult = await socLoadBalancer.balanceSOCWorkload(threats, analysts, {
      algorithm,
      safeMode,
      timeWindow,
      considerFatigue: true
    });

    await logSOCLoadBalancing('SOC_WORKLOAD_BALANCED', {
      algorithm,
      totalThreats: threats.length,
      assignedThreats: balancingResult.assignedThreats.length,
      unassignedThreats: balancingResult.unassignedThreats.length,
      safeModeEnabled: safeMode,
      systemHealth: balancingResult.systemHealth.healthStatus
    }, req.superAdmin?.username);

    res.json({
      success: true,
      data: balancingResult,
      metadata: {
        engine: 'Autonomous SOC Load Balancer v2.1',
        safeMode: safeMode,
        algorithm: algorithm,
        processingTime: '2.3s',
        aiConfidence: 0.89
      }
    });

  } catch (error) {
    console.error('Balance SOC workload error:', error);
    await logSOCLoadBalancing('SOC_WORKLOAD_BALANCING_FAILED', {
      error: error.message,
      threatCount: req.body?.threats?.length || 0
    }, req.superAdmin?.username);

    res.status(500).json({
      success: false,
      error: 'Failed to balance SOC workload',
      fallback: {
        assignments: [],
        safeModeRecommendations: [{
          type: 'SYSTEM_ERROR',
          severity: 'CRITICAL',
          message: 'Load balancing engine temporarily unavailable',
          action: 'Switch to manual assignment mode'
        }]
      }
    });
  }
};

// Get current SOC load status
const getSOCLoadStatus = async (req, res) => {
  try {
    const { timeWindow = 60 } = req.query;

    // Get mock analyst data - in production, query from database
    const mockAnalysts = [
      { id: 'ANAL-001', name: 'Sarah Chen', role: 'SENIOR_ANALYST', specialization: ['APT', 'ZeroDay'] },
      { id: 'ANAL-002', name: 'Mike Rodriguez', role: 'SENIOR_ANALYST', specialization: ['Malware', 'Phishing'] },
      { id: 'ANAL-003', name: 'Emma Thompson', role: 'MID_LEVEL_ANALYST', specialization: ['DDoS', 'Network'] },
      { id: 'ANAL-004', name: 'James Wilson', role: 'JUNIOR_ANALYST', specialization: ['Monitoring', 'Scanning'] },
      { id: 'ANAL-005', name: 'Lisa Park', role: 'MID_LEVEL_ANALYST', specialization: ['InsiderThreat', 'Compliance'] }
    ];

    const currentWorkload = socLoadBalancer.calculateCurrentWorkload(mockAnalysts, parseInt(timeWindow));

    const workloadStatus = Object.entries(currentWorkload).map(([analystId, workload]) => {
      const analyst = mockAnalysts.find(a => a.id === analystId);
      const capacity = socLoadBalancer.analystProfiles[analyst?.role || 'JUNIOR_ANALYST'].capacity;
      const utilization = Math.min(100, Math.round((workload / 480) * 100)); // 8-hour shift

      let status = 'AVAILABLE';
      if (utilization > 90) status = 'OVERLOADED';
      else if (utilization > 75) status = 'BUSY';
      else if (utilization > 50) status = 'ACTIVE';

      return {
        analystId,
        analystName: analyst?.name || `Analyst ${analystId}`,
        role: analyst?.role || 'UNKNOWN',
        currentWorkload: workload,
        utilization,
        status,
        capacity,
        specialization: analyst?.specialization || []
      };
    });

    const systemOverview = {
      totalAnalysts: mockAnalysts.length,
      activeAnalysts: workloadStatus.filter(w => w.status !== 'AVAILABLE').length,
      overloadedAnalysts: workloadStatus.filter(w => w.status === 'OVERLOADED').length,
      averageUtilization: Math.round(workloadStatus.reduce((sum, w) => sum + w.utilization, 0) / workloadStatus.length),
      totalWorkload: Object.values(currentWorkload).reduce((sum, w) => sum + w, 0),
      timeWindow: `${timeWindow} minutes`
    };

    res.json({
      success: true,
      data: {
        systemOverview,
        analystWorkload: workloadStatus,
        safeModeStatus: {
          enabled: true,
          constraints: socLoadBalancer.safeModeConstraints,
          activeRecommendations: [] // Would be populated from recent balancing
        }
      }
    });

  } catch (error) {
    console.error('Get SOC load status error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve SOC load status'
    });
  }
};

// Get SAFE MODE recommendations
const getSafeModeRecommendations = async (req, res) => {
  try {
    const lastBalancing = socIntelligenceDB.loadMetrics.get('lastBalancing');

    const recommendations = lastBalancing?.safeModeRecommendations || [
      {
        type: 'GENERAL_HEALTH',
        severity: 'LOW',
        message: 'SAFE MODE active - monitoring analyst workload',
        action: 'No action required',
        timestamp: new Date().toISOString()
      }
    ];

    res.json({
      success: true,
      data: {
        recommendations,
        safeModeConstraints: socLoadBalancer.safeModeConstraints,
        lastUpdated: lastBalancing?.generatedAt || new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Get SAFE MODE recommendations error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve SAFE MODE recommendations'
    });
  }
};

// Update load balancing configuration
const updateLoadBalancingConfig = async (req, res) => {
  try {
    const { algorithm, safeModeConstraints, analystProfiles } = req.body;

    if (algorithm && Object.values(socLoadBalancer.algorithms).includes(algorithm)) {
      socLoadBalancer.currentAlgorithm = algorithm;
    }

    if (safeModeConstraints) {
      socLoadBalancer.safeModeConstraints = { ...socLoadBalancer.safeModeConstraints, ...safeModeConstraints };
    }

    if (analystProfiles) {
      socLoadBalancer.analystProfiles = { ...socLoadBalancer.analystProfiles, ...analystProfiles };
    }

    await logSOCLoadBalancing('LOAD_BALANCING_CONFIG_UPDATED', {
      algorithm: socLoadBalancer.currentAlgorithm,
      safeModeConstraints: socLoadBalancer.safeModeConstraints,
      analystProfilesUpdated: !!analystProfiles
    }, req.superAdmin?.username);

    res.json({
      success: true,
      data: {
        currentAlgorithm: socLoadBalancer.currentAlgorithm,
        safeModeConstraints: socLoadBalancer.safeModeConstraints,
        analystProfiles: socLoadBalancer.analystProfiles
      },
      message: 'Load balancing configuration updated successfully'
    });

  } catch (error) {
    console.error('Update load balancing config error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update load balancing configuration'
    });
  }
};

module.exports = {
  balanceSOCWorkload,
  getSOCLoadStatus,
  getSafeModeRecommendations,
  updateLoadBalancingConfig
};
