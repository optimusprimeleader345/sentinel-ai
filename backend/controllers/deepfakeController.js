import crypto from 'crypto';
import {
  mockAnalyzes,
  mockForensics,
  mockFrames,
  mockTimelines,
  mockExplanations,
  deepfakeRecommendations
} from '../data/deepfakeMockData.js';

// Analyze deepfake
export const analyzeDeepfake = (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Generate random analysis ID
    const analysisId = crypto.randomUUID();

    // Randomly choose between fake and real for demo
    const isFake = Math.random() > 0.5;
    const analysis = mockAnalyzes[isFake ? 'analysis-001' : 'analysis-002'];

    // Add file info
    const result = {
      ...analysis,
      id: analysisId,
      filename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      uploadedAt: new Date().toISOString()
    };

    res.json(result);
  } catch (error) {
    console.error('Error analyzing deepfake:', error);
    res.status(500).json({ error: 'Failed to analyze file' });
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
