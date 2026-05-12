import { cx } from '../../utils/classes.js'
import { safeScore, scoreColor } from '../../utils/format.js'

function ScoreRing({ score, label, size = 'normal', inverted = false }) {
  const scoreValue = safeScore(score)
  const isLarge = size === 'large'

  return (
    <div
      className={cx(
        'relative grid shrink-0 place-items-center rounded-full',
        isLarge ? 'h-[138px] w-[138px]' : 'h-[104px] w-[104px]',
      )}
      style={{
        background: `conic-gradient(${scoreColor(scoreValue)} ${scoreValue * 3.6}deg, rgba(148,163,184,.25) 0deg)`,
      }}
      aria-label={`${label} score ${scoreValue} percent`}
    >
      <div
        className={cx(
          'absolute rounded-full',
          inverted ? 'bg-slate-900' : 'bg-white',
          isLarge ? 'inset-3' : 'inset-2.5',
        )}
      />
      <div className={cx('relative z-10 text-center', inverted ? 'text-white' : 'text-slate-950')}>
        <strong className={cx('block leading-none', isLarge ? 'text-3xl' : 'text-2xl')}>
          {scoreValue}%
        </strong>
        <span className={cx('text-xs font-extrabold uppercase tracking-normal', inverted ? 'text-white' : 'text-slate-500')}>
          {label}
        </span>
      </div>
    </div>
  )
}

export default ScoreRing
