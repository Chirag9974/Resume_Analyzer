from utils.skill_extractor import extract_job_skills
from utils.context_matcher import check_role_alignment


def _skill_weight(skill: dict) -> float:
    """
    Weight = requiredLevel (1-5) × multiplier.
    Mandatory skills count double so missing them tanks the score.
    """
    level      = skill.get("requiredLevel", 1)
    multiplier = 2.0 if skill.get("isMandatory") else 1.0
    return level * multiplier


def _compute_skill_match_percentage(matched: list, all_skills: list) -> float:
    """
    Weighted skill match percentage.

    Fix vs original: the old formula only counted mandatory skills and
    returned 100% when none were marked mandatory.

    New formula: every skill contributes to the score proportionally to
    its required level. Mandatory skills count double, so missing even
    one high-level mandatory skill noticeably drops the score.
    """
    if not all_skills:
        return 100.0

    matched_names = {s["skillName"].lower() for s in matched}

    total_weight   = sum(_skill_weight(s) for s in all_skills)
    matched_weight = sum(
        _skill_weight(s)
        for s in all_skills
        if s["skillName"].lower() in matched_names
    )

    return round((matched_weight / total_weight) * 100, 2)


def _build_recommendations(missing: list) -> list[str]:
    """
    Generate prioritised, actionable recommendations.
    Mandatory skills are listed first, then by required level descending.
    """
    sorted_missing = sorted(
        missing,
        key=lambda s: (not s.get("isMandatory"), -s.get("requiredLevel", 1)),
    )

    recommendations = []
    for skill in sorted_missing:
        label    = skill["skillName"]
        level    = skill.get("requiredLevel", 1)
        required = "Required" if skill.get("isMandatory") else "Optional"
        recommendations.append(
            f"{required}: Strengthen {label} to at least level {level}/5"
        )

    return recommendations


def analyze_resume(resume_text: str, job: dict) -> dict:
    tech_skills = job.get("techSkills", [])
    job_title   = job.get("jobTitle", "")
    job_points  = job.get("jobDescriptionPoints", [])

    # Step 1 – Skill matching (word-boundary-aware)
    matched_skill_names = extract_job_skills(resume_text, tech_skills)

    matched = []
    missing = []

    for skill in tech_skills:
        if skill["skillName"].lower() in matched_skill_names:
            matched.append(skill)
        else:
            missing.append(skill)

    # Step 2 – Weighted skill match percentage
    skill_match_percentage = _compute_skill_match_percentage(matched, tech_skills)

    # Step 3 – Semantic role alignment score
    role_alignment_score = check_role_alignment(resume_text, job_points, job_title)

    # Step 4 – Prioritised recommendations
    recommendations = _build_recommendations(missing)

    return {
        "skillMatchPercentage": skill_match_percentage,
        "roleAlignmentScore":   role_alignment_score,
        "matchedSkills":        matched,
        "missingSkills":        missing,
        "recommendations":      recommendations,
    }
