import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Zap,
  Eye,
  Download,
  CheckCircle,
  Brain,
  Activity,
  Target,
  Users,
  BarChart3,
  Lock,
  Globe,
  ArrowRight
} from 'lucide-react';

// Floating background animation
const FloatingElement = ({ children, delay = 0 }) => (
  <motion.div
    animate={{
      y: [0, -10, 0],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
);

// Glassmorphism card component
const GlassCard = ({ children, className = "", glowColor = "purple" }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6 shadow-2xl">
      {children}
    </div>
  </div>
);

// Feature card component
const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    className="group"
  >
    <GlassCard className="h-full hover:scale-105 transition-transform duration-300">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-4 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed">
          {description}
        </p>
      </div>
    </GlassCard>
  </motion.div>
);

const Landing = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('user');

  const handleGetStarted = () => {
    const routes = {
      'user': '/login/user',
      'admin': '/login/admin',
      'security': '/login/security',
      'super-admin': '/login/super-admin' // Super admin goes to dedicated login
    };
    navigate(routes[selectedRole]);
  };

  const handleLogin = () => {
    const routes = {
      'user': '/login/user',
      'admin': '/login/admin',
      'security': '/login/security',
      'super-admin': '/login/super-admin' // Super admin goes to dedicated login
    };
    navigate(routes[selectedRole]);
  };

  const features = [
    {
      icon: Brain,
      title: "AI Threat Intelligence",
      description: "Advanced ML algorithms analyze patterns and predict potential security threats before they impact your systems."
    },
    {
      icon: Shield,
      title: "AI Defense Bot",
      description: "Autonomous defense mechanisms that respond to threats in real-time with AI-driven decision making."
    },
    {
      icon: Eye,
      title: "Deepfake Detection",
      description: "Advanced computer vision and AI to identify manipulated media and prevent disinformation attacks."
    },
    {
      icon: Globe,
      title: "Dark Web Monitoring",
      description: "Continuous scanning of dark web sources to detect compromised credentials and emerging threats."
    },
    {
      icon: Activity,
      title: "Real-Time Scanner",
      description: "Live network scanning with AI-powered anomaly detection and instant threat assessment."
    },
    {
      icon: Lock,
      title: "Security Score Engine",
      description: "Comprehensive scoring system that evaluates your security posture and provide actionable insights."
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "AI-Augmented Detection",
      description: "Machine learning algorithms continuously evolve to detect sophisticated threats that traditional tools miss."
    },
    {
      icon: Shield,
      title: "Enterprise-Grade Security",
      description: "Built for enterprise environments with compliance frameworks, audit trails, and professional support."
    },
    {
      icon: Activity,
      title: "Real-Time Autonomous Monitoring",
      description: "24/7 automated threat monitoring with instant response capabilities and comprehensive reporting."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e27] via-[#0b1129] to-[#0a0e27] overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

        {/* Floating grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(139, 92, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 flex justify-between items-center px-8 py-6"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            SentinelAI
          </h1>
        </div>

        {/* Role Selection */}
        <div className="hidden md:flex items-center space-x-4">
          <span className="text-slate-400 text-sm">Access Level:</span>
          <div className="flex bg-slate-900/50 rounded-lg p-1 border border-slate-700/50">
            {['user', 'security', 'admin', 'super-admin'].map((role) => (
              <motion.button
                key={role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRole(role)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                  selectedRole === role
                    ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </motion.button>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogin}
            className="px-6 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:border-purple-500/50 transition-all duration-200"
          >
            Login
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
              Next-Gen AI Cybersecurity Intelligence Platform
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Real-time threat detection, AI-powered analysis, and autonomous response capabilities designed for the enterprise.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-white text-lg shadow-2xl flex items-center space-x-3"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogin}
              className="px-8 py-4 bg-slate-900/50 border border-slate-700/50 rounded-lg font-semibold text-slate-300 hover:text-white hover:border-purple-500/50 transition-all duration-200"
            >
              Login
            </motion.button>
          </motion.div>

          {/* Mobile Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="md:hidden mb-12"
          >
            <div className="text-center mb-4">
              <span className="text-slate-400 text-sm">Choose Access Level</span>
            </div>
            <div className="flex justify-center space-x-2 bg-slate-900/50 rounded-lg p-1 border border-slate-700/50 max-w-sm mx-auto">
              {['user', 'security', 'admin', 'super-admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => setSelectedRole(role)}
                  className={`flex-1 px-3 py-2 rounded-md text-xs font-medium transition-all duration-200 ${
                    selectedRole === role
                      ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {role.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Enterprise Security Features
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Comprehensive cybersecurity solutions powered by cutting-edge artificial intelligence and machine learning.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={0.2 * index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Why Choose SentinelAI
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Advanced technology meets enterprise-grade security for unparalleled protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 * index, duration: 0.6 }}
              >
                <GlassCard className="h-full">
                  <div className="flex flex-col items-center text-center space-y-6">
                    <div className="p-6 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-full">
                      <benefit.icon className="w-12 h-12 text-cyan-400" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-white">
                        {benefit.title}
                      </h3>
                      <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mx-auto" />
                      <p className="text-slate-300 leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="relative px-8 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              AI-Augmented Security Operations Center
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Next-generation security dashboard with predictive analytics, threat intelligence, and autonomous response capabilities.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-8">
                {/* Fake dashboard elements */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-lg p-4 border border-green-500/30">
                    <div className="text-green-400 text-sm mb-2">System Status</div>
                    <div className="text-white text-xl font-bold">All Systems Secure</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg p-4 border border-blue-500/30">
                    <div className="text-blue-400 text-sm mb-2">Threats Detected</div>
                    <div className="text-white text-xl font-bold">3 Active Threats</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg p-4 border border-purple-500/30">
                    <div className="text-purple-400 text-sm mb-2">AI Confidence</div>
                    <div className="text-white text-xl font-bold">98.7%</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Network Security</span>
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full w-4/5"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Endpoint Protection</span>
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full w-5/6"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300">Threat Intelligence</span>
                      <div className="w-32 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full w-3/4"></div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="relative"
                    >
                      <div className="w-24 h-24 border-4 border-slate-700 rounded-full"></div>
                      <div className="absolute inset-2 border-4 border-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"></div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start securing your digital environment with SentinelAI today
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join industry leaders who trust SentinelAI for enterprise-grade cybersecurity solutions.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg font-bold text-white text-lg shadow-2xl flex items-center space-x-3 mx-auto"
              >
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-8 py-12 border-t border-slate-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <span className="text-lg font-bold text-white">SentinelAI</span>
              <span className="text-slate-400">© 2025</span>
            </div>

            <div className="flex space-x-8 text-sm text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Documentation</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">GitHub</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
