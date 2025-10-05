from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import pyttsx3
import os
import re
import tempfile

app = Flask(__name__)
CORS(app)

# Initialize pyttsx3 engine
engine = pyttsx3.init()

# Configure voice settings for more natural speech
voices = engine.getProperty('voices')
engine.setProperty('rate', 175)  # Speed (default is 200)
engine.setProperty('volume', 1.0)  # Volume (0.0 to 1.0)

# Try to find a female voice
for voice in voices:
    if 'female' in voice.name.lower() or 'zira' in voice.name.lower():
        engine.setProperty('voice', voice.id)
        break

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "tts_available": True})

@app.route('/tts', methods=['POST'])
def text_to_speech():
    try:
        data = request.json
        text = data.get('text', '')
        
        # Remove emojis and clean text
        text = re.sub(r'[^\w\s.,!?\'-]', '', text)
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        # Create temporary file
        output_file = os.path.join(tempfile.gettempdir(), 'pichi_output.wav')
        
        # Generate speech
        print(f"Generating speech: {text[:50]}...")
        engine.save_to_file(text, output_file)
        engine.runAndWait()
        
        return send_file(output_file, mimetype="audio/wav")
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/voices', methods=['GET'])
def list_voices():
    """List available voices"""
    voices = engine.getProperty('voices')
    voice_list = [{"id": v.id, "name": v.name, "languages": v.languages} for v in voices]
    return jsonify({"voices": voice_list})

@app.route('/set-voice', methods=['POST'])
def set_voice():
    """Change the voice"""
    data = request.json
    voice_id = data.get('voice_id')
    
    try:
        engine.setProperty('voice', voice_id)
        return jsonify({"success": True, "message": "Voice changed"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 400

if __name__ == '__main__':
    print("=" * 50)
    print("Pichi Budamkai - TTS Server (pyttsx3)")
    print("=" * 50)
    print("\nStarting server on http://localhost:5000")
    print("\nAvailable voices:")
    for i, voice in enumerate(voices):
        print(f"  {i+1}. {voice.name}")
    print("\nNote: This uses your system's built-in voices.")
    print("For voice cloning, you need Python 3.9-3.11 and Coqui TTS.\n")
    app.run(host='0.0.0.0', port=5000, debug=False)
