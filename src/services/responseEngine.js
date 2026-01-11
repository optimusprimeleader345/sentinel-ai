// Autonomous Response Engine Service
// Handles decision logic and simulated actions for security incidents

import { getMitreMapping } from '../utils/mitreMapping.js'

class ResponseEngine {
  constructor() {
    this.autoResponseEnabled = true; // Can be toggled by admin
    this.auditLogs = []; // Store audit trail
  }

  // Main evaluation method - determines actions based on incident severity
  evaluate(incident) {
    if (!this.autoResponseEnabled) {
      return {
        actions: ['LOG_ONLY'],
        reason: 'Auto-response disabled',
        mitreMapping: getMitreMapping('UNKNOWN')
      };
    }

    const { severity, type } = incident;
    const mitreMapping = getMitreMapping(type || 'UNKNOWN');

    switch (severity.toUpperCase()) {
      case 'CRITICAL':
        return {
          actions: ['BLOCK_ASSET', 'ESCALATE', 'NOTIFY_ADMIN'],
          autoExecute: true,
          reason: 'Critical severity requires immediate automated response',
          mitreMapping
        };

      case 'HIGH':
        return {
          actions: ['RECOMMEND_BLOCK', 'NOTIFY_ADMIN'],
          autoExecute: false, // Requires confirmation
          reason: 'High severity requires analyst/admin approval',
          mitreMapping
        };

      case 'MEDIUM':
        return {
          actions: ['RECOMMEND_REVIEW'],
          autoExecute: false,
          reason: 'Medium severity for review only',
          mitreMapping
        };

      case 'LOW':
        return {
          actions: ['LOG_ONLY'],
          autoExecute: false,
          reason: 'Low severity - log only, no action',
          mitreMapping
        };

      default:
        return {
          actions: ['LOG_ONLY'],
          autoExecute: false,
          reason: 'Unknown severity level',
          mitreMapping
        };
    }
  }

  // Simulate execution of actions (safe, frontend-only)
  async executeAction(action, target, incident) {
    const timestamp = new Date().toISOString();

    // Simulate action execution with realistic delays
    const executionTime = Math.random() * 2000 + 500; // 500-2500ms

    await new Promise(resolve => setTimeout(resolve, executionTime));

    // Simulate success/failure (90% success rate)
    const success = Math.random() > 0.1;

    const result = success ? 'SUCCESS' : 'FAILED';

    // Create audit log entry
    const auditEntry = {
      id: Date.now().toString(),
      action,
      target,
      severity: incident.severity,
      initiatedBy: 'SYSTEM',
      timestamp,
      result,
      incidentId: incident.id,
      details: this.getActionDetails(action, target, result)
    };

    this.auditLogs.unshift(auditEntry);

    return auditEntry;
  }

  // Get details for audit logging
  getActionDetails(action, target, result) {
    const actionDetails = {
      BLOCK_URL: `Attempted to block URL: ${target}`,
      BLOCK_IP: `Attempted to block IP: ${target}`,
      QUARANTINE_FILE: `Attempted to quarantine file: ${target}`,
      DISABLE_ACCOUNT: `Attempted to disable account: ${target}`,
      ESCALATE_INCIDENT: `Escalated incident to Level 3 response team`,
      NOTIFY_ADMIN: `Sent notification to admin team`,
      RECOMMEND_BLOCK: `Recommended blocking action for: ${target}`,
      RECOMMEND_REVIEW: `Recommended review of incident`,
      LOG_ONLY: `Logged incident for monitoring`
    };

    return actionDetails[action] || `Executed action: ${action}`;
  }

  // Execute multiple actions for an incident
  async executeActions(actions, incident) {
    const results = [];

    for (const action of actions) {
      const target = this.getActionTarget(action, incident);
      const result = await this.executeAction(action, target, incident);
      results.push(result);
    }

    return results;
  }

  // Determine target for action based on incident data
  getActionTarget(action, incident) {
    switch (action) {
      case 'BLOCK_URL':
      case 'BLOCK_IP':
        return incident.asset || 'unknown';
      case 'QUARANTINE_FILE':
        return incident.asset || 'file';
      case 'DISABLE_ACCOUNT':
        return incident.asset || 'account';
      case 'ESCALATE_INCIDENT':
        return `Incident ${incident.id}`;
      case 'NOTIFY_ADMIN':
        return 'admin@sentinelai.com';
      default:
        return incident.asset || 'target';
    }
  }

  // Toggle auto-response (admin only)
  toggleAutoResponse(enabled) {
    this.autoResponseEnabled = enabled;
    return this.autoResponseEnabled;
  }

  // Get audit logs
  getAuditLogs(limit = 100) {
    return this.auditLogs.slice(0, limit);
  }

  // Clear audit logs (for testing)
  clearAuditLogs() {
    this.auditLogs = [];
  }
}

// Export singleton instance
const responseEngine = new ResponseEngine();
export default responseEngine;
