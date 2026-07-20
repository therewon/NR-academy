import { useState, type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from './Icon';
import { register, login } from '../../api/endpoints/auth.api';

interface RegisterModalProps {
  onClose: () => void;
}

export function RegisterModal({ onClose }: RegisterModalProps) {
  const { t } = useTranslation();
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    try {
      if (mode === 'register') {
        await register({
          firstName,
          lastName,
          email,
          phoneNumber: phone,
          password,
          confirmPassword,
          role: 4,
        });
      } else {
        const response = await login({ email, password });
        localStorage.setItem('nr_token', response.accessToken);
        localStorage.setItem('nr_refresh', response.refreshToken);
      }
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      const msg = err?.response?.data?.message || err?.response?.data || err?.message || '';
      setErrorMsg(typeof msg === 'string' ? msg : JSON.stringify(msg));
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/50 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md overflow-y-auto rounded-xl3 bg-white p-6 shadow-floating sm:p-8"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t('common.close')}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-surface-soft"
        >
          <Icon name="plus" size={16} className="rotate-45" />
        </button>

        <h2 className="text-xl font-extrabold text-ink-900">{t('register.title')}</h2>
        <p className="mt-1 text-sm text-ink-500">
          {mode === 'register' ? t('register.subtitle') : t('register.loginSubtitle')}
        </p>

        {status === 'success' ? (
          <p className="mt-6 rounded-xl2 bg-tint-green px-4 py-3 text-sm font-medium text-tint-green-fg">
            {mode === 'register' ? t('register.registerSuccess') : t('register.loginSuccess')}
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
            {mode === 'register' ? (
              <>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    required
                    type="text"
                    placeholder={t('register.firstNamePh', { defaultValue: 'Ad' })}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="form-input"
                  />
                  <input
                    required
                    type="text"
                    placeholder={t('register.lastNamePh', { defaultValue: 'Soyad' })}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="form-input"
                  />
                </div>
                <input
                  required
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
                <input
                  required
                  type="tel"
                  placeholder="+994 50 000 00 00"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-input"
                />
                <input
                  required
                  type="password"
                  minLength={5}
                  placeholder={t('register.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
                <input
                  required
                  type="password"
                  minLength={5}
                  placeholder={t('register.confirmPasswordPh', { defaultValue: 'Parolu təsdiqlə' })}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="form-input"
                />
              </>
            ) : (
              <>
                <input
                  required
                  type="email"
                  placeholder={t('register.emailPlaceholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                />
                <input
                  required
                  type="password"
                  placeholder={t('register.passwordPlaceholder')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                />
              </>
            )}

            {status === 'error' && errorMsg && (
              <p className="rounded-xl2 bg-tint-pink px-4 py-2 text-xs text-tint-pink-fg">{errorMsg}</p>
            )}

            <button type="submit" disabled={status === 'submitting'} className="btn-primary mt-2 w-full">
              {mode === 'register' ? t('register.registerBtn') : t('register.loginBtn')}
            </button>

            <p className="mt-1 text-center text-sm text-ink-500">
              {mode === 'register' ? t('register.hasAccount') : t('register.noAccount')}
            </p>
            <button
              type="button"
              onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setStatus('idle'); setErrorMsg(''); }}
              className="btn-outline w-full justify-center"
            >
              {mode === 'register' ? t('register.switchToLogin') : t('register.switchToRegister')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
