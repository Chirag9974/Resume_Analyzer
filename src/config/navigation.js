export const recruiterNavItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'jobs', label: 'Jobs', icon: 'briefcase' },
  { id: 'results', label: 'Results', icon: 'clipboard' },
]

export const applicantNavItems = [
  { id: 'home', label: 'Home', icon: 'home' },
  { id: 'upload', label: 'Upload Resume', icon: 'upload' },
]

export const pageTitles = {
  home: 'Resume screening command center',
  dashboard: 'Hiring signal dashboard',
  jobs: 'Job criteria studio',
  upload: 'Resume analysis station',
  results: 'Decision history',
}

export const roleOptions = ['Intern', 'Junior', 'Mid', 'Senior']

export function getNavItemsForRole(role) {
  return role === 'recruiter' ? recruiterNavItems : applicantNavItems
}

export function canAccessPage(page, role, hasApplicantResults = false) {
  if (role === 'recruiter') return page === 'home' || page === 'dashboard' || page === 'jobs' || page === 'results'
  if (page === 'home' || page === 'upload') return true
  return page === 'results' && hasApplicantResults
}
