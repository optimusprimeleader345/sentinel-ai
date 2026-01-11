import { Server } from 'socket.io'
import jwt from 'jsonwebtoken'

class WebSocketService {
  constructor() {
    this.io = null
    this.connections = new Map() // userId -> socket
    this.scanStreams = new Map() // scanId -> Set of subscribed sockets
  }

  initialize(server) {
    this.io = new Server(server, {
      cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true,
        methods: ["GET", "POST"]
      },
      maxHttpBufferSize: 1e8 // 100MB for large data transfers
    })

    this.setupMiddleware()
    this.setupEventHandlers()

    console.log('🚀 WebSocket service initialized')
  }

  setupMiddleware() {
    this.io.use((socket, next) => {
      try {
        const token = socket.handshake.auth.token || socket.handshake.headers.authorization?.replace('Bearer ', '')

        if (!token) {
          // Allow anonymous connections for public scans (will be restricted later)
          socket.userId = null
          return next()
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret')
        socket.userId = decoded.userId
        next()
      } catch (error) {
        console.log('WebSocket auth error:', error.message)
        socket.userId = null
        next()
      }
    })
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log(`🔌 WebSocket connected: ${socket.id} [User: ${socket.userId || 'anonymous'}]`)

      // Store connection
      if (socket.userId) {
        this.connections.set(socket.userId, socket)
      }

      // Handle scan subscriptions
      socket.on('subscribe-scan', (scanId) => {
        if (!this.scanStreams.has(scanId)) {
          this.scanStreams.set(scanId, new Set())
        }

        this.scanStreams.get(scanId).add(socket)
        console.log(`📺 Socket ${socket.id} subscribed to scan ${scanId}`)

        // Send current scan status
        this.sendScanUpdate(scanId, 'subscriptionConfirmed', socket)
      })

      socket.on('unsubscribe-scan', (scanId) => {
        const subscribers = this.scanStreams.get(scanId)
        if (subscribers) {
          subscribers.delete(socket)
          if (subscribers.size === 0) {
            this.scanStreams.delete(scanId)
          }
          console.log(`📺 Socket ${socket.id} unsubscribed from scan ${scanId}`)
        }
      })

      // Handle dashboard subscriptions
      socket.on('subscribe-dashboard', () => {
        socket.join('dashboard')
        console.log(`📊 Socket ${socket.id} joined dashboard`)
      })

      socket.on('unsubscribe-dashboard', () => {
        socket.leave('dashboard')
        console.log(`📊 Socket ${socket.id} left dashboard`)
      })

      // Handle real-time threats subscription
      socket.on('subscribe-threats', () => {
        socket.join('threats')
        console.log(`🛡️ Socket ${socket.id} subscribed to threats`)
      })

      socket.on('unsubscribe-threats', () => {
        socket.leave('threats')
        console.log(`🛡️ Socket ${socket.id} unsubscribed from threats`)
      })

      // Handle incidents subscription
      socket.on('subscribe-incidents', () => {
        socket.join('incidents')
        console.log(`🚨 Socket ${socket.id} subscribed to incidents`)
      })

      socket.on('unsubscribe-incidents', () => {
        socket.leave('incidents')
        console.log(`🚨 Socket ${socket.id} unsubscribed from incidents`)
      })

      socket.on('disconnect', () => {
        console.log(`🔌 WebSocket disconnected: ${socket.id}`)

        // Clean up subscriptions
        if (socket.userId) {
          this.connections.delete(socket.userId)
        }

        for (const [scanId, subscribers] of this.scanStreams) {
          subscribers.delete(socket)
          if (subscribers.size === 0) {
            this.scanStreams.delete(scanId)
          }
        }
      })

      // Send welcome message
      socket.emit('connected', {
        message: 'Connected to SentinelAI WebSocket',
        userId: socket.userId,
        timestamp: new Date()
      })
    })
  }

  // Scan-related WebSocket methods
  emitScanStarted(scanId, scanData) {
    this.io.to(scanId).emit('scan-started', {
      scanId,
      data: scanData,
      timestamp: new Date()
    })

    this.io.to('dashboard').emit('new-scan', {
      scanId,
      type: 'started',
      data: scanData,
      timestamp: new Date()
    })
  }

  emitScanProgress(scanId, progressData) {
    this.io.to(scanId).emit('scan-progress', {
      scanId,
      ...progressData,
      timestamp: new Date()
    })
  }

  emitScanCompleted(scanId, results) {
    this.io.to(scanId).emit('scan-completed', {
      scanId,
      results,
      timestamp: new Date()
    })

    this.io.to('dashboard').emit('scan-completed', {
      scanId,
      results,
      timestamp: new Date()
    })
  }

  emitScanFailed(scanId, error) {
    this.io.to(scanId).emit('scan-failed', {
      scanId,
      error: error.message,
      timestamp: new Date()
    })

    this.io.to('dashboard').emit('scan-failed', {
      scanId,
      error: error.message,
      timestamp: new Date()
    })
  }

  // Threat-related methods
  emitNewThreat(threatData) {
    this.io.to('threats').emit('new-threat', {
      ...threatData,
      timestamp: new Date()
    })

    this.io.to('dashboard').emit('threat-alert', {
      type: threatData.severity,
      data: threatData,
      timestamp: new Date()
    })
  }

  emitThreatUpdate(threatId, updateData) {
    this.io.to('threats').emit('threat-update', {
      threatId,
      ...updateData,
      timestamp: new Date()
    })
  }

  // Incident-related methods
  emitNewIncident(incidentData) {
    this.io.to('incidents').emit('new-incident', {
      ...incidentData,
      timestamp: new Date()
    })

    this.io.to('dashboard').emit('incident-alert', {
      severity: incidentData.severity,
      data: incidentData,
      timestamp: new Date()
    })
  }

  emitIncidentUpdate(incidentId, updateData) {
    this.io.to('incidents').emit('incident-update', {
      incidentId,
      ...updateData,
      timestamp: new Date()
    })
  }

  // Dashboard metrics (broadcast to all dashboard subscribers)
  emitDashboardMetrics(metrics) {
    this.io.to('dashboard').emit('metrics-update', {
      ...metrics,
      timestamp: new Date()
    })
  }

  // User-specific notifications
  emitToUser(userId, event, data) {
    const socket = this.connections.get(userId)
    if (socket) {
      socket.emit(event, {
        ...data,
        timestamp: new Date()
      })
    }
  }

  // Broadcast to all authenticated users
  broadcastToUsers(event, data) {
    for (const [userId, socket] of this.connections) {
      if (userId) { // Skip anonymous connections
        socket.emit(event, {
          ...data,
          timestamp: new Date()
        })
      }
    }
  }

  // Get connection stats
  getStats() {
    return {
      totalConnections: this.connections.size,
      activeScanSubscriptions: this.scanStreams.size,
      dashboardSubscribers: this.io.sockets.adapter.rooms.get('dashboard')?.size || 0,
      threatSubscribers: this.io.sockets.adapter.rooms.get('threats')?.size || 0,
      incidentSubscribers: this.io.sockets.adapter.rooms.get('incidents')?.size || 0
    }
  }
}

// Export singleton instance
const wsService = new WebSocketService()
export default wsService
