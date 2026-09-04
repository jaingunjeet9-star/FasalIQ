# 🚀 CROP SCANNER - QUICK START CARD

## THREE SIMPLE STEPS

### ✅ STEP 1: Get a Free AI Key (5 min)

**Choose Google Vision (Recommended):**
```
1. Go to console.cloud.google.com
2. Click: NEW PROJECT → Name it "FasalIQ"
3. Search for "Cloud Vision API" → Click ENABLE
4. Click CREATE CREDENTIALS → Service Account
5. Give it a name (e.g., "fasaliq-farmer")
6. Click CREATE & CONTINUE → CREATE KEY
7. Choose JSON format → CREATE
8. Save the downloaded JSON file
```

**Extract Your Keys from JSON:**
- Open the JSON file in Notepad
- Find `"private_key": "-----BEGIN PRIVATE KEY-----\n...-----END PRIVATE KEY-----\n"`
- Find `"project_id": "your-project-id"`
- Copy both values (keep the quotes)

---

### ✅ STEP 2: Configure the App (2 min)

**Create `.env.local` File:**

1. Open Notepad
2. Paste this:
```
VITE_GOOGLE_VISION_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...-----END PRIVATE KEY-----\n"
VITE_GOOGLE_PROJECT_ID="your-project-id"
```

3. Replace:
   - The key value with your actual key
   - The project ID with your actual project ID

4. Save as `.env.local` in your project root folder.
   - **IMPORTANT**: Type `.env.local` (not `.env.local.txt`)
   - In Notepad: File → Save As → **All Files** format

---

### ✅ STEP 3: Run & Test (2 min)

**Open PowerShell:**
```powershell
cd /path/to/FasalIQ-Farm-Intelligence
cd artifacts/fasaliq
npm run dev
```

**Test in Browser:**
1. Open browser
2. Go to: `http://localhost:5173`
3. Click **Crop Scanner**
4. Click **Choose Image**
5. Pick a crop/leaf photo
6. **Wait 10 seconds** ⏳
7. **See Results!** ✨

---

## 🎯 WHAT GOOGLE VISION CAN DO

✅ **Detect Crops**: Wheat, Rice, Mustard, Potato, Tomato, Cotton, Maize, Sugarcane, etc.  
✅ **Spot Issues**: Rust, blight, spots, yellowing, wilting, damage  
✅ **Confidence Scores**: Shows how certain the AI is (0-100%)  
✅ **Visual Observations**: Describes what it sees in the leaf  
✅ **Recommendations**: Suggests next actions  

---

## 💰 COST

**FREE**: First 1,000 images per month  
**Per image**: ~0.003 USD after free tier  
**No credit card** charged unless you exceed 1,000 in a month

---

## ❓ TROUBLESHOOTING

### "Error: No AI provider configured"
→ Create `.env.local` file with your keys

### "File not found"
→ Make sure `.env.local` is at project root (not in a subfolder)
→ Restart dev server after saving

### "API error"
→ Check your keys are copied exactly
→ Make sure spaces and `\n` are preserved

### Crop detection says "Unknown"
→ Use a clearer, well-lit photo
→ Try different crop images

### Slow analysis (10 seconds)
→ This is normal! Google API is analyzing
→ Smaller image files are slightly faster

---

## 📊 WHAT HAPPENS

```
Image Upload
    ↓
Converted to encrypted format
    ↓
Sent to Google servers
    ↓
Google AI analyzes it (2-3 seconds)
    ↓
Results sent back
    ↓
App displays results
    ↓
Results deleted (not stored)
```

**Your images are NOT stored or kept by Google.**

---

## 🔗 HELPFUL LINKS

| Topic | Link |
|-------|------|
| Full Setup Guide | [SIMPLE_SETUP.md](./SIMPLE_SETUP.md) |
| Technical Details | [CROP_SCANNER_SETUP.md](./CROP_SCANNER_SETUP.md) |
| Environment Options | [.env.example](./.env.example) |
| Source Code | `artifacts/fasaliq/src/services/cropAnalysisService.ts` |

---

## ✅ QUICK CHECKLIST

- [ ] Visited console.cloud.google.com
- [ ] Created "FasalIQ" project
- [ ] Enabled Cloud Vision API
- [ ] Downloaded JSON service key
- [ ] Extracted private_key and project_id
- [ ] Created `.env.local` file
- [ ] Pasted both keys
- [ ] Saved `.env.local` in project root
- [ ] Ran `npm run dev` in artifacts/fasaliq
- [ ] Opened http://localhost:5173
- [ ] Tested Crop Scanner with image
- [ ] Got results! 🎉

---

## 🎓 WANT TO TRY OTHER AI?

Replace Google with:

```bash
# Claude (Pay per use)
VITE_ANTHROPIC_API_KEY=sk-ant-...

# Hugging Face (Free)
VITE_HUGGINGFACE_TOKEN=hf_...

# Local AI - Ollama (Completely Free)
# Install Ollama, then: ollama pull llava
VITE_LLM_ENDPOINT=http://localhost:11434
```

---

## 🚀 YOU'RE READY!

Your Crop Scanner is now powered by real AI! 

- Upload images of your crops
- Get instant crop identification
- See health issue detection
- Get actionable recommendations

**Enjoy!** 🌾

Questions? See [SIMPLE_SETUP.md](./SIMPLE_SETUP.md) for detailed help.
