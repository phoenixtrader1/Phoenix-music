import os
import requests
import base64
from flask import jsonify, request

HF_API_KEY = os.environ.get("HF_API_KEY")
MODEL_URL = "https://api-inference.huggingface.co/models/facebook/musicgen-small"

def handler(request):
    try:
        data = request.get_json()
        prompt = data.get("prompt")
        if not prompt:
            return jsonify({"error": "Prompt required"}), 400

        headers = {"Authorization": f"Bearer {HF_API_KEY}"}
        response = requests.post(MODEL_URL, headers=headers, json={"inputs": prompt})
        if response.status_code != 200:
            return jsonify({"error": "AI generation failed"}), 500

        audio_bytes = response.content
        audio_base64 = base64.b64encode(audio_bytes).decode("utf-8")

        return jsonify({"audio_base64": audio_base64})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
