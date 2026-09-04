import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowRight, IndianRupee, Tractor, Sprout, TrendingUp, Info, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { useAppContext } from '@/context/AppContext';
import { getCropMarketRate } from '@/services/marketService';

export default function FarmAnalysis() {
  const { profile, language, t } = useAppContext();
  const market = getCropMarketRate(profile.crop);

  // Baseline per-acre costs
  const baseCosts = {
    Seed: 1600 * profile.acres,
    Fertilizer: 4250 * profile.acres,
    Irrigation: 2000 * profile.acres,
    Labor: 6000 * profile.acres,
    Machinery: 3250 * profile.acres,
    Pesticides: 2800 * profile.acres,
  };

  const [costs, setCosts] = useState(baseCosts);
  const [sellingPrice, setSellingPrice] = useState(market.modalPrice);
  const [expectedYieldPerAcre, setExpectedYieldPerAcre] = useState(
    profile.crop.toLowerCase().includes('mustard') ? 8 : 20
  );

  const getCategoryLabel = (key: string) => {
    switch (key) {
      case 'Seed': return t('econ_cost_seed');
      case 'Fertilizer': return t('econ_cost_fertilizer');
      case 'Irrigation': return t('econ_cost_irrigation');
      case 'Labor': return t('econ_cost_labor');
      case 'Machinery': return t('econ_cost_machinery');
      case 'Pesticides': return t('econ_cost_pesticides');
      default: return key;
    }
  };

  const economicsData = [
    { category: getCategoryLabel('Seed'), cost: costs.Seed },
    { category: getCategoryLabel('Fertilizer'), cost: costs.Fertilizer },
    { category: getCategoryLabel('Irrigation'), cost: costs.Irrigation },
    { category: getCategoryLabel('Labor'), cost: costs.Labor },
    { category: getCategoryLabel('Machinery'), cost: costs.Machinery },
    { category: getCategoryLabel('Pesticides'), cost: costs.Pesticides },
  ];

  // Deterministic calculations
  const totalCost = Object.values(costs).reduce((acc, curr) => acc + curr, 0);
  const totalYield = expectedYieldPerAcre * profile.acres; // quintals
  const expectedRevenue = totalYield * sellingPrice;
  const netProfit = expectedRevenue - totalCost;
  const profitPerAcre = profile.acres > 0 ? Math.round(netProfit / profile.acres) : 0;
  const marginPercent = expectedRevenue > 0 ? ((netProfit / expectedRevenue) * 100).toFixed(1) : '0';

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t('nav_economics')}
          </div>
          <h1 className="font-serif text-3xl font-bold text-foreground">{t('econ_title')}</h1>
          <p className="text-foreground/70 font-medium mt-1">
            {t('econ_subtitle')} ({profile.acres} {t('acres')} • {profile.crop})
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-xl border border-border flex items-center gap-1.5 font-medium">
            <Info className="w-3.5 h-3.5 text-primary" /> {t('econ_projected_badge')}
          </span>
        </div>
      </header>

      {/* High-level KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-3xl p-4 md:p-5 shadow-2xs">
          <div className="text-muted-foreground mb-2">
            <Tractor className="w-5 h-5 text-destructive" />
          </div>
          <div className="text-xs font-semibold text-foreground/70">{t('econ_input_cost')}</div>
          <div className="text-2xl font-serif font-bold text-destructive mt-1">
            ₹{totalCost.toLocaleString()}
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            ₹{Math.round(totalCost / profile.acres).toLocaleString()} {t('econ_per_acre')}
          </div>
        </div>

        <div className="bg-card border border-border rounded-3xl p-4 md:p-5 shadow-2xs">
          <div className="text-muted-foreground mb-2">
            <Sprout className="w-5 h-5 text-chart-1" />
          </div>
          <div className="text-xs font-semibold text-foreground/70">{t('econ_est_revenue')}</div>
          <div className="text-2xl font-serif font-bold text-chart-1 mt-1">
            ₹{expectedRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-muted-foreground mt-1">
            {totalYield} qtl @ ₹{sellingPrice}/qtl
          </div>
        </div>

        <div className="bg-primary text-primary-foreground rounded-3xl p-4 md:p-5 col-span-2 shadow-md relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-28 h-28 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div>
            <div className="text-primary-foreground/80 mb-2">
              <IndianRupee className="w-5 h-5" />
            </div>
            <div className="text-xs font-semibold text-primary-foreground/80">{t('econ_net_profit')}</div>
            <div className="text-3xl md:text-4xl font-serif font-bold mt-1">
              ₹{netProfit.toLocaleString()}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-3 text-xs text-primary-foreground/90 font-medium">
            <span className="bg-black/20 px-2.5 py-1 rounded-md backdrop-blur-xs font-semibold">
              {marginPercent}% {t('econ_profit_margin')}
            </span>
            <span>
              ₹{profitPerAcre.toLocaleString()} {t('econ_per_acre')}
            </span>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-card border border-border rounded-3xl p-6 shadow-2xs">
          <h3 className="font-serif text-lg font-bold text-foreground mb-6">
            {t('econ_cost_breakdown')}
          </h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={economicsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="category" tick={{ fontSize: 11 }} interval={0} stroke="#888" />
                <YAxis tick={{ fontSize: 11 }} stroke="#888" />
                <Tooltip
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Cost']}
                  contentStyle={{
                    backgroundColor: 'var(--card)',
                    borderRadius: '12px',
                    borderColor: 'var(--border)',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="cost" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cost Optimization Panel */}
        <div className="bg-card border border-border rounded-3xl p-6 shadow-2xs flex flex-col justify-between space-y-4">
          <div>
            <div className="w-10 h-10 bg-chart-1/10 text-chart-1 rounded-2xl flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-bold text-foreground mb-2">
              {t('econ_optimization_title')}
            </h3>
            <p className="text-xs text-foreground/75 leading-relaxed">
              {t('econ_optimization_desc')}
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <Link
              href="/organic-advisor"
              className="p-3 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-between transition-colors text-xs font-semibold text-foreground cursor-pointer"
            >
              <div>
                <div className="font-bold text-primary">{t('econ_opt_organic')}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {t('econ_opt_organic_sub')}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>

            <Link
              href="/crop-comparison"
              className="p-3 bg-muted hover:bg-muted/80 rounded-2xl flex items-center justify-between transition-colors text-xs font-semibold text-foreground cursor-pointer"
            >
              <div>
                <div className="font-bold text-primary">{t('econ_opt_compare')}</div>
                <div className="text-[11px] text-muted-foreground mt-0.5">
                  {t('econ_opt_compare_sub')}
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </div>

      {/* Indicative Disclaimer Note */}
      <div className="bg-background border border-border/80 rounded-2xl p-4 text-xs text-muted-foreground flex items-center gap-2.5">
        <Info className="w-4 h-4 text-primary shrink-0" />
        <span>{t('econ_indicative_note')}</span>
      </div>
    </div>
  );
}
