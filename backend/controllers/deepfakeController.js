import crypto from 'crypto';
import { analyzeDeepfake } from '../utils/deepfakeAnalyzer.js';
import {
  mockForensics,
  mockFrames,
  mockTimelines,
  mockExplanations,
  deepfakeRecommendations
} from '../data/deepfakeMockData.js';

// Analyze deepfake
export const analyzeDeepfakeController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'No file uploaded',
        status: 'error',
        analysis: {
          isDeepfake: false,
          confidence: 0,
          details: [],
          frameAnalysis: []
        },
        metadata: {
          timestamp: new Date().toISOString(),
          source: "error"
        }
      });
    }

    // Generate analysis ID
    const analysisId = crypto.randomUUID();

    // Use real deepfake analysis
    const analysisResult = await analyzeDeepfake(
      req.file.buffer,
      req.file.originalname,
      { analysisId }
    );

    // Format response to match frontend expectations
    const result = {
      status: 'success',
      id: analysisId,
      label: analysisResult.isDeepfake ? 'fake' : 'real',
      confidence: analysisResult.confidence,
      isVideo: req.file.mimetype.startsWith('video/'),
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date().toISOString(),
      analysis: {
        isDeepfake: analysisResult.isDeepfake,
        confidence: analysisResult.confidence,
        details: analysisResult.findings || [],
        frameAnalysis: []
      },
      metadata: {
        timestamp: new Date().toISOString(),
        source: "ai-model"
      },
      // New fields for enhanced reporting
      riskLevel: analysisResult.riskLevel,
      findings: analysisResult.findings || [],
      detectionMethods: analysisResult.detectionMethods || [],
      analysisType: analysisResult.analysisType,
      analysisSteps: analysisResult.analysisSteps || [],
      summary: analysisResult.summary || {}
    };

    res.json(result);
  } catch (error) {
    console.error('Error analyzing deepfake:', error);
    res.status(500).json({
      status: 'error',
      error: 'Failed to analyze file: ' + error.message,
      analysis: {
        isDeepfake: false,
        confidence: 0,
        details: [],
        frameAnalysis: []
      },
      metadata: {
        timestamp: new Date().toISOString(),
        source: "error"
      }
    });
  }
};

// Get forensic analysis
export const getDeepfakeForensics = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Analysis ID is required' });
    }

    // Use mock forensics data
    const forensics = mockForensics[id] || mockForensics['analysis-001'];

    res.json(forensics);
  } catch (error) {
    console.error('Error fetching forensics:', error);
    res.status(500).json({ error: 'Failed to fetch forensic analysis' });
  }
};

// Get frames
export const getDeepfakeFrames = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Analysis ID is required' });
    }

    const framesData = mockFrames[id] || mockFrames['analysis-001'];

    res.json(framesData);
  } catch (error) {
    console.error('Error fetching frames:', error);
    res.status(500).json({ error: 'Failed to fetch frame analysis' });
  }
};

// Get timeline
export const getDeepfakeTimeline = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: 'Analysis ID is required' });
    }

    const timeline = mockTimelines[id] || mockTimelines['analysis-001'];

    res.json(timeline);
  } catch (error) {
    console.error('Error fetching timeline:', error);
    res.status(500).json({ error: 'Failed to fetch timeline' });
  }
};

// Get explanation
export const explainDeepfake = (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: 'Analysis ID is required' });
    }

    const explanation = mockExplanations[id] || mockExplanations['analysis-001'];

    res.json({ explanation });
  } catch (error) {
    console.error('Error generating explanation:', error);
    res.status(500).json({ error: 'Failed to generate explanation' });
  }
};

// Get recommendations
export const getDeepfakeRecommendations = (req, res) => {
  try {
    res.json(deepfakeRecommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};
