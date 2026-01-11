/**
 * Attack Simulation Engine
 * Demonstrates SentinelAI's complete security pipeline in real-time
 */

class SimulationEngine {
  constructor() {
    this.isRunning = false;
    this.currentScenario = null;
    this.eventQueue = [];
    this.simulationState = {
      eventsGenerated: 0,
      alertsTriggered: 0,
      incidentsCreated: 0,
      responsesExecuted: 0,
      timeline: [],
      activeResponses: []
    };
  }

  /**
   * Run a specific attack scenario
   * @param {string} scenarioType - Type of attack scenario
   */
  async runScenario(scenarioType) {
    if (this.isRunning) return;

    this.isRunning = true;
    this.currentScenario = scenarioType;
    this.resetState();

    // Import required services
    const siemEngine = await import('./siemEngine.js').then(m => m.default);
    const responseEngine = await import('./responseEngine.js').then(m => m.default);
    const socAssistant = await import('../utils/socAssistant.js').then(m => m.default);

    // Get scenario events
    const events = this.getScenarioEvents(scenarioType);

    // Execute events with realistic delays
    for (let i = 0; i < events.length && this.isRunning; i++) {
      const event = events[i];

      // Wait for event timing
      await this.delay(event.delay);

      // Generate and ingest event
      await this.ingestSimulatedEvent(event, siemEngine, responseEngine, socAssistant);

      // Update timeline
      this.updateTimeline(event);
    }

    this.isRunning = false;
  }

  /**
   * Stop current simulation
   */
  stopSimulation() {
    this.isRunning = false;
    this.currentScenario = null;
  }

  /**
   * Reset simulation state
   */
  resetState() {
    this.simulationState = {
      eventsGenerated: 0,
      alertsTriggered: 0,
      incidentsCreated: 0,
      responsesExecuted: 0,
      timeline: [],
      activeResponses: []
    };
    this.eventQueue = [];
  }

  /**
   * Get events for a specific scenario
   * @param {string} scenarioType
   * @returns {Array} Array of event objects with timing
   */
  getScenarioEvents(scenarioType) {
    const scenarios = {
      phishing: [
        { delay: 1000, type: 'PHISHING_URL', severity: 'HIGH', asset: 'https://fake-bank.com', description: 'Suspicious URL detected in email' },
        { delay: 2000, type: 'CREDENTIAL_THEFT', severity: 'CRITICAL', asset: 'user@company.com', description: 'Credential harvesting attempt' },
        { delay: 3000, type: 'PASSWORD_BREACH', severity: 'CRITICAL', asset: 'admin@company.com', description: 'Password breach detected' },
        { delay: 4000, type: 'ACCOUNT_TAKEOVER', severity: 'CRITICAL', asset: 'admin@company.com', description: 'Account takeover successful' }
      ],
      malware: [
        { delay: 1000, type: 'MALICIOUS_UPLOAD', severity: 'HIGH', asset: 'malware.exe', description: 'Suspicious file uploaded' },
        { delay: 2500, type: 'FILE_EXECUTION', severity: 'CRITICAL', asset: 'C:\\malware.exe', description: 'Malicious file executed' },
        { delay: 3000, type: 'COMMAND_EXECUTION', severity: 'CRITICAL', asset: 'powershell.exe', description: 'Suspicious command executed' },
        { delay: 3500, type: 'C2_COMMUNICATION', severity: 'CRITICAL', asset: 'malicious-c2.com', description: 'Command and control communication' }
      ],
      compromise: [
        { delay: 1000, type: 'FAILED_LOGIN', severity: 'MEDIUM', asset: 'admin@company.com', description: 'Multiple failed login attempts' },
        { delay: 2000, type: 'SUSPICIOUS_IP', severity: 'HIGH', asset: '192.168.1.100', description: 'Access from suspicious IP' },
        { delay: 3000, type: 'PRIVILEGE_ESCALATION', severity: 'CRITICAL', asset: 'admin@company.com', description: 'Privilege escalation detected' },
        { delay: 4000, type: 'DATA_ACCESS', severity: 'CRITICAL', asset: '/sensitive-data/', description: 'Unauthorized data access' }
      ],
      multistage: [
        { delay: 1000, type: 'PHISHING_URL', severity: 'HIGH', asset: 'https://fake-bank.com', description: 'Initial phishing URL' },
        { delay: 2000, type: 'CREDENTIAL_THEFT', severity: 'CRITICAL', asset: 'user@company.com', description: 'Credential theft' },
        { delay: 3500, type: 'MALICIOUS_DOWNLOAD', severity: 'HIGH', asset: 'trojan.exe', description: 'Malware download' },
        { delay: 4500, type: 'FILE_EXECUTION', severity: 'CRITICAL', asset: 'C:\\trojan.exe', description: 'Malware execution' },
        { delay: 5000, type: 'C2_COMMUNICATION', severity: 'CRITICAL', asset: 'c2-server.com', description: 'C2 beaconing' },
        { delay: 6000, type: 'LATERAL_MOVEMENT', severity: 'CRITICAL', asset: 'server-02', description: 'Lateral movement detected' }
      ]
    };

    return scenarios[scenarioType] || [];
  }

  /**
   * Ingest a simulated event into the security pipeline
   * @param {Object} event - Event to ingest
   * @param {Object} siemEngine - SIEM engine instance
   * @param {Object} responseEngine - Response engine instance
   * @param {Object} socAssistant - SOC assistant instance
   */
  async ingestSimulatedEvent(event, siemEngine, responseEngine, socAssistant) {
    // Create SIEM event
    const siemEvent = {
      source: 'ATTACK_SIMULATION',
      eventType: event.type,
      severity: event.severity,
      asset: event.asset,
      metadata: {
        simulation: true,
        scenario: this.currentScenario,
        timestamp: new Date().toISOString(),
        description: event.description,
        confidence: Math.random() * 0.3 + 0.7 // 70-100% confidence
      }
    };

    // Ingest into SIEM
    await siemEngine.ingestEvent(siemEvent);
    this.simulationState.eventsGenerated++;

    // Check for alert generation (simulate correlation)
    if (Math.random() > 0.3) { // 70% chance of alert
      this.simulationState.alertsTriggered++;
    }

    // Check for incident creation
    if (event.severity === 'CRITICAL' && Math.random() > 0.5) {
      this.simulationState.incidentsCreated++;
    }

    // Trigger response engine evaluation
    const responseDecision = await responseEngine.evaluate({
      id: `SIM-${Date.now()}`,
      type: event.type,
      severity: event.severity,
      asset: event.asset,
      description: event.description,
      riskScore: Math.floor(Math.random() * 40 + 60), // 60-100 risk score
      timestamp: new Date().toISOString()
    });

    if (responseDecision && responseDecision.length > 0) {
      this.simulationState.responsesExecuted += responseDecision.length;
      this.simulationState.activeResponses.push(...responseDecision);
    }

    // Generate AI SOC Assistant explanation
    if (socAssistant && socAssistant.generateExplanation) {
      const explanation = await socAssistant.generateExplanation(event);
      if (explanation) {
        this.simulationState.aiExplanations = this.simulationState.aiExplanations || [];
        this.simulationState.aiExplanations.push(explanation);
      }
    }
  }

  /**
   * Update simulation timeline
   * @param {Object} event - Event that occurred
   */
  updateTimeline(event) {
    this.simulationState.timeline.push({
      timestamp: new Date().toISOString(),
      event: event.type,
      severity: event.severity,
      description: event.description,
      status: 'completed'
    });
  }

  /**
   * Utility delay function
   * @param {number} ms - Milliseconds to delay
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get current simulation state
   * @returns {Object} Current simulation state
   */
  getSimulationState() {
    return { ...this.simulationState };
  }

  /**
   * Check if simulation is running
   * @returns {boolean} Running status
   */
  isSimulationRunning() {
    return this.isRunning;
  }

  /**
   * Get current scenario
   * @returns {string} Current scenario type
   */
  getCurrentScenario() {
    return this.currentScenario;
  }
}

// Export singleton instance
const simulationEngine = new SimulationEngine();
export default simulationEngine;
