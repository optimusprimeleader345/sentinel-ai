import { motion } from 'framer-motion'
import { useState } from 'react'
import ToggleSwitch from '../components/ToggleSwitch'
import Button from '../components/Button'
import { Play, Zap, Shield, CheckCircle, AlertTriangle, Clock, Settings } from 'lucide-react'

// Mock data for playbooks
const playbooks = [
  {
    id: "PB-001",
    name: "Account Compromise Containment",
    severity: "High",
    trigger: "Suspicious login + impossible travel",
    status: "Enabled",
  },
  {
    id: "PB-002",
    name: "Ransomware Containment",
    severity: "Critical",
    trigger: "Mass file encryption + EDR alerts",
    status: "Enabled",
  },
  {
    id: "PB-003",
    name: "Phishing Email Cleanup",
    severity: "Medium",
    trigger: "Multiple users report phishing email",
    status: "Disabled",
  },
]

// Playbook flow steps
const selectedPlaybookFlow = [
  "Detect suspicious login",
  "Notify SOC analyst on Slack",
  "Force password reset",
  "Revoke active sessions",
  "Log incident to SIEM",
]

// Trigger → Action Rules
const playbookRules = [
  {
    trigger: "Failed logins > 20 in 5 min",
    action: "Lock account + notify security",
  },
  {
    trigger: "New device + foreign IP",
    action: "Require MFA re-authentication",
  },
  {
    trigger: "Multiple antivirus detections",
    action: "Isolate endpoint from network",
  },
]

// Recent executions history
const playbookHistory = [
  {
    id: "EXEC-001",
    playbook: "Account Compromise Containment",
    result: "Completed",
    startedAt: "2025-01-03 14:22",
  },
  {
    id: "EXEC-002",
    playbook: "Phishing Email Cleanup",
    result: "Pending Approval",
    startedAt: "2025-01-04 09:10",
  },
]

function DefensePlaybooks() {
  const [selectedPlaybook, setSelectedPlaybook] = useState(playbooks[0])
  const [playbookStatuses, setPlaybookStatuses] = useState({
    "PB-001": true,
    "PB-002": true,
    "PB-003": false,
  })
  const [simulationLogs, setSimulationLogs] = useState([])
  const [requireApproval, setRequireApproval] = useState(false)
  const [autoRemediation, setAutoRemediation] = useState(false)

  const handleToggle = (playbookId) => {
    setPlaybookStatuses(prev => ({
      ...prev,
      [playbookId]: !prev[playbookId]
    }))
  }

  const simulatePlaybookRun = () => {
    const logs = [
      "[✓] Trigger detected: Suspicious login",
      "[✓] Account temporarily locked",
      "[✓] Notification sent to SOC",
      "[✓] SIEM event created",
    ]

    setSimulationLogs([])
    logs.forEach((log, index) => {
      setTimeout(() => {
        setSimulationLogs(prev => [...prev, log])
      }, index * 500)
    })
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-slate-400'
    }
  }

  const getStatusColor = (status, result) => {
    if (result) {
      switch (result.toLowerCase()) {
        case 'completed': return 'text-green-400'
        case 'pending approval': return 'text-yellow-400'
        default: return 'text-red-400'
      }
    }
    return status === 'Enabled' ? 'text-green-400' : 'text-red-400'
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Shield className="w-8 h-8 text-purple-400" />
            Autonomous Defense Playbooks (SOAR)
          </h1>
          <p className="text-slate-400">Automated incident response and security orchestration</p>
        </motion.div>

        {/* Playbook Library */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Zap className="w-5 h-5 text-purple-400" />
              Playbook Library
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {playbooks.map((playbook) => (
                <motion.div
                  key={playbook.id}
                  className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 hover:border-purple-500/50 transition-colors cursor-pointer"
                  onClick={() => setSelectedPlaybook(playbook)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-medium text-white">{playbook.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      playbookStatuses[playbook.id] ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                    }`}>
                      {playbookStatuses[playbook.id] ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Severity:</span>
                      <span className={`font-medium ${getSeverityColor(playbook.severity)}`}>
                        {playbook.severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Trigger:</span>
                      <span className="text-slate-300 text-xs">{playbook.trigger}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Button
                      size="sm"
                      variant={playbookStatuses[playbook.id] ? "secondary" : "primary"}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleToggle(playbook.id)
                      }}
                    >
                      {playbookStatuses[playbook.id] ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Playbook Flow Viewer */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Play className="w-5 h-5 text-purple-400" />
                Playbook Flow: {selectedPlaybook?.name}
              </h2>
              <div className="space-y-4">
                {selectedPlaybookFlow.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-3 bg-slate-800/30 border border-slate-600 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-3 flex-1">
                      {index > 0 && (
                        <div className="w-4 h-px bg-gradient-to-r from-purple-500 to-cyan-500"></div>
                      )}
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{step}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Trigger → Action Rules Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Settings className="w-5 h-5 text-purple-400" />
                Trigger → Action Rules
              </h2>
              <div className="space-y-4">
                {playbookRules.map((rule, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-800/30 border border-slate-600 rounded-lg"
                  >
                    <div className="space-y-2">
                      <div className="text-red-400 font-medium text-sm">Trigger:</div>
                      <div className="text-slate-300 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                        {rule.trigger}
                      </div>
                      <div className="text-green-400 font-medium text-sm mt-3">Action:</div>
                      <div className="text-slate-300 text-sm bg-green-500/10 p-2 rounded border border-green-500/20">
                        {rule.action}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Simulate Playbook Run */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <h2 className="text-xl font-bold text-white mb-6">Simulation Run</h2>
              <Button onClick={simulatePlaybookRun} className="w-full mb-4">
                Simulate Playbook Execution
              </Button>
              <div className="bg-slate-900/50 border border-slate-600 rounded-lg p-4 h-48 overflow-y-auto">
                <h3 className="text-slate-400 text-sm mb-3">Execution Logs:</h3>
                <div className="space-y-2">
                  {simulationLogs.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-green-400 text-sm font-mono"
                    >
                      {log}
                    </motion.div>
                  ))}
                  {simulationLogs.length === 0 && (
                    <div className="text-slate-500 text-sm">Click "Simulate" to run mock execution...</div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Automation Safety & Approval Gate */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
              <h2 className="text-xl font-bold text-white mb-6">Safety Controls</h2>
              <div className="space-y-6">
                <div className="bg-slate-800/30 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-medium">Require human approval before final action?</span>
                    <ToggleSwitch
                      enabled={requireApproval}
                      onChange={() => setRequireApproval(!requireApproval)}
                    />
                  </div>
                  <p className="text-slate-400 text-xs">When enabled, critical actions require analyst approval</p>
                </div>

                <div className="bg-slate-800/30 border border-slate-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-slate-300 font-medium">Auto-remediation mode?</span>
                    <ToggleSwitch
                      enabled={autoRemediation}
                      onChange={() => setAutoRemediation(!autoRemediation)}
                    />
                  </div>
                  {autoRemediation ? (
                    <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                        <p className="text-red-400 text-xs">High-risk actions will be executed automatically</p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                        <p className="text-green-400 text-xs">Analyst approval will be required</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recent Playbook Executions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" />
              Recent Playbook Executions
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-600">
                    <th className="text-left p-3 text-slate-400 font-medium">Execution ID</th>
                    <th className="text-left p-3 text-slate-400 font-medium">Playbook</th>
                    <th className="text-left p-3 text-slate-400 font-medium">Result</th>
                    <th className="text-left p-3 text-slate-400 font-medium">Started At</th>
                  </tr>
                </thead>
                <tbody>
                  {playbookHistory.map((execution) => (
                    <motion.tr
                      key={execution.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-slate-700/50 hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="p-3 text-slate-300 font-mono text-sm">{execution.id}</td>
                      <td className="p-3 text-slate-300">{execution.playbook}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          execution.result === 'Completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {execution.result}
                        </span>
                      </td>
                      <td className="p-3 text-slate-300 text-sm">{execution.startedAt}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DefensePlaybooks
