import { PageHero } from '../components/sections/shared/PageHero';
import { FaqAccordionSection } from '../components/sections/shared/FaqAccordionSection';
import { CtaFormSection } from '../components/sections/shared/CtaFormSection';
import { faqPageItems } from '../data/faqPage.data';

export function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Sizə necə kömək edə bilərik?"
        subtitle="Kurslarımız, qeydiyyat prosesi, ödəniş qaydaları və digər mövzular ilə bağlı ən çox soruşulan suallar bura toplanıb."
      />
      <FaqAccordionSection items={faqPageItems} />
      <CtaFormSection />
    </>
  );
}
