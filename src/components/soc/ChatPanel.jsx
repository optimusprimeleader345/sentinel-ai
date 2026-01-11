import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, MessageSquare, User } from 'lucide-react'
import Button from '../Button'

const ChatPanel = ({ onSendMessage, isLoading, messages, userRole }) => {
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSendMessage = () => {
    if (inputMessage.trim() && !isLoading) {
      onSendMessage(inputMessage.trim())
      setInputMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getRoleBadge = (role) => {
    switch (role) {
      case 'admin': return { text: 'Admin', color: 'bg-red-500/20 text-red-400' }
      case 'analyst': return { text: 'Analyst', color: 'bg-orange-500/20 text-orange-400' }
      default: return { text: 'User', color: 'bg-blue-500/20 text-blue-400' }
    }
  }

  const roleInfo = getRoleBadge(userRole)

  return (
    <div className="flex flex-col h-full bg-slate-900/50 rounded-lg border border-slate-700/50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">AI SOC Assistant</h3>
            <p className="text-sm text-slate-400">Ask questions about security incidents</p>
          </div>
        </div>
        <div className={`px-2 py-1 rounded text-xs font-medium ${roleInfo.color}`}>
          {roleInfo.text}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400 mb-2">Start a conversation with the AI SOC Assistant</p>
              <p className="text-sm text-slate-500">
                Ask questions like "Why is this URL dangerous?" or "What should I do next?"
              </p>
            </motion.div>
          )}

          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-start space-x-3 ${
                message.type === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.type === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`max-w-[70%] ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-l-lg rounded-tr-lg'
                  : 'bg-slate-800/50 text-slate-300 rounded-r-lg rounded-tl-lg'
              } p-3`}>
                <div className="text-sm leading-relaxed">
                  {message.content}
                </div>
                <div className="text-xs opacity-70 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>

              {message.type === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-slate-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-slate-700/50">
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about this incident... (e.g., 'Why is this dangerous?', 'What should I do?')"
              className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows="2"
              disabled={isLoading}
            />
            {isLoading && (
              <div className="absolute right-3 top-3 flex space-x-1">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            )}
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isLoading}
            className="px-4 py-3 h-auto"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>

        {/* Tips */}
        <div className="mt-3 text-xs text-slate-500">
          <p className="mb-1">
            💡 <strong>Tips:</strong> Ask specific questions about incidents, risks, or remediation steps
          </p>
          <div className="flex flex-wrap gap-1 mt-2">
            {[
              "Why is this dangerous?",
              "What should I do next?",
              "Explain this alert",
              "Business impact?"
            ].map((tip, index) => (
              <button
                key={index}
                onClick={() => setInputMessage(tip)}
                disabled={isLoading}
                className="px-2 py-1 bg-slate-700/50 hover:bg-slate-700 rounded text-xs text-slate-400 hover:text-slate-300 transition-colors"
              >
                {tip}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPanel
