import { useEffect, useState, type FormEvent, type InputHTMLAttributes } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { register as registerRequest, verifyEmail as verifyEmailRequest } from '../../api/endpoints/auth.api';
import { useAuth } from '../../hooks/useAuth';
import { getApiErrorMessage } from '../../utils/apiError';

interface RegisterModalProps {
  onClose: () => void;
}

type AuthMode = 'register' | 'verify' | 'login';
type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function RegisterModal({ onClose }: RegisterModalProps) {
  const { t } = useTranslation();
  const { login } = useAuth();
  const [mode, setMode] = useState<AuthMode>('register');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationEmail, setVerificationEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const resetFeedback = () => {
    setStatus('idle');
    setErrorMsg('');
    setNotice('');
  };

  const switchMode = (nextMode: AuthMode) => {
    resetFeedback();
    setMode(nextMode);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    setErrorMsg('');
    setNotice('');

    try {
      if (mode === 'register') {
        if (password !== confirmPassword) {
          throw new Error('Parollar eyni deyil.');
        }

        await registerRequest({
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phoneNumber: phone.trim(),
          password,
          confirmPassword,
          role: 4,
        });
        setVerificationEmail(email.trim());
        setVerificationCode('');
        setMode('verify');
        setStatus('idle');
        setNotice('Email ünvanınıza göndərilən 6 rəqəmli kodu daxil edin.');
        return;
      }

      if (mode === 'verify') {
        await verifyEmailRequest(verificationEmail, verificationCode.trim());
        setEmail(verificationEmail);
        setMode('login');
        setStatus('idle');
        setNotice('Email təsdiqləndi. İndi hesabınıza daxil ola bilərsiniz.');
        return;
      }

      await login({ email: email.trim(), password });
      setStatus('success');
      setNotice(t('register.loginSuccess'));
    } catch (error: unknown) {
      setStatus('error');
      setErrorMsg(getApiErrorMessage(error, 'Əməliyyat tamamlanmadı. Yenidən cəhd edin.'));
    }
  };

  const isSubmitting = status === 'submitting';

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl3 bg-white p-6 shadow-floating sm:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('common.close')}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-surface-soft"
        >
          <Icon name="plus" size={16} className="rotate-45" />
        </button>

        <h2 id="auth-modal-title" className="pr-8 text-xl font-extrabold text-ink-900">
          {mode === 'verify' ? 'Email təsdiqi' : t('register.title')}
        </h2>
        <p className="mt-1 text-sm text-ink-500">
          {mode === 'register'
            ? t('register.subtitle')
            : mode === 'login'
              ? t('register.loginSubtitle')
              : verificationEmail}
        </p>

        {notice && (
          <p className="mt-5 rounded-xl2 bg-tint-green px-4 py-3 text-sm font-medium text-tint-green-fg">
            {notice}
          </p>
        )}

        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            {mode === 'register' && (
              <>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <label>
                    <span className="sr-only">{t('register.firstNamePh', { defaultValue: 'Ad' })}</span>
                    <input
                      required
                      autoComplete="given-name"
                      type="text"
                      placeholder={t('register.firstNamePh', { defaultValue: 'Ad' })}
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      className="form-input"
                    />
                  </label>
                  <label>
                    <span className="sr-only">{t('register.lastNamePh', { defaultValue: 'Soyad' })}</span>
                    <input
                      required
                      autoComplete="family-name"
                      type="text"
                      placeholder={t('register.lastNamePh', { defaultValue: 'Soyad' })}
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      className="form-input"
                    />
                  </label>
                </div>
                <AuthInput
                  label="Email"
                  required
                  autoComplete="email"
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <AuthInput
                  label="Telefon"
                  required
                  autoComplete="tel"
                  type="tel"
                  placeholder="+994 50 000 00 00"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
                <AuthInput
                  label="Parol"
                  required
                  autoComplete="new-password"
                  type="password"
                  minLength={5}
                  placeholder={t('register.passwordPlaceholder')}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <AuthInput
                  label="Parolun təsdiqi"
                  required
                  autoComplete="new-password"
                  type="password"
                  minLength={5}
                  placeholder={t('register.confirmPasswordPh', { defaultValue: 'Parolu təsdiqlə' })}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </>
            )}

            {mode === 'login' && (
              <>
                <AuthInput
                  label="Email"
                  required
                  autoComplete="email"
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
                <AuthInput
                  label="Parol"
                  required
                  autoComplete="current-password"
                  type="password"
                  placeholder={t('register.passwordPlaceholder')}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </>
            )}

            {mode === 'verify' && (
              <AuthInput
                label="Təsdiq kodu"
                required
                autoComplete="one-time-code"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                placeholder="000000"
                value={verificationCode}
                onChange={(event) => setVerificationCode(event.target.value.replace(/\D/g, '').slice(0, 6))}
              />
            )}

            {status === 'error' && errorMsg && (
              <p role="alert" className="rounded-xl2 bg-tint-pink px-4 py-2 text-xs text-tint-pink-fg">
                {errorMsg}
              </p>
            )}

            <button type="submit" disabled={isSubmitting} className="btn-primary mt-2 w-full">
              {isSubmitting
                ? 'Gözləyin...'
                : mode === 'register'
                  ? t('register.registerBtn')
                  : mode === 'login'
                    ? t('register.loginBtn')
                    : 'Emaili təsdiqlə'}
            </button>

            {mode !== 'verify' && (
              <>
                <p className="mt-1 text-center text-sm text-ink-500">
                  {mode === 'register' ? t('register.hasAccount') : t('register.noAccount')}
                </p>
                <button
                  type="button"
                  onClick={() => switchMode(mode === 'register' ? 'login' : 'register')}
                  className="btn-outline w-full justify-center"
                >
                  {mode === 'register' ? t('register.switchToLogin') : t('register.switchToRegister')}
                </button>
              </>
            )}

            {mode === 'verify' && (
              <button type="button" onClick={() => switchMode('login')} className="btn-outline w-full justify-center">
                Girişə qayıt
              </button>
            )}
          </form>
        )}
      </div>
    </div>
  );
}

type AuthInputProps = InputHTMLAttributes<HTMLInputElement> & { label: string };

function AuthInput({ label, className, ...props }: AuthInputProps) {
  return (
    <label>
      <span className="sr-only">{label}</span>
      <input {...props} className={`form-input ${className ?? ''}`} />
    </label>
  );
}
