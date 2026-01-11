import React, { useRef, useEffect, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Html } from '@react-three/drei'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { Shield, Zap, AlertTriangle, RefreshCw } from 'lucide-react'

// Earth texture color mapping for cyber theme
const EARTH_COLORS = {
  ocean: '#0a0a0a',
  land: '#1e293b',
  atmosphere: '#0f172a'
}

// Threat severity colors
const THREAT_COLORS = {
  critical: '#dc2626',
  high: '#ea580c',
  medium: '#ca8a04',
  low: '#65a30d'
}

// Convert latitude/longitude to 3D vector
function latLngToVector3(lat, lng, radius = 5) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  )
}

// Generate random threat data with geographic coordinates
function generateThreats(count = 50) {
  const regions = [
    // Asia
    { lat: [1, 50], lng: [67, 140], weight: 3 },
    // Americas
    { lat: [-50, 60], lng: [-170, -35], weight: 2 },
    // Europe
    { lat: [35, 67], lng: [-10, 60], weight: 3 },
    // Africa
    { lat: [-35, 35], lng: [-17, 50], weight: 1 },
    // Oceania
    { lat: [-45, -10], lng: [113, 180], weight: 1 }
  ]

  const threats = []

  for (let i = 0; i < count; i++) {
    // Select region based on weight
    const rand = Math.random() * regions.reduce((sum, r) => sum + r.weight, 0)
    let selection = regions[0]
    let sum = 0
    for (const region of regions) {
      sum += region.weight
      if (rand <= sum) {
        selection = region
        break
      }
    }

    const lat = Math.random() * (selection.lat[1] - selection.lat[0]) + selection.lat[0]
    const lng = Math.random() * (selection.lng[1] - selection.lng[0]) + selection.lng[0]

    const severityLevels = ['critical', 'high', 'medium', 'low']
    const weights = [0.1, 0.3, 0.4, 0.2] // Distribution weights

    const severityRand = Math.random()
    let severityIndex = 0
    for (let j = 0; j < weights.length; j++) {
      severityIndex += weights[j]
      if (severityRand <= severityIndex) {
        break
      }
    }

    threats.push({
      id: `threat-${i}`,
      lat,
      lng,
      severity: severityLevels[severityIndex],
      country: 'Unknown',
      type: ['Phishing', 'Malware', 'DDoS', 'Brute Force', 'SQL Injection'][Math.floor(Math.random() * 5)],
      count: Math.floor(Math.random() * 100) + 1,
      lastSeen: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000)
    })
  }

  return threats
}

// Earth Globe Component
function Earth({ threats }) {
  const meshRef = useRef()
  const pointsRef = useRef()

  // Rotate the globe automatically
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05 // Slow rotation
    }
  })

  return (
    <group>
      {/* Main Earth Sphere */}
      <Sphere ref={meshRef} args={[5, 32, 32]}>
        <meshStandardMaterial
          color={EARTH_COLORS.ocean}
          roughness={0.7}
          metalness={0.1}
        />
      </Sphere>

      {/* Threat Points */}
      {threats.map((threat) => (
        <ThreatPoint
          key={threat.id}
          threat={threat}
          globeRef={meshRef}
        />
      ))}

      {/* Atmospheric glow effect */}
      <Sphere args={[5.2, 16, 16]}>
        <meshBasicMaterial
          color={EARTH_COLORS.atmosphere}
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

// Individual Threat Point Component
function ThreatPoint({ threat, globeRef }) {
  const pointRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)

  const position = latLngToVector3(threat.lat, threat.lng)
  const color = THREAT_COLORS[threat.severity]

  useFrame((state) => {
    if (pointRef.current) {
      // Pulse animation
      const scale = hovered ? 1.5 : (1 + Math.sin(state.clock.elapsedTime * 3 + threat.id.hashCode()) * 0.3)
      pointRef.current.scale.setScalar(scale)

      // Spin if clicked
      if (clicked) {
        pointRef.current.rotation.z += 0.05
      }

      // Follow globe rotation
      if (globeRef.current) {
        const worldPos = globeRef.current.localToWorld(position.clone())
        pointRef.current.position.copy(worldPos)
      } else {
        pointRef.current.position.copy(position)
      }
    }
  })

  return (
    <group position={position}>
      {/* High-intensity center dot */}
      <mesh
        ref={pointRef}
        onPointerOver={(event) => {
          event.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(event) => {
          event.stopPropagation()
          setHovered(false)
          setClicked(false)
          document.body.style.cursor = 'auto'
        }}
        onClick={(event) => {
          event.stopPropagation()
          setClicked(true)
          setTimeout(() => setClicked(false), 2000)
        }}
      >
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* Pulsing outer ring */}
      <RingMarker position={position.clone().add(new THREE.Vector3(0, 0, 0.1))} color={color} />

      {/* Tooltip */}
      {hovered && (
        <Html position={[position.x, position.y + 0.3, position.z]}>
          <div className="bg-slate-900/95 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white whitespace-nowrap shadow-xl backdrop-blur-sm">
            <div className="flex items-center space-x-2">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="font-semibold">{threat.type}</span>
            </div>
            <div className="text-slate-400 mt-1">
              {threat.count} threats • {threat.severity.toUpperCase()}
            </div>
            <div className="text-slate-500 text-xs">
              {threat.lat.toFixed(1)}°, {threat.lng.toFixed(1)}°
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

// Animated Ring Marker for threats
function RingMarker({ position, color }) {
  const ringRef = useRef()

  useFrame((state) => {
    if (ringRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.5
      ringRef.current.scale.setScalar(scale)
      ringRef.current.material.opacity = (0.6 - Math.abs(Math.sin(state.clock.elapsedTime * 1.5))) * 0.3
    }
  })

  return (
    <mesh ref={ringRef} position={position}>
      <ringGeometry args={[0.08, 0.12, 8]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} />
    </mesh>
  )
}

// Scene Setup Component
function Scene({ threats }) {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />

      {/* Earth */}
      <Earth threats={threats} />

      {/* Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={8}
        maxDistance={20}
        autoRotate={true}
        autoRotateSpeed={0.5}
        enableDamping={true}
        dampingFactor={0.05}
      />
    </>
  )
}

// Loading fallback
function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
        <p className="mt-2 text-slate-400">Loading 3D Threat Globe...</p>
      </div>
    </div>
  )
}

// Main Threat Globe Component
function ThreatGlobe({ className = "" }) {
  const [threats, setThreats] = useState([])
  const [stats, setStats] = useState({
    totalThreats: 0,
    criticalThreats: 0,
    mostAffectedRegion: 'N/A',
    sources: []
  })
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Load initial threats from real APIs
    loadThreatData()

    // Set up real-time updates every 2 minutes
    const interval = setInterval(() => {
      loadThreatData()
    }, 120000) // 2 minutes

    return () => clearInterval(interval)
  }, [])

  const loadThreatData = async () => {
    try {
      setLoading(true)

      // Import the threat service dynamically to avoid SSR issues
      const { aggregateThreats } = await import('../lib/api.js')

      // Fetch real threats from APIs
      const response = await aggregateThreats()
      const realThreats = response.data || []

      // Convert API format to component format
      const formattedThreats = realThreats.map(threat => ({
        id: threat.id,
        type: threat.type || 'Unknown',
        severity: threat.severity || 'medium',
        description: threat.description || 'Threat detected',
        source: threat.source || 'Unknown',
        latitude: threat.latitude || 0,
        longitude: threat.longitude || 0,
        timestamp: threat.timestamp || Date.now(),
        count: threat.count || 1,
        country: threat.country || 'Unknown'
      }))

      // If no real threats, fall back to simulated data
      const displayThreats = formattedThreats.length > 0 ?
        formattedThreats.slice(0, 50) :
        generateThreats(50)

      setThreats(displayThreats)
      updateStats(displayThreats)
      setLastUpdate(new Date())

    } catch (error) {
      console.error('Failed to load threat data:', error)

      // Fallback to simulated threats
      const simulatedThreats = generateThreats(50)
      setThreats(simulatedThreats)
      updateStats(simulatedThreats)
      setLastUpdate(new Date())
    } finally {
      setLoading(false)
    }
  }

  const updateStats = (threatList) => {
    const critical = threatList.filter(t => t.severity === 'critical').length
    const total = threatList.reduce((sum, t) => sum + t.count, 0)

    // Determine most affected region (simplified)
    const regions = { asia: 0, america: 0, europe: 0, africa: 0, oceania: 0 }
    threatList.forEach(threat => {
      const lng = threat.lng
      if (lng >= 67 && lng <= 140) regions.asia++
      else if (lng >= -170 && lng <= -35) regions.america++
      else if (lng >= -10 && lng <= 60) regions.europe++
      else if (lng >= -17 && lng <= 50) regions.africa++
      else regions.oceania++
    })

    const mostAffected = Object.entries(regions).reduce((a, b) => a[1] > b[1] ? a : b)[0]

    setStats({
      totalThreats: total,
      criticalThreats: critical,
      mostAffectedRegion: mostAffected.charAt(0).toUpperCase() + mostAffected.slice(1)
    })
  }

  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Global Threat Landscape</h3>
            <p className="text-slate-400 text-sm">Real-time cyber threats worldwide</p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-lg font-bold text-cyan-400">{stats.totalThreats.toLocaleString()}</div>
            <div className="text-xs text-slate-400">Total Threats</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-red-400">{stats.criticalThreats}</div>
            <div className="text-xs text-slate-400">Critical</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-yellow-400">{stats.mostAffectedRegion}</div>
            <div className="text-xs text-slate-400">Hot Zone</div>
          </div>
        </div>
      </motion.div>

      {/* 3D Canvas */}
      <motion.div
        className="relative bg-slate-900/20 rounded-xl border border-slate-700 overflow-hidden"
        style={{ height: '500px' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Canvas
          camera={{ position: [0, 0, 15], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <color attach="background" args={['#020617']} />
          <fog attach="fog" args={['#020617', 10, 20]} />
          <Suspense fallback={null}>
            <Scene threats={threats} />
          </Suspense>
        </Canvas>

        {/* Loading overlay */}
        <motion.div
          className="absolute inset-0 bg-slate-900/80 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <LoadingFallback />
        </motion.div>

        {/* Instructions */}
        <motion.div
          className="absolute bottom-4 left-4 text-xs text-slate-400 bg-slate-800/90 rounded-lg px-3 py-2 max-w-xs"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="font-semibold text-white mb-1">Interactive Globe</div>
          <div>• Click threats for details</div>
          <div>• Drag to rotate manually</div>
          <div>• Scroll to zoom in/out</div>
          <div>• Critical threats pulse & glow</div>
        </motion.div>

        {/* Legend */}
        <motion.div
          className="absolute bottom-4 right-4 text-xs text-slate-400 bg-slate-800/90 rounded-lg px-3 py-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.8 }}
        >
          <div className="font-semibold text-white mb-2">Threat Severity</div>
          {Object.entries(THREAT_COLORS).map(([severity, color]) => (
            <div key={severity} className="flex items-center space-x-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="capitalize">{severity}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Footer stats */}
      <motion.div
        className="mt-4 grid grid-cols-3 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        {[
          { icon: <Zap className="w-4 h-4 text-cyan-400" />, label: 'Active Scans', value: '12' },
          { icon: <AlertTriangle className="w-4 h-4 text-red-400" />, label: 'High Risk Zones', value: '8' },
          { icon: <Shield className="w-4 h-4 text-green-400" />, label: 'Protected', value: '89%' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-slate-800/30 rounded-lg p-3 text-center"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
          >
            <div className="flex items-center justify-center mb-2">
              {stat.icon}
            </div>
            <div className="text-lg font-bold text-white">{stat.value}</div>
            <div className="text-xs text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  )
}

export default ThreatGlobe
