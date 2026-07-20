import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/common/Container';
import { SectionBadge } from '../components/common/SectionBadge';
import { Icon } from '../components/common/Icon';
import { CtaFormSection } from '../components/sections/shared/CtaFormSection';

const contactCards = [
  {
    icon: 'phone' as const,
    title: '+994 (70) 616 23 50',
    subtitle: 'Əlaqə nömrəsi',
  },
  {
    icon: 'map-pin' as const,
    title: 'info@nracademy.az',
    subtitle: 'Elektron poçt',
  },
  {
    icon: 'map-pin' as const,
    title: 'Elşən Süleymanov 122',
    subtitle: 'Neftçilər metrosu, Elşən Süleymanov 122',
  },
];

export function ContactPage() {
  const { t } = useTranslation();
  const revealRef1 = useScrollReveal<HTMLElement>();
  const revealRef2 = useScrollReveal<HTMLElement>();
  return (
    <>
      <section ref={revealRef1} className="reveal pt-14 sm:pt-20">
        <Container>
          <SectionBadge>{t('contact.badge')}</SectionBadge>
          <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-5xl">
            {t('contact.title')}
          </h1>
        </Container>
      </section>

      <section ref={revealRef2} className="reveal py-14 sm:py-20">
        <Container className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl3 bg-surface-soft p-6 sm:p-8">
            <h2 className="text-lg font-bold text-ink-900">{t('contact.infoTitle')}</h2>

            <div className="mt-6 flex flex-col gap-4">
              {contactCards.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4"
                >
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-brand-blue text-white">
                    <Icon name={item.icon} size={20} />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-ink-900">{item.title}</p>
                    <p className="text-xs text-ink-500">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="mt-8 text-base font-bold text-ink-900">
              Bizi sosial şəbəkədə izləyin
            </h3>
            <div className="mt-3 flex items-center gap-3">
              {(['instagram', 'facebook', 'tiktok'] as const).map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-blue-light text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
                >
                  <Icon name={name} size={18} />
                </a>
              ))}
            </div>

            <h3 className="mt-8 text-base font-bold text-ink-900">{t('contact.hoursTitle')}</h3>
            <p className="mt-2 text-sm text-ink-500">
              Bazar etəsi – Cümə: 09:00 – 20:30
            </p>
          </div>

          <div className="min-h-[400px] overflow-hidden rounded-xl3 bg-surface-soft">
            <iframe
              title="NR Academy xəritədə"
              className="h-full min-h-[400px] w-full"
              loading="lazy"
              src="https://www.google.com/maps?q=Bak%C4%B1,%20El%C5%9F%C9%99n%20S%C3%BCleymanov%20122&output=embed"
            />
          </div>
        </Container>
      </section>

      <CtaFormSection />
    </>
  );
}
