// MITRE ATT&CK Mapping Registry for Security Incident Classification
// Static mapping of attack types to MITRE ATT&CK tactics and techniques

const MITRE_MAPPINGS = {
  // Phishing Attacks
  'PHISHING': {
    tactic: 'Initial Access',
    techniqueId: 'T1566',
    techniqueName: 'Phishing',
    description: 'T1566 - Phishing: Techniques used to gain initial access through deceptive emails, websites, or other social engineering methods.'
  },
  'PHISHING_URL': {
    tactic: 'Initial Access',
    techniqueId: 'T1566.002',
    techniqueName: 'Spearphishing Link',
    description: 'T1566.002 - Spearphishing Link: Phishing attacks that use malicious links to direct victims to compromised websites.'
  },
  'PHISHING_EMAIL': {
    tactic: 'Initial Access',
    techniqueId: 'T1566.001',
    techniqueName: 'Spearphishing Attachment',
    description: 'T1566.001 - Spearphishing Attachment: Phishing attacks that use malicious email attachments to deliver malware.'
  },

  // Credential Theft
  'CREDENTIAL_THEFT': {
    tactic: 'Credential Access',
    techniqueId: 'T1555',
    techniqueName: 'Credentials from Password Stores',
    description: 'T1555 - Credentials from Password Stores: Techniques used to steal credentials from password managers, browsers, and other storage locations.'
  },
  'PASSWORD_CRACKING': {
    tactic: 'Credential Access',
    techniqueId: 'T1110',
    techniqueName: 'Brute Force',
    description: 'T1110 - Brute Force: Attempts to guess passwords through automated repetition of login attempts.'
  },

  // Malware Execution
  'MALWARE_EXECUTION': {
    tactic: 'Execution',
    techniqueId: 'T1204',
    techniqueName: 'User Execution',
    description: 'T1204 - User Execution: Techniques that require user interaction to execute malicious code, such as opening attachments or clicking links.'
  },
  'MALWARE_DELIVERY': {
    tactic: 'Execution',
    techniqueId: 'T1203',
    techniqueName: 'Exploitation for Client Execution',
    description: 'T1203 - Exploitation for Client Execution: Exploiting client-side applications like web browsers or office software to execute malicious code.'
  },

  // Command & Control
  'COMMAND_CONTROL': {
    tactic: 'Command and Control',
    techniqueId: 'T1071',
    techniqueName: 'Application Layer Protocol',
    description: 'T1071 - Application Layer Protocol: Communication between malware and its command server using standard application layer protocols.'
  },
  'C2_BEACONING': {
    tactic: 'Command and Control',
    techniqueId: 'T1071.001',
    techniqueName: 'Web Protocols',
    description: 'T1071.001 - Web Protocols: Using HTTP/S protocols for command and control communications to blend with legitimate traffic.'
  },

  // Privilege Escalation
  'PRIVILEGE_ESCALATION': {
    tactic: 'Privilege Escalation',
    techniqueId: 'T1068',
    techniqueName: 'Exploitation for Privilege Escalation',
    description: 'T1068 - Exploitation for Privilege Escalation: Exploiting software vulnerabilities to gain elevated privileges.'
  },
  'UAC_BYPASS': {
    tactic: 'Privilege Escalation',
    techniqueId: 'T1548.002',
    techniqueName: 'Bypass User Account Control',
    description: 'T1548.002 - Bypass User Account Control: Techniques to bypass Windows User Account Control for privilege escalation.'
  },

  // Additional Common Attack Types
  'BRUTE_FORCE': {
    tactic: 'Credential Access',
    techniqueId: 'T1110.001',
    techniqueName: 'Password Guessing',
    description: 'T1110.001 - Password Guessing: Attempting to guess passwords through manual or automated means.'
  },
  'SQL_INJECTION': {
    tactic: 'Execution',
    techniqueId: 'T1190',
    techniqueName: 'Exploit Public-Facing Application',
    description: 'T1190 - Exploit Public-Facing Application: Exploiting vulnerabilities in web applications to gain unauthorized access.'
  },
  'RANSOMWARE': {
    tactic: 'Impact',
    techniqueId: 'T1486',
    techniqueName: 'Data Encrypted for Impact',
    description: 'T1486 - Data Encrypted for Impact: Encrypting data to disrupt availability and demand ransom for decryption.'
  },
  'DATA_EXFILTRATION': {
    tactic: 'Exfiltration',
    techniqueId: 'T1041',
    techniqueName: 'Exfiltration Over C2 Channel',
    description: 'T1041 - Exfiltration Over C2 Channel: Transferring stolen data over existing command and control channels.'
  },

  // Fallback for unknown/incident types
  'UNKNOWN': {
    tactic: 'Unknown',
    techniqueId: 'T0000',
    techniqueName: 'Under Analysis',
    description: 'Incident type under analysis - MITRE ATT&CK classification pending.'
  }
}

/**
 * Get MITRE ATT&CK mapping for a security incident type
 * @param {string} incidentType - The type of security incident (e.g., 'PHISHING', 'MALWARE_EXECUTION')
 * @returns {object} MITRE mapping object with tactic, techniqueId, techniqueName, and description
 */
export function getMitreMapping(incidentType) {
  if (!incidentType) {
    return MITRE_MAPPINGS['UNKNOWN']
  }

  // Normalize incident type (uppercase, remove spaces/underscores)
  const normalizedType = incidentType.toString().toUpperCase().replace(/[\s_-]+/g, '_')

  // Direct match
  if (MITRE_MAPPINGS[normalizedType]) {
    return MITRE_MAPPINGS[normalizedType]
  }

  // Partial matching for common patterns
  const partialMatches = Object.keys(MITRE_MAPPINGS).filter(key =>
    normalizedType.includes(key) || key.includes(normalizedType)
  )

  if (partialMatches.length > 0) {
    // Return the first partial match (could be improved with scoring)
    return MITRE_MAPPINGS[partialMatches[0]]
  }

  // Pattern-based matching
  if (normalizedType.includes('PHISHING')) {
    return MITRE_MAPPINGS['PHISHING']
  }
  if (normalizedType.includes('CREDENTIAL') || normalizedType.includes('PASSWORD')) {
    return MITRE_MAPPINGS['CREDENTIAL_THEFT']
  }
  if (normalizedType.includes('MALWARE') || normalizedType.includes('VIRUS')) {
    return MITRE_MAPPINGS['MALWARE_EXECUTION']
  }
  if (normalizedType.includes('COMMAND') || normalizedType.includes('CONTROL') || normalizedType.includes('C2')) {
    return MITRE_MAPPINGS['COMMAND_CONTROL']
  }
  if (normalizedType.includes('PRIVILEGE') || normalizedType.includes('ESCALATION')) {
    return MITRE_MAPPINGS['PRIVILEGE_ESCALATION']
  }
  if (normalizedType.includes('BRUTE') || normalizedType.includes('FORCE')) {
    return MITRE_MAPPINGS['BRUTE_FORCE']
  }
  if (normalizedType.includes('SQL') || normalizedType.includes('INJECTION')) {
    return MITRE_MAPPINGS['SQL_INJECTION']
  }
  if (normalizedType.includes('RANSOM')) {
    return MITRE_MAPPINGS['RANSOMWARE']
  }
  if (normalizedType.includes('EXFILTRATION') || normalizedType.includes('DATA_THEFT')) {
    return MITRE_MAPPINGS['DATA_EXFILTRATION']
  }

  // Default fallback
  return MITRE_MAPPINGS['UNKNOWN']
}

/**
 * Get all available MITRE mappings
 * @returns {object} Complete mapping registry
 */
export function getAllMitreMappings() {
  return MITRE_MAPPINGS
}

/**
 * Format MITRE mapping for display
 * @param {object} mapping - MITRE mapping object
 * @returns {string} Formatted display string
 */
export function formatMitreDisplay(mapping) {
  if (!mapping || !mapping.techniqueId) {
    return 'Unknown / Under Analysis'
  }

  return `${mapping.techniqueId} - ${mapping.techniqueName} (${mapping.tactic})`
}
