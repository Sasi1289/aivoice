# 🤖 Sarcastic AI Chat

An AI chat application with attitude! This app searches the internet for answers and delivers them with a healthy dose of sarcasm. Supports text, voice, images, emojis, and GIFs.

## Features

- 🌐 **Internet Search Integration** - Gets real-time information from the web
- 😏 **Sarcastic Responses** - Every answer comes with personality
- 🎤 **Voice Input** - Speak your questions
- 📷 **Image Analysis** - Upload images and get sarcastic commentary
- 😊 **Emoji & GIF Support** - Express yourself
- 🔊 **Text-to-Speech** - Listen to the AI's sarcastic replies
- 🎨 **Cool Interactive UI** - Smooth animations and modern design

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment variables:**
   - Copy `.env.example` to `.env`
   - Add your API keys:
     - `GEMINI_API_KEY` - Get from https://aistudio.google.com/app/apikey (FREE!)
     - `SERPER_API_KEY` - Get from https://serper.dev (free tier available)

3. **Run the app:**
   ```bash
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## API Keys

### PlayHT API (RECOMMENDED - Accepts Indian Payments) 🇮🇳
- Go to https://play.ht and sign up
- Get API Key and User ID from API Access
- Free tier: 12,500 words per month
- Voice cloning available
- Accepts UPI, Indian cards via Razorpay
- See `PLAYHT_SETUP.md` for detailed setup

### Alternative: ElevenLabs API
- Go to https://elevenlabs.io
- Free tier: 10,000 characters per month
- Only accepts USD payments
- See `VOICE_SETUP.md` for details

### Alternative: Browser Voices (FREE - No Setup)
- Click the 🔊 button in the input area
- Select from your system's voices
- Works immediately

### Serper API Key
- Sign up at https://serper.dev
- Free tier includes 2,500 searches
- Used for internet search functionality

## Usage

- **Text Chat**: Type your question and hit send
- **Voice Input**: Click the 🎤 button and speak
- **Image Upload**: Click the 📷 button to upload an image
- **Emojis**: Click the 😊 button to open emoji picker
- **GIFs**: Click the 🎬 button for GIF emojis
- **Read Aloud**: Click the 🔊 button below AI responses to hear them

## Tech Stack

- **Backend**: Node.js, Express
- **AI**: Hugging Face (Mistral 7B - FREE!)
- **Search**: Serper API (Google Search)
- **Frontend**: Vanilla JavaScript, CSS3
- **Voice & TTS**: Web Speech API (built into browser)

## Notes

- Voice input requires a modern browser (Chrome, Edge, Safari)
- Image analysis uses GPT-4o with vision capabilities
- The AI is programmed to be sarcastic but helpful
- Internet search enhances responses with real-time data

Enjoy chatting with the sassiest AI around! 🙄
