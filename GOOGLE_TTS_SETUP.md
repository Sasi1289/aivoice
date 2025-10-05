# Google Cloud Text-to-Speech Setup (Accepts Indian Payments)

## Why Google Cloud TTS?

- ✅ Accepts Indian credit/debit cards
- ✅ Free tier: 1 million characters per month (WaveNet voices)
- ✅ After free tier: Only ₹1,300 per 1 million characters
- ✅ High quality voices
- ✅ Indian English voices available
- ✅ Very reliable (Google infrastructure)
- ✅ Easy setup (5 minutes)

## Step 1: Create Google Cloud Account

1. Go to https://console.cloud.google.com
2. Sign in with your Google account
3. Accept terms and conditions
4. You'll get $300 free credits for 90 days!

## Step 2: Create a New Project

1. Click on the project dropdown (top left, next to "Google Cloud")
2. Click "New Project"
3. Name it: `pichi-budamkai` or anything you like
4. Click "Create"
5. Wait a few seconds for project creation

## Step 3: Enable Text-to-Speech API

1. Go to https://console.cloud.google.com/apis/library/texttospeech.googleapis.com
2. Make sure your project is selected (top left)
3. Click "Enable"
4. Wait for it to enable (takes 10-20 seconds)

## Step 4: Create API Key

1. Go to https://console.cloud.google.com/apis/credentials
2. Click "Create Credentials" (top)
3. Select "API Key"
4. Copy the API key that appears
5. Click "Restrict Key" (recommended for security)
6. Under "API restrictions":
   - Select "Restrict key"
   - Check "Cloud Text-to-Speech API"
   - Click "Save"

## Step 5: Add to Your App

Open your `.env` file and add:

```
GOOGLE_TTS_API_KEY=your_api_key_here
```

## Step 6: Test It!

1. Restart your server:
   ```bash
   npm start
   ```

2. Open http://localhost:3000
3. Chat with Pichi
4. Click the speaker button 🔊
5. You should hear an Indian English voice!

## Available Indian English Voices

You can change the voice by adding to `.env`:

```
GOOGLE_TTS_VOICE=en-IN-Wavenet-D
```

**Available voices:**

### Female Voices (Indian English)
- `en-IN-Wavenet-A` - Female, clear
- `en-IN-Wavenet-D` - Female, warm (default)
- `en-IN-Neural2-A` - Female, natural
- `en-IN-Neural2-D` - Female, expressive

### Male Voices (Indian English)
- `en-IN-Wavenet-B` - Male, deep
- `en-IN-Wavenet-C` - Male, clear
- `en-IN-Neural2-B` - Male, natural
- `en-IN-Neural2-C` - Male, friendly

### Standard Voices (Lower quality, more free quota)
- `en-IN-Standard-A` - Female
- `en-IN-Standard-B` - Male
- `en-IN-Standard-C` - Male
- `en-IN-Standard-D` - Female

## Voice Quality Comparison

| Type | Quality | Free Quota | Price After |
|------|---------|------------|-------------|
| Neural2 | Best | 1M chars/month | ₹1,300/1M |
| WaveNet | Very Good | 1M chars/month | ₹1,300/1M |
| Standard | Good | 4M chars/month | ₹330/1M |

**Recommendation:** Use WaveNet or Neural2 for best quality.

## Pricing Details

### Free Tier (Every Month)
- WaveNet/Neural2: 1 million characters
- Standard: 4 million characters
- Enough for ~50,000 AI responses!

### After Free Tier
- WaveNet/Neural2: $16 per 1M characters (~₹1,300)
- Standard: $4 per 1M characters (~₹330)

**Example:** If you use 2 million characters in a month:
- First 1M: Free
- Next 1M: ₹1,300
- Total: ₹1,300

## Payment Setup

1. Go to https://console.cloud.google.com/billing
2. Click "Add billing account"
3. Enter your details:
   - Name
   - Address (Indian address)
   - Payment method (Indian credit/debit card)
4. Complete verification

**Note:** You won't be charged until you exceed free tier!

## Monitoring Usage

1. Go to https://console.cloud.google.com/apis/api/texttospeech.googleapis.com/metrics
2. See your usage in real-time
3. Set up alerts if you want

## Troubleshooting

### "API Key not valid"
- Make sure you copied the full key
- Check no extra spaces
- Verify API is enabled
- Wait 1-2 minutes after creating key

### "Permission denied"
- Make sure Text-to-Speech API is enabled
- Check API key restrictions allow Text-to-Speech
- Verify billing is enabled (even for free tier)

### "Quota exceeded"
- You've used your free 1M characters
- Either wait for next month
- Or add billing to continue

### Voice sounds robotic
- Try Neural2 voices (best quality)
- Or WaveNet voices (very good)
- Avoid Standard voices if quality matters

## Advanced: Adjust Voice Settings

You can customize the voice by editing `server.js`:

```javascript
audioConfig: {
  audioEncoding: 'MP3',
  speakingRate: 1.1,  // 0.25 to 4.0 (1.0 is normal)
  pitch: 1.0,         // -20.0 to 20.0 (0.0 is normal)
  volumeGainDb: 0.0   // -96.0 to 16.0 (0.0 is normal)
}
```

## Security Best Practices

1. **Restrict your API key:**
   - Only allow Text-to-Speech API
   - Add IP restrictions if possible

2. **Monitor usage:**
   - Set up billing alerts
   - Check usage regularly

3. **Don't commit API key:**
   - Already in `.gitignore`
   - Never share publicly

## Support

- Documentation: https://cloud.google.com/text-to-speech/docs
- Pricing: https://cloud.google.com/text-to-speech/pricing
- Support: https://cloud.google.com/support

## Quick Start Summary

1. Go to https://console.cloud.google.com
2. Create project
3. Enable Text-to-Speech API
4. Create API key
5. Add to `.env` file
6. Restart server
7. Done! 🎉

**Free tier gives you 1 million characters per month - that's about 50,000 AI responses!**

---

## Comparison with Other Services

| Feature | Google TTS | PlayHT | ElevenLabs |
|---------|-----------|---------|------------|
| Free Tier | 1M chars | 12.5K words | 10K chars |
| Indian Payment | ✅ Yes | ✅ Yes | ❌ No |
| Voice Cloning | ❌ No | ✅ Yes | ✅ Yes |
| Quality | Very Good | Excellent | Excellent |
| Price/Month | ₹1,300 | ₹2,600 | ₹4,000 |
| Setup Time | 5 min | 10 min | 5 min |

**Google TTS is perfect if:**
- You want high quality without voice cloning
- You prefer pay-as-you-go pricing
- You want the most generous free tier
- You need reliable service

That's it! Enjoy realistic text-to-speech with Indian payment support! 🥑🎤
