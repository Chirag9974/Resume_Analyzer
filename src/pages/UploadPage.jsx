import EmptyState from '../components/ui/EmptyState.jsx'
import Panel from '../components/ui/Panel.jsx'
import ProgressBar from '../components/ui/ProgressBar.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import SkillPill from '../components/ui/SkillPill.jsx'
import WorkflowStep from '../components/ui/WorkflowStep.jsx'
import UploadStation from '../features/upload/UploadStation.jsx'
import { safeScore } from '../utils/format.js'

function UploadPage({ jobs, selectedJobId, selectedJob, onSelectJob, onAnalyze, onNavigate }) {
  return (
    <section className="grid items-start gap-5 xl:grid-cols-[1.05fr_.95fr]">
      <UploadStation
        jobs={jobs}
        selectedJobId={selectedJobId}
        onSelectJob={onSelectJob}
        onAnalyze={onAnalyze}
        onNavigate={onNavigate}
      />

      <aside className="grid gap-5">
        <Panel>
          <SectionHeader eyebrow="Selected scorecard" title={selectedJob?.jobTitle || 'Choose a job'} />
          {selectedJob ? (
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Skill threshold</span>
                <strong className="text-slate-950">{safeScore(selectedJob.minSkillMatchPercentage)}%</strong>
              </div>
              <ProgressBar value={selectedJob.minSkillMatchPercentage} />
              <div className="flex items-center justify-between gap-3">
                <span className="text-slate-500">Role threshold</span>
                <strong className="text-slate-950">{safeScore(selectedJob.minRoleAlignmentScore)}%</strong>
              </div>
              <ProgressBar value={selectedJob.minRoleAlignmentScore} />
              <div className="flex flex-wrap gap-2">
                {(selectedJob.techSkills || []).slice(0, 8).map((skill) => (
                  <SkillPill key={`${skill.skillName}-${skill.requiredLevel}`} skill={skill} />
                ))}
              </div>
            </div>
          ) : (
            <EmptyState title="No job selected" text="Create or choose a job before uploading a resume." />
          )}
        </Panel>

        <Panel className="grid gap-3">
          <span className="text-xs font-bold uppercase tracking-normal text-blue-600">Evaluation flow</span>
          <div className="grid gap-3">
            <WorkflowStep index="A" title="Parse resume" text="The PDF text is extracted before matching." />
            <WorkflowStep index="B" title="Score criteria" text="Skills and role context are compared against the job." />
            <WorkflowStep index="C" title="Route decision" text="Accepted and rejected files move into separate server folders." />
          </div>
        </Panel>
      </aside>
    </section>
  )
}

export default UploadPage
