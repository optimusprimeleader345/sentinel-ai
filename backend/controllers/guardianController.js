import {
  guardianScore,
  guardianAnomalies,
  guardianPrivacyScan,
  guardianDeviceSecurity,
  guardianRecommendations
} from '../data/guardianData.js';

// Get guardian security score
export const getGuardianScore = (req, res) => {
  try {
    res.json(guardianScore);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch security score' });
  }
};

// Get anomalies
export const getGuardianAnomalies = (req, res) => {
  try {
    res.json(guardianAnomalies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anomalies' });
  }
};

// Get privacy scan results
export const getGuardianPrivacyScan = (req, res) => {
  try {
    res.json(guardianPrivacyScan);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch privacy scan results' });
  }
};

// Get device security overview
export const getGuardianDeviceSecurity = (req, res) => {
  try {
    res.json(guardianDeviceSecurity);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch device security status' });
  }
};

// Get recommendations
export const getGuardianRecommendations = (req, res) => {
  try {
    res.json(guardianRecommendations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
};

// Handle AI chat
export const askAIGuardian = (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Simulate AI response based on prompt
    let reply = '';

    const promptLower = prompt.toLowerCase();

    if (promptLower.includes('how can i secure my device') || promptLower.includes('device security')) {
      reply = 'To secure your device: 1) Enable firewall and antivirus, 2) Keep software updated, 3) Use strong passwords, 4) Enable biometric authentication, 5) Be cautious with USB devices, 6) Regular security scans are recommended.';
    } else if (promptLower.includes('dark web') || promptLower.includes('exposed on the dark web') || promptLower.includes('breach')) {
      reply = 'I detected two email breaches from 2019 and 2021. Your personal data appears on the dark web, but no passwords were found. Recommendation: Monitor Have I Been Pwned for updates and consider identity theft protection services.';
    } else if (promptLower.includes('explain') && promptLower.includes('last anomaly') || promptLower.includes('anomaly')) {
      reply = 'The last anomaly was a suspicious login attempt from Russia while your account was active in the USA. This could indicate account compromise or stolen credentials. I\'ve already flagged this and recommend enabling additional authentication layers.';
    } else if (promptLower.includes('password') || promptLower.includes('strong password')) {
      reply = 'Strong passwords should: 1) Be at least 12-16 characters, 2) Include uppercase, lowercase, numbers, and symbols, 3) Be unique for each service, 4) Use passphrases instead of complex words. Consider using a password manager to generate and store them safely.';
    } else if (promptLower.includes('mfa') || promptLower.includes('2fa')) {
      reply = 'Multi-factor authentication adds crucial security. Use authenticator apps instead of SMS. Enable it on all accounts, especially email, banking, and social media. It prevents unauthorized access even if passwords are compromised.';
    } else {
      reply = `Regarding "${prompt}": Based on your security profile, I recommend regular monitoring and proactive measures. Let me know if you need specific guidance on any security aspect.`;
    }

    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: 'Failed to process query' });
  }
};
