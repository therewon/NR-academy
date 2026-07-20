import { Container } from '../../common/Container';
import { SectionBadge } from '../../common/SectionBadge';
import { Accordion } from '../../common/Accordion';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import type { FaqItem } from '../../../types/faq.types';

interface FaqAccordionSectionProps {
  badge?: string;
  title?: string;
  items: FaqItem[];
  isLoading?: boolean;
}

export function FaqAccordionSection({
  badge = 'FAQ',
  title = 'Bizə verilən suallar',
  items,
  isLoading,
}: FaqAccordionSectionProps) {
  const ref = useScrollReveal<HTMLElement>();

  return (
    <section ref={ref} className="reveal py-20 sm:py-28">
      <Container>
        <SectionBadge>{badge}</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">{title}</h2>

        <div className="mt-10">
          {isLoading ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-2xl bg-surface-soft" />
              ))}
            </div>
          ) : (
            <Accordion items={items} />
          )}
        </div>
      </Container>
    </section>
  );
}
