import Button from '../ui/Button.jsx'
import Icon from '../ui/Icon.jsx'

function RoleSelection({ onSelectRole }) {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-slate-100 p-6 text-slate-950">
      <section className="w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-6 text-center shadow-[0_20px_55px_rgba(15,23,42,.08)] sm:p-10">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 font-black text-white shadow-[0_14px_34px_rgba(37,99,235,.32)]">
          RA
        </div>
        <span className="mt-6 block text-xs font-bold uppercase tracking-normal text-blue-600">
          Resume Analyzer
        </span>
        <h1 className="mt-2 text-4xl font-black leading-none tracking-normal text-slate-950">
          Choose your workspace
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-slate-500">
          Recruiters manage job scorecards and hiring analytics. Applicants can upload resumes
          against available roles without access to company setup tools.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Button className="min-h-14" onClick={() => onSelectRole('recruiter')}>
            <Icon name="briefcase" />
            I'm a recruiter
          </Button>
          <Button variant="secondary" className="min-h-14" onClick={() => onSelectRole('applicant')}>
            <Icon name="upload" />
            I'm an applicant
          </Button>
        </div>
      </section>
    </main>
  )
}

export default RoleSelection
