import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  Shield,
  Eye,
  EyeOff,
  LogIn,
  ChevronLeft,
  AlertCircle,
  Loader,
  User,
  ChevronRight,
  X,
  Copy,
  Check
} from 'lucide-react';
import Logo from '../assets/logo.tsx';

const LoginUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Detect if this is security login route
  const isSecurityRoute = location.pathname === '/login/security';
  const defaultRole = isSecurityRoute ? 'security' : 'user';

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: defaultRole // Set default based on route
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [copiedField, setCopiedField] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleRoleChange = (role) => {
    setFormData(prev => ({
      ...prev,
      role
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Simple validation for demo
      if (!formData.username || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // Use AuthContext login function with selected role
      const result = await login(formData.username, formData.password, formData.role);

      if (result.success) {
        // Success - navigate to dashboard
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      } else {
        setError(result.error || 'Authentication failed');
      }

    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  // Demo account login function
  const loginAsRegularUser = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await login('regular-user', 'demo-user', 'user');
      if (result.success) {
        // Small delay to ensure auth state updates
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/dashboard';
          navigate(from, { replace: true });
        }, 100);
      } else {
        setError('Demo login failed');
      }
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const openDemoModal = () => {
    setShowDemoModal(true);
  };

  const closeDemoModal = () => {
    setShowDemoModal(false);
    setCopiedField('');
  };

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(''), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const useDemoCredentials = () => {
    setFormData({
      username: isSecurityRoute ? 'security-pro' : 'regular-user',
      password: isSecurityRoute ? 'sec-demo-2025' : 'demo-user',
      role: isSecurityRoute ? 'security' : 'user'
    });
    closeDemoModal();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0a0e27] to-[#0b0f19] flex items-center justify-center relative overflow-hidden">
      {/* Demo Account Section */}
      <div className="absolute top-16 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 max-w-md"
        >
          <h3 className="text-center text-white text-sm font-semibold mb-3">🚀 Quick Demo Access</h3>
          <div className="flex justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={openDemoModal}
              disabled={loading}
              className={`px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg font-medium text-sm shadow-lg hover:shadow-cyan-500/25 transition-all duration-200 flex items-center space-x-2 ${
                loading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <User className="w-4 h-4" />
              <span>View Demo Credentials</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Friendly patterns for user interface */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Friendly grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      {/* Back to Home Link */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-6 left-6 z-20"
      >
        <button
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>
      </motion.div>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full max-w-md mx-4"
      >
        {/* Glow effect behind card */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-2xl blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card */}
        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* Content */}
          <div className="relative p-8">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center mb-8"
            >
              <div className="p-4 bg-slate-900/50 rounded-2xl shadow-lg mb-4">
                <Logo className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                SentinelAI
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">
                {isSecurityRoute ? 'Enterprise Security Portal' : 'Welcome Back'}
              </h2>
              <p className="text-slate-400 text-sm">
                {isSecurityRoute ? 'Advanced threat intelligence & enterprise security operations.' : 'Your security journey starts here.'}
              </p>
            </motion.div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-3"
              >
                <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                <p className="text-red-400 text-sm">{error}</p>
              </motion.div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Role Selector */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <label className="block text-sm font-medium text-slate-300 mb-3">
                  Select Your Role
                </label>
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    onClick={() => handleRoleChange('user')}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.role === 'user'
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg border border-cyan-400/30'
                        : 'bg-slate-800/50 border border-slate-600/50 text-slate-400 hover:border-cyan-500/50 hover:text-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">User</div>
                      <div className="text-xs opacity-80 mt-1">Personal</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleChange('security')}
                    className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.role === 'security'
                        ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white shadow-lg border border-red-400/30'
                        : 'bg-slate-800/50 border border-slate-600/50 text-slate-400 hover:border-red-500/50 hover:text-white'
                    }`}
                  >
                    <div className="text-center">
                      <div className="font-semibold">Security</div>
                      <div className="text-xs opacity-80 mt-1">Enterprise</div>
                    </div>
                  </button>
                </div>
              </motion.div>

              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                  placeholder="Enter your username"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </motion.div>

              {/* Login Button */}
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                type="submit"
                disabled={loading}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.98 } : {}}
                className={`w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-lg font-bold text-white transition-all duration-200 flex items-center justify-center space-x-3 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-cyan-500/25'
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Signing you in...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Secure Login</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* Additional Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-8 space-y-4 text-center"
            >
              <div className="space-y-2">
                <a
                  href="#"
                  className="block text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  Forgot password?
                </a>
              </div>

              <div className="pt-4 border-t border-slate-700/50">
                <p className="text-sm text-slate-500 mb-3">Need administrative access?</p>
                <button
                  onClick={() => navigate('/login/admin')}
                  className="inline-flex items-center space-x-2 text-red-400 hover:text-red-300 transition-colors duration-200 text-sm font-medium"
                >
                  <span>Administrator Login</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="absolute bottom-4 left-8 right-8 text-center"
            >
              <p className="text-slate-500 text-xs">
                © 2025 SentinelAI. Your personal cybersecurity companion.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Demo Credentials Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={closeDemoModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Content */}
              <div className="bg-slate-900/95 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-gradient-to-br ${isSecurityRoute ? 'from-red-500 to-orange-500' : 'from-cyan-500 to-purple-500'} rounded-lg`}>
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">Demo Credentials</h3>
                      <p className="text-sm text-slate-400">
                        {isSecurityRoute ? 'Security Professional Account' : 'Regular User Account'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={closeDemoModal}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Credentials */}
                <div className="p-6 space-y-4">
                  {/* Username */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Username</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white font-mono text-sm">
                        {isSecurityRoute ? 'security-pro' : 'regular-user'}
                      </div>
                      <button
                        onClick={() => copyToClipboard(isSecurityRoute ? 'security-pro' : 'regular-user', 'username')}
                        className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Copy username"
                      >
                        {copiedField === 'username' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Password</label>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white font-mono text-sm">
                        {isSecurityRoute ? 'sec-demo-2025' : 'demo-user'}
                      </div>
                      <button
                        onClick={() => copyToClipboard(isSecurityRoute ? 'sec-demo-2025' : 'demo-user', 'password')}
                        className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                        title="Copy password"
                      >
                        {copiedField === 'password' ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-300">Role</label>
                    <div className={`px-3 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg font-medium text-sm ${
                      isSecurityRoute ? 'text-red-400' : 'text-cyan-400'
                    }`}>
                      {isSecurityRoute ? 'Security Professional (Enterprise)' : 'Regular User (Personal Security)'}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 p-6 border-t border-slate-700/50">
                  <button
                    onClick={useDemoCredentials}
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 text-white rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-200"
                  >
                    Use These Credentials
                  </button>
                  <button
                    onClick={closeDemoModal}
                    className="px-4 py-2 bg-slate-800/50 border border-slate-600/50 rounded-lg text-slate-300 hover:text-white hover:border-slate-500/50 transition-all duration-200"
                  >
                    Close
                  </button>
                </div>

                {/* Footer */}
                <div className="px-6 pb-4">
                  <p className="text-xs text-slate-500 text-center">
                    These are demo credentials for testing purposes only.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginUser;
