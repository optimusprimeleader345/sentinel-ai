const liveChatMessages = []

export const getChatMessages = async (req, res) => {
  try {
    // In a real app, fetch from database
    // For demo, return mock messages
    const messages = liveChatMessages.length > 0 ? liveChatMessages : [
      {
        id: 1,
        user: 'Support Agent',
        message: 'Hello! How can I help you today?',
        timestamp: new Date().toISOString(),
        isAgent: true,
      },
      {
        id: 2,
        user: 'You',
        message: 'I need help with AI Guardian setup.',
        timestamp: new Date(Date.now() - 30000).toISOString(),
        isAgent: false,
      },
    ]

    res.json(messages)
  } catch (error) {
    console.error('Get chat messages error:', error)
    res.status(500).json({ message: 'Server error fetching chat messages' })
  }
}

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    const userMessage = {
      id: Date.now(),
      user: 'You',
      message,
      timestamp: new Date().toISOString(),
      isAgent: false,
    }

    liveChatMessages.push(userMessage)

    // Mock agent response
    setTimeout(() => {
      const agentResponse = {
        id: Date.now() + 1,
        user: 'Support Agent',
        message: 'Thank you for your message. Our AI Guardian team will respond shortly.',
        timestamp: new Date().toISOString(),
        isAgent: true,
      }
      liveChatMessages.push(agentResponse)
    }, 1000)

    res.json(userMessage)
  } catch (error) {
    console.error('Send message error:', error)
    res.status(500).json({ message: 'Server error sending message' })
  }
}
