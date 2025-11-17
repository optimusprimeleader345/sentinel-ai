import Card from '../components/Card'
import Input from '../components/Input'
import Button from '../components/Button'
import toast from 'react-hot-toast'

function Account() {
  const handleChangePassword = (e) => {
    e.preventDefault()
    toast.success('Password change request submitted (UI only)')
  }

  const handleLogout = () => {
    toast.success('Logout successful (UI only)')
  }

  return (
    <div className="space-y-6">
      {/* User Info */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-6">User Information</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-900">John Doe</p>
              <p className="text-sm text-slate-600">john.doe@sentinelai.com</p>
              <p className="text-xs text-slate-500 mt-1">Administrator</p>
            </div>
          </div>
          <div className="pt-4 border-t border-slate-200">
            <p className="text-sm text-slate-600">
              <span className="font-medium">Member since:</span> January 2024
            </p>
            <p className="text-sm text-slate-600 mt-1">
              <span className="font-medium">Last login:</span> 2 hours ago
            </p>
          </div>
        </div>
      </Card>

      {/* Change Password */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-6">Change Password</h2>
        <form onSubmit={handleChangePassword} className="space-y-4">
          <Input
            label="Current Password"
            type="password"
            placeholder="Enter current password"
          />
          <Input
            label="New Password"
            type="password"
            placeholder="Enter new password"
          />
          <Input
            label="Confirm New Password"
            type="password"
            placeholder="Confirm new password"
          />
          <Button type="submit">Change Password</Button>
        </form>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-200">
        <h2 className="text-lg font-semibold text-red-900 mb-4">Danger Zone</h2>
        <p className="text-sm text-slate-600 mb-4">
          Once you log out, you'll need to sign in again to access the dashboard.
        </p>
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </Card>
    </div>
  )
}

export default Account

