import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Ticket, Clock, CheckCircle } from 'lucide-react'
import Card from '../components/Card'
import Button from '../components/Button'
import { supportAPI } from '../lib/api.js'

function CustomerService() {
  const [tickets, setTickets] = useState([])
  const [selectedTicket, setSelectedTicket] = useState(null)

  const handleOpenChat = () => {
    // TODO: Open chat modal or redirect to chat interface
    alert('Chat feature coming soon!')
  }

  const handleCreateTicket = () => {
    // TODO: Open ticket creation form
    alert('Create ticket feature coming soon!')
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
    </div>
  )
}

export default CustomerService
