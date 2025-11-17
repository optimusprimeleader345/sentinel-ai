import { motion } from 'framer-motion'

function ToggleSwitch({ enabled, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-slate-900">{label}</p>
        {description && <p className="text-xs text-slate-500">{description}</p>}
      </div>
      <button
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          enabled ? 'bg-indigo-600' : 'bg-slate-200'
        }`}
      >
        <motion.span
          animate={{ x: enabled ? 20 : 4 }}
          transition={{ duration: 0.2 }}
          className="inline-block h-4 w-4 transform rounded-full bg-white"
        />
      </button>
    </div>
  )
}

export default ToggleSwitch

