import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Shield,
  Eye,
  Download,
  Filter,
  Calendar,
  PieChart,
  Activity,
  Target,
  Zap
} from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ScatterChart,
  Scatter,
  AreaChart,
  Area
} from 'recharts';
import {
  threatAPI,
  generateReport,
} from '../lib/api.js';

const ReportSection = ({ title, children, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    <div className="flex items-center space-x-3 mb-6">
      <Icon className="w-6 h-6 text-cyan-400" />
      <h2 className="text-2xl font-bold text-white">{title}</h2>
    </div>
    {children}
  </motion.div>
);

function Reports() {
  const [analytics, setAnalytics] = useState({
    threatTrends: [
      { date: '2025-01-01', incidents: 12, threats: 8 },
      { date: '2025-01-02', incidents: 15, threats: 12 },
      { date: '2025-01-03', incidents: 8, threats: 6 },
      { date: '2025-01-04', incidents: 22, threats: 18 },
      { date: '2025-01-05', incidents: 18, threats: 15 },
      { date: '2025-01-06', incidents: 25, threats: 20 },
      { date: '2025-01-07', incidents: 28, threats: 24 }
    ],
    behaviorSummary: {
      unusualLogins: 14,
      riskyDevices: 7,
      locationChanges: 23,
      privilegeEscalations: 3,
      anomalyScore: 68
    },
    predictions: { riskScore: 72 },
    attackTypes: [
      { type: 'Phishing', likelihood: 85 },
      { type: 'Malware', likelihood: 72 },
      { type: 'Ransomware', likelihood: 68 },
      { type: 'DDoS', likelihood: 55 },
      { type: 'Zero Days', likelihood: 45 }
    ],
    complianceData: [
      { name: 'SOC 2', compliance: 85 },
      { name: 'GDPR', compliance: 78 },
      { name: 'HIPAA', compliance: 92 },
      { name: 'PCI DSS', compliance: 67 }
    ],
    incidents: { totalIncidents: 28 },
    generatingReport: false
  });
  const [filters, setFilters] = useState({
    timeRange: '7d',
    severity: 'all',
    category: 'all'
  });
  const [insights, setInsights] = useState([
    "Recent uptick in credential-based attacks requires enhanced MFA adoption",
    "Compliance gaps in cloud security controls need immediate attention",
    "Predictive models indicate increased phishing campaign activity",
    "Behavioral analytics show 15% increase in insider threat indicators",
    "Incident response times improved 23% with automated playbooks",
    "Network segmentation could prevent 40% of lateral movement attacks",
    "Zero-trust implementation recommended for remote workforce security"
  ]);

  useEffect(() => {
    loadAnalytics();
  }, [filters]);

  const loadAnalytics = async () => {
    // For now, using static data to ensure the component loads
    // In production, this would load real data from APIs
    console.log('Loading analytics data...');
  };

  const handleGenerateReport = async () => {
    setAnalytics(prev => ({ ...prev, generatingReport: true }));
    try {
      const reportData = {
        type: 'Analytics & Insights Report',
        timeRange: filters.timeRange,
        includeCharts: true,
        includeRecommendations: true,
        data: analytics
      };

      const response = await generateReport(reportData);
      // Create download link
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataBlob = new Blob([dataStr], {type:'application/json'});
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `security-analytics-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      setAnalytics(prev => ({ ...prev, generatingReport: false }));
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return '#ef4444';
      case 'high': return '#f97316';
      case 'medium': return '#eab308';
      case 'low': return '#22c55e';
      default: return '#6b7280';
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-cyan-400" />
            <h1 className="text-4xl font-bold neon-text">Analytics & Insights</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="secondary"
              onClick={handleGenerateReport}
              disabled={analytics.generatingReport}
              className="flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              {analytics.generatingReport ? 'Generating...' : 'Export Report'}
            </Button>
          </div>
        </motion.div>
        <p className="text-slate-400 mb-8">Enterprise-grade security analytics and AI-driven insights</p>

        {/* Filters */}
        <Card className="mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-slate-400" />
            <span className="text-white font-medium">Filters:</span>
            <select
              value={filters.timeRange}
              onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
              className="bg-slate-800 border border-slate-600 rounded px-3 py-1 text-white"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
            </select>
          </div>
        </Card>

        {/* Executive Summary Dashboard */}
        <ReportSection title="Executive Security Dashboard" icon={Target}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {analytics.incidents && (
              <Card className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">{analytics.incidents.totalIncidents || 0}</div>
                <p className="text-sm text-slate-400">Total Incidents</p>
              </Card>
            )}
            {analytics.behaviorSummary && (
              <Card className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{analytics.behaviorSummary.unusualLogins || 0}</div>
                <p className="text-sm text-slate-400">Unusual Activities</p>
              </Card>
            )}
            {analytics.predictions && (
              <Card className="text-center">
                <div className="text-3xl font-bold text-cyan-400 mb-2">{analytics.predictions.riskScore || 68}</div>
                <p className="text-sm text-slate-400">Risk Score</p>
              </Card>
            )}
            {analytics.complianceData.length > 0 && (
              <Card className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">
                  {Math.round((analytics.complianceData.filter(f => f.compliance > 80).length / analytics.complianceData.length) * 100)}%
                </div>
                <p className="text-sm text-slate-400">Compliance Rate</p>
              </Card>
            )}
          </div>

          {/* Trend Chart */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">Security Event Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={analytics.threatTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '6px'
                  }}
                />
                <Area dataKey="incidents" stroke="#8b5cf6" fill="rgba(139, 92, 246, 0.3)" />
                <Area dataKey="threats" stroke="#ef4444" fill="rgba(239, 68, 68, 0.3)" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </ReportSection>

        {/* Predictive Analytics */}
        <ReportSection title="Predictive Threat Intelligence" icon={Zap}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Attack Type Predictions</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={analytics.attackTypes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="type" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Bar dataKey="likelihood" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Risk Vector Analysis</h3>
              <div className="space-y-3">
                {analytics.attackTypes.slice(0, 5).map((attack, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-slate-300">{attack.type}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-20 bg-slate-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-yellow-500 to-red-500 h-2 rounded-full"
                          style={{ width: `${attack.likelihood}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-400 w-10">{attack.likelihood}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ReportSection>

        {/* Compliance Analytics */}
        <ReportSection title="Compliance Intelligence" icon={Shield}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Framework Compliance Scores</h3>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsPieChart>
                  <Pie
                    data={analytics.complianceData.map(f => ({ name: f.name, value: f.compliance }))}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {analytics.complianceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Gaps</h3>
              <div className="space-y-3">
                {analytics.complianceData.map((framework, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-white font-medium">{framework.name}</span>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            framework.compliance > 80 ? 'bg-green-500' :
                            framework.compliance > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${framework.compliance}%` }}
                        />
                      </div>
                      <span className={`text-sm font-semibold ${
                        framework.compliance > 80 ? 'text-green-400' :
                        framework.compliance > 60 ? 'text-yellow-400' : 'text-red-400'
                      }`}>
                        {framework.compliance}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </ReportSection>

        {/* Behavior Intelligence */}
        <ReportSection title="Behavioral Intelligence" icon={Activity}>
          {analytics.behaviorSummary && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="text-center">
                <div className="text-2xl font-bold text-purple-400 mb-1">
                  {analytics.behaviorSummary.privilegeEscalations || 0}
                </div>
                <p className="text-xs text-slate-400">Privilege Escalations</p>
              </Card>
              <Card className="text-center">
                <div className="text-2xl font-bold text-red-400 mb-1">
                  {analytics.behaviorSummary.riskyDevices || 0}
                </div>
                <p className="text-xs text-slate-400">Risky Devices</p>
              </Card>
              <Card className="text-center">
                <div className="text-2xl font-bold text-green-400 mb-1">
                  {analytics.behaviorSummary.locationChanges || 0}
                </div>
                <p className="text-xs text-slate-400">Location Changes</p>
              </Card>
              <Card className="text-center">
                <div className="text-2xl font-bold text-cyan-400 mb-1">
                  {analytics.behaviorSummary.anomalyScore || 42}
                </div>
                <p className="text-xs text-slate-400">Anomaly Score</p>
              </Card>
            </div>
          )}
        </ReportSection>

        {/* AI-Generated Insights */}
        <ReportSection title="Executive Insights" icon={Eye}>
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4">AI-Generated Strategic Insights</h3>
            <div className="space-y-4">
              {insights.map((insight, index) => (
                <div key={index} className="flex items-start space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700/50">
                  <div className="w-8 h-8 bg-cyan-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Eye className="w-4 h-4 text-cyan-400" />
                  </div>
                  <p className="text-slate-300 leading-relaxed">{insight}</p>
                </div>
              ))}
            </div>
          </Card>
        </ReportSection>

        {/* Advanced Visualizations */}
        <ReportSection title="Advanced Analytics" icon={PieChart}>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Multi-Dimensional Risk Radar</h3>
              <ResponsiveContainer width="100%" height={300}>
                <RadarChart data={[
                  { subject: 'Network', A: 85, fullMark: 100 },
                  { subject: 'Data', A: 72, fullMark: 100 },
                  { subject: 'Endpoints', A: 78, fullMark: 100 },
                  { subject: 'Identity', A: 90, fullMark: 100 },
                  { subject: 'Compliance', A: 65, fullMark: 100 },
                  { subject: 'Operations', A: 88, fullMark: 100 },
                ]}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#9ca3af', fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
                  <Radar
                    name="Risk Score"
                    dataKey="A"
                    stroke="#8b5cf6"
                    fill="rgba(139, 92, 246, 0.3)"
                    fillOpacity={0.6}
                  />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>

            <Card>
              <h3 className="text-lg font-semibold text-white mb-4">Threat Intelligence Scatter</h3>
              <ResponsiveContainer width="100%" height={300}>
                <ScatterChart data={[
                  { x: 100, y: 200, z: 200 },
                  { x: 120, y: 100, z: 260 },
                  { x: 170, y: 300, z: 400 },
                  { x: 140, y: 250, z: 280 },
                  { x: 150, y: 400, z: 500 },
                  { x: 110, y: 280, z: 200 },
                ]}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" dataKey="x" name="Severity" stroke="#9ca3af" />
                  <YAxis type="number" dataKey="y" name="Impact" stroke="#9ca3af" />
                  <Tooltip
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Scatter name="Threats" dataKey="z" fill="#ef4444" />
                </ScatterChart>
              </ResponsiveContainer>
            </Card>
          </div>
        </ReportSection>
      </div>
    </div>
  );
}

export default Reports;
