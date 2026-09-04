/**
 * FasalIQ Market Intelligence Service
 * Provides Mandi rate benchmarks, official MSP references, and deterministic crop revenue calculations.
 */

export interface MarketCropRate {
  crop: string;
  mspRate: number; // ₹ per quintal
  modalPrice: number; // Current mandi price ₹ per quintal
  trend: 'up' | 'stable' | 'down';
  trendPercent: string;
  mandi: string;
  state: string;
  source: string;
  isLive: boolean;
}

export const MARKET_DATA: Record<string, MarketCropRate> = {
  Wheat: {
    crop: 'Wheat',
    mspRate: 2425,
    modalPrice: 2450,
    trend: 'up',
    trendPercent: '+2.4%',
    mandi: 'Karnal Mandi',
    state: 'Haryana',
    source: 'Agmarknet / MSP 2025-26',
    isLive: false,
  },
  Mustard: {
    crop: 'Mustard',
    mspRate: 5650,
    modalPrice: 5800,
    trend: 'up',
    trendPercent: '+4.1%',
    mandi: 'Rewari / Karnal',
    state: 'Haryana',
    source: 'Agmarknet / MSP 2025-26',
    isLive: false,
  },
  Rice: {
    crop: 'Rice (Paddy)',
    mspRate: 2320,
    modalPrice: 2380,
    trend: 'stable',
    trendPercent: '+0.8%',
    mandi: 'Karnal Mandi',
    state: 'Haryana',
    source: 'Agmarknet / MSP 2025-26',
    isLive: false,
  },
  Cotton: {
    crop: 'Cotton (Medium Staple)',
    mspRate: 7121,
    modalPrice: 7250,
    trend: 'up',
    trendPercent: '+3.2%',
    mandi: 'Sirsa Mandi',
    state: 'Haryana',
    source: 'Agmarknet / MSP 2025-26',
    isLive: false,
  },
  Maize: {
    crop: 'Maize',
    mspRate: 2225,
    modalPrice: 2280,
    trend: 'stable',
    trendPercent: '+1.1%',
    mandi: 'Ambala Mandi',
    state: 'Haryana',
    source: 'Agmarknet / MSP 2025-26',
    isLive: false,
  },
  Potato: {
    crop: 'Potato',
    mspRate: 1200,
    modalPrice: 1350,
    trend: 'down',
    trendPercent: '-1.5%',
    mandi: 'Kurukshetra Mandi',
    state: 'Haryana',
    source: 'Agmarknet Reference',
    isLive: false,
  },
  Tomato: {
    crop: 'Tomato',
    mspRate: 1400,
    modalPrice: 1650,
    trend: 'up',
    trendPercent: '+5.0%',
    mandi: 'Sonipat Mandi',
    state: 'Haryana',
    source: 'Agmarknet Reference',
    isLive: false,
  },
  Sugarcane: {
    crop: 'Sugarcane (FRP)',
    mspRate: 340,
    modalPrice: 386, // State Advised Price
    trend: 'stable',
    trendPercent: '0.0%',
    mandi: 'Karnal Sugar Mill',
    state: 'Haryana',
    source: 'Haryana SAP Benchmark',
    isLive: false,
  },
  Chickpea: {
    crop: 'Chickpea (Gram)',
    mspRate: 5440,
    modalPrice: 5620,
    trend: 'up',
    trendPercent: '+2.8%',
    mandi: 'Hisar Mandi',
    state: 'Haryana',
    source: 'Agmarknet / MSP 2025-26',
    isLive: false,
  },
  Soybean: {
    crop: 'Soybean',
    mspRate: 4892,
    modalPrice: 4950,
    trend: 'stable',
    trendPercent: '+1.0%',
    mandi: 'Indore / Regional Benchmark',
    state: 'National',
    source: 'Agmarknet / MSP 2025-26',
    isLive: false,
  },
};

export function getCropMarketRate(cropName: string): MarketCropRate {
  const match = Object.keys(MARKET_DATA).find(
    (k) => k.toLowerCase() === cropName.toLowerCase() || cropName.toLowerCase().includes(k.toLowerCase())
  );
  return match ? MARKET_DATA[match] : MARKET_DATA.Wheat;
}
