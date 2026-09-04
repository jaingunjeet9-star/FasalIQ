# FasalIQ Crop Scanner - SIMPLE SETUP GUIDE

## 🎯 What You're Doing (In Simple Words)

1. **Getting Permission** - Sign up for a free AI service to analyze images
2. **Saving the Permission Key** - Tell the app where to find your permission key
3. **Running the App** - Start the app and test it with a crop image

---

## 🚀 STEP 1: Choose Your Free AI Service

Pick ONE from the list below (Google recommended):

### **OPTION A: Google Vision API** ⭐ RECOMMENDED
✅ Free: 1,000 images/month (enough for testing)  
✅ Easiest to set up  
✅ No credit card required initially  

### **OPTION B: Claude (Anthropic)**
✅ Free trial available  
⚠️ Limited free requests (might run out)  

### **OPTION C: Hugging Face**
✅ Completely free  
✅ Works on free tier  
⚠️ Slower analysis  

### **OPTION D: Ollama (Local AI)**
✅ Completely free forever  
✅ Works without internet  
✅ Requires installing software  

---

## 📋 STEP 2: Setup Google Vision (Recommended)

### Simple Steps:

**A) Create a Google Account** (if you don't have one)
- Go to [google.com](https://google.com/)
- Click **Sign In** → Create a new account

**B) Create a Project**
1. Go to [console.cloud.google.com](https://console.cloud.google.com/)
2. Look for dropdown at top left (says "Select a Project")
3. Click **"NEW PROJECT"**
4. Name it: `FasalIQ`
5. Click **Create**

**C) Enable Vision API**
1. Search for **"Cloud Vision API"** in the search bar
2. Click the result
3. Click **Enable** button (blue button at top)
4. Wait for it to turn green

**D) Create Service Account**
1. Click **Create Credentials** (blue button)
2. Choose **Service Account**
3. Fill in:
   - Service account name: `fasaliq-farmer`
   - Leave other fields as default
4. Click **Create and Continue**
5. Click **Create Key**
6. Choose **JSON** format
7. Click **Create**
8. A JSON file downloads automatically

**E) Extract the Keys**
1. Open the downloaded JSON file with Notepad
2. Find these lines:
   - Find `"private_key": "-----BEGIN...-----END PRIVATE KEY-----\n"`
   - Find `"project_id": "xxxxx"`
3. Copy the entire `"private_key"` value (with quotes)
4. Copy the `"project_id"` value (with quotes)

---

## 💾 STEP 3: Save Your Keys in the App

### Create `.env.local` File

**Using Notepad:**
1. Open **Notepad**
2. Paste this:
```
VITE_GOOGLE_VISION_KEY="-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...-----END PRIVATE KEY-----\n"
VITE_GOOGLE_PROJECT_ID="your-project-id-from-json"
```

3. Replace:
   - `-----BEGIN PRIVATE KEY-----\nMIIEvQIBA...-----END PRIVATE KEY-----\n` with your actual key
   - `your-project-id-from-json` with your project ID

4. Save as `.env.local` in the **project root folder**.
   - **Important**: Make sure it says `.env.local`, not `.env.local.txt`
   - In Notepad: **File** → **Save As** → Type name as `.env.local` → Choose **All Files** format

**Or using VS Code (easier):**
1. Open VS Code
2. **File** → **New File**
3. Paste the content above
4. **File** → **Save As**
5. Name: `.env.local`
6. Location: Project root folder

---

## ▶️ STEP 4: Run the App

Open PowerShell or Terminal:

```bash
# Navigate to project
cd /path/to/FasalIQ-Farm-Intelligence

# Go to app folder
cd artifacts/fasaliq

# Start the app
npm run dev
```

Wait for message:
```
Local: http://localhost:5173
```

---

## 🧪 STEP 5: Test It

1. Open browser
2. Go to: `http://localhost:5173`
3. Click **Crop Scanner** in menu
4. Click **Choose Image**
5. Select any plant/leaf photo from your computer
6. **Wait 10 seconds** ⏳
7. See results!

---

## ❓ What If It Doesn't Work?

### "API key not found" error
- ✅ Check you saved `.env.local` file
- ✅ Make sure it's at project root (not in a subfolder)
- ✅ Restart the app after saving the file

### "File not found"  
- ✅ Make sure `.env.local` is named correctly (not `.env.local.txt`)
- ✅ Restart VS Code and the dev server

### "Invalid key format"
- ✅ Copy the ENTIRE `"private_key"` value including the quotes
- ✅ Keep the `\n` characters (don't replace them with line breaks)

### Crop detection returns "Unknown"
- ✅ Use a clearer photo
- ✅ Make sure the leaf is well-lit
- ✅ Try a different crop

### Analysis is very slow
- ✅ This is normal (5-10 seconds)
- ✅ Google API is analyzing your image
- ✅ Faster with smaller image files

---

## 🎓 What Happens When You Upload?

```
1. You pick an image
   ↓
2. Image file is read from your computer
   ↓
3. Image is sent to Google's servers
   ↓
4. Google AI analyzes it (checks if it's wheat, rice, diseased, etc.)
   ↓
5. Results come back
   ↓
6. App shows you what it found
```

**Important**: Your image is only sent to analyze it. Google doesn't store it.

---

## 📊 Free Tier Limits

**Google Vision API:**
- 1,000 requests per month = FREE
- Each image upload = 1 request
- So you can analyze ~30 images per day
- After 1,000, you'll get an error until next month

**No credit card charged** unless you go over 1,000 in the same month.

---

## ✅ QUICK CHECKLIST

- [ ] Chose Google Vision API
- [ ] Created Google Cloud project
- [ ] Enabled Cloud Vision API
- [ ] Downloaded JSON service account key
- [ ] Extracted `private_key` and `project_id`
- [ ] Created `.env.local` file in project root
- [ ] Pasted keys in `.env.local`
- [ ] Ran `npm run dev` in `artifacts/fasaliq` folder
- [ ] Opened `http://localhost:5173` in browser
- [ ] Tested Crop Scanner with an image
- [ ] Got results!

---

## 📚 Need More Help?

- **Google Cloud Setup Issues**: See [CROP_SCANNER_SETUP.md](./CROP_SCANNER_SETUP.md) for detailed instructions
- **Code Questions**: Check the service file at `artifacts/fasaliq/src/services/cropAnalysisService.ts`
- **Environment Variables**: See `.env.example` for all options

---

## 🎉 YOU DID IT!

Your Crop Scanner is now live and analyzing real images with AI!

Next steps:
- Test with more crop images
- Try different crops (wheat, rice, tomato, etc.)
- Upload images with diseases to see detection
- Provide feedback on accuracy

Enjoy! 🌾
