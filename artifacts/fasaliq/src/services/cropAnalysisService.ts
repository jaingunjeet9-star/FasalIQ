/**
 * FasalIQ Deep Multimodal Crop Analysis Service
 * Vision and botanical pathology engine powered by Google Gemini Vision.
 *
 * Architecture: Calls Gemini Vision API via the backend proxy server (/api/gemini/:model).
 * The GEMINI_API_KEY lives ONLY on the server — it is NEVER exposed to the browser.
 * The Vite dev server proxies /api/gemini requests to the Express API server.
 *
 * Implements 10 deep agricultural diagnostic categories:
 *  1. Crop Identification (Species, Family, Growth Stage, Calibrated Confidence)
 *  2. Overall Crop Health Status (Healthy / Moderate Concern / At Risk / Severe Concern)
 *  3. Visual Observations (Leaves, stems, lesions, color, venation)
 *  4. Disease Analysis (Symptoms, pathogen pathology, alternative possibilities)
 *  5. Pest & Insect Screening (Nymph marks, aphids, chew marks)
 *  6. Nutrient Deficiency Indicators (N, P, K, Fe, Zn, Mg visual symptoms)
 *  7. Environmental & Water Stress (Moisture excess, drought, heat)
 *  8. Actionable Recommendations (Immediate, 3-7 Days, Monitoring, When to Seek KVK Help)
 *  9. Long-Term Cultural Prevention
 * 10. When to Rescan guidance + Farmer-friendly simple explanation
 */

import { Language } from '@/lib/i18n';
import { FarmerProfile } from '@/context/AppContext';

export interface DeepDiseaseAnalysis {
  suspectedDisease: string | null;
  whySuspected: string | null;
  symptoms: string[];
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  alternativePossibilities?: string[];
}

export interface DeepPestAnalysis {
  suspectedPest: string | null;
  evidence: string | null;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
}

export interface DeepNutrientDeficiency {
  nutrient: string;
  visualSymptoms: string;
}

export interface DeepEnvironmentalStress {
  type: string;
  details: string;
}

export interface DeepRecommendedActions {
  immediate: string[];
  next3to7Days: string[];
  monitoring: string[];
  whenToSeekHelp: string;
}

export interface CropAnalysisResult {
  cropName: string;
  cropFamily: string;
  cropConfidence: number;
  growthStage: string;
  healthStatus: 'healthy' | 'moderate_concern' | 'at_risk' | 'severe_concern';
  healthConfidence: number;
  severity: 'none' | 'mild' | 'moderate' | 'severe';
  possibleHealthIssue: string | null;
  simpleExplanation: string;
  visualObservations: string[];
  diseaseAnalysis: DeepDiseaseAnalysis;
  pestAnalysis: DeepPestAnalysis;
  nutrientDeficiencies: DeepNutrientDeficiency[];
  environmentalStress: DeepEnvironmentalStress | null;
  recommendedActions: DeepRecommendedActions;
  prevention: string[];
  whenToRescan: string;
  contextComparison: {
    dashboardCrop: string;
    isMatch: boolean;
    discrepancyNote?: string;
  };
  rawResponse: string;
  /** Distinguishes between an API/system failure vs. the AI genuinely being uncertain */
  analysisSource: 'ai' | 'ai_uncertain' | 'system_error' | 'manual';
}

// ============================================================
// IMAGE UTILITIES
// ============================================================

async function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data URL prefix (e.g. "data:image/jpeg;base64,")
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function withTimeout<T>(promise: Promise<T>, ms: number, label: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout (${ms}ms): ${label}`)), ms);
    promise.then(
      (val) => { clearTimeout(timer); resolve(val); },
      (err) => { clearTimeout(timer); reject(err); }
    );
  });
}

// ============================================================
// PROMPT BUILDER
// ============================================================

function buildDeepAnalysisPrompt(language: Language, profile?: FarmerProfile): string {
  const langName =
    language === 'hi'
      ? 'Hindi in Devanagari script'
      : language === 'hinglish'
      ? 'Hinglish in Roman script'
      : 'English';

  const farmContext = profile
    ? `Registered Farmer Crop: ${profile.crop}, Farm Location: ${profile.location}`
    : 'No registered crop provided.';

  return `You are FasalIQ, an expert Indian botanical pathologist and precision agricultural AI agronomist.

FARM PROFILE CONTEXT (For secondary reference ONLY — do NOT use this to decide the crop):
${farmContext}

CRITICAL RULES — READ CAREFULLY:
1. Analyze ONLY the uploaded image. Identify the ACTUAL crop or plant visible in the image.
2. NEVER default to Wheat, Mustard, or any other crop. If you cannot identify the crop, return "Unknown".
3. Do NOT force the crop identification to match the registered farmer crop in the profile above.
4. Do NOT use the filename, farmer profile, default crop, previous scan, or demo data to identify the crop.
5. Valid inputs include a whole plant, crop field, leaf, flower, fruit, grain or seed head, stem, or plant canopy.
6. Examine leaves, flowers, fruits, seed heads, stems, branching pattern, plant architecture, field appearance, color, venation, and margins for identification.
7. Health & Pathology: Identify visible fungal pustules, necrotic spots, chlorosis, pest bites, leaf curl, or wilting SEPARATELY from crop identification.
8. If the image is a non-agricultural object (person, car, building, animal, etc.), set crop_name to "Unknown" and simple_explanation to indicate the image does not show a crop.
9. If image quality is too poor, blurry, or dark to identify the crop with any confidence, set crop_name to "Unknown" and explain why.
10. Only return crop_name "Unknown" when the image genuinely lacks agricultural visual information. Do not be unnecessarily uncertain for clear crop images.
11. Provide all descriptive texts (explanations, observations, actions, prevention) in ${langName}.

OUTPUT FORMAT (Return ONLY valid JSON matching this schema exactly — NO markdown code fences, NO extra text):
{
  "crop_name": "Rice",
  "crop_family": "Poaceae (Gramineae)",
  "crop_confidence": "high",
  "crop_confidence_score": 0.91,
  "growth_stage": "Vegetative / Tillering Stage",
  "health_status": "healthy",
  "health_confidence": 0.88,
  "severity": "none",
  "possible_health_issue": null,
  "simple_explanation": "Foliage looks vigorous with normal green pigmentation and no critical disease lesions.",
  "visual_observations": [
    "Slender linear leaf blades with distinct parallel venation",
    "Healthy chlorophyll distribution across upper and lower lamina",
    "No visible fungal spores or necrotic lesions"
  ],
  "disease_analysis": {
    "suspected_disease": null,
    "why_suspected": null,
    "symptoms": [],
    "severity": "none",
    "alternative_possibilities": []
  },
  "pest_analysis": {
    "suspected_pest": null,
    "evidence": null,
    "severity": "none"
  },
  "nutrient_deficiencies": [],
  "environmental_stress": null,
  "recommended_actions": {
    "immediate": [
      "Maintain regular irrigation and water depth of 2-3 cm"
    ],
    "next_3_to_7_days": [
      "Conduct weekly field walks to check lower canopy humidity"
    ],
    "monitoring": [
      "Check underside of leaf blades for early brown planthopper nymphs"
    ],
    "when_to_seek_help": "If leaf tips develop water-soaked lesions or sudden yellow stripes."
  },
  "prevention": [
    "Ensure balanced potassium application to strengthen leaf epidermis against fungi",
    "Avoid excessive nitrogenous urea application"
  ],
  "when_to_rescan": "Upload another photo in 7-10 days or immediately if spots appear."
}

Valid crop_confidence values: "high", "medium", "low"
crop_confidence_score must be a number from 0.0 to 1.0 (AI estimate, not scientific probability)
Valid health_status values: "healthy", "moderate_concern", "at_risk", "severe_concern"
Valid severity values: "none", "mild", "moderate", "severe"`;
}

// ============================================================
// JSON PARSER
// ============================================================

function parseAIJsonResponse(rawText: string): Record<string, unknown> {
  let cleaned = rawText.trim();
  // Strip markdown fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/i, '').replace(/```\s*$/, '').trim();
  }
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON found in vision AI response');
  }
  return JSON.parse(jsonMatch[0]) as Record<string, unknown>;
}

// ============================================================
// CONFIDENCE NORMALIZATION
// ============================================================

export function normalizeConfidence(value: unknown): number {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return Math.max(0, Math.min(1, value > 1 ? value / 100 : value));
  }

  if (typeof value !== 'string') return 0;
  const normalized = value.trim().toLowerCase();
  if (normalized === 'high') return 0.9;
  if (normalized === 'medium' || normalized === 'moderate') return 0.7;
  if (normalized === 'low') return 0.3;

  const numericValue = Number.parseFloat(normalized.replace('%', ''));
  if (!Number.isFinite(numericValue)) return 0;
  return Math.max(0, Math.min(1, normalized.includes('%') || numericValue > 1 ? numericValue / 100 : numericValue));
}

// ============================================================
// RESPONSE MAPPER
// ============================================================

function mapDeepAIResponse(
  parsed: Record<string, any>,
  rawText: string,
  profile?: FarmerProfile
): CropAnalysisResult {
  const cropName = String(parsed.crop_name || parsed.cropName || 'Unknown');
  const cropFamily = String(parsed.crop_family || parsed.cropFamily || 'Agricultural Angiosperm');
  const cropConfidence = normalizeConfidence(
    parsed.crop_confidence_score ?? parsed.crop_confidence ?? parsed.cropConfidence
  );
  const growthStage = String(parsed.growth_stage || parsed.growthStage || 'Active Foliar Stage');

  const validHealthStatuses = ['healthy', 'moderate_concern', 'at_risk', 'severe_concern'] as const;
  const rawHealthStatus = parsed.health_status || parsed.healthStatus;
  const healthStatus = validHealthStatuses.includes(rawHealthStatus)
    ? rawHealthStatus as (typeof validHealthStatuses)[number]
    : 'healthy';

  const healthConfidence = Math.max(0, Math.min(1, Number(parsed.health_confidence ?? parsed.healthConfidence ?? 0.8)));
  const validSeverities = ['none', 'mild', 'moderate', 'severe'] as const;
  const severity = validSeverities.includes(parsed.severity) ? parsed.severity as (typeof validSeverities)[number] : 'none';

  const possibleHealthIssue = parsed.possible_health_issue || parsed.possibleHealthIssue || null;
  const simpleExplanation = String(
    parsed.simple_explanation || parsed.simpleExplanation || 'AI specimen analysis completed.'
  );

  const visualObservations = Array.isArray(parsed.visual_observations)
    ? parsed.visual_observations.map(String)
    : Array.isArray(parsed.visualObservations)
    ? parsed.visualObservations.map(String)
    : ['Leaf morphological screening completed.'];

  // Disease
  const da = parsed.disease_analysis || parsed.diseaseAnalysis || {};
  const diseaseAnalysis: DeepDiseaseAnalysis = {
    suspectedDisease: da.suspected_disease || da.suspectedDisease || null,
    whySuspected: da.why_suspected || da.whySuspected || null,
    symptoms: Array.isArray(da.symptoms) ? da.symptoms.map(String) : [],
    severity: validSeverities.includes(da.severity) ? da.severity : severity,
    alternativePossibilities: Array.isArray(da.alternative_possibilities)
      ? da.alternative_possibilities.map(String)
      : Array.isArray(da.alternativePossibilities)
      ? da.alternativePossibilities.map(String)
      : [],
  };

  // Pest
  const pa = parsed.pest_analysis || parsed.pestAnalysis || {};
  const pestAnalysis: DeepPestAnalysis = {
    suspectedPest: pa.suspected_pest || pa.suspectedPest || null,
    evidence: pa.evidence || null,
    severity: validSeverities.includes(pa.severity) ? pa.severity : 'none',
  };

  // Nutrient deficiencies
  const nutrientDeficiencies: DeepNutrientDeficiency[] = Array.isArray(parsed.nutrient_deficiencies)
    ? parsed.nutrient_deficiencies.map((nd: any) => ({
        nutrient: String(nd.nutrient || 'Micronutrient'),
        visualSymptoms: String(nd.visual_symptoms || nd.visualSymptoms || 'Visual chlorosis observed'),
      }))
    : Array.isArray(parsed.nutrientDeficiencies)
    ? parsed.nutrientDeficiencies.map((nd: any) => ({
        nutrient: String(nd.nutrient || 'Micronutrient'),
        visualSymptoms: String(nd.visual_symptoms || nd.visualSymptoms || 'Visual chlorosis observed'),
      }))
    : [];

  // Environmental stress
  const es = parsed.environmental_stress || parsed.environmentalStress;
  const environmentalStress: DeepEnvironmentalStress | null = es && es.type
    ? {
        type: String(es.type),
        details: String(es.details || 'Environmental conditions noted'),
      }
    : null;

  // Recommended actions
  const ra = parsed.recommended_actions || parsed.recommendedActions || {};
  const recommendedActions: DeepRecommendedActions = {
    immediate: Array.isArray(ra.immediate) ? ra.immediate.map(String) : ['Monitor field moisture.'],
    next3to7Days: Array.isArray(ra.next_3_to_7_days || ra.next3to7Days)
      ? (ra.next_3_to_7_days || ra.next3to7Days).map(String)
      : ['Follow regular cultural practices.'],
    monitoring: Array.isArray(ra.monitoring) ? ra.monitoring.map(String) : ['Inspect canopy twice weekly.'],
    whenToSeekHelp: String(
      ra.when_to_seek_help || ra.whenToSeekHelp || 'Contact KVK agronomist if damage exceeds 10% of field.'
    ),
  };

  const prevention = Array.isArray(parsed.prevention)
    ? parsed.prevention.map(String)
    : ['Maintain field sanitation and balanced fertilization.'];

  const whenToRescan = String(
    parsed.when_to_rescan || parsed.whenToRescan || 'Rescan in 7-10 days if symptoms evolve.'
  );

  // Context Comparison
  const dashboardCrop = profile?.crop || 'Unknown';
  const isMatch =
    cropName === 'Unknown' ||
    cropName.toLowerCase().includes(dashboardCrop.toLowerCase()) ||
    dashboardCrop.toLowerCase().includes(cropName.toLowerCase());

  const discrepancyNote = !isMatch && cropName !== 'Unknown'
    ? `Specimen identified as ${cropName}, whereas your registered profile crop is ${dashboardCrop}.`
    : undefined;

  // Determine if AI is genuinely uncertain (low confidence or Unknown) vs confident result
  const analysisSource: CropAnalysisResult['analysisSource'] =
    cropName === 'Unknown' || cropConfidence < 0.5 ? 'ai_uncertain' : 'ai';

  return {
    cropName,
    cropFamily,
    cropConfidence,
    growthStage,
    healthStatus,
    healthConfidence,
    severity,
    possibleHealthIssue,
    simpleExplanation,
    visualObservations,
    diseaseAnalysis,
    pestAnalysis,
    nutrientDeficiencies,
    environmentalStress,
    recommendedActions,
    prevention,
    whenToRescan,
    contextComparison: {
      dashboardCrop,
      isMatch,
      discrepancyNote,
    },
    rawResponse: rawText,
    analysisSource,
  };
}

// ============================================================
// GEMINI DIRECT API CALL — NO BACKEND REQUIRED
// ============================================================

export class RateLimitError extends Error {
  retryAfterSeconds: number;
  constructor(retryAfterSeconds: number) {
    super(`API quota reached. Please retry in ${retryAfterSeconds} seconds.`);
    this.retryAfterSeconds = retryAfterSeconds;
  }
}

export class ApiKeyMissingError extends Error {
  constructor(message?: string) {
    super(message || 'Gemini API key is not configured or is invalid. Please set a valid GEMINI_API_KEY in .env.local and restart the server.');
  }
}

/**
 * Calls Gemini Vision API via the backend proxy server at /api/gemini/:model.
 * The GEMINI_API_KEY is read from the server environment — it is never sent to or
 * stored in the browser. The Vite dev proxy forwards /api/gemini/* to localhost:3000.
 */
async function callGeminiVisionProxy(
  model: string,
  base64Image: string,
  mimeType: string,
  prompt: string
): Promise<string> {
  const endpoint = `/api/gemini/${encodeURIComponent(model)}`;

  console.log('[CropScanner] Proxy Vision request', {
    model,
    mimeType: mimeType || 'image/jpeg',
    base64Length: base64Image.length,
    imageIncluded: base64Image.length > 0,
  });

  const response = await withTimeout(
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { inlineData: { mimeType: mimeType || 'image/jpeg', data: base64Image } },
            { text: prompt },
          ],
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 3000,
        },
      }),
    }),
    35000,
    `Gemini ${model} Vision`
  );

  if (response.status === 503) {
    // Server has no API key configured
    throw new ApiKeyMissingError();
  }

  if (response.status === 429) {
    const errJson = await response.json() as { error?: { message?: string; details?: Array<{ retryDelay?: string }> } };
    const retryDelay = errJson?.error?.details?.find((d: any) => d.retryDelay)?.retryDelay;
    const seconds = retryDelay ? parseInt(retryDelay) : 60;
    console.warn(`[CropScanner] ${model} rate limited. Retry in ${seconds}s`);
    throw new RateLimitError(seconds);
  }

  if (response.status === 400) {
    const errJson = await response.json().catch(() => ({})) as { error?: { message?: string } };
    const errMsg = errJson?.error?.message || '';
    // API_KEY_INVALID comes back as 400 from Gemini
    if (errMsg.includes('API key not valid') || errMsg.includes('INVALID_ARGUMENT') || errMsg.includes('API_KEY_INVALID')) {
      throw new ApiKeyMissingError('Gemini API key is invalid. Please check GEMINI_API_KEY in .env.local and restart the server.');
    }
    console.error(`[CropScanner] ${model} bad request (400):`, errMsg.substring(0, 300));
    throw new Error(`Bad request to Gemini (400): ${errMsg.substring(0, 200)}`);
  }

  if (response.status === 401 || response.status === 403) {
    const errText = await response.text();
    console.error(`[CropScanner] ${model} auth error (${response.status}):`, errText.substring(0, 200));
    throw new Error(`Gemini API authentication failed (${response.status}). Check GEMINI_API_KEY on the server.`);
  }

  if (!response.ok) {
    const errText = await response.text();
    console.warn(`[CropScanner] ${model} error (${response.status}):`, errText.substring(0, 200));
    throw new Error(`Gemini API error (${response.status}): ${errText.substring(0, 150)}`);
  }

  const data = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }>; finishReason?: string } }>;
    error?: { message?: string };
  };

  if (data.error) throw new Error(data.error.message || 'Gemini API error');

  const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!textResponse) {
    const finishReason = data.candidates?.[0]?.content?.finishReason;
    console.warn(`[CropScanner] ${model} returned empty response. Finish reason: ${finishReason}`);
    throw new Error(`${model} returned empty response (finishReason: ${finishReason ?? 'unknown'})`);
  }

  console.log('[CropScanner] Vision response received', {
    model,
    responseLength: textResponse.length,
    preview: textResponse.substring(0, 100),
  });

  return textResponse;
}

// ============================================================
// MULTI-MODEL FALLBACK CHAIN
// Models tried in order — if one fails with rate limit or 404, next is tried.
// Auth errors (401/403) and bad request (400) are NOT retried.
// ============================================================

async function analyzeWithGemini(
  base64Image: string,
  mimeType: string,
  language: Language,
  profile?: FarmerProfile
): Promise<CropAnalysisResult> {
  const prompt = buildDeepAnalysisPrompt(language, profile);

  // gemini-3.6-flash is the recommended model for this API account.
  // Others are fallbacks in case of rate limiting or temporary unavailability.
  const modelChain = [
    'gemini-3.6-flash',
    'gemini-3.5-flash',
    'gemini-flash-latest',
  ];

  let lastError: Error | null = null;

  for (const model of modelChain) {
    try {
      const textResponse = await callGeminiVisionProxy(model, base64Image, mimeType, prompt);
      console.log(`[CropScanner] SUCCESS with model: ${model}`);
      const parsed = parseAIJsonResponse(textResponse);
      console.log('[CropScanner] Parsed result', {
        cropName: parsed.crop_name ?? parsed.cropName,
        cropConfidence: parsed.crop_confidence_score ?? parsed.crop_confidence ?? parsed.cropConfidence,
        healthStatus: parsed.health_status,
      });
      return mapDeepAIResponse(parsed, textResponse, profile);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));

      // Don't retry auth errors or missing key — they'll fail on every model
      if (err instanceof ApiKeyMissingError || error.message.includes('authentication failed')) {
        throw error;
      }

      // Don't retry bad request errors (likely bad image encoding)
      if (error.message.includes('Bad request') || error.message.includes('(400)')) {
        throw error;
      }

      if (err instanceof RateLimitError) {
        lastError = err;
        console.warn(`[CropScanner] ${model} quota exhausted, trying next model...`);
      } else {
        lastError = error;
        console.warn(`[CropScanner] ${model} failed (${error.message}), trying next model...`);
      }
      continue;
    }
  }

  if (lastError) throw lastError;
  throw new Error('All Gemini models unavailable');
}

// ============================================================
// SAFE HEURISTIC FALLBACK — Only used when AI genuinely uncertain
// ============================================================
function generateHeuristicFallback(language: Language, profile?: FarmerProfile): CropAnalysisResult {
  return {
    cropName: 'Unknown',
    cropFamily: 'Unspecified Plant Specimen',
    cropConfidence: 0.35,
    growthStage: 'Uncertain Stage',
    healthStatus: 'moderate_concern',
    healthConfidence: 0.5,
    severity: 'none',
    possibleHealthIssue: null,
    simpleExplanation:
      language === 'hi'
        ? 'छवि की गुणवत्ता या कोण के कारण फसल की स्वचालित पहचान अनिश्चित है। कृपया नीचे से अपनी फसल चुनें।'
        : language === 'hinglish'
        ? 'Image clarity ki wajah se automatic crop identification low confidence hai. Neeche se crop select karein.'
        : 'Automatic crop identification has low confidence based on image quality. Please select your crop manually below.',
    visualObservations: [
      language === 'hi'
        ? 'पत्ती के नसों का पैटर्न और सीमाएं स्पष्ट रूप से दिखाई नहीं दे रही हैं।'
        : 'Leaf venation and structural borders are partially indistinct.',
    ],
    diseaseAnalysis: {
      suspectedDisease: null,
      whySuspected: null,
      symptoms: [],
      severity: 'none',
    },
    pestAnalysis: {
      suspectedPest: null,
      evidence: null,
      severity: 'none',
    },
    nutrientDeficiencies: [],
    environmentalStress: null,
    recommendedActions: {
      immediate: [
        language === 'hi' ? 'नीचे दी गई सूची में से अपनी फसल चुनें' : 'Select your crop from the manual list below',
      ],
      next3to7Days: [
        language === 'hi' ? 'दिन के उजाले में क्लोज़-अप फोटो लें' : 'Take a close-up photo in clear daylight',
      ],
      monitoring: ['Inspect leaf foliage regularly'],
      whenToSeekHelp: 'Visit local KVK if foliar symptoms spread rapidly.',
    },
    prevention: ['Maintain standard farm hygiene and optimal spacing.'],
    whenToRescan: 'Upload a well-lit close-up leaf image for precise diagnostic analysis.',
    contextComparison: {
      dashboardCrop: profile?.crop || 'Unknown',
      isMatch: true,
    },
    rawResponse: 'AI uncertainty fallback triggered.',
    analysisSource: 'ai_uncertain',
  };
}

// ============================================================
// SYSTEM ERROR RESULT — Used when the API itself fails (not AI uncertainty)
// ============================================================
function generateSystemErrorResult(
  errorMessage: string,
  language: Language,
  profile?: FarmerProfile
): CropAnalysisResult {
  return {
    cropName: 'Unknown',
    cropFamily: 'Analysis Failed',
    cropConfidence: 0,
    growthStage: 'N/A',
    healthStatus: 'moderate_concern',
    healthConfidence: 0,
    severity: 'none',
    possibleHealthIssue: null,
    simpleExplanation:
      language === 'hi'
        ? 'छवि विश्लेषण अभी उपलब्ध नहीं है। कृपया दोबारा प्रयास करें।'
        : language === 'hinglish'
        ? 'Image analysis abhi available nahi hai. Please dobara try karein.'
        : 'Image analysis is currently unavailable. Please try again or select your crop manually.',
    visualObservations: [],
    diseaseAnalysis: { suspectedDisease: null, whySuspected: null, symptoms: [], severity: 'none' },
    pestAnalysis: { suspectedPest: null, evidence: null, severity: 'none' },
    nutrientDeficiencies: [],
    environmentalStress: null,
    recommendedActions: {
      immediate: [language === 'en' ? 'Please try scanning again.' : 'Dobara scan karein.'],
      next3to7Days: [],
      monitoring: [],
      whenToSeekHelp: 'Contact KVK agronomist for manual crop assessment.',
    },
    prevention: [],
    whenToRescan: 'Try again with a clearer image when connectivity improves.',
    contextComparison: {
      dashboardCrop: profile?.crop || 'Unknown',
      isMatch: true,
    },
    rawResponse: `System error: ${errorMessage}`,
    analysisSource: 'system_error',
  };
}

// ============================================================
// MAIN EXPORT: analyzeCropImage
// ============================================================

/**
 * Analyzes a crop image using Gemini Vision AI.
 *
 * Error differentiation:
 * - API/connectivity failure → analysisSource: 'system_error' (show error, not uncertainty)
 * - AI genuinely uncertain  → analysisSource: 'ai_uncertain' (show manual selection)
 * - Successful AI result    → analysisSource: 'ai'
 */
export async function analyzeCropImage(
  imageFile: File | Blob,
  language: Language = 'en',
  profile?: FarmerProfile
): Promise<CropAnalysisResult> {
  const mimeType = imageFile.type || 'image/jpeg';
  const base64Image = await fileToBase64(imageFile);

  if (!base64Image || base64Image.length === 0) {
    return generateSystemErrorResult('Image could not be read', language, profile);
  }

  try {
    const result = await analyzeWithGemini(base64Image, mimeType, language, profile);
    return result;
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));

    // Auth error — key is missing or invalid
    if (err instanceof ApiKeyMissingError || err.message.includes('authentication failed')) {
      console.error('[CropScanner] API key error:', err.message);
      return generateSystemErrorResult(err.message, language, profile);
    }

    // Rate limit
    if (err instanceof RateLimitError) {
      console.warn('[CropScanner] Rate limited:', err.message);
      return generateSystemErrorResult(
        `Rate limited. Retry in ${err.retryAfterSeconds} seconds.`,
        language,
        profile
      );
    }

    // Network / timeout / server error — this is a SYSTEM error, NOT AI uncertainty
    console.warn('[CropScanner] System/network error:', err.message);
    return generateSystemErrorResult(err.message, language, profile);
  }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

export function formatConfidence(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}

export function isCropDetectionConfident(confidence: number): boolean {
  return confidence >= 0.5;
}

export function getManualCropHealthAnalysis(
  crop: string,
  language: Language
): CropAnalysisResult {
  return {
    cropName: crop,
    cropFamily: 'Agricultural Cultivar',
    cropConfidence: 1.0,
    growthStage: 'Active Vegetative Stage',
    healthStatus: 'healthy',
    healthConfidence: 0.85,
    severity: 'none',
    possibleHealthIssue: null,
    simpleExplanation:
      language === 'hi'
        ? `${crop} को मैन्युअल रूप से चुना गया है। मानक पोषण और सुरक्षा प्रोटोकॉल सक्रिय हैं।`
        : language === 'hinglish'
        ? `${crop} manually select kiya gaya hai. Standard nutrition protocol active hai.`
        : `${crop} was manually confirmed by farmer. Standard management guidelines applied.`,
    visualObservations: [
      language === 'hi'
        ? `${crop} के पत्ते की संरचना का सामान्य संदर्भ परीक्षण किया गया।`
        : `${crop} foliage baseline confirmed.`,
    ],
    diseaseAnalysis: {
      suspectedDisease: null,
      whySuspected: null,
      symptoms: [],
      severity: 'none',
    },
    pestAnalysis: {
      suspectedPest: null,
      evidence: null,
      severity: 'none',
    },
    nutrientDeficiencies: [],
    environmentalStress: null,
    recommendedActions: {
      immediate: [
        language === 'hi'
          ? `${crop} के लिए अनुशंसित सिंचाई चक्र का पालन करें।`
          : `Follow recommended irrigation schedule for ${crop}.`,
      ],
      next3to7Days: [
        language === 'hi'
          ? 'जैविक खाद या जीवामृत का 200 लीटर/एकड़ छिड़काव करें।'
          : 'Apply 200L/acre Jeevamrutha bio-fertilizer.',
      ],
      monitoring: ['Inspect leaf undersides for aphid activity.'],
      whenToSeekHelp: 'Contact local KVK agronomist if pest numbers increase.',
    },
    prevention: ['Practice crop rotation and seed bio-treatment.'],
    whenToRescan: 'Upload a leaf photo if discoloration appears.',
    contextComparison: {
      dashboardCrop: crop,
      isMatch: true,
    },
    rawResponse: `Manual selection: ${crop}`,
    analysisSource: 'manual',
  };
}
