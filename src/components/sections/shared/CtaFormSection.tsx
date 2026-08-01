import { useTranslation } from 'react-i18next';
import { useState, type FormEvent, type ReactNode } from 'react';
import { Container } from '../../common/Container';
import { Icon } from '../../common/Icon';
import { Select } from '../../common/Select';
import { cn } from '../../../utils/cn';
import { useAsyncData } from '../../../hooks/useAsyncData';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { getCourses } from '../../../api/endpoints/courses.api';
import { isContactSubmissionAvailable, submitContactForm } from '../../../api/endpoints/contact.api';
import type { ContactFormPayload } from '../../../types/contact.types';

const checklistKeys = ['cta.check1', 'cta.check2'];

const initialForm: ContactFormPayload = {
  fullName: '',
  phone: '',
  interestedCourseId: '',
  language: 'AZ',
  note: '',
};

type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export function CtaFormSection() {
  const { data: courses } = useAsyncData(getCourses, []);
  const [form, setForm] = useState<ContactFormPayload>(initialForm);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  const updateField = <K extends keyof ContactFormPayload>(key: K, value: ContactFormPayload[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setStatus('submitting');
    try {
      await submitContactForm(form);
      setStatus('success');
      setForm(initialForm);
    } catch {
      setStatus('error');
    }
  };

  return (
    <section ref={ref} className="reveal py-6">
      <Container>
        <div className="grid gap-10 rounded-xl3 bg-navy-gradient p-8 sm:p-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
          <div className="text-white">
            <h2 className="max-w-sm text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {t('cta.title')}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Məlumatlarını doldur, komandamız sizinlə əlaqə saxlasın.
            </p>
            <ul className="mt-6 flex flex-col gap-2.5">
              {checklistKeys.map((key) => (
                <li key={key} className="flex items-center gap-2.5 text-sm text-white/90">
                  <span className="flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/15">
                    <Icon name="check" size={12} />
                  </span>
                  {t(key)}
                </li>
              ))}
            </ul>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl3 bg-white p-6 shadow-floating sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={t("cta.nameLabel")}>
                <input
                  required
                  type="text"
                  placeholder="Ayşən Abbasova"
                  value={form.fullName}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="form-input"
                />
              </Field>
              <Field label={t("cta.phoneLabel")}>
                <input
                  required
                  type="tel"
                  placeholder="+994 50 000 00 00"
                  value={form.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="form-input"
                />
              </Field>
            </div>

            <div className="mt-4">
              <Field label={t("cta.courseLabel")}>
                <Select
                  name="interestedCourseId"
                  value={form.interestedCourseId}
                  onChange={(value) => updateField('interestedCourseId', value)}
                  placeholder={t("cta.coursePlaceholder")}
                  options={(courses ?? []).map((course) => ({ value: String(course.id), label: course.title }))}
                />
              </Field>
            </div>

            <div className="mt-4">
              <span className="mb-2 block text-xs font-semibold text-ink-500">{t('cta.langLabel')}</span>
              <div className="flex gap-2">
                {(['AZ', 'RU'] as const).map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => updateField('language', lang)}
                    className={cn(
                      'rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors',
                      form.language === lang
                        ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                        : 'border-surface-line text-ink-500'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4">
              <Field label={t("cta.noteLabel")}>
                <textarea
                  rows={3}
                  placeholder="Sizə qeyd, suallar..."
                  value={form.note}
                  onChange={(e) => updateField('note', e.target.value)}
                  className="form-input resize-none"
                />
              </Field>
            </div>

            <button
              type="submit"
              disabled={status === 'submitting' || !isContactSubmissionAvailable}
              className="btn-primary mt-6 w-full"
            >
              {status === 'submitting' ? t('cta.submitting') : t('cta.submit')}
            </button>

            {!isContactSubmissionAvailable && (
              <p className="mt-3 text-center text-xs leading-relaxed text-ink-500">
                Onlayn müraciət xidməti hazırlanır. Hazırda bizimlə +994 (70) 616 23 50 nömrəsi ilə əlaqə saxlayın.
              </p>
            )}

            {status === 'success' && (
              <p className="mt-3 text-center text-sm font-medium text-tint-green-fg">
                Müraciətiniz qəbul olundu, tezliklə sizinlə əlaqə saxlanılacaq.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-3 text-center text-sm font-medium text-tint-peach-fg">
                Xəta baş verdi, zəhmət olmasa yenidən cəhd edin.
              </p>
            )}
          </form>
        </div>
      </Container>
    </section>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-500">{label}</span>
      {children}
    </label>
  );
}
