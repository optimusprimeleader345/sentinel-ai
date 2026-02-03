import Organization from '../models/Organization.js'
import User from '../models/User.js'

// Create organization
export const createOrganization = async (req, res) => {
  try {
    const { name, domain, subscription } = req.body
    
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Organization name is required'
      })
    }
    
    const organization = new Organization({
      name,
      domain,
      subscription: subscription || { plan: 'free', status: 'trial' },
      createdBy: req.user?.userId
    })
    
    await organization.save()
    
    // Assign creator as owner
    if (req.user?.userId) {
      await User.findByIdAndUpdate(req.user.userId, {
        organization: organization._id,
        organizationRole: 'owner'
      })
    }
    
    res.status(201).json({
      success: true,
      organization
    })
  } catch (error) {
    console.error('Create organization error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to create organization'
    })
  }
}

// Get current user's organization
export const getMyOrganization = async (req, res) => {
  try {
    if (!req.organizationId) {
      return res.status(404).json({
        success: false,
        error: 'No organization found'
      })
    }
    
    const organization = await Organization.findById(req.organizationId)
    
    if (!organization) {
      return res.status(404).json({
        success: false,
        error: 'Organization not found'
      })
    }
    
    res.json({
      success: true,
      organization
    })
  } catch (error) {
    console.error('Get organization error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get organization'
    })
  }
}

// Update organization
export const updateOrganization = async (req, res) => {
  try {
    if (!req.organizationId) {
      return res.status(403).json({
        success: false,
        error: 'Organization access required'
      })
    }
    
    // Check if user has permission (owner or admin)
    if (!['owner', 'admin'].includes(req.organizationRole)) {
      return res.status(403).json({
        success: false,
        error: 'Insufficient permissions to update organization'
      })
    }
    
    const updates = req.body
    delete updates._id
    delete updates.slug
    delete updates.createdBy
    
    const organization = await Organization.findByIdAndUpdate(
      req.organizationId,
      { $set: updates },
      { new: true, runValidators: true }
    )
    
    if (!organization) {
      return res.status(404).json({
        success: false,
        error: 'Organization not found'
      })
    }
    
    res.json({
      success: true,
      organization
    })
  } catch (error) {
    console.error('Update organization error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to update organization'
    })
  }
}

// Get organization members
export const getOrganizationMembers = async (req, res) => {
  try {
    if (!req.organizationId) {
      return res.status(403).json({
        success: false,
        error: 'Organization access required'
      })
    }
    
    const members = await User.find({
      organization: req.organizationId
    })
      .select('-password -twoFactorSecret')
      .sort({ createdAt: -1 })
    
    res.json({
      success: true,
      members,
      count: members.length
    })
  } catch (error) {
    console.error('Get members error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get organization members'
    })
  }
}

// Get organization statistics
export const getOrganizationStats = async (req, res) => {
  try {
    if (!req.organizationId) {
      return res.status(403).json({
        success: false,
        error: 'Organization access required'
      })
    }
    
    const userCount = await User.countDocuments({
      organization: req.organizationId
    })
    
    res.json({
      success: true,
      stats: {
        users: userCount
      }
    })
  } catch (error) {
    console.error('Get organization stats error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to get organization statistics'
    })
  }
}
