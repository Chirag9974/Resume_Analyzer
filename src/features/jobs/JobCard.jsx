import Button from '../../components/ui/Button.jsx'
import Icon from '../../components/ui/Icon.jsx'
import SignalRow from '../../components/ui/SignalRow.jsx'
import SkillPill from '../../components/ui/SkillPill.jsx'
import { formatDate } from '../../utils/format.js'

function JobCard({ job, analysisCount, onUpload, onResults }) {
  return (
    <article className="grid gap-4 rounded-lg border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-4 max-sm:flex-col">
        <div>
          <span className="text-xs font-bold uppercase tracking-normal text-blue-600">{job.roleType}</span>
          <h3 className="mt-1 text-xl font-extrabold tracking-normal text-slate-950">{job.jobTitle}</h3>
        </div>
        <span className="inline-flex min-h-8 items-center rounded-lg border border-slate-200 bg-white px-2.5 text-sm font-bold text-slate-500">
          {analysisCount} analyses
        </span>
      </div>

      <div className="flex flex-wrap gap-2 text-sm text-slate-500">
        <span className="rounded-lg bg-slate-50 px-2.5 py-1">{job.experienceRequired ?? 0}+ yrs</span>
        <span className="rounded-lg bg-slate-50 px-2.5 py-1">{job.education || 'Education flexible'}</span>
        <span className="rounded-lg bg-slate-50 px-2.5 py-1">{formatDate(job.createdAt)}</span>
      </div>

      <div className="grid gap-3">
        <SignalRow label="Skill threshold" value={job.minSkillMatchPercentage} />
        <SignalRow label="Role threshold" value={job.minRoleAlignmentScore} />
      </div>

      <div className="flex flex-wrap gap-2">
        {(job.techSkills || []).slice(0, 6).map((skill) => (
          <SkillPill key={`${skill.skillName}-${skill.requiredLevel}`} skill={skill} />
        ))}
      </div>

      <div className="flex flex-wrap gap-3 max-sm:flex-col">
        <Button variant="secondary" className="max-sm:w-full" onClick={onUpload}>
          <Icon name="upload" />
          Upload
        </Button>
        <Button variant="ghost" className="max-sm:w-full" onClick={onResults}>
          Results
          <Icon name="arrow" />
        </Button>
      </div>
    </article>
  )
}

export default JobCard
