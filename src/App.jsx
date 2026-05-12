import { useCallback, useEffect, useMemo, useState } from 'react'
import ApiBanner from './components/layout/ApiBanner.jsx'
import RoleSelection from './components/layout/RoleSelection.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Topbar from './components/layout/Topbar.jsx'
import { canAccessPage, getNavItemsForRole, pageTitles } from './config/navigation.js'
import DashboardPage from './pages/DashboardPage.jsx'
import HomePage from './pages/HomePage.jsx'
import JobsPage from './pages/JobsPage.jsx'
import ResultsPage from './pages/ResultsPage.jsx'
import UploadPage from './pages/UploadPage.jsx'
import { resumeApi } from './services/api.js'
import { buildAnalytics } from './utils/analytics.js'

const ROLE_STORAGE_KEY = 'ra_role'
const APPLICANT_ANALYSES_STORAGE_KEY = 'ra_applicant_analysis_ids'

function readStoredRole() {
  return window.localStorage.getItem(ROLE_STORAGE_KEY) || ''
}

function readStoredApplicantAnalysisIds() {
  try {
    const parsed = JSON.parse(window.localStorage.getItem(APPLICANT_ANALYSES_STORAGE_KEY) || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function storeApplicantAnalysisIds(ids) {
  window.localStorage.setItem(APPLICANT_ANALYSES_STORAGE_KEY, JSON.stringify(ids))
}

function App() {
  const [role, setRole] = useState(readStoredRole)
  const [activePage, setActivePage] = useState('home')
  const [jobs, setJobs] = useState([])
  const [analysesByJob, setAnalysesByJob] = useState({})
  const [selectedJobId, setSelectedJobId] = useState('')
  const [selectedAnalysisId, setSelectedAnalysisId] = useState('')
  const [applicantAnalysisIds, setApplicantAnalysisIds] = useState(readStoredApplicantAnalysisIds)
  const [isBooting, setIsBooting] = useState(true)
  const [apiError, setApiError] = useState('')
  const visibleNavItems = useMemo(() => getNavItemsForRole(role), [role])
  const hasApplicantResults = applicantAnalysisIds.length > 0

  const loadWorkspace = useCallback(async () => {
    setIsBooting(true)
    setApiError('')

    try {
      const safeJobs = await resumeApi.getJobs()
      const analysisResults = await Promise.allSettled(
        safeJobs.map(async (job) => [job._id, await resumeApi.getJobAnalyses(job._id)]),
      )

      const nextAnalyses = {}
      analysisResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          const [jobId, analyses] = result.value
          nextAnalyses[jobId] = analyses
        }
      })

      setJobs(safeJobs)
      setAnalysesByJob(nextAnalyses)
      setSelectedJobId((current) => {
        if (current && safeJobs.some((job) => job._id === current)) return current
        return safeJobs[0]?._id || ''
      })
    } catch (error) {
      setApiError(error.message)
      setJobs([])
      setAnalysesByJob({})
    } finally {
      setIsBooting(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadWorkspace()
    }, 0)

    return () => window.clearTimeout(timer)
  }, [loadWorkspace])

  const analytics = useMemo(() => buildAnalytics(jobs, analysesByJob), [jobs, analysesByJob])
  const selectedJob = useMemo(
    () => jobs.find((job) => job._id === selectedJobId) || null,
    [jobs, selectedJobId],
  )

  const switchRole = (newRole) => {
    window.localStorage.setItem(ROLE_STORAGE_KEY, newRole)
    setRole(newRole)
    setActivePage('home')
    setSelectedAnalysisId('')
  }

  const navigate = (page) => {
    setActivePage(canAccessPage(page, role, hasApplicantResults) ? page : 'home')
  }

  const handleCreateJob = async (payload) => {
    if (role !== 'recruiter') {
      throw new Error('Only recruiter accounts can create job scorecards.')
    }

    const createdJob = await resumeApi.createJob(payload)

    if (createdJob?._id) {
      setJobs((current) => [createdJob, ...current.filter((job) => job._id !== createdJob._id)])
      setAnalysesByJob((current) => ({ ...current, [createdJob._id]: [] }))
      setSelectedJobId(createdJob._id)
    }

    return createdJob
  }

  const handleAnalyzeResume = async ({ jobId, file }) => {
    const data = await resumeApi.analyzeResume({ jobId, file })
    const analysis = data.analysis

    if (analysis?._id) {
      if (role === 'applicant') {
        setApplicantAnalysisIds((current) => {
          const next = [analysis._id, ...current.filter((id) => id !== analysis._id)]
          storeApplicantAnalysisIds(next)
          return next
        })
      }

      setAnalysesByJob((current) => ({
        ...current,
        [jobId]: [analysis, ...(current[jobId] || []).filter((item) => item._id !== analysis._id)],
      }))
      setSelectedJobId(jobId)
      setSelectedAnalysisId(analysis._id)
      setActivePage('results')
    }

    return data
  }

  const renderPage = () => {
    if (!canAccessPage(activePage, role, hasApplicantResults)) {
      return <HomePage analytics={analytics} jobs={jobs} onNavigate={navigate} role={role} />
    }

    switch (activePage) {
      case 'dashboard':
        return <DashboardPage analytics={analytics} jobs={jobs} onNavigate={navigate} />
      case 'jobs':
        return (
          <JobsPage
            jobs={jobs}
            analysesByJob={analysesByJob}
            onCreateJob={handleCreateJob}
            onSelectJob={setSelectedJobId}
            onNavigate={navigate}
          />
        )
      case 'upload':
        return (
          <UploadPage
            jobs={jobs}
            selectedJobId={selectedJobId}
            selectedJob={selectedJob}
            onSelectJob={setSelectedJobId}
            onAnalyze={handleAnalyzeResume}
            onNavigate={navigate}
          />
        )
      case 'results':
        return (
          <ResultsPage
            jobs={jobs}
            analysesByJob={analysesByJob}
            selectedJobId={selectedJobId}
            selectedAnalysisId={selectedAnalysisId}
            role={role}
            allowedAnalysisIds={applicantAnalysisIds}
            onSelectJob={setSelectedJobId}
            onSelectAnalysis={setSelectedAnalysisId}
            onNavigate={navigate}
          />
        )
      default:
        return <HomePage analytics={analytics} jobs={jobs} onNavigate={navigate} role={role} />
    }
  }

  if (!role) {
    return <RoleSelection onSelectRole={switchRole} />
  }

  return (
    <div
      className="min-h-[100svh] bg-slate-100 text-slate-950 lg:flex"
      style={{
        backgroundImage:
          'linear-gradient(90deg, rgba(15,23,42,.04) 1px, transparent 1px), linear-gradient(0deg, rgba(15,23,42,.04) 1px, transparent 1px)',
        backgroundSize: '42px 42px',
      }}
    >
      <Sidebar
        activePage={activePage}
        navItems={visibleNavItems}
        onNavigate={navigate}
        role={role}
        onSwitchRole={switchRole}
      />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-7">
        <Topbar
          title={pageTitles[activePage]}
          isBooting={isBooting}
          apiError={apiError}
          onRefresh={loadWorkspace}
        />
        {apiError ? <ApiBanner message={apiError} /> : null}
        {renderPage()}
      </main>
    </div>
  )
}

export default App
