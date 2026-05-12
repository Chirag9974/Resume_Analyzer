export function asList(value) {
  return value
    .split(/\n|;/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export function safeScore(value) {
  const number = Number(value)
  if (Number.isNaN(number)) return 0
  return Math.max(0, Math.min(100, Math.round(number)))
}

export function formatDate(value) {
  if (!value) return 'No date'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return 'No date'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function skillName(skill) {
  return skill?.skillName || String(skill || '')
}

export function scoreColor(score) {
  const value = safeScore(score)
  if (value >= 80) return '#10b981'
  if (value >= 60) return '#2563eb'
  return '#ef4444'
}
