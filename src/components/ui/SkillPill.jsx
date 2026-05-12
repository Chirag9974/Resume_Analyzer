import { skillName } from '../../utils/format.js'

const toneClasses = {
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
}

function SkillPill({ skill, tone = 'blue' }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 text-sm font-extrabold ${toneClasses[tone] || toneClasses.blue}`}
    >
      {skillName(skill)}
      {skill?.requiredLevel ? <small className="rounded-md bg-white/75 px-1.5 text-[11px]">L{skill.requiredLevel}</small> : null}
      {skill?.isMandatory ? <small className="rounded-md bg-white/75 px-1.5 text-[11px]">Must</small> : null}
    </span>
  )
}

export default SkillPill
