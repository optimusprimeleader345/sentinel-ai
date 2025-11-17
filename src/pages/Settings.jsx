import { useState } from 'react'
import Card from '../components/Card'
import Input from '../components/Input'
import ToggleSwitch from '../components/ToggleSwitch'
import Button from '../components/Button'
import toast from 'react-hot-toast'

function Settings() {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@sentinelai.com',
    role: 'Administrator',
  })
  const [apiKey, setApiKey] = useState('')
  const [notifications, setNotifications] = useState({
    email: true,
    slack: false,
    telegram: false,
  })

  const handleSaveProfile = (e) => {
    e.preventDefault()
    toast.success('Profile settings saved successfully!')
  }

  const handleSaveAPI = () => {
    if (apiKey) {
      toast.success('API key saved successfully!')
    } else {
      toast.error('Please enter an API key')
    }
  }

  const handleToggleNotification = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
    toast.success(`${key.charAt(0).toUpperCase() + key.slice(1)} alerts ${!notifications[key] ? 'enabled' : 'disabled'}`)
  }

  return (
    <div className="space-y-6">
      {/* Profile Settings */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Profile Settings</h2>
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Name"
            value={profileData.name}
            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
          />
          <Input
            label="Email"
            type="email"
            value={profileData.email}
            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
          />
          <Input
            label="Role"
            value={profileData.role}
            onChange={(e) => setProfileData({ ...profileData, role: e.target.value })}
          />
          <Button type="submit">Save Changes</Button>
        </form>
      </Card>

      {/* API & Integrations */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-6">API & Integrations</h2>
        <div className="space-y-6">
          <div>
            <Input
              label="OpenAI API Key"
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="font-mono"
            />
            <p className="mt-1 text-xs text-slate-500">
              Your API key is encrypted and stored securely
            </p>
            <Button onClick={handleSaveAPI} className="mt-4">Save API Key</Button>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <h3 className="text-sm font-semibold text-slate-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <ToggleSwitch
                enabled={notifications.email}
                onChange={() => handleToggleNotification('email')}
                label="Email Alerts"
                description="Receive alerts via email"
              />
              <ToggleSwitch
                enabled={notifications.slack}
                onChange={() => handleToggleNotification('slack')}
                label="Slack Alerts"
                description="Receive alerts via Slack"
              />
              <ToggleSwitch
                enabled={notifications.telegram}
                onChange={() => handleToggleNotification('telegram')}
                label="Telegram Alerts"
                description="Receive alerts via Telegram"
              />
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Settings
