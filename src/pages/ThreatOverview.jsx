import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  Globe,
  Activity,
  RefreshCw,
  Search,
  Filter,
  Target,
  TrendingUp,
  TrendingDown,
  Eye,
  Settings,
  Bell,
  CheckCircle,
  X,
  MapPin,
  Clock,
  Zap,
  BarChart3,
  PieChart,
  Database
} from 'lucide-react';

const ThreatOverview = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Threat intelligence data
  const [threatMetrics] = useState([
    {
      title: 'Active Threats',
      value: '1,247',
      change: '+12',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      title: 'Critical Alerts',
      value: '23',
      change: '-3',
      trend: 'down',
      icon: Target,
      color: 'orange'
    },
    {
      title: 'Intelligence Score',
      value: '94%',
      change: '+2.1%',
      trend: 'up',
      icon: Shield,
      color: 'green'
    },
    {
      title: 'Covered Regions',
      value: '85',
      change: 'Stable',
      trend: 'stable',
      icon: Globe,
      color: 'blue'
    }
  ]);

  // Threat feed data
  const [threatFeed] = useState([
    {
      id: 'TH-001',
      type: 'APT-41 Campaign',
      severity: 'critical',
      source: 'Dark Web Intelligence',
      target: 'Financial Sector',
      status: 'active',
      timestamp: '08:45:22 IST',
      confidence: 96
    },
    {
      id: 'TH-002',
      type: 'Ransomware Activity',
      severity: 'high',
      source: 'Network Traffic',
      target: 'Healthcare Systems',
      status: 'mitigated',
      timestamp: '08:42:15 IST',
      confidence: 89
    },
    {
      id: 'TH-003',
      type: 'Phishing Campaign',
      severity: 'medium',
      source: 'Email Gateway',
      target: 'Executive Team',
      status: 'blocked',
      timestamp: '08:38:45 IST',
      confidence: 78
    },
    {
      id: 'TH-004',
      type: 'Zero-Day Exploit',
      severity: 'critical',
      source: 'Vulnerability Scan',
      target: 'Web Servers',
      status: 'investigating',
      timestamp: '08:35:12 IST',
      confidence: 94
    }
  ]);

  // Global threat regions
  const [threatRegions] = useState([
    { region: 'North America', threats: 342, severity: 'high', coverage: 98 },
    { region: 'Europe', threats: 289, severity: 'medium', coverage: 96 },
    { region: 'Asia Pacific', threats: 456, severity: 'critical', coverage: 94 },
    { region: 'Middle East', threats: 123, severity: 'medium', coverage: 92 },
    { region: 'Latin America', threats: 87, severity: 'low', coverage: 89 },
    { region: 'Africa', threats: 56, severity: 'low', coverage: 87 }
  ]);

  // Intelligence sources
  const [intelSources] = useState([
    { name: 'Dark Web Monitoring', feeds: 12, quality: 96, status: 'active' },
    { name: 'Threat Intelligence Feeds', feeds: 25, quality: 92, status: 'active' },
    { name: 'Honeypot Networks', feeds: 8, quality: 88, status: 'active' },
    { name: 'Partner Sharing', feeds: 15, quality: 94, status: 'active' }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active':
      case 'running':
        return 'text-green-400 bg-green-500/20';
      case 'mitigated':
      case 'blocked':
        return 'text-blue-400 bg-blue-500/20';
      case 'investigating':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'critical':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical':
        return 'text-red-400 border-red-500/30 bg-red-500/10';
      case 'high':
        return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
      case 'medium':
        return 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10';
      case 'low':
        return 'text-green-400 border-green-500/30 bg-green-500/10';
      default:
        return 'text-gray-400 border-gray-500/30 bg-gray-500/10';
    }
  };

  const filteredThreats = threatFeed.filter(threat =>
    threat.type.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSeverity === 'all' || threat.severity === selectedSeverity)
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-pink-900 to-slate-900 p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-500 rounded-xl shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Threat Intelligence Center
            </h1>
            <p className="text-slate-400 text-sm">Advanced threat detection and analysis platform</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Global Alert Indicator */}
          <div className="relative">
            <Bell className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{threatMetrics.reduce((sum, m) => sum + (m.title === 'Critical Alerts' ? parseInt(m.value) : 0), 0)}</span>
            </div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-pink-500/50 transition-all duration-200 flex items-center space-x-2 ${
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
          { id: 'threats', label: 'Active Threats', icon: AlertTriangle },
          { id: 'regions', label: 'Global Regions', icon: Globe },
          { id: 'intelligence', label: 'Intelligence', icon: Database },
          { id: 'analysis', label: 'Analysis', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedView(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedView === tab.id
                  ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
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
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {threatMetrics.map((metric, index) => (
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

          {/* Recent Threat Activity */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Activity className="w-6 h-6 text-red-400" />
                <span>Recent Threat Activity</span>
              </h2>
              <span className="text-xs text-slate-400">Last 10 minutes</span>
            </div>
            <div className="space-y-4">
              {threatFeed.slice(0, 5).map((threat, index) => (
                <div key={threat.id} className={`flex items-center space-x-3 p-4 rounded-lg border-l-4 ${getSeverityColor(threat.severity)}`}>
                  <div className={`w-3 h-3 rounded-full ${threat.severity === 'critical' ? 'bg-red-400' : threat.severity === 'high' ? 'bg-orange-400' : threat.severity === 'medium' ? 'bg-yellow-400' : 'bg-green-400'}`}></div>
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">{threat.type}</div>
                    <div className="text-xs text-slate-400">{threat.source} → {threat.target}</div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(threat.status)}`}>
                      {threat.status}
                    </span>
                    <span className="text-xs text-slate-500">{threat.timestamp}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Active Threats Tab */}
      {selectedView === 'threats' && (
        <div className="space-y-6">
          {/* Search and Filter Controls */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search threats..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/25"
              />
            </div>
            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/25"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          {/* Threat Table */}
          <Card>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Threat Type</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Severity</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Source</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Confidence</th>
                    <th className="text-left py-3 px-4 text-slate-300 font-medium">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredThreats.map((threat, index) => (
                    <tr key={threat.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-3">
                          <AlertTriangle className="w-5 h-5 text-slate-400" />
                          <div>
                            <div className="text-white font-medium">{threat.type}</div>
                            <div className="text-slate-400 text-xs">{threat.target}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(threat.severity)}`}>
                          {threat.severity}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-300">{threat.source}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(threat.status)}`}>
                          {threat.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-cyan-400 font-semibold">{threat.confidence}%</span>
                          <div className="w-12 bg-slate-700 rounded-full h-1">
                            <div className="h-1 bg-cyan-500 rounded-full" style={{ width: `${threat.confidence}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{threat.timestamp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

      {/* Global Regions Tab */}
      {selectedView === 'regions' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {threatRegions.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <MapPin className={`w-8 h-8 ${region.severity === 'critical' ? 'text-red-400' : region.severity === 'high' ? 'text-orange-400' : region.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'}`} />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{region.region}</h3>
                        <p className="text-xs text-slate-400">{region.threats} active threats</p>
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${region.coverage >= 95 ? 'text-green-400' : region.coverage >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {region.coverage}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Coverage:</span>
                      <span className="text-white">{region.coverage}%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Severity:</span>
                      <span className={`font-medium ${region.severity === 'critical' ? 'text-red-400' : region.severity === 'high' ? 'text-orange-400' : region.severity === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                        {region.severity}
                      </span>
                    </div>
                  </div>

                  {/* Coverage Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-4">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        region.coverage >= 95 ? 'bg-green-500' :
                        region.coverage >= 90 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${region.coverage}%` }}
                    ></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Intelligence Tab */}
      {selectedView === 'intelligence' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {intelSources.map((source, index) => (
              <motion.div
                key={source.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <Database className={`w-8 h-8 ${source.status === 'active' ? 'text-green-400' : 'text-slate-400'}`} />
                    <span className={`text-lg font-bold ${source.quality >= 95 ? 'text-green-400' : source.quality >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {source.quality}%
                    </span>
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">{source.name}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Active Feeds:</span>
                      <span className="text-white">{source.feeds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`font-medium ${source.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {source.status}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Analysis Tab */}
      {selectedView === 'analysis' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <BarChart3 className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Threat Analysis</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">Detection Rate</span>
                  <span className="text-2xl font-bold text-green-400">98.5%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">False Positives</span>
                  <span className="text-2xl font-bold text-yellow-400">2.1%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">Response Time</span>
                  <span className="text-2xl font-bold text-blue-400">1.2s</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">AI Confidence</span>
                  <span className="text-2xl font-bold text-purple-400">94.7%</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">AI Insights</h2>
              </div>
              <div className="space-y-4">
                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="text-sm text-cyan-400 font-semibold mb-2">Pattern Recognition</div>
                  <p className="text-slate-300 text-sm">Detected 15 similar attack patterns across 8 different threat actors</p>
                </div>
                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="text-sm text-cyan-400 font-semibold mb-2">Predictive Analysis</div>
                  <p className="text-slate-300 text-sm">82% likelihood of phishing campaign targeting financial sector</p>
                </div>
                <div className="p-3 bg-slate-800/30 rounded-lg">
                  <div className="text-sm text-cyan-400 font-semibold mb-2">Correlation Engine</div>
                  <p className="text-slate-300 text-sm">Linked 23 disparate events to single APT campaign</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThreatOverview;
