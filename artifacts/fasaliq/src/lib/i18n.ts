export type Language = 'en' | 'hi' | 'hinglish';

export interface Translations {
  // Brand & Common
  app_name: string;
  tagline: string;
  nav_dashboard: string;
  nav_advisor: string;
  nav_scanner: string;
  nav_economics: string;
  nav_compare: string;
  nav_organic: string;
  nav_schemes: string;
  farmer_profile: string;
  acres: string;
  demo_mode_badge: string;
  demo_data_notice: string;
  language_label: string;
  menu: string;
  save: string;
  cancel: string;
  edit: string;
  view_details: string;
  close: string;
  back: string;
  next: string;
  status: string;
  loading: string;
  error: string;
  success: string;
  retry: string;

  // Auth & Session
  auth_login: string;
  auth_signup: string;
  auth_guest_mode: string;
  auth_continue_guest: string;
  auth_logout: string;
  auth_email_or_phone: string;
  auth_password: string;
  auth_confirm_password: string;
  auth_full_name: string;
  auth_welcome_back: string;
  auth_create_account: string;
  auth_guest_banner: string;
  auth_guest_tag: string;
  auth_save_data_prompt: string;
  auth_login_cta: string;
  auth_signup_cta: string;
  auth_invalid_credentials: string;
  auth_account_created: string;
  auth_modal_login_subtitle: string;
  auth_modal_signup_subtitle: string;
  auth_toggle_signup: string;
  auth_toggle_login: string;
  auth_divider_or: string;

  // Landing Page
  landing_badge: string;
  landing_title_1: string;
  landing_title_highlight: string;
  landing_subtitle: string;
  landing_btn_dashboard: string;
  landing_btn_advisor: string;
  landing_btn_guest: string;
  landing_how_it_works: string;
  trail_data: string;
  trail_intelligence: string;
  trail_decision: string;
  trail_action: string;
  trail_data_desc: string;
  trail_intel_desc: string;
  trail_decision_desc: string;
  trail_action_desc: string;

  // Dashboard
  dash_overview: string;
  dash_farm_title: string;
  dash_health_good: string;
  dash_health_alert: string;
  dash_weather_title: string;
  dash_weather_desc: string;
  dash_weather_link: string;
  dash_market_title: string;
  dash_market_desc: string;
  dash_market_link: string;
  dash_profit_title: string;
  dash_yield_title: string;
  dash_revenue_title: string;
  dash_active_schemes: string;
  dash_recent_alerts: string;
  dash_scan_now: string;
  dash_all_schemes: string;
  dash_quick_scan_cta: string;
  dash_quick_scan_desc: string;
  dash_projected_badge: string;

  // Crop Scanner
  scanner_title: string;
  scanner_subtitle: string;
  scanner_upload_card_title: string;
  scanner_upload_card_desc: string;
  scanner_btn_choose: string;
  scanner_disclaimer_title: string;
  scanner_disclaimer_desc: string;
  scanner_analyzing_title: string;
  scanner_analyzing_desc: string;
  scanner_step_uploading: string;
  scanner_step_analyzing: string;
  scanner_step_pathology: string;
  scanner_step_recommendations: string;
  scanner_detected_crop: string;
  scanner_crop_family: string;
  scanner_growth_stage: string;
  scanner_possible_issue: string;
  scanner_no_issue: string;
  scanner_health_confidence: string;
  scanner_severity: string;
  scanner_severity_none: string;
  scanner_severity_mild: string;
  scanner_severity_moderate: string;
  scanner_severity_severe: string;
  scanner_health_healthy: string;
  scanner_health_moderate_concern: string;
  scanner_health_at_risk: string;
  scanner_health_severe_concern: string;
  scanner_observations_title: string;
  scanner_disease_title: string;
  scanner_pest_title: string;
  scanner_nutrient_title: string;
  scanner_stress_title: string;
  scanner_recommendations_title: string;
  scanner_rec_immediate: string;
  scanner_rec_short_term: string;
  scanner_rec_monitoring: string;
  scanner_rec_expert_help: string;
  scanner_prevention_title: string;
  scanner_rescan_title: string;
  scanner_simple_summary_title: string;
  scanner_discrepancy_alert: string;
  scanner_btn_ask_advisor: string;
  scanner_btn_scan_another: string;
  scanner_uncertain_title: string;
  scanner_uncertain_desc: string;
  scanner_btn_try_another: string;
  scanner_confidence_high: string;
  scanner_confidence_likely: string;
  scanner_confidence_low: string;
  scanner_evidence_level: string;

  // AI Advisor
  advisor_title: string;
  advisor_subtitle: string;
  advisor_context_label: string;
  advisor_placeholder: string;
  advisor_send: string;
  advisor_thinking: string;
  advisor_listening: string;
  advisor_mic_tooltip: string;
  advisor_mic_unsupported: string;
  advisor_quick_1: string;
  advisor_quick_2: string;
  advisor_quick_3: string;
  advisor_welcome: string;
  advisor_recommendation: string;
  advisor_why: string;
  advisor_next_actions: string;
  advisor_what_to_monitor: string;
  advisor_when_to_seek_help: string;
  advisor_clear_chat: string;
  advisor_context_weather_rain: string;
  advisor_context_weather_normal: string;

  // Farm Economics
  econ_title: string;
  econ_subtitle: string;
  econ_input_cost: string;
  econ_est_revenue: string;
  econ_net_profit: string;
  econ_profit_margin: string;
  econ_profit_per_acre: string;
  econ_cost_breakdown: string;
  econ_optimization_title: string;
  econ_optimization_desc: string;
  econ_opt_organic: string;
  econ_opt_organic_sub: string;
  econ_opt_compare: string;
  econ_opt_compare_sub: string;
  econ_indicative_note: string;
  econ_projected_badge: string;
  econ_cost_seed: string;
  econ_cost_fertilizer: string;
  econ_cost_irrigation: string;
  econ_cost_labor: string;
  econ_cost_machinery: string;
  econ_cost_pesticides: string;
  econ_per_acre: string;

  // Crop Comparison
  comp_title: string;
  comp_subtitle: string;
  comp_current_crop: string;
  comp_switch_btn: string;
  comp_selected: string;
  comp_est_yield: string;
  comp_input_cost: string;
  comp_est_revenue: string;
  comp_net_profit: string;
  comp_risk_level: string;
  comp_water_need: string;
  comp_risk_low: string;
  comp_risk_medium: string;
  comp_risk_high: string;
  comp_water_low: string;
  comp_water_moderate: string;
  comp_water_high: string;

  // Organic Transition
  org_title: string;
  org_subtitle: string;
  org_score_title: string;
  org_cycle_title: string;
  org_savings_title: string;
  org_savings_desc: string;
  org_bio_inputs_title: string;
  org_status_completed: string;
  org_status_current: string;
  org_status_upcoming: string;

  // Government Schemes
  schemes_title: string;
  schemes_subtitle: string;
  schemes_filter_all: string;
  schemes_filter_central: string;
  schemes_filter_state: string;
  schemes_filter_organic: string;
  schemes_filter_insurance: string;
  schemes_match_score: string;
  schemes_apply_btn: string;
  schemes_target_audience: string;
  schemes_key_benefit: string;

  // Profile Modal
  profile_modal_title: string;
  profile_name: string;
  profile_location: string;
  profile_acres: string;
  profile_crop: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    app_name: 'FasalIQ',
    tagline: 'Farm Decision Intelligence for Indian Farmers',
    nav_dashboard: 'Dashboard',
    nav_advisor: 'AI Advisor',
    nav_scanner: 'Crop Scanner',
    nav_economics: 'Farm Economics',
    nav_compare: 'Crop Matrix',
    nav_organic: 'Organic Guide',
    nav_schemes: 'Govt Schemes',
    farmer_profile: 'Farmer Profile',
    acres: 'Acres',
    demo_mode_badge: 'Demo Mode',
    demo_data_notice: 'Simulated market rates',
    language_label: 'Language',
    menu: 'Menu',
    save: 'Save Changes',
    cancel: 'Cancel',
    edit: 'Edit',
    view_details: 'View Details',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    status: 'Status',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Completed successfully',
    retry: 'Retry',

    // Auth & Session
    auth_login: 'Log In',
    auth_signup: 'Create Account',
    auth_guest_mode: 'Guest Exploration',
    auth_continue_guest: 'Continue as Guest',
    auth_logout: 'Log Out',
    auth_email_or_phone: 'Email or Mobile Number',
    auth_password: 'Password',
    auth_confirm_password: 'Confirm Password',
    auth_full_name: 'Full Name',
    auth_welcome_back: 'Welcome back to FasalIQ',
    auth_create_account: 'Register your farm profile',
    auth_guest_banner: 'You are currently in Guest Mode. Sign up to permanently save your farm profile and scan records.',
    auth_guest_tag: 'Guest Mode',
    auth_save_data_prompt: 'Create an account to save farm data',
    auth_login_cta: 'Sign In to Your Farm',
    auth_signup_cta: 'Register New Farm Account',
    auth_invalid_credentials: 'Invalid credentials. Please try again or use Guest Mode.',
    auth_account_created: 'Account created successfully! Welcome to FasalIQ.',
    auth_modal_login_subtitle: 'Sign in to access your farm logs, saved scans, and advisory history.',
    auth_modal_signup_subtitle: 'Register your land profile to receive personalized daily farming advice.',
    auth_toggle_signup: "Don't have an account yet?",
    auth_toggle_login: 'Already have an account?',
    auth_divider_or: 'or',

    // Landing Page
    landing_badge: 'AI-Powered Farm Decision Intelligence',
    landing_title_1: 'Precision Agronomic Intelligence for',
    landing_title_highlight: 'Indian Farmers',
    landing_subtitle: 'Transform raw weather forecasts, mandi prices, and leaf scans into actionable, high-yield farm decisions.',
    landing_btn_dashboard: 'Enter Dashboard',
    landing_btn_advisor: 'Ask AI Advisor',
    landing_btn_guest: 'Explore as Guest',
    landing_how_it_works: 'How Farm Intelligence Flows',
    trail_data: '1. Field Data',
    trail_intelligence: '2. Multimodal AI',
    trail_decision: '3. Farm Economics',
    trail_action: '4. Actionable Steps',
    trail_data_desc: 'Real-time weather, mandi rates, and crop leaf photos',
    trail_intel_desc: 'Gemini multimodal vision and botanical pathology algorithms',
    trail_decision_desc: 'Calibrated input cost vs projected revenue analytics',
    trail_action_desc: 'Practical organic recipes and direct subsidy links',

    // Dashboard
    dash_overview: 'Farm Overview',
    dash_farm_title: '{name}’s Farm Operations',
    dash_health_good: 'Crop Health Monitored',
    dash_health_alert: 'Action Recommended',
    dash_weather_title: 'Weather & Irrigation Window',
    dash_weather_desc: 'Upcoming rain forecast. Hold irrigation and chemical sprays.',
    dash_weather_link: 'Get weather advice',
    dash_market_title: 'Mandi Price & Trend',
    dash_market_desc: 'Current spot price vs government MSP benchmark.',
    dash_market_link: 'View price analytics',
    dash_profit_title: 'Projected Net Return',
    dash_yield_title: 'Expected Yield',
    dash_revenue_title: 'Estimated Revenue',
    dash_active_schemes: 'Matched Subsidies',
    dash_recent_alerts: 'Agronomic Alerts',
    dash_scan_now: 'Scan Leaf Specimen',
    dash_all_schemes: 'View All Schemes',
    dash_quick_scan_cta: 'Upload crop leaf image for instant AI diagnosis',
    dash_quick_scan_desc: 'Detect crop species, diseases, nutrient deficiencies, and treatment steps in seconds.',
    dash_projected_badge: 'Estimated Projections',

    // Crop Scanner
    scanner_title: 'Multimodal Crop & Leaf Scanner',
    scanner_subtitle: 'AI botanical pathology & specimen health screening',
    scanner_upload_card_title: 'Upload Crop or Leaf Specimen',
    scanner_upload_card_desc: 'Upload a clear crop photo showing a leaf, stem, flower, fruit, seed head, whole plant, or field (JPG, PNG, WebP up to 10MB).',
    scanner_btn_choose: 'Choose Photo / Capture',
    scanner_disclaimer_title: 'Agricultural Diagnostic Disclaimer',
    scanner_disclaimer_desc: 'AI visual screening identifies probable visual patterns. Always cross-verify with your local Krishi Vigyan Kendra (KVK) before chemical interventions.',
    scanner_analyzing_title: 'Analyzing Specimen with Multimodal AI...',
    scanner_analyzing_desc: 'Processing botanical morphology, leaf venation, and foliar symptoms.',
    scanner_step_uploading: 'Uploading high-resolution image...',
    scanner_step_analyzing: 'Identifying crop species and botanical family...',
    scanner_step_pathology: 'Scanning for foliar disease, pest marks, and stress...',
    scanner_step_recommendations: 'Formulating safe integrated farm recommendations...',
    scanner_detected_crop: 'Identified Crop Species',
    scanner_crop_family: 'Botanical Family',
    scanner_growth_stage: 'Estimated Crop Stage',
    scanner_possible_issue: 'Suspected Issue / Pathology',
    scanner_no_issue: 'Foliage appears visually healthy with no severe pathogen lesions.',
    scanner_health_confidence: 'Health Confidence',
    scanner_severity: 'Severity Level',
    scanner_severity_none: 'None / Normal',
    scanner_severity_mild: 'Mild Concern',
    scanner_severity_moderate: 'Moderate Concern',
    scanner_severity_severe: 'Severe Concern',
    scanner_health_healthy: 'Healthy & Vigor Normal',
    scanner_health_moderate_concern: 'Moderate Stress Observed',
    scanner_health_at_risk: 'At Risk — Treatment Recommended',
    scanner_health_severe_concern: 'Severe Issue — Immediate Action Required',
    scanner_observations_title: 'Visual Evidence & Biological Observations',
    scanner_disease_title: 'Disease Analysis',
    scanner_pest_title: 'Pest & Insect Screening',
    scanner_nutrient_title: 'Nutrient Deficiency Indicators',
    scanner_stress_title: 'Environmental & Water Stress',
    scanner_recommendations_title: 'Tailored Action Plan',
    scanner_rec_immediate: 'Immediate Actions (Today)',
    scanner_rec_short_term: 'Next 3 to 7 Days',
    scanner_rec_monitoring: 'What to Monitor',
    scanner_rec_expert_help: 'When to Seek Agronomist / KVK Help',
    scanner_prevention_title: 'Long-term Prevention & Cultural Control',
    scanner_rescan_title: 'When to Rescan',
    scanner_simple_summary_title: 'Farmer-Friendly Explanation',
    scanner_discrepancy_alert: 'Note: Visual specimen looks different from your registered farm crop profile ({profileCrop}). Diagnosis is calculated purely from image evidence.',
    scanner_btn_ask_advisor: 'Discuss with AI Advisor',
    scanner_btn_scan_another: 'Scan Another Specimen',
    scanner_uncertain_title: 'Uncertain Image / Manual Selection Required',
    scanner_uncertain_desc: 'The visual confidence was below threshold or image was ambiguous. Please pick your crop manually for tailored health guidance:',
    scanner_btn_try_another: 'Upload Clearer Photo',
    scanner_confidence_high: 'High Confidence',
    scanner_confidence_likely: 'Likely Confidence',
    scanner_confidence_low: 'Low Confidence (Unverified)',
    scanner_evidence_level: 'Evidence Calibrated',

    // AI Advisor
    advisor_title: 'AI Farm Advisor',
    advisor_subtitle: 'Contextual Agronomic Decision Support for Indian Agriculture',
    advisor_context_label: 'Active Context:',
    advisor_placeholder: 'Ask about weather, pests, organic fertilizers, irrigation, or market prices...',
    advisor_send: 'Send',
    advisor_thinking: 'Analyzing farm context & formulating agronomic advice...',
    advisor_listening: 'Listening to your voice... Speak now in English or Hindi.',
    advisor_mic_tooltip: 'Speak your question (Hindi / English)',
    advisor_mic_unsupported: 'Voice input is not supported in this browser. Please type your question.',
    advisor_quick_1: 'Rain is forecasted in 48 hours. Should I irrigate or apply urea today?',
    advisor_quick_2: 'How can I make low-cost organic Jeevamrutha fertilizer for my farm?',
    advisor_quick_3: 'What are the best organic treatments for leaf spots and aphids?',
    advisor_welcome: 'Namaste! I am your FasalIQ Farm Intelligence Advisor. I monitor your crop, local weather, and market conditions to give you precise, low-cost agronomic advice. How can I assist you today?',
    advisor_recommendation: 'Core Recommendation',
    advisor_why: 'Why This Makes Sense (Agronomic Logic)',
    advisor_next_actions: 'Immediate Step-by-Step Actions',
    advisor_what_to_monitor: 'What to Monitor in Field',
    advisor_when_to_seek_help: 'When to Contact Local Agronomist',
    advisor_clear_chat: 'Clear Conversation',
    advisor_context_weather_rain: '🌧️ Rain Forecast (48h)',
    advisor_context_weather_normal: '☀️ Fair Weather',

    // Farm Economics
    econ_title: 'Farm Economics & Profit Matrix',
    econ_subtitle: 'Input expenditure breakdown vs projected harvest revenue',
    econ_input_cost: 'Total Estimated Cost',
    econ_est_revenue: 'Projected Revenue',
    econ_net_profit: 'Projected Net Profit',
    econ_profit_margin: 'Estimated Profit Margin',
    econ_profit_per_acre: 'Net Profit per Acre',
    econ_cost_breakdown: 'Expenditure Breakdown',
    econ_optimization_title: 'Cost Optimization Strategies',
    econ_optimization_desc: 'Switching to on-farm bio-inputs and targeted irrigation reduces cultivation cost significantly.',
    econ_opt_organic: 'Organic Input Transition',
    econ_opt_organic_sub: 'Save up to ₹1,200/acre using Jeevamrutha & Neemastra.',
    econ_opt_compare: 'Crop Rotation Simulation',
    econ_opt_compare_sub: 'Compare returns of Mustard, Potato, and Wheat.',
    econ_indicative_note: 'All financial figures are indicative estimates based on current mandi modal rates and standard agronomic cost packages.',
    econ_projected_badge: 'Indicative Projections',
    econ_cost_seed: 'Certified Seeds & Treatment',
    econ_cost_fertilizer: 'Fertilizers & Organic Inputs',
    econ_cost_irrigation: 'Irrigation & Pumping Energy',
    econ_cost_labor: 'Farm Labor & Weeding',
    econ_cost_machinery: 'Tractor Tillage & Harvesting',
    econ_cost_pesticides: 'Plant Protection & Sprays',
    econ_per_acre: '/ acre',

    // Crop Comparison
    comp_title: 'Crop Feasibility & Profit Matrix',
    comp_subtitle: 'Evaluate seasonal crop economics, risk profiles, and water requirements',
    comp_current_crop: 'Current Active Crop',
    comp_switch_btn: 'Select as Main Crop',
    comp_selected: 'Selected',
    comp_est_yield: 'Expected Yield',
    comp_input_cost: 'Production Cost',
    comp_est_revenue: 'Projected Gross Revenue',
    comp_net_profit: 'Estimated Net Profit',
    comp_risk_level: 'Market & Climate Risk',
    comp_water_need: 'Irrigation Requirement',
    comp_risk_low: 'Low Risk',
    comp_risk_medium: 'Moderate Risk',
    comp_risk_high: 'High Price Volatility',
    comp_water_low: 'Low (2 Irrigations)',
    comp_water_moderate: 'Moderate (4-5 Irrigations)',
    comp_water_high: 'High (6-8 Irrigations)',

    // Organic Transition
    org_title: 'Zero-Budget Organic Transition Guide',
    org_subtitle: 'Step-by-step bio-input protocols and soil regeneration roadmap',
    org_score_title: 'Organic Readiness Score',
    org_cycle_title: 'Seasonal Organic Action Timeline',
    org_savings_title: 'Estimated Input Cost Savings',
    org_savings_desc: 'By eliminating chemical urea and synthetic sprays, your farm saves ₹1,200 per acre per season while qualifying for premium organic market prices.',
    org_bio_inputs_title: 'Standard Bio-Formulation Protocols',
    org_status_completed: 'Completed',
    org_status_current: 'Active Stage',
    org_status_upcoming: 'Upcoming',

    // Government Schemes
    schemes_title: 'Government Subsidies & Schemes',
    schemes_subtitle: 'Direct benefit transfers, crop insurance, and equipment grants matched to your profile',
    schemes_filter_all: 'All Categories',
    schemes_filter_central: 'Central Schemes',
    schemes_filter_state: 'State Subsidies',
    schemes_filter_organic: 'Organic Incentives',
    schemes_filter_insurance: 'Crop Insurance',
    schemes_match_score: 'Eligibility Match',
    schemes_apply_btn: 'Official Portal',
    schemes_target_audience: 'Target Beneficiaries',
    schemes_key_benefit: 'Key Financial Benefit',

    // Profile Modal
    profile_modal_title: 'Edit Farm Profile',
    profile_name: 'Farmer Full Name',
    profile_location: 'Farm Location / District',
    profile_acres: 'Total Land Holding (Acres)',
    profile_crop: 'Primary Registered Crop',
  },

  hi: {
    app_name: 'फसलIQ',
    tagline: 'भारतीय किसानों के लिए एआई-संचालित कृषि निर्णय प्रणाली',
    nav_dashboard: 'डैशबोर्ड',
    nav_advisor: 'एआई सलाहकार',
    nav_scanner: 'फसल स्कैनर',
    nav_economics: 'फार्म अर्थशास्त्र',
    nav_compare: 'फसल तुलना',
    nav_organic: 'जैविक मार्गदर्शिका',
    nav_schemes: 'सरकारी योजनाएं',
    farmer_profile: 'किसान प्रोफाइल',
    acres: 'एकड़',
    demo_mode_badge: 'डेमो मोड',
    demo_data_notice: 'मंडी के अनुमानित भाव',
    language_label: 'भाषा चुनें',
    menu: 'मेनू',
    save: 'बदलाव सुरक्षित करें',
    cancel: 'रद्द करें',
    edit: 'संपादित करें',
    view_details: 'विवरण देखें',
    close: 'बंद करें',
    back: 'पीछे',
    next: 'आगे',
    status: 'स्थिति',
    loading: 'लोड हो रहा है...',
    error: 'एक त्रुटि हुई',
    success: 'सफलतापूर्वक संपन्न',
    retry: 'पुनः प्रयास करें',

    // Auth & Session
    auth_login: 'लॉग इन करें',
    auth_signup: 'नया खाता बनाएं',
    auth_guest_mode: 'अतिथि मोड (Guest)',
    auth_continue_guest: 'अतिथि के रूप में जारी रखें',
    auth_logout: 'लॉग आउट',
    auth_email_or_phone: 'ईमेल या मोबाइल नंबर',
    auth_password: 'पासवर्ड',
    auth_confirm_password: 'पासवर्ड की पुष्टि करें',
    auth_full_name: 'पूरा नाम',
    auth_welcome_back: 'फसलIQ में आपका स्वागत है',
    auth_create_account: 'अपने खेत का पंजीकरण करें',
    auth_guest_banner: 'आप वर्तमान में अतिथि मोड में हैं। अपने खेत का डेटा और स्कैन इतिहास सुरक्षित रखने के लिए खाता बनाएं।',
    auth_guest_tag: 'अतिथि मोड',
    auth_save_data_prompt: 'डेटा सुरक्षित रखने के लिए खाता बनाएं',
    auth_login_cta: 'अपने खाते में प्रवेश करें',
    auth_signup_cta: 'नया किसान खाता पंजीकृत करें',
    auth_invalid_credentials: 'अमान्य विवरण। कृपया पुनः प्रयास करें या अतिथि मोड चुनें।',
    auth_account_created: 'खाता सफलतापूर्वक बन गया! फसलIQ में आपका स्वागत है।',
    auth_modal_login_subtitle: 'अपने खेत के डेटा, सहेजे गए स्कैन और सलाह का इतिहास देखने के लिए साइन इन करें।',
    auth_modal_signup_subtitle: 'व्यक्तिगत दैनिक कृषि सलाह पाने के लिए अपने खेत की प्रोफाइल पंजीकृत करें।',
    auth_toggle_signup: 'अभी खाता नहीं बनाया?',
    auth_toggle_login: 'पहले से खाता है?',
    auth_divider_or: 'या',

    // Landing Page
    landing_badge: 'एआई-संचालित कृषि निर्णय प्रणाली',
    landing_title_1: 'भारतीय किसानों के लिए सटीक',
    landing_title_highlight: 'कृषि बुद्धिमत्ता',
    landing_subtitle: 'मौसम पूर्वानुमान, मंडी भाव और पत्ती की तस्वीरों को सीधे खेत के लाभकारी निर्णयों में बदलें।',
    landing_btn_dashboard: 'डैशबोर्ड खोलें',
    landing_btn_advisor: 'एआई सलाहकार से पूछें',
    landing_btn_guest: 'अतिथि के रूप में देखें',
    landing_how_it_works: 'निर्णय प्रणाली कैसे काम करती है',
    trail_data: '1. खेत का डेटा',
    trail_intelligence: '2. मल्टीमॉडल एआई',
    trail_decision: '3. कृषि अर्थशास्त्र',
    trail_action: '4. व्यावहारिक कदम',
    trail_data_desc: 'लाइव मौसम, मंडी भाव और फसल की पत्ती की तस्वीर',
    trail_intel_desc: 'जेमिनी विजन और वनस्पति रोग विज्ञान विश्लेषण',
    trail_decision_desc: 'लागत बनाम अनुमानित मुनाफे का स्पष्ट हिसाब',
    trail_action_desc: 'जैविक नुस्खे और सीधे सरकारी सब्सिडी लिंक',

    // Dashboard
    dash_overview: 'खेत का विवरण',
    dash_farm_title: '{name} जी का खेत',
    dash_health_good: 'फसल स्वास्थ्य सामान्य',
    dash_health_alert: 'सावधानी आवश्यक',
    dash_weather_title: 'मौसम एवं सिंचाई सलाह',
    dash_weather_desc: 'आगामी दिनों में बारिश की संभावना। सिंचाई और रासायनिक खाद स्थगित रखें।',
    dash_weather_link: 'मौसम सलाह देखें',
    dash_market_title: 'मंडी भाव व रुझान',
    dash_market_desc: 'वर्तमान हाजिर भाव बनाम सरकारी एमएसपी दर।',
    dash_market_link: 'मूल्य विश्लेषण देखें',
    dash_profit_title: 'अनुमानित शुद्ध मुनाफा',
    dash_yield_title: 'अनुमानित पैदावार',
    dash_revenue_title: 'कुल अनुमानित आय',
    dash_active_schemes: 'पात्र योजनाएं',
    dash_recent_alerts: 'कृषि चेतावनी',
    dash_scan_now: 'पत्ती का स्कैन करें',
    dash_all_schemes: 'सभी योजनाएं देखें',
    dash_quick_scan_cta: 'तुरंत एआई जांच के लिए फसल की पत्ती अपलोड करें',
    dash_quick_scan_desc: 'फसल की प्रजाति, बीमारी, पोषक तत्वों की कमी और उपचार सेकंडों में जानें।',
    dash_projected_badge: 'अनुमानित आंकड़े',

    // Crop Scanner
    scanner_title: 'मल्टीमॉडल फसल एवं पत्ती स्कैनर',
    scanner_subtitle: 'एआई विजन आधारित फसल रोग व स्वास्थ्य परीक्षण',
    scanner_upload_card_title: 'फसल या पत्ती की तस्वीर अपलोड करें',
    scanner_upload_card_desc: 'पत्ती, तने, फूल, फल, बीज, पूरे पौधे या खेत की साफ तस्वीर अपलोड करें (JPG, PNG, WebP अधिकतम 10MB)।',
    scanner_btn_choose: 'फोटो चुनें / कैमरा खोलें',
    scanner_disclaimer_title: 'कृषि परामर्श अस्वीकरण',
    scanner_disclaimer_desc: 'एआई दृश्य लक्षणों के आधार पर संभावित बीमारी की पहचान करता है। रासायनिक छिड़काव से पहले कृषि विज्ञान केंद्र (KVK) के विशेषज्ञ से अवश्य सलाह लें।',
    scanner_analyzing_title: 'मल्टीमॉडल एआई द्वारा परीक्षण जारी है...',
    scanner_analyzing_desc: 'पत्ती की बनावट, नसों के पैटर्न और लक्षणों का विश्लेषण हो रहा है।',
    scanner_step_uploading: 'छवि अपलोड की जा रही है...',
    scanner_step_analyzing: 'फसल प्रजाति और वनस्पति कुल की पहचान हो रही है...',
    scanner_step_pathology: 'पत्तियों पर रोग, कीट व पोषक तत्वों की जांच हो रही है...',
    scanner_step_recommendations: 'सुरक्षित कृषि कार्य योजना तैयार की जा रही है...',
    scanner_detected_crop: 'पहचानी गई फसल प्रजाति',
    scanner_crop_family: 'वनस्पति कुल (Family)',
    scanner_growth_stage: 'अनुमानित फसल चरण',
    scanner_possible_issue: 'पहचाना गया रोग / लक्षण',
    scanner_no_issue: 'पत्तियां स्वस्थ हैं और कोई गंभीर रोग के लक्षण नहीं पाए गए।',
    scanner_health_confidence: 'स्वास्थ्य सटीकता',
    scanner_severity: 'गंभीरता स्तर',
    scanner_severity_none: 'सामान्य / कोई नहीं',
    scanner_severity_mild: 'हल्की चिंता',
    scanner_severity_moderate: 'मध्यम चिंता',
    scanner_severity_severe: 'गंभीर चिंता',
    scanner_health_healthy: 'स्वस्थ एवं मजबूत स्थिति',
    scanner_health_moderate_concern: 'मध्यम तनाव के लक्षण',
    scanner_health_at_risk: 'जोखिम में — उपचार की आवश्यकता',
    scanner_health_severe_concern: 'गंभीर स्थिति — तत्काल कदम उठाएं',
    scanner_observations_title: 'दृश्य अवलोकन एवं जैविक लक्षण',
    scanner_disease_title: 'रोग विश्लेषण',
    scanner_pest_title: 'कीट व माहू परीक्षण',
    scanner_nutrient_title: 'पोषक तत्वों की कमी के लक्षण',
    scanner_stress_title: 'मौसम एवं पानी का तनाव',
    scanner_recommendations_title: 'अनुशंसित कार्य योजना',
    scanner_rec_immediate: 'तत्काल कार्य (आज ही करें)',
    scanner_rec_short_term: 'अगले 3 से 7 दिनों में',
    scanner_rec_monitoring: 'खेत में क्या निगरानी रखें',
    scanner_rec_expert_help: 'कृषि विशेषज्ञ से कब संपर्क करें',
    scanner_prevention_title: 'भविष्य से बचाव के उपाय',
    scanner_rescan_title: 'दोबारा स्कैन कब करें',
    scanner_simple_summary_title: 'किसान भाइयों के लिए सरल सारांश',
    scanner_discrepancy_alert: 'सूचना: अपलोड की गई तस्वीर आपके पंजीकृत खेत की फसल ({profileCrop}) से भिन्न प्रतीत होती है। परिणाम केवल फोटो के आधार पर निकाला गया है।',
    scanner_btn_ask_advisor: 'एआई सलाहकार से पूछें',
    scanner_btn_scan_another: 'दूसरी तस्वीर स्कैन करें',
    scanner_uncertain_title: 'अस्पष्ट तस्वीर / मैन्युअल फसल चयन',
    scanner_uncertain_desc: 'छवि स्पष्ट न होने के कारण सटीक पहचान नहीं हो सकी। सटीक सलाह पाने के लिए नीचे से अपनी फसल चुनें:',
    scanner_btn_try_another: 'साफ तस्वीर दोबारा लें',
    scanner_confidence_high: 'उच्च विश्वसनीयता',
    scanner_confidence_likely: 'संभावित',
    scanner_confidence_low: 'कम विश्वसनीयता (सत्यापन आवश्यक)',
    scanner_evidence_level: 'दृश्य साक्ष्य आधारित',

    // AI Advisor
    advisor_title: 'एआई कृषि सलाहकार',
    advisor_subtitle: 'भारतीय कृषि के लिए संदर्भ-आधारित एआई निर्णय सहायता',
    advisor_context_label: 'खेत का संदर्भ:',
    advisor_placeholder: 'मौसम, खाद, सिंचाई, कीट या मंडी भाव के बारे में पूछें...',
    advisor_send: 'पूछें',
    advisor_thinking: 'खेत के आंकड़ों का विश्लेषण और सलाह तैयार की जा रही है...',
    advisor_listening: 'आपकी आवाज सुनी जा रही है... बोलिए।',
    advisor_mic_tooltip: 'बोलकर पूछें (हिन्दी / अंग्रेजी)',
    advisor_mic_unsupported: 'इस ब्राउज़र में वॉइस इनपुट उपलब्ध नहीं है। कृपया टाइप करके पूछें।',
    advisor_quick_1: 'अगले 48 घंटों में बारिश का अनुमान है। क्या आज सिंचाई या यूरिया डालना चाहिए?',
    advisor_quick_2: 'खेत के लिए घर पर कम लागत में जीवामृत कैसे बनाएं?',
    advisor_quick_3: 'पत्तियों के धब्बों और माहू (चेपा) के लिए सर्वोत्तम जैविक उपाय क्या हैं?',
    advisor_welcome: 'नमस्ते किसान भाई! मैं आपका फसलIQ एआई कृषि सलाहकार हूं। मैं आपके खेत, स्थानीय मौसम और मंडी भाव को ध्यान में रखकर सटीक व कम लागत की सलाह देता हूं। आज मैं आपकी क्या सहायता कर सकता हूं?',
    advisor_recommendation: 'मुख्य सलाह',
    advisor_why: 'यह सलाह क्यों दी गई (वैज्ञानिक कारण)',
    advisor_next_actions: 'तत्काल करने योग्य कदम',
    advisor_what_to_monitor: 'खेत में किन बातों पर नजर रखें',
    advisor_when_to_seek_help: 'कृषि विशेषज्ञ से कब संपर्क करें',
    advisor_clear_chat: 'बातचीत साफ करें',
    advisor_context_weather_rain: '🌧️ बारिश का अनुमान (48 घंटे)',
    advisor_context_weather_normal: '☀️ अनुकूल मौसम',

    // Farm Economics
    econ_title: 'फार्म अर्थशास्त्र व मुनाफा गणना',
    econ_subtitle: 'खेत की कुल लागत बनाम अनुमानित पैदावार से आय का हिसाब',
    econ_input_cost: 'कुल अनुमानित लागत',
    econ_est_revenue: 'अनुमानित कुल आय',
    econ_net_profit: 'अनुमानित शुद्ध मुनाफा',
    econ_profit_margin: 'अनुमानित लाभ मार्जिन',
    econ_profit_per_acre: 'प्रति एकड़ शुद्ध मुनाफा',
    econ_cost_breakdown: 'लागत का मदवार विवरण',
    econ_optimization_title: 'लागत घटाने की रणनीति',
    econ_optimization_desc: 'जैविक खाद और नियंत्रित सिंचाई अपनाकर प्रति एकड़ हजारों रुपये की बचत की जा सकती है।',
    econ_opt_organic: 'जैविक खेती की ओर कदम',
    econ_opt_organic_sub: 'जीवामृत व नीमास्त्र के प्रयोग से प्रति एकड़ ₹1,200 तक बचाएं।',
    econ_opt_compare: 'फसल चक्र की तुलना',
    econ_opt_compare_sub: 'सरसों, आलू और गेहूं के मुनाफे की तुलना करें।',
    econ_indicative_note: 'सभी वित्तीय आंकड़े वर्तमान मंडी भावों और मानक कृषि लागतों पर आधारित सांकेतिक अनुमान हैं।',
    econ_projected_badge: 'सांकेतिक अनुमान',
    econ_cost_seed: 'प्रमाणित बीज व बीजोपचार',
    econ_cost_fertilizer: 'खाद एवं जैविक पोषक तत्व',
    econ_cost_irrigation: 'सिंचाई एवं बिजली/डीजल खर्च',
    econ_cost_labor: 'मजदूरी एवं निराई-गुड़ाई',
    econ_cost_machinery: 'ट्रैक्टर जुताई एवं कटाई',
    econ_cost_pesticides: 'कीट एवं पौध संरक्षण',
    econ_per_acre: '/ एकड़',

    // Crop Comparison
    comp_title: 'फसल तुलना व मुनाफा मैट्रिक्स',
    comp_subtitle: 'विभिन्न फसलों की लागत, मुनाफा, जोखिम और पानी की आवश्यकता की तुलना करें',
    comp_current_crop: 'वर्तमान पंजीकृत फसल',
    comp_switch_btn: 'मुख्य फसल के रूप में चुनें',
    comp_selected: 'चुनी गई',
    comp_est_yield: 'अनुमानित पैदावार',
    comp_input_cost: 'अनुमानित लागत',
    comp_est_revenue: 'अनुमानित कुल आय',
    comp_net_profit: 'अनुमानित शुद्ध मुनाफा',
    comp_risk_level: 'बाजार व मौसम का जोखिम',
    comp_water_need: 'पानी की आवश्यकता',
    comp_risk_low: 'कम जोखिम',
    comp_risk_medium: 'मध्यम जोखिम',
    comp_risk_high: 'अधिक मूल्य उतार-चढ़ाव',
    comp_water_low: 'कम (2 सिंचाई)',
    comp_water_moderate: 'मध्यम (4-5 सिंचाई)',
    comp_water_high: 'अधिक (6-8 सिंचाई)',

    // Organic Transition
    org_title: 'शून्य लागत प्राकृतिक/जैविक मार्गदर्शिका',
    org_subtitle: 'जैविक आदानों की विधियां और मिट्टी सुधार की चरणबद्ध कार्य योजना',
    org_score_title: 'जैविक तत्परता स्कोर',
    org_cycle_title: 'मौसमी जैविक कार्य चक्र',
    org_savings_title: 'अनुमानित लागत बचत',
    org_savings_desc: 'रासायनिक यूरिया और कीटनाशकों को बंद करके प्रति एकड़ ₹1,200 की बचत करें और प्रीमियम जैविक भाव प्राप्त करें।',
    org_bio_inputs_title: 'प्रमुख जैविक नुस्खों की विधि',
    org_status_completed: 'पूरा हुआ',
    org_status_current: 'वर्तमान चरण',
    org_status_upcoming: 'आगामी',

    // Government Schemes
    schemes_title: 'सरकारी योजनाएं एवं अनुदान',
    schemes_subtitle: 'प्रत्यक्ष लाभ अंतरण, फसल बीमा और कृषि यंत्रों पर अनुदान की जानकारी',
    schemes_filter_all: 'सभी श्रेणियां',
    schemes_filter_central: 'केंद्रीय योजनाएं',
    schemes_filter_state: 'राज्य स्तरीय अनुदान',
    schemes_filter_organic: 'जैविक प्रोत्साहन',
    schemes_filter_insurance: 'फसल बीमा',
    schemes_match_score: 'पात्रता मिलान',
    schemes_apply_btn: 'आधिकारिक पोर्टल',
    schemes_target_audience: 'पात्र लाभार्थी',
    schemes_key_benefit: 'मुख्य वित्तीय लाभ',

    // Profile Modal
    profile_modal_title: 'खेत की प्रोफाइल बदलें',
    profile_name: 'किसान का पूरा नाम',
    profile_location: 'खेत का स्थान / जिला',
    profile_acres: 'कुल जमीन (एकड़ में)',
    profile_crop: 'मुख्य पंजीकृत फसल',
  },

  hinglish: {
    app_name: 'FasalIQ',
    tagline: 'Indian Farmers ke liye AI-Powered Farm Decision Intelligence',
    nav_dashboard: 'Dashboard',
    nav_advisor: 'AI Advisor',
    nav_scanner: 'Crop Scanner',
    nav_economics: 'Farm Economics',
    nav_compare: 'Crop Matrix',
    nav_organic: 'Organic Guide',
    nav_schemes: 'Govt Schemes',
    farmer_profile: 'Farmer Profile',
    acres: 'Acres',
    demo_mode_badge: 'Demo Mode',
    demo_data_notice: 'Estimated Mandi Rates',
    language_label: 'Language Select',
    menu: 'Menu',
    save: 'Save Changes',
    cancel: 'Cancel',
    edit: 'Edit',
    view_details: 'Details Dekhein',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    status: 'Status',
    loading: 'Loading ho raha hai...',
    error: 'Error aa gaya',
    success: 'Successfully complete',
    retry: 'Retry Karein',

    // Auth & Session
    auth_login: 'Log In Karein',
    auth_signup: 'Account Banayein',
    auth_guest_mode: 'Guest Exploration',
    auth_continue_guest: 'Guest ke roop me continue karein',
    auth_logout: 'Log Out',
    auth_email_or_phone: 'Email ya Mobile Number',
    auth_password: 'Password',
    auth_confirm_password: 'Confirm Password',
    auth_full_name: 'Poora Naam',
    auth_welcome_back: 'FasalIQ me wapas swagat hai',
    auth_create_account: 'Apna farm account register karein',
    auth_guest_banner: 'Aap abhi Guest Mode me hain. Farm data aur scan records permanently save karne ke liye account banayein.',
    auth_guest_tag: 'Guest Mode',
    auth_save_data_prompt: 'Data save karne ke liye sign up karein',
    auth_login_cta: 'Apne Farm Account me Log In Karein',
    auth_signup_cta: 'Naya Farmer Account Banayein',
    auth_invalid_credentials: 'Invalid details. Dobara try karein ya Guest mode use karein.',
    auth_account_created: 'Account successfully ban gaya! FasalIQ me swagat hai.',
    auth_modal_login_subtitle: 'Apne farm logs, saved scans aur advisory history ko access karne ke liye sign in karein.',
    auth_modal_signup_subtitle: 'Personalized daily farming advice paane ke liye apni farm profile register karein.',
    auth_toggle_signup: 'Account nahi banaya abhi?',
    auth_toggle_login: 'Pehle se account hai?',
    auth_divider_or: 'ya',

    // Landing Page
    landing_badge: 'AI-Powered Farm Decision Intelligence',
    landing_title_1: 'Indian Farmers ke liye Precision',
    landing_title_highlight: 'Farm Intelligence',
    landing_subtitle: 'Weather forecasts, mandi rates aur leaf scans ko direct profitable farm decisions me transform karein.',
    landing_btn_dashboard: 'Dashboard Open Karein',
    landing_btn_advisor: 'AI Advisor se Puchein',
    landing_btn_guest: 'Guest Mode Explore Karein',
    landing_how_it_works: 'Intelligence System Kaise Kaam Karta Hai',
    trail_data: '1. Field Data',
    trail_intelligence: '2. Multimodal AI',
    trail_decision: '3. Farm Economics',
    trail_action: '4. Actionable Steps',
    trail_data_desc: 'Live weather, mandi prices aur leaf photos',
    trail_intel_desc: 'Gemini vision aur botanical pathology analysis',
    trail_decision_desc: 'Cost vs projected profit ka accurate calculation',
    trail_action_desc: 'Organic recipes aur direct subsidy links',

    // Dashboard
    dash_overview: 'Farm Overview',
    dash_farm_title: '{name} ji ka Farm',
    dash_health_good: 'Crop Health Monitored',
    dash_health_alert: 'Action Required',
    dash_weather_title: 'Weather & Irrigation Advisory',
    dash_weather_desc: 'Aane wale dino me rain forecasted hai. Irrigation aur chemical sprays hold karein.',
    dash_weather_link: 'Weather advice dekhein',
    dash_market_title: 'Mandi Price & Trend',
    dash_market_desc: 'Current spot price vs government MSP benchmark.',
    dash_market_link: 'Price analytics dekhein',
    dash_profit_title: 'Projected Net Return',
    dash_yield_title: 'Expected Yield',
    dash_revenue_title: 'Estimated Revenue',
    dash_active_schemes: 'Matched Schemes',
    dash_recent_alerts: 'Farm Alerts',
    dash_scan_now: 'Leaf Scan Karein',
    dash_all_schemes: 'All Schemes Dekhein',
    dash_quick_scan_cta: 'Instant AI diagnosis ke liye leaf photo upload karein',
    dash_quick_scan_desc: 'Crop species, disease symptoms, nutrient deficiency aur treatment seconds me jaanein.',
    dash_projected_badge: 'Estimated Projections',

    // Crop Scanner
    scanner_title: 'Multimodal Crop & Leaf Scanner',
    scanner_subtitle: 'AI Botanical Vision & Health Screening',
    scanner_upload_card_title: 'Crop ya Leaf Photo Upload Karein',
    scanner_upload_card_desc: 'Leaf, stem, flower, fruit, seed head, poore plant ya field ki clear photo upload karein (JPG, PNG, WebP max 10MB).',
    scanner_btn_choose: 'Photo Choose Karein / Camera',
    scanner_disclaimer_title: 'Agronomic Diagnostic Disclaimer',
    scanner_disclaimer_desc: 'AI visual symptoms scan karta hai. Chemical sprays se pehle apne local Krishi Vigyan Kendra (KVK) expert se consult karein.',
    scanner_analyzing_title: 'Multimodal AI analysis chal raha hai...',
    scanner_analyzing_desc: 'Leaf texture, veins pattern aur foliar symptoms scan ho rahe hain.',
    scanner_step_uploading: 'Image upload ho rahi hai...',
    scanner_step_analyzing: 'Crop species aur botanical family identify ho rahi hai...',
    scanner_step_pathology: 'Leaves par disease aur pest marks scan ho rahe hain...',
    scanner_step_recommendations: 'Safe actionable steps formulate ho rahe hain...',
    scanner_detected_crop: 'Identified Crop Species',
    scanner_crop_family: 'Botanical Family',
    scanner_growth_stage: 'Estimated Crop Stage',
    scanner_possible_issue: 'Suspected Issue / Pathology',
    scanner_no_issue: 'Leaves healthy hain, koi severe pathogen lesions nahi mile.',
    scanner_health_confidence: 'Health Confidence',
    scanner_severity: 'Severity Level',
    scanner_severity_none: 'None / Normal',
    scanner_severity_mild: 'Mild Concern',
    scanner_severity_moderate: 'Moderate Concern',
    scanner_severity_severe: 'Severe Concern',
    scanner_health_healthy: 'Healthy & Normal',
    scanner_health_moderate_concern: 'Moderate Stress Observed',
    scanner_health_at_risk: 'At Risk — Action Recommended',
    scanner_health_severe_concern: 'Severe Issue — Immediate Treatment Required',
    scanner_observations_title: 'Visual Evidence & Observations',
    scanner_disease_title: 'Disease Analysis',
    scanner_pest_title: 'Pest & Insect Screening',
    scanner_nutrient_title: 'Nutrient Deficiency Indicators',
    scanner_stress_title: 'Weather & Moisture Stress',
    scanner_recommendations_title: 'Actionable Recommendations',
    scanner_rec_immediate: 'Immediate Actions (Aaj hi karein)',
    scanner_rec_short_term: 'Next 3 to 7 Days me',
    scanner_rec_monitoring: 'Field me kya monitor karein',
    scanner_rec_expert_help: 'Expert / KVK help kab lein',
    scanner_prevention_title: 'Future Prevention Tips',
    scanner_rescan_title: 'Dobara Scan kab karein',
    scanner_simple_summary_title: 'Simple Summary (Farmer Friendly)',
    scanner_discrepancy_alert: 'Note: Uploaded image aapke registered farm crop ({profileCrop}) se alag lag rahi hai. Result purely image ke base par calculate kiya gaya hai.',
    scanner_btn_ask_advisor: 'AI Advisor se Discuss karein',
    scanner_btn_scan_another: 'Doosra Specimen Scan karein',
    scanner_uncertain_title: 'Unclear Photo / Manual Crop Selection',
    scanner_uncertain_desc: 'Image blur ya low confidence hone par crop identify nahi ho paayi. Accurate advice ke liye neeche se crop select karein:',
    scanner_btn_try_another: 'Clear Photo Upload Karein',
    scanner_confidence_high: 'High Confidence',
    scanner_confidence_likely: 'Likely Confidence',
    scanner_confidence_low: 'Low Confidence (Verify Karein)',
    scanner_evidence_level: 'Visual Evidence Calibrated',

    // AI Advisor
    advisor_title: 'AI Farm Advisor',
    advisor_subtitle: 'Indian Agriculture ke liye Contextual Decision Support',
    advisor_context_label: 'Active Context:',
    advisor_placeholder: 'Weather, fertilizers, irrigation, pests ya mandi rate ke baare me puchein...',
    advisor_send: 'Send',
    advisor_thinking: 'Farm context analyze karke advice prepare ho rahi hai...',
    advisor_listening: 'Voice suni ja rahi hai... Speak now in Hindi or English.',
    advisor_mic_tooltip: 'Bolkar puchein (Hindi / English)',
    advisor_mic_unsupported: 'Browser me voice input supported nahi hai. Type karke puchein.',
    advisor_quick_1: 'Next 48h me rain forecast hai. Kya aaj irrigation ya urea dena chahiye?',
    advisor_quick_2: 'Ghar par low-cost organic Jeevamrutha fertilizer kaise banayein?',
    advisor_quick_3: 'Leaf spots aur aphids ke liye best organic treatments kya hain?',
    advisor_welcome: 'Namaste! Main aapka FasalIQ Farm Intelligence Advisor hoon. Main aapke crop, local weather aur mandi rates ko consider karke precise, low-cost advice deta hoon. Aaj main aapki kya help kar sakta hoon?',
    advisor_recommendation: 'Core Recommendation',
    advisor_why: 'Why This Makes Sense (Scientific Logic)',
    advisor_next_actions: 'Immediate Step-by-Step Actions',
    advisor_what_to_monitor: 'Field me kya monitor karein',
    advisor_when_to_seek_help: 'Agronomist se kab contact karein',
    advisor_clear_chat: 'Clear Chat',
    advisor_context_weather_rain: '🌧️ Rain Forecast (48h)',
    advisor_context_weather_normal: '☀️ Normal Weather',

    // Farm Economics
    econ_title: 'Farm Economics & Profit Matrix',
    econ_subtitle: 'Total input cost breakdown vs expected harvest revenue',
    econ_input_cost: 'Total Estimated Cost',
    econ_est_revenue: 'Projected Gross Revenue',
    econ_net_profit: 'Projected Net Profit',
    econ_profit_margin: 'Estimated Margin',
    econ_profit_per_acre: 'Net Profit per Acre',
    econ_cost_breakdown: 'Cost Breakdown',
    econ_optimization_title: 'Cost Optimization Strategies',
    econ_optimization_desc: 'Organic bio-inputs aur controlled irrigation se cultivation cost significantly kam hoti hai.',
    econ_opt_organic: 'Organic Inputs Par Switch',
    econ_opt_organic_sub: 'Jeevamrutha & Neemastra se ₹1,200/acre tak bachein.',
    econ_opt_compare: 'Crop Rotation Simulation',
    econ_opt_compare_sub: 'Mustard, Potato aur Wheat returns compare karein.',
    econ_indicative_note: 'Saare financial figures mandi spot rates aur standard agronomic packages par based indicative estimates hain.',
    econ_projected_badge: 'Estimated Projections',
    econ_cost_seed: 'Certified Seeds & Treatment',
    econ_cost_fertilizer: 'Fertilizers & Organic Inputs',
    econ_cost_irrigation: 'Irrigation & Pumping Cost',
    econ_cost_labor: 'Farm Labor & Weeding',
    econ_cost_machinery: 'Tractor Tillage & Harvesting',
    econ_cost_pesticides: 'Plant Protection & Sprays',
    econ_per_acre: '/ acre',

    // Crop Comparison
    comp_title: 'Crop Feasibility & Profit Matrix',
    comp_subtitle: 'Seasonal crop economics, risk levels aur water requirements compare karein',
    comp_current_crop: 'Current Active Crop',
    comp_switch_btn: 'Main Crop Select Karein',
    comp_selected: 'Selected',
    comp_est_yield: 'Expected Yield',
    comp_input_cost: 'Production Cost',
    comp_est_revenue: 'Projected Gross Revenue',
    comp_net_profit: 'Estimated Net Profit',
    comp_risk_level: 'Market & Weather Risk',
    comp_water_need: 'Irrigation Requirement',
    comp_risk_low: 'Low Risk',
    comp_risk_medium: 'Moderate Risk',
    comp_risk_high: 'High Price Volatility',
    comp_water_low: 'Low (2 Irrigations)',
    comp_water_moderate: 'Moderate (4-5 Irrigations)',
    comp_water_high: 'High (6-8 Irrigations)',

    // Organic Transition
    org_title: 'Zero-Budget Organic Farming Guide',
    org_subtitle: 'Step-by-step bio-input protocols aur soil health roadmap',
    org_score_title: 'Organic Readiness Score',
    org_cycle_title: 'Seasonal Organic Action Timeline',
    org_savings_title: 'Estimated Cost Savings',
    org_savings_desc: 'Chemical urea aur synthetic sprays eliminate karke ₹1,200 per acre save karein aur organic premium rate paayein.',
    org_bio_inputs_title: 'Standard Bio-Formulation Recipes',
    org_status_completed: 'Completed',
    org_status_current: 'Active Stage',
    org_status_upcoming: 'Upcoming',

    // Government Schemes
    schemes_title: 'Government Subsidies & Schemes',
    schemes_subtitle: 'Direct benefit transfers, crop insurance aur farm machinery subsidies',
    schemes_filter_all: 'All Categories',
    schemes_filter_central: 'Central Schemes',
    schemes_filter_state: 'State Subsidies',
    schemes_filter_organic: 'Organic Incentives',
    schemes_filter_insurance: 'Crop Insurance',
    schemes_match_score: 'Eligibility Match',
    schemes_apply_btn: 'Official Portal',
    schemes_target_audience: 'Target Beneficiaries',
    schemes_key_benefit: 'Key Financial Benefit',

    // Profile Modal
    profile_modal_title: 'Farm Profile Edit Karein',
    profile_name: 'Farmer Full Name',
    profile_location: 'Farm Location / District',
    profile_acres: 'Total Land Holding (Acres)',
    profile_crop: 'Primary Registered Crop',
  },
};
