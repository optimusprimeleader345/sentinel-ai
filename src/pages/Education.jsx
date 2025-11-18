import { motion } from 'framer-motion'
import { GraduationCap, BookOpen, PlayCircle, Brain, Trophy, ChevronDown, ChevronUp, CheckCircle, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { educationAPI } from '../lib/api'

function Education() {
  const [activeSection, setActiveSection] = useState('topics')
  const [topics, setTopics] = useState([])
  const [videos, setVideos] = useState([])
  const [progress, setProgress] = useState([])
  const [selectedTopic, setSelectedTopic] = useState(null)
  const [lesson, setLesson] = useState(null)
  const [quiz, setQuiz] = useState(null)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [quizResults, setQuizResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [expandedLesson, setExpandedLesson] = useState(null)

  useEffect(() => {
    loadEducationData()
  }, [])

  const loadEducationData = async () => {
    try {
      const [topicsRes, videosRes, progressRes] = await Promise.all([
        educationAPI.getTopics(),
        educationAPI.getVideos(),
        educationAPI.getProgress()
      ])
      setTopics(topicsRes.data)
      setVideos(videosRes.data)
      setProgress(progressRes.data)
      setLoading(false)
    } catch (error) {
      console.error('Error loading education data:', error)
      setLoading(false)
    }
  }

  const loadLesson = async (topicId) => {
    try {
      const response = await educationAPI.getLesson(topicId)
      setLesson(response.data)
      setSelectedTopic(topics.find(t => t.id === topicId))
    } catch (error) {
      console.error('Error loading lesson:', error)
    }
  }

  const loadQuiz = async (topicId) => {
    try {
      const response = await educationAPI.getQuiz(topicId)
      setQuiz(response.data)
      setQuizAnswers(new Array(response.data.questions.length).fill(''))
      setQuizResults(null)
    } catch (error) {
      console.error('Error loading quiz:', error)
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-400'
      case 'intermediate': return 'text-yellow-400'
      case 'advanced': return 'text-red-400'
      default: return 'text-slate-400'
    }
  }

  const getProgressColor = (progressPercent) => {
    if (progressPercent >= 80) return 'bg-green-500'
    if (progressPercent >= 60) return 'bg-yellow-500'
    if (progressPercent >= 30) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const handleQuizSubmit = async () => {
    try {
      const response = await educationAPI.submitQuiz({
        topicId: quiz.topicId,
        answers: quizAnswers
      })
      setQuizResults(response.data)
    } catch (error) {
      console.error('Error submitting quiz:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0e27] p-8 flex items-center justify-center">
        <div className="text-cyan-400">Loading education content...</div>
      </div>
    )
  }

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

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex space-x-2 mb-8"
        >
          {[
            { id: 'topics', label: 'Topics', icon: BookOpen },
            { id: 'videos', label: 'Videos', icon: PlayCircle },
            { id: 'quiz', label: 'Quizzes', icon: Brain },
            { id: 'progress', label: 'Progress', icon: Trophy }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => {
                setActiveSection(id)
                setLesson(null)
                setQuiz(null)
                setSelectedTopic(null)
              }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-xl border transition-all duration-200 ${
                activeSection === id
                  ? 'bg-[#0f172a]/80 border-cyan-400/50 text-cyan-400 shadow-cyan-purple'
                  : 'bg-[#0f172a]/80 border-slate-700/50 text-slate-400 hover:border-cyan-400/30'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{label}</span>
            </button>
          ))}
        </motion.div>

        {/* Topics Grid */}
        {activeSection === 'topics' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => loadLesson(topic.id)}
                className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6 cursor-pointer hover:border-cyan-400/50 transition-all duration-200 hover:shadow-cyan-purple group"
              >
                <div className="text-4xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-semibold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors">
                  {topic.title}
                </h3>
                <p className="text-slate-400 text-sm mb-4">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${getDifficultyColor(topic.difficulty)}`}>
                    {topic.difficulty.charAt(0).toUpperCase() + topic.difficulty.slice(1)}
                  </span>
                  <BookOpen className="w-4 h-4 text-slate-500" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Lesson Viewer */}
        {selectedTopic && lesson && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-8 mb-8"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-200 mb-2">{lesson.title}</h2>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-slate-400">{selectedTopic.title}</span>
                  <span className={`text-sm ${getDifficultyColor(selectedTopic.difficulty)}`}>
                    {selectedTopic.difficulty}
                  </span>
                </div>
              </div>
              <button
                onClick={() => loadQuiz(selectedTopic.id)}
                className="flex items-center space-x-2 px-4 py-2 bg-cyan-600/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-600/30 transition-colors"
              >
                <Brain className="w-4 h-4" />
                <span>Take Quiz</span>
              </button>
            </div>

            <div className="space-y-6">
              <div className="prose prose-invert max-w-none">
                <p className="text-slate-300 text-lg">{lesson.content}</p>
              </div>

              {/* Key Points */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-200">Key Points</h3>
                <ul className="space-y-2">
                  {lesson.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-300">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Examples */}
              {lesson.examples.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-200">Examples</h3>
                  <div className="grid gap-3">
                    {lesson.examples.map((example, index) => (
                      <div key={index} className="bg-slate-800/50 p-4 rounded-lg border border-slate-600/50">
                        <code className="text-cyan-400">{example}</code>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prevention Tips */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-200">Prevention Tips</h3>
                <ul className="space-y-2">
                  {lesson.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-slate-300">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Videos Grid */}
        {activeSection === 'videos' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 overflow-hidden hover:border-cyan-400/50 transition-all duration-200 hover:shadow-cyan-purple group"
              >
                <div className="aspect-video bg-slate-800 flex items-center justify-center">
                  <PlayCircle className="w-16 h-16 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                  <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-slate-300">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-slate-200 mb-2 group-hover:text-cyan-400 transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-slate-400 text-sm mb-3">{video.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-cyan-400">{video.topic}</span>
                    <span className="text-xs text-slate-500 flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{video.duration}</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Quiz Section */}
        {activeSection === 'quiz' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto"
          >
            {!quiz && !selectedTopic ? (
              <div className="text-center py-12">
                <Brain className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">Select a Topic to Take a Quiz</h3>
                <p className="text-slate-500">Complete lessons first for the best results</p>
              </div>
            ) : quiz && !quizResults ? (
              <div className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Brain className="w-8 h-8 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-slate-200">{quiz.title}</h2>
                </div>

                <div className="space-y-6">
                  {quiz.questions.map((question, index) => (
                    <div key={question.id} className="space-y-4">
                      <h3 className="text-lg font-semibold text-slate-200">
                        {index + 1}. {question.question}
                      </h3>
                      <div className="space-y-2">
                        {question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="flex items-center space-x-3 p-4 bg-slate-800/50 rounded-lg border border-slate-600/50 hover:border-cyan-400/30 cursor-pointer transition-colors"
                          >
                            <input
                              type="radio"
                              name={`question-${question.id}`}
                              value={option}
                              checked={quizAnswers[index] === option}
                              onChange={(e) => {
                                const newAnswers = [...quizAnswers]
                                newAnswers[index] = e.target.value
                                setQuizAnswers(newAnswers)
                              }}
                              className="text-cyan-400 focus:ring-cyan-400"
                            />
                            <span className="text-slate-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-8">
                  <button
                    onClick={handleQuizSubmit}
                    disabled={quizAnswers.includes('')}
                    className="px-8 py-3 bg-cyan-600/20 border border-cyan-400/50 rounded-lg text-cyan-400 hover:bg-cyan-600/30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Submit Quiz
                  </button>
                </div>
              </div>
            ) : quizResults ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-8"
              >
                <div className="text-center mb-8">
                  <div className="w-20 h-20 mx-auto mb-4">
                    {quizResults.passed ? (
                      <CheckCircle className="w-full h-full text-green-400" />
                    ) : (
                      <div className="w-full h-full rounded-full bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-400 font-bold text-xl">X</span>
                      </div>
                    )}
                  </div>
                  <h2 className="text-3xl font-bold text-slate-200 mb-2">
                    {quizResults.passed ? 'Quiz Passed!' : 'Quiz Completed'}
                  </h2>
                  <div className="text-6xl font-bold mb-4" style={{
                    color: quizResults.passed ? '#22c55e' : '#ef4444'
                  }}>
                    {quizResults.score}%
                  </div>
                  <p className="text-slate-400">{quizResults.feedback}</p>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-slate-200 mb-4">Detailed Results</h3>
                  <div className="space-y-3">
                    {quizResults.results.map((result, index) => (
                      <div key={index} className="flex items-start space-x-4 p-4 bg-slate-800/30 rounded-lg">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ${
                          result.isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                        }`}>
                          {result.isCorrect ? '✓' : '✗'}
                        </div>
                        <div className="flex-1">
                          <p className="text-slate-300 text-sm mb-2">
                            <strong>Question {index + 1}:</strong> {result.explanation}
                          </p>
                          <div className="text-xs text-slate-500 space-y-1">
                            <p>Your answer: <span className="text-slate-400">{result.selectedAnswer}</span></p>
                            {!result.isCorrect && (
                              <p>Correct answer: <span className="text-green-400">{result.correctAnswer}</span></p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => {
                      setQuiz(null)
                      setQuizResults(null)
                      setSelectedTopic(null)
                    }}
                    className="px-6 py-2 bg-slate-600/20 border border-slate-500/50 rounded-lg text-slate-400 hover:bg-slate-600/30 transition-colors"
                  >
                    Back to Topics
                  </button>
                </div>
              </motion.div>
            ) : null}
          </motion.div>
        )}

        {/* Progress Tracker */}
        {activeSection === 'progress' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {progress.map((item, index) => (
              <motion.div
                key={item.topicId}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#0f172a]/80 rounded-xl border border-slate-700/50 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-slate-200">{item.topicName}</h3>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-cyan-400">{item.progress}%</div>
                    <div className="text-sm text-slate-400">
                      {item.completedLessons}/{item.totalLessons} Lessons
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-slate-700 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all duration-1000 ${getProgressColor(item.progress)}`}
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-4">
                    {item.quizScore !== null && (
                      <span className="flex items-center space-x-1">
                        <Brain className="w-4 h-4 text-purple-400" />
                        <span className="text-slate-400">Quiz: {item.quizScore}%</span>
                      </span>
                    )}
                    {item.lastActivity && (
                      <span className="text-slate-500">
                        Last activity: {new Date(item.lastActivity).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Education
