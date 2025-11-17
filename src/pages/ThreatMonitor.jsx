import { useState } from 'react'
import { Search, Eye, FileText } from 'lucide-react'
import Card from '../components/Card'
import StatusBadge from '../components/StatusBadge'
import SeverityBadge from '../components/SeverityBadge'
import Button from '../components/Button'
import { mockThreats } from '../data/mock'

function ThreatMonitor() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [severityFilter, setSeverityFilter] = useState('all')

  const filteredThreats = mockThreats.filter((threat) => {
    const matchesStatus = statusFilter === 'all' || threat.status === statusFilter
    const matchesSeverity = severityFilter === 'all' || threat.severity === severityFilter
    return matchesStatus && matchesSeverity
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="online">Online</option>
            <option value="degraded">Degraded</option>
            <option value="offline">Offline</option>
          </select>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <div className="px-4 py-2 border border-slate-200 rounded-lg bg-slate-50 text-sm text-slate-600">
            Date Range: Last 7 days
          </div>
        </div>
      </Card>

      {/* Threats Table */}
      <Card>
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Monitored Assets</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Asset Name</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">IP Address</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Last Ping</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">CPU Load</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredThreats.map((threat) => (
                <tr
                  key={threat.id}
                  className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm font-medium text-slate-900">{threat.assetName}</td>
                  <td className="py-3 px-4 text-sm text-slate-600 font-mono">{threat.ipAddress}</td>
                  <td className="py-3 px-4 text-sm text-slate-600">{threat.lastPing}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-slate-100 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            parseFloat(threat.cpuLoad) > 80
                              ? 'bg-red-500'
                              : parseFloat(threat.cpuLoad) > 50
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: threat.cpuLoad }}
                        />
                      </div>
                      <span className="text-sm text-slate-700">{threat.cpuLoad}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={threat.status} />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default ThreatMonitor

