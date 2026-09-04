// List all available models for this API key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is required');

async function listModels() {
  // Check the actual error message from a 404
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: 'Hi' }] }] })
  });
  const txt = await resp.text();
  console.log('404 error body:', txt.substring(0, 500));

  // Try the models list endpoint
  const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  const listResp = await fetch(listUrl);
  const listTxt = await listResp.text();
  console.log('\nModels list status:', listResp.status);
  if (listResp.status === 200) {
    const data = JSON.parse(listTxt);
    const models = data.models || [];
    console.log('Available models:');
    models.forEach(m => console.log(' -', m.name, '|', m.displayName));
  } else {
    console.log('Models list error:', listTxt.substring(0, 300));
  }
}

listModels().catch(e => console.error(e.message));
