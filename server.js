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

    // Handle different input types
    let isSpecialInput = false;
    if (type === 'voice') {
      userMessage = `[Voice message]: ${message}`;
    } else if (type === 'emoji') {
      userMessage = `User sent you this emoji: ${message}. Respond ONLY with emojis (3-8 emojis) that react to or relate to this emoji. No text, just emojis.`;
      isSpecialInput = true;
    } else if (type === 'gif') {
      userMessage = `${message}. Respond with a GIF description in this EXACT format: [GIF: description] where description is 1-3 words describing the perfect reaction GIF. Then add a short sarcastic comment.`;
      isSpecialInput = true;
    }

    // Search internet if needed
    if (message && message.length > 10) {
      searchResults = await searchInternet(message);
    }

    let systemPrompt = `You are a helpful AI assistant with a sarcastic personality. Follow this format STRICTLY:

1. First, provide a direct, accurate answer to the user's question
2. Then add a sarcastic comment or witty remark
3. End with a section titled "💭 My Opinion:" where you share your sarcastic take on the topic

Keep responses concise. Use emojis occasionally. When given internet search results, use them to provide accurate information.

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

// Text-to-speech endpoint using ElevenLabs
app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    
    // If no API key, fall back to browser TTS
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
    
    // ElevenLabs API - Rachel voice (energetic, conversational)
    const response = await axios.post(
      'https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM',
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
  console.log(`🥑 Pichi Budamkai running on http://localhost:${PORT}`);
});
