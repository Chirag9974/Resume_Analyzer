import { cx } from '../../utils/classes.js'

function SectionHeader({ eyebrow, title, action, className = '' }) {
  return (
    <div className={cx('mb-5 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start', className)}>
      <div>
        {eyebrow ? (
          <span className="text-xs font-bold uppercase tracking-normal text-blue-600">{eyebrow}</span>
        ) : null}
        <h2 className="mt-1 text-2xl font-extrabold tracking-normal text-slate-950">{title}</h2>
      </div>
      {action}
    </div>
  )
}

export default SectionHeader
