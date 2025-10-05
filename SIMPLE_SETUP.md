# Simple TTS Setup (Works with Any Python Version)

Since Coqui TTS requires Python 3.9-3.11, here's a simpler option that works with any Python version.

## Quick Setup

1. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

2. **Start the TTS server:**
   ```bash
   python tts-server.py
   ```

3. **Enable local TTS in `.env`:**
   ```
   USE_LOCAL_TTS=true
   ```

4. **Start your main app (in a NEW terminal):**
   ```bash
   npm start
   ```

5. **Test it:**
   - Open http://localhost:3000
   - Click the speaker button 🔊

## What This Does

This uses `pyttsx3` which uses your system's built-in voices (same as the browser, but processed through the server). It's not true voice cloning, but it works immediately without any complex setup.

## For TRUE Voice Cloning

If you want real voice cloning with your own voice, you need:

### Option A: Install Python 3.9-3.11

1. Download Python 3.11 from https://www.python.org/downloads/
2. Install it alongside your current Python
3. Use it specifically for this project:
   ```bash
   py -3.11 -m pip install TTS flask flask-cors
   py -3.11 tts-server-coqui.py
   ```

### Option B: Use ElevenLabs (Paid)

- $5/month USD for voice cloning
- Best quality, easiest setup
- See main README for details

### Option C: Use Browser Voices (Current - FREE)

- Click the 🔊 button in the input area
- Select from your system's voices
- Works immediately, no setup needed

## Recommendation

For now, just use the browser voices (Option C). They work well and are completely free. The current setup with `pyttsx3` doesn't add much value over the browser's built-in voices.

If you really want voice cloning, either:
- Install Python 3.11 for Coqui TTS (free but complex)
- Pay for ElevenLabs (easy but costs money)
