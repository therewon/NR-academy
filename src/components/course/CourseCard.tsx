import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Icon } from '../common/Icon';
import { COURSE_LEVEL_LABELS } from '../../types/course.types';
import { ROUTES } from '../../constants/routes';
import type { Course } from '../../types/course.types';
import { getCoursePresentation } from '../../utils/courseCategoryPresentation';

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  const { t } = useTranslation();
  const { tint } = getCoursePresentation(course.title);

  return (
    <article className={`course-card course-card--${tint}`}>
      <div className="course-card__content">
        <h3 className="course-card__title">{course.title}</h3>
        <p className="course-card__desc">{course.description}</p>
      </div>

      <span className="course-card__badge">
        {t('courses.duration', { months: course.duration })}
      </span>

      <div className="course-card__action-wrap">
        <Link
          to={`${ROUTES.courses}/${course.id}`}
          className="course-card__action"
          aria-label={`${course.title} — ${COURSE_LEVEL_LABELS[course.level]}`}
        >
          <Icon name="arrow-up-right" size={24} />
        </Link>
      </div>
    </article>
  );
}
