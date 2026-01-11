import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  Shield,
  Zap,
  Target,
  Eye,
  Cpu,
  Activity,
  Clock,
  BarChart3,
  RefreshCw
} from 'lucide-react';

// Mock AI prediction data
const PREDICTION_DATA = [
  {
    id: 'pred_1',
    type: 'ransomware',
    target: 'Healthcare Sector',
    probability: 0.87,
    timeline: '24-48 hours',
    severity: 'Critical',
    indicators: ['Unusual file access patterns', 'Encrypted network traffic'],
    confidence: 94,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) // 2 hours ago
  },
  {
    id: 'pred_2',
    type: 'phishing_campaign',
    target: 'Financial Services',
    probability: 0.76,
    timeline: '3-5 days',
    severity: 'High',
    indicators: ['Suspicious email patterns', 'Domain registration anomalies'],
    confidence: 89,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) // 4 hours ago
  },
  {
    id: 'pred_3',
    type: 'ddos_attack',
    target: 'E-commerce Platforms',
    probability: 0.68,
    timeline: '1-2 weeks',
    severity: 'Medium',
    indicators: ['Botnet activity increase', 'Traffic pattern changes'],
    confidence: 82,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000) // 6 hours ago
  },
  {
    id: 'pred_4',
    type: 'supply_chain_attack',
    target: 'Software Vendors',
    probability: 0.91,
    timeline: '48-72 hours',
    severity: 'Critical',
    indicators: ['Third-party dependency changes', 'Code signing anomalies'],
    confidence: 96,
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000) // 8 hours ago
  }
];

const AIThreatPredictor = () => {
  const [predictions, setPredictions] = useState(PREDICTION_DATA);
  const [selectedPrediction, setSelectedPrediction] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  // Simulate real-time prediction updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPredictions(prev => prev.map(pred => ({
        ...pred,
        probability: Math.max(0.1, Math.min(0.99, pred.probability + (Math.random() - 0.5) * 0.1)),
        confidence: Math.max(70, Math.min(99, pred.confidence + (Math.random() - 0.5) * 5))
      })));
      setLastUpdate(new Date());
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const runAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      // Simulate new prediction
      const newPrediction = {
        id: `pred_${Date.now()}`,
        type: ['zero_day_exploit', 'data_exfiltration', 'credential_theft'][Math.floor(Math.random() * 3)],
        target: ['Manufacturing', 'Government', 'Retail', 'Technology'][Math.floor(Math.random() * 4)],
        probability: 0.5 + Math.random() * 0.4,
        timeline: ['6-12 hours', '1-2 days', '3-7 days'][Math.floor(Math.random() * 3)],
        severity: ['Critical', 'High', 'Medium'][Math.floor(Math.random() * 3)],
        indicators: ['Anomalous behavior detected', 'Pattern deviation', 'Unusual traffic'],
        confidence: 75 + Math.random() * 20,
        timestamp: new Date()
      };
      setPredictions(prev => [newPrediction, ...prev.slice(0, 4)]);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'Critical': return { bg: '#dc2626', text: '#fca5a5' };
      case 'High': return { bg: '#ea580c', text: '#fdba74' };
      case 'Medium': return { bg: '#ca8a04', text: '#fcd34d' };
      default: return { bg: '#65a30d', text: '#bef264' };
    }
  };

  const getProbabilityColor = (probability) => {
    if (probability >= 0.8) return '#dc2626';
    if (probability >= 0.6) return '#ea580c';
    if (probability >= 0.4) return '#ca8a04';
    return '#65a30d';
  };

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 shadow-glow">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">AI Threat Predictor</h3>
              <p className="text-slate-400 text-sm">Machine learning-powered threat forecasting</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={runAnalysis}
              disabled={isAnalyzing}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                isAnalyzing
                  ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-600 hover:to-blue-600 shadow-lg'
              }`}
              whileHover={!isAnalyzing ? { scale: 1.05 } : {}}
              whileTap={!isAnalyzing ? { scale: 0.95 } : {}}
            >
              <RefreshCw className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              <span>{isAnalyzing ? 'Analyzing...' : 'Run Analysis'}</span>
            </motion.button>

            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm">AI Active</span>
            </div>
          </div>
        </div>

        {/* AI Status Indicators */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-slate-800/50 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-cyan-400">
              {predictions.filter(p => p.probability > 0.8).length}
            </div>
            <div className="text-xs text-slate-400">High Risk Predictions</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-slate-800/50 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-orange-400">
              {(predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length).toFixed(0)}%
            </div>
            <div className="text-xs text-slate-400">Avg Confidence</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/50 rounded-lg p-4 text-center"
          >
            <div className="text-2xl font-bold text-red-400">
              {predictions.filter(p => p.severity === 'Critical').length}
            </div>
            <div className="text-xs text-slate-400">Critical Threats</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-slate-800/50 rounded-lg p-4 text-center"
          >
            <div className="text-sm font-bold text-slate-300">
              {lastUpdate.toLocaleTimeString()}
            </div>
            <div className="text-xs text-slate-400">Last Updated</div>
          </motion.div>
        </div>

        {/* Predictions List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          <AnimatePresence>
            {predictions.map((prediction, index) => {
              const severityColors = getSeverityColor(prediction.severity);
              const isSelected = selectedPrediction?.id === prediction.id;

              return (
                <motion.div
                  key={prediction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative bg-slate-800/30 rounded-lg p-4 border-l-4 cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'border-l-cyan-400 bg-slate-700/50 shadow-lg'
                      : `border-l-[${severityColors.bg}] hover:bg-slate-700/30`
                  }`}
                  onClick={() => setSelectedPrediction(
                    isSelected ? null : prediction
                  )}
                  style={{
                    borderLeftColor: severityColors.bg
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${severityColors.bg}20` }}
                        >
                          <Target className="w-4 h-4" style={{ color: severityColors.bg }} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white text-sm">
                            {prediction.type.replace('_', ' ').toUpperCase()}
                          </h4>
                          <p className="text-slate-400 text-xs">Target: {prediction.target}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4 mb-3">
                        <div className="flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-cyan-400" />
                          <span className="text-sm font-bold" style={{ color: getProbabilityColor(prediction.probability) }}>
                            {(prediction.probability * 100).toFixed(0)}%
                          </span>
                          <span className="text-xs text-slate-400">Probability</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-orange-400" />
                          <span className="text-sm text-orange-400">{prediction.timeline}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4 text-green-400" />
                          <span className="text-sm text-green-400">{prediction.confidence}%</span>
                          <span className="text-xs text-slate-400">Confidence</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {prediction.indicators.map((indicator, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 bg-slate-700/50 rounded text-xs text-slate-300"
                          >
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="ml-4 text-right">
                      <div
                        className="px-3 py-1 rounded-full text-xs font-bold mb-2"
                        style={{
                          backgroundColor: `${severityColors.bg}20`,
                          color: severityColors.text
                        }}
                      >
                        {prediction.severity}
                      </div>
                      <div className="text-xs text-slate-500">
                        {prediction.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>

                  {/* Probability Bar */}
                  <div className="mt-3">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-400">Threat Probability</span>
                      <span className="text-xs font-bold" style={{ color: getProbabilityColor(prediction.probability) }}>
                        {(prediction.probability * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-700/50 rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: getProbabilityColor(prediction.probability) }}
                        initial={{ width: 0 }}
                        animate={{ width: `${prediction.probability * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* AI Analysis Summary */}
        <div className="border-t border-slate-600/50 pt-4 mt-4">
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h4 className="text-white font-semibold">AI Analysis Summary</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-cyan-400 font-bold">
                  {predictions.filter(p => p.probability > 0.7).length} High-Risk
                </div>
                <div className="text-slate-400 text-xs">Predictions requiring attention</div>
              </div>
              <div>
                <div className="text-orange-400 font-bold">
                  {predictions.filter(p => p.severity === 'Critical').length} Critical
                </div>
                <div className="text-slate-400 text-xs">Immediate action required</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIThreatPredictor;
