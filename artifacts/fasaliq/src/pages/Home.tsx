import { Link } from 'wouter';
import { ArrowRight, Sprout, ShieldCheck, TrendingUp, Cpu, Sparkles, LogIn, UserPlus } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export default function Home() {
  const { language, setLanguage, setIsAuthModalOpen, t } = useAppContext();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navbar for Landing */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2.5 text-primary">
          <Sprout className="w-8 h-8" />
          <span className="font-serif text-2xl font-bold tracking-tight">FasalIQ</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Language selector on landing */}
          <div className="flex items-center gap-1 bg-card rounded-full p-1 border border-border shadow-2xs">
            {(
              [
                { code: 'en', label: 'EN' },
                { code: 'hi', label: 'हिन्दी' },
                { code: 'hinglish', label: 'HING' },
              ] as const
            ).map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLanguage(code)}
                className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  language === code
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full border border-border bg-card text-foreground text-xs md:text-sm font-semibold hover:bg-muted transition-all cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>{t('auth_login')}</span>
          </button>

          <Link
            href="/dashboard"
            className="bg-primary text-primary-foreground px-5 py-2 rounded-full font-semibold text-xs md:text-sm hover:bg-primary/90 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
          >
            {t('landing_btn_dashboard')} <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 md:py-24 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-chart-1/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-chart-2/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl w-full text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 bg-card px-4 py-1.5 rounded-full text-xs font-bold text-primary border border-primary/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            <span>{t('landing_badge')}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-bold text-foreground leading-[1.1] tracking-tight">
            {t('landing_title_1')} <br className="hidden md:block" />
            <span className="text-secondary italic">{t('landing_title_highlight')}</span>
          </h1>

          <p className="text-base md:text-xl text-foreground/75 max-w-2xl mx-auto font-medium leading-relaxed">
            {t('landing_subtitle')}
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-base md:text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20 cursor-pointer"
            >
              {t('landing_btn_dashboard')}
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/crop-scanner"
              className="w-full sm:w-auto bg-card text-foreground border border-border px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-muted transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Sprout className="w-5 h-5 text-chart-1" />
              {t('nav_scanner')}
            </Link>

            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="w-full sm:w-auto bg-muted/60 text-foreground border border-border/80 px-6 py-4 rounded-full font-semibold text-sm hover:bg-muted transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-4 h-4 text-primary" />
              {t('auth_signup')}
            </button>
          </div>
        </div>

        {/* Intelligence Trail visualization */}
        <div className="mt-20 w-full max-w-5xl">
          <p className="text-center text-xs font-bold text-muted-foreground tracking-widest uppercase mb-8">
            {t('landing_how_it_works')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                title: t('trail_data'),
                desc: t('trail_data_desc'),
                icon: Sprout,
              },
              {
                title: t('trail_intelligence'),
                desc: t('trail_intel_desc'),
                icon: Cpu,
              },
              {
                title: t('trail_decision'),
                desc: t('trail_decision_desc'),
                icon: ShieldCheck,
              },
              {
                title: t('trail_action'),
                desc: t('trail_action_desc'),
                icon: TrendingUp,
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-card/80 backdrop-blur-xs border border-border p-6 rounded-3xl flex flex-col items-center text-center gap-4 relative shadow-2xs hover:shadow-sm transition-all"
              >
                {idx !== 3 && (
                  <div className="hidden md:block absolute -right-2 top-1/2 -translate-y-1/2 text-border translate-x-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-muted-foreground/40" />
                  </div>
                )}
                <div className="bg-background w-12 h-12 rounded-2xl flex items-center justify-center shadow-xs border border-border/50 text-secondary">
                  <step.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-base text-foreground">{step.title}</h3>
                  <p className="text-xs text-foreground/70 mt-1.5 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
