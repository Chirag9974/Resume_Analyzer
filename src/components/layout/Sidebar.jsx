import { API_ROOT } from '../../services/api.js'
import { cx } from '../../utils/classes.js'
import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

function Sidebar({ activePage, navItems, onNavigate, role, onSwitchRole }) {
  const isRecruiter = role === 'recruiter'

  return (
    <aside className="sticky top-0 flex min-h-[100svh] w-[292px] shrink-0 flex-col gap-7 bg-slate-950 p-6 text-slate-200 shadow-[16px_0_42px_rgba(15,23,42,.18)] max-lg:static max-lg:min-h-0 max-lg:w-full max-lg:p-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 font-black text-white shadow-[0_14px_34px_rgba(37,99,235,.32)]">
          RA
        </div>
        <div className="min-w-0">
          <span className="block text-xs font-bold uppercase tracking-normal text-slate-400">
            Resume Analyzer
          </span>
          <strong className="block truncate text-lg leading-tight text-white">Signal Desk</strong>
        </div>
      </div>

      <nav className="grid gap-2 max-lg:flex max-lg:overflow-x-auto max-lg:pb-1" aria-label="Primary navigation">
        {navItems.map((item) => (
          <button
            type="button"
            key={item.id}
            className={cx(
              'flex min-h-11 w-full items-center gap-3 rounded-lg border px-3 text-left font-bold transition max-lg:w-auto max-lg:shrink-0',
              activePage === item.id
                ? 'translate-x-0 border-white/15 bg-white/10 text-white shadow-[inset_3px_0_0_#06b6d4]'
                : 'border-transparent text-slate-400 hover:translate-x-0.5 hover:border-white/10 hover:bg-white/10 hover:text-white',
            )}
            onClick={() => onNavigate(item.id)}
          >
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto grid gap-3 rounded-lg border border-white/15 bg-white/10 p-3 text-slate-400">
        <div className="flex gap-3">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]" />
          <div className="min-w-0">
            <span className="block text-xs font-bold uppercase tracking-normal text-slate-500">
              Signed in as
            </span>
            <strong className="block text-sm text-white">{isRecruiter ? 'Recruiter' : 'Applicant'}</strong>
          </div>
        </div>
        <Button
          variant="ghost"
          className="min-h-9 w-full px-3 text-xs"
          onClick={() => onSwitchRole(isRecruiter ? 'applicant' : 'recruiter')}
        >
          Switch to {isRecruiter ? 'Applicant' : 'Recruiter'} view
        </Button>
        <div className="border-t border-white/10 pt-3 max-lg:hidden">
          <strong className="block text-sm text-white">API endpoint</strong>
          <span className="block break-words text-sm">{API_ROOT}</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
