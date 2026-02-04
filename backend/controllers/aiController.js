import OpenAI from 'openai'
import Conversation from '../models/Conversation.js'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'mock-key',
})

// Mock AI responses when OpenAI is not configured
const getMockAIResponse = (input) => {
  const threatTypes = ['SQL injection', 'XSS attack', 'Phishing attempt', 'Malware signature', 'Unauthorized access']
  const selectedThreats = threatTypes.slice(0, Math.floor(Math.random() * 3) + 1) // 1-3 threats

  return {
    summary: `The AI analyzer detected potential security concerns in the provided input. Analysis indicates ${selectedThreats.join(', ')} patterns may be present.`,
    severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
    confidence: Math.floor(Math.random() * 30) + 70,
    threats: selectedThreats,
    remediation: 'Review access logs for suspicious activity and implement necessary security measures.',
  }
}

export const analyze = async (req, res) => {
  try {
    const { input } = req.body

    if (!input || !input.trim()) {
      return res.status(400).json({ message: 'Input text is required' })
    }

    // Use OpenAI if API key is configured, otherwise use mock
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'mock-key') {
      try {
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a cybersecurity expert. Analyze the provided logs or text for security threats. Return a JSON object with: summary (string), severity (low/medium/high/critical), confidence (0-100 as number), threats (array of strings), remediation (string).',
            },
            {
              role: 'user',
              content: `Analyze this security-related text: ${input}`,
            },
          ],
          response_format: { type: 'json_object' },
        })

        const analysis = JSON.parse(completion.choices[0].message.content)
        return res.json(analysis)
      } catch (openaiError) {
        console.error('OpenAI error, using mock response:', openaiError)
        return res.json(getMockAIResponse(input))
      }
    } else {
      // Use mock response
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API delay
      return res.json(getMockAIResponse(input))
    }
  } catch (error) {
    console.error('AI analyze error:', error)
    res.status(500).json({ message: 'Server error during AI analysis' })
  }
}

export const botChat = async (req, res) => {
  try {
    const { message, conversationId } = req.body
    const userId = req.user?.userId

    if (!message) {
      return res.status(400).json({ message: 'Message is required' })
    }

    // REAL: Use OpenAI with conversation context
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'mock-key') {
      try {
        // Get or create conversation
        let conversation = null
        if (conversationId) {
          conversation = await Conversation.findById(conversationId)
        } else if (userId) {
          // Find active conversation or create new one
          conversation = await Conversation.findOne({
            userId,
            isActive: true
          }).sort({ lastMessageAt: -1 })

          if (!conversation) {
            conversation = await Conversation.create({
              userId,
              messages: [],
              title: 'Security Assistant Chat',
              isActive: true
            })
          }
        }

        // Build conversation history
        const messages = conversation?.messages || []
        const systemMessage = {
          role: 'system',
          content: 'You are a cybersecurity expert assistant for SentinelAI. Provide helpful, accurate security advice. Be concise and professional. Focus on practical security recommendations.'
        }

        // Prepare messages for OpenAI
        const openAIMessages = [
          systemMessage,
          ...messages.slice(-10).map(m => ({ // Last 10 messages for context
            role: m.role,
            content: m.content
          })),
          {
            role: 'user',
            content: message
          }
        ]

        // Call OpenAI
        const completion = await openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: openAIMessages,
          temperature: 0.7,
          max_tokens: 500
        })

        const aiResponse = completion.choices[0].message.content

        // Save conversation to database
        if (conversation) {
          conversation.messages.push(
            { role: 'user', content: message },
            { role: 'assistant', content: aiResponse }
          )
          conversation.lastMessageAt = new Date()
          await conversation.save()
        } else if (userId) {
          // Create new conversation if user is logged in
          await Conversation.create({
            userId,
            messages: [
              { role: 'user', content: message },
              { role: 'assistant', content: aiResponse }
            ],
            title: 'Security Assistant Chat',
            isActive: true
          })
        }

        return res.json({
          response: aiResponse,
          timestamp: new Date().toISOString(),
          conversationId: conversation?._id?.toString(),
          model: 'gpt-4o-mini'
        })
      } catch (openaiError) {
        console.error('OpenAI error:', openaiError.message)
        // Fall through to mock response
      }
    }

    // Fallback to mock responses if OpenAI not configured
    const responses = [
      'I\'ve analyzed your system and detected no immediate threats. All security protocols are functioning normally.',
      'I recommend enabling two-factor authentication for enhanced security.',
      'Your firewall is actively blocking suspicious IP addresses. Current threat level is low.',
      'I\'ve updated your security policies based on recent threat intelligence.',
      'All systems are operational. No action required at this time.',
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]

    res.json({
      response: randomResponse,
      timestamp: new Date().toISOString(),
      note: 'Using mock response - configure OPENAI_API_KEY for AI-powered chat'
    })
  } catch (error) {
    console.error('AI bot error:', error)
    res.status(500).json({ message: 'Server error in AI bot' })
  }
}

export const simulateAction = async (req, res) => {
  try {
    const { actionType } = req.body

    const actions = [
      {
        performedAction: 'Blocked suspicious IP address 192.168.1.100',
        riskImpact: 'low',
        recommendedNextSteps: ['Monitor network traffic', 'Review firewall logs'],
      },
      {
        performedAction: 'Isolated potential malware file',
        riskImpact: 'medium',
        recommendedNextSteps: ['Run full system scan', 'Update antivirus definitions'],
      },
      {
        performedAction: 'Updated firewall rules',
        riskImpact: 'low',
        recommendedNextSteps: ['Test new rules', 'Monitor for false positives'],
      },
    ]

    const randomAction = actions[Math.floor(Math.random() * actions.length)]

    res.json(randomAction)
  } catch (error) {
    console.error('Simulate action error:', error)
    res.status(500).json({ message: 'Server error simulating action' })
  }
}
