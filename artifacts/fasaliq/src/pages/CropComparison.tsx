import { Scale, Droplet, ShieldAlert, Check, Sparkles, ArrowRight } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import { getCropMarketRate } from '@/services/marketService';

export default function CropComparison() {
  const { profile, updateProfile, language, t } = useAppContext();

  // Baseline data per acre
  const cropCatalog = [
    {
      name: 'Wheat',
      yieldPerAcre: 20, // qtl
      costPerAcre: 19900,
      price: getCropMarketRate('Wheat').modalPrice,
      riskKey: 'comp_risk_low',
      waterKey: 'comp_water_moderate',
      waterScore: 'Moderate',
    },
    {
      name: 'Mustard',
      yieldPerAcre: 8, // qtl
      costPerAcre: 14250,
      price: getCropMarketRate('Mustard').modalPrice,
      riskKey: 'comp_risk_medium',
      waterKey: 'comp_water_low',
      waterScore: 'Low',
    },
    {
      name: 'Potato',
      yieldPerAcre: 120, // qtl
      costPerAcre: 37500,
      price: getCropMarketRate('Potato').modalPrice,
      riskKey: 'comp_risk_high',
      waterKey: 'comp_water_high',
      waterScore: 'High',
    },
    {
      name: 'Cotton',
      yieldPerAcre: 9, // qtl
      costPerAcre: 21000,
      price: getCropMarketRate('Cotton').modalPrice,
      riskKey: 'comp_risk_high',
      waterKey: 'comp_water_high',
      waterScore: 'High',
    },
    {
      name: 'Maize',
      yieldPerAcre: 22, // qtl
      costPerAcre: 16500,
      price: getCropMarketRate('Maize').modalPrice,
      riskKey: 'comp_risk_medium',
      waterKey: 'comp_water_moderate',
      waterScore: 'Moderate',
    },
  ];

  const acres = profile.acres || 2;

  const comparisonData = cropCatalog.map((c) => {
    const isCurrent = profile.crop.toLowerCase().includes(c.name.toLowerCase());
    const totalYield = c.yieldPerAcre * acres;
    const inputCost = c.costPerAcre * acres;
    const revenue = totalYield * c.price;
    const profit = revenue - inputCost;

    return {
      ...c,
      isCurrent,
      totalYield: `${totalYield} qtl`,
      inputCostFormatted: `₹${inputCost.toLocaleString()}`,
      revenueFormatted: `₹${revenue.toLocaleString()}`,
      profitFormatted: `₹${profit.toLocaleString()}`,
      profitRaw: profit,
    };
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      <header className="mb-6">
        <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t('trail_decision')}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          {t('comp_title')}
        </h1>
        <p className="text-foreground/70 font-medium mt-1">
          {t('comp_subtitle')} ({acres} {t('acres')} in {profile.location})
        </p>
      </header>

      <div className="overflow-x-auto pb-4 -mx-4 px-4 md:mx-0 md:px-0">
        <div className="inline-flex gap-4 min-w-full">
          {comparisonData.map((crop, idx) => (
            <div
              key={idx}
              className={`w-72 shrink-0 rounded-3xl border p-5 flex flex-col justify-between relative shadow-2xs transition-all ${
                crop.isCurrent
                  ? 'bg-primary/5 border-primary shadow-sm ring-1 ring-primary/30'
                  : 'bg-card border-border hover:border-border/80'
              }`}
            >
              {crop.isCurrent && (
                <div className="absolute -top-3 right-4 bg-primary text-primary-foreground text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs flex items-center gap-1">
                  <Check className="w-3 h-3" /> {t('comp_current_crop')}
                </div>
              )}

              <div>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl font-bold text-foreground">{crop.name}</h3>
                  <div className="text-right">
                    <div className="text-sm font-bold text-primary">{crop.profitFormatted}</div>
                    <div className="text-[10px] text-muted-foreground uppercase">
                      {t('comp_net_profit')}
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs py-3 border-t border-b border-border/60">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('comp_est_yield')}</span>
                    <span className="font-semibold text-foreground">{crop.totalYield}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('comp_input_cost')}</span>
                    <span className="font-semibold text-foreground">{crop.inputCostFormatted}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{t('comp_est_revenue')}</span>
                    <span className="font-semibold text-foreground">{crop.revenueFormatted}</span>
                  </div>
                </div>

                <div className="pt-3 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5" /> {t('comp_risk_level')}
                    </span>
                    <span
                      className={`font-semibold ${
                        crop.riskKey === 'comp_risk_low'
                          ? 'text-chart-1'
                          : crop.riskKey === 'comp_risk_medium'
                          ? 'text-chart-2'
                          : 'text-destructive'
                      }`}
                    >
                      {t(crop.riskKey as any)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5" /> {t('comp_water_need')}
                    </span>
                    <span className="font-semibold text-foreground">{t(crop.waterKey as any)}</span>
                  </div>
                </div>
              </div>

              <div className="pt-5 mt-auto">
                <button
                  onClick={() => updateProfile({ crop: crop.name })}
                  disabled={crop.isCurrent}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                    crop.isCurrent
                      ? 'bg-muted text-muted-foreground cursor-default'
                      : 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-2xs'
                  }`}
                >
                  {crop.isCurrent ? t('comp_selected') : t('comp_switch_btn')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
