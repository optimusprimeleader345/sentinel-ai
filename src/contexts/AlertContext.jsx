import React, { createContext, useContext, useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { incidentResponseAPI } from '../lib/api.js'

// Alert Context
const AlertContext = createContext()

// Alert Provider Component
export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [activeToast, setActiveToast] = useState(null)
  const alertIdRef = useRef(1)

  // Alert generation logic based on scan results
  const generateAlert = (scanResult) => {
    let alert = null

    switch (scanResult.type) {
      case 'url':
        if (scanResult.result === 'threat' && scanResult.details === 'phishing') {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'URL',
            severity: 'HIGH',
            title: 'Phishing URL Detected',
            description: `Malicious phishing URL blocked: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -25
          }
        } else if (scanResult.result === 'threat' && scanResult.details === 'malware') {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'URL',
            severity: 'CRITICAL',
            title: 'Malware URL Blocked',
            description: `Dangerous malware distribution URL prevented: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -30
          }
        }
        break

      case 'ip':
        if (scanResult.result === 'threat' && scanResult.details === 'blacklisted') {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'IP',
            severity: 'HIGH',
            title: 'Blacklisted IP Address',
            description: `IP address associated with malicious activity: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -30
          }
        } else if (scanResult.result === 'threat' && scanResult.details === 'abuse') {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'IP',
            severity: 'MEDIUM',
            title: 'IP with Abuse Reports',
            description: `IP address flagged for suspicious activity: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -15
          }
        }
        break

      case 'email':
        if (scanResult.result === 'threat' && scanResult.details === 'spoofing') {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'EMAIL',
            severity: 'MEDIUM',
            title: 'Email Spoofing Detected',
            description: `Email with spoofed sender address from: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -20
          }
        } else if (scanResult.result === 'threat' && scanResult.details === 'malicious') {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'EMAIL',
            severity: 'CRITICAL',
            title: 'Malicious Email Attachment',
            description: `Email containing dangerous attachment blocked: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -25
          }
        }
        break

      case 'password':
        if (scanResult.count > 1000) {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'PASSWORD',
            severity: 'CRITICAL',
            title: 'Critical Password Breach',
            description: `Password found in ${scanResult.count} breach databases: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -40
          }
        } else if (scanResult.count > 100) {
          alert = {
            id: `alert-${alertIdRef.current++}`,
            type: 'PASSWORD',
            severity: 'MEDIUM',
            title: 'Password Breach Detected',
            description: `Password found in ${scanResult.count} breach databases: ${scanResult.target}`,
            affectedAsset: scanResult.target,
            timestamp: new Date().toISOString(),
            read: false,
            scoreImpact: -25
          }
        }
        break
    }

    if (alert) {
      addAlert(alert)

      // Show toast for critical alerts
      if (alert.severity === 'CRITICAL') {
        showToast(alert)
      }
    }

    return alert
  }

  // Add new alert
  const addAlert = (alert) => {
    setAlerts(prev => [alert, ...prev])
    setUnreadCount(prev => prev + 1)

    // Automatically process high-severity alerts for incident response
    if (alert.severity === 'CRITICAL' || alert.severity === 'HIGH') {
      processAlertForIncident(alert)
    }
  }

  // Process alert for incident creation
  const processAlertForIncident = async (alert) => {
    try {
      console.log('🚨 Processing alert for incident creation:', alert.title)

      // Convert alert to incident format
      const incidentData = {
        title: alert.title,
        description: alert.description,
        type: alert.type,
        severity: alert.severity,
        source: 'SentinelAI Dashboard',
        affectedAsset: alert.affectedAsset,
        confidence: alert.confidence || 85
      }

      // Check if backend is available by testing a simple connection
      const isBackendAvailable = await checkBackendAvailability()

      if (isBackendAvailable) {
        // Backend is available - use real API
        try {
          const response = await incidentResponseAPI.processIncident(incidentData)

          if (response.success) {
            console.log('✅ Incident created automatically:', response.incidentId)

            // Update alert with incident ID
            setAlerts(prev => prev.map(a =>
              a.id === alert.id ? { ...a, incidentId: response.incidentId } : a
            ))

            // Show incident creation notification
            showToast({
              ...alert,
              title: 'Incident Created',
              description: `AI automatically created incident #${response.incidentId} for: ${alert.title}`,
              type: 'incident'
            })
          }
        } catch (apiError) {
          console.warn('⚠️ Backend API error, falling back to simulation')
          await simulateIncidentCreation(alert, incidentData)
        }
      } else {
        // Backend not available - simulate immediately without API call
        console.log('ℹ️ Backend not detected, using offline simulation mode')
        await simulateIncidentCreation(alert, incidentData)
      }
    } catch (error) {
      console.error('❌ Failed to process alert for incident:', error)
      // Don't rethrow - we want the app to continue working
    }
  }

  // Check if backend is available
  const checkBackendAvailability = async () => {
    try {
      // Quick health check - if this fails, backend is not available
      await fetch('http://localhost:5000/api/health', {
        method: 'GET',
        signal: AbortSignal.timeout(1000) // 1 second timeout
      })
      return true
    } catch (error) {
      return false
    }
  }

  // Simulate incident creation without API calls
  const simulateIncidentCreation = async (alert, incidentData) => {
    console.log('🔄 Simulating incident creation for offline mode')

    const mockIncidentId = `INC-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    // Update alert with mock incident ID
    setAlerts(prev => prev.map(a =>
      a.id === alert.id ? { ...a, incidentId: mockIncidentId } : a
    ))

    // Show simulated incident creation notification
    showToast({
      ...alert,
      title: 'Incident Created (Offline Mode)',
      description: `AI simulated incident creation #${mockIncidentId} for: ${alert.title}`,
      type: 'incident'
    })

    console.log('✅ Simulated incident created:', mockIncidentId)
  }

  // Mark alert as read
  const markAsRead = (alertId) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId ? { ...alert, read: true } : alert
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }

  // Mark all alerts as read
  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, read: true })))
    setUnreadCount(0)
  }

  // Clear all alerts
  const clearAllAlerts = () => {
    setAlerts([])
    setUnreadCount(0)
  }

  // Show toast notification
  const showToast = (alert) => {
    setActiveToast(alert)
    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setActiveToast(null)
    }, 5000)
  }

  // Dismiss toast
  const dismissToast = () => {
    setActiveToast(null)
  }

  // Toggle alert panel
  const togglePanel = () => {
    setIsPanelOpen(prev => !prev)
  }

  // Real-time simulation - generate mock alerts periodically
  useEffect(() => {
    const mockScanResults = [
      { type: 'url', result: 'threat', details: 'phishing', target: 'suspicious-bank.com/login' },
      { type: 'url', result: 'threat', details: 'malware', target: 'malware-site.net/download' },
      { type: 'ip', result: 'threat', details: 'blacklisted', target: '203.0.113.195' },
      { type: 'email', result: 'threat', details: 'spoofing', target: 'admin@company.com' },
      { type: 'email', result: 'threat', details: 'malicious', target: 'user@company.com' },
      { type: 'password', count: 150, target: 'user@company.com', result: 'threat', details: 'breach' },
      { type: 'password', count: 1200, target: 'admin@company.com', result: 'threat', details: 'breach' }
    ]

    // Generate initial alerts
    const initialAlerts = mockScanResults.slice(0, 3).map(result => {
      const alert = generateAlert(result)
      return alert
    }).filter(Boolean)

    // Periodic alert generation for demo
    const interval = setInterval(() => {
      const randomResult = mockScanResults[Math.floor(Math.random() * mockScanResults.length)]
      generateAlert(randomResult)
    }, 30000) // Generate alert every 30 seconds

    return () => clearInterval(interval)
  }, [])

  // Update unread count when alerts change
  useEffect(() => {
    const unread = alerts.filter(alert => !alert.read).length
    setUnreadCount(unread)
  }, [alerts])

  const value = {
    alerts,
    unreadCount,
    isPanelOpen,
    activeToast,
    generateAlert,
    addAlert,
    markAsRead,
    markAllAsRead,
    clearAllAlerts,
    showToast,
    dismissToast,
    togglePanel
  }

  return (
    <AlertContext.Provider value={value}>
      {children}
    </AlertContext.Provider>
  )
}

// Custom hook to use alert context
export const useAlerts = () => {
  const context = useContext(AlertContext)
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider')
  }
  return context
}

export default AlertContext
