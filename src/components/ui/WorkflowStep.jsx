function WorkflowStep({ index, title, text }) {
  return (
    <div className="flex gap-3 border-slate-200 p-5 last:border-0 lg:border-r">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 font-black text-blue-700">
        {index}
      </span>
      <div>
        <strong className="text-slate-950">{title}</strong>
        <p className="mt-1 text-slate-500">{text}</p>
      </div>
    </div>
  )
}

export default WorkflowStep
