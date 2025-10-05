# Setup Voice Cloning (Free with Coqui TTS)

## Step 1: Install Python
Make sure you have Python 3.9 or higher installed.
Check with: `python --version`

## Step 2: Install Dependencies

Open a terminal in your project folder and run:

```bash
pip install -r requirements.txt
```

This will install:
- TTS (Coqui TTS for voice cloning)
- Flask (for the TTS server)
- Flask-CORS (for cross-origin requests)

**Note:** First installation may take 5-10 minutes as it downloads the AI model.

## Step 3: Prepare Your Voice Sample

1. Record yourself speaking for 5-10 seconds
2. Speak clearly in English
3. Use a good microphone if possible
4. Save it as `voice-sample.wav` in the project root folder

**Tips for best results:**
- Speak naturally, not too fast or slow
- Avoid background noise
- Use a consistent tone
- Record in a quiet room

## Step 4: Start the Voice Cloning Server

In a NEW terminal window, run:

```bash
python tts-server.py
```

You should see:
```
Pichi Budamkai - Voice Cloning Server
Starting server on http://localhost:5000
```

**Keep this terminal running!**

## Step 5: Update Your Main App

In your `.env` file, add:

```
USE_LOCAL_TTS=true
```

## Step 6: Start Your Main App

In ANOTHER terminal window, run:

```bash
npm start
```

## Step 7: Test It!

1. Open http://localhost:3000
2. Chat with Pichi
3. Click the speaker button (🔊)
4. You should hear responses in YOUR voice!

## Troubleshooting

**Error: "TTS library not found"**
- Run: `pip install TTS`

**Error: "Voice sample not found"**
- Make sure `voice-sample.wav` is in the project root folder
- Check the filename is exactly `voice-sample.wav`

**Error: "Model download failed"**
- Check your internet connection
- The model is ~2GB, may take time to download

**Voice sounds robotic:**
- Record a longer sample (10-15 seconds)
- Speak more naturally in the recording
- Ensure good audio quality

**Server won't start:**
- Make sure port 5000 is not in use
- Try: `python tts-server.py` instead of `python3`

## Converting Your Voice File to WAV

If your voice file is MP3 or another format, convert it to WAV:

**Using online converter:**
- Go to https://cloudconvert.com/mp3-to-wav
- Upload your file and convert

**Using ffmpeg (if installed):**
```bash
ffmpeg -i your-voice.mp3 voice-sample.wav
```

## System Requirements

- Python 3.9+
- 4GB RAM minimum
- 3GB free disk space (for model)
- Windows/Mac/Linux

## Notes

- First run will download the AI model (~2GB)
- Voice generation takes 2-5 seconds per message
- Completely free and runs locally
- No internet needed after model download
- Your voice data stays on your computer
