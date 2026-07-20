import { useNavigate } from 'react-router-dom';
import { Container } from '../components/common/Container';
import { RegisterModal } from '../components/common/RegisterModal';
import { ROUTES } from '../constants/routes';

export function RegisterPage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="py-14 blur-sm sm:py-20">
        <Container className="max-w-2xl text-center">
          <h1 className="text-2xl font-extrabold text-ink-900">Qeydiyyat</h1>
        </Container>
      </section>
      <RegisterModal onClose={() => navigate(ROUTES.home)} />
    </>
  );
}
