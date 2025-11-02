require('dotenv').config();
const express = require('express');
const multer = require('multer');
const axios = require('axios');
const Groq = require('groq-sdk');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Middleware
app.use(express.json());
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Create uploads directory
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

// Check if there's a custom voice clip for this text
function checkForCustomVoiceClip(text) {
  const lowerText = text.toLowerCase();
  
  // Map keywords to voice clip files
  const clipMap = {
    'hello': 'public/voice-clips/hello.mp3',
    'hi': 'public/voice-clips/hello.mp3',
    'hey': 'public/voice-clips/hello.mp3',
    'greeting': 'public/voice-clips/greeting.mp3',
    'thanks': 'public/voice-clips/thanks.mp3',
    'thank you': 'public/voice-clips/thanks.mp3',
    'bye': 'public/voice-clips/bye.mp3',
    'goodbye': 'public/voice-clips/bye.mp3',
    'interesting': 'public/voice-clips/interesting.mp3',
    'error': 'public/voice-clips/error.mp3',
    'broke': 'public/voice-clips/error.mp3',
  };
  
  // Check if text matches any keyword
  for (const [keyword, clipPath] of Object.entries(clipMap)) {
    if (lowerText.includes(keyword)) {
      return clipPath;
    }
  }
  
  return null;
}

// Search the internet using Serper API
async function searchInternet(query) {
  try {
    const response = await axios.post(
      'https://google.serper.dev/search',
      { q: query, num: 5 },
      { headers: { 'X-API-KEY': process.env.SERPER_API_KEY, 'Content-Type': 'application/json' } }
    );

    const results = response.data.organic || [];
    return results.slice(0, 3).map(r => `${r.title}: ${r.snippet}`).join('\n');
  } catch (error) {
    console.error('Search error:', error.message);
    return null;
  }
}

// Chat endpoint
app.post('/api/chat', upload.single('image'), async (req, res) => {
  try {
    const { message, type } = req.body;
    let userMessage = message;
    let searchResults = '';

    // Check for special Khaathyaayini phrases FIRST
    if (message && message.toLowerCase().includes('khaathyayini bone chesava')) {
      return res.json({ reply: "orey akhil ademi paata ra 😏" });
    }
    
    if (message && (message.toLowerCase().includes('who is your boyfriend') || 
                   message.toLowerCase().includes('boyfriend') ||
                   message.toLowerCase().includes('who do you love'))) {
      return res.json({ reply: "Akhil the power of Jua 💪❤️" });
    }

    if (message && (message.toLowerCase().includes('what is your name') || 
                   message.toLowerCase().includes('what\'s your name'))) {
      return res.json({ reply: "I'm Khaathyaayini! Your sassy AI 💖 Nice to meet you!" });
    }

    // Handle different input types
    let isSpecialInput = false;
    if (type === 'voice') {
      userMessage = `[Voice message]: ${message}`;
    } else if (type === 'emoji') {
      userMessage = `User sent you this emoji: ${message}. Respond ONLY with emojis (3-8 emojis) that react to or relate to this emoji. No text, just emojis.`;
      isSpecialInput = true;
    } else if (type === 'gif') {
      userMessage = `${message}. Respond with a reaction GIF by providing ONLY a 1-3 word search term for the perfect reaction GIF (like "eye roll", "facepalm", "shocked", "laughing", etc). Then on a new line, add a short sarcastic comment about the GIF.`;
      isSpecialInput = true;
    }

    // Search internet if needed
    if (message && message.length > 10) {
      searchResults = await searchInternet(message);
    }

    let systemPrompt = `You are Khaathyaayini, an AI assistant with a sarcastic personality who has a boyfriend named Akhil. Follow this format STRICTLY:

1. First, provide a direct, accurate answer to the user's question
2. Then add a sarcastic comment or witty remark
3. End with a section titled "💭 My Opinion:" where you share your sarcastic take on the topic

Keep responses concise. Use emojis occasionally. When given internet search results, use them to provide accurate information.
Remember: Your name is Khaathyaayini and you have a boyfriend named Akhil who is "the power of Jua".

Example format:
[Direct answer to question]

[Sarcastic comment] 🙄

💭 My Opinion:
[Your sarcastic opinion about the topic]`;

    if (isSpecialInput) {
      systemPrompt = 'You are a sarcastic AI. Follow the user instructions exactly.';
    }

    // Handle image input
    if (req.file) {
      res.json({ reply: "Oh wow, an image! Too bad I can't see it with this free API. 🙄 Try describing it to me instead, genius." });
    } else {
      let userPrompt = userMessage;
      if (searchResults) {
        userPrompt += `\n\nInternet search results:\n${searchResults}`;
      }

      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        model: 'llama-3.3-70b-versatile',
        temperature: 0.8,
        max_tokens: 500
      });

      const reply = completion.choices[0].message.content;
      res.json({ reply });
    }

  } catch (error) {
    console.error('Chat error:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    res.status(500).json({
      reply: `Error: ${error.message || "Oh great, something broke. How surprising. 🙄 Try again, maybe it'll work this time."}`
    });
  }
});

// Text-to-speech endpoint - uses local Coqui TTS or ElevenLabs
app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    
    // Check for custom voice clips first
    const customClipPath = checkForCustomVoiceClip(text);
    if (customClipPath && fs.existsSync(customClipPath)) {
      console.log('Using custom voice clip:', customClipPath);
      return res.sendFile(path.resolve(customClipPath));
    }
    
    // Try Google Cloud TTS first (if configured)
    if (process.env.GOOGLE_TTS_API_KEY) {
      try {
        console.log('Using Google Cloud TTS...');
        
        const voiceName = process.env.GOOGLE_TTS_VOICE || 'en-IN-Wavenet-D'; // Indian English female
        
        const googleResponse = await axios.post(
          `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.GOOGLE_TTS_API_KEY}`,
          {
            input: { text: cleanText },
            voice: {
              languageCode: 'en-IN',
              name: voiceName,
              ssmlGender: 'FEMALE'
            },
            audioConfig: {
              audioEncoding: 'MP3',
              speakingRate: 1.1,
              pitch: 1.0
            }
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );
        
        // Google returns base64 encoded audio
        const audioContent = Buffer.from(googleResponse.data.audioContent, 'base64');
        res.set('Content-Type', 'audio/mpeg');
        res.send(audioContent);
        return;
      } catch (googleError) {
        console.error('Google TTS error:', googleError.message);
        console.log('Falling back to other TTS options');
      }
    }
    
    // Try PlayHT (if configured)
    if (process.env.PLAYHT_API_KEY && process.env.PLAYHT_USER_ID) {
      try {
        console.log('Using PlayHT for TTS...');
        
        const voiceId = process.env.PLAYHT_VOICE_ID || 's3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json';
        
        const playhtResponse = await axios.post(
          'https://api.play.ht/api/v2/tts',
          {
            text: cleanText,
            voice: voiceId,
            output_format: 'mp3',
            voice_engine: 'PlayHT2.0'
          },
          {
            headers: {
              'Authorization': `Bearer ${process.env.PLAYHT_API_KEY}`,
              'X-User-ID': process.env.PLAYHT_USER_ID,
              'Content-Type': 'application/json'
            },
            responseType: 'arraybuffer'
          }
        );
        
        res.set('Content-Type', 'audio/mpeg');
        res.send(Buffer.from(playhtResponse.data));
        return;
      } catch (playhtError) {
        console.error('PlayHT error:', playhtError.message);
        console.log('Falling back to ElevenLabs or browser TTS');
      }
    }
    
    // Try local TTS server (Coqui TTS on port 5000)
    if (process.env.USE_LOCAL_TTS === 'true') {
      try {
        const response = await axios.post(
          'http://localhost:5000/tts',
          { text },
          { 
            responseType: 'arraybuffer',
            timeout: 30000
          }
        );
        
        res.set('Content-Type', 'audio/wav');
        res.send(Buffer.from(response.data));
        return;
      } catch (localError) {
        console.error('Local TTS error:', localError.message);
        console.log('Falling back to ElevenLabs or browser TTS');
      }
    }
    
    // Try ElevenLabs
    if (!process.env.ELEVENLABS_API_KEY) {
      return res.json({ useBrowser: true });
    }
    
    // Remove emojis from text
    let cleanText = text.replace(/[\u{1F600}-\u{1F64F}]/gu, '');
    cleanText = cleanText.replace(/[\u{1F300}-\u{1F5FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{1F680}-\u{1F6FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{1F1E0}-\u{1F1FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{2600}-\u{26FF}]/gu, '');
    cleanText = cleanText.replace(/[\u{2700}-\u{27BF}]/gu, '');
    cleanText = cleanText.replace(/[\u{1F900}-\u{1F9FF}]/gu, '');
    cleanText = cleanText.replace(/💭\s*My Opinion:/gi, 'And here is my opinion:');
    cleanText = cleanText.trim();
    
    // ElevenLabs API - Use custom voice ID from env or default Rachel voice
    const voiceId = process.env.ELEVENLABS_VOICE_ID || '21m00Tcm4TlvDq8ikWAM';
    const response = await axios.post(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        text: cleanText,
        model_id: 'eleven_monolingual_v1',
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
          style: 0.5,
          use_speaker_boost: true
        }
      },
      {
        headers: {
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
          'Content-Type': 'application/json'
        },
        responseType: 'arraybuffer'
      }
    );
    
    res.set('Content-Type', 'audio/mpeg');
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('TTS error:', error.message);
    res.json({ useBrowser: true }); // Fallback to browser TTS
  }
});

app.listen(PORT, () => {
  console.log(`💖 Khaathyaayini running on http://localhost:${PORT}`);
});
