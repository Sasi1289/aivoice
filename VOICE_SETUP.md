# Using Your Own Voice (Free Alternative)

Since ElevenLabs requires USD payment, here are free alternatives to use your own voice:

## Option 1: Use Browser's Voice Selection (Current - FREE)
The app already uses your browser's built-in voices. You can select different voices by clicking the 🔊 button in the input area.

## Option 2: Free Voice Cloning with Coqui TTS (Advanced)

### Setup:
1. Install Python (if not already installed)
2. Install Coqui TTS:
   ```bash
   pip install TTS
   ```

3. Create a new file `tts-server.py`:
   ```python
   from TTS.api import TTS
   from flask import Flask, request, send_file
   import os
   
   app = Flask(__name__)
   tts = TTS(model_name="tts_models/multilingual/multi-dataset/your_tts")
   
   @app.route('/tts', methods=['POST'])
   def text_to_speech():
       text = request.json['text']
       # Clone voice from your sample
       tts.tts_to_file(
           text=text,
           speaker_wav="voice-sample.wav",  # Your voice file
           file_path="output.wav"
       )
       return send_file("output.wav", mimetype="audio/wav")
   
   if __name__ == '__main__':
       app.run(port=5000)
   ```

4. Place your voice file as `voice-sample.wav` (needs 5-10 seconds of clear speech)

5. Run the TTS server:
   ```bash
   python tts-server.py
   ```

6. Update `server.js` to use local TTS server (port 5000)

## Option 3: Use Free ElevenLabs Voices (No Cloning)

You can use ElevenLabs' pre-made voices for free without cloning:

Popular Voice IDs:
- Rachel (energetic): `21m00Tcm4TlvDq8ikWAM`
- Domi (confident): `AZnzlk1XvdvUeBnXmlld`
- Bella (soft): `EXAVITQu4vr4xnSDxMaL`
- Antoni (calm): `ErXwobaYiN019PkySvjV`

Add to `.env`:
```
ELEVENLABS_VOICE_ID=21m00Tcm4TlvDq8ikWAM
```

## Option 4: Record Custom Responses (Simple)

For a truly custom experience without any API:
1. Record yourself saying common phrases
2. Save them as MP3 files in `public/voice-clips/`
3. Play the appropriate clip based on the response type

This is the simplest but most limited option.

## Recommendation

For now, stick with **Option 1** (browser voices) - it's free, works immediately, and you can select from many voices. The quality is decent and requires no setup or payment.

If you want better quality later, try **Option 2** (Coqui TTS) which is completely free and runs locally on your computer.
