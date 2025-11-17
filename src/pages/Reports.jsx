import { motion } from 'framer-motion'
import { BarChart3 } from 'lucide-react'

function Reports() {
  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <BarChart3 className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Analytics & Insights</h1>
        </motion.div>
        <p className="text-slate-400">Comprehensive security analytics and reporting</p>
      </div>
    </div>
  )
}

export default Reports

