interface FeedbackStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function FeedbackState({ title, description, actionLabel = 'Yenidən yoxla', onAction }: FeedbackStateProps) {
  return (
    <div className="col-span-full rounded-xl3 border border-surface-line bg-surface-soft px-6 py-12 text-center">
      <h3 className="text-base font-bold text-ink-900">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-ink-500">{description}</p>}
      {onAction && (
        <button type="button" onClick={onAction} className="btn-outline mt-5">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
