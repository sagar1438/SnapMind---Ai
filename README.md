# 🧠 SnapMind AI — Study & Knowledge Organizer

Turn screenshots of notes, code errors, interview questions, and articles into a searchable, AI-summarized knowledge base.

![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=flat&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=flat&logo=sqlite&logoColor=white)
![Gemini API](https://img.shields.io/badge/Gemini_API-8E75B2?style=flat&logo=googlegemini&logoColor=white)

---

## 📌 Overview

Most people take screenshots of things worth remembering — a tricky error message, a good explanation of a CS concept, an interview question from a forum — and then never see them again, buried in a camera roll.

**SnapMind AI** fixes that. Upload a screenshot, and the app:
1. Extracts the text from it using OCR
2. Sends that text to Google Gemini to generate a title, a short summary, and relevant tags
3. Stores everything in a searchable database

The result is a personal, AI-organized knowledge base built from screenshots you'd otherwise lose track of.

---

## ✨ Features

- 📤 **Upload** — drag-and-drop or select a screenshot to add it to your library
- 🔍 **OCR text extraction** — pulls readable text out of any uploaded image
- 🤖 **AI-generated metadata** — title, summary, and tags generated automatically via Gemini
- 🖼️ **Gallery view** — browse every saved screenshot as a card grid
- 🔎 **Search** — find entries instantly by title or tag
- 📄 **Detail view** — see the original image side-by-side with its extracted text, summary, and tags
- ✏️ **Edit** — correct or improve an AI-generated title/tags after the fact
- 🗑️ **Delete** — remove entries you no longer need
- ⚠️ **Graceful error handling** — invalid files, failed OCR, or failed AI calls don't crash the app

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React (Vite), HTML, CSS, JavaScript |
| Backend | Python, FastAPI |
| Database | SQLite |
| OCR | EasyOCR |
| AI | Google Gemini API |
| Frontend Hosting | Vercel |
| Backend Hosting | Render |

---

## ⚙️ How It Works

```
 Screenshot Upload
        │
        ▼
 ┌─────────────────┐
 │   FastAPI        │  1. Receives image, validates file type/size
 │   Backend        │  2. Saves image to /uploads
 └────────┬─────────┘
          │
          ▼
 ┌─────────────────┐
 │   EasyOCR         │  3. Extracts raw text from the image
 └────────┬─────────┘
          │
          ▼
 ┌─────────────────┐
 │   Gemini API       │  4. Generates title, summary, and tags
 │                    │     from the extracted text
 └────────┬─────────┘
          │
          ▼
 ┌─────────────────┐
 │   SQLite           │  5. Stores image path, extracted text,
 │                    │     title, summary, tags, upload date
 └────────┬─────────┘
          │
          ▼
   Returned to React frontend → shown in Gallery / Details view
```

---

---

## 📁 Project Structure

```
snapmind-ai/
│
├── backend/
│   ├── main.py            # FastAPI app + route definitions
│   ├── database.py        # SQLite connection + table setup
│   ├── ocr_service.py     # Extracts text from uploaded images
│   ├── ai_service.py      # Calls Gemini, returns title/summary/tags
│   ├── requirements.txt
│   ├── .env.example
│   └── uploads/            # Stored screenshot images
│
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, UploadForm, ScreenshotCard, SearchBar
│   │   ├── pages/          # Home, Gallery, ScreenshotDetails
│   │   ├── services/       # api.js — calls to the backend
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Python 3.10+
- Node.js 18+
- A free [Google Gemini API key](https://ai.google.dev/)

### 1. Clone the repo
```bash
git clone https://github.com/<your-username>/snapmind---ai.git
cd snapmind---ai
```

### 2. Backend setup
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env
# then open .env and add your GEMINI_API_KEY

uvicorn main:app --reload
```
Backend runs at `http://localhost:8000` (interactive API docs at `http://localhost:8000/docs`).

### 3. Frontend setup
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at `http://localhost:5173`.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/screenshots/upload` | Upload an image, run OCR + AI, save the result |
| `GET` | `/screenshots` | List all saved screenshots |
| `GET` | `/screenshots/{id}` | Get a single screenshot's full details |
| `GET` | `/screenshots/search?q=` | Search screenshots by title or tag |
| `PATCH` | `/screenshots/{id}` | Edit a screenshot's title or tags |
| `DELETE` | `/screenshots/{id}` | Delete a screenshot |

---

## 🗄️ Database Schema

**Table: `screenshots`**

| Column | Type | Description |
|---|---|---|
| `id` | INTEGER (PK) | Unique identifier |
| `image_path` | TEXT | Path to the stored image file |
| `extracted_text` | TEXT | Raw text pulled out by OCR |
| `title` | TEXT | AI-generated title |
| `summary` | TEXT | AI-generated short summary |
| `tags` | TEXT | Comma-separated AI-generated tags |
| `upload_date` | TEXT | Timestamp of upload |

---

## 🔮 Future Improvements

- User accounts (multi-user support)
- Filter gallery by tag, not just search
- Bulk upload
- Export notes as PDF/Markdown
- Switch to Postgres for production-scale storage

---

## 👤 Author

**[Sagar Panwar]**
[LinkedIn](https://www.linkedin.com/in/sagar-panwar-255339251/) · [Portfolio](https://sagar1438.github.io/portfolio/) · sagarpanwer11@gmail.com

---

## 📄 License

This project is licensed under the MIT License.
