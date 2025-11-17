import { CheckCircle, AlertCircle, XCircle, Loader } from 'lucide-react'

function HealthIndicator({ status, size = 'md' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  }

  const icons = {
    healthy: <CheckCircle className={`${sizeClasses[size]} text-green-600`} />,
    degraded: <AlertCircle className={`${sizeClasses[size]} text-yellow-600`} />,
    warning: <AlertCircle className={`${sizeClasses[size]} text-orange-600`} />,
    offline: <XCircle className={`${sizeClasses[size]} text-red-600`} />,
    online: <CheckCircle className={`${sizeClasses[size]} text-green-600`} />,
    running: <CheckCircle className={`${sizeClasses[size]} text-green-600`} />,
    stopped: <XCircle className={`${sizeClasses[size]} text-red-600`} />,
  }

  return icons[status] || <Loader className={`${sizeClasses[size]} text-slate-400 animate-spin`} />
}

export default HealthIndicator

