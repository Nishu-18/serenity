import google.generativeai as genai
from flask import Blueprint, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

# Load environment variables from .env.local
load_dotenv(".env.local")

# Blueprint for handling insights requests and Enable CORS
sage_bp = Blueprint('sage', __name__)
CORS(sage_bp, origins=["http://localhost:5173"])

genai.configure(api_key = os.getenv("VITE_GOOGLE_GEMINI_API_KEY2"))

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
        "for all the chat I done here, just respond in such a way that the you are providing guidance and resilience to my text and messages. What you have to do is to advice me and give me guidance.",
      ],
    },
    {
      "role": "model",
      "parts": [
        "Understood. I will focus on responding to your messages with guidance and an emphasis on resilience. I will offer advice where appropriate and aim to help you navigate challenges, build strength, and maintain a positive perspective. Please feel free to share whatever is on your mind, and I'll do my best to support you in a helpful and empowering way. Let's work together to foster your growth and well-being.\n",
      ],
    },
    {
      "role": "user",
      "parts": [
        "I think i am exhausted (Try to concisely respond with maximum 150 tokens and in a single paragraph and also the key of the response value is named as response.)",
      ],
    },
    {
      "role": "model",
      "parts": [
        "It's understandable to feel exhausted. Acknowledge your feelings - pushing through when depleted can be counterproductive. Consider what might be contributing to this exhaustion: overwork, lack of sleep, stress? Prioritize self-care, even in small ways: a short walk, a healthy meal, or mindful breathing. Focus on regaining your energy and resilience by addressing the root cause and incorporating restorative practices. Remember, rest is productive.\n",
      ],
    },
  ]
)

# API endpoint to receive user requests and get itinerary
@sage_bp.route('/sage', methods=['POST'])
def get_insights():
    data = request.data.decode('utf-8')
    response = chat_session.send_message(data)
    return (response.text)