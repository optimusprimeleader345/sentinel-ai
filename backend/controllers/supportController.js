import Ticket from '../models/Ticket.js'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
})

const mockFAQ = [
  {
    question: 'How do I reset my password?',
    answer: 'You can reset your password by going to the Account settings page and clicking "Change Password".',
    category: 'account',
  },
  {
    question: 'What is the AI Defense Bot?',
    answer: 'The AI Defense Bot is an autonomous security agent that monitors and protects your systems in real-time.',
    category: 'features',
  },
  {
    question: 'How does the Deepfake Detector work?',
    answer: 'Our Deepfake Detector uses advanced AI algorithms to analyze images and videos for signs of manipulation.',
    category: 'features',
  },
]

export const createTicket = async (req, res) => {
  try {
    const { subject, description, priority } = req.body
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    if (!subject || !description) {
      return res.status(400).json({ message: 'Subject and description are required' })
    }

    const ticket = await Ticket.create({
      subject,
      description,
      priority: priority || 'medium',
      userId,
      responses: [{
        message: description,
        from: 'user',
      }],
    })

    res.status(201).json(ticket)
  } catch (error) {
    console.error('Create ticket error:', error)
    res.status(500).json({ message: 'Server error creating ticket' })
  }
}

export const getTickets = async (req, res) => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return res.status(401).json({ message: 'Authentication required' })
    }

    const tickets = await Ticket.find({ userId }).sort({ createdAt: -1 })

    res.json(tickets)
  } catch (error) {
    console.error('Get tickets error:', error)
    res.status(500).json({ message: 'Server error fetching tickets' })
  }
}

export const getFAQ = async (req, res) => {
  try {
    res.json(mockFAQ)
  } catch (error) {
    console.error('Get FAQ error:', error)
    res.status(500).json({ message: 'Server error fetching FAQ' })
  }
}

export const getAISupport = async (req, res) => {
  try {
    const { question } = req.body

    if (!question) {
      return res.status(400).json({ message: 'Question is required' })
    }

    // Use OpenAI if available, otherwise use mock
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'mock-key') {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful cybersecurity support assistant. Provide clear, concise answers to user questions about the SentinelAI platform.',
            },
            {
              role: 'user',
              content: question,
            },
          ],
        })

        const response = completion.choices[0].message.content

        return res.json({
          response,
          suggestedArticles: mockFAQ.slice(0, 3).map(faq => faq.question),
        })
      } catch (openaiError) {
        console.error('OpenAI error, using mock response:', openaiError)
      }
    }

    // Mock AI response
    const mockResponses = [
      'I can help you with that. Based on your question, I recommend checking the settings page for configuration options.',
      'For this issue, please try clearing your browser cache and refreshing the page. If the problem persists, contact support.',
      'This feature is available in the premium plan. You can upgrade your account in the Settings section.',
    ]

    res.json({
      response: mockResponses[Math.floor(Math.random() * mockResponses.length)],
      suggestedArticles: mockFAQ.slice(0, 3).map(faq => faq.question),
    })
  } catch (error) {
    console.error('AI support error:', error)
    res.status(500).json({ message: 'Server error in AI support' })
  }
}

