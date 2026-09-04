// Test gemini-3.6-flash specifically with image (multimodal)
import { readFileSync, existsSync } from 'fs';

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is required');
const model = 'gemini-3.6-flash';
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

// First test text-only to verify model works
async function testTextOnly() {
  console.log('\n--- TEXT ONLY TEST ---');
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Reply with exactly: CROP_SCANNER_OK' }] }],
      generationConfig: { temperature: 0, maxOutputTokens: 20 }
    })
  });
  const txt = await resp.text();
  console.log('Status:', resp.status);
  if (resp.status === 200) {
    const data = JSON.parse(txt);
    console.log('Response:', data?.candidates?.[0]?.content?.parts?.[0]?.text);
  } else {
    console.log('Error:', txt.substring(0, 400));
  }
}

// Test multimodal with a real image if available
async function testMultimodal() {
  console.log('\n--- MULTIMODAL TEST ---');
  // Create a minimal 1x1 green pixel PNG as base64
  const greenPixelBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType: 'image/png', data: greenPixelBase64 } },
          { text: 'What is in this image? Reply in 1 sentence.' }
        ]
      }],
      generationConfig: { temperature: 0, maxOutputTokens: 100 }
    })
  });
  const txt = await resp.text();
  console.log('Status:', resp.status);
  if (resp.status === 200) {
    const data = JSON.parse(txt);
    console.log('Response:', data?.candidates?.[0]?.content?.parts?.[0]?.text);
  } else {
    console.log('Error:', txt.substring(0, 400));
  }
}

testTextOnly().then(testMultimodal).catch(e => console.error('ERROR:', e.message));
