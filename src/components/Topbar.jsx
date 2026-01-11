import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Search, Menu, Moon, Sun, ChevronDown, LogOut, LogIn, UserCog, Key, Bell as BellIcon, Shield, Zap } from 'lucide-react'
import { Menu as HeadlessMenu, Transition } from '@headlessui/react'
import { useAuth } from '../contexts/AuthContext.jsx'
import { useTheme } from '../contexts/ThemeContext.jsx'
import AlertBell from './AlertBell.jsx'

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
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [showNotificationModal, setShowNotificationModal] = useState(false)

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      // Simulate search functionality
      const results = [
        { id: 1, title: 'Threat Intelligence Report', type: 'report', url: '/threat-intel' },
        { id: 2, title: 'Security Dashboard', type: 'page', url: '/dashboard' },
        { id: 3, title: 'Incident Response Guide', type: 'guide', url: '/incident-response' },
      ].filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
    } catch (error) {
      console.error('Search error:', error)
    } finally {
      setIsSearching(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    handleSearch(searchQuery)
  }

  const clearSearch = () => {
    setSearchQuery('')
    setSearchResults([])
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
        <div className="relative hidden md:block">
          <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 bg-slate-50 rounded-lg px-3 py-2 border border-slate-200 w-64">
            <Search className="w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                handleSearch(e.target.value)
              }}
              placeholder="Search security tools..."
              className="bg-transparent border-none outline-none text-sm text-slate-700 placeholder-slate-400 flex-1"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            )}
          </form>

          {/* Search Results Dropdown */}
          {searchResults.length > 0 && (
            <div className="absolute top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
              {searchResults.map((result) => (
                <a
                  key={result.id}
                  href={result.url}
                  className="block px-4 py-2 hover:bg-slate-50 text-sm text-slate-700"
                >
                  <div className="font-medium">{result.title}</div>
                  <div className="text-xs text-slate-500 capitalize">{result.type}</div>
                </a>
              ))}
            </div>
          )}
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

        {/* Security Alerts Bell */}
        <AlertBell />

        {/* User Profile Menu */}
        <HeadlessMenu as="div" className="relative">
          <HeadlessMenu.Button className="flex items-center space-x-2 p-1 rounded-lg hover:bg-slate-100 transition-colors">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-neon-purple">
              {user ? (user.username || 'U').charAt(0).toUpperCase() : '?'}
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
            <HeadlessMenu.Items className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-slate-200 py-2 z-50">
              {/* User Info Header */}
              {user ? (
                <div className="px-4 py-3 border-b border-slate-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold shadow-neon-purple">
                      {(user.username || 'U').charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-slate-900 truncate">
                        {user.username || 'User'}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {user.email || 'user@sentinelai.com'}
                      </div>
                      <div className="text-xs text-purple-600 font-medium">
                        {user.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User'}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-4 py-3 border-b border-slate-200">
                  <div className="text-sm font-semibold text-slate-900">Not Logged In</div>
                  <div className="text-xs text-slate-500">Please login to access features</div>
                </div>
              )}

              {/* Menu Items */}
              {user ? (
                // Logged In Menu
                <>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowProfileModal(true)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          active ? 'bg-slate-50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <UserCog className="w-4 h-4" />
                          <span>Profile Settings</span>
                        </div>
                      </button>
                    )}
                  </HeadlessMenu.Item>

                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowPasswordModal(true)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          active ? 'bg-slate-50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Key className="w-4 h-4" />
                          <span>Change Password</span>
                        </div>
                      </button>
                    )}
                  </HeadlessMenu.Item>

                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => setShowNotificationModal(true)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          active ? 'bg-slate-50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <BellIcon className="w-4 h-4" />
                          <span>Notification Settings</span>
                        </div>
                      </button>
                    )}
                  </HeadlessMenu.Item>

                  <div className="border-t border-slate-200 my-1"></div>

                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <button
                        onClick={logout}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          active ? 'bg-red-50' : 'text-red-600'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <LogOut className="w-4 h-4" />
                          <span>Logout</span>
                        </div>
                      </button>
                    )}
                  </HeadlessMenu.Item>
                </>
              ) : (
                // Not Logged In Menu
                <>
                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <a
                        href="/login/user"
                        className={`block px-4 py-2 text-sm transition-colors ${
                          active ? 'bg-slate-50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <LogIn className="w-4 h-4" />
                          <span>Login</span>
                        </div>
                      </a>
                    )}
                  </HeadlessMenu.Item>

                  <div className="px-4 py-2 text-xs text-slate-500 text-center border-t border-slate-200 mt-1">
                    Or login as:
                  </div>

                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <a
                        href="/login/admin"
                        className={`block px-4 py-2 text-sm transition-colors ${
                          active ? 'bg-slate-50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Shield className="w-4 h-4" />
                          <span>Admin Login</span>
                        </div>
                      </a>
                    )}
                  </HeadlessMenu.Item>

                  <HeadlessMenu.Item>
                    {({ active }) => (
                      <a
                        href="/login/super-admin"
                        className={`block px-4 py-2 text-sm transition-colors ${
                          active ? 'bg-slate-50' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Zap className="w-4 h-4" />
                          <span>SuperAdmin Login</span>
                        </div>
                      </a>
                    )}
                  </HeadlessMenu.Item>
                </>
              )}
            </HeadlessMenu.Items>
          </Transition>
        </HeadlessMenu>
      </div>

      {/* Profile Settings Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Profile Settings</h3>
              <button
                onClick={() => setShowProfileModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Username</label>
                <input
                  type="text"
                  defaultValue={user?.username || ''}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500">
                  <option value="general">General</option>
                  <option value="security">Security</option>
                  <option value="it">IT</option>
                  <option value="compliance">Compliance</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowProfileModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Change Password</h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Settings Modal */}
      {showNotificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Notification Settings</h3>
              <button
                onClick={() => setShowNotificationModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900">Security Alerts</div>
                  <div className="text-xs text-slate-500">Critical security notifications</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900">System Updates</div>
                  <div className="text-xs text-slate-500">System maintenance and updates</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900">Threat Intelligence</div>
                  <div className="text-xs text-slate-500">New threat intelligence updates</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-slate-900">Email Notifications</div>
                  <div className="text-xs text-slate-500">Receive notifications via email</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowNotificationModal(false)}
                className="flex-1 px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Topbar
