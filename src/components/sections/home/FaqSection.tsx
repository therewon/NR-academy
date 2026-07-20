import { Container } from '../../common/Container';
import { SectionBadge } from '../../common/SectionBadge';
import { Accordion } from '../../common/Accordion';
import { useScrollReveal } from '../../../hooks/useScrollReveal';
import { useAsyncData } from '../../../hooks/useAsyncData';
import { getFaqItems } from '../../../api/endpoints/faq.api';

export function FaqSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const { data: faqItems, isLoading } = useAsyncData(getFaqItems, []);

  return (
    <section ref={sectionRef} className="reveal py-20 sm:py-28">
      <Container>
        <SectionBadge>FAQ</SectionBadge>
        <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          Bizə verilən suallar
        </h2>

        <div className="mt-10">
          {isLoading || !faqItems ? (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-14 animate-pulse rounded-2xl bg-surface-soft" />
              ))}
            </div>
          ) : (
            <Accordion items={faqItems} />
          )}
        </div>
      </Container>
    </section>
  );
}
