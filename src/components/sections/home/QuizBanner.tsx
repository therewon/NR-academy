import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Container } from '../../common/Container';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon';
import { ResultLookupModal } from '../../common/ResultLookupModal';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { ROUTES } from '../../../constants/routes';
import quizMascot from '../../../assets/illustrations/quiz-mascot.png';
import vectorLine from "../../../assets/quiz-section-vector-line.svg"

import { PiUsers } from "react-icons/pi";


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
    <section ref={ref} className="reveal bg-[#F9FAFB]">
      <Container>
        <div className="relative overflow-hidden rounded-xl3">
          

          <div className="relative z-10 grid gap-8 px-8 sm:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <span className="section-badge bg-[#DBEAFE] text-[#2563EB]"><PiUsers size={18} className='mr-2'/> 1000+ tələbə iştirak edib</span>
              <h2 className="mt-5 max-w-md text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-[50px]">
                {t('quiz.bannerTitle')}
              </h2>
              <p className="mt-3 text-lg leading-relaxed text-ink-700/80">
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

            <div className="relative mx-auto h-56 w-full sm:h-[500px]">
              <img src={vectorLine} alt="" className='absolute h-full'/>
              <img
                src={quizMascot}
                alt="Test maskotu saat qülləsinin arxasından baxır"
                className="h-full w-full object-contain object-top scale-125"
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
