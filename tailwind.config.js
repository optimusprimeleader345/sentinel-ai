/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Elite Dark Professional Color Scheme
        primary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',  // Primary Navy Blue
          900: '#0f172a',  // Primary Dark Navy
          950: '#020617',  // Near Black Background
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',  // Professional Blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        highlight: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',  // Modern Cyan
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        success: '#10b981',  // Emerald
        warning: '#f59e0b',  // Amber
        error: '#ef4444',   // Red

        // Legacy colors (keeping for compatibility)
        neon: {
          purple: '#6A5AE0',
          blue: '#3B82F6',
          cyan: '#06B6D4',
        },
        crimson: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        scarlet: {
          50: '#fff5f5',
          100: '#ffeaea',
          200: '#fdd3d3',
          300: '#fab1b1',
          400: '#f68282',
          500: '#f15b5b',
          600: '#e53e3e',
          700: '#c53030',
          800: '#9b2c2c',
          900: '#742a2a',
          950: '#3d0f0f',
        },
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, #9b5bff 0%, #3b82f6 50%, #22d3ee 100%)',
        'neon-gradient-horizontal': 'linear-gradient(90deg, #9b5bff 0%, #3b82f6 50%, #22d3ee 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'neon-purple': '0 0 20px rgba(155, 91, 255, 0.5), 0 0 40px rgba(155, 91, 255, 0.3)',
        'neon-blue': '0 0 20px rgba(59, 130, 246, 0.5), 0 0 40px rgba(59, 130, 246, 0.3)',
        'neon-cyan': '0 0 20px rgba(34, 211, 238, 0.5), 0 0 40px rgba(34, 211, 238, 0.3)',
        'neon-green': '0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)',
        'glow': '0 0 20px rgba(0, 0, 0, 0.6), 0 0 40px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(155, 91, 255, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(155, 91, 255, 0.8), 0 0 50px rgba(155, 91, 255, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
