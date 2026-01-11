import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, CheckCircle, XCircle, Clock, AlertTriangle, User, Play, Zap, Eye, Settings } from 'lucide-react'
import ActionBadge from './ActionBadge'
import { useAuth } from '../../contexts/AuthContext'

function ResponseDecision({ incident, onActionExecuted, onOverride }) {
  const { user } = useAuth()
  const [isExecuting, setIsExecuting] = useState(false)
  const [executedActions, setExecutedActions] = useState([])

  // Mock response engine evaluation (in real app, import from service)
  const getDecision = (incident) => {
    const severity = incident.severity?.toUpperCase()

    switch (severity) {
      case 'CRITICAL':
        return {
          actions: ['BLOCK_ASSET', 'ESCALATE_INCIDENT', 'NOTIFY_ADMIN'],
          autoExecute: true,
          status: 'auto-executing'
        }
      case 'HIGH':
        return {
          actions: ['RECOMMEND_BLOCK', 'NOTIFY_ADMIN'],
          autoExecute: false,
          status: 'requires-approval'
        }
      case 'MEDIUM':
        return {
          actions: ['RECOMMEND_REVIEW'],
          autoExecute: false,
          status: 'recommendation'
        }
      case 'LOW':
        return {
          actions: ['LOG_ONLY'],
          autoExecute: false,
          status: 'logged'
        }
      default:
        return {
          actions: ['LOG_ONLY'],
          autoExecute: false,
          status: 'logged'
        }
    }
  }

  const decision = getDecision(incident)

  const handleExecuteAction = async (action) => {
    if (isExecuting) return

    setIsExecuting(true)

    try {
      // Simulate execution delay
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1500 + 500))

      // Mock success/failure
      const success = Math.random() > 0.15 // 85% success rate

      const result = {
        action,
        status: success ? 'executed' : 'failed',
        timestamp: new Date().toISOString(),
        actor: 'SYSTEM'
      }

      setExecutedActions(prev => [...prev, result])

      if (onActionExecuted) {
        onActionExecuted(result)
      }
    } catch (error) {
      console.error('Action execution failed:', error)
    } finally {
      setIsExecuting(false)
    }
  }

  const handleBulkExecute = async () => {
    if (isExecuting) return

    for (const action of decision.actions) {
      await handleExecuteAction(action)
    }
  }

  const canExecute = (action) => {
    // Check user permissions
    if (user?.role === 'user') return false
    if (user?.role === 'analyst' && action === 'BLOCK_ASSET') return false
    return true
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'auto-executing':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'requires-approval':
        return 'bg-orange-100 text-orange-800 border-orange-300'
      case 'recommendation':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'logged':
        return 'bg-green-100 text-green-800 border-green-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-800/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-8 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className={`relative p-3 rounded-2xl ${getStatusColor(decision.status)} shadow-lg`}>
            <Shield className="w-6 h-6" />
            {decision.autoExecute && (
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-800 animate-pulse"></div>
            )}
          </div>
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-1">
              Response Decision Engine
            </h3>
            <p className="text-slate-400">
              {decision.actions.length} automated action{decision.actions.length !== 1 ? 's' : ''} determined
            </p>
          </div>
        </div>

        {/* Admin Override Button */}
        {user?.role === 'admin' && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onOverride && onOverride(incident)}
            className="px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Override</span>
          </motion.button>
        )}
      </div>

      {/* Decision Status */}
      <div className="mb-6">
        <div className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${getStatusColor(decision.status)} shadow-md`}>
          {decision.status === 'auto-executing' && <Zap className="w-5 h-5 mr-2 animate-pulse" />}
          {decision.status === 'requires-approval' && <Clock className="w-5 h-5 mr-2" />}
          {decision.status === 'recommendation' && <Eye className="w-5 h-5 mr-2" />}
          {decision.status === 'logged' && <CheckCircle className="w-5 h-5 mr-2" />}
          {decision.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </div>
      </div>

      {/* Actions List */}
      <div className="space-y-4 mb-8">
        <AnimatePresence>
          {decision.actions.map((action, index) => {
            const executed = executedActions.find(e => e.action === action)
            const isExecuted = !!executed
            const canExecuteThis = canExecute(action)

            return (
              <motion.div
                key={action}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
                className={`relative p-5 rounded-xl border transition-all duration-200 ${
                  isExecuted
                    ? 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 border-slate-500/50'
                    : 'bg-slate-800/30 border-slate-600/50 hover:border-slate-500/70 hover:bg-slate-700/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <ActionBadge
                      action={action}
                      status={isExecuted ? executed.status : 'pending'}
                    />
                    {isExecuted && (
                      <div className="flex items-center space-x-2">
                        {executed.status === 'executed' ? (
                          <div className="flex items-center space-x-2 text-green-400">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Executed</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-red-400">
                            <XCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Failed</span>
                          </div>
                        )}
                        <span className="text-xs text-slate-500">
                          {new Date(executed.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center space-x-3">
                    {!isExecuted && canExecuteThis && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleExecuteAction(action)}
                        disabled={isExecuting}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white rounded-lg text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isExecuting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Executing...</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4" />
                            <span>Execute</span>
                          </>
                        )}
                      </motion.button>
                    )}
                    {!canExecuteThis && !isExecuted && (
                      <div className="flex items-center space-x-2 text-slate-500">
                        <User className="w-4 h-4" />
                        <span className="text-sm">Insufficient permissions</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress indicator for executing actions */}
                {isExecuting && !isExecuted && (
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2 }}
                    className="mt-4 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                  />
                )}
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Bulk Actions */}
      {!decision.autoExecute && decision.actions.length > 1 && executedActions.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-6"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBulkExecute}
            disabled={isExecuting}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white rounded-2xl font-bold text-lg transition-all duration-300 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3"
          >
            {isExecuting ? (
              <>
                <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Executing All Actions...</span>
              </>
            ) : (
              <>
                <Zap className="w-6 h-6" />
                <span>Execute All Recommended Actions</span>
              </>
            )}
          </motion.button>
        </motion.div>
      )}

      {/* Auto-execution Notice */}
      <AnimatePresence>
        {decision.autoExecute && executedActions.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center p-4 rounded-xl border-2 border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 backdrop-blur-sm"
          >
            <div className="flex items-center justify-center space-x-3">
              <div className="relative">
                <AlertTriangle className="w-6 h-6 text-yellow-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <p className="text-yellow-200 font-semibold">Critical Severity Detected</p>
                <p className="text-yellow-300 text-sm">Actions will be executed automatically for immediate response</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default ResponseDecision
