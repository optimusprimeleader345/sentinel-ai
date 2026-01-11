import { Shield, AlertTriangle, CheckCircle, XCircle, Clock, Zap } from 'lucide-react'

function ActionBadge({ action, status = 'pending', className = '' }) {
  const getActionConfig = (action) => {
    const configs = {
      BLOCK_ASSET: {
        label: 'Block Asset',
        icon: Shield,
        color: 'bg-red-100 text-red-800 border-red-200'
      },
      BLOCK_URL: {
        label: 'Block URL',
        icon: Shield,
        color: 'bg-red-100 text-red-800 border-red-200'
      },
      BLOCK_IP: {
        label: 'Block IP',
        icon: Shield,
        color: 'bg-red-100 text-red-800 border-red-200'
      },
      QUARANTINE_FILE: {
        label: 'Quarantine File',
        icon: Shield,
        color: 'bg-orange-100 text-orange-800 border-orange-200'
      },
      DISABLE_ACCOUNT: {
        label: 'Disable Account',
        icon: Shield,
        color: 'bg-red-100 text-red-800 border-red-200'
      },
      ESCALATE_INCIDENT: {
        label: 'Escalate Incident',
        icon: AlertTriangle,
        color: 'bg-purple-100 text-purple-800 border-purple-200'
      },
      NOTIFY_ADMIN: {
        label: 'Notify Admin',
        icon: Zap,
        color: 'bg-blue-100 text-blue-800 border-blue-200'
      },
      RECOMMEND_BLOCK: {
        label: 'Recommend Block',
        icon: Shield,
        color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
      },
      RECOMMEND_REVIEW: {
        label: 'Recommend Review',
        icon: Clock,
        color: 'bg-cyan-100 text-cyan-800 border-cyan-200'
      },
      LOG_ONLY: {
        label: 'Log Only',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-800 border-green-200'
      }
    }

    return configs[action] || {
      label: action,
      icon: Shield,
      color: 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case 'executed':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          icon: CheckCircle,
          iconColor: 'text-green-600'
        }
      case 'failed':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600'
        }
      case 'pending':
      default:
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          icon: Clock,
          iconColor: 'text-yellow-600'
        }
    }
  }

  const actionConfig = getActionConfig(action)
  const statusConfig = getStatusConfig(status)
  const Icon = actionConfig.icon
  const StatusIcon = statusConfig.icon

  return (
    <div className={`inline-flex items-center px-3 py-2 rounded-lg border ${statusConfig.bg} ${statusConfig.border} ${className}`}>
      <Icon className={`w-4 h-4 mr-2 ${actionConfig.color.split(' ')[1]}`} />
      <span className={`text-sm font-medium mr-2 ${actionConfig.color.split(' ')[1]}`}>
        {actionConfig.label}
      </span>
      <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
    </div>
  )
}

export default ActionBadge
