import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { HelpCircle, Send, MessageCircle, BarChart3, Paperclip, User, Mail, Tag, Clock, AlertTriangle } from 'lucide-react'
import { supportAPI } from '../lib/api'
import Button from '../components/Button'
import Input from '../components/Input'
import Card from '../components/Card'

function Support() {
  const [activeTab, setActiveTab] = useState('create')
  const [loading, setLoading] = useState(false)

  // ===== NEW STATE FOR COMPLETE CUSTOMER SUPPORT SYSTEM =====
  // Create Ticket Form
  const [ticketForm, setTicketForm] = useState({
    name: '',
    email: '',
    category: 'Security Issue',
    priority: 'Medium',
    subject: '',
    description: '',
    attachment: null
  })

  // Ticket History
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)

  // AI Assistant
  const [aiMessage, setAiMessage] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [chatHistory, setChatHistory] = useState([])

  // Reply System
  const [replyMessage, setReplyMessage] = useState('')

  // Support Stats
  const [supportStats, setSupportStats] = useState({
    totalTickets: 0,
    openTickets: 0,
    resolvedTickets: 0,
    avgResponseTime: '',
    highPriorityTickets: 0
  })

  // Priority color mapping
  const getPriorityBadge = (priority) => {
    const colors = {
      low: 'bg-green-500/20 text-green-400 border-green-500/30',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
      critical: 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return colors[priority.toLowerCase()] || colors.medium
  }

  // Status color mapping
  const getStatusBadge = (status) => {
    const colors = {
      open: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      in_progress: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      waiting: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
      resolved: 'bg-green-500/20 text-green-400 border-green-500/30'
    }
    return colors[status] || colors.open
  }

  // Load data on component mount
  useEffect(() => {
    loadTickets()
    loadSupportStats()
  }, [])

  // ===== NEW FUNCTIONS FOR COMPLETE CUSTOMER SUPPORT SYSTEM =====
  const loadTickets = async () => {
    try {
      const response = await supportAPI.getSupportTickets()
      setTickets(response.data)
    } catch (error) {
      console.error('Failed to load tickets:', error)
    }
  }

  const loadSupportStats = async () => {
    try {
      const response = await supportAPI.getSupportStats()
      setSupportStats(response.data)
    } catch (error) {
      console.error('Failed to load support stats:', error)
    }
  }

  const loadTicketDetails = async (id) => {
    try {
      setLoading(true)
      const response = await supportAPI.getTicketDetails(id)
      setSelectedTicket(response.data)
      setActiveTab('details')
    } catch (error) {
      console.error('Failed to load ticket details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTicket = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await supportAPI.createSupportTicket(ticketForm)
      alert('Support ticket created successfully!')
      setTicketForm({
        name: '',
        email: '',
        category: 'Security Issue',
        priority: 'Medium',
        subject: '',
        description: '',
        attachment: null
      })
      loadTickets()
      loadSupportStats()
    } catch (error) {
      console.error('Failed to create ticket:', error)
      alert('Failed to create support ticket. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSendReply = async () => {
    if (!replyMessage.trim() || !selectedTicket) return

    try {
      await supportAPI.replyTicket(selectedTicket.ticketId, { message: replyMessage })
      setReplyMessage('')
      // Reload ticket details to show the new reply
      loadTicketDetails(selectedTicket.ticketId)
    } catch (error) {
      console.error('Failed to send reply:', error)
      alert('Failed to send reply. Please try again.')
    }
  }

  const handleAskAI = async () => {
    if (!aiMessage.trim()) return

    setLoading(true)
    try {
      const response = await supportAPI.askSupportAI({ message: aiMessage })
      const newChatEntry = {
        user: aiMessage,
        ai: response.data.response,
        timestamp: new Date()
      }
      setChatHistory(prev => [...prev, newChatEntry])
      setAiMessage('')
    } catch (error) {
      console.error('Failed to get AI response:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] p-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center space-x-3 mb-8"
        >
          <HelpCircle className="w-8 h-8 text-cyan-400" />
          <h1 className="text-4xl font-bold neon-text">Customer Support</h1>
        </motion.div>
        <p className="text-slate-400 mb-8">Get help and support from our team</p>

        {/* ===== NEW TABS FOR COMPLETE CUSTOMER SUPPORT SYSTEM ===== */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('create')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'create' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Create Ticket
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'history' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            My Tickets
          </button>
          <button
            onClick={() => setActiveTab('ai')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'ai' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Assistant
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'stats' ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Support Stats
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {/* ===== NEW MAIN CONTENT AREA ===== */}
          <div className="lg:col-span-2">
            {/* ===== 1️⃣ CREATE TICKET FORM ===== */}
            {activeTab === 'create' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] px-6 py-6"
              >
                <h2 className="text-2xl font-bold text-slate-200 mb-6">Create Support Ticket</h2>
                <form onSubmit={handleCreateTicket} className="grid gap-6">
                  {/* Form Grid */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-slate-300 mb-2">Full Name</label>
                      <Input
                        type="text"
                        value={ticketForm.name}
                        onChange={(e) => setTicketForm({...ticketForm, name: e.target.value})}
                        placeholder="Your full name"
                        required
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">Email</label>
                      <Input
                        type="email"
                        value={ticketForm.email}
                        onChange={(e) => setTicketForm({...ticketForm, email: e.target.value})}
                        placeholder="your.email@example.com"
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Category and Priority */}
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="block text-slate-300 mb-2">Category</label>
                      <select
                        value={ticketForm.category}
                        onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
                        className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Security Issue">Security Issue</option>
                        <option value="Scan Problem">Scan Problem</option>
                        <option value="Account Issue">Account Issue</option>
                        <option value="Bug Report">Bug Report</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-slate-300 mb-2">Priority</label>
                      <select
                        value={ticketForm.priority}
                        onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
                        className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400"
                      >
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-slate-300 mb-2">Subject</label>
                    <Input
                      type="text"
                      value={ticketForm.subject}
                      onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                      placeholder="Brief description of your issue"
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-slate-300 mb-2">Description</label>
                    <textarea
                      value={ticketForm.description}
                      onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                      placeholder="Provide detailed information about your issue..."
                      className="w-full bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 min-h-[100px] resize-vertical"
                      required
                    />
                  </div>

                  {/* Attachment */}
                  <div>
                    <label className="block text-slate-300 mb-2">Optional Attachment</label>
                    <input
                      type="file"
                      accept=".pdf,.png,.jpg"
                      onChange={(e) => setTicketForm({...ticketForm, attachment: e.target.files[0]})}
                      className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-cyan-500 file:text-black hover:file:bg-cyan-400"
                    />
                    <p className="text-xs text-slate-400 mt-1">Supported formats: PDF, PNG, JPG (Max 10MB)</p>
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-medium rounded-lg"
                    >
                      {loading ? 'Creating...' : 'Create Ticket'}
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* ===== 2️⃣ TICKET HISTORY TABLE ===== */}
            {activeTab === 'history' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] px-6 py-6"
              >
                <h2 className="text-2xl font-bold text-slate-200 mb-6">My Support Tickets</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700/50">
                        <th className="text-left py-3 px-4 text-slate-300">Ticket ID</th>
                        <th className="text-left py-3 px-4 text-slate-300">Subject</th>
                        <th className="text-left py-3 px-4 text-slate-300">Category</th>
                        <th className="text-left py-3 px-4 text-slate-300">Priority</th>
                        <th className="text-left py-3 px-4 text-slate-300">Status</th>
                        <th className="text-left py-3 px-4 text-slate-300">Last Updated</th>
                        <th className="text-left py-3 px-4 text-slate-300">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr key={ticket.ticketId} className="border-b border-slate-700/30 hover:bg-[#1e293b]/50">
                          <td className="py-3 px-4 text-slate-200 font-mono">#{ticket.ticketId}</td>
                          <td className="py-3 px-4 text-slate-200 truncate max-w-xs">{ticket.subject}</td>
                          <td className="py-3 px-4 text-slate-400">{ticket.category}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-md text-xs border ${getPriorityBadge(ticket.priority.toLowerCase())}`}>
                              {ticket.priority}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-md text-xs border ${getStatusBadge(ticket.status)}`}>
                              {ticket.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-400">
                            {new Date(ticket.lastUpdated).toLocaleDateString()}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => loadTicketDetails(ticket.ticketId)}
                              className="text-cyan-400 hover:text-cyan-300 text-sm underline"
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {tickets.length === 0 && (
                    <div className="text-center py-8 text-slate-400">
                      No support tickets found. Create your first ticket above.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ===== 3️⃣ TICKET DETAILS VIEWER ===== */}
            {activeTab === 'details' && selectedTicket && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] px-6 py-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-200">Ticket #{selectedTicket.ticketId}</h2>
                    <p className="text-slate-400">{selectedTicket.subject}</p>
                  </div>
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 rounded-md text-sm border ${getPriorityBadge(selectedTicket.priority.toLowerCase())}`}>
                      {selectedTicket.priority} Priority
                    </span>
                    <span className={`px-3 py-1 rounded-md text-sm border ${getStatusBadge(selectedTicket.status)}`}>
                      {selectedTicket.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                {/* Ticket Info */}
                <div className="grid gap-4 md:grid-cols-2 mb-6 p-4 bg-[#1e293b]/50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{selectedTicket.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{selectedTicket.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Tag className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{selectedTicket.category}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">Created {new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Conversation History */}
                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-slate-200">Conversation History</h3>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {selectedTicket.responses.map((response, index) => (
                      <div key={index} className={`p-4 rounded-lg ${
                        response.from === 'user' ? 'bg-cyan-500/10 border border-cyan-500/20' : 'bg-slate-700/30'
                      }`}>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`text-sm font-medium ${
                            response.from === 'user' ? 'text-cyan-400' : 'text-slate-300'
                          }`}>
                            {response.from === 'user' ? 'You' : `Support Agent ${response.author || 'Sarah'}`}
                          </span>
                          <span className="text-xs text-slate-500">
                            {new Date(response.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-slate-200 whitespace-pre-wrap">{response.message}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ===== 4️⃣ REPLY BOX ===== */}
                <div className="border-t border-slate-600/50 pt-6">
                  <h3 className="text-lg font-semibold text-slate-200 mb-4">Send Reply</h3>
                  <div className="flex space-x-2">
                    <textarea
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply here..."
                      className="flex-1 bg-[#1e293b] border border-slate-600/50 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                      rows="3"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!replyMessage.trim()}
                      className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-medium flex items-center space-x-2 disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>Send</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ===== 5️⃣ AI ASSISTANT CHAT ===== */}
            {activeTab === 'ai' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] px-6 py-6"
              >
                <h2 className="text-2xl font-bold text-slate-200 mb-6">AI Support Assistant</h2>
                <p className="text-slate-400 mb-6">Get instant help with common questions and troubleshooting.</p>

                {/* Chat History */}
                <div className="h-64 overflow-y-auto mb-4 p-4 bg-[#1e293b]/50 rounded-lg space-y-4">
                  {chatHistory.length === 0 ? (
                    <div className="text-center text-slate-500">
                      <MessageCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>Ask me anything about SentinelAI!</p>
                    </div>
                  ) : (
                    chatHistory.map((chat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-end">
                          <div className="bg-cyan-500/20 border border-cyan-500/30 rounded-lg px-3 py-2 max-w-md">
                            <p className="text-cyan-200">{chat.user}</p>
                          </div>
                        </div>
                        <div className="flex justify-start">
                          <div className="bg-slate-700/50 rounded-lg px-3 py-2 max-w-md">
                            <p className="text-slate-200">{chat.ai}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Input Area */}
                <div className="flex space-x-2">
                  <Input
                    type="text"
                    value={aiMessage}
                    onChange={(e) => setAiMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                    placeholder="Ask me about SentinelAI features..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleAskAI}
                    disabled={!aiMessage.trim() || loading}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg"
                  >
                    {loading ? '...' : 'Ask AI'}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>

          {/* ===== 6️⃣ SUPPORT STATS SIDEBAR ===== */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-[#0f172a]/80 border border-slate-700/50 rounded-xl shadow-[0_0_20px_rgba(139,92,246,0.3)] px-6 py-6"
            >
              <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Support Statistics</span>
              </h2>

              <div className="grid gap-4">
                {/* Total Tickets */}
                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-400 text-sm font-medium">Total Tickets</p>
                      <p className="text-2xl font-bold text-slate-200">{supportStats.totalTickets}</p>
                    </div>
                    <HelpCircle className="w-8 h-8 text-blue-400" />
                  </div>
                </div>

                {/* Open Tickets */}
                <div className="p-4 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-400 text-sm font-medium">Open Tickets</p>
                      <p className="text-2xl font-bold text-slate-200">{supportStats.openTickets}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-yellow-400" />
                  </div>
                </div>

                {/* Resolved Tickets */}
                <div className="p-4 bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-400 text-sm font-medium">Resolved</p>
                      <p className="text-2xl font-bold text-slate-200">{supportStats.resolvedTickets}</p>
                    </div>
                    <BarChart3 className="w-8 h-8 text-green-400" />
                  </div>
                </div>

                {/* Average Response Time */}
                <div className="p-4 bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-400 text-sm font-medium">Avg Response Time</p>
                      <p className="text-2xl font-bold text-slate-200">{supportStats.avgResponseTime}</p>
                    </div>
                    <Clock className="w-8 h-8 text-purple-400" />
                  </div>
                </div>

                {/* High Priority Tickets */}
                <div className="p-4 bg-gradient-to-br from-red-500/10 to-red-600/10 border border-red-500/20 rounded-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-400 text-sm font-medium">High Priority</p>
                      <p className="text-2xl font-bold text-slate-200">{supportStats.highPriorityTickets}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-400" />
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
                <h3 className="text-lg font-semibold text-slate-200 mb-2">Need Help?</h3>
                <p className="text-slate-400 text-sm mb-4">
                  Our support team is here 24/7. Expect responses within {supportStats.avgResponseTime} for most inquiries.
                </p>
                <button
                  onClick={() => setActiveTab('create')}
                  className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black rounded-lg font-medium text-sm"
                >
                  Create New Ticket
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support
