from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

# Calibrated bounds for all-MiniLM-L6-v2 cosine similarity on
# resume-vs-job-description pairs. Scores below LOW → 0, above HIGH → 100.
_SIMILARITY_LOW = 0.15
_SIMILARITY_HIGH = 0.80

_SUMMARY_KEYWORDS = {
    "summary", "profile", "about me",
    "professional summary", "objective", "professional objective",
    "career objective",
}

_PROJECT_KEYWORDS = {
    "projects", "academic projects", "personal projects",
    "key projects", "project experience",
}

_EXPERIENCE_KEYWORDS = {
    "experience", "work experience", "professional experience",
    "employment history", "work history",
}

_ALL_SECTION_KEYWORDS = _SUMMARY_KEYWORDS | _PROJECT_KEYWORDS | _EXPERIENCE_KEYWORDS


def _detect_section(line_lower: str) -> str | None:
    """
    Return the section name if the line is a section header, else None.
    Matches if the stripped, lowercased line IS a known keyword OR
    the line is short (≤ 50 chars) and CONTAINS a known keyword.
    The length guard prevents mid-sentence false matches.
    """
    if line_lower in _ALL_SECTION_KEYWORDS:
        if line_lower in _SUMMARY_KEYWORDS:
            return "summary"
        if line_lower in _PROJECT_KEYWORDS:
            return "projects"
        return "experience"

    if len(line_lower) <= 50:
        for kw in _SUMMARY_KEYWORDS:
            if kw in line_lower:
                return "summary"
        for kw in _PROJECT_KEYWORDS:
            if kw in line_lower:
                return "projects"
        for kw in _EXPERIENCE_KEYWORDS:
            if kw in line_lower:
                return "experience"

    return None


def extract_core_sections(resume_text: str) -> dict:
    """
    Extract Summary/Objective, Experience, and Projects sections from a resume.

    Fix vs original: blank lines no longer reset the current section.
    A section only ends when the next section header is encountered.
    This means multi-paragraph experience/project blocks are captured fully.
    """
    lines = resume_text.split("\n")

    sections: dict[str, list[str]] = {
        "summary": [],
        "projects": [],
        "experience": [],
    }

    current_section: str | None = None

    for line in lines:
        clean = line.strip()
        lower = clean.lower()

        # Detect section header (skip blank lines for detection)
        if clean:
            detected = _detect_section(lower)
            if detected:
                current_section = detected
                continue

        # Accumulate non-empty content lines into the active section.
        # Blank lines are skipped but do NOT reset the section.
        if current_section and clean:
            sections[current_section].append(clean)

    return {
        "summary":    " ".join(sections["summary"][:8]),
        "projects":   " ".join(sections["projects"][:20]),
        "experience": " ".join(sections["experience"][:25]),
    }


def check_role_alignment(resume_text: str, job_points: list, job_title: str) -> float:
    """
    Compute a 0-100 role alignment score using semantic similarity.

    Fix vs original: the previous formula was `min(similarity * 100 * 10, 100)`.
    Because all-MiniLM-L6-v2 cosine similarities for related texts typically
    fall in the 0.2-0.7 range, multiplying by 10 made virtually everything
    score 100, making the minRoleAlignmentScore threshold meaningless.

    The new formula linearly maps the expected similarity range
    [_SIMILARITY_LOW, _SIMILARITY_HIGH] → [0, 100] and clamps the result.
    """
    sections = extract_core_sections(resume_text)

    resume_context = " ".join([
        sections["summary"],
        sections["experience"],
        sections["projects"],
    ]).strip()

    if not resume_context:
        resume_context = resume_text[:1500]

    job_context = job_title + " " + " ".join(job_points)

    resume_emb = model.encode(resume_context, convert_to_tensor=True)
    job_emb    = model.encode(job_context,    convert_to_tensor=True)

    similarity = util.cos_sim(resume_emb, job_emb).item()

    normalized = (similarity - _SIMILARITY_LOW) / (_SIMILARITY_HIGH - _SIMILARITY_LOW)
    score = max(0.0, min(1.0, normalized)) * 100

    return round(score, 2)
