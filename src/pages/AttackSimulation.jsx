import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  Play,
  Shield,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  X,
  TrendingUp,
  Users,
  HardDrive,
  FileText,
  BookOpen
} from 'lucide-react'
import Button from '../components/Button'

function AttackSimulation() {
  // Mock data as specified
  const simulationScenarios = [
    "Phishing Campaign",
    "Brute Force Attack",
    "Lateral Movement",
    "Ransomware Outbreak",
    "Data Exfiltration"
  ]

  const baseKillChainStages = [
    { stage: "Reconnaissance", status: "Pending" },
    { stage: "Delivery", status: "Pending" },
    { stage: "Exploitation", status: "Pending" },
    { stage: "Installation", status: "Pending" },
    { stage: "Actions on Objectives", status: "Pending" },
  ]

  const simulationHistory = [
    {
      id: "SIM-001",
      scenario: "Phishing Campaign",
      result: "Contained",
      date: "2025-01-03",
    },
    {
      id: "SIM-002",
      scenario: "Ransomware Outbreak",
      result: "Partial Compromise",
      date: "2025-01-04",
    },
  ]

  const simulationRecommendations = [
    "Enable MFA for all external-facing accounts.",
    "Harden email filtering and anti-phishing gateway.",
    "Improve lateral movement detection with network segmentation.",
    "Deploy EDR on all endpoints for ransomware detection."
  ]

  const [selectedScenario, setSelectedScenario] = useState(simulationScenarios[0])
  const [targetConfig, setTargetConfig] = useState({
    environment: 'Production',
    vector: 'Email',
    duration: 'Medium',
    stealth: 'Medium'
  })
  const [simulationResult, setSimulationResult] = useState(null)
  const [killChainStages, setKillChainStages] = useState(baseKillChainStages)

  // Get stages based on selected scenario
  const getScenarioStages = (scenario) => {
    const stageMap = {
      "Phishing Campaign": ["Reconnaissance", "Email Delivery", "Credential Harvesting", "Account Takeover", "Lateral Movement"],
      "Brute Force Attack": ["Reconnaissance", "Credential Testing", "Account Compromise", "Privilege Escalation", "Data Access"],
      "Lateral Movement": ["Initial Access", "Credential Theft", "Network Discovery", "Privilege Escalation", "Actions on Objectives"],
      "Ransomware Outbreak": ["Initial Infection", "Encryption Process", "Ransom Demand", "Data Backup Access", "Network Propagation"],
      "Data Exfiltration": ["Initial Access", "Data Discovery", "Data Collection", "Data Exfiltration", "Coverup"]
    }
    return stageMap[scenario] || baseKillChainStages.map(s => s.stage)
  }

  const runSimulation = () => {
    const stages = getScenarioStages(selectedScenario)
    const updatedStages = stages.map(stage => ({
      stage,
      status: Math.random() > 0.5 ? (Math.random() > 0.7 ? "Blocked by SentinelAI" : "Simulated") : (Math.random() > 0.5 ? "Partially Successful" : "Simulated")
    }))

    setKillChainStages(updatedStages)

    // Mock simulation result
    const mockResult = {
      successProbability: Math.floor(Math.random() * 40) + 30, // 30-70%
      blockedStages: updatedStages.filter(s => s.status === "Blocked by SentinelAI").map(s => s.stage),
      successfulStages: updatedStages.filter(s => s.status === "Simulated").map(s => s.stage),
      partiallySuccessfulStages: updatedStages.filter(s => s.status === "Partially Successful").map(s => s.stage),
    }

    setSimulationResult(mockResult)
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Simulated':
      case 'Partially Successful':
        return <CheckCircle className="w-5 h-5 text-green-400" />
      case 'Blocked by SentinelAI':
        return <Shield className="w-5 h-5 text-blue-400" />
      default:
        return <Clock className="w-5 h-5 text-yellow-400" />
    }
  }

  const getStatusColor = (status) => {
    switch(status) {
      case 'Simulated':
        return 'bg-green-500/20 border-green-500/30 text-green-300'
      case 'Blocked by SentinelAI':
        return 'bg-blue-500/20 border-blue-500/30 text-blue-300'
      case 'Partially Successful':
        return 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
      default:
        return 'bg-slate-500/20 border-slate-500/30 text-slate-300'
    }
  }

  const getOverallOutcome = (result) => {
    if (!result) return null
    const totalStages = result.successfulStages.length + result.partiallySuccessfulStages.length + result.blockedStages.length
    const blockedPercentage = (result.blockedStages.length / totalStages) * 100

    if (blockedPercentage > 60) return { text: "Attack Contained", color: "text-green-400" }
    if (blockedPercentage > 30) return { text: "Partial Compromise", color: "text-yellow-400" }
    return { text: "Significant Compromise", color: "text-red-400" }
  }

  const outcome = getOverallOutcome(simulationResult)

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
            ATTACK SIMULATION ENGINE
          </h1>
          <p className="text-slate-400 text-lg">RED TEAM LAB — Cybersecurity Simulation Platform</p>
        </motion.div>

        {/* Scenario Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">1️⃣ Simulation Scenario Selector</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {simulationScenarios.map((scenario) => (
              <button
                key={scenario}
                onClick={() => {
                  setSelectedScenario(scenario)
                  setSimulationResult(null)
                  setKillChainStages(baseKillChainStages)
                }}
                className={`p-4 rounded-lg border transition-all ${
                  selectedScenario === scenario
                    ? 'bg-purple-500/20 border-purple-500/50 text-purple-300 shadow-[0_0_10px_rgba(139,92,246,0.3)]'
                    : 'bg-slate-800/50 border-slate-600/50 text-slate-300 hover:bg-slate-700/50'
                }`}
              >
                <div className="font-medium text-sm">{scenario}</div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Target Configuration */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">2️⃣ Target Surface Configuration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Target Environment</label>
              <select
                value={targetConfig.environment}
                onChange={(e) => setTargetConfig({...targetConfig, environment: e.target.value})}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
              >
                <option>Production</option>
                <option>Staging</option>
                <option>Test</option>
                <option>Local</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Attack Vector</label>
              <select
                value={targetConfig.vector}
                onChange={(e) => setTargetConfig({...targetConfig, vector: e.target.value})}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
              >
                <option>Email</option>
                <option>Web</option>
                <option>RDP</option>
                <option>VPN</option>
                <option>Internal</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Duration</label>
              <select
                value={targetConfig.duration}
                onChange={(e) => setTargetConfig({...targetConfig, duration: e.target.value})}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
              >
                <option>Short</option>
                <option>Medium</option>
                <option>Long</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stealth Level</label>
              <select
                value={targetConfig.stealth}
                onChange={(e) => setTargetConfig({...targetConfig, stealth: e.target.value})}
                className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-3 py-2 text-white focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Kill Chain Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <h2 className="text-xl font-semibold mb-6 text-white">3️⃣ Kill Chain / Attack Stages Timeline</h2>
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 md:space-x-4">
            {killChainStages.map((stage, index) => (
              <div key={stage.stage} className="flex flex-col items-center relative">
                <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${getStatusColor(stage.status)} shadow-[0_0_10px_rgba(139,92,246,0.2)]`}>
                  {getStatusIcon(stage.status)}
                </div>
                <div className="text-center mt-2">
                  <div className="text-xs font-medium text-slate-300">{stage.stage}</div>
                  <div className={`text-xs px-2 py-1 rounded ${getStatusColor(stage.status)} mt-1`}>
                    {stage.status}
                  </div>
                </div>
                {index < killChainStages.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-8 h-px bg-slate-600"></div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Run Simulation Button + Results */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <div className="text-center mb-6">
            <Button
              onClick={runSimulation}
              className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg px-8 py-3 font-semibold hover:opacity-80 transition hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
            >
              <Play className="w-5 h-5 mr-2" />
              Run Simulation
            </Button>
          </div>

          {simulationResult && outcome && (
            <div className="text-center">
              <div className={`text-2xl font-bold mb-2 ${outcome.color}`}>
                {outcome.text}
              </div>
              <div className="text-slate-400 mb-4">
                Success Probability: {simulationResult.successProbability}%
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                  <div className="font-semibold text-green-400 mb-1">
                    Successful: {simulationResult.successfulStages.length}
                  </div>
                  <div className="text-xs text-slate-400">
                    {simulationResult.successfulStages.join(', ')}
                  </div>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/20 rounded p-3">
                  <div className="font-semibold text-blue-400 mb-1">
                    Blocked: {simulationResult.blockedStages.length}
                  </div>
                  <div className="text-xs text-slate-400">
                    {simulationResult.blockedStages.join(', ')}
                  </div>
                </div>
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
                  <div className="font-semibold text-yellow-400 mb-1">
                    Partial: {simulationResult.partiallySuccessfulStages.length}
                  </div>
                  <div className="text-xs text-slate-400">
                    {simulationResult.partiallySuccessfulStages.join(', ')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Multi-panel layout for remaining sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Impact Assessment */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">5️⃣ Impact & Risk Assessment</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm font-medium">Business Impact:</span>
                </div>
                <div className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-sm font-semibold text-yellow-300">
                  High
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-blue-400" />
                  <span className="text-sm font-medium">Data at Risk:</span>
                </div>
                <div className="text-sm text-slate-300">Credentials, PII</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <span className="text-sm font-medium">Blast Radius:</span>
                </div>
                <div className="text-sm text-slate-300">42 users, 7 devices</div>
              </div>
            </div>
          </motion.div>

          {/* Defense Gaps & Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            <h2 className="text-xl font-semibold mb-4 text-white">6️⃣ Defense Gaps & Recommendations</h2>
            <ul className="space-y-3">
              {simulationRecommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-slate-300">{rec}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

        {/* Simulation History */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 text-slate-200 shadow-[0_0_20px_rgba(139,92,246,0.3)]"
        >
          <h2 className="text-xl font-semibold mb-4 text-white">7️⃣ Simulation History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">ID</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Scenario</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Result</th>
                  <th className="text-left py-2 px-3 text-slate-400 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {simulationHistory.map((sim) => (
                  <tr key={sim.id} className="border-b border-slate-700/20 hover:bg-slate-800/20">
                    <td className="py-3 px-3 text-slate-300">{sim.id}</td>
                    <td className="py-3 px-3 text-slate-300">{sim.scenario}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          sim.result === 'Contained'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {sim.result}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-slate-400">{sim.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default AttackSimulation
