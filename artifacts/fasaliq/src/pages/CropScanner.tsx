import { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  AlertCircle,
  CheckCircle2,
  RefreshCw,
  AlertTriangle,
  Loader,
  ChevronRight,
  ShieldCheck,
  Bug,
  Droplets,
  Sparkles,
  Info,
  Calendar,
  Activity,
  Layers,
  HelpCircle,
  Clock,
  ShieldAlert,
  Leaf,
} from 'lucide-react';
import { Link } from 'wouter';
import { useAppContext } from '@/context/AppContext';
import {
  analyzeCropImage,
  formatConfidence,
  isCropDetectionConfident,
  getManualCropHealthAnalysis,
  type CropAnalysisResult,
} from '@/services/cropAnalysisService';

type Step = 'upload' | 'scanning' | 'result' | 'manual-select';

const SUPPORTED_MANUAL_CROPS = [
  'Mustard',
  'Rice',
  'Wheat',
  'Tomato',
  'Potato',
  'Cotton',
  'Maize',
  'Sugarcane',
  'Chickpea',
  'Soybean',
  'Chili',
  'Onion',
];

export default function CropScanner() {
  const [step, setStep] = useState<Step>('upload');
  const [analysisResult, setAnalysisResult] = useState<CropAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null);
  const [scanningMessageIndex, setScanningMessageIndex] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scanRequestIdRef = useRef(0);
  const { language, profile, t } = useAppContext();

  const scanningMessages = [
    t('scanner_step_uploading'),
    t('scanner_step_analyzing'),
    t('scanner_step_pathology'),
    t('scanner_step_recommendations'),
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'scanning') {
      interval = setInterval(() => {
        setScanningMessageIndex((prev) => (prev + 1) % scanningMessages.length);
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [step, scanningMessages.length]);

  const handleFileSelect = async (file: File | null) => {
    if (!file) return;

    const requestId = ++scanRequestIdRef.current;

    if (!file.type.startsWith('image/')) {
      setError(
        language === 'hi'
          ? 'कृपया केवल छवि फ़ाइल (JPG, PNG, WebP) अपलोड करें।'
          : 'Please upload a valid image file (JPG, PNG, WebP).'
      );
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(
        language === 'hi'
          ? 'तस्वीर का आकार 10MB से कम होना चाहिए।'
          : 'Image size must be smaller than 10MB.'
      );
      return;
    }

    try {
      if (selectedImagePreview) URL.revokeObjectURL(selectedImagePreview);
      const previewUrl = URL.createObjectURL(file);
      setSelectedImagePreview(previewUrl);

      // Reset previous result fully before starting new scan
      setAnalysisResult(null);
      setError(null);
      setStep('scanning');
      setScanningMessageIndex(0);

      const result = await analyzeCropImage(file, language, profile);

      if (requestId !== scanRequestIdRef.current) return;

      setAnalysisResult(result);

      // analysisSource distinguishes: 'system_error' (API down) vs 'ai_uncertain' (AI couldn't identify) vs 'ai' (success)
      if (result.analysisSource === 'system_error') {
        // API/network failure — check if it's a key issue or real network issue
        const isKeyError = result.rawResponse?.includes('invalid') || result.rawResponse?.includes('not configured') || result.rawResponse?.includes('key');
        setError(
          isKeyError
            ? (language === 'hi'
                ? 'Gemini API key अमान्य है। .env.local में सही GEMINI_API_KEY सेट करें और सर्वर रीस्टार्ट करें।'
                : language === 'hinglish'
                ? 'Gemini API key invalid hai. .env.local mein sahi GEMINI_API_KEY set karein aur server restart karein.'
                : 'Invalid Gemini API key. Set a valid GEMINI_API_KEY in .env.local and restart the API server.')
            : (language === 'hi'
                ? 'AI विश्लेषण अभी उपलब्ध नहीं है। कृपया दोबारा प्रयास करें।'
                : language === 'hinglish'
                ? 'AI analysis abhi available nahi hai. Dobara try karein.'
                : 'AI analysis is currently unavailable. Please try again.')
        );
        setStep('manual-select');
      } else if (result.analysisSource === 'ai_uncertain' || result.cropName === 'Unknown' || !isCropDetectionConfident(result.cropConfidence)) {
        // AI genuinely uncertain — show manual selection
        setStep('manual-select');
      } else {
        // Confident AI result — show results
        setStep('result');
      }
    } catch (err) {
      if (requestId !== scanRequestIdRef.current) return;
      console.error('[CropScanner] Unexpected error:', err);
      setError(
        language === 'hi'
          ? 'फ़ाइल पढ़ने में त्रुटि हुई। कृपया दूसरी छवि आज़माएं।'
          : 'Error reading image file. Please try a different image.'
      );
      setStep('upload');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleManualCropSelect = (crop: string) => {
    const manualResult = getManualCropHealthAnalysis(crop, language);
    setAnalysisResult(manualResult);
    setStep('result');
  };

  const handleReset = () => {
    scanRequestIdRef.current += 1;
    setStep('upload');
    setAnalysisResult(null);
    setError(null);
    if (selectedImagePreview) URL.revokeObjectURL(selectedImagePreview);
    setSelectedImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const getHealthStatusBadge = () => {
    if (!analysisResult) return null;
    const { healthStatus } = analysisResult;

    if (healthStatus === 'severe_concern') {
      return {
        label: t('scanner_health_severe_concern'),
        color: 'bg-destructive/15 text-destructive border-destructive/30',
        icon: AlertTriangle,
      };
    }
    if (healthStatus === 'at_risk') {
      return {
        label: t('scanner_health_at_risk'),
        color: 'bg-chart-2/15 text-chart-2 border-chart-2/30',
        icon: AlertCircle,
      };
    }
    if (healthStatus === 'moderate_concern') {
      return {
        label: t('scanner_health_moderate_concern'),
        color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30',
        icon: Info,
      };
    }
    return {
      label: t('scanner_health_healthy'),
      color: 'bg-chart-1/15 text-chart-1 border-chart-1/30',
      icon: CheckCircle2,
    };
  };

  const statusBadge = getHealthStatusBadge();

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto space-y-8">
      <header>
        <div className="text-xs font-bold text-secondary uppercase tracking-widest mb-1 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          {t('trail_intelligence')}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground">
          {t('scanner_title')}
        </h1>
        <p className="text-foreground/70 font-medium mt-1">{t('scanner_subtitle')}</p>
      </header>

      {/* UPLOAD STEP */}
      {step === 'upload' && (
        <div className="space-y-6">
          <div
            className="border-2 border-dashed border-border rounded-3xl p-10 md:p-14 flex flex-col items-center justify-center bg-card/60 text-center hover:border-primary transition-all cursor-pointer group shadow-xs hover:shadow-md"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="w-20 h-20 bg-primary/10 text-primary rounded-3xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:bg-primary/20 transition-all shadow-xs">
              <Camera className="w-10 h-10" />
            </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold mb-2 text-foreground">
              {t('scanner_upload_card_title')}
            </h3>
            <p className="text-xs md:text-sm text-foreground/70 max-w-lg mb-8 leading-relaxed">
              {t('scanner_upload_card_desc')}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleInputChange}
              className="hidden"
              aria-label="Upload crop image"
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-md shadow-primary/20 cursor-pointer"
            >
              <Upload className="w-4 h-4" /> {t('scanner_btn_choose')}
            </button>
          </div>

          {error && (
            <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-2xl text-sm text-destructive flex gap-3 items-start animate-in fade-in">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="bg-card border border-border p-4 sm:p-5 rounded-2xl text-xs md:text-sm text-muted-foreground flex gap-3.5 items-start shadow-xs">
            <ShieldCheck className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-foreground font-semibold">
                {t('scanner_disclaimer_title')}:
              </strong>{' '}
              {t('scanner_disclaimer_desc')}
            </div>
          </div>
        </div>
      )}

      {/* SCANNING STEP */}
      {step === 'scanning' && (
        <div className="min-h-[360px] flex flex-col items-center justify-center space-y-6 bg-card border border-border rounded-3xl p-8 sm:p-12 text-center shadow-xs animate-in fade-in duration-300">
          {selectedImagePreview && (
            <div className="relative">
              <img
                src={selectedImagePreview}
                alt="Crop preview"
                className="w-32 h-32 rounded-3xl object-cover border-2 border-primary/40 shadow-lg"
              />
              <div className="absolute inset-0 rounded-3xl bg-primary/10 animate-pulse" />
            </div>
          )}

          <div className="relative w-14 h-14">
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
            <div className="absolute inset-0 border-4 border-primary rounded-full border-t-transparent animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader className="w-5 h-5 text-primary animate-pulse" />
            </div>
          </div>

          <div className="space-y-1.5 max-w-md">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
              {scanningMessages[scanningMessageIndex]}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t('scanner_analyzing_desc')}
            </p>
          </div>
        </div>
      )}

      {/* RESULT STEP - 10 DEEP AGRICULTURAL DIAGNOSTIC CATEGORIES */}
      {step === 'result' && analysisResult && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Header Card: Specimen Image + Identification Summary */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            {selectedImagePreview && (
              <div className="w-full md:w-56 h-56 rounded-2xl overflow-hidden border border-border shadow-xs shrink-0 bg-black/5 flex items-center justify-center">
                <img
                  src={selectedImagePreview}
                  alt="Uploaded specimen"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="flex-1 w-full space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
                <span className="text-[11px] font-bold text-secondary uppercase tracking-widest">
                  {t('scanner_detected_crop')}
                </span>
                {statusBadge && (
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusBadge.color}`}
                  >
                    <statusBadge.icon className="w-3.5 h-3.5" />
                    {statusBadge.label}
                  </span>
                )}
              </div>

              <div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground flex items-center flex-wrap gap-2.5">
                  <span>{analysisResult.cropName}</span>
                  <span className="text-xs font-semibold px-3 py-1 bg-muted border border-border rounded-full text-foreground/80">
                    {analysisResult.cropConfidence >= 0.8
                      ? t('scanner_confidence_high')
                      : analysisResult.cropConfidence >= 0.6
                      ? t('scanner_confidence_likely')
                      : t('scanner_confidence_low')}{' '}
                    ({formatConfidence(analysisResult.cropConfidence)})
                  </span>
                </h2>
                <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-medium mt-2">
                  <span>
                    <strong>{t('scanner_crop_family')}:</strong> {analysisResult.cropFamily}
                  </span>
                  <span>•</span>
                  <span>
                    <strong>{t('scanner_growth_stage')}:</strong> {analysisResult.growthStage}
                  </span>
                </div>
              </div>

              {/* Farmer Simple Explanation */}
              <div className="bg-background/80 p-4 rounded-2xl border border-border/60 text-xs sm:text-sm text-foreground/90 leading-relaxed shadow-2xs">
                <strong className="text-primary font-bold block mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {t('scanner_simple_summary_title')}
                </strong>
                {analysisResult.simpleExplanation}
              </div>

              {/* Context Discrepancy Alert */}
              {analysisResult.contextComparison.discrepancyNote && (
                <div className="bg-amber-500/10 border border-amber-500/20 p-3.5 rounded-xl text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2.5">
                  <Info className="w-4 h-4 shrink-0 mt-0.5" />
                  <p>
                    {t('scanner_discrepancy_alert', {
                      profileCrop: analysisResult.contextComparison.dashboardCrop,
                    })}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Grid of Diagnostic Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 1. Visual Observations */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                <Leaf className="w-5 h-5 text-chart-1" />
                {t('scanner_observations_title')}
              </h3>
              <ul className="space-y-2">
                {analysisResult.visualObservations.map((obs, i) => (
                  <li key={i} className="flex gap-2.5 text-xs sm:text-sm text-foreground/85 items-start">
                    <span className="w-1.5 h-1.5 bg-chart-1 rounded-full shrink-0 mt-1.5" />
                    <span className="leading-relaxed">{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Disease & Pathology Analysis */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-destructive" />
                {t('scanner_disease_title')}
              </h3>

              {analysisResult.diseaseAnalysis.suspectedDisease ? (
                <div className="space-y-2.5 text-xs sm:text-sm">
                  <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-xl">
                    <div className="font-bold text-destructive text-sm">
                      {analysisResult.diseaseAnalysis.suspectedDisease}
                    </div>
                    {analysisResult.diseaseAnalysis.whySuspected && (
                      <p className="text-foreground/80 mt-1 leading-relaxed text-xs">
                        {analysisResult.diseaseAnalysis.whySuspected}
                      </p>
                    )}
                  </div>
                  {analysisResult.diseaseAnalysis.symptoms.length > 0 && (
                    <div>
                      <span className="font-bold text-xs uppercase text-muted-foreground block mb-1">
                        Observed Symptoms:
                      </span>
                      <ul className="list-disc list-inside text-xs text-foreground/80 space-y-0.5">
                        {analysisResult.diseaseAnalysis.symptoms.map((s, idx) => (
                          <li key={idx}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-chart-1/10 rounded-xl border border-chart-1/20 text-chart-1 text-xs sm:text-sm font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>{t('scanner_no_issue')}</span>
                </div>
              )}
            </div>

            {/* 3. Pest & Insect Screening */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                <Bug className="w-5 h-5 text-chart-2" />
                {t('scanner_pest_title')}
              </h3>
              {analysisResult.pestAnalysis.suspectedPest ? (
                <div className="p-3 bg-chart-2/10 border border-chart-2/20 rounded-xl text-xs sm:text-sm">
                  <span className="font-bold text-chart-2 block text-sm">
                    {analysisResult.pestAnalysis.suspectedPest}
                  </span>
                  <p className="text-foreground/80 mt-1 leading-relaxed text-xs">
                    {analysisResult.pestAnalysis.evidence}
                  </p>
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  No active sucking pests, caterpillars, or foliar insect bites observed.
                </p>
              )}
            </div>

            {/* 4. Nutrient Deficiencies & Stress */}
            <div className="bg-card border border-border rounded-3xl p-6 shadow-xs space-y-3">
              <h3 className="font-serif text-lg font-bold text-foreground flex items-center gap-2">
                <Droplets className="w-5 h-5 text-blue-600" />
                {t('scanner_nutrient_title')}
              </h3>
              {analysisResult.nutrientDeficiencies.length > 0 ? (
                <div className="space-y-2">
                  {analysisResult.nutrientDeficiencies.map((nd, idx) => (
                    <div key={idx} className="p-2.5 bg-background border border-border/60 rounded-xl text-xs">
                      <span className="font-bold text-foreground">{nd.nutrient}:</span>{' '}
                      <span className="text-foreground/80">{nd.visualSymptoms}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Nutrient uptake appears balanced with healthy leaf coloration.
                </p>
              )}
            </div>
          </div>

          {/* 5. Four-Tier Action Plan */}
          <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-xl font-bold text-foreground flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-primary" />
              {t('scanner_recommendations_title')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Immediate */}
              <div className="bg-background/80 p-4 rounded-2xl border border-border/60 space-y-2">
                <span className="text-xs font-bold text-primary uppercase tracking-wider block flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {t('scanner_rec_immediate')}
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/85">
                  {analysisResult.recommendedActions.immediate.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-chart-1 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Short term (3-7 days) */}
              <div className="bg-background/80 p-4 rounded-2xl border border-border/60 space-y-2">
                <span className="text-xs font-bold text-chart-2 uppercase tracking-wider block flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {t('scanner_rec_short_term')}
                </span>
                <ul className="space-y-1.5 text-xs sm:text-sm text-foreground/85">
                  {analysisResult.recommendedActions.next3to7Days.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-chart-2 rounded-full shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Prevention & When to Seek Help */}
            <div className="pt-4 border-t border-border/60 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <strong className="text-foreground block">{t('scanner_prevention_title')}:</strong>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground text-xs">
                  {analysisResult.prevention.map((prev, idx) => (
                    <li key={idx}>{prev}</li>
                  ))}
                </ul>
              </div>

              <div className="space-y-1.5">
                <strong className="text-destructive block">{t('scanner_rec_expert_help')}:</strong>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  {analysisResult.recommendedActions.whenToSeekHelp}
                </p>
                <div className="pt-2">
                  <span className="text-xs font-bold text-foreground/80">
                    {t('scanner_rescan_title')}:{' '}
                  </span>
                  <span className="text-xs text-muted-foreground">{analysisResult.whenToRescan}</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between">
              <Link
                href="/advisor"
                className="w-full sm:w-auto bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-semibold text-xs sm:text-sm shadow-md hover:bg-primary/90 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {t('scanner_btn_ask_advisor')} <ChevronRight className="w-4 h-4" />
              </Link>

              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-3 bg-card border border-border rounded-2xl text-xs sm:text-sm font-bold text-foreground/80 hover:bg-muted transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> {t('scanner_btn_scan_another')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MANUAL SELECT FALLBACK */}
      {step === 'manual-select' && (
        <div className="space-y-6 animate-in fade-in duration-300">
          {selectedImagePreview && (
            <div className="rounded-3xl overflow-hidden border border-border shadow-xs max-h-72 bg-black/5 flex justify-center">
              <img
                src={selectedImagePreview}
                alt="Uploaded specimen"
                className="w-full max-h-72 object-contain"
              />
            </div>
          )}

          <div className={`bg-card border ${analysisResult?.analysisSource === 'system_error' ? 'border-destructive/40' : 'border-chart-2/40'} p-6 sm:p-8 rounded-3xl shadow-sm space-y-4`}>
            <div className={`flex items-center gap-2 ${analysisResult?.analysisSource === 'system_error' ? 'text-destructive' : 'text-chart-2'}`}>
              {analysisResult?.analysisSource === 'system_error'
                ? <AlertCircle className="w-5 h-5 shrink-0" />
                : <AlertTriangle className="w-5 h-5 shrink-0" />
              }
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground">
                {analysisResult?.analysisSource === 'system_error'
                  ? (language === 'hi' ? 'AI विश्लेषण अनुपलब्ध' : 'AI Analysis Unavailable')
                  : t('scanner_uncertain_title')
                }
              </h2>
            </div>
            <p className="text-foreground/75 text-xs sm:text-sm leading-relaxed">
              {/* Show the specific error message set by handleFileSelect */}
              {error || (analysisResult?.analysisSource === 'system_error'
                ? 'Could not connect to AI for analysis. Please check your API key and try again.'
                : t('scanner_uncertain_desc')
              )}
            </p>

            {/* Retry button — only show for system errors */}
            {analysisResult?.analysisSource === 'system_error' && (
              <button
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.click();
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-destructive text-destructive-foreground rounded-xl text-xs sm:text-sm font-semibold hover:bg-destructive/90 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" /> Retry Analysis
              </button>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-2">
              {SUPPORTED_MANUAL_CROPS.map((crop) => (
                <button
                  key={crop}
                  onClick={() => handleManualCropSelect(crop)}
                  className="p-3.5 rounded-2xl border border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all text-xs sm:text-sm font-semibold text-center shadow-2xs cursor-pointer"
                >
                  {crop}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="px-6 py-3 bg-card border border-border rounded-2xl text-xs sm:text-sm font-bold text-foreground/80 hover:bg-muted transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" /> {t('scanner_btn_try_another')}
            </button>
          </div>
        </div>

      )}

    </div>
  );
}
