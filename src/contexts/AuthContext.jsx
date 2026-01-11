import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import wsService from '../lib/websocket.js';

// Create Auth Context
const AuthContext = createContext(null);

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const savedUser = localStorage.getItem('sentinelUser');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user data:', error);
        localStorage.removeItem('sentinelUser');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (username, password, role) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create user object based on role
      const userData = {
        id: Date.now(),
        username: username,
        role: role,
        email: getRoleEmail(username, role),
        permissions: getRolePermissions(role),
        lastLogin: new Date().toISOString(),
        securityLevel: getSecurityLevel(role),
        department: getDepartment(role)
      };

      // Save to localStorage
      localStorage.setItem('sentinelUser', JSON.stringify(userData));

      // Update state
      setUser(userData);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('sentinelUser');
  };

  // Check if user has permission for a feature
  const hasPermission = (requiredPermission) => {
    if (!user) return false;
    return user.permissions.includes(requiredPermission) ||
           user.permissions.includes('admin') ||
           user.permissions.includes('all_access');
  };

  // Get role-specific email format
  const getRoleEmail = (username, role) => {
    const roleDomains = {
      superadmin: 'nca.sentinelai.com',
      admin: 'admin.sentinelai.com',
      analyst: 'analyst.sentinelai.com',
      security: 'security.sentinelai.com',
      user: 'user.sentinelai.com'
    };
    return `${username}@${roleDomains[role] || 'user.sentinelai.com'}`;
  };

  // Get role-based permissions
  const getRolePermissions = (role) => {
    const rolePermissions = {
      admin: [
        'admin_view', 'admin_manage_users', 'admin_system_health',
        'admin_threat_analytics', 'admin_attack_map', 'admin_user_management',
        'admin_ai_agent_dashboard', 'admin_system_monitor', 'admin_reports',
        'threat_intel', 'behavior_analytics', 'ai_log_analyzer',
        'dark_web_monitor', 'threat_prediction', 'attack_simulation',
        'incident_response', 'defense_playbooks', 'reporting_center'
      ],
      analyst: [
        'behavior_analytics', 'threat_prediction', 'incident_response',
        'ai_log_analyzer', 'attack_simulation', 'zero_trust_analyzer',
        'reporting_center', 'threat_intel', 'dark_web_monitor',
        'compliance_center', 'ai_defense_bot', 'ai_guardian',
        'defense_playbooks'
      ],
      security: [
        'threat_intel', 'behavior_analytics', 'ai_log_analyzer',
        'dark_web_monitor', 'threat_prediction', 'incident_response',
        'defense_playbooks', 'reporting_center', 'attack_simulation',
        'zero_trust_analyzer', 'compliance_center', 'ai_defense_bot',
        'ai_guardian', 'system_processes', 'system_health',
        'scan_center', 'deepfake_detector'
      ],
      user: [
        'user_dashboard', 'threat_overview', 'ai_defense_bot',
        'ai_guardian', 'personal_security', 'education',
        'scan_center', 'deepfake_detector', 'secure_vault',
        'zero_trust_analyzer', 'compliance_center', 'customer_support',
        'behavior_analytics', 'threat_prediction', 'ai_log_analyzer',
        'reporting_center', 'dark_web_monitor', 'threat_intelligence',
        'defense_playbooks', 'incident_response', 'attack_simulation',
        'system_processes', 'system_health'
      ],
      superadmin: [
        'super_admin_access', 'national_security_clearance',
        'quantum_threat_management', 'global_cyber_operations',
        'presidential_authority', 'intelligence_fusion',
        'autonomous_defense_control', 'emergency_response_command',
        'admin_view', 'admin_manage_users', 'admin_system_health',
        'admin_threat_analytics', 'admin_attack_map', 'admin_user_management',
        'admin_ai_agent_dashboard', 'admin_system_monitor', 'admin_reports',
        'threat_intel', 'behavior_analytics', 'ai_log_analyzer',
        'dark_web_monitor', 'threat_prediction', 'attack_simulation',
        'incident_response', 'defense_playbooks', 'reporting_center'
      ]
    };
    return rolePermissions[role] || [];
  };

  // Get security clearance level
  const getSecurityLevel = (role) => {
    const levelMap = {
      superadmin: 6, // National Command Authority (highest level)
      admin: 5,      // Full enterprise admin (SOC director level)
      analyst: 4,    // Senior analyst (SOC analyst level)
      security: 3,   // Enterprise security professional (SOC analyst level)
      user: 2        // Basic user (consumer level)
    };
    return levelMap[role] || 1;
  };

  // Get department assignment
  const getDepartment = (role) => {
    const departmentMap = {
      superadmin: 'National Command Authority',
      admin: 'Security Operations Center',
      analyst: 'Threat Intelligence Division',
      security: 'Enterprise Security Operations',
      user: 'Secured Services'
    };
    return departmentMap[role] || 'General';
  };

  // Context value
  const value = {
    user,
    loading,
    login,
    logout,
    hasPermission,
    isAdmin: user?.role === 'admin',
    isAnalyst: user?.role === 'analyst',
    isUser: user?.role === 'user',
    isSuperAdmin: user?.role === 'superadmin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
