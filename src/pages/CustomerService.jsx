import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Ticket, Clock, CheckCircle, Send } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { supportAPI } from '../lib/api.js'

function CustomerService() {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)
  // AI Support Assistant state
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'Hello! I\'m SentinelAI. How can I help you with your cybersecurity questions today?' }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const handleOpenChat = () => {
    // TODO: Open chat modal or redirect to chat interface
    alert('Chat feature coming soon!')
  }

  const handleCreateTicket = () => {
    // TODO: Open ticket creation form
    alert('Create ticket feature coming soon!')
  }

  // AI Support Assistant functions
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputMessage.trim() || loading) return

    const userMessage = { sender: 'user', text: inputMessage }
    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setLoading(true)

    try {
      const response = await supportAPI.askSupportAI({ message: inputMessage })
      const aiMessage = { sender: 'ai', text: response.reply || response.response || 'Sorry, I couldn\'t process that request.' }
      setMessages(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('AI Support error:', error)
      const errorMessage = { sender: 'ai', text: 'Sorry, I\'m experiencing technical difficulties. Please try again later.' }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      handleSendMessage(e)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Customer Service</h1>
          <p className="text-slate-400">Get help and support for your SentinelAI account</p>
        </div>
        <div className="flex space-x-3">
          <Button onClick={handleOpenChat}>
            <MessageSquare className="w-4 h-4 mr-2" />
            Live Chat
          </Button>
          <Button variant="secondary" onClick={handleCreateTicket}>
            <Ticket className="w-4 h-4 mr-2" />
            New Ticket
          </Button>
        </div>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live Chat Support</h3>
              <p className="text-slate-400">Get instant help from our support team</p>
            </div>
          </div>
          <p className="text-slate-300 mb-4">Our support team is available 24/7 to assist you with any questions or issues you may have.</p>
          <Button onClick={handleOpenChat} className="w-full">Start Chat</Button>
        </Card>

        <Card>
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Ticket className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Create Support Ticket</h3>
              <p className="text-slate-400">Submit detailed support requests</p>
            </div>
          </div>
          <p className="text-slate-300 mb-4">For complex issues or feature requests, create a support ticket for detailed assistance.</p>
          <Button variant="secondary" onClick={handleCreateTicket} className="w-full">Create Ticket</Button>
        </Card>
      </div>

      {/* Ticket History */}
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Recent Tickets</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <p className="text-white font-medium">API Integration Issue</p>
                <p className="text-slate-400 text-sm">Resolved 2 days ago</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>

          <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-white font-medium">Account Setup Help</p>
                <p className="text-slate-400 text-sm">In progress</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        </div>
      </Card>

      {/* ============ AI SUPPORT ASSISTANT SECTION ============ */}
      <div className="mt-8">
        {/* Section Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">AI Support Assistant</h2>
          <p className="text-slate-400">Chat with SentinelAI for instant troubleshooting.</p>
        </div>

        {/* Chat Container */}
        <div className="bg-slate-900/80 rounded-xl border border-slate-700/50 shadow-[0_0_20px_rgba(139,92,246,0.3)] p-6 flex flex-col h-[480px]">
          {/* Message Scroll Box */}
          <div className="flex-1 overflow-y-auto mb-4 space-y-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-slate-800/50 [&::-webkit-scrollbar-thumb]:bg-cyan-400/50 [&::-webkit-scrollbar-thumb]:rounded-full">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[70%] rounded-xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-purple-600/60 text-white ml-auto'
                      : 'bg-slate-800/70 text-slate-200 border border-cyan-400/30 mr-auto'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-slate-800/70 text-slate-200 border border-cyan-400/30 rounded-xl px-4 py-2 max-w-[70%] mr-auto">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message here..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/25"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !inputMessage.trim()}
              className="bg-purple-600/60 hover:bg-purple-600/80 disabled:bg-slate-700 disabled:cursor-not-allowed border border-purple-500/50 rounded-lg px-4 py-2 text-white transition-colors duration-200 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CustomerService
