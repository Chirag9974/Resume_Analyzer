import { useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import Field from '../../components/ui/Field.jsx'
import FormMessage from '../../components/ui/FormMessage.jsx'
import Icon from '../../components/ui/Icon.jsx'
import Panel from '../../components/ui/Panel.jsx'
import SectionHeader from '../../components/ui/SectionHeader.jsx'
import { fieldControlClass } from '../../utils/classes.js'

function UploadStation({ jobs, selectedJobId, onSelectJob, onAnalyze, onNavigate }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })
  const activeJobId = selectedJobId || jobs[0]?._id || ''

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })

    if (!jobs.length) {
      setStatus({ type: 'error', message: 'Create a job scorecard before uploading a resume.' })
      return
    }

    if (!activeJobId) {
      setStatus({ type: 'error', message: 'Choose a job to analyze against.' })
      return
    }

    if (!file) {
      setStatus({ type: 'error', message: 'Choose a PDF resume.' })
      return
    }

    setIsSubmitting(true)
    try {
      await onAnalyze({ jobId: activeJobId, file })
      setFile(null)
      setStatus({ type: 'success', message: 'Resume analyzed.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const acceptFile = (nextFile) => {
    if (!nextFile) return
    setFile(nextFile)
    setStatus({ type: '', message: '' })
  }

  return (
    <Panel>
      <SectionHeader
        eyebrow="Analyze PDF"
        title="Upload resume"
        action={
          !jobs.length ? (
            <Button variant="ghost" onClick={() => onNavigate('jobs')}>
              Create job
              <Icon name="arrow" />
            </Button>
          ) : null
        }
      />

      <form onSubmit={handleSubmit} className="grid gap-5">
        <Field label="Analyze against">
          <select
            className={fieldControlClass}
            value={activeJobId}
            onChange={(event) => onSelectJob(event.target.value)}
          >
            {!jobs.length ? <option value="">No jobs available</option> : null}
            {jobs.map((job) => (
              <option key={job._id} value={job._id}>
                {job.jobTitle}
              </option>
            ))}
          </select>
        </Field>

        <label
          className={`grid min-h-72 cursor-pointer place-items-center content-center gap-3 rounded-lg border border-dashed p-6 text-center transition ${
            isDragging
              ? 'border-blue-600 bg-blue-50'
              : 'border-blue-300 bg-[linear-gradient(135deg,rgba(37,99,235,.08),transparent_52%),#f8fafc]'
          }`}
          onDragOver={(event) => {
            event.preventDefault()
            setIsDragging(true)
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault()
            setIsDragging(false)
            acceptFile(event.dataTransfer.files?.[0])
          }}
        >
          <input
            type="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={(event) => acceptFile(event.target.files?.[0])}
          />
          <span className="grid h-14 w-14 place-items-center rounded-lg bg-white text-blue-700 shadow-[0_20px_55px_rgba(15,23,42,.08)]">
            <Icon name="upload" />
          </span>
          <strong className="max-w-full break-words text-xl text-slate-950">
            {file ? file.name : 'Drop a resume PDF here'}
          </strong>
          <span className="text-slate-500">
            {file ? `${Math.round(file.size / 1024)} KB ready` : 'or click to browse from your computer'}
          </span>
        </label>

        {status.message ? <FormMessage type={status.type} message={status.message} /> : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Icon name="target" />
          {isSubmitting ? 'Analyzing...' : 'Run resume analysis'}
        </Button>
      </form>
    </Panel>
  )
}

export default UploadStation
