# Murf.ai Setup (Indian Company - Voice Cloning)

## Why Murf.ai?

- ✅ Indian company (based in Bangalore)
- ✅ Accepts Indian payments (UPI, cards, net banking)
- ✅ Voice cloning available
- ✅ Easy setup (10 minutes)
- ✅ Good quality
- ✅ Hindi and Indian English support
- ✅ Reasonable pricing (₹2,200/month)

## Pricing

### Free Plan
- 10 minutes of voice generation
- Access to 120+ voices
- Good for testing

### Basic Plan - ₹1,600/month
- 24 hours of voice generation per year
- All AI voices
- Commercial use
- No voice cloning

### Pro Plan - ₹2,200/month
- 48 hours of voice generation per year
- Voice cloning included (up to 3 custom voices)
- Priority support
- Commercial use

### Enterprise Plan - Custom pricing
- Unlimited voice generation
- Unlimited custom voices
- Dedicated support

## Step 1: Create Account

1. Go to https://murf.ai
2. Click "Sign Up" (top right)
3. Sign up with Google or Email
4. Verify your email

## Step 2: Test with Free Plan

1. After login, go to "Studio"
2. Try generating some text
3. Test different voices
4. See if you like the quality

## Step 3: Clone Your Voice (Requires Pro Plan)

### A. Upgrade to Pro Plan

1. Click on your profile (top right)
2. Go to "Billing" or "Upgrade"
3. Select "Pro Plan" (₹2,200/month)
4. Choose payment method:
   - UPI
   - Credit/Debit Card
   - Net Banking
5. Complete payment

### B. Record Your Voice Sample

Record yourself speaking for 2-5 minutes. Read this script:

```
Hello, my name is [your name]. I'm creating a custom voice for my AI assistant, Pichi Budamkai.
This assistant has a sarcastic personality and helps answer questions with a bit of attitude.

I'm recording this sample to capture my natural speaking voice. I'll try to include different emotions and tones.
Sometimes I speak with excitement and energy! Other times, I'm more calm and measured.
I might even sound a bit sarcastic or playful. The goal is to capture the full range of my voice.

Let me read some sample sentences:
- How are you doing today?
- That's absolutely fascinating, tell me more.
- Oh great, another question. How delightful.
- I'm here to help, whether you like it or not.
- This is actually quite interesting, I must admit.

Now let me count from one to ten: one, two, three, four, five, six, seven, eight, nine, ten.

And here are some common phrases:
- Thank you very much
- You're welcome
- I understand
- Let me think about that
- That's a good question

This should give a good sample of my voice for cloning purposes.
```

**Recording tips:**
- Use a good microphone
- Quiet room, no background noise
- Speak naturally
- Include emotional variety
- 2-5 minutes minimum
- Clear pronunciation

### C. Upload Voice Sample

1. In Murf.ai, go to "Voice Cloning" or "Custom Voices"
2. Click "Create Custom Voice"
3. Upload your recording
4. Give it a name (e.g., "My Voice")
5. Wait 10-30 minutes for processing
6. You'll get an email when it's ready

### D. Get API Access

**Note:** Murf.ai's API is not publicly available yet. You need to:

1. Contact their sales team: sales@murf.ai
2. Request API access
3. They'll provide:
   - API Key
   - API documentation
   - Custom voice ID

**Alternative:** Use Murf.ai's web interface to generate audio files, then use them in your app.

## Option: Manual Workflow (No API)

Since Murf.ai API requires enterprise contact, here's a workaround:

1. Generate responses in Murf.ai Studio
2. Download as MP3
3. Place in `public/voice-clips/` folder
4. Play them in your app

This works for pre-recorded responses but not dynamic ones.

## Better Alternative: Use Google TTS + Murf for Special Cases

**Recommended approach:**
1. Use Google Cloud TTS for regular responses (free, easy)
2. Use Murf.ai to create special voice clips:
   - Greeting message
   - Common responses
   - Error messages
3. Mix both in your app

## API Integration (If You Get Access)

If Murf.ai gives you API access, add to `.env`:

```
MURF_API_KEY=your_api_key_here
MURF_VOICE_ID=your_custom_voice_id
```

And I can integrate it into the server code.

## Comparison: Voice Cloning Options

| Service | Indian Payment | Price/Month | API Available | Setup Time |
|---------|---------------|-------------|---------------|------------|
| Murf.ai | ✅ Yes | ₹2,200 | ❌ Enterprise only | 10 min |
| PlayHT | ✅ Yes | ₹2,600 | ✅ Yes | 5 min |
| ElevenLabs | ❌ No | ₹4,000 | ✅ Yes | 5 min |
| Azure | ✅ Yes | ₹50,000+ | ✅ Yes | Complex |
| Coqui TTS | ✅ Free | Free | ✅ Local | 1 hour |

## My Honest Recommendation

Since Murf.ai doesn't have public API access, I recommend:

### Option A: PlayHT (Try Again)
- Has public API
- Accepts Indian payments via Razorpay
- Voice cloning available
- ₹2,600/month
- Try creating account again: https://play.ht

### Option B: Google TTS (Current)
- No voice cloning
- But free and easy
- Good quality Indian voices
- Use this for now

### Option C: Coqui TTS (Free)
- Install Python 3.11
- Free voice cloning
- Runs locally
- See `INSTALL_PYTHON_311.md`

## Support

- Murf.ai Support: support@murf.ai
- Sales (for API): sales@murf.ai
- Help Center: https://help.murf.ai

---

**Bottom Line:** Murf.ai is great but doesn't have public API. For voice cloning with Indian payments AND API access, PlayHT is your best bet. Want me to help you try PlayHT again?
