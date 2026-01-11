import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  AlertTriangle,
  Target,
  Zap,
  Brain,
  Globe,
  Users,
  Database,
  Activity,
  Clock,
  TrendingUp,
  Eye,
  Search,
  Filter,
  Download,
  RotateCw,
  Settings,
  BarChart3,
  PieChart,
  LineChart,
  MapPin,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock as ClockIcon,
  Calendar,
  User,
  Building
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';

// Advanced Threat Intelligence Data
const threatIntelligenceFeeds = [
  {
    id: 'MITRE-ATTCK',
    name: 'MITRE ATT&CK Framework',
    source: 'MITRE Corporation',
    lastUpdate: '2024-01-15T10:30:00Z',
    threatCount: 342,
    severity: 'critical',
    newThreats: 23,
    active: true,
    status: 'healthy'
  },
  {
    id: 'NIST-NVD',
    name: 'NIST National Vulnerability Database',
    source: 'National Institute of Standards',
    lastUpdate: '2024-01-15T09:45:00Z',
    threatCount: 1250,
    severity: 'high',
    newThreats: 45,
    active: true,
    status: 'healthy'
  },
  {
    id: 'CISA-ALERTS',
    name: 'CISA Security Alerts',
    source: 'Cybersecurity & Infrastructure Security Agency',
    lastUpdate: '2024-01-15T11:00:00Z',
    threatCount: 187,
    severity: 'critical',
    newThreats: 12,
    active: true,
    status: 'healthy'
  },
  {
    id: 'VIRUSTOTAL',
    name: 'VirusTotal Intelligence',
    source: 'Google VirusTotal',
    lastUpdate: '2024-01-15T10:15:00Z',
    threatCount: 89231,
    severity: 'high',
    newThreats: 1234,
    active: true,
    status: 'healthy'
  }
];

const activeThreatActors = [
  {
    id: 'TA-APT29',
    name: 'APT29 (Cozy Bear)',
    country: 'Russia',
    target: 'Government & Tech',
    sophistication: 'Advanced',
    lastActivity: '2024-01-14',
    confidence: 98,
    techniques: ['Spear Phishing', 'Zero Day Exploits', 'Lateral Movement'],
    indicators: 1567,
    mitigation: 'High'
  },
  {
    id: 'TA-LAZARUS',
    name: 'Lazarus Group',
    country: 'North Korea',
    target: 'Financial & Crypto',
    sophistication: 'Advanced',
    lastActivity: '2024-01-13',
    confidence: 95,
    techniques: ['Malware Development', 'Supply Chain Attacks', 'Cryptocurrency Mining'],
    indicators: 2341,
    mitigation: 'High'
  },
  {
    id: 'TA-SOLAR',
    name: 'SolarWinds Hackers',
    country: 'Russia',
    target: 'Enterprise Networks',
    sophistication: 'Elite',
    lastActivity: '2024-01-12',
    confidence: 92,
    techniques: ['Supply Chain Compromise', 'Backdoor Installation', 'Data Exfiltration'],
    indicators: 892,
    mitigation: 'Critical'
  }
];

const globalThreatLandscape = [
  { region: 'North America', severity: 'high', activeThreats: 234, affectedOrgs: 1250 },
  { region: 'Europe', severity: 'high', activeThreats: 187, affectedOrgs: 980 },
  { region: 'Asia Pacific', severity: 'critical', activeThreats: 456, affectedOrgs: 1850 },
  { region: 'Middle East', severity: 'medium', activeThreats: 89, affectedOrgs: 345 },
  { region: 'Africa', severity: 'low', activeThreats: 34, affectedOrgs: 123 },
  { region: 'South America', severity: 'medium', activeThreats: 67, affectedOrgs: 289 }
];

const recentIoCs = [
  {
    id: 1,
    type: 'Malware Hash',
    value: 'a1b2c3d4e5f6789abcdef0123456789abcdef',
    severity: 'high',
    source: 'VirusTotal',
    firstSeen: '2024-01-15T08:30:00Z',
    detections: 145,
    status: 'active'
  },
  {
    id: 2,
    type: 'Domain',
    value: 'malicious-bank-update.com',
    severity: 'critical',
    source: 'Phishing Database',
    firstSeen: '2024-01-15T07:15:00Z',
    detections: 89,
    status: 'active'
  },
  {
    id: 3,
    type: 'IP Address',
    value: '185.234.217.89',
    severity: 'high',
    source: 'Honeypot Network',
    firstSeen: '2024-01-14T22:45:00Z',
    detections: 234,
    status: 'active'
  }
];

const AdvancedThreatIntelligence = () => {
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [selectedActor, setSelectedActor] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    return status === 'healthy' ? 'text-green-400' : status === 'warning' ? 'text-yellow-400' : 'text-red-400';
  };

  const filteredIoCs = recentIoCs.filter(ioc =>
    filterType === 'all' || ioc.type.toLowerCase().includes(filterType.toLowerCase()) ||
    ioc.severity === filterType
  ).filter(ioc =>
    searchQuery === '' || ioc.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-red-500 to-purple-500 rounded-lg shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Advanced Threat Intelligence Hub
            </h1>
            <p className="text-slate-400 text-sm">Enterprise Threat Intelligence & Advanced Analytics Platform</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">90,987</span>
            <span className="text-xs text-slate-400">Active Indicators</span>
          </div>
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-green-400" />
            <span className="text-sm font-semibold text-white">2,345</span>
            <span className="text-xs text-slate-400">New Threats Today</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-bold text-white hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-200 flex items-center space-x-2 ${
              refreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RotateCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>{refreshing ? 'Syncing...' : 'Sync Feeds'}</span>
          </button>
        </div>
      </motion.div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { title: 'Global Threat Landscape', value: 'HIGH RISK', change: '+12%', icon: Globe, color: 'text-red-400' },
          { title: 'Active Threat Actors', value: '1,247', change: '+8%', icon: Users, color: 'text-orange-400' },
          { title: 'IoC Database', value: '2.8M', change: '+15%', icon: Database, color: 'text-blue-400' },
          { title: 'Intelligence Feeds', value: '47', change: '+2', icon: Activity, color: 'text-green-400' }
        ].map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard className="text-center">
              <div className="flex items-center justify-center mb-2">
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-slate-400 mb-2">{metric.title}</div>
              <div className={`text-xs px-2 py-1 rounded-full ${
                metric.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
              }`}>
                {metric.change}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Threat Intelligence Feeds & Status */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">
        {/* Intelligence Feed Status */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard title="Intelligence Feeds" icon={Activity}>
            <div className="space-y-4">
              {threatIntelligenceFeeds.map((feed, index) => (
                <motion.div
                  key={feed.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(feed.status)}`}></div>
                      <div>
                        <div className="text-sm font-semibold text-white">{feed.name}</div>
                        <div className="text-xs text-slate-400">{feed.source}</div>
                        <div className="text-xs text-cyan-400">{feed.threatCount.toLocaleString()} threats</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs px-2 py-1 rounded ${getSeverityColor(feed.severity)}`}>
                      {feed.severity}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">
                      +{feed.newThreats} new
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Threat Actor Profiles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard title="Active Threat Actors" icon={Users}>
            <div className="space-y-4">
              {activeThreatActors.map((actor, index) => (
                <motion.div
                  key={actor.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-slate-800/50 rounded-lg cursor-pointer hover:bg-slate-700/50 transition-colors"
                  onClick={() => setSelectedActor(actor)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-white">{actor.name}</span>
                    <div className={`px-2 py-1 rounded text-xs ${
                      actor.mitigation === 'Critical' ? 'bg-red-500/20 text-red-400' :
                      actor.mitigation === 'High' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {actor.mitigation}
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{actor.country}</span>
                    <span className="text-slate-400">{actor.lastActivity}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs mt-1">
                    <span className="text-slate-400">{actor.sophistication}</span>
                    <span className="text-cyan-400">{actor.indicators} IoCs</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Global Threat Landscape */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <GlassCard title="Global Threat Landscape" icon={Globe}>
            <div className="space-y-4">
              {globalThreatLandscape.map((region, index) => (
                <motion.div
                  key={region.region}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold text-white">{region.region}</div>
                    <div className="text-xs text-slate-400">{region.affectedOrgs.toLocaleString()} organizations affected</div>
                  </div>
                  <div className="text-right">
                    <div className={`text-xs font-semibold mb-1 ${
                      region.severity === 'critical' ? 'text-red-400' :
                      region.severity === 'high' ? 'text-orange-400' :
                      region.severity === 'medium' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      {region.severity.toUpperCase()} RISK
                    </div>
                    <div className="text-xs text-slate-500">
                      {region.activeThreats} active threats
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* IoC Management & Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <GlassCard title="IoC Management & Monitoring" icon={Database}>
          {/* Search and Filter Controls */}
          <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/40 rounded-lg">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search IoCs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                />
              </div>
            </div>

            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
            >
              <option value="all">All Types</option>
              <option value="Malware Hash">Malware Hash</option>
              <option value="Domain">Domain</option>
              <option value="IP Address">IP Address</option>
              <option value="critical">Critical Severity</option>
              <option value="high">High Severity</option>
            </select>
          </div>

          {/* Recent IoCs Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-700/50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Indicator</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Severity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Source</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Detections</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/30">
                {filteredIoCs.map((ioc, index) => (
                  <motion.tr
                    key={ioc.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.02 }}
                    className="hover:bg-slate-800/30"
                  >
                    <td className="px-4 py-4 text-sm text-slate-300">{ioc.type}</td>
                    <td className="px-4 py-4 text-sm text-white font-mono">{ioc.value}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(ioc.severity)}`}>
                        {ioc.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-slate-400">{ioc.source}</td>
                    <td className="px-4 py-4 text-sm text-cyan-400 font-semibold">{ioc.detections}</td>
                    <td className="px-4 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                        ioc.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {ioc.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
            <div className="text-sm text-slate-400">
              Showing {filteredIoCs.length} of {recentIoCs.length} indicators
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-sm">
                Previous
              </button>
              <button className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 rounded text-sm">
                Next
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Threat Actor Details Modal */}
      <AnimatePresence>
        {selectedActor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedActor(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-red-500/20 rounded-lg">
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedActor.name}</h2>
                    <p className="text-slate-400">{selectedActor.country} • {selectedActor.sophistication} Sophistication</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedActor(null)}
                  className="p-2 hover:bg-slate-700 rounded-lg"
                >
                  <X className="w-6 h-6 text-slate-400" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Actor Profile */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Threat Profile</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-slate-700/30">
                      <span className="text-slate-400">Target Industries:</span>
                      <span className="text-white">{selectedActor.target}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700/30">
                      <span className="text-slate-400">Confidence Score:</span>
                      <span className="text-white font-semibold">{selectedActor.confidence}%</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700/30">
                      <span className="text-slate-400">Active IoCs:</span>
                      <span className="text-cyan-400 font-semibold">{selectedActor.indicators.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-slate-700/30">
                      <span className="text-slate-400">Last Activity:</span>
                      <span className="text-white">{selectedActor.lastActivity}</span>
                    </div>
                  </div>

                  <h4 className="text-md font-semibold text-white mt-6 mb-3">TTPs (Tactics, Techniques & Procedures)</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedActor.techniques.map((technique, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                        <span className="text-slate-300">{technique}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mitigation Recommendations */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Recommended Actions</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="w-5 h-5 text-red-400" />
                        <span className="text-red-400 font-semibold">Critical Priority</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Implement immediate network segmentation and endpoint monitoring.
                        Enable enhanced logging and real-time alerting.
                      </p>
                    </div>

                    <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Eye className="w-5 h-5 text-orange-400" />
                        <span className="text-orange-400 font-semibold">Detection Focus</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Deploy threat hunting rules and anomaly detection.
                        Monitor for lateral movement patterns.
                      </p>
                    </div>

                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Database className="w-5 h-5 text-blue-400" />
                        <span className="text-blue-400 font-semibold">Intelligence Sharing</span>
                      </div>
                      <p className="text-slate-300 text-sm">
                        Share IoCs with industry partners and ISACs.
                        Update threat hunting playbooks.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AdvancedThreatIntelligence;
