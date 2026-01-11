import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, Clock, X, Zap, Shield, ChevronDown, CheckCircle, AlertCircle } from 'lucide-react'
import { useAlerts } from '../contexts/AlertContext'
import { getPredictionAlerts } from '../lib/api.js'

const AlertPanel = () => {
  const panelRef = useRef(null)

  // Get alerts from AlertContext
  const { alerts, isPanelOpen, markAsRead, markAllAsRead, clearAllAlerts, unreadCount } = useAlerts()

  const getSeverityColor = (severity) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return 'border-red-500/50 bg-red-500/10'
      case 'HIGH': return 'border-orange-500/50 bg-orange-500/10'
      case 'MEDIUM': return 'border-yellow-500/50 bg-yellow-500/10'
      default: return 'border-gray-500/50 bg-gray-500/10'
    }
  }

  const getSeverityIcon = (severity) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return <Zap className="w-4 h-4 text-red-400" />
      case 'HIGH': return <AlertTriangle className="w-4 h-4 text-orange-400" />
      case 'MEDIUM': return <Clock className="w-4 h-4 text-yellow-400" />
      default: return <Shield className="w-4 h-4 text-gray-400" />
    }
  }

  const getTimeAgo = (timestamp) => {
    const now = new Date()
    const alertTime = new Date(timestamp)
    const diffInMinutes = Math.floor((now - alertTime) / (1000 * 60))

    if (diffInMinutes < 1) return 'Just now'
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`

    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`

    const diffInDays = Math.floor(diffInHours / 24)
    return `${diffInDays}d ago`
  }

  const getScanTypeIcon = (type) => {
    switch (type.toUpperCase()) {
      case 'URL': return <AlertTriangle className="w-4 h-4 text-blue-400" />
      case 'IP': return <Shield className="w-4 h-4 text-purple-400" />
      case 'EMAIL': return <AlertCircle className="w-4 h-4 text-green-400" />
      case 'PASSWORD': return <CheckCircle className="w-4 h-4 text-orange-400" />
      default: return <AlertTriangle className="w-4 h-4 text-gray-400" />
    }
  }

  const unreadAlerts = alerts.filter(alert => !alert.read)

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        // Don't close automatically - let the bell control it
      }
    }

    if (isPanelOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isPanelOpen])

  return (
    <AnimatePresence>
      {isPanelOpen && (
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-20 right-6 z-50 w-96 max-w-[90vw] bg-[#0f172a]/95 backdrop-blur-sm rounded-xl border border-slate-700/50 shadow-2xl overflow-hidden"
        >
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Security Alerts</h3>
              <div className="flex items-center space-x-2">
                {unreadAlerts.length > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                  >
                    Mark all read
                  </button>
                )}
                {alerts.length > 0 && (
                  <button
                    onClick={clearAllAlerts}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {alerts.length === 0 ? (
                <div className="text-center py-8">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-slate-400">No security alerts</p>
                  <p className="text-slate-500 text-sm">All systems are secure</p>
                </div>
              ) : (
                alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} hover:bg-opacity-20 transition-colors ${
                      !alert.read ? 'ring-2 ring-cyan-500/50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className="flex-shrink-0 mt-1">
                          {!alert.read ? (
                            <div className="relative">
                              {getSeverityIcon(alert.severity)}
                              <div className="absolute -top-1 -right-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                            </div>
                          ) : (
                            getSeverityIcon(alert.severity)
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              alert.severity === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                              alert.severity === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                              alert.severity === 'MEDIUM' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {alert.severity}
                            </span>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                              alert.type === 'URL' ? 'bg-blue-500/20 text-blue-400' :
                              alert.type === 'IP' ? 'bg-purple-500/20 text-purple-400' :
                              alert.type === 'EMAIL' ? 'bg-green-500/20 text-green-400' :
                              alert.type === 'PASSWORD' ? 'bg-orange-500/20 text-orange-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {alert.type}
                            </span>
                            <span className="text-xs text-slate-500">
                              {getTimeAgo(alert.timestamp)}
                            </span>
                          </div>

                          <h4 className="font-semibold text-white text-sm mb-2">{alert.title}</h4>
                          <p className="text-slate-300 text-sm">{alert.description}</p>

                          {alert.affectedAsset && (
                            <div className="mt-2 text-xs text-slate-400">
                              <span className="font-medium">Affected:</span> {alert.affectedAsset}
                            </div>
                          )}

                          {alert.scoreImpact && (
                            <div className="mt-1 text-xs">
                              <span className="text-slate-400">Security Score Impact:</span>
                              <span className={`ml-1 font-semibold ${
                                alert.scoreImpact < -20 ? 'text-red-400' :
                                alert.scoreImpact < -10 ? 'text-orange-400' :
                                'text-yellow-400'
                              }`}>
                                {alert.scoreImpact}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 ml-2">
                        {!alert.read && (
                          <button
                            onClick={() => markAsRead(alert.id)}
                            className="text-cyan-400 hover:text-cyan-300 transition-colors p-1"
                            title="Mark as read"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        <button className="text-slate-400 hover:text-white transition-colors p-1">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              )}
            </div>

            {/* Footer Stats */}
            {alerts.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-700">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-400">Total Alerts:</span>
                    <span className="text-white font-semibold ml-2">{alerts.length}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Unread:</span>
                    <span className="text-cyan-400 font-semibold ml-2">{unreadAlerts.length}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Critical:</span>
                    <span className="text-red-400 font-semibold ml-2">
                      {alerts.filter(a => a.severity === 'CRITICAL').length}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400">High:</span>
                    <span className="text-orange-400 font-semibold ml-2">
                      {alerts.filter(a => a.severity === 'HIGH').length}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AlertPanel
