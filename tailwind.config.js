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
        neon: {
          purple: '#9b5bff',
          blue: '#3b82f6',
          cyan: '#22d3ee',
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
