# Install Python 3.11 for Voice Cloning

## Step 1: Download Python 3.11

1. Go to https://www.python.org/downloads/release/python-3119/
2. Scroll down to "Files"
3. Download the installer for Windows:
   - **Windows 64-bit:** `Windows installer (64-bit)`
   - Click: `python-3.11.9-amd64.exe`

## Step 2: Install Python 3.11

1. Run the installer
2. **IMPORTANT:** Check "Add python.exe to PATH"
3. Click "Customize installation"
4. Check all optional features
5. Click "Next"
6. Check "Install for all users"
7. Change install location to: `C:\Python311\`
8. Click "Install"

## Step 3: Verify Installation

Open a NEW terminal (PowerShell) and run:

```bash
py -3.11 --version
```

You should see: `Python 3.11.9`

## Step 4: Install TTS Dependencies

Run these commands one by one:

```bash
py -3.11 -m pip install --upgrade pip
py -3.11 -m pip install TTS==0.22.0
py -3.11 -m pip install flask==3.0.0
py -3.11 -m pip install flask-cors==4.0.0
```

**Note:** The TTS installation will take 5-10 minutes and download ~2GB of data.

## Step 5: Prepare Your Voice Sample

1. Record yourself speaking clearly for 10-15 seconds
2. Say something like:
   > "Hello, my name is [your name]. I'm testing voice cloning for Pichi Budamkai. This is a sample of my natural speaking voice. I hope this works well for the AI assistant."

3. Save it as `voice-sample.wav` in your project folder (`G:\my works\voiceai\`)

**Tips for best quality:**
- Use a good microphone
- Speak naturally, not too fast or slow
- Record in a quiet room
- No background noise or music
- Clear pronunciation

### Converting Audio Files

If your recording is MP3 or another format, convert to WAV:

**Option A: Online converter**
- Go to https://cloudconvert.com/mp3-to-wav
- Upload and convert

**Option B: Using VLC Media Player**
1. Open VLC
2. Media → Convert/Save
3. Add your file
4. Convert/Save
5. Choose "Audio - WAV" profile
6. Save as `voice-sample.wav`

## Step 6: Create Voice Cloning Server

I've already created `tts-server-coqui.py` for you. Just make sure it's in your project folder.

## Step 7: Start the Voice Cloning Server

In your project folder, run:

```bash
py -3.11 tts-server-coqui.py
```

**First run will take 5-10 minutes** to download the AI model (~2GB).

You should see:
```
Loading TTS model... (this may take a minute on first run)
TTS model loaded successfully!
Starting server on http://localhost:5000
```

**Keep this terminal running!**

## Step 8: Enable Local TTS

In your `.env` file, change:
```
USE_LOCAL_TTS=true
```

## Step 9: Start Your Main App

Open a NEW terminal and run:

```bash
npm start
```

## Step 10: Test Your Voice!

1. Open http://localhost:3000
2. Chat with Pichi
3. Click the speaker button (🔊)
4. You should hear YOUR voice speaking!

## Troubleshooting

### "py -3.11 not found"
- Restart your terminal
- Try: `python3.11` or `python` instead
- Make sure you checked "Add to PATH" during installation

### "TTS installation failed"
- Make sure you have at least 5GB free disk space
- Check your internet connection
- Try: `py -3.11 -m pip install TTS --no-cache-dir`

### "Voice sample not found"
- Make sure the file is named exactly `voice-sample.wav`
- Place it in the same folder as `tts-server-coqui.py`
- Check the file path in the error message

### "Model download failed"
- Check internet connection
- The model is ~2GB, may take time
- Try running again, it will resume download

### Voice sounds robotic or weird
- Record a longer sample (15-20 seconds)
- Speak more naturally
- Ensure good audio quality
- Try recording in a quieter environment

### Server crashes or freezes
- Make sure you have at least 4GB RAM available
- Close other heavy applications
- Try restarting the server

## System Requirements

- Windows 10/11
- 4GB RAM minimum (8GB recommended)
- 5GB free disk space
- Good internet connection (for first-time model download)

## Notes

- First run downloads ~2GB AI model
- Voice generation takes 3-7 seconds per message
- Completely free and runs locally
- Your voice data stays on your computer
- No internet needed after model download
- You can use both Python versions (your current one and 3.11) simultaneously
