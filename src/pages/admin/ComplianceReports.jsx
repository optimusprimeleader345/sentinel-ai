import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  FileText,
  CheckCircle,
  AlertTriangle,
  Calendar,
  Download,
  Eye,
  Shield,
  Activity,
  RefreshCw
} from 'lucide-react';

// Mock compliance data
const complianceData = [
  {
    framework: 'NIST CSF',
    status: '99.2%',
    criticalIssues: 2,
    lastAudit: '2025-01-10',
    nextAudit: '2025-03-10',
    domains: [
      { name: 'Identify', score: 98, issues: 0 },
      { name: 'Protect', score: 99, issues: 1 },
      { name: 'Detect', score: 100, issues: 0 },
      { name: 'Respond', score: 98, issues: 1 },
      { name: 'Recover', score: 99, issues: 1 }
    ]
  },
  {
    framework: 'ISO 27001',
    status: '97.8%',
    criticalIssues: 5,
    lastAudit: '2025-01-05',
    nextAudit: '2025-04-05',
    domains: [
      { name: 'Controls A.5-A.8', score: 96, issues: 2 },
      { name: 'Controls A.9-A.12', score: 98, issues: 1 },
      { name: 'Controls A.13-A.15', score: 100, issues: 0 },
      { name: 'Controls A.16-A.18', score: 97, issues: 2 }
    ]
  },
  {
    framework: 'PCI DSS',
    status: '100%',
    criticalIssues: 0,
    lastAudit: '2025-01-15',
    nextAudit: '2025-02-15',
    domains: [
      { name: 'Build Secure Network', score: 100, issues: 0 },
      { name: 'Protect Cardholder Data', score: 100, issues: 0 },
      { name: 'Regular Testing', score: 100, issues: 0 },
      { name: 'Access Control', score: 100, issues: 0 }
    ]
  },
  {
    framework: 'GDPR',
    status: '95.6%',
    criticalIssues: 8,
    lastAudit: '2025-01-08',
    nextAudit: '2025-03-08',
    domains: [
      { name: 'Data Protection', score: 94, issues: 3 },
      { name: 'Privacy Rights', score: 96, issues: 2 },
      { name: 'Incident Response', score: 99, issues: 1 },
      { name: 'Documentation', score: 92, issues: 2 }
    ]
  }
];

const ComplianceReports = () => {
  const [selectedFramework, setSelectedFramework] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const getStatusColor = (percentage) => {
    const score = parseFloat(percentage);
    if (score >= 97) return 'text-green-400';
    if (score >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Compliance Reports Center
            </h1>
            <p className="text-slate-400 text-sm">Enterprise compliance monitoring and regulatory reporting</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-semibold text-white">Overall Compliance</div>
            <div className="text-lg text-green-400 font-bold">98.1%</div>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-green-500/50 transition-all duration-200 flex items-center space-x-2 ${
              isRefreshing ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
      >
        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">98.1%</div>
              <div className="text-sm text-slate-400">Average Score</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-red-400">15</div>
              <div className="text-sm text-slate-400">Critical Issues</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">4</div>
              <div className="text-sm text-slate-400">Frameworks</div>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-400">47</div>
              <div className="text-sm text-slate-400">Total Controls</div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Framework Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {complianceData.map((framework, index) => (
          <motion.div
            key={framework.framework}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl hover:bg-slate-700/50 transition-all cursor-pointer"
            onClick={() => setSelectedFramework(framework)}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{framework.framework}</h3>
                  <p className="text-slate-400">Compliance Framework</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${getStatusColor(framework.status)}`}>
                  {framework.status}
                </div>
                <div className="text-sm text-slate-400">compliance</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className={`text-xl font-bold ${framework.criticalIssues > 3 ? 'text-red-400' : 'text-yellow-400'}`}>
                  {framework.criticalIssues}
                </div>
                <div className="text-xs text-slate-400">Issues</div>
              </div>
              <div className="text-center p-3 bg-slate-900/50 rounded-lg">
                <div className="text-sm font-semibold text-cyan-400">Next Audit</div>
                <div className="text-xs text-slate-400">{framework.nextAudit}</div>
              </div>
            </div>

            {/* Progress bars for domains */}
            <div className="space-y-2">
              {framework.domains.slice(0, 3).map((domain, idx) => (
                <div key={idx} className="flex items-center space-x-3">
                  <div className="w-20 text-xs text-slate-400 truncate">{domain.name}</div>
                  <div className="flex-1">
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${domain.score >= 95 ? 'bg-green-500' : domain.score >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${domain.score}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-xs text-white font-semibold">{domain.score}%</div>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-700/50 flex justify-between items-center">
              <div className="text-sm text-slate-400">
                Last Audit: {framework.lastAudit}
              </div>
              <div className="flex space-x-2">
                <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm hover:bg-blue-500/30 transition-colors">
                  <Eye className="w-4 h-4 inline mr-1" />
                  View
                </button>
                <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm hover:bg-purple-500/30 transition-colors">
                  <Download className="w-4 h-4 inline mr-1" />
                  PDF
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Framework Detail Modal */}
      {selectedFramework && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedFramework(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="bg-slate-800/95 backdrop-blur-xl border border-slate-700/50 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">{selectedFramework.framework}</h2>
                  <p className="text-slate-400">Detailed Compliance Report</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedFramework(null)}
                className="p-2 hover:bg-slate-700 rounded-lg"
              >
                <FileText className="w-6 h-6 text-slate-400" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Framework Overview</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Compliance Score:</span>
                      <span className={`font-bold ${getStatusColor(selectedFramework.status)}`}>
                        {selectedFramework.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Critical Issues:</span>
                      <span className="text-red-400 font-bold">{selectedFramework.criticalIssues}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Last Audit:</span>
                      <span className="text-white">{selectedFramework.lastAudit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Next Audit:</span>
                      <span className="text-cyan-400">{selectedFramework.nextAudit}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-white">Compliance Breakdown</h3>
                  <div className="bg-slate-900/50 rounded-lg p-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-slate-300">Overall Progress</span>
                      <span className="text-white font-semibold">{selectedFramework.status}</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full"
                        style={{ width: selectedFramework.status }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Domain Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Control Domains</h3>
                <div className="space-y-3">
                  {selectedFramework.domains.map((domain, index) => (
                    <div key={index} className="bg-slate-900/50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-white font-medium">{domain.name}</span>
                        <div className="flex items-center space-x-3">
                          <span className={`text-sm ${domain.issues > 0 ? 'text-red-400' : 'text-green-400'}`}>
                            {domain.issues} issue{domain.issues !== 1 ? 's' : ''}
                          </span>
                          <span className={`font-bold ${domain.score >= 95 ? 'text-green-400' : domain.score >= 85 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {domain.score}%
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${domain.score >= 95 ? 'bg-green-500' : domain.score >= 85 ? 'bg-yellow-500' : 'bg-red-500'}`}
                          style={{ width: `${domain.score}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end mt-6 pt-4 border-t border-slate-700/50">
                <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                  Generate Full Report
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ComplianceReports;
