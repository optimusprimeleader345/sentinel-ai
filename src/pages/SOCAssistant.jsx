import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Brain, AlertTriangle, MessageSquare, Users, Search, RefreshCw } from 'lucide-react'
import GlassCard from '../components/admin/GlassCard'
import Button from '../components/Button'
import IncidentContext from '../components/soc/IncidentContext'
import ChatPanel from '../components/soc/ChatPanel'
import AssistantMessage from '../components/soc/AssistantMessage'
import { generateSOCResponse, parseUserQuery, getSampleIncidents } from '../utils/socAssistant.js'
import { useAuth } from '../contexts/AuthContext.jsx'

const SOCAssistant = () => {
  const { user } = useAuth()
  const [selectedIncident, setSelectedIncident] = useState(null)
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [availableIncidents, setAvailableIncidents] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  // Load sample incidents on mount
  useEffect(() => {
    const incidents = getSampleIncidents()
    setAvailableIncidents(incidents)
    if (incidents.length > 0) {
      setSelectedIncident(incidents[0])
    }
  }, [])

  // Handle asking a question about the selected incident
  const handleAskQuestion = async (question) => {
    if (!selectedIncident) return

    // Add user message
    const userMessage = {
      type: 'user',
      content: question,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])

    setIsLoading(true)

    try {
      // Simulate AI processing delay
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Generate AI response
      const response = generateSOCResponse(question, selectedIncident, user?.role || 'analyst')

      // Add assistant message
      const assistantMessage = {
        type: 'assistant',
        content: response,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, assistantMessage])

    } catch (error) {
      console.error('SOC Assistant error:', error)

      // Add error message
      const errorMessage = {
        type: 'assistant',
        content: {
          summary: 'Unable to process your request at this time.',
          riskExplanation: 'An error occurred while analyzing the incident. Please try again or contact support if the issue persists.',
          mitreMapping: { technique: 'T0000', tactic: 'Unknown', name: 'Error', explanation: 'System error occurred' },
          recommendedActions: ['Try your question again', 'Check incident details', 'Contact support if issue persists'],
          businessImpact: null,
          confidence: 0,
          responseTime: 'Error',
          error: true
        },
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Handle sending a custom message
  const handleSendMessage = (message) => {
    handleAskQuestion(message)
  }

  // Filter incidents based on search
  const filteredIncidents = availableIncidents.filter(incident =>
    incident.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.incidentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    incident.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'critical': return 'text-red-400'
      case 'high': return 'text-orange-400'
      case 'medium': return 'text-yellow-400'
      default: return 'text-green-400'
    }
  }

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg shadow-lg">
            <Brain className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              AI SOC Assistant
            </h1>
            <p className="text-slate-400 text-sm">Intelligent security incident analysis and guidance</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm text-slate-400">Active Incidents</div>
            <div className="text-xl font-bold text-white">{availableIncidents.length}</div>
          </div>
          <Button
            onClick={() => {
              const incidents = getSampleIncidents()
              setAvailableIncidents(incidents)
            }}
            className="flex items-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Incident Selection */}
        <div className="lg:col-span-1 space-y-6">
          {/* Search and Filter */}
          <GlassCard title="Available Incidents" icon={AlertTriangle}>
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search incidents..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-slate-800/50 border border-slate-600/50 rounded-lg pl-10 pr-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Incident List */}
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredIncidents.map((incident, index) => (
                  <motion.button
                    key={incident.id}
                    onClick={() => {
                      setSelectedIncident(incident)
                      setMessages([]) // Clear chat when switching incidents
                    }}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedIncident?.id === incident.id
                        ? 'bg-blue-500/20 border border-blue-500/30'
                        : 'bg-slate-800/30 hover:bg-slate-800/50 border border-slate-700/30'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-white text-sm">{incident.id}</span>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${
                        incident.severity === 'critical' ? 'bg-red-500/20 text-red-400' :
                        incident.severity === 'high' ? 'bg-orange-500/20 text-orange-400' :
                        incident.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {incident.severity}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mb-1 capitalize">
                      {incident.incidentType.replace('-', ' ')}
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      {incident.affectedAsset}
                    </div>
                  </motion.button>
                ))}
              </div>

              {filteredIncidents.length === 0 && (
                <div className="text-center py-8 text-slate-500">
                  <AlertTriangle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No incidents found</p>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Quick Stats */}
          <GlassCard title="Incident Overview" icon={Users}>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Total Incidents</span>
                <span className="text-white font-bold">{availableIncidents.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Critical</span>
                <span className="text-red-400 font-bold">
                  {availableIncidents.filter(i => i.severity === 'critical').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">High Priority</span>
                <span className="text-orange-400 font-bold">
                  {availableIncidents.filter(i => i.severity === 'high').length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Active</span>
                <span className="text-green-400 font-bold">
                  {availableIncidents.filter(i => i.status === 'active').length}
                </span>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Panel - Chat Interface */}
        <div className="lg:col-span-2 space-y-6">
          {/* Incident Context */}
          {selectedIncident && (
            <IncidentContext
              incident={selectedIncident}
              onAskQuestion={handleAskQuestion}
            />
          )}

          {/* Chat Interface */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Chat Panel */}
            <div className="xl:col-span-1">
              <ChatPanel
                onSendMessage={handleSendMessage}
                isLoading={isLoading}
                messages={messages}
                userRole={user?.role}
              />
            </div>

            {/* Assistant Responses */}
            <div className="xl:col-span-1">
              <GlassCard title="AI Analysis" icon={MessageSquare}>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {messages.length === 0 && !selectedIncident && (
                    <div className="text-center py-8">
                      <Brain className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400 mb-2">Select an incident to begin analysis</p>
                      <p className="text-sm text-slate-500">
                        Choose an incident from the list to get AI-powered insights and recommendations
                      </p>
                    </div>
                  )}

                  {messages.length === 0 && selectedIncident && (
                    <div className="text-center py-8">
                      <MessageSquare className="w-12 h-12 text-slate-500 mx-auto mb-4" />
                      <p className="text-slate-400 mb-2">Ask the AI SOC Assistant a question</p>
                      <p className="text-sm text-slate-500">
                        Use the quick questions above or type your own question about this incident
                      </p>
                    </div>
                  )}

                  {messages
                    .filter(msg => msg.type === 'assistant')
                    .map((message, index) => (
                      <AssistantMessage
                        key={index}
                        response={message.content}
                        isLoading={false}
                        userRole={user?.role}
                      />
                    ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center text-xs text-slate-500"
      >
        <p>
          🤖 AI SOC Assistant provides intelligent security analysis and recommendations.
          {user?.role === 'admin' && ' Business impact assessments available for administrators.'}
        </p>
      </motion.div>
    </>
  )
}

export default SOCAssistant
