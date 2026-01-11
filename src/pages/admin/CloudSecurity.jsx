import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cloud,
  Shield,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Activity,
  RefreshCw,
  Settings,
  Database,
  Server,
  ShieldCheck,
  Key,
  Users,
  Eye,
  X,
  Monitor,
  TrendingUp,
  TrendingDown,
  Zap,
  MapPin,
  Search,
  Filter,
  MoreHorizontal,
  CloudLightning,
  FileCheck,
  Bell,
  Target,
  Check
} from 'lucide-react';

const CloudSecurity = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [selectedView, setSelectedView] = useState('overview');
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [alerts, setAlerts] = useState([]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  // Cloud service providers data
  const [cloudProviders] = useState([
    {
      id: 'aws',
      name: 'Amazon Web Services',
      resources: 245,
      regions: ['us-east-1', 'us-west-2', 'eu-west-1'],
      securityScore: 94,
      compliance: 'SOC 2, CIS, ISO 27001',
      activeAlerts: 3,
      lastScan: '08:45:32 IST'
    },
    {
      id: 'azure',
      name: 'Microsoft Azure',
      resources: 189,
      regions: ['East US', 'West Europe', 'East Asia'],
      securityScore: 96,
      compliance: 'SOC 2, GDPR, ISO 27001',
      activeAlerts: 1,
      lastScan: '08:42:15 IST'
    },
    {
      id: 'gcp',
      name: 'Google Cloud Platform',
      resources: 132,
      regions: ['us-central1', 'europe-west1', 'asia-east1'],
      securityScore: 97,
      compliance: 'SOC 2, CIS, FedRAMP',
      activeAlerts: 0,
      lastScan: '08:48:22 IST'
    }
  ]);

  // Security configurations
  const [securityConfigs] = useState({
    identityAccess: [
      { service: 'IAM Roles', configured: 89, total: 95 },
      { service: 'MFA Enforcement', configured: 256, total: 264 },
      { service: 'Access Keys Rotated', configured: 98, total: 102 }
    ],
    networkSecurity: [
      { service: 'Security Groups', configured: 156, total: 165 },
      { service: 'Network ACLs', configured: 87, total: 89 },
      { service: 'WAF Rules', configured: 123, total: 125 }
    ],
    dataProtection: [
      { service: 'Encryption at Rest', configured: 342, total: 350 },
      { service: 'Encryption in Transit', configured: 89, total: 91 },
      { service: 'Backup Policies', configured: 156, total: 160 }
    ]
  });

  // Cloud resources inventory
  const [cloudResources] = useState([
    {
      id: 'ec2-001',
      name: 'web-server-01',
      type: 'EC2 Instance',
      provider: 'AWS',
      region: 'us-east-1',
      status: 'running',
      securityScore: 92,
      lastScan: '08:45:15 IST',
      vulnerabilities: 2,
      compliance: 'compliant',
      tags: ['web', 'production', 'nginx']
    },
    {
      id: 's3-001',
      name: 'app-data-bucket',
      type: 'S3 Bucket',
      provider: 'AWS',
      region: 'us-east-1',
      status: 'active',
      securityScore: 88,
      lastScan: '08:42:30 IST',
      vulnerabilities: 0,
      compliance: 'warning',
      tags: ['data', 'application']
    },
    {
      id: 'sql-001',
      name: 'app-database',
      type: 'Cloud SQL',
      provider: 'GCP',
      region: 'us-central1',
      status: 'running',
      securityScore: 96,
      lastScan: '08:48:19 IST',
      vulnerabilities: 1,
      compliance: 'compliant',
      tags: ['database', 'production']
    }
  ]);

  // Compliance frameworks
  const [complianceFrameworks] = useState([
    {
      name: 'SOC 2',
      compliance: 96,
      requirements: 125,
      failures: 5,
      lastAssessment: '2024-12-06'
    },
    {
      name: 'CIS Benchmarks',
      compliance: 89,
      requirements: 87,
      failures: 10,
      lastAssessment: '2024-12-05'
    },
    {
      name: 'ISO 27001',
      compliance: 94,
      requirements: 114,
      failures: 7,
      lastAssessment: '2024-12-04'
    },
    {
      name: 'PCI DSS',
      compliance: 97,
      requirements: 78,
      failures: 2,
      lastAssessment: '2024-12-03'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'running':
      case 'active':
      case 'compliant':
        return 'text-green-400 bg-green-500/20';
      case 'warning':
        return 'text-yellow-400 bg-yellow-500/20';
      case 'stopped':
      case 'inactive':
      case 'non-compliant':
        return 'text-red-400 bg-red-500/20';
      default:
        return 'text-gray-400 bg-gray-500/20';
    }
  };

  const getProviderColor = (provider) => {
    switch (provider) {
      case 'AWS': return 'text-orange-400';
      case 'Azure': return 'text-blue-400';
      case 'GCP': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

  const filteredResources = cloudResources.filter(resource =>
    resource.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedProvider === 'all' || resource.provider.toLowerCase().includes(selectedProvider.toLowerCase()))
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
            <Cloud className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              Cloud Security Management
            </h1>
            <p className="text-slate-400 text-sm">Multi-cloud security posture and compliance monitoring</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {/* Global Alert Indicator */}
          <div className="relative">
            <Bell className="w-5 h-5 text-red-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold">{cloudProviders.reduce((sum, p) => sum + p.activeAlerts, 0)}</span>
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
          { id: 'overview', label: 'Overview', icon: Monitor },
          { id: 'providers', label: 'Providers', icon: Cloud },
          { id: 'resources', label: 'Resources', icon: Server },
          { id: 'compliance', label: 'Compliance', icon: ShieldCheck },
          { id: 'security', label: 'Security', icon: Shield },
          { id: 'monitoring', label: 'Monitoring', icon: Activity }
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
              title: 'Total Resources',
              value: cloudResources.length,
              change: '+8',
              trend: 'up',
              icon: Server,
              color: 'pink'
            }, {
              title: 'Security Score',
              value: '96%',
              change: '+2.3%',
              trend: 'up',
              icon: Shield,
              color: 'green'
            }, {
              title: 'Active Providers',
              value: cloudProviders.length,
              change: 'Stable',
              trend: 'stable',
              icon: Cloud,
              color: 'blue'
            }, {
              title: 'Compliance Rate',
              value: '94%',
              change: '+1.5%',
              trend: 'up',
              icon: CheckCircle,
              color: 'purple'
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

          {/* Cloud Providers Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {cloudProviders.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {provider.id === 'aws' && <CloudLightning className={`w-8 h-8 ${getProviderColor('AWS')}`} />}
                      {provider.id === 'azure' && <Shield className={`w-8 h-8 ${getProviderColor('Azure')}`} />}
                      {provider.id === 'gcp' && <Database className={`w-8 h-8 ${getProviderColor('GCP')}`} />}
                      <div>
                        <h3 className="text-lg font-semibold text-white">{provider.name}</h3>
                        <p className="text-xs text-slate-400">{provider.resources} resources</p>
                      </div>
                    </div>
                    <span className={`text-lg font-bold ${provider.securityScore >= 95 ? 'text-green-400' : provider.securityScore >= 90 ? 'text-yellow-400' : 'text-red-400'}`}>
                      {provider.securityScore}%
                    </span>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Regions:</span>
                      <span className="text-white">{provider.regions.length}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Compliance:</span>
                      <span className="text-green-400">{provider.compliance.split(', ').length} frameworks</span>
                    </div>
                  </div>

                  {/* Security Score Bar */}
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                    <div
                      className={`h-2 rounded-full transition-all duration-1000 ${
                        provider.securityScore >= 95 ? 'bg-green-500' :
                        provider.securityScore >= 90 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${provider.securityScore}%` }}
                    ></div>
                  </div>

                  {/* Alert Indicator */}
                  {provider.activeAlerts > 0 && (
                    <div className="flex items-center space-x-2 text-xs">
                      <AlertTriangle className="w-4 h-4 text-red-400" />
                      <span className="text-red-400">{provider.activeAlerts} alerts</span>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Recent Security Events */}
          <Card>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center space-x-3">
                <Target className="w-6 h-6 text-red-400" />
                <span>Recent Cloud Security Events</span>
              </h2>
              <span className="text-xs text-slate-400">Last 10 minutes</span>
            </div>
            <div className="space-y-4">
              {[
                { time: '08:48:22', event: 'S3 bucket public access detected', provider: 'AWS', severity: 'high', action: 'Auto-remediated' },
                { time: '08:45:15', event: 'IAM policy change', provider: 'AWS', severity: 'medium', action: 'Logged' },
                { time: '08:42:30', event: 'Firewall rule violation', provider: 'GCP', severity: 'low', action: 'Alert generated' },
                { time: '08:40:45', event: 'DDoS protection activated', provider: 'Azure', severity: 'critical', action: 'Mitigated' },
                { time: '08:37:12', event: 'Unencrypted data transfer', provider: 'AWS', severity: 'medium', action: 'Flagged' }
              ].map((event, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg">
                  <div className={`w-2 h-2 rounded-full ${
                    event.severity === 'critical' ? 'bg-red-400' :
                    event.severity === 'high' ? 'bg-orange-400' :
                    event.severity === 'medium' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm text-white font-medium">{event.event}</div>
                    <div className="text-xs text-slate-400">{event.provider} • {event.action}</div>
                  </div>
                  <div className="text-xs text-slate-500">{event.time}</div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* Providers Tab */}
      {selectedView === 'providers' && (
        <div className="space-y-6">
          {cloudProviders.map((provider, index) => (
            <motion.div
              key={provider.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-slate-700/50 rounded-lg">
                      {provider.id === 'aws' && <CloudLightning className="w-8 h-8 text-orange-400" />}
                      {provider.id === 'azure' && <Shield className="w-8 h-8 text-blue-400" />}
                      {provider.id === 'gcp' && <Database className="w-8 h-8 text-purple-400" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{provider.name}</h2>
                      <p className="text-slate-400">{provider.resources} resources across {provider.regions.length} regions</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{provider.securityScore}%</div>
                      <div className="text-xs text-slate-400">Security Score</div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30">
                        Configure
                      </button>
                      <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30">
                        Scan Now
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Regions</h3>
                    <div className="space-y-2">
                      {provider.regions.map((region, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-300">{region}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Compliance</h3>
                    <div className="flex flex-wrap gap-2">
                      {provider.compliance.split(', ').map((cert, idx) => (
                        <span key={idx} className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Security Status</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Active Alerts:</span>
                        <span className={`font-medium ${provider.activeAlerts > 0 ? 'text-red-400' : 'text-green-400'}`}>
                          {provider.activeAlerts}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Last Scan:</span>
                        <span className="text-slate-300">{provider.lastScan}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Resources Tab */}
      {selectedView === 'resources' && (
        <>
          {/* Search and Filter Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/25"
              />
            </div>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:border-pink-400 focus:ring-1 focus:ring-pink-400/25"
            >
              <option value="all">All Providers</option>
              <option value="aws">AWS</option>
              <option value="azure">Azure</option>
              <option value="gcp">GCP</option>
            </select>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700/50">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Resource</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Type</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Provider</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Security Score</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Compliance</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource, index) => (
                  <tr key={resource.id} className="border-b border-slate-800/30 hover:bg-slate-800/20">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Server className="w-5 h-5 text-slate-400" />
                        <div>
                          <div className="text-white font-medium">{resource.name}</div>
                          <div className="text-xs text-slate-400">{resource.region}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300">{resource.type}</td>
                    <td className="py-3 px-4">
                      <span className={`font-medium ${getProviderColor(resource.provider)}`}>{resource.provider}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(resource.status)}`}>
                        {resource.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <span className={`font-semibold ${resource.securityScore >= 90 ? 'text-green-400' : resource.securityScore >= 80 ? 'text-yellow-400' : 'text-red-400'}`}>
                          {resource.securityScore}%
                        </span>
                        {resource.vulnerabilities > 0 && (
                          <AlertTriangle className="w-4 h-4 text-red-400" title={`${resource.vulnerabilities} vulnerabilities`} />
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${getStatusColor(resource.compliance)}`}>
                        {resource.compliance.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-1">
                        <Eye className="w-4 h-4 text-slate-400 hover:text-white cursor-pointer" title="View Details" />
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

      {/* Compliance Tab */}
      {selectedView === 'compliance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {complianceFrameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 bg-green-500/20 rounded-lg`}>
                      <FileCheck className={`w-6 h-6 text-green-400`} />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{framework.compliance}%</div>
                    </div>
                  </div>
                  <div className="text-lg font-semibold text-white mb-2">{framework.name}</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Requirements:</span>
                      <span className="text-white">{framework.requirements}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Failures:</span>
                      <span className={`font-semibold ${framework.failures > 0 ? 'text-red-400' : 'text-green-400'}`}>{framework.failures}</span>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 mt-2">
                    Last assessment: {framework.lastAssessment}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card>
            <h2 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              <span>Security Configuration Status</span>
            </h2>
            <div className="space-y-8">
              {Object.entries(securityConfigs).map(([category, configs]) => (
                <div key={category}>
                  <h3 className="text-lg font-semibold text-white mb-4 capitalize">{category.replace(/([A-Z])/g, ' $1')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {configs.map((config, index) => (
                      <div key={index} className="bg-slate-800/50 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-slate-300">{config.service}</span>
                          <span className={`text-sm font-bold ${(config.configured / config.total) >= 0.95 ? 'text-green-400' : (config.configured / config.total) >= 0.8 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {config.configured}/{config.total}
                          </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-1000 ${
                              (config.configured / config.total) >= 0.95 ? 'bg-green-500' :
                              (config.configured / config.total) >= 0.8 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${(config.configured / config.total) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Security Tab */}
      {selectedView === 'security' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-center space-x-3 mb-6">
              <Target className="w-6 h-6 text-red-400" />
              <h2 className="text-xl font-bold text-white">Cloud Security Events</h2>
            </div>
            <div className="space-y-4">
              {[
                { time: '08:48:22', event: 'Unauthorized API access attempt', resource: 'S3 Bucket', provider: 'AWS', severity: 'high', action: 'Blocked' },
                { time: '08:45:15', event: 'Privilege escalation detected', resource: 'IAM User', provider: 'AWS', severity: 'critical', action: 'Account locked' },
                { time: '08:42:30', event: 'Malicious file upload blocked', resource: 'Cloud Storage', provider: 'GCP', severity: 'high', action: 'File quarantined' },
                { time: '08:40:45', event: 'DDoS attack mitigated', resource: 'Load Balancer', provider: 'Azure', severity: 'critical', action: 'Traffic redirected' }
              ].map((event, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg border-l-4 border-l-red-500">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${event.severity === 'critical' ? 'bg-red-400' : 'bg-orange-400'}`}></div>
                    <div>
                      <div className="text-white font-medium">{event.event}</div>
                      <div className="text-sm text-slate-400">{event.resource} • {event.provider}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      event.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 'bg-orange-500/20 text-orange-400'
                    }`}>
                      {event.severity}
                    </span>
                    <span className="text-green-400 text-sm font-semibold">{event.action}</span>
                    <span className="text-xs text-slate-500">{event.time}</span>
                  </div>
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
                <h2 className="text-xl font-bold text-white">Real-time Monitoring</h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">API Calls</span>
                  <span className="text-2xl font-bold text-blue-400">2.4M</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">Data Transfer</span>
                  <span className="text-2xl font-bold text-green-400">15.6 TB</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">Error Rate</span>
                  <span className="text-2xl font-bold text-red-400">0.02%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                  <span className="text-slate-300">Response Time</span>
                  <span className="text-2xl font-bold text-purple-400">45ms</span>
                </div>
              </div>
            </Card>

            <Card>
              <div className="flex items-center space-x-3 mb-6">
                <Zap className="w-6 h-6 text-yellow-400" />
                <h2 className="text-xl font-bold text-white">Cloud Service Health</h2>
              </div>
              <div className="space-y-4">
                {cloudProviders.map((provider, index) => (
                  <div key={provider.id} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {provider.id === 'aws' && <CloudLightning className="w-5 h-5 text-orange-400" />}
                      {provider.id === 'azure' && <Shield className="w-5 h-5 text-blue-400" />}
                      {provider.id === 'gcp' && <Database className="w-5 h-5 text-purple-400" />}
                      <span className="text-slate-300">{provider.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className={`font-semibold ${provider.securityScore >= 95 ? 'text-green-400' : 'text-yellow-400'}`}>
                        {provider.securityScore}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default CloudSecurity;
