import { motion } from 'framer-motion'

function SecurityScoreCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-500/30"
    >
      <h3 className="text-xl font-bold text-yellow-400 mb-4">Security Score</h3>
      <div className="text-4xl font-bold text-white mb-2">87%</div>
      <p className="text-yellow-400">Level 3 Defender</p>
    </motion.div>
  )
}

export default SecurityScoreCard
