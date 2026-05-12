import EmptyState from '../../components/ui/EmptyState.jsx'
import ScoreRing from '../../components/ui/ScoreRing.jsx'
import SignalRow from '../../components/ui/SignalRow.jsx'
import SkillPill from '../../components/ui/SkillPill.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'
import { formatDate, skillName } from '../../utils/format.js'

function AnalysisDetail({ analysis, job }) {
  if (!analysis) {
    return (
      <EmptyState
        title="No analysis selected"
        text="Choose a result from the history list or analyze a new resume."
      />
    )
  }

  return (
    <div className="grid gap-5">
      <div className="flex items-start justify-between gap-5 border-b border-slate-200 pb-5 max-md:grid">
        <div className="min-w-0">
          <span className="text-xs font-bold uppercase tracking-normal text-blue-600">
            {job?.jobTitle || 'Resume result'}
          </span>
          <h2 className="mt-1 break-words text-4xl font-black leading-none tracking-normal text-slate-950">
            {analysis.resumeFileName}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500">
            <StatusPill approved={analysis.approved} />
            <span className="rounded-lg bg-slate-50 px-2.5 py-1">{formatDate(analysis.createdAt)}</span>
            <span className="break-all rounded-lg bg-slate-50 px-2.5 py-1">{analysis.resumeFilePath}</span>
          </div>
        </div>
        <div className="flex flex-wrap justify-end gap-3 max-md:justify-start">
          <ScoreRing score={analysis.skillMatchPercentage} label="Skill" />
          <ScoreRing score={analysis.roleAlignmentScore} label="Role" />
        </div>
      </div>

      <div className="grid gap-4">
        <SignalRow label="Skill match" value={analysis.skillMatchPercentage} />
        <SignalRow label="Role alignment" value={analysis.roleAlignmentScore} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <strong className="text-slate-950">Matched skills</strong>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-sm font-bold text-slate-500">
              {(analysis.matchedSkills || []).length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(analysis.matchedSkills || []).length ? (
              analysis.matchedSkills.map((skill) => (
                <SkillPill key={`${skillName(skill)}-matched`} skill={skill} tone="green" />
              ))
            ) : (
              <span className="text-slate-500">No matched skills returned.</span>
            )}
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
          <div className="mb-3 flex items-center justify-between gap-3">
            <strong className="text-slate-950">Missing skills</strong>
            <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-sm font-bold text-slate-500">
              {(analysis.missingSkills || []).length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(analysis.missingSkills || []).length ? (
              analysis.missingSkills.map((skill) => (
                <SkillPill key={`${skillName(skill)}-missing`} skill={skill} tone="red" />
              ))
            ) : (
              <span className="text-slate-500">No missing skills returned.</span>
            )}
          </div>
        </section>
      </div>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
        <span className="text-xs font-bold uppercase tracking-normal text-blue-600">Recommendations</span>
        {(analysis.recommendations || []).length ? (
          <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-950">
            {analysis.recommendations.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-slate-500">No recommendations returned by the analyzer.</p>
        )}
      </section>
    </div>
  )
}

export default AnalysisDetail
