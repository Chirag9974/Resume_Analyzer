import ProgressBar from '../../components/ui/ProgressBar.jsx'

function DecisionMeter({ label, value, total, tone }) {
  const percent = total ? Math.round((value / total) * 100) : 0

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-slate-500">{label}</span>
        <strong className="text-slate-950">{value}</strong>
      </div>
      <ProgressBar value={percent} tone={tone} />
    </div>
  )
}

export default DecisionMeter
