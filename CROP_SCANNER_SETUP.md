# FasalIQ Crop Scanner Setup Guide

## Overview

The FasalIQ Crop Scanner now uses **Claude 3.5 Sonnet** (Anthropic) for multimodal image analysis to:
- ✅ Detect crop type from leaf images
- ✅ Identify potential diseases or health issues
- ✅ Provide confidence scores for each detection
- ✅ Generate actionable recommendations

---

## Prerequisites

- Node.js 18+ 
- pnpm (or npm with `preinstall` configured)
- Anthropic API key

---

## Step 1: Get an Anthropic API Key

1. Go to [console.anthropic.com](https://console.anthropic.com/)
2. Sign up or log in to your account
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the key (starts with `sk-ant-...`)

---

## Step 2: Configure Environment Variables

### Option A: Local Development (.env.local)

Create a file `.env.local` in the project root:

```bash
# Create .env.local in the project root directory

GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: 
- `.env.local` is in `.gitignore` and will NOT be committed
- Never share your API key
- Each developer needs their own `.env.local`

### Option B: Replit Secrets

If running on Replit:

1. Click **Secrets** (padlock icon) in the left sidebar
2. Add new secret:
   - **Key**: `VITE_ANTHROPIC_API_KEY`
   - **Value**: `sk-ant-your-api-key-here`
3. Secrets are automatically available in `import.meta.env`

---

## Step 3: Install Dependencies & Run

```bash
cd /path/to/FasalIQ-Farm-Intelligence

# Install dependencies
pnpm install

# Run development server
cd artifacts/fasaliq
pnpm dev

# The app should open at http://localhost:5173 (or similar)
```

---

## Step 4: Test the Crop Scanner

1. Navigate to **Crop Scanner** in the app
2. Click "Choose Image" or drag-drop an image
3. Upload a clear leaf photo (JPG, PNG, WebP - under 10MB)
4. Wait for analysis (~5-10 seconds)
5. View results with:
   - Detected crop name & confidence
   - Health issues (if any) & confidence
   - Visual observations
   - Recommended actions

---

## Supported Crops

The AI can detect:
- Wheat
- Rice
- Mustard
- Potato
- Tomato
- Cotton
- Maize
- Sugarcane
- Chickpea
- Soybean
- Plus many others

---

## How It Works

### Image Flow

```
1. User uploads image
   ↓
2. Image converted to base64
   ↓
3. Sent to Claude API with context
   ↓
4. Claude analyzes using vision
   ↓
5. Returns structured JSON
   ↓
6. App displays results
```

### API Request Structure

The service sends:
- **Image**: Base64 encoded
- **Prompt**: Agricultural analysis instructions
- **Language**: User's selected language (en/hi/hinglish)
- **Context**: Farm location, known crop (if provided)

### Response Structure

Claude returns JSON with:

```json
{
  "cropName": "Wheat",
  "cropConfidence": 0.92,
  "possibleHealthIssue": "Yellow Rust",
  "healthConfidence": 0.78,
  "severity": "moderate",
  "visualObservations": [
    "Brown-orange pustules on leaf surface",
    "Affects 30-40% of leaf area"
  ],
  "recommendedNextSteps": [
    "Apply fungicide treatment",
    "Reduce irrigation frequency",
    "Monitor neighboring plants"
  ],
  "analysis": "..."
}
```

---

## Confidence Thresholds

| Score | Interpretation |
|-------|-----------------|
| ≥ 80% | "Detected crop" / "Confirmed issue" |
| 60-79% | "Likely crop" / "Possible issue" |
| < 60% | "Cannot confidently identify" → Ask user to select manually |

---

## Error Handling

### Common Errors & Solutions

**"API key not configured"**
- Check `.env.local` or Replit Secrets
- Ensure `VITE_ANTHROPIC_API_KEY` is set
- Restart dev server after adding env variable

**"Image file too large"**
- Max file size: 10MB
- Compress or resize your image

**"Invalid file type"**
- Upload JPG, PNG, WebP, or similar
- Avoid BMP or other uncommon formats

**"Timeout or network error"**
- Check internet connection
- Anthropic API might be down (rare)
- Try again in a few moments

**"Low confidence crop detection"**
- App will ask you to select your crop manually
- Provides 10 common crops as quick selection
- Helps AI provide better recommendations

---

## API Limits & Costs

- **Free Trial**: Check [Anthropic Pricing](https://www.anthropic.com/pricing)
- **Per Image**: ~$0.003-0.01 USD (depends on image size)
- **Rate Limits**: ~100 requests/minute in free tier

---

## Security Best Practices

✅ **DO:**
- Keep API key in `.env.local` or Replit Secrets
- Use `.env.example` to document required variables
- Rotate API keys periodically
- Monitor API usage in Anthropic console

❌ **DON'T:**
- Commit `.env.local` to GitHub
- Expose API key in frontend code
- Share API key publicly
- Use same key across multiple services

---

## Testing with Demo Images

### Example Healthy Wheat
- Look for: Uniform green color, no spots
- Upload any green leaf photo

### Example Diseased Wheat
- Look for: Brown/orange spots, discoloration
- Upload leaf with visible damage

---

## Troubleshooting

### Image Analysis is Very Slow

- Large images take longer to process
- Compress images to ~1-2MB before uploading
- Anthropic API response time ~5-10 seconds is normal

### Results are Incorrect

- Ensure image is well-lit and in focus
- Include multiple leaves if possible
- AI is probabilistic, not 100% accurate
- Always verify with local expert

### App Crashes on Upload

- Check browser console (F12)
- Verify API key is valid
- Try a different image format
- Clear browser cache and try again

---

## Next Steps

1. ✅ Set up API key
2. ✅ Run the development server
3. ✅ Test Crop Scanner with sample images
4. ✅ Provide feedback on accuracy
5. Consider integrating with AI Advisor for personalized recommendations

---

## Support

- **Anthropic Docs**: https://docs.anthropic.com/
- **API Status**: https://status.anthropic.com/
- **Questions**: Check the Discord or support channels

---

## Changelog

### v1.0 (2026-08-31)
- ✅ Real image upload functionality
- ✅ Claude 3.5 Sonnet integration
- ✅ Multimodal crop detection
- ✅ Disease identification with confidence
- ✅ Language-aware responses (en/hi/hinglish)
- ✅ Manual crop selection fallback for low-confidence
- ✅ Proper error handling and loading states
