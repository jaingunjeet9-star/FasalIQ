// Test multimodal with a very small image and simple prompt (to check if vision works)
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is required');
const model = 'gemini-3.6-flash';
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

// Small 1x1 green pixel PNG
const greenPixel = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

const controller = new AbortController();
const timeout = setTimeout(() => controller.abort(), 30000);

try {
  console.log('Starting multimodal test at', new Date().toISOString());
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
    body: JSON.stringify({
      contents: [{
        parts: [
          { inlineData: { mimeType: 'image/png', data: greenPixel } },
          { text: 'What color is this image? Answer in 3 words.' }
        ]
      }],
      generationConfig: { temperature: 0, maxOutputTokens: 30 }
    })
  });
  clearTimeout(timeout);
  const txt = await resp.text();
  console.log('Done at', new Date().toISOString());
  console.log('Status:', resp.status);
  const data = JSON.parse(txt);
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log('Text response:', text);
  console.log('Finish reason:', data?.candidates?.[0]?.finishReason);
} catch(e) {
  clearTimeout(timeout);
  console.log('Error/Timeout:', e.message);
}
