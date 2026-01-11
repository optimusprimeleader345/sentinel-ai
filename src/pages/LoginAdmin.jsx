import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
  Crown
} from 'lucide-react';
import Logo from '../assets/logo.tsx';

const LoginAdmin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [demoLoading, setDemoLoading] = useState(false);

  // Demo account login
  const handleDemoLogin = async () => {
    setDemoLoading(true);
    setError('');

    try {
      const result = await login('soc-director', 'demo-admin', 'admin');

      if (result.success) {
        const from = location.state?.from?.pathname || '/admin/dashboard';
        navigate(from, { replace: true });
      } else {
        setError('Demo login failed');
      }
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setDemoLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
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

      // Use AuthContext login function with admin role
      const result = await login(formData.username, formData.password, 'admin');

      if (result.success) {
        // Success - navigate to admin dashboard
        const from = location.state?.from?.pathname || '/admin/dashboard';
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

  // Demo account login
  const loginAsSOCDirector = async () => {
    setLoading(true);
    setError('');

    try {
      const result = await login('soc-director', 'demo-admin', 'admin');
      if (result.success) {
        // Small delay to ensure auth state updates
        setTimeout(() => {
          const from = location.state?.from?.pathname || '/admin/dashboard';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-black to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Demo Account Section */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-black/50 backdrop-blur-sm border border-red-500/30 rounded-lg p-4"
        >
          <h3 className="text-center text-white text-sm font-semibold mb-3">⚡ Quick Demo Access</h3>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={loginAsSOCDirector}
            disabled={loading}
            className={`w-full bg-gradient-to-r from-red-600 to-orange-600 text-white py-2 px-4 rounded-lg font-medium text-sm shadow-lg hover:shadow-red-500/25 transition-all duration-200 flex items-center justify-center space-x-2 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>SOC Director Demo</span>
          </motion.button>
        </motion.div>
      </div>
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Dark geometric patterns for admin interface */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-red-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-slate-800/10 rounded-full blur-3xl animate-pulse delay-500" />

        {/* Security grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(rgba(239, 68, 68, 0.2) 1px, transparent 1px),
              linear-gradient(90deg, rgba(239, 68, 68, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
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
          className="flex items-center space-x-2 text-slate-400 hover:text-red-400 transition-colors duration-200"
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
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-2xl blur-2xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Card */}
        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden">
          {/* Subtle inner glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5 pointer-events-none" />

          {/* Content */}
          <div className="relative p-8">
            {/* Logo Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center text-center mb-8"
            >
              <div className="p-4 bg-slate-900/50 rounded-2xl shadow-lg mb-4 relative">
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
                <Logo className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-red-500 to-orange-400 bg-clip-text text-transparent mb-2">
                SentinelAI Admin
              </h1>
              <div className="w-16 h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full" />
              <p className="text-xs text-slate-500 mt-2">ENTERPRISE SECURITY MANAGEMENT</p>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Enterprise Access</h2>
              <p className="text-slate-400 text-sm">Secure administrator authentication required.</p>
            </motion.div>

            {/* Warning Notice */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center space-x-3"
            >
              <Shield className="w-5 h-5 text-red-400 flex-shrink-0" />
              <p className="text-red-400 text-sm">Authorized administrative personnel only. Unauthorized access attempts are logged and monitored.</p>
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
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Administrator Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                  placeholder="Enter admin username"
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Security Key
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 pr-12 bg-slate-800/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-transparent text-white placeholder-slate-400 transition-all duration-200"
                    placeholder="Enter security key"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-red-400 transition-colors duration-200"
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
                className={`w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg font-bold text-white transition-all duration-200 flex items-center justify-center space-x-3 ${
                  loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-2xl hover:shadow-red-500/25'
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Authenticating Administrator...</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    <span>Secure Admin Access</span>
                  </>
                )}
              </motion.button>
            </form>

            {/* User Login Link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-8 text-center"
            >
              <p className="text-sm text-slate-400">
                Not an administrator?
                <button
                  onClick={() => navigate('/login/user')}
                  className="text-red-400 hover:text-red-300 ml-2 transition-colors duration-200"
                >
                  User Login
                </button>
              </p>
            </motion.div>

            {/* Security Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              className="absolute bottom-4 left-8 right-8 text-center"
            >
              <p className="text-slate-500 text-xs">
                All access attempts are monitored and logged in accordance with enterprise security policies.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginAdmin;
