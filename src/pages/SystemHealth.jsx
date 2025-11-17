import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import Card from '../components/Card'
import HealthIndicator from '../components/HealthIndicator'
import StatusBadge from '../components/StatusBadge'
import { mockHealthMetrics } from '../data/mock'

const COLORS = ['#10b981', '#f59e0b', '#ef4444']

function SystemHealth() {
  const cpuData = [
    { name: 'Used', value: mockHealthMetrics.cpu.usage },
    { name: 'Free', value: 100 - mockHealthMetrics.cpu.usage },
  ]

  const memoryData = [
    { name: 'Used', value: (mockHealthMetrics.memory.used / mockHealthMetrics.memory.total) * 100 },
    { name: 'Free', value: ((mockHealthMetrics.memory.total - mockHealthMetrics.memory.used) / mockHealthMetrics.memory.total) * 100 },
  ]

  const diskData = [
    { name: 'Used', value: (mockHealthMetrics.disk.used / mockHealthMetrics.disk.total) * 100 },
    { name: 'Free', value: ((mockHealthMetrics.disk.total - mockHealthMetrics.disk.used) / mockHealthMetrics.disk.total) * 100 },
  ]

  const networkData = [
    { name: 'Inbound', value: mockHealthMetrics.network.in },
    { name: 'Outbound', value: mockHealthMetrics.network.out },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-slate-600">Overall Uptime</p>
            <HealthIndicator status="healthy" />
          </div>
          <p className="text-3xl font-bold text-slate-900">{mockHealthMetrics.uptime}</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-600 mb-4">CPU Usage</p>
          <p className="text-3xl font-bold text-slate-900">{mockHealthMetrics.cpu.usage}%</p>
          <p className="text-xs text-slate-500 mt-1">{mockHealthMetrics.cpu.cores} cores</p>
        </Card>
        <Card>
          <p className="text-sm text-slate-600 mb-4">Memory Usage</p>
          <p className="text-3xl font-bold text-slate-900">
            {mockHealthMetrics.memory.used} / {mockHealthMetrics.memory.total} {mockHealthMetrics.memory.unit}
          </p>
        </Card>
        <Card>
          <p className="text-sm text-slate-600 mb-4">Disk Usage</p>
          <p className="text-3xl font-bold text-slate-900">
            {mockHealthMetrics.disk.used} / {mockHealthMetrics.disk.total} {mockHealthMetrics.disk.unit}
          </p>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-6">CPU Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={cpuData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {cpuData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[0] : '#e2e8f0'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-slate-900">{mockHealthMetrics.cpu.usage}%</p>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Memory Usage</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={memoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  dataKey="value"
                >
                  {memoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 0 ? COLORS[0] : '#e2e8f0'} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="text-center mt-4">
            <p className="text-2xl font-bold text-slate-900">
              {((mockHealthMetrics.memory.used / mockHealthMetrics.memory.total) * 100).toFixed(1)}%
            </p>
          </div>
        </Card>
      </div>

      {/* Network Traffic */}
      <Card>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Network Traffic</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[networkData[0], networkData[1]]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Service Status */}
      <Card>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Service Status</h3>
        <div className="space-y-4">
          {mockHealthMetrics.services.map((service) => (
            <div
              key={service.name}
              className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
            >
              <div className="flex items-center space-x-4">
                <HealthIndicator status={service.status} />
                <div>
                  <p className="font-medium text-slate-900">{service.name}</p>
                  <p className="text-sm text-slate-500">Uptime: {service.uptime}</p>
                </div>
              </div>
              <StatusBadge status={service.status} />
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default SystemHealth

