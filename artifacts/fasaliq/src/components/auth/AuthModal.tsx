import { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Shield, ArrowRight, Sparkles } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';

export function AuthModal() {
  const { isAuthModalOpen, setIsAuthModalOpen, login, signUp, loginAsGuest, t } = useAppContext();
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [name, setName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsSubmitting(true);

    try {
      if (mode === 'signup') {
        if (password !== confirmPassword) {
          setErrorMsg(t('error') + ': Passwords do not match');
          setIsSubmitting(false);
          return;
        }
        const ok = await signUp(name.trim() || 'Farmer', emailOrPhone.trim(), password);
        if (ok) {
          setIsAuthModalOpen(false);
        } else {
          setErrorMsg(t('auth_invalid_credentials'));
        }
      } else {
        const ok = await login(emailOrPhone.trim(), password);
        if (ok) {
          setIsAuthModalOpen(false);
        } else {
          setErrorMsg(t('auth_invalid_credentials'));
        }
      }
    } catch {
      setErrorMsg(t('auth_invalid_credentials'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
    setIsAuthModalOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-card border border-border rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-5 right-5 p-1.5 text-muted-foreground hover:text-foreground rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-xs">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-foreground">
            {mode === 'login' ? t('auth_welcome_back') : t('auth_create_account')}
          </h2>
          <p className="text-xs text-muted-foreground mt-1 max-w-xs mx-auto">
            {mode === 'login'
              ? t('auth_modal_login_subtitle')
              : t('auth_modal_signup_subtitle')}
          </p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-xl text-xs text-destructive font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-foreground/80 uppercase tracking-wider mb-1 block">
                {t('auth_full_name')}
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-background border border-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="text-[11px] font-bold text-foreground/80 uppercase tracking-wider mb-1 block">
              {t('auth_email_or_phone')}
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="9876543210 or email@domain.com"
                className="w-full bg-background border border-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-foreground/80 uppercase tracking-wider mb-1 block">
              {t('auth_password')}
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-background border border-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
              />
            </div>
          </div>

          {mode === 'signup' && (
            <div>
              <label className="text-[11px] font-bold text-foreground/80 uppercase tracking-wider mb-1 block">
                {t('auth_confirm_password')}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-background border border-border rounded-xl pl-10 pr-3.5 py-2.5 text-sm text-foreground focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-primary text-primary-foreground font-semibold text-sm rounded-xl hover:bg-primary/90 transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-2 disabled:opacity-50"
          >
            {isSubmitting ? t('loading') : mode === 'login' ? t('auth_login_cta') : t('auth_signup_cta')}
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-border/60 flex flex-col gap-2.5 text-center">
          <div className="text-xs text-muted-foreground">
            {mode === 'login' ? t('auth_toggle_signup') : t('auth_toggle_login')}
            <button
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login');
                setErrorMsg('');
              }}
              className="ml-1.5 font-bold text-primary hover:underline cursor-pointer"
            >
              {mode === 'login' ? t('auth_signup') : t('auth_login')}
            </button>
          </div>

          <div className="relative my-1">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-muted-foreground">
              <span className="bg-card px-2">{t('auth_divider_or')}</span>
            </div>
          </div>

          <button
            onClick={handleGuest}
            className="py-2.5 px-4 bg-muted/70 hover:bg-muted text-foreground border border-border rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-secondary" />
            {t('auth_continue_guest')}
          </button>
        </div>
      </div>
    </div>
  );
}
