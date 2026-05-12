export function createEmptyJobForm() {
  return {
    jobTitle: '',
    roleType: 'Mid',
    experienceRequired: '3',
    education: '',
    minSkillMatchPercentage: 70,
    minRoleAlignmentScore: 60,
    jobDescription: '',
    skills: [
      { skillName: '', requiredLevel: 4, isMandatory: true },
      { skillName: '', requiredLevel: 3, isMandatory: false },
    ],
  }
}
