import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import WorkflowStep from '../components/ui/WorkflowStep.jsx'
import { panelClass } from '../utils/classes.js'

const recruiterFeatures = [
  {
    icon: 'briefcase',
    title: 'Build company scorecards',
    text: 'Create role-specific criteria with job description points, required skills, seniority, experience, and approval thresholds.',
  },
  {
    icon: 'dashboard',
    title: 'Review hiring signal',
    text: 'Track configured roles, total screening volume, acceptance split, and recent decisions from one recruiter workspace.',
  },
  {
    icon: 'clipboard',
    title: 'Keep an audit trail',
    text: 'Every resume decision stays attached to the job with matched skills, missing skills, recommendations, and file status.',
  },
]

const applicantFeatures = [
  {
    icon: 'upload',
    title: 'Upload a PDF resume',
    text: 'Choose an available company role and submit your resume for analysis without seeing internal company setup screens.',
  },
  {
    icon: 'target',
    title: 'Get role-specific feedback',
    text: 'The analyzer compares your resume against the selected role and returns matched skills, missing skills, and recommendations.',
  },
  {
    icon: 'clipboard',
    title: 'View your own result',
    text: 'Applicant history is limited to results created in this browser session, keeping recruiter-wide results out of applicant view.',
  },
]

function HomePage({ onNavigate, role }) {
  const isRecruiter = role === 'recruiter'
  const features = isRecruiter ? recruiterFeatures : applicantFeatures

  return (
    <section className="grid gap-5">
      <div className={`${panelClass} relative overflow-hidden p-7 sm:p-10 lg:p-14`}>
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(37,99,235,.09),transparent_34%),linear-gradient(0deg,rgba(6,182,212,.08),transparent_42%)]" />
        <div className="relative grid gap-8 xl:grid-cols-[1.05fr_.95fr] xl:items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-normal text-blue-600">
              {isRecruiter ? 'Company screening workspace' : 'Applicant resume analysis'}
            </span>
            <h2 className="mt-3 max-w-4xl text-5xl font-black leading-none tracking-normal text-slate-950 max-sm:text-4xl lg:text-7xl">
              {isRecruiter
                ? 'Make resume screening consistent, traceable, and faster.'
                : 'Understand how your resume fits a real company role.'}
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-slate-500">
              {isRecruiter
                ? 'Resume Analyzer helps companies define role criteria once, screen resumes against the same standard, and review decisions without manually reading every PDF from scratch.'
                : 'Resume Analyzer lets applicants upload a resume for a selected role and receive a structured analysis based on the company scorecard.'}
            </p>
            <div className="mt-7 flex flex-wrap gap-3 max-sm:flex-col">
              {isRecruiter ? (
                <>
                  <Button className="max-sm:w-full" onClick={() => onNavigate('jobs')}>
                    <Icon name="plus" />
                    Create job scorecard
                  </Button>
                  <Button variant="secondary" className="max-sm:w-full" onClick={() => onNavigate('dashboard')}>
                    <Icon name="dashboard" />
                    Open dashboard
                  </Button>
                </>
              ) : (
                <Button className="max-sm:w-full" onClick={() => onNavigate('upload')}>
                  <Icon name="upload" />
                  Upload resume
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-slate-200 bg-white/80 p-4 shadow-[0_20px_55px_rgba(15,23,42,.08)] backdrop-blur">
            <InfoLine label="What it does" text="Converts a resume screening workflow into repeatable job criteria, analysis, and decision records." />
            <InfoLine label="What it makes easy" text="Creating role scorecards, comparing resumes consistently, and reviewing recommendations without scattered notes." />
            <InfoLine label="Who uses it" text={isRecruiter ? 'Recruiters and hiring teams managing company roles.' : 'Applicants submitting resumes for available roles.'} />
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>

      <div className={`${panelClass} grid overflow-hidden lg:grid-cols-3`}>
        {isRecruiter ? (
          <>
            <WorkflowStep index="01" title="Define scorecards" text="Set role type, description points, required skills, experience, and thresholds." />
            <WorkflowStep index="02" title="Collect submissions" text="Applicants upload resumes against available company roles." />
            <WorkflowStep index="03" title="Review decisions" text="Recruiters inspect accepted/rejected outcomes, skills, and recommendations." />
          </>
        ) : (
          <>
            <WorkflowStep index="01" title="Choose a role" text="Pick the company job you want to evaluate your resume against." />
            <WorkflowStep index="02" title="Upload resume" text="Submit a PDF resume for role-specific analysis." />
            <WorkflowStep index="03" title="Read your result" text="Review matched skills, missing skills, and improvement recommendations." />
          </>
        )}
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, text }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-[0_20px_55px_rgba(15,23,42,.08)]">
      <div className="grid h-11 w-11 place-items-center rounded-lg bg-blue-50 text-blue-700">
        <Icon name={icon} />
      </div>
      <h3 className="mt-5 text-xl font-extrabold tracking-normal text-slate-950">{title}</h3>
      <p className="mt-2 text-slate-500">{text}</p>
    </article>
  )
}

function InfoLine({ label, text }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4">
      <span className="text-xs font-bold uppercase tracking-normal text-blue-600">{label}</span>
      <p className="mt-1 text-slate-600">{text}</p>
    </div>
  )
}

export default HomePage
