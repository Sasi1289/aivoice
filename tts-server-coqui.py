"""
Pichi Budamkai - Voice Cloning Server using Coqui TTS
Requires Python 3.9-3.11
"""

from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
import os
import re
import sys

app = Flask(__name__)
CORS(app)

# Check Python version
if sys.version_info < (3, 9) or sys.version_info >= (3, 12):
    print("=" * 60)
    print("ERROR: This script requires Python 3.9, 3.10, or 3.11")
    print(f"You are using Python {sys.version_info.major}.{sys.version_info.minor}")
    print("=" * 60)
    sys.exit(1)

# Check if TTS is installed
try:
    from TTS.api import TTS
    tts = None
    
    def init_tts():
        global tts
        if tts is None:
            print("\n" + "=" * 60)
            print("Loading TTS model...")
            print("This will download ~2GB on first run (5-10 minutes)")
            print("=" * 60 + "\n")
            
            try:
                # Using XTTS v2 for voice cloning
                tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2")
                print("\n✓ TTS model loaded successfully!\n")
            except Exception as e:
                print(f"\n✗ Error loading TTS model: {e}\n")
                raise
        return tts
    
except ImportError:
    print("=" * 60)
    print("ERROR: TTS library not found!")
    print("=" * 60)
    print("\nPlease install it with:")
    print("  py -3.11 -m pip install TTS\n")
    print("Or install all dependencies:")
    print("  py -3.11 -m pip install -r requirements.txt\n")
    sys.exit(1)

@app.route('/health', methods=['GET'])
def health():
    return jsonify({
        "status": "ok",
        "tts_available": tts is not None,
        "python_version": f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
    })

@app.route('/tts', methods=['POST'])
def text_to_speech():
    try:
        # Initialize TTS if not already done
        if tts is None:
            init_tts()
        
        data = request.json
        text = data.get('text', '')
        
        # Clean text - remove emojis and special characters
        text = re.sub(r'[\u{1F600}-\u{1F64F}]', '', text, flags=re.UNICODE)
        text = re.sub(r'[\u{1F300}-\u{1F5FF}]', '', text, flags=re.UNICODE)
        text = re.sub(r'[\u{1F680}-\u{1F6FF}]', '', text, flags=re.UNICODE)
        text = re.sub(r'[\u{1F1E0}-\u{1F1FF}]', '', text, flags=re.UNICODE)
        text = re.sub(r'[\u{2600}-\u{26FF}]', '', text, flags=re.UNICODE)
        text = re.sub(r'[\u{2700}-\u{27BF}]', '', text, flags=re.UNICODE)
        text = re.sub(r'[\u{1F900}-\u{1F9FF}]', '', text, flags=re.UNICODE)
        text = text.replace('💭 My Opinion:', 'And here is my opinion:')
        text = text.strip()
        
        if not text:
            return jsonify({"error": "No text provided"}), 400
        
        # Check if voice sample exists
        voice_sample = "voice-sample.wav"
        if not os.path.exists(voice_sample):
            return jsonify({
                "error": "Voice sample not found",
                "message": f"Please add your voice file as '{voice_sample}' (10-15 seconds of clear speech)",
                "current_dir": os.getcwd()
            }), 404
        
        output_file = "output.wav"
        
        # Generate speech with voice cloning
        print(f"\n🎤 Generating speech: {text[:60]}...")
        
        tts.tts_to_file(
            text=text,
            speaker_wav=voice_sample,
            language="en",
            file_path=output_file
        )
        
        print("✓ Speech generated successfully!\n")
        
        return send_file(output_file, mimetype="audio/wav")
    
    except Exception as e:
        print(f"\n✗ Error: {str(e)}\n")
        import traceback
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    print("\n" + "=" * 60)
    print("🥑 Pichi Budamkai - Voice Cloning Server")
    print("=" * 60)
    print(f"\nPython Version: {sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}")
    print("TTS Engine: Coqui XTTS v2")
    print("\nStarting server on http://localhost:5000")
    print("\n" + "=" * 60)
    print("IMPORTANT: Place your voice file as 'voice-sample.wav'")
    print("(10-15 seconds of clear speech in English)")
    print("=" * 60 + "\n")
    
    # Check if voice sample exists
    if os.path.exists("voice-sample.wav"):
        print("✓ Voice sample found: voice-sample.wav\n")
    else:
        print("⚠ WARNING: voice-sample.wav not found!")
        print("  Please add your voice recording before testing.\n")
    
    app.run(host='0.0.0.0', port=5000, debug=False)
