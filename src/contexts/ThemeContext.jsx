import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Theme Context
const ThemeContext = createContext(null);

// Theme Provider Component
export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('sentinelTheme');
      if (savedTheme) {
        return savedTheme;
      }
      // Check system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      return 'dark'; // Default to dark theme
    }
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  // Apply theme to document and CSS variables
  const applyTheme = useCallback((newTheme) => {
    const root = document.documentElement;

    // Set data-theme attribute for CSS selectors
    root.setAttribute('data-theme', newTheme);

    // Apply CSS custom properties for theme variables
    const themeVars = {
      dark: {
        '--bg-primary': '#0a0e1a',
        '--bg-secondary': '#111827',
        '--bg-tertiary': '#1f2937',
        '--bg-accent': '#374151',
        '--text-primary': '#f9fafb',
        '--text-secondary': '#d1d5db',
        '--text-muted': '#9ca3af',
        '--border-primary': '#374151',
        '--border-secondary': '#4b5563',
        '--accent-primary': '#3b82f6',
        '--accent-secondary': '#06b6d4',
        '--accent-success': '#10b981',
        '--accent-warning': '#f59e0b',
        '--accent-error': '#ef4444',
        '--glass-bg': 'rgba(10, 14, 26, 0.8)',
        '--glass-border': 'rgba(55, 65, 81, 0.3)',
        '--shadow-primary': '0 10px 25px rgba(0, 0, 0, 0.5)',
        '--shadow-glow': '0 0 20px rgba(59, 130, 246, 0.3)'
      },
      light: {
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f9fafb',
        '--bg-tertiary': '#f3f4f6',
        '--bg-accent': '#e5e7eb',
        '--text-primary': '#111827',
        '--text-secondary': '#374151',
        '--text-muted': '#6b7280',
        '--border-primary': '#d1d5db',
        '--border-secondary': '#9ca3af',
        '--accent-primary': '#2563eb',
        '--accent-secondary': '#0891b2',
        '--accent-success': '#059669',
        '--accent-warning': '#d97706',
        '--accent-error': '#dc2626',
        '--glass-bg': 'rgba(255, 255, 255, 0.9)',
        '--glass-border': 'rgba(209, 213, 219, 0.5)',
        '--shadow-primary': '0 10px 25px rgba(0, 0, 0, 0.1)',
        '--shadow-glow': '0 0 20px rgba(37, 99, 235, 0.2)'
      }
    };

    const vars = themeVars[newTheme];
    Object.entries(vars).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', newTheme === 'dark' ? '#0a0e1a' : '#ffffff');
    }
  }, []);

  // Toggle theme function
  const toggleTheme = useCallback(() => {
    setIsTransitioning(true);

    setTimeout(() => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);

      try {
        localStorage.setItem('sentinelTheme', newTheme);
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }

      applyTheme(newTheme);

      setTimeout(() => setIsTransitioning(false), 300);
    }, 100);
  }, [theme, applyTheme]);

  // Set specific theme
  const setSpecificTheme = useCallback((newTheme) => {
    if (newTheme !== 'dark' && newTheme !== 'light') return;

    setIsTransitioning(true);

    setTimeout(() => {
      setTheme(newTheme);

      try {
        localStorage.setItem('sentinelTheme', newTheme);
      } catch (error) {
        console.error('Failed to save theme preference:', error);
      }

      applyTheme(newTheme);

      setTimeout(() => setIsTransitioning(false), 300);
    }, 100);
  }, [applyTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e) => {
      // Only auto-switch if user hasn't manually set a preference
      const savedTheme = localStorage.getItem('sentinelTheme');
      if (!savedTheme) {
        const newTheme = e.matches ? 'dark' : 'light';
        setTheme(newTheme);
        applyTheme(newTheme);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [applyTheme]);

  // Apply theme on mount and theme changes
  useEffect(() => {
    applyTheme(theme);
  }, [theme, applyTheme]);

  // Context value
  const value = {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setTheme: setSpecificTheme,
    isTransitioning
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext;