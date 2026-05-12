import { safeScore } from '../../utils/format.js'
import ProgressBar from './ProgressBar.jsx'

function SignalRow({ label, value, inverted = false }) {
  const score = safeScore(value)

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className={inverted ? 'text-white/80' : 'text-slate-500'}>{label}</span>
        <strong className={inverted ? 'text-white' : 'text-slate-950'}>{score}%</strong>
      </div>
      <ProgressBar value={score} />
    </div>
  )
}

export default SignalRow
