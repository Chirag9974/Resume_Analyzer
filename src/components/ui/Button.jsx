import { cx } from '../../utils/classes.js'

const variantClasses = {
  primary:
    'bg-blue-600 text-white shadow-[0_14px_24px_rgba(37,99,235,0.22)] hover:bg-blue-700',
  secondary: 'border border-blue-200 bg-blue-50 text-blue-700 hover:border-blue-300 hover:bg-blue-100',
  ghost: 'border border-slate-200 bg-white text-slate-950 hover:border-slate-300 hover:bg-slate-50',
  small: 'min-h-9 border border-slate-200 bg-slate-50 px-3 text-slate-950 hover:bg-slate-100',
  icon: 'h-11 w-11 bg-slate-950 p-0 text-white hover:bg-slate-800',
  iconLight: 'h-11 w-11 border border-slate-200 bg-slate-50 p-0 text-slate-950 hover:bg-slate-100',
}

function Button({ variant = 'primary', className = '', type = 'button', children, ...props }) {
  return (
    <button
      type={type}
      className={cx(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-4 font-extrabold transition hover:-translate-y-px disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0',
        variantClasses[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
