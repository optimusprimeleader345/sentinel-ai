import logger from './logger.js'
import { errorTotal, httpRequestDuration, systemHealth } from './metrics.js'

/**
 * Alerting System
 * Monitors metrics and triggers alerts when thresholds are exceeded
 */

class AlertingSystem {
  constructor() {
    this.alertThresholds = {
      errorRate: 10, // errors per minute
      responseTime: 2000, // 2 seconds
      systemHealth: 70, // health score below 70
      memoryUsage: 90, // 90% memory usage
      cpuUsage: 90 // 90% CPU usage
    }
    
    this.alertHistory = []
    this.alertCooldown = 60000 // 1 minute cooldown between same alerts
  }

  /**
   * Check system health and trigger alerts
   */
  async checkSystemHealth() {
    const memoryUsage = (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100
    const cpuUsage = process.cpuUsage()
    
    // Check memory usage
    if (memoryUsage > this.alertThresholds.memoryUsage) {
      this.triggerAlert('high_memory_usage', {
        level: 'warning',
        message: `High memory usage detected: ${memoryUsage.toFixed(2)}%`,
        value: memoryUsage,
        threshold: this.alertThresholds.memoryUsage
      })
    }

    // Check system health score
    const healthScore = await this.calculateHealthScore()
    if (healthScore < this.alertThresholds.systemHealth) {
      this.triggerAlert('low_health_score', {
        level: 'critical',
        message: `System health score is low: ${healthScore}`,
        value: healthScore,
        threshold: this.alertThresholds.systemHealth
      })
    }
  }

  /**
   * Calculate overall system health score
   */
  async calculateHealthScore() {
    let score = 100
    
    // Deduct points for high memory usage
    const memoryUsage = (process.memoryUsage().heapUsed / process.memoryUsage().heapTotal) * 100
    if (memoryUsage > 80) score -= 20
    else if (memoryUsage > 60) score -= 10

    // Deduct points for errors (would need to track recent errors)
    // This is a simplified version
    
    return Math.max(0, Math.min(100, score))
  }

  /**
   * Trigger an alert
   */
  triggerAlert(type, data) {
    const alertKey = `${type}_${Date.now()}`
    const lastAlert = this.alertHistory.find(a => a.type === type)
    
    // Check cooldown
    if (lastAlert && (Date.now() - lastAlert.timestamp) < this.alertCooldown) {
      return // Skip if within cooldown period
    }

    const alert = {
      id: alertKey,
      type,
      timestamp: Date.now(),
      ...data
    }

    this.alertHistory.push(alert)
    
    // Keep only last 100 alerts
    if (this.alertHistory.length > 100) {
      this.alertHistory.shift()
    }

    // Log alert
    logger.warn('🚨 Alert Triggered', alert)

    // Update system health metric (async, but don't await to avoid blocking)
    this.calculateHealthScore().then(score => {
      systemHealth.set({ component: 'alerting' }, score)
    }).catch(err => {
      logger.error('Failed to update health score metric', err)
    })

    // In production, you would send alerts to:
    // - Email
    // - Slack/Discord
    // - PagerDuty
    // - SMS
    // - Webhook

    return alert
  }

  /**
   * Get recent alerts
   */
  getRecentAlerts(limit = 10) {
    return this.alertHistory
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit)
  }

  /**
   * Start monitoring
   */
  startMonitoring(interval = 60000) { // Check every minute
    setInterval(() => {
      this.checkSystemHealth()
    }, interval)
    
    logger.info('Alerting system started')
  }
}

// Create singleton instance
const alertingSystem = new AlertingSystem()

export default alertingSystem
