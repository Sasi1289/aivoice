# TTS Services with Indian Payment Options

## 1. PlayHT (Accepts Indian Cards/UPI via Razorpay) ⭐ RECOMMENDED

**Pricing:**
- Free: 12,500 words/month
- Creator: $31/month (~₹2,600) - 500,000 words
- Pro: $79/month (~₹6,600) - 2 million words
- **Accepts:** Credit/Debit cards, UPI, Razorpay

**Features:**
- Voice cloning available
- Ultra-realistic voices
- Indian English voices available
- Good API documentation

**Website:** https://play.ht

**Setup:**
1. Sign up at https://play.ht
2. Go to API Access
3. Copy your API Key and User ID
4. Add to `.env`:
   ```
   PLAYHT_API_KEY=your_key
   PLAYHT_USER_ID=your_user_id
   ```

---

## 2. Murf.ai (Indian Company - Accepts INR)

**Pricing:**
- Free: 10 minutes of voice generation
- Basic: $19/month (~₹1,600)
- Pro: $26/month (~₹2,200)
- **Accepts:** Indian credit/debit cards, UPI

**Features:**
- Indian company based in Bangalore
- Voice cloning available (Pro plan)
- Multiple Indian accents
- Hindi and other Indian languages

**Website:** https://murf.ai

**Note:** API access requires Pro plan or higher

---

## 3. Resemble.ai (Accepts International Cards)

**Pricing:**
- Free: 300 seconds/month
- Basic: $0.006 per second (~₹0.50 per second)
- Pay as you go with Indian cards

**Features:**
- Voice cloning
- Real-time voice conversion
- Good quality

**Website:** https://www.resemble.ai

---

## 4. Speechify API (Accepts Indian Payments)

**Pricing:**
- Free tier available
- Paid plans start at $29/month (~₹2,400)
- **Accepts:** Most Indian payment methods

**Features:**
- High-quality voices
- Multiple languages including Hindi
- Good for long-form content

**Website:** https://speechify.com/api

---

## 5. Google Cloud Text-to-Speech (Accepts Indian Cards)

**Pricing:**
- Free: 1 million characters/month (WaveNet voices)
- After free tier: $16 per 1 million characters (~₹1,300)
- **Accepts:** Indian credit/debit cards

**Features:**
- Very reliable
- Good quality
- No voice cloning (uses pre-made voices)
- Indian English voices available

**Website:** https://cloud.google.com/text-to-speech

**Setup:**
1. Go to https://console.cloud.google.com
2. Enable Text-to-Speech API
3. Create API key
4. Add to `.env`: `GOOGLE_TTS_API_KEY=your_key`

---

## 6. Azure Speech Services (Microsoft - Accepts Indian Cards)

**Pricing:**
- Free: 500,000 characters/month
- After free tier: $16 per 1 million characters (~₹1,300)
- **Accepts:** Indian credit/debit cards

**Features:**
- Custom Neural Voice (voice cloning)
- Very high quality
- Indian English voices

**Website:** https://azure.microsoft.com/en-in/services/cognitive-services/text-to-speech/

---

## Best Options for You

### For Voice Cloning:
1. **PlayHT** - Best balance of price, quality, and Indian payment support
2. **Murf.ai** - Indian company, easy payment
3. **Resemble.ai** - Pay as you go

### For Pre-made Voices (No Cloning):
1. **Google Cloud TTS** - Free tier is generous
2. **Azure Speech** - Also has good free tier

---

## My Recommendation: PlayHT

**Why PlayHT:**
- ✅ Accepts Indian payments (Razorpay)
- ✅ Voice cloning available
- ✅ Free tier to test (12,500 words)
- ✅ Good quality
- ✅ Easy API integration
- ✅ Reasonable pricing (~₹2,600/month for Creator plan)

**How to Set Up PlayHT:**

1. Go to https://play.ht and sign up
2. Verify your email
3. Go to "API Access" in settings
4. Copy your:
   - API Key
   - User ID
5. For voice cloning:
   - Go to "Voice Cloning"
   - Upload your voice sample (1-2 minutes)
   - Wait for processing (5-10 minutes)
   - Copy the Voice ID

Let me know which service you want to use, and I'll integrate it into your app!

---

## Quick Comparison Table

| Service | Free Tier | Voice Cloning | Indian Payment | Price/Month |
|---------|-----------|---------------|----------------|-------------|
| PlayHT | 12.5K words | ✅ Yes | ✅ Yes (Razorpay) | ₹2,600 |
| Murf.ai | 10 minutes | ✅ Yes (Pro) | ✅ Yes (UPI) | ₹2,200 |
| Google TTS | 1M chars | ❌ No | ✅ Yes | ₹1,300 |
| Azure | 500K chars | ✅ Yes | ✅ Yes | ₹1,300 |
| Resemble.ai | 300 seconds | ✅ Yes | ✅ Yes | Pay per use |
