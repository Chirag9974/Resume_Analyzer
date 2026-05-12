import { useState } from 'react'
import Button from '../../components/ui/Button.jsx'
import Field from '../../components/ui/Field.jsx'
import FormMessage from '../../components/ui/FormMessage.jsx'
import Icon from '../../components/ui/Icon.jsx'
import Panel from '../../components/ui/Panel.jsx'
import SectionHeader from '../../components/ui/SectionHeader.jsx'
import { roleOptions } from '../../config/navigation.js'
import { createEmptyJobForm } from './createEmptyJobForm.js'
import { cx, fieldControlClass } from '../../utils/classes.js'
import { asList } from '../../utils/format.js'

function JobBuilder({ onCreateJob }) {
  const [form, setForm] = useState(createEmptyJobForm)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const updateSkill = (index, field, value) => {
    setForm((current) => ({
      ...current,
      skills: current.skills.map((skill, skillIndex) =>
        skillIndex === index ? { ...skill, [field]: value } : skill,
      ),
    }))
  }

  const addSkill = () => {
    setForm((current) => ({
      ...current,
      skills: [...current.skills, { skillName: '', requiredLevel: 3, isMandatory: false }],
    }))
  }

  const removeSkill = (index) => {
    setForm((current) => ({
      ...current,
      skills: current.skills.filter((_, skillIndex) => skillIndex !== index),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus({ type: '', message: '' })

    const jobDescriptionPoints = asList(form.jobDescription)
    const techSkills = form.skills
      .filter((skill) => skill.skillName.trim())
      .map((skill) => ({
        skillName: skill.skillName.trim(),
        requiredLevel: Number(skill.requiredLevel),
        isMandatory: Boolean(skill.isMandatory),
      }))

    if (!form.jobTitle.trim()) {
      setStatus({ type: 'error', message: 'Job title is required.' })
      return
    }

    if (!jobDescriptionPoints.length) {
      setStatus({ type: 'error', message: 'Add at least one job description point.' })
      return
    }

    if (!techSkills.length) {
      setStatus({ type: 'error', message: 'Add at least one required skill.' })
      return
    }

    setIsSubmitting(true)
    try {
      await onCreateJob({
        jobTitle: form.jobTitle.trim(),
        roleType: form.roleType,
        experienceRequired: Number(form.experienceRequired || 0),
        education: form.education.trim(),
        minSkillMatchPercentage: Number(form.minSkillMatchPercentage),
        minRoleAlignmentScore: Number(form.minRoleAlignmentScore),
        jobDescriptionPoints,
        techSkills,
      })
      setForm(createEmptyJobForm())
      setStatus({ type: 'success', message: 'Job scorecard created.' })
    } catch (error) {
      setStatus({ type: 'error', message: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Panel className="xl:sticky xl:top-7">
      <SectionHeader eyebrow="Create scorecard" title="New job" />

      <form className="grid gap-5" onSubmit={handleSubmit}>
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Job title">
            <input
              className={fieldControlClass}
              value={form.jobTitle}
              onChange={(event) => updateField('jobTitle', event.target.value)}
              placeholder="Senior Backend Engineer"
            />
          </Field>
          <Field label="Role type">
            <select
              className={fieldControlClass}
              value={form.roleType}
              onChange={(event) => updateField('roleType', event.target.value)}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Experience required">
            <input
              className={fieldControlClass}
              type="number"
              min="0"
              value={form.experienceRequired}
              onChange={(event) => updateField('experienceRequired', event.target.value)}
            />
          </Field>
          <Field label="Education">
            <input
              className={fieldControlClass}
              value={form.education}
              onChange={(event) => updateField('education', event.target.value)}
              placeholder="B.Tech, MCA, or equivalent"
            />
          </Field>
          <Field label="Minimum skill match">
            <input
              className={fieldControlClass}
              type="number"
              min="0"
              max="100"
              value={form.minSkillMatchPercentage}
              onChange={(event) => updateField('minSkillMatchPercentage', event.target.value)}
            />
          </Field>
          <Field label="Minimum role alignment">
            <input
              className={fieldControlClass}
              type="number"
              min="0"
              max="100"
              value={form.minRoleAlignmentScore}
              onChange={(event) => updateField('minRoleAlignmentScore', event.target.value)}
            />
          </Field>
        </div>

        <Field label="Job description points">
          <textarea
            className={cx(fieldControlClass, 'min-h-32 resize-y')}
            rows="5"
            value={form.jobDescription}
            onChange={(event) => updateField('jobDescription', event.target.value)}
            placeholder="Build APIs for resume analysis&#10;Own MongoDB data models&#10;Collaborate with hiring teams"
          />
        </Field>

        <div className="grid gap-3">
          <div className="flex items-center justify-between gap-3">
            <strong className="text-slate-950">Required skills</strong>
            <Button variant="small" onClick={addSkill}>
              <Icon name="plus" />
              Add skill
            </Button>
          </div>
          {form.skills.map((skill, index) => (
            <div
              className="grid items-end gap-2 md:grid-cols-[minmax(150px,1fr)_92px_128px_44px]"
              key={`skill-row-${index}`}
            >
              <Field label="Skill">
                <input
                  className={fieldControlClass}
                  value={skill.skillName}
                  onChange={(event) => updateSkill(index, 'skillName', event.target.value)}
                  placeholder="React"
                />
              </Field>
              <Field label="Level">
                <select
                  className={fieldControlClass}
                  value={skill.requiredLevel}
                  onChange={(event) => updateSkill(index, 'requiredLevel', event.target.value)}
                >
                  {[1, 2, 3, 4, 5].map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </Field>
              <label className="flex min-h-11 items-center gap-2 rounded-lg border border-slate-300 bg-white px-3 font-bold text-slate-950">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-blue-600"
                  checked={skill.isMandatory}
                  onChange={(event) => updateSkill(index, 'isMandatory', event.target.checked)}
                />
                Mandatory
              </label>
              <Button
                variant="iconLight"
                onClick={() => removeSkill(index)}
                aria-label="Remove skill"
                disabled={form.skills.length === 1}
              >
                <Icon name="x" />
              </Button>
            </div>
          ))}
        </div>

        {status.message ? <FormMessage type={status.type} message={status.message} /> : null}

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          <Icon name="plus" />
          {isSubmitting ? 'Creating...' : 'Create job scorecard'}
        </Button>
      </form>
    </Panel>
  )
}

export default JobBuilder
