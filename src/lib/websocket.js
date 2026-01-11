import { io } from 'socket.io-client'
import { API_BASE_URL } from './api.js'

// WebSocket event types to avoid typos
const WS_EVENTS = {
  CONNECTED: 'connected',
  SCAN_STARTED: 'scan-started',
  SCAN_PROGRESS: 'scan-progress',
  SCAN_COMPLETED: 'scan-completed',
  SCAN_FAILED: 'scan-failed',
  NEW_THREAT: 'new-threat',
  THREAT_UPDATE: 'threat-update',
  NEW_INCIDENT: 'new-incident',
  INCIDENT_UPDATE: 'incident-update',
  DASHBOARD_METRICS: 'metrics-update',
  THREAT_ALERT: 'threat-alert',
  INCIDENT_ALERT: 'incident-alert',
  NEW_SCAN: 'new-scan'
}

class WebSocketService {
  constructor() {
    this.socket = null
    this.connected = false
    this.reconnecting = false
    this.eventListeners = new Map()
    this.scanSubscriptions = new Map()
    this.globalSubscriptions = new Set()
  }

  // Initialize WebSocket connection
  connect(token = null, onConnect = null, onDisconnect = null) {
    if (this.socket?.connected) {
      console.warn('WebSocket already connected')
      return
    }

    // Connect to base server URL without /api path
    const baseUrl = API_BASE_URL.replace('/api', '')
    const wsUrl = baseUrl.replace(/^http/, 'ws')
    const auth = token ? { token } : {}

    console.log('🔌 Connecting to WebSocket:', wsUrl)

    this.socket = io(wsUrl, {
      auth,
      transports: ['websocket'],
      timeout: 20000,
      forceNew: true, // Force a new connection
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      maxReconnectionAttempts: 5
    })

    // Connection events
    this.socket.on('connect', () => {
      console.log('🔌 WebSocket connected:', this.socket.id)
      this.connected = true
      this.reconnecting = false

      // Re-subscribe to all active subscriptions
      this.resubscribe()

      // Call user callback
      onConnect?.()
    })

    this.socket.on('disconnect', (reason) => {
      console.log('🔌 WebSocket disconnected:', reason)
      this.connected = false

      // Call user callback
      onDisconnect?.(reason)
    })

    this.socket.on('connect_error', (error) => {
      console.error('🔌 WebSocket connection error:', error.message)
    })

    this.socket.on('reconnect_attempt', () => {
      console.log('🔌 Retrying WebSocket connection...')
      this.reconnecting = true
    })

    // Set up global event forwarding
    this.setupEventForwarding()
  }

  // Disconnect from WebSocket
  disconnect() {
    if (this.socket) {
      console.log('🔌 Manually disconnecting WebSocket')
      this.socket.disconnect()
      this.socket = null
      this.connected = false
      this.scanSubscriptions.clear()
      this.eventListeners.clear()
      this.globalSubscriptions.clear()
    }
  }

  // Set up event forwarding for global listeners
  setupEventForwarding() {
    Object.values(WS_EVENTS).forEach(event => {
      this.socket.on(event, (data) => {
        // Forward to all event listeners for this event
        const listeners = this.eventListeners.get(event)
        if (listeners) {
          listeners.forEach(callback => {
            try {
              callback(data)
            } catch (error) {
              console.error('Error in WebSocket event listener:', error)
            }
          })
        }
      })
    })
  }

  // Resubscribe to all active subscriptions on reconnect
  resubscribe() {
    // Re-subscribe to scan feeds
    for (const scanId of this.scanSubscriptions.keys()) {
      this.subscribeScan(scanId)
    }

    // Re-subscribe to global feeds
    for (const subscription of this.globalSubscriptions) {
      switch (subscription) {
        case 'dashboard':
          this.subscribeDashboard()
          break
        case 'threats':
          this.subscribeThreats()
          break
        case 'incidents':
          this.subscribeIncidents()
          break
        case 'analyst':
          this.subscribeAnalyst()
          break
      }
    }
  }

  // Generic event listener management
  addEventListener(event, callback) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set())
    }
    this.eventListeners.get(event).add(callback)
  }

  removeEventListener(event, callback) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.delete(callback)
    }
  }

  // Scan subscription methods
  subscribeScan(scanId, onProgress = null, onComplete = null, onError = null) {
    if (!this.socket?.connected) {
      console.warn('Cannot subscribe to scan: WebSocket not connected')
      return false
    }

    // Track subscription
    if (!this.scanSubscriptions.has(scanId)) {
      this.scanSubscriptions.set(scanId, { onProgress, onComplete, onError })
    }

    // Subscribe via WebSocket
    this.socket.emit('subscribe-scan', scanId)

    // Add event listeners for this scan
    if (onProgress) {
      this.addEventListener('scan-progress', (data) => {
        if (data.scanId === scanId) onProgress(data)
      })
    }

    if (onComplete) {
      this.addEventListener('scan-completed', (data) => {
        if (data.scanId === scanId) onComplete(data)
      })
    }

    if (onError) {
      this.addEventListener('scan-failed', (data) => {
        if (data.scanId === scanId) onError(data)
      })
    }

    return true
  }

  unsubscribeScan(scanId) {
    if (!this.socket?.connected) return

    this.socket.emit('unsubscribe-scan', scanId)
    this.scanSubscriptions.delete(scanId)
  }

  // Dashboard subscription
  subscribeDashboard(callback = null) {
    if (!this.socket?.connected) return false

    this.socket.emit('subscribe-dashboard')
    this.globalSubscriptions.add('dashboard')

    if (callback) {
      this.addEventListener('metrics-update', callback)
      this.addEventListener('new-scan', callback)
      this.addEventListener('threat-alert', callback)
      this.addEventListener('incident-alert', callback)
    }

    return true
  }

  unsubscribeDashboard() {
    if (!this.socket?.connected) return

    this.socket.emit('unsubscribe-dashboard')
    this.globalSubscriptions.delete('dashboard')
  }

  // Threat subscription
  subscribeThreats(callback = null) {
    if (!this.socket?.connected) return false

    this.socket.emit('subscribe-threats')
    this.globalSubscriptions.add('threats')

    if (callback) {
      this.addEventListener('new-threat', callback)
      this.addEventListener('threat-update', callback)
      this.addEventListener('threat-alert', callback)
    }

    return true
  }

  unsubscribeThreats() {
    if (!this.socket?.connected) return

    this.socket.emit('unsubscribe-threats')
    this.globalSubscriptions.delete('threats')
  }

  // Incident subscription
  subscribeIncidents(callback = null) {
    if (!this.socket?.connected) return false

    this.socket.emit('subscribe-incidents')
    this.globalSubscriptions.add('incidents')

    if (callback) {
      this.addEventListener('new-incident', callback)
      this.addEventListener('incident-update', callback)
      this.addEventListener('incident-alert', callback)
    }

    return true
  }

  unsubscribeIncidents() {
    if (!this.socket?.connected) return

    this.socket.emit('unsubscribe-incidents')
    this.globalSubscriptions.delete('incidents')
  }

  // Analyst subscription - combines dashboard, threats, and incidents
  subscribeAnalyst(callback = null) {
    if (!this.socket?.connected) return false

    this.socket.emit('subscribe-analyst')
    this.globalSubscriptions.add('analyst')

    if (callback) {
      this.addEventListener('new-threat-intel', callback)
      this.addEventListener('siem-event', callback)
      this.addEventListener('threat-intel-update', callback)
      this.addEventListener('analyst-update', callback)
    }

    return true
  }

  unsubscribeAnalyst() {
    if (!this.socket?.connected) return

    this.socket.emit('unsubscribe-analyst')
    this.globalSubscriptions.delete('analyst')
  }

  // Send scan commands
  startScan(scanData) {
    if (!this.socket?.connected) {
      throw new Error('WebSocket not connected')
    }

    this.socket.emit('start-scan', scanData)
  }

  cancelScan(scanId) {
    if (!this.socket?.connected) {
      throw new Error('WebSocket not connected')
    }

    this.socket.emit('cancel-scan', { scanId })
  }

  // Connection status
  isConnected() {
    return this.connected
  }

  isReconnecting() {
    return this.reconnecting
  }

  getConnectionId() {
    return this.socket?.id || null
  }

  // Emergency cleanup
  cleanup() {
    this.disconnect()
  }
}

// Export singleton instance
const wsService = new WebSocketService()
export default wsService
export { wsService, WS_EVENTS }
