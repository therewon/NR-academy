import { Route, Routes } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ROUTES } from '../constants/routes';
import { QuizProvider } from '../context/QuizContext';
import { HomePage } from '../pages/HomePage';
import { AboutPage } from '../pages/AboutPage';
import { CoursesPage } from '../pages/CoursesPage';
import { CourseDetailPage } from '../pages/CourseDetailPage';
import { TeachersPage } from '../pages/TeachersPage';
import { FaqPage } from '../pages/FaqPage';
import { ContactPage } from '../pages/ContactPage';
import { BlogPage } from '../pages/BlogPage';
import { QuizIntroPage } from '../pages/QuizIntroPage';
import { QuizQuestionPage } from '../pages/QuizQuestionPage';
import { QuizResultPage } from '../pages/QuizResultPage';
import { RegisterPage } from '../pages/RegisterPage';
import { NotFoundPage } from '../pages/NotFoundPage';

export function AppRouter() {
  return (
    <Layout>
      <QuizProvider>
        <Routes>
          <Route path={ROUTES.home} element={<HomePage />} />
          <Route path={ROUTES.about} element={<AboutPage />} />
          <Route path={ROUTES.courses} element={<CoursesPage />} />
          <Route path={ROUTES.courseDetail} element={<CourseDetailPage />} />
          <Route path={ROUTES.teachers} element={<TeachersPage />} />
          <Route path={ROUTES.faq} element={<FaqPage />} />
          <Route path={ROUTES.contact} element={<ContactPage />} />
          <Route path={ROUTES.blog} element={<BlogPage />} />
          <Route path={ROUTES.quizIntro} element={<QuizIntroPage />} />
          <Route path={ROUTES.quizQuestion} element={<QuizQuestionPage />} />
          <Route path={ROUTES.quizResult} element={<QuizResultPage />} />
          <Route path={ROUTES.register} element={<RegisterPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </QuizProvider>
    </Layout>
  );
}
