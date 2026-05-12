import Button from '../components/ui/Button.jsx'
import Icon from '../components/ui/Icon.jsx'
import MetricCard from '../components/ui/MetricCard.jsx'
import Panel from '../components/ui/Panel.jsx'
import ScoreRing from '../components/ui/ScoreRing.jsx'
import SectionHeader from '../components/ui/SectionHeader.jsx'
import DecisionMeter from '../features/dashboard/DecisionMeter.jsx'
import RecentTable from '../features/dashboard/RecentTable.jsx'

function DashboardPage({ analytics, jobs, onNavigate }) {
  return (
    <section className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard label="Jobs configured" value={analytics.jobs} icon="briefcase" tone="blue" />
        <MetricCard label="Total analyses" value={analytics.reviewed} icon="clipboard" tone="cyan" />
        <MetricCard label="Average skill score" value={`${analytics.avgSkill}%`} icon="target" tone="green" />
        <MetricCard label="Approval rate" value={`${analytics.approvalRate}%`} icon="check" tone="amber" />
      </div>

      <Panel>
        <SectionHeader
          eyebrow="Pipeline health"
          title="Decision split"
          action={
            <Button variant="ghost" onClick={() => onNavigate('results')}>
              View results
              <Icon name="arrow" />
            </Button>
          }
        />
        <div className="grid items-center gap-6 md:grid-cols-[auto_minmax(0,1fr)]">
          <ScoreRing score={analytics.approvalRate} label="Approved" size="large" />
          <div className="grid gap-4">
            <DecisionMeter label="Accepted" value={analytics.accepted} total={analytics.reviewed} tone="green" />
            <DecisionMeter label="Rejected" value={analytics.rejected} total={analytics.reviewed} tone="red" />
            <DecisionMeter label="Needs review" value={0} total={analytics.reviewed} tone="amber" />
          </div>
        </div>
      </Panel>

      <Panel>
        <SectionHeader
          eyebrow="Recent activity"
          title="Latest decisions"
          action={
            <Button variant="ghost" onClick={() => onNavigate('results')}>
              View all
              <Icon name="arrow" />
            </Button>
          }
        />
        <RecentTable recent={analytics.recent} jobs={jobs} />
      </Panel>
    </section>
  )
}

export default DashboardPage
