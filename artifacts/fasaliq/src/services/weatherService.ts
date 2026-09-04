/**
 * FasalIQ Weather Service
 * Connects to Open-Meteo free API for live meteorological data and translates raw metrics into agronomic decisions.
 */

import { Language } from '@/lib/i18n';

export interface WeatherData {
  temperature: number;
  apparentTemperature: number;
  rainProbability: number;
  humidity: number;
  windSpeed: number;
  weatherCode: number;
  condition: string;
  isLive: boolean;
  advisory: string;
  advisoryHi: string;
  advisoryHinglish: string;
}

const KARNAL_COORDINATES = {
  latitude: 29.6857,
  longitude: 76.9905,
};

export async function fetchLiveWeather(
  lat: number = KARNAL_COORDINATES.latitude,
  lon: number = KARNAL_COORDINATES.longitude
): Promise<WeatherData> {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m&hourly=precipitation_probability&forecast_days=2`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Weather API returned ${res.status}`);

    const data = await res.json();
    const current = data.current;
    const hourlyRainProb = data.hourly?.precipitation_probability || [];
    const maxRainProb = hourlyRainProb.slice(0, 48).reduce((max: number, p: number) => Math.max(max, p || 0), 0);

    const temp = Math.round(current.temperature_2m ?? 31);
    const humidity = Math.round(current.relative_humidity_2m ?? 65);
    const wind = Math.round(current.wind_speed_10m ?? 12);
    const rainProb = Math.max(maxRainProb, current.precipitation > 0 ? 80 : 25);

    let advisory = 'Optimal weather conditions for routine field maintenance.';
    let advisoryHi = 'सामान्य कृषि कार्यों के लिए मौसम अनुकूल है।';
    let advisoryHinglish = 'Routine farm management ke liye mausam favorable hai.';

    if (rainProb >= 60) {
      advisory = 'Moderate to heavy rain expected. Consider postponing irrigation and urea application.';
      advisoryHi = 'बारिश की उच्च संभावना। सिंचाई और यूरिया छिड़काव स्थगित करने पर विचार करें।';
      advisoryHinglish = 'Rain expected hai. Irrigation aur urea application postpone karein.';
    } else if (temp > 38) {
      advisory = 'High temperature alert. Ensure adequate soil moisture via evening light irrigation.';
      advisoryHi = 'उच्च तापमान की चेतावनी। शाम के समय हल्की सिंचाई से मिट्टी में नमी बनाए रखें।';
      advisoryHinglish = 'High temperature alert. Evening me light irrigation karke moisture maintain karein.';
    } else if (humidity > 80) {
      advisory = 'Elevated humidity detected. Inspect lower foliage for fungal spore germination.';
      advisoryHi = 'हवा में अधिक नमी। फफूंद जनित रोगों के शुरुआती लक्षणों के लिए पत्तियों की जांच करें।';
      advisoryHinglish = 'High humidity detected. Fungal spores check karne ke liye lower leaves scan karein.';
    }

    return {
      temperature: temp,
      apparentTemperature: Math.round(current.apparent_temperature ?? temp),
      rainProbability: rainProb,
      humidity,
      windSpeed: wind,
      weatherCode: current.weather_code ?? 0,
      condition: rainProb >= 60 ? 'Rain Expected' : temp > 32 ? 'Warm & Sunny' : 'Clear Sky',
      isLive: true,
      advisory,
      advisoryHi,
      advisoryHinglish,
    };
  } catch (err) {
    console.warn('Live weather fetch failed, using reliable demo benchmark:', err);
    return {
      temperature: 32,
      apparentTemperature: 34,
      rainProbability: 78,
      humidity: 68,
      windSpeed: 14,
      weatherCode: 61,
      condition: 'Rain Expected',
      isLive: false,
      advisory: 'Moderate rainfall expected in the next 48 hours. Consider postponing irrigation.',
      advisoryHi: 'अगले 48 घंटों में मध्यम बारिश की संभावना। सिंचाई टालने पर विचार करें।',
      advisoryHinglish: 'Agle 48 hours me rain expected hai. Irrigation postpone karne par dhyan dein.',
    };
  }
}
