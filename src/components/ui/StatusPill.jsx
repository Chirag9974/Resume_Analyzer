function StatusPill({ approved }) {
  return (
    <span
      className={`inline-flex min-h-8 items-center gap-2 whitespace-nowrap rounded-lg px-2.5 text-sm font-bold ${
        approved ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
      }`}
    >
      <span
        className={`h-2 w-2 rounded-full ${approved ? 'bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,.12)]' : 'bg-red-500 shadow-[0_0_0_4px_rgba(239,68,68,.12)]'}`}
      />
      {approved ? 'Accepted' : 'Rejected'}
    </span>
  )
}

export default StatusPill
