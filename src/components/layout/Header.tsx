import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '../common/Container';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';
import { useAsyncData } from '../../hooks/useAsyncData';
import { getCourses } from '../../api/endpoints/courses.api';
import { ROUTES } from '../../constants/routes';
import { cn } from '../../utils/cn';
import logo from '../../assets/logo-sm.png';

const LANGS = ['AZ', 'RU', 'EN'] as const;
type Lang = (typeof LANGS)[number];

const navLinks = [
  { id: 'about', key: 'nav.about', path: ROUTES.about },
  { id: 'teachers', key: 'nav.teachers', path: ROUTES.teachers },
  { id: 'faq', key: 'nav.faq', path: ROUTES.faq },
  { id: 'contact', key: 'nav.contact', path: ROUTES.contact },
];

export function Header() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: courses } = useAsyncData(getCourses, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileCoursesOpen, setIsMobileCoursesOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const coursesDropRef = useRef<HTMLDivElement>(null);
  const coursesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langDropRef = useRef<HTMLDivElement>(null);

  const currentLang = (i18n.language?.toUpperCase() || 'AZ') as Lang;

  const switchLang = (lang: Lang) => {
    const code = lang.toLowerCase();
    i18n.changeLanguage(code);
    localStorage.setItem('nr_lang', code);
    setIsLangOpen(false);
  };

  const courseName = (course: { id: number; title: string }) => {
    const key = `courseNames.${course.id}`;
    const translated = t(key, { defaultValue: '' });
    return translated || course.title;
  };

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (coursesDropRef.current && !coursesDropRef.current.contains(e.target as Node)) {
        setIsCoursesOpen(false);
      }
      if (langDropRef.current && !langDropRef.current.contains(e.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsMobileCoursesOpen(false);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-surface-line/70 bg-white/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between">
        {}
        <Link to={ROUTES.home} className="flex-none">
          <img src={logo} alt="NR Academy" className="h-10 w-auto" />
        </Link>

        {}
        <nav className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {}
          <div
            ref={coursesDropRef}
            className="relative"
            onMouseEnter={() => {
              if (coursesTimer.current) clearTimeout(coursesTimer.current);
              setIsCoursesOpen(true);
            }}
            onMouseLeave={() => {
              coursesTimer.current = setTimeout(() => setIsCoursesOpen(false), 200);
            }}
          >
            <button
              type="button"
              onClick={() => navigate(ROUTES.courses)}
              className={cn(
                'flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-soft hover:text-ink-900',
                isCoursesOpen && 'bg-surface-soft text-ink-900'
              )}
            >
              {t('nav.courses')}
              <Icon name="chevron-down" size={14} className={cn('transition-transform', isCoursesOpen && 'rotate-180')} />
            </button>

            {isCoursesOpen && (
              <div className="absolute left-1/2 top-[calc(100%+8px)] z-40 w-64 -translate-x-1/2 overflow-hidden rounded-2xl border border-surface-line bg-white p-2 shadow-floating">
                <Link
                  to={ROUTES.courses}
                  onClick={() => setIsCoursesOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-brand-blue transition-colors hover:bg-brand-blue-light"
                >
                  <Icon name="arrow-right" size={14} />
                  {t('courses.viewAll')}
                </Link>
                <div className="my-1.5 h-px bg-surface-line" />
                {courses?.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => {
                      setIsCoursesOpen(false);
                      navigate(`${ROUTES.courses}/${course.id}`);
                    }}
                    className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-ink-700 transition-colors hover:bg-surface-soft hover:text-ink-900"
                  >
                    {courseName(course)}
                  </button>
                ))}
              </div>
            )}
          </div>

          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  'rounded-full px-4 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-surface-soft hover:text-ink-900',
                  isActive && 'bg-surface-soft text-ink-900'
                )
              }
            >
              {t(link.key)}
            </NavLink>
          ))}
        </nav>

        {}
        <div className="flex flex-none items-center gap-3">
          {}
          <div ref={langDropRef} className="relative">
            <button
              type="button"
              onClick={() => setIsLangOpen((v) => !v)}
              className="hidden items-center gap-1 rounded-full border border-surface-line px-3 py-2 text-sm font-semibold text-ink-700 sm:flex"
            >
              {currentLang}
              <Icon name="chevron-down" size={14} className={cn('transition-transform', isLangOpen && 'rotate-180')} />
            </button>
            {isLangOpen && (
              <div className="absolute right-0 top-[calc(100%+6px)] z-30 overflow-hidden rounded-xl border border-surface-line bg-white shadow-floating">
                {LANGS.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => switchLang(lang)}
                    className={cn(
                      'block w-full px-5 py-2.5 text-left text-sm font-medium transition-colors hover:bg-surface-soft',
                      currentLang === lang ? 'bg-brand-blue-light text-brand-blue' : 'text-ink-700'
                    )}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>

          <Button to={ROUTES.register} className="hidden sm:inline-flex">
            {t('nav.login')}
          </Button>

          {}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-surface-line lg:hidden"
            aria-label={t('nav.menu')}
            aria-expanded={isMenuOpen}
            onClick={() => { setIsMenuOpen((v) => !v); setIsMobileCoursesOpen(false); }}
          >
            <span className="relative block h-3 w-4">
              <span className={cn('absolute left-0 top-0 h-0.5 w-4 bg-ink-900 transition-transform', isMenuOpen && 'translate-y-[5px] rotate-45')} />
              <span className={cn('absolute left-0 bottom-0 h-0.5 w-4 bg-ink-900 transition-transform', isMenuOpen && '-translate-y-[5px] -rotate-45')} />
            </span>
          </button>
        </div>
      </Container>

      {}
      {isMenuOpen && (
        <div className="border-t border-surface-line bg-white lg:hidden">
          <Container className="flex flex-col gap-1 py-4">
            {}
            <button
              type="button"
              onClick={() => setIsMobileCoursesOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-surface-soft"
            >
              {t('nav.courses')}
              <Icon name="chevron-down" size={14} className={cn('transition-transform', isMobileCoursesOpen && 'rotate-180')} />
            </button>

            {isMobileCoursesOpen && (
              <div className="flex flex-col gap-0.5 pl-3">
                {courses?.map((course) => (
                  <button
                    key={course.id}
                    type="button"
                    onClick={() => {
                      setIsMenuOpen(false);
                      navigate(`${ROUTES.courses}/${course.id}`);
                    }}
                    className="rounded-xl px-3 py-2 text-left text-sm text-ink-500 hover:bg-surface-soft hover:text-ink-900"
                  >
                    {courseName(course)}
                  </button>
                ))}
                <Link
                  to={ROUTES.courses}
                  onClick={() => setIsMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-semibold text-brand-blue hover:bg-brand-blue-light"
                >
                  {t('courses.viewAll')}
                </Link>
              </div>
            )}

            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-surface-soft"
              >
                {t(link.key)}
              </NavLink>
            ))}

            <div className="mt-2 flex gap-2">
              {LANGS.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => switchLang(lang)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-semibold',
                    currentLang === lang
                      ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                      : 'border-surface-line text-ink-500'
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
            <Button to={ROUTES.register} onClick={() => setIsMenuOpen(false)} className="mt-2 justify-center">
              {t('nav.login')}
            </Button>
          </Container>
        </div>
      )}
    </header>
  );
}
