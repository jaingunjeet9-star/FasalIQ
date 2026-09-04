import { useState } from 'react';
import { Award, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, Filter } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

interface SchemeItem {
  id: string;
  name: string;
  category: 'Central' | 'State' | 'Organic' | 'Insurance';
  audience: string;
  benefit: string;
  status: 'Verified' | 'Eligible' | 'Recommended';
  link: string;
  matchScore: string;
}

export default function Schemes() {
  const { profile, language, t } = useAppContext();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Central' | 'State' | 'Organic' | 'Insurance'>('All');

  const allSchemes: SchemeItem[] = [
    {
      id: 'pm-kisan',
      name: 'PM-Kisan Samman Nidhi',
      category: 'Central',
      audience:
        language === 'hi'
          ? 'छोटे एवं सीमांत किसान परिवार (< 2 हेक्टेयर / 5 एकड़)'
          : language === 'hinglish'
          ? 'Small & marginal farmers (< 2 hectares / 5 acres)'
          : 'Small & marginal landholder farmer families (< 2 hectares / 5 acres)',
      benefit:
        language === 'hi'
          ? '₹6,000 प्रति वर्ष 3 समान किस्तों में प्रत्यक्ष बैंक खाते में'
          : language === 'hinglish'
          ? '₹6,000/year direct bank transfer in 3 equal installments'
          : '₹6,000 per year direct income support in 3 equal installments of ₹2,000',
      status: 'Verified',
      link: 'https://pmkisan.gov.in',
      matchScore: '100%',
    },
    {
      id: 'pmfby',
      name: 'Pradhan Mantri Fasal Bima Yojana (PMFBY)',
      category: 'Insurance',
      audience:
        language === 'hi'
          ? `${profile.crop} जैसी अधिसूचित फसलों की खेती करने वाले किसान`
          : `${profile.crop} cultivating farmers against non-preventable natural calamities`,
      benefit:
        language === 'hi'
          ? 'मात्र 1.5% से 2% प्रीमियम पर संपूर्ण फसल सुरक्षा और सूखा/बाढ़ का क्लेम'
          : 'Subsidized crop insurance premium (1.5% - 2.0%) with comprehensive calamity coverage',
      status: 'Eligible',
      link: 'https://pmfby.gov.in',
      matchScore: '98%',
    },
    {
      id: 'pkvy',
      name: 'Paramparagat Krishi Vikas Yojana (PKVY)',
      category: 'Organic',
      audience:
        language === 'hi'
          ? `जैविक क्लस्टर खेती और प्राकृतिक खाद अपनाने वाले किसान`
          : `Farmers adopting organic cluster farming and bio-inputs for ${profile.crop}`,
      benefit:
        language === 'hi'
          ? '3 वर्षों में ₹50,000 प्रति हेक्टेयर वित्तीय सहायता और PGS प्रमाणीकरण'
          : '₹50,000 per hectare financial assistance over 3 years for organic bio-inputs & certification',
      status: 'Recommended',
      link: 'https://pgsindia-ncof.gov.in',
      matchScore: '92%',
    },
    {
      id: 'pmksy',
      name: 'Per Drop More Crop (PMKSY - Micro Irrigation)',
      category: 'Central',
      audience:
        language === 'hi'
          ? 'ड्रिप एवं फव्वारा सिंचाई प्रणाली लगाने वाले सभी किसान'
          : 'All farmers adopting drip, sprinkler, and micro-irrigation systems',
      benefit:
        language === 'hi'
          ? 'ड्रिप/स्प्रिंकलर उपकरण स्थापना पर 55% तक सरकारी सब्सिडी'
          : 'Up to 55% subsidy for small & marginal farmers on micro-irrigation installation',
      status: 'Eligible',
      link: 'https://pmksy.gov.in',
      matchScore: '90%',
    },
    {
      id: 'state-scheme',
      name: profile.location.toLowerCase().includes('haryana')
        ? 'Haryana Bhavantar Bharpayee Yojana'
        : 'State Krishi Subsidy & Price Deficiency Grant',
      category: 'State',
      audience:
        language === 'hi'
          ? `${profile.location.split(',')[1]?.trim() || 'राज्य'} के पंजीकृत किसान`
          : `Registered farmers in ${profile.location.split(',')[1]?.trim() || 'State'}`,
      benefit:
        language === 'hi'
          ? 'मंडी भाव कम रहने पर संरक्षित मूल्य अंतर की भरपाई राशि'
          : 'Price deficiency compensation if market rate falls below benchmark cost',
      status: 'Eligible',
      link: 'https://fasal.haryana.gov.in',
      matchScore: '88%',
    },
    {
      id: 'smam',
      name: 'Sub-Mission on Agricultural Mechanization (SMAM)',
      category: 'Central',
      audience:
        language === 'hi'
          ? 'ट्रैक्टर, रोटावेटर और आधुनिक कृषि यंत्र खरीदने वाले किसान'
          : 'Individual farmers and Custom Hiring Centers for agricultural implements',
      benefit:
        language === 'hi'
          ? 'आधुनिक कृषि यंत्रों की खरीद पर 40% से 50% की सीधी सब्सिडी'
          : '40% to 50% subsidy on procurement of tractors, rotavators, and modern farm tools',
      status: 'Eligible',
      link: 'https://agrimachinery.nic.in',
      matchScore: '85%',
    },
  ];

  const filteredSchemes =
    selectedFilter === 'All'
      ? allSchemes
      : allSchemes.filter((s) => s.category === selectedFilter);

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-6">
      <header className="mb-6">
        <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t('trail_action')}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          {t('schemes_title')}
        </h1>
        <p className="text-foreground/70 font-medium mt-1">
          {t('schemes_subtitle')} ({profile.location} • {profile.acres} {t('acres')} • {profile.crop})
        </p>
      </header>

      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-4 px-4 md:mx-0 md:px-0">
        {[
          { key: 'All', label: t('schemes_filter_all') },
          { key: 'Central', label: t('schemes_filter_central') },
          { key: 'State', label: t('schemes_filter_state') },
          { key: 'Organic', label: t('schemes_filter_organic') },
          { key: 'Insurance', label: t('schemes_filter_insurance') },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setSelectedFilter(key as any)}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
              selectedFilter === key
                ? 'bg-primary text-primary-foreground shadow-2xs'
                : 'bg-card text-foreground border border-border hover:bg-muted'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Grid of Schemes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            className="bg-card border border-border rounded-3xl p-6 shadow-2xs hover:shadow-sm transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex justify-between items-start mb-3 gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {scheme.category}
                </span>
                <span className="text-xs font-bold text-chart-1 flex items-center gap-1 bg-chart-1/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {scheme.matchScore} {t('schemes_match_score')}
                </span>
              </div>

              <h3 className="font-serif text-lg font-bold text-foreground mb-2">
                {scheme.name}
              </h3>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-muted-foreground font-bold block mb-0.5">
                    {t('schemes_target_audience')}:
                  </span>
                  <p className="text-foreground/85 leading-relaxed">{scheme.audience}</p>
                </div>

                <div className="pt-2 border-t border-border/50">
                  <span className="text-primary font-bold block mb-0.5">
                    {t('schemes_key_benefit')}:
                  </span>
                  <p className="text-foreground/90 font-medium leading-relaxed">{scheme.benefit}</p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-border/50">
              <a
                href={scheme.link}
                target="_blank"
                rel="noreferrer"
                className="w-full py-2.5 bg-muted hover:bg-muted/80 text-foreground text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {t('schemes_apply_btn')} <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
