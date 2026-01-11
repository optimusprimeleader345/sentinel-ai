import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Settings,
  Bell,
  CheckCircle,
  AlertTriangle,
  Target,
  BarChart3,
  PieChart,
  FileText,
  Users,
  Clock,
  Award,
  Filter,
  Search,
  Eye,
  Zap,
  Activity,
  Calendar,
  ChevronRight,
  Star,
  Layers,
  Gauge
} from 'lucide-react';

const SecurityScore = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Security score data
  const [scoreData] = useState({
    currentScore: 94,
    previousScore: 91,
    trend: 'up',
    changePercent: '+3.3%',
    grade: 'Excellent',
    lastUpdated: '2025-12-24 11:45:23'
  });

  // Score breakdown by category
  const [scoreBreakdown] = useState([
    {
      category: 'Network Security',
      score: 96,
      weight: 25,
      trend: 'up',
      change: '+2.1%',
      status: 'Excellent',
      color: 'green'
    },
    {
      category: 'Endpoint Protection',
      score: 92,
      weight: 20,
      trend: 'up',
      change: '+1.8%',
      status: 'Good',
      color: 'green'
    },
    {
      category: 'Data Protection',
      score: 89,
      weight: 20,
      trend: 'stable',
      change: '+0.5%',
      status: 'Good',
      color: 'yellow'
    },
    {
      category: 'Identity Management',
      score: 95,
      weight: 15,
      trend: 'up',
      change: '+4.2%',
      status: 'Excellent',
      color: 'green'
    },
    {
      category: 'Compliance',
      score: 98,
      weight: 10,
      trend: 'up',
      change: '+1.0%',
      status: 'Excellent',
      color: 'green'
    },
    {
      category: 'Incident Response',
      score: 91,
      weight: 10,
      trend: 'up',
      change: '+2.5%',
      status: 'Good',
      color: 'green'
    }
  ]);

  // Risk assessment data
  const [riskAssessment] = useState({
    overallRisk: 'Low',
    riskScore: 23,
    criticalVulnerabilities: 0,
    highRiskItems: 5,
    mediumRiskItems: 12,
    lowRiskItems: 28
  });

  // Industry benchmarks
  const [benchmarks] = useState([
    { industry: 'Financial Services', average: 89, percentile: 78, status: 'Above Average' },
    { industry: 'Healthcare', average: 91, percentile: 82, status: 'Above Average' },
    { industry: 'Technology', average: 87, percentile: 85, status: 'Above Average' },
    { industry: 'Retail', average: 85, percentile: 88, status: 'Above Average' },
    { industry: 'Manufacturing', average: 83, percentile: 91, status: 'Excellent' }
  ]);

  // Recommendations
  const [recommendations] = useState([
    {
      id: 1,
      title: 'Implement Multi-Factor Authentication',
      description: 'Add MFA to all user accounts to prevent unauthorized access',
      priority: 'High',
      impact: 'High',
      effort: 'Medium',
      category: 'Identity Management',
      estimatedTime: '2 weeks',
      cost: '$15,000'
    },
    {
      id: 2,
      title: 'Upgrade Endpoint Detection',
      description: 'Deploy advanced EDR solution across all endpoints',
      priority: 'High',
      impact: 'High',
      effort: 'High',
      category: 'Endpoint Protection',
      estimatedTime: '4 weeks',
      cost: '$45,000'
    },
    {
      id: 3,
      title: 'Enhance Network Segmentation',
      description: 'Implement zero-trust network architecture',
      priority: 'Medium',
      impact: 'Medium',
      effort: 'High',
      category: 'Network Security',
      estimatedTime: '6 weeks',
      cost: '$30,000'
    },
    {
      id: 4,
      title: 'Regular Security Training',
      description: 'Conduct quarterly security awareness training',
      priority: 'Medium',
      impact: 'Medium',
      effort: 'Low',
      category: 'Human Factors',
      estimatedTime: '1 week',
      cost: '$5,000'
    }
  ]);

  // Score history data
  const [scoreHistory] = useState([
    { date: '2025-12-24', score: 94, grade: 'Excellent' },
    { date: '2025-12-17', score: 91, grade: 'Good' },
    { date: '2025-12-10', score: 89, grade: 'Good' },
    { date: '2025-12-03', score: 87, grade: 'Good' },
    { date: '2025-11-26', score: 85, grade: 'Fair' },
    { date: '2025-11-19', score: 83, grade: 'Fair' }
  ]);

  // Score simulator data
  const [simulatorData, setSimulatorData] = useState({
    currentScore: 94,
    simulatedScore: 94,
    improvements: {
      mfa: { enabled: false, impact: 5 },
      edr: { enabled: false, impact: 8 },
      network: { enabled: false, impact: 6 },
      training: { enabled: false, impact: 3 }
    }
  });

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  const calculateSimulatedScore = (improvements) => {
    let simulatedScore = 94;
    if (improvements.mfa.enabled) simulatedScore += improvements.mfa.impact;
    if (improvements.edr.enabled) simulatedScore += improvements.edr.impact;
    if (improvements.network.enabled) simulatedScore += improvements.network.impact;
    if (improvements.training.enabled) simulatedScore += improvements.training.impact;
    return Math.min(simulatedScore, 100);
  };

  const handleImprovementToggle = (improvement) => {
    const newImprovements = {
      ...simulatorData.improvements,
      [improvement]: {
        ...simulatorData.improvements[improvement],
        enabled: !simulatorData.improvements[improvement].enabled
      }
    };
    const simulatedScore = calculateSimulatedScore(newImprovements);
    setSimulatorData({
      ...simulatorData,
      improvements: newImprovements,
      simulatedScore
    });
  };

  const filteredRecommendations = recommendations.filter(rec =>
    rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rec.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Security Score Analytics
            </h1>
            <p className="text-slate-400 text-sm">Comprehensive security posture assessment and improvement planning</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Critical Alerts Indicator */}
          <div className="relative">
            <Bell className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{riskAssessment.criticalVulnerabilities}</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-blue-500/50 transition-all duration-200 flex items-center space-x-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </motion.div>

      {/* View Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800/50 p-1 rounded-lg">
        {[
          { id: 'overview', label: 'Overview', icon: Target },
          { id: 'breakdown', label: 'Score Details', icon: BarChart3 },
          { id: 'trends', label: 'Trends', icon: TrendingUp },
          { id: 'recommendations', label: 'Recommendations', icon: CheckCircle },
          { id: 'simulator', label: 'Score Simulator', icon: Zap },
          { id: 'benchmarks', label: 'Benchmarks', icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Overview Tab */}
      {selectedView === 'overview' && (
        <div className="space-y-8">
          {/* Score Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Current Score',
                value: `${scoreData.currentScore}/100`,
                change: scoreData.changePercent,
                trend: scoreData.trend,
                icon: Gauge,
                color: 'pink'
              },
              {
                title: 'Grade',
                value: scoreData.grade,
                change: 'Top 15%',
                trend: 'up',
                icon: Award,
                color: 'purple'
              },
              {
                title: 'Risk Level',
                value: riskAssessment.overallRisk,
                change: `${riskAssessment.riskScore}/100`,
                trend: 'down',
                icon: Shield,
                color: 'green'
              },
              {
                title: 'Last Updated',
                value: '2 min ago',
                change: scoreData.lastUpdated,
                trend: 'stable',
                icon: Clock,
                color: 'blue'
              }
            ].map((metric, index) => (
              <motion.div
                key={metric.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 bg-${metric.color}-500/20 rounded-lg`}>
                      <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                    </div>
                    <div className="flex items-center space-x-1">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="w-3 h-3 text-green-400" />
                      ) : metric.trend === 'down' ? (
                        <TrendingDown className="w-3 h-3 text-red-400" />
                      ) : null}
                      <span className={`text-xs ${metric.trend === 'up' ? 'text-green-400' : metric.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
                  <div className="text-sm text-slate-400">{metric.title}</div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Risk Assessment Summary */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <AlertTriangle className="w-6 h-6 text-orange-400" />
                <span>Risk Assessment Summary</span>
              </h2>
              <span className="text-xs text-slate-400">Updated in real-time</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400 mb-2">{riskAssessment.overallRisk}</div>
                <div className="text-slate-400 text-sm">Overall Risk Level</div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">{riskAssessment.criticalVulnerabilities}</div>
                <div className="text-slate-400 text-sm">Critical Issues</div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400 mb-2">{riskAssessment.highRiskItems}</div>
                <div className="text-slate-400 text-sm">High Risk Items</div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400 mb-2">{riskAssessment.mediumRiskItems}</div>
                <div className="text-slate-400 text-sm">Medium Risk Items</div>
                <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Score Breakdown Tab */}
      {selectedView === 'breakdown' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <span>Security Score Breakdown</span>
              </h2>
              <span className="text-xs text-slate-400">Weighted by business impact</span>
            </div>
            <div className="space-y-4">
              {scoreBreakdown.map((category, index) => (
                <div key={category.category} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{category.category}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        category.status === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                        category.status === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {category.status}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-400 text-sm">{category.weight}% weight</span>
                      <div className="flex items-center space-x-1">
                        {category.trend === 'up' ? (
                          <TrendingUp className="w-3 h-3 text-green-400" />
                        ) : category.trend === 'down' ? (
                          <TrendingDown className="w-3 h-3 text-red-400" />
                        ) : null}
                        <span className={`text-sm font-semibold ${category.trend === 'up' ? 'text-green-400' : category.trend === 'down' ? 'text-red-400' : 'text-gray-400'}`}>
                          {category.change}
                        </span>
                      </div>
                      <span className="text-white font-bold text-lg">{category.score}/100</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${
                        category.score >= 90 ? 'bg-green-500' :
                        category.score >= 80 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Trends Tab */}
      {selectedView === 'trends' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-cyan-400" />
                <span>Score Trends & Analytics</span>
              </h2>
              <div className="flex items-center space-x-2">
                <select className="px-3 py-1 bg-slate-800/50 border border-slate-600/50 rounded text-slate-300 text-sm">
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                  <option>Last 6 Months</option>
                  <option>Last Year</option>
                </select>
              </div>
            </div>
            <div className="h-64 bg-slate-800/30 rounded-lg flex items-center justify-center">
              <div className="text-center text-slate-400">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Interactive Score Trend Chart</p>
                <p className="text-sm">Historical data visualization</p>
              </div>
            </div>
          </Card>

          {/* Historical Scores Table */}
          <Card>
            <h3 className="text-lg font-bold text-white mb-4">Historical Scores</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Date</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Score</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Grade</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreHistory.map((entry, index) => (
                    <tr key={entry.date} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                      <td className="py-3 px-4 text-slate-300">{entry.date}</td>
                      <td className="py-3 px-4">
                        <span className="text-white font-semibold">{entry.score}/100</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          entry.grade === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                          entry.grade === 'Good' ? 'bg-blue-500/20 text-blue-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {entry.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {index > 0 && (
                          <span className={`flex items-center space-x-1 ${
                            entry.score > scoreHistory[index - 1].score ? 'text-green-400' :
                            entry.score < scoreHistory[index - 1].score ? 'text-red-400' :
                            'text-gray-400'
                          }`}>
                            {entry.score > scoreHistory[index - 1].score ? (
                              <TrendingUp className="w-3 h-3" />
                            ) : entry.score < scoreHistory[index - 1].score ? (
                              <TrendingDown className="w-3 h-3" />
                            ) : null}
                            <span className="text-xs">
                              {entry.score > scoreHistory[index - 1].score ? '+' : ''}
                              {entry.score - scoreHistory[index - 1].score}
                            </span>
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Recommendations Tab */}
      {selectedView === 'recommendations' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search recommendations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/25"
              />
            </div>
            <select className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-blue-400">
              <option>All Priorities</option>
              <option>High Priority</option>
              <option>Medium Priority</option>
              <option>Low Priority</option>
            </select>
          </div>

          {/* Recommendations Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredRecommendations.map((rec, index) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-2">{rec.title}</h3>
                      <p className="text-slate-400 text-sm mb-3">{rec.description}</p>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          rec.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                          rec.priority === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {rec.priority} Priority
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 text-xs">{rec.category}</span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className="text-2xl font-bold text-cyan-400 mb-1">{rec.impact === 'High' ? 'A' : rec.impact === 'Medium' ? 'B' : 'C'}</div>
                      <div className="text-xs text-slate-400">Impact</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-400">Effort: <span className={`font-semibold ${
                        rec.effort === 'Low' ? 'text-green-400' :
                        rec.effort === 'Medium' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>{rec.effort}</span></span>
                      <span className="text-slate-400">Time: <span className="text-white font-semibold">{rec.estimatedTime}</span></span>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-400 font-bold">{rec.cost}</div>
                      <div className="text-xs text-slate-400">Estimated Cost</div>
                    </div>
                  </div>

                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium hover:bg-blue-500/30 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 px-3 py-2 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm font-medium hover:bg-cyan-500/30 transition-colors">
                      Implement
                    </button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Score Simulator Tab */}
      {selectedView === 'simulator' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Zap className="w-6 h-6 text-yellow-400" />
                <span>Security Score Simulator</span>
              </h2>
              <span className="text-xs text-slate-400">What-if scenario analysis</span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Current vs Simulated Score */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                    {simulatorData.simulatedScore}
                  </div>
                  <div className="text-slate-400 text-sm">Simulated Score</div>
                  <div className={`text-sm font-semibold ${simulatorData.simulatedScore > scoreData.currentScore ? 'text-green-400' : 'text-red-400'}`}>
                    {simulatorData.simulatedScore > scoreData.currentScore ? '+' : ''}
                    {simulatorData.simulatedScore - scoreData.currentScore} from current ({scoreData.currentScore})
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(simulatorData.improvements).map(([key, improvement]) => (
                    <div key={key} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                      <div>
                        <div className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                        <div className="text-slate-400 text-sm">+{improvement.impact} points</div>
                      </div>
                      <button
                        onClick={() => handleImprovementToggle(key)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          improvement.enabled ? 'bg-blue-500' : 'bg-slate-600'
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full bg-white transition-transform ${
                          improvement.enabled ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Impact Visualization */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Impact Breakdown</h3>
                <div className="space-y-3">
                  {Object.entries(simulatorData.improvements)
                    .filter(([_, improvement]) => improvement.enabled)
                    .map(([key, improvement]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-400" />
                          <span className="text-white font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                        </div>
                        <span className="text-green-400 font-bold">+{improvement.impact}</span>
                      </div>
                    ))}
                </div>

                {Object.values(simulatorData.improvements).some(i => i.enabled) && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-lg border border-blue-500/30">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">
                        {Object.values(simulatorData.improvements).filter(i => i.enabled).reduce((sum, i) => sum + i.impact, 0)} Point Improvement
                      </div>
                      <div className="text-slate-400 text-sm">Total potential score increase</div>
                      <button className="mt-3 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white font-semibold hover:from-blue-600 hover:to-cyan-600 transition-colors">
                        Generate Implementation Plan
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Benchmarks Tab */}
      {selectedView === 'benchmarks' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Users className="w-6 h-6 text-indigo-400" />
                <span>Industry Benchmarks & Comparisons</span>
              </h2>
              <span className="text-xs text-slate-400">Anonymous peer comparisons</span>
            </div>

            <div className="space-y-4">
              {benchmarks.map((benchmark, index) => (
                <div key={benchmark.industry} className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <span className="text-white font-medium">{benchmark.industry}</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        benchmark.status === 'Excellent' ? 'bg-green-500/20 text-green-400' :
                        benchmark.status === 'Above Average' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {benchmark.status}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-cyan-400">{benchmark.percentile}th</div>
                      <div className="text-xs text-slate-400">Percentile Rank</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-400">Industry Avg: <span className="text-white font-semibold">{benchmark.average}</span></span>
                      <span className="text-slate-400">Your Score: <span className="text-blue-400 font-semibold">{scoreData.currentScore}</span></span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {benchmark.percentile >= 75 ? (
                        <Star className="w-4 h-4 text-yellow-400" />
                      ) : benchmark.percentile >= 50 ? (
                        <TrendingUp className="w-4 h-4 text-blue-400" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-xs font-semibold ${
                        benchmark.percentile >= 75 ? 'text-yellow-400' :
                        benchmark.percentile >= 50 ? 'text-blue-400' :
                        'text-red-400'
                      }`}>
                        {benchmark.percentile >= 75 ? 'Top Performer' :
                         benchmark.percentile >= 50 ? 'Above Average' :
                         'Needs Improvement'}
                      </span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                      style={{ width: `${benchmark.percentile}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Export & Reporting */}
          <Card>
            <h3 className="text-lg font-bold text-white mb-4 flex items-center space-x-3">
              <Download className="w-5 h-5 text-green-400" />
              <span>Reports & Exports</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-green-500/50 transition-colors text-left">
                <FileText className="w-6 h-6 text-green-400 mb-2" />
                <div className="text-white font-semibold">Executive Summary</div>
                <div className="text-slate-400 text-sm">PDF Report</div>
              </button>
              <button className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-blue-500/50 transition-colors text-left">
                <BarChart3 className="w-6 h-6 text-blue-400 mb-2" />
                <div className="text-white font-semibold">Detailed Analytics</div>
                <div className="text-slate-400 text-sm">Excel Export</div>
              </button>
              <button className="p-4 bg-slate-800/50 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-colors text-left">
                <Settings className="w-6 h-6 text-purple-400 mb-2" />
                <div className="text-white font-semibold">Compliance Report</div>
                <div className="text-slate-400 text-sm">Regulatory Format</div>
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SecurityScore;
