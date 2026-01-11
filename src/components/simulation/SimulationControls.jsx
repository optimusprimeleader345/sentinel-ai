import React from 'react'
import { motion } from 'framer-motion'
import {
  Play,
  Pause,
  Square,
  RotateCcw,
  Settings,
  BarChart3,
  Zap,
  Shield,
  AlertTriangle,
  Activity,
  CheckCircle,
  XCircle
} from 'lucide-react'

const SimulationControls = ({
  isRunning,
  selectedScenario,
  onStart,
  onStop,
  onReset,
  simulationState,
  disabled
}) => {
  const getScenarioStats = (scenario) => {
    const stats = {
      phishing: { events: 4, alerts: 2, incidents: 1, duration: '8s' },
      malware: { events: 4, alerts: 3, incidents: 2, duration: '12s' },
      compromise: { events: 4, alerts: 3, incidents: 2, duration: '10s' },
      multistage: { events: 6, alerts: 4, incidents: 3, duration: '18s' }
    }
    return stats[scenario] || { events: 0, alerts: 0, incidents: 0, duration: '0s' }
  }

  const stats = getScenarioStats(selectedScenario)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-purple-400" />
          <div>
            <h2 className="text-xl font-bold text-white">Simulation Controls</h2>
            <p className="text-slate-400 text-sm">Manage attack simulation execution and monitoring</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${
            isRunning ? 'bg-green-400 animate-pulse' :
            simulationState.eventsGenerated > 0 ? 'bg-blue-400' :
            'bg-slate-400'
          }`} />
          <span className={`text-sm font-medium ${
            isRunning ? 'text-green-400' :
            simulationState.eventsGenerated > 0 ? 'text-blue-400' :
            'text-slate-400'
          }`}>
            {isRunning ? 'RUNNING' :
             simulationState.eventsGenerated > 0 ? 'COMPLETED' :
             'READY'}
          </span>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.button
          whileHover={{ scale: !disabled && !isRunning ? 1.02 : 1 }}
          whileTap={{ scale: !disabled && !isRunning ? 0.98 : 1 }}
          onClick={onStart}
          disabled={disabled || isRunning || !selectedScenario}
          className={`flex flex-col items-center space-y-2 p-4 rounded-lg border transition-all ${
            disabled || isRunning || !selectedScenario
              ? 'bg-slate-800/50 border-slate-600/50 text-slate-500 cursor-not-allowed'
              : 'bg-green-500/20 border-green-500/30 text-green-400 hover:bg-green-500/30 hover:border-green-500/50'
          }`}
        >
          <Play className="w-6 h-6" />
          <span className="text-sm font-semibold">Start</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: isRunning ? 1.02 : 1 }}
          whileTap={{ scale: isRunning ? 0.98 : 1 }}
          onClick={onStop}
          disabled={!isRunning}
          className={`flex flex-col items-center space-y-2 p-4 rounded-lg border transition-all ${
            !isRunning
              ? 'bg-slate-800/50 border-slate-600/50 text-slate-500 cursor-not-allowed'
              : 'bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30 hover:border-red-500/50'
          }`}
        >
          <Square className="w-6 h-6" />
          <span className="text-sm font-semibold">Stop</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onReset}
          disabled={isRunning}
          className={`flex flex-col items-center space-y-2 p-4 rounded-lg border transition-all ${
            isRunning
              ? 'bg-slate-800/50 border-slate-600/50 text-slate-500 cursor-not-allowed'
              : 'bg-blue-500/20 border-blue-500/30 text-blue-400 hover:bg-blue-500/30 hover:border-blue-500/50'
          }`}
        >
          <RotateCcw className="w-6 h-6" />
          <span className="text-sm font-semibold">Reset</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={true}
          className="flex flex-col items-center space-y-2 p-4 rounded-lg border border-slate-600/50 bg-slate-800/50 text-slate-500 cursor-not-allowed"
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-sm font-semibold">Export</span>
        </motion.button>
      </div>

      {/* Scenario Preview */}
      {selectedScenario && (
        <div className="mb-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white capitalize">
              {selectedScenario.replace('_', ' ')} Scenario
            </h3>
            <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-xs rounded-full font-semibold">
              {stats.duration}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{stats.events}</div>
              <div className="text-slate-400">Events</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{stats.alerts}</div>
              <div className="text-slate-400">Alerts</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{stats.incidents}</div>
              <div className="text-slate-400">Incidents</div>
            </div>
          </div>
        </div>
      )}

      {/* Live Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="text-xs text-slate-400">Events</span>
          </div>
          <div className="text-2xl font-bold text-white">{simulationState.eventsGenerated}</div>
          <div className="text-xs text-slate-400">
            {selectedScenario ? `Expected: ${stats.events}` : 'Select scenario'}
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <span className="text-xs text-slate-400">Alerts</span>
          </div>
          <div className="text-2xl font-bold text-white">{simulationState.alertsTriggered}</div>
          <div className="text-xs text-slate-400">
            {selectedScenario ? `Expected: ${stats.alerts}` : 'Select scenario'}
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <Shield className="w-5 h-5 text-red-400" />
            <span className="text-xs text-slate-400">Incidents</span>
          </div>
          <div className="text-2xl font-bold text-white">{simulationState.incidentsCreated}</div>
          <div className="text-xs text-slate-400">
            {selectedScenario ? `Expected: ${stats.incidents}` : 'Select scenario'}
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-5 h-5 text-green-400" />
            <span className="text-xs text-slate-400">Responses</span>
          </div>
          <div className="text-2xl font-bold text-white">{simulationState.responsesExecuted}</div>
          <div className="text-xs text-slate-400">Actions taken</div>
        </div>
      </div>

      {/* Simulation Status */}
      {(simulationState.eventsGenerated > 0 || isRunning) && (
        <div className="mt-6 p-4 bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-white">Simulation Status</h4>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <span className="text-xs text-green-400">All systems operational</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">SIEM Engine:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Response Engine:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">AI Assistant:</span>
              <span className="text-green-400">Active</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Audit Logging:</span>
              <span className="text-green-400">Active</span>
            </div>
          </div>
        </div>
      )}

      {/* Safety Warning */}
      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-yellow-400 mb-1">Simulation Safety Notice</h4>
            <p className="text-xs text-yellow-300 leading-relaxed">
              This simulation mode is completely isolated and does not affect production systems or real security data.
              All generated events are marked as simulation data and automatically cleaned up upon reset.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SimulationControls
