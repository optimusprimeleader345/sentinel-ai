import SystemHealth from '../models/SystemHealth.js'

export const getSystemHealth = async (req, res) => {
  try {
    // Get latest system health record
    const health = await SystemHealth.findOne().sort({ timestamp: -1 })

    if (!health) {
      // Return mock data if no records
      return res.json({
        cpu: 45,
        memory: 62,
        disk: 34,
        network: 78,
        uptime: '99.8%',
        status: 'healthy',
        services: [
          { name: 'Web Server', status: 'running', uptime: '15d 4h' },
          { name: 'Database', status: 'running', uptime: '15d 4h' },
          { name: 'Cache', status: 'running', uptime: '12d 8h' },
          { name: 'Queue Worker', status: 'running', uptime: '10d 2h' },
        ],
      })
    }

    res.json({
      cpu: health.cpu,
      memory: health.memory,
      disk: health.disk,
      network: health.network,
      uptime: health.uptime,
      status: health.cpu > 80 || health.memory > 90 ? 'degraded' : 'healthy',
      services: [
        { name: 'Web Server', status: 'running', uptime: '15d 4h' },
        { name: 'Database', status: 'running', uptime: '15d 4h' },
        { name: 'Cache', status: 'running', uptime: '12d 8h' },
        { name: 'Queue Worker', status: 'running', uptime: '10d 2h' },
      ],
    })
  } catch (error) {
    console.error('Get system health error:', error)
    res.status(500).json({ message: 'Server error fetching system health' })
  }
}

export const updateSystemHealth = async (req, res) => {
  try {
    const { cpu, memory, disk, network, uptime } = req.body

    const health = await SystemHealth.create({
      cpu: cpu || 45,
      memory: memory || 62,
      disk: disk || 34,
      network: network || 78,
      uptime: uptime || '99.8%',
    })

    res.json(health)
  } catch (error) {
    console.error('Update system health error:', error)
    res.status(500).json({ message: 'Server error updating system health' })
  }
}

export const getSystemProcesses = async (req, res) => {
  try {
    // In a real app, you would query system processes
    // For demo, return mock data
    const processes = [
      { id: 1, name: 'nginx.exe', cpu: 2.5, memory: 45, status: 'running', pid: 1234 },
      { id: 2, name: 'nodejs.exe', cpu: 15.3, memory: 120, status: 'running', pid: 5678 },
      { id: 3, name: 'mongodb.exe', cpu: 8.7, memory: 98, status: 'running', pid: 9101 },
      { id: 4, name: 'chrome.exe', cpu: 12.1, memory: 234, status: 'running', pid: 1121 },
      { id: 5, name: 'mysqld.exe', cpu: 5.2, memory: 67, status: 'stopped', pid: 1314 },
      { id: 6, name: 'sentinel.exe', cpu: 3.4, memory: 89, status: 'running', pid: 1516 },
      { id: 7, name: 'ai-guardian.exe', cpu: 9.8, memory: 156, status: 'running', pid: 1718 },
    ]

    res.json(processes)
  } catch (error) {
    console.error('Get system processes error:', error)
    res.status(500).json({ message: 'Server error fetching system processes' })
  }
}
