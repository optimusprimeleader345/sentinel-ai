import EducationCourse from '../models/EducationCourse.js'

const mockTopics = [
  {
    id: '1',
    title: 'Password Security',
    description: 'Learn how to create and manage secure passwords.',
    category: 'basics',
    difficulty: 'beginner',
    icon: '🔐',
  },
  {
    id: '2',
    title: 'Phishing Awareness',
    description: 'Identify and avoid phishing attacks and scams.',
    category: 'social-engineering',
    difficulty: 'beginner',
    icon: '🎣',
  },
  {
    id: '3',
    title: 'Social Engineering',
    description: 'Master the art of detecting social engineering tactics.',
    category: 'social-engineering',
    difficulty: 'intermediate',
    icon: '🧠',
  },
  {
    id: '4',
    title: 'Malware Basics',
    description: 'Understand different types of malware and how they work.',
    category: 'malware',
    difficulty: 'beginner',
    icon: '🦠',
  },
  {
    id: '5',
    title: 'Network Safety',
    description: 'Protect your network from cyber threats.',
    category: 'network',
    difficulty: 'intermediate',
    icon: '🌐',
  },
  {
    id: '6',
    title: 'OSINT Essentials',
    description: 'Learn Open Source Intelligence gathering techniques.',
    category: 'intelligence',
    difficulty: 'advanced',
    icon: '🔍',
  },
  {
    id: '7',
    title: 'Data Privacy',
    description: 'Protect your personal data in the digital world.',
    category: 'privacy',
    difficulty: 'intermediate',
    icon: '🔒',
  },
  {
    id: '8',
    title: 'Cloud Security',
    description: 'Secure your data and applications in the cloud.',
    category: 'cloud',
    difficulty: 'advanced',
    icon: '☁️',
  },
]

const mockLessons = [
  {
    id: '1',
    topicId: '1',
    title: 'Password Security Fundamentals',
    content: 'Learn the basics of password security including complexity requirements and best practices.',
    keyPoints: [
      'Use minimum 12 characters with mix of letters, numbers, symbols',
      'Avoid common words and personal information',
      'Use unique passwords for each account',
      'Consider using passphrase combination'
    ],
    examples: [
      'Weak: password123',
      'Strong: Tr@velThruT!me2024$',
      'Passphrase: blue-horse-pixel-moon'
    ],
    tips: [
      'Enable two-factor authentication (2FA)',
      'Use a password manager to generate and store passwords',
      'Change default passwords immediately',
      'Monitor for data breaches affecting your accounts'
    ]
  },
  {
    id: '2',
    topicId: '2',
    title: 'Phishing Attack Patterns',
    content: 'Understanding the various ways phishing attacks are delivered to unsuspecting victims.',
    keyPoints: [
      'Email phishing with malicious links',
      'Phone calls and vishing attacks',
      'SMS phishing and smishing',
      'Fake website clones and typosquatting'
    ],
    examples: [
      'Bank alert emails asking to "verify" your account',
      'Prize notification emails with urgent claims',
      'Support calls claiming your computer is infected',
      'Fake login pages that capture credentials'
    ],
    tips: [
      'Never click links in unexpected emails',
      'Verify sender email addresses carefully',
      'Hover over links to check actual destinations',
      'Contact companies directly through official channels'
    ]
  },
]

const mockVideos = [
  {
    id: '1',
    title: 'Cybersecurity Basics for Everyone',
    description: 'A comprehensive introduction to cybersecurity fundamentals.',
    thumbnail: '/api/placeholder/300/200',
    duration: '15:30',
    topic: 'Password Security'
  },
  {
    id: '2',
    title: 'Spotting Phishing Attacks',
    description: 'Learn to identify and avoid dangerous phishing attempts.',
    thumbnail: '/api/placeholder/300/200',
    duration: '12:45',
    topic: 'Phishing Awareness'
  },
  {
    id: '3',
    title: 'Social Engineering Tactics Exposed',
    description: 'Understanding how attackers manipulate human psychology.',
    thumbnail: '/api/placeholder/300/200',
    duration: '20:15',
    topic: 'Social Engineering'
  },
  {
    id: '4',
    title: 'Malware Types and Prevention',
    description: 'Explore different malware types and protection strategies.',
    thumbnail: '/api/placeholder/300/200',
    duration: '18:20',
    topic: 'Malware Basics'
  }
]

const mockQuizzes = [
  {
    id: '1',
    topicId: '1',
    title: 'Password Security Quiz',
    questions: [
      {
        id: '1',
        question: 'What is the minimum recommended length for a strong password?',
        options: ['8 characters', '12 characters', '16 characters', '20 characters'],
        correctAnswer: '12 characters',
        explanation: 'Modern security standards recommend at least 12 characters for adequate protection.'
      },
      {
        id: '2',
        question: 'Which of these is considered a weak password pattern?',
        options: ['Dictionary words', 'Random character combinations', 'Passphrases', 'All of the above'],
        correctAnswer: 'Dictionary words',
        explanation: 'Dictionary words and common patterns are easily guessed by attackers.'
      },
      {
        id: '3',
        question: 'What should you do if a service has been breached?',
        options: ['Ignore it', 'Change password only on that service', 'Change passwords everywhere', 'Delete your account'],
        correctAnswer: 'Change passwords everywhere',
        explanation: 'Credential stuffing attacks often target multiple services after a breach.'
      },
      {
        id: '4',
        question: 'Which authentication method provides the most security?',
        options: ['Password only', 'Password + SMS code', 'Password + Authenticator app', 'Password + Email verification'],
        correctAnswer: 'Password + Authenticator app',
        explanation: 'Authenticator apps use time-based codes that are more secure than SMS or email.'
      },
      {
        id: '5',
        question: 'What is the best way to manage multiple strong passwords?',
        options: ['Write them down', 'Use the same password everywhere', 'Use a password manager', 'Memorize them all'],
        correctAnswer: 'Use a password manager',
        explanation: 'Password managers can generate and securely store unique passwords for all accounts.'
      }
    ]
  },
  {
    id: '2',
    topicId: '2',
    title: 'Phishing Awareness Quiz',
    questions: [
      {
        id: '1',
        question: 'What is the most common method attackers use for phishing?',
        options: ['Phone calls', 'Email', 'In-person visits', 'Social media posts'],
        correctAnswer: 'Email',
        explanation: 'Email remains the most prevalent phishing vector due to its scale and reach.'
      },
      {
        id: '2',
        question: 'What should you do if you suspect an email is a phishing attempt?',
        options: ['Click the link to investigate', 'Reply asking for more information', 'Report it to your security team', 'Forward it to friends'],
        correctAnswer: 'Report it to your security team',
        explanation: 'Reporting suspicious emails helps security teams track and block phishing campaigns.'
      },
      {
        id: '3',
        question: 'Which of these is NOT a common phishing tactic?',
        options: ['Urgency pressure', 'Personal information requests', 'System update notifications', 'Password complexity requirements'],
        correctAnswer: 'Password complexity requirements',
        explanation: 'Legitimate companies won\'t ask for passwords via email or unexpected communications.'
      },
      {
        id: '4',
        question: 'What is "smishing"?',
        options: ['Email phishing', 'Phone phishing', 'SMS phishing', 'Website phishing'],
        correctAnswer: 'SMS phishing',
        explanation: 'Smishing is phishing conducted via SMS/text messages.'
      },
      {
        id: '5',
        question: 'How can you verify a suspicious email claims to be from your bank?',
        options: ['Call the phone number in the email', 'Click the link and log in', 'Search for the bank\'s official contact info online', 'Reply to the email'],
        correctAnswer: 'Search for the bank\'s official contact info online',
        explanation: 'Always use independently verified contact information to avoid caller ID spoofing.'
      }
    ]
  }
]

const mockProgress = [
  {
    topicId: '1',
    topicName: 'Password Security',
    progress: 65,
    completedLessons: 2,
    totalLessons: 3,
    quizScore: 80,
    lastActivity: '2024-01-15T10:30:00Z'
  },
  {
    topicId: '2',
    topicName: 'Phishing Awareness',
    progress: 40,
    completedLessons: 1,
    totalLessons: 3,
    quizScore: null,
    lastActivity: '2024-01-14T14:20:00Z'
  },
  {
    topicId: '3',
    topicName: 'Social Engineering',
    progress: 0,
    completedLessons: 0,
    totalLessons: 3,
    quizScore: null,
    lastActivity: null
  }
]

const mockTips = [
  'Always use strong, unique passwords for each account',
  'Enable two-factor authentication whenever possible',
  'Be cautious of suspicious emails and links',
  'Keep your software and operating system updated',
  'Use a reputable antivirus and keep it updated',
  'Avoid using public Wi-Fi for sensitive transactions',
  'Regularly back up your important data',
  'Be wary of social engineering attacks',
]

export const getCourses = async (req, res) => {
  try {
    const courses = await EducationCourse.find().sort({ createdAt: -1 })

    if (courses.length === 0) {
      return res.json(mockCourses)
    }

    res.json(courses)
  } catch (error) {
    console.error('Get courses error:', error)
    res.status(500).json({ message: 'Server error fetching courses' })
  }
}

export const getTips = async (req, res) => {
  try {
    // Return random tip
    const randomTip = mockTips[Math.floor(Math.random() * mockTips.length)]
    
    res.json({
      tip: randomTip,
      date: new Date().toISOString().split('T')[0],
    })
  } catch (error) {
    console.error('Get tips error:', error)
    res.status(500).json({ message: 'Server error fetching tips' })
  }
}

export const getTopics = async (req, res) => {
  try {
    res.json(mockTopics)
  } catch (error) {
    console.error('Get topics error:', error)
    res.status(500).json({ message: 'Server error fetching topics' })
  }
}

export const getLessons = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Topic ID is required' })
    }

    const lesson = mockLessons.find(l => l.topicId === id)
    if (!lesson) {
      return res.status(404).json({ message: 'Lesson not found for this topic' })
    }

    res.json(lesson)
  } catch (error) {
    console.error('Get lessons error:', error)
    res.status(500).json({ message: 'Server error fetching lesson' })
  }
}

export const getVideos = async (req, res) => {
  try {
    res.json(mockVideos)
  } catch (error) {
    console.error('Get videos error:', error)
    res.status(500).json({ message: 'Server error fetching videos' })
  }
}

export const getQuiz = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ message: 'Topic ID is required' })
    }

    const quiz = mockQuizzes.find(q => q.topicId === id)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found for this topic' })
    }

    // Return quiz without correct answers for the frontend
    const quizForFrontend = {
      ...quiz,
      questions: quiz.questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
      }))
    }

    res.json(quizForFrontend)
  } catch (error) {
    console.error('Get quiz error:', error)
    res.status(500).json({ message: 'Server error fetching quiz' })
  }
}

export const getProgress = async (req, res) => {
  try {
    res.json(mockProgress)
  } catch (error) {
    console.error('Get progress error:', error)
    res.status(500).json({ message: 'Server error fetching progress' })
  }
}

export const submitQuiz = async (req, res) => {
  try {
    const { topicId, answers } = req.body

    if (!topicId || !answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Topic ID and answers array are required' })
    }

    // Get the quiz to check answers
    const quiz = mockQuizzes.find(q => q.topicId === topicId)
    if (!quiz) {
      return res.status(404).json({ message: 'Quiz not found' })
    }

    // Calculate score by checking answers against correct ones
    let correctAnswers = 0
    const results = answers.map((answer, index) => {
      const question = quiz.questions[index]
      const isCorrect = answer === question.correctAnswer
      if (isCorrect) correctAnswers++
      return {
        questionId: question.id,
        selectedAnswer: answer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        explanation: question.explanation
      }
    })

    const totalQuestions = quiz.questions.length
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    res.json({
      topicId,
      score,
      correctAnswers,
      totalQuestions,
      passed: score >= 70,
      results,
      feedback: score >= 70
        ? 'Excellent! You have mastered this topic.'
        : 'Keep learning! Review the material and try again.',
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ message: 'Server error processing quiz' })
  }
}
