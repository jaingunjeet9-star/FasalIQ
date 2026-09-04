import { Leaf, ArrowRight, CheckCircle2, Sprout, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'wouter';
import { useAppContext } from '@/context/AppContext';

export default function OrganicAdvisor() {
  const { profile, language, t } = useAppContext();

  const steps = [
    {
      title:
        language === 'hi'
          ? '1. मिट्टी की तैयारी और जैविक खाद'
          : language === 'hinglish'
          ? '1. Soil Prep & FYM Application'
          : '1. Soil Prep & Organic Amendment',
      desc:
        language === 'hi'
          ? `प्रति एकड़ 4 टन अच्छी तरह सड़ी हुई गोबर की खाद (FYM) और 50 किग्रा नीम की खली जुताई के समय मिलाएं।`
          : language === 'hinglish'
          ? `4 tonnes/acre well-decomposed FYM aur 50kg Neem cake final plowing me mix karein.`
          : `Apply 4 tonnes/acre of well-decomposed Farm Yard Manure (FYM) and 50kg Neem cake during final tillage.`,
      status: 'completed',
    },
    {
      title:
        language === 'hi'
          ? `2. ${profile.crop} बीज उपचार`
          : language === 'hinglish'
          ? `2. ${profile.crop} Seed Inoculation`
          : `2. ${profile.crop} Bio-Seed Treatment`,
      desc:
        language === 'hi'
          ? `${profile.crop} के बीजों को बुवाई से पहले एज़ोटोबैक्टर और पीएसबी (PSB) कल्चर से उपचारित करें।`
          : language === 'hinglish'
          ? `${profile.crop} seeds ko Azotobacter aur PSB (Phosphate Solubilizing Bacteria) cultures se treat karein.`
          : `Treat ${profile.crop} seeds with Azotobacter and Phosphate Solubilizing Bacteria (PSB) cultures prior to sowing.`,
      status: 'current',
    },
    {
      title:
        language === 'hi'
          ? '3. प्राकृतिक पोषण प्रबंधन (जीवामृत)'
          : language === 'hinglish'
          ? '3. Bio-Nutrient Management (Jeevamrutha)'
          : '3. Bio-Nutrient Management',
      desc:
        language === 'hi'
          ? 'बुवाई के 30 और 60 दिन बाद 200 लीटर/एकड़ जीवामृत सिंचाई के साथ दें। रासायनिक यूरिया का प्रयोग न करें।'
          : language === 'hinglish'
          ? 'Sowing ke 30 aur 60 days baad 200L/acre Jeevamrutha irrigation ke saath feed karein. Urea avoid karein.'
          : 'Feed 200 Litres/acre Jeevamrutha via irrigation at day 30 and day 60. Avoid synthetic urea top-dressing.',
      status: 'upcoming',
    },
    {
      title:
        language === 'hi'
          ? '4. एकीकृत जैविक कीट नियंत्रण (नीमास्त्र)'
          : language === 'hinglish'
          ? '4. Integrated Pest Defense (Neemastra)'
          : '4. Botanical Pest Defense',
      desc:
        language === 'hi'
          ? 'कीटों के शुरुआती हमले से पहले नीमास्त्र तैयार रखें। खेत के किनारों पर पीले स्टिकी ट्रैप लगाएं।'
          : language === 'hinglish'
          ? 'Early aphid control ke liye Neemastra foliar spray use karein. Field borders par yellow sticky traps lagayein.'
          : 'Deploy Neemastra foliar spray against sucking pests and install yellow sticky traps along field perimeter.',
      status: 'upcoming',
    },
    {
      title:
        language === 'hi'
          ? '5. फसल अवशेष प्रबंधन और जैविक दस्तावेजीकरण'
          : language === 'hinglish'
          ? '5. Residue Mulching & Certification'
          : '5. Residue Mulching & Certification',
      desc:
        language === 'hi'
          ? 'फसल कटाई के बाद अवशेषों (stubble) को खेत में ही मल्च बनाएं। PGS-India जैविक प्रमाणीकरण रिकॉर्ड दर्ज करें।'
          : language === 'hinglish'
          ? 'Harvest ke baad crop residue compost karein. PGS-India organic certification log maintain karein.'
          : 'Incorporate harvest residue back into the soil as in-situ mulch. Maintain PGS-India certification logs.',
      status: 'upcoming',
    },
  ];

  const estimatedSavings = Math.round(1200 * profile.acres);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-chart-1 uppercase tracking-widest mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            {t('trail_action')}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
            {t('org_title')}
          </h1>
          <p className="text-foreground/70 font-medium mt-1">
            {t('org_subtitle')} ({profile.acres} {t('acres')} of {profile.crop} in {profile.location})
          </p>
        </div>
        <div className="bg-chart-1/10 text-chart-1 border border-chart-1/20 px-4 py-2.5 rounded-2xl flex items-center gap-3 shadow-2xs">
          <Leaf className="w-6 h-6" />
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider">{t('org_score_title')}</div>
            <div className="font-serif text-xl font-bold">82/100</div>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-2xs">
            <h2 className="font-serif text-xl font-bold mb-6 text-foreground">
              {t('org_cycle_title')}
            </h2>
            <div className="relative">
              <div className="absolute left-4 top-4 bottom-4 w-px bg-border z-0" />
              <div className="space-y-6 relative z-10">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border-2 bg-background shadow-xs ${
                        step.status === 'completed'
                          ? 'border-chart-1 text-chart-1'
                          : step.status === 'current'
                          ? 'border-primary text-primary font-bold'
                          : 'border-border text-muted-foreground'
                      }`}
                    >
                      {step.status === 'completed' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        <span className="text-xs">{idx + 1}</span>
                      )}
                    </div>
                    <div className="bg-muted/60 p-4 rounded-2xl border border-border/50 flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-foreground text-sm">{step.title}</h3>
                        <span
                          className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            step.status === 'completed'
                              ? 'bg-chart-1/10 text-chart-1'
                              : step.status === 'current'
                              ? 'bg-primary/10 text-primary'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {step.status === 'completed'
                            ? t('org_status_completed')
                            : step.status === 'current'
                            ? t('org_status_current')
                            : t('org_status_upcoming')}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/80 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Summary Cards */}
        <div className="space-y-6">
          <div className="bg-primary text-primary-foreground rounded-3xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="relative z-10 space-y-3">
              <h3 className="font-serif text-lg font-bold text-primary-foreground">
                {t('org_savings_title')}
              </h3>
              <div className="font-serif text-3xl font-bold">
                ₹{estimatedSavings.toLocaleString()}
              </div>
              <p className="text-xs text-primary-foreground/85 leading-relaxed">
                {t('org_savings_desc')}
              </p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-3xl p-6 shadow-2xs space-y-4">
            <h3 className="font-serif text-base font-bold text-foreground flex items-center gap-2">
              <Sprout className="w-5 h-5 text-chart-1" />
              {t('org_bio_inputs_title')}
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-muted/60 rounded-xl border border-border/40 space-y-1">
                <span className="font-bold text-primary block">जीवामृत (Jeevamrutha)</span>
                <p className="text-muted-foreground leading-relaxed">
                  200L पानी + 10kg गाय का गोबर + 10L गोमूत्र + 2kg गुड़ + 2kg बेसन।
                </p>
              </div>

              <div className="p-3 bg-muted/60 rounded-xl border border-border/40 space-y-1">
                <span className="font-bold text-chart-2 block">नीमास्त्र (Neemastra)</span>
                <p className="text-muted-foreground leading-relaxed">
                  100L पानी + 5kg नीम की पत्तियां + 5L गोमूत्र + 2kg गोबर (कीट नियंत्रण)।
                </p>
              </div>
            </div>

            <Link
              href="/advisor"
              className="w-full py-3 bg-card border border-border hover:bg-muted text-foreground text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              {t('nav_advisor')} se puchein <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
