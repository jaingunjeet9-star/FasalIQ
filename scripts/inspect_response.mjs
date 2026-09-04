// Investigate actual response structure from gemini-3.6-flash
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) throw new Error('GEMINI_API_KEY is required');
const model = 'gemini-3.6-flash';
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

async function testAndInspect() {
  const resp = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: 'Reply with exactly: HELLO' }] }],
      generationConfig: { temperature: 0, maxOutputTokens: 20 }
    })
  });
  
  const txt = await resp.text();
  console.log('Status:', resp.status);
  console.log('Full raw response:');
  console.log(txt.substring(0, 2000));
}

testAndInspect().catch(e => console.error(e.message));
