import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlassCard from './admin/GlassCard'
import {
  MessageSquare,
  Send,
  Bot,
  User,
  Zap,
  Settings,
  Maximize2,
  Minimize2,
  X,
  RefreshCw,
  Shield,
  Brain,
  Eye,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import {
  sendAIAssistantMessage,
  getAIAssistantMessages,
  getAIAssistantRecommendations,
  getAIAssistantCapabilities,
  getAIAssistantInsights
} from '../lib/api.js'

// Mock data for the AI assistant - would normally come from API
const mockCapabilities = [
  'Real-time threat analysis and alerting',
  'Personalized security recommendations',
  'Automated incident response guidance',
  'Behavior analysis and anomaly detection',
  'Compliance policy suggestions',
  'Network security monitoring',
  'Data encryption assistance',
  'Multi-factor authentication setup',
  'Password security evaluation',
  'Security training content delivery',
  'Advanced threat hunting operations',
  'AI-powered vulnerability assessment',
  'Predictive breach detection',
  'Automated security policy enforcement',
  'Real-time system health monitoring',
  'Advanced malware analysis',
  'Quantum-resistant encryption management',
  'Global threat intelligence fusion',
  'Autonomous defense orchestration',
  'Emergency response coordination'
]

const mockRecommendations = [
  {
    type: 'security',
    priority: 'high',
    title: 'Multi-Factor Authentication Setup',
    description: 'Enable MFA on all critical accounts to prevent unauthorized access.',
    action: 'Configure MFA',
    impact: 'Reduces account compromise risk by 99%'
  },
  {
    type: 'behavioral',
    priority: 'medium',
    title: 'Unusual Login Pattern Detected',
    description: 'Login attempts from unfamiliar location detected.',
    action: 'Review Login History',
    impact: 'Prevents potential account takeover'
  },
  {
    type: 'compliance',
    priority: 'low',
    title: 'Password Rotation Reminder',
    description: 'Several passwords are approaching expiration.',
    action: 'Rotate Passwords',
    impact: 'Maintains compliance standards'
  }
]

const mockInsights = [
  'Threat patterns have increased by 23% this week - primarily phishing attempts',
  'Your network security score has improved by 8 points following MFA implementation',
  'AI detected 15 potential vulnerabilities across your cloud infrastructure',
  'User behavior analysis shows 95% adherence to security best practices',
  'Three critical patches are pending deployment on production servers'
]

function PersonalAIAssistant({ isMinimized, setIsMinimized }) {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m your Personal Security AI Assistant. I\'m here to help you stay secure, analyze threats in real-time, provide personalized recommendations, and guide you through security best practices. How can I assist you today?',
      timestamp: new Date().toLocaleTimeString(),
      confidence: 98
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentView, setCurrentView] = useState('chat') // chat, recommendations, insights, capabilities, commands
  const [activeCommand, setActiveCommand] = useState(null)
  const [commandHistory, setCommandHistory] = useState([])
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response with realistic delay
    setTimeout(async () => {
      const response = await generateAIResponse(input)
      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 1500)
  }

  const generateAIResponse = async (userInput) => {
    // AI-powered responses based on context and security knowledge
    const responses = {
      greeting: [
        "Welcome! I'm monitoring your security 24/7 and have some personalized recommendations ready for you.",
        "Security scan complete! Your posture looks good, but I have some optimization suggestions.",
        "Authentication successful! I see you've enabled MFA - excellent choice for protection.",
      ],
      threat: [
        "🔴 HIGH PRIORITIES: I've detected 3 critical vulnerabilities that need immediate attention. Would you like me to guide you through remediation?",
        "⚠️ MEDIUM ALERT: Unusual login patterns detected from 2 different regions. I've initiated additional monitoring.",
        "🟡 MONITORING: Network traffic analysis shows normal patterns. Continuing automated surveillance.",
      ],
      help: [
        "I'll help you secure your accounts. First, let's enable two-factor authentication on all critical services.",
        "I recommend immediate password rotation for any accounts older than 90 days. I can guide you through this process.",
        "Your current security score is 87/100. Here's what we can do to improve it:",
      ],
      scan: [
        "🔍 DEEP SCAN INITIATED: I'm performing comprehensive analysis of your digital footprint and network.",
        "📊 SECURITY ASSESSMENT: Found 15 potential vulnerabilities. Most can be automated remediation.",
        "🛡️ PROTECTION STATUS: All security measures are active. Threat intelligence monitoring engaged.",
      ]
    }

    // Simulate AI analysis of user input
    const analysis = analyzeUserInput(userInput)

    return {
      id: Date.now(),
      role: 'assistant',
      content: getContextualResponse(analysis, userInput),
      timestamp: new Date().toLocaleTimeString(),
      confidence: Math.floor(Math.random() * 20) + 80, // 80-99% confidence
      analysis: analysis
    }
  }

  const analyzeUserInput = (input) => {
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes('threat') || lowerInput.includes('attack') || lowerInput.includes('hack')) {
      return 'threat_inquiry'
    }
    if (lowerInput.includes('help') || lowerInput.includes('assist') || lowerInput.includes('guide')) {
      return 'help_request'
    }
    if (lowerInput.includes('scan') || lowerInput.includes('check') || lowerInput.includes('analyze')) {
      return 'scan_request'
    }
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return 'greeting'
    }
    return 'general'
  }

  const getContextualResponse = (analysis, input) => {
    switch (analysis) {
      case 'threat_inquiry':
        return `Based on real-time threat intelligence, I can see your network is currently secure. However, global phishing campaigns are at 89% activity levels today. 

Key recommendations:
• 🔒 Enable advanced email filtering
• 🔑 Use unique, strong passwords
• 📱 Monitor account activity logs

Would you like me to run a specific security assessment or help with any particular concern?`

      case 'help_request':
        return `I'm here to help you maximize your security! Here's what I can assist with:

🛡️ **Real-time Protection:**
- Security posture monitoring and alerts
- Threat detection and response guidance
- Incident management support

🔒 **Account Security:**
- MFA setup and configuration
- Password strength analysis
- Login anomaly monitoring

📊 **Compliance & Training:**
- Security best practice education
- Compliance requirement guidance
- Automated security scoring

What specific security topic would you like me to help you with?`

      case 'scan_request':
        return `✅ **COMPREHENSIVE SECURITY SCAN COMPLETED**

📊 **Results Summary:**
- Network Security: 94/100
- Account Protection: 89/100
- Data Integrity: 96/100
- Compliance Status: 91/100

🔧 **Automated Actions Taken:**
- Updated 3 security signatures
- Blocked 12 suspicious attempts
- Enhanced monitoring on 2 endpoints

⚠️ **Critical Items Addressed:**
- Applied 15 pending security patches
- Configured advanced firewall rules
- Enabled behavioral analysis engines

🛡️ **Current Protection Status:** ACTIVE & SECURE

Your system is now running at optimal security levels. Would you like me to explain any of these results or take further actions?`

      case 'greeting':
        return `Greetings! 🤖 I'm your AI Security Guardian, constantly monitoring and protecting your digital world.

**Current Security Status:**
✅ Threat Intelligence: Active
✅ Network Monitoring: Operational
✅ Account Protection: Enhanced
✅ Incident Response: Ready

**Today's Highlights:**
• Successfully blocked 45 phishing attempts
• Updated 87 security signatures
• Analyzed 1.2M security events
• Security score maintained at 92/100

Is there anything specific you'd like me to help you with regarding your security posture?`

      default:
        return `I understand you're asking about "${input}". Based on my security expertise and your current profile, I can provide detailed guidance on:

🔍 **Security Analysis:**
- Real-time threat monitoring
- Vulnerability assessment
- Risk evaluation

🛠️ **Protection Guidance:**
- Security configuration assistance
- Best practice recommendations
- Training resources

📈 **Performance Monitoring:**
- Security metrics review
- Incident response evaluation
- Compliance checking

Would you like me to elaborate on any of these areas or provide specific recommendations for your situation?`
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const executeCommand = async () => {
    if (!input.trim()) return

    const command = input.trim()
    setCommandHistory(prev => [...prev, command])
    setInput('')
    setIsTyping(true)

    // Simulate command execution with realistic delay
    setTimeout(async () => {
      const response = await processCommand(command)
      setMessages(prev => [...prev, response])
      setIsTyping(false)
    }, 2000)
  }

  const processCommand = async (command) => {
    const cmd = command.toLowerCase()

    // Command responses
    const responses = {
      '/scan network': {
        content: `🔍 **NETWORK SECURITY SCAN INITIATED**

**Scan Progress:** 100% Complete
**Duration:** 2.3 seconds

📊 **SCAN RESULTS:**

**Network Security Score:** 94/100
**Active Connections:** 247
**Open Ports:** 12 (all secured)
**Firewall Status:** ACTIVE
**IDS/IPS Status:** OPERATIONAL

⚠️ **POTENTIAL ISSUES:**
• Port 3389 (RDP) exposed - Consider restricting access
• SSL certificate expires in 45 days
• 2 endpoints showing unusual traffic patterns

🛡️ **AUTOMATED ACTIONS TAKEN:**
• Updated firewall rules for suspicious traffic
• Applied latest security signatures
• Initiated behavioral analysis on flagged endpoints

**Next Recommended Action:** Review flagged endpoints manually

Would you like me to generate a detailed report or take additional remediation actions?`,
        type: 'success'
      },
      '/threat intel': {
        content: `🛡️ **GLOBAL THREAT INTELLIGENCE UPDATE**

**Intelligence Feed Status:** ACTIVE
**Last Updated:** ${new Date().toLocaleString()}
**Sources Active:** 12

🔴 **CRITICAL THREATS (3):**
• **Zero-Day Exploit:** CVE-2024-XXXX - Affects Windows systems
• **Ransomware Campaign:** LockBit targeting healthcare sector
• **Supply Chain Attack:** Malicious npm package in popular libraries

🟠 **HIGH PRIORITY (7):**
• Phishing campaigns increased by 45% targeting financial services
• New malware variant detected in APAC region
• DDoS attacks trending upward globally

🟡 **MONITORING (12):**
• Suspicious domain registrations in .ru and .cn TLDs
• Increased scanning activity from known botnets
• Social engineering attempts via LinkedIn

**AI Risk Assessment:** MEDIUM → HIGH
**Recommended Actions:**
1. Update endpoint protection signatures
2. Review and strengthen email filtering
3. Conduct targeted user awareness training
4. Implement advanced network segmentation

Would you like me to activate automated response protocols?`,
        type: 'warning'
      },
      '/mfa status': {
        content: `🔐 **MULTI-FACTOR AUTHENTICATION STATUS**

**MFA Implementation Score:** 78/100

✅ **ENABLED ACCOUNTS:** 892/1247 (71%)
• Administrator Accounts: 98% MFA enabled
• User Accounts: 68% MFA enabled
• Service Accounts: 45% MFA enabled

⚠️ **ACCOUNTS WITHOUT MFA:** 355
• Critical accounts without MFA: 12
• Accounts with weak MFA: 23

📱 **MFA METHODS IN USE:**
• Authenticator Apps: 67%
• SMS/Text: 23%
• Hardware Keys: 8%
• Push Notifications: 2%

🚨 **SECURITY CONCERNS:**
• 12 critical accounts lack MFA protection
• 23 accounts using SMS-based MFA (vulnerable to SIM swapping)
• 3 accounts with expired MFA tokens

**Recommended Actions:**
1. Enforce MFA for all critical accounts immediately
2. Migrate SMS-based MFA to app-based authentication
3. Implement hardware security keys for administrators
4. Set up automated MFA compliance monitoring

Would you like me to initiate MFA enforcement for critical accounts?`,
        type: 'info'
      },
      '/system health': {
        content: `💻 **SYSTEM SECURITY HEALTH ASSESSMENT**

**Overall Health Score:** 91/100

🟢 **EXCELLENT (Score: 95-100):**
• Endpoint Protection: 98/100
• Network Security: 94/100
• Data Encryption: 96/100

🟡 **GOOD (Score: 80-94):**
• Patch Management: 87/100 (12 critical patches pending)
• Access Controls: 89/100 (3 accounts with excessive permissions)
• Backup Integrity: 85/100 (2 backups failed last week)

🔴 **REQUIRES ATTENTION (Score: <80):**
• Configuration Drift: 76/100 (23 systems out of compliance)
• Log Management: 72/100 (Incomplete audit trails)

**Active Threats:** 0
**Incidents Today:** 2 (both contained)
**Security Alerts:** 7 (3 high, 4 medium)

**System Resources:**
• CPU Usage: 45%
• Memory Usage: 67%
• Storage Usage: 72%
• Network I/O: Normal

**Recommendations:**
1. Apply pending critical security patches
2. Review and remediate configuration drift
3. Implement automated compliance monitoring
4. Strengthen log collection and analysis

Would you like me to initiate automated remediation for critical issues?`,
        type: 'success'
      }
    }

    // Check for command patterns
    if (cmd.startsWith('/scan')) {
      return {
        id: Date.now(),
        role: 'assistant',
        content: responses['/scan network'].content,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 95,
        type: 'command_response',
        command: command
      }
    } else if (cmd.startsWith('/threat')) {
      return {
        id: Date.now(),
        role: 'assistant',
        content: responses['/threat intel'].content,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 92,
        type: 'command_response',
        command: command
      }
    } else if (cmd.startsWith('/mfa')) {
      return {
        id: Date.now(),
        role: 'assistant',
        content: responses['/mfa status'].content,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 98,
        type: 'command_response',
        command: command
      }
    } else if (cmd.startsWith('/system')) {
      return {
        id: Date.now(),
        role: 'assistant',
        content: responses['/system health'].content,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 94,
        type: 'command_response',
        command: command
      }
    } else if (cmd.startsWith('/help')) {
      return {
        id: Date.now(),
        role: 'assistant',
        content: `🆘 **SECURITY COMMAND REFERENCE**

**Quick Commands:**
• \`/scan network\` - Comprehensive network security scan
• \`/threat intel\` - Latest threat intelligence update
• \`/mfa status\` - Multi-factor authentication audit
• \`/system health\` - Overall system security health
• \`/compliance check\` - Regulatory compliance audit
• \`/incident report\` - Generate incident response report

**Advanced Commands:**
• \`/simulate attack --type=phishing\` - Run attack simulation
• \`/analyze logs --time=24h\` - Log analysis with time range
• \`/update policies --force\` - Force policy updates
• \`/backup critical --encrypt\` - Encrypted critical data backup
• \`/isolate endpoint --ip=192.168.1.100\` - Network isolation
• \`/quantum encrypt --file=secrets.txt\` - Quantum-safe encryption

**Tips:**
• Use tab completion for command parameters
• Commands support --help flag for detailed usage
• All commands are logged for audit purposes
• Emergency commands require additional confirmation

Type any command to get started, or ask me a question in natural language!`,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 100,
        type: 'help'
      }
    } else {
      // Unknown command - provide helpful response
      return {
        id: Date.now(),
        role: 'assistant',
        content: `❓ **UNKNOWN COMMAND:** \`${command}\`

I don't recognize that command. Here are some available options:

**Try these commands:**
• \`/scan network\` - Security scan
• \`/threat intel\` - Threat updates  
• \`/system health\` - Health check
• \`/help\` - Full command reference

Or ask me a question in natural language and I'll assist you with:
• Security analysis and recommendations
• Threat assessment and response guidance
• Compliance and policy advice
• System configuration assistance

What would you like to do?`,
        timestamp: new Date().toLocaleTimeString(),
        confidence: 85,
        type: 'error'
      }
    }
  }

  const toggleAssistant = () => {
    setIsOpen(!isOpen)
  }

  const renderContent = () => {
    switch (currentView) {
      case 'chat':
        return (
          <div className="flex flex-col h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={message.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-700 text-slate-200'
                    }`}>
                      {/* Message Header */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-1">
                          {message.role === 'user' ? (
                            <User className="w-3 h-3" />
                          ) : (
                            <Bot className="w-3 h-3" />
                          )}
                          <span className="text-xs opacity-70">
                            {message.role === 'user' ? 'You' : 'AI Assistant'}
                          </span>
                        </div>
                        {message.confidence && (
                          <span className="text-xs opacity-70">
                            {message.confidence}% confidence
                          </span>
                        )}
                      </div>
                      <div className="text-sm whitespace-pre-line">{message.content}</div>
                      <div className="text-xs opacity-60 mt-1 text-right">
                        {message.timestamp}
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-slate-700 text-slate-200 px-4 py-2 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Bot className="w-3 h-3" />
                        <span className="text-xs">AI Assistant is analyzing...</span>
                        <div className="flex space-x-1">
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce"></div>
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-1 h-1 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="border-t border-slate-700/50 p-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your security..."
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isTyping}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )

      case 'recommendations':
        return (
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Personalized Security Recommendations</h3>
            {mockRecommendations.map((rec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 rounded-lg border-l-4 ${
                  rec.priority === 'high' ? 'border-l-red-500 bg-red-500/5' :
                  rec.priority === 'medium' ? 'border-l-yellow-500 bg-yellow-500/5' :
                  'border-l-blue-500 bg-blue-500/5'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-1">{rec.title}</h4>
                    <p className="text-slate-300 text-sm mb-2">{rec.description}</p>
                    <p className="text-green-400 text-xs">{rec.impact}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    rec.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    rec.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {rec.priority.toUpperCase()}
                  </span>
                </div>
                <button className="text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded transition-colors">
                  {rec.action}
                </button>
              </motion.div>
            ))}
          </div>
        )

      case 'insights':
        return (
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">AI Security Insights</h3>
            {mockInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-3 bg-slate-800/50 rounded-lg border border-slate-700/30"
              >
                <div className="flex items-start space-x-3">
                  <Brain className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <p className="text-slate-300 text-sm">{insight}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )

      case 'capabilities':
        return (
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">AI Assistant Capabilities</h3>
            <div className="grid grid-cols-1 gap-3">
              {mockCapabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-3 p-3 bg-slate-800/50 rounded-lg"
                >
                  <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                  <span className="text-slate-300 text-sm">{capability}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case 'commands':
        return (
          <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
            <h3 className="text-lg font-semibold text-white mb-4">Security Command Center</h3>

            {/* Quick Commands */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-cyan-400 mb-2">Quick Security Commands</h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { cmd: '/scan network', desc: 'Run comprehensive network security scan', icon: Shield },
                  { cmd: '/threat intel', desc: 'Get latest threat intelligence update', icon: AlertTriangle },
                  { cmd: '/mfa status', desc: 'Check MFA configuration status', icon: Lock },
                  { cmd: '/incident report', desc: 'Generate incident response report', icon: FileText },
                  { cmd: '/compliance check', desc: 'Run compliance audit', icon: CheckCircle },
                  { cmd: '/system health', desc: 'Check system security health', icon: Brain }
                ].map((command, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setInput(command.cmd)}
                    className="flex items-center space-x-3 p-3 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all duration-200 text-left group"
                  >
                    <command.icon className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm">{command.cmd}</div>
                      <div className="text-slate-400 text-xs">{command.desc}</div>
                    </div>
                    <Zap className="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Advanced Commands */}
            <div className="space-y-3 border-t border-slate-700/50 pt-4">
              <h4 className="text-sm font-medium text-orange-400 mb-2">Advanced Operations</h4>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { cmd: '/simulate attack --type=phishing', desc: 'Run phishing attack simulation', icon: Target },
                  { cmd: '/analyze logs --time=24h', desc: 'Analyze security logs for anomalies', icon: TrendingUp },
                  { cmd: '/update policies --force', desc: 'Force update all security policies', icon: Settings },
                  { cmd: '/backup critical --encrypt', desc: 'Create encrypted backup of critical data', icon: Database },
                  { cmd: '/isolate endpoint --ip=192.168.1.100', desc: 'Isolate suspicious endpoint', icon: Network },
                  { cmd: '/quantum encrypt --file=secrets.txt', desc: 'Apply quantum-resistant encryption', icon: Key }
                ].map((command, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setInput(command.cmd)}
                    className="flex items-center space-x-3 p-3 bg-slate-800/30 hover:bg-slate-700/50 rounded-lg transition-all duration-200 text-left group border border-slate-700/30"
                  >
                    <command.icon className="w-4 h-4 text-orange-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-white font-medium text-sm font-mono">{command.cmd}</div>
                      <div className="text-slate-400 text-xs">{command.desc}</div>
                    </div>
                    <Zap className="w-3 h-3 text-slate-500 group-hover:text-orange-400 transition-colors" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Command History */}
            {commandHistory.length > 0 && (
              <div className="space-y-3 border-t border-slate-700/50 pt-4">
                <h4 className="text-sm font-medium text-green-400 mb-2">Recent Commands</h4>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {commandHistory.slice(-5).reverse().map((cmd, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center space-x-2 p-2 bg-slate-800/30 rounded text-xs"
                    >
                      <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300 font-mono flex-1 truncate">{cmd}</span>
                      <span className="text-slate-500">Executed</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Command Input */}
            <div className="border-t border-slate-700/50 pt-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      executeCommand()
                    }
                  }}
                  placeholder="Enter security command (e.g., /scan network)"
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500 font-mono text-sm"
                />
                <button
                  onClick={executeCommand}
                  disabled={!input.trim() || isTyping}
                  className="bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors font-medium"
                >
                  Execute
                </button>
              </div>
              <div className="text-xs text-slate-500 mt-2">
                Type /help for command reference or /scan for quick security assessment
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="fixed bottom-6 right-6"
      >
        <GlassCard className="p-0">
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full flex items-center space-x-3 p-4 hover:bg-slate-800/50 transition-colors group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-white font-semibold text-sm">AI Assistant</div>
              <div className="text-slate-400 text-xs">Always monitoring</div>
            </div>
            <Maximize2 className="w-4 h-4 text-slate-400 group-hover:text-white" />
          </button>
        </GlassCard>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="fixed bottom-6 right-6 w-96 h-[32rem] z-50"
    >
      <GlassCard className="flex flex-col h-full p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-white font-semibold">AI Security Assistant</h3>
              <div className="text-slate-400 text-xs">Online & Monitoring</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-slate-400 hover:text-white p-1"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-red-400 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-700/50">
          {[
            { id: 'chat', label: 'Chat', icon: MessageSquare },
            { id: 'commands', label: 'Commands', icon: Zap },
            { id: 'recommendations', label: 'Help', icon: Shield },
            { id: 'insights', label: 'Insights', icon: Eye },
            { id: 'capabilities', label: 'Capabilities', icon: Target }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCurrentView(tab.id)}
              className={`flex-1 flex items-center justify-center py-2 px-1 text-xs font-medium transition-colors ${
                currentView === tab.id
                  ? 'text-cyan-400 border-b-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-300'
              }`}
            >
              <tab.icon className="w-3 h-3 mr-1" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden">
          {renderContent()}
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default PersonalAIAssistant
