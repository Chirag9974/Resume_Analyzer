import Icon from '../ui/Icon.jsx'

function ApiBanner({ message }) {
  return (
    <div className="mb-5 flex gap-3 rounded-lg border border-red-200 bg-red-50 p-3 text-red-700" role="status">
      <Icon name="alert" className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        <strong className="block">Backend connection needed</strong>
        <span className="block">
          {message}. Start the Node server on port 3000 to load real jobs and analyses.
        </span>
      </div>
    </div>
  )
}

export default ApiBanner
