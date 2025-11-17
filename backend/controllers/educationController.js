import EducationCourse from '../models/EducationCourse.js'

const mockCourses = [
  {
    id: '1',
    title: 'Introduction to Cybersecurity',
    description: 'Learn the fundamentals of cybersecurity and how to protect yourself online.',
    category: 'basics',
    duration: 15,
    difficulty: 'beginner',
  },
  {
    id: '2',
    title: 'Phishing Detection and Prevention',
    description: 'Identify and avoid phishing attacks with practical examples.',
    category: 'phishing',
    duration: 20,
    difficulty: 'beginner',
  },
  {
    id: '3',
    title: 'Network Security Fundamentals',
    description: 'Understand network security principles and best practices.',
    category: 'network',
    duration: 30,
    difficulty: 'intermediate',
  },
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

export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: 'Answers array is required' })
    }

    // Mock quiz scoring
    const totalQuestions = answers.length
    const correctAnswers = Math.floor(totalQuestions * 0.7) // Mock 70% correct
    const score = Math.round((correctAnswers / totalQuestions) * 100)

    res.json({
      score,
      correctAnswers,
      totalQuestions,
      passed: score >= 70,
      feedback: score >= 70
        ? 'Great job! You have a good understanding of cybersecurity basics.'
        : 'Keep learning! Review the course materials and try again.',
    })
  } catch (error) {
    console.error('Submit quiz error:', error)
    res.status(500).json({ message: 'Server error processing quiz' })
  }
}

