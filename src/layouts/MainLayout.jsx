function MainLayout({ children }) {
  console.log('MainLayout rendering')

  try {
    return (
      <div className="min-h-screen bg-[#0a0e27] w-full" style={{ minHeight: '100vh', width: '100%', color: 'white', display: 'flex' }}>
        <div className="relative w-[270px] bg-gradient-to-b from-slate-900 to-slate-800 border-r border-purple-500/20 shadow-[0_0_20px_rgba(139,69,19,0.3)]">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-cyan-500/10" />
          <div className="relative p-6">
            <div className="mb-8">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-2">SentinelAI</h3>
              <p className="text-xs text-slate-400">Cyber Defense Platform</p>
            </div>
            <nav className="space-y-2">
              <div className="px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 text-cyan-300 cursor-pointer hover:bg-cyan-500/30 transition-colors">
                <p className="text-sm font-semibold">Dashboard</p>
              </div>
              <div className="px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-300 cursor-pointer">
                <p className="text-sm">Threat Overview</p>
              </div>
              <div className="px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-300 cursor-pointer">
                <p className="text-sm">AI Defense Bot</p>
              </div>
              <div className="px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-300 cursor-pointer">
                <p className="text-sm">AI Guardian</p>
              </div>
              <div className="px-4 py-3 rounded-lg hover:bg-slate-700/50 transition-colors text-slate-300 cursor-pointer">
                <p className="text-sm">Deepfake Detector</p>
              </div>
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="text-center">
                <div className="w-10 h-1.5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full mx-auto mb-2 animate-pulse" />
                <p className="text-xs text-slate-500">AI Systems Online</p>
              </div>
            </div>
          </div>
        </div>
        <main className="flex-1 p-8" style={{ backgroundColor: '#0a0e27' }}>
          {console.log('Rendering children')}
          {children}
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error in MainLayout:', error)
    return <div style={{ color: 'red', padding: '20px', background: 'white' }}>Error in MainLayout: {error.message}</div>
  }
}

export default MainLayout
