import EmptyState from '../../components/ui/EmptyState.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'
import { safeScore } from '../../utils/format.js'

function ScoreMini({ label, value }) {
  return (
    <div>
      <span className="block text-xs font-bold uppercase tracking-normal text-slate-500">{label}</span>
      <strong className="text-slate-950">{safeScore(value)}%</strong>
    </div>
  )
}

function RecentTable({ recent, jobs }) {
  if (!recent.length) {
    return <EmptyState title="No decisions yet" text="Analyzed resumes will appear here." />
  }

  return (
    <div className="grid gap-2.5">
      {recent.map((analysis) => {
        const job = jobs.find((item) => item._id === analysis.jobId)

        return (
          <div
            className="grid items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 sm:grid-cols-[minmax(220px,1fr)_120px_120px_auto]"
            key={analysis._id}
          >
            <div className="min-w-0">
              <strong className="block truncate text-slate-950">{analysis.resumeFileName}</strong>
              <span className="block text-slate-500">{job?.jobTitle || 'Unknown job'}</span>
            </div>
            <ScoreMini label="Skill" value={analysis.skillMatchPercentage} />
            <ScoreMini label="Role" value={analysis.roleAlignmentScore} />
            <StatusPill approved={analysis.approved} />
          </div>
        )
      })}
    </div>
  )
}

export default RecentTable
