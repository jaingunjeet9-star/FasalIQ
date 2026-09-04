import { Link, useLocation } from 'wouter';
import {
  LayoutDashboard,
  MessageSquare,
  Camera,
  LineChart,
  Scale,
  Leaf,
  Award,
  Menu,
  X,
  User as UserIcon,
  Edit2,
  Check,
  LogIn,
  LogOut,
  Sparkles,
  Shield,
} from 'lucide-react';
import { useState } from 'react';
import { useAppContext } from '@/context/AppContext';
import { AuthModal } from '@/components/auth/AuthModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const isLanding = location === '/';

  if (isLanding) {
    return (
      <div className="min-h-[100dvh] bg-background">
        {children}
        <AuthModal />
      </div>
    );
  }

  return (
    <div className="min-h-[100dvh] bg-background flex flex-col md:flex-row">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col min-h-0 relative pb-20 md:pb-0">
        <TopHeader />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
      <BottomNav />
      <AuthModal />
    </div>
  );
}

function TopHeader() {
  const { language, setLanguage, profile, user, setIsAuthModalOpen, logout, t } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: '/dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { href: '/advisor', label: t('nav_advisor'), icon: MessageSquare },
    { href: '/crop-scanner', label: t('nav_scanner'), icon: Camera },
    { href: '/farm-analysis', label: t('nav_economics'), icon: LineChart },
    { href: '/crop-comparison', label: t('nav_compare'), icon: Scale },
    { href: '/organic-advisor', label: t('nav_organic'), icon: Leaf },
    { href: '/schemes', label: t('nav_schemes'), icon: Award },
  ];

  const currentTitle = navItems.find((item) => item.href === location)?.label || 'FasalIQ';

  return (
    <header className="sticky top-0 z-30 bg-background/90 backdrop-blur-md border-b border-border px-4 h-16 flex items-center justify-between md:px-8 shrink-0">
      <div className="flex items-center gap-3">
        <button
          className="md:hidden p-2 -ml-2 text-primary hover:bg-muted rounded-xl transition-colors"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="font-serif text-xl font-bold text-primary">{currentTitle}</h1>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Guest vs Logged In Status Badge */}
        {user.isGuest ? (
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('auth_guest_tag')}</span>
          </button>
        ) : (
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-bold">
            <UserIcon className="w-3.5 h-3.5" />
            <span>{user.name}</span>
          </div>
        )}

        {/* Language selector */}
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

        {/* Quick Profile / Auth button on mobile */}
        <button
          onClick={() => (user.isGuest ? setIsAuthModalOpen(true) : setIsEditProfileOpen(true))}
          className="md:hidden p-2 text-foreground/80 hover:text-primary rounded-xl border border-border/80 bg-card cursor-pointer"
          title={user.isGuest ? t('auth_login') : t('farmer_profile')}
        >
          {user.isGuest ? <LogIn className="w-4 h-4" /> : <UserIcon className="w-4 h-4" />}
        </button>
      </div>

      {/* Edit Profile Modal */}
      {isEditProfileOpen && (
        <ProfileModal onClose={() => setIsEditProfileOpen(false)} />
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-md z-50 md:hidden flex flex-col animate-in fade-in duration-200">
          <div className="p-4 flex justify-between items-center border-b border-border/60">
            <div className="flex items-center gap-2 text-primary font-bold">
              <Leaf className="w-6 h-6" />
              <span className="font-serif text-xl">FasalIQ</span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 -mr-2 text-foreground/80 hover:text-foreground"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-5">
            {/* Farmer Profile Card in mobile drawer */}
            <div className="bg-card border border-border rounded-2xl p-4 shadow-2xs">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                  {t('farmer_profile')}
                </span>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (user.isGuest) {
                      setIsAuthModalOpen(true);
                    } else {
                      setIsEditProfileOpen(true);
                    }
                  }}
                  className="text-xs text-primary font-bold flex items-center gap-1 hover:underline"
                >
                  <Edit2 className="w-3 h-3" /> {user.isGuest ? t('auth_login') : t('edit')}
                </button>
              </div>
              <div className="font-serif font-bold text-base text-foreground">{profile.name}</div>
              <div className="text-xs text-foreground/75 mt-0.5">{profile.location}</div>
              <div className="text-xs font-semibold text-primary mt-1">
                {profile.acres} {t('acres')} • {profile.crop}
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <p className="text-[10px] font-bold text-muted-foreground mb-2 uppercase tracking-wider">
                {t('language_label')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { code: 'en', label: 'English' },
                    { code: 'hi', label: 'हिन्दी' },
                    { code: 'hinglish', label: 'Hinglish' },
                  ] as const
                ).map(({ code, label }) => (
                  <button
                    key={code}
                    onClick={() => setLanguage(code)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      language === code
                        ? 'bg-primary text-primary-foreground shadow-xs'
                        : 'bg-card text-foreground border border-border hover:bg-muted'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation links */}
            <nav className="flex flex-col gap-1.5 pt-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <div
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all cursor-pointer ${
                      location === item.href
                        ? 'bg-primary text-primary-foreground font-bold shadow-xs'
                        : 'text-foreground hover:bg-card border border-transparent'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function DesktopSidebar() {
  const [location] = useLocation();
  const { profile, user, setIsAuthModalOpen, logout, t } = useAppContext();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  const navItems = [
    { href: '/dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { href: '/advisor', label: t('nav_advisor'), icon: MessageSquare },
    { href: '/crop-scanner', label: t('nav_scanner'), icon: Camera },
    { href: '/farm-analysis', label: t('nav_economics'), icon: LineChart },
    { href: '/crop-comparison', label: t('nav_compare'), icon: Scale },
    { href: '/organic-advisor', label: t('nav_organic'), icon: Leaf },
    { href: '/schemes', label: t('nav_schemes'), icon: Award },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 bg-card border-r border-border shrink-0">
      <div className="h-16 flex items-center px-6 border-b border-border justify-between">
        <Link href="/" className="flex items-center gap-2.5 text-primary">
          <Leaf className="w-6 h-6" />
          <span className="font-serif text-2xl font-bold tracking-tight">FasalIQ</span>
        </Link>
      </div>

      <div className="p-4 overflow-y-auto flex-1">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = location === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all cursor-pointer ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-xs font-semibold'
                      : 'text-foreground/80 hover:bg-background hover:text-foreground hover:shadow-2xs'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Profile & Auth summary card */}
      <div className="p-4 border-t border-border space-y-3">
        {user.isGuest ? (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-3.5 text-xs text-amber-800 dark:text-amber-200 flex flex-col gap-2">
            <div className="flex items-center gap-1.5 font-bold">
              <Sparkles className="w-3.5 h-3.5 text-secondary" />
              <span>{t('auth_guest_tag')}</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight">
              {t('auth_save_data_prompt')}
            </p>
            <button
              onClick={() => setIsAuthModalOpen(true)}
              className="mt-1 w-full py-2 bg-primary text-primary-foreground font-semibold text-xs rounded-xl hover:bg-primary/90 transition-all shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              {t('auth_login')} / {t('auth_signup')}
            </button>
          </div>
        ) : (
          <div className="bg-muted/80 rounded-2xl p-4 flex flex-col gap-1 shadow-2xs border border-border/50">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                {t('farmer_profile')}
              </span>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="text-[11px] text-primary font-bold flex items-center gap-1 hover:underline cursor-pointer"
              >
                <Edit2 className="w-3 h-3" /> {t('edit')}
              </button>
            </div>
            <span className="font-serif font-bold text-foreground text-sm">{profile.name}</span>
            <span className="text-xs text-foreground/75">{profile.location}</span>
            <span className="text-xs font-semibold text-primary">
              {profile.acres} {t('acres')} • {profile.crop}
            </span>
            <button
              onClick={logout}
              className="mt-2 text-[11px] text-muted-foreground hover:text-destructive flex items-center gap-1 cursor-pointer pt-1 border-t border-border/40"
            >
              <LogOut className="w-3 h-3" /> {t('auth_logout')}
            </button>
          </div>
        )}
      </div>

      {isEditProfileOpen && (
        <ProfileModal onClose={() => setIsEditProfileOpen(false)} />
      )}
    </aside>
  );
}

function BottomNav() {
  const [location] = useLocation();
  const { t } = useAppContext();

  const mobileNavItems = [
    { href: '/dashboard', label: t('nav_dashboard'), icon: LayoutDashboard },
    { href: '/advisor', label: t('nav_advisor'), icon: MessageSquare },
    { href: '/crop-scanner', label: t('nav_scanner'), icon: Camera },
    { href: '/farm-analysis', label: t('nav_economics'), icon: LineChart },
    { href: '/schemes', label: t('nav_schemes'), icon: Award },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around items-center h-20 px-2 pb-safe z-40 shadow-lg">
      {mobileNavItems.map((item) => {
        const isActive = location === item.href;
        return (
          <Link key={item.href} href={item.href}>
            <div className="flex flex-col items-center justify-center w-16 h-full gap-1 cursor-pointer">
              <div
                className={`p-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-xs'
                    : 'text-muted-foreground'
                }`}
              >
                <item.icon className="w-5 h-5" />
              </div>
              <span
                className={`text-[10px] font-semibold text-center leading-tight ${
                  isActive ? 'text-primary font-bold' : 'text-muted-foreground'
                }`}
              >
                {item.label}
              </span>
            </div>
          </Link>
        );
      })}
    </nav>
  );
}

function ProfileModal({ onClose }: { onClose: () => void }) {
  const { profile, updateProfile, t } = useAppContext();
  const [name, setName] = useState(profile.name);
  const [location, setLocation] = useState(profile.location);
  const [acres, setAcres] = useState(profile.acres);
  const [crop, setCrop] = useState(profile.crop);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || profile.name,
      location: location.trim() || profile.location,
      acres: Number(acres) > 0 ? Number(acres) : profile.acres,
      crop: crop.trim() || profile.crop,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-3xl p-6 max-w-md w-full shadow-xl animate-in zoom-in-95 duration-200">
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-border/60">
          <h3 className="font-serif text-xl font-bold text-foreground">{t('profile_modal_title')}</h3>
          <button onClick={onClose} className="p-1 text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-foreground/80 uppercase mb-1 block">
              {t('profile_name')}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-foreground/80 uppercase mb-1 block">
              {t('profile_location')}
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-foreground/80 uppercase mb-1 block">
                {t('profile_acres')}
              </label>
              <input
                type="number"
                min="0.25"
                step="0.25"
                value={acres}
                onChange={(e) => setAcres(Number(e.target.value))}
                className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-foreground/80 uppercase mb-1 block">
                {t('profile_crop')}
              </label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="Wheat">Wheat</option>
                <option value="Mustard">Mustard</option>
                <option value="Rice">Rice</option>
                <option value="Potato">Potato</option>
                <option value="Tomato">Tomato</option>
                <option value="Cotton">Cotton</option>
                <option value="Maize">Maize</option>
                <option value="Sugarcane">Sugarcane</option>
                <option value="Chickpea">Chickpea</option>
                <option value="Soybean">Soybean</option>
              </select>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-muted rounded-xl text-xs font-bold text-foreground/80 hover:bg-muted/80 transition-colors cursor-pointer"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold hover:bg-primary/90 transition-colors shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Check className="w-4 h-4" /> {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
