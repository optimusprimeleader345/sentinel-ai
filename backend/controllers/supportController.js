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

// Mock data for support stats
let mockSupportStats = {
  totalTickets: 47,
  openTickets: 12,
  resolvedTickets: 28,
  avgResponseTime: '2.4 hours',
  highPriorityTickets: 5,
}

// Mock data for ticket conversations
const mockTicketDetails = {
  responses: [
    {
      message: 'Thank you for contacting support. We\'re reviewing your issue and will get back to you shortly.',
      from: 'support',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      agent: 'Support Agent Sarah'
    },
    {
      message: 'Please check your spam folder for our response.',
      from: 'support',
      timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
      agent: 'Support Agent Sarah'
    }
  ]
}

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

// ===== NEW ADDED FUNCTIONS FOR COMPLETE CUSTOMER SUPPORT SYSTEM =====

// Create support ticket with enhanced fields
export const createSupportTicket = async (req, res) => {
  try {
    const { name, email, category, priority, subject, description, attachment } = req.body

    // Basic validation
    if (!name || !email || !category || !priority || !subject || !description) {
      return res.status(400).json({ message: 'All required fields must be provided' })
    }

    // Generate mock ticket ID
    const ticketId = `TICK-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    const mockTicket = {
      id: ticketId,
      name,
      email,
      category,
      priority,
      subject,
      description,
      attachment,
      status: 'open',
      createdAt: new Date(),
      updatedAt: new Date(),
      responses: [{
        message: description,
        from: 'user',
        timestamp: new Date(),
        author: name
      }]
    }

    // In a real app, you'd save to database
    // For now return mock ticket

    res.status(201).json({
      ...mockTicket,
      ticketId: ticketId
    })
  } catch (error) {
    console.error('Create support ticket error:', error)
    res.status(500).json({ message: 'Server error creating support ticket' })
  }
}

// Get support tickets (user's ticket history)
export const getSupportTickets = async (req, res) => {
  try {
    // Mock data for demo
    const mockTickets = [
      {
        ticketId: 'TICK-1731884400000-A1B2C',
        subject: 'Cannot access scan center',
        category: 'Scan Problem',
        priority: 'high',
        status: 'open',
        lastUpdated: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
      },
      {
        ticketId: 'TICK-1731798000000-Z9Y8X',
        subject: 'Account login issues',
        category: 'Account Issue',
        priority: 'medium',
        status: 'in_progress',
        lastUpdated: new Date(Date.now() - 48 * 60 * 60 * 1000) // 2 days ago
      },
      {
        ticketId: 'TICK-1731711600000-W7V6U',
        subject: 'Security alert explanation',
        category: 'Security Issue',
        priority: 'low',
        status: 'resolved',
        lastUpdated: new Date(Date.now() - 72 * 60 * 60 * 1000) // 3 days ago
      }
    ]

    res.json(mockTickets)
  } catch (error) {
    console.error('Get support tickets error:', error)
    res.status(500).json({ message: 'Server error fetching support tickets' })
  }
}

// Get ticket details by ID
export const getTicketDetails = async (req, res) => {
  try {
    const { id } = req.params

    if (!id) {
      return res.status(400).json({ message: 'Ticket ID is required' })
    }

    // Mock detailed ticket data
    const mockTicketDetails = {
      ticketId: id,
      name: 'John Doe',
      email: 'john.doe@example.com',
      category: 'Scan Problem',
      priority: 'high',
      subject: 'Cannot access scan center',
      description: 'I am unable to access the scan center feature. Every time I try to scan a URL, I get an error message saying "Service Unavailable". I have tried clearing my cache and using different browsers, but the issue persists.',
      status: 'in_progress',
      createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000), // 2 days ago
      updatedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      statusHistory: [
        { status: 'open', changedAt: new Date(Date.now() - 48 * 60 * 60 * 1000), changedBy: 'System' },
        { status: 'in_progress', changedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), changedBy: 'Support Agent Sarah' }
      ],
      responses: [
        {
          message: 'I am unable to access the scan center feature. Every time I try to scan a URL, I get an error message saying "Service Unavailable". I have tried clearing my cache and using different browsers, but the issue persists.',
          from: 'user',
          timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
          author: 'John Doe'
        },
        {
          message: 'Thank you for contacting support. I understand you\'re experiencing issues with the scan center. Our team is currently investigating this issue. We\'ll provide an update within 24 hours.',
          from: 'support',
          timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
          author: 'Support Agent Sarah'
        },
        {
          message: 'We have resolved the scan center connectivity issue. Please try accessing it again. Let us know if you encounter any further problems.',
          from: 'support',
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
          author: 'Support Agent Sarah'
        }
      ]
    }

    res.json(mockTicketDetails)
  } catch (error) {
    console.error('Get ticket details error:', error)
    res.status(500).json({ message: 'Server error fetching ticket details' })
  }
}

// Reply to ticket
export const replyTicket = async (req, res) => {
  try {
    const { id } = req.params
    const { message } = req.body

    if (!id || !message) {
      return res.status(400).json({ message: 'Ticket ID and message are required' })
    }

    // Simulate adding reply to ticket
    const mockReply = {
      message,
      from: 'user',
      timestamp: new Date(),
      author: 'Current User'
    }

    // Normally would save and get updated ticket, but return success
    res.status(200).json({
      success: true,
      reply: mockReply,
      message: 'Reply sent successfully'
    })
  } catch (error) {
    console.error('Reply ticket error:', error)
    res.status(500).json({ message: 'Server error replying to ticket' })
  }
}

// Get AI support assistant response
export const getSupportAssistant = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    // Mock AI assistant responses
    const mockResponses = [
      'I understand you\'re having trouble with the scan center. Here are some quick troubleshooting steps: 1) Clear your browser cache, 2) Try a different browser, 3) Check your internet connection. If the issue persists, please create a support ticket.',
      'For account login issues, make sure you\'re using the correct email address and password. If you\'ve forgotten your password, you can reset it on the login page. Contact support if you need additional help.',
      'The deepfake detector is currently processing your request. Analysis typically takes 1-2 minutes. You\'ll receive an email when your results are ready. Please be patient and don\'t close this window.',
      'Based on your security scan results, I recommend enabling two-factor authentication for all accounts. This significantly reduces the risk of unauthorized access.',
      'The threat level you\'re seeing indicates potential malicious activity. I suggest running a full system scan and reviewing your recent downloads and emails for suspicious content.',
      'For optimal protection, keep your antivirus software updated and run regular scans. Also, ensure all your software and operating system are up to date with the latest security patches.'
    ]

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)]

    res.json({
      response: randomResponse,
      timestamp: new Date()
    })
  } catch (error) {
    console.error('AI support assistant error:', error)
    res.status(500).json({ message: 'Server error in AI support assistant' })
  }
}

// Get support analytics/stats
export const getSupportStats = async (req, res) => {
  try {
    // Update mock stats occasionally to show dynamic data
    mockSupportStats.totalTickets = 47 + Math.floor(Math.random() * 5)
    mockSupportStats.openTickets = 12 + Math.floor(Math.random() * 3)
    mockSupportStats.resolvedTickets = mockSupportStats.totalTickets - mockSupportStats.openTickets - 5
    mockSupportStats.avgResponseTime = `${(2.0 + Math.random() * 1.2).toFixed(1)} hours`

    res.json(mockSupportStats)
  } catch (error) {
    console.error('Get support stats error:', error)
    res.status(500).json({ message: 'Server error fetching support stats' })
  }
}
