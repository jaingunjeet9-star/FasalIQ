// Check 429 error details
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is required');
const model = 'gemini-3.6-flash';
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

const greenPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

const resp = await fetch(url, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{
      parts: [
        { inlineData: { mimeType: 'image/png', data: greenPixel } },
        { text: 'What color?' }
      ]
    }],
    generationConfig: { maxOutputTokens: 10 }
  })
});

const txt = await resp.text();
console.log('Status:', resp.status);
console.log('Headers:', Object.fromEntries(resp.headers.entries()));
console.log('Body:', txt);
