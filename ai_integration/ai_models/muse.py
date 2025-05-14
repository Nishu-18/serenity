import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(".env.local")

# Blueprint for handling insights requests and Enable CORS
muse_bp = Blueprint('muse', __name__)
CORS(muse_bp, origins=["http://localhost:5173"])

genai.configure(api_key = os.getenv("VITE_GOOGLE_GEMINI_API_KEY3"))

# Configuration for the Gemini model
generation_config = {
  "temperature": 1,
  "top_p": 0.95,
  "top_k": 40,
  "max_output_tokens": 8192,
  "response_mime_type": "application/json",
}

# Initialize the Gemini model
model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

# Initial chat session with a prompt for Dubai travel information.  This sets up the conversation context.
chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "hi",
      ],
    },
    {
      "role": "model",
      "parts": [
        "Hi there! How can I help you today?\n",
      ],
    },
  ]
)

# API endpoint to receive user requests and get insights
@muse_bp.route('/muse', methods=['POST'])
def get_insights():
    data = request.data.decode('utf-8')
    response = chat_session.send_message(data)
    return (response.text)