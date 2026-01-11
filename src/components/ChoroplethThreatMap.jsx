import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

// Threat data with geographic coordinates for better positioning
const THREAT_DATA = [
  { country: 'United States', code: 'US', attacks: 28470, breaches: 49321, level: 'High', severity: 0.85, color: '#ea580c', lat: 39.8, lng: -98.6, region: 'North America' },
  { country: 'China', code: 'CN', attacks: 19284, breaches: 34592, level: 'Critical', severity: 0.95, color: '#dc2626', lat: 35.9, lng: 104.2, region: 'Asia' },
  { country: 'Russia', code: 'RU', attacks: 12875, breaches: 28944, level: 'High', severity: 0.80, color: '#ea580c', lat: 61.5, lng: 105.3, region: 'Europe' },
  { country: 'India', code: 'IN', attacks: 9877, breaches: 21346, level: 'Medium', severity: 0.65, color: '#ca8a04', lat: 20.6, lng: 78.9, region: 'Asia' },
  { country: 'United Kingdom', code: 'GB', attacks: 8744, breaches: 18924, level: 'High', severity: 0.75, color: '#ea580c', lat: 55.4, lng: -3.4, region: 'Europe' },
  { country: 'Japan', code: 'JP', attacks: 6544, breaches: 14346, level: 'Medium', severity: 0.60, color: '#ca8a04', lat: 36.2, lng: 138.3, region: 'Asia' },
  { country: 'Germany', code: 'DE', attacks: 7655, breaches: 15674, level: 'Medium', severity: 0.70, color: '#ca8a04', lat: 51.2, lng: 10.4, region: 'Europe' },
  { country: 'France', code: 'FR', attacks: 5877, breaches: 13360, level: 'Medium', severity: 0.55, color: '#ca8a04', lat: 46.2, lng: 2.2, region: 'Europe' },
  { country: 'Canada', code: 'CA', attacks: 4322, breaches: 9877, level: 'Low', severity: 0.35, color: '#65a30d', lat: 56.1, lng: -106.3, region: 'North America' },
  { country: 'Australia', code: 'AU', attacks: 2870, breaches: 6543, level: 'Low', severity: 0.30, color: '#65a30d', lat: -25.3, lng: 133.8, region: 'Oceania' },
  { country: 'Brazil', code: 'BR', attacks: 3219, breaches: 7655, level: 'Medium', severity: 0.50, color: '#ca8a04', lat: -14.2, lng: -51.9, region: 'South America' },
  { country: 'South Korea', code: 'KR', attacks: 6544, breaches: 14347, level: 'High', severity: 0.72, color: '#ea580c', lat: 35.9, lng: 127.8, region: 'Asia' },
  { country: 'Netherlands', code: 'NL', attacks: 5234, breaches: 11234, level: 'Medium', severity: 0.58, color: '#ca8a04', lat: 52.1, lng: 5.3, region: 'Europe' },
  { country: 'Singapore', code: 'SG', attacks: 4123, breaches: 9876, level: 'Medium', severity: 0.52, color: '#ca8a04', lat: 1.4, lng: 103.8, region: 'Asia' },
  { country: 'Israel', code: 'IL', attacks: 3876, breaches: 8765, level: 'High', severity: 0.68, color: '#ea580c', lat: 31.0, lng: 34.9, region: 'Middle East' },
  { country: 'UAE', code: 'AE', attacks: 2987, breaches: 6543, level: 'Medium', severity: 0.45, color: '#ca8a04', lat: 23.4, lng: 53.8, region: 'Middle East' }
];

// Convert lat/lng to SVG coordinates (simple mercator-like projection)
const latLngToSvg = (lat, lng, svgWidth = 600, svgHeight = 350) => {
  const x = ((lng + 180) / 360) * svgWidth;
  const y = ((90 - lat) / 180) * svgHeight;
  return { x, y };
};

// Simplified world map with country outlines
const WORLD_MAP_PATHS = {
  // North America
  'north-america': {
    outline: "M80,120 L130,100 L160,110 L180,130 L170,160 L140,170 L110,165 L90,155 Z",
    countries: {
      US: "M100,140 L150,120 L180,130 L170,160 L120,170 Z", // USA
      CA: "M80,120 L130,100 L150,120 L120,140 L90,135 Z", // Canada
    }
  },
  // South America
  'south-america': {
    outline: "M160,200 L190,180 L210,220 L200,260 L180,270 L160,250 Z",
    countries: {
      BR: "M170,200 L200,190 L210,240 L190,250 L170,230 Z", // Brazil
    }
  },
  // Europe
  'europe': {
    outline: "M280,100 L350,90 L370,120 L360,140 L330,145 L300,135 Z",
    countries: {
      RU: "M300,100 L380,90 L400,120 L370,130 L320,125 Z", // Russia (European part)
      DE: "M310,130 L340,125 L350,140 L330,145 Z", // Germany
      FR: "M290,140 L320,135 L330,150 L310,155 Z", // France
      GB: "M280,110 L310,105 L320,120 L300,125 Z", // UK
      NL: "M305,128 L315,125 L318,132 L310,135 Z", // Netherlands
    }
  },
  // Asia
  'asia': {
    outline: "M380,100 L500,90 L520,130 L510,160 L480,170 L450,165 L410,155 Z",
    countries: {
      CN: "M400,120 L480,110 L500,140 L470,150 L420,145 Z", // China
      IN: "M430,160 L470,150 L480,180 L450,185 Z", // India
      JP: "M510,130 L525,125 L530,140 L515,145 Z", // Japan
      KR: "M490,135 L510,130 L515,145 L495,150 Z", // South Korea
      SG: "M465,175 L475,170 L480,180 L470,185 Z", // Singapore
    }
  },
  // Middle East
  'middle-east': {
    outline: "M370,160 L420,155 L430,175 L410,185 Z",
    countries: {
      IL: "M385,170 L395,165 L400,175 L390,180 Z", // Israel
      AE: "M395,175 L410,170 L415,185 L400,190 Z", // UAE
    }
  },
  // Oceania
  'oceania': {
    outline: "M480,220 L530,210 L540,240 L520,250 Z",
    countries: {
      AU: "M485,225 L525,215 L535,245 L515,255 Z", // Australia
    }
  }
};

const ChoroplethThreatMap = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Calculate circle size based on attack volume and severity - FIXED: Much larger circles
  const getCircleSize = (attacks, severity) => {
    const baseSize = Math.sqrt(attacks) / 15; // Increased from /50 to /15 for visibility
    const severityMultiplier = 0.8 + (severity * 0.4); // 0.8 to 1.2 multiplier
    return Math.max(12, Math.min(40, baseSize * severityMultiplier)); // Increased min from 8 to 12, max from 25 to 40
  };

  // Get threat level color with better opacity
  const getCountryColor = (severity, isHovered, isSelected) => {
    const baseColors = {
      critical: { r: 220, g: 38, b: 38 },   // Red
      high: { r: 234, g: 88, b: 12 },       // Orange
      medium: { r: 202, g: 138, b: 4 },     // Yellow
      low: { r: 101, g: 163, b: 13 }        // Green
    };

    let level = 'low';
    if (severity >= 0.8) level = 'critical';
    else if (severity >= 0.7) level = 'high';
    else if (severity >= 0.5) level = 'medium';

    const color = baseColors[level];
    const intensity = severity;

    // Add hover/selected effects
    const hoverBoost = isHovered ? 0.3 : 0;
    const selectedBoost = isSelected ? 0.4 : 0;
    const finalIntensity = Math.min(1, intensity + hoverBoost + selectedBoost);

    return `rgba(${color.r}, ${color.g}, ${color.b}, ${0.7 + finalIntensity * 0.3})`;
  };

  // Handle mouse movement for tooltip positioning
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleCountryClick = (countryData, event) => {
    event.stopPropagation();
    setSelectedCountry(selectedCountry?.code === countryData.code ? null : countryData);
  };

  return (
    <div className="relative h-full w-full rounded-xl overflow-hidden bg-gradient-to-br from-slate-900/90 to-slate-800/90 border border-slate-700/50 shadow-glow">
      <div className="p-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Global Cyber Threat Map</h3>
            <p className="text-slate-400 text-sm">World map with country boundaries</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-slate-300 text-sm">LIVE</span>
            </div>

            <div
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{
                backgroundColor: '#6A5AE020',
                color: '#6A5AE0',
                border: '1px solid #6A5AE040'
              }}
            >
              {THREAT_DATA.length} Countries
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-6">
            {[
              { label: 'Critical', color: '#dc2626', range: '80%+' },
              { label: 'High', color: '#ea580c', range: '70-79%' },
              { label: 'Medium', color: '#ca8a04', range: '50-69%' },
              { label: 'Low', color: '#65a30d', range: '<50%' }
            ].map(({ label, color, range }) => (
              <div key={label} className="flex items-center space-x-2">
                <div
                  className="w-4 h-4 rounded-full border-2 border-white/30"
                  style={{ backgroundColor: color }}
                />
                <div className="text-xs">
                  <div className="text-white font-medium">{label}</div>
                  <div className="text-slate-400">{range}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Container */}
        <div className="flex-1 relative bg-slate-900/50 rounded-lg overflow-hidden">
          <svg
            viewBox="0 0 600 350"
            className="w-full h-full cursor-pointer"
            onMouseMove={handleMouseMove}
            style={{ filter: 'drop-shadow(0 0 20px rgba(110, 90, 224, 0.1))' }}
          >
            {/* Ocean background */}
            <rect width="600" height="350" fill="rgba(15, 23, 42, 0.9)" />

            {/* World map with continents and country boundaries */}
            {Object.entries(WORLD_MAP_PATHS).map(([continent, data]) => (
              <g key={continent}>
                {/* Continent outline */}
                <path
                  d={data.outline}
                  fill="rgba(71, 85, 105, 0.4)"
                  stroke="rgba(71, 85, 105, 0.6)"
                  strokeWidth="1"
                />
                {/* Country boundaries within continent */}
                {Object.entries(data.countries).map(([countryCode, path]) => (
                  <path
                    key={countryCode}
                    d={path}
                    fill="rgba(100, 116, 139, 0.3)"
                    stroke="rgba(148, 163, 184, 0.5)"
                    strokeWidth="0.8"
                  />
                ))}
              </g>
            ))}

            {/* Country threat circles */}
            {THREAT_DATA.map((country) => {
              const { x, y } = latLngToSvg(country.lat, country.lng);
              const isHovered = hoveredCountry === country.code;
              const isSelected = selectedCountry?.code === country.code;
              const circleSize = getCircleSize(country.attacks, country.severity);

              return (
                <motion.circle
                  key={country.code}
                  cx={x}
                  cy={y}
                  r={isSelected ? circleSize * 1.3 : isHovered ? circleSize * 1.2 : circleSize}
                  fill={getCountryColor(country.severity, isHovered, isSelected)}
                  stroke={isSelected ? '#ffffff' : isHovered ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)'}
                  strokeWidth={isSelected ? "3" : isHovered ? "2" : "1"}
                  className="cursor-pointer transition-all duration-200"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{
                    scale: 1,
                    opacity: 1,
                    r: isSelected ? circleSize * 1.3 : isHovered ? circleSize * 1.2 : circleSize
                  }}
                  transition={{
                    delay: Math.random() * 0.5,
                    duration: 0.3
                  }}
                  onMouseEnter={() => setHoveredCountry(country.code)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  onClick={(e) => handleCountryClick(country, e)}
                  style={{
                    filter: isSelected ? 'drop-shadow(0 0 12px rgba(255,255,255,0.6))' : 'none'
                  }}
                />
              );
            })}
          </svg>

          {/* Enhanced Tooltip */}
          {(hoveredCountry || selectedCountry) && (
            <motion.div
              className="absolute z-10 pointer-events-none"
              style={{
                left: mousePosition.x + 15,
                top: mousePosition.y - 10,
                transform: mousePosition.x > 300 ? 'translateX(-100%)' : 'none'
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <div className="bg-slate-800/95 backdrop-blur-sm rounded-lg p-4 max-w-xs border border-slate-600/50 shadow-xl">
                {(() => {
                  const country = THREAT_DATA.find(c => c.code === (hoveredCountry || selectedCountry?.code));
                  if (!country) return null;

                  return (
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: country.color }}
                        />
                        <h4 className="text-white font-semibold">{country.country}</h4>
                        <span className="text-xs text-slate-400">({country.region})</span>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Threat Level:</span>
                          <span className={`font-bold ${
                            country.level === 'Critical' ? 'text-red-400' :
                            country.level === 'High' ? 'text-orange-400' :
                            country.level === 'Medium' ? 'text-yellow-400' : 'text-green-400'
                          }`}>
                            {country.level}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Daily Attacks:</span>
                          <span className="text-white">{country.attacks.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Data Breaches:</span>
                          <span className="text-white">{country.breaches.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Severity Score:</span>
                          <span className="text-cyan-400">{(country.severity * 100).toFixed(0)}%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Coordinates:</span>
                          <span className="text-slate-300 font-mono text-xs">
                            {country.lat.toFixed(1)}°, {country.lng.toFixed(1)}°
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}
        </div>

        {/* Stats Summary */}
        <div className="border-t border-slate-600/50 pt-4 mt-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-white">
                {THREAT_DATA.reduce((sum, c) => sum + c.attacks, 0).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">Total Attacks</div>
            </div>

            <div>
              <div className="text-lg font-bold text-red-400">
                {THREAT_DATA.filter(c => c.level === 'Critical').length}
              </div>
              <div className="text-xs text-slate-400">Critical Zones</div>
            </div>

            <div>
              <div className="text-lg font-bold text-orange-400">
                {THREAT_DATA.filter(c => c.level === 'High').length}
              </div>
              <div className="text-xs text-slate-400">High Risk Areas</div>
            </div>

            <div>
              <div className="text-lg font-bold text-cyan-400">
                {(THREAT_DATA.reduce((sum, c) => sum + c.severity, 0) / THREAT_DATA.length * 100).toFixed(1)}%
              </div>
              <div className="text-xs text-slate-400">Avg Severity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChoroplethThreatMap;
