import { cx, fieldLabelClass } from '../../utils/classes.js'

function Field({ label, className = '', children }) {
  return (
    <label className={cx('grid min-w-0 gap-2', className)}>
      <span className={fieldLabelClass}>{label}</span>
      {children}
    </label>
  )
}

export default Field
