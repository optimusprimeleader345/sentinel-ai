import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from './admin/GlassCard'
import {
  Trophy,
  Star,
  Shield,
  Target,
  TrendingUp,
  Users,
  Zap,
  Brain,
  Eye,
  AlertTriangle,
  CheckCircle,
  Lock,
  Unlock,
  Award,
  Medal,
  Crown,
  Sparkles
} from 'lucide-react'

// Mock achievement data - would normally come from API
const achievements = [
  {
    id: 'first_scan',
    title: 'Security Scout',
    description: 'Performed your first security scan',
    icon: Shield,
    category: 'Security',
    points: 100,
    earned: true,
    earnedDate: '2025-01-15',
    rarity: 'Common',
    progress: 100,
    maxProgress: 100
  },
  {
    id: 'thirty_scans',
    title: 'Security Veteran',
    description: 'Completed 30 security scans',
    icon: Target,
    category: 'Security',
    points: 500,
    earned: false,
    earnedDate: null,
    rarity: 'Rare',
    progress: 23,
    maxProgress: 30
  },
  {
    id: 'threat_hunter',
    title: 'Threat Hunter',
    description: 'Successfully identified and reported a threat',
    icon: AlertTriangle,
    category: 'Threat Intelligence',
    points: 250,
    earned: true,
    earnedDate: '2025-01-20',
    rarity: 'Common',
    progress: 100,
    maxProgress: 100
  },
  {
    id: 'ai_master',
    title: 'AI Master',
    description: 'Had 100 conversations with AI assistants',
    icon: Brain,
    category: 'AI Interaction',
    points: 750,
    earned: false,
    earnedDate: null,
    rarity: 'Epic',
    progress: 67,
    maxProgress: 100
  },
  {
    id: 'community_guardian',
    title: 'Community Guardian',
    description: 'Shared threat intelligence with community',
    icon: Users,
    category: 'Community',
    points: 300,
    earned: false,
    earnedDate: null,
    rarity: 'Uncommon',
    progress: 0,
    maxProgress: 1
  },
  {
    id: 'security_champion',
    title: 'Security Champion',
    description: 'Maintained perfect security score for 30 days',
    icon: Crown,
    category: 'Excellence',
    points: 2000,
    earned: false,
    earnedDate: null,
    rarity: 'Legendary',
    progress: 18,
    maxProgress: 30
  },
  {
    id: 'vulnerability_finder',
    title: 'Vulnerability Finder',
    description: 'Discovered 10 unique vulnerabilities',
    icon: Eye,
    category: 'Discovery',
    points: 600,
    earned: false,
    earnedDate: null,
    rarity: 'Rare',
    progress: 7,
    maxProgress: 10
  },
  {
    id: 'response_time_hero',
    title: 'Rapid Responder',
    description: 'Responded to incidents in under 5 minutes',
    icon: Zap,
    category: 'Response',
    points: 400,
    earned: true,
    earnedDate: '2025-01-25',
    rarity: 'Uncommon',
    progress: 100,
    maxProgress: 100
  },
  {
    id: 'knowledge_seeker',
    title: 'Knowledge Seeker',
    description: 'Completed 25 cybersecurity training modules',
    icon: Medal,
    category: 'Education',
    points: 350,
    earned: false,
    earnedDate: null,
    rarity: 'Uncommon',
    progress: 15,
    maxProgress: 25
  }
]

const userStats = {
  totalPoints: 2750,
  currentLevel: 12,
  nextLevelAt: 3000,
  achievements: 23,
  totalAchievements: 47,
  currentStreak: 7,
  longestStreak: 28,
  rank: 'Security Expert'
}

const recentAchievements = [
  {
    title: 'First Steps',
    description: 'Completed your onboarding process',
    points: 50,
    earned: '2 hours ago'
  },
  {
    title: 'Scan Expert',
    description: 'Performed 5 successful scans',
    points: 150,
    earned: '1 day ago'
  },
  {
    title: 'Rapid Responder',
    description: 'Responded to incidents in under 5 minutes',
    points: 400,
    earned: '3 days ago'
  }
]

function UserAchievements({ isMinimized, setIsMinimized }) {
  const [currentView, setCurrentView] = useState('achievements') // achievements, stats, progress
  const [selectedCategory, setSelectedCategory] = useState('All')

  const [animatedPoints, setAnimatedPoints] = useState(userStats.totalPoints)
  const [levelProgress, setLevelProgress] = useState(0)

  useEffect(() => {
    // Animate points counter
    const timer = setTimeout(() => {
      setAnimatedPoints(userStats.totalPoints)
    }, 500)

    // Calculate level progress
    const progress = ((userStats.totalPoints - (userStats.nextLevelAt - (userStats.nextLevelAt - userStats.totalPoints))) / (userStats.nextLevelAt - userStats.totalPoints)) * 100
    setLevelProgress(Math.min(Math.max(progress, 0), 100))

    return () => clearTimeout(timer)
  }, [])

  const categories = ['All', 'Security', 'Threat Intelligence', 'AI Interaction', 'Community', 'Excellence', 'Discovery', 'Response', 'Education']

  const filteredAchievements = selectedCategory === 'All'
    ? achievements
    : achievements.filter(achievement => achievement.category === selectedCategory)

  const completedAchievements = achievements.filter(a => a.earned)
  const totalPointsFromEarned = completedAchievements.reduce((sum, achievement) => sum + achievement.points, 0)

  const getRarityColor = (rarity) => {
    switch (rarity.toLowerCase()) {
      case 'common': return 'text-green-400'
      case 'uncommon': return 'text-blue-400'
      case 'rare': return 'text-purple-400'
      case 'epic': return 'text-orange-400'
      case 'legendary': return 'text-yellow-400'
      default: return 'text-slate-400'
    }
  }

  const getProgressColor = (progress, maxProgress) => {
    const percentage = (progress / maxProgress) * 100
    if (percentage >= 75) return 'bg-green-500'
    if (percentage >= 50) return 'bg-yellow-500'
    if (percentage >= 25) return 'bg-orange-500'
    return 'bg-red-500'
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 left-6"
      >
        <GlassCard className="p-0">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center space-x-3 p-4 hover:bg-slate-800/50 transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">Achievements</div>
              <div className="text-slate-400 text-xs">{completedAchievements.length}/{achievements.length} Unlocked</div>
            </div>
          </button>
        </GlassCard>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 left-6 w-[400px] h-[32rem] z-40"
    >
      <GlassCard className="flex flex-col h-full p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
              <Trophy className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">Security Achievements</h3>
              <div className="text-slate-400 text-xs">{userStats.rank} • Level {userStats.currentLevel}</div>
            </div>
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-slate-400 hover:text-white p-1"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>

        {/* User Level Progress */}
        <div className="p-4 border-b border-slate-700/50">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm text-slate-300">
              Level Progress ({animatedPoints}/{userStats.nextLevelAt} points)
            </div>
            <div className="text-cyan-400 text-sm font-semibold">
              Level {userStats.currentLevel}
            </div>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full"
              style={{ width: `${levelProgress}%` }}
            ></motion.div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>{userStats.nextLevelAt - animatedPoints} points to next level</span>
            <span>{userStats.currentStreak} day streak</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-700/50">
          {[
            { id: 'achievements', label: 'Badges', icon: Trophy },
            { id: 'stats', label: 'Stats', icon: TrendingUp },
            { id: 'progress', label: 'Progress', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`flex-1 flex items-center justify-center py-2 px-1 text-xs font-medium transition-colors ${
                currentView === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-3 h-3 mr-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Areas */}
        <div className="flex-1 overflow-hidden">
          {currentView === 'achievements' && (
            <div className="p-4 space-y-4 overflow-y-auto h-full">

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* Achievement Grid */}
              <div className="space-y-3">
                {filteredAchievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        achievement.earned
                          ? 'border-l-green-500 bg-green-500/5'
                          : 'border-l-slate-500 bg-slate-500/5 relative'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-lg ${achievement.earned ? 'bg-green-500/20' : 'bg-slate-600/20'}`}>
                            {achievement.earned ? (
                              <Unlock className="w-5 h-5 text-green-400" />
                            ) : (
                              <Lock className="w-5 h-5 text-slate-400" />
                            )}
                            <IconComponent className={`w-5 h-5 ${achievement.earned ? 'text-green-400' : 'text-slate-400'}`} style={{ marginTop: -20 }} />
                          </div>
                          <div>
                            <h4 className={`font-semibold ${achievement.earned ? 'text-green-400' : 'text-slate-300'}`}>
                              {achievement.title}
                            </h4>
                            <p className="text-slate-400 text-sm">{achievement.description}</p>
                            <div className="flex items-center space-x-4 mt-1">
                              <span className="text-orange-400 text-xs font-semibold">{achievement.points} points</span>
                              <span className={`${getRarityColor(achievement.rarity)} text-xs`}>{achievement.rarity}</span>
                              {achievement.earned && (
                                <span className="text-green-400 text-xs">Earned {achievement.earnedDate}</span>
                              )}
                            </div>
                          </div>
                        </div>

                        {!achievement.earned && (
                          <div className="text-right">
                            <div className="text-sm text-slate-400 mb-1">
                              {achievement.progress}/{achievement.maxProgress}
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1.5">
                              <div className={`h-1.5 rounded-full ${getProgressColor(achievement.progress, achievement.maxProgress)}`}
                                   style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {currentView === 'stats' && (
            <div className="p-4 space-y-6 overflow-y-auto h-full">
              <div>
                <h4 className="text-white font-semibold mb-4">Achievement Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-cyan-400">{completedAchievements.length}</div>
                    <div className="text-slate-400 text-sm">Unlocked</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-green-400">{totalPointsFromEarned}</div>
                    <div className="text-slate-400 text-sm">Total Points</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-400">{userStats.currentStreak}</div>
                    <div className="text-slate-400 text-sm">Day Streak</div>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <div className="text-2xl font-bold text-orange-400">{Math.round((completedAchievements.length / achievements.length) * 100)}%</div>
                    <div className="text-slate-400 text-sm">Completion</div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Recent Achievements</h4>
                <div className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg"
                    >
                      <Medal className="w-6 h-6 text-yellow-400" />
                      <div>
                        <div className="text-white font-medium text-sm">{achievement.title}</div>
                        <div className="text-slate-400 text-xs">{achievement.description}</div>
                      </div>
                      <div className="text-right ml-auto">
                        <div className="text-green-400 text-sm font-semibold">+{achievement.points}</div>
                        <div className="text-slate-400 text-xs">{achievement.earned}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentView === 'progress' && (
            <div className="p-4 space-y-6 overflow-y-auto h-full">
              <div>
                <h4 className="text-white font-semibold mb-4">Skill Progress</h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Security Scanning</span>
                      <span className="text-cyan-400">78/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full w-4/5"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Threat Analysis</span>
                      <span className="text-cyan-400">65/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">Incident Response</span>
                      <span className="text-cyan-400">89/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-300">AI Interaction</span>
                      <span className="text-cyan-400">72/100</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-white font-semibold mb-4">Next Level Targets</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">Complete 30 Security Scans</div>
                      <div className="text-slate-400 text-xs">23/30 completed</div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 text-sm font-semibold">+500 pts</div>
                      <div className="text-purple-400 text-xs">Rare Badge</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">AI Conversation Master</div>
                      <div className="text-slate-400 text-xs">67/100 conversations</div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 text-sm font-semibold">+750 pts</div>
                      <div className="text-purple-400 text-xs">Epic Badge</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <div className="text-white text-sm font-medium">Perfect Security Score</div>
                      <div className="text-slate-400 text-xs">18/30 days streak</div>
                    </div>
                    <div className="text-right">
                      <div className="text-orange-400 text-sm font-semibold">+2000 pts</div>
                      <div className="text-purple-400 text-xs">Legendary Badge</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default UserAchievements
