// AI Autonomous Security Operations Page
// Main page for AI-powered SOAR (Security Orchestration, Automation & Response)

import React from 'react'
import AIAutonomousSecurity from '../components/AIAutonomousSecurity'

const AISecurityOperationsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <AIAutonomousSecurity />
      </div>
    </div>
  )
}

export default AISecurityOperationsPage
