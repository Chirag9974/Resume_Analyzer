import re


def _build_pattern(skill_name: str) -> re.Pattern:
    """
    Build a case-insensitive regex pattern for a skill name.
    Uses lookarounds instead of \b so that skills with special
    characters like C++, C#, and .NET are matched correctly.
    """
    escaped = re.escape(skill_name)
    return re.compile(
        r"(?<![a-zA-Z0-9])" + escaped + r"(?![a-zA-Z0-9])",
        re.IGNORECASE,
    )


def extract_job_skills(resume_text: str, job_skills: list) -> list:
    """
    Returns the names of job-required skills that are present in the resume.
    Uses word-boundary-aware regex so "C" won't match "CSS"
    and "React" won't match "interactive".
    """
    matched = []

    for skill in job_skills:
        skill_name = skill["skillName"]
        pattern = _build_pattern(skill_name)
        if pattern.search(resume_text):
            matched.append(skill_name.lower())

    return matched
