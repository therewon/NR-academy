import { useTranslation } from 'react-i18next';
import { Container } from '../../common/Container';
import { Button } from '../../common/Button';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import Ali from "../../../assets/hero-section-ali.jpg"
import Leyla from "../../../assets/hero-section-leyla.jpg"
import PurplePin from "../../../assets/purple-pin.png"
import BluePin from "../../../assets/blue-pin.png"

export function Hero() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="reveal relative overflow-hidden pt-14 sm:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <h1 className="max-w-lg text-[34px] sm:text-6xl lg:text-[4.375em] font-bold !leading-[119%] tracking-normal text-ink-900 ">
            {t('hero.title')}
          </h1>
          <p className="py-6 max-w-lg sm:text-base text-xs leading-relaxed text-ink-500">
            {t('hero.subtitle')}
          </p>
          <div>
            <Button variant="outline" to="/test" showArrow className="bg-[#2563EB] max-sm:text-sm text-white hover:bg-white hover:text-[#2563EB]">
              Demo dərsə yaz
            </Button>
          </div>
        </div>

        <div className="max-lg:hidden relative mx-auto h-[340px] w-full max-w-md sm:h-[400px]">
          <div className="absolute -right-[150px] z-10 bottom-8 w-40 sm:w-60 -rotate-6 rounded-2xl border border-surface-line bg-white p-2 shadow-floating">
            <span className="absolute -top-9 left-1/2 -translate-x-1 h-15 w-15" >
              <img src={BluePin} alt="" />
            </span>
            <p className="mb-3 text-sm font-medium text-center text-ink-900">Əli Məmmədov</p>
            <div className="h-36 w-full overflow-hidden rounded bg-surface-soft sm:h-40">
              <img
                src={Ali}
                alt="Ayla Quliyeva"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className='text-center mt-2'>
              <p className="text-xs text-ink-500">IELTS Band score</p>
              <span className="text-[28px] font-bold">
                8.0
              </span>
            </div>
          </div>

          <div className=" absolute w-[1000px] h-[1000px] -translate-y-[900px]">
            <svg className="w-full h-full" viewBox="0 0 1000 1000">
              <circle
                cx="500"
                cy="500"
                r="499"
                fill="none"
                stroke="#9CA3AF"
                strokeWidth="1"
                strokeDasharray="12 8"
              />
            </svg>
          </div>

          <div className="absolute left-[80px] top-0 z-10 w-52 sm:w-60 rotate-3 rounded-2xl border border-surface-line bg-white p-3 shadow-floating">
            <span className="absolute -top-9 left-1/2 -translate-x-1 h-15 w-15" >
              <img src={PurplePin} alt="" />
            </span>
            <p className="mb-3 text-sm font-medium text-center text-ink-900">Leyla Qasımova</p>
            <div className="h-36 w-full overflow-hidden rounded bg-surface-soft sm:h-40">
              <img
                src={Leyla}
                alt="Ayla Quliyeva"
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>

            <div className='text-center mt-2'>
              <p className="text-xs text-ink-500">{t('hero.score')}</p>
              <span className="text-[28px] font-bold">
                680 bal
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
