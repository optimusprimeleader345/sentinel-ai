import Log from '../models/Log.js'

export const getLogs = async (req, res) => {
  try {
    const { level, limit = 50 } = req.query

    const query = level ? { level } : {}
    const logs = await Log.find(query).sort({ timestamp: -1 }).limit(parseInt(limit))

    // If no logs in DB, return mock data
    if (logs.length === 0) {
      const mockLogs = [
        {
          _id: '1',
          level: 'error',
          message: 'Database connection failed: timeout after 30s',
          source: 'db-service',
          timestamp: new Date(),
        },
        {
          _id: '2',
          level: 'warn',
          message: 'High CPU usage detected on server-01',
          source: 'monitor',
          timestamp: new Date(),
        },
        {
          _id: '3',
          level: 'info',
          message: 'User authentication successful: user@example.com',
          source: 'auth-service',
          timestamp: new Date(),
        },
        {
          _id: '4',
          level: 'error',
          message: 'Failed to process payment request',
          source: 'payment-service',
          timestamp: new Date(),
        },
        {
          _id: '5',
          level: 'info',
          message: 'API request processed: GET /api/users',
          source: 'api-gateway',
          timestamp: new Date(),
        },
      ]
      return res.json(mockLogs)
    }

    res.json(logs)
  } catch (error) {
    console.error('Get logs error:', error)
    res.status(500).json({ message: 'Server error fetching logs' })
  }
}

export const createLog = async (req, res) => {
  try {
    const { level, message, source } = req.body

    const log = await Log.create({
      level: level || 'info',
      message,
      source: source || 'system',
    })

    res.status(201).json(log)
  } catch (error) {
    console.error('Create log error:', error)
    res.status(500).json({ message: 'Server error creating log' })
  }
}

