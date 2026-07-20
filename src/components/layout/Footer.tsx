import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../common/Container';
import { Icon } from '../common/Icon';
import { footerCourseLinks, footerQuickLinks } from '../../constants/navigation';
import { ROUTES } from '../../constants/routes';
import logo from '../../assets/logo-sm.png';

export function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-surface-line bg-white">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Link to={ROUTES.home} className="flex items-center">
            <img src={logo} alt="NR Academy" className="h-10 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-500">
            {t('footer.description')}
          </p>
          <div className="mt-5 flex items-center gap-3">
            {(['instagram', 'facebook', 'tiktok'] as const).map((name) => (
              <a
                key={name}
                href="#"
                aria-label={name}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-surface-line text-ink-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
              >
                <Icon name={name} size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-900">{t('footer.quickLinks')}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {footerQuickLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.path} className="text-sm text-ink-500 transition-colors hover:text-brand-blue">
                  {t(`nav.${link.id}`, link.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-900">{t('footer.courses')}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {footerCourseLinks.map((link) => (
              <li key={link.id}>
                <Link to={link.path} className="text-sm text-ink-500 transition-colors hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-ink-900">{t('footer.contact')}</h3>
          <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-500">
            <li className="flex items-center gap-2">
              <Icon name="phone" size={16} className="flex-none text-brand-blue" />
              +994 (10) 000 00 00
            </li>
            <li className="flex items-start gap-2">
              <Icon name="map-pin" size={16} className="mt-0.5 flex-none text-brand-blue" />
              Bakı şəhəri, Nərimanov metrosu, Elşən Süleymanov 122
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-surface-line py-6">
        <Container className="flex flex-col items-center justify-between gap-2 text-xs text-ink-500 sm:flex-row">
          <span>{t('footer.copyright')}</span>
          <div className="flex items-center gap-4">
            <span>{t('footer.privacy')}</span>
            <span>·</span>
            <span>{t('footer.terms')}</span>
          </div>
        </Container>
      </div>
    </footer>
  );
}
