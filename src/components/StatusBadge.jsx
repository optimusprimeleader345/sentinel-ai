function StatusBadge({ status, className = '' }) {
  const variants = {
    healthy: 'bg-green-100 text-green-700 border-green-200',
    degraded: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    warning: 'bg-orange-100 text-orange-700 border-orange-200',
    offline: 'bg-red-100 text-red-700 border-red-200',
    online: 'bg-green-100 text-green-700 border-green-200',
    running: 'bg-green-100 text-green-700 border-green-200',
    stopped: 'bg-red-100 text-red-700 border-red-200',
    open: 'bg-blue-100 text-blue-700 border-blue-200',
    in_progress: 'bg-yellow-100 text-yellow-700 border-yellow-200',
    resolved: 'bg-green-100 text-green-700 border-green-200',
  }

  const displayText = {
    in_progress: 'In Progress',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${variants[status] || 'bg-slate-100 text-slate-700'} ${className}`}
    >
      {displayText[status] || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

export default StatusBadge

