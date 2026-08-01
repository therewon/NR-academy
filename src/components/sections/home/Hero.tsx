import { useTranslation } from 'react-i18next';
import { Container } from '../../common/Container';
import { Button } from '../../common/Button';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import Ali from "../../../assets/hero-section-ali.png"
import Leyla from "../../../assets/hero-section-leyla.png"

export function Hero() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="reveal relative overflow-hidden pt-14 sm:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h1 className="max-w-lg !text-[70px] font-bold leading-[119%] tracking-normal text-ink-900 sm:text-5xl lg:text-[3.25rem]">
            {t('hero.title')}
          </h1>
          <p className="py-6 max-w-lg text-base leading-relaxed text-ink-500">
            {t('hero.subtitle')}
          </p>
          <div>
            <Button variant="outline" to="/test" showArrow className="bg-[#2563EB] text-white hover:bg-white hover:text-[#2563EB]">
              Demo dərsə yaz
            </Button>
          </div>
        </div>

        <div className="relative mx-auto h-[340px] w-full max-w-md sm:h-[400px]">
          <div className="absolute right-0 bottom-4 w-40 -rotate-6 rounded-2xl border border-surface-line bg-white p-2 shadow-floating sm:w-48">
            <div className="h-28 w-full overflow-hidden rounded-xl bg-surface-soft sm:h-32">
              <img
                src={Ali}
                alt="Tələbə"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-2 px-1 text-xs font-semibold text-ink-500">Test Nəticəsi</p>
            <p className="px-1 text-sm font-bold text-ink-900">8.5</p>
          </div>

          <div className="absolute left-2 top-0 z-10 w-52 rotate-3 rounded-2xl border border-surface-line bg-white p-3 shadow-floating sm:w-60">
            <span className="absolute -top-2 right-6 h-3.5 w-3.5 rounded-full bg-violet-500 shadow-card" />
            <div className="h-36 w-full overflow-hidden rounded-xl bg-surface-soft sm:h-40">
              <img
                src={Leyla}
                alt="Ayla Quliyeva"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-sm font-bold text-ink-900">Ayla Quliyeva</p>
            <p className="text-xs text-ink-500">{t('hero.score')}</p>
            <span className="mt-2 inline-flex items-center rounded-full bg-brand-blue px-3 py-1 text-xs font-bold text-white">
              680 bal
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
