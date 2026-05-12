import { safeScore } from '../../utils/format.js'

const toneClasses = {
  blue: 'bg-gradient-to-r from-blue-600 to-cyan-500',
  green: 'bg-emerald-500',
  red: 'bg-red-500',
  amber: 'bg-amber-500',
}

function ProgressBar({ value, tone = 'blue' }) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-slate-200" aria-hidden="true">
      <span
        className={`block h-full rounded-full transition-all duration-300 ${toneClasses[tone] || toneClasses.blue}`}
        style={{ width: `${safeScore(value)}%` }}
      />
    </div>
  )
}

export default ProgressBar
