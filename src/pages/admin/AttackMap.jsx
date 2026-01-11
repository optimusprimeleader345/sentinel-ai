import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Zap,
  Eye,
  AlertCircle,
  TrendingUp,
  Activity,
  Target,
  Shield,
  Brain,
  Clock,
  MapPin
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
import { worldCountries, activeAttackFlows, attackPredictions, realTimeMetrics, threatClusters, emergingThreats } from '../../data/admin/attackMap';

// Simplified world map SVG paths for continents
const WorldMap = ({ selectedRegion, attackFlows, onCountryClick }) => {
  const width = 1600;
  const height = 800;

  // Convert lat/lng to SVG coordinates
  const latLngToSvg = (lat, lng) => {
    const x = (lng + 180) * (width / 360);
    const y = height - ((lat + 90) * (height / 180));
    return { x, y };
  };

  // Create curved path for attack flows
  const createAttackPath = (from, to, severity) => {
    const { x: x1, y: y1 } = latLngToSvg(from.lat, from.lng);
    const { x: x2, y: y2 } = latLngToSvg(to.lat, to.lng);

    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const cpX = (x1 + x2) / 2 + (x2 - x1) * 0.3;
    const cpY = (y1 + y2) / 2 - Math.min(distance * 0.2, 200);

    return `M ${x1} ${y1} Q ${cpX} ${cpY} ${x2} ${y2}`;
  };

  return (
    <svg
      width="100%"
      height="600"
      viewBox={`0 0 ${width} ${height}`}
      className="border border-slate-700/30 rounded-lg"
    >
      {/* Simplified world background */}
      <defs>
        <linearGradient id="world-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" stopOpacity="1" />
          <stop offset="50%" stopColor="#1e293b" stopOpacity="1" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#world-bg)" />

      {/* Simplified continents background */}
      <g opacity="0.1">
        <path d="M200 300 Q300 250 400 300 Q450 350 400 400 Q350 450 250 400 Q200 350 200 300 Z" fill="#3b82f6" opacity="0.2" />
        <path d="M600 200 Q750 150 900 250 Q850 350 700 400 Q600 450 500 350 Z" fill="#10b981" opacity="0.2" />
        <path d="M800 400 Q950 420 1050 500 Q1000 600 850 550 Q750 600 650 500 Z" fill="#f59e0b" opacity="0.2" />
        <path d="M300 600 Q450 650 550 600 Q500 700 400 720 Q250 680 200 620 Z" fill="#ef4444" opacity="0.2" />
      </g>

      {/* Active attack flows */}
      <AnimatePresence>
        {attackFlows.map((flow, index) => {
          const pathId = `attack-path-${flow.id}`;
          const colors = {
            critical: '#dc2626',
            high: '#ea580c',
            medium: '#ca8a04'
          };

          return (
            <g key={flow.id}>
              {/* Main attack path */}
              <path
                id={pathId}
                d={createAttackPath(flow.from, flow.to, flow.severity)}
                fill="none"
                stroke={colors[flow.severity]}
                strokeWidth="2"
                opacity="0.8"
                filter="drop-shadow(0 0 4px rgba(251, 146, 60, 0.6))"
              />

              {/* Animated moving dot */}
              <motion.circle
                r="3"
                fill={colors[flow.severity]}
                opacity="1"
                initial={{ offsetDistance: '0%' }}
                animate={{ offsetDistance: '100%' }}
                transition={{
                  duration: Math.max(8, 20 - flow.attacksPerHour * 0.3),
                  repeat: Infinity,
                  ease: "linear"
                }}
                filter="drop-shadow(0 0 6px rgba(251, 146, 60, 0.8))"
              >
                <animateMotion dur={`${Math.max(8, 20 - flow.attacksPerHour * 0.3)}s`} repeatCount="indefinite">
                  <mpath href={`#${pathId}`} />
                </animateMotion>
              </motion.circle>

              {/* Hover area envelope */}
              <path
                d={createAttackPath(flow.from, flow.to, flow.severity)}
                fill="none"
                stroke="transparent"
                strokeWidth="8"
                className="cursor-pointer"
                title={`${flow.from.country} → ${flow.to.country}: ${flow.type} (${flow.severity})`}
              />
            </g>
          );
        })}
      </AnimatePresence>

      {/* Country markers */}
      {worldCountries.map(country => {
        const { x, y } = latLngToSvg(country.lat, country.lng);
        const size = Math.min(8, Math.max(4, country.attacksOrigin * 0.0003 || country.receivedAttacks * 0.0002 || 4));

        return (
          <motion.circle
            key={country.id}
            cx={x}
            cy={y}
            r={country.id === selectedRegion ? size * 1.5 : size}
            fill={
              country.threatLevel === 'critical' ? '#dc2626' :
              country.threatLevel === 'high' ? '#ea580c' :
              country.attacksOrigin > 2000 ? '#dc2626' :
              country.attacksOrigin > 1000 ? '#ea580c' :
              country.growingThreats > 500 ? '#ca8a04' :
              country.monitoringLevel ? '#3b82f6' :
              '#06b6d4'
            }
            opacity={0.8}
            stroke="rgba(255,255,255,0.3)"
            strokeWidth="1"
            className="cursor-pointer hover:opacity-1"
            whileHover={{ scale: 1.3, r: size * 1.8 }}
            animate={country.attacksOrigin > 1000 ?
              { opacity: [0.6, 1, 0.6], scale: [1, 1.1, 1] } :
              { opacity: 0.7 }
            }
            transition={{ duration: 2, repeat: country.attacksOrigin > 1000 ? Infinity : 0 }}
            onClick={() => onCountryClick(country.id)}
            title={`${country.name}\n${country.attacksOrigin ? `Origin Attacks: ${country.attacksOrigin}` : country.receivedAttacks ? `Received Attacks: ${country.receivedAttacks}` : country.activeIncidents ? `Active Incidents: ${country.activeIncidents}` : ''}`}
          >
            <filter id={`glow-${country.id}`}>
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </motion.circle>
        );
      })}

      {/* Graticule grid */}
      <defs>
        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
          <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(100,116,139,0.1)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
};

const AttackMap = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [showPredictions, setShowPredictions] = useState(false);
  const [liveFlowCount] = useState(activeAttackFlows.length);

  const selectedCountryData = worldCountries.find(c => c.id === selectedRegion);

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
            <Globe className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
              Global Attack Map
            </h1>
            <p className="text-slate-400 text-sm">Real-time Geopolitical Intelligence & Attack Flow Visualization</p>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-semibold text-white">{liveFlowCount}</span>
            <span className="text-xs text-slate-400">Active Flows</span>
          </div>
          <div className="flex items-center space-x-2">
            <Target className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold text-white">48</span>
            <span className="text-xs text-slate-400">Countries Attacked</span>
          </div>
        </div>
      </motion.div>

      {/* Main Map Section */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">

        {/* Interactive World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="xl:col-span-3"
        >
          <GlassCard title="Live Attack Flows" icon={Activity} className="overflow-hidden">
            <WorldMap
              selectedRegion={selectedRegion}
              attackFlows={activeAttackFlows.slice(0, 3)}
              onCountryClick={setSelectedRegion}
            />
          </GlassCard>
        </motion.div>

        {/* Real-Time Intelligence Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <GlassCard title="Live Intelligence" icon={Eye} className="mb-6">
            <div className="space-y-4">
              {realTimeMetrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between"
                >
                  <span className="text-slate-300 text-sm">{metric.label}</span>
                  <div className="flex items-center space-x-2">
                    <span className={`text-xs px-2 py-1 rounded ${
                      metric.change.startsWith('+') ? 'bg-green-500/20 text-green-400' :
                      metric.change === '0' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {metric.change}
                    </span>
                    <span className="text-white font-semibold text-lg">{metric.value}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>

          {/* Threat Clusters */}
          <GlassCard title="Threat Clusters" icon={Target}>
            <div className="space-y-3">
              {threatClusters.slice(0, 3).map((cluster, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium text-sm">{cluster.cluster}</span>
                    <span className="text-xs text-green-400 bg-green-500/20 px-2 py-1 rounded">
                      {cluster.confidence}% AI
                    </span>
                  </div>
                  <div className="text-xs text-slate-400">
                    {cluster.attacks.toLocaleString()} attacks • {cluster.countries.join(', ')}
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Intelligence Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">

        {/* AI Predictions Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <GlassCard title="AI Threat Predictions" icon={Brain}>
            <div className="space-y-4">
              {attackPredictions.map((prediction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                  className="p-4 bg-slate-800/40 rounded-lg border border-slate-700/50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium">{prediction.region}</span>
                    <span className="text-cyan-400 font-bold text-xl">{prediction.probability}%</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm text-slate-400">{prediction.threat}</span>
                    <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">
                      {prediction.timeframe}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Expected Increase:</span>
                    <span className="text-red-400 font-semibold">+{prediction.expectedIncrease}</span>
                  </div>
                  <div className="mt-2">
                    <div className="text-xs text-green-400 mb-1">AI Confidence: {prediction.aiConfidence}%</div>
                    <div className="w-full bg-slate-700 rounded-full h-1">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-green-500 h-1 rounded-full"
                        style={{ width: `${prediction.probability}%` }}
                      ></div>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg transition-all font-semibold"
                onClick={() => setShowPredictions(!showPredictions)}
              >
                {showPredictions ? 'Hide Details' : 'View Full Analysis'}
              </motion.button>
            </div>
          </GlassCard>
        </motion.div>

        {/* Emerging Threats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <GlassCard title="Emerging Threats" icon={TrendingUp}>
            <div className="space-y-4">
              {emergingThreats.map((threat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="p-4 bg-gradient-to-r from-red-500/10 to-orange-500/10 rounded-lg border border-red-500/20"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <MapPin className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-white font-semibold text-sm">{threat.country}</div>
                      <div className="text-xs text-slate-400">{threat.threatType}</div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Trend:</span>
                      <span className="text-red-400 font-medium">{threat.trend}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-slate-400">Projected Growth:</span>
                      <span className="text-lg font-bold text-red-400">{threat.projectedIncrease}</span>
                    </div>
                    <div className="text-xs text-slate-500">{threat.timeframe}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

        {/* Country Intelligence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="xl:col-span-1"
        >
          <GlassCard title="Country Intelligence" icon={Globe}>
            {selectedCountryData ? (
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center p-4 bg-slate-800/40 rounded-lg border border-slate-700/50"
                >
                  <div className="text-2xl font-bold text-white mb-1">{selectedCountryData.name}</div>
                  <div className="text-sm text-slate-400">Selected Region</div>
                </motion.div>

                <div className="space-y-3">
                  {selectedCountryData.attacksOrigin && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Attack Origin Count:</span>
                      <span className="text-red-400 font-bold">{selectedCountryData.attacksOrigin.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedCountryData.receivedAttacks && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Received Attacks:</span>
                      <span className="text-yellow-400 font-bold">{selectedCountryData.receivedAttacks.toLocaleString()}</span>
                    </div>
                  )}
                  {selectedCountryData.activeIncidents && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Active Incidents:</span>
                      <span className="text-orange-400 font-bold">{selectedCountryData.activeIncidents}</span>
                    </div>
                  )}
                  {selectedCountryData.threatLevel && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Threat Level:</span>
                      <span className={`font-bold ${
                        selectedCountryData.threatLevel === 'critical' ? 'text-red-400' :
                        selectedCountryData.threatLevel === 'high' ? 'text-orange-400' :
                        'text-yellow-400'
                      }`}>
                        {selectedCountryData.threatLevel.toUpperCase()}
                      </span>
                    </div>
                  )}
                  {selectedCountryData.monitoringLevel && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Monitoring Level:</span>
                      <span className="text-blue-400 font-bold">{selectedCountryData.monitoringLevel.toUpperCase()}</span>
                    </div>
                  )}
                  {selectedCountryData.growingThreats && (
                    <div className="flex justify-between items-center">
                      <span className="text-slate-300 text-sm">Growing Threats:</span>
                      <span className="text-purple-400 font-bold">{selectedCountryData.growingThreats}</span>
                    </div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedRegion(null)}
                  className="w-full py-2 px-4 bg-slate-600/50 hover:bg-slate-600/70 text-slate-300 rounded-lg transition-colors"
                >
                  Clear Selection
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Globe className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                <p className="text-slate-400 text-sm">Click on a country marker to view detailed intelligence</p>
                <div className="mt-4 text-xs text-slate-500">
                  • Red = Critical Threats<br/>
                  • Orange = High Threats<br/>
                  • Yellow = Medium Threats<br/>
                  • Blue = Monitoring
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>

      {/* AI Intelligence Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Brain className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Global AI Threat Intelligence</h2>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="text-slate-400">Last Updated:</div>
              <div className="text-cyan-400 font-semibold flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>Live Stream</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-r from-slate-800/60 to-slate-800/40 rounded-lg p-6 border border-slate-700/50">
            <div className="flex items-start space-x-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full flex-shrink-0 mt-1"
              />
              <div>
                <p className="text-slate-300 leading-relaxed mb-4">
                  <strong>AI Analysis:</strong> Global threat patterns showing coordinated attack campaigns across multiple regions.
                  Chinese APT clusters exhibit sophisticated targeting of critical infrastructure with {attackPredictions[0].probability}% probability
                  of escalation in Eastern Europe within 48 hours. Iranian disruption patterns have increased by 67% in Southeast Asia
                  with predicted expansion to Middle Eastern targets by {attackPredictions[2].timeframe}.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-cyan-400 font-bold text-lg">94</div>
                    <div className="text-slate-400">Active Attack Paths</div>
                  </div>
                  <div className="text-center">
                    <div className="text-purple-400 font-bold text-lg">127</div>
                    <div className="text-slate-400">Surveillance Points</div>
                  </div>
                  <div className="text-center">
                    <div className="text-blue-400 font-bold text-lg">89</div>
                    <div className="text-slate-400">Protected Health Facilities</div>
                  </div>
                  <div className="text-center">
                    <div className="text-green-400 font-bold text-lg">142</div>
                    <div className="text-slate-400">Financial Systems Monitored</div>
                  </div>
                </div>
                <div className="mt-4 flex items-center space-x-6 text-sm text-slate-400 border-t border-slate-700/50 pt-4">
                  <span>• Pattern Recognition: 96% accuracy</span>
                  <span>• Anomaly Detection: Active</span>
                  <span>• Behavioral Clusters: {threatClusters.length} identified</span>
                  <span>• Real-time Processing: Enabled</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </>
  );
};

export default AttackMap;
