import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Container } from '../../common/Container';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon';
import { ResultLookupModal } from '../../common/ResultLookupModal';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { ROUTES } from '../../../constants/routes';
import quizMascot from '../../../assets/illustrations/quiz-mascot.png';

const quickFacts = [
  { icon: 'help-circle', label: '15 sual' },
  { icon: 'clock', label: '10 dəqiqə' },
  { icon: 'target', label: 'Orta səviyyə' },
] as const;

export function QuizBanner() {
  const [showLookup, setShowLookup] = useState(false);
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal py-6">
      <Container>
        <div className="relative overflow-hidden rounded-xl3 bg-tint-blue">
          <div className="quiz-banner-waves" aria-hidden="true">
            <svg viewBox="0 0 800 420" preserveAspectRatio="xMidYMid slice">
              <path
                d="M0,300 C160,220 260,360 420,300 C560,250 620,180 800,220 L800,420 L0,420 Z"
                fill="#D7E3FD"
                opacity="0.8"
              />
              <path
                d="M0,180 C180,100 300,220 480,150 C620,95 700,130 800,70 L800,0 L0,0 Z"
                fill="#DCE6FE"
                opacity="0.7"
              />
            </svg>
          </div>

          <div className="relative z-10 grid gap-8 p-8 sm:p-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="section-badge bg-white">Demo test</span>
              <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl">
                {t('quiz.bannerTitle')}
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-ink-700/80">
                {t('quiz.bannerSubtitle')}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                <Button to={ROUTES.quizIntro} showArrow>
                  Testə başla
                </Button>
                <button
                  type="button"
                  onClick={() => setShowLookup(true)}
                  className="text-sm font-medium text-ink-700 underline decoration-ink-300 underline-offset-4 transition-colors hover:text-brand-blue"
                >
                  Nəticənizə baxın
                </button>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-6">
                {quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-center gap-2 text-sm font-medium text-ink-700">
                    <Icon name={fact.icon} size={16} className="text-brand-blue" />
                    {fact.label}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto h-56 w-full max-w-xs sm:h-72">
              <img
                src={quizMascot}
                alt="Test maskotu saat qülləsinin arxasından baxır"
                className="h-full w-full object-contain object-bottom"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>

      {showLookup && <ResultLookupModal onClose={() => setShowLookup(false)} />}
    </section>
  );
}
