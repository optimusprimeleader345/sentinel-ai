import React from 'react'
import { motion } from 'framer-motion'
import {
  Mail,
  File,
  Shield,
  Network,
  AlertTriangle,
  Target,
  Zap,
  Activity
} from 'lucide-react'

const ScenarioSelector = ({ selectedScenario, onScenarioSelect, disabled }) => {
  const scenarios = [
    {
      id: 'phishing',
      title: 'Phishing Attack',
      description: 'Email-based credential theft leading to account compromise',
      icon: Mail,
      color: 'blue',
      difficulty: 'Medium',
      stages: 4,
      estimatedTime: '8s',
      mitreTactics: ['Initial Access', 'Credential Access']
    },
    {
      id: 'malware',
      title: 'Malware Infection',
      description: 'Malicious file execution and command & control communication',
      icon: File,
      color: 'red',
      difficulty: 'High',
      stages: 4,
      estimatedTime: '12s',
      mitreTactics: ['Execution', 'Command and Control']
    },
    {
      id: 'compromise',
      title: 'Account Compromise',
      description: 'Brute force attacks and privilege escalation',
      icon: Shield,
      color: 'orange',
      difficulty: 'Medium',
      stages: 4,
      estimatedTime: '10s',
      mitreTactics: ['Credential Access', 'Privilege Escalation']
    },
    {
      id: 'multistage',
      title: 'Advanced Multi-Stage',
      description: 'Complex attack chain with lateral movement',
      icon: Network,
      color: 'purple',
      difficulty: 'Expert',
      stages: 6,
      estimatedTime: '18s',
      mitreTactics: ['Initial Access', 'Execution', 'Lateral Movement']
    }
  ]

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Medium': return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30'
      case 'Expert': return 'bg-purple-500/20 text-purple-400 border-purple-500/30'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Target className="w-6 h-6 text-cyan-400" />
        <div>
          <h2 className="text-xl font-bold text-white">Attack Scenario Selection</h2>
          <p className="text-slate-400 text-sm">Choose a realistic cyber attack scenario to simulate</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {scenarios.map((scenario, index) => {
          const Icon = scenario.icon
          const isSelected = selectedScenario === scenario.id

          return (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`relative group cursor-pointer transition-all duration-300 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={() => !disabled && onScenarioSelect(scenario.id)}
            >
              <div className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? `border-${scenario.color}-500/50 bg-${scenario.color}-500/10 shadow-lg shadow-${scenario.color}-500/20`
                  : `border-slate-600/50 bg-slate-800/30 hover:border-slate-500/50 hover:bg-slate-800/50`
              }`}>

                {/* Selection Indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  </div>
                )}

                <div className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 rounded-lg bg-${scenario.color}-500/20 border border-${scenario.color}-500/30`}>
                      <Icon className={`w-6 h-6 text-${scenario.color}-400`} />
                    </div>
                    <div className="flex flex-col items-end space-y-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(scenario.difficulty)}`}>
                        {scenario.difficulty}
                      </span>
                      <span className="text-xs text-slate-400">{scenario.estimatedTime}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">{scenario.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{scenario.description}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Activity className="w-3 h-3 text-slate-500" />
                          <span className="text-slate-400">{scenario.stages} stages</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-700/50">
                      <div className="flex flex-wrap gap-1">
                        {scenario.mitreTactics.map((tactic, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-slate-700/50 text-slate-300 text-xs rounded-md border border-slate-600/50"
                          >
                            {tactic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-${scenario.color}-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Scenario Preview */}
      {selectedScenario && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50"
        >
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-semibold text-white">Scenario Preview</span>
          </div>
          <div className="text-sm text-slate-300 space-y-1">
            <div>• Real-time event generation with realistic delays</div>
            <div>• Automatic SIEM correlation and alerting</div>
            <div>• Autonomous response engine activation</div>
            <div>• AI SOC Assistant attack analysis</div>
            <div>• Complete audit trail logging</div>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}

export default ScenarioSelector
