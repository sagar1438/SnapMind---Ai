import easyocr

reader = easyocr.Reader(['en'], gpu=False)


def extract_text_from_image(image_path):
    try:
        results = reader.readtext(image_path, detail=0)
        return "\n".join(results)
    except Exception as e:
        print(f"OCR failed for {image_path}: {e}")
        return ""