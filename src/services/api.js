export const API_ROOT = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api').replace(/\/$/, '')

async function apiJson(path, options = {}) {
  const response = await fetch(`${API_ROOT}${path}`, options)
  const text = await response.text()
  let data = {}

  if (text) {
    try {
      data = JSON.parse(text)
    } catch {
      data = { message: text }
    }
  }

  if (!response.ok) {
    throw new Error(data.error || data.message || `Request failed with status ${response.status}`)
  }

  return data
}

export const resumeApi = {
  async getJobs() {
    const data = await apiJson('/jobs')
    return data.jobs || []
  },

  async getJobAnalyses(jobId) {
    const data = await apiJson(`/jobs/${jobId}/analyses`)
    return data.analyses || []
  },

  async createJob(payload) {
    const data = await apiJson('/jobs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    return data.job
  },

  async analyzeResume({ jobId, file }) {
    const formData = new FormData()
    formData.append('jobId', jobId)
    formData.append('resume', file)

    return apiJson('/analyze', {
      method: 'POST',
      body: formData,
    })
  },
}
