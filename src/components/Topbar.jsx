import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Search, Bell, Menu, Moon, Sun, ChevronDown } from 'lucide-react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/threat-monitor': 'Threat Monitor',
  '/ai-analyzer': 'AI Analyzer',
  '/alerts-center': 'Alerts Center',
  '/system-health': 'System Health',
  '/logs-viewer': 'Logs Viewer',
  '/settings': 'Settings',
  '/account': 'Account',
}

function Topbar({ onMenuClick }) {
  const location = useLocation()
  const pageTitle = pageTitles[location.pathname] || 'Dashboard'
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
    // UI only - no actual theme implementation yet
  }

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md hover:bg-slate-100"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900">{pageTitle}</h1>
      </div>

      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="hidden md:flex items-center space-x-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 w-64">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 flex-1"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
          title="Toggle theme"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5 text-slate-600" />
          ) : (
            <Sun className="w-5 h-5 text-slate-600" />
          )}
        </button>

        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
          <Bell className="w-5 h-5 text-slate-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Menu */}
        <HeadlessMenu as="div" className="relative">
          <HeadlessMenu.Button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-semibold">
              SA
            </div>
            <ChevronDown className="w-4 h-4 text-slate-600 hidden sm:block" />
          </HeadlessMenu.Button>
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-in"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <HeadlessMenu.Items className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
              <HeadlessMenu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-slate-100' : 'text-slate-700'}`}
                  >
                    Profile
                  </a>
                )}
              </HeadlessMenu.Item>
              <HeadlessMenu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-slate-100' : 'text-slate-700'}`}
                  >
                    Settings
                  </a>
                )}
              </HeadlessMenu.Item>
              <HeadlessMenu.Item>
                {({ active }) => (
                  <a
                    href="#"
                    className={`block px-4 py-2 text-sm ${active ? 'bg-slate-100' : 'text-red-600'}`}
                  >
                    Logout
                  </a>
                )}
              </HeadlessMenu.Item>
            </HeadlessMenu.Items>
          </Transition>
        </HeadlessMenu>
      </div>
    </header>
  )
}

export default Topbar
