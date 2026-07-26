import os
import shutil
import uuid
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

import database
import ocr_service
import ai_service

UPLOAD_DIR = "uploads"
ALLOWED_EXTENSIONS = {".png", ".jpg", ".jpeg", ".webp"}

os.makedirs(UPLOAD_DIR, exist_ok=True)
database.init_db()

app = FastAPI(title="SnapMind AI API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.post("/screenshots/upload")
async def upload_screenshot(file: UploadFile = File(...)):
    ext = os.path.splitext(file.filename)[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    filename = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = ocr_service.extract_text_from_image(file_path)
    metadata = ai_service.generate_metadata(extracted_text)

    new_id = database.insert_screenshot(
        image_path=file_path,
        extracted_text=extracted_text,
        title=metadata["title"],
        summary=metadata["summary"],
        tags=metadata["tags"],
    )

    return database.get_screenshot_by_id(new_id)


@app.get("/screenshots")
def list_screenshots():
    return database.get_all_screenshots()


@app.get("/screenshots/search")
def search_screenshots(q: str):
    return database.search_screenshots(q)


@app.get("/screenshots/{screenshot_id}")
def get_screenshot(screenshot_id: int):
    screenshot = database.get_screenshot_by_id(screenshot_id)
    if not screenshot:
        raise HTTPException(status_code=404, detail="Screenshot not found")
    return screenshot


@app.patch("/screenshots/{screenshot_id}")
def edit_screenshot(screenshot_id: int, title: str = None, summary: str = None, tags: str = None):
    updated = database.update_screenshot(screenshot_id, title=title, summary=summary, tags=tags)
    if not updated:
        raise HTTPException(status_code=404, detail="Screenshot not found")
    return updated


@app.delete("/screenshots/{screenshot_id}")
def remove_screenshot(screenshot_id: int):
    screenshot = database.get_screenshot_by_id(screenshot_id)
    if not screenshot:
        raise HTTPException(status_code=404, detail="Screenshot not found")

    if os.path.exists(screenshot["image_path"]):
        os.remove(screenshot["image_path"])

    database.delete_screenshot(screenshot_id)
    return {"message": "Deleted successfully"}