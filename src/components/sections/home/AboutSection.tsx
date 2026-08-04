import { useTranslation } from 'react-i18next';
import { Container } from '../../common/Container';
import { SectionBadge } from '../../common/SectionBadge';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { homeStats } from '../../../data/stats.data';
import { ROUTES } from '../../../constants/routes';
import LinePattern from "../../../assets/why-us-line.png"

export function AboutSection() {
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal py-20 sm:py-28">
      <Container>
        <SectionBadge>{t('about.badge')}</SectionBadge>

        <div className="mt-8 sm:gap-6 gap-4 grid lg:grid-cols-2">
          <div>
            <div className="bg-[#F9FAFB] rounded-t-xl rounded-r-xl flex flex-col justify-between p-4 sm:p-6">
              <div>
                <h2 className="text-3xl font-extrabold tracking-tight mb-6 text-ink-900 sm:text-[50px]">
                  NR Academy
                </h2>
                <p className="mt-4 lg:mb-[120px] mb-6 text-sm !leading-[164%] text-[#4B5563] sm:text-xl">
                  Məktəbəqədər hazırlıqdan tutmuş abituriyent kurslarına, olimpiada
                  hazırlığından xarici dil təhsilinə qədər geniş xidmət spektri təklif edir. Hər
                  bir proqramımız yüksək keyfiyyət standartına uyğun hazırlanır və
                  tələbələrimizin fərdi yanaşma ilə real nəticələr əldə etməsini təmin edir.
                </p>
              </div>
              <div className='lg:hidden'>
                <Button to={ROUTES.about} showArrow className='w-full py-4'>
                Daha ətraflı
              </Button>
              </div>
            </div>
            <div className='lg:flex hidden'>
              <div className="relative w-1/3 h-20 bg-[#F9FAFB] rounded-b-xl -z-10">
                <div className="absolute top-0 -right-6 h-6 w-6  bg-[#F9FAFB]">
                  <div className='absolute top-0 right-0 rounded-tl-3xl bg-white w-6 h-6'></div>
                </div>
              </div>
              <Button to={ROUTES.about} showArrow className='ml-3 mt-3 w-full border hover:text-[#2563EB] hover:bg-white border-[#2563EB]'>
                Daha ətraflı
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:gap-6 gap-4">
            <div className="relative overflow-hidden rounded-[24px] bg-[#2F63E9] p-4 sm:p-5">
              <img
                src={LinePattern}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40 max-lg:hidden"
              />

              <p className="relative lg:mt-24 z-10 font-medium text-[15px] leading-[1.64] text-white sm:text-lg">
                NR academy olaraq biz hər bir tələbənin unikal potensialına inanırıq.
                Təcrübəli müəllim heyətimiz və müasir tədris metodlarımızla
                tələbələrimizə fərdi yanaşma təmin edirik.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:gap-6 gap-4">
              {homeStats.map((stat) => (
                <div key={stat.id} className="bg-[#F9FAFB] rounded-2xl flex flex-col gap-4 sm:p-5 p-4">
                  <span className="h-7 w-7 sm:mb-16">
                    <img src={stat.icon} alt="" />
                  </span>
                  <div>
                    <p className="text-[55px] mb-2 font-extrabold text-[#2563EB] max-sm:text-[22px]">{stat.value}</p>
                    <p className="text-sm leading-snug text-[#4B5563]">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
