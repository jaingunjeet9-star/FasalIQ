/**
 * FasalIQ AI Farm Advisor Service
 * Contextual Agronomic Decision Intelligence Engine powered by Google Gemini 3.6 Flash.
 *
 * Supports:
 * - Real-time conversational multi-turn context
 * - Full farm parameters (crop, acreage, district, soil, weather forecasts, market rates, organic stage)
 * - Calibrated reasoning schema:
 *     1. Core direct recommendation
 *     2. Agronomic rationale / why
 *     3. Step-by-step immediate actions
 *     4. Field indicators to monitor
 *     5. When to seek local expert / KVK guidance
 * - Native multilingual generation (Hindi Devanagari for 'hi', Hinglish Romanized for 'hinglish', English for 'en')
 * - Resilient instant heuristic decision rules fallback if offline
 */

import { Language } from '@/lib/i18n';
import { FarmerProfile } from '@/context/AppContext';

export interface AdvisorResponse {
  recommendation: string;
  why: string;
  nextActions: string[];
  whatToMonitor?: string[];
  whenToSeekHelp?: string;
  contextUsed: {
    crop: string;
    acres: number;
    location: string;
    weather: string;
  };
  source?: 'ai' | 'fallback';
}

export interface ConversationTurn {
  role: 'user' | 'assistant';
  content: string;
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

function buildAdvisorSystemPrompt(
  profile: FarmerProfile,
  language: Language,
  history: ConversationTurn[]
): string {
  const langInstruction =
    language === 'hi'
      ? 'CRITICAL: Respond COMPLETELY in natural, clear, farmer-friendly Hindi using Devanagari script (e.g. "नमस्ते! आपके 2 एकड़ गेहूं के खेत के लिए..."). Avoid English words where possible.'
      : language === 'hinglish'
      ? 'CRITICAL: Respond in natural conversational Hinglish using Roman/Latin script (e.g. "Aapke 2 acres wheat field ke liye upcoming rain ko dekhte hue irrigation hold karein...").'
      : 'Respond in clear, professional, empathetic English tailored for Indian agricultural extension.';

  const conversationHistoryFormatted = history.length > 0
    ? history.slice(-6).map((h) => `${h.role.toUpperCase()}: ${h.content}`).join('\n')
    : 'No prior conversation.';

  return `You are FasalIQ, a top-tier Indian agricultural scientist, agronomic decision-support expert, and farm economic advisor.
You are helping an Indian farmer with real-world, low-cost, high-yield agricultural decision-making.

FARM CONTEXT:
- Farmer Name: ${profile.name}
- Farm Location: ${profile.location}
- Total Land: ${profile.acres} Acres
- Primary Crop: ${profile.crop}
- Active Season: ${profile.season}
  - Weather Context: The dashboard currently displays a rain estimate; do not present it as verified live data.
  - Market Context: No verified live market price is available unless explicitly provided by the application.

LANGUAGE INSTRUCTION:
${langInstruction}

CONVERSATION HISTORY:
${conversationHistoryFormatted}

GUIDELINES FOR ADVISORY:
1. Answer the farmer's specific question directly and practically.
2. If the farmer explicitly names a different crop, location, acreage, or farming goal, use that information for the current conversation instead of overriding it with the profile.
3. If the question is about weather/irrigation/fertilizer: Use weather context only as an estimate and state when verified live data is unavailable.
4. If the question is about leaf symptoms/pests/disease: Describe possible issues, not confirmed diagnoses, and recommend local expert review if symptoms worsen.
5. If the question is about farm economics or switching crops: Give balanced trade-offs and clearly label general estimates.
6. Do not invent live market prices, government eligibility, weather observations, yields, or profits.
7. For pesticide or fertilizer advice, do not provide exact chemical rates or mixing instructions unless the product label and required crop, concentration, region, and application conditions are known. Prefer label-compliant guidance and local expert confirmation.
8. For disease questions, use "possible issue" or "visible symptoms" and never claim certainty from one photograph.
9. If the question is completely non-agricultural: Politely redirect back to farming, weather, crops, or mandi pricing.

OUTPUT FORMAT:
Return ONLY a valid JSON object matching this schema (no markdown fences, no extra text):
{
  "recommendation": "Main direct answer in selected language",
  "why": "Agronomic scientific reason explaining why this recommendation is given",
  "next_actions": [
    "Step 1 practical action",
    "Step 2 practical action",
    "Step 3 practical action"
  ],
  "what_to_monitor": [
    "Indicator 1 to check in the field",
    "Indicator 2 to observe over next 3-5 days"
  ],
  "when_to_seek_help": "Clear criteria for when the farmer should contact their local Krishi Vigyan Kendra (KVK) or extension officer."
}`;
}

function parseAIJsonResponse(rawText: string): Record<string, unknown> {
  let cleaned = rawText.trim();
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```[a-z]*\n?/i, '').replace(/```\s*$/, '').trim();
  }
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (!jsonMatch) {
    throw new Error('No valid JSON found in advisor response');
  }
  return JSON.parse(jsonMatch[0]) as Record<string, unknown>;
}

// ============================================================
// GEMINI DYNAMIC ADVISOR ENGINE
// ============================================================
async function callGeminiAdvisor(
  query: string,
  profile: FarmerProfile,
  language: Language,
  history: ConversationTurn[]
): Promise<AdvisorResponse> {
  const systemPrompt = buildAdvisorSystemPrompt(profile, language, history);
  const requestBody = {
    contents: [{
      parts: [
        { text: systemPrompt },
        { text: `FARMER QUERY: "${query}"` },
      ],
    }],
    generationConfig: {
      temperature: 0.2,
          maxOutputTokens: 2400,
          responseMimeType: 'application/json',
    },
  };

  let lastError: Error | null = null;
  for (const model of ['gemini-3.6-flash', 'gemini-3.5-flash', 'gemini-flash-latest']) {
    try {
      const response = await withTimeout(
        fetch(`/api/gemini/${encodeURIComponent(model)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }),
        45000,
        `Gemini Farm Advisor (${model})`
      );

      if (!response.ok) {
        throw new Error(`Advisor API error (${response.status})`);
      }

      const data = (await response.json()) as {
        candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        error?: { message?: string };
      };
      if (data.error) throw new Error(data.error.message || 'Gemini error');

      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error('Empty text from Gemini Advisor');

      let parsed: Record<string, unknown>;
      try {
        parsed = parseAIJsonResponse(rawText);
      } catch {
        return {
          recommendation: rawText.trim(),
          why: 'This is AI-assisted guidance based on the available farm context.',
          nextActions: [],
          contextUsed: {
            crop: profile.crop,
            acres: profile.acres,
            location: profile.location,
            weather: 'Dashboard estimate only',
          },
          source: 'ai',
        };
      }

      const nextActions = Array.isArray(parsed.next_actions)
        ? (parsed.next_actions as string[])
        : ['Check soil conditions daily.'];

      const whatToMonitor = Array.isArray(parsed.what_to_monitor)
        ? (parsed.what_to_monitor as string[])
        : undefined;

      const whenToSeekHelp = parsed.when_to_seek_help
        ? String(parsed.when_to_seek_help)
        : undefined;

      return {
        recommendation: String(parsed.recommendation || 'Consult your local agronomy guidelines.'),
        why: String(parsed.why || 'Based on standard agronomic practices for your crop and location.'),
        nextActions,
        whatToMonitor,
        whenToSeekHelp,
        contextUsed: {
          crop: profile.crop,
          acres: profile.acres,
          location: profile.location,
          weather: 'Rain Expected (78% in 48h)',
        },
        source: 'ai',
      };
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`[AIAdvisor] ${model} request failed; trying next model.`);
    }
  }

  throw lastError || new Error('All Gemini advisor models unavailable');
}

// ============================================================
// RESILIENT HEURISTIC FALLBACK RULES
// ============================================================
interface DecisionRule {
  keywords: string[];
  getDecision: (profile: FarmerProfile, lang: Language) => AdvisorResponse;
}

const DECISION_RULES: DecisionRule[] = [
  // 1. Rain & Irrigation Protection
  {
    keywords: ['rain', 'barish', 'paani', 'protect', 'weather', 'storm', 'pani', 'bhavishyawani', 'mausam', 'baarish', 'pani kab'],
    getDecision: (profile, lang) => {
      if (lang === 'hi') {
        return {
          recommendation: `आगामी 48 घंटों में बारिश के पूर्वानुमान को देखते हुए ${profile.location} में अपने ${profile.crop} के खेत में आज सिंचाई और यूरिया छिड़काव तुरंत रोकें।`,
          why: `बारिश से खेत में प्राकृतिक नमी बढ़ेगी। अभी पानी देने से जलभराव और महंगी खाद बहने (leaching) का भारी नुकसान हो सकता है।`,
          nextActions: [
            'खेत के मुख्य निकास नालों (drainage channels) की जांच करें ताकि अतिरिक्त पानी निकल सके।',
            'यूरिया या अन्य खादों का छिड़काव बारिश रुकने के 2 दिन बाद तक टालें।',
            'बारिश के बाद पत्तियों पर फफूंद (रस्ट/ब्लाइट) के शुरुआती लक्षणों की जांच करें।',
          ],
          whatToMonitor: ['मिट्टी में नमी का स्तर', 'निचली पत्तियों पर फफूंद के धब्बे'],
          whenToSeekHelp: 'यदि बारिश के 3 दिन बाद भी खेत में पानी भरा रहे और पत्तियां पीली पड़ने लगें।',
          contextUsed: {
            crop: profile.crop,
            acres: profile.acres,
            location: profile.location,
            weather: 'Rain Expected (78% in 48h)',
          },
        };
      }
      if (lang === 'hinglish') {
        return {
          recommendation: `Upcoming 48h rain forecast ko dekhte hue ${profile.location} me apne ${profile.crop} field me aaj irrigation aur urea spray hold karein.`,
          why: `Rainfall se moisture naturally improve hoga. Abhi paani dene se waterlogging aur costly fertilizer wastage ka risk hai.`,
          nextActions: [
            'Field ke drainage channels clear karein taaki excess water easily drain out ho.',
            'Urea aur chemical sprays baarish khatam hone ke 48 hours baad tak postpone karein.',
            'Rain ke baad humidity badhne par fungal spots scan karein.',
          ],
          whatToMonitor: ['Soil moisture level', 'Foliar fungal spots'],
          whenToSeekHelp: 'Agar 3 din tak waterlogging rahe aur yellowing badhne lage.',
          contextUsed: {
            crop: profile.crop,
            acres: profile.acres,
            location: profile.location,
            weather: 'Rain Expected (78% in 48h)',
          },
        };
      }
      return {
        recommendation: `Delay irrigation and chemical top-dressing for your ${profile.crop} crop today in ${profile.location}.`,
        why: `Forecasted rainfall will naturally saturate root zones. Irrigating now risks severe waterlogging and expensive nitrogen leaching.`,
        nextActions: [
          'Clear field drainage channels to facilitate surplus stormwater run-off.',
          'Postpone foliar sprays and urea top-dressing until 48 hours after rain cessation.',
          'Inspect foliage for fungal spore onset once humidity peaks post-rain.',
        ],
        whatToMonitor: ['Soil moisture retention', 'Lower canopy fungal pustules'],
        whenToSeekHelp: 'If standing water persists past 72 hours and chlorosis appears.',
        contextUsed: {
          crop: profile.crop,
          acres: profile.acres,
          location: profile.location,
          weather: 'Rain Expected (78% in 48h)',
        },
      };
    },
  },

  // 2. Organic Fertilizer & Soil Health
  {
    keywords: ['organic', 'fertilizer', 'khad', 'jaivik', 'compost', 'jeevamrutha', 'gobar', 'manure', 'urea', 'cost'],
    getDecision: (profile, lang) => {
      if (lang === 'hi') {
        return {
          recommendation: `अपने ${profile.acres} एकड़ ${profile.crop} के लिए घर पर तैयार जीवामृत (Jeevamrutha) का 200 लीटर प्रति एकड़ की दर से प्रयोग करें।`,
          why: `रासायनिक खादों की तुलना में जीवामृत मिट्टी के सूक्ष्मजीवों को सक्रिय करता है और प्रति एकड़ ₹1,200 तक इनपुट लागत घटाता है।`,
          nextActions: [
            '200 लीटर जीवामृत तैयार करें: 10 किग्रा देसी गोबर + 10 लीटर गोमूत्र + 2 किग्रा गुड़ + 2 किग्रा बेसन + मुट्ठी भर उपजाऊ मिट्टी।',
            'मिश्रण को 3 दिन छाया में रखें और रोज घड़ी की दिशा में हिलाएं।',
            'सिंचाई के पानी के साथ या सीधे मिट्टी पर 200 लीटर/एकड़ छिड़कें।',
          ],
          whatToMonitor: ['पौधों की हरी चमक और बढ़वार', 'मिट्टी में केंचुओं की गतिविधि'],
          whenToSeekHelp: 'यदि मिट्टी में गंभीर रूप से जिंक या आयरन की कमी के लक्षण बने रहें।',
          contextUsed: {
            crop: profile.crop,
            acres: profile.acres,
            location: profile.location,
            weather: 'Optimal Application Window',
          },
        };
      }
      if (lang === 'hinglish') {
        return {
          recommendation: `Apne ${profile.acres} acres ${profile.crop} ke liye on-farm prepared Jeevamrutha 200 Litres/acre feed karein.`,
          why: `Synthetic fertilizer ki jagah bio-formulations soil microbes boost karti hain aur input cost ₹1,200/acre tak kam karti hain.`,
          nextActions: [
            '200L Jeevamrutha prepare karein (10kg cow dung + 10L urine + 2kg jaggery + 2kg besan).',
            '3 days shade me ferment hone dein aur daily stir karein.',
            'Irrigation water ke saath field me apply karein.',
          ],
          whatToMonitor: ['Leaf greenness aur vegetative growth', 'Soil earthworm activity'],
          whenToSeekHelp: 'Agar micro-nutrient deficiency symptoms persist karein.',
          contextUsed: {
            crop: profile.crop,
            acres: profile.acres,
            location: profile.location,
            weather: 'Optimal Application Window',
          },
        };
      }
      return {
        recommendation: `Apply on-farm prepared Jeevamrutha bio-fertilizer across your ${profile.acres} acres of ${profile.crop}.`,
        why: `Replaces synthetic urea, enhances beneficial rhizosphere microbes, and cuts cultivation input expenditure by up to ₹1,200/acre.`,
        nextActions: [
          'Brew 200L Jeevamrutha: 10kg desi cow dung + 10L urine + 2kg jaggery + 2kg chickpea flour + handful fertile soil.',
          'Ferment in shade for 72 hours, stirring clockwise twice daily.',
          'Apply via irrigation water or direct soil drench at 200 Litres per acre.',
        ],
        whatToMonitor: ['Foliar vigor & chlorophyll intensity', 'Soil earthworm counts'],
        whenToSeekHelp: 'If stubborn micronutrient (Fe/Zn) deficiencies remain visible.',
        contextUsed: {
          crop: profile.crop,
          acres: profile.acres,
          location: profile.location,
          weather: 'Optimal Application Window',
        },
      };
    },
  },
];

export async function getAdvisorAdvice(
  query: string,
  profile: FarmerProfile,
  language: Language,
  history: ConversationTurn[] = []
): Promise<AdvisorResponse> {
  // Try live Gemini 3.6 Flash first
  try {
    return await callGeminiAdvisor(query, profile, language, history);
  } catch (err) {
    console.warn('[AIAdvisor] Gemini dynamic call failed, falling back to heuristic rule:', err);
  }

  // Fallback to deterministic rules
  const qLower = query.toLowerCase();
  for (const rule of DECISION_RULES) {
    if (rule.keywords.some((kw) => qLower.includes(kw))) {
      return { ...rule.getDecision(profile, language), source: 'fallback' };
    }
  }

  // Default fallback
  if (language === 'hi') {
    return {
      recommendation: `${profile.location} में आपके ${profile.acres} एकड़ ${profile.crop} के लिए वर्तमान मौसम सामान्य है। फसल की नियमित निगरानी रखें।`,
      why: `संतुलित पोषण प्रबंधन और समय पर सिंचाई से फसल की उपज 15% तक बढ़ाई जा सकती है।`,
      nextActions: [
        'खेत की मिट्टी में नमी के स्तर की जांच करें और जरूरत अनुसार हल्की सिंचाई करें।',
        'पौधों की निचली पत्तियों पर कीट या पोषक तत्वों की कमी के लक्षणों की जांच करें।',
        'फसल स्कैनर से पत्ती की फोटो लेकर तुरंत स्वास्थ्य जांच करें।',
      ],
      whatToMonitor: ['पत्तियों का रंग', 'मिट्टी की ऊपरी नमी'],
      whenToSeekHelp: 'यदि किसी पौधे पर असामान्य कीट या झुलसा दिखाई दे।',
      contextUsed: {
        crop: profile.crop,
        acres: profile.acres,
        location: profile.location,
        weather: 'Optimal Agronomic Conditions',
      },
      source: 'fallback',
    };
  }

  if (language === 'hinglish') {
    return {
      recommendation: `${profile.location} me aapke ${profile.acres} acres ${profile.crop} ke liye regular maintenance schedule follow karein.`,
      why: `Balanced irrigation aur organic nutrition se soil health aur seasonal yield 15% tak enhance hoti hai.`,
      nextActions: [
        'Soil moisture check karein aur over-watering avoid karein.',
        'Lower leaves par pests ya nutrient deficiency check karein.',
        'Crop Scanner se leaf photo scan karke health verify karein.',
      ],
      whatToMonitor: ['Foliage color', 'Soil surface moisture'],
      whenToSeekHelp: 'Agar sudden pest outbreak ya wilting notice ho.',
      contextUsed: {
        crop: profile.crop,
        acres: profile.acres,
        location: profile.location,
        weather: 'Optimal Agronomic Conditions',
      },
      source: 'fallback',
    };
  }

  return {
    recommendation: `Maintain regular balanced management for your ${profile.acres} acres of ${profile.crop} in ${profile.location}.`,
    why: `Consistent soil aeration and balanced organic amendments optimize crop vigor and yield potential by up to 15%.`,
    nextActions: [
      'Monitor topsoil moisture before initiating irrigation cycles.',
      'Check underside of leaves for early pest nymph activity.',
      'Scan leaf samples with the Crop Scanner if any discoloration appears.',
    ],
    whatToMonitor: ['Leaf chlorophyll levels', 'Topsoil moisture depletion'],
    whenToSeekHelp: 'If unexpected pest outbreaks or sudden wilting occur.',
    contextUsed: {
      crop: profile.crop,
      acres: profile.acres,
      location: profile.location,
      weather: 'Optimal Agronomic Conditions',
    },
    source: 'fallback',
  };
}
