import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language, Translations } from '@/lib/i18n';

export interface User {
  id: string;
  name: string;
  emailOrPhone: string;
  isGuest: boolean;
}

export interface FarmerProfile {
  name: string;
  location: string;
  acres: number;
  crop: string;
  season: string;
}

const DEFAULT_PROFILE: FarmerProfile = {
  name: 'Rajesh Kumar',
  location: 'Karnal, Haryana',
  acres: 2,
  crop: 'Wheat',
  season: 'Rabi Season (Winter)',
};

const DEFAULT_USER: User = {
  id: 'guest-101',
  name: 'Rajesh Kumar (Guest)',
  emailOrPhone: 'farmer@fasaliq.in',
  isGuest: true,
};

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof Translations, params?: Record<string, string | number>) => string;
  profile: FarmerProfile;
  updateProfile: (updates: Partial<FarmerProfile>) => void;
  user: User;
  isDemoMode: boolean;
  setIsDemoMode: (isDemo: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (emailOrPhone: string, password: string) => Promise<boolean>;
  signUp: (name: string, emailOrPhone: string, password: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'fasaliq_language';
const PROFILE_STORAGE_KEY = 'fasaliq_farmer_profile';
const USER_STORAGE_KEY = 'fasaliq_user_session';

export function AppProvider({ children }: { children: ReactNode }) {
  // Initialize language from localStorage
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === 'en' || saved === 'hi' || saved === 'hinglish') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'en';
  });

  // Initialize farmer profile from localStorage
  const [profile, setProfileState] = useState<FarmerProfile>(() => {
    try {
      const saved = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_PROFILE;
  });

  // Initialize user session
  const [user, setUserState] = useState<User>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return DEFAULT_USER;
  });

  const [isDemoMode, setIsDemoMode] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const updateProfile = (updates: Partial<FarmerProfile>) => {
    setProfileState((prev) => {
      const next = { ...prev, ...updates };
      try {
        localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const login = async (emailOrPhone: string, password: string): Promise<boolean> => {
    if (!emailOrPhone || !password) return false;
    const authenticatedUser: User = {
      id: 'user_' + Math.random().toString(36).substring(2, 9),
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Farmer ' + emailOrPhone.slice(-4),
      emailOrPhone,
      isGuest: false,
    };
    setUserState(authenticatedUser);
    updateProfile({ name: authenticatedUser.name });
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch {
      // ignore
    }
    return true;
  };

  const signUp = async (name: string, emailOrPhone: string, password: string): Promise<boolean> => {
    if (!name || !emailOrPhone || !password) return false;
    const newUser: User = {
      id: 'user_' + Math.random().toString(36).substring(2, 9),
      name,
      emailOrPhone,
      isGuest: false,
    };
    setUserState(newUser);
    updateProfile({ name });
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUser));
    } catch {
      // ignore
    }
    return true;
  };

  const loginAsGuest = () => {
    setUserState(DEFAULT_USER);
    updateProfile({ name: DEFAULT_PROFILE.name });
    try {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(DEFAULT_USER));
    } catch {
      // ignore
    }
  };

  const logout = () => {
    loginAsGuest();
  };

  // Translation helper function
  const t = (key: keyof Translations, params?: Record<string, string | number>): string => {
    const dict = translations[language] || translations.en;
    let str = dict[key] || translations.en[key] || String(key);
    if (params) {
      Object.entries(params).forEach(([pKey, pVal]) => {
        str = str.replace(new RegExp(`\\{${pKey}\\}`, 'g'), String(pVal));
      });
    }
    return str;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        profile,
        updateProfile,
        user,
        isDemoMode,
        setIsDemoMode,
        isAuthModalOpen,
        setIsAuthModalOpen,
        login,
        signUp,
        loginAsGuest,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
