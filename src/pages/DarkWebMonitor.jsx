import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Search, Shield, Store, Skull, ClipboardList, Target, Hash } from 'lucide-react'
import Card from '../components/Card'

function DarkWebMonitor() {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState(null)
  const [credentials, setCredentials] = useState([])
  const [marketplace, setMarketplace] = useState([])
  const [ransomware, setRansomware] = useState([])
  const [pastes, setPastes] = useState([])
  const [exposureScore, setExposureScore] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setLoading(true)
    try {
      const response = await fetch(`/api/darkweb/search?query=${encodeURIComponent(searchQuery)}`)
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [credsRes, marketRes, ransomRes, pastesRes, scoreRes] = await Promise.all([
          fetch('/api/darkweb/credentials?query=user@example.com'),
          fetch('/api/darkweb/market'),
          fetch('/api/darkweb/ransomware'),
          fetch('/api/darkweb/pastes'),
          fetch('/api/darkweb/score')
        ])

        setCredentials(await credsRes.json())
        setMarketplace(await marketRes.json())
        setRansomware(await ransomRes.json())
        setPastes(await pastesRes.json())
        setExposureScore(await scoreRes.json())
      } catch (error) {
        console.error('Data fetch error:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <Globe className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Dark Web Monitor</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Monitor dark web for your exposed credentials</p>

        {/* Search Leaks Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card hover={true}>
            <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" />
              Search Leaks (Email, Phone, Username, Domain)
            </h2>
            <div className="flex gap-4 mb-6">
              <input
                type="text"
                placeholder="Enter email, phone, username, or domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400"
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                onClick={handleSearch}
                disabled={loading}
                className="px-6 py-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 rounded-lg text-white font-medium transition-colors"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>

            {searchResults && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {searchResults.categories?.map((category, index) => (
                    <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <h3 className="text-sm font-medium text-slate-300 capitalize">{category.type}</h3>
                      <p className="text-lg font-bold text-cyan-400">{category.count}</p>
                      <p className="text-xs text-slate-400">{category.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Compromised Credentials List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <Card hover={true}>
            <h2 className="text-xl font-semibold text-cyan-400 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Compromised Credentials List
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-2 text-slate-300">Email / Username</th>
                    <th className="text-left py-2 text-slate-300">Password Hash</th>
                    <th className="text-left py-2 text-slate-300">Breach Source</th>
                    <th className="text-left py-2 text-slate-300">Date Exposed</th>
                  </tr>
                </thead>
                <tbody>
                  {credentials?.credentials?.slice(0, 5).map((cred, index) => (
                    <tr key={index} className="border-b border-slate-800/50">
                      <td className="py-3 text-slate-200">{cred.email || cred.username}</td>
                      <td className="py-3 font-mono text-xs text-slate-400">{cred.passwordHash}</td>
                      <td className="py-3 text-slate-200">{cred.breachSource}</td>
                      <td className="py-3 text-slate-300">
                        {new Date(cred.dateExposed).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </motion.div>

        {/* Dark Web Marketplace Mentions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-8"
        >
          <Card hover={true}>
            <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              <Store className="w-5 h-5" />
              Dark Web Marketplace Mentions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketplace?.listings?.map((listing, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-medium text-slate-300">{listing.marketplace}</span>
                    <span className="text-cyan-400 font-bold">{listing.price}</span>
                  </div>
                  <h3 className="text-slate-200 font-medium mb-2">{listing.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Rating: {listing.sellerRating}/5</span>
                    <span className="text-xs text-orange-400">{listing.availability}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Ransomware Activity Monitor */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mb-8"
        >
          <Card hover={true}>
            <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              <Skull className="w-5 h-5" />
              Ransomware Activity Monitor
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ransomware?.groups?.map((group, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-red-400">{group.name}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      group.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                      group.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {group.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-200 mb-2">
                    <span className="text-slate-400">Victims:</span> {group.recentVictims.join(', ')}
                  </p>
                  <p className="text-slate-200">
                    <span className="text-slate-400">Country:</span> {group.country}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Pastebin / Telegram Leaks */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
          className="mb-8"
        >
          <Card hover={true}>
            <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              <ClipboardList className="w-5 h-5" />
              Pastebin / Telegram Leaks
            </h2>
            <div className="space-y-4">
              {pastes?.leaks?.slice(0, 5).map((leak, index) => (
                <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      {leak.source === 'pastebin' ? (
                        <ClipboardList className="w-4 h-4 text-green-400" />
                      ) : (
                        <Target className="w-4 h-4 text-blue-400" />
                      )}
                      <span className="text-sm text-slate-300">{leak.source}</span>
                    </div>
                    <a
                      href={leak.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 text-sm"
                    >
                      View →
                    </a>
                  </div>
                  <p className="text-slate-200 mb-2">{leak.snippet}</p>
                  <div className="flex flex-wrap gap-2">
                    {leak.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-slate-700 text-xs text-slate-300 rounded"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Dark Web Exposure Score */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <Card hover={true}>
            <h2 className="text-xl font-semibold text-cyan-400 mb-6 flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Dark Web Exposure Score
            </h2>
            <div className="text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#334155"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke={
                      exposureScore?.score > 80 ? '#ef4444' :
                      exposureScore?.score > 60 ? '#f97316' :
                      exposureScore?.score > 40 ? '#eab308' :
                      '#22c55e'
                    }
                    strokeWidth="2"
                    strokeDasharray={`${exposureScore?.score || 0}, 100`}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{exposureScore?.score || 0}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {exposureScore?.score > 80 ? 'High Risk' :
                 exposureScore?.score > 60 ? 'Medium Risk' :
                 exposureScore?.score > 40 ? 'Low Risk' : 'Very Low Risk'}
              </h3>
              <p className="text-slate-400 mb-4">{exposureScore?.description}</p>
              <div className="space-y-2 text-left">
                <h4 className="font-medium text-slate-300">Recommendations:</h4>
                <ul className="text-sm text-slate-400 space-y-1">
                  {exposureScore?.recommendations?.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-cyan-400 mt-1">•</span>
                      {rec}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default DarkWebMonitor
