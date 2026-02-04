import mongoose from 'mongoose'
import dotenv from 'dotenv'
import bcrypt from 'bcryptjs'
import User from './models/User.js'
import Organization from './models/Organization.js'
import Incident from './models/Incident.js'
import Threat from './models/Threat.js'
import Scan from './models/Scan.js'
import Conversation from './models/Conversation.js'

dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/sentinelai')
    console.log('✅ Connected to MongoDB\n')
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message)
    process.exit(1)
  }
}

const generateMockData = async () => {
  await connectDB()

  console.log('🌱 Starting database seeding...\n')

  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    console.log('🗑️  Clearing existing data...')
    await User.deleteMany({})
    await Organization.deleteMany({})
    await Incident.deleteMany({})
    await Threat.deleteMany({})
    await Scan.deleteMany({})
    await Conversation.deleteMany({})
    console.log('✅ Existing data cleared\n')

    // Create Organizations
    console.log('🏢 Creating organizations...')
    const organizations = []
    const orgData = [
      {
        name: 'Acme Corporation',
        slug: 'acme-corp',
        domain: 'acme.com',
        subscription: {
          plan: 'enterprise',
          status: 'active',
          maxUsers: 100,
          features: ['threat-intelligence', 'ai-analysis', 'dark-web-monitoring', 'incident-response', 'compliance-reporting']
        },
        settings: {
          timezone: 'America/New_York',
          locale: 'en-US'
        }
      },
      {
        name: 'TechStart Inc',
        slug: 'techstart',
        domain: 'techstart.io',
        subscription: {
          plan: 'professional',
          status: 'active',
          maxUsers: 50,
          features: ['threat-intelligence', 'ai-analysis', 'incident-response']
        }
      },
      {
        name: 'Global Security Solutions',
        slug: 'global-security',
        domain: 'globalsec.com',
        subscription: {
          plan: 'starter',
          status: 'trial',
          maxUsers: 10,
          features: ['threat-intelligence']
        }
      }
    ]

    for (const orgInfo of orgData) {
      const org = await Organization.create(orgInfo)
      organizations.push(org)
      console.log(`  ✅ Created: ${org.name}`)
    }
    console.log(`✅ Created ${organizations.length} organizations\n`)

    // Create Users
    console.log('👥 Creating users...')
    const users = []
    const userData = [
      {
        username: 'admin',
        email: 'admin@acme.com',
        password: 'Admin123!',
        firstName: 'John',
        lastName: 'Admin',
        role: 'superadmin',
        organization: organizations[0]._id,
        organizationRole: 'owner',
        isActive: true
      },
      {
        username: 'analyst1',
        email: 'analyst@acme.com',
        password: 'Analyst123!',
        firstName: 'Sarah',
        lastName: 'Analyst',
        role: 'analyst',
        organization: organizations[0]._id,
        organizationRole: 'admin',
        isActive: true
      },
      {
        username: 'manager1',
        email: 'manager@techstart.io',
        password: 'Manager123!',
        firstName: 'Mike',
        lastName: 'Manager',
        role: 'manager',
        organization: organizations[1]._id,
        organizationRole: 'owner',
        isActive: true
      },
      {
        username: 'user1',
        email: 'user@techstart.io',
        password: 'User123!',
        firstName: 'Emma',
        lastName: 'User',
        role: 'user',
        organization: organizations[1]._id,
        organizationRole: 'member',
        isActive: true
      },
      {
        username: 'security_lead',
        email: 'security@globalsec.com',
        password: 'Security123!',
        firstName: 'David',
        lastName: 'Security',
        role: 'admin',
        organization: organizations[2]._id,
        organizationRole: 'owner',
        isActive: true
      }
    ]

    for (const userInfo of userData) {
      const user = await User.create(userInfo)
      users.push(user)
      console.log(`  ✅ Created: ${user.username} (${user.email})`)
    }
    console.log(`✅ Created ${users.length} users\n`)

    // Update organizations with createdBy
    for (let i = 0; i < organizations.length; i++) {
      organizations[i].createdBy = users[i * 2]?._id || users[0]._id
      await organizations[i].save()
    }

    // Create Threats
    console.log('⚠️  Creating threats...')
    const threats = []
    const threatData = [
      {
        indicator: {
          type: 'signature',
          value: 'malware_signature_123'
        },
        type: 'malware',
        severity: 'high',
        source: 'external',
        status: 'active',
        confidence: 85,
        metadata: {
          description: 'Trojan malware detected in network traffic',
          attackVector: 'network',
          targetedEntity: 'workstations'
        },
        intelligence: {
          firstSeen: new Date(Date.now() - 2 * 60 * 60 * 1000),
          lastSeen: new Date(Date.now() - 30 * 60 * 1000),
          riskScore: 75,
          tags: ['trojan', 'malware', 'network']
        },
        lifecycle: {
          discovered: new Date(Date.now() - 2 * 60 * 60 * 1000)
        },
        organization: organizations[0]._id
      },
      {
        indicator: {
          type: 'domain',
          value: 'fake-bank-phishing.com'
        },
        type: 'phishing',
        severity: 'medium',
        source: 'external',
        status: 'active',
        confidence: 70,
        metadata: {
          description: 'Phishing emails targeting employees',
          attackVector: 'email',
          targetedEntity: 'finance department'
        },
        intelligence: {
          firstSeen: new Date(Date.now() - 5 * 60 * 60 * 1000),
          lastSeen: new Date(Date.now() - 1 * 60 * 60 * 1000),
          riskScore: 60,
          tags: ['phishing', 'email', 'social-engineering']
        },
        lifecycle: {
          discovered: new Date(Date.now() - 5 * 60 * 60 * 1000)
        },
        organization: organizations[1]._id
      },
      {
        indicator: {
          type: 'ip',
          value: '192.168.100.50'
        },
        type: 'ddos',
        severity: 'critical',
        source: 'external',
        status: 'active',
        confidence: 95,
        metadata: {
          description: 'Large-scale DDoS attack targeting web servers',
          attackVector: 'network',
          targetedEntity: 'web infrastructure'
        },
        intelligence: {
          firstSeen: new Date(Date.now() - 30 * 60 * 1000),
          lastSeen: new Date(Date.now() - 5 * 60 * 1000),
          riskScore: 90,
          tags: ['ddos', 'network', 'critical']
        },
        lifecycle: {
          discovered: new Date(Date.now() - 30 * 60 * 1000)
        },
        organization: organizations[0]._id
      },
      {
        indicator: {
          type: 'ioc',
          value: 'unauthorized_db_access_2024'
        },
        type: 'data-breach',
        severity: 'critical',
        source: 'internal',
        status: 'mitigated',
        confidence: 80,
        metadata: {
          description: 'Unauthorized access to customer database detected',
          attackVector: 'internal',
          targetedEntity: 'customer database'
        },
        intelligence: {
          firstSeen: new Date(Date.now() - 24 * 60 * 60 * 1000),
          lastSeen: new Date(Date.now() - 20 * 60 * 60 * 1000),
          riskScore: 85,
          tags: ['data-breach', 'unauthorized-access', 'critical']
        },
        lifecycle: {
          discovered: new Date(Date.now() - 24 * 60 * 60 * 1000),
          mitigated: new Date(Date.now() - 20 * 60 * 60 * 1000)
        },
        response: {
          actionTaken: 'contained',
          automated: false
        },
        organization: organizations[2]._id
      }
    ]

    for (const threatInfo of threatData) {
      const threat = await Threat.create(threatInfo)
      threats.push(threat)
      console.log(`  ✅ Created: ${threat.metadata.description.substring(0, 40)}... [${threat.severity}]`)
    }
    console.log(`✅ Created ${threats.length} threats\n`)

    // Create Incidents
    console.log('🚨 Creating incidents...')
    const incidents = []
    const incidentData = [
      {
        id: 'INC-001',
        type: 'malware',
        severity: 'HIGH',
        status: 'INVESTIGATING',
        message: 'Malware detected on workstation',
        description: 'Trojan malware detected on employee workstation. Immediate isolation required.',
        assignee: users[1]._id,
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
      },
      {
        id: 'INC-002',
        type: 'phishing',
        severity: 'MEDIUM',
        status: 'CONTAINED',
        message: 'Phishing email campaign identified',
        description: 'Multiple phishing emails targeting finance department',
        assignee: users[2]._id,
        createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000)
      },
      {
        id: 'INC-003',
        type: 'dDOS',
        severity: 'CRITICAL',
        status: 'INVESTIGATING',
        message: 'DDoS attack in progress',
        description: 'Large-scale DDoS attack affecting web services',
        assignee: users[0]._id,
        createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
      }
    ]

    for (const incidentInfo of incidentData) {
      const incident = await Incident.create(incidentInfo)
      incidents.push(incident)
      console.log(`  ✅ Created: ${incident.id} [${incident.severity}]`)
    }
    console.log(`✅ Created ${incidents.length} incidents\n`)

    // Create Scans
    console.log('🔍 Creating scans...')
    const scanData = [
      {
        name: 'Weekly Vulnerability Scan',
        type: 'vulnerability',
        status: 'completed',
        target: {
          type: 'range',
          value: '192.168.1.0/24'
        },
        scanner: {
          name: 'Nessus',
          version: '10.5.0',
          engine: 'nessus'
        },
        progress: {
          current: 100,
          total: 100,
          percentage: 100
        },
        results: {
          summary: {
            high: 5,
            medium: 12,
            low: 8,
            info: 3
          }
        },
        createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
      },
      {
        name: 'Network Port Scan',
        type: 'port',
        status: 'running',
        target: {
          type: 'ip',
          value: '10.0.0.1'
        },
        scanner: {
          name: 'Nmap',
          version: '7.94',
          engine: 'nmap'
        },
        progress: {
          current: 45,
          total: 100,
          percentage: 45
        }
      },
      {
        name: 'Web Application Security Scan',
        type: 'web',
        status: 'completed',
        target: {
          type: 'url',
          value: 'https://example.com'
        },
        scanner: {
          name: 'OWASP ZAP',
          version: '2.12.0',
          engine: 'owasp-zap'
        },
        progress: {
          current: 100,
          total: 100,
          percentage: 100
        },
        results: {
          summary: {
            high: 2,
            medium: 5,
            low: 10,
            info: 15
          }
        },
        createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000)
      }
    ]

    for (const scanInfo of scanData) {
      scanInfo.createdBy = users[0]._id // Assign to admin user
      scanInfo.organization = organizations[0]._id // Assign to first organization
      await Scan.create(scanInfo)
      console.log(`  ✅ Created: ${scanInfo.name} [${scanInfo.status}]`)
    }
    console.log(`✅ Created ${scanData.length} scans\n`)

    // Create Conversations
    console.log('💬 Creating conversations...')
    const conversationData = [
      {
        userId: users[0]._id,
        messages: [
          {
            role: 'user',
            content: 'What are the current security threats?',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
          },
          {
            role: 'assistant',
            content: 'I\'ve analyzed your system and detected 3 active threats: 1 high-severity malware, 1 phishing campaign, and 1 DDoS attack. Would you like details on any specific threat?',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5000)
          }
        ],
        title: 'Security Threat Discussion',
        isActive: true,
        lastMessageAt: new Date(Date.now() - 2 * 60 * 60 * 1000 + 5000)
      }
    ]

    for (const convInfo of conversationData) {
      await Conversation.create(convInfo)
      console.log(`  ✅ Created conversation for ${users[0].username}`)
    }
    console.log(`✅ Created ${conversationData.length} conversations\n`)

    // Summary
    console.log('=' .repeat(50))
    console.log('📊 Database Seeding Complete!')
    console.log('=' .repeat(50))
    console.log(`✅ Organizations: ${organizations.length}`)
    console.log(`✅ Users: ${users.length}`)
    console.log(`✅ Threats: ${threats.length}`)
    console.log(`✅ Incidents: ${incidents.length}`)
    console.log(`✅ Scans: ${scanData.length}`)
    console.log(`✅ Conversations: ${conversationData.length}`)
    console.log('=' .repeat(50))
    console.log('\n🔑 Login Credentials:')
    console.log('  Admin: admin@acme.com / Admin123!')
    console.log('  Analyst: analyst@acme.com / Analyst123!')
    console.log('  Manager: manager@techstart.io / Manager123!')
    console.log('  User: user@techstart.io / User123!')
    console.log('  Security Lead: security@globalsec.com / Security123!')
    console.log('\n✅ All mock data has been added to MongoDB!')

  } catch (error) {
    console.error('❌ Error seeding database:', error)
  }

  await mongoose.connection.close()
  process.exit(0)
}

generateMockData()
