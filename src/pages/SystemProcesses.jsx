import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Cpu, HardDrive, MemoryStick, Activity, AlertTriangle, Play, Square } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import SeverityBadge from '../components/SeverityBadge'
import { systemAPI } from '../lib/api.js'

function SystemProcesses() {
  const [processes, setProcesses] = useState([])
  const [systemMetrics, setSystemMetrics] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProcesses()
    loadSystemMetrics()
  }, [])

  const loadProcesses = async () => {
    try {
      const response = await systemAPI.getProcesses()
      setProcesses(response.data)
    } catch (error) {
      console.error('Failed to load processes:', error)
      setProcesses(mockProcesses)
    }
  }

  const loadSystemMetrics = async () => {
    try {
      const response = await systemAPI.getHealth()
      setSystemMetrics(response.data)
    } catch (error) {
      console.error('Failed to load system metrics:', error)
      setSystemMetrics(mockMetrics)
    } finally {
      setLoading(false)
    }
  }

  const mockProcesses = [
    { id: 1, name: 'nginx.exe', cpu: 2.5, memory: 45, status: 'running', pid: 1234 },
    { id: 2, name: 'nodejs.exe', cpu: 15.3, memory: 120, status: 'running', pid: 5678 },
    { id: 3, name: 'mongodb.exe', cpu: 8.7, memory: 98, status: 'running', pid: 9101 },
    { id: 4, name: 'chrome.exe', cpu: 12.1, memory: 234, status: 'running', pid: 1121 },
    { id: 5, name: 'mysqld.exe', cpu: 5.2, memory: 67, status: 'stopped', pid: 1314 },
  ]

  const mockMetrics = {
    cpu: 35,
    memory: 72,
    disk: 45,
    network: 25,
  }

  const handleStartProcess = (id) => {
    alert(`Starting process ${id}`)
  }

  const handleStopProcess = (id) => {
    alert(`Stopping process ${id}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-white">Loading system processes...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">System Processes</h1>
          <p className="text-slate-400">Monitor and manage running system processes</p>
        </div>
        <Button onClick={loadProcesses}>Refresh</Button>
      </div>

      {/* System Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Cpu className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">CPU Usage</h3>
              <p className="text-slate-400 text-sm">{systemMetrics.cpu}%</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${Math.min(systemMetrics.cpu, 100)}%` }}
            ></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <MemoryStick className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Memory Usage</h3>
              <p className="text-slate-400 text-sm">{systemMetrics.memory}%</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-green-500 h-2 rounded-full"
              style={{ width: `${Math.min(systemMetrics.memory, 100)}%` }}
            ></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <HardDrive className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Disk Usage</h3>
              <p className="text-slate-400 text-sm">{systemMetrics.disk}%</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-yellow-500 h-2 rounded-full"
              style={{ width: `${Math.min(systemMetrics.disk, 100)}%` }}
            ></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Network Usage</h3>
              <p className="text-slate-400 text-sm">{systemMetrics.network}%</p>
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-purple-500 h-2 rounded-full"
              style={{ width: `${Math.min(systemMetrics.network, 100)}%` }}
            ></div>
          </div>
        </Card>
      </div>

      {/* Processes List */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Running Processes</h3>
        <div className="space-y-3">
          {processes.map((process) => (
            <motion.div
              key={process.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${process.status === 'running' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <div>
                  <p className="text-white font-medium">{process.name}</p>
                  <p className="text-slate-400 text-sm">PID: {process.pid}</p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-xs text-slate-400">CPU</p>
                  <p className="text-white">{process.cpu}%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-400">Memory</p>
                  <p className="text-white">{process.memory}MB</p>
                </div>
                <div className="flex space-x-2">
                  {process.status === 'running' ? (
                    <>
                      <Button variant="danger" size="sm" onClick={() => handleStopProcess(process.id)}>
                        <Square className="w-3 h-3" />
                      </Button>
                      <SeverityBadge severity="low" />
                    </>
                  ) : (
                    <>
                      <Button variant="success" size="sm" onClick={() => handleStartProcess(process.id)}>
                        <Play className="w-3 h-3" />
                      </Button>
                      <SeverityBadge severity="critical" />
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default SystemProcesses
