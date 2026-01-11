/**
 * AI SOC Assistant Engine
 * Provides intelligent explanations and recommendations for security incidents
 */

import { getMitreMapping, formatMitreDisplay } from './mitreMapping.js'

/**
 * Generate AI response for security incidents
 */
export const generateSOCResponse = (query, context, userRole = 'analyst') => {
  try {
    // Check if AI is enabled
    const aiEnabled = import.meta.env.VITE_SOC_AI_ENABLED === 'true';

    if (aiEnabled) {
      // TODO: Integrate with LLM API when available
      // For now, use rule-based responses
      return generateRuleBasedResponse(query, context, userRole);
    } else {
      // Use rule-based explanations
      return generateRuleBasedResponse(query, context, userRole);
    }
  } catch (error) {
    console.error('SOC Assistant Error:', error);
    return generateFallbackResponse(query, context);
  }
};

/**
 * Rule-based response generation
 */
const generateRuleBasedResponse = (query, context, userRole) => {
  const incidentType = context.incidentType || context.type || 'unknown';
  const severity = context.severity || 'medium';
  const riskScore = context.riskScore || 0.5;
  const affectedAsset = context.affectedAsset || 'Unknown Asset';

  // Generate structured response
  const response = {
    summary: generateSummary(incidentType, severity, affectedAsset),
    riskExplanation: generateRiskExplanation(incidentType, severity, riskScore),
    mitreMapping: generateMitreMapping(incidentType),
    recommendedActions: generateRecommendedActions(incidentType, severity, userRole),
    businessImpact: userRole === 'admin' ? generateBusinessImpact(incidentType, severity) : null,
    confidence: 0.85,
    responseTime: '1.2s'
  };

  return response;
};

/**
 * Generate incident summary
 */
const generateSummary = (incidentType, severity, affectedAsset) => {
  const summaries = {
    phishing: `${severity.toUpperCase()} - Phishing attempt detected targeting ${affectedAsset}`,
    'malicious-url': `${severity.toUpperCase()} - Malicious URL blocked attempting to access ${affectedAsset}`,
    'blacklisted-ip': `${severity.toUpperCase()} - Connection from blacklisted IP blocked to ${affectedAsset}`,
    'sql-injection': `${severity.toUpperCase()} - SQL injection attempt detected on ${affectedAsset}`,
    'credential-theft': `${severity.toUpperCase()} - Potential credential theft detected on ${affectedAsset}`,
    malware: `${severity.toUpperCase()} - Malware detected on ${affectedAsset}`,
    rce: `${severity.toUpperCase()} - Remote code execution vulnerability exploited on ${affectedAsset}`,
    xss: `${severity.toUpperCase()} - Cross-site scripting attempt detected on ${affectedAsset}`
  };

  return summaries[incidentType] || `${severity.toUpperCase()} - Security incident detected on ${affectedAsset}`;
};

/**
 * Generate risk explanation
 */
const generateRiskExplanation = (incidentType, severity, riskScore) => {
  const explanations = {
    phishing: `This phishing attempt could compromise user credentials and lead to unauthorized access to sensitive systems. The attack vector uses social engineering to trick users into revealing confidential information.`,
    'malicious-url': `This URL hosts malicious content that could deliver malware, steal data, or compromise the system. Visiting this URL could result in credential theft, data exfiltration, or ransomware deployment.`,
    'blacklisted-ip': `This IP address is associated with known malicious activity including botnets, command-and-control servers, or previous security breaches. Blocking this connection prevents potential compromise.`,
    'sql-injection': `An attacker attempted to inject malicious SQL code to manipulate database queries. Successful exploitation could lead to data theft, modification, or deletion of critical business information.`,
    'credential-theft': `Credentials have been potentially compromised through various means including phishing, malware, or password spraying. This could allow unauthorized access to sensitive systems and data.`,
    malware: `Malicious software has been detected that could steal data, encrypt files, or provide unauthorized system access. The malware may include ransomware, trojans, or spyware components.`,
    rce: `A remote code execution vulnerability allows attackers to run arbitrary code on the affected system. This could lead to complete system compromise and data theft.`,
    xss: `Cross-site scripting attempts to inject malicious scripts into web pages viewed by other users. This could steal session cookies, deface websites, or redirect users to malicious sites.`
  };

  const baseExplanation = explanations[incidentType] || `A security incident of type ${incidentType} has been detected with ${severity} severity.`;

  // Add severity context
  const severityContext = severity === 'critical'
    ? ' This represents an immediate threat requiring urgent attention.'
    : severity === 'high'
    ? ' This poses significant risk and should be addressed promptly.'
    : ' This requires monitoring and appropriate response based on organizational policies.';

  return baseExplanation + severityContext;
};

/**
 * Generate MITRE ATT&CK mapping
 */
const generateMitreMapping = (incidentType) => {
  const mapping = getMitreMapping(incidentType);

  return {
    technique: mapping.techniqueId,
    tactic: mapping.tactic,
    name: mapping.techniqueName,
    explanation: mapping.description
  };
};

/**
 * Generate recommended actions based on role
 */
const generateRecommendedActions = (incidentType, severity, userRole) => {
  const baseActions = [];

  // Incident-specific actions
  const incidentActions = {
    phishing: [
      'Notify affected users to change passwords immediately',
      'Enable multi-factor authentication if not already active',
      'Scan endpoints for malware using updated signatures',
      'Review email logs for similar patterns'
    ],
    'malicious-url': [
      'Block the URL at network perimeter (firewall/web proxy)',
      'Update URL filtering rules and signatures',
      'Notify users who may have visited the URL',
      'Review web access logs for additional exposure'
    ],
    'blacklisted-ip': [
      'Verify IP blocking is active and effective',
      'Check for other indicators from the same threat actor',
      'Review firewall and IDS logs for related activity',
      'Update threat intelligence feeds'
    ],
    'sql-injection': [
      'Apply available security patches immediately',
      'Implement input validation and parameterized queries',
      'Review application logs for additional attempts',
      'Consider web application firewall rules'
    ],
    malware: [
      'Isolate affected systems from the network',
      'Run comprehensive malware scans with updated definitions',
      'Analyze malware behavior and indicators',
      'Restore from clean backups if necessary'
    ]
  };

  baseActions.push(...(incidentActions[incidentType] || [
    'Investigate the incident thoroughly',
    'Contain the threat to prevent spread',
    'Document findings and response actions',
    'Review and update security controls'
  ]));

  // Role-specific additional actions
  if (userRole === 'admin') {
    baseActions.push(
      'Escalate to executive leadership if business-critical systems affected',
      'Consider engaging external incident response team',
      'Review insurance coverage for cyber incidents',
      'Update enterprise risk register'
    );
  } else if (userRole === 'analyst') {
    baseActions.push(
      'Document incident in ticketing system',
      'Update threat intelligence platforms',
      'Review similar incidents in the environment',
      'Prepare incident summary for stakeholders'
    );
  }

  // Severity-based urgency
  if (severity === 'critical') {
    baseActions.unshift('URGENT: Take immediate containment actions');
  }

  return baseActions;
};

/**
 * Generate business impact assessment (admin only)
 */
const generateBusinessImpact = (incidentType, severity) => {
  const impacts = {
    phishing: {
      financial: '$500K-$2M (remediation, lost productivity, legal)',
      operational: 'User credential compromise, potential data breach',
      reputational: 'Medium - depends on breach scope',
      regulatory: 'Potential GDPR/HIPAA violations if PII involved'
    },
    malware: {
      financial: '$1M-$5M (ransomware payments, recovery costs)',
      operational: 'System downtime, data loss, recovery efforts',
      reputational: 'High - public ransomware incidents damage trust',
      regulatory: 'High - may trigger breach notification requirements'
    },
    'sql-injection': {
      financial: '$200K-$1M (data recovery, forensics, legal)',
      operational: 'Database compromise, potential data loss',
      reputational: 'Medium-High depending on data exposure',
      regulatory: 'High - GDPR/CCPA breach notification required'
    }
  };

  const impact = impacts[incidentType] || {
    financial: '$50K-$500K (investigation and remediation)',
    operational: 'System investigation and security hardening',
    reputational: 'Low-Medium depending on incident visibility',
    regulatory: 'Low unless sensitive data involved'
  };

  // Adjust based on severity
  if (severity === 'critical') {
    impact.financial = impact.financial.replace(/\$[\d,]+K/g, match => {
      const num = parseInt(match.replace(/[$,K]/g, '')) * 2;
      return `$${num}K`;
    });
    impact.operational += ' - Critical systems may be compromised';
    impact.reputational = 'High - Critical incidents often become public';
    impact.regulatory = 'High - May require immediate regulatory notification';
  }

  return impact;
};

/**
 * Generate fallback response for errors
 */
const generateFallbackResponse = (query, context) => {
  return {
    summary: 'Security incident detected requiring attention.',
    riskExplanation: 'A security event has been identified. Please review the incident details and take appropriate action based on your organization\'s security policies.',
    mitreMapping: {
      technique: 'T0000',
      tactic: 'Unknown',
      name: 'Unmapped',
      explanation: 'Unable to map to specific MITRE ATT&CK technique.'
    },
    recommendedActions: [
      'Review incident details carefully',
      'Follow organizational incident response procedures',
      'Document all findings and actions taken',
      'Escalate to appropriate security personnel if needed'
    ],
    businessImpact: null,
    confidence: 0.5,
    responseTime: 'N/A',
    error: true
  };
};

/**
 * Parse user query to understand intent
 */
export const parseUserQuery = (query) => {
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes('why') || lowerQuery.includes('what happened') || lowerQuery.includes('explain')) {
    return 'explain_incident';
  } else if (lowerQuery.includes('what should i do') || lowerQuery.includes('next steps') || lowerQuery.includes('remediation')) {
    return 'recommend_actions';
  } else if (lowerQuery.includes('impact') || lowerQuery.includes('damage') || lowerQuery.includes('cost')) {
    return 'business_impact';
  } else if (lowerQuery.includes('mitre') || lowerQuery.includes('attack') || lowerQuery.includes('technique')) {
    return 'mitre_mapping';
  } else {
    return 'general_explanation';
  }
};

/**
 * Get sample incident data for testing
 */
export const getSampleIncidents = () => {
  return [
    {
      id: 'INC-2025-001',
      incidentType: 'phishing',
      severity: 'high',
      riskScore: 0.8,
      affectedAsset: 'Executive Email System',
      description: 'Phishing email with malicious attachment detected',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      detectionSource: 'Email Gateway',
      status: 'active'
    },
    {
      id: 'INC-2025-002',
      incidentType: 'malicious-url',
      severity: 'critical',
      riskScore: 0.95,
      affectedAsset: 'User Workstation (192.168.1.100)',
      description: 'User clicked malicious URL leading to credential theft',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      detectionSource: 'Web Proxy',
      status: 'contained'
    },
    {
      id: 'INC-2025-003',
      incidentType: 'sql-injection',
      severity: 'medium',
      riskScore: 0.6,
      affectedAsset: 'Customer Portal Database',
      description: 'SQL injection attempt against login form',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      detectionSource: 'Web Application Firewall',
      status: 'resolved'
    }
  ];
};
