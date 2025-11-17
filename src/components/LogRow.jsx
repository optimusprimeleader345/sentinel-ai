function LogRow({ log }) {
  const levelColors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warn: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
    debug: 'bg-slate-50 border-slate-200 text-slate-600',
  }

  return (
    <div className={`px-4 py-2 border-l-4 font-mono text-sm ${levelColors[log.level] || levelColors.debug}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="font-semibold uppercase text-xs">{log.level}</span>
          <span className="text-slate-500">{log.timestamp}</span>
          <span className="text-slate-400">[{log.source}]</span>
        </div>
        <span className="flex-1 ml-4">{log.message}</span>
      </div>
    </div>
  )
}

export default LogRow

