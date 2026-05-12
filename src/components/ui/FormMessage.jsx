function FormMessage({ type, message }) {
  const tone =
    type === 'error'
      ? 'border-red-200 bg-red-50 text-red-700'
      : 'border-emerald-200 bg-emerald-50 text-emerald-700'

  return <div className={`rounded-lg border px-3 py-3 font-bold ${tone}`}>{message}</div>
}

export default FormMessage
