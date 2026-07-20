import { useTranslation } from 'react-i18next';
import { Container } from '../../common/Container';
import { SectionBadge } from '../../common/SectionBadge';
import { Button } from '../../common/Button';
import { Icon } from '../../common/Icon';
import { useAsyncData } from '../../../hooks/useAsyncData';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { getCourses } from '../../../api/endpoints/courses.api';
import { homeStats } from '../../../data/stats.data';
import { ROUTES } from '../../../constants/routes';

export function AboutSection() {
  useAsyncData(getCourses, []);
  const { t } = useTranslation();
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal py-20 sm:py-28">
      <Container>
        <SectionBadge>{t('about.badge')}</SectionBadge>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface flex flex-col justify-between p-8 sm:p-10">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
                NR Academy
              </h2>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-500 sm:text-base">
                Məktəbəqədər hazırlıqdan tutmuş abituriyent kurslarına, olimpiada
                hazırlığından xarici dil təhsilinə qədər geniş xidmət spektri təklif edir. Hər
                bir proqramımız yüksək keyfiyyət standartına uyğun hazırlanır və
                tələbələrimizin fərdi yanaşma ilə real nəticələr əldə etməsini təmin edir.
              </p>
            </div>
            <div className="mt-8">
              <Button to={ROUTES.about} showArrow>
                Daha ətraflı
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="rounded-xl3 bg-navy-gradient p-8 text-white sm:p-10">
              <p className="text-sm leading-relaxed text-white/85 sm:text-base">
                NR academy sizə bir bir hər bir tələbənin unikal potensialına inanır, təcrübəli
                müəllim heyətimiz və müasir tədris metodlarımız ilə tələbələrə fərdi yanaşma
                təmin edir.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {homeStats.map((stat) => (
                <div key={stat.id} className="card-surface flex flex-col gap-4 p-5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-soft text-ink-700">
                    <Icon name={stat.icon === 'users' ? 'users' : 'star'} size={16} />
                  </span>
                  <div>
                    <p className="text-2xl font-extrabold text-ink-900">{stat.value}</p>
                    <p className="mt-1 text-xs leading-snug text-ink-500">{stat.label}</p>
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
