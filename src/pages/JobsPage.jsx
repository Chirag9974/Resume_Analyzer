import EmptyState from '../components/ui/EmptyState.jsx'
import Panel from '../components/ui/Panel.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import JobBuilder from '../features/jobs/JobBuilder.jsx'
import JobCard from '../features/jobs/JobCard.jsx'

function JobsPage({ jobs, analysesByJob, onCreateJob, onSelectJob, onNavigate }) {
  return (
    <section className="grid items-start gap-5 xl:grid-cols-[minmax(420px,.96fr)_minmax(0,1.04fr)]">
      <JobBuilder onCreateJob={onCreateJob} />
      <Panel className="xl:sticky xl:top-7">
        <SectionHeader
          eyebrow="Active scorecards"
          title="Jobs"
          action={
            <span className="inline-flex min-h-8 items-center rounded-lg border border-slate-200 bg-white px-2.5 text-sm font-bold text-slate-500">
              {jobs.length} configured
            </span>
          }
        />
        {jobs.length ? (
          <div className="grid gap-3">
            {jobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                analysisCount={(analysesByJob[job._id] || []).length}
                onUpload={() => {
                  onSelectJob(job._id)
                  onNavigate('upload')
                }}
                onResults={() => {
                  onSelectJob(job._id)
                  onNavigate('results')
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyState title="No jobs yet" text="Create your first scorecard to unlock resume analysis." />
        )}
      </Panel>
    </section>
  )
}

export default JobsPage
