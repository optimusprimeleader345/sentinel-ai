import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  MapPin,
  Server,
  CheckCircle,
  Clock,
  Target,
  BookOpen
} from 'lucide-react';

const incidentSummary = {
  totalIncidents: 14,
  critical: 3,
  high: 4,
  medium: 5,
  low: 2,
};

const incidentTimeline = [
  {
    time: "02:14 AM",
    type: "Suspicious Login",
    detail: "Login from unknown IP",
    severity: "High",
  },
  {
    time: "02:18 AM",
    type: "Privilege Escalation",
    detail: "User escalated to admin role",
    severity: "Critical",
  },
  {
    time: "02:22 AM",
    type: "Data Exfiltration",
    detail: "Outbound traffic spikes detected",
    severity: "Critical",
  },
  {
    time: "02:30 AM",
    type: "System Alert",
    detail: "Login blocked due to policy",
    severity: "Medium",
  },
];

const selectedIncident = {
  ip: "192.168.1.44",
  location: "Singapore",
  device: "Windows-Workstation-01",
  recommendedActions: [
    "Force logout user",
    "Reset credentials",
    "Initiate malware scan",
    "Check network traffic logs"
  ]
};

const mitreMapping = [
  { event: "Privilege Escalation", tactic: "Privilege Escalation", technique: "T1068" },
  { event: "Data Exfiltration", tactic: "Exfiltration", technique: "T1041" },
];

const rootCauseInsights = [
  "Unusual login behavior triggered the initial alert.",
  "Privileges were escalated due to misconfigured IAM policy.",
  "Outbound data spikes indicate possible exfiltration.",
];

const responsePlaybook = [
  "Step 1: Disable account temporarily",
  "Step 2: Validate login history",
  "Step 3: Scan affected device",
  "Step 4: Rotate keys and passwords",
  "Step 5: Monitor traffic for 24 hours"
];

function IncidentResponse() {
  const [selectedEvent, setSelectedEvent] = useState(incidentTimeline[0]);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-500';
      case 'High': return 'bg-orange-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-blue-500';
      default: return 'bg-slate-500';
    }
  };

  const getSeverityTextColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'text-red-400';
      case 'High': return 'text-orange-400';
      case 'Medium': return 'text-yellow-400';
      case 'Low': return 'text-blue-400';
      default: return 'text-slate-400';
    }
  };

  const getSeverityBgColor = (severity) => {
    switch (severity) {
      case 'Critical': return 'bg-red-900/30';
      case 'High': return 'bg-orange-900/30';
      case 'Medium': return 'bg-yellow-900/30';
      case 'Low': return 'bg-blue-900/30';
      default: return 'bg-slate-900/30';
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Shield className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Incident Response & Forensics</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Real-time Incident Response Dashboard with AI-Powered Analysis</p>

        {/* ==========================================
            1. Incident Summary Header
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-2xl font-bold text-white mb-6">📊 Incident Summary</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{incidentSummary.totalIncidents}</div>
                <p className="text-sm text-slate-400">Total Incidents</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">{incidentSummary.critical}</div>
                <p className="text-sm text-slate-400">Critical</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{incidentSummary.high}</div>
                <p className="text-sm text-slate-400">High</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{incidentSummary.medium}</div>
                <p className="text-sm text-slate-400">Medium</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">{incidentSummary.low}</div>
                <p className="text-sm text-slate-400">Low</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* ==========================================
              2. Interactive Incident Timeline
              ========================================== */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-white mb-6">⏰ Incident Timeline</h2>
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {incidentTimeline.map((event, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center space-x-4 p-4 rounded-lg cursor-pointer transition-all hover:bg-slate-800/50 ${
                      selectedEvent === event ? 'bg-slate-800/50 border border-purple-500/30' : ''
                    }`}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full ${getSeverityColor(event.severity)} shadow-lg`}></div>
                      {index < incidentTimeline.length - 1 && (
                        <div className="w-0.5 h-12 bg-slate-600 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="text-white font-medium">{event.type}</h3>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getSeverityBgColor(event.severity)} ${getSeverityTextColor(event.severity)}`}>
                          {event.severity}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm">{event.detail}</p>
                      <p className="text-slate-500 text-xs mt-1">{event.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ==========================================
              3. Incident Details Panel
              ========================================== */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-bold text-white mb-6">🔍 Incident Details</h2>
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] p-6 space-y-6">
              <div>
                <h3 className="text-white font-semibold mb-2">{selectedEvent.type}</h3>
                <div className={`inline-block px-3 py-1 rounded text-sm font-medium ${getSeverityBgColor(selectedEvent.severity)} ${getSeverityTextColor(selectedEvent.severity)} mb-4`}>
                  {selectedEvent.severity} Priority
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Server className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">IP:</span>
                  <span className="text-white">{selectedIncident.ip}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Location:</span>
                  <span className="text-white">{selectedIncident.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Device:</span>
                  <span className="text-white">{selectedIncident.device}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Time:</span>
                  <span className="text-white">{selectedEvent.time}</span>
                </div>
              </div>

              <div>
                <h4 className="text-white font-medium mb-3 flex items-center">
                  <Target className="w-4 h-4 mr-2" />
                  Recommended Actions
                </h4>
                <div className="space-y-2">
                  {selectedIncident.recommendedActions.map((action, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      <span className="text-slate-300">{action}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ==========================================
            4. MITRE ATT&CK Mapping
            ========================================== */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6">🎯 MITRE ATT&CK Framework Mapping</h2>
          <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] p-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Event Type</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">MITRE Tactic</th>
                    <th className="text-left py-2 px-3 text-slate-400 font-medium">Technique ID</th>
                  </tr>
                </thead>
                <tbody>
                  {mitreMapping.map((mapping, index) => (
                    <tr key={index} className="border-b border-slate-700/50">
                      <td className="py-3 px-3 text-white">{mapping.event}</td>
                      <td className="py-3 px-3 text-slate-300">{mapping.tactic}</td>
                      <td className="py-3 px-3 text-cyan-400 font-mono">{mapping.technique}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* ==========================================
              5. Root Cause Analysis
              ========================================== */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
            <h2 className="text-2xl font-bold text-white mb-6">🔍 Root Cause Analysis</h2>
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] p-6">
              <div className="space-y-4">
                {rootCauseInsights.map((insight, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg"
                  >
                    <AlertTriangle className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-300">{insight}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ==========================================
              6. Suggested Response Playbook
              ========================================== */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <h2 className="text-2xl font-bold text-white mb-6">📋 Response Playbook</h2>
            <div className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] p-6">
              <div className="space-y-4">
                {responsePlaybook.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg"
                  >
                    <div className="flex items-center justify-center w-6 h-6 bg-cyan-500 rounded-full text-white text-xs font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-slate-300">{step}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default IncidentResponse;
