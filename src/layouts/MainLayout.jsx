import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'
import PersonalAIAssistant from '../components/PersonalAIAssistant'
import UserAchievements from '../components/UserAchievements'
import AlertPanel from '../components/AlertPanel'
import AlertToast from '../components/AlertToast'
import { Toaster } from 'react-hot-toast'
import { useState } from 'react'
import { useAlerts } from '../contexts/AlertContext'

function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [assistantMinimized, setAssistantMinimized] = useState(true)
  const [achievementsMinimized, setAchievementsMinimized] = useState(true)
  const { alerts, isPanelOpen, markAsRead, markAllAsRead, clearAllAlerts } = useAlerts()

  return (
    <div className="min-h-screen bg-[#0a0e27] w-full flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 ml-[270px] flex flex-col">
        {/* Topbar */}
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#1e293b',
            color: '#e2e8f0',
            border: '1px solid rgba(155, 91, 255, 0.3)',
            borderRadius: '12px',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />

      {/* Personal AI Assistant */}
      <PersonalAIAssistant
        isMinimized={assistantMinimized}
        setIsMinimized={setAssistantMinimized}
      />

      {/* User Achievements */}
      <UserAchievements
        isMinimized={achievementsMinimized}
        setIsMinimized={setAchievementsMinimized}
      />

      {/* Security Alert Panel */}
      <AlertPanel />

      {/* Critical Alert Toast */}
      <AlertToast />
    </div>
  )
}

export default MainLayout
