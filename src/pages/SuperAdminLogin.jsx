import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';
import {
  Shield,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle,
  Key,
  User,
  ArrowLeft,
  Fingerprint,
  Smartphone,
  Mail,
  Clock,
  MapPin,
  Server,
  Globe
} from 'lucide-react';

// Government-themed login page for SuperAdmin access
const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    clearanceCode: '',
    location: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState('credentials'); // credentials, mfa, verification
  const [errors, setErrors] = useState({});
  const [securityChecks, setSecurityChecks] = useState({
    ipVerified: false,
    deviceTrusted: false,
    timeWindowValid: false,
    locationAuthorized: false
  });

  // Simulate security checks
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setSecurityChecks({
        ipVerified: true,
        deviceTrusted: true,
        timeWindowValid: true,
        locationAuthorized: true
      });
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const validateCredentials = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = 'Username is required';
    } else if (!/^[A-Za-z0-9_]{6,}$/.test(formData.username)) {
      newErrors.username = 'Invalid username format';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 12) {
      newErrors.password = 'Password must be at least 12 characters';
    }

    if (!formData.clearanceCode) {
      newErrors.clearanceCode = 'Security clearance code is required';
    } else if (!/^TS\/SCI-[A-Z0-9]{8}$/.test(formData.clearanceCode)) {
      newErrors.clearanceCode = 'Invalid clearance code format (TS/SCI-XXXXYYYY)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCredentialsSubmit = async (e) => {
    e.preventDefault();
    if (!validateCredentials()) return;

    setIsLoading(true);

    // Simulate authentication
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Check credentials (demo logic)
    if (formData.username === 'superadmin' &&
        formData.password === 'SuperAdmin2024!' &&
        formData.clearanceCode === 'TS/SCI-ABC12345') {
      setCurrentStep('mfa');
    } else {
      setErrors({ general: 'Invalid credentials or insufficient clearance' });
    }

    setIsLoading(false);
  };

  const handleMFASubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate MFA verification
    await new Promise(resolve => setTimeout(resolve, 1500));

    setCurrentStep('verification');
    setIsLoading(false);
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate final verification
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Actually log in the user through AuthContext
    try {
      const result = await login(formData.username, formData.password, 'superadmin');
      if (result.success) {
        // Successful login - redirect to SuperAdmin dashboard
        navigate('/super-admin');
      } else {
        setErrors({ general: 'Authentication failed' });
      }
    } catch (error) {
      setErrors({ general: 'Authentication error occurred' });
    }

    setIsLoading(false);
  };

  const renderCredentialsStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-blue-600 to-navy-600 rounded-xl shadow-lg">
            <Shield className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">SuperAdmin Access</h2>
        <p className="text-slate-400">National Cybersecurity Command Center</p>
        <div className="mt-4 px-4 py-2 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm font-medium">⚠️ TOP SECRET // SCI ACCESS REQUIRED</p>
        </div>

        {/* Demo Credentials Display */}
        <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <h3 className="text-blue-400 font-semibold mb-3 text-sm">DEMO CREDENTIALS</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-400">Username:</span>
              <span className="text-white font-mono">superadmin</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Password:</span>
              <span className="text-white font-mono">SuperAdmin2024!</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Clearance:</span>
              <span className="text-white font-mono">TS/SCI-ABC12345</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs mt-3 italic">Use these credentials for demonstration purposes</p>
        </div>
      </div>

      <form onSubmit={handleCredentialsSubmit} className="space-y-6">
        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Authorized Username
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/25"
              placeholder="Enter authorized username"
            />
          </div>
          {errors.username && <p className="text-red-400 text-sm mt-1">{errors.username}</p>}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Secure Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-12 pr-12 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/25"
              placeholder="Enter secure password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Clearance Code */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Security Clearance Code
          </label>
          <div className="relative">
            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              name="clearanceCode"
              value={formData.clearanceCode}
              onChange={handleInputChange}
              className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600/50 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400/25 font-mono"
              placeholder="TS/SCI-XXXXXXXX"
            />
          </div>
          {errors.clearanceCode && <p className="text-red-400 text-sm mt-1">{errors.clearanceCode}</p>}
          <p className="text-slate-500 text-xs mt-1">Format: TS/SCI-XXXXXXXX (Top Secret/Sensitive Compartmented Information)</p>
        </div>

        {errors.general && (
          <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-navy-600 hover:from-blue-700 hover:to-navy-700 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Authenticating...</span>
            </>
          ) : (
            <>
              <Shield className="w-5 h-5" />
              <span>Authenticate Credentials</span>
            </>
          )}
        </button>
      </form>
    </motion.div>
  );

  const renderMFAStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-green-600 to-blue-600 rounded-xl shadow-lg">
            <Fingerprint className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Multi-Factor Authentication</h2>
        <p className="text-slate-400">Complete additional security verification</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Smartphone className="w-5 h-5 text-green-400" />
            <span className="text-white font-medium">Mobile Authenticator</span>
          </div>
          <p className="text-slate-400 text-sm">Approve login on your registered device</p>
          <div className="mt-3 p-3 bg-green-500/10 border border-green-500/30 rounded text-center">
            <p className="text-green-400 text-sm font-mono">Approval Code: 847392</p>
          </div>
        </div>

        <div className="p-4 bg-slate-800/50 border border-slate-600/50 rounded-lg">
          <div className="flex items-center space-x-3 mb-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <span className="text-white font-medium">Email Verification</span>
          </div>
          <p className="text-slate-400 text-sm">Security code sent to authorized email</p>
          <div className="mt-3">
            <input
              type="text"
              placeholder="Enter 6-digit code"
              className="w-full px-3 py-2 bg-slate-700/50 border border-slate-600/50 rounded text-white placeholder-slate-400 focus:outline-none focus:border-blue-400 text-center font-mono"
              maxLength="6"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleMFASubmit}
        disabled={isLoading}
        className="w-full py-3 px-4 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Verifying...</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            <span>Complete MFA Verification</span>
          </>
        )}
      </button>
    </motion.div>
  );

  const renderVerificationStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="p-4 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-xl shadow-lg">
            <Globe className="w-12 h-12 text-white" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-white mb-2">Final Security Verification</h2>
        <p className="text-slate-400">Confirm access to National Security Systems</p>
      </div>

      {/* Security Status Checks */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Server className="w-5 h-5 text-slate-400" />
            <span className="text-white">IP Address Verification</span>
          </div>
          {securityChecks.ipVerified ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Fingerprint className="w-5 h-5 text-slate-400" />
            <span className="text-white">Device Authentication</span>
          </div>
          {securityChecks.deviceTrusted ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <Clock className="w-5 h-5 text-slate-400" />
            <span className="text-white">Time Window Validation</span>
          </div>
          {securityChecks.timeWindowValid ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>

        <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-slate-400" />
            <span className="text-white">Location Authorization</span>
          </div>
          {securityChecks.locationAuthorized ? (
            <CheckCircle className="w-5 h-5 text-green-400" />
          ) : (
            <div className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full animate-spin"></div>
          )}
        </div>
      </div>

      {/* Authorization Declaration */}
      <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg mb-6">
        <h3 className="text-yellow-400 font-semibold mb-2">Access Authorization Required</h3>
        <p className="text-slate-300 text-sm mb-4">
          By proceeding, you acknowledge access to Top Secret/Sensitive Compartmented Information (TS/SCI)
          systems and agree to comply with all national security directives and protocols.
        </p>
        <div className="flex items-center space-x-2">
          <input type="checkbox" id="authorization" className="rounded" />
          <label htmlFor="authorization" className="text-sm text-slate-300">
            I acknowledge and accept the security clearance requirements
          </label>
        </div>
      </div>

      <button
        onClick={handleVerificationSubmit}
        disabled={isLoading || !Object.values(securityChecks).every(check => check)}
        className="w-full py-3 px-4 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-semibold rounded-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Granting Access...</span>
          </>
        ) : (
          <>
            <Shield className="w-5 h-5" />
            <span>Grant SuperAdmin Access</span>
          </>
        )}
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-navy-500/20 rounded-full blur-3xl" />
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-6 left-6 flex items-center space-x-2 text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span>Back to Landing</span>
      </button>

      {/* Main Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md"
      >
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-navy-500/20 rounded-xl blur-xl opacity-50" />

        {/* Card Content */}
        <div className="relative bg-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl p-8 shadow-2xl">
          {/* Step Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-4">
              {[
                { step: 'credentials', label: 'Credentials' },
                { step: 'mfa', label: 'MFA' },
                { step: 'verification', label: 'Verify' }
              ].map((item, index) => (
                <div key={item.step} className="flex items-center space-x-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep === item.step
                      ? 'bg-blue-500 text-white'
                      : index < ['credentials', 'mfa', 'verification'].indexOf(currentStep)
                      ? 'bg-green-500 text-white'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {index < ['credentials', 'mfa', 'verification'].indexOf(currentStep) ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className={`text-xs ${
                    currentStep === item.step ? 'text-blue-400' : 'text-slate-500'
                  }`}>
                    {item.label}
                  </span>
                  {index < 2 && (
                    <div className={`w-8 h-px ${
                      index < ['credentials', 'mfa', 'verification'].indexOf(currentStep)
                        ? 'bg-green-500'
                        : 'bg-slate-600'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {currentStep === 'credentials' && renderCredentialsStep()}
            {currentStep === 'mfa' && renderMFAStep()}
            {currentStep === 'verification' && renderVerificationStep()}
          </AnimatePresence>

          {/* Security Notice */}
          <div className="mt-8 pt-6 border-t border-slate-700/50">
            <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
              <Shield className="w-4 h-4" />
              <span>All access attempts are logged and monitored</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SuperAdminLogin;
