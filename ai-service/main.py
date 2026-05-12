from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator
from utils.matcher import analyze_resume

app = FastAPI(title="JobAlign AI Service", version="1.0.0")


class AnalyzeRequest(BaseModel):
    resume_text: str
    job: dict

    @field_validator("resume_text")
    @classmethod
    def resume_must_not_be_empty(cls, v: str) -> str:
        if not v or not v.strip():
            raise ValueError("resume_text must not be empty")
        return v

    @field_validator("job")
    @classmethod
    def job_must_have_required_fields(cls, v: dict) -> dict:
        if not v.get("jobTitle"):
            raise ValueError("job.jobTitle is required")
        if not isinstance(v.get("techSkills"), list):
            raise ValueError("job.techSkills must be a list")
        return v


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/analyze")
def analyze(data: AnalyzeRequest):
    try:
        return analyze_resume(data.resume_text, data.job)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=str(exc))


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "error": str(exc)},
    )
