import mongoose from 'mongoose'
import dotenv from 'dotenv'
import User from './models/User.js'
import Organization from './models/Organization.js'
import Incident from './models/Incident.js'
import Threat from './models/Threat.js'
import Scan from './models/Scan.js'

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

const checkDatabase = async () => {
  await connectDB()

  console.log('📊 Database Statistics:\n')
  console.log('=' .repeat(50))

  try {
    // Count documents in each collection
    const userCount = await User.countDocuments()
    const orgCount = await Organization.countDocuments()
    const incidentCount = await Incident.countDocuments()
    const threatCount = await Threat.countDocuments()
    const scanCount = await Scan.countDocuments()

    console.log(`👥 Users: ${userCount}`)
    console.log(`🏢 Organizations: ${orgCount}`)
    console.log(`🚨 Incidents: ${incidentCount}`)
    console.log(`⚠️  Threats: ${threatCount}`)
    console.log(`🔍 Scans: ${scanCount}`)
    console.log('=' .repeat(50))

    // Show sample data
    if (userCount > 0) {
      console.log('\n📋 Sample Users (first 3):')
      const users = await User.find().select('username email firstName lastName role').limit(3).lean()
      users.forEach((user, i) => {
        console.log(`  ${i + 1}. ${user.username} (${user.email}) - ${user.firstName} ${user.lastName} [${user.role}]`)
      })
    }

    if (orgCount > 0) {
      console.log('\n🏢 Sample Organizations (first 3):')
      const orgs = await Organization.find().select('name slug subscription.plan').limit(3).lean()
      orgs.forEach((org, i) => {
        console.log(`  ${i + 1}. ${org.name} (${org.slug}) - Plan: ${org.subscription?.plan || 'N/A'}`)
      })
    }

    if (incidentCount > 0) {
      console.log('\n🚨 Sample Incidents (first 3):')
      const incidents = await Incident.find().select('type severity status message createdAt').sort({ createdAt: -1 }).limit(3).lean()
      incidents.forEach((incident, i) => {
        console.log(`  ${i + 1}. [${incident.severity}] ${incident.type} - ${incident.status}`)
        console.log(`     ${incident.message?.substring(0, 60)}...`)
      })
    }

  } catch (error) {
    console.error('❌ Error checking database:', error.message)
  }

  await mongoose.connection.close()
  console.log('\n✅ Database check complete!')
  process.exit(0)
}

checkDatabase()
