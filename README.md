# 🧠 MeetSmart — AI Meeting Intelligence for Indian Teams

https://meet-smart-seven.vercel.app/


> Paste any meeting transcript in English, Hinglish, or Hindi. Get a full intelligence report in seconds.

![Backend](https://img.shields.io/badge/Backend-FastAPI-009688?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-React-61DAFB?style=flat-square)
![AI](https://img.shields.io/badge/AI-Llama%203.3%2070B-FF6B35?style=flat-square)
![Inference](https://img.shields.io/badge/Inference-Groq-F55036?style=flat-square)
![Deploy](https://img.shields.io/badge/Deploy-Render%20%2B%20Vercel-black?style=flat-square)
![Free](https://img.shields.io/badge/Cost-100%25%20Free-2d6a4f?style=flat-square)

---

## ✨ What It Does

Paste a transcript from Google Meet, Zoom, Teams, WhatsApp, or Slack — in **any language including Hinglish** — and get:

| Feature | Description |
|---|---|
| 📋 **Smart Summary** | 3-4 sentence crisp summary of what was discussed |
| ✅ **Action Items** | Who needs to do what, by when |
| 👥 **Participation Analysis** | Who dominated, who was silent, speaking % |
| 📊 **Health Score** | 0–100 score on how productive the meeting was |
| 🔥 **Meeting Roast** | Brutally honest AI verdict on the meeting |
| 📧 **Email Draft** | Auto-generated follow-up email ready to send |
| 🌐 **Hinglish Support** | Works with English, Hindi, Hinglish, or any mix |

---

## 🎯 Why This Is Different

| Feature | Otter.ai | Notion AI | MeetSmart |
|---|---|---|---|
| English transcripts | ✅ | ✅ | ✅ |
| Hinglish / Hindi | ❌ | ❌ | ✅ |
| Auto language detect | ❌ | ❌ | ✅ |
| Meeting health score | ❌ | ❌ | ✅ |
| Participation analysis | Paid | ❌ | ✅ |
| Meeting roast | ❌ | ❌ | ✅ |
| Free & open source | ❌ | ❌ | ✅ |

---

## 🛠️ Tech Stack

| Layer | Technology | Hosting |
|---|---|---|
| **Backend** | Python, FastAPI, Pydantic | Render (free) |
| **Frontend** | React 18, CSS3 | Vercel (free) |
| **AI Model** | Llama 3.3 70B via Groq | Free tier |

---

## 🚀 Local Setup

### Prerequisites
- Python 3.9+
- Node.js 18+
- Free Groq API key from [console.groq.com](https://console.groq.com)

### Backend
```bash
cd backend
pip install -r requirements.txt
cp .env.example .env        # Add your GROQ_API_KEY
uvicorn main:app --reload --port 8000
```

Swagger docs: `http://localhost:8000/docs`
Health check: `http://localhost:8000/health`
Groq test: `http://localhost:8000/test`

### Frontend
```bash
cd frontend
npm install
cp .env.example .env        # Set REACT_APP_API_URL=http://localhost:8000
npm start
```

---

## ☁️ Deployment

### Backend → Render
1. Push to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Root directory: `backend`
4. Build: `pip install -r requirements.txt`
5. Start: `uvicorn main:app --host 0.0.0.0 --port $PORT`
6. Add env var: `GROQ_API_KEY=your_key`

### Frontend → Vercel
1. Go to [vercel.com](https://vercel.com) → New Project
2. Root directory: `frontend`
3. Add env var: `REACT_APP_API_URL=https://your-render-url.onrender.com`
4. Deploy

---

## 📡 API Reference

### `POST /analyze`
Analyzes a meeting transcript and returns full intelligence report.

**Request:**
```json
{
  "transcript": "Alex: Let's start...\nJohn: I finished...",
  "meeting_title": "Weekly Standup"
}
```

**Response:**
```json
{
  "language_detected": "English",
  "summary": "Team discussed sprint progress...",
  "action_items": [
    { "owner": "John", "task": "Review PR", "deadline": "EOD today" }
  ],
  "participants": [
    { "name": "Alex", "percentage": 45, "role": "Dominant" }
  ],
  "health_score": 78,
  "health_verdict": "Productive standup with clear outcomes",
  "roast": "You actually made decisions. Rare achievement.",
  "email_draft": "Subject: Meeting Summary...",
  "tags": ["Productive", "Action-Heavy"]
}
```

---

## 🗂️ Project Structure

```
meetsmart/
├── backend/
│   ├── main.py              ← FastAPI app (single endpoint)
│   ├── requirements.txt
│   ├── render.yaml          ← Render deploy config
│   └── .env.example
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── App.js           ← Full React UI
│   │   └── index.js
│   ├── package.json
│   └── .env.example
├── .gitignore
└── README.md
```

---

## 🔮 Future Ideas

- [ ] Direct file upload (`.txt`, `.docx`, `.pdf` transcripts)
- [ ] WhatsApp chat export parser (handles timestamps automatically)
- [ ] Multi-language output (summary in Hindi)
- [ ] Meeting comparison over time
- [ ] Slack / Notion integration to auto-export results
- [ ] Voice recording → transcript → analysis pipeline

---

## 📄 License

MIT — free to use, fork, and build on.

---

*Built with FastAPI + Groq (Llama 3.3) + React | Deployed on Render + Vercel*
*The only AI meeting tool that understands how Indian teams actually communicate.*
