import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import { AlertTriangle, Activity } from 'lucide-react'
import 'leaflet/dist/leaflet.css'

// Fix for default markers
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Custom threat icon
const createThreatIcon = (severity) => {
  const colors = {
    critical: '#dc2626',
    high: '#ea580c',
    medium: '#ca8a04',
    low: '#65a30d'
  }

  return L.divIcon({
    html: `<div style="width:25px;height:25px;background-color:${colors[severity]};border:2px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:10px;box-shadow:0 2px 8px rgba(0,0,0,0.3);animation:pulse 2s infinite">@keyframes pulse{0%{transform:scale(1);opacity:1}50%{transform:scale(1.1);opacity:0.8}100%{transform:scale(1);opacity:1}}</div>`,
    className: 'threat-marker',
    iconSize: [25, 25],
    iconAnchor: [12, 12]
  })
}

// Threat data
const THREAT_DATA = [
  { id: 'us', country: 'New York, USA', lat: 40.7128, lng: -74.0060, attacks: 28470, level: 'Critical', type: 'IP Attacks' },
  { id: 'cn', country: 'Beijing, China', lat: 39.9042, lng: 116.4074, attacks: 19284, level: 'High', type: 'Malware' },
  { id: 'gb', country: 'London, UK', lat: 51.5074, lng: -0.1278, attacks: 8744, level: 'High', type: 'DDoS' },
  { id: 'jp', country: 'Tokyo, Japan', lat: 35.6762, lng: 139.6503, attacks: 6544, level: 'Medium', type: 'Phishing' },
  { id: 'de', country: 'Berlin, Germany', lat: 52.5200, lng: 13.4050, attacks: 7655, level: 'Medium', type: 'SQL Injection' },
  { id: 'fr', country: 'Paris, France', lat: 48.8566, lng: 2.3522, attacks: 5877, level: 'Medium', type: 'Brute Force' },
  { id: 'in', country: 'Delhi, India', lat: 28.7041, lng: 77.1025, attacks: 9877, level: 'Medium', type: 'Phishing' }
]

const LeafletGlobalThreatMap = () => {
  const [threats] = useState(THREAT_DATA)
  const [liveThreats, setLiveThreats] = useState([])

  useEffect(() => {
    // Add live threats periodically
    const interval = setInterval(() => {
      const newThreat = {
        id: `live_${Date.now()}`,
        country: 'Live Attack',
        lat: (Math.random() - 0.5) * 180,
        lng: (Math.random() - 0.5) * 360,
        attacks: Math.floor(Math.random() * 50) + 1,
        level: Math.random() > 0.7 ? 'Critical' : 'High',
        type: 'Live Attack',
        timestamp: new Date()
      }
      setLiveThreats(prev => [newThreat, ...prev.slice(0, 3)])
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl overflow-hidden relative">
      {/* Header */}
      <div className="absolute top-4 left-4 z-[1000] bg-slate-800/90 backdrop-blur-sm rounded-lg px-4 py-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-white text-sm font-medium">LIVE INTERACTIVE MAP</span>
        </div>
      </div>

      {/* Map */}
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        className="rounded-xl"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Regular Threat Markers */}
        {threats.map((threat) => (
          <Marker
            key={threat.id}
            position={[threat.lat, threat.lng]}
            icon={createThreatIcon(threat.level.toLowerCase())}
          >
            <Popup>
              <div className="p-3">
                <h3 className="font-bold text-lg mb-2">{threat.country}</h3>
                <div className="space-y-1 text-sm">
                  <div>Attacks: <strong>{threat.attacks.toLocaleString()}</strong></div>
                  <div>Type: <strong>{threat.type}</strong></div>
                  <div>Severity: <strong className={
                    threat.level === 'Critical' ? 'text-red-600' :
                    threat.level === 'High' ? 'text-orange-600' : 'text-yellow-600'
                  }>{threat.level}</strong></div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Live Threat Markers */}
        {liveThreats.map((threat) => (
          <Marker
            key={threat.id}
            position={[threat.lat, threat.lng]}
            icon={L.divIcon({
              html: `<div style="width:30px;height:30px;background-color:#ff4444;border:2px solid white;border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:12px;box-shadow:0 2px 8px rgba(255,68,68,0.6);animation:pulse 1s infinite">@keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.3)}100%{transform:scale(1)}}</div>`,
              className: 'live-marker',
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            })}
          >
            <Popup>
              <div className="p-3">
                <div className="flex items-center space-x-2 mb-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <h3 className="font-bold text-red-600">LIVE ATTACK!</h3>
                </div>
                <p className="text-sm">{threat.type}</p>
                <p className="text-xs text-gray-600 mt-1">
                  {new Date(threat.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-slate-800/90 backdrop-blur-sm rounded-lg p-3">
        <h4 className="text-white font-semibold mb-2 text-sm">Threat Levels</h4>
        <div className="space-y-1">
          {[
            { level: 'Critical', color: '#dc2626' },
            { level: 'High', color: '#ea580c' },
            { level: 'Medium', color: '#ca8a04' },
            { level: 'Low', color: '#65a30d' }
          ].map(({ level, color }) => (
            <div key={level} className="flex items-center space-x-2">
              <div className="w-3 h-3 rounded-full border border-white" style={{ backgroundColor: color }}></div>
              <span className="text-white text-xs">{level}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Feed */}
      <div className="absolute bottom-4 right-4 w-80 bg-slate-800/90 backdrop-blur-sm rounded-lg p-4 max-h-48 overflow-y-auto">
        <h4 className="text-white font-semibold mb-2 flex items-center space-x-2">
          <Activity className="w-4 h-4 text-cyan-400" />
          <span>Live Threat Feed</span>
        </h4>
        <div className="space-y-2">
          {liveThreats.length === 0 ? (
            <div className="text-slate-400 text-sm text-center py-4">
              Monitoring global threats...
            </div>
          ) : (
            liveThreats.map((threat) => (
              <div key={threat.id} className="flex items-center justify-between bg-slate-700/50 rounded p-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-white text-sm">{threat.type}</span>
                </div>
                <span className="text-slate-400 text-xs">
                  {new Date(threat.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default LeafletGlobalThreatMap
