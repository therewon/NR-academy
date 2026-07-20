import { Container } from '../components/common/Container';
import { Button } from '../components/common/Button';
import { ROUTES } from '../constants/routes';

interface PlaceholderPageProps {
  title: string;
  description?: string;
}

export function PlaceholderPage({ title, description }: PlaceholderPageProps) {
  return (
    <section className="py-24 sm:py-32">
      <Container className="max-w-2xl text-center">
        <span className="section-badge">Tezliklə</span>
        <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-ink-900 sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ink-500 sm:text-base">
          {description ?? 'Bu səhifə hazırlanır. Dizayn təsdiqləndikdən sonra əlavə olunacaq.'}
        </p>
        <div className="mt-8 flex justify-center">
          <Button to={ROUTES.home} variant="outline">
            Ana səhifəyə qayıt
          </Button>
        </div>
      </Container>
    </section>
  );
}
