import { predictBreachRisk, getPredictionHistory, trainPredictionModel } from '../utils/predictionEngine.js';
import { aggregateThreats } from '../utils/threatIntelService.js';
import User from '../models/User.js';
import Scan from '../models/Scan.js';

// Mock asset data for predictions
const mockAssets = [
  {
    id: 'web-server-01',
    name: 'Web Server 01',
    type: 'Server',
    ip: '192.168.1.100',
    location: 'Data Center A',
    lastScanned: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    vulnerabilities: 3,
    threatLevel: 'Medium'
  },
  {
    id: 'database-01',
    name: 'Database Server',
    type: 'Database',
    ip: '192.168.1.101',
    location: 'Data Center B',
    lastScanned: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    vulnerabilities: 1,
    threatLevel: 'Low'
  },
  {
    id: 'api-gateway',
    name: 'API Gateway',
    type: 'API',
    ip: '192.168.1.102',
    location: 'Cloud',
    lastScanned: new Date(Date.now() - 30 * 60 * 1000), // 30 minutes ago
    vulnerabilities: 5,
    threatLevel: 'High'
  },
  {
    id: 'user-workstation-01',
    name: 'User Workstation 01',
    type: 'Workstation',
    ip: '192.168.1.200',
    location: 'Office',
    lastScanned: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    vulnerabilities: 2,
    threatLevel: 'Medium'
  },
  {
    id: 'file-server',
    name: 'File Server',
    type: 'Storage',
    ip: '192.168.1.103',
    location: 'Data Center A',
    lastScanned: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    vulnerabilities: 4,
    threatLevel: 'High'
  }
];

// Get predictive breach analysis for all assets
const getPredictiveAnalysis = async (req, res) => {
  try {
    const predictions = [];

    for (const asset of mockAssets) {
      // Get threat intelligence data
      const threatData = await aggregateThreats();

      // Calculate risk factors
      const riskFactors = {
        vulnerabilityCount: asset.vulnerabilities,
        timeSinceLastScan: (Date.now() - asset.lastScanned.getTime()) / (1000 * 60 * 60), // hours
        threatLevel: asset.threatLevel === 'High' ? 3 : asset.threatLevel === 'Medium' ? 2 : 1,
        globalThreatCount: threatData?.length || 0,
        assetType: asset.type
      };

      // Generate AI prediction
      const prediction = await predictBreachRisk(asset, riskFactors);

      predictions.push({
        asset: asset,
        prediction: prediction,
        riskFactors: riskFactors,
        lastUpdated: new Date()
      });
    }

    // Sort by risk score (highest first)
    predictions.sort((a, b) => b.prediction.riskScore - a.prediction.riskScore);

    res.json({
      success: true,
      data: predictions,
      totalAssets: predictions.length,
      highRiskCount: predictions.filter(p => p.prediction.riskLevel === 'High').length,
      timestamp: new Date()
    });

  } catch (error) {
    console.error('Error in predictive analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate predictive analysis',
      error: error.message
    });
  }
};

// Get prediction for specific asset
const getAssetPrediction = async (req, res) => {
  try {
    const { assetId } = req.params;

    const asset = mockAssets.find(a => a.id === assetId);
    if (!asset) {
      return res.status(404).json({
        success: false,
        message: 'Asset not found'
      });
    }

    // Get threat intelligence data
    const threatData = await aggregateThreats();

    // Calculate risk factors
    const riskFactors = {
      vulnerabilityCount: asset.vulnerabilities,
      timeSinceLastScan: (Date.now() - asset.lastScanned.getTime()) / (1000 * 60 * 60),
      threatLevel: asset.threatLevel === 'High' ? 3 : asset.threatLevel === 'Medium' ? 2 : 1,
      globalThreatCount: threatData?.length || 0,
      assetType: asset.type
    };

    // Generate AI prediction
    const prediction = await predictBreachRisk(asset, riskFactors);

    // Get prediction history for this asset
    const history = await getPredictionHistory(assetId);

    res.json({
      success: true,
      data: {
        asset: asset,
        prediction: prediction,
        riskFactors: riskFactors,
        history: history,
        lastUpdated: new Date()
      }
    });

  } catch (error) {
    console.error('Error getting asset prediction:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get asset prediction',
      error: error.message
    });
  }
};

// Get prediction accuracy metrics
const getPredictionMetrics = async (req, res) => {
  try {
    // Mock accuracy metrics
    const metrics = {
      overallAccuracy: 94.7,
      truePositives: 156,
      falsePositives: 9,
      trueNegatives: 234,
      falseNegatives: 4,
      precision: 94.5,
      recall: 97.5,
      f1Score: 96.0,
      lastUpdated: new Date(),
      modelVersion: 'v2.1.3',
      trainingDataSize: 1247,
      featuresUsed: [
        'vulnerability_count',
        'time_since_last_scan',
        'threat_intelligence_score',
        'user_behavior_anomalies',
        'network_traffic_patterns',
        'authentication_failures'
      ]
    };

    res.json({
      success: true,
      data: metrics
    });

  } catch (error) {
    console.error('Error getting prediction metrics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get prediction metrics',
      error: error.message
    });
  }
};

// Train/update prediction model
const trainModel = async (req, res) => {
  try {
    const { trainingData, modelConfig } = req.body;

    // Start model training (mock)
    const trainingResult = await trainPredictionModel(trainingData, modelConfig);

    res.json({
      success: true,
      message: 'Model training started',
      data: trainingResult,
      estimatedCompletion: new Date(Date.now() + 30 * 60 * 1000) // 30 minutes
    });

  } catch (error) {
    console.error('Error training model:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to start model training',
      error: error.message
    });
  }
};

// Get prediction alerts
const getPredictionAlerts = async (req, res) => {
  try {
    // Generate mock alerts based on predictions
    const alerts = [
      {
        id: 'alert_001',
        assetId: 'api-gateway',
        assetName: 'API Gateway',
        type: 'CRITICAL_BREACH_PREDICTION',
        message: 'Critical breach predicted in 1.2 hours with 96% confidence',
        riskScore: 94,
        timeToBreach: 1.2,
        confidence: 96,
        severity: 'Critical',
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        status: 'Active'
      },
      {
        id: 'alert_002',
        assetId: 'file-server',
        assetName: 'File Server',
        type: 'HIGH_RISK_PREDICTION',
        message: 'High risk breach predicted in 4.7 hours with 89% confidence',
        riskScore: 87,
        timeToBreach: 4.7,
        confidence: 89,
        severity: 'High',
        timestamp: new Date(Date.now() - 45 * 60 * 1000), // 45 minutes ago
        status: 'Active'
      },
      {
        id: 'alert_003',
        assetId: 'web-server-01',
        assetName: 'Web Server 01',
        type: 'MEDIUM_RISK_PREDICTION',
        message: 'Medium risk breach predicted in 12.3 hours with 76% confidence',
        riskScore: 72,
        timeToBreach: 12.3,
        confidence: 76,
        severity: 'Medium',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: 'Acknowledged'
      }
    ];

    res.json({
      success: true,
      data: alerts,
      totalAlerts: alerts.length,
      activeAlerts: alerts.filter(a => a.status === 'Active').length
    });

  } catch (error) {
    console.error('Error getting prediction alerts:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get prediction alerts',
      error: error.message
    });
  }
};

// Get prediction insights and explanations
const getPredictionInsights = async (req, res) => {
  try {
    const { assetId } = req.params;

    // Mock insights for the asset
    const insights = {
      assetId: assetId,
      topRiskFactors: [
        {
          factor: 'Unpatched Vulnerabilities',
          weight: 0.35,
          description: '5 critical vulnerabilities detected',
          impact: 'High'
        },
        {
          factor: 'Time Since Last Scan',
          weight: 0.28,
          description: 'Last scanned 6 hours ago',
          impact: 'Medium'
        },
        {
          factor: 'Global Threat Intelligence',
          weight: 0.22,
          description: '47 active threats in your region',
          impact: 'High'
        },
        {
          factor: 'User Behavior Anomalies',
          weight: 0.15,
          description: 'Unusual login patterns detected',
          impact: 'Medium'
        }
      ],
      mitigationRecommendations: [
        {
          action: 'Apply Security Patches',
          priority: 'Critical',
          estimatedTime: '2 hours',
          impact: 'Reduce risk by 40%'
        },
        {
          action: 'Run Vulnerability Scan',
          priority: 'High',
          estimatedTime: '30 minutes',
          impact: 'Reduce risk by 25%'
        },
        {
          action: 'Enable Multi-Factor Authentication',
          priority: 'Medium',
          estimatedTime: '1 hour',
          impact: 'Reduce risk by 15%'
        }
      ],
      predictionConfidence: 92,
      modelUsed: 'Ensemble ML Model v2.1',
      lastTrained: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      trainingDataPoints: 1247
    };

    res.json({
      success: true,
      data: insights
    });

  } catch (error) {
    console.error('Error getting prediction insights:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get prediction insights',
      error: error.message
    });
  }
};

export {
  getPredictiveAnalysis,
  getAssetPrediction,
  getPredictionMetrics,
  trainModel,
  getPredictionAlerts,
  getPredictionInsights
};
