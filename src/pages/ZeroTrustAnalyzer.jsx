import { motion } from 'framer-motion'
import { Shield, User, Monitor, AlertTriangle, Wifi, Key, TrendingUp, CheckCircle } from 'lucide-react'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts'

// Mock data for all sections
const identityTrust = {
  score: 74,
  risk: "Medium",
  mfa: true,
  passwordStrength: "Strong",
  privilegeLevel: "Standard User",
};

const deviceTrust = {
  score: 68,
  os: "Windows 11",
  antivirus: true,
  updates: "Outdated",
  reputation: "Medium",
};

const sessionRisk = {
  score: 55,
  loginTime: "Anomalous",
  ipReputation: "Medium",
  geoChange: "Yes",
  fingerprintChange: false,
};

const networkTrust = {
  wifi: "WPA2",
  exposure: "Medium",
  trafficAlerts: 9,
};

const decision = {
  result: "Step-Up Authentication Required",
  reasons: [
    "Geo-location mismatch",
    "Device OS outdated",
  ],
};

const trustRadar = {
  identity: 74,
  device: 68,
  network: 60,
  session: 55,
};

const recommendations = [
  "Enable MFA for higher identity trust",
  "Update OS to reduce device risk",
  "Verify location-based access",
  "Improve WiFi security configuration"
];

function ZeroTrustAnalyzer() {
  // Identity Trust Score section
  const IdentityTrustScore = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-slate-200"
    >
      <div className="flex items-center space-x-3 mb-4">
        <User className="w-6 h-6 text-blue-400" />
        <h3 className="text-xl font-bold text-white">Identity Trust Score</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-cyan-400">{identityTrust.score}/100</p>
          <p className="text-slate-400">User Trust Score</p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${identityTrust.risk === 'Low' ? 'bg-green-500/20 text-green-400' : identityTrust.risk === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
            {identityTrust.risk} Risk
          </span>
          <p className="text-slate-400 text-sm mt-1">Risk Level</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">MFA enabled</span>
          <span className={`text-sm ${identityTrust.mfa ? 'text-green-400' : 'text-red-400'}`}>
            {identityTrust.mfa ? '✓ Enabled' : '✗ Disabled'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Password strength</span>
          <span className={`text-sm ${identityTrust.passwordStrength === 'Strong' ? 'text-green-400' : identityTrust.passwordStrength === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
            {identityTrust.passwordStrength}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Role/permissions risk</span>
          <span className="text-sm text-blue-400">{identityTrust.privilegeLevel}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Login frequency</span>
          <span className="text-sm text-green-400">Normal</span>
        </div>
      </div>
    </motion.div>
  );

  // Device Trust Score section
  const DeviceTrustScore = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-slate-200"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Monitor className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-bold text-white">Device Trust Score</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-cyan-400">{deviceTrust.score}/100</p>
          <p className="text-slate-400">Device Trust Score</p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${deviceTrust.reputation === 'High' ? 'bg-green-500/20 text-green-400' : deviceTrust.reputation === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
            {deviceTrust.reputation} Risk
          </span>
          <p className="text-slate-400 text-sm mt-1">Device reputation</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">OS update status</span>
          <span className={`text-sm ${deviceTrust.updates === 'Up-to-date' ? 'text-green-400' : 'text-red-400'}`}>
            {deviceTrust.updates}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Antivirus running</span>
          <span className={`text-sm ${deviceTrust.antivirus ? 'text-green-400' : 'text-red-400'}`}>
            {deviceTrust.antivirus ? '✓ Active' : '✗ Inactive'}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">OS version</span>
          <span className="text-sm text-blue-400">{deviceTrust.os}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Certificates validity</span>
          <span className="text-sm text-green-400">Valid</span>
        </div>
      </div>
    </motion.div>
  );

  // Session Risk Score section
  const SessionRiskScore = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-slate-200"
    >
      <div className="flex items-center space-x-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-yellow-400" />
        <h3 className="text-xl font-bold text-white">Session Risk Score</h3>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold text-cyan-400">{sessionRisk.score}/100</p>
          <p className="text-slate-400">Session Risk Score</p>
        </div>
        <div className="text-right">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${sessionRisk.score <= 50 ? 'bg-green-500/20 text-green-400' : sessionRisk.score <= 70 ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
            {sessionRisk.score <= 50 ? 'Low' : sessionRisk.score <= 70 ? 'Medium' : 'High'} Risk
          </span>
          <p className="text-slate-400 text-sm mt-1">Risk Level</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Login time risk</span>
          <span className={`text-sm ${sessionRisk.loginTime === 'Normal' ? 'text-green-400' : 'text-red-400'}`}>
            {sessionRisk.loginTime}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">IP risk score</span>
          <span className={`text-sm ${sessionRisk.ipReputation === 'Low' ? 'text-green-400' : sessionRisk.ipReputation === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
            {sessionRisk.ipReputation}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Geo-location consistency</span>
          <span className={`text-sm ${sessionRisk.geoChange === 'No' ? 'text-green-400' : 'text-red-400'}`}>
            {sessionRisk.geoChange}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Device fingerprint changes</span>
          <span className={`text-sm ${sessionRisk.fingerprintChange ? 'text-red-400' : 'text-green-400'}`}>
            {sessionRisk.fingerprintChange ? 'Detected' : 'None'}
          </span>
        </div>
      </div>
    </motion.div>
  );

  // Network Trust Panel
  const NetworkTrustPanel = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-slate-200"
    >
      <div className="flex items-center space-x-3 mb-4">
        <Wifi className="w-6 h-6 text-purple-400" />
        <h3 className="text-xl font-bold text-white">Network Trust Panel</h3>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-slate-300">WiFi security</span>
          <span className={`text-sm ${networkTrust.wifi === 'WPA3' ? 'text-green-400' : networkTrust.wifi === 'WPA2' ? 'text-yellow-400' : 'text-red-400'}`}>
            {networkTrust.wifi}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Connection stability</span>
          <span className="text-sm text-green-400">Stable</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Threat exposure score</span>
          <span className={`text-sm ${networkTrust.exposure === 'Low' ? 'text-green-400' : networkTrust.exposure === 'Medium' ? 'text-yellow-400' : 'text-red-400'}`}>
            {networkTrust.exposure}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-300">Suspicious network traffic count</span>
          <span className={`text-sm ${networkTrust.trafficAlerts === 0 ? 'text-green-400' : networkTrust.trafficAlerts <= 10 ? 'text-yellow-400' : 'text-red-400'}`}>
            {networkTrust.trafficAlerts} alerts
          </span>
        </div>
      </div>
    </motion.div>
  );

  // Zero Trust Decision Engine
  const ZeroTrustDecisionEngine = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-slate-200"
    >
      <div className="flex items-center space-x-3 mb-6">
        <Key className="w-6 h-6 text-red-400" />
        <h3 className="text-xl font-bold text-white">Zero Trust Decision Engine</h3>
      </div>

      <div className="text-center mb-6">
        <p className="text-2xl font-bold text-white mb-2">{decision.result}</p>
        <p className="text-slate-400">Access Decision</p>
      </div>

      <div className="space-y-3">
        <h4 className="text-lg font-semibold text-white mb-3">Reasoning:</h4>
        {decision.reasons.map((reason, index) => (
          <div key={index} className="flex items-center space-x-2 text-red-400">
            <span className="w-2 h-2 bg-red-400 rounded-full"></span>
            <span>{reason}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );

  // Trust Breakdown Radar Chart
  const TrustBreakdownRadar = () => {
    const radarData = [
      { subject: 'Identity', value: trustRadar.identity },
      { subject: 'Device', value: trustRadar.device },
      { subject: 'Network', value: trustRadar.network },
      { subject: 'Session', value: trustRadar.session },
    ];

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-slate-200"
      >
        <div className="flex items-center space-x-3 mb-6">
          <TrendingUp className="w-6 h-6 text-cyan-400" />
          <h3 className="text-xl font-bold text-white">Trust Breakdown Radar</h3>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData}>
              <PolarGrid stroke="#334155" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fill: '#94a3b8', fontSize: 10 }}
                tickCount={5}
              />
              <Radar
                name="Trust Score"
                dataKey="value"
                stroke="#06b6d4"
                fill="#06b6d4"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center">
            <p className="text-cyan-400 font-bold">{trustRadar.identity}%</p>
            <p className="text-slate-400 text-sm">Identity</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-400 font-bold">{trustRadar.device}%</p>
            <p className="text-slate-400 text-sm">Device</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-400 font-bold">{trustRadar.network}%</p>
            <p className="text-slate-400 text-sm">Network</p>
          </div>
          <div className="text-center">
            <p className="text-cyan-400 font-bold">{trustRadar.session}%</p>
            <p className="text-slate-400 text-sm">Session</p>
          </div>
        </div>
      </motion.div>
    );
  };

  // Recommendations
  const RecommendationsList = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
      className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl p-6 shadow-[0_0_20px_rgba(139,92,246,0.3)] text-slate-200"
    >
      <div className="flex items-center space-x-3 mb-6">
        <CheckCircle className="w-6 h-6 text-green-400" />
        <h3 className="text-xl font-bold text-white">AI Recommendations</h3>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex items-start space-x-3 p-3 bg-slate-800/50 rounded-lg">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
            <p className="text-slate-300">{rec}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Shield className="w-8 h-8 text-purple-400" />
          <h1 className="text-4xl font-bold neon-text">Zero Trust Access Analyzer</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Real-time trust assessment and access control decisions</p>

        {/* Grid layout for all sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <IdentityTrustScore />
          <DeviceTrustScore />
          <SessionRiskScore />
          <NetworkTrustPanel />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <ZeroTrustDecisionEngine />
          <TrustBreakdownRadar />
          <RecommendationsList />
        </div>
      </div>
    </div>
  );
}

export default ZeroTrustAnalyzer;
