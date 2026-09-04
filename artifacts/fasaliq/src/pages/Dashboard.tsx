import { useState, useEffect } from 'react';
import {
  CloudRain,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Camera,
  Award,
  Sparkles,
  Info,
} from 'lucide-react';
import { Link } from 'wouter';
import { useAppContext } from '@/context/AppContext';
import { fetchLiveWeather, WeatherData } from '@/services/weatherService';
import { getCropMarketRate } from '@/services/marketService';

export default function Dashboard() {
  const { profile, user, language, t } = useAppContext();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoadingWeather, setIsLoadingWeather] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function loadWeather() {
      setIsLoadingWeather(true);
      const data = await fetchLiveWeather();
      if (mounted) {
        setWeather(data);
        setIsLoadingWeather(false);
      }
    }
    loadWeather();
    return () => {
      mounted = false;
    };
  }, []);

  const market = getCropMarketRate(profile.crop);

  // Deterministic calculations based on farm size and crop
  const yieldPerAcre = profile.crop.toLowerCase().includes('mustard') ? 8 : 20; // quintals/acre
  const expectedYield = yieldPerAcre * profile.acres;
  const expectedRevenue = expectedYield * market.modalPrice;
  const costPerAcre = profile.crop.toLowerCase().includes('mustard') ? 14250 : 19900;
  const totalCost = costPerAcre * profile.acres;
  const netProfit = expectedRevenue - totalCost;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t('dash_overview')}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {t('dash_farm_title', { name: profile.name.split(' ')[0] })}
          </h1>
          <p className="text-foreground/70 font-medium mt-1">
            {profile.acres} {t('acres')} • {profile.crop} • {profile.location}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-chart-1/10 text-chart-1 rounded-full text-xs md:text-sm font-semibold border border-chart-1/20 shadow-2xs">
            <ShieldCheck className="w-4 h-4" />
            {t('dash_health_good')}
          </span>
          <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-muted text-muted-foreground rounded-full text-xs font-semibold border border-border">
            {user.isGuest ? t('auth_guest_tag') : t('demo_mode_badge')}
          </span>
        </div>
      </header>

      {/* Intelligence Trail */}
      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <span className="text-primary font-black">{t('trail_data')}</span>
        <ArrowRight className="w-3 h-3" />
        <span className="text-foreground/70">{t('trail_intelligence')}</span>
        <ArrowRight className="w-3 h-3" />
        <span className="text-foreground/70">{t('trail_decision')}</span>
        <ArrowRight className="w-3 h-3" />
        <span className="text-primary font-black">{t('trail_action')}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Weather Card */}
        <div className="bg-card border border-border rounded-3xl p-5 md:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center shadow-xs">
              <CloudRain className="w-6 h-6" />
            </div>
            <div className="text-right">
              <span className="text-2xl md:text-3xl font-serif font-bold text-foreground">
                {weather?.temperature ?? 32}°C
              </span>
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-wider mt-0.5">
                {weather?.condition ?? 'Rain Expected'} ({weather?.rainProbability ?? 78}%)
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">{t('dash_weather_title')}</h3>
            <p className="text-xs md:text-sm text-foreground/70 mb-4 leading-relaxed">
              {language === 'hi'
                ? weather?.advisoryHi
                : language === 'hinglish'
                ? weather?.advisoryHinglish
                : weather?.advisory || t('dash_weather_desc')}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <Link href="/advisor" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                {t('dash_weather_link')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] text-muted-foreground font-medium">
                {weather?.isLive ? '● Live Open-Meteo' : '● ' + t('dash_projected_badge')}
              </span>
            </div>
          </div>
        </div>

        {/* Market Card */}
        <div className="bg-card border border-border rounded-3xl p-5 md:p-6 shadow-2xs flex flex-col justify-between hover:shadow-sm transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-chart-2/10 text-chart-2 rounded-2xl flex items-center justify-center shadow-xs">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-serif font-bold text-chart-2">
                ₹{market.modalPrice.toLocaleString()}
                <span className="text-xs font-sans text-foreground/50 ml-1">/qtl</span>
              </div>
              <div className="text-[10px] font-bold text-chart-1 uppercase tracking-wider mt-0.5">
                MSP: ₹{market.mspRate.toLocaleString()} ({market.trendPercent})
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">
              {profile.crop} {t('dash_market_title')}
            </h3>
            <p className="text-xs md:text-sm text-foreground/70 mb-4 leading-relaxed">
              {market.mandi} • {t('dash_market_desc')}
            </p>
            <div className="flex items-center justify-between pt-2 border-t border-border/50">
              <Link href="/farm-analysis" className="text-xs text-primary font-bold hover:underline flex items-center gap-1">
                {t('dash_market_link')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[10px] text-muted-foreground font-medium">● {t('demo_data_notice')}</span>
            </div>
          </div>
        </div>

        {/* Est Profit Card */}
        <div className="bg-primary text-primary-foreground rounded-3xl p-5 md:p-6 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="relative z-10">
            <div className="text-primary-foreground/80 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5" />
              {t('dash_profit_title')} ({profile.acres} {t('acres')})
            </div>
            <div className="font-serif text-3xl md:text-4xl font-bold mb-4">
              ₹{netProfit.toLocaleString()}
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/20">
              <div>
                <span className="text-primary-foreground/70 block">{t('dash_yield_title')}</span>
                <span className="font-bold">{expectedYield} qtl</span>
              </div>
              <div>
                <span className="text-primary-foreground/70 block">{t('dash_revenue_title')}</span>
                <span className="font-bold">₹{expectedRevenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="pt-4 border-t border-white/20 mt-4 flex items-center justify-between text-xs text-primary-foreground/90 font-medium">
            <Link href="/farm-analysis" className="hover:underline flex items-center gap-1 font-bold">
              {t('view_details')} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <span className="text-[10px] text-white/70">● {t('dash_projected_badge')}</span>
          </div>
        </div>
      </div>

      {/* Quick CTAs Banner */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* Quick Crop Scanner CTA */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-2xs flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              {t('dash_quick_scan_cta')}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('dash_quick_scan_desc')}
            </p>
          </div>
          <Link
            href="/crop-scanner"
            className="bg-primary text-primary-foreground px-5 py-3 rounded-2xl text-xs font-semibold hover:bg-primary/90 transition-all shadow-sm shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            {t('dash_scan_now')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Quick Govt Schemes CTA */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-2xs flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
              <Award className="w-5 h-5 text-chart-2" />
              {t('dash_active_schemes')}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Matched PM-Kisan, PMFBY, PKVY organic assistance & SMAM machinery grants.
            </p>
          </div>
          <Link
            href="/schemes"
            className="bg-card border border-border hover:bg-muted text-foreground px-5 py-3 rounded-2xl text-xs font-semibold transition-all shadow-2xs shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            {t('dash_all_schemes')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
