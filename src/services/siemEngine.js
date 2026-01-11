// SIEM-style Event Correlation Engine
// Transforms raw security events into correlated incidents

import { getMitreMapping } from '../utils/mitreMapping.js'

class SIEMEngine {
  constructor() {
    this.events = []
    this.alerts = []
    this.incidents = []
    this.correlationWindow = 15 * 60 * 1000 // 15 minutes
    this.maxEvents = 1000
    this.maxAlerts = 500
    this.maxIncidents = 200
  }

  // Main event ingestion method
  ingestEvent(event) {
    const processedEvent = {
      id: event.id || `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: event.timestamp || new Date().toISOString(),
      source: event.source || 'UNKNOWN',
      asset: event.asset || 'unknown',
      eventType: event.eventType || 'GENERIC',
      severity: event.severity || 'LOW',
      metadata: event.metadata || {},
      processedAt: new Date().toISOString()
    }

    this.events.unshift(processedEvent)
    this.events = this.events.slice(0, this.maxEvents)

    // Trigger correlation analysis
    this.analyzeCorrelations()

    return processedEvent
  }

  // Correlation rules engine
  analyzeCorrelations() {
    const now = new Date()
    const windowStart = new Date(now.getTime() - this.correlationWindow)

    // Get recent events within correlation window
    const recentEvents = this.events.filter(event =>
      new Date(event.timestamp) >= windowStart
    )

    // Rule 1: Multiple failed URL scans from same domain
    this.correlateURLScans(recentEvents)

    // Rule 2: Multiple IP blocks from same source
    this.correlateIPBlocks(recentEvents)

    // Rule 3: Phishing + credential breach chain
    this.correlatePhishingChain(recentEvents)

    // Rule 4: Malware + C2 communication chain
    this.correlateMalwareChain(recentEvents)

    // Rule 5: Privilege escalation patterns
    this.correlatePrivilegeEscalation(recentEvents)

    // Rule 6: High-severity events (auto-escalate)
    this.handleHighSeverityEvents(recentEvents)

    // Check for incident escalation
    this.checkIncidentEscalation()
  }

  // Rule 1: Correlate multiple failed URL scans
  correlateURLScans(events) {
    const urlEvents = events.filter(e =>
      e.source === 'URL_SCAN' &&
      (e.eventType === 'MALICIOUS_URL' || e.eventType === 'PHISHING_URL')
    )

    // Group by domain
    const domainGroups = {}
    urlEvents.forEach(event => {
      const domain = this.extractDomain(event.asset)
      if (!domainGroups[domain]) {
        domainGroups[domain] = []
      }
      domainGroups[domain].push(event)
    })

    // Create alerts for domains with multiple hits
    Object.entries(domainGroups).forEach(([domain, events]) => {
      if (events.length >= 2) {
        this.createAlert({
          relatedEvents: events.map(e => e.id),
          severity: events.length >= 5 ? 'CRITICAL' : 'HIGH',
          alertType: 'MULTIPLE_URL_THREATS',
          confidence: Math.min(events.length * 20, 95),
          description: `Multiple malicious URL detections for domain: ${domain}`,
          asset: domain,
          metadata: {
            domain,
            threatCount: events.length,
            sources: [...new Set(events.map(e => e.metadata?.scanner || 'unknown'))]
          }
        })
      }
    })
  }

  // Rule 2: Correlate multiple IP blocks
  correlateIPBlocks(events) {
    const ipEvents = events.filter(e =>
      e.source === 'IP_SCAN' && e.eventType === 'MALICIOUS_IP'
    )

    // Group by IP
    const ipGroups = {}
    ipEvents.forEach(event => {
      const ip = event.asset
      if (!ipGroups[ip]) {
        ipGroups[ip] = []
      }
      ipGroups[ip].push(event)
    })

    // Create alerts for IPs with multiple blocks
    Object.entries(ipGroups).forEach(([ip, events]) => {
      if (events.length >= 3) {
        this.createAlert({
          relatedEvents: events.map(e => e.id),
          severity: 'HIGH',
          alertType: 'MULTIPLE_IP_BLOCKS',
          confidence: Math.min(events.length * 25, 90),
          description: `Multiple malicious IP detections: ${ip}`,
          asset: ip,
          metadata: {
            ip,
            blockCount: events.length,
            geolocation: events[0]?.metadata?.geolocation || 'unknown'
          }
        })
      }
    })
  }

  // Rule 3: Phishing + credential breach chain
  correlatePhishingChain(events) {
    const phishingEvents = events.filter(e =>
      e.eventType === 'PHISHING_URL' || e.eventType === 'PHISHING_EMAIL'
    )

    const credentialEvents = events.filter(e =>
      e.eventType === 'PASSWORD_BREACH' || e.eventType === 'CREDENTIAL_THEFT'
    )

    // Look for chains within 30 minutes
    const chains = []
    phishingEvents.forEach(phishing => {
      const phishingTime = new Date(phishing.timestamp)

      credentialEvents.forEach(credential => {
        const credentialTime = new Date(credential.timestamp)
        const timeDiff = Math.abs(credentialTime - phishingTime)

        if (timeDiff <= 30 * 60 * 1000) { // 30 minutes
          chains.push({
            phishing: phishing,
            credential: credential,
            timeDiff: timeDiff
          })
        }
      })
    })

    // Create alerts for detected chains
    chains.forEach(chain => {
      this.createAlert({
        relatedEvents: [chain.phishing.id, chain.credential.id],
        severity: 'CRITICAL',
        alertType: 'PHISHING_CREDENTIAL_CHAIN',
        confidence: 85,
        description: `Phishing attack followed by credential breach - potential account compromise`,
        asset: chain.phishing.asset,
        metadata: {
          phishingType: chain.phishing.eventType,
          credentialType: chain.credential.eventType,
          timeBetweenEvents: Math.round(chain.timeDiff / 1000 / 60), // minutes
          mitreChain: ['T1566', 'T1555'] // Phishing → Credential Access
        }
      })
    })
  }

  // Rule 4: Malware + C2 communication chain
  correlateMalwareChain(events) {
    const malwareEvents = events.filter(e =>
      e.eventType === 'MALWARE_DETECTED' || e.eventType === 'VIRUS_DETECTED'
    )

    const c2Events = events.filter(e =>
      e.eventType === 'C2_COMMUNICATION' || e.eventType === 'SUSPICIOUS_NETWORK'
    )

    // Look for malware followed by C2 within 60 minutes
    const chains = []
    malwareEvents.forEach(malware => {
      const malwareTime = new Date(malware.timestamp)

      c2Events.forEach(c2 => {
        const c2Time = new Date(c2.timestamp)
        const timeDiff = c2Time - malwareTime

        if (timeDiff > 0 && timeDiff <= 60 * 60 * 1000) { // 60 minutes, malware first
          chains.push({
            malware: malware,
            c2: c2,
            timeDiff: timeDiff
          })
        }
      })
    })

    // Create alerts for detected chains
    chains.forEach(chain => {
      this.createAlert({
        relatedEvents: [chain.malware.id, chain.c2.id],
        severity: 'CRITICAL',
        alertType: 'MALWARE_C2_CHAIN',
        confidence: 90,
        description: `Malware infection followed by command & control communication`,
        asset: chain.malware.asset,
        metadata: {
          malwareType: chain.malware.metadata?.malwareType || 'unknown',
          c2Destination: chain.c2.asset,
          timeBetweenEvents: Math.round(chain.timeDiff / 1000 / 60), // minutes
          mitreChain: ['T1204', 'T1071'] // User Execution → Application Layer Protocol
        }
      })
    })
  }

  // Rule 5: Privilege escalation patterns
  correlatePrivilegeEscalation(events) {
    const privilegeEvents = events.filter(e =>
      e.eventType === 'PRIVILEGE_ESCALATION' || e.eventType === 'ADMIN_ACCESS'
    )

    const authFailureEvents = events.filter(e =>
      e.eventType === 'AUTH_FAILURE' || e.eventType === 'BRUTE_FORCE'
    )

    // Look for auth failures followed by privilege escalation
    privilegeEvents.forEach(privilege => {
      const privilegeTime = new Date(privilege.timestamp)

      // Count auth failures in the last hour for the same asset
      const recentAuthFailures = authFailureEvents.filter(auth => {
        const authTime = new Date(auth.timestamp)
        const timeDiff = privilegeTime - authTime
        return timeDiff > 0 && timeDiff <= 60 * 60 * 1000 && auth.asset === privilege.asset
      })

      if (recentAuthFailures.length >= 5) {
        this.createAlert({
          relatedEvents: [privilege.id, ...recentAuthFailures.map(e => e.id)],
          severity: 'CRITICAL',
          alertType: 'PRIVILEGE_ESCALATION_ATTACK',
          confidence: Math.min(80 + recentAuthFailures.length * 3, 95),
          description: `Privilege escalation following ${recentAuthFailures.length} authentication failures`,
          asset: privilege.asset,
          metadata: {
            authFailureCount: recentAuthFailures.length,
            privilegeType: privilege.metadata?.privilegeType || 'unknown',
            user: privilege.metadata?.user || 'unknown',
            mitreTechnique: 'T1068' // Exploitation for Privilege Escalation
          }
        })
      }
    })
  }

  // Rule 6: Handle high-severity events (auto-escalate)
  handleHighSeverityEvents(events) {
    const highSeverityEvents = events.filter(e =>
      e.severity === 'CRITICAL' && !this.isEventInAlert(e.id)
    )

    highSeverityEvents.forEach(event => {
      this.createAlert({
        relatedEvents: [event.id],
        severity: 'CRITICAL',
        alertType: 'HIGH_SEVERITY_EVENT',
        confidence: 100,
        description: `Critical security event: ${event.eventType}`,
        asset: event.asset,
        metadata: {
          originalEvent: event.eventType,
          source: event.source
        }
      })
    })
  }

  // Create alert with deduplication
  createAlert(alertData) {
    const alertKey = `${alertData.alertType}-${alertData.asset}-${alertData.severity}`

    // Check for existing alert to deduplicate
    const existingAlert = this.alerts.find(a =>
      a.alertKey === alertKey &&
      new Date() - new Date(a.timestamp) < 10 * 60 * 1000 // 10 minutes
    )

    if (existingAlert) {
      // Increment confidence and add events
      existingAlert.confidence = Math.min(existingAlert.confidence + 10, 100)
      existingAlert.relatedEvents = [...new Set([...existingAlert.relatedEvents, ...alertData.relatedEvents])]
      existingAlert.metadata.eventCount = existingAlert.relatedEvents.length
      existingAlert.lastUpdated = new Date().toISOString()
      return existingAlert
    }

    // Create new alert
    const alert = {
      id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      alertKey,
      relatedEvents: alertData.relatedEvents,
      severity: alertData.severity,
      alertType: alertData.alertType,
      confidence: alertData.confidence,
      description: alertData.description,
      asset: alertData.asset,
      timestamp: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      status: 'ACTIVE',
      metadata: alertData.metadata || {}
    }

    this.alerts.unshift(alert)
    this.alerts = this.alerts.slice(0, this.maxAlerts)

    return alert
  }

  // Check if event is already part of an alert
  isEventInAlert(eventId) {
    return this.alerts.some(alert => alert.relatedEvents.includes(eventId))
  }

  // Check for incident escalation
  checkIncidentEscalation() {
    const activeAlerts = this.alerts.filter(a => a.status === 'ACTIVE')
    const criticalAlerts = activeAlerts.filter(a => a.severity === 'CRITICAL')

    // Rule 1: Any critical alert escalates to incident
    criticalAlerts.forEach(alert => {
      if (!this.isAlertInIncident(alert.id)) {
        this.createIncident([alert], 'CRITICAL_ALERT_ESCALATION')
      }
    })

    // Rule 2: 2+ high-confidence alerts escalate
    const highConfidenceAlerts = activeAlerts.filter(a => a.confidence >= 80)
    if (highConfidenceAlerts.length >= 2) {
      const relatedAlerts = this.findRelatedAlerts(highConfidenceAlerts)
      if (relatedAlerts.length >= 2) {
        this.createIncident(relatedAlerts, 'MULTIPLE_HIGH_CONFIDENCE_ALERTS')
      }
    }

    // Rule 3: MITRE attack chain detected
    this.checkMitreChains(activeAlerts)
  }

  // Find related alerts (same asset or MITRE chain)
  findRelatedAlerts(alerts) {
    const related = []
    const processed = new Set()

    alerts.forEach(alert => {
      if (processed.has(alert.id)) return

      const group = alerts.filter(a =>
        !processed.has(a.id) && (
          a.asset === alert.asset ||
          this.haveCommonMitreTechniques(a, alert)
        )
      )

      if (group.length >= 2) {
        related.push(...group)
        group.forEach(a => processed.add(a.id))
      }
    })

    return related
  }

  // Check if alerts share MITRE techniques
  haveCommonMitreTechniques(alert1, alert2) {
    const techniques1 = alert1.metadata?.mitreChain || []
    const techniques2 = alert2.metadata?.mitreChain || []
    return techniques1.some(t => techniques2.includes(t))
  }

  // Check for MITRE attack chains
  checkMitreChains(alerts) {
    // Define common attack chains
    const attackChains = [
      { name: 'PHISHING_TO_CREDENTIAL_ACCESS', techniques: ['T1566', 'T1555'], severity: 'CRITICAL' },
      { name: 'INITIAL_ACCESS_TO_EXECUTION', techniques: ['T1190', 'T1204'], severity: 'HIGH' },
      { name: 'EXECUTION_TO_PERSISTENCE', techniques: ['T1204', 'T1547'], severity: 'HIGH' },
      { name: 'PRIVILEGE_ESCALATION_CHAIN', techniques: ['T1068', 'T1548'], severity: 'CRITICAL' }
    ]

    attackChains.forEach(chain => {
      const chainAlerts = alerts.filter(alert => {
        const alertTechniques = alert.metadata?.mitreChain || []
        return chain.techniques.some(t => alertTechniques.includes(t))
      })

      if (chainAlerts.length >= 2) {
        this.createIncident(chainAlerts, `MITRE_CHAIN_${chain.name}`, chain.severity)
      }
    })
  }

  // Create incident from alerts
  createIncident(alerts, escalationReason, overrideSeverity = null) {
    const severity = overrideSeverity || this.calculateIncidentSeverity(alerts)
    const mitreMapping = this.aggregateMitreMappings(alerts)

    const incident = {
      id: `incident-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      alerts: alerts.map(a => a.id),
      severity,
      description: this.generateIncidentDescription(alerts, escalationReason),
      status: 'OPEN',
      mitreMapping,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      escalationReason,
      assets: [...new Set(alerts.map(a => a.asset))],
      confidence: Math.max(...alerts.map(a => a.confidence)),
      metadata: {
        alertCount: alerts.length,
        eventCount: alerts.reduce((sum, a) => sum + a.relatedEvents.length, 0),
        sources: [...new Set(alerts.flatMap(a => a.metadata?.sources || []))],
        attackChain: this.buildAttackChain(alerts)
      }
    }

    // Mark alerts as escalated
    alerts.forEach(alert => {
      alert.status = 'ESCALATED'
      alert.incidentId = incident.id
    })

    this.incidents.unshift(incident)
    this.incidents = this.incidents.slice(0, this.maxIncidents)

    return incident
  }

  // Check if alert is already part of an incident
  isAlertInIncident(alertId) {
    return this.incidents.some(incident => incident.alerts.includes(alertId))
  }

  // Calculate incident severity based on alerts
  calculateIncidentSeverity(alerts) {
    if (alerts.some(a => a.severity === 'CRITICAL')) return 'CRITICAL'
    if (alerts.some(a => a.severity === 'HIGH')) return 'HIGH'
    if (alerts.some(a => a.severity === 'MEDIUM')) return 'MEDIUM'
    return 'LOW'
  }

  // Aggregate MITRE mappings from alerts
  aggregateMitreMappings(alerts) {
    const allTechniques = alerts.flatMap(alert => alert.metadata?.mitreChain || [])
    const uniqueTechniques = [...new Set(allTechniques)]

    if (uniqueTechniques.length === 0) return null

    return {
      techniques: uniqueTechniques,
      primaryTechnique: uniqueTechniques[0],
      tactic: getMitreMapping(uniqueTechniques[0])?.tactic || 'Unknown',
      confidence: Math.max(...alerts.map(a => a.confidence))
    }
  }

  // Generate incident description
  generateIncidentDescription(alerts, reason) {
    const asset = alerts[0]?.asset
    const alertTypes = [...new Set(alerts.map(a => a.alertType))]

    let description = `Security incident involving ${asset}. `
    description += `Triggered by: ${reason.replace(/_/g, ' ').toLowerCase()}. `
    description += `Related alerts: ${alertTypes.join(', ')}.`

    return description
  }

  // Build attack chain narrative
  buildAttackChain(alerts) {
    const sortedAlerts = alerts.sort((a, b) =>
      new Date(a.timestamp) - new Date(b.timestamp)
    )

    return sortedAlerts.map(alert => ({
      timestamp: alert.timestamp,
      type: alert.alertType,
      description: alert.description,
      techniques: alert.metadata?.mitreChain || []
    }))
  }

  // Extract domain from URL
  extractDomain(url) {
    try {
      return new URL(url).hostname
    } catch {
      return url.split('/')[0].split(':')[0]
    }
  }

  // Getters for UI components
  getEvents(limit = 100) {
    return this.events.slice(0, limit)
  }

  getAlerts(limit = 50) {
    return this.alerts.slice(0, limit)
  }

  getIncidents(limit = 25) {
    return this.incidents.slice(0, limit)
  }

  // Update incident status
  updateIncidentStatus(incidentId, status) {
    const incident = this.incidents.find(i => i.id === incidentId)
    if (incident) {
      incident.status = status
      incident.lastUpdated = new Date().toISOString()
    }
  }

  // Clear old data (for memory management)
  cleanupOldData() {
    const cutoff = new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours

    this.events = this.events.filter(e => new Date(e.timestamp) > cutoff)
    this.alerts = this.alerts.filter(a => new Date(a.timestamp) > cutoff)
    // Keep incidents longer
    this.incidents = this.incidents.filter(i => new Date(i.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
  }
}

// Export singleton instance
const siemEngine = new SIEMEngine()
export default siemEngine
