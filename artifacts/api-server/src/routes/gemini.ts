import { Router, type IRouter } from "express";
import { logger } from "../lib/logger";

const router: IRouter = Router();
const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// Models available on this API account (Gemini AI Studio - newer tier)
const ALLOWED_MODELS = new Set([
  "gemini-3.6-flash",
  "gemini-3.5-flash",
  "gemini-flash-latest",
  // Also allow standard names as fallback
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
]);

type GeminiRequest = {
  model?: string;
  contents?: unknown;
  generationConfig?: unknown;
};

router.post("/gemini/:model", async (req, res) => {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = req.params.model;
  const body = req.body as GeminiRequest;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    logger.warn("GEMINI_API_KEY is not configured in .env.local");
    res.status(503).json({ error: { message: "Gemini API key is not configured. Set GEMINI_API_KEY in .env.local" } });
    return;
  }

  if (!ALLOWED_MODELS.has(model)) {
    logger.warn({ model }, "Rejected unknown Gemini model");
    res.status(400).json({ error: { message: `Unknown model: ${model}` } });
    return;
  }

  if (!Array.isArray(body.contents)) {
    res.status(400).json({ error: { message: "contents must be an array" } });
    return;
  }

  try {
    const geminiUrl = `${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent?key=${encodeURIComponent(apiKey)}`;

    const response = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: body.contents,
        generationConfig: body.generationConfig,
      }),
    });

    const responseText = await response.text();

    if (!response.ok) {
      // Log the actual Gemini error server-side for debugging (never send key to client)
      try {
        const errBody = JSON.parse(responseText);
        logger.error(
          { model, status: response.status, geminiError: errBody?.error?.message },
          "Gemini API returned error"
        );
      } catch {
        logger.error({ model, status: response.status }, "Gemini API returned non-JSON error");
      }
    }

    res.status(response.status).type("application/json").send(responseText);
  } catch (err) {
    logger.error({ err, model }, "Network error reaching Gemini API");
    res.status(502).json({ error: { message: "Gemini service request failed" } });
  }
});

export default router;
