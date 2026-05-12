export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const fieldLabelClass = 'text-xs font-bold uppercase tracking-normal text-slate-500'

export const fieldControlClass =
  'min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-950 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-600/10'

export const panelClass =
  'rounded-lg border border-slate-200 bg-white shadow-[0_20px_55px_rgba(15,23,42,0.08)]'
