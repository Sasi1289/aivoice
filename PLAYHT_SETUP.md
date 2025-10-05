# PlayHT Setup Guide (Accepts Indian Payments)

## Step 1: Create PlayHT Account

1. Go to https://play.ht
2. Click "Sign Up" (top right)
3. Sign up with Google or Email
4. Verify your email

## Step 2: Get API Credentials

1. After login, click on your profile (top right)
2. Go to "API Access" or visit: https://play.ht/studio/api-access
3. You'll see:
   - **Secret Key** (API Key)
   - **User ID**
4. Copy both and save them

## Step 3: Add to Your App

Open your `.env` file and add:

```
PLAYHT_API_KEY=your_secret_key_here
PLAYHT_USER_ID=your_user_id_here
```

## Step 4: Test with Default Voice (Free)

1. Restart your server: `npm start`
2. Open http://localhost:3000
3. Chat with Pichi
4. Click the speaker button 🔊
5. You should hear a default female voice

**Free tier includes 12,500 words per month!**

## Step 5: Clone Your Voice (Optional)

### A. Record Your Voice Sample

1. Record yourself speaking for 1-2 minutes
2. Speak naturally and clearly
3. Include different emotions and tones
4. Save as MP3 or WAV

**Sample script to read:**
```
Hello, my name is [your name]. I'm creating a voice clone for my AI assistant, Pichi Budamkai. 
This assistant has a sarcastic personality and helps answer questions with attitude. 
I'm recording this sample to capture my natural speaking voice, including different tones and emotions.
Sometimes I speak with excitement! Other times, I'm more calm and serious.
I might even sound a bit sarcastic or playful. The goal is to capture the full range of my voice.
This will help create a realistic voice clone that sounds just like me.
```

### B. Upload to PlayHT

1. Go to https://play.ht/studio/voice-cloning
2. Click "Create Voice Clone" or "Instant Voice Clone"
3. Upload your voice file
4. Give it a name (e.g., "My Voice")
5. Wait 5-10 minutes for processing

### C. Get Voice ID

1. After processing, click on your cloned voice
2. Copy the **Voice ID** (looks like: `s3://voice-cloning-zero-shot/...`)
3. Add to `.env`:
   ```
   PLAYHT_VOICE_ID=your_voice_id_here
   ```

### D. Test Your Voice

1. Restart server: `npm start`
2. Chat and click speaker button 🔊
3. You should hear YOUR voice!

## Pricing

### Free Tier
- 12,500 words per month
- Access to all voices
- Good for testing

### Creator Plan - ₹2,600/month (~$31)
- 500,000 words per month
- Voice cloning included
- Commercial use allowed
- Priority support

### Pro Plan - ₹6,600/month (~$79)
- 2 million words per month
- Everything in Creator
- Advanced features

## Payment Methods

PlayHT accepts:
- ✅ Credit/Debit Cards (Indian)
- ✅ UPI (via Razorpay)
- ✅ Net Banking
- ✅ International Cards

To upgrade:
1. Go to https://play.ht/studio/billing
2. Choose a plan
3. Click "Upgrade"
4. Select payment method
5. Complete payment via Razorpay

## Voice Quality Tips

For best voice cloning results:
- Record in a quiet room
- Use a good microphone
- Speak naturally, not monotone
- Include emotional variety
- 1-2 minutes of audio minimum
- Clear pronunciation
- No background noise

## Troubleshooting

### "Invalid API Key"
- Check you copied the full key
- Make sure no extra spaces
- Verify User ID is also correct

### "Voice not found"
- Make sure voice cloning is complete
- Check Voice ID is correct
- Try using default voice first

### "Quota exceeded"
- You've used your free 12,500 words
- Upgrade to Creator plan
- Or wait for next month's reset

### Voice sounds different
- Record a longer sample (2-3 minutes)
- Include more emotional variety
- Ensure good audio quality
- Try re-recording in better conditions

## API Documentation

Full API docs: https://docs.play.ht/reference/api-getting-started

## Support

- Email: support@play.ht
- Discord: https://discord.gg/playht
- Help Center: https://help.play.ht

## Notes

- Free tier resets monthly
- Voice cloning available on all plans
- No credit card required for free tier
- Can cancel anytime
- Indian payment support via Razorpay
- Very fast generation (1-2 seconds)

---

## Quick Start Summary

1. Sign up at https://play.ht
2. Get API Key and User ID from API Access
3. Add to `.env` file
4. Restart server
5. Test with default voice (free!)
6. Optionally clone your voice later

That's it! You now have realistic text-to-speech with Indian payment support! 🥑🎤
