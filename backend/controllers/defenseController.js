import { defenseStatus, defenseActions, activeThreats, defenseRecommendations } from '../data/defenseData.js';

// Get defense status
export const getDefenseStatus = (req, res) => {
  try {
    res.json(defenseStatus);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch defense status' });
  }
};

// Get defense actions
export const getDefenseActions = (req, res) => {
  try {
    res.json(defenseActions);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch defense actions' });
  }
};

// Get active threats
export const getActiveThreats = (req, res) => {
  try {
    res.json(activeThreats);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch active threats' });
  }
};

// Get defense recommendations
export const getDefenseRecommendations = (req, res) => {
  try {
    res.json(defenseRecommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch defense recommendations' });
  }
};

// Send defense command
export const sendDefenseCommand = (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Simulate AI response based on prompt
    let reply = '';
    let actionTaken = false;
    const logsGenerated = [];

    if (prompt.toLowerCase().includes('scan for threats') || prompt.toLowerCase().includes('scan')) {
      reply = 'Threat scan initiated. Scanning all systems for known vulnerabilities and malicious activities.';
      actionTaken = true;
      logsGenerated.push('Deep system scan started');
    } else if (prompt.toLowerCase().includes('isolate')) {
      reply = 'Isolation protocol activated. Suspicious processes have been quarantined.';
      actionTaken = true;
      logsGenerated.push('Process isolation completed');
    } else if (prompt.toLowerCase().includes('explain last attack')) {
      reply = 'Last attack was a SQL injection attempt from IP 192.168.1.100. The system automatically blocked the request and logged the incident.';
      actionTaken = false;
    } else if (prompt.toLowerCase().includes('check system integrity')) {
      reply = 'System integrity check completed. All critical files and processes are verified and intact.';
      actionTaken = true;
      logsGenerated.push('Integrity check performed');
    } else {
      reply = `Command "${prompt}" acknowledged. Analyzing request and coordinating response.`;
      actionTaken = false;
    }

    res.json({
      reply,
      actionTaken,
      logsGenerated
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process defense command' });
  }
};
