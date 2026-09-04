// Test Gemini API key with different model names
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is required');
const models = [
  'gemini-2.0-flash',
  'gemini-2.0-flash-lite',
  'gemini-1.5-flash',
  'gemini-1.5-flash-latest',
  'gemini-flash-latest',
  'gemini-2.5-flash-preview-05-20',
  'gemini-2.5-flash',
];

async function testModels() {
  for (const model of models) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
    try {
      const resp = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: 'Say: OK' }] }] })
      });
      const status = resp.status;
      const txt = await resp.text();
      const worked = txt.includes('"candidates"') || txt.includes('"content"');
      console.log(`MODEL: ${model} | STATUS: ${status} | WORKS: ${worked}`);
      if (worked) {
        const data = JSON.parse(txt);
        const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log(`  -> Response: ${responseText}`);
      }
    } catch(e) {
      console.log(`MODEL: ${model} | ERROR: ${e.message}`);
    }
  }
}

testModels();
