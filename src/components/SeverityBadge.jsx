function SeverityBadge({ severity, className = '' }) {
  const variants = {
    critical: 'bg-red-600 text-white',
    high: 'bg-orange-500 text-white',
    medium: 'bg-yellow-500 text-white',
    low: 'bg-blue-500 text-white',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${variants[severity] || 'bg-slate-500 text-white'} ${className}`}
    >
      {severity.charAt(0).toUpperCase() + severity.slice(1)}
    </span>
  )
}

export default SeverityBadge

