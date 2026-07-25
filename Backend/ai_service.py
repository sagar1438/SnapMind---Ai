import os
import json
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")


def generate_metadata(extracted_text):
    if not extracted_text.strip():
        return {"title": "Untitled", "summary": "", "tags": ""}

    prompt = f"""
Given the following text extracted from a screenshot, respond with ONLY valid JSON
in this exact format, no extra text:
{{"title": "short descriptive title", "summary": "2-3 sentence summary", "tags": "comma,separated,tags"}}

Text:
{extracted_text}
"""

