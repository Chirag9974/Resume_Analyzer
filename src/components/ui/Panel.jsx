import { cx, panelClass } from '../../utils/classes.js'

function Panel({ as: Component = 'section', className = '', children }) {
  return <Component className={cx(panelClass, 'p-4 sm:p-5 lg:p-6', className)}>{children}</Component>
}

export default Panel
