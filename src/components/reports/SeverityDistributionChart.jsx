import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { AlertTriangle, AlertCircle, Info, Shield } from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
)

const SeverityDistributionChart = ({ auditLogs }) => {
  const chartRef = useRef(null)

  // Calculate severity distribution
  const severityStats = {
    CRITICAL: auditLogs.filter(log => log.severity === 'CRITICAL').length,
    HIGH: auditLogs.filter(log => log.severity === 'HIGH').length,
    MEDIUM: auditLogs.filter(log => log.severity === 'MEDIUM').length,
    LOW: auditLogs.filter(log => log.severity === 'LOW').length
  }

  // Get severity colors and icons
  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          color: '#ef4444',
          bgColor: 'rgba(239, 68, 68, 0.8)',
          borderColor: '#dc2626',
          icon: AlertTriangle
        }
      case 'HIGH':
        return {
          color: '#f97316',
          bgColor: 'rgba(249, 115, 22, 0.8)',
          borderColor: '#ea580c',
          icon: AlertCircle
        }
      case 'MEDIUM':
        return {
          color: '#eab308',
          bgColor: 'rgba(234, 179, 8, 0.8)',
          borderColor: '#ca8a04',
          icon: AlertCircle
        }
      case 'LOW':
        return {
          color: '#22c55e',
          bgColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: '#16a34a',
          icon: Info
        }
      default:
        return {
          color: '#6b7280',
          bgColor: 'rgba(107, 114, 128, 0.8)',
          borderColor: '#4b5563',
          icon: Shield
        }
    }
  }

  const data = {
    labels: ['Critical', 'High', 'Medium', 'Low'],
    datasets: [
      {
        data: [
          severityStats.CRITICAL,
          severityStats.HIGH,
          severityStats.MEDIUM,
          severityStats.LOW
        ],
        backgroundColor: [
          getSeverityConfig('CRITICAL').bgColor,
          getSeverityConfig('HIGH').bgColor,
          getSeverityConfig('MEDIUM').bgColor,
          getSeverityConfig('LOW').bgColor
        ],
        borderColor: [
          getSeverityConfig('CRITICAL').borderColor,
          getSeverityConfig('HIGH').borderColor,
          getSeverityConfig('MEDIUM').borderColor,
          getSeverityConfig('LOW').borderColor
        ],
        borderWidth: 3,
        hoverBorderWidth: 4,
        hoverBorderColor: [
          '#f87171',
          '#fb923c',
          '#facc15',
          '#4ade80'
        ]
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        titleColor: '#f1f5f9',
        bodyColor: '#cbd5e1',
        borderColor: 'rgba(148, 163, 184, 0.3)',
        borderWidth: 1,
        cornerRadius: 8,
        padding: 12,
        callbacks: {
          label: function(context) {
            const label = context.label || ''
            const value = context.parsed || 0
            const total = context.dataset.data.reduce((a, b) => a + b, 0)
            const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0
            return `${label}: ${value} (${percentage}%)`
          }
        }
      }
    },
    cutout: '60%',
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      arc: {
        borderRadius: 6
      }
    }
  }

  const totalEvents = auditLogs.length
  const criticalPercentage = totalEvents > 0 ? ((severityStats.CRITICAL / totalEvents) * 100).toFixed(1) : 0

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg">
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Severity Distribution</h3>
            <p className="text-sm text-slate-400">Audit events by severity level</p>
          </div>
        </div>

        {severityStats.CRITICAL > 0 && (
          <div className="flex items-center space-x-2 px-3 py-1 bg-red-500/20 border border-red-500/30 rounded-full">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-medium text-red-400">{criticalPercentage}% Critical</span>
          </div>
        )}
      </div>

      <div className="relative" style={{ height: '300px' }}>
        {totalEvents === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Shield className="w-16 h-16 text-slate-500 mb-4" />
            <h4 className="text-lg font-medium text-slate-300 mb-2">No Data Available</h4>
            <p className="text-sm text-slate-500">Apply filters or wait for audit events</p>
          </div>
        ) : (
          <Doughnut ref={chartRef} data={data} options={options} />
        )}
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
          <div className="text-2xl font-bold text-red-400">{severityStats.CRITICAL}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide">Critical</div>
        </div>
        <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
          <div className="text-2xl font-bold text-orange-400">{severityStats.HIGH}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide">High</div>
        </div>
        <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
          <div className="text-2xl font-bold text-yellow-400">{severityStats.MEDIUM}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide">Medium</div>
        </div>
        <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
          <div className="text-2xl font-bold text-green-400">{severityStats.LOW}</div>
          <div className="text-xs text-slate-400 uppercase tracking-wide">Low</div>
        </div>
      </div>
    </motion.div>
  )
}

export default SeverityDistributionChart
