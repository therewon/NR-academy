import { useTranslation } from 'react-i18next';
import { useState, type FormEvent } from 'react';
import { Icon } from './Icon';
import { useQuiz } from '../../hooks/useQuiz';
import type { StoredResult } from '../../types/quiz.types';

interface ResultLookupModalProps {
  onClose: () => void;
}

export function ResultLookupModal({ onClose }: ResultLookupModalProps) {
  const { t } = useTranslation();
  const { lookupResult } = useQuiz();
  const [refNumber, setRefNumber] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'not-found'>('idle');
  const [result, setResult] = useState<StoredResult | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!refNumber.trim()) return;
    setStatus('loading');

    setTimeout(() => {
      const found = lookupResult(refNumber.trim());
      if (found) {
        setResult(found);
        setStatus('idle');
      } else {
        setResult(null);
        setStatus('not-found');
      }
    }, 500);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-900/60 p-4"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-xl3 bg-white p-8 shadow-floating sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Bağla"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-500 hover:bg-surface-soft"
        >
          <Icon name="plus" size={16} className="rotate-45" />
        </button>

        {result ? (
          <div>
            <h2 className="text-center text-2xl font-extrabold text-ink-900">{t('quiz.yourResult')}</h2>
            <p className="mt-1 text-center text-xs text-ink-500">İş nömrəsi: {result.refNumber} · {result.date}</p>

            <div className="mt-6 rounded-2xl bg-surface-soft p-5 text-center">
              <p className="text-xs text-ink-500">{result.subjectLabel}</p>
              <p className="mt-1 text-4xl font-extrabold text-ink-900">
                {result.correct}<span className="text-lg text-ink-500">/{result.total}</span>
              </p>
            </div>

            <div className="mt-4 flex gap-3">
              <div className="flex-1 rounded-xl2 bg-surface-soft p-3 text-center">
                <p className="text-sm font-bold text-tint-green-fg">{result.correct}</p>
                <p className="text-xs text-ink-500">Düzgün</p>
              </div>
              <div className="flex-1 rounded-xl2 bg-surface-soft p-3 text-center">
                <p className="text-sm font-bold text-tint-peach-fg">{result.wrong}</p>
                <p className="text-xs text-ink-500">Səhv</p>
              </div>
              <div className="flex-1 rounded-xl2 bg-surface-soft p-3 text-center">
                <p className="text-sm font-bold tabular-nums text-ink-900">{result.elapsed}</p>
                <p className="text-xs text-ink-500">Vaxt</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => { setResult(null); setRefNumber(''); }}
              className="btn-outline mt-5 w-full justify-center"
            >
              Başqa nömrə axtar
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-center text-2xl font-extrabold text-ink-900">
              Nəticənizə baxın
            </h2>
            <p className="mt-2 text-center text-sm leading-relaxed text-ink-500">
              Nəticənizi görüntüləmək üçün sizə təqdim olunan iş nömrəsini xanaya daxil edin.
            </p>

            <form onSubmit={handleSubmit} className="mt-6">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">İş nömrəsi</span>
                <input
                  required
                  type="text"
                  placeholder="Məs: 809801"
                  value={refNumber}
                  onChange={(e) => { setRefNumber(e.target.value); setStatus('idle'); }}
                  className="form-input"
                />
              </label>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-primary mt-4 w-full"
              >
                {status === 'loading' ? t('quiz.searching') : t('quiz.showResult')}
              </button>

              {status === 'not-found' && (
                <p className="mt-3 text-center text-sm text-tint-peach-fg">
                  Bu iş nömrəsinə uyğun nəticə tapılmadı.
                </p>
              )}
            </form>
          </>
        )}
      </div>
    </div>
  );
}
