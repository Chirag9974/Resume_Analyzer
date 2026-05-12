import Icon from './Icon.jsx'

function EmptyState({ title, text }) {
  return (
    <div className="grid min-h-56 place-items-center content-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-slate-500">
      <Icon name="clipboard" className="h-9 w-9 text-blue-600" />
      <strong className="text-lg text-slate-950">{title}</strong>
      <p className="max-w-sm">{text}</p>
    </div>
  )
}

export default EmptyState
