import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from '../components/admin/GlassCard'
import {
  Shield,
  AlertTriangle,
  Target,
  Activity,
  Clock,
  CheckCircle,
  Zap,
  Brain,
  Eye,
  RefreshCw,
  Play,
  Pause,
  ArrowRight,
  Search,
  BarChart3,
  Users,
  Server,
  MapPin
} from 'lucide-react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area
} from 'recharts'

// Real-time incident response data
const incidentResponseMetrics = [
  { metric: 'Active Incidents', value: 12, change: '+3', color: '#ef4444' },
  { metric: 'Response Rate', value: '94%', change: '+8%', color: '#10b981' },
  { metric: 'MTTR', value: '18 min', change: '-12 min', color: '#06b6d4' },
  { metric: 'AI Assists', value: 89, change: '+15', color: '#8b5cf6' },
]

const initialIncidents = [
  {
    id: 'INC-001',
    title: 'Suspicious Login Attempts',
    severity: 'Critical',
    status: 'Active',
    progress: 35,
    timeToResolution: '45 min',
    assignee: 'AI Response Bot',
    confidence: 92,
    timestamp: new Date().toISOString(),
    category: 'Authentication'
  },
  {
    id: 'INC-002',
    title: 'Privilege Escalation Detected',
    severity: 'High',
    status: 'Investigating',
    progress: 68,
    timeToResolution: '22 min',
    assignee: 'Soc Analyst',
    confidence: 87,
    timestamp: new Date(Date.now() - 120000).toISOString(),
    category: 'Privilege'
  },
  {
    id: 'INC-003',
    title: 'Data Exfiltration Alert',
    severity: 'High',
    status: 'Contained',
    progress: 89,
    timeToResolution: '8 min',
    assignee: 'Threat Hunter',
    confidence: 94,
    timestamp: new Date(Date.now() - 240000).toISOString(),
    category: 'Data Loss'
  },
  {
    id: 'INC-004',
    title: 'Malware Signature Match',
    severity: 'Medium',
    status: 'Resolved',
    progress: 100,
    timeToResolution: 'Complete',
    assignee: 'AI Defense Bot',
    confidence: 91,
    timestamp: new Date(Date.now() - 420000).toISOString(),
    category: 'Malware'
  }
]

const responseWorkflow = [
  {
    phase: 'Detection',
    status: 'Complete',
    duration: '2.1 min',
    actions: ['Alert triggered', 'Initial triage', 'Severity assessment'],
    confidence: 98
  },
  {
    phase: 'Analysis',
    status: 'Active',
    duration: '12.3 min',
    actions: ['Log correlation', 'Threat intelligence check', 'Pattern analysis'],
    confidence: 89
  },
  {
    phase: 'Containment',
    status: 'Pending',
    duration: '0 min',
    actions: ['Account isolation', 'Network segmentation', 'Data backup'],
    confidence: 76
  },
  {
    phase: 'Investigation',
    status: 'Queued',
    duration: '0 min',
    actions: ['Forensic analysis', 'Root cause determination', 'Evidence collection'],
    confidence: 0
  },
  {
    phase: 'Recovery',
    status: 'Queued',
    duration: '0 min',
    actions: ['System restoration', 'Credential rotation', 'Policy updates'],
    confidence: 0
  }
]

const aiInsights = [
  {
    type: 'Anomaly',
    insight: 'Login attempts from 15 different IPs in last 5 minutes',
    confidence: 94,
    impact: 'Potential brute force attack',
    recommendation: 'Enable 2FA for affected account'
  },
  {
    type: 'Pattern',
    insight: 'User behavior deviation from baseline by 67%',
    confidence: 87,
    impact: 'Insider threat possibility',
    recommendation: 'Initiate user behavior investigation'
  },
  {
    type: 'Correlation',
    insight: 'Similar attack pattern to recent industry-wide campaign',
    confidence: 91,
    impact: 'Targeted attack likelihood increased',
    recommendation: 'Escalate to security team'
  }
]

function IncidentResponse() {
  // Real-time incident data
  const [incidents, setIncidents] = useState(initialIncidents);
  const [selectedIncident, setSelectedIncident] = useState(incidents[0]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);
  const [responseMetrics, setResponseMetrics] = useState({
    activeIncidents: 12,
    responseRate: '94%',
    mttr: '18 min',
    aiAssists: 89,
    lastUpdate: new Date().toLocaleTimeString(),
    riskLevel: 'Medium'
  });

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update incident progress
      setIncidents(prev => prev.map(incident => {
        if (incident.status === 'Active' || incident.status === 'Investigating') {
          const newProgress = Math.min(100, incident.progress + Math.floor(Math.random() * 3) + 1);
          let newStatus = incident.status;
          if (newProgress >= 90 && incident.status === 'Investigating') {
            newStatus = 'Contained';
          }
          if (newProgress >= 100) {
            newStatus = 'Resolved';
          }
          return { ...incident, progress: newProgress, status: newStatus, confidence: Math.min(100, incident.confidence + Math.floor(Math.random() * 2) - 1) };
        }
        return incident;
      }));

      // Add new incidents occasionally
      if (Math.random() < 0.3) {
        const newIncident = {
          id: `INC-0${Date.now()}`,
          title: ['Unusual Network Traffic', 'Failed Authentication Spikes', 'System Resource Abuse'][Math.floor(Math.random() * 3)],
          severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)],
          status: 'Active',
          progress: 15,
          timeToResolution: `${Math.floor(Math.random() * 60) + 15} min`,
          assignee: ['AI Response Bot', 'Soc Analyst', 'Threat Hunter'][Math.floor(Math.random() * 3)],
          confidence: Math.floor(Math.random() * 30) + 75,
          timestamp: new Date().toISOString(),
          category: ['Network', 'Authentication', 'System', 'Data'][Math.floor(Math.random() * 4)]
        };
        setIncidents(prev => [newIncident, ...prev.slice(0, 14)]);
      }

      // Update metrics
      setResponseMetrics(prev => ({
        activeIncidents: prev.activeIncidents + (Math.random() > 0.7 ? 1 : 0) - (Math.random() > 0.8 ? 1 : 0),
        responseRate: `${Math.min(100, parseInt(prev.responseRate) + Math.floor(Math.random() * 2) - 1)}%`,
        mttr: `${Math.max(5, parseInt(prev.mttr.split(' ')[0]) + Math.floor(Math.random() * 4) - 2)} min`,
        aiAssists: prev.aiAssists + Math.floor(Math.random() * 2),
        lastUpdate: new Date().toLocaleTimeString(),
        riskLevel: prev.riskLevel
      }));

    }, 5000);

    return () => clearInterval(interval);
  }, [])

  const getSeverityInfo = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return { color: 'red', bgColor: 'bg-red-500/10', textColor: 'text-red-400', borderColor: 'border-red-500' };
      case 'high': return { color: 'orange', bgColor: 'bg-orange-500/10', textColor: 'text-orange-400', borderColor: 'border-orange-500' };
      case 'medium': return { color: 'yellow', bgColor: 'bg-yellow-500/10', textColor: 'text-yellow-400', borderColor: 'border-yellow-500' };
      case 'low': return { color: 'blue', bgColor: 'bg-blue-500/10', textColor: 'text-blue-400', borderColor: 'border-blue-500' };
      default: return { color: 'slate', bgColor: 'bg-slate-500/10', textColor: 'text-slate-400', borderColor: 'border-slate-500' };
    }
  };

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              AI Incident Response Hub
            </h1>
            <p className="text-slate-400 text-sm">Real-time incident detection, AI-powered investigation, and automated response orchestration</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <RefreshCw className="w-4 h-4 text-green-400 animate-spin" />
            <span className="text-xs text-slate-400">Auto-refreshing</span>
          </div>
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-sm font-bold text-white">{incidents.filter(i => i.status === 'Active' || i.status === 'Investigating').length}</span>
            <span className="text-xs text-slate-400">Active</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {incidentResponseMetrics.map((metric, index) => (
          <motion.div
            key={metric.metric}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard title={metric.metric} icon={metric.metric === 'Active Incidents' ? AlertTriangle : metric.metric === 'Response Rate' ? Activity : metric.metric === 'MTTR' ? Clock : Brain}>
              <div className="text-center">
                <div className="text-3xl font-bold" style={{ color: metric.color }}>{metric.value}</div>
                <div className="text-slate-400 text-sm mt-4">{metric.metric}</div>
                <div className={`mt-2 text-xs ${
                  metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.change} from last hour
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Response Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Active Incidents List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-2"
        >
          <GlassCard title="Active Response Cases" icon={Shield}>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {incidents.map((incident, index) => {
                const severityInfo = getSeverityInfo(incident.severity);
                return (
                  <motion.div
                    key={incident.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border-l-4 cursor-pointer hover:scale-101 transition-all ${
                      selectedIncident.id === incident.id ? `border-l-4 ${severityInfo.borderColor} bg-slate-800/50` : `border-l-4 ${severityInfo.borderColor} ${severityInfo.bgColor}`
                    }`}
                    onClick={() => setSelectedIncident(incident)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="text-white font-semibold mb-1">{incident.title}</div>
                        <div className="flex items-center space-x-4 text-sm text-slate-400">
                          <span>ID: {incident.id}</span>
                          <span>{incident.category}</span>
                          <span>{incident.assignee}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-1">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${severityInfo.bgColor} ${severityInfo.textColor}`}>
                          {incident.severity}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          incident.status === 'Resolved' ? 'bg-green-500/20 text-green-400' :
                          incident.status === 'Contained' ? 'bg-blue-500/20 text-blue-400' :
                          incident.status === 'Investigating' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {incident.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400">Progress:</span>
                        <span className="text-cyan-400 text-xs">{incident.progress}%</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-slate-400">AI Confidence:</span>
                        <span className="text-purple-400 text-xs">{incident.confidence}%</span>
                      </div>
                    </div>

                    <div className="w-full bg-slate-700 rounded-full h-2 mb-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          incident.status === 'Resolved' ? 'bg-green-500' :
                          incident.status === 'Contained' ? 'bg-blue-500' :
                          'bg-purple-500'
                        }`}
                        style={{ width: `${incident.progress}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${incident.progress}%` }}
                        transition={{ duration: 0.5 }}
                      ></motion.div>
                    </div>

                    <div className="flex justify-between text-xs text-slate-500">
                      <span>ETA: {incident.timeToResolution}</span>
                      <span>{new Date(incident.timestamp).toLocaleTimeString()}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>

        {/* Incident Details & AI Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Incident Intelligence" icon={Brain}>
            {selectedIncident ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-semibold mb-2">{selectedIncident.title}</h4>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      selectedIncident.severity === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      selectedIncident.severity === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      selectedIncident.severity === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {selectedIncident.severity} Severity
                    </span>
                    <span className="text-xs text-slate-400">ID: {selectedIncident.id}</span>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className="text-white">{selectedIncident.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assignee:</span>
                      <span className="text-white">{selectedIncident.assignee}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Category:</span>
                      <span className="text-white">{selectedIncident.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">AI Confidence:</span>
                      <span className="text-cyan-400">{selectedIncident.confidence}%</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-700/50 pt-4">
                  <h4 className="text-cyan-400 font-semibold mb-3">AI Response Recommendations</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Isolate affected system immediately</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Rotate credentials for impacted accounts</span>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Eye className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">Monitor network traffic for 24 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-8">
                <Shield className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>Select an incident to view details</p>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* Response Workflow & AI Insights */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">

        {/* AI Response Workflow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <GlassCard title="Incident Response Workflow" icon={Target}>
            <div className="space-y-4">
              {responseWorkflow.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-lg border-l-4 ${
                    phase.status === 'Complete' ? 'border-l-green-500 bg-green-500/5' :
                    phase.status === 'Active' ? 'border-l-blue-500 bg-blue-500/5' :
                    phase.status === 'Pending' ? 'border-l-yellow-500 bg-yellow-500/5' :
                    'border-l-slate-500 bg-slate-500/5'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${
                        phase.status === 'Complete' ? 'bg-green-400' :
                        phase.status === 'Active' ? 'bg-blue-400' :
                        phase.status === 'Pending' ? 'bg-yellow-400' :
                        'bg-slate-400'
                      }`}></div>
                      <span className="text-white font-semibold">{phase.phase}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      phase.status === 'Complete' ? 'bg-green-500/20 text-green-400' :
                      phase.status === 'Active' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-slate-500/20 text-slate-400'
                    }`}>
                      {phase.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-slate-400">
                    <div>Duration: {phase.duration}</div>
                    <div>Confidence: {phase.confidence}%</div>
                  </div>

                  <div className="mt-3">
                    <div className="text-xs text-slate-400 mb-2">
                      {phase.actions.length} action{phase.actions.length !== 1 ? 's' : ''} planned
                    </div>
                    <div className="space-y-1">
                      {phase.actions.slice(0, 2).map((action, actionIndex) => (
                        <div key={actionIndex} className="text-xs text-slate-300 flex items-center space-x-2">
                          <ArrowRight className="w-3 h-3 text-slate-500" />
                          <span>{action}</span>
                        </div>
                      ))}
                      {phase.actions.length > 2 && (
                        <div className="text-xs text-slate-500">
                          +{phase.actions.length - 2} more actions
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Workflow Status</span>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <span className="text-blue-400 text-sm">Active</span>
                </div>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* AI Forensic Intelligence */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="AI Investigative Insights" icon={Zap}>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {aiInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    insight.type === 'Anomaly' ? 'border-l-red-500 bg-red-500/5' :
                    insight.type === 'Pattern' ? 'border-l-blue-500 bg-blue-500/5' :
                    'border-l-purple-500 bg-purple-500/5'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <span className={`text-xs px-2 py-1 rounded font-semibold ${
                        insight.type === 'Anomaly' ? 'bg-red-500/20 text-red-400' :
                        insight.type === 'Pattern' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-purple-500/20 text-purple-400'
                      } mb-2 inline-block`}>
                        {insight.type} Detected
                      </span>
                      <p className="text-white font-medium text-sm mb-1">{insight.insight}</p>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-400">
                    <div className="flex justify-between">
                      <span>Confidence:</span>
                      <span className="text-cyan-400">{insight.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impact:</span>
                      <span className="text-slate-300">{insight.impact}</span>
                    </div>
                  </div>

                  <div className="mt-2 p-2 bg-slate-800/50 rounded text-xs text-slate-300">
                    <strong>Recommendation:</strong> {insight.recommendation}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="border-t border-slate-700/50 pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Analysis Engine:</span>
                <span className="text-green-400 flex items-center space-x-1">
                  <Zap className="w-3 h-3" />
                  <span>Real-time Processing</span>
                </span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Response Analytics Summary */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <GlassCard>
          <div className="flex items-center space-x-3 mb-4">
            <Activity className="w-6 h-6 text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Incident Response Summary</h2>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <Activity className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
              <div>
                <p className="text-slate-300 leading-relaxed">
                  <strong>AI-Powered Incident Response Orchestration:</strong> Current response operations show {responseMetrics.activeIncidents} active incidents under AI supervision with 94% response effectiveness. Machine learning models are coordinating multi-phase response workflows, automatically escalating critical findings and optimizing containment strategies. Real-time forensic analysis provides {responseMetrics.aiAssists} automated assists per hour, reducing mean time to respond by {responseMetrics.mttr} on average.

                  Continuous monitoring and adaptive response algorithms ensure comprehensive incident coverage across authentication, privilege escalation, and data exfiltration vectors with 91% confidence in automated decision-making.
                </p>
                <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400">
                  <span>• Active Workflow Orchestration: Continuous</span>
                  <span>• AI Decision Confidence: {responseMetrics.aiAssists}% Effective</span>
                  <span>• Real-time Escalation: Automated</span>
                  <span>• Forensic Analysis: Instant</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  )
}

export default IncidentResponse
