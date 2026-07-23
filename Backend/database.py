import sqlite3
from datetime import datetime

DB_PATH = "snapmind.db"


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS screenshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image_path TEXT NOT NULL,
            extracted_text TEXT,
            title TEXT,
            summary TEXT,
            tags TEXT,
            upload_date TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()


def insert_screenshot(image_path, extracted_text, title, summary, tags):
    conn = get_connection()
    cursor = conn.cursor()
    upload_date = datetime.now().isoformat()

    cursor.execute("""
        INSERT INTO screenshots (image_path, extracted_text, title, summary, tags, upload_date)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (image_path, extracted_text, title, summary, tags, upload_date))

    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return new_id



    return [dict(row) for row in rows]


def update_screenshot(screenshot_id, title=None, summary=None, tags=None):
    existing = get_screenshot_by_id(screenshot_id)
    if not existing:
        return None

    title = title if title is not None else existing["title"]
    summary = summary if summary is not None else existing["summary"]
    tags = tags if tags is not None else existing["tags"]

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE screenshots
        SET title = ?, summary = ?, tags = ?
        WHERE id = ?
    """, (title, summary, tags, screenshot_id))
    conn.commit()
    conn.close()

    return get_screenshot_by_id(screenshot_id)
