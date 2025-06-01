import google.generativeai as genai
from portiq.settings import env

genai.configure(api_key=env("VERTEX_AI_API_KEY"))
model = genai.GenerativeModel(model_name="gemini-1.5-flash")

def generate_text(prompt: str) -> str:
    response = model.generate_content(contents=prompt)
    return response.text