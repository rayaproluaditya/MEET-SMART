from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq
from typing import List
import json, os, re
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="MeetSmart API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

GROQ_API_KEY = os.getenv("GROQ_API_KEY", "")
if not GROQ_API_KEY:
    print("WARNING: GROQ_API_KEY not set in .env file!")

client = Groq(api_key=GROQ_API_KEY)
MODEL = "llama-3.3-70b-versatile"

def ask(prompt: str) -> str:
    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0.7,
    )
    return response.choices[0].message.content

# ── Models ─────────────────────────────────────────────────────────────────────

class TranscriptRequest(BaseModel):
    transcript: str
    meeting_title: str = "Team Meeting"

class ActionItem(BaseModel):
    owner: str
    task: str
    deadline: str

class Participant(BaseModel):
    name: str
    percentage: int
    role: str

class MeetSmartResponse(BaseModel):
    language_detected: str
    summary: str
    action_items: List[ActionItem]
    participants: List[Participant]
    health_score: int
    health_verdict: str
    roast: str
    email_draft: str
    tags: List[str]

    class Config:
        orm_mode = True

# ── Endpoints ──────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "MeetSmart API is live"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.get("/test")
async def test():
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not set")
    try:
        result = ask("Say hello in one word.")
        return {"status": "working", "response": result.strip()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/analyze")
async def analyze_meeting(req: TranscriptRequest):
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not set. Add to backend/.env")

    if len(req.transcript.strip()) < 50:
        raise HTTPException(status_code=400, detail="Transcript too short.")

    prompt = f"""You are an expert meeting analyst. Analyze the following meeting transcript.

IMPORTANT:
- Transcript may be in English, Hindi, Hinglish, or mixed
- Auto detect language, always respond in English
- Ignore noise descriptions like [dog barking], [audio cuts], [pause]

MEETING TITLE: {req.meeting_title}

TRANSCRIPT:
{req.transcript}

Respond ONLY with raw JSON, no markdown, no extra text:

{{
  "language_detected": "Hinglish",
  "summary": "3-4 sentence summary of what was discussed",
  "action_items": [
    {{"owner": "Name", "task": "Task description", "deadline": "Deadline or Not specified"}}
  ],
  "participants": [
    {{"name": "Name", "percentage": 40, "role": "Dominant"}}
  ],
  "health_score": 72,
  "health_verdict": "One sentence verdict on meeting quality",
  "roast": "Savage funny 1-2 sentence roast of this meeting",
  "email_draft": "Subject: Meeting Summary\\n\\nHi Team,\\n\\n[summary and action items]\\n\\nBest regards",
  "tags": ["Productive", "Action-Heavy"]
}}

Health: 0-40 waste, 41-60 below avg, 61-80 decent, 81-100 excellent
Tags from: Productive, Unproductive, Action-Heavy, Discussion-Heavy, Too Long, Focused, Off-Track, Decision-Made, No Decisions, Follow-Up Needed
Max 4 tags."""

    try:
        text = ask(prompt)
        text = re.sub(r"```json|```", "", text).strip()
        data = json.loads(text)
        return data
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned malformed response. Try again.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")