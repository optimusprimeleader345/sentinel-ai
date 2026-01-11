// AI-Powered Prediction Engine for Breach Detection
// Advanced Machine Learning algorithms for cybersecurity risk assessment

// Mock ML model weights (in real implementation, these would be trained)
const MODEL_WEIGHTS = {
  vulnerabilityCount: 0.35,
  timeSinceLastScan: 0.28,
  threatIntelligenceScore: 0.22,
  userBehaviorAnomalies: 0.15,
  networkTrafficPatterns: 0.18,
  authenticationFailures: 0.12,
  assetTypeMultiplier: {
    'API': 1.8,
    'Database': 1.6,
    'Server': 1.4,
    'Storage': 1.3,
    'Workstation': 1.0
  }
};

// Risk level thresholds
const RISK_THRESHOLDS = {
  CRITICAL: 85,
  HIGH: 70,
  MEDIUM: 45,
  LOW: 25
};

// Time prediction ranges (in hours)
const TIME_RANGES = {
  IMMEDIATE: [0.5, 2],
  SHORT_TERM: [2, 8],
  MEDIUM_TERM: [8, 24],
  LONG_TERM: [24, 72]
};

// Generate AI-powered breach risk prediction
const predictBreachRisk = async (asset, riskFactors) => {
  try {
    // Calculate base risk score using weighted factors
    const baseRiskScore = calculateRiskScore(riskFactors);

    // Apply asset type multiplier
    const assetMultiplier = MODEL_WEIGHTS.assetTypeMultiplier[asset.type] || 1.0;
    const adjustedRiskScore = Math.min(100, baseRiskScore * assetMultiplier);

    // Determine risk level
    const riskLevel = determineRiskLevel(adjustedRiskScore);

    // Predict time to breach
    const timeToBreach = predictTimeToBreach(adjustedRiskScore, riskFactors);

    // Calculate confidence level
    const confidence = calculateConfidence(riskFactors);

    // Identify top risk factors
    const topRiskFactors = identifyTopRiskFactors(riskFactors);

    // Generate attack vector prediction
    const predictedAttackVector = predictAttackVector(asset, riskFactors);

    return {
      riskScore: Math.round(adjustedRiskScore),
      riskLevel: riskLevel,
      timeToBreach: timeToBreach,
      confidence: confidence,
      topRiskFactors: topRiskFactors,
      predictedAttackVector: predictedAttackVector,
      mitigationPriority: getMitigationPriority(riskLevel),
      lastCalculated: new Date()
    };

  } catch (error) {
    console.error('Error in breach risk prediction:', error);
    // Return fallback prediction
    return {
      riskScore: 50,
      riskLevel: 'Medium',
      timeToBreach: 24,
      confidence: 70,
      topRiskFactors: ['Unknown factors'],
      predictedAttackVector: 'Unknown',
      mitigationPriority: 'Medium',
      lastCalculated: new Date()
    };
  }
};

// Calculate risk score using machine learning weights
const calculateRiskScore = (factors) => {
  let score = 0;

  // Vulnerability count (normalized to 0-100 scale)
  score += (factors.vulnerabilityCount / 10) * 100 * MODEL_WEIGHTS.vulnerabilityCount;

  // Time since last scan (exponential risk increase)
  const hoursSinceScan = factors.timeSinceLastScan;
  const timeRisk = Math.min(100, (hoursSinceScan / 24) * 100); // Max risk after 24 hours
  score += timeRisk * MODEL_WEIGHTS.timeSinceLastScan;

  // Threat intelligence score
  score += (factors.globalThreatCount / 100) * 100 * MODEL_WEIGHTS.threatIntelligenceScore;

  // User behavior anomalies (simulated)
  const behaviorRisk = Math.random() * 30; // 0-30 points
  score += behaviorRisk * MODEL_WEIGHTS.userBehaviorAnomalies;

  // Network traffic patterns (simulated)
  const networkRisk = Math.random() * 25; // 0-25 points
  score += networkRisk * MODEL_WEIGHTS.networkTrafficPatterns;

  // Authentication failures (simulated)
  const authRisk = Math.random() * 20; // 0-20 points
  score += authRisk * MODEL_WEIGHTS.authenticationFailures;

  return Math.min(100, Math.max(0, score));
};

// Determine risk level based on score
const determineRiskLevel = (score) => {
  if (score >= RISK_THRESHOLDS.CRITICAL) return 'Critical';
  if (score >= RISK_THRESHOLDS.HIGH) return 'High';
  if (score >= RISK_THRESHOLDS.MEDIUM) return 'Medium';
  return 'Low';
};

// Predict time to breach based on risk score
const predictTimeToBreach = (riskScore, factors) => {
  // Higher risk = shorter time to breach
  const riskMultiplier = (100 - riskScore) / 100; // Invert: high risk = low multiplier

  let timeRange;
  if (riskScore >= RISK_THRESHOLDS.CRITICAL) {
    timeRange = TIME_RANGES.IMMEDIATE;
  } else if (riskScore >= RISK_THRESHOLDS.HIGH) {
    timeRange = TIME_RANGES.SHORT_TERM;
  } else if (riskScore >= RISK_THRESHOLDS.MEDIUM) {
    timeRange = TIME_RANGES.MEDIUM_TERM;
  } else {
    timeRange = TIME_RANGES.LONG_TERM;
  }

  // Add some randomness for realism
  const randomFactor = 0.7 + Math.random() * 0.6; // 0.7-1.3
  const predictedTime = (timeRange[0] + Math.random() * (timeRange[1] - timeRange[0])) * randomFactor;

  return Math.round(predictedTime * 10) / 10; // Round to 1 decimal place
};

// Calculate prediction confidence
const calculateConfidence = (factors) => {
  // Higher confidence with more data points
  let confidence = 70; // Base confidence

  // Increase confidence with more recent scans
  if (factors.timeSinceLastScan < 1) confidence += 15;
  else if (factors.timeSinceLastScan < 6) confidence += 10;
  else if (factors.timeSinceLastScan < 24) confidence += 5;

  // Increase confidence with more threat intelligence
  if (factors.globalThreatCount > 50) confidence += 10;
  else if (factors.globalThreatCount > 20) confidence += 5;

  // Add randomness for realism
  confidence += (Math.random() - 0.5) * 10; // ±5

  return Math.min(100, Math.max(50, Math.round(confidence)));
};

// Identify top contributing risk factors
const identifyTopRiskFactors = (factors) => {
  const factorsList = [
    {
      name: 'Unpatched Vulnerabilities',
      score: factors.vulnerabilityCount * 10,
      description: `${factors.vulnerabilityCount} vulnerabilities detected`
    },
    {
      name: 'Time Since Last Scan',
      score: Math.min(100, factors.timeSinceLastScan * 4),
      description: `${factors.timeSinceLastScan.toFixed(1)} hours since last scan`
    },
    {
      name: 'Global Threat Intelligence',
      score: factors.globalThreatCount,
      description: `${factors.globalThreatCount} active threats globally`
    },
    {
      name: 'Asset Type Risk',
      score: (MODEL_WEIGHTS.assetTypeMultiplier[factors.assetType] || 1) * 20,
      description: `${factors.assetType} assets are ${MODEL_WEIGHTS.assetTypeMultiplier[factors.assetType] ? 'high' : 'moderate'} risk`
    }
  ];

  // Sort by score and return top 3
  return factorsList
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(f => f.name);
};

// Predict likely attack vector
const predictAttackVector = (asset, factors) => {
  const attackVectors = {
    'API': ['API Exploitation', 'Injection Attacks', 'Authentication Bypass'],
    'Database': ['SQL Injection', 'Data Exfiltration', 'Privilege Escalation'],
    'Server': ['Remote Code Execution', 'Web Exploitation', 'Service Attacks'],
    'Storage': ['Data Theft', 'Ransomware', 'File System Attacks'],
    'Workstation': ['Phishing', 'Malware Infection', 'Credential Theft']
  };

  const possibleVectors = attackVectors[asset.type] || ['Unknown Attack Vector'];

  // Weight by risk factors
  const vulnerabilityWeight = factors.vulnerabilityCount > 3 ? 2 : 1;
  const threatWeight = factors.globalThreatCount > 30 ? 2 : 1;

  const weightedIndex = Math.floor((vulnerabilityWeight + threatWeight - 2) * possibleVectors.length / 2);
  const selectedIndex = Math.min(possibleVectors.length - 1, Math.max(0, weightedIndex));

  return possibleVectors[selectedIndex];
};

// Get mitigation priority based on risk level
const getMitigationPriority = (riskLevel) => {
  const priorities = {
    'Critical': 'Immediate Action Required',
    'High': 'Urgent Attention Needed',
    'Medium': 'Monitor Closely',
    'Low': 'Routine Maintenance'
  };
  return priorities[riskLevel] || 'Unknown';
};

// Get prediction history for an asset
const getPredictionHistory = async (assetId) => {
  // Mock historical predictions
  const history = [];
  const now = Date.now();

  for (let i = 6; i >= 0; i--) {
    const timestamp = new Date(now - i * 24 * 60 * 60 * 1000);
    const baseRisk = 40 + Math.random() * 40; // 40-80 range
    const trend = Math.sin(i / 3) * 10; // Add some trend

    history.push({
      timestamp: timestamp,
      riskScore: Math.round(baseRisk + trend),
      riskLevel: determineRiskLevel(baseRisk + trend),
      confidence: 85 + Math.random() * 10,
      factors: ['Vulnerabilities', 'Scan Age', 'Threat Intelligence']
    });
  }

  return history;
};

// Train/update the prediction model
const trainPredictionModel = async (trainingData, modelConfig) => {
  // Mock training process
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 'completed',
        accuracy: 94.7,
        improvement: 2.3,
        newModelVersion: 'v2.2.0',
        trainingDuration: 1800, // seconds
        dataPointsUsed: trainingData?.length || 1000,
        featuresLearned: [
          'vulnerability_patterns',
          'temporal_risk_trends',
          'behavioral_anomalies',
          'network_correlations'
        ]
      });
    }, 2000); // 2 second mock training
  });
};

// Advanced ensemble prediction using multiple models
const ensemblePrediction = async (asset, riskFactors) => {
  // Run multiple prediction algorithms
  const predictions = await Promise.all([
    predictBreachRisk(asset, riskFactors), // Main model
    alternativeModelPrediction(asset, riskFactors), // Alternative approach
    neuralNetworkPrediction(asset, riskFactors) // Neural network simulation
  ]);

  // Ensemble: weighted average of predictions
  const weights = [0.5, 0.3, 0.2]; // Weight the main model highest
  const ensembleRiskScore = predictions.reduce((sum, pred, index) =>
    sum + (pred.riskScore * weights[index]), 0
  );

  const ensembleConfidence = predictions.reduce((sum, pred, index) =>
    sum + (pred.confidence * weights[index]), 0
  );

  return {
    ...predictions[0], // Base structure from main prediction
    riskScore: Math.round(ensembleRiskScore),
    confidence: Math.round(ensembleConfidence),
    ensembleUsed: true,
    modelCount: predictions.length
  };
};

// Alternative prediction model for ensemble
const alternativeModelPrediction = async (asset, riskFactors) => {
  // Simplified alternative algorithm
  const score = (riskFactors.vulnerabilityCount * 8) +
                (riskFactors.timeSinceLastScan * 2) +
                (riskFactors.globalThreatCount * 0.5);

  return {
    riskScore: Math.min(100, Math.max(0, score)),
    riskLevel: determineRiskLevel(score),
    timeToBreach: predictTimeToBreach(score, riskFactors),
    confidence: 75 + Math.random() * 15,
    method: 'alternative_algorithm'
  };
};

// Neural network simulation
const neuralNetworkPrediction = async (asset, riskFactors) => {
  // Simulate neural network prediction with some complexity
  const inputs = [
    riskFactors.vulnerabilityCount / 10,
    riskFactors.timeSinceLastScan / 48,
    riskFactors.globalThreatCount / 100,
    riskFactors.threatLevel / 3
  ];

  // Simple neural network simulation
  const hiddenLayer = inputs.map(x => Math.max(0, x * 2 - 0.5)); // ReLU activation
  const output = hiddenLayer.reduce((sum, x) => sum + x, 0) / hiddenLayer.length;

  const score = output * 100;

  return {
    riskScore: Math.min(100, Math.max(0, score)),
    riskLevel: determineRiskLevel(score),
    timeToBreach: predictTimeToBreach(score, riskFactors),
    confidence: 80 + Math.random() * 15,
    method: 'neural_network'
  };
};

export {
  predictBreachRisk,
  ensemblePrediction,
  getPredictionHistory,
  trainPredictionModel,
  calculateRiskScore,
  determineRiskLevel,
  predictTimeToBreach,
  calculateConfidence
};
