// Quantum-Resistant Cryptography Suite Dashboard
// Advanced interface for post-quantum encryption, key management, and quantum threat assessment

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Shield, Key, Lock, Unlock, Activity, AlertTriangle,
  TrendingUp, Cpu, Globe, Atom, Zap, CheckCircle,
  XCircle, Clock, BarChart3, BookOpen, Target,
  Settings, Eye, EyeOff, RefreshCw, Download,
  Upload, TestTube, FileText, Calendar, Users
} from 'lucide-react';
import { quantumCryptographyAPI } from '../lib/api';

const QuantumCryptographyDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const [threatAssessment, setThreatAssessment] = useState(null);
  const [quantumKeys, setQuantumKeys] = useState([]);
  const [encryptionData, setEncryptionData] = useState({
    plainText: '',
    encryptedText: '',
    decryptedText: ''
  });
  const [compliance, setCompliance] = useState(null);
  const [roadmap, setRoadmap] = useState(null);

  // Load initial data
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [statusRes, threatRes, complianceRes, roadmapRes] = await Promise.all([
        quantumCryptographyAPI.getStatus(),
        quantumCryptographyAPI.performThreatAssessment(),
        quantumCryptographyAPI.getCompliance(),
        quantumCryptographyAPI.getRoadmap()
      ]);

      setStatus(statusRes.data.status);
      setThreatAssessment(threatRes.data);
      setCompliance(complianceRes.data.compliance);
      setRoadmap(roadmapRes.data.roadmap);
    } catch (error) {
      console.error('Error loading quantum cryptography data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateKeys = async (algorithm = 'Kyber') => {
    try {
      const response = await quantumCryptographyAPI.generateKeys({
        algorithm,
        userId: 'demo-user' // In production, get from auth context
      });
      setQuantumKeys(prev => [...prev, response.data.keyPair]);
    } catch (error) {
      console.error('Error generating quantum keys:', error);
    }
  };

  const handleEncryption = async () => {
    if (!encryptionData.plainText) return;

    try {
      setLoading(true);
      const response = await quantumCryptographyAPI.encrypt({
        plainText: encryptionData.plainText
      });

      setEncryptionData(prev => ({
        ...prev,
        encryptedText: JSON.stringify(response.data.encryptedData, null, 2),
        lastOperation: 'encryption'
      }));
    } catch (error) {
      console.error('Error encrypting data:', error);
      // Show error in UI
      setEncryptionData(prev => ({
        ...prev,
        encryptedText: 'Error: Failed to encrypt data. Please try again.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleDecryption = async () => {
    if (!encryptionData.encryptedText) return;

    try {
      setLoading(true);
      let ciphertextData;

      // Try to parse the encrypted text as JSON
      try {
        ciphertextData = JSON.parse(encryptionData.encryptedText);
      } catch (parseError) {
        // If it's not JSON, show an error
        setEncryptionData(prev => ({
          ...prev,
          decryptedText: 'Error: Invalid encrypted data format. Please use properly encrypted data.'
        }));
        return;
      }

      const response = await quantumCryptographyAPI.decrypt({
        hybridCiphertext: ciphertextData
      });

      setEncryptionData(prev => ({
        ...prev,
        decryptedText: response.data.decryptedText,
        lastOperation: 'decryption'
      }));
    } catch (error) {
      console.error('Error decrypting data:', error);
      setEncryptionData(prev => ({
        ...prev,
        decryptedText: 'Error: Failed to decrypt data. Please check the encrypted data format.'
      }));
    } finally {
      setLoading(false);
    }
  };

  const getThreatLevelColor = (level) => {
    const colors = {
      0: 'text-green-400 bg-green-500/20',
      1: 'text-yellow-400 bg-yellow-500/20',
      2: 'text-orange-400 bg-orange-500/20',
      3: 'text-red-400 bg-red-500/20',
      4: 'text-purple-400 bg-purple-500/20'
    };
    return colors[level] || colors[0];
  };

  const tabs = [
    { id: 'overview', label: 'System Overview', icon: Activity },
    { id: 'threats', label: 'Quantum Threats', icon: AlertTriangle },
    { id: 'keys', label: 'Key Management', icon: Key },
    { id: 'encryption', label: 'Hybrid Encryption', icon: Lock },
    { id: 'compliance', label: 'Compliance', icon: FileText },
    { id: 'migration', label: 'Migration Roadmap', icon: Target }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Atom className="w-16 h-16 text-purple-400 animate-spin mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Initializing Quantum Cryptography Suite</h2>
          <p className="text-slate-400">Loading post-quantum security systems...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Atom className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Quantum-Resistant Cryptography Suite
                </h1>
                <p className="text-slate-400">Future-proof encryption against quantum computing threats</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${getThreatLevelColor(status?.threatLevel?.level || 0)}`}>
                {status?.threatLevel?.description || 'Assessing threats...'}
              </div>
              <button
                onClick={loadInitialData}
                className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors flex items-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-3 rounded-t-lg font-medium transition-colors flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'bg-slate-800 text-purple-400 border-b-2 border-purple-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">SECURE</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Post-Quantum Ready</h3>
                <p className="text-slate-400 text-sm">NIST-approved algorithms implemented</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Key className="w-6 h-6 text-blue-400" />
                  </div>
                  <span className="text-blue-400 text-sm font-medium">{quantumKeys.length} KEYS</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Quantum Keys</h3>
                <p className="text-slate-400 text-sm">Active quantum-safe key pairs</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getThreatLevelColor(status?.threatLevel?.level || 0).split(' ')[1]}`}>
                    <AlertTriangle className={`w-6 h-6 ${getThreatLevelColor(status?.threatLevel?.level || 0).split(' ')[0]}`} />
                  </div>
                  <span className={`text-sm font-medium ${getThreatLevelColor(status?.threatLevel?.level || 0).split(' ')[0]}`}>
                    {status?.threatLevel?.level || 0}/4
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Threat Level</h3>
                <p className="text-slate-400 text-sm">Current quantum threat assessment</p>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <button
                  onClick={() => handleGenerateKeys('Kyber')}
                  className="p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors border border-purple-500/30"
                >
                  <Key className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Generate Kyber Keys</div>
                </button>
                <button
                  onClick={() => setActiveTab('encryption')}
                  className="p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors border border-blue-500/30"
                >
                  <Lock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Test Encryption</div>
                </button>
                <button
                  onClick={() => setActiveTab('threats')}
                  className="p-4 bg-orange-500/20 hover:bg-orange-500/30 rounded-lg transition-colors border border-orange-500/30"
                >
                  <AlertTriangle className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Threat Assessment</div>
                </button>
                <button
                  onClick={() => setActiveTab('migration')}
                  className="p-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors border border-green-500/30"
                >
                  <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Migration Plan</div>
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'threats' && threatAssessment && (
          <div className="space-y-8">
            {/* Current Threat Level */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-2 ${getThreatLevelColor(threatAssessment.assessment.threatLevel.level).split(' ')[1]} border-opacity-30`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-semibold">Current Quantum Threat Assessment</h3>
                <div className={`px-4 py-2 rounded-full font-bold ${getThreatLevelColor(threatAssessment.assessment.threatLevel.level)}`}>
                  {threatAssessment.assessment.threatLevel.description.toUpperCase()}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-sm text-slate-400 mb-1">Threat Score</div>
                  <div className="text-3xl font-bold text-white">{threatAssessment.assessment.threatScore}/100</div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Last Assessment</div>
                  <div className="text-lg font-medium text-white">
                    {new Date(threatAssessment.assessment.timestamp).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-400 mb-1">Risk Indicators</div>
                  <div className="text-lg font-medium text-white">
                    {Object.values(threatAssessment.assessment.indicators).filter(Boolean).length}/4 Active
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recommendations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-purple-400" />
                Recommended Actions
              </h3>
              <div className="space-y-3">
                {threatAssessment.assessment.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{rec}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* System Vulnerabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Shield className="w-5 h-5 mr-2 text-orange-400" />
                System Vulnerability Assessment
              </h3>
              <div className="space-y-4">
                {threatAssessment.vulnerabilities.map((vuln, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          vuln.vulnerability === 'HIGH' ? 'bg-red-500/20 text-red-400' :
                          vuln.vulnerability === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-green-500/20 text-green-400'
                        }`}>
                          {vuln.vulnerability}
                        </span>
                        <span className="font-medium text-white">{vuln.system}</span>
                      </div>
                      <div className="text-sm text-slate-400 mt-1">{vuln.algorithm}</div>
                      <div className="text-xs text-slate-500 mt-1">{vuln.quantumBreakTime}</div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-medium ${
                        vuln.migrationPriority === 'CRITICAL' ? 'text-red-400' :
                        vuln.migrationPriority === 'HIGH' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>
                        {vuln.migrationPriority}
                      </div>
                      <div className="text-xs text-slate-400">Priority</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'keys' && (
          <div className="space-y-8">
            {/* Key Generation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Generate Quantum-Safe Keys</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handleGenerateKeys('Kyber')}
                  className="p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg transition-colors border border-purple-500/30"
                >
                  <Key className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Kyber (KEM)</div>
                  <div className="text-xs text-slate-400">Key Encapsulation</div>
                </button>
                <button
                  onClick={() => handleGenerateKeys('Dilithium')}
                  className="p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors border border-blue-500/30"
                >
                  <FileText className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Dilithium (Signature)</div>
                  <div className="text-xs text-slate-400">Digital Signatures</div>
                </button>
                <button
                  onClick={() => handleGenerateKeys('Falcon')}
                  className="p-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg transition-colors border border-green-500/30"
                >
                  <Shield className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-medium">Falcon (Signature)</div>
                  <div className="text-xs text-slate-400">Compact Signatures</div>
                </button>
              </div>
            </motion.div>

            {/* Active Keys */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Active Quantum Keys</h3>
              {quantumKeys.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  <Key className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>No quantum keys generated yet</p>
                  <p className="text-sm">Click "Generate Keys" to create quantum-safe key pairs</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {quantumKeys.map((key, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                          <Key className="w-5 h-5 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-medium text-white">{key.algorithm} Key Pair</div>
                          <div className="text-sm text-slate-400">ID: {key.id.split('_').pop()}</div>
                          <div className="text-xs text-slate-500">
                            Created: {new Date(key.created).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                          {key.status}
                        </span>
                        <span className="text-sm text-slate-400">
                          Expires: {new Date(key.expires).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}

        {activeTab === 'encryption' && (
          <div className="space-y-8">
            {/* Hybrid Encryption Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Lock className="w-5 h-5 mr-2 text-blue-400" />
                Hybrid Encryption Demo
              </h3>
              <p className="text-slate-400 mb-6">
                Test quantum-resistant encryption combining classical AES-256-GCM with post-quantum Kyber KEM
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Plain Text Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Plain Text
                  </label>
                  <textarea
                    value={encryptionData.plainText}
                    onChange={(e) => setEncryptionData(prev => ({ ...prev, plainText: e.target.value }))}
                    className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter text to encrypt..."
                  />
                  <button
                    onClick={handleEncryption}
                    disabled={!encryptionData.plainText}
                    className="mt-3 w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Encrypt with Hybrid Cryptography</span>
                  </button>
                </div>

                {/* Encrypted Output */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Encrypted Data (Hybrid Ciphertext)
                  </label>
                  <textarea
                    value={encryptionData.encryptedText}
                    readOnly
                    className="w-full h-32 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-green-400 font-mono text-sm"
                    placeholder="Encrypted data will appear here..."
                  />
                </div>
              </div>

              {/* Decryption Section */}
              <div className="mt-6 pt-6 border-t border-slate-600">
                <button
                  onClick={handleDecryption}
                  disabled={!encryptionData.encryptedText}
                  className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-slate-600 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center justify-center space-x-2 mb-4"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Decrypt with Hybrid Cryptography</span>
                </button>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Decrypted Text
                  </label>
                  <textarea
                    value={encryptionData.decryptedText}
                    readOnly
                    className="w-full h-20 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white"
                    placeholder="Decrypted text will appear here..."
                  />
                </div>
              </div>
            </motion.div>

            {/* Encryption Statistics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Hybrid Cryptography Benefits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Atom className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-lg font-bold text-white">Quantum-Safe</div>
                  <div className="text-sm text-slate-400">Protected against quantum attacks</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="text-lg font-bold text-white">High Performance</div>
                  <div className="text-sm text-slate-400">Fast encryption/decryption</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="text-lg font-bold text-white">Future-Proof</div>
                  <div className="text-sm text-slate-400">NIST-approved algorithms</div>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <RefreshCw className="w-6 h-6 text-orange-400" />
                  </div>
                  <div className="text-lg font-bold text-white">Backward Compatible</div>
                  <div className="text-sm text-slate-400">Works with existing systems</div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'compliance' && compliance && (
          <div className="space-y-8">
            {/* Standards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Compliance Standards</h3>
              <div className="space-y-4">
                {compliance.standards.map((standard, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="font-medium text-white">{standard.name}</div>
                      <div className="text-sm text-slate-400">{standard.title}</div>
                      <div className="text-xs text-slate-500">Applicability: {standard.applicability}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      standard.status === 'Published' ? 'bg-green-500/20 text-green-400' :
                      standard.status === 'In Development' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {standard.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Implementation Requirements</h3>
              <div className="space-y-3">
                {compliance.requirements.map((req, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300">{req}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Deadlines */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Implementation Timeline</h3>
              <div className="space-y-4">
                {compliance.deadlines.map((deadline, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
                    <div>
                      <div className="font-medium text-white">{deadline.requirement}</div>
                      <div className="text-sm text-slate-400">Deadline: {deadline.deadline}</div>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      deadline.status === 'Upcoming' ? 'bg-orange-500/20 text-orange-400' :
                      deadline.status === 'Future' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-green-500/20 text-green-400'
                    }`}>
                      {deadline.status}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'migration' && roadmap && (
          <div className="space-y-8">
            {/* Migration Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Migration Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">${roadmap.estimatedCost.split(' - ')[0]}</div>
                  <div className="text-sm text-slate-400">Estimated Cost Range</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{roadmap.timeline}</div>
                  <div className="text-sm text-slate-400">Timeline</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{roadmap.phases.length}</div>
                  <div className="text-sm text-slate-400">Implementation Phases</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{roadmap.milestones.length}</div>
                  <div className="text-sm text-slate-400">Key Milestones</div>
                </div>
              </div>
            </motion.div>

            {/* Implementation Phases */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Implementation Phases</h3>
              <div className="space-y-6">
                {roadmap.phases.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                        <span className="text-purple-400 font-bold">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-white">{phase.phase}</h4>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              phase.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                              phase.status === 'Planned' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-green-500/20 text-green-400'
                            }`}>
                              {phase.status}
                            </span>
                            <span className="text-sm text-slate-400">{phase.duration}</span>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="flex justify-between text-sm text-slate-400 mb-1">
                            <span>Progress</span>
                            <span>{phase.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${phase.progress}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {phase.objectives.map((objective, objIndex) => (
                            <div key={objIndex} className="flex items-start space-x-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-slate-300">{objective}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < roadmap.phases.length - 1 && (
                      <div className="absolute left-6 top-12 w-px h-8 bg-slate-600"></div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Key Milestones */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Key Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roadmap.milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <Calendar className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-white">{milestone.milestone}</div>
                      <div className="text-sm text-slate-400">{milestone.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Dependencies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700"
            >
              <h3 className="text-xl font-semibold mb-4">Critical Dependencies</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {roadmap.dependencies.map((dependency, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-slate-700/30 rounded-lg">
                    <Settings className="w-5 h-5 text-orange-400 flex-shrink-0" />
                    <span className="text-slate-300">{dependency}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuantumCryptographyDashboard;
