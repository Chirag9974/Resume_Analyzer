import Icon from './Icon.jsx'

const toneClasses = {
  blue: 'bg-blue-50 text-blue-700',
  cyan: 'bg-cyan-50 text-cyan-700',
  green: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
  amber: 'bg-amber-50 text-amber-700',
}

function MetricCard({ label, value, icon, tone = 'blue' }) {
  return (
    <article className="flex min-h-36 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,0.08)]">
      <div className={`grid h-11 w-11 place-items-center rounded-lg ${toneClasses[tone] || toneClasses.blue}`}>
        <Icon name={icon} />
      </div>
      <div>
        <span className="text-xs font-bold uppercase tracking-normal text-slate-500">{label}</span>
        <strong className="mt-1 block text-4xl leading-none text-slate-950">{value}</strong>
      </div>
    </article>
  )
}

export default MetricCard
