import { useEffect, useRef } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { motion } from 'framer-motion'
import { TrendingUp, Calendar, Activity } from 'lucide-react'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const AuditTimelineChart = ({ auditLogs }) => {
  const chartRef = useRef(null)

  // Generate timeline data for the last 30 days
  const generateTimelineData = () => {
    const days = []
    const now = new Date()

    // Create array of last 30 days (from oldest to newest for proper chart display)
    for (let i = 29; i >= 0; i--) {
      const date = new Date(now)
      date.setDate(date.getDate() - i)
      date.setHours(0, 0, 0, 0) // Reset time to start of day
      days.push({
        date: date,
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        total: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0
      })
    }

    // Count events per day - ensure we're matching dates correctly
    auditLogs.forEach(log => {
      const logDate = new Date(log.timestamp)
      logDate.setHours(0, 0, 0, 0) // Reset time to start of day for comparison

      // Find matching day in our timeline
      const dayIndex = days.findIndex(day => {
        return day.date.getTime() === logDate.getTime()
      })

      if (dayIndex !== -1) {
        days[dayIndex].total++
        switch (log.severity) {
          case 'CRITICAL':
            days[dayIndex].critical++
            break
          case 'HIGH':
            days[dayIndex].high++
            break
          case 'MEDIUM':
            days[dayIndex].medium++
            break
          case 'LOW':
            days[dayIndex].low++
            break
        }
      }
    })

    return days
  }

  const timelineData = generateTimelineData()

  const data = {
    labels: timelineData.map(day => day.label),
    datasets: [
      {
        label: 'Critical',
        data: timelineData.map(day => day.critical),
        borderColor: '#ef4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#ef4444',
        pointBorderColor: '#dc2626',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#f87171',
        pointHoverBorderColor: '#ef4444'
      },
      {
        label: 'High',
        data: timelineData.map(day => day.high),
        borderColor: '#f97316',
        backgroundColor: 'rgba(249, 115, 22, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#f97316',
        pointBorderColor: '#ea580c',
        pointBorderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: '#fb923c',
        pointHoverBorderColor: '#f97316'
      },
      {
        label: 'Total Events',
        data: timelineData.map(day => day.total),
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.1)',
        borderWidth: 3,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: '#06b6d4',
        pointBorderColor: '#0891b2',
        pointBorderWidth: 2,
        pointRadius: 2,
        pointHoverRadius: 4,
        pointHoverBackgroundColor: '#22d3ee',
        pointHoverBorderColor: '#06b6d4'
      }
    ]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#e2e8f0',
          font: {
            size: 12,
            weight: '500'
          },
          padding: 15,
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
          title: function(context) {
            return `Date: ${context[0].label}`
          },
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}`
          }
        }
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
          color: '#94a3b8',
          font: {
            size: 12,
            weight: '500'
          }
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          },
          maxTicksLimit: 7
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          borderColor: 'rgba(148, 163, 184, 0.2)'
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Events',
          color: '#94a3b8',
          font: {
            size: 12,
            weight: '500'
          }
        },
        ticks: {
          color: '#94a3b8',
          font: {
            size: 11
          },
          beginAtZero: true,
          precision: 0
        },
        grid: {
          color: 'rgba(148, 163, 184, 0.1)',
          borderColor: 'rgba(148, 163, 184, 0.2)'
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeOutQuart'
    },
    elements: {
      point: {
        hoverBorderWidth: 3
      }
    }
  }

  // Calculate summary stats
  const totalEvents = auditLogs.length
  const avgPerDay = (totalEvents / 30).toFixed(1)
  const peakDay = timelineData.reduce((max, day) =>
    day.total > max.total ? day : max, timelineData[0]
  )
  const criticalEvents = auditLogs.filter(log => log.severity === 'CRITICAL').length

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-xl p-6 h-full"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Audit Timeline</h3>
            <p className="text-sm text-slate-400">Security events over the last 30 days</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-lg font-bold text-cyan-400">{avgPerDay}</div>
            <div className="text-xs text-slate-400">Avg/Day</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-red-400">{criticalEvents}</div>
            <div className="text-xs text-slate-400">Critical</div>
          </div>
        </div>
      </div>

      <div className="relative" style={{ height: '300px' }}>
        {totalEvents === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Calendar className="w-16 h-16 text-slate-500 mb-4" />
            <h4 className="text-lg font-medium text-slate-300 mb-2">No Timeline Data</h4>
            <p className="text-sm text-slate-500">Audit events will appear here over time</p>
          </div>
        ) : (
          <Line ref={chartRef} data={data} options={options} />
        )}
      </div>

      {/* Key Insights */}
      <div className="mt-6 grid grid-cols-3 gap-4">
        <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
          <div className="text-lg font-bold text-cyan-400">{peakDay.total}</div>
          <div className="text-xs text-slate-400">Peak Day</div>
          <div className="text-xs text-slate-500 mt-1">{peakDay.label}</div>
        </div>
        <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
          <div className="text-lg font-bold text-green-400">
            {timelineData.filter(day => day.total > 0).length}
          </div>
          <div className="text-xs text-slate-400">Active Days</div>
          <div className="text-xs text-slate-500 mt-1">30 days</div>
        </div>
        <div className="text-center p-3 bg-slate-900/50 rounded-lg border border-slate-700/30">
          <div className="text-lg font-bold text-orange-400">
            {timelineData.filter(day => day.critical + day.high > 0).length}
          </div>
          <div className="text-xs text-slate-400">Alert Days</div>
          <div className="text-xs text-slate-500 mt-1">High/Crit</div>
        </div>
      </div>
    </motion.div>
  )
}

export default AuditTimelineChart
