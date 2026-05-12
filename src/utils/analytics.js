import { safeScore, skillName } from './format.js'

function average(items, field) {
  if (!items.length) return 0
  const total = items.reduce((sum, item) => sum + safeScore(item[field]), 0)
  return Math.round(total / items.length)
}

export function buildAnalytics(jobs, analysesByJob) {
  const allAnalyses = Object.values(analysesByJob).flat()
  const accepted = allAnalyses.filter((analysis) => analysis.approved).length
  const rejected = allAnalyses.length - accepted
  const missingCounts = new Map()

  allAnalyses.forEach((analysis) => {
    ;(analysis.missingSkills || []).forEach((skill) => {
      const name = skillName(skill)
      if (!name) return
      missingCounts.set(name, (missingCounts.get(name) || 0) + 1)
    })
  })

  const topMissing = [...missingCounts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6)

  const recent = [...allAnalyses]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, 6)

  return {
    jobs: jobs.length,
    reviewed: allAnalyses.length,
    accepted,
    rejected,
    approvalRate: allAnalyses.length ? Math.round((accepted / allAnalyses.length) * 100) : 0,
    avgSkill: average(allAnalyses, 'skillMatchPercentage'),
    avgRole: average(allAnalyses, 'roleAlignmentScore'),
    topMissing,
    recent,
  }
}
