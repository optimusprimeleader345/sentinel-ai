import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  UserPlus,
  Shield,
  AlertTriangle,
  Search,
  Filter,
  Edit,
  Trash2,
  Key,
  Lock,
  Unlock,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
  Settings,
  Download,
  Upload,
  Mail,
  Calendar,
  TrendingUp,
  Database,
  Clock,
  Activity
} from 'lucide-react';
import GlassCard from '../../components/admin/GlassCard';
import { useAuth } from '../../contexts/AuthContext.jsx';
import {
  userDatabase,
  userActivityMetrics,
  roleDistribution,
  securityAlerts,
  userGrowthData,
  departmentStats,
  recentUserActions,
  pendingApprovals,
  userComplianceStats
} from '../../data/admin/userManagement';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const UserManagement = () => {
  const { user } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('lastLogin');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserModal, setShowUserModal] = useState(false);
  const [showSecurityAlerts, setShowSecurityAlerts] = useState(true);
  const itemsPerPage = 12;

  // Filter and sort users
  const filteredUsers = userDatabase.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  }).sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];

    if (sortBy === 'lastLogin') {
      aValue = aValue ? new Date(aValue) : new Date(0);
      bValue = bValue ? new Date(bValue) : new Date(0);
    }

    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'inactive': return 'bg-slate-500/20 text-slate-400';
      case 'suspended': return 'bg-red-500/20 text-red-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const getRiskColor = (riskScore) => {
    if (riskScore >= 70) return 'text-red-400';
    if (riskScore >= 50) return 'text-orange-400';
    if (riskScore >= 30) return 'text-yellow-400';
    return 'text-green-400';
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-500/20 text-red-400';
      case 'analyst': return 'bg-orange-500/20 text-orange-400';
      case 'user': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-slate-500/20 text-slate-400';
    }
  };

  const handleUserAction = (action, user) => {
    console.log(`Action: ${action} for user: ${user.username}`);
    // Implement actual user management actions
  };

  return (
    <>
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div className="flex items-center space-x-4">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg shadow-lg">
            <Users className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
              User Management Center
            </h1>
            <p className="text-slate-400 text-sm">Enterprise User Administration & Access Control</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-lg font-semibold shadow-lg flex items-center space-x-2"
            onClick={() => setShowUserModal(true)}
          >
            <UserPlus className="w-4 h-4" />
            <span>Add User</span>
          </motion.button>
        </div>
      </motion.div>

      {/* User Activity Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {userActivityMetrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <GlassCard className="text-center">
              <div className="text-2xl font-bold text-white mb-1">{metric.value}</div>
              <div className="text-xs text-slate-400 mb-2">{metric.label}</div>
              <div className={`text-xs px-2 py-1 rounded-full ${metric.change.startsWith('+') ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                {metric.change}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* User Management Interface */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-8">

        {/* Main User Table */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="xl:col-span-2"
        >
          <GlassCard title="User Directory" icon={Users}>

            {/* Filters and Search */}
            <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-slate-800/40 rounded-lg">
              {/* Search */}
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="analyst">Analyst</option>
                <option value="user">User</option>
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
                <option value="pending">Pending</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                <option value="lastLogin">Sort by Login</option>
                <option value="username">Sort by Name</option>
                <option value="riskScore">Sort by Risk</option>
                <option value="createdAt">Sort by Created</option>
              </select>
            </div>

            {/* User Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-700/50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Role</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Risk</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Activity</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {paginatedUsers.map((user, index) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className="hover:bg-slate-800/30"
                    >
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user.username.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{user.username}</div>
                            <div className="text-xs text-slate-400">{user.department}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm font-semibold ${getRiskColor(user.riskScore)}`}>
                            {user.riskScore}
                          </span>
                          <div className="w-16 bg-slate-700 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                user.riskScore >= 70 ? 'bg-red-500' :
                                user.riskScore >= 50 ? 'bg-orange-500' :
                                user.riskScore >= 30 ? 'bg-yellow-500' :
                                'bg-green-500'
                              }`}
                              style={{ width: `${user.riskScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-slate-300">
                        {user.lastActivity}
                      </td>
                      <td className="px-4 py-4 text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setSelectedUser(user)}
                            className="p-1 text-slate-400 hover:text-indigo-400 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUserAction('edit', user)}
                            className="p-1 text-slate-400 hover:text-blue-400 transition-colors"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleUserAction('suspend', user)}
                            className={`${user.status === 'suspended' ? 'text-red-400' : 'text-slate-400'} p-1 hover:text-red-400 transition-colors`}
                          >
                            {user.status === 'suspended' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-slate-400">
                Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredUsers.length)} of {filteredUsers.length} users
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 bg-slate-700/50 hover:bg-slate-600/50 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm"
                >
                  Next
                </button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Side Panel - Analytics & Alerts */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >

          {/* Security Alerts */}
          <GlassCard title="Security Alerts" icon={AlertTriangle} className="mb-6">
            <div className="space-y-4">
              {securityAlerts.slice(0, 3).map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    alert.severity === 'high' ? 'border-l-red-500 bg-red-500/10' :
                    alert.severity === 'medium' ? 'border-l-yellow-500 bg-yellow-500/10' :
                    'border-l-blue-500 bg-blue-500/10'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white font-medium text-sm">{alert.userName}</span>
                    <span className={`px-2 py-0.5 rounded text-xs ${
                      alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                      alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {alert.severity}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mb-2">{alert.alertType}</div>
                  <div className="text-xs text-slate-400">{alert.description.substring(0, 60)}...</div>
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2 px-4 bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-400 rounded-lg transition-all text-sm"
                onClick={() => setShowSecurityAlerts(!showSecurityAlerts)}
              >
                {showSecurityAlerts ? 'Hide All' : 'View All'} Alerts
              </motion.button>
            </div>
          </GlassCard>

          {/* Role Distribution */}
          <GlassCard title="Role Distribution" icon={Users}>
            <div className="mb-4">
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie
                    data={roleDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    dataKey="count"
                    label={({ name, percentage }) => `${percentage}% ${name}`}
                  >
                    {roleDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #475569',
                    borderRadius: '6px'
                  }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-2 text-sm">
              {roleDistribution.map((role, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
                    <span className="text-slate-300">{role.role}</span>
                  </div>
                  <span className="text-white font-semibold">{role.count}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* User Growth Trends */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <GlassCard title="User Growth & Compliance" icon={TrendingUp}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">User Growth Trend</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={userGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #475569',
                      borderRadius: '6px'
                    }}
                  />
                  <Line dataKey="active" stroke="#10b981" strokeWidth={2} name="Active Users" />
                  <Line dataKey="newUsers" stroke="#3b82f6" strokeWidth={2} name="New Users" />
                  <Line dataKey="suspended" stroke="#ef4444" strokeWidth={2} name="Suspended" />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Compliance Overview</h3>
              <div className="space-y-4">
                {userComplianceStats.map((compliance, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-slate-800/40 rounded-lg"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-slate-300 text-sm">{compliance.complianceType}</span>
                      <span className="text-green-400 font-bold">{compliance.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-green-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${compliance.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400 mt-1">
                      <span>{compliance.compliant} Compliant</span>
                      <span>{compliance.nonCompliant} Non-compliant</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Actions */}
          <div className="border-t border-slate-700/50 pt-6 mt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Recent User Actions</h3>
            <div className="space-y-3">
              {recentUserActions.map((action, index) => (
                <motion.div
                  key={action.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center space-x-4 p-3 bg-slate-800/30 rounded-lg"
                >
                  <div className={`w-2 h-2 rounded-full ${
                    action.status === 'success' ? 'bg-green-400' :
                    action.status === 'alert' ? 'bg-red-400' :
                    action.status === 'warning' ? 'bg-yellow-400' :
                    'bg-blue-400'
                  }`}></div>
                  <div className="flex-1">
                    <div className="text-sm text-white">
                      <span className="font-medium">{action.userName}</span> {action.action.toLowerCase()} for <span className="font-medium">{action.targetUser}</span>
                    </div>
                    <div className="text-xs text-slate-400">{action.details}</div>
                  </div>
                  <div className="text-xs text-slate-500">
                    {new Date(action.timestamp).toLocaleString()}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* User Details Modal */}
      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedUser(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">User Details</h2>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Account Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Username:</span>
                      <span className="text-white">{selectedUser.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="text-white text-sm">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Department:</span>
                      <span className="text-white">{selectedUser.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Role:</span>
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${getRoleColor(selectedUser.role)}`}>
                        {selectedUser.role.charAt(0).toUpperCase() + selectedUser.role.slice(1)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Security Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Security Level:</span>
                      <span className="text-white">Level {selectedUser.securityLevel}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Risk Score:</span>
                      <span className={`${getRiskColor(selectedUser.riskScore)} font-semibold`}>{selectedUser.riskScore}/100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">MFA Enabled:</span>
                      <span className={`${selectedUser.mfaEnabled ? 'text-green-400' : 'text-red-400'}`}>
                        {selectedUser.mfaEnabled ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Failed Logins:</span>
                      <span className="text-white">{selectedUser.failedLoginAttempts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Compliance:</span>
                      <span className="text-green-400 font-semibold">{selectedUser.complianceScore}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={() => handleUserAction('edit', selectedUser)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
                >
                  Edit User
                </button>
                <button
                  onClick={() => handleUserAction('suspend', selectedUser)}
                  className={`px-4 py-2 text-white rounded-lg font-semibold ${
                    selectedUser.status === 'suspended'
                      ? 'bg-green-600 hover:bg-green-500'
                      : 'bg-red-600 hover:bg-red-500'
                  }`}
                >
                  {selectedUser.status === 'suspended' ? 'Reactivate' : 'Suspend'}
                </button>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg font-semibold"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UserManagement;
