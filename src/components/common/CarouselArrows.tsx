import { Icon } from './Icon';

interface CarouselArrowsProps {
  onPrev: () => void;
  onNext: () => void;
}

export function CarouselArrows({ onPrev, onNext }: CarouselArrowsProps) {
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={onPrev}
        aria-label="Əvvəlki"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-line text-ink-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
      >
        <Icon name="chevron-left" size={18} />
      </button>
      <button
        type="button"
        onClick={onNext}
        aria-label="Növbəti"
        className="flex h-11 w-11 items-center justify-center rounded-full border border-surface-line text-ink-700 transition-colors hover:border-brand-blue hover:text-brand-blue"
      >
        <Icon name="chevron-right" size={18} />
      </button>
    </div>
  );
}
