import { motion } from 'framer-motion'
import { GraduationCap } from 'lucide-react'

function Education() {
  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <GraduationCap className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Cyber Education</h1>
        </motion.div>
        <p className="text-slate-400">Learn about cybersecurity best practices</p>
      </div>
    </div>
  )
}

export default Education

