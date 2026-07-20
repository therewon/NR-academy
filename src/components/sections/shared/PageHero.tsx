import type { ReactNode } from 'react';
import { Container } from '../../common/Container';
import { useScrollReveal } from '../../../hooks/useScrollReveal';

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: 'left' | 'center';
}

export function PageHero({ eyebrow, title, subtitle, align = 'center' }: PageHeroProps) {
  const ref = useScrollReveal<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={ref} className="reveal pb-4 pt-14 sm:pt-20">
      <Container className={align === 'center' ? 'text-center' : ''}>
        {eyebrow && <span className="section-badge">{eyebrow}</span>}
        <h1
          className={`mt-5 text-3xl font-extrabold leading-tight tracking-tight text-ink-900 sm:text-4xl lg:text-5xl ${
            align === 'center' ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={`mt-4 text-sm leading-relaxed text-ink-500 sm:text-base ${
              align === 'center' ? 'mx-auto max-w-xl' : 'max-w-xl'
            }`}
          >
            {subtitle}
          </p>
        )}
      </Container>
    </section>
  );
}
