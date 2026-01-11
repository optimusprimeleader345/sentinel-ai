import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  Shield,
  Zap,
  ArrowRight,
  Brain,
  Eye,
  Target,
  CheckCircle,
  Activity,
  Users,
  Globe,
  Network,
  Monitor,
  FileText,
  HardDrive,
  Lock,
  Map,
  Cpu,
  Server,
  Smartphone,
  Quote,
  Award,
  Star,
  TrendingUp,
  Clock,
  Check,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft
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
        <div className="p-4 bg-gradient-to-br from-accent-500 to-highlight-500 rounded-full group-hover:scale-110 transition-transform duration-300 shadow-neon-purple">
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

// Metric card component
const MetricCard = ({ number, label }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-center"
  >
    <GlassCard className="p-8 border-highlight-500/30">
      <div className="text-4xl font-bold bg-gradient-to-r from-accent-500 to-highlight-500 bg-clip-text text-transparent">
        {number}
      </div>
      <div className="text-slate-300 mt-2 text-lg">
        {label}
      </div>
    </GlassCard>
  </motion.div>
);

// Testimonial card component
const TestimonialCard = ({ quote, author, role, company }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="h-full"
  >
    <GlassCard className="h-full p-8">
      <div className="flex flex-col h-full">
        <div className="mb-4 text-highlight-500">
          <Quote className="w-8 h-8" />
        </div>
        <p className="text-slate-300 mb-6 flex-grow leading-relaxed">
          "{quote}"
        </p>
        <div className="border-t border-slate-700/50 pt-4">
          <div className="font-bold text-white">
            {author}
          </div>
          <div className="text-slate-400 text-sm">
            {role}
          </div>
          <div className="text-accent-500 text-sm font-medium">
            {company}
          </div>
        </div>
      </div>
    </GlassCard>
  </motion.div>
);

// UI Preview card component
const UIPreviewCard = ({ title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-xl overflow-hidden shadow-2xl"
  >
    <div className="p-6">
      <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center mb-4 shadow-inner">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-gradient-to-br from-[#6A5AE0] to-[#5BC8F8] rounded-xl mx-auto flex items-center justify-center">
            <Monitor className="w-8 h-8 text-white" />
          </div>
          <div className="text-slate-400 text-xs">UI Preview</div>
        </div>
      </div>
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-slate-300 text-sm">{description}</p>
    </div>
  </motion.div>
);

const LandingNew = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login/user');
  };

  const handleViewDashboard = () => {
    navigate('/dashboard');
  };

  const features = [
    {
      icon: Brain,
      title: "AI Threat Detection",
      description: "Advanced ML algorithms analyze patterns and predict potential security threats before they impact your systems."
    },
    {
      icon: Network,
      title: "Network Intrusion Shield",
      description: "Real-time network monitoring and automated intrusion prevention with zero-day threat protection."
    },
    {
      icon: Eye,
      title: "Deepfake Content Scanner",
      description: "Advanced computer vision and AI to identify manipulated media and prevent disinformation attacks."
    },
    {
      icon: HardDrive,
      title: "Password Breach Monitor",
      description: "Continuous monitoring of credential databases to detect and alert on password breaches instantly."
    },
    {
      icon: Lock,
      title: "Phishing Auto-Detection",
      description: "Intelligent email scanning with behavioral analysis to identify and block sophisticated phishing attempts."
    },
    {
      icon: Server,
      title: "Malware Sandbox Analyzer",
      description: "Isolated malware analysis environment that safely examines suspicious files and URLs."
    }
  ];

  const testimonials = [
    {
      quote: "SentinelAI has transformed our cybersecurity posture. The AI-powered threat detection has reduced our response time by 95%, and we've prevented multiple major breaches.",
      author: "Sarah Chen",
      role: "Chief Security Officer",
      company: "TechFlow Systems"
    },
    {
      quote: "What used to take our team hours to analyze now takes minutes. The automated threat intelligence and real-time monitoring give us peace of mind.",
      author: "Marcus Rodriguez",
      role: "IT Infrastructure Head",
      company: "Global Finance Corp"
    },
    {
      quote: "The threat prediction capabilities are incredible. We now see threats coming days in advance, allowing us to fortify our defenses proactively.",
      author: "Dr. Emily Watson",
      role: "Cyber Analyst",
      company: "SecureNet Labs"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800 overflow-hidden">
      {/* Animated Background Mesh */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-highlight-500/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-700/10 rounded-full blur-3xl" />

        {/* Floating grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(106, 90, 224, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(106, 90, 224, 0.1) 1px, transparent 1px)
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
        <Link to="/" className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-accent-500 to-highlight-500 rounded-lg shadow-neon-purple">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-accent-500 to-highlight-500 bg-clip-text text-transparent">
            SentinelAI
          </h1>
        </Link>

        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleViewDashboard}
            className="px-4 py-2 bg-slate-900/50 border border-slate-700/50 rounded-lg text-slate-300 hover:text-white hover:border-[rgba(91,200,248,0.3)] transition-all duration-200 text-sm"
          >
            Login
          </motion.button>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative px-8 py-20">
        <div className="max-w-7xl mx-auto text-center">
          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 mb-8"
          >
            <div className="flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
              <Award className="w-4 h-4 text-yellow-500" />
              <span className="text-slate-300 text-sm">SOC 2 Type II Certified</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span className="text-slate-300 text-sm">ISO 27001 Compliant</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-full px-4 py-2">
              <Star className="w-4 h-4 text-purple-500" />
              <span className="text-slate-300 text-sm">99.9% Uptime SLA</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-accent-500/10 to-highlight-500/10 border border-accent-500/30 rounded-full px-4 py-2 mb-6">
              <Zap className="w-4 h-4 text-highlight-500" />
              <span className="text-highlight-500 text-sm font-medium">Next-Generation AI Security</span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-accent-500 via-primary-50 to-highlight-500 bg-clip-text text-transparent leading-[0.9] tracking-tight">
              Fortify Your
              <br />
              <span className="bg-gradient-to-r from-highlight-500 to-accent-500 bg-clip-text text-transparent">
                Digital World
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed font-light">
              Enterprise-grade AI-powered cybersecurity with autonomous threat detection,
              real-time response orchestration, and predictive defense capabilities.
            </p>

            {/* Key Benefits */}
            <div className="flex flex-wrap justify-center gap-6 mb-12">
              <div className="flex items-center space-x-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-sm">Zero-Day Protection</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-sm">24/7 SOC Monitoring</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-300">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-sm">Automated Response</span>
              </div>
            </div>
          </motion.div>

          {/* Enhanced CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="space-y-6"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(59, 130, 246, 0.6)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleGetStarted}
              className="group relative px-10 py-5 bg-gradient-to-r from-accent-500 via-accent-600 to-highlight-500 rounded-2xl font-bold text-white text-xl shadow-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative flex items-center justify-center space-x-3">
                <span>Start Free Enterprise Trial</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>

            {/* Secondary Actions */}
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleViewDashboard}
                className="px-6 py-3 bg-primary-900/50 border border-primary-700/50 rounded-xl font-medium text-primary-200 hover:text-primary-50 hover:border-highlight-500/50 transition-all duration-200 backdrop-blur-sm"
              >
                View Live Demo
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-primary-900/50 border border-primary-700/50 rounded-xl font-medium text-primary-200 hover:text-primary-50 hover:border-accent-500/50 transition-all duration-200 backdrop-blur-sm"
              >
                Schedule Consultation
              </motion.button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-primary-400 text-sm">
              <div className="flex items-center space-x-1">
                <div className="flex -space-x-2">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className="w-6 h-6 bg-gradient-to-br from-accent-500 to-highlight-500 rounded-full border-2 border-primary-800" />
                  ))}
                </div>
                <span>Join 2,500+ enterprises</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Avg. 94% threat reduction</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="relative px-8 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <MetricCard number="3.2M+" label="Threats analyzed" />
            <MetricCard number="98.7%" label="Detection accuracy" />
            <MetricCard number="42+" label="Countries protected" />
            <MetricCard number="<60ms" label="AI processing time" />
          </div>
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
              Advanced Security Features
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

      {/* World Threat Map Section */}
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
              Global Intelligence Network
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Real-time threat intelligence collection from global monitoring stations and automated sensor networks.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <GlassCard className="p-0 overflow-hidden">
              <div className="relative bg-slate-900/90 p-8">
                <div className="flex items-center justify-center">
                  <svg
                    width="800"
                    height="400"
                    viewBox="0 0 800 400"
                    className="drop-shadow-2xl"
                    style={{ filter: 'drop-shadow(0 0 20px rgba(106, 90, 224, 0.3))' }}
                  >
                    {/* Simplified world map outline */}
                    <path
                      d="M150 200 L200 180 L250 200 L300 180 L400 220 L500 180 L600 200 L650 220 L700 200 L720 240 L650 280 L550 260 L450 300 L350 280 L250 320 L200 300 L150 320 Z"
                      fill="#1e293b"
                      stroke="#64748b"
                      strokeWidth="2"
                    />
                    {/* Continents */}
                    <path d="M150 220 L180 200 L220 210 L240 230 L200 250 L150 240 Z" fill="#334155" />
                    <path d="M250 190 L300 180 L350 200 L320 220 L280 210 Z" fill="#334155" />
                    <path d="M400 210 L450 190 L500 200 L480 230 L420 240 Z" fill="#334155" />
                    <path d="M550 180 L600 170 L650 190 L630 220 L570 210 Z" fill="#334155" />

                    {/* Threat hotspots with glow */}
                    <circle cx="180" cy="220" r="4" fill="#5BC8F8" className="animate-pulse" style={{filter: 'drop-shadow(0 0 10px #5BC8F8)'}} />
                    <circle cx="320" cy="190" r="3" fill="#6A5AE0" className="animate-pulse" style={{filter: 'drop-shadow(0 0 8px #6A5AE0)'}} />
                    <circle cx="450" cy="200" r="5" fill="#ef4444" className="animate-pulse" style={{filter: 'drop-shadow(0 0 12px #ef4444)'}} />
                    <circle cx="580" cy="180" r="3" fill="#f59e0b" className="animate-pulse" style={{filter: 'drop-shadow(0 0 8px #f59e0b)'}} />
                    <circle cx="260" cy="250" r="4" fill="#10b981" className="animate-pulse" style={{filter: 'drop-shadow(0 0 10px #10b981)'}} />
                  </svg>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
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
              See SentinelAI in Action
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience our platform through interactive demos and live threat detection scenarios.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <GlassCard className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Interactive Dashboard Mockup */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Live Dashboard</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400">Live Monitoring</span>
                    </div>
                  </div>

                  {/* Mock Dashboard Interface */}
                  <div className="bg-slate-900/50 rounded-xl p-6 border border-slate-700/50">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-highlight-500">247</div>
                        <div className="text-sm text-slate-400">Active Threats</div>
                      </div>
                      <div className="bg-slate-800/50 rounded-lg p-4">
                        <div className="text-2xl font-bold text-green-400">99.2%</div>
                        <div className="text-sm text-slate-400">Detection Rate</div>
                      </div>
                    </div>

                    {/* Threat Feed */}
                    <div className="space-y-3">
                      <div className="text-sm font-medium text-slate-300 mb-2">Recent Alerts</div>
                      {[
                        { type: 'Malware', severity: 'High', time: '2m ago', status: 'Blocked' },
                        { type: 'Phishing', severity: 'Medium', time: '5m ago', status: 'Quarantined' },
                        { type: 'DDoS', severity: 'Critical', time: '8m ago', status: 'Mitigated' }
                      ].map((alert, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              alert.severity === 'Critical' ? 'bg-red-400' :
                              alert.severity === 'High' ? 'bg-orange-400' : 'bg-yellow-400'
                            }`}></div>
                            <div>
                              <div className="text-sm font-medium text-white">{alert.type}</div>
                              <div className="text-xs text-slate-400">{alert.time}</div>
                            </div>
                          </div>
                          <div className="text-xs text-green-400 font-medium">{alert.status}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Demo Video/Animation */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">Threat Response Demo</h3>
                    <div className="flex items-center space-x-2">
                      <Play className="w-5 h-5 text-highlight-500" />
                      <span className="text-sm text-highlight-500">Watch Demo</span>
                    </div>
                  </div>

                  {/* Video Placeholder */}
                  <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden border border-slate-700/50">
                    <div className="aspect-video flex items-center justify-center">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-highlight-500 rounded-full flex items-center justify-center mx-auto">
                          <Play className="w-8 h-8 text-white ml-1" />
                        </div>
                        <div>
                          <div className="text-white font-semibold mb-1">AI Threat Detection</div>
                          <div className="text-slate-400 text-sm">See autonomous response in action</div>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-700">
                      <motion.div
                        className="h-full bg-gradient-to-r from-[#6A5AE0] to-[#5BC8F8]"
                        initial={{ width: 0 }}
                        animate={{ width: "65%" }}
                        transition={{ duration: 3, ease: "easeInOut" }}
                      />
                    </div>
                  </div>

                  {/* Demo Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-[#5BC8F8]">0.3s</div>
                      <div className="text-xs text-slate-400">Detection Time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-400">100%</div>
                      <div className="text-xs text-slate-400">Accuracy</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-400">24/7</div>
                      <div className="text-xs text-slate-400">Monitoring</div>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Product UI Preview Section */}
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
              Advanced Security Dashboard
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Experience the power of next-generation cybersecurity through our intuitive and feature-rich platform.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <UIPreviewCard
              title="Real-time Dashboard"
              description="Live threat monitoring with AI-driven insights and automated response recommendations."
            />
            <UIPreviewCard
              title="Threat Analysis Panel"
              description="Deep-dive analysis tools with forensic capabilities and threat pattern recognition."
            />
            <UIPreviewCard
              title="AI Agent Log Summary"
              description="Autonomous AI agent activity logs with decision transparency and performance metrics."
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
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
              Trusted by Security Professionals
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Join thousands of cybersecurity experts who rely on SentinelAI for enterprise-grade protection.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                quote={testimonial.quote}
                author={testimonial.author}
                role={testimonial.role}
                company={testimonial.company}
              />
            ))}
          </div>
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
                Ready to Level Up Your Cybersecurity?
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Join industry leaders who trust SentinelAI for enterprise-grade cyber defense.
              </p>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(106, 90, 224, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-[#6A5AE0] to-[#5BC8F8] rounded-lg font-bold text-white text-lg shadow-2xl flex items-center space-x-3 mx-auto"
              >
                <span>Start Your Free Trial</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </GlassCard>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-8 py-12 border-t border-slate-800/50 bg-slate-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-[#6A5AE0] to-[#5BC8F8] rounded-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg font-bold text-white">SentinelAI</span>
              </div>
              <p className="text-slate-400 text-sm">
                Next-generation AI-powered cybersecurity platform for enterprises worldwide.
              </p>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Product</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>Security</div>
                <div>Integrations</div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Resources</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div>Documentation</div>
                <div>API Reference</div>
                <div>Support</div>
                <div>Blog</div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4">Contact</h3>
              <div className="space-y-2 text-sm text-slate-400">
                <div>Enterprise Sales</div>
                <div>Technical Support</div>
                <div>Privacy Policy</div>
                <div>Terms of Service</div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800/50 pt-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">© 2025 SentinelAI. All rights reserved.</p>
            <div className="flex space-x-6 text-slate-400 text-sm">
              <span>Privacy</span>
              <span>Terms</span>
              <span>Security</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingNew;
