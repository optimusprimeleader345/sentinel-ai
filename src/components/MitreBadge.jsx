import React from 'react'
import { Shield, Info } from 'lucide-react'
import { getMitreMapping, formatMitreDisplay } from '../utils/mitreMapping'

/**
 * MITRE ATT&CK Badge Component
 * Displays MITRE ATT&CK classification with tactic, technique ID, and name
 */
function MitreBadge({ incidentType, size = 'sm', showTooltip = true, className = '' }) {

  const mapping = getMitreMapping(incidentType)

  if (!mapping || mapping.techniqueId === 'T0000') {
    return (
      <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gray-500/10 border border-gray-500/20 text-gray-400 text-xs font-medium ${className}`}>
        <Shield className="w-3 h-3" />
        <span>Under Analysis</span>
      </div>
    )
  }

  const getTacticColor = (tactic) => {
    switch (tactic) {
      case 'Initial Access':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400'
      case 'Execution':
        return 'bg-green-500/10 border-green-500/30 text-green-400'
      case 'Persistence':
        return 'bg-purple-500/10 border-purple-500/30 text-purple-400'
      case 'Privilege Escalation':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400'
      case 'Defense Evasion':
        return 'bg-red-500/10 border-red-500/30 text-red-400'
      case 'Credential Access':
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400'
      case 'Discovery':
        return 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400'
      case 'Lateral Movement':
        return 'bg-pink-500/10 border-pink-500/30 text-pink-400'
      case 'Collection':
        return 'bg-teal-500/10 border-teal-500/30 text-teal-400'
      case 'Command and Control':
        return 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
      case 'Exfiltration':
        return 'bg-violet-500/10 border-violet-500/30 text-violet-400'
      case 'Impact':
        return 'bg-rose-500/10 border-rose-500/30 text-rose-400'
      default:
        return 'bg-gray-500/10 border-gray-500/30 text-gray-400'
    }
  }

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  }

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  return (
    <div className={`inline-flex items-center space-x-2 ${sizeClasses[size]} rounded-full border font-medium ${getTacticColor(mapping.tactic)} ${className}`}>
      <Shield className={iconSizes[size]} />
      <span className="font-mono font-bold">{mapping.techniqueId}</span>
      <span className="hidden sm:inline">{mapping.techniqueName}</span>
      <span className="sm:hidden">{mapping.tactic}</span>

      {showTooltip && (
        <div className="relative group">
          <Info className={`${iconSizes[size]} opacity-60 hover:opacity-100 cursor-help`} />
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-slate-800 text-white text-xs rounded-lg shadow-lg border border-slate-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50 min-w-max max-w-xs">
            <div className="font-semibold text-slate-200 mb-1">{formatMitreDisplay(mapping)}</div>
            <div className="text-slate-300 text-xs leading-relaxed">{mapping.description}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MitreBadge
