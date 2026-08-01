import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container } from '../components/common/Container';
import { PageHero } from '../components/sections/shared/PageHero';
import { useAsyncData } from '../hooks/useAsyncData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { getBlogPosts, getBlogCategories } from '../api/endpoints/blog.api';
import { cn } from '../utils/cn';
import { FeedbackState } from '../components/common/FeedbackState';

export function BlogPage() {
  const { t } = useTranslation();
  const { data: posts, isLoading: postsLoading, error: postsError, refetch: refetchPosts } = useAsyncData(getBlogPosts, []);
  const { data: categories } = useAsyncData(getBlogCategories, []);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const gridRef = useScrollReveal<HTMLDivElement>({ stagger: 120 });

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    if (activeCategory === 'all') return posts;
    return posts.filter((p) => p.categoryName === activeCategory);
  }, [posts, activeCategory]);

  const categoryNames = useMemo(
    () => ['all', ...new Set(categories?.map((c) => c.name) ?? [])],
    [categories]
  );

  return (
    <>
      <PageHero
        eyebrow={t('common.soon', { defaultValue: 'Bloq' })}
        title="Bloq"
        subtitle={t('footer.description')}
      />

      <section className="py-14 sm:py-20">
        <Container>
          {categoryNames.length > 1 && (
            <div className="mb-8 flex flex-wrap gap-2">
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition-colors',
                    activeCategory === cat
                      ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                      : 'border-surface-line text-ink-700 hover:border-brand-blue'
                  )}
                >
                  {cat === 'all' ? t('teachers.filterAll') : cat}
                </button>
              ))}
            </div>
          )}

          <div ref={gridRef} className="reveal grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {postsError ? (
              <FeedbackState title="Bloq yazıları yüklənmədi" description={postsError.message} onAction={refetchPosts} />
            ) : postsLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-64 animate-pulse rounded-xl2 bg-surface-soft" />
                ))
            ) : (
              filteredPosts.map((post) => (
                  <article key={post.id} className="reveal-child card-surface overflow-hidden">
                    <div className="h-40 bg-surface-soft" />
                    <div className="p-5">
                      <span className="text-xs font-semibold text-brand-blue">{post.categoryName}</span>
                      <h3 className="mt-1 text-base font-bold text-ink-900">{post.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm text-ink-500">{post.content}</p>
                      <p className="mt-3 text-xs text-ink-300">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </article>
                ))
            )}

            {!postsLoading && filteredPosts.length === 0 && (
              <p className="col-span-full py-10 text-center text-sm text-ink-500">
                {t('common.soon')}
              </p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}
