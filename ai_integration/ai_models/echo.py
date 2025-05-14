import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(".env.local")

# Blueprint for handling insights requests and Enable CORS
echo_bp = Blueprint('echo', __name__)
CORS(echo_bp, origins=["http://localhost:5173"])

genai.configure(api_key = os.getenv("VITE_GOOGLE_GEMINI_API_KEY1"))

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

# Initial chat session with user's sample query.  This sets up the conversation context.
chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts": [
        "for all the chat I done here, just respond in such a way that the you are only listening to my text and messages (no advice, just listen). Response such as yah!, you are right, I think this is wrong, etc.",
      ],
    },
    {
      "role": "model",
      "parts": [
        "Understood. I will only acknowledge your messages without offering advice or opinions.\n",
      ],
    },
    {
      "role": "user",
      "parts": [
        "I am feeling very much burn out today",
      ],
    },
    {
      "role": "model",
      "parts": [
        "I hear you.\n",
      ],
    },
  ]
)

# API endpoint to receive user queries and get solutions
@echo_bp.route('/echo', methods=['POST'])
def get_insights():
    data = request.data.decode('utf-8')
    response = chat_session.send_message(data)
    return (response.text)