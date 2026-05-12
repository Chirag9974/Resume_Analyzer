import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

function Topbar({ title, isBooting, apiError, onRefresh }) {
  return (
    <header className="mb-6 flex items-center justify-between gap-5 max-md:flex-col max-md:items-start">
      <div>
        <span className="text-xs font-bold uppercase tracking-normal text-blue-600">Recruiter workspace</span>
        <h1 className="mt-1 text-3xl font-black leading-none tracking-normal text-slate-950 sm:text-4xl lg:text-5xl">
          {title}
        </h1>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex min-h-8 items-center gap-2 rounded-lg border px-2.5 text-sm font-bold ${
            apiError ? 'border-red-200 bg-red-50 text-red-700' : 'border-slate-200 bg-white text-slate-500'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              apiError
                ? 'bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,.12)]'
                : 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]'
            }`}
          />
          {apiError ? 'API offline' : isBooting ? 'Syncing' : 'Live data'}
        </span>
        <Button variant="icon" onClick={onRefresh} aria-label="Refresh data">
          <Icon name="refresh" />
        </Button>
      </div>
    </header>
  )
}

export default Topbar
