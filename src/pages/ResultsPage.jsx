import { useState } from 'react'
import Button from '../components/ui/Button.jsx'
import EmptyState from '../components/ui/EmptyState.jsx'
import Field from '../components/ui/Field.jsx'
import Icon from '../components/ui/Icon.jsx'
import Panel from '../components/ui/Panel.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import StatusPill from '../components/ui/StatusPill.jsx'
import AnalysisDetail from '../features/results/AnalysisDetail.jsx'
import { fieldControlClass } from '../utils/classes.js'
import { formatDate } from '../utils/format.js'

function ResultsPage({
  jobs,
  analysesByJob,
  selectedJobId,
  selectedAnalysisId,
  role,
  allowedAnalysisIds = [],
  onSelectJob,
  onSelectAnalysis,
  onNavigate,
}) {
  const [query, setQuery] = useState('')
  const allowedSet = new Set(allowedAnalysisIds)
  const visibleJobs =
    role === 'applicant'
      ? jobs.filter((job) => (analysesByJob[job._id] || []).some((analysis) => allowedSet.has(analysis._id)))
      : jobs
  const selectedJob = visibleJobs.find((job) => job._id === selectedJobId) || visibleJobs[0] || null
  const activeJobId = selectedJob?._id || ''
  const analyses =
    role === 'applicant'
      ? (analysesByJob[activeJobId] || []).filter((analysis) => allowedSet.has(analysis._id))
      : analysesByJob[activeJobId] || []
  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.resumeFileName?.toLowerCase().includes(query.toLowerCase()),
  )
  const activeAnalysis =
    filteredAnalyses.find((analysis) => analysis._id === selectedAnalysisId) ||
    filteredAnalyses[0] ||
    null

  return (
    <section className="grid items-start gap-5 xl:grid-cols-[minmax(330px,.36fr)_minmax(0,.64fr)]">
      <Panel className="grid gap-4 xl:sticky xl:top-7">
        <SectionHeader
          eyebrow="History"
          title="Analyses"
          action={
            <Button variant="iconLight" onClick={() => onNavigate('upload')} aria-label="Upload resume">
              <Icon name="upload" />
            </Button>
          }
          className="mb-0"
        />

        <Field label="Job">
          <select className={fieldControlClass} value={activeJobId} onChange={(event) => onSelectJob(event.target.value)}>
            {!visibleJobs.length ? <option value="">No results available</option> : null}
            {visibleJobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.jobTitle}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Find resume">
          <input
            className={fieldControlClass}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="candidate.pdf"
          />
        </Field>

        {filteredAnalyses.length ? (
          <div className="grid gap-2.5">
            {filteredAnalyses.map((analysis) => (
              <button
                type="button"
                key={analysis._id}
                className={`flex w-full items-center justify-between gap-3 rounded-lg border p-3 text-left transition max-sm:flex-col max-sm:items-start ${
                  activeAnalysis?._id === analysis._id
                    ? 'border-blue-300 bg-blue-50'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50'
                }`}
                onClick={() => onSelectAnalysis(analysis._id)}
              >
                <div className="min-w-0">
                  <strong className="block break-words text-slate-950">{analysis.resumeFileName}</strong>
                  <span className="block text-sm text-slate-500">{formatDate(analysis.createdAt)}</span>
                </div>
                <StatusPill approved={analysis.approved} />
              </button>
            ))}
          </div>
        ) : (
          <EmptyState
            title={role === 'applicant' ? 'No applicant results yet' : 'No results for this job'}
            text={
              role === 'applicant'
                ? 'Upload a resume to create a result visible in this applicant view.'
                : 'Upload a resume to create the first analysis.'
            }
          />
        )}
      </Panel>

      <Panel>
        <AnalysisDetail analysis={activeAnalysis} job={selectedJob} />
      </Panel>
    </section>
  )
}

export default ResultsPage
