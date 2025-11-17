import { useState } from 'react'
import { Search } from 'lucide-react'
import Card from '../components/Card'
import LogRow from '../components/LogRow'
import { mockLogs } from '../data/mock'

function LogsViewer() {
  const [searchQuery, setSearchQuery] = useState('')
  const [levelFilter, setLevelFilter] = useState('all')

  const filteredLogs = mockLogs.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter
    return matchesSearch && matchesLevel
  })

  // Simulate infinite scroll with more logs
  const displayLogs = [...filteredLogs, ...filteredLogs, ...filteredLogs]

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent font-mono text-sm"
            />
          </div>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            className="px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            <option value="all">All Levels</option>
            <option value="error">Error</option>
            <option value="warn">Warning</option>
            <option value="info">Info</option>
            <option value="debug">Debug</option>
          </select>
        </div>
      </Card>

      {/* Logs Viewer */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">System Logs</h3>
          <p className="text-sm text-slate-500">{displayLogs.length} entries</p>
        </div>
        <div className="bg-slate-900 rounded-lg p-4 max-h-[600px] overflow-y-auto font-mono text-sm">
          {displayLogs.length === 0 ? (
            <p className="text-slate-400 text-center py-8">No logs found</p>
          ) : (
            <div className="space-y-1">
              {displayLogs.map((log, index) => (
                <LogRow key={`${log.id}-${index}`} log={log} />
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}

export default LogsViewer

