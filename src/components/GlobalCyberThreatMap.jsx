import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Authentic Project Color Palette - SentinelAI Theme
const COLORS = {
  neon_purple: '#6A5AE0',
  neon_blue: '#5BC8F8',
  aqua_glow: '#5BC8F8',
  dark_base: '#0B0F29',
  dark_secondary: '#061122',
  dark_tertiary: '#0D2340',
  red_alert: '#FF4D4D',
  orange_alert: '#FF9F45',
  yellow_alert: '#FFD645'
};

// Country-wise threat data
const countryThreatData = [
  { country: 'United States', code: 'us', attacks: 28470, breaches: 49321, level: 'High', color: COLORS.orange_alert },
  { country: 'China', code: 'cn', attacks: 19284, breaches: 34592, level: 'Critical', color: COLORS.red_alert },
  { country: 'Russia', code: 'ru', attacks: 12875, breaches: 28944, level: 'High', color: COLORS.orange_alert },
  { country: 'India', code: 'in', attacks: 9877, breaches: 21346, level: 'Medium', color: COLORS.yellow_alert },
  { country: 'UK', code: 'gb', attacks: 8744, breaches: 18924, level: 'High', color: COLORS.orange_alert },
  { country: 'Japan', code: 'jp', attacks: 6544, breaches: 14346, level: 'Medium', color: COLORS.yellow_alert },
  { country: 'Germany', code: 'de', attacks: 7655, breaches: 15674, level: 'Medium', color: COLORS.yellow_alert },
  { country: 'France', code: 'fr', attacks: 5877, breaches: 13360, level: 'Medium', color: COLORS.yellow_alert },
  { country: 'Canada', code: 'ca', attacks: 4322, breaches: 9877, level: 'Low', color: COLORS.aqua_glow },
  { country: 'Australia', code: 'au', attacks: 2870, breaches: 6543, level: 'Low', color: COLORS.aqua_glow },
  { country: 'Brazil', code: 'br', attacks: 3219, breaches: 7655, level: 'Medium', color: COLORS.yellow_alert },
  { country: 'South Korea', code: 'kr', attacks: 6544, breaches: 14347, level: 'High', color: COLORS.orange_alert }
];

const CountryThreatBar = ({ data, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.05, duration: 0.5 }}
    className="flex items-center space-x-4 py-3 px-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
  >
    <div className="flex items-center space-x-3 min-w-[120px]">
      <div
        className="w-3 h-3 rounded-full"
        style={{
          backgroundColor: data.color,
          boxShadow: `0 0 10px ${data.color}60`
        }}
      />
      <span className="text-white font-medium text-sm uppercase">{data.code}</span>
    </div>

    <div className="flex-1 space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-white/70 text-sm">{data.country}</span>
        <span className="text-white font-semibold text-sm">{data.attacks.toLocaleString()}</span>
      </div>

      <div className="flex items-center space-x-2">
        <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((data.attacks / 30000) * 100, 100)}%` }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.8 }}
            className="h-full rounded-full"
            style={{ backgroundColor: data.color }}
          />
        </div>

        <span
          className="px-2 py-1 rounded-full text-xs font-bold uppercase whitespace-nowrap"
          style={{
            backgroundColor: `${data.color}30`,
            color: data.color,
            border: `1px solid ${data.color}50`
          }}
        >
          {data.level}
        </span>
      </div>
    </div>
  </motion.div>
);

const GlobalCyberThreatMap = () => {
  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 shadow-glow">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Global Cyber Threat Map</h3>
            <p className="text-slate-400 text-sm">Country-wise threat analysis</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm">LIVE</span>
            </div>

            <div
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: `${COLORS.neon_blue}20`,
                color: COLORS.neon_blue,
                border: `1px solid ${COLORS.neon_blue}40`
              }}
            >
              {countryThreatData.length} Countries
            </div>
          </div>
        </div>

        {/* Threat Legend */}
        <div className="flex items-center space-x-6 mb-4">
          {[
            { label: 'Critical', color: COLORS.red_alert },
            { label: 'High', color: COLORS.orange_alert },
            { label: 'Medium', color: COLORS.yellow_alert },
            { label: 'Low', color: COLORS.aqua_glow }
          ].map(({ label, color }) => (
            <div key={label} className="flex items-center space-x-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor: color,
                  filter: `drop-shadow(0 0 8px ${color}60)`
                }}
              />
              <span className="text-slate-400 text-xs">{label}</span>
            </div>
          ))}
        </div>

        {/* Country List */}
        <div className="flex-1 overflow-y-auto space-y-1">
          {countryThreatData
            .sort((a, b) => b.attacks - a.attacks)
            .map((country, index) => (
              <CountryThreatBar key={country.code} data={country} index={index} />
            ))}
        </div>

        {/* Stats Summary */}
        <div className="border-t border-slate-600/50 pt-4 mt-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-white">
                {countryThreatData.reduce((sum, c) => sum + c.attacks, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Total Daily Attacks</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-white">
                {countryThreatData.filter(c => c.level === 'Critical').length}
              </div>
              <div className="text-xs text-slate-400">Critical Countries</div>
            </div>

            <div>
              <div className="text-2xl font-bold text-white">
                {countryThreatData.reduce((sum, c) => sum + c.breaches, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Total Breaches</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalCyberThreatMap;
