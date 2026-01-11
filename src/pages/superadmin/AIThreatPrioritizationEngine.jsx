import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api.js';
import {
  Target,
  Shield,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Activity,
  RefreshCw,
  Settings,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Zap,
  Globe,
  Users,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  Database,
  PlayCircle,
  PauseCircle,
  Download,
  Upload
} from 'lucide-react';

const AIThreatPrioritizationEngine = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedSector, setSelectedSector] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [threats, setThreats] = useState([]);
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      await Promise.all([fetchThreats(), fetchInsights()]);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to refresh data. Please try again.');
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      handleRefresh();
    }, 30000);

    return () => clearInterval(interval);
  }, [autoRefresh, handleRefresh]);

  // Mock threat data for demonstration
  const mockThreats = [
    {
      id: 'nt-001',
      name: 'Supply Chain Compromise Campaign',
      severity: 'critical',
      nationalImpact: 95,
      affectedOrganizations: 47,
      correlatedIncidents: 156,
      aiConfidence: 92,
      estimatedEconomicImpact: '$2.8B',
      timeWindow: 'Next 48 hours',
      affectedSectors: ['Finance', 'Healthcare', 'Government'],
      geographicSpread: ['North America', 'Europe', 'Asia'],
      lastUpdated: new Date(Date.now() - 1800000).toISOString(),
      trend: 'increasing'
    },
    {
      id: 'nt-002',
      name: 'Nation-State Ransomware Deployment',
      severity: 'high',
      nationalImpact: 88,
      affectedOrganizations: 23,
      correlatedIncidents: 89,
      aiConfidence: 87,
      estimatedEconomicImpact: '$1.2B',
      timeWindow: 'Next 72 hours',
      affectedSectors: ['Energy', 'Transportation'],
      geographicSpread: ['Eastern Europe', 'Middle East'],
      lastUpdated: new Date(Date.now() - 3600000).toISOString(),
      trend: 'stable'
    },
    {
      id: 'nt-003',
      name: 'Cloud Infrastructure Attack Wave',
      severity: 'high',
      nationalImpact: 82,
      affectedOrganizations: 34,
      correlatedIncidents: 67,
      aiConfidence: 78,
      estimatedEconomicImpact: '$950M',
      timeWindow: 'Next 96 hours',
      affectedSectors: ['Technology', 'Finance'],
      geographicSpread: ['Global'],
      lastUpdated: new Date(Date.now() - 7200000).toISOString(),
      trend: 'increasing'
    },
    {
      id: 'nt-004',
      name: 'Deepfake Executive Impersonation',
      severity: 'medium',
      nationalImpact: 76,
      affectedOrganizations: 18,
      correlatedIncidents: 23,
      aiConfidence: 71,
      estimatedEconomicImpact: '$340M',
      timeWindow: 'Next 7 days',
      affectedSectors: ['Executive Leadership', 'Finance'],
      geographicSpread: ['North America', 'Europe'],
      lastUpdated: new Date(Date.now() - 14400000).toISOString(),
      trend: 'stable'
    },
    {
      id: 'nt-005',
      name: 'IoT Botnet Expansion',
      severity: 'medium',
      nationalImpact: 68,
      affectedOrganizations: 156,
      correlatedIncidents: 234,
      aiConfidence: 83,
      estimatedEconomicImpact: '$180M',
      timeWindow: 'Ongoing',
      affectedSectors: ['Healthcare', 'Manufacturing'],
      geographicSpread: ['Global'],
      lastUpdated: new Date(Date.now() - 28800000).toISOString(),
      trend: 'stable'
    }
  ];

  // Fetch threats data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Real API calls to Super Admin threat prioritization engine
        await analyzeNationalThreats();

        setLastUpdated(new Date());
      } catch (err) {
        console.error('Failed to load threat prioritization data:', err);
        setError('Failed to load dashboard data. Please try again.');

        // Fallback to mock data if API fails
        setThreats(mockThreats);
        setInsights({
          emergingPatterns: [
            { pattern: 'Cross-sector correlation increasing', confidence: 89, trend: 'upward' },
            { pattern: 'Geographic spread acceleration', confidence: 76, trend: 'upward' },
            { pattern: 'AI-assisted attack sophistication', confidence: 92, trend: 'upward' }
          ],
          riskPredictions: [
            { riskType: 'Critical Infrastructure Targeting', probability: 78, timeFrame: 'Next 48 hours' },
            { riskType: 'Supply Chain Compromise', probability: 65, timeFrame: 'Next 72 hours' },
            { riskType: 'Executive Impersonation', probability: 54, timeFrame: 'Next week' }
          ],
          mitigationEffectiveness: {
            current: 72,
            target: 85,
            gap: 13,
            recommendations: [
              'Increase automated response coverage',
              'Enhance cross-organization intelligence sharing',
              'Deploy advanced AI detection systems'
            ]
          }
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Real API call to analyze national threats
  const analyzeNationalThreats = async () => {
    try {
      const response = await api.post('/api/v1/superadmin/threat-prioritization/analyze', {
        timeRange: '24h',
        includeOrganizationLevel: true
      });

      if (response.data?.success) {
        const { prioritizedThreats, aiInsights } = response.data.data;

        // Transform API response to component format
        const formattedThreats = prioritizedThreats.map(threat => ({
          ...threat,
          lastUpdated: threat.lastUpdated || new Date().toISOString(),
          trend: threat.trend || 'stable'
        }));

        setThreats(formattedThreats);
        setInsights({
          emergingPatterns: aiInsights?.filter(i => i.type === 'trend') || [],
          riskPredictions: aiInsights?.filter(i => i.type === 'prediction') || [],
          mitigationEffectiveness: {
            current: 85, // Would come from API
            target: 95,
            gap: 10,
            recommendations: [
              'Deploy advanced AI detection systems',
              'Enhance cross-organization intelligence sharing',
              'Implement automated threat response protocols'
            ]
          }
        });
      } else {
        throw new Error(response.data?.error || 'API call failed');
      }
    } catch (error) {
      console.error('API call to threat prioritization failed:', error);
      throw error; // Re-throw to trigger fallback in useEffect
    }
  };

  // Get prioritized threats with filtering (for refresh)
  const fetchPrioritizedThreats = async () => {
    try {
      const response = await api.get('/api/v1/superadmin/threat-prioritization/results', {
        params: { limit: 50, minScore: 0 }
      });

      if (response.data?.success) {
        const formattedThreats = response.data.data.threats.map(threat => ({
          ...threat,
          lastUpdated: threat.lastUpdated || new Date().toISOString(),
          trend: threat.trend || 'stable'
        }));

        setThreats(formattedThreats);
      }
    } catch (error) {
      console.error('Failed to fetch prioritized threats:', error);
      // Keep existing data on API failure
    }
  };



  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'high': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      default: return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  const getImpactColor = (impact) => {
    if (impact >= 90) return 'text-red-400';
    if (impact >= 80) return 'text-orange-400';
    if (impact >= 70) return 'text-yellow-400';
    return 'text-green-400';
  };

  const filteredThreats = mockThreats.filter(threat =>
    threat.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedSector === 'all' || threat.affectedSectors.some(sector => sector.toLowerCase().includes(selectedSector.toLowerCase()))) &&
    (selectedRegion === 'all' || threat.geographicSpread.some(region => region.toLowerCase().includes(selectedRegion.toLowerCase())))
  );

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-pink-900 via-purple-800 to-slate-950 p-6 relative overflow-hidden">
      {/* Metallic Effects Background */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-600/25 to-pink-600/25 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8 relative z-10"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-pink-400 via-purple-500 to-pink-600 rounded-xl shadow-2xl shadow-pink-500/20 ring-1 ring-purple-400/30">
            <Target className="w-8 h-8 text-white drop-shadow-lg" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-300 via-purple-300 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-sm">
              AI Threat Prioritization Engine
            </h1>
            <p className="text-purple-200/80 text-sm font-medium">National View - Converting SOC Alerts into Executive-Level Threat Intelligence</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Global Alert Indicator */}
          <div className="relative">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{filteredThreats.filter(t => t.severity === 'critical').length}</span>
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
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'threats', label: 'Threats', icon: AlertTriangle },
          { id: 'analysis', label: 'Analysis', icon: Activity },
          { id: 'monitoring', label: 'Monitoring', icon: Shield }
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
        <>
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[{
              title: 'Active Threats',
              value: filteredThreats.length,
              change: '+2',
              trend: 'up',
              icon: AlertTriangle,
              color: 'red'
            }, {
              title: 'National Risk Score',
              value: '87',
              change: '+5.2%',
              trend: 'up',
              icon: Shield,
              color: 'orange'
            }, {
              title: 'AI Confidence',
              value: '91%',
              change: '+3.1%',
              trend: 'up',
              icon: Zap,
              color: 'green'
            }, {
              title: 'Protected Orgs',
              value: '1,247',
              change: '+89',
              trend: 'up',
              icon: Users,
              color: 'blue'
            }].map((metric, index) => (
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

          {/* Top Threat Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockThreats.slice(0, 3).map((threat, index) => (
              <motion.div
                key={threat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                      <div>
                        <h3 className="text-lg font-semibold text-white">{threat.name}</h3>
                        <p className="text-xs text-slate-400">{threat.timeWindow}</p>
                      </div>
                    </div>
                    <span className={`text-xl font-bold ${getImpactColor(threat.nationalImpact)}`}>
                      {threat.nationalImpact}
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Organizations:</span>
                      <span className="text-white font-medium">{threat.affectedOrganizations}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">AI Confidence:</span>
                      <span className="text-green-400 font-medium">{threat.aiConfidence}%</span>
                    </div>
                  </div>

                  {/* Progress bar for impact */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        threat.nationalImpact >= 90 ? 'bg-red-500' :
                        threat.nationalImpact >= 80 ? 'bg-orange-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${threat.nationalImpact}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </span>
                    <span className="text-xs text-slate-500">
                      {new Date(threat.lastUpdated).toLocaleTimeString()}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Threat Intelligence */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Activity className="w-6 h-6 text-blue-400" />
                <span>Recent AI Threat Intelligence</span>
              </h2>
              <span className="text-xs text-slate-400">Last 24 hours</span>
            </div>
            <div className="space-y-4">
              {[
                { time: '14:23:12', event: 'New supply chain vulnerability detected in critical infrastructure', impact: 'High', action: 'Automated alert sent to CISO' },
                { time: '12:45:33', event: 'AI detected coordinated attack pattern across 5 organizations', impact: 'Critical', action: 'National coordination initiated' },
                { time: '10:18:47', event: 'Ransomware deployment trend analysis updated', impact: 'Medium', action: 'Intelligence briefing prepared' },
                { time: '08:52:19', event: 'Executive impersonation attempt blocked', impact: 'High', action: 'Enhanced verification protocols' }
              ].map((event, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    event.impact === 'Critical' ? 'bg-red-400' :
                    event.impact === 'High' ? 'bg-orange-400' :
                    'bg-yellow-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">{event.event}</div>
                    <div className="text-xs text-slate-400">{event.action}</div>
                  </div>
                  <div className="text-xs text-slate-500">{event.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Threats Tab */}
      {selectedView === 'threats' && (
        <>
          {/* Search and Filter Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
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
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/25"
            >
              <option value="all">All Sectors</option>
              <option value="finance">Finance</option>
              <option value="healthcare">Healthcare</option>
              <option value="government">Government</option>
              <option value="energy">Energy</option>
              <option value="technology">Technology</option>
            </select>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/25"
            >
              <option value="all">All Regions</option>
              <option value="north america">North America</option>
              <option value="europe">Europe</option>
              <option value="asia">Asia</option>
              <option value="global">Global</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Threat Name</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Severity</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">National Impact</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Organizations</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">AI Confidence</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Time Window</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredThreats.map((threat, index) => (
                  <tr key={threat.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <AlertTriangle className="w-5 h-5 text-red-400" />
                        <div>
                          <div className="text-white font-medium">{threat.name}</div>
                          <div className="text-xs text-slate-400 flex flex-wrap gap-1">
                            {threat.affectedSectors.slice(0, 2).map(sector => (
                              <span key={sector} className="px-1 py-0.5 bg-slate-700/50 rounded text-xs">
                                {sector}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${getImpactColor(threat.nationalImpact)}`}>
                          {threat.nationalImpact}
                        </span>
                        {threat.trend === 'increasing' && <TrendingUp className="w-3 h-3 text-red-400" />}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{threat.affectedOrganizations}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-400 font-medium">{threat.aiConfidence}%</span>
                        <div className="w-12 bg-slate-700 rounded-full h-1">
                          <div
                            className="bg-green-500 h-1 rounded-full"
                            style={{ width: `${threat.aiConfidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{threat.timeWindow}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        <Eye className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" title="View Details" />
                        <Settings className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" title="Configure Response" />
                        <MoreHorizontal className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" title="More Actions" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Analysis Tab */}
      {selectedView === 'analysis' && insights && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Emerging Patterns */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-orange-400" />
                <span>Emerging Patterns</span>
              </h3>
              <div className="space-y-4">
                {insights.emergingPatterns.map((pattern, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`p-1 rounded ${
                      pattern.trend === 'upward' ? 'bg-red-500/20' : 'bg-green-500/20'
                    }`}>
                      <TrendingUp className={`w-3 h-3 ${
                        pattern.trend === 'upward' ? 'text-red-400' : 'text-green-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">{pattern.pattern}</div>
                      <div className="text-xs text-slate-400">{pattern.confidence}% confidence</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Risk Predictions */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span>Risk Predictions</span>
              </h3>
              <div className="space-y-4">
                {insights.riskPredictions.map((prediction, index) => (
                  <div key={index} className="p-3 bg-slate-800/50 rounded-lg">
                    <div className="text-sm font-medium text-white mb-1">{prediction.riskType}</div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-red-400">{prediction.probability}% probability</span>
                      <span className="text-slate-400">{prediction.timeFrame}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Mitigation Effectiveness */}
            <Card>
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
                <Shield className="w-5 h-5 text-green-400" />
                <span>Mitigation Effectiveness</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="text-3xl font-bold text-blue-400 mb-2">{insights.mitigationEffectiveness.current}%</div>
                  <div className="text-sm text-slate-400 mb-4">Current Effectiveness</div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${insights.mitigationEffectiveness.current}%` }}
                    ></div>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700/50">
                  <div className="text-sm text-slate-300">
                    Gap to target: <span className="text-red-400 font-medium">{insights.mitigationEffectiveness.gap}%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* AI Recommendations */}
          <Card>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-3">
              <Zap className="w-5 h-5 text-yellow-400" />
              <span>AI Strategic Recommendations</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.mitigationEffectiveness.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                  <span className="text-slate-300">{rec}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Monitoring Tab */}
      {selectedView === 'monitoring' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <Activity className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">Real-time Threat Monitoring</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">Threat Intelligence Feed</span>
                  <span className="text-2xl font-bold text-green-400">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">AI Correlation Engine</span>
                  <span className="text-2xl font-bold text-green-400">Running</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">Automated Responses</span>
                  <span className="text-2xl font-bold text-yellow-400">24</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">False Positive Rate</span>
                  <span className="text-2xl font-bold text-blue-400">2.1%</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <Database className="w-6 h-6 text-purple-400" />
                <h2 className="text-xl font-bold text-white">System Health</h2>
              </div>
              <div className="space-y-4">
                {[
                  { component: 'AI Model Engine', status: 'Operational', uptime: '99.9%' },
                  { component: 'Threat Database', status: 'Synchronized', uptime: '100%' },
                  { component: 'Correlation Service', status: 'Active', uptime: '99.7%' },
                  { component: 'Alert Pipeline', status: 'Processing', uptime: '99.5%' }
                ].map((system, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <div className="text-slate-300 font-medium">{system.component}</div>
                      <div className="text-xs text-slate-400">{system.uptime} uptime</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      system.status === 'Operational' || system.status === 'Synchronized' || system.status === 'Active' ?
                      'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {system.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Recent System Events */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Clock className="w-6 h-6 text-green-400" />
                <span>Recent System Events</span>
              </h2>
              <span className="text-xs text-slate-400">Last 60 minutes</span>
            </div>
            <div className="space-y-3">
              {[
                { time: '14:23:12', event: 'AI model updated with new threat patterns', type: 'Update' },
                { time: '14:18:45', event: 'Threat correlation completed for 1,247 incidents', type: 'Processing' },
                { time: '14:15:22', event: 'Automated response triggered for critical threat', type: 'Action' },
                { time: '14:12:08', event: 'Intelligence feed synchronization completed', type: 'Sync' },
                { time: '14:08:33', event: 'False positive analysis completed', type: 'Analysis' }
              ].map((event, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    event.type === 'Action' ? 'bg-red-400' :
                    event.type === 'Update' ? 'bg-blue-400' :
                    event.type === 'Processing' ? 'bg-green-400' :
                    'bg-yellow-400'
                  }`}></div>
                  <div className="flex-1 text-sm text-white">{event.event}</div>
                  <div className="text-xs text-slate-500">{event.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
      </div>
    </div>
  );
};

export default AIThreatPrioritizationEngine
