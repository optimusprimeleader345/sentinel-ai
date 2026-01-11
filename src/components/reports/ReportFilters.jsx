import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Filter, X, Search, ChevronDown, ChevronUp } from 'lucide-react'

const ReportFilters = ({ filters, onFiltersChange, onReset }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  const severityOptions = [
    { value: 'all', label: 'All Severities' },
    { value: 'CRITICAL', label: 'Critical' },
    { value: 'HIGH', label: 'High' },
    { value: 'MEDIUM', label: 'Medium' },
    { value: 'LOW', label: 'Low' }
  ]

  const typeOptions = [
    { value: 'all', label: 'All Types' },
    { value: 'URL', label: 'URL Scans' },
    { value: 'IP', label: 'IP Scans' },
    { value: 'EMAIL', label: 'Email Scans' },
    { value: 'PASSWORD', label: 'Password Checks' }
  ]

  const outcomeOptions = [
    { value: 'all', label: 'All Outcomes' },
    { value: 'SUCCESS', label: 'Success' },
    { value: 'BLOCKED', label: 'Blocked' },
    { value: 'FAILED', label: 'Failed' }
  ]

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    })
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.severity !== 'all') count++
    if (filters.type !== 'all') count++
    if (filters.outcome !== 'all') count++
    if (filters.search) count++
    if (filters.startDate || filters.endDate) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
              <Filter className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Advanced Report Filters</h3>
              <p className="text-sm text-slate-400">Filter audit logs by multiple criteria</p>
            </div>
            {activeFiltersCount > 0 && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                {activeFiltersCount} active
              </span>
            )}
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center space-x-2 px-3 py-1 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/50"
          >
            <span className="text-sm">{isExpanded ? 'Collapse' : 'Expand'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Search Bar - Always Visible */}
      <div className="px-6 py-4 border-b border-slate-700/50">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search audit logs by action, resource, or actor..."
            value={filters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
          />
        </div>
      </div>

      {/* Expanded Filters */}
      <motion.div
        initial={false}
        animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 space-y-6">
          {/* Date Range */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-cyan-400" />
              <span>Date Range</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => handleFilterChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  End Date
                </label>
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => handleFilterChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>

          {/* Filter Dropdowns */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white">Filter Criteria</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Severity Level
                </label>
                <select
                  value={filters.severity || 'all'}
                  onChange={(e) => handleFilterChange('severity', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  {severityOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Event Type
                </label>
                <select
                  value={filters.type || 'all'}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  {typeOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-2">
                  Outcome
                </label>
                <select
                  value={filters.outcome || 'all'}
                  onChange={(e) => handleFilterChange('outcome', e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                >
                  {outcomeOptions.map(option => (
                    <option key={option.value} value={option.value} className="bg-slate-900 text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700/50">
            <button
              onClick={onReset}
              className="flex items-center space-x-2 px-4 py-2 text-slate-300 bg-slate-700/50 hover:bg-slate-600/50 rounded-lg transition-all duration-200 border border-slate-600"
            >
              <X className="w-4 h-4" />
              <span>Reset All Filters</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ReportFilters
