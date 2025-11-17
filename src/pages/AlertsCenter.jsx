import { useState } from 'react'
import Card from '../components/Card'
import SeverityBadge from '../components/SeverityBadge'
import StatusBadge from '../components/StatusBadge'
import { mockAlerts } from '../data/mock'

function AlertsCenter() {
  const [severityFilter, setSeverityFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredAlerts = mockAlerts.filter((alert) => {
    const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter
    const matchesStatus = statusFilter === 'all' || alert.status === statusFilter
    return matchesSeverity && matchesStatus
  })

  return (
    <div className="flex gap-6">
      {/* Side Filters */}
      <div className="w-64 flex-shrink-0">
        <Card>
          <h3 className="text-sm font-semibold text-slate-900 mb-4">Filters</h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-700 mb-2">Severity</p>
              <div className="space-y-2">
                {['all', 'critical', 'high', 'medium', 'low'].map((severity) => (
                  <label key={severity} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="severity"
                      value={severity}
                      checked={severityFilter === severity}
                      onChange={(e) => setSeverityFilter(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 capitalize">
                      {severity === 'all' ? 'All Severities' : severity}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-700 mb-2">Status</p>
              <div className="space-y-2">
                {['all', 'open', 'in_progress', 'resolved'].map((status) => (
                  <label key={status} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={statusFilter === status}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-sm text-slate-700 capitalize">
                      {status === 'all' ? 'All Statuses' : status === 'in_progress' ? 'In Progress' : status}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Alerts List */}
      <div className="flex-1">
        <Card>
          <h3 className="text-lg font-semibold text-slate-900 mb-6">Active Alerts</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Severity</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Alert Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Source System</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Timestamp</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-slate-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredAlerts.map((alert) => (
                  <tr
                    key={alert.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <SeverityBadge severity={alert.severity} />
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-slate-900">{alert.description}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{alert.source}</td>
                    <td className="py-3 px-4 text-sm text-slate-600">{alert.timestamp}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={alert.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default AlertsCenter

